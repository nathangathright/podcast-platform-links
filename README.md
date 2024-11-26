# Podcast Platform Links
The distributed nature of podcasting makes it complicated to link to a show/episode on a given platform. Some platforms provide [API methods](#api-documentation) to determine exact URLs or nothing at all, but many platforms support routes based on foreign keys that let us construct URLs with confidence.

## Table of Contents
1. [Glossary](#glossary)
1. [Show Links](#show-links)
1. [Episode Links](#episode-links)
1. [Resource Links](#resource-links)
1. [API Documentation](#api-documentation)
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
* `base16()` or `hex()`: A method of encoding strings using a [hexadecimal numeral system](https://datatracker.ietf.org/doc/html/rfc4648#section-8).
* `base64url()`: A method of encoding strings using a [URL-safe variant of base64](https://datatracker.ietf.org/doc/html/rfc4648#section-5).
* `encodeURIComponent()`: A method of encoding strings by replacing special characters with [their UTF-8 encoding](https://datatracker.ietf.org/doc/html/rfc3986#section-2.1).
* `slug`: In this context, a string with a malleable, arbitrary value. For some platforms, it can be discarded entirely. 
* `uniquePlatformID` and `uniqueEpisodeID`: A platform-specific identifier that may only be obtained via API or not at all.

## Show Links
| Platform         | Foreign Keys | URL Pattern                                                                 |
|------------------|--------------|-----------------------------------------------------------------------------|
| Amazon Music     | ❌            | `https://music.amazon.com/podcasts/${uniquePlatformID}`                     |
| AntennaPod       | ✅            | `https://antennapod.org/deeplink/subscribe?url=${feedURL}`                  |
| Anytime Player   | ✅            | `https://anytimeplayer.app/subscribe?url=${feedURL}`                        |
| Apollo[^1]       | ✅            | `https://shows.apollopods.com/show?feedUrl=${feedURL}`                      |
| Apple Podcasts   | ✅            | `https://podcasts.apple.com/podcast/id${appleID}`                           |
| Breez            | ✅            | `https://breez.link/p?feedURL=${encodeURIComponent(feedURL)}`               |
| Castamatic       | ✅            | `https://castamatic.com/guid/${podcastGUID}`                                |
| Castbox          | ✅            | `https://castbox.fm/vic/${appleID}`                                         |
| Castro           | ✅            | `https://castro.fm/itunes/${appleID}`                                       |
| CurioCaster      | ✅            | `https://curiocaster.com/podcast/pi${podcastIndexShowID}`                   |
| DeepCast         | ✅            | `https://deepcast.fm/itunes/${appleID}`                                     |
| Deezer           | ❌            | `https://www.deezer.com/show/${uniquePlatformID}`                           |
| Fountain         | ✅            | `https://fountain.fm/show/${podcastIndexShowID}`                            |
| Global Player    | ❌            | `https://www.globalplayer.com/podcasts/${uniquePlatformID}`                 |
| Goodpods         | ✅            | `https://www.goodpods.com/podcasts-aid/${appleID}`                          |
| gPodder          | ✅            | `https://gpodder.net/subscribe?url=${feedURL}`                              |
| Hark             | ❌            | `https://harkaudio.com/p/${uniquePlatformID}`                               |
| iHeartRadio      | ❌            | `https://iheart.com/podcast/${uniquePlatformID}`                            |
| LN Beats         | ✅            | `https://lnbeats.com/album/${podcastGUID}`                                  |
| Luminary         | ❌            | `https://luminarypodcasts.com/listen/${slug}/${slug}/${uniquePlatformID}`   |
| Moon FM          | ✅            | `https://moon.fm/itunes/${appleID}`                                         |
| Overcast         | ✅            | `https://overcast.fm/itunes${appleID}`                                      |
| Pandora          | ❌            | `https://pandora.com/podcast/${slug}/PC:${uniquePlatformID}`                |
| Player FM        | ✅            | `https://player.fm/subscribe?id=${encodeURIComponent(feedURL)}`             |
| Pocket Casts     | ✅            | `https://pca.st/itunes/${appleID}`                                          |
| Podbean          | ✅            | `https://www.podbean.com/itunes/${appleID}`                                 |
| Podcast Addict   | ✅            | `https://podcastaddict.com/feed/${encodeURIComponent(feedURL)}`             |
| Podcast App      | ❌            | `https://podcast.app/${slug}-p${uniquePlatformID}`                          |
| Podcast Guru     | ✅            | `https://app.podcastguru.io/podcast/${appleID}`<br>`https://app.podcastguru.io/podcast/X${hex(feedURL)}`|
| Podcast Republic | ✅            | `https://www.podcastrepublic.net/podcast/${appleID}`                        |
| Podfriend        | ✅            | `https://podfriend.com/podcast/${appleID}`                                  |
| Podknife         | ✅            | `https://podknife.com/podcast?feed_url=${feedURL}`                          |
| PodLP            | ✅            | `https://link.podlp.app/${appleID}`<br>`https://link.podlp.app/${podcastGUID}`|
| podStation       | ✅            | `https://podstation.github.io/subscribe-ext/?feedURL=${feedURL}`            |
| Podurama         | ✅            | `https://podurama.com/podcast/${slug}-i${appleID}`                          |
| Podverse         | ✅            | `https://api.podverse.fm/api/v1/podcast/podcastindex/${podcastIndexShowID}` |
| Snipd            | ❌            | `https://share.snipd.com/show/${uniquePlatformID}`                          |
| Sonnet           | ✅            | `https://sonnet.fm/p/${appleID}`                                            |
| Spotify          | ❌            | `https://open.spotify.com/${uniquePlatformID}`                              |
| Steno.fm         | ✅            | `https://steno.fm/show/${podcastGUID}`                                      |
| TrueFans         | ✅            | `https://truefans.fm/${podcastGUID}`                                        |
| TuneIn           | ❌            | `https://tunein.com/podcasts/${uniquePlatformID}`                           |
| YouTube Music    | ✅            | `https://music.youtube.com/library/podcasts?addrssfeed=${base64url(feedURL}`<br>`https://music.youtube.com/playlist?list=${uniquePlatformID}`|

## Episode Links
| Platform       | Foreign Keys | URL Pattern                                                                                                |
|----------------|--------------|------------------------------------------------------------------------------------------------------------|
| Amazon Music   | ❌            | `https://music.amazon.com/podcasts/${uniquePlatformID}/episodes/${uniqueEpisodeID}`                        |
| Apple Podcasts | ❌            | `https://podcasts.apple.com/podcast/id${appleID}?i=${uniqueEpisodeID}`                                     |
| Breez          | ✅            | `https://breez.link/p?feedURL=${encodeURIComponent(feedURL)}&episodeID=${encodeURIComponent(episodeGUID)}` |
| Bullhorn       | ❌            | `https://bullhorn.fm/${uniquePlatformID}/posts/${uniqueEpisodeID}`                                         |
| Castamatic     | ❌            | `https://castamatic.com/+${uniqueEpisodeID}`                                                               |
| Castbox        | ❌            | `https://castbox.fm/episode/${slug}-id${uniquePlatformID}-id${uniqueEpisodeID}`                            |
| Castro         | ❌            | `https://castro.fm/episode/${uniqueEpisodeID}`                                                             |
| Deezer         | ❌            | `https://www.deezer.com/episode/${uniqueEpisodeID}`                                                        |
| Fountain       | ✅            | `https://fountain.fm/episode/${podcastIndexEpisodeID}`                                                     |
| Global Player  | ❌            | `https://www.globalplayer.com/podcasts/episodes/${uniqueEpisodeID}/`                                       |
| Goodpods       | ❌            | `https://goodpods.com/podcasts/${uniquePlatformID}/${uniqueEpisodeID}`                                     |
| Hark           | ❌            | `https://harkaudio.com/p/${uniquePlatformID}/${uniqueEpisodeID}`                                           |
| iHeartRadio    | ❌            | `https://iheart.com/podcast/${slug}-${uniquePlatformID}/episode/${slug}-${uniqueEpisodeID}`                |
| LN Beats       | ❌            | `https://lnbeats.com/album/${podcastGUID}/${uniqueEpisodeID}`                                              |
| Luminary       | ❌            | `https://luminarypodcasts.com/listen/${slug}/${uniquePlatformID}/${slug}/${uniqueEpisodeID}`               |
| Overcast       | ❌            | `https://overcast.fm/+${uniqueEpisodeID}`                                                                  |
| Pandora        | ❌            | `https://pandora.com/podcast/${slug}/${slug}/PC:${uniqueEpisodeID}`                                        |
| Player FM      | ❌            | `https://player.fm/series/${uniquePlatformID}/${uniqueEpisodeID}`                                          |
| Pocket Casts   | ❌            | `https://pca.st/episode/${uniqueEpisodeID}`                                                                |
| Podbean        | ❌            | `https://podbean.com/media/share/dir-${uniqueEpisodeID}`                                                   |
| Podcast Addict | ✅            | `https://podcastaddict.com/episode/${encodeURIComponent(enclosureURL)}`                                    |
| Podcast App    | ❌            | `https://podcast.app/${slug}-e${uniqueEpisodeID}`                                                          |
| Podcast Guru   | ❌            | `https://app.podcastguru.io/podcast/${appleID}/episode/${slug}-${uniqueEpisodeID}`                         |
| Podfriend      | ✅            | `https://podfriend.com/podcast/${appleID}/${encodeURIComponent(episodeGUID)}`                              |
| Podknife       | ❌            | `https://podknife.com/episodes/${uniqueEpisodeID}`                                                         |
| Podurama       | ❌            | `https://podurama.com/episode/${uniqueEpisodeID}`                                                          |
| Podverse       | ❌            | `https://podverse.fm/episode/${uniqueEpisodeID}`                                                           |
| Snipd          | ❌            | `https://share.snipd.com/episode/${uniquePlatformID}`                                                      |
| Sonnet         | ❌            | `https://sonnet.fm/p/${appleID}/${uniqueEpisodeID}`                                                        |
| Spotify        | ❌            | `https://open.spotify.com/episode/${uniqueEpisodeID}`                                                      |
| Steno.fm       | ✅            | `https://steno.fm/show/${podcastGUID}/episode/${base64url(episodeGUID)}`                                   |
| TrueFans       | ❌            | `https://truefans.fm/${slug}/${uniqueEpisodeID}`                                                           |
| TuneIn         | ❌            | `https://tunein.com/podcasts/p${uniquePlatformID}/?topicId=${uniqueEpisodeID}`                             |
| YouTube Music  | ❌            | `https://music.youtube.com/podcast/${uniqueEpisodeID}`                                                     |

## Resource Links
These resources also support podcast foreign keys, but their primary purpose may be directing listeners to one of the apps above rather than a primary listening destination.

| Platform        | URL Pattern                                                                                                                                           |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| Episodes.fm     | `https://episodes.fm/${appleID}` <br> `https://episodes.fm/${appleID}/episode/${base64url(episodeGUID)}`                                              |
| Listen Notes    | `https://listennotes.com/itunes/id${appleID}`                                                                                                         |
| Odesli          | `https://pods.link/i/${appleID}`                                                                                                                      |
| Plink           | `https://plinkhq.com/i/${appleID}?to=page`                                                                                                            |
| Pod Engine      | `https://www.podengine.ai/podcasts/id/${appleID}`                                                                                                     |
| pod.link        | `https://pod.link/${appleID}` <br> `https://pod.link/${base64url(feedURL)}`                                                                           |
| Podcast Details | `https://podcastdetails.com/?url=${feedURL}`                                                                                                          |
| Podcast Index   | `https://podcastindex.org/podcast/${podcastIndexShowID}` <br> `https://podcastindex.org/podcast/${podcastGUID}`                                       |
| Podcast X-Ray   | `https://podcastxray.com/podcast/${appleID}`                                                                                                          |
| Podchaser       | `https://podchaser.com/f/pod/${appleID}`                                                                                                              |
| podfollow       | `https://podfollow.com/${appleID}`                                                                                                                    |
| Podnews         | `https://podnews.net/podcast/${appleID}` <br> `https://podnews.net/podcast/pi${podcastIndexShowID}` <br> `https://podnews.net/podcast/${podcastGUID}` |
| Podyssey        | `https://podyssey.fm/podcast/itunes${appleID}`                                                                                                        |
| Rephonic        | `https://rephonic.com/podcasts/${uniquePlatformID}`                                                                                                   |

## API Documentation
* [Apple Podcasts](https://performance-partners.apple.com/search-api)
* [Deezer](https://developers.deezer.com/api/podcast)
* [Listen Notes](https://www.listennotes.com/api/docs/)
* [Pocket Casts](https://pocketcasts.com/submit/)
* [Podcast Index](https://podcastindex-org.github.io/docs-api/#podcasts)
* [Podchaser](https://api-docs.podchaser.com/docs/overview)
* [Spotify](https://developer.spotify.com/documentation/web-api)

## Contributing
If you have an update to improve this guide, please [fork the repo](https://github.com/nathangathright/podcast-platform-links/fork) and create a pull request. This Markdown document is easily editable from the GitHub web interface without the need to clone the repo locally.

## Footnotes
[^1]: For fiction podcasts only
