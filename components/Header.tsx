"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/the-edit", label: "The Edit" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = pathname?.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";
  const isTheEdit = pathname?.startsWith("/the-edit");

  useEffect(() => {
    if (isAdmin) return;
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAdmin]);

  const headerClass =
    isAdmin || isTheEdit
      ? "bg-[var(--color-bg)] border-b border-[var(--color-border)]"
      : scrolled
        ? "bg-[rgba(248,246,242,0.92)] backdrop-blur-[12px] border-b border-[var(--color-border)]"
        : "";

  const textClass = isAdmin || isTheEdit || scrolled ? "text-[var(--color-text)]" : "text-white";

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  if (isAdmin && !isAdminLogin) {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 bg-[var(--color-bg)] border-b border-[var(--color-border)] text-[var(--color-text)]`}
      >
        <Link
          href="/admin/dashboard"
          className="font-display text-2xl font-semibold tracking-wide"
        >
          Mia Randria — Admin
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm font-medium tracking-widest uppercase opacity-85 hover:opacity-100"
        >
          Sign out
        </button>
      </header>
    );
  }

  if (isAdminLogin) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 bg-[var(--color-bg)] border-b border-[var(--color-border)] text-[var(--color-text)]">
        <Link href="/" className="font-display text-2xl font-semibold tracking-wide">
          Mia Randria
        </Link>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 transition-colors duration-300 ${headerClass} ${textClass}`}
    >
      <Link
        href="/"
        className="font-display text-2xl font-semibold tracking-wide"
        aria-label="Mia Randria home"
      >
        Mia Randria
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium tracking-widest uppercase opacity-85 hover:opacity-100 transition-opacity"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="w-[22px] h-0.5 bg-current" />
        <span className="w-[22px] h-0.5 bg-current" />
        <span className="w-[22px] h-0.5 bg-current" />
      </button>
      {menuOpen && (
        <nav
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[var(--color-bg)] md:hidden"
          aria-label="Mobile menu"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
