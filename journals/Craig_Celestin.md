## Jan 9,2023

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
