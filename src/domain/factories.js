import { PoisToShow, PoiToShow } from "../components/Map";

import {
  Building,
  BuildingGeometry,
  Corners,
  Floor,
  Floors,
  LatLng,
  Poi,
  PoiCategories,
  PoiCategory,
  Pois,
  Position,
} from "./models";

// Domain Factories / Parsers

export function poiCategoryFactory(data) {
  var _poiCategories = [];
  data.forEach((e) =>
    _poiCategories.push(new PoiCategory(e.id, e.iconUrl, e.selectedIconUrl))
  );

  return new PoiCategories(_poiCategories);
}

function poiFactoryFromJson(pois, poiCategories) {
  var _pois = [];
  pois.forEach((e) => {
    const poiCategory = poiCategories.findById(e.categoryId);

    _pois.push(
      new Poi(
        e.id,
        e.name,
        new Position(
          e.buildingId,
          e.position.floorId,
          e.position.lat,
          e.position.lng
        ),
        poiCategory
      )
    );
  });
  return new Pois(_pois);
}

function floorFactoryFromJson(floorData) {
  var _floors = [];
  floorData.forEach((e) =>
    _floors.push(new Floor(e.id, e.level, e.maps.mapUrl))
  );

  return new Floors(_floors);
}

function cornerFactoryFromCornersAndCenter(corners, center) {
  let nw = [0, 0];
  let ne = [0, 0];
  let sw = [0, 0];
  let se = [0, 0];

  corners.forEach((c) => {
    if (c.lat > center.lat && c.lng > center.lng) nw = [c.lat, c.lng];
    if (c.lat > center.lat && c.lng < center.lng) ne = [c.lat, c.lng];
    if (c.lat < center.lat && c.lng > center.lng) sw = [c.lat, c.lng];
    if (c.lat < center.lat && c.lng < center.lng) se = [c.lat, c.lng];
  });

  return new Corners(
    new LatLng(nw[0], nw[1]),
    new LatLng(ne[0], ne[1]),
    new LatLng(se[0], se[1]),
    new LatLng(sw[0], sw[1])
  );
}

export function buildingFactoryFromJson(buildingData, poiCategoryData) {
  const floors = floorFactoryFromJson(buildingData.floors);
  const corners = cornerFactoryFromCornersAndCenter(
    buildingData.corners,
    buildingData.location
  );

  const poiCategories = new poiCategoryFactory(poiCategoryData);
  const pois = new poiFactoryFromJson(buildingData.indoorPois, poiCategories);

  const geometry = new BuildingGeometry(
    buildingData.location,
    corners,
    buildingData.dimensions.width,
    buildingData.dimensions.length,
    buildingData.rotation
  );

  return new Building(
    buildingData.id,
    buildingData.name,
    geometry,
    floors,
    pois
  );
}

// View Factories / Parsers

export function poisToPoisToShow(pois) {
  var _poisToShow = [];
  pois.toArray().forEach((p) => {
    _poisToShow.push(
      new PoiToShow(p.name, p.position.lat, p.position.lng, p.category.iconUrl)
    );
  });

  return new PoisToShow(_poisToShow);
}
