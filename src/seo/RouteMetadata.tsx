import { useLocation } from "react-router-dom";
import { routeMetadata, SITE_ORIGIN } from "./metadata";

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const metadata = routeMetadata[pathname] ?? routeMetadata["/"];
  const canonical = new URL(pathname, SITE_ORIGIN).href;

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={canonical} />
    </>
  );
}
