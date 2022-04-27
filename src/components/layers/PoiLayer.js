import { CompositeLayer, IconLayer } from "deck.gl";

import { POI_CATEGORY_ICON_BACKGROUND } from "../../domain/models";

export default class PoiLayer extends CompositeLayer {
  renderLayers() {
    return [
      new IconLayer({
        id: (d) => `${d.id}-icon-layer-background`,
        data: this.props.pois,
        pickable: true,
        getIcon: (d) => ({
          url: POI_CATEGORY_ICON_BACKGROUND,
          width: 96,
          height: 96,
          anchorY: 96,
          mask: true,
        }),
        sizeScale: 4,
        getPosition: (d) => [d.position.lng, d.position.lat],
        getSize: (d) => 7,
        getColor: (d) => d.category.color,
      }),
      new IconLayer({
        id: (d) => `${d.id}-icon-layer-icon`,
        data: this.props.pois,
        pickable: true,
        getIcon: (d) => ({
          url: d.category.iconUrl,
          width: 96,
          height: 96,
          anchorY: 128,
          mask: true,
        }),
        sizeScale: 3,
        getPosition: (d) => [d.position.lng, d.position.lat],
        getSize: (d) => 6,
        getColor: (d) => [255, 255, 255],
      }),
    ];
  }
}
