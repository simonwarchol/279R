import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';

// Meteor is bound to the app div in main.html
Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});