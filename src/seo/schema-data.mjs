import { faqCategories } from "../content/faqs.mjs";

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
  name: "Clarks Financials Limited",
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

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faqs#faq`,
  url: `${SITE_URL}/faqs`,
  mainEntity: faqCategories.flatMap((category) =>
    category.questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  ),
};

const loanProductServiceIds = {
  "Salary Loan": "salary-loan",
  Unsecured: "unsecured",
  "Agency Banking": "agency-banking",
};

export const loanServiceSchemas = Object.entries(loanProductServiceIds).map(([name, fragment]) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/loans#${fragment}`,
  name,
  serviceType: name,
  url: `${SITE_URL}/loans`,
  provider: {
    "@id": ORGANIZATION_ID,
  },
  areaServed: {
    "@type": "Country",
    name: "Uganda",
  },
}));

const breadcrumbRouteLabels = {
  "/about": "About",
  "/loans": "Loans",
  "/apply": "Apply",
  "/regulatory": "Regulatory",
  "/faqs": "FAQs",
  "/contact": "Contact",
};

export const breadcrumbSchemas = Object.fromEntries(
  Object.entries(breadcrumbRouteLabels).map(([path, label]) => [
    path,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}${path}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: label,
          item: `${SITE_URL}${path}`,
        },
      ],
    },
  ]),
);

const schemasByRoute = {
  "/": [organizationSchema],
  "/about": [breadcrumbSchemas["/about"]],
  "/loans": [breadcrumbSchemas["/loans"], ...loanServiceSchemas],
  "/apply": [breadcrumbSchemas["/apply"]],
  "/regulatory": [breadcrumbSchemas["/regulatory"]],
  "/faqs": [faqPageSchema, breadcrumbSchemas["/faqs"]],
  "/contact": [financialServiceSchema, breadcrumbSchemas["/contact"]],
};

export function schemasForRoute(pathname) {
  return schemasByRoute[pathname] ?? [];
}

export const allSchemas = Object.values(schemasByRoute).flat();
