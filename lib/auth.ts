// lib/auth.ts
import { betterAuth } from "better-auth";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "@/lib/server/email"; // تأكد أن المسار صحيح

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, req) => {
      const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}&callbackURL=/signin`;

      await sendEmail({
        to: user.email,
        subject: "تفعيل البريد الإلكتروني",
        text: `مرحبًا ${user.name || ""}،\n\nيرجى الضغط على الرابط التالي لتفعيل بريدك الإلكتروني:\n${fullUrl}\n\nإذا لم تطلب هذا، يمكنك تجاهل الرسالة.`,
      });
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  plugins: [nextCookies()],
});
