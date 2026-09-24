export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "Do I need an account to book?",
    answer:
      "Yes. Your booking is saved to your account, so sign up first. It takes about a minute.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Yes. Cancel a pending booking any time from “My bookings”. For a confirmed booking, please call us.",
  },
  {
    question: "What if I'm late?",
    answer:
      "Up to 15 minutes is usually fine. After that your seat may go to the next customer, so please call us.",
  },
  {
    question: "How do I pay?",
    answer:
      "You pay at the shop after your haircut. Cash and card both work.",
  },
  {
    question: "Can I book more than one service?",
    answer:
      "Yes. Add as many as you want — they become one booking and we add up the time for you.",
  },
];

export const terms: { title: string; body: string }[] = [
  {
    title: "Booking terms",
    body: "Once confirmed, we hold your seat at that time. If you cannot come, please cancel at least 2 hours before.",
  },
  {
    title: "If you are late",
    body: "More than 15 minutes late and your barber may move to the next customer. The booking can then be cancelled.",
  },
  {
    title: "Your details",
    body: "We use your phone number only for booking messages. We never share it with anyone else.",
  },
];
