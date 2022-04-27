import React from "react";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { FaMinus as MinusIcon } from "react-icons/fa";
import { FaLifeRing as CenterIcon } from "react-icons/fa";

function MapToolbar({ onIncreaseZoom, onDecreaseZoom, onCenter }) {
  return (
    <div className="map-toolbar">
      <div
        className="map-toolbar__button increase-zoom"
        onClick={onIncreaseZoom}
      >
        <PlusIcon className="map-toolbar__button increase-zoom-icon" />
      </div>
      <div
        className="map-toolbar__button decrease-zoom"
        onClick={onDecreaseZoom}
      >
        <MinusIcon className="map-toolbar__button decrease-zoom-icon" />
      </div>
      <div className="map-toolbar__button center-zoom" onClick={onCenter}>
        <CenterIcon className="map-toolbar__button center-zoom-icon" />
      </div>
    </div>
  );
}

export default MapToolbar;
