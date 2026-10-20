import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { courses } from "./data";

interface Enrollment {
  courseId: string;
  enrolledAt: string;
  progress: Record<string, boolean>; // lessonId -> done
  quizBest: number | null; // best score %
  quizPassed: boolean;
  certId: string | null;
  nameOnCert?: string;
}

interface User {
  name: string;
  email: string;
  creds: string; // e.g. "BCBA, LBA"
  bacbId?: string;
}

interface Store {
  user: User | null;
  signIn: (u: User) => void;
  signOut: () => void;
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  enrollments: Record<string, Enrollment>;
  enroll: (ids: string[]) => void;
  isEnrolled: (id: string) => boolean;
  toggleLesson: (courseId: string, lessonId: string) => void;
  recordQuiz: (courseId: string, score: number, nameOnCert: string) => string | null;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  authOpen: boolean;
  setAuthOpen: (v: boolean) => void;
  totalCeus: number;
}

const Ctx = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed != null ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load("taa_user", null));
  const [cart, setCart] = useState<string[]>(() => {
    const v = load<string[]>("taa_cart", []);
    return Array.isArray(v) ? v : [];
  });
  const [enrollments, setEnrollments] = useState<Record<string, Enrollment>>(() => {
    const v = load<Record<string, Enrollment>>("taa_enroll", {});
    return v && typeof v === "object" && !Array.isArray(v) ? v : {};
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const v = load<string[]>("taa_wish", []);
    return Array.isArray(v) ? v : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => localStorage.setItem("taa_user", JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem("taa_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("taa_enroll", JSON.stringify(enrollments)), [enrollments]);
  useEffect(() => localStorage.setItem("taa_wish", JSON.stringify(wishlist)), [wishlist]);

  const signIn = useCallback((u: User) => setUser(u), []);
  const signOut = useCallback(() => setUser(null), []);

  const addToCart = useCallback((id: string) => {
    setCart((c) => {
      const safe = Array.isArray(c) ? c : [];
      return safe.includes(id) ? safe : [...safe, id];
    });
    setCartOpen(true);
  }, []);
  const removeFromCart = useCallback((id: string) => {
    setCart((c) => (Array.isArray(c) ? c.filter((x) => x !== id) : []));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);

  const enroll = useCallback((ids: string[]) => {
    setEnrollments((prev) => {
      const next = { ...(prev || {}) };
      for (const id of ids) {
        if (!next[id]) {
          next[id] = { courseId: id, enrolledAt: new Date().toISOString(), progress: {}, quizBest: null, quizPassed: false, certId: null };
        }
      }
      return next;
    });
  }, []);

  const isEnrolled = useCallback((id: string) => Boolean(enrollments?.[id]), [enrollments]);

  const toggleLesson = useCallback((courseId: string, lessonId: string) => {
    setEnrollments((prev) => {
      const safe = prev || {};
      const e = safe[courseId];
      if (!e) return prev;
      const progress = { ...(e.progress || {}), [lessonId]: !e.progress?.[lessonId] };
      return { ...safe, [courseId]: { ...e, progress } };
    });
  }, []);

  const recordQuiz = useCallback((courseId: string, score: number, nameOnCert: string) => {
    let cert: string | null = null;
    setEnrollments((prev) => {
      const safe = prev || {};
      const e = safe[courseId];
      if (!e) return prev;
      const passed = score >= 80;
      const best = e.quizBest == null ? score : Math.max(e.quizBest, score);
      cert = passed ? e.certId ?? uid("TAA") : e.certId;
      return { ...safe, [courseId]: { ...e, quizBest: Math.round(best), quizPassed: e.quizPassed || passed, certId: cert, nameOnCert } };
    });
    return cert;
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((w) => {
      const safe = Array.isArray(w) ? w : [];
      return safe.includes(id) ? safe.filter((x) => x !== id) : [...safe, id];
    });
  }, []);

  const totalCeus = useMemo(() => {
    return Object.values(enrollments || {}).reduce((sum, e) => {
      if (!e?.quizPassed) return sum;
      const c = courses.find((x) => x.id === e.courseId);
      return sum + (c?.ceus ?? 0);
    }, 0);
  }, [enrollments]);

  const value: Store = {
    user, signIn, signOut, cart, addToCart, removeFromCart, clearCart,
    enrollments, enroll, isEnrolled, toggleLesson, recordQuiz,
    wishlist, toggleWishlist, cartOpen, setCartOpen, authOpen, setAuthOpen, totalCeus,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}

export function courseProgress(courseId: string, e?: Enrollment): number {
  const c = courses.find((x) => x.id === courseId);
  if (!c) return 0;
  const lessonIds = c.modules.flatMap((m) => m.lessons.map((l) => l.id));
  if (!e || lessonIds.length === 0) return 0;
  const done = lessonIds.filter((id) => e.progress?.[id]).length;
  return Math.round((done / lessonIds.length) * 100);
}
