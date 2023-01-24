# Module3 Project Gamma

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

* Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
* Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

* [ ] Wire-frame diagrams
* [ ] API documentation
* [ ] Project is deployed to Render.com/GitLab-pages
* [ ] GitLab issue board is setup and in use
* [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `sample_service`, are
sample services, that you can start building off of or use
as a reference point.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `sample_service` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `sample_service` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The sample Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

* `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
* `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to Render.com. We will learn much more about this file.
* `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

* make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
* remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

* add these GitLab CI/CD variables:
  * PUBLIC_URL : this is your gitlab pages URL
  * SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Create render.com account and application

* create account on render.com
* one person create a group and invite all other members
* create a new "Web Service"
  * authenticate with GitLab and choose your project
  * Enter fields:
    * Name: name of your service
    * Root Directory: the directory of your service in your git repo.
      For this example use "sample_service".
    * Environment: Docker
    * Plan Type: Free
  * click the "Create Web Service" button to create it
  * the build will succeed and it will look like the server is running,
    most likely, in 6-10 minutes, it will fail.
  * click "Manual Deploy" -> "Deploy latest commit" and the service
    should deploy successfully.

### Update GitLab CI/CD variables

Copy the service URL for your new render.com service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.





# Fitster

- Khaled Azimi
- Gabriel Cruz
- Mandy Liou
- Vincent Lee
- Craig Celestin


## Design

- API Design
- Data Model
- GHI
- Integration

## Data Models

### User microservice

| name | type | unique | optional
| ----------- | ----------- | ----------- | -----------
| name | string | yes | no
| first_name | string | no | no
| last_name | string | no | no
| email | string | yes |no
| password | string | no | no
| profile_photo | string | no | yes
| description | string | no | yes


### Outfit microservice


#### Outfits

| name | type | unique | optional
| ----------- | ----------- | ----------- | -----------
| user_id | int | no | no
| outfit_name | string | no | no
| outfit_brand | string | no | no
| top | string | no |no
| bottom | string | no | no
| shoes | string | no | no
| outfit_category | string | no | no
| outfit_gender | string | no | no
| outfit_description | string | no | yes

#### Posts

| name | type | unique | optional
| ----------- | ----------- | ----------- | -----------
| user_id | int | no | no
| outfit_id | reference to outfit entity | no | no
| post_description | string | no | no
| post_title | string | no | no


## Api Endpoints

# User

## Users

- Method: POST, PUT, Delete
- Paths: "/users", "/users/{user_id}"

Input

```

{username: 'Readme',
first_name: 'read',
last_name: 'me',
email: 'read@gmail.com',
password: 'string',
profile_photo: "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
description: "outfit of the day"
}


```

Output

```

"users":
{username: 'Readme',
first_name: 'read',
last_name: 'me',
email: 'read@gmail.com',
password: 'string',
profile_photo: "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
description: "outfit of the day"}


```




# Outfit

## Outfits

- Method: POST
- Path: "/api/user/outfit"


Input

```
 {outfit_name: 'api',
 outfit_brand: 'api',
 top: 'https://media.everlane.com/image/upload/c_fill,w_7…enter,f_auto,fl_progressive:steep/i/46dca69a_fe89',
 bottom: 'https://media.everlane.com/image/upload/c_fill,w_7…enter,f_auto,fl_progressive:steep/i/46dca69a_fe89',
 shoes: 'https://media.everlane.com/image/upload/c_fill,w_7…enter,f_auto,fl_progressive:steep/i/46dca69a_fe89'}
 ```





Output
```
"outfits":
 {outfit_name: 'api',
 outfit_brand: 'api',
 top: 'https://media.everlane.com/image/upload/c_fill,w_7…enter,f_auto,fl_progressive:steep/i/46dca69a_fe89',
 bottom: 'https://media.everlane.com/image/upload/c_fill,w_7…enter,f_auto,fl_progressive:steep/i/46dca69a_fe89',
 shoes: 'https://media.everlane.com/image/upload/c_fill,w_7…enter,f_auto,fl_progressive:steep/i/46dca69a_fe89'}
 ```


## Posts

- Method: Post/GET user posts/Delete
- Paths: "/api/posts", "/api/user/posts", "/posts/{post_id}"


## Create

Input

```
{outfit_id: 51, post_description: 'check', post_title: 'check'}
 ```

Output

```
{outfit_id: 51, post_description: 'check', post_title: 'check'}
 ```






## Intended Market

We are targeting fashion forward and fashion expressive consumers across the world


## Functionality

- Visitors to the site can create an account
- Once an account is created users can create an outfit
- Once an outfit is created, users can create a post with the outfits
- Posts that are created can then be viewed on their profile page
- Posts from all users can also be viewed on the Top Fits page


## Future Functionality

- Rating other users outfits
- Displaying top rated outfits
- Searching for users
- Filtering outfit categories


## Project Initiliation
To fully get this application running on your local machine, please follow the steps below:
1. Clone the repository on to your local machine
2. CD into the new project directory
3. Run docker volume create pg-admin
4. Run docker volume create postgres-data
5. Run docker compose build
6. Run docker compose up
7. Enjoy Fitster
