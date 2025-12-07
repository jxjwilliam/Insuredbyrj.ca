import { NextResponse } from 'next/server'

/**
 * Contact inquiry API endpoint
 * Handles form submissions from the contact inquiry form
 * TODO: Integrate with email service provider or CRM system
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_NAME',
            message: 'Name is required',
          },
        },
        { status: 400 }
      )
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_EMAIL',
            message: 'Email is required',
          },
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_EMAIL',
            message: 'Please enter a valid email address',
          },
        },
        { status: 400 }
      )
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_MESSAGE',
            message: 'Message is required',
          },
        },
        { status: 400 }
      )
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // TODO: In production, this would:
    // 1. Send email notification to the business owner
    // 2. Store inquiry in database/CRM
    // 3. Send auto-reply confirmation to the user
    // 4. Integrate with email service (SendGrid, Mailgun, etc.)

    // Mock successful submission
    console.log('Contact inquiry received:', {
      name,
      email,
      phone: phone || 'Not provided',
      subject: subject || 'No subject',
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. We will get back to you soon.',
      inquiryId: `inq_${Date.now()}`,
    })
  } catch (error) {
    console.error('Contact inquiry error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message:
            'Please try again later or contact us directly at infinity@insureline.com or 778-830-0142',
          retryable: true,
          alternativeContact: {
            phone: '778-830-0142',
            email: 'infinity@insureline.com',
          },
        },
      },
      { status: 500 }
    )
  }
}
