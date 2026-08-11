from fastapi import APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from pathlib import Path
from app.database import get_db
from app.models.booking import Booking
from app.auth import verify_admin

BASE_DIR = Path(__file__).resolve().parent.parent
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

router = APIRouter()

@router.get("/admin", dependencies=[Depends(verify_admin)])
def admin_page(request: Request, db: Session = Depends(get_db)):
    bookings = db.query(Booking).order_by(Booking.created_at.desc()).all()
    return templates.TemplateResponse(
        request=request,
        name="admin/dashboard.html",
        context={"bookings": bookings}
    )

