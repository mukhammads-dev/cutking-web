import { LangCode } from "../i18n/dictionary";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TermItem {
  title: string;
  body: string;
}

const faqByLang: Record<LangCode, FaqItem[]> = {
  en: [
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
  ],
  ko: [
    {
      question: "예약하려면 계정이 필요한가요?",
      answer:
        "네. 예약은 계정에 저장되므로 먼저 가입해 주세요. 1분 정도 걸립니다.",
    },
    {
      question: "예약을 취소할 수 있나요?",
      answer:
        "네. 대기중인 예약은 “내 예약”에서 언제든지 취소할 수 있습니다. 확정된 예약은 전화로 문의해 주세요.",
    },
    {
      question: "늦으면 어떻게 되나요?",
      answer:
        "보통 15분까지는 괜찮습니다. 그 이후에는 다음 고객에게 자리가 넘어갈 수 있으니 전화로 알려주세요.",
    },
    {
      question: "결제는 어떻게 하나요?",
      answer: "헤어컷 후 매장에서 결제합니다. 현금과 카드 모두 가능합니다.",
    },
    {
      question: "여러 서비스를 함께 예약할 수 있나요?",
      answer:
        "네. 원하는 만큼 추가하세요 — 하나의 예약으로 합쳐지고 시간은 자동으로 합산됩니다.",
    },
  ],
  uz: [
    {
      question: "Band qilish uchun hisob kerakmi?",
      answer:
        "Ha. Bandingiz hisobingizga saqlanadi, shuning uchun avval ro'yxatdan o'ting. Bu taxminan bir daqiqa vaqt oladi.",
    },
    {
      question: "Bandni bekor qila olamanmi?",
      answer:
        "Ha. Kutilayotgan bandni istalgan vaqtda “Mening bandlarim”dan bekor qilishingiz mumkin. Tasdiqlangan band uchun bizga qo'ng'iroq qiling.",
    },
    {
      question: "Agar kechiksam nima bo'ladi?",
      answer:
        "Odatda 15 daqiqagacha muammo emas. Undan keyin joyingiz keyingi mijozga berilishi mumkin, shuning uchun bizga qo'ng'iroq qiling.",
    },
    {
      question: "To'lovni qanday amalga oshiraman?",
      answer:
        "To'lovni soch oldirgandan keyin salonda qilasiz. Naqd pul va karta — ikkisi ham mumkin.",
    },
    {
      question: "Bir nechta xizmatni birga band qila olamanmi?",
      answer:
        "Ha. Xohlagancha qo'shing — ular bitta bandga birlashadi va vaqtni o'zimiz qo'shib hisoblaymiz.",
    },
  ],
};

const termsByLang: Record<LangCode, TermItem[]> = {
  en: [
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
  ],
  ko: [
    {
      title: "예약 약관",
      body: "예약이 확정되면 해당 시간에 자리를 비워 둡니다. 오실 수 없다면 최소 2시간 전에 취소해 주세요.",
    },
    {
      title: "지연 도착 시",
      body: "15분 이상 늦으면 바버가 다음 고객으로 넘어갈 수 있습니다. 이 경우 예약이 취소될 수 있습니다.",
    },
    {
      title: "회원 정보",
      body: "전화번호는 예약 안내 메시지에만 사용됩니다. 다른 누구와도 공유하지 않습니다.",
    },
  ],
  uz: [
    {
      title: "Band qilish shartlari",
      body: "Tasdiqlangandan so'ng, o'rningizni shu vaqtga saqlab qo'yamiz. Kela olmasangiz, kamida 2 soat oldin bekor qiling.",
    },
    {
      title: "Kechikkan bo'lsangiz",
      body: "15 daqiqadan ko'proq kechikish bo'lsa, sartaroshingiz keyingi mijozga o'tishi mumkin. Shunda band bekor qilinishi mumkin.",
    },
    {
      title: "Sizning ma'lumotlaringiz",
      body: "Telefon raqamingizdan faqat band qilish xabarlari uchun foydalanamiz. Uni hech kimga bermaymiz.",
    },
  ],
};

export const getFaq = (lang: LangCode): FaqItem[] => faqByLang[lang] ?? faqByLang.en;
export const getTerms = (lang: LangCode): TermItem[] => termsByLang[lang] ?? termsByLang.en;
