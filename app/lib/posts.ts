export type PostType = "achievement" | "activity" | "announcement";

export interface Post {
  id: string;
  type: PostType;
  author: string;
  initial: string;
  avatarBg: string;
  time: string;
  audience: string;
  body: string;
  photo?: { title: string };
  likes: number;
  comments: number;
}

export const posts: Post[] = [
  {
    id: "logro-orinal",
    type: "achievement",
    author: "Mateo",
    initial: "M",
    avatarBg: "#A9D9E8",
    time: "14:20",
    audience: "familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "actividad-temperas",
    type: "activity",
    author: "Mateo",
    initial: "M",
    avatarBg: "#A9D9E8",
    time: "09:40",
    audience: "familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: { title: "Foto · pintando con témperas" },
    likes: 5,
    comments: 2,
  },
  {
    id: "anuncio-parque",
    type: "announcement",
    author: "Anuncio general",
    initial: "",
    avatarBg: "#CCD8F4",
    time: "07:50",
    audience: "toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];
