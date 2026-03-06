import { ru } from './ru';
import { en } from './en';
import { he } from './he';

const dictionaries = {
    ru,
    en,
    he
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof ru;

export const getDictionary = (locale: string): Dictionary => {
    if (locale in dictionaries) {
        return dictionaries[locale as Locale];
    }
    return dictionaries.ru; // Fallback
};
