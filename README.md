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

## What's in here

This project creates a web map viewer as shown in the image below:
![](./docs/assets/map-viewer-preview.png)

It has some interesing features as a base point to develop you own custom map:

- Retrieves information such as buildings, floors, POIs and POI categories.
- Display the floorplan of the venue appropriately rotated.
- Display the POIs on top of the floorplan.
- Implement a basic Floor selector, that changes the floor to be displayed.
- Implement a basic POI selector, that centers the view on the selected POI (changing floors if required).

## Getting started

Below you can find the instructions to setup this project and run it locally

1. copy the environment file .env.development.dist to .env.development
2. change the .env.development contents with the appropriate values

```
VITE_DOMAIN="https://dashboard.situm.com"
VITE_EMAIL='your-situm-account-email'
VITE_APIKEY='your-situm-apikey'
```

you can **optionally** change the `VITE_MAPBOX_API_KEY` to display an underlying map in the viewer

Then, execute

```
npm install
npm start
```

You should see a new webpage appearing in your browser (http://localhost:3000).

## Versioning

We use [SemVer](http://semver.org/) for versioning.

Please refer to [CHANGELOG.md](CHANGELOG.md) for a list of notables changes for each version of the library.

You can also see the [tags on this repository](https://github.com/situmtech/situm-sdk-js/tags).

## Submitting Contributions

You will need to sign a Contributor License Agreement (CLA) before making a submission. [Learn more here.](https://situm.com/contributions/)

## License

This project is licensed under the MIT - see the [LICENSE.txt](LICENSE.txt) file for details.
