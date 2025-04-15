"use client";
import { jsx as f, jsxs as j, Fragment as z } from "react/jsx-runtime";
import { forwardRef as D, useRef as U, useState as l, useEffect as F } from "react";
import { Application as H } from "@splinetool/runtime";
import I from "./ParentSize.js";
const C = D(
  ({
    scene: s,
    style: u,
    onSplineMouseDown: p,
    onSplineMouseUp: b,
    onSplineMouseHover: d,
    onSplineKeyDown: v,
    onSplineKeyUp: w,
    onSplineStart: y,
    onSplineLookAt: h,
    onSplineFollow: S,
    onSplineScroll: k,
    onLoad: r,
    renderOnDemand: E = !0,
    children: g,
    ...x
  }, A) => {
    const o = U(null), [c, a] = l(!0), [i, R] = l();
    if (i)
      throw i;
    return F(() => {
      a(!0);
      let e;
      const m = [
        {
          name: "mouseDown",
          cb: p
        },
        {
          name: "mouseUp",
          cb: b
        },
        {
          name: "mouseHover",
          cb: d
        },
        {
          name: "keyDown",
          cb: v
        },
        {
          name: "keyUp",
          cb: w
        },
        {
          name: "start",
          cb: y
        },
        {
          name: "lookAt",
          cb: h
        },
        {
          name: "follow",
          cb: S
        },
        {
          name: "scroll",
          cb: k
        }
      ];
      if (o.current) {
        e = new H(o.current, { renderOnDemand: E });
        async function t() {
          await e.load(s);
          for (let n of m)
            n.cb && e.addEventListener(n.name, n.cb);
          a(!1), r == null || r(e);
        }
        t().catch((n) => {
          R(n);
        });
      }
      return () => {
        for (let t of m)
          t.cb && e.removeEventListener(t.name, t.cb);
        e.dispose();
      };
    }, [s]), /* @__PURE__ */ f(
      I,
      {
        ref: A,
        parentSizeStyles: { overflow: "hidden", ...u },
        debounceTime: 50,
        ...x,
        children: () => /* @__PURE__ */ j(z, { children: [
          c && g,
          /* @__PURE__ */ f(
            "canvas",
            {
              ref: o,
              style: {
                display: c ? "none" : "block"
              }
            }
          )
        ] })
      }
    );
  }
);
export {
  C as default
};
