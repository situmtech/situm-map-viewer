import {
  AmbientLight,
  LightingEffect,
  _SunLight as SunLight,
} from "@deck.gl/core";
import { BitmapLayer, IconLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import { FlyToInterpolator } from "deck.gl";
import React, { useEffect, useState } from "react";
import { Map as StaticMap } from "react-map-gl";

import { getBaseFloorplan, getFloorplanFromFloorId } from "../domain/usecases";

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

  if (building) {
    const image = currentFloor
      ? getFloorplanFromFloorId(building, currentFloor)
      : getBaseFloorplan(building);

    const bounds = [
      [building.geometry.corners.se.lng, building.geometry.corners.se.lat],
      [building.geometry.corners.ne.lng, building.geometry.corners.ne.lat],
      [building.geometry.corners.nw.lng, building.geometry.corners.nw.lat],
      [building.geometry.corners.sw.lng, building.geometry.corners.sw.lat],
    ];

    if (image) {
      layers.push(
        new BitmapLayer({
          id: "floorplay-layer",
          bounds: bounds,
          image: image,
          pickable: true,
        })
      );
    }

    const pois = building.pois.pois.filter(
      (el) => el.position.floor_id == currentFloor
    );

    pois.length > 0 &&
      layers.push(
        new IconLayer({
          id: "icon-layer",
          data: pois,
          pickable: true,
          getIcon: (d) => ({
            url: d.category.iconUrl,
            width: 128,
            height: 128,
            anchorY: 128,
            mask: false,
          }),
          sizeScale: 5,
          getPosition: (d) => [d.position.lng, d.position.lat],
          getSize: (_d) => 8,
          // getColor: (_d) =>
          //   _d.object.id == selectedPoi ? [0, 0, 0, 255] : [255, 0, 0, 255],
          onClick: (el) => {
            onPoiSelect(el.object);
          },
        })
      );
  }

  return layers;
};

const Map = ({
  buildings,
  currentBuilding,
  currentFloor,
  selectedPoi,
  onPoiSelect,
  initialViewState,
}) => {
  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
  });
  const [mapCursor, setMapCursor] = useState("default");

  const [initialViewStateInternal, setInitialViewState] = useState({
    longitude: -122.519,
    latitude: 37.7045,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    const building = buildings.find((b) => b.id == currentBuilding);

    if (!building) return;

    setInitialViewState({
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
      ...initialViewStateInternal,
      longitude: poi.position.lng,
      latitude: poi.position.lat,
      zoom: 19,
      transitionDuration: 300,
      transitionInterpolator: new FlyToInterpolator({ curve: 3, speed: 1 }),
    });
  }, [selectedPoi]);

  useEffect(() => {
    setInitialViewState(initialViewState);
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
      initialViewState={initialViewStateInternal}
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
          // onDrag();
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
    </DeckGL>
  );
  //
};

export default Map;
