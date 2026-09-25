import React from 'react';
import { Country, CatalogStatus } from '../types';
import { CountrySelect } from './CountrySelect';
import {
  ArrowLeftRight,
  AlertCircle,
  RefreshCw,
  Calendar,
  ChevronDown,
  TrendingUp,
} from 'lucide-react';

interface ComparisonFormProps {
  countries: Country[];
  catalogStatus: CatalogStatus;
  catalogError: string | null;
  onRetryCatalog: () => void;
  years: number[];
  countryA: string;
  countryB: string;
  year: number;
  isLoading: boolean;
  onCountryAChange: (val: string) => void;
  onCountryBChange: (val: string) => void;
  onYearChange: (val: number) => void;
  onSwapCountries: () => void;
  onSubmit: () => void;
}

export function ComparisonForm({
  countries,
  catalogStatus,
  catalogError,
  onRetryCatalog,
  years,
  countryA,
  countryB,
  year,
  isLoading,
  onCountryAChange,
  onCountryBChange,
  onYearChange,
  onSwapCountries,
  onSubmit,
}: ComparisonFormProps) {
  const isSameCountry = countryA === countryB;
  const isCatalogLoading = catalogStatus === 'loading';
  const isCatalogError = catalogStatus === 'error';

  return (
    <section
      id="comparison-form-section"
      className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)] transition-shadow"
      aria-label="Country and year comparison form"
    >
      {/* Form Section Header */}
      <div className="mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Compare Two Countries or Economies
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select Country A, Country B, and the observation year to compute macroeconomic disparity.
          </p>
        </div>
      </div>

      {/* Catalogue Loading Banner */}
      {isCatalogLoading && (
        <div
          id="catalog-loading-banner"
          className="mb-4 p-3 bg-blue-50/60 border border-blue-200/80 rounded-lg text-xs text-blue-800 flex items-center gap-2"
        >
          <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
          <span>Synchronizing official World Bank country records…</span>
        </div>
      )}

      {/* Catalogue Error Banner with Retry */}
      {isCatalogError && (
        <div
          id="catalog-error-banner"
          className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          role="alert"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              {catalogError || 'Unable to retrieve country catalogue from World Bank.'}
            </span>
          </div>
          <button
            type="button"
            id="retry-catalog-btn"
            onClick={onRetryCatalog}
            className="px-2.5 py-1 bg-white border border-rose-300 rounded text-xs font-semibold text-rose-700 hover:bg-rose-100/50 transition flex items-center gap-1 cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry catalogue</span>
          </button>
        </div>
      )}

      <form
        id="compare-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!isSameCountry && !isLoading && !isCatalogLoading && !isCatalogError) {
            onSubmit();
          }
        }}
        className="space-y-5"
      >
        {/* Tier 1: Two Countries & Swap Button */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3.5 items-end">
          {/* Country A */}
          <div id="country-a-container" className="w-full">
            <CountrySelect
              id="country-a-select"
              label="Country / Economy A"
              value={countryA}
              disabledCountryCode={countryB}
              disabledCountryLabel="Country B"
              countries={countries}
              variant="countryA"
              disabled={isCatalogLoading || isLoading}
              onChange={onCountryAChange}
            />
          </div>

          {/* Swap Button */}
          <div
            id="swap-container"
            className="flex items-center justify-center pb-1"
          >
            <button
              type="button"
              id="swap-countries-btn"
              onClick={onSwapCountries}
              disabled={isLoading || isCatalogLoading}
              title="Swap Country A and Country B"
              aria-label="Swap Country A and Country B"
              className="min-h-[44px] w-full md:w-[44px] flex items-center justify-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 shadow-2xs"
            >
              <ArrowLeftRight className="w-4 h-4 text-slate-600" />
              <span className="md:hidden text-xs font-semibold">Swap countries</span>
            </button>
          </div>

          {/* Country B */}
          <div id="country-b-container" className="w-full">
            <CountrySelect
              id="country-b-select"
              label="Country / Economy B"
              value={countryB}
              disabledCountryCode={countryA}
              disabledCountryLabel="Country A"
              countries={countries}
              variant="countryB"
              disabled={isCatalogLoading || isLoading}
              onChange={onCountryBChange}
            />
          </div>
        </div>

        {/* Tier 2: Year Selector & Execute Button */}
        <div
          id="action-bar-container"
          className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-end gap-3.5 sm:gap-4"
        >
          {/* Observation Year */}
          <div id="year-container" className="w-full sm:w-56 md:w-64 shrink-0">
            <label
              htmlFor="year-select"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Observation Year</span>
              <span className="text-[10px] font-normal text-slate-500 normal-case ml-auto font-mono">
                1950 – 2025
              </span>
            </label>
            <div className="relative">
              <select
                id="year-select"
                value={year}
                disabled={isLoading || isCatalogLoading}
                onChange={(e) => onYearChange(Number(e.target.value))}
                className="w-full min-h-[46px] bg-slate-50/50 hover:bg-white border border-slate-300 hover:border-slate-400 focus:border-blue-600 rounded-lg px-3.5 py-2.5 text-base font-semibold text-slate-900 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 appearance-none pr-10 cursor-pointer disabled:opacity-50 transition-colors font-mono"
              >
                {years.map((y) => (
                  <option key={y} value={y} className="font-normal text-slate-900 py-1">
                    {y} {y === 2025 ? '(Latest)' : ''}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-600">
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div id="submit-container" className="flex-1 w-full">
            <label
              className="hidden sm:block text-xs font-bold uppercase tracking-wider text-transparent mb-1.5 select-none"
              aria-hidden="true"
            >
              Action
            </label>
            <button
              type="submit"
              id="compare-button"
              disabled={isSameCountry || isLoading || isCatalogLoading || isCatalogError}
              className="w-full min-h-[46px] px-6 py-2.5 rounded-lg font-bold text-sm sm:text-base tracking-wide text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 border border-slate-900 shadow-sm hover:shadow-md transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 flex items-center justify-center gap-2 cursor-pointer group"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>Fetching World Bank data…</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-blue-300 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Compare GDP Per Capita</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Inline validation message */}
        {isSameCountry && (
          <div
            id="validation-same-country-alert"
            className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-sm text-amber-800 bg-amber-50/70 p-3 rounded-lg border border-amber-200"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Choose two different countries or economies to compare.</span>
          </div>
        )}
      </form>
    </section>
  );
}
