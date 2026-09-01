import type { ChildDetail, ParentStatus } from "@/app/lib/children";

const STATUS_META: Record<
  ParentStatus,
  { badge: string; badgeLabel: string; subtitle: string }
> = {
  active: {
    badge: "bg-status-active-bg text-status-active-fg",
    badgeLabel: "ACTIVA",
    subtitle: "activa",
  },
  pending: {
    badge: "bg-status-pending-bg text-status-pending-fg",
    badgeLabel: "PENDIENTE",
    subtitle: "invitación enviada",
  },
};

export default function ChildProfile({ detail }: { detail: ChildDetail }) {
  const rows = [
    { label: "Fecha de nacimiento", value: detail.birthDate },
    { label: "Sala", value: detail.room },
    { label: "Ingreso", value: detail.entryDate },
  ].filter((row) => row.value !== "");

  return (
    <div className="flex flex-wrap items-start gap-[26px]">
      <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
        <div className="flex items-center gap-[18px]">
          <div
            className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full font-fredoka text-[34px] font-semibold"
            style={{ backgroundColor: detail.avatarBg, color: detail.avatarFg }}
          >
            {detail.initial}
          </div>
          <div className="flex-1">
            <h1 className="font-fredoka text-[28px] font-semibold text-ink">
              {detail.name}
            </h1>
            <p className="mt-[3px] text-[15px] text-muted-2">
              {detail.age} años · Sala {detail.room}
            </p>
          </div>
          <a
            href="#"
            className="rounded-[12px] border-[1.5px] border-line bg-surface px-4 py-[9px] text-[14px] font-bold text-muted-3"
          >
            Editar
          </a>
        </div>

        {detail.allergyNote ? (
          <div className="flex gap-[14px] rounded-[16px] bg-alert-bg px-[18px] py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-alert-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
            </div>
            <div>
              <div className="mb-[2px] text-[15px] font-extrabold text-alert-fg">
                Alergias y notas
              </div>
              <div className="text-[14.5px] leading-[1.5] text-alert-body">
                {detail.allergyNote}
              </div>
            </div>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-[16px] border border-line bg-surface">
          {rows.map((row, index) => (
            <div
              key={row.label}
              className={
                index < rows.length - 1
                  ? "flex justify-between border-b border-line-soft px-[18px] py-[15px]"
                  : "flex justify-between px-[18px] py-[15px]"
              }
            >
              <span className="text-[14.5px] text-muted-2">{row.label}</span>
              <span className="text-[14.5px] font-extrabold text-ink">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-[300px] shrink-0 flex-col gap-[14px]">
        <a
          href="#"
          className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-ink px-3 py-[13px] text-[15px] font-extrabold text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          Resumen del día
        </a>

        <div className="rounded-[16px] border border-line bg-surface px-[18px] py-4">
          <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-label">
            PADRES VINCULADOS
          </div>
          <div className="flex flex-col gap-[14px]">
            {detail.parents.length === 0 ? (
              <div className="text-[14.5px] text-muted">
                sin padres vinculados
              </div>
            ) : (
              detail.parents.map((parent) => {
                const meta = STATUS_META[parent.status];
                return (
                  <div key={parent.name} className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-fredoka text-[16px] font-semibold text-white"
                      style={{ backgroundColor: parent.avatarBg }}
                    >
                      {parent.initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14.5px] font-extrabold text-ink">
                        {parent.name}
                      </div>
                      <div className="text-[12.5px] text-muted">
                        {parent.role} · {meta.subtitle}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-[9px] py-1 text-[10.5px] font-extrabold ${meta.badge}`}
                    >
                      {meta.badgeLabel}
                    </span>
                  </div>
                );
              })
            )}

            <a href="#" className="flex items-center gap-3 pt-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-parent-link-border text-photo-fg">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <span className="text-[14.5px] font-extrabold text-brand-strong">
                Vincular otro padre
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
