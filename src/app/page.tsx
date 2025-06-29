'use client';

import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";
import HeroSection from "@/components/HeroSection";
import AboutPage from '@/components/AboutPage';
import Showcase from "@/components/Showcase";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactUs from "@/components/ContactUs";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden scroll-smooth">
      <section id="home">
        <HeroSection />
      </section>
      <section id="about">
        <AboutPage />
      </section>
      <section id="showcase">
        <Showcase />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
    </div>
  );
}
