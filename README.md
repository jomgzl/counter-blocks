# Counter Blocks
This is an application that allows to create block sessions. These sessions contain randomly positionned blocks on the screen.

## Tech stack
* Vanilla JavaScript
* TypeScript
* Express.js
* React
* CSS
* HTML
* MongoDB
* Rest API

## Features
* **Add blocks:** Adding as many blocks as one wants, with specific colors and sizes. Blocks appear at random places on the screen
* **Delete blocks:** Possibility to delete blocks
* **Move blocks:** Each block can be moved on the screen
* **Save the current block session:** Ability to save a block session and reopen it in a new window. Possibility to give a title to each block session
* **Update the database every minute:** Cronjob that updates the database every minute, by adding to it the blocks of the modified sessions

## Getting started
git clone https://github.com/jomgzl/counter-blocks.git <br>
cd counter-blocks <br>
npm install

Create an .env file in the BE folder <br>
cd BE <br>
FRONTEND_URL=http://localhost:5500 <br>
MONGO_URL=mongodb+srv://MY_DATABASE_USERNAME:MY_PASSWORD@MY_CLUSTER.example.mongodb.net/?appName=MY_CLUSTER

Then run the server: <br>
node server.js

For the Vanilla JavaScript frontend: <br>
I use the Live Server plugin by Ritwick Dey on VS code <br>
Then in the browser : http://localhost:5500/FE/

For the React frontend: <br>
cd FE-React <br>
npm run dev

