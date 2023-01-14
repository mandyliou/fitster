from pydantic import BaseModel, ValidationError
from typing import Optional, List, Union
from queries.pool import pool
from fastapi import HTTPException

class Error(BaseModel):
    message:str

class OutfitIn(BaseModel):
    outfit_name: str
    clothing_item1: int
    clothing_item2: int
    clothing_item3: int
    outfit_category: str
    outfit_gender: str
    outfit_description: str


class OutfitOut(BaseModel):
    id: int
    outfit_name: str
    clothing_item1: int
    clothing_item2: int
    clothing_item3: int
    outfit_category: str
    outfit_gender: str
    outfit_description: str



class OutfitRepository:
    def create(self, outfit: OutfitIn) -> Union[OutfitOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO outfit
                            (outfit_name,
                            clothing_item1,
                            clothing_item2,
                            clothing_item3,
                            outfit_category,
                            outfit_gender,
                            outfit_description)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            outfit.outfit_name,
                            outfit.clothing_item1,
                            outfit.clothing_item2,
                            outfit.clothing_item3,
                            outfit.outfit_category,
                            outfit.outfit_gender,
                            outfit.outfit_description,
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = outfit.dict()
                    return OutfitOut(id=id, **old_data)
        except Exception:
            return {"message": "Failed to Create outfit"}
