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
]
