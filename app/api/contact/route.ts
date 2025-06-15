import { AutoReplyTemplate } from "@/components/AutoReplyTemplate";
import { renderAsync } from "@react-email/render";
import { NextResponse } from "next/server";
import type { ReactElement } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Send email to portfolio owner
    await resend.emails.send({
      from: "Portfolio Contact <contact@contact.quietghost.dev>",
      to: "quietghosttv@pm.me",
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // Pre-render AutoReplyTemplate to HTML
    const emailHtml = await renderAsync(
      AutoReplyTemplate({ name, message }) as ReactElement,
      {
        pretty: true,
      }
    );

    // Send auto-reply to the employer
    await resend.emails.send({
      from: "Portfolio Contact <contact@contact.quietghost.dev>",
      to: email,
      subject: "Thank You for Your Message!",
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}

