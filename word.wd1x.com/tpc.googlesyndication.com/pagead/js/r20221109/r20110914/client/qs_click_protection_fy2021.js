(function () {
  /* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/
  "use strict";
  var n = this || self;
  function aa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function fa(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var e = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(e, d);
        return a.apply(b, e);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function q(a, b, c) {
    Function.prototype.bind &&
    -1 != Function.prototype.bind.toString().indexOf("native code")
      ? (q = aa)
      : (q = fa);
    return q.apply(null, arguments);
  }
  function ha(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.R = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.S = function (d, e, f) {
      for (
        var g = Array(arguments.length - 2), h = 2;
        h < arguments.length;
        h++
      )
        g[h - 2] = arguments[h];
      return b.prototype[e].apply(d, g);
    };
  }
  function r(a, b) {
    Array.prototype.forEach.call(a, b, void 0);
  }
  var ia = {},
    t = null;
  function ja(a) {
    var b;
    void 0 === b && (b = 0);
    if (!t) {
      t = {};
      for (
        var c =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
              ""
            ),
          d = ["+/=", "+/", "-_=", "-_.", "-_"],
          e = 0;
        5 > e;
        e++
      ) {
        var f = c.concat(d[e].split(""));
        ia[e] = f;
        for (var g = 0; g < f.length; g++) {
          var h = f[g];
          void 0 === t[h] && (t[h] = g);
        }
      }
    }
    b = ia[b];
    c = Array(Math.floor(a.length / 3));
    d = b[64] || "";
    for (e = f = 0; f < a.length - 2; f += 3) {
      var l = a[f],
        k = a[f + 1];
      h = a[f + 2];
      g = b[l >> 2];
      l = b[((l & 3) << 4) | (k >> 4)];
      k = b[((k & 15) << 2) | (h >> 6)];
      h = b[h & 63];
      c[e++] = g + l + k + h;
    }
    g = 0;
    h = d;
    switch (a.length - f) {
      case 2:
        (g = a[f + 1]), (h = b[(g & 15) << 2] || d);
      case 1:
        (a = a[f]), (c[e] = b[a >> 2] + b[((a & 3) << 4) | (g >> 4)] + h + d);
    }
    return c.join("");
  }
  var ka = "undefined" !== typeof Uint8Array,
    la = {};
  let ma;
  var na = class {
    constructor(a) {
      if (la !== la) throw Error("illegal external caller");
      this.N = a;
      if (null != a && 0 === a.length)
        throw Error("ByteString should be constructed with non-empty values");
    }
  };
  const u = Symbol();
  function v(a, b) {
    if (u) return (a[u] |= b);
    if (void 0 !== a.s) return (a.s |= b);
    Object.defineProperties(a, {
      s: { value: b, configurable: !0, writable: !0, enumerable: !1 },
    });
    return b;
  }
  function w(a) {
    let b;
    u ? (b = a[u]) : (b = a.s);
    return null == b ? 0 : b;
  }
  function x(a, b) {
    u
      ? (a[u] = b)
      : void 0 !== a.s
      ? (a.s = b)
      : Object.defineProperties(a, {
          s: { value: b, configurable: !0, writable: !0, enumerable: !1 },
        });
  }
  function oa(a) {
    v(a, 1);
    return a;
  }
  function y(a) {
    return !!(w(a) & 2);
  }
  function sa(a) {
    v(a, 16);
    return a;
  }
  function ta(a, b) {
    x(b, (w(a) | 18) & -41);
  }
  var A = {};
  function B(a) {
    return (
      null !== a &&
      "object" === typeof a &&
      !Array.isArray(a) &&
      a.constructor === Object
    );
  }
  var C;
  const ua = [];
  x(ua, 23);
  C = Object.freeze(ua);
  function va(a) {
    if (y(a.j)) throw Error("Cannot mutate an immutable Message");
  }
  function wa(a) {
    var b = a.length;
    (b = b ? a[b - 1] : void 0) && B(b) ? (b.g = 1) : a.push({ g: 1 });
  }
  function xa(a, b, c = !1) {
    if (Array.isArray(a)) return new b(c ? sa(a) : a);
  }
  let D;
  function ya(a) {
    switch (typeof a) {
      case "number":
        return isFinite(a) ? a : String(a);
      case "object":
        if (a)
          if (Array.isArray(a)) {
            if (0 !== (w(a) & 128))
              return (a = Array.prototype.slice.call(a)), wa(a), a;
          } else {
            if (ka && null != a && a instanceof Uint8Array) return ja(a);
            if (a instanceof na) {
              const b = a.N;
              return null == b ? "" : "string" === typeof b ? b : (a.N = ja(b));
            }
          }
    }
    return a;
  }
  function za(a, b, c, d) {
    if (null != a) {
      if (Array.isArray(a)) a = Aa(a, b, c, void 0 !== d);
      else if (B(a)) {
        const e = {};
        for (let f in a) e[f] = za(a[f], b, c, d);
        a = e;
      } else a = b(a, d);
      return a;
    }
  }
  function Aa(a, b, c, d) {
    d = d ? !!(w(a) & 16) : void 0;
    const e = Array.prototype.slice.call(a);
    for (let f = 0; f < e.length; f++) e[f] = za(e[f], b, c, d);
    c(a, e);
    return e;
  }
  function Ba(a) {
    return a.K === A ? a.toJSON() : ya(a);
  }
  function Ca(a, b) {
    0 !== (w(a) & 128) && wa(b);
  }
  function Da(a) {
    return a.h || (a.h = a.j[a.i + a.A] = {});
  }
  function E(a, b, c) {
    return -1 === b
      ? null
      : b >= a.i
      ? a.h
        ? a.h[b]
        : void 0
      : c && a.h && ((c = a.h[b]), null != c)
      ? c
      : a.j[b + a.A];
  }
  function F(a, b, c, d) {
    a.l && (a.l = void 0);
    b >= a.i || d
      ? (Da(a)[b] = c)
      : ((a.j[b + a.A] = c), (a = a.h) && b in a && delete a[b]);
  }
  function Ea(a, b) {
    a = E(a, 1);
    Array.isArray(a) || (a = C);
    const c = w(a);
    c & 1 || oa(a);
    !b || c & 2 || v(a, 2);
    return a;
  }
  function H(a, b) {
    a = E(a, b);
    return null == a ? 1 : a;
  }
  function Fa(a) {
    var b = E(a, 1, !1);
    {
      var c = Ga;
      let e = !1;
      var d =
        null == b ||
        "object" !== typeof b ||
        (e = Array.isArray(b)) ||
        b.K !== A
          ? e
            ? new c(b)
            : void 0
          : b;
    }
    d !== b && null != d && (F(a, 1, d, !1), v(d.j, w(a.j) & -33));
    b = d;
    if (null == b) return b;
    y(a.j) || ((d = Ha(b)), d !== b && ((b = d), F(a, 1, b, !1)));
    return b;
  }
  function Ia(a) {
    var b = y(a.j),
      c = Ja;
    a.m || (a.m = {});
    var d = a.m[1];
    var e = Ea(a, b);
    if (d)
      b ||
        (Object.isFrozen(d)
          ? b || ((d = Array.prototype.slice.call(d)), (a.m[1] = d))
          : b && Object.freeze(d));
    else {
      d = [];
      const g = !!(w(a.j) & 16);
      var f = y(e);
      !b && f && ((e = oa(Array.prototype.slice.call(e))), F(a, 1, e));
      let h = f;
      for (let l = 0; l < e.length; l++) {
        const k = e[l],
          m = xa(k, c, g);
        void 0 !== m && ((h = h || y(k)), d.push(m), f && v(m.j, 2));
      }
      a.m[1] = d;
      Object.isFrozen(e) || ((c = w(e) | 33), x(e, h ? c & -9 : c | 8));
      (b || (b && f)) && v(d, 2);
      (b || b) && Object.freeze(d);
    }
    a = Ea(a, b);
    if (!b && a && !(w(a) & 8)) {
      for (b = 0; b < d.length; b++)
        (e = d[b]), (f = Ha(e)), e !== f && ((d[b] = f), (a[b] = d[b].j));
      v(a, 8);
    }
    return d;
  }
  function Ka(a, b, c, d) {
    va(a);
    let e;
    if (null != c) {
      e = oa([]);
      let f = !1;
      for (let g = 0; g < c.length; g++) (e[g] = c[g].j), (f = f || y(e[g]));
      a.m || (a.m = {});
      a.m[b] = c;
      c = e;
      f ? (u ? c[u] && (c[u] &= -9) : void 0 !== c.s && (c.s &= -9)) : v(c, 8);
    } else a.m && (a.m[b] = void 0), (e = C);
    F(a, b, e, d);
  }
  function I(a) {
    a = E(a, 1);
    return null == a ? "" : a;
  }
  function J(a, b) {
    a = E(a, b);
    a = null == a ? a : !!a;
    return null == a ? !1 : a;
  }
  function K(a, b) {
    a = E(a, b);
    return null == a ? 0 : a;
  }
  function La(a) {
    if (y(a) && Object.isFrozen(a)) return a;
    const b = Array.prototype.map.call(a, Ma, void 0);
    x(b, (w(a) | 18) & -41);
    Object.freeze(b);
    return b;
  }
  function Na(a, b) {
    if (null != a) {
      if (ka && a instanceof Uint8Array)
        return a.length ? new na(new Uint8Array(a)) : ma || (ma = new na(null));
      if (Array.isArray(a)) {
        if (y(a)) return a;
        b && ((b = w(a)), (b = !(b & 32) && (!!(b & 16) || 0 === b)));
        if (b) return v(a, 2), a;
        a = Aa(a, Na, ta);
        w(a) & 4 && Object.freeze(a);
        return a;
      }
      return a.K === A ? Ma(a) : a;
    }
  }
  function Ma(a) {
    if (y(a.j)) return a;
    a = Oa(a);
    v(a.j, 2);
    return a;
  }
  function Oa(a) {
    const b = a.j;
    var c = sa([]),
      d = a.constructor.h;
    d && c.push(d);
    0 !== (w(b) & 128) && wa(c);
    d = a.constructor;
    D = c;
    c = new d(c);
    D = void 0;
    a.M && (c.M = a.M.slice());
    d = !!(w(b) & 16);
    for (let k = 0; k < b.length; k++) {
      var e = b[k];
      if (k === b.length - 1 && B(e))
        for (const m in e) {
          var f = +m;
          if (Number.isNaN(f)) Da(c)[f] = e[f];
          else {
            var g = c,
              h = f;
            f = e[m];
            var l = d;
            const p = a.m && a.m[h];
            p ? Ka(g, h, La(p), !0) : ((f = Na(f, l)), va(g), F(g, h, f, !0));
          }
        }
      else
        (g = c),
          (f = k - a.A),
          (l = d),
          (h = a.m && a.m[f])
            ? Ka(g, f, La(h), !1)
            : ((e = Na(e, l)), va(g), F(g, f, e, !1));
    }
    return c;
  }
  function Ha(a) {
    if (y(a.j)) {
      var b = Oa(a);
      b.l = a;
      a = b;
    }
    return a;
  }
  var L = class {
    constructor(a, b, c) {
      null == a && (a = D);
      D = void 0;
      var d = this.constructor.i || 0,
        e = 0 < d,
        f = this.constructor.h,
        g = !1;
      if (null == a) {
        a = f ? [f] : [];
        var h = !0;
        x(a, 48);
      } else {
        if (!Array.isArray(a)) throw Error();
        if (f && f !== a[0]) throw Error();
        const l = v(a, 0);
        let k = l;
        if ((h = 0 !== (16 & k))) (g = 0 !== (32 & k)) || (k |= 32);
        if (e)
          if (128 & k) d = 0;
          else {
            if (0 < a.length) {
              const m = a[a.length - 1];
              if (B(m) && "g" in m) {
                d = 0;
                k |= 128;
                delete m.g;
                let p = !0;
                for (let z in m) {
                  p = !1;
                  break;
                }
                p && a.pop();
              }
            }
          }
        else if (128 & k) throw Error();
        l !== k && x(a, k);
      }
      this.A = (f ? 0 : -1) - d;
      this.m = void 0;
      this.j = a;
      a: {
        f = this.j.length;
        d = f - 1;
        if (f && ((f = this.j[d]), B(f))) {
          this.h = f;
          this.i = d - this.A;
          break a;
        }
        void 0 !== b && -1 < b
          ? ((this.i = Math.max(b, d + 1 - this.A)), (this.h = void 0))
          : (this.i = Number.MAX_VALUE);
      }
      if (!e && this.h && "g" in this.h)
        throw Error(
          'Unexpected "g" flag in sparse object of message that is not a group type.'
        );
      if (c) {
        b = h && !g && !0;
        e = this.i;
        let l;
        for (h = 0; h < c.length; h++)
          (g = c[h]),
            g < e
              ? ((g += this.A), (d = a[g]) ? Pa(d, b) : (a[g] = C))
              : (l || (l = Da(this)), (d = l[g]) ? Pa(d, b) : (l[g] = C));
      }
    }
    toJSON() {
      return Aa(this.j, Ba, Ca);
    }
  };
  function Pa(a, b) {
    if (Array.isArray(a)) {
      var c = w(a),
        d = 1;
      !b || c & 2 || (d |= 16);
      (c & d) !== d && x(a, c | d);
    }
  }
  L.prototype.K = A;
  L.prototype.toString = function () {
    return this.j.toString();
  };
  var Ga = class extends L {
      constructor(a) {
        super(a, -1, Qa);
      }
    },
    Ja = class extends L {
      constructor(a) {
        super(a);
      }
    },
    Qa = [1];
  var Ra = class extends L {
    constructor(a) {
      super(a);
    }
  };
  function Sa() {}
  function Ta(a) {
    let b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  }
  var Ua = { capture: !0 },
    Va = { passive: !0 },
    Wa = Ta(function () {
      let a = !1;
      try {
        const b = Object.defineProperty({}, "passive", {
          get: function () {
            a = !0;
          },
        });
        n.addEventListener("test", null, b);
      } catch (b) {}
      return a;
    });
  function M(a, b, c, d) {
    if (a.addEventListener) {
      var e = a.addEventListener;
      d = d ? (d.passive && Wa() ? d : d.capture || !1) : !1;
      e.call(a, b, c, d);
    }
  }
  var O = class {
    constructor(a, b) {
      this.h = b === N ? a : "";
    }
    toString() {
      return this.h.toString();
    }
  };
  O.prototype.l = !0;
  O.prototype.i = function () {
    return this.h.toString();
  };
  var Xa = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    N = {},
    Ya = new O("about:invalid#zClosurez", N);
  function Za(a, b, c) {
    if (Array.isArray(b))
      for (var d = 0; d < b.length; d++) Za(a, String(b[d]), c);
    else
      null != b &&
        c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))));
  } /* 
 
 SPDX-License-Identifier: Apache-2.0 
*/
  class $a {
    constructor(a) {
      this.P = a;
    }
  }
  function P(a) {
    return new $a((b) => b.substr(0, a.length + 1).toLowerCase() === a + ":");
  }
  const ab = new $a((a) => /^[^:]*([/?#]|$)/.test(a));
  var bb = P("http"),
    cb = P("https"),
    db = P("ftp"),
    eb = P("mailto");
  const fb = [P("data"), bb, cb, eb, db, ab];
  function gb(a = fb) {
    for (let b = 0; b < a.length; ++b) {
      const c = a[b];
      if (c instanceof $a && c.P("#")) return new O("#", N);
    }
  }
  function hb(a = fb) {
    return gb(a) || Ya;
  }
  function ib(a, b) {
    if (a)
      for (const c in a)
        Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
  }
  let Q = [];
  const jb = () => {
    const a = Q;
    Q = [];
    for (const b of a)
      try {
        b();
      } catch {}
  };
  var kb = (a) => {
    var b = R;
    "complete" === b.readyState || "interactive" === b.readyState
      ? (Q.push(a),
        1 == Q.length &&
          (window.Promise
            ? Promise.resolve().then(jb)
            : window.setImmediate
            ? setImmediate(jb)
            : setTimeout(jb, 0)))
      : b.addEventListener("DOMContentLoaded", a);
  };
  function lb(a = document) {
    return a.createElement("img");
  }
  function mb(a = null) {
    return a && "23" === a.getAttribute("data-jc")
      ? a
      : document.querySelector('[data-jc="23"]');
  }
  function nb() {
    if (!(0.01 < Math.random())) {
      var a = mb(document.currentScript);
      a =
        a && "true" === a.getAttribute("data-jc-rcd")
          ? "pagead2.googlesyndication-cn.com"
          : "pagead2.googlesyndication.com";
      var b =
        ((b = mb(document.currentScript)) &&
          b.getAttribute("data-jc-version")) ||
        "unknown";
      a = `https://${a}/pagead/gen_204?id=jca&jc=${23}&version=${b}&sample=${0.01}`;
      b = window;
      var c;
      if ((c = b.navigator))
        (c = b.navigator.userAgent),
          (c = /Chrome/.test(c) && !/Edge/.test(c) ? !0 : !1);
      c && b.navigator.sendBeacon
        ? b.navigator.sendBeacon(a)
        : (b.google_image_requests || (b.google_image_requests = []),
          (c = lb(b.document)),
          (c.src = a),
          b.google_image_requests.push(c));
    }
  }
  var R = document,
    S = window;
  var ob = (a = []) => {
    n.google_logging_queue || (n.google_logging_queue = []);
    n.google_logging_queue.push([12, a]);
  };
  const pb = [
    bb,
    cb,
    eb,
    db,
    ab,
    P("market"),
    P("itms"),
    P("intent"),
    P("itms-appss"),
  ];
  var qb = () => {
    var a = `${
      "http:" === S.location.protocol ? "http:" : "https:"
    }//${"pagead2.googlesyndication.com"}/pagead/gen_204`;
    return (b) => {
      b = { id: "unsafeurl", ctx: 625, url: b };
      var c = [];
      for (d in b) Za(d, b[d], c);
      var d = c.join("&");
      if (d) {
        b = a.indexOf("#");
        0 > b && (b = a.length);
        c = a.indexOf("?");
        if (0 > c || c > b) {
          c = b;
          var e = "";
        } else e = a.substring(c + 1, b);
        b = [a.slice(0, c), e, a.slice(b)];
        c = b[1];
        b[1] = d ? (c ? c + "&" + d : d) : c;
        d = b[0] + (b[1] ? "?" + b[1] : "") + b[2];
      } else d = a;
      navigator.sendBeacon && navigator.sendBeacon(d, "");
    };
  };
  var rb = () => {
      var a = R;
      try {
        return a.querySelectorAll("*[data-ifc]");
      } catch (b) {
        return [];
      }
    },
    sb = (a, b) => {
      a &&
        ib(b, (c, d) => {
          a.style[d] = c;
        });
    },
    tb = (a) => {
      var b = R.body;
      const c = document.createDocumentFragment(),
        d = a.length;
      for (let e = 0; e < d; ++e) c.appendChild(a[e]);
      b.appendChild(c);
    };
  let T = null;
  function ub() {
    const a = n.performance;
    return a && a.now && a.timing
      ? Math.floor(a.now() + a.timing.navigationStart)
      : Date.now();
  }
  function vb() {
    const a = n.performance;
    return a && a.now ? a.now() : null;
  }
  class wb {
    constructor(a, b) {
      var c = vb() || ub();
      this.label = a;
      this.type = b;
      this.value = c;
      this.duration = 0;
      this.uniqueId = Math.random();
      this.taskId = this.slotId = void 0;
    }
  }
  const U = n.performance,
    xb = !!(U && U.mark && U.measure && U.clearMarks),
    V = Ta(() => {
      var a;
      if ((a = xb)) {
        var b;
        if (null === T) {
          T = "";
          try {
            a = "";
            try {
              a = n.top.location.hash;
            } catch (c) {
              a = n.location.hash;
            }
            a && (T = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "");
          } catch (c) {}
        }
        b = T;
        a = !!b.indexOf && 0 <= b.indexOf("1337");
      }
      return a;
    });
  function yb(a) {
    a &&
      U &&
      V() &&
      (U.clearMarks(`goog_${a.label}_${a.uniqueId}_start`),
      U.clearMarks(`goog_${a.label}_${a.uniqueId}_end`));
  }
  class zb {
    constructor() {
      var a = window;
      this.h = [];
      this.l = a || n;
      let b = null;
      a &&
        ((a.google_js_reporting_queue = a.google_js_reporting_queue || []),
        (this.h = a.google_js_reporting_queue),
        (b = a.google_measure_js_timing));
      this.i = V() || (null != b ? b : 1 > Math.random());
    }
    start(a, b) {
      if (!this.i) return null;
      a = new wb(a, b);
      b = `goog_${a.label}_${a.uniqueId}_start`;
      U && V() && U.mark(b);
      return a;
    }
    end(a) {
      if (this.i && "number" === typeof a.value) {
        a.duration = (vb() || ub()) - a.value;
        var b = `goog_${a.label}_${a.uniqueId}_end`;
        U && V() && U.mark(b);
        !this.i || 2048 < this.h.length || this.h.push(a);
      }
    }
  }
  const W = new zb();
  var Ab = () => {
    window.google_measure_js_timing ||
      ((W.i = !1),
      W.h != W.l.google_js_reporting_queue &&
        (V() && r(W.h, yb), (W.h.length = 0)));
  };
  "number" !== typeof window.google_srt && (window.google_srt = Math.random());
  "complete" == window.document.readyState
    ? Ab()
    : W.i &&
      M(window, "load", () => {
        Ab();
      });
  var Bb = (a) => {
    M(S, "message", (b) => {
      let c;
      try {
        c = JSON.parse(b.data);
      } catch (d) {
        return;
      }
      !c || "ig" !== c.googMsgType || a(c, b);
    });
  };
  function Cb() {
    this.i = this.i;
    this.l = this.l;
  }
  Cb.prototype.i = !1;
  function Db(a) {
    a.i || ((a.i = !0), a.u());
  }
  Cb.prototype.u = function () {
    if (this.l) for (; this.l.length; ) this.l.shift()();
  };
  function X(a, b, c) {
    Cb.call(this);
    this.v = a;
    this.H = b || 0;
    this.B = c;
    this.D = q(this.F, this);
  }
  ha(X, Cb);
  X.prototype.h = 0;
  X.prototype.u = function () {
    X.R.u.call(this);
    this.isActive() && n.clearTimeout(this.h);
    this.h = 0;
    delete this.v;
    delete this.B;
  };
  X.prototype.start = function (a) {
    this.isActive() && n.clearTimeout(this.h);
    this.h = 0;
    var b = this.D;
    a = void 0 !== a ? a : this.H;
    if ("function" !== typeof b)
      if (b && "function" == typeof b.handleEvent) b = q(b.handleEvent, b);
      else throw Error("Invalid listener argument");
    this.h = 2147483647 < Number(a) ? -1 : n.setTimeout(b, a || 0);
  };
  X.prototype.isActive = function () {
    return 0 != this.h;
  };
  X.prototype.F = function () {
    this.h = 0;
    this.v && this.v.call(this.B);
  };
  const Eb = { display: "inline-block", position: "absolute" },
    Fb = {
      display: "none",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
    },
    Y = (a, b) => {
      a && (a.style.display = b ? "inline-block" : "none");
    };
  function Gb(a = "") {
    const b = { top: 0, right: 0, bottom: 0, left: 0 };
    a &&
      ((a = a.split(",")),
      4 === a.length &&
        a.reduce((c, d) => c && !isNaN(+d), !0) &&
        ([b.top, b.right, b.bottom, b.left] = a.map((c) => +c)));
    return b;
  }
  function Hb(a, b, c = 2147483647) {
    const d = R.createElement("div");
    sb(d, { ...Eb, "z-index": String(c), ...b });
    J(a.data, 10) && M(d, "click", Sa);
    if (J(a.data, 11)) {
      a = b = R.createElement("a");
      c = qb();
      const e = hb(pb);
      e === Ya && c("#");
      c = e;
      c instanceof O ||
        c instanceof O ||
        ((c = "object" == typeof c && c.l ? c.i() : String(c)),
        Xa.test(c) || (c = "about:invalid#zClosurez"),
        (c = new O(c, N)));
      a.href =
        c instanceof O && c.constructor === O ? c.h : "type_error:SafeUrl";
      b.appendChild(d);
      return b;
    }
    return d;
  }
  function Ib(a, b) {
    switch (H(b.o, 5)) {
      case 2:
        S.AFMA_Communicator?.addEventListener?.("onshow", () => {
          Z(a, b);
        });
        break;
      case 10:
        M(S, "i-creative-view", () => {
          Z(a, b);
        });
        break;
      case 4:
        M(R, "DOMContentLoaded", () => {
          Z(a, b);
        });
        break;
      case 8:
        Bb((c) => {
          c.rr && Z(a, b);
        });
        break;
      case 9:
        if ("IntersectionObserver" in S) {
          const c = new IntersectionObserver((d) => {
            for (const e of d)
              if (0 < e.intersectionRatio) {
                Z(a, b);
                break;
              }
          });
          c.observe(R.body);
          a.O.push(c);
        }
        break;
      case 11:
        S.AFMA_Communicator?.addEventListener?.("onAdVisibilityChanged", () => {
          Z(a, b);
        });
    }
  }
  function Jb(a, b) {
    b = Gb(b);
    const c = K(a.data, 9);
    a.u = [
      { width: "100%", height: b.top + c + "px", top: -c + "px", left: "0" },
      { width: b.right + c + "px", height: "100%", top: "0", right: -c + "px" },
      {
        width: "100%",
        height: b.bottom + c + "px",
        bottom: -c + "px",
        left: "0",
      },
      { width: b.left + c + "px", height: "100%", top: "0", left: -c + "px" },
    ].map((d) => Hb(a, d, 9019));
  }
  function Kb(a) {
    var b = 0;
    for (const d of a.L) {
      const e = d.o,
        f = a.F[H(e, 5)];
      d.C || void 0 === f || (b = Math.max(b, f + K(e, 2)));
    }
    a.v && Db(a.v);
    b -= Date.now();
    const c = a.i;
    0 < b
      ? (Y(c, !0),
        (a.v = new X(() => {
          Y(c, !1);
        }, b)),
        a.v.start())
      : Y(c, !1);
  }
  function Z(a, b) {
    b.C || ((a.F[H(b.o, 5)] = Date.now()), J(b.o, 9) && (a.L.push(b), Kb(a)));
  }
  function Lb(a, b, c) {
    if (!a.h || !a.D || 300 <= b.timeStamp - a.h.timeStamp) return !1;
    const d = new Map();
    r(a.D.changedTouches, (e) => {
      d.set(e.identifier, { x: e.clientX, y: e.clientY });
    });
    b = K(c.o, 11) || 10;
    for (const e of a.h.changedTouches)
      if (
        ((a = d.get(e.identifier)),
        !a || Math.abs(a.x - e.clientX) > b || Math.abs(a.y - e.clientY) > b)
      )
        return !0;
    return !1;
  }
  window.googqscp = new (class {
    constructor() {
      this.u = [];
      this.v = this.i = null;
      this.L = [];
      this.data = null;
      this.H = [];
      this.l = [];
      this.B = [];
      this.F = {};
      this.O = [];
      this.D = this.h = null;
    }
    init(a) {
      ob([a]);
      this.data = new Ra(a);
      a = Fa(this.data);
      r(Ia(a), (e) => {
        this.B.push({ I: 0, C: !1, J: 0, o: e, G: -1 });
      });
      this.l = rb();
      let b = !1;
      a = this.l.length;
      for (let e = 0; e < a; ++e) {
        var c = new Ga(JSON.parse(this.l[e].getAttribute("data-ifc") || "[]"));
        r(Ia(c), (f) => {
          this.B.push({ I: 0, C: !1, J: 0, o: f, G: e });
          1 === H(f, 4) && (b = !0);
        });
      }
      c = a = !1;
      for (var d of this.B) {
        const e = d.o;
        0 < K(e, 2) && 0 < H(e, 5)
          ? (!this.i && J(e, 9) && (this.i = Hb(this, Fb)), Ib(this, d))
          : I(e) && J(e, 9) && Jb(this, I(e));
        I(e) && (a = !0);
        0 < K(e, 11) && (c = !0);
      }
      d = [];
      this.i && d.push(this.i);
      !b && d.push(...this.u);
      R.body && tb(d);
      J(this.data, 13) &&
        kb(() => {
          const e = R.body.querySelectorAll(".amp-fcp, .amp-bcp");
          for (let g = 0; g < e.length; ++g) {
            var f = (f = e[g])
              ? S.getComputedStyle(f).getPropertyValue("position")
              : void 0;
            "absolute" === f && Y(e[g], !1);
          }
        });
      M(
        R,
        "click",
        (e) => {
          if (!1 === e.isTrusted && J(this.data, 15))
            e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
              e.stopImmediatePropagation(),
              nb();
          else {
            var f = -1,
              g = [];
            for (const G of this.B) {
              var h = G.G,
                l = -1 !== h;
              if (!(K(G.o, 3) <= f || G.C || (l && !1 === g[h]))) {
                var k = !l || g[h] || this.l[h].contains(e.target);
                l && k && (g[h] = !0);
                if ((h = k))
                  if (((h = e), (k = G), (l = k.o), 0 < K(l, 2) && 0 < H(l, 5)))
                    (h = this.F[H(l, 5)]),
                      (h = void 0 !== h && Date.now() < h + K(l, 2));
                  else if (I(l)) {
                    {
                      l = (
                        0 <= k.G ? this.l[k.G] : R.body
                      ).getBoundingClientRect();
                      var m = Number;
                      var p = (p = R.body)
                        ? S.getComputedStyle(p).getPropertyValue("zoom")
                        : void 0;
                      m = m(p || "1");
                      const [Mb, Nb] = [h.clientX, h.clientY],
                        [ba, ca, pa, qa] = [
                          Mb / m - l.left,
                          Nb / m - l.top,
                          l.width,
                          l.height,
                        ];
                      if (
                        !(0 < pa && 0 < qa) ||
                        isNaN(ba) ||
                        isNaN(ca) ||
                        0 > ba ||
                        0 > ca
                      )
                        h = !1;
                      else {
                        k = Gb(I(k.o));
                        p = !(
                          ba >= k.left &&
                          pa - ba > k.right &&
                          ca >= k.top &&
                          qa - ca > k.bottom
                        );
                        if (
                          this.h &&
                          J(this.data, 12) &&
                          300 > h.timeStamp - this.h.timeStamp
                        ) {
                          h = this.h.changedTouches[0];
                          const [da, ea] = [
                            h.clientX / m - l.left,
                            h.clientY / m - l.top,
                          ];
                          !isNaN(da) &&
                            !isNaN(ea) &&
                            0 <= da &&
                            0 <= ea &&
                            (p =
                              (p = J(this.data, 16) ? p : !1) ||
                              !(
                                da >= k.left &&
                                pa - da > k.right &&
                                ea >= k.top &&
                                qa - ea > k.bottom
                              ));
                        }
                        h = p;
                      }
                    }
                  } else h = 0 < K(l, 11) ? Lb(this, h, k) : !0;
                if (h) {
                  var z = G;
                  f = K(G.o, 3);
                }
              }
            }
            if (z)
              switch (((f = z.o), H(f, 4))) {
                case 2:
                case 3:
                  e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
                  g = Date.now();
                  500 < g - z.J && ((z.J = g), ++z.I);
                  g = z.o;
                  if (K(g, 8) && z.I >= K(g, 8))
                    if (((z.C = !0), this.i && 0 < K(g, 2))) Kb(this);
                    else if (0 < this.u.length && I(g))
                      for (var ra of this.u) Y(ra, !1);
                  nb();
                  ra = f.toJSON();
                  for (const G of this.H) G(e, ra);
              }
          }
        },
        Ua
      );
      c &&
        M(
          R,
          "touchstart",
          (e) => {
            this.D = e;
          },
          Va
        );
      ((a && J(this.data, 12)) || c) &&
        M(
          R,
          "touchend",
          (e) => {
            this.h = e;
          },
          Va
        );
    }
    registerCallback(a) {
      this.H.push(a);
    }
  })();
}.call(this));
