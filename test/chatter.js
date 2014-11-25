var nforce = require("nforce");
var chatter = require('../')(nforce);
var should = require("should");
var config = require("./config");

var org = nforce.createConnection({
  clientId: config.connection.clientId,
  clientSecret: config.connection.clientSecret,
  redirectUri: config.connection.redirectUri,
  mode: 'single',
  plugins: ['chatter']
});

describe('plugin', function() {

  describe('#myNewsFeed()', function(){
    it('should return my news feed successfully', function(done){
      org.chatter.myNewsFeed(function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        resp.elements.should.be.instanceof(Array);
        done();
      });
    })
  })

  describe('#recordFeed()', function(){
    if (config.records.recordFeedId) {
      it('should return the requested record feed successfully', function(done){
        org.chatter.recordFeed({id: config.records.recordFeedId}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
          resp.elements.should.be.instanceof(Array);
          done();
        });
      })
    } else {
      it('should not test successfully. Please enter the ID of a record ID into config.js')
    }
  })

  describe('#groupFeed()', function(){
    if (config.records.groupFeedId) {
      it('should return the requested group feed successfully', function(done){
        org.chatter.groupFeed({id: config.records.groupFeedId}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
          resp.elements.should.be.instanceof(Array);
          done();
        });
      })
    } else {
      it('should not test successfully. Please enter the ID of a group ID into config.js')
    }
  })

  describe('#userStatistics()', function(){
    if (config.records.userId) {
      it('should return the requested user statistics successfully', function(done){
        org.chatter.userStatistics({id: config.records.userId}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
          resp.id.should.be.instanceof(String);
          done();
        });
      })
    } else {
      it('should not test successfully. Please enter the ID of a user ID into config.js')
    }
  })

  describe('#postFeedItem()', function(){
    if (config.records.recordFeedId) {
      it('should post a new feed item successfully for a record', function(done){
        org.chatter.postFeedItem({id: config.records.recordFeedId, text: 'My Awesome Post!!'}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
          resp.body.should.be.instanceof(Object);
          done();
        });
      })
    } else {
      it('should not test successfully. Please enter the ID of a record ID into config.js')
    }
  })

  describe('#postComment()', function(){
    if (config.records.feedElementId) {
      it('should post a comment successfully', function(done){
        org.chatter.postComment({id: config.records.feedElementId, text: 'My Awesome Comment!!!'}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
          resp.body.should.be.instanceof(Object);
          done();
        });
      })
    } else {
      it('should not test successfully. Please enter the ID of a feedElement into config.js')
    }
  })

  describe('#likeFeedItem()', function(){
    if (config.records.feedElementId) {
      it('should like a feeditem successfully', function(done){
        org.chatter.likeFeedItem({id: config.records.feedElementId}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
          resp.id.should.be.instanceof(String);
          done();
        });
      })
    } else {
      it('should not test successfully. Please enter the ID of a feedElement into config.js')
    }
  })

  before(function(done){
    org.authenticate({ username: config.connection.sfuser, password: config.connection.sfpass}, function(err, resp){
      if (err) console.log('Error connecting to Salesforce: ' + err.message);
      done();
    });
  });

});
