import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
} from "@react-email/components";
import React from "react";

interface AutoReplyTemplateProps {
  name: string;
  message: string;
}

export const AutoReplyTemplate: React.FC<AutoReplyTemplateProps> = ({
  name,
  message,
}) => (
  <Html>
    <Head />
    <Body
      style={{
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <Container
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          margin: "20px auto",
          maxWidth: "600px",
          borderRadius: "8px",
        }}
      >
        <Heading style={{ color: "#0e7490", fontSize: "24px" }}>
          Thank You for Reaching Out, {name}!
        </Heading>
        <Text style={{ fontSize: "16px", lineHeight: "1.5" }}>
          I’ve received your message and will get back to you as soon as
          possible. I appreciate your interest and look forward to connecting!
        </Text>
        <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />
        <Text style={{ fontSize: "14px", color: "#4b5563" }}>
          <strong>Your Message:</strong>
          <br />
          {message}
        </Text>
        <Text style={{ fontSize: "14px", marginTop: "20px" }}>
          Best regards,
          <br />
          Kevin C. Sclafani (quietghost) <br />
        </Text>
      </Container>
    </Body>
  </Html>
);
