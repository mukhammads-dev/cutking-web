export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-US").format(Math.round(value || 0));

export const formatPrice = (value: number): string =>
  `₩${formatNumber(value)}`;

export const initials = (name?: string): string =>
  (name || "?").trim().charAt(0).toUpperCase();

export const humanizeEnum = (value?: string): string => {
  if (!value) return "—";
  const lower = value.replace(/_/g, " ").toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export const truncate = (text: string | undefined, max = 90): string => {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
};
