import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./components/ErrorFallback";
import Map from "./components/Map";
import MapToolbar from "./components/MapToolbar";
import FloorSelector from "./components/selectors/FloorSelector";
import PoiSelector from "./components/selectors/PoiSelector";
import { buildingFactoryFromJson } from "./domain/factories";
import { SitumAPI } from "./domain/persistance";

const DOMAIN: string = import.meta.env.VITE_DOMAIN;
const EMAIL: string = import.meta.env.VITE_EMAIL;
const APIKEY: string = import.meta.env.VITE_APIKEY;
const BUILDINGID: number = import.meta.env.VITE_BUILDINGID;

function App() {
  const [initialViewState, setInitialViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 13,
    pitch: 0,
    bearing: 20,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [buildings, setBuildings] = useState<any[]>([]);
  const [currentBuildingID, setCurrentBuildingID] = useState<number | null>(
    BUILDINGID
  );
  const [currentFloorID, setCurrentFloorID] = useState<number | null>(null);
  const [selectedPoiID, setSelectedPoiID] = useState<number | null>(null);

  // Load the app and data on start
  useEffect(() => {
    const situmAPI = new SitumAPI(EMAIL, APIKEY, DOMAIN);

    // Load poi categories and buildings
    Promise.all([
      situmAPI.getPoiCategories(),
      situmAPI.getBuildingById(BUILDINGID),
    ])
      .then((values) => {
        const c = values[0]; // Categories
        const b = values[1]; // Buildings

        const building = buildingFactoryFromJson(b, c);

        setBuildings([building]);
        setCurrentBuildingID(BUILDINGID);
        setCurrentFloorID(building.getFloorByLevel(0).id);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Callback when poi is selected
  const onPoiSelect = useCallback((poi) => {
    setSelectedPoiID(poi?.id);

    poi && setCurrentFloorID(poi?.position.floor_id);
  }, []);

  // Callback when floor is changed
  const onFloorSelect = (floorId: number) => {
    setCurrentFloorID(floorId);
  };

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
        />
      )}

      {loading ? (
        <div className="loading">Loading cartography…</div>
      ) : (
        <>
          <div className="loading">
            {buildings.find((b) => b.id == currentBuildingID).name} - Level{" "}
            {
              buildings
                .find((b) => b.id == currentBuildingID)
                .floors?.floors?.find((f: any) => f.id == currentFloorID).level
            }
          </div>
          <PoiSelector
            buildings={buildings}
            currentBuilding={currentBuildingID}
            onSelect={onPoiSelect}
            currentPoiID={selectedPoiID}
          />
          <FloorSelector
            currentFloor={currentFloorID}
            currentBuilding={currentBuildingID}
            buildings={buildings}
            onSelect={onFloorSelect}
          />

          <MapToolbar
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

              setCurrentBuildingID(null);
              setCurrentBuildingID(currentBuildingID);
              // setBuildingView(building);
            }}
          />
        </>
      )}
    </ErrorBoundary>
  );
}

export default App;
