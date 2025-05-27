import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import { GradientText } from "./ui/gradient-text";
import { BoxReveal } from "./magicui/box-reveal";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen mb-10 flex-col gap-10 p-4">
      <BoxReveal>
        <span className="text-green-600">GreenStreak</span>
      </BoxReveal>
      <section className="flex flex-col gap-2 mt-5">
        <Input
          className="w-60"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="w-60"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <section className="flex gap-2 mt-5">
        <Button className=" cursor-pointer" onClick={handleLogin}>
          Login
        </Button>
        <Button
          className=" cursor-pointer"
          variant={"secondary"}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </section>
    </div>
  );
}
