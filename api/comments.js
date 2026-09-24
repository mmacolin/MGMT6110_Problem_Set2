/**
 * CountryLens - Serverless API: /api/comments
 * In-memory & file-persisted community comments so visitors can submit feedback
 * and see everyone else's comments in real-time.
 */

import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'comments-data.json');

// Initial seed comments to demonstrate feedback from students and researchers
const INITIAL_COMMENTS = [
  {
    id: 'seed-1',
    authorName: 'Alex Tan',
    authorEmail: 'alex.tan@student.edu',
    provider: 'email',
    content: 'Very clean comparison tool! The instant difference calculation and flags make comparing ASEAN economies much faster than digging through raw World Bank tables.',
    createdAt: '2026-09-22T08:30:00.000Z',
  },
  {
    id: 'seed-2',
    authorName: 'Priya Mehta',
    authorEmail: 'priya.m@alumni.edu',
    provider: 'apple',
    content: 'I appreciate the explicit disclaimer clarifying that GDP per capita is not average income or cost of living. Crucial distinction for business school coursework.',
    createdAt: '2026-09-23T14:15:00.000Z',
  }
];

function readComments() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading comments file:', err);
  }
  return [...INITIAL_COMMENTS];
}

function saveComments(comments) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(comments, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing comments file:', err);
  }
}

let inMemoryComments = readComments();

export default async function handler(req, res) {
  // CORS & headers
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    return res.end(JSON.stringify({ comments: inMemoryComments }));
  }

  if (req.method === 'POST') {
    let bodyData = '';

    const handleBody = (bodyStr) => {
      try {
        const body = typeof bodyStr === 'object' ? bodyStr : JSON.parse(bodyStr || '{}');
        const { authorName, authorEmail, content, provider = 'email' } = body;

        if (!authorName || !authorName.trim()) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Name is required' }));
        }

        if (!authorEmail || !authorEmail.trim() || !authorEmail.includes('@')) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Valid email is required' }));
        }

        if (!content || !content.trim()) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Comment text cannot be empty' }));
        }

        if (content.trim().length > 1000) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Comment must be 1,000 characters or less' }));
        }

        const newComment = {
          id: 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim(),
          provider: provider.toLowerCase(),
          content: content.trim(),
          createdAt: new Date().toISOString(),
        };

        inMemoryComments = [newComment, ...inMemoryComments];
        saveComments(inMemoryComments);

        res.statusCode = 201;
        return res.end(JSON.stringify({ success: true, comment: newComment }));
      } catch {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Invalid JSON request payload' }));
      }
    };

    if (req.body) {
      return handleBody(req.body);
    }

    req.on('data', (chunk) => {
      bodyData += chunk;
    });

    req.on('end', () => {
      handleBody(bodyData);
    });

    return;
  }

  res.statusCode = 405;
  return res.end(JSON.stringify({ error: 'Method not allowed' }));
}
