steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE clothing_item (
            id SERIAL PRIMARY KEY NOT NULL,
            item_brand varchar(100) not null,
            item_name varchar(100) not null,
            item_color varchar(100) not null,
            item_type varchar(100) not null,
            item_category varchar(100) not null,
            item_gender varchar(100) not null,
            item_picture bytea not null
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE clothing_item;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE outfits (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id int not null,
            outfit_name varchar(100) not null,
            clothing_item1 int not null references clothing_item(id),
            clothing_item2 int not null references clothing_item(id),
            clothing_item3 int not null references clothing_item(id),
            outfit_category varchar(100) not null,
            outfit_gender varchar(100) not null,
            outfit_description text
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE outfits;
        """
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
        """
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
        """
    ]

]

# CREATE TABLE clothing_item(
# 	id SERIAL PRIMARY KEY NOT NULL,
#     item_brand varchar(100) not null,
# 	item_name varchar(100) not null,
# 	item_color varchar(100) not null,
# 	item_type varchar(100) not null,
#     item_category varchar(100) not null,
#     item_gender varchar(100) not null,
# 	item_picture bytea not null
#     );

# CREATE TABLE outfit (
# 	id SERIAL PRIMARY KEY NOT NULL,
# 	outfit_name varchar(100) not null,
# 	clothing_item1 int not null references clothing_item(id),
# 	clothing_item2 int not null references clothing_item(id),
# 	clothing_item3 int not null references clothing_item(id),
# 	outfit_category varchar(100) not null,
# 	outfit_gender varchar(100) not null,
# 	outfit_description text
# 	);

# CREATE TABLE post (
# 	id SERIAL PRIMARY KEY NOT NULL,
#     user_id int not null,
# 	outfit_id int not null references outfit(id),
# 	post_description text not null,
#     post_title varchar(100) not null
# 	);

# CREATE TABLE rating (
#     id SERIAL PRIMARY KEY NOT NULL,
#     user_id int not null,
#     post_id int not null references post(id),
#     rating int not null check (rating between 0 and 5)
#     );
