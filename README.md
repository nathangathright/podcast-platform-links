# Podcast Platform Links
The distributed nature of podcasting makes linking to a show on a given platform complex. Some platforms provide [API methods](#api-methods) to determine exact URLs, some provide inexact search APIs, and some provide nothing at all. But many platforms support routes based on foreign keys like `appleID` or `feedUrl` for shows and `GUID` or `audioFileUrl` for episodes. These keys let us construct URLs with confidence.

## Terminology
In this context, a `slug` is a string with a malleable, arbitrary value. For some platforms, it can be discarded entirely. A `uniquePlatformID` or `uniqueEpisodeID` represents an identifier specific to that platform. Instead of `btoa()`, Google Podcasts uses a URL-safe variant of base64 for their hashes that replaces `+` and `/` with `-` and `_` respectively.

## Shows

### Deterministic Platform Show Links
* Apple Podcasts: `https://podcasts.apple.com/podcast/id${appleID}`
* Breaker: `https://breaker.audio/shows?feed_url=${encodeURIComponent(feedUrl)}`
* Bullhorn: `https://bullhorn.fm/podchaser/itunes/${appleID}`
* Castbox: `https://castbox.fm/vic/${appleID}`
* Castro: `https://castro.fm/itunes/${appleID}`
* Google Podcasts: `https://podcasts.google.com/?feed=${btoa(feedUrl)}`
* Overcast: `https://overcast.fm/itunes${appleID}`
* Player FM: `https://player.fm/series/${encodeURIComponent(feedUrl)}`
* Pocket Casts: `https://pca.st/itunes/${appleID}`
* Podbean: `https://podbean.com/play/${encodeURIComponent(feedUrl)}`
* Podcast Addict: `https://podcastaddict.com/feed/${encodeURIComponent(rssFeedUrl)}`
* Podcast Guru: `https://app.podcastguru.io/podcast/${appleID}`
* Podfriend: `https://web.podfriend.com/podcast/${appleID}`
* Podhero: `https://podhero.com/podcast/feed/${encodeURIComponent(feedUrl)}`
* Podknife: `https://podknife.com/podcast?feed_url=${appleID}`
* RadioPublic: `https://radiopublic.com/${encodeURIComponent(feedUrl)}`
* Sonnet: `https://sonnet.fm/p/${appleID}`

### Non-deterministic Platform Show Links
* Amazon Music: `https://music.amazon.com/podcasts/${uniquePlatformID}`
* iHeartRadio: `https://iheart.com/podcast/${uniquePlatformID}`
* Luminary: `https://luminarypodcasts.com/listen/${slug}/${slug}/${uniquePlatformID}`
* Pandora: `https://pandora.com/podcast/${slug}/PC:${uniquePlatformID}`
* Spotify: `https://open.spotify.com/${uniquePlatformID}`
* Stitcher: `https://stitcher.com/s?fid=${uniquePlatformID}`
* TuneIn: `https://tunein.com/podcasts/${uniquePlatformID}`

## Episodes

### Deterministic Platform Episode Links
* Google Podcasts: `https://podcasts.google.com/?feed=${btoa(feedUrl)}&episode=${btoa(episodeGuid)}`
* Player FM: `https://player.fm/series/${encodeURIComponent(feedUrl)}/guid:${encodeURIComponent(episodeGuid)}`
* Podcast Addict: `https://podcastaddict.com/episode/${encodeURIComponent(audioFileUrl)}`

### Non-deterministic Platform Episode Links
* Apple Podcasts: `https://podcasts.apple.com/podcast/id${appleID}?i=${uniqueEpisodeID}`
* Breaker: `https://breaker.audio/${uniquePlatformID}/e/${uniqueEpisodeID}`
* Bullhorn: `https://bullhorn.fm/${uniquePlatformID}/posts/${uniqueEpisodeID}`
* Castbox: `https://castbox.fm/episode/${slug}-id${uniquePlatformID}-id${uniqueEpisodeID}`
* Castro: `https://castro.fm/episode/${uniqueEpisodeID}`
* iHeartRadio: `https://iheart.com/podcast/${slug}-${uniquePlatformID}/episode/${slug}-${uniqueEpisodeID}/`
* Luminary: `https://luminarypodcasts.com/listen/${slug}/${uniquePlatformID}/${slug}/${uniqueEpisodeID}`
* Overcast: `https://overcast.fm/+${uniqueEpisodeID}`
* Pocket Casts: `https://pca.st/itunes/${appleID}`
* Podbean: `https://podbean.com/media/share/dir-${uniqueEpisodeID}`
* Podcast Guru: `https://app.podcastguru.io/podcast/${appleID}/episode/${slug}-${uniqueEpisodeID}`
* Podfriend: `https://web.podfriend.com/podcast/${appleID}/${uniqueEpisodeID}`
* Podhero: `https://podhero.com/${uniquePlatformID}/${slug}-${uniqueEpisodeID}`
* Podknife: `https://podknife.com/episodes/${uniqueEpisodeID}`
* RadioPublic: `https://radiopublic.com/${encodeURIComponent(feedUrl)}/${uniqueEpisodeID}`
* Sonnet: `https://sonnet.fm/p/${appleID}/${uniqueEpisodeID}`
* Spotify: `https://open.spotify.com/episode/${uniqueEpisodeID}`
* Stitcher: `https://stitcher.com/show/${uniquePlatformID}/episode/${uniqueEpisodeID}`

## Resource Links
* Listen Notes: `https://listennotes.com/itunes/id${appleID}`
* Odesli: `https://pods.link/i/${appleID}`
* Plink: `https://plinkhq.com/i/${appleID}?to=page`
* pod.link: `https://pod.link/${appleID}`
* Podcast Index: `https://podcastindex.org/podcast/${uniquePlatformID}`
* Podchaser: `https://podchaser.com/f/pod/${appleID}`
* podfollow: `https://podfollow.com/${appleID}`
* Podnews: `https://podnews.net/podcast/${appleID}` or `https://podnews.net/podcast/pi${podcastindexID}`

## API Methods
* Request a `feedUrl` from an `appleID`: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcast`
* Request Apple episode IDs from an `appleID`: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcastEpisode&limit=300`
* Request a Breaker ID from an `appleID`/`feedUrl`: [Documentation](https://blog.breaker.audio/how-to-add-a-podcast-to-breaker-68677e12c0c3#4d0f)
* Request a Podcast Index ID from an `appleID`/`feedUrl`: [Documentation](https://podcastindex-org.github.io/docs-api/#podcasts)
