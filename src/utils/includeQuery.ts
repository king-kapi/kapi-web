import b64encode from "@/src/utils/b64encode";

export default function includeQuery(fields: string[]) {
  const out: {
    [key: string]: boolean
  } = {};
  fields.forEach(field => out[field] = true);
  return b64encode(out);
}