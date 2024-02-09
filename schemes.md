# Podcast App URL Schemes
Many podcast apps support custom URL schemes. I’ve done my best to locate working schemes and document if they support deep-linking to RSS feeds or other parameters.

## Table of Contents
1. [Drawbacks and Alternatives](#drawbacks-and-alternatives)
1. [Glossary](#glossary)
1. [URL Schemes](#url-schemes)
1. [References](#references)
1. [Contributing](#contributing)
1. [Footnotes](#footnotes)

## Drawbacks and Alternatives
Since iOS 9.2, Apple has encouraged developers to adopt [universal links](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content) instead of URL schemes. If a user has the app installed, clicking a universal link redirects them to the app without routing through a browser. If users haven’t installed the app, they’re just standard `https://` links, and the user is directed to the website in their browser.

## Glossary
* `feedURL`: The RSS feed URL of the podcast without the `https://` protocol.[^1]
* `deepLink`: A universal link to content on the app’s own domain without the `https://` protocol.

## URL Schemes
| Platform        | Custom URL Scheme                                                            |
|-----------------|------------------------------------------------------------------------------|
| Amazon Music    | `amznmp3://`                                                                 |
| AntennaPod      | `antennapod-subscribe://${feedURL}`                                          |
| Anytime Player  | `anytime-subscribe://`                                                       |
| Apple Podcasts  | `podcast://${feedURL}`                                                       |
| Audacy          | `audacy://`                                                                  |
| Audible         | `audible://${deepLink}`                                                      |
| Bullhorn        | `bullhorn://`                                                                |
| Castamatic      | `castamatic://`                                                              |
| Castbox         | `castbox://`                                                                 |
| Castro          | `castros://subscribe/${feedURL}`                                             |
| Deezer          | `deezer://${deepLink}`                                                       |
| Downcast        | `downcast://${feedURL}`                                                      |
| Fathom          | `fb1314374868988580://`                                                      |
| Fountain        | `fm.fountain.apps://`                                                        |
| Gaana           | `gaana://`                                                                   |
| Global Player   | `fb166993440513641://`                                                       |
| Goodpods        | `goodpods://`                                                                |
| Google Podcasts | `googlepodcasts://${deepLink}`                                               |
| gPodder         | `gpodder://${feedURL}`                                                       |
| Hark            | `com.harkaudio.podcast://`                                                   |
| iCatcher!       | `icatcher://${feedURL}`                                                      |
| iHeartRadio     | `iheartradio://`                                                             |
| Instacast       | `instacast://${feedURL}`                                                     |
| iVoox           | `ivoox://${deepLink}`                                                        |
| Jam             | `jam://`                                                                     |
| Luminary        | `luminary://${deepLink}`                                                     |
| Moon FM         | `moonfm://`                                                                  |
| Overcast[^1]    | `overcast://x-callback-url/add?url=${feedURL}` <br> `overcast://${deepLink}` |
| Pandora         | `pandora://`                                                                 |
| Player FM       | `playerfm://${feedURL}`                                                      |
| Pocket Casts    | `pktc://subscribe/${feedURL}`                                                |
| Podbean         | `podbean://`                                                                 |
| Podcast Addict  | `podcastaddict://${feedURL}`                                                 |
| Podcast App     | `podcastapp://`                                                              |
| Podcast Guru    | `podcastguru://${feedURL}`                                                   |
| Podcat          | `podcat://${feedURL}`                                                        |
| Podimo          | `podimo://`                                                                  |
| Podkicker       | `podkicker://subscribe/${feedURL}`                                           |
| Podverse        | `podverse://`                                                                |
| Podyssey        | `fb373234189734134://`                                                       |
| RSSRadio        | `rssradio://${feedURL}`                                                      |
| SiriusXM        | `sxm://`                                                                     |
| Snipd           | `snipd://${deepLink}`                                                        |
| Sonnet          | `sonnet://`                                                                  |
| Soundcloud      | `soundcloud://`                                                              |
| Spotify         | `spotify://`                                                                 |
| Spreaker        | `spreaker://`                                                                |
| TuneIn          | `tunein://`                                                                  |
| Wondery         | `wondery://`                                                                 |
| YouTube         | `youtube://${deepLink}`                                                      |
| YouTube Music   | `youtubemusic://${deepLink}`                                                 |

## References
* [Unlisted podcasts: not quite public, not quite private](https://pacific-content.com/unlisted-podcasts-not-quite-public-not-quite-private/)
* [How to Find and Use iOS URL Schemes for Shortcuts](https://medium.com/p/986c2540c788)
* [Universal Links - Apple Developer Docs](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content)
* [PodLove Subscribe Button](https://github.com/podlove/podlove-subscribe-button/blob/master/src/coffee/clients.coffee)
* [The Limitations of URI Schemes](https://www.branch.io/glossary/uri-schemes/#:~:text=The%20Limitations%20of%20URI%20Schemes)

## Contributing
If you have an update to improve this guide, please [fork the repo](https://github.com/nathangathright/podcast-platform-links/fork) and create a pull request. This Markdown document is easily editable from the GitHub web interface without the need to clone the repo locally.

## Footnotes
[^1]: Only Overcast requires `feedURLs` to include their their http protocol.
