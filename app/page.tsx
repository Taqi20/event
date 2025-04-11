"use client";

import { FloatingNav } from "@/components/LandingPage/FloatingNavbar";
import Footer from "@/components/LandingPage/Footer";
import Features from "@/components/LandingPage/Features";
import Service from "@/components/LandingPage/Service";
import Testimonials from "@/components/LandingPage/Testimonials";
import Hero from "@/components/LandingPage/Hero";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <FloatingNav
        navItems={[
          { name: "Home", link: "#home", icon: "/home.png" },
          { name: "Works", link: "#service", icon: "/service.png" },
          { name: "Testimonials", link: "#testimonials", icon: "/testimonial.png" },
          { name: "About", link: "/about", icon: "/about.png" },
          { name: "Contact", link: "/contact", icon: "/contact.png" },
        ]}
      />
      <Hero />
      <Service />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
