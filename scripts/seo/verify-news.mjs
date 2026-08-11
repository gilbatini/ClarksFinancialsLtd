#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { newsArticles } from "../../src/content/news.mjs";
import { assert, ROOT } from "./lib.mjs";

const TODAY = new Date("2026-08-11T23:59:59Z");
const OLDEST_ALLOWED = new Date("2025-02-11T00:00:00Z");
const failures = [];
const seen = {
  slug: new Set(),
  title: new Set(),
  sourceUrl: new Set(),
};

function words(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

assert(newsArticles.length === 30, `Expected exactly 30 news articles, found ${newsArticles.length}`);

for (const [index, article] of newsArticles.entries()) {
  const label = `article ${index + 1}`;
  for (const field of ["slug", "title", "sourceName", "sourceUrl", "publishedDate", "category", "dek", "summary", "relevance"]) {
    if (!article[field]?.trim()) failures.push(`${label}: missing ${field}`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) failures.push(`${label}: invalid slug`);
  if (article.title.length > 75) failures.push(`${label}: title exceeds 75 characters`);
  if (article.dek.length > 150) failures.push(`${label}: dek exceeds 150 characters`);
  if (words(article.summary) < 90 || words(article.summary) > 170) {
    failures.push(`${label}: summary must contain 90-170 words (found ${words(article.summary)})`);
  }
  if (words(article.relevance) < 30 || words(article.relevance) > 80) {
    failures.push(`${label}: relevance must contain 30-80 words (found ${words(article.relevance)})`);
  }
  if (!Array.isArray(article.keyFacts) || article.keyFacts.length < 2 || article.keyFacts.length > 4) {
    failures.push(`${label}: keyFacts must contain 2-4 items`);
  }

  let sourceUrl;
  try {
    sourceUrl = new URL(article.sourceUrl);
  } catch {
    failures.push(`${label}: invalid source URL`);
  }
  if (sourceUrl?.protocol !== "https:") failures.push(`${label}: source URL must use HTTPS`);

  const published = new Date(`${article.publishedDate}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.publishedDate) || Number.isNaN(published.valueOf())) {
    failures.push(`${label}: invalid publication date`);
  } else {
    if (published > TODAY) failures.push(`${label}: publication date is in the future`);
    if (published < OLDEST_ALLOWED) failures.push(`${label}: publication is older than 18 months`);
  }

  for (const field of ["slug", "title", "sourceUrl"]) {
    if (seen[field].has(article[field])) failures.push(`${label}: duplicate ${field}`);
    seen[field].add(article[field]);
  }
}

const chronological = [...newsArticles].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
if (newsArticles.some((article, index) => article.slug !== chronological[index].slug)) {
  failures.push("newsArticles must be sorted newest first");
}

const html = await readFile(resolve(ROOT, "dist/news/index.html"), "utf8");
const renderedArticles = html.match(/<article\b/g) ?? [];
const renderedSources = html.match(/Read original source ·/g) ?? [];
if (renderedArticles.length !== 30) failures.push(`rendered /news contains ${renderedArticles.length} article elements`);
if (renderedSources.length !== 30) failures.push(`rendered /news contains ${renderedSources.length} source links`);
if (!html.includes("do not constitute financial advice")) failures.push("rendered /news is missing its educational-content disclaimer");

assert(failures.length === 0, `News verification failed:\n${failures.join("\n")}`);
console.log("PASS NEWS: 30 unique, recent, source-linked financial briefs render in chronological order");
