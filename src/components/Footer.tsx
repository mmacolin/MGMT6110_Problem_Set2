import React from 'react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="mt-12 pt-8 pb-10 border-t border-slate-200/80 text-xs text-slate-500 leading-relaxed">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
        <Logo size="sm" showTagline={false} />
        <p className="text-slate-400 text-[11px]">
          Macroeconomic data courtesy of the World Bank World Development Indicators
        </p>
      </div>
      <p>
        This page uses Microsoft Clarity and Disqus, which use cookies to record how visitors use the
        site and to host comments. By using this page you agree that we and Microsoft may collect and use
        this data. See the{' '}
        <a
          href="https://www.microsoft.com/privacy/privacystatement"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
        >
          Microsoft Privacy Statement
        </a>
        , the{' '}
        <a
          href="https://disqus.com/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
        >
          Disqus privacy policy
        </a>{' '}
        and the{' '}
        <a
          href="https://disqus.com/data-sharing-settings/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
        >
          Disqus data sharing settings
        </a>
        .
      </p>
    </footer>
  );
}
