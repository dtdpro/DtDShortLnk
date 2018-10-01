import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Tracking = new Mongo.Collection('link_tracking');

if (Meteor.isServer) {
  Meteor.publish('link_tracking', function () {
    return Tracking.find({});
  });
}

Meteor.methods({
  'tracking.insert'(linkId,ipAddress,userAgent) {
    Tracking.insert({
      ipAddress: ipAddress,
      userAgent: userAgent,
      link: linkId,
      visitedAt: new Date().getTime()
    });

  }
});
