import json
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from home.models import Ritual
from .models import Booking


@csrf_exempt
@require_POST
def create_booking_api(request):
    try:
        if request.content_type == "application/json":
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.POST.dict()

        client_name = data.get("client_name") or data.get("name", "").strip()
        client_phone = data.get("client_phone") or data.get("phone", "").strip()
        client_email = data.get("client_email") or data.get("email", "").strip()

        if not client_name or not client_phone:
            return JsonResponse(
                {"success": False, "error": "Name and phone number are required."},
                status=400,
            )

        # Parse date
        raw_date = data.get("booking_date") or data.get("date")
        booking_date = None
        if raw_date:
            for fmt in ("%Y-%m-%d", "%d.%m.%Y", "%d/%m/%Y"):
                try:
                    booking_date = datetime.strptime(raw_date, fmt).date()
                    break
                except ValueError:
                    pass
        if not booking_date:
            booking_date = datetime.today().date()

        notes = data.get("notes", "").strip()

        # Service / Ritual lookup
        service_val = data.get("service_id") or data.get("service") or data.get("ritual")
        service_obj = None
        service_name = ""
        if service_val:
            if str(service_val).isdigit():
                service_obj = Ritual.objects.filter(id=int(service_val)).first()
            if not service_obj:
                service_obj = Ritual.objects.filter(name__icontains=str(service_val).strip()).first()
            if service_obj:
                service_name = service_obj.name
            else:
                service_name = str(service_val).strip()

        booking = Booking.objects.create(
            client_name=client_name,
            client_phone=client_phone,
            client_email=client_email,
            service=service_obj,
            service_name=service_name,
            booking_date=booking_date,
            booking_time=data.get("booking_time") or data.get("time", "12:00"),
            notes=notes,
            status=Booking.Status.PENDING,
        )

        return JsonResponse(
            {
                "success": True,
                "booking_id": booking.id,
                "message": f"Thank you, {client_name}! Your appointment for {booking.booking_date} has been received. Anna will confirm within 15 minutes.",
            },
            status=201,
        )

    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)
