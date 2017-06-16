import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Cities, Districts} from '../../imports/collections/cities/cities.js';


if(Meteor.isServer){
  Meteor.publish("clientUserData", function(clientDataView){
    var skipped = clientDataView.skipped;
    var numberOfRecords = clientDataView.numberOfRecords;

    return Meteor.users.find();
  });
}
