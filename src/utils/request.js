const fetch = require('node-fetch');

/**
 * Request URL
 *
 * @param ratelimiter
 * @param {Object} options Options
 * @param {string} options.url URL
 * @param {Object} [options.qs] Query parameters
 * @param {Object} [options.body] Body
 * @param {Object} [options.headers] Headers
 * @param {string} [options.method = 'GET'] Method
 * @param {string} [options.type = 'json'] Response type
 */
async function request(ratelimiter, options = {}) {
  await ratelimiter.limitRate();

  const params = new URLSearchParams();
  Object.keys(options.qs || {}).forEach((key) => params.append(key, options.qs[key]));

  const result = await fetch(`${options.url}?${params}`, { method: options.method || 'GET', body: options.body ? JSON.stringify(options.body) : null, headers: options.headers || {} });
  const ratelimitRemaining = result.headers.get('ratelimit-remaining');

  if (ratelimitRemaining) ratelimiter.setRemaining(result.headers.get('ratelimit-remaining'));

  return options.type === 'json' || options.type == null ? result.json() : result.text();
}

module.exports = request;
