steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE outfits (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id int not null,
            outfit_name varchar(100) not null,
            outfit_brand varchar(100) not null,
            top varchar(200) not null,
            bottom varchar(200) not null,
            shoes varchar(200) not null,
            outfit_category varchar(100) not null,
            outfit_gender varchar(100) not null,
            outfit_description text
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE outfits;
        """,
    ],
    [
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id int not null,
            user_username varchar(100) not null,
            user_first_name varchar(100)not null,
            user_last_name varchar(100) not null,
            user_profile_photo varchar(200) not null,
            user_description varchar(100) not null,
            user_email varchar(100) not null,
            outfit_id int not null references outfits(id),
            post_description text not null,
            post_title varchar(100) not null
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE posts;
        """,
    ],
    [
        """
        CREATE TABLE ratings (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id int not null,
            post_id int not null references posts(id),
            rating int not null check (rating between 0 and 5)
        );
        """,
        """
        DROP TABLE ratings;
        """,
    ],
]
