"use client";

import Particles from "./particles";
import { Shapes } from "./shapes";

export function Hero() {
  return (
    <section className="mb-4 mt-40 flex w-full flex-1 flex-col items-center justify-center px-2 text-center sm:mb-10 sm:mt-52">
      <p className="gradient-text max-w-4xl text-4xl font-extrabold sm:text-6xl">
        Secure Your Digital Legacy with Soulinus
      </p>

      <p className="mx-auto mt-12 max-w-xl text-xl leading-relaxed text-slate-100">
        Effortlessly transfer your digital assets to your loved ones when it matters most.
      </p>
      <a
        className="mt-8 rounded-xl bg-white px-4 py-3 font-medium text-slate-900 transition duration-300 ease-in-out hover:scale-105 hover:bg-slate-300/80 sm:mt-10"
        href="#"
      >
        Secure your assets →
      </a>

      <Shapes />
      <Particles className="pointer-events-none absolute inset-0" quantity={500} />
    </section>
  );
}
