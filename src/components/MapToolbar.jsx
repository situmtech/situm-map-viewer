import React from "react";

function MapToolbar({ onIncreaseZoom, onDecreaseZoom, onCenter }) {
  return (
    <div className="map-toolbar">
      <div className="map-toolbar__button increase-zoom" onClick={onIncreaseZoom}>+</div>
      <div className="map-toolbar__button increase-zoom" onClick={onDecreaseZoom}>-</div>
      <div className="map-toolbar__button increase-zoom" onClick={onCenter}>X</div>
    </div>
  );
}

export default MapToolbar;
