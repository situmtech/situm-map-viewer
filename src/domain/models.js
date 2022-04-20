// Domain Models

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
  constructor(id, name, position, category) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.category = category;
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

export class PoiCategory {
  constructor(id, iconUrl, selectedIconUrl /*, color*/) {
    this.id = id;
    this.iconUrl = iconUrl;
    this.selectedIconUrl = selectedIconUrl;
    //this.color = color;
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
