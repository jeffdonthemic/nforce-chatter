nforce-chatter
======

**nforce-chatter** is a [Chatter REST  API](http://www.salesforce.com/us/developer/docs/chatterapi/) plugin for [nforce](https://github.com/kevinohara80/nforce).

## Features

The Chatter API is #massive so the plugin is a work in progress. The following functionality has been implemented. Pull requests are welcome!

* Get Chatter Activity Statistics for a User
* Get My News Feed
* Get a Record Feed
* Get a Group Feed
* Post a Feed Item
* Like a Feed Item
* Post a Comment

The test/chatter.js mocha test has sample code.

See the [Chatter Developer's Guide](http://www.salesforce.com/us/developer/docs/chatterapi/) for complete and official documentation.

## Installation

```bash
$ npm install nforce-chatter
```

## Usage

Require **nforce** and **nforce-chatter** in your app and create a client connection to a Salesforce Remote Access Application with the `chatter` plugin enabled.

```js
var nforce = require('nforce'),
  chatter = require('nforce-chatter')(nforce),

var org = nforce.createConnection({
  clientId: 'SOME_OAUTH_CLIENT_ID',
  clientSecret: 'SOME_OAUTH_CLIENT_SECRET',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v32.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi', // optional, 'single' or 'multi' user mode, multi default
  plugins: ['chatter']
});
```

Now we just need to authenticate and get our salesforce OAuth credentials. Here is one way to do this in multi-user mode...

```js
// multi user mode
var oauth;
org.authenticate({ username: 'my_test@gmail.com', password: 'mypassword'}, function(err, resp){
  // store the oauth object for this user
  if(!err) oauth = resp;
});
```

...or in single-user mode...

```js
// single-user mode
org.authenticate({ username: 'my_test@gmail.com', password: 'mypassword'}, function(err, resp){
  // the oauth object was stored in the connection object
  if(!err) console.log('Cached Token: ' + org.oauth.access_token)
});
```

See the [nforce readme](https://github.com/kevinohara80/nforce) for more detailed instruction on the awesome features of nforce.

## nforce-chatter API Basics

### Callbacks

The API of **nforce-chatter** follows typical node.js standards. Callbacks will always pass an optional error object, and a response object. The response object closely resembles the typical responses from the Salesforce REST API.

```js
callback(err, resp);
```

### Calling Functions

API calls take two arguments:

  1. A JavaScript object containing the data for the function  
  2. The callback

```js
org.chatter.recordFeed({id: '0037000000TWktt'}, function(err, resp) {
  if (!err) console.log(resp);
  if (err) console.log(err);
});
```

If you are using multi-user mode, pass the connection info in the hash with the `oauth` property.

```js
org.chatter.recordFeed({id: '0037000000TWktt', oauth: oauth}, function(err, resp) {
  if (!err) console.log(resp);
  if (err) console.log(err);
});
```

## Running Tests

The mocha tests currently run directly against a Saleforce org. I would like to switch them to use [nock](https://github.com/pgte/nock) in the near future. To run the tests, first you'll need to rename `test/config-example.js` to `test/config.js` and enter your connection parameters. Then run the tests.

```bash
$ npm test
```

## nforce-chatter Methods

### userStatistics()

Returns Chatter statistics for a salesforce user.

* `id`: Required. The id of the user to return statistics for.

### myNewsFeed()

Returns the context user's news feed.

### recordFeed()

Returns the feed for a specified record.

* `id`: Required. The id of the record to return the feed for.

### groupFeed()

Returns the feed for a specified group.

* `id`: Required. The id of the group to return the feed for.

### postFeedItem()

Posts a new feeditem for a record.

* `id`: Required. The ID of the parent this feed element is being posted to. This value can be the ID of a user, group, or record, or the string me to indicate the context user.
* `text`: Required. The text of the post.
* `capabilities`: Optional. An optional JSON set of capabilities for this Feed Item (API 31.0+ only)

```js
var id = '00580000005eABFAA2';
var text = 'Post text';
var capabilities = {'link': { "urlName":"My Link","url":"http://www.mylink.com"}};
org.chatter.postFeedItem({id: id, text: text, capabilities: capabilities}, function(err, resp){});
```

### postComment()

Posts a new comment on a feeditem.

* `id`: Required. The id of the feeditem to post the comment
* `text`: Required. The text of the comment.

### likeFeedItem()

Likes the specified feeditem.

* `id`: Required. The id of the feeditem to like.

## Todo

* Rewrite tests using nock.
* Hook up to travis-ci.org

## Contributors

* Jeff Douglas -> [jeffdonthemic](https://github.com/jeffdonthemic)

## Changelog

* `v0.0.1`: Initial release.
