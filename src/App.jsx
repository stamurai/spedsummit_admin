import React, { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "./supabase.js";
import * as PhosphorIcons from "@phosphor-icons/react";

const ICON_MAP = {
  house: PhosphorIcons.House,
  "play-circle": PhosphorIcons.PlayCircle,
  calendar: PhosphorIcons.CalendarBlank,
  users: PhosphorIcons.Users,
  gift: PhosphorIcons.Gift,
  "magnifying-glass": PhosphorIcons.MagnifyingGlass,
  "squares-four": PhosphorIcons.SquaresFour,
  bell: PhosphorIcons.Bell,
  gear: PhosphorIcons.Gear,
  "user-circle": PhosphorIcons.UserCircle,
  "arrow-left": PhosphorIcons.ArrowLeft,
  "arrow-right": PhosphorIcons.ArrowRight,
  "caret-right": PhosphorIcons.CaretRight,
  "caret-left":  PhosphorIcons.CaretLeft,
  lock: PhosphorIcons.Lock,
  check: PhosphorIcons.Check,
  "check-circle": PhosphorIcons.CheckCircle,
  heart: PhosphorIcons.Heart,
  "heart-straight": PhosphorIcons.HeartStraight,
  "chat-circle": PhosphorIcons.ChatCircle,
  "share-network": PhosphorIcons.ShareNetwork,
  "dots-three-vertical":  PhosphorIcons.DotsThreeVertical,
  "dots-three":           PhosphorIcons.DotsThree,
  "dots-six-vertical":    PhosphorIcons.DotsSixVertical,
  "upload-simple": PhosphorIcons.UploadSimple,
  image: PhosphorIcons.Image,
  video: PhosphorIcons.Video,
  "x-circle": PhosphorIcons.XCircle,
  "warning-circle": PhosphorIcons.WarningCircle,
  info: PhosphorIcons.Info,
  "chart-bar": PhosphorIcons.ChartBar,
  "chart-line": PhosphorIcons.ChartLine,
  "trend-up": PhosphorIcons.TrendUp,
  eye: PhosphorIcons.Eye,
  pencil: PhosphorIcons.PencilSimple,
  trash: PhosphorIcons.Trash,
  flag: PhosphorIcons.Flag,
  bookmark: PhosphorIcons.BookmarkSimple,
  "sign-out": PhosphorIcons.SignOut,
  question: PhosphorIcons.Question,
  plus: PhosphorIcons.Plus,
  x: PhosphorIcons.X,
  fire: PhosphorIcons.Fire,
  star: PhosphorIcons.Star,
  list: PhosphorIcons.List,
  "sort-ascending": PhosphorIcons.SortAscending,
  funnel: PhosphorIcons.Funnel,
  lightning: PhosphorIcons.Lightning,
  medal: PhosphorIcons.Medal,
  spinner: PhosphorIcons.Spinner,
  article: PhosphorIcons.Article,
  student: PhosphorIcons.Student,
  play: PhosphorIcons.Play,
  pause: PhosphorIcons.Pause,
  "speaker-high": PhosphorIcons.SpeakerHigh,
  "arrows-out": PhosphorIcons.ArrowsOut,
  "closed-caption": PhosphorIcons.ClosedCaptioning,
  "skip-forward": PhosphorIcons.SkipForward,
  "number-circle-one": PhosphorIcons.NumberCircleOne,
  timer: PhosphorIcons.Timer,
  "cloud-arrow-up": PhosphorIcons.CloudArrowUp,
  "spinner-gap": PhosphorIcons.SpinnerGap,
  "pencil-simple": PhosphorIcons.PencilSimple,
  "archive-tray": PhosphorIcons.ArchiveTray,
  "file-archive": PhosphorIcons.FileArchive,
  "file": PhosphorIcons.File,
  "arrow-fat-up": PhosphorIcons.ArrowFatUp,
  "arrow-fat-down": PhosphorIcons.ArrowFatDown,
  palette: PhosphorIcons.Palette,
  moon: PhosphorIcons.Moon,
  sun: PhosphorIcons.Sun,
  "floppy-disk":        PhosphorIcons.FloppyDisk,
  copy:                 PhosphorIcons.Copy,
  "radio-button":       PhosphorIcons.RadioButton,
  "check-square":       PhosphorIcons.CheckSquare,
  "caret-circle-down":  PhosphorIcons.CaretCircleDown,
  "text-align-left":    PhosphorIcons.TextAlignLeft,
  minus:                PhosphorIcons.Minus,
  "caret-down":         PhosphorIcons.CaretDown,
  "caret-up":           PhosphorIcons.CaretUp,
  "file-pdf":           PhosphorIcons.FilePdf,
  download:             PhosphorIcons.DownloadSimple,
  "paperclip":          PhosphorIcons.Paperclip,
  "certificate":        PhosphorIcons.Certificate,
  "device-mobile":      PhosphorIcons.DeviceMobile,
  "thumbs-up":          PhosphorIcons.ThumbsUp,
  "arrow-clockwise":    PhosphorIcons.ArrowClockwise,
  "chevron-left":       PhosphorIcons.CaretLeft,
  "chevron-right":      PhosphorIcons.CaretRight,
  "toggle-left":        PhosphorIcons.ToggleLeft,
  "toggle-right":       PhosphorIcons.ToggleRight,
  "warning":            PhosphorIcons.Warning,
  "wifi-slash":         PhosphorIcons.WifiSlash,
  "shield-check":       PhosphorIcons.ShieldCheck,
  "paper-plane-tilt":   PhosphorIcons.PaperPlaneTilt,
  "arrow-square-out":   PhosphorIcons.ArrowSquareOut,
  clock:                PhosphorIcons.Clock,
  trophy:               PhosphorIcons.Trophy,
  "chat-circle-dots":   PhosphorIcons.ChatCircleDots,
  megaphone:            PhosphorIcons.Megaphone,
  "book-open":          PhosphorIcons.BookOpen,
  target:               PhosphorIcons.Target,
  "note-pencil":        PhosphorIcons.NotePencil,
  coffee:               PhosphorIcons.Coffee,
  confetti:             PhosphorIcons.Confetti,
  brain:                PhosphorIcons.Brain,
  clipboard:            PhosphorIcons.Clipboard,
  "twitter-logo":       PhosphorIcons.TwitterLogo,
  "linkedin-logo":      PhosphorIcons.LinkedinLogo,
  "youtube-logo":       PhosphorIcons.YoutubeLogo,
  "instagram-logo":     PhosphorIcons.InstagramLogo,
};

const Icon = ({ name, size = 20, color = "currentColor", style: s = {} }) => {
  const IconCmp = ICON_MAP[name] || PhosphorIcons.Circle;
  return (
    <IconCmp
      size={size}
      color={color}
      weight="bold"
      style={{
        display: "block",
        flexShrink: 0,
        minWidth: size,
        minHeight: size,
        ...s,
      }}
    />
  );
};
function Empty({ children, style, fullPage }) {
  if (fullPage) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
      flex:1, minHeight:"100%", padding:"24px", ...style }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        gap:24, borderRadius:0, border:"none", borderImage:"none", boxSizing:"content-box",
        padding:"64px 32px", textAlign:"center", width:"100%", maxWidth:480 }}>
        {children}
      </div>
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      gap:24, borderRadius:12, border:"1.5px dashed var(--c-gray200,#e5e7eb)",
      padding:"48px 24px", textAlign:"center", ...style }}>
      {children}
    </div>
  );
}
function EmptyMedia({ children, variant = "default", color = "#6490E8" }) {
  if (variant === "icon") return (
    <div style={{ width:48, height:48, borderRadius:12, background:`${color}18`,
      display:"flex", alignItems:"center", justifyContent:"center", marginBottom:4 }}>
      {children}
    </div>
  );
  return <div style={{ marginBottom:4 }}>{children}</div>;
}
function EmptyHeader({ children }) {
  return <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, maxWidth:340 }}>{children}</div>;
}
function EmptyTitle({ children }) {
  return <div style={{ fontSize:16, fontWeight:700, color:"var(--c-gray900,#111)", letterSpacing:-.2 }}>{children}</div>;
}
function EmptyDescription({ children }) {
  return <div style={{ fontSize:13, color:"var(--c-gray500,#6b7280)", lineHeight:1.6 }}>{children}</div>;
}
function EmptyContent({ children }) {
  return <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, width:"100%", maxWidth:320 }}>{children}</div>;
}
/* ── End empty state primitives ─────────────────────────────────────────── */
const C = {
  primary: "var(--c-primary)", primaryDark: "var(--c-primaryDark)", primaryLight: "var(--c-primaryLight)", primaryBorder: "var(--c-primaryBorder)",
  success: "var(--c-success)", successLight: "var(--c-successLight)", successBorder: "var(--c-successBorder)",
  warning: "var(--c-warning)", warningLight: "var(--c-warningLight)", warningBorder: "var(--c-warningBorder)",
  error: "var(--c-error)", errorLight: "var(--c-errorLight)", errorBorder: "var(--c-errorBorder)",
  info: "var(--c-info)", infoLight: "var(--c-infoLight)", infoBorder: "var(--c-infoBorder)",
  gray50: "var(--c-gray50)", gray100: "var(--c-gray100)", gray200: "var(--c-gray200)", gray300: "var(--c-gray300)",
  gray400: "var(--c-gray400)", gray500: "var(--c-gray500)", gray600: "var(--c-gray600)", gray700: "var(--c-gray700)",
  gray800: "var(--c-gray800)", gray900: "var(--c-gray900)",
  white: "var(--c-white)",
};

/* ─────────────────────────────────────────────────────────────────────────────
   TOAST SYSTEM
───────────────────────────────────────────────────────────────────────────── */
function useCountdown(targetDate) {
  const [diff, setDiff] = useState(() => targetDate - Date.now());
  useEffect(() => {
    const t = setInterval(() => setDiff(targetDate - Date.now()), 60000);
    return () => clearInterval(t);
  }, [targetDate]);
  if (diff <= 0) return null;
  const totalMins = Math.floor(diff / 60000);
  const days  = Math.floor(totalMins / 1440);
  const hours = Math.floor((totalMins % 1440) / 60);
  const mins  = totalMins % 60;
  if (days > 0)  return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

function SessionCountdown({ dateStr, timeStr, fallback = null }) {
  function parseDate() {
    try {
      const year = new Date().getFullYear();
      const cleaned = dateStr.replace(/(\d+)\w*\s+(\w+)(\s+\d+)?/, (_, d, m, y) => `${d} ${m}${y || " " + year}`);
      const dt = new Date(`${cleaned} ${timeStr}`);
      return isNaN(dt) ? null : dt.getTime();
    } catch { return null; }
  }
  const target = parseDate();
  const label  = useCountdown(target || 0);
  if (!label || !target) return fallback;
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12, color:"var(--c-gray500)", background:"var(--c-gray100)", padding:"6px 12px", borderRadius:99, fontWeight:500 }}>
      Starting in <span style={{ color:"#f97316", fontWeight:700 }}>{label}</span>
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const remove = useCallback(id => setToasts(t => t.filter(x => x.id !== id)), []);
  const toast = useCallback(({ title, message, type = "info", duration = 3800 }) => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t.slice(-3), { id, title, message, type }]);
    setTimeout(() => remove(id), duration);
  }, [remove]);
  return { toasts, toast, remove };
}

function ToastContainer({ toasts, onRemove }) {
  const cfg = {
    success: { color:"#10b981", bg:"#10b981" },
    error:   { color:"#ef4444", bg:"#ef4444" },
    warning: { color:"#f59e0b", bg:"#f59e0b" },
    info:    { color:"#3b82f6", bg:"#3b82f6" },
  };
  const icons = { success:"check", error:"x", warning:"warning", info:"info" };
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, display:"flex", flexDirection:"column", gap:8, pointerEvents:"none" }}>
      {toasts.map(t => {
        const c = cfg[t.type] || cfg.info;
        return (
          <div key={t.id} onClick={() => onRemove(t.id)}
            style={{ display:"flex", alignItems:"center", gap:12, background:C.white, border:`1px solid ${C.gray100}`, borderRadius:14, padding:"12px 14px 12px 12px", minWidth:280, maxWidth:360, boxShadow:"0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)", pointerEvents:"all", cursor:"pointer", animation:"toastIn .22s cubic-bezier(.34,1.4,.64,1)" }}>
            {/* Filled circle icon */}
            <div style={{ width:32, height:32, borderRadius:"50%", background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon name={icons[t.type]||"info"} size={15} color="#fff"/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              {t.title && <div style={{ fontWeight:700, fontSize:14, color:C.gray900, marginBottom:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.title}</div>}
              <div style={{ fontSize:14, color: t.title ? C.gray500 : C.gray800, lineHeight:1.4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace: t.title ? "nowrap" : "normal" }}>{t.message}</div>
            </div>
            <div style={{ width:20, height:20, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:C.gray400 }}>
              <Icon name="x" size={12} color={C.gray400}/>
            </div>
          </div>
        );
      })}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(10px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
    </div>
  );
}
const THUMB_PHOTOS = [
  "photo-1503676260728-1c00da094a0b", // classroom/learning
  "photo-1588072432836-e10032774350", // students inclusion
  "photo-1509062522246-3755977927d7", // language/literacy
  "photo-1522202176988-66273c2fd55f", // teamwork/collaboration
  "photo-1485827404703-89b55fcc595e", // AI/technology
  "photo-1544027993-37dbfe43562a", // communication/AAC
];

function extractVimeoId(url) {
  if (!url) return null;
  if (/^\d+$/.test(url.trim())) return url.trim();
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}
function extractVimeoHash(url) {
  if (!url) return null;
  // unlisted videos: vimeo.com/VIDEO_ID/HASH
  const match = url.match(/vimeo\.com\/\d+\/([a-f0-9]+)/);
  return match ? match[1] : null;
}

function AdminThumb({ idx = 0 }) {
  const photo = THUMB_PHOTOS[idx % THUMB_PHOTOS.length];
  const src = `https://images.unsplash.com/${photo}?w=144&h=104&fit=crop&auto=format`;
  return (
    <div style={{ width:72, height:52, borderRadius:8, overflow:"hidden", flexShrink:0, background:"#e5e7eb" }}>
      <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
    </div>
  );
}
const SESSIONS = [
  { id:1, title:"Mental Health & Teacher Wellness in Special Education", category:"MANAGEMENT", instructor:"Tara Roehl", instructorBio:"Occupational Therapist and founder of The Calm Caterpillar sharing mindfulness-based strategies to support emotional regulation and wellness.", instructorQuote:"Wellness is not a luxury — it's the foundation of effective teaching.", duration:"45 mins", resources:3, progress:100, status:"completed", description:"Discover innovative strategies and tools that can help you create and manage successful distributed teams with mindfulness at the core.", lessons:[{id:1,sectionTitle:"Getting Started",title:"The Foundation",duration:"12:00",status:"completed",type:"video"},{id:"1q",title:"Foundations Check",questions:5,status:"completed",type:"quiz"},{id:2,sectionTitle:"Building Your Practice",title:"Team Architecture",duration:"45:00",status:"active",type:"video"},{id:3,title:"Sync vs Async",duration:"28:40",status:"locked",type:"video"},{id:"2q",title:"Mid-Session Assessment",questions:10,status:"locked",type:"quiz"},{id:4,sectionTitle:"Advanced Strategies",title:"Tooling for Scale",duration:"32:15",status:"locked",type:"video"},{id:"3q",title:"Final Knowledge Check",questions:15,status:"locked",type:"quiz"}] },
  { id:2, title:"Accommodations & Inclusion: Integrating Students into Mainstream Education", category:"LEADERSHIP", instructor:"Casey Harrison", instructorBio:"Certified Dyslexia Specialist and founder of The Dyslexia Classroom sharing research-aligned strategies for inclusive education.", instructorQuote:"The architecture of your classroom is the invisible ceiling of your students' growth.", duration:"60 mins", resources:2, progress:65, status:"in-progress", description:"Leverage the power of proven frameworks to supercharge your creative output and unlock new levels of innovation in inclusive classrooms.", lessons:[{id:1,sectionTitle:"Foundations",title:"Understanding Inclusion",duration:"15:00",status:"completed",type:"video"},{id:"1q",title:"Inclusion Concepts Quiz",questions:8,status:"active",type:"quiz"},{id:2,sectionTitle:"Practical Application",title:"Practical Accommodations",duration:"20:00",status:"active",type:"video"},{id:3,title:"IEP Deep Dive",duration:"25:00",status:"locked",type:"video"},{id:"2q",title:"Final Assessment",questions:12,status:"locked",type:"quiz"}] },
  { id:3, title:"Empowering Language and Literacy Skills with DHH Children", category:"COMMUNICATION", instructor:"Jordan Smith", instructorBio:"Speech-Language Pathologist and founder of The Listening SLP sharing evidence-informed strategies for language and literacy foundations.", instructorQuote:"Every child has a voice — our job is to help them find it.", duration:"50 mins", resources:4, progress:35, status:"in-progress", description:"Gather qualitative and quantitative data to inform design decisions and enhance user satisfaction in educational settings.", lessons:[{id:1,sectionTitle:"Core Concepts",title:"Foundations of DHH",duration:"18:00",status:"completed",type:"video"},{id:"1q",title:"DHH Fundamentals Quiz",questions:6,status:"active",type:"quiz"},{id:2,sectionTitle:"Language & Literacy",title:"Language Bridges",duration:"22:00",status:"active",type:"video"},{id:3,title:"Literacy Strategies",duration:"10:00",status:"locked",type:"video"},{id:"2q",title:"Literacy Assessment",questions:10,status:"locked",type:"quiz"}] },
  { id:4, title:"Paraeducators & Team Collaboration: Training, Delegation & More", category:"TEAMWORK", instructor:"Morgan Lee", instructorBio:"Diana Williams shares practical leadership-driven strategies for building strong collaborative partnerships between teachers and paraeducators.", instructorQuote:"Strong teams don't happen by accident — they're built with intention.", duration:"40 mins", resources:1, progress:0, status:"locked", description:"Create high-fidelity prototypes to visualize functionality and gather early-stage feedback from team members.", lessons:[{id:1,sectionTitle:"Team Foundations",title:"Role Clarity",duration:"10:00",status:"locked",type:"video"},{id:2,title:"Delegation Models",duration:"15:00",status:"locked",type:"video"},{id:"1q",sectionTitle:"Advanced Collaboration",title:"Team Dynamics Quiz",questions:8,status:"locked",type:"quiz"},{id:3,title:"Communication Rhythms",duration:"15:00",status:"locked",type:"video"}] },
  { id:5, title:"AI and Advanced Technologies in Special Education", category:"TECHNOLOGY", instructor:"Dr. Emily Tran", instructorBio:"Dr. Emily Tran guides educators through utilizing data to inform teaching practices and enhance student learning.", instructorQuote:"Data without empathy is just numbers. Together, they transform learning.", duration:"55 mins", resources:2, progress:0, status:"not-started", description:"Conduct sessions to observe user interactions and identify usability issues for iterative design improvement.", lessons:[{id:1,sectionTitle:"Introduction to AI",title:"AI Overview in Education",duration:"12:00",status:"available",type:"video"},{id:2,title:"Tools & Platforms",duration:"20:00",status:"locked",type:"video"},{id:"1q",sectionTitle:"Implementation",title:"AI Tools Knowledge Check",questions:10,status:"locked",type:"quiz"},{id:3,title:"Implementation Strategies",duration:"23:00",status:"locked",type:"video"}] },
  { id:6, title:"Understanding & Supporting Communication for Students with AAC", category:"ACCESSIBILITY", instructor:"Dr. Sarah Kim", instructorBio:"AAC specialist with 15+ years supporting students with complex communication needs in inclusive environments.", instructorQuote:"Communication is a human right — AAC makes it possible for everyone.", duration:"48 mins", resources:3, progress:0, status:"not-started", description:"Analyze the product for compliance with accessibility standards to ensure it serves all users regardless of ability.", lessons:[{id:1,title:"What is AAC?",duration:"10:00",status:"available",type:"video"},{id:2,title:"Device Selection",duration:"18:00",status:"locked",type:"video"},{id:"1q",title:"AAC Basics Quiz",questions:7,status:"locked",type:"quiz"},{id:3,title:"Implementation in Class",duration:"20:00",status:"locked",type:"video"}] },
  { id:7, title:"Unlocking Reading for Students with Dyslexia", category:"LEADERSHIP", instructor:"Sydney Bassard", instructorBio:"Certified dyslexia specialist sharing structured literacy approaches for struggling readers.", instructorQuote:"Every student can learn to read with the right instruction.", duration:"52 mins", resources:2, progress:0, status:"not-started", description:"Structured literacy approaches and early intervention strategies proven to accelerate reading growth in students with dyslexia.", lessons:[{id:1,title:"Screening Basics",duration:"12:00",status:"available",type:"video"}] },
  { id:8, title:"Leading High-Impact SPED Programs", category:"MANAGEMENT", instructor:"Diana Williams", instructorBio:"SPED leadership coach helping directors build high-performing programs.", instructorQuote:"Strong programs are built with intention and data.", duration:"50 mins", resources:2, progress:0, status:"not-started", description:"How to build, sustain, and continuously improve a special education program that delivers real results for students and families.", lessons:[{id:1,title:"Program Foundations",duration:"14:00",status:"available",type:"video"}] },
];
const INSTRUCTOR_AVATARS = {
  "Tara Roehl":      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&auto=format",
  "Casey Harrison":  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&auto=format",
  "Jordan Smith":    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format",
  "Morgan Lee":      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&auto=format",
  "Dr. Emily Tran":  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&auto=format",
  "Dr. Sarah Kim":   "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&auto=format",
  "Sydney Bassard":  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format",
  "Diana Williams":  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&auto=format",
};
const NOTIF_DATA = [];

const SEASONS = [
  {
    id: "spring-2026",
    name: "Spring 2026",
    tagline: "Live & Upcoming",
    description: "Current live sessions and upcoming content for the Spring 2026 SPED Summit.",
    sessionIds: [1, 2, 5, 6],
    color: "#2563eb",
    bg: "#dbeafe",
    updatedAt: "Apr 2026",
  },
  {
    id: "winter-2026",
    name: "Winter 2026",
    tagline: "Past Season",
    description: "Recorded sessions from the Winter 2026 SPED Summit. All recordings available.",
    sessionIds: [3, 4],
    color: "#5D636F",
    bg: "#f3f4f6",
    updatedAt: "Jan 2026",
  },
  {
    id: "summer-2026",
    name: "Summer 2026",
    tagline: "Past Season",
    description: "Recorded sessions from the Summer 2026 SPED Summit. All recordings available.",
    sessionIds: [5, 6],
    color: "#5D636F",
    bg: "#f3f4f6",
    updatedAt: "Jul 2026",
  },
  {
    id: "spring-2025",
    name: "Spring 2025",
    tagline: "Past Season",
    description: "Recorded sessions from the Spring 2025 SPED Summit. All recordings available.",
    sessionIds: [1, 3],
    color: "#5D636F",
    bg: "#f3f4f6",
    updatedAt: "Apr 2025",
  },
  {
    id: "winter-2025",
    name: "Winter 2025",
    tagline: "Past Season",
    description: "Recorded sessions from the Winter 2025 SPED Summit. All recordings available.",
    sessionIds: [2, 4],
    color: "#5D636F",
    bg: "#f3f4f6",
    updatedAt: "Jan 2025",
  },
  {
    id: "summer-2025",
    name: "Summer 2025",
    tagline: "Past Season",
    description: "Recorded sessions from the Summer 2025 SPED Summit. All recordings available.",
    sessionIds: [1, 2],
    color: "#5D636F",
    bg: "#f3f4f6",
    updatedAt: "Jul 2025",
  },
  {
    id: "spring-2024",
    name: "Spring 2024",
    tagline: "Past Season",
    description: "Recorded sessions from the Spring 2024 SPED Summit. All recordings available.",
    sessionIds: [3, 5],
    color: "#5D636F",
    bg: "#f3f4f6",
    updatedAt: "Apr 2024",
  },
  {
    id: "winter-2024",
    name: "Winter 2024",
    tagline: "Past Season",
    description: "Recorded sessions from the Winter 2024 SPED Summit. All recordings available.",
    sessionIds: [4, 6],
    color: "#5D636F",
    bg: "#f3f4f6",
    updatedAt: "Jan 2024",
  },
  {
    id: "summer-2024",
    name: "Summer 2024",
    tagline: "Past Season",
    description: "Recorded sessions from the Summer 2024 SPED Summit. All recordings available.",
    sessionIds: [1, 4],
    color: "#5D636F",
    bg: "#f3f4f6",
  },
];
const SESSION_AVAILABILITY = {
  1: { availableFrom:"2026-03-26T09:00", availableTo:"2027-12-31T23:59", hasRecording:true  },
  2: { availableFrom:"2026-03-26T11:00", availableTo:"2027-12-31T23:59", hasRecording:true  },
  3: { availableFrom:"2025-01-06T09:00", availableTo:"2025-06-30T23:59", hasRecording:false },
  4: { availableFrom:"2025-01-07T09:00", availableTo:"2025-06-30T23:59", hasRecording:true  },
  5: { availableFrom:"2026-03-28T09:00", availableTo:"2027-12-31T23:59", hasRecording:false },
  6: { availableFrom:"2026-03-28T11:00", availableTo:"2027-12-31T23:59", hasRecording:false },
};

// 'live' | 'upcoming' | 'past' | 'unavailable'
// Accepts either a sessionId (looks up SESSION_AVAILABILITY) or a session object with availableFrom/availableTo
function getSessionState(sessionIdOrObj) {
  const now = new Date();
  // If passed a session object with its own date fields (Supabase sessions)
  if (sessionIdOrObj && typeof sessionIdOrObj === "object") {
    const from = sessionIdOrObj.availableFrom || sessionIdOrObj.available_from;
    const to   = sessionIdOrObj.availableTo   || sessionIdOrObj.available_to;
    if (!from) return "live"; // no date set → always available
    if (to && now > new Date(to)) return "past";
    if (now < new Date(from)) return "upcoming";
    return "live";
  }
  // Legacy: look up by id
  const avail = SESSION_AVAILABILITY[sessionIdOrObj];
  if (!avail || !avail.availableFrom) return "unavailable";
  if (avail.availableTo && now > new Date(avail.availableTo)) return "past";
  if (now < new Date(avail.availableFrom)) return "upcoming";
  return "live";
}

function isSessionAvailable(sessionId) { return getSessionState(sessionId) === "live"; }
function isSessionArchived(sessionId)  { return getSessionState(sessionId) === "past"; }

// For Supabase sessions (pass full session object)
function getSessionStateFromObj(s) { return getSessionState(s); }
function isSupabaseSessionLive(s)  { return getSessionStateFromObj(s) === "live"; }
function isSupabaseSessionPast(s)  { return getSessionStateFromObj(s) === "past"; }
const ADMIN_STATUS_COLORS = { LIVE:{c:"#fff",bg:"#10b981"}, DRAFT:{c:"#d97706",bg:"rgba(217,119,6,0.18)"}, ARCHIVED:{c:"var(--c-gray600)",bg:"rgba(156,163,175,0.18)"} };

const ADMIN_SESSIONS_DATA = [
  { id:1, title:"Mental Health & Teacher Wellness in Special Education", category:"SPED", status:"LIVE", date:"Mar 26, 2026", enrolled:1240, availableFrom:"2026-03-26T09:00", availableTo:"2027-12-31T23:59" },
  { id:2, title:"Accommodations & Inclusion: Integrating Students into Mainstream Education", category:"SPED", status:"LIVE", date:"Mar 26, 2026", enrolled:850, availableFrom:"2026-03-26T11:00", availableTo:"2027-12-31T23:59" },
  { id:3, title:"Empowering Language and Literacy Skills with DHH Children", category:"SPED", status:"ARCHIVED", date:"Jan 6, 2025", enrolled:620, availableFrom:"2025-01-06T09:00", availableTo:"2025-06-30T23:59" },
  { id:4, title:"Paraeducators & Team Collaboration: Training, Delegation & More", category:"SPED", status:"ARCHIVED", date:"Jan 7, 2025", enrolled:410, availableFrom:"2025-01-07T09:00", availableTo:"2025-06-30T23:59" },
  { id:5, title:"Introduction to Accessibility in SPED", category:"SPED", status:"ARCHIVED", date:"Archived Mar 2026", enrolled:320, availableFrom:"2025-01-01T09:00", availableTo:"2026-03-01T23:59" },
];
function Skeleton({ width="100%", height=16, radius=8, style:s={} }) {
  return (
    <div style={{ width, height, borderRadius:radius, background:"linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)", backgroundSize:"200% 100%", animation:"skeleton-shimmer 1.4s infinite", flexShrink:0, ...s }}/>
  );
}

function SkeletonSessionCard() {
  return (
    <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", overflow:"hidden" }}>
      <Skeleton height={160} radius={0}/>
      <div style={{ padding:"14px 16px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        <Skeleton height={14} width="60%" radius={6}/>
        <Skeleton height={18} width="90%" radius={6}/>
        <Skeleton height={14} width="75%" radius={6}/>
        <div style={{ display:"flex", gap:8, marginTop:4 }}>
          <Skeleton height={28} width={90} radius={8}/>
          <Skeleton height={28} width={70} radius={8}/>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, src, size=36 }) {
  const [imgFailed, setImgFailed] = useState(false);
  const colors = ["#6490E8","#4a77d4","#FF8F6C","#2B2E33","#5D636F","#7aa3ee","#a0b8f0"];
  const c = colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
  const showImg = src && !imgFailed;
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:showImg ? "transparent" : c, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:size*0.36, flexShrink:0, letterSpacing:0.5, overflow:"hidden" }}>
      {showImg
        ? <img src={src} alt={name} onError={()=>setImgFailed(true)} style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }}/>
        : initials}
    </div>
  );
}

