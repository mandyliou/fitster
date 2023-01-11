steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username varchar(100) not null unique,
            first_name varchar(100) not null,
            last_name varchar(100) not null,
            email varchar(100) not null unique,
            password varchar(100) not null,
            profile_photo bytea,
            description text
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ]
]
