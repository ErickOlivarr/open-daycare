"use client";

import { useState } from "react";
import AddChildModal from "@/app/components/AddChildModal";
import ChildCard from "@/app/components/ChildCard";
import { children as initialChildren, type Child } from "@/app/lib/children";

export default function KidsPage() {
  const [kids, setKids] = useState<Child[]>(() => [...initialChildren]);
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[880px] px-5 pb-14 pt-16 lg:px-10 lg:pb-20 lg:pt-[34px]">
      <div className="mb-[22px] flex items-end justify-between gap-4">
        <div>
          <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-brand">
            GESTIÓN
          </div>
          <h1 className="font-fredoka text-[30px] font-semibold text-ink">
            Niños
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Agregar niño
        </button>
      </div>

      <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-line bg-surface px-4 py-3">
        <svg
          className="text-photo-fg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          placeholder="Buscar niño…"
          className="flex-1 border-none bg-transparent text-[15px] text-ink outline-none placeholder:text-placeholder"
        />
      </div>

      <div className="mb-[14px] flex items-center gap-3">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink">
          SALA SOLES
        </span>
        <span className="text-[13px] text-muted">8 niños</span>
        <span className="h-px flex-1 bg-divider" />
      </div>

      <div className="grid grid-cols-1 gap-[14px] lg:grid-cols-2">
        {kids.map((child) => (
          <ChildCard key={child.id} child={child} />
        ))}
      </div>

      {open ? (
        <AddChildModal
          avatarIndex={kids.length}
          onAdd={(child) => setKids((prev) => [...prev, child])}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
