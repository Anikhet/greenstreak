"use client";
import { Auth } from "@/components/Auth";
import { useUser } from "@/lib/useUser";
import { Timer } from "@/components/Timer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Heatmap } from "@/components/Heatmap";

import { HeatmapEntry } from "@/lib/types";
import { SignOutButton } from "@/components/SignOut";

export default function Home() {
  const user = useUser();


  const [data, setData] = useState<HeatmapEntry[]>([]);

  useEffect(() => {
    if (user) {
      supabase
        .from("work_sessions")
        .select("date, minutes_worked")
        .eq("user_id", user.id)
        .then(({ data }) => setData((data as HeatmapEntry[]) || []));
    }
  }, [user]);

  if (!user) return <Auth />;

  return (
    <main className="flex flex-col bg-neutral- items-center justify-center min-h-screen p-10 relative ">
      <nav className="absolute top-0 right-0 p-4">
        {user.id}
        <SignOutButton/>
      </nav>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <section className="w-full max-w-1/2 mb-10">
        <Timer user={user} />
        <section className="w-full ">
          <Heatmap data={data} />
        </section>
      </section>
    </main>
  );
}
