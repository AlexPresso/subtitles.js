const { request } = require('../utils');

const { apiConfig } = require('../configs');

class DiscoverService {
  constructor(config, ratelimiter) {
    this.config = config;
    this.ratelimiter = ratelimiter;
    this.headers = {
      'Api-Key': this.config.apiKey,
      'Content-Type': 'application/json',
      'User-Agent': `${config.appName} v${config.appVersion}`
    };
  }

  /**
   * /api/v1/discover/latest
   *
   * @see https://opensubtitles.stoplight.io/docs/opensubtitles-api/open_api.json/paths/~1api~1v1~1discover~1latest/get
   * @param {Object} options Query parameters
   *
   * @returns {Promise} Promise
   */
  async latestSubtitles(options) {
    const latest = await request(this.ratelimiter, {
      url: `${apiConfig.url}${apiConfig.discover.latest}`,
      qs: options,
      headers: this.headers,
    });

    return latest;
  }

  /**
   * /api/v1/discover/most_downloaded
   *
   * @see https://opensubtitles.stoplight.io/docs/opensubtitles-api/open_api.json/paths/~1api~1v1~1discover~1most_downloaded/get
   * @param {Object} options Query parameters
   *
   * @returns {Promise} Promise
   */
  async mostDownloadedSubtitles(options) {
    const mostDownloaded = await request(this.ratelimiter, {
      url: `${apiConfig.url}${apiConfig.discover.most_downloaded}`,
      qs: options,
      headers: this.headers,
    });

    return mostDownloaded;
  }

  /**
   * /api/v1/discover/popular
   *
   * @see https://opensubtitles.stoplight.io/docs/opensubtitles-api/open_api.json/paths/~1api~1v1~1discover~1popular/get
   * @param {Object} options Query parameters
   *
   * @returns {Promise} Promise
   */
  async popularFeatures(options) {
    const popular = await request(this.ratelimiter, {
      url: `${apiConfig.url}${apiConfig.discover.popular}`,
      qs: options,
      headers: this.headers,
    });

    return popular;
  }
}

module.exports = DiscoverService;