function ProgressBar({ value, color=C.primary, height=4, trackColor=C.gray200 }) {
  return <div style={{ background:trackColor, borderRadius:99, height, overflow:"hidden" }}><div style={{ width:`${value}%`, background:color, height:"100%", borderRadius:99, transition:"width 0.5s ease" }}/></div>;
}

function Badge({ label, color, bg, size=10 }) {
  return <span style={{ fontSize:size, fontWeight:700, color, background:bg, padding:"2px 8px", borderRadius:6, letterSpacing:0.4, display:"inline-block", lineHeight:1.6 }}>{label}</span>;
}

function Btn({ children, onClick, variant="primary", size="md", disabled=false, style:s={} }) {
  const sizes = { sm:"6px 13px", md:"9px 18px", lg:"11px 26px" };
  const variants = {
    primary: { background: disabled ? C.gray200 : C.primary, color: disabled ? C.gray400 : "#fff", border:"none" },
    outline: { background:C.white, color:C.gray700, border:`1px solid ${C.gray300}` },
    ghost:   { background:"transparent", color:C.primary, border:"none" },
    danger:  { background:C.errorLight, color:C.error, border:`1px solid ${C.errorBorder}` },
    success: { background:C.successLight, color:C.success, border:`1px solid ${C.successBorder}` },
  };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled}
      style={{ padding:sizes[size], borderRadius:10, fontSize:14, fontWeight:600, cursor:disabled?"not-allowed":"pointer",
        display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, lineHeight:1,
        transition:"all .15s", ...variants[variant], ...s }}
      onMouseEnter={e=>{ if(!disabled){ e.currentTarget.style.opacity=".85"; e.currentTarget.style.transform="translateY(-1px)"; }}}
      onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform=""; }}>
      {children}
    </button>
  );
}
function DropdownMenu({ items, onClose, anchorRef }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (anchorRef?.current?.contains(e.target)) return;
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorRef]);
  return (
    <div ref={ref} style={{ position:"absolute", right:0, top:"110%", background:C.white, border:`1px solid ${C.gray200}`, borderRadius:12, boxShadow:"0 8px 24px rgba(0,0,0,0.12)", minWidth:170, zIndex:200, overflow:"hidden", animation:"fadeIn .15s ease" }}>
      {items.map((item, i) => (
        <button key={i} onClick={() => { item.action(); onClose(); }}
          style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 16px", background:"transparent", border:"none", fontSize:14, fontWeight:500, color:item.danger?C.error:C.gray700, cursor:"pointer", borderBottom:i<items.length-1?`1px solid ${C.gray100}`:"none", textAlign:"left" }}
          onMouseEnter={e=>e.currentTarget.style.background=C.gray50}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          {item.icon && <Icon name={item.icon} size={16} color={item.danger?C.error:C.gray500}/>}
          <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.label}</span>
        </button>
      ))}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}
