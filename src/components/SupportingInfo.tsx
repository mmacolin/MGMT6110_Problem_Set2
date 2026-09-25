import React from 'react';
import { Info, ExternalLink, HelpCircle } from 'lucide-react';

export function SupportingInfo() {
  return (
    <section
      id="supporting-info-section"
      className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(15,23_42,0.06)] text-xs sm:text-sm text-slate-600 space-y-3"
      aria-labelledby="methodology-heading"
    >
      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
        <HelpCircle className="w-4 h-4 text-blue-600" />
        <h3 id="methodology-heading">Methodology & Indicator Definition</h3>
      </div>

      <p className="leading-relaxed">
        <strong>Gross Domestic Product (GDP) per capita</strong> is gross domestic product divided by
        midyear population. It quantifies the average economic production per resident in a given country
        or territory. Figures are converted into current U.S. dollars using single-year official exchange
        rates.
      </p>

      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
        <p className="font-semibold text-slate-800 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Important Context:</span>
        </p>
        <p>
          GDP per capita is an aggregate macroeconomic output metric. It is <strong>not</strong> an
          average worker salary, median household income, or a measure of domestic cost of living (PPP).
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">World Bank Indicator:</span>
          <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono font-semibold text-xs border border-slate-200">
            NY.GDP.PCAP.CD
          </code>
        </div>

        <a
          id="world-bank-indicator-link"
          href="https://data.worldbank.org/indicator/NY.GDP.PCAP.CD"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
        >
          <span>View indicator methodology on World Bank Open Data</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
