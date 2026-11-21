"use client";

import SmoothScrollProvider from "@/components/site/SmoothScrollProvider";
import Navbar from "@/components/site/Navbar";
import MusicControl from "@/components/site/MusicControl";
import Preloader from "@/components/site/Preloader";
import Footer from "@/components/site/Footer";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Menu from "@/components/sections/Menu";
import Reservation from "@/components/sections/Reservation";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <Navbar />
      <MusicControl />
      <main className="relative bg-ink">
        <Hero />
        <Story />
        <Menu />
        <Reservation />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
