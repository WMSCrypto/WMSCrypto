import ru from './ru';

const { t, setLang }= (() => {
    let current = 'en';
    const langs = {ru};
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