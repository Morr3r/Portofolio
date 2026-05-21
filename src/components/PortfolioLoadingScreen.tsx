"use client";

import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useMemo,
  useState
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Code2,
  Gauge,
  Layers3,
  PanelTop,
  ScanLine,
  ShieldCheck,
  Wifi,
  WifiOff,
  Zap
} from "lucide-react";
import type { LocaleCode } from "@/lib/portfolio-data";

const loadingText = {
  en: {
    ariaLoading: (progress: number) => `Loading portfolio ${progress} percent`,
    eyebrow: "Portfolio boot sequence",
    runtimeModules: "Runtime modules",
    networkTitle: "Network condition",
    online: "Online",
    offline: "Offline",
    estimatedSpeed: "Estimated speed",
    latency: "Latency",
    saveData: "Data saver",
    unsupportedNetwork: "Browser estimate",
    unknownSpeed: "Checking",
    unknownLatency: "Measuring",
    quality: {
      offline: "Offline",
      limited: "Limited",
      moderate: "Moderate",
      stable: "Stable",
      fast: "Fast",
      saver: "Data saver"
    },
    bootSequence: [
      "Compiling interface graph",
      "Warming motion engine",
      "Syncing signal canvas",
      "Mounting project modules",
      "Calibrating responsive layout",
      "Launching portfolio"
    ],
    bootModules: [
      { label: "UI Kernel", value: "Next.js", Icon: PanelTop },
      { label: "Motion", value: "Framer", Icon: Zap },
      { label: "Security", value: "Ready", Icon: ShieldCheck },
      { label: "Stack", value: "React", Icon: Layers3 }
    ]
  },
  id: {
    ariaLoading: (progress: number) => `Memuat portofolio ${progress} persen`,
    eyebrow: "Urutan boot portofolio",
    runtimeModules: "Modul runtime",
    networkTitle: "Kondisi jaringan",
    online: "Aktif",
    offline: "Offline",
    estimatedSpeed: "Estimasi kecepatan",
    latency: "Latensi",
    saveData: "Hemat data",
    unsupportedNetwork: "Estimasi browser",
    unknownSpeed: "Mengecek",
    unknownLatency: "Mengukur",
    quality: {
      offline: "Offline",
      limited: "Terbatas",
      moderate: "Sedang",
      stable: "Stabil",
      fast: "Cepat",
      saver: "Hemat data"
    },
    bootSequence: [
      "Menyusun graf antarmuka",
      "Menyiapkan mesin animasi",
      "Menyinkronkan kanvas sinyal",
      "Memasang modul proyek",
      "Mengalibrasi layout responsif",
      "Meluncurkan portofolio"
    ],
    bootModules: [
      { label: "UI Kernel", value: "Next.js", Icon: PanelTop },
      { label: "Motion", value: "Framer", Icon: Zap },
      { label: "Keamanan", value: "Siap", Icon: ShieldCheck },
      { label: "Stack", value: "React", Icon: Layers3 }
    ]
  }
} as const;

const telemetryRows = [
  "0xA1 hydrate.shell()",
  "0xB4 route.signal.map",
  "0xC7 motion.timeline",
  "0xD2 asset.pipeline",
  "0xE8 input.sync",
  "0xF3 portfolio.ready"
];

const orbitNodes = [
  { left: 50, top: 3 },
  { left: 82, top: 14 },
  { left: 97, top: 50 },
  { left: 82, top: 86 },
  { left: 50, top: 97 },
  { left: 18, top: 86 },
  { left: 3, top: 50 },
  { left: 18, top: 14 }
];

type PortfolioLoadingScreenProps = {
  language: LocaleCode;
  onComplete: () => void;
};

type ConnectionQuality = "offline" | "limited" | "moderate" | "stable" | "fast" | "saver";

type NetworkConnection = EventTarget & {
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkConnection;
  mozConnection?: NetworkConnection;
  webkitConnection?: NetworkConnection;
};

type NetworkInfo = {
  downlink?: number;
  effectiveType?: string;
  online: boolean;
  rtt?: number;
  saveData: boolean;
  supported: boolean;
};

const fallbackNetworkInfo: NetworkInfo = {
  online: true,
  saveData: false,
  supported: false
};

const getConnection = () => {
  if (typeof navigator === "undefined") {
    return undefined;
  }

  const currentNavigator = navigator as NavigatorWithConnection;

  return (
    currentNavigator.connection ??
    currentNavigator.mozConnection ??
    currentNavigator.webkitConnection
  );
};

const readNetworkInfo = (): NetworkInfo => {
  if (typeof navigator === "undefined") {
    return fallbackNetworkInfo;
  }

  const connection = getConnection();

  return {
    downlink: connection?.downlink,
    effectiveType: connection?.effectiveType,
    online: navigator.onLine,
    rtt: connection?.rtt,
    saveData: Boolean(connection?.saveData),
    supported: Boolean(connection)
  };
};

