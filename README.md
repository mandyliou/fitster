# Fitster

- Khaled Azimi
- Gabriel Cruz
- Mandy Liou
- Vincent Lee
- Craig Celestin


## Design

- [API Design](docs/api-design.md)
- [Data Model](docs/data-model.md)
- [GHI](docs/ghi.md)



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
3. Run `docker volume create pg-admin`
4. Run `docker volume create postgres-data`
5. Run `docker compose build`
6. Run `docker compose up`
7. Enjoy Fitster
