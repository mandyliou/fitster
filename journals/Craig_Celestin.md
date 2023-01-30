## Jan 27, 2023
- Aided in fixing search for ForYou, TopFits
- Fixed errors regarding seperate pages for search
- Implemented searchParameters and guided functional implementation
- Added profile pages from ForYou Search
- implemented and worked on function that randomized posts on FE using Math.random and invoked it on posts

## Jan 25, 2023
- In order to get user information to properly display on FE
- changed migrations (edit posts table)
- changed the create function
- had to add two additional pydantic models
- had to add two additional helper functions
- had to edit the create posts query
- edited frontend for foryoupage.js and topfits
- all changes above allowed for user info as well as outfit information to be displayed
- Worked on search for ForYou

## Jan 24, 2023
- Had to edit and add to queries and routers in order to get outfit category, gender, and description to show
- Created a showmorefits, accompanying helper function, and edited both routers and queries to take advantage of db-info
- used tokenparts in order to add current user data for posts (have to implement further changes to make correct user info to show)

## Jan 23, 2023
- added get all posts test

## Jan 19, 2023
made significant progress/completed be for outfits
worked on navigation of site
work on for you page
aiding with creating nav routes
Added navbar

## Jan 18, 2023
Finished up work/fixed errors regarding BE for post, outfits for both queries and routers
Hoping to work more on FE for both services
Get views and filtering operating

## Jan 17, 2023
had to figure out next steps following changes made to tables for outfits
worked on BE for posts, outfits

## Jan 13, 2023
finalized outfits tables
confirmed login form with K
working on login, logout FE
excited to get rating system implemented
implemented user tables

## Jan 12, 2023
finalized clothing_item and outfit tables
finished auth for be
started on post table, going to have to add a rating table
started creating outfit items ()

## Jan 11, 2023
Worked on more auth content
got through blockers

## Jan 10, 2023
finalized/tested user db
inserted values and got them to work
finalized understanding git workflow, ft branches

## Jan 9,2023
worked on more project setup
worked in pgdamin as a group
finalized models/tables in both dbs
blockers - understanding the endpoints for obtaining user info in another ms


## Jan 6, 2023
Worked on project setup and solved a myriad of issues involving package lock json
```
Sometimes NPM gets a little wonky (unfortunately idk why) but what usually gets things back on track is to:
Delete your package-lock.json file
Delete your node_modules directory
Restart the container
Wait and watch everything get rebuilt
That directory and the package-lock.json file are generated during build time when node reads all the good stuff in your package.json file.
```
as well as issues with requirements. Pipeline was encountering issues with failure and had to fix errors regarding flake8 and linting. Project setup occured successfully with the one ms and users-api-service db. Local host 3000 and 8000 are now showing.
