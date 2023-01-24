from fastapi.testclient import TestClient
from queries.outfit import OutfitRepository
from main import app
from token_auth import get_current_user
client = TestClient(app)

test_outfit = [
    {
            "id": 1,
            "user_id": 1,
            "outfit_name": "happy",
            "outfit_brand": "nike",
            "top": "top",
            "bottom": "bottom",
            "shoes": "shoes",
            "outfit_category": "casual",
            "outfit_gender": "male",
            "outfit_description": "nice fit",
    }
]


class EmptyRepo:
    def get_all(self):
        return test_outfit


def test_get_all():
    app.dependency_overrides[get_current_user] = EmptyRepo
    app.dependency_overrides[OutfitRepository] = EmptyRepo
    response = client.get("/outfit")
    assert response.json() == test_outfit
