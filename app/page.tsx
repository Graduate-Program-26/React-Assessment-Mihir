import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LandingHero } from "@/components/LandingHero";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/landing");

  return <LandingHero />;
}