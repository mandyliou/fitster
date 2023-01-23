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

class OutfitOutWithoutUserId(BaseModel):
    id: int
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

    def get_user_outfits(self, user_id: int) -> Union[Error, List[OutfitOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , user_id
                        , outfit_name
                        , outfit_brand
                        , top
                        , bottom
                        , shoes
                        , outfit_category
                        , outfit_gender
                        , outfit_description
                        FROM outfits
                        WHERE user_id=%s
                        """,
                        [user_id]
                    )
                    return [
                        self.record_to_outfit_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {'alert':'could not get outfits'}

    def get_all(self)-> Union[Error, List[OutfitOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , user_id
                        , outfit_name
                        , outfit_brand
                        , top
                        , bottom
                        , shoes
                        , outfit_category
                        , outfit_gender
                        , outfit_description
                        FROM outfits
                        ORDER BY outfit_name;
                        """
                    )
                    return [
                        self.record_to_outfit_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {'alert':'could not get all outfits'}
    #get one outfit by outfit id
    def get_one_outfit(self, outfit_id: int)->Optional[OutfitOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , user_id
                        , outfit_name
                        , outfit_brand
                        , top
                        , bottom
                        , shoes
                        , outfit_category
                        , outfit_gender
                        , outfit_description
                        FROM outfits
                        WHERE id=%s
                        """,
                        [outfit_id]
                    )
                    record=result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_outfit_out(record)
        except Exception as e:
            print(e)
            return {'alert':'could not get outfit'}

    def delete_outfit(self, outfit_id: int)-> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM outfits
                        WHERE id=%s
                        """,
                        [outfit_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False
    def update_outfit(self, outfit_id: int, outfit:OutfitIn
    )-> Union[OutfitOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE outfits
                        SET outfit_name=%s
                            , outfit_brand=%s
                            , top=%s
                            , bottom=%s
                            , shoes=%s
                            , outfit_category=%s
                            , outfit_gender=%s
                            , outfit_description=%s
                        WHERE id=%s
                        """,
                        [
                            outfit.outfit_name,
                            outfit.outfit_brand,
                            outfit.top,
                            outfit.bottom,
                            outfit.shoes,
                            outfit.outfit_category,
                            outfit.outfit_gender,
                            outfit.outfit_description,
                            outfit_id,
                        ]
                        # old_data=vacation.dict()
                        # return VacationOut(id=vacation_id, **old_data)
                    )
                    old_outfit=outfit.dict()
                    return OutfitOutWithoutUserId(id=outfit_id, **old_outfit)
        except Exception as e:
            print(e)
            return {"message": "could not update outfit!"}

    def record_to_outfit_out(self, record):
        return OutfitOut(
            id=record[0],
            user_id=record[1],
            outfit_name=record[2],
            outfit_brand=record[3],
            top=record[4],
            bottom=record[5],
            shoes=record[6],
            outfit_category=record[7],
            outfit_gender=record[8],
            outfit_description=record[9],
        )
    def outfit_update(self, id:int, outfit:OutfitIn):
        old_data=outfit.dict()
        return OutfitOut(id=id, **old_data)
