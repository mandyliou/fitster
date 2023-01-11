from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.users import (
    Error,
    UserIn,
    UserOut,
    UserRepository,
)

router = APIRouter()


@router.get("/users/{user_id}", response_model=Optional[UserOut])
def get_one_user(
    user_id: int,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserOut:
    user = repo.get_one(user_id)
    if user is None:
        response.status_code = 404
    return user


@router.post("/users", response_model=Union[UserOut, Error])
def create_user(
    user: UserIn,
    response: Response,
    repo: UserRepository = Depends(),
):
    try:
        return repo.create(user) 
    except: 
        response.status_code = 400
    


@router.get("/users", response_model=Union[List[UserOut], Error])
def get_all(
    repo: UserRepository = Depends(),
):
    return repo.get_all()


@router.put("/users/{user_id}", response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserIn,
    repo: UserRepository = Depends(),
) -> Union[Error, UserOut]:
    return repo.update(user_id, user)






