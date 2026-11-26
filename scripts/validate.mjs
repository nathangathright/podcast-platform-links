#!/usr/bin/env node
// Checks _data/platforms.json against schema.md. No dependencies.
// Usage: node scripts/validate.mjs [path/to/platforms.json]

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const file =
  process.argv[2] ??
  fileURLToPath(new URL('../_data/platforms.json', import.meta.url));

const TAGS = new Set([
  'analyticsResource',
  'directory',
  'linkAggregator',
  'listenerDestination',
  'openSource',
  'publisherTool',
  'reviewResource',
  'socialPlatform',
  'transcriptResource',
  'value4value',
  'videoPlatform',
]);
const LEVELS = new Set(['show', 'episode', 'app']);
const KINDS = new Set([
  'apiLookup',
  'deterministic',
  'manualOnly',
  'opensAppOnly',
  'searchFallback',
]);
const SUPPORTS = new Set([
  'episodeDeepLink',
  'liveItem',
  'opensApp',
  'showDeepLink',
  'subscribeByFeed',
  'universalLink',
]);
const HELPERS = new Set(['base64url', 'encodeURIComponent', 'hex']);

// Placeholder -> sample value used to check that a filled-in template parses.
const VARIABLES = {
  appleID: '1200361736',
  feedURL: 'https://feeds.example.com/podcast.xml',
  strippedFeedURL: 'feeds.example.com/podcast.xml',
  podcastGUID: '917393e3-1b1e-5cef-ace4-edaa54e1f810',
  podcastIndexShowID: '920666',
  podcastIndexEpisodeID: '16795090',
  episodeGUID: 'episode-guid-1',
  enclosureURL: 'https://media.example.com/episode-1.mp3',
  uniquePlatformID: 'abc123',
  uniqueEpisodeID: 'def456',
  spotifyID: '4rOoJ6Egrf8K2IrywzwOMk',
  slug: 'example-show',
  deepLink: 'example.com/podcast/abc123',
};
// Variables that are public, open podcast identifiers. A `deterministic`
// web link may use only these.
const PUBLIC_KEYS = new Set([
  'appleID',
  'feedURL',
  'strippedFeedURL',
  'podcastGUID',
  'podcastIndexShowID',
  'podcastIndexEpisodeID',
  'episodeGUID',
  'enclosureURL',
  'slug',
]);

const RECORD_FIELDS = new Set([
  'id',
  'name',
  'tags',
  'webLinks',
  'appLinks',
  'api',
  'notes',
]);
const LINK_FIELDS = new Set([
  'level',
  'kind',
  'template',
  'requires',
  'supports',
  'source',
]);

const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);
const isString = (value) => typeof value === 'string' && value.trim() !== '';
const isObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function checkHttpUrl(where, value) {
  if (!isString(value)) return fail(where, 'must be a URL string');
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:')
      fail(where, `must be an http(s) URL: ${value}`);
  } catch {
    fail(where, `does not parse as a URL: ${value}`);
  }
}

function templateVariables(where, template) {
  const names = [];
  for (const [, expression] of template.matchAll(/\$\{([^}]*)\}/g)) {
    const call = /^([A-Za-z][A-Za-z0-9]*)\(([A-Za-z]+)\)$/.exec(expression);
    const name = call ? call[2] : expression;
    if (call && !HELPERS.has(call[1]))
      fail(where, `unknown helper "${call[1]}()"`);
    if (!/^[A-Za-z]+$/.test(name)) {
      fail(where, `malformed placeholder "\${${expression}}"`);
      continue;
    }
    if (!names.includes(name)) names.push(name);
  }
  if (/\$\{[^}]*$/.test(template) || /(^|[^$])\{[A-Za-z]+\}/.test(template))
    fail(where, 'has a placeholder without "${...}" syntax');
  return names;
}

function fill(template) {
  return template.replace(/\$\{([^}]*)\}/g, (_, expression) => {
    const call = /^([A-Za-z][A-Za-z0-9]*)\(([A-Za-z]+)\)$/.exec(expression);
    const value = VARIABLES[call ? call[2] : expression] ?? 'x';
    if (!call) return value;
    if (call[1] === 'encodeURIComponent') return encodeURIComponent(value);
    if (call[1] === 'base64url') return Buffer.from(value).toString('base64url');
    return Buffer.from(value).toString('hex');
  });
}