function UploadZone({ accept, label, hint, icon, preview, onFile, aspect="16/9", height=130, circle=false }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [localPreview, setLocalPreview] = useState(preview || null);
  const dark = document.querySelector("[data-theme='dark']") !== null;

  useEffect(() => { if (preview) setLocalPreview(preview); }, [preview]);

  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setLocalPreview(e.target.result);
    reader.readAsDataURL(file);
    if (onFile) onFile(file);
  }

  const borderRadius = circle ? "50%" : 12;
  const containerStyle = circle
    ? { width: height, height, borderRadius:"50%", flexShrink:0 }
    : { width:"100%", aspectRatio: aspect, maxHeight: height };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
      style={{ ...containerStyle, border:`2px dashed ${dragging ? C.primary : localPreview ? "transparent" : dark ? "rgba(255,255,255,0.15)" : C.gray300}`, borderRadius, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", background:dragging ? C.primaryLight : localPreview ? "transparent" : dark ? "rgba(255,255,255,0.04)" : "#fafafa", transition:"all .2s", position:"relative", overflow:"hidden" }}>
      {localPreview ? (
        <>
          <img src={localPreview} alt="preview" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, opacity:0, transition:"opacity .15s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}>
            <Icon name="upload-simple" size={18} color="#fff"/>
            <span style={{ fontSize:11, color:"#fff", fontWeight:600 }}>Replace</span>
          </div>
        </>
      ) : (
        <>
          <Icon name={icon||"cloud-arrow-up"} size={circle ? 24 : 28} color={dragging ? C.primary : dark ? "rgba(255,255,255,0.3)" : C.gray400}/>
          {!circle && <span style={{ fontSize:13, color: dark ? "rgba(255,255,255,0.6)" : C.gray600, fontWeight:600, marginTop:8 }}>{label||"Click or drag to upload"}</span>}
          {hint && !circle && <span style={{ fontSize:11, color: dark ? "rgba(255,255,255,0.35)" : C.gray400, marginTop:4 }}>{hint}</span>}
        </>
      )}
      <input ref={inputRef} type="file" accept={accept||"*/*"} style={{ display:"none" }} onChange={e => handleFile(e.target.files[0])}/>
    </div>
  );
}
function NotificationPopover({ onClose, anchorRef }) {
  const [notifs, setNotifs] = useState(NOTIF_DATA);
  const ref = useRef(null);
  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const handler = e => {
      if (anchorRef?.current?.contains(e.target)) return;
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorRef]);

  function markRead(id) { setNotifs(ns => ns.map(n => n.id === id ? { ...n, read:true } : n)); }
  function markAllRead() { setNotifs(ns => ns.map(n => ({ ...n, read:true }))); }

  return (
    <div ref={ref} style={{
      position:"fixed", top:68, right:12,
      width:360, maxWidth:"calc(100vw - 24px)", background:C.white, borderRadius:14,
      border:`1px solid ${C.gray200}`, boxShadow:"0 8px 32px rgba(0,0,0,0.12)",
      zIndex:300, animation:"fadeIn .18s ease"
    }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", padding:"10px 14px 8px" }}>
        <span style={{ fontWeight:700, fontSize:14, color:C.gray900 }}>Notifications</span>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            style={{ fontSize:12, fontWeight:500, color:C.gray600, background:"none", border:"none", cursor:"pointer", padding:0, fontFamily:"inherit" }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
            onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>
            Mark all as read
          </button>
        )}
      </div>

      {/* Divider */}
      <div style={{ height:1, background:C.gray200, margin:"0 4px" }}/>

      {/* List */}
      <div>
        {notifs.length === 0 && (
          <div style={{ padding:"32px 16px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
            <Icon name="bell" size={24} color={C.gray300}/>
            <div style={{ fontSize:13, fontWeight:600, color:C.gray700 }}>You're all caught up!</div>
            <div style={{ fontSize:12, color:C.gray400 }}>No new notifications</div>
          </div>
        )}
        {notifs.map(n => (
          <div key={n.id}
            onClick={() => markRead(n.id)}
            style={{ borderRadius:8, padding:"8px 10px", margin:"2px 4px", cursor:"pointer", transition:"background .12s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.gray50}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ position:"relative", display:"flex", alignItems:"flex-start", gap:10, paddingRight:16 }}>
              {/* Avatar */}
              <img src={n.img} alt={n.user} style={{ width:36, height:36, borderRadius:8, objectFit:"cover", flexShrink:0 }}/>
              {/* Text */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, color:C.gray600, lineHeight:1.45 }}>
                  <span style={{ fontWeight:600, color:C.gray900 }}>{n.user}</span>
                  {" "}{n.action}{" "}
                  <span style={{ fontWeight:600, color:C.gray900 }}>{n.target}</span>.
                </div>
                <div style={{ fontSize:12, color:C.gray400, marginTop:3 }}>{n.time}</div>
              </div>
              {/* Unread dot */}
              {!n.read && (
                <div style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", width:7, height:7, borderRadius:"50%", background:C.primary, flexShrink:0 }}/>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function SpedLogo({ height = 34 }) {
  /* Aspect ratio of the brand asset: 71 × 36 */
  const w = Math.round(height * (71 / 36));
  return (
    <svg id="spedLogoSvg" width={w} height={height} viewBox="0 0 71 36" fill="none"
      xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ display:"block" }}>
      <rect width="71" height="36" fill="url(#spedLogoPattern)"/>
      <defs>
        <pattern id="spedLogoPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#spedLogoImg" transform="matrix(0.00507042 0 0 0.01 0.00309859 0)"/>
        </pattern>
        <image id="spedLogoImg" width="196" height="100" preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"/>
      </defs>
    </svg>
  );
}
const RECENT_SEARCHES_KEY = "sped_recent_searches";
function getRecentSearches() {
  try { return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "[]"); } catch { return []; }
}
function saveRecentSearch(q) {
  if (!q.trim()) return;
  const prev = getRecentSearches().filter(s => s !== q.trim()).slice(0, 9);
  try { localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify([q.trim(), ...prev])); } catch {}
}

function MobileSearchPage({ onOpenSession, onNavigate, onClose, sessions = [] }) {
  const [query, setQuery] = useState("");
  const [recents, setRecents] = useState(getRecentSearches);
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 80); }, []);
  useEffect(() => {
    document.body.classList.add('hide-bottom-nav');
    return () => document.body.classList.remove('hide-bottom-nav');
  }, []);

  const q = query.trim().toLowerCase();
  const sessionResults = q.length < 1 ? [] : sessions.filter(s =>
    s.title.toLowerCase().includes(q) ||
    (s.instructor||"").toLowerCase().includes(q) ||
    (s.category||"").toLowerCase().includes(q) ||
    (s.description||"").toLowerCase().includes(q)
  ).slice(0, 6);
  const pageResults = q.length < 1 ? [] : SEARCH_PAGES.filter(p => p.label.toLowerCase().includes(q));
  const instructorResults = q.length < 1 ? [] : [...new Map(
    sessions.filter(s => (s.instructor||"").toLowerCase().includes(q)).map(s => [s.instructor, s])
  ).values()].slice(0, 3);
  const hasResults = sessionResults.length > 0 || pageResults.length > 0 || instructorResults.length > 0;

  function pick(fn) {
    saveRecentSearch(query);
    setRecents(getRecentSearches());
    fn();
    onClose();
  }

  function pickRecent(r) {
    setQuery(r);
  }

  function removeRecent(r, e) {
    e.stopPropagation();
    const updated = getRecentSearches().filter(s => s !== r);
    try { localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated)); } catch {}
    setRecents(updated);
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:999, background:C.white, display:"flex", flexDirection:"column", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", borderBottom:`1px solid ${C.gray200}` }}>
        <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:C.gray50, border:`1px solid ${C.gray200}`, borderRadius:10, padding:"8px 12px" }}>
          <Icon name="magnifying-glass" size={16} color={C.gray400}/>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search sessions…"
            style={{ flex:1, minWidth:0, width:0, border:"none", background:"none", outline:"none", fontSize:15, color:C.gray900, fontFamily:"inherit" }}
          />
          {query.length > 0 && (
            <button onClick={() => setQuery("")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:0 }}>
              <Icon name="x-circle" size={16} color={C.gray400}/>
            </button>
          )}
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15, fontWeight:600, color:C.primary, padding:"4px 0", flexShrink:0 }}>
          Cancel
        </button>
      </div>

      {/* Body */}
      <div style={{ flex:1, overflowY:"auto" }}>

        {/* No query — show recents + quick links */}
        {q.length === 0 && (
          <div>
            {recents.length > 0 && (
              <div style={{ padding:"20px 16px 8px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                  <span style={{ fontSize:12, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase" }}>Recent Searches</span>
                  <button onClick={() => { localStorage.removeItem(RECENT_SEARCHES_KEY); setRecents([]); }}
                    style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, color:C.primary }}>Clear all</button>
                </div>
                {recents.map(r => (
                  <button key={r} onClick={() => pickRecent(r)}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"11px 4px", background:"none", border:"none", cursor:"pointer", borderBottom:`1px solid ${C.gray100}`, textAlign:"left" }}>
                    <Icon name="clock-counter-clockwise" size={16} color={C.gray400}/>
                    <span style={{ flex:1, fontSize:14, color:C.gray700 }}>{r}</span>
                    <span onClick={e => removeRecent(r, e)} style={{ padding:"2px 4px", cursor:"pointer" }}>
                      <Icon name="x" size={13} color={C.gray400}/>
                    </span>
                  </button>
                ))}
              </div>
            )}
            <div style={{ padding:`${recents.length > 0 ? 8 : 20}px 16px 8px` }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase", marginBottom:12 }}>Quick Links</div>
              {SEARCH_PAGES.map(p => (
                <button key={p.id} onClick={() => pick(() => onNavigate(p.id))}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"12px 4px", background:"none", border:"none", cursor:"pointer", borderBottom:`1px solid ${C.gray100}`, textAlign:"left" }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon name={p.icon} size={15} color={C.primary}/>
                  </div>
                  <span style={{ fontSize:14, fontWeight:500, color:C.gray800 }}>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Has query — show results */}
        {q.length > 0 && !hasResults && (
          <div style={{ padding:"48px 16px", textAlign:"center", color:C.gray400, fontSize:14 }}>
            No results for "<strong style={{ color:C.gray600 }}>{query}</strong>"
          </div>
        )}

        {pageResults.length > 0 && (
          <div style={{ padding:"16px 16px 4px" }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase", marginBottom:8 }}>Pages</div>
            {pageResults.map(p => (
              <button key={p.id} onClick={() => pick(() => onNavigate(p.id))}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"12px 4px", background:"none", border:"none", cursor:"pointer", borderBottom:`1px solid ${C.gray100}`, textAlign:"left" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name={p.icon} size={15} color={C.primary}/>
                </div>
                <span style={{ fontSize:14, fontWeight:600, color:C.gray800 }}>{p.label}</span>
              </button>
            ))}
          </div>
        )}

        {instructorResults.length > 0 && (
          <div style={{ padding:"16px 16px 4px" }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase", marginBottom:8 }}>Instructors</div>
            {instructorResults.map(s => (
              <button key={s.instructor} onClick={() => pick(() => onOpenSession(s))}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"12px 4px", background:"none", border:"none", cursor:"pointer", borderBottom:`1px solid ${C.gray100}`, textAlign:"left" }}>
                <Avatar name={s.instructor} src={INSTRUCTOR_AVATARS[s.instructor]} size={32}/>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:C.gray800 }}>{s.instructor}</div>
                  <div style={{ fontSize:12, color:C.gray400 }}>{s.category}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {sessionResults.length > 0 && (
          <div style={{ padding:"16px 16px 24px" }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase", marginBottom:8 }}>Sessions</div>
            {sessionResults.map(s => (
              <button key={s.id} onClick={() => pick(() => onOpenSession(s))}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"12px 4px", background:"none", border:"none", cursor:"pointer", borderBottom:`1px solid ${C.gray100}`, textAlign:"left" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name="play-circle" size={15} color={C.primary}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:C.gray800, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.title}</div>
                  <div style={{ fontSize:12, color:C.gray400 }}>{s.instructor} · {s.category}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const ADMIN_SEARCH_PAGES = [
  { id:"admin-overview",   label:"Overview",      icon:"house",        type:"page" },
  { id:"admin-sessions",   label:"My Sessions",   icon:"play-circle",  type:"page" },
  { id:"admin-analytics",  label:"Analytics",     icon:"chart-bar",    type:"page" },
  { id:"admin-create",     label:"Create Session", icon:"plus-circle", type:"page" },
];

function SearchBar({ onOpenSession, onNavigate, isAdmin = false, sessions = [] }) {
  const [query, setQuery]   = useState("");
  const [open,  setOpen]    = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const q = query.trim().toLowerCase();
  const searchPool = sessions;
  const pagePool   = isAdmin ? ADMIN_SEARCH_PAGES  : SEARCH_PAGES;

  const sessionResults = q.length < 1 ? [] : searchPool.filter(s =>
    s.title.toLowerCase().includes(q) ||
    (s.instructor||"").toLowerCase().includes(q) ||
    (s.category||"").toLowerCase().includes(q) ||
    (s.description||"").toLowerCase().includes(q)
  ).slice(0, 5);

  const pageResults = q.length < 1 ? [] : pagePool.filter(p =>
    p.label.toLowerCase().includes(q)
  );

  const instructorResults = q.length < 1 ? [] : [...new Map(
    searchPool.filter(s => (s.instructor||"").toLowerCase().includes(q)).map(s => [s.instructor, s])
  ).values()].slice(0, 3);

  const hasResults = sessionResults.length > 0 || pageResults.length > 0 || instructorResults.length > 0;
  const showEmpty  = q.length >= 1 && !hasResults;

  function pick(fn) { fn(); setQuery(""); setOpen(false); }

  return (
    <div ref={ref} style={{ flex:1, maxWidth:440, position:"relative" }}>
      <div style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)" }}>
        <Icon name="magnifying-glass" size={15} color={C.gray400}/>
      </div>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search sessions, topics, instructors…"
        style={{ width:"100%", padding:"8px 12px 8px 34px", border:`1px solid ${open ? C.primary : C.gray200}`, borderRadius:9, fontSize:14, color:C.gray700, background:C.gray50, outline:"none", boxSizing:"border-box", transition:"border-color .15s" }}
      />
      {query.length > 0 && (
        <button onClick={() => { setQuery(""); setOpen(false); }}
          style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", display:"flex", padding:2 }}>
          <Icon name="x" size={13} color={C.gray400}/>
        </button>
      )}

      {open && (q.length >= 1) && (
        <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:C.white, border:`1px solid ${C.gray200}`, borderRadius:12, boxShadow:"0 8px 32px rgba(0,0,0,0.12)", zIndex:999, overflow:"hidden", maxHeight:400, overflowY:"auto" }}>

          {showEmpty && (
            <div style={{ padding:"24px 16px", textAlign:"center", color:C.gray400, fontSize:14 }}>
              No results for "<strong style={{color:C.gray600}}>{query}</strong>"
            </div>
          )}

          {pageResults.length > 0 && (
            <div>
              <div style={{ padding:"8px 14px 4px", fontSize:12, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase" }}>Pages</div>
              {pageResults.map(p => (
                <button key={p.id} onClick={() => pick(() => onNavigate(p.id))}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.gray50}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}>
                  <div style={{ width:28, height:28, borderRadius:8, background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon name={p.icon} size={14} color={C.primary}/>
                  </div>
                  <span style={{ fontSize:14, fontWeight:600, color:C.gray800 }}>{p.label}</span>
                </button>
              ))}
            </div>
          )}

          {instructorResults.length > 0 && (
            <div>
              <div style={{ padding:"8px 14px 4px", fontSize:12, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase" }}>Instructors</div>
              {instructorResults.map(s => (
                <button key={s.instructor} onClick={() => pick(() => onOpenInstructor ? onOpenInstructor(s.instructor) : onOpenSession(s))}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.gray50}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}>
                  <Avatar name={s.instructor} src={INSTRUCTOR_AVATARS[s.instructor]} size={28}/>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:C.gray800 }}>{s.instructor}</div>
                    <div style={{ fontSize:12, color:C.gray400 }}>{s.category}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {sessionResults.length > 0 && (
            <div>
              <div style={{ padding:"8px 14px 4px", fontSize:12, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase" }}>Sessions</div>
              {sessionResults.map(s => (
                <button key={s.id} onClick={() => pick(() => isAdmin ? onNavigate("admin-sessions") : onOpenSession(s))}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.gray50}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}>
                  <div style={{ width:28, height:28, borderRadius:8, background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon name="play-circle" size={14} color={C.primary}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:C.gray800, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.title}</div>
                    <div style={{ fontSize:12, color:C.gray400 }}>{s.instructor} · {s.category}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {q.length === 0 && (
            <div style={{ padding:"12px 14px 8px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase", marginBottom:8 }}>Quick Links</div>
              {pagePool.map(p => (
                <button key={p.id} onClick={() => pick(() => onNavigate(p.id))}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 4px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.gray50}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}>
                  <Icon name={p.icon} size={14} color={C.gray400}/>
                  <span style={{ fontSize:14, color:C.gray600 }}>{p.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
function TopBar({ onToggleAdmin, isAdmin, toast, isDark, onToggleDarkMode, onLogout, onNavigateProfile, onOpenSession, onNavigate, userName = "", userAvatar, onBrowseSelect, seasons = SEASONS, sessions = [], onOpenInstructor, onGoHome }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const browseRef = useRef(null);
  const avatarBtnRef = useRef(null);
  const unread = NOTIF_DATA.filter(n => !n.read).length;
  const notifBtnRef = useRef(null);

  /* Close browse on outside click */
  useEffect(() => {
    if (!showBrowse) return;
    function handleClick(e) {
      if (browseRef.current && !browseRef.current.contains(e.target)) setShowBrowse(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showBrowse]);

  /* Derive seasons and years from live sessions only */
  const filledSeasons = seasons.filter(s => sessions.some(sess => s.sessionIds.includes(sess.id)));
  const browseSeasons = filledSeasons.map(s => ({ id: s.id, name: s.name, tagline: s.tagline, color: s.color }));
  const browseYears   = [...new Set(filledSeasons.map(s => s.name.split(" ")[1]))].sort((a,b) => b - a);

  return (
    <div style={{ height:60, background:C.white, borderBottom:`1px solid ${C.gray200}`, display:"flex", alignItems:"center", paddingLeft:24, paddingRight:24, position:"sticky", top:0, zIndex:100, flexShrink:0 }}>
      {/* Logo */}
      <div style={{ flexShrink:0, display:"flex", alignItems:"center", cursor:"pointer" }}
        onClick={()=>onNavigate(isAdmin ? "admin-overview" : "dashboard")}>
        <img src="/Container.png" alt="SPED Summit" style={{ height:28, width:"auto", display:"block" }}/>
      </div>

      {/* Home button — user only, hidden on mobile */}
      {!isAdmin && (
        <button className="topbar-browse"
          onClick={onGoHome}
          style={{ marginLeft:16, flexShrink:0, display:"inline-flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", fontSize:14, fontWeight:600, color:C.gray700, padding:"6px 10px", borderRadius:8, fontFamily:"inherit", transition:"color .15s" }}
          onMouseEnter={e => e.currentTarget.style.color = C.gray900}
          onMouseLeave={e => e.currentTarget.style.color = C.gray700}>
          Home
        </button>
      )}

      {/* Browse button — user only, hidden on mobile (bottom nav handles it) */}
      <div className="topbar-browse" style={{ position:"relative", marginLeft:4, flexShrink:0, display: isAdmin ? "none" : "block" }} ref={browseRef}>
        <button
          onClick={() => setShowBrowse(v => !v)}
          style={{ display:"inline-flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", fontSize:14, fontWeight:600, color: showBrowse ? C.primary : C.gray700, padding:"6px 10px", borderRadius:8, fontFamily:"inherit", transition:"color .15s" }}
          onMouseEnter={e => { if (!showBrowse) e.currentTarget.style.color = C.gray900; }}
          onMouseLeave={e => { if (!showBrowse) e.currentTarget.style.color = C.gray700; }}>
          Browse
          <Icon name="caret-down" size={13} color={showBrowse ? C.primary : C.gray500}
            style={{ transition:"transform .2s", transform: showBrowse ? "rotate(180deg)" : "rotate(0deg)" }}/>
        </button>

        {showBrowse && (
          <div style={{ position:"absolute", top:"calc(100% + 8px)", left:0, background:C.white, border:`1px solid ${C.gray200}`, borderRadius:14, boxShadow:"0 12px 40px rgba(0,0,0,0.12)", minWidth:400, zIndex:200, display:"flex", overflow:"hidden" }}>
            {/* Sessions column */}
            <div style={{ flex:1, padding:"12px 12px 10px" }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase", marginBottom:4, paddingLeft:4 }}>Sessions</div>
              <div style={{ display:"flex", flexDirection:"column" }}>
                {browseSeasons.length === 0 ? (
                  <div style={{ padding:"12px 8px", fontSize:13, color:C.gray400 }}>No sessions available yet.</div>
                ) : browseSeasons.map(s => (
                  <button key={s.id}
                    onClick={() => { setShowBrowse(false); const [sn, sy] = s.name.split(" "); onBrowseSelect?.(sn, sy); }}
                    style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", background:"none", border:"none", cursor:"pointer", padding:"6px 8px", borderRadius:8, textAlign:"left", fontFamily:"inherit", transition:"background .12s" }}
                    onMouseEnter={e => e.currentTarget.style.background = C.gray100}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    <span style={{ fontSize:14, fontWeight:600, color:C.gray900 }}>{s.name}</span>
                    <span style={{ fontSize:12, color:C.gray400, marginTop:1 }}>{s.tagline}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ width:1, background:C.gray200, flexShrink:0 }}/>

            {/* Year column */}
            <div style={{ minWidth:100, padding:"12px 12px 10px" }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.gray400, letterSpacing:.8, textTransform:"uppercase", marginBottom:4, paddingLeft:4 }}>Year</div>
              <div style={{ display:"flex", flexDirection:"column" }}>
                {browseYears.map(y => (
                  <button key={y}
                    onClick={() => { setShowBrowse(false); onBrowseSelect?.("all", y); }}
                    style={{ background:"none", border:"none", cursor:"pointer", padding:"6px 8px", borderRadius:8, fontSize:14, fontWeight:600, color:C.gray900, textAlign:"left", fontFamily:"inherit", transition:"background .12s" }}
                    onMouseEnter={e => e.currentTarget.style.background = C.gray100}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search — centered, hidden on mobile, hidden for admin */}
      {!isAdmin && (
        <div className="topbar-search" style={{ flex:1, display:"flex", justifyContent:"center", padding:"0 16px" }}>
          <SearchBar onOpenSession={onOpenSession} onNavigate={onNavigate} sessions={sessions}/>
        </div>
      )}
      {isAdmin && <div style={{ flex:1 }}/>}

      {/* Mobile search icon — user only */}
      {!isAdmin && (
        <button className="topbar-search-icon" onClick={() => setShowMobileSearch(true)}
          style={{ display:"none", width:36, height:36, borderRadius:"50%", border:`1px solid ${C.gray200}`, background:C.white, cursor:"pointer", alignItems:"center", justifyContent:"center", flexShrink:0, marginLeft:"auto", marginRight:8 }}>
          <Icon name="magnifying-glass" size={17} color={C.gray700}/>
        </button>
      )}

      {showMobileSearch && <MobileSearchPage onOpenSession={onOpenSession} onNavigate={onNavigate} onClose={() => setShowMobileSearch(false)} sessions={sessions}/>}

      {/* Right actions */}
      <div style={{ flexShrink:0, display:"flex", alignItems:"center", gap:12 }}>
        {/* Notification button + popover — user only, hidden on mobile (bottom nav handles it) */}
        {!isAdmin && (
          <div className="topbar-notif" style={{ position:"relative" }} ref={notifBtnRef}>
            <button
              onClick={() => setShowNotif(v => !v)}
              style={{ width:36, height:36, borderRadius:"50%", border:`1px solid ${C.gray200}`, background:C.white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", transition:"background .15s" }}
              onMouseEnter={e => { if (!showNotif) e.currentTarget.style.background = C.gray50; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.white; }}>
              <Icon name="bell" size={17} color={C.gray700}/>
              {unread > 0 && (
                <span style={{ position:"absolute", top:-7, left:"100%", transform:"translateX(-50%)", minWidth:18, height:18, borderRadius:99, background:C.primary, color:"#fff", fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px", lineHeight:1 }}>
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </button>
            {showNotif && <NotificationPopover onClose={() => setShowNotif(false)} anchorRef={notifBtnRef}/>}
          </div>
        )}


        {showReferModal && <ReferFriendsModal onClose={() => setShowReferModal(false)} userName={userName}/>}

        {/* Avatar */}
        <div style={{ position: "relative" }} ref={avatarBtnRef}>
          <button
            onClick={() => setShowProfileMenu(v => !v)}
            style={{ border:`1px solid ${isDark?"rgba(255,255,255,0.15)":C.gray200}`, background: isDark?"rgba(255,255,255,0.06)":"transparent", padding:"4px 10px 4px 4px", cursor: "pointer", borderRadius: 99, display:"flex", alignItems:"center", gap:8, transition:"background .15s" }}
            onMouseEnter={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.1)":C.gray50}
            onMouseLeave={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.06)":"transparent"}>
            <Avatar name={userName} src={userAvatar} size={28}/>
            {userName && <span style={{ fontSize:13, fontWeight:600, color:isDark?"#fff":C.gray800, maxWidth:80, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{userName.split(" ")[0]}</span>}
            <Icon name="caret-down" size={12} color={isDark?"rgba(255,255,255,0.5)":C.gray500}/>
          </button>
          {showProfileMenu && (
            <DropdownMenu anchorRef={avatarBtnRef}
              items={[
                {
                  icon: "user-circle",
                  label: "My Profile",
                  action: () => { setShowProfileMenu(false); onNavigateProfile?.(); },
                },
                {
                  icon: isDark ? "sun" : "moon",
                  label: isDark ? "Light Mode" : "Dark Mode",
                  action: () => onToggleDarkMode?.(),
                },
                ...(!isAdmin ? [
                  {
                    icon: "gift",
                    label: "Refer Friends",
                    action: () => { setShowProfileMenu(false); setShowReferModal(true); },
                  },
                  {
                    icon: "question",
                    label: "Help Center",
                    action: () => toast({ type: "info", message: "Opening Help Center..." }),
                  },
                ] : []),
                {
                  icon: "sign-out",
                  label: "Logout",
                  danger: true,
                  action: () => onLogout(),
                },
              ]}
              onClose={() => setShowProfileMenu(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
function Sidebar({ active, onChange, isAdmin }) {
  const [hov, setHov] = useState(null);
  const userNav = [
    { id:"dashboard",      icon:"house",        label:"My Learnings"    },
    { id:"sessions",       icon:"play-circle",  label:"All Sessions"    },
    { id:"schedules",      icon:"calendar",     label:"Schedules"       },
  ];
  const adminNav = [
    { id:"admin-overview",  icon:"house",       label:"Overview"    },
    { id:"admin-sessions",  icon:"play-circle", label:"My Sessions" },
    { id:"admin-analytics", icon:"chart-line",  label:"Analytics"   },
  ];
  const nav = isAdmin ? adminNav : userNav;

  return (
    <div style={{ width:52, background:C.white, borderRight:`1px solid ${C.gray200}`, display:"flex", flexDirection:"column", alignItems:"center", padding:"10px 0 12px", flexShrink:0, height:"100%", gap:2 }}>
      {nav.map(item => {
        const isActive = active === item.id;
        const isHov = hov === item.id;
        return (
          <div key={item.id} style={{ position:"relative" }}>
            <button
              onClick={() => onChange(item.id)}
              onMouseEnter={() => setHov(item.id)}
              onMouseLeave={() => setHov(null)}
              style={{ width:36, height:36, borderRadius:9, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", background: isActive ? C.primaryLight : isHov ? C.gray100 : "transparent", transition:"background .12s", position:"relative" }}>
              <Icon name={item.icon} size={18} color={isActive ? C.primary : C.gray500}/>
              {isActive && (
                <div style={{ position:"absolute", left:-8, top:"50%", transform:"translateY(-50%)", width:3, height:18, borderRadius:99, background:C.primary }}/>
              )}
            </button>
            {isHov && (
              <div style={{ position:"absolute", left:"calc(100% + 10px)", top:"50%", transform:"translateY(-50%)", background:"#181c32", color:"#fff", fontSize:12, fontWeight:600, padding:"5px 9px", borderRadius:7, whiteSpace:"nowrap", pointerEvents:"none", zIndex:999, boxShadow:"0 2px 8px rgba(0,0,0,0.18)" }}>
                {item.label}
                <div style={{ position:"absolute", right:"100%", top:"50%", transform:"translateY(-50%)", borderWidth:"4px 5px 4px 0", borderStyle:"solid", borderColor:"transparent #181c32 transparent transparent" }}/>
              </div>
            )}
          </div>
        );
      })}
      <div style={{ marginTop:"auto" }}/>
    </div>
  );
}
function LimelightBottomNav({ active, onChange, isAdmin, onNotif, notifCount = 0 }) {
  const userItems = [
    { id:'dashboard',      icon:'house',            label:'My Learnings' },
    { id:'past-sessions',  icon:'squares-four',  label:'Browse'       },
    { id:'certifications', icon:'certificate',       label:'Achievements'  },
    { id:'__notif__',      icon:'bell',              label:'Notifications' },
  ];
  const adminItems = [
    { id:'admin-overview',  icon:'house',       label:'Overview'  },
    { id:'admin-sessions',  icon:'video',       label:'Sessions'  },
    { id:'admin-analytics', icon:'chart-bar',   label:'Analytics' },
  ];
  const items = isAdmin ? adminItems : userItems;
  const activeIdx = Math.max(0, items.findIndex(i => i.id === active));

  const [llLeft, setLlLeft] = useState(-999);
  const [ready,  setReady]  = useState(false);
  const itemRefs = useRef([]);
  const navRef   = useRef(null);

  useEffect(() => {
    const el = itemRefs.current[activeIdx];
    if (el) {
      const left = el.offsetLeft + el.offsetWidth / 2 - 22;
      setLlLeft(left);
      if (!ready) setTimeout(() => setReady(true), 50);
    }
  }, [activeIdx, items.length]);

  return (
    <nav ref={navRef} style={{
      position:'fixed', bottom:0, left:0, right:0, height:64,
      background:C.white, borderTop:`1px solid ${C.gray200}`,
      display:'flex', alignItems:'stretch', zIndex:200,
      boxShadow:'0 -2px 16px rgba(0,0,0,0.07)',
    }}>
      {/* Limelight indicator */}
      <div style={{
        position:'absolute', top:0, left:llLeft,
        width:44, height:3, borderRadius:99,
        background:C.primary,
        boxShadow:`0 0 20px 6px rgba(100,144,232,0.35)`,
        transition: ready ? 'left 0.35s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
        pointerEvents:'none',
        zIndex:10,
      }}>
        {/* Glow cone */}
        <div style={{
          position:'absolute', left:'-30%', top:3,
          width:'160%', height:56,
          background:'transparent',
          clipPath:'polygon(5% 100%, 25% 0, 75% 0, 95% 100%)',
          pointerEvents:'none',
        }}/>
      </div>

      {items.map((item, i) => {
        const isAct = i === activeIdx;
        return (
          <button key={item.id}
            ref={el => itemRefs.current[i] = el}
            onClick={() => { if (item.id === '__notif__') { onNotif?.(); } else { onChange(item.id); } }}
            style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', gap:3, background:'none', border:'none',
              cursor:'pointer', padding:'8px 2px', fontFamily:'inherit',
              WebkitTapHighlightColor:'transparent', position:'relative',
            }}>
            <div style={{ position:'relative' }}>
              <Icon name={item.icon} size={22} color={isAct ? C.primary : C.gray400}/>
              {item.id === '__notif__' && notifCount > 0 && (
                <span style={{ position:'absolute', top:-5, right:-7, minWidth:16, height:16, borderRadius:99, background:'#ef4444', color:'#fff', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 3px', lineHeight:1 }}>
                  {notifCount > 9 ? '9+' : notifCount}
                </span>
              )}
            </div>
            <span style={{ fontSize:10, fontWeight: isAct ? 700 : 500, color: isAct ? C.primary : C.gray400, lineHeight:1 }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
function TabBar({ active, onChange, isAdmin, breadcrumbs }) {
  const userNav = [
    { id:"dashboard",      label:"My Learnings"    },
    { id:"past-sessions",  label:"Past Sessions"   },
    { id:"certifications", label:"My Certificates" },
  ];
  const adminNav = [
    { id:"admin-overview",  label:"Overview"    },
    { id:"admin-sessions",  label:"My Sessions" },
    { id:"admin-analytics", label:"Analytics"   },
  ];
  const nav = isAdmin ? adminNav : userNav;

  return (
    <>
      <style>{`
        .tabbar-wrap {
          background: var(--c-white);
          border-bottom: 1px solid var(--c-gray200);
          padding: 0 28px;
          display: flex;
          align-items: stretch;
          flex-shrink: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tabbar-list {
          display: inline-flex;
          align-items: stretch;
          gap: 0;
        }
        .tabbar-tab {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 14px;
          height: 40px;
          border: none;
          background: transparent;
          border-radius: 0;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          color: var(--c-gray500);
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          transition: color 150ms;
          outline: none;
        }
        .tabbar-tab::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: transparent;
          border-radius: 2px 2px 0 0;
          transition: background 150ms;
        }
        .tabbar-tab:hover:not(.tabbar-tab-active) {
          color: var(--c-gray900);
        }
        .tabbar-tab-active {
          color: var(--c-gray900);
          font-weight: 600;
        }
        .tabbar-tab-active::after {
          background: var(--c-gray900);
        }
      `}</style>
      <div className="tabbar-wrap">
        {breadcrumbs ? (
          <div style={{ display:"flex", alignItems:"center", gap:6, height:40, fontSize:13 }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
                {i > 0 && <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="var(--c-gray400)"/></svg>}
                {crumb.onClick ? (
                  <button onClick={crumb.onClick} style={{ background:"none", border:"none", padding:0, cursor:"pointer", fontSize:13, fontWeight:500, color:C.gray500, fontFamily:"inherit" }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.gray900} onMouseLeave={e=>e.currentTarget.style.color=C.gray500}>
                    {crumb.label}
                  </button>
                ) : (
                  <span style={{ fontSize:13, fontWeight:600, color:C.gray900 }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        ) : (
          <div className="tabbar-list">
            {nav.map(item => (
              <button
                key={item.id}
                className={`tabbar-tab${active === item.id ? " tabbar-tab-active" : ""}`}
                onClick={() => onChange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function AdminOverview({ onNavigate, onEditSession, toast, adminSessions = [] }) {
  const [menuOpenId, setMenuOpenId] = useState(null);
  return (
    <div className="ao-wrap" style={{ background:C.gray50, minHeight:"100%", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <style>{`
        .ao-wrap      { padding:24px; }
        .ao-metrics   { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
        .ao-metrics > div { height:130px; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; border-radius:14px !important; gap:4px; }
        .ao-bottom    { display:grid; grid-template-columns:3fr 2fr; gap:14px; margin-bottom:0; }
        .ao-h1        { font-size:22px; }
        .ao-sess-row  { display:flex; align-items:center; gap:10px; padding:14px 0; }
        .ao-tip-row   { display:flex; align-items:flex-start; gap:12px; padding:14px 0; }
        @media(max-width:640px){
          .ao-wrap    { padding:14px 12px; }
          .ao-metrics { grid-template-columns:repeat(2,1fr); gap:8px; margin-bottom:16px; }
          .ao-bottom  { grid-template-columns:1fr; }
          .ao-h1      { font-size:17px !important; }
          .ao-sess-row { padding:10px 0; gap:8px; }
          .ao-tip-row  { padding:10px 0; gap:10px; }
        }
      `}</style>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:C.gray900, letterSpacing:-0.3, lineHeight:1.25 }}>Overview</h1>
      </div>

      {/* Metrics */}
      <div className="ao-metrics">
        {[
          {label:"Course Enrollments", val:"12,842", delta:"+15% vs prev"},
          {label:"Student Rating",     val:"8.4/10", delta:"Top 1%"     },
          {label:"Total Site Visits",  val:"83",     delta:"+23 today"  },
          {label:"Total Revenue",      val:"$4,210", delta:"+8% vs prev"},
        ].map(m=>(
          <div key={m.label} style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gray200}`, padding:"16px" }}>
            <span style={{ display:"inline-block", fontSize:11, fontWeight:700, color:C.gray500, background:C.gray200, padding:"2px 6px", borderRadius:6, marginBottom:6 }}>{m.delta}</span>
            <div style={{ fontSize:26, fontWeight:900, color:C.gray900, lineHeight:1, marginBottom:4 }}>{m.val}</div>
            <div style={{ fontSize:13, fontWeight:600, color:C.gray600, lineHeight:1.5 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Recent activity + growth */}
      <div className="ao-bottom">
        {/* Recent sessions snapshot */}
        {adminSessions.length === 0 ? null : <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gray200}`, padding:"16px 16px 6px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <h2 style={{ margin:0, fontSize:15, fontWeight:700, color:C.gray900 }}>Recent Sessions</h2>
            <button onClick={()=>onNavigate("admin-sessions")} style={{ background:"none", border:"none", color:C.primary, fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontFamily:"inherit" }}>
              View all <Icon name="caret-right" size={14} color={C.primary}/>
            </button>
          </div>
          {adminSessions.slice(0,5).map((s,i,arr)=>{
            const sc = ADMIN_STATUS_COLORS[s.status] || ADMIN_STATUS_COLORS.DRAFT;
            return (
              <div key={s.id} className="ao-sess-row" style={{ borderBottom:i<arr.length-1?`1px solid ${C.gray100}`:"none" }}>
                <AdminThumb idx={i}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:600, fontSize:14, color:C.gray900, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", whiteSpace:"normal" }}>{s.title}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:3 }}>
                    <Badge label={s.status} color={sc.c} bg={sc.bg} size={11}/>
                    <span style={{ fontSize:12, color:C.gray500 }}>{s.date}</span>
                  </div>
                </div>
                <div style={{ position:"relative" }}>
                  <button onClick={()=>setMenuOpenId(menuOpenId===s.id?null:s.id)} title="More options"
                    style={{ width:26, height:26, borderRadius:7, border:`1px solid ${menuOpenId===s.id?C.primary:C.gray200}`, background:C.white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon name="dots-three-vertical" size={13} color={C.gray500}/>
                  </button>
                  {menuOpenId===s.id && (
                    <>
                      <div onClick={()=>setMenuOpenId(null)} style={{ position:"fixed",inset:0,zIndex:199 }}/>
                      <div style={{ position:"absolute", right:0, top:30, background:C.white, border:`1px solid ${C.gray200}`, borderRadius:12, boxShadow:"0 8px 32px rgba(0,0,0,0.14)", zIndex:200, minWidth:180, overflow:"hidden" }}>
                        {[
                          { icon:"pencil-simple", label:"Edit Session", action:()=>{ onEditSession?.(s); setMenuOpenId(null); } },
                          { icon:"trash", label:"Delete", danger:true, action:()=>{ setMenuOpenId(null); toast({type:"info", message:"Go to My Sessions to delete."}); } },
                        ].map((item,idx,arr)=>(
                          <button key={item.label} onClick={item.action}
                            onMouseEnter={e=>e.currentTarget.style.background=item.danger?"#fff5f5":C.gray50}
                            onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                            style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 14px",background:"transparent",border:"none",borderBottom:idx<arr.length-1?`1px solid ${C.gray100}`:"none",cursor:"pointer",fontSize:13,fontWeight:500,color:item.danger?C.error:C.gray700,textAlign:"left",fontFamily:"inherit" }}>
                            <Icon name={item.icon} size={14} color={item.danger?C.error:C.gray500}/>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>}

        {/* Engagement Guide */}
        <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gray200}`, padding:16 }}>
          <h2 style={{ margin:"0 0 12px", fontSize:15, fontWeight:700, color:C.gray900 }}>Engagement Guide</h2>
          {[
            { icon:"clock",            color:"#f59e0b", title:"Optimal Scheduling",       body:"Sessions at 10 AM–2 PM EST see 40% higher live attendance." },
            { icon:"bell",             color:"#3b82f6", title:"Pre-Session Reminders",    body:"Learners who get both 24h and 1h reminders show 2× higher show-up rates." },
            { icon:"chat-circle-dots", color:"#10b981", title:"Live Interaction",          body:"Ask a poll in the first 5 minutes — 60% lower drop-off." },
            { icon:"trophy",           color:"#8b5cf6", title:"Certificates & Rewards",   body:"Offering a certificate increases completion by 35%." },
            { icon:"megaphone",        color:"#ef4444", title:"Promote Before Going Live", body:"A teaser post 3 days early makes learners 50% more likely to register." },
          ].map((tip, i, arr) => (
            <div key={i} className="ao-tip-row" style={{ borderBottom: i < arr.length-1 ? `1px solid ${C.gray100}` : "none" }}>
              <div style={{ width:28, height:28, borderRadius:8, background:`${tip.color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                <Icon name={tip.icon} size={13} color={tip.color}/>
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray900, marginBottom:2, lineHeight:1.4 }}>{tip.title}</div>
                <div style={{ fontSize:12, color:C.gray500, lineHeight:1.5 }}>{tip.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADMIN SESSIONS PAGE
───────────────────────────────────────────────────────────────────────────── */
function AdminSessionsPage({ onNavigate, onEditSession, toast, adminSessions = [], setAdminSessions }) {
  const [filter, setFilter] = useState("ALL");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const statuses = ["ALL", "LIVE", "DRAFT", "ARCHIVED"];
  const filtered = filter === "ALL" ? adminSessions :
                   adminSessions.filter(s => s.status === filter);
  const archived = adminSessions.filter(s => s.status === "ARCHIVED");

  return (
    <div className="asp-wrap" style={{ background:C.gray50, minHeight:"100%", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <style>{`
        .asp-wrap  { padding:24px 24px; }
        .as-stats  { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        .as-stats > div { height:130px; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; border-radius:14px !important; }
        .asp-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; gap:10px; }
        .asp-card-desktop { display:flex; }
        .asp-card-mobile  { display:none; }
        @media(max-width:640px){
          .asp-wrap  { padding:16px 12px; }
          .as-stats  { grid-template-columns:repeat(2,1fr); }
          .asp-header { flex-direction:row; align-items:center; }
          .asp-header h1 { font-size:17px !important; }
          .asp-card-desktop { display:none !important; }
          .asp-card-mobile  { display:flex !important; }
        }
      `}</style>
      <div className="asp-header">
        <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:C.gray900, letterSpacing:-0.3, lineHeight:1.25 }}>My Sessions</h1>
        <Btn onClick={()=>onNavigate("admin-create")}><Icon name="plus" size={14} color="#fff"/>New Session</Btn>
      </div>

      {/* Summary stats */}
      <div className="as-stats">
        {[
          {label:"Total",    val:adminSessions.length,                                    color:C.gray900},
          {label:"Live",     val:adminSessions.filter(s=>s.status==="LIVE").length,       color:C.gray900},
          {label:"Drafts",   val:adminSessions.filter(s=>s.status==="DRAFT").length,      color:C.gray900},
          {label:"Archived", val:adminSessions.filter(s=>s.status==="ARCHIVED").length,   color:C.gray900},
        ].map(s=>(
          <div key={s.label} style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gray200}`, padding:"16px" }}>
            <div style={{ fontSize:26, fontWeight:900, color:s.color, lineHeight:1, marginBottom:4 }}>{s.val}</div>
            <div style={{ fontSize:13, fontWeight:600, color:C.gray600, lineHeight:1.5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
        {statuses.map(s=>(
          <button key={s} onClick={()=>setFilter(s)} aria-pressed={filter===s}
            style={{ padding:"7px 16px", borderRadius:10, border:`1.5px solid ${filter===s?C.primary:C.gray200}`, background:filter===s?C.primary:C.white, color:filter===s?"#fff":C.gray600, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all .15s" }}>
            {s === "ALL" ? "All" : s.charAt(0)+s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Archived notice */}
      {filter === "ARCHIVED" && archived.length > 0 && (
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:C.gray100, borderRadius:10, border:`1px solid ${C.gray200}`, marginBottom:16 }}>
          <Icon name="info" size={14} color={C.gray500}/>
          <span style={{ fontSize:13, color:C.gray600, lineHeight:1.5 }}>
            Archived sessions are <strong>not visible to students</strong>. To restore a session, open it and update the <strong>Available To</strong> date to a future date.
          </span>
        </div>
      )}

      {/* Sessions list */}
      <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gray200}` }}>
        {filtered.length === 0 && (
          <Empty style={{ margin:"8px 0", border:"none" }}>
            <EmptyMedia variant="icon" color="#6490E8"><Icon name={adminSessions.length === 0 ? "play-circle" : "funnel"} size={22} color="#6490E8"/></EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>{adminSessions.length === 0 ? "No sessions yet" : "No sessions match"}</EmptyTitle>
              <EmptyDescription>{adminSessions.length === 0 ? "Create your first session to get started." : "Try a different filter to find available sessions."}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {filtered.map((s,i)=>{
          const sc = ADMIN_STATUS_COLORS[s.status] || ADMIN_STATUS_COLORS.DRAFT;
          const dateRange = s.availableFrom && s.availableTo
            ? `${new Date(s.availableFrom).toLocaleDateString("en-US",{month:"short",day:"numeric"})} – ${new Date(s.availableTo).toLocaleDateString("en-US",{month:"short",day:"numeric"})}`
            : s.date;
          return (
            <div key={s.id} style={{ borderBottom:i<filtered.length-1?`1px solid ${C.gray200}`:"none", opacity: s.status==="ARCHIVED" ? 0.85 : 1 }}>

              {/* ── Desktop card ── */}
              <div className="asp-card-desktop" style={{ alignItems:"center", gap:20, padding:"20px 24px" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.gray50}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <AdminThumb idx={i}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                    <Badge label={s.status} color={sc.c} bg={sc.bg} size={11}/>
                    <span style={{ fontSize:13, fontWeight:500, color:C.gray500 }}>{s.category}</span>
                  </div>
                  <div style={{ fontWeight:700, fontSize:15, color:C.gray900, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginBottom:5 }}>{s.title}</div>
                  <div style={{ fontSize:13, color:C.gray500, display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
                    {s.enrolled && <span style={{ display:"flex",alignItems:"center",gap:4 }}><Icon name="users" size={13} color={C.gray400}/>{s.enrolled.toLocaleString()} Enrolled</span>}
                    {s.rating   && <span style={{ display:"flex",alignItems:"center",gap:4 }}><Icon name="star"  size={13} color={C.warning}/>{s.rating} Stars</span>}
                    <span style={{ display:"flex",alignItems:"center",gap:4 }}><Icon name="calendar" size={13} color={C.gray400}/>{s.date}</span>
                    {s.availableFrom && s.availableTo && s.status !== "ARCHIVED" && (
                      <span style={{ display:"flex",alignItems:"center",gap:4 }}>
                        <Icon name="clock" size={13} color={C.gray400}/>
                        {new Date(s.availableFrom).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})} – {new Date(s.availableTo).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                  <div style={{ position:"relative" }}>
                    <button onClick={()=>setMenuOpenId(menuOpenId===s.id?null:s.id)} aria-label="More options"
                      style={{ width:28,height:28,borderRadius:8,border:`1px solid ${menuOpenId===s.id?C.primary:C.gray200}`,background:C.white,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <Icon name="dots-three-vertical" size={14} color={C.gray500}/>
                    </button>
                    {menuOpenId===s.id && (
                      <>
                        <div onClick={()=>setMenuOpenId(null)} style={{ position:"fixed",inset:0,zIndex:199 }}/>
                        <div style={{ position:"absolute", right:0, top:34, background:C.white, border:`1px solid ${C.gray200}`, borderRadius:12, boxShadow:"0 8px 32px rgba(0,0,0,0.14)", zIndex:200, minWidth:200, overflow:"visible" }}>
                          {[
                            { icon:"pencil-simple",  label:"Edit Session", action:()=>{ onEditSession(s); setMenuOpenId(null); } },
                            { icon: s.status==="LIVE" ? "file" : "play-circle", label: s.status==="LIVE" ? "Set as Draft" : "Publish",
                              action:()=>{ setAdminSessions(prev=>prev.map(x=>x.id===s.id?{...x,status:s.status==="LIVE"?"DRAFT":"LIVE"}:x)); setMenuOpenId(null); } },
                            { icon:"file-archive",   label:"Archive", action:()=>{ setAdminSessions(prev=>prev.map(x=>x.id===s.id?{...x,status:"ARCHIVED"}:x)); setMenuOpenId(null); } },
                            { icon:"trash",          label:"Delete",  danger:true, action:()=>{ setDeleteConfirmId(s.id); setMenuOpenId(null); } },
                          ].map((item,idx,arr)=>(
                            <button key={item.label} onClick={item.action}
                              onMouseEnter={e=>e.currentTarget.style.background=item.danger?"#fff5f5":C.gray50}
                              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                              style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 16px",background:"transparent",border:"none",borderBottom:idx<arr.length-1?`1px solid ${C.gray100}`:"none",cursor:"pointer",fontSize:13,fontWeight:500,color:item.danger?C.error:C.gray700,textAlign:"left",fontFamily:"inherit",transition:"background .1s" }}>
                              <Icon name={item.icon} size={15} color={item.danger?C.error:C.gray500}/>
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Mobile card (Figma design) ── */}
              <div className="asp-card-mobile" style={{ alignItems:"center", gap:12, padding:"12px 14px" }}>
                {/* Thumbnail */}
                <div style={{ width:80, height:80, borderRadius:10, overflow:"hidden", flexShrink:0, background:C.gray200 }}>
                  <img src={`https://images.unsplash.com/${THUMB_PHOTOS[i % THUMB_PHOTOS.length]}?w=160&h=160&fit=crop&auto=format`} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                </div>
                {/* Content */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ marginBottom:5 }}>
                    <Badge label={s.status} color={sc.c} bg={sc.bg} size={11}/>
                  </div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.gray900, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", whiteSpace:"normal", marginBottom:8 }}>{s.title}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:12, fontSize:12, color:C.gray500 }}>
                    {s.enrolled && <span style={{ display:"flex",alignItems:"center",gap:4 }}><Icon name="users" size={12} color={C.gray400}/>{(s.enrolled/1000).toFixed(1)}K</span>}
                    <span style={{ display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap" }}><Icon name="calendar" size={12} color={C.gray400}/>{dateRange}</span>
                  </div>
                </div>
                {/* Three-dot menu */}
                <button onClick={()=>onEditSession(s)} aria-label="Edit session"
                  style={{ width:26,height:26,borderRadius:7,border:`1px solid ${C.gray200}`,background:C.white,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <Icon name="pencil" size={12} color={C.gray500}/>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirmId && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:C.white, borderRadius:20, padding:"32px 28px", maxWidth:380, width:"90%", boxShadow:"0 20px 60px rgba(0,0,0,0.2)", textAlign:"center" }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
              <Icon name="trash" size={24} color={C.error}/>
            </div>
            <div style={{ fontSize:18, fontWeight:800, color:C.gray900, marginBottom:8 }}>Delete Session?</div>
            <div style={{ fontSize:14, color:C.gray500, marginBottom:24, lineHeight:1.5 }}>
              This action cannot be undone. The session will be permanently removed.
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setDeleteConfirmId(null)}
                style={{ flex:1, padding:"10px 0", borderRadius:10, border:`1px solid ${C.gray200}`, background:C.white, color:C.gray700, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                Cancel
              </button>
              <button onClick={async ()=>{ await supabase.from("sessions").delete().eq("id", deleteConfirmId); setAdminSessions(prev=>prev.filter(x=>x.id!==deleteConfirmId)); setDeleteConfirmId(null); }}
                style={{ flex:1, padding:"10px 0", borderRadius:10, border:"none", background:C.error, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ANALYTICS
───────────────────────────────────────────────────────────────────────────── */

function LineAreaChart({ data, color = C.primary }) {
  const [hov, setHov] = useState(null);
  const W = 1000, H = 200, pL = 40, pR = 16, pT = 16, pB = 32;
  const iW = W - pL - pR, iH = H - pT - pB;
  const maxV = Math.max(...data.map(d => d.v), 1);
  const xOf  = i => pL + (i / (data.length - 1)) * iW;
  const yOf  = v => pT + iH - (v / maxV) * iH;
  const step = data.length > 10 ? Math.ceil(data.length / 7) : 1;
  const gid  = "waveGrad";

  // Build smooth cubic bezier path (catmull-rom → bezier)
  const pts = data.map((d, i) => ({ x: xOf(i), y: yOf(d.v) }));
  function smoothLinePath(ps) {
    if (ps.length < 2) return "";
    let d = `M ${ps[0].x} ${ps[0].y}`;
    for (let i = 0; i < ps.length - 1; i++) {
      const p0 = ps[Math.max(0, i - 1)];
      const p1 = ps[i];
      const p2 = ps[i + 1];
      const p3 = ps[Math.min(ps.length - 1, i + 2)];
      const cp1x = p1.x + (p2.x - p0.x) / 5;
      const cp1y = p1.y + (p2.y - p0.y) / 5;
      const cp2x = p2.x - (p3.x - p1.x) / 5;
      const cp2y = p2.y - (p3.y - p1.y) / 5;
      d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    return d;
  }
  const linePath = smoothLinePath(pts);
  const areaPath = `${linePath} L ${pts[pts.length-1].x} ${pT+iH} L ${pts[0].x} ${pT+iH} Z`;

  return (
    <div style={{ position:"relative" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", display:"block", overflow:"visible" }}
        onMouseLeave={() => setHov(null)}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity=".28"/>
            <stop offset="85%"  stopColor={color} stopOpacity=".07"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Dashed grid lines */}
        {[0, .25, .5, .75, 1].map(pct => {
          const y = pT + iH - pct * iH;
          const label = pct === 0 ? "0" : pct === 1
            ? (maxV >= 1000 ? `${(maxV/1000).toFixed(0)}K` : maxV)
            : (Math.round(pct * maxV) >= 1000 ? `${(Math.round(pct * maxV)/1000).toFixed(0)}K` : Math.round(pct * maxV));
          return (
            <g key={pct}>
              <line x1={pL} y1={y} x2={W - pR} y2={y}
                stroke="var(--c-gray200)" strokeWidth="1" strokeDasharray="5,4"/>
              <text x={pL - 6} y={y + 4} textAnchor="end" fontSize="12" fill="var(--c-gray400)" fontFamily="inherit">
                {label}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#${gid})`}/>

        {/* Smooth wave line */}
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5"
          strokeLinejoin="round" strokeLinecap="round"/>

        {/* X-axis labels */}
        {data.map((d, i) => {
          if (i % step !== 0 && i !== data.length - 1) return null;
          return (
            <text key={i} x={xOf(i)} y={H - 5} textAnchor="middle"
              fontSize="12" fill="var(--c-gray400)" fontFamily="inherit">
              {d.label}
            </text>
          );
        })}

        {/* Invisible hover zones */}
        {data.map((d, i) => (
          <rect key={i} x={xOf(i) - iW / (data.length * 2)} y={pT}
            width={iW / data.length} height={iH} fill="transparent"
            onMouseEnter={() => setHov(i)}/>
        ))}

        {/* Hover indicator */}
        {hov !== null && (() => {
          const x = xOf(hov), y = yOf(data[hov].v);
          return (
            <g>
              <line x1={x} y1={pT} x2={x} y2={pT + iH}
                stroke="var(--c-gray200)" strokeWidth="1.5" strokeDasharray="4,3"/>
              <circle cx={x} cy={y} r={5.5} fill={color} stroke="#fff" strokeWidth="2.5"/>
            </g>
          );
        })()}
      </svg>

      {/* Tooltip */}
      {hov !== null && (() => {
        const d = data[hov];
        const leftPct = ((hov / (data.length - 1)) * 100).toFixed(1);
        return (
          <div style={{ position:"absolute", top:4, left:`${leftPct}%`, transform:"translateX(-50%)",
            background:C.white, border:`1px solid ${C.gray200}`, borderRadius:12,
            padding:"10px 16px", boxShadow:"0 8px 28px rgba(0,0,0,0.12)",
            pointerEvents:"none", whiteSpace:"nowrap", zIndex:30 }}>
            <div style={{ fontSize:12, color:C.gray400, marginBottom:2 }}>{d.label}</div>
            <div style={{ fontSize:22, fontWeight:900, color:C.gray900, lineHeight:1.15 }}>{d.v.toLocaleString()}</div>
            <div style={{ fontSize:12, color:C.gray500, marginTop:1 }}>views</div>
          </div>
        );
      })()}
    </div>
  );
}

function MiniBarChart48({ data }) {
  const maxV = Math.max(...data, 1);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:1.5, height:40 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex:1, borderRadius:"2px 2px 0 0", minWidth:2,
          background: v > 0 ? C.primary : C.gray100,
          height:`${Math.max((v / maxV) * 100, v > 0 ? 14 : 5)}%`,
          opacity: v > 0 ? 0.85 : 1 }}/>
      ))}
    </div>
  );
}

function AnalyticsPage({ onEditSession, sessions = [] }) {
  const [range,     setRange]     = useState("28d");
  const [showRange, setShowRange] = useState(false);

  const RANGES = [
    { key:"7d",  label:"Last 7 days",  dates:"Mar 17 – Mar 23, 2026" },
    { key:"28d", label:"Last 28 days", dates:"Feb 23 – Mar 22, 2026" },
    { key:"90d", label:"Last 90 days", dates:"Dec 22 – Mar 22, 2026" },
  ];
  const activeRange = RANGES.find(r => r.key === range);

  const TREND = {
    "7d": [
      {v:245,label:"Mon"},{v:312,label:"Tue"},{v:198,label:"Wed"},
      {v:400,label:"Thu"},{v:350,label:"Fri"},{v:190,label:"Sat"},{v:280,label:"Sun"},
    ],
    "28d": [
      {v:82,label:"Feb 23"},{v:95,label:"Feb 24"},{v:140,label:"Feb 25"},{v:110,label:"Feb 26"},
      {v:88,label:"Feb 27"},{v:75,label:"Feb 28"},{v:200,label:"Mar 1"},{v:180,label:"Mar 2"},
      {v:145,label:"Mar 3"},{v:220,label:"Mar 4"},{v:195,label:"Mar 5"},{v:160,label:"Mar 6"},
      {v:180,label:"Mar 7"},{v:210,label:"Mar 8"},{v:175,label:"Mar 9"},{v:140,label:"Mar 10"},
      {v:310,label:"Mar 11"},{v:280,label:"Mar 12"},{v:240,label:"Mar 13"},{v:190,label:"Mar 14"},
      {v:350,label:"Mar 15"},{v:320,label:"Mar 16"},{v:280,label:"Mar 17"},{v:240,label:"Mar 18"},
      {v:190,label:"Mar 19"},{v:220,label:"Mar 20"},{v:260,label:"Mar 21"},{v:310,label:"Mar 22"},
    ],
    "90d": [
      {v:180,label:"Dec 22"},{v:210,label:"Dec 29"},{v:240,label:"Jan 5"},
      {v:280,label:"Jan 12"},{v:260,label:"Jan 19"},{v:300,label:"Jan 26"},
      {v:320,label:"Feb 2"},{v:350,label:"Feb 9"},{v:380,label:"Feb 16"},
      {v:360,label:"Feb 23"},{v:400,label:"Mar 1"},{v:420,label:"Mar 15"},{v:310,label:"Mar 22"},
    ],
  };

  const STATS = {
    "7d":  { views:4821,  watch:382,  completion:64, enrolled:12842, viewsDelta:"+12%", watchDelta:"+8%",  compDelta:"+5%"  },
    "28d": { views:18200, watch:1430, completion:71, enrolled:12842, viewsDelta:"+18%", watchDelta:"+14%", compDelta:"+9%"  },
    "90d": { views:54000, watch:4200, completion:76, enrolled:12842, viewsDelta:"+28%", watchDelta:"+22%", compDelta:"+15%" },
  };
  const stat  = STATS[range];
  const trend = TREND[range];

  const TOP_SESSIONS = sessions.slice(0, 4).map((s, i) => ({
    ...s,
    avgDuration: ["18:24","14:52","22:10","8:45"][i],
    avgPct:      ["78%","45%","91%","24%"][i],
    views:       [850,410,320,240][i],
  }));

  const INSIGHTS = [
    { icon:"trend-up",        title:"User activity up this week"                     },
    { icon:"timer",           title:"Watch time drops on weekends"                   },
    { icon:"check-circle",    title:`Completion at all-time high: ${stat.completion}%` },
    { icon:"star",            title:"\"AI in SPED\" needs a push"                   },
    { icon:"certificate",     title:"Certificate downloads up 18% vs last month"    },
  ];

  return (
    <div className="aa-wrap" style={{ background:C.gray50, minHeight:"100%", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <style>{`
        .aa-wrap    { padding:24px; }
        .aa-metrics { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
        .aa-metrics > div { height:130px; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; border-radius:14px !important; }
        .aa-bottom  { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .aa-header  { display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; gap:10px; }
        @media(max-width:640px){
          .aa-wrap    { padding:16px 12px; }
          .aa-metrics { grid-template-columns:repeat(2,1fr); gap:10px; }
          .aa-bottom  { grid-template-columns:1fr; }
          .aa-header  { flex-direction:row; align-items:center; }
          .aa-header h1 { font-size:17px !important; }
        }
      `}</style>

      {/* Header */}
      <div className="aa-header">
        <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:C.gray900, letterSpacing:-0.3, lineHeight:1.25 }}>Analytics</h1>
        <div style={{ position:"relative" }}>
          <button onClick={() => setShowRange(v => !v)}
            style={{ display:"flex", alignItems:"center", gap:6, background:C.white, border:`1px solid ${C.gray200}`, borderRadius:10, padding:"8px 12px", cursor:"pointer", fontFamily:"inherit" }}>
            <span style={{ fontSize:14, fontWeight:600, color:C.gray900 }}>{activeRange.label}</span>
            <Icon name="caret-down" size={13} color={C.gray500}/>
          </button>
          {showRange && (
            <div style={{ position:"absolute", right:0, top:"calc(100% + 4px)", background:C.white, border:`1px solid ${C.gray200}`, borderRadius:10, boxShadow:"0 8px 24px rgba(0,0,0,0.10)", zIndex:60, minWidth:150, overflow:"hidden" }}>
              {RANGES.map(r => (
                <button key={r.key} onClick={() => { setRange(r.key); setShowRange(false); }}
                  style={{ display:"block", width:"100%", padding:"10px 16px", background:range===r.key ? C.gray50 : "none", border:"none", cursor:"pointer", fontSize:14, color:range===r.key ? C.gray900 : C.gray600, fontWeight:range===r.key ? 700 : 400, textAlign:"left", fontFamily:"inherit" }}>
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Metric cards */}
      <div className="aa-metrics">
        {[
          { label:"Total Views",      val:stat.views.toLocaleString()    },
          { label:"Watch Time (hrs)", val:stat.watch.toLocaleString()    },
          { label:"Completion Rate",  val:`${stat.completion}%`          },
          { label:"Enrolled",         val:stat.enrolled.toLocaleString() },
        ].map(m => (
          <div key={m.label} style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gray200}`, padding:"16px" }}>
            <div style={{ fontSize:26, fontWeight:900, color:C.gray900, lineHeight:1, marginBottom:4 }}>{m.val}</div>
            <div style={{ fontSize:13, fontWeight:600, color:C.gray600, lineHeight:1.5 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Activity Chart Card */}
      <style>{`
        @keyframes aa-bar-grow { from { transform:scaleY(0); opacity:0; } to { transform:scaleY(1); opacity:1; } }
        .aa-bar { transform-origin:bottom; animation:aa-bar-grow 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .aa-bar:nth-child(1){ animation-delay:0.00s; } .aa-bar:nth-child(2){ animation-delay:0.07s; }
        .aa-bar:nth-child(3){ animation-delay:0.14s; } .aa-bar:nth-child(4){ animation-delay:0.21s; }
        .aa-bar:nth-child(5){ animation-delay:0.28s; } .aa-bar:nth-child(6){ animation-delay:0.35s; }
        .aa-bar:nth-child(7){ animation-delay:0.42s; }
        .aa-bar-wrap:hover .aa-bar-tooltip { opacity:1; transform:translateY(0); }
        .aa-bar-tooltip { opacity:0; transform:translateY(4px); transition:all .15s; pointer-events:none; }
        .aa-chart-desktop { display:flex; flex-direction:row; align-items:stretch; gap:0; }
        .aa-chart-mobile  { display:none; }
        .aa-chart-stat { width:160px; flex-shrink:0; border-right:1px solid; padding-right:24px; margin-right:24px; display:flex; flex-direction:column; justify-content:center; }
        .aa-chart-line { flex:1; min-width:0; }
        @media(max-width:640px){
          .aa-chart-desktop { display:none !important; }
          .aa-chart-mobile  { display:flex !important; flex-direction:column; gap:16px; }
          .aa-chart-stat-m  { width:100%; border-bottom:1px solid; padding-bottom:14px; margin-bottom:0; flex-direction:row; align-items:center; justify-content:space-between; display:flex; }
        }
      `}</style>
      {(() => {
        const barData = range === "7d"
          ? [{v:245,l:"M"},{v:312,l:"T"},{v:198,l:"W"},{v:400,l:"T"},{v:350,l:"F"},{v:190,l:"S"},{v:280,l:"S"}]
          : range === "28d"
          ? [{v:82,l:"W1"},{v:140,l:"W2"},{v:195,l:"W3"},{v:280,l:"W4"}]
          : [{v:180,l:"Dec"},{v:260,l:"Jan"},{v:350,l:"Feb"},{v:420,l:"Mar"}];
        const lineData = TREND[range];
        const maxV = Math.max(...barData.map(d => d.v));
        const maxL = Math.max(...lineData.map(d => d.v));
        const minL = Math.min(...lineData.map(d => d.v));

        /* SVG line/area chart helpers */
        const W = 600, H = 130, PAD = { t:16, r:4, b:28, l:4 };
        const cw = W - PAD.l - PAD.r;
        const ch = H - PAD.t - PAD.b;
        const xOf = i => PAD.l + (i / (lineData.length - 1)) * cw;
        const yOf = v => PAD.t + ch - ((v - minL) / (maxL - minL || 1)) * ch;
        /* smooth cubic bezier path */
        const pts = lineData.map((d,i) => [xOf(i), yOf(d.v)]);
        const d = pts.reduce((acc,[x,y],i) => {
          if (i === 0) return `M${x},${y}`;
          const [px,py] = pts[i-1];
          const cpx = (px+x)/2;
          return `${acc} C${cpx},${py} ${cpx},${y} ${x},${y}`;
        }, "");
        const area = `${d} L${pts[pts.length-1][0]},${PAD.t+ch} L${PAD.l},${PAD.t+ch} Z`;

        /* Y-axis grid lines */
        const yTicks = [0, 0.25, 0.5, 0.75, 1].map(r => ({
          v: Math.round(minL + r*(maxL-minL)),
          y: PAD.t + ch - r*ch,
        }));

        /* X-axis labels: show first, middle, last */
        const xLabels = lineData.length <= 7
          ? lineData.map((d,i) => ({ l:d.label, x:xOf(i) }))
          : [0, Math.floor((lineData.length-1)/2), lineData.length-1].map(i => ({ l:lineData[i].label, x:xOf(i) }));

        return (
          <div style={{ width:"100%", background:C.white, borderRadius:16, border:`1px solid ${C.gray200}`, padding:"20px 20px 16px", marginBottom:14, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.4, textTransform:"uppercase", marginBottom:2 }}>Views over time</div>
                <div style={{ fontSize:11, color:C.gray400 }}>{activeRange.dates}</div>
              </div>
            </div>

            {/* ── DESKTOP: line/area chart ── */}
            <div className="aa-chart-desktop">
              <div className="aa-chart-stat" style={{ borderColor:C.gray100 }}>
                <div style={{ fontSize:36, fontWeight:900, color:C.gray900, lineHeight:1, letterSpacing:-1 }}>{stat.views.toLocaleString()}</div>
                <div style={{ fontSize:12, color:C.gray500, marginTop:4, fontWeight:500 }}>total views</div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:4, marginTop:10, background:"rgba(16,185,129,0.10)", borderRadius:6, padding:"3px 8px" }}>
                  <Icon name="trend-up" size={11} color="#10b981"/>
                  <span style={{ fontSize:12, fontWeight:700, color:"#10b981" }}>{stat.viewsDelta}</span>
                </div>
              </div>
              <div className="aa-chart-line">
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:H, display:"block", overflow:"visible" }}>
                  <defs>
                    <linearGradient id="aa-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.primary} stopOpacity="0.18"/>
                      <stop offset="100%" stopColor={C.primary} stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {yTicks.map((t,i) => (
                    <line key={i} x1={PAD.l} y1={t.y} x2={W-PAD.r} y2={t.y} stroke={C.gray100} strokeWidth="1"/>
                  ))}
                  {/* Area fill */}
                  <path d={area} fill="url(#aa-grad)"/>
                  {/* Line */}
                  <path d={d} fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Data points */}
                  {pts.map(([x,y],i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="4" fill={C.white} stroke={C.primary} strokeWidth="2.5"/>
                      <title>{lineData[i].label}: {lineData[i].v}</title>
                    </g>
                  ))}
                  {/* X labels */}
                  {xLabels.map((l,i) => (
                    <text key={i} x={l.x} y={H-4} textAnchor="middle" fontSize="10" fill={C.gray400} fontFamily="Inter,sans-serif">{l.l}</text>
                  ))}
                </svg>
              </div>
            </div>

            {/* ── MOBILE: bar chart ── */}
            <div className="aa-chart-mobile">
              <div className="aa-chart-stat-m" style={{ borderColor:C.gray100 }}>
                <div>
                  <div style={{ fontSize:30, fontWeight:900, color:C.gray900, lineHeight:1, letterSpacing:-1 }}>{stat.views.toLocaleString()}</div>
                  <div style={{ fontSize:12, color:C.gray500, marginTop:3, fontWeight:500 }}>total views</div>
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:"rgba(16,185,129,0.10)", borderRadius:6, padding:"4px 10px" }}>
                  <Icon name="trend-up" size={11} color="#10b981"/>
                  <span style={{ fontSize:12, fontWeight:700, color:"#10b981" }}>{stat.viewsDelta}</span>
                </div>
              </div>
              <div key={range} style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:6, height:100 }}>
                {barData.map((d, i) => {
                  const pct = maxV > 0 ? Math.max((d.v / maxV) * 100, 8) : 8;
                  const isMax = d.v === maxV;
                  return (
                    <div key={i} className="aa-bar-wrap" style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", gap:5, height:"100%", position:"relative" }}>
                      <div className="aa-bar-tooltip" style={{ position:"absolute", top:-22, background:C.gray900, color:"#fff", fontSize:10, fontWeight:700, borderRadius:5, padding:"3px 6px", whiteSpace:"nowrap" }}>{d.v}</div>
                      <div className="aa-bar" style={{ width:"100%", borderRadius:"5px 5px 3px 3px", background: isMax ? C.primary : "#b8ccf6", height:`${pct}%` }}/>
                      <span style={{ fontSize:11, color:C.gray500, fontWeight:600 }}>{d.l}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Bottom row: top sessions + smart insights */}
      <div className="aa-bottom">

        {/* Top sessions */}
        <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gray200}`, padding:20 }}>
          <h2 style={{ margin:"0 0 14px", fontSize:16, fontWeight:700, color:C.gray900, lineHeight:1.5 }}>Top Sessions</h2>
          {/* Header */}
          <div style={{ display:"grid", gridTemplateColumns:"16px 56px 1fr 72px 44px", gap:"0 10px",
            padding:"4px 0 8px", borderBottom:`1px solid ${C.gray100}`, marginBottom:2 }}>
            <span style={{ gridColumn:"1 / 4", fontSize:11, color:C.gray400, fontWeight:700, letterSpacing:.8, textTransform:"uppercase" }}>Content</span>
            <span style={{ fontSize:11, color:C.gray400, fontWeight:700, letterSpacing:.8, textTransform:"uppercase" }}>Duration</span>
            <span style={{ fontSize:11, color:C.gray400, fontWeight:700, letterSpacing:.8, textTransform:"uppercase" }}>Views</span>
          </div>
          {TOP_SESSIONS.map((s,i) => {
            const grads = ["linear-gradient(135deg,#1e3a5f,#3699ff)","linear-gradient(135deg,#4c1d95,#a855f7)","linear-gradient(135deg,#166534,#50cd89)","linear-gradient(135deg,#7c2d12,#f97316)"];
            return (
              <div key={i}
                onClick={() => onEditSession?.(s)}
                style={{ display:"grid", gridTemplateColumns:"16px 56px 1fr 72px 44px", gap:"0 10px",
                  padding:"10px 0", borderBottom:i<TOP_SESSIONS.length-1?`1px solid ${C.gray100}`:"none",
                  alignItems:"center", cursor:"pointer", borderRadius:8 }}
                onMouseEnter={e=>e.currentTarget.style.background=C.gray50}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span style={{ fontSize:12, color:C.gray400, fontWeight:500 }}>{i+1}</span>
                {/* Thumbnail */}
                <div style={{ width:56, height:36, borderRadius:6, background:grads[i], flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon name="play" size={12} color="rgba(255,255,255,0.8)"/>
                </div>
                {/* Title — constrained width */}
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:C.gray900, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:160 }}>{s.title}</div>
                  <div style={{ fontSize:12, color:C.gray500, marginTop:2 }}>{s.avgPct} completed</div>
                </div>
                <span style={{ fontSize:14, color:C.gray600 }}>{s.avgDuration}</span>
                <span style={{ fontSize:14, fontWeight:700, color:C.gray900 }}>{s.views}</span>
              </div>
            );
          })}
        </div>

        {/* Smart Insights */}
        <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gray200}`, padding:20 }}>
          <h2 style={{ margin:"0 0 20px", fontSize:16, fontWeight:700, color:C.gray900, lineHeight:1.5 }}>Smart Insights</h2>
          {INSIGHTS.map((ins,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0",
              borderBottom:i<INSIGHTS.length-1?`1px solid ${C.gray100}`:"none" }}>
              <div style={{ width:30, height:30, borderRadius:8, background:C.primaryLight,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name={ins.icon} size={14} color={C.primary}/>
              </div>
              <div style={{ fontSize:14, fontWeight:600, color:C.gray900, lineHeight:1.4 }}>{ins.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────────
   ADMIN CREATE SESSION
───────────────────────────────────────────────────────────────────────────── */
function FormSection({ icon, title, subtitle, children }) {
  return (
    <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gray200}`, padding:24, marginBottom:16 }}>
      <div style={{ display:"flex", gap:12, marginBottom:20, alignItems:"flex-start" }}>
        <div style={{ width:36,height:36,borderRadius:10,background:C.primaryLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Icon name={icon} size={18} color={C.primary}/></div>
        <div><div style={{ fontWeight:800, fontSize:16, color:C.gray900 }}>{title}</div><div style={{ fontSize:12, color:C.gray400, marginTop:2 }}>{subtitle}</div></div>
      </div>
      {children}
    </div>
  );
}

function Label({ children, required }) {
  return <div style={{ fontSize:12, fontWeight:700, color:C.gray500, letterSpacing:.5, marginBottom:5, display:"flex", gap:4 }}>{children}{required&&<span style={{ color:C.error }}>*</span>}</div>;
}

const inputSt = { width:"100%", padding:"9px 12px", border:`1px solid ${C.gray200}`, borderRadius:8, fontSize:14, color:C.gray700, outline:"none", background:C.gray50, boxSizing:"border-box", fontFamily:"inherit" };

/* ─────────────────────────────────────────────────────────────────────────────
   CURRICULUM BUILDER
───────────────────────────────────────────────────────────────────────────── */
const CB_Q_TYPES = [
  { key:"short-answer",    label:"Short answer",    icon:"minus"             },
  { key:"paragraph",       label:"Paragraph",       icon:"text-align-left"   },
  { key:"multiple-choice", label:"Multiple choice", icon:"radio-button"      },
  { key:"checkboxes",      label:"Checkboxes",      icon:"check-square"      },
  { key:"dropdown",        label:"Dropdown",        icon:"caret-circle-down" },
];

function CurriculumBuilder({ toast, initialSections, onSectionsChange }) {
  const [sections,         setSections]         = useState(() => {
    if (initialSections && initialSections.length) return initialSections;
    return [{ id:1, title:"Introduction", collapsed:false, resources:[], lessons:[
      { id:101, title:"Welcome & course overview", type:"video", duration:"", status:"draft", vimeoUrl:"", questions:[], quizExpanded:false },
      { id:102, title:"New Quiz", type:"quiz", duration:"", status:"draft", vimeoUrl:"", questions:[{ id:1021, type:"multiple-choice", text:"", options:["","","",""], correct:0, correctArr:[] }], quizExpanded:true },
    ]}];
  });

  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingLessonId,  setEditingLessonId]  = useState(null);
  const [vimeoLinkId,      setVimeoLinkId]      = useState(null); // { secId, lesId }
  const [vimeoInputVal,    setVimeoInputVal]    = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [draggingId,       setDraggingId]       = useState(null);
  const [dragOverId,       setDragOverId]       = useState(null);
  const dragRef            = useRef(null);
  const resourceInputRef   = useRef(null);
  const materialInputRef   = useRef(null);
  const [uploadingResourceSecId, setUploadingResourceSecId] = useState(null);
  const [uploadingMaterialId,    setUploadingMaterialId]    = useState(null);
  const [matDropOver,            setMatDropOver]            = useState(false);
  const materialDropInputRef = useRef(null);
  useEffect(() => { onSectionsChange?.(sections); }, [sections]);

  // ── helpers ──────────────────────────────────────────────────────────────
  function patchLesson(secId, lesId, patch) {
    setSections(s => s.map(sec => sec.id!==secId ? sec : {
      ...sec, lessons: sec.lessons.map(l => l.id!==lesId ? l : {...l, ...patch})
    }));
  }


  function triggerResourceUpload(secId) {
    setUploadingResourceSecId(secId);
    setTimeout(() => resourceInputRef.current?.click(), 0);
  }
  async function handleResourceChosen(e) {
    const file = e.target.files?.[0];
    if (!file || !uploadingResourceSecId) return;
    e.target.value = "";
    const ext = file.name.split(".").pop().toUpperCase();
    const size = file.size > 1024*1024 ? `${(file.size/1024/1024).toFixed(1)} MB` : `${Math.round(file.size/1024)} KB`;
    const icon = ext==="PDF"?"📄": ext==="PPTX"||ext==="PPT"?"📊": ext==="DOCX"||ext==="DOC"?"📝": ext==="ZIP"?"🗂️":"📎";

    const path = `resources/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("session-resources").upload(path, file);
    if (error) { toast({ type:"error", message:"Upload failed: " + error.message }); return; }

    const { data } = supabase.storage.from("session-resources").getPublicUrl(path);
    const newRes = { id:Date.now(), title:file.name.replace(/\.[^.]+$/, ""), type:ext, size, icon, url: data.publicUrl };
    setSections(s => s.map(sec => sec.id!==uploadingResourceSecId ? sec : { ...sec, resources:[...sec.resources, newRes] }));
    toast({ type:"success", message:`"${newRes.title}" added to resources.` });
    setUploadingResourceSecId(null);
  }
  function removeResource(secId, resId) {
    setSections(s => s.map(sec => sec.id!==secId ? sec : { ...sec, resources:sec.resources.filter(r=>r.id!==resId) }));
  }
  async function handleMaterialChosen(e) {
    const file = e.target.files?.[0];
    if (!file || !uploadingMaterialId) return;
    e.target.value = "";
    const { secId, lesId } = uploadingMaterialId;

    const path = `materials/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("session-resources").upload(path, file);
    if (error) { toast({ type:"error", message:"Upload failed: " + error.message }); return; }

    const { data } = supabase.storage.from("session-resources").getPublicUrl(path);
    patchLesson(secId, lesId, { materialFile: null, materialFileName: file.name, materialUrl: data.publicUrl });
    toast({ type:"success", message:`"${file.name}" attached.` });
    setUploadingMaterialId(null);
  }

  // ── section helpers ───────────────────────────────────────────────────────
  function addSection() {
    const id = Date.now();
    setSections(s => [...s, { id, title:"New Section", collapsed:false, resources:[], lessons:[] }]);
    setEditingSectionId(id);
  }
  function updateSectionTitle(id, title) { setSections(s => s.map(sec => sec.id===id ? {...sec,title} : sec)); }
  function deleteSection(id)             { setSections(s => s.filter(sec => sec.id!==id)); }
  function toggleCollapse(id)            { setSections(s => s.map(sec => sec.id===id ? {...sec,collapsed:!sec.collapsed} : sec)); }

  function addLesson(secId, type) {
    const id = Date.now();
    setSections(s => s.map(sec => sec.id!==secId ? sec : {
      ...sec, lessons:[...sec.lessons, { id, title: type==="quiz"?"New Quiz": type==="material"?"New Material":"New Lesson", type, duration:"", status:"draft", vimeoUrl:"", questions:[], quizExpanded: type==="quiz" }]
    }));
    setEditingLessonId(id);
  }
  function deleteLesson(secId, lesId) {
    setSections(s => s.map(sec => sec.id!==secId ? sec : { ...sec, lessons:sec.lessons.filter(l=>l.id!==lesId) }));
  }

  // ── drag-and-drop helpers ─────────────────────────────────────────────────
  function moveSection(fromId, toId) {
    if (fromId === toId) return;
    setSections(s => {
      const arr = [...s];
      const fi = arr.findIndex(x => x.id===fromId);
      const ti = arr.findIndex(x => x.id===toId);
      if (fi<0||ti<0) return s;
      const [item] = arr.splice(fi,1);
      arr.splice(ti,0,item);
      return arr;
    });
  }
  function moveLesson(secId, fromId, toId) {
    if (fromId === toId) return;
    setSections(s => s.map(sec => {
      if (sec.id!==secId) return sec;
      const arr = [...sec.lessons];
      const fi = arr.findIndex(x => x.id===fromId);
      const ti = arr.findIndex(x => x.id===toId);
      if (fi<0||ti<0) return sec;
      const [item] = arr.splice(fi,1);
      arr.splice(ti,0,item);
      return {...sec, lessons:arr};
    }));
  }

  // ── quiz question helpers ─────────────────────────────────────────────────
  function addQuestion(secId, lesId) {
    const q = { id:Date.now(), type:"multiple-choice", text:"", options:["","","",""], correct:0 };
    setSections(s => s.map(sec => sec.id!==secId ? sec : {
      ...sec, lessons: sec.lessons.map(l => l.id!==lesId ? l : { ...l, questions:[...l.questions, q] })
    }));
    setEditingQuestionId(q.id);
  }
  function patchQuestion(secId, lesId, qid, patch) {
    setSections(s => s.map(sec => sec.id!==secId ? sec : {
      ...sec, lessons: sec.lessons.map(l => l.id!==lesId ? l : {
        ...l, questions: l.questions.map(q => q.id!==qid ? q : {...q,...patch})
      })
    }));
  }
  function deleteQuestion(secId, lesId, qid) {
    setSections(s => s.map(sec => sec.id!==secId ? sec : {
      ...sec, lessons: sec.lessons.map(l => l.id!==lesId ? l : { ...l, questions:l.questions.filter(q=>q.id!==qid) })
    }));
  }

  const totalLessons   = sections.reduce((n,s) => n + s.lessons.filter(l=>l.type==="video").length, 0);
  const totalQuizzes   = sections.reduce((n,s) => n + s.lessons.filter(l=>l.type==="quiz").length, 0);
  const totalMaterials = sections.reduce((n,s) => n + s.lessons.filter(l=>l.type==="material").length, 0);

  // flat lessons across all sections
  const allLessons = sections.flatMap(sec => sec.lessons.map(l => ({ ...l, _secId: sec.id })));

  function addFlatLesson(type) {
    if (sections.length === 0) {
      const secId = Date.now();
      setSections([{ id: secId, title:"Section 1", collapsed:false, resources:[], lessons:[{ id: secId+1, title: type==="quiz"?"New Quiz": type==="material"?"New Material":"New Lesson", type, duration:"", status:"draft", vimeoUrl:"", questions:[], quizExpanded:false }] }]);
    } else {
      addLesson(sections[sections.length-1].id, type);
    }
  }

  function deleteFlatLesson(secId, lesId) { deleteLesson(secId, lesId); }

  function addMaterialWithFile(file) {
    const lesId = Date.now();
    const name  = file ? file.name.replace(/\.[^.]+$/, "") : "New Material";
    const mat   = { id:lesId, title:name, type:"material", duration:"", status:"draft", vimeoUrl:"", questions:[], quizExpanded:false, materialFile:file||null, materialFileName:name };
    if (sections.length === 0) {
      const secId = lesId + 1;
      setSections([{ id:secId, title:"Section 1", collapsed:false, resources:[], lessons:[mat] }]);
    } else {
      setSections(s => s.map((sec,i) => i < s.length-1 ? sec : { ...sec, lessons:[...sec.lessons, mat] }));
    }
  }

  const nonMaterialLessons = allLessons.filter(l => l.type !== "material");
  const materialLessons    = allLessons.filter(l => l.type === "material");

  return (
    <div style={{ padding:"0" }}>
      {/* Hidden file inputs */}
      <input ref={resourceInputRef} type="file" accept="application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip" style={{ display:"none" }} onChange={handleResourceChosen}/>
      <input ref={materialInputRef} type="file" accept="application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.mp3,.mp4" style={{ display:"none" }} onChange={handleMaterialChosen}/>
      <input ref={materialDropInputRef} type="file" accept="application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.mp3,.mp4" style={{ display:"none" }}
        onChange={e=>{ const f=e.target.files?.[0]; if(f){ e.target.value=""; addMaterialWithFile(f); } }}/>

      {/* Lesson / Quiz cards */}
      {nonMaterialLessons.map((l, li) => (
        <div key={l.id} style={{ marginBottom:16 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>{l.type==="quiz"?"Assessment":"Lesson"}</div>
          <div style={{ background:C.white, border:`1px solid ${C.gray200}`, borderRadius:14, padding:24 }}>


          {/* Video content */}
          {l.type==="video" && <>
            <Label>LESSON CONTENT</Label>
            <input value={l.vimeoUrl||""} onChange={e=>patchLesson(l._secId,l.id,{vimeoUrl:e.target.value})}
              placeholder="https://vimeo.com/…"
              style={inputSt}/>
            <div style={{ fontSize:11, color:C.gray400, marginTop:5 }}>Supported: Vimeo, YouTube, and more.</div>
          </>}

          {/* Quiz questions — compact rows + inline edit panel */}
          {l.type==="quiz" && <>
            <div>
                {l.questions.map((q, qi) => {
                  const isEditing = qi === 0 || editingQuestionId === q.id;
                  const answerLetters = ["A","B","C","D","E","F"];
                  return (
                    <div key={q.id} style={{ marginBottom:8 }}>
                      {/* Compact row */}
                      {!isEditing && (
                        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`1px solid ${C.gray200}`, borderRadius:10, background:C.white }}>
                          <div style={{ width:30, height:30, borderRadius:8, background:C.gray100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:C.gray600, flexShrink:0 }}>{qi+1}</div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:14, fontWeight:600, color:C.gray900, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{q.text || "Untitled question"}</div>
                            <div style={{ fontSize:12, color:C.gray400, marginTop:2 }}>{q.options.filter(o=>o).length} answers</div>
                          </div>
                          <button onClick={()=>setEditingQuestionId(q.id)} style={{ width:28,height:28,borderRadius:7,border:`1px solid ${C.gray200}`,background:C.white,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Icon name="pencil" size={13} color={C.gray500}/></button>
                          <button onClick={()=>deleteQuestion(l._secId,l.id,q.id)} style={{ width:28,height:28,borderRadius:7,border:`1px solid ${C.gray200}`,background:C.white,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Icon name="trash" size={13} color={C.error}/></button>
                        </div>
                      )}
                      {/* Edit question panel */}
                      {isEditing && (
                        <div style={{ border:`1px solid ${C.gray200}`, borderRadius:10, overflow:"hidden", background:C.white }}>
                          <div style={{ padding:"16px 18px", borderBottom:`1px solid ${C.gray100}` }}>
                            <div style={{ fontSize:12, fontWeight:700, color:C.gray500, letterSpacing:.5, marginBottom:6 }}>QUESTION</div>
                            <input value={q.text} onChange={e=>patchQuestion(l._secId,l.id,q.id,{text:e.target.value})}
                              placeholder="Enter your question…"
                              style={{ width:"100%", padding:"9px 12px", border:`1px solid ${C.gray200}`, borderRadius:8, fontSize:14, color:C.gray700, outline:"none", background:C.gray50, boxSizing:"border-box", fontFamily:"inherit" }}/>
                          </div>
                          <div style={{ padding:"16px 18px", borderBottom:`1px solid ${C.gray100}` }}>
                            <div style={{ fontSize:12, fontWeight:700, color:C.gray500, letterSpacing:.5, marginBottom:12 }}>ANSWERS</div>
                            {q.options.map((opt, oi) => (
                              <div key={oi} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                                <div style={{ display:"flex", alignItems:"center", flex:1, border:`1px solid ${C.gray200}`, borderRadius:8, background:C.gray50, overflow:"hidden" }}>
                                  <span style={{ fontSize:12, fontWeight:700, color:C.gray400, padding:"0 10px", borderRight:`1px solid ${C.gray200}`, alignSelf:"stretch", display:"flex", alignItems:"center", background:C.white, flexShrink:0 }}>{answerLetters[oi]||oi+1}</span>
                                  <input value={opt} onChange={e=>{ const opts=[...q.options]; opts[oi]=e.target.value; patchQuestion(l._secId,l.id,q.id,{options:opts}); }}
                                    placeholder={`Answer ${answerLetters[oi]||oi+1}`}
                                    style={{ flex:1, padding:"9px 12px", border:"none", outline:"none", fontSize:13, color:C.gray700, background:"transparent", fontFamily:"inherit" }}/>
                                </div>
                                {/* Right / Wrong toggles */}
                                <button onClick={()=>patchQuestion(l._secId,l.id,q.id,{correct:oi})}
                                  style={{ padding:"5px 10px", borderRadius:"6px 0 0 6px", border:`1px solid ${q.correct===oi ? C.primary : C.gray200}`, borderRight:"none", fontSize:12, fontWeight:700, cursor:"pointer", background: q.correct===oi ? C.primary : C.white, color: q.correct===oi ? "#fff" : C.gray600 }}>
                                  Right
                                </button>
                                <button onClick={()=>{ if(q.correct===oi) patchQuestion(l._secId,l.id,q.id,{correct:-1}); }}
                                  style={{ padding:"5px 10px", borderRadius:"0 6px 6px 0", border:`1px solid ${q.correct!==oi ? C.primary : C.gray200}`, fontSize:12, fontWeight:700, cursor:"pointer", background: q.correct!==oi ? C.primary : C.white, color: q.correct!==oi ? "#fff" : C.gray600 }}>
                                  Wrong
                                </button>
                                <button onClick={()=>{ const opts=q.options.filter((_,i)=>i!==oi); patchQuestion(l._secId,l.id,q.id,{options:opts, correct: q.correct===oi?-1: q.correct>oi?q.correct-1:q.correct}); }}
                                  style={{ width:26,height:26,borderRadius:6,border:`1px solid ${C.gray200}`,background:C.white,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                                  <Icon name="x" size={11} color={C.gray400}/>
                                </button>
                              </div>
                            ))}
                            <button onClick={()=>{ const opts=[...q.options,""]; patchQuestion(l._secId,l.id,q.id,{options:opts}); }}
                              style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", border:`1px solid ${C.gray200}`, borderRadius:8, background:C.white, cursor:"pointer", color:C.gray600, fontSize:13, fontWeight:600, marginTop:4 }}>
                              <Icon name="plus" size={12} color={C.gray500}/> New answer
                            </button>
                            {q.correct===-1 && <div style={{ fontSize:12, color:"#dc2626", marginTop:8 }}>You must have at least one right answer.</div>}
                          </div>
                          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, padding:"12px 16px" }}>
                            <button onClick={()=>setEditingQuestionId(null)}
                              style={{ padding:"7px 16px", borderRadius:8, border:`1px solid ${C.gray200}`, background:C.white, color:C.gray700, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                              Discard
                            </button>
                            <button onClick={()=>setEditingQuestionId(null)}
                              style={{ padding:"7px 16px", borderRadius:8, border:"none", background:C.primary, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            {l.questions.length > 0 && (
              <button onClick={()=>addQuestion(l._secId,l.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, border:`1px solid ${C.gray200}`, background:C.white, cursor:"pointer", fontSize:13, fontWeight:600, color:C.gray600, fontFamily:"inherit", marginTop:8 }}>
                <Icon name="plus" size={13} color={C.gray500}/>Add question
              </button>
            )}
          </div>
          </>}
          </div>
        </div>
      ))}
      {/* ── Materials section ── */}
      {materialLessons.map((l, mi) => (
        <div key={l.id} style={{ marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase" }}>Material</div>
            <button onClick={()=>deleteFlatLesson(l._secId,l.id)}
              style={{ width:28,height:28,borderRadius:7,border:`1px solid ${C.gray200}`,background:C.white,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <Icon name="trash" size={13} color={C.error}/>
            </button>
          </div>
          <div style={{ background:C.white, border:`1px solid ${C.gray200}`, borderRadius:14, padding:24 }}>

          <Label>TITLE</Label>
          <input value={l.title} onChange={e=>patchLesson(l._secId,l.id,{title:e.target.value})}
            placeholder="Enter title…"
            style={{...inputSt, marginBottom:16}}/>
          <Label>MATERIAL</Label>
            <div
              onDragOver={e=>{ e.preventDefault(); patchLesson(l._secId,l.id,{_dropOver:true}); }}
              onDragLeave={()=>patchLesson(l._secId,l.id,{_dropOver:false})}
              onDrop={e=>{ e.preventDefault(); patchLesson(l._secId,l.id,{_dropOver:false}); const f=e.dataTransfer.files?.[0]; if(f) patchLesson(l._secId,l.id,{materialFile:f,title:l.title||f.name.replace(/\.[^.]+$/,"")}); }}
              onClick={()=>{ setUploadingMaterialId({secId:l._secId,lesId:l.id}); setTimeout(()=>materialInputRef.current?.click(),0); }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, padding:"24px 16px", border:`2px dashed ${l._dropOver?"#059669": l.materialFile?"#bbf7d0":C.gray200}`, borderRadius:10, background: l._dropOver?"#f0fdf4": l.materialFile?"#f0fdf4":C.gray50, cursor:"pointer", transition:"all .15s" }}>
              <Icon name="cloud-arrow-up" size={26} color={l.materialFile?"#059669":C.gray400}/>
              {l.materialFile
                ? <span style={{ fontSize:13, fontWeight:600, color:"#059669" }}>{l.materialFile.name}</span>
                : <>
                    <span style={{ fontSize:13, fontWeight:600, color:C.gray700 }}>Click here or drag to add materials</span>
                    <span style={{ fontSize:12, color:C.gray400 }}>Any document or zip file, max size 10MB</span>
                  </>
              }
            </div>
          </div>
        </div>
      ))}

      {/* Add material button */}
      <button onClick={()=>addMaterialWithFile(null)}
        style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", border:"none", borderRadius:8, background:C.primary, fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer" }}>
        <Icon name="plus" size={12} color="#fff"/> Add Material
      </button>
    </div>
  );
}


function DiscardModal({ onDiscard, onKeep }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1300, background:"rgba(15,23,42,0.55)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
      onClick={e => { if (e.target === e.currentTarget) onKeep(); }}>
      <div style={{ background:"#fff", borderRadius:16, width:"100%", maxWidth:420,
        boxShadow:"0 24px 60px rgba(0,0,0,0.18)", overflow:"hidden" }}>
        <div style={{ padding:"28px 28px 24px" }}>
          <div style={{ width:44, height:44, borderRadius:12, background:"#fff7ed",
            display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", marginBottom:8 }}>Discard changes?</div>
          <div style={{ fontSize:14, color:"#64748b", lineHeight:1.6 }}>
            You have unsaved changes. If you go back now, all your edits — including lesson details, video links, and availability settings — will be lost.
          </div>
        </div>
        <div style={{ display:"flex", gap:10, padding:"0 28px 24px" }}>
          <button onClick={onKeep}
            style={{ flex:1, height:42, background:"#f1f5f9", border:"none", borderRadius:10,
              fontSize:14, fontWeight:600, color:"#334155", cursor:"pointer", fontFamily:"inherit" }}
            onMouseEnter={e=>e.currentTarget.style.background="#e2e8f0"}
            onMouseLeave={e=>e.currentTarget.style.background="#f1f5f9"}>
            Keep editing
          </button>
          <button onClick={onDiscard}
            style={{ flex:1, height:42, background:"#ef4444", border:"none", borderRadius:10,
              fontSize:14, fontWeight:600, color:"#fff", cursor:"pointer", fontFamily:"inherit" }}
            onMouseEnter={e=>e.currentTarget.style.background="#dc2626"}
            onMouseLeave={e=>e.currentTarget.style.background="#ef4444"}>
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminProfilePage({ onBack, userName, userEmail, userAvatar }) {
  return (
    <div style={{ background:C.gray50, minHeight:"100%", padding:24, fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:C.gray600, fontFamily:"inherit", padding:0 }}>
          <Icon name="caret-left" size={16} color={C.gray600}/> Back
        </button>
      </div>
      <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.gray200}`, padding:32, maxWidth:480, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28, paddingBottom:24, borderBottom:`1px solid ${C.gray100}` }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:C.primary, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0 }}>
            {userAvatar
              ? <img src={userAvatar} alt="avatar" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              : <span style={{ fontSize:26, fontWeight:800, color:"#fff" }}>{(userName||"A")[0].toUpperCase()}</span>}
          </div>
          <div>
            <div style={{ fontSize:20, fontWeight:800, color:C.gray900, lineHeight:1.2 }}>{userName || "Admin"}</div>
            <div style={{ fontSize:13, color:C.gray500, marginTop:4 }}>{userEmail || ""}</div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:5, marginTop:6, background:"rgba(99,102,241,0.10)", borderRadius:6, padding:"2px 8px" }}>
              <span style={{ fontSize:11, fontWeight:700, color:C.primary }}>Admin</span>
            </div>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.gray400, letterSpacing:.6, textTransform:"uppercase", marginBottom:6 }}>Full Name</div>
            <div style={{ fontSize:15, fontWeight:600, color:C.gray900 }}>{userName || "—"}</div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.gray400, letterSpacing:.6, textTransform:"uppercase", marginBottom:6 }}>Email</div>
            <div style={{ fontSize:15, fontWeight:600, color:C.gray900 }}>{userEmail || "—"}</div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.gray400, letterSpacing:.6, textTransform:"uppercase", marginBottom:6 }}>Role</div>
            <div style={{ fontSize:15, fontWeight:600, color:C.gray900 }}>Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminCreateSession({ onBack, toast, onSave }) {
  const [tab,  setTab]  = useState("details");
  const [form, setForm] = useState({
    title:"", category:"SPED", lang:"English", desc:"",
    availableFrom:"", availableTo:"",
    instructorName:"", bio:"", linkedin:"", twitter:"",
    instructorImage:"", thumbnail:"",
    vimeoUrl:"",
    discussion:true, qa:true, spinWheel:false, certificate:false, commentVisibility:"visible",
  });
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));
  const [sections, setSections] = useState([{ id:1, title:"Introduction", collapsed:false, resources:[], lessons:[
    { id:101, title:"Welcome & course overview", type:"video", duration:"", status:"draft", vimeoUrl:"", questions:[], quizExpanded:false },
    { id:102, title:"New Quiz", type:"quiz", duration:"", status:"draft", vimeoUrl:"", questions:[{ id:1021, type:"multiple-choice", text:"", options:["","","",""], correct:0, correctArr:[] }], quizExpanded:true },
  ]}]);
  const sectionsRef = useRef(sections);
  function handleSectionsChange(secs) { sectionsRef.current = secs; setSections(secs); }
  const [showDiscard, setShowDiscard] = useState(false);

  function isDirty() {
    if (form.title.trim() || form.desc.trim() || form.instructorName.trim()) return true;
    const secs = sectionsRef.current || [];
    return secs.some(sec => sec.lessons.some(l => l.vimeoUrl || l.questions?.length > 0));
  }
  function tryBack() { if (isDirty()) setShowDiscard(true); else onBack(); }

  // Warn on browser refresh/close
  useEffect(() => {
    function handleBeforeUnload(e) {
      if (!isDirty()) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [form]);

  const [questions,  setQuestions]  = useState([]);
  const [typeMenuId, setTypeMenuId] = useState(null);

  const Q_TYPES = [
    { key:"short-answer",    label:"Short answer",    icon:"minus",             group:1 },
    { key:"paragraph",       label:"Paragraph",       icon:"text-align-left",   group:1 },
    { key:"multiple-choice", label:"Multiple choice", icon:"radio-button",      group:2 },
    { key:"checkboxes",      label:"Checkboxes",      icon:"check-square",      group:2 },
    { key:"dropdown",        label:"Dropdown",        icon:"caret-circle-down", group:2 },
  ];

  function addQuestion() {
    setQuestions(qs => [...qs, { id:Date.now(), type:"multiple-choice", text:"", options:["","","",""], correct:0, correctArr:[] }]);
  }
  function updateQuestion(id, text) { setQuestions(qs => qs.map(q => q.id===id ? {...q,text} : q)); }
  function updateOption(id, oi, value) {
    setQuestions(qs => qs.map(q => { if(q.id!==id) return q; const opts=[...q.options]; opts[oi]=value; return {...q,options:opts}; }));
  }
  function setCorrect(id, oi) { setQuestions(qs => qs.map(q => q.id===id ? {...q,correct:oi} : q)); }
  function duplicateQuestion(id) {
    setQuestions(qs => { const idx=qs.findIndex(q=>q.id===id); const copy={...qs[idx],id:Date.now()}; const next=[...qs]; next.splice(idx+1,0,copy); return next; });
  }
  function setQuestionType(id, type) { setQuestions(qs => qs.map(q => q.id===id?{...q,type,correct:0,correctArr:[]}:q)); setTypeMenuId(null); }
  function toggleCheckbox(id, oi) {
    setQuestions(qs => qs.map(q => { if(q.id!==id) return q; const arr=q.correctArr.includes(oi)?q.correctArr.filter(i=>i!==oi):[...q.correctArr,oi]; return {...q,correctArr:arr}; }));
  }
  function deleteQuestion(id) { setQuestions(qs => qs.filter(q=>q.id!==id)); }

  const Toggle = ({ fieldKey }) => (
    <div onClick={()=>upd(fieldKey,!form[fieldKey])}
      style={{ width:42,height:23,borderRadius:99,background:form[fieldKey]?C.primary:C.gray300,
        position:"relative",cursor:"pointer",transition:"background .2s",flexShrink:0 }}>
      <div style={{ width:17,height:17,borderRadius:"50%",background:"#fff",position:"absolute",
        top:3,left:form[fieldKey]?22:3,transition:"left .2s" }}/>
    </div>
  );

  async function save(publish=false) {
    if (!form.title.trim()) { toast({ type:"error", title:"Title required", message:"Please add a session title before saving." }); return; }
    if (onSave) {
      await onSave(form, publish, sectionsRef.current);
      if (publish) { toast({ type:"success", title:"Session published! 🚀", message:`"${form.title}" is now live.` }); }
      else { toast({ type:"info", title:"Draft saved", message:`"${form.title}" saved as draft.` }); }
      setTimeout(onBack, 800);
    }
  }

  const TABS = [
    { key:"details",      label:"Details"      },
    { key:"curriculum",   label:"Lessons"      },
    { key:"availability", label:"Availability" },
  ];

  const TAB_META = {
    details:      { title:"Session Details",    subtitle:"Set the title, description and instructor info." },
    curriculum:   { title:"Lessons",            subtitle:"Build your curriculum with sections and videos." },
    availability: { title:"Availability",       subtitle:"Control when learners can access this session." },
  };

  const [mobileDrilled, setMobileDrilled] = useState(false);
  const TAB_ICON = { details:"info", curriculum:"play-circle", availability:"calendar" };

  return (
    <div style={{ background:C.gray50, minHeight:"100%", display:"flex", flexDirection:"column" }}>
      <style>{`
        .acs-desktop { max-width:960px; width:100%; margin:0 auto; display:flex; align-items:stretch; flex:1; box-sizing:border-box; }
        .acs-mobile-hub    { display:none; }
        .acs-mobile-detail { display:none; }
        @media(max-width:640px){
          .acs-desktop       { display:none !important; }
          .acs-mobile-hub    { display:block; }
          .acs-mobile-detail { display:block; }
          .aes-card          { padding:16px !important; border-radius:12px !important; }
          .aes-avail-grid    { grid-template-columns:1fr !important; }
          .acs-actions       { flex-direction:column-reverse; gap:8px !important; }
          .acs-actions > *   { width:100%; justify-content:center; }
        }
      `}</style>

      {/* ── MOBILE: Hub ── */}
      {!mobileDrilled && (
        <div className="acs-mobile-hub" style={{ flex:1 }}>
          <div style={{ padding:"16px 16px 12px" }}>
            <button onClick={tryBack} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"none", border:"none", padding:"0 0 12px", cursor:"pointer", color:C.gray500, fontSize:13, fontWeight:600, fontFamily:"inherit" }}>
              <Icon name="arrow-left" size={16} color={C.gray500}/>
              Back
            </button>
            <div style={{ fontSize:22, fontWeight:900, color:C.gray900, letterSpacing:-0.5 }}>Create Session</div>
            <div style={{ fontSize:13, color:C.gray500, marginTop:3 }}>Fill in the details, build your lessons, then publish.</div>
          </div>
          <div style={{ margin:"0 16px", border:`1px solid ${C.gray200}`, borderRadius:16, overflow:"hidden", background:C.white }}>
            {TABS.map((t, i, arr) => (
              <button key={t.key} onClick={() => { setTab(t.key); setMobileDrilled(true); }}
                style={{ display:"flex", alignItems:"center", gap:16, width:"100%", padding:"14px 18px", background:"none", border:"none", borderBottom: i < arr.length-1 ? `1px solid ${C.gray200}` : "none", cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>
                <Icon name={TAB_ICON[t.key]} size={22} color={C.gray700}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:500, color:C.gray900 }}>{t.label}</div>
                  <div style={{ fontSize:12, color:C.gray500, marginTop:2 }}>{TAB_META[t.key].subtitle}</div>
                </div>
                <Icon name="caret-right" size={16} color={C.gray400}/>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── MOBILE: Drilled-in ── */}
      {mobileDrilled && (
        <div className="acs-mobile-detail" style={{ flex:1 }}>
          <div style={{ padding:"16px 16px 0" }}>
            <button onClick={tryBack}
              style={{ display:"inline-flex", alignItems:"center", gap:6, background:"none", border:"none", padding:"0 0 12px", cursor:"pointer", color:C.gray500, fontSize:13, fontWeight:600, fontFamily:"inherit" }}>
              <Icon name="arrow-left" size={16} color={C.gray500}/>
              Back
            </button>
            <h2 style={{ margin:"0 0 4px", fontSize:18, fontWeight:900, color:C.gray900 }}>{TAB_META[tab].title}</h2>
            <p style={{ margin:"0 0 16px", fontSize:13, color:C.gray500 }}>{TAB_META[tab].subtitle}</p>
          </div>
          <div style={{ padding:"0 16px 24px" }}>
            {renderTabContent(true)}
            <div className="acs-actions" style={{ display:"flex", justifyContent:"flex-end", gap:8, paddingTop:24, borderTop:`1px solid ${C.gray200}`, marginTop:24 }}>
              <Btn variant="outline" onClick={tryBack}>Close</Btn>
              {tab === "availability"
                ? <Btn onClick={()=>save(true)}>Publish</Btn>
                : <Btn onClick={() => { setTab(tab==="details"?"curriculum":"availability"); }}>Continue</Btn>
              }
            </div>
          </div>
        </div>
      )}

      {/* ── DESKTOP layout ── */}
      <div className="acs-desktop">

        {/* ── Sidebar ── */}
        <div style={{ width:240, flexShrink:0, padding:"32px 24px", boxSizing:"border-box" }}>
          <h2 style={{ margin:"0 0 6px", fontSize:18, fontWeight:900, color:C.gray900 }}>Create Session</h2>
          <p style={{ margin:"0 0 28px", fontSize:13, color:C.gray500, lineHeight:1.5 }}>Fill in the details, build your lessons, then publish.</p>
          <nav style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {TABS.map(t => {
              const active = tab === t.key;
              return (
                <button key={t.key} onClick={()=>setTab(t.key)}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, border:"none", background: active ? C.primaryLight : "transparent", color: active ? C.primary : C.gray600, fontSize:14, fontWeight: active ? 700 : 500, cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"background .15s" }}>
                  <Icon name={TAB_ICON[t.key]} size={15} color={active ? C.primary : C.gray500}/>
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Divider ── */}
        <div style={{ width:1, background:C.gray200, flexShrink:0, alignSelf:"stretch" }}/>

        {/* ── Content ── */}
        <div style={{ flex:1, minWidth:0, padding:"32px 28px", boxSizing:"border-box", display:"flex", flexDirection:"column" }}>
          <div style={{ marginBottom:24 }}>
            <h2 style={{ margin:"0 0 4px", fontSize:18, fontWeight:900, color:C.gray900 }}>{TAB_META[tab].title}</h2>
            <p style={{ margin:0, fontSize:13, color:C.gray500 }}>{TAB_META[tab].subtitle}</p>
          </div>

          <div style={{ flex:1 }}>
            {renderTabContent()}
          </div>

          {/* Actions */}
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, paddingTop:24, borderTop:`1px solid ${C.gray200}`, marginTop:24 }}>
            <Btn variant="outline" onClick={tryBack}>Close</Btn>
            {tab === "availability"
              ? <Btn onClick={()=>save(true)}>Publish</Btn>
              : <Btn onClick={()=>setTab(tab==="details"?"curriculum":"availability")}>Continue</Btn>
            }
          </div>
        </div>

      </div>

    {showDiscard && <DiscardModal onDiscard={onBack} onKeep={() => setShowDiscard(false)}/>}
    </div>
  );

  function renderTabContent(isMobile=false) { return (<>
            {/* CurriculumBuilder — one per layout, state synced via handleSectionsChange */}
            <div style={{ display: tab === "curriculum" ? "block" : "none" }}>
              <CurriculumBuilder key={isMobile ? "curriculum-mobile" : "curriculum-desktop"} toast={toast} initialSections={sections} onSectionsChange={handleSectionsChange}/>
            </div>
            {/* ── SESSION DETAILS tab ── */}
            {tab === "details" && <>
              {/* Session Info card */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Session Info</div>
                <div className="aes-card" style={{ background:C.white, border:`1px solid ${C.gray200}`, borderRadius:14, padding:24 }}>
                  <Label>COURSE TITLE<span style={{ color:C.error }}> *</span></Label>
                  <input value={form.title} onChange={e=>upd("title",e.target.value)} placeholder="e.g. Advanced Figma Auto-Layout Masterclass" style={{...inputSt, marginBottom:16}}/>
                  <Label>THUMBNAIL</Label>
                  <UploadZone accept="image/*" label="Upload thumbnail" hint="16:9 recommended (JPG, PNG)" icon="image" preview={form.thumbnail}
                    onFile={async file => {
                      const path = `thumbnails/${Date.now()}-${file.name}`;
                      const { error } = await supabase.storage.from("session-resources").upload(path, file);
                      if (!error) { const { data } = supabase.storage.from("session-resources").getPublicUrl(path); upd("thumbnail", data.publicUrl); }
                    }} aspect="16/9" height={160}/>
                  <div style={{ marginTop:16 }}>
                  <Label>DESCRIPTION</Label>
                  <textarea value={form.desc} onChange={e=>upd("desc",e.target.value)} placeholder="Describe what learners will gain from this session…" rows={3} style={{...inputSt,resize:"vertical"}}/>
                  </div>
                </div>
              </div>

              {/* Instructor card */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Instructor</div>
                <div className="aes-card" style={{ background:C.white, border:`1px solid ${C.gray200}`, borderRadius:14, padding:24 }}>
                <Label>INSTRUCTOR PHOTO</Label>
                <UploadZone accept="image/*" icon="user-circle" preview={form.instructorImage}
                  onFile={async file => {
                    const path = `instructors/${Date.now()}-${file.name}`;
                    const { error } = await supabase.storage.from("session-resources").upload(path, file);
                    if (!error) { const { data } = supabase.storage.from("session-resources").getPublicUrl(path); upd("instructorImage", data.publicUrl); }
                  }} circle height={96}/>
                <div style={{ marginTop:16 }}>
                <Label>INSTRUCTOR NAME<span style={{ color:C.error }}> *</span></Label>
                <input value={form.instructorName} onChange={e=>upd("instructorName",e.target.value)} placeholder="e.g. Jane Doe" style={{...inputSt, marginBottom:16}}/>
                <Label>PROFESSIONAL BIO</Label>
                <textarea value={form.bio} onChange={e=>upd("bio",e.target.value)} placeholder="Short bio about your career and achievements…" rows={2} style={{...inputSt,resize:"vertical", marginBottom:16}}/>
                <Label>LINKEDIN</Label>
                <input value={form.linkedin} onChange={e=>upd("linkedin",e.target.value)} placeholder="LinkedIn username" style={{...inputSt, marginBottom:16}}/>
                <Label>X (TWITTER)</Label>
                <input value={form.twitter} onChange={e=>upd("twitter",e.target.value)} placeholder="X handle" style={inputSt}/>
                </div>
                </div>
              </div>

              {/* Engagement */}
              <div style={{ marginTop:24 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Engagement</div>
                <div style={{ border:`1px solid ${C.gray200}`, borderRadius:14, overflow:"hidden" }}>
                  {[
                    { key:"certificate", label:"Certificate",    desc:"Send a certificate on completion." },
                    { key:"spinWheel",   label:"Spin the Wheel", desc:"Enable reward spin activity." },
                  ].map((item, i, arr) => (
                    <div key={item.key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"16px 20px", borderBottom: i < arr.length-1 ? `1px solid ${C.gray200}` : "none", background:C.white }}>
                      <div>
                        <div style={{ fontSize:14, fontWeight:600, color:C.gray900 }}>{item.label}</div>
                        <div style={{ fontSize:12, color:C.gray500, marginTop:2 }}>{item.desc}</div>
                      </div>
                      <Toggle fieldKey={item.key}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community */}
              <div style={{ marginTop:20 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Community</div>
                <div style={{ border:`1px solid ${C.gray200}`, borderRadius:14, overflow:"hidden" }}>
                  {[
                    { val:"visible", label:"Visible", desc:"Comments shown, new ones allowed." },
                    { val:"hidden",  label:"Hidden",  desc:"No comments shown or accepted." },
                    { val:"locked",  label:"Locked",  desc:"Existing shown, no new comments." },
                  ].map((opt, i, arr) => (
                    <div key={opt.val} onClick={()=>upd("commentVisibility", opt.val)}
                      style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"16px 20px", borderBottom: i < arr.length-1 ? `1px solid ${C.gray200}` : "none", background:C.white, cursor:"pointer" }}>
                      <div>
                        <div style={{ fontSize:14, fontWeight:600, color:C.gray900 }}>{opt.label}</div>
                        <div style={{ fontSize:12, color:C.gray500, marginTop:2 }}>{opt.desc}</div>
                      </div>
                      <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${form.commentVisibility===opt.val ? C.primary : C.gray300}`, background: form.commentVisibility===opt.val ? C.primary : C.white, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {form.commentVisibility===opt.val && <div style={{ width:6, height:6, borderRadius:"50%", background:"#fff" }}/>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>}

            {/* ── AVAILABILITY tab ── */}
            {tab === "availability" && <>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Availability</div>
                <div className="aes-card" style={{ background:C.white, border:`1px solid ${C.gray200}`, borderRadius:14, padding:24 }}>
                  <div className="aes-avail-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                    <div>
                      <Label>AVAILABLE FROM</Label>
                      <input type="datetime-local" value={form.availableFrom} onChange={e=>upd("availableFrom",e.target.value)} style={{...inputSt, width:"100%", boxSizing:"border-box"}}/>
                    </div>
                    <div>
                      <Label>AVAILABLE TO</Label>
                      <input type="datetime-local" value={form.availableTo} onChange={e=>upd("availableTo",e.target.value)} style={{...inputSt, width:"100%", boxSizing:"border-box"}}/>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"12px 14px", background:C.primaryLight, borderRadius:8, border:`1px solid ${C.primaryBorder}` }}>
                    <Icon name="info" size={14} color={C.primary} style={{ marginTop:1, flexShrink:0 }}/>
                    <span style={{ fontSize:12, color:C.primary, lineHeight:1.5 }}>When the <strong>Available To</strong> date passes, this session auto-archives and is hidden from students. Leave blank for no expiry.</span>
                  </div>
                </div>
              </div>
            </>}

  </>); }
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADMIN EDIT SESSION
───────────────────────────────────────────────────────────────────────────── */
function AdminEditSession({ session, onBack, toast, onSave }) {
  const [tab,  setTab]  = useState("details");
  const [mobileDrilled, setMobileDrilled] = useState(false);
  const [form, setForm] = useState({
    title:          session.title          || "",
    category:       session.category       || "UI Design",
    lang:           session.lang           || "English",
    desc:           session.desc           || "",
    availableFrom:  session.availableFrom  || "",
    availableTo:    session.availableTo    || "",
    instructorName:  session.instructor     || "",
    bio:             session.instructorBio  || session.bio || "",
    linkedin:        session.linkedin       || "",
    twitter:         session.twitter        || "",
    instructorImage: session.instructorImage || "",
    thumbnail:       session.thumbnail      || "",
    vimeoUrl:        session.vimeoUrl       || "",
    discussion:     session.discussion !== undefined ? session.discussion : true,
    qa:             session.qa         !== undefined ? session.qa         : true,
    spinWheel:      session.spinWheel  !== undefined ? session.spinWheel  : false,
    certificate:    session.certificate !== undefined ? session.certificate : false,
    commentVisibility: session.commentVisibility || "visible",
  });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Capture curriculum sections so vimeoUrls on lessons are saved
  const sectionsRef = useRef(null);
  function handleSectionsChange(secs) { sectionsRef.current = secs; }

  // Build initialSections from session.lessons (flat list → one section)
  const mappedLessons = (session.lessons || []).map(l => ({
    id: l.id, title: l.title, type: l.type || "video",
    duration: l.duration || "", status: l.status || "draft",
    vimeoUrl: l.vimeoUrl || "", questions: Array.isArray(l.questions) ? l.questions : [], quizExpanded: false,
  }));
  // Ensure there's always a quiz lesson
  const hasQuiz = mappedLessons.some(l => l.type === "quiz");
  if (!hasQuiz) {
    mappedLessons.push({ id: Date.now(), title:"Assessment", type:"quiz", duration:"", status:"draft", vimeoUrl:"", questions:[{ id: Date.now()+1, type:"multiple-choice", text:"", options:["","","",""], correct:0, correctArr:[] }], quizExpanded:true });
  }
  const initialSections = [{ id:1, title:"Session", collapsed:false, resources:[], lessons: mappedLessons }];

  const [questions, setQuestions] = useState(session.questions || []);

  const [typeMenuId, setTypeMenuId] = useState(null);

  const Q_TYPES = [
    { key:"short-answer",    label:"Short answer",    icon:"minus",             group:1 },
    { key:"paragraph",       label:"Paragraph",       icon:"text-align-left",   group:1 },
    { key:"multiple-choice", label:"Multiple choice", icon:"radio-button",      group:2 },
    { key:"checkboxes",      label:"Checkboxes",      icon:"check-square",      group:2 },
    { key:"dropdown",        label:"Dropdown",        icon:"caret-circle-down", group:2 },
  ];

  function addQuestion() {
    setQuestions(qs => [...qs, {
      id: Date.now(), type:"multiple-choice",
      text:"", options:["","","",""], correct:0, correctArr:[],
    }]);
  }
  function updateQuestion(id, text) {
    setQuestions(qs => qs.map(q => q.id===id ? {...q, text} : q));
  }
  function updateOption(id, oi, value) {
    setQuestions(qs => qs.map(q => {
      if (q.id !== id) return q;
      const opts = [...q.options]; opts[oi] = value; return {...q, options:opts};
    }));
  }
  function setCorrect(id, oi) {
    setQuestions(qs => qs.map(q => q.id===id ? {...q, correct:oi} : q));
  }
  function duplicateQuestion(id) {
    setQuestions(qs => {
      const idx = qs.findIndex(q => q.id===id);
      const copy = {...qs[idx], id: Date.now()};
      const next = [...qs]; next.splice(idx+1, 0, copy); return next;
    });
  }
  function setQuestionType(id, type) {
    setQuestions(qs => qs.map(q => q.id===id ? {...q, type, correct:0, correctArr:[]} : q));
    setTypeMenuId(null);
  }
  function toggleCheckbox(id, oi) {
    setQuestions(qs => qs.map(q => {
      if (q.id !== id) return q;
      const arr = q.correctArr.includes(oi)
        ? q.correctArr.filter(i => i!==oi)
        : [...q.correctArr, oi];
      return {...q, correctArr: arr};
    }));
  }
  function deleteQuestion(id) {
    setQuestions(qs => qs.filter(q => q.id!==id));
  }

  const [showDiscard, setShowDiscard] = useState(false);
  function tryBack() { setShowDiscard(true); }

  function save() {
    if (!form.title.trim()) { toast({ type:"error", title:"Title required", message:"Please add a session title before saving." }); return; }
    if (onSave) onSave(session.id, form, sectionsRef.current);
    toast({ type:"success", title:"Changes saved", message:`"${form.title}" has been updated.` });
    setTimeout(onBack, 1200);
  }

  function discard() {
    toast({ type:"info", message:"Changes discarded." });
    onBack();
  }

  // Warn on browser refresh/close
  useEffect(() => {
    function handleBeforeUnload(e) { e.preventDefault(); e.returnValue = ""; }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);


  const TABS = [
    { key:"details",      label:"Details"      },
    { key:"curriculum",   label:"Lessons"      },
    { key:"availability", label:"Availability" },
  ];

  const Toggle = ({ fieldKey }) => (
    <div onClick={()=>upd(fieldKey,!form[fieldKey])}
      style={{ width:42,height:23,borderRadius:99,background:form[fieldKey]?C.primary:C.gray300,
        position:"relative",cursor:"pointer",transition:"background .2s",flexShrink:0 }}>
      <div style={{ width:17,height:17,borderRadius:"50%",background:"#fff",position:"absolute",
        top:3,left:form[fieldKey]?22:3,transition:"left .2s" }}/>
    </div>
  );

  const TAB_META = {
    details:      { title:"Session Details",    subtitle:"Edit the title, description and instructor info." },
    curriculum:   { title:"Lessons",            subtitle:"Manage your curriculum sections and videos." },
    availability: { title:"Availability",       subtitle:"Control when learners can access this session." },
  };

  const TAB_ICON = { details:"info", curriculum:"play-circle", availability:"calendar" };

  return (
    <div style={{ background:C.gray50, minHeight:"100%", display:"flex", flexDirection:"column" }}>
      <style>{`
        .aes-desktop { max-width:960px; width:100%; margin:0 auto; display:flex; align-items:stretch; flex:1; box-sizing:border-box; }
        .aes-mobile-hub    { display:none; }
        .aes-mobile-detail { display:none; }
        @media(max-width:640px){
          .aes-desktop       { display:none !important; }
          .aes-mobile-hub    { display:block; }
          .aes-mobile-detail { display:block; }
          .aes-card          { padding:16px !important; border-radius:12px !important; }
          .aes-avail-grid    { grid-template-columns:1fr !important; }
          .aes-actions       { flex-direction:column-reverse; gap:8px !important; }
          .aes-actions > *   { width:100%; justify-content:center; }
        }
      `}</style>

      {/* ── MOBILE: Hub (tab list) ── */}
      {!mobileDrilled && (
        <div className="aes-mobile-hub" style={{ flex:1 }}>
          <div style={{ padding:"16px 16px 12px" }}>
            <button onClick={tryBack} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"none", border:"none", padding:"0 0 12px", cursor:"pointer", color:C.gray500, fontSize:13, fontWeight:600, fontFamily:"inherit" }}>
              <Icon name="arrow-left" size={16} color={C.gray500}/>
              Back
            </button>
            <div style={{ fontSize:22, fontWeight:900, color:C.gray900, letterSpacing:-0.5 }}>Edit Session</div>
            <div style={{ fontSize:13, color:C.gray500, marginTop:3, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{session.title}</div>
          </div>
          <div style={{ margin:"0 16px", border:`1px solid ${C.gray200}`, borderRadius:16, overflow:"hidden", background:C.white }}>
            {TABS.map((t, i, arr) => (
              <button key={t.key} onClick={() => { setTab(t.key); setMobileDrilled(true); }}
                style={{ display:"flex", alignItems:"center", gap:16, width:"100%", padding:"14px 18px", background:"none", border:"none", borderBottom: i < arr.length-1 ? `1px solid ${C.gray200}` : "none", cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>
                <Icon name={TAB_ICON[t.key]} size={22} color={C.gray700}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:500, color:C.gray900 }}>{t.label}</div>
                  <div style={{ fontSize:12, color:C.gray500, marginTop:2 }}>{TAB_META[t.key].subtitle}</div>
                </div>
                <Icon name="caret-right" size={16} color={C.gray400}/>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── MOBILE: Drilled-in tab content ── */}
      {mobileDrilled && (
        <div className="aes-mobile-detail" style={{ flex:1 }}>
          <div style={{ padding:"16px 16px 0" }}>
            <button onClick={tryBack}
              style={{ display:"inline-flex", alignItems:"center", gap:6, background:"none", border:"none", padding:"0 0 12px", cursor:"pointer", color:C.gray500, fontSize:13, fontWeight:600, fontFamily:"inherit" }}>
              <Icon name="arrow-left" size={16} color={C.gray500}/>
              Back
            </button>
            <h2 style={{ margin:"0 0 4px", fontSize:18, fontWeight:900, color:C.gray900 }}>{TAB_META[tab].title}</h2>
            <p style={{ margin:"0 0 16px", fontSize:13, color:C.gray500 }}>{TAB_META[tab].subtitle}</p>
          </div>
          <div style={{ padding:"0 16px 24px" }}>
            {renderTabContent()}
            <div className="aes-actions" style={{ display:"flex", justifyContent:"flex-end", gap:8, paddingTop:24, borderTop:`1px solid ${C.gray200}`, marginTop:24 }}>
              <Btn variant="outline" onClick={tryBack}>Close</Btn>
              {tab === "availability"
                ? <Btn onClick={save}>Save Changes</Btn>
                : <Btn onClick={() => { setTab(tab==="details"?"curriculum":"availability"); }}>Continue</Btn>
              }
            </div>
          </div>
        </div>
      )}

      {/* ── DESKTOP layout ── */}
      <div className="aes-desktop">

        {/* ── Sidebar ── */}
        <div style={{ width:240, flexShrink:0, padding:"32px 24px", boxSizing:"border-box" }}>
          <h2 style={{ margin:"0 0 4px", fontSize:18, fontWeight:900, color:C.gray900 }}>Edit Session</h2>
          <p style={{ margin:"0 0 4px", fontSize:12, color:C.gray500, lineHeight:1.4, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{session.title}</p>
          <p style={{ margin:"0 0 28px", fontSize:13, color:C.gray500 }}></p>
          <nav style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {TABS.map(t => {
              const active = tab === t.key;
              return (
                <button key={t.key} onClick={()=>setTab(t.key)}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, border:"none", background: active ? C.primaryLight : "transparent", color: active ? C.primary : C.gray600, fontSize:14, fontWeight: active ? 700 : 500, cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"background .15s" }}>
                  <Icon name={TAB_ICON[t.key]} size={15} color={active ? C.primary : C.gray500}/>
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Divider ── */}
        <div style={{ width:1, background:C.gray200, flexShrink:0, alignSelf:"stretch" }}/>

        {/* ── Content ── */}
        <div style={{ flex:1, minWidth:0, padding:"32px 28px", boxSizing:"border-box", display:"flex", flexDirection:"column" }}>
          <div style={{ marginBottom:24 }}>
            <h2 style={{ margin:"0 0 4px", fontSize:18, fontWeight:900, color:C.gray900 }}>{TAB_META[tab].title}</h2>
            <p style={{ margin:0, fontSize:13, color:C.gray500 }}>{TAB_META[tab].subtitle}</p>
          </div>

          <div style={{ flex:1 }}>
            {renderTabContent()}
          </div>

          {/* Actions */}
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, paddingTop:24, borderTop:`1px solid ${C.gray200}`, marginTop:24 }}>
            <Btn variant="outline" onClick={tryBack}>Close</Btn>
            {tab === "availability"
              ? <Btn onClick={save}>Save Changes</Btn>
              : <Btn onClick={()=>setTab(tab==="details"?"curriculum":"availability")}>Continue</Btn>
            }
          </div>
        </div>

      </div>
    {showDiscard && <DiscardModal onDiscard={discard} onKeep={() => setShowDiscard(false)}/>}
    </div>
  );

  function renderTabContent() { return (<>
            {/* CurriculumBuilder always rendered (never unmounts) — hidden via display when not active */}
            <div style={{ display: tab === "curriculum" ? "block" : "none" }}>
              <CurriculumBuilder toast={toast} initialSections={initialSections} onSectionsChange={handleSectionsChange}/>
            </div>
            {/* ── DETAILS tab ── */}
            {tab === "details" && <>
              {/* Session Info card */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Session Info</div>
                <div className="aes-card" style={{ background:C.white, border:`1px solid ${C.gray200}`, borderRadius:14, padding:24 }}>
                  <Label>SESSION TITLE<span style={{ color:C.error }}> *</span></Label>
                  <input value={form.title} onChange={e=>upd("title",e.target.value)} placeholder="e.g. Advanced Figma Auto-Layout Masterclass" style={{...inputSt, marginBottom:16}}/>
                  <Label>THUMBNAIL</Label>
                  <UploadZone accept="image/*" label="Upload thumbnail" hint="16:9 recommended (JPG, PNG)" icon="image" preview={form.thumbnail}
                    onFile={async file => {
                      const path = `thumbnails/${Date.now()}-${file.name}`;
                      const { error } = await supabase.storage.from("session-resources").upload(path, file);
                      if (!error) { const { data } = supabase.storage.from("session-resources").getPublicUrl(path); upd("thumbnail", data.publicUrl); }
                    }} aspect="16/9" height={160}/>
                  <div style={{ marginTop:16 }}>
                  <Label>DESCRIPTION</Label>
                  <textarea value={form.desc} onChange={e=>upd("desc",e.target.value)} placeholder="Describe what students will learn…" rows={3} style={{...inputSt,resize:"vertical"}}/>
                  </div>
                </div>
              </div>

              {/* Instructor card */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Instructor</div>
                <div className="aes-card" style={{ background:C.white, border:`1px solid ${C.gray200}`, borderRadius:14, padding:24 }}>
                  <Label>INSTRUCTOR PHOTO</Label>
                  <UploadZone accept="image/*" label="Upload photo" hint="Square image recommended" icon="user-circle" preview={form.instructorImage}
                    onFile={async file => {
                      const path = `instructors/${Date.now()}-${file.name}`;
                      const { error } = await supabase.storage.from("session-resources").upload(path, file);
                      if (!error) { const { data } = supabase.storage.from("session-resources").getPublicUrl(path); upd("instructorImage", data.publicUrl); }
                    }} aspect="1/1" height={120}/>
                  <div style={{ marginTop:16 }}>
                  <Label>INSTRUCTOR NAME<span style={{ color:C.error }}> *</span></Label>
                  <input value={form.instructorName} onChange={e=>upd("instructorName",e.target.value)} placeholder="e.g. Jane Doe" style={{...inputSt, marginBottom:16}}/>
                  <Label>PROFESSIONAL BIO</Label>
                  <textarea value={form.bio} onChange={e=>upd("bio",e.target.value)} placeholder="Short bio about your career and achievements…" rows={2} style={{...inputSt,resize:"vertical", marginBottom:16}}/>
                  <Label>LINKEDIN</Label>
                  <input value={form.linkedin} onChange={e=>upd("linkedin",e.target.value)} placeholder="LinkedIn username" style={{...inputSt, marginBottom:16}}/>
                  <Label>X (TWITTER)</Label>
                  <input value={form.twitter} onChange={e=>upd("twitter",e.target.value)} placeholder="X handle" style={inputSt}/>
                  </div>
                </div>
              </div>

              {/* Engagement */}
              <div style={{ marginTop:24 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Engagement</div>
                <div style={{ border:`1px solid ${C.gray200}`, borderRadius:14, overflow:"hidden" }}>
                  {[
                    { key:"certificate", label:"Certificate",      desc:"Send a certificate on completion." },
                    { key:"discussion",  label:"Discussion Forum",  desc:"Allow students to discuss with peers." },
                    { key:"qa",          label:"Q&A Section",       desc:"Moderate and answer student questions." },
                  ].map((item, i, arr) => (
                    <div key={item.key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"16px 20px", borderBottom: i < arr.length-1 ? `1px solid ${C.gray200}` : "none", background:C.white }}>
                      <div>
                        <div style={{ fontSize:14, fontWeight:600, color:C.gray900 }}>{item.label}</div>
                        <div style={{ fontSize:12, color:C.gray500, marginTop:2 }}>{item.desc}</div>
                      </div>
                      <Toggle fieldKey={item.key}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community */}
              <div style={{ marginTop:20 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Community</div>
                <div style={{ border:`1px solid ${C.gray200}`, borderRadius:14, overflow:"hidden" }}>
                  {[
                    { val:"visible", label:"Visible", desc:"Comments shown, new ones allowed." },
                    { val:"hidden",  label:"Hidden",  desc:"No comments shown or accepted." },
                    { val:"locked",  label:"Locked",  desc:"Existing shown, no new comments." },
                  ].map((opt, i, arr) => (
                    <div key={opt.val} onClick={()=>upd("commentVisibility", opt.val)}
                      style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"16px 20px", borderBottom: i < arr.length-1 ? `1px solid ${C.gray200}` : "none", background:C.white, cursor:"pointer" }}>
                      <div>
                        <div style={{ fontSize:14, fontWeight:600, color:C.gray900 }}>{opt.label}</div>
                        <div style={{ fontSize:12, color:C.gray500, marginTop:2 }}>{opt.desc}</div>
                      </div>
                      <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${form.commentVisibility===opt.val ? C.primary : C.gray300}`, background: form.commentVisibility===opt.val ? C.primary : C.white, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {form.commentVisibility===opt.val && <div style={{ width:6, height:6, borderRadius:"50%", background:"#fff" }}/>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>}

            {/* ── AVAILABILITY tab ── */}
            {tab === "availability" && <>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.gray500, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Availability</div>
                <div className="aes-card" style={{ background:C.white, border:`1px solid ${C.gray200}`, borderRadius:14, padding:24 }}>
                  <div className="aes-avail-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                    <div>
                      <Label>AVAILABLE FROM</Label>
                      <input type="datetime-local" value={form.availableFrom} onChange={e=>upd("availableFrom",e.target.value)} style={{...inputSt, width:"100%", boxSizing:"border-box"}}/>
                    </div>
                    <div>
                      <Label>AVAILABLE TO</Label>
                      <input type="datetime-local" value={form.availableTo} onChange={e=>upd("availableTo",e.target.value)} style={{...inputSt, width:"100%", boxSizing:"border-box"}}/>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"12px 14px", background:C.primaryLight, borderRadius:8, border:`1px solid ${C.primaryBorder}` }}>
                    <Icon name="info" size={14} color={C.primary} style={{ marginTop:1, flexShrink:0 }}/>
                    <span style={{ fontSize:12, color:C.primary, lineHeight:1.5 }}>When the <strong>Available To</strong> date passes, this session auto-archives and is hidden from students. Leave blank for no expiry.</span>
                  </div>
                </div>
              </div>
            </>}

  </>); }
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
   QUIZ DATA
───────────────────────────────────────────────────────────────────────────── */
const QUIZ_DATA = [
  { id:1, title:"AI in Design Foundations",        description:"Mastering the prompting landscape for creative tools.",                           category:"TECHNOLOGY",   icon:"lightning",    status:"in-progress",  questions:15, minutes:20, score:null, progress:40,  currentQ:6  },
  { id:2, title:"Sustainable Architectures",        description:"Building long-term digital systems with scale in mind.",                         category:"LEADERSHIP",   icon:"check-circle", status:"completed",    questions:15, minutes:20, score:92,   progress:100 },
  { id:3, title:"Product Strategy 101",             description:"Defining the value proposition in a crowded market.",                            category:"MANAGEMENT",   icon:"student",      status:"not-started",  questions:12, minutes:15, score:null, progress:0   },
  { id:4, title:"High-Performance Culture",         description:"Creating environments where top talent thrives.",                                category:"TEAMWORK",     icon:"users",        status:"not-started",  questions:20, minutes:30, score:null, progress:0   },
  { id:5, title:"Leadership in Hybrid Teams",       description:"Session 4: Managing cross-functional collaboration in remote environments.",     category:"LEADERSHIP",   icon:"users",        status:"in-progress",  questions:25, minutes:30, score:null, progress:40,  currentQ:10 },
  { id:6, title:"Mental Health & Wellness",         description:"Mindfulness-based strategies to support emotional regulation and wellness.",     category:"MANAGEMENT",   icon:"heart",        status:"completed",    questions:10, minutes:12, score:88,   progress:100 },
];

const QUIZ_QUESTIONS = [
  {
    id:1,
    question:"What is the primary benefit of AI-assisted design tools in special education?",
    options:["Speed of content creation","Personalization of learning materials","Reduced teacher workload","Lower technology costs"],
    correct:1
  },
  {
    id:2,
    question:"Which communication approach is most effective for DHH students in mainstream classrooms?",
    options:["Oral only","Sign language only","Total Communication","Written only"],
    correct:2
  },
  {
    id:3,
    question:"What does AAC stand for?",
    options:["Adapted Assistance Communication","Augmentative and Alternative Communication","Assisted Academic Communication","Advanced Accessibility Communication"],
    correct:1
  },
  {
    id:4,
    question:"Which strategy best supports paraeducator effectiveness?",
    options:["Minimal supervision","Clear role definition and ongoing training","Rotating assignments weekly","Limiting direct student interaction"],
    correct:1
  },
  {
    id:5,
    question:"What is a key principle of Universal Design for Learning (UDL)?",
    options:["Separate curriculum by ability","Multiple means of representation and engagement","Standardised one-size-fits-all testing","Remedial instruction only"],
    correct:1
  },
];

const LEADERBOARD_DATA = [
  { rank:1,  name:"Sarah Jenkins",   xp:3120, isMe:false },
  { rank:2,  name:"Marcus Chen",     xp:2980, isMe:false },
  { rank:3,  name:"Elena Rodriguez", xp:2840, isMe:false },
  { rank:14, name:"You (Alex)",      xp:2450, isMe:true  },
];


/* ─────────────────────────────────────────────────────────────────────────────
   SESSION QUIZZES  (5 questions per session, keyed by session id)
───────────────────────────────────────────────────────────────────────────── */
function getSessionQuestions(session) {
  if (SESSION_QUIZZES[session?.id]) return SESSION_QUIZZES[session.id];
  if (session?.quiz_questions?.length) return session.quiz_questions;
  return (session?.lessons || []).flatMap(l =>
    (l.questions || [])
      .filter(q => q.text && q.options?.some(o => o))
      .map(q => ({ q: q.text, opts: q.options, a: q.correct ?? 0 }))
  );
}

const SESSION_QUIZZES = {
  1: [
    { q:"What does a 'window of tolerance' refer to in trauma-informed teaching?", opts:["The classroom noise level","The zone of optimal arousal for learning","Break time between lessons","Window ventilation policy"], a:1 },
    { q:"Which mindfulness strategy is most suitable for in-classroom use?", opts:["30-minute meditation","Box breathing exercises","Silent retreats","Yoga sessions"], a:1 },
    { q:"Teacher burnout is BEST prevented by:", opts:["Working longer hours","Ignoring student behaviour","Proactive self-care routines","Reducing lesson planning"], a:2 },
    { q:"Somatic awareness in the classroom primarily helps students:", opts:["Memorise content faster","Recognise physical signs of stress","Improve handwriting","Complete homework faster"], a:1 },
    { q:"Which approach reflects a trauma-informed classroom practice?", opts:["Zero-tolerance discipline","Predictable routines and co-regulation","Frequent surprise tests","Competitive grading"], a:1 },
  ],
  2: [
    { q:"The term 'least restrictive environment' (LRE) means:", opts:["Fewest rules in the classroom","Students learn in settings as close to general ed as appropriate","No assistive technology","Unlimited accommodation"], a:1 },
    { q:"Which accommodation is most commonly used for students with dyslexia?", opts:["Reduced recess","Extended time on tests","Smaller font size","Fewer subjects"], a:1 },
    { q:"Co-teaching models BEST support inclusive classrooms by:", opts:["Separating students by ability","Having two teachers share instruction for all students","Giving IEP students a separate room","Using only visual materials"], a:1 },
    { q:"Universal Design for Learning (UDL) primarily focuses on:", opts:["One-size-fits-all curriculum","Multiple means of engagement, representation, and action","Physical classroom layout","Standardised test scores"], a:1 },
    { q:"An IEP is a legally binding document that:", opts:["Replaces the general curriculum","Outlines individualised goals and services for a student","Restricts a student's participation","Is optional for public schools"], a:1 },
  ],
  3: [
    { q:"DHH stands for:", opts:["Differently Hearing Humans","Deaf and Hard of Hearing","Dual Hearing Hierarchy","Dynamic Hearing Help"], a:1 },
    { q:"Total Communication in DHH education combines:", opts:["Only sign language","Multiple modes including speech, sign, and visual aids","Only oral speech","Written language only"], a:1 },
    { q:"Phonological awareness is important for DHH learners primarily because:", opts:["It replaces sign language","It supports literacy and reading development","It improves hearing","It eliminates the need for captioning"], a:1 },
    { q:"Which tool BEST supports DHH students in a mainstream classroom?", opts:["Louder teacher voice","FM system or sound field amplification","Removing all distractions","Sending notes home"], a:1 },
    { q:"Language deprivation in early childhood can result in:", opts:["Faster language acquisition later","Lifelong gaps in language development","No impact on learning","Better visual skills"], a:1 },
  ],
  4: [
    { q:"Effective paraeducator supervision starts with:", opts:["Trial and error","Clear role definitions and expectations","Daily observation reports","Reducing their responsibilities"], a:1 },
    { q:"Which delegation model works BEST in special education settings?", opts:["Delegating everything to paraeducators","Task-specific delegation with clear guidance and feedback","Allowing paraeducators to set their own goals","Avoiding delegation entirely"], a:1 },
    { q:"Communication between teachers and paraeducators should be:", opts:["Only during IEP meetings","Ongoing, structured, and collaborative","Handled entirely by administration","Limited to written notes"], a:1 },
    { q:"Which practice MOST supports student independence in the classroom?", opts:["Constant one-on-one paraeducator support","Fading prompts systematically over time","Paraeducator completing tasks for the student","Removing all support immediately"], a:1 },
    { q:"Paraeducators should primarily be trained in:", opts:["Curriculum design","Behaviour management and instructional strategies","Administrative tasks","Parent communication only"], a:1 },
  ],
  5: [
    { q:"Which AI tool is MOST commonly used for personalised learning in SPED?", opts:["Social media platforms","Adaptive learning software","Generic search engines","Word processors"], a:1 },
    { q:"Text-to-speech technology MOST benefits students with:", opts:["High reading ability","Reading disabilities and visual impairments","No accommodations needed","Advanced math skills"], a:1 },
    { q:"When implementing AI tools in SPED, educators should prioritise:", opts:["Speed of implementation","Student data privacy and ethical use","Using the most expensive tools","Replacing human instruction entirely"], a:1 },
    { q:"Predictive text and word banks primarily support students with:", opts:["Hearing impairments","Motor difficulties and expressive language challenges","Vision impairments","Behavioural challenges"], a:1 },
    { q:"The BEST approach when evaluating an AI tool for classroom use is:", opts:["Adopt immediately if popular","Pilot with a small group and assess impact on student outcomes","Rely solely on vendor claims","Avoid all AI tools"], a:1 },
  ],
  6: [
    { q:"AAC stands for:", opts:["Adapted Academic Curriculum","Augmentative and Alternative Communication","Accessible Audio Content","Applied Assistive Concepts"], a:1 },
    { q:"Which students MOST benefit from AAC devices?", opts:["Students with advanced reading skills","Students with complex communication needs","Students who prefer writing","Students learning a second language"], a:1 },
    { q:"The principle of 'presumed competence' in AAC means:", opts:["Assuming students cannot learn","Assuming all students have the potential to communicate and learn","Waiting until a student proves ability before providing AAC","Only using AAC after all other options fail"], a:1 },
    { q:"Modelling language on an AAC device is BEST described as:", opts:["Telling students what to say","The teacher using the device to demonstrate language naturally","Restricting device use to break times","Letting students explore without guidance"], a:1 },
    { q:"Which is a key barrier to successful AAC implementation?", opts:["Having too many vocabulary options","Lack of training and consistent use across environments","Using high-tech devices","Involving families in the process"], a:1 },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
   SESSION QUIZ MODAL
   • Loads session-specific questions
   • Saves progress on close (in-progress)
   • 80% threshold for pass
───────────────────────────────────────────────────────────────────────────── */
const LEGAL_CONTENT = {
  terms: {
    title: "Terms of Service",
    sections: [
      { heading: "Acceptance of Terms", body: "By creating an account or accessing SPED Summit, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform." },
      { heading: "Use of the Platform", body: "SPED Summit grants you a limited, non-exclusive, non-transferable license to access and use the platform for your personal, non-commercial educational purposes. You may not share login credentials or redistribute course content." },
      { heading: "User Accounts", body: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to terminate accounts that violate these terms." },
      { heading: "Intellectual Property", body: "All content on SPED Summit — including videos, course materials, assessments, and graphics — is owned by SPED Summit or its content creators and is protected by copyright law. Unauthorized reproduction or distribution is prohibited." },
      { heading: "Certificates & Assessments", body: "Certificates of completion are issued upon passing the required assessments. SPED Summit reserves the right to revoke certificates if fraudulent activity is detected." },
      { heading: "Limitation of Liability", body: "SPED Summit is provided 'as is' without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform." },
      { heading: "Changes to Terms", body: "We may update these Terms at any time. Continued use of the platform after changes constitutes acceptance of the revised Terms." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      { heading: "Information We Collect", body: "We collect information you provide when registering (name, email address), your learning activity (progress, quiz results, certificates earned), and technical data (device type, browser, IP address) to operate and improve the platform." },
      { heading: "How We Use Your Information", body: "Your information is used to provide and personalize your learning experience, issue certificates, send important account and course updates, and improve our platform through anonymized analytics." },
      { heading: "Data Sharing", body: "We do not sell your personal data. We may share data with trusted service providers who assist in operating our platform, subject to strict confidentiality agreements. We may disclose data when required by law." },
      { heading: "Cookies", body: "We use cookies and similar technologies to keep you logged in, remember your preferences, and understand how users interact with the platform. You can control cookie settings through your browser." },
      { heading: "Data Retention", body: "We retain your account and learning data for as long as your account is active. You may request deletion of your account and associated data by contacting our support team." },
      { heading: "Your Rights", body: "Depending on your location, you may have rights to access, correct, or delete your personal data. To exercise these rights, please contact us at privacy@spedsummit.com." },
      { heading: "Security", body: "We use industry-standard security measures including encryption in transit and at rest to protect your data. However, no method of transmission over the internet is 100% secure." },
      { heading: "Contact Us", body: "If you have questions about this Privacy Policy, please contact us at privacy@spedsummit.com." },
    ],
  },
};

function LegalModal({ type, onClose }) {
  const content = LEGAL_CONTENT[type];
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:3000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
      onClick={onClose}>
      <div style={{ background:"#fff", borderRadius:16, width:"100%", maxWidth:600, maxHeight:"80vh", display:"flex", flexDirection:"column", boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}
        onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", borderBottom:"1px solid #e5e7eb", flexShrink:0 }}>
          <div style={{ fontWeight:800, fontSize:18, color:"#181c32" }}>{content.title}</div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, border:"1px solid #e5e7eb", background:"#f9fafb", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name="x" size={16} color="#5D636F"/>
          </button>
        </div>
        {/* Body */}
        <div style={{ overflowY:"auto", padding:"20px 24px 28px" }}>
          <p style={{ fontSize:12, color:"#707685", marginTop:0, marginBottom:20 }}>Last updated: January 2025</p>
          {content.sections.map((s,i) => (
            <div key={i} style={{ marginBottom:18 }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#111827", marginBottom:6 }}>{s.heading}</div>
              <p style={{ fontSize:14, color:"#5D636F", lineHeight:1.7, margin:0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuthModal({ onClose, onLogin, defaultStep = "user-auth", noOverlay = false }) {
  // step: "role-select" | "user-auth" | "admin-auth" | "forgot-password"
  const [step,       setStep]      = useState(defaultStep);
  const [mode,       setMode]      = useState(defaultStep === "admin-auth" ? "signin" : "signup");
  const [email,      setEmail]     = useState("");
  const [password,   setPassword]  = useState("");
  const [firstName,  setFirstName] = useState("");
  const [lastName,   setLastName]  = useState("");
  const [keepSigned, setKeepSigned]= useState(true);
  const [legalModal, setLegalModal]= useState(null);
  const [resetSent,  setResetSent] = useState(false);
  const [forgotFromAdmin, setForgotFromAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const isAdmin = step === "admin-auth";

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      console.error("Google login error:", error.message);
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setAuthLoading(true);
    setAuthError("");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { first_name: firstName.trim(), last_name: lastName.trim(), full_name: `${firstName.trim()} ${lastName.trim()}`.trim() } },
        });
        if (error) { setAuthError(error.message); return; }
        if (isAdmin) {
          setAuthError("✓ Account created! Check your email to confirm, then sign in.");
        } else {
          setAuthError("✓ Check your email to confirm your account, then sign in.");
        }
        setMode("signin");
        setPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) { setAuthError(error.message); return; }
        onLogin(isAdmin ? "admin" : "user");
      }
    } finally {
      setAuthLoading(false);
    }
  }

  const inp = {
    width:"100%", padding:"10px 14px", border:"1px solid #e2e8f0", borderRadius:8,
    fontSize:14, color:"#0f172a", outline:"none", boxSizing:"border-box",
    background:"#fff", fontFamily:"inherit", transition:"border-color .15s",
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", background: noOverlay ? "transparent" : "rgba(15,23,42,0.55)", padding:20 }}>
      <div style={{ background:"#fff", borderRadius:16, width:"100%", maxWidth:420, position:"relative", boxShadow:"0 20px 60px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.8) inset" }}>

        {/* ── ROLE SELECT ── */}
        {step === "role-select" && (
          <div style={{ padding:"32px 32px 28px" }}>
            {/* Logo + close row */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
              <img src="/Container.png" alt="SPED Summit" style={{ height:20, display:"block" }}/>
              <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:"1px solid #e2e8f0", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name="x" size={13} color="#64748b"/>
              </button>
            </div>
            <div style={{ marginBottom:16 }}>
              <h2 style={{ margin:"0 0 3px", fontSize:20, fontWeight:800, color:"#0f172a", letterSpacing:"-0.4px" }}>Welcome back</h2>
              <p style={{ margin:0, fontSize:13, color:"#64748b" }}>Choose how you'd like to continue</p>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <button onClick={() => { setStep("user-auth"); setMode("signup"); }}
                style={{ width:"100%", padding:"14px 18px", borderRadius:10, border:"1px solid #e2e8f0", background:"#fff", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all .15s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="#2563eb"; e.currentTarget.style.background="#f8faff"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.background="#fff"; }}>
                <div style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>Continue as User</div>
                <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Create a new learner account</div>
              </button>

            </div>

            <p style={{ textAlign:"center", fontSize:12, color:"#94a3b8", margin:"24px 0 0", lineHeight:1.6 }}>
              By continuing you agree to our{" "}
              <span onClick={()=>setLegalModal("terms")} style={{ color:"#2563eb", cursor:"pointer", fontWeight:600 }}>Terms</span>
              {" "}and{" "}
              <span onClick={()=>setLegalModal("privacy")} style={{ color:"#2563eb", cursor:"pointer", fontWeight:600 }}>Privacy Policy</span>
            </p>
          </div>
        )}

        {/* ── FORGOT PASSWORD ── */}
        {step === "forgot-password" && (
          <div style={{ padding:"24px 32px 28px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <img src="/Container.png" alt="SPED Summit" style={{ height:20, display:"block" }}/>
              <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:"1px solid #e2e8f0", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name="x" size={13} color="#64748b"/>
              </button>
            </div>
            {!resetSent ? (
              <>
                <h2 style={{ margin:"0 0 6px", fontSize:18, fontWeight:800, color:"#0f172a" }}>Reset your password</h2>
                <p style={{ margin:"0 0 20px", fontSize:13, color:"#94a3b8" }}>Enter your email and we'll send you a reset link.</p>
                <form onSubmit={async e => { e.preventDefault(); await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin }); setResetSent(true); }}>
                  <div style={{ marginBottom:16 }}>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#2B2E33", marginBottom:5 }}>Email</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Work Email" type="email" required style={{ width:"100%", padding:"10px 14px", border:"1px solid #e2e8f0", borderRadius:8, fontSize:14, color:"#0f172a", outline:"none", boxSizing:"border-box", background:"#fff", fontFamily:"inherit", transition:"border-color .15s" }}
                      onFocus={e=>e.target.style.borderColor="#6490E8"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                  </div>
                  <button type="submit"
                    style={{ width:"100%", padding:"12px", borderRadius:8, border:"none", background:"#6490E8", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", marginBottom:12 }}
                    onMouseEnter={e=>e.currentTarget.style.background="#4f7de0"}
                    onMouseLeave={e=>e.currentTarget.style.background="#6490E8"}>
                    Send Reset Link
                  </button>
                  <button type="button" onClick={()=>{ setStep(forgotFromAdmin ? "admin-auth" : "user-auth"); setForgotFromAdmin(false); }}
                    style={{ width:"100%", padding:"12px", borderRadius:8, border:"1px solid #e2e8f0", background:"#fff", color:"#64748b", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
                    onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                    Back to Sign In
                  </button>
                </form>
              </>
            ) : (
              <>
                <div style={{ textAlign:"center", padding:"16px 0 8px" }}>
                  <div style={{ width:56, height:56, borderRadius:"50%", background:"#f0fdf4", border:"1px solid #bbf7d0", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                    <Icon name="check-circle" size={28} color="#16a34a"/>
                  </div>
                  <h2 style={{ margin:"0 0 8px", fontSize:18, fontWeight:800, color:"#0f172a" }}>Check your email</h2>
                  <p style={{ margin:"0 0 24px", fontSize:13, color:"#94a3b8", lineHeight:1.6 }}>We sent a password reset link to <strong style={{ color:"#0f172a" }}>{email}</strong>. Check your inbox and follow the instructions.</p>
                  <button onClick={()=>{ setStep(forgotFromAdmin ? "admin-auth" : "user-auth"); setMode("signin"); setResetSent(false); setForgotFromAdmin(false); }}
                    style={{ width:"100%", padding:"12px", borderRadius:8, border:"1px solid #e2e8f0", background:"#fff", color:"#64748b", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
                    onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                    Back to Sign In
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── AUTH FORM ── */}
        {step !== "role-select" && step !== "forgot-password" && (
          <>

            <div style={{ padding: isAdmin ? "28px 32px 28px" : "24px 32px 28px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                <img src="/Container.png" alt="SPED Summit" style={{ height:20, display:"block" }}/>
                {!isAdmin && <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:"1px solid #e2e8f0", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name="x" size={13} color="#64748b"/>
                </button>}
              </div>

              <h2 style={{ margin:"0 0 6px", fontSize:18, fontWeight:800, color:"#0f172a" }}>
                {isAdmin ? (mode === "signup" ? "Create Admin Account" : "Admin Sign In") : mode === "signup" ? "Create your account" : "Welcome back"}
              </h2>
              <p style={{ margin:"0 0 20px", fontSize:13, color:"#94a3b8" }}>
                {isAdmin
                  ? (mode === "signup" ? "Create a new admin account for the SPED Summit platform." : "Sign in to manage the SPED Summit platform.")
                  : (mode === "signup" ? "Join thousands of SPED educators today." : "Sign in to access your account.")}
              </p>

              {/* Sign in / Sign up toggle */}
              <div style={{ display:"flex", background:"#f1f5f9", borderRadius:8, padding:3, marginBottom:20 }}>
                {["signup","signin"].map(m => (
                  <button key={m} onClick={()=>{ setMode(m); setAuthError(""); }}
                    style={{ flex:1, padding:"7px 0", borderRadius:6, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all .15s",
                      background: mode===m ? "#fff" : "transparent",
                      color: mode===m ? "#0f172a" : "#94a3b8",
                      boxShadow: mode===m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    }}>
                    {m === "signup" ? "Create Account" : "Sign In"}
                  </button>
                ))}
              </div>

              {/* Google (user only) */}
              {!isAdmin && (
                <>
                  <button onClick={handleGoogleLogin} disabled={googleLoading}
                    style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:10, padding:"11px 16px", border:"1px solid #e2e8f0", borderRadius:8, background:"#fff", fontSize:14, fontWeight:500, color:"#0f172a", cursor:googleLoading?"not-allowed":"pointer", marginBottom:16, fontFamily:"inherit", transition:"border-color .15s", opacity:googleLoading?0.7:1 }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#6490E8"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="#e2e8f0"}>
                    <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-3.59-13.46-8.71l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
                    {googleLoading ? "Redirecting to Google…" : mode === "signup" ? "Sign up with Google" : "Continue with Google"}
                  </button>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                    <div style={{ flex:1, height:1, background:"#f1f5f9" }}/>
                    <span style={{ fontSize:12, color:"#94a3b8", fontWeight:500 }}>or</span>
                    <div style={{ flex:1, height:1, background:"#f1f5f9" }}/>
                  </div>
                </>
              )}

              <form onSubmit={handleSubmit}>
                {/* Name fields — sign up only */}
                {mode === "signup" && (
                  <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                    <div style={{ flex:1 }}>
                      <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#2B2E33", marginBottom:5 }}>First Name</label>
                      <input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="Jane" type="text" required style={inp}
                        onFocus={e=>e.target.style.borderColor="#6490E8"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#2B2E33", marginBottom:5 }}>Last Name</label>
                      <input value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Smith" type="text" required style={inp}
                        onFocus={e=>e.target.style.borderColor="#6490E8"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                    </div>
                  </div>
                )}
                <div style={{ marginBottom:12 }}>
                  <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#2B2E33", marginBottom:5 }}>Email</label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Work Email" type="email" required style={inp}
                    onFocus={e=>e.target.style.borderColor="#6490E8"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                </div>
                <div style={{ marginBottom: isAdmin ? 8 : 16 }}>
                  <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#2B2E33", marginBottom:5 }}>Password</label>
                  <div style={{ position:"relative" }}>
                    <input value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode === "signup" ? "Create a password" : "Enter your password"} type={showPassword ? "text" : "password"} required style={{ ...inp, paddingRight:40 }}
                      onFocus={e=>e.target.style.borderColor="#6490E8"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                    <button type="button" onClick={()=>setShowPassword(v=>!v)}
                      style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center", color:"#94a3b8" }}>
                      {showPassword
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </div>
                {isAdmin && mode === "signin" && (
                  <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:16 }}>
                    <button type="button" onClick={()=>{ setForgotFromAdmin(true); setStep("forgot-password"); }}
                      style={{ background:"none", border:"none", color:"#6490E8", fontSize:13, fontWeight:500, cursor:"pointer", textDecoration:"underline", padding:0, fontFamily:"inherit" }}>
                      Forgot password?
                    </button>
                  </div>
                )}
                {authError && (
                  <div style={{ marginBottom:12, padding:"10px 12px", borderRadius:8, background: authError.startsWith("✓") ? "#f0fdf4" : "#fef2f2", border:`1px solid ${authError.startsWith("✓") ? "#bbf7d0" : "#fecaca"}`, fontSize:13, color: authError.startsWith("✓") ? "#16a34a" : "#dc2626", lineHeight:1.5 }}>
                    {authError}
                  </div>
                )}
                <button type="submit" disabled={authLoading}
                  style={{ width:"100%", padding:"12px", borderRadius:8, border:"none", background: authLoading ? "#a0b8f0" : "#6490E8", color:"#fff", fontSize:14, fontWeight:700, cursor: authLoading ? "not-allowed" : "pointer", fontFamily:"inherit", transition:"background .15s" }}
                  onMouseEnter={e=>{ if (!authLoading) e.currentTarget.style.background="#4f7de0"; }}
                  onMouseLeave={e=>{ if (!authLoading) e.currentTarget.style.background="#6490E8"; }}>
                  {authLoading ? "Please wait…" : mode === "signup" ? "Create Account" : "Sign In"}
                </button>
                {!isAdmin && (
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:12 }}>
                    <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                      <input type="checkbox" checked={keepSigned} onChange={e=>setKeepSigned(e.target.checked)} style={{ width:14, height:14, accentColor:"#6490E8", cursor:"pointer" }}/>
                      <span style={{ fontSize:13, color:"#2B2E33" }}>Keep me signed in</span>
                    </label>
                    {mode === "signin" && <span onClick={()=>{ setForgotFromAdmin(false); setStep("forgot-password"); }} style={{ fontSize:13, color:"#6490E8", cursor:"pointer", fontWeight:500, textDecoration:"underline" }}>Forgot password?</span>}
                  </div>
                )}
              </form>

              <p style={{ textAlign:"center", fontSize:12, color:"#94a3b8", margin:"20px 0 0", lineHeight:1.6 }}>
                {new Date().getFullYear()} All Rights Reserved.{" "}
                <span onClick={()=>setLegalModal("privacy")} style={{ color:"#6490E8", cursor:"pointer" }}>Privacy</span>
                {" "}and{" "}
                <span onClick={()=>setLegalModal("terms")} style={{ color:"#6490E8", cursor:"pointer" }}>Terms</span>.
              </p>
            </div>
          </>
        )}
      </div>
      {legalModal && <LegalModal type={legalModal} onClose={()=>setLegalModal(null)}/>}
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────────
   APP (Admin-only)
───────────────────────────────────────────────────────────────────────────── */
const IS_ADMIN_DOMAIN = true;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(() => sessionStorage.getItem("page") || "admin-overview");
  const navHistoryRef = useRef(["admin-overview"]);
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem("isAdmin") === "1");
  const [isDark, setIsDark] = useState(() => { const h = new Date().getHours(); return h >= 19 || h < 6; });
  const [editingSession, setEditingSession] = useState(null);
  const { toasts, toast, remove } = useToast();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [adminSessions, setAdminSessions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [seasonsData, setSeasonsData] = useState([]);
  const [spring2026Ids, setSpring2026Ids] = useState([]);
  const scrollContainerRef = useRef(null);

  const fetchSessions = useCallback(() => {
    supabase.from("sessions").select("*").then(({ data, error }) => {
      if (error) { console.error("[Supabase] fetch error:", error.message); return; }

      const toSession = s => ({
        id: s.id, title: s.title, category: s.category,
        instructor: s.instructor || "", instructorBio: s.instructor_bio || "",
        linkedin: s.linkedin || "", twitter: s.twitter || "",
        instructorImage: s.instructor_image || "", thumbnail: s.thumbnail || "",
        duration: s.duration || "60 mins", resources: s.resources || 0,
        progress: 0, status: "not-started",
        description: s.description || "",
        vimeoUrl: s.vimeo_url || "",
        lessons: s.lessons || [],
        availableFrom: s.available_from || null,
        availableTo: s.available_to || null,
        quiz_questions: s.quiz_questions || null,
      });

      const rows = data || [];

      setSessions(prev => {
        return rows.map(s => {
          const existing = prev.find(p => p.id === s.id);
          return { ...toSession(s), progress: existing?.progress || 0, status: existing?.status || "not-started" };
        });
      });

      setSessionsLoading(false);

      setAdminSessions(rows.map(s => {
        const state = getSessionState({ available_from: s.available_from, available_to: s.available_to });
        const statusLabel = state === "live" ? "LIVE" : state === "past" ? "ARCHIVED" : "DRAFT";
        const dateLabel = s.available_from
          ? new Date(s.available_from).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" })
          : "";
        return { id: s.id, title: s.title, category: s.category || "SPED", status: statusLabel, date: dateLabel, enrolled: 0, availableFrom: s.available_from || "", availableTo: s.available_to || "" };
      }));

      setSpring2026Ids(prev => {
        const supabaseIds = new Set(rows.map(s => s.id));
        const surviving = prev.filter(id => supabaseIds.has(id));
        const toAdd = rows.filter(s => !s.available_from && !surviving.includes(s.id)).map(s => s.id);
        return [...surviving, ...toAdd];
      });
    });
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") && session) {
        if (sessionStorage.getItem("loggedOut") === "1") return;
        const meta = session.user.user_metadata || {};
        const name = meta.full_name || meta.name || session.user.email || "User";
        setUserName(name.split(" ")[0] || name);
        setUserEmail(session.user.email || "");
        setUserAvatar(meta.avatar_url || meta.picture || null);
        setIsLoggedIn(true);
        setIsAdmin(true);
        sessionStorage.setItem("isAdmin", "1");
        if (event === "SIGNED_IN" && !sessionStorage.getItem("loggedIn")) { setPage("admin-overview"); sessionStorage.setItem("page", "admin-overview"); }
        if (event === "SIGNED_IN") { sessionStorage.removeItem("loggedOut"); }
        sessionStorage.setItem("loggedIn", "1");
        fetchSessions();
      }
      if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
        setPage("admin-overview");
        setUserName(""); setUserEmail(""); setUserAvatar(null); setIsAdmin(false);
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("isAdmin");
        sessionStorage.setItem("loggedOut", "1");
      }
    });
    return () => subscription.unsubscribe();
  }, [fetchSessions]);

  // On mount, restore session only if the user did not explicitly log out
  useEffect(() => {
    if (sessionStorage.getItem("loggedOut") === "1") return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata || {};
        const name = meta.full_name || meta.name || session.user.email || "User";
        setUserName(name.split(" ")[0] || name);
        setUserEmail(session.user.email || "");
        setUserAvatar(meta.avatar_url || meta.picture || null);
        setIsLoggedIn(true);
        sessionStorage.setItem("loggedIn", "1");
      }
    });
  }, []);

  // Fetch sessions on mount + realtime subscription
  useEffect(() => {
    fetchSessions();

    const channel = supabase
      .channel("sessions-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "sessions" }, () => {
        fetchSessions();
      })
      .subscribe();

    const onVisible = () => { if (document.visibilityState === "visible") fetchSessions(); };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [fetchSessions]);

  // Fetch seasons from Supabase on mount
  useEffect(() => {
    supabase.from("seasons").select("*").then(({ data, error }) => {
      if (error) { console.error("[Supabase] seasons fetch error:", error.message); return; }
      if (data && data.length > 0) {
        setSeasonsData(data.map(s => ({ ...s, sessionIds: s.session_ids || [] })));
      }
    });
  }, []);

  const seasonsBase = seasonsData.length > 0 ? seasonsData : SEASONS;
  const seasons = seasonsBase.map(s => s.id === "spring-2026" ? { ...s, sessionIds: [...(s.sessionIds || []), ...spring2026Ids] } : s);

  function _applyPage(p, keepSession = false) {
    setPage(p); sessionStorage.setItem("page", p);
    if (!keepSession) { setEditingSession(null); }
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }

  function nav(p) {
    const prev = navHistoryRef.current[navHistoryRef.current.length - 1];
    if (prev !== p) {
      navHistoryRef.current = [...navHistoryRef.current, p];
      window.history.pushState({ page: p, isApp: true }, "", window.location.pathname);
    }
    _applyPage(p);
  }

  useEffect(() => {
    function handlePopState(e) {
      if (e.state?.isApp) {
        const targetPage = e.state.page;
        const idx = navHistoryRef.current.lastIndexOf(targetPage);
        if (idx >= 0) navHistoryRef.current = navHistoryRef.current.slice(0, idx + 1);
        else navHistoryRef.current = [targetPage];
        _applyPage(targetPage);
      } else {
        window.history.pushState({ page: "admin-overview", isApp: true }, "", window.location.pathname);
        navHistoryRef.current = ["admin-overview"];
        _applyPage("admin-overview");
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function openEdit(s) {
    const full = sessions.find(sess => sess.id === s.id);
    setEditingSession(full ? {
      ...s,
      lessons: full.lessons,
      vimeoUrl: full.vimeoUrl || s.vimeoUrl,
      instructor: full.instructor || s.instructor || "",
      instructorBio: full.instructorBio || "",
      linkedin: full.linkedin || "",
      twitter: full.twitter || "",
      instructorImage: full.instructorImage || "",
      thumbnail: full.thumbnail || "",
      desc: full.description || "",
      description: full.description || "",
      availableFrom: full.availableFrom || s.availableFrom || "",
      availableTo: full.availableTo || s.availableTo || "",
    } : s);
    setPage("admin-edit");
    sessionStorage.setItem("page", "admin-edit");
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }

  async function addAdminSession(form, publish, sections) {
    const newId = Date.now();
    const lessons = sections && sections.length
      ? sections.flatMap(sec => sec.lessons.map(l => ({
          sectionTitle: sec.title, title: l.title,
          duration: l.duration || "60:00", status: publish ? "available" : "draft",
          type: l.type || "video", vimeoUrl: l.vimeoUrl || form.vimeoUrl || "",
          questions: l.questions || [],
        })))
      : [{ sectionTitle:"Session", title:"Full Session", duration:"60:00", status: publish ? "available" : "draft", type:"video", vimeoUrl: form.vimeoUrl || "" }];

    const supabaseEntry = {
      id: newId, title: form.title, category: form.category || "SPED",
      instructor: form.instructorName || "", instructor_bio: form.bio || "",
      linkedin: form.linkedin || "", twitter: form.twitter || "",
      instructor_image: form.instructorImage || "", thumbnail: form.thumbnail || "",
      duration: "60 mins",
      description: form.desc || "", vimeo_url: form.vimeoUrl || "",
      available_from: form.availableFrom || null, available_to: form.availableTo || null,
      lessons,
    };

    console.log("[addAdminSession] inserting:", supabaseEntry);
    const { data, error } = await supabase.from("sessions").insert([supabaseEntry]).select();
    if (error) {
      console.error("[addAdminSession] error:", error);
      toast({ type:"error", title:"Save failed", message: error.message });
      return;
    }

    await fetchSessions();
  }

  async function updateSession(id, form, sections) {
    const updatedLessons = sections
      ? sections.flatMap(sec => sec.lessons.map(l => ({
          id: l.id, sectionTitle: sec.title, title: l.title,
          duration: l.duration || "60:00", status: l.status === "draft" ? "available" : l.status,
          type: l.type || "video", vimeoUrl: l.vimeoUrl || "",
          questions: l.questions || [],
        })))
      : undefined;

    const supabaseUpdate = {
      title: form.title, category: form.category,
      instructor: form.instructorName, instructor_bio: form.bio,
      linkedin: form.linkedin || "", twitter: form.twitter || "",
      instructor_image: form.instructorImage || "", thumbnail: form.thumbnail || "",
      description: form.desc, vimeo_url: form.vimeoUrl,
      available_from: form.availableFrom || null, available_to: form.availableTo || null,
      ...(updatedLessons ? { lessons: updatedLessons } : {}),
      ...(form.quiz_questions ? { quiz_questions: form.quiz_questions } : {}),
    };
    const { error } = await supabase.from("sessions").update(supabaseUpdate).eq("id", id);
    if (error) { toast({ type:"error", title:"Update failed", message: error.message }); return; }

    setSessions(prev => prev.map(s => s.id === id ? {
      ...s, title: form.title, category: form.category, instructor: form.instructorName,
      instructorBio: form.bio, description: form.desc, vimeoUrl: form.vimeoUrl,
      availableFrom: form.availableFrom, availableTo: form.availableTo,
      ...(updatedLessons ? { lessons: updatedLessons } : {}),
    } : s));
    setAdminSessions(prev => prev.map(s => s.id === id ? { ...s, title: form.title, category: form.category, instructor: form.instructorName, vimeoUrl: form.vimeoUrl, availableFrom: form.availableFrom, availableTo: form.availableTo } : s));
  }

  function renderPage() {
    if (page==="admin-overview") return <AdminOverview onNavigate={nav} onEditSession={openEdit} toast={toast} adminSessions={adminSessions}/>;
    if (page==="admin-sessions") return <AdminSessionsPage onNavigate={nav} onEditSession={openEdit} toast={toast} adminSessions={adminSessions} setAdminSessions={setAdminSessions}/>;
    if (page==="admin-create") return <AdminCreateSession onBack={()=>nav("admin-sessions")} toast={toast} onSave={addAdminSession}/>;
    if (page==="admin-edit" && editingSession) return <AdminEditSession session={editingSession} onBack={()=>nav("admin-sessions")} toast={toast} onSave={updateSession}/>;
    if (page==="admin-analytics") return <AnalyticsPage onEditSession={openEdit} sessions={sessions}/>;
    if (page==="admin-profile") return <AdminProfilePage onBack={()=>nav("admin-overview")} userName={userName} userEmail={userEmail} userAvatar={userAvatar}/>;
    return <AdminOverview onNavigate={nav} onEditSession={openEdit} toast={toast} adminSessions={adminSessions}/>;
  }

  const activePage = page;

  // Admin login gate: show admin sign-in until authenticated
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#faf5f0", flexDirection:"column", gap:24 }}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <AuthModal noOverlay onClose={()=>{}} onLogin={(role) => {
          if (role === "admin") {
            setIsAdmin(true);
            setIsLoggedIn(true);
            sessionStorage.setItem("isAdmin", "1");
            sessionStorage.removeItem("loggedOut");
            setPage("admin-overview");
            sessionStorage.setItem("page", "admin-overview");
          }
        }} defaultStep="admin-auth"/>
      </div>
    );
  }

  return (
    <div data-theme={isDark ? "dark" : "light"} style={{ height:"100vh", display:"flex", flexDirection:"column", fontFamily:"'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background:C.gray50 }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <TopBar
        isAdmin={true}
        toast={toast}
        isDark={isDark}
        onToggleDarkMode={() => setIsDark(v => !v)}
        onLogout={async () => {
          sessionStorage.setItem("loggedOut", "1");
          sessionStorage.removeItem("isAdmin");
          sessionStorage.removeItem("loggedIn");
          sessionStorage.setItem("page", "admin-overview");
          await supabase.auth.signOut();
          setIsLoggedIn(false);
          setPage("admin-overview");
          setUserName(""); setUserEmail(""); setUserAvatar(null);
          setIsAdmin(false);
        }}
        onNavigateProfile={() => nav("admin-profile")}
        onOpenSession={() => {}}
        onNavigate={nav}
        userName={userName}
        userAvatar={userAvatar}
        seasons={seasons}
        sessions={sessions}
      />
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <style>{`
          .app-tabbar-wrap { display: block; }
          .app-bottom-nav  { display: none; }
          @media(max-width: 767px) {
            .app-tabbar-wrap        { display: none !important; }
            .app-bottom-nav         { display: flex !important; }
            .app-scroll-area        { padding-bottom: 72px; }
            .topbar-browse          { display: none !important; }
          }
        `}</style>

        <div className="app-tabbar-wrap">
          {page !== "admin-create" && page !== "admin-edit" && (
            <TabBar
              active={activePage}
              onChange={nav}
              isAdmin={true}
            />
          )}
          {(page === "admin-create" || page === "admin-edit") && (
            <TabBar
              active={activePage}
              onChange={nav}
              isAdmin={true}
              breadcrumbs={[
                { label:"My Sessions", onClick:() => nav("admin-sessions") },
                { label: page === "admin-edit" ? (editingSession?.title || "Edit Session") : "Create New Session" },
              ]}
            />
          )}
        </div>

        <div ref={scrollContainerRef} className="app-scroll-area" style={{ flex:1, overflowY:"auto", overflowX:"clip", background:C.gray50 }}>
          {renderPage()}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="app-bottom-nav" style={{ display:"none" }}>
        <LimelightBottomNav
          active={activePage}
          onChange={nav}
          isAdmin={true}
        />
      </div>

      <ToastContainer toasts={toasts} onRemove={remove}/>
      <style>{`
        :root, [data-theme="light"] {
          --hero-bg: linear-gradient(120deg, #fff4f0, #ffe8e0);
          --c-primary:#6490E8; --c-primaryDark:#4a77d4; --c-primaryLight:#eef3fd; --c-primaryBorder:#b8cef5;
          --c-accent:#FF8F6C; --c-accentBg:#FFF4F0;
          --c-success:#10b981; --c-successLight:#ecfdf5; --c-successBorder:#6ee7b7;
          --c-warning:#f59e0b; --c-warningLight:#fffbeb; --c-warningBorder:#fcd34d;
          --c-error:#ef4444; --c-errorLight:#fef2f2; --c-errorBorder:#fca5a5;
          --c-info:#6490E8; --c-infoLight:#eef3fd; --c-infoBorder:#b8cef5;
          --c-gray50:#f9fbf8; --c-gray100:#f3f4f6; --c-gray200:#eceded; --c-gray300:#d1d5db;
          --c-gray400:#a0a4a6; --c-gray500:#707685; --c-gray600:#5D636F; --c-gray700:#374151;
          --c-gray800:#2B2E33; --c-gray900:#2B2E33; --c-white:#ffffff;
          --fs-display-2xl:70px; --fs-display-xl:60px; --fs-display-lg:48px;
          --fs-display-md:36px; --fs-display-sm:30px;
          --fs-body-xl:20px; --fs-body-lg:18px; --fs-body-md:16px;
          --lh-display:1.25; --lh-body:1.5;
        }
        [data-theme="dark"] {
          --hero-bg: linear-gradient(120deg, #1a2035, #0f172a);
          --c-primary:#7aa3ee; --c-primaryDark:#6490E8; --c-primaryLight:#1a2540; --c-primaryBorder:#2d4a7a;
          --c-accent:#FF8F6C; --c-accentBg:#2a1a14;
          --c-success:#10b981; --c-successLight:#064e3b; --c-successBorder:#065f46;
          --c-warning:#f59e0b; --c-warningLight:#451a03; --c-warningBorder:#92400e;
          --c-error:#ef4444; --c-errorLight:#450a0a; --c-errorBorder:#7f1d1d;
          --c-info:#7aa3ee; --c-infoLight:#1a2540; --c-infoBorder:#2d4a7a;
          --c-gray50:#1e293b; --c-gray100:#1e293b; --c-gray200:#2d3748; --c-gray300:#4b5563;
          --c-gray400:#6b7280; --c-gray500:#9ca3af; --c-gray600:#d1d5db; --c-gray700:#e5e7eb;
          --c-gray800:#e2e8f0; --c-gray900:#f1f5f9; --c-white:#1e293b;
        }
        * { box-sizing: border-box; }
        @keyframes toastIn { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn  { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes skeleton-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e4e6ef; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #b5b5c3; }
        input, textarea, select { font-family: inherit; }
        button { font-family: inherit; }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator { cursor: pointer; filter: brightness(0) saturate(100%) opacity(0.45); }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover { filter: brightness(0) saturate(100%) opacity(0.8); }
        [data-theme="dark"] input[type="datetime-local"]::-webkit-calendar-picker-indicator { filter: brightness(0) invert(1) opacity(0.45); }
        [data-theme="dark"] input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover { filter: brightness(0) invert(1) opacity(0.85); }
        [data-theme="dark"] #spedLogoSvg { filter: brightness(0) invert(1); }
      `}</style>
    </div>
  );
}
