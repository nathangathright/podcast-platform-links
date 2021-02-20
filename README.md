# Podcast Platform Links
Many podcast apps have deterministic URLs if you know their Apple ID or feed URL. Some require lookups in their API, and Some apps also support episode URLs based on the GUID value found in RSS feed. 

## Deterministic Show Links
Apple Podcasts: `https://podcasts.apple.com/podcast/id${appleID}`
Breaker: `https://breaker.audio/shows?feed_url=${encodeURIComponent(feedUrl)}`
Bullhorn: `https://bullhorn.fm/podchaser/itunes/${appleID}`
Castbox: `https://castbox.fm/vic/${appleID}`
Castro: `https://castro.fm/itunes/${appleID}`
Google Podcasts `https://podcasts.google.com/?feed=${toBase64(feedUrl)}`
Listen Notes: `https://listennotes.com/itunes/id${appleID}`
Overcast: `https://overcast.fm/itunes${appleID}`
Player FM: `https://player.fm/series/${encodeURIComponent(feedUrl)}`
Pocket Casts: `https://pca.st/itunes/${appleID}`
Podbean: `https://www.podbean.com/play/${encodeURIComponent(feedUrl)}`
Podcast Addict: `https://podcastaddict.com/feed/${encodeURIComponent(rssFeedUrl)}`
Podcast Guru: `https://app.podcastguru.io/podcast/${appleID}`
Podchaser: `https://podchaser.com/f/pod/${appleID}`
Podhero: `https://podhero.com/podcast/feed/${encodeURIComponent(feedUrl)}`
Podknife: `https://podknife.com/podcast?feed_url=${appleID}`
Podknife: `https://podknife.com/podcast?feed_url=${appleID}`
Podnews: `https://podnews.net/podcast/${appleID}`
RadioPublic: `https://radiopublic.com/${encodeURIComponent(feedUrl)}`

## Non-deterministic Show Links
Amazon Music:
iHeartRadio: `https://www.iheart.com/podcast/${iHeartRadioID}`
Pandora: 
Spotify: `https://open.spotify.com/${spotifyID}`
Stitcher: `https://www.stitcher.com/s?fid=${stitcherID}`
TuneIn:

## Example Lookups
* Lookup a feedURL from an Apple ID: `https://itunes.apple.com/lookup?id=${appleID}&entity=podcast`
* Lookup episode URLs from an Apple ID: `https://itunes.apple.com/lookup?id=${appleID}&entity=podcastEpisode&limit=10`
