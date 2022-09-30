[Tier 1] Programming HW4: Make a To-Do App with Svelte and Firebase

## Simon Warchol

**Note:** This submission follows the following
tutorials: https://www.youtube.com/playlist?list=PLm_Qt4aKpfKiGbdjaHdOpry6Neza0etxZ

### How to Run

1) Visit https://todo-app-126f3.web.app


### Reflection

What are the significant software concepts that this combination of technologies has that each previous set of
technologies did not? Or that they handle significantly differently?

Svelte: Svelte is similar to other model-view-viewmodel frameworks (React, Angular, etc.) which abstrats the visual components, data bindings, and logic of webapps into discrete components, though there is no hard requirement one follows this design structure. In Svelte, it is easy to define a singular component, which contains HTML, CSS, and Javascript in a single file while easily integrating other Node packages. Svelte is distinctly different from these other approaches in that it is compiled, which reduces client-side computation. However, for small-scale webapps i can't notice any difference. 
I prefer Svelte's design model more than React's (which i'm most familiar with), but would like to see it's ecosystem grow in size before I'd be willing to totally switch over.

Firebase offers easy database access (as mongo was used in the previous tier1), but which a really nice GUI and documentation that makes it easy to integrate the db into your javascript app. It also offers an easy CLI for hosting. Thus, this is the first combination of techonologies wehre I've submimitted an actual website that has persistent data across users. I was really impressed by both.