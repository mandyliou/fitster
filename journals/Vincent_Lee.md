## Jan 27, 2023
Today I worked on:

- Worked on updating readme with Khaled and Mandy
- Reviewed changes to be merged with team
- Will debug and verify all changes are working after merging

## Jan 26, 2023
Today I worked on:

- Cleaned up code but ran into a 502 error after we removed a table from migrations. We found that we had to remake our caprover database to resolve the error
- Resolved merge conflicts with the team for Gabriels Navbar FE changes
- Resolved get_all_post test
- Worked on navlinks to redirect routes from forms

## Jan 25, 2023
Today I worked on:

- Discussed with Andrew our MVPs and restructuring
- Continued to work on deployment with Khaled and Mandy
- When we were accessing our features such as our sign up form, we were running into a http error in our deployed server. We determined the cause was due to a few trailing '/' in our endpoints. We adjusted them and now have our site up and working.
- Worked on documentation and the read.me with Mandy and Khaled
- Restructured our issues list after refactoring our MVPs. Closed stories that have been completed as well.

## Jan 24, 2023
Today I worked on:

- Continued to work on deployment with Mandy and Khaled
- Resolved the 502 error we were running into for deployment. The resolution was to add our auth files into our api service dockerfiles
- Once we had our deployment up and running, we then ran into a 404 error. We were able to determine our gitlab yml file did not reference our variables for API HOST correctly.

## Jan 23, 2023
Today I worked on:

- Worked on deployment again with Khaled and Mandy
- Was able to get our backend builds up and running from our blocker from yesterday
- We are now stuck on getting our servers up as we are running into a 502 error
- Created a get all outfit test

## Jan 22, 2023
Today I worked on:

- Started deployment with Khaled and Mandy
- Read and watched gitlabyml setup lectures and notes

## Jan 20, 2023
Today I worked on:

- Resolved a 401 authentication issue on my create outfit form
- Tested the create outfit form, and merged to main
- Remade a new branch for our star rating feature
- Created a new stars.js and routers/queries for our star ratings page with Mandy
- Tried to link tables ratings with post, however, was causing issues on our posts page

## Jan 19, 2023
Today I worked on:

- Continued working on the FE 5 star rating with Mandy
- Was able to join the tables from posts to rating but unsure how to reference the rating value to update on the frontend star system
- Implemented rating.js onto the userpage
- Git pulled and resolved merge conflicts but now ratings is no longer working. May need to remake branch and continue again
- Created a front end create outfit form
- Having authentication issuess on creating the outfit post

## Jan 18, 2023
Today I worked on:

- Continued to work on our star rating system
- Tried to join the tables and ratings but unsure how to do so. Will try to figure it out from our lectures

## Jan 17, 2023
Today I worked on:

- Implementing the FE 5 star rating system
- Not sure how to reference a users post and its user_id to save the ratings yet
- Researching on methods to average users ratings on an outfit post

## Jan 13, 2023
Today I worked on:

- Worked on the FE logout story
- Was not able to figure out how to connect the FE to BE yet

## Jan 12, 2023
Today I worked on:

- Resolved the authentication error and got login/logout backend to work
- Started to work on our tables for our outfit service
- Unsure how to get our postgres and authentication to grab a user from another microservice
- Created data for our clothing items

## Jan 11, 2023
Today I worked on:

- Continued to work on authenticators and jwtdown
- Was able to get login and logout to show in browser but running into dict object no attribute 'hashed_password' error

## Jan 22, 2023
Today I worked on:

- Started the process of deployment in caprover with Mandy and Khaled
- Got CI/CD Gitlab setup running
- Created users and outfits app in Caprover to run test jobs
- Was able to build front-end but having issues building our backend for deployment

## Jan 10, 2023
Today I worked on:

- Created tables in PGAdmin for users
- Received additional details on git branches
- Started to work on our authenticators

## Jan 9, 2023

Today, I worked on:

- Completed our project setup
- Started outlining our api services
- Sorted any errors the team was receiving when running docker

## Jan 6, 2023

Today, I worked on:

- Set up our FastAPI services
- Fixed our pipeline issues
- Successfully ran our containers and localhost for our project
- Got our PGAdmin running and registered a server

## Jan 5, 2023

Today, I worked on:

- Finalizing the issues/features and entering them into GitLab with my team
- Finalized allocating points for the MVP between team members


## Jan 4, 2023

Today, I worked on:

- Setting up and finalizing the details of our wire frame with my group
- Detailing out the MVP and started allocating points between team members
- Started to set up our PostgreSQL database


## Jan 3, 2023

Today, I worked on:

- Deciding with my group on what our project will be and creating an MVP
- Dividing the MVP between features
