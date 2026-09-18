import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { GraduationCap, UserCheck } from "lucide-react";
import { FaLinkedinIn as LinkedinIcon, FaGithub as GithubIcon, FaInstagram as InstagramIcon } from "react-icons/fa";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — XAI Deepfake Forensics" },
      { name: "description", content: "Meet the BSAI final-year team behind the XAI deepfake forensics project at NUML, supervised by Mrs. Mehvish Zeb Abbasi." },
      { property: "og:title", content: "Team — XAI Forensics" },
      { property: "og:description", content: "The students and supervisor behind the project." },
    ],
  }),
  component: Team,
});

const members = [
  {
    name: "Muhammad Souman",
    linkedin: "https://www.linkedin.com/in/muhammad-souman-057705230/",
    github: "https://github.com/muhammadsouman7",
    instagram: "https://www.instagram.com/m_souman.07/",
  },
  {
    name: "Alishba Nadeem",
    linkedin: "https://www.linkedin.com/in/alishba-nadeem-8014b9379",
    github: "https://github.com/Alishba-Nadeem1",
    instagram: "https://www.instagram.com/alishba._khannnn/",
  },
  {
    name: "Ilsa Javed",
    linkedin: "https://www.linkedin.com/in/ilsa-javed-678b6a266",
    github: "https://github.com/ilsa12",
    instagram: "https://www.instagram.com/ilsakhannn?igsh=cGFuZ3p3ZGdpenF3",
  },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

function Team() {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">The Team</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Built by <span className="text-gradient">three students</span>, guided by one mentor.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            BSAI Final Year Project · Department of Computer Science ·
            National University of Modern Languages, Islamabad.
          </p>
        </motion.div>

        {/* Supervisor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-display font-bold text-primary-foreground glow-cyan">
              MA
            </div>
            <div className="absolute -bottom-2 -right-2 bg-card rounded-full p-2 border border-border">
              <UserCheck className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">Supervisor</div>
            <h2 className="text-3xl font-display font-bold mb-2">Mrs. Mehvish Zeb Abbasi</h2>
            <p className="text-muted-foreground">
              Department of Computer Science · NUML Islamabad
            </p>
          </div>
        </motion.div>

        {/* Students */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-8 text-center group"
            >
              <div className="relative mx-auto h-24 w-24 mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-display font-bold text-primary-foreground">
                  {initials(m.name)}
                </div>
              </div>
              <h3 className="font-display font-bold text-xl mb-4">{m.name}</h3>

              <div className="flex items-center justify-center gap-2 mb-4">
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={m.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on GitHub`}
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={m.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on Instagram`}
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:bg-accent/10 transition-all"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <GraduationCap className="h-4 w-4" /> BSAI · NUML
              </div>
            </motion.div>
          ))}
        </div>

        {/* Institution */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-sm text-muted-foreground"
        >
          <p className="font-mono">DEPARTMENT OF COMPUTER SCIENCE</p>
          <p className="font-display font-semibold text-foreground mt-1">
            National University of Modern Languages, Islamabad
          </p>
        </motion.div>
      </section>
    </Layout>
  );
}
