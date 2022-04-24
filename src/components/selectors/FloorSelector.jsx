import React, { useEffect, useState } from "react";

const FloorSelector = ({
  currentBuilding,
  currentFloor,
  buildings,
  onSelect,
}) => {
  const [floors, setFloors] = useState([]);

  useEffect(
    function onBuildingAndActiveUpdate() {
      if (buildings.length == 0) {
        setFloors([]);
      } else {
        const calculatedFloors = buildings.find(
          (b) => b.id == currentBuilding
        )?.floors;
        setFloors(calculatedFloors.floors);
      }
    },
    [buildings, currentFloor]
  );

  return (
    <div className="floor-selector">
      <div className="floor-selector__content">
        {floors.map((floor) => (
          <div
            key={`floor-${floor.id}`}
            className={`floor-selector__floor ${
              currentFloor == floor.id && "active"
            }`}
            onClick={() => onSelect(floor.id)}
          >
            {floor.level}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;
