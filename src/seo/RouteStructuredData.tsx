import { useLocation } from "react-router-dom";
import { schemasForRoute } from "./schema-data.mjs";

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function RouteStructuredData() {
  const { pathname } = useLocation();
  const schemas = schemasForRoute(pathname);

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@id"] ?? `${pathname}-${schema["@type"]}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
    </>
  );
}
