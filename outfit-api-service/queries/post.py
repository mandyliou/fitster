from pydantic import BaseModel
# from pydantic import BaseModel, ValidationError
from typing import Optional, List, Union
from queries.pool import pool
# from fastapi import HTTPException


class Error(BaseModel):
    message: str


class PostIn(BaseModel):
    # user_id: int
    outfit_id: int
    post_description: str
    post_title: str

class PostIn2(BaseModel):
    # user_id: int
    outfit_id: int
    post_description: str
    post_title: str
    # poster_username: Optional[str]
    # poster_first_name: Optional[str]
    # poster_last_name: Optional[str]
    # poster_profile_photo: Optional[str]
    # poster_description: Optional[str]
    # poster_email: Optional[str]

class PostOut(BaseModel):
    id: int
    user_id: int
    outfit_id: int
    post_description: str
    post_title: str

class PostOutWithoutUser(BaseModel):
    id: int
    outfit_id: int
    post_description: str
    post_title: str


class PostOutwithPics(BaseModel):
    id: int
    user_id: int
    outfit_id: int
    post_description: str
    post_title: str
    top: str
    bottom: str
    shoes: str

class PostOutWithPicsMore(BaseModel):
    id: int
    user_id: int
    outfit_id: int
    post_description: str
    post_title: str
    top: str
    bottom: str
    shoes: str
    outfit_category: str
    outfit_gender: str
    outfit_description: str
    outfit_name: str
    outfit_brand: str

class PostOutWithPicsMore2(BaseModel):
    id: int
    user_id: int
    poster_username: str
    poster_first_name: str
    poster_last_name: str
    poster_profile_photo: str
    poster_description: str
    poster_email: str
    outfit_id: int
    post_description: str
    post_title: str

class PostOutWithPicsMore3(BaseModel):
    id: int
    user_id: int
    poster_username: str
    poster_first_name: str
    poster_last_name: str
    poster_profile_photo: str
    poster_description: str
    poster_email: str
    outfit_id: int
    post_description: str
    post_title: str
    top: str
    bottom: str
    shoes: str
    outfit_category: str
    outfit_gender: str
    outfit_name: str
    outfit_brand: str
    outfit_description: str

