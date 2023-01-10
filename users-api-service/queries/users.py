from pydantic import BaseModel, HttpUrl, ValidationError
from typing import Optional, List, Union
from queries.pool import pool

class Error(BaseModel):
    message:str

class UserIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    profile_photo: HttpUrl
    description: str

class UserOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    profile_photo: HttpUrl
    description: str

class UserRepository:
    def get_one
    def get_all
    def create
    def update
    def delete

#FIX WITH GROUP TO GET IT TO A POINT TO PUSH
