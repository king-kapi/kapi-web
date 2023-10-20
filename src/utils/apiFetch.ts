const API_HOST = "";

const BASE_OPTIONS: RequestInit = {}

export default function apiFetch(path: string, options: RequestInit = {}, autoStringify = true) {
  const merged_options = {
    ...BASE_OPTIONS,
    ...options
  }

  if (merged_options.body && autoStringify) {
    merged_options.body = JSON.stringify(merged_options.body)
  }

  return fetch(API_HOST + path, options);
}