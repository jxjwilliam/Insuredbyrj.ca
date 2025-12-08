import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Contact inquiry API endpoint
 * Handles form submissions from the contact inquiry form
 * Sends email notifications using Resend
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

    // Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONFIGURATION_ERROR',
            message: 'Email service is not configured. Please contact us directly.',
            retryable: false,
            alternativeContact: {
              phone: '778-830-0142',
              email: 'infinity@insureline.com',
            },
          },
        },
        { status: 500 }
      )
    }

    const resend = new Resend(resendApiKey)
    const businessEmail = process.env.BUSINESS_EMAIL || 'infinity@insureline.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Insured by Rajan <onboarding@resend.dev>'

    // Prepare email content
    const inquirySubject = subject
      ? `Contact Inquiry: ${subject}`
      : 'New Contact Inquiry from Website'
    
    const inquiryHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3B82F6; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; display: block; }
            .value { color: #4b5563; }
            .message-box { background-color: white; padding: 15px; border-left: 4px solid #3B82F6; margin-top: 10px; }
            .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 5px 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Contact Inquiry</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${email}">${email}</a></span>
              </div>
              ${phone ? `
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value"><a href="tel:${phone.replace(/\s/g, '')}">${phone}</a></span>
              </div>
              ` : ''}
              ${subject ? `
              <div class="field">
                <span class="label">Subject:</span>
                <span class="value">${subject}</span>
              </div>
              ` : ''}
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field" style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
                <span class="value" style="font-size: 12px; color: #6b7280;">
                  Received on ${new Date().toLocaleString('en-US', { 
                    dateStyle: 'long', 
                    timeStyle: 'short',
                    timeZone: 'America/Vancouver'
                  })}
                </span>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0;">This email was sent from the Insured by Rajan website contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3B82F6; color: white; padding: 20px; border-radius: 5px 5px 0 0; text-align: center; }
            .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 5px 5px; }
            .contact-info { background-color: white; padding: 15px; margin-top: 15px; border-left: 4px solid #3B82F6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for reaching out to Insured by Rajan. We have received your inquiry and will get back to you as soon as possible.</p>
              <p>Our team typically responds within 24-48 hours during business hours (Monday-Friday, 9:00 AM - 5:00 PM PST).</p>
              <div class="contact-info">
                <p style="margin: 0 0 10px 0;"><strong>Your Inquiry Details:</strong></p>
                ${subject ? `<p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>` : ''}
                <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'long', 
                  timeStyle: 'short',
                  timeZone: 'America/Vancouver'
                })}</p>
              </div>
              <p style="margin-top: 20px;">If you have any urgent questions, please feel free to contact us directly:</p>
              <ul>
                <li><strong>Phone:</strong> <a href="tel:7788300142">778-830-0142</a></li>
                <li><strong>Email:</strong> <a href="mailto:infinity@insureline.com">infinity@insureline.com</a></li>
              </ul>
              <p>We look forward to assisting you with your life insurance needs.</p>
              <p>Best regards,<br><strong>The Insured by Rajan Team</strong></p>
            </div>
            <div class="footer">
              <p style="margin: 0;">Insured by Rajan - British Columbia's Trusted Life Insurance Agency</p>
              <p style="margin: 5px 0 0 0;">7155 120 Street, Delta, BC V4E 2B1</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send notification email to business
    const businessEmailResult = await resend.emails.send({
      from: fromEmail,
      to: businessEmail,
      replyTo: email,
      subject: inquirySubject,
      html: inquiryHtml,
    })

    if (businessEmailResult.error) {
      console.error('Failed to send business notification email:', businessEmailResult.error)
      // Continue anyway - we'll still try to send auto-reply
    }

    // Send auto-reply confirmation to user
    const autoReplyResult = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Thank You for Contacting Insured by Rajan',
      html: autoReplyHtml,
    })

    if (autoReplyResult.error) {
      console.error('Failed to send auto-reply email:', autoReplyResult.error)
      // Log error but don't fail the request if business email was sent
      if (businessEmailResult.error) {
        throw new Error('Failed to send emails')
      }
    }

    // Log successful submission
    console.log('Contact inquiry processed successfully:', {
      name,
      email,
      phone: phone || 'Not provided',
      subject: subject || 'No subject',
      timestamp: new Date().toISOString(),
      businessEmailSent: !businessEmailResult.error,
      autoReplySent: !autoReplyResult.error,
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

