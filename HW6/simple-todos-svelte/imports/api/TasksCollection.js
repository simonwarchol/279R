
import { Mongo } from 'meteor/mongo';

// Meteor abstracts away the database, which we can just give a name and begin adding things to
export const TasksCollection = new Mongo.Collection('tasks');