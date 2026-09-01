import Link from "next/link";
import type { Child, TagVariant } from "@/app/lib/children";

const TAG_META: Record<TagVariant, string> = {
  allergy: "bg-tag-allergy-bg text-tag-allergy-fg",
  link: "bg-tag-link-bg text-tag-link-fg",
};

function parentLabel(count: number): string {
  if (count === 0) return "sin padres vinculados";
  if (count === 1) return "1 padre vinculado";
  return `${count} padres vinculados`;
}

export default function ChildCard({ child }: { child: Child }) {
  const tag = child.tags[0];

  return (
    <Link
      href={`/kids/${child.id}`}
      className="flex min-w-0 items-center gap-[14px] rounded-[18px] border border-line bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition hover:-translate-y-[2px] hover:border-card-hover"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-fredoka text-[19px] font-semibold"
        style={{ backgroundColor: child.avatarBg, color: child.avatarFg }}
      >
        {child.initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-fredoka text-[16px] font-semibold text-ink">
          {child.name}
        </div>
        <div className="text-[13px] text-muted">
          {child.age} años · {parentLabel(child.linkedParents)}
        </div>
      </div>
      {tag ? (
        <span
          className={`shrink-0 rounded-full px-[9px] py-[5px] text-[11px] font-extrabold ${TAG_META[tag.variant]}`}
        >
          {tag.label}
        </span>
      ) : (
        <svg
          className="shrink-0 text-chevron"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </Link>
  );
}
