import React, { useEffect } from 'react';

interface DisqusPageConfig {
  url?: string;
  identifier?: string;
}

declare global {
  interface Window {
    disqus_config?: (this: { page: DisqusPageConfig }) => void;
    DISQUS?: {
      reset: (options: { reload: boolean; config?: (this: { page: DisqusPageConfig }) => void }) => void;
    };
  }
}

export const DisqusComments: React.FC = () => {
  useEffect(() => {
    const disqusShortname = 'countrylens';
    const canonicalUrl = 'https://problemset2.vercel.app/';
    const identifier = 'home';

    window.disqus_config = function (this: { page: DisqusPageConfig }) {
      this.page.url = canonicalUrl;
      this.page.identifier = identifier;
    };

    const scriptId = 'disqus-embed-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://${disqusShortname}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', (+new Date()).toString());
      script.async = true;
      (document.head || document.body).appendChild(script);
    } else if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function (this: { page: DisqusPageConfig }) {
          this.page.url = canonicalUrl;
          this.page.identifier = identifier;
        },
      });
    }
  }, []);

  return (
    <section aria-labelledby="feedback-heading" className="mt-8 pt-8 border-t border-slate-200">
      <div className="mb-4">
        <h2 id="feedback-heading" className="text-lg font-bold text-[#142D4E]">
          Community Feedback
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Tell us what worked for you and what did not.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 min-h-[160px]">
        <div id="disqus_thread" />
        <noscript>
          Please enable JavaScript to view the{' '}
          <a href="https://disqus.com/?ref_noscript" className="text-teal-700 underline">
            comments powered by Disqus.
          </a>
        </noscript>
      </div>
    </section>
  );
};