class PostRepository:
    def create(self, post: PostIn2,
    user_id: int,
    user_username: str,
    user_first_name: str,
    user_last_name:str,
    user_profile_photo:str,
    user_description:str,
    user_email:str,
    ) -> Union[PostOutWithPicsMore2, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print('alert')
                    result = db.execute(
                        """
                        INSERT INTO posts
                            (
                            user_id,
                            user_username,
                            user_first_name,
                            user_last_name,
                            user_profile_photo,
                            user_description,
                            user_email,
                            outfit_id,
                            post_description,
                            post_title
                            )

                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s )
                        RETURNING id;
                        """,
                        [
                            user_id,
                            user_username,
                            user_first_name,
                            user_last_name,
                            user_profile_photo,
                            user_description,
                            user_email,
                            post.outfit_id,
                            post.post_description,
                            post.post_title,
                        ],
                    )
                    print('alert1')
                    id = result.fetchone()[0]
                    old_data = post.dict()
                    print('alert2')
                    return PostOutWithPicsMore2(
                        id=id,
                        user_id=user_id,
                        poster_username=user_username,
                        poster_first_name=user_first_name,
                        poster_last_name=user_last_name,
                        poster_profile_photo=user_profile_photo,
                        poster_description=user_description,
                        poster_email=user_email,
                        **old_data)
        except Exception:
            return {"message": "Failed to Post outfit"}

    # def delete(self, user_id : int, outfit_id : int) -> bool:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     DELETE FROM posts
    #                     WHERE id = %s, %s,
    #                     """,
    #                     [
    #                         user_id,
    #                         outfit_id,
    #                     ]
    #                 )
    #                 return True
    #     except Exception as e:
    #         print(e)
    #         return False

    def get_user_posts(
        self, user_id: int
    ) -> Union[Error, List[PostOutWithPicsMore3]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT posts.*,
                        outfits.top,
                        outfits.bottom,
                        outfits.shoes,
                        outfits.outfit_category,
                        outfits.outfit_gender,
                        outfits.outfit_description,
                        outfits.outfit_name,
                        outfits.outfit_brand,
                        posts.user_id,
                        outfit_id,
                        post_description,
                        post_title
                        FROM posts
                        JOIN outfits ON posts.outfit_id = outfits.id
                        WHERE posts.user_id=%s
                        """,
                        [user_id],
                    )
                    return [
                        self.record_to_post_out_with_pics_and_more3(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def get_user_posts2(
        self, user_id: int
    ) -> Union[Error, List[PostOutWithPicsMore3]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT posts.*,
                        outfits.top,
                        outfits.bottom,
                        outfits.shoes,
                        outfits.outfit_category,
                        outfits.outfit_gender,
                        outfits.outfit_description,
                        outfits.outfit_name,
                        outfits.outfit_brand,
                        posts.user_id,
                        outfit_id,
                        post_description,
                        post_title
                        FROM posts
                        JOIN outfits ON posts.outfit_id = outfits.id
                        WHERE posts.user_id=%s
                        """,
                        [user_id],
                    )
                    return [
                        self.record_to_post_out_with_pics_and_more3(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def get_all(self) -> Union[Error, List[PostOutWithPicsMore3]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print('alert')
                    result = db.execute(
                        """
                        SELECT posts.*,
                        outfits.top,
                        outfits.bottom,
                        outfits.shoes,
                        outfits.outfit_category,
                        outfits.outfit_gender,
                        outfits.outfit_description,
                        outfits.outfit_name,
                        outfits.outfit_brand,
                        posts.user_id,
                        posts.user_username,
                        posts.user_first_name,
                        posts.user_last_name,
                        posts.user_profile_photo,
                        posts.user_description,
                        posts.user_email,
                        outfit_id,
                        post_description,
                        post_title
                        FROM posts
                        JOIN outfits ON posts.outfit_id = outfits.id;
                        """
                    )
                    print('alert2')
                    return [
                        self.record_to_post_out_with_pics_and_more3(record)
                        for record in result
                    ]
        except Exception:
            return {"alert": "could not get user posts"}

    def delete_user_post(
        self, post_id: int, user_id: int
    ) -> Union[str, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM posts
                        WHERE id=%s and user_id=%s
                        """,
                        [post_id, user_id],
                    )
                    if result == 0:
                        return None
                    return "Post deleted successfully."
        except Exception:
            return {"message": "Could not delete that post"}

    def update_post(self, post_id: int, post: PostIn) -> Union[PostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE posts
                        SET post_description=%s
                            , post_title=%s
                        WHERE id=%s
                        """,
                        [post.post_description, post.post_title],
                    )
                    return self.post_update(post_id, post)
        except Exception:
            return {"alert": "could not update post"}

    # get one post by post id
    def get_one_post(self, id: int) -> Optional[PostOutWithPicsMore2]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , user_id
                        , outfit_id
                        , post_description
                        , post_title
                        FROM posts
                        WHERE id=%s
                        """,
                        [id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_post_out(record)
        except Exception:
            return {"alert": "could not get post"}

    def get_post_by_title(self, post_title: str) -> Optional[PostOutWithPicsMore3]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT posts.*,
                        outfits.top,
                        outfits.bottom,
                        outfits.shoes,
                        outfits.outfit_category,
                        outfits.outfit_gender,
                        outfits.outfit_description,
                        outfits.outfit_name,
                        outfits.outfit_brand,
                        posts.user_id,
                        outfit_id,
                        post_description,
                        post_title
                        FROM posts
                        JOIN outfits ON posts.outfit_id = outfits.id
                        WHERE post_title=%s
                        """,
                        [post_title],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_post_out_with_pics_and_more3(record)
        except Exception:
            return {"alert": "could not get post"}

    def record_to_post_out(self, record):
        return PostOut(
            id=record[0],
            user_id=record[1],
            outfit_id=record[2],
            post_description=record[3],
            post_title=record[4],
        )

    def post_update(self, id: int, post: PostIn):
        old_data = post.dict()
        return PostOut(id=id, **old_data)

    def record_to_post_out_with_pics(self, record):
        return PostOutwithPics(
            id=record[0],
            user_id=record[1],
            outfit_id=record[2],
            post_description=record[3],
            post_title=record[4],
            top=record[5],
            bottom=record[6],
            shoes=record[7],
        )

    def record_to_post_out_with_pics_and_more(self, record):
        return PostOutWithPicsMore(
            id=record[0],
            user_id=record[1],
            outfit_id=record[2],
            post_description=record[3],
            post_title=record[4],
            top=record[5],
            bottom=record[6],
            shoes=record[7],
            outfit_category=record[8],
            outfit_gender=record[9],
            outfit_name=record[10],
            outfit_brand=record[11],
            outfit_description=record[12],
        )
    def record_to_post_out_with_pics_and_more2(self, record):
        return PostOutWithPicsMore2(
            id=record[0],
            user_id=record[1],
            poster_username=record[2],
            poster_first_name=record[3],
            poster_last_name=record[4],
            poster_profile_photo=record[5],
            poster_description=record[6],
            poster_email=record[7],
            outfit_id=record[8],
            post_description=record[9],
            post_title=record[10],
        )

    def record_to_post_out_with_pics_and_more3(self, record):
        return PostOutWithPicsMore3(
            id=record[0],
            user_id=record[1],
            poster_username=record[2],
            poster_first_name=record[3],
            poster_last_name=record[4],
            poster_profile_photo=record[5],
            poster_description=record[6],
            poster_email=record[7],
            outfit_id=record[8],
            post_description=record[9],
            post_title=record[10],
            top=record[11],
            bottom=record[12],
            shoes=record[13],
            outfit_category=record[14],
            outfit_gender=record[15],
            outfit_name=record[16],
            outfit_brand=record[17],
            outfit_description=record[18],
        )
