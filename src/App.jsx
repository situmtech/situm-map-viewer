import { FlyToInterpolator } from "deck.gl";
import React, { useEffect, useState } from "react";

import Map, { PoisToShow } from "./components/Map";
import Toolbar from "./components/MapToolbar";
import FloorSelector, {
  floorOptionsFactory,
} from "./components/selectors/FloorSelector";
import PoiSelector from "./components/selectors/PoiSelector";
import { buildingFactoryFromJson, poisToPoisToShow } from "./domain/factories";
import { Building, Floor, PoiCategories } from "./domain/models";
import { SitumAPI } from "./domain/persistance";
import {
  getBaseFloorplan,
  getFloorplanFromFloorId,
  getPoiById,
  getPoisFromFloorId,
  getPoisFromFloorLevel,
  getPoisFromBuildingId,
  getFloorsFromBuildingId,
} from "./domain/usecases";

const DOMAIN = import.meta.env.VITE_DOMAIN;
const EMAIL = import.meta.env.VITE_EMAIL;
const APIKEY = import.meta.env.VITE_APIKEY;
const BUILDINGID = import.meta.env.VITE_BUILDINGID;

function App() {
  const [img, setImg] = useState(null);
  const [bounds, setBounds] = useState([-122.519, 37.7045, -122.355, 37.829]);
  const [poiOptions, setPoiOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [poisToShow, setPoisToShow] = useState(new PoisToShow([]));

  const [loading, setLoading] = useState(true);
  const [initialViewState, setInitialViewState] = useState({
    longitude: -122.519,
    latitude: 37.7045,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });
  const [buildings, setBuildings] = useState(new Building([])); // object list
  const [currentBuilding, setCurrentBuilding] = useState(null); // id
  const [currentFloor, setCurrentFloor] = useState(null); // id
  const [selectedPoi, setSelectedPoi] = useState(null); // id
  const [poiCategories, setPoiCategories] = useState([]);

  useEffect(async () => {
    const situmAPI = new SitumAPI(EMAIL, APIKEY, DOMAIN);

    const poiCategoryData = await situmAPI.getPoiCategories();
    //setPoiCategories(poiCategoryData);
    const myBuildings = new Building([]);

    situmAPI.getBuildingById(BUILDINGID).then((b) => {
      setLoading(false);

      const building = buildingFactoryFromJson(b, poiCategoryData);
      myBuildings.add(building);
      setBuildings(myBuildings);

      setCurrentBuilding(BUILDINGID);
      setBuildingView(building);
      setCurrentFloor(building.getFloorByLevel(0).id);

      // FUERA
      setImg(getBaseFloorplan(building));
      setFloorOptions(floorOptionsFactory(building.floors));
      setPoiOptions(building.pois);
      setPoisToShow(
        poisToPoisToShow(getPoisFromFloorLevel(building, currentFloor.level))
      );
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

    // FUERA
    setBounds([
      [building.geometry.corners.se.lng, building.geometry.corners.se.lat],
      [building.geometry.corners.ne.lng, building.geometry.corners.ne.lat],
      [building.geometry.corners.nw.lng, building.geometry.corners.nw.lat],
      [building.geometry.corners.sw.lng, building.geometry.corners.sw.lat],
    ]);
  }

  const onPoiSelect = (poiId) => {
    const poi = getPoiById(currentBuilding, poiId);
    const floorId = poi.position.floor_id;
    setCurrentFloor(floorId);
    setInitialViewState({
      longitude: poi.position.lng,
      latitude: poi.position.lat,
      zoom: 19,
      pitch: 0,
      bearing: 0,
      transitionDuration: 300,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
    });

    // FUERA
    setImg(getFloorplanFromFloorId(currentBuilding, floorId));
    setPoisToShow(
      poisToPoisToShow(getPoisFromFloorId(currentBuilding, floorId))
    );
  };

  const onFloorSelect = (floorId) => {
    setImg(getFloorplanFromFloorId(currentBuilding, floorId));
    setPoisToShow(
      poisToPoisToShow(getPoisFromFloorId(currentBuilding, floorId))
    );
    setBuildingView(currentBuilding);
    setCurrentFloor(currentBuilding.getFloorById(floorId));
  };

  return (
    <>
      {currentBuilding && (
        <Map
          initialViewState={initialViewState}
          buildings={buildings}
          currentBuilding={currentBuilding}
          currentFloor={currentFloor}
          selectedPoi={selectedPoi}
          onPoiSelect={onPoiSelect}
          img={img} // FUERA
          poisToShow={poisToShow}
          bounds={bounds}
        />
      )}

      {loading ? (
        <div className="loading">Loading cartography…</div>
      ) : (
        <>
          {selectedPoi ? (
            <div className="">INFO DEL POI</div>
          ) : (
            <PoiSelector
              pois={getPoisFromBuildingId(buildings, BUILDINGID)}
              onSelect={onPoiSelect}
            />
          )}

          <FloorSelector
            active={currentFloor}
            floors={getFloorsFromBuildingId(buildings, BUILDINGID)}
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
              setBuildingView(currentBuilding);
            }}
          />
        </>
      )}
    </>
  );
}

export default App;
