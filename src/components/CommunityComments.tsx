import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2, User, Mail, Apple, Globe } from 'lucide-react';

export interface CommentItem {
  id: string;
  authorName: string;
  authorEmail: string;
  provider: string;
  content: string;
  createdAt: string;
}

export const CommunityComments: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authProvider, setAuthProvider] = useState<'email' | 'apple' | 'google' | 'other'>('email');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Load comments
  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/comments');
      if (!res.ok) throw new Error('Failed to load comments');
      const data = await res.json();
      setComments(data.comments || []);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not fetch comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!authorName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!authorEmail.trim() || !authorEmail.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!content.trim()) {
      setFormError('Please write your comment before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim(),
          provider: authProvider,
          content: content.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit comment');
      }

      // Add to comments list
      if (data.comment) {
        setComments((prev) => [data.comment, ...prev]);
      }
      setContent('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimestamp = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section aria-labelledby="feedback-heading" className="mt-8 pt-8 border-t border-slate-200">
      <div className="mb-6">
        <h2 id="feedback-heading" className="text-xl font-bold text-[#142D4E] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-teal-700" />
          Community Feedback
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Tell us what worked for you and what did not. Leave a comment or read what others have shared.
        </p>
      </div>

      {/* Comment Submission Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
          Leave a Comment
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Identity & Account type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="commenter-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name / Display Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="commenter-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Wong"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="commenter-email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="commenter-email"
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Account provider badge selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Signing in / Posting with:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setAuthProvider('email')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  authProvider === 'email'
                    ? 'bg-teal-50 border-teal-600 text-teal-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                Email Account
              </button>

              <button
                type="button"
                onClick={() => setAuthProvider('apple')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  authProvider === 'apple'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                Apple ID
              </button>

              <button
                type="button"
                onClick={() => setAuthProvider('google')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  authProvider === 'google'
                    ? 'bg-blue-50 border-blue-600 text-blue-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Google Account
              </button>

              <button
                type="button"
                onClick={() => setAuthProvider('other')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  authProvider === 'other'
                    ? 'bg-purple-50 border-purple-600 text-purple-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Other / Student ID
              </button>
            </div>
          </div>

          {/* Comment text box */}
          <div>
            <label htmlFor="comment-content" className="block text-xs font-semibold text-slate-700 mb-1">
              Feedback / Comment <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="comment-content"
              rows={3}
              required
              maxLength={1000}
              placeholder="What worked well for you? What features or adjustments should be improved?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 bg-white"
            />
            <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
              <span>Your email will remain private and is only used to verify your post.</span>
              <span>{content.length}/1000</span>
            </div>
          </div>

          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-medium">
              {formError}
            </div>
          )}

          {submitSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              Thank you! Your feedback has been posted below.
            </div>
          )}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-[#0F766E] hover:bg-[#0d655e] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F766E]"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Posting comment...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
            Discussion ({comments.length})
          </h3>
          <button
            type="button"
            onClick={fetchComments}
            className="text-xs text-teal-700 hover:text-teal-900 font-medium underline"
          >
            Refresh comments
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
            Loading comments...
          </div>
        ) : error ? (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            {error}
          </div>
        ) : comments.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
            No comments yet. Be the first to share your feedback!
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                      {item.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-slate-900">
                          {item.authorName}
                        </span>
                        {item.provider === 'apple' && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                            <Apple className="w-2.5 h-2.5" /> Apple ID
                          </span>
                        )}
                        {item.provider === 'google' && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            <Globe className="w-2.5 h-2.5" /> Google
                          </span>
                        )}
                        {item.provider === 'email' && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-100">
                            <Mail className="w-2.5 h-2.5" /> Verified Email
                          </span>
                        )}
                      </div>
                      <time className="text-xs text-slate-400 block mt-0.5">
                        {formatTimestamp(item.createdAt)}
                      </time>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line pl-10">
                  {item.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
