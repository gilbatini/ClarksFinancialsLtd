#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { allSchemas, schemaVerificationTodos, schemasForRoute } from "../../src/seo/schema-data.mjs";
import { ROOT, assert } from "./lib.mjs";

const requestedType = process.argv.includes("--type")
  ? process.argv[process.argv.indexOf("--type") + 1]
  : undefined;

assert(!process.argv.includes("--type") || requestedType, "--type requires a schema type");

const errors = [];
const warnings = [];
const supportedTypes = new Set(["Organization", "FinancialService", "FAQPage", "BreadcrumbList", "Service"]);
const prohibitedFields = new Set([
  "aggregateRating",
  "annualPercentageRate",
  "award",
  "feesAndCommissionsSpecification",
  "hasCredential",
  "interestRate",
  "license",
  "review",
  "reviewRating",
]);
const prohibitedClaims = /\b(?:best|fastest|leading|lowest|competitive)\b/i;

function addError(schema, message) {
  errors.push(`${schema["@type"]}${schema["@id"] ? ` ${schema["@id"]}` : ""}: ${message}`);
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function walkClaims(schema, value, path = "$") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkClaims(schema, item, `${path}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (prohibitedFields.has(key)) addError(schema, `unverified regulated/rating field at ${path}.${key}`);
      walkClaims(schema, child, `${path}.${key}`);
    }
    return;
  }
  if (typeof value === "string" && prohibitedClaims.test(value)) {
    addError(schema, `prohibited comparative or superlative at ${path}`);
  }
}

function validateAddress(schema, address) {
  if (!address || typeof address !== "object") return addError(schema, "address must be a PostalAddress");
  if (address["@type"] !== "PostalAddress") addError(schema, "address.@type must be PostalAddress");
  for (const field of ["streetAddress", "addressLocality", "addressCountry"]) {
    if (!address[field]) addError(schema, `address.${field} is required`);
  }
}

function validateCommon(schema) {
  if (schema["@context"] !== "https://schema.org") addError(schema, "@context must be https://schema.org");
  if (!supportedTypes.has(schema["@type"])) addError(schema, `unsupported @type ${schema["@type"] ?? "(missing)"}`);
  if (schema["@id"] && !isHttpsUrl(schema["@id"])) addError(schema, "@id must be an absolute HTTPS URL");
  walkClaims(schema, schema);
}

function validateOrganization(schema) {
  for (const field of ["name", "legalName", "url", "logo", "telephone", "email", "contactPoint", "address"]) {
    if (!schema[field] || (Array.isArray(schema[field]) && schema[field].length === 0)) addError(schema, `${field} is required`);
  }
  if (schema.url && !isHttpsUrl(schema.url)) addError(schema, "url must be an absolute HTTPS URL");
  if (!schema.logo || schema.logo["@type"] !== "ImageObject" || !isHttpsUrl(schema.logo.url)) {
    addError(schema, "logo must be an ImageObject with an absolute HTTPS URL");
  }
  validateAddress(schema, schema.address);
  for (const point of schema.contactPoint ?? []) {
    if (point["@type"] !== "ContactPoint" || !point.telephone || !point.contactType) {
      addError(schema, "each contactPoint requires @type ContactPoint, telephone, and contactType");
    }
  }
  if (!schema.sameAs) {
    const todo = schemaVerificationTodos.find((item) => item.includes("sameAs"));
    if (!todo) addError(schema, "missing sameAs requires a TODO(clarks-verify) record");
    else warnings.push(todo);
  }
}

function validateFinancialService(schema) {
  for (const field of ["name", "url", "image", "parentOrganization", "telephone", "email", "address", "openingHoursSpecification", "areaServed"]) {
    if (!schema[field]) addError(schema, `${field} is required`);
  }
  if (schema.url && !isHttpsUrl(schema.url)) addError(schema, "url must be an absolute HTTPS URL");
  if (schema.image && !isHttpsUrl(schema.image)) addError(schema, "image must be an absolute HTTPS URL");
  if (schema.parentOrganization?.["@id"] !== "https://www.clarksfinancials.com/#organization") {
    addError(schema, "parentOrganization must reference the Organization @id");
  }
  validateAddress(schema, schema.address);
  const hours = schema.openingHoursSpecification;
  if (hours?.["@type"] !== "OpeningHoursSpecification" || !hours.opens || !hours.closes) {
    addError(schema, "openingHoursSpecification requires @type, opens, and closes");
  }
  if (!Array.isArray(hours?.dayOfWeek) || hours.dayOfWeek.length === 0) {
    addError(schema, "openingHoursSpecification.dayOfWeek must list business days");
  }
  if (schema.areaServed?.["@type"] !== "Country" || !schema.areaServed.name) {
    addError(schema, "areaServed must be a named Country");
  }
}

function validateSchema(schema) {
  validateCommon(schema);
  if (schema["@type"] === "Organization") validateOrganization(schema);
  if (schema["@type"] === "FinancialService") validateFinancialService(schema);
}

const appSource = await readFile(resolve(ROOT, "src/App.tsx"), "utf8");
if (!appSource.includes("<RouteStructuredData")) errors.push("src/App.tsx does not render RouteStructuredData");

const selected = requestedType ? allSchemas.filter((schema) => schema["@type"] === requestedType) : allSchemas;
if (selected.length === 0) errors.push(`No ${requestedType ?? "supported"} schema found`);
selected.forEach(validateSchema);

if (selected.some((schema) => schema["@type"] === "Organization")) {
  await access(resolve(ROOT, "public/logo-2-orgnal.jpg")).catch(() => errors.push("Organization logo asset is missing"));
  if (!schemasForRoute("/").some((schema) => schema["@type"] === "Organization")) {
    errors.push("Organization schema is not assigned to the home route");
  }
}

if (selected.some((schema) => schema["@type"] === "FinancialService")
  && !schemasForRoute("/contact").some((schema) => schema["@type"] === "FinancialService")) {
  errors.push("FinancialService schema is not assigned to the contact route");
}

for (const warning of [...new Set(warnings)]) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

if (errors.length > 0) {
  console.error(`Schema validation failed: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}

console.log(`Schema validation passed: ${selected.length} ${requestedType ?? "total"} schema block(s), zero errors, ${warnings.length} warning(s).`);
