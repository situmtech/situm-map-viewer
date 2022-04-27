import { BitmapLayer, CompositeLayer } from "deck.gl";

import {
  getBaseFloorplan,
  getFloorplanFromFloorId,
} from "../../domain/usecases";

export default class FloorplanLayer extends CompositeLayer {
  renderLayers() {
    const image = this.props.currentFloor
      ? getFloorplanFromFloorId(this.props.building, this.props.currentFloor)
      : getBaseFloorplan(this.props.building);

    const corners = this.props.building.geometry.corners;

    const bounds = [
      [corners.se.lng, corners.se.lat],
      [corners.ne.lng, corners.ne.lat],
      [corners.nw.lng, corners.nw.lat],
      [corners.sw.lng, corners.sw.lat],
    ];

    return [
      new BitmapLayer({
        id: "floorplay-layer",
        bounds: bounds,
        image: image,
        pickable: true,
      }),
    ];
  }
}
