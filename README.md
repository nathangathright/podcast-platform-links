# Podcast Platform Links

Podcasting is distributed, so linking to a show or episode is different on every platform. This guide documents the link formats you can observe for each one: which links you can build from open podcast identifiers (Apple Podcasts ID, feed URL, podcast GUID, Podcast Index IDs), which need the platform's own ID or an API lookup, and which URL schemes open each app.

**Browse it at [nathangathright.github.io/podcast-platform-links](https://nathangathright.github.io/podcast-platform-links/).** You can search, filter by tag or link type, and link to a single platform.

The data is also published as JSON at [`platforms.json`](https://nathangathright.github.io/podcast-platform-links/platforms.json).

## Add or fix a platform

Every platform is one record in [`_data/platforms.json`](_data/platforms.json), and the site is built from that file.

1. Edit or add the platform's record. Keep records sorted by `id`. [`schema.md`](schema.md) describes each field, the placeholders and the tags.
2. Run the validator. It needs only Node.

   ```sh
   node scripts/validate.mjs
   ```

3. Open a pull request with an example URL for each link you add or change, and what it opened. The validator runs on every pull request.

You can edit the file in GitHub's web editor without cloning the repo.
