// components/SignOutButton.tsx
"use client";

import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";

export function SignOutButton() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant={"destructive"}
     
    >
      Sign Out
    </Button>
  );
}
