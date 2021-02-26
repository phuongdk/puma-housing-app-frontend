import {API_BASE_URL, IMAGES_BASE_URL} from "@env";
import { LanguageModel } from "../models";

export const API_URL = API_BASE_URL;
export const IMAGES_URL = IMAGES_BASE_URL;

export const SEARCH_MIN_PRICE = 1;
export const SEARCH_MAX_PRICE = 500000;
export const SEARCH_MIN_SIZE = 1;
export const SEARCH_MAX_SIZE = 1000;

export const ADDITIONAL_FEATURES_SEPARATOR_CHARACTER = ",";

export const LANGUAGES: LanguageModel[] = [
  {
    lang: "en",
    isRTL: false,
  },
  {
    lang: "vi",
    isRTL: false,
  },
  {
    lang: "ar",
    isRTL: true,
  },
];

export const getLang = (lang: string) => {
  const foundLang = LANGUAGES.find((a) => a.lang === lang);
  if (foundLang) {
    return foundLang;
  }
  return {
    lang: "en",
    isRTL: false,
  };
};
