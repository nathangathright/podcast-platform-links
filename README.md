# Podcast Platform Links
The distributed nature of podcasting makes linking to a show on a given platform complex. Some platforms provide [API methods](#api-methods) to determine exact URLs, some provide inexact search APIs, and some provide nothing at all. But many platforms support routes based on foreign keys like `appleID`, `feedUrl`, or `podcastindexID` for shows and `GUID` or `audioFileUrl` for episodes. These keys let us construct URLs with confidence.

## Terminology
* `slug`, in this context, is a string with a malleable, arbitrary value. For some platforms, it can be discarded entirely. 
* `uniquePlatformID` and `uniqueEpisodeID` represent an identifier specific to that platform. 
* `base64url()`, in this context, refers to a [URL-safe variant of base64](https://datatracker.ietf.org/doc/html/rfc4648#section-5).

## Shows

### Deterministic Platform Show Links
* Antennapod: `https://antennapod.org/deeplink/subscribe?url=${feedUrl}`
* Anytime Player: `https://anytimeplayer.app/subscribe?url=${feedUrl}`
* Apple Podcasts: `https://podcasts.apple.com/podcast/id${appleID}`
* Bullhorn: `https://bullhorn.fm/podchaser/itunes/${appleID}`
* Castbox: `https://castbox.fm/vic/${appleID}`
* Castro: `https://castro.fm/itunes/${appleID}`
* CurioCaster: `https://curiocaster.com/podcast/pi${podcastindexID}`
* Fountain: `https://fountain.fm/show/${podcastindexID}`
* Goodpods: `https://www.goodpods.com/podcasts-aid/${appleID}`
* Google Podcasts: `https://podcasts.google.com/?feed=${base64url(feedUrl)}` or `https://podcasts.google.com/subscribe-by-rss-feed?feed=${base64url(feedUrl)}`
* gpodder: `http://gpodder.net/subscribe?url=${feedUrl}`
* Moon FM: `https://moon.fm/itunes/${appleID}`
* Overcast: `https://overcast.fm/itunes${appleID}`
* Player FM: `https://player.fm/subscribe?id=${encodeURIComponent(feedUrl)}`
* Pocket Casts: `https://pca.st/itunes/${appleID}` or `http://pcasts.in/feed/${feedUrl}`
* Podbean: `https://www.podbean.com/itunes/${appleID}`
* Podcast Addict: `https://podcastaddict.com/feed/${encodeURIComponent(feedUrl)}`
* Podcast Guru: `https://app.podcastguru.io/podcast/${appleID}`
* Podcast Republic: `https://www.podcastrepublic.net/podcast/${appleID}`
* Podfriend: `https://web.podfriend.com/podcast/${appleID}`
* Podhero: `https://podhero.com/podcast/feed/${encodeURIComponent(feedUrl)}`
* Podknife: `https://podknife.com/podcast?feed_url=${feedUrl}`
* podStation: `https://podstation.github.io/subscribe-ext/?feedUrl=${appleID}`
* Podverse: `https://api.podverse.fm/api/v1/podcast/podcastindex/${podcastindexID}`
* Podvine: `https://podvine.com/link?feed=${feedUrl}`
* RadioPublic: `https://radiopublic.com/${encodeURIComponent(feedUrl)}`
* Sonnet: `https://sonnet.fm/p/${appleID}`

### Non-deterministic Platform Show Links
* Amazon Music: `https://music.amazon.com/podcasts/${uniquePlatformID}`
* Deezer: `https://www.deezer.com/us/show/${uniquePlatformID}`
* iHeartRadio: `https://iheart.com/podcast/${uniquePlatformID}`
* Luminary: `https://luminarypodcasts.com/listen/${slug}/${slug}/${uniquePlatformID}`
* Pandora: `https://pandora.com/podcast/${slug}/PC:${uniquePlatformID}`
* Spotify: `https://open.spotify.com/${uniquePlatformID}`
* Stitcher: `https://stitcher.com/s?fid=${uniquePlatformID}`
* TuneIn: `https://tunein.com/podcasts/${uniquePlatformID}`

## Episodes

### Deterministic Platform Episode Links
* Fountain: `https://fountain.fm/episode/${podcastindexID}`
* Google Podcasts: `https://podcasts.google.com/?feed=${base64url(feedUrl)}&episode=${base64url(episodeGuid)}`
* Player FM: `https://player.fm/series/${encodeURIComponent(feedUrl)}/guid:${encodeURIComponent(episodeGuid)}`
* Podcast Addict: `https://podcastaddict.com/episode/${encodeURIComponent(audioFileUrl)}`

### Non-deterministic Platform Episode Links
* Apple Podcasts: `https://podcasts.apple.com/podcast/id${appleID}?i=${uniqueEpisodeID}`
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
* Podverse: `https://podverse.fm/episode/${uniqueEpisodeID}`
* RadioPublic: `https://radiopublic.com/${encodeURIComponent(feedUrl)}/${uniqueEpisodeID}`
* Sonnet: `https://sonnet.fm/p/${appleID}/${uniqueEpisodeID}`
* Spotify: `https://open.spotify.com/episode/${uniqueEpisodeID}`
* Stitcher: `https://stitcher.com/show/${uniquePlatformID}/episode/${uniqueEpisodeID}`

## Resource Links
* Listen Notes: `https://listennotes.com/itunes/id${appleID}`
* Odesli: `https://pods.link/i/${appleID}`
* Plink: `https://plinkhq.com/i/${appleID}?to=page`
* pod.link: `https://pod.link/${appleID}` or `https://pod.link/${base64url(feedUrl)}`
* Podcast Index: `https://podcastindex.org/podcast/${podcastindexID}`
* Podchaser: `https://podchaser.com/f/pod/${appleID}`
* podfollow: `https://podfollow.com/${appleID}`
* Podnews: `https://podnews.net/podcast/${appleID}` or `https://podnews.net/podcast/pi${podcastindexID}`

## API Methods
* Request a `feedUrl` from an `appleID`: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcast`
* Request Apple episode IDs from an `appleID`: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcastEpisode&limit=300`
* Request a Podcast Index ID from an `appleID`/`feedUrl`: [Documentation](https://podcastindex-org.github.io/docs-api/#podcasts)

## Troubleshooting
* Check if an RSS feed is listed on Google Podcasts: [Documentation](https://podnews.net/article/google-podcasts-app-faq#-how-can-i-programmatically-check-that-a-feed-is-in-google-podcasts)
