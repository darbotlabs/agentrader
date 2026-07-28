/**
 * @evidence index-DTKnr6h1.js:237441
 * mangled: BN → generateBotName
 */
export function generateBotName() {
  const color = COLOR_WORDS[randomIndex(COLOR_WORDS)] || "";
  const word = NOUN_WORDS[randomIndex(NOUN_WORDS)] || "";
  return `${color} ${word}`;
}
