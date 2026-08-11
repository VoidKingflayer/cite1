from pydantic import BaseModel
from typing import Optional

class ServiceResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    duration_minutes: int
    price: float

    class Config:
        from_attributes = True

class MasterResponse(BaseModel):
    id: int
    name: str
    specialization: Optional[str]
    bio: Optional[str]

    class Config:
        from_attributes = True
