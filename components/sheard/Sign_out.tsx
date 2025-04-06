"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SignOut() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      window.location.reload(); // ✅ نعمل refresh بعد النجاح
    } catch (err) {
      console.error("Sign out error:", err);
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSignOut} disabled={loading}>
      {loading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
