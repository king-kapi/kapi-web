// See PR #24 for the code written by Tommy

type Result<T, E extends Error = Error> = // constraint E to be some extension of Error
  | { ok: true; value: T }
  | { ok: false; error: E };

export const Ok = <T>(val: T): { ok: true; value: T } => ({ ok: true, value: val });
export const Err = <E extends Error>(err: E): { ok: false; error: E } => ({
  ok: false,
  error: err
});

export default Result;