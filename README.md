# What's in here

This is a half-backed pet project to try out the Situm JS SDK (available via npm at https://www.npmjs.com/package/@situm/sdk-js).

This project shows you how to: 
* Connect to Situm backend using Situm JS SDK.
* Retrieve information such as buildings, floors, POIs and POI categories.
* Cross POI and POI category information (e.g. to show the category-icon of each POI)
* Display the floorplan of the venue using Deck.gl (https://deck.gl/) appropriately rotated.
* Display the POIs on top of the floorplan.
* Implement a basic Floor using Material UI (https://mui.com/), that changes the floor to be displayed.
* Implement a basic POI selector using Material UI, that centers the view on the selected POI (changing floors if required). 

This project was tested with Situm JS SDK v0.0.4 and npm v8.1.2. The UI is thought to be executed on a mobile phone. 

# Getting started

First of all, go to the index.js file and change the following lines with the appropriate values:

const DOMAIN = "https://dashboard.situm.com"
const EMAIL = 'email@email.com'
const APIKEY = '1234'

Then, execute "npm install" and "npm start". You should see a new webpage appearing in your browser (localhost:3000)

# A word of caution

* This project is half-backed, may contain issues /bugs
* If you use other map provider (instead of Deck.gl) you might need to change floorplan transformations (e.g. rotations, etc.)

