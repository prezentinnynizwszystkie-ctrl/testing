
import { BeautyPlannerData } from './types';

export const INITIAL_DATA: BeautyPlannerData = {
  clientName: "Anna Nowak",
  cosmetologistName: "Mgr Dominika Sobańska-Miętuś",
  sections: [
    {
      id: 1,
      title: "WYWIAD Z KLIENTEM",
      fields: [
        { label: "Imię i Nazwisko", value: "Anna Nowak", key: "name" },
        { label: "Kontakt", value: "+48 502 221 562", key: "contact" },
        { label: "Oczekiwania i cele", value: "Redukcja przebarwień i wygładzenie drobnych zmarszczek wokół oczu.", key: "goals" },
        { label: "Wiek", value: "34 lata", key: "age" },
        { label: "Styl życia", value: "Praca biurowa, wysoki poziom stresu, ok. 6h snu.", key: "lifestyle" },
        { label: "Dieta i Suplementacja", value: "Dieta zrównoważona, 1.5l wody, witamina D3+K2.", key: "diet" },
        { label: "Używki", value: "Okazjonalnie alkohol, niepali.", key: "stimulants" },
        { label: "Alergie", value: "Brak znanych alergii kontaktowych.", key: "allergies" },
        { label: "Zabiegi medycyny est.", value: "Toksyna botulinowa (czoło) 6 miesięcy temu.", key: "prev_treatments" },
        { label: "Leczenie farmakologiczne", value: "Brak stałych leków.", key: "meds" },
        { label: "Ciąża / Karmienie", value: "Nie dotyczy.", key: "pregnancy" },
      ]
    },
    {
      id: 2,
      title: "STAN SKÓRY",
      fields: [
        { label: "Typ skóry", value: "Mieszana w kierunku tłustej w strefie T.", key: "skin_type" },
        { label: "Kondycja skóry", value: "Odwodniona, naruszona bariera hydrolipidowa.", key: "skin_condition" },
        { label: "Widoczne problemy", value: "Rozszerzone pory, zaskórniki otwarte na nosie.", key: "problems" },
        { label: "Okolica oczu", value: "Cienie pod oczami, utrata elastyczności.", key: "eyes" },
        { label: "Szyja i dekolt", value: "Stan dobry, brak widocznych zmian.", key: "neck" },
      ]
    },
    {
      id: 3,
      title: "DOTYCHCZASOWA PIELĘGNACJA",
      fields: [
        { label: "Kosmetyki rano", value: "Żel myjący, krem nawilżający popularnej marki.", key: "morning_routine" },
        { label: "Kosmetyki wieczorem", value: "Płyn micelarny, krem odżywczy.", key: "evening_routine" },
        { label: "Peelingi i Maski", value: "Peeling enzymatyczny raz w miesiącu.", key: "exfoliation" },
        { label: "Ochrona SPF", value: "Tylko latem przy ekspozycji na słońce.", key: "spf" },
        { label: "Konsultacja dermat.", value: "Nie", key: "dermatologist" },
      ]
    },
    {
      id: 4,
      title: "ZALECANA PIELĘGNACJA",
      fields: [
        { label: "Rano", value: "Oczyszczanie łagodne, Serum z Witaminą C, Krem z SPF 50.", key: "rec_morning" },
        { label: "Wieczorem", value: "Dwuetapowe oczyszczanie, Serum z Retinolem (2x/tydzień), Krem barierowy.", key: "rec_evening" },
        { label: "Dodatkowo", value: "Picie min. 2l wody, suplementacja Omega-3.", key: "rec_extra" },
      ]
    },
    {
      id: 5,
      title: "HISTORIA ZABIEGÓW",
      fields: [
        { label: "Rodzaj zabiegów", value: "Oczyszczanie wodorowe, peelingi chemiczne.", key: "hist_type" },
        { label: "Częstotliwość", value: "Raz na pół roku.", key: "hist_freq" },
        { label: "Efekty", value: "Chwilowe wygładzenie, brak długofalowej poprawy.", key: "hist_results" },
        { label: "Reakcje niepożądane", value: "Zaczerwienienie utrzymujące się do 24h.", key: "hist_reactions" },
      ]
    },
    {
      id: 6,
      title: "PLAN TERAPEUTYCZNY",
      fields: [
        { label: "Planowany czas", value: "6 miesięcy (6-8 sesji)", key: "plan_duration" },
        { label: "Zabieg 1", value: "Seria 3x Dermapen (odstęp 4 tyg.)", key: "plan_t1" },
        { label: "Zabieg 2", value: "Mezoterapia igłowa pod oczy (2 sesje)", key: "plan_t2" },
        { label: "Zabieg 3", value: "Peeling kwasowy (rozjaśnianie)", key: "plan_t3" },
        { label: "Cel Terapii", value: "Stymulacja kolagenu, wyrównanie kolorytu.", key: "plan_goal" },
      ]
    },
    {
      id: 7,
      title: "PRZECIWWSKAZANIA",
      fields: [
        { label: "Uwagi", value: "Brak aktywnych stanów zapalnych, brak świeżej opalenizny.", key: "contraindications" },
      ]
    }
  ]
};

export const QUOTES = [
  "Piękno zaczyna się w momencie, kiedy decydujesz się być sobą. Dziękuję, że jesteś z nami.",
  "Twoja skóra to Twoja historia. Zadbajmy o to, by była pełna blasku.",
  "Luksus to czas, który poświęcasz dla siebie.",
  "Prawdziwe piękno to pewność siebie emanująca z wewnątrz."
];
