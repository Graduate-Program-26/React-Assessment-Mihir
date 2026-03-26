import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LandingHero } from "@/components/LandingHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Landing Page`,
  description: `This is your the entry point to the app where you can proceed to login`,
}

export default async function Home() {
  const session = await auth();
  if (session) redirect("/landing");

  return <LandingHero />;
}