import { useLocation } from "react-router-dom";
import { routeMetadata, SITE_ORIGIN } from "./metadata";

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const metadata = routeMetadata[pathname] ?? routeMetadata["/"];
  const canonical = new URL(pathname, SITE_ORIGIN).href;
  const ogImage = new URL("/og/clarks-financials-og.png", SITE_ORIGIN).href;
  const imageAlt = "Clarks Financials loan information and support in Uganda";

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Clarks Financials" />
      <meta property="og:locale" content="en_UG" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </>
  );
}
