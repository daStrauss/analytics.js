/**
 * Analytics.js
 *
 *
 * Update to a specific integration
 */

// copy out whatever already exits in the window
var analyticsq = window.analytics || [];

/**
 * Snippet version.
 * to track what is going on be hind the scenes
 */
var snippet = analyticsq && analyticsq.SNIPPET_VERSION
  ? parseFloat(analyticsq.SNIPPET_VERSION, 10)
  : 0;

// load each of the possible integrations
var Integrations = require('./integrations');
var analytics = require('segmentio/analytics.js-core');
var each = require('each');

each(Integrations, function(name, Integration) {
  analytics.use(Integration);
});

module.exports = analytics;

/**
 * Before swapping the global, replay an existing global `analytics` queue.
 */
while (analyticsq && analyticsq.length > 0) {
  var args = analyticsq.shift();
  var method = args.shift();
  if (analytics[method]) analytics[method].apply(analytics, args);
}

/**
 * Finally, replace the global queue with the real `analytics` singleton.
 */
window.analytics = analytics;