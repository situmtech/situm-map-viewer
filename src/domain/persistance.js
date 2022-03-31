import SitumSDK from "@situm/sdk-js";

export class SitumAPI {
  constructor(email, apiKey, domain) {
    this.email = email;
    this.apiKey = apiKey;
    this.domain = domain;
    this.situmSDK = new SitumSDK({
      auth: {
        apiKey: this.apiKey,
        email: this.email,
      },
      domain: this.domain,
    });
  }

  getBuildingById(id) {
    return this.situmSDK.cartography.getBuildingById(id);
  }

  async getPoiCategories() {
    var poiCategories = await this.situmSDK.cartography.getPoiCategories();
    poiCategories.forEach((c) => {
      c.iconUrl = this.domain + c.iconUrl;
    });
    return poiCategories;
  }
}
