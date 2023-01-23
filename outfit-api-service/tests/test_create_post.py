from queries.post import PostRepository, PostOut, Error, PostIn
from main import app
from fastapi.testclient import TestClient
from typing import Union
from token_auth import get_current_user



class AccountData:
    def __init__(self, id: int):
        self.id = id


class FakePostRepository:
    def create(self, post, user_id: int) -> Union[PostOut, Error]:
        post_data = post.dict()
        post_data["id"] = 1
        post_data["user_id"] = user_id
        return PostOut(**post_data)


def fake_get_current_user():
    return AccountData(id=1)


expected_response = {
    "id": 1, "user_id": 1, "outfit_id": 10,
    "post_description": "Test Unit Post", "post_title": "Test Unit Title"
}

client = TestClient(app)

def test_create_post():
    app.dependency_overrides[PostRepository] = FakePostRepository
    app.dependency_overrides[get_current_user] = fake_get_current_user


    post_data = PostIn(
        outfit_id=10,
        post_description="Test Unit Post",
        post_title="Test Unit Title",

    )

    response = client.post("/api/posts", json=post_data.dict())
    assert response.status_code == 200
    assert response.json() == expected_response
