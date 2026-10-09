import { LangCode } from "../i18n/dictionary";

export interface ShopEvent {
  id: string;
  badge: string;
  title: string;
  text: string;
  when: string;
  code: string;
}

type FeaturedEvent = ShopEvent & { image: string };

const featuredEventByLang: Record<LangCode, FeaturedEvent> = {
  en: {
    id: "first",
    image: "/img/offer-featured.jpg",
    badge: "−15%",
    title: "First cut",
    text: "Your first visit with us costs less. Nothing to sign up for, nothing to print.",
    when: "New customers · one time",
    code: "FIRST15",
  },
  ko: {
    id: "first",
    image: "/img/offer-featured.jpg",
    badge: "−15%",
    title: "첫 방문 할인",
    text: "첫 방문은 더 저렴합니다. 가입할 필요도, 출력할 것도 없습니다.",
    when: "신규 고객 · 1회 한정",
    code: "FIRST15",
  },
  uz: {
    id: "first",
    image: "/img/offer-featured.jpg",
    badge: "−15%",
    title: "Birinchi tashrif",
    text: "Bizga birinchi tashrifingiz arzonroq turadi. Ro'yxatdan o'tish ham, chop etish ham kerak emas.",
    when: "Yangi mijozlar · bir martalik",
    code: "FIRST15",
  },
};

const shopEventsByLang: Record<LangCode, ShopEvent[]> = {
  en: [
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
  ],
  ko: [
    {
      id: "morning",
      badge: "−20%",
      title: "모닝 요금",
      text: "평일 아침은 한산해서 더 저렴합니다.",
      when: "월 — 금, 09:00 — 12:00",
      code: "MORNING",
    },
    {
      id: "student",
      badge: "−10%",
      title: "학생 요금",
      text: "카운터에서 학생증을 보여주시면 할인해 드립니다.",
      when: "매일",
      code: "STUDENT",
    },
    {
      id: "friend",
      badge: "1+1",
      title: "친구와 함께",
      text: "두 자리를 함께 예약하면 두 번째 컷은 반값입니다.",
      when: "한 번의 예약, 두 자리",
      code: "FRIEND",
    },
  ],
  uz: [
    {
      id: "morning",
      badge: "−20%",
      title: "Ertalabki tarif",
      text: "Ish kunlari ertalab tinchroq, shuning uchun arzonroq.",
      when: "Dush — Jum, 09:00 — 12:00",
      code: "MORNING",
    },
    {
      id: "student",
      badge: "−10%",
      title: "Talaba tarifi",
      text: "Kassada talaba bilet(studentlik)ni ko'rsating, chegirma qilamiz.",
      when: "Har kuni",
      code: "STUDENT",
    },
    {
      id: "friend",
      badge: "1+1",
      title: "Do'stingizni olib keling",
      text: "Ikki o'rindiqni birga band qiling, ikkinchisi yarim narxda.",
      when: "Bir band, ikki o'rindiq",
      code: "FRIEND",
    },
  ],
};

export interface ShopStat {
  id: string;
  value: string;
  label: string;
}

const staticStatsByLang: Record<LangCode, ShopStat[]> = {
  en: [
    { id: "years", value: "6", label: "Years open" },
    { id: "regulars", value: "300+", label: "Regulars" },
  ],
  ko: [
    { id: "years", value: "6", label: "운영 연수" },
    { id: "regulars", value: "300+", label: "단골 고객" },
  ],
  uz: [
    { id: "years", value: "6", label: "Ish yili" },
    { id: "regulars", value: "300+", label: "Doimiy mijozlar" },
  ],
};

export const getFeaturedEvent = (lang: LangCode): FeaturedEvent =>
  featuredEventByLang[lang] ?? featuredEventByLang.en;

export const getShopEvents = (lang: LangCode): ShopEvent[] =>
  shopEventsByLang[lang] ?? shopEventsByLang.en;

export const getStaticStats = (lang: LangCode): ShopStat[] =>
  staticStatsByLang[lang] ?? staticStatsByLang.en;
