export const serverApi: string = `${process.env.REACT_APP_API_URL}`;

export const buildImageUrl = (
  path: string | undefined | null,
  fallback = "/icons/no-image.svg"
): string => {
  if (!path) return fallback;
  if (path.startsWith("http") || path.startsWith("/icons/")) return path;
  return `${serverApi}/${path.replace(/^\/+/, "")}`;
};

export const Messages = {
  error1: "Something went wrong. Please try again.",
  error2: "Please log in first.",
  error3: "Please fill in all fields.",
  error4: "Choose a service first.",
  error5: "Only jpg, jpeg, png and webp images are allowed.",
  error6: "Please pick a date and time.",
  error7: "Please choose a barber.",
} as const;

export const WORKING_HOURS = {
  open: 9,
  close: 21,
  stepMinutes: 30,

  closedWeekdays: [] as number[],
} as const;

export const BOOKING_HORIZON_DAYS = 14;

export const PAGE_LIMIT = {
  services: 8,
  masters: 12,
  bookings: 5,
  home: 4,
} as const;
