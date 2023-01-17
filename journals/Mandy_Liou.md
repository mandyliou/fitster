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
