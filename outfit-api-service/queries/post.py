from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class PostIn(BaseModel):
    outfit_id: int
    post_description: str
    post_title: str


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


class PostRepository:
    def create(self, post: PostIn, user_id: int) -> Union[PostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO posts
                            (user_id,
                            outfit_id,
                            post_description,
                            post_title)

                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            user_id,
                            post.outfit_id,
                            post.post_description,
                            post.post_title,
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = post.dict()
                    return PostOut(id=id, user_id=user_id, **old_data)
        except Exception:
            return {"message": "Failed to Post outfit"}

    def get_user_posts(
        self, user_id: int
    ) -> Union[Error, List[PostOutWithPicsMore]]:
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
                        WHERE posts.user_id = %s
                        """,
                        [user_id],
                    )
                    return [
                        self.record_to_post_out_with_pics_and_more(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def get_all(self) -> Union[Error, List[PostOutWithPicsMore]]:
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
                        JOIN outfits ON posts.outfit_id = outfits.id;
                        """
                    )
                    return [
                        self.record_to_post_out_with_pics_and_more(record)
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
    def get_one_post(self, id: int) -> Optional[PostOutWithoutUser]:
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

    def get_post_by_title(
        self, post_title: str
    ) -> Optional[PostOutWithPicsMore]:
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
                    return self.record_to_post_out_with_pics_and_more(record)
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
            outfit_description=record[10],
            outfit_name=record[11],
            outfit_brand=record[12],
        )
