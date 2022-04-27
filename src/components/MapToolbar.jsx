import React from "react";
import { AiOutlineZoomIn as PlusIcon } from "react-icons/ai";
import { AiOutlineZoomOut as MinusIcon } from "react-icons/ai";
import { MdOutlineCenterFocusWeak as CenterIcon } from "react-icons/md";

function MapToolbar({
  onIncreaseZoom,
  onDecreaseZoom,
  onCenter,
  onResetBearing,
}) {
  return (
    <div className="map-toolbar">
      <div className="map-toolbar__button" onClick={onResetBearing}>
        <svg
          className="map-toolbar__button__icon"
          width="24px"
          height="24px"
          viewBox="0 0 32 32"
          className="injected-svg"
          style={{
            flexShrink: 0,
            backfaceVisibility: "hidden",
            padding: ".3rem",
          }}
          strokeWidth="0"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.3832 25.6336C16.1717 26.1257 15.8258 26.1186 15.6174 25.6336L12.0689 17.3759C11.8575 16.8838 12.15 16.4849 12.7097 16.4849H19.2909C19.8562 16.4849 20.1401 16.8909 19.9317 17.3759L16.3832 25.6336Z"
            fill="white"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.3832 6.36638C16.1717 5.87432 15.8258 5.88143 15.6174 6.36638L12.0689 14.6241C11.8575 15.1162 12.15 15.5151 12.7097 15.5151H19.2909C19.8562 15.5151 20.1401 15.1091 19.9317 14.6241L16.3832 6.36638Z"
            fill="#E93232"
          ></path>
        </svg>
      </div>
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
