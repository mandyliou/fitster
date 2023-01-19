# import os
# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError

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


# import os
# from jwtdown_fastapi.authentication import Authenticator

# class MyAuthenticator(Authenticator):
#     async def get_account_data(self):

#     # async def get_account_data(self, username: str, users):
#         pass

#     def get_account_getter(self):

#     # def get_account_getter(self, users):
#         pass


#     def get_hashed_password(self):
#     # def get_hashed_password(self, user) -> str:

#         # return user.password
#         pass

#     def get_account_data_for_cookie(self):
#         # return user.username, user.dict()
#         pass

# authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
