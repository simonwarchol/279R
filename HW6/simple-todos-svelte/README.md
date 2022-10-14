[Tier 1] Programming HW6: Complete the To-Do Tutorial App with Meteor & Svelte
## Simon Warchol

**Note:** This submission follows the following
tutorials: https://svelte-tutorial.meteor.com/simple-todos/

### How to Run

1) Install Meteor: https://www.meteor.com/install
2) Run app with `meteor` in the `simple-todos-svelte` directory


### Reflection

What are the significant software concepts that this combination of technologies has that each previous set of
technologies did not? Or that they handle significantly differently?

Not discussing the svelte specific things, which are covered in a previous assignment.
Meteor makes it incredibly easy to create a webapp with a client/server architecture and a mongodb server.
Other software made us connect to the DB and create more explicit models, whereas
here we could easily just have a DB up and running and add to a collection.
It creates client and server directories which are automatically connected. 
I will say that some of this seems like a bit too abstracted away or overkill for
simple webapps. Generally, I prefer either entirely client-side code or JS client Python server architecture, as the 
distinction between server and client can be a bit muddled in meteor.
Meteor also makes it very easy to turn your webapp into a mobile app or electron
app, which can help you rapidly deploy across many platforms.