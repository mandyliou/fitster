# from token_auth import get_current_user
from typing import List, Optional, Union
from fastapi import Depends, HTTPException, status, Response, APIRouter, Request
from queries.outfit import (
    Error,
    OutfitIn,
    OutfitOut,
    OutfitRepository,
)
import os
from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
from authenticator import authenticator
# from token_auth import authenticator
router = APIRouter()

@router.post("/outfit/{user_id}", response_model=Union[OutfitOut, Error])
def create_outfit(
    outfit: OutfitIn,
    user_id: int,
    repo: OutfitRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(outfit, user_id)

# usersURL = os.environ.get("REACT_APP_USERS_SERVICE_API_HOST", "localhost:8000")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{usersURL}/token")
# SECRET_KEY = os.environ.get("SIGNING_KEY", "blah")

# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY)
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
#     user = payload.get("account")
#     if user is None:
#         raise credentials_exception
#     return user


# not_authorized = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Invalid authentication credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )


# @router.post("/outfit", response_model=OutfitOut)
# def create_outfit(
#     outfit: OutfitIn,
#     # user_id: int,
#     repo: OutfitRepository = Depends(),
#     user: dict = Depends(authenticator.get_current_account_data),
# ):
#     return repo.create(outfit, user["id"])



# @router.get("/outfit", response_model=OutfitOut)
# def get_all(
#     repo: OutfitRepository = Depends(),
#     user_data: dict = Depends(get_current_user),
# ):
#     return OutfitOut(outfit=repo.get_all(user_data["id"]))

# @router.post("/outfit/create/{user_id}", response_model=OutfitOut)
# def create_outfit(
#     outfit: OutfitIn,
#     user_id: int,
#     queries: OutfitRepository = Depends(),
#     user: dict = Depends(get_current_user),
# ):
#     if user:
#         return queries.create(outfit, user_id)
