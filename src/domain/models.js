// Domain Models
export const POI_CATEGORY_ICON_BACKGROUND =
  "https://cdn-icons-png.flaticon.com/512/25/25394.png";

const poiCategoryProperties = new Map([
  [
    // Coffee OK
    1,
    {
      url: "images/coffee.png",
      color: [255, 120, 0],
    },
  ],
  [
    // Elevator OK
    2,
    {
      url: "images/elevator.png",
      color: [127, 57, 212],
    },
  ],
  [
    // Entrance OK
    3,
    {
      url: "images/entrance.png",
      color: [127, 57, 212],
    },
  ],
  [
    // Information OK
    4,
    {
      url: "images/information.png",
      color: [1, 191, 231],
    },
  ],
  [
    // Parking OK
    5,
    {
      url: "images/parking.png",
      color: [66, 70, 200],
    },
  ],
  [
    // Ramp OK
    6,
    {
      url: "images/ramp.png",
      color: [127, 57, 212],
    },
  ],
  [
    // Shop OK
    7,
    {
      url: "images/shop.png",
      color: [19, 171, 93],
    },
  ],
  [
    // Stairs OK
    8,
    {
      url: "images/stairs.png",
      color: [127, 57, 212],
    },
  ],
  [
    // Toilet OK
    9,
    {
      url: "images/toilets.png",
      color: [1, 191, 231],
    },
  ],
  [
    // No category
    "default",
    {
      url: "images/default.png",
      color: [80, 80, 80],
    },
  ],
]);

export class BuildingGeometry {
  constructor(location, corners, width, length, rotation) {
    this.location = location;
    this.corners = corners;
    this.width = width;
    this.length = length;
    this.rotation = rotation;
  }
}

export class Building {
  constructor(id, name, geometry, floors, pois) {
    this.id = id;
    this.name = name;
    this.geometry = geometry;

    this.floors = floors;
    this.pois = pois;
  }

  getFloorByLevel(level) {
    return this.floors.getFloorByLevel(level);
  }

  getFloorById(floorID) {
    return this.floors.getFloorById(floorID);
  }

  getPoisFromLevel(level) {
    const floorID = this.getFloorByLevel(level).id;

    return this.pois.filterByFloorId(floorID);
  }

  getPoisFromFloorId(floorId) {
    return this.pois.filterByFloorId(floorId);
  }

  getPoiById(poiId) {
    return this.pois.filterById(poiId);
  }
}

export class Floors {
  constructor(floors) {
    this.floors = floors;
  }

  getFloorByLevel(level) {
    return this.floors.find((e) => e.level == level);
  }

  getFloorById(floor_id) {
    return this.floors.find((e) => e.id == floor_id);
  }

  toArray() {
    return this.floors;
  }
}
export class Floor {
  constructor(id, level, floorplan) {
    this.id = id;
    this.level = level;
    this.floorplan = floorplan;
  }
}

export class LatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}
export class Corners {
  constructor(nw, ne, se, sw) {
    this.nw = nw;
    this.ne = ne;
    this.se = se;
    this.sw = sw;
  }
}

export class Position {
  constructor(building_id, floor_id, lat, lng) {
    this.building_id = building_id;
    this.floor_id = floor_id;
    this.lat = lat;
    this.lng = lng;
  }
}

export class Poi {
  constructor(id, name, position, category, categoryId, info) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.category = category;
    this.categoryId = categoryId;
    this.info = info;
  }
}

export class Pois {
  constructor(pois) {
    this.pois = pois;
  }

  toArray() {
    return this.pois;
  }

  filterByFloorId(floor_id) {
    return new Pois(
      this.pois.filter((p) => {
        return p.position.floor_id == floor_id;
      })
    );
  }

  filterById(id) {
    return this.pois.filter((p) => p.id == id)[0];
  }

  filterOutByIds(ids) {
    return new Pois(this.pois.filter((p) => !ids.includes(p.id)));
  }
}

//const generator = new Math.seedrandom("11111");
export class PoiCategory {
  constructor(id, nameEn /*, iconUrl , selectedIconUrl*/) {
    this.id = id;
    this.nameEn = nameEn;
    this.iconUrl = poiCategoryProperties.has(id)
      ? poiCategoryProperties.get(id).url
      : poiCategoryProperties.get("default").url;
    this.color = poiCategoryProperties.has(id)
      ? poiCategoryProperties.get(id).color
      : poiCategoryProperties.get("default").color;
  }
}

export class PoiCategories {
  constructor(poiCategories) {
    this.poiCategories = poiCategories;
  }

  findById(id) {
    return this.poiCategories.find((e) => e.id == id);
  }
}
