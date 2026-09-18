import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="font-display font-bold">
              <span className="text-gradient">XAI</span>Forensics
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Explainable deepfake video forensics — building digital trust through
            transparent AI.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
            Project
          </h4>
          <p className="text-sm text-muted-foreground">
            Final Year Project · BSAI 2024–2025
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Department of Computer Science
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
            Institution
          </h4>
          <p className="text-sm text-muted-foreground">
            National University of Modern Languages
          </p>
          <p className="text-sm text-muted-foreground">Islamabad, Pakistan</p>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} XAI Forensics · Aligned with SDG 16: Peace, Justice & Strong Institutions
      </div>
    </footer>
  );
}
