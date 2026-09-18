import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Upload, Play, RotateCcw, ShieldCheck, ShieldAlert, Activity,
  Eye, Zap, FileVideo, Image as ImageIcon, Sparkles, Download, CheckCircle2,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live Demo — XAI Deepfake Detection" },
      { name: "description", content: "Upload a video and watch our explainable AI pipeline analyze it frame by frame with heatmaps, temporal coherence, and an authenticity verdict." },
      { property: "og:title", content: "Try the XAI Forensics Demo" },
      { property: "og:description", content: "Interactive deepfake detection demo with visual heatmaps and reasoning." },
    ],
  }),
  component: DemoPage,
});

type Stage = "idle" | "uploading" | "analyzing" | "done" | "error";

const STEPS = [
  { key: "preprocess", label: "Frame Extraction",      icon: FileVideo, detail: "Decoding media · sampling frames" },
  { key: "spatial",    label: "Spatial Artifact Scan", icon: Eye,       detail: "CNN scanning texture & edges"    },
  { key: "verdict",    label: "Confidence Fusion",     icon: Sparkles,  detail: "Computing authenticity score"    },
] as const;

function DemoPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file,           setFile]           = useState<File | null>(null);
  const [videoUrl,       setVideoUrl]       = useState<string>("");
  const [stage,          setStage]          = useState<Stage>("idle");
  const [progress,       setProgress]       = useState(0);
  const [activeStep,     setActiveStep]     = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [heatmapSrc,     setHeatmapSrc]     = useState<string>("");
  const [errorMsg,       setErrorMsg]       = useState<string>("");
  const [result, setResult] = useState<{
    fakeScore: number;
    spatial:   number;
    temporal:  number;
    verdict:   "REAL" | "FAKE";
    findings:  string[];
  } | null>(null);

  // ── File helpers ─────────────────────────────────────────────
  const handlePick = () => inputRef.current?.click();

  const onFile = (f: File) => {
    if (!f.type.startsWith("video/") && !f.type.startsWith("image/")) return;
    setFile(f);
    setVideoUrl(URL.createObjectURL(f));
    setStage("idle");
    setResult(null);
    setHeatmapSrc("");
    setErrorMsg("");
    setCompletedSteps([]);
    setActiveStep(-1);
    setProgress(0);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  };

  const reset = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setFile(null);
    setVideoUrl("");
    setStage("idle");
    setResult(null);
    setHeatmapSrc("");
    setErrorMsg("");
    setCompletedSteps([]);
    setActiveStep(-1);
    setProgress(0);
  };

  // ── Main analysis — calls real Flask backend ──────────────────
  const analyze = async () => {
    if (!file) return;

    setErrorMsg("");
    setStage("uploading");
    setProgress(0);

    // Build multipart form
    const formData = new FormData();
    formData.append("file", file);

    // XHR so we can track real upload progress
    let responseText = "";
    let responseStatus = 0;

    try {
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          responseText   = xhr.responseText;
          responseStatus = xhr.status;
          resolve();
        };

        xhr.onerror = () => reject(new Error("Network error — is the Flask server running on port 5000?"));
        xhr.ontimeout = () => reject(new Error("Request timed out — the model may still be loading."));

        xhr.timeout = 300_000; // 5 min — large videos take time
        xhr.open("POST", "/analyze");
        xhr.send(formData);
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown network error";
      setErrorMsg(msg);
      setStage("error");
      return;
    }

    // Show pipeline steps animating while we parse the response
    setStage("analyzing");
    setCompletedSteps([]);

    // Run step animations concurrently with result parsing
    const stepAnimation = (async () => {
      for (let i = 0; i < STEPS.length; i++) {
        setActiveStep(i);
        await sleep(700);
        setCompletedSteps((c) => [...c, i]);
      }
    })();

    let data: {
      verdict?:     string;
      fakeScore?:   number;
      spatial?:     number;
      temporal?:    number;
      findings?:    string[];
      heatmap_b64?: string;
      error?:       string;
    };

    try {
      data = JSON.parse(responseText);
    } catch {
      setErrorMsg(`Server returned invalid JSON (status ${responseStatus})`);
      setStage("error");
      return;
    }

    if (responseStatus !== 200 || data.error) {
      setErrorMsg(data.error ?? `Server error (status ${responseStatus})`);
      setStage("error");
      return;
    }

    // Wait for step animations to finish before revealing results
    await stepAnimation;

    if (data.heatmap_b64) {
      setHeatmapSrc(`data:image/jpeg;base64,${data.heatmap_b64}`);
    }

    setResult({
      fakeScore: data.fakeScore  ?? 0,
      spatial:   data.spatial    ?? 0,
      temporal:  data.temporal   ?? 0,
      verdict:   (data.verdict as "REAL" | "FAKE") ?? "REAL",
      findings:  data.findings   ?? [],
    });

    setStage("done");
  };

  const isImage = file?.type.startsWith("image/");

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">● Live Forensic Demo</div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Upload. Analyze. <span className="text-gradient">Reveal</span>.
          </h1>
          <p className="text-lg text-muted-foreground">
            Drop a short video clip below. Our pipeline runs spatial, temporal, and explainable
            AI passes — then returns a Grad-CAM heatmap and an authenticity verdict.
          </p>
          <p className="mt-2 text-xs font-mono text-muted-foreground/70">
            Powered by ResNet-50 + Grad-CAM · Real-time inference via Flask backend
          </p>
        </motion.div>
      </section>

      {/* ── Main grid ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── LEFT: Upload + Media + Heatmap ─────────────── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Error banner */}
            <AnimatePresence>
              {stage === "error" && errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl border border-destructive/40 bg-destructive/10 px-5 py-4 text-sm text-destructive font-mono"
                >
                  <span className="font-bold">Error:</span> {errorMsg}
                  <Button variant="ghost" size="sm" className="ml-4 text-destructive" onClick={reset}>
                    <RotateCcw className="h-3 w-3 mr-1" /> Reset
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drop zone */}
            {!file ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={handlePick}
                className="glass rounded-3xl border-2 border-dashed border-border hover:border-primary/60 transition-colors cursor-pointer p-12 text-center group"
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="video/*,image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
                />
                <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-5 group-hover:scale-110 transition-transform">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">Drop a video or image</h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse · MP4, MOV, WebM, JPG, PNG · max ~50 MB
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="default" className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    <Upload className="h-4 w-4" /> Choose File
                  </Button>
                  <span className="text-xs font-mono text-muted-foreground inline-flex items-center gap-1">
                    <FileVideo className="h-3 w-3" /> video
                    <span className="opacity-50">·</span>
                    <ImageIcon className="h-3 w-3" /> image
                  </span>
                </div>
              </motion.div>

            ) : (
              /* Media card */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-3 relative"
              >
                <div className="relative rounded-2xl overflow-hidden bg-black">
                  {/* Video or image */}
                  {isImage ? (
                    <img
                      src={videoUrl}
                      alt="Uploaded for forensic analysis"
                      className="w-full h-auto block"
                    />
                  ) : (
                    <video
                      src={videoUrl}
                      controls
                      className="w-full h-auto block"
                    />
                  )}

                  {/* ── Real Grad-CAM heatmap overlay ── */}
                  <AnimatePresence>
                    {stage === "done" && heatmapSrc && (
                      <motion.img
                        key="heatmap-overlay"
                        src={heatmapSrc}
                        alt="Grad-CAM heatmap overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.82 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen"
                      />
                    )}
                  </AnimatePresence>

                  {/* Scan line during analysis */}
                  {stage === "analyzing" && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan blur-sm pointer-events-none" />
                  )}

                  {/* Stage HUD badge */}
                  {stage !== "idle" && stage !== "error" && (
                    <div className="absolute top-3 left-3 glass rounded-lg px-3 py-1.5 text-xs font-mono">
                      <span className="text-primary">●</span> {stage.toUpperCase()}
                    </div>
                  )}

                  {/* Verdict badge */}
                  {stage === "done" && result && (
                    <div
                      className={`absolute top-3 right-3 glass rounded-lg px-3 py-1.5 text-xs font-mono font-bold ${
                        result.verdict === "FAKE" ? "text-destructive" : "text-primary"
                      }`}
                    >
                      {result.verdict} · {result.fakeScore}%
                    </div>
                  )}
                </div>

                {/* File info + action buttons */}
                <div className="flex items-center justify-between p-3 pt-4">
                  <div className="text-sm">
                    <div className="font-medium truncate max-w-xs">{file.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={reset}>
                      <RotateCcw className="h-4 w-4" /> Reset
                    </Button>
                    {stage === "idle" && (
                      <Button
                        size="sm"
                        onClick={analyze}
                        className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                      >
                        <Play className="h-4 w-4" /> Run Analysis
                      </Button>
                    )}
                  </div>
                </div>

                {/* Upload progress bar */}
                {stage === "uploading" && (
                  <div className="px-3 pb-3">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-muted-foreground">Uploading securely…</span>
                      <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Standalone Grad-CAM heatmap panel ── */}
            <AnimatePresence>
              {stage === "done" && heatmapSrc && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-3xl p-5"
                >
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-accent mb-1">XAI Heatmap</div>
                      <h3 className="font-display font-bold text-lg">Manipulation Localization</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <Legend color="rgb(0,0,255)"   label="Low"  />
                      <Legend color="rgb(0,255,0)"   label="Med"  />
                      <Legend color="rgb(255,0,0)"   label="High" />
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden bg-black/60">
                    {/* Real Grad-CAM image from backend */}
                    <img
                      src={heatmapSrc}
                      alt="Grad-CAM manipulation localization heatmap"
                      className="w-full h-auto block rounded-2xl"
                    />
                    <div className="absolute bottom-3 left-3 glass rounded-lg px-3 py-1.5 text-xs font-mono text-muted-foreground">
                      Hot regions = highest tampering likelihood
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground font-mono">
                    Generated by Grad-CAM on ResNet-50 layer4 · JET colormap · overlaid on highest-scoring face crop
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Pipeline steps + Results ────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pipeline steps */}
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-lg">Forensic Pipeline</h3>
                <span className="text-xs font-mono text-muted-foreground">
                  {completedSteps.length}/{STEPS.length}
                </span>
              </div>
              <ol className="space-y-3">
                {STEPS.map((s, i) => {
                  const isDone   = completedSteps.includes(i);
                  const isActive = activeStep === i && !isDone;
                  return (
                    <li
                      key={s.key}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                        isActive  ? "border-primary/60 bg-primary/5"  :
                        isDone    ? "border-accent/30  bg-accent/5"   :
                                    "border-border/50"
                      }`}
                    >
                      <div className={`shrink-0 mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center ${
                        isDone    ? "bg-accent/20   text-accent"          :
                        isActive  ? "bg-primary/20  text-primary"         :
                                    "bg-secondary   text-muted-foreground"
                      }`}>
                        {isDone
                          ? <CheckCircle2 className="h-4 w-4" />
                          : <s.icon className={`h-4 w-4 ${isActive ? "animate-pulse" : ""}`} />
                        }
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium">{s.label}</div>
                        <div className="text-xs text-muted-foreground font-mono truncate">
                          {isActive ? s.detail : isDone ? "Complete" : "Pending"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Backend status indicator */}
              <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${
                  stage === "done"      ? "bg-green-500"     :
                  stage === "error"     ? "bg-destructive"   :
                  stage === "idle"      ? "bg-muted-foreground" :
                                          "bg-primary animate-pulse"
                }`} />
                {stage === "idle"      && "Ready — awaiting upload"}
                {stage === "uploading" && "Sending to Flask backend…"}
                {stage === "analyzing" && "ResNet-50 inference running…"}
                {stage === "done"      && "Inference complete"}
                {stage === "error"     && "Backend error"}
              </div>
            </div>

            {/* Results panel */}
            <AnimatePresence>
              {stage === "done" && result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-3xl p-6 space-y-5"
                >
                  {/* Verdict banner */}
                  <div className={`flex items-center gap-3 p-4 rounded-xl ${
                    result.verdict === "FAKE"
                      ? "bg-destructive/10 border border-destructive/30"
                      : "bg-primary/10    border border-primary/30"
                  }`}>
                    {result.verdict === "FAKE"
                      ? <ShieldAlert  className="h-8 w-8 text-destructive shrink-0" />
                      : <ShieldCheck  className="h-8 w-8 text-primary    shrink-0" />
                    }
                    <div>
                      <div className="text-2xl font-display font-bold">
                        Likely{" "}
                        <span className={result.verdict === "FAKE" ? "text-destructive" : "text-primary"}>
                          {result.verdict}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        Confidence: {result.fakeScore}%
                      </div>
                    </div>
                  </div>

                  {/* Score bars */}
                  <div className="space-y-3">
                    <ScoreBar label="Spatial Artifacts"  value={result.spatial}   icon={Eye}      />
                    <ScoreBar label="Temporal Anomalies" value={result.temporal}  icon={Activity} />
                    <ScoreBar label="Overall Fake Score" value={result.fakeScore} icon={Zap}      />
                  </div>

                  {/* XAI findings */}
                  {result.findings.length > 0 && (
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-accent mb-2">
                        XAI Findings
                      </div>
                      <ul className="space-y-2">
                        {result.findings.map((f, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-primary mt-1">▸</span>
                            <span className="text-muted-foreground">{f}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button variant="outline" className="w-full" onClick={() => window.print()}>
                    <Download className="h-4 w-4" /> Export Forensic Report
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// ── Sub-components ────────────────────────────────────────────

function ScoreBar({
  label, value, icon: Icon,
}: {
  label: string; value: number; icon: typeof Eye;
}) {
  const color =
    value >= 70 ? "from-destructive to-accent" :
    value >= 40 ? "from-accent to-primary"      :
                  "from-primary to-primary";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 text-sm">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{label}</span>
        </div>
        <span className="text-xs font-mono text-foreground">{value}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      <span className="text-muted-foreground">{label}</span>
    </span>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}