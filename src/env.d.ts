interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_DOMAIN: string;
  readonly VITE_EMAIL: string;
  readonly VITE_APIKEY: string;
  readonly VITE_BUILDINGID: number;
  readonly VITE_MAPBOX_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
