import React, { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';

interface DisqusPageConfig {
  url?: string;
  identifier?: string;
  title?: string;
}

declare global {
  interface Window {
    disqus_config?: (this: { page: DisqusPageConfig }) => void;
    DISQUS?: {
      reset: (options: { reload: boolean; config?: (this: { page: DisqusPageConfig }) => void }) => void;
    };
  }
}

export const CommunityComments: React.FC = () => {
  const [loadError, setLoadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadDisqus = () => {
    setLoadError(false);
    setErrorMessage(null);

    const disqusShortname = 'countrylens';
    const canonicalUrl = 'https://problemset2.vercel.app/';
    const identifier = 'countrylens-home';
    const pageTitle = 'CountryLens - Compare GDP Per Capita';

    window.disqus_config = function (this: { page: DisqusPageConfig }) {
      this.page.url = canonicalUrl;
      this.page.identifier = identifier;
      this.page.title = pageTitle;
    };

    const scriptId = 'disqus-embed-script';
    const existingScript = document.getElementById(scriptId);

    // If DISQUS is already present on the window, call reset to bind to the current DOM thread element
    if (window.DISQUS) {
      try {
        window.DISQUS.reset({
          reload: true,
          config: window.disqus_config,
        });
      } catch (err) {
        console.warn('Disqus reset error:', err);
        setLoadError(true);
        setErrorMessage('Failed to reinitialize Disqus. Click retry or check if your browser blocks third-party frames.');
      }
      return;
    }

    // If script tag already exists in DOM but window.DISQUS isn't ready yet, remove stale script
    if (existingScript) {
      existingScript.remove();
    }

    try {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://${disqusShortname}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', String(Date.now()));
      script.async = true;
      script.crossOrigin = 'anonymous';

      script.onerror = (e) => {
        console.warn('Disqus script failed to load:', e);
        setLoadError(true);
        setErrorMessage(
          'Could not load the Disqus script. This usually happens when an ad blocker, Brave Shields, or privacy extension blocks third-party trackers, or when third-party cookies are disabled.'
        );
      };

      (document.head || document.body).appendChild(script);
    } catch (err) {
      console.warn('Could not inject Disqus script:', err);
      setLoadError(true);
      setErrorMessage('Could not insert the Disqus script tag into the document.');
    }
  };

  useEffect(() => {
    loadDisqus();
  }, []);

  return (
    <section
      id="community-feedback"
      aria-labelledby="community-feedback-heading"
      className="mt-10"
    >
      {/* Outer Card with clean rounded border and subtle shadow */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 sm:p-6 transition-shadow">
        
        {/* Section Heading & Friendly Invitation */}
        <div className="mb-4">
          <h2
            id="community-feedback-heading"
            className="text-xl font-bold tracking-tight text-[#142D4E]"
          >
            Community Feedback
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            We’d love to hear your thoughts, data insights, or suggestions. Share your feedback below!
          </p>
        </div>

        {/* Prompt callout banner with blue left border accent */}
        <div className="bg-blue-50/70 border-l-4 border-blue-600 rounded-r-lg py-3 px-4 mb-5 text-center">
          <p className="text-sm font-semibold text-slate-800 tracking-tight">
            Please share your feedback below on what worked for you and what didn't!
          </p>
        </div>

        {/* Error Fallback Banner if Disqus fails to load */}
        {loadError && (
          <div
            role="alert"
            className="mb-5 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">Unable to load the Disqus comments thread</p>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  {errorMessage ||
                    'Disqus was blocked or unable to reach its servers. If you use an ad-blocker or Brave Shields, please whitelist this page.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={loadDisqus}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
              <a
                href="https://countrylens.disqus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-medium hover:bg-amber-100 transition-colors"
              >
                Open Forum <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Official Disqus Embed Container */}
        <div className="min-h-[300px] w-full">
          <div id="disqus_thread" className="w-full"></div>
          <noscript>
            <p className="text-sm text-slate-500 py-4">
              Please enable JavaScript to view the{' '}
              <a
                href="https://disqus.com/?ref_noscript"
                className="text-teal-700 underline font-medium"
              >
                comments powered by Disqus.
              </a>
            </p>
          </noscript>
        </div>
      </div>
    </section>
  );
};

// Also export as DisqusComments for backward compatibility
export const DisqusComments = CommunityComments;
export default CommunityComments;
