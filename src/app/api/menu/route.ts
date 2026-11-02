import { NextResponse } from 'next/server';
import { fetchMenuItems } from '../../../lib/firebase/firestoreService';

export async function GET() {
  try {
    const items = await fetchMenuItems();
    return NextResponse.json(items, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch menu';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
