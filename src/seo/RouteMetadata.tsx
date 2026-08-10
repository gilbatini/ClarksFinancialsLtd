import { useLocation } from "react-router-dom";
import { routeMetadata } from "./metadata";

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const metadata = routeMetadata[pathname] ?? routeMetadata["/"];

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </>
  );
}
