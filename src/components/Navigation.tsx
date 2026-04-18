'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/poets', label: 'الشعراء' },
  { href: '/write', label: 'أكتب' },
  { href: '/learn', label: 'تعلم' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-[#0d2b1a]/90 backdrop-blur-md border-b border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl">🏛️</div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#d4af37]" style={{ fontFamily: 'var(--font-amiri)' }}>
                رحيق
              </span>
              <span className="text-xs text-[#f5f5f0]/70">الشعر العربي الإسلامي</span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#d4af37]'
                    : 'text-[#f5f5f0] hover:text-[#d4af37]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}