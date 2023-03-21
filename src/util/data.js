export default function dateConversion(time) {
  const date = new Date(time);
  return date.toLocaleString(navigator.language);
}
