import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import BaseModel

<<<<<<<<< Temporary merge branch 1

class UserOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    profile_photo: str
    description: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = os.environ.get("SIGNING_KEY", "blah")
=========
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
>>>>>>>>> Temporary merge branch 2

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception

<<<<<<<<< Temporary merge branch 1
=========
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import BaseModel


class UserOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    profile_photo: str
    description: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = os.environ.get("SIGNING_KEY", "blah")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception
    user = UserOut(**payload.get("account"))
    if user is None:
        raise credentials_exception
    return user
