


export function getBaseFloorplan(building){
 
    return building.getFloorByLevel(0).floorplan
}


export function getPoisFromFloorLevel(building, level){
    
    return building.getPoisFromLevel(level)
}

export function getPoisFromFloorId(building, floorId){
    
    return building.getPoisFromFloorId(floorId)
}

export function getPoisFromFloorIdFilteringSome(building, floorId, poiIdsToFilter){
    var pois = building.getPoisFromFloorId(floorId)
    
    var pois_filtered = pois.filterOutByIds(poiIdsToFilter)
 
    return pois_filtered
}

export function getFloorplanFromFloorId(building, floor_id){
    return building.getFloorById(floor_id).floorplan
    
}

export function getFloorplanFromFloorLevel(building, level){
    return building.getFloorByLevel(level).floorplan
    
}

export function getPoiById(building, poiId){
     
    return building.getPoiById(poiId)
}

