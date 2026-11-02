import { NextRequest, NextResponse } from 'next/server';
import { submitCateringInquiry } from '../../../lib/firebase/firestoreService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.email || !body.eventDate) {
      return NextResponse.json(
        { error: 'Customer name, email, and event date are strictly required.' },
        { status: 400 }
      );
    }

    const result = await submitCateringInquiry({
      customerName: body.customerName,
      email: body.email,
      phone: body.phone || '',
      eventType: body.eventType || 'wedding',
      eventDate: body.eventDate,
      guestCount: Number(body.guestCount) || 50,
      packageId: body.packageId,
      specialRequests: body.specialRequests,
      venueLocation: body.venueLocation,
      estimatedQuote: body.estimatedQuote,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    console.error('API /api/bookings error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
