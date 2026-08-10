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

export const financialServiceSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${SITE_URL}/#financial-service-kampala-road`,
  name: "Clarks Financials Limited — Kampala Road",
  url: `${SITE_URL}/contact`,
  image: `${SITE_URL}/logo-2-orgnal.jpg`,
  parentOrganization: {
    "@id": ORGANIZATION_ID,
  },
  telephone: "+256772502955",
  email: "loans@clarksfinancials.com",
  address: headOfficeAddress,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  areaServed: {
    "@type": "Country",
    name: "Uganda",
  },
  currenciesAccepted: "UGX",
};

const schemasByRoute = {
  "/": [organizationSchema],
  "/contact": [financialServiceSchema],
};

export function schemasForRoute(pathname) {
  return schemasByRoute[pathname] ?? [];
}

export const allSchemas = Object.values(schemasByRoute).flat();
