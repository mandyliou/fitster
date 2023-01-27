from fastapi.testclient import TestClient
from queries.post import PostRepository
from main import app
from token_auth import get_current_user
client = TestClient(app)

test_post = [
    {
            "id": 1,
            "user_id": 1,
            "outfit_id": 1,
            "post_description": "post description",
            "post_title": "post title",
            "top": "post top",
            "bottom": "post bottom",
            "shoes": "post shoes",
            "outfit_category": "str",
            "outfit_gender": "str",
            "outfit_description": "str",
            "outfit_name": "str",
            "outfit_brand": "str",

    }
]


class EmptyRepo:
    def get_all(self):
        return test_post


def test_get_all():
    app.dependency_overrides[get_current_user] = EmptyRepo
    app.dependency_overrides[PostRepository] = EmptyRepo
    response = client.get("/posts")
    assert response.json() == test_post
