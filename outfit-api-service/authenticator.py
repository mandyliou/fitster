import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self

    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        pass

    def get_account_getter(
        self

    ):
        # Return the users. That's it.
        pass

    def get_hashed_password(self):
        # Return the encrypted password value from your
        # account object
        pass

    def get_account_data_for_cookie(self):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        pass


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])

import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError




