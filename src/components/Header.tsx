import React from 'react';
import { Logo } from './Logo';
import { Database } from 'lucide-react';

export function Header() {
  return (
    <header
      id="app-header"
      className="pb-6 mb-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      {/* Zone 1: Brand Logo & Wordmark */}
      <div className="flex items-center gap-3">
        <a href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg">
          <Logo size="md" showTagline={true} />
        </a>
      </div>

      {/* Zone 2: Section Navigation Links */}
      <nav aria-label="Page navigation" className="flex items-center gap-4 text-xs font-semibold text-slate-600">
        <a
          href="#comparison-form-section"
          className="hover:text-blue-600 transition-colors py-1 focus-visible:outline-none focus-visible:underline"
        >
          Compare
        </a>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <a
          href="#supporting-info-section"
          className="hover:text-blue-600 transition-colors py-1 focus-visible:outline-none focus-visible:underline"
        >
          Methodology
        </a>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <a
          href="#community-feedback"
          className="hover:text-blue-600 transition-colors py-1 focus-visible:outline-none focus-visible:underline"
        >
          Feedback
        </a>
      </nav>

      {/* Zone 3: Provenance Trust Marker */}
      <div className="flex items-center gap-2">
        <div
          id="data-indicator-badge"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs"
        >
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span>World Bank WDI · Current US$</span>
        </div>
      </div>
    </header>
  );
}
