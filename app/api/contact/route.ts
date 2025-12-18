import { renderAutoReplyEmail } from "@/lib/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Send main email to portfolio owner (critical)
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

    // Try to send auto-reply (non-critical - failure is okay)
    try {
      const emailHtml = renderAutoReplyEmail(name, message);

      // Retry logic for auto-reply
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
          break;
        } catch (sendError) {
          retryCount++;
          if (retryCount === maxRetries) {
            throw sendError;
          }
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, retryCount) * 1000),
          );
        }
      }
    } catch (autoReplyError) {
      console.error("Error sending auto-reply (non-critical):", autoReplyError);
      return NextResponse.json({
        success: true,
        autoReplySent: false,
        warning: "Message received but auto-reply failed to send",
      });
    }

    return NextResponse.json({
      success: true,
      autoReplySent: true,
    });
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
