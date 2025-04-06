"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function AuthButtons() {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button onClick={() => router.push("/signin")}>Sign In</Button>
      <Button onClick={() => router.push("/signup")}>Sign Up</Button>
    </div>
  );
}
