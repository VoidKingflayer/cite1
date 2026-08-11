const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ApiService {
  id: number;
  title: string;
  description: string | null;
  duration_minutes: number;
  price: number;
}

export interface ApiMaster {
  id: number;
  name: string;
  specialization: string | null;
  bio: string | null;
}

export interface BookingPayload {
  client_name: string;
  client_phone: string;
  client_email?: string;
  service_id: number;
  master_id?: number;
  booking_date: string;
  notes?: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.detail || `Ошибка запроса: ${response.status}`;
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  return response.json();
}

export const getServices = () => request<ApiService[]>('/api/services');

export const getMasters = () => request<ApiMaster[]>('/api/masters');

export const createBooking = (payload: BookingPayload) =>
  request('/api/bookings/', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
