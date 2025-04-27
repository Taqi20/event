"use client";

import Footer from "@/components/LandingPage/Footer";
import Features from "@/components/LandingPage/Features";
import Service from "@/components/LandingPage/Service";
import Testimonials from "@/components/LandingPage/Testimonials";
import Hero from "@/components/LandingPage/Hero";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <Service />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
