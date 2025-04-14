import { decode as y } from "blurhash";
import * as U from "thumbhash";
function X(t, i = !1, o = 100, c = 100) {
  return i ? U.thumbHashToDataURL(N(t)) : O(t, o, c);
}
function N(t) {
  return new Uint8Array(
    atob(t).split("").map((i) => i.charCodeAt(0))
  );
}
function O(t, i = 100, o = 100) {
  if (!t)
    return;
  const c = y(t, i, o);
  return M(c, i, o);
}
function M(t, i, o) {
  const c = [...t].map((d) => String.fromCharCode(d)).join(""), l = B(i, o, c);
  return "data:image/png;base64," + (typeof Buffer < "u" ? Buffer.from(x(l)).toString("base64") : btoa(l));
}
function x(t) {
  const i = new Uint8Array(t.length);
  for (let o = 0; o < t.length; o++)
    i[o] = t.charCodeAt(o);
  return i;
}
function B(t, i, o) {
  const c = "x", l = [], T = `PNG\r

`, d = "\0";
  let C, s, h;
  for (C = 0; C < 256; C++) {
    for (s = C, h = 0; h < 8; h++)
      s & 1 ? s = 3988292384 ^ s >>> 1 : s = s >>> 1;
    l[C] = s;
  }
  function E(r) {
    let n = "", e, f;
    for (let g = 0; g < r.length; g += 65535)
      e = r.length - g, f = "", e <= 65535 ? f = "" : (e = 65535, f = "\0"), n += f + String.fromCharCode(e & 255, (e & 65280) >>> 8), n += String.fromCharCode(
        ~e & 255,
        (~e & 65280) >>> 8
      ), n += r.substring(g, g + e);
    return n;
  }
  function p(r) {
    let a = 65521, n = 1, e = 0;
    for (let f = 0; f < r.length; f++)
      n = (n + r.charCodeAt(f)) % a, e = (e + n) % a;
    return e << 16 | n;
  }
  function D(r, a) {
    let n = r, e;
    for (let f = 0; f < a.length; f++)
      e = a.charCodeAt(f), n = l[(n ^ e) & 255] ^ n >>> 8;
    return n;
  }
  function L(r) {
    return D(4294967295, r) ^ 4294967295;
  }
  function u(r) {
    return String.fromCharCode(
      (r & 4278190080) >>> 24,
      (r & 16711680) >>> 16,
      (r & 65280) >>> 8,
      r & 255
    );
  }
  function S(r, a, n) {
    const e = L(a + n);
    return u(r) + a + n + u(e);
  }
  function H(r, a) {
    const n = u(r) + u(a) + // bit depth
    "\b\0\0\0";
    return S(13, "IHDR", n);
  }
  const _ = S(0, "IEND", ""), I = H(t, i);
  let A = "", m;
  for (let r = 0; r < o.length; r += t * 4) {
    if (m = d, Array.isArray(o))
      for (let a = 0; a < t * 4; a++)
        m += String.fromCharCode(o[r + a] & 255);
    else
      m += o.substr(r, t * 4);
    A += m;
  }
  const R = c + E(A) + u(p(A)), b = S(
    R.length,
    "IDAT",
    R
  );
  return T + I + b + _;
}
export {
  X as decodePreview
};
