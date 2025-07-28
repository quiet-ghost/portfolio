import { AutoReplyTemplate } from "@/components/AutoReplyTemplate";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import type { ReactElement } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Send email to portfolio owner
    await resend.emails.send({
      from: "Portfolio Contact <contact@contact.quietghost.dev>",
      to: "ksclafani@quietghost.dev",
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    try {
      // Pre-render AutoReplyTemplate to HTML with error handling
      let emailHtml;
      try {
        emailHtml = await render(
          AutoReplyTemplate({ name, message }) as ReactElement,
          {
            pretty: true,
          },
        );
      } catch (renderError) {
        console.error("Error rendering template:", renderError);
        // Fallback to simple HTML if template rendering fails
        emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h1 style="color: #2563eb; margin-bottom: 20px;">Thank You for Reaching Out!</h1>
            <p>Dear ${name},</p>
            <p>Thank you for taking the time to contact me. I have received your message and will get back to you as soon as possible.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-style: italic;">"${message}"</p>
            </div>
            <p>Best regards,<br/>QuietGhost</p>
          </div>
        `;
      }

      // Send auto-reply to the employer with retry
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          await resend.emails.send({
            from: "Portfolio Contact <contact@contact.quietghost.dev>",
            to: email,
            subject: "Thank You for Your Message!",
            html: emailHtml,
          });
          break; // Success, exit the retry loop
        } catch (sendError) {
          retryCount++;
          if (retryCount === maxRetries) {
            throw sendError; // Re-throw if all retries failed
          }
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, retryCount) * 1000),
          );
        }
      }
    } catch (autoReplyError) {
      console.error("Error sending auto-reply:", autoReplyError);
      // Continue with the response even if auto-reply fails
      return NextResponse.json({
        success: true,
        warning: "Message received but auto-reply failed to send",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in contact form submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
