[Tier 2] Implement a user-testable version of When2Meet

## Simon Warchol

**Note:** Built using MUI, D3, and the Vite create-react-app template .

### How to Run

1) Install:
    - `cd when2meet-clone`)
    - `npm i`)
2) Run:
    - `npm run dev`)
3) Navigate to `http://127.0.0.1:5173/` in your browser (check the terminal for the correct port if there are issues)

4) **Note:** This site is intended to be displayed in full-screen on a desktop/laptop. It is not optimized for mobile.

### Key Distinguishing Characteristics

In when2meet, user availability is represented by rectangles, divided by days.
Users can select a time slot, represented by a rectangle, to mark them self as available or unavailable.
They can click and drag to mark multiple time slots as available or unavailable at once.
Color encodes availability, with a two color categorical scale encoding if a user is
available or unavailable and a continuous color scale encoding how many other participants are
available at a given time slot.