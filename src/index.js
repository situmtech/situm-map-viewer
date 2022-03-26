import React, { Fragment, useEffect } from "react";
import { render } from 'react-dom';
import { useState, useCallback } from "react";
import Map, { PoisToShow } from "./components/Map";


import { Building } from "./domain/models"
import { SitumAPI } from "./domain/persistance";
import { buildingFactoryFromJson, poisToPoisToShow } from "./domain/factories";
import { getBaseFloorplan, getFloorplanFromFloorId, getPoiById, getPoisFromFloorLevel, getPoisFromFloorId } from "./domain/usecases";
import FloorSelector, { FloorOptions, floorOptionsFactory } from "./components/FloorSelector";
import PoiSelector, { PoiOptions, poiOptionsFactory } from "./components/PoiSelector";

const DOMAIN = "https://dashboard.situm.es"
const EMAIL = 'qa.acanedo2@situm.es'
const APIKEY = '38d82215de5bc515aa0d95a2c55096d6b1611dcae37677773da2f78521e2aa40'






function App() {
  const [img, setImg] = useState(null);
  const [initialViewState, setInitialViewState] = useState({
    longitude: -122.5190,
    latitude: 37.7045,
    zoom: 13,
    pitch: 0,
    bearing: 0
  });
  const [bounds, setBounds] = useState([-122.5190, 37.7045, -122.355, 37.829])
  const [poiOptions, setPoiOptions] = useState(new PoiOptions())
  const [floorOptions, setFloorOptions] = useState(new FloorOptions())
  const [poisToShow, setPoisToShow] = useState(new PoisToShow([]))
  const [building, setBuilding] = useState(new Building())
  const [level, setLevel] = useState(0)


  useEffect(() => {
    loadData()
  }, [])


  async function loadData() {

    const situmAPI = new SitumAPI(EMAIL, APIKEY, DOMAIN)

    const buildingJson = await situmAPI.getBuildingById(10194)
    const poiCategoriesJson = await situmAPI.getPoiCategories()


    const building = buildingFactoryFromJson(buildingJson, poiCategoriesJson)
    setBuilding(building)
    setImg(getBaseFloorplan(building))
    setBuildingView(building)
    setFloorOptions(floorOptionsFactory(building.floors))
    setPoiOptions(poiOptionsFactory(building.pois))
    setPoisToShow(poisToPoisToShow(getPoisFromFloorLevel(building, level)))

  }



  function setBuildingView(building) {

    setInitialViewState({
      longitude: building.geometry.location.lng,
      latitude: building.geometry.location.lat,
      zoom: 16,
      pitch: 0,
      bearing: 0,
      transitionDuration: 0
    })

    setBounds([
      [building.geometry.corners.sw.lng, building.geometry.corners.sw.lat],
      [building.geometry.corners.se.lng, building.geometry.corners.se.lat],
      [building.geometry.corners.ne.lng, building.geometry.corners.ne.lat],
      [building.geometry.corners.nw.lng, building.geometry.corners.nw.lat]

    ]
    )

  }



  function floorSelectorChangeCallback(floorId) {
    setImg(getFloorplanFromFloorId(building, floorId))
    setPoisToShow(poisToPoisToShow(getPoisFromFloorId(building, floorId)))
    setBuildingView(building)
  }

  function poiSelectorChangeCallback(poiId) {

    const poi = getPoiById(building, poiId)
    const floorId = poi.position.floor_id
    setImg(getFloorplanFromFloorId(building, floorId))
    setPoisToShow(poisToPoisToShow(getPoisFromFloorId(building, floorId)))
    setInitialViewState({
      longitude: poi.position.lng,
      latitude: poi.position.lat,
      zoom: 18,
      pitch: 0,
      bearing: 0,
      transitionDuration: 0
    })
  }



  return (
    <Fragment>
      <Map img={img} poisToShow={poisToShow} initialViewState={initialViewState} bounds={bounds} />

      <PoiSelector poiOptions={poiOptions} poiCallback={poiSelectorChangeCallback} />

      <Fragment>
        <FloorSelector floorOptions={floorOptions} floorCallback={floorSelectorChangeCallback} />
      </Fragment>
    </Fragment>

  )
}


const rootElement = document.getElementById("root")
render(<App />, rootElement)
