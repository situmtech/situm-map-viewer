import React, { useEffect, useState } from "react";

import FloorSelector, {
  FloorOptions,
  floorOptionsFactory,
} from "./components/FloorSelector";
import Map, { PoisToShow } from "./components/Map";
import PoiSelector, {
  PoiOptions,
  poiOptionsFactory,
} from "./components/PoiSelector";
import { buildingFactoryFromJson, poisToPoisToShow } from "./domain/factories";
import { Building } from "./domain/models";
import { SitumAPI } from "./domain/persistance";
import {
  getBaseFloorplan,
  getFloorplanFromFloorId,
  getPoiById,
  getPoisFromFloorId,
  getPoisFromFloorLevel,
} from "./domain/usecases";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const EMAIL = process.env.REACT_APP_EMAIL;
const APIKEY = process.env.REACT_APP_APIKEY;

function App() {
  const [img, setImg] = useState(null);
  const [initialViewState, setInitialViewState] = useState({
    longitude: -122.519,
    latitude: 37.7045,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });
  const [bounds, setBounds] = useState([-122.519, 37.7045, -122.355, 37.829]);
  const [poiOptions, setPoiOptions] = useState(new PoiOptions());
  const [floorOptions, setFloorOptions] = useState(new FloorOptions());
  const [poisToShow, setPoisToShow] = useState(new PoisToShow([]));
  const [building, setBuilding] = useState(new Building());
  const [level, setLevel] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const situmAPI = new SitumAPI(EMAIL, APIKEY, DOMAIN);

    const buildingJson = await situmAPI.getBuildingById(10194);
    const poiCategoriesJson = await situmAPI.getPoiCategories();

    const building = buildingFactoryFromJson(buildingJson, poiCategoriesJson);
    setBuilding(building);
    setImg(getBaseFloorplan(building));
    setBuildingView(building);
    setFloorOptions(floorOptionsFactory(building.floors));
    setPoiOptions(poiOptionsFactory(building.pois));
    setPoisToShow(poisToPoisToShow(getPoisFromFloorLevel(building, level)));
  }

  function setBuildingView(building) {
    setInitialViewState({
      longitude: building.geometry.location.lng,
      latitude: building.geometry.location.lat,
      zoom: 16,
      pitch: 0,
      bearing: 0,
      transitionDuration: 0,
    });

    setBounds([
      [building.geometry.corners.sw.lng, building.geometry.corners.sw.lat],
      [building.geometry.corners.se.lng, building.geometry.corners.se.lat],
      [building.geometry.corners.ne.lng, building.geometry.corners.ne.lat],
      [building.geometry.corners.nw.lng, building.geometry.corners.nw.lat],
    ]);
  }

  function floorSelectorChangeCallback(floorId) {
    setImg(getFloorplanFromFloorId(building, floorId));
    setPoisToShow(poisToPoisToShow(getPoisFromFloorId(building, floorId)));
    setBuildingView(building);
  }

  function poiSelectorChangeCallback(poiId) {
    const poi = getPoiById(building, poiId);
    const floorId = poi.position.floor_id;
    setImg(getFloorplanFromFloorId(building, floorId));
    setPoisToShow(poisToPoisToShow(getPoisFromFloorId(building, floorId)));
    setInitialViewState({
      longitude: poi.position.lng,
      latitude: poi.position.lat,
      zoom: 18,
      pitch: 0,
      bearing: 0,
      transitionDuration: 0,
    });
  }

  return (
    <>
      <Map
        img={img}
        poisToShow={poisToShow}
        initialViewState={initialViewState}
        bounds={bounds}
      />

      <PoiSelector
        poiOptions={poiOptions}
        poiCallback={poiSelectorChangeCallback}
      />

      <FloorSelector
        floorOptions={floorOptions}
        floorCallback={floorSelectorChangeCallback}
      />
    </>
  );
}

export default App;
