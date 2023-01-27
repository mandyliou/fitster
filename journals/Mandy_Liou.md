## Jan 27, 2023
- updated readme with Khaled and Vincent
- review final changes as a team

## Jan 26, 2023
- finalizing last bit of the project
- working on nav bar
- removed unnecessary parts of the code as a team

## Jan 25, 2023
- finished setting up deployment
- met with Andrew with Khaled and Vincent to modify the MVP
- finished all features assigned for MVP
- worked with Khaled and Vincent for the Readme
- closed issues on gitlab
- modified Readme
    - added wireframe images to the readme

## Jan 24, 2023
- worked on deployment with Vincent and Khaled
    - got FE and BE to connect for deployment
        - fixed gitlab yml file

## Jan 23, 2023
- started deployment with Vincent and Khaled
    - encountered errors with formatting, signing_keys
    - finished setting up Gitlab CI/CD running
- created and successfully ran unit test working for duplicate accounts
- got front-end up, encountering errors with backend

## Jan 20, 2023
- tried to debug stars branch since it broke after pulling from main
- paired programed with vincent for our star feature
- still encountering some merge conflicts
- still working on stars feature

## Jan 19, 2023
- set up part of star ratings FE
- still working on stars feature
- encountered merge conflicts after pulling from main

## Jan 18, 2023
- changed auth from jwt to jose
- modified my token_auth and outfit routers to match

## Jan 17, 2023
- Fixed auth problem with account setup
    - changed ROUTER_APP to correct name
- Incorporated an error message if username or password is incorrect
- If user is logged in, should reroute to main page
- Modified app.js to assign token to a specific user
- moved router paths from index.js into app.js to keep it concise
- included GetToken, BrowserRouter, AuthProvider into App.js in order for the auth process to work properly
- Helped Khaled debug his issue with creating a user and updating a user by creating another function get_one_by_id in queries to specifically get the user by the id
    - vs. get_one will get the user by the username
    - modified routers.py to use the correct function to get user by id
- worked on backend outfit.py in both queries and routers for the second microservice
-successfully implemented authentication for outfit microservice

## Jan 13, 2023
- Worked on front-end login
- Encountered issues with authenticating the account due to not being able to get the token (FE)


## Jan 12, 2023
- Compiled and input data in for 18 outfits
- Outlined the steps for my next feature

## Jan 11, 2023
 - Encountered and fixed issues creating and logging in (for dict has no attribute "hashed_password") by modifying routers, queries, and authenticator.py
 - Worked on log in backend with auth
 - Wrote out authenticator.py

## Jan 10, 2023
Today I worked on:

-created our tables on pgadmin
-created our branches
-started on authentication

## Jan 9, 2023
Today I worked on:

- Finished setting up outfit-api-service
- Created the necessary files needed within outfit-api-service


## Jan 6, 2023
Today I worked on:

- Setting up project and docker
- Fixed pipeline issues
- Successfully got the containers and the respective localhost to run


## Jan 5, 2023
Today, I worked on:

- Finalizing the issues/features and entering them into GitLab with my team
- Finalized the distribution of tasks for the MVP between team members


## Jan 4, 2023
Today, I worked on:

- Setting up and finalizing the details of our wire frame with my group
- Elaborated on the features into stories
- Detailing out the MVP and discusses allocating points among each member
- Started to set up our PostgreSQL database


## Jan 3, 2023
Today, I worked on:

- Deciding with my group the topic of the project and creating an MVP
- Dividing the MVP between features
