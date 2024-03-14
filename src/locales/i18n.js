import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const locales = {
    en: 'English',
    vi: 'Tiếng Việt'
}

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        //goi la namespace
        translation: {
            academic: "A. Rank",
            army: "In army",
            pgs: "Assoc.",
        },
    },
    vi: {
        translation: {
            academic: "Học hàm",
            army: "Tham gia quân đội",
            pgs: "Phó giáo sư",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    }
})