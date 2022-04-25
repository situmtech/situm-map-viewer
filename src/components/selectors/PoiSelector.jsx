import React, { useEffect, useState } from "react";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { FaChevronCircleLeft as BackIcon } from "react-icons/fa";
import { FaMapPin as PositionIcon } from "react-icons/fa";

const PoiSelector = ({
  buildings,
  currentBuilding,
  onSelect,
  currentPoiID,
}) => {
  const [filterText, setFilterText] = useState("");
  const [pois, setPois] = useState([]);
  const [filteredPois, setFilteredPois] = useState([]);
  const [currentPoi, setCurrentPoi] = useState(null);

  useEffect(() => {
    setPois(buildings[0]?.pois.pois);
    setCurrentPoi(pois.find((poi) => poi.id == currentPoiID));
  }, [buildings, currentPoiID]);

  function filterPois(poisToFilter) {
    const filtered = poisToFilter?.filter((poi) => {
      return (
        filterText.trim() === "" ||
        poi.name.toLowerCase().includes(filterText.toLowerCase())
      );
    });

    setFilteredPois(filtered);
  }

  return currentPoiID != null && currentPoi != null ? (
    <div className="poi-selector">
      <div className="poi-selector__title">
        <div className="poi-selector__title__poi">
          <img
            className="poi-selector__title__poi__icon"
            src={currentPoi?.category.iconUrl}
          />
          <div className="poi-selector__title__poi__name">
            {currentPoi?.name}
          </div>
        </div>
        <BackIcon
          className="poi-selector__title back-icon"
          onClick={() => onSelect(null)}
        />
      </div>
      <div className="poi-selector__info">
        {/*JSON.stringify(pois.find((poi) => poi.id == currentPoiID))*/}
        <div className="poi-selector__info__description">
          {"que tienda tan bonita"}
        </div>
        <div className="poi-selector__info__position">
          <PositionIcon className="poi-selector__info__position position-icon" />
          <div className="poi-selector__info__position__text">
            {buildings[0].name} - Level {""}
            {
              buildings[0].floors?.floors?.find(
                (f) => f.id == currentPoi?.position.floor_id
              ).level
            }
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="poi-selector">
      <div className="poi-selector__header">
        <img
          className="poi-selector__header__image"
          src="https://situm.com/wp-content/themes/situm/img/logo-situm.svg"
          alt="Situm"
        />
        <div className="poi-selector__header__search">
          <SearchIcon className="search-pois__icon search-icon" />
          <input
            autoFocus
            className="poi-selector__header__search__input"
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
                  setCurrentPoi(pois.find((p) => p.id == poi.id));
                }}
              >
                <img
                  className="poi-selector__poi__icon"
                  src={poi?.category.iconUrl}
                />
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

/*
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
*/

/*
{pois?.length > 0 ? (
          filterPois() && filteredPois?.length > 0 ? (
            filteredPois.map((poi) => (
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
            <div className="poi-selector__no-pois">
              No pois found matching the slected name
            </div>
          )
        ) : (
          <div className="poi-selector__no-pois">
            No pois found in the building
          </div>
        )}
*/

/*<div className="poi-selector__title">
        <div className="poi-selector__title__poi__icon"></div>
        <div className="poi-selector__title__poi__info">
          <h3>{currentPoi?.name}</h3>
          <h4>
            {buildings[0].name} - Level {""}
            {
              buildings[0].floors?.floors?.find(
                (f) => f.id == currentPoi?.position.floor_id
              ).level
            }
          </h4>
        </div>
      </div>*/
