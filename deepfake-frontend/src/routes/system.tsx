import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Check, X, Cpu, MemoryStick, Code2 } from "lucide-react";

export const Route = createFileRoute("/system")({
  head: () => ({
    meta: [
      { title: "System Overview — XAI Deepfake Forensics" },
      { name: "description", content: "Proposed system architecture, scope, advantages and technical requirements for our explainable deepfake video detector." },
      { property: "og:title", content: "System Overview — XAI Forensics" },
      { property: "og:description", content: "Hybrid spatial-temporal pipeline with explainable AI for deepfake detection." },
    ],
  }),
  component: System,
});

const advantages = [
  "Transparent deepfake detection with visual & textual explanations",
  "Hybrid spatial + temporal model — more robust than naive classifiers",
  "Detects multiple deepfake types (face-swap, lip-sync, expression, GAN)",
  "Web-based interface accessible to non-technical users",
  "Practical for cybersecurity, journalism & digital forensics",
];

const limitations = [
  "Requires GPU for real-time inference",
  "Large training datasets needed for robustness",
  "Explainability adds slight inference latency",
];

const stack = [
  ["Python 3.10+", "PyTorch / TensorFlow", "OpenCV", "scikit-learn"],
  ["FastAPI / Flask", "React", "CUDA Toolkit", "Grad-CAM"],
  ["FaceForensics++", "DFDC", "Celeb-DF", "Custom datasets"],
];

function System() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">The System</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            A <span className="text-gradient">forensic pipeline</span>, end to end.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Our proposed system uses a hybrid spatial-temporal AI model. After
            preprocessing and face extraction, frames flow through artifact
            detection and sequence-consistency networks. Explainable AI then
            generates heatmaps and a reasoning report — delivered through a
            secure web app.
          </p>
        </motion.div>

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-3xl p-8"
        >
          <h2 className="font-display font-bold text-2xl mb-8">Pipeline</h2>
          <div className="grid md:grid-cols-5 gap-4 relative">
            {["Upload", "Preprocess", "Spatial + Temporal", "XAI Layer", "Report"].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="glass rounded-xl p-4 text-center border border-primary/20">
                  <div className="text-xs font-mono text-accent mb-1">0{i + 1}</div>
                  <div className="font-semibold">{step}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scope */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="font-display font-bold text-2xl mb-4 flex items-center gap-2">
              <Check className="h-6 w-6 text-primary" /> Advantages
            </h3>
            <ul className="space-y-3">
              {advantages.map((a) => (
                <li key={a} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="font-display font-bold text-2xl mb-4 flex items-center gap-2">
              <X className="h-6 w-6 text-accent" /> Limitations
            </h3>
            <ul className="space-y-3">
              {limitations.map((l) => (
                <li key={l} className="flex gap-3 text-sm text-muted-foreground">
                  <X className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  {l}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Tech */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="font-display font-bold text-3xl mb-8">Tech Stack & Requirements</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Cpu, t: "GPU", d: "NVIDIA RTX 3060 / 4060 or higher" },
              { icon: MemoryStick, t: "Memory", d: "Minimum 16 GB RAM" },
              { icon: Code2, t: "Runtime", d: "Python 3.10+ with CUDA Toolkit" },
            ].map((h) => (
              <div key={h.t} className="glass rounded-xl p-6">
                <h.icon className="h-7 w-7 text-primary mb-3" />
                <div className="font-semibold">{h.t}</div>
                <div className="text-sm text-muted-foreground">{h.d}</div>
              </div>
            ))}
          </div>
          <div className="glass rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {stack.map((col, i) => (
                <ul key={i} className="space-y-2 font-mono text-sm">
                  {col.map((item) => (
                    <li key={item} className="text-muted-foreground hover:text-primary transition-colors">
                      ▸ {item}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </motion.div>

        {/* SDG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-3xl p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          <div className="relative">
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">UN SDG Alignment</div>
            <h3 className="font-display font-bold text-3xl mb-3">
              SDG 16 — <span className="text-gradient">Peace, Justice & Strong Institutions</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              By making digital evidence verifiable and AI verdicts transparent,
              we strengthen the institutions that depend on truth.
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
