import {Meteor} from 'meteor/meteor';
import {TasksCollection} from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({text: taskText});
//Populate the db with some test tasks
Meteor.startup(() => {
    if (TasksCollection.find().count() === 0) {
        [
            'First Task',
            'Second Task',
            'Third Task',
            'Fourth Task',
            'Fifth Task',
            'Sixth Task',
            'Seventh Task',
        ].forEach(insertTask);
    }
});