import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';

interface DisqusPageConfig {
  url?: string;
  identifier?: string;
  title?: string;
}

declare global {
  interface Window {
    disqus_config?: (this: {
      page: DisqusPageConfig;
      callbacks: { onReady?: Array<() => void> };
    }) => void;
    DISQUS?: {
      reset: (options: { reload: boolean; config?: unknown }) => void;
    };
  }
}

const SCRIPT_ID = 'disqus-embed-script';

const loadEmbedScript = () => {
  if (document.getElementById(SCRIPT_ID)) {
    return;
  }
  const s = document.createElement('script');
  s.id = SCRIPT_ID;
  s.src = 'https://countrylens.disqus.com/embed.js';
  s.setAttribute('data-timestamp', String(Date.now()));
  s.async = true;
  (document.head || document.body).appendChild(s);
};

export const CommunityComments: React.FC = () => {
  const [showFallback, setShowFallback] = useState<boolean>(false);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const markLoaded = () => {
    setShowFallback(false);
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  const setupDisqusConfig = () => {
    window.disqus_config = function (this: {
      page: DisqusPageConfig;
      callbacks: { onReady?: Array<() => void> };
    }) {
      this.page.url = 'https://problemset2.vercel.app';
      this.page.identifier = 'home';
      this.callbacks = this.callbacks || {};
      this.callbacks.onReady = [() => markLoaded()];
    };
  };

  const handleRetry = () => {
    setShowFallback(false);
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }
    fallbackTimerRef.current = setTimeout(() => {
      const thread = document.getElementById('disqus_thread');
      if (!thread?.querySelector('iframe')) {
        setShowFallback(true);
      }
    }, 15000);

    setupDisqusConfig();

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
      loadEmbedScript();
    }
  };

  useEffect(() => {
    setupDisqusConfig();

    const thread = document.getElementById('disqus_thread');

    // 1) Check if iframe is already present
    if (thread?.querySelector('iframe')) {
      markLoaded();
    }

    // 2) MutationObserver to detect iframe insertion immediately
    let observer: MutationObserver | null = null;
    if (thread) {
      observer = new MutationObserver(() => {
        if (thread.querySelector('iframe')) {
          markLoaded();
        }
      });
      observer.observe(thread, { childList: true, subtree: true });
    }

    // 3) Short interval polling check as backup
    const intervalId = setInterval(() => {
      const el = document.getElementById('disqus_thread');
      if (el?.querySelector('iframe')) {
        markLoaded();
      }
    }, 300);

    // 4) Set 15-second fallback timer
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }
    fallbackTimerRef.current = setTimeout(() => {
      const el = document.getElementById('disqus_thread');
      if (!el?.querySelector('iframe')) {
        setShowFallback(true);
      }
    }, 15000);

    // 5) Initialize Disqus: reset if window.DISQUS already exists, otherwise load embed.js once
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
      loadEmbedScript();
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      clearInterval(intervalId);
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="community-feedback"
      aria-labelledby="community-feedback-heading"
      className="mt-10"
    >
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 sm:p-6 transition-shadow">
        {/* Section Heading */}
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

        {/* Blue message callout */}
        <div className="bg-blue-50/70 border-l-4 border-blue-600 rounded-r-lg py-3 px-4 mb-5 text-center">
          <p className="text-sm font-semibold text-slate-800 tracking-tight">
            Please share your feedback below on what worked for you and what didn't!
          </p>
        </div>

        {/* Disqus Thread Container - ALWAYS rendered and visible, no fixed empty height */}
        <div className="w-full">
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

        {/* Fallback Message: shown ONLY below #disqus_thread if neither onReady nor iframe appears within 15s */}
        {showFallback && (
          <div
            role="alert"
            className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">Unable to load the Disqus comments thread</p>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  Disqus took longer than expected to load or was blocked by browser privacy settings. You can click Retry below or participate directly in the discussion.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleRetry}
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
      </div>
    </section>
  );
};

export const DisqusComments = CommunityComments;
export default CommunityComments;
