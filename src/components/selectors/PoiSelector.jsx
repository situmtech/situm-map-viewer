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
          className="poi-selector__title__image"
          src="https://situm.com/wp-content/themes/situm/img/logo-situm.svg"
          alt="Situm"
        />
        <div className="poi-selector__title__search">
          <SearchIcon className="search-pois__icon search-icon" />
          <input
            autoFocus
            className="poi-selector__title__search__input"
            value={filterText}
            type="search"
            data-action="search"
            placeholder="Search points of interest..."
            onChange={async (e) => {
              setFilterText(e.target.value);
            }}
          />
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
