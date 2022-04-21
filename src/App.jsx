import { FlyToInterpolator } from "deck.gl";
import React, { useEffect, useState } from "react";

import Map, { PoisToShow } from "./components/Map";
import Toolbar from "./components/MapToolbar";
import FloorSelector, {
  floorOptionsFactory,
} from "./components/selectors/FloorSelector";
import PoiSelector from "./components/selectors/PoiSelector";
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

const DOMAIN = import.meta.env.VITE_DOMAIN;
const EMAIL = import.meta.env.VITE_EMAIL;
const APIKEY = import.meta.env.VITE_APIKEY;
const BUILDINGID = import.meta.env.VITE_BUILDINGID;

function App() {
  const [img, setImg] = useState(null);
  const [initialViewState, setInitialViewState] = useState({
    longitude: -122.519,
    latitude: 37.7045,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });
  const [loading, setLoading] = useState(true);
  const [bounds, setBounds] = useState([-122.519, 37.7045, -122.355, 37.829]);
  const [poiOptions, setPoiOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [poisToShow, setPoisToShow] = useState(new PoisToShow([]));
  const [building, setBuilding] = useState(new Building());
  const [buildings, setBuildings] = useState([]);
  const [level, setLevel] = useState(0);

  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [poiCategories, setPoiCategories] = useState(null);

  useEffect(async () => {
    const situmAPI = new SitumAPI(EMAIL, APIKEY, DOMAIN);
    // situmAPI.getPoiCategories().then((l) => setPoiCategories(l));
    // situmAPI.cartography.getBuildings().then((l) => setBuildings(l));

    const poiCategoriesJson = await situmAPI.getPoiCategories();
    situmAPI.getBuildingById(BUILDINGID).then((b) => {
      setLoading(false);
      const building = buildingFactoryFromJson(b, poiCategoriesJson);
      setBuilding(building);

      setImg(getBaseFloorplan(building));
      setBuildingView(building);
      setFloorOptions(floorOptionsFactory(building.floors));
      setPoiOptions(building.pois);
      setPoisToShow(poisToPoisToShow(getPoisFromFloorLevel(building, level)));
    });
  }, []);

  function setBuildingView(building) {
    setInitialViewState({
      longitude: building.geometry.location.lng,
      latitude: building.geometry.location.lat,
      zoom: 18,
      pitch: 25,
      bearing: 0,
      transitionDuration: 200,
      transitionInterpolator: new FlyToInterpolator(),
    });

    setBounds([
      [building.geometry.corners.se.lng, building.geometry.corners.se.lat],
      [building.geometry.corners.ne.lng, building.geometry.corners.ne.lat],
      [building.geometry.corners.nw.lng, building.geometry.corners.nw.lat],
      [building.geometry.corners.sw.lng, building.geometry.corners.sw.lat],
    ]);
  }

  const onPoiSelect = (poiId) => {
    const poi = getPoiById(building, poiId);
    const floorId = poi.position.floor_id;
    setImg(getFloorplanFromFloorId(building, floorId));
    setPoisToShow(poisToPoisToShow(getPoisFromFloorId(building, floorId)));
    setInitialViewState({
      longitude: poi.position.lng,
      latitude: poi.position.lat,
      zoom: 19,
      pitch: 0,
      bearing: 0,
      transitionDuration: 300,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
    });
  };

  const onFloorSelect = (floorId) => {
    setImg(getFloorplanFromFloorId(building, floorId));
    setPoisToShow(poisToPoisToShow(getPoisFromFloorId(building, floorId)));
    setBuildingView(building);
    setCurrentFloor(floorId);
  };

  return (
    <>
      {building && (
        <Map
          buildings={buildings}
          currentBuilding={currentBuilding}
          currentFloor={currentFloor}
          selectedPoi={selectedPoi}
          img={img}
          poisToShow={poisToShow}
          initialViewState={initialViewState}
          bounds={bounds}
          onPoiSelect={onPoiSelect}
        />
      )}

      {loading ? (
        <div className="loading">Loading cartography…</div>
      ) : (
        <>
          <PoiSelector pois={poiOptions?.pois} onSelect={onPoiSelect} />
          <FloorSelector
            active={currentFloor}
            floors={floorOptions}
            onSelect={onFloorSelect}
          />

          <Toolbar
            onIncreaseZoom={() => {
              setInitialViewState({
                ...initialViewState,
                zoom: initialViewState.zoom + 1,
              });
            }}
            onDecreaseZoom={() => {
              setInitialViewState({
                ...initialViewState,
                zoom: initialViewState.zoom - 1,
              });
            }}
            onCenter={() => {
              setBuildingView(building);
            }}
          />
        </>
      )}
    </>
  );
}

export default App;
