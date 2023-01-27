from fastapi.testclient import TestClient
from queries.users import UserRepository
from main import app
from authenticator import authenticator

client = TestClient(app)

test_user = [
    {
            "id": 1,
            "username": "gabriel",
            "first_name": "gabriel",
            "last_name": "cruz",
            "email": "gabriel@gmail.com",
            "profile_photo": "https/www.shutterstock.com",
            "description": "misc",

    }
]


class EmptyRepo:
    def get_all(self):
        return test_user


def test_get_all():
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = EmptyRepo
    app.dependency_overrides[UserRepository] = EmptyRepo
    response = client.get("/users")
    assert response.status_code == 200
    assert response.json() == test_user
    app.dependency_overrides = {}
