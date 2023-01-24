# from typing import List, Optional, Union
# from fastapi import Depends, HTTPException,
# status, Response, APIRouter, Request
# from queries.stars import (
#     Error,
#     StarIn,
#     StarOut,
#     StarRepository,
# )
# import os
# from fastapi import Depends, HTTPException, status
# from token_auth import get_current_user

# router = APIRouter()

# @router.post("/rating", response_model=Union[StarOut, Error])
# def create_rating(
#     post: StarIn,
#     user_id: int,
#     post_id: int,
#     repo: StarRepository = Depends(),
#     user: dict = Depends(get_current_user),
# ):
#     return repo.create(post, user_id, post_id)

# @router.put("/rating/{post_id}",
# response_model=Union[StarOut, Error])
# def update_rating(
#     post_id: int,
#     post: StarIn,
#     repo: StarRepository = Depends(),
#     user: dict = Depends(get_current_user),
# ):
#     return repo.update(post, user["id"], post_id)
