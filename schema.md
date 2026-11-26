---
title: Data schema
---

# Platform data schema

[`_data/platforms.json`](https://github.com/nathangathright/podcast-platform-links/blob/main/_data/platforms.json) is the source of truth for every platform in this guide. It's an array of platform records, sorted by `id`. Check a change with:

```sh
node scripts/validate.mjs
```

The script has no dependencies and runs on Node 18 or later. The same check runs on every pull request.

## Platform record

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Stable identifier: lowercase letters, digits and hyphens. Records are sorted by it. |
| `name` | string | Yes | Display name. |
| `tags` | string[] | Yes | One or more [tags](#tags). |
| `webLinks` | LinkMethod[] | No | `http(s)` links to a show or episode. |
| `appLinks` | LinkMethod[] | No | Custom URL schemes that open an app. |
| `api` | ApiReference[] | No | Public API documentation. |
| `notes` | string | No | Short factual caveats about public behaviour. |

Every record needs at least one link method or API reference.

## Link method

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `level` | `show`, `episode` or `app` | Yes | What the link opens. `webLinks` use `show` or `episode`; `appLinks` use `app`. |
| `kind` | string | Yes | How the link is built. See [kinds](#kinds). |
| `template` | string | Yes, except for `searchFallback` | The URL pattern, with [placeholders](#placeholders). |
| `requires` | string[] | Yes | Exactly the placeholders the template uses. |
| `supports` | string[] | No | What the link can do. See [supports](#supports). |
| `source` | URL | No | Public documentation or another public reference for the method. |

## API reference

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | string | Yes | Name of the API or documentation. |
| `url` | URL | Yes | Public documentation URL. |

## Placeholders

Templates write placeholders as `${name}`, or as `${helper(name)}` when the value must be encoded first.

| Placeholder | Meaning |
| --- | --- |
| `appleID` | The ID Apple Podcasts assigns to each show in its directory. |
| `feedURL` | The podcast's RSS feed URL, including its `https://` or `http://` protocol. |
| `strippedFeedURL` | The RSS feed URL without its protocol, as most URL schemes expect. |
| `podcastGUID` | The `podcast:guid` from the feed, or the one the Podcast Index generates for it. |
| `podcastIndexShowID` | The ID the Podcast Index assigns to each show. |
| `podcastIndexEpisodeID` | The ID the Podcast Index assigns to each episode. |
| `episodeGUID` | The episode's `<guid>` from the feed. |
| `enclosureURL` | The URL of the episode's media file. |
| `slug` | A descriptive string whose value doesn't matter. Some platforms accept any value. |
| `uniquePlatformID` | The platform's own ID for a show, found through its API, search or share links. |
| `uniqueEpisodeID` | The platform's own ID for an episode. |
| `spotifyID` | Spotify's ID for a show. |
| `deepLink` | A universal link on the app's own domain, without its protocol. |

Helpers:

- `encodeURIComponent()`: percent-encodes special characters ([RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-2.1)).
- `base64url()`: URL-safe base64 ([RFC 4648 §5](https://datatracker.ietf.org/doc/html/rfc4648#section-5)).
- `hex()`: base16 ([RFC 4648 §8](https://datatracker.ietf.org/doc/html/rfc4648#section-8)).

These are the names `README.md` and `schemes.md` have always used, with one change: `schemes.md` wrote the protocol-less feed URL as `${feedURL}`, which is `${strippedFeedURL}` here. Overcast's scheme is the exception, because it needs the protocol, so it keeps `${feedURL}`.

## Kinds

| Kind | Meaning |
| --- | --- |
| `deterministic` | Built entirely from public keys: `appleID`, `feedURL`, `strippedFeedURL`, `podcastGUID`, `podcastIndexShowID`, `podcastIndexEpisodeID`, `episodeGUID`, `enclosureURL` and `slug`. For app links, the scheme takes content (a feed URL or a deep link). |
| `apiLookup` | Needs the platform's own ID, which its public API or search can find. |
| `manualOnly` | Needs the platform's own ID, with no known public way to look it up. |
| `searchFallback` | Lands on a search for the title. It may not find an exact match. |
| `opensAppOnly` | Opens the app but isn't known to open specific content. Takes no placeholders. |

## Supports

| Value | Meaning |
| --- | --- |
| `showDeepLink` | Opens a show, series or podcast page. |
| `episodeDeepLink` | Opens a specific episode. |
| `subscribeByFeed` | Takes a feed URL, so any public feed can be opened or followed. |
| `universalLink` | An `https` link that the platform's app can open directly when it's installed. |
| `liveItem` | Can open a live item. |
| `opensApp` | Opens the app without opening specific content. |

## Tags

Tags describe a platform. They can overlap, and they aren't recommendations.

| Tag | Meaning |
| --- | --- |
| `listenerDestination` | Somewhere a listener can play, follow or save a podcast. |
| `directory` | A searchable catalogue, index or metadata source. |
| `linkAggregator` | Sends people on to several listening apps. |
| `reviewResource` | Reviews, ratings or recommendations. |
| `analyticsResource` | Analysis, charts or research about podcasts. |
| `transcriptResource` | Transcripts, clips or other text about episodes. |
| `publisherTool` | Hosting, publishing or other tools for podcasters. |
| `openSource` | The app or project is open source. |
| `value4value` | Supports Podcasting 2.0 value-for-value payments. |
| `videoPlatform` | A video or playlist platform. |
| `socialPlatform` | A social network. |

## What the validator checks

- The file is an array of records with only the fields above.
- Ids are unique, valid and sorted.
- Tags, levels, kinds and supports are known values.
- Each template's placeholders exactly match its `requires`, and only known placeholders and helpers are used.
- A `deterministic` web link uses only public keys, and an `opensAppOnly` link uses no placeholders.
- Each template parses as a URL once sample values are filled in. Web links are `http(s)` and app links use a custom scheme.
- `source` and API URLs parse as `http(s)` URLs.
