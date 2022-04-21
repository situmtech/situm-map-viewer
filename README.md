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

This is a half-backed pet project to try out the Situm JS SDK (available via npm at https://www.npmjs.com/package/@situm/sdk-js).

This project shows you how to:

- Connect to Situm backend using Situm JS SDK.
- Retrieve information such as buildings, floors, POIs and POI categories.
- Cross POI and POI category information (e.g. to show the category-icon of each POI)
- Display the floorplan of the venue using Deck.gl (https://deck.gl/) appropriately rotated.
- Display the POIs on top of the floorplan.
- Implement a basic Floor using Material UI (https://mui.com/), that changes the floor to be displayed.
- Implement a basic POI selector using Material UI, that centers the view on the selected POI (changing floors if required).

This project was tested with Situm JS SDK v0.0.4 and npm v8.1.2. The UI is thought to be executed on a mobile phone.

# Getting started

First of all,

1.  copy the environment file .env.development.dist to .env.development
2.  change the .env.development contents with the appropriate values:

```
VITE_DOMAIN="https://dashboard.situm.com"
VITE_EMAIL='email@email.com'
VITE_APIKEY='1234'
```

Then, execute "npm install" and "npm start". You should see a new webpage appearing in your browser (localhost:3000)

# A word of caution

- This project is half-backed, may contain issues /bugs
- If you use other map provider (instead of Deck.gl) you might need to change floorplan transformations (e.g. rotations, etc.)
