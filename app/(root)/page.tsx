import AuthButtons from "@/components/sheard/AuthButtons";
import SignOut from "@/components/sheard/Sign_out";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Home() {
  const incomingHeaders = await headers();

  const session = await auth.api.getSession({
    headers: incomingHeaders,
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md shadow-xl border">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            {session ? `👋 Welcome, ${session.user.name}` : "🔐 Please Sign In"}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          {/* أزرار تسجيل الدخول */}
          {!session && <AuthButtons />}

          {/* زر تسجيل الخروج */}
          {session && <SignOut />}

          {/* عرض حالة الجلسة */}
          <p className="text-sm text-muted-foreground">
            {session ? "You are currently logged in." : "Not authenticated."}
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
