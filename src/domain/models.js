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
  constructor(id, name, position, category, categoryName, info) {
    this.id = id;
    this.name = name;
    this.info = info;
    this.position = position;
    this.category = category;
    this.categoryName = categoryName;
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
  constructor(id, iconUrl, selectedIconUrl) {
    this.id = id;
    this.iconUrl = iconUrl;
    this.selectedIconUrl = selectedIconUrl;
    //this.color = this.getColor(id);
  }

  /*getColor(id) {
    const c1 = Math.floor(generator() * id);
    const c2 = Math.floor(generator() * id);
    const c3 = Math.floor(generator() * id);

    return [c1, c2, c3];
  }*/
}

export class PoiCategories {
  constructor(poiCategories) {
    this.poiCategories = poiCategories;
  }

  findById(id) {
    return this.poiCategories.find((e) => e.id == id);
  }
}
