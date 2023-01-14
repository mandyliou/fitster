## Jan 12, 2023
finalized clothing_item and outfit tables
finished auth for be
started on post table, going to have to add a rating table
started creating outfit items ()

## Jan 11, 2023


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
