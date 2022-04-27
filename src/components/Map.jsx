import {
  AmbientLight,
  LightingEffect,
  _SunLight as SunLight,
} from "@deck.gl/core";
import { DeckGL, FlyToInterpolator } from "deck.gl";
import React, { useEffect, useState } from "react";
import { Map as StaticMap } from "react-map-gl";

import MapToolbar from "./MapToolbar";
import FloorPlanLayer from "./layers/FloorplanLayer";
import PoiLayer from "./layers/PoiLayer";

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 22),
  color: [255, 255, 255],
  intensity: 1.0,
  _shadow: true,
});

const buildLayers = ({
  buildings,
  currentBuilding,
  currentFloor,
  onPoiSelect,
  selectedPoi,
}) => {
  const layers = [];
  const building = buildings.find((b) => b.id == currentBuilding);

  // If no building the nothing to render
  if (!building) {
    return [];
  }

  layers.push(new FloorPlanLayer({ building, currentFloor }));

  const pois = building.pois.pois.filter(
    (el) => el.position.floor_id == currentFloor
  );

  pois.length > 0 &&
    layers.push(
      new PoiLayer({
        pois,
        selectedPoi,
        onPoiSelect,
        visible: true,
        onClick: (d) => {
          onPoiSelect(d.object);
        },
      })
    );

  return layers;
};

const Map = ({
  buildings,
  currentBuilding,
  currentFloor,
  selectedPoi,
  onPoiSelect,
}) => {
  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
  });
  const [mapCursor, setMapCursor] = useState("default");

  const [initialViewState, setInitialViewState] = useState({
    longitude: -122.519,
    latitude: 37.7045,
    zoom: 13,
    pitch: 0,
    bearing: 20,
  });
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    const building = buildings.find((b) => b.id == currentBuilding);

    if (!building) return;

    setInitialViewState({
      ...initialViewState,
      longitude: building.geometry.location.lng,
      latitude: building.geometry.location.lat,
      zoom: 18,
      transitionDuration: 200,
      transitionInterpolator: new FlyToInterpolator(),
    });
    setLayers(
      buildLayers({
        buildings,
        currentBuilding,
        currentFloor,
        onPoiSelect,
        selectedPoi,
      })
    );
  }, [currentBuilding, currentFloor]);

  useEffect(() => {
    if (!selectedPoi) return;
    const building = buildings.find((b) => b.id == currentBuilding);
    const poi = building.pois.pois.find((p) => p.id == selectedPoi);

    setInitialViewState({
      ...initialViewState,
      longitude: poi.position.lng,
      latitude: poi.position.lat,
      zoom: 19,
      transitionDuration: 300,
      transitionInterpolator: new FlyToInterpolator({ curve: 3, speed: 1 }),
    });
  }, [selectedPoi]);

  useEffect(() => {
    setLayers(
      buildLayers({
        buildings,
        currentBuilding,
        currentFloor,
        onPoiSelect,
        selectedPoi,
      })
    );
  }, [currentBuilding, buildings]);

  return (
    <DeckGL
      initialViewState={initialViewState}
      layers={layers}
      controller={{
        touchZoom: true,
        touchRotate: true,
        dragRotate: true,
        inertia: true,
      }}
      parameters={{ depthTest: true }}
      onHover={(object) => !object.layer && setMapCursor("pointer")}
      getCursor={({ isDragging }) => {
        if (isDragging) {
          return "grabbing";
        } else return mapCursor;
      }}
      effects={effects}
      getTooltip={({ object }) => object && `${object.name}`}
    >
      <StaticMap
        mapboxAccessToken={MAPBOX_API_KEY}
        mapStyle={
          "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
        }
        reuseMaps={true}
      />

      <MapToolbar
        onIncreaseZoom={() => {
          console.log("zoom in");
          setInitialViewState({
            ...initialViewState,
            zoom: initialViewState.zoom + 1,
          });
        }}
        onDecreaseZoom={() => {
          console.log("zoom out");
          setInitialViewState({
            ...initialViewState,
            zoom: initialViewState.zoom - 1,
          });
        }}
        onCenter={() => {
          const building = buildings.find((b) => b.id == currentBuilding);

          setInitialViewState({
            ...initialViewState,
            longitude: building.geometry.location.lng,
            latitude: building.geometry.location.lat,
            zoom: 18,
            transitionDuration: 200,
            transitionInterpolator: new FlyToInterpolator(),
          });
        }}
      />
    </DeckGL>
  );
  //
};

export default Map;
