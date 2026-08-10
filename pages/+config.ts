import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

export default {
  extends: [vikeReact],
  clientRouting: false,
  prerender: true,
  lang: "en",
  favicon: "/fav.png",
  reactStrictMode: true,
} satisfies Config;