function checkLink(where, link, collection) {
  if (!isObject(link)) return fail(where, 'must be an object');
  for (const key of Object.keys(link))
    if (!LINK_FIELDS.has(key)) fail(where, `unknown field "${key}"`);

  if (!LEVELS.has(link.level)) fail(where, `unknown level "${link.level}"`);
  if (!KINDS.has(link.kind)) fail(where, `unknown kind "${link.kind}"`);
  if (collection === 'appLinks' && link.level !== 'app')
    fail(where, 'appLinks must have level "app"');
  if (collection === 'webLinks' && link.level === 'app')
    fail(where, 'webLinks must have level "show" or "episode"');

  const requires = Array.isArray(link.requires) ? link.requires : [];
  if (!Array.isArray(link.requires)) fail(where, 'requires must be an array');
  for (const name of requires)
    if (!Object.hasOwn(VARIABLES, name))
      fail(where, `unknown placeholder "${name}" in requires`);
  if (new Set(requires).size !== requires.length)
    fail(where, 'requires has duplicates');

  if (link.supports !== undefined) {
    if (!Array.isArray(link.supports)) fail(where, 'supports must be an array');
    else
      for (const support of link.supports)
        if (!SUPPORTS.has(support)) fail(where, `unknown support "${support}"`);
  }
  if (link.source !== undefined) checkHttpUrl(`${where}.source`, link.source);

  if (link.template === undefined) {
    if (link.kind !== 'searchFallback')
      fail(where, `template is required for kind "${link.kind}"`);
    return;
  }
  if (!isString(link.template)) return fail(where, 'template must be a string');

  const used = templateVariables(where, link.template);
  for (const name of used)
    if (!requires.includes(name))
      fail(where, `template uses "${name}" but requires does not list it`);
  for (const name of requires)
    if (!used.includes(name))
      fail(where, `requires lists "${name}" but the template does not use it`);

  if (link.kind === 'deterministic' && link.level !== 'app')
    for (const name of used)
      if (!PUBLIC_KEYS.has(name))
        fail(where, `deterministic link uses non-public "${name}"`);
  if (link.kind === 'opensAppOnly' && used.length)
    fail(where, 'opensAppOnly links take no placeholders');

  let url;
  try {
    url = new URL(fill(link.template));
  } catch {
    return fail(where, `template does not parse as a URL: ${link.template}`);
  }
  const web = url.protocol === 'https:' || url.protocol === 'http:';
  if (collection === 'webLinks' && !web)
    fail(where, 'web links must be http(s)');
  if (collection === 'appLinks' && web)
    fail(where, 'app links must use a custom scheme');
}

let platforms;
try {
  platforms = JSON.parse(readFileSync(file, 'utf8'));
} catch (error) {
  console.error(`Cannot read ${file}: ${error.message}`);
  process.exit(1);
}

if (!Array.isArray(platforms)) {
  fail('root', 'must be an array of platform records');
} else {
  let previous = '';
  const ids = new Set();
  platforms.forEach((platform, index) => {
    const where = isObject(platform) && isString(platform.id)
      ? platform.id
      : `[${index}]`;
    if (!isObject(platform)) return fail(where, 'must be an object');
    for (const key of Object.keys(platform))
      if (!RECORD_FIELDS.has(key)) fail(where, `unknown field "${key}"`);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(platform.id ?? ''))
      fail(where, 'id must be lowercase letters, digits and hyphens');
    else {
      if (ids.has(platform.id)) fail(where, 'duplicate id');
      if (platform.id < previous)
        fail(where, `ids must be sorted: "${platform.id}" comes after "${previous}"`);
      ids.add(platform.id);
      previous = platform.id;
    }
    if (!isString(platform.name)) fail(where, 'name is required');

    if (!Array.isArray(platform.tags) || platform.tags.length === 0)
      fail(where, 'tags must be a non-empty array');
    else
      for (const tag of platform.tags)
        if (!TAGS.has(tag)) fail(where, `unknown tag "${tag}"`);

    for (const collection of ['webLinks', 'appLinks']) {
      if (platform[collection] === undefined) continue;
      if (!Array.isArray(platform[collection]))
        fail(where, `${collection} must be an array`);
      else
        platform[collection].forEach((link, i) =>
          checkLink(`${where}.${collection}[${i}]`, link, collection),
        );
    }

    if (platform.api !== undefined) {
      if (!Array.isArray(platform.api)) fail(where, 'api must be an array');
      else
        platform.api.forEach((api, i) => {
          if (!isObject(api) || !isString(api.label))
            return fail(`${where}.api[${i}]`, 'needs a label and a url');
          checkHttpUrl(`${where}.api[${i}].url`, api.url);
        });
    }
    if (platform.notes !== undefined && !isString(platform.notes))
      fail(where, 'notes must be a non-empty string');
    if (!platform.webLinks?.length && !platform.appLinks?.length && !platform.api?.length)
      fail(where, 'needs at least one link method or API reference');
  });
}

if (errors.length) {
  console.error(`${errors.length} problem(s) in ${file}:`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
const methods = platforms.reduce(
  (sum, p) => sum + (p.webLinks?.length ?? 0) + (p.appLinks?.length ?? 0),
  0,
);
console.log(`OK: ${platforms.length} platforms, ${methods} link methods.`);
