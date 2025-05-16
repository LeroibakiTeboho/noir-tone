"use client";
import { useEffect, useState } from "react";

export default function FlashSalesBanner() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      const diff = end.getTime() - now.getTime();

      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${Math.floor(hours)}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gold text-black p-4 text-center animate-pulse">
      🎉 Flash Sale! {timeLeft} remaining - Use code FLASH30
    </div>
  );
}
