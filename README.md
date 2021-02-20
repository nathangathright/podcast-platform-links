# Podcast Platform Links
Many podcast apps have deterministic URLs if you know their `appleID` or `feedUrl`. Some require lookups in their API, and some support both. A handful also support episode URLs based on a `GUID` found in the RSS feed. Those variables will be used to construct our deterministic URLs.

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
<!-- * Podknife: `https://podknife.com/podcast?feed_url=${appleID}` -->
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
For the purposes of this list, a `slug` is a string with an arbitrary value. It’s presence might not be necessary to form a valid URL. A `uniquePlatformID` or `uniqueEpisodeID` may look like a slug, but are not malleable in the way a slug is.

### Deterministic Platform Episode Links
* Google Podcasts: `https://podcasts.google.com/?feed=${btoa(feedUrl)}&episode=${btoa(episodeGuid)}?i=${appleEpisodeID}`
* Player FM: `https://player.fm/series/${encodeURIComponent(feedUrl)}/guid:${encodeURIComponent(episodeGuid)}`
* Podcast Addict: `https://podcastaddict.com/episode/${encodeURIComponent(audioFileUrl)}`

### Non-deterministic Platform Episode Links
* Apple Podcasts: `https://podcasts.apple.com/podcast/id${appleID}?i=${appleEpisodeID}`
* Breaker: `https://breaker.audio/${uniquePlatformID}/e/${uniqueEpisodeID}`
* Bullhorn: `https://bullhorn.fm/${uniquePlatformID}/posts/${uniqueEpisodeID}`
* Castbox: `https://castbox.fm/episode/${slug}-id${uniquePlatformID}-id${uniqueEpisodeID}`
* iHeartRadio: `https://iheart.com/podcast/${slug}-${uniquePlatformID}/episode/${slug}-${uniqueEpisodeID}/`
* Luminary: `https://luminarypodcasts.com/listen/${slug}/${uniquePlatformID}/${slug}/${uniqueEpisodeID}`
* Overcast: `https://overcast.fm/+${uniqueEpisodeID}`
* Pocket Casts: `https://pca.st/itunes/${appleID}`
* Podbean: `https://www.podbean.com/media/share/dir-${uniqueEpisodeID}`
* Podcast Guru: `https://app.podcastguru.io/podcast/${appleID}/episode/${slug}-${uniqueEpisodeID}`
* Podfriend: `https://web.podfriend.com/podcast/${appleID}/${uniqueEpisodeID}`
* Podhero: `https://podhero.com/${uniquePlatformID}/${slug}-${uniqueEpisodeID}`
* Podknife: `https://podknife.com/episodes/${uniqueEpisodeID}`
* RadioPublic: `https://radiopublic.com/${encodeURIComponent(feedUrl)}/${uniqueEpisodeID}`
* Spotify: `https://open.spotify.com/episode/${uniqueEpisodeID}`
* Stitcher: `https://www.stitcher.com/show/${uniquePlatformID}/episode/${uniqueEpisodeID}`

### No Episode Links
* Castro
* Sonnet

## Resource Links
* Listen Notes: `https://listennotes.com/itunes/id${appleID}`
* Odesli: `https://pods.link/i/${appleID}`
* Plink: `https://plinkhq.com/i/${appleID}?to=page`
* pod.link: `https://pod.link/${appleID}`
* Podcast Index: `https://podcastindex.org/podcast/${podcastIndexID}`
* Podchaser: `https://podchaser.com/f/pod/${appleID}`
* podfollow: `https://podfollow.com/${appleID}`
* Podnews: `https://podnews.net/podcast/${appleID}`

## Example Lookups
* Request a `feedUrl` from an `appleID`: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcast`
* Request Apple episode IDs from an `appleID`: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcastEpisode&limit=300`
* Request a Breaker ID from an `appleID`/`feedUrl`: [Documentation](https://blog.breaker.audio/how-to-add-a-podcast-to-breaker-68677e12c0c3#4d0f)
* Request a Podcast Index ID from an `appleID`/`feedUrl`: [Documentation](https://podcastindex-org.github.io/docs-api/#podcasts)

## Technical Considerations
* Instead of btoa(), Google Podcasts uses a URL-safe variant of base64 for their hashes that replaces `+` and `/` with `-` and `_` respectively.
