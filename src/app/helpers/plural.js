const getPluralize = (word, count) => (count > 1 ? `${word}s` : word);

export default getPluralize;
