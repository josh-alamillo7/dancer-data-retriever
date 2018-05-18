# hrsf91-mvp-josh-alamillo
An app for competitive DDR players that converts data from skillattack.com into a user-friendly interface.

## how to run
1. Run ```npm install``` from the root directory in your terminal
2. Open two new terminal windows and start ```mongo``` and ```mongod```
3. Run ```node server/server.js```
4. Go into ```scrapers``` directory to access seeding functions.
5. ```node getScoresFromSite.js```
6. ```node getLevelInfo.js```
7. From root directory: ```./node_modules/.bin/webpack -d --watch```
8. Type localhost:7000 into your browser.
9. Choose a name and get started!

![alt text](https://i.imgur.com/BpyLHui.png)

### to do:
1. Implement more sorting methods, priority is PFC% order and player score
2. Add user authentication
3. Allow users to add other users as rivals.


