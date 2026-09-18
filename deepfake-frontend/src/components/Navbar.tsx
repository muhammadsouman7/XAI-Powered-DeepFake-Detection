import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/system", label: "System" },
  { to: "/modules", label: "Modules" },
  { to: "/team", label: "Team" },
  { to: "/demo", label: "Demo" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-elegant" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <ShieldCheck className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
            <div className="absolute inset-0 blur-lg bg-primary/40 group-hover:bg-accent/40 transition-colors" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-gradient">XAI</span>Forensics
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                activeProps={{ className: "!text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/demo"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity glow-cyan"
        >
          Try Demo
        </Link>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-border"
        >
          <ul className="flex flex-col p-4 gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-secondary text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
