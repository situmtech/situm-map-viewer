import { CompositeLayer, IconLayer } from "deck.gl";

import { POI_CATEGORY_ICON_BACKGROUND } from "../../domain/models";

const ICON_SIZE = 96;

export default class PoiLayer extends CompositeLayer {
  renderLayers() {
    return [
      new IconLayer({
        id: (d) => `${d.id}-icon-layer-background`,
        data: this.props.pois,
        pickable: true,
        getIcon: (d) => ({
          url: POI_CATEGORY_ICON_BACKGROUND,
          width: ICON_SIZE,
          height: ICON_SIZE,
          anchorY: ICON_SIZE,
          mask: true,
        }),
        sizeScale: 4,
        getPosition: (d) => [d.position.lng, d.position.lat],
        getSize: 7,
        getColor: (d) => d.category.color,
      }),
      new IconLayer({
        id: (d) => `${d.id}-icon-layer-icon`,
        data: this.props.pois,
        pickable: true,
        getIcon: (d) => ({
          url: d.category.iconUrl,
          width: ICON_SIZE,
          height: ICON_SIZE,
          anchorY: 128,
          mask: true,
        }),
        sizeScale: 3,
        getPosition: (d) => [d.position.lng, d.position.lat],
        getSize: 6,
        getColor: [255, 255, 255],
      }),
    ];
  }
}
