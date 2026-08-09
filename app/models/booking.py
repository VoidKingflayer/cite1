from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

class BookingStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    duration_minutes = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

    bookings = relationship("Booking", back_populates="service")

class Master(Base):
    __tablename__ = "masters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    specialization = Column(String(150), nullable=True)
    bio = Column(Text, nullable=True)

    bookings = relationship("Booking", back_populates="master")

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(100), nullable=False)
    client_phone = Column(String(20), nullable=False)
    client_email = Column(String(100), nullable=True)
    
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    master_id = Column(Integer, ForeignKey("masters.id"), nullable=True)
    
    booking_date = Column(DateTime, nullable=False)
    status = Column(String(20), default=BookingStatus.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)

    service = relationship("Service", back_populates="bookings")
    master = relationship("Master", back_populates="bookings")
