from pydantic import BaseModel, ValidationError
from typing import Optional, List, Union
from queries.pool import pool
from fastapi import HTTPException

class Error(BaseModel):
    message: str


class RatingIn(BaseModel):
    user_id: int
    post_id: int
    rating: int

class RatingOut(BaseModel):
    user_id: int
    post_id: int
    rating: int


class RatingRepository:
    def create(self, rating: RatingIn, user_id: int, post_id: int) -> Union[RatingOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO posts
                            (user_id,
                            post_id,
                            rating)

                        VALUES
                            (%s, %s, %s)
                        RETURNING id
                        """,
                        [
                            user_id,
                            post_id,
                            rating.rating,
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = rating.dict()
                    return RatingOut(id=id, post_id=post_id, rating=rating, **old_data)
        except Exception:
            return {"message": "Failed to Post Rating"}

    def record_to_rating_out(self, record):
        return RatingOut(
            id=record[0],
            user_id=record[1],
            post_id=record[2],
            rating=record[3]
        )
