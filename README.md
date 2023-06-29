# MYTASK

Task Breakdown:

**Frontend Development:**

1. Create the frontend UI:
   - Design and create 5 UI cards.
   - Make the cards draggable and droppable using the DND library in React.
   - Manage the state of the cards using the useState hook in React.
   - Implement reordering functionality for the cards.

2. Display GIF on cards:
   - Embed the GIF URLs obtained from the internet onto the cards.
   - Ensure that the GIFs are displayed correctly on the cards.

3. Implement overlay on GIF click:
   - On clicking the overlay of a GIF, display it in the middle of the screen.
   - Implement an event listener and handle function to manage the clicking behavior.
   - When the "Esc" button is pressed, the image should return to its original position.

**Backend Development:**

1. Create the backend server:
   - Set up a remote server that hosts the static.json file.
   - Use the Express framework for the backend development.

2. Make the title dynamically changeable:
   - Implement functionality to dynamically change the title in the static.json file.
   - Update the frontend UI when the title changes.

3. Implement spinner:
   - Create a spinner component to indicate loading.
   - After every 5 seconds, show the spinner briefly.
   - Note: Due to the small data size, the spinner may appear and disappear quickly.

**Running the Commands:**

1. Start the backend server:
   - Navigate to the "mytask" folder using the command `cd ..` (move up one level).
   - Move to the backend folder using `cd mytask/backend`.
   - Run the backend server using the command `node app.js`.

2. Start the frontend:
   - Navigate to the root directory of the project (where the frontend is located).
   - Run the frontend using the command `npm start`.

The provided information has been divided into two sections: frontend development and backend development. Each section outlines the specific tasks to be completed. Additionally, instructions are given on how to run the backend and frontend servers separately.
