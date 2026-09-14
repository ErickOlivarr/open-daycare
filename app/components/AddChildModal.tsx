"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  allergiesToTags,
  avatarPalette,
  computeAge,
  parseBirthDate,
  rooms,
  slugifyName,
  type Child,
  type Room,
} from "@/app/lib/children";

type FieldErrors = { name?: string; birthDate?: string; room?: string };

interface AddChildModalProps {
  avatarIndex?: number;
  onAdd: (child: Child) => void;
  onClose: () => void;
}

export default function AddChildModal({
  avatarIndex = 0,
  onAdd,
  onClose,
}: AddChildModalProps) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [room, setRoom] = useState<Room>("Soles");
  const [allergies, setAllergies] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors: FieldErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Ingresá el nombre completo";
    }

    if (!birthDate.trim()) {
      nextErrors.birthDate = "Ingresá la fecha de nacimiento";
    } else if (!parseBirthDate(birthDate)) {
      nextErrors.birthDate = "Ingresá una fecha válida (dd/mm/aaaa)";
    }

    if (!rooms.includes(room)) {
      nextErrors.room = "Elegí una sala";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const parsedBirthDate = parseBirthDate(birthDate);
    if (!parsedBirthDate) {
      return;
    }

    const avatar = avatarPalette[avatarIndex % avatarPalette.length];
    const child: Child = {
      id: slugifyName(name),
      name: name.trim(),
      initial: name.trim().charAt(0).toUpperCase(),
      avatarBg: avatar.bg,
      avatarFg: avatar.fg,
      age: computeAge(parsedBirthDate),
      linkedParents: 0,
      tags: allergiesToTags(allergies),
    };

    onAdd(child);
    onClose();
  }

  const inputClass = (hasError?: boolean) =>
    `w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-ink outline-none placeholder:text-placeholder ${
      hasError ? "border-error" : "border-line"
    }`;

  const labelClass =
    "mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-muted-2";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[rgba(63,54,46,0.45)] p-6 sm:p-10"
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-child-title"
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[520px] overflow-hidden rounded-[24px] border border-line bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]"
      >
        <div className="flex items-center justify-between border-b border-line px-[26px] py-5">
          <button
            type="button"
            onClick={onClose}
            className="text-[15px] font-bold text-muted-2"
          >
            Cancelar
          </button>
          <span
            id="add-child-title"
            className="font-fredoka text-[18px] font-semibold text-ink"
          >
            Agregar niño
          </span>
          <button
            type="submit"
            className="text-[15px] font-extrabold text-brand"
          >
            Guardar
          </button>
        </div>

        <div className="px-[26px] py-6">
          <label className={labelClass} htmlFor="child-name">
            NOMBRE COMPLETO
          </label>
          <div className="mb-[18px]">
            <input
              id="child-name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Ej. Martina López"
              className={inputClass(Boolean(errors.name))}
            />
            {errors.name ? (
              <p className="mt-[6px] text-[12.5px] font-bold text-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="mb-[18px] flex gap-[14px]">
            <div className="flex-1">
              <label className={labelClass} htmlFor="child-birth-date">
                FECHA DE NACIMIENTO
              </label>
              <input
                id="child-birth-date"
                value={birthDate}
                onChange={(event) => {
                  setBirthDate(event.target.value);
                  setErrors((prev) => ({ ...prev, birthDate: undefined }));
                }}
                placeholder="dd/mm/aaaa"
                className={inputClass(Boolean(errors.birthDate))}
              />
              {errors.birthDate ? (
                <p className="mt-[6px] text-[12.5px] font-bold text-error">
                  {errors.birthDate}
                </p>
              ) : null}
            </div>
            <div className="flex-1">
              <label className={labelClass} htmlFor="child-room">
                SALA
              </label>
              <div className="relative">
                <select
                  id="child-room"
                  value={room}
                  onChange={(event) => {
                    setRoom(event.target.value as Room);
                    setErrors((prev) => ({ ...prev, room: undefined }));
                  }}
                  className={`${inputClass(Boolean(errors.room))} appearance-none pr-10 font-bold`}
                >
                  {rooms.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-photo-fg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              {errors.room ? (
                <p className="mt-[6px] text-[12.5px] font-bold text-error">
                  {errors.room}
                </p>
              ) : null}
            </div>
          </div>

          <label className={labelClass} htmlFor="child-allergies">
            ALERGIAS (ETIQUETAS)
          </label>
          <input
            id="child-allergies"
            value={allergies}
            onChange={(event) => setAllergies(event.target.value)}
            placeholder="Ej. Maní, Lactosa"
            className={`${inputClass()} mb-[18px]`}
          />

          <label className={labelClass} htmlFor="child-notes">
            NOTAS MÉDICAS
          </label>
          <textarea
            id="child-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Indicaciones, medicación, contactos…"
            className={`${inputClass()} min-h-[90px] resize-y leading-normal`}
          />
        </div>
      </form>
    </div>
  );
}
