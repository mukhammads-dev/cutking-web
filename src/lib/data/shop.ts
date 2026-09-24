export const SHOP = {
  name: "CutKing",
  tagline: "Barbershop",
  phone: "051-747-3820",
  address: "264 Haeundaehaebyeon-ro, Haeundae-gu, Busan",
  addressLine1: "2F, 264 Haeundaehaebyeon-ro",
  addressLine2: "Haeundae-gu, Busan 48099, South Korea",
  email: "hello@cutking.kr",
  mapQuery: "264 Haeundaehaebyeon-ro, Haeundae-gu, Busan, South Korea",
  nearest: "Haeundae Station (Line 2), Exit 3 — 4 min walk",
} as const;

export const workingHours: { day: string; hours: string }[] = [
  { day: "Monday — Friday", hours: "09:00 — 21:00" },
  { day: "Saturday", hours: "09:00 — 21:00" },
  { day: "Sunday", hours: "09:00 — 21:00" },
];

export interface Advantage {
  title: string;
  text: string;
  icon: "scissors" | "clock" | "star" | "shield";
}

export const advantages: Advantage[] = [
  {
    icon: "scissors",
    title: "Skilled barbers",
    text: "Every barber has a specialty — fades, classic cuts, beard or colour.",
  },
  {
    icon: "clock",
    title: "No waiting",
    text: "Book a time and sit down as soon as you arrive.",
  },
  {
    icon: "star",
    title: "Same result every time",
    text: "The cut you liked last time is the cut you get again.",
  },
  {
    icon: "shield",
    title: "Clean tools",
    text: "Tools are cleaned after every customer. No exceptions.",
  },
];
