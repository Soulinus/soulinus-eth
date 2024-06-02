"use client";

import Link from "next/link";
import { Button } from "../ui/moving-border";
import Particles from "./particles";
import { Shapes } from "./shapes";

export function Hero() {
  return (
    <section className="mb-4 mt-16 flex w-full flex-1 flex-col items-center justify-center px-2 text-center sm:mb-6 sm:mt-32">
      <p className="gradient-text max-w-4xl text-4xl font-extrabold sm:text-6xl">
        Secure Your Digital Legacy with Soulinus
      </p>

      <p className="mx-auto mt-12 max-w-xl text-xl leading-relaxed text-slate-100">
        Effortlessly transfer your digital assets to your loved ones when it matters most.
      </p>
      <Link href="/contractSettings">
        <Button
          borderRadius="1rem"
          duration={3000}
          className="font-bold text-xl bg-white dark:hover:bg-slate-900 dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Secure your assets →
        </Button>
      </Link>

      <Shapes />
      <Particles className="pointer-events-none absolute inset-0" quantity={500} />
    </section>
  );
}
