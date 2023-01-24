from queries.post import PostRepository, PostOutwithPics, Error, PostIn
from main import app
from fastapi.testclient import TestClient
from typing import Union, List
from authenticator import authenticator
from token_auth import get_current_user

client=TestClient(app)

post_out_with_pics=PostOutwithPics(
    id=1,
    user_id=1,
    outfit_id=1,
    post_description="post description",
    post_title="post title",
    top="top.com",
    bottom="bottom.com",
    shoes="shoes.com"
)

class AccountData:
    def __init__(self, id:int):
        self.id=id

class FakePostRepository:
    def get_one_post(self, post_id: int) -> Union[Error, List[PostOutwithPics]]:
        return post_out_with_pics

def fake_authenticator():
    pass

def test_get_post():
    app.dependency_overrides[
        authenticator.get_account_data
    ]=fake_authenticator
    app.dependency_overrides[
        PostRepository
    ]=FakePostRepository
    response=client.get("/post/1")
    assert response.status_code==200
    assert response.json()==post_out_with_pics
