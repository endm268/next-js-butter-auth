// lib/email.ts
export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    // Replace this with your actual email sending logic (e.g., using Nodemailer, Resend, etc.)
    console.log("Sending email to:", to);
    console.log("Subject:", subject);
    console.log("Text:", text);
  }
  