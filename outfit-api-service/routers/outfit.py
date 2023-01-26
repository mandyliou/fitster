from typing import List, Optional, Union
from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from queries.outfit import (
    Error,
    OutfitIn,
    OutfitOut,
    OutfitRepository,
    OutfitOutWithoutUserId,
)
from token_auth import get_current_user

router = APIRouter()


@router.post("/api/user/outfit", response_model=Union[OutfitOut, Error])
def create_outfit(
    outfit: OutfitIn,
    account_data: dict = Depends(get_current_user),
    repo: OutfitRepository = Depends(),
):
    return repo.create(outfit, account_data.id)


@router.get("/outfit", response_model=Union[List[OutfitOut], Error])
def get_outfits(
    repo: OutfitRepository = Depends(),
):
    return repo.get_all()


@router.get("/outfit/{outfit_id}", response_model=Optional[OutfitOut])
def get_one_outfit(
    outfit_id: int,
    response: Response,
    repo: OutfitRepository = Depends(),
) -> OutfitOut:
    outfit = repo.get_one_outfit(outfit_id)
    if outfit is None:
        response.status_code = 400
    return outfit


@router.delete("/outfit/{outfit_id}", response_model=bool)
def delete_outfit(
    outfit_id: int,
    repo: OutfitRepository = Depends(),
) -> bool:
    return repo.delete_outfit(outfit_id)


@router.put(
    "/outfit/{outfit_id}", response_model=Union[OutfitOutWithoutUserId, Error]
)
def update_outfit(
    outfit_id: int,
    outfit: OutfitIn,
    repo: OutfitRepository = Depends(),
) -> Union[Error, OutfitOutWithoutUserId]:
    return repo.update_outfit(outfit_id, outfit)


@router.get("/outfit/{user_id}", response_model=Optional[OutfitOut])
def get_user_outfits(
    user_id: int,
    response: Response,
    repo: OutfitRepository = Depends(),
) -> OutfitOut:
    outfit = repo.get_user_outfits(user_id)
    if outfit is None:
        response.status_code = 404
    return outfit


@router.get("/api/user/outfits", response_model=Union[List[OutfitOut], Error])
def get_outfits_user(
    response: Response,
    account_data: dict = Depends(get_current_user),
    repo: OutfitRepository = Depends(),
) -> OutfitOut:
    outfits = repo.get_user_outfits(account_data.id)
    if outfits is None:
        response.status_code = 404
    return outfits
