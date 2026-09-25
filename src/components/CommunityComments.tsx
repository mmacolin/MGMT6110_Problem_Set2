import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, RefreshCw, AlertTriangle, Loader2 } from 'lucide-react';

interface DisqusPageConfig {
  url?: string;
  identifier?: string;
  title?: string;
}

declare global {
  interface Window {
    disqus_config?: (this: { page: DisqusPageConfig; callbacks?: { onReady?: Array<() => void> } }) => void;
    DISQUS?: {
      reset: (options: { reload: boolean; config?: (this: { page: DisqusPageConfig }) => void }) => void;
    };
  }
}

export const CommunityComments: React.FC = () => {
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadDisqus = () => {
    setLoadState('loading');
    setErrorMessage(null);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const disqusShortname = 'countrylens';
    const canonicalUrl = 'https://problemset2.vercel.app/';
    const identifier = 'countrylens-home';
    const pageTitle = 'CountryLens - Compare GDP Per Capita';

    // Official Disqus configuration
    window.disqus_config = function (this: {
      page: DisqusPageConfig;
      callbacks?: { onReady?: Array<() => void> };
    }) {
      this.page.url = canonicalUrl;
      this.page.identifier = identifier;
      this.page.title = pageTitle;
      this.callbacks = this.callbacks || {};
      this.callbacks.onReady = this.callbacks.onReady || [];
      this.callbacks.onReady.push(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setLoadState('ready');
      });
    };

    // If DISQUS is already on the window (from a previous load), reset with the new configuration
    if (window.DISQUS) {
      try {
        window.DISQUS.reset({
          reload: true,
          config: window.disqus_config,
        });
      } catch (err) {
        console.warn('Disqus reset error:', err);
      }
    } else {
      const scriptId = 'disqus-embed-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://${disqusShortname}.disqus.com/embed.js`;
        script.setAttribute('data-timestamp', String(Date.now()));
        script.async = true;

        script.onerror = (e) => {
          console.warn('Disqus script failed to load:', e);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setLoadState('error');
          setErrorMessage(
            'The Disqus embed script could not be loaded. This typically occurs when an ad blocker, Brave Shields, or privacy extension blocks third-party comments.'
          );
        };

        (document.head || document.body).appendChild(script);
      }
    }

    // Fallback: check DOM for iframe injection or onReady within 8 seconds
    // If the comments iframe hasn't rendered within 8s, display the friendly fallback card
    timeoutRef.current = setTimeout(() => {
      const thread = document.getElementById('disqus_thread');
      const hasIframe = thread && thread.querySelector('iframe');
      if (hasIframe) {
        setLoadState('ready');
      } else {
        setLoadState('error');
        setErrorMessage(
          'Disqus took too long to load or was blocked by browser privacy settings. You can click Retry below or participate directly in the discussion.'
        );
      }
    }, 8000);
  };

  useEffect(() => {
    loadDisqus();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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

        {/* Prompt callout banner with blue left border accent matching reference screenshot */}
        <div className="bg-blue-50/70 border-l-4 border-blue-600 rounded-r-lg py-3 px-4 mb-5 text-center">
          <p className="text-sm font-semibold text-slate-800 tracking-tight">
            Please share your feedback below on what worked for you and what didn't!
          </p>
        </div>

        {/* Loading Spinner Indicator while Disqus frame initializes */}
        {loadState === 'loading' && (
          <div className="flex flex-col items-center justify-center py-8 text-slate-500 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <p className="text-xs font-medium">Loading discussion thread...</p>
          </div>
        )}

        {/* Error Fallback Banner: shown if Disqus is blocked or fails to load within timeout */}
        {loadState === 'error' && (
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
        <div className={`w-full ${loadState === 'loading' ? 'min-h-[100px]' : ''}`}>
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