const getConnectionQuality = (networkInfo: NetworkInfo): ConnectionQuality => {
  if (!networkInfo.online) {
    return "offline";
  }

  if (networkInfo.saveData) {
    return "saver";
  }

  if (networkInfo.effectiveType === "slow-2g" || networkInfo.effectiveType === "2g") {
    return "limited";
  }

  if (networkInfo.effectiveType === "3g") {
    return "moderate";
  }

  if (
    networkInfo.effectiveType === "4g" &&
    typeof networkInfo.downlink === "number" &&
    networkInfo.downlink >= 5 &&
    (typeof networkInfo.rtt !== "number" || networkInfo.rtt <= 140)
  ) {
    return "fast";
  }

  return "stable";
};

const getNetworkTiming = (quality: ConnectionQuality, shouldReduceMotion: boolean | null) => {
  if (shouldReduceMotion) {
    return {
      interval: 180,
      maximumDuration: 1200,
      minimumDuration: 700,
      readyIncrement: 9,
      waitingIncrement: 5
    };
  }

  const timingByQuality: Record<ConnectionQuality, {
    interval: number;
    maximumDuration: number;
    minimumDuration: number;
    readyIncrement: number;
    waitingIncrement: number;
  }> = {
    offline: {
      interval: 190,
      maximumDuration: 4400,
      minimumDuration: 2850,
      readyIncrement: 4,
      waitingIncrement: 2
    },
    limited: {
      interval: 180,
      maximumDuration: 4300,
      minimumDuration: 2750,
      readyIncrement: 5,
      waitingIncrement: 3
    },
    moderate: {
      interval: 155,
      maximumDuration: 3800,
      minimumDuration: 2350,
      readyIncrement: 6,
      waitingIncrement: 4
    },
    stable: {
      interval: 140,
      maximumDuration: 3600,
      minimumDuration: 2150,
      readyIncrement: 7,
      waitingIncrement: 4
    },
    fast: {
      interval: 120,
      maximumDuration: 3000,
      minimumDuration: 1750,
      readyIncrement: 9,
      waitingIncrement: 5
    },
    saver: {
      interval: 170,
      maximumDuration: 4100,
      minimumDuration: 2600,
      readyIncrement: 5,
      waitingIncrement: 3
    }
  };

  return timingByQuality[quality];
};

