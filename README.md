party-site
================
An informational website for a party with a jukebox type application to allow multiple users to vote on the next track using their phones. 

Back End
--------
The server utilized websockets to communicate in real-time to all connected clients and accept votes. The Spotify api was used to control the 'Queue' playlist and the winning song was appended to that playlist during a lock-in period. This makes the app effectively function like a queue, because spotify prevents directly modifying the actual user's queue. The Spotify connection is authenticated using the authorization code flow. This flow is the only suitable option for refreshing the access token, which would otherwise expire every hour. 

Front End
--------
The Front End made use of the Material UI Next component library. The voting modules used modified LinearProgress and Button components to handle the touch animations and represent the current vote percentage.  
