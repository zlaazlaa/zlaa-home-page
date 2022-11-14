(function () {
  "use strict";
  function f(a, b, e) {
    a.addEventListener && a.addEventListener(b, e, !1);
  } /* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/
  function g(a, b, e) {
    if (Array.isArray(b))
      for (var c = 0; c < b.length; c++) g(a, String(b[c]), e);
    else
      null != b &&
        e.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))));
  }
  function l(a = document) {
    return a.createElement("img");
  }
  function m(a, b, e = null, c = !1) {
    n(a, b, e, c);
  }
  function n(a, b, e, c) {
    a.google_image_requests || (a.google_image_requests = []);
    const d = l(a.document);
    if (e || c) {
      const k = (h) => {
        e && e(h);
        if (c) {
          h = a.google_image_requests;
          const v = Array.prototype.indexOf.call(h, d, void 0);
          0 <= v && Array.prototype.splice.call(h, v, 1);
        }
        d.removeEventListener && d.removeEventListener("load", k, !1);
        d.removeEventListener && d.removeEventListener("error", k, !1);
      };
      f(d, "load", k);
      f(d, "error", k);
    }
    d.src = b;
    a.google_image_requests.push(d);
  }
  function p(a = null) {
    return a && "22" === a.getAttribute("data-jc")
      ? a
      : document.querySelector('[data-jc="22"]');
  }
  var q = document,
    r = window;
  function t(a) {
    return "undefined" !== typeof a;
  }
  function u(a) {
    f(q, a.h, () => {
      if (q[a.g]) a.i && ((a.i = !1), (a.j = Date.now()), w(a, 0));
      else {
        if (-1 !== a.j) {
          const b = Date.now() - a.j;
          0 < b && ((a.j = -1), w(a, 1, b));
        }
        w(a, 3);
      }
    });
  }
  function x(a) {
    f(r, "click", (b) => {
      a.handleClick(b);
    });
  }
  function w(a, b, e = 0) {
    var c = { gqid: a.m, qqid: a.o };
    0 === b && (c["return"] = 0);
    1 === b && ((c["return"] = 1), (c.timeDelta = e));
    2 === b && (c.bgload = 1);
    3 === b && (c.fg = 1);
    b = [];
    for (var d in c) g(d, c[d], b);
    m(r, a.l + "&label=window_focus&" + b.join("&"));
    if (!(0.01 < Math.random())) {
      a =
        (a = p(document.currentScript)) &&
        "true" === a.getAttribute("data-jc-rcd")
          ? "pagead2.googlesyndication-cn.com"
          : "pagead2.googlesyndication.com";
      c =
        ((c = p(document.currentScript)) &&
          c.getAttribute("data-jc-version")) ||
        "unknown";
      a = `https://${a}/pagead/gen_204?id=jca&jc=${22}&version=${c}&sample=${0.01}`;
      c = window;
      if ((d = c.navigator))
        (d = c.navigator.userAgent),
          (d = /Chrome/.test(d) && !/Edge/.test(d) ? !0 : !1);
      d && c.navigator.sendBeacon
        ? c.navigator.sendBeacon(a)
        : m(c, a, void 0, !1);
    }
  }
  var z = class {
    constructor() {
      var a = y["gws-id"],
        b = y["qem-id"];
      this.l = y.url;
      this.m = a;
      this.o = b;
      this.i = !1;
      a = t(q.hidden)
        ? { g: "hidden", h: "visibilitychange" }
        : t(q.mozHidden)
        ? { g: "mozHidden", h: "mozvisibilitychange" }
        : t(q.msHidden)
        ? { g: "msHidden", h: "msvisibilitychange" }
        : t(q.webkitHidden)
        ? { g: "webkitHidden", h: "webkitvisibilitychange" }
        : { g: "hidden", h: "visibilitychange" };
      this.g = a.g;
      this.h = a.h;
      this.j = -1;
      q[this.g] && w(this, 2);
      u(this);
      x(this);
    }
    handleClick() {
      this.i = !0;
      r.setTimeout(() => {
        this.i = !1;
      }, 5e3);
    }
  };
  const A = p(document.currentScript);
  if (null == A) throw Error("JSC not found 22");
  var y;
  const B = {},
    C = A.attributes;
  for (let a = C.length - 1; 0 <= a; a--) {
    const b = C[a].name;
    0 === b.indexOf("data-jcp-") && (B[b.substring(9)] = C[a].value);
  }
  y = B;
  window.window_focus_for_click = new z();
}.call(this));
