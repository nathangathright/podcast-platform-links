# Podcast Platform Links
The distributed nature of podcasting makes linking to a show on a given platform complex. Some platforms provide API methods to determine exact URLs, some provide inexact search APIs, and some provide nothing at all. But many platforms support routes based on foreign keys that let us construct URLs with confidence.

## Table of Contents
1. [Glossary](#glossary)
1. [Show Links](#show-links)
1. [Episode Links](#episode-links)
1. [Resource Links](#resource-links)
1. [Tips & Tricks](#tips--tricks)
1. [Contributing](#contributing)
1. [Footnotes](#footnotes)

## Glossary
### Show-level foreign keys
* `appleID`: An ID assigned by Apple Podcasts to each show submitted to their directory.
* `feedURL`: The RSS feed URL of the podcast.
* `podcastGUID`: A UUID provided in the RSS feeds of some podcasts or generated for them by the Podcast Index.
* `podcastIndexShowID`: An ID assigned by the Podcast Index to each show submitted to their directory.

### Episode-level foreign keys
* `enclosureURL`: The URL of the media for each episode.
* `episodeGUID`: An identifying string for each episode in the RSS feeds of most, but not all podcasts.
* `podcastIndexEpisodeID`: An ID assigned by the Podcast Index to each episode in their directory.

### Other
* `slug`: In this context, a string with a malleable, arbitrary value. For some platforms, it can be discarded entirely. 
* `uniquePlatformID` and `uniqueEpisodeID`: A platform-specific identifier that may only be obtained via API or not at all.
* `base64url()`: A [URL-safe variant of base64](https://datatracker.ietf.org/doc/html/rfc4648#section-5).

## Show Links
| Destination | Deterministic | URL Pattern |
| ----------- | ------------- | ----------- |
| Amazon Music | ❌ | `https://music.amazon.com/podcasts/${uniquePlatformID}` |
| Antennapod | ✅ | `https://antennapod.org/deeplink/subscribe?url=${feedURL}` |
| Anytime Player | ✅ | `https://anytimeplayer.app/subscribe?url=${feedURL}` |
| Apple Podcasts | ✅ | `https://podcasts.apple.com/podcast/id${appleID}` |
| Bullhorn | ✅ | `https://bullhorn.fm/podchaser/itunes/${appleID}` |
| Castbox | ✅ | `https://castbox.fm/vic/${appleID}` |
| Castro | ✅ | `https://castro.fm/itunes/${appleID}` |
| CurioCaster | ✅ | `https://curiocaster.com/podcast/pi${podcastIndexShowID}` |
| Deezer | ❌ | `https://www.deezer.com/us/show/${uniquePlatformID}` |
| Fountain | ✅ | `https://fountain.fm/show/${podcastIndexShowID}` |
| Goodpods | ✅ | `https://www.goodpods.com/podcasts-aid/${appleID}` |
| Google Podcasts[^1] | ✅ | `https://podcasts.google.com/?feed=${base64url(feedURL)}` <br> `https://podcasts.google.com/subscribe-by-rss-feed?feed=${base64url(feedURL)}` |
| gpodder | ✅ | `http://gpodder.net/subscribe?url=${feedURL}` |
| iHeartRadio | ❌ | `https://iheart.com/podcast/${uniquePlatformID}` |
| Jam | ✅ | `https://www.listentojam.com/itunes/${appleID}` |
| Luminary | ❌ | `https://luminarypodcasts.com/listen/${slug}/${slug}/${uniquePlatformID}` |
| Moon FM | ✅ | `https://moon.fm/itunes/${appleID}` |
| Overcast | ✅ | `https://overcast.fm/itunes${appleID}` |
| Pandora | ❌ | `https://pandora.com/podcast/${slug}/PC:${uniquePlatformID}` |
| Player FM | ✅ | `https://player.fm/subscribe?id=${encodeURIComponent(feedURL)}` |
| Pocket Casts | ✅ | `https://pca.st/itunes/${appleID}` <br> `http://pcasts.in/feed/${feedURL}` |
| Podbean | ✅ | `https://www.podbean.com/itunes/${appleID}` |
| Podcast Addict | ✅ | `https://podcastaddict.com/feed/${encodeURIComponent(feedURL)}` |
| Podcast Guru | ✅ | `https://app.podcastguru.io/podcast/${appleID}` |
| Podcast Republic | ✅ | `https://www.podcastrepublic.net/podcast/${appleID}` |
| Podfans | ❌ | `https://podfans.fm/${uniquePlatformID}` |
| Podfriend | ✅ | `https://web.podfriend.com/podcast/${appleID}` |
| Podhero | ✅ | `https://podhero.com/podcast/feed/${encodeURIComponent(feedURL)}` |
| Podknife | ✅ | `https://podknife.com/podcast?feed_url=${feedURL}` |
| podStation | ✅ | `https://podstation.github.io/subscribe-ext/?feedURL=${appleID}` |
| Podverse | ✅ | `https://api.podverse.fm/api/v1/podcast/podcastindex/${podcastIndexShowID}` |
| Podvine | ✅ | `https://podvine.com/link?feed=${feedURL}` |
| RadioPublic | ✅ | `https://radiopublic.com/${encodeURIComponent(feedURL)}` |
| Sonnet | ✅ | `https://sonnet.fm/p/${appleID}` |
| Spotify | ❌ | `https://open.spotify.com/${uniquePlatformID}` |
| Steno.fm | ✅ | `https://steno.fm/show/${podcastGUID}` |
| TuneIn | ❌ | `https://tunein.com/podcasts/${uniquePlatformID}` |

## Episode Links
| Destination | Deterministic | URL Pattern |
| ----------- | ------------- | ----------- |
| Apple Podcasts | ❌ | `https://podcasts.apple.com/podcast/id${appleID}?i=${uniqueEpisodeID}` |
| Bullhorn | ❌ | `https://bullhorn.fm/${uniquePlatformID}/posts/${uniqueEpisodeID}` |
| Castbox | ❌ | `https://castbox.fm/episode/${slug}-id${uniquePlatformID}-id${uniqueEpisodeID}` |
| Castro | ❌ | `https://castro.fm/episode/${uniqueEpisodeID}` |
| Fountain | ✅ | `https://fountain.fm/episode/${podcastIndexEpisodeID}` |
| Google Podcasts[^1] | ✅ | `https://podcasts.google.com/?feed=${base64url(feedURL)}&episode=${base64url(episodeGUID)}` |
| iHeartRadio | ❌ | `https://iheart.com/podcast/${slug}-${uniquePlatformID}/episode/${slug}-${uniqueEpisodeID}` |
| Luminary | ❌ | `https://luminarypodcasts.com/listen/${slug}/${uniquePlatformID}/${slug}/${uniqueEpisodeID}` |
| Overcast | ❌ | `https://overcast.fm/+${uniqueEpisodeID}` |
| Player FM | ✅ | `https://player.fm/series/${encodeURIComponent(feedURL)}/guid:${encodeURIComponent(episodeGUID)}` |
| Podbean | ❌ | `https://podbean.com/media/share/dir-${uniqueEpisodeID}` |
| Podcast Addict | ✅ | `https://podcastaddict.com/episode/${encodeURIComponent(enclosureURL)}` |
| Podcast Guru | ❌ | `https://app.podcastguru.io/podcast/${appleID}/episode/${slug}-${uniqueEpisodeID}` |
| Podfans | ❌ | `https://podfans.fm/${slug}/${uniqueEpisodeID}` |
| Podfriend | ❌ | `https://web.podfriend.com/podcast/${appleID}/${uniqueEpisodeID}` |
| Podknife | ❌ | `https://podknife.com/episodes/${uniqueEpisodeID}` |
| Podverse | ❌ | `https://podverse.fm/episode/${uniqueEpisodeID}` |
| Sonnet | ❌ | `https://sonnet.fm/p/${appleID}/${uniqueEpisodeID}` |
| Spotify | ❌ | `https://open.spotify.com/episode/${uniqueEpisodeID}` |
| Steno.fm | ✅ | `https://steno.fm/show/${podcastGUID}/episode/${base64url(episodeGUID)}` |

## Resource Links
These resources also support podcast foreign keys, but their primary purpose may be directing listeners to one of the apps above rather than a primary listening destination.

| Destination | URL Pattern |
| ----------- | ----------- |
| Listen Notes | `https://listennotes.com/itunes/id${appleID}` |
| Odesli | `https://pods.link/i/${appleID}` |
| Plink | `https://plinkhq.com/i/${appleID}?to=page` |
| pod.link | `https://pod.link/${appleID}` <br> `https://pod.link/${base64url(feedURL)}` |
| Podcast Index | `https://podcastindex.org/podcast/${podcastIndexShowID}` |
| Podchaser | `https://podchaser.com/f/pod/${appleID}` |
| podfollow | `https://podfollow.com/${appleID}` |
| Podnews | `https://podnews.net/podcast/${appleID}` <br> `https://podnews.net/podcast/pi${podcastIndexShowID}` |

## Tips & Tricks
### Request a feedURL from an appleID
```http
GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcast
```

### Request the 300 most-recent Apple Episode IDs from an appleID
```http
GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcastEpisode&limit=300
```

### Request a podcastGUID/podcastIndexShowID from an appleID/feedURL
[Documentation](https://podcastindex-org.github.io/docs-api/#podcasts)
```http
GET https://api.podcastindex.org/api/1.0/podcasts/byitunesid?id=${appleID}
GET https://api.podcastindex.org/api/1.0/podcasts/byfeedurl?id=${feedURL}
```

### Check if an RSS feed is listed on Google Podcasts
[Documentation](https://podnews.net/article/google-podcasts-app-faq#-how-can-i-programmatically-check-that-a-feed-is-in-google-podcasts)

## Contributing
If you have an update to improve this guide, please [fork the repo](https://github.com/nathangathright/podcast-platform-links/fork) and create a pull request. This Markdown document is easily editable from the GitHub web interface without the need to clone the repo locally.

## Footnotes
[^1]: [Google Podcasts to shut down in 2024 with listeners migrated to YouTube Music](https://techcrunch.com/2023/09/26/google-podcasts-to-shut-down-in-2024-with-listeners-migrated-to-youtube-music/)
