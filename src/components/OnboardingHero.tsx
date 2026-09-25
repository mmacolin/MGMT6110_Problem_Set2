import React from 'react';
import { Globe, Calendar, ArrowRightLeft, Sparkles, TrendingUp } from 'lucide-react';

export interface ComparisonPreset {
  id: string;
  nameA: string;
  codeA: string;
  flagA: string;
  nameB: string;
  codeB: string;
  flagB: string;
  year: number;
  label: string;
  description: string;
}

export const COMPARISON_PRESETS: ComparisonPreset[] = [
  {
    id: 'sg-kh',
    nameA: 'Cambodia',
    codeA: 'KH',
    flagA: '🇰🇭',
    nameB: 'Singapore',
    codeB: 'SG',
    flagB: '🇸🇬',
    year: 2023,
    label: 'ASEAN Contrast',
    description: 'Cambodia vs. Singapore (2023)',
  },
  {
    id: 'us-de',
    nameA: 'United States',
    codeA: 'US',
    flagA: '🇺🇸',
    nameB: 'Germany',
    codeB: 'DE',
    flagB: '🇩🇪',
    year: 2023,
    label: 'Transatlantic G7',
    description: 'United States vs. Germany (2023)',
  },
  {
    id: 'jp-kr',
    nameA: 'Japan',
    codeA: 'JP',
    flagA: '🇯🇵',
    nameB: 'Korea, Rep.',
    codeB: 'KR',
    flagB: '🇰🇷',
    year: 2023,
    label: 'East Asian Convergence',
    description: 'Japan vs. South Korea (2023)',
  },
  {
    id: 'no-gb',
    nameA: 'Norway',
    codeA: 'NO',
    flagA: '🇳🇴',
    nameB: 'United Kingdom',
    codeB: 'GB',
    flagB: '🇬🇧',
    year: 2023,
    label: 'North Sea Economies',
    description: 'Norway vs. United Kingdom (2023)',
  },
  {
    id: 'cn-in',
    nameA: 'China',
    codeA: 'CN',
    flagA: '🇨🇳',
    nameB: 'India',
    codeB: 'IN',
    flagB: '🇮🇳',
    year: 2023,
    label: 'Demographic Giants',
    description: 'China vs. India (2023)',
  },
];

interface OnboardingHeroProps {
  onSelectPreset: (countryA: string, countryB: string, year: number) => void;
  activePresetId?: string | null;
}

export const OnboardingHero: React.FC<OnboardingHeroProps> = ({
  onSelectPreset,
  activePresetId,
}) => {
  return (
    <section
      aria-label="Overview and quick start"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)] p-5 sm:p-7 relative overflow-hidden"
    >
      {/* Subtle top decorative accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500" />

      {/* Main explanation headline and subtitle */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Macroeconomic Intelligence Tool</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
          Compare Economic Output Per Person Across Global Economies
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          CountryLens pairs real-time World Bank Development Indicators to compute the historical
          GDP per capita gap between any two countries from <strong>1950 through 2025</strong> in
          current US Dollars.
        </p>
      </div>

      {/* 3-Step "How It Works" Visual Strip */}
      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
          <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
            1
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Select Any 2 Nations</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-normal">
              Choose from 200+ sovereign countries and regional economies.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
          <div className="w-8 h-8 rounded-lg bg-indigo-100/80 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-xs">
            2
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Pick Observation Year</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-normal">
              Explore 75 years of historical trajectory from 1950 to 2025.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
          <div className="w-8 h-8 rounded-lg bg-teal-100/80 text-teal-700 flex items-center justify-center shrink-0 font-bold text-xs">
            3
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
              <span>Analyze Multipliers</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-normal">
              View instant per-capita value, proportional ratio, and absolute gap.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Comparison Presets: 1-click start */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <ArrowRightLeft className="w-3 h-3 text-slate-400" />
            <span>Try a Curated Comparison</span>
          </span>
          <span className="text-[11px] text-slate-400">Click any preset to prefill</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {COMPARISON_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset.codeA, preset.codeB, preset.year)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-1'
                    : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>
                  {preset.flagA} {preset.nameA}
                </span>
                <span className="text-slate-400 font-mono text-[10px] mx-0.5">vs</span>
                <span>
                  {preset.flagB} {preset.nameB}
                </span>
                <span className={`text-[10px] font-mono px-1 rounded ${isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'}`}>
                  {preset.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
