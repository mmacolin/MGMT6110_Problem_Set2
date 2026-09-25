import React from 'react';
import { motion } from 'motion/react';
import { ComparisonStatus, ComparisonResult, StructuredError } from '../types';
import { getCountryFlag } from '../utils/flags';
import {
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Scale,
  Calendar,
} from 'lucide-react';

interface ResultsViewProps {
  status: ComparisonStatus;
  result: ComparisonResult | null;
  error: StructuredError | null;
  onRetry: () => void;
}

function formatRetrievedTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  } catch {
    return 'recently';
  }
}

export function ResultsView({ status, result, error, onRetry }: ResultsViewProps) {
  return (
    <section id="results-view-section" aria-live="polite" className="w-full">
      {/* 1. Initial State: Clear onboarding prompt */}
      {status === 'initial' && (
        <div
          id="initial-prompt-card"
          className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/90 text-center shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)] flex flex-col items-center justify-center min-h-[170px]"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-2xs">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1">
            Ready to Compare Economic Output
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed">
            Click <strong>“Compare GDP Per Capita”</strong> above or pick one of the curated presets to query the official World Bank database and view comparative multipliers.
          </p>
        </div>
      )}

      {/* 2. Loading State */}
      {status === 'loading' && (
        <div
          id="loading-skeleton-container"
          className="p-8 bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)] flex flex-col items-center justify-center min-h-[220px]"
        >
          <div className="w-10 h-10 border-3 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="font-bold text-slate-900 text-sm sm:text-base mb-1">
            Querying World Bank WDI API…
          </p>
          <p className="text-xs text-slate-500 font-mono">
            Indicator NY.GDP.PCAP.CD · Current US$
          </p>
        </div>
      )}

      {/* 3. Error Notice */}
      {status === 'error' && error && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          id="error-state-card"
          role="alert"
          className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950 mb-0.5">
                {error.code === 'PROVIDER_REFUSED' && 'Provider Refused'}
                {error.code === 'PROVIDER_UNREACHABLE' && 'Provider Unreachable'}
                {error.code === 'MALFORMED_RESPONSE' && 'Unexpected Provider Response'}
                {error.code === 'EMPTY_DATA' && 'Data Empty'}
                {error.code === 'INVALID_REQUEST' && 'Invalid Request'}
                {error.code === 'UNKNOWN_ERROR' && 'Request Notice'}
              </p>
              <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">{error.message}</p>
              {error.detail && (
                <p className="text-xs text-slate-500 mt-1 font-mono">{error.detail}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            id="retry-button"
            onClick={onRetry}
            className="self-start sm:self-center shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry request</span>
          </button>
        </motion.div>
      )}

      {/* 4. Compared Results Cards */}
      {status === 'compared' && result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Country A Card (Royal Blue Focus) */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              id="country-a-card"
              className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-blue-200/90 shadow-[0_2px_12px_-2px_rgba(37,99,235,0.08)] flex flex-col justify-between hover:border-blue-400 transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <div>
                <div className="flex items-center justify-between mb-2 pt-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="text-2xl leading-none shrink-0"
                      role="img"
                      aria-label={`${result.countryA.name} flag`}
                    >
                      {getCountryFlag(result.countryA.code)}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">
                      {result.countryA.name}
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md shrink-0">
                    Country A · {result.countryA.code}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Observation Year {result.year} · Nominal USD</span>
                </p>

                <div className="my-3">
                  {result.countryA.formatted ? (
                    <div>
                      <p className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight font-sans tabular-nums">
                        {result.countryA.formatted}
                      </p>
                      <p className="text-xs text-blue-700/80 font-medium mt-1">
                        Gross Domestic Product per person
                      </p>
                    </div>
                  ) : (
                    <div className="py-2">
                      <p className="text-base sm:text-lg font-medium text-slate-400 italic">
                        Data not reported
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        No reported value in World Bank database for {result.year}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{result.source}</span>
                <span>{result.indicator}</span>
              </div>
            </motion.div>

            {/* Country B Card (Deep Teal Focus) */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              id="country-b-card"
              className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-teal-200/90 shadow-[0_2px_12px_-2px_rgba(13,148,136,0.08)] flex flex-col justify-between hover:border-teal-400 transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-600 to-emerald-600" />
              <div>
                <div className="flex items-center justify-between mb-2 pt-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="text-2xl leading-none shrink-0"
                      role="img"
                      aria-label={`${result.countryB.name} flag`}
                    >
                      {getCountryFlag(result.countryB.code)}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">
                      {result.countryB.name}
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-md shrink-0">
                    Country B · {result.countryB.code}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Observation Year {result.year} · Nominal USD</span>
                </p>

                <div className="my-3">
                  {result.countryB.formatted ? (
                    <div>
                      <p className="text-3xl sm:text-4xl font-extrabold text-teal-900 tracking-tight font-sans tabular-nums">
                        {result.countryB.formatted}
                      </p>
                      <p className="text-xs text-teal-700/80 font-medium mt-1">
                        Gross Domestic Product per person
                      </p>
                    </div>
                  ) : (
                    <div className="py-2">
                      <p className="text-base sm:text-lg font-medium text-slate-400 italic">
                        Data not reported
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        No reported value in World Bank database for {result.year}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{result.source}</span>
                <span>{result.indicator}</span>
              </div>
            </motion.div>
          </div>

          {/* Comparative Ratio & Insight Banner */}
          {result.countryA.value !== null && result.countryB.value !== null ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              id="comparison-ratio-insight"
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)] text-xs sm:text-sm text-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Macroeconomic Ratio ({result.year})
                  </p>
                  <p className="text-slate-800 leading-normal">
                    <strong>{result.higherCountryName}</strong> produced{' '}
                    <strong className="text-blue-900 font-extrabold text-base tabular-nums">
                      {result.multiplier}×
                    </strong>{' '}
                    the economic output per capita of{' '}
                    {result.higherCountryName === result.countryA.name
                      ? result.countryB.name
                      : result.countryA.name}{' '}
                    (a difference of <strong className="tabular-nums font-semibold">{result.differenceFormatted}</strong>).
                  </p>
                </div>
              </div>

              {/* Proportional Segmented Visual Bar */}
              <div className="w-full md:w-64 flex flex-col gap-1.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 font-semibold">
                  <span className="text-blue-700">
                    {Math.round(
                      (result.countryA.value /
                        (result.countryA.value + result.countryB.value)) *
                        100
                    )}% {result.countryA.code}
                  </span>
                  <span className="text-teal-700">
                    {result.countryB.code} {Math.round(
                      (result.countryB.value /
                        (result.countryA.value + result.countryB.value)) *
                        100
                    )}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 transition-all duration-300"
                    style={{
                      width: `${Math.max(
                        5,
                        Math.min(
                          95,
                          (result.countryA.value /
                            (result.countryA.value + result.countryB.value)) *
                            100
                        )
                      )}%`,
                    }}
                    title={`${result.countryA.name}: ${result.countryA.formatted}`}
                  />
                  <div
                    className="bg-gradient-to-r from-teal-500 to-emerald-600 h-3 transition-all duration-300 flex-1"
                    title={`${result.countryB.name}: ${result.countryB.formatted}`}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <div
              id="missing-data-notice"
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
              <span>
                {result.countryA.value === null && result.countryB.value === null
                  ? `Neither ${result.countryA.name} nor ${result.countryB.name} has reported GDP per capita data for ${result.year}. Comparative ratios cannot be calculated.`
                  : result.countryA.value === null
                  ? `GDP per capita for ${result.countryA.name} is not reported for ${result.year}. Comparative ratio cannot be calculated.`
                  : `GDP per capita for ${result.countryB.name} is not reported for ${result.year}. Comparative ratio cannot be calculated.`}
              </span>
            </div>
          )}

          {/* Provenance Metadata Strip */}
          <div
            id="provenance-metadata"
            className="flex flex-wrap items-center justify-between text-xs text-slate-500 px-1 pt-1 gap-2"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>
                Observation Year: <strong className="text-slate-800 font-mono">{result.year}</strong> (Annual aggregate)
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>
                Retrieved at {formatRetrievedTime(result.retrievedAt)} via{' '}
                <a
                  href={result.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-700 inline-flex items-center gap-0.5 font-medium"
                >
                  World Bank WDI
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
