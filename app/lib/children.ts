export type TagVariant = "allergy" | "link";
export type ParentStatus = "active" | "pending";

export interface ChildTag {
  label: string;
  variant: TagVariant;
}

export interface Child {
  id: string;
  name: string;
  initial: string;
  avatarBg: string;
  avatarFg: string;
  age: number;
  linkedParents: number;
  tags: ChildTag[];
}

export interface Parent {
  name: string;
  initial: string;
  avatarBg: string;
  role: string;
  status: ParentStatus;
}

export interface ChildDetail extends Child {
  birthDate: string;
  room: string;
  entryDate: string;
  allergyNote: string;
  parents: Parent[];
}

export const rooms = ["Soles", "Lunas", "Estrellas"] as const;
export type Room = (typeof rooms)[number];

export const avatarPalette: { bg: string; fg: string }[] = [
  { bg: "#A9D9E8", fg: "#1F7A93" },
  { bg: "#F4B8CC", fg: "#C44A7A" },
  { bg: "#B9DEC4", fg: "#3E8B62" },
  { bg: "#F4DC8E", fg: "#9A7B1E" },
  { bg: "#C9B6E8", fg: "#7B5FC0" },
];

export const children: Child[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    initial: "M",
    avatarBg: "#A9D9E8",
    avatarFg: "#1F7A93",
    age: 3,
    linkedParents: 2,
    tags: [{ label: "MANÍ", variant: "allergy" }],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    initial: "S",
    avatarBg: "#F4B8CC",
    avatarFg: "#C44A7A",
    age: 2,
    linkedParents: 1,
    tags: [],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    initial: "B",
    avatarBg: "#B9DEC4",
    avatarFg: "#3E8B62",
    age: 3,
    linkedParents: 2,
    tags: [],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    initial: "V",
    avatarBg: "#F4DC8E",
    avatarFg: "#9A7B1E",
    age: 2,
    linkedParents: 0,
    tags: [{ label: "VINCULAR", variant: "link" }],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    initial: "T",
    avatarBg: "#C9B6E8",
    avatarFg: "#7B5FC0",
    age: 3,
    linkedParents: 1,
    tags: [{ label: "LACTOSA", variant: "allergy" }],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    initial: "E",
    avatarBg: "#F4B8CC",
    avatarFg: "#C44A7A",
    age: 2,
    linkedParents: 1,
    tags: [],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    initial: "L",
    avatarBg: "#A9D9E8",
    avatarFg: "#1F7A93",
    age: 3,
    linkedParents: 1,
    tags: [],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    initial: "O",
    avatarBg: "#B9DEC4",
    avatarFg: "#3E8B62",
    age: 2,
    linkedParents: 1,
    tags: [],
  },
];

export const childDetails: Record<string, ChildDetail> = {
  "mateo-fernandez": {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    initial: "M",
    avatarBg: "#A9D9E8",
    avatarFg: "#1F7A93",
    age: 3,
    linkedParents: 2,
    tags: [{ label: "MANÍ", variant: "allergy" }],
    birthDate: "12 mar 2022",
    room: "Soles",
    entryDate: "feb 2025",
    allergyNote:
      "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parents: [
      {
        name: "Lucía Fernández",
        initial: "L",
        avatarBg: "#C9B6E8",
        role: "Mamá",
        status: "active",
      },
      {
        name: "Diego Fernández",
        initial: "D",
        avatarBg: "#A9C7E8",
        role: "Papá",
        status: "pending",
      },
    ],
  },
};

export function getChildDetail(id: string): ChildDetail {
  const detail = childDetails[id];
  if (detail) {
    return detail;
  }

  const base = children.find((child) => child.id === id);

  return {
    id: base?.id ?? id,
    name: base?.name ?? "Niño",
    initial: base?.initial ?? "N",
    avatarBg: base?.avatarBg ?? "#A9D9E8",
    avatarFg: base?.avatarFg ?? "#1F7A93",
    age: base?.age ?? 0,
    linkedParents: base?.linkedParents ?? 0,
    tags: base?.tags ?? [],
    birthDate: "",
    room: "Soles",
    entryDate: "",
    allergyNote: "",
    parents: [],
  };
}

export function parseBirthDate(value: string): Date | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) {
    return null;
  }

  return date;
}

export function computeAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

export function allergiesToTags(allergies: string): ChildTag[] {
  return allergies
    .split(",")
    .map((label) => label.trim())
    .filter((label) => label.length > 0)
    .map((label) => ({ label: label.toUpperCase(), variant: "allergy" as const }));
}

export function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
