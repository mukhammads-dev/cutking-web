export interface ShopEvent {
  id: string;
  badge: string;
  title: string;
  text: string;
  when: string;
  code: string;
}

export const featuredEvent: ShopEvent & { image: string } = {
  id: "first",
  image: "/img/offer-featured.jpg",
  badge: "−15%",
  title: "First cut",
  text: "Your first visit with us costs less. Nothing to sign up for, nothing to print.",
  when: "New customers · one time",
  code: "FIRST15",
};

export const shopEvents: ShopEvent[] = [
  {
    id: "morning",
    badge: "−20%",
    title: "Morning rate",
    text: "Weekday mornings are quieter, so they cost less.",
    when: "Mon — Fri, 09:00 — 12:00",
    code: "MORNING",
  },
  {
    id: "student",
    badge: "−10%",
    title: "Student rate",
    text: "Show a student card at the counter and we take it off.",
    when: "Any day",
    code: "STUDENT",
  },
  {
    id: "friend",
    badge: "1+1",
    title: "Bring a friend",
    text: "Book two chairs together and the second cut is half price.",
    when: "One booking, two seats",
    code: "FRIEND",
  },
];

export interface ShopStat {
  id: string;
  value: string;
  label: string;
}

export const staticStats: ShopStat[] = [
  { id: "years", value: "6", label: "Years open" },
  { id: "regulars", value: "300+", label: "Regulars" },
];
