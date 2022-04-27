<p align="center"> <img width="233" src="https://situm.com/wp-content/themes/situm/img/logo-situm.svg" style="margin-bottom:1rem" /> <h1 align="center">Situm Web Map Viewer</h1> </p>

<p align="center" style="text-align:center">

A Map Viewer using the [SITUM](https://www.situm.com/) SDK JS to show your buildings and navigate through them in a website.

</p>

<div align="center" style="text-align:center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Latest version:](https://img.shields.io/npm/v/@situm/sdk-js/latest)
![Node compatibility:](https://img.shields.io/node/v/@situm/sdk-js)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

</div>

# What's in here

This project creates a web map viewer implementing some :

- Retrieves information such as buildings, floors, POIs and POI categories.
- Display the floorplan of the venue appropriately rotated.
- Display the POIs on top of the floorplan.
- Implement a basic Floor selector, that changes the floor to be displayed.
- Implement a basic POI selector, that centers the view on the selected POI (changing floors if required).

# Getting started

Below you can find the instructions to setup this project and run it locally

1. copy the environment file .env.development.dist to .env.development
2. change the .env.development contents with the appropriate values

```
VITE_DOMAIN="https://dashboard.situm.com"
VITE_EMAIL='your-situm-account-email'
VITE_APIKEY='your-situm-apikey'
```

you can **optionally** change the `VITE_MAPBOX_API_KEY` to display an underlying map in the viewer

Then, execute "npm install" and "npm start". You should see a new webpage appearing in your browser (localhost:3000)

# A word of caution

- This project is half-backed, may contain issues /bugs
- If you use other map provider (instead of Deck.gl) you might need to change floorplan transformations (e.g. rotations, etc.)
