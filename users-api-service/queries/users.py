from pydantic import BaseModel

# from pydantic import BaseModel, ValidationError
from typing import Optional, List, Union
from queries.pool import pool

# from fastapi import HTTPException


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    profile_photo: str
    description: str


class UserOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    profile_photo: str
    description: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class UserRepository:

    # def get(self, username: str) -> UserOutWithPassword:
    def get_one_by_id(self, user_id: int) -> Optional[UserOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , username
                        , first_name
                        , last_name
                        , email
                        , password
                        , profile_photo
                        , description
                        FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def get_one(self, username: str) -> Optional[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , username
                        , first_name
                        , last_name
                        , email
                        , password
                        , profile_photo
                        , description
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    # def get_one(self, username: str) -> Optional[UserOutWithPassword]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT id
    #                     , username
    #                     , first_name
    #                     , last_name
    #                     , email
    #                     , password
    #                     , profile_photo
    #                     , description
    #                     FROM users
    #                     WHERE id = %s
    #                     """,
    #                     [id]
    #                 )
    #                 record = result.fetchone()
    #                 if record is None:
    #                     return None
    #                 return self.record_to_user_out(record)
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not get that user"}

    def get_all(self) -> Union[Error, List[UserOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , username
                        , first_name
                        , last_name
                        , email
                        , password
                        , profile_photo
                        , description
                        FROM users
                        ORDER BY last_name;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     user = UserOut(
                    #         id=record[0],
                    #         username=record[1],
                    #         first_name=record[2],
                    #         last_name=record[3],
                    #         email=record[4],
                    #         password=record[5],
                    #         profile_photo=record[6],
                    #         description=record[7],
                    #     )
                    #     result.append(user)
                    # return result

                    return [
                        self.record_to_user_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def update(self, user_id: int, user: UserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET username = %s
                          , first_name = %s
                          , last_name = %s
                          , email = %s
                          , password = %s
                          , profile_photo = %s
                          , description = %s
                        WHERE id = %s
                        """,
                        [
                            user.username,
                            user.first_name,
                            user.last_name,
                            user.email,
                            user.password,
                            user.profile_photo,
                            user.description,
                            user_id,
                        ],
                    )
                    old_data = user.dict()
                    return UserOut(id=user_id, **old_data)
                    # return self.user_in_to_out(user_id, user)
        except Exception as e:
            print(e)
            return {"message": "Could not update that user"}

    def create(
        self, user: UserIn, hashed_password: str
    ) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (username,
                             first_name,
                             last_name,
                             email,
                             password,
                             profile_photo,
                             description)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.username,
                            user.first_name,
                            user.last_name,
                            user.email,
                            hashed_password,
                            user.profile_photo,
                            user.description,
                        ],
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    # old_data = user.dict()
                    # return UserOut(id=id, **old_data)
                    return self.user_in_to_out(id, user, hashed_password)
        except Exception:
            return {"message": "Create did not work"}

    def user_in_to_out(self, id: int, user: UserIn, hashed_password: str):
        old_data = user.dict()
        return UserOutWithPassword(
            id=id, hashed_password=hashed_password, **old_data
        )

    def record_to_user_out(self, record):
        return UserOutWithPassword(
            id=record[0],
            username=record[1],
            first_name=record[2],
            last_name=record[3],
            email=record[4],
            hashed_password=record[5],
            profile_photo=record[6],
            description=record[7],
        )