export function PortfolioLoadingScreen({ language, onComplete }: PortfolioLoadingScreenProps) {
  const [progress, setProgress] = useState(8);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>(fallbackNetworkInfo);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const shouldReduceMotion = useReducedMotion();
  const text = loadingText[language];
  const bootSequence = text.bootSequence;
  const networkQuality = getConnectionQuality(networkInfo);
  const networkTiming = useMemo(
    () => getNetworkTiming(networkQuality, shouldReduceMotion),
    [networkQuality, shouldReduceMotion]
  );
  const ringIndexes = useMemo(() => [0, 1, 2], []);
  const activePhase = bootSequence[Math.min(phaseIndex, bootSequence.length - 1)];
  const progressValue = Math.min(progress, 100);
  const progressLabel = `${String(progressValue).padStart(3, "0")}%`;
  const networkSpeedLabel =
    typeof networkInfo.downlink === "number"
      ? `${networkInfo.downlink.toFixed(networkInfo.downlink >= 10 ? 0 : 1)} Mbps`
      : networkInfo.effectiveType?.toUpperCase() ?? text.unknownSpeed;
  const latencyLabel =
    typeof networkInfo.rtt === "number" ? `${networkInfo.rtt} ms` : text.unknownLatency;

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
    };
  }, []);

  useEffect(() => {
    const startedAt = performance.now();
    const {
      interval,
      maximumDuration,
      minimumDuration,
      readyIncrement,
      waitingIncrement
    } = networkTiming;
    let pageReady = document.readyState === "complete";
    let complete = false;
    let disposed = false;
    let tickTimer = 0;
    let exitTimer = 0;

    const handlePageLoad = () => {
      pageReady = true;
    };

    const finish = () => {
      if (complete || disposed) {
        return;
      }

      complete = true;
      setPhaseIndex(bootSequence.length - 1);
      setProgress(100);
      window.clearInterval(tickTimer);
      exitTimer = window.setTimeout(onComplete, shouldReduceMotion ? 120 : 520);
    };

    tickTimer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const nextPhase = Math.min(
        bootSequence.length - 1,
        Math.floor((elapsed / minimumDuration) * bootSequence.length)
      );

      setPhaseIndex(nextPhase);
      setProgress((currentProgress) => {
        const ceiling = pageReady ? 96 : 88;
        const increment = pageReady ? readyIncrement : waitingIncrement;

        return Math.min(ceiling, currentProgress + increment);
      });

      if ((pageReady && elapsed >= minimumDuration) || elapsed >= maximumDuration) {
        finish();
      }
    }, interval);

    const fallbackTimer = window.setTimeout(() => {
      pageReady = true;
    }, maximumDuration - 500);

    if (!pageReady) {
      window.addEventListener("load", handlePageLoad, { once: true });
    }

    return () => {
      disposed = true;
      window.clearInterval(tickTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("load", handlePageLoad);
    };
  }, [bootSequence.length, networkTiming, onComplete, shouldReduceMotion]);

  useEffect(() => {
    let animationFrame = window.requestAnimationFrame(() => {
      setNetworkInfo(readNetworkInfo());
    });

    const updateNetworkInfo = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        setNetworkInfo(readNetworkInfo());
      });
    };

    const connection = getConnection();

    window.addEventListener("online", updateNetworkInfo);
    window.addEventListener("offline", updateNetworkInfo);
    connection?.addEventListener("change", updateNetworkInfo);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("online", updateNetworkInfo);
      window.removeEventListener("offline", updateNetworkInfo);
      connection?.removeEventListener("change", updateNetworkInfo);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    setPointer({
      x: Math.round(((event.clientX - bounds.left) / bounds.width) * 100),
      y: Math.round(((event.clientY - bounds.top) / bounds.height) * 100)
    });
  };

  return (
    <motion.div
      className="boot-loader"
      style={
        {
          "--loader-x": `${pointer.x}%`,
          "--loader-y": `${pointer.y}%`
        } as CSSProperties
      }
      role="status"
      aria-live="polite"
      aria-label={text.ariaLoading(progressValue)}
      onPointerMove={handlePointerMove}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: shouldReduceMotion ? "none" : "blur(10px)" }}
      transition={{ duration: shouldReduceMotion ? 0.16 : 0.55, ease: "easeInOut" }}
    >
      <div className="boot-loader-grid" aria-hidden="true" />
      <div className="boot-loader-crosshair" aria-hidden="true" />

      <motion.section
        className="boot-loader-shell"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.58, ease: [0.2, 0.72, 0.16, 1] }}
      >
        <div className="boot-loader-header">
          <div>
            <span className="boot-loader-eyebrow">
              <ScanLine size={16} />
              {text.eyebrow}
            </span>
            <h2>Afghany Yogaswara</h2>
          </div>
          <strong className="boot-loader-percent">{progressLabel}</strong>
        </div>

        <div className="boot-loader-content">
          <motion.div
            className="boot-loader-visual"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotateX: (50 - pointer.y) * 0.06,
                    rotateY: (pointer.x - 50) * 0.06
                  }
            }
            transition={{ type: "spring", stiffness: 120, damping: 24 }}
          >
            <div className="boot-loader-orbit" aria-hidden="true">
              {ringIndexes.map((ringIndex) => (
                <span className="boot-loader-ring" key={ringIndex} />
              ))}

              {orbitNodes.map((node, index) => (
                <span
                  className="boot-loader-node"
                  key={`${node.left}-${node.top}`}
                  style={
                    {
                      left: `${node.left}%`,
                      top: `${node.top}%`,
                      animationDelay: `${index * -0.28}s`
                    } as CSSProperties
                  }
                />
              ))}

              <motion.div
                className="boot-loader-core"
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.04, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code2 size={34} />
                <span>PORTFOLIO</span>
                <strong>OS</strong>
              </motion.div>
            </div>

            <div className="boot-loader-progress">
              <div className="boot-loader-progress-track" aria-hidden="true">
                <motion.span
                  className="boot-loader-progress-bar"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progressValue / 100 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                />
              </div>
              <div className="boot-loader-phase">
                <span>{activePhase}</span>
                <strong>{progressLabel}</strong>
              </div>
            </div>
          </motion.div>

          <div className="boot-loader-console">
            <div className="boot-loader-console-head">
              <span>{text.runtimeModules}</span>
              <strong>{text.online}</strong>
            </div>

            <div className="boot-network-panel" data-quality={networkQuality}>
              <div className="boot-network-status">
                {networkInfo.online ? <Wifi size={19} /> : <WifiOff size={19} />}
                <span>{text.networkTitle}</span>
                <strong>
                  {networkInfo.online ? text.quality[networkQuality] : text.offline}
                </strong>
              </div>
              <div className="boot-network-grid">
                <span>
                  <Gauge size={15} />
                  <small>{text.estimatedSpeed}</small>
                  <strong>{networkSpeedLabel}</strong>
                </span>
                <span>
                  <Activity size={15} />
                  <small>{text.latency}</small>
                  <strong>{latencyLabel}</strong>
                </span>
                <span>
                  <ShieldCheck size={15} />
                  <small>{text.saveData}</small>
                  <strong>{networkInfo.saveData ? text.online : "-"}</strong>
                </span>
                <span>
                  <ScanLine size={15} />
                  <small>{text.unsupportedNetwork}</small>
                  <strong>{networkInfo.supported ? "API" : "Fallback"}</strong>
                </span>
              </div>
            </div>

            <div className="boot-module-grid">
              {text.bootModules.map(({ label, value, Icon }) => (
                <motion.div
                  className="boot-module"
                  key={label}
                  whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </motion.div>
              ))}
            </div>

            <div className="boot-telemetry" aria-hidden="true">
              {telemetryRows.map((row, index) => (
                <span key={row} style={{ animationDelay: `${index * -0.36}s` }}>
                  {row}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
