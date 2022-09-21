[Tier 2] Implement a user-testable version of Doodle

## Simon Warchol

**Note:** Built using MUI and the Vite create-react-app template.

### How to Run

1) Install:
    - `cd doodle-clone`)
    - `npm i`)
2) Run:
    - `npm run dev`)
3) Navigate to `http://127.0.0.1:5173/` in your browser (check the terminal for the correct port if there are issues)

### Reflection 
What are the significant software concepts that this combination of technologies has that each previous set of technologies did not? Or that they handle significantly differently?

Each of the technologies we have used thus far offers some form of generalizable UI components. HTML offers primitive lists,headers,etc. NodeJS opens access to libraries such as MUI (which I also used w/ flutter) that offer much richer components and hence increased generalizability. Flutter takes this to an entirely different level in that these components are not bound to the web, and can be used across in mobile/web and desktop contexts across OSs. A key takeaway from our readings in this class has been the need to have consistency and follow norms in user interfaces and providing such consistency across devices is a huge advantage. That being said, working in dart and without the benefit of the npm ecosystem can be limiting for large / ambitious projects and may require a certain element of reinventing the wheel. Moreover, an entirely different suite of technologies (e.g. electron) exist that port web development into native non-web settings while still maintaining the benefits of node and other frameworks (react, etc.). In either case, the ability to not have to re-write code as you move from platform to platform is a huge advantage.