# from pydantic import BaseModel, ValidationError
# from typing import Optional, List, Union
# from queries.pool import pool
# from fastapi import HTTPException

# class Error(BaseModel):
#     message: str

# class StarIn(BaseModel):
#     user_id: int
#     post_id: int
#     rating: int

# class StarOut(BaseModel):
#     id: int
#     user_id: int
#     post_id: int
#     rating: int


# class StarRepository:
#     def create(self, rating: StarIn, user_id: int,
# post_id: int) -> Union[StarOut, Error]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         INSERT INTO posts
#                             (user_id,
#                             post_id,
#                             rating)

#                         VALUES
#                             (%s, %s, %s)
#                         RETURNING id
#                         """,
#                         [
#                             user_id,
#                             post_id,
#                             rating.rating,
#                         ]
#                     )
#                     id = result.fetchone()[0]
#                     old_data = rating.dict()
#                     return StarOut(id=id, post_id=post_id,
# rating=rating, **old_data)
#         except Exception:
#             return {"message": "Failed to Post Rating"}

#     def update(self, rating: StarIn,
# user_id: int, post_id: int) -> Union[StarOut, Error]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         UPDATE posts
#                         SET rating = %s
#                         WHERE user_id = %s AND post_id = %s
#                         RETURNING id, user_id, post_id, rating
#                         """,
#                         [
#                             rating.rating,
#                             user_id,
#                             post_id
#                         ]
#                     )
#                     record = result.fetchone()
#                     return self.record_to_rating_out(record)
#         except Exception:
#             return {"message": "Failed to Update Rating"}


#     def record_to_rating_out(self, record):
#         return StarOut(
#             id=record[0],
#             user_id=record[1],
#             post_id=record[2],
#             rating=record[3]
#         )
