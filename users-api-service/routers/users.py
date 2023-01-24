from fastapi import Depends, HTTPException, status, Response, APIRouter, Request
from typing import List, Optional, Union
from queries.users import (
    Error,
    UserIn,
    UserOut,
    UserRepository,
    DuplicateAccountError
)
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token

from pydantic import BaseModel


class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: UserOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


@router.get("/users/{user_id}", response_model=Optional[UserOut])
def get_one_user(
    user_id: int,
    response: Response,
    user: dict = Depends (authenticator.try_get_current_account_data),
    repo: UserRepository = Depends(),
) -> UserOut:
    user = repo.get_one_by_id(user_id)
    if user is None:
        response.status_code = 404
    return user


@router.post("/users", response_model=Union[AccountToken, Error])
async def create_user(
    user: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(user.password)
    try:
        account = repo.create(user, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=user.username, password=user.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/users", response_model=Union[List[UserOut], Error])
def get_all(
    repo: UserRepository = Depends(),
):
    return repo.get_all()

@router.get("/users/{username}", response_model=Union[List[UserOut], Error])
def get_user_by_user(
    username: str,
    response=Response,
    repo: UserRepository = Depends(),
) -> UserOut:
    user = repo.get_one(username)
    if user is None:
        response.status_code = 404
    return user

@router.put("/users/{user_id}", response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserIn,
    repo: UserRepository = Depends(),
) -> Union[Error, UserOut]:
    return repo.update(user_id, user)

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }

@router.get("/users/current", response_model=UserOut)
def get_user_by_info(
    account: UserOut = Depends(authenticator.get_current_account_data)):
    return account
