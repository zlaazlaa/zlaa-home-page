(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var p,
    aa = function (a) {
      var b = 0;
      return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
      };
    },
    q =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a;
          },
    ba = function (a) {
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
    },
    ca = ba(this),
    r = function (a, b) {
      if (b)
        a: {
          var c = ca;
          a = a.split(".");
          for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e];
          }
          a = a[a.length - 1];
          d = c[a];
          b = b(d);
          b != d &&
            null != b &&
            q(c, a, { configurable: !0, writable: !0, value: b });
        }
    };
  r("Symbol", function (a) {
    if (a) return a;
    var b = function (f, g) {
      this.wa = f;
      q(this, "description", { configurable: !0, writable: !0, value: g });
    };
    b.prototype.toString = function () {
      return this.wa;
    };
    a = (1e9 * Math.random()) >>> 0;
    var c = "jscomp_symbol_" + a + "_",
      d = 0,
      e = function (f) {
        if (this instanceof e)
          throw new TypeError("Symbol is not a constructor");
        return new b(c + (f || "") + "_" + d++, f);
      };
    return e;
  });
  r("Symbol.iterator", function (a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (
      var b =
          "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
            " "
          ),
        c = 0;
      c < b.length;
      c++
    ) {
      var d = ca[b[c]];
      "function" === typeof d &&
        "function" != typeof d.prototype[a] &&
        q(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return da(aa(this));
          },
        });
    }
    return a;
  });
  var da = function (a) {
      a = { next: a };
      a[Symbol.iterator] = function () {
        return this;
      };
      return a;
    },
    u = function (a) {
      var b =
        "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
      return b ? b.call(a) : { next: aa(a) };
    },
    ea = function (a) {
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      return c;
    },
    fa =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    ja;
  if ("function" == typeof Object.setPrototypeOf) ja = Object.setPrototypeOf;
  else {
    var ka;
    a: {
      var la = { a: !0 },
        ma = {};
      try {
        ma.__proto__ = la;
        ka = ma.a;
        break a;
      } catch (a) {}
      ka = !1;
    }
    ja = ka
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var na = ja,
    v = function (a, b) {
      a.prototype = fa(b.prototype);
      a.prototype.constructor = a;
      if (na) na(a, b);
      else
        for (var c in b)
          if ("prototype" != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d);
            } else a[c] = b[c];
      a.Ta = b.prototype;
    },
    oa = function () {
      for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
        b[c - a] = arguments[c];
      return b;
    },
    w = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    };
  r("WeakMap", function (a) {
    function b() {
      if (!a || !Object.seal) return !1;
      try {
        var l = Object.seal({}),
          m = Object.seal({}),
          n = new a([
            [l, 2],
            [m, 3],
          ]);
        if (2 != n.get(l) || 3 != n.get(m)) return !1;
        n.delete(l);
        n.set(m, 4);
        return !n.has(l) && 4 == n.get(m);
      } catch (x) {
        return !1;
      }
    }
    function c() {}
    function d(l) {
      var m = typeof l;
      return ("object" === m && null !== l) || "function" === m;
    }
    function e(l) {
      if (!w(l, g)) {
        var m = new c();
        q(l, g, { value: m });
      }
    }
    function f(l) {
      var m = Object[l];
      m &&
        (Object[l] = function (n) {
          if (n instanceof c) return n;
          Object.isExtensible(n) && e(n);
          return m(n);
        });
    }
    if (b()) return a;
    var g = "$jscomp_hidden_" + Math.random();
    f("freeze");
    f("preventExtensions");
    f("seal");
    var h = 0,
      k = function (l) {
        this.K = (h += Math.random() + 1).toString();
        if (l) {
          l = u(l);
          for (var m; !(m = l.next()).done; )
            (m = m.value), this.set(m[0], m[1]);
        }
      };
    k.prototype.set = function (l, m) {
      if (!d(l)) throw Error("Invalid WeakMap key");
      e(l);
      if (!w(l, g)) throw Error("WeakMap key fail: " + l);
      l[g][this.K] = m;
      return this;
    };
    k.prototype.get = function (l) {
      return d(l) && w(l, g) ? l[g][this.K] : void 0;
    };
    k.prototype.has = function (l) {
      return d(l) && w(l, g) && w(l[g], this.K);
    };
    k.prototype.delete = function (l) {
      return d(l) && w(l, g) && w(l[g], this.K) ? delete l[g][this.K] : !1;
    };
    return k;
  });
  var pa = function (a, b) {
    a instanceof String && (a += "");
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var f = c++;
            return { value: b(f, a[f]), done: !1 };
          }
          d = !0;
          return { done: !0, value: void 0 };
        },
      };
    e[Symbol.iterator] = function () {
      return e;
    };
    return e;
  };
  r("Array.prototype.keys", function (a) {
    return a
      ? a
      : (a = function () {
          return pa(this, function (b) {
            return b;
          });
        });
  });
  r("Number.isNaN", function (a) {
    return a
      ? a
      : (a = function (b) {
          return "number" === typeof b && isNaN(b);
        });
  });
  var y = this || self,
    qa = function (a) {
      var b = typeof a;
      return "object" != b ? b : a ? (Array.isArray(a) ? "array" : b) : "null";
    },
    ra = function (a) {
      var b = qa(a);
      return "array" == b || ("object" == b && "number" == typeof a.length);
    },
    sa = function (a) {
      var b = typeof a;
      return ("object" == b && null != a) || "function" == b;
    },
    va = function (a) {
      return (
        (Object.prototype.hasOwnProperty.call(a, ta) && a[ta]) || (a[ta] = ++ua)
      );
    },
    ta = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
    ua = 0,
    wa = function (a, b, c) {
      return a.call.apply(a.bind, arguments);
    },
    xa = function (a, b, c) {
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
    },
    z = function (a, b, c) {
      z =
        Function.prototype.bind &&
        -1 != Function.prototype.bind.toString().indexOf("native code")
          ? wa
          : xa;
      return z.apply(null, arguments);
    },
    ya = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return function () {
        var d = c.slice();
        d.push.apply(d, arguments);
        return a.apply(this, d);
      };
    },
    za = function (a) {
      return a;
    };
  var Aa;
  var Ba = function (a, b) {
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) == c;
  };
  var Ca = !1;
  var Da = null,
    Ea,
    Fa = y.navigator;
  Ea = Fa ? Fa.userAgentData || null : null;
  function Ga(a) {
    if (!Ca) return !1;
    var b = Ea;
    return b
      ? b.brands.some(function (c) {
          return (c = c.brand) && -1 != c.indexOf(a);
        })
      : !1;
  }
  function A(a) {
    var b;
    if (null == Da)
      a: {
        if ((b = y.navigator)) if ((b = b.userAgent)) break a;
        b = "";
      }
    else b = Da;
    return -1 != b.indexOf(a);
  }
  function C() {
    var a = void 0 === a ? !1 : a;
    if (!a && !Ca) return !1;
    a = Ea;
    return !!a && 0 < a.brands.length;
  }
  function Ha() {
    return C()
      ? Ga("Chromium")
      : ((A("Chrome") || A("CriOS")) && !(C() ? 0 : A("Edge"))) || A("Silk");
  }
  var Ia = Array.prototype.indexOf
      ? function (a, b) {
          var c;
          return Array.prototype.indexOf.call(a, b, c);
        }
      : function (a, b) {
          var c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
          if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length
              ? -1
              : a.indexOf(b, c);
          for (; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    Ja = Array.prototype.forEach
      ? function (a, b) {
          var c;
          Array.prototype.forEach.call(a, b, c);
        }
      : function (a, b) {
          for (
            var c,
              d = a.length,
              e = "string" === typeof a ? a.split("") : a,
              f = 0;
            f < d;
            f++
          )
            f in e && b.call(c, e[f], f, a);
        },
    Ka = Array.prototype.some
      ? function (a, b) {
          var c;
          return Array.prototype.some.call(a, b, c);
        }
      : function (a, b) {
          for (
            var c,
              d = a.length,
              e = "string" === typeof a ? a.split("") : a,
              f = 0;
            f < d;
            f++
          )
            if (f in e && b.call(c, e[f], f, a)) return !0;
          return !1;
        },
    La = Array.prototype.every
      ? function (a, b) {
          var c;
          return Array.prototype.every.call(a, b, c);
        }
      : function (a, b) {
          for (
            var c,
              d = a.length,
              e = "string" === typeof a ? a.split("") : a,
              f = 0;
            f < d;
            f++
          )
            if (f in e && !b.call(c, e[f], f, a)) return !1;
          return !0;
        };
  function Ma(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  !A("Android") || Ha();
  Ha();
  A("Safari") &&
    (Ha() ||
      (C() ? 0 : A("Coast")) ||
      (C() ? 0 : A("Opera")) ||
      (C() ? 0 : A("Edge")) ||
      (C() ? Ga("Microsoft Edge") : A("Edg/")) ||
      (C() && Ga("Opera")));
  var Na = {},
    E = null,
    Oa = function (a) {
      var b;
      void 0 === b && (b = 0);
      if (!E) {
        E = {};
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
          Na[e] = f;
          for (var g = 0; g < f.length; g++) {
            var h = f[g],
              k = E[h];
            void 0 === k && (E[h] = g);
          }
        }
      }
      e = Na[b];
      b = Array(Math.floor(a.length / 3));
      c = e[64] || "";
      for (d = f = 0; f < a.length - 2; f += 3) {
        k = a[f];
        var l = a[f + 1];
        h = a[f + 2];
        g = e[k >> 2];
        k = e[((k & 3) << 4) | (l >> 4)];
        l = e[((l & 15) << 2) | (h >> 6)];
        h = e[h & 63];
        b[d++] = "" + g + k + l + h;
      }
      h = 0;
      g = c;
      switch (a.length - f) {
        case 2:
          (h = a[f + 1]), (g = e[(h & 15) << 2] || c);
        case 1:
          (f = a[f]),
            (a = e[f >> 2]),
            (e = e[((f & 3) << 4) | (h >> 4)]),
            (b[d] = "" + a + e + g + c);
      }
      return b.join("");
    };
  var Pa = "undefined" !== typeof Uint8Array,
    Qa = {};
  var Ra,
    Sa = function (a) {
      var b = Qa;
      if (b !== Qa) throw Error("illegal external caller");
      this.va = a;
      if (null != a && 0 === a.length)
        throw Error("ByteString should be constructed with non-empty values");
    };
  var F =
    "function" === typeof Symbol && "symbol" === typeof Symbol()
      ? Symbol(void 0)
      : void 0;
  function G(a, b) {
    if (!Object.isFrozen(a))
      if (F) a[F] |= b;
      else {
        var c = a;
        void 0 !== c.v
          ? (c.v |= b)
          : Object.defineProperties(a, {
              v: { value: b, configurable: !0, writable: !0, enumerable: !1 },
            });
      }
  }
  function Ta(a, b) {
    Object.isExtensible(a) &&
      (F ? a[F] && (a[F] &= ~b) : void 0 !== a.v && (a.v &= ~b));
  }
  function H(a) {
    a = F ? a[F] : a.v;
    return null == a ? 0 : a;
  }
  function Ua(a, b) {
    if (F) a[F] = b;
    else {
      var c = a;
      void 0 !== c.v
        ? (c.v = b)
        : Object.defineProperties(a, {
            v: { value: b, configurable: !0, writable: !0, enumerable: !1 },
          });
    }
  }
  function I(a) {
    G(a, 1);
    return a;
  }
  function Va(a) {
    G(a, 17);
    return a;
  }
  function J(a) {
    if (!a) return !1;
    a = H(a);
    return !!(a & 2);
  }
  function Wa(a) {
    G(a, 16);
    return a;
  }
  function Xa(a) {
    if (!Array.isArray(a))
      throw Error("cannot mark non-array as shared mutably");
    Ta(a, 16);
  }
  function Ya(a) {
    a = H(a);
    return !!(a & 16);
  }
  function Za(a, b) {
    Ua(b, (H(a) | 0) & -51);
  }
  var $a = {};
  function ab(a) {
    return (
      null !== a &&
      "object" === typeof a &&
      !Array.isArray(a) &&
      a.constructor === Object
    );
  }
  var bb,
    cb = Object,
    db = cb.freeze,
    eb,
    fb = [];
  G(fb, 3);
  eb = fb;
  var gb = db.call(cb, eb),
    hb = function (a) {
      if (J(a.h)) throw Error("Cannot mutate an immutable Message");
    };
  var ib = !0,
    jb = !0,
    kb = !1,
    lb = !1,
    mb = !1;
  function nb(a) {
    if (mb && null != a && "string" !== typeof a)
      throw Error(
        "Expected a string or null or undefined but got " + a + " a " + qa(a)
      );
    return a;
  }
  function ob(a) {
    switch (typeof a) {
      case "number":
        return isFinite(a) ? a : String(a);
      case "object":
        if (a && !Array.isArray(a)) {
          if (Pa && null != a && a instanceof Uint8Array) return Oa(a);
          if (a instanceof Sa) {
            var b = a.va;
            return (a =
              null == b ? "" : "string" === typeof b ? b : (a.va = Oa(b)));
          }
        }
    }
    return a;
  }
  function pb(a, b, c, d) {
    if (null != a) {
      if (Array.isArray(a)) var e = qb(a, b, c, void 0 !== d);
      else if (ab(a)) {
        var f = {};
        for (e in a) f[e] = pb(a[e], b, c, d);
        e = f;
      } else e = b(a, d);
      return e;
    }
  }
  function qb(a, b, c, d) {
    d = d ? Ya(a) : void 0;
    var e = Array.prototype.slice.call(a);
    c(a, e);
    for (a = 0; a < e.length; a++) e[a] = pb(e[a], b, c, d);
    return e;
  }
  function rb(a) {
    return a.ea === $a ? a.toJSON() : ob(a);
  }
  function sb(a) {
    if (!a) return a;
    if ("object" === typeof a) {
      if (Pa && null != a && a instanceof Uint8Array) return new Uint8Array(a);
      if (a.ea === $a) return a.clone();
    }
    return a;
  }
  function tb() {}
  var K = function (a, b, c) {
      c = void 0 === c ? !1 : c;
      return -1 === b
        ? null
        : b >= a.C
        ? a.j
          ? a.j[b]
          : void 0
        : c && a.j && ((c = a.j[b]), null != c)
        ? c
        : a.h[b + a.B];
    },
    L = function (a, b, c, d, e) {
      d = void 0 === d ? !1 : d;
      (e = void 0 === e ? !1 : e) || hb(a);
      a.la && (a.la = void 0);
      if (b >= a.C || (d && !kb))
        return ((a.j || (a.j = a.h[a.C + a.B] = {}))[b] = c), a;
      void 0 !== a.j && a.C >= a.h.length
        ? ((d = a.h.length - 1),
          (e = b + a.B),
          e >= d
            ? ((a.h[d] = void 0), (a.h[e] = c), a.h.push(a.j))
            : (a.h[e] = c))
        : (a.h[b + a.B] = c);
      void 0 !== a.j && b in a.j && delete a.j[b];
      return a;
    };
  function ub(a, b, c) {
    var d = K(a, b, c);
    Array.isArray(d) || (d = gb);
    var e = H(d);
    e & 1 || I(d);
    J(a.h)
      ? e & 2 || G(d, 2)
      : d === gb && ((d = I(Array.prototype.slice.call(d))), L(a, b, d, c));
    return d;
  }
  function N(a, b, c, d) {
    hb(a);
    var e = a;
    if (c !== d) L(e, b, c);
    else {
      var f;
      L(e, b, void 0, !1, f);
    }
    return a;
  }
  var xb = function (a, b, c) {
    var d;
    hb(a);
    null == c && (c = void 0);
    return L(a, b, c, d);
  };
  function yb(a, b, c, d, e, f) {
    if ((a = a.l && a.l[c])) {
      f = f.J ? I(a.slice()) : a;
      hb(b);
      if (null != f) {
        e = I([]);
        d = !1;
        for (a = 0; a < f.length; a++) (e[a] = f[a].h), (d = d || J(e[a]));
        b.l || (b.l = {});
        b.l[c] = f;
        f = e;
        d ? Ta(f, 8) : G(f, 8);
      } else b.l && (b.l[c] = void 0), (e = gb);
      L(b, c, e, g);
    } else {
      var g = d;
      null != g
        ? Pa && g instanceof Uint8Array
          ? (g = g.length
              ? new Sa(new Uint8Array(g))
              : Ra || (Ra = new Sa(null)))
          : Array.isArray(g) &&
            (e
              ? G(g, 2)
              : (g ? ((e = H(g)), (e = !!(e & 1))) : (e = !1),
                e && f.J
                  ? ((f = Array.prototype.slice.call(g)),
                    Ua(f, (H(g) | 0) & -51),
                    (g = f))
                  : Xa(g)))
        : (g = void 0);
      L(b, c, g);
    }
  }
  var O = function (a, b, c) {
    null == a && (a = zb);
    zb = null;
    var d = this.constructor.Ra || 0,
      e = 0 < d,
      f = !1,
      g = this.constructor.Sa,
      h = !1;
    if (null == a) {
      var k = g ? [g] : [];
      G(k, 48);
      a = k;
      k = !0;
      e && lb && ((d = 0), (f = !0));
    } else {
      if (!jb) {
        if (!Array.isArray(a)) throw Error();
        if (Object.isFrozen(a) || !Object.isExtensible(a) || Object.isSealed(a))
          throw Error();
      }
      if (!ib && g && g !== a[0]) throw Error();
      if ((k = Ya(a))) {
        var l = void 0 === l ? !0 : l;
        h = H(a);
        Ua(a, l ? h | 32 : h & -33);
        h = !!(h & 32);
      }
    }
    if (!ib && g && g !== a[0])
      throw Error(
        'Expected message to have a message id: "' +
          g +
          '" in the array, got: ' +
          JSON.stringify(a) +
          ", are you parsing with the wrong proto?"
      );
    e &&
      0 < a.length &&
      ab(a[a.length - 1]) &&
      "g" in a[a.length - 1] &&
      (d = 0);
    this.B = (g ? 0 : -1) - d;
    this.l = void 0;
    this.h = a;
    a: {
      d = f;
      g = this.h.length;
      f = g - 1;
      if (g && ((g = this.h[f]), ab(g))) {
        this.j = g;
        b = Object.keys(g);
        0 < b.length && La(b, isNaN)
          ? (this.C = Number.MAX_VALUE)
          : (this.C = f - this.B);
        break a;
      }
      void 0 !== b && -1 < b
        ? ((this.C = Math.max(b, f + 1 - this.B)), (this.j = void 0))
        : (this.C = Number.MAX_VALUE);
      d && ((f = {}), (this.j = ((f.g = 1), f)), this.h.push(this.j));
    }
    if (!e && this.j && "g" in this.j)
      throw Error(
        'Unexpected "g" flag in sparse object of message that is not a group type.'
      );
    if (c)
      for (e = k && !h ? Va : I, k = 0; k < c.length; k++)
        (h = c[k]),
          (f = K(this, h)) ? Array.isArray(f) && e(f) : L(this, h, gb, !1, !0);
  };
  O.prototype.toJSON = function () {
    var a = this.h;
    return bb ? a : qb(a, rb, tb);
  };
  O.prototype.getExtension = function (a) {
    return a.Qa(this);
  };
  O.prototype.hasExtension = function (a) {
    var b = void 0 === b ? !1 : b;
    return (a = null != K(this, a.Pa, b));
  };
  O.prototype.clone = function () {
    var a = this;
    var b = Za;
    b = qb(a.h, sb, b);
    Wa(b);
    zb = b;
    b = new a.constructor(b);
    zb = null;
    Ab(b, a);
    return b;
  };
  var Bb = function (a) {
    if (J(a.h)) {
      var b = a;
      var c = void 0 === c ? { J: !0 } : c;
      c = c.J;
      c = { J: c };
      var d = J(b.h);
      if (d && !c.J)
        throw Error("copyRepeatedFields must be true for frozen messages");
      d || Xa(b.h);
      var e = new b.constructor();
      b.L && (e.L = b.L.slice());
      for (var f = b.h, g = 0; g < f.length; g++) {
        var h = f[g];
        if (g === f.length - 1 && ab(h))
          for (l in h) {
            var k = +l;
            Number.isNaN(k)
              ? ((e.j || (e.j = e.h[e.C + e.B] = {}))[l] = h[l])
              : yb(b, e, k, h[l], d, c);
          }
        else yb(b, e, g - b.B, h, d, c);
      }
      var l = e;
      l.la = a;
      a = l;
    }
    return a;
  };
  O.prototype.ea = $a;
  O.prototype.toString = function () {
    return this.h.toString();
  };
  function Ab(a, b) {
    b.L && (a.L = b.L.slice());
    var c = b.l;
    if (c) {
      b = b.j;
      for (var d in c) {
        var e = c[d];
        if (e) {
          var f = !(!b || !b[d]),
            g = +d;
          if (Array.isArray(e)) {
            if (e.length) {
              var h = e[0].constructor,
                k = a,
                l = f;
              l = void 0 === l ? !1 : l;
              f = J(k.h);
              var m = k;
              var n = l,
                x = f;
              x = void 0 === x ? !0 : x;
              m.l || (m.l = {});
              var t = m.l[g],
                B = ub(m, g, n),
                vb = J(m.h),
                Ic = Ya(m.h),
                M = J(B),
                wb = vb || M;
              !x &&
                M &&
                ((B = I(Array.prototype.slice.call(B))), L(m, g, B, n));
              if (!t) {
                t = [];
                n = wb;
                for (M = 0; M < B.length; M++) {
                  var D = B[M];
                  n = n || J(D);
                  var ha = Ic,
                    ia = !1;
                  ia = void 0 === ia ? !1 : ia;
                  ha = void 0 === ha ? !1 : ha;
                  D = Array.isArray(D)
                    ? new h(ha ? Wa(D) : D)
                    : ia
                    ? new h()
                    : void 0;
                  void 0 !== D && (t.push(D), wb && G(D.h, 2));
                }
                m.l[g] = t;
                Object.isFrozen(B) ||
                  ((h = H(B) | 33), (h = n ? h & -9 : h | 8), Ua(B, h));
              }
              h = vb || x;
              x = J(t);
              h &&
                !x &&
                (Object.isFrozen(t) && (m.l[g] = t = t.slice()),
                G(t, 2),
                Object.freeze(t));
              !h && x && (m.l[g] = t = t.slice());
              m = t;
              g = ub(k, g, l);
              if ((k = !f && g)) {
                if (!g)
                  throw Error("cannot check mutability state of non-array");
                k = H(g);
                k = !!(k & 8);
                k = !k;
              }
              if (k) {
                for (k = 0; k < m.length; k++)
                  (f = m[k]) && J(f.h) && ((m[k] = Bb(m[k])), (g[k] = m[k].h));
                G(g, 8);
              }
              g = m;
              for (k = 0; k < Math.min(g.length, e.length); k++) Ab(g[k], e[k]);
            }
          } else throw Error("unexpected object: type: " + qa(e) + ": " + e);
        }
      }
    }
  }
  var zb;
  var P = O; /*

 SPDX-License-Identifier: Apache-2.0
*/
  function Cb(a, b) {
    var c, d;
    for (d in a) b.call(c, a[d], d, a);
  }
  function Db(a, b) {
    var c,
      d = {},
      e;
    for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
    return d;
  }
  function Eb(a, b) {
    var c, d;
    for (d in a) if (b.call(c, a[d], d, a)) return d;
  }
  var Fb,
    Gb = function () {
      if (void 0 === Fb) {
        var a = null,
          b = y.trustedTypes;
        if (b && b.createPolicy)
          try {
            a = b.createPolicy("goog#html", {
              createHTML: za,
              createScript: za,
              createScriptURL: za,
            });
          } catch (c) {
            y.console && y.console.error(c.message);
          }
        Fb = a;
      }
      return Fb;
    };
  var Ib = function (a, b) {
    this.qa = b === Hb ? a : "";
  };
  Ib.prototype.toString = function () {
    return this.qa + "";
  };
  var Hb = {},
    Jb = function (a) {
      var b = Gb();
      a = b ? b.createScriptURL(a) : a;
      return new Ib(a, Hb);
    };
  var Kb = {},
    Lb = function (a, b) {
      this.pa = b === Kb ? a : "";
    };
  Lb.prototype.toString = function () {
    return this.pa.toString();
  };
  function Mb(a, b) {
    a.srcdoc =
      b instanceof Lb && b.constructor === Lb ? b.pa : "type_error:SafeHtml";
  }
  function Nb(a, b) {
    a.src =
      b instanceof Ib && b.constructor === Ib
        ? b.qa
        : "type_error:TrustedResourceUrl";
    b = a.ownerDocument && a.ownerDocument.defaultView;
    var c;
    b = (b || window).document;
    var d;
    (c = (b =
      null == (d = (c = b).querySelector) ? void 0 : d.call(c, "script[nonce]"))
      ? b.nonce || b.getAttribute("nonce") || ""
      : "") && a.setAttribute("nonce", c);
  }
  var Ob = function (a) {
    var b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  };
  var Pb = Ob(function () {
    var a = !1;
    try {
      var b = Object.defineProperty({}, "passive", {
        get: function () {
          a = !0;
        },
      });
      y.addEventListener("test", null, b);
    } catch (c) {}
    return a;
  });
  function Qb(a) {
    return a ? (a.passive && Pb() ? a : a.capture || !1) : !1;
  }
  var Rb = function (a, b, c) {
      var d;
      a.addEventListener && a.addEventListener(b, c, Qb(d));
    },
    Sb = function (a, b, c) {
      var d;
      a.removeEventListener && a.removeEventListener(b, c, Qb(d));
    };
  var Tb = function (a) {
    var b = Gb();
    a = b ? b.createHTML(a) : a;
    return (a = new Lb(a, Kb));
  };
  var Ub = function (a, b, c) {
      function d(h) {
        h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h);
      }
      for (var e = 1; e < c.length; e++) {
        var f = c[e];
        if (!ra(f) || (sa(f) && 0 < f.nodeType)) d(f);
        else {
          a: {
            if (f && "number" == typeof f.length) {
              if (sa(f)) {
                var g =
                  "function" == typeof f.item || "string" == typeof f.item;
                break a;
              }
              if ("function" === typeof f) {
                g = "function" == typeof f.item;
                break a;
              }
            }
            g = !1;
          }
          Ja(g ? Ma(f) : f, d);
        }
      }
    },
    Vb = function (a, b) {
      b = String(b);
      "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
      return a.createElement(b);
    },
    Wb = function (a) {
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
    },
    Xb = function (a, b) {
      a.appendChild(b);
    },
    Yb = function (a, b) {
      Ub(9 == a.nodeType ? a : a.ownerDocument || a.document, a, arguments);
    },
    Zb = function (a) {
      return a && a.parentNode ? a.parentNode.removeChild(a) : null;
    },
    $b = function (a, b) {
      if (!a || !b) return !1;
      if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
      if ("undefined" != typeof a.compareDocumentPosition)
        return a == b || !!(a.compareDocumentPosition(b) & 16);
      for (; b && a != b; ) b = b.parentNode;
      return b == a;
    },
    ac = function (a) {
      this.Y = a || y.document || document;
    };
  p = ac.prototype;
  p.getElementsByTagName = function (a, b) {
    b = b || this.Y;
    return b.getElementsByTagName(String(a));
  };
  p.createElement = function (a) {
    return Vb(this.Y, a);
  };
  p.createTextNode = function (a) {
    return this.Y.createTextNode(String(a));
  };
  p.appendChild = Xb;
  p.append = Yb;
  p.canHaveChildren = Wb;
  p.removeNode = Zb;
  p.contains = $b;
  var bc = function (a, b, c, d) {
      var e = "";
      a && (e += a + ":");
      c && ((e += "//"), b && (e += b + "@"), (e += c), d && (e += ":" + d));
      return e;
    },
    cc = RegExp(
      "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
    ),
    dc = null,
    ec = function (a) {
      var b = a.match(cc);
      dc && 0 <= ["http", "https", "ws", "wss", "ftp"].indexOf(b[1]) && dc(a);
      return b;
    },
    fc = function (a) {
      return a ? decodeURI(a) : a;
    };
  var gc = function (a, b) {
      if (a)
        for (var c in a)
          Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
    },
    hc = function (a, b) {
      b = void 0 === b ? document : b;
      return b.createElement(String(a).toLowerCase());
    };
  var jc = function (a, b, c, d) {
    c = void 0 === c ? null : c;
    d = void 0 === d ? !1 : d;
    ic(a, b, c, d);
  };
  function ic(a, b, c, d) {
    a.google_image_requests || (a.google_image_requests = []);
    var e = hc("IMG", a.document);
    if (c || d) {
      var f = function (g) {
        c && c(g);
        if (d) {
          g = a.google_image_requests;
          var h = Ia(g, e);
          0 <= h && Array.prototype.splice.call(g, h, 1);
        }
        Sb(e, "load", f);
        Sb(e, "error", f);
      };
      Rb(e, "load", f);
      Rb(e, "error", f);
    }
    e.src = b;
    a.google_image_requests.push(e);
  }
  function kc(a) {
    var b = y;
    var c = void 0 === c ? !1 : c;
    var d;
    if ((d = b.navigator))
      (d = b.navigator.userAgent),
        (d = /Chrome/.test(d) && !/Edge/.test(d) ? !0 : !1);
    d && b.navigator.sendBeacon
      ? b.navigator.sendBeacon(a)
      : jc(b, a, void 0, c);
  }
  var lc = [
    "googleads.g.doubleclick.net",
    "adclick.g.doubleclick.net",
    "www.googleadservices.com",
    "adclick.googleadservices.com",
  ];
  var mc = function (a, b) {
    var c;
    var d = void 0 === d ? document : d;
    var e = (
      d
        ? new ac(9 == d.nodeType ? d : d.ownerDocument || d.document)
        : Aa || (Aa = new ac())
    ).createElement("SCRIPT");
    e.type = "text/javascript";
    b &&
      (void 0 !== e.onreadystatechange
        ? (e.onreadystatechange = function () {
            if ("complete" == e.readyState || "loaded" == e.readyState)
              try {
                b && b();
              } catch (g) {}
          })
        : (e.onload = b));
    c && (e.id = c);
    Nb(e, Jb(a));
    var f = d.getElementsByTagName("head")[0];
    if (f)
      try {
        y.setTimeout(function () {
          f.appendChild(e);
        }, 0);
      } catch (g) {}
  };
  var nc = function (a, b) {
      var c = this;
      this.Aa = b;
      this.ha = null;
      this.M = "";
      this.A = "1";
      mc(a, function () {
        c.A = null;
        if (window.botguard)
          if (window.botguard.bg)
            try {
              c.ha = new window.botguard.bg(c.Aa);
            } catch (d) {
              c.A = "5";
            }
          else c.A = "3";
        else c.A = "2";
      });
    },
    oc = function (a) {
      if (a.A) return "";
      if (!a.ha.invoke) return (a.A = "4"), "";
      try {
        var b = a.ha.invoke();
      } catch (c) {
        return (a.A = "6"), "";
      }
      return b && b.length ? b : ((a.A = "6"), "");
    };
  nc.prototype.getError = function () {
    return this.A
      ? this.A
      : this.M.length
      ? 3 > this.M.length
        ? "7"
        : 2550 < this.M.length
        ? "8"
        : null
      : null;
  };
  var pc = window;
  var Q = function (a, b) {
      this.Oa = a;
      this.W = b;
      this.H = {};
      this.R = !1;
    },
    sc = function (a) {
      a.R = !0;
      for (var b in a.H) a.H[b].ba && qc(a, b), rc(a, b);
    },
    tc = function (a, b) {
      var c = b.n;
      switch (b.t) {
        case 1:
          b = b.d;
          c = R(a, c);
          c.ba(b);
          break;
        case 2:
          (b = R(a, c)), (b.ca = !0), rc(a, c);
      }
    },
    R = function (a, b) {
      a.H[b] || (a.H[b] = { ca: !1, T: [], ba: null });
      return a.H[b];
    },
    rc = function (a, b) {
      var c = R(a, b);
      if (c.ca) {
        for (var d = c.T.length, e = 0; e < d; e++) a.sendMessage(b, c.T[e]);
        c.T = [];
      }
    },
    qc = function (a, b) {
      if (a.R) {
        var c = {};
        b = ((c.t = 2), (c.s = a.W), (c.n = b), c);
        a.send(b);
      }
    };
  Q.prototype.registerApplicationHandler = function (a, b) {
    var c = R(this, a);
    c.ba = b;
    qc(this, a);
  };
  Q.prototype.sendMessage = function (a, b) {
    var c = R(this, a);
    this.R && c.ca
      ? ((c = {}),
        (a = ((c.t = 1), (c.s = this.W), (c.n = a), (c.d = b), c)),
        this.send(a))
      : c.T.push(b);
  };
  Q.prototype.isInitialized = function () {
    return this.R;
  };
  function uc(a) {
    var b = a;
    if (b.changedTouches && 0 < b.changedTouches.length) {
      var c = b.changedTouches[0].clientX;
      a = b.changedTouches[0].clientY;
    } else (c = a.clientX), (a = a.clientY);
    return { x: Math.round(c), y: Math.round(a) };
  }
  var T = function (a) {
      var b = S,
        c =
          "ExitApi.exit();" == document.body.getAttribute("onClick") ||
          "Enabler.exit('ad');" == document.body.getAttribute("onClick");
      c = void 0 === c ? !1 : c;
      this.F = b;
      this.na = pc.parent;
      this.N = a;
      this.Z = c;
      this.ia = [];
      this.da = Infinity;
      this.U = this.P = null;
      this.ja = 0;
      if ((a = this.N.bg)) this.P = new nc(a.u, a.c);
      this.F.registerApplicationHandler("event", z(this.Ea, this));
      window.addEventListener("click", z(this.Ia, this), !0);
      if ("function" == typeof TouchEvent) {
        var d = [];
        TouchEvent.prototype.preventDefault = function () {
          var f = Date.now() + 1500;
          this instanceof Event
            ? d.push({ position: uc(this), ta: f })
            : d.push({ position: void 0, ta: f });
        };
        a = function (f) {
          for (
            var g = -1, h = uc(f), k = Date.now(), l = 0;
            l < d.length;
            ++l
          ) {
            var m = d[l];
            if (k > m.ta) g == l - 1 && (g = l);
            else if (
              null == m.position ||
              (m.position.x == h.x && m.position.y == h.y)
            ) {
              f.stopPropagation();
              break;
            }
          }
          -1 != g && d.splice(0, g - 1);
        };
        window.addEventListener("mousemove", a, !0);
        window.addEventListener("mousedown", a, !0);
        window.addEventListener("mouseup", a, !0);
        window.addEventListener("click", a, !0);
        var e = function () {};
        window.addEventListener(
          "touchend",
          function (f) {
            f.target && f.target.addEventListener("click", e);
          },
          !0
        );
      }
      window.addEventListener("touchstart", z(this.La, this), !0);
      vc(this);
      this.exit = this.exit;
      this.exitNonCharging = this.exitNonCharging;
      this.reportInteraction_ = this.reportInteraction_;
      this.updateUrls_ = this.updateUrls_;
      this.configureCloseButton = this.configureCloseButton;
    },
    vc = function (a) {
      var b = a;
      a.F.registerApplicationHandler("exit-pmcfg", function (c) {
        b.oa = c;
      });
    };
  p = T.prototype;
  p.exit = function (a, b) {
    this.Z || wc(this, a, void 0, b);
  };
  p.exitNonCharging = function (a) {
    this.Z || wc(this, a, 38);
  };
  p.reportInteraction_ = function (a) {
    var b = {};
    b.i = a;
    a = { i: b };
    xc(this, a) || this.F.sendMessage("interactions", b);
  };
  p.updateUrls_ = function (a) {
    var b = {};
    b.f = a;
    a = { u: b };
    xc(this, a) || this.F.sendMessage("url_update", b);
  };
  p.configureCloseButton = function (a) {
    var b = {};
    b.t = a;
    this.F.sendMessage("mb_close_btn", b);
  };
  var yc = function (a) {
      var b = Date.now();
      a.da = b;
    },
    wc = function (a, b, c, d) {
      var e = Date.now();
      e < a.ja ? zc(a, b, c, d) : (a.U = { xa: b, Ba: c, Ma: d, Da: e + 1500 });
    },
    zc = function (a, b, c, d) {
      if (1 != a.N.exit_strategy || d) var e = !1;
      else {
        if ((e = b))
          e =
            (e = (e = a.N.google_template_data) && e.adData) && e[0] && e[0][b];
        e = e || a.N.redirect_url;
        var f = "string" === typeof e && (ec(e)[1] || null);
        e =
          "string" === typeof f && 0 == f.toLowerCase().indexOf("http")
            ? null != pc.open(e, "_blank")
            : !1;
      }
      f = e;
      e = {};
      e.f = b;
      e.c = c;
      e.r = d;
      e.d = a.ia;
      e.o = f;
      a.P &&
        ((b = a.P),
        (b.M = oc(b)),
        (b = b.M),
        (e.br = b),
        (e.be = a.P.getError()));
      xc(a, e) || a.F.sendMessage("exit", e);
    },
    xc = function (a, b) {
      if (a.oa && a.na.postMessage) {
        var c = {};
        c.n = a.oa;
        c.er = b;
        a.na.postMessage(c, "*");
        return !0;
      }
      return !1;
    },
    Ac = function (a, b, c) {
      var d = b;
      b = d.x;
      d = d.y;
      var e = {};
      e.x = b;
      e.y = d;
      e.e = c;
      e.t = Date.now() - a.da;
      e.ts = Date.now();
      a.ia.push(e);
    };
  T.prototype.Ia = function (a) {
    this.Z && wc(this);
    Ac(this, uc(a), 0);
    a = Date.now();
    if (this.U) {
      var b = this.U;
      a < b.Da && zc(this, b.xa, b.Ba, b.Ma);
    }
    this.U = null;
    this.ja = a + 200;
  };
  T.prototype.La = function (a) {
    a.changedTouches && 0 < a.changedTouches.length && Ac(this, uc(a), 1);
  };
  T.prototype.Ea = function (a) {
    switch (a.e) {
      case "onshow":
        this.da = Date.now();
    }
  };
  var Cc = function (a) {
    P.call(this, a, -1, Bc);
  };
  v(Cc, P);
  var Bc = [15];
  var Dc = function (a) {
    P.call(this, a);
  };
  v(Dc, P);
  Dc.prototype.getContext = function () {
    var a = K(this, 2);
    return (a = null == a ? 0 : a);
  };
  var Ec = function (a) {
    P.call(this, a);
  };
  v(Ec, P);
  Ec.prototype.getParameters = function () {
    var a = Dc;
    var b = void 0 === b ? !1 : b;
    var c = b;
    var d = K(this, 1, c);
    var e = a,
      f = !1;
    a =
      null == d ||
      "object" !== typeof d ||
      (f = Array.isArray(d)) ||
      d.ea !== $a
        ? f
          ? new e(d)
          : g
          ? new e()
          : void 0
        : d;
    var g = a;
    g !== d && null != g && (L(this, 1, g, c, !0), G(g.h, H(this.h) & -33));
    c = g;
    null != c && J(c.h) && !J(this.h) && ((c = Bb(c)), L(this, 1, c, b));
    b = c;
    return b;
  };
  Ec.prototype.setParameters = function (a) {
    return xb(this, 1, a);
  };
  var Fc = function () {
      var a = void 0 === a ? 4e3 : a;
      var b = void 0 === b ? "&" : b;
      this.Ga = a;
      this.fa = b;
      this.X = {};
      this.Ha = 0;
      this.O = [];
    },
    Hc = function (a, b, c, d, e) {
      var f = [];
      gc(a, function (g, h) {
        (g = Gc(g, b, c, d, e)) && f.push(h + "=" + g);
      });
      return f.join(b);
    },
    Gc = function (a, b, c, d, e) {
      if (null == a) return "";
      b = b || "&";
      c = c || ",$";
      "string" == typeof c && (c = c.split(""));
      if (a instanceof Array) {
        if (((d = d || 0), d < c.length)) {
          for (var f = [], g = 0; g < a.length; g++)
            f.push(Gc(a[g], b, c, d + 1, e));
          return f.join(c[d]);
        }
      } else if ("object" == typeof a)
        return (
          (e = e || 0),
          2 > e ? encodeURIComponent(Hc(a, b, c, d, e + 1)) : "..."
        );
      return encodeURIComponent(String(a));
    },
    Kc = function (a, b, c, d) {
      b = b + "//" + c + d;
      var e = Jc(a) - d.length;
      if (0 > e) return "";
      a.O.sort(function (m, n) {
        return m - n;
      });
      d = null;
      c = "";
      for (var f = 0; f < a.O.length; f++)
        for (var g = a.O[f], h = a.X[g], k = 0; k < h.length; k++) {
          if (!e) {
            d = null == d ? g : d;
            break;
          }
          var l = Hc(h[k], a.fa, ",$");
          if (l) {
            l = c + l;
            if (e >= l.length) {
              e -= l.length;
              b += l;
              c = a.fa;
              break;
            }
            d = null == d ? g : d;
          }
        }
      a = "";
      null != d && (a = c + "trn=" + d);
      return b + a;
    },
    Jc = function (a) {
      var b = 1,
        c;
      for (c in a.X) b = c.length > b ? c.length : b;
      return a.Ga - 3 - b - a.fa.length - 1;
    };
  var Lc = function () {
      var a = void 0 === a ? pc : a;
      a = (a = "http:" === a.location.protocol) ? "http:" : "https:";
      var b = void 0 === b ? !1 : b;
      this.Ka = a;
      this.Ca = "pagead2.googlesyndication.com";
      this.Ja = "/pagead/gen_204?id=";
      this.ya = b;
      this.sa = Math.random();
    },
    Nc = function () {
      var a = Mc,
        b = window.google_srt;
      0 <= b && 1 >= b && (a.sa = b);
    },
    Pc = function (a, b) {
      var c = Mc,
        d = !0;
      d = void 0 === d ? !1 : d;
      if (Oc(c, d))
        try {
          if (a instanceof Fc) var e = a;
          else
            (e = new Fc()),
              gc(a, function (g, h) {
                var k = e,
                  l = g;
                g = k.Ha++;
                var m = {};
                m[h] = l;
                h = [m];
                k.O.push(g);
                k.X[g] = h;
              });
          var f = Kc(e, c.Ka, c.Ca, c.Ja + "html5-mon&");
          f &&
            ("undefined" !== typeof b ? jc(y, f, b) : c.ya ? kc(f) : jc(y, f));
        } catch (g) {}
    },
    Oc = function (a, b) {
      a = b ? a.sa : Math.random();
      return 1 > a;
    };
  var Qc = null;
  function Rc() {
    var a = void 0 === a ? y : a;
    return (a = a.performance) && a.now && a.timing
      ? Math.floor(a.now() + a.timing.navigationStart)
      : Date.now();
  }
  function Sc() {
    var a = void 0 === a ? y : a;
    return (a = a.performance) && a.now ? a.now() : null;
  }
  var Tc = function (a, b, c) {
    var d, e;
    var f = void 0 === f ? 0 : f;
    this.label = a;
    this.type = b;
    this.value = c;
    this.duration = f;
    this.uniqueId = Math.random();
    this.slotId = d;
    this.taskId = e;
  };
  var U = y.performance,
    Uc = !!(U && U.mark && U.measure && U.clearMarks),
    V = Ob(function () {
      var a;
      if ((a = Uc)) {
        var b;
        if (null === Qc) {
          Qc = "";
          try {
            a = "";
            try {
              a = y.top.location.hash;
            } catch (c) {
              a = y.location.hash;
            }
            a && (Qc = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "");
          } catch (c) {}
        }
        b = Qc;
        a = !!b.indexOf && 0 <= b.indexOf("1337");
      }
      return a;
    }),
    Vc = function () {
      var a = window;
      this.G = [];
      this.Fa = a || y;
      var b = null;
      a &&
        ((a.google_js_reporting_queue = a.google_js_reporting_queue || []),
        (this.G = a.google_js_reporting_queue),
        (b = a.google_measure_js_timing));
      this.I = V() || (null != b ? b : 1 > Math.random());
    };
  Vc.prototype.disable = function () {
    this.I = !1;
    this.G != this.Fa.google_js_reporting_queue &&
      (V() && Ja(this.G, Wc), (this.G.length = 0));
  };
  var Wc = function (a) {
    a &&
      U &&
      V() &&
      (U.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"),
      U.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"));
  };
  Vc.prototype.start = function (a, b) {
    if (!this.I) return null;
    var c = Sc() || Rc();
    a = new Tc(a, b, c);
    b = "goog_" + a.label + "_" + a.uniqueId + "_start";
    U && V() && U.mark(b);
    return a;
  };
  Vc.prototype.end = function (a) {
    if (this.I && "number" === typeof a.value) {
      var b = Sc() || Rc();
      a.duration = b - a.value;
      b = "goog_" + a.label + "_" + a.uniqueId + "_end";
      U && V() && U.mark(b);
      !this.I || 2048 < this.G.length || this.G.push(a);
    }
  };
  var Xc = function () {};
  var Mc,
    Yc = new Vc(),
    Zc = function () {
      var a,
        b = window;
      null != a && (b.google_measure_js_timing = a);
      b.google_measure_js_timing || Yc.disable();
    },
    $c = function () {
      var a, b;
      Mc = null != (b = a) ? b : new Lc();
      "number" !== typeof window.google_srt &&
        (window.google_srt = Math.random());
      Nc();
      "complete" == window.document.readyState
        ? Zc()
        : Yc.I &&
          Rb(window, "load", function () {
            Zc();
          });
    };
  $c();
  var ad = new WeakMap();
  function bd(a) {
    var b = void 0 === b ? cd : b;
    var c = va(a),
      d = function (f) {
        f = u(f);
        f.next();
        f = ea(f);
        return b(c, f);
      },
      e = function () {
        var f = oa.apply(0, arguments),
          g = this || y,
          h = ad.get(g);
        h || ((h = {}), ad.set(g, h));
        g = h;
        h = [this].concat(f instanceof Array ? f : ea(u(f)));
        f = d ? d(h) : h;
        if (Object.prototype.hasOwnProperty.call(g, f)) f = g[f];
        else {
          var k = u(h);
          h = k.next().value;
          k = ea(k);
          h = a.apply(h, k);
          f = g[f] = h;
        }
        return f;
      };
    return e;
  }
  var cd = function (a, b) {
    a = [a];
    for (var c = b.length - 1; 0 <= c; --c) a.push(typeof b[c], b[c]);
    return a.join("\v");
  };
  var dd = ["destinationUrl", "displayUrl"],
    ed =
      "googlesyndication.com googleadservices.com googleusercontent.com doubleclick.net youtube.com googleapis.com gstatic.com google-analytics.com".split(
        " "
      ),
    fd = bd(function (a, b, c, d) {
      d = void 0 === d ? {} : d;
      d.i = a.creativeId;
      d.t = a.templateId;
      d.c = b;
      d.m = c;
      d.lp = a.layoutPath;
      a.experimentId && (d.e = a.experimentId);
      a.aa && (d.gqi = a.aa);
      a.ga && (d.qqi = a.ga);
      a.Na(d);
    });
  function gd(a, b) {
    return function (c, d, e) {
      var f = {};
      e && (f.jsl = e);
      d && (f.jsf = d);
      fd(a, "j", c, f);
      b && b(c, d, e);
    };
  }
  function hd(a) {
    var b = ec(a),
      c = function (d) {
        return Ba(b[3], d);
      };
    return Ka(ed, c) ? a : bc(b[1], b[2], b[3], b[4]);
  }
  function id(a, b, c) {
    var d = {},
      e = 0,
      f = function (g, h, k, l) {
        d["a" + e] = g;
        null != h && (d["f" + e] = h);
        null != k && null != l && ((d["s" + e] = k), (d["d" + e] = l));
        e++;
      };
    0 != b && f("layout", "layout", 0, b.toFixed(4));
    if ((b = window.performance && window.performance.timing))
      (b = b.responseEnd - b.navigationStart),
        f(
          "http" + ("http:" === window.location.protocol ? "" : "s"),
          "layout_html",
          0,
          b.toFixed(4)
        );
    window.performance &&
      window.performance.getEntries &&
      (Ja(window.performance.getEntries(), function (g) {
        var h = Eb(c, function (m) {
          return g.name && Ba(g.name, m);
        });
        h && h in c && delete c[h];
        if (jd(g.name) && a.reportPerf) {
          var k = 0 < g.startTime ? g.startTime.toFixed(4) : null,
            l =
              0 < g.responseEnd
                ? (g.responseEnd - g.startTime).toFixed(4)
                : null;
          f(hd(g.name), h, k, l);
        }
      }),
      (a.reportPerf || a.reportErrors) &&
        Cb(c, function (g, h) {
          f(g, h, -1, -1);
        }));
    0 < e && fd(a, "p", "", d);
  }
  function kd(a) {
    return Db(a, function (b, c) {
      return "string" === typeof b && jd(b) && !(0 <= Ia(dd, c));
    });
  }
  function jd(a) {
    var b;
    if ((b = /^(https?:)?\/\//.test(a)))
      (b = a)
        ? (a = fc(ec(b)[5] || null))
          ? ((b = b ? ((b = fc(ec(b)[3] || null)) ? 0 <= Ia(lc, b) : !1) : !1),
            (a = b && -1 != a.indexOf("/aclk")))
          : (a = !1)
        : (a = !1),
        (b = !a);
    return b;
  }
  function ld(a, b, c, d, e) {
    var f = z(
      Function.prototype.apply,
      b,
      c,
      Array.prototype.slice.call(arguments, 3)
    );
    if (d && d.monitoring) {
      var g = d.monitoring;
      g = {
        creativeId: g.creativeId || -1,
        templateId: g.templateId || -1,
        experimentId: g.experimentId,
        reportErrors: g.reportErrors || !1,
        reportPerf: g.reportPerf || !1,
        Na: a,
        layoutPath: g.layoutPath,
        aa: g.gqi,
        ga: g.qqi,
        rumUrl: g.rumUrl,
        ra: g.rumc,
        ma: g.navStart,
      };
      var h = d.monitoring.loadTime ? Date.now() - d.monitoring.loadTime : 0,
        k = d.google_template_data.adData[0];
      k = kd(k);
      h = ya(id, g, h, k);
      window.setTimeout(h, 1e4);
      if (g.rumUrl) {
        h = new Ec();
        k = new Dc();
        g.ra && N(k, 1, g.ra, 0);
        g.ma && N(k, 6, g.ma, 0);
        var l = N(k, 2, 3, 0);
        l = N(l, 4, nb(g.ga), "");
        N(l, 3, nb(g.aa), "");
        h.setParameters(k);
        k = new Cc();
        k = N(k, 7, !0, !1);
        xb(h, 2, k);
        k = window;
        k.google_rum_config = h.toJSON();
        k = Jb(g.rumUrl);
        l = document;
        h = hc("SCRIPT", l);
        Nb(h, k);
        (k = l.getElementsByTagName("script")[0]) &&
          k.parentNode &&
          k.parentNode.insertBefore(h, k);
      }
      if (g.reportErrors) {
        h = window.onerror;
        window.onerror = gd(g, h);
        try {
          f();
        } catch (n) {
          f = gd(g, h);
          g = n.toString();
          n.name && -1 == g.indexOf(n.name) && (g += ": " + n.name);
          n.message && -1 == g.indexOf(n.message) && (g += ": " + n.message);
          if (n.stack) {
            h = n.stack;
            k = g;
            try {
              for (-1 == h.indexOf(k) && (h = k + "\n" + h); h != m; ) {
                var m = h;
                h = h.replace(
                  RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"),
                  "$1"
                );
              }
              g = h.replace(RegExp("\n *", "g"), "\n");
            } catch (x) {
              g = k;
            }
          }
          m = g;
          f(m, n.lineNumber, n.fileName);
        }
      } else f();
    } else f();
  }
  function md(a) {
    var b;
    var c = Xc,
      d = c,
      e = "ka";
    (d.ka && d.hasOwnProperty(e)) || ((c = new c()), (d.ka = c));
    d = [];
    !a.eid && d.length && (a.eid = d.toString());
    Pc(a, b);
  }
  var od = function (a, b, c, d, e, f) {
    Q.call(this, a, d);
    var g = this;
    try {
      var h = !!document.cookie;
    } catch (k) {
      h = !1;
    }
    if (
      h &&
      ((a =
        window.location.origin ||
        window.location.protocol + "//" + window.location.host),
      !0 !== window.secureChannel_allowAnyParent &&
        b !== a &&
        -1 === c.indexOf(a))
    )
      throw Error();
    this.ua = e && !!window.MessageChannel;
    this.V = b;
    this.D = this.S = null;
    this.za = function (k) {
      var l = k.data;
      l.s !== g.W ||
        k.source !== window.parent ||
        ("*" !== g.V && k.origin !== g.V) ||
        tc(g, l);
      return (k = void 0);
    };
    window.addEventListener("message", this.za, !1);
    f || "complete" == y.document.readyState
      ? nd(this)
      : window.addEventListener(
          "load",
          function () {
            nd(g);
          },
          !1
        );
  };
  v(od, Q);
  od.prototype.send = function (a) {
    this.ua
      ? this.S && this.S.postMessage(a)
      : this.D.contentWindow.postMessage(a, "*");
  };
  var nd = function (a) {
    var b = a,
      c = { t: 0 };
    c.s = a.W;
    if (a.ua) {
      var d = new MessageChannel();
      a.S = d.port1;
      a.S.onmessage = function (e) {
        tc(b, e.data);
      };
      a.Oa.postMessage(c, a.V, [d.port2]);
      sc(a);
    } else
      (a.D = Vb(document, "IFRAME")),
        (a.D.style.display = "none"),
        (d =
          '<!doctype html><html><head><script>window.addEventListener("message",function(e){e.source.parent.postMessage(e.data,' +
          JSON.stringify(a.V) +
          ");},false);\x3c/script></head><body></body></html>"),
        Mb(a.D, Tb(d)),
        (a.D.src = "javascript:'" + encodeURI(d) + "'"),
        (a.D.onload = function () {
          b.send(c);
          sc(b);
        }),
        document.body.appendChild(a.D);
  };
  for (
    var pd,
      qd = window.location.hash.substring(1),
      rd = {},
      sd = qd.split("&"),
      td = 0;
    td < sd.length;
    td++
  ) {
    var ud = sd[td].split("=");
    rd[ud[0]] = decodeURIComponent(ud[1]);
  }
  var W = (pd = rd),
    vd = W.p && 0 == W.p.indexOf("http") ? W.p : "*",
    wd = W.t ? W.t : "",
    xd;
  var yd = window.parent,
    zd = vd,
    Ad = [
      "http://pagead2.googlesyndication.com",
      "https://pagead2.googlesyndication.com",
      "http://tpc.googlesyndication.com",
      "https://tpc.googlesyndication.com",
      "https://adwords-displayads.googleusercontent.com",
    ],
    Bd = wd,
    Cd,
    Dd;
  Cd = void 0 === Cd ? !0 : Cd;
  Dd = void 0 === Dd ? !1 : Dd;
  try {
    xd = new od(yd, zd, Ad, Bd, Cd, Dd);
  } catch (a) {
    xd = null;
  }
  var S = xd;
  if (S) {
    S.registerApplicationHandler("adData", function (a) {
      if (window.onAdData) {
        var b = new T(a);
        yc(b);
        ld(md, window.onAdData, window, a, b);
      }
      "true" === a.evc_touch &&
        document.addEventListener(
          "touchstart",
          function () {
            S.sendMessage("touch", {});
          },
          { capture: !0 }
        );
    });
    S.registerApplicationHandler("inactivity", function (a) {
      0 < a.report_inactivity_ms && S && Ed(a.report_inactivity_ms, a.id);
    });
    var Fd = S,
      Gd,
      Hd = (Gd = void 0 === Gd ? "secureChannel" : Gd),
      Id = Fd,
      Jd,
      Kd = Hd,
      Ld = Id,
      Md = Jd,
      X = Kd.split("."),
      Y = Md || y;
    X[0] in Y ||
      "undefined" == typeof Y.execScript ||
      Y.execScript("var " + X[0]);
    for (var Z; X.length && (Z = X.shift()); )
      X.length || void 0 === Ld
        ? (Y = Y[Z] && Y[Z] !== Object.prototype[Z] ? Y[Z] : (Y[Z] = {}))
        : (Y[Z] = Ld);
  }
  function Ed(a, b) {
    var c = S;
    b = void 0 === b ? 0 : b;
    var d = setTimeout(function () {
      c.sendMessage("inactivity", { id: b });
    }, a);
    document.addEventListener(
      "touchstart",
      function () {
        clearTimeout(d);
      },
      { capture: !0 }
    );
    document.addEventListener(
      "touchend",
      function (e) {
        clearTimeout(d);
        0 === e.touches.length &&
          (d = setTimeout(function () {
            c.sendMessage("inactivity", { id: b });
          }, a));
      },
      { capture: !0 }
    );
  }
}.call(this));
