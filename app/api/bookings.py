from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.booking import Booking, Service, Master
from app.schemas.booking import BookingCreate, BookingResponse
from typing import List

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

@router.post("/", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(booking_data: BookingCreate, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == booking_data.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Выбранная услуга не найдена")

    if booking_data.master_id:
        master = db.query(Master).filter(Master.id == booking_data.master_id).first()
        if not master:
            raise HTTPException(status_code=404, detail="Выбранный специалист не найден")

    new_booking = Booking(**booking_data.model_dump())
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking

@router.get("/", response_model=List[BookingResponse])
def get_bookings(db: Session = Depends(get_db)):
    return db.query(Booking).order_by(Booking.created_at.desc()).all()
