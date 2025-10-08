import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper: generate short enquiry ID
function generateEnquiryId() {
  const rand = Math.floor(1000 + Math.random() * 9000); // random 4-digit
  return `HOL-${Date.now().toString().slice(-5)}-${rand}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, phone, interest, dates, message } = req.body;

  try {
    // Fallbacks
    const guestName = name?.trim() || "Guest";
    const interestType = interest || "General Enquiry";
    const datePref = dates?.trim() || "No dates provided";
    const enquiryId = generateEnquiryId();

    // 1. Send enquiry to lodge
    await resend.emails.send({
      from: process.env.CONTACT_FROM || "onboarding@resend.dev",
      to: process.env.CONTACT_TO,
      subject: `📩 [${enquiryId}] ${interestType} enquiry from ${guestName} (${datePref})`,
      html: `
        <h2>New Booking Enquiry</h2>
        <p><strong>Enquiry ID:</strong> ${enquiryId}</p>
        <p><strong>Name:</strong> ${guestName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Interest:</strong> ${interestType}</p>
        <p><strong>Dates:</strong> ${datePref}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
    });

    // 2. Auto-reply to the guest (with CC to lodge)
    if (email) {
      await resend.emails.send({
        from: process.env.CONTACT_FROM || "onboarding@resend.dev",
        to: email,
        cc: process.env.CONTACT_TO,   // lodge gets copy
        subject: `✅ [${enquiryId}] Enquiry received — ${interestType} at Holbank River Lodge`,
        html: `
          <p>Dear ${guestName},</p>
          <p>Thank you for your enquiry about <strong>${interestType}</strong> at Holbank River Lodge.</p>
          <p>We have noted your preferred dates: <strong>${datePref}</strong>.</p>
          <p>Your enquiry reference is <strong>${enquiryId}</strong>. Please mention this ID if you follow up, it helps us track your booking quickly.</p>
          <p>Our team will contact you within 24 hours to confirm availability and discuss details.</p>
          <p>📍 Holbank River Lodge<br/>
             📞 +27 (replace with real phone)<br/>
             🌍 <a href="https://www.holbankriverlodge.com">www.holbankriverlodge.com</a></p>
          <p>We look forward to welcoming you!</p>
          <p>Warm regards,<br/>The Holbank River Lodge Team</p>
        `,
      });
    }

    return res.status(200).json({ ok: true, enquiryId });
  } catch (err) {
    console.error("❌ Booking error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
