import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Film, Scan, Activity, Sparkles, BarChart3, Globe } from "lucide-react";

export const Route = createFileRoute("/modules")({
  head: () => ({
    meta: [
      { title: "Modules — XAI Deepfake Forensics Architecture" },
      { name: "description", content: "Six core modules: preprocessing, spatial artifact detection, temporal analysis, XAI, classification, and the web app." },
      { property: "og:title", content: "Modules — XAI Forensics" },
      { property: "og:description", content: "Inside the six-module deepfake detection architecture." },
    ],
  }),
  component: Modules,
});

const modules = [
  {
    icon: Film,
    n: "01",
    title: "Video Preprocessing",
    items: ["Frame extraction at 3–10 FPS", "Face detection & alignment for stable input"],
  },
  {
    icon: Scan,
    n: "02",
    title: "Spatial Artifact Detection",
    items: ["Texture, edge & lighting inconsistency detection", "Spatial feature embeddings for downstream models"],
  },
  {
    icon: Activity,
    n: "03",
    title: "Temporal Analysis",
    items: ["Blink-rate, lip-sync & expression coherence", "Frame jumps, unnatural motion, GAN instability"],
  },
  {
    icon: Sparkles,
    n: "04",
    title: "Explainable AI (XAI)",
    items: ["Heatmaps highlighting manipulated regions", "Reasoning engine explaining real/fake verdicts"],
  },
  {
    icon: BarChart3,
    n: "05",
    title: "Deepfake Classification",
    items: ["Confidence probability score", "Final authenticity report — text + heatmap"],
  },
  {
    icon: Globe,
    n: "06",
    title: "Web Application",
    items: ["Secure user upload interface", "Results dashboard with downloadable PDF"],
  },
];

const apps = [
  "News media verification",
  "Election integrity monitoring",
  "Law enforcement digital forensics",
  "Legal evidence authenticity",
  "Social media content moderation",
  "Public security awareness",
];

function Modules() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Architecture</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Six modules. <span className="text-gradient">One verdict.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Each module is independently engineered yet feeds into a unified
            forensic output. Together they turn raw video into a defendable
            authenticity report.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={m.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 2) * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-8 group relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <m.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-3xl font-display font-bold text-muted-foreground/30">{m.n}</div>
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">{m.title}</h3>
                <ul className="space-y-2">
                  {m.items.map((it) => (
                    <li key={it} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-1">▸</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Applications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="font-display font-bold text-3xl mb-8">Real-World Applications</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {apps.map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl px-5 py-4 hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <span className="text-foreground font-medium">{a}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
