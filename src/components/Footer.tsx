export function Footer() {
  return (
    <footer className="mt-12 pt-6 pb-8 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
      <p>
        This page uses Microsoft Clarity and Disqus, which use cookies to record how visitors use the
        site and to host comments. By using this page you agree that we and Microsoft may collect and use
        this data. See the{' '}
        <a
          href="https://www.microsoft.com/privacy/privacystatement"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-700 hover:text-teal-900 underline underline-offset-2"
        >
          Microsoft Privacy Statement
        </a>
        , the{' '}
        <a
          href="https://disqus.com/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-700 hover:text-teal-900 underline underline-offset-2"
        >
          Disqus privacy policy
        </a>{' '}
        and the{' '}
        <a
          href="https://disqus.com/data-sharing-settings/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-700 hover:text-teal-900 underline underline-offset-2"
        >
          Disqus data sharing settings
        </a>
        .
      </p>
    </footer>
  );
}
