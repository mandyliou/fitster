
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

