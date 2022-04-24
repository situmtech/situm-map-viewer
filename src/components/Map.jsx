import {
  AmbientLight,
  LightingEffect,
  _SunLight as SunLight,
} from "@deck.gl/core";
import { BitmapLayer, IconLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import React, { useEffect, useState } from "react";
import { Map as StaticMap } from "react-map-gl";

// View Models

export class PoisToShow {
  constructor(pois) {
    this.pois = pois;
  }

  toJson() {
    return this.pois?.map((p) => {
      return p.toJson();
    });
  }
}

export class PoiToShow {
  constructor(name, lat, lng, icon) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.icon = icon;
  }

  toJson() {
    return {
      name: this.name,
      coordinates: [this.lng, this.lat],
      icon: this.icon,
    };
  }

  /*getColor() {
    switch (this.categoryName) {
      case "Information":
        return "red";
      case "Toilet":
        return "grey";
      case "Shop":
        return "green";
    }
  }*/
}

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
  bounds,
  image,
  buildings,
  currentBuilding,
  currentFloor,
  onPoiSelect,
  selectedPoi,
}) => {
  const floorplanLayer = new BitmapLayer({
    id: "floorplay-layer",
    bounds: bounds,
    image: image,
    pickable: true,
  });

  let pois = [];

  if (buildings.length > 0) {
    const building = buildings.find((b) => b.id == currentBuilding);
    pois = building.pois.pois.filter(
      (el) => el.position.floor_id == currentFloor
    );
  }

  const poiLayer = new IconLayer({
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
    // getColor: (_d) => [255, 0, 0, 255],
    onHover: (el) => console.log,
    onClick: (el) => {
      console.log(el.object);
      onPoiSelect(el.object.id);
    },
    visible: (el) => {
      console.log(el);
      return el.level == currentFloor;
    },
  });

  const layers = [floorplanLayer, poiLayer];

  return layers;
};

const Map = ({
  buildings,
  currentBuilding,
  currentFloor,
  selectedPoi,
  onPoiSelect,
  img,
  initialViewState,
  bounds,
}) => {
  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
  });
  const [mapCursor, setMapCursor] = useState("default");

  const [imageInternal, setImage] = useState(img);
  const [initialViewStateInternal, setInitialViewState] =
    useState(initialViewState);
  const [boundsInternal, setBounds] = useState(bounds);
  const [layers, setLayers] = useState([]);

  // Start the map
  // useEffect(() => {
  //   setImage(buildings[0].floors.find(e => e.level == currentFloor))
  // }, [buildings, currentBuilding]);

  useEffect(() => {
    setImage(img);
    setInitialViewState(initialViewState);
    setBounds(bounds);
    setLayers(
      buildLayers({
        bounds,
        image: imageInternal,
        buildings,
        currentBuilding,
        currentFloor,
        onPoiSelect,
        selectedPoi,
      })
    );
  }, [
    img,
    imageInternal,
    initialViewState,
    bounds,
    currentBuilding,
    buildings,
  ]);

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
      onHover={(object) => !object.layer && setMapCursor("default")}
      //onClick={(object) => console.log}
      getCursor={({ isDragging }) => {
        if (isDragging) {
          // onDrag();
          return "grabbing";
        } else return mapCursor;
      }}
      effects={effects}
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
