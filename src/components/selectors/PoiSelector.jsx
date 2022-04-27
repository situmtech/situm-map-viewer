import React, { useEffect, useState } from "react";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { FaChevronCircleLeft as BackIcon } from "react-icons/fa";
import { FaMapPin as PositionIcon } from "react-icons/fa";

const PoiListElement = ({ poi, onClick }) => {
  return (
    <div key={`poi-${poi.id}`} className="poi-selector__poi" onClick={onClick}>
      <div className="poi-selector__poi__icon">
        <img
          className="poi-selector__poi__icon__image"
          src={poi?.category.iconUrl}
        />
      </div>
      <div className="poi-selector__poi__name">{poi.name}</div>
      <div className="poi-selector__poi__type">{poi.category.title}</div>
    </div>
  );
};

const PoiList = ({ pois, filterText, onClick }) => {
  return pois
    ?.filter((poi) => {
      return (
        filterText.trim() === "" ||
        poi.name.toLowerCase().includes(filterText.toLowerCase())
      );
    })
    .map((poi) => (
      <PoiListElement key={poi.id} poi={poi} onClick={() => onClick(poi)} />
    ));
};

const PoiDetails = ({ poi, buildings, onSelect }) => {
  return (
    <div className="poi-selector">
      <div className="poi-selector__title">
        <div className="poi-selector__header">
          <img
            className="poi-selector__header__image"
            src="https://situm.com/wp-content/themes/situm/img/logo-situm.svg"
            alt="Situm"
          />
        </div>

        <BackIcon
          className="poi-selector__title back-icon"
          onClick={() => onSelect(null)}
        />
      </div>
      <div className="poi-selector__info">
        <div className="poi-selector__poi">
          <div className="poi-selector__poi__icon">
            <img
              className="poi-selector__poi__icon__image"
              src={poi?.category.iconUrl}
            />
          </div>
          <div className="poi-selector__poi__name">{poi?.name}</div>
        </div>
        <div className="poi-selector__info__position">
          <PositionIcon className="poi-selector__info__position position-icon" />
          <div className="poi-selector__info__position__text">
            {buildings[0].name} - Level {""}
            {
              buildings[0].floors?.floors?.find(
                (f) => f.id == poi?.position.floor_id
              ).level
            }
          </div>
        </div>
        <div
          className="poi-selector__info__description"
          dangerouslySetInnerHTML={{
            __html: poi?.info || "No additional information about this POI",
          }}
        ></div>
      </div>
    </div>
  );
};

const PoiSelector = ({
  buildings,
  currentBuilding,
  onSelect,
  currentPoiID,
}) => {
  const [currentPoi, setCurrentPoi] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [pois, setPois] = useState([]);

  useEffect(() => {
    setPois(buildings[0]?.pois.pois);
    setCurrentPoi(pois.find((poi) => poi.id == currentPoiID));
  }, [buildings, currentPoiID]);

  return currentPoiID != null && currentPoi != null ? (
    <PoiDetails poi={currentPoi} buildings={buildings} onSelect={onSelect} />
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
            placeholder="Search points of interest..."
            onChange={async (e) => {
              setFilterText(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="poi-selector__content">
        {pois?.length > 0 ? (
          <PoiList
            pois={pois}
            filterText={filterText}
            onClick={(poi) => {
              onSelect(poi);
              setCurrentPoi(pois.find((p) => p.id == poi.id));
            }}
          />
        ) : (
          <div className="poi-selector__no-pois">No pois found</div>
        )}
      </div>
    </div>
  );
};

export default PoiSelector;
