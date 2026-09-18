import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Brain, FileSearch, Sparkles, ArrowRight, Activity, Layers, Zap } from "lucide-react";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero-deepfake.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XAI Forensics — Explainable Deepfake Video Detection" },
      { name: "description", content: "AI-powered deepfake video forensics with explainable heatmaps, temporal analysis, and authenticity reports. NUML Final Year Project." },
      { property: "og:title", content: "XAI Forensics — Explainable Deepfake Detection" },
      { property: "og:description", content: "Transparent AI for deepfake video verification with visual heatmaps and reasoning." },
    ],
  }),
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-wider text-primary mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              NUML · Final Year Project · 2025
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              See through the{" "}
              <span className="text-gradient">deepfake</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              An explainable AI system that doesn't just detect manipulated videos —
              it shows you <em className="text-foreground not-italic">why</em>.
              Spatial artifacts, temporal anomalies, and visual heatmaps in one transparent forensic report.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/system"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-cyan hover:scale-105 transition-transform"
              >
                Explore the System
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border glass hover:border-primary/50 transition-colors font-medium"
              >
                Read the Research
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "6", l: "Detection Modules" },
                { v: "2", l: "Analysis Layers" },
                { v: "XAI", l: "Powered" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-display font-bold text-gradient">{s.v}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden glass p-2 animate-pulse-glow">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={heroImg}
                  alt="Split human face showing deepfake detection forensic analysis"
                  width={1536}
                  height={1024}
                  className="w-full h-auto"
                />
                {/* scan line */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan blur-sm" />
                {/* HUD overlays */}
                <div className="absolute top-4 left-4 glass rounded-lg px-3 py-2 text-xs font-mono">
                  <div className="text-primary">● ANALYZING</div>
                  <div className="text-muted-foreground mt-1">frame 042/120</div>
                </div>
                <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-2 text-xs font-mono text-right">
                  <div className="text-accent">FAKE 87.4%</div>
                  <div className="text-muted-foreground mt-1">XAI confidence</div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 glass rounded-2xl p-4 hidden md:block"
            >
              <Activity className="h-6 w-6 text-primary" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 hidden md:block"
            >
              <Layers className="h-6 w-6 text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">01 — The Problem</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Today's detectors are <span className="text-gradient">black boxes</span>.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Existing tools simply label a video real or fake — without justification.
            That opacity makes them useless in courtrooms, newsrooms, and forensic labs
            where accountability is everything.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Eye, t: "No Visual Evidence", d: "No heatmaps, no localization. You can't see what the model saw." },
            { icon: Brain, t: "No Reasoning", d: "Decisions are opaque. Trust collapses without an explanation." },
            { icon: Zap, t: "Brittle in the Wild", d: "Compression, noise, lighting — real-world deepfakes break them." },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1"
            >
              <c.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{c.t}</h3>
              <p className="text-sm text-muted-foreground">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent mb-3">02 — Our Approach</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              A hybrid forensic pipeline.
            </h2>
            <p className="text-lg text-muted-foreground">
              Spatial + temporal deep learning, fused with Explainable AI to produce
              heatmaps and reasoning every analyst can defend.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileSearch, t: "Spatial Artifacts", d: "Texture, edge & lighting anomalies per frame." },
              { icon: Activity, t: "Temporal Coherence", d: "Blink rate, lip-sync, motion consistency." },
              { icon: Sparkles, t: "Explainable AI", d: "Heatmaps + textual reasoning for every verdict." },
              { icon: ShieldCheck, t: "Authenticity Report", d: "Downloadable PDF with confidence scores." },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative glass rounded-2xl p-6 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all" />
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                    <c.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{c.t}</h3>
                  <p className="text-sm text-muted-foreground">{c.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden glass p-12 md:p-16 text-center"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Restore trust in <span className="text-gradient">what you see</span>.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Built for journalists, forensic analysts, and platforms that need
              transparent verdicts — not blind classifications.
            </p>
            <Link
              to="/modules"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-cyan hover:scale-105 transition-transform"
            >
              Explore Modules <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
