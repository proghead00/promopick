import { HeroSection } from "@/components/base/HeroSection";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/options";

const App = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <HeroSection />
    </div>
  );
};

export default App;
