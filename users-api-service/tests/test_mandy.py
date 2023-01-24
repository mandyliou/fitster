from fastapi.testclient import TestClient
from queries.users import UserRepository, DuplicateAccountError
from main import app

client = TestClient(app)


def test_duplicate_account():
    class fakeDuplicateUserQuery:
        def create(self, user, hashed_password):
            raise DuplicateAccountError

    app.dependency_overrides[UserRepository] = fakeDuplicateUserQuery
    response = client.post(
        "/users",
        json={
            "username": "mandyliou",
            "first_name": "mandy",
            "last_name": "liou",
            "email": "mandy@gmail.com",
            "password": "password",
            "profile_photo": "https://www.shorturl.at/img/shorturl-icon.png",
            "description": "cat",
        },
    )
    assert response.status_code == 400
    assert response.json() == {
        "detail": "Cannot create an account with those credentials"
    }
