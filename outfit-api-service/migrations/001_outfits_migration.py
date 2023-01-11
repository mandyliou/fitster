steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE clothing_piece (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time
                TIMESTAMP
                NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE dummy;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE outfit (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time
                TIMESTAMP
                NOT NULL
                DEFAULT
                CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE big_dummy;
        """
    ]

]

CREATE TABLE clothing_item (
	id SERIAL PRIMARY KEY NOT NULL,
	item_name varchar(100) not null,
	item_color varchar(100) not null,
	item_type varchar(100) not null,
	item_description text,
	item_picture bytea not null,
	);

CREATE TABLE outfit (
	id SERIAL PRIMARY KEY NOT NULL,
	outfit_name varchar(100) not null,
	clothing_item foreign key not null,
	outfit_category varchar(100) not null,
	outfit_gender varchar(100) not null,
	outfit_description text,
	);

CREATE TABLE post (
	id SERIAL PRIMARY KEY NOT NULL,
	user foreign key not null,
	outfit foreign key not null,
	post_description not null text,
	rating smallint not null check(rating between 1 and 5),
	);
