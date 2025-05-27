
import { useState } from "react";
import { supabase } from "../lib/supabase";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <input className="p-2 border" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="p-2 border" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2" onClick={handleLogin}>Login</button>
      <button className="bg-gray-500 text-white p-2" onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
