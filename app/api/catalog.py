from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.booking import Service, Master
from app.schemas.catalog import ServiceResponse, MasterResponse

router = APIRouter(prefix="/api", tags=["Catalog"])

@router.get("/services", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    return db.query(Service).all()

@router.get("/masters", response_model=List[MasterResponse])
def get_masters(db: Session = Depends(get_db)):
    return db.query(Master).all()
