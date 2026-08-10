export const SITE_ORIGIN = "https://www.clarksfinancials.com";

export type RouteMetadata = {
  title: string;
  description: string;
};

export const routeMetadata: Record<string, RouteMetadata> = {
  "/": {
    title: "Clarks Financials | Loan Services in Uganda",
    description:
      "Explore loan services from Clarks Financials in Uganda, learn how the application process works, and contact the team for guidance.",
  },
  "/about": {
    title: "About Clarks Financials | Uganda Loan Provider",
    description:
      "Learn about Clarks Financials, its approach to customer service in Uganda, and the team supporting borrowers through the loan process.",
  },
  "/loans": {
    title: "Loan Options in Uganda | Clarks Financials",
    description:
      "Review the loan options presented by Clarks Financials, understand the application steps, and find the documents needed to get started.",
  },
  "/apply": {
    title: "Apply for a Loan | Clarks Financials Uganda",
    description:
      "Start your Clarks Financials loan enquiry, review the documents requested for an application, and choose how to contact the team.",
  },
  "/regulatory": {
    title: "Regulatory Information | Clarks Financials",
    description:
      "Read Clarks Financials regulatory information, privacy commitments, complaints process, and guidance on responsible borrowing in Uganda.",
  },
  "/faqs": {
    title: "Loan Questions & Answers | Clarks Financials",
    description:
      "Find answers to common questions about Clarks Financials loan applications, documents, repayments, eligibility checks, and support.",
  },
  "/contact": {
    title: "Contact Clarks Financials | Kampala, Uganda",
    description:
      "Contact Clarks Financials in Kampala by phone, email, or WhatsApp for help with loan enquiries and application guidance.",
  },
};
