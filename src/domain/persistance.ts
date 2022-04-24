import SitumSDK from "@situm/sdk-js";

export class SitumAPI {
  private situmSDK: SitumSDK;

  constructor(
    private email: string,
    private apiKey: string,
    private domain: string
  ) {
    this.situmSDK = new SitumSDK({
      auth: {
        apiKey: this.apiKey,
        email: this.email,
      },
      domain: this.domain,
    });
  }

  getBuildingById(id: number) {
    return this.situmSDK.cartography.getBuildingById(id);
  }

  getBuildings() {
    return this.situmSDK.cartography.getBuildings();
  }

  async getPoiCategories() {
    const poiCategories = await this.situmSDK.cartography.getPoiCategories();

    return poiCategories.map((c) => ({
      ...c,
      iconUrl: this.domain + c.iconUrl,
    }));
  }
}
