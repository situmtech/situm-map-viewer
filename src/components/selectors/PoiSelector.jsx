import React, { useEffect, useState } from "react";
import { FaSearch as SearchIcon } from "react-icons/fa";

const PoiSelector = ({
  buildings,
  currentBuilding,
  onSelect,
  currentPoiID,
}) => {
  const [filterText, setFilterText] = useState("");
  const [pois, setPois] = useState([]);

  useEffect(() => {
    setPois(buildings[0]?.pois.pois);
  }, [buildings]);

  return currentPoiID != null ? (
    <div className="poi-selector">
      <div className="poi-selector__title">
        <img
          className="poi-selector__title__image"
          src="https://situm.com/wp-content/themes/situm/img/logo-situm.svg"
          alt="Situm"
        />
        <div className="poi-selector__title__text">
          <h3>{pois.find((poi) => poi.id == currentPoiID)?.name}</h3>
        </div>
      </div>
      <div className="poi-selector__content">
        {JSON.stringify(pois.find((poi) => poi.id == currentPoiID))}
        <button onClick={() => onSelect(null)}>Close</button>
      </div>
    </div>
  ) : (
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
        {pois?.length > 0 ? (
          pois
            ?.filter((poi) => {
              return (
                filterText.trim() === "" ||
                poi.name.toLowerCase().includes(filterText.toLowerCase())
              );
            })
            .map((poi) => (
              <div
                key={`poi-${poi.id}`}
                className="poi-selector__poi"
                onClick={() => {
                  onSelect(poi);
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
