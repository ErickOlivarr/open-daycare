import Link from "next/link";
import type { Post, PostType } from "@/app/lib/posts";

const TYPE_META: Record<
  PostType,
  { label: string; badge: string; dot: string; avatarText: string }
> = {
  achievement: {
    label: "LOGRO",
    badge: "bg-achievement-bg text-achievement-fg",
    dot: "bg-achievement-fg",
    avatarText: "text-avatar-blue-fg",
  },
  activity: {
    label: "ACTIVIDAD",
    badge: "bg-activity-bg text-activity-fg",
    dot: "bg-activity-fg",
    avatarText: "text-avatar-blue-fg",
  },
  announcement: {
    label: "ANUNCIO",
    badge: "bg-announcement-bg text-announcement-fg",
    dot: "bg-announcement-fg",
    avatarText: "text-announcement-fg",
  },
};

export default function PostCard({ post }: { post: Post }) {
  const meta = TYPE_META[post.type];

  return (
    <div className="rounded-[20px] border border-line bg-surface px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <div className="mb-[14px] flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-fredoka text-[17px] font-semibold ${meta.avatarText}`}
          style={{ backgroundColor: post.avatarBg }}
        >
          {post.type === "announcement" ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          ) : (
            post.initial
          )}
        </div>
        <div className="flex-1">
          <div className="font-fredoka text-[16.5px] font-semibold text-ink">
            {post.author}
          </div>
          <div className="text-[12.5px] text-muted">
            {post.time} · publicado por vos
          </div>
        </div>
        <div
          className={`flex items-center gap-[7px] rounded-full px-3 py-[6px] ${meta.badge}`}
        >
          <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
          <span className="text-[12px] font-extrabold tracking-[0.5px]">
            {meta.label}
          </span>
        </div>
      </div>

      <div className="mb-[10px] text-[12.5px] text-muted">
        Para: {post.audience}
      </div>

      <p className="text-[15.5px] leading-[1.55] text-body">{post.body}</p>

      {post.photo ? (
        <Link
          href="#"
          className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed border-photo-border bg-photo-bg text-photo-fg"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
          </svg>
          <span className="text-[13.5px]">{post.photo.title}</span>
        </Link>
      ) : null}

      <div className="mt-4 flex items-center gap-[18px] border-t border-line-soft pt-[14px]">
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-accent">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="#E0654A"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          {post.likes}
        </span>
        <Link
          href="#"
          className="flex items-center gap-[7px] text-[14px] font-bold text-muted-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
          </svg>
          {post.comments}
        </Link>
        <span className="flex-1" />
        <Link href="#" className="text-[14px] font-extrabold text-brand-strong">
          Editar
        </Link>
      </div>
    </div>
  );
}
