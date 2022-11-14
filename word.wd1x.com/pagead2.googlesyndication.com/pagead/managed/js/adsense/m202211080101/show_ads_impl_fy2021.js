(function (sttc) {
  /* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/
  "use strict";
  var p,
    aa =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a;
          };
  function ba(a) {
    a = [
      "object" == typeof globalThis && globalThis,
      a,
      "object" == typeof window && window,
      "object" == typeof self && self,
      "object" == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error("Cannot find global object");
  }
  var ca = ba(this),
    fa = "function" === typeof Symbol && "symbol" === typeof Symbol("x"),
    ia = {},
    ka = {};
  function la(a, b) {
    var c = ka[b];
    if (null == c) return a[b];
    c = a[c];
    return void 0 !== c ? c : a[b];
  }
  function ma(a, b, c) {
    if (b)
      a: {
        var d = a.split(".");
        a = 1 === d.length;
        var e = d[0],
          f;
        !a && e in ia ? (f = ia) : (f = ca);
        for (e = 0; e < d.length - 1; e++) {
          var g = d[e];
          if (!(g in f)) break a;
          f = f[g];
        }
        d = d[d.length - 1];
        c = fa && "es6" === c ? f[d] : null;
        b = b(c);
        null != b &&
          (a
            ? aa(ia, d, { configurable: !0, writable: !0, value: b })
            : b !== c &&
              (void 0 === ka[d] &&
                ((a = (1e9 * Math.random()) >>> 0),
                (ka[d] = fa ? ca.Symbol(d) : "$jscp$" + a + "$" + d)),
              aa(f, ka[d], { configurable: !0, writable: !0, value: b })));
      }
  }
  var na =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          },
    pa;
  if (fa && "function" == typeof Object.setPrototypeOf)
    pa = Object.setPrototypeOf;
  else {
    var qa;
    a: {
      var ra = { a: !0 },
        va = {};
      try {
        va.__proto__ = ra;
        qa = va.a;
        break a;
      } catch (a) {}
      qa = !1;
    }
    pa = qa
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var wa = pa;
  function ya(a, b) {
    a.prototype = na(b.prototype);
    a.prototype.constructor = a;
    if (wa) wa(a, b);
    else
      for (var c in b)
        if ("prototype" != c)
          if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d);
          } else a[c] = b[c];
    a.Uf = b.prototype;
  }
  ma(
    "AggregateError",
    function (a) {
      function b(c, d) {
        d = Error(d);
        "stack" in d && (this.stack = d.stack);
        this.errors = c;
        this.message = d.message;
      }
      if (a) return a;
      ya(b, Error);
      b.prototype.name = "AggregateError";
      return b;
    },
    "es_2021"
  );
  ma(
    "Promise.any",
    function (a) {
      return a
        ? a
        : function (b) {
            b = b instanceof Array ? b : Array.from(b);
            return Promise.all(
              b.map(function (c) {
                return Promise.resolve(c).then(
                  function (d) {
                    throw d;
                  },
                  function (d) {
                    return d;
                  }
                );
              })
            ).then(
              function (c) {
                throw new ia.AggregateError(c, "All promises were rejected");
              },
              function (c) {
                return c;
              }
            );
          };
    },
    "es_2021"
  );
  var t = this || self;
  function za(a) {
    var b = typeof a;
    return "object" != b ? b : a ? (Array.isArray(a) ? "array" : b) : "null";
  }
  function Ba(a) {
    var b = za(a);
    return "array" == b || ("object" == b && "number" == typeof a.length);
  }
  function Ca(a) {
    var b = typeof a;
    return ("object" == b && null != a) || "function" == b;
  }
  function Da(a) {
    return (
      (Object.prototype.hasOwnProperty.call(a, Ea) && a[Ea]) || (a[Ea] = ++Fa)
    );
  }
  var Ea = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
    Fa = 0;
  function Ga(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function Ha(a, b, c) {
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
  function Ka(a, b, c) {
    Function.prototype.bind &&
    -1 != Function.prototype.bind.toString().indexOf("native code")
      ? (Ka = Ga)
      : (Ka = Ha);
    return Ka.apply(null, arguments);
  }
  function Ma(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  function Na() {
    return Date.now();
  }
  function Qa(a, b) {
    a = a.split(".");
    var c = t;
    a[0] in c ||
      "undefined" == typeof c.execScript ||
      c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift()); )
      a.length || void 0 === b
        ? c[d] && c[d] !== Object.prototype[d]
          ? (c = c[d])
          : (c = c[d] = {})
        : (c[d] = b);
  }
  function Ra(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Uf = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.Sj = function (d, e, f) {
      for (
        var g = Array(arguments.length - 2), h = 2;
        h < arguments.length;
        h++
      )
        g[h - 2] = arguments[h];
      return b.prototype[e].apply(d, g);
    };
  }
  function Sa(a) {
    return a;
  }
  var Ta = { Xi: 0, Wi: 1, Vi: 2 };
  function Ua(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, Ua);
    else {
      const c = Error().stack;
      c && (this.stack = c);
    }
    a && (this.message = String(a));
    void 0 !== b && (this.cause = b);
  }
  Ra(Ua, Error);
  Ua.prototype.name = "CustomError";
  var Va;
  function Wa(a, b) {
    a = a.split("%s");
    let c = "";
    const d = a.length - 1;
    for (let e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
    Ua.call(this, c + a[d]);
  }
  Ra(Wa, Ua);
  Wa.prototype.name = "AssertionError";
  function Xa(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
  }
  function Ya(a) {
    if (!Za.test(a)) return a;
    -1 != a.indexOf("&") && (a = a.replace(ab, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(bb, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(cb, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(db, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(eb, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(fb, "&#0;"));
    return a;
  }
  var ab = /&/g,
    bb = /</g,
    cb = />/g,
    db = /"/g,
    eb = /'/g,
    fb = /\x00/g,
    Za = /[\x00&<>"']/;
  function gb(a, b) {
    return -1 != a.indexOf(b);
  }
  function hb(a) {
    var b = jb();
    let c = 0;
    b = Xa(String(b)).split(".");
    a = Xa(String(a)).split(".");
    const d = Math.max(b.length, a.length);
    for (let g = 0; 0 == c && g < d; g++) {
      var e = b[g] || "",
        f = a[g] || "";
      do {
        e = /(\d*)(\D*)(.*)/.exec(e) || ["", "", "", ""];
        f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
        if (0 == e[0].length && 0 == f[0].length) break;
        c =
          kb(
            0 == e[1].length ? 0 : parseInt(e[1], 10),
            0 == f[1].length ? 0 : parseInt(f[1], 10)
          ) ||
          kb(0 == e[2].length, 0 == f[2].length) ||
          kb(e[2], f[2]);
        e = e[3];
        f = f[3];
      } while (0 == c);
    }
    return c;
  }
  function kb(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function lb() {
    var a = t.navigator;
    return a && (a = a.userAgent) ? a : "";
  }
  function u(a) {
    return gb(lb(), a);
  }
  function mb() {
    return u("Opera");
  }
  function nb() {
    return u("Trident") || u("MSIE");
  }
  function ob() {
    return u("Firefox") || u("FxiOS");
  }
  function pb() {
    return (
      u("Safari") &&
      !(
        qb() ||
        u("Coast") ||
        mb() ||
        u("Edge") ||
        u("Edg/") ||
        u("OPR") ||
        ob() ||
        u("Silk") ||
        u("Android")
      )
    );
  }
  function qb() {
    return ((u("Chrome") || u("CriOS")) && !u("Edge")) || u("Silk");
  }
  function rb() {
    return u("Android") && !(qb() || ob() || mb() || u("Silk"));
  }
  function sb(a) {
    const b = {};
    a.forEach((c) => {
      b[c[0]] = c[1];
    });
    return (c) => b[c.find((d) => d in b)] || "";
  }
  function jb() {
    var a = lb();
    if (nb()) {
      var b = /rv: *([\d\.]*)/.exec(a);
      if (b && b[1]) a = b[1];
      else {
        b = "";
        var c = /MSIE +([\d\.]+)/.exec(a);
        if (c && c[1])
          if (((a = /Trident\/(\d.\d)/.exec(a)), "7.0" == c[1]))
            if (a && a[1])
              switch (a[1]) {
                case "4.0":
                  b = "8.0";
                  break;
                case "5.0":
                  b = "9.0";
                  break;
                case "6.0":
                  b = "10.0";
                  break;
                case "7.0":
                  b = "11.0";
              }
            else b = "7.0";
          else b = c[1];
        a = b;
      }
      return a;
    }
    c = RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g");
    b = [];
    let d;
    for (; (d = c.exec(a)); ) b.push([d[1], d[2], d[3] || void 0]);
    a = sb(b);
    return mb()
      ? a(["Version", "Opera"])
      : u("Edge")
      ? a(["Edge"])
      : u("Edg/")
      ? a(["Edg"])
      : u("Silk")
      ? a(["Silk"])
      : qb()
      ? a(["Chrome", "CriOS", "HeadlessChrome"])
      : ((a = b[2]) && a[1]) || "";
  }
  function tb(a, b) {
    if ("string" === typeof a)
      return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
    for (let c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
    return -1;
  }
  function ub(a, b) {
    const c = a.length,
      d = "string" === typeof a ? a.split("") : a;
    for (let e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a);
  }
  function vb(a, b) {
    const c = a.length,
      d = [];
    let e = 0;
    const f = "string" === typeof a ? a.split("") : a;
    for (let g = 0; g < c; g++)
      if (g in f) {
        const h = f[g];
        b.call(void 0, h, g, a) && (d[e++] = h);
      }
    return d;
  }
  function wb(a, b) {
    const c = a.length,
      d = Array(c),
      e = "string" === typeof a ? a.split("") : a;
    for (let f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
    return d;
  }
  function xb(a, b, c) {
    let d = c;
    ub(a, function (e, f) {
      d = b.call(void 0, d, e, f, a);
    });
    return d;
  }
  function zb(a, b) {
    const c = a.length,
      d = "string" === typeof a ? a.split("") : a;
    for (let e = 0; e < c; e++)
      if (e in d && b.call(void 0, d[e], e, a)) return !0;
    return !1;
  }
  function Ab(a, b) {
    return 0 <= tb(a, b);
  }
  function Bb(a, b) {
    b = tb(a, b);
    let c;
    (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
    return c;
  }
  function Cb(a) {
    return Array.prototype.concat.apply([], arguments);
  }
  function Db(a) {
    const b = a.length;
    if (0 < b) {
      const c = Array(b);
      for (let d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function Eb(a, b, c) {
    return 2 >= arguments.length
      ? Array.prototype.slice.call(a, b)
      : Array.prototype.slice.call(a, b, c);
  }
  function Fb(a, b, c) {
    c = c || Gb;
    let d = 0,
      e = a.length,
      f;
    for (; d < e; ) {
      const g = d + ((e - d) >>> 1);
      let h;
      h = c(b, a[g]);
      0 < h ? (d = g + 1) : ((e = g), (f = !h));
    }
    return f ? d : -d - 1;
  }
  function Hb(a, b) {
    if (!Ba(a) || !Ba(b) || a.length != b.length) return !1;
    const c = a.length,
      d = Ib;
    for (let e = 0; e < c; e++) if (!d(a[e], b[e])) return !1;
    return !0;
  }
  function Gb(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }
  function Ib(a, b) {
    return a === b;
  }
  function Jb(a) {
    const b = [];
    for (let c = 0; c < arguments.length; c++) {
      const d = arguments[c];
      if (Array.isArray(d))
        for (let e = 0; e < d.length; e += 8192) {
          const f = Jb.apply(null, Eb(d, e, e + 8192));
          for (let g = 0; g < f.length; g++) b.push(f[g]);
        }
      else b.push(d);
    }
    return b;
  }
  function Kb(a, b) {
    b = b || Math.random;
    for (let c = a.length - 1; 0 < c; c--) {
      const d = Math.floor(b() * (c + 1)),
        e = a[c];
      a[c] = a[d];
      a[d] = e;
    }
  }
  function Lb(a) {
    Lb[" "](a);
    return a;
  }
  Lb[" "] = function () {};
  function Mb(a, b) {
    try {
      return Lb(a[b]), !0;
    } catch (c) {}
    return !1;
  }
  var Nb = mb(),
    Ob = nb(),
    Pb = u("Edge"),
    Qb = Pb || Ob,
    Rb =
      u("Gecko") &&
      !(gb(lb().toLowerCase(), "webkit") && !u("Edge")) &&
      !(u("Trident") || u("MSIE")) &&
      !u("Edge"),
    Sb = gb(lb().toLowerCase(), "webkit") && !u("Edge");
  function Tb() {
    var a = t.document;
    return a ? a.documentMode : void 0;
  }
  var Ub;
  a: {
    var Vb = "",
      Wb = (function () {
        var a = lb();
        if (Rb) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (Pb) return /Edge\/([\d\.]+)/.exec(a);
        if (Ob) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (Sb) return /WebKit\/(\S+)/.exec(a);
        if (Nb) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
    Wb && (Vb = Wb ? Wb[1] : "");
    if (Ob) {
      var Xb = Tb();
      if (null != Xb && Xb > parseFloat(Vb)) {
        Ub = String(Xb);
        break a;
      }
    }
    Ub = Vb;
  }
  var Yb = Ub,
    $b;
  if (t.document && Ob) {
    var ac = Tb();
    $b = ac ? ac : parseInt(Yb, 10) || void 0;
  } else $b = void 0;
  var bc = $b;
  rb();
  qb();
  pb();
  var cc = {},
    dc = null;
  function ec(a, b) {
    void 0 === b && (b = 0);
    fc();
    b = cc[b];
    const c = Array(Math.floor(a.length / 3)),
      d = b[64] || "";
    let e = 0,
      f = 0;
    for (; e < a.length - 2; e += 3) {
      var g = a[e],
        h = a[e + 1],
        k = a[e + 2],
        l = b[g >> 2];
      g = b[((g & 3) << 4) | (h >> 4)];
      h = b[((h & 15) << 2) | (k >> 6)];
      k = b[k & 63];
      c[f++] = l + g + h + k;
    }
    l = 0;
    k = d;
    switch (a.length - e) {
      case 2:
        (l = a[e + 1]), (k = b[(l & 15) << 2] || d);
      case 1:
        (a = a[e]), (c[f] = b[a >> 2] + b[((a & 3) << 4) | (l >> 4)] + k + d);
    }
    return c.join("");
  }
  function gc(a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
      var e = a.charCodeAt(d);
      255 < e && ((b[c++] = e & 255), (e >>= 8));
      b[c++] = e;
    }
    return ec(b, 3);
  }
  function hc(a) {
    var b = [];
    ic(a, function (c) {
      b.push(c);
    });
    return b;
  }
  function jc(a) {
    var b = a.length,
      c = (3 * b) / 4;
    c % 3
      ? (c = Math.floor(c))
      : gb("=.", a[b - 1]) && (c = gb("=.", a[b - 2]) ? c - 2 : c - 1);
    var d = new Uint8Array(c),
      e = 0;
    ic(a, function (f) {
      d[e++] = f;
    });
    return e !== c ? d.subarray(0, e) : d;
  }
  function ic(a, b) {
    function c(k) {
      for (; d < a.length; ) {
        var l = a.charAt(d++),
          m = dc[l];
        if (null != m) return m;
        if (!/^[\s\xa0]*$/.test(l))
          throw Error("Unknown base64 encoding at char: " + l);
      }
      return k;
    }
    fc();
    for (var d = 0; ; ) {
      var e = c(-1),
        f = c(0),
        g = c(64),
        h = c(64);
      if (64 === h && -1 === e) break;
      b((e << 2) | (f >> 4));
      64 != g &&
        (b(((f << 4) & 240) | (g >> 2)), 64 != h && b(((g << 6) & 192) | h));
    }
  }
  function fc() {
    if (!dc) {
      dc = {};
      for (
        var a =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
              ""
            ),
          b = ["+/=", "+/", "-_=", "-_.", "-_"],
          c = 0;
        5 > c;
        c++
      ) {
        var d = a.concat(b[c].split(""));
        cc[c] = d;
        for (var e = 0; e < d.length; e++) {
          var f = d[e];
          void 0 === dc[f] && (dc[f] = e);
        }
      }
    }
  }
  var kc = "undefined" !== typeof Uint8Array;
  function mc(a) {
    return kc && null != a && a instanceof Uint8Array;
  }
  let pc;
  var qc = {};
  let rc;
  function sc(a) {
    if (a !== qc) throw Error("illegal external caller");
  }
  function tc() {
    return rc || (rc = new uc(null, qc));
  }
  var uc = class {
    constructor(a, b) {
      sc(b);
      this.O = a;
      if (null != a && 0 === a.length)
        throw Error("ByteString should be constructed with non-empty values");
    }
    isEmpty() {
      return null == this.O;
    }
  };
  const vc = Symbol();
  function wc(a, b) {
    if (vc) return (a[vc] |= b);
    if (void 0 !== a.ya) return (a.ya |= b);
    Object.defineProperties(a, {
      ya: { value: b, configurable: !0, writable: !0, enumerable: !1 },
    });
    return b;
  }
  function xc(a, b) {
    vc ? a[vc] && (a[vc] &= ~b) : void 0 !== a.ya && (a.ya &= ~b);
  }
  function yc(a) {
    let b;
    vc ? (b = a[vc]) : (b = a.ya);
    return null == b ? 0 : b;
  }
  function zc(a, b) {
    vc
      ? (a[vc] = b)
      : void 0 !== a.ya
      ? (a.ya = b)
      : Object.defineProperties(a, {
          ya: { value: b, configurable: !0, writable: !0, enumerable: !1 },
        });
  }
  function Ac(a) {
    wc(a, 1);
    return a;
  }
  function Bc(a) {
    return !!(yc(a) & 2);
  }
  function Cc(a) {
    wc(a, 16);
    return a;
  }
  function Dc(a, b) {
    zc(b, (yc(a) | 0) & -51);
  }
  function Ec(a, b) {
    zc(b, (yc(a) | 18) & -41);
  }
  function Fc(a, b) {
    const c = yc(a);
    (c & b) !== b &&
      (Object.isFrozen(a) && (a = Array.prototype.slice.call(a)), zc(a, c | b));
    return a;
  }
  var Gc = {};
  function Hc(a) {
    return (
      null !== a &&
      "object" === typeof a &&
      !Array.isArray(a) &&
      a.constructor === Object
    );
  }
  let Ic;
  function Jc(a, b) {
    if (null != a)
      if ("string" === typeof a) a = a ? new uc(a, qc) : tc();
      else if (a.constructor !== uc)
        if (mc(a)) a = a.length ? new uc(new Uint8Array(a), qc) : tc();
        else {
          if (!b) throw Error();
          a = void 0;
        }
    return a;
  }
  var Kc;
  const Lc = [];
  zc(Lc, 23);
  Kc = Object.freeze(Lc);
  function Mc(a) {
    if (Bc(a.U)) throw Error("Cannot mutate an immutable Message");
  }
  function Nc(a) {
    var b = a.length;
    (b = b ? a[b - 1] : void 0) && Hc(b) ? (b.g = 1) : a.push({ g: 1 });
  }
  function Oc(a, b, c = !1) {
    if (Array.isArray(a)) return new b(c ? Cc(a) : a);
  }
  let Pc;
  function Qc(a, b) {
    Pc = b;
    a = new a(b);
    Pc = void 0;
    return a;
  }
  function Rc(a) {
    switch (typeof a) {
      case "number":
        return isFinite(a) ? a : String(a);
      case "object":
        if (a)
          if (Array.isArray(a)) {
            if (0 !== (yc(a) & 128))
              return (a = Array.prototype.slice.call(a)), Nc(a), a;
          } else {
            if (mc(a)) return ec(a);
            if (a instanceof uc) {
              const b = a.O;
              return null == b ? "" : "string" === typeof b ? b : (a.O = ec(b));
            }
          }
    }
    return a;
  }
  function Sc(a, b, c, d) {
    if (null != a) {
      if (Array.isArray(a)) a = Tc(a, b, c, void 0 !== d);
      else if (Hc(a)) {
        const e = {};
        for (let f in a)
          Object.prototype.hasOwnProperty.call(a, f) &&
            (e[f] = Sc(a[f], b, c, d));
        a = e;
      } else a = b(a, d);
      return a;
    }
  }
  function Tc(a, b, c, d) {
    d = d ? !!(yc(a) & 16) : void 0;
    const e = Array.prototype.slice.call(a);
    for (let f = 0; f < e.length; f++) e[f] = Sc(e[f], b, c, d);
    c(a, e);
    return e;
  }
  function Uc(a) {
    return a.Zb === Gc ? a.toJSON() : Rc(a);
  }
  function Vc(a) {
    if (!a) return a;
    if ("object" === typeof a) {
      if (mc(a)) return new Uint8Array(a);
      if (a.Zb === Gc) return Wc(a);
    }
    return a;
  }
  function Xc(a, b) {
    0 !== (yc(a) & 128) && Nc(b);
  }
  function Yc(a) {
    return a.l || (a.l = a.U[a.A + a.Ia] = {});
  }
  function v(a, b, c) {
    return -1 === b
      ? null
      : b >= a.A
      ? a.l
        ? a.l[b]
        : void 0
      : c && a.l && ((c = a.l[b]), null != c)
      ? c
      : a.U[b + a.Ia];
  }
  function w(a, b, c, d) {
    Mc(a);
    return Zc(a, b, c, d);
  }
  function Zc(a, b, c, d) {
    a.C && (a.C = void 0);
    if (b >= a.A || d) return (Yc(a)[b] = c), a;
    a.U[b + a.Ia] = c;
    (c = a.l) && b in c && delete c[b];
    return a;
  }
  function $c(a, b) {
    return null != v(a, b, !1);
  }
  function ad(a, b, c) {
    return void 0 !== bd(a, b, c, !1);
  }
  function cd(a, b, c, d, e) {
    let f = v(a, b, d);
    Array.isArray(f) || (f = Kc);
    const g = yc(f);
    g & 1 || Ac(f);
    if (e) g & 2 || wc(f, 2), c & 1 || Object.freeze(f);
    else {
      e = !(c & 2);
      const h = g & 2;
      c & 1 || !h
        ? e && g & 16 && !h && xc(f, 16)
        : ((f = Ac(Array.prototype.slice.call(f))), Zc(a, b, f, d));
    }
    return f;
  }
  function dd(a, b) {
    return cd(a, b, 0, !1, Bc(a.U));
  }
  function ed(a, b) {
    a = v(a, b);
    return null == a ? a : +a;
  }
  function fd(a, b) {
    a = v(a, b);
    return null == a ? a : !!a;
  }
  function gd(a, b) {
    const c = Bc(a.U);
    let d = cd(a, b, 1, !1, c);
    const e = yc(d);
    if (!(e & 4)) {
      Object.isFrozen(d) && ((d = Ac(d.slice())), Zc(a, b, d, !1));
      let f = 0,
        g = 0;
      for (; f < d.length; f++) {
        const h = d[f];
        null != h && (d[g++] = h);
      }
      g < f && (d.length = g);
      wc(d, 5);
    }
    c && !Object.isFrozen(d)
      ? (wc(d, 2), Object.freeze(d))
      : !c &&
        (e & 2 || Object.isFrozen(d)) &&
        ((d = Array.prototype.slice.call(d)), wc(d, 5), hd(a, b, d, !1));
    return d;
  }
  function id(a, b) {
    a = v(a, b);
    return null == a ? 0 : a;
  }
  function hd(a, b, c, d) {
    c = null == c ? Kc : Fc(c, 1);
    return w(a, b, c, d);
  }
  function jd(a, b, c) {
    if (null == c) c = Kc;
    else {
      for (let d = 0; d < c.length; d++);
      c = Fc(c, 5);
    }
    return w(a, b, c);
  }
  function x(a, b, c, d) {
    Mc(a);
    c !== d ? Zc(a, b, c) : Zc(a, b, void 0, !1);
    return a;
  }
  function kd(a, b, c, d) {
    Mc(a);
    (c = ld(a, c)) && c !== b && null != d && Zc(a, c, void 0, !1);
    return Zc(a, b, d);
  }
  function ld(a, b) {
    let c = 0;
    for (let d = 0; d < b.length; d++) {
      const e = b[d];
      null != v(a, e) && (0 !== c && Zc(a, c, void 0, !1), (c = e));
    }
    return c;
  }
  function bd(a, b, c, d) {
    const e = v(a, c, d);
    {
      let g = !1;
      var f =
        null == e ||
        "object" !== typeof e ||
        (g = Array.isArray(e)) ||
        e.Zb !== Gc
          ? g
            ? new b(e)
            : void 0
          : e;
    }
    f !== e && null != f && (Zc(a, c, f, d), wc(f.U, yc(a.U) & -33));
    return f;
  }
  function z(a, b, c) {
    b = bd(a, b, c, !1);
    if (null == b) return b;
    if (!Bc(a.U)) {
      var d = md(b);
      d !== b && ((b = d), Zc(a, c, b, !1));
    }
    return b;
  }
  function nd(a, b, c, d, e, f) {
    a.ga || (a.ga = {});
    let g = a.ga[c],
      h = cd(a, c, 3, d, f);
    if (g)
      f ||
        (Object.isFrozen(g)
          ? e || ((g = Array.prototype.slice.call(g)), (a.ga[c] = g))
          : e && Object.freeze(g));
    else {
      g = [];
      const k = !!(yc(a.U) & 16),
        l = Bc(h);
      !f && l && ((h = Ac(Array.prototype.slice.call(h))), Zc(a, c, h, d));
      d = l;
      for (let m = 0; m < h.length; m++) {
        const n = h[m],
          q = Oc(n, b, k);
        void 0 !== q && ((d = d || Bc(n)), g.push(q), l && wc(q.U, 2));
      }
      a.ga[c] = g;
      a = h;
      Object.isFrozen(a) || ((b = yc(a) | 33), zc(a, d ? b & -9 : b | 8));
      (f || (e && l)) && wc(g, 2);
      (f || e) && Object.freeze(g);
    }
    return g;
  }
  function A(a, b, c, d) {
    var e = Bc(a.U);
    b = nd(a, b, c, d, e, e);
    a = cd(a, c, 3, d, e);
    if (!e && a && !(yc(a) & 8)) {
      for (e = 0; e < b.length; e++)
        (c = b[e]), (d = md(c)), c !== d && ((b[e] = d), (a[e] = b[e].U));
      wc(a, 8);
    }
    return b;
  }
  function od(a, b, c) {
    Mc(a);
    null == c && (c = void 0);
    return Zc(a, b, c);
  }
  function qd(a, b, c, d) {
    Mc(a);
    null == d && (d = void 0);
    return kd(a, b, c, d);
  }
  function rd(a, b, c, d) {
    Mc(a);
    let e;
    if (null != c) {
      e = Ac([]);
      let f = !1;
      for (let g = 0; g < c.length; g++) (e[g] = c[g].U), (f = f || Bc(e[g]));
      a.ga || (a.ga = {});
      a.ga[b] = c;
      c = e;
      f ? xc(c, 8) : wc(c, 8);
    } else a.ga && (a.ga[b] = void 0), (e = Kc);
    return Zc(a, b, e, d);
  }
  function sd(a, b, c, d) {
    Mc(a);
    const e = nd(a, c, b, void 0, !1, !1);
    c = null != d ? d : new c();
    b = cd(a, b, 2, void 0, !1);
    e.push(c);
    b.push(c.U);
    Bc(c.U) && xc(b, 8);
    return a;
  }
  function td(a, b) {
    return null == a ? b : a;
  }
  function B(a, b) {
    return td(v(a, b), "");
  }
  function F(a, b, c = !1) {
    return td(fd(a, b), c);
  }
  function ud(a, b) {
    return td(v(a, b), 0);
  }
  function vd(a, b) {
    return td(v(a, b), 0);
  }
  function wd(a, b, c, d) {
    c = ld(a, d) === c ? c : -1;
    return z(a, b, c);
  }
  function xd(a, b, c) {
    return x(a, b, c, !1);
  }
  function yd(a, b, c) {
    return x(a, b, c, 0);
  }
  function zd(a) {
    if (Bc(a) && Object.isFrozen(a)) return a;
    const b = wb(a, Ad);
    Ec(a, b);
    Object.freeze(b);
    return b;
  }
  function Bd(a, b) {
    if (null != a) {
      if (kc && a instanceof Uint8Array)
        return a.length ? new uc(new Uint8Array(a), qc) : tc();
      if (Array.isArray(a)) {
        if (Bc(a)) return a;
        b && ((b = yc(a)), (b = !(b & 32) && (!!(b & 16) || 0 === b)));
        if (b) return wc(a, 2), a;
        a = Tc(a, Bd, Ec);
        yc(a) & 4 && Object.freeze(a);
        return a;
      }
      return a.Zb === Gc ? Ad(a) : a;
    }
  }
  function Ad(a) {
    if (Bc(a.U)) return a;
    a = Cd(a);
    wc(a.U, 2);
    return a;
  }
  function Cd(a) {
    const b = a.U;
    var c = Cc([]),
      d = a.constructor.messageId;
    d && c.push(d);
    0 !== (yc(b) & 128) && Nc(c);
    c = Qc(a.constructor, c);
    a.xb && (c.xb = a.xb.slice());
    d = !!(yc(b) & 16);
    for (let l = 0; l < b.length; l++) {
      var e = b[l];
      if (l === b.length - 1 && Hc(e))
        for (const m in e) {
          var f = +m;
          if (Number.isNaN(f)) Yc(c)[f] = e[f];
          else {
            var g = c,
              h = e[m],
              k = d;
            const n = a.ga && a.ga[f];
            n ? rd(g, f, zd(n), !0) : w(g, f, Bd(h, k), !0);
          }
        }
      else
        (g = c),
          (f = l - a.Ia),
          (h = d),
          (k = a.ga && a.ga[f]) ? rd(g, f, zd(k), !1) : w(g, f, Bd(e, h), !1);
    }
    return c;
  }
  function md(a) {
    if (!Bc(a.U)) return a;
    const b = Cd(a);
    b.C = a;
    return b;
  }
  function Dd(a, b) {
    if (null == b || "" == b) return new a();
    b = JSON.parse(b);
    if (!Array.isArray(b)) throw Error(void 0);
    return Qc(a, Cc(b));
  }
  function Wc(a) {
    var b = Tc(a.U, Vc, Dc);
    Cc(b);
    Pc = b;
    b = new a.constructor(b);
    Pc = void 0;
    Ed(b, a);
    return b;
  }
  function Fd(a) {
    Ic = !0;
    try {
      return JSON.stringify(a.toJSON(), Gd);
    } finally {
      Ic = !1;
    }
  }
  var J = class {
    constructor(a, b, c) {
      null == a && (a = Pc);
      Pc = void 0;
      var d = this.constructor.j || 0,
        e = 0 < d,
        f = this.constructor.messageId,
        g = !1;
      if (null == a) {
        a = f ? [f] : [];
        var h = !0;
        zc(a, 48);
      } else {
        if (!Array.isArray(a)) throw Error();
        if (f && f !== a[0]) throw Error();
        const k = wc(a, 0);
        let l = k;
        if ((h = 0 !== (16 & l))) (g = 0 !== (32 & l)) || (l |= 32);
        if (e)
          if (128 & l) d = 0;
          else {
            if (0 < a.length) {
              const m = a[a.length - 1];
              if (Hc(m) && "g" in m) {
                d = 0;
                l |= 128;
                delete m.g;
                let n = !0;
                for (let q in m) {
                  n = !1;
                  break;
                }
                n && a.pop();
              }
            }
          }
        else if (128 & l) throw Error();
        k !== l && zc(a, l);
      }
      this.Ia = (f ? 0 : -1) - d;
      this.ga = void 0;
      this.U = a;
      a: {
        f = this.U.length;
        d = f - 1;
        if (f && ((f = this.U[d]), Hc(f))) {
          this.l = f;
          this.A = d - this.Ia;
          break a;
        }
        void 0 !== b && -1 < b
          ? ((this.A = Math.max(b, d + 1 - this.Ia)), (this.l = void 0))
          : (this.A = Number.MAX_VALUE);
      }
      if (!e && this.l && "g" in this.l)
        throw Error(
          'Unexpected "g" flag in sparse object of message that is not a group type.'
        );
      if (c) {
        b = h && !g && !0;
        e = this.A;
        let k;
        for (h = 0; h < c.length; h++)
          (g = c[h]),
            g < e
              ? ((g += this.Ia), (d = a[g]) ? Hd(d, b) : (a[g] = Kc))
              : (k || (k = Yc(this)), (d = k[g]) ? Hd(d, b) : (k[g] = Kc));
      }
    }
    toJSON() {
      const a = this.U;
      return Ic ? a : Tc(a, Uc, Xc);
    }
  };
  function Hd(a, b) {
    if (Array.isArray(a)) {
      var c = yc(a),
        d = 1;
      !b || c & 2 || (d |= 16);
      (c & d) !== d && zc(a, c | d);
    }
  }
  J.prototype.Zb = Gc;
  function Gd(a, b) {
    return Rc(b);
  }
  function Ed(a, b) {
    b.xb && (a.xb = b.xb.slice());
    const c = b.ga;
    if (c) {
      b = b.l;
      for (let f in c) {
        if (!Object.prototype.hasOwnProperty.call(c, f)) continue;
        const g = c[f];
        if (g) {
          var d = !(!b || !b[f]),
            e = +f;
          if (Array.isArray(g)) {
            if (g.length)
              for (
                d = A(a, g[0].constructor, e, d), e = 0;
                e < Math.min(d.length, g.length);
                e++
              )
                Ed(d[e], g[e]);
          } else throw Error("unexpected object: type: " + za(g) + ": " + g);
        }
      }
    }
  }
  const Id = (a) => null !== a && void 0 !== a;
  let Jd = void 0;
  function Kd(a, b) {
    const c = Jd;
    Jd = void 0;
    if (!b(a)) throw ((b = c ? c() + "\n" : ""), Error(b + String(a)));
  }
  function Ld(a, b) {
    this.j = (a === Md && b) || "";
    this.l = Nd;
  }
  Ld.prototype.sa = !0;
  Ld.prototype.la = function () {
    return this.j;
  };
  function Od(a) {
    return a instanceof Ld && a.constructor === Ld && a.l === Nd
      ? a.j
      : "type_error:Const";
  }
  function Pd(a) {
    return new Ld(Md, a);
  }
  var Nd = {},
    Md = {};
  var Qd = Pd("https://tpc.googlesyndication.com/sodar/%{basename}.js");
  function Rd() {
    return !1;
  }
  function Sd() {
    return !0;
  }
  function Td(a) {
    const b = arguments,
      c = b.length;
    return function () {
      for (let d = 0; d < c; d++) if (!b[d].apply(this, arguments)) return !1;
      return !0;
    };
  }
  function Ud(a) {
    return function () {
      return !a.apply(this, arguments);
    };
  }
  function Vd(a) {
    let b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  }
  function Wd(a) {
    let b = a;
    return function () {
      if (b) {
        const c = b;
        b = null;
        c();
      }
    };
  }
  function Xd(a, b) {
    let c = 0;
    return function (d) {
      t.clearTimeout(c);
      const e = arguments;
      c = t.setTimeout(function () {
        a.apply(b, e);
      }, 63);
    };
  }
  function Yd(a, b) {
    function c() {
      e = t.setTimeout(d, 63);
      let h = g;
      g = [];
      a.apply(b, h);
    }
    function d() {
      e = 0;
      f && ((f = !1), c());
    }
    let e = 0,
      f = !1,
      g = [];
    return function (h) {
      g = arguments;
      e ? (f = !0) : c();
    };
  }
  var Zd = { passive: !0 },
    fe = Vd(function () {
      let a = !1;
      try {
        const b = Object.defineProperty({}, "passive", {
          get: function () {
            a = !0;
          },
        });
        t.addEventListener("test", null, b);
      } catch (b) {}
      return a;
    });
  function ge(a) {
    return a ? (a.passive && fe() ? a : a.capture || !1) : !1;
  }
  function L(a, b, c, d) {
    return a.addEventListener ? (a.addEventListener(b, c, ge(d)), !0) : !1;
  }
  function he(a, b, c, d) {
    return a.removeEventListener
      ? (a.removeEventListener(b, c, ge(d)), !0)
      : !1;
  }
  function ie(a, b) {
    for (const c in a) b.call(void 0, a[c], c, a);
  }
  function je(a, b) {
    const c = {};
    for (const d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
    return c;
  }
  function ke(a) {
    var b = le;
    a: {
      for (const c in b)
        if (b[c] == a) {
          a = !0;
          break a;
        }
      a = !1;
    }
    return a;
  }
  function me(a) {
    const b = [];
    let c = 0;
    for (const d in a) b[c++] = a[d];
    return b;
  }
  function ne(a) {
    const b = {};
    for (const c in a) b[c] = a[c];
    return b;
  }
  const oe =
    "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
      " "
    );
  function pe(a, b) {
    let c, d;
    for (let e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (let f = 0; f < oe.length; f++)
        (c = oe[f]),
          Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  var qe = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  };
  var re;
  function se() {
    if (void 0 === re) {
      var a = null,
        b = t.trustedTypes;
      if (b && b.createPolicy) {
        try {
          a = b.createPolicy("goog#html", {
            createHTML: Sa,
            createScript: Sa,
            createScriptURL: Sa,
          });
        } catch (c) {
          t.console && t.console.error(c.message);
        }
        re = a;
      } else re = a;
    }
    return re;
  }
  const te = {};
  function ue(a) {
    return a instanceof ve && a.constructor === ve
      ? a.j
      : "type_error:SafeScript";
  }
  class ve {
    constructor(a, b) {
      this.j = b === te ? a : "";
      this.sa = !0;
    }
    toString() {
      return this.j.toString();
    }
    la() {
      return this.j.toString();
    }
  }
  var xe = class {
    constructor(a, b) {
      this.j = b === we ? a : "";
    }
    toString() {
      return this.j + "";
    }
  };
  xe.prototype.sa = !0;
  xe.prototype.la = function () {
    return this.j.toString();
  };
  function ye(a, b) {
    a = ze.exec(Ae(a).toString());
    var c = a[3] || "";
    return Be(a[1] + Ce("?", a[2] || "", b) + Ce("#", c));
  }
  function Ae(a) {
    return a instanceof xe && a.constructor === xe
      ? a.j
      : "type_error:TrustedResourceUrl";
  }
  function De(a, b) {
    var c = Od(a);
    if (!Ee.test(c)) throw Error("Invalid TrustedResourceUrl format: " + c);
    a = c.replace(Fe, function (d, e) {
      if (!Object.prototype.hasOwnProperty.call(b, e))
        throw Error(
          'Found marker, "' +
            e +
            '", in format string, "' +
            c +
            '", but no valid label mapping found in args: ' +
            JSON.stringify(b)
        );
      d = b[e];
      return d instanceof Ld ? Od(d) : encodeURIComponent(String(d));
    });
    return Be(a);
  }
  var Fe = /%{(\w+)}/g,
    Ee = RegExp(
      "^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)",
      "i"
    ),
    ze = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/,
    we = {};
  function Be(a) {
    const b = se();
    a = b ? b.createScriptURL(a) : a;
    return new xe(a, we);
  }
  function Ce(a, b, c) {
    if (null == c) return b;
    if ("string" === typeof c) return c ? a + encodeURIComponent(c) : "";
    for (var d in c)
      if (Object.prototype.hasOwnProperty.call(c, d)) {
        var e = c[d];
        e = Array.isArray(e) ? e : [e];
        for (var f = 0; f < e.length; f++) {
          var g = e[f];
          null != g &&
            (b || (b = a),
            (b +=
              (b.length > a.length ? "&" : "") +
              encodeURIComponent(d) +
              "=" +
              encodeURIComponent(String(g))));
        }
      }
    return b;
  }
  var He = class {
    constructor(a, b) {
      this.j = b === Ge ? a : "";
    }
    toString() {
      return this.j.toString();
    }
  };
  He.prototype.sa = !0;
  He.prototype.la = function () {
    return this.j.toString();
  };
  function Ie(a) {
    return a instanceof He && a.constructor === He ? a.j : "type_error:SafeUrl";
  }
  var Je = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
    Ke = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
  function Le(a) {
    if (a instanceof He) return a;
    a = "object" == typeof a && a.sa ? a.la() : String(a);
    Ke.test(a)
      ? (a = new He(a, Ge))
      : ((a = String(a).replace(/(%0A|%0D)/g, "")),
        (a = a.match(Je) ? new He(a, Ge) : null));
    return a;
  }
  var Ge = {},
    Me = new He("about:invalid#zClosurez", Ge);
  const Ne = {};
  function Oe(a) {
    return a instanceof Pe && a.constructor === Pe
      ? a.j
      : "type_error:SafeStyle";
  }
  function Qe(a) {
    let b = "";
    for (let c in a)
      if (Object.prototype.hasOwnProperty.call(a, c)) {
        if (!/^[-_a-zA-Z0-9]+$/.test(c))
          throw Error(`Name allows only [-_a-zA-Z0-9], got: ${c}`);
        let d = a[c];
        null != d &&
          ((d = Array.isArray(d) ? d.map(Re).join(" ") : Re(d)),
          (b += `${c}:${d};`));
      }
    return b ? new Pe(b, Ne) : Se;
  }
  class Pe {
    constructor(a, b) {
      this.j = b === Ne ? a : "";
      this.sa = !0;
    }
    la() {
      return this.j;
    }
    toString() {
      return this.j.toString();
    }
  }
  var Se = new Pe("", Ne);
  function Re(a) {
    if (a instanceof He)
      return (
        'url("' + Ie(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")'
      );
    if (a instanceof Ld) a = Od(a);
    else {
      a = String(a);
      var b = a.replace(Te, "$1").replace(Te, "$1").replace(Ue, "url");
      if (Ve.test(b)) {
        if ((b = !We.test(a))) {
          let c = (b = !0);
          for (let d = 0; d < a.length; d++) {
            const e = a.charAt(d);
            "'" == e && c ? (b = !b) : '"' == e && b && (c = !c);
          }
          b = b && c && Xe(a);
        }
        a = b ? Ye(a) : "zClosurez";
      } else a = "zClosurez";
    }
    if (/[{;}]/.test(a))
      throw new Wa("Value does not allow [{;}], got: %s.", [a]);
    return a;
  }
  function Xe(a) {
    let b = !0;
    const c = /^[-_a-zA-Z0-9]$/;
    for (let d = 0; d < a.length; d++) {
      const e = a.charAt(d);
      if ("]" == e) {
        if (b) return !1;
        b = !0;
      } else if ("[" == e) {
        if (!b) return !1;
        b = !1;
      } else if (!b && !c.test(e)) return !1;
    }
    return b;
  }
  const Ve = RegExp("^[-,.\"'%_!#/ a-zA-Z0-9\\[\\]]+$"),
    Ue = RegExp(
      "\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))",
      "g"
    ),
    Te = RegExp(
      "\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|radial-gradient|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|steps|var)\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)",
      "g"
    ),
    We = /\/\*/;
  function Ye(a) {
    return a.replace(Ue, (b, c, d, e) => {
      let f = "";
      d = d.replace(/^(['"])(.*)\1$/, (g, h, k) => {
        f = h;
        return k;
      });
      b = (Le(d) || Me).la();
      return c + f + b + f + e;
    });
  }
  const Ze = {};
  function $e(a) {
    return a instanceof af && a.constructor === af
      ? a.j
      : "type_error:SafeStyleSheet";
  }
  class af {
    constructor(a, b) {
      this.j = b === Ze ? a : "";
      this.sa = !0;
    }
    toString() {
      return this.j.toString();
    }
    la() {
      return this.j;
    }
  }
  const bf = {};
  function cf(a) {
    return a instanceof df && a.constructor === df
      ? a.j
      : "type_error:SafeHtml";
  }
  function ef(a) {
    return a instanceof df
      ? a
      : ff(Ya("object" == typeof a && a.sa ? a.la() : String(a)));
  }
  function ff(a) {
    const b = se();
    a = b ? b.createHTML(a) : a;
    return new df(a, bf);
  }
  function gf(a, b, c) {
    var d = String(a);
    if (!hf.test(d)) throw Error("");
    if (d.toUpperCase() in jf) throw Error("");
    return kf(String(a), b, c);
  }
  function kf(a, b, c) {
    var d = "";
    if (b)
      for (let g in b)
        if (Object.prototype.hasOwnProperty.call(b, g)) {
          if (!hf.test(g)) throw Error("");
          var e = b[g];
          if (null != e) {
            var f = g;
            if (e instanceof Ld) e = Od(e);
            else if ("style" == f.toLowerCase()) {
              if (!Ca(e)) throw Error("");
              e instanceof Pe || (e = Qe(e));
              e = Oe(e);
            } else {
              if (/^on/i.test(f)) throw Error("");
              if (f.toLowerCase() in lf)
                if (e instanceof xe) e = Ae(e).toString();
                else if (e instanceof He) e = Ie(e);
                else if ("string" === typeof e) e = (Le(e) || Me).la();
                else throw Error("");
            }
            e.sa && (e = e.la());
            f = `${f}="` + Ya(String(e)) + '"';
            d += " " + f;
          }
        }
    b = `<${a}` + d;
    null == c ? (c = []) : Array.isArray(c) || (c = [c]);
    !0 === qe[a.toLowerCase()]
      ? (b += ">")
      : ((c = mf(c)), (b += ">" + cf(c).toString() + "</" + a + ">"));
    return ff(b);
  }
  function nf(a) {
    const b = ef(of),
      c = [],
      d = (e) => {
        Array.isArray(e)
          ? e.forEach(d)
          : ((e = ef(e)), c.push(cf(e).toString()));
      };
    a.forEach(d);
    return ff(c.join(cf(b).toString()));
  }
  function mf(a) {
    return nf(Array.prototype.slice.call(arguments));
  }
  class df {
    constructor(a, b) {
      this.j = b === bf ? a : "";
      this.sa = !0;
    }
    la() {
      return this.j.toString();
    }
    toString() {
      return this.j.toString();
    }
  }
  const hf = /^[a-zA-Z0-9-]+$/,
    lf = {
      action: !0,
      cite: !0,
      data: !0,
      formaction: !0,
      href: !0,
      manifest: !0,
      poster: !0,
      src: !0,
    },
    jf = {
      APPLET: !0,
      BASE: !0,
      EMBED: !0,
      IFRAME: !0,
      LINK: !0,
      MATH: !0,
      META: !0,
      OBJECT: !0,
      SCRIPT: !0,
      STYLE: !0,
      SVG: !0,
      TEMPLATE: !0,
    };
  var pf = ff("<!DOCTYPE html>"),
    of = new df((t.trustedTypes && t.trustedTypes.emptyHTML) || "", bf),
    qf = ff("<br>"); /* 
 
 SPDX-License-Identifier: Apache-2.0 
*/
  function rf(a) {
    a: {
      try {
        var b = new URL(a);
      } catch (c) {
        b = "https:";
        break a;
      }
      b = b.protocol;
    }
    if ("javascript:" !== b) return a;
  }
  function sf(a) {
    var b = tf(Ff) || Me;
    b = b instanceof He ? Ie(b) : rf(b);
    void 0 !== b && (a.href = b);
  }
  function Gf(a, b = `unexpected value ${a}!`) {
    throw Error(b);
  }
  const Hf =
    "alternate author bookmark canonical cite help icon license next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(
      " "
    );
  function If(a, b, c) {
    if (b instanceof xe) a.href = Ae(b).toString();
    else {
      if (-1 === Hf.indexOf(c))
        throw Error(
          `TrustedResourceUrl href attribute required with rel="${c}"`
        );
      b = b instanceof He ? Ie(b) : rf(b);
      if (void 0 === b) return;
      a.href = b;
    }
    a.rel = c;
  }
  function Jf(a) {
    var b;
    (b = (b = (
      (a.ownerDocument && a.ownerDocument.defaultView) ||
      window
    ).document.querySelector?.("script[nonce]"))
      ? b.nonce || b.getAttribute("nonce") || ""
      : "") && a.setAttribute("nonce", b);
  }
  function Kf(a, b) {
    a.src = Ae(b);
    Jf(a);
  }
  class Lf {
    constructor(a) {
      this.pf = a;
    }
  }
  function Mf(a) {
    return new Lf((b) => b.substr(0, a.length + 1).toLowerCase() === a + ":");
  }
  const Ff = [
    Mf("data"),
    Mf("http"),
    Mf("https"),
    Mf("mailto"),
    Mf("ftp"),
    new Lf((a) => /^[^:]*([/?#]|$)/.test(a)),
  ];
  function tf(a = Ff) {
    for (let b = 0; b < a.length; ++b) {
      const c = a[b];
      if (c instanceof Lf && c.pf("#")) return new He("#", Ge);
    }
  }
  function Nf(a) {
    var b = window;
    new Promise((c, d) => {
      function e() {
        f.onload = null;
        f.onerror = null;
        f.parentElement?.removeChild(f);
      }
      const f = b.document.createElement("script");
      f.onload = () => {
        e();
        c();
      };
      f.onerror = () => {
        e();
        d(void 0);
      };
      f.type = "text/javascript";
      Kf(f, a);
      "complete" !== b.document.readyState
        ? L(b, "load", () => {
            b.document.body.appendChild(f);
          })
        : b.document.body.appendChild(f);
    });
  }
  async function Of(a) {
    var b =
      "https://pagead2.googlesyndication.com/getconfig/sodar" +
      `?sv=${200}&tid=${a.j}` +
      `&tv=${a.l}&st=` +
      `${a.ib}`;
    let c = void 0;
    try {
      c = await Pf(b);
    } catch (g) {}
    if (c) {
      b = a.yb || c.sodar_query_id;
      var d = void 0 !== c.rc_enable && a.A ? c.rc_enable : "n",
        e = void 0 === c.bg_snapshot_delay_ms ? "0" : c.bg_snapshot_delay_ms,
        f = void 0 === c.is_gen_204 ? "1" : c.is_gen_204;
      if (b && c.bg_hash_basename && c.bg_binary)
        return {
          context: a.B,
          Le: c.bg_hash_basename,
          Ke: c.bg_binary,
          qf: a.j + "_" + a.l,
          yb: b,
          ib: a.ib,
          Xb: d,
          nc: e,
          Vb: f,
        };
    }
  }
  let Pf = (a) =>
    new Promise((b, c) => {
      const d = new XMLHttpRequest();
      d.onreadystatechange = () => {
        d.readyState === d.DONE &&
          (200 <= d.status && 300 > d.status
            ? b(JSON.parse(d.responseText))
            : c());
      };
      d.open("GET", a, !0);
      d.send();
    });
  async function Qf(a) {
    var b = await Of(a);
    if (b) {
      a = window;
      let c = a.GoogleGcLKhOms;
      (c && "function" === typeof c.push) || (c = a.GoogleGcLKhOms = []);
      c.push({
        _ctx_: b.context,
        _bgv_: b.Le,
        _bgp_: b.Ke,
        _li_: b.qf,
        _jk_: b.yb,
        _st_: b.ib,
        _rc_: b.Xb,
        _dl_: b.nc,
        _g2_: b.Vb,
      });
      if ((b = a.GoogleDX5YKUSk)) (a.GoogleDX5YKUSk = void 0), b[1]();
      a = De(Qd, { basename: "sodar2" });
      Nf(a);
    }
  }
  function Rf(a, b) {
    return od(a, 5, b);
  }
  function Sf(a, b) {
    return x(a, 3, b, "");
  }
  var Tf = class extends J {
    constructor() {
      super();
    }
  };
  function Uf(a, b) {
    return x(a, 1, b, "");
  }
  var Vf = class extends J {
    constructor(a) {
      super(a);
    }
    j() {
      return B(this, 1);
    }
  };
  function Wf(a) {
    switch (a) {
      case 1:
        return "gda";
      case 2:
        return "gpt";
      case 3:
        return "ima";
      case 4:
        return "pal";
      case 5:
        return "xfad";
      case 6:
        return "dv3n";
      case 7:
        return "spa";
      default:
        return "unk";
    }
  }
  var Xf = class {
      constructor(a) {
        this.j = a.l;
        this.l = a.A;
        this.B = a.B;
        this.yb = a.yb;
        this.win = a.T();
        this.ib = a.ib;
        this.Xb = a.Xb;
        this.nc = a.nc;
        this.Vb = a.Vb;
        this.A = a.j;
      }
    },
    Yf = class {
      constructor(a, b, c) {
        this.l = a;
        this.A = b;
        this.B = c;
        this.win = window;
        this.ib = "env";
        this.Xb = "n";
        this.nc = "0";
        this.Vb = "1";
        this.j = !0;
      }
      T() {
        return this.win;
      }
      build() {
        return new Xf(this);
      }
    };
  var $f = class extends J {
      constructor(a) {
        super(a, -1, Zf);
      }
    },
    Zf = [2, 3];
  function ag(a, b) {
    return w(a, 1, b);
  }
  function bg(a, b) {
    return w(a, 2, b);
  }
  function cg(a, b) {
    return w(a, 3, b);
  }
  function dg(a, b) {
    return w(a, 4, b);
  }
  var eg = class extends J {
    constructor() {
      super();
    }
    getVersion() {
      return v(this, 5);
    }
  };
  var fg = window;
  var gg = {
    fg: "google_adtest",
    jg: "google_ad_client",
    kg: "google_ad_format",
    mg: "google_ad_height",
    zg: "google_ad_width",
    qg: "google_ad_layout",
    rg: "google_ad_layout_key",
    sg: "google_ad_output",
    tg: "google_ad_region",
    wg: "google_ad_slot",
    xg: "google_ad_type",
    yg: "google_ad_url",
    Ag: "google_allow_expandable_ads",
    Sg: "google_analytics_domain_name",
    Tg: "google_analytics_uacct",
    jh: "google_container_id",
    wh: "google_gl",
    Qh: "google_enable_ose",
    ai: "google_full_width_responsive",
    aj: "google_rl_filtering",
    Zi: "google_rl_mode",
    bj: "google_rt",
    Yi: "google_rl_dest_url",
    Gi: "google_max_radlink_len",
    Li: "google_num_radlinks",
    Mi: "google_num_radlinks_per_unit",
    ig: "google_ad_channel",
    Fi: "google_max_num_ads",
    Hi: "google_max_responsive_height",
    eh: "google_color_border",
    Ph: "google_enable_content_recommendations",
    sh: "google_content_recommendation_ui_type",
    rh: "google_source_type",
    qh: "google_content_recommendation_rows_num",
    oh: "google_content_recommendation_columns_num",
    mh: "google_content_recommendation_ad_positions",
    th: "google_content_recommendation_use_square_imgs",
    gh: "google_color_link",
    fh: "google_color_line",
    ih: "google_color_url",
    gg: "google_ad_block",
    vg: "google_ad_section",
    hg: "google_ad_callback",
    Zg: "google_captcha_token",
    hh: "google_color_text",
    Mg: "google_alternate_ad_url",
    pg: "google_ad_host_tier_id",
    ah: "google_city",
    ng: "google_ad_host",
    og: "google_ad_host_channel",
    Ng: "google_alternate_color",
    bh: "google_color_bg",
    Rh: "google_encoding",
    Yh: "google_font_face",
    zh: "google_cust_ch",
    Ch: "google_cust_job",
    Bh: "google_cust_interests",
    Ah: "google_cust_id",
    Dh: "google_cust_u_url",
    ci: "google_hints",
    ti: "google_image_size",
    Ii: "google_mtl",
    Dj: "google_cpm",
    lh: "google_contents",
    Ki: "google_native_settings_key",
    uh: "google_country",
    vj: "google_targeting",
    Zh: "google_font_size",
    Gh: "google_disable_video_autoplay",
    Qj: "google_video_product_type",
    Pj: "google_video_doc_id",
    Oj: "google_cust_gender",
    qj: "google_cust_lh",
    pj: "google_cust_l",
    Cj: "google_tfs",
    Ji: "google_native_ad_template",
    yi: "google_kw",
    sj: "google_tag_for_child_directed_treatment",
    tj: "google_tag_for_under_age_of_consent",
    dj: "google_region",
    yh: "google_cust_criteria",
    ug: "google_safe",
    xh: "google_ctr_threshold",
    ej: "google_resizing_allowed",
    gj: "google_resizing_width",
    fj: "google_resizing_height",
    Nj: "google_cust_age",
    LANGUAGE: "google_language",
    zi: "google_kw_type",
    Ri: "google_pucrd",
    Qi: "google_page_url",
    uj: "google_tag_partner",
    kj: "google_restrict_data_processing",
    bg: "google_adbreak_test",
    lg: "google_ad_frequency_hint",
    dg: "google_admob_interstitial_slot",
    eg: "google_admob_rewarded_slot",
    cg: "google_admob_ads_only",
    Ei: "google_max_ad_content_rating",
    Ui: "google_ad_public_floor",
    Si: "google_ad_private_floor",
    Mj: "google_traffic_source",
    oj: "google_shadow_mode",
  };
  var hg = Vd(function () {
    var a = document.createElement("div"),
      b = document.createElement("div");
    b.appendChild(document.createElement("div"));
    a.appendChild(b);
    b = a.firstChild.firstChild;
    a.innerHTML = cf(of);
    return !b.parentElement;
  });
  function ig(a, b) {
    if (hg()) for (; a.lastChild; ) a.removeChild(a.lastChild);
    a.innerHTML = cf(b);
  }
  var jg = /^[\w+/_-]+[=]{0,2}$/;
  function kg(a, b) {
    b = (b || t).document;
    return b.querySelector
      ? (a = b.querySelector(a)) &&
        (a = a.nonce || a.getAttribute("nonce")) &&
        jg.test(a)
        ? a
        : ""
      : "";
  }
  function lg(a, b, c) {
    return Math.min(Math.max(a, b), c);
  }
  function mg(a) {
    return Array.prototype.reduce.call(
      arguments,
      function (b, c) {
        return b + c;
      },
      0
    );
  }
  function ng(a) {
    return mg.apply(null, arguments) / arguments.length;
  }
  function og(a, b) {
    this.x = void 0 !== a ? a : 0;
    this.y = void 0 !== b ? b : 0;
  }
  og.prototype.ceil = function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  };
  og.prototype.floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  };
  og.prototype.round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };
  function pg(a, b) {
    this.width = a;
    this.height = b;
  }
  function qg(a, b) {
    return a == b
      ? !0
      : a && b
      ? a.width == b.width && a.height == b.height
      : !1;
  }
  p = pg.prototype;
  p.aspectRatio = function () {
    return this.width / this.height;
  };
  p.isEmpty = function () {
    return !(this.width * this.height);
  };
  p.ceil = function () {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  p.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  p.round = function () {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  function rg(a, b) {
    const c = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"' };
    let d;
    d = b ? b.createElement("div") : t.document.createElement("div");
    return a.replace(sg, function (e, f) {
      var g = c[e];
      if (g) return g;
      "#" == f.charAt(0) &&
        ((f = Number("0" + f.slice(1))),
        isNaN(f) || (g = String.fromCharCode(f)));
      g ||
        ((g = ff(e + " ")),
        ig(d, g),
        (g = d.firstChild.nodeValue.slice(0, -1)));
      return (c[e] = g);
    });
  }
  var sg = /&([^;\s<&]+);?/g;
  function tg(a) {
    let b = 0;
    for (let c = 0; c < a.length; ++c) b = (31 * b + a.charCodeAt(c)) >>> 0;
    return b;
  }
  function ug(a) {
    return String(a).replace(/\-([a-z])/g, function (b, c) {
      return c.toUpperCase();
    });
  }
  function vg(a) {
    return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function (b, c, d) {
      return c + d.toUpperCase();
    });
  }
  function wg(a) {
    return a ? new xg(yg(a)) : Va || (Va = new xg());
  }
  function zg(a, b) {
    ie(b, function (c, d) {
      c && "object" == typeof c && c.sa && (c = c.la());
      "style" == d
        ? (a.style.cssText = c)
        : "class" == d
        ? (a.className = c)
        : "for" == d
        ? (a.htmlFor = c)
        : Ag.hasOwnProperty(d)
        ? a.setAttribute(Ag[d], c)
        : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0)
        ? a.setAttribute(d, c)
        : (a[d] = c);
    });
  }
  var Ag = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width",
  };
  function Bg(a) {
    a = a.document;
    a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
    return new pg(a.clientWidth, a.clientHeight);
  }
  function Cg(a) {
    var b = a.scrollingElement
      ? a.scrollingElement
      : Sb || "CSS1Compat" != a.compatMode
      ? a.body || a.documentElement
      : a.documentElement;
    a = a.parentWindow || a.defaultView;
    return Ob && a.pageYOffset != b.scrollTop
      ? new og(b.scrollLeft, b.scrollTop)
      : new og(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
  }
  function Dg(a) {
    return a ? a.parentWindow || a.defaultView : window;
  }
  function Eg(a, b, c, d) {
    function e(h) {
      h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h);
    }
    for (; d < c.length; d++) {
      var f = c[d];
      if (!Ba(f) || (Ca(f) && 0 < f.nodeType)) e(f);
      else {
        a: {
          if (f && "number" == typeof f.length) {
            if (Ca(f)) {
              var g = "function" == typeof f.item || "string" == typeof f.item;
              break a;
            }
            if ("function" === typeof f) {
              g = "function" == typeof f.item;
              break a;
            }
          }
          g = !1;
        }
        ub(g ? Db(f) : f, e);
      }
    }
  }
  function Fg(a, b) {
    b = String(b);
    "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
    return a.createElement(b);
  }
  function Gg(a, b) {
    var c = Fg(a, "DIV");
    Ob ? ((b = mf(qf, b)), ig(c, b), c.removeChild(c.firstChild)) : ig(c, b);
    if (1 == c.childNodes.length) c = c.removeChild(c.firstChild);
    else {
      for (a = a.createDocumentFragment(); c.firstChild; )
        a.appendChild(c.firstChild);
      c = a;
    }
    return c;
  }
  function Hg(a) {
    var b,
      c = arguments.length;
    if (!c) return null;
    if (1 == c) return arguments[0];
    var d = [],
      e = Infinity;
    for (b = 0; b < c; b++) {
      for (var f = [], g = arguments[b]; g; ) f.unshift(g), (g = g.parentNode);
      d.push(f);
      e = Math.min(e, f.length);
    }
    f = null;
    for (b = 0; b < e; b++) {
      g = d[0][b];
      for (var h = 1; h < c; h++) if (g != d[h][b]) return f;
      f = g;
    }
    return f;
  }
  function yg(a) {
    return 9 == a.nodeType ? a : a.ownerDocument || a.document;
  }
  var Ig = { SCRIPT: 1, STYLE: 1, HEAD: 1, IFRAME: 1, OBJECT: 1 },
    Jg = { IMG: " ", BR: "\n" };
  function Kg(a) {
    var b = [];
    Lg(a, b, !0);
    a = b.join("");
    a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
    a = a.replace(/\u200B/g, "");
    a = a.replace(/ +/g, " ");
    " " != a && (a = a.replace(/^\s*/, ""));
    return a;
  }
  function Lg(a, b, c) {
    if (!(a.nodeName in Ig))
      if (3 == a.nodeType)
        c
          ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
          : b.push(a.nodeValue);
      else if (a.nodeName in Jg) b.push(Jg[a.nodeName]);
      else for (a = a.firstChild; a; ) Lg(a, b, c), (a = a.nextSibling);
  }
  function Mg(a, b, c) {
    if (!b && !c) return null;
    var d = b ? String(b).toUpperCase() : null;
    return Ng(a, function (e) {
      return (
        (!d || e.nodeName == d) &&
        (!c ||
          ("string" === typeof e.className && Ab(e.className.split(/\s+/), c)))
      );
    });
  }
  function Ng(a, b) {
    for (var c = 0; a; ) {
      if (b(a)) return a;
      a = a.parentNode;
      c++;
    }
    return null;
  }
  function xg(a) {
    this.j = a || t.document || document;
  }
  p = xg.prototype;
  p.ef = function (a) {
    return "string" === typeof a ? this.j.getElementById(a) : a;
  };
  p.ag = xg.prototype.ef;
  p.getElementsByTagName = function (a, b) {
    return (b || this.j).getElementsByTagName(String(a));
  };
  p.ia = function (a, b, c) {
    var d = this.j,
      e = arguments,
      f = e[1],
      g = Fg(d, String(e[0]));
    f &&
      ("string" === typeof f
        ? (g.className = f)
        : Array.isArray(f)
        ? (g.className = f.join(" "))
        : zg(g, f));
    2 < e.length && Eg(d, g, e, 2);
    return g;
  };
  p.createElement = function (a) {
    return Fg(this.j, a);
  };
  p.createTextNode = function (a) {
    return this.j.createTextNode(String(a));
  };
  function Og(a, b) {
    return Gg(a.j, b);
  }
  p.T = function () {
    var a = this.j;
    return a.parentWindow || a.defaultView;
  };
  p.appendChild = function (a, b) {
    a.appendChild(b);
  };
  p.append = function (a, b) {
    Eg(yg(a), a, arguments, 1);
  };
  p.canHaveChildren = function (a) {
    if (1 != a.nodeType) return !1;
    switch (a.tagName) {
      case "APPLET":
      case "AREA":
      case "BASE":
      case "BR":
      case "COL":
      case "COMMAND":
      case "EMBED":
      case "FRAME":
      case "HR":
      case "IMG":
      case "INPUT":
      case "IFRAME":
      case "ISINDEX":
      case "KEYGEN":
      case "LINK":
      case "NOFRAMES":
      case "NOSCRIPT":
      case "META":
      case "OBJECT":
      case "PARAM":
      case "SCRIPT":
      case "SOURCE":
      case "STYLE":
      case "TRACK":
      case "WBR":
        return !1;
    }
    return !0;
  };
  p.contains = function (a, b) {
    if (!a || !b) return !1;
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition)
      return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b; ) b = b.parentNode;
    return b == a;
  };
  p.bf = Hg;
  function Pg() {
    return !Qg() && (u("iPod") || u("iPhone") || u("Android") || u("IEMobile"));
  }
  function Qg() {
    return u("iPad") || (u("Android") && !u("Mobile")) || u("Silk");
  }
  var Rg = RegExp(
    "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
  );
  function Sg(a) {
    try {
      return !!a && null != a.location.href && Mb(a, "foo");
    } catch {
      return !1;
    }
  }
  function Tg(a, b = !1, c = !1, d = t) {
    c = c ? Ug(d) : d;
    for (d = 0; c && 40 > d++ && ((!b && !Sg(c)) || !a(c)); ) c = Ug(c);
  }
  function Ug(a) {
    try {
      const b = a.parent;
      if (b && b != a) return b;
    } catch {}
    return null;
  }
  function Vg(a) {
    return Sg(a.top) ? a.top : null;
  }
  function Wg(a, b) {
    const c = Xg("SCRIPT", a);
    Kf(c, b);
    (a = a.getElementsByTagName("script")[0]) &&
      a.parentNode &&
      a.parentNode.insertBefore(c, a);
  }
  function Yg(a, b) {
    return b.getComputedStyle ? b.getComputedStyle(a, null) : a.currentStyle;
  }
  function Zg() {
    if (!globalThis.crypto) return Math.random();
    try {
      const a = new Uint32Array(1);
      globalThis.crypto.getRandomValues(a);
      return a[0] / 65536 / 65536;
    } catch {
      return Math.random();
    }
  }
  function $g(a, b) {
    if (a)
      for (const c in a)
        Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
  }
  function ah(a) {
    const b = [];
    $g(a, function (c) {
      b.push(c);
    });
    return b;
  }
  function bh(a) {
    const b = a.length;
    if (0 == b) return 0;
    let c = 305419896;
    for (let d = 0; d < b; d++)
      c ^= ((c << 5) + (c >> 2) + a.charCodeAt(d)) & 4294967295;
    return 0 < c ? c : 4294967296 + c;
  }
  var dh = Vd(
    () =>
      zb(
        [
          "Google Web Preview",
          "Mediapartners-Google",
          "Google-Read-Aloud",
          "Google-Adwords",
        ],
        ch
      ) || 1e-4 > Math.random()
  );
  const ch = (a) => gb(lb(), a);
  var eh = /^([0-9.]+)px$/,
    fh = /^(-?[0-9.]{1,30})$/;
  function gh(a) {
    if (!fh.test(a)) return null;
    a = Number(a);
    return isNaN(a) ? null : a;
  }
  function hh(a) {
    return /^true$/.test(a);
  }
  function ih(a) {
    return (a = eh.exec(a)) ? +a[1] : null;
  }
  function jh() {
    var a = t.document.URL;
    if (!a) return "";
    const b = RegExp(".*[&#?]google_debug(=[^&]*)?(&.*)?$");
    try {
      const c = b.exec(decodeURIComponent(a));
      if (c) return c[1] && 1 < c[1].length ? c[1].substring(1) : "true";
    } catch {}
    return "";
  }
  var kh = {
    Bg: "allow-forms",
    Cg: "allow-modals",
    Dg: "allow-orientation-lock",
    Eg: "allow-pointer-lock",
    Fg: "allow-popups",
    Gg: "allow-popups-to-escape-sandbox",
    Hg: "allow-presentation",
    Ig: "allow-same-origin",
    Jg: "allow-scripts",
    Kg: "allow-top-navigation",
    Lg: "allow-top-navigation-by-user-activation",
  };
  const lh = Vd(() => ah(kh));
  function mh() {
    var a = [
      "allow-top-navigation",
      "allow-modals",
      "allow-orientation-lock",
      "allow-presentation",
      "allow-pointer-lock",
    ];
    const b = lh();
    return a.length ? vb(b, (c) => !Ab(a, c)) : b;
  }
  function nh() {
    const a = Xg("IFRAME"),
      b = {};
    ub(lh(), (c) => {
      a.sandbox && a.sandbox.supports && a.sandbox.supports(c) && (b[c] = !0);
    });
    return b;
  }
  var oh = (a, b) => {
      try {
        return !(!a.frames || !a.frames[b]);
      } catch {
        return !1;
      }
    },
    ph = (a, b) => {
      for (let c = 0; 50 > c; ++c) {
        if (oh(a, b)) return a;
        if (!(a = Ug(a))) break;
      }
      return null;
    },
    qh = Vd(() => (Pg() ? 2 : Qg() ? 1 : 0)),
    M = (a, b) => {
      $g(b, (c, d) => {
        a.style.setProperty(d, c, "important");
      });
    };
  const rh = {
    ["http://googleads.g.doubleclick.net"]: !0,
    ["http://pagead2.googlesyndication.com"]: !0,
    ["https://googleads.g.doubleclick.net"]: !0,
    ["https://pagead2.googlesyndication.com"]: !0,
  };
  var sh = /\.proxy\.(googleprod|googlers)\.com(:\d+)?$/;
  const th = /.*domain\.test$/,
    uh = /\.prod\.google\.com(:\d+)?$/;
  var vh = (a) => rh[a] || sh.test(a) || th.test(a) || uh.test(a);
  let wh = [];
  const xh = () => {
    const a = wh;
    wh = [];
    for (const b of a)
      try {
        b();
      } catch {}
  };
  var yh = (a, b) => {
    if ("number" !== typeof a.goog_pvsid)
      try {
        Object.defineProperty(a, "goog_pvsid", {
          value: Math.floor(Math.random() * 2 ** 52),
          configurable: !1,
        });
      } catch (c) {
        b && b.ma(784, c);
      }
    a = Number(a.goog_pvsid);
    b && (!a || 0 >= a) && b.ma(784, Error(`Invalid correlator, ${a}`));
    return a || -1;
  };
  function zh(a, b, c, d = []) {
    const e = new a.MutationObserver((f) => {
      for (const g of f)
        for (const h of g.removedNodes)
          if (d && (h === b || Hg(h, b))) {
            for (const k of d) k.disconnect();
            d.length = 0;
            c();
            return;
          }
    });
    d.push(e);
    e.observe(a.document.documentElement, { childList: !0, subtree: !0 });
    Tg(
      (f) => {
        if (!f.parent || !Sg(f.parent)) return !1;
        const g = f.parent.document.getElementsByTagName("iframe");
        for (let l = 0; l < g.length; l++)
          try {
            a: {
              var h = g[l];
              try {
                var k =
                  h.contentWindow ||
                  (h.contentDocument ? Dg(h.contentDocument) : null);
                break a;
              } catch (m) {}
              k = null;
            }
            if (k == f) {
              zh(f.parent, g[l], c, d);
              break;
            }
          } catch {}
        return !1;
      },
      !1,
      !1,
      a
    );
  }
  var Ah = (a, b) => {
      zh(Dg(yg(a)), a, b);
    },
    Bh = (a, b) => {
      "complete" === a.document.readyState
        ? (wh.push(b),
          1 == wh.length &&
            (window.Promise
              ? Promise.resolve().then(xh)
              : window.setImmediate
              ? setImmediate(xh)
              : setTimeout(xh, 0)))
        : a.addEventListener("load", b);
    },
    Ch = (a, b) =>
      new Promise((c) => {
        setTimeout(() => void c(b), a);
      });
  function Xg(a, b = document) {
    return b.createElement(String(a).toLowerCase());
  }
  var Dh = (a) => {
    let b = a;
    for (; a && a != a.parent; ) (a = a.parent), Sg(a) && (b = a);
    return b;
  };
  function Eh(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d;
  }
  p = Eh.prototype;
  p.getWidth = function () {
    return this.right - this.left;
  };
  p.getHeight = function () {
    return this.bottom - this.top;
  };
  function Fh(a) {
    return new Eh(a.top, a.right, a.bottom, a.left);
  }
  p.contains = function (a) {
    return this && a
      ? a instanceof Eh
        ? a.left >= this.left &&
          a.right <= this.right &&
          a.top >= this.top &&
          a.bottom <= this.bottom
        : a.x >= this.left &&
          a.x <= this.right &&
          a.y >= this.top &&
          a.y <= this.bottom
      : !1;
  };
  function Gh(a, b) {
    return (
      a.left <= b.right &&
      b.left <= a.right &&
      a.top <= b.bottom &&
      b.top <= a.bottom
    );
  }
  p.ceil = function () {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this;
  };
  p.floor = function () {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this;
  };
  p.round = function () {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this;
  };
  function Hh(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d;
  }
  function Ih(a, b) {
    var c = Math.max(a.left, b.left),
      d = Math.min(a.left + a.width, b.left + b.width);
    if (c <= d) {
      var e = Math.max(a.top, b.top);
      a = Math.min(a.top + a.height, b.top + b.height);
      if (e <= a) return new Hh(c, e, d - c, a - e);
    }
    return null;
  }
  function Jh(a, b) {
    var c = Ih(a, b);
    if (!c || !c.height || !c.width)
      return [new Hh(a.left, a.top, a.width, a.height)];
    c = [];
    var d = a.top,
      e = a.height,
      f = a.left + a.width,
      g = a.top + a.height,
      h = b.left + b.width,
      k = b.top + b.height;
    b.top > a.top &&
      (c.push(new Hh(a.left, a.top, a.width, b.top - a.top)),
      (d = b.top),
      (e -= b.top - a.top));
    k < g && (c.push(new Hh(a.left, k, a.width, g - k)), (e = k - d));
    b.left > a.left && c.push(new Hh(a.left, d, b.left - a.left, e));
    h < f && c.push(new Hh(h, d, f - h, e));
    return c;
  }
  Hh.prototype.contains = function (a) {
    return a instanceof og
      ? a.x >= this.left &&
          a.x <= this.left + this.width &&
          a.y >= this.top &&
          a.y <= this.top + this.height
      : this.left <= a.left &&
          this.left + this.width >= a.left + a.width &&
          this.top <= a.top &&
          this.top + this.height >= a.top + a.height;
  };
  Hh.prototype.ceil = function () {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  Hh.prototype.floor = function () {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  Hh.prototype.round = function () {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  const Kh = {
    "AMP-CAROUSEL": "ac",
    "AMP-FX-FLYING-CARPET": "fc",
    "AMP-LIGHTBOX": "lb",
    "AMP-STICKY-AD": "sa",
  };
  function Lh(a = t) {
    let b = a.context || a.AMP_CONTEXT_DATA;
    if (!b)
      try {
        b = a.parent.context || a.parent.AMP_CONTEXT_DATA;
      } catch {}
    return b?.pageViewId && b?.canonicalUrl ? b : null;
  }
  function bi(a = Lh()) {
    return a && a.mode ? +a.mode.version || null : null;
  }
  function ci(a = Lh()) {
    if (a && a.container) {
      a = a.container.split(",");
      const b = [];
      for (let c = 0; c < a.length; c++) b.push(Kh[a[c]] || "x");
      return b.join();
    }
    return null;
  }
  function di() {
    var a = Lh();
    return a && a.initialIntersection;
  }
  function ei() {
    const a = di();
    return a && Ca(a.rootBounds)
      ? new pg(a.rootBounds.width, a.rootBounds.height)
      : null;
  }
  function fi(a = Lh()) {
    return a ? (Sg(a.master) ? a.master : null) : null;
  }
  function gi(a, b) {
    const c = (a.ampInaboxIframes = a.ampInaboxIframes || []);
    let d = () => {},
      e = () => {};
    b &&
      (c.push(b),
      (e = () => {
        a.AMP &&
          a.AMP.inaboxUnregisterIframe &&
          a.AMP.inaboxUnregisterIframe(b);
        Bb(c, b);
        d();
      }));
    if (a.ampInaboxInitialized) return e;
    a.ampInaboxPendingMessages = a.ampInaboxPendingMessages || [];
    const f = (g) => {
      if (a.ampInaboxInitialized) g = !0;
      else {
        var h,
          k = "amp-ini-load" === g.data;
        a.ampInaboxPendingMessages &&
          !k &&
          (h = /^amp-(\d{15,20})?/.exec(g.data)) &&
          (a.ampInaboxPendingMessages.push(g),
          (g = h[1]),
          a.ampInaboxInitialized ||
            (g && !/^\d{15,20}$/.test(g)) ||
            a.document.querySelector('script[src$="amp4ads-host-v0.js"]') ||
            Wg(
              a.document,
              g
                ? De(
                    Pd(
                      "https://cdn.ampproject.org/rtv/%{ampVersion}/amp4ads-host-v0.js"
                    ),
                    { ampVersion: g }
                  )
                : Be(Od(Pd("https://cdn.ampproject.org/amp4ads-host-v0.js")))
            ));
        g = !1;
      }
      g && d();
    };
    c.google_amp_listener_added ||
      ((c.google_amp_listener_added = !0),
      L(a, "message", f),
      (d = () => {
        he(a, "message", f);
      }));
    return e;
  }
  function N(a, ...b) {
    if (0 === b.length) return Be(a[0]);
    const c = [a[0]];
    for (let d = 0; d < b.length; d++)
      c.push(encodeURIComponent(b[d])), c.push(a[d + 1]);
    return Be(c.join(""));
  }
  function hi(a, b) {
    let c = Ae(a).toString();
    if (/#/.test(c)) throw Error("");
    let d = /\?/.test(c) ? "&" : "?";
    b.forEach((e, f) => {
      e = e instanceof Array ? e : [e];
      for (let g = 0; g < e.length; g++) {
        const h = e[g];
        null !== h &&
          void 0 !== h &&
          ((c +=
            d + encodeURIComponent(f) + "=" + encodeURIComponent(String(h))),
          (d = "&"));
      }
    });
    return Be(c);
  }
  function ii(a) {
    a = a[0];
    const b = se();
    a = b ? b.createScript(a) : a;
    return new ve(a, te);
  }
  function ji(a) {
    return new af(a[0], Ze);
  }
  function ki(a, b, c) {
    if ("string" === typeof b) (b = li(a, b)) && (a.style[b] = c);
    else
      for (var d in b) {
        c = a;
        var e = b[d],
          f = li(c, d);
        f && (c.style[f] = e);
      }
  }
  var mi = {};
  function li(a, b) {
    var c = mi[b];
    if (!c) {
      var d = ug(b);
      c = d;
      void 0 === a.style[d] &&
        ((d = (Sb ? "Webkit" : Rb ? "Moz" : Ob ? "ms" : null) + vg(d)),
        void 0 !== a.style[d] && (c = d));
      mi[b] = c;
    }
    return c;
  }
  function ni(a, b) {
    var c = yg(a);
    return c.defaultView &&
      c.defaultView.getComputedStyle &&
      (a = c.defaultView.getComputedStyle(a, null))
      ? a[b] || a.getPropertyValue(b) || ""
      : "";
  }
  function oi(a, b) {
    return (
      ni(a, b) ||
      (a.currentStyle ? a.currentStyle[b] : null) ||
      (a.style && a.style[b])
    );
  }
  function pi(a) {
    try {
      return a.getBoundingClientRect();
    } catch (b) {
      return { left: 0, top: 0, right: 0, bottom: 0 };
    }
  }
  function qi(a) {
    var b = yg(a),
      c = new og(0, 0);
    var d = b ? yg(b) : document;
    d =
      !Ob || 9 <= Number(bc) || "CSS1Compat" == wg(d).j.compatMode
        ? d.documentElement
        : d.body;
    if (a == d) return c;
    a = pi(a);
    b = Cg(wg(b).j);
    c.x = a.left + b.x;
    c.y = a.top + b.y;
    return c;
  }
  function ri(a) {
    var b = si;
    if ("none" != oi(a, "display")) return b(a);
    var c = a.style,
      d = c.display,
      e = c.visibility,
      f = c.position;
    c.visibility = "hidden";
    c.position = "absolute";
    c.display = "inline";
    a = b(a);
    c.display = d;
    c.position = f;
    c.visibility = e;
    return a;
  }
  function si(a) {
    var b = a.offsetWidth,
      c = a.offsetHeight,
      d = Sb && !b && !c;
    return (void 0 === b || d) && a.getBoundingClientRect
      ? ((a = pi(a)), new pg(a.right - a.left, a.bottom - a.top))
      : new pg(b, c);
  }
  function ti(a, b) {
    if (/^\d+px?$/.test(b)) return parseInt(b, 10);
    var c = a.style.left,
      d = a.runtimeStyle.left;
    a.runtimeStyle.left = a.currentStyle.left;
    a.style.left = b;
    b = a.style.pixelLeft;
    a.style.left = c;
    a.runtimeStyle.left = d;
    return +b;
  }
  function ui(a, b) {
    return (b = a.currentStyle ? a.currentStyle[b] : null) ? ti(a, b) : 0;
  }
  var vi = { thin: 2, medium: 4, thick: 6 };
  function wi(a, b) {
    if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null))
      return 0;
    b = a.currentStyle ? a.currentStyle[b + "Width"] : null;
    return b in vi ? vi[b] : ti(a, b);
  }
  var xi = (a) => "number" === typeof a && 0 < a,
    zi = (a, b) => {
      a = yi(a);
      if (!a) return b;
      const c = b.slice(-1);
      return b + ("?" === c || "#" === c ? "" : "&") + a;
    },
    yi = (a) =>
      Object.entries(Ai(a))
        .map(([b, c]) => `${b}=${encodeURIComponent(String(c))}`)
        .join("&"),
    Ai = (a) => {
      const b = {};
      $g(a, (c, d) => {
        if (c || 0 === c || !1 === c)
          "boolean" === typeof c && (c = c ? 1 : 0), (b[d] = c);
      });
      return b;
    },
    Bi = () => {
      try {
        return fg.history.length;
      } catch (a) {
        return 0;
      }
    },
    Ci = (a) => {
      a = fi(Lh(a)) || a;
      a.google_unique_id = (a.google_unique_id || 0) + 1;
    },
    Di = (a) => {
      a = a.google_unique_id;
      return "number" === typeof a ? a : 0;
    },
    Ei = (a) => {
      a.u_tz = -new Date().getTimezoneOffset();
      a.u_his = Bi();
      a.u_h = fg.screen?.height;
      a.u_w = fg.screen?.width;
      a.u_ah = fg.screen?.availHeight;
      a.u_aw = fg.screen?.availWidth;
      a.u_cd = fg.screen?.colorDepth;
    },
    Fi = (a) => {
      let b;
      b = 9 !== a.nodeType && a.id;
      a: {
        if (a && a.nodeName && a.parentElement) {
          var c = a.nodeName.toString().toLowerCase();
          const d = a.parentElement.childNodes;
          let e = 0;
          for (let f = 0; f < d.length; ++f) {
            const g = d[f];
            if (g.nodeName && g.nodeName.toString().toLowerCase() === c) {
              if (a === g) {
                c = "." + e;
                break a;
              }
              ++e;
            }
          }
        }
        c = "";
      }
      return (
        (a.nodeName && a.nodeName.toString().toLowerCase()) +
        (b ? "/" + b : "") +
        c
      );
    },
    Gi = (a) =>
      function () {
        if (a) {
          const b = a;
          a = null;
          b.apply(null, arguments);
        }
      },
    Hi = () => {
      if (!fg) return !1;
      try {
        return !(!fg.navigator.standalone && !fg.top.navigator.standalone);
      } catch (a) {
        return !1;
      }
    },
    Ii = (a) => ((a = a.google_ad_format) ? 0 < a.indexOf("_0ads") : !1),
    Ji = (a) => {
      let b = Number(a.google_ad_width),
        c = Number(a.google_ad_height);
      if (!(0 < b && 0 < c)) {
        a: {
          try {
            const e = String(a.google_ad_format);
            if (e && e.match) {
              const f = e.match(/(\d+)x(\d+)/i);
              if (f) {
                const g = parseInt(f[1], 10),
                  h = parseInt(f[2], 10);
                if (0 < g && 0 < h) {
                  var d = { width: g, height: h };
                  break a;
                }
              }
            }
          } catch (e) {}
          d = null;
        }
        a = d;
        if (!a) return null;
        b = 0 < b ? b : a.width;
        c = 0 < c ? c : a.height;
      }
      return { width: b, height: c };
    };
  class Ki {
    constructor(a, b) {
      this.error = a;
      this.context = b.context;
      this.msg = b.message || "";
      this.id = b.id || "jserror";
      this.meta = {};
    }
  }
  const Li = RegExp(
    "^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)"
  );
  var Mi = class {
      constructor(a, b) {
        this.j = a;
        this.l = b;
      }
    },
    Ni = class {
      constructor(a, b, c) {
        this.url = a;
        this.win = b;
        this.Ld = !!c;
        this.depth = null;
      }
    };
  function Oi(a, b, c = null, d = !1) {
    Pi(a, b, c, d);
  }
  function Pi(a, b, c, d) {
    a.google_image_requests || (a.google_image_requests = []);
    const e = Xg("IMG", a.document);
    if (c || d) {
      const f = (g) => {
        c && c(g);
        d && Bb(a.google_image_requests, e);
        he(e, "load", f);
        he(e, "error", f);
      };
      L(e, "load", f);
      L(e, "error", f);
    }
    e.src = b;
    a.google_image_requests.push(e);
  }
  var Ri = (a, b) => {
      let c = `https://${"pagead2.googlesyndication.com"}/pagead/gen_204?id=${b}`;
      $g(a, (d, e) => {
        d && (c += `&${e}=${encodeURIComponent(d)}`);
      });
      Qi(c);
    },
    Qi = (a) => {
      var b = window;
      b.fetch
        ? b.fetch(a, {
            keepalive: !0,
            credentials: "include",
            redirect: "follow",
            method: "get",
            mode: "no-cors",
          })
        : Oi(b, a, void 0, !1);
    };
  function Si(a, b) {
    const c = {};
    c[a] = b;
    return [c];
  }
  function Ti(a, b, c, d, e) {
    const f = [];
    $g(a, function (g, h) {
      (g = Ui(g, b, c, d, e)) && f.push(h + "=" + g);
    });
    return f.join(b);
  }
  function Ui(a, b, c, d, e) {
    if (null == a) return "";
    b = b || "&";
    c = c || ",$";
    "string" == typeof c && (c = c.split(""));
    if (a instanceof Array) {
      if (((d = d || 0), d < c.length)) {
        const f = [];
        for (let g = 0; g < a.length; g++) f.push(Ui(a[g], b, c, d + 1, e));
        return f.join(c[d]);
      }
    } else if ("object" == typeof a)
      return (
        (e = e || 0), 2 > e ? encodeURIComponent(Ti(a, b, c, d, e + 1)) : "..."
      );
    return encodeURIComponent(String(a));
  }
  function Vi(a) {
    let b = 1;
    for (const c in a.l) b = c.length > b ? c.length : b;
    return 3997 - b - a.A.length - 1;
  }
  function Wi(a, b) {
    let c = "https://pagead2.googlesyndication.com" + b,
      d = Vi(a) - b.length;
    if (0 > d) return "";
    a.j.sort(function (f, g) {
      return f - g;
    });
    b = null;
    let e = "";
    for (let f = 0; f < a.j.length; f++) {
      const g = a.j[f],
        h = a.l[g];
      for (let k = 0; k < h.length; k++) {
        if (!d) {
          b = null == b ? g : b;
          break;
        }
        let l = Ti(h[k], a.A, ",$");
        if (l) {
          l = e + l;
          if (d >= l.length) {
            d -= l.length;
            c += l;
            e = a.A;
            break;
          }
          b = null == b ? g : b;
        }
      }
    }
    a = "";
    null != b && (a = e + "trn=" + b);
    return c + a;
  }
  class Xi {
    constructor() {
      this.A = "&";
      this.l = {};
      this.B = 0;
      this.j = [];
    }
  }
  function Yi() {
    var a = Zi,
      b = t.google_srt;
    0 <= b && 1 >= b && (a.j = b);
  }
  function $i(a, b, c, d = !1, e) {
    if ((d ? a.j : Math.random()) < (e || 0.01))
      try {
        let f;
        c instanceof Xi
          ? (f = c)
          : ((f = new Xi()),
            $g(c, (h, k) => {
              var l = f;
              const m = l.B++;
              h = Si(k, h);
              l.j.push(m);
              l.l[m] = h;
            }));
        const g = Wi(f, "/pagead/gen_204?id=" + b + "&");
        g && Oi(t, g);
      } catch (f) {}
  }
  class aj {
    constructor() {
      this.j = Math.random();
    }
  }
  let bj = null;
  function cj() {
    if (null === bj) {
      bj = "";
      try {
        let a = "";
        try {
          a = t.top.location.hash;
        } catch (b) {
          a = t.location.hash;
        }
        if (a) {
          const b = a.match(/\bdeid=([\d,]+)/);
          bj = b ? b[1] : "";
        }
      } catch (a) {}
    }
    return bj;
  }
  function dj() {
    const a = t.performance;
    return a && a.now && a.timing
      ? Math.floor(a.now() + a.timing.navigationStart)
      : Na();
  }
  function ej() {
    const a = t.performance;
    return a && a.now ? a.now() : null;
  }
  class fj {
    constructor(a, b) {
      var c = ej() || dj();
      this.label = a;
      this.type = b;
      this.value = c;
      this.duration = 0;
      this.uniqueId = Math.random();
      this.taskId = this.slotId = void 0;
    }
  }
  const gj = t.performance,
    hj = !!(gj && gj.mark && gj.measure && gj.clearMarks),
    ij = Vd(() => {
      var a;
      if ((a = hj)) (a = cj()), (a = !!a.indexOf && 0 <= a.indexOf("1337"));
      return a;
    });
  function jj(a) {
    a &&
      gj &&
      ij() &&
      (gj.clearMarks(`goog_${a.label}_${a.uniqueId}_start`),
      gj.clearMarks(`goog_${a.label}_${a.uniqueId}_end`));
  }
  function kj() {
    var a = lj;
    a.l = !1;
    a.j != a.A.google_js_reporting_queue &&
      (ij() && ub(a.j, jj), (a.j.length = 0));
  }
  function mj(a, b) {
    if (!a.l) return b();
    const c = a.start("491", 3);
    let d;
    try {
      d = b();
    } catch (e) {
      throw (jj(c), e);
    }
    a.end(c);
    return d;
  }
  class nj {
    constructor(a) {
      this.j = [];
      this.A = a || t;
      let b = null;
      a &&
        ((a.google_js_reporting_queue = a.google_js_reporting_queue || []),
        (this.j = a.google_js_reporting_queue),
        (b = a.google_measure_js_timing));
      this.l = ij() || (null != b ? b : 1 > Math.random());
    }
    start(a, b) {
      if (!this.l) return null;
      a = new fj(a, b);
      b = `goog_${a.label}_${a.uniqueId}_start`;
      gj && ij() && gj.mark(b);
      return a;
    }
    end(a) {
      if (this.l && "number" === typeof a.value) {
        a.duration = (ej() || dj()) - a.value;
        var b = `goog_${a.label}_${a.uniqueId}_end`;
        gj && ij() && gj.mark(b);
        !this.l || 2048 < this.j.length || this.j.push(a);
      }
    }
  }
  function oj(a) {
    let b = a.toString();
    a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
    a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
    a.stack && (b = pj(a.stack, b));
    return b;
  }
  function pj(a, b) {
    try {
      -1 == a.indexOf(b) && (a = b + "\n" + a);
      let c;
      for (; a != c; )
        (c = a),
          (a = a.replace(
            RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"),
            "$1"
          ));
      return a.replace(RegExp("\n *", "g"), "\n");
    } catch (c) {
      return b;
    }
  }
  class qj {
    constructor(a = null) {
      this.B = Zi;
      this.j = null;
      this.D = this.ma;
      this.l = a;
      this.A = !1;
    }
    pa() {
      return this.B;
    }
    ge(a) {
      this.j = a;
    }
    C(a) {
      this.A = a;
    }
    Bb(a, b, c) {
      let d, e;
      try {
        this.l && this.l.l
          ? ((e = this.l.start(a.toString(), 3)), (d = b()), this.l.end(e))
          : (d = b());
      } catch (f) {
        b = !0;
        try {
          jj(e), (b = this.D(a, new Ki(f, { message: oj(f) }), void 0, c));
        } catch (g) {
          this.ma(217, g);
        }
        if (b) window.console?.error?.(f);
        else throw f;
      }
      return d;
    }
    ta(a, b, c, d) {
      return (...e) => this.Bb(a, () => b.apply(c, e), d);
    }
    ma(a, b, c, d, e) {
      e = e || "jserror";
      let f;
      try {
        const I = new Xi();
        var g = I;
        g.j.push(1);
        g.l[1] = Si("context", a);
        (b.error && b.meta && b.id) || (b = new Ki(b, { message: oj(b) }));
        if (b.msg) {
          g = I;
          var h = b.msg.substring(0, 512);
          g.j.push(2);
          g.l[2] = Si("msg", h);
        }
        var k = b.meta || {};
        b = k;
        if (this.j)
          try {
            this.j(b);
          } catch (xa) {}
        if (d)
          try {
            d(b);
          } catch (xa) {}
        d = I;
        k = [k];
        d.j.push(3);
        d.l[3] = k;
        d = t;
        k = [];
        b = null;
        do {
          var l = d;
          if (Sg(l)) {
            var m = l.location.href;
            b = (l.document && l.document.referrer) || null;
          } else (m = b), (b = null);
          k.push(new Ni(m || "", l));
          try {
            d = l.parent;
          } catch (xa) {
            d = null;
          }
        } while (d && l != d);
        for (let xa = 0, ha = k.length - 1; xa <= ha; ++xa)
          k[xa].depth = ha - xa;
        l = t;
        if (
          l.location &&
          l.location.ancestorOrigins &&
          l.location.ancestorOrigins.length == k.length - 1
        )
          for (m = 1; m < k.length; ++m) {
            var n = k[m];
            n.url ||
              ((n.url = l.location.ancestorOrigins[m - 1] || ""), (n.Ld = !0));
          }
        var q = k;
        let ta = new Ni(t.location.href, t, !1);
        l = null;
        const Ja = q.length - 1;
        for (n = Ja; 0 <= n; --n) {
          var r = q[n];
          !l && Li.test(r.url) && (l = r);
          if (r.url && !r.Ld) {
            ta = r;
            break;
          }
        }
        r = null;
        const ua = q.length && q[Ja].url;
        0 != ta.depth && ua && (r = q[Ja]);
        f = new Mi(ta, r);
        if (f.l) {
          q = I;
          var y = f.l.url || "";
          q.j.push(4);
          q.l[4] = Si("top", y);
        }
        var E = { url: f.j.url || "" };
        if (f.j.url) {
          var D = f.j.url.match(Rg),
            C = D[1],
            G = D[3],
            K = D[4];
          y = "";
          C && (y += C + ":");
          G && ((y += "//"), (y += G), K && (y += ":" + K));
          var H = y;
        } else H = "";
        C = I;
        E = [E, { url: H }];
        C.j.push(5);
        C.l[5] = E;
        $i(this.B, e, I, this.A, c);
      } catch (I) {
        try {
          $i(
            this.B,
            e,
            { context: "ecmserr", rctx: a, msg: oj(I), url: f && f.j.url },
            this.A,
            c
          );
        } catch (ta) {}
      }
      return !0;
    }
    za(a, b, c) {
      b.catch((d) => {
        d = d ? d : "unknown rejection";
        this.ma(
          a,
          d instanceof Error ? d : Error(d),
          void 0,
          c || this.j || void 0
        );
      });
    }
  }
  var rj = (a) => "string" === typeof a,
    sj = (a) => void 0 === a;
  function tj() {
    var a = uj;
    return (b) => {
      for (const c in a) if (b === a[c] && !/^[0-9]+$/.test(c)) return !0;
      return !1;
    };
  }
  var vj;
  vj = { Ti: 0, qe: 3, re: 4, te: 5 };
  var wj = vj.qe,
    xj = vj.re,
    yj = vj.te;
  var zj = class extends J {
    constructor() {
      super();
    }
  };
  function Aj(a) {
    var b = new Bj();
    return w(b, 1, a);
  }
  var Bj = class extends J {
    constructor(a) {
      super(a);
    }
  };
  var Cj = class extends J {
    constructor() {
      super();
    }
  };
  function Dj(a, b) {
    return w(a, 1, b);
  }
  function Ej(a, b) {
    return w(a, 2, b);
  }
  function Fj(a, b) {
    return w(a, 3, b);
  }
  function Gj(a, b) {
    return w(a, 4, b);
  }
  function Hj(a, b) {
    return w(a, 5, b);
  }
  function Ij(a, b) {
    return w(a, 8, b);
  }
  function Jj(a, b) {
    return w(a, 9, b);
  }
  var Kj = class extends J {
    constructor() {
      super();
    }
  };
  var Lj = class extends J {
    constructor() {
      super();
    }
  };
  function Mj(a, b) {
    return jd(a, 1, b);
  }
  function Nj(a, b) {
    return hd(a, 12, b);
  }
  function Oj() {
    var a = new Pj();
    Mc(a);
    cd(a, 2, 2, !1, !1).push("irr");
    return a;
  }
  function Qj(a, b) {
    return w(a, 3, b);
  }
  function Rj(a, b) {
    return w(a, 4, b);
  }
  function Sj(a, b) {
    return w(a, 5, b);
  }
  function Tj(a, b) {
    return w(a, 7, b);
  }
  function Uj(a, b) {
    return w(a, 8, b);
  }
  function Vj(a, b) {
    return w(a, 9, b);
  }
  function Wj(a, b) {
    return rd(a, 10, b);
  }
  function Xj(a, b) {
    return hd(a, 11, b);
  }
  var Pj = class extends J {
      constructor() {
        super(void 0, -1, Yj);
      }
    },
    Yj = [1, 12, 2, 10, 11];
  function Zj(a) {
    var b = ak();
    od(a, 1, b);
  }
  function bk(a, b) {
    return w(a, 2, b);
  }
  function ck(a, b) {
    return rd(a, 3, b);
  }
  function dk(a, b) {
    return rd(a, 4, b);
  }
  function ek(a, b) {
    return sd(a, 4, Bj, b);
  }
  function fk(a, b) {
    return rd(a, 5, b);
  }
  function gk(a, b) {
    return jd(a, 6, b);
  }
  function hk(a, b) {
    return w(a, 7, b);
  }
  function ik(a, b) {
    od(a, 9, b);
  }
  function jk(a, b) {
    return w(a, 10, b);
  }
  function kk(a, b) {
    return w(a, 11, b);
  }
  function lk(a, b) {
    return w(a, 12, b);
  }
  var nk = class extends J {
      constructor() {
        super(void 0, -1, mk);
      }
      G(a) {
        return w(this, 8, a);
      }
    },
    mk = [3, 4, 5, 6];
  function ok(a, b) {
    return w(a, 1, b);
  }
  function pk(a, b) {
    return hd(a, 2, b);
  }
  var rk = class extends J {
      constructor() {
        super(void 0, -1, qk);
      }
    },
    qk = [2];
  var sk = class extends J {
    constructor() {
      super();
    }
  };
  var tk = class extends J {
    constructor() {
      super();
    }
  };
  var uk = class extends J {
    constructor() {
      super();
    }
    getContentUrl() {
      return B(this, 1);
    }
  };
  var wk = class extends J {
      constructor() {
        super(void 0, -1, vk);
      }
    },
    vk = [1];
  var xk = class extends J {
    constructor() {
      super();
    }
  };
  var yk = class extends J {
    constructor() {
      super();
    }
  };
  var zk = class extends J {
      constructor(a) {
        super(a);
      }
    },
    Ak = [1, 2, 3, 5, 6, 7, 8];
  var Ck = class extends J {
      constructor() {
        super(void 0, -1, Bk);
      }
    },
    Bk = [1];
  var Dk = class extends J {
    constructor() {
      super();
    }
  };
  function Ek(a) {
    var b = new Fk();
    return yd(b, 1, a);
  }
  function Gk(a, b) {
    return x(a, 2, b, "");
  }
  function Hk(a, b) {
    return x(a, 3, b, "");
  }
  function Ik(a, b) {
    return x(a, 4, b, "");
  }
  function Jk(a, b) {
    return x(a, 5, b, 0);
  }
  var Fk = class extends J {
      constructor() {
        super(void 0, -1, Kk);
      }
    },
    Lk = class extends J {
      constructor() {
        super();
      }
    },
    Nk = class extends J {
      constructor() {
        super(void 0, -1, Mk);
      }
    },
    Kk = [9],
    Mk = [2];
  var Pk = class extends J {
      constructor() {
        super(void 0, -1, Ok);
      }
    },
    Ok = [2];
  var Qk = class extends J {
      constructor() {
        super();
      }
    },
    Rk = [4, 5];
  var Sk = class extends J {
    constructor() {
      super();
    }
  };
  var Tk = class extends J {
    constructor() {
      super();
    }
  };
  var Uk = class extends J {
    constructor() {
      super();
    }
  };
  var Vk = class extends J {
    constructor() {
      super();
    }
  };
  var Wk = class extends J {
      constructor() {
        super();
      }
    },
    Xk = class extends J {
      constructor() {
        super();
      }
    },
    Yk = class extends J {
      constructor() {
        super();
      }
    },
    Zk = [2, 3];
  var $k = class extends J {
      constructor() {
        super();
      }
    },
    al = [3, 4, 5, 6, 7, 8, 9];
  function bl(a, b) {
    return qd(a, 9, cl, b);
  }
  var dl = class extends J {
      constructor() {
        super();
      }
      Na(a) {
        return w(this, 2, a);
      }
    },
    cl = [4, 8, 5, 6, 9];
  function el(a, ...b) {
    fl(a, ...b.map((c) => ({ Wf: 7, message: c })));
  }
  function gl(a) {
    return JSON.stringify([a.map((b) => [{ [b.Wf]: b.message.toJSON() }])]);
  }
  var hl = (a, b) => {
    globalThis
      .fetch(a, {
        method: "POST",
        body: b,
        keepalive: 65536 > b.length,
        credentials: "omit",
        mode: "no-cors",
        redirect: "follow",
      })
      .catch(() => {});
  };
  function fl(a, ...b) {
    a.j.push(...b);
    100 <= a.j.length && il(a);
    a.j.length &&
      null === a.l &&
      (a.l = setTimeout(() => {
        il(a);
      }, 100));
  }
  function il(a) {
    null !== a.l && (clearTimeout(a.l), (a.l = null));
    if (a.j.length) {
      var b = gl(a.j);
      a.A("https://pagead2.googlesyndication.com/pagead/ping?e=1", b);
      a.j = [];
    }
  }
  var jl = class {
      constructor() {
        this.A = hl;
        this.j = [];
        this.l = null;
      }
    },
    kl = class extends jl {};
  var O = (a) => {
    var b = "Gc";
    if (a.Gc && a.hasOwnProperty(b)) return a.Gc;
    b = new a();
    return (a.Gc = b);
  };
  class ll {
    constructor(a) {
      this.methodName = a;
    }
  }
  var ml = new ll(15),
    nl = new ll(2),
    ol = new ll(3),
    pl = new ll(5),
    ql = new ll(6),
    rl = new ll(7),
    sl = new ll(8),
    tl = new ll(14),
    ul = (a, b, c) => b[a.methodName] || c || (() => {});
  function vl(a, b) {
    a.l = (c) => ul(nl, b, () => [])(c, 1);
    a.j = () => ul(ol, b, () => [])(1);
  }
  class wl {
    constructor() {
      this.l = () => [];
      this.j = () => [];
    }
  }
  let Zi, xl;
  const lj = new nj(t);
  ((a) => {
    Zi = a || new aj();
    "number" !== typeof t.google_srt && (t.google_srt = Math.random());
    Yi();
    xl = new qj(lj);
    xl.C(!0);
    "complete" == t.document.readyState
      ? t.google_measure_js_timing || kj()
      : lj.l &&
        L(t, "load", () => {
          t.google_measure_js_timing || kj();
        });
  })();
  var yl = (a, b, c) => xl.Bb(a, b, c),
    zl = (a, b) => xl.ta(a, b),
    Al = (a, b, c) => {
      const d = O(wl).j();
      !b.eid && d.length && (b.eid = d.toString());
      $i(Zi, a, b, !0, c);
    },
    Bl = (a, b) => xl.ma(a, b, void 0, void 0);
  var Cl = (a, b) => {
    const c = jh();
    return (
      a +
      (-1 == a.indexOf("?") ? "?" : "&") +
      [
        0 < c.length ? "google_debug" + (c ? "=" + c : "") + "&" : "",
        "xpc=",
        b,
        "&p=",
        encodeURIComponent(t.document.location.protocol),
        "//",
        encodeURIComponent(t.document.location.host),
      ].join("")
    );
  };
  Be(Od(Pd("https://pagead2.googlesyndication.com/pagead/expansion_embed.js")));
  var Dl = (a, b, c, d = null) => {
      const e = (g) => {
        let h;
        try {
          h = JSON.parse(g.data);
        } catch (k) {
          return;
        }
        !h ||
          h.googMsgType !== b ||
          (d && /[:|%3A]javascript\(/i.test(g.data) && !d(h, g)) ||
          c(h, g);
      };
      L(a, "message", e);
      let f = !1;
      return () => {
        let g = !1;
        f || ((f = !0), (g = he(a, "message", e)));
        return g;
      };
    },
    El = (a, b, c, d = null) => {
      const e = Dl(
        a,
        b,
        Td(c, () => e()),
        d
      );
      return e;
    },
    Fl = (a, b, c, d, e) => {
      if (
        !(0 >= e) &&
        ((c.googMsgType = b),
        a.postMessage(JSON.stringify(c), d),
        (a = a.frames))
      )
        for (let f = 0; f < a.length; ++f) 1 < e && Fl(a[f], b, c, d, --e);
    };
  function Ol(a, b, c, d) {
    vh(d.origin) && "expandable-xpc-ready" == c.notify && Pl(a, b);
  }
  function Pl(a, b) {
    var c = a.Fc;
    c.google_eas_queue = c.google_eas_queue || [];
    c.google_eas_queue.push({
      a: a.id,
      b: a.url,
      c: a.width,
      d: a.height,
      e: a.Ta,
      f: a.Ff,
      g: a.Be,
      h: a.nf,
      i: void 0,
    });
    t.setTimeout(
      zl(
        220,
        Gi(() => {
          Wg(c.document, Be(Ae(b).toString()));
        })
      ),
      0
    );
  }
  var Rl = class extends J {
      constructor() {
        super(void 0, -1, Ql);
      }
    },
    Ql = [15];
  var Sl = class extends J {
    constructor() {
      super();
    }
    getCorrelator() {
      return vd(this, 1);
    }
    setCorrelator(a) {
      return x(this, 1, a, 0);
    }
  };
  var Tl = class extends J {
    constructor() {
      super();
    }
  };
  let Ul = null,
    Vl = null;
  var Wl = () => {
      if (null != Ul) return Ul;
      Ul = !1;
      try {
        const a = Vg(t);
        a && -1 !== a.location.hash.indexOf("google_logging") && (Ul = !0);
        t.localStorage.getItem("google_logging") && (Ul = !0);
      } catch (a) {}
      return Ul;
    },
    Xl = () => {
      if (null != Vl) return Vl;
      Vl = !1;
      try {
        const a = Vg(t);
        if (
          (a && -1 !== a.location.hash.indexOf("auto_ads_logging")) ||
          t.localStorage.getItem("auto_ads_logging")
        )
          Vl = !0;
      } catch (a) {}
      return Vl;
    },
    Yl = (a, b = []) => {
      let c = !1;
      t.google_logging_queue || ((c = !0), (t.google_logging_queue = []));
      t.google_logging_queue.push([a, b]);
      c &&
        Wl() &&
        Wg(
          t.document,
          Be(
            Od(
              Pd(
                "https://pagead2.googlesyndication.com/pagead/js/logging_library.js"
              )
            )
          )
        );
    };
  let Zl = new Date().getTime();
  var $l = (a) => {
    a = parseFloat(a);
    return isNaN(a) || 1 < a || 0 > a ? 0.05 : a;
  };
  var am = {
    ni: 0,
    mi: 1,
    ji: 2,
    ei: 3,
    ki: 4,
    fi: 5,
    li: 6,
    hi: 7,
    ii: 8,
    di: 9,
    gi: 10,
  };
  var bm = { ri: 0, si: 1, oi: 2 };
  function cm(a, b) {
    return (
      a.left < b.right &&
      b.left < a.right &&
      a.top < b.bottom &&
      b.top < a.bottom
    );
  }
  function dm(a) {
    a = wb(a, (b) => new Eh(b.top, b.right, b.bottom, b.left));
    a = em(a);
    return { top: a.top, right: a.right, bottom: a.bottom, left: a.left };
  }
  function em(a) {
    if (!a.length) throw Error("pso:box:m:nb");
    return xb(
      a.slice(1),
      (b, c) => {
        b.left = Math.min(b.left, c.left);
        b.top = Math.min(b.top, c.top);
        b.right = Math.max(b.right, c.right);
        b.bottom = Math.max(b.bottom, c.bottom);
        return b;
      },
      Fh(a[0])
    );
  }
  var le = {
    cj: 0,
    Sh: 1,
    Vh: 2,
    Th: 3,
    Uh: 4,
    bi: 8,
    nj: 9,
    Ci: 10,
    Di: 11,
    jj: 16,
    Fh: 17,
    Eh: 24,
    Ai: 25,
    Vg: 26,
    Ug: 27,
    se: 30,
    vi: 32,
    xi: 40,
    rj: 41,
  };
  var fm = {
      overlays: 1,
      interstitials: 2,
      vignettes: 2,
      inserts: 3,
      immersives: 4,
      list_view: 5,
      full_page: 6,
      side_rails: 7,
    },
    gm = { [1]: 1, [2]: 1, [3]: 7, [4]: 7, [8]: 2, [27]: 3, [9]: 4, [30]: 5 };
  function hm(a) {
    a.google_reactive_ads_global_state
      ? (null ==
          a.google_reactive_ads_global_state.sideRailProcessedFixedElements &&
          (a.google_reactive_ads_global_state.sideRailProcessedFixedElements =
            new Set()),
        null == a.google_reactive_ads_global_state.sideRailAvailableSpace &&
          (a.google_reactive_ads_global_state.sideRailAvailableSpace =
            new Map()))
      : (a.google_reactive_ads_global_state = new im());
    return a.google_reactive_ads_global_state;
  }
  class im {
    constructor() {
      this.wasPlaTagProcessed = !1;
      this.wasReactiveAdConfigReceived = {};
      this.adCount = {};
      this.wasReactiveAdVisible = {};
      this.stateForType = {};
      this.reactiveTypeEnabledInAsfe = {};
      this.wasReactiveTagRequestSent = !1;
      this.reactiveTypeDisabledByPublisher = {};
      this.tagSpecificState = {};
      this.messageValidationEnabled = !1;
      this.floatingAdsStacking = new jm();
      this.sideRailProcessedFixedElements = new Set();
      this.sideRailAvailableSpace = new Map();
    }
  }
  var jm = class {
    constructor() {
      this.maxZIndexRestrictions = {};
      this.nextRestrictionId = 0;
      this.maxZIndexListeners = [];
    }
  };
  var km = 728 * 1.38,
    lm = (a, b = 420) =>
      (a = P(a).clientWidth) ? (a > b ? 32768 : 320 > a ? 65536 : 0) : 16384,
    mm = (a) => {
      var b = P(a).clientWidth;
      a = a.innerWidth;
      return (b = b && a ? b / a : 0)
        ? 1.05 < b
          ? 262144
          : 0.95 > b
          ? 524288
          : 0
        : 131072;
    },
    om = (a) => Math.max(0, nm(a, !0) - P(a).clientHeight),
    P = (a) => {
      a = a.document;
      let b = {};
      a && (b = "CSS1Compat" == a.compatMode ? a.documentElement : a.body);
      return b || {};
    },
    nm = (a, b) => {
      const c = P(a);
      return b
        ? c.scrollHeight == P(a).clientHeight
          ? c.offsetHeight
          : c.scrollHeight
        : c.offsetHeight;
    },
    qm = (a, b) =>
      pm(b) || 10 === b || !a.adCount
        ? !1
        : 1 == b || 2 == b
        ? !(!a.adCount[1] && !a.adCount[2])
        : (a = a.adCount[b])
        ? 1 <= a
        : !1,
    rm = (a, b) =>
      a && a.source ? a.source === b || a.source.parent === b : !1,
    sm = (a) =>
      void 0 === a.pageYOffset
        ? (
            a.document.documentElement ||
            a.document.body.parentNode ||
            a.document.body
          ).scrollTop
        : a.pageYOffset,
    tm = (a) =>
      void 0 === a.pageXOffset
        ? (
            a.document.documentElement ||
            a.document.body.parentNode ||
            a.document.body
          ).scrollLeft
        : a.pageXOffset,
    um = (a) => {
      const b = {};
      let c;
      Array.isArray(a) ? (c = a) : a && a.key_value && (c = a.key_value);
      if (c)
        for (a = 0; a < c.length; a++) {
          const d = c[a];
          if ("key" in d && "value" in d) {
            const e = d.value;
            b[d.key] = null == e ? null : String(e);
          }
        }
      return b;
    },
    vm = (a, b, c, d) => {
      $i(
        c,
        b,
        { c: d.data.substring(0, 500), u: a.location.href.substring(0, 500) },
        !0,
        0.1
      );
      return !0;
    },
    pm = (a) => 26 === a || 27 === a || 40 === a;
  function wm(a) {
    if (0 != a.j) throw Error("Already resolved/rejected.");
  }
  var zm = class {
    constructor() {
      this.l = new xm(this);
      this.j = 0;
    }
    resolve(a) {
      wm(this);
      this.j = 1;
      this.B = a;
      ym(this.l);
    }
  };
  function ym(a) {
    switch (a.j.j) {
      case 0:
        break;
      case 1:
        a.l && a.l(a.j.B);
        break;
      case 2:
        a.A && a.A(a.j.A);
        break;
      default:
        throw Error("Unhandled deferred state.");
    }
  }
  var xm = class {
    constructor(a) {
      this.j = a;
    }
    then(a, b) {
      if (this.l) throw Error("Then functions already set.");
      this.l = a;
      this.A = b;
      ym(this);
    }
  };
  function Am(a, b) {
    Bm(a).forEach(b, void 0);
  }
  function Bm(a) {
    for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
    return b;
  }
  function Cm(a, b) {
    return void 0 !== a.j[Dm(b)];
  }
  function Em(a) {
    const b = [];
    for (const c in a.j)
      void 0 !== a.j[c] && a.j.hasOwnProperty(c) && b.push(a.l[c]);
    return b;
  }
  function Fm(a) {
    const b = [];
    for (const c in a.j)
      void 0 !== a.j[c] && a.j.hasOwnProperty(c) && b.push(a.j[c]);
    return b;
  }
  const Gm = class {
    constructor() {
      this.j = {};
      this.l = {};
    }
    set(a, b) {
      const c = Dm(a);
      this.j[c] = b;
      this.l[c] = a;
    }
    remove(a) {
      a = Dm(a);
      this.j[a] = void 0;
      this.l[a] = void 0;
    }
    get(a, b) {
      a = Dm(a);
      return void 0 !== this.j[a] ? this.j[a] : b;
    }
    vb() {
      return Em(this).length;
    }
    clear() {
      this.j = {};
      this.l = {};
    }
  };
  function Dm(a) {
    return a instanceof Object ? String(Da(a)) : a + "";
  }
  const Hm = class {
    constructor(a) {
      this.j = new Gm();
      if (a) for (var b = 0; b < a.length; ++b) this.add(a[b]);
    }
    add(a) {
      this.j.set(a, !0);
    }
    remove(a) {
      this.j.remove(a);
    }
    contains(a) {
      return Cm(this.j, a);
    }
  };
  const Im = new Hm(
    "IMG AMP-IMG IFRAME AMP-IFRAME HR EMBED OBJECT VIDEO AMP-VIDEO INPUT BUTTON SVG".split(
      " "
    )
  );
  function Jm(a) {
    a && "function" == typeof a.Ea && a.Ea();
  }
  function Km() {
    this.C = this.C;
    this.I = this.I;
  }
  Km.prototype.C = !1;
  Km.prototype.Ea = function () {
    this.C || ((this.C = !0), this.l());
  };
  function Lm(a, b) {
    a.C ? b() : (a.I || (a.I = []), a.I.push(b));
  }
  Km.prototype.l = function () {
    if (this.I) for (; this.I.length; ) this.I.shift()();
  };
  function Mm(a) {
    a.j.forEach((b, c) => {
      if (b.overrides.delete(a)) {
        b = Array.from(b.overrides.values()).pop() || b.originalValue;
        var d = a.element;
        b
          ? d.style.setProperty(c, b.value, b.priority)
          : d.style.removeProperty(c);
      }
    });
  }
  function Nm(a, b, c) {
    c = { value: c, priority: "important" };
    var d = a.j.get(b);
    if (!d) {
      d = a.element;
      var e = d.style.getPropertyValue(b);
      d = {
        originalValue: e
          ? { value: e, priority: d.style.getPropertyPriority(b) }
          : null,
        overrides: new Map(),
      };
      a.j.set(b, d);
    }
    d.overrides.delete(a);
    d.overrides.set(a, c);
    a = a.element;
    c ? a.style.setProperty(b, c.value, c.priority) : a.style.removeProperty(b);
  }
  var Om = class extends Km {
    constructor(a, b) {
      super();
      this.element = b;
      a = a.googTempStyleOverrideInfo =
        a.googTempStyleOverrideInfo || new Map();
      var c = a.get(b);
      c ? (b = c) : ((c = new Map()), a.set(b, c), (b = c));
      this.j = b;
    }
    l() {
      Mm(this);
      super.l();
    }
  };
  function Pm(a, b) {
    const c = new Qm({ first: a.O, second: b.O });
    a.Z(() => R(c, { first: a.O, second: b.O }));
    b.Z(() => R(c, { first: a.O, second: b.O }));
    return c;
  }
  function Rm(...a) {
    const b = [...a],
      c = () => b.every((f) => f.O),
      d = new Qm(c()),
      e = () => {
        R(d, c());
      };
    b.forEach((f) => f.Z(e));
    return Sm(d);
  }
  function Tm(...a) {
    const b = [...a],
      c = () => -1 !== b.findIndex((f) => f.O),
      d = new Qm(c()),
      e = () => {
        R(d, c());
      };
    b.forEach((f) => f.Z(e));
    return Sm(d);
  }
  function R(a, b) {
    a.O = b;
    a.j.forEach((c) => {
      c(a.O);
    });
  }
  function Sm(a, b = Um) {
    var c = a.O;
    const d = new Qm(a.O);
    a.Z((e) => {
      b(e, c) || ((c = e), R(d, e));
    });
    return d;
  }
  function Vm(a, b) {
    return a.Z(b, !0);
  }
  function Wm(a, b, c) {
    return Vm(a, (d) => {
      d === b && c();
    });
  }
  function Xm(a, b) {
    if (!1 === a.O) b();
    else {
      var c = { Lb: null };
      c.Lb = Wm(a, !1, () => {
        c.Lb && (c.Lb(), (c.Lb = null));
        b();
      });
    }
  }
  function Ym(a, b, c) {
    Sm(a).Z((d) => {
      d === b && c();
    });
  }
  function Zm(a, b) {
    a.l && a.l();
    a.l = b.Z((c) => R(a, c), !0);
  }
  class Qm {
    constructor(a) {
      this.O = a;
      this.j = new Map();
      this.A = 1;
      this.l = null;
    }
    Z(a, b = !1) {
      const c = this.A++;
      this.j.set(c, a);
      b && a(this.O);
      return () => {
        this.j.delete(c);
      };
    }
    map(a) {
      const b = new Qm(a(this.O));
      this.Z((c) => R(b, a(c)));
      return b;
    }
  }
  function Um(a, b) {
    return a == b;
  }
  function $m(a, b) {
    ub(a.j, (c) => {
      c(b);
    });
  }
  var an = class {
    constructor() {
      this.j = [];
    }
  };
  class bn {
    constructor(a) {
      this.j = a;
    }
    Z(a) {
      this.j.j.push(a);
    }
    map(a) {
      const b = new an();
      this.Z((c) => $m(b, a(c)));
      return new bn(b);
    }
  }
  function cn(...a) {
    const b = new an();
    a.forEach((c) => {
      c.Z((d) => {
        $m(b, d);
      });
    });
    return new bn(b);
  }
  function dn(a) {
    return Sm(
      Pm(a.j, a.A).map((b) => {
        var c = b.first;
        b = b.second;
        return null == c || null == b ? null : en(c, b);
      })
    );
  }
  var gn = class {
    constructor(a) {
      this.l = a;
      this.j = new Qm(null);
      this.A = new Qm(null);
      this.B = new an();
      this.F = (b) => {
        null == this.j.O && 1 == b.touches.length && R(this.j, b.touches[0]);
      };
      this.C = (b) => {
        const c = this.j.O;
        null != c &&
          ((b = fn(c, b.changedTouches)),
          null != b &&
            (R(this.j, null), R(this.A, null), $m(this.B, en(c, b))));
      };
      this.D = (b) => {
        var c = this.j.O;
        null != c &&
          ((c = fn(c, b.changedTouches)),
          null != c && (R(this.A, c), b.preventDefault()));
      };
    }
  };
  function en(a, b) {
    return { ne: b.pageX - a.pageX, pe: b.pageY - a.pageY };
  }
  function fn(a, b) {
    if (null == b) return null;
    for (let c = 0; c < b.length; ++c)
      if (b[c].identifier == a.identifier) return b[c];
    return null;
  }
  function hn(a) {
    return Sm(
      Pm(a.j, a.l).map((b) => {
        var c = b.first;
        b = b.second;
        return null == c || null == b ? null : jn(c, b);
      })
    );
  }
  var kn = class {
    constructor(a, b) {
      this.B = a;
      this.C = b;
      this.j = new Qm(null);
      this.l = new Qm(null);
      this.A = new an();
      this.G = (c) => {
        R(this.j, c);
      };
      this.D = (c) => {
        const d = this.j.O;
        null != d && (R(this.j, null), R(this.l, null), $m(this.A, jn(d, c)));
      };
      this.F = (c) => {
        null != this.j.O && (R(this.l, c), c.preventDefault());
      };
    }
  };
  function jn(a, b) {
    return { ne: b.screenX - a.screenX, pe: b.screenY - a.screenY };
  }
  var nn = (a, b) => {
    const c = new ln(a, b);
    return () => mn(c);
  };
  function mn(a) {
    if (a.j) return !1;
    if (null == a.l) return on(a), !0;
    const b = a.l + 1e3 - new Date().getTime();
    if (1 > b) return on(a), !0;
    pn(a, b);
    return !0;
  }
  function on(a) {
    a.l = new Date().getTime();
    a.B();
  }
  function pn(a, b) {
    a.j = !0;
    a.A.setTimeout(() => {
      a.j = !1;
      on(a);
    }, b);
  }
  class ln {
    constructor(a, b) {
      this.A = a;
      this.B = b;
      this.l = null;
      this.j = !1;
    }
  }
  function qn(a) {
    return rn(hn(a.j), dn(a.l));
  }
  function sn(a) {
    return cn(new bn(a.j.A), new bn(a.l.B));
  }
  var tn = class {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
  };
  function rn(a, b) {
    return Pm(a, b).map(({ first: c, second: d }) => c || d || null);
  }
  function un(a, b) {
    return new vn(a, b);
  }
  function wn(a) {
    a.win.requestAnimationFrame(() => {
      a.C || R(a.A, new pg(a.element.offsetWidth, a.element.offsetHeight));
    });
  }
  function xn(a) {
    a.j || ((a.j = !0), a.B.observe(a.element));
    return Sm(a.A, qg);
  }
  var vn = class extends Km {
    constructor(a, b) {
      super();
      this.win = a;
      this.element = b;
      this.j = !1;
      this.A = new Qm(
        new pg(this.element.offsetWidth, this.element.offsetHeight)
      );
      this.B = new ResizeObserver(() => {
        wn(this);
      });
    }
    l() {
      this.B.disconnect();
      super.l();
    }
  };
  function yn(a, b) {
    return { top: a.j - b, right: a.A + a.l, bottom: a.j + b, left: a.A };
  }
  class zn {
    constructor(a, b, c) {
      this.A = a;
      this.j = b;
      this.l = c;
    }
  }
  function An(a, b) {
    a = a.getBoundingClientRect();
    return new Bn(a.top + sm(b), a.bottom - a.top);
  }
  function Cn(a) {
    return new Bn(Math.round(a.j), Math.round(a.l));
  }
  class Bn {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
    getHeight() {
      return this.l;
    }
  }
  function Dn(a, b) {
    a.D = !0;
    a.A = b;
    a.l.forEach((c) => {
      c(a.A);
    });
    a.l = [];
  }
  class En {
    constructor(a) {
      this.j = a;
      this.l = [];
      this.D = !1;
      this.C = this.A = null;
      this.F = nn(a, () => {
        if (null != this.C) {
          var b = nm(this.j, !0) - this.C;
          1e3 < b && Dn(this, b);
        }
      });
      this.B = null;
    }
    init(a, b) {
      null == a
        ? ((this.C = a = nm(this.j, !0)),
          this.j.addEventListener("scroll", this.F),
          null != b && b(a))
        : (this.B = this.j.setTimeout(() => {
            this.init(void 0, b);
          }, a));
    }
    Ea() {
      null != this.B && this.j.clearTimeout(this.B);
      this.j.removeEventListener("scroll", this.F);
      this.l = [];
      this.A = null;
    }
    addListener(a) {
      this.D ? a(this.A) : this.l.push(a);
    }
  }
  function Fn(a) {
    return new Gn(
      a,
      new Om(a, a.document.body),
      new Om(a, a.document.documentElement),
      new Om(a, a.document.documentElement)
    );
  }
  function Hn(a) {
    Nm(a.A, "scroll-behavior", "auto");
    const b = In(a.win);
    b.activePageScrollPreventers.add(a);
    null === b.previousWindowScroll && (b.previousWindowScroll = a.win.scrollY);
    Nm(a.j, "position", "fixed");
    Nm(a.j, "top", `${-b.previousWindowScroll}px`);
    Nm(a.j, "width", "100%");
    Nm(a.j, "overflow-x", "hidden");
    Nm(a.j, "overflow-y", "hidden");
    Nm(a.l, "overflow-x", "hidden");
    Nm(a.l, "overflow-y", "hidden");
  }
  function Jn(a) {
    Mm(a.j);
    Mm(a.l);
    const b = In(a.win);
    b.activePageScrollPreventers.delete(a);
    0 === b.activePageScrollPreventers.size &&
      (a.win.scrollTo(0, b.previousWindowScroll || 0),
      (b.previousWindowScroll = null));
    Mm(a.A);
  }
  var Gn = class {
    constructor(a, b, c, d) {
      this.win = a;
      this.j = b;
      this.l = c;
      this.A = d;
    }
  };
  function In(a) {
    return (a.googPageScrollPreventerInfo = a.googPageScrollPreventerInfo || {
      previousWindowScroll: null,
      activePageScrollPreventers: new Set(),
    });
  }
  var Kn = (a, b) => a.reduce((c, d) => c.concat(b(d)), []);
  class Ln {
    constructor(a = 1) {
      this.j = a;
    }
    next() {
      var a = (48271 * this.j) % 2147483647;
      this.j = 0 > 2147483647 * a ? a + 2147483647 : a;
      return this.j / 2147483647;
    }
  }
  function Mn(a, b, c) {
    const d = [];
    for (const e of a.j) b(e) ? d.push(e) : c(e);
    return new Nn(d);
  }
  function On(a, b = 1) {
    a = a.j.slice(0);
    const c = new Ln(b);
    Kb(a, () => c.next());
    return new Nn(a);
  }
  const Nn = class {
    constructor(a) {
      this.j = a.slice(0);
    }
    forEach(a) {
      this.j.forEach((b, c) => void a(b, c, this));
    }
    filter(a) {
      return new Nn(vb(this.j, a));
    }
    apply(a) {
      return new Nn(a(this.j.slice(0)));
    }
    sort(a) {
      return new Nn(this.j.slice(0).sort(a));
    }
    get(a) {
      return this.j[a];
    }
    add(a) {
      const b = this.j.slice(0);
      b.push(a);
      return new Nn(b);
    }
  };
  class Pn {
    constructor(a) {
      this.j = new Hm(a);
    }
    contains(a) {
      return this.j.contains(a);
    }
  }
  function Qn(a) {
    return new Rn({ value: a }, null);
  }
  function Sn(a) {
    return new Rn(null, Error(a));
  }
  function Tn(a) {
    try {
      return Qn(a());
    } catch (b) {
      return new Rn(null, b);
    }
  }
  function Un(a) {
    return null != a.j ? a.j.value : null;
  }
  function Vn(a, b) {
    null != a.j && b(a.j.value);
  }
  function Wn(a, b) {
    null != a.j || b(a.l);
    return a;
  }
  class Rn {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
    map(a) {
      return null != this.j
        ? ((a = a(this.j.value)), a instanceof Rn ? a : Qn(a))
        : this;
    }
  }
  class Xn {
    constructor() {
      this.j = new Gm();
    }
    set(a, b) {
      let c = this.j.get(a);
      c || ((c = new Hm()), this.j.set(a, c));
      c.add(b);
    }
  }
  function Yn(a) {
    return !a;
  }
  var $n = class extends J {
      constructor(a) {
        super(a, -1, Zn);
      }
      getId() {
        return v(this, 3);
      }
    },
    Zn = [4];
  class ao {
    constructor(a, { hd: b, xe: c, lf: d, ce: e }) {
      this.C = a;
      this.A = c;
      this.B = new Nn(b || []);
      this.l = e;
      this.j = d;
    }
  }
  var bo = (a) => {
      var b = a.split("~").filter((c) => 0 < c.length);
      a = new Gm();
      for (const c of b)
        (b = c.indexOf(".")),
          -1 == b ? a.set(c, "") : a.set(c.substring(0, b), c.substring(b + 1));
      return a;
    },
    eo = (a) => {
      var b = co(a);
      a = [];
      for (let c of b)
        (b = String(c.lb)),
          a.push(c.Oa + "." + (20 >= b.length ? b : b.slice(0, 19) + "_"));
      return a.join("~");
    };
  const co = (a) => {
      const b = [],
        c = a.B;
      c && c.j.length && b.push({ Oa: "a", lb: fo(c) });
      null != a.A && b.push({ Oa: "as", lb: a.A });
      null != a.j && b.push({ Oa: "i", lb: String(a.j) });
      null != a.l && b.push({ Oa: "rp", lb: String(a.l) });
      b.sort(function (d, e) {
        return d.Oa.localeCompare(e.Oa);
      });
      b.unshift({ Oa: "t", lb: go(a.C) });
      return b;
    },
    go = (a) => {
      switch (a) {
        case 0:
          return "aa";
        case 1:
          return "ma";
        default:
          throw Error("Invalid slot type" + a);
      }
    },
    fo = (a) => {
      a = a.j.slice(0).map(ho);
      a = JSON.stringify(a);
      return bh(a);
    },
    ho = (a) => {
      const b = {};
      null != v(a, 7) && (b.q = v(a, 7));
      $c(a, 2) && (b.o = v(a, 2));
      $c(a, 5) && (b.p = v(a, 5));
      return b;
    };
  function io() {
    var a = new jo();
    return w(a, 2, 1);
  }
  var jo = class extends J {
    constructor(a) {
      super(a);
    }
    setLocation(a) {
      return w(this, 1, a);
    }
  };
  function ko(a) {
    const b = [].slice.call(arguments).filter(Ud((e) => null === e));
    if (!b.length) return null;
    let c = [],
      d = {};
    b.forEach((e) => {
      c = c.concat(e.nd || []);
      d = Object.assign(d, e.wb());
    });
    return new lo(c, d);
  }
  function mo(a) {
    switch (a) {
      case 1:
        return new lo(null, { google_ad_semantic_area: "mc" });
      case 2:
        return new lo(null, { google_ad_semantic_area: "h" });
      case 3:
        return new lo(null, { google_ad_semantic_area: "f" });
      case 4:
        return new lo(null, { google_ad_semantic_area: "s" });
      default:
        return null;
    }
  }
  function no(a) {
    return null == a ? null : new lo(null, { google_ml_rank: a });
  }
  function oo(a) {
    return null == a ? null : new lo(null, { google_placement_id: eo(a) });
  }
  function po({ Re: a, We: b = null }) {
    if (null == a) return null;
    a = { google_daaos_ts: a };
    null != b && (a.google_erank = b + 1);
    return new lo(null, a);
  }
  class lo {
    constructor(a, b) {
      this.nd = a;
      this.j = b;
    }
    wb() {
      return this.j;
    }
  }
  function qo() {
    var a = new ro();
    a = w(a, 1, 1);
    var b = new so();
    b = w(b, 2, !0);
    a = od(a, 2, b);
    b = new to();
    var c = new uo();
    c = w(c, 1, 1);
    b = sd(b, 1, uo, c);
    return od(a, 3, b);
  }
  var ro = class extends J {
      constructor(a) {
        super(a);
      }
    },
    so = class extends J {
      constructor(a) {
        super(a);
      }
    },
    to = class extends J {
      constructor(a) {
        super(a, -1, vo);
      }
      j() {
        return z(this, wo, 2);
      }
    },
    uo = class extends J {
      constructor(a) {
        super(a);
      }
    },
    wo = class extends J {
      constructor(a) {
        super(a);
      }
    },
    xo = class extends J {
      constructor(a) {
        super(a);
      }
      j() {
        return B(this, 2);
      }
    },
    vo = [1];
  var yo = class extends J {
    constructor(a) {
      super(a);
    }
    j() {
      return vd(this, 1);
    }
  };
  var zo = class extends J {
    constructor(a) {
      super(a);
    }
    j() {
      return B(this, 1);
    }
    B() {
      return B(this, 2);
    }
  };
  var Co = class extends J {
      constructor(a) {
        super(a, -1, Ao);
      }
      B() {
        return z(this, Bo, 3);
      }
      j() {
        z(this, yo, 5);
      }
    },
    Bo = class extends J {
      constructor(a) {
        super(a);
      }
      j() {
        return id(this, 1);
      }
    },
    Ao = [6];
  var Do = class extends J {
    constructor(a) {
      super(a);
    }
    j() {
      return vd(this, 3);
    }
    F() {
      return F(this, 4);
    }
    G() {
      return F(this, 7);
    }
    D() {
      return z(this, zo, 5);
    }
    B() {
      return z(this, yo, 6);
    }
  };
  var Ho = class extends J {
      constructor(a) {
        super(a, -1, Eo);
      }
      G() {
        return v(this, 2);
      }
      F() {
        return v(this, 5);
      }
      j() {
        return A(this, Fo, 3);
      }
      B() {
        return v(this, 4);
      }
      D() {
        return ed(this, 6);
      }
      I() {
        return ad(this, Go, 7);
      }
    },
    Fo = class extends J {
      constructor(a) {
        super(a);
      }
    },
    Go = class extends J {
      constructor(a) {
        super(a);
      }
    },
    Eo = [3];
  var Jo = class extends J {
      constructor(a) {
        super(a, -1, Io);
      }
    },
    Io = [2];
  var Ko = class extends J {
    constructor(a) {
      super(a);
    }
  };
  var Mo = class extends J {
      constructor(a) {
        super(a, -1, Lo);
      }
    },
    Lo = [1];
  var No = class extends J {
    constructor(a) {
      super(a);
    }
    Y() {
      return z(this, $n, 1);
    }
    j() {
      return v(this, 2);
    }
  };
  var Oo = class extends J {
      constructor(a) {
        super(a);
      }
      getName() {
        return v(this, 4);
      }
    },
    Po = class extends J {
      constructor(a) {
        super(a);
      }
    },
    Qo = class extends J {
      constructor(a) {
        super(a);
      }
    },
    Ro = class extends J {
      constructor(a) {
        super(a);
      }
    },
    So = [1, 2, 3];
  var To = class extends J {
    constructor(a) {
      super(a);
    }
    j() {
      return v(this, 1);
    }
  };
  var Wo = class extends J {
      constructor(a) {
        super(a, -1, Uo);
      }
      j() {
        return A(this, Vo, 1);
      }
    },
    Vo = class extends J {
      constructor(a) {
        super(a);
      }
    },
    Uo = [1];
  var Xo = class extends J {
    constructor(a) {
      super(a);
    }
  };
  var Zo = class extends J {
      constructor(a) {
        super(a, -1, Yo);
      }
    },
    Yo = [3, 4];
  var $o = class extends J {
    constructor(a) {
      super(a);
    }
  };
  var bp = class extends J {
      constructor(a) {
        super(a, -1, ap);
      }
      Y() {
        return z(this, $n, 1);
      }
      j() {
        return v(this, 2);
      }
    },
    ap = [6, 7, 9, 10, 11];
  var dp = class extends J {
      constructor(a) {
        super(a, -1, cp);
      }
    },
    cp = [4];
  var fp = class extends J {
      constructor(a) {
        super(a, -1, ep);
      }
    },
    gp = class extends J {
      constructor() {
        super();
      }
    },
    ep = [6];
  var jp = class extends J {
      constructor(a) {
        super(a, -1, hp);
      }
      j() {
        return gd(this, 1);
      }
      B() {
        return z(this, ip, 3);
      }
    },
    mp = class extends J {
      constructor(a) {
        super(a, -1, kp);
      }
      j() {
        return A(this, lp, 1);
      }
    },
    lp = class extends J {
      constructor(a) {
        super(a);
      }
    },
    ip = class extends J {
      constructor(a) {
        super(a);
      }
      j() {
        return z(this, np, 3);
      }
    },
    np = class extends J {
      constructor(a) {
        super(a);
      }
      j() {
        return wd(this, op, 2, pp);
      }
    },
    op = class extends J {
      constructor(a) {
        super(a);
      }
    },
    qp = class extends J {
      constructor(a) {
        super(a);
      }
      j() {
        return vd(this, 1);
      }
    },
    hp = [1, 4],
    kp = [1],
    pp = [1, 2];
  var rp = class extends J {
    constructor(a) {
      super(a);
    }
  };
  function sp(a) {
    return z(a, tp, 13);
  }
  var wp = class extends J {
      constructor(a) {
        super(a, -1, up);
      }
      j() {
        return z(this, vp, 15);
      }
    },
    xp = class extends J {
      constructor() {
        super();
      }
    },
    yp = class extends J {
      constructor(a) {
        super(a);
      }
      j() {
        return v(this, 1);
      }
    },
    Ap = class extends J {
      constructor(a) {
        super(a, -1, zp);
      }
    },
    Bp = class extends J {
      constructor(a) {
        super(a);
      }
    },
    Cp = class extends J {
      constructor(a) {
        super(a);
      }
    },
    tp = class extends J {
      constructor(a) {
        super(a);
      }
    },
    Dp = class extends J {
      constructor(a) {
        super(a);
      }
    },
    vp = class extends J {
      constructor(a) {
        super(a);
      }
      j() {
        return F(this, 18, !1);
      }
      D() {
        w(this, 18, !1);
      }
      B() {
        return F(this, 21, !1);
      }
    },
    Ep = class extends J {
      constructor(a) {
        super(a);
      }
    },
    Fp = class extends J {
      constructor(a) {
        super(a);
      }
    },
    up = [1, 2, 5, 7],
    zp = [2, 5, 6, 11];
  var Gp = class extends J {
    constructor(a) {
      super(a);
    }
  };
  function Hp(a) {
    try {
      const b = a.localStorage.getItem("google_ama_settings");
      return b ? Dd(Gp, b) : null;
    } catch (b) {
      return null;
    }
  }
  function Ip(a, b) {
    if (void 0 !== a.Bc) {
      let c = Hp(b);
      c || (c = new Gp());
      void 0 !== a.Bc && w(c, 2, a.Bc);
      w(c, 1, Na() + 864e5);
      a = Fd(c);
      try {
        b.localStorage.setItem("google_ama_settings", a);
      } catch (d) {}
    } else if ((a = Hp(b)) && v(a, 1) < Na())
      try {
        b.localStorage.removeItem("google_ama_settings");
      } catch (c) {}
  }
  function Jp(a) {
    var b = [];
    Am(a.getElementsByTagName("p"), function (c) {
      100 <= Kp(c) && b.push(c);
    });
    return b;
  }
  function Kp(a) {
    if (3 == a.nodeType) return a.length;
    if (1 != a.nodeType || "SCRIPT" == a.tagName) return 0;
    var b = 0;
    Am(a.childNodes, function (c) {
      b += Kp(c);
    });
    return b;
  }
  function Lp(a) {
    return 0 == a.length || isNaN(a[0])
      ? a
      : "\\" + (30 + parseInt(a[0], 10)) + " " + a.substring(1);
  }
  function Mp(a, b) {
    if (null == a.j) return b;
    switch (a.j) {
      case 1:
        return b.slice(1);
      case 2:
        return b.slice(0, b.length - 1);
      case 3:
        return b.slice(1, b.length - 1);
      case 0:
        return b;
      default:
        throw Error("Unknown ignore mode: " + a.j);
    }
  }
  const Np = class {
    constructor(a, b, c, d) {
      this.B = a;
      this.l = b;
      this.A = c;
      this.j = d;
    }
    query(a) {
      var b = [];
      try {
        b = a.querySelectorAll(this.B);
      } catch (f) {}
      if (!b.length) return [];
      a = Db(b);
      a = Mp(this, a);
      "number" === typeof this.l &&
        ((b = this.l),
        0 > b && (b += a.length),
        (a = 0 <= b && b < a.length ? [a[b]] : []));
      if ("number" === typeof this.A) {
        b = [];
        for (var c = 0; c < a.length; c++) {
          var d = Jp(a[c]),
            e = this.A;
          0 > e && (e += d.length);
          0 <= e && e < d.length && b.push(d[e]);
        }
        a = b;
      }
      return a;
    }
    toString() {
      return JSON.stringify({
        nativeQuery: this.B,
        occurrenceIndex: this.l,
        paragraphIndex: this.A,
        ignoreMode: this.j,
      });
    }
  };
  function Op(a) {
    if (1 != a.nodeType) var b = !1;
    else if ((b = "INS" == a.tagName))
      a: {
        b = ["adsbygoogle-placeholder"];
        a = a.className ? a.className.split(/\s+/) : [];
        for (var c = {}, d = 0; d < a.length; ++d) c[a[d]] = !0;
        for (d = 0; d < b.length; ++d)
          if (!c[b[d]]) {
            b = !1;
            break a;
          }
        b = !0;
      }
    return b;
  }
  function Pp(a) {
    return Bm(a.querySelectorAll("ins.adsbygoogle-ablated-ad-slot"));
  }
  var S = class {
      constructor(a, b = !1) {
        this.j = a;
        this.defaultValue = b;
      }
    },
    T = class {
      constructor(a, b = 0) {
        this.j = a;
        this.defaultValue = b;
      }
    },
    Qp = class {
      constructor(a) {
        this.j = a;
        this.defaultValue = "";
      }
    };
  var Rp = new S(1082, !0),
    Sp = new S(1214),
    Tp = new T(1130, 100),
    Up = new S(1150),
    Vp = new T(1126, 1e4),
    Wp = new T(1032, 200),
    Xp = new Qp(14),
    Yp = new T(1159, 500),
    Zp = new S(1217),
    $p = new S(1122, !0),
    aq = new S(1196),
    bq = new S(1160),
    cq = new S(316),
    dq = new S(334),
    eq = new T(54),
    fq = new S(313),
    gq = new T(66, -1),
    hq = new T(65, -1),
    iq = new S(369),
    jq = new S(1205, !0),
    kq = new S(368),
    lq = new T(1169, 61440),
    mq = new S(1171),
    nq = new S(1151),
    oq = new T(1072, 0.75),
    pq = new T(1168, 61440),
    qq = new S(290),
    rq = new S(1147),
    sq = new S(1210),
    tq = new S(483374575),
    uq = new S(380254521, !0),
    vq = new Qp(1166),
    wq = new S(1e4),
    xq = new T(472785970, 500),
    yq = new S(447540098, !0),
    zq = new S(447540095, !0),
    Aq = new S(447540099),
    Bq = new S(447540096, !0),
    Cq = new S(83),
    Dq = new (class {
      constructor(a, b = []) {
        this.j = a;
        this.defaultValue = b;
      }
    })(472572701),
    Eq = new S(439828594),
    Fq = new S(483962503),
    Gq = new S(77),
    Hq = new S(78),
    Iq = new S(309),
    Jq = new S(80),
    Kq = new S(76),
    Lq = new S(1957),
    Mq = new S(380025941),
    Nq = new S(84),
    Oq = new S(1973),
    Pq = new S(188),
    Qq = new S(1971),
    Rq = new S(1162),
    Sq = new S(1175),
    Tq = new S(1120),
    Uq = new T(1142, 8),
    Vq = new T(1158),
    Wq = new T(1157),
    Xq = new T(1195, 1),
    Yq = new T(1119, 300),
    Zq = new T(1193, 100),
    $q = new S(1191),
    ar = new T(1103),
    br = new S(1176),
    cr = new S(473840707),
    dr = new S(483660789),
    er = new T(1114, 1),
    fr = new T(1116, 300),
    gr = new T(1110, 5),
    hr = new T(1111, 5),
    ir = new T(1112, 5),
    jr = new T(1113, 5),
    kr = new T(1104),
    lr = new T(1108),
    mr = new T(1106),
    nr = new T(1107),
    or = new T(1105),
    pr = new S(1203),
    qr = new S(471002731),
    rr = new S(480632076),
    sr = new T(1115, -1),
    tr = new S(1121),
    ur = new T(1194, 1),
    vr = new S(471262996),
    wr = new S(469675169),
    xr = new S(478725123),
    yr = new S(472491850),
    zr = new T(469675170, 3e4),
    Ar = new S(479047366, !0),
    Br = new S(471682731),
    Cr = new S(477209535),
    Dr = new S(1928),
    Er = new S(1941),
    Fr = new S(370946349),
    Gr = new S(392736476),
    Hr = new T(406149835),
    Ir = new S(432946749),
    Jr = new S(432938498),
    Kr = new T(1935);
  var Lr = class {
      constructor() {
        const a = {};
        this.A = (b, c) => (null != a[b] ? a[b] : c);
        this.B = (b, c) => (null != a[b] ? a[b] : c);
        this.j = (b, c) => (null != a[b] ? a[b] : c);
        this.C = (b, c) => (null != a[b] ? a[b] : c);
        this.l = () => {};
      }
    },
    U = (a) => O(Lr).A(a.j, a.defaultValue),
    V = (a) => O(Lr).B(a.j, a.defaultValue);
  function Mr(a, b) {
    a = new xg(a).createElement("DIV");
    const c = a.style;
    c.width = "100%";
    c.height = "auto";
    c.clear = b ? "both" : "none";
    return a;
  }
  function Nr(a, b, c) {
    switch (c) {
      case 0:
        b.parentNode && b.parentNode.insertBefore(a, b);
        break;
      case 3:
        if ((c = b.parentNode)) {
          var d = b.nextSibling;
          if (d && d.parentNode != c)
            for (; d && 8 == d.nodeType; ) d = d.nextSibling;
          c.insertBefore(a, d);
        }
        break;
      case 1:
        b.insertBefore(a, b.firstChild);
        break;
      case 2:
        b.appendChild(a);
    }
    Op(b) &&
      (b.setAttribute("data-init-display", b.style.display),
      (b.style.display = "block"));
  }
  function Or(a) {
    if (a && a.parentNode) {
      const b = a.parentNode;
      b.removeChild(a);
      Op(b) &&
        (b.style.display = b.getAttribute("data-init-display") || "none");
    }
  }
  var Qr = (a, b, c, d = 0) => {
      var e = Pr(b, c, d);
      if (e.init) {
        for (c = b = e.init; (c = e.Pb(c)); ) b = c;
        e = { anchor: b, position: e.hc };
      } else e = { anchor: b, position: c };
      a["google-ama-order-assurance"] = d;
      Nr(a, e.anchor, e.position);
    },
    Rr = (a, b, c, d = 0) => {
      U(fq) ? Qr(a, b, c, d) : Nr(a, b, c);
    };
  function Pr(a, b, c) {
    const d = (f) => {
        f = Sr(f);
        return null == f ? !1 : c < f;
      },
      e = (f) => {
        f = Sr(f);
        return null == f ? !1 : c > f;
      };
    switch (b) {
      case 0:
        return {
          init: Tr(a.previousSibling, d),
          Pb: (f) => Tr(f.previousSibling, d),
          hc: 0,
        };
      case 2:
        return {
          init: Tr(a.lastChild, d),
          Pb: (f) => Tr(f.previousSibling, d),
          hc: 0,
        };
      case 3:
        return {
          init: Tr(a.nextSibling, e),
          Pb: (f) => Tr(f.nextSibling, e),
          hc: 3,
        };
      case 1:
        return {
          init: Tr(a.firstChild, e),
          Pb: (f) => Tr(f.nextSibling, e),
          hc: 3,
        };
    }
    throw Error("Un-handled RelativePosition: " + b);
  }
  function Sr(a) {
    return a.hasOwnProperty("google-ama-order-assurance")
      ? a["google-ama-order-assurance"]
      : null;
  }
  function Tr(a, b) {
    return a && b(a) ? a : null;
  }
  var Ur = (a, b = !1) => {
    try {
      return b
        ? new pg(a.innerWidth, a.innerHeight).round()
        : Bg(a || window).round();
    } catch (c) {
      return new pg(-12245933, -12245933);
    }
  };
  function Vr(a = t) {
    a = a.devicePixelRatio;
    return "number" === typeof a ? +a.toFixed(3) : null;
  }
  function Wr(a, b = t) {
    a =
      a.scrollingElement ||
      ("CSS1Compat" == a.compatMode ? a.documentElement : a.body);
    return new og(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop);
  }
  function Xr(a) {
    try {
      return !(
        !a || !(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
      );
    } catch (b) {
      return !1;
    }
  }
  function Yr(a) {
    -1 === a.l && (a.l = xb(a.j, (b, c, d) => (c ? b + 2 ** d : b), 0));
    return a.l;
  }
  class Zr {
    constructor() {
      this.j = [];
      this.l = -1;
    }
    set(a, b = !0) {
      0 <= a &&
        52 > a &&
        Number.isInteger(a) &&
        this.j[a] !== b &&
        ((this.j[a] = b), (this.l = -1));
    }
    get(a) {
      return !!this.j[a];
    }
  }
  var $r = (a, b, c) => {
    b = b || a.google_ad_width;
    c = c || a.google_ad_height;
    if (a && a.top == a) return !1;
    const d = a.document,
      e = d.documentElement;
    if (b && c) {
      let f = 1,
        g = 1;
      a.innerHeight
        ? ((f = a.innerWidth), (g = a.innerHeight))
        : e && e.clientHeight
        ? ((f = e.clientWidth), (g = e.clientHeight))
        : d.body && ((f = d.body.clientWidth), (g = d.body.clientHeight));
      if (g > 2 * c || f > 2 * b) return !1;
    }
    return !0;
  };
  function as(a, b) {
    $g(a, (c, d) => {
      b[d] = c;
    });
  }
  var bs = (a) => {
      let b = a.location.href;
      if (a == a.top) return { url: b, Ic: !0 };
      let c = !1;
      const d = a.document;
      d && d.referrer && ((b = d.referrer), a.parent == a.top && (c = !0));
      (a = a.location.ancestorOrigins) &&
        (a = a[a.length - 1]) &&
        -1 == b.indexOf(a) &&
        ((c = !1), (b = a));
      return { url: b, Ic: c };
    },
    cs = (a) => {
      if (a == a.top) return 0;
      for (; a && a != a.top && Sg(a); a = a.parent) {
        if (a.sf_) return 2;
        if (a.$sf) return 3;
        if (a.inGptIF) return 4;
        if (a.inDapIF) return 5;
      }
      return 1;
    };
  var ds = (a, b) => {
      try {
        const c = b.document.documentElement.getBoundingClientRect(),
          d = a.getBoundingClientRect();
        return { x: d.left - c.left, y: d.top - c.top };
      } catch (c) {
        return null;
      }
    },
    es = (a, b) => {
      const c = 40 === a.google_reactive_ad_format,
        d = 16 === a.google_reactive_ad_format;
      return (
        !!a.google_ad_resizable &&
        (!a.google_reactive_ad_format || c) &&
        !d &&
        !!b.navigator &&
        /iPhone|iPod|iPad|Android|BlackBerry/.test(b.navigator.userAgent) &&
        b === b.top
      );
    },
    fs = (a, b, c) => {
      a = a.style;
      "rtl" == b ? (a.marginRight = c) : (a.marginLeft = c);
    };
  const gs = (a, b, c) => {
    a = ds(b, a);
    return "rtl" == c ? -a.x : a.x;
  };
  var hs = (a, b) => {
      b = b.parentElement;
      return b ? ((a = Yg(b, a)) ? a.direction : "") : "";
    },
    is = (a, b, c) => {
      if (0 === gs(a, b, c)) return !1;
      fs(b, c, "0px");
      const d = gs(a, b, c);
      fs(b, c, -1 * d + "px");
      a = gs(a, b, c);
      0 !== a && a !== d && fs(b, c, (d / (a - d)) * d + "px");
      return !0;
    };
  const js = RegExp("(^| )adsbygoogle($| )");
  function ks(a, b) {
    for (let c = 0; c < b.length; c++) {
      const d = b[c],
        e = ug(d.Oc);
      a[e] = d.value;
    }
  }
  function ls(a, b, c, d, e, f) {
    a = ms(a, e);
    a.wa.setAttribute("data-ad-format", d ? d : "auto");
    ns(a, b, c, f);
    return a;
  }
  function os(a, b, c = null) {
    a = ms(a, {});
    ns(a, b, null, c);
    return a;
  }
  function ns(a, b, c, d) {
    var e = [];
    if ((d = d && d.nd)) a.Va.className = d.join(" ");
    a = a.wa;
    a.className = "adsbygoogle";
    a.setAttribute("data-ad-client", b);
    c && a.setAttribute("data-ad-slot", c);
    e.length && a.setAttribute("data-ad-channel", e.join("+"));
  }
  function ms(a, b) {
    const c = Mr(a, b.clearBoth || !1);
    var d = c.style;
    d.textAlign = "center";
    b.ec && ks(d, b.ec);
    a = new xg(a).createElement("INS");
    d = a.style;
    d.display = "block";
    d.margin = "auto";
    d.backgroundColor = "transparent";
    b.Vc && (d.marginTop = b.Vc);
    b.vc && (d.marginBottom = b.vc);
    b.jb && ks(d, b.jb);
    c.appendChild(a);
    return { Va: c, wa: a };
  }
  function ps(a, b, c) {
    b.dataset.adsbygoogleStatus = "reserved";
    b.className += " adsbygoogle-noablate";
    const d = { element: b };
    c = c && c.wb();
    if (b.hasAttribute("data-pub-vars")) {
      try {
        c = JSON.parse(b.getAttribute("data-pub-vars"));
      } catch (e) {
        return;
      }
      b.removeAttribute("data-pub-vars");
    }
    c && (d.params = c);
    (a.adsbygoogle = a.adsbygoogle || []).push(d);
  }
  function qs(a) {
    const b = Pp(a.document);
    ub(b, function (c) {
      const d = rs(a, c);
      var e;
      if ((e = d)) (e = ds(c, a)), (e = !((e ? e.y : 0) < P(a).clientHeight));
      e &&
        (c.setAttribute("data-pub-vars", JSON.stringify(d)),
        c.removeAttribute("height"),
        c.style.removeProperty("height"),
        c.removeAttribute("width"),
        c.style.removeProperty("width"),
        ps(a, c));
    });
  }
  function rs(a, b) {
    b = b.getAttribute("google_element_uid");
    a = a.google_sv_map;
    if (!b || !a || !a[b]) return null;
    a = a[b];
    b = {};
    for (let c in gg) a[gg[c]] && (b[gg[c]] = a[gg[c]]);
    return b;
  }
  class ss {
    constructor() {
      var a = N`https://pagead2.googlesyndication.com/pagead/js/err_rep.js`;
      this.j = null;
      this.l = !1;
      this.B = Math.random();
      this.A = this.ma;
      this.D = a;
    }
    ge(a) {
      this.j = a;
    }
    C(a) {
      this.l = a;
    }
    ma(a, b, c = 0.01, d, e = "jserror") {
      if ((this.l ? this.B : Math.random()) > c) return !1;
      (b.error && b.meta && b.id) || (b = new Ki(b, { context: a, id: e }));
      if (d || this.j) (b.meta = {}), this.j && this.j(b.meta), d && d(b.meta);
      t.google_js_errors = t.google_js_errors || [];
      t.google_js_errors.push(b);
      t.error_rep_loaded || (Wg(t.document, this.D), (t.error_rep_loaded = !0));
      return !1;
    }
    Bb(a, b, c) {
      try {
        return b();
      } catch (d) {
        if (!this.A(a, d, 0.01, c, "jserror")) throw d;
      }
    }
    ta(a, b, c, d) {
      return (...e) => this.Bb(a, () => b.apply(c, e), d);
    }
    za(a, b, c) {
      b.catch((d) => {
        d = d ? d : "unknown rejection";
        this.ma(
          a,
          d instanceof Error ? d : Error(d),
          void 0,
          c || this.j || void 0
        );
      });
    }
  }
  const ts = (a, b) => {
    b = b.google_js_reporting_queue = b.google_js_reporting_queue || [];
    2048 > b.length && b.push(a);
  };
  var us = (a, b, c, d) => {
      const e = d || window,
        f = "undefined" !== typeof queueMicrotask;
      return function () {
        f &&
          queueMicrotask(() => {
            e.google_rum_task_id_counter = e.google_rum_task_id_counter || 1;
            e.google_rum_task_id_counter += 1;
          });
        const g = ej();
        let h,
          k = 3;
        try {
          h = b.apply(this, arguments);
        } catch (l) {
          k = 13;
          if (!c) throw l;
          c(a, l);
        } finally {
          e.google_measure_js_timing &&
            g &&
            ts(
              {
                label: a.toString(),
                value: g,
                duration: (ej() || 0) - g,
                type: k,
                ...(f && {
                  taskId: (e.google_rum_task_id_counter =
                    e.google_rum_task_id_counter || 1),
                }),
              },
              e
            );
        }
        return h;
      };
    },
    vs = (a, b) =>
      us(
        754,
        a,
        (c, d) => {
          new ss().ma(c, d);
        },
        b
      );
  function ws(a, b, c) {
    return us(a, b, void 0, c).apply();
  }
  function xs(a, b) {
    return vs(a, b).apply();
  }
  function ys(a) {
    if (!a) return null;
    var b = v(a, 7);
    if (v(a, 1) || a.getId() || 0 < gd(a, 4).length) {
      b = gd(a, 4);
      var c = v(a, 3),
        d = v(a, 1),
        e = "";
      d && (e += d);
      c && (e += "#" + Lp(c));
      if (b) for (c = 0; c < b.length; c++) e += "." + Lp(b[c]);
      a = (b = e) ? new Np(b, v(a, 2), v(a, 5), zs(v(a, 6))) : null;
    } else a = b ? new Np(b, v(a, 2), v(a, 5), zs(v(a, 6))) : null;
    return a;
  }
  var As = { 1: 1, 2: 2, 3: 3, 0: 0 };
  function zs(a) {
    return null == a ? a : As[a];
  }
  function Bs(a) {
    for (var b = [], c = 0; c < a.length; c++) {
      var d = v(a[c], 1),
        e = v(a[c], 2);
      if (d && null != e) {
        var f = {};
        f.Oc = d;
        f.value = e;
        b.push(f);
      }
    }
    return b;
  }
  function Cs(a, b) {
    var c = {};
    a && ((c.Vc = v(a, 1)), (c.vc = v(a, 2)), (c.clearBoth = !!fd(a, 3)));
    b && ((c.ec = Bs(A(b, Xo, 3))), (c.jb = Bs(A(b, Xo, 4))));
    return c;
  }
  var Ds = { 1: 0, 2: 1, 3: 2, 4: 3 },
    Es = { 0: 1, 1: 2, 2: 3, 3: 4 };
  var Fs = { Ba: "ama_success", ua: 0.1, xa: !0 },
    Gs = { Ba: "ama_failure", ua: 0.1, xa: !0 },
    Hs = { Ba: "ama_inf_scr", ua: 0.1, xa: !0 },
    Is = { Ba: "ama_inf_scr", ua: 0.1, xa: !0 },
    Js = { Ba: "ama_coverage", ua: 0.1, xa: !0 },
    Ks = { Ba: "ama_inf_scr", ua: 1, xa: !0 },
    Ls = { Ba: "ama_opt", ua: 0.1, xa: !0 },
    Ms = { Ba: "ama_aud_sen", ua: 1, xa: !0 },
    Ns = { Ba: "ama_improv", ua: 0.1, xa: !0 };
  function Os(a, b) {
    for (var c = 0; c < b.length; c++) a.qa(b[c]);
    return a;
  }
  function Ps(a, b) {
    a.A = a.A ? a.A : b;
    return a;
  }
  class Qs {
    constructor(a) {
      this.F = {};
      this.F.c = a;
      this.C = [];
      this.A = null;
      this.D = [];
      this.I = 0;
    }
    Na(a) {
      this.F.wpc = a;
      return this;
    }
    qa(a) {
      for (var b = 0; b < this.C.length; b++) if (this.C[b] == a) return this;
      this.C.push(a);
      return this;
    }
    B(a) {
      var b = ne(this.F);
      0 < this.I && (b.t = this.I);
      b.err = this.C.join();
      b.warn = this.D.join();
      this.A &&
        ((b.excp_n = this.A.name),
        (b.excp_m = this.A.message && this.A.message.substring(0, 512)),
        (b.excp_s = this.A.stack && pj(this.A.stack, "")));
      b.w = 0 < a.innerWidth ? a.innerWidth : null;
      b.h = 0 < a.innerHeight ? a.innerHeight : null;
      return b;
    }
  }
  function Rs(a, b, c) {
    !b.xa || "pvc" in c || (c.pvc = yh(a.j));
    Al(b.Ba, c, b.ua);
  }
  function Ss(a, b, c) {
    c = c.B(a.j);
    b.xa && (c.pvc = yh(a.j));
    0 < b.ua && ((c.r = b.ua), Rs(a, b, c));
  }
  var Ts = class {
    constructor(a) {
      this.j = a;
    }
  };
  function Us(a, b, c) {
    var d = a.A,
      e = P(a.j).clientHeight,
      f = z(a.l, xo, 4)?.j();
    a = a.j;
    a = a.google_ama_state = a.google_ama_state || {};
    Rs(d, Ms, {
      ...c,
      evt: b,
      vh: e,
      eid: f,
      psr: a.audioSenseSpaceReserved ? 1 : 0,
    });
  }
  var Vs = class {
    constructor(a, b, c) {
      this.j = a;
      this.A = b;
      this.l = c;
    }
  };
  const Ws = class {
    constructor(a) {
      this.j = a;
    }
    l(a, b, c, d) {
      return ls(d.document, a, null, null, this.j, b);
    }
    A() {
      return null;
    }
  };
  const Xs = class {
    constructor(a) {
      this.j = a;
    }
    l(a, b, c, d) {
      var e = 0 < A(this.j, Zo, 9).length ? A(this.j, Zo, 9)[0] : null,
        f = Cs(z(this.j, $o, 3), e);
      if (!e) return null;
      if ((e = v(e, 1))) {
        d = d.document;
        var g = c.tagName;
        c = new xg(d).createElement(g);
        c.style.clear = f.clearBoth ? "both" : "none";
        "A" == g && (c.style.display = "block");
        c.style.padding = "0px";
        c.style.margin = "0px";
        f.ec && ks(c.style, f.ec);
        d = new xg(d).createElement("INS");
        f.jb && ks(d.style, f.jb);
        c.appendChild(d);
        f = { Va: c, wa: d };
        f.wa.setAttribute("data-ad-type", "text");
        f.wa.setAttribute("data-native-settings-key", e);
        ns(f, a, null, b);
        a = f;
      } else a = null;
      return a;
    }
    A() {
      var a = 0 < A(this.j, Zo, 9).length ? A(this.j, Zo, 9)[0] : null;
      if (!a) return null;
      a = A(a, Xo, 3);
      for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if ("height" == v(c, 1) && 0 < parseInt(v(c, 2), 10))
          return parseInt(v(c, 2), 10);
      }
      return null;
    }
  };
  const Ys = class {
    constructor(a) {
      this.j = a;
    }
    l(a, b, c, d) {
      if (!this.j) return null;
      const e = this.j.google_ad_format || null,
        f = this.j.google_ad_slot || null;
      if ((c = c.style)) {
        var g = [];
        for (let h = 0; h < c.length; h++) {
          const k = c.item(h);
          "width" !== k &&
            "height" !== k &&
            g.push({ Oc: k, value: c.getPropertyValue(k) });
        }
        c = { jb: g };
      } else c = {};
      a = ls(d.document, a, f, e, c, b);
      a.wa.setAttribute("data-pub-vars", JSON.stringify(this.j));
      return a;
    }
    A() {
      return this.j ? parseInt(this.j.google_ad_height, 10) || null : null;
    }
    wb() {
      return this.j;
    }
  };
  class Zs {
    constructor(a) {
      this.l = a;
    }
    j() {
      return new lo([], {
        google_ad_type: this.l,
        google_reactive_ad_format: 26,
        google_ad_format: "fluid",
      });
    }
  }
  const $s = class {
    constructor(a, b) {
      this.B = a;
      this.A = b;
    }
    j() {
      return this.A;
    }
    l(a) {
      a = this.B.query(a.document);
      return 0 < a.length ? a[0] : null;
    }
  };
  function at(a, b, c) {
    const d = [];
    for (let r = 0; r < a.length; r++) {
      var e = a[r];
      var f = r,
        g = b,
        h = c,
        k = e.Y();
      if (k) {
        var l = ys(k);
        if (l) {
          var m = Ds[v(e, 2)],
            n = void 0 === m ? null : m;
          if (null === n) e = null;
          else {
            m = (m = z(e, $o, 3)) ? fd(m, 3) : null;
            l = new $s(l, n);
            n = dd(e, 10).slice(0);
            $c(k, 5) && n.push(1);
            var q = h ? h : {};
            h = v(e, 12);
            k = ad(e, jo, 4) ? z(e, jo, 4) : null;
            1 == v(e, 8)
              ? ((q = q.Je || null),
                (e = new bt(
                  l,
                  new Ws(Cs(z(e, $o, 3), null)),
                  q,
                  m,
                  0,
                  n,
                  k,
                  g,
                  f,
                  h,
                  e
                )))
              : (e =
                  2 == v(e, 8)
                    ? new bt(
                        l,
                        new Xs(e),
                        q.mf || new Zs("text"),
                        m,
                        1,
                        n,
                        k,
                        g,
                        f,
                        h,
                        e
                      )
                    : null);
          }
        } else e = null;
      } else e = null;
      null !== e && d.push(e);
    }
    return d;
  }
  function ct(a) {
    return a.C;
  }
  function dt(a) {
    return a.va;
  }
  function et(a) {
    return U(aq) ? (a.M || (a.M = a.I.l(a.A)), a.M) : a.I.l(a.A);
  }
  function ft(a) {
    var b = a.J;
    a = a.A.document.createElement("div");
    U(aq)
      ? (a.className = "google-auto-placed-ad-placeholder")
      : (a.className = "google-auto-placed");
    var c = a.style;
    c.textAlign = "center";
    c.width = "100%";
    c.height = "0px";
    c.clear = b ? "both" : "none";
    return a;
  }
  function gt(a) {
    return a.F instanceof Ys ? a.F.wb() : null;
  }
  function ht(a, b, c) {
    Cm(a.K, b) || a.K.set(b, []);
    a.K.get(b).push(c);
  }
  function it(a, b) {
    a.C = !0;
    U(aq) && (a.l && Or(a.l), (a.l = null));
    null != b && a.R.push(b);
  }
  function jt(a) {
    return Mr(a.A.document, a.J || !1);
  }
  function kt(a) {
    return a.F.A(a.A);
  }
  function lt(a, b = null, c = null) {
    return new bt(
      a.I,
      b || a.F,
      c || a.N,
      a.J,
      a.Ya,
      a.Jc,
      a.mc,
      a.A,
      a.ba,
      a.G,
      a.B,
      a.D,
      a.V
    );
  }
  class bt {
    constructor(
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      k,
      l = null,
      m = null,
      n = null,
      q = null
    ) {
      this.I = a;
      this.F = b;
      this.N = c;
      this.J = d;
      this.Ya = e;
      this.Jc = f;
      this.mc = g ? g : new jo();
      this.A = h;
      this.ba = k;
      this.G = l;
      this.B = m;
      (a = !m) || (a = !(m.Y() && null != v(m.Y(), 5)));
      this.va = !a;
      this.D = n;
      this.V = q;
      this.R = [];
      this.C = !1;
      this.K = new Gm();
      this.M = this.l = null;
    }
    T() {
      return this.A;
    }
    j() {
      return this.I.j();
    }
  }
  var mt = (a) =>
      a?.google_ad_slot
        ? Qn(new ao(1, { xe: a.google_ad_slot }))
        : Sn("Missing dimension when creating placement id"),
    ot = (a) => {
      switch (a.Ya) {
        case 0:
        case 1:
          var b = a.B;
          null == b
            ? (a = null)
            : ((a = b.Y()),
              null == a
                ? (a = null)
                : ((b = b.j()),
                  (a = null == b ? null : new ao(0, { hd: [a], ce: b }))));
          return null != a
            ? Qn(a)
            : Sn("Missing dimension when creating placement id");
        case 2:
          return (
            (a = nt(a)),
            null != a
              ? Qn(a)
              : Sn("Missing dimension when creating placement id")
          );
        default:
          return Sn("Invalid type: " + a.Ya);
      }
    };
  const nt = (a) => {
    if (null == a || null == a.D) return null;
    const b = z(a.D, $n, 1),
      c = z(a.D, $n, 2);
    if (null == b || null == c) return null;
    const d = a.V;
    if (null == d) return null;
    a = a.j();
    return null == a ? null : new ao(0, { hd: [b, c], lf: d, ce: Es[a] });
  };
  function pt(a) {
    const b = gt(a.W);
    return (b ? mt(b) : ot(a.W)).map((c) => eo(c));
  }
  function qt(a) {
    a.j = a.j || pt(a);
    return a.j;
  }
  function rt(a, b) {
    if (a.W.C) throw Error("AMA:AP:AP");
    Rr(b, a.Y(), a.W.j());
    it(a.W, b);
  }
  const st = class {
    constructor(a, b, c) {
      this.W = a;
      this.l = b;
      this.aa = c;
      this.j = null;
    }
    Y() {
      return this.l;
    }
    fill(a, b) {
      var c = this.W;
      (a = c.F.l(a, b, this.l, c.A)) && rt(this, a.Va);
      return a;
    }
  };
  const tt = (a, b) => {
    if (3 == b.nodeType)
      return (
        3 == b.nodeType
          ? ((b = b.data),
            (a = gb(b, "&") ? rg(b, a.document) : b),
            (a = /\S/.test(a)))
          : (a = !1),
        a
      );
    if (1 == b.nodeType) {
      var c = a.getComputedStyle(b);
      if ("0" == c.opacity || "none" == c.display || "hidden" == c.visibility)
        return !1;
      if ((c = b.tagName) && Im.contains(c.toUpperCase())) return !0;
      b = b.childNodes;
      for (c = 0; c < b.length; c++) if (tt(a, b[c])) return !0;
    }
    return !1;
  };
  var ut = (a) => {
    if (460 <= a)
      return (a = Math.min(a, 1200)), Math.ceil(800 > a ? a / 4 : 200);
    a = Math.min(a, 600);
    return 420 >= a ? Math.ceil(a / 1.2) : Math.ceil(a / 1.91) + 130;
  };
  const vt = class {
    constructor() {
      this.j = { clearBoth: !0 };
    }
    l(a, b, c, d) {
      return ls(d.document, a, null, null, this.j, b);
    }
    A(a) {
      return ut(Math.min(a.screen.width || 0, a.screen.height || 0));
    }
  };
  class wt {
    constructor(a) {
      this.l = a;
    }
    j(a) {
      a = Math.floor(a.l);
      const b = ut(a);
      return new lo(["ap_container"], {
        google_reactive_ad_format: 27,
        google_responsive_auto_format: 16,
        google_max_num_ads: 1,
        google_ad_type: this.l,
        google_ad_format: a + "x" + b,
        google_ad_width: a,
        google_ad_height: b,
      });
    }
  }
  const xt = class {
    constructor(a, b) {
      this.B = a;
      this.A = b;
    }
    l() {
      return this.B;
    }
    j() {
      return this.A;
    }
  };
  const yt = {
    TABLE: { pb: new Pn([1, 2]) },
    THEAD: { pb: new Pn([0, 3, 1, 2]) },
    TBODY: { pb: new Pn([0, 3, 1, 2]) },
    TR: { pb: new Pn([0, 3, 1, 2]) },
    TD: { pb: new Pn([0, 3]) },
  };
  function zt(a, b, c, d) {
    const e = c.childNodes;
    c = c.querySelectorAll(b);
    b = [];
    for (const f of c)
      (c = tb(e, f)), 0 > c || b.push(new At(a, [f], c, f, 3, Kg(f).trim(), d));
    return b;
  }
  function Bt(a, b, c) {
    let d = [];
    const e = [],
      f = b.childNodes,
      g = f.length;
    let h = 0,
      k = "";
    for (let n = 0; n < g; n++) {
      var l = f[n];
      if (1 == l.nodeType || 3 == l.nodeType) {
        a: {
          var m = l;
          if (1 != m.nodeType) {
            m = null;
            break a;
          }
          if ("BR" == m.tagName) break a;
          const q = c.getComputedStyle(m).getPropertyValue("display");
          m = "inline" == q || "inline-block" == q ? null : m;
        }
        m
          ? (d.length && k && e.push(new At(a, d, n - 1, m, 0, k, c)),
            (d = []),
            (h = n + 1),
            (k = ""))
          : (d.push(l), (l = Kg(l).trim()), (k += l && k ? " " + l : l));
      }
    }
    d.length && k && e.push(new At(a, d, h, b, 2, k, c));
    return e;
  }
  function Ct(a, b) {
    return a.j - b.j;
  }
  function Dt(a) {
    const b = io();
    return new bt(
      new xt(a.qc, a.rc),
      new Ws({ clearBoth: !0 }),
      null,
      !0,
      2,
      [],
      b,
      a.l,
      null,
      null,
      null,
      a.A,
      a.j
    );
  }
  class At {
    constructor(a, b, c, d, e, f, g) {
      this.A = a;
      this.mb = b.slice(0);
      this.j = c;
      this.qc = d;
      this.rc = e;
      this.B = f;
      this.l = g;
    }
    T() {
      return this.l;
    }
  }
  function Et(a) {
    return Cb(
      a.C ? Bt(a.l, a.j, a.A) : [],
      a.B ? zt(a.l, a.B, a.j, a.A) : []
    ).filter((b) => {
      var c = b.qc.tagName;
      c
        ? ((c = yt[c.toUpperCase()]), (b = null != c && c.pb.contains(b.rc)))
        : (b = !1);
      return !b;
    });
  }
  class Ft {
    constructor(a, b, c) {
      this.j = a;
      this.B = b.Mb;
      this.C = b.zd;
      this.l = b.articleStructure;
      this.A = c;
    }
  }
  function Gt(a, b) {
    return xs(() => {
      if (U(aq)) {
        var c = [],
          d = [];
        for (var e = 0; e < a.length; e++) {
          var f = a[e],
            g = et(f);
          if (g) {
            var h = f;
            if (!h.l && !h.C) {
              var k = h;
              var l = h,
                m = null;
              try {
                var n = et(l);
                if (n) {
                  m = ft(l);
                  Rr(m, n, l.j());
                  var q = m;
                } else q = null;
              } catch (E) {
                throw (Or(m), E);
              }
              k.l = q;
            }
            (h = h.l) && d.push({ Df: f, anchorElement: g, Ye: h });
          }
        }
        if (0 < d.length)
          for (q = sm(b), n = tm(b), e = 0; e < d.length; e++) {
            const { Df: E, anchorElement: D, Ye: C } = d[e];
            f = Ht(C, n, q);
            c.push(new st(E, D, f));
          }
        q = c;
      } else {
        q = [];
        n = [];
        try {
          const E = [];
          for (let D = 0; D < a.length; D++) {
            var r = a[D],
              y = et(r);
            y && E.push({ Yd: r, anchorElement: y });
          }
          for (y = 0; y < E.length; y++) {
            r = n;
            g = r.push;
            {
              k = E[y];
              l = k.anchorElement;
              m = k.Yd;
              const D = ft(m);
              try {
                Rr(D, l, m.j()), (h = D);
              } catch (C) {
                throw (Or(D), C);
              }
            }
            g.call(r, h);
          }
          c = sm(b);
          d = tm(b);
          for (g = 0; g < n.length; g++)
            (e = Ht(n[g], d, c)),
              (f = E[g]),
              q.push(new st(f.Yd, f.anchorElement, e));
        } finally {
          for (c = 0; c < n.length; c++) Or(n[c]);
        }
      }
      return q;
    }, b);
  }
  function Ht(a, b, c) {
    a = a.getBoundingClientRect();
    return new zn(a.left + b, a.top + c, a.right - a.left);
  }
  function It(a, b) {
    const c = Et(b);
    c.sort(Ct);
    return new Jt(a, b, c);
  }
  function Kt(a, b, c) {
    return new bt(
      new xt(b, c),
      new Ws({}),
      null,
      !0,
      2,
      [],
      null,
      a.j,
      null,
      null,
      null,
      a.C.l,
      null
    );
  }
  var Jt = class {
    constructor(a, b, c) {
      this.j = a;
      this.C = b;
      this.B = c;
      this.l = !1;
      this.A = 0;
    }
    next() {
      if (!this.l) {
        if (this.A >= this.B.length) var a = null;
        else {
          {
            const b = this.B[this.A++].mb[0];
            Ca(b) && 1 == b.nodeType
              ? (a = Kt(this, b, 0))
              : ((a = this.j.document.createElement("div")),
                M(a, { display: "none" }),
                b.parentNode.insertBefore(a, b),
                (a = Kt(this, a, 3)));
          }
          a = Gt([a], this.j)[0] || null;
        }
        if (a) return a;
        this.l = !0;
      }
      return null;
    }
  };
  var Lt = class {
    constructor(a) {
      this.l = a;
    }
    j() {
      return this.l.next();
    }
  };
  const Mt = { 1: "0.5vp", 2: "300px" },
    Nt = { 1: 700, 2: 1200 },
    Ot = {
      [1]: { je: "3vp", Tc: "1vp", ie: "0.3vp" },
      [2]: { je: "900px", Tc: "300px", ie: "90px" },
    };
  function Pt(a, b, c) {
    var d = Qt(a),
      e = P(a).clientHeight || Nt[d],
      f = void 0;
    c &&
      (f = (c = (c = Rt(A(c, Ho, 2), d)) ? z(c, Go, 7) : void 0)
        ? St(c, e)
        : void 0);
    c = f;
    f = Qt(a);
    a = P(a).clientHeight || Nt[f];
    const g = Tt(Ot[f].Tc, a);
    a = null === g ? Ut(f, a) : new Vt(g, g, Wt(g, g, 8), 8, 0.3, c);
    c = Tt(Ot[d].je, e);
    f = Tt(Ot[d].Tc, e);
    e = Tt(Ot[d].ie, e);
    d = a.A;
    c &&
      e &&
      f &&
      void 0 !== b &&
      (d = 0.5 >= b ? f + (1 - 2 * b) * (c - f) : e + (2 - 2 * b) * (f - e));
    b = d;
    return new Vt(d, b, Wt(d, b, a.l), a.l, a.B, a.j);
  }
  function Xt(a, b) {
    const c = Qt(a);
    a = P(a).clientHeight || Nt[c];
    if ((b = Rt(A(b, Ho, 2), c))) if ((b = Yt(b, a))) return b;
    return Ut(c, a);
  }
  function Zt(a) {
    const b = Qt(a);
    return Ut(b, P(a).clientHeight || Nt[b]);
  }
  function $t(a, b) {
    let c = { ac: a.A, eb: a.C };
    for (let d of a.D) d.adCount <= b && (c = d.Sc);
    return c;
  }
  function au(a, b, c) {
    var d = fd(b, 2);
    b = z(b, Ho, 1);
    const e = P(c).clientHeight || Nt[Qt(c)];
    c = Tt(b?.G(), e) ?? a.A;
    const f = Tt(b?.F(), e) ?? a.C;
    d = d ? [] : du(b?.j(), e) ?? a.D;
    const g = b?.B() ?? a.l,
      h = b?.D() ?? a.B;
    a = (b?.I() ? St(z(b, Go, 7), e) : null) ?? a.j;
    return new Vt(c, f, d, g, h, a);
  }
  class Vt {
    constructor(a, b, c, d, e, f) {
      this.A = a;
      this.C = b;
      this.D = c.sort((g, h) => g.adCount - h.adCount);
      this.l = d;
      this.B = e;
      this.j = f;
    }
  }
  function Rt(a, b) {
    for (let c of a) if (v(c, 1) == b) return c;
    return null;
  }
  function du(a, b) {
    if (void 0 === a) return null;
    const c = [];
    for (let d of a) {
      a = v(d, 1);
      const e = Tt(v(d, 2), b);
      if ("number" !== typeof a || null === e) return null;
      c.push({ adCount: a, Sc: { ac: e, eb: Tt(v(d, 3), b) } });
    }
    return c;
  }
  function Yt(a, b) {
    const c = Tt(v(a, 2), b),
      d = Tt(v(a, 5), b);
    if (null === c) return null;
    const e = v(a, 4);
    if (null == e) return null;
    var f = a.j();
    f = du(f, b);
    if (null === f) return null;
    const g = z(a, Go, 7);
    return new Vt(c, d, f, e, ed(a, 6), g ? St(g, b) : void 0);
  }
  function Ut(a, b) {
    a = Tt(Mt[a], b);
    return new Vt(null === a ? Infinity : a, null, [], 3, null);
  }
  function Tt(a, b) {
    if (!a) return null;
    const c = parseFloat(a);
    return isNaN(c)
      ? null
      : a.endsWith("px")
      ? c
      : a.endsWith("vp")
      ? c * b
      : null;
  }
  function Qt(a) {
    a = 900 <= P(a).clientWidth;
    return Pg() && !a ? 1 : 2;
  }
  function Wt(a, b, c) {
    if (4 > c) return [];
    const d = Math.ceil(c / 2);
    return [
      { adCount: d, Sc: { ac: 2 * a, eb: 2 * b } },
      { adCount: d + Math.ceil((c - d) / 2), Sc: { ac: 3 * a, eb: 3 * b } },
    ];
  }
  function St(a, b) {
    return {
      Qd: Tt(v(a, 2), b) || 0,
      Pd: v(a, 3) || 1,
      kb: Tt(v(a, 1), b) || 0,
    };
  }
  function eu(a, b, c) {
    return cm(
      {
        top: a.j.top - (c + 1),
        right: a.j.right + (c + 1),
        bottom: a.j.bottom + (c + 1),
        left: a.j.left - (c + 1),
      },
      b.j
    );
  }
  function fu(a) {
    if (!a.length) return null;
    const b = dm(a.map((c) => c.j));
    a = a.reduce((c, d) => c + d.l, 0);
    return new gu(b, a);
  }
  class gu {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
  }
  function hu(a = window) {
    a = a.googletag;
    return a?.apiReady ? a : void 0;
  }
  var nu = (a, b) => {
    const c = Db(b.document.querySelectorAll(".google-auto-placed")),
      d = iu(b),
      e = ju(b),
      f = ku(b),
      g = lu(b),
      h = Db(b.document.querySelectorAll("ins.adsbygoogle-ablated-ad-slot")),
      k = Db(b.document.querySelectorAll("div.googlepublisherpluginad")),
      l = Db(b.document.querySelectorAll("html > ins.adsbygoogle"));
    let m = [].concat(
      Db(
        b.document.querySelectorAll(
          "iframe[id^=aswift_],iframe[id^=google_ads_frame]"
        )
      ),
      Db(b.document.querySelectorAll("body ins.adsbygoogle"))
    );
    b = [];
    for (const [n, q] of [
      [a.Qb, c],
      [a.Xa, d],
      [a.jf, e],
      [a.Rb, f],
      [a.Sb, g],
      [a.gf, h],
      [a.hf, k],
      [a.kf, l],
    ])
      (a = q), !1 === n ? (b = b.concat(a)) : (m = m.concat(a));
    a = mu(m);
    b = mu(b);
    a = a.slice(0);
    for (const n of b)
      for (b = 0; b < a.length; b++)
        (n.contains(a[b]) || a[b].contains(n)) && a.splice(b, 1);
    return a;
  };
  const ou = (a) => {
      const b = hu(a);
      return b
        ? vb(
            wb(b.pubads().getSlots(), (c) =>
              a.document.getElementById(c.getSlotElementId())
            ),
            (c) => null != c
          )
        : null;
    },
    iu = (a) =>
      Db(
        a.document.querySelectorAll(
          "ins.adsbygoogle[data-anchor-shown],ins.adsbygoogle[data-anchor-status]"
        )
      ),
    ju = (a) =>
      Db(
        a.document.querySelectorAll(
          "ins.adsbygoogle[data-ad-format=autorelaxed]"
        )
      ),
    ku = (a) =>
      (ou(a) || Db(a.document.querySelectorAll("div[id^=div-gpt-ad]"))).concat(
        Db(a.document.querySelectorAll("iframe[id^=google_ads_iframe]"))
      ),
    lu = (a) =>
      Db(
        a.document.querySelectorAll(
          "div.trc_related_container,div.OUTBRAIN,div[id^=rcjsload],div[id^=ligatusframe],div[id^=crt-],iframe[id^=cto_iframe],div[id^=yandex_], div[id^=Ya_sync],iframe[src*=adnxs],div.advertisement--appnexus,div[id^=apn-ad],div[id^=amzn-native-ad],iframe[src*=amazon-adsystem],iframe[id^=ox_],iframe[src*=openx],img[src*=openx],div[class*=adtech],div[id^=adtech],iframe[src*=adtech],div[data-content-ad-placement=true],div.wpcnt div[id^=atatags-]"
        )
      );
  var mu = (a) => {
    const b = [];
    for (const c of a) {
      a = !0;
      for (let d = 0; d < b.length; d++) {
        const e = b[d];
        if (e.contains(c)) {
          a = !1;
          break;
        }
        if (c.contains(e)) {
          a = !1;
          b[d] = c;
          break;
        }
      }
      a && b.push(c);
    }
    return b;
  };
  var pu = xl.ta(453, nu),
    qu;
  qu = xl.ta(454, (a, b) => {
    const c = Db(b.document.querySelectorAll(".google-auto-placed")),
      d = iu(b),
      e = ju(b),
      f = ku(b),
      g = lu(b),
      h = Db(b.document.querySelectorAll("ins.adsbygoogle-ablated-ad-slot")),
      k = Db(b.document.querySelectorAll("div.googlepublisherpluginad"));
    b = Db(b.document.querySelectorAll("html > ins.adsbygoogle"));
    return mu(
      [].concat(
        !0 === a.Qb ? c : [],
        !0 === a.Xa ? d : [],
        !0 === a.jf ? e : [],
        !0 === a.Rb ? f : [],
        !0 === a.Sb ? g : [],
        !0 === a.gf ? h : [],
        !0 === a.hf ? k : [],
        !0 === a.kf ? b : []
      )
    );
  });
  function ru(a, b, c) {
    const d = su(a);
    b = tu(d, b, c);
    return new uu(a, d, b);
  }
  function vu(a) {
    return 1 < (a.bottom - a.top) * (a.right - a.left);
  }
  function wu(a) {
    return a.j.map((b) => b.box);
  }
  function xu(a) {
    return a.j.reduce((b, c) => b + c.box.bottom - c.box.top, 0);
  }
  class uu {
    constructor(a, b, c) {
      this.A = a;
      this.j = b.slice(0);
      this.B = c.slice(0);
      this.l = null;
    }
  }
  function su(a) {
    const b = pu({ Xa: !1 }, a),
      c = tm(a),
      d = sm(a);
    return b
      .map((e) => {
        const f = e.getBoundingClientRect();
        return (e = !!e.className && gb(e.className, "google-auto-placed")) ||
          vu(f)
          ? {
              box: {
                top: f.top + d,
                right: f.right + c,
                bottom: f.bottom + d,
                left: f.left + c,
              },
              Rj: e ? 1 : 0,
            }
          : null;
      })
      .filter(Ud((e) => null === e));
  }
  function tu(a, b, c) {
    return void 0 != b && a.length <= (void 0 != c ? c : 8)
      ? yu(a, b)
      : wb(a, (d) => new gu(d.box, 1));
  }
  function yu(a, b) {
    a = wb(a, (d) => new gu(d.box, 1));
    const c = [];
    for (; 0 < a.length; ) {
      let d = a.pop(),
        e = !0;
      for (; e; ) {
        e = !1;
        for (let f = 0; f < a.length; f++)
          if (eu(d, a[f], b)) {
            d = fu([d, a[f]]);
            Array.prototype.splice.call(a, f, 1);
            e = !0;
            break;
          }
      }
      c.push(d);
    }
    return c;
  }
  function zu(a, b, c) {
    const d = yn(c, b);
    return !zb(a, (e) => cm(e, d));
  }
  function Au(a, b, c, d, e) {
    e = e.aa;
    const f = yn(e, b),
      g = yn(e, c),
      h = yn(e, d);
    return !zb(a, (k) => cm(k, g) || (cm(k, f) && !cm(k, h)));
  }
  function Bu(a, b, c, d) {
    const e = wu(a);
    if (zu(e, b, d.aa)) return !0;
    if (!Au(e, b, c.Qd, c.kb, d)) return !1;
    const f = new gu(yn(d.aa, 0), 1);
    a = vb(a.B, (g) => eu(g, f, c.kb));
    b = xb(a, (g, h) => g + h.l, 1);
    return 0 === a.length || b > c.Pd ? !1 : !0;
  }
  var Cu = (a, b) => {
    const c = [];
    let d = a;
    for (
      a = () => {
        c.push({ anchor: d.anchor, position: d.position });
        return d.anchor == b.anchor && d.position == b.position;
      };
      d;

    ) {
      switch (d.position) {
        case 1:
          if (a()) return c;
          d.position = 2;
        case 2:
          if (a()) return c;
          if (d.anchor.firstChild) {
            d = { anchor: d.anchor.firstChild, position: 1 };
            continue;
          } else d.position = 3;
        case 3:
          if (a()) return c;
          d.position = 4;
        case 4:
          if (a()) return c;
      }
      for (
        ;
        d &&
        !d.anchor.nextSibling &&
        d.anchor.parentNode != d.anchor.ownerDocument.body;

      ) {
        d = { anchor: d.anchor.parentNode, position: 3 };
        if (a()) return c;
        d.position = 4;
        if (a()) return c;
      }
      d && d.anchor.nextSibling
        ? (d = { anchor: d.anchor.nextSibling, position: 1 })
        : (d = null);
    }
    return c;
  };
  function Du(a, b) {
    const c = new Xn(),
      d = new Hm();
    b.forEach((e) => {
      if (wd(e, Po, 1, So)) {
        e = wd(e, Po, 1, So);
        if (z(e, No, 1) && z(e, No, 1).Y() && z(e, No, 2) && z(e, No, 2).Y()) {
          const g = Eu(a, z(e, No, 1).Y()),
            h = Eu(a, z(e, No, 2).Y());
          if (g && h)
            for (var f of Cu(
              { anchor: g, position: z(e, No, 1).j() },
              { anchor: h, position: z(e, No, 2).j() }
            ))
              c.set(Da(f.anchor), f.position);
        }
        z(e, No, 3) &&
          z(e, No, 3).Y() &&
          (f = Eu(a, z(e, No, 3).Y())) &&
          c.set(Da(f), z(e, No, 3).j());
      } else
        wd(e, Qo, 2, So)
          ? Fu(a, wd(e, Qo, 2, So), c)
          : wd(e, Ro, 3, So) && Gu(a, wd(e, Ro, 3, So), d);
    });
    return new Hu(c, d);
  }
  class Hu {
    constructor(a, b) {
      this.l = a;
      this.j = b;
    }
  }
  const Fu = (a, b, c) => {
      z(b, No, 2)
        ? ((b = z(b, No, 2)), (a = Eu(a, b.Y())) && c.set(Da(a), b.j()))
        : z(b, $n, 1) &&
          (a = Iu(a, z(b, $n, 1))) &&
          a.forEach((d) => {
            d = Da(d);
            c.set(d, 1);
            c.set(d, 4);
            c.set(d, 2);
            c.set(d, 3);
          });
    },
    Gu = (a, b, c) => {
      z(b, $n, 1) &&
        (a = Iu(a, z(b, $n, 1))) &&
        a.forEach((d) => {
          c.add(Da(d));
        });
    },
    Eu = (a, b) => ((a = Iu(a, b)) && 0 < a.length ? a[0] : null),
    Iu = (a, b) => ((b = ys(b)) ? b.query(a) : null);
  function Ju(a, b, c) {
    switch (c) {
      case 2:
      case 3:
        break;
      case 1:
      case 4:
        b = b.parentElement;
        break;
      default:
        throw Error("Unknown RelativePosition: " + c);
    }
    for (c = []; b; ) {
      if (Ku(b)) return !0;
      if (a.j.has(b)) break;
      c.push(b);
      b = b.parentElement;
    }
    c.forEach((d) => a.j.add(d));
    return !1;
  }
  function Lu(a) {
    a = Mu(a);
    return a.has("all") || a.has("after");
  }
  function Nu(a) {
    a = Mu(a);
    return a.has("all") || a.has("before");
  }
  function Mu(a) {
    return (a = a && a.getAttribute("data-no-auto-ads"))
      ? new Set(a.split("|"))
      : new Set();
  }
  function Ku(a) {
    const b = Mu(a);
    return (
      a &&
      ("AUTO-ADS-EXCLUSION-AREA" === a.tagName ||
        b.has("inside") ||
        b.has("all"))
    );
  }
  var Ou = class {
    constructor() {
      this.j = new Set();
    }
  };
  function Pu(a) {
    return function (b) {
      return Gt(b, a);
    };
  }
  function Qu(a) {
    const b = P(a).clientHeight;
    return b ? Ma(Ru, b + sm(a)) : Rd;
  }
  function Su(a, b, c) {
    if (0 > a) throw Error("ama::ead:nd");
    if (Infinity === a) return Rd;
    const d = wu(c || ru(b));
    return (e) => zu(d, a, e.aa);
  }
  function Tu(a, b, c, d) {
    if (0 > a || 0 > b.Qd || 0 > b.Pd || 0 > b.kb) throw Error("ama::ead:nd");
    return Infinity === a ? Rd : (e) => Bu(d || ru(c, b.kb), a, b, e);
  }
  function Uu(a) {
    if (!a.length) return Rd;
    const b = new Pn(a);
    return (c) => b.contains(c.Ya);
  }
  function Vu(a) {
    return function (b) {
      for (let c of b.Jc) if (-1 < a.indexOf(c)) return !1;
      return !0;
    };
  }
  function Wu(a) {
    return a.length
      ? function (b) {
          const c = b.Jc;
          return a.some((d) => -1 < c.indexOf(d));
        }
      : Sd;
  }
  function Xu(a, b) {
    if (0 >= a) return Sd;
    const c = P(b).scrollHeight - a;
    return function (d) {
      return d.aa.j <= c;
    };
  }
  function Yu(a) {
    const b = {};
    a &&
      a.forEach((c) => {
        b[c] = !0;
      });
    return function (c) {
      return !b[v(c.mc, 2) || 0];
    };
  }
  function Zu(a) {
    return a.length ? (b) => a.includes(v(b.mc, 1) || 0) : Sd;
  }
  function $u(a, b) {
    const c = Du(a, b);
    return function (d) {
      var e = d.Y();
      d = Es[d.W.j()];
      var f = Da(e);
      f = c.l.j.get(f);
      if (!(f = f ? f.contains(d) : !1))
        a: {
          if (c.j.contains(Da(e)))
            switch (d) {
              case 2:
              case 3:
                f = !0;
                break a;
              default:
                f = !1;
                break a;
            }
          for (e = e.parentElement; e; ) {
            if (c.j.contains(Da(e))) {
              f = !0;
              break a;
            }
            e = e.parentElement;
          }
          f = !1;
        }
      return !f;
    };
  }
  function av() {
    const a = new Ou();
    return function (b) {
      var c = b.Y();
      b = Es[b.W.j()];
      a: switch (b) {
        case 1:
          var d = Lu(c.previousElementSibling) || Nu(c);
          break a;
        case 4:
          d = Lu(c) || Nu(c.nextElementSibling);
          break a;
        case 2:
          d = Nu(c.firstElementChild);
          break a;
        case 3:
          d = Lu(c.lastElementChild);
          break a;
        default:
          throw Error("Unknown RelativePosition: " + b);
      }
      return !(d || Ju(a, c, b));
    };
  }
  const Ru = (a, b) => b.aa.j >= a,
    bv = (a, b, c) => {
      c = c.aa.l;
      return a <= c && c <= b;
    };
  var cv = class {
    constructor(a, b) {
      this.A = a;
      this.l = b;
    }
    j() {
      const a = Qu(this.A);
      let b = this.l.next();
      for (; b; ) {
        if (a(b)) return b;
        b = this.l.next();
      }
      return null;
    }
  };
  var dv = class {
    constructor(a, b) {
      this.l = a;
      this.A = b;
    }
    j() {
      var a = new bp();
      var b = z(this.A.l, $n, 1);
      a = od(a, 1, b);
      a = w(w(a, 2, 2), 8, 1);
      a = at([a], this.l);
      return Gt(a, this.l)[0] || null;
    }
  };
  var ev = (a) => {
      let b = 0;
      a.forEach((c) => (b = Math.max(b, c.getBoundingClientRect().width)));
      return (c) => c.getBoundingClientRect().width > 0.5 * b;
    },
    fv = (a) => {
      const b = P(a).clientHeight || 0;
      return (c) => c.getBoundingClientRect().height >= 0.75 * b;
    };
  function gv(a, b) {
    if (!b) return !1;
    const c = Da(b),
      d = a.j.get(c);
    if (null != d) return d;
    if (
      1 == b.nodeType &&
      ("UL" == b.tagName || "OL" == b.tagName) &&
      "none" != a.l.getComputedStyle(b).getPropertyValue("list-style-type")
    )
      return a.j.set(c, !0), !0;
    b = gv(a, b.parentNode);
    a.j.set(c, b);
    return b;
  }
  function hv(a, b) {
    return zb(b.mb, (c) => gv(a, c));
  }
  class iv {
    constructor(a) {
      this.j = new Gm();
      this.l = a;
    }
  }
  class jv {
    constructor(a, b) {
      this.B = a;
      this.j = [];
      this.l = [];
      this.A = b;
    }
  }
  var lv = (a, { Vj: b = !1, Wj: c = 3, Sf: d = null } = {}) => {
      a = Et(a);
      return kv(a, b, c, d);
    },
    kv = (a, b = !1, c = 3, d = null) => {
      if (2 > c) throw Error("minGroupSize should be at least 2, found " + c);
      var e = a.slice(0);
      e.sort(Ct);
      a = [];
      b = new jv(b, d);
      for (const l of e) {
        d = b;
        e = {
          ic: l,
          Tb: 51 > l.B.length ? !1 : null != d.A ? !hv(d.A, l) : !0,
        };
        if (d.B || e.Tb) {
          if (d.j.length) {
            var f = d.j[d.j.length - 1].ic;
            b: {
              var g = f.T();
              var h = f.mb[f.mb.length - 1];
              f = e.ic.mb[0];
              if (!h || !f) {
                g = !1;
                break b;
              }
              var k = h.parentElement;
              const m = f.parentElement;
              if (k && m && k == m) {
                k = 0;
                for (h = h.nextSibling; 10 > k && h; ) {
                  if (h == f) {
                    g = !0;
                    break b;
                  }
                  if (tt(g, h)) break;
                  h = h.nextSibling;
                  k++;
                }
                g = !1;
              } else g = !1;
            }
          } else g = !0;
          g
            ? (d.j.push(e), e.Tb && d.l.push(e.ic))
            : ((d.j = [e]), (d.l = e.Tb ? [e.ic] : []));
        }
        if (b.l.length >= c) {
          if (1 >= b.l.length) d = null;
          else {
            e = b.l[1];
            for (d = b; d.j.length && !d.j[0].Tb; ) d.j.shift();
            d.j.shift();
            d.l.shift();
            d = e;
          }
          d && a.push(d);
        }
      }
      return a;
    };
  var nv = (a, b) => {
      a = mv(a, b);
      const c = new iv(b);
      return Kn(a, (d) => lv(d, { Sf: c }));
    },
    mv = (a, b) => {
      const c = new Gm();
      a.forEach((d) => {
        var e = ys(z(d, $n, 1));
        if (e) {
          const f = e.toString();
          Cm(c, f) ||
            c.set(f, { articleStructure: d, Ae: e, Mb: null, zd: !1 });
          e = c.get(f);
          (d = (d = z(d, $n, 2)) ? v(d, 7) : null)
            ? (e.Mb = e.Mb ? e.Mb + "," + d : d)
            : (e.zd = !0);
        }
      });
      return Fm(c)
        .map((d) => {
          const e = d.Ae.query(b.document);
          return e.length ? new Ft(e[0], d, b) : null;
        })
        .filter((d) => null != d);
    };
  var ov = (a, b) => {
    b = mv(b, a);
    const c = b.map((d) => d.j);
    b = b
      .filter((d) => {
        d = d.j.getBoundingClientRect();
        return 0 < d.width && 0 < d.height;
      })
      .filter((d) => ev(c)(d.j))
      .filter((d) => fv(a)(d.j));
    b.sort((d, e) => {
      e = e.j;
      return d.j.getBoundingClientRect().top - e.getBoundingClientRect().top;
    });
    return b;
  };
  var qv = (a, b, c) => {
    if (F(c, 2)) {
      if (
        a.document.getElementById(
          "google-auto-placed-read-aloud-player-reserved"
        )
      ) {
        var d = new bp();
        var e = new $n();
        e = w(e, 7, "div#google-auto-placed-read-aloud-player-reserved");
        d = od(d, 1, e);
        d = w(w(d, 2, 2), 8, 1);
        d = at([d], a);
        d = Gt(d, a)[0] || null;
      } else d = null;
      if (d) return d;
    }
    a: {
      c = pv(c);
      b = ov(a, b);
      for (const f of b) {
        b: switch (((b = a), (d = f), (e = c), e)) {
          case 1:
            b = new dv(b, d);
            break b;
          case 2:
            b = new Lt(It(b, d));
            break b;
          case 3:
            b = new cv(b, It(b, d));
            break b;
          default:
            throw Error(`Unknown position: ${e}`);
        }
        if ((b = b.j())) {
          a = b;
          break a;
        }
      }
      a = null;
    }
    return a;
  };
  function pv(a) {
    if (F(a, 2)) return 3;
    switch (id(a, 1)) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      default:
        throw Error(`Unknown player position: ${id(a, 1)}`);
    }
  }
  var rv = class {
      constructor(a) {
        this.j = a;
      }
    },
    uv = (a, b, c, d, e) => {
      if (
        0 < a.document.getElementsByTagName("google-read-aloud-player").length
      )
        return Sn("Player already created");
      var f = a.document;
      const g = f.createElement("div");
      g.id = "google-auto-placed-read-aloud-player";
      M(g, { padding: "5px" });
      const h = f.createElement("script");
      var k = ii`window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;`;
      h.textContent = ue(k);
      Jf(h);
      g.appendChild(h);
      sv(f, g, Pd("https://www.google-analytics.com/analytics.js"));
      sv(
        f,
        g,
        Pd(
          "https://www.gstatic.com/readaloud/player/web/api/audiosense/js/api.js"
        )
      );
      f = f.createElement("google-read-aloud-player");
      f.setAttribute("data-api-key", "AIzaSyDTBU0XpbvyTzmA5nS-09w7cnopRavFpxs");
      f.setAttribute("data-tracking-ids", "UA-199725947-1,UA-168915890-13");
      f.setAttribute("data-url", c.url);
      f.setAttribute("data-locale", d);
      f.setAttribute("data-voice", "en-us-m-6");
      e &&
        ($c(e, 1) &&
          0 != id(e, 1) &&
          f.setAttribute("data-docking-begin-trigger", tv[id(e, 1)]),
        null != v(e, 2) && f.setAttribute("data-experiment", e.j()));
      g.appendChild(f);
      rt(b, g);
      return Qn(
        new rv(a.document.getElementsByTagName("google-read-aloud-player")[0])
      );
    };
  const sv = (a, b, c) => {
      a = a.createElement("script");
      Kf(a, Be(Od(c)));
      a.setAttribute("async", "true");
      b.appendChild(a);
    },
    tv = { [1]: "out-of-view" };
  class vv {
    constructor() {
      this.promise = new Promise((a, b) => {
        this.resolve = a;
        this.j = b;
      });
    }
  }
  function wv() {
    const { promise: a, resolve: b } = new vv();
    return { promise: a, resolve: b };
  }
  function xv(a, b, c = () => {}) {
    b.google_llp || (b.google_llp = {});
    b = b.google_llp;
    let d = b[a];
    if (d) return d;
    d = wv();
    b[a] = d;
    c();
    return d;
  }
  function yv(a, b, c) {
    return xv(a, b, () => {
      Wg(b.document, c);
    }).promise;
  }
  function zv(a, b, c, d) {
    a = yv(7, a, c).then((e) => {
      e.init(b);
      e.handleAdConfig({
        preloadAdBreaks: $c(d, 1) && F(d, 1) ? "auto" : "on",
        sound: "on",
      });
      return e;
    });
    xl.za(915, a);
    return new Av(a);
  }
  function Bv(a, b) {
    a = a.j.then((c) => {
      c.handleAdBreak({
        type: "preroll",
        name: "audiosense-preroll",
        adBreakDone: b,
      });
    });
    xl.za(956, a);
  }
  var Av = class {
    constructor(a) {
      this.j = a;
    }
  };
  function Cv(a) {
    const b = a.A.j;
    b.addEventListener("firstplay", () => {
      if (!a.l) {
        a.l = !0;
        b.pause();
        const c = performance.now();
        Bv(a.B, () => {
          b.play();
          Us(a.j, "preroll", { Tj: performance.now() - c });
        });
        Us(a.j, "play", {});
      }
    });
  }
  var Dv = class {
    constructor(a, b, c) {
      this.A = a;
      this.B = b;
      this.j = c;
      this.l = !1;
    }
  };
  function Ev(a, b, c, d, e, f, g) {
    return 0 == d.length
      ? Sn("No ArticleStructure found")
      : z(c, so, 2)
      ? Qn(new Fv(a, b, d, c, e, f, g ? g : "en"))
      : Sn("No AudioSenseConfig.PlacementConfig found");
  }
  function Gv(a) {
    const b = qv(a.B, a.G, z(a.l, so, 2));
    if (b) {
      var c = !!a.C.Db && Hv(a);
      c && (a.D = zv(a.B, a.F, a.C.Db, z(a.l, to, 3)?.j() || new wo()));
      var d = uv(a.B, b, a.C, a.I, z(a.l, xo, 4) || void 0);
      null != d.j
        ? ((a.A = d.j.value),
          a.A.j.addEventListener("firstview", () => {
            Us(a.j, "view", {});
          }),
          c && Cv(new Dv(a.A, a.D, a.j)),
          Us(a.j, "place", { sts: "ok", pp: b.aa.j }))
        : Us(a.j, "place", { sts: "wf" });
    } else Us(a.j, "place", { sts: "pf" });
  }
  function Hv(a) {
    return (a = z(a.l, to, 3)) ? A(a, uo, 1).some((b) => 1 === id(b, 1)) : !1;
  }
  var Fv = class {
    constructor(a, b, c, d, e, f, g) {
      this.B = a;
      this.j = new Vs(a, b, d);
      this.G = c;
      this.l = d;
      this.C = e;
      this.F = f;
      this.I = g;
      this.A = this.D = null;
    }
  };
  var Iv = {},
    Jv = {},
    Kv = {},
    Lv = {},
    Mv = {};
  function Nv() {
    throw Error("Do not instantiate directly");
  }
  Nv.prototype.pd = null;
  Nv.prototype.Ca = function () {
    return this.content;
  };
  Nv.prototype.toString = function () {
    return this.content;
  };
  function Ov(a) {
    if (a.qd !== Iv) throw Error("Sanitized content was not of kind HTML.");
    return ff(a.toString());
  }
  function Pv() {
    Nv.call(this);
  }
  Ra(Pv, Nv);
  Pv.prototype.qd = Iv;
  function Qv(a, b) {
    return null != a && a.qd === b;
  }
  function Rv(a) {
    if (null != a)
      switch (a.pd) {
        case 1:
          return 1;
        case -1:
          return -1;
        case 0:
          return 0;
      }
    return null;
  }
  function Sv(a) {
    return Qv(a, Iv)
      ? a
      : a instanceof df
      ? Tv(cf(a).toString())
      : a instanceof df
      ? Tv(cf(a).toString())
      : Tv(String(String(a)).replace(Uv, Vv), Rv(a));
  }
  var Tv = (function (a) {
    function b(c) {
      this.content = c;
    }
    b.prototype = a.prototype;
    return function (c, d) {
      c = new b(String(c));
      void 0 !== d && (c.pd = d);
      return c;
    };
  })(Pv);
  function Wv(a) {
    return a.replace(/<\//g, "<\\/").replace(/\]\]>/g, "]]\\>");
  }
  function Xv(a) {
    return Qv(a, Iv)
      ? String(String(a.Ca()).replace(Yv, "").replace(Zv, "&lt;")).replace(
          $v,
          Vv
        )
      : String(a).replace(Uv, Vv);
  }
  function aw(a) {
    a = String(a);
    const b = (d, e, f) => {
      const g = Math.min(e.length - f, d.length);
      for (let k = 0; k < g; k++) {
        var h = e[f + k];
        if (d[k] !== ("A" <= h && "Z" >= h ? h.toLowerCase() : h)) return !1;
      }
      return !0;
    };
    for (var c = 0; -1 != (c = a.indexOf("<", c)); ) {
      if (b("\x3c/script", a, c) || b("\x3c!--", a, c)) return "zSoyz";
      c += 1;
    }
    return a;
  }
  function bw(a) {
    if (null == a) return " null ";
    if (Qv(a, Jv)) return a.Ca();
    if (a instanceof ve || a instanceof ve) return ue(a).toString();
    switch (typeof a) {
      case "boolean":
      case "number":
        return " " + a + " ";
      default:
        return "'" + String(String(a)).replace(cw, dw) + "'";
    }
  }
  function W(a) {
    Qv(a, Mv)
      ? (a = Wv(a.Ca()))
      : null == a
      ? (a = "")
      : a instanceof Pe
      ? (a = Wv(Oe(a)))
      : a instanceof Pe
      ? (a = Wv(Oe(a)))
      : a instanceof af
      ? (a = Wv($e(a)))
      : a instanceof af
      ? (a = Wv($e(a)))
      : ((a = String(a)), (a = ew.test(a) ? a : "zSoyz"));
    return a;
  }
  const fw = {
    "\x00": "&#0;",
    "\t": "&#9;",
    "\n": "&#10;",
    "\v": "&#11;",
    "\f": "&#12;",
    "\r": "&#13;",
    " ": "&#32;",
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "-": "&#45;",
    "/": "&#47;",
    "<": "&lt;",
    "=": "&#61;",
    ">": "&gt;",
    "`": "&#96;",
    "\u0085": "&#133;",
    "\u00a0": "&#160;",
    "\u2028": "&#8232;",
    "\u2029": "&#8233;",
  };
  function Vv(a) {
    return fw[a];
  }
  const gw = {
    "\x00": "\\x00",
    "\b": "\\x08",
    "\t": "\\t",
    "\n": "\\n",
    "\v": "\\x0b",
    "\f": "\\f",
    "\r": "\\r",
    '"': "\\x22",
    $: "\\x24",
    "&": "\\x26",
    "'": "\\x27",
    "(": "\\x28",
    ")": "\\x29",
    "*": "\\x2a",
    "+": "\\x2b",
    ",": "\\x2c",
    "-": "\\x2d",
    ".": "\\x2e",
    "/": "\\/",
    ":": "\\x3a",
    "<": "\\x3c",
    "=": "\\x3d",
    ">": "\\x3e",
    "?": "\\x3f",
    "[": "\\x5b",
    "\\": "\\\\",
    "]": "\\x5d",
    "^": "\\x5e",
    "{": "\\x7b",
    "|": "\\x7c",
    "}": "\\x7d",
    "\u0085": "\\x85",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
  };
  function dw(a) {
    return gw[a];
  }
  const hw = {
    "\x00": "%00",
    "\u0001": "%01",
    "\u0002": "%02",
    "\u0003": "%03",
    "\u0004": "%04",
    "\u0005": "%05",
    "\u0006": "%06",
    "\u0007": "%07",
    "\b": "%08",
    "\t": "%09",
    "\n": "%0A",
    "\v": "%0B",
    "\f": "%0C",
    "\r": "%0D",
    "\u000e": "%0E",
    "\u000f": "%0F",
    "\u0010": "%10",
    "\u0011": "%11",
    "\u0012": "%12",
    "\u0013": "%13",
    "\u0014": "%14",
    "\u0015": "%15",
    "\u0016": "%16",
    "\u0017": "%17",
    "\u0018": "%18",
    "\u0019": "%19",
    "\u001a": "%1A",
    "\u001b": "%1B",
    "\u001c": "%1C",
    "\u001d": "%1D",
    "\u001e": "%1E",
    "\u001f": "%1F",
    " ": "%20",
    '"': "%22",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "<": "%3C",
    ">": "%3E",
    "\\": "%5C",
    "{": "%7B",
    "}": "%7D",
    "\u007f": "%7F",
    "\u0085": "%C2%85",
    "\u00a0": "%C2%A0",
    "\u2028": "%E2%80%A8",
    "\u2029": "%E2%80%A9",
    "\uff01": "%EF%BC%81",
    "\uff03": "%EF%BC%83",
    "\uff04": "%EF%BC%84",
    "\uff06": "%EF%BC%86",
    "\uff07": "%EF%BC%87",
    "\uff08": "%EF%BC%88",
    "\uff09": "%EF%BC%89",
    "\uff0a": "%EF%BC%8A",
    "\uff0b": "%EF%BC%8B",
    "\uff0c": "%EF%BC%8C",
    "\uff0f": "%EF%BC%8F",
    "\uff1a": "%EF%BC%9A",
    "\uff1b": "%EF%BC%9B",
    "\uff1d": "%EF%BC%9D",
    "\uff1f": "%EF%BC%9F",
    "\uff20": "%EF%BC%A0",
    "\uff3b": "%EF%BC%BB",
    "\uff3d": "%EF%BC%BD",
  };
  function iw(a) {
    return hw[a];
  }
  const Uv = /[\x00\x22\x26\x27\x3c\x3e]/g,
    $v = /[\x00\x22\x27\x3c\x3e]/g,
    cw =
      /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\x5b-\x5d\x7b\x7d\x85\u2028\u2029]/g,
    jw =
      /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,
    ew =
      /^(?!-*(?:expression|(?:moz-)?binding))(?:(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|(?:rgb|rgba|hsl|hsla|calc|max|min|cubic-bezier)\([-\u0020\t,+.!#%_0-9a-zA-Z]+\)|[-+]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:e-?[0-9]+)?(?:[a-z]{1,4}|%)?|!important)(?:\s*[,\u0020]\s*|$))*$/i,
    kw =
      /^[^&:\/?#]*(?:[\/?#]|$)|^https?:|^ftp:|^data:image\/[a-z0-9+]+;base64,[a-z0-9+\/]+=*$|^blob:/i;
  function lw(a) {
    return String(a).replace(jw, iw);
  }
  const Yv = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    Zv = /</g;
  var mw = void 0;
  function nw() {
    void 0 === mw && (mw = 18);
    return mw;
  }
  var ow = void 0;
  function pw() {
    void 0 === ow && (ow = 18);
    return ow;
  }
  function qw() {
    return Tv(
      '<svg width="' +
        Xv(pw()) +
        '" height="' +
        Xv(nw()) +
        '" viewBox="0 0 ' +
        Xv(nw()) +
        " " +
        Xv(pw()) +
        '"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.76 10.27L17.49 16L16 17.49L10.27 11.76C9.2 12.53 7.91 13 6.5 13C2.91 13 0 10.09 0 6.5C0 2.91 2.91 0 6.5 0C10.09 0 13 2.91 13 6.5C13 7.91 12.53 9.2 11.76 10.27ZM6.5 2C4.01 2 2 4.01 2 6.5C2 8.99 4.01 11 6.5 11C8.99 11 11 8.99 11 6.5C11 4.01 8.99 2 6.5 2Z" fill="white"/></svg>'
    );
  }
  var rw = class {
    constructor(a, b) {
      this.l = a;
      this.j = b;
    }
    init() {
      if (2 === this.j?.B()?.j()) {
        var a = { host: "iDropnews.com" };
        var b = a.host;
        var c = a.xf;
        a = a.wf;
        c = void 0 === c ? 24 : c;
        b =
          "<style>.autoprose-searchbox {background: #000; border: 1px solid #dcdcdc; border-radius: 8px; bottom: " +
          W(void 0 === a ? 24 : a) +
          "px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); height: " +
          W(56) +
          "px; position: fixed; right: " +
          W(c) +
          "px; width: 292px;}.autoprose-searchbox-text-bg {background: #fff; border: 1px solid #e0e0e0; border-radius: " +
          W(16) +
          "px; box-sizing: border-box; height: " +
          W(32) +
          "px; left: 56px; position: absolute; top: calc(50% - " +
          W(32) +
          "px / 2); width: 224px;}.autoprose-searchbox-text {color: #3c4043; font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 14px; left: 24px; letter-spacing: 0.2px; line-height: " +
          W(20) +
          "px; position: relative; top: calc(50% - " +
          W(20) +
          "px / 2);}.autoprose-search-icon {left: 19px; position: relative; top: calc(50% - " +
          W(nw()) +
          'px / 2);}</style><div class="autoprose-searchbox"><div class="autoprose-search-icon">' +
          qw() +
          '</div><div class="autoprose-searchbox-text-bg"><div class="autoprose-searchbox-text">Search ' +
          Sv(b) +
          "</div></div></div>";
        b = Tv(b);
        b = Ov(b);
      } else
        (c = c || {}),
          (b = c.xf),
          (c = c.wf),
          (b = void 0 === b ? 16 : b),
          (c = void 0 === c ? 16 : c),
          (b =
            "<style>.autoprose-search-button {background: #000; border-radius: " +
            W(24) +
            "px; bottom: " +
            W(c) +
            "px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.35); height: " +
            W(48) +
            "px; position: fixed; right: " +
            W(b) +
            "px; width: 48px;}.autoprose-search-icon {left: " +
            W((48 - pw()) / 2) +
            "px; position: relative; top: " +
            W((48 - nw()) / 2) +
            'px;}</style><div class="autoprose-search-button"><div class="autoprose-search-icon">' +
            qw() +
            "</div></div>"),
          (b = Tv(b)),
          (b = Ov(b));
      this.l.appendChild(Gg(document, b));
    }
  };
  function sw(a) {
    z(a.j, Co, 31)?.j();
    const b = a.l.document,
      c = b.createElement("div");
    c.classList.add("auto-prose-wrapper");
    b.body.appendChild(c);
    new rw(c, z(a.j, Co, 31)).init();
  }
  var tw = class {
    constructor(a, b) {
      this.l = a;
      this.j = b;
    }
  };
  const uw = ["-webkit-text-fill-color"];
  function vw(a) {
    if (Qb) {
      {
        const c = Yg(a.document.body, a);
        if (c) {
          a = {};
          var b = c.length;
          for (let d = 0; d < b; ++d) a[c[d]] = "initial";
          a = ww(a);
        } else a = xw();
      }
    } else a = xw();
    return a;
  }
  var xw = () => {
    const a = { all: "initial" };
    ub(uw, (b) => {
      a[b] = "unset";
    });
    return a;
  };
  function ww(a) {
    ub(uw, (b) => {
      delete a[b];
    });
    return a;
  }
  var yw = class {
    constructor(a) {
      this.j = a;
    }
    Ca(a) {
      const b = a.document.createElement("div");
      M(b, vw(a));
      M(b, { width: "100%", "max-width": "1000px", margin: "auto" });
      b.appendChild(this.j);
      const c = a.document.createElement("div");
      M(c, vw(a));
      M(c, {
        width: "100%",
        "text-align": "center",
        display: "block",
        padding: "5px 5px 2px",
        "box-sizing": "border-box",
        "background-color": "#FFF",
      });
      c.appendChild(b);
      return c;
    }
  };
  var zw = (a, b) => ((b = z(b, Wo, 6)) ? nv(b.j(), a).map((c) => Dt(c)) : []);
  function Aw(a, b, c) {
    a.Fa.contentWindow.google.search.cse.element
      .getElement("auto-rs-prose")
      .execute(b, void 0, { rsToken: c, afsExperimentId: a.A });
  }
  var Bw = class {
    constructor(a, b, c, d, e, f) {
      this.Fa = a;
      this.l = "9d449ff4a772956c6";
      this.j = b;
      this.host = c;
      this.language = d;
      this.B = e;
      this.A = f;
    }
    init() {
      this.Fa.setAttribute("id", "prose-iframe");
      this.Fa.setAttribute("width", "100%");
      this.Fa.setAttribute("height", "100%");
      var a = this.Fa,
        b = Qe({ "box-sizing": "border-box", border: "unset" });
      a.style.cssText = Oe(b);
      a =
        "https://www.google.com/s2/favicons?sz=64&domain_url=" +
        encodeURIComponent(this.host);
      var c = Le(a) || Me;
      a = this.j;
      b = this.host;
      var d = this.language,
        e = this.B.replace(
          "${website}",
          this.host.startsWith("www.") ? this.host.slice(4) : this.host
        ),
        f = Tv;
      Qv(c, Kv) || Qv(c, Lv)
        ? (c = lw(c))
        : c instanceof He
        ? (c = lw(Ie(c)))
        : c instanceof He
        ? (c = lw(Ie(c)))
        : c instanceof xe
        ? (c = lw(Ae(c).toString()))
        : c instanceof xe
        ? (c = lw(Ae(c).toString()))
        : ((c = String(c)),
          (c = kw.test(c) ? c.replace(jw, iw) : "about:invalid#zSoyz"));
      a = f(
        '<style>.cse-favicon {display: block; float: left; height: 16px; position: absolute; left: 15px; width: 16px;}.cse-header {font-size: 16px; font-family: Arial; height: 16px; margin-left: 35px; margin-top: 6px; margin-bottom: unset; line-height: 16px;}.gsc-search-box {max-width: 520px !important;}.gsc-input {padding-right: 0 !important;}.gsc-input-box {border-radius: 16px 0 0 16px !important;}.gsc-search-button-v2 {border-left: 0 !important; border-radius: 0 16px 16px 0 !important; min-height: 30px !important; margin-left: 0 !important;}.gsc-cursor-page, .gsc-cursor-next-page, .gsc-cursor-numbered-page {color: #1a73e8 !important;}.gsc-cursor-chevron {fill: #1a73e8 !important;}.gsc-cursor-box {text-align: center !important;}.gsc-cursor-current-page {color: #000 !important;}.gcsc-find-more-on-google-root, .gcsc-find-more-on-google {display: none !important;}</style><img class="cse-favicon" src="' +
          Xv(c) +
          '" alt="' +
          Xv(b) +
          ' icon"><p class="cse-header"><strong>' +
          Sv(e) +
          '</strong></p><div class="gcse-search" data-gname="' +
          Xv("auto-rs-prose") +
          '" data-adclient="' +
          Xv(a) +
          '" data-adchannel="AutoRsVariant" data-as_sitesearch="' +
          Xv(b) +
          '" data-gl="' +
          Xv(d) +
          '" data-personalizedAds="false"></div>'
      );
      a = Ov(a);
      b = { style: Qe({ margin: 0 }) };
      d = {
        src: De(
          Pd("https://cse.google.com/cse.js?cx=%{cxId}&language=%{lang}"),
          { cxId: this.l, lang: this.language }
        ),
      };
      e = {};
      f = {};
      for (g in d) Object.prototype.hasOwnProperty.call(d, g) && (f[g] = d[g]);
      for (const h in e)
        Object.prototype.hasOwnProperty.call(e, h) && (f[h] = e[h]);
      var g = kf("script", f);
      g = gf("body", b, [a, g]);
      this.Fa.srcdoc = cf(g);
    }
  };
  function Cw(a, b) {
    return new Dw(a, b);
  }
  function Ew(a) {
    const b = Fw(a);
    ub(a.j.maxZIndexListeners, (c) => c(b));
  }
  function Fw(a) {
    a = ah(a.j.maxZIndexRestrictions);
    return a.length ? Math.min.apply(null, a) : null;
  }
  class Gw {
    constructor(a) {
      this.j = hm(a).floatingAdsStacking;
    }
    addListener(a) {
      this.j.maxZIndexListeners.push(a);
      a(Fw(this));
    }
  }
  function Hw(a) {
    if (null == a.j) {
      var b = a.l,
        c = a.A;
      const d = b.j.nextRestrictionId++;
      b.j.maxZIndexRestrictions[d] = c;
      Ew(b);
      a.j = d;
    }
  }
  function Iw(a) {
    if (null != a.j) {
      var b = a.l;
      delete b.j.maxZIndexRestrictions[a.j];
      Ew(b);
      a.j = null;
    }
  }
  class Dw {
    constructor(a, b) {
      this.l = a;
      this.A = b;
      this.j = null;
    }
  }
  function Jw(a) {
    L(a.l, "click", () => Kw(a));
    L(a.G, "click", () => void Kw(a));
    const b = a.width / a.win.innerWidth;
    L(a.win, "resize", () => {
      a.width = Math.floor(b * a.win.innerWidth);
      a.j.style.width = `${a.width}px`;
      a.j.style.height = `${a.win.innerHeight}px`;
      a.l.style.width = `${a.win.innerWidth}px`;
      a.l.style.height = `${a.win.innerHeight}px`;
      a.C && (a.B.style.transform = `translateX(${a.width}px)`);
    });
  }
  function Kw(a) {
    a.C = !0;
    a.j.scrollTop = 0;
    a.B.style.transitionDuration = ".5s";
    a.B.style.transform = `translateX(${a.width}px)`;
    a.l.style.opacity = "0";
    a.A.style.transitionDelay = ".5s";
    Lb(a.A.offsetWidth);
    a.A.style.visibility = "hidden";
    setTimeout(() => {
      a.win.document.documentElement.style.overflow = "";
    }, 500);
    for (const b of a.F)
      try {
        b();
      } catch (c) {
        console.error(c);
      }
  }
  var Lw = class {
    constructor(a, b) {
      this.win = a;
      this.width = b;
      this.F = [];
      this.C = !0;
      b = new xg(a.document);
      this.l = b.ia("DIV", { class: "adpub-drawer-modal-background" });
      var c = a.document.createElementNS("http://www.w3.org/2000/svg", "svg");
      c.setAttribute("viewBox", "0 0 24 24");
      var d = a.document.createElementNS("http://www.w3.org/2000/svg", "path");
      d.setAttribute("fill", "#5f6368");
      d.setAttribute(
        "d",
        "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
      );
      c.appendChild(d);
      this.G = b.ia("DIV", { class: "adpub-drawer-close-button" }, c);
      this.j = b.ia("DIV", { class: "adpub-drawer-contents" });
      this.B = b.ia("DIV", { class: "adpub-drawer" }, this.G, this.j);
      this.A = b.ia("DIV", { class: "adpub-drawer-container" }, this.l, this.B);
      this.D = b.ia("DIV", { class: "adpub-drawer-root" });
      c = this.D.attachShadow({ mode: "open" });
      d = c.appendChild;
      var e = this.win.innerHeight - 5;
      var f = this.width,
        g = a.innerWidth;
      e = Tv(
        "<style>.adpub-drawer-container {height: 100%; position: fixed; top: 0; transition: visibility 0s linear .5s; visibility: hidden; width: 100%; z-index: " +
          W(100002) +
          ";}.adpub-drawer-modal-background {background-color: black; height: " +
          W(e + 5) +
          "px; opacity: 0; position: absolute; transition: opacity .5s ease-in-out; width: " +
          W(g) +
          "px;}.adpub-drawer {position: absolute; transform: translateX(" +
          W(f) +
          "px); transition: transform .5s ease-in-out; height: 100%; overflow: auto; right: 0; border-radius: 20px 0 0 20px;}.adpub-drawer-close-button {color: #5f6368; height: 24px; width: 24px; top: 20px; right: 20px; position: fixed; cursor: pointer;}.adpub-drawer-contents {background: white; height: " +
          W(e) +
          "px; overflow-y: auto; padding-top: " +
          W(5) +
          "px; width: " +
          W(f) +
          "px;}</style>"
      );
      d.call(c, Og(b, Ov(e)));
      c.appendChild(this.A);
      M(this.D, vw(a));
    }
    init() {
      this.win.document.body.appendChild(this.D);
      Jw(this);
    }
    V(a) {
      for (; this.j.firstChild; ) this.j.removeChild(this.j.firstChild);
      this.j.appendChild(a);
    }
    show() {
      this.C = !1;
      this.win.document.documentElement.style.overflow = "hidden";
      this.A.style.transitionDelay = "0s";
      this.A.style.visibility = "visible";
      this.l.style.opacity = ".5";
      this.B.style.transform = "translateX(0)";
    }
    ba(a) {
      this.F.push(a);
    }
  };
  function Mw(a) {
    L(a.J, "click", () => Nw(a));
    L(a.B, "mousedown", () => {
      const d = (f) => {
          Ow(a, f.movementY);
        },
        e = () => {
          Pw(a);
          he(a.B, "mousemove", d);
          he(a.B, "mouseup", e);
          he(a.B, "mouseleave", e);
        };
      L(a.B, "mousemove", d);
      L(a.B, "mouseup", e);
      L(a.B, "mouseleave", e);
    });
    L(a.j, "touchstart", (d) => {
      let e = d.touches[0];
      const f = (h) => {
          const k = h.touches[0];
          0 === Qw(a)
            ? a.l.classList.add("scrollable")
            : a.l.classList.remove("scrollable");
          if (e) {
            var l = 0 === Qw(a) && a.l.scrollTop;
            const m = k.target === a.B || k.target.parentElement === a.B;
            if (!l || m)
              (l = k.screenY - e.screenY),
                Ow(a, l),
                (l = 0 < l && 0 === a.l.scrollTop),
                (l = a.I && !l),
                h.cancelable && !l && h.preventDefault();
          }
          e = k;
        },
        g = () => {
          Pw(a);
          he(a.j, "touchmove", f);
          he(a.j, "touchend", g);
          he(a.j, "touchcancel", g);
        };
      L(a.j, "touchmove", f, { passive: !1 });
      L(a.j, "touchend", g);
      L(a.j, "touchcancel", g);
    });
    L(a.C, "touchstart", () => {});
    const b = a.A / a.win.innerHeight,
      c = a.F / a.A;
    L(a.win, "resize", () => {
      a.A = Math.floor(b * a.win.innerHeight);
      a.F = Math.floor(c * a.A);
      a.D = a.win.innerHeight - (a.A + 30 - 20);
      const d = a.I ? 0 : a.A - a.F;
      a.l.style.height = `${a.A}px`;
      a.j.style.transform = a.K
        ? `translateY(${a.A + a.D}px)`
        : `translateY(${d + a.D}px)`;
    });
  }
  function Rw(a, b) {
    var c = ["https://cse.google.com"];
    const d = ["touchstart", "touchmove", "touchend", "touchcancel"],
      e = (k, l, m) => {
        try {
          const n = m.map((q) => new Touch(q));
          k.dispatchEvent(
            new TouchEvent(l, { bubbles: !0, cancelable: !0, touches: n })
          );
        } catch {
          l = new UIEvent(l, {
            bubbles: !0,
            cancelable: !0,
            detail: 1,
            view: a.win,
          });
          for (const n of m)
            k.dispatchEvent(Object.assign(l, { touches: [n] }));
        }
      },
      f = (k) => {
        k = k.contentDocument;
        for (const l of d)
          L(k, l, (m) => {
            m = [...m.touches].map((n) => ({
              clientX: n.clientX,
              clientY: n.clientY,
              force: n.force,
              identifier: n.identifier,
              pageX: n.pageX,
              pageY: n.pageY,
              radiusX: n.radiusX,
              radiusY: n.radiusY,
              rotationAngle: n.rotationAngle,
              screenX: n.screenX,
              screenY: n.screenY,
              target: a.l,
            }));
            e(a.j, l, m);
          });
      },
      g = (k) => {
        if (
          (void 0 === c || c.includes(k.origin)) &&
          d.includes(k.data?.type) &&
          Array.isArray(k.data?.touches)
        ) {
          var l = k.data.type;
          k = k.data.touches.map((m) => ({ ...m, target: a.l }));
          e(a.j, l, k);
        }
      },
      h = (k) => {
        k.contentWindow
          ? L(k.contentWindow, "message", g)
          : console.error("Loaded iframe missing content window.");
      };
    "complete" === b.contentDocument?.readyState && (h(b), f(b));
    L(b, "load", () => {
      h(b);
      f(b);
    });
  }
  function Sw(a, b, c) {
    a.R.set(b, a.win.document.documentElement.style.getPropertyValue(b) ?? "");
    a.win.document.documentElement.style.setProperty(b, c);
  }
  function Tw(a, b) {
    const c = a.R.get(b) ?? "";
    a.win.document.documentElement.style.setProperty(b, c);
  }
  function Nw(a) {
    a.K = !0;
    a.I = !1;
    Tw(a, "position");
    Tw(a, "width");
    Tw(a, "transform");
    Tw(a, "overflow");
    Tw(a, "touch-action");
    null != a.G &&
      ((a.win.document.documentElement.scrollTop = a.G),
      (a.win.document.body.scrollTop = a.G));
    Tw(a, "scroll-behavior");
    a.C.style.transform = "";
    a.l.scrollTop = 0;
    a.l.classList.remove("scrollable");
    a.j.style.transitionDuration = ".5s";
    a.j.style.transform = `translateY(${a.A + a.D}px)`;
    a.J.style.opacity = "0";
    a.C.style.transitionDelay = ".5s";
    Lb(a.C.offsetHeight);
    a.C.style.visibility = "hidden";
    for (const b of a.N)
      try {
        b();
      } catch (c) {
        console.error(c);
      }
  }
  function Ow(a, b) {
    a.j.style.transitionDuration = "0s";
    b = Math.max(Qw(a) + b, 0) + a.D;
    a.j.style.transform = `translateY(${b}px)`;
    Lb(a.j.offsetHeight);
    a.j.style.transitionDuration = ".5s";
  }
  function Pw(a) {
    const b = Qw(a);
    if (a.I) 50 < b ? Nw(a) : 0 !== b && Uw(a, 0);
    else {
      const c = a.A - a.F;
      b < c - 50 ? Uw(a, 0) : b > c + 50 ? Nw(a) : b !== c && Uw(a, a.A - a.F);
    }
  }
  function Qw(a) {
    return Number(
      (new DOMMatrix(a.j.style.transform ?? null).f - a.D).toFixed(1)
    );
  }
  function Uw(a, b) {
    a.K = !1;
    0 === b && ((a.I = !0), a.l.classList.add("scrollable"));
    a.C.style.transitionDelay = "0s";
    a.C.style.visibility = "visible";
    a.J.style.opacity = ".5";
    a.j.style.transform = `translateY(${b + a.D}px)`;
  }
  var Vw = class {
    constructor(a, b, c) {
      this.win = a;
      this.F = b;
      this.A = c;
      this.N = [];
      this.R = new Map();
      this.I = !1;
      this.K = !0;
      this.G = null;
      b = new xg(a.document);
      this.J = b.ia("DIV", { class: "cse-modal-background", tabindex: 1 });
      var d = b.ia("DIV", { class: "cse-drawer-handle-icon" });
      this.B = b.ia("DIV", { class: "cse-drawer-handle" }, d);
      this.l = b.ia("DIV", { class: "cse-drawer-contents" });
      this.j = b.ia("DIV", { class: "cse-drawer" }, this.B, this.l);
      this.C = b.ia("DIV", { class: "cse-drawer-container" }, this.J, this.j);
      this.M = b.ia("DIV", { class: "adpub-drawer-root" });
      this.D = a.innerHeight - (c + 30 - 20);
      c = this.M.attachShadow({ mode: "open" });
      d = c.appendChild;
      var e = this.A;
      var f = this.D;
      e = Tv(
        "<style>.cse-drawer-container {height: 100%; left: 0; position: fixed; top: 0; transition: visibility 0s linear .5s; visibility: hidden; width: 100%; z-index: " +
          W(100002) +
          ";}.cse-modal-background {background-color: black; height: 100vh; opacity: 0; overflow: hidden; position: absolute; transition: opacity .5s ease-in-out; width: 100%;}.cse-drawer {background: white; position: absolute; transform: translateY(" +
          W(e + f) +
          "px); transition: transform .5s ease-in-out; width: 100%;}.cse-drawer-handle {align-items: flex-end; border-radius: " +
          W(20) +
          "px " +
          W(20) +
          "px 0 0; background: white; display: flex; height: " +
          W(30) +
          "px; justify-content: center; margin-top: " +
          W(-20) +
          "px;}.cse-drawer-handle-icon {background: #dadce0; border-radius: 2px; height: 4px; margin-bottom: 8px; width: 50px;}.cse-drawer-contents {background: white; height: " +
          W(e) +
          "px; scrollbar-width: none; overflow: hidden;}.cse-drawer-scroller::-webkit-scrollbar {display: none;}.scrollable {overflow: auto;}</style>"
      );
      d.call(c, Og(b, Ov(e)));
      c.appendChild(this.C);
      M(this.M, vw(a));
    }
    init() {
      this.win.document.body.appendChild(this.M);
      Mw(this);
    }
    V(a) {
      for (; this.l.firstChild; ) this.l.removeChild(this.l.firstChild);
      this.l.appendChild(a);
    }
    show() {
      this.G =
        this.win.document.documentElement.scrollTop +
        this.win.document.body.scrollTop;
      Sw(this, "transform", `translateY(${-this.G}px)`);
      Sw(this, "position", "fixed");
      Sw(this, "width", "100%");
      Sw(this, "overflow", "hidden");
      Sw(this, "touch-action", "none");
      Sw(this, "scroll-behavior", "auto");
      this.C.style.transform = `translateY(${this.G}px)`;
      Uw(this, this.A - this.F);
    }
    ba(a) {
      this.N.push(a);
    }
  };
  function Ww(a, b) {
    const c = a.document.createElement("div");
    M(c, vw(a));
    a.document.body.appendChild(c);
    a = c.attachShadow({ mode: "open" });
    b && c.classList.add(b);
    return { he: c, shadowRoot: a };
  }
  function Xw(a, b) {
    b = b.getElementById(a);
    if (!b) throw Error(`Element (${a}) does not exist`);
    return b;
  }
  function Yw(a, b) {
    const c = new Qm(b.O);
    Ym(b, !0, () => void R(c, !0));
    Ym(b, !1, () => {
      a.setTimeout(() => {
        b.O || R(c, !1);
      }, 700);
    });
    return Sm(c);
  }
  var Zw = void 0;
  function $w(a) {
    a = a.top;
    if (!a) return null;
    try {
      var b = a.history;
    } catch (c) {
      b = null;
    }
    b = b && b.pushState && "function" === typeof b.pushState ? b : null;
    if (!b) return null;
    if (a.googNavStack) return a.googNavStack;
    b = new ax(a, b);
    b.init();
    return b ? (a.googNavStack = b) : null;
  }
  function bx(a, b) {
    return b ? (b.googNavStackId === a.A ? b : null) : null;
  }
  function cx(a, b) {
    for (let c = b.length - 1; 0 <= c; --c) {
      const d = 0 === c;
      a.L.requestAnimationFrame(() => void b[c].Of({ isFinal: d }));
    }
  }
  function dx(a, b) {
    b = Fb(a.stack, b, (c, d) => c - d.Hd.googNavStackStateId);
    if (0 <= b) return a.stack.splice(b, a.stack.length - b);
    b = -b - 1;
    return a.stack.splice(b, a.stack.length - b);
  }
  class ax extends Km {
    constructor(a, b) {
      super();
      this.L = a;
      this.j = b;
      this.stack = [];
      this.A = (1e9 * Math.random()) >>> 0;
      this.D = 0;
      this.B = (c) => {
        (c = bx(this, c.state))
          ? cx(this, dx(this, c.googNavStackStateId + 0.5))
          : cx(this, this.stack.splice(0, this.stack.length));
      };
    }
    pushEvent() {
      const a = { googNavStackId: this.A, googNavStackStateId: this.D++ },
        b = new Promise((c) => {
          this.stack.push({ Of: c, Hd: a });
        });
      this.j.pushState(a, "");
      return {
        navigatedBack: b,
        triggerNavigateBack: () => {
          const c = dx(this, a.googNavStackStateId);
          var d;
          if ((d = 0 < c.length)) {
            d = c[0].Hd;
            const e = bx(this, this.j.state);
            d =
              e &&
              e.googNavStackId === d.googNavStackId &&
              e.googNavStackStateId === d.googNavStackStateId;
          }
          d && this.j.go(-c.length);
          cx(this, c);
        },
      };
    }
    init() {
      this.L.addEventListener("popstate", this.B);
    }
    l() {
      this.L.removeEventListener("popstate", this.B);
      super.l();
    }
  }
  function ex(a) {
    return (a = $w(a)) ? new fx(a) : null;
  }
  function gx(a) {
    if (!a.j) {
      var { navigatedBack: b, triggerNavigateBack: c } = a.B.pushEvent();
      a.j = c;
      b.then(() => {
        a.j && !a.C && ((a.j = null), $m(a.A));
      });
    }
  }
  var fx = class extends Km {
    constructor(a) {
      super();
      this.B = a;
      this.A = new an();
      this.j = null;
    }
  };
  function hx(a, b, c) {
    var d = Cw(new Gw(a), c.zIndex - 1);
    const e = Ww(a, c.Ac),
      f = e.shadowRoot;
    var g = f.appendChild,
      h = new xg(a.document);
    var k = c.Bd;
    var l = c.yd || !1,
      m = c.od,
      n = c.zIndex;
    if (c.Yj ?? !0) {
      void 0 === Zw && (Zw = 20);
      var q = Zw;
    } else q = 0;
    k =
      "<style>#hd-drawer-container {position: fixed; left: 0; top: 0; width: 100vw; height: 100%; overflow: hidden; z-index: " +
      W(n) +
      "; pointer-events: none;}#hd-drawer-container.hd-revealed {pointer-events: auto;}#hd-modal-background {position: absolute; left: 0; bottom: 0; background-color: black; transition: opacity .5s ease-in-out; width: 100%; height: 100%; opacity: 0;}.hd-revealed > #hd-modal-background {opacity: 0.5;}#hd-drawer {position: absolute; top: 0; height: 100%; width: " +
      W(k) +
      "; background-color: white; display: flex; flex-direction: column; box-sizing: border-box; padding-bottom: " +
      W(q) +
      "px; transition: transform " +
      W(0.5) +
      "s ease-in-out;" +
      (l
        ? "left: 0; border-top-right-radius: " +
          W(q) +
          "px; border-bottom-right-radius: " +
          W(q) +
          "px; transform: translateX(-100%);"
        : "right: 0; border-top-left-radius: " +
          W(q) +
          "px; border-bottom-left-radius: " +
          W(q) +
          "px; transform: translateX(100%);") +
      "}.hd-revealed > #hd-drawer {transform: translateY(0);}#hd-control-bar {" +
      (l ? "text-align: left;" : "text-align: right;") +
      'height: 24px;}#hd-close-button {border: none; background: none; cursor: pointer;}#hd-content-container {flex-grow: 1; overflow: auto;}#hd-content-container::-webkit-scrollbar * {background: transparent;}</style><div id="hd-drawer-container"><div id="hd-modal-background"></div><div id="hd-drawer"><div id="hd-control-bar"><button id="hd-close-button" aria-label="' +
      Xv(m) +
      '"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#5F6368"><path d="M6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4Z"/></svg></button></div><div id="hd-content-container"></div></div></div>';
    k = Tv(k);
    g.call(f, Og(h, Ov(k)));
    g = Xw("hd-content-container", f);
    g.appendChild(b);
    Lb(a.document.body.offsetHeight);
    b = {
      qb: Xw("hd-drawer-container", f),
      Mc: Xw("hd-modal-background", f),
      xc: g,
      Ne: Xw("hd-close-button", f),
      Qc: e,
    };
    d = new ix(a, b, Fn(a), d);
    d.init();
    c.Cc && (a = ex(a)) && jx(d, a);
    return d;
  }
  function jx(a, b) {
    Ym(a.j, !0, () => {
      gx(b);
    });
    Ym(a.j, !1, () => {
      b.j && (b.j(), (b.j = null));
    });
    new bn(b.A).Z(() => void a.collapse());
    Lm(a, Ma(Jm, b));
  }
  function kx(a) {
    if (a.C) throw Error("Accessing domItems after disposal");
    return a.B;
  }
  function lx(a) {
    const { Mc: b, Ne: c } = kx(a);
    b.addEventListener("click", () => void a.collapse());
    c.addEventListener("click", () => void a.collapse());
  }
  var ix = class extends Km {
    constructor(a, b, c, d) {
      super();
      this.B = b;
      this.j = new Qm(!1);
      this.A = Yw(a, this.j);
      Ym(this.A, !0, () => {
        Hn(c);
        Hw(d);
      });
      Ym(this.A, !1, () => {
        Jn(c);
        Iw(d);
      });
    }
    show({ vd: a = !1 } = {}) {
      if (this.C) throw Error("Cannot show drawer after disposal");
      kx(this).qb.classList.add("hd-revealed");
      R(this.j, !0);
      a &&
        Ym(this.A, !1, () => {
          this.Ea();
        });
    }
    collapse() {
      kx(this).qb.classList.remove("hd-revealed");
      R(this.j, !1);
    }
    isVisible() {
      return this.A;
    }
    init() {
      lx(this);
    }
    l() {
      const a = this.B.Qc.he,
        b = a.parentNode;
      b && b.removeChild(a);
      super.l();
    }
  };
  var mx = void 0;
  function nx() {
    void 0 === mx && (mx = 20);
    return mx;
  }
  var ox = void 0;
  function px() {
    void 0 === ox && (ox = 30);
    return ox;
  }
  function qx(a) {
    return Tv(
      '<div class="ved-handle" id="' +
        Xv(a) +
        '"><div class="ved-handle-icon"></div></div>'
    );
  }
  function rx(a) {
    return qn(a.j).map((b) => (b ? sx(a, b) : 0));
  }
  function sx(a, b) {
    switch (a.direction) {
      case 0:
        return tx(-b.pe);
      case 1:
        return tx(-b.ne);
      default:
        throw Error(`Unhandled direction: ${a.direction}`);
    }
  }
  function ux(a) {
    return sn(a.j).map((b) => sx(a, b));
  }
  var vx = class {
    constructor(a) {
      this.j = a;
      this.direction = 0;
    }
  };
  function tx(a) {
    return 0 === a ? 0 : a;
  }
  function Y(a) {
    if (a.C) throw Error("Accessing domItems after disposal");
    return a.D;
  }
  function wx(a) {
    const { ea: b, Ha: c } = Y(a);
    c.getBoundingClientRect().top <= b.getBoundingClientRect().top || xx(a);
    Y(a).qb.classList.add("ved-revealed");
    R(a.j, !0);
  }
  function yx(a) {
    return Yw(a.win, a.j);
  }
  function zx(a, b) {
    const c = new Qm(b());
    new bn(a.G).Z(() => void R(c, b()));
    return Sm(c);
  }
  function Ax(a) {
    const { ea: b, dc: c } = Y(a);
    return zx(
      a,
      () => c.getBoundingClientRect().top <= b.getBoundingClientRect().top
    );
  }
  function Bx(a) {
    const { ea: b, dc: c } = Y(a);
    return zx(
      a,
      () => c.getBoundingClientRect().top <= b.getBoundingClientRect().top - 1
    );
  }
  function Cx(a) {
    const { ea: b } = Y(a);
    return zx(a, () => b.scrollTop === b.scrollHeight - b.clientHeight);
  }
  function Dx(a) {
    return Tm(Ax(a), Cx(a));
  }
  function Ex(a) {
    const { ea: b, Ha: c } = Y(a);
    return zx(
      a,
      () => c.getBoundingClientRect().top < b.getBoundingClientRect().top - 1
    );
  }
  function xx(a) {
    Y(a).Ha.classList.add("ved-snap-point-top");
    var b = Fx(a, Y(a).Ha);
    Y(a).ea.scrollTop = b;
    Gx(a);
  }
  function Hx(a) {
    Wm(Ax(a), !0, () => {
      const { Ad: b, Cb: c } = Y(a);
      b.classList.remove("ved-hidden");
      c.classList.add("ved-with-background");
    });
    Wm(Ax(a), !1, () => {
      const { Ad: b, Cb: c } = Y(a);
      b.classList.add("ved-hidden");
      c.classList.remove("ved-with-background");
    });
  }
  function Ix(a) {
    const b = un(a.win, Y(a).xc);
    Vm(xn(b), () => void Jx(a));
    Lm(a, Ma(Jm, b));
  }
  function Kx(a) {
    Wm(Lx(a), !0, () => {
      Y(a).Vd.classList.remove("ved-hidden");
    });
    Wm(Lx(a), !1, () => {
      Y(a).Vd.classList.add("ved-hidden");
    });
  }
  function Mx(a) {
    const b = () => void $m(a.F),
      { Mc: c, Ha: d, df: e } = Y(a);
    c.addEventListener("click", b);
    d.addEventListener("click", b);
    e.addEventListener("click", b);
    Ym(Nx(a), !0, b);
  }
  function Ox(a) {
    Ym(yx(a), !1, () => {
      xx(a);
    });
  }
  function Gx(a) {
    Xm(a.A, () => void $m(a.G));
  }
  function Jx(a) {
    if (!a.A.O) {
      var { rd: b, xc: c } = Y(a),
        d = c.getBoundingClientRect().height;
      d = Math.max(Px(a), d);
      R(a.A, !0);
      var e = Qx(a);
      b.style.setProperty("height", `${d}px`);
      e();
      a.win.requestAnimationFrame(() => {
        a.win.requestAnimationFrame(() => {
          R(a.A, !1);
        });
      });
    }
  }
  function Lx(a) {
    const { ea: b, Ha: c } = Y(a);
    return zx(
      a,
      () => c.getBoundingClientRect().top <= b.getBoundingClientRect().top
    );
  }
  function Nx(a) {
    return Rm(a.B.map(Yn), Rx(a));
  }
  function Rx(a) {
    return zx(a, () => 0 === Y(a).ea.scrollTop);
  }
  function Fx(a, b) {
    ({ Cb: a } = Y(a));
    a = a.getBoundingClientRect().top;
    return b.getBoundingClientRect().top - a;
  }
  function Sx(a, b) {
    R(a.B, !0);
    const { Cb: c, ea: d } = Y(a);
    d.scrollTop = 0;
    d.classList.add("ved-scrolling-paused");
    c.style.setProperty("margin-top", `-${b}px`);
    return () => void Tx(a, b);
  }
  function Tx(a, b) {
    const { Cb: c, ea: d } = Y(a);
    c.style.removeProperty("margin-top");
    d.classList.remove("ved-scrolling-paused");
    Y(a).ea.scrollTop = b;
    Gx(a);
    R(a.B, !1);
  }
  function Qx(a) {
    const b = Y(a).ea.scrollTop;
    Sx(a, b);
    return () => void Tx(a, b);
  }
  function Px(a) {
    const { ea: b, dc: c, rd: d, Ha: e } = Y(a);
    a = b.getBoundingClientRect();
    const f = c.getBoundingClientRect();
    var g = d.getBoundingClientRect();
    const h = e.getBoundingClientRect();
    g = g.top - f.top;
    return Math.max(
      a.height - h.height - g,
      Math.min(a.height, a.bottom - f.top) - g
    );
  }
  var Ux = class extends Km {
    constructor(a, b, c) {
      super();
      this.win = a;
      this.D = b;
      this.J = c;
      this.F = new an();
      this.G = new an();
      this.j = new Qm(!1);
      this.B = new Qm(!1);
      this.A = new Qm(!1);
    }
    init() {
      xx(this);
      Hx(this);
      Ix(this);
      Kx(this);
      Mx(this);
      Ox(this);
      Y(this).ea.addEventListener("scroll", () => void Gx(this));
    }
    l() {
      const a = this.D.Qc.he,
        b = a.parentNode;
      b && b.removeChild(a);
      super.l();
    }
  };
  function Vx(a, b, c) {
    var d = Cw(new Gw(a), c.zIndex - 1),
      e = Ww(a, c.Ac),
      f = e.shadowRoot,
      g = f.appendChild,
      h = new xg(a.document);
    var k = 100 * c.Wd;
    var l = 100 * c.Cd;
    k = Tv(
      "<style>#ved-drawer-container {position:  fixed; left: 0; top: 0; width: 100vw; height: 100%; overflow: hidden; z-index: " +
        W(c.zIndex) +
        "; pointer-events: none;}#ved-drawer-container.ved-revealed {pointer-events: auto;}#ved-modal-background {position: absolute; left: 0; bottom: 0; background-color: black; transition: opacity .5s ease-in-out; width: 100%; height: 100%; opacity: 0;}.ved-revealed > #ved-modal-background {opacity: 0.5;}#ved-ui-revealer {position: absolute; left: 0; bottom: 0; width: 100%; height: " +
        W(l) +
        "%; transition: transform " +
        W(0.5) +
        "s ease-in-out; transform: translateY(100%);}#ved-ui-revealer.ved-no-animation {transition-property: none;}.ved-revealed > #ved-ui-revealer {transform: translateY(0);}#ved-scroller-container {position: absolute; left: 0; bottom: 0; width: 100%; height: 100%; clip-path: inset(0 0 -50px 0 round " +
        W(nx()) +
        "px);}#ved-scroller {position: relative; width: 100%; height: 100%; overflow-y: scroll; -ms-overflow-style: none; scrollbar-width: none; overflow-y: scroll; overscroll-behavior: none; scroll-snap-type: y mandatory;}#ved-scroller.ved-scrolling-paused {overflow: hidden;}#ved-scroller.ved-no-snap {scroll-snap-type: none;}#ved-scroller::-webkit-scrollbar {display: none;}#ved-scrolled-stack {width: 100%; height: 100%; overflow: visible;}#ved-scrolled-stack.ved-with-background {background-color: white;}.ved-snap-point-top {scroll-snap-align: start;}.ved-snap-point-bottom {scroll-snap-align: end;}#ved-fully-closed-anchor {height: " +
        W((k / l) * 100) +
        "%;}.ved-with-background #ved-fully-closed-anchor {background-color: white;}#ved-partially-extended-anchor {height: " +
        W(((l - k) / l) * 100) +
        "%;}.ved-with-background #ved-partially-extended-anchor {background-color: white;}#ved-moving-handle-holder {scroll-snap-stop: always;}.ved-with-background #ved-moving-handle-holder {background-color: white;}#ved-fixed-handle-holder {position: absolute; left: 0; top: 0; width: 100%;}#ved-visible-scrolled-items {display: flex; flex-direction: column; min-height: " +
        W((k / l) * 100) +
        "%;}#ved-content-background {width: 100%; flex-grow: 1; padding-top: 1px; margin-top: -1px; background-color: white;}#ved-content-sizer {overflow: hidden; width: 100%; height: 100%;}#ved-content-container {width: 100%;}#ved-over-scroll-block {display: flex; flex-direction: column; position: absolute; bottom: 0; left: 0; width: 100%; height: " +
        W((k / l) * 100) +
        "%; pointer-events: none;}#ved-over-scroll-handle-spacer {height: " +
        W(px() + 50) +
        "px;}#ved-over-scroll-background {flex-grow: 1; background-color: white;}.ved-handle {align-items: flex-end; border-radius: " +
        W(nx()) +
        "px " +
        W(nx()) +
        "px 0 0; background: white; display: flex; height: " +
        W(px()) +
        'px; justify-content: center; cursor: grab;}.ved-handle-icon {background: #dadce0; border-radius: 2px; height: 4px; margin-bottom: 8px; width: 50px;}.ved-hidden {visibility: hidden;}</style><div id="ved-drawer-container"><div id="ved-modal-background"></div><div id="ved-ui-revealer"><div id="ved-over-scroll-block" class="ved-hidden"><div id=\'ved-over-scroll-handle-spacer\'></div><div id=\'ved-over-scroll-background\'></div></div><div id="ved-scroller-container"><div id="ved-scroller"><div id="ved-scrolled-stack"><div id="ved-fully-closed-anchor" class="ved-snap-point-top"></div><div id="ved-partially-extended-anchor" class="ved-snap-point-top"></div><div id="ved-visible-scrolled-items"><div id="ved-moving-handle-holder" class="ved-snap-point-top">' +
        qx("ved-moving-handle") +
        '</div><div id="ved-content-background"><div id="ved-content-sizer" class="ved-snap-point-bottom"><div id="ved-content-container"></div></div></div></div></div></div></div><div id="ved-fixed-handle-holder" class="ved-hidden">' +
        qx("ved-fixed-handle") +
        "</div></div></div>"
    );
    g.call(f, Og(h, Ov(k)));
    g = Xw("ved-content-container", f);
    g.appendChild(b);
    Lb(a.document.body.offsetHeight);
    b = {
      qb: Xw("ved-drawer-container", f),
      Mc: Xw("ved-modal-background", f),
      ke: Xw("ved-ui-revealer", f),
      ea: Xw("ved-scroller", f),
      Cb: Xw("ved-scrolled-stack", f),
      df: Xw("ved-fully-closed-anchor", f),
      Ha: Xw("ved-partially-extended-anchor", f),
      rd: Xw("ved-content-sizer", f),
      xc: g,
      Xj: Xw("ved-moving-handle", f),
      dc: Xw("ved-moving-handle-holder", f),
      cf: Xw("ved-fixed-handle", f),
      Ad: Xw("ved-fixed-handle-holder", f),
      Vd: Xw("ved-over-scroll-block", f),
      Qc: e,
    };
    e = b.cf;
    e = new tn(new kn(a, e), new gn(e));
    f = e.j;
    f.C.addEventListener("mousedown", f.G);
    f.B.addEventListener("mouseup", f.D);
    f.B.addEventListener("mousemove", f.F, { passive: !1 });
    f = e.l;
    f.l.addEventListener("touchstart", f.F);
    f.l.addEventListener("touchend", f.C);
    f.l.addEventListener("touchmove", f.D, { passive: !1 });
    b = new Ux(a, b, new vx(e));
    b.init();
    d = new Wx(a, b, Fn(a), d);
    Lm(d, Ma(Jm, b));
    d.init();
    c.Cc && (a = ex(a)) && Xx(d, a);
    return d;
  }
  function Xx(a, b) {
    Ym(a.j.j, !0, () => {
      gx(b);
    });
    Ym(a.j.j, !1, () => {
      b.j && (b.j(), (b.j = null));
    });
    new bn(b.A).Z(() => void a.collapse());
    Lm(a, Ma(Jm, b));
  }
  function Yx(a) {
    Ym(Rm(Dx(a.j), Ex(a.j)), !0, () => {
      Y(a.j).Ha.classList.remove("ved-snap-point-top");
    });
    Wm(Bx(a.j), !0, () => {
      Y(a.j).ea.classList.add("ved-no-snap");
    });
    Wm(Bx(a.j), !1, () => {
      Y(a.j).ea.classList.remove("ved-no-snap");
    });
    Ym(Bx(a.j), !1, () => {
      var b = a.j;
      var c = Y(b).dc;
      c = Sx(b, Fx(b, c));
      b.win.setTimeout(c, 100);
    });
  }
  function Zx(a) {
    const b = a.j.J;
    rx(b).Z((c) => {
      c = -c;
      if (0 < c) {
        const { ke: d } = Y(a.j);
        d.classList.add("ved-no-animation");
        d.style.setProperty("transform", `translateY(${c}px)`);
      } else
        ({ ke: c } = Y(a.j)),
          c.classList.remove("ved-no-animation"),
          c.style.removeProperty("transform");
    });
    ux(b).Z((c) => {
      30 < -c && a.collapse();
    });
  }
  var Wx = class extends Km {
    constructor(a, b, c, d) {
      super();
      this.win = a;
      this.j = b;
      Ym(yx(b), !0, () => {
        Hn(c);
        Hw(d);
      });
      Ym(yx(b), !1, () => {
        Jn(c);
        Iw(d);
      });
    }
    show({ vd: a = !1 } = {}) {
      if (this.C) throw Error("Cannot show drawer after disposal");
      wx(this.j);
      a &&
        Ym(yx(this.j), !1, () => {
          this.Ea();
        });
    }
    collapse() {
      var a = this.j;
      Y(a).qb.classList.remove("ved-revealed");
      R(a.j, !1);
    }
    isVisible() {
      return yx(this.j);
    }
    init() {
      new bn(this.j.F).Z(() => {
        this.collapse();
      });
      Yx(this);
      Zx(this);
      Lb(this.win.document.body.offsetHeight);
    }
  };
  function $x(a) {
    if (a.A instanceof Vw || a.A instanceof Lw)
      a.A.init(),
        a.A.V(a.B),
        a.A instanceof Vw && Rw(a.A, a.B),
        a.A.ba(() => void Iw(a.K)),
        a.F.init();
  }
  function ay(a) {
    let b;
    a.l.id = "cse-overlay-div";
    M(a.l, {
      "background-color": "white",
      border: "none",
      "border-radius": "16px 16px 16px 16px",
      "box-shadow": "0 3px 10px rgb(34 25 25 / 40%)",
      display: "none",
      "flex-direction": "column",
      height: "90%",
      left: "2.5%",
      margin: "auto",
      overflow: "auto",
      position: "fixed",
      padding: "1%",
      top: "5%",
      transition: "all 0.25s linear",
      width: "95%",
      "z-index": 100002,
    });
    b = a.C.createElement("DIV");
    b.id = "cse-overlay-close-button";
    M(b, {
      "background-image": "url(//www.google.com/images/nav_logo114.png)",
      "background-position": "-140px -230px",
      "background-repeat": "no-repeat",
      cursor: "pointer",
      display: "block",
      float: "right",
      height: "12px",
      opacity: 1,
      position: "absolute",
      right: "15px",
      top: "15px",
      width: "12px",
    });
    a.D.classList.add("gsc-modal-background-image");
    a.D.setAttribute("tabindex", 0);
    a.j.document.body.appendChild(a.l);
    a.j.document.body.appendChild(a.D);
    const c = () => {
      "flex" === a.l.style.display && (a.l.style.display = "none");
      a.D.classList.remove("gsc-modal-background-image-visible");
      Iw(a.K);
    };
    b.onclick = c;
    a.D.onclick = c;
    a.l.appendChild(b);
    a.l.appendChild(a.B);
    a.F.init();
  }
  function by(a) {
    (function (c, d) {
      c[d] =
        c[d] ||
        function () {
          (c[d].q = c[d].q || []).push(arguments);
        };
      c[d].t = 1 * new Date();
    })(a.j, "_googCsa");
    const b = a.R.map((c) => ({ container: c, relatedSearches: 5 }));
    a.j._googCsa(
      "relatedsearch",
      {
        pubId: a.N,
        styleId: "5134551505",
        hl: a.J,
        fexp: a.M,
        channel: "AutoRsVariant",
        resultsPageBaseUrl: "http://google.com",
        resultsPageQueryParam: "q",
        relatedSearchTargeting: "content",
        relatedSearchResultClickedCallback: a.ba.bind(a),
        relatedSearchUseResultCallback: !0,
      },
      b
    );
  }
  var cy = class {
    constructor(a, b, c, d, e, f, g) {
      this.j = a;
      this.R = b;
      this.J = d?.j() || "en";
      this.V = d?.B() || "Search results from ${website}";
      this.I = e;
      this.G = f;
      this.M = g;
      this.N = c.replace("ca", "partner");
      this.K = Cw(new Gw(a), 1e5);
      this.C = new xg(a.document);
      this.l = this.C.createElement("DIV");
      this.D = this.C.createElement("DIV");
      this.B = this.C.createElement("IFRAME");
      this.F = new Bw(this.B, this.N, a.location.host, this.J, this.V, this.M);
      f
        ? ((a = this.B),
          (a = this.G
            ? 2 === qh()
              ? Vx(this.j, a, { Wd: 0.95, Cd: 0.95, zIndex: 100001 })
              : hx(this.j, a, { Bd: "80vw", od: "", yd: !1, zIndex: 100001 })
            : null))
        : this.I
        ? 2 === qh()
          ? ((a = Math.round(0.95 * this.j.innerHeight) - 30),
            (a = new Vw(this.j, a, a)))
          : (a = new Lw(this.j, Math.round(0.8 * this.j.innerWidth)))
        : (a = null);
      this.A = a;
    }
    init() {
      if (
        0 !== this.R.length &&
        (this.I ||
          !this.j.document.querySelector('script[src*="cse.google.com/cse"]'))
      ) {
        if (this.G) this.F.init();
        else if (this.I) $x(this);
        else {
          ay(this);
          var a = this.C.createElement("SCRIPT"),
            b = N`https://cse.google.com/cse.js?cx=9d449ff4a772956c6`;
          b = hi(b, new Map([["language", this.J]]));
          Kf(a, b);
          this.j.document.head.appendChild(a);
        }
        a = this.C.createElement("SCRIPT");
        Kf(a, N`https://www.google.com/adsense/search/async-ads.js`);
        this.j.document.head.appendChild(a);
        by(this);
      }
    }
    ba(a, b) {
      this.G || Hw(this.K);
      this.I || this.G
        ? (Aw(this.F, a, b),
          (() => {
            const c = new ResizeObserver(async (e) => {
                this.B.height = 0;
                await new Promise((f) => this.j.requestAnimationFrame(f));
                this.B.height = e[0].target.scrollHeight;
              }),
              d = () => {
                const e = this.B.contentDocument?.documentElement;
                e
                  ? c.observe(e)
                  : (console.warn("iframe body missing"), setTimeout(d, 1e3));
              };
            d();
            this.A.show();
          })())
        : (this.D.classList.add("gsc-modal-background-image-visible"),
          (this.l.style.display = "flex"),
          Aw(this.F, a, b));
    }
  };
  function dy(a) {
    const b = jt(a.A.W),
      c = a.C.Ca(a.D, () => a.remove());
    b.appendChild(c);
    a.B && (b.className = a.B);
    return { Ve: b, Qe: c };
  }
  class ey {
    constructor(a, b, c, d) {
      this.D = a;
      this.A = b;
      this.C = c;
      this.B = d || null;
      this.j = null;
      this.l = new Qm(null);
    }
    init() {
      const a = dy(this);
      this.j = a.Ve;
      rt(this.A, this.j);
      R(this.l, a.Qe);
    }
    remove() {
      this.j && this.j.parentNode && this.j.parentNode.removeChild(this.j);
      this.j = null;
      R(this.l, null);
    }
    F() {
      return this.l;
    }
  }
  function fy(a) {
    var b = zw(a.l, a.j);
    b = Gt(b, a.l).sort(gy);
    var c = 0 == b.length ? [] : [b[Math.floor(b.length / 2)]];
    var d = a.l;
    b = [];
    for (var e = 0; e < c.length; e++) {
      const f = c[e],
        g = "autors-container-" + e,
        h = d.document.createElement("div");
      h.setAttribute("id", g);
      new ey(d, f, new yw(h)).init();
      b.push(g);
    }
    c = z(a.j, Do, 28)?.B()?.j() || z(a.j, Do, 28)?.j() || 0;
    d = z(a.j, Do, 28)?.F() || !1;
    e = z(a.j, Do, 28)?.G() || !1;
    new cy(a.l, b, a.A, z(a.j, Do, 28)?.D(), d, e, c).init();
  }
  var hy = class {
    constructor(a, b, c) {
      this.l = a;
      this.j = b;
      this.A = c;
    }
  };
  function gy(a, b) {
    return a.aa.j - b.aa.j;
  }
  var iy = {
      Wg: "google_ads_preview",
      Hh: "google_mc_lab",
      Xh: "google_anchor_debug",
      Wh: "google_bottom_anchor_debug",
      INTERSTITIAL: "google_ia_debug",
      ui: "google_scr_debug",
      wi: "google_ia_debug_allow_onclick",
      Pi: "googleads",
      se: "google_pedestal_debug",
      ij: "google_responsive_slot_preview",
      hj: "google_responsive_dummy_ad",
      Og: "google_audio_sense",
      Pg: "google_auto_gallery",
      Rg: "google_auto_storify_swipeable",
      Qg: "google_auto_storify_scrollable",
    },
    jy = {
      google_bottom_anchor_debug: 1,
      google_anchor_debug: 2,
      google_ia_debug: 8,
      google_scr_debug: 9,
      googleads: 2,
      google_pedestal_debug: 30,
    };
  var ky = {
    INTERSTITIAL: 1,
    BOTTOM_ANCHOR: 2,
    TOP_ANCHOR: 3,
    mj: 4,
    1: "INTERSTITIAL",
    2: "BOTTOM_ANCHOR",
    3: "TOP_ANCHOR",
    4: "SCROLL_TRIGGERED_IMMERSIVE",
  };
  function ly(a, b) {
    if (!a) return !1;
    a = a.hash;
    if (!a || !a.indexOf) return !1;
    if (-1 != a.indexOf(b)) return !0;
    b = my(b);
    return "go" != b && -1 != a.indexOf(b) ? !0 : !1;
  }
  function my(a) {
    let b = "";
    $g(a.split("_"), (c) => {
      b += c.substr(0, 2);
    });
    return b;
  }
  function ny() {
    var a = t.location;
    let b = !1;
    $g(iy, (c) => {
      ly(a, c) && (b = !0);
    });
    return b;
  }
  function oy(a, b) {
    switch (a) {
      case 1:
        return ly(b, "google_ia_debug");
      case 2:
        return ly(b, "google_bottom_anchor_debug");
      case 3:
        return ly(b, "google_anchor_debug") || ly(b, "googleads");
      case 4:
        return ly(b, "google_scr_debug");
    }
  }
  var py = (a, b, c) => {
    const d = [];
    z(a, dp, 18) && d.push(2);
    b.da && d.push(0);
    z(a, Do, 28) && 1 == id(z(a, Do, 28), 1) && d.push(1);
    z(a, Co, 31) && 1 == id(z(a, Co, 31), 1) && d.push(5);
    ((z(a, ro, 27) && 1 == id(z(a, ro, 27), 1)) ||
      ly(c, "google_audio_sense")) &&
      d.push(3);
    z(a, fp, 29) && d.push(4);
    z(a, rp, 30) && d.push(6);
    return d;
  };
  function qy(a, b) {
    const c = wg(a).createElement("IMG");
    ry(a, c);
    c.src =
      "https://www.gstatic.com/adsense/autoads/icons/gpp_good_24px_grey_800.svg";
    M(c, {
      margin: "0px 12px 0px 8px",
      width: "24px",
      height: "24px",
      cursor: null == b ? "auto" : "pointer",
    });
    b &&
      c.addEventListener("click", (d) => {
        b();
        d.stopPropagation();
      });
    return c;
  }
  function sy(a, b) {
    const c = b.document.createElement("button");
    ry(b, c);
    M(c, { display: "inline", "line-height": "24px", cursor: "pointer" });
    c.appendChild(b.document.createTextNode(a.l));
    c.addEventListener("click", (d) => {
      a.A();
      d.stopPropagation();
    });
    return c;
  }
  function ty(a, b, c) {
    const d = wg(b).createElement("IMG");
    d.src =
      "https://www.gstatic.com/adsense/autoads/icons/arrow_left_24px_grey_800.svg";
    d.setAttribute("aria-label", a.B);
    ry(b, d);
    M(d, {
      margin: "0px 12px 0px 8px",
      width: "24px",
      height: "24px",
      cursor: "pointer",
    });
    d.addEventListener("click", (e) => {
      c();
      e.stopPropagation();
    });
    return d;
  }
  function uy(a) {
    const b = a.document.createElement("ins");
    ry(a, b);
    M(b, {
      float: "left",
      display: "inline-flex",
      padding: "8px 0px",
      "background-color": "#FFF",
      "border-radius": "0px 20px 20px 0px",
      "box-shadow":
        "0px 1px 2px 0px rgba(60,64,67,0.3), 0px 1px 3px 1px rgba(60,64,67,0.15)",
    });
    return b;
  }
  class vy {
    constructor(a, b, c) {
      this.l = a;
      this.B = b;
      this.A = c;
      this.j = new Qm(!1);
    }
    Ca(a, b, c, d) {
      const e = qy(a, d),
        f = qy(a),
        g = sy(this, a),
        h = ty(this, a, c);
      a = uy(a);
      a.appendChild(e);
      a.appendChild(f);
      a.appendChild(g);
      a.appendChild(h);
      this.j.Z((k) => {
        M(e, { display: k ? "none" : "inline" });
        M(f, { display: k ? "inline" : "none" });
        k
          ? (M(g, {
              "line-height": "24px",
              "max-width": "100vw",
              opacity: "1",
              transition:
                "line-height 0s 50ms, max-width 50ms, opacity 50ms 50ms",
            }),
            M(h, {
              margin: "0px 12px 0px 8px",
              opacity: 1,
              width: "24px",
              transition:
                "margin 100ms 50ms, opacity 50ms 50ms, width 100ms 50ms",
            }))
          : (M(g, {
              "line-height": "0px",
              "max-width": "0vw",
              opacity: "0",
              transition:
                "line-height 0s 50ms, max-width 50ms 50ms, opacity 50ms",
            }),
            M(h, {
              margin: "0",
              opacity: "0",
              width: "0",
              transition: "margin 100ms, opacity 50ms, width 100ms",
            }));
      }, !0);
      return a;
    }
    Fd() {
      return 40;
    }
    Td() {
      R(this.j, !1);
      return 0;
    }
    Ud() {
      R(this.j, !0);
    }
  }
  function ry(a, b) {
    M(b, vw(a));
    M(b, {
      "font-family": "Arial,sans-serif",
      "font-weight": "bold",
      "font-size": "14px",
      "letter-spacing": "0.2px",
      color: "#3C4043",
      "user-select": "none",
    });
  }
  function wy(a, b) {
    const c = b.document.createElement("button");
    xy(a, b, c);
    b = {
      width: "100%",
      "text-align": "center",
      display: "block",
      padding: "8px 0px",
      "background-color": a.l,
    };
    a.j && ((b["border-top"] = a.j), (b["border-bottom"] = a.j));
    M(c, b);
    c.addEventListener("click", (d) => {
      a.D();
      d.stopPropagation();
    });
    return c;
  }
  function yy(a, b, c, d) {
    const e = b.document.createElement("div");
    M(e, vw(b));
    M(e, {
      "align-items": "center",
      "background-color": a.l,
      display: "flex",
      "justify-content": "center",
    });
    const f = b.document.createElement("span");
    f.appendChild(b.document.createTextNode(d));
    M(f, vw(b));
    M(f, {
      "font-family": "Arial,sans-serif",
      "font-size": "12px",
      padding: "8px 0px",
    });
    b = b.matchMedia("(min-width: 768px)");
    d = (g) => {
      g.matches
        ? (M(e, { "flex-direction": "row" }),
          a.j && M(e, { "border-top": a.j, "border-bottom": a.j }),
          M(f, { "margin-left": "8px", "text-align": "start" }),
          M(c, { border: "0", "margin-right": "8px", width: "auto" }))
        : (M(e, { border: "0", "flex-direction": "column" }),
          M(f, { "margin-left": "0", "text-align": "center" }),
          M(c, { "margin-right": "0", width: "100%" }),
          a.j && M(c, { "border-top": a.j, "border-bottom": a.j }));
    };
    d(b);
    b.addEventListener("change", d);
    e.appendChild(c);
    e.appendChild(f);
    return e;
  }
  function xy(a, b, c) {
    M(c, vw(b));
    M(c, {
      "font-family": "Arial,sans-serif",
      "font-weight": a.F,
      "font-size": "14px",
      "letter-spacing": "0.2px",
      color: a.G,
      "user-select": "none",
      cursor: "pointer",
    });
  }
  class zy {
    constructor(a, b, c, d, e, f = null, g = null, h = null) {
      this.C = a;
      this.D = b;
      this.G = c;
      this.l = d;
      this.F = e;
      this.B = f;
      this.j = g;
      this.A = h;
    }
    Ca(a) {
      const b = a.document.createElement("div");
      xy(this, a, b);
      M(b, {
        display: "inline-flex",
        padding: "8px 0px",
        "background-color": this.l,
      });
      if (this.B) {
        var c = wg(a).createElement("IMG");
        c.src = this.B;
        xy(this, a, c);
        M(c, { margin: "0px 8px 0px 0px", width: "24px", height: "24px" });
      } else c = null;
      c && b.appendChild(c);
      c = a.document.createElement("span");
      xy(this, a, c);
      M(c, { "line-height": "24px" });
      c.appendChild(a.document.createTextNode(this.C));
      b.appendChild(c);
      c = wy(this, a);
      c.appendChild(b);
      return this.A ? yy(this, a, c, this.A) : c;
    }
  }
  var Ay = (a, b) => {
    b = b.filter((c) => 5 == v(z(c, jo, 4), 1) && 1 == v(c, 8));
    b = at(b, a);
    a = Gt(b, a);
    a.sort((c, d) => d.aa.j - c.aa.j);
    return a[0] || null;
  };
  function By({ L: a, Lc: b, Kc: c, md: d, pa: e, Me: f }) {
    let g = 0;
    try {
      g |= a != a.top ? 512 : 0;
      const h = Math.min(a.screen.width || 0, a.screen.height || 0);
      g |= h ? (320 > h ? 8192 : 0) : 2048;
      g |= a.navigator && Cy(a.navigator.userAgent) ? 1048576 : 0;
      g = b
        ? g | (a.innerHeight >= b ? 0 : 1024)
        : g | (a.innerHeight >= a.innerWidth ? 0 : 8);
      g |= lm(a, c);
      g |= mm(a);
    } catch {
      g |= 32;
    }
    switch (d) {
      case 2:
        Dy(a, e) && (g |= 16777216);
        break;
      case 1:
        Ey(a, e) && (g |= 16777216);
    }
    f && Fy(a, e) && (g |= 16777216);
    return g;
  }
  function Cy(a) {
    return (
      /Android 2/.test(a) ||
      /iPhone OS [34]_/.test(a) ||
      /Windows Phone (?:OS )?[67]/.test(a) ||
      /MSIE.*Windows NT/.test(a) ||
      /Windows NT.*Trident/.test(a)
    );
  }
  var Dy = (a, b = null) => {
      const c = Gy(
        a.innerWidth,
        3,
        0,
        Math.min(Math.round((a.innerWidth / 320) * 50), Hy) + 15,
        3
      );
      return Iy(a, c, b);
    },
    Ey = (a, b = null) => {
      const c = a.innerWidth,
        d = a.innerHeight,
        e = Math.min(Math.round((a.innerWidth / 320) * 50), Hy) + 15,
        f = Gy(c, 3, d - e, d, 3);
      25 < e && f.push({ x: c - 25, y: d - 25 });
      return Iy(a, f, b);
    };
  function Fy(a, b = null) {
    return null != Jy(a, b);
  }
  function Jy(a, b = null) {
    var c = a.innerWidth;
    const d = a.innerHeight,
      e = V(Vq);
    c = Gy(c, 10, d - e, d, 10);
    return Ky(a, c, b);
  }
  function Ly(a, b) {
    const c = a.innerWidth,
      d = a.innerHeight;
    let e = d;
    for (; e > b; ) {
      var f = Gy(c, 11, e - b, e, 11);
      f = Ky(a, f);
      if (!f) return d - e;
      e = f.getBoundingClientRect().top - 1;
    }
    return null;
  }
  function Iy(a, b, c = null) {
    return null != Ky(a, b, c);
  }
  function Ky(a, b, c = null) {
    for (const d of b) if ((b = My(a, d, c))) return b;
    return null;
  }
  function My(a, b, c = null) {
    const d = Ny(a.document, b.x, b.y);
    return d ? Oy(d, a, b, c) || Py(d, a, b, c) || null : null;
  }
  function Ny(a, b, c) {
    a.hasOwnProperty("_goog_efp_called_") ||
      (a._goog_efp_called_ = a.elementFromPoint(b, c));
    return a.elementFromPoint(b, c);
  }
  function Py(a, b, c, d = null) {
    const e = b.document;
    for (a = a.offsetParent; a && a !== e.body; a = a.offsetParent) {
      const f = Oy(a, b, c, d);
      if (f) return f;
    }
    return null;
  }
  function Gy(a, b, c, d, e) {
    const f = [];
    for (let l = 0; l < e; l++)
      for (let m = 0; m < b; m++) {
        var g = f,
          h = b - 1,
          k = e - 1;
        g.push.call(g, {
          x: (0 === h ? 0 : m / h) * a,
          y: c + (0 === k ? 0 : l / k) * (d - c),
        });
      }
    return f;
  }
  function Oy(a, b, c, d = null) {
    if ("fixed" !== oi(a, "position")) return null;
    var e =
      "GoogleActiveViewInnerContainer" === a.getAttribute("class") ||
      (1 >= ri(a).width && 1 >= ri(a).height)
        ? !0
        : !1;
    d &&
      $i(
        d,
        "ach_evt",
        {
          url: b.location.href,
          tn: a.tagName,
          id: a.getAttribute("id") ?? "",
          cls: a.getAttribute("class") ?? "",
          ign: String(e),
          pw: b.innerWidth,
          ph: b.innerHeight,
          x: c.x,
          y: c.y,
        },
        !0,
        1
      );
    return e ? null : a;
  }
  const Hy = 90 * 1.38;
  function Qy(a) {
    if (a.G) {
      const b = sm(a.j);
      if (b > a.l + 100 || b < a.l - 100) Ry(a), (a.l = om(a.j));
    }
    a.I && a.j.clearTimeout(a.I);
    a.I = a.j.setTimeout(() => Sy(a), 200);
  }
  function Sy(a) {
    var b = om(a.j);
    a.l && a.l > b && (a.l = b);
    b = sm(a.j);
    b >= a.l - 100 && ((a.l = Math.max(a.l, b)), Ty(a));
  }
  function Uy(a) {
    a.j.removeEventListener("scroll", a.K);
  }
  function Ry(a) {
    a.G = !1;
    const b = a.C.Td();
    switch (b) {
      case 0:
        R(a.B, a.D);
        break;
      case 1:
        a.A && (M(a.A, { display: "none" }), R(a.B, null));
        break;
      default:
        throw Error("Unhandled OnHideOutcome: " + b);
    }
  }
  function Ty(a) {
    a.A || (a.A = Vy(a));
    M(a.A, { display: "block" });
    a.G = !0;
    a.C.Ud();
    R(a.B, a.D);
  }
  function Vy(a) {
    var b = Ly(a.j, a.C.Fd() + 60);
    b = null == b ? 30 : b + 30;
    const c = a.j.document.createElement("div");
    M(c, vw(a.j));
    M(c, {
      position: "fixed",
      left: "0px",
      bottom: b + "px",
      width: "100vw",
      "text-align": "center",
      "z-index": 2147483642,
      display: "none",
      "pointer-events": "none",
    });
    a.D = a.C.Ca(
      a.j,
      () => a.remove(),
      () => {
        Uy(a);
        Ry(a);
      },
      () => {
        Uy(a);
        Ty(a);
      }
    );
    c.appendChild(a.D);
    a.J && (c.className = a.J);
    a.j.document.body.appendChild(c);
    return c;
  }
  class Wy {
    constructor(a, b, c) {
      this.j = a;
      this.C = b;
      this.D = null;
      this.B = new Qm(null);
      this.J = c || null;
      this.A = null;
      this.G = !1;
      this.l = 0;
      this.I = null;
      this.K = () => Qy(this);
    }
    init() {
      this.j.addEventListener("scroll", this.K);
      this.l = om(this.j);
      Sy(this);
    }
    remove() {
      this.A && this.A.parentNode && this.A.parentNode.removeChild(this.A);
      this.A = null;
      Uy(this);
      R(this.B, null);
    }
    F() {
      return this.B;
    }
  }
  function Xy(a) {
    R(a.D, 0);
    null != a.A && (a.A.remove(), (a.A = null));
    null != a.l && (a.l.remove(), (a.l = null));
  }
  function Yy(a) {
    a.l = new Wy(a.C, a.J, a.G);
    a.l.init();
    Zm(a.B, a.l.F());
    R(a.D, 2);
  }
  class Zy {
    constructor(a, b, c, d, e) {
      this.C = a;
      this.I = b;
      this.K = c;
      this.J = d;
      this.G = e;
      this.D = new Qm(0);
      this.B = new Qm(null);
      this.l = this.A = this.j = null;
    }
    init() {
      this.I
        ? ((this.A = new ey(this.C, this.I, this.K, this.G)),
          this.A.init(),
          Zm(this.B, this.A.F()),
          R(this.D, 1),
          null == this.j && ((this.j = new En(this.C)), this.j.init(2e3)),
          this.j.addListener(() => {
            Xy(this);
            Yy(this);
          }))
        : Yy(this);
    }
    remove() {
      Xy(this);
      this.j && (this.j.Ea(), (this.j = null));
    }
    F() {
      return this.B;
    }
  }
  var $y = (a, b, c, d, e) => {
    a = new Zy(
      a,
      Ay(a, e),
      new zy(b, d, "#FFF", "#4A4A4A", "normal"),
      new vy(b, c, d),
      "google-dns-link-placeholder"
    );
    a.init();
    return a;
  };
  var az = (a) => (a.googlefc = a.googlefc || {}),
    bz = (a) => {
      a = a.googlefc = a.googlefc || {};
      return (a.ccpa = a.ccpa || {});
    };
  function cz(a) {
    var b = bz(a.j);
    if (dz(b.getInitialCcpaStatus(), b.InitialCcpaStatusEnum)) {
      var c = b.getLocalizedDnsText();
      b = b.getLocalizedDnsCollapseText();
      null != c && null != b && (a.l = $y(a.j, c, b, () => ez(a), a.B));
    }
  }
  function fz(a) {
    const b = az(a.j);
    bz(a.j).overrideDnsLink = !0;
    b.callbackQueue = b.callbackQueue || [];
    b.callbackQueue.push({ INITIAL_CCPA_DATA_READY: () => cz(a) });
  }
  function ez(a) {
    Hw(a.A);
    bz(a.j).openConfirmationDialog((b) => {
      b && a.l && (a.l.remove(), (a.l = null));
      Iw(a.A);
    });
  }
  class gz {
    constructor(a, b, c) {
      this.j = a;
      this.A = Cw(b, 2147483643);
      this.B = c;
      this.l = null;
    }
  }
  function dz(a, b) {
    switch (a) {
      case b.CCPA_DOES_NOT_APPLY:
      case b.OPTED_OUT:
        return !1;
      case b.NOT_OPTED_OUT:
        return !0;
      default:
        return !0;
    }
  }
  function hz(a) {
    const b = a.document.createElement("ins");
    iz(a, b);
    M(b, { display: "flex", padding: "8px 0px", width: "100%" });
    return b;
  }
  function jz(a, b, c, d) {
    const e = wg(a).createElement("IMG");
    e.src = b;
    d && e.setAttribute("aria-label", d);
    iz(a, e);
    M(e, {
      margin: "0px 12px 0px 8px",
      width: "24px",
      height: "24px",
      cursor: "pointer",
    });
    e.addEventListener("click", (f) => {
      c();
      f.stopPropagation();
    });
    return e;
  }
  function kz(a, b) {
    const c = b.document.createElement("span");
    iz(b, c);
    M(c, { "line-height": "24px", cursor: "pointer" });
    c.appendChild(b.document.createTextNode(a.B));
    c.addEventListener("click", (d) => {
      a.l();
      d.stopPropagation();
    });
    return c;
  }
  function lz(a, b) {
    const c = b.document.createElement("span");
    c.appendChild(b.document.createTextNode(a.A));
    M(c, vw(b));
    M(c, {
      "border-top": "11px solid #ECEDED",
      "font-family": "Arial,sans-serif",
      "font-size": "12px",
      "line-height": "1414px",
      padding: "8px 32px",
      "text-align": "center",
    });
    return c;
  }
  function mz(a) {
    const b = a.document.createElement("div");
    M(b, vw(a));
    M(b, {
      "align-items": "flex-start",
      "background-color": "#FFF",
      "border-radius": "0px 20px 20px 0px",
      "box-shadow": "0px 1px 3px 1px rgba(60,64,67,0.5)",
      display: "inline-flex",
      "flex-direction": "column",
      float: "left",
    });
    return b;
  }
  class nz {
    constructor(a, b, c, d) {
      this.B = a;
      this.C = b;
      this.A = c;
      this.l = d;
      this.j = new Qm(!1);
    }
    Ca(a, b, c, d) {
      c = hz(a);
      const e = jz(
          a,
          "https://www.gstatic.com/adsense/autoads/icons/gpp_good_24px_grey_800.svg",
          d
        ),
        f = jz(
          a,
          "https://www.gstatic.com/adsense/autoads/icons/gpp_good_24px_grey_800.svg",
          this.l
        ),
        g = kz(this, a),
        h = jz(
          a,
          "https://www.gstatic.com/adsense/autoads/icons/close_24px_grey_700.svg",
          b,
          this.C
        );
      M(h, { "margin-left": "auto" });
      c.appendChild(e);
      c.appendChild(f);
      c.appendChild(g);
      c.appendChild(h);
      const k = lz(this, a);
      a = mz(a);
      a.appendChild(c);
      a.appendChild(k);
      this.j.Z((l) => {
        M(e, { display: l ? "none" : "inline" });
        M(f, { display: l ? "inline" : "none" });
        l
          ? (M(g, {
              "line-height": "24px",
              "max-width": "100vw",
              opacity: "1",
              transition:
                "line-height 0s 50ms, max-width 50ms, opacity 50ms 50ms",
            }),
            M(h, {
              "margin-right": "12px",
              opacity: 1,
              width: "24px",
              transition: "margin 50ms, opacity 50ms 50ms, width 50ms",
            }),
            M(k, {
              "border-width": "1px",
              "line-height": "14px",
              "max-width": "100vw",
              opacity: "1",
              padding: "8px 32px",
              transition:
                "border-width 0s 50ms, line-height 0s 50ms, max-width 50ms, opacity 50ms 50ms, padding 50ms",
            }))
          : (M(g, {
              "line-height": "0px",
              "max-width": "0vw",
              opacity: "0",
              transition:
                "line-height 0s 50ms, max-width 50ms 50ms, opacity 50ms",
            }),
            M(h, {
              "margin-right": "0",
              opacity: "0",
              width: "0",
              transition: "margin 50ms 50ms, opacity 50ms, width 50ms 50ms",
            }),
            M(k, {
              "border-width": "0px",
              "line-height": "0px",
              "max-width": "0vw",
              opacity: "0",
              padding: "0",
              transition:
                "border-width 0s 50ms, line-height 0s 50ms, max-width 50ms 50ms, opacity 50ms, padding 50ms 50ms",
            }));
      }, !0);
      return a;
    }
    Fd() {
      return 71;
    }
    Td() {
      R(this.j, !1);
      return 0;
    }
    Ud() {
      R(this.j, !0);
    }
  }
  function iz(a, b) {
    M(b, vw(a));
    M(b, {
      "font-family": "Arial,sans-serif",
      "font-weight": "bold",
      "font-size": "14px",
      "letter-spacing": "0.2px",
      color: "#1A73E8",
      "user-select": "none",
    });
  }
  function oz(a) {
    pz(
      a.l,
      (b) => {
        var c = a.B,
          d = b.Pf,
          e = b.Oe,
          f = b.Ce;
        b = b.showRevocationMessage;
        new Zy(
          c,
          Ay(c, a.A),
          new zy(
            d,
            b,
            "#1A73E8",
            "#FFF",
            "bold",
            "https://www.gstatic.com/adsense/autoads/icons/gpp_good_24px_blue_600.svg",
            "2px solid #ECEDED",
            f
          ),
          new nz(d, e, f, b),
          "google-revocation-link-placeholder"
        ).init();
      },
      () => {
        Iw(a.j);
      }
    );
  }
  class qz {
    constructor(a, b, c, d) {
      this.B = a;
      this.j = Cw(b, 2147483643);
      this.A = c;
      this.l = d;
    }
  }
  var rz = (a) => {
    if (!a || !$c(a, 1)) return !1;
    a = v(a, 1);
    switch (a) {
      case 1:
        return !0;
      case 2:
        return !1;
      default:
        throw Error("Unhandled AutoConsentUiStatus: " + a);
    }
  };
  function sz(a) {
    if (!0 !== a.l.adsbygoogle_ama_fc_has_run) {
      var b = !1;
      rz(a.j) &&
        ((b = new qz(a.l, a.C, a.B || A(a.j, bp, 4), a.A)),
        Hw(b.j),
        oz(b),
        (b = !0));
      var c;
      a: if ((c = a.j) && $c(c, 3))
        switch (((c = v(c, 3)), c)) {
          case 1:
            c = !0;
            break a;
          case 2:
            c = !1;
            break a;
          default:
            throw Error("Unhandled AutoCcpaUiStatus: " + c);
        }
      else c = !1;
      c && (fz(new gz(a.l, a.C, a.B || A(a.j, bp, 4))), (b = !0));
      if ((c = (c = a.j) ? !0 === fd(c, 5) : !1))
        c = ((c = a.j) ? !0 === fd(c, 6) : !1) || U(nq);
      c && (b = !0);
      b && (a.A.start(), (a.l.adsbygoogle_ama_fc_has_run = !0));
    }
  }
  class tz {
    constructor(a, b, c, d, e) {
      this.l = a;
      this.A = b;
      this.j = c;
      this.C = d;
      this.B = e || null;
    }
  }
  var uz = (a, b, c, d, e, f) => {
      try {
        const g = a.j,
          h = Xg("SCRIPT", g);
        h.async = !0;
        Kf(h, b);
        g.head.appendChild(h);
        h.addEventListener("load", () => {
          e();
          d && g.head.removeChild(h);
        });
        h.addEventListener("error", () => {
          0 < c ? uz(a, b, c - 1, d, e, f) : (d && g.head.removeChild(h), f());
        });
      } catch (g) {
        f();
      }
    },
    vz = (a, b, c = () => {}, d = () => {}) => {
      uz(wg(a), b, 0, !1, c, d);
    };
  var wz = (a = null) => {
    a = a || t;
    return a.googlefc || (a.googlefc = {});
  };
  me(am).map((a) => Number(a));
  me(bm).map((a) => Number(a));
  var xz = (a, b) => {
    const c = a.document,
      d = () => {
        if (!a.frames[b])
          if (c.body) {
            const e = Xg("IFRAME", c);
            e.style.display = "none";
            e.style.width = "0px";
            e.style.height = "0px";
            e.style.border = "none";
            e.style.zIndex = "-1000";
            e.style.left = "-1000px";
            e.style.top = "-1000px";
            e.name = b;
            c.body.appendChild(e);
          } else a.setTimeout(d, 5);
      };
    d();
  };
  const yz = (a) => {
    void 0 !== a.addtlConsent &&
      "string" !== typeof a.addtlConsent &&
      (a.addtlConsent = void 0);
    void 0 !== a.gdprApplies &&
      "boolean" !== typeof a.gdprApplies &&
      (a.gdprApplies = void 0);
    return (void 0 !== a.tcString && "string" !== typeof a.tcString) ||
      (void 0 !== a.listenerId && "number" !== typeof a.listenerId)
      ? 2
      : a.cmpStatus && "error" !== a.cmpStatus
      ? 0
      : 3;
  };
  function zz(a) {
    if (!1 === a.gdprApplies) return !0;
    void 0 === a.internalErrorState && (a.internalErrorState = yz(a));
    return "error" === a.cmpStatus || 0 !== a.internalErrorState
      ? a.internalBlockOnErrors
        ? (Ri({ e: String(a.internalErrorState) }, "tcfe"), !1)
        : !0
      : "loaded" !== a.cmpStatus ||
        ("tcloaded" !== a.eventStatus && "useractioncomplete" !== a.eventStatus)
      ? !1
      : !0;
  }
  function Az(a) {
    return zz(a)
      ? !1 !== a.gdprApplies &&
        "tcunavailable" !== a.tcString &&
        void 0 !== a.gdprApplies &&
        "string" === typeof a.tcString &&
        a.tcString.length
        ? Bz(a, "1")
        : !0
      : !1;
  }
  function Bz(a, b) {
    a: {
      if (a.publisher && a.publisher.restrictions) {
        var c = a.publisher.restrictions[b];
        if (void 0 !== c) {
          c = c["755"];
          break a;
        }
      }
      c = void 0;
    }
    if (0 === c) return !1;
    a.purpose && a.vendor
      ? ((c = a.vendor.consents),
        (c = !(!c || !c["755"])) &&
        "1" === b &&
        a.purposeOneTreatment &&
        "CH" === a.publisherCC
          ? (b = !0)
          : (c && ((a = a.purpose.consents), (c = !(!a || !a[b]))), (b = c)))
      : (b = !0);
    return b;
  }
  function Cz(a) {
    var b = ["3", "4"];
    return !1 === a.gdprApplies ? !0 : b.every((c) => Bz(a, c));
  }
  function Dz(a) {
    if (a.A) return a.A;
    a.A = ph(a.j, "__tcfapiLocator");
    return a.A;
  }
  function Ez(a) {
    return "function" === typeof a.j.__tcfapi || null != Dz(a);
  }
  function Fz(a, b, c, d) {
    c || (c = () => {});
    if ("function" === typeof a.j.__tcfapi) (a = a.j.__tcfapi), a(b, 2, c, d);
    else if (Dz(a)) {
      Gz(a);
      const e = ++a.J;
      a.D[e] = c;
      a.A &&
        a.A.postMessage(
          { __tcfapiCall: { command: b, version: 2, callId: e, parameter: d } },
          "*"
        );
    } else c({}, !1);
  }
  function Hz(a, b) {
    let c = { internalErrorState: 0, internalBlockOnErrors: a.F };
    const d = Wd(() => b(c));
    let e = 0;
    -1 !== a.G &&
      (e = setTimeout(() => {
        e = 0;
        c.tcString = "tcunavailable";
        c.internalErrorState = 1;
        d();
      }, a.G));
    Fz(a, "addEventListener", (f) => {
      f &&
        ((c = f),
        (c.internalErrorState = yz(c)),
        (c.internalBlockOnErrors = a.F),
        zz(c)
          ? (0 != c.internalErrorState && (c.tcString = "tcunavailable"),
            Fz(a, "removeEventListener", null, c.listenerId),
            (f = e) && clearTimeout(f),
            d())
          : ("error" === c.cmpStatus || 0 !== c.internalErrorState) &&
            (f = e) &&
            clearTimeout(f));
    });
  }
  function Gz(a) {
    a.B ||
      ((a.B = (b) => {
        try {
          var c = ("string" === typeof b.data ? JSON.parse(b.data) : b.data)
            .__tcfapiReturn;
          a.D[c.callId](c.returnValue, c.success);
        } catch (d) {}
      }),
      L(a.j, "message", a.B));
  }
  class Iz extends Km {
    constructor(a, b = 500, c = !1) {
      super();
      this.j = a;
      this.A = null;
      this.D = {};
      this.J = 0;
      this.G = b;
      this.F = c;
      this.B = null;
    }
    l() {
      this.D = {};
      this.B && (he(this.j, "message", this.B), delete this.B);
      delete this.D;
      delete this.j;
      delete this.A;
      super.l();
    }
    addEventListener(a) {
      let b = { internalBlockOnErrors: this.F };
      const c = Wd(() => a(b));
      let d = 0;
      -1 !== this.G &&
        (d = setTimeout(() => {
          b.tcString = "tcunavailable";
          b.internalErrorState = 1;
          c();
        }, this.G));
      const e = (f, g) => {
        clearTimeout(d);
        f
          ? ((b = f),
            (b.internalErrorState = yz(b)),
            (b.internalBlockOnErrors = this.F),
            (g && 0 === b.internalErrorState) ||
              ((b.tcString = "tcunavailable"), g || (b.internalErrorState = 3)))
          : ((b.tcString = "tcunavailable"), (b.internalErrorState = 3));
        a(b);
      };
      try {
        Fz(this, "addEventListener", e);
      } catch (f) {
        (b.tcString = "tcunavailable"),
          (b.internalErrorState = 3),
          d && (clearTimeout(d), (d = 0)),
          c();
      }
    }
    removeEventListener(a) {
      a && a.listenerId && Fz(this, "removeEventListener", null, a.listenerId);
    }
  }
  function pz(a, b, c) {
    const d = wz(a.j);
    d.callbackQueue = d.callbackQueue || [];
    d.callbackQueue.push({
      CONSENT_DATA_READY: () => {
        const e = wz(a.j),
          f = new Iz(a.j);
        Ez(f) &&
          Hz(f, (g) => {
            300 === g.cmpId &&
              g.tcString &&
              "tcunavailable" !== g.tcString &&
              b({
                Pf: e.getDefaultConsentRevocationText(),
                Oe: e.getDefaultConsentRevocationCloseText(),
                Ce: e.getDefaultConsentRevocationAttestationText(),
                showRevocationMessage: () => e.showRevocationMessage(),
              });
          });
        c();
      },
    });
  }
  function Jz(a) {
    const b = De(
      Pd("https://fundingchoicesmessages.google.com/i/%{id}?ers=%{ers}"),
      { id: a.l, ers: 2 }
    );
    vz(
      a.j,
      b,
      () => {},
      () => {}
    );
  }
  class Kz {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
    start() {
      if (this.j === this.j.top)
        try {
          xz(this.j, "googlefcPresent"), Jz(this);
        } catch (a) {}
    }
  }
  var Lz = (a, b, c) => {
    const d = z(a, Wo, 6);
    if (!d) return [];
    c = nv(d.j(), c);
    return (a = a.j()) && fd(a, 11)
      ? c.map((e) => Dt(e))
      : c.map((e) => {
          const f = io();
          return new bt(
            new xt(e.qc, e.rc),
            new vt(),
            new wt(b),
            !0,
            2,
            [],
            f,
            e.l,
            null,
            null,
            null,
            e.A,
            e.j
          );
        });
  };
  var Nz = class extends J {
    constructor() {
      super(void 0, -1, Mz);
    }
  };
  function Oz(a, b) {
    return w(a, 1, b);
  }
  function Pz(a, b) {
    return rd(a, 2, b);
  }
  var Rz = class extends J {
      constructor(a) {
        super(a, -1, Qz);
      }
    },
    Sz = class extends J {
      constructor(a) {
        super(a);
      }
      getHeight() {
        return ud(this, 2);
      }
    },
    Mz = [5],
    Qz = [2];
  var Tz = class extends J {
      constructor() {
        super();
      }
    },
    Uz = [1, 2];
  function Vz(a) {
    return new lo(["pedestal_container"], {
      google_reactive_ad_format: 30,
      google_phwr: 2.189,
      google_ad_width: Math.floor(a),
      google_ad_format: "autorelaxed",
      google_full_width_responsive: !0,
      google_enable_content_recommendations: !0,
      google_content_recommendation_ui_type: "pedestal",
    });
  }
  class Wz {
    j(a) {
      return Vz(Math.floor(a.l));
    }
  }
  function Xz(a) {
    var b = [
      "Could not locate a suitable placement in the content below the fold.",
    ];
    a = hm(a)?.tagSpecificState[1];
    (a =
      null == a ? null : 4 === a.debugCard?.getAdType() ? a.debugCard : null) &&
      a.displayAdLoadedContent(b);
  }
  var Yz = class extends J {
    constructor() {
      super();
    }
  };
  function Zz(a, b) {
    if (b) {
      var c = b.adClient;
      if ("string" === typeof c && c) {
        a.sc = c;
        a.A = !!b.adTest;
        c = b.pubVars;
        Ca(c) && (a.H = c);
        if (Array.isArray(b.fillMessage) && 0 < b.fillMessage.length) {
          a.D = {};
          for (d of b.fillMessage) a.D[d.key] = d.value;
        }
        a.B = b.adWidth;
        a.l = b.adHeight;
        (xi(a.B) && xi(a.l)) || Al("rctnosize", b);
        var d = !0;
      } else d = !1;
    } else d = !1;
    return d && a.G(b);
  }
  class $z {
    constructor() {
      this.D = this.H = this.A = this.sc = null;
      this.l = this.B = 0;
    }
    G() {
      return !0;
    }
  }
  function aA(a, b = []) {
    const c = Date.now();
    return vb(b, (d) => c - d < 1e3 * a);
  }
  function bA(a, b) {
    try {
      const c = a.getItem("__lsv__");
      if (!c) return [];
      let d;
      try {
        d = JSON.parse(c);
      } catch (e) {}
      if (!Array.isArray(d) || zb(d, (e) => !Number.isInteger(e)))
        return a.removeItem("__lsv__"), [];
      d = aA(b, d);
      d.length || a?.removeItem("__lsv__");
      return d;
    } catch (c) {
      return null;
    }
  }
  function cA(a, b) {
    var c;
    if (!(c = 0 >= b) && !(c = null == a)) {
      try {
        a.setItem("__storage_test__", "__storage_test__");
        const e = a.getItem("__storage_test__");
        a.removeItem("__storage_test__");
        var d = "__storage_test__" === e;
      } catch (e) {
        d = !1;
      }
      c = !d;
    }
    return c ? null : bA(a, b);
  }
  var dA = (a, b, c) => {
    let d = 0;
    try {
      d |= a != a.top ? 512 : 0;
      d |= mm(a);
      d |= lm(a);
      d |= a.innerHeight >= a.innerWidth ? 0 : 8;
      d |= a.navigator && /Android 2/.test(a.navigator.userAgent) ? 1048576 : 0;
      var e;
      if ((e = b)) {
        var f = cA(c, 3600);
        e = !(f && 1 > f.length);
      }
      e && (d |= 134217728);
      U(Mq) && (d |= 128);
    } catch (g) {
      d |= 32;
    }
    return d;
  };
  class eA extends $z {
    constructor() {
      super();
      this.C = !1;
      this.j = null;
      this.F = !1;
    }
    G(a) {
      this.C = !!a.enableAma;
      var b = a.amaConfig;
      if (b)
        try {
          var c = Dd(wp, b);
        } catch (d) {
          c = null;
        }
      else c = null;
      this.j = c;
      Array.isArray(a.fillMessage) && (this.F = !0);
      return !0;
    }
  }
  const fA = {};
  function gA(a, b, c) {
    let d = hA(a, c, b);
    if (!d) return !0;
    let e = -1;
    const f = c.D.l;
    for (; d.Ab && d.Ab.length; ) {
      const h = d.Ab.shift();
      var g = kt(h.W);
      const k = h.aa.j,
        l = !!c.A.Rc || !!c.A.Wc || c.Ga() || !!c.A.ud || k > e;
      g = !g || g <= d.Ib;
      if (l && g && iA(c, h, { Yb: d.Ib })) {
        e = k;
        if (d.Hb.j.length + 1 >= f) return !0;
        d = hA(a, c, b);
        if (!d) return !0;
      }
    }
    return c.B;
  }
  const hA = (a, b, c) => {
    var d = b.D.l,
      e = b.D.B,
      f = b.D;
    f = ru(b.T(), f.j ? f.j.kb : void 0, d);
    if (f.j.length >= d) return null;
    e
      ? ((d = f.l || (f.l = P(f.A).scrollHeight || null)),
        (e = !d || 0 > d ? -1 : f.l * e - xu(f)))
      : (e = void 0);
    a = null == e || 50 <= e ? jA(b, f, { types: a }, c) : null;
    return { Hb: f, Ib: e, Ab: a };
  };
  fA[2] = Ma(
    function (a, b) {
      a = jA(b, ru(b.T()), { types: a, Ra: Zt(b.T()) }, 2);
      if (0 == a.length) return !0;
      for (var c = 0; c < a.length; c++) if (iA(b, a[c])) return !0;
      return b.B ? (b.C.push(11), !0) : !1;
    },
    [0]
  );
  fA[5] = Ma(gA, [0], 5);
  fA[10] = Ma(function (a, b) {
    a = [];
    const c = b.ba;
    c.includes(3) && a.push(2);
    c.includes(1) && a.push(0);
    c.includes(2) && !U(bq) && a.push(1);
    return gA(a, 10, b);
  }, 10);
  fA[3] = function (a) {
    if (!a.B) return !1;
    var b = jA(a, ru(a.T()), { types: [0], Ra: Zt(a.T()) }, 3);
    if (0 == b.length) return !0;
    for (var c = b.length - 1; 0 <= c; c--) if (iA(a, b[c])) return !0;
    a.C.push(11);
    return !0;
  };
  const kA = (a) => {
      var b;
      a.A.me ? (b = new Vt(0, null, [], 3, null)) : (b = Zt(a.T()));
      return { types: [0], Ra: b };
    },
    mA = (a) => {
      const b = a.T().document.body.getBoundingClientRect().width;
      lA(a, Vz(b));
    },
    oA = (a, b) => {
      var c = kA(a);
      c.Mf = [5];
      c = jA(a, ru(a.T()), c, 8);
      nA(a, c.reverse(), b);
    },
    nA = (a, b, c) => {
      for (const d of b) if (((b = c.j(d.aa)), iA(a, d, { tc: b }))) return !0;
      return !1;
    };
  fA[8] = function (a) {
    var b = a.T().document;
    if ("complete" != b.readyState)
      return (
        b.addEventListener("readystatechange", () => fA[8](a), { once: !0 }), !0
      );
    if (!a.B) return !1;
    if (!a.Wb()) return !0;
    b = kA(a);
    b.Pc = [2, 4, 5];
    b = jA(a, ru(a.T()), b, 8);
    const c = new Wz();
    if (nA(a, b, c)) return !0;
    if (a.A.xd)
      switch (a.A.Xd || 0) {
        case 1:
          oA(a, c);
          break;
        default:
          mA(a);
      }
    return !0;
  };
  fA[6] = Ma(gA, [2], 6);
  fA[7] = Ma(gA, [1], 7);
  fA[9] = function (a) {
    const b = hA([0, 2], a, 9);
    if (!b || !b.Ab) return a.C.push(17), Xz(a.T()), a.B;
    for (const e of b.Ab) {
      var c = e;
      var d = a.A.Dc || null;
      null == d
        ? (c = null)
        : ((d = lt(c.W, new pA(), new qA(d, a.T()))),
          (c = new st(d, c.Y(), c.aa)));
      if (c && !(kt(c.W) > b.Ib) && iA(a, c, { Yb: b.Ib, wc: !0 }))
        return (a = c.W.R), it(e.W, 0 < a.length ? a[0] : null), !0;
    }
    a.C.push(17);
    Xz(a.T());
    return a.B;
  };
  class pA {
    l(a, b, c, d) {
      return os(d.document, a, b);
    }
    A(a) {
      return P(a).clientHeight || 0;
    }
  }
  var rA = class {
    constructor(a, b, c) {
      this.l = a;
      this.j = b;
      this.Hb = c;
    }
    ja(a) {
      return this.j ? Tu(this.l, this.j, a, this.Hb) : Su(this.l, a, this.Hb);
    }
    ka() {
      return this.j ? 16 : 9;
    }
  };
  var sA = class {
    constructor(a) {
      this.uc = a;
    }
    ja(a) {
      return $u(a.document, this.uc);
    }
    ka() {
      return 11;
    }
  };
  var tA = class {
    constructor(a) {
      this.eb = a;
    }
    ja(a) {
      return Xu(this.eb, a);
    }
    ka() {
      return 13;
    }
  };
  var uA = class {
    ja(a) {
      return Qu(a);
    }
    ka() {
      return 12;
    }
  };
  var vA = class {
    constructor(a) {
      this.sb = a;
    }
    ja() {
      return Vu(this.sb);
    }
    ka() {
      return 2;
    }
  };
  var wA = class {
    constructor(a) {
      this.j = a;
    }
    ja() {
      return Yu(this.j);
    }
    ka() {
      return 3;
    }
  };
  var xA = class {
    ja() {
      return av();
    }
    ka() {
      return 17;
    }
  };
  var yA = class {
    constructor(a) {
      this.j = a;
    }
    ja() {
      return Uu(this.j);
    }
    ka() {
      return 1;
    }
  };
  var zA = class {
    ja() {
      return Ud(ct);
    }
    ka() {
      return 7;
    }
  };
  var AA = class {
    constructor(a) {
      this.Pc = a;
    }
    ja() {
      return Wu(this.Pc);
    }
    ka() {
      return 6;
    }
  };
  var BA = class {
    constructor(a) {
      this.j = a;
    }
    ja() {
      return Zu(this.j);
    }
    ka() {
      return 5;
    }
  };
  var CA = class {
    constructor(a, b) {
      this.minWidth = a;
      this.maxWidth = b;
    }
    ja() {
      return Ma(bv, this.minWidth, this.maxWidth);
    }
    ka() {
      return 10;
    }
  };
  var DA = class {
    constructor(a) {
      this.B = a.l.slice(0);
      this.l = a.j.slice(0);
      this.A = a.A;
      this.C = a.B;
      this.j = a.C;
    }
  };
  function EA(a) {
    var b = new FA();
    b.C = a;
    b.l.push(new yA(a));
    return b;
  }
  function GA(a, b) {
    a.l.push(new AA(b));
    return a;
  }
  function HA(a, b) {
    a.l.push(new vA(b));
    return a;
  }
  function IA(a, b) {
    a.l.push(new BA(b));
    return a;
  }
  function JA(a, b) {
    a.l.push(new wA(b));
    return a;
  }
  function KA(a) {
    a.l.push(new zA());
    return a;
  }
  function LA(a) {
    a.j.push(new uA());
    return a;
  }
  function MA(a, b = 0, c, d) {
    a.j.push(new rA(b, c, d));
    return a;
  }
  function NA(a, b = 0, c = Infinity) {
    a.j.push(new CA(b, c));
    return a;
  }
  function OA(a) {
    a.j.push(new xA());
    return a;
  }
  function PA(a, b = 0) {
    a.j.push(new tA(b));
    return a;
  }
  function QA(a, b) {
    a.A = b;
    return a;
  }
  var FA = class {
    constructor() {
      this.A = 0;
      this.B = !1;
      this.l = [].slice(0);
      this.j = [].slice(0);
    }
    build() {
      return new DA(this);
    }
  };
  class qA {
    constructor(a, b) {
      this.l = a;
      this.A = b;
    }
    j() {
      var a = this.l,
        b = this.A;
      const c = a.H || {};
      c.google_ad_client = a.sc;
      c.google_ad_height = P(b).clientHeight || 0;
      c.google_ad_width = P(b).clientWidth || 0;
      c.google_reactive_ad_format = 9;
      b = new Yz();
      w(b, 1, a.C);
      a.j && od(b, 2, a.j);
      a.F && w(b, 3, !0);
      c.google_rasc = Fd(b);
      a.A && (c.google_adtest = "on");
      return new lo(["fsi_container"], c);
    }
  }
  var RA = eo(new ao(0, {})),
    SA = eo(new ao(1, {})),
    TA = (a) => a === RA || a === SA;
  function UA(a, b, c) {
    Cm(a.j, b) || a.j.set(b, []);
    a.j.get(b).push(c);
  }
  class VA {
    constructor() {
      this.j = new Gm();
    }
  }
  function WA(a, b) {
    b &&
      ((a.j.apv = v(b, 4)), ad(b, yp, 23) && (a.j.sat = "" + z(b, yp, 23).j()));
    return a;
  }
  function XA(a, b) {
    a.j.afm = b.join(",");
    return a;
  }
  class YA extends Qs {
    constructor(a) {
      super(a);
      this.j = {};
    }
    G(a) {
      null != a && (this.j.allp = a);
      return this;
    }
    B(a) {
      try {
        this.j.su = a.location.hostname;
      } catch (b) {
        this.j.su = "_ex";
      }
      a = super.B(a);
      pe(a, this.j);
      return a;
    }
  }
  function ZA(a) {
    return null == a ? null : Number.isInteger(a) ? a.toString() : a.toFixed(3);
  }
  function $A(a, b) {
    a.l.op = aB(b);
  }
  function bB(a, b, c) {
    30 >= c.length
      ? (a.l[b] = cB(c))
      : ((a.l[b] = cB(c.slice(0, 30))), (a.l[b + "_c"] = c.length.toString()));
  }
  function dB(a, b, c) {
    bB(a, "fap", b);
    a.l.fad = aB(c);
  }
  function eB(a, b, c) {
    bB(a, "fmp", b);
    a.l.fmd = aB(c);
  }
  function fB(a, b, c) {
    bB(a, "vap", b);
    a.l.vad = aB(c);
  }
  function gB(a, b, c) {
    bB(a, "vmp", b);
    a.l.vmd = aB(c);
  }
  function hB(a, b, c) {
    bB(a, "pap", b);
    a.l.pad = aB(c);
  }
  function iB(a, b, c) {
    bB(a, "pmp", b);
    a.l.pmd = aB(c);
  }
  function jB(a, b) {
    bB(a, "psq", b);
  }
  var kB = class extends YA {
    constructor(a) {
      super(0);
      Object.assign(this, a);
      this.l = {};
    }
    B(a) {
      a = super.B(a);
      Object.assign(a, this.l);
      return a;
    }
  };
  function cB(a) {
    return a.map((b) => b?.toString() ?? "null").join("~");
  }
  function aB(a) {
    return null == a
      ? "null"
      : "string" === typeof a
      ? a
      : "boolean" === typeof a
      ? a
        ? "1"
        : "0"
      : Number.isInteger(a)
      ? a.toString()
      : a.toFixed(3);
  }
  function lB(a, b, c) {
    const d = b.W;
    Cm(a.j, d) || a.j.set(d, new mB(Un(qt(b)) ?? ""));
    c(a.j.get(d));
  }
  function nB(a, b) {
    lB(a, b, (c) => {
      c.j = !0;
    });
  }
  function oB(a, b) {
    lB(a, b, (c) => {
      c.l = !0;
    });
  }
  function pB(a, b) {
    lB(a, b, (c) => {
      c.A = !0;
    });
    a.K.push(b.W);
  }
  function qB(a, b, c) {
    lB(a, b, (d) => {
      d.bb = c;
    });
  }
  function rB(a, b, c) {
    const d = [];
    let e = 0;
    for (const f of c.filter(b))
      TA(f.bb ?? "") ? ++e : ((b = a.l.get(f.bb ?? "", null)), d.push(b));
    return { list: d.sort((f, g) => (f ?? -1) - (g ?? -1)), cb: e };
  }
  function sB(a, b) {
    $A(b, a.l.vb());
    var c = Fm(a.j).filter((f) => 0 === (f.Ma.startsWith(RA) ? 0 : 1)),
      d = Fm(a.j).filter((f) => 1 === (f.Ma.startsWith(RA) ? 0 : 1)),
      e = rB(a, (f) => f.j, c);
    dB(b, e.list, e.cb);
    e = rB(a, (f) => f.j, d);
    eB(b, e.list, e.cb);
    e = rB(a, (f) => f.l, c);
    fB(b, e.list, e.cb);
    e = rB(a, (f) => f.l, d);
    gB(b, e.list, e.cb);
    c = rB(a, (f) => f.A, c);
    hB(b, c.list, c.cb);
    d = rB(a, (f) => f.A, d);
    iB(b, d.list, d.cb);
    jB(
      b,
      a.K.map((f) => a.j.get(f)?.bb).map((f) => a.l.get(f) ?? null)
    );
  }
  function ak() {
    var a = O(tB);
    if (!a.C) return Oj();
    const b = Xj(
      Wj(
        Vj(
          Uj(
            Tj(
              Sj(Rj(Qj(Nj(Mj(new Pj(), a.C ?? []), a.J ?? []), a.D), a.G), a.I),
              a.M
            ),
            a.N
          ),
          a.F ?? 0
        ),
        Fm(a.j).map((c) => {
          var d = new Lj();
          d = w(d, 1, c.Ma);
          var e = a.l.get(c.bb ?? "", -1);
          d = w(d, 2, e);
          d = w(d, 3, c.j);
          return w(d, 4, c.l);
        })
      ),
      a.K.map((c) => a.j.get(c)?.bb).map((c) => a.l.get(c) ?? null)
    );
    null != a.A && w(b, 6, a.A);
    null != a.B && w(b, 13, a.B);
    return b;
  }
  var tB = class {
    constructor() {
      this.B = this.J = this.C = null;
      this.I = this.G = !1;
      this.A = null;
      this.N = this.D = this.M = !1;
      this.F = null;
      this.l = new Gm();
      this.j = new Gm();
      this.K = [];
    }
  };
  class mB {
    constructor(a) {
      this.A = this.l = this.j = !1;
      this.bb = null;
      this.Ma = a;
    }
  }
  class uB {
    constructor(a = 0) {
      this.j = a;
    }
  }
  class vB {
    constructor(a) {
      this.l = a;
      this.j = -1;
    }
  }
  function wB(a) {
    let b = 0;
    for (; a; )
      (!b || a.previousElementSibling || a.nextElementSibling) && b++,
        (a = a.parentElement);
    return b;
  }
  function xB(a, b) {
    const c = a.J.filter((d) =>
      Em(d.Nb).every((e) => d.Nb.get(e) === b.get(e))
    );
    return 0 === c.length
      ? (a.l.push(19), null)
      : c.reduce((d, e) => (d.Nb.vb() > e.Nb.vb() ? d : e), c[0]);
  }
  function yB(a, b) {
    b = qt(b);
    if (null == b.j) return a.l.push(18), null;
    b = b.j.value;
    if (Cm(a.A, b)) return a.A.get(b);
    var c = bo(b);
    c = xB(a, c);
    a.A.set(b, c);
    return c;
  }
  var zB = class {
    constructor(a) {
      this.j = a;
      this.A = new Gm();
      this.J = (z(a, mp, 2)?.j() || []).map((b) => ({
        Nb: bo(B(b, 1)),
        Zd: vd(b, 2),
        Ma: B(b, 1),
      }));
      this.l = [];
    }
    I() {
      const a = O(tB);
      var b = this.D();
      a.C = b;
      b = this.C();
      a.J = b;
      b = this.B();
      null != b && (a.B = b);
      b = !!this.j.B()?.j()?.j();
      a.I = b;
      b = new Gm();
      for (const c of z(this.j, mp, 2)?.j() ?? []) b.set(B(c, 1), vd(c, 2));
      a.l = b;
    }
    F() {
      return [...this.l];
    }
    D() {
      return [...this.j.j()];
    }
    C() {
      return [...dd(this.j, 4)];
    }
    B() {
      return z(this.j, qp, 5)?.j() ?? null;
    }
    G(a) {
      const b = yB(this, a);
      null != b?.Ma && qB(O(tB), a, b.Ma);
    }
    K(a) {
      const b = V(oq) || 0;
      if (0 == a.length || 0 == b) return !0;
      const c = new Nn(a).filter((d) => {
        d = yB(this, d)?.Ma || "";
        return "" != d && !(d === RA || d === SA);
      });
      return b <= c.j.length / a.length;
    }
  };
  function AB(a, b) {
    return 0 == b.j.length
      ? b
      : b.sort(
          (c, d) =>
            (yB(a.j, c)?.Zd || Number.MAX_VALUE) -
            (yB(a.j, d)?.Zd || Number.MAX_VALUE)
        );
  }
  function BB(a, b) {
    var c = b.aa.j,
      d = Math,
      e = d.min;
    const f = b.Y(),
      g = b.W.j();
    c += 200 * e.call(d, 20, 0 == g || 3 == g ? wB(f.parentElement) : wB(f));
    d = a.A;
    0 > d.j && (d.j = P(d.l).scrollHeight || 0);
    d = d.j - b.aa.j;
    c += 1e3 < d ? 0 : 2 * (1e3 - d);
    a = a.l;
    b = b.Y();
    return (
      c +
      ("string" === typeof b.className &&
      0 <= b.className.indexOf("adsbygoogle-ablated-ad-slot")
        ? a.j
        : 0)
    );
  }
  function CB(a, b) {
    return 0 == b.j.length ? b : b.sort((c, d) => BB(a, c) - BB(a, d));
  }
  function DB(a, b) {
    return b.sort((c, d) => {
      const e = c.W.G,
        f = d.W.G;
      var g;
      null == e || null == f
        ? (g =
            null == e && null == f ? BB(a, c) - BB(a, d) : null == e ? 1 : -1)
        : (g = e - f);
      return g;
    });
  }
  class EB {
    constructor(a, b = 0, c = null) {
      this.A = new vB(a);
      this.l = new uB(b);
      this.j = c && new zB(c);
    }
  }
  function FB(a, b, c = 0) {
    var d = a.l;
    for (var e of b.B) d = Mn(d, e.ja(a.A), GB(e.ka(), c));
    e = d = d.apply(Pu(a.A));
    for (const f of b.l) e = Mn(e, f.ja(a.A), HB(f.ka(), c));
    switch (b.A) {
      case 1:
        e = CB(a.j, e);
        break;
      case 2:
        e = DB(a.j, e);
        break;
      case 3:
        const f = O(tB);
        e = AB(a.j, e);
        d.forEach((g) => {
          nB(f, g);
          a.j.j?.G(g);
        });
        e.forEach((g) => oB(f, g));
    }
    b.C &&
      (e = On(
        e,
        tg(a.A.location.href + a.A.localStorage.google_experiment_mod)
      ));
    1 === b.j?.length && UA(a.B, b.j[0], { Ee: d.j.length, Xf: e.j.length });
    return e.j.slice(0);
  }
  class IB {
    constructor(a, b, c = 0, d = null) {
      this.l = new Nn(a);
      this.j = new EB(b, c, d);
      this.A = b;
      this.B = new VA();
    }
    C() {
      this.l.forEach((a) => {
        a.l && Or(a.l);
        a.l = null;
      });
    }
  }
  const GB = (a, b) => (c) => ht(c, b, a),
    HB = (a, b) => (c) => ht(c.W, b, a);
  function JB(a, b, c, d) {
    a: {
      switch (b) {
        case 0:
          a = KB(LB(c), a);
          break a;
        case 3:
          a = KB(c, a);
          break a;
        case 2:
          var e = c.lastChild;
          a = KB(e ? (1 == e.nodeType ? e : LB(e)) : null, a);
          break a;
      }
      a = !1;
    }
    if ((d = !a && !(!d && 2 == b && !MB(c))))
      (b = 1 == b || 2 == b ? c : c.parentNode),
        (d = !(b && !Op(b) && 0 >= b.offsetWidth));
    return d;
  }
  function KB(a, b) {
    if (!a) return !1;
    a = Yg(a, b);
    if (!a) return !1;
    a = a.cssFloat || a.styleFloat;
    return "left" == a || "right" == a;
  }
  function LB(a) {
    for (a = a.previousSibling; a && 1 != a.nodeType; ) a = a.previousSibling;
    return a ? a : null;
  }
  function MB(a) {
    return !!a.nextSibling || (!!a.parentNode && MB(a.parentNode));
  }
  var NB = !Ob && !pb();
  function OB(a) {
    if (/-[a-z]/.test("adFormat")) return null;
    if (NB && a.dataset) {
      if (rb() && !("adFormat" in a.dataset)) return null;
      a = a.dataset.adFormat;
      return void 0 === a ? null : a;
    }
    return a.getAttribute(
      "data-" + "adFormat".replace(/([A-Z])/g, "-$1").toLowerCase()
    );
  }
  var PB = (a, b, c) => {
      if (!b) return null;
      const d = Fg(document, "INS");
      d.id = "google_pedestal_container";
      d.style.width = "100%";
      d.style.zIndex = "-1";
      if (c) {
        var e = a.getComputedStyle(c),
          f = "";
        if (e && "static" != e.position) {
          var g = c.parentNode.lastElementChild;
          for (f = e.position; g && g != c; ) {
            if ("none" != a.getComputedStyle(g).display) {
              f = a.getComputedStyle(g).position;
              break;
            }
            g = g.previousElementSibling;
          }
        }
        if ((c = f)) d.style.position = c;
      }
      b.appendChild(d);
      if (d) {
        var h = a.document;
        f = h.createElement("div");
        f.style.width = "100%";
        f.style.height = "2000px";
        c = P(a).clientHeight;
        e = h.body.scrollHeight;
        a = a.innerHeight;
        g = h.body.getBoundingClientRect().bottom;
        d.appendChild(f);
        var k = f.getBoundingClientRect().top;
        h = h.body.getBoundingClientRect().top;
        d.removeChild(f);
        f = e;
        e <= a && 0 < c && 0 < g && (f = g - h);
        a = k - h >= 0.8 * f;
      } else a = !1;
      return a ? d : (b.removeChild(d), null);
    },
    QB = (a) => {
      const b = a.document.body;
      var c = PB(a, b, null);
      if (c) return c;
      if (a.document.body) {
        c = Math.floor(a.document.body.getBoundingClientRect().width);
        for (
          var d = [{ element: a.document.body, depth: 0, height: 0 }],
            e = -1,
            f = null;
          0 < d.length;

        ) {
          const h = d.pop(),
            k = h.element;
          var g = h.height;
          0 < h.depth && g > e && ((e = g), (f = k));
          if (5 > h.depth)
            for (let l = 0; l < k.children.length; l++) {
              const m = k.children[l];
              g = c;
              const n = m.getBoundingClientRect().width;
              (null == n || null == g ? 0 : n >= 0.9 * g && n <= 1.01 * g) &&
                d.push({
                  element: m,
                  depth: h.depth + 1,
                  height: m.getBoundingClientRect().height,
                });
            }
        }
        c = f;
      } else c = null;
      return c ? PB(a, c.parentNode || b, c) : null;
    },
    SB = (a) => {
      let b = 0;
      try {
        (b |= a != a.top ? 512 : 0),
          Pg() || (b |= 1048576),
          1200 >= Math.floor(a.document.body.getBoundingClientRect().width) ||
            (b |= 32768),
          RB(a) && (b |= 33554432);
      } catch (c) {
        b |= 32;
      }
      return b;
    },
    RB = (a) => {
      a = a.document.getElementsByClassName("adsbygoogle");
      for (let b = 0; b < a.length; b++)
        if ("autorelaxed" == OB(a[b])) return !0;
      return !1;
    };
  function TB(a) {
    const b = nm(a, !0),
      c = P(a).scrollWidth,
      d = P(a).scrollHeight;
    let e = "unknown";
    a && a.document && a.document.readyState && (e = a.document.readyState);
    var f = sm(a);
    const g = [];
    var h = [];
    const k = [],
      l = [];
    var m = [],
      n = [],
      q = [];
    let r = 0,
      y = 0,
      E = Infinity,
      D = Infinity,
      C = null;
    var G = nu({ Xa: !1 }, a);
    for (var K of G) {
      G = K.getBoundingClientRect();
      const ta = b - (G.bottom + f);
      var H = void 0,
        I = void 0;
      if (K.className && gb(K.className, "adsbygoogle-ablated-ad-slot")) {
        H = K.getAttribute("google_element_uid");
        I = a.google_sv_map;
        if (!H || !I || !I[H]) continue;
        H = (I = Ji(I[H])) ? I.height : 0;
        I = I ? I.width : 0;
      } else if (
        ((H = G.bottom - G.top), (I = G.right - G.left), 1 >= H || 1 >= I)
      )
        continue;
      g.push(H);
      k.push(I);
      l.push(H * I);
      K.className && gb(K.className, "google-auto-placed")
        ? ((y += 1),
          K.className && gb(K.className, "pedestal_container") && (C = H))
        : ((E = Math.min(E, ta)),
          n.push(G),
          (r += 1),
          h.push(H),
          m.push(H * I));
      D = Math.min(D, ta);
      q.push(G);
    }
    E = Infinity === E ? null : E;
    D = Infinity === D ? null : D;
    f = UB(n);
    q = UB(q);
    h = VB(b, h);
    n = VB(b, g);
    m = VB(b * c, m);
    K = VB(b * c, l);
    return new WB(a, {
      Ue: e,
      Nc: b,
      Af: c,
      zf: d,
      rf: r,
      De: y,
      Ge: XB(g),
      He: XB(k),
      Fe: XB(l),
      vf: f,
      uf: q,
      tf: E,
      sf: D,
      zc: h,
      yc: n,
      ze: m,
      ye: K,
      Bf: C,
    });
  }
  function YB(a, b, c, d) {
    const e = Pg() && !(900 <= P(a.l).clientWidth);
    d = vb(d, (f) => Ab(a.A, f)).join(",");
    return {
      wpc: b,
      su: c,
      eid: d,
      doc: a.j.Ue,
      pg_h: ZB(a.j.Nc),
      pg_w: ZB(a.j.Af),
      pg_hs: ZB(a.j.zf),
      c: ZB(a.j.rf),
      aa_c: ZB(a.j.De),
      av_h: ZB(a.j.Ge),
      av_w: ZB(a.j.He),
      av_a: ZB(a.j.Fe),
      s: ZB(a.j.vf),
      all_s: ZB(a.j.uf),
      b: ZB(a.j.tf),
      all_b: ZB(a.j.sf),
      d: ZB(a.j.zc),
      all_d: ZB(a.j.yc),
      ard: ZB(a.j.ze),
      all_ard: ZB(a.j.ye),
      pd_h: ZB(a.j.Bf),
      dt: e ? "m" : "d",
    };
  }
  class WB {
    constructor(a, b) {
      this.l = a;
      this.j = b;
      this.A =
        "633794002 633794005 21066126 21066127 21065713 21065714 21065715 21065716 42530887 42530888 42530889 42530890 42530891 42530892 42530893".split(
          " "
        );
    }
  }
  function XB(a) {
    return (
      ng.apply(
        null,
        vb(a, (b) => 0 < b)
      ) || null
    );
  }
  function VB(a, b) {
    return 0 >= a ? null : mg.apply(null, b) / a;
  }
  function UB(a) {
    let b = Infinity;
    for (let e = 0; e < a.length - 1; e++)
      for (let f = e + 1; f < a.length; f++) {
        var c = a[e],
          d = a[f];
        c = Math.max(
          Math.max(0, c.left - d.right, d.left - c.right),
          Math.max(0, c.top - d.bottom, d.top - c.bottom)
        );
        0 < c && (b = Math.min(c, b));
      }
    return Infinity !== b ? b : null;
  }
  function ZB(a) {
    return null == a ? null : Number.isInteger(a) ? a.toString() : a.toFixed(3);
  }
  function $B(a, b) {
    b = (P(b).clientHeight || 0) - sm(b);
    let c = 0;
    for (let d = 0; d < a.length; d++) {
      const e = a[d].getBoundingClientRect();
      vu(e) && e.top <= b && (c += 1);
    }
    return c;
  }
  function aC(a) {
    const b = {};
    var c = pu({ Xa: !1, Qb: !1, Rb: !1, Sb: !1 }, a)
      .map((d) => d.getBoundingClientRect())
      .filter(vu);
    b.Yc = c.length;
    c = qu({ Rb: !0 }, a)
      .map((d) => d.getBoundingClientRect())
      .filter(vu);
    b.wd = c.length;
    c = qu({ Sb: !0 }, a)
      .map((d) => d.getBoundingClientRect())
      .filter(vu);
    b.Rd = c.length;
    c = qu({ Qb: !0 }, a)
      .map((d) => d.getBoundingClientRect())
      .filter(vu);
    b.gd = c.length;
    c = (P(a).clientHeight || 0) - sm(a);
    c = pu({ Xa: !1 }, a)
      .map((d) => d.getBoundingClientRect())
      .filter(vu)
      .filter(Ka(bC, null, c));
    b.Zc = c.length;
    a = TB(a);
    c = null != a.j.zc ? a.j.zc : null;
    null != c && (b.Nd = c);
    a = null != a.j.yc ? a.j.yc : null;
    null != a && (b.bd = a);
    return b;
  }
  function iA(a, b, { Yb: c, tc: d, wc: e } = {}) {
    return ws(997, () => cC(a, b, { Yb: c, tc: d, wc: e }), a.j);
  }
  function jA(a, b, c, d) {
    var e = c.Ra ? c.Ra : a.D;
    const f = $t(e, b.j.length);
    e = a.A.cd ? e.j : void 0;
    const g = OA(
      PA(
        LA(
          NA(
            MA(
              KA(IA(JA(GA(HA(EA(c.types), a.R), c.Pc || []), a.N), c.Mf || [])),
              f.ac || void 0,
              e,
              b
            ),
            c.minWidth,
            c.maxWidth
          )
        ),
        f.eb || void 0
      )
    );
    a.M && g.j.push(new sA(a.M));
    b = 1;
    a.A.Wc ? (b = 2) : a.Ga() && (b = 3);
    QA(g, b);
    a.A.Rc && (g.B = !0);
    return ws(995, () => FB(a.l, g.build(), d), a.j);
  }
  function lA(a, b) {
    const c = QB(a.j);
    if (c) {
      const d = ko(a.J, b),
        e = ls(a.j.document, a.F, null, null, {}, d);
      e && (Rr(e.Va, c, 2, 256), ws(996, () => dC(a, e, d), a.j));
    }
  }
  function eC(a) {
    return a.G ? a.G : (a.G = a.j.google_ama_state);
  }
  function cC(a, b, { Yb: c, tc: d, wc: e } = {}) {
    const f = b.W;
    if (f.C) return !1;
    var g = b.Y();
    if (!JB(a.j, f.j(), g, a.B)) return !1;
    c = null == c ? null : new lo(null, { google_max_responsive_height: c });
    g = mo(v(f.mc, 2) || 0);
    const h = no(f.G),
      k = fC(a, f),
      l = gC(a),
      m = ko(a.J, f.N ? f.N.j(b.aa) : null, c, d || null, g, h, k, l),
      n = b.fill(a.F, m);
    if ((e && !hC(a, n, m)) || !ws(996, () => dC(a, n, m), a.j)) return !1;
    Yl(9, [f.G, f.Ya]);
    a.Ga() && pB(O(tB), b);
    return !0;
  }
  function fC(a, b) {
    return Un(
      Wn(ot(b).map(oo), () => {
        a.C.push(18);
      })
    );
  }
  function gC(a) {
    if (!a.Ga()) return null;
    var b = a.l.j.j?.C();
    if (null == b) return null;
    b = b.join("~");
    a = a.l.j.j?.B() ?? null;
    return po({ Re: b, We: a });
  }
  function hC(a, b, c) {
    if (!b) return !1;
    var d = b.wa,
      e = d.style.width;
    d.style.width = "100%";
    var f = d.offsetWidth;
    d.style.width = e;
    d = a.j;
    e = b.wa;
    c = (c && c.wb()) || {};
    if (d !== d.top) var g = Vg(d) ? 3 : 16;
    else if (488 > P(d).clientWidth)
      if (d.innerHeight >= d.innerWidth)
        if (((g = P(d).clientWidth), !g || 0.3 < (g - f) / g)) g = 6;
        else {
          if ((g = "true" != c.google_full_width_responsive))
            b: {
              var h = e.parentElement;
              for (g = P(d).clientWidth; h; h = h.parentElement) {
                const k = Yg(h, d);
                if (!k) continue;
                const l = ih(k.width);
                if (l && !(l >= g) && "visible" != k.overflow) {
                  g = !0;
                  break b;
                }
              }
              g = !1;
            }
          g = g ? 7 : !0;
        }
      else g = 5;
    else g = 4;
    if (!0 !== g) f = g;
    else {
      if (!(c = "true" == c.google_full_width_responsive))
        a: {
          do
            if ((c = Yg(e, d)) && "fixed" == c.position) {
              c = !1;
              break a;
            }
          while ((e = e.parentElement));
          c = !0;
        }
      c
        ? ((d = P(d).clientWidth),
          (f = d - f),
          (f = d && 0 <= f ? !0 : d ? (-10 > f ? 11 : 0 > f ? 14 : 12) : 10))
        : (f = 9);
    }
    if (f) {
      a = a.j;
      b = b.wa;
      if ((f = hs(a, b)))
        (b.style.border =
          b.style.borderStyle =
          b.style.outline =
          b.style.outlineStyle =
          b.style.transition =
            "none"),
          (b.style.borderSpacing = b.style.padding = "0"),
          fs(b, f, "0px"),
          (b.style.width = P(a).clientWidth + "px"),
          is(a, b, f),
          (b.style.zIndex = 30);
      return !0;
    }
    Or(b.Va);
    return !1;
  }
  function dC(a, b, c) {
    if (!b) return !1;
    try {
      ps(a.j, b.wa, c);
    } catch (d) {
      return Or(b.Va), a.C.push(6), !1;
    }
    return !0;
  }
  class iC {
    constructor(a, b, c, d, e = {}, f = []) {
      this.l = a;
      this.F = b;
      this.j = c;
      this.D = d.Ra;
      this.R = d.sb || [];
      this.J = d.Xe || null;
      this.N = d.Te || [];
      this.M = d.uc || [];
      this.A = e;
      this.B = !1;
      this.K = [];
      this.C = [];
      this.I = this.G = void 0;
      this.ba = f;
    }
    V() {
      return this.l;
    }
    T() {
      return this.j;
    }
    qa(a) {
      this.K.push(a);
    }
    Ga() {
      if (0 == (this.l.j.j?.D().length ?? 0)) return !1;
      if (0 == (V(oq) || 0)) return !0;
      if (void 0 === this.I) {
        const a = QA(LA(KA(EA([0, 1, 2]))), 1).build(),
          b = ws(995, () => FB(this.l, a), this.j);
        this.I = this.l.j.j?.K(b) || !1;
      }
      return this.I;
    }
    Hc() {
      return !!this.A.de;
    }
    Wb() {
      return !RB(this.j);
    }
  }
  const bC = (a, b) => b.top <= a;
  function jC(a, b, c, d, e, f = 0, g = 0) {
    this.Aa = a;
    this.kc = f;
    this.jc = g;
    this.errors = b;
    this.Pa = c;
    this.j = d;
    this.l = e;
  }
  var kC = (a, { Wb: b = !1, Hc: c = !1, Qf: d = !1, Ga: e = !1 } = {}) => {
    const f = [];
    d && f.push(9);
    if (e) {
      a.includes(4) && !c && b && f.push(8);
      a.includes(1) && f.push(1);
      d = a.includes(3);
      e = a.includes(2) && !U(bq);
      const g = a.includes(1);
      (d || e || g) && f.push(10);
    } else
      a.includes(3) && f.push(6),
        a.includes(4) && !c && b && f.push(8),
        a.includes(1) && f.push(1, 5),
        a.includes(2) && !U(bq) && f.push(7);
    a.includes(4) && c && b && f.push(8);
    return f;
  };
  function lC(a, b, c) {
    a = kC(a, { Wb: b.Wb(), Hc: b.Hc(), Qf: !!b.A.Dc, Ga: b.Ga() });
    return new mC(a, b, c);
  }
  function nC(a, b) {
    const c = fA[b];
    return c ? ws(998, () => c(a.j), a.C) : (a.j.qa(12), !0);
  }
  function oC(a, b) {
    return new Promise((c) => {
      setTimeout(() => {
        c(nC(a, b));
      });
    });
  }
  function pC(a) {
    a.j.B = !0;
    return Promise.all(a.l.map((b) => oC(a, b))).then((b) => {
      b.includes(!1) && a.j.qa(5);
      a.l.splice(0, a.l.length);
    });
  }
  function qC(a) {
    var b = a.j.l.l.filter(ct).j.length,
      c = a.j.K.slice(0);
    var d = a.j;
    d = [...d.C, ...(d.l.j.j?.F() || [])];
    return new jC(
      b,
      c,
      d,
      a.j.l.l.j.length,
      a.j.l.B.j,
      a.j.l.l.filter(ct).filter(dt).j.length,
      a.j.l.l.filter(dt).j.length
    );
  }
  class mC {
    constructor(a, b, c) {
      this.B = a.slice(0);
      this.l = a.slice(0);
      this.A = Bb(this.l, 1);
      this.j = b;
      this.C = c;
    }
  }
  const rC = class {
    constructor(a) {
      this.j = a;
      this.exception = void 0;
    }
  };
  function sC(a) {
    return pC(a).then(() => new rC(qC(a)));
  }
  class tC {
    j() {
      return new lo([], {
        google_reactive_ad_format: 40,
        google_tag_origin: "qs",
      });
    }
  }
  class uC {
    j() {
      return new lo(["adsbygoogle-resurrected-ad-slot"], {});
    }
  }
  function vC(a) {
    return Pp(a.j.document).map((b) => {
      const c = new xt(b, 3);
      b = new Ys(rs(a.j, b));
      return new bt(c, b, a.l, !1, 0, [], null, a.j, null);
    });
  }
  class wC {
    constructor(a) {
      var b = new uC();
      this.j = a;
      this.l = b || null;
    }
  }
  const xC = { Vc: "10px", vc: "10px" };
  function yC(a) {
    return Bm(a.j.document.querySelectorAll("INS.adsbygoogle-placeholder")).map(
      (b) => new bt(new xt(b, 1), new Ws(xC), a.l, !1, 0, [], null, a.j, null)
    );
  }
  class zC {
    constructor(a, b) {
      this.j = a;
      this.l = b || null;
    }
  }
  function AC(a, b) {
    return null == a
      ? b + "ShouldNotBeNull"
      : 0 == a
      ? b + "ShouldNotBeZero"
      : -1 > a
      ? b + "ShouldNotBeLessMinusOne"
      : null;
  }
  function BC(a, b, c) {
    const d =
      AC(c.Ob, "gapsMeasurementWindow") ||
      AC(c.ub, "gapsPerMeasurementWindow") ||
      AC(c.zb, "maxGapsToReport");
    return null != d
      ? Sn(d)
      : c.ed || -1 != c.ub || -1 != c.zb
      ? Qn(new CC(a, b, c))
      : Sn("ShouldHaveLimits");
  }
  function DC(a) {
    return (eC(a.A) && eC(a.A).placed) || [];
  }
  function EC(a) {
    return DC(a).map((b) => Cn(An(b.element, a.j)));
  }
  function FC(a) {
    return DC(a).map((b) => b.index);
  }
  function GC(a, b) {
    const c = b.W;
    return !a.D && c.B && $c(c.B, 8) && 1 == v(c.B, 8)
      ? []
      : c.C
      ? (c.R || []).map((d) => Cn(An(d, a.j)))
      : [Cn(new Bn(b.aa.j, 0))];
  }
  function HC(a) {
    a.sort((e, f) => e.j - f.j);
    const b = [];
    let c = 0;
    for (let e = 0; e < a.length; ++e) {
      var d = a[e];
      let f = d.j;
      d = d.j + d.l;
      f <= c ? (c = Math.max(c, d)) : (b.push(new Bn(c, f - c)), (c = d));
    }
    return b;
  }
  function IC(a, b) {
    b = b.map((c) => {
      var d = new Sz();
      d = w(d, 1, c.j);
      c = c.getHeight();
      return w(d, 2, c);
    });
    return Pz(Oz(new Rz(), a), b);
  }
  function JC(a) {
    const b = A(a, Sz, 2).map((c) => `G${ud(c, 1)}~${c.getHeight()}`);
    return `W${ud(a, 1)}${b.join("")}`;
  }
  function KC(a, b) {
    const c = [];
    let d = 0;
    for (const e of Em(b)) {
      const f = b.get(e);
      f.sort((g, h) => h.getHeight() - g.getHeight());
      a.I || f.splice(a.C, f.length);
      !a.F && d + f.length > a.l && f.splice(a.l - d, f.length);
      c.push(IC(e, f));
      d += f.length;
      if (!a.F && d >= a.l) break;
    }
    return c;
  }
  function LC(a) {
    const b = A(a, Rz, 5).map((c) => JC(c));
    return `M${ud(a, 1)}H${ud(a, 2)}C${ud(a, 3)}B${Number(!!F(a, 4))}${b.join(
      ""
    )}`;
  }
  function MC(a) {
    var b = Gt(a.A.l.l.j.slice(0), a.j),
      c = EC(a),
      d = new Hm(FC(a));
    for (var e = 0; e < b.length; ++e)
      if (!d.contains(e)) {
        var f = GC(a, b[e]);
        c.push(...f);
      }
    c.push(new Bn(0, 0));
    c.push(Cn(new Bn(P(a.j).scrollHeight, 0)));
    b = HC(c);
    c = new Gm();
    for (d = 0; d < b.length; ++d)
      (e = b[d]),
        (f = a.G ? 0 : Math.floor(e.j / a.B)),
        Cm(c, f) || c.set(f, []),
        c.get(f).push(e);
    b = KC(a, c);
    c = new Nz();
    c = w(c, 1, a.l);
    c = w(c, 2, a.B);
    c = w(c, 3, a.C);
    a = w(c, 4, a.D);
    return rd(a, 5, b);
  }
  function NC(a) {
    a = MC(a);
    return LC(a);
  }
  var CC = class {
    constructor(a, b, c) {
      this.G = -1 == c.Ob;
      this.B = c.Ob;
      this.I = -1 == c.ub;
      this.C = c.ub;
      this.F = -1 == c.zb;
      this.l = c.zb;
      this.D = c.Kd;
      this.A = b;
      this.j = a;
    }
  };
  const OC = (a) => {
      const b = /[a-zA-Z0-9._~-]/,
        c = /%[89a-zA-Z]./;
      return a.replace(/(%[a-zA-Z0-9]{2})/g, function (d) {
        if (!d.match(c)) {
          const e = decodeURIComponent(d);
          if (e.match(b)) return e;
        }
        return d.toUpperCase();
      });
    },
    PC = (a) => {
      let b = "";
      const c = /[/%?&=]/;
      for (let d = 0; d < a.length; ++d) {
        const e = a[d];
        b = e.match(c) ? b + e : b + encodeURIComponent(e);
      }
      return b;
    };
  var QC = (a, b) => {
    a = dd(a, 2);
    if (!a) return !1;
    for (let c = 0; c < a.length; c++) if (a[c] == b) return !0;
    return !1;
  };
  const SC = (a, b) => {
      a = PC(OC(a.location.pathname)).replace(/(^\/)|(\/$)/g, "");
      const c = bh(a),
        d = RC(a);
      return (
        b.find((e) => {
          const f = ad(e, Bp, 7) ? v(z(e, Bp, 7), 1) : v(e, 1);
          e = ad(e, Bp, 7) ? v(z(e, Bp, 7), 2) : 2;
          if ("number" !== typeof f) return !1;
          switch (e) {
            case 1:
              return f == c;
            case 2:
              return d[f] || !1;
          }
          return !1;
        }) || null
      );
    },
    RC = (a) => {
      const b = {};
      for (;;) {
        b[bh(a)] = !0;
        if (!a) return b;
        a = a.substring(0, a.lastIndexOf("/"));
      }
    };
  const TC = { google_ad_channel: !0, google_ad_host: !0 };
  var UC = (a, b) => {
      a.location.href &&
        a.location.href.substring &&
        (b.url = a.location.href.substring(0, 200));
      Al("ama", b, 0.01);
    },
    VC = (a) => {
      const b = {};
      $g(TC, (c, d) => {
        d in a && (b[d] = a[d]);
      });
      return b;
    };
  var WC = (a) => {
    try {
      try {
        a.localStorage.removeItem("google_ama_config");
      } catch (b) {
        UC(a, { lserr: 1 });
      }
    } catch (b) {
      UC(a, { lserr: 1 });
    }
  };
  function XC(a) {
    a.google_ad_modifications || (a.google_ad_modifications = {});
    return a.google_ad_modifications;
  }
  function YC(a, b) {
    a = XC(a);
    a.processed_sra_frame_pingbacks = a.processed_sra_frame_pingbacks || {};
    const c = !a.processed_sra_frame_pingbacks[b];
    a.processed_sra_frame_pingbacks[b] = !0;
    return c;
  }
  function ZC() {
    if ($C) return $C;
    const a = fi() || window,
      b = a.google_persistent_state_async;
    return null != b &&
      "object" == typeof b &&
      null != b.S &&
      "object" == typeof b.S
      ? ($C = b)
      : (a.google_persistent_state_async = $C = new aD());
  }
  function bD(a, b, c) {
    b = cD[b] || "google_ps_" + b;
    a = a.S;
    const d = a[b];
    return void 0 === d ? ((a[b] = c()), a[b]) : d;
  }
  function dD(a, b, c) {
    return bD(a, b, () => c);
  }
  function eD(a, b, c) {
    return (a.S[cD[b] || "google_ps_" + b] = c);
  }
  function fD(a, b) {
    return eD(a, b, dD(a, b, 0) + 1);
  }
  function gD() {
    var a = ZC();
    return dD(a, 20, {});
  }
  function hD() {
    var a = ZC();
    const b = dD(a, 31, !1);
    b || eD(a, 31, !0);
    return !b;
  }
  function iD() {
    var a = ZC();
    return dD(a, 26);
  }
  function jD() {
    var a = ZC();
    return dD(a, 28, []);
  }
  function kD(a) {
    return !!dD(ZC(), 30, a);
  }
  class aD {
    constructor() {
      this.S = {};
    }
  }
  var $C = null;
  const cD = {
    [8]: "google_prev_ad_formats_by_region",
    [9]: "google_prev_ad_slotnames_by_region",
  };
  var lD = {
      google_ad_block: "ad_block",
      google_ad_client: "client",
      google_ad_output: "output",
      google_ad_callback: "callback",
      google_ad_height: "h",
      google_ad_resize: "twa",
      google_ad_slot: "slotname",
      google_ad_unit_key: "adk",
      google_ad_dom_fingerprint: "adf",
      google_placement_id: "pi",
      google_daaos_ts: "daaos",
      google_erank: "epr",
      google_ad_width: "w",
      google_captcha_token: "captok",
      google_content_recommendation_columns_num: "cr_col",
      google_content_recommendation_rows_num: "cr_row",
      google_ctr_threshold: "ctr_t",
      google_cust_criteria: "cust_params",
      gfwrnwer: "fwrn",
      gfwrnher: "fwrnh",
      google_image_size: "image_size",
      google_last_modified_time: "lmt",
      google_loeid: "loeid",
      google_max_num_ads: "num_ads",
      google_max_radlink_len: "max_radlink_len",
      google_mtl: "mtl",
      google_native_settings_key: "nsk",
      google_enable_content_recommendations: "ecr",
      google_num_radlinks: "num_radlinks",
      google_num_radlinks_per_unit: "num_radlinks_per_unit",
      google_pucrd: "pucrd",
      google_reactive_plaf: "plaf",
      google_reactive_plat: "plat",
      google_reactive_fba: "fba",
      google_reactive_sra_channels: "plach",
      google_responsive_auto_format: "rafmt",
      armr: "armr",
      google_plas: "plas",
      google_rl_dest_url: "rl_dest_url",
      google_rl_filtering: "rl_filtering",
      google_rl_mode: "rl_mode",
      google_rt: "rt",
      google_video_play_muted: "vpmute",
      google_source_type: "src_type",
      google_restrict_data_processing: "rdp",
      google_tag_for_child_directed_treatment: "tfcd",
      google_tag_for_under_age_of_consent: "tfua",
      google_tag_origin: "to",
      google_ad_semantic_area: "sem",
      google_tfs: "tfs",
      google_package: "pwprc",
      google_tag_partner: "tp",
      fra: "fpla",
      google_ml_rank: "mlr",
      google_apsail: "psa",
      google_ad_channel: "channel",
      google_ad_type: "ad_type",
      google_ad_format: "format",
      google_color_bg: "color_bg",
      google_color_border: "color_border",
      google_color_link: "color_link",
      google_color_text: "color_text",
      google_color_url: "color_url",
      google_page_url: "url",
      google_allow_expandable_ads: "ea",
      google_ad_section: "region",
      google_cpm: "cpm",
      google_encoding: "oe",
      google_safe: "adsafe",
      google_font_face: "f",
      google_font_size: "fs",
      google_hints: "hints",
      google_ad_host: "host",
      google_ad_host_channel: "h_ch",
      google_ad_host_tier_id: "ht_id",
      google_kw_type: "kw_type",
      google_kw: "kw",
      google_contents: "contents",
      google_targeting: "targeting",
      google_adtest: "adtest",
      google_alternate_color: "alt_color",
      google_alternate_ad_url: "alternate_ad_url",
      google_cust_age: "cust_age",
      google_cust_ch: "cust_ch",
      google_cust_gender: "cust_gender",
      google_cust_interests: "cust_interests",
      google_cust_job: "cust_job",
      google_cust_l: "cust_l",
      google_cust_lh: "cust_lh",
      google_cust_u_url: "cust_u_url",
      google_cust_id: "cust_id",
      google_language: "hl",
      google_city: "gcs",
      google_country: "gl",
      google_region: "gr",
      google_content_recommendation_ad_positions: "ad_pos",
      google_content_recommendation_columns_num: "cr_col",
      google_content_recommendation_rows_num: "cr_row",
      google_content_recommendation_ui_type: "crui",
      google_content_recommendation_use_square_imgs: "cr_sq_img",
      google_color_line: "color_line",
      google_disable_video_autoplay: "disable_video_autoplay",
      google_full_width_responsive_allowed: "fwr",
      google_full_width_responsive: "fwrattr",
      efwr: "efwr",
      google_pgb_reactive: "pra",
      google_resizing_allowed: "rs",
      google_resizing_height: "rh",
      google_resizing_width: "rw",
      rpe: "rpe",
      google_responsive_formats: "resp_fmts",
      google_safe_for_responsive_override: "sfro",
      google_video_doc_id: "video_doc_id",
      google_video_product_type: "video_product_type",
      google_webgl_support: "wgl",
      easpi: "easpi",
      easpa: "easai",
      asntp: "asntp",
      asntpv: "asntpv",
      asntpl: "asntpl",
      asntpm: "asntpm",
      asntpc: "asntpc",
      asna: "asna",
      asnd: "asnd",
      asnp: "asnp",
      asns: "asns",
      asmat: "asmat",
      asptt: "asptt",
      aspe: "aspe",
      asro: "asro",
    },
    mD = (a) =>
      (a = a.innerText || a.innerHTML) &&
      (a = a
        .replace(/^\s+/, "")
        .split(/\r?\n/, 1)[0]
        .match(/^\x3c!--+(.*?)(?:--+>)?\s*$/)) &&
      RegExp("google_ad_client").test(a[1])
        ? a[1]
        : null,
    nD = (a) => {
      if ((a = a.innerText || a.innerHTML))
        if (
          ((a = a.replace(/^\s+|\s+$/g, "").replace(/\s*(\r?\n)+\s*/g, ";")),
          (a =
            a.match(/^\x3c!--+(.*?)(?:--+>)?$/) ||
            a.match(/^\/*\s*<!\[CDATA\[(.*?)(?:\/*\s*\]\]>)?$/i)) &&
            RegExp("google_ad_client").test(a[1]))
        )
          return a[1];
      return null;
    },
    oD = (a) => {
      switch (a) {
        case "true":
          return !0;
        case "false":
          return !1;
        case "null":
          return null;
        case "undefined":
          break;
        default:
          try {
            const b = a.match(/^(?:'(.*)'|"(.*)")$/);
            if (b) return b[1] || b[2] || "";
            if (/^[-+]?\d*(\.\d+)?$/.test(a)) {
              const c = parseFloat(a);
              return c === c ? c : void 0;
            }
          } catch (b) {}
      }
    };
  async function pD(a, b, c) {
    return 0 >= c
      ? Promise.reject()
      : b()
      ? Promise.resolve()
      : new Promise((d, e) => {
          const f = a.setInterval(() => {
            --c ? b() && (a.clearInterval(f), d()) : (a.clearInterval(f), e());
          }, 200);
        });
  }
  function qD(a) {
    const b = a.state.pc;
    return null !== b && 0 !== b ? b : (a.state.pc = yh(a.win));
  }
  function rD(a) {
    var b = a.state.wpc;
    if (null === b || "" === b) {
      b = a.state;
      var c = a.win;
      if (c.google_ad_client) a = String(c.google_ad_client);
      else {
        if (
          null ==
          (a =
            XC(c).head_tag_slot_vars?.google_ad_client ??
            c.document
              .querySelector(".adsbygoogle[data-ad-client]")
              ?.getAttribute("data-ad-client"))
        ) {
          b: {
            a = c.document.getElementsByTagName("script");
            c = (c.navigator && c.navigator.userAgent) || "";
            c =
              RegExp(
                "appbankapppuzdradb|daumapps|fban|fbios|fbav|fb_iab|gsa/|messengerforios|naver|niftyappmobile|nonavigation|pinterest|twitter|ucbrowser|yjnewsapp|youtube",
                "i"
              ).test(c) ||
              (/i(phone|pad|pod)/i.test(c) &&
                /applewebkit/i.test(c) &&
                !/version|safari/i.test(c) &&
                !Hi())
                ? mD
                : nD;
            for (var d = a.length - 1; 0 <= d; d--) {
              var e = a[d];
              if (
                !e.google_parsed_script_for_pub_code &&
                ((e.google_parsed_script_for_pub_code = !0), (e = c(e)))
              ) {
                a = e;
                break b;
              }
            }
            a = null;
          }
          if (a) {
            c = /(google_\w+) *= *(['"]?[\w.-]+['"]?) *(?:;|$)/gm;
            for (d = {}; (e = c.exec(a)); ) d[e[1]] = oD(e[2]);
            a = d;
            a = a.google_ad_client ? a.google_ad_client : "";
          } else a = "";
        }
        a = a ?? "";
      }
      b = b.wpc = a;
    }
    return b;
  }
  function sD(a, b) {
    var c = new dl(),
      d = qD(a);
    c = w(c, 1, d).Na(rD(a));
    c = w(c, 3, a.state.sd);
    return w(c, 7, Math.round(b || a.win.performance.now()));
  }
  async function tD(a, b, c) {
    if (a.j && c.length && !a.state.lgdp.includes(Number(b))) {
      a.state.lgdp.push(Number(b));
      var d = a.win.performance.now();
      await pD(a.win, () => !(!qD(a) || !rD(a)), 10);
      el(a.pa, bl(sD(a, d), pk(ok(new rk(), b), c)));
    }
  }
  function uD(a, b) {
    var c = sD(a);
    b = qd(c, 5, cl, b);
    a.j && !a.state.le.includes(2) && (a.state.le.push(2), el(a.pa, b));
  }
  var vD = class {
    constructor(a) {
      this.win = fi() || window;
      this.pa = a ?? new kl();
      if (U(Sp))
        this.state = bD(ZC(), 33, () => {
          const b = V(Tp);
          return {
            sd: b,
            ssp: 0 < b && Zg() < 1 / b,
            pc: null,
            wpc: null,
            le: [],
            lgdp: [],
          };
        });
      else {
        a = V(Tp);
        const b = kD(0 < a && Zg() < 1 / a);
        this.state = { sd: a, ssp: b, pc: null, wpc: null, le: [], lgdp: [] };
      }
    }
    get j() {
      return this.state.ssp;
    }
  };
  var xD = (a, b, c, d, e, f, g = null, h = null, k) => {
      wD(a, new Ts(a), b, c, d, e, f, g, new En(a), h, k);
    },
    wD = (a, b, c, d, e, f, g, h = null, k = null, l = null, m) => {
      if (c)
        if (d) {
          var n = py(d, e, a.location);
          try {
            const q = new yD(a, b, c, d, e, n, f, g, h, k, l, m);
            ws(990, () => zD(q), a);
          } catch (q) {
            Xl() && Yl(15, [q]),
              Ss(b, Gs, Ps(XA(WA(new YA(0).Na(c), d), n).qa(1), q)),
              uD(O(vD), ek(new nk(), Aj(1)));
          }
        } else Ss(b, Gs, new YA(0).Na(c).qa(8)), uD(O(vD), ek(new nk(), Aj(8)));
      else Ss(b, Gs, new YA(0).qa(9)), uD(O(vD), ek(new nk(), Aj(9)));
    };
  function zD(a) {
    a.F.forEach((b) => {
      switch (b) {
        case 0:
          ws(991, () => AD(a), a.l);
          break;
        case 1:
          fy(new hy(a.l, a.j, a.C));
          break;
        case 5:
          sw(new tw(a.l, a.j));
          break;
        case 2:
          BD(a);
          break;
        case 3:
          CD(a);
          break;
        case 4:
          DD(a);
          break;
        case 6:
          a.runStorify();
      }
    });
  }
  function AD(a) {
    (a.j?.j()?.j() ?? !1) && ED(a, "p", FD(a));
    if (sp(a.j) && 1 === v(sp(a.j), 1)) {
      var b = z(sp(a.j), Dp, 6);
      b && 2 === v(b, 1) && (qs(a.l), (a.I = "b"));
    }
    var c = a.B.Ef;
    b = Xt(a.l, c);
    if (a.B.da && ad(a.B.da, Cp, 10)) {
      var d = ed(z(a.B.da, Cp, 10), 1);
      null !== d && void 0 !== d && (b = Pt(a.l, d, c));
    }
    ad(a.j, Fp, 26) && (b = au(b, z(a.j, Fp, 26), a.l));
    c = a.B.da ? dd(a.B.da, 6) : [];
    d = a.B.da ? A(a.B.da, Oo, 5) : [];
    const e = a.B.da ? dd(a.B.da, 2) : [],
      f = ws(
        993,
        () => {
          var g = a.j,
            h = A(g, bp, 1);
          const k = a.B.da && QC(a.B.da, 1) ? "text_image" : "text";
          var l = new tC();
          let m = at(h, a.l, { Je: l, mf: new Zs(k) });
          h.length != m.length && a.J.push(13);
          m = m.concat(yC(new zC(a.l, l)));
          h = 0;
          l = U(iq);
          var n = !1;
          if (sp(g) && 1 === v(sp(g), 1)) {
            var q = z(sp(g), Dp, 6);
            q && ((h = v(q, 2) || 0), 1 === v(q, 1) && (n = !0));
          }
          q = z(g, jp, 24)?.B()?.j()?.j() || !1;
          if (l || n || q)
            (l = vC(new wC(a.l))),
              (n = O(tB)),
              (m = m.concat(l)),
              (n.M = !0),
              (n.F = l.length),
              "n" === a.I && (a.I = z(g, jp, 24)?.j()?.length ? "o" : "p");
          m = m.concat(Lz(g, k, a.l));
          g = z(g, jp, 24);
          return new IB(m, a.l, h, g);
        },
        a.l
      );
    a.A = new iC(
      f,
      a.C,
      a.l,
      { Ra: b, Xe: a.ba, sb: a.B.sb, Te: c, uc: d },
      GD(a),
      e
    );
    eC(a.A)?.optimization?.ablatingThisPageview &&
      !a.A.Ga() &&
      (qs(a.l), (O(tB).D = !0), (a.I = "f"));
    a.G = lC(e, a.A, a.l);
    U(jq)
      ? ws(992, () => sC(a.G), a.l).then(
          ws(994, () => a.V.bind(a), a.l),
          a.R.bind(a)
        )
      : ws(
          992,
          () => {
            var g = a.G;
            const h = new zm();
            for (g.j.B = !0; 0 < g.l.length; )
              nC(g, g.l[0]) || g.j.qa(5), g.l.shift();
            try {
              h.resolve(new rC(qC(g)));
            } catch (k) {
              (g = k), wm(h), (h.j = 2), (h.A = g), ym(h.l);
            }
            return h.l;
          },
          a.l
        ).then(
          ws(994, () => a.V.bind(a), a.l),
          a.R.bind(a)
        );
  }
  function BD(a) {
    const b = z(a.j, dp, 18);
    b && sz(new tz(a.l, new Kz(a.l, a.C), b, new Gw(a.l), A(a.j, bp, 1)));
  }
  function CD(a) {
    const b = ly(a.l.location, "google_audio_sense") ? qo() : z(a.j, ro, 27);
    if (b) {
      const c = z(a.j, Wo, 6)?.j() || [];
      Vn(
        Ev(
          a.l,
          a.D,
          b,
          c,
          a.va,
          { google_ad_client: a.C },
          z(a.j, To, 22)?.j() || null
        ),
        (d) => Gv(d)
      );
    }
  }
  function DD(a) {
    const b = z(a.j, fp, 29);
    b &&
      HD(a.Da, {
        win: a.l,
        webPropertyCode: a.C,
        Dd: b,
        jd: z(a.j, Wo, 6)?.j() ?? [],
      });
  }
  function GD(a) {
    const b = U(kq);
    if (!a.j.j())
      return {
        Rc: b,
        Wc: !1,
        ud: !1,
        me: !1,
        xd: !1,
        de: !1,
        Cf: 0,
        Xd: 0,
        cd: ID(a),
        Dc: a.N,
      };
    const c = a.j.j();
    return {
      Rc: b || F(c, 14, !1),
      Wc: F(c, 2, !1),
      ud: F(c, 3, !1),
      me: F(c, 4, !1),
      xd: F(c, 5, !1),
      de: F(c, 6, !1),
      Cf: td(ed(c, 8), 0),
      Xd: v(c, 10),
      cd: ID(a),
      Dc: a.N,
    };
  }
  function ID(a) {
    return a.B.da && ad(a.B.da, Cp, 10)
      ? 0.5 <= (ed(z(a.B.da, Cp, 10), 1) || 0)
      : !0;
  }
  function JD(a, b) {
    for (
      var c = Os(Os(new YA(b.Aa), b.errors), a.J), d = b.Pa, e = 0;
      e < d.length;
      e++
    )
      a: {
        for (var f = d[e], g = 0; g < c.D.length; g++) if (c.D[g] == f) break a;
        c.D.push(f);
      }
    c.j.pp = b.jc;
    c.j.ppp = b.kc;
    c.j.ppos = b.placementPositionDiffs;
    c.j.eatf = b.nb;
    c.j.eatfAbg = b.ob;
    c.j.reatf = b.Wa;
    c.j.a = a.G.B.slice(0).join(",");
    c = XA(WA(c, a.j), a.F).Na(a.C);
    if ((d = b.ra))
      (c.j.as_count = d.Yc),
        (c.j.d_count = d.wd),
        (c.j.ng_count = d.Rd),
        (c.j.am_count = d.gd),
        (c.j.atf_count = d.Zc),
        (c.j.mdns = ZA(d.Nd)),
        (c.j.alldns = ZA(d.bd));
    c = c.G(b.gb);
    if ((d = b.Ze)) {
      e = [];
      for (var h of Em(d))
        0 < d.get(h).length &&
          ((f = d.get(h)[0]), e.push("(" + [h, f.Ee, f.Xf].join() + ")"));
      c.j.fd = e.join(",");
    }
    h = b.Nc;
    null != h && (c.j.pgh = h);
    c.j.abl = b.Gd;
    c.j.rr = a.I;
    void 0 !== b.exception && Ps(c, b.exception).qa(1);
    return c;
  }
  function KD(a, b) {
    var c = JD(a, b);
    Ss(
      a.D,
      0 < b.errors.length || 0 < a.J.length || void 0 !== b.exception
        ? 0 < a.M
          ? Is
          : Gs
        : 0 < a.M
        ? Hs
        : Fs,
      c
    );
    if (z(a.j, jp, 24)) {
      a.A.l.j.j?.I();
      b = eC(a.A);
      var d = O(tB);
      d.A = !!b?.optimization?.ablationFromStorage;
      b?.optimization?.ablatingThisPageview && (d.G = !0);
      d.N = !!b?.optimization?.availableAbg;
      b = O(tB);
      c = new kB(c);
      b.C
        ? ((c.l.sl = (b.C ?? []).join("~")),
          (c.l.daaos = (b.J ?? []).join("~")),
          (c.l.ab = aB(b.G)),
          (c.l.rr = aB(b.M)),
          (c.l.oab = aB(b.I)),
          null != b.A && (c.l.sab = aB(b.A)),
          b.D && (c.l.fb = aB(b.D)),
          (c.l.ls = aB(b.N)),
          $A(c, b.l.vb()),
          null != b.F && (c.l.rp = aB(b.F)),
          null != b.B && (c.l.expl = aB(b.B)),
          sB(b, c))
        : ((b = c),
          (d = "irr".replace(RegExp("~", "g"), "")),
          (b.l.e = b.l.e ? b.l.e + ("~" + d) : d));
      Ss(a.D, Ls, c);
    }
  }
  function LD(a, b) {
    const c = O(vD);
    if (c.j) {
      var d = new nk(),
        e = b.Pa.filter((g) => null !== g),
        f = a.J.concat(b.errors, b.exception ? [1] : []).filter(
          (g) => null !== g
        );
      ik(
        gk(
          lk(
            kk(
              jk(
                hk(
                  bk(
                    dk(
                      fk(
                        ck(
                          d,
                          a.G.B.slice(0).map((g) => {
                            var h = new zj();
                            return w(h, 1, g);
                          })
                        ),
                        e.map((g) => {
                          var h = new Cj();
                          return w(h, 1, g);
                        })
                      ),
                      f.map((g) => Aj(g))
                    ),
                    z(a.j, yp, 23)?.j()
                  ),
                  b.Aa
                ).G(b.gb),
                b.Wa
              ),
              b.nb
            ),
            b.ob
          ),
          a.F.map((g) => g.toString())
        ),
        Jj(
          Ij(
            Hj(
              Gj(Fj(Ej(Dj(new Kj(), b.ra?.Yc), b.ra?.wd), b.ra?.Rd), b.ra?.gd),
              b.ra?.Zc
            ),
            b.ra?.Nd
          ),
          b.ra?.bd
        )
      );
      z(a.j, jp, 24) && Zj(d);
      uD(c, d);
    }
  }
  function MD(a) {
    return sp(a.j) && 1 === v(sp(a.j), 1)
      ? !(z(sp(a.j), Dp, 6) && 1 <= (v(z(sp(a.j), Dp, 6), 3) || 0))
      : !1;
  }
  function ND(a) {
    if (MD(a)) {
      a = a.A;
      var b = qu({ Rb: !0, Sb: !0 }, a.j);
      a = 0 < $B(b, a.j);
    } else (a = a.A.j), (b = pu({ Xa: !1, Qb: !1 }, a)), (a = 0 < $B(b, a));
    return a;
  }
  function OD(a, b) {
    try {
      U(aq) && a.A?.V()?.C();
    } catch (c) {
      Ss(a.D, Ns, Ps(XA(WA(new YA(b).Na(a.C), a.j), a.F).qa(14), c));
    }
  }
  function PD(a) {
    if (a.j?.j()?.j() ?? !1) {
      var b = FD(a);
      a.K.init(null == b ? void 0 : b, () => {
        ED(a, "s", b);
      });
      a.K.addListener((c) => {
        ED(a, "d", FD(a), c);
        a.K.Ea();
        if (a.j?.j()?.B()) {
          a.j?.j()?.D();
          try {
            a.F?.includes(0) && (a.M++, AD(a), ED(a, "r", FD(a), c));
          } catch (d) {
            ED(a, "f", FD(a), c),
              Ss(a.D, Is, Ps(XA(WA(new YA(0).Na(a.C), a.j), a.F).qa(1), d));
          }
        }
      });
    }
  }
  function QD(a, b, c) {
    {
      var d = eC(a.A),
        e = b.j;
      const f = e.j,
        g = e.jc;
      let h = e.Aa,
        k = e.kc,
        l = e.errors.slice(),
        m = e.Pa.slice(),
        n = b.exception;
      const q = XC(a.l).had_ads_ablation ?? !1;
      d
        ? (d.numAutoAdsPlaced ? (h += d.numAutoAdsPlaced) : a.G.A && m.push(13),
          void 0 !== d.exception && (n = d.exception),
          d.numPostPlacementsPlaced && (k += d.numPostPlacementsPlaced),
          (c = {
            Aa: h,
            jc: g,
            kc: k,
            gb: f,
            errors: e.errors.slice(),
            Pa: m,
            exception: n,
            Wa: c,
            nb: !!d.eatf,
            ob: !!d.eatfAbg,
            Gd: q,
          }))
        : (m.push(12),
          a.G.A && m.push(13),
          (c = {
            Aa: h,
            jc: g,
            kc: k,
            gb: f,
            errors: l,
            Pa: m,
            exception: n,
            Wa: c,
            nb: !1,
            ob: !1,
            Gd: q,
          }));
    }
    c.ra = aC(a.A.j);
    if ((b = b.j.l)) c.Ze = b;
    c.Nc = P(a.l).scrollHeight;
    if (Xl()) {
      d = a.A.l.l.j.slice(0);
      b = [];
      for (const f of d) {
        d = {};
        e = f.K;
        for (const g of Em(e)) d[g] = e.get(g);
        d = {
          anchorElement: et(f),
          position: f.j(),
          clearBoth: f.J,
          locationType: f.Ya,
          placed: f.C,
          placementProto: f.B ? f.B.toJSON() : null,
          articleStructure: f.D ? f.D.toJSON() : null,
          rejectionReasons: d,
        };
        b.push(d);
      }
      Yl(14, [{ placementIdentifiers: b }, a.A.F, c.ra]);
    }
    return c;
  }
  function RD(a, b) {
    var c = a.A.j;
    c = c.googleSimulationState = c.googleSimulationState || {};
    c.amaConfigPlacementCount = b.gb;
    c.numAutoAdsPlaced = b.Aa;
    c.hasAtfAd = b.Wa;
    void 0 !== b.exception && (c.exception = b.exception);
    null != a.A &&
      ((a = BC(a.l, a.A, { Ob: -1, ub: -1, zb: -1, Kd: !0, ed: !0 })),
      null != a.j
        ? ((c.placementPositionDiffs = NC(a.j.value)),
          (b = MC(a.j.value)),
          (a = new Tz()),
          (a = qd(a, 2, Uz, b)),
          (c.placementPositionDiffsReport = Fd(a)))
        : ((b = a.l.message),
          (c.placementPositionDiffs = "E" + b),
          (a = new Tz()),
          (a = kd(a, 1, Uz, b)),
          (c.placementPositionDiffsReport = Fd(a))));
  }
  function SD(a, b) {
    KD(a, {
      Aa: 0,
      gb: void 0,
      errors: [],
      Pa: [],
      exception: b,
      Wa: void 0,
      nb: void 0,
      ob: void 0,
      ra: void 0,
    });
    LD(a, {
      Aa: 0,
      gb: void 0,
      errors: [],
      Pa: [],
      exception: b,
      Wa: void 0,
      nb: void 0,
      ob: void 0,
      ra: void 0,
    });
  }
  function ED(a, b, c, d) {
    b = {
      r: b,
      pg_h: P(a.l).scrollHeight,
      su: a.l.location.hostname,
      d: void 0 == c ? -1 : c,
    };
    void 0 !== d && (b.pg_hd = d);
    Rs(a.D, Ks, b);
  }
  function FD(a) {
    let b = null;
    a.j.j() && $c(a.j.j(), 19) && (b = v(a.j.j(), 19));
    return b;
  }
  class yD {
    constructor(a, b, c, d, e, f, g, h, k, l, m, n) {
      this.l = a;
      this.D = b;
      this.C = c;
      this.j = d;
      this.B = e;
      this.F = f;
      this.ba = k || null;
      this.J = [];
      this.K = l;
      this.N = m;
      this.Da = g;
      this.Qa = h;
      this.M = 0;
      this.va = n ? n : { url: a.location.href, Db: void 0 };
      this.I = "n";
    }
    runStorify() {
      const a = z(this.j, rp, 30);
      if (a) {
        var b = z(this.j, Wo, 6)?.j() ?? [];
        this.Qa.runStorify(
          this.l,
          Fd(a),
          this.C,
          b.map((c) => Fd(c))
        );
      }
    }
    V(a) {
      try {
        OD(this, a.j.Aa);
        const b = ND(this) || MD(this) ? ND(this) : void 0;
        Ip({ Bc: b }, this.l);
        PD(this);
        const c = QD(this, a, ND(this));
        ad(this.j, Ep, 25) && fd(z(this.j, Ep, 25), 1) && RD(this, c);
        KD(this, c);
        LD(this, c);
        zl(753, () => {
          if (U(dq) && null != this.A) {
            var d = BC(this.l, this.A, {
                Ob: V(hq),
                ub: V(gq),
                zb: V(eq),
                Kd: !0,
                ed: !1,
              }),
              e = ne(c);
            null != d.j
              ? ((d = NC(d.j.value)), (e.placementPositionDiffs = d))
              : (e.placementPositionDiffs = "E" + d.l.message);
            e = JD(this, e);
            Ss(this.D, Js, e);
          }
        })();
      } catch (b) {
        SD(this, b);
      }
    }
    R(a) {
      OD(this, 0);
      SD(this, a);
    }
  }
  var TD = class extends J {
    constructor(a) {
      super(a);
    }
  };
  function UD(a) {
    try {
      var b = a.localStorage.getItem("google_auto_fc_cmp_setting") || null;
    } catch (d) {
      b = null;
    }
    const c = b;
    return c ? Tn(() => Dd(TD, c)) : Qn(null);
  }
  function VD(a) {
    this.j = a || { cookie: "" };
  }
  p = VD.prototype;
  p.set = function (a, b, c) {
    let d,
      e,
      f,
      g = !1,
      h;
    "object" === typeof c &&
      ((h = c.Zj),
      (g = c.Rf || !1),
      (f = c.domain || void 0),
      (e = c.path || void 0),
      (d = c.Od));
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === d && (d = -1);
    this.j.cookie =
      a +
      "=" +
      b +
      (f ? ";domain=" + f : "") +
      (e ? ";path=" + e : "") +
      (0 > d
        ? ""
        : 0 == d
        ? ";expires=" + new Date(1970, 1, 1).toUTCString()
        : ";expires=" + new Date(Date.now() + 1e3 * d).toUTCString()) +
      (g ? ";secure" : "") +
      (null != h ? ";samesite=" + h : "");
  };
  p.get = function (a, b) {
    const c = a + "=",
      d = (this.j.cookie || "").split(";");
    for (let e = 0, f; e < d.length; e++) {
      f = Xa(d[e]);
      if (0 == f.lastIndexOf(c, 0)) return f.slice(c.length);
      if (f == a) return "";
    }
    return b;
  };
  p.remove = function (a, b, c) {
    const d = void 0 !== this.get(a);
    this.set(a, "", { Od: 0, path: b, domain: c });
    return d;
  };
  p.isEmpty = function () {
    return !this.j.cookie;
  };
  p.vb = function () {
    return this.j.cookie ? (this.j.cookie || "").split(";").length : 0;
  };
  p.clear = function () {
    var a = (this.j.cookie || "").split(";");
    const b = [],
      c = [];
    let d, e;
    for (let f = 0; f < a.length; f++)
      (e = Xa(a[f])),
        (d = e.indexOf("=")),
        -1 == d
          ? (b.push(""), c.push(e))
          : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    for (a = b.length - 1; 0 <= a; a--) this.remove(b[a]);
  };
  function WD(a, b = window) {
    if (fd(a, 5))
      try {
        return b.localStorage;
      } catch {}
    return null;
  }
  function XD(a) {
    return "null" !== a.origin;
  }
  function YD(a, b, c) {
    b = fd(b, 5) && XD(c) ? c.document.cookie : null;
    return null === b ? null : new VD({ cookie: b }).get(a) || "";
  }
  function ZD(a, b) {
    return w(a, 5, b);
  }
  var $D = class extends J {
    constructor() {
      super();
    }
    j() {
      return fd(this, 6);
    }
  };
  var cE = ({ win: a, Ub: b, Id: c = !1, Jd: d = !1 }) => {
    if (!aE({ win: a, Ub: b, Id: c, Jd: d })) return bE(a, ZD(new $D(), !0));
    (b = dD(ZC(), 24))
      ? ((b = ZD(new $D(), Az(b))), (a = bE(a, b)))
      : (a = new Rn(null, Error("tcunav")));
    return a;
  };
  function aE({ win: a, Ub: b, Id: c, Jd: d }) {
    if (!(d = !d && Ez(new Iz(a)))) {
      if ((c = !c)) {
        if (b) {
          a = UD(a);
          if (null != a.j)
            if ((a = a.j.value) && $c(a, 1))
              b: switch (((a = v(a, 1)), a)) {
                case 1:
                  a = !0;
                  break b;
                default:
                  throw Error("Unhandled AutoGdprFeatureStatus: " + a);
              }
            else a = !1;
          else Bl(806, a.l), (a = !1);
          b = !a;
        }
        c = b;
      }
      d = c;
    }
    return d ? !0 : !1;
  }
  function bE(a, b) {
    return (a = WD(b, a)) ? Qn(a) : new Rn(null, Error("unav"));
  }
  var dE = class extends J {
    constructor(a) {
      super(a);
    }
  };
  class eE {
    constructor(a, b, c, d) {
      this.j = a;
      this.A = b;
      this.C = c;
      this.l = !1;
      this.B = d;
    }
  }
  function HD(a, { win: b, webPropertyCode: c, Dd: d, jd: e }) {
    a = yv(8, b, a.j).then((f) =>
      f.runGallerify({
        win: b,
        webPropertyCode: c,
        serializedGallerifyConfig: Fd(d),
        serializedArticleStructures: e.map((g) => Fd(g)),
      })
    );
    xl.za(927, a);
  }
  var fE = class {
    constructor(a) {
      this.j = a;
    }
  };
  function gE({ win: a, webPropertyCode: b, tb: c }) {
    if (ly(a.location, "google_auto_gallery")) {
      var d = new fp();
      var e = new gp();
      e = w(e, 1, !0);
      d = od(d, 3, e);
      HD(new fE(c), { win: a, webPropertyCode: b, Dd: d, jd: [] });
    }
  }
  var hE = "a".charCodeAt(),
    iE = me(am),
    jE = me(bm);
  function kE(a, b) {
    if (a.j + b > a.l.length)
      throw Error("Requested length " + b + " is past end of string.");
    const c = a.l.substring(a.j, a.j + b);
    a.j += b;
    return parseInt(c, 2);
  }
  function lE(a) {
    return (
      String.fromCharCode(hE + kE(a, 6)) + String.fromCharCode(hE + kE(a, 6))
    );
  }
  function mE(a) {
    let b = kE(a, 12);
    const c = [];
    for (; b--; ) {
      var d = !0 === !!kE(a, 1),
        e = kE(a, 16);
      if (d) for (d = kE(a, 16); e <= d; e++) c.push(e);
      else c.push(e);
    }
    c.sort((f, g) => f - g);
    return c;
  }
  function nE(a, b, c) {
    const d = [];
    for (let e = 0; e < b; e++)
      if (kE(a, 1)) {
        const f = e + 1;
        if (c && -1 === c.indexOf(f))
          throw Error(`ID: ${f} is outside of allowed values!`);
        d.push(f);
      }
    return d;
  }
  function oE(a) {
    const b = kE(a, 16);
    return !0 === !!kE(a, 1)
      ? ((a = mE(a)),
        a.forEach((c) => {
          if (c > b) throw Error(`ID ${c} is past MaxVendorId ${b}!`);
        }),
        a)
      : nE(a, b);
  }
  class pE {
    constructor(a) {
      if (/[^01]/.test(a)) throw Error(`Input bitstring ${a} is malformed!`);
      this.l = a;
      this.j = 0;
    }
  }
  var rE = (a, b) => {
    try {
      var c = hc(a.split(".")[0])
        .map((e) => e.toString(2).padStart(8, "0"))
        .join("");
      const d = new pE(c);
      c = {};
      c.tcString = a;
      c.gdprApplies = !0;
      d.j += 78;
      c.cmpId = kE(d, 12);
      c.cmpVersion = kE(d, 12);
      d.j += 30;
      c.tcfPolicyVersion = kE(d, 6);
      c.isServiceSpecific = !!kE(d, 1);
      c.useNonStandardStacks = !!kE(d, 1);
      c.specialFeatureOptins = qE(nE(d, 12, jE), jE);
      c.purpose = {
        consents: qE(nE(d, 24, iE), iE),
        legitimateInterests: qE(nE(d, 24, iE), iE),
      };
      c.purposeOneTreatment = !!kE(d, 1);
      c.publisherCC = lE(d);
      c.vendor = { consents: qE(oE(d), b), legitimateInterests: qE(oE(d), b) };
      return c;
    } catch (d) {
      return null;
    }
  };
  const qE = (a, b) => {
    const c = {};
    if (Array.isArray(b) && 0 !== b.length)
      for (const d of b) c[d] = -1 !== a.indexOf(d);
    else for (const d of a) c[d] = !0;
    delete c[0];
    return c;
  };
  var sE = class {
    constructor(a) {
      this.key = a;
      this.defaultValue = !1;
      this.valueType = "boolean";
    }
  };
  function tE(a) {
    uE || (uE = new vE());
    const b = uE.j[a.key];
    if ("proto" === a.valueType) {
      try {
        const c = JSON.parse(b);
        if (Array.isArray(c)) return c;
      } catch (c) {}
      return a.defaultValue;
    }
    return typeof b === typeof a.defaultValue ? b : a.defaultValue;
  }
  var wE = class {
    constructor() {
      this.j = {};
    }
  };
  var xE = class extends J {
      constructor() {
        super();
      }
    },
    yE = class extends J {
      constructor() {
        super();
      }
    };
  var zE = class extends J {
      constructor() {
        super();
      }
    },
    AE = [11, 8, 12, 13, 15, 17, 19, 18, 20, 21, 22, 24, 25, 26];
  var BE = class {};
  var DE = class extends J {
      constructor(a) {
        super(a, -1, CE);
      }
    },
    EE = class extends J {
      constructor(a) {
        super(a);
      }
    },
    FE = class extends J {
      constructor(a) {
        super(a);
      }
    },
    CE = [7];
  var GE = new sE("45368529"),
    HE = new sE("45369554");
  var vE = class extends wE {
      constructor() {
        super();
        var a = t.__fcexpdef || "";
        try {
          const b = JSON.parse(a)[0];
          a = "";
          for (let c = 0; c < b.length; c++)
            a += String.fromCharCode(
              b.charCodeAt(c) ^
                "\u0003\u0007\u0003\u0007\b\u0004\u0004\u0006\u0005\u0003".charCodeAt(
                  c % 10
                )
            );
          this.j = JSON.parse(a);
        } catch (b) {}
      }
    },
    uE;
  function IE(a) {
    return (a = JE(a)) ? z(a, EE, 4) : null;
  }
  function JE(a) {
    if ((a = new VD(a).get("FCCDCF", "")))
      if (tE(GE))
        if (a.startsWith("%"))
          try {
            var b = decodeURIComponent(a);
          } catch (c) {
            KE(1), (b = null);
          }
        else b = a;
      else b = a;
    else b = null;
    try {
      return b ? Dd(DE, b) : null;
    } catch (c) {
      return KE(2), null;
    }
  }
  function KE(a) {
    new BE();
    var b = new yE();
    a = w(b, 7, a);
    b = new xE();
    a = od(b, 1, a);
    b = new zE();
    qd(b, 22, AE, a);
    tE(HE);
  }
  function LE(a) {
    a.__tcfapiPostMessageReady || ME(new NE(a));
  }
  function ME(a) {
    a.l = (b) => {
      const c = "string" == typeof b.data;
      let d;
      try {
        d = c ? JSON.parse(b.data) : b.data;
      } catch (f) {
        return;
      }
      const e = d.__tcfapiCall;
      !e ||
        ("ping" !== e.command &&
          "getTCData" !== e.command &&
          "addEventListener" !== e.command &&
          "removeEventListener" !== e.command) ||
        a.j.__tcfapi(
          e.command,
          e.version,
          (f, g) => {
            const h = {};
            h.__tcfapiReturn =
              "removeEventListener" === e.command
                ? { success: f, callId: e.callId }
                : { returnValue: f, success: g, callId: e.callId };
            f = c ? JSON.stringify(h) : h;
            b.source &&
              "function" === typeof b.source.postMessage &&
              b.source.postMessage(f, b.origin);
            return f;
          },
          e.parameter
        );
    };
    a.j.addEventListener("message", a.l);
    a.j.__tcfapiPostMessageReady = !0;
  }
  var NE = class {
    constructor(a) {
      this.j = a;
      this.l = null;
    }
  };
  function OE(a) {
    var b = U(mq);
    a.__uspapi ||
      a.frames.__uspapiLocator ||
      ((a = new PE(a)), QE(a), b && RE(a));
  }
  function QE(a) {
    !a.C ||
      a.j.__uspapi ||
      a.j.frames.__uspapiLocator ||
      ((a.j.__uspapiManager = "fc"),
      xz(a.j, "__uspapiLocator"),
      Qa("__uspapi", (...b) => SE(a, ...b)));
  }
  function RE(a) {
    !a.A ||
      a.j.__tcfapi ||
      a.j.frames.__tcfapiLocator ||
      ((a.j.__tcfapiManager = "fc"),
      xz(a.j, "__tcfapiLocator"),
      (a.j.__tcfapiEventListeners = a.j.__tcfapiEventListeners || []),
      Qa("__tcfapi", (...b) => TE(a, ...b)),
      LE(a.j));
  }
  function SE(a, b, c, d) {
    "function" === typeof d &&
      "getUSPData" === b &&
      d({ version: 1, uspString: a.C }, !0);
  }
  function TE(a, b, c, d, e = null) {
    if ("function" === typeof d)
      if (c && 2 !== c) d(null, !1);
      else
        switch (((c = a.j.__tcfapiEventListeners), b)) {
          case "getTCData":
            !e || (Array.isArray(e) && e.every((f) => "number" === typeof f))
              ? d(UE(a, e, null), !0)
              : d(null, !1);
            break;
          case "ping":
            d({
              gdprApplies: !0,
              cmpLoaded: !0,
              cmpStatus: "loaded",
              displayStatus: "disabled",
              apiVersion: "2.0",
              cmpVersion: 1,
              cmpId: 300,
            });
            break;
          case "addEventListener":
            b = c.push(d);
            d(UE(a, null, b - 1), !0);
            break;
          case "removeEventListener":
            c[e] ? ((c[e] = null), d(!0)) : d(!1);
            break;
          case "getInAppTCData":
          case "getVendorList":
            d(null, !1);
        }
  }
  function UE(a, b, c) {
    if (!a.A) return null;
    b = rE(a.A, b);
    b.addtlConsent = null != a.B ? a.B : void 0;
    b.cmpStatus = "loaded";
    b.eventStatus = "tcloaded";
    null != c && (b.listenerId = c);
    return b;
  }
  class PE {
    constructor(a) {
      this.j = a;
      this.l = a.document;
      this.C = (a = (a = JE(this.l)) ? z(a, FE, 5) || null : null)
        ? v(a, 2)
        : null;
      this.A = (a = IE(this.l)) && null != v(a, 1) ? v(a, 1) : null;
      this.B = (a = IE(this.l)) && null != v(a, 2) ? v(a, 2) : null;
    }
  }
  function VE(a) {
    const b = a[0] / 255,
      c = a[1] / 255;
    a = a[2] / 255;
    return (
      0.2126 * (0.03928 >= b ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)) +
      0.7152 * (0.03928 >= c ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)) +
      0.0722 * (0.03928 >= a ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4))
    );
  }
  function WE(a, b) {
    a = VE(a);
    b = VE(b);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }
  var XE = Promise;
  class YE {
    constructor(a) {
      this.A = a;
    }
    l(a, b, c) {
      this.A.then((d) => {
        d.l(a, b, c);
      });
    }
    j(a, b) {
      return this.A.then((c) => c.j(a, b));
    }
  }
  class ZE {
    constructor(a) {
      this.data = a;
    }
  }
  function $E(a, b) {
    aF(a, b);
    return new bF(a);
  }
  class bF {
    constructor(a) {
      this.A = a;
    }
    l(a, b, c = []) {
      const d = new MessageChannel();
      aF(d.port1, b);
      this.A.postMessage(a, [d.port2].concat(c));
    }
    j(a, b) {
      return new XE((c) => {
        this.l(a, c, b);
      });
    }
  }
  function aF(a, b) {
    b &&
      (a.onmessage = (c) => {
        b(new ZE(c.data, $E(c.ports[0])));
      });
  }
  var eF = ({
    destination: a,
    Fa: b,
    origin: c,
    Ta: d = "ZNWN1d",
    onMessage: e,
    Sd: f,
  }) =>
    cF({
      destination: a,
      ff: () => b.contentWindow,
      yf: dF(c),
      Ta: d,
      onMessage: e,
      Sd: f,
    });
  const cF = ({
      destination: a,
      ff: b,
      yf: c,
      dk: d,
      Ta: e,
      onMessage: f,
      Sd: g,
    }) => {
      const h = Object.create(null);
      c.forEach((k) => {
        h[k] = !0;
      });
      return new YE(
        new XE((k, l) => {
          const m = (n) => {
            if (n.source && n.source === b())
              if (!0 !== h[n.origin]) {
                a.removeEventListener("message", m, !1);
                const q = c.join(", ");
                l(
                  Error(
                    `Origin mismatch while establishing channel "${e}". Expected ${
                      1 === c.length ? q : `one of [${q}]`
                    }, but received ${n.origin}.`
                  )
                );
              } else
                (n.data.n || n.data) === e &&
                  (a.removeEventListener("message", m, !1),
                  d && n.data.t !== d
                    ? l(
                        Error(
                          `Token mismatch while establishing channel "${e}". Expected ${d}, but received ${n.data.t}.`
                        )
                      )
                    : (k($E(n.ports[0], f)), g && g(n)));
          };
          a.addEventListener("message", m, !1);
        })
      );
    },
    dF = (a) => {
      a = "string" === typeof a ? [a] : a;
      const b = Object.create(null);
      a.forEach((c) => {
        if ("null" === c)
          throw Error(
            "Receiving from null origin not allowed without token verification. Please use NullOriginConnector."
          );
        b[c] = !0;
      });
      return a;
    };
  var fF = class {
    constructor(a) {
      this.oc = a;
    }
    runStorify(a, b, c, d) {
      const e = yv(11, a, this.oc).then((f) => {
        f.runStorify(a, b, c, d);
      });
      xl.za(1021, e);
    }
  };
  var gF = (a, b, c, d, e, f, g, h = null, k) => {
    try {
      var l = a.localStorage;
    } catch (y) {
      l = null;
    }
    if (l) {
      if (U(cq)) var m = null;
      else
        try {
          m = l.getItem("google_ama_config");
        } catch (y) {
          m = null;
        }
      try {
        var n = m ? Dd(wp, m) : null;
      } catch (y) {
        n = null;
      }
      m = n;
    } else m = null;
    a: {
      if (d)
        try {
          var q = Dd(wp, d);
          break a;
        } catch (y) {
          UC(a, { cfg: 1, inv: 1 });
        }
      q = null;
    }
    if ((d = q)) {
      if (e) {
        q = new xp();
        od(d, 3, q);
        m = d.j() && v(d.j(), 13) ? v(d.j(), 13) : 1;
        w(q, 1, Date.now() + 864e5 * m);
        q = Wc(d);
        d.j() &&
          ((m = new vp()),
          (n = d.j()),
          (n = fd(n, 23)),
          (m = w(m, 23, null == n ? void 0 : n)),
          (n = F(d.j(), 12, !1)),
          (m = w(m, 12, n)),
          (n = F(d.j(), 15, !1)),
          (m = w(m, 15, n)),
          od(q, 15, m));
        m = A(q, bp, 1);
        for (n = 0; n < m.length; n++) w(m[n], 11, Kc);
        w(q, 22, void 0, !1);
        if (U(cq)) WC(a);
        else
          try {
            (e || a.localStorage).setItem("google_ama_config", Fd(q));
          } catch (y) {
            UC(a, { lserr: 1 });
          }
      }
      e = SC(a, A(d, Ap, 7));
      a: {
        if (e && ((q = v(e, 3)), (m = z(d, Mo, 9)), q && m)) {
          b: {
            m = A(m, Ko, 1);
            for (r of m)
              if (v(r, 1) == q) {
                var r = z(r, Jo, 2) || null;
                break b;
              }
            r = null;
          }
          if (r) break a;
        }
        r = z(d, Jo, 8) || new Jo();
      }
      r = { Ef: r };
      e && (r.da = e);
      e && QC(e, 3) && (r.sb = [1]);
      if (7 == c.google_pgb_reactive && ((e = r.da), !e || !fd(e, 8)))
        return !1;
      YC(a, 2) &&
        (Yl(5, [d.toJSON()]),
        (c = VC(c)),
        (f = new fE(f)),
        (g = new fF(g)),
        (e = r.da),
        (c.google_package = (e && v(e, 4)) || ""),
        xD(a, b, d, r, f, g, new lo(["google-auto-placed"], c), h, {
          url: a.location.href,
          Db: k,
        }));
      return !0;
    }
    m && (UC(a, { cfg: 1, cl: 1 }), WC(a));
    return !1;
  };
  var iF = (a) => {
    const b = a.H;
    null == b.google_ad_output && (b.google_ad_output = "html");
    if (null != b.google_ad_client) {
      var c;
      (c = String(b.google_ad_client))
        ? ((c = c.toLowerCase()), "ca-" != c.substring(0, 3) && (c = "ca-" + c))
        : (c = "");
      b.google_ad_client = c;
    }
    null != b.google_ad_slot && (b.google_ad_slot = String(b.google_ad_slot));
    b.google_webgl_support = !!fg.WebGLRenderingContext;
    b.google_ad_section = b.google_ad_section || b.google_ad_region || "";
    b.google_country = b.google_country || b.google_gl || "";
    c = new Date().getTime();
    Array.isArray(b.google_color_bg) &&
      (b.google_color_bg = hF(a, b.google_color_bg, c));
    Array.isArray(b.google_color_text) &&
      (b.google_color_text = hF(a, b.google_color_text, c));
    Array.isArray(b.google_color_link) &&
      (b.google_color_link = hF(a, b.google_color_link, c));
    Array.isArray(b.google_color_url) &&
      (b.google_color_url = hF(a, b.google_color_url, c));
    Array.isArray(b.google_color_border) &&
      (b.google_color_border = hF(a, b.google_color_border, c));
    Array.isArray(b.google_color_line) &&
      (b.google_color_line = hF(a, b.google_color_line, c));
  };
  function hF(a, b, c) {
    a.j |= 2;
    return b[c % b.length];
  }
  function jF(a, b) {
    var c = xl,
      d;
    var e;
    d = (e =
      (e = Lh()) &&
      (d = e.initialLayoutRect) &&
      "number" === typeof d.top &&
      "number" === typeof d.left &&
      "number" === typeof d.width &&
      "number" === typeof d.height
        ? new Hh(d.left, d.top, d.width, d.height)
        : null)
      ? new og(e.left, e.top)
      : (d = di()) && Ca(d.rootBounds)
      ? new og(
          d.rootBounds.left + d.boundingClientRect.left,
          d.rootBounds.top + d.boundingClientRect.top
        )
      : null;
    if (d) return d;
    try {
      var f = new og(0, 0),
        g = Dg(yg(b));
      if (Mb(g, "parent")) {
        do {
          if (g == a) var h = qi(b);
          else {
            var k = pi(b);
            h = new og(k.left, k.top);
          }
          d = h;
          f.x += d.x;
          f.y += d.y;
        } while (
          g &&
          g != a &&
          g != g.parent &&
          (b = g.frameElement) &&
          (g = g.parent)
        );
      }
      return f;
    } catch (l) {
      return c.ma(888, l), new og(-12245933, -12245933);
    }
  }
  var kF = class extends J {
    constructor(a) {
      super(a);
    }
    B() {
      return F(this, 5);
    }
    D() {
      return F(this, 6);
    }
    F() {
      return F(this, 7);
    }
    j() {
      return F(this, 8);
    }
  };
  var mF = class extends J {
      constructor(a) {
        super(a, -1, lF);
      }
      j() {
        return gd(this, 1);
      }
    },
    lF = [1];
  var oF = class extends J {
      constructor(a) {
        super(a, -1, nF);
      }
    },
    pF = class extends J {
      constructor(a) {
        super(a);
      }
    },
    rF = class extends J {
      constructor(a) {
        super(a, -1, qF);
      }
    },
    nF = [2],
    qF = [2];
  var tF = class extends J {
      constructor(a) {
        super(a, -1, sF);
      }
    },
    sF = [19],
    uF = [13, 14];
  function vF(a, b) {
    b &&
      !a.j &&
      (a.j = b.split(":").find((c) => 0 === c.indexOf("ID=")) || null);
  }
  var wF = class {
      constructor() {
        this.j = null;
        this.l = { [wj]: {}, [xj]: {}, [yj]: {} };
        const a = (b) => (this.j ? bh(`${b} + ${this.j}`) % 1e3 : void 0);
        this.l[xj] = { [9]: (...b) => a(b[0]) };
      }
    },
    xF;
  let yF = void 0;
  function zF() {
    Kd(yF, Id);
    return yF;
  }
  function AF(a) {
    try {
      const b = a.getItem("google_adsense_settings");
      if (!b) return {};
      const c = JSON.parse(b);
      return c !== Object(c)
        ? {}
        : je(
            c,
            (d, e) =>
              Object.prototype.hasOwnProperty.call(c, e) &&
              "string" === typeof e &&
              Array.isArray(d)
          );
    } catch (b) {
      return {};
    }
  }
  var BF = (a = t) => a.ggeac || (a.ggeac = {});
  function CF(a = document) {
    return !!a.featurePolicy?.allowedFeatures().includes("browsing-topics");
  }
  class DF {
    constructor() {
      this.j = () => {};
    }
  }
  var FF = (a = BF()) => {
      vl(O(wl), a);
      EF(a);
      O(DF).j = ul(tl, a);
      O(Lr).l();
    },
    EF = (a) => {
      const b = O(Lr);
      b.A = (c, d) => ul(pl, a, () => !1)(c, d, 1);
      b.B = (c, d) => ul(ql, a, () => 0)(c, d, 1);
      b.j = (c, d) => ul(rl, a, () => "")(c, d, 1);
      b.C = (c, d) => ul(sl, a, () => [])(c, d, 1);
      b.l = () => {
        ul(ml, a)(1);
      };
    };
  function GF(a) {
    var b = O(wl).l(a);
    tD(O(vD), a, b);
  }
  var HF = (a) => {
    const b = O(wl).j();
    a = XC(a);
    a.eids || (a.eids = []);
    return b.concat(a.eids).join(",");
  };
  function IF(a, b, c) {
    return c ? YD(b, c, a.j) : null;
  }
  function JF(a, b, c, d) {
    if (d) {
      var e = {
        Od: v(c, 2) - Date.now() / 1e3,
        path: v(c, 3),
        domain: v(c, 4),
        Rf: !1,
      };
      a = a.j;
      fd(d, 5) && XD(a) && new VD(a.document).set(b, v(c, 1), e);
    }
  }
  function KF(a, b, c) {
    if (c && YD(b, c, a.j))
      for (const e of LF(a.j.location.hostname)) {
        var d = a.j;
        fd(c, 5) && XD(d) && new VD(d.document).remove(b, "/", e);
      }
  }
  var MF = class {
    constructor(a) {
      this.j = a;
      this.l = 0;
    }
  };
  function LF(a) {
    if ("localhost" === a) return ["localhost"];
    a = a.split(".");
    if (2 > a.length) return [];
    const b = [];
    for (let c = 0; c < a.length - 1; ++c) b.push(a.slice(c).join("."));
    return b;
  }
  function NF(a, b, c) {
    return zl(629, (d) => {
      delete a._gfp_s_;
      if (!d) throw Error("Invalid JSONP response");
      d = d._cookies_;
      if (!d) return Promise.resolve();
      if (0 === d.length) throw Error("Invalid JSONP response");
      for (const f of d) {
        var e = f._domain_;
        const g = f._value_,
          h = f._expires_,
          k = f._path_;
        d = f._version_ || 1;
        if (
          "string" !== typeof e ||
          "string" !== typeof g ||
          "number" !== typeof h ||
          "string" !== typeof k ||
          "number" !== typeof d ||
          !g
        )
          throw Error("Invalid JSONP response");
        e = dg(cg(bg(ag(new eg(), g), h), k), e);
        switch (d) {
          case 1:
            JF(c, "__gads", e, b);
            break;
          case 2:
            U(uq) && JF(c, "__gpi", e, b);
        }
      }
      return Promise.resolve();
    });
  }
  function OF(a, b, c) {
    let d = void 0;
    if (0 === a.l) {
      if (IF(a, "__gads", b)) var e = !0;
      else if (
        ((e = a.j),
        fd(b, 5) &&
          XD(e) &&
          new VD(e.document).set("GoogleAdServingTest", "Good", void 0),
        (e = "Good" === YD("GoogleAdServingTest", b, a.j)))
      ) {
        var f = a.j;
        fd(b, 5) &&
          XD(f) &&
          new VD(f.document).remove("GoogleAdServingTest", void 0, void 0);
      }
      a.l = e ? 2 : 1;
    }
    2 === a.l && (d = NF(c, b, a));
    c._gfp_p_ = !0;
    return d;
  }
  function PF(a, b, c, d) {
    d = { domain: c.location.hostname, callback: "_gfp_s_", client: d };
    var e = IF(b, "__gads", a);
    e && (d.cookie = e);
    U(uq) &&
      ((e = IF(b, "__gpi", a)) && !e.includes("&") && (d.gpic = e),
      (d.gpid_exp = "1"));
    const f = ye(
        Be(Od(Pd("https://partner.googleadservices.com/gampad/cookie.js"))),
        d
      ),
      g = OF(b, a, c);
    g
      ? new Promise((h) => {
          c._gfp_s_ = (k) => {
            g(k).then(h);
          };
          Wg(c.document, f);
        })
      : Promise.resolve();
  }
  var QF = (a, b, c) => {
    "_gfp_p_" in b || ((b._gfp_p_ = !1), "_gfp_a_" in b || (b._gfp_a_ = !0));
    const d = new MF(b);
    c = b.google_ad_client || c;
    var e = b._gfp_a_;
    if ("boolean" !== typeof e)
      throw Error(`Illegal value of ${"_gfp_a_"}: ${e}`);
    if (e) {
      e = b._gfp_p_;
      if ("boolean" !== typeof e)
        throw Error(`Illegal value of ${"_gfp_p_"}: ${e}`);
      e ? Promise.resolve() : PF(a, d, b, c);
    } else Promise.resolve();
    a = IF(d, "__gads", a) || "";
    xF || (xF = new wF());
    b = xF;
    vF(b, a);
    a = b.l;
    O(DF).j(a);
    GF(20);
    GF(17);
  };
  var uj = { Lj: 0, Hj: 1, Fj: 2, Gj: 3, Jj: 5, Kj: 6, Ij: 7 };
  var RF = class {
    constructor(a) {
      this.L = a.L;
      this.pubWin = a.pubWin;
      this.H = a.H;
      this.ha = a.ha;
      this.ca = a.ca;
      this.Za = a.Za;
      this.innerInsElement = a.innerInsElement;
      this.outerInsElement = U(Zp) ? this.innerInsElement : a.outerInsElement;
      this.C = -1;
      this.j = 0;
      this.l = this.J = null;
      this.I = this.G = 0;
      this.A = [];
      this.rb = this.F = "";
      this.B = this.D = null;
    }
  };
  function SF(a) {
    U(Tq) &&
      ((a.easpi = U(Tq)),
      U(Rq) && (a.easpa = !0),
      (a.asntp = V(kr)),
      (a.asntpv = V(or)),
      (a.asntpl = V(mr)),
      (a.asntpm = V(nr)),
      (a.asntpc = V(lr)),
      (a.asna = V(gr)),
      (a.asnd = V(hr)),
      (a.asnp = V(ir)),
      (a.asns = V(jr)),
      (a.asmat = V(er)),
      (a.asptt = V(sr)),
      (a.aspe = U(rr)),
      (a.asro = U(tr)));
  }
  var TF = (a, b) =>
    By({ L: a, Kc: 3e3, Lc: a.innerWidth > km ? 650 : 0, pa: Zi, md: b });
  var UF = (a) => {
    let b = 0;
    try {
      (b |= a != a.top ? 512 : 0), (b |= lm(a, 1e4));
    } catch (c) {
      b |= 32;
    }
    return b;
  };
  var VF = (a) => {
    let b = 0;
    try {
      (b |= a != a.top ? 512 : 0), (b |= lm(a, 1e4));
    } catch (c) {
      b |= 32;
    }
    return b;
  };
  var WF = (a) => {
      let b = 0;
      try {
        (b |= a != a.top ? 512 : 0),
          (b |=
            a.navigator && /Android 2/.test(a.navigator.userAgent)
              ? 1048576
              : 0);
      } catch (c) {
        b |= 32;
      }
      return b;
    },
    XF = (a, b, c) => {
      let d = 0;
      try {
        d |= lm(a, 2500);
        if (U(Iq)) {
          const g = P(a).clientHeight;
          d |= g ? (320 > g ? 2097152 : 0) : 1073741824;
        }
        d |= mm(a);
        var e;
        if ((e = 0 < b)) {
          var f = cA(c, b);
          e = !(f && 1 > f.length);
        }
        e && (d |= 134217728);
      } catch (g) {
        d |= 32;
      }
      return d;
    };
  function YF(a, b, c = null) {
    if (!U(Lq)) return 32;
    let d = a != a.top ? 512 : 0;
    Cy(a.navigator?.userAgent) && (d |= 1048576);
    const e = a.innerWidth;
    1200 > e && (d |= 65536);
    const f = a.innerHeight;
    650 > f && (d |= 2097152);
    c &&
      0 === d &&
      (ZF({
        L: a,
        Md: b,
        fe: 1,
        position: 3 === c ? "left" : "right",
        P: e,
        X: f,
        Ka: new Set(),
        minWidth: 120,
        minHeight: 500,
      }) ||
        (d |= 16));
    return d;
  }
  function $F(a) {
    if (0 !== YF(a, !0)) return "";
    const b = [],
      c = a.innerWidth,
      d = a.innerHeight;
    for (const e of ["left", "right"]) {
      const f = ZF({
        L: a,
        Md: !0,
        fe: 1,
        position: e,
        P: c,
        X: d,
        Ka: new Set(),
        minWidth: 120,
        minHeight: 500,
      });
      f && b.push(`${f.width}x${f.height}_${String(e).charAt(0)}`);
    }
    return b.join("|");
  }
  function aG(a, b) {
    return null !== Ng(a, (c) => c.nodeType === Node.ELEMENT_NODE && b.has(c));
  }
  function bG(a, b) {
    return Ng(
      a,
      (c) =>
        c.nodeType === Node.ELEMENT_NODE &&
        "fixed" === b.getComputedStyle(c, null).position
    );
  }
  function cG(a) {
    const b = [];
    for (const c of a.document.querySelectorAll("*")) {
      const d = a.getComputedStyle(c, null);
      "fixed" === d.position &&
        "none" !== d.display &&
        "hidden" !== d.visibility &&
        b.push(c);
    }
    return b;
  }
  function dG(a) {
    return Math.round(10 * Math.round(a / 10));
  }
  function eG(a) {
    return `${a.position}-${dG(a.P)}x${dG(a.X)}-${dG(a.scrollY + a.hb)}Y`;
  }
  function fG(a) {
    return `f-${eG({
      position: a.position,
      hb: a.hb,
      scrollY: 0,
      P: a.P,
      X: a.X,
    })}`;
  }
  function gG(a, b) {
    a = Math.min(a ?? Infinity, b ?? Infinity);
    return Infinity !== a ? a : 0;
  }
  function hG(a, b, c) {
    const d = hm(c.L).sideRailProcessedFixedElements;
    if (!d.has(a)) {
      var e = a.getBoundingClientRect();
      if (e) {
        var f = Math.max(e.top - 10, 0),
          g = Math.min(e.bottom + 10, c.X),
          h = Math.max(e.left - 10, 0);
        e = Math.min(e.right + 10, c.P);
        for (var k = 0.3 * c.P; f <= g; f += 10) {
          if (0 < e && h < k) {
            var l = fG({ position: "left", hb: f, P: c.P, X: c.X });
            b.set(l, gG(b.get(l), h));
          }
          if (h < c.P && e > c.P - k) {
            l = fG({ position: "right", hb: f, P: c.P, X: c.X });
            const m = c.P - e;
            b.set(l, gG(b.get(l), m));
          }
        }
        d.add(a);
      }
    }
  }
  function ZF(a) {
    var b = hm(a.L).sideRailAvailableSpace;
    if (!a.Md) {
      var c = { L: a.L, P: a.P, X: a.X, Ka: a.Ka },
        d = `f-${dG(c.P)}x${dG(c.X)}`;
      if (!b.has(d)) {
        b.set(d, 0);
        hm(c.L).sideRailProcessedFixedElements.clear();
        d = new Set([
          ...Array.from(
            c.L.document.querySelectorAll(
              "[data-anchor-status],[data-side-rail-status]"
            )
          ),
          ...c.Ka,
        ]);
        for (var e of cG(c.L)) aG(e, d) || hG(e, b, c);
      }
    }
    c = [];
    d = 0.9 * a.X;
    var f = sm(a.L),
      g = (e = (a.X - d) / 2),
      h = d / 7;
    for (var k = 0; 8 > k; k++) {
      var l = c,
        m = l.push;
      a: {
        var n = g;
        var q = a.position,
          r = b,
          y = { L: a.L, P: a.P, X: a.X, Ka: a.Ka };
        const D = fG({ position: q, hb: n, P: y.P, X: y.X }),
          C = eG({ position: q, hb: n, scrollY: f, P: y.P, X: y.X });
        if (r.has(C)) {
          n = gG(r.get(D), r.get(C));
          break a;
        }
        const G = "left" === q ? 20 : y.P - 20;
        let K = G;
        q = ((0.3 * y.P) / 5) * ("left" === q ? 1 : -1);
        for (let H = 0; 6 > H; H++) {
          const I = Ny(y.L.document, Math.round(K), Math.round(n));
          var E = aG(I, y.Ka);
          const ta = bG(I, y.L);
          if (!E && null !== ta) {
            hG(ta, r, y);
            r.delete(C);
            break;
          }
          E ||
            ((E = I.offsetHeight >= 0.25 * y.X),
            (E = I.offsetWidth >= 0.9 * y.P && E));
          if (E) r.set(C, Math.round(Math.abs(K - G) + 20));
          else if (K !== G) (K -= q), (q /= 2);
          else {
            r.set(C, 0);
            break;
          }
          K += q;
        }
        n = gG(r.get(D), r.get(C));
      }
      m.call(l, n);
      g += h;
    }
    b = a.fe;
    f = a.position;
    d = Math.round(d / 8);
    e = Math.round(e);
    g = a.minWidth;
    a = a.minHeight;
    m = [];
    h = Array(c.length).fill(0);
    for (l = 0; l < c.length; l++) {
      for (; 0 !== m.length && c[m[m.length - 1]] >= c[l]; ) m.pop();
      h[l] = 0 === m.length ? 0 : m[m.length - 1] + 1;
      m.push(l);
    }
    m = [];
    k = c.length - 1;
    l = Array(c.length).fill(0);
    for (n = k; 0 <= n; n--) {
      for (; 0 !== m.length && c[m[m.length - 1]] >= c[n]; ) m.pop();
      l[n] = 0 === m.length ? k : m[m.length - 1] - 1;
      m.push(n);
    }
    m = null;
    for (k = 0; k < c.length; k++)
      if (
        ((n = {
          position: f,
          width: Math.round(c[k]),
          height: Math.round((l[k] - h[k] + 1) * d),
          ck: e + h[k] * d,
        }),
        (r = n.width >= g && n.height >= a),
        0 === b && r)
      ) {
        m = n;
        break;
      } else
        1 === b &&
          r &&
          (!m || n.width * n.height > m.width * m.height) &&
          (m = n);
    return m;
  }
  const iG = { [27]: 512, [26]: 128 };
  var jG = (a, b, c, d) => {
      switch (c) {
        case 1:
        case 2:
          return 0 === TF(a, c);
        case 3:
        case 4:
          return 0 === YF(a, !1, c);
        case 8:
          return (
            (b =
              "on" === b.google_adtest || ly(a.location, "google_ia_debug")
                ? -1
                : 3600),
            0 == (WF(a) | XF(a, b, d))
          );
        case 9:
          return (
            (b = !(
              "on" === b.google_adtest || ly(a.location, "google_scr_debug")
            )),
            !dA(a, b, d)
          );
        case 30:
          return 0 == SB(a);
        case 26:
          return 0 == VF(a);
        case 27:
          return 0 === UF(a);
        case 40:
          return !0;
        default:
          return !1;
      }
    },
    kG = (a, b, c, d) => {
      switch (c) {
        case 0:
        case 40:
        case 10:
        case 11:
          return 0;
        case 1:
        case 2:
          return TF(a, c);
        case 3:
        case 4:
          return YF(a, !0, c);
        case 8:
          return (
            (b =
              "on" === b.google_adtest || ly(a.location, "google_ia_debug")
                ? -1
                : 3600),
            WF(a) | XF(a, b, d)
          );
        case 9:
          return dA(
            a,
            !("on" === b.google_adtest || ly(a.location, "google_scr_debug")),
            d
          );
        case 16:
          return es(b, a) ? 0 : 8388608;
        case 30:
          return SB(a);
        case 26:
          return VF(a);
        case 27:
          return UF(a);
        default:
          return 32;
      }
    },
    lG = (a, b, c) => {
      const d = b.google_reactive_ad_format;
      if (!ke(d)) return !1;
      a = Vg(a);
      if (!a || !jG(a, b, d, c)) return !1;
      b = hm(a);
      if (qm(b, d)) return !1;
      b.adCount[d] || (b.adCount[d] = 0);
      b.adCount[d]++;
      return !0;
    },
    nG = (a) => {
      const b = a.google_reactive_ad_format;
      return (
        !a.google_reactive_ads_config &&
        mG(a) &&
        16 !== b &&
        10 !== b &&
        11 !== b &&
        40 !== b
      );
    },
    oG = (a) => {
      if (!a.hash) return null;
      let b = null;
      $g(iy, (c) => {
        !b && ly(a, c) && (b = jy[c]);
      });
      return b;
    },
    qG = (a, b) => {
      const c = hm(a).tagSpecificState[1] || null;
      null != c &&
        null == c.debugCard &&
        $g(ky, (d) => {
          !c.debugCardRequested &&
            "number" === typeof d &&
            oy(d, a.location) &&
            ((c.debugCardRequested = !0),
            pG(a, b, (e) => {
              c.debugCard = e.createDebugCard(d, a);
            }));
        });
    },
    sG = (a, b, c) => {
      if (!b) return null;
      const d = hm(b);
      let e = 0;
      $g(le, (f) => {
        const g = iG[f];
        g && 0 === rG(a, b, f, c) && (e |= g);
      });
      d.wasPlaTagProcessed && (e |= 256);
      a.google_reactive_tag_first && (e |= 1024);
      return e ? "" + e : null;
    },
    tG = (a, b, c) => {
      const d = [];
      $g(le, (e) => {
        if (U(Lq) || (3 !== e && 4 !== e)) {
          var f = rG(b, a, e, c);
          0 !== f && d.push(e + ":" + f);
        }
      });
      return d.join(",") || null;
    },
    uG = (a) => {
      const b = [],
        c = {};
      $g(a, (d, e) => {
        if ((e = fm[e]) && !c[e]) {
          c[e] = !0;
          if (d) d = 1;
          else if (!1 === d) d = 2;
          else return;
          b.push(e + ":" + d);
        }
      });
      return b.join(",");
    },
    vG = (a) => {
      a = a.overlays;
      if (!a) return "";
      a = a.bottom;
      return "boolean" === typeof a ? (a ? "1" : "0") : "";
    },
    rG = (a, b, c, d) => {
      if (!b) return 256;
      let e = 0;
      const f = hm(b),
        g = qm(f, c);
      if (a.google_reactive_ad_format == c || g) e |= 64;
      let h = !1;
      $g(f.reactiveTypeDisabledByPublisher, (k, l) => {
        String(c) === String(l) && (h = !0);
      });
      h && oG(b.location) !== c && (e |= 128);
      return e | kG(b, a, c, d);
    },
    wG = (a, b) => {
      if (a) {
        var c = hm(a),
          d = {};
        $g(b, (e, f) => {
          (f = fm[f]) && (!1 === e || /^false$/i.test(e)) && (d[f] = !0);
        });
        $g(le, (e) => {
          d[gm[e]] && (c.reactiveTypeDisabledByPublisher[e] = !0);
        });
      }
    },
    xG = (a, b, c) => {
      b = xl.ta(b, c);
      return yv(
        1,
        window,
        ye(
          a,
          O(Lr).j(Xp.j, Xp.defaultValue)
            ? { bust: O(Lr).j(Xp.j, Xp.defaultValue) }
            : {}
        )
      ).then(b);
    },
    pG = (a, b, c) => {
      c = xl.ta(212, c);
      yv(3, a, b).then(c);
    };
  const yG = (a) => {
    a.adsbygoogle ||
      ((a.adsbygoogle = []),
      Wg(
        a.document,
        N`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`
      ));
  };
  var zG = (a, b) => {
      L(a, "load", () => {
        yG(a);
        a.adsbygoogle.push(b);
      });
    },
    AG = (a) => {
      a = a.google_reactive_ad_format;
      return ke(a) ? "" + a : null;
    },
    mG = (a) => !!AG(a) || null != a.google_pgb_reactive,
    BG = (a) => {
      a = AG(a);
      return 26 == a || 27 == a || 30 == a || 16 == a || 40 == a;
    };
  function CG(a) {
    return "number" === typeof a.google_reactive_sra_index;
  }
  function DG(a, b, c) {
    const d = b.L || b.pubWin,
      e = b.H;
    e.google_reactive_plat = tG(d, e, c);
    var f = uG(a);
    f && (e.google_reactive_plaf = f);
    (f = vG(a)) && (e.google_reactive_fba = f);
    (f = $F(d)) && (e.google_plas = f);
    EG(a, e);
    f = oG(b.pubWin.location);
    FG(a, f, e);
    f
      ? ((e.fra = f), (e.google_pgb_reactive = 6))
      : (e.google_pgb_reactive = 5);
    SF(e);
    U(rq) && (e.fsapi = !0);
    ei() || Ur(b.pubWin.top);
    f = El(
      b.pubWin,
      "rsrai",
      zl(429, (g, h) => GG(b, d, e.google_ad_client, a, g, h, c)),
      zl(430, (g, h) => vm(b.pubWin, "431", Zi, h))
    );
    b.A.push(f);
    hm(d).wasReactiveTagRequestSent = !0;
    HG(b, a, c);
  }
  function HG(a, b, c) {
    const d = a.H,
      e = Ca(b.page_level_pubvars) ? b.page_level_pubvars : {};
    b = El(
      a.pubWin,
      "apcnf",
      zl(353, (f, g) => {
        var h = a.pubWin,
          k = d.google_ad_client,
          l = a.ca.tb,
          m = a.ca.oc,
          n = a.ca.Db;
        return vh(g.origin) ? gF(h, k, e, f.config, c, l, m, null, n) : !1;
      }),
      zl(353, (f, g) => vm(a.pubWin, "353", Zi, g))
    );
    a.A.push(b);
  }
  function GG(a, b, c, d, e, f, g) {
    if (!vh(f.origin)) return !1;
    f = e.data;
    if (!Array.isArray(f)) return !1;
    if (!YC(b, 1)) return !0;
    f && Yl(6, [f]);
    e = e.amaConfig;
    const h = [],
      k = [],
      l = hm(b);
    let m = null;
    for (let n = 0; n < f.length; n++) {
      if (!f[n]) continue;
      const q = f[n],
        r = q.adFormat;
      l && q.enabledInAsfe && (l.reactiveTypeEnabledInAsfe[r] = !0);
      if (!q.noCreative) {
        q.google_reactive_sra_index = n;
        if (9 === r && e) {
          q.pubVars = Object.assign(q.pubVars || {}, IG(d, q));
          const y = new eA();
          if (Zz(y, q)) {
            m = y;
            continue;
          }
        }
        h.push(q);
        k.push(r);
      }
    }
    h.length &&
      (Al("rasra::pm", { rt: k.join(","), c }, 0.1),
      xG(a.ca.ae, 522, (n) => {
        JG(h, b, c, n, d, g);
      }));
    e && gF(b, c, d, e, g, a.ca.tb, a.ca.oc, m);
    return !0;
  }
  function IG(a, b) {
    const c = b.adFormat,
      d = b.adKey;
    delete b.adKey;
    const e = {};
    a = a.page_level_pubvars;
    Ca(a) && Object.assign(e, a);
    e.google_ad_unit_key = d;
    e.google_reactive_sra_index = b.google_reactive_sra_index;
    30 === c && (e.google_reactive_ad_format = 30);
    e.google_pgb_reactive = e.google_pgb_reactive || 5;
    return (b.pubVars = e);
  }
  function JG(a, b, c, d, e, f) {
    const g = [];
    for (let h = 0; h < a.length; h++) {
      const k = a[h],
        l = k.adFormat,
        m = k.adKey,
        n = d.configProcessorForAdFormat(l);
      l && n && m
        ? ((k.pubVars = IG(e, k)),
          delete k.google_reactive_sra_index,
          g.push(l),
          yl(466, () => n.verifyAndProcessConfig(b, k, f)))
        : Al("rasra::ivc", { af: l, ak: m, c }, 0.1);
    }
    Al("rasra::pr", { rt: g.join(","), c }, 0.1);
  }
  function EG(a, b) {
    const c = [];
    let d = !1;
    $g(fm, (e, f) => {
      let g;
      if (a.hasOwnProperty(f)) {
        const h = a[f];
        Ca(h) && h.google_ad_channel && (g = String(h.google_ad_channel));
      }
      f = fm[f] - 1;
      (c[f] && "+" != c[f]) ||
        ((c[f] = g ? g.replace(/,/g, "+") : "+"), (d = d || g));
    });
    d && (b.google_reactive_sra_channels = c.join(","));
  }
  function FG(a, b, c) {
    const d = a.page_level_pubvars;
    !c.google_adtest &&
      ("on" == a.google_adtest || (d && "on" == d.google_adtest) || b) &&
      (c.google_adtest = "on");
  }
  Lb("script");
  var KG = {
    "image-top": 0,
    "image-middle": 1,
    "image-side": 2,
    "text-only": 3,
    "in-article": 4,
  };
  function LG(a, b) {
    if (!es(b, a)) return () => {};
    a = MG(b, a);
    if (!a) return () => {};
    const c = jD();
    b = ne(b);
    const d = { La: a, H: b, offsetWidth: a.offsetWidth };
    c.push(d);
    return () => Bb(c, d);
  }
  function MG(a, b) {
    a = b.document.getElementById(a.google_async_iframe_id);
    if (!a) return null;
    for (a = a.parentElement; a && !js.test(a.className); ) a = a.parentElement;
    return a;
  }
  function NG(a, b) {
    for (let g = 0; g < a.childNodes.length; g++) {
      const h = {},
        k = a.childNodes[g];
      var c = k.style,
        d = h,
        e = ["width", "height"];
      for (let l = 0; l < e.length; l++) {
        const m = "google_ad_" + e[l];
        if (!d.hasOwnProperty(m)) {
          var f = ih(c[e[l]]);
          f = null === f ? null : Math.round(f);
          null != f && (d[m] = f);
        }
      }
      if (
        h.google_ad_width == b.google_ad_width &&
        h.google_ad_height == b.google_ad_height
      )
        return k;
    }
    return null;
  }
  function OG(a, b) {
    a.style.display = b ? "inline-block" : "none";
    const c = a.parentElement;
    b
      ? (c.dataset.adStatus = a.dataset.adStatus)
      : ((a.dataset.adStatus = c.dataset.adStatus), delete c.dataset.adStatus);
  }
  function PG(a, b) {
    const c = b.innerHeight >= b.innerWidth ? 1 : 2;
    if (a.j != c) {
      a.j = c;
      a = jD();
      for (const d of a)
        if (
          d.La.offsetWidth != d.offsetWidth ||
          d.H.google_full_width_responsive_allowed
        )
          (d.offsetWidth = d.La.offsetWidth),
            yl(467, () => {
              var e = d.La,
                f = d.H;
              const g = NG(e, f);
              f.google_full_width_responsive_allowed &&
                ((e.style.marginLeft = f.gfwroml || ""),
                (e.style.marginRight = f.gfwromr || ""),
                (e.style.height = f.gfwroh ? f.gfwroh + "px" : ""),
                (e.style.width = f.gfwrow ? f.gfwrow + "px" : ""),
                (e.style.zIndex = f.gfwroz || ""),
                delete f.google_full_width_responsive_allowed);
              delete f.google_ad_format;
              delete f.google_ad_width;
              delete f.google_ad_height;
              delete f.google_content_recommendation_ui_type;
              delete f.google_content_recommendation_rows_num;
              delete f.google_content_recommendation_columns_num;
              b.google_spfd(e, f, b);
              const h = NG(e, f);
              !h && g && 1 == e.childNodes.length
                ? (OG(g, !1),
                  (f.google_reactive_ad_format = 16),
                  (f.google_ad_section = "responsive_resize"),
                  (e.dataset.adsbygoogleStatus = "reserved"),
                  (e.className += " adsbygoogle-noablate"),
                  yG(b),
                  b.adsbygoogle.push({ element: e, params: f }))
                : h && g
                ? h != g && (OG(g, !1), OG(h, !0))
                : Al("auto_size_refresh", {
                    context: "showOrHideElm",
                    url: b.location.href,
                    nodes: e.childNodes.length,
                  });
            });
    }
  }
  var QG = class extends Km {
    constructor() {
      super(...arguments);
      this.j = null;
    }
    init(a) {
      const b = ZC();
      if (!dD(b, 27, !1)) {
        eD(b, 27, !0);
        this.j = a.innerHeight >= a.innerWidth ? 1 : 2;
        var c = () => PG(this, a);
        L(a, "resize", c);
        Lm(this, () => {
          he(a, "resize", c);
        });
      }
    }
  };
  var RG = class {
    constructor(a, b, c) {
      this.L = a;
      this.La = b;
      this.H = c;
      this.j = null;
      this.l = this.A = 0;
    }
    B() {
      10 <= ++this.A && t.clearInterval(this.j);
      var a = hs(this.L, this.La);
      a = is(this.L, this.La, a);
      const b = ds(this.La, this.L);
      (null != b && 0 === b.x) || t.clearInterval(this.j);
      a &&
        (this.l++,
        Al(
          "rspv:al",
          {
            aligns: this.l,
            attempt: this.A,
            client: this.H.google_ad_client,
            eoffs: String(null != b ? b.x : null),
            eids: HF(this.H),
            slot: this.H.google_ad_slot,
            url: this.H.google_page_url,
          },
          0.01
        ));
    }
  };
  function SG(a, b) {
    var c = ZD(a, Az(b));
    c = w(c, 2, b.tcString);
    c = w(c, 4, b.addtlConsent || "");
    w(c, 7, b.internalErrorState);
    c = !Cz(b);
    w(a, 9, c);
    null != b.gdprApplies && w(a, 3, b.gdprApplies);
  }
  function TG(a) {
    const b = new Iz(a.pubWin, -1, U(Qq));
    if (!Ez(b)) return Promise.resolve(null);
    const c = ZC(),
      d = dD(c, 24);
    if (d) return Promise.resolve(d);
    const e = new Promise((f) => {
      f = { resolve: f };
      const g = dD(c, 25, []);
      g.push(f);
      eD(c, 25, g);
    });
    d ||
      null === d ||
      (eD(c, 24, null),
      b.addEventListener((f) => {
        if (zz(f)) {
          eD(c, 24, f);
          SG(a.l, f);
          for (const g of dD(c, 25, [])) g.resolve(f);
          eD(c, 25, []);
        } else eD(c, 24, null);
      }));
    return e;
  }
  function UG(a, b, c = 1e5) {
    a -= b;
    return a >= c ? "M" : 0 <= a ? a : "-M";
  }
  var WG = (a, b, c) => {
    const d = b.parentElement?.classList.contains("adsbygoogle")
      ? b.parentElement
      : b;
    c.addEventListener("load", () => VG(d));
    return El(a, "adpnt", (e, f) => {
      if (rm(f, c.contentWindow)) {
        e = um(e).qid;
        try {
          c.setAttribute("data-google-query-id", e);
          a.googletag ?? (a.googletag = { cmd: [] });
          var g = a.googletag.queryIds ?? [];
          g.push(e);
          500 < g.length && g.shift();
          a.googletag.queryIds = g;
        } catch {}
        d.dataset.adStatus &&
          Al("adsense_late_fill", { status: d.dataset.adStatus });
        d.dataset.adStatus = "filled";
        g = !0;
      } else g = !1;
      return g;
    });
  };
  function VG(a) {
    setTimeout(() => {
      "filled" !== a.dataset.adStatus && (a.dataset.adStatus = "unfilled");
    }, 1e3);
  }
  function XG(a, b, c) {
    try {
      if (!vh(c.origin) || (a.j && !rm(c, a.j.contentWindow))) return;
    } catch (f) {
      return;
    }
    const d = b.msg_type;
    let e;
    "string" === typeof d &&
      (e = a.Qa[d]) &&
      a.R.Bb(168, () => {
        e.call(a, b, c);
      });
  }
  class YG extends Km {
    constructor(a, b) {
      var c = xl,
        d = Zi;
      super();
      this.A = a;
      this.j = b;
      this.R = c;
      this.pa = d;
      this.Qa = {};
      this.ve = this.R.ta(168, (e, f) => void XG(this, e, f));
      this.Ie = this.R.ta(169, (e, f) => vm(this.A, "ras::xsf", this.pa, f));
      this.ba = [];
      this.va(this.Qa);
      this.ba.push(Dl(this.A, "sth", this.ve, this.Ie));
    }
    l() {
      for (const a of this.ba) a();
      this.ba.length = 0;
      super.l();
    }
  }
  class ZG extends YG {
    constructor(a, b = null) {
      super(a, b);
      this.A = a;
    }
  }
  var $G = class extends ZG {
    constructor(a, b) {
      super(a, b);
      this.B = () => {};
      this.j && L(this.j, "load", this.B);
    }
    l() {
      this.j && he(this.j, "load", this.B);
      super.l();
      this.j = null;
    }
    va(a) {
      a["adsense-labs"] = (b) => {
        if ((b = um(b).settings))
          try {
            var c = new $f(JSON.parse(b));
            if (null != v(c, 1)) {
              var d = this.A,
                e = v(c, 1) || "";
              if (U(Rp) ? null != cE({ win: d, Ub: zF() }).j : 1) {
                if (U(Rp)) {
                  const g = cE({ win: d, Ub: zF() });
                  var f = null != g.j ? AF(g.j.value) : {};
                } else f = AF(d.localStorage);
                null !== c && (f[e] = c.toJSON());
                try {
                  d.localStorage.setItem(
                    "google_adsense_settings",
                    JSON.stringify(f)
                  );
                } catch (g) {}
              }
            }
          } catch (g) {}
      };
    }
  };
  function aH(a) {
    a.B = a.F;
    a.J.style.transition = "height 500ms";
    a.D.style.transition = "height 500ms";
    a.G.style.transition = "height 500ms";
    a.j.style.transition = "height 500ms";
    bH(a);
  }
  function cH(a, b) {
    (a.j.contentWindow || a.j.contentWindow).postMessage(
      JSON.stringify({
        msg_type: "expand-on-scroll-result",
        eos_success: !0,
        eos_amount: b,
        googMsgType: "sth",
      }),
      "*"
    );
  }
  function bH(a) {
    const b = `rect(0px, ${a.j.width}px, ${a.B}px, 0px)`;
    a.j.style.clip = b;
    a.G.style.clip = b;
    a.j.setAttribute("height", a.B);
    a.j.style.height = a.B + "px";
    a.G.setAttribute("height", a.B);
    a.G.style.height = a.B + "px";
    a.D.style.height = a.B + "px";
    a.J.style.height = a.B + "px";
  }
  function dH(a, b) {
    b = gh(b.r_nh);
    a.F = null == b ? 0 : b;
    if (0 >= a.F) return "1";
    a.M = qi(a.J).y;
    a.K = sm(a.A);
    if (a.M + a.B < a.K) return "2";
    if (a.M > nm(a.A) - a.A.innerHeight) return "3";
    b = a.K;
    a.j.setAttribute("height", a.F);
    a.j.style.height = a.F + "px";
    a.G.style.overflow = "hidden";
    a.J.style.position = "relative";
    a.J.style.transition = "height 100ms";
    a.D.style.transition = "height 100ms";
    a.G.style.transition = "height 100ms";
    a.j.style.transition = "height 100ms";
    b = Math.min(b + a.A.innerHeight - a.M, a.B);
    ki(a.D, { position: "relative", top: "auto", bottom: "auto" });
    b = `rect(0px, ${a.j.width}px, ${b}px, 0px)`;
    ki(a.j, { clip: b });
    ki(a.G, { clip: b });
    return "0";
  }
  function eH(a, b = {}) {
    a.V && (b.eid = a.V);
    b.qid = a.Eb;
    Al("eoscrl", b, $l(String(a.Fb)));
  }
  class fH extends ZG {
    constructor(a, b) {
      super(a.L, b);
      this.G = a.innerInsElement;
      this.D = a.outerInsElement;
      this.J =
        this.D.parentElement &&
        this.D.parentElement.classList.contains("adsbygoogle")
          ? this.D.parentElement
          : this.D;
      this.B = parseInt(this.D.style.height, 10);
      this.V = null;
      this.Gb = this.Xc = !1;
      this.Eb = "";
      this.Da = this.K = this.F = 0;
      this.we = this.B / 5;
      this.M = qi(this.J).y;
      this.Fb = null;
      this.ue = Yd(
        zl(651, () => {
          this.M = qi(this.J).y;
          var c = this.K;
          this.K = sm(this.A);
          this.B < this.F
            ? ((c = this.K - c),
              0 < c &&
                ((this.Da += c),
                this.Da >= this.we
                  ? (aH(this), cH(this, this.F))
                  : ((this.B = Math.min(this.F, this.B + c)),
                    cH(this, c),
                    bH(this))))
            : he(this.A, "scroll", this.N);
        }),
        this
      );
      this.N = () => {
        var c = this.ue;
        fg.requestAnimationFrame ? fg.requestAnimationFrame(c) : c();
      };
    }
    va(a) {
      a["expand-on-scroll"] = (b, c) => {
        b = um(b);
        this.V = b.i_expid;
        this.Eb = b.qid;
        this.Fb = b.gen204_fraction;
        this.Xc ||
          ((this.Xc = !0),
          (b = dH(this, b)),
          "0" === b && L(this.A, "scroll", this.N, Zd),
          c.source.postMessage(
            JSON.stringify({
              msg_type: "expand-on-scroll-result",
              eos_success: "0" === b,
              googMsgType: "sth",
            }),
            "*"
          ),
          eH(this, { err: b }));
      };
      a["expand-on-scroll-force-expand"] = () => {
        this.Gb || ((this.Gb = !0), aH(this), he(this.A, "scroll", this.N));
      };
    }
    l() {
      this.N && he(this.A, "scroll", this.N, Zd);
      super.l();
    }
  }
  function gH(a) {
    const b = a.K.getBoundingClientRect(),
      c = 0 > b.top + b.height;
    return !(b.top > a.A.innerHeight) && !c;
  }
  class hH extends Km {
    constructor(a, b, c) {
      super();
      this.A = a;
      this.D = b;
      this.K = c;
      this.F = 0;
      this.B = gH(this);
      this.J = Xd(this.G, this);
      this.j = zl(433, () => {
        var d = this.J;
        fg.requestAnimationFrame ? fg.requestAnimationFrame(d) : d();
      });
      L(this.A, "scroll", this.j, Zd);
    }
    G() {
      const a = gH(this);
      if (a && !this.B) {
        var b = { rr: "vis-bcr" };
        const c = this.D.contentWindow;
        c &&
          (Fl(c, "ig", b, "*", 2),
          10 <= ++this.F && this.j && he(this.A, "scroll", this.j, Zd));
      }
      this.B = a;
    }
  }
  function iH(a) {
    return a.prerendering
      ? 3
      : { visible: 1, hidden: 2, prerender: 3, preview: 4, unloaded: 5 }[
          a.visibilityState ||
            a.webkitVisibilityState ||
            a.mozVisibilityState ||
            ""
        ] || 0;
  }
  function jH(a) {
    let b;
    a.visibilityState
      ? (b = "visibilitychange")
      : a.mozVisibilityState
      ? (b = "mozvisibilitychange")
      : a.webkitVisibilityState && (b = "webkitvisibilitychange");
    return b;
  }
  function kH(a) {
    return null != a.hidden
      ? a.hidden
      : null != a.mozHidden
      ? a.mozHidden
      : null != a.webkitHidden
      ? a.webkitHidden
      : null;
  }
  function lH(a, b) {
    Array.isArray(b) || (b = [b]);
    b = b.map(function (c) {
      return "string" === typeof c
        ? c
        : c.Oc + " " + c.duration + "s " + c.timing + " " + c.delay + "s";
    });
    ki(a, "transition", b.join(","));
  }
  var mH = Vd(function () {
    if (Ob) return !0;
    var a = Fg(document, "DIV"),
      b = Sb ? "-webkit" : Rb ? "-moz" : Ob ? "-ms" : null,
      c = { transition: "opacity 1s linear" };
    b && (c[b + "-transition"] = "opacity 1s linear");
    b = gf("div", { style: c });
    ig(a, b);
    a = a.firstChild;
    b = a.style[ug("transition")];
    return (
      "" != ("undefined" !== typeof b ? b : a.style[li(a, "transition")] || "")
    );
  });
  function nH(a, b, c) {
    0 > a.l[b].indexOf(c) && (a.l[b] += c);
  }
  function oH(a, b) {
    0 <= a.j.indexOf(b) || (a.j = b + a.j);
  }
  function pH(a, b) {
    0 > a.A.indexOf(b) && (a.A = b + a.A);
  }
  function qH(a, b, c, d) {
    return "" != a.A || b
      ? null
      : "" == a.j.replace(rH, "")
      ? (null != c && a.l[0]) || (null != d && a.l[1])
        ? !1
        : !0
      : !1;
  }
  function sH(a) {
    var b = qH(a, "", null, 0);
    if (null === b) return "XS";
    b = b ? "C" : "N";
    a = a.j;
    return 0 <= a.indexOf("a")
      ? b + "A"
      : 0 <= a.indexOf("f")
      ? b + "F"
      : b + "S";
  }
  var tH = class {
    constructor(a, b) {
      this.l = ["", ""];
      this.j = a || "";
      this.A = b || "";
    }
    toString() {
      return [this.l[0], this.l[1], this.j, this.A].join("|");
    }
  };
  function uH(a) {
    let b = a.V;
    a.J = function () {};
    vH(a, a.G, b);
    let c = a.G.parentElement;
    if (!c) return a.j;
    let d = !0,
      e = null;
    for (; c; ) {
      try {
        e = /^head|html$/i.test(c.nodeName) ? null : Yg(c, b);
      } catch (g) {
        pH(a.j, "c");
      }
      const f = wH(a, b, c, e);
      c.classList.contains("adsbygoogle") &&
        e &&
        (/^\-.*/.test(e["margin-left"]) || /^\-.*/.test(e["margin-right"])) &&
        (a.R = !0);
      if (d && !f && xH(e)) {
        oH(a.j, "l");
        a.K = c;
        break;
      }
      d = d && f;
      if (e && yH(a, e)) break;
      c = c.parentElement;
      if (!c) {
        if (b === a.Fb) break;
        try {
          if (((c = b.frameElement), (b = b.parent), !Sg(b))) {
            oH(a.j, "c");
            break;
          }
        } catch (g) {
          oH(a.j, "c");
          break;
        }
      }
    }
    a.I && a.B && zH(a);
    return a.j;
  }
  function AH(a) {
    function b() {
      BH(c, f, g);
      if (h && !k && !g) {
        const l = function (m) {
          for (let n = 0; n < m.length; n++) ki(h, m[n], "0px");
        };
        l(CH);
        l(DH);
      }
    }
    const c = a.G;
    c.style.overflow = a.Eb ? "visible" : "hidden";
    a.I &&
      (a.K
        ? (lH(c, EH), lH(a.K, EH))
        : lH(
            c,
            "opacity 1s cubic-bezier(.4, 0, 1, 1), width .2s cubic-bezier(.4, 0, 1, 1) .3s, height .5s cubic-bezier(.4, 0, 1, 1)"
          ));
    null !== a.N && (c.style.opacity = a.N);
    const d = null != a.F && null != a.A && (a.va || a.A > a.F) ? a.A : null,
      e = null != a.D && null != a.l && (a.va || a.l > a.D) ? a.l : null;
    if (a.M) {
      const l = a.M.length;
      for (let m = 0; m < l; m++) BH(a.M[m], d, e);
    }
    const f = a.A,
      g = a.l,
      h = a.K,
      k = a.R;
    a.I ? t.setTimeout(b, 1e3) : b();
  }
  function FH(a) {
    if ((a.B && !a.Qa) || (null == a.A && null == a.l && null == a.N && a.B))
      return a.j;
    var b = a.B;
    a.B = !1;
    uH(a);
    a.B = b;
    if (!b || (null != a.ba && !qH(a.j, a.ba, a.A, a.l))) return a.j;
    0 <= a.j.j.indexOf("n") && ((a.F = null), (a.D = null));
    if ((null == a.F && null !== a.A) || (null == a.D && null !== a.l))
      a.I = !1;
    (0 == a.A || 0 == a.l) && 0 <= a.j.j.indexOf("l") && ((a.A = 0), (a.l = 0));
    b = a.j;
    b.l[0] = "";
    b.l[1] = "";
    b.j = "";
    b.A = "";
    AH(a);
    return uH(a);
  }
  function yH(a, b) {
    let c = !1;
    "none" == b.display && (oH(a.j, "n"), a.B && (c = !0));
    ("hidden" != b.visibility && "collapse" != b.visibility) || oH(a.j, "v");
    "hidden" == b.overflow && oH(a.j, "o");
    "absolute" == b.position
      ? (oH(a.j, "a"), (c = !0))
      : "fixed" == b.position && (oH(a.j, "f"), (c = !0));
    return c;
  }
  function vH(a, b, c) {
    let d = 0;
    if (!b || !b.parentElement) return !0;
    let e = !1,
      f = 0;
    const g = b.parentElement.childNodes;
    for (let k = 0; k < g.length; k++) {
      var h = g[k];
      h == b ? (e = !0) : ((h = GH(a, h, c)), (d |= h), e && (f |= h));
    }
    f & 1 && (d & 2 && nH(a.j, 0, "o"), d & 4 && nH(a.j, 1, "o"));
    return !(d & 1);
  }
  function wH(a, b, c, d) {
    let e = null;
    try {
      e = c.style;
    } catch (E) {
      pH(a.j, "s");
    }
    var f = c.getAttribute("width"),
      g = gh(f),
      h = c.getAttribute("height"),
      k = gh(h),
      l = (d && /^block$/.test(d.display)) || (e && /^block$/.test(e.display));
    b = vH(a, c, b);
    var m = d && d.width;
    const n = d && d.height;
    var q = e && e.width,
      r = e && e.height,
      y = ih(m) == a.F && ih(n) == a.D;
    m = y ? m : q;
    r = y ? n : r;
    q = ih(m);
    y = ih(r);
    g = null !== a.F && ((null !== q && a.F >= q) || (null !== g && a.F >= g));
    y = null !== a.D && ((null !== y && a.D >= y) || (null !== k && a.D >= k));
    k = !b && xH(d);
    y =
      b ||
      y ||
      k ||
      !(f || m || (d && (!HH(String(d.minWidth)) || !IH(String(d.maxWidth)))));
    l =
      b ||
      g ||
      k ||
      l ||
      !(
        h ||
        r ||
        (d && (!HH(String(d.minHeight)) || !IH(String(d.maxHeight))))
      );
    JH(a, 0, y, c, "width", f, a.F, a.A);
    KH(a, 0, "d", y, e, d, "width", m, a.F, a.A);
    KH(a, 0, "m", y, e, d, "minWidth", e && e.minWidth, a.F, a.A);
    KH(a, 0, "M", y, e, d, "maxWidth", e && e.maxWidth, a.F, a.A);
    a.Gb
      ? ((c = /^html|body$/i.test(c.nodeName)),
        (f = ih(n)),
        (h = d ? "auto" === d.overflowY || "scroll" === d.overflowY : !1),
        (h =
          null != a.l &&
          d &&
          f &&
          Math.round(f) !== a.l &&
          !h &&
          "100%" !== d.minHeight),
        a.B &&
          !c &&
          h &&
          (e.setProperty("height", "auto", "important"),
          d &&
            !HH(String(d.minHeight)) &&
            e.setProperty("min-height", "0px", "important"),
          d &&
            !IH(String(d.maxHeight)) &&
            a.l &&
            Math.round(f) < a.l &&
            e.setProperty("max-height", "none", "important")))
      : (JH(a, 1, l, c, "height", h, a.D, a.l),
        KH(a, 1, "d", l, e, d, "height", r, a.D, a.l),
        KH(a, 1, "m", l, e, d, "minHeight", e && e.minHeight, a.D, a.l),
        KH(a, 1, "M", l, e, d, "maxHeight", e && e.maxHeight, a.D, a.l));
    return b;
  }
  function zH(a) {
    function b() {
      if (0 < c) {
        var l = Yg(e, d) || {};
        const m = ih(l.width);
        l = ih(l.height);
        null !== m && null !== f && h && h(0, f - m);
        null !== l && null !== g && h && h(1, g - l);
        --c;
      } else t.clearInterval(k), h && (h(0, 0), h(1, 0));
    }
    let c = 31.25;
    const d = a.V,
      e = a.G,
      f = a.A,
      g = a.l,
      h = a.J;
    let k;
    t.setTimeout(function () {
      k = t.setInterval(b, 16);
    }, 990);
  }
  function GH(a, b, c) {
    if (3 == b.nodeType) return /\S/.test(b.data) ? 1 : 0;
    if (1 == b.nodeType) {
      if (/^(head|script|style)$/i.test(b.nodeName)) return 0;
      let d = null;
      try {
        d = Yg(b, c);
      } catch (e) {}
      if (d) {
        if ("none" == d.display || "fixed" == d.position) return 0;
        if ("absolute" == d.position) {
          if (
            !a.C.boundingClientRect ||
            "hidden" == d.visibility ||
            "collapse" == d.visibility
          )
            return 0;
          c = null;
          try {
            c = b.getBoundingClientRect();
          } catch (e) {
            return 0;
          }
          return (
            (c.right > a.C.boundingClientRect.left ? 2 : 0) |
            (c.bottom > a.C.boundingClientRect.top ? 4 : 0)
          );
        }
      }
      return 1;
    }
    return 0;
  }
  function JH(a, b, c, d, e, f, g, h) {
    if (null != h) {
      if ("string" == typeof f) {
        if ("100%" == f || !f) return;
        f = gh(f);
        null == f && (pH(a.j, "n"), nH(a.j, b, "d"));
      }
      if (null != f)
        if (c) {
          if (a.B)
            if (a.I) {
              const k = Math.max(f + h - (g || 0), 0),
                l = a.J;
              a.J = function (m, n) {
                m == b && d.setAttribute(e, k - n);
                l && l(m, n);
              };
            } else d.setAttribute(e, h);
        } else nH(a.j, b, "d");
    }
  }
  function KH(a, b, c, d, e, f, g, h, k, l) {
    if (null != l) {
      f = f && f[g];
      "string" != typeof f ||
        ("m" == c ? HH(f) : IH(f)) ||
        ((f = ih(f)),
        null == f ? oH(a.j, "p") : null != k && oH(a.j, f == k ? "E" : "e"));
      if ("string" == typeof h) {
        if ("m" == c ? HH(h) : IH(h)) return;
        h = ih(h);
        null == h && (pH(a.j, "p"), nH(a.j, b, c));
      }
      if (null != h)
        if (d && e) {
          if (a.B)
            if (a.I) {
              const m = Math.max(h + l - (k || 0), 0),
                n = a.J;
              a.J = function (q, r) {
                q == b && (e[g] = m - r + "px");
                n && n(q, r);
              };
            } else e[g] = l + "px";
        } else nH(a.j, b, c);
    }
  }
  var PH = class {
    constructor(a, b, c, d, e, f, g) {
      this.Fb = a;
      this.M = c;
      this.G = b;
      this.V = (a = this.G.ownerDocument) && (a.defaultView || a.parentWindow);
      this.C = new LH(this.G);
      this.B = g;
      this.Qa = MH(this.C, d.Uc, d.height, d.ee);
      this.F = this.B
        ? this.C.boundingClientRect
          ? this.C.boundingClientRect.right - this.C.boundingClientRect.left
          : null
        : e;
      this.D = this.B
        ? this.C.boundingClientRect
          ? this.C.boundingClientRect.bottom - this.C.boundingClientRect.top
          : null
        : f;
      this.A = NH(d.width);
      this.l = NH(d.height);
      this.N = this.B ? NH(d.opacity) : null;
      this.ba = d.check;
      this.I = "animate" == d.Uc && !OH(this.C, this.l, this.Da) && mH();
      this.Eb = !!d.dd;
      this.j = new tH();
      OH(this.C, this.l, this.Da) && oH(this.j, "r");
      e = this.C;
      e.j && e.l >= e.A && oH(this.j, "b");
      this.K = this.J = null;
      this.R = !1;
      this.va = !!d.Lf;
      this.Gb = !!d.Nf;
      this.Da = !!d.ee;
    }
  };
  function OH(a, b, c) {
    var d;
    (d = a.j) &&
      !(d = !a.B) &&
      (c
        ? ((b = a.l + Math.min(b, NH(a.getHeight()))), (a = a.j && b >= a.A))
        : (a = a.j && a.l >= a.A),
      (d = a));
    return d;
  }
  var LH = class {
    constructor(a) {
      var b = a && a.ownerDocument,
        c = b && (b.defaultView || b.parentWindow);
      c = c && Vg(c);
      this.j = !!c;
      this.boundingClientRect = null;
      if (a)
        try {
          this.boundingClientRect = a.getBoundingClientRect();
        } catch (g) {}
      var d = a;
      let e = 0,
        f = this.boundingClientRect;
      for (; d; )
        try {
          f && (e += f.top);
          const g = d.ownerDocument,
            h = g && (g.defaultView || g.parentWindow);
          (d = h && h.frameElement) && (f = d.getBoundingClientRect());
        } catch (g) {
          break;
        }
      this.l = e;
      c = c || t;
      this.A = (
        "CSS1Compat" == c.document.compatMode
          ? c.document.documentElement
          : c.document.body
      ).clientHeight;
      b = b && iH(b);
      this.B =
        !!a &&
        !(2 == b || 3 == b) &&
        !(
          this.boundingClientRect &&
          this.boundingClientRect.top >= this.boundingClientRect.bottom &&
          this.boundingClientRect.left >= this.boundingClientRect.right
        );
    }
    isVisible() {
      return this.B;
    }
    getWidth() {
      return this.boundingClientRect
        ? this.boundingClientRect.right - this.boundingClientRect.left
        : null;
    }
    getHeight() {
      return this.boundingClientRect
        ? this.boundingClientRect.bottom - this.boundingClientRect.top
        : null;
    }
  };
  function MH(a, b, c, d) {
    switch (b) {
      case "no_rsz":
        return !1;
      case "force":
      case "animate":
        return !0;
      default:
        return OH(a, c, d);
    }
  }
  function xH(a) {
    return !!a && /^left|right$/.test(a.cssFloat || a.styleFloat);
  }
  function QH(a, b, c, d) {
    return FH(new PH(a, b, d, c, null, null, !0));
  }
  var RH = new tH("s", ""),
    rH = RegExp("[lonvafrbpEe]", "g");
  function IH(a) {
    return !a || /^(auto|none|100%)$/.test(a);
  }
  function HH(a) {
    return !a || /^(0px|auto|none|0%)$/.test(a);
  }
  function BH(a, b, c) {
    null !== b &&
      null !== gh(a.getAttribute("width")) &&
      a.setAttribute("width", b);
    null !== c &&
      null !== gh(a.getAttribute("height")) &&
      a.setAttribute("height", c);
    null !== b && (a.style.width = b + "px");
    null !== c && (a.style.height = c + "px");
  }
  var CH =
      "margin-left margin-right padding-left padding-right border-left-width border-right-width".split(
        " "
      ),
    DH =
      "margin-top margin-bottom padding-top padding-bottom border-top-width border-bottom-width".split(
        " "
      );
  let SH =
      "opacity 1s cubic-bezier(.4, 0, 1, 1), width .2s cubic-bezier(.4, 0, 1, 1), height .3s cubic-bezier(.4, 0, 1, 1) .2s",
    TH = CH;
  for (let a = 0; a < TH.length; a++)
    SH += ", " + TH[a] + " .2s cubic-bezier(.4, 0, 1, 1)";
  TH = DH;
  for (let a = 0; a < TH.length; a++)
    SH += ", " + TH[a] + " .3s cubic-bezier(.4, 0, 1, 1) .2s";
  var EH = SH;
  function NH(a) {
    return "string" === typeof a
      ? gh(a)
      : "number" === typeof a && isFinite(a)
      ? a
      : null;
  }
  function UH(a, b, c) {
    const d = { scrl: sm(a.A || window), adk: a.F, adf: a.D, fmt: a.B };
    b &&
      ((d.str = OH(b, gh(c.r_nh), hh(c.r_cab))), (d.ad_y = b.l), (d.vph = b.A));
    $g(c, (e, f) => {
      d[f] = e;
    });
    return d;
  }
  function VH(a, b, c) {
    const d = $l(String(b.gen204_fraction));
    b = UH(a, c, b);
    b.url = a.A.document.URL;
    Al("resize", b, d);
  }
  var WH = class extends ZG {
    constructor(a, b, c) {
      super(a, b);
      this.F = String(c.google_ad_unit_key || "");
      this.D = String(c.google_ad_dom_fingerprint || "");
      this.B = String(c.google_ad_format || "");
    }
    va(a) {
      a["resize-me"] = (b, c) => {
        b = um(b);
        var d = b.r_chk;
        if (null == d || "" === d) {
          var e = gh(b.r_nw),
            f = gh(b.r_nh),
            g = gh(b.r_no);
          null != g || (0 !== e && 0 !== f) || (g = 0);
          var h = b.r_str;
          h = h ? h : null;
          {
            var k = g,
              l = hh(b.r_ao),
              m = hh(b.r_ifr),
              n = hh(b.r_cab);
            const r = window;
            if (this.j && r)
              if ("no_rsz" === h) (b.err = "7"), VH(this, b, null), (f = !0);
              else if (((g = new LH(this.j)), g.j)) {
                var q = g.getWidth();
                null != q && (b.w = q);
                q = g.getHeight();
                null != q && (b.h = q);
                if (MH(g, h, f, n)) {
                  const y = this.j.ownerDocument.getElementById(
                    this.j.id + "_host"
                  );
                  q = y || this.j;
                  d = QH(
                    r,
                    q,
                    {
                      width: e,
                      height: f,
                      opacity: k,
                      check: d,
                      Uc: h,
                      dd: l,
                      Lf: m,
                      ee: n,
                    },
                    y ? [this.j] : null
                  );
                  b.r_cui &&
                    hh(b.r_cui.toString()) &&
                    M(q, {
                      height: (null === f ? 0 : f - 48) + "px",
                      top: "24px",
                    });
                  null != e && (b.nw = e);
                  null != f && (b.nh = f);
                  b.rsz = d.toString();
                  b.abl = sH(d);
                  b.frsz = ("force" === h).toString();
                  b.err = "0";
                  VH(this, b, g);
                  f = !0;
                } else (b.err = "1"), VH(this, b, g), (f = !1);
              } else (b.err = "3"), VH(this, b, null), (f = !1);
            else (b.err = "2"), VH(this, b, null), (f = !1);
          }
          e = { msg_type: "resize-result" };
          e.r_str = h;
          e.r_status = f;
          c = c.source;
          e.googMsgType = "sth";
          c.postMessage(JSON.stringify(e), "*");
          this.j.dataset.googleQueryId ||
            this.j.setAttribute("data-google-query-id", b.qid);
        }
      };
    }
    l() {
      super.l();
      this.j = null;
    }
  };
  const XH = {
    google: 1,
    googlegroups: 1,
    gmail: 1,
    googlemail: 1,
    googleimages: 1,
    googleprint: 1,
  };
  const YH = /^blogger$/,
    ZH = /^wordpress(.|\s|$)/i,
    $H = /^joomla!/i,
    aI = /^drupal/i,
    bI = /\/wp-content\//,
    cI = /\/wp-content\/plugins\/advanced-ads/,
    dI = /\/wp-content\/themes\/genesis/,
    eI = /\/wp-content\/plugins\/genesis/;
  function fI(a) {
    var b = a.getElementsByTagName("script"),
      c = b.length;
    for (var d = 0; d < c; ++d) {
      var e = b[d];
      if (e.hasAttribute("src")) {
        e = e.getAttribute("src") || "";
        if (cI.test(e)) return 5;
        if (eI.test(e)) return 6;
      }
    }
    b = a.getElementsByTagName("link");
    c = b.length;
    for (d = 0; d < c; ++d)
      if (
        ((e = b[d]),
        e.hasAttribute("href") &&
          ((e = e.getAttribute("href") || ""), dI.test(e) || eI.test(e)))
      )
        return 6;
    a = a.getElementsByTagName("meta");
    d = a.length;
    for (e = 0; e < d; ++e) {
      var f = a[e];
      if ("generator" == f.getAttribute("name") && f.hasAttribute("content")) {
        f = f.getAttribute("content") || "";
        if (YH.test(f)) return 1;
        if (ZH.test(f)) return 2;
        if ($H.test(f)) return 3;
        if (aI.test(f)) return 4;
      }
    }
    for (a = 0; a < c; ++a)
      if (
        ((d = b[a]),
        "stylesheet" == d.getAttribute("rel") &&
          d.hasAttribute("href") &&
          ((d = d.getAttribute("href") || ""), bI.test(d)))
      )
        return 2;
    return 0;
  }
  let gI = navigator;
  var hI = (a) => {
      let b = 1;
      let c;
      if (void 0 != a && "" != a)
        for (b = 0, c = a.length - 1; 0 <= c; c--) {
          var d = a.charCodeAt(c);
          b = ((b << 6) & 268435455) + d + (d << 14);
          d = b & 266338304;
          b = 0 != d ? b ^ (d >> 21) : b;
        }
      return b;
    },
    iI = (a, b) => {
      if (!a || "none" == a) return 1;
      a = String(a);
      "auto" == a &&
        ((a = b),
        "www." == a.substring(0, 4) && (a = a.substring(4, a.length)));
      return hI(a.toLowerCase());
    };
  const jI = RegExp("^\\s*_ga=\\s*1\\.(\\d+)[^.]*\\.(.*?)\\s*$"),
    kI = RegExp("^[^=]+=\\s*GA1\\.(\\d+)[^.]*\\.(.*?)\\s*$"),
    lI = RegExp("^\\s*_ga=\\s*()(amp-[\\w.-]{22,64})$");
  var mI = () => {
    const a = new Zr();
    t.SVGElement && t.document.createElementNS && a.set(0);
    const b = nh();
    b["allow-top-navigation-by-user-activation"] && a.set(1);
    b["allow-popups-to-escape-sandbox"] && a.set(2);
    t.crypto && t.crypto.subtle && a.set(3);
    t.TextDecoder && t.TextEncoder && a.set(4);
    return Yr(a);
  };
  var nI = new Map(
    [
      [
        ".google.com",
        (a) => N`https://adservice.google.com/adsid/integrator.${a}`,
      ],
      [
        ".google.ad",
        (a) => N`https://adservice.google.ad/adsid/integrator.${a}`,
      ],
      [
        ".google.ae",
        (a) => N`https://adservice.google.ae/adsid/integrator.${a}`,
      ],
      [
        ".google.com.af",
        (a) => N`https://adservice.google.com.af/adsid/integrator.${a}`,
      ],
      [
        ".google.com.ag",
        (a) => N`https://adservice.google.com.ag/adsid/integrator.${a}`,
      ],
      [
        ".google.com.ai",
        (a) => N`https://adservice.google.com.ai/adsid/integrator.${a}`,
      ],
      [
        ".google.al",
        (a) => N`https://adservice.google.al/adsid/integrator.${a}`,
      ],
      [
        ".google.co.ao",
        (a) => N`https://adservice.google.co.ao/adsid/integrator.${a}`,
      ],
      [
        ".google.com.ar",
        (a) => N`https://adservice.google.com.ar/adsid/integrator.${a}`,
      ],
      [
        ".google.as",
        (a) => N`https://adservice.google.as/adsid/integrator.${a}`,
      ],
      [
        ".google.at",
        (a) => N`https://adservice.google.at/adsid/integrator.${a}`,
      ],
      [
        ".google.com.au",
        (a) => N`https://adservice.google.com.au/adsid/integrator.${a}`,
      ],
      [
        ".google.az",
        (a) => N`https://adservice.google.az/adsid/integrator.${a}`,
      ],
      [
        ".google.com.bd",
        (a) => N`https://adservice.google.com.bd/adsid/integrator.${a}`,
      ],
      [
        ".google.be",
        (a) => N`https://adservice.google.be/adsid/integrator.${a}`,
      ],
      [
        ".google.bf",
        (a) => N`https://adservice.google.bf/adsid/integrator.${a}`,
      ],
      [
        ".google.bg",
        (a) => N`https://adservice.google.bg/adsid/integrator.${a}`,
      ],
      [
        ".google.com.bh",
        (a) => N`https://adservice.google.com.bh/adsid/integrator.${a}`,
      ],
      [
        ".google.bi",
        (a) => N`https://adservice.google.bi/adsid/integrator.${a}`,
      ],
      [
        ".google.bj",
        (a) => N`https://adservice.google.bj/adsid/integrator.${a}`,
      ],
      [
        ".google.com.bn",
        (a) => N`https://adservice.google.com.bn/adsid/integrator.${a}`,
      ],
      [
        ".google.com.bo",
        (a) => N`https://adservice.google.com.bo/adsid/integrator.${a}`,
      ],
      [
        ".google.com.br",
        (a) => N`https://adservice.google.com.br/adsid/integrator.${a}`,
      ],
      [
        ".google.bs",
        (a) => N`https://adservice.google.bs/adsid/integrator.${a}`,
      ],
      [
        ".google.bt",
        (a) => N`https://adservice.google.bt/adsid/integrator.${a}`,
      ],
      [
        ".google.co.bw",
        (a) => N`https://adservice.google.co.bw/adsid/integrator.${a}`,
      ],
      [
        ".google.com.bz",
        (a) => N`https://adservice.google.com.bz/adsid/integrator.${a}`,
      ],
      [
        ".google.ca",
        (a) => N`https://adservice.google.ca/adsid/integrator.${a}`,
      ],
      [
        ".google.cd",
        (a) => N`https://adservice.google.cd/adsid/integrator.${a}`,
      ],
      [
        ".google.cf",
        (a) => N`https://adservice.google.cf/adsid/integrator.${a}`,
      ],
      [
        ".google.cg",
        (a) => N`https://adservice.google.cg/adsid/integrator.${a}`,
      ],
      [
        ".google.ch",
        (a) => N`https://adservice.google.ch/adsid/integrator.${a}`,
      ],
      [
        ".google.ci",
        (a) => N`https://adservice.google.ci/adsid/integrator.${a}`,
      ],
      [
        ".google.co.ck",
        (a) => N`https://adservice.google.co.ck/adsid/integrator.${a}`,
      ],
      [
        ".google.cl",
        (a) => N`https://adservice.google.cl/adsid/integrator.${a}`,
      ],
      [
        ".google.cm",
        (a) => N`https://adservice.google.cm/adsid/integrator.${a}`,
      ],
      [
        ".google.com.co",
        (a) => N`https://adservice.google.com.co/adsid/integrator.${a}`,
      ],
      [
        ".google.co.cr",
        (a) => N`https://adservice.google.co.cr/adsid/integrator.${a}`,
      ],
      [
        ".google.com.cu",
        (a) => N`https://adservice.google.com.cu/adsid/integrator.${a}`,
      ],
      [
        ".google.cv",
        (a) => N`https://adservice.google.cv/adsid/integrator.${a}`,
      ],
      [
        ".google.com.cy",
        (a) => N`https://adservice.google.com.cy/adsid/integrator.${a}`,
      ],
      [
        ".google.cz",
        (a) => N`https://adservice.google.cz/adsid/integrator.${a}`,
      ],
      [
        ".google.de",
        (a) => N`https://adservice.google.de/adsid/integrator.${a}`,
      ],
      [
        ".google.dj",
        (a) => N`https://adservice.google.dj/adsid/integrator.${a}`,
      ],
      [
        ".google.dk",
        (a) => N`https://adservice.google.dk/adsid/integrator.${a}`,
      ],
      [
        ".google.dm",
        (a) => N`https://adservice.google.dm/adsid/integrator.${a}`,
      ],
      [
        ".google.dz",
        (a) => N`https://adservice.google.dz/adsid/integrator.${a}`,
      ],
      [
        ".google.com.ec",
        (a) => N`https://adservice.google.com.ec/adsid/integrator.${a}`,
      ],
      [
        ".google.ee",
        (a) => N`https://adservice.google.ee/adsid/integrator.${a}`,
      ],
      [
        ".google.com.eg",
        (a) => N`https://adservice.google.com.eg/adsid/integrator.${a}`,
      ],
      [
        ".google.es",
        (a) => N`https://adservice.google.es/adsid/integrator.${a}`,
      ],
      [
        ".google.com.et",
        (a) => N`https://adservice.google.com.et/adsid/integrator.${a}`,
      ],
      [
        ".google.fi",
        (a) => N`https://adservice.google.fi/adsid/integrator.${a}`,
      ],
      [
        ".google.com.fj",
        (a) => N`https://adservice.google.com.fj/adsid/integrator.${a}`,
      ],
      [
        ".google.fm",
        (a) => N`https://adservice.google.fm/adsid/integrator.${a}`,
      ],
      [
        ".google.fr",
        (a) => N`https://adservice.google.fr/adsid/integrator.${a}`,
      ],
      [
        ".google.ga",
        (a) => N`https://adservice.google.ga/adsid/integrator.${a}`,
      ],
      [
        ".google.ge",
        (a) => N`https://adservice.google.ge/adsid/integrator.${a}`,
      ],
      [
        ".google.gg",
        (a) => N`https://adservice.google.gg/adsid/integrator.${a}`,
      ],
      [
        ".google.com.gh",
        (a) => N`https://adservice.google.com.gh/adsid/integrator.${a}`,
      ],
      [
        ".google.com.gi",
        (a) => N`https://adservice.google.com.gi/adsid/integrator.${a}`,
      ],
      [
        ".google.gl",
        (a) => N`https://adservice.google.gl/adsid/integrator.${a}`,
      ],
      [
        ".google.gm",
        (a) => N`https://adservice.google.gm/adsid/integrator.${a}`,
      ],
      [
        ".google.gr",
        (a) => N`https://adservice.google.gr/adsid/integrator.${a}`,
      ],
      [
        ".google.com.gt",
        (a) => N`https://adservice.google.com.gt/adsid/integrator.${a}`,
      ],
      [
        ".google.gy",
        (a) => N`https://adservice.google.gy/adsid/integrator.${a}`,
      ],
      [
        ".google.com.hk",
        (a) => N`https://adservice.google.com.hk/adsid/integrator.${a}`,
      ],
      [
        ".google.hn",
        (a) => N`https://adservice.google.hn/adsid/integrator.${a}`,
      ],
      [
        ".google.hr",
        (a) => N`https://adservice.google.hr/adsid/integrator.${a}`,
      ],
      [
        ".google.ht",
        (a) => N`https://adservice.google.ht/adsid/integrator.${a}`,
      ],
      [
        ".google.hu",
        (a) => N`https://adservice.google.hu/adsid/integrator.${a}`,
      ],
      [
        ".google.co.id",
        (a) => N`https://adservice.google.co.id/adsid/integrator.${a}`,
      ],
      [
        ".google.ie",
        (a) => N`https://adservice.google.ie/adsid/integrator.${a}`,
      ],
      [
        ".google.co.il",
        (a) => N`https://adservice.google.co.il/adsid/integrator.${a}`,
      ],
      [
        ".google.im",
        (a) => N`https://adservice.google.im/adsid/integrator.${a}`,
      ],
      [
        ".google.co.in",
        (a) => N`https://adservice.google.co.in/adsid/integrator.${a}`,
      ],
      [
        ".google.iq",
        (a) => N`https://adservice.google.iq/adsid/integrator.${a}`,
      ],
      [
        ".google.is",
        (a) => N`https://adservice.google.is/adsid/integrator.${a}`,
      ],
      [
        ".google.it",
        (a) => N`https://adservice.google.it/adsid/integrator.${a}`,
      ],
      [
        ".google.je",
        (a) => N`https://adservice.google.je/adsid/integrator.${a}`,
      ],
      [
        ".google.com.jm",
        (a) => N`https://adservice.google.com.jm/adsid/integrator.${a}`,
      ],
      [
        ".google.jo",
        (a) => N`https://adservice.google.jo/adsid/integrator.${a}`,
      ],
      [
        ".google.co.jp",
        (a) => N`https://adservice.google.co.jp/adsid/integrator.${a}`,
      ],
      [
        ".google.co.ke",
        (a) => N`https://adservice.google.co.ke/adsid/integrator.${a}`,
      ],
      [
        ".google.com.kh",
        (a) => N`https://adservice.google.com.kh/adsid/integrator.${a}`,
      ],
      [
        ".google.ki",
        (a) => N`https://adservice.google.ki/adsid/integrator.${a}`,
      ],
      [
        ".google.kg",
        (a) => N`https://adservice.google.kg/adsid/integrator.${a}`,
      ],
      [
        ".google.co.kr",
        (a) => N`https://adservice.google.co.kr/adsid/integrator.${a}`,
      ],
      [
        ".google.com.kw",
        (a) => N`https://adservice.google.com.kw/adsid/integrator.${a}`,
      ],
      [
        ".google.kz",
        (a) => N`https://adservice.google.kz/adsid/integrator.${a}`,
      ],
      [
        ".google.la",
        (a) => N`https://adservice.google.la/adsid/integrator.${a}`,
      ],
      [
        ".google.com.lb",
        (a) => N`https://adservice.google.com.lb/adsid/integrator.${a}`,
      ],
      [
        ".google.li",
        (a) => N`https://adservice.google.li/adsid/integrator.${a}`,
      ],
      [
        ".google.lk",
        (a) => N`https://adservice.google.lk/adsid/integrator.${a}`,
      ],
      [
        ".google.co.ls",
        (a) => N`https://adservice.google.co.ls/adsid/integrator.${a}`,
      ],
      [
        ".google.lt",
        (a) => N`https://adservice.google.lt/adsid/integrator.${a}`,
      ],
      [
        ".google.lu",
        (a) => N`https://adservice.google.lu/adsid/integrator.${a}`,
      ],
      [
        ".google.lv",
        (a) => N`https://adservice.google.lv/adsid/integrator.${a}`,
      ],
      [
        ".google.com.ly",
        (a) => N`https://adservice.google.com.ly/adsid/integrator.${a}`,
      ],
      [
        ".google.md",
        (a) => N`https://adservice.google.md/adsid/integrator.${a}`,
      ],
      [
        ".google.me",
        (a) => N`https://adservice.google.me/adsid/integrator.${a}`,
      ],
      [
        ".google.mg",
        (a) => N`https://adservice.google.mg/adsid/integrator.${a}`,
      ],
      [
        ".google.mk",
        (a) => N`https://adservice.google.mk/adsid/integrator.${a}`,
      ],
      [
        ".google.ml",
        (a) => N`https://adservice.google.ml/adsid/integrator.${a}`,
      ],
      [
        ".google.com.mm",
        (a) => N`https://adservice.google.com.mm/adsid/integrator.${a}`,
      ],
      [
        ".google.mn",
        (a) => N`https://adservice.google.mn/adsid/integrator.${a}`,
      ],
      [
        ".google.ms",
        (a) => N`https://adservice.google.ms/adsid/integrator.${a}`,
      ],
      [
        ".google.com.mt",
        (a) => N`https://adservice.google.com.mt/adsid/integrator.${a}`,
      ],
      [
        ".google.mu",
        (a) => N`https://adservice.google.mu/adsid/integrator.${a}`,
      ],
      [
        ".google.mv",
        (a) => N`https://adservice.google.mv/adsid/integrator.${a}`,
      ],
      [
        ".google.mw",
        (a) => N`https://adservice.google.mw/adsid/integrator.${a}`,
      ],
      [
        ".google.com.mx",
        (a) => N`https://adservice.google.com.mx/adsid/integrator.${a}`,
      ],
      [
        ".google.com.my",
        (a) => N`https://adservice.google.com.my/adsid/integrator.${a}`,
      ],
      [
        ".google.co.mz",
        (a) => N`https://adservice.google.co.mz/adsid/integrator.${a}`,
      ],
      [
        ".google.com.na",
        (a) => N`https://adservice.google.com.na/adsid/integrator.${a}`,
      ],
      [
        ".google.com.ng",
        (a) => N`https://adservice.google.com.ng/adsid/integrator.${a}`,
      ],
      [
        ".google.com.ni",
        (a) => N`https://adservice.google.com.ni/adsid/integrator.${a}`,
      ],
      [
        ".google.ne",
        (a) => N`https://adservice.google.ne/adsid/integrator.${a}`,
      ],
      [
        ".google.nl",
        (a) => N`https://adservice.google.nl/adsid/integrator.${a}`,
      ],
      [
        ".google.no",
        (a) => N`https://adservice.google.no/adsid/integrator.${a}`,
      ],
      [
        ".google.com.np",
        (a) => N`https://adservice.google.com.np/adsid/integrator.${a}`,
      ],
      [
        ".google.nr",
        (a) => N`https://adservice.google.nr/adsid/integrator.${a}`,
      ],
      [
        ".google.nu",
        (a) => N`https://adservice.google.nu/adsid/integrator.${a}`,
      ],
      [
        ".google.co.nz",
        (a) => N`https://adservice.google.co.nz/adsid/integrator.${a}`,
      ],
      [
        ".google.com.om",
        (a) => N`https://adservice.google.com.om/adsid/integrator.${a}`,
      ],
      [
        ".google.com.pa",
        (a) => N`https://adservice.google.com.pa/adsid/integrator.${a}`,
      ],
      [
        ".google.com.pe",
        (a) => N`https://adservice.google.com.pe/adsid/integrator.${a}`,
      ],
      [
        ".google.com.pg",
        (a) => N`https://adservice.google.com.pg/adsid/integrator.${a}`,
      ],
      [
        ".google.com.ph",
        (a) => N`https://adservice.google.com.ph/adsid/integrator.${a}`,
      ],
      [
        ".google.com.pk",
        (a) => N`https://adservice.google.com.pk/adsid/integrator.${a}`,
      ],
      [
        ".google.pl",
        (a) => N`https://adservice.google.pl/adsid/integrator.${a}`,
      ],
      [
        ".google.pn",
        (a) => N`https://adservice.google.pn/adsid/integrator.${a}`,
      ],
      [
        ".google.com.pr",
        (a) => N`https://adservice.google.com.pr/adsid/integrator.${a}`,
      ],
      [
        ".google.ps",
        (a) => N`https://adservice.google.ps/adsid/integrator.${a}`,
      ],
      [
        ".google.pt",
        (a) => N`https://adservice.google.pt/adsid/integrator.${a}`,
      ],
      [
        ".google.com.py",
        (a) => N`https://adservice.google.com.py/adsid/integrator.${a}`,
      ],
      [
        ".google.com.qa",
        (a) => N`https://adservice.google.com.qa/adsid/integrator.${a}`,
      ],
      [
        ".google.ro",
        (a) => N`https://adservice.google.ro/adsid/integrator.${a}`,
      ],
      [
        ".google.rw",
        (a) => N`https://adservice.google.rw/adsid/integrator.${a}`,
      ],
      [
        ".google.com.sa",
        (a) => N`https://adservice.google.com.sa/adsid/integrator.${a}`,
      ],
      [
        ".google.com.sb",
        (a) => N`https://adservice.google.com.sb/adsid/integrator.${a}`,
      ],
      [
        ".google.sc",
        (a) => N`https://adservice.google.sc/adsid/integrator.${a}`,
      ],
      [
        ".google.se",
        (a) => N`https://adservice.google.se/adsid/integrator.${a}`,
      ],
      [
        ".google.com.sg",
        (a) => N`https://adservice.google.com.sg/adsid/integrator.${a}`,
      ],
      [
        ".google.sh",
        (a) => N`https://adservice.google.sh/adsid/integrator.${a}`,
      ],
      [
        ".google.si",
        (a) => N`https://adservice.google.si/adsid/integrator.${a}`,
      ],
      [
        ".google.sk",
        (a) => N`https://adservice.google.sk/adsid/integrator.${a}`,
      ],
      [
        ".google.sn",
        (a) => N`https://adservice.google.sn/adsid/integrator.${a}`,
      ],
      [
        ".google.so",
        (a) => N`https://adservice.google.so/adsid/integrator.${a}`,
      ],
      [
        ".google.sm",
        (a) => N`https://adservice.google.sm/adsid/integrator.${a}`,
      ],
      [
        ".google.sr",
        (a) => N`https://adservice.google.sr/adsid/integrator.${a}`,
      ],
      [
        ".google.st",
        (a) => N`https://adservice.google.st/adsid/integrator.${a}`,
      ],
      [
        ".google.com.sv",
        (a) => N`https://adservice.google.com.sv/adsid/integrator.${a}`,
      ],
      [
        ".google.td",
        (a) => N`https://adservice.google.td/adsid/integrator.${a}`,
      ],
      [
        ".google.tg",
        (a) => N`https://adservice.google.tg/adsid/integrator.${a}`,
      ],
      [
        ".google.co.th",
        (a) => N`https://adservice.google.co.th/adsid/integrator.${a}`,
      ],
      [
        ".google.com.tj",
        (a) => N`https://adservice.google.com.tj/adsid/integrator.${a}`,
      ],
      [
        ".google.tl",
        (a) => N`https://adservice.google.tl/adsid/integrator.${a}`,
      ],
      [
        ".google.tm",
        (a) => N`https://adservice.google.tm/adsid/integrator.${a}`,
      ],
      [
        ".google.tn",
        (a) => N`https://adservice.google.tn/adsid/integrator.${a}`,
      ],
      [
        ".google.to",
        (a) => N`https://adservice.google.to/adsid/integrator.${a}`,
      ],
      [
        ".google.com.tr",
        (a) => N`https://adservice.google.com.tr/adsid/integrator.${a}`,
      ],
      [
        ".google.tt",
        (a) => N`https://adservice.google.tt/adsid/integrator.${a}`,
      ],
      [
        ".google.com.tw",
        (a) => N`https://adservice.google.com.tw/adsid/integrator.${a}`,
      ],
      [
        ".google.co.tz",
        (a) => N`https://adservice.google.co.tz/adsid/integrator.${a}`,
      ],
      [
        ".google.com.ua",
        (a) => N`https://adservice.google.com.ua/adsid/integrator.${a}`,
      ],
      [
        ".google.co.ug",
        (a) => N`https://adservice.google.co.ug/adsid/integrator.${a}`,
      ],
      [
        ".google.co.uk",
        (a) => N`https://adservice.google.co.uk/adsid/integrator.${a}`,
      ],
      [
        ".google.com.uy",
        (a) => N`https://adservice.google.com.uy/adsid/integrator.${a}`,
      ],
      [
        ".google.co.uz",
        (a) => N`https://adservice.google.co.uz/adsid/integrator.${a}`,
      ],
      [
        ".google.com.vc",
        (a) => N`https://adservice.google.com.vc/adsid/integrator.${a}`,
      ],
      [
        ".google.co.ve",
        (a) => N`https://adservice.google.co.ve/adsid/integrator.${a}`,
      ],
      [
        ".google.vg",
        (a) => N`https://adservice.google.vg/adsid/integrator.${a}`,
      ],
      [
        ".google.co.vi",
        (a) => N`https://adservice.google.co.vi/adsid/integrator.${a}`,
      ],
      [
        ".google.com.vn",
        (a) => N`https://adservice.google.com.vn/adsid/integrator.${a}`,
      ],
      [
        ".google.vu",
        (a) => N`https://adservice.google.vu/adsid/integrator.${a}`,
      ],
      [
        ".google.ws",
        (a) => N`https://adservice.google.ws/adsid/integrator.${a}`,
      ],
      [
        ".google.rs",
        (a) => N`https://adservice.google.rs/adsid/integrator.${a}`,
      ],
      [
        ".google.co.za",
        (a) => N`https://adservice.google.co.za/adsid/integrator.${a}`,
      ],
      [
        ".google.co.zm",
        (a) => N`https://adservice.google.co.zm/adsid/integrator.${a}`,
      ],
      [
        ".google.co.zw",
        (a) => N`https://adservice.google.co.zw/adsid/integrator.${a}`,
      ],
      [
        ".google.cat",
        (a) => N`https://adservice.google.cat/adsid/integrator.${a}`,
      ],
    ].map(([a, b]) => [
      a,
      { json: b("json"), js: b("js"), ["sync.js"]: b("sync.js") },
    ])
  );
  function oI(a, b, c) {
    const d = Xg("LINK", a);
    try {
      if (((d.rel = "preload"), gb("preload", "stylesheet"))) {
        d.href = Ae(b).toString();
        const h = kg(
          'style[nonce],link[rel="stylesheet"][nonce]',
          d.ownerDocument && d.ownerDocument.defaultView
        );
        h && d.setAttribute("nonce", h);
      } else {
        if (b instanceof xe) var e = Ae(b).toString();
        else {
          if (b instanceof He) var f = Ie(b);
          else {
            if (b instanceof He) var g = b;
            else
              (b = "object" == typeof b && b.sa ? b.la() : String(b)),
                Ke.test(b) || (b = "about:invalid#zClosurez"),
                (g = new He(b, Ge));
            f = Ie(g);
          }
          e = f;
        }
        d.href = e;
      }
    } catch {
      return;
    }
    d.as = "script";
    c && d.setAttribute("nonce", c);
    if ((a = a.getElementsByTagName("head")[0]))
      try {
        a.appendChild(d);
      } catch {}
  }
  let pI = t;
  const rI = (a) => {
    const b = new Map([["domain", t.location.hostname]]);
    qI[3] >= Na() && b.set("adsid", qI[1]);
    return hi(nI.get(a).js, b);
  };
  let qI, sI;
  const tI = () => {
    pI = t;
    qI = pI.googleToken = pI.googleToken || {};
    const a = Na();
    (qI[1] && qI[3] > a && 0 < qI[2]) ||
      ((qI[1] = ""), (qI[2] = -1), (qI[3] = -1), (qI[4] = ""), (qI[6] = ""));
    sI = pI.googleIMState = pI.googleIMState || {};
    nI.has(sI[1]) || (sI[1] = ".google.com");
    Array.isArray(sI[5]) || (sI[5] = []);
    "boolean" !== typeof sI[6] && (sI[6] = !1);
    Array.isArray(sI[7]) || (sI[7] = []);
    "number" !== typeof sI[8] && (sI[8] = 0);
  };
  var uI = (a) => {
    tI();
    nI.has(a) && (sI[1] = a);
  };
  const vI = {
    Ec: () => 0 < sI[8],
    If: () => {
      sI[8]++;
    },
    Jf: () => {
      0 < sI[8] && sI[8]--;
    },
    Kf: () => {
      sI[8] = 0;
    },
    bk: () => !1,
    Ed: () => sI[5],
    kd: (a) => {
      try {
        a();
      } catch (b) {
        t.setTimeout(() => {
          throw b;
        }, 0);
      }
    },
    be: () => {
      if (!vI.Ec()) {
        var a = t.document,
          b = (e) => {
            e = rI(e);
            a: {
              try {
                var f = kg("script[nonce]");
                break a;
              } catch {}
              f = void 0;
            }
            oI(a, e.toString(), f);
            f = Xg("SCRIPT", a);
            f.type = "text/javascript";
            f.onerror = () => t.processGoogleToken({}, 2);
            Kf(f, e);
            try {
              (a.head || a.body || a.documentElement).appendChild(f), vI.If();
            } catch (g) {}
          },
          c = sI[1];
        b(c);
        ".google.com" != c && b(".google.com");
        var d = { newToken: "FBT" };
        t.setTimeout(() => t.processGoogleToken(d, 1), 1e3);
      }
    },
  };
  function wI(a) {
    tI();
    const b = pI.googleToken[5] || 0;
    a && (0 != b || qI[3] >= Na() ? vI.kd(a) : (vI.Ed().push(a), vI.be()));
    (qI[3] >= Na() && qI[2] >= Na()) || vI.be();
  }
  var yI = (a) => {
    t.processGoogleToken = t.processGoogleToken || ((b, c) => xI(b, c));
    wI(a);
  };
  const xI = (a = {}, b = 0) => {
    var c = a.newToken || "",
      d = "NT" == c,
      e = parseInt(a.freshLifetimeSecs || "", 10),
      f = parseInt(a.validLifetimeSecs || "", 10);
    const g = a["1p_jar"] || "";
    a = a.pucrd || "";
    tI();
    1 == b ? vI.Kf() : vI.Jf();
    var h = (pI.googleToken = pI.googleToken || {}),
      k =
        0 == b &&
        c &&
        "string" === typeof c &&
        !d &&
        "number" === typeof e &&
        0 < e &&
        "number" === typeof f &&
        0 < f &&
        "string" === typeof g;
    d = d && !vI.Ec() && (!(qI[3] >= Na()) || "NT" == qI[1]);
    var l = !(qI[3] >= Na()) && 0 != b;
    if (k || d || l)
      (d = Na()),
        (e = d + 1e3 * e),
        (f = d + 1e3 * f),
        1e-5 > Math.random() &&
          Oi(
            t,
            "https://pagead2.googlesyndication.com/pagead/gen_204?id=imerr" +
              `&err=${b}`
          ),
        (h[5] = b),
        (h[1] = c),
        (h[2] = e),
        (h[3] = f),
        (h[4] = g),
        (h[6] = a),
        tI();
    if (k || !vI.Ec()) {
      b = vI.Ed();
      for (c = 0; c < b.length; c++) vI.kd(b[c]);
      b.length = 0;
    }
  };
  const zI = new Map([
      ["navigate", 1],
      ["reload", 2],
      ["back_forward", 3],
      ["prerender", 4],
    ]),
    AI = new Map([
      [0, 1],
      [1, 2],
      [2, 3],
    ]);
  function BI(a) {
    try {
      const b = a.performance?.getEntriesByType("navigation")?.[0];
      if (b?.type) return zI.get(b.type) ?? null;
    } catch {}
    return AI.get(a.performance?.navigation?.type) ?? null;
  }
  var CI = {
      issuerOrigin: "https://attestation.android.com",
      issuancePath: "/att/i",
      redemptionPath: "/att/r",
    },
    DI = {
      issuerOrigin: "https://pagead2.googlesyndication.com",
      issuancePath: "/dtt/i",
      redemptionPath: "/dtt/r",
      getStatePath: "/dtt/s",
    };
  function EI() {
    const a = window.navigator.userAgent,
      b = /Chrome/.test(a);
    return /Android/.test(a) && b;
  }
  function FI(a = window) {
    return !a.PeriodicSyncManager;
  }
  function GI(a, b, c) {
    a = a.goog_tt_state_map;
    let d,
      e = [];
    b && (d = a?.get(CI.issuerOrigin)) && e.push(d);
    c && (d = a?.get(DI.issuerOrigin)) && e.push(d);
    return e;
  }
  function HI(a) {
    return U(Ir) ? !0 : a.some((b) => b.hasRedemptionRecord);
  }
  function II(a, b, c) {
    return b || ".google.ch" === c || "function" === typeof a.__tcfapi;
  }
  function JI(a, b) {
    a = U(Ir)
      ? a.filter((c) => 12 !== c.state).map((c) => c.issuerOrigin)
      : a.filter((c) => c.hasRedemptionRecord).map((c) => c.issuerOrigin);
    if (0 == a.length) return null;
    a = {
      type: "send-redemption-record",
      issuers: a,
      refreshPolicy: "none",
      signRequestData: U(Ir) ? "omit" : "include",
      includeTimestampHeader: !0,
      additionalSignedHeaders: ["sec-time", "Sec-Redemption-Record"],
    };
    !U(Ir) &&
      b &&
      0 < Object.keys(b).length &&
      (a.additionalSigningData = gc(JSON.stringify(b)));
    return a;
  }
  function KI(a, b, c) {
    if ((a = window.goog_tt_state_map?.get(a)))
      (a.state = b), void 0 != c && (a.hasRedemptionRecord = c);
  }
  function LI() {
    const a = `${CI.issuerOrigin}${CI.redemptionPath}`,
      b = {
        keepalive: !0,
        trustToken: {
          type: "token-redemption",
          issuer: CI.issuerOrigin,
          refreshPolicy: "none",
        },
      };
    KI(CI.issuerOrigin, 2);
    return window
      .fetch(a, b)
      .then((c) => {
        if (!c.ok) throw Error(`${c.status}: Network response was not ok!`);
        KI(CI.issuerOrigin, 6, !0);
      })
      .catch((c) => {
        c && "NoModificationAllowedError" === c.name
          ? KI(CI.issuerOrigin, 6, !0)
          : KI(CI.issuerOrigin, 5);
      });
  }
  function MI() {
    const a = `${CI.issuerOrigin}${CI.issuancePath}`;
    KI(CI.issuerOrigin, 8);
    return window
      .fetch(a, { keepalive: !0, trustToken: { type: "token-request" } })
      .then((b) => {
        if (!b.ok) throw Error(`${b.status}: Network response was not ok!`);
        KI(CI.issuerOrigin, 10);
        return LI();
      })
      .catch((b) => {
        if (b && "NoModificationAllowedError" === b.name)
          return KI(CI.issuerOrigin, 10), LI();
        KI(CI.issuerOrigin, 9);
      });
  }
  function NI() {
    KI(CI.issuerOrigin, 13);
    return document
      .hasTrustToken(CI.issuerOrigin)
      .then((a) => (a ? LI() : MI()));
  }
  function OI() {
    KI(DI.issuerOrigin, 13);
    if (window.Promise) {
      var a = document
        .hasTrustToken(DI.issuerOrigin)
        .then((e) => e)
        .catch((e) => window.Promise.reject({ state: 19, error: e }));
      const b = `${DI.issuerOrigin}${DI.redemptionPath}`,
        c = {
          keepalive: !0,
          trustToken: { type: "token-redemption", refreshPolicy: "none" },
        };
      KI(DI.issuerOrigin, 16);
      a = a
        .then((e) =>
          window
            .fetch(b, c)
            .then((f) => {
              if (!f.ok)
                throw Error(`${f.status}: Network response was not ok!`);
              KI(DI.issuerOrigin, 18, !0);
            })
            .catch((f) => {
              if (f && "NoModificationAllowedError" === f.name)
                KI(DI.issuerOrigin, 18, !0);
              else {
                if (e) return window.Promise.reject({ state: 17, error: f });
                KI(DI.issuerOrigin, 17);
              }
            })
        )
        .then(() =>
          document
            .hasTrustToken(DI.issuerOrigin)
            .then((e) => e)
            .catch((e) => window.Promise.reject({ state: 19, error: e }))
        )
        .then((e) => {
          const f = `${DI.issuerOrigin}${DI.getStatePath}`;
          KI(DI.issuerOrigin, 20);
          return window
            .fetch(`${f}?ht=${e}`, {
              trustToken: {
                type: "send-redemption-record",
                issuers: [DI.issuerOrigin],
              },
            })
            .then((g) => {
              if (!g.ok)
                throw Error(`${g.status}: Network response was not ok!`);
              KI(DI.issuerOrigin, 22);
              return g.text().then((h) => JSON.parse(h));
            })
            .catch((g) => window.Promise.reject({ state: 21, error: g }));
        });
      const d = yh(window);
      return a
        .then((e) => {
          const f = `${DI.issuerOrigin}${DI.issuancePath}`;
          return e && e.srqt && e.cs
            ? (KI(DI.issuerOrigin, 23),
              window
                .fetch(`${f}?cs=${e.cs}&correlator=${d}`, {
                  keepalive: !0,
                  trustToken: { type: "token-request" },
                })
                .then((g) => {
                  if (!g.ok)
                    throw Error(`${g.status}: Network response was not ok!`);
                  KI(DI.issuerOrigin, 25);
                  return e;
                })
                .catch((g) => window.Promise.reject({ state: 24, error: g })))
            : e;
        })
        .then((e) => {
          if (e && e.srdt && e.cs)
            return (
              KI(DI.issuerOrigin, 26),
              window
                .fetch(`${b}?cs=${e.cs}&correlator=${d}`, {
                  keepalive: !0,
                  trustToken: {
                    type: "token-redemption",
                    refreshPolicy: "refresh",
                  },
                })
                .then((f) => {
                  if (!f.ok)
                    throw Error(`${f.status}: Network response was not ok!`);
                  KI(DI.issuerOrigin, 28, !0);
                })
                .catch((f) => window.Promise.reject({ state: 27, error: f }))
            );
        })
        .then(() => {
          KI(DI.issuerOrigin, 29);
        })
        .catch((e) => {
          if (
            e instanceof Object &&
            e.hasOwnProperty("state") &&
            e.hasOwnProperty("error")
          )
            if ("number" === typeof e.state && e.error instanceof Error) {
              KI(DI.issuerOrigin, e.state);
              const f = V(Hr);
              Math.random() <= f &&
                Ri({ state: e.state, err: e.error.toString() }, "dtt_err");
            } else throw Error(e);
          else throw e;
        });
    }
  }
  function PI(a) {
    if (document.hasTrustToken && !U(Fr) && a.A) {
      var b = window.goog_tt_promise_map;
      if (b && b instanceof Map) {
        var c = [];
        if (a.j.some((d) => d.issuerOrigin === CI.issuerOrigin)) {
          let d = b.get(CI.issuerOrigin);
          d || ((d = NI()), b.set(CI.issuerOrigin, d));
          c.push(d);
        }
        a.j.some((d) => d.issuerOrigin === DI.issuerOrigin) &&
          ((a = b.get(DI.issuerOrigin)),
          a || ((a = OI()), b.set(DI.issuerOrigin, a)),
          c.push(a));
        if (0 < c.length && window.Promise && window.Promise.all)
          return window.Promise.all(c);
      }
    }
  }
  var QI = class extends Km {
    constructor(a, b, c) {
      super();
      this.A = a;
      this.j = [];
      b && EI() && this.j.push(CI);
      c && this.j.push(DI);
      if (document.hasTrustToken && !U(Fr)) {
        const d = new Map();
        this.j.forEach((e) => {
          d.set(e.issuerOrigin, {
            issuerOrigin: e.issuerOrigin,
            state: this.A ? 1 : 12,
            hasRedemptionRecord: !1,
          });
        });
        window.goog_tt_state_map =
          window.goog_tt_state_map && window.goog_tt_state_map instanceof Map
            ? new Map([...d, ...window.goog_tt_state_map])
            : d;
        (window.goog_tt_promise_map &&
          window.goog_tt_promise_map instanceof Map) ||
          (window.goog_tt_promise_map = new Map());
      }
    }
  };
  function RI(a) {
    if ((a = a.navigator?.userActivation)) {
      var b = 0;
      a?.hasBeenActive && (b |= 1);
      a?.isActive && (b |= 2);
      return b;
    }
  }
  const SI = /[+, ]/;
  function TI(a, b) {
    const c = a.H;
    var d = a.pubWin,
      e = {},
      f = d.document;
    var g = Dh(d);
    var h = $r(d, c.google_ad_width, c.google_ad_height);
    var k = bs(g).Ic;
    var l = d.top == d ? 0 : Sg(d.top) ? 1 : 2;
    var m = 4;
    h || 1 != l
      ? h || 2 != l
        ? h && 1 == l
          ? (m = 7)
          : h && 2 == l && (m = 8)
        : (m = 6)
      : (m = 5);
    k && (m |= 16);
    k = "" + m;
    l = cs(d);
    m = !!c.google_page_url;
    e.google_iframing = k;
    0 != l && (e.google_iframing_environment = l);
    if (!m && "ad.yieldmanager.com" == f.domain) {
      for (
        k = f.URL.substring(f.URL.lastIndexOf("http"));
        -1 < k.indexOf("%");

      )
        try {
          k = decodeURIComponent(k);
        } catch (q) {
          break;
        }
      c.google_page_url = k;
      m = !!k;
    }
    m
      ? ((e.google_page_url = c.google_page_url),
        (e.google_page_location = (h ? f.referrer : f.URL) || "EMPTY"))
      : (h && Sg(d.top) && f.referrer && d.top.document.referrer === f.referrer
          ? (e.google_page_url = d.top.document.URL)
          : (e.google_page_url = h ? f.referrer : f.URL),
        (e.google_page_location = null));
    if (f.URL === e.google_page_url)
      try {
        var n = Math.round(Date.parse(f.lastModified) / 1e3) || null;
      } catch {
        n = null;
      }
    else n = null;
    e.google_last_modified_time = n;
    d = g == g.top ? g.document.referrer : ((d = Lh()) && d.referrer) || "";
    e.google_referrer_url = d;
    as(e, c);
    e = c.google_page_location || c.google_page_url;
    "EMPTY" == e && (e = c.google_page_url);
    e
      ? ((e = e.toString()),
        0 == e.indexOf("http://")
          ? (e = e.substring(7, e.length))
          : 0 == e.indexOf("https://") && (e = e.substring(8, e.length)),
        (d = e.indexOf("/")),
        -1 == d && (d = e.length),
        (e = e.substring(0, d).split(".")),
        (d = !1),
        3 <= e.length && (d = e[e.length - 3] in XH),
        2 <= e.length && (d = d || e[e.length - 2] in XH),
        (e = d))
      : (e = !1);
    e = e ? "pagead2.googlesyndication.com" : "googleads.g.doubleclick.net";
    b = UI(a, b);
    d = a.H;
    f = d.google_ad_channel;
    g = "/pagead/ads?";
    "ca-pub-6219811747049371" === d.google_ad_client &&
      VI.test(f) &&
      (g = "/pagead/lopri?");
    a = zi(
      b,
      `https://${e}${g}` +
        (F(a.ha, 9) && c.google_debug_params ? c.google_debug_params : "")
    );
    return (c.google_ad_url = a);
  }
  function WI(a) {
    return (
      encodeURIComponent("RS-" + a.google_reactive_sra_index + "-") +
      "&" +
      yi({
        adk: a.google_ad_unit_key,
        client: a.google_ad_client,
        fa: a.google_reactive_ad_format,
      })
    );
  }
  function XI(a) {
    try {
      if (a.parentNode) return a.parentNode;
    } catch {
      return null;
    }
    if (9 === a.nodeType)
      a: {
        try {
          const c = Dg(a);
          if (c) {
            const d = c.frameElement;
            if (d && Sg(c.parent)) {
              var b = d;
              break a;
            }
          }
        } catch {}
        b = null;
      }
    else b = null;
    return b;
  }
  function YI(a, b) {
    b.eid = HF(a.pubWin);
    const c = a.H.google_loeid;
    "string" === typeof c && ((a.j |= 4096), (b.loeid = c));
  }
  function ZI(a, b) {
    a =
      (a = Vg(a.pubWin)) && a.document
        ? Wr(a.document, a)
        : new og(-12245933, -12245933);
    b.scr_x = Math.round(a.x);
    b.scr_y = Math.round(a.y);
  }
  function $I(a) {
    try {
      const b = t.top.location.hash;
      if (b) {
        const c = b.match(a);
        return (c && c[1]) || "";
      }
    } catch {}
    return "";
  }
  function aJ(a) {
    const b = cj();
    b && (a.debug_experiment_id = b);
    a.creatives = $I(/\b(?:creatives)=([\d,]+)/);
    a.adgroups = $I(/\b(?:adgroups)=([\d,]+)/);
    a.adgroups &&
      ((a.adtest = "on"),
      (a.disable_budget_throttling = !0),
      (a.use_budget_filtering = !1),
      (a.retrieve_only = !0),
      (a.disable_fcap = !0));
  }
  function bJ(a, b, c) {
    const d = a.H;
    var e = a.pubWin,
      f = a.L,
      g = Dh(window);
    d.fsapi && (b.fsapi = !0);
    b.ref = d.google_referrer_url;
    b.loc = d.google_page_location;
    var h;
    (h = Lh(e)) && Ca(h.data) && "string" === typeof h.data.type
      ? ((h = h.data.type.toLowerCase()),
        (h = "doubleclick" == h || "adsense" == h ? null : h))
      : (h = null);
    h && (b.apn = h.substr(0, 10));
    g = bs(g);
    b.url || b.loc || !g.url || ((b.url = g.url), g.Ic || (b.usrc = 1));
    h = d.google_trust_token_additional_signing_data || {};
    h.url = b.url;
    d.google_trust_token_additional_signing_data = h;
    g.url != (b.loc || b.url) && (b.top = g.url);
    a.rb && (b.etu = a.rb);
    0 <= a.C && (b.eae = a.C);
    (c = sG(d, f, f ? WD(c, f) : null)) && (b.fc = c);
    if (!Ii(d)) {
      c = a.pubWin.document;
      g = "";
      if (
        c.documentMode &&
        ((h = new xg(c).createElement("IFRAME")),
        (h.frameBorder = "0"),
        (h.style.height = 0),
        (h.style.width = 0),
        (h.style.position = "absolute"),
        c.body)
      ) {
        c.body.appendChild(h);
        try {
          const X = h.contentWindow.document;
          X.open();
          X.write(cf(pf));
          X.close();
          g += X.documentMode;
        } catch (X) {}
        c.body.removeChild(h);
      }
      b.docm = g;
    }
    let k, l, m, n, q, r, y, E, D;
    try {
      var C = e.screenX;
      k = e.screenY;
    } catch (X) {}
    try {
      (l = e.outerWidth), (m = e.outerHeight);
    } catch (X) {}
    try {
      (n = e.innerWidth), (q = e.innerHeight);
    } catch (X) {}
    try {
      (r = e.screenLeft), (y = e.screenTop);
    } catch (X) {}
    try {
      (n = e.innerWidth), (q = e.innerHeight);
    } catch (X) {}
    try {
      (E = e.screen.availWidth), (D = e.screen.availTop);
    } catch (X) {}
    b.brdim = [r, y, C, k, E, D, l, m, n, q].join();
    C = 0;
    void 0 === t.postMessage && (C |= 1);
    0 < C && (b.osd = C);
    b.vis = iH(e.document);
    C = a.innerInsElement;
    e = mG(d)
      ? RH
      : FH(
          new PH(
            e,
            C,
            null,
            { width: 0, height: 0 },
            d.google_ad_width,
            d.google_ad_height,
            !1
          )
        );
    b.rsz = e.toString();
    b.abl = sH(e);
    if (!mG(d) && ((e = Ji(d)), null != e)) {
      C = 0;
      a: {
        try {
          {
            var G = d.google_async_iframe_id;
            const X = window.document;
            if (G) var K = X.getElementById(G);
            else {
              var H = X.getElementsByTagName("script"),
                I = H[H.length - 1];
              K = (I && I.parentNode) || null;
            }
          }
          if ((G = K)) {
            K = [];
            H = 0;
            for (
              var ta = Date.now();
              100 >= ++H && 50 > Date.now() - ta && (G = XI(G));

            )
              1 === G.nodeType && K.push(G);
            var Ja = K;
            b: {
              for (ta = 0; ta < Ja.length; ta++) {
                c: {
                  var ua = Ja[ta];
                  try {
                    if (
                      ua.parentNode &&
                      0 < ua.offsetWidth &&
                      0 < ua.offsetHeight &&
                      ua.style &&
                      "none" !== ua.style.display &&
                      "hidden" !== ua.style.visibility &&
                      (!ua.style.opacity || 0 !== Number(ua.style.opacity))
                    ) {
                      const X = ua.getBoundingClientRect();
                      var xa = 0 < X.right && 0 < X.bottom;
                      break c;
                    }
                  } catch (X) {}
                  xa = !1;
                }
                if (!xa) {
                  var ha = !1;
                  break b;
                }
              }
              ha = !0;
            }
            if (ha) {
              b: {
                const X = Date.now();
                ha = /^html|body$/i;
                xa = /^fixed/i;
                for (ua = 0; ua < Ja.length && 50 > Date.now() - X; ua++) {
                  const lc = Ja[ua];
                  if (
                    !ha.test(lc.tagName) &&
                    xa.test(lc.style.position || oi(lc, "position"))
                  ) {
                    var ja = lc;
                    break b;
                  }
                }
                ja = null;
              }
              break a;
            }
          }
        } catch {}
        ja = null;
      }
      ja &&
        ja.offsetWidth * ja.offsetHeight <= 4 * e.width * e.height &&
        (C = 1);
      b.pfx = C;
    }
    a: {
      if (0.05 > Math.random() && f)
        try {
          const X = f.document.getElementsByTagName("head")[0];
          var La = X ? fI(X) : 0;
          break a;
        } catch (X) {}
      La = 0;
    }
    f = La;
    0 !== f && (b.cms = f);
    d.google_lrv !== B(a.ha, 2) && (b.alvm = d.google_lrv || "none");
  }
  function cJ(a, b) {
    let c = 0;
    a.location && a.location.ancestorOrigins
      ? (c = a.location.ancestorOrigins.length)
      : Tg(
          () => {
            c++;
            return !1;
          },
          !0,
          !0,
          a
        );
    c && (b.nhd = c);
  }
  function dJ(a, b) {
    const c = dD(b, 8, {});
    b = dD(b, 9, {});
    const d = a.google_ad_section,
      e = a.google_ad_format;
    a = a.google_ad_slot;
    e
      ? (c[d] = c[d] ? c[d] + `,${e}` : e)
      : a && (b[d] = b[d] ? b[d] + `,${a}` : a);
  }
  function eJ(a, b, c) {
    const d = a.H;
    var e = a.H;
    b.dt = Zl;
    e.google_async_iframe_id && e.google_bpp && (b.bpp = e.google_bpp);
    a: {
      try {
        var f = t.performance;
        if (f && f.timing && f.now) {
          var g =
            f.timing.navigationStart +
            Math.round(f.now()) -
            f.timing.domLoading;
          break a;
        }
      } catch (I) {}
      g = null;
    }
    (e = (e = g) ? UG(e, t.Date.now() - Zl, 1e6) : null) && (b.bdt = e);
    b.idt = UG(a.I, Zl);
    e = a.H;
    b.shv = B(a.ha, 2);
    a.Za && (b.mjsv = a.Za);
    "sa" == e.google_loader_used
      ? (b.ptt = 5)
      : "aa" == e.google_loader_used && (b.ptt = 9);
    /^\w{1,3}$/.test(e.google_loader_used) && (b.saldr = e.google_loader_used);
    if ((e = Lh(a.pubWin)))
      (b.is_amp = 1), (b.amp_v = bi(e)), (e = ci(e)) && (b.act = e);
    e = a.pubWin;
    e == e.top && (b.abxe = 1);
    if ("_gfp_a_" in a.pubWin) {
      e = a.pubWin._gfp_a_;
      if ("boolean" !== typeof e)
        throw Error(`Illegal value of ${"_gfp_a_"}: ${e}`);
      e &&
        ((e = new MF(a.pubWin)),
        (g = IF(e, "__gads", c)) && (b.cookie = g),
        U(uq) && (g = IF(e, "__gpi", c)) && !g.includes("&") && (b.gpic = g),
        "1" === IF(e, "__gpi_opt_out", c) &&
          ((b.gpico = "1"), (b.pdopt = "1")));
    }
    e = ZC();
    f = dD(e, 8, {});
    g = d.google_ad_section;
    f[g] && (b.prev_fmts = f[g]);
    f = dD(e, 9, {});
    f[g] && (b.prev_slotnames = f[g].toLowerCase());
    dJ(d, e);
    g = dD(e, 15, 0);
    0 < g && (b.nras = String(g));
    (f = Lh(window))
      ? (f
          ? ((g = f.pageViewId),
            (f = f.clientId),
            "string" === typeof f && (g += f.replace(/\D/g, "").substr(0, 6)))
          : (g = null),
        (g = +g))
      : ((g = Dh(window)),
        (f = g.google_global_correlator) ||
          (g.google_global_correlator = f =
            1 + Math.floor(Math.random() * Math.pow(2, 43))),
        (g = f));
    b.correlator = dD(e, 7, g);
    U(Cq) && (b.rume = 1);
    if (d.google_ad_channel) {
      g = dD(e, 10, {});
      f = "";
      var h = d.google_ad_channel.split(SI);
      for (var k = 0; k < h.length; k++) {
        var l = h[k];
        g[l] ? (f += l + "+") : (g[l] = !0);
      }
      b.pv_ch = f;
    }
    if (d.google_ad_host_channel) {
      f = dD(e, 11, []);
      h = d.google_ad_host_channel.split("|");
      e = -1;
      g = [];
      for (k = 0; k < h.length; k++) {
        l = h[k].split(SI);
        f[k] || (f[k] = {});
        var m = "";
        for (var n = 0; n < l.length; n++) {
          var q = l[n];
          "" !== q && (f[k][q] ? (m += "+" + q) : (f[k][q] = !0));
        }
        m = m.slice(1);
        g[k] = m;
        "" !== m && (e = k);
      }
      f = "";
      if (-1 < e) {
        for (h = 0; h < e; h++) f += g[h] + "|";
        f += g[e];
      }
      b.pv_h_ch = f;
    }
    b.frm = d.google_iframing;
    b.ife = d.google_iframing_environment;
    e = d.google_ad_client;
    try {
      var r = Dh(window),
        y = r.google_prev_clients;
      y || (y = r.google_prev_clients = {});
      if (e in y) var E = 1;
      else (y[e] = !0), (E = 2);
    } catch {
      E = 0;
    }
    b.pv = E;
    y = a.pubWin.document;
    E = a.H;
    e = a.pubWin;
    r = y.domain;
    e = (fd(c, 5) && XD(e) ? e.document.cookie : null) || "";
    h = a.pubWin.screen;
    k = y.referrer;
    m = Bi();
    if (Lh()) var D = window.gaGlobal || {};
    else {
      g = Math.round(new Date().getTime() / 1e3);
      f = E.google_analytics_domain_name;
      c = "undefined" == typeof f ? iI("auto", r) : iI(f, r);
      n = -1 < e.indexOf("__utma=" + c + ".");
      l = -1 < e.indexOf("__utmb=" + c);
      (r = (fi() || window).gaGlobal) ||
        ((r = {}), ((fi() || window).gaGlobal = r));
      y = !1;
      if (n) {
        var C = e
          .split("__utma=" + c + ".")[1]
          .split(";")[0]
          .split(".");
        l ? (r.sid = C[3]) : r.sid || (r.sid = g + "");
        r.vid = C[0] + "." + C[1];
        r.from_cookie = !0;
      } else {
        r.sid || (r.sid = g + "");
        if (!r.vid) {
          y = !0;
          l = Math.round(2147483647 * Math.random());
          n = gI.appName;
          q = gI.version;
          var G = gI.language ? gI.language : gI.browserLanguage,
            K = gI.platform,
            H = gI.userAgent;
          try {
            C = gI.javaEnabled();
          } catch (I) {
            C = !1;
          }
          C = [n, q, G, K, H, C ? 1 : 0].join("");
          h
            ? (C += h.width + "x" + h.height + h.colorDepth)
            : t.java &&
              t.java.awt &&
              ((h = t.java.awt.Toolkit.getDefaultToolkit().getScreenSize()),
              (C += h.screen.width + "x" + h.screen.height));
          C = C + e + (k || "");
          for (h = C.length; 0 < m; ) C += m-- ^ h++;
          r.vid = (l ^ (hI(C) & 2147483647)) + "." + g;
        }
        r.from_cookie || (r.from_cookie = !1);
      }
      if (!r.cid) {
        b: for (
          g = f,
            C = 999,
            g &&
              ((g = 0 == g.indexOf(".") ? g.substr(1) : g),
              (C = g.split(".").length)),
            g = 999,
            e = e.split(";"),
            f = 0;
          f < e.length;
          f++
        )
          if ((h = jI.exec(e[f]) || kI.exec(e[f]) || lI.exec(e[f]))) {
            k = h[1] || 0;
            if (k == C) {
              D = h[2];
              break b;
            }
            k < g && ((g = k), (D = h[2]));
          }
        y && D && -1 != D.search(/^\d+\.\d+$/)
          ? ((r.vid = D), (r.from_cookie = !0))
          : D != r.vid && (r.cid = D);
      }
      r.dh = c;
      r.hid || (r.hid = Math.round(2147483647 * Math.random()));
      D = r;
    }
    b.ga_vid = D.vid;
    b.ga_sid = D.sid;
    b.ga_hid = D.hid;
    b.ga_fc = D.from_cookie;
    b.ga_cid = D.cid;
    b.ga_wpids = E.google_analytics_uacct;
    cJ(a.pubWin, b);
    (a = d.google_ad_layout) && 0 <= KG[a] && (b.rplot = KG[a]);
  }
  function fJ(a, b) {
    a = a.l;
    if (a?.j() || iD()) b.npa = 1;
    if (a) {
      $c(a, 3) && (b.gdpr = fd(a, 3) ? "1" : "0");
      var c = v(a, 1);
      c && (b.us_privacy = c);
      (c = v(a, 2)) && (b.gdpr_consent = c);
      (c = v(a, 4)) && (b.addtl_consent = c);
      (a = v(a, 7)) && (b.tcfe = a);
    }
  }
  function gJ(a, b) {
    const c = a.H;
    fJ(a, b);
    $g(lD, (d, e) => {
      b[d] = c[e];
    });
    mG(c) && ((a = AG(c)), (b.fa = a));
    b.pi ||
      null == c.google_ad_slot ||
      ((a = mt(c)), null != a.j && ((a = eo(a.j.value)), (b.pi = a)));
  }
  function hJ(a, b) {
    var c = ei() || Ur(a.pubWin.top);
    c && ((b.biw = c.width), (b.bih = c.height));
    c = a.pubWin;
    c !== c.top &&
      (a = Ur(a.pubWin)) &&
      ((b.isw = a.width), (b.ish = a.height));
  }
  function iJ(a, b) {
    var c = a.pubWin;
    null !== c && c != c.top
      ? ((a = [c.document.URL]),
        c.name && a.push(c.name),
        (c = Ur(c, !1)),
        a.push(c.width.toString()),
        a.push(c.height.toString()),
        (a = bh(a.join(""))))
      : (a = 0);
    0 !== a && (b.ifk = a);
  }
  function jJ(a, b) {
    (a = gD()[a.H.google_ad_client]) && (b.psts = a.join());
  }
  function kJ(a, b) {
    (a = a.pubWin.tmod) && (b.tmod = a);
  }
  function lJ(a, b) {
    (a = a.pubWin.google_user_agent_client_hint) && (b.uach = gc(a));
  }
  function mJ(a, b) {
    const c = U(FI(window) ? Er : Dr),
      d = U(Gr);
    (a = GI(a.pubWin, c, d)) &&
      0 < a.length &&
      (b.tt_state = gc(JSON.stringify(a)));
  }
  function nJ(a, b) {
    try {
      const e =
        a.pubWin &&
        a.pubWin.external &&
        a.pubWin.external.getHostEnvironmentValue &&
        a.pubWin.external.getHostEnvironmentValue.bind(a.pubWin.external);
      if (e) {
        var c = JSON.parse(e("os-mode")),
          d = parseInt(c["os-mode"], 10);
        0 <= d && (b.wsm = d + 1);
      }
    } catch {}
  }
  function oJ(a, b) {
    0 <= a.H.google_ad_public_floor && (b.pubf = a.H.google_ad_public_floor);
    0 <= a.H.google_ad_private_floor && (b.pvtf = a.H.google_ad_private_floor);
  }
  function pJ(a, b) {
    const c = Number(a.H.google_traffic_source);
    c && Object.values(Ta).includes(c) && (b.trt = a.H.google_traffic_source);
  }
  function UI(a, b) {
    const c = {};
    gJ(a, c);
    tI();
    c.adsid = qI[1];
    tI();
    c.pucrd = qI[6];
    lJ(a, c);
    mJ(a, c);
    eJ(a, c, b);
    Ei(c);
    c.u_sd = Vr(a.pubWin);
    c.dmc = a.pubWin.navigator?.deviceMemory;
    yl(889, () => {
      if (null == a.L) (c.adx = -12245933), (c.ady = -12245933);
      else {
        var e = jF(a.L, a.innerInsElement);
        (c.adx && -12245933 != c.adx && c.ady && -12245933 != c.ady) ||
          ((c.adx = Math.round(e.x)), (c.ady = Math.round(e.y)));
        Xr(a.innerInsElement) ||
          ((c.adx = -12245933), (c.ady = -12245933), (a.j |= 32768));
      }
    });
    hJ(a, c);
    iJ(a, c);
    ZI(a, c);
    YI(a, c);
    a.G && (c.oid = a.G);
    jJ(a, c);
    c.pvsid = yh(a.pubWin, xl);
    kJ(a, c);
    nJ(a, c);
    c.uas = RI(a.pubWin);
    const d = BI(a.pubWin);
    d && (c.nvt = d);
    a.F && (c.scar = a.F);
    a.B && (c.topics = a.B instanceof Uint8Array ? ec(a.B, 3) : a.B);
    bJ(a, c, b);
    c.fu = a.j;
    c.bc = mI();
    tI();
    c.jar = qI[4];
    F(a.ha, 9) && aJ(c);
    Wl() && (c.atl = !0);
    oJ(a, c);
    pJ(a, c);
    "runAdAuction" in a.pubWin.navigator &&
      "joinAdInterestGroup" in a.pubWin.navigator &&
      (c.td = 1);
    null == O(Lr).j(vq.j, vq.defaultValue) ||
      (!1 !== a.H.google_video_play_muted && !0 !== U(wq)) ||
      (10 !== a.H.google_reactive_ad_format &&
        11 !== a.H.google_reactive_ad_format) ||
      (c.sdkv = O(Lr).j(vq.j, vq.defaultValue));
    return c;
  }
  const VI = /YtLoPri/;
  var qJ = class extends J {
    constructor(a) {
      super(a);
    }
  };
  var rJ = class {
    constructor(a) {
      this.j = a;
    }
    na() {
      return this.j.now();
    }
  };
  const sJ = [255, 255, 255];
  function tJ(a) {
    function b(d) {
      return [
        Number(d[1]),
        Number(d[2]),
        Number(d[3]),
        4 < d.length ? Number(d[4]) : 1,
      ];
    }
    var c = a.match(/rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)/);
    if (
      c ||
      (c = a.match(/rgba\(([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([0-9\\.]+)\)/))
    )
      return b(c);
    if ("transparent" === a) return [0, 0, 0, 0];
    throw Error(`Invalid color: ${a}`);
  }
  function uJ(a) {
    var b = getComputedStyle(a);
    if ("none" !== b.backgroundImage) return null;
    b = tJ(b.backgroundColor);
    var c = vJ(b);
    if (c) return c;
    a = (a = a.parentElement) ? uJ(a) : sJ;
    if (!a) return null;
    c = b[3];
    return [
      Math.round(c * b[0] + (1 - c) * a[0]),
      Math.round(c * b[1] + (1 - c) * a[1]),
      Math.round(c * b[2] + (1 - c) * a[2]),
    ];
  }
  function vJ(a) {
    return 1 === a[3] ? [a[0], a[1], a[2]] : null;
  }
  var xJ = class {
    constructor() {
      var a = V(ur),
        b = V(Xq);
      this.B = a;
      this.A = b;
      this.l = new wJ();
      this.j = 0;
    }
  };
  class wJ {
    constructor() {
      this.j = new Map();
      this.l = 0;
    }
    get A() {
      return this.l;
    }
  }
  function yJ(a) {
    M(a, {
      border: "0",
      "box-shadow": "none",
      display: "inline",
      float: "none",
      margin: "0",
      outline: "0",
      padding: "0",
    });
  }
  function zJ(a, b, c, d, e, f, g, h) {
    d = { wp: h.D, c: h.F, e: V(ar), m: d, q: e, v: Math.round(f - g) };
    $i(h.pa, "adfil-clk", d, !0, 1);
    d = new Sk();
    e = x(d, 4, e, "");
    a = w(e, 1, a);
    b = w(a, 2, b);
    c = w(b, 3, c);
    h = h.A;
    b = AJ(h, 4);
    c = qd(b, 8, al, c);
    return BJ(h, c);
  }
  const CJ = [
    { lc: "1907259590", cc: 480, Sa: 220 },
    { lc: "2837189651", cc: 400, Sa: 180 },
    { lc: "9211025045", cc: 360, Sa: 160 },
    { lc: "6584860439", cc: -Infinity, Sa: 150 },
  ];
  function DJ(a) {
    return CJ.find((b) => b.cc <= a);
  }
  const EJ = new (class {
    constructor() {
      this.j = [];
    }
  })();
  let FJ = !1;
  function GJ(a) {
    return HJ(
      a.j,
      1065,
      a.win,
      () => {
        if (!a.l) {
          var b = new Wk();
          b = x(b, 1, a.A, 0);
          var c = new Xk();
          b = qd(b, 2, Zk, c);
          IJ(a.j.A, b);
        }
      },
      1e4
    );
  }
  class JJ {
    constructor(a, b, c) {
      this.win = a;
      this.j = b;
      this.A = c;
      this.l = !1;
    }
    cancel(a) {
      this.win.clearTimeout(a);
    }
  }
  function KJ(a, b, c, d) {
    const e = DJ(a.document.body.clientWidth),
      f = b.j ? LJ(a, b, d, e) : MJ(a, b, d, e);
    Ym(f.isVisible(), !1, () => {
      FJ = !1;
      for (const k of EJ.j) k();
      EJ.j.length = 0;
    });
    f.show({ vd: !0 });
    FJ = !0;
    const g = new JJ(a, b, c),
      h = GJ(g);
    EJ.j.push(() => {
      var k = b.A;
      var l = new Wk();
      l = x(l, 1, c, 0);
      var m = new Yk();
      l = qd(l, 3, Zk, m);
      IJ(k, l);
      g.l = !0;
    });
    NJ.push(() => {
      f.isVisible().O && f.collapse();
      g.cancel(h);
    });
  }
  function LJ(a, b, c, d) {
    b = OJ(a, b, c, d, a.innerWidth, "100%", "15px", "13px", "center");
    return Vx(a, b, {
      Wd: 0.75,
      Cd: 0.95,
      zIndex: 100001,
      Cc: !0,
      Ac: "adpub-drawer-root",
    });
  }
  function MJ(a, b, c, d) {
    a: {
      var e = a.document.body.clientWidth;
      var f = 0.9 * e;
      for (e = 768 >= e ? 3 : 4; 1 <= e; e--) {
        const g = d.Sa * e + 42;
        if (g <= f) {
          f = g;
          break a;
        }
      }
    }
    c = OJ(a, b, c, d, f, "600px", "24px", "24px", "start");
    return hx(a, c, {
      Bd: `${f}px`,
      yd: PJ(b),
      od: B(b.B, 14),
      zIndex: 100001,
      Cc: !0,
      Ac: "adpub-drawer-root",
    });
  }
  function OJ(a, b, c, d, e, f, g, h, k) {
    var l = b.B,
      m = !!b.l,
      n = B(l, 10),
      q = n.indexOf("TERM"),
      r = V(Uq);
    e = Math.max(Math.floor((e - Math.floor(e / d.Sa) * d.Sa) / 2), 5);
    var y = b.J ? "on" : "",
      E = B(l, 3),
      D = `${V(ar)}`,
      C = B(l, 7),
      G = B(l, 6),
      K = b.D,
      H = n.substring(0, q);
    n = n.substring(q + 4);
    d = d.lc;
    m = !m;
    q = !!F(l, 13);
    c = Tv(
      '<link href="https://fonts.googleapis.com/css2?family=Google+Material+Icons:wght@400;500;700" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap" rel="stylesheet"><div style="font-family: Roboto, sans-serif;"><div style="border: 0 solid #eee; border-bottom-width: 1px; color: #3c4043; font-size: 13px; line-height: 20px; padding: 0 ' +
        Xv(W(g)) +
        " " +
        Xv(W(h)) +
        "; text-align: " +
        Xv(W(k)) +
        ';">' +
        (m
          ? '<div style="max-width: ' +
            Xv(W(f)) +
            '">' +
            Sv(E) +
            '\u00a0<a href="https://support.google.com/adsense/answer/11188578" target="_blank" style="color: #1967d2; text-decoration: none; white-space: nowrap">' +
            Sv(G) +
            "</a></div>"
          : "") +
        "</div><div style=\"border-bottom: 1px solid #eee; color: #202124; font-family: 'Google Sans'; font-size: 15px; line-height: 24px; padding: 15px " +
        Xv(W(g)) +
        "; text-align: " +
        Xv(W(k)) +
        '"><div style="display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"><span style="bottom: -2px; color: #1967d2; font-family: \'Google Material Icons\'; padding-right: 5px; position: relative">shoppingmode</span><span style="color:#80868b"> ' +
        Sv(H) +
        "</span>" +
        Sv(c) +
        '<span style="color:#80868b">' +
        Sv(n) +
        '</span></div></div><div id="anno-csa" style="margin:5px ' +
        Xv(W(e)) +
        "px\"></div><script>(function(g,o){g[o]=g[o]||function(){(g[o]['q']=g[o]['q']||[]).push(arguments)},g[o]['t']=1*new Date})(window,'_googCsa');const pageOptions = {'pubId': " +
        aw(bw("pub-adfiliates-rockskipper")) +
        ", 'styleId': " +
        aw(bw(d)) +
        ", 'disableCarousel': true, 'query': " +
        aw(bw(c)) +
        ", 'hl': " +
        aw(bw(C)) +
        ", 'personalizedAds': 'false', 'fexp': " +
        aw(bw(D)) +
        ", 'adfiliateWp': " +
        aw(bw(K)) +
        ", 'adtest': " +
        aw(bw(y)) +
        "}; const adBlock = {'container': 'anno-csa', 'linkTarget': '_blank', 'number': " +
        aw(bw(r)) +
        ", 'width': document.body.offsetWidth - 30}; _googCsa(" +
        aw(bw("ads")) +
        ", pageOptions, adBlock);\x3c/script>" +
        (q
          ? "<script>const el = document.getElementById('anno-csa'); el.dir = 'ltr'; el.style.height = '800px'; el.style.width = '75vw'; el.style.overflow = 'hidden'; el.style.overflowWrap = 'break-word'; el.textContent = JSON.stringify(window._googCsa.q);\x3c/script>"
          : '<script async="async" src="https://www.google.com/adsense/search/ads.js">\x3c/script>') +
        "</div>"
    );
    l = gf(
      "body",
      {
        dir: PJ(b) ? "rtl" : "ltr",
        lang: B(l, 7),
        style: Qe({
          margin: "0",
          height: "100%",
          "padding-top": "0px",
          overflow: "hidden",
        }),
      },
      Ov(c)
    );
    c = a.document.createElement("IFRAME");
    M(c, { border: "0", width: "100%" });
    QJ(a, b, c);
    c.srcdoc = cf(l);
    return c;
  }
  function QJ(a, b, c) {
    U(qr)
      ? RJ(a, b, c)
      : (c.onload = () => {
          const d = c.contentDocument.body,
            e = new ResizeObserver(() => {
              SJ(b, a, () => {
                c.height = `${d.parentElement.offsetHeight}px`;
              });
            });
          e.observe(d);
          NJ.push(() => {
            e.disconnect();
          });
        });
  }
  function RJ(a, b, c) {
    function d(g) {
      const h = new ResizeObserver(() => {
        c.height = `${g.parentElement.offsetHeight}px`;
      });
      h.observe(g);
      const k = TJ(b, a, () => {
        const l = c.contentDocument?.body?.parentElement?.offsetHeight;
        l && (c.height = `${l}px`);
      });
      NJ.push(() => {
        h.disconnect();
        a.clearInterval(k);
      });
    }
    function e() {
      if (!f) {
        const g = c.contentDocument?.body || c.contentWindow?.document?.body;
        g && ((f = !0), d(g));
      }
      return f;
    }
    let f = !1;
    c.onload = () => void e();
    b.za(
      1066,
      pD(a, () => e(), 100)
    );
  }
  const NJ = [];
  function UJ(a, b, c) {
    return (
      a.substring(Math.max(b - 30, 0), b) +
      "~~" +
      a.substring(c, Math.min(c + 30, a.length))
    );
  }
  function VJ(a) {
    a = tJ(a);
    var b = new Dk();
    b = x(b, 1, a[0], 0);
    b = x(b, 2, a[1], 0);
    b = x(b, 3, a[2], 0);
    return x(b, 4, a[3], 0);
  }
  class WJ {
    constructor(a, b) {
      this.A = a;
      this.j = !1;
      this.B = b;
      this.l = this.B.ta(264, (c) => {
        this.j &&
          (XJ || (c = Date.now()),
          this.A(c),
          XJ ? YJ.call(t, this.l) : t.setTimeout(this.l, 17));
      });
    }
    start() {
      this.j || ((this.j = !0), XJ ? YJ.call(t, this.l) : this.l(0));
    }
  }
  var YJ = t.requestAnimationFrame || t.webkitRequestAnimationFrame,
    XJ = !!YJ && !/'iPhone'/.test(t.navigator.userAgent);
  function ZJ(a) {
    return a * a * a;
  }
  function $J(a) {
    a = 1 - a;
    return 1 - a * a * a;
  }
  class aK {
    constructor(a, b, c) {
      this.l = a;
      this.F = b;
      this.J = 100;
      this.progress = 0;
      this.j = null;
      this.I = !1;
      this.A = [];
      this.B = null;
      this.C = new WJ(Ka(this.K, this), c);
    }
    K(a) {
      if (this.I) this.C.j = !1;
      else {
        null === this.j && (this.j = a);
        this.progress = (a - this.j) / this.J;
        1 <= this.progress && (this.progress = 1);
        a = this.B ? this.B(this.progress) : this.progress;
        this.A = [];
        for (let b = 0; b < this.l.length; b++)
          this.A.push((this.F[b] - this.l[b]) * a + this.l[b]);
        this.D();
        1 == this.progress && ((this.C.j = !1), this.G());
      }
    }
    G() {}
    D() {}
    play() {
      this.I = !1;
      this.C.start();
    }
    reset(a, b, c) {
      this.j = null;
      this.l = a;
      this.F = b;
      this.J = c;
      this.progress = 0;
    }
  }
  var bK = class {
    constructor(a, b, c, d, e, f) {
      this.K = a;
      this.M = b;
      this.D = c;
      this.I = d;
      this.J = e;
      this.F = f;
    }
    get j() {
      return this.K;
    }
    get B() {
      return this.M;
    }
    get A() {
      return this.D;
    }
    get G() {
      return this.I;
    }
    get l() {
      return this.J;
    }
    get C() {
      return this.F;
    }
  };
  function cK(a, b) {
    const c = a.document.createElement("SPAN");
    c.appendChild(a.document.createTextNode("shoppingmode"));
    yJ(c);
    M(c, b);
    c.className = "google-material-icons";
    return c;
  }
  function dK(a, b, c) {
    return By({ L: a, Kc: 3e3, Lc: a.innerWidth > km ? 650 : 0, pa: c, md: b });
  }
  let eK = "",
    fK = null,
    gK = "",
    hK = null;
  function iK(a, b, c, d, e) {
    if (eK !== d || fK !== c || gK !== e) {
      if (null !== hK) {
        var f = hK,
          g = b.A,
          h = new sk();
        f = x(h, 1, f, 0);
        h = AJ(g, 8);
        f = qd(h, 7, al, f);
        BJ(g, f);
      }
      eK = d;
      fK = c;
      gK = e;
      (c = jK(a))
        ? (hK = kK(c, b))
        : Fy(a)
        ? (hK = null)
        : ((c = a.getComputedStyle(a.document.body).paddingBottom.match(/\d+/)),
          M(a.document.body, {
            "padding-bottom": (c && c.length ? Number(c[0]) + 45 : 45) + "px",
          }),
          lK(a),
          (c = document.createElement("div")),
          (c.id = "google-anno-sa"),
          (c.dir = PJ(b) ? "rtl" : "ltr"),
          M(c, {
            background: "white",
            "border-style": "solid",
            "border-top-left-radius": "20px",
            "border-top-right-radius": "20px",
            bottom: "0",
            height: "45px",
            position: "fixed",
            "text-align": "center",
            width: "100%",
            border: "0px",
            left: "0px",
            "box-shadow": "0px 0px 10px 0px #00000026",
            "z-index": "1000",
          }),
          c.appendChild(mK(a, b)),
          c.appendChild(nK(a, b)),
          c.appendChild(oK(a, b)),
          (b = kK(c, b)),
          a.document.body.appendChild(c),
          (hK = b));
    }
  }
  function kK(a, b) {
    var c = B(b.B, 11);
    a = a.getElementsByClassName("google-anno-sa-qtx")[0];
    a instanceof HTMLElement && (a.innerText = c.replace("TERM", eK));
    b = b.A;
    c = new tk();
    c = w(c, 1, fK);
    c = x(c, 4, eK, "");
    a = AJ(b, 7);
    c = qd(a, 6, al, c);
    return BJ(b, c);
  }
  function jK(a) {
    return a.document.getElementById("google-anno-sa");
  }
  function nK(a, b) {
    const c = document.createElement("SPAN");
    yJ(c);
    M(c, {
      position: "absolute",
      top: "2.5px",
      bottom: "2.5px",
      left: "60px",
      right: "60px",
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      color: "#1967D2",
      cursor: "pointer",
    });
    var d = PJ(b);
    b.j || M(c, { "justify-content": "" });
    c.appendChild(
      cK(a, {
        "font-family": '"Google Material Icons"',
        "font-size": "18px",
        "font-style": "normal",
        "font-weight": "normal",
        "text-decoration": "none",
        width: "15px",
        height: "15px",
        "margin-left": d ? "8px" : "",
        "margin-right": d ? "" : "8px",
        "margin-top": "11px",
        "line-height": "normal",
      })
    );
    d = document.createElement("SPAN");
    d.className = "google-anno-sa-qtx";
    M(d, {
      height: "40px",
      "align-items": "center",
      "line-height": "40px",
      "font-size": "16px",
      "font-weight": "400",
      "font-style": "normal",
      "font-family": "Roboto",
      "text-overflow": "ellipsis",
      "white-space": "nowrap",
      overflow: "hidden",
      "-webkit-tap-highlight-color": "transparent",
    });
    const e = b.na(2);
    pK(b, 999, c, (f) => qK(a, b, f, e));
    c.appendChild(d);
    return c;
  }
  function mK(a, b) {
    const c = document.createElement("SPAN");
    c.id = "gda";
    const d = rK(a, b);
    c.appendChild(d);
    pK(b, 1064, c, (e) => {
      const f = PJ(b),
        g = (b.j ? f : !f) ? a.innerWidth : -a.innerWidth;
      sK(b, jK(a), 0, g, ZJ).play();
      const h = tK(b);
      h.appendChild(
        cK(a, {
          "font-family": '"Google Material Icons"',
          "font-size": "18px",
          "font-style": "normal",
          "font-weight": "normal",
          "text-decoration": "none",
          "margin-right": "8px",
          "margin-top": "10px",
          left: "13px",
          top: "14px",
          margin: "0",
          position: "absolute",
          "line-height": "normal",
        })
      );
      pK(b, 1064, h, (k) => {
        const l = (b.j ? f : !f) ? a.innerWidth : -a.innerWidth;
        sK(b, jK(a), l, 0, $J).play();
        a.document.body.removeChild(h);
        k.preventDefault();
        return !1;
      });
      a.document.body.appendChild(h);
      e.preventDefault();
      return !1;
    });
    return c;
  }
  function rK(a, b) {
    var c = a.document;
    a = c.createElementNS("http://www.w3.org/2000/svg", "svg");
    var d = PJ(b);
    b = b.j ? d : !d;
    M(a, {
      bottom: "12.5px",
      display: "block",
      height: "20px",
      left: b ? "" : "0",
      right: b ? "0" : "",
      margin: "0 20px",
      "pointer-events": "initial",
      position: "absolute",
      top: "12.5px",
      transform: "none",
      width: "20px",
    });
    b = c.createElementNS("http://www.w3.org/2000/svg", "defs");
    a.appendChild(b);
    c = c.createElementNS("http://www.w3.org/2000/svg", "g");
    c.setAttribute("class", "down");
    c.setAttribute("stroke", "#616161");
    c.setAttribute("stroke-linecap", "square");
    c.setAttribute("stroke-width", "2px");
    b = c.ownerDocument;
    d = b.createElementNS("http://www.w3.org/2000/svg", "line");
    d.setAttribute("x1", "6");
    d.setAttribute("y1", "14");
    d.setAttribute("x2", "14");
    d.setAttribute("y2", "6");
    c.appendChild(d);
    b = b.createElementNS("http://www.w3.org/2000/svg", "line");
    b.setAttribute("x1", "6");
    b.setAttribute("y1", "6");
    b.setAttribute("x2", "14");
    b.setAttribute("y2", "14");
    c.appendChild(b);
    a.appendChild(c);
    return a;
  }
  function oK(a, b) {
    const c = document.createElement("DIV");
    c.id = "google-anno-ea";
    b.j || M(c, { width: "60px", height: "45px", cursor: "pointer" });
    const d = uK(a, b);
    c.appendChild(d);
    const e = b.na(2);
    pK(b, 999, c, (f) => qK(a, b, f, e));
    return c;
  }
  function uK(a, b) {
    var c = a.document;
    a = c.createElementNS("http://www.w3.org/2000/svg", "svg");
    var d = PJ(b);
    d = b.j ? d : !d;
    M(a, {
      bottom: "12.5px",
      display: "block",
      height: "20px",
      margin: "0 20px",
      "pointer-events": "initial",
      position: "absolute",
      left: d ? "0" : "",
      right: d ? "" : "0",
      top: "12.5px",
      transform: "none",
      width: "20px",
    });
    d = c.createElementNS("http://www.w3.org/2000/svg", "defs");
    a.appendChild(d);
    c = c.createElementNS("http://www.w3.org/2000/svg", "g");
    c.setAttribute("class", "down");
    c.setAttribute("stroke", "#616161");
    c.setAttribute("stroke-width", "2px");
    c.setAttribute("stroke-linecap", "square");
    b.j
      ? ((b = c.ownerDocument),
        (d = b.createElementNS("http://www.w3.org/2000/svg", "line")),
        d.setAttribute("x1", "6"),
        d.setAttribute("y1", "12"),
        d.setAttribute("x2", "10"),
        d.setAttribute("y2", "8"),
        c.appendChild(d),
        (b = b.createElementNS("http://www.w3.org/2000/svg", "line")),
        b.setAttribute("x1", "10"),
        b.setAttribute("y1", "8"),
        b.setAttribute("x2", "14"),
        b.setAttribute("y2", "12"),
        c.appendChild(b))
      : PJ(b)
      ? ((b = c.ownerDocument),
        (d = b.createElementNS("http://www.w3.org/2000/svg", "line")),
        d.setAttribute("x1", "6"),
        d.setAttribute("y1", "6"),
        d.setAttribute("x2", "10"),
        d.setAttribute("y2", "10"),
        c.appendChild(d),
        (b = b.createElementNS("http://www.w3.org/2000/svg", "line")),
        b.setAttribute("x1", "10"),
        b.setAttribute("y1", "10"),
        b.setAttribute("x2", "6"),
        b.setAttribute("y2", "14"),
        c.appendChild(b))
      : ((b = c.ownerDocument),
        (d = b.createElementNS("http://www.w3.org/2000/svg", "line")),
        d.setAttribute("x1", "10"),
        d.setAttribute("y1", "6"),
        d.setAttribute("x2", "6"),
        d.setAttribute("y2", "10"),
        c.appendChild(d),
        (b = b.createElementNS("http://www.w3.org/2000/svg", "line")),
        b.setAttribute("x1", "6"),
        b.setAttribute("y1", "10"),
        b.setAttribute("x2", "10"),
        b.setAttribute("y2", "14"),
        c.appendChild(b));
    a.appendChild(c);
    return a;
  }
  function tK(a) {
    const b = document.createElement("div");
    b.id = "gca";
    const c = PJ(a);
    a = a.j ? c : !c;
    M(b, {
      position: "fixed",
      bottom: "0%",
      left: a ? "" : "0%",
      right: a ? "0%" : "",
      width: "45px",
      height: "45px",
      background: "white",
      "border-top-left-radius": "20px",
      "border-top-right-radius": "20px",
      "box-shadow": "0px 0px 10px 0px #00000026",
      color: "#1967D2",
      "z-index": "1000",
    });
    return b;
  }
  function lK(a) {
    new MutationObserver((b) => {
      b.forEach((c) => {
        "attributes" === c.type &&
          "0px" === a.document.body.style.paddingBottom &&
          M(a.document.body, { "padding-bottom": "45px" });
      });
    }).observe(a.document.body, { attributes: !0 });
  }
  function qK(a, b, c, d) {
    d = zJ(fK, null, hK, gK, eK, b.na(4), d, b);
    KJ(a, b, d, eK);
    c.preventDefault();
    return !1;
  }
  function vK(a) {
    try {
      return null !== a.location?.href?.match(/goog_fsa=1/);
    } catch (b) {
      return !1;
    }
  }
  function wK(a) {
    if (a.j >= a.A.length) {
      if (!U(yr)) {
        a.l = !0;
        return;
      }
      a.j = 0;
    }
    if (FJ) EJ.j.push(() => void wK(a));
    else {
      var b = a.A[a.j++];
      a.l = !1;
      iK(a.win, a.B, null, b.j, b.l);
      HJ(a.B, 898, a.win, () => void wK(a), a.C);
    }
  }
  function xK(a, b, c) {
    a.A.push(new yK(b, c));
    a.l && wK(a);
  }
  var zK = class {
    constructor(a, b, c) {
      this.C = a;
      this.win = b;
      this.B = c;
      this.A = [];
      this.l = !0;
      this.j = 0;
    }
  };
  class yK {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
  }
  const AK =
    /[\s!'",:;\\(\\)\\?\\.\u00bf\u00a1\u30a0\uff1d\u037e\u061f\u3002\uff1f\uff1b\uff1a\u2014\u2014\uff5e\u300a\u300b\u3008\u3009\uff08\uff09\u300c\u300d\u3001\u00b7\u2026\u2025\uff01\uff0c\u00b7\u2019\u060c\u061b\u060d\u06d4\u0648]/;
  function BK(a, b) {
    switch (b) {
      case 1:
        return !0;
      default:
        return "" === a || AK.test(a);
    }
  }
  function CK(a, b, c, d) {
    return BK(a.charAt(b - 1), d) && BK(a.charAt(c + 1), d);
  }
  function DK(a, b, c, d) {
    if (!CK(a, b.l, b.A, c)) return null;
    c = a.substring(b.l, b.A + 1);
    a = UJ(a, b.l, b.A + 1);
    b = b.j;
    b = Jk(Ik(Hk(Gk(Ek(1), c), a), b), null);
    EK(d, b);
    return c;
  }
  var HK = class {
    constructor(a, b) {
      this.l = a;
      this.j = new FK(b);
      for (var c of this.l) {
        var d = B(c, 1);
        for (var e of A(c, pF, 2)) {
          a = this.j;
          b = B(e, 1);
          var f = d,
            g = a.B.has(f) ? a.B.get(f) : a.D++;
          a.B.set(f, g);
          a.l.set(g, f);
          f = 0;
          for (let h = 0; h < b.length; h++) {
            const k = b.charCodeAt(h);
            a.j[f].contains(k) ||
              (a.j.push(new GK()),
              (a.j[a.size].D = f),
              (a.j[a.size].G = k),
              a.j[f].A.set(k, a.size),
              a.size++);
            f = a.j[f].A.get(k);
          }
          a.j[f].C = !0;
          a.j[f].B = g;
          a.j[f].F = a.A.length;
          a.A.push(b.length);
        }
      }
      c = this.j;
      e = [];
      for (e.push(0); 0 < e.length; ) {
        d = e.shift();
        a = c;
        b = d;
        g = a.j[b];
        if (0 === b) (g.j = 0), (g.l = 0);
        else if (0 === g.D) (g.j = 0), (g.l = g.C ? b : a.j[a.j[b].j].l);
        else {
          g = a.j[a.j[b].D].j;
          for (f = a.j[b].G; ; ) {
            if (a.j[g].contains(f)) {
              a.j[b].j = a.j[g].A.get(f);
              break;
            }
            if (0 === g) {
              a.j[b].j = 0;
              break;
            }
            g = a.j[g].j;
          }
          a.j[b].l = a.j[b].C ? b : a.j[a.j[b].j].l;
        }
        for (const h of c.j[d].childNodes) e.push(h);
      }
    }
    match(a) {
      return this.j.match(a);
    }
  };
  class FK {
    constructor(a) {
      this.C = a;
      this.size = 1;
      this.j = [new GK()];
      this.A = [];
      this.B = new Map();
      this.l = new Map();
      this.D = 0;
    }
    match(a) {
      let b = 0;
      const c = [];
      for (let g = 0; g < a.length; g++) {
        for (;;) {
          var d = a.charCodeAt(g),
            e = this.j[b],
            f = String.fromCharCode(d);
          f =
            f.toLowerCase() === f
              ? f.toUpperCase().charCodeAt(0)
              : f.toLowerCase().charCodeAt(0);
          if (e.contains(d)) {
            b = e.A.get(d);
            break;
          }
          if (U($q) && e.contains(f)) {
            b = e.A.get(f);
            break;
          }
          if (0 === b) break;
          b = e.j;
        }
        for (d = b; ; ) {
          d = this.j[d].l;
          if (0 === d) break;
          e = g + 1 - this.A[this.j[d].F];
          f = g;
          U(Ar)
            ? CK(a, e, f, this.C) &&
              c.push(new IK(e, f, this.l.get(this.j[d].B)))
            : c.push(new IK(e, f, this.l.get(this.j[d].B)));
          d = this.j[d].j;
        }
      }
      return c;
    }
  }
  class GK {
    constructor() {
      this.A = new Map();
      this.K = !1;
      this.V = this.J = this.I = this.R = this.M = this.N = -1;
    }
    contains(a) {
      return this.A.has(a);
    }
    set D(a) {
      this.N = a;
    }
    get D() {
      return this.N;
    }
    set G(a) {
      this.M = a;
    }
    get G() {
      return this.M;
    }
    set C(a) {
      this.K = a;
    }
    get C() {
      return this.K;
    }
    set B(a) {
      this.J = a;
    }
    get B() {
      return this.J;
    }
    set j(a) {
      this.R = a;
    }
    get j() {
      return this.R;
    }
    set l(a) {
      this.I = a;
    }
    get l() {
      return this.I;
    }
    set F(a) {
      this.V = a;
    }
    get F() {
      return this.V;
    }
    get childNodes() {
      return this.A.values();
    }
  }
  var IK = class {
      constructor(a, b, c) {
        this.C = a;
        this.B = b;
        this.D = c;
      }
      get l() {
        return this.C;
      }
      get A() {
        return this.B;
      }
      get j() {
        return this.D;
      }
      get length() {
        return this.B - this.C;
      }
    },
    JK = class {
      constructor(a) {
        this.j = a;
        this.matches = [];
      }
    };
  const KK = ["block", "inline", "inline-block", "list-item", "table-cell"];
  function LK(a, b, c, d, e, f, g) {
    if (c.na(5) >= c.I) return !1;
    for (let $d = 0; $d < b.childNodes.length; $d++) {
      const nc = b.childNodes[$d];
      if (nc.nodeType === Node.TEXT_NODE && "" !== nc.textContent) {
        a: {
          var h = a,
            k = c,
            l = b,
            m = nc.textContent,
            n = d,
            q = e,
            r = f,
            y = g;
          const oc = [];
          b: {
            var E = m;
            switch (k.C) {
              case 1:
                var D = E;
                const Oa = Array(D.length);
                let sa = 0;
                for (let Aa = 0; Aa < D.length; Aa++)
                  AK.test(D[Aa]) || sa++, (Oa[Aa] = sa);
                var C = Oa;
                break b;
              default:
                var G = E;
                const Ia = Array(G.length);
                let Pa = 0,
                  da = 0;
                for (; da < G.length; ) {
                  for (; /\s/.test(G[da]); ) (Ia[da] = Pa), da++;
                  let Aa = !1;
                  for (; da < G.length && !/\s/.test(G[da]); )
                    (Aa = !0), (Ia[da] = Pa), da++;
                  Aa && (Pa++, (Ia[da - 1] = Pa));
                }
                C = Ia;
            }
          }
          const Zb = C;
          if (m.includes("\u00bb")) var K = [];
          else {
            const Oa = q.match(m),
              sa = new Map();
            for (const Ia of Oa) {
              const Pa = Ia.l;
              if (sa.has(Pa)) {
                const da = sa.get(Pa);
                Ia.length > da.length && sa.set(Pa, Ia);
              } else sa.set(Pa, Ia);
            }
            K = Array.from(sa.values());
          }
          const Gl = K,
            uf = !!k.l;
          let vf = -1;
          for (const Oa of Gl) {
            const sa = Oa.l,
              Ia = Oa.A;
            var H;
            if (!(H = !CK(m, sa, Ia, k.C))) {
              var I = r,
                ta = Oa.j,
                Ja = I.l;
              const Z = I.j + Zb[sa] - V(Zq);
              for (const Q of Ja.j.keys()) {
                const $a = Ja.j.get(Q);
                let ib = 0;
                for (; ib < $a.length && $a[ib] < Z; ) ib++;
                Ja.l -= ib;
                0 < ib && Ja.j.set(Q, $a.slice(ib));
              }
              var ua = I,
                xa = ua.l,
                ha = ta;
              H = !(
                (xa.j.has(ha) ? xa.j.get(ha).length : 0) < ua.B && I.l.A < I.A
              );
            }
            if (H) continue;
            var ja;
            if ((ja = !uf)) {
              const Z = h.getComputedStyle(l),
                Q = Z.fontSize.match(/\d+/);
              ja = !(
                Q &&
                12 <= Number(Q[0]) &&
                22 >= Number(Q[0]) &&
                Ab(KK, Z.display)
              );
            }
            if (ja) {
              r.j += Zb[Zb.length - 1];
              var La = [];
              break a;
            }
            uf &&
              U(pr) &&
              !(0 < n.j) &&
              iK(h, k, null, Oa.j, m.substring(sa, Ia + 1));
            const Pa = vf + 1;
            Pa < sa && oc.push(h.document.createTextNode(m.substring(Pa, sa)));
            const da = m.substring(sa, Ia + 1),
              Aa = UJ(m, sa, Ia + 1);
            if (uf) {
              var X = da,
                lc = Aa,
                wf = Oa.j,
                Mh = Zb[sa];
              var xf = Jk(Ik(Hk(Gk(Ek(1), X), lc), wf), Mh);
            } else {
              var Nh = h,
                ae = l,
                Oh = da,
                Ph = Aa,
                be = Oa.j,
                Qh = Zb[sa];
              const Z = ae.getBoundingClientRect();
              var ce = Jk(Ik(Hk(Gk(Ek(2), Oh), Ph), be), Qh);
              var yb = x(ce, 6, Z.x, 0);
              var Rh = x(yb, 7, Z.y, 0);
              const Q = Nh.getComputedStyle(ae);
              var yf = new Lk();
              var Sh = x(yf, 1, Q.fontFamily, "");
              var Hl = VJ(Q.color);
              var Il = od(Sh, 7, Hl);
              var Th = VJ(Q.backgroundColor);
              var zf = od(Il, 8, Th);
              const $a = Q.fontSize.match(/^(\d+)px$/);
              var de = x(zf, 4, $a ? Number($a[1]) : 0, 0);
              const ib = Number(Q.fontWeight);
              isNaN(ib) || 400 === ib || x(de, 5, ib, 0);
              "none" !== Q.textDecorationLine &&
                x(de, 6, Q.textDecorationLine, "");
              var Uh = od(Rh, 8, de);
              const bu = [];
              let Af = ae;
              for (; Af; ) {
                var Vh = bu,
                  Jl = Vh.push,
                  Bf = Af,
                  Kl = new Nk();
                const cu = x(Kl, 1, Bf.tagName, "");
                "" !== Bf.className && jd(cu, 2, Bf.className.split(" "));
                Jl.call(Vh, cu);
                if ("BODY" === Af.tagName) break;
                Af = Af.parentElement;
              }
              var Wh = bu.reverse();
              xf = rd(Uh, 9, Wh);
            }
            const oa = EK(n, xf);
            var Xh = oc,
              Ll = Xh.push,
              Yh = h,
              Cf = k,
              Zh = oa,
              $h = Oa.j,
              ai = da;
            var Ml = Cf.l ? MK(Yh, Cf, Zh, $h, ai, y) : NK(Yh, Cf, Zh, $h, ai);
            Ll.call(Xh, Ml);
            var ee = r.l,
              Df = Oa.j,
              Nl = r.j + Zb[sa];
            let ea = [];
            ee.j.has(Df) && (ea = ee.j.get(Df));
            ea.push(Nl);
            ee.l++;
            ee.j.set(Df, ea);
            vf = Ia;
          }
          const Ef = vf + 1;
          0 !== Ef &&
            Ef < m.length &&
            oc.push(h.document.createTextNode(m.substring(Ef)));
          r.j += Zb[Zb.length - 1];
          La = oc;
        }
        const pd = La;
        if (0 < pd.length && !U(tr)) {
          for (const oc of pd) b.insertBefore(oc, nc), OK(oc);
          b.removeChild(nc);
          $d += pd.length - 1;
        }
      } else if (PK(nc, c) && !LK(a, nc, c, d, e, f, g)) return !1;
    }
    return !0;
  }
  function OK(a) {
    if (a.nodeType === Node.ELEMENT_NODE) {
      if ("A" === a.tagName) {
        var b = vJ(tJ(getComputedStyle(a.parentElement).color)),
          c = vJ(tJ(getComputedStyle(a).color));
        var d = uJ(a);
        if (
          (d =
            b && c && d ? (WE(c, d) < Math.min(WE(b, d), 4.5) ? b : null) : b)
        ) {
          b = d[0];
          c = d[1];
          d = d[2];
          b = Number(b);
          c = Number(c);
          d = Number(d);
          if (b != (b & 255) || c != (c & 255) || d != (d & 255))
            throw Error(
              '"(' + b + "," + c + "," + d + '") is not a valid RGB color'
            );
          c = (b << 16) | (c << 8) | d;
          b =
            16 > b
              ? "#" + (16777216 | c).toString(16).slice(1)
              : "#" + c.toString(16);
          M(a, { color: b });
        }
      }
      for (b = 0; b < a.childElementCount; b++) OK(a.children[b]);
    }
  }
  function PK(a, b) {
    if (
      a.nodeType !== Node.ELEMENT_NODE ||
      a.classList?.contains("google-anno-skip") ||
      (U(dr) && !a.offsetHeight)
    )
      return !1;
    switch (a.tagName?.toUpperCase?.()) {
      case "IFRAME":
      case "AUDIO":
      case "BUTTON":
      case "CANVAS":
      case "CITE":
      case "CODE":
      case "EMBED":
      case "FOOTER":
      case "FORM":
      case "KBD":
      case "LABEL":
      case "OBJECT":
      case "PRE":
      case "SAMP":
      case "SCRIPT":
      case "SELECT":
      case "STYLE":
      case "SUB":
      case "SUPER":
      case "SVG":
      case "TEXTAREA":
      case "TIME":
      case "VAR":
      case "VIDEO":
      case null:
        return !1;
      case "A":
        return !!b.l;
      default:
        return (
          !!b.l ||
          !(
            a.className.toUpperCase?.()?.includes("CRUMB") ||
            a.id.toUpperCase?.()?.includes("CRUMB")
          )
        );
    }
  }
  function MK(a, b, c, d, e, f) {
    const g = a.document.createElement("SPAN");
    g.appendChild(a.document.createTextNode(e));
    QK(b, 898, (h) => {
      h.forEach((k) => {
        k.isIntersecting &&
          k.target.textContent &&
          (U(wr) ? xK(f, d, e) : iK(a, b, c, d, e));
      });
    }).observe(g);
    return g;
  }
  class RK {
    constructor() {
      this.j = null;
    }
    get l() {
      return this.j;
    }
  }
  function NK(a, b, c, d, e) {
    const f = a.document.createElement("SPAN");
    SK(f);
    f.appendChild(a.document.createTextNode(e));
    const g = a.document.createElement("A");
    yJ(g);
    M(g, { "text-decoration": "none" });
    sf(g);
    g.className = "google-anno";
    g.appendChild(
      cK(a, {
        bottom: "-1px",
        "font-family": '"Google Material Icons", "goog-matfb"',
        "font-size": "90%",
        "font-style": "normal",
        "font-weight": "normal",
        position: "relative",
        "text-decoration": "none",
      })
    );
    g.appendChild(a.document.createTextNode("\u00a0"));
    g.appendChild(f);
    const h = TK(b, c, g),
      k = b.na(2);
    pK(b, 999, g, (l) => {
      try {
        const m = zJ(c, h.l, null, e, d, b.na(4), k, b);
        KJ(a, b, m, d);
        return !1;
      } finally {
        l.preventDefault(), l.stopImmediatePropagation();
      }
    });
    return g;
  }
  function TK(a, b, c) {
    const d = new RK();
    QK(a, 1065, (e) => {
      for (const k of e)
        if (k.isIntersecting) {
          var f = b;
          e = a.A;
          var g = new Vk();
          f = x(g, 1, f, 0);
          g = AJ(e, 5);
          f = qd(g, 4, al, f);
          e = BJ(e, f);
          d.j = e;
        } else if (((e = d), e.j)) {
          f = a.A;
          g = new Uk();
          g = x(g, 1, e.j, 0);
          var h = AJ(f, 6);
          g = qd(h, 5, al, g);
          BJ(f, g);
          e.j = null;
        }
    }).observe(c);
    return d;
  }
  function SK(a) {
    yJ(a);
    M(a, { "text-decoration": "underline" });
    M(a, { "text-decoration-style": "dotted" });
    M(a, {
      "-webkit-text-decoration-line": "underline",
      "-webkit-text-decoration-style": "dotted",
    });
  }
  function EK(a, b) {
    a.j++;
    a.C.add(B(b, 4));
    a.entries.push(Wc(b));
    return a.entries.length - 1;
  }
  function UK(a, b, c, d) {
    const e = new zk();
    switch (a) {
      case "se":
        return (b = new yk()), qd(e, 1, Ak, b);
      case "sw":
        return (b = new yk()), qd(e, 2, Ak, b);
      case "si":
        return (b = new yk()), qd(e, 3, Ak, b);
      case "sl":
        return (b = new yk()), qd(e, 5, Ak, b);
      case "l":
        return (b = new yk()), qd(e, 6, Ak, b);
    }
    if (c && b) {
      if (b.l) return (a = new xk()), (b = x(a, 1, b.l, 0)), qd(e, 7, Ak, b);
      if (c.l && b.A && (!d || !b.B)) return (b = new yk()), qd(e, 8, Ak, b);
    }
    return null;
  }
  var VK = class {
    constructor() {
      this.j = 0;
      this.entries = [];
      this.C = new Set();
      this.l = 0;
      this.A = this.B = null;
    }
    sendGen204(a, b, c, d, e, f, g, h, k) {
      var l = V(ar);
      a = a.location?.hostname || "";
      var m = Array.from(this.A ?? [])
          .sort()
          .join(","),
        n = this.B || "";
      let q = 0;
      for (const r of A(d, rF, 2)) q += A(r, pF, 2).length;
      b = {
        wp: b,
        c,
        e: l,
        h: a,
        ld: m,
        lx: n,
        m: q,
        n: this.j,
        o: f,
        p: A(d, rF, 2).length,
        t: this.C.size,
        w: this.l,
        x: Math.round(e),
      };
      $i(
        k,
        "adfil-imp",
        {
          ...b,
          ...(g
            ? {
                sap: Number(g.j),
                tap: Number(g.B),
                bap: Number(g.A),
                nsr: g.l,
                im: Number(g.C),
                mo: Number(g.G),
                hesa: Number(h.j),
              }
            : {}),
        },
        !0,
        1
      );
    }
  };
  var WK = class {
    constructor(a, b, c) {
      this.win = a;
      this.l = b;
      this.A = c;
    }
    get window() {
      return this.win;
    }
    get j() {
      return this.l;
    }
    get D() {
      return this.A;
    }
  };
  var XK = class {
    constructor(a, b) {
      this.A = a;
      this.j = b;
    }
    get l() {
      return this.A;
    }
  };
  function IJ(a, b) {
    var c = AJ(a, 9);
    b = qd(c, 9, al, b);
    BJ(a, b);
  }
  function BJ(a, b) {
    for (const c of a.j) c(b);
    return vd(b, 1);
  }
  function AJ(a, b) {
    var c = new $k();
    var d = a.C++;
    c = x(c, 1, d, 0);
    b = x(c, 2, Math.round(a.l.na(b) - a.A), 0);
    return od(b, 10, a.B);
  }
  var YK = class {
    constructor(a, b, c, d) {
      this.l = a;
      this.A = b;
      this.B = c;
      this.C = 1;
      this.j = [...d];
    }
  };
  function ZK(a) {
    return a ? ((a = a.match(/^[a-z]{2,3}/i)) ? a[0].toLowerCase() : "") : "";
  }
  function $K(a) {
    return new Set(a.map(ZK).filter((b) => b.length));
  }
  var aL = class {
    constructor(a, b, c) {
      this.j = a;
      this.A = b;
      this.B = c;
    }
    get l() {
      return this.A;
    }
    get C() {
      return this.B;
    }
  };
  class bL extends aK {
    constructor(a, b, c, d, e) {
      super([b], [c], d);
      this.M = a;
      this.B = e || null;
    }
    D() {
      const a = {};
      a.left = this.A[0] + "px";
      ki(this.M, a);
    }
    G() {}
  }
  function HJ(a, b, c, d, e) {
    return c.setTimeout(cL(a, b, d), e);
  }
  function PJ(a) {
    return 2 === id(a.B, 12);
  }
  function SJ(a, b, c) {
    b.requestAnimationFrame(cL(a, 1066, c));
  }
  function TJ(a, b, c) {
    return b.setInterval(cL(a, 1066, c), 1e3);
  }
  function pK(a, b, c, d) {
    c.addEventListener("click", cL(a, b, d));
  }
  function sK(a, b, c, d, e) {
    return new bL(b, c, d, a.G, e);
  }
  function QK(a, b, c) {
    return new IntersectionObserver(cL(a, b, c), { threshold: 0.98 });
  }
  function cL(a, b, c) {
    return a.G.ta(b, c, void 0, (d) => {
      d.e = `${V(ar)}`;
      d.c = `${a.F}`;
    });
  }
  var eL = class {
    constructor(a, b, c, d, e, f, g, h, k, l, m = !1) {
      this.D = a;
      this.j = b;
      this.B = c;
      this.F = d;
      this.I = e;
      this.l = f;
      this.G = g;
      this.A = h;
      this.pa = k;
      this.K = l;
      this.J = m;
      this.C = Ab(dL, B(c, 7)) ? 1 : 0;
    }
    za(a, b) {
      this.G.za(a, b, (c) => {
        c.e = `${V(ar)}`;
        c.c = `${this.F}`;
      });
    }
    na(a) {
      return this.K.na(a);
    }
  };
  const dL = ["ja", "zh_CN", "zh_TW"];
  function fL(a, b, c, d, e, f) {
    var g = xl,
      h = Zi;
    try {
      Lb(a.document);
    } catch (k) {
      return;
    }
    f = U(cr)
      ? (f = IF(new MF(a), "__gads", f))
        ? (f = bh(f + "t2Z7mVic"))
          ? f % 20
          : null
        : null
      : null;
    f || (f = dh() ? null : Math.floor(20 * Zg()));
    null != f && gL(a, b, c, new XK(!1, f), g, d, h, e);
  }
  function hL(a, b, c, d, e, f, g, h) {
    U(Rq) &&
      b &&
      !b.j &&
      (a = Jy(a)) &&
      Ah(a, () => {
        gL(c.window, c.j, c.D, new XK(!0, d.j), e, f, g, h);
      });
  }
  function gL(a, b, c, d, e, f, g, h) {
    const k = b.j;
    if (k) {
      var l = h.na(1),
        m = l + V(Yq);
      !U(tr) && !U(br) && 0 < A(k, rF, 2).length && iL(a.document);
      var n = 488 > P(a).clientWidth;
      if (U(Rq) || vK(a)) {
        var q = A(b.j, rF, 2).length;
        var r = new aL(b.B, b.A, q);
      } else r = null;
      var y = new WK(a, b, c);
      if (U(Rq) || vK(a)) {
        var E = r;
        if (vK(a)) var D = new bK(!0, !1, !1, d.l, 0, n);
        else {
          var C = By({ L: a, Kc: 3e3, Lc: V(Wq), pa: g, Me: !0 });
          var G = dK(a, 2, g),
            K = dK(a, 1, g);
          D = new bK(
            0 < C || !E.j || 0 === E.C ? !1 : !E.l || 0 < K || (n && 0 === G),
            0 === G,
            0 === K,
            d.l,
            C,
            n
          );
        }
      } else D = null;
      var H = D,
        I = new Tk(),
        ta = V(ar);
      var Ja = x(I, 1, ta, 0);
      var ua = x(Ja, 2, d.j, 0);
      var xa = new YK(h, l, ua, f);
      hL(a, H, y, d, e, f, g, h);
      var ha = new VK();
      {
        var ja = new eL(c, n, k, d.j, m, H, e, xa, g, h, b.l);
        const da = a.document.body;
        if (da && jL(da)) {
          var La = da.textContent || "";
          b: switch (ja.C) {
            case 1:
              let Aa = 0;
              for (let ea = La.length - 1; 0 <= ea; ea--)
                AK.test(La[ea]) || Aa++;
              var X = Aa;
              break b;
            default:
              const oa = La.trim();
              X = "" === oa ? 0 : oa.split(/\s+/).length;
          }
          ha.l = X;
          var lc = ZK(B(ja.B, 7));
          {
            const Aa = a.document.documentElement,
              oa = ZK(Aa.lang) || ZK(Aa.getAttribute("xml:lang"));
            if ("" !== oa) var wf = new Set([oa]);
            else {
              var Mh = a.location;
              const ea = Mh.host.match(/^[a-z]{2}\./i),
                Z = ea ? [ea[0]] : [];
              for (const Q of Mh.pathname.split("/"))
                2 === Q.length && Z.push(Q);
              var xf = $K(Z);
              if (xf.size) var Nh = xf;
              else {
                const Q = a.navigator;
                Nh = $K(Q.languages?.length ? Q.languages : [Q.language]);
              }
              wf = Nh;
            }
          }
          ha.B = lc;
          ha.A = new Set(wf);
          if (X < V(fr)) var ae = "sw";
          else {
            if (
              a.document.querySelector(
                'script[src*="www.google.com/adsense/search/ads.js"]'
              )
            )
              var Oh = "si";
            else {
              if (wf.has(lc)) {
                if (ja.na(5) >= ja.I) var Ph = "l";
                else {
                  {
                    const Aa = ja.B;
                    if (0 === A(Aa, rF, 2).length || (ja.l && !ja.l.j))
                      var be = !0;
                    else {
                      if (!ja.l) {
                        var Qh = a.document;
                        const oa = Qh.createElement("style");
                        oa.textContent = $e(
                          ji`@font-face{font-family:"goog-matfb";size-adjust:17.16%;src:local("Times New Roman");}`
                        );
                        Qh.head.appendChild(oa);
                      }
                      var ce = new HK(A(Aa, rF, 2), ja.C);
                      c: {
                        var yb = ce.j;
                        let oa = 0;
                        for (let ea = 0; ea < La.length; ea++) {
                          for (;;) {
                            const Q = La.charCodeAt(ea);
                            if (yb.j[oa].contains(Q)) {
                              oa = yb.j[oa].A.get(Q);
                              break;
                            }
                            if (0 === oa) break;
                            oa = yb.j[oa].j;
                          }
                          let Z = oa;
                          for (;;) {
                            Z = yb.j[Z].l;
                            if (0 === Z) break;
                            const Q = ea + 1 - yb.A[yb.j[Z].F],
                              $a = ea;
                            if (U(Ar) && !CK(La, Q, $a, yb.C)) Z = yb.j[Z].j;
                            else {
                              var Rh = new IK(Q, $a, yb.l.get(yb.j[Z].B));
                              break c;
                            }
                          }
                        }
                        Rh = void 0;
                      }
                      if (Rh) {
                        var yf = U(wr) ? new zK(V(zr), a, ja) : null;
                        if (ja.l && U(pr) && U(wr)) {
                          var Sh = ja.C;
                          if (U(xr)) {
                            const oa = ce.match(La),
                              ea = new Map();
                            for (const Z of oa) {
                              const Q = Z.j;
                              if (ea.has(Q)) ea.get(Q).matches.push(Z);
                              else {
                                const $a = new JK(Q);
                                $a.matches.push(Z);
                                ea.set(Q, $a);
                              }
                            }
                            var Hl = Array.from(ea.values());
                            for (const Z of Hl) {
                              let Q = null;
                              for (const $a of Z.matches) {
                                const ib = DK(La, $a, Sh, ha);
                                null != ib && (Q = ib);
                              }
                              null != Q && xK(yf, Z.j, Q);
                            }
                          } else {
                            const oa = ce.match(La);
                            for (const ea of oa) {
                              const Z = DK(La, ea, Sh, ha);
                              null != Z && xK(yf, ea.j, Z);
                            }
                          }
                          be = !0;
                        } else {
                          var Il = new xJ();
                          be = LK(a, a.document.body, ja, ha, ce, Il, yf);
                        }
                      } else be = !0;
                    }
                  }
                  Ph = be ? "a" : "p";
                }
                var Th = Ph;
              } else Th = "sl";
              Oh = Th;
            }
            ae = Oh;
          }
          var zf = ae;
        } else zf = "se";
      }
      var de = h.na(3) - l;
      if (!U(tr) && 0 < ha.j) {
        if (!F(k, 13)) {
          var Uh = a.document;
          const da = Uh.createElement("LINK");
          If(da, N`https://www.google.com/adsense/search/ads.js`, "prefetch");
          da.as = "script";
          da.fetchPriority = "low";
          Uh.head.appendChild(da);
        }
        U(br) && iL(a.document);
      }
      ha.sendGen204(a, c, d.j, k, de, zf, H, r, g);
      var Vh = b.C,
        Jl = a.location.hostname,
        Bf = b.D,
        Kl = r,
        Wh = zf,
        Xh = new Qk(),
        Ll = new uk();
      var Yh = x(Ll, 1, Vh, "");
      var Cf = x(Yh, 2, Jl, "");
      var Zh = xd(Cf, 3, n);
      var $h = w(Zh, 4, ha.l);
      var ai = od(Xh, 1, $h);
      var Ml = new wk(),
        ee = Array.from(ha.A ?? []).sort();
      var Df = jd(Ml, 1, ee);
      var Nl = x(Df, 2, ha.B, "");
      var $d = x(Nl, 3, Bf, "");
      var nc = od(ai, 2, $d);
      var pd = x(nc, 3, Math.round(de), 0);
      const Pa = UK(Wh, H, Kl, n);
      if (Pa) {
        var oc = new Ck();
        var Zb = sd(oc, 1, zk, Pa);
        qd(pd, 5, Rk, Zb);
      } else {
        var Gl = new Pk();
        var uf = xd(Gl, 1, "p" === Wh);
        var vf = rd(uf, 2, ha.entries);
        var Ef = A(k, rF, 2).length;
        var Oa = x(vf, 3, Ef, 0);
        qd(pd, 4, Rk, Oa);
      }
      var sa = AJ(xa, 3);
      var Ia = qd(sa, 3, al, pd);
      BJ(xa, Ia);
    }
  }
  function jL(a) {
    try {
      Lb(new ResizeObserver(() => {})), Lb(new MutationObserver(() => {}));
    } catch {
      return !1;
    }
    return (
      a.classList &&
      void 0 !== a.classList.contains &&
      void 0 !== a.attachShadow
    );
  }
  function iL(a) {
    const b = a.createElement("LINK"),
      c = U(Sq)
        ? N`https://fonts.googleapis.com/css2?family=Google+Material+Icons:wght@400;500;700&text=shoppingmode`
        : N`https://fonts.googleapis.com/css2?family=Google+Material+Icons:wght@400;500;700`;
    If(b, c, "stylesheet");
    a.head.appendChild(b);
  }
  function kL(a, b, c, d, e) {
    if (!dD(ZC(), 29, !1)) {
      eD(ZC(), 29, !0);
      var f = a.performance;
      f?.now &&
        fL(
          a,
          c,
          d,
          [
            (g) => {
              var h = b.pa;
              var k = sD(b);
              k = w(k, 3, 1);
              g = qd(k, 6, cl, g);
              el(h, g);
            },
          ],
          new rJ(f),
          e
        );
    }
  }
  var lL = class {
    constructor(a, b, c, d, e, f) {
      this.j = a;
      this.C = b;
      this.B = c;
      this.A = d;
      this.D = e;
      this.l = f;
    }
  };
  function mL(a) {
    xl.ge((b) => {
      b.shv = String(a);
      b.mjsv = "m202211080101";
      b.eid = HF(t);
    });
  }
  function nL(a) {
    mL(B(a, 2));
    a = F(a, 6);
    Kd(yF, sj);
    yF = a;
  }
  function oL({ Pe: a, Tf: b }) {
    return a || ("dev" === b ? "dev" : "");
  }
  var pL = "undefined" === typeof sttc ? void 0 : sttc;
  function qL(a) {
    var b = xl;
    try {
      return Kd(a, rj), new tF(JSON.parse(a));
    } catch (c) {
      b.ma(838, c instanceof Error ? c : Error(String(c)), void 0, (d) => {
        d.jspb = String(a);
      });
    }
    return new tF();
  }
  function rL(a, b) {
    b = b && b[0];
    if (!b) return null;
    b = b.target;
    const c = b.getBoundingClientRect(),
      d = Bg(a.j.T() || window);
    if (
      0 >= c.bottom ||
      c.bottom > d.height ||
      0 >= c.right ||
      c.left >= d.width
    )
      return null;
    var e = sL(
        a,
        b,
        c,
        a.j.j.elementsFromPoint(
          lg(c.left + c.width / 2, c.left, c.right - 1),
          lg(c.bottom - 1 - 2, c.top, c.bottom - 1)
        ),
        1,
        []
      ),
      f = sL(
        a,
        b,
        c,
        a.j.j.elementsFromPoint(
          lg(c.left + c.width / 2, c.left, c.right - 1),
          lg(c.top + 2, c.top, c.bottom - 1)
        ),
        2,
        e.Ja
      ),
      g = sL(
        a,
        b,
        c,
        a.j.j.elementsFromPoint(
          lg(c.left + 2, c.left, c.right - 1),
          lg(c.top + c.height / 2, c.top, c.bottom - 1)
        ),
        3,
        [...e.Ja, ...f.Ja]
      );
    const h = sL(
      a,
      b,
      c,
      a.j.j.elementsFromPoint(
        lg(c.right - 1 - 2, c.left, c.right - 1),
        lg(c.top + c.height / 2, c.top, c.bottom - 1)
      ),
      4,
      [...e.Ja, ...f.Ja, ...g.Ja]
    );
    var k = tL(a, b, c),
      l = (n) =>
        Ab(a.A, n.overlapType) &&
        Ab(a.B, n.overlapDepth) &&
        Ab(a.l, n.overlapDetectionPoint);
    e = vb([...e.entries, ...f.entries, ...g.entries, ...h.entries], l);
    l = vb(k, l);
    k = [...e, ...l];
    f = -2 > c.left || c.right > d.width + 2;
    f = 0 < k.length || f;
    g = Cg(a.j.j);
    const m = new Hh(c.left, c.top, c.width, c.height);
    e = [
      ...wb(
        e,
        (n) =>
          new Hh(
            n.elementRect.left,
            n.elementRect.top,
            n.elementRect.width,
            n.elementRect.height
          )
      ),
      ...Jb(wb(l, (n) => Jh(m, n.elementRect))),
      ...vb(
        Jh(m, new Hh(0, 0, d.width, d.height)),
        (n) => 0 <= n.top && n.top + n.height <= d.height
      ),
    ];
    return {
      entries: k,
      isOverlappingOrOutsideViewport: f,
      scrollPosition: { scrollX: g.x, scrollY: g.y },
      target: b,
      targetRect: c,
      viewportSize: { width: d.width, height: d.height },
      overlappedArea: 20 > e.length ? uL(m, e) : vL(c, e),
    };
  }
  function wL(a, b) {
    const c = a.j.T(),
      d = a.j.j;
    return new Promise((e, f) => {
      const g = c.IntersectionObserver;
      if (g)
        if (d.elementsFromPoint)
          if (d.createNodeIterator)
            if (d.createRange)
              if (c.Range.prototype.getBoundingClientRect) {
                var h = new g((k) => {
                  const l = new nj(),
                    m = mj(l, () => rL(a, k));
                  m &&
                    (l.j.length &&
                      (m.executionTime = Math.round(Number(l.j[0].duration))),
                    h.disconnect(),
                    e(m));
                }, xL);
                h.observe(b);
              } else f(Error("5"));
            else f(Error("4"));
          else f(Error("3"));
        else f(Error("2"));
      else f(Error("1"));
    });
  }
  function sL(a, b, c, d, e, f) {
    if (0 === c.width || 0 === c.height) return { entries: [], Ja: [] };
    const g = [],
      h = [];
    for (let n = 0; n < d.length; n++) {
      const q = d[n];
      if (q === b) continue;
      if (Ab(f, q)) continue;
      h.push(q);
      const r = q.getBoundingClientRect();
      if (a.j.contains(q, b)) {
        g.push(yL(a, c, q, r, 1, e));
        continue;
      }
      if (a.j.contains(b, q)) {
        g.push(yL(a, c, q, r, 2, e));
        continue;
      }
      a: {
        var k = a;
        var l = b,
          m = q;
        const D = k.j.bf(l, m);
        if (!D) {
          k = null;
          break a;
        }
        const { suspectAncestor: C, Ua: G } = zL(k, l, D, m) || {},
          { suspectAncestor: K, Ua: H } = zL(k, m, D, l) || {};
        k =
          C && G && K && H
            ? G <= H
              ? { suspectAncestor: C, overlapType: AL[G] }
              : { suspectAncestor: K, overlapType: BL[H] }
            : C && G
            ? { suspectAncestor: C, overlapType: AL[G] }
            : K && H
            ? { suspectAncestor: K, overlapType: BL[H] }
            : null;
      }
      const { suspectAncestor: y, overlapType: E } = k || {};
      y && E ? g.push(yL(a, c, q, r, E, e, y)) : g.push(yL(a, c, q, r, 9, e));
    }
    return { entries: g, Ja: h };
  }
  function tL(a, b, c) {
    const d = [];
    for (b = b.parentElement; b; b = b.parentElement) {
      const f = b.getBoundingClientRect();
      if (f) {
        var e = Yg(b, a.j.T());
        e &&
          "visible" !== e.overflow &&
          ("auto" !== e.overflowY &&
          "scroll" !== e.overflowY &&
          c.bottom > f.bottom + 2
            ? d.push(yL(a, c, b, f, 5, 1))
            : ((e = "auto" === e.overflowX || "scroll" === e.overflowX),
              !e && c.left < f.left - 2
                ? d.push(yL(a, c, b, f, 5, 3))
                : !e && c.right > f.right + 2 && d.push(yL(a, c, b, f, 5, 4))));
      }
    }
    return d;
  }
  function uL(a, b) {
    if (0 === a.width || 0 === a.height || 0 === b.length) return 0;
    let c = 0;
    for (let d = 1; d < 1 << b.length; d++) {
      let e = a,
        f = 0;
      for (
        let g = 0;
        g < b.length && (!(d & (1 << g)) || (f++, (e = Ih(e, b[g])), e));
        g++
      );
      e &&
        (c =
          1 === f % 2
            ? c + (e.width + 1) * (e.height + 1)
            : c - (e.width + 1) * (e.height + 1));
    }
    return c / ((a.width + 1) * (a.height + 1));
  }
  function vL(a, b) {
    if (0 === a.width || 0 === a.height || 0 === b.length) return 0;
    let c = 0;
    for (let d = a.left; d <= a.right; d++)
      for (let e = a.top; e <= a.bottom; e++)
        for (let f = 0; f < b.length; f++)
          if (
            d >= b[f].left &&
            d <= b[f].left + b[f].width &&
            e >= b[f].top &&
            e <= b[f].top + b[f].height
          ) {
            c++;
            break;
          }
    return c / ((a.width + 1) * (a.height + 1));
  }
  function yL(a, b, c, d, e, f, g) {
    const h = {
      element: c,
      elementRect: d,
      overlapType: e,
      overlapDetectionPoint: f,
    };
    if (Ab(a.A, e) && Ab(a.l, f)) {
      b = new Eh(b.top, b.right - 1, b.bottom - 1, b.left);
      if ((a = CL(a, c)) && Gh(b, a)) c = 4;
      else {
        a = DL(c, d);
        if (Ob) {
          e = ui(c, "paddingLeft");
          f = ui(c, "paddingRight");
          var k = ui(c, "paddingTop"),
            l = ui(c, "paddingBottom");
          e = new Eh(k, f, l, e);
        } else
          (e = ni(c, "paddingLeft")),
            (f = ni(c, "paddingRight")),
            (k = ni(c, "paddingTop")),
            (l = ni(c, "paddingBottom")),
            (e = new Eh(
              parseFloat(k),
              parseFloat(f),
              parseFloat(l),
              parseFloat(e)
            ));
        Gh(
          b,
          new Eh(
            a.top + e.top,
            a.right - e.right,
            a.bottom - e.bottom,
            a.left + e.left
          )
        )
          ? (c = 3)
          : ((c = DL(c, d)), (c = Gh(b, c) ? 2 : 1));
      }
      h.overlapDepth = c;
    }
    g && (h.suspectAncestor = g);
    return h;
  }
  function zL(a, b, c, d) {
    const e = [];
    for (var f = b; f && f !== c; f = f.parentElement) e.unshift(f);
    c = a.j.T();
    for (f = 0; f < e.length; f++) {
      const h = e[f];
      var g = Yg(h, c);
      if (g) {
        if ("fixed" === g.position) return { suspectAncestor: h, Ua: 1 };
        if ("sticky" === g.position && a.j.contains(h.parentElement, d))
          return { suspectAncestor: h, Ua: 2 };
        if ("absolute" === g.position) return { suspectAncestor: h, Ua: 3 };
        if ("none" !== g.cssFloat) {
          g = h === e[0];
          const k = EL(a, e.slice(0, f), h);
          if (g || k) return { suspectAncestor: h, Ua: 4 };
        }
      }
    }
    return (a = EL(a, e, b)) ? { suspectAncestor: a, Ua: 5 } : null;
  }
  function EL(a, b, c) {
    const d = c.getBoundingClientRect();
    if (!d) return null;
    for (let e = 0; e < b.length; e++) {
      const f = b[e];
      if (!a.j.contains(f, c)) continue;
      const g = f.getBoundingClientRect();
      if (!g) continue;
      const h = Yg(f, a.j.T());
      if (h && d.bottom > g.bottom + 2 && "visible" === h.overflowY) return f;
    }
    return null;
  }
  function CL(a, b) {
    var c = a.j.j;
    a = c.createRange();
    if (!a) return null;
    c = c.createNodeIterator(b, NodeFilter.SHOW_TEXT, {
      acceptNode: (d) =>
        /^[\s\xa0]*$/.test(d.nodeValue)
          ? NodeFilter.FILTER_SKIP
          : NodeFilter.FILTER_ACCEPT,
    });
    for (b = c.nextNode(); c.nextNode(); );
    c = c.previousNode();
    if (!b || !c) return null;
    a.setStartBefore(b);
    a.setEndAfter(c);
    a = a.getBoundingClientRect();
    return 0 === a.width || 0 === a.height
      ? null
      : new Eh(a.top, a.right, a.bottom, a.left);
  }
  function DL(a, b) {
    if (!Ob || 9 <= Number(bc)) {
      var c = ni(a, "borderLeftWidth");
      d = ni(a, "borderRightWidth");
      e = ni(a, "borderTopWidth");
      a = ni(a, "borderBottomWidth");
      c = new Eh(parseFloat(e), parseFloat(d), parseFloat(a), parseFloat(c));
    } else {
      c = wi(a, "borderLeft");
      var d = wi(a, "borderRight"),
        e = wi(a, "borderTop");
      a = wi(a, "borderBottom");
      c = new Eh(e, d, a, c);
    }
    return new Eh(
      b.top + c.top,
      b.right - 1 - c.right,
      b.bottom - 1 - c.bottom,
      b.left + c.left
    );
  }
  class FL {
    constructor(a) {
      var b = GL;
      this.j = wg(a);
      this.A = [5, 8, 9];
      this.B = [3, 4];
      this.l = b;
    }
  }
  const AL = { [1]: 3, [4]: 10, [3]: 12, [2]: 4, [5]: 5 },
    BL = { [1]: 6, [4]: 11, [3]: 13, [2]: 7, [5]: 8 };
  vb(
    ah({
      Nh: 1,
      Oh: 2,
      xj: 3,
      yj: 4,
      Aj: 5,
      Jh: 6,
      Kh: 7,
      Mh: 8,
      Ni: 9,
      zj: 10,
      Lh: 11,
      wj: 12,
      Ih: 13,
    }),
    (a) => !Ab([1, 2], a)
  );
  ah({ Xg: 1, Oi: 2, kh: 3, Bj: 4 });
  const GL = ah({ Yg: 1, Ej: 2, Bi: 3, lj: 4 }),
    xL = { threshold: [0, 0.25, 0.5, 0.75, 0.95, 0.96, 0.97, 0.98, 0.99, 1] };
  function HL(a, b, c, d) {
    const e = new vv();
    let f = "";
    const g = (k) => {
      try {
        const l = "object" === typeof k.data ? k.data : JSON.parse(k.data);
        f === l.paw_id &&
          (he(a, "message", g),
          l.error ? e.j(Error(l.error)) : e.resolve(d(l)));
      } catch (l) {}
    };
    var h = "function" === typeof a.gmaSdk?.getQueryInfo ? a.gmaSdk : void 0;
    if (h) return L(a, "message", g), (f = c(h)), e.promise;
    c =
      "function" ===
        typeof a.webkit?.messageHandlers?.getGmaQueryInfo?.postMessage ||
      "function" === typeof a.webkit?.messageHandlers?.getGmaSig?.postMessage
        ? a.webkit.messageHandlers
        : void 0;
    return c
      ? ((f = String(Math.floor(2147483647 * Zg()))),
        L(a, "message", g),
        b(c, f),
        e.promise)
      : null;
  }
  function IL(a) {
    return HL(
      a,
      (b, c) => void (b.getGmaQueryInfo ?? b.getGmaSig)?.postMessage(c),
      (b) => b.getQueryInfo(),
      (b) => b.signal
    );
  }
  function JL(a) {
    if (a.j) return a.j;
    a.j = ph(a.A, "__uspapiLocator");
    return a.j;
  }
  function KL(a, b) {
    if ("function" === typeof a.A?.__uspapi)
      (a = a.A.__uspapi), a("getUSPData", 1, b);
    else if (JL(a)) {
      LL(a);
      const c = ++a.F;
      a.D[c] = b;
      a.j &&
        a.j.postMessage(
          { __uspapiCall: { command: "getUSPData", version: 1, callId: c } },
          "*"
        );
    }
  }
  function ML(a, b) {
    let c = {};
    if ("function" === typeof a.A?.__uspapi || null != JL(a)) {
      var d = Wd(() => b(c));
      KL(a, (e, f) => {
        f && (c = e);
        d();
      });
      setTimeout(d, 500);
    } else b(c);
  }
  function LL(a) {
    a.B ||
      ((a.B = (b) => {
        try {
          let d = {};
          "string" === typeof b.data ? (d = JSON.parse(b.data)) : (d = b.data);
          var c = d.__uspapiReturn;
          a.D?.[c.callId](c.returnValue, c.success);
        } catch {}
      }),
      L(a.A, "message", a.B));
  }
  var NL = class extends Km {
    constructor(a) {
      super();
      this.A = a;
      this.j = null;
      this.D = {};
      this.F = 0;
      this.B = null;
    }
    l() {
      this.B && he(this.A, "message", this.B);
      super.l();
    }
  };
  var OL = class extends J {
    constructor(a) {
      super(a);
    }
  };
  function PL(a) {
    a.F || (a.j || (a.j = ph(a.B, "googlefcPresent")), (a.F = !0));
    return !!a.j;
  }
  function QL(a) {
    a.A ||
      ((a.A = (b) => {
        try {
          const c = Dd(OL, b.data.__fciReturn);
          (0, a.D[v(c, 1)])(c);
        } catch (c) {}
      }),
      L(a.B, "message", a.A));
  }
  function RL(a) {
    return new Promise((b) => {
      if (PL(a))
        if (a.j === a.B) {
          var c = a.j.googlefc || (a.j.googlefc = {});
          c.__fci = c.__fci || [];
          c.__fci.push("loaded", (d) => {
            b(Dd(OL, d));
          });
        } else
          QL(a),
            (c = a.G++),
            (a.D[c] = b),
            a.j.postMessage(
              { __fciCall: { command: "loaded", callId: c } },
              "*"
            );
    });
  }
  var SL = class extends Km {
    constructor(a) {
      super();
      this.B = a;
      this.A = this.j = null;
      this.D = {};
      this.G = 0;
      this.F = !1;
    }
  };
  const TL = (a, b) => {
    try {
      const g = void 0 === F(b, 6) ? !0 : F(b, 6);
      a: switch (id(b, 4)) {
        case 1:
          var c = "pt";
          break a;
        case 2:
          c = "cr";
          break a;
        default:
          c = "";
      }
      var d = new Yf(Wf(id(b, 2)), B(b, 3), c),
        e = z(b, Vf, 5)?.j() ?? "";
      d.yb = e;
      d.j = g;
      d.win = a;
      var f = d.build();
      Qf(f);
    } catch {}
  };
  function UL(a, b, c = TL) {
    a.goog_sdr_l ||
      (Object.defineProperty(a, "goog_sdr_l", { value: !0 }),
      "complete" === a.document.readyState
        ? c(a, b)
        : L(a, "load", () => void c(a, b)));
  }
  function VL(a) {
    const b = RegExp("^https?://[^/#?]+/?$");
    return !!a && !b.test(a);
  }
  function WL(a) {
    if (a === a.top || Sg(a.top)) return Promise.resolve({ status: 4 });
    a: {
      try {
        var b = (a.top?.frames ?? {}).google_ads_top_frame;
        break a;
      } catch (d) {}
      b = null;
    }
    if (!b) return Promise.resolve({ status: 2 });
    if (a.parent === a.top && VL(a.document.referrer))
      return Promise.resolve({ status: 3 });
    const c = new vv();
    a = new MessageChannel();
    a.port1.onmessage = (d) => {
      "__goog_top_url_resp" === d.data.msgType &&
        c.resolve({ rb: d.data.topUrl, status: d.data.topUrl ? 0 : 1 });
    };
    b.postMessage({ msgType: "__goog_top_url_req" }, "*", [a.port2]);
    return c.promise;
  }
  var XL = class extends J {
      constructor(a) {
        super(a);
      }
    },
    YL = [1, 3];
  const ZL = N`https://securepubads.g.doubleclick.net/static/topics/topics_frame.html`;
  function $L(a) {
    const b = a.google_tag_topics_state ?? (a.google_tag_topics_state = {});
    return b.messageChannelSendRequestFn
      ? Promise.resolve(b.messageChannelSendRequestFn)
      : new Promise((c) => {
          function d(h) {
            return g.j(h).then(({ data: k }) => k);
          }
          const e = Xg("IFRAME");
          e.style.display = "none";
          e.name = "goog_topics_frame";
          e.src = Ae(ZL).toString();
          const f = new URL(ZL.toString()).origin,
            g = eF({
              destination: a,
              Fa: e,
              origin: f,
              Ta: "goog:gRpYw:doubleclick",
            });
          g.j("goog:topics:frame:handshake:ack").then(({ data: h }) => {
            "goog:topics:frame:handshake:ack" === h && c(d);
          });
          b.messageChannelSendRequestFn = d;
          a.document.documentElement.appendChild(e);
        });
  }
  function aM(a, b, c, d, e, f, g = !1) {
    function h(q, r) {
      g &&
        Ri(
          {
            timeMs: String((b.performance.now() - q).toFixed(2)),
            useCache: r ? "1" : "0",
          },
          "topics_stats"
        );
    }
    const k = g ? b.performance.now() : 0,
      { Kb: l, Jb: m } = bM(f),
      n = b.google_tag_topics_state ?? (b.google_tag_topics_state = {});
    n.getTopicsPromise ||
      ((c = {
        message: "goog:topics:frame:get:topics",
        callApi: c,
        sendGen204: d,
      }),
      d && (c.pvsid = yh(window)),
      (a = a(c).then((q) => {
        let r = m;
        if (q instanceof Uint8Array)
          r || (r = !(l instanceof Uint8Array && Hb(q, l)));
        else if (tj()(q)) r || (r = q !== l);
        else return e.ma(989, Error(JSON.stringify(q))), 7;
        if (r && f)
          try {
            var y = new XL();
            var E = w(y, 2, dj());
            q instanceof Uint8Array ? kd(E, 1, YL, Jc(q, !1)) : kd(E, 3, YL, q);
            f.setItem("goog:cached:topics", Fd(E));
          } catch {}
        return q;
      })),
      (n.getTopicsPromise = a));
    return l && !m
      ? (h(k, !0), Promise.resolve(l))
      : n.getTopicsPromise.then((q) => {
          h(k, !1);
          return q;
        });
  }
  function bM(a) {
    if (!a) return { Kb: null, Jb: !0 };
    try {
      const h = a.getItem("goog:cached:topics");
      if (!h) return { Kb: null, Jb: !0 };
      const k = Dd(XL, h);
      let l;
      const m = ld(k, YL);
      switch (m) {
        case 0:
          l = null;
          break;
        case 1:
          var b,
            c = 1 === ld(k, YL) ? 1 : -1;
          a = k;
          const n = v(a, c),
            q = Jc(n, !0);
          null != q && q !== n && Zc(a, c, q);
          var d = q;
          var e = null == d ? tc() : d;
          sc(qc);
          var f = e.O;
          var g = null == f || mc(f) ? f : "string" === typeof f ? jc(f) : null;
          l = (b = null == g ? g : (e.O = g))
            ? new Uint8Array(b)
            : pc || (pc = new Uint8Array(0));
          break;
        case 3:
          l = id(k, 3 === ld(k, YL) ? 3 : -1);
          break;
        default:
          Gf(m, void 0);
      }
      return { Kb: l, Jb: vd(k, 2) + 6048e5 < dj() };
    } catch {
      return { Kb: null, Jb: !0 };
    }
  }
  function cM(a, b) {
    if (qb()) {
      var c = a.document.documentElement.lang;
      dM(a)
        ? eM(b, yh(a), !0, "", c)
        : new MutationObserver((d, e) => {
            dM(a) &&
              (eM(b, yh(a), !1, c, a.document.documentElement.lang),
              e.disconnect());
          }).observe(a.document.documentElement, {
            attributeFilter: ["class"],
          });
    }
  }
  function dM(a) {
    return (
      a.document.documentElement.classList.contains("translated-rtl") ||
      a.document.documentElement.classList.contains("translated-ltr")
    );
  }
  function eM(a, b, c, d, e) {
    Ri(
      { ptt: `${a}`, pvsid: `${b}`, ibatl: String(c), pl: d, nl: e },
      "translate-event"
    );
  }
  function fM(a) {
    const b = a.innerInsElement;
    a = a.outerInsElement;
    if (!b || !a) throw Error("no_ins_in_loader_provided_slot");
    return { innerInsElement: b, outerInsElement: a };
  }
  async function gM({ ha: a, ca: b, Za: c, slot: d }) {
    const e = d.vars,
      f = Vg(d.pubWin),
      { innerInsElement: g, outerInsElement: h } = fM(d),
      k = new RF({
        L: f,
        pubWin: d.pubWin,
        H: e,
        ha: a,
        ca: b,
        Za: c,
        innerInsElement: g,
        outerInsElement: h,
      });
    k.I = Date.now();
    Yl(1, [k.H]);
    yl(1032, () => {
      if (f && U(Oq)) {
        var l = k.H;
        dD(ZC(), 32, !1) ||
          (eD(ZC(), 32, !0), cM(f, "sa" === l.google_loader_used ? 5 : 9));
      }
    });
    try {
      await hM(k);
    } catch (l) {
      if (!Bl(159, l)) throw l;
    }
    yl(639, () => {
      {
        var l = k.H;
        const n = k.L;
        if (
          n &&
          1 === l.google_responsive_auto_format &&
          !0 === l.google_full_width_responsive_allowed
        ) {
          var m;
          (m = (m = n.document.getElementById(l.google_async_iframe_id))
            ? Mg(m, "INS", "adsbygoogle")
            : null)
            ? ((l = new RG(n, m, l)),
              (l.j = t.setInterval(Ka(l.B, l), 500)),
              l.B(),
              (l = !0))
            : (l = !1);
        } else l = !1;
      }
      return l;
    });
    Dl(k.pubWin, "affa", (l) => {
      yl(
        1008,
        () => {
          e.google_ad_client &&
            f &&
            !nb() &&
            iM(f, e, Dd(qJ, l.config), jM(k), B(a, 8));
        },
        kM
      );
    });
    e.google_ad_client &&
      f &&
      !nb() &&
      f?.location?.hash?.match(/\bgoog_cpmi=([^&]*)/) &&
      iM(f, e, lM(), jM(k), B(a, 8));
    return k;
  }
  function kM(a) {
    a.e = `${V(ar)}`;
  }
  function jM(a) {
    return U(cr) ? a.l : null;
  }
  function iM(a, b, c, d, e) {
    if (z(c, oF, 1) || U(vr)) {
      var f = O(vD);
      var g = b.google_page_url;
      g = "string" === typeof g ? g : "";
      var h = "on" === b.google_adtest;
      const m = z(c, kF, 2);
      try {
        const n = a?.location?.hash?.match(/\bgoog_cpmi=([^&]*)/);
        if (n) {
          var k = decodeURIComponent(n[1]);
          var l = Dd(oF, k);
        } else l = null;
      } catch (n) {
        l = null;
      }
      l || (l = U(Tq) ? z(c, oF, 1) ?? null : null);
      c = l;
      l = m;
      l = !(!l?.B() || (!U(rr) && !l?.j()));
      kL(
        a,
        f,
        new lL(
          c,
          g,
          l,
          !(!m?.D() || (!(488 > P(a).clientWidth) && m?.F())),
          e,
          h
        ),
        b.google_ad_client,
        d
      );
    }
  }
  function lM() {
    const a = new qJ();
    if (U(Rq)) {
      var b = new kF();
      b = xd(b, 5, !0);
      b = xd(b, 8, !0);
      od(a, 2, b);
    }
    return a;
  }
  function hM(a) {
    if (/_sdo/.test(a.H.google_ad_format)) return Promise.resolve();
    GF(13);
    GF(11);
    var b = O(Lr).C(Dq.j, Dq.defaultValue);
    if (b.length) {
      var c = document;
      if (b.length && c.head)
        for (var d of b)
          if ((b = d) && c.head) {
            var e = Xg("META");
            c.head.appendChild(e);
            e.httpEquiv = "origin-trial";
            e.content = b;
          }
    }
    c = ZC();
    (d = dD(c, 23, !1)) || eD(c, 23, !0);
    if (!d) {
      c = a.H.google_ad_client;
      d = a.ha;
      c =
        void 0 !== bd(d, kF, 13 === ld(d, uF) ? 13 : -1)
          ? z(wd(d, kF, 13, uF), dE, 2)
          : Hb(wd(d, mF, 14, uF)?.j() ?? [], [c])
          ? z(z(wd(d, mF, 14, uF), kF, 2), dE, 2)
          : new dE();
      c = new eE(a.pubWin, a.H.google_ad_client, c, F(a.ha, 6));
      c.l = !0;
      b = z(c.C, dp, 1);
      if (
        c.l &&
        ((d = c.j),
        c.B && !rz(b) ? ((e = new TD()), (e = w(e, 1, 1))) : (e = null),
        e)
      ) {
        e = Fd(e);
        try {
          d.localStorage.setItem("google_auto_fc_cmp_setting", e);
        } catch (f) {}
      }
      b && sz(new tz(c.j, new Kz(c.j, c.A), b, new Gw(c.j)));
    }
    c = !Lh() && !mb();
    return !c || (c && !mM(a)) ? nM(a) : Promise.resolve();
  }
  function oM(a, b, c = !1) {
    b = jF(a.L, b);
    const d = ei() || Ur(a.pubWin.top);
    if (
      !b ||
      -12245933 === b.y ||
      -12245933 === d.width ||
      -12245933 === d.height ||
      !d.height
    )
      return 0;
    let e = 0;
    try {
      const f = a.pubWin.top;
      e = Wr(f.document, f).y;
    } catch (f) {
      return 0;
    }
    a = e + d.height;
    return b.y < e
      ? c
        ? 0
        : (e - b.y) / d.height
      : b.y > a
      ? (b.y - a) / d.height
      : 0;
  }
  function mM(a) {
    return pM(a) || qM(a);
  }
  function pM(a) {
    const b = a.H;
    if (!b.google_pause_ad_requests) return !1;
    const c = t.setTimeout(() => {
        Al("abg:cmppar", {
          client: a.H.google_ad_client,
          url: a.H.google_page_url,
        });
      }, 1e4),
      d = zl(450, () => {
        b.google_pause_ad_requests = !1;
        t.clearTimeout(c);
        a.pubWin.removeEventListener(
          "adsbygoogle-pub-unpause-ad-requests-event",
          d
        );
        mM(a) || nM(a);
      });
    a.pubWin.addEventListener("adsbygoogle-pub-unpause-ad-requests-event", d);
    return !0;
  }
  function qM(a) {
    const b = a.pubWin.document,
      c = rM();
    if (0 > c.hidden && 0 > c.visible) return !1;
    const d = a.innerInsElement,
      e = jH(b);
    if (!e) return !1;
    if (!kH(b)) return sM(a, c.visible, d);
    const f = 3 === iH(b);
    if (oM(a, d) <= c.hidden && !f) return !1;
    let g = zl(332, () => {
      !kH(b) && g && (he(b, e, g), sM(a, c.visible, d) || nM(a), (g = null));
    });
    return L(b, e, g);
  }
  function rM() {
    const a = { hidden: 0, visible: 3 };
    t.IntersectionObserver || (a.visible = -1);
    Pg() && (a.visible *= 2);
    return a;
  }
  function sM(a, b, c) {
    if (!c || 0 > b) return !1;
    var d = a.H;
    if (
      (!pm(d.google_reactive_ad_format) &&
        (mG(d) || d.google_reactive_ads_config)) ||
      !Xr(c) ||
      oM(a, c) <= b
    )
      return !1;
    var e = ZC(),
      f = dD(e, 8, {});
    e = dD(e, 9, {});
    d = d.google_ad_section || d.google_ad_region || "";
    const g = !!a.pubWin.google_apltlad;
    if (!f[d] && !e[d] && !g) return !1;
    f = new Promise((h) => {
      const k = new t.IntersectionObserver(
        (l, m) => {
          ub(l, (n) => {
            0 >= n.intersectionRatio || (m.unobserve(n.target), h(void 0));
          });
        },
        { rootMargin: `${100 * b}%` }
      );
      a.J = k;
      k.observe(c);
    });
    e = new Promise((h) => {
      c.addEventListener("adsbygoogle-close-to-visible-event", () => {
        h(void 0);
      });
    });
    la(Promise, "any")
      .call(Promise, [f, e])
      .then(() => {
        yl(294, () => {
          nM(a);
        });
      });
    return !0;
  }
  function nM(a) {
    yl(326, () => {
      if (1 === Di(a.H)) {
        var c = U(Pq),
          d = c || U(Nq),
          e = a.pubWin;
        if (d && e === a.L) {
          var f = new Sl();
          d = new Tl();
          f.setCorrelator(yh(a.pubWin));
          var g = HF(a.pubWin);
          x(f, 5, g, "");
          yd(f, 2, 1);
          g = od(d, 1, f);
          f = new Rl();
          f = xd(f, 10, !0);
          var h = U(Gq);
          f = xd(f, 8, h);
          h = U(Hq);
          f = xd(f, 12, h);
          h = U(Kq);
          f = xd(f, 7, h);
          h = U(Jq);
          f = xd(f, 13, h);
          od(g, 2, f);
          e.google_rum_config = d.toJSON();
          Wg(e.document, F(a.ha, 9) && c ? a.ca.Gf : a.ca.Hf);
        } else kj();
      }
    });
    a.H.google_ad_channel = tM(a, a.H.google_ad_channel);
    a.H.google_tag_partner = uM(a, a.H.google_tag_partner);
    vM(a);
    var b = a.H.google_start_time;
    "number" === typeof b && ((Zl = b), (a.H.google_start_time = null));
    iF(a);
    wM(a);
    hD() &&
      gE({ win: a.pubWin, webPropertyCode: a.H.google_ad_client, tb: a.ca.tb });
    mG(a.H) &&
      (ny() && (a.H.google_adtest = a.H.google_adtest || "on"),
      (a.H.google_pgb_reactive = a.H.google_pgb_reactive || 3));
    xM(a.L);
    b =
      "function" === typeof a.pubWin.document.browsingTopics &&
      CF(a.pubWin.document);
    if (U(zq) && (b || U(tq)))
      try {
        a.D = $L(a.pubWin);
      } catch (c) {
        Bl(984, c);
      }
    return yM(a);
  }
  function wM(a) {
    a.L &&
      (qG(a.L, a.ca.Se),
      oG(a.L.location) &&
        zG(a.L, {
          enable_page_level_ads: { pltais: !0 },
          google_ad_client: a.H.google_ad_client,
        }));
  }
  function tM(a, b) {
    return (b ? [b] : []).concat(XC(a.H).ad_channels || []).join("+");
  }
  function uM(a, b) {
    return (b ? [b] : []).concat(XC(a.H).tag_partners || []).join("+");
  }
  function zM(a) {
    const b = Xg("IFRAME");
    $g(a, (c, d) => {
      null != c && b.setAttribute(d, c);
    });
    return b;
  }
  function AM(a, b, c) {
    return 9 === a.H.google_reactive_ad_format &&
      Mg(a.outerInsElement, null, "fsi_container")
      ? (a.innerInsElement.appendChild(b), Promise.resolve(b))
      : xG(a.ca.ae, 525, (d) => {
          a.innerInsElement.appendChild(b);
          d.createAdSlot(
            a.L,
            a.H,
            b,
            a.outerInsElement.parentElement,
            WD(c, a.pubWin)
          );
          return b;
        });
  }
  function BM(a, b, c) {
    UL(
      a.pubWin,
      xd(
        Sf(
          yd(yd(Rf(new Tf(), Uf(new Vf(), String(yh(a.pubWin)))), 4, 1), 2, 1),
          B(a.ha, 2)
        ),
        6,
        !0
      ),
      U(Br) ? () => {} : void 0
    );
    const d = a.L;
    a.H.google_acr && a.H.google_acr(b);
    L(b, "load", () => {
      b && b.setAttribute("data-load-complete", !0);
      const f = d ? XC(d).enable_overlap_observer || !1 : !1;
      (a.H.ovlp || f) && d && d === a.pubWin && CM(d, a, a.outerInsElement, b);
    });
    var e = (f) => {
      f &&
        a.A.push(() => {
          f.Ea();
        });
    };
    DM(a, b);
    EM(a, b);
    !d ||
      (mG(a.H) && !BG(a.H)) ||
      (a.outerInsElement ||
        Al(
          "shadowroot_nullcheck",
          {
            var: "sth_init",
            ctxSize: Object.keys(a).length,
            isExp: U(sq) ? 1 : 0,
          },
          0.05
        ),
      e(new WH(d, b, a.H)),
      e(new fH(a, b)),
      e(d.IntersectionObserver ? null : new hH(d, b, a.innerInsElement)));
    d &&
      (e(new $G(d, b)),
      a.A.push(LG(d, a.H)),
      O(QG).init(d),
      a.A.push(WG(d, a.outerInsElement, b)));
    b && b.setAttribute("data-google-container-id", c);
    c = a.H.iaaso;
    if (null != c) {
      e = a.outerInsElement;
      const f = e.parentElement;
      (f && js.test(f.className) ? f : e).setAttribute("data-auto-ad-size", c);
    }
    c = a.outerInsElement;
    c.setAttribute("tabindex", "0");
    c.setAttribute("title", "Advertisement");
    c.setAttribute("aria-label", "Advertisement");
    FM(a);
  }
  function DM(a, b) {
    const c = a.pubWin,
      d = a.H.google_ad_client,
      e = gD();
    let f = null;
    const g = Dl(c, "pvt", (h, k) => {
      "string" === typeof h.token &&
        k.source === b.contentWindow &&
        ((f = h.token),
        g(),
        (e[d] = e[d] || []),
        e[d].push(f),
        100 < e[d].length && e[d].shift());
    });
    a.A.push(g);
  }
  function GM(a, b) {
    var c = IF(a, "__gpi_opt_out", b.l);
    c &&
      ((c = dg(
        cg(bg(ag(new eg(), c), 2147483647), "/"),
        b.pubWin.location.hostname
      )),
      JF(a, "__gpi_opt_out", c, b.l));
  }
  function EM(a, b) {
    const c = Dl(a.pubWin, "gpi-uoo", (d, e) => {
      if (e.source === b.contentWindow) {
        e = dg(
          cg(bg(ag(new eg(), d.userOptOut ? "1" : "0"), 2147483647), "/"),
          a.pubWin.location.hostname
        );
        var f = new MF(a.pubWin);
        JF(f, "__gpi_opt_out", e, a.l);
        if (d.userOptOut || d.clearAdsData)
          KF(f, "__gads", a.l), KF(f, "__gpi", a.l);
      }
    });
    a.A.push(c);
  }
  function FM(a) {
    const b = Lh(a.pubWin);
    if (b)
      if ("AMP-STICKY-AD" === b.container) {
        const c = (d) => {
          "fill_sticky" === d.data && b.renderStart && b.renderStart();
        };
        L(a.pubWin, "message", xl.ta(616, c));
        a.A.push(() => {
          he(a.pubWin, "message", c);
        });
      } else b.renderStart && b.renderStart();
  }
  function CM(a, b, c, d) {
    wL(new FL(a), c)
      .then((e) => {
        Yl(8, [e]);
        return e;
      })
      .then((e) => {
        const f = c.parentElement;
        (f && js.test(f.className) ? f : c).setAttribute(
          "data-overlap-observer-io",
          e.isOverlappingOrOutsideViewport
        );
        return e;
      })
      .then((e) => {
        const f = b.H.armr || "",
          g = e.executionTime || "",
          h = null == b.H.iaaso ? "" : Number(b.H.iaaso),
          k = Number(e.isOverlappingOrOutsideViewport),
          l = wb(
            e.entries,
            (D) =>
              `${D.overlapType}:${D.overlapDepth}:${D.overlapDetectionPoint}`
          ),
          m = Number(e.overlappedArea.toFixed(2)),
          n = d.dataset.googleQueryId || "",
          q = m * e.targetRect.width * e.targetRect.height,
          r = e.scrollPosition.scrollX + "," + e.scrollPosition.scrollY,
          y = Fi(e.target),
          E = [
            e.targetRect.left,
            e.targetRect.top,
            e.targetRect.right,
            e.targetRect.bottom,
          ].join();
        e = e.viewportSize.width + "x" + e.viewportSize.height;
        Al(
          "ovlp",
          {
            adf: b.H.google_ad_dom_fingerprint,
            armr: f,
            client: b.H.google_ad_client,
            eid: HF(b.H),
            et: g,
            fwrattr: b.H.google_full_width_responsive,
            iaaso: h,
            io: k,
            saldr: b.H.google_loader_used,
            oa: m,
            oe: l.join(","),
            qid: n,
            rafmt: b.H.google_responsive_auto_format,
            roa: q,
            slot: b.H.google_ad_slot,
            sp: r,
            tgt: y,
            tr: E,
            url: b.H.google_page_url,
            vp: e,
            pvc: yh(a),
          },
          1
        );
      })
      .catch((e) => {
        Yl(8, ["Error:", e.message, c]);
        Al("ovlp-err", { err: e.message }, 1);
      });
  }
  function HM(a, b) {
    b.allow = b.allow && 0 < b.allow.length ? b.allow + ("; " + a) : a;
  }
  function IM(a, b, c, d) {
    var e = a.H;
    const f = e.google_async_iframe_id,
      g = e.google_ad_width,
      h = e.google_ad_height;
    var k = CG(e),
      l = { id: f, name: f };
    l.style = k
      ? [`width:${g}px !IMPORTANT`, `height:${h}px !IMPORTANT`].join(";")
      : "left:0;position:absolute;top:0;border:0;" +
        `width:${g}px;` +
        `height:${h}px;`;
    var m = nh();
    if (
      m["allow-top-navigation-by-user-activation"] &&
      m["allow-popups-to-escape-sandbox"]
    ) {
      m = b;
      if ((b = "fsb=" + encodeURIComponent("1"))) {
        var n = m.indexOf("#");
        0 > n && (n = m.length);
        var q = m.indexOf("?");
        if (0 > q || q > n) {
          q = n;
          var r = "";
        } else r = m.substring(q + 1, n);
        m = [m.slice(0, q), r, m.slice(n)];
        n = m[1];
        m[1] = b ? (n ? n + "&" + b : b) : n;
        b = m[0] + (m[1] ? "?" + m[1] : "") + m[2];
      } else b = m;
      l.sandbox = mh().join(" ");
    }
    U($p) && !1 === e.google_video_play_muted && HM("autoplay", l);
    n = b;
    b = JM(b);
    q = c ? b.replace(/&ea=[^&]*/, "") + "&ea=0" : b;
    null != g && (l.width = String(g));
    null != h && (l.height = String(h));
    l.frameborder = "0";
    l.marginwidth = "0";
    l.marginheight = "0";
    l.vspace = "0";
    l.hspace = "0";
    l.allowtransparency = "true";
    l.scrolling = "no";
    m = "";
    if (c) {
      m = 10;
      for (q = ""; 0 < m--; )
        q +=
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
            Math.floor(62 * Math.random())
          );
      m = q;
      b = Cl(b, m);
      Cl(n, m);
    } else b = q;
    e.dash && (l.srcdoc = e.dash);
    n = U(FI(window) ? Er : Dr);
    q = U(Gr);
    n = GI(a.pubWin, n, q);
    q = e.google_trust_token_additional_signing_data;
    n && HI(n) && (n = JI(n, q)) && (l.trustToken = JSON.stringify(n));
    a.pubWin.document.featurePolicy
      ?.features()
      .includes("attribution-reporting") && HM("attribution-reporting", l);
    U(Eq) &&
      ((n = a.pubWin),
      void 0 !== n.anonymouslyFramed &&
        (U(Fq) || n.crossOriginIsolated) &&
        (l.anonymous = "true"));
    if (k) {
      l.src = b;
      var y = zM(l);
      y = AM(a, y, d);
    } else {
      d = {};
      d.dtd = UG(new Date().getTime(), Zl);
      d = zi(d, b);
      l.src = d;
      d = a.pubWin;
      d = d == d.top;
      l = zM(l);
      d && a.A.push(gi(a.pubWin, l));
      d =
        (d = a.H.google_shadow_mode) && "string" === typeof d && "open" === d
          ? "open"
          : "closed";
      a: {
        k = a.innerInsElement;
        try {
          if (U(sq) && k) {
            y = k.attachShadow({ mode: d });
            break a;
          }
        } catch (E) {}
        y = void 0;
      }
      a.innerInsElement.style.visibility = "visible";
      y = y || a.innerInsElement;
      for (d = l; (k = y.firstChild); ) y.removeChild(k);
      y.appendChild(d);
      y = Promise.resolve(l);
    }
    c &&
      ((c = a.ca.Yf),
      (e = {
        id: f,
        url: b,
        width: g,
        height: h,
        Ta: m,
        Ff: a.pubWin,
        Be: f,
        Uj: "google_expandable_ad_slot" + Di(e),
        nf: c.toString(),
        Fc: a.pubWin,
      }),
      (e =
        !e.id || !e.url || 0 >= e.width || 0 >= e.height || !e.Ta || !e.Fc
          ? void 0
          : Dl(e.Fc, "ct", Ma(Ol, e, c))),
      e && a.A.push(e));
    return y;
  }
  function JM(a) {
    var b = V(u("Edge") ? lq : pq);
    var c = a;
    c.length > b &&
      ((c = c.substring(0, b - 8)),
      (c = c.replace(/%\w?$/, "")),
      (c = c.replace(/&[^=]*=?$/, "")),
      (c += "&trunc=1"));
    if (c !== a) {
      b -= 8;
      let d = a.lastIndexOf("&", b);
      -1 === d && (d = a.lastIndexOf("?", b));
      Al(
        "trn",
        { ol: a.length, tr: -1 === d ? "" : a.substring(d + 1), url: a },
        0.01
      );
    }
    return c;
  }
  async function KM(a) {
    var b = a.H,
      c = a.pubWin,
      d = a.l;
    U(uq) && fd(d, 5) && GM(new MF(a.pubWin), a);
    var e = WD(d, a.pubWin);
    if (!fd(d, 5)) return Promise.resolve();
    fd(d, 5) && QF(d, a.pubWin, a.H.google_ad_client);
    var f = a.H.google_reactive_ads_config;
    f &&
      (wG(a.L, f),
      DG(f, a, WD(d)),
      (f = f.page_level_pubvars),
      Ca(f) && pe(a.H, f));
    fd(d, 5) && (await LM());
    U(tq) &&
      a.D &&
      fd(d, 5) &&
      !dD(ZC(), 34, !1) &&
      (eD(ZC(), 34, !0),
      (f = a.D.then((g) => {
        g({ message: "goog:spam:client_age", pvsid: yh(a.pubWin) });
      })),
      xl.za(1069, f));
    if (U(Bq) && a.D)
      if (MM(a)) {
        a.B = 1;
        const g = WD(a.l, a.pubWin);
        f = a.D.then(async (k) => {
          await aM(k, a.pubWin, U(yq), U(Aq), xl, g, U(Cr)).then((l) => {
            a.B = l;
          });
        });
        const h = V(xq);
        0 < h ? await Promise.race([f, Ch(h)]) : await f;
      } else a.B = 5;
    if (!II(a.pubWin, zF(), B(a.ha, 8))) {
      const g = V(Kr);
      f = c.google_trust_token_operation_promise;
      0 < g &&
        f &&
        (await Promise.race([
          f,
          new Promise(
            (h) =>
              void setTimeout(() => {
                h(void 0);
              }, g)
          ),
        ]));
    }
    f = "";
    CG(b)
      ? ((f = a.ca.Zf.toString() + "#" + WI(b)), dJ(b, ZC()), NM(b))
      : ((5 === b.google_pgb_reactive && b.google_reactive_ads_config) ||
          !nG(b) ||
          lG(c, b, e)) &&
        NM(b) &&
        (f = TI(a, d));
    Yl(2, [b, f]);
    if (!f) return Promise.resolve();
    b.google_async_iframe_id || Ci(c);
    e = Di(b);
    b =
      a.pubWin === a.L
        ? "a!" + e.toString(36)
        : `${e.toString(36)}.${
            Math.floor(2147483648 * Math.random()).toString(36) +
            Math.abs(Math.floor(2147483648 * Math.random()) ^ Na()).toString(36)
          }`;
    c = 0 < oM(a, a.innerInsElement, !0);
    e = { ifi: e, uci: b };
    c && ((c = ZC()), (e.btvi = dD(c, 21, 1)), fD(c, 21));
    f = zi(e, f);
    d = IM(a, f, 0 === a.C, d);
    f = JM(f);
    a.H.rpe &&
      QH(a.pubWin, a.innerInsElement, {
        height: a.H.google_ad_height,
        Uc: "force",
        dd: !0,
        Nf: !0,
        sc: a.H.google_ad_client,
      });
    d = await d;
    try {
      BM(a, d, b);
    } catch (g) {
      Bl(223, g);
    }
  }
  function LM() {
    return (pb() ? 0 <= hb(11) : ob() && 0 <= hb(65))
      ? new Promise((a) => {
          yI(a.bind(null, !0));
        })
      : (yI(null), Promise.resolve(!1));
  }
  function OM(a) {
    const b = new NL(a);
    return new Promise((c) => {
      ML(b, (d) => {
        d && "string" === typeof d.uspString ? c(d.uspString) : c(null);
      });
    });
  }
  function PM(a) {
    var b = oh(t.top, "googlefcPresent");
    t.googlefc &&
      !b &&
      Al("adsense_fc_has_namespace_but_no_iframes", { publisherId: a }, 1);
  }
  function QM(a) {
    return PL(a) ? RL(a) : Promise.resolve(null);
  }
  function RM(a, b) {
    const c = b.Vf;
    b = b.uspString;
    c ? SG(a, c) : ZD(a, !0);
    b && w(a, 1, b);
  }
  function SM(a) {
    const b = V(Wp),
      c = U(Up);
    if (0 >= b && !c) return null;
    const d = dj(),
      e = IL(a.pubWin);
    if (!e) return null;
    a.F = "0";
    return (c ? e : Promise.race([e, Ch(b, "0")]))
      .then((f) => {
        Al("adsense_paw", { time: dj() - d });
        f?.length > V(Vp) ? Bl(809, Error(`ML:${f.length}`)) : (a.F = f);
      })
      .catch((f) => {
        Bl(809, f);
      });
  }
  function TM(a) {
    const b = dj();
    return Promise.race([yl(832, () => WL(a)), Ch(200)]).then((c) => {
      Al("afc_etu", { etus: c?.status ?? 100, sig: dj() - b, tms: 200 });
      return c?.rb;
    });
  }
  function UM(a) {
    var b = V(Yp);
    return Promise.race([
      zl(779, () => {
        const c = U(FI(window) ? Er : Dr),
          d = U(Gr);
        return PI(new QI(a, c, d));
      })(),
      Ch(b),
    ]);
  }
  async function VM(a) {
    const b = SM(a),
      c = yl(868, () => TM(a.pubWin));
    uI(B(a.ha, 8));
    OE(a.pubWin);
    PM(a.H.google_ad_client);
    var d = new SL(a.pubWin);
    await QM(d);
    a.l = new $D();
    d = [TG(a), OM(a.pubWin)];
    d = await Promise.all(d);
    RM(a.l, { Vf: d[0], uspString: d[1] });
    II(a.pubWin, zF(), B(a.ha, 8)) &&
      ((d = UM(!!fd(a.l, 5))), U(Jr) ? xl.za(962, d) : await d);
    U(Up) || (await b);
    a.rb = (await c) || "";
    await KM(a);
  }
  function MM(a) {
    const b = a.l;
    a = a.H;
    return (
      !a.google_restrict_data_processing &&
      1 !== a.google_tag_for_under_age_of_consent &&
      1 !== a.google_tag_for_child_directed_treatment &&
      !!fd(b, 5) &&
      !b.j() &&
      !iD() &&
      !fd(b, 9)
    );
  }
  function yM(a) {
    var b = a.pubWin.document,
      c = a.H;
    const d = c.google_ad_width,
      e = c.google_ad_height;
    let f = 0;
    try {
      !1 === c.google_allow_expandable_ads && (f |= 1);
      if (
        !b.body ||
        isNaN(c.google_ad_height) ||
        isNaN(c.google_ad_width) ||
        !/^http/.test(b.location.protocol)
      )
        f |= 2;
      {
        c = navigator;
        const l = c.userAgent,
          m = c.platform,
          n = c.product;
        if (!/Win|Mac|Linux|iPad|iPod|iPhone/.test(m) && /^Opera/.test(l))
          var g = !1;
        else if (/Win/.test(m) && /Trident/.test(l) && 11 <= b.documentMode)
          g = !0;
        else {
          var h = (/WebKit\/(\d+)/.exec(l) || [0, 0])[1],
            k = (/rv:(\d+\.\d+)/.exec(l) || [0, 0])[1];
          g =
            (!h &&
              "Gecko" === n &&
              27 <= k &&
              !/ rv: 1\.8([^.] |\.0) /.test(l)) ||
            536 <= h
              ? !0
              : !1;
        }
      }
      g || (f |= 4);
      $r(a.pubWin, d, e) && (f |= 2);
    } catch (l) {
      f |= 8;
    }
    a.C = f;
    0 === a.C || (a.H.google_allow_expandable_ads = !1);
    Dh(a.pubWin) !== a.pubWin && (a.j |= 4);
    3 === iH(a.pubWin.document) && (a.j |= 32);
    if ((b = a.L)) (b = a.L), (b = !(P(b).scrollWidth <= P(b).clientWidth));
    b && (a.j |= 1024);
    a.pubWin.Prototype?.Version && (a.j |= 16384);
    a.H.google_loader_features_used && (a.j |= a.H.google_loader_features_used);
    a.G = 2;
    return VM(a);
  }
  function NM(a) {
    const b = ZC(),
      c = a.google_ad_section;
    mG(a) && fD(b, 15);
    if (Ii(a)) {
      if (100 < fD(b, 5)) return !1;
    } else if (100 < fD(b, 6) - dD(b, 15, 0) && "" === c) return !1;
    return !0;
  }
  function vM(a) {
    const b = a.L;
    if (
      b &&
      !XC(b).ads_density_stats_processed &&
      !Lh(b) &&
      ((XC(b).ads_density_stats_processed = !0), U(qq) || 0.01 > Zg())
    ) {
      const c = () => {
        if (b) {
          var d = YB(
            TB(b),
            a.H.google_ad_client,
            b.location.hostname,
            HF(a.H).split(",")
          );
          Al("ama_stats", d, 1);
        }
      };
      Bh(b, () => {
        t.setTimeout(c, 1e3);
      });
    }
  }
  function xM(a) {
    a &&
      !XC(a).host_pinged_back &&
      ((XC(a).host_pinged_back = !0),
      Al("abg_host", { host: a.location.host }, 0.01));
  }
  (function (a, b, c) {
    yl(843, () => {
      if (!t.google_sa_impl) {
        var d = qL(a);
        nL(d);
        Yl(16, [3, d.toJSON()]);
        var e = oL({ Pe: b, Tf: B(d, 2) }),
          f = c(e, d);
        t.google_sa_impl = async (h) => gM({ ha: d, ca: f, Za: e, slot: h });
        FF(BF(t));
        t.google_process_slots?.();
        var g = (t.Prototype || {}).Version;
        null != g && Al("prtpjs", { version: g });
      }
    });
  })(pL, "m202211080101", function (a, b) {
    const c = 2012 < ud(b, 1) ? `_fy${ud(b, 1)}` : "",
      d = B(b, 3);
    b = B(b, 2);
    return {
      Hf: N`https://pagead2.googlesyndication.com/pagead/js/${b}/${d}/rum${c}.js`,
      Gf: N`https://pagead2.googlesyndication.com/pagead/js/${b}/${d}/rum_debug${c}.js`,
      ae: N`https://pagead2.googlesyndication.com/pagead/managed/js/adsense/${a}/reactive_library${c}.js`,
      Se: N`https://pagead2.googlesyndication.com/pagead/managed/js/adsense/${a}/debug_card_library${c}.js`,
      Yf: N`https://pagead2.googlesyndication.com/pagead/js/${b}/${d}/creativetoolset/xpc_expansion_embed.js`,
      Zf: N`https://googleads.g.doubleclick.net/pagead/html/${b}/${d}/zrt_lookup.html`,
      Db: N`https://pagead2.googlesyndication.com/pagead/managed/js/adsense/${a}/slotcar_library${c}.js`,
      tb: N`https://pagead2.googlesyndication.com/pagead/managed/js/adsense/${a}/gallerify${c}.js`,
      oc: N`https://pagead2.googlesyndication.com/pagead/managed/js/adsense/${a}/storify${c}.js`,
    };
  });
}.call(
  this,
  '[2021,"r20221109","r20110914",null,null,null,null,".google.cn",null,null,null,null,[null,[]],null,null,null,null,-1,[44759876,44759927,44759837,44773809]]'
));
