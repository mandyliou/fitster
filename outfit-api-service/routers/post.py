from typing import List, Optional, Union
from fastapi import (
    Depends,
    HTTPException,
    # status,
    Response,
    APIRouter,
    # Request,
)
from queries.post import (
    Error,
    PostIn,
    PostIn2,
    PostOut,
    PostRepository,
    PostOutWithoutUser,
    PostOutwithPics,
    PostOutWithPicsMore,
    PostOutWithPicsMore2,
    PostOutWithPicsMore3
)
# import os
# from fastapi import Depends, HTTPException
# from fastapi import Depends, HTTPException, status

# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
# from authenticator import authenticator
from token_auth import get_current_user

router = APIRouter()


@router.post("/api/posts", response_model=Union[PostOutWithPicsMore2, Error])
def create_post(
    post: PostIn2,
    account_data: dict = Depends(get_current_user),
    repo: PostRepository = Depends(),
):
    print(post)
    print(account_data)
    # post.poster_username=account_data.username
    # post.poster_first_name=account_data.first_name
    # post.poster_last_name=account_data.last_name
    # post.poster_email=account_data.email
    # post.poster_profile_photo=account_data.profile_photo
    # post.poster_description=account_data.description
    return repo.create(
        post, account_data.id,
        account_data.username,
        account_data.first_name,
        account_data.last_name,
        account_data.profile_photo,
        account_data.description,
        account_data.email,
        )


# @router.delete("/posts/{user_id}", response_model=bool)
# def delete_post(
#     user_id: int,
#     repo: PostRepository = Depends(),
# ) -> bool:
#     return repo.delete(user_id)


@router.get(
    "/api/user/posts", response_model=Union[List[PostOutWithPicsMore2], Error]
)
def get_posts_user(
    response: Response,
    account_data: dict = Depends(get_current_user),
    repo: PostRepository = Depends(),
) -> PostOutWithPicsMore2:
    post = repo.get_user_posts(account_data.id)
    if post is None:
        response.status_code = 404
    return post


@router.get("/posts", response_model=Union[List[PostOutWithPicsMore3], Error])
def get_all_posts(
    repo: PostRepository = Depends(),
    ):
    return repo.get_all()


@router.delete("/posts/{post_id}", response_model=Union[str, Error])
def delete_post(
    post_id: int,
    account_data: dict = Depends(get_current_user),
    repo: PostRepository = Depends(),
):
    result = repo.delete_user_post(post_id, account_data.id)
    if result is None:
        raise HTTPException(state_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}


@router.put("/posts/{post_id}", response_model=Union[List[PostOut], Error])
def update_post(
    post_id: int,
    post: PostIn,
    repo: PostRepository = Depends(),
) -> Union[Error, PostOut]:
    return repo.update_post(post_id, post)


@router.get("/posts/{post_id}", response_model=Optional[PostOutWithoutUser])
def get_post(
    post_id: int,
    response: Response,
    repo: PostRepository = Depends(),
) -> PostOutWithoutUser:
    post = repo.get_one_post(post_id)
    if post is None:
        response.status_code = 404
    return post

@router.get("/searchpost/{post_title}", response_model=Optional[PostOutWithPicsMore3])
def get_post_by_title(
    post_title: str,
    response: Response,
    repo: PostRepository = Depends(),
) -> PostOutwithPics:
    post = repo.get_post_by_title(post_title)
    if post is None:
        response.status_code = 404
    return post
