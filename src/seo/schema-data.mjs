export const SITE_URL = "https://www.clarksfinancials.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const schemaVerificationTodos = [
  "TODO(clarks-verify): Add sameAs only after Clarks supplies verified official social-profile URLs.",
  "TODO(clarks-verify): Add licensing or regulatory-status fields only after Clarks supplies a current UMRA licence document and exact identifier.",
];

const headOfficeAddress = {
  "@type": "PostalAddress",
  streetAddress: "Ambassador House, 2nd Floor, Kampala Road",
  addressLocality: "Kampala",
  addressCountry: "UG",
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Clarks Financials Limited",
  legalName: "Clarks Financials Limited",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-2-orgnal.jpg`,
  },
  email: "loans@clarksfinancials.com",
  telephone: "+256772502955",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+256772502955",
      email: "loans@clarksfinancials.com",
      areaServed: "UG",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+256702502955",
      email: "loans@clarksfinancials.com",
      areaServed: "UG",
      availableLanguage: "English",
    },
  ],
  address: headOfficeAddress,
};

const schemasByRoute = {
  "/": [organizationSchema],
};

export function schemasForRoute(pathname) {
  return schemasByRoute[pathname] ?? [];
}

export const allSchemas = Object.values(schemasByRoute).flat();
