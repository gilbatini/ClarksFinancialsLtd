import type { Config } from "vike/types";

export default {
  meta: {
    Page: {
      env: { server: true, client: false },
    },
  },
  clientHooks: false,
} satisfies Config;
