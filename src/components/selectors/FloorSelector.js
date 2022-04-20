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
      <div className="floor-list">
        {floors?.map((floor) => (
          <a
            key={`floor-${floor.id}`}
            href="#"
            onClick={(e) => {
              onSelect(floor.id);
            }}
            className={`floor-list__floor ${active == floor.id && "active"}`}
          >
            {floor.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;
