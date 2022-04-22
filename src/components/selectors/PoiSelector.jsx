import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { FaRegTimesCircle as DeleteIcon } from "react-icons/fa";

import { Poi } from "../../domain/models";

const PoiSelector = ({ pois, onSelect }) => {
  //const [poisFiltered, setPoisFiltered] = useState < Array < Poi >> [];
  const [poisFiltered, setPoisFiltered] = useState([]);
  const [filterText, setFilterText] = useState("");

  const filterPois = () => {
    if (filterText.trim() === "") {
      setPoisFiltered(pois);
    } else {
      const newPois = pois.filter((poi) => {
        return poi.name.toLowerCase().includes(filterText.toLowerCase());
      });
      setPoisFiltered(newPois);
    }
  };

  useEffect(() => {
    filterPois();
  }, [pois, filterText]);

  return (
    <div className="poi-selector">
      <div className="poi-selector__title">
        <img
          className="selector__image"
          src="https://situm.com/wp-content/themes/situm/img/logo-situm.svg"
          alt="Situm"
        />
        <div className="poi-selector__search">
          <input
            autoFocus
            value={filterText}
            type="text"
            data-action="search"
            placeholder="Search points of interest..."
            onChange={async (e) => {
              setFilterText(e.target.value);
            }}
          />
          <SearchIcon className="search-pois__icon search-icon" />
          <DeleteIcon className="search-pois__icon delete-icon" />
        </div>
      </div>
      <div className="poi-selector__content">
        {poisFiltered?.length > 0 ? (
          poisFiltered?.map((poi) => (
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
          ))
        ) : (
          <div className="poi-selector__no-pois">No pois found</div>
        )}
      </div>
    </div>
  );
};

export default PoiSelector;

/* <Autocomplete
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
/> */
