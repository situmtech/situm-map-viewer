import { BitmapLayer, IconLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import React, { useEffect, useState } from "react";

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

const Map = (props) => {
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
    getSize: (_d) => 10,
  });

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={[floorplanLayer, poiLayer]}
    />
  );
  //
};

export default Map;
