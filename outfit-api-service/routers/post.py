from typing import List, Optional, Union
from fastapi import Depends, HTTPException, status, Response, APIRouter, Request
from queries.post import (
    Error,
    PostIn,
    PostOut,
    PostRepository,
)
import os
from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
from authenticator import authenticator
# from token_auth import authenticator
router = APIRouter()

@router.post("/posts/", response_model=Union[PostOut, Error])
def create_post(
    post: PostIn,
    user_id: int,
    outfit_id: int,
    repo: PostRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(post, user_id, outfit_id)


@router.get("/posts/{user_id}", response_model=Union[List[PostOut], Error])
def get_posts_user(
    user_id: int,
    response: Response,
    repo: PostRepository = Depends(),
) -> PostOut:
    post = repo.get_user_posts(user_id)
    if post is None:
        response.status_code = 404
    return post

@router.get('/posts', response_model=Union[List[PostOut], Error])
def get_all_posts(
    repo: PostRepository=Depends()
):
    return repo.get_all()

@router.delete('/posts/{post_id}', response_model=bool)
def delete_post(
    post_id:int,
    repo:PostRepository=Depends(),
)-> bool:
    return repo.delete_post(post_id)
@router.put('/posts/{post_id}', response_model=Union[List[PostOut], Error])
def update_post(
    post_id:int,
    post:PostIn,
    repo: PostRepository=Depends(),
)-> Union[Error, PostOut]:
    return repo.update_post(post_id, post)
@router.get('/posts/{post_id}', response_model=Optional[PostOut])
def get_post(
    post_id:int,
    response:Response,
    repo: PostRepository=Depends(),
)-> PostOut:
    post=repo.get_one_post(post_id)
    if post is None:
        response.status_code=404
    return post
