var _ = require('lodash');

module.exports = function(nforce, pluginName) {

  if (!pluginName) pluginName = 'chatter';

  // throws if the plugin already exists
  var plugin = nforce.plugin(pluginName);

  // http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickreference_get_activity_statistics_for_user.htm
  plugin.fn('userStatistics', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);
    if (validator.error) return callback(new Error(validator.message), null);
    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/chatter/users/' + args.id;
    opts.method = 'GET';
    return this._apiRequest(opts, opts.callback);
  });

  // http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickreference_get_news_feed.htm
  plugin.fn('myNewsFeed', function(args, callback) {
    var opts = this._getOpts(args, callback);
    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/chatter/feeds/record/me/feed-elements';
    opts.method = 'GET';
    return this._apiRequest(opts, opts.callback);
  });

  // http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickreference_get_feed_items_posted_to_record.htm
  plugin.fn('recordFeed', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);
    if (validator.error) return callback(new Error(validator.message), null);
    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/chatter/feeds/record/' + args.id + '/feed-elements';
    opts.method = 'GET';
    return this._apiRequest(opts, opts.callback);
  });

  // http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickreference_get_group_feed.htm
  plugin.fn('groupFeed', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);
    if (validator.error) return callback(new Error(validator.message), null);
    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/chatter/feeds/record/' + args.id + '/feed-elements';
    opts.method = 'GET';
    return this._apiRequest(opts, opts.callback);
  });

  // http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickreference_post_comment_to_feed_element.htm
  plugin.fn('postComment', function(args, callback) {
    var validator = validate(args, ['id', 'text']);
    var opts = this._getOpts(args, callback);
    if (validator.error) return callback(new Error(validator.message), null);
    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/chatter/feed-elements/' + args.id + '/capabilities/comments/items';
    opts.method = 'POST';
    var body = {
      "body":
        { "messageSegments":
          [ { "type":"Text", "text": args.text } ]
        }
      }
    opts.body = JSON.stringify(body);
    return this._apiRequest(opts, opts.callback);
  });

  // http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickreference_like_feed_item.htm
  plugin.fn('likeFeedItem', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);
    if (validator.error) return callback(new Error(validator.message), null);
    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/chatter/feed-elements/' + args.id + '/capabilities/chatter-likes/items';
    opts.method = 'POST';
    return this._apiRequest(opts, opts.callback);
  });

  // http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickreference_post_feed_item.htm
  plugin.fn('postFeedItem', function(args, callback) {
    var validator = validate(args, ['id', 'text']);
    var opts = this._getOpts(args, callback);
    if (validator.error) return callback(new Error(validator.message), null);
    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/chatter/feed-elements';
    var body = {
      "body":
        { "messageSegments":
          [ { "type":"Text", "text": args.text } ]
        },
        "feedElementType" : "FeedItem",
        "subjectId" : args.id
      }
    opts.method = 'POST';
    opts.body = JSON.stringify(body);
    return this._apiRequest(opts, opts.callback);
  });


  // utility method to validate inputs
  function validate(args, required) {
    var result = {
      error: false,
      message: 'No errors'
    }
    // ensure required properties were passed in the arguments hash
    if (required) {
      var keys = _.keys(args);
      required.forEach(function(field) {
        if(!_.contains(keys, field)) {
          result.error = true;
          result.message = 'The following values must be passed: ' + required.join(', ');
        }
      })
    }
    return result;
  }

}
