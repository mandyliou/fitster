from typing import List, Optional, Union
from fastapi import Depends, HTTPException, status, Response, APIRouter, Request
from queries.rating import (
    Error,
    RatingIn,
    RatingOut,
    RatingRepository,
)
import os
from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
from authenticator import authenticator
# from token_auth import authenticator
router = APIRouter()

@router.post("/rating", response_model=Union[RatingOut, Error])
def create_rating(
    post: RatingIn,
    user_id: int,
    post_id: int,
    repo: RatingRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(post, user_id, post_id)


