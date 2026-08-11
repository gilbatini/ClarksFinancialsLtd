import { ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import CTA from "../components/CTA";
import { newsArticles } from "../content/news.mjs";

const dateFormatter = new Intl.DateTimeFormat("en-UG", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function News() {
  return (
    <div className="pt-20">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-10" />
        <div className="container mx-auto px-8 relative z-10 max-w-6xl">
          <div className="flex items-center gap-3 text-secondary font-bold uppercase tracking-widest mb-5">
            <Newspaper className="w-5 h-5" aria-hidden="true" />
            Financial news desk
          </div>
          <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            NEWS THAT<br />MOVES MONEY.
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-3xl leading-relaxed">
            Thirty source-linked updates on Uganda, African finance, digital credit, consumer protection, and the wider economy—explained in plain language.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface-50 deferred-section" aria-labelledby="latest-news">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="max-w-3xl mb-12">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Curated and checked</p>
            <h2 id="latest-news" className="font-headline text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight mb-5">
              Latest financial updates
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Each brief links to its original publisher. These summaries are educational and do not constitute financial advice, a product offer, or a statement about Clarks Financials’ regulatory status.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {newsArticles.map((article, index) => (
              <article
                id={article.slug}
                key={article.slug}
                className="bg-white border border-surface-200 p-7 md:p-9 shadow-sm flex flex-col"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">
                  <span className="text-primary">{article.category}</span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" aria-hidden="true" />
                    <time dateTime={article.publishedDate}>
                      {dateFormatter.format(new Date(`${article.publishedDate}T00:00:00Z`))}
                    </time>
                  </span>
                  <span>Brief {String(index + 1).padStart(2, "0")}</span>
                </div>

                <h3 className="font-headline text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tight leading-tight mb-4">
                  {article.title}
                </h3>
                <p className="text-primary font-bold leading-relaxed mb-5">{article.dek}</p>
                <p className="text-slate-600 leading-relaxed mb-6">{article.summary}</p>

                <div className="border-l-4 border-secondary bg-surface-50 p-5 mb-6">
                  <h4 className="font-headline text-sm font-black uppercase tracking-widest text-slate-950 mb-2">
                    Why this matters
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{article.relevance}</p>
                </div>

                <ul className="space-y-2 text-sm text-slate-600 mb-7 list-disc pl-5">
                  {article.keyFacts.map((fact) => <li key={fact}>{fact}</li>)}
                </ul>

                <a
                  className="mt-auto inline-flex items-center gap-2 font-bold text-primary hover:text-slate-950 transition-colors"
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Read the original ${article.sourceName} source for ${article.title}`}
                >
                  Read original source · {article.sourceName}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
