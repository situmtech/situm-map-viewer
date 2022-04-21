import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

const PoiSelector = ({ pois, onSelect }) => {
  return (
    <div className="selector poi-selector">
      <div className="selector__title">
        <img
          src="https://situm.com/wp-content/themes/situm/img/logo-situm.svg"
          alt="Situm"
          className="selector__image"
        />
        {/* <Autocomplete
          id="poi-selector"
          disablePortal
          size="small"
          options={
            ourPois?.map((e) => {
              return { id: e.id, label: e.name };
            }) || []
          }
          onChange={(event, values) => {
            onSelect(values.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Search your amenity"
            />
          )}
          //sx={{ width: "20%" }}
        /> */}
      </div>
      <div className="selector__content">
        {pois?.map((poi) => (
          <div
            key={`poi-${poi.id}`}
            className="poi-selector__poi"
            onClick={() => {
              onSelect(poi.id);
            }}
          >
            <div className="poi-selector__poi__icon"></div>
            <div className="poi-selector__poi__name">{poi.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoiSelector;
