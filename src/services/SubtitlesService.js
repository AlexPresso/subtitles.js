const { request } = require('../utils');

const { apiConfig } = require('../configs');

class SubtitlesService {
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
   * /api/v1/subtitles
   *
   * @see https://opensubtitles.stoplight.io/docs/opensubtitles-api/open_api.json/paths/~1api~1v1~1subtitles/get
   * @param {Object} options Query parameters
   *
   * @returns {Promise} Promise
   */
  async search(options) {
    const subtitles = await request(this.ratelimiter, {
      url: `${apiConfig.url}${apiConfig.subtitles.subtitles}`,
      qs: options,
      headers: this.headers,
    });

    return subtitles;
  }
}

module.exports = SubtitlesService;
