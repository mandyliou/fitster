from typing import List, Optional, Union
from fastapi import Depends, HTTPException, status, Response, APIRouter, Request
from queries.post import (
    Error,
    PostIn,
    PostOut,
    PostRepository,
    PostOutwithPics
)
import os
from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
# from authenticator import authenticator
from token_auth import get_current_user
router = APIRouter()

@router.post("/posts", response_model=Union[PostOut, Error])
def create_post(
    post: PostIn,
    user_id: int,
    outfit_id: int,
    repo: PostRepository = Depends(),
    user: dict = Depends(get_current_user),
):
    return repo.create(post, user_id, outfit_id)


@router.get("/posts", response_model=Union[List[PostOutwithPics], Error])
def get_posts_user(
    response: Response,
    account_data: dict = Depends(get_current_user),
    repo: PostRepository = Depends(),
) -> PostOutwithPics:
    post = repo.get_user_posts(account_data.id)
    if post is None:
        response.status_code = 404
    return post
