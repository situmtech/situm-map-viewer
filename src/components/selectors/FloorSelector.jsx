import React from "react";

export function floorOptionsFactory(floors) {
  var floorOptions = [];

  floors.toArray().forEach((f) => {
    floorOptions.push({ id: f.id, label: f.level });
  });

  return floorOptions;
}

const FloorSelector = ({ active = "", floors, onSelect }) => {
  return (
    <div className="floor-selector">
      <div className="floor-selector__content">
        {floors?.map((floor) => (
          <div
            key={`floor-${floor.id}`}
            className={`floor-selector__floor ${
              active == floor.id && "active"
            }`}
            onClick={() => {
              onSelect(floor.id);
            }}
          >
            {floor.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;
