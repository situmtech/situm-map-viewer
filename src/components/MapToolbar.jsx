import React from "react";
import { AiOutlineZoomIn as PlusIcon } from "react-icons/ai";
import { AiOutlineZoomOut as MinusIcon } from "react-icons/ai";
import { MdOutlineCenterFocusWeak as CenterIcon } from "react-icons/md";

function MapToolbar({ onIncreaseZoom, onDecreaseZoom, onCenter }) {
  return (
    <div className="map-toolbar">
      <div className="map-toolbar__button map-toolbar__button--compound">
        <div className="increase-zoom" onClick={onIncreaseZoom}>
          <PlusIcon className="map-toolbar__button__icon increase-zoom-icon" />
        </div>
        <div className="decrease-zoom" onClick={onDecreaseZoom}>
          <MinusIcon className="map-toolbar__button__icon decrease-zoom-icon" />
        </div>
      </div>
      <div className="map-toolbar__button center-zoom" onClick={onCenter}>
        <CenterIcon className="map-toolbar__button__icon center-zoom-icon" />
      </div>
    </div>
  );
}

export default MapToolbar;
