from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class BookingCreate(BaseModel):
    client_name: str
    client_phone: str
    client_email: Optional[EmailStr] = None
    service_id: int
    master_id: Optional[int] = None
    booking_date: datetime
    notes: Optional[str] = None

class BookingResponse(BaseModel):
    id: int
    client_name: str
    client_phone: str
    service_id: int
    master_id: Optional[int]
    booking_date: datetime
    notes: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
