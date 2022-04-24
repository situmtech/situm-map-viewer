import { FlyToInterpolator } from "deck.gl";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./components/ErrorFallback";
import Map, { PoisToShow } from "./components/Map";
import Toolbar from "./components/MapToolbar";
import FloorSelector from "./components/selectors/FloorSelector";
import PoiSelector from "./components/selectors/PoiSelector";
import { buildingFactoryFromJson, poisToPoisToShow } from "./domain/factories";
import { Building } from "./domain/models";
import { SitumAPI } from "./domain/persistance";
import {
  getBaseFloorplan,
  getFloorplanFromFloorId,
  getPoisFromFloorId,
} from "./domain/usecases";

const DOMAIN = import.meta.env.VITE_DOMAIN;
const EMAIL = import.meta.env.VITE_EMAIL;
const APIKEY = import.meta.env.VITE_APIKEY;
const BUILDINGID = import.meta.env.VITE_BUILDINGID;

function App() {
  const [img, setImg] = useState(null);
  const [bounds, setBounds] = useState([-122.519, 37.7045, -122.355, 37.829]);

  const [loading, setLoading] = useState(true);
  const [initialViewState, setInitialViewState] = useState({
    longitude: -122.519,
    latitude: 37.7045,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });
  const [buildings, setBuildings] = useState([]); // object list
  const [currentBuildingID, setCurrentBuildingID] = useState(BUILDINGID); // id
  const [currentFloorID, setCurrentFloorID] = useState(null); // id
  const [selectedPoiID, setSelectedPoiID] = useState(null); // id
  const [poiCategories, setPoiCategories] = useState([]);

  useEffect(async () => {
    const situmAPI = new SitumAPI(EMAIL, APIKEY, DOMAIN);

    // Load poi categories and buildings
    Promise.all([
      situmAPI.getPoiCategories(),
      situmAPI.getBuildingById(BUILDINGID),
    ])
      .then((values) => {
        const c = values[0];
        const b = values[1];
        setPoiCategories(c);

        const building = buildingFactoryFromJson(b, c);

        setBuildings([building]);
        setCurrentFloorID(building.getFloorByLevel(0).id);

        setBuildingView(building);

        setImg(getBaseFloorplan(building));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function setBuildingView(building) {
    setInitialViewState({
      longitude: building.geometry.location.lng,
      latitude: building.geometry.location.lat,
      zoom: 18,
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

  const onPoiSelect = useCallback((poiId) => {
    setSelectedPoiID(poiId);
    if (poiId == null) return;

    setSelectedPoiID(poiId);
    const building = buildings.find((b) => b.id == currentBuildingID);
    const poi = building.pois.pois.find((poi) => poi.id == poiId);

    const floorId = poi.position.floor_id;
    setCurrentFloorID(floorId);
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
    setImg(getFloorplanFromFloorId(building, floorId));
  }, []);

  const onFloorSelect = useCallback((floorId) => {
    const building = buildings.find((b) => b.id == currentBuildingID);

    setImg(getFloorplanFromFloorId(building, floorId));
    setBuildingView(building);
    setCurrentFloorID(floorId);
  }, []);

  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      {currentBuildingID && (
        <Map
          initialViewState={initialViewState}
          buildings={buildings}
          currentBuilding={currentBuildingID}
          currentFloor={currentFloorID}
          selectedPoi={selectedPoiID}
          onPoiSelect={onPoiSelect}
          img={img} // FUERA
          bounds={bounds}
        />
      )}

      {loading ? (
        <div className="loading">Loading cartography…</div>
      ) : (
        <>
          <PoiSelector
            currentBuilding={currentBuildingID}
            pois={buildings[0]?.pois.pois}
            onSelect={onPoiSelect}
            currentPoiID={selectedPoiID}
          />
          <FloorSelector
            currentFloor={currentFloorID}
            currentBuilding={currentBuildingID}
            buildings={buildings}
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
              const building = buildings.find((b) => b.id == currentBuildingID);

              setBuildingView(building);
            }}
          />
        </>
      )}
    </ErrorBoundary>
  );
}

export default App;
