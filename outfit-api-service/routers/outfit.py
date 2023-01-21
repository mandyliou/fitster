# from token_auth import get_current_user
from typing import List, Optional, Union
from fastapi import Depends, HTTPException, status, Response, APIRouter, Request
from queries.outfit import (
    Error,
    OutfitIn,
    OutfitOut,
    OutfitRepository,
    OutfitOutWithoutUserId
)
import os
from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
# from authenticator import authenticator
from token_auth import get_current_user
router = APIRouter()

@router.post("/api/user/outfit", response_model=Union[OutfitOut, Error])
def create_outfit(
    outfit: OutfitIn,
    account_data: dict = Depends(get_current_user),
    repo: OutfitRepository = Depends(),

):
    return repo.create(outfit, account_data.id)

@router.get('/outfit', response_model=Union[List[OutfitOut], Error])
def get_outfits(
    repo: OutfitRepository = Depends(),
):
    return repo.get_all()

@router.get('/outfit/{outfit_id}', response_model=Optional[OutfitOut])
def get_one_outfit(
    outfit_id: int,
    response: Response,
    repo: OutfitRepository = Depends(),
) -> OutfitOut:
    outfit=repo.get_one_outfit(outfit_id)
    if outfit is None:
        response.status_code=400
    return outfit

@router.delete('/outfit/{outfit_id}', response_model=bool)
def delete_outfit(
    outfit_id:int,
    repo: OutfitRepository=Depends(),
) -> bool:
    return repo.delete_outfit(outfit_id)

@router.put('/outfit/{outfit_id}', response_model=Union[OutfitOutWithoutUserId, Error])
def update_outfit(
    outfit_id:int,
    outfit:OutfitIn,
    repo:OutfitRepository=Depends(),
)-> Union[Error, OutfitOutWithoutUserId]:
    return repo.update_outfit(outfit_id, outfit)

@router.get('/outfit/{user_id}', response_model=Optional[OutfitOut])
def get_user_outfits(
    user_id:int,
    response:Response,
    repo: OutfitRepository=Depends(),
)-> OutfitOut:
    outfit=repo.get_user_outfits(user_id)
    if outfit is None:
        response.status_code=404
    return outfit


@router.get("/api/user/outfits", response_model=Union[List[OutfitOut], Error])
def get_outfits_user(
    response: Response,
    account_data: dict = Depends(get_current_user),
    repo: OutfitRepository = Depends(),
) -> OutfitOut:
    outfits = repo.get_user_outfits(account_data.id)
    if outfits is None:
        response.status_code = 404
    return outfits


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
