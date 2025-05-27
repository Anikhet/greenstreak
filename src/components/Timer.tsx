import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";

export function Timer({ user }: { user: User }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);


  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (running) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const saveWork = async () => {
    const minutes = Math.floor(seconds / 60);
    const today = new Date().toISOString().split("T")[0];

    await supabase
      .from("work_sessions")
      .insert({
        user_id: user.id,
        date: today,
        minutes_worked: minutes,
      });
    }

  return (
    <div className="p-4 flex flex-col items-center gap-2">
      <h1 className="text-6xl font-semibold">{Math.floor(seconds / 60)}m {seconds % 60}s</h1>
      <section className="flex gap-5 mt-10">      
        <Button className=" text-white px-4 py-2" onClick={() => setRunning(!running)}>
        Start
      </Button>
        <Button className=" text-white px-4 py-2" onClick={() => setRunning(!running)}>
        Pause
      </Button>
      </section>

      <Button
      disabled={running?false: true} className=" mt-10 mb-10 px-4 py-2" onClick={saveWork}>
        Save
      </Button>
    </div>
  );
}
