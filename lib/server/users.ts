"use server";

import { auth } from "@/lib/auth";
import { User } from "@/types/type";

export const signIn = async (object: User) => {
  try {
    console.log("🔐 Signing in user:", object);

    const res = await auth.api.signInEmail({
      body: {
        email: object.email,
        password: object.password as string,
      },
    });

    // ✅ تسجيل دخول ناجح
    return res;

  } catch (error: any) {
    console.error("❌ Sign in error:", error);

    // 🛑 حالة خاصة: البريد غير مفعل
    if (
      error?.statusCode === 403 &&
      error?.body?.message === "Email not verified"
    ) {
      throw new Error("يرجى تفعيل بريدك الإلكتروني قبل تسجيل الدخول.");
    }

    // ❌ أخطاء أخرى
    throw new Error(error?.body?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة.");
  }
};


export const signUp = async (object: User) => {
  try {
    const res = await auth.api.signUpEmail({
      body: {
        email: object.email,
        password: object.password as string,
        name: object.name as string,
      },
    });

    return res;

  } catch (error: any) {
    console.error("❌ Sign up error:", error);

    // 📌 الحالة الخاصة: المستخدم موجود مسبقًا
    if (
      error?.statusCode === 422 &&
      error?.body?.message === "User already exists"
    ) {
      throw new Error("هذا البريد الإلكتروني مسجل مسبقًا. حاول تسجيل الدخول.");
    }

    // ❌ حالات أخرى
    throw new Error(error?.body?.message || "فشل في إنشاء الحساب.");
  }
};
