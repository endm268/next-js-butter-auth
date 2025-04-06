"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("جارٍ التحقق من بريدك الإلكتروني...");

  useEffect(() => {
    const token = searchParams.get("token");
    const callbackURL = searchParams.get("callbackURL") || "/";

    if (!token) {
      setStatus("error");
      setMessage("رمز التحقق غير صالح أو مفقود.");
      return;
    }

    authClient.verifyEmail(token as any)
      .then(() => {
        setStatus("success");
        setMessage("تم تفعيل البريد الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول.");
        setTimeout(() => router.push(callbackURL), 3000);
      })
      .catch(() => {
        setStatus("error");
        setMessage("فشل في تفعيل البريد الإلكتروني. تأكد من أن الرابط صالح.");
      });
  }, [searchParams, router]);

  const renderIcon = () => {
    if (status === "loading") return <Loader2 className="animate-spin w-6 h-6" />;
    if (status === "success") return <CheckCircle className="text-green-500 w-6 h-6" />;
    return <XCircle className="text-red-500 w-6 h-6" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center space-y-4 p-6">
        <div className="flex justify-center">{renderIcon()}</div>
        <h2 className="text-xl font-semibold">{message}</h2>
        {status === "error" && (
          <Button onClick={() => router.push("/signin")}>
            العودة لتسجيل الدخول
          </Button>
        )}
      </Card>
    </div>
  );
}
