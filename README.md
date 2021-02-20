# Podcast Platform Links
Many podcast apps have deterministic URLs if you know their Apple ID or feed URL. Some require lookups in their API, and some support both. A handful also support episode URLs based on GUIDs found in the RSS feed.

## Shows

### Deterministic Platform Links
* Apple Podcasts: `https://podcasts.apple.com/podcast/id${appleID}`
* Breaker: `https://breaker.audio/shows?feed_url=${encodeURIComponent(feedUrl)}`
* Bullhorn: `https://bullhorn.fm/podchaser/itunes/${appleID}`
* Castbox: `https://castbox.fm/vic/${appleID}`
* Castro: `https://castro.fm/itunes/${appleID}`
* Google Podcasts: `https://podcasts.google.com/?feed=${btoa(feedUrl)}`
* Listen Notes: `https://listennotes.com/itunes/id${appleID}`
* Overcast: `https://overcast.fm/itunes${appleID}`
* Player FM: `https://player.fm/series/${encodeURIComponent(feedUrl)}`
* Pocket Casts: `https://pca.st/itunes/${appleID}`
* Podbean: `https://podbean.com/play/${encodeURIComponent(feedUrl)}`
* Podcast Addict: `https://podcastaddict.com/feed/${encodeURIComponent(rssFeedUrl)}`
* Podcast Guru: `https://app.podcastguru.io/podcast/${appleID}`
* Podchaser: `https://podchaser.com/f/pod/${appleID}`
* Podfriend: `https://web.podfriend.com/podcast/${appleID}`
* Podhero: `https://podhero.com/podcast/feed/${encodeURIComponent(feedUrl)}`
* Podknife: `https://podknife.com/podcast?feed_url=${appleID}`
* RadioPublic: `https://radiopublic.com/${encodeURIComponent(feedUrl)}`
* Sonnet: `https://sonnet.fm/p/${appleID}`

### Non-deterministic Platform Links
* Amazon Music: `https://music.amazon.com/podcasts/${amazonID}`
* iHeartRadio: `https://iheart.com/podcast/${iHeartRadioID}`
* Luminary: `https://luminarypodcasts.com/listen/${slug}/${slug}/${luminaryID}`
* Pandora: `https://pandora.com/podcast/${slug}/PC:${pandoraID}`
* Spotify: `https://open.spotify.com/${spotifyID}`
* Stitcher: `https://stitcher.com/s?fid=${stitcherID}`
* TuneIn: `https://tunein.com/podcasts/${tuneInID}`

### Resource Links
* Odesli: `https://pods.link/i/${appleID}`
* Plink: `https://plinkhq.com/i/${appleID}?to=page`
* pod.link: `https://pod.link/${appleID}`
* Podcast Index: `https://podcastindex.org/podcast/${podcastIndexID}`
* Podnews: `https://podnews.net/podcast/${appleID}`

## Episodes

### Deterministic Episode Links
* Google Podcasts: `https://podcasts.google.com/?feed=${btoa(feedUrl)}&episode=${btoa(episodeGuid)}`
* Player FM: `https://player.fm/series/${encodeURIComponent(feedUrl)}/guid:${encodeURIComponent(episodeGuid)}`
* Podcast Addict: `https://podcastaddict.com/episode/${encodeURIComponent(audioFileUrl)}`

### Example Lookups
* Lookup a feedURL from an Apple ID: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcast`
* Lookup episode URLs from an Apple ID: `GET https://itunes.apple.com/lookup?id=${appleID}&entity=podcastEpisode&limit=300`

### Additional Resources
* [Breaker Lookup Documentation](https://blog.breaker.audio/how-to-add-a-podcast-to-breaker-68677e12c0c3#4d0f)
