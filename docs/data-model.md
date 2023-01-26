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
