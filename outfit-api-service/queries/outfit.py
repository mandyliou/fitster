from pydantic import BaseModel, ValidationError
from typing import Optional, List, Union
from queries.pool import pool
from fastapi import HTTPException

class Error(BaseModel):
    message: str

class OutfitIn(BaseModel):
    # user_id: int
    outfit_name: str
    outfit_brand: str
    top: str
    bottom: str
    shoes: str
    outfit_category: str
    outfit_gender: str
    outfit_description: str


class OutfitOut(BaseModel):
    id: int
    user_id: int
    outfit_name: str
    outfit_brand: str
    top: str
    bottom: str
    shoes: str
    outfit_category: str
    outfit_gender: str
    outfit_description: str



class OutfitRepository:
    def create(self, outfit: OutfitIn, user_id: int) -> Union[OutfitOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO outfits
                            (user_id,
                            outfit_name,
                            outfit_brand,
                            top,
                            bottom,
                            shoes,
                            outfit_category,
                            outfit_gender,
                            outfit_description)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            user_id,
                            outfit.outfit_name,
                            outfit.outfit_brand,
                            outfit.top,
                            outfit.bottom,
                            outfit.shoes,
                            outfit.outfit_category,
                            outfit.outfit_gender,
                            outfit.outfit_description,
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = outfit.dict()
                    return OutfitOut(id=id, user_id=user_id, **old_data)
        except Exception:
            return {"message": "Failed to Create outfit"}
