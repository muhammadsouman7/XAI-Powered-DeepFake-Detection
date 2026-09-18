import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { AlertTriangle, Target, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — XAI Deepfake Forensics Project" },
      { name: "description", content: "Background, problem statement and motivation behind our explainable deepfake detection final year project at NUML." },
      { property: "og:title", content: "About — XAI Deepfake Forensics" },
      { property: "og:description", content: "The motivation and problem behind transparent deepfake detection." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">About the Project</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            The <span className="text-gradient">deepfake era</span> needs witnesses, not guesses.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AI-generated videos have escaped the lab. They sway elections, ruin
            reputations, and erode trust in evidence itself. We're building a
            forensic system that doesn't just answer "is it fake?" — it answers
            "<em className="text-foreground not-italic">how do you know?</em>"
          </p>
        </motion.div>

        <div className="mt-16 space-y-8">
          {[
            {
              icon: AlertTriangle,
              tag: "Current Issues",
              title: "Synthetic media is outpacing verification.",
              body: "Deepfakes spread through social platforms faster than journalists, courts, or moderators can verify. Existing detectors operate as black boxes — labeling content without explanation, undermining trust in the very tools meant to restore it.",
            },
            {
              icon: Target,
              tag: "Problem",
              title: "Detection without transparency is unusable.",
              body: "Today's models can't tell you why a video is suspicious. They struggle with compression, lighting changes, and noisy uploads. For forensic, legal, and journalistic use, that opacity is a deal-breaker.",
            },
            {
              icon: Lightbulb,
              tag: "Solution",
              title: "Explainable spatial-temporal forensics.",
              body: "Our system fuses frame-level artifact detection with temporal coherence analysis, then layers Explainable AI to produce heatmaps and natural-language reasoning. The output: an authenticity score plus a defendable explanation.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-8 grid md:grid-cols-[auto_1fr] gap-6"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                <s.icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">{s.tag}</div>
                <h3 className="text-2xl font-display font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
