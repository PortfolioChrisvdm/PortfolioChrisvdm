# Jammming

A React-based web app that lets you search Spotify, build a custom playlist, and save it to your account via PKCE authorization.

## Features

- **Search** tracks by title, artist, or album  
- **Add/Remove** tracks to a local playlist  
- **Save** playlist to your Spotify account  
- **PKCE OAuth** flow—no secret in frontend  

## Technologies

- React 18  
- Spotify Web API  
- JavaScript (ES6+)  
- CSS  

## Setup

1. Clone repo & `cd jammming`  
2. `npm install`  
3. In `src/utils/Spotify.js`, set your `clientId` and `redirectUri`  
4. `npm start` to run locally at `http://localhost:3000`

## Future Work

- Handle token expiration & refresh  
- Add playlist editing (reordering)  
- Responsive/mobile styling  
- Error boundary & notifications  
