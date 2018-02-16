import ru from './ru';
import en from './en'

const { t, setLang }= (() => {
    let current = 'en';
    const langs = {en, ru};
    return {
        setLang: (lang) => { current = lang },
        t: (s) => {
            return langs[current] ? (langs[current][s] || s) : s
        }
    }
})();

export {
    t,
    setLang
}