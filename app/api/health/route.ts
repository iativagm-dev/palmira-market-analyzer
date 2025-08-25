import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simulate a health check, e.g., database connection, external API reachability
    const isDatabaseUp = true; // Replace with actual database check
    const isExternalApiReachable = true; // Replace with actual external API check

    if (isDatabaseUp && isExternalApiReachable) {
      return NextResponse.json({ status: 'ok', message: 'All services are healthy', timestamp: new Date().toISOString() });
    } else {
      return NextResponse.json({ status: 'degraded', message: 'Some services are experiencing issues' }, { status: 500 });
    }
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ status: 'error', message: 'Health check failed due to an internal error', timestamp: new Date().toISOString() }, { status: 500 });
  }
}
