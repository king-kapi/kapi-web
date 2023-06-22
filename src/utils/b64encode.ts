export default function b64encode(o: object) {
  return btoa(JSON.stringify(o));
}