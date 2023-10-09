# Podcast Platform Links
The distributed nature of podcasting makes linking to a show on a given platform complex. Some platforms provide [API methods](#api-methods) to determine exact URLs, some provide inexact search APIs, and some provide nothing at all. But many platforms support routes based on foreign keys that let us construct URLs with confidence.

## Foreign Keys
### Shows
* `appleID`: An ID assigned by Apple Podcasts to each show submitted to their directory.
* `feedURL`: The URL of the RSS feed for the podcast.
* `podcastGUID`: A UUID provided in the RSS feeds of some podcasts or generated for them by the Podcast Index.
* `podcastIndexShowID`: An ID assigned by the Podcast Index to each show submitted to their directory.

### Episodes
* `enclosureURL`: The URL of the media for each episode.
* `episodeGUID`: An identifying string for each episode in the RSS feeds of most, but not all podcasts.
* `podcastIndexEpisodeID` An ID assigned by the Podcast Index to each episode in their directory.

## Terminology
* `slug`, in this context, is a string with a malleable, arbitrary value. For some platforms, it can be discarded entirely. 
* `uniquePlatformID` and `uniqueEpisodeID` represent an identifier specific to that platform. 
* `base64url()`, in this context, refers to a [URL-safe variant of base64](https://datatracker.ietf.org/doc/html/rfc4648#section-5).

## Shows

### Deterministic Show Links
* Antennapod: `https://antennapod.org/deeplink/subscribe?url=${feedURL}`
* Anytime Player: `https://anytimeplayer.app/subscribe?url=${feedURL}`
* Apple Podcasts: `https://podcasts.apple.com/podcast/id${appleID}`
* Bullhorn: `https://bullhorn.fm/podchaser/itunes/${appleID}`
* Castbox: `https://castbox.fm/vic/${appleID}`
* Castro: `https://castro.fm/itunes/${appleID}`
* CurioCaster: `https://curiocaster.com/podcast/pi${podcastIndexShowID}`
* Fountain: `https://fountain.fm/show/${podcastIndexShowID}`
* Goodpods: `https://www.goodpods.com/podcasts-aid/${appleID}`
* Google Podcasts[^1]: `https://podcasts.google.com/?feed=${base64url(feedURL)}` or `https://podcasts.google.com/subscribe-by-rss-feed?feed=${base64url(feedURL)}`
* gpodder: `http://gpodder.net/subscribe?url=${feedURL}`
* Jam: `https://www.listentojam.com/itunes/${appleID}`
* Moon FM: `https://moon.fm/itunes/${appleID}`
* Overcast: `https://overcast.fm/itunes${appleID}`
* Player FM: `https://player.fm/subscribe?id=${encodeURIComponent(feedURL)}`
* Pocket Casts: `https://pca.st/itunes/${appleID}` or `http://pcasts.in/feed/${feedURL}`
* Podbean: `https://www.podbean.com/itunes/${appleID}`
* Podcast Addict: `https://podcastaddict.com/feed/${encodeURIComponent(feedURL)}`
* Podcast Guru: `https://app.podcastguru.io/podcast/${appleID}`
* Podcast Republic: `https://www.podcastrepublic.net/podcast/${appleID}`
* Podfriend: `https://web.podfriend.com/podcast/${appleID}`
* Podhero: `https://podhero.com/podcast/feed/${encodeURIComponent(feedURL)}`
* Podknife: `https://podknife.com/podcast?feed_url=${feedURL}`
* podStation: `https://podstation.github.io/subscribe-ext/?feedURL=${appleID}`
* Podverse: `https://api.podverse.fm/api/v1/podcast/podcastindex/${podcastIndexShowID}`
* Podvine: `https://podvine.com/link?feed=${feedURL}`
* RadioPublic: `https://radiopublic.com/${encodeURIComponent(feedURL)}`
* Steno.fm: `https://steno.fm/show/${podcastGUID}`
* Sonnet: `https://sonnet.fm/p/${appleID}`

### Non-deterministic Show Links
* Amazon Music: `https://music.amazon.com/podcasts/${uniquePlatformID}`
* Deezer: `https://www.deezer.com/us/show/${uniquePlatformID}`
* iHeartRadio: `https://iheart.com/podcast/${uniquePlatformID}`
* Luminary: `https://luminarypodcasts.com/listen/${slug}/${slug}/${uniquePlatformID}`
* Pandora: `https://pandora.com/podcast/${slug}/PC:${uniquePlatformID}`
* Podfans: `https://podfans.fm/${uniquePlatformID}`
* Spotify: `https://open.spotify.com/${uniquePlatformID}`
* TuneIn: `https://tunein.com/podcasts/${uniquePlatformID}`

## Episodes

### Deterministic Episode Links
* Fountain: `https://fountain.fm/episode/${podcastIndexEpisodeID}`
* Google Podcasts[^1]: `https://podcasts.google.com/?feed=${base64url(feedURL)}&episode=${base64url(episodeGUID)}`
* Player FM: `https://player.fm/series/${encodeURIComponent(feedURL)}/guid:${encodeURIComponent(episodeGUID)}`
* Podcast Addict: `https://podcastaddict.com/episode/${encodeURIComponent(enclosureURL)}`

### Non-deterministic Episode Links
* Apple Podcasts: `https://podcasts.apple.com/podcast/id${appleID}?i=${uniqueEpisodeID}`
* Bullhorn: `https://bullhorn.fm/${uniquePlatformID}/posts/${uniqueEpisodeID}`
* Castbox: `https://castbox.fm/episode/${slug}-id${uniquePlatformID}-id${uniqueEpisodeID}`
* Castro: `https://castro.fm/episode/${uniqueEpisodeID}`
* iHeartRadio: `https://iheart.com/podcast/${slug}-${uniquePlatformID}/episode/${slug}-${uniqueEpisodeID}/`
* Luminary: `https://luminarypodcasts.com/listen/${slug}/${uniquePlatformID}/${slug}/${uniqueEpisodeID}`
* Overcast: `https://overcast.fm/+${uniqueEpisodeID}`
* Podbean: `https://podbean.com/media/share/dir-${uniqueEpisodeID}`
* Podcast Guru: `https://app.podcastguru.io/podcast/${appleID}/episode/${slug}-${uniqueEpisodeID}`
* Podfans: `https://podfans.fm/${slug}/${uniqueEpisodeID}`
* Podfriend: `https://web.podfriend.com/podcast/${appleID}/${uniqueEpisodeID}`
* Podknife: `https://podknife.com/episodes/${uniqueEpisodeID}`
* Podverse: `https://podverse.fm/episode/${uniqueEpisodeID}`
* Sonnet: `https://sonnet.fm/p/${appleID}/${uniqueEpisodeID}`
* Spotify: `https://open.spotify.com/episode/${uniqueEpisodeID}`

## Resource Links
* Listen Notes: `https://listennotes.com/itunes/id${appleID}`
* Odesli: `https://pods.link/i/${appleID}`
* Plink: `https://plinkhq.com/i/${appleID}?to=page`
* pod.link: `https://pod.link/${appleID}` or `https://pod.link/${base64url(feedURL)}`
* Podcast Index: `https://podcastindex.org/podcast/${podcastIndexShowID}`
* Podchaser: `https://podchaser.com/f/pod/${appleID}`
* podfollow: `https://podfollow.com/${appleID}`
* Podnews: `https://podnews.net/podcast/${appleID}` or `https://podnews.net/podcast/pi${podcastIndexShowID}`

## API Methods
* Request a `feedURL` from an `appleID`: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcast`
* Request the 300 most-recent Apple Episode IDs from an `appleID`: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcastEpisode&limit=300`
* Request a `podcastIndexShowID` from an `appleID`/`feedURL`: [Documentation](https://podcastindex-org.github.io/docs-api/#podcasts)

## Troubleshooting
* Check if an RSS feed is listed on Google Podcasts: [Documentation](https://podnews.net/article/google-podcasts-app-faq#-how-can-i-programmatically-check-that-a-feed-is-in-google-podcasts)

## Footnotes
[^1]: [Google Podcasts to shut down in 2024 with listeners migrated to YouTube Music](https://techcrunch.com/2023/09/26/google-podcasts-to-shut-down-in-2024-with-listeners-migrated-to-youtube-music/)
