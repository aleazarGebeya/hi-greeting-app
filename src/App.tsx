import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";

function App() {
  const [dark, setDark] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    }),
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden select-none bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
      {/* Theme toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-6 right-6 p-3 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 backdrop-blur-sm hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer"
        aria-label="Toggle theme"
      >
        {dark ? (
          <Sun size={20} weight="duotone" className="text-zinc-300" />
        ) : (
          <Moon size={20} weight="duotone" className="text-zinc-700" />
        )}
      </button>

      {/* Main greeting */}
      <motion.div
        className="flex items-baseline gap-1 sm:gap-2"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {["H", "I"].map((letter, i) => (
          <motion.span
            key={letter}
            custom={i}
            variants={prefersReducedMotion ? undefined : letterVariants}
            className="text-7xl sm:text-9xl md:text-[12rem] font-bold tracking-tighter leading-none"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtle caption */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="mt-6 text-sm tracking-widest uppercase text-zinc-400 dark:text-zinc-500 font-medium"
      >
        Hello, world.
      </motion.p>

      {/* Minimal decorative dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 20 }}
        className="mt-8 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
      />
    </div>
  );
}

export default App;
