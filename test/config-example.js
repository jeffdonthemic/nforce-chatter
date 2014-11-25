var config = {}

config.connection = {}
config.records = {}

// mocha timeout for the entire suite
config.timeout = 10000;
// displays results from salesforce api calls
config.debug = false;

config.connection.sfuser = '';
config.connection.sfpass = '';
config.connection.clientId = '';
config.connection.clientSecret = '';
config.connection.redirectUri = 'http://localhost:3000/oauth/_callback';

/*
  Some tests for the chatter are difficult to automate as there is no
  way to obtain IDs that are needed for the calls. The best approach
  is to find the ids for the following below so that the test can run
  successfully. If left null, the test will be skipped.
*/

config.records.recordFeedId = '0037000000TWkwhAAD';
config.records.groupFeedId = '0F970000000Tbjw';
config.records.userId = '0057000000131Gt';
config.records.feedElementId = '0D57000001jY0Sz'

module.exports = config;
