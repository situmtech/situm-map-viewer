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
    var _poisJson = [];
    this.pois.forEach((p) => {
      _poisJson.push(p.toJson());
    });
    return _poisJson;
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

  getColor() {
    switch (this.categoryName) {
      case "Information":
        return "red";
      case "Toilet":
        return "grey";
      case "Shop":
        return "green";
    }
  }
}

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
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
const buildLayers = ({ bounds, image, poisToShow }) => {
  const floorplanLayer = new BitmapLayer({
    id: "floorplay-layer",
    bounds: bounds,
    image: image,
    pickable: true,
    onClick: (info) => console.log(info),
  });

  const poiLayer = new IconLayer({
    id: "icon-layer",
    data: poisToShow,
    pickable: true,
    getIcon: (d) => ({
      url: d.icon,
      width: 128,
      height: 128,
      anchorY: 128,
      mask: false,
    }),
    sizeScale: 5,
    getPosition: (d) => d.coordinates,
    getSize: (_d) => 5,
  });

  return [floorplanLayer, poiLayer];
};

const Map = (props) => {
  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
  });
  const [mapCursor, setMapCursor] = useState("default");
  const [image, setImage] = useState(props.img);
  const [initialViewState, setInitialViewState] = useState(
    props.initialViewState
  );
  const [bounds, setBounds] = useState(props.bounds);
  const [poisToShow, setPoisToShow] = useState(
    props.poisToShow ? props.poisToShow.toJson() : new PoisToShow().toJson()
  );

  useEffect(() => {
    setImage(props.img);
    setInitialViewState(props.initialViewState);
    setBounds(props.bounds);

    setPoisToShow(
      props.poisToShow ? props.poisToShow.toJson() : new PoisToShow().toJson()
    );
  }, [props]);

  return (
    <DeckGL
      initialViewState={initialViewState}
      layers={[...buildLayers({ image, bounds, poisToShow })]}
      controller={{
        touchZoom: true,
        touchRotate: true,
        dragRotate: true,
        inertia: true,
      }}
      parameters={{ depthTest: true }}
      onHover={(object) => !object.layer && setMapCursor("default")}
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
