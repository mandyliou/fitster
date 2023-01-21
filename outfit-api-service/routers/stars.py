from typing import List, Optional, Union
from fastapi import Depends, HTTPException, status, Response, APIRouter, Request
from queries.stars import (
    Error,
    StarIn,
    StarOut,
    StarRepository,
)
import os
from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
# from authenticator import authenticator
from token_auth import get_current_user

router = APIRouter()

@router.post("/rating", response_model=Union[StarOut, Error])
def create_rating(
    post: StarIn,
    user_id: int,
    post_id: int,
    repo: StarRepository = Depends(),
    user: dict = Depends(get_current_user),
):
    return repo.create(post, user_id, post_id)
