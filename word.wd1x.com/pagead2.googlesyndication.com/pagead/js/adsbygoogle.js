(function (sttc) {
  /* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/
  var n, aa;
  function ba(a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }
  var ca =
    "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (a, b, c) {
          if (a == Array.prototype || a == Object.prototype) return a;
          a[b] = c.value;
          return a;
        };
  function da(a) {
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
  var ea = da(this),
    fa = "function" === typeof Symbol && "symbol" === typeof Symbol("x"),
    q = {},
    ha = {};
  function t(a, b) {
    var c = ha[b];
    if (null == c) return a[b];
    c = a[c];
    return void 0 !== c ? c : a[b];
  }
  function u(a, b, c) {
    if (b)
      a: {
        var d = a.split(".");
        a = 1 === d.length;
        var e = d[0],
          f;
        !a && e in q ? (f = q) : (f = ea);
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
            ? ca(q, d, { configurable: !0, writable: !0, value: b })
            : b !== c &&
              (void 0 === ha[d] &&
                ((a = (1e9 * Math.random()) >>> 0),
                (ha[d] = fa ? ea.Symbol(d) : "$jscp$" + a + "$" + d)),
              ca(f, ha[d], { configurable: !0, writable: !0, value: b })));
      }
  }
  u(
    "Symbol",
    function (a) {
      function b(f) {
        if (this instanceof b)
          throw new TypeError("Symbol is not a constructor");
        return new c(d + (f || "") + "_" + e++, f);
      }
      function c(f, g) {
        this.h = f;
        ca(this, "description", { configurable: !0, writable: !0, value: g });
      }
      if (a) return a;
      c.prototype.toString = function () {
        return this.h;
      };
      var d = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
        e = 0;
      return b;
    },
    "es6"
  );
  u(
    "Symbol.iterator",
    function (a) {
      if (a) return a;
      a = (0, q.Symbol)("Symbol.iterator");
      for (
        var b =
            "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
              " "
            ),
          c = 0;
        c < b.length;
        c++
      ) {
        var d = ea[b[c]];
        "function" === typeof d &&
          "function" != typeof d.prototype[a] &&
          ca(d.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
              return ia(ba(this));
            },
          });
      }
      return a;
    },
    "es6"
  );
  function ia(a) {
    a = { next: a };
    a[t(q.Symbol, "iterator")] = function () {
      return this;
    };
    return a;
  }
  function ja(a) {
    return (a.raw = a);
  }
  function v(a) {
    var b =
      "undefined" != typeof q.Symbol &&
      t(q.Symbol, "iterator") &&
      a[t(q.Symbol, "iterator")];
    return b ? b.call(a) : { next: ba(a) };
  }
  function ka(a) {
    if (!(a instanceof Array)) {
      a = v(a);
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      a = c;
    }
    return a;
  }
  function la(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  var ma =
    fa && "function" == typeof t(Object, "assign")
      ? t(Object, "assign")
      : function (a, b) {
          for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d) for (var e in d) la(d, e) && (a[e] = d[e]);
          }
          return a;
        };
  u(
    "Object.assign",
    function (a) {
      return a || ma;
    },
    "es6"
  );
  var na =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          },
    oa;
  if (fa && "function" == typeof Object.setPrototypeOf)
    oa = Object.setPrototypeOf;
  else {
    var pa;
    a: {
      var qa = { a: !0 },
        ra = {};
      try {
        ra.__proto__ = qa;
        pa = ra.a;
        break a;
      } catch (a) {}
      pa = !1;
    }
    oa = pa
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var sa = oa;
  function w(a, b) {
    a.prototype = na(b.prototype);
    a.prototype.constructor = a;
    if (sa) sa(a, b);
    else
      for (var c in b)
        if ("prototype" != c)
          if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d);
          } else a[c] = b[c];
    a.ec = b.prototype;
  }
  function ta() {
    this.l = !1;
    this.i = null;
    this.A = void 0;
    this.h = 1;
    this.v = 0;
    this.j = null;
  }
  function ua(a) {
    if (a.l) throw new TypeError("Generator is already running");
    a.l = !0;
  }
  ta.prototype.m = function (a) {
    this.A = a;
  };
  function va(a, b) {
    a.j = { exception: b, pb: !0 };
    a.h = a.v;
  }
  ta.prototype.return = function (a) {
    this.j = { return: a };
    this.h = this.v;
  };
  function wa(a, b) {
    a.h = 2;
    return { value: b };
  }
  function xa(a) {
    this.h = new ta();
    this.i = a;
  }
  function ya(a, b) {
    ua(a.h);
    var c = a.h.i;
    if (c)
      return za(
        a,
        "return" in c
          ? c["return"]
          : function (d) {
              return { value: d, done: !0 };
            },
        b,
        a.h.return
      );
    a.h.return(b);
    return Aa(a);
  }
  function za(a, b, c, d) {
    try {
      var e = b.call(a.h.i, c);
      if (!(e instanceof Object))
        throw new TypeError("Iterator result " + e + " is not an object");
      if (!e.done) return (a.h.l = !1), e;
      var f = e.value;
    } catch (g) {
      return (a.h.i = null), va(a.h, g), Aa(a);
    }
    a.h.i = null;
    d.call(a.h, f);
    return Aa(a);
  }
  function Aa(a) {
    for (; a.h.h; )
      try {
        var b = a.i(a.h);
        if (b) return (a.h.l = !1), { value: b.value, done: !1 };
      } catch (c) {
        (a.h.A = void 0), va(a.h, c);
      }
    a.h.l = !1;
    if (a.h.j) {
      b = a.h.j;
      a.h.j = null;
      if (b.pb) throw b.exception;
      return { value: b.return, done: !0 };
    }
    return { value: void 0, done: !0 };
  }
  function Ba(a) {
    this.next = function (b) {
      ua(a.h);
      a.h.i ? (b = za(a, a.h.i.next, b, a.h.m)) : (a.h.m(b), (b = Aa(a)));
      return b;
    };
    this.throw = function (b) {
      ua(a.h);
      a.h.i ? (b = za(a, a.h.i["throw"], b, a.h.m)) : (va(a.h, b), (b = Aa(a)));
      return b;
    };
    this.return = function (b) {
      return ya(a, b);
    };
    this[t(q.Symbol, "iterator")] = function () {
      return this;
    };
  }
  function Ca(a) {
    function b(d) {
      return a.next(d);
    }
    function c(d) {
      return a.throw(d);
    }
    return new q.Promise(function (d, e) {
      function f(g) {
        g.done ? d(g.value) : q.Promise.resolve(g.value).then(b, c).then(f, e);
      }
      f(a.next());
    });
  }
  function Da(a) {
    return Ca(new Ba(new xa(a)));
  }
  function Ea() {
    for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
      b[c - a] = arguments[c];
    return b;
  }
  u(
    "Promise",
    function (a) {
      function b(g) {
        this.h = 0;
        this.j = void 0;
        this.i = [];
        this.A = !1;
        var h = this.l();
        try {
          g(h.resolve, h.reject);
        } catch (k) {
          h.reject(k);
        }
      }
      function c() {
        this.h = null;
      }
      function d(g) {
        return g instanceof b
          ? g
          : new b(function (h) {
              h(g);
            });
      }
      if (a) return a;
      c.prototype.i = function (g) {
        if (null == this.h) {
          this.h = [];
          var h = this;
          this.j(function () {
            h.m();
          });
        }
        this.h.push(g);
      };
      var e = ea.setTimeout;
      c.prototype.j = function (g) {
        e(g, 0);
      };
      c.prototype.m = function () {
        for (; this.h && this.h.length; ) {
          var g = this.h;
          this.h = [];
          for (var h = 0; h < g.length; ++h) {
            var k = g[h];
            g[h] = null;
            try {
              k();
            } catch (l) {
              this.l(l);
            }
          }
        }
        this.h = null;
      };
      c.prototype.l = function (g) {
        this.j(function () {
          throw g;
        });
      };
      b.prototype.l = function () {
        function g(l) {
          return function (m) {
            k || ((k = !0), l.call(h, m));
          };
        }
        var h = this,
          k = !1;
        return { resolve: g(this.T), reject: g(this.m) };
      };
      b.prototype.T = function (g) {
        if (g === this)
          this.m(new TypeError("A Promise cannot resolve to itself"));
        else if (g instanceof b) this.X(g);
        else {
          a: switch (typeof g) {
            case "object":
              var h = null != g;
              break a;
            case "function":
              h = !0;
              break a;
            default:
              h = !1;
          }
          h ? this.R(g) : this.v(g);
        }
      };
      b.prototype.R = function (g) {
        var h = void 0;
        try {
          h = g.then;
        } catch (k) {
          this.m(k);
          return;
        }
        "function" == typeof h ? this.ja(h, g) : this.v(g);
      };
      b.prototype.m = function (g) {
        this.B(2, g);
      };
      b.prototype.v = function (g) {
        this.B(1, g);
      };
      b.prototype.B = function (g, h) {
        if (0 != this.h)
          throw Error(
            "Cannot settle(" +
              g +
              ", " +
              h +
              "): Promise already settled in state" +
              this.h
          );
        this.h = g;
        this.j = h;
        2 === this.h && this.U();
        this.C();
      };
      b.prototype.U = function () {
        var g = this;
        e(function () {
          if (g.J()) {
            var h = ea.console;
            "undefined" !== typeof h && h.error(g.j);
          }
        }, 1);
      };
      b.prototype.J = function () {
        if (this.A) return !1;
        var g = ea.CustomEvent,
          h = ea.Event,
          k = ea.dispatchEvent;
        if ("undefined" === typeof k) return !0;
        "function" === typeof g
          ? (g = new g("unhandledrejection", { cancelable: !0 }))
          : "function" === typeof h
          ? (g = new h("unhandledrejection", { cancelable: !0 }))
          : ((g = ea.document.createEvent("CustomEvent")),
            g.initCustomEvent("unhandledrejection", !1, !0, g));
        g.promise = this;
        g.reason = this.j;
        return k(g);
      };
      b.prototype.C = function () {
        if (null != this.i) {
          for (var g = 0; g < this.i.length; ++g) f.i(this.i[g]);
          this.i = null;
        }
      };
      var f = new c();
      b.prototype.X = function (g) {
        var h = this.l();
        g.la(h.resolve, h.reject);
      };
      b.prototype.ja = function (g, h) {
        var k = this.l();
        try {
          g.call(h, k.resolve, k.reject);
        } catch (l) {
          k.reject(l);
        }
      };
      b.prototype.then = function (g, h) {
        function k(r, y) {
          return "function" == typeof r
            ? function (E) {
                try {
                  l(r(E));
                } catch (A) {
                  m(A);
                }
              }
            : y;
        }
        var l,
          m,
          p = new b(function (r, y) {
            l = r;
            m = y;
          });
        this.la(k(g, l), k(h, m));
        return p;
      };
      b.prototype.catch = function (g) {
        return this.then(void 0, g);
      };
      b.prototype.la = function (g, h) {
        function k() {
          switch (l.h) {
            case 1:
              g(l.j);
              break;
            case 2:
              h(l.j);
              break;
            default:
              throw Error("Unexpected state: " + l.h);
          }
        }
        var l = this;
        null == this.i ? f.i(k) : this.i.push(k);
        this.A = !0;
      };
      b.resolve = d;
      b.reject = function (g) {
        return new b(function (h, k) {
          k(g);
        });
      };
      b.race = function (g) {
        return new b(function (h, k) {
          for (var l = v(g), m = l.next(); !m.done; m = l.next())
            d(m.value).la(h, k);
        });
      };
      b.all = function (g) {
        var h = v(g),
          k = h.next();
        return k.done
          ? d([])
          : new b(function (l, m) {
              function p(E) {
                return function (A) {
                  r[E] = A;
                  y--;
                  0 == y && l(r);
                };
              }
              var r = [],
                y = 0;
              do
                r.push(void 0),
                  y++,
                  d(k.value).la(p(r.length - 1), m),
                  (k = h.next());
              while (!k.done);
            });
      };
      return b;
    },
    "es6"
  );
  u(
    "Array.prototype.find",
    function (a) {
      return a
        ? a
        : function (b, c) {
            a: {
              var d = this;
              d instanceof String && (d = String(d));
              for (var e = d.length, f = 0; f < e; f++) {
                var g = d[f];
                if (b.call(c, g, f, d)) {
                  b = g;
                  break a;
                }
              }
              b = void 0;
            }
            return b;
          };
    },
    "es6"
  );
  u(
    "WeakMap",
    function (a) {
      function b(g) {
        this.h = (f += Math.random() + 1).toString();
        if (g) {
          g = v(g);
          for (var h; !(h = g.next()).done; )
            (h = h.value), this.set(h[0], h[1]);
        }
      }
      function c() {}
      function d(g) {
        var h = typeof g;
        return ("object" === h && null !== g) || "function" === h;
      }
      if (
        (function () {
          if (!a || !Object.seal) return !1;
          try {
            var g = Object.seal({}),
              h = Object.seal({}),
              k = new a([
                [g, 2],
                [h, 3],
              ]);
            if (2 != k.get(g) || 3 != k.get(h)) return !1;
            k.delete(g);
            k.set(h, 4);
            return !k.has(g) && 4 == k.get(h);
          } catch (l) {
            return !1;
          }
        })()
      )
        return a;
      var e = "$jscomp_hidden_" + Math.random(),
        f = 0;
      b.prototype.set = function (g, h) {
        if (!d(g)) throw Error("Invalid WeakMap key");
        if (!la(g, e)) {
          var k = new c();
          ca(g, e, { value: k });
        }
        if (!la(g, e)) throw Error("WeakMap key fail: " + g);
        g[e][this.h] = h;
        return this;
      };
      b.prototype.get = function (g) {
        return d(g) && la(g, e) ? g[e][this.h] : void 0;
      };
      b.prototype.has = function (g) {
        return d(g) && la(g, e) && la(g[e], this.h);
      };
      b.prototype.delete = function (g) {
        return d(g) && la(g, e) && la(g[e], this.h) ? delete g[e][this.h] : !1;
      };
      return b;
    },
    "es6"
  );
  u(
    "Map",
    function (a) {
      function b() {
        var h = {};
        return (h.O = h.next = h.head = h);
      }
      function c(h, k) {
        var l = h.h;
        return ia(function () {
          if (l) {
            for (; l.head != h.h; ) l = l.O;
            for (; l.next != l.head; )
              return (l = l.next), { done: !1, value: k(l) };
            l = null;
          }
          return { done: !0, value: void 0 };
        });
      }
      function d(h, k) {
        var l = k && typeof k;
        "object" == l || "function" == l
          ? f.has(k)
            ? (l = f.get(k))
            : ((l = "" + ++g), f.set(k, l))
          : (l = "p_" + k);
        var m = h.i[l];
        if (m && la(h.i, l))
          for (h = 0; h < m.length; h++) {
            var p = m[h];
            if ((k !== k && p.key !== p.key) || k === p.key)
              return { id: l, list: m, index: h, D: p };
          }
        return { id: l, list: m, index: -1, D: void 0 };
      }
      function e(h) {
        this.i = {};
        this.h = b();
        this.size = 0;
        if (h) {
          h = v(h);
          for (var k; !(k = h.next()).done; )
            (k = k.value), this.set(k[0], k[1]);
        }
      }
      if (
        (function () {
          if (
            !a ||
            "function" != typeof a ||
            !a.prototype.entries ||
            "function" != typeof Object.seal
          )
            return !1;
          try {
            var h = Object.seal({ x: 4 }),
              k = new a(v([[h, "s"]]));
            if (
              "s" != k.get(h) ||
              1 != k.size ||
              k.get({ x: 4 }) ||
              k.set({ x: 4 }, "t") != k ||
              2 != k.size
            )
              return !1;
            var l = k.entries(),
              m = l.next();
            if (m.done || m.value[0] != h || "s" != m.value[1]) return !1;
            m = l.next();
            return m.done ||
              4 != m.value[0].x ||
              "t" != m.value[1] ||
              !l.next().done
              ? !1
              : !0;
          } catch (p) {
            return !1;
          }
        })()
      )
        return a;
      var f = new q.WeakMap();
      e.prototype.set = function (h, k) {
        h = 0 === h ? 0 : h;
        var l = d(this, h);
        l.list || (l.list = this.i[l.id] = []);
        l.D
          ? (l.D.value = k)
          : ((l.D = {
              next: this.h,
              O: this.h.O,
              head: this.h,
              key: h,
              value: k,
            }),
            l.list.push(l.D),
            (this.h.O.next = l.D),
            (this.h.O = l.D),
            this.size++);
        return this;
      };
      e.prototype.delete = function (h) {
        h = d(this, h);
        return h.D && h.list
          ? (h.list.splice(h.index, 1),
            h.list.length || delete this.i[h.id],
            (h.D.O.next = h.D.next),
            (h.D.next.O = h.D.O),
            (h.D.head = null),
            this.size--,
            !0)
          : !1;
      };
      e.prototype.clear = function () {
        this.i = {};
        this.h = this.h.O = b();
        this.size = 0;
      };
      e.prototype.has = function (h) {
        return !!d(this, h).D;
      };
      e.prototype.get = function (h) {
        return (h = d(this, h).D) && h.value;
      };
      e.prototype.entries = function () {
        return c(this, function (h) {
          return [h.key, h.value];
        });
      };
      e.prototype.keys = function () {
        return c(this, function (h) {
          return h.key;
        });
      };
      e.prototype.values = function () {
        return c(this, function (h) {
          return h.value;
        });
      };
      e.prototype.forEach = function (h, k) {
        for (var l = this.entries(), m; !(m = l.next()).done; )
          (m = m.value), h.call(k, m[1], m[0], this);
      };
      e.prototype[t(q.Symbol, "iterator")] = e.prototype.entries;
      var g = 0;
      return e;
    },
    "es6"
  );
  function Fa(a, b) {
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
    e[t(q.Symbol, "iterator")] = function () {
      return e;
    };
    return e;
  }
  u(
    "Array.prototype.keys",
    function (a) {
      return a
        ? a
        : function () {
            return Fa(this, function (b) {
              return b;
            });
          };
    },
    "es6"
  );
  u(
    "Array.prototype.values",
    function (a) {
      return a
        ? a
        : function () {
            return Fa(this, function (b, c) {
              return c;
            });
          };
    },
    "es8"
  );
  u(
    "Number.isNaN",
    function (a) {
      return a
        ? a
        : function (b) {
            return "number" === typeof b && isNaN(b);
          };
    },
    "es6"
  );
  u(
    "Set",
    function (a) {
      function b(c) {
        this.h = new q.Map();
        if (c) {
          c = v(c);
          for (var d; !(d = c.next()).done; ) this.add(d.value);
        }
        this.size = this.h.size;
      }
      if (
        (function () {
          if (
            !a ||
            "function" != typeof a ||
            !a.prototype.entries ||
            "function" != typeof Object.seal
          )
            return !1;
          try {
            var c = Object.seal({ x: 4 }),
              d = new a(v([c]));
            if (
              !d.has(c) ||
              1 != d.size ||
              d.add(c) != d ||
              1 != d.size ||
              d.add({ x: 4 }) != d ||
              2 != d.size
            )
              return !1;
            var e = d.entries(),
              f = e.next();
            if (f.done || f.value[0] != c || f.value[1] != c) return !1;
            f = e.next();
            return f.done ||
              f.value[0] == c ||
              4 != f.value[0].x ||
              f.value[1] != f.value[0]
              ? !1
              : e.next().done;
          } catch (g) {
            return !1;
          }
        })()
      )
        return a;
      b.prototype.add = function (c) {
        c = 0 === c ? 0 : c;
        this.h.set(c, c);
        this.size = this.h.size;
        return this;
      };
      b.prototype.delete = function (c) {
        c = this.h.delete(c);
        this.size = this.h.size;
        return c;
      };
      b.prototype.clear = function () {
        this.h.clear();
        this.size = 0;
      };
      b.prototype.has = function (c) {
        return this.h.has(c);
      };
      b.prototype.entries = function () {
        return this.h.entries();
      };
      b.prototype.values = function () {
        return t(this.h, "values").call(this.h);
      };
      b.prototype.keys = t(b.prototype, "values");
      b.prototype[t(q.Symbol, "iterator")] = t(b.prototype, "values");
      b.prototype.forEach = function (c, d) {
        var e = this;
        this.h.forEach(function (f) {
          return c.call(d, f, f, e);
        });
      };
      return b;
    },
    "es6"
  );
  function Ga(a, b, c) {
    if (null == a)
      throw new TypeError(
        "The 'this' value for String.prototype." +
          c +
          " must not be null or undefined"
      );
    if (b instanceof RegExp)
      throw new TypeError(
        "First argument to String.prototype." +
          c +
          " must not be a regular expression"
      );
    return a + "";
  }
  u(
    "String.prototype.startsWith",
    function (a) {
      return a
        ? a
        : function (b, c) {
            var d = Ga(this, b, "startsWith"),
              e = d.length,
              f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var g = 0; g < f && c < e; ) if (d[c++] != b[g++]) return !1;
            return g >= f;
          };
    },
    "es6"
  );
  u(
    "String.prototype.repeat",
    function (a) {
      return a
        ? a
        : function (b) {
            var c = Ga(this, null, "repeat");
            if (0 > b || 1342177279 < b)
              throw new RangeError("Invalid count value");
            b |= 0;
            for (var d = ""; b; ) if ((b & 1 && (d += c), (b >>>= 1))) c += c;
            return d;
          };
    },
    "es6"
  );
  u(
    "globalThis",
    function (a) {
      return a || ea;
    },
    "es_2020"
  );
  u(
    "Object.is",
    function (a) {
      return a
        ? a
        : function (b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
          };
    },
    "es6"
  );
  u(
    "Array.prototype.includes",
    function (a) {
      return a
        ? a
        : function (b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
              var f = d[c];
              if (f === b || t(Object, "is").call(Object, f, b)) return !0;
            }
            return !1;
          };
    },
    "es7"
  );
  u(
    "String.prototype.includes",
    function (a) {
      return a
        ? a
        : function (b, c) {
            return -1 !== Ga(this, b, "includes").indexOf(b, c || 0);
          };
    },
    "es6"
  );
  u(
    "String.prototype.padStart",
    function (a) {
      return a
        ? a
        : function (b, c) {
            var d = Ga(this, null, "padStart");
            b -= d.length;
            c = void 0 !== c ? String(c) : " ";
            return (
              (0 < b && c
                ? t(c, "repeat")
                    .call(c, Math.ceil(b / c.length))
                    .substring(0, b)
                : "") + d
            );
          };
    },
    "es8"
  );
  u(
    "Promise.prototype.finally",
    function (a) {
      return a
        ? a
        : function (b) {
            return this.then(
              function (c) {
                return q.Promise.resolve(b()).then(function () {
                  return c;
                });
              },
              function (c) {
                return q.Promise.resolve(b()).then(function () {
                  throw c;
                });
              }
            );
          };
    },
    "es9"
  );
  var x = this || self;
  function Ha(a) {
    a = a.split(".");
    for (var b = x, c = 0; c < a.length; c++)
      if (((b = b[a[c]]), null == b)) return null;
    return b;
  }
  function Ia(a) {
    var b = typeof a;
    b = "object" != b ? b : a ? (Array.isArray(a) ? "array" : b) : "null";
    return "array" == b || ("object" == b && "number" == typeof a.length);
  }
  function Ja(a) {
    var b = typeof a;
    return ("object" == b && null != a) || "function" == b;
  }
  function Ka(a) {
    return (
      (Object.prototype.hasOwnProperty.call(a, La) && a[La]) || (a[La] = ++Ma)
    );
  }
  var La = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
    Ma = 0;
  function Na(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function Oa(a, b, c) {
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
  function Pa(a, b, c) {
    Function.prototype.bind &&
    -1 != Function.prototype.bind.toString().indexOf("native code")
      ? (Pa = Na)
      : (Pa = Oa);
    return Pa.apply(null, arguments);
  }
  function Qa(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  function Ra(a, b) {
    a = a.split(".");
    var c = x;
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
  function Sa(a) {
    return a;
  }
  var Ta = new Date().getTime();
  function Ua(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
  }
  function Va(a, b) {
    var c = 0;
    a = Ua(String(a)).split(".");
    b = Ua(String(b)).split(".");
    for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
      var f = a[e] || "",
        g = b[e] || "";
      do {
        f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
        g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
        if (0 == f[0].length && 0 == g[0].length) break;
        c =
          Wa(
            0 == f[1].length ? 0 : parseInt(f[1], 10),
            0 == g[1].length ? 0 : parseInt(g[1], 10)
          ) ||
          Wa(0 == f[2].length, 0 == g[2].length) ||
          Wa(f[2], g[2]);
        f = f[3];
        g = g[3];
      } while (0 == c);
    }
    return c;
  }
  function Wa(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function Xa() {
    var a = x.navigator;
    return a && (a = a.userAgent) ? a : "";
  }
  function z(a) {
    return -1 != Xa().indexOf(a);
  }
  function Ya() {
    return z("Trident") || z("MSIE");
  }
  function Za() {
    return ((z("Chrome") || z("CriOS")) && !z("Edge")) || z("Silk");
  }
  function $a(a) {
    var b = {};
    a.forEach(function (c) {
      b[c[0]] = c[1];
    });
    return function (c) {
      return (
        b[
          t(c, "find").call(c, function (d) {
            return d in b;
          })
        ] || ""
      );
    };
  }
  function ab() {
    var a = Xa();
    if (Ya()) {
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
    for (var d; (d = c.exec(a)); ) b.push([d[1], d[2], d[3] || void 0]);
    a = $a(b);
    return z("Opera")
      ? a(["Version", "Opera"])
      : z("Edge")
      ? a(["Edge"])
      : z("Edg/")
      ? a(["Edg"])
      : z("Silk")
      ? a(["Silk"])
      : Za()
      ? a(["Chrome", "CriOS", "HeadlessChrome"])
      : ((a = b[2]) && a[1]) || "";
  }
  function bb(a, b) {
    if ("string" === typeof a)
      return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
    for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
    return -1;
  }
  function cb(a, b) {
    for (
      var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0;
      e < c;
      e++
    )
      e in d && b.call(void 0, d[e], e, a);
  }
  function db(a, b) {
    for (
      var c = a.length,
        d = [],
        e = 0,
        f = "string" === typeof a ? a.split("") : a,
        g = 0;
      g < c;
      g++
    )
      if (g in f) {
        var h = f[g];
        b.call(void 0, h, g, a) && (d[e++] = h);
      }
    return d;
  }
  function eb(a, b) {
    for (
      var c = a.length,
        d = Array(c),
        e = "string" === typeof a ? a.split("") : a,
        f = 0;
      f < c;
      f++
    )
      f in e && (d[f] = b.call(void 0, e[f], f, a));
    return d;
  }
  function fb(a, b) {
    for (
      var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0;
      e < c;
      e++
    )
      if (e in d && b.call(void 0, d[e], e, a)) return !0;
    return !1;
  }
  function gb(a, b) {
    a: {
      for (
        var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0;
        e < c;
        e++
      )
        if (e in d && b.call(void 0, d[e], e, a)) {
          b = e;
          break a;
        }
      b = -1;
    }
    return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
  }
  function hb(a, b) {
    a: {
      for (
        var c = "string" === typeof a ? a.split("") : a, d = a.length - 1;
        0 <= d;
        d--
      )
        if (d in c && b.call(void 0, c[d], d, a)) {
          b = d;
          break a;
        }
      b = -1;
    }
    return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
  }
  function ib(a, b) {
    return 0 <= bb(a, b);
  }
  function jb(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function kb(a) {
    kb[" "](a);
    return a;
  }
  kb[" "] = function () {};
  var lb = Ya();
  !z("Android") || Za();
  Za();
  !z("Safari") || Za();
  var mb = {},
    nb = null;
  function ob(a) {
    var b;
    void 0 === b && (b = 0);
    pb();
    b = mb[b];
    for (
      var c = Array(Math.floor(a.length / 3)), d = b[64] || "", e = 0, f = 0;
      e < a.length - 2;
      e += 3
    ) {
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
  function qb(a) {
    var b = [];
    rb(a, function (c) {
      b.push(c);
    });
    return b;
  }
  function rb(a, b) {
    function c(k) {
      for (; d < a.length; ) {
        var l = a.charAt(d++),
          m = nb[l];
        if (null != m) return m;
        if (!/^[\s\xa0]*$/.test(l))
          throw Error("Unknown base64 encoding at char: " + l);
      }
      return k;
    }
    pb();
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
  function pb() {
    if (!nb) {
      nb = {};
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
        mb[c] = d;
        for (var e = 0; e < d.length; e++) {
          var f = d[e];
          void 0 === nb[f] && (nb[f] = e);
        }
      }
    }
  }
  var sb = "undefined" !== typeof Uint8Array,
    tb = {};
  var ub;
  function vb(a) {
    if (tb !== tb) throw Error("illegal external caller");
    this.wa = a;
    if (null != a && 0 === a.length)
      throw Error("ByteString should be constructed with non-empty values");
  }
  vb.prototype.isEmpty = function () {
    return null == this.wa;
  };
  var wb =
    "function" === typeof q.Symbol && "symbol" === typeof (0, q.Symbol)()
      ? (0, q.Symbol)()
      : void 0;
  function xb(a, b) {
    if (wb) return (a[wb] |= b);
    if (void 0 !== a.K) return (a.K |= b);
    Object.defineProperties(a, {
      K: { value: b, configurable: !0, writable: !0, enumerable: !1 },
    });
    return b;
  }
  function yb(a, b) {
    wb ? a[wb] && (a[wb] &= ~b) : void 0 !== a.K && (a.K &= ~b);
  }
  function B(a) {
    var b;
    wb ? (b = a[wb]) : (b = a.K);
    return null == b ? 0 : b;
  }
  function zb(a, b) {
    wb
      ? (a[wb] = b)
      : void 0 !== a.K
      ? (a.K = b)
      : Object.defineProperties(a, {
          K: { value: b, configurable: !0, writable: !0, enumerable: !1 },
        });
  }
  function Ab(a) {
    xb(a, 1);
    return a;
  }
  function Bb(a) {
    return !!(B(a) & 2);
  }
  function Cb(a) {
    xb(a, 16);
    return a;
  }
  function Db(a, b) {
    zb(b, (B(a) | 18) & -41);
  }
  var Eb = {};
  function Fb(a) {
    return (
      null !== a &&
      "object" === typeof a &&
      !Array.isArray(a) &&
      a.constructor === Object
    );
  }
  var Gb,
    Hb,
    Ib = [];
  zb(Ib, 23);
  Hb = Object.freeze(Ib);
  function Jb(a) {
    if (Bb(a.s)) throw Error("Cannot mutate an immutable Message");
  }
  function Kb(a) {
    var b = a.length;
    (b = b ? a[b - 1] : void 0) && Fb(b)
      ? (b.g = 1)
      : ((b = {}), a.push(((b.g = 1), b)));
  }
  var Lb;
  function Mb(a, b) {
    Lb = b;
    a = new a(b);
    Lb = void 0;
    return a;
  }
  function Nb(a) {
    switch (typeof a) {
      case "number":
        return isFinite(a) ? a : String(a);
      case "object":
        if (a)
          if (Array.isArray(a)) {
            if (0 !== (B(a) & 128))
              return (a = Array.prototype.slice.call(a)), Kb(a), a;
          } else {
            if (sb && null != a && a instanceof Uint8Array) return ob(a);
            if (a instanceof vb) {
              var b = a.wa;
              return null == b
                ? ""
                : "string" === typeof b
                ? b
                : (a.wa = ob(b));
            }
          }
    }
    return a;
  }
  function Ob(a, b, c, d) {
    if (null != a) {
      if (Array.isArray(a)) a = Pb(a, b, c, void 0 !== d);
      else if (Fb(a)) {
        var e = {},
          f;
        for (f in a)
          Object.prototype.hasOwnProperty.call(a, f) &&
            (e[f] = Ob(a[f], b, c, d));
        a = e;
      } else a = b(a, d);
      return a;
    }
  }
  function Pb(a, b, c, d) {
    d = d ? !!(B(a) & 16) : void 0;
    for (var e = Array.prototype.slice.call(a), f = 0; f < e.length; f++)
      e[f] = Ob(e[f], b, c, d);
    c(a, e);
    return e;
  }
  function Qb(a) {
    return a.va === Eb ? a.toJSON() : Nb(a);
  }
  function Rb(a, b) {
    0 !== (B(a) & 128) && Kb(b);
  }
  function Sb(a) {
    return a.h || (a.h = a.s[a.i + a.Y] = {});
  }
  function C(a, b, c) {
    return -1 === b
      ? null
      : b >= a.i
      ? a.h
        ? a.h[b]
        : void 0
      : c && a.h && ((c = a.h[b]), null != c)
      ? c
      : a.s[b + a.Y];
  }
  function D(a, b, c, d) {
    Jb(a);
    return Tb(a, b, c, d);
  }
  function Tb(a, b, c, d) {
    a.j && (a.j = void 0);
    if (b >= a.i || d) return (Sb(a)[b] = c), a;
    a.s[b + a.Y] = c;
    (c = a.h) && b in c && delete c[b];
    return a;
  }
  function Ub(a, b, c) {
    return void 0 !== Vb(a, b, Wb(a, Xb, c));
  }
  function Yb(a, b, c, d, e) {
    var f = C(a, b, d);
    Array.isArray(f) || (f = Hb);
    var g = B(f);
    g & 1 || Ab(f);
    if (e) g & 2 || xb(f, 2), c & 1 || Object.freeze(f);
    else {
      e = !(c & 2);
      var h = g & 2;
      c & 1 || !h
        ? e && g & 16 && !h && yb(f, 16)
        : ((f = Ab(Array.prototype.slice.call(f))), Tb(a, b, f, d));
    }
    return f;
  }
  function Zb(a, b) {
    a = C(a, b);
    return null == a ? a : !!a;
  }
  function $b(a, b) {
    var c = Bb(a.s),
      d = Yb(a, b, 1, !1, c),
      e = B(d);
    if (!(e & 4)) {
      Object.isFrozen(d) && ((d = Ab(d.slice())), Tb(a, b, d, !1));
      for (var f = 0, g = 0; f < d.length; f++) {
        var h = d[f];
        null != h && (d[g++] = h);
      }
      g < f && (d.length = g);
      xb(d, 5);
    }
    c && !Object.isFrozen(d)
      ? (xb(d, 2), Object.freeze(d))
      : !c &&
        (e & 2 || Object.isFrozen(d)) &&
        ((d = Array.prototype.slice.call(d)), xb(d, 5), ac(a, b, d, !1));
    return d;
  }
  function G(a, b) {
    a = C(a, b);
    return null == a ? 0 : a;
  }
  function ac(a, b, c, d) {
    if (null == c) c = Hb;
    else {
      var e = B(c);
      1 !== (e & 1) &&
        (Object.isFrozen(c) && (c = Array.prototype.slice.call(c)),
        zb(c, e | 1));
    }
    return D(a, b, c, d);
  }
  function bc(a, b, c) {
    Jb(a);
    0 !== c ? Tb(a, b, c) : Tb(a, b, void 0, !1);
    return a;
  }
  function cc(a, b, c, d) {
    Jb(a);
    (c = dc(a, c)) && c !== b && null != d && Tb(a, c, void 0, !1);
    return Tb(a, b, d);
  }
  function Wb(a, b, c) {
    return dc(a, b) === c ? c : -1;
  }
  function dc(a, b) {
    for (var c = 0, d = 0; d < b.length; d++) {
      var e = b[d];
      null != C(a, e) && (0 !== c && Tb(a, c, void 0, !1), (c = e));
    }
    return c;
  }
  function Vb(a, b, c, d) {
    var e = C(a, c, d);
    var f = !1;
    var g =
      null == e ||
      "object" !== typeof e ||
      (f = Array.isArray(e)) ||
      e.va !== Eb
        ? f
          ? new b(e)
          : void 0
        : e;
    g !== e && null != g && (Tb(a, c, g, d), xb(g.s, B(a.s) & -33));
    return g;
  }
  function H(a, b, c) {
    var d = void 0 === d ? !1 : d;
    b = Vb(a, b, c, d);
    if (null == b) return b;
    if (!Bb(a.s)) {
      var e = ec(b);
      e !== b && ((b = e), Tb(a, c, b, d));
    }
    return b;
  }
  function fc(a, b, c, d, e) {
    a.G || (a.G = {});
    var f = a.G[c],
      g = Yb(a, c, 3, void 0, e);
    if (f)
      e ||
        (Object.isFrozen(f)
          ? d || ((f = Array.prototype.slice.call(f)), (a.G[c] = f))
          : d && Object.freeze(f));
    else {
      f = [];
      var h = !!(B(a.s) & 16),
        k = Bb(g);
      !e && k && ((g = Ab(Array.prototype.slice.call(g))), Tb(a, c, g));
      for (var l = k, m = 0; m < g.length; m++) {
        var p = g[m];
        var r = b;
        var y = h,
          E = !1;
        E = void 0 === E ? !1 : E;
        y = void 0 === y ? !1 : y;
        r = Array.isArray(p) ? new r(y ? Cb(p) : p) : E ? new r() : void 0;
        void 0 !== r && ((l = l || Bb(p)), f.push(r), k && xb(r.s, 2));
      }
      a.G[c] = f;
      a = g;
      Object.isFrozen(a) || ((b = B(a) | 33), zb(a, l ? b & -9 : b | 8));
      (e || (d && k)) && xb(f, 2);
      (e || d) && Object.freeze(f);
    }
    return f;
  }
  function I(a, b, c) {
    var d = Bb(a.s);
    b = fc(a, b, c, d, d);
    a = Yb(a, c, 3, void 0, d);
    if (!d && a && !(B(a) & 8)) {
      for (d = 0; d < b.length; d++) {
        c = b[d];
        var e = ec(c);
        c !== e && ((b[d] = e), (a[d] = b[d].s));
      }
      xb(a, 8);
    }
    return b;
  }
  function gc(a, b, c) {
    Jb(a);
    null == c && (c = void 0);
    return Tb(a, b, c);
  }
  function hc(a, b, c, d) {
    Jb(a);
    null == d && (d = void 0);
    return cc(a, b, c, d);
  }
  function ic(a, b, c, d) {
    Jb(a);
    if (null != c) {
      var e = Ab([]);
      for (var f = !1, g = 0; g < c.length; g++)
        (e[g] = c[g].s), (f = f || Bb(e[g]));
      a.G || (a.G = {});
      a.G[b] = c;
      c = e;
      f ? yb(c, 8) : xb(c, 8);
    } else a.G && (a.G[b] = void 0), (e = Hb);
    return Tb(a, b, e, d);
  }
  function jc(a, b) {
    return null == a ? b : a;
  }
  function kc(a, b) {
    return jc(C(a, b), "");
  }
  function J(a, b, c) {
    return jc(Zb(a, b), void 0 === c ? !1 : c);
  }
  function lc(a, b) {
    a = C(a, b);
    return jc(null == a ? a : +a, 0);
  }
  function mc(a, b, c, d) {
    return H(a, b, Wb(a, d, c));
  }
  function nc(a) {
    if (Bb(a) && Object.isFrozen(a)) return a;
    var b = eb(a, oc);
    zb(b, (B(a) | 18) & -41);
    Object.freeze(b);
    return b;
  }
  function pc(a, b) {
    if (null != a) {
      if (sb && a instanceof Uint8Array)
        return a.length ? new vb(new Uint8Array(a)) : ub || (ub = new vb(null));
      if (Array.isArray(a)) {
        if (Bb(a)) return a;
        b && ((b = B(a)), (b = !(b & 32) && (!!(b & 16) || 0 === b)));
        if (b) return xb(a, 2), a;
        a = Pb(a, pc, Db);
        B(a) & 4 && Object.freeze(a);
        return a;
      }
      return a.va === Eb ? oc(a) : a;
    }
  }
  function oc(a) {
    if (Bb(a.s)) return a;
    a = qc(a);
    xb(a.s, 2);
    return a;
  }
  function qc(a) {
    var b = a.s,
      c = Cb([]),
      d = a.constructor.messageId;
    d && c.push(d);
    0 !== (B(b) & 128) && Kb(c);
    c = Mb(a.constructor, c);
    a.Na && (c.Na = a.Na.slice());
    d = !!(B(b) & 16);
    for (var e = 0; e < b.length; e++) {
      var f = b[e];
      if (e === b.length - 1 && Fb(f))
        for (var g in f) {
          var h = +g;
          if (t(Number, "isNaN").call(Number, h)) Sb(c)[h] = f[h];
          else {
            var k = f[g],
              l = a.G && a.G[h];
            l ? ic(c, h, nc(l), !0) : D(c, h, pc(k, d), !0);
          }
        }
      else
        (h = e - a.Y),
          (k = a.G && a.G[h]) ? ic(c, h, nc(k), !1) : D(c, h, pc(f, d), !1);
    }
    return c;
  }
  function ec(a) {
    if (!Bb(a.s)) return a;
    var b = qc(a);
    b.j = a;
    return b;
  }
  function K(a, b, c) {
    null == a && (a = Lb);
    Lb = void 0;
    var d = this.constructor.h || 0,
      e = 0 < d,
      f = this.constructor.messageId,
      g = !1;
    if (null == a) {
      a = f ? [f] : [];
      var h = !0;
      zb(a, 48);
    } else {
      if (!Array.isArray(a)) throw Error();
      if (f && f !== a[0]) throw Error();
      var k = xb(a, 0),
        l = k;
      if ((h = 0 !== (16 & l))) (g = 0 !== (32 & l)) || (l |= 32);
      if (e)
        if (128 & l) d = 0;
        else {
          if (0 < a.length) {
            var m = a[a.length - 1];
            if (Fb(m) && "g" in m) {
              d = 0;
              l |= 128;
              delete m.g;
              var p = !0,
                r;
              for (r in m) {
                p = !1;
                break;
              }
              p && a.pop();
            }
          }
        }
      else if (128 & l) throw Error();
      k !== l && zb(a, l);
    }
    this.Y = (f ? 0 : -1) - d;
    this.G = void 0;
    this.s = a;
    a: {
      f = this.s.length;
      d = f - 1;
      if (f && ((f = this.s[d]), Fb(f))) {
        this.h = f;
        this.i = d - this.Y;
        break a;
      }
      void 0 !== b && -1 < b
        ? ((this.i = Math.max(b, d + 1 - this.Y)), (this.h = void 0))
        : (this.i = Number.MAX_VALUE);
    }
    if (!e && this.h && "g" in this.h)
      throw Error(
        'Unexpected "g" flag in sparse object of message that is not a group type.'
      );
    if (c) {
      b = h && !g && !0;
      e = this.i;
      var y;
      for (h = 0; h < c.length; h++)
        (g = c[h]),
          g < e
            ? ((g += this.Y), (d = a[g]) ? rc(d, b) : (a[g] = Hb))
            : (y || (y = Sb(this)), (d = y[g]) ? rc(d, b) : (y[g] = Hb));
    }
  }
  K.prototype.toJSON = function () {
    var a = this.s;
    return Gb ? a : Pb(a, Qb, Rb);
  };
  function sc(a, b) {
    if (null == b || "" == b) return new a();
    b = JSON.parse(b);
    if (!Array.isArray(b)) throw Error(void 0);
    return Mb(a, Cb(b));
  }
  function rc(a, b) {
    if (Array.isArray(a)) {
      var c = B(a),
        d = 1;
      !b || c & 2 || (d |= 16);
      (c & d) !== d && zb(a, c | d);
    }
  }
  K.prototype.va = Eb;
  function tc(a, b) {
    return Nb(b);
  }
  function uc(a) {
    return null !== a && void 0 !== a;
  }
  var vc = void 0;
  function wc(a, b) {
    var c = vc;
    vc = void 0;
    if (!b(a)) throw ((b = c ? c() + "\n" : ""), Error(b + String(a)));
  }
  function xc(a) {
    K.call(this, a, -1, yc);
  }
  w(xc, K);
  function zc(a) {
    K.call(this, a);
  }
  w(zc, K);
  var yc = [2, 3];
  function Ac(a, b) {
    this.i = (a === Bc && b) || "";
    this.h = Cc;
  }
  var Cc = {},
    Bc = {};
  function Dc(a) {
    return function () {
      return !a.apply(this, arguments);
    };
  }
  function Ec(a) {
    var b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  }
  function Fc(a) {
    var b = a;
    return function () {
      if (b) {
        var c = b;
        b = null;
        c();
      }
    };
  }
  function Gc(a, b, c) {
    a.addEventListener && a.addEventListener(b, c, !1);
  }
  function Hc(a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1);
  }
  function Ic(a, b) {
    var c = {},
      d;
    for (d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
    return c;
  }
  function Jc(a, b) {
    for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
    return !1;
  }
  function Kc(a) {
    var b = [],
      c = 0,
      d;
    for (d in a) b[c++] = a[d];
    return b;
  }
  function Lc(a) {
    var b = {},
      c;
    for (c in a) b[c] = a[c];
    return b;
  }
  var Mc;
  function Nc() {
    if (void 0 === Mc) {
      var a = null,
        b = x.trustedTypes;
      if (b && b.createPolicy) {
        try {
          a = b.createPolicy("goog#html", {
            createHTML: Sa,
            createScript: Sa,
            createScriptURL: Sa,
          });
        } catch (c) {
          x.console && x.console.error(c.message);
        }
        Mc = a;
      } else Mc = a;
    }
    return Mc;
  }
  var Oc = {};
  function Pc(a, b) {
    this.h = b === Oc ? a : "";
  }
  Pc.prototype.toString = function () {
    return this.h.toString();
  };
  function Qc(a, b) {
    this.h = b === Rc ? a : "";
  }
  Qc.prototype.toString = function () {
    return this.h + "";
  };
  function Sc(a, b) {
    a = Tc.exec(Uc(a).toString());
    var c = a[3] || "";
    return Vc(a[1] + Wc("?", a[2] || "", b) + Wc("#", c));
  }
  function Uc(a) {
    return a instanceof Qc && a.constructor === Qc
      ? a.h
      : "type_error:TrustedResourceUrl";
  }
  var Tc = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/,
    Rc = {};
  function Vc(a) {
    var b = Nc();
    a = b ? b.createScriptURL(a) : a;
    return new Qc(a, Rc);
  }
  function Wc(a, b, c) {
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
  function Xc(a) {
    return String(a).replace(/\-([a-z])/g, function (b, c) {
      return c.toUpperCase();
    });
  }
  function Yc(a, b, c) {
    function d(h) {
      h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h);
    }
    for (var e = 1; e < c.length; e++) {
      var f = c[e];
      if (!Ia(f) || (Ja(f) && 0 < f.nodeType)) d(f);
      else {
        a: {
          if (f && "number" == typeof f.length) {
            if (Ja(f)) {
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
        cb(g ? jb(f) : f, d);
      }
    }
  }
  function Zc(a) {
    this.h = a || x.document || document;
  }
  n = Zc.prototype;
  n.getElementsByTagName = function (a, b) {
    return (b || this.h).getElementsByTagName(String(a));
  };
  n.createElement = function (a) {
    var b = this.h;
    a = String(a);
    "application/xhtml+xml" === b.contentType && (a = a.toLowerCase());
    return b.createElement(a);
  };
  n.createTextNode = function (a) {
    return this.h.createTextNode(String(a));
  };
  n.append = function (a, b) {
    Yc(9 == a.nodeType ? a : a.ownerDocument || a.document, a, arguments);
  };
  n.contains = function (a, b) {
    if (!a || !b) return !1;
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition)
      return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b; ) b = b.parentNode;
    return b == a;
  };
  function $c() {
    return !ad() && (z("iPod") || z("iPhone") || z("Android") || z("IEMobile"));
  }
  function ad() {
    return z("iPad") || (z("Android") && !z("Mobile")) || z("Silk");
  }
  var bd = RegExp(
      "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
    ),
    cd = /#|$/;
  function dd(a, b) {
    var c = a.search(cd);
    a: {
      var d = 0;
      for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c; ) {
        var f = a.charCodeAt(d - 1);
        if (38 == f || 63 == f)
          if (((f = a.charCodeAt(d + e)), !f || 61 == f || 38 == f || 35 == f))
            break a;
        d += e + 1;
      }
      d = -1;
    }
    if (0 > d) return null;
    e = a.indexOf("&", d);
    if (0 > e || e > c) e = c;
    d += b.length + 1;
    return decodeURIComponent(a.slice(d, -1 !== e ? e : 0).replace(/\+/g, " "));
  } /* 
 
 SPDX-License-Identifier: Apache-2.0 
*/
  function ed(a) {
    try {
      var b;
      if ((b = !!a && null != a.location.href))
        a: {
          try {
            kb(a.foo);
            b = !0;
            break a;
          } catch (c) {}
          b = !1;
        }
      return b;
    } catch (c) {
      return !1;
    }
  }
  function fd(a) {
    return ed(a.top) ? a.top : null;
  }
  function gd(a, b) {
    var c = id("SCRIPT", a);
    c.src = Uc(b);
    var d, e;
    (d = (b =
      null ==
      (e = (d = ((c.ownerDocument && c.ownerDocument.defaultView) || window)
        .document).querySelector)
        ? void 0
        : e.call(d, "script[nonce]"))
      ? b.nonce || b.getAttribute("nonce") || ""
      : "") && c.setAttribute("nonce", d);
    return (a = a.getElementsByTagName("script")[0]) && a.parentNode
      ? (a.parentNode.insertBefore(c, a), c)
      : null;
  }
  function jd(a, b) {
    return b.getComputedStyle ? b.getComputedStyle(a, null) : a.currentStyle;
  }
  function kd(a, b) {
    if (!ld() && !md()) {
      var c = Math.random();
      if (c < b) return (c = nd()), a[Math.floor(c * a.length)];
    }
    return null;
  }
  function nd() {
    if (!q.globalThis.crypto) return Math.random();
    try {
      var a = new Uint32Array(1);
      q.globalThis.crypto.getRandomValues(a);
      return a[0] / 65536 / 65536;
    } catch (b) {
      return Math.random();
    }
  }
  function od(a, b) {
    if (a)
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
  }
  function pd(a) {
    var b = a.length;
    if (0 == b) return 0;
    for (var c = 305419896, d = 0; d < b; d++)
      c ^= ((c << 5) + (c >> 2) + a.charCodeAt(d)) & 4294967295;
    return 0 < c ? c : 4294967296 + c;
  }
  var md = Ec(function () {
      return (
        fb(
          [
            "Google Web Preview",
            "Mediapartners-Google",
            "Google-Read-Aloud",
            "Google-Adwords",
          ],
          qd
        ) || 1e-4 > Math.random()
      );
    }),
    ld = Ec(function () {
      return qd("MSIE");
    });
  function qd(a) {
    return -1 != Xa().indexOf(a);
  }
  var rd = /^([0-9.]+)px$/,
    sd = /^(-?[0-9.]{1,30})$/;
  function td(a) {
    if (!sd.test(a)) return null;
    a = Number(a);
    return isNaN(a) ? null : a;
  }
  function L(a) {
    return (a = rd.exec(a)) ? +a[1] : null;
  }
  function ud(a, b) {
    for (var c = 0; 50 > c; ++c) {
      try {
        var d = !(!a.frames || !a.frames[b]);
      } catch (g) {
        d = !1;
      }
      if (d) return a;
      a: {
        try {
          var e = a.parent;
          if (e && e != a) {
            var f = e;
            break a;
          }
        } catch (g) {}
        f = null;
      }
      if (!(a = f)) break;
    }
    return null;
  }
  var vd = Ec(function () {
    return $c() ? 2 : ad() ? 1 : 0;
  });
  function wd(a, b) {
    od(b, function (c, d) {
      a.style.setProperty(d, c, "important");
    });
  }
  var xd = [];
  function yd() {
    var a = xd;
    xd = [];
    a = v(a);
    for (var b = a.next(); !b.done; b = a.next()) {
      b = b.value;
      try {
        b();
      } catch (c) {}
    }
  }
  function zd(a, b) {
    if (a.length && b.head) {
      a = v(a);
      for (var c = a.next(); !c.done; c = a.next())
        if ((c = c.value) && b.head) {
          var d = id("META");
          b.head.appendChild(d);
          d.httpEquiv = "origin-trial";
          d.content = c;
        }
    }
  }
  function Ad(a) {
    if ("number" !== typeof a.goog_pvsid)
      try {
        Object.defineProperty(a, "goog_pvsid", {
          value: Math.floor(Math.random() * Math.pow(2, 52)),
          configurable: !1,
        });
      } catch (b) {}
    return Number(a.goog_pvsid) || -1;
  }
  function Bd(a) {
    var b = Cd;
    "complete" === b.readyState || "interactive" === b.readyState
      ? (xd.push(a),
        1 == xd.length &&
          (q.Promise
            ? q.Promise.resolve().then(yd)
            : window.setImmediate
            ? setImmediate(yd)
            : setTimeout(yd, 0)))
      : b.addEventListener("DOMContentLoaded", a);
  }
  function id(a, b) {
    b = void 0 === b ? document : b;
    return b.createElement(String(a).toLowerCase());
  }
  var Dd = null;
  var Cd = document,
    M = window;
  var Ed = null;
  function Fd(a, b) {
    b = void 0 === b ? [] : b;
    var c = !1;
    x.google_logging_queue || ((c = !0), (x.google_logging_queue = []));
    x.google_logging_queue.push([a, b]);
    if ((a = c)) {
      if (null == Ed) {
        Ed = !1;
        try {
          var d = fd(x);
          d && -1 !== d.location.hash.indexOf("google_logging") && (Ed = !0);
          x.localStorage.getItem("google_logging") && (Ed = !0);
        } catch (e) {}
      }
      a = Ed;
    }
    a &&
      ((d = x.document),
      (a = new Ac(
        Bc,
        "https://pagead2.googlesyndication.com/pagead/js/logging_library.js"
      )),
      (a = Vc(
        a instanceof Ac && a.constructor === Ac && a.h === Cc
          ? a.i
          : "type_error:Const"
      )),
      gd(d, a));
  }
  function Gd(a) {
    a = void 0 === a ? x : a;
    var b = a.context || a.AMP_CONTEXT_DATA;
    if (!b)
      try {
        b = a.parent.context || a.parent.AMP_CONTEXT_DATA;
      } catch (e) {}
    var c, d;
    return (null == (c = b) ? 0 : c.pageViewId) &&
      (null == (d = b) ? 0 : d.canonicalUrl)
      ? b
      : null;
  }
  function Hd(a) {
    return (a = void 0 === a ? Gd() : a)
      ? ed(a.master)
        ? a.master
        : null
      : null;
  }
  function Id(a) {
    var b = Ea.apply(1, arguments);
    if (0 === b.length) return Vc(a[0]);
    for (var c = [a[0]], d = 0; d < b.length; d++)
      c.push(encodeURIComponent(b[d])), c.push(a[d + 1]);
    return Vc(c.join(""));
  }
  function Jd(a) {
    var b = void 0 === b ? 1 : b;
    a = Hd(Gd(a)) || a;
    a.google_unique_id = (a.google_unique_id || 0) + b;
    return a.google_unique_id;
  }
  function Kd(a) {
    a = a.google_unique_id;
    return "number" === typeof a ? a : 0;
  }
  function Ld() {
    var a = void 0 === a ? M : a;
    if (!a) return !1;
    try {
      return !(!a.navigator.standalone && !a.top.navigator.standalone);
    } catch (b) {
      return !1;
    }
  }
  function Md(a) {
    if (!a) return "";
    a = a.toLowerCase();
    "ca-" != a.substring(0, 3) && (a = "ca-" + a);
    return a;
  }
  var Nd = {
    Pb: 0,
    Ob: 1,
    Lb: 2,
    Gb: 3,
    Mb: 4,
    Hb: 5,
    Nb: 6,
    Jb: 7,
    Kb: 8,
    Fb: 9,
    Ib: 10,
  };
  var Od = { Rb: 0, Sb: 1, Qb: 2 };
  function Pd() {
    this.i = new Qd(this);
    this.h = 0;
  }
  Pd.prototype.resolve = function (a) {
    Rd(this);
    this.h = 1;
    this.l = a;
    Sd(this.i);
  };
  Pd.prototype.reject = function (a) {
    Rd(this);
    this.h = 2;
    this.j = a;
    Sd(this.i);
  };
  function Rd(a) {
    if (0 != a.h) throw Error("Already resolved/rejected.");
  }
  function Qd(a) {
    this.h = a;
  }
  Qd.prototype.then = function (a, b) {
    if (this.i) throw Error("Then functions already set.");
    this.i = a;
    this.j = b;
    Sd(this);
  };
  function Sd(a) {
    switch (a.h.h) {
      case 0:
        break;
      case 1:
        a.i && a.i(a.h.l);
        break;
      case 2:
        a.j && a.j(a.h.j);
        break;
      default:
        throw Error("Unhandled deferred state.");
    }
  }
  function Td(a) {
    this.h = a.slice(0);
  }
  n = Td.prototype;
  n.forEach = function (a) {
    var b = this;
    this.h.forEach(function (c, d) {
      return void a(c, d, b);
    });
  };
  n.filter = function (a) {
    return new Td(db(this.h, a));
  };
  n.apply = function (a) {
    return new Td(a(this.h.slice(0)));
  };
  n.sort = function (a) {
    return new Td(this.h.slice(0).sort(a));
  };
  n.get = function (a) {
    return this.h[a];
  };
  n.add = function (a) {
    var b = this.h.slice(0);
    b.push(a);
    return new Td(b);
  };
  function Ud(a, b) {
    for (var c = [], d = a.length, e = 0; e < d; e++) c.push(a[e]);
    c.forEach(b, void 0);
  }
  function Vd() {
    this.h = {};
    this.i = {};
  }
  Vd.prototype.set = function (a, b) {
    var c = Wd(a);
    this.h[c] = b;
    this.i[c] = a;
  };
  Vd.prototype.get = function (a, b) {
    a = Wd(a);
    return void 0 !== this.h[a] ? this.h[a] : b;
  };
  Vd.prototype.clear = function () {
    this.h = {};
    this.i = {};
  };
  function Wd(a) {
    return a instanceof Object ? String(Ka(a)) : a + "";
  }
  function Xd(a, b) {
    this.h = a;
    this.i = b;
  }
  function Yd(a) {
    return null != a.h ? a.h.value : null;
  }
  function Zd(a, b) {
    null != a.h && b(a.h.value);
    return a;
  }
  Xd.prototype.map = function (a) {
    return null != this.h
      ? ((a = a(this.h.value)), a instanceof Xd ? a : $d(a))
      : this;
  };
  function ae(a, b) {
    null != a.h || b(a.i);
    return a;
  }
  function $d(a) {
    return new Xd({ value: a }, null);
  }
  function be(a) {
    return new Xd(null, a);
  }
  function ce(a) {
    try {
      return $d(a());
    } catch (b) {
      return be(b);
    }
  }
  function de(a) {
    this.h = new Vd();
    if (a) for (var b = 0; b < a.length; ++b) this.add(a[b]);
  }
  de.prototype.add = function (a) {
    this.h.set(a, !0);
  };
  de.prototype.contains = function (a) {
    return void 0 !== this.h.h[Wd(a)];
  };
  function ee() {
    this.h = new Vd();
  }
  ee.prototype.set = function (a, b) {
    var c = this.h.get(a);
    c || ((c = new de()), this.h.set(a, c));
    c.add(b);
  };
  function N(a) {
    K.call(this, a, -1, fe);
  }
  w(N, K);
  N.prototype.getId = function () {
    return C(this, 3);
  };
  var fe = [4];
  function ge(a) {
    var b = void 0 === a.Ja ? void 0 : a.Ja,
      c = void 0 === a.nb ? void 0 : a.nb,
      d = void 0 === a.Ua ? void 0 : a.Ua;
    this.h = void 0 === a.gb ? void 0 : a.gb;
    this.l = new Td(b || []);
    this.j = d;
    this.i = c;
  }
  function he(a) {
    var b = [],
      c = a.l;
    c && c.h.length && b.push({ aa: "a", fa: ie(c) });
    null != a.h && b.push({ aa: "as", fa: a.h });
    null != a.i && b.push({ aa: "i", fa: String(a.i) });
    null != a.j && b.push({ aa: "rp", fa: String(a.j) });
    b.sort(function (d, e) {
      return d.aa.localeCompare(e.aa);
    });
    b.unshift({ aa: "t", fa: "aa" });
    return b;
  }
  function ie(a) {
    a = a.h.slice(0).map(je);
    a = JSON.stringify(a);
    return pd(a);
  }
  function je(a) {
    var b = {};
    null != C(a, 7) && (b.q = C(a, 7));
    null != C(a, 2, !1) && (b.o = C(a, 2));
    null != C(a, 5, !1) && (b.p = C(a, 5));
    return b;
  }
  function ke(a) {
    K.call(this, a);
  }
  w(ke, K);
  ke.prototype.setLocation = function (a) {
    return D(this, 1, a);
  };
  function le(a, b) {
    this.La = a;
    this.Ta = b;
  }
  function me(a) {
    var b = [].slice.call(arguments).filter(
      Dc(function (e) {
        return null === e;
      })
    );
    if (!b.length) return null;
    var c = [],
      d = {};
    b.forEach(function (e) {
      c = c.concat(e.La || []);
      d = t(Object, "assign").call(Object, d, e.Ta);
    });
    return new le(c, d);
  }
  function ne(a) {
    switch (a) {
      case 1:
        return new le(null, { google_ad_semantic_area: "mc" });
      case 2:
        return new le(null, { google_ad_semantic_area: "h" });
      case 3:
        return new le(null, { google_ad_semantic_area: "f" });
      case 4:
        return new le(null, { google_ad_semantic_area: "s" });
      default:
        return null;
    }
  }
  function oe(a) {
    if (null == a) a = null;
    else {
      var b = he(a);
      a = [];
      b = v(b);
      for (var c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        var d = String(c.fa);
        a.push(c.aa + "." + (20 >= d.length ? d : d.slice(0, 19) + "_"));
      }
      a = new le(null, { google_placement_id: a.join("~") });
    }
    return a;
  }
  var pe = {},
    qe = new le(
      ["google-auto-placed"],
      ((pe.google_reactive_ad_format = 40), (pe.google_tag_origin = "qs"), pe)
    );
  function re(a, b, c) {
    a.google_image_requests || (a.google_image_requests = []);
    var d = id("IMG", a.document);
    if (c) {
      var e = function () {
        if (c) {
          var f = a.google_image_requests,
            g = bb(f, d);
          0 <= g && Array.prototype.splice.call(f, g, 1);
        }
        Hc(d, "load", e);
        Hc(d, "error", e);
      };
      Gc(d, "load", e);
      Gc(d, "error", e);
    }
    d.src = b;
    a.google_image_requests.push(d);
  }
  function se(a, b) {
    var c = void 0 === c ? !1 : c;
    var d = "https://pagead2.googlesyndication.com/pagead/gen_204?id=" + b;
    od(a, function (e, f) {
      e && (d += "&" + f + "=" + encodeURIComponent(e));
    });
    te(d, c);
  }
  function te(a, b) {
    var c = window;
    b = void 0 === b ? !1 : b;
    c.fetch
      ? c.fetch(a, {
          keepalive: !0,
          credentials: "include",
          redirect: "follow",
          method: "get",
          mode: "no-cors",
        })
      : re(c, a, void 0 === b ? !1 : b);
  }
  function ue() {
    this.j = "&";
    this.i = {};
    this.l = 0;
    this.h = [];
  }
  function ve(a, b) {
    var c = {};
    c[a] = b;
    return [c];
  }
  function we(a, b, c, d, e) {
    var f = [];
    od(a, function (g, h) {
      (g = xe(g, b, c, d, e)) && f.push(h + "=" + g);
    });
    return f.join(b);
  }
  function xe(a, b, c, d, e) {
    if (null == a) return "";
    b = b || "&";
    c = c || ",$";
    "string" == typeof c && (c = c.split(""));
    if (a instanceof Array) {
      if (((d = d || 0), d < c.length)) {
        for (var f = [], g = 0; g < a.length; g++)
          f.push(xe(a[g], b, c, d + 1, e));
        return f.join(c[d]);
      }
    } else if ("object" == typeof a)
      return (
        (e = e || 0), 2 > e ? encodeURIComponent(we(a, b, c, d, e + 1)) : "..."
      );
    return encodeURIComponent(String(a));
  }
  function ye(a, b) {
    var c = "https://pagead2.googlesyndication.com" + b,
      d = ze(a) - b.length;
    if (0 > d) return "";
    a.h.sort(function (m, p) {
      return m - p;
    });
    b = null;
    for (var e = "", f = 0; f < a.h.length; f++)
      for (var g = a.h[f], h = a.i[g], k = 0; k < h.length; k++) {
        if (!d) {
          b = null == b ? g : b;
          break;
        }
        var l = we(h[k], a.j, ",$");
        if (l) {
          l = e + l;
          if (d >= l.length) {
            d -= l.length;
            c += l;
            e = a.j;
            break;
          }
          b = null == b ? g : b;
        }
      }
    a = "";
    null != b && (a = e + "trn=" + b);
    return c + a;
  }
  function ze(a) {
    var b = 1,
      c;
    for (c in a.i) b = c.length > b ? c.length : b;
    return 3997 - b - a.j.length - 1;
  }
  function Ae() {
    this.h = Math.random();
  }
  function Be() {
    var a = Ce,
      b = x.google_srt;
    0 <= b && 1 >= b && (a.h = b);
  }
  function De(a, b, c, d, e) {
    if (((void 0 === d ? 0 : d) ? a.h : Math.random()) < (e || 0.01))
      try {
        if (c instanceof ue) var f = c;
        else
          (f = new ue()),
            od(c, function (h, k) {
              var l = f,
                m = l.l++;
              h = ve(k, h);
              l.h.push(m);
              l.i[m] = h;
            });
        var g = ye(f, "/pagead/gen_204?id=" + b + "&");
        g && re(x, g, !1);
      } catch (h) {}
  }
  var Ee = {
    overlays: 1,
    interstitials: 2,
    vignettes: 2,
    inserts: 3,
    immersives: 4,
    list_view: 5,
    full_page: 6,
    side_rails: 7,
  };
  function Fe() {
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
    this.floatingAdsStacking = new Ge();
    this.sideRailProcessedFixedElements = new q.Set();
    this.sideRailAvailableSpace = new q.Map();
  }
  function He(a) {
    a.google_reactive_ads_global_state
      ? (null ==
          a.google_reactive_ads_global_state.sideRailProcessedFixedElements &&
          (a.google_reactive_ads_global_state.sideRailProcessedFixedElements =
            new q.Set()),
        null == a.google_reactive_ads_global_state.sideRailAvailableSpace &&
          (a.google_reactive_ads_global_state.sideRailAvailableSpace =
            new q.Map()))
      : (a.google_reactive_ads_global_state = new Fe());
    return a.google_reactive_ads_global_state;
  }
  function Ge() {
    this.maxZIndexRestrictions = {};
    this.nextRestrictionId = 0;
    this.maxZIndexListeners = [];
  }
  function Ie(a) {
    a = a.document;
    var b = {};
    a && (b = "CSS1Compat" == a.compatMode ? a.documentElement : a.body);
    return b || {};
  }
  function Je(a) {
    return Ie(a).clientWidth;
  }
  function Ke(a) {
    a = a.getBoundingClientRect();
    return 0 < a.width && 0 < a.height;
  }
  function Le(a) {
    var b = 0;
    a.forEach(function (c) {
      return (b = Math.max(b, c.getBoundingClientRect().width));
    });
    return function (c) {
      return c.getBoundingClientRect().width > 0.5 * b;
    };
  }
  function Me(a) {
    var b = Ie(a).clientHeight || 0;
    return function (c) {
      return c.getBoundingClientRect().height >= 0.75 * b;
    };
  }
  function Ne(a, b) {
    return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
  }
  function Oe(a) {
    K.call(this, a);
  }
  w(Oe, K);
  function Pe(a) {
    K.call(this, a);
  }
  w(Pe, K);
  function Qe(a) {
    K.call(this, a, -1, Re);
  }
  w(Qe, K);
  function Se(a) {
    K.call(this, a);
  }
  w(Se, K);
  var Re = [1];
  function Te(a) {
    K.call(this, a, -1, We);
  }
  w(Te, K);
  function Xe(a) {
    K.call(this, a);
  }
  w(Xe, K);
  var We = [1];
  function Ye(a) {
    K.call(this, a);
  }
  w(Ye, K);
  function Ze(a) {
    K.call(this, a);
  }
  w(Ze, K);
  function $e(a) {
    K.call(this, a, -1, af);
  }
  w($e, K);
  var af = [6, 7, 9, 10, 11];
  function bf(a, b, c, d) {
    this.l = a;
    this.i = b;
    this.j = c;
    this.h = d;
  }
  bf.prototype.query = function (a) {
    var b = [];
    try {
      b = a.querySelectorAll(this.l);
    } catch (f) {}
    if (!b.length) return [];
    a = jb(b);
    a = cf(this, a);
    "number" === typeof this.i &&
      ((b = this.i),
      0 > b && (b += a.length),
      (a = 0 <= b && b < a.length ? [a[b]] : []));
    if ("number" === typeof this.j) {
      b = [];
      for (var c = 0; c < a.length; c++) {
        var d = df(a[c]),
          e = this.j;
        0 > e && (e += d.length);
        0 <= e && e < d.length && b.push(d[e]);
      }
      a = b;
    }
    return a;
  };
  bf.prototype.toString = function () {
    return JSON.stringify({
      nativeQuery: this.l,
      occurrenceIndex: this.i,
      paragraphIndex: this.j,
      ignoreMode: this.h,
    });
  };
  function cf(a, b) {
    if (null == a.h) return b;
    switch (a.h) {
      case 1:
        return b.slice(1);
      case 2:
        return b.slice(0, b.length - 1);
      case 3:
        return b.slice(1, b.length - 1);
      case 0:
        return b;
      default:
        throw Error("Unknown ignore mode: " + a.h);
    }
  }
  function df(a) {
    var b = [];
    Ud(a.getElementsByTagName("p"), function (c) {
      100 <= ef(c) && b.push(c);
    });
    return b;
  }
  function ef(a) {
    if (3 == a.nodeType) return a.length;
    if (1 != a.nodeType || "SCRIPT" == a.tagName) return 0;
    var b = 0;
    Ud(a.childNodes, function (c) {
      b += ef(c);
    });
    return b;
  }
  function ff(a) {
    return 0 == a.length || isNaN(a[0])
      ? a
      : "\\" + (30 + parseInt(a[0], 10)) + " " + a.substring(1);
  }
  function gf(a) {
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
  function O(a, b) {
    this.h = a;
    this.defaultValue = void 0 === b ? !1 : b;
  }
  function hf(a, b) {
    this.h = a;
    this.defaultValue = void 0 === b ? 0 : b;
  }
  function jf(a, b) {
    b = void 0 === b ? [] : b;
    this.h = a;
    this.defaultValue = b;
  }
  var kf = new O(1082, !0),
    lf = new O(1214),
    mf = new hf(1130, 100),
    nf = new (function (a, b) {
      this.h = a;
      this.defaultValue = void 0 === b ? "" : b;
    })(14),
    of = new O(316),
    pf = new O(1207),
    qf = new O(313),
    rf = new O(369),
    sf = new O(1171),
    tf = new O(1201, !0),
    uf = new O(217),
    vf = new O(1211, !0),
    wf = new O(1198, !0),
    xf = new O(1206, !0),
    yf = new O(1216),
    zf = new O(1215),
    Af = new O(1086),
    Bf = new hf(1079, 5),
    Cf = new jf(1934, [
      "Az6AfRvI8mo7yiW5fLfj04W21t0ig6aMsGYpIqMTaX60H+b0DkO1uDr+7BrzMcimWzv/X7SXR8jI+uvbV0IJlwYAAACFeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==",
      "A+USTya+tNvDPaxUgJooz+LaVk5hPoAxpLvSxjogX4Mk8awCTQ9iop6zJ9d5ldgU7WmHqBlnQB41LHHRFxoaBwoAAACLeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==",
      "A7FovoGr67TUBYbnY+Z0IKoJbbmRmB8fCyirUGHavNDtD91CiGyHHSA2hDG9r9T3NjUKFi6egL3RbgTwhhcVDwUAAACLeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==",
    ]),
    Df = new O(203),
    Ef = new O(84),
    Ff = new O(1162),
    Gf = new O(1120),
    Hf = new hf(1114, 1),
    If = new hf(1110, 5),
    Jf = new hf(1111, 5),
    Kf = new hf(1112, 5),
    Lf = new hf(1113, 5),
    Mf = new hf(1104),
    Nf = new hf(1108),
    Of = new hf(1106),
    Pf = new hf(1107),
    Qf = new hf(1105),
    Rf = new O(480632076),
    Sf = new hf(1115, -1),
    Tf = new O(1121),
    Uf = new O(1928),
    Vf = new O(1941),
    Wf = new O(370946349),
    Xf = new O(392736476),
    Yf = new hf(406149835),
    Zf = new jf(1932),
    $f = new hf(1935);
  function P(a) {
    var b = "ua";
    if (a.ua && a.hasOwnProperty(b)) return a.ua;
    b = new a();
    return (a.ua = b);
  }
  function ag() {
    var a = {};
    this.i = function (b, c) {
      return null != a[b] ? a[b] : c;
    };
    this.j = function (b, c) {
      return null != a[b] ? a[b] : c;
    };
    this.l = function (b, c) {
      return null != a[b] ? a[b] : c;
    };
    this.h = function (b, c) {
      return null != a[b] ? a[b] : c;
    };
    this.m = function () {};
  }
  function Q(a) {
    return P(ag).i(a.h, a.defaultValue);
  }
  function bg(a) {
    return P(ag).j(a.h, a.defaultValue);
  }
  function cg() {
    return P(ag).l(nf.h, nf.defaultValue);
  }
  function dg(a, b, c) {
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
    gf(b) &&
      (b.setAttribute("data-init-display", b.style.display),
      (b.style.display = "block"));
  }
  function eg(a, b, c) {
    function d(f) {
      f = fg(f);
      return null == f ? !1 : c > f;
    }
    function e(f) {
      f = fg(f);
      return null == f ? !1 : c < f;
    }
    switch (b) {
      case 0:
        return {
          init: gg(a.previousSibling, e),
          ma: function (f) {
            return gg(f.previousSibling, e);
          },
          pa: 0,
        };
      case 2:
        return {
          init: gg(a.lastChild, e),
          ma: function (f) {
            return gg(f.previousSibling, e);
          },
          pa: 0,
        };
      case 3:
        return {
          init: gg(a.nextSibling, d),
          ma: function (f) {
            return gg(f.nextSibling, d);
          },
          pa: 3,
        };
      case 1:
        return {
          init: gg(a.firstChild, d),
          ma: function (f) {
            return gg(f.nextSibling, d);
          },
          pa: 3,
        };
    }
    throw Error("Un-handled RelativePosition: " + b);
  }
  function fg(a) {
    return a.hasOwnProperty("google-ama-order-assurance")
      ? a["google-ama-order-assurance"]
      : null;
  }
  function gg(a, b) {
    return a && b(a) ? a : null;
  }
  var hg = { rectangle: 1, horizontal: 2, vertical: 4 };
  function ig(a) {
    return "string" === typeof a;
  }
  function jg(a) {
    return void 0 === a;
  }
  function kg(a) {
    K.call(this, a, -1, lg);
  }
  w(kg, K);
  var lg = [2, 8],
    mg = [3, 4, 5],
    ng = [6, 7];
  var og;
  og = { Tb: 0, bb: 3, cb: 4, eb: 5 };
  var pg = og.bb,
    qg = og.cb,
    rg = og.eb;
  function sg(a) {
    return null != a ? !a : a;
  }
  function tg(a, b) {
    for (var c = !1, d = 0; d < a.length; d++) {
      var e = a[d]();
      if (e === b) return e;
      null == e && (c = !0);
    }
    if (!c) return !b;
  }
  function ug(a, b) {
    var c = I(a, kg, 2);
    if (!c.length) return vg(a, b);
    a = G(a, 1);
    if (1 === a) return sg(ug(c[0], b));
    c = eb(c, function (d) {
      return function () {
        return ug(d, b);
      };
    });
    switch (a) {
      case 2:
        return tg(c, !1);
      case 3:
        return tg(c, !0);
    }
  }
  function vg(a, b) {
    var c = dc(a, mg);
    a: {
      switch (c) {
        case pg:
          var d = G(a, Wb(a, mg, 3));
          break a;
        case qg:
          d = G(a, Wb(a, mg, 4));
          break a;
        case rg:
          d = G(a, Wb(a, mg, 5));
          break a;
      }
      d = void 0;
    }
    if (d && (b = (b = b[c]) && b[d])) {
      try {
        var e = b.apply(null, ka($b(a, 8)));
      } catch (f) {
        return;
      }
      b = G(a, 1);
      if (4 === b) return !!e;
      d = null != e;
      if (5 === b) return d;
      if (12 === b) a = kc(a, Wb(a, ng, 7));
      else
        a: {
          switch (c) {
            case qg:
              a = lc(a, Wb(a, ng, 6));
              break a;
            case rg:
              a = kc(a, Wb(a, ng, 7));
              break a;
          }
          a = void 0;
        }
      if (null != a) {
        if (6 === b) return e === a;
        if (9 === b) return null != e && 0 === Va(String(e), a);
        if (d)
          switch (b) {
            case 7:
              return e < a;
            case 8:
              return e > a;
            case 12:
              return ig(a) && ig(e) && new RegExp(a).test(e);
            case 10:
              return null != e && -1 === Va(String(e), a);
            case 11:
              return null != e && 1 === Va(String(e), a);
          }
      }
    }
  }
  function wg(a, b) {
    return !a || !(!b || !ug(a, b));
  }
  function xg(a) {
    K.call(this, a, -1, yg);
  }
  w(xg, K);
  var yg = [4];
  function zg(a) {
    K.call(this, a);
  }
  w(zg, K);
  function Ag(a) {
    K.call(this, a, -1, Bg);
  }
  w(Ag, K);
  var Bg = [5],
    Cg = [1, 2, 3, 6, 7];
  function Dg(a) {
    K.call(this, a, -1, Eg);
  }
  w(Dg, K);
  Dg.prototype.V = function () {
    return G(this, 1);
  };
  function Fg(a, b) {
    return D(a, 1, b);
  }
  function Gg(a, b) {
    return ac(a, 2, b);
  }
  var Eg = [2];
  function Hg(a) {
    K.call(this, a);
  }
  w(Hg, K);
  function Ig(a) {
    var b = new Hg();
    return D(b, 1, a);
  }
  function Jg(a) {
    K.call(this, a);
  }
  w(Jg, K);
  Jg.prototype.getWidth = function () {
    return jc(C(this, 1), 0);
  };
  function Kg(a, b) {
    return D(a, 1, b);
  }
  Jg.prototype.getHeight = function () {
    return jc(C(this, 2), 0);
  };
  function Lg(a, b) {
    return D(a, 2, b);
  }
  function Mg(a) {
    K.call(this, a);
  }
  w(Mg, K);
  function Ng(a, b) {
    return gc(a, 1, b);
  }
  function Og(a, b) {
    return gc(a, 2, b);
  }
  function Pg(a, b) {
    gc(a, 3, b);
  }
  function Qg(a) {
    K.call(this, a);
  }
  w(Qg, K);
  function Rg(a) {
    K.call(this, a);
  }
  w(Rg, K);
  function Sg(a, b) {
    return hc(a, 4, Tg, b);
  }
  function Ug(a, b) {
    return hc(a, 9, Tg, b);
  }
  var Tg = [4, 8, 5, 6, 9];
  function Vg(a) {
    K.call(this, a, -1, Wg);
  }
  w(Vg, K);
  function Xg(a, b) {
    return gc(a, 1, b);
  }
  function Yg(a, b) {
    return ic(a, 2, b);
  }
  function Zg(a, b) {
    return ac(a, 4, b);
  }
  function $g(a, b) {
    return ic(a, 5, b);
  }
  function ah(a, b) {
    return bc(a, 6, b);
  }
  function bh(a) {
    K.call(this, a);
  }
  w(bh, K);
  bh.prototype.V = function () {
    return G(this, 1);
  };
  function ch(a, b) {
    return bc(a, 1, b);
  }
  function dh(a, b) {
    return bc(a, 2, b);
  }
  function eh(a) {
    K.call(this, a);
  }
  w(eh, K);
  var Wg = [2, 4, 5],
    fh = [1, 2];
  function gh(a) {
    K.call(this, a, -1, hh);
  }
  w(gh, K);
  function ih(a) {
    K.call(this, a, -1, jh);
  }
  w(ih, K);
  var hh = [2, 3],
    jh = [5],
    kh = [1, 2, 3, 4];
  function lh(a) {
    K.call(this, a);
  }
  w(lh, K);
  lh.prototype.getTagSessionCorrelator = function () {
    return jc(C(this, 2), 0);
  };
  function mh(a) {
    var b = new lh();
    return hc(b, 4, nh, a);
  }
  var nh = [4, 5, 7];
  function oh(a) {
    a.Va.apply(
      a,
      ka(
        Ea.apply(1, arguments).map(function (b) {
          return { ab: 4, message: b };
        })
      )
    );
  }
  function ph(a) {
    a.Va.apply(
      a,
      ka(
        Ea.apply(1, arguments).map(function (b) {
          return { ab: 7, message: b };
        })
      )
    );
  }
  function qh(a) {
    return JSON.stringify([
      a.map(function (b) {
        var c = {};
        return [((c[b.ab] = b.message.toJSON()), c)];
      }),
    ]);
  }
  function rh(a, b) {
    if (q.globalThis.fetch)
      q.globalThis
        .fetch(a, {
          method: "POST",
          body: b,
          keepalive: 65536 > b.length,
          credentials: "omit",
          mode: "no-cors",
          redirect: "follow",
        })
        .catch(function () {});
    else {
      var c = new XMLHttpRequest();
      c.open("POST", a, !0);
      c.send(b);
    }
  }
  function sh(a, b, c, d, e) {
    this.B = a;
    this.A = b;
    this.C = c;
    this.m = d;
    this.v = e;
    this.i = 1;
    this.l = [];
    this.h = [];
    this.j = null;
  }
  function th(a, b, c, d) {
    if (3 !== a.i) {
      if (1 === a.i) {
        a.i = 2;
        var e = function () {
          a.i = 3;
          for (var f = v(a.l), g = f.next(); !g.done; g = f.next())
            (g = g.value), g();
          c();
        };
        b.document.visibilityState
          ? b.document.addEventListener("visibilitychange", function () {
              "hidden" === b.document.visibilityState && e();
              "visible" === b.document.visibilityState && (a.i = 2);
            })
          : "onpagehide" in b
          ? (b.addEventListener("pagehide", e),
            b.addEventListener("pageshow", function () {
              a.i = 2;
            }))
          : b.addEventListener("unload", e);
      }
      d && a.l.push(d);
    }
  }
  function uh(a) {
    null !== a.j && (clearTimeout(a.j), (a.j = null));
    if (a.h.length) {
      var b = qh(a.h);
      a.A(a.B + "?e=1", b);
      a.h = [];
    }
  }
  sh.prototype.Va = function () {
    var a = Ea.apply(0, arguments),
      b = this;
    this.v && 65536 <= qh(this.h.concat(a)).length && uh(this);
    this.h.push.apply(this.h, ka(a));
    this.h.length >= this.m && uh(this);
    this.h.length &&
      null === this.j &&
      (this.j = setTimeout(function () {
        uh(b);
      }, this.C));
  };
  function vh(a, b, c) {
    th(
      a,
      b,
      function () {
        uh(a);
      },
      c
    );
  }
  function wh(a, b, c) {
    sh.call(
      this,
      "https://pagead2.googlesyndication.com/pagead/ping",
      rh,
      void 0 === a ? 1e3 : a,
      void 0 === b ? 100 : b,
      (void 0 === c ? !1 : c) && !!q.globalThis.fetch
    );
  }
  w(wh, sh);
  function xh(a, b, c) {
    var d = void 0 === d ? new wh(b) : d;
    this.i = a;
    this.m = c;
    this.j = d;
    this.h = [];
    this.l = 0 < this.i && nd() < 1 / this.i;
  }
  function yh(a, b, c, d, e, f) {
    var g = dh(ch(new bh(), b), c);
    b = ah(Yg(Xg($g(Zg(new Vg(), d), e), g), a.h), f);
    b = mh(b);
    a.l && oh(a.j, zh(a, b));
    if (
      1 === f ||
      3 === f ||
      (4 === f &&
        !a.h.some(function (h) {
          return h.V() === g.V() && G(h, 2) === c;
        }))
    )
      a.h.push(g), 100 < a.h.length && a.h.shift();
  }
  function Ah(a, b, c, d) {
    if (a.m) {
      var e = new gh();
      b = ic(e, 2, b);
      c = ic(b, 3, c);
      d && bc(c, 1, d);
      d = new lh();
      d = hc(d, 7, nh, c);
      a.l && oh(a.j, zh(a, d));
    }
  }
  function zh(a, b) {
    b = bc(b, 1, Date.now());
    var c = Ad(window);
    b = bc(b, 2, c);
    return bc(b, 6, a.i);
  }
  function Bh() {
    var a = {};
    this.h = ((a[pg] = {}), (a[qg] = {}), (a[rg] = {}), a);
  }
  var Ch = /^true$/.test("false");
  function Dh(a, b) {
    switch (b) {
      case 1:
        return G(a, Wb(a, Cg, 1));
      case 2:
        return G(a, Wb(a, Cg, 2));
      case 3:
        return G(a, Wb(a, Cg, 3));
      case 6:
        return G(a, Wb(a, Cg, 6));
      default:
        return null;
    }
  }
  function Eh(a, b) {
    if (!a) return null;
    switch (b) {
      case 1:
        return J(a, 1);
      case 7:
        return kc(a, 3);
      case 2:
        return lc(a, 2);
      case 3:
        return kc(a, 3);
      case 6:
        return $b(a, 4);
      default:
        return null;
    }
  }
  var Fh = Ec(function () {
    if (!Ch) return {};
    try {
      var a = window.sessionStorage && window.sessionStorage.getItem("GGDFSSK");
      if (a) return JSON.parse(a);
    } catch (b) {}
    return {};
  });
  function Gh(a, b, c, d) {
    var e = (d = void 0 === d ? 0 : d),
      f,
      g;
    P(Hh).j[e] =
      null != (g = null == (f = P(Hh).j[e]) ? void 0 : f.add(b))
        ? g
        : new q.Set().add(b);
    e = Fh();
    if (null != e[b]) return e[b];
    b = Ih(d)[b];
    if (!b) return c;
    b = new Ag(b);
    b = Jh(b);
    a = Eh(b, a);
    return null != a ? a : c;
  }
  function Jh(a) {
    var b = P(Bh).h;
    if (b) {
      var c = hb(I(a, zg, 5), function (d) {
        return wg(H(d, kg, 1), b);
      });
      if (c) return H(c, xg, 2);
    }
    return H(a, xg, 4);
  }
  function Hh() {
    this.i = {};
    this.l = [];
    this.j = {};
    this.h = new q.Map();
  }
  function Kh(a, b, c) {
    return !!Gh(1, a, void 0 === b ? !1 : b, c);
  }
  function Lh(a, b, c) {
    b = void 0 === b ? 0 : b;
    a = Number(Gh(2, a, b, c));
    return isNaN(a) ? b : a;
  }
  function Mh(a, b, c) {
    return Gh(3, a, void 0 === b ? "" : b, c);
  }
  function Nh(a, b, c) {
    b = void 0 === b ? [] : b;
    return Gh(6, a, b, c);
  }
  function Ih(a) {
    return P(Hh).i[a] || (P(Hh).i[a] = {});
  }
  function Oh(a, b) {
    var c = Ih(b);
    od(a, function (d, e) {
      return (c[e] = d);
    });
  }
  function Ph(a, b, c, d, e) {
    e = void 0 === e ? !1 : e;
    var f = [],
      g = [];
    cb(b, function (h) {
      var k = Ih(h);
      cb(a, function (l) {
        var m = dc(l, Cg),
          p = Dh(l, m);
        if (p) {
          var r, y, E;
          var A =
            null !=
            (E =
              null == (r = P(Hh).h.get(h))
                ? void 0
                : null == (y = r.get(p))
                ? void 0
                : y.slice(0))
              ? E
              : [];
          a: {
            r = new ih();
            switch (m) {
              case 1:
                cc(r, 1, kh, p);
                break;
              case 2:
                cc(r, 2, kh, p);
                break;
              case 3:
                cc(r, 3, kh, p);
                break;
              case 6:
                cc(r, 4, kh, p);
                break;
              default:
                m = void 0;
                break a;
            }
            ac(r, 5, A);
            m = r;
          }
          if ((A = m)) {
            var F;
            A = !(null == (F = P(Hh).j[h]) || !F.has(p));
          }
          A && f.push(m);
          if ((F = m)) {
            var Y;
            F = !(null == (Y = P(Hh).h.get(h)) || !Y.has(p));
          }
          F && g.push(m);
          e ||
            ((Y = P(Hh)),
            Y.h.has(h) || Y.h.set(h, new q.Map()),
            Y.h.get(h).has(p) || Y.h.get(h).set(p, []),
            d && Y.h.get(h).get(p).push(d));
          k[p] = l.toJSON();
        }
      });
    });
    (f.length || g.length) && Ah(c, f, g, null != d ? d : void 0);
  }
  function Qh(a, b) {
    var c = Ih(b);
    cb(a, function (d) {
      var e = new Ag(d),
        f = dc(e, Cg);
      (e = Dh(e, f)) && (c[e] || (c[e] = d));
    });
  }
  function Rh() {
    return eb(t(Object, "keys").call(Object, P(Hh).i), function (a) {
      return Number(a);
    });
  }
  function Sh(a) {
    ib(P(Hh).l, a) || Oh(Ih(4), a);
  }
  function Th(a) {
    this.methodName = a;
  }
  var Uh = new Th(1),
    Vh = new Th(16),
    Wh = new Th(15),
    Xh = new Th(2),
    Yh = new Th(3),
    Zh = new Th(4),
    $h = new Th(5),
    ai = new Th(6),
    bi = new Th(7),
    ci = new Th(8),
    di = new Th(9),
    ei = new Th(10),
    fi = new Th(11),
    ki = new Th(12),
    li = new Th(13),
    mi = new Th(14);
  function ni(a, b, c) {
    c.hasOwnProperty(a.methodName) ||
      Object.defineProperty(c, String(a.methodName), { value: b });
  }
  function oi(a, b, c) {
    return b[a.methodName] || c || function () {};
  }
  function pi(a) {
    ni($h, Kh, a);
    ni(ai, Lh, a);
    ni(bi, Mh, a);
    ni(ci, Nh, a);
    ni(li, Qh, a);
    ni(Wh, Sh, a);
  }
  function qi(a) {
    ni(
      Zh,
      function (b) {
        P(Bh).h = b;
      },
      a
    );
    ni(
      di,
      function (b, c) {
        var d = P(Bh);
        d.h[pg][b] || (d.h[pg][b] = c);
      },
      a
    );
    ni(
      ei,
      function (b, c) {
        var d = P(Bh);
        d.h[qg][b] || (d.h[qg][b] = c);
      },
      a
    );
    ni(
      fi,
      function (b, c) {
        var d = P(Bh);
        d.h[rg][b] || (d.h[rg][b] = c);
      },
      a
    );
    ni(
      mi,
      function (b) {
        for (
          var c = P(Bh), d = v([pg, qg, rg]), e = d.next();
          !e.done;
          e = d.next()
        )
          (e = e.value), t(Object, "assign").call(Object, c.h[e], b[e]);
      },
      a
    );
  }
  function ri(a) {
    a.hasOwnProperty("init-done") ||
      Object.defineProperty(a, "init-done", { value: !0 });
  }
  function si() {
    this.l = function () {};
    this.h = function () {};
    this.j = function () {
      return [];
    };
    this.i = function () {
      return [];
    };
  }
  function ti(a, b, c) {
    a.l = oi(Uh, b, function () {});
    a.j = function (d) {
      return oi(Xh, b, function () {
        return [];
      })(d, c);
    };
    a.i = function () {
      return oi(Yh, b, function () {
        return [];
      })(c);
    };
    a.h = function (d) {
      oi(Vh, b, function () {})(d, c);
    };
  }
  function ui(a, b) {
    var c = void 0 === c ? {} : c;
    this.error = a;
    this.context = b.context;
    this.msg = b.message || "";
    this.id = b.id || "jserror";
    this.meta = c;
  }
  function vi(a) {
    return !!(a.error && a.meta && a.id);
  }
  var wi = null;
  function xi() {
    if (null === wi) {
      wi = "";
      try {
        var a = "";
        try {
          a = x.top.location.hash;
        } catch (c) {
          a = x.location.hash;
        }
        if (a) {
          var b = a.match(/\bdeid=([\d,]+)/);
          wi = b ? b[1] : "";
        }
      } catch (c) {}
    }
    return wi;
  }
  function yi() {
    var a = void 0 === a ? x : a;
    return (a = a.performance) && a.now && a.timing
      ? Math.floor(a.now() + a.timing.navigationStart)
      : Date.now();
  }
  function zi() {
    var a = void 0 === a ? x : a;
    return (a = a.performance) && a.now ? a.now() : null;
  }
  function Ai(a, b) {
    var c = zi() || yi();
    this.label = a;
    this.type = b;
    this.value = c;
    this.duration = 0;
    this.uniqueId = Math.random();
    this.taskId = this.slotId = void 0;
  }
  var Bi = x.performance,
    Ci = !!(Bi && Bi.mark && Bi.measure && Bi.clearMarks),
    Di = Ec(function () {
      var a;
      if ((a = Ci)) (a = xi()), (a = !!a.indexOf && 0 <= a.indexOf("1337"));
      return a;
    });
  function Ei() {
    this.i = [];
    this.j = x || x;
    var a = null;
    x &&
      ((x.google_js_reporting_queue = x.google_js_reporting_queue || []),
      (this.i = x.google_js_reporting_queue),
      (a = x.google_measure_js_timing));
    this.h = Di() || (null != a ? a : 1 > Math.random());
  }
  function Fi(a) {
    a &&
      Bi &&
      Di() &&
      (Bi.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"),
      Bi.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"));
  }
  Ei.prototype.start = function (a, b) {
    if (!this.h) return null;
    a = new Ai(a, b);
    b = "goog_" + a.label + "_" + a.uniqueId + "_start";
    Bi && Di() && Bi.mark(b);
    return a;
  };
  Ei.prototype.end = function (a) {
    if (this.h && "number" === typeof a.value) {
      a.duration = (zi() || yi()) - a.value;
      var b = "goog_" + a.label + "_" + a.uniqueId + "_end";
      Bi && Di() && Bi.mark(b);
      !this.h || 2048 < this.i.length || this.i.push(a);
    }
  };
  function Gi(a) {
    if (a == a.top) return 0;
    for (; a && a != a.top && ed(a); a = a.parent) {
      if (a.sf_) return 2;
      if (a.$sf) return 3;
      if (a.inGptIF) return 4;
      if (a.inDapIF) return 5;
    }
    return 1;
  }
  function Hi(a, b) {
    do {
      var c = jd(a, b);
      if (c && "fixed" == c.position) return !1;
    } while ((a = a.parentElement));
    return !0;
  }
  function Ii(a, b) {
    for (var c = ["width", "height"], d = 0; d < c.length; d++) {
      var e = "google_ad_" + c[d];
      if (!b.hasOwnProperty(e)) {
        var f = L(a[c[d]]);
        f = null === f ? null : Math.round(f);
        null != f && (b[e] = f);
      }
    }
  }
  function Ji(a, b) {
    return !(
      (sd.test(b.google_ad_width) || rd.test(a.style.width)) &&
      (sd.test(b.google_ad_height) || rd.test(a.style.height))
    );
  }
  function Ki(a, b) {
    return (a = Li(a, b)) ? a.y : 0;
  }
  function Li(a, b) {
    try {
      var c = b.document.documentElement.getBoundingClientRect(),
        d = a.getBoundingClientRect();
      return { x: d.left - c.left, y: d.top - c.top };
    } catch (e) {
      return null;
    }
  }
  function Mi(a) {
    var b = 0,
      c;
    for (c in hg) -1 != a.indexOf(c) && (b |= hg[c]);
    return b;
  }
  function Ni(a, b, c, d, e) {
    if (a !== a.top) return fd(a) ? 3 : 16;
    if (!(488 > Je(a))) return 4;
    if (!(a.innerHeight >= a.innerWidth)) return 5;
    var f = Je(a);
    if (!f || (f - c) / f > d) a = 6;
    else {
      if ((c = "true" != e.google_full_width_responsive))
        a: {
          c = Je(a);
          for (b = b.parentElement; b; b = b.parentElement)
            if (
              (d = jd(b, a)) &&
              (e = L(d.width)) &&
              !(e >= c) &&
              "visible" != d.overflow
            ) {
              c = !0;
              break a;
            }
          c = !1;
        }
      a = c ? 7 : !0;
    }
    return a;
  }
  function Oi(a, b, c, d) {
    var e = Ni(b, c, a, 0.3, d);
    !0 !== e
      ? (a = e)
      : "true" == d.google_full_width_responsive || Hi(c, b)
      ? ((b = Je(b)),
        (a = b - a),
        (a = b && 0 <= a ? !0 : b ? (-10 > a ? 11 : 0 > a ? 14 : 12) : 10))
      : (a = 9);
    return a;
  }
  function Pi(a, b, c) {
    a = a.style;
    "rtl" == b ? (a.marginRight = c) : (a.marginLeft = c);
  }
  function Qi(a, b) {
    if (3 == b.nodeType) return /\S/.test(b.data);
    if (1 == b.nodeType) {
      if (/^(script|style)$/i.test(b.nodeName)) return !1;
      try {
        var c = jd(b, a);
      } catch (d) {}
      return (
        !c ||
        ("none" != c.display &&
          !(
            "absolute" == c.position &&
            ("hidden" == c.visibility || "collapse" == c.visibility)
          ))
      );
    }
    return !1;
  }
  function Ri(a, b, c) {
    a = Li(b, a);
    return "rtl" == c ? -a.x : a.x;
  }
  function Si(a, b) {
    var c;
    c = (c = b.parentElement) ? ((c = jd(c, a)) ? c.direction : "") : "";
    if (c) {
      b.style.border =
        b.style.borderStyle =
        b.style.outline =
        b.style.outlineStyle =
        b.style.transition =
          "none";
      b.style.borderSpacing = b.style.padding = "0";
      Pi(b, c, "0px");
      b.style.width = Je(a) + "px";
      if (0 !== Ri(a, b, c)) {
        Pi(b, c, "0px");
        var d = Ri(a, b, c);
        Pi(b, c, -1 * d + "px");
        a = Ri(a, b, c);
        0 !== a && a !== d && Pi(b, c, (d / (a - d)) * d + "px");
      }
      b.style.zIndex = 30;
    }
  }
  function Ti(a, b) {
    this.L = a;
    this.j = b;
  }
  Ti.prototype.height = function () {
    return this.j;
  };
  Ti.prototype.h = function (a) {
    return 300 < a && 300 < this.j ? this.L : Math.min(1200, Math.round(a));
  };
  Ti.prototype.i = function () {};
  function Ui(a, b, c, d) {
    d =
      void 0 === d
        ? function (f) {
            return f;
          }
        : d;
    var e;
    return (
      (a.style && a.style[c] && d(a.style[c])) ||
      ((e = jd(a, b)) && e[c] && d(e[c])) ||
      null
    );
  }
  function Vi(a) {
    return function (b) {
      return b.L <= a;
    };
  }
  function Wi(a, b, c, d) {
    var e = a && Xi(c, b),
      f = Yi(b, d);
    return function (g) {
      return !(e && g.height() >= f);
    };
  }
  function Zi(a) {
    return function (b) {
      return b.height() <= a;
    };
  }
  function Xi(a, b) {
    return Ki(a, b) < Ie(b).clientHeight - 100;
  }
  function $i(a, b) {
    var c = Ui(b, a, "height", L);
    if (c) return c;
    var d = b.style.height;
    b.style.height = "inherit";
    c = Ui(b, a, "height", L);
    b.style.height = d;
    if (c) return c;
    c = Infinity;
    do
      (d = b.style && L(b.style.height)) && (c = Math.min(c, d)),
        (d = Ui(b, a, "maxHeight", L)) && (c = Math.min(c, d));
    while ((b = b.parentElement) && "HTML" != b.tagName);
    return c;
  }
  function Yi(a, b) {
    var c = 0 == Kd(a);
    return b && c ? Math.max(250, (2 * Ie(a).clientHeight) / 3) : 250;
  }
  var R = {},
    aj =
      ((R.google_ad_channel = !0),
      (R.google_ad_client = !0),
      (R.google_ad_host = !0),
      (R.google_ad_host_channel = !0),
      (R.google_adtest = !0),
      (R.google_tag_for_child_directed_treatment = !0),
      (R.google_tag_for_under_age_of_consent = !0),
      (R.google_tag_partner = !0),
      (R.google_restrict_data_processing = !0),
      (R.google_page_url = !0),
      (R.google_debug_params = !0),
      (R.google_shadow_mode = !0),
      (R.google_adbreak_test = !0),
      (R.google_ad_frequency_hint = !0),
      (R.google_admob_interstitial_slot = !0),
      (R.google_admob_rewarded_slot = !0),
      (R.google_admob_ads_only = !0),
      (R.google_max_ad_content_rating = !0),
      (R.google_traffic_source = !0),
      R),
    bj = RegExp("(^| )adsbygoogle($| )");
  function cj(a, b) {
    for (var c = 0; c < b.length; c++) {
      var d = b[c],
        e = Xc(d.ac);
      a[e] = d.value;
    }
  }
  var dj = ja(["https://pagead2.googlesyndication.com/pagead/js/err_rep.js"]);
  function ej() {
    var a = void 0 === a ? "jserror" : a;
    var b = void 0 === b ? 0.01 : b;
    var c = void 0 === c ? Id(dj) : c;
    this.j = a;
    this.h = null;
    this.l = !1;
    this.v = Math.random();
    this.m = b;
    this.i = this.I;
    this.A = c;
  }
  n = ej.prototype;
  n.Wa = function (a) {
    this.h = a;
  };
  n.Ya = function (a) {
    this.l = a;
  };
  n.Xa = function (a) {
    this.i = a;
  };
  n.I = function (a, b, c, d, e) {
    c = void 0 === c ? this.m : c;
    e = void 0 === e ? this.j : e;
    if ((this.l ? this.v : Math.random()) > c) return !1;
    vi(b) || (b = new ui(b, { context: a, id: e }));
    if (d || this.h) (b.meta = {}), this.h && this.h(b.meta), d && d(b.meta);
    x.google_js_errors = x.google_js_errors || [];
    x.google_js_errors.push(b);
    x.error_rep_loaded || (gd(x.document, this.A), (x.error_rep_loaded = !0));
    return !1;
  };
  n.qa = function (a, b, c) {
    try {
      return b();
    } catch (d) {
      if (!this.i(a, d, this.m, c, this.j)) throw d;
    }
  };
  n.Ra = function (a, b) {
    var c = this;
    return function () {
      var d = Ea.apply(0, arguments);
      return c.qa(a, function () {
        return b.apply(void 0, d);
      });
    };
  };
  n.Sa = function (a, b) {
    var c = this;
    b.catch(function (d) {
      d = d ? d : "unknown rejection";
      c.I(a, d instanceof Error ? d : Error(d), void 0, c.h || void 0);
    });
  };
  function fj(a, b) {
    b = b.google_js_reporting_queue = b.google_js_reporting_queue || [];
    2048 > b.length && b.push(a);
  }
  function gj(a, b, c, d, e) {
    e = void 0 === e ? !1 : e;
    var f = d || window,
      g = "undefined" !== typeof queueMicrotask;
    return function () {
      e &&
        g &&
        queueMicrotask(function () {
          f.google_rum_task_id_counter = f.google_rum_task_id_counter || 1;
          f.google_rum_task_id_counter += 1;
        });
      var h = zi(),
        k = 3;
      try {
        var l = b.apply(this, arguments);
      } catch (m) {
        k = 13;
        if (!c) throw m;
        c(a, m);
      } finally {
        f.google_measure_js_timing &&
          h &&
          fj(
            t(Object, "assign").call(
              Object,
              {},
              {
                label: a.toString(),
                value: h,
                duration: (zi() || 0) - h,
                type: k,
              },
              e &&
                g && {
                  taskId: (f.google_rum_task_id_counter =
                    f.google_rum_task_id_counter || 1),
                }
            ),
            f
          );
      }
      return l;
    };
  }
  function hj(a, b) {
    return gj(
      a,
      b,
      function (c, d) {
        new ej().I(c, d);
      },
      void 0,
      !1
    );
  }
  function ij(a, b, c) {
    return gj(a, b, void 0, c, !0).apply();
  }
  function jj(a) {
    if (!a) return null;
    var b = C(a, 7);
    if (C(a, 1) || a.getId() || 0 < $b(a, 4).length) {
      b = $b(a, 4);
      var c = C(a, 3),
        d = C(a, 1),
        e = "";
      d && (e += d);
      c && (e += "#" + ff(c));
      if (b) for (c = 0; c < b.length; c++) e += "." + ff(b[c]);
      a = (b = e) ? new bf(b, C(a, 2), C(a, 5), kj(C(a, 6))) : null;
    } else a = b ? new bf(b, C(a, 2), C(a, 5), kj(C(a, 6))) : null;
    return a;
  }
  var lj = { 1: 1, 2: 2, 3: 3, 0: 0 };
  function kj(a) {
    return null == a ? a : lj[a];
  }
  var mj = { 1: 0, 2: 1, 3: 2, 4: 3 };
  function nj(a) {
    return (a.google_ama_state = a.google_ama_state || {});
  }
  function oj(a) {
    a = nj(a);
    return (a.optimization = a.optimization || {});
  }
  function pj(a) {
    K.call(this, a);
  }
  w(pj, K);
  pj.prototype.getName = function () {
    return C(this, 4);
  };
  function qj(a) {
    K.call(this, a);
  }
  w(qj, K);
  function rj(a) {
    K.call(this, a);
  }
  w(rj, K);
  function sj(a) {
    K.call(this, a);
  }
  w(sj, K);
  var tj = [1, 2, 3];
  function uj(a) {
    K.call(this, a, -1, vj);
  }
  w(uj, K);
  function wj(a) {
    K.call(this, a);
  }
  w(wj, K);
  function xj(a) {
    K.call(this, a);
  }
  w(xj, K);
  var vj = [1, 4],
    yj = [1, 2];
  function zj(a) {
    K.call(this, a, -1, Aj);
  }
  w(zj, K);
  function Bj(a) {
    K.call(this, a);
  }
  w(Bj, K);
  function Cj(a) {
    K.call(this, a, -1, Dj);
  }
  w(Cj, K);
  function Ej(a) {
    K.call(this, a);
  }
  w(Ej, K);
  function Fj(a) {
    K.call(this, a);
  }
  w(Fj, K);
  function Gj(a) {
    K.call(this, a);
  }
  w(Gj, K);
  function Hj(a) {
    K.call(this, a);
  }
  w(Hj, K);
  var Aj = [1, 2, 5, 7],
    Dj = [2, 5, 6, 11];
  function Ij(a) {
    K.call(this, a);
  }
  w(Ij, K);
  function Jj(a) {
    switch (C(a, 8)) {
      case 1:
      case 2:
        if (null == a) var b = null;
        else
          (b = H(a, N, 1)),
            null == b
              ? (b = null)
              : ((a = C(a, 2)),
                (b = null == a ? null : new ge({ Ja: [b], Ua: a })));
        return null != b
          ? $d(b)
          : be(Error("Missing dimension when creating placement id"));
      case 3:
        return be(Error("Missing dimension when creating placement id"));
      default:
        return be(Error("Invalid type: " + C(a, 8)));
    }
  }
  function Kj(a, b) {
    function c() {
      d.push({ anchor: e.anchor, position: e.position });
      return e.anchor == b.anchor && e.position == b.position;
    }
    for (var d = [], e = a; e; ) {
      switch (e.position) {
        case 1:
          if (c()) return d;
          e.position = 2;
        case 2:
          if (c()) return d;
          if (e.anchor.firstChild) {
            e = { anchor: e.anchor.firstChild, position: 1 };
            continue;
          } else e.position = 3;
        case 3:
          if (c()) return d;
          e.position = 4;
        case 4:
          if (c()) return d;
      }
      for (
        ;
        e &&
        !e.anchor.nextSibling &&
        e.anchor.parentNode != e.anchor.ownerDocument.body;

      ) {
        e = { anchor: e.anchor.parentNode, position: 3 };
        if (c()) return d;
        e.position = 4;
        if (c()) return d;
      }
      e && e.anchor.nextSibling
        ? (e = { anchor: e.anchor.nextSibling, position: 1 })
        : (e = null);
    }
    return d;
  }
  function Lj(a, b) {
    this.i = a;
    this.h = b;
  }
  function Mj(a, b) {
    var c = new ee(),
      d = new de();
    b.forEach(function (e) {
      if (mc(e, qj, 1, tj)) {
        e = mc(e, qj, 1, tj);
        if (
          H(e, Ye, 1) &&
          H(H(e, Ye, 1), N, 1) &&
          H(e, Ye, 2) &&
          H(H(e, Ye, 2), N, 1)
        ) {
          var f = Nj(a, H(H(e, Ye, 1), N, 1)),
            g = Nj(a, H(H(e, Ye, 2), N, 1));
          if (f && g)
            for (
              f = v(
                Kj(
                  { anchor: f, position: C(H(e, Ye, 1), 2) },
                  { anchor: g, position: C(H(e, Ye, 2), 2) }
                )
              ),
                g = f.next();
              !g.done;
              g = f.next()
            )
              (g = g.value), c.set(Ka(g.anchor), g.position);
        }
        H(e, Ye, 3) &&
          H(H(e, Ye, 3), N, 1) &&
          (f = Nj(a, H(H(e, Ye, 3), N, 1))) &&
          c.set(Ka(f), C(H(e, Ye, 3), 2));
      } else mc(e, rj, 2, tj) ? Oj(a, mc(e, rj, 2, tj), c) : mc(e, sj, 3, tj) && Pj(a, mc(e, sj, 3, tj), d);
    });
    return new Lj(c, d);
  }
  function Oj(a, b, c) {
    H(b, Ye, 2)
      ? ((b = H(b, Ye, 2)), (a = Nj(a, H(b, N, 1))) && c.set(Ka(a), C(b, 2)))
      : H(b, N, 1) &&
        (a = Qj(a, H(b, N, 1))) &&
        a.forEach(function (d) {
          d = Ka(d);
          c.set(d, 1);
          c.set(d, 4);
          c.set(d, 2);
          c.set(d, 3);
        });
  }
  function Pj(a, b, c) {
    H(b, N, 1) &&
      (a = Qj(a, H(b, N, 1))) &&
      a.forEach(function (d) {
        c.add(Ka(d));
      });
  }
  function Nj(a, b) {
    return (a = Qj(a, b)) && 0 < a.length ? a[0] : null;
  }
  function Qj(a, b) {
    return (b = jj(b)) ? b.query(a) : null;
  }
  function Rj() {
    this.h = new q.Set();
  }
  function Sj(a) {
    a = Tj(a);
    return a.has("all") || a.has("after");
  }
  function Uj(a) {
    a = Tj(a);
    return a.has("all") || a.has("before");
  }
  function Vj(a, b, c) {
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
      if (Wj(b)) return !0;
      if (a.h.has(b)) break;
      c.push(b);
      b = b.parentElement;
    }
    c.forEach(function (d) {
      return a.h.add(d);
    });
    return !1;
  }
  function Wj(a) {
    var b = Tj(a);
    return (
      a &&
      ("AUTO-ADS-EXCLUSION-AREA" === a.tagName ||
        b.has("inside") ||
        b.has("all"))
    );
  }
  function Tj(a) {
    return (a = a && a.getAttribute("data-no-auto-ads"))
      ? new q.Set(a.split("|"))
      : new q.Set();
  }
  function Xj(a, b) {
    if (!a) return !1;
    a = jd(a, b);
    if (!a) return !1;
    a = a.cssFloat || a.styleFloat;
    return "left" == a || "right" == a;
  }
  function Yj(a) {
    for (a = a.previousSibling; a && 1 != a.nodeType; ) a = a.previousSibling;
    return a ? a : null;
  }
  function Zj(a) {
    return !!a.nextSibling || (!!a.parentNode && Zj(a.parentNode));
  }
  function ak(a, b) {
    if (!a) return !1;
    a = a.hash;
    if (!a || !a.indexOf) return !1;
    if (-1 != a.indexOf(b)) return !0;
    b = bk(b);
    return "go" != b && -1 != a.indexOf(b) ? !0 : !1;
  }
  function bk(a) {
    var b = "";
    od(a.split("_"), function (c) {
      b += c.substr(0, 2);
    });
    return b;
  }
  function ck(a) {
    a = void 0 === a ? window : a;
    a = a.googletag;
    return (null == a ? 0 : a.apiReady) ? a : void 0;
  }
  function dk(a) {
    var b = ck(a);
    return b
      ? db(
          eb(b.pubads().getSlots(), function (c) {
            return a.document.getElementById(c.getSlotElementId());
          }),
          function (c) {
            return null != c;
          }
        )
      : null;
  }
  function ek(a, b) {
    return jb(a.document.querySelectorAll(b));
  }
  function fk(a) {
    var b = [];
    a = v(a);
    for (var c = a.next(); !c.done; c = a.next()) {
      c = c.value;
      for (var d = !0, e = 0; e < b.length; e++) {
        var f = b[e];
        if (f.contains(c)) {
          d = !1;
          break;
        }
        if (c.contains(f)) {
          d = !1;
          b[e] = c;
          break;
        }
      }
      d && b.push(c);
    }
    return b;
  }
  function gk(a, b, c, d, e) {
    this.h = a;
    this.C = b;
    this.i = c;
    this.m = e || null;
    this.v = (this.B = d) ? Mj(a.document, I(d, pj, 5)) : Mj(a.document, []);
    this.A = new Rj();
    this.j = 0;
    this.l = !1;
  }
  function hk(a, b) {
    if (a.l) return !0;
    a.l = !0;
    var c = I(a.i, $e, 1);
    a.j = 0;
    var d = ik(a.B);
    if (ak(a.h.location, "google_audio_sense")) {
      var e = new Oe();
      e = D(e, 1, 1);
      var f = new Pe();
      f = D(f, 2, !0);
      e = gc(e, 2, f);
      f = new Qe();
      var g = new Se();
      var h = D(g, 1, 1);
      Jb(f);
      g = fc(f, Se, 1, !1, !1);
      h = null != h ? h : new Se();
      var k = Yb(f, 1, 2, void 0, !1);
      g.push(h);
      k.push(h.s);
      Bb(h.s) && yb(k, 8);
      e = gc(e, 3, f);
    } else e = H(a.i, Oe, 27);
    if ((f = e)) {
      var l;
      e = (null == (l = H(a.i, Te, 6)) ? void 0 : I(l, Xe, 1)) || [];
      l = a.h;
      var m;
      if (
        1 == G(f, 1) &&
        null != (m = H(f, Pe, 2)) &&
        J(m, 2) &&
        0 != e.length
      ) {
        m = [];
        e = v(e);
        for (f = e.next(); !f.done; f = e.next())
          if ((f = jj(H(f.value, N, 1) || null)))
            (f = f.query(l.document)), 0 < f.length && m.push(f[0]);
        m = m.filter(Ke).filter(Le(m)).filter(Me(l));
        m.sort(Ne);
        if ((m = m[0] || null))
          (e = l.document.createElement("div")),
            (e.id = "google-auto-placed-read-aloud-player-reserved"),
            wd(e, { width: "100%", height: "65px" }),
            m.insertBefore(e, m.firstChild),
            (nj(l).audioSenseSpaceReserved = !0);
      }
    }
    m = a.h;
    var p;
    try {
      var r = (p = m.localStorage.getItem("google_ama_settings"))
        ? sc(Ij, p)
        : null;
    } catch (Y) {
      r = null;
    }
    p = null !== r && J(r, 2, !1);
    r = nj(m);
    p && ((r.eatf = !0), Fd(7, [!0, 0, !1]));
    b: {
      e = { lb: !1, mb: !1 };
      f = ek(m, ".google-auto-placed");
      g = ek(
        m,
        "ins.adsbygoogle[data-anchor-shown],ins.adsbygoogle[data-anchor-status]"
      );
      h = ek(m, "ins.adsbygoogle[data-ad-format=autorelaxed]");
      k = (dk(m) || ek(m, "div[id^=div-gpt-ad]")).concat(
        ek(m, "iframe[id^=google_ads_iframe]")
      );
      var y = ek(
          m,
          "div.trc_related_container,div.OUTBRAIN,div[id^=rcjsload],div[id^=ligatusframe],div[id^=crt-],iframe[id^=cto_iframe],div[id^=yandex_], div[id^=Ya_sync],iframe[src*=adnxs],div.advertisement--appnexus,div[id^=apn-ad],div[id^=amzn-native-ad],iframe[src*=amazon-adsystem],iframe[id^=ox_],iframe[src*=openx],img[src*=openx],div[class*=adtech],div[id^=adtech],iframe[src*=adtech],div[data-content-ad-placement=true],div.wpcnt div[id^=atatags-]"
        ),
        E = ek(m, "ins.adsbygoogle-ablated-ad-slot"),
        A = ek(m, "div.googlepublisherpluginad"),
        F = ek(m, "html > ins.adsbygoogle");
      l = [].concat(
        ek(m, "iframe[id^=aswift_],iframe[id^=google_ads_frame]"),
        ek(m, "body ins.adsbygoogle")
      );
      p = [];
      e = v([
        [e.Vb, f],
        [e.lb, g],
        [e.Yb, h],
        [e.Wb, k],
        [e.Zb, y],
        [e.Ub, E],
        [e.Xb, A],
        [e.mb, F],
      ]);
      for (f = e.next(); !f.done; f = e.next())
        (g = v(f.value)),
          (f = g.next().value),
          (g = g.next().value),
          !1 === f ? (p = p.concat(g)) : (l = l.concat(g));
      l = fk(l);
      e = fk(p);
      p = l.slice(0);
      l = v(e);
      for (e = l.next(); !e.done; e = l.next())
        for (e = e.value, f = 0; f < p.length; f++)
          (e.contains(p[f]) || p[f].contains(e)) && p.splice(f, 1);
      m = Ie(m).clientHeight;
      for (l = 0; l < p.length; l++)
        if (!(p[l].getBoundingClientRect().top > m)) {
          m = !0;
          break b;
        }
      m = !1;
    }
    m = m ? (r.eatfAbg = !0) : !1;
    if (m) return !0;
    m = new de([2]);
    for (r = 0; r < c.length; r++) {
      p = a;
      e = c[r];
      l = r;
      f = b;
      if (
        H(e, ke, 4) &&
        m.contains(C(H(e, ke, 4), 1)) &&
        1 === C(e, 8) &&
        jk(e, d)
      ) {
        p.j++;
        if ((f = kk(p, e, f, d)))
          (g = nj(p.h)),
            g.numAutoAdsPlaced || (g.numAutoAdsPlaced = 0),
            H(e, N, 1) &&
              null != C(H(e, N, 1), 5) &&
              (g.numPostPlacementsPlaced
                ? g.numPostPlacementsPlaced++
                : (g.numPostPlacementsPlaced = 1)),
            null == g.placed && (g.placed = []),
            g.numAutoAdsPlaced++,
            g.placed.push({ index: l, element: f.ka }),
            Fd(7, [!1, p.j, !0]);
        p = f;
      } else p = null;
      if (p) return !0;
    }
    Fd(7, [!1, a.j, !1]);
    return !1;
  }
  function kk(a, b, c, d) {
    if (!jk(b, d) || 1 != C(b, 8)) return null;
    d = H(b, N, 1);
    if (!d) return null;
    d = jj(d);
    if (!d) return null;
    d = d.query(a.h.document);
    if (0 == d.length) return null;
    d = d[0];
    var e = mj[C(b, 2)];
    e = void 0 === e ? null : e;
    var f;
    if (!(f = null == e)) {
      a: {
        f = a.h;
        switch (e) {
          case 0:
            f = Xj(Yj(d), f);
            break a;
          case 3:
            f = Xj(d, f);
            break a;
          case 2:
            var g = d.lastChild;
            f = Xj(g ? (1 == g.nodeType ? g : Yj(g)) : null, f);
            break a;
        }
        f = !1;
      }
      if ((c = !f && !(!c && 2 == e && !Zj(d))))
        (c = 1 == e || 2 == e ? d : d.parentNode),
          (c = !(c && !gf(c) && 0 >= c.offsetWidth));
      f = !c;
    }
    if (!(c = f)) {
      c = a.v;
      f = C(b, 2);
      g = Ka(d);
      g = c.i.h.get(g);
      if (!(g = g ? g.contains(f) : !1))
        a: {
          if (c.h.contains(Ka(d)))
            switch (f) {
              case 2:
              case 3:
                g = !0;
                break a;
              default:
                g = !1;
                break a;
            }
          for (f = d.parentElement; f; ) {
            if (c.h.contains(Ka(f))) {
              g = !0;
              break a;
            }
            f = f.parentElement;
          }
          g = !1;
        }
      c = g;
    }
    if (!c) {
      c = a.A;
      f = C(b, 2);
      a: switch (f) {
        case 1:
          g = Sj(d.previousElementSibling) || Uj(d);
          break a;
        case 4:
          g = Sj(d) || Uj(d.nextElementSibling);
          break a;
        case 2:
          g = Uj(d.firstElementChild);
          break a;
        case 3:
          g = Sj(d.lastElementChild);
          break a;
        default:
          throw Error("Unknown RelativePosition: " + f);
      }
      c = g || Vj(c, d, f);
    }
    if (c) return null;
    c = H(b, Ze, 3);
    f = {};
    c && ((f.Za = C(c, 1)), (f.Ka = C(c, 2)), (f.ib = !!Zb(c, 3)));
    c = H(b, ke, 4) && C(H(b, ke, 4), 2) ? C(H(b, ke, 4), 2) : null;
    c = ne(c);
    g = null != C(b, 12, !1) ? C(b, 12) : null;
    g = null == g ? null : new le(null, { google_ml_rank: g });
    b = lk(a, b);
    b = me(a.m, c, g, b);
    c = a.h;
    a = a.C;
    var h = c.document,
      k = f.ib || !1;
    g = new Zc(h).createElement("DIV");
    var l = g.style;
    l.width = "100%";
    l.height = "auto";
    l.clear = k ? "both" : "none";
    k = g.style;
    k.textAlign = "center";
    f.tb && cj(k, f.tb);
    h = new Zc(h).createElement("INS");
    k = h.style;
    k.display = "block";
    k.margin = "auto";
    k.backgroundColor = "transparent";
    f.Za && (k.marginTop = f.Za);
    f.Ka && (k.marginBottom = f.Ka);
    f.fb && cj(k, f.fb);
    g.appendChild(h);
    f = { ta: g, ka: h };
    f.ka.setAttribute("data-ad-format", "auto");
    g = [];
    if ((h = b && b.La)) f.ta.className = h.join(" ");
    h = f.ka;
    h.className = "adsbygoogle";
    h.setAttribute("data-ad-client", a);
    g.length && h.setAttribute("data-ad-channel", g.join("+"));
    a: {
      try {
        var m = f.ta;
        var p = void 0 === p ? 0 : p;
        if (Q(qf)) {
          p = void 0 === p ? 0 : p;
          var r = eg(d, e, p);
          if (r.init) {
            var y = r.init;
            for (d = y; (d = r.ma(d)); ) y = d;
            var E = { anchor: y, position: r.pa };
          } else E = { anchor: d, position: e };
          m["google-ama-order-assurance"] = p;
          dg(m, E.anchor, E.position);
        } else dg(m, d, e);
        b: {
          var A = f.ka;
          A.dataset.adsbygoogleStatus = "reserved";
          A.className += " adsbygoogle-noablate";
          m = { element: A };
          var F = b && b.Ta;
          if (A.hasAttribute("data-pub-vars")) {
            try {
              F = JSON.parse(A.getAttribute("data-pub-vars"));
            } catch (Y) {
              break b;
            }
            A.removeAttribute("data-pub-vars");
          }
          F && (m.params = F);
          (c.adsbygoogle = c.adsbygoogle || []).push(m);
        }
      } catch (Y) {
        (A = f.ta) &&
          A.parentNode &&
          ((F = A.parentNode),
          F.removeChild(A),
          gf(F) &&
            (F.style.display = F.getAttribute("data-init-display") || "none"));
        A = !1;
        break a;
      }
      A = !0;
    }
    return A ? f : null;
  }
  function lk(a, b) {
    return Yd(
      ae(Jj(b).map(oe), function (c) {
        nj(a.h).exception = c;
      })
    );
  }
  function ik(a) {
    var b = {};
    a &&
      Yb(a, 6, 0, !1, Bb(a.s)).forEach(function (c) {
        b[c] = !0;
      });
    return b;
  }
  function jk(a, b) {
    return a && void 0 !== Vb(a, ke, 4, !1) && b[C(H(a, ke, 4), 2)] ? !1 : !0;
  }
  function mk(a) {
    K.call(this, a);
  }
  w(mk, K);
  var nk = RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)");
  function ok(a, b) {
    this.h = a;
    this.i = b;
  }
  function pk(a, b, c) {
    this.url = a;
    this.u = b;
    this.Oa = !!c;
    this.depth = null;
  }
  function qk() {
    var a = rk;
    this.m = Ce;
    this.h = null;
    this.l = this.I;
    this.i = void 0 === a ? null : a;
    this.j = !1;
  }
  n = qk.prototype;
  n.Xa = function (a) {
    this.l = a;
  };
  n.Wa = function (a) {
    this.h = a;
  };
  n.Ya = function (a) {
    this.j = a;
  };
  n.qa = function (a, b, c) {
    try {
      if (this.i && this.i.h) {
        var d = this.i.start(a.toString(), 3);
        var e = b();
        this.i.end(d);
      } else e = b();
    } catch (h) {
      b = !0;
      try {
        Fi(d), (b = this.l(a, new ui(h, { message: sk(h) }), void 0, c));
      } catch (k) {
        this.I(217, k);
      }
      if (b) {
        var f, g;
        null == (f = window.console) || null == (g = f.error) || g.call(f, h);
      } else throw h;
    }
    return e;
  };
  n.Ra = function (a, b) {
    var c = this;
    return function () {
      var d = Ea.apply(0, arguments);
      return c.qa(a, function () {
        return b.apply(void 0, d);
      });
    };
  };
  n.I = function (a, b, c, d, e) {
    e = e || "jserror";
    try {
      var f = new ue();
      f.h.push(1);
      f.i[1] = ve("context", a);
      vi(b) || (b = new ui(b, { message: sk(b) }));
      if (b.msg) {
        var g = b.msg.substring(0, 512);
        f.h.push(2);
        f.i[2] = ve("msg", g);
      }
      var h = b.meta || {};
      if (this.h)
        try {
          this.h(h);
        } catch (hd) {}
      if (d)
        try {
          d(h);
        } catch (hd) {}
      b = [h];
      f.h.push(3);
      f.i[3] = b;
      d = x;
      b = [];
      g = null;
      do {
        var k = d;
        if (ed(k)) {
          var l = k.location.href;
          g = (k.document && k.document.referrer) || null;
        } else (l = g), (g = null);
        b.push(new pk(l || "", k));
        try {
          d = k.parent;
        } catch (hd) {
          d = null;
        }
      } while (d && k != d);
      l = 0;
      for (var m = b.length - 1; l <= m; ++l) b[l].depth = m - l;
      k = x;
      if (
        k.location &&
        k.location.ancestorOrigins &&
        k.location.ancestorOrigins.length == b.length - 1
      )
        for (m = 1; m < b.length; ++m) {
          var p = b[m];
          p.url ||
            ((p.url = k.location.ancestorOrigins[m - 1] || ""), (p.Oa = !0));
        }
      var r = new pk(x.location.href, x, !1);
      k = null;
      var y = b.length - 1;
      for (p = y; 0 <= p; --p) {
        var E = b[p];
        !k && nk.test(E.url) && (k = E);
        if (E.url && !E.Oa) {
          r = E;
          break;
        }
      }
      E = null;
      var A = b.length && b[y].url;
      0 != r.depth && A && (E = b[y]);
      var F = new ok(r, E);
      if (F.i) {
        var Y = F.i.url || "";
        f.h.push(4);
        f.i[4] = ve("top", Y);
      }
      var Ue = { url: F.h.url || "" };
      if (F.h.url) {
        var Ve = F.h.url.match(bd),
          gi = Ve[1],
          hi = Ve[3],
          ii = Ve[4];
        r = "";
        gi && (r += gi + ":");
        hi && ((r += "//"), (r += hi), ii && (r += ":" + ii));
        var ji = r;
      } else ji = "";
      Ue = [Ue, { url: ji }];
      f.h.push(5);
      f.i[5] = Ue;
      De(this.m, e, f, this.j, c);
    } catch (hd) {
      try {
        De(
          this.m,
          e,
          { context: "ecmserr", rctx: a, msg: sk(hd), url: F && F.h.url },
          this.j,
          c
        );
      } catch (Tq) {}
    }
    return !0;
  };
  n.Sa = function (a, b) {
    var c = this;
    b.catch(function (d) {
      d = d ? d : "unknown rejection";
      c.I(a, d instanceof Error ? d : Error(d), void 0, c.h || void 0);
    });
  };
  function sk(a) {
    var b = a.toString();
    a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
    a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
    if (a.stack) {
      a = a.stack;
      var c = b;
      try {
        -1 == a.indexOf(c) && (a = c + "\n" + a);
        for (var d; a != d; )
          (d = a),
            (a = a.replace(
              RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"),
              "$1"
            ));
        b = a.replace(RegExp("\n *", "g"), "\n");
      } catch (e) {
        b = c;
      }
    }
    return b;
  }
  function S(a) {
    a = void 0 === a ? "" : a;
    var b = Error.call(this);
    this.message = b.message;
    "stack" in b && (this.stack = b.stack);
    this.name = "TagError";
    this.message = a ? "adsbygoogle.push() error: " + a : "";
    Error.captureStackTrace
      ? Error.captureStackTrace(this, S)
      : (this.stack = Error().stack || "");
  }
  w(S, Error);
  var Ce,
    tk,
    rk = new Ei();
  function uk(a) {
    null != a && (x.google_measure_js_timing = a);
    x.google_measure_js_timing ||
      ((a = rk),
      (a.h = !1),
      a.i != a.j.google_js_reporting_queue &&
        (Di() && cb(a.i, Fi), (a.i.length = 0)));
  }
  (function (a) {
    Ce = a || new Ae();
    "number" !== typeof x.google_srt && (x.google_srt = Math.random());
    Be();
    tk = new qk();
    tk.Ya(!0);
    "complete" == x.document.readyState
      ? uk()
      : rk.h &&
        Gc(x, "load", function () {
          uk();
        });
  })();
  function vk(a, b, c) {
    return tk.qa(a, b, c);
  }
  function wk(a, b) {
    return tk.Ra(a, b);
  }
  function xk(a, b, c) {
    var d = P(si).i();
    !b.eid && d.length && (b.eid = d.toString());
    De(Ce, a, b, !0, c);
  }
  function yk(a, b) {
    tk.Sa(a, b);
  }
  function zk(a, b, c, d) {
    var e;
    vi(b) ? (e = b.msg || sk(b.error)) : (e = sk(b));
    return 0 == e.indexOf("TagError")
      ? ((c = b instanceof ui ? b.error : b),
        c.pbr || ((c.pbr = !0), tk.I(a, b, 0.1, d, "puberror")),
        !1)
      : tk.I(a, b, c, d);
  }
  function Ak(a) {
    try {
      var b = a.localStorage.getItem("google_auto_fc_cmp_setting") || null;
    } catch (d) {
      b = null;
    }
    var c = b;
    return c
      ? ce(function () {
          return sc(mk, c);
        })
      : $d(null);
  }
  function Bk() {
    this.S = {};
  }
  function Ck() {
    if (Dk) return Dk;
    var a = Hd() || window,
      b = a.google_persistent_state_async;
    return null != b &&
      "object" == typeof b &&
      null != b.S &&
      "object" == typeof b.S
      ? (Dk = b)
      : (a.google_persistent_state_async = Dk = new Bk());
  }
  function Ek(a) {
    return Fk[a] || "google_ps_" + a;
  }
  function Gk(a, b, c) {
    b = Ek(b);
    a = a.S;
    var d = a[b];
    return void 0 === d ? ((a[b] = c()), a[b]) : d;
  }
  function Hk(a, b, c) {
    return Gk(a, b, function () {
      return c;
    });
  }
  function Ik(a) {
    return !!Hk(Ck(), 30, a);
  }
  var Dk = null,
    Jk = {},
    Fk =
      ((Jk[8] = "google_prev_ad_formats_by_region"),
      (Jk[9] = "google_prev_ad_slotnames_by_region"),
      Jk);
  function Kk(a) {
    this.h = a || { cookie: "" };
  }
  Kk.prototype.set = function (a, b, c) {
    var d = !1;
    if ("object" === typeof c) {
      var e = c.bc;
      d = c.cc || !1;
      var f = c.domain || void 0;
      var g = c.path || void 0;
      var h = c.rb;
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    this.h.cookie =
      a +
      "=" +
      b +
      (f ? ";domain=" + f : "") +
      (g ? ";path=" + g : "") +
      (0 > h
        ? ""
        : 0 == h
        ? ";expires=" + new Date(1970, 1, 1).toUTCString()
        : ";expires=" + new Date(Date.now() + 1e3 * h).toUTCString()) +
      (d ? ";secure" : "") +
      (null != e ? ";samesite=" + e : "");
  };
  Kk.prototype.get = function (a, b) {
    for (
      var c = a + "=", d = (this.h.cookie || "").split(";"), e = 0, f;
      e < d.length;
      e++
    ) {
      f = Ua(d[e]);
      if (0 == f.lastIndexOf(c, 0)) return f.slice(c.length);
      if (f == a) return "";
    }
    return b;
  };
  Kk.prototype.isEmpty = function () {
    return !this.h.cookie;
  };
  Kk.prototype.clear = function () {
    for (
      var a = (this.h.cookie || "").split(";"), b = [], c = [], d, e, f = 0;
      f < a.length;
      f++
    )
      (e = Ua(a[f])),
        (d = e.indexOf("=")),
        -1 == d
          ? (b.push(""), c.push(e))
          : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    for (a = b.length - 1; 0 <= a; a--)
      (c = b[a]),
        this.get(c),
        this.set(c, "", { rb: 0, path: void 0, domain: void 0 });
  };
  function Lk(a) {
    K.call(this, a);
  }
  w(Lk, K);
  function Mk(a) {
    var b = new Lk();
    return D(b, 5, a);
  }
  function Nk() {
    this.v = this.v;
    this.A = this.A;
  }
  Nk.prototype.v = !1;
  Nk.prototype.j = function () {
    if (this.A) for (; this.A.length; ) this.A.shift()();
  };
  function Ok(a) {
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
  }
  function Pk(a, b, c) {
    b = void 0 === b ? 500 : b;
    c = void 0 === c ? !1 : c;
    Nk.call(this);
    this.h = a;
    this.i = null;
    this.m = {};
    this.J = 0;
    this.C = b;
    this.B = c;
    this.l = null;
  }
  w(Pk, Nk);
  Pk.prototype.j = function () {
    this.m = {};
    this.l && (Hc(this.h, "message", this.l), delete this.l);
    delete this.m;
    delete this.h;
    delete this.i;
    Nk.prototype.j.call(this);
  };
  function Qk(a) {
    return "function" === typeof a.h.__tcfapi || null != Rk(a);
  }
  Pk.prototype.addEventListener = function (a) {
    function b(g, h) {
      clearTimeout(f);
      g
        ? ((d = g),
          (d.internalErrorState = Ok(d)),
          (d.internalBlockOnErrors = c.B),
          (h && 0 === d.internalErrorState) ||
            ((d.tcString = "tcunavailable"), h || (d.internalErrorState = 3)))
        : ((d.tcString = "tcunavailable"), (d.internalErrorState = 3));
      a(d);
    }
    var c = this,
      d = { internalBlockOnErrors: this.B },
      e = Fc(function () {
        return a(d);
      }),
      f = 0;
    -1 !== this.C &&
      (f = setTimeout(function () {
        d.tcString = "tcunavailable";
        d.internalErrorState = 1;
        e();
      }, this.C));
    try {
      Sk(this, "addEventListener", b);
    } catch (g) {
      (d.tcString = "tcunavailable"),
        (d.internalErrorState = 3),
        f && (clearTimeout(f), (f = 0)),
        e();
    }
  };
  Pk.prototype.removeEventListener = function (a) {
    a && a.listenerId && Sk(this, "removeEventListener", null, a.listenerId);
  };
  function Sk(a, b, c, d) {
    c || (c = function () {});
    if ("function" === typeof a.h.__tcfapi) (a = a.h.__tcfapi), a(b, 2, c, d);
    else if (Rk(a)) {
      Tk(a);
      var e = ++a.J;
      a.m[e] = c;
      a.i &&
        ((c = {}),
        a.i.postMessage(
          ((c.__tcfapiCall = {
            command: b,
            version: 2,
            callId: e,
            parameter: d,
          }),
          c),
          "*"
        ));
    } else c({}, !1);
  }
  function Rk(a) {
    if (a.i) return a.i;
    a.i = ud(a.h, "__tcfapiLocator");
    return a.i;
  }
  function Tk(a) {
    a.l ||
      ((a.l = function (b) {
        try {
          var c = ("string" === typeof b.data ? JSON.parse(b.data) : b.data)
            .__tcfapiReturn;
          a.m[c.callId](c.returnValue, c.success);
        } catch (d) {}
      }),
      Gc(a.h, "message", a.l));
  }
  function Uk(a) {
    if (!1 === a.gdprApplies) return !0;
    void 0 === a.internalErrorState && (a.internalErrorState = Ok(a));
    return "error" === a.cmpStatus || 0 !== a.internalErrorState
      ? a.internalBlockOnErrors
        ? (se({ e: String(a.internalErrorState) }, "tcfe"), !1)
        : !0
      : "loaded" !== a.cmpStatus ||
        ("tcloaded" !== a.eventStatus && "useractioncomplete" !== a.eventStatus)
      ? !1
      : !0;
  }
  function Vk(a) {
    var b = a.u,
      c = a.Bb,
      d = a.hb;
    a = Wk({
      u: b,
      ga: a.ga,
      na: void 0 === a.na ? !1 : a.na,
      oa: void 0 === a.oa ? !1 : a.oa,
    });
    null != a.h || "tcunav" != a.i.message
      ? d(a)
      : Xk(b, c)
          .then(function (e) {
            return e.map(Yk);
          })
          .then(function (e) {
            return e.map(function (f) {
              return Zk(b, f);
            });
          })
          .then(d);
  }
  function Wk(a) {
    var b = a.u,
      c = a.ga,
      d = void 0 === a.na ? !1 : a.na;
    if ((a = (void 0 === a.oa ? 0 : a.oa) || !Qk(new Pk(b)))) {
      if (!d) {
        if (!(c = !c))
          if (((c = Ak(b)), null == c.h))
            tk.I(806, c.i, void 0, void 0), (c = !1);
          else if ((c = c.h.value) && null != C(c, 1, !1))
            b: switch (((c = C(c, 1)), c)) {
              case 1:
                c = !0;
                break b;
              default:
                throw Error("Unhandled AutoGdprFeatureStatus: " + c);
            }
          else c = !1;
        d = c;
      }
      a = d;
    }
    if (a) return Zk(b, Mk(!0));
    c = Ck();
    return (c = Hk(c, 24)) ? Zk(b, Yk(c)) : be(Error("tcunav"));
  }
  function Xk(a, b) {
    return q.Promise.race([$k(), al(a, b)]);
  }
  function $k() {
    return new q.Promise(function (a) {
      var b = Ck();
      a = { resolve: a };
      var c = Hk(b, 25, []);
      c.push(a);
      b.S[Ek(25)] = c;
    }).then(bl);
  }
  function al(a, b) {
    return new q.Promise(function (c) {
      a.setTimeout(c, b, be(Error("tcto")));
    });
  }
  function bl(a) {
    return a ? $d(a) : be(Error("tcnull"));
  }
  function Yk(a) {
    var b = void 0 === b ? !1 : b;
    if (Uk(a))
      if (
        !1 === a.gdprApplies ||
        "tcunavailable" === a.tcString ||
        (void 0 === a.gdprApplies && !b) ||
        "string" !== typeof a.tcString ||
        !a.tcString.length
      )
        a = !0;
      else {
        var c = void 0 === c ? "755" : c;
        b: {
          if (
            a.publisher &&
            a.publisher.restrictions &&
            ((b = a.publisher.restrictions["1"]), void 0 !== b)
          ) {
            b = b[void 0 === c ? "755" : c];
            break b;
          }
          b = void 0;
        }
        0 === b
          ? (a = !1)
          : a.purpose && a.vendor
          ? ((b = a.vendor.consents),
            (c = !(!b || !b[void 0 === c ? "755" : c])) &&
            a.purposeOneTreatment &&
            "CH" === a.publisherCC
              ? (a = !0)
              : (c && ((a = a.purpose.consents), (c = !(!a || !a["1"]))),
                (a = c)))
          : (a = !0);
      }
    else a = !1;
    return Mk(a);
  }
  function Zk(a, b) {
    a: {
      a = void 0 === a ? window : a;
      if (Zb(b, 5))
        try {
          var c = a.localStorage;
          break a;
        } catch (d) {}
      c = null;
    }
    return (b = c) ? $d(b) : be(Error("unav"));
  }
  function cl(a) {
    K.call(this, a);
  }
  w(cl, K);
  function dl(a) {
    K.call(this, a, -1, el);
  }
  w(dl, K);
  var el = [1, 2, 3];
  function fl(a) {
    this.exception = a;
  }
  function gl(a, b, c) {
    this.j = a;
    this.h = b;
    this.i = c;
  }
  gl.prototype.start = function () {
    this.l();
  };
  gl.prototype.l = function () {
    try {
      switch (this.j.document.readyState) {
        case "complete":
        case "interactive":
          hk(this.h, !0);
          hl(this);
          break;
        default:
          hk(this.h, !1) ? hl(this) : this.j.setTimeout(Pa(this.l, this), 100);
      }
    } catch (a) {
      hl(this, a);
    }
  };
  function hl(a, b) {
    try {
      var c = a.i,
        d = c.resolve,
        e = a.h;
      nj(e.h);
      I(e.i, $e, 1);
      d.call(c, new fl(b));
    } catch (f) {
      a.i.reject(f);
    }
  }
  var il = "a".charCodeAt(),
    jl = Kc(Nd),
    kl = Kc(Od);
  function ll(a) {
    if (/[^01]/.test(a)) throw Error("Input bitstring " + a + " is malformed!");
    this.i = a;
    this.h = 0;
  }
  function ml(a) {
    var b = nl(a, 16);
    return !0 === !!nl(a, 1)
      ? ((a = ol(a)),
        a.forEach(function (c) {
          if (c > b) throw Error("ID " + c + " is past MaxVendorId " + b + "!");
        }),
        a)
      : pl(a, b);
  }
  function ol(a) {
    for (var b = nl(a, 12), c = []; b--; ) {
      var d = !0 === !!nl(a, 1),
        e = nl(a, 16);
      if (d) for (d = nl(a, 16); e <= d; e++) c.push(e);
      else c.push(e);
    }
    c.sort(function (f, g) {
      return f - g;
    });
    return c;
  }
  function pl(a, b, c) {
    for (var d = [], e = 0; e < b; e++)
      if (nl(a, 1)) {
        var f = e + 1;
        if (c && -1 === c.indexOf(f))
          throw Error("ID: " + f + " is outside of allowed values!");
        d.push(f);
      }
    return d;
  }
  function nl(a, b) {
    if (a.h + b > a.i.length)
      throw Error("Requested length " + b + " is past end of string.");
    var c = a.i.substring(a.h, a.h + b);
    a.h += b;
    return parseInt(c, 2);
  }
  function ql(a, b) {
    try {
      var c = qb(a.split(".")[0])
          .map(function (e) {
            return ((aa = e.toString(2)), t(aa, "padStart")).call(aa, 8, "0");
          })
          .join(""),
        d = new ll(c);
      c = {};
      c.tcString = a;
      c.gdprApplies = !0;
      d.h += 78;
      c.cmpId = nl(d, 12);
      c.cmpVersion = nl(d, 12);
      d.h += 30;
      c.tcfPolicyVersion = nl(d, 6);
      c.isServiceSpecific = !!nl(d, 1);
      c.useNonStandardStacks = !!nl(d, 1);
      c.specialFeatureOptins = rl(pl(d, 12, kl), kl);
      c.purpose = {
        consents: rl(pl(d, 24, jl), jl),
        legitimateInterests: rl(pl(d, 24, jl), jl),
      };
      c.purposeOneTreatment = !!nl(d, 1);
      c.publisherCC =
        String.fromCharCode(il + nl(d, 6)) + String.fromCharCode(il + nl(d, 6));
      c.vendor = { consents: rl(ml(d), b), legitimateInterests: rl(ml(d), b) };
      return c;
    } catch (e) {
      return null;
    }
  }
  function rl(a, b) {
    var c = {};
    if (Array.isArray(b) && 0 !== b.length) {
      b = v(b);
      for (var d = b.next(); !d.done; d = b.next())
        (d = d.value), (c[d] = -1 !== a.indexOf(d));
    } else for (a = v(a), d = a.next(); !d.done; d = a.next()) c[d.value] = !0;
    delete c[0];
    return c;
  }
  function sl(a) {
    this.key = a;
    this.defaultValue = !1;
    this.valueType = "boolean";
  }
  function tl() {
    this.h = {};
  }
  function ul(a) {
    vl || (vl = new wl());
    var b = vl.h[a.key];
    if ("proto" === a.valueType) {
      try {
        var c = JSON.parse(b);
        if (Array.isArray(c)) return c;
      } catch (d) {}
      return a.defaultValue;
    }
    return typeof b === typeof a.defaultValue ? b : a.defaultValue;
  }
  function xl(a) {
    K.call(this, a);
  }
  w(xl, K);
  function yl(a) {
    K.call(this, a);
  }
  w(yl, K);
  function zl(a) {
    K.call(this, a);
  }
  w(zl, K);
  var Al = [11, 8, 12, 13, 15, 17, 19, 18, 20, 21, 22, 24, 25, 26];
  function Bl() {}
  function Cl(a) {
    K.call(this, a, -1, Dl);
  }
  w(Cl, K);
  function El(a) {
    K.call(this, a);
  }
  w(El, K);
  function Fl(a) {
    K.call(this, a);
  }
  w(Fl, K);
  var Dl = [7];
  var Gl = new sl("45368529"),
    Hl = new sl("45369554");
  function wl() {
    this.h = {};
    var a = x.__fcexpdef || "";
    try {
      var b = JSON.parse(a)[0];
      a = "";
      for (var c = 0; c < b.length; c++)
        a += String.fromCharCode(
          b.charCodeAt(c) ^
            "\u0003\u0007\u0003\u0007\b\u0004\u0004\u0006\u0005\u0003".charCodeAt(
              c % 10
            )
        );
      this.h = JSON.parse(a);
    } catch (d) {}
  }
  var vl;
  w(wl, tl);
  function Il(a) {
    return (a = Jl(a)) ? H(a, El, 4) : null;
  }
  function Jl(a) {
    if ((a = new Kk(a).get("FCCDCF", "")))
      if (ul(Gl))
        if (t(a, "startsWith").call(a, "%"))
          try {
            var b = decodeURIComponent(a);
          } catch (c) {
            Kl(1), (b = null);
          }
        else b = a;
      else b = a;
    else b = null;
    try {
      return b ? sc(Cl, b) : null;
    } catch (c) {
      return Kl(2), null;
    }
  }
  function Kl(a) {
    new Bl();
    var b = new yl();
    a = D(b, 7, a);
    b = new xl();
    a = gc(b, 1, a);
    b = new zl();
    hc(b, 22, Al, a);
    ul(Hl);
  }
  Kc(Nd).map(function (a) {
    return Number(a);
  });
  Kc(Od).map(function (a) {
    return Number(a);
  });
  function Ll(a) {
    this.h = a;
    this.i = null;
  }
  function Ml(a) {
    a.__tcfapiPostMessageReady || Nl(new Ll(a));
  }
  function Nl(a) {
    a.i = function (b) {
      var c = "string" == typeof b.data;
      try {
        var d = c ? JSON.parse(b.data) : b.data;
      } catch (f) {
        return;
      }
      var e = d.__tcfapiCall;
      !e ||
        ("ping" !== e.command &&
          "getTCData" !== e.command &&
          "addEventListener" !== e.command &&
          "removeEventListener" !== e.command) ||
        a.h.__tcfapi(
          e.command,
          e.version,
          function (f, g) {
            var h = {};
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
    a.h.addEventListener("message", a.i);
    a.h.__tcfapiPostMessageReady = !0;
  }
  function Ol(a, b) {
    function c() {
      if (!a.frames[b])
        if (d.body) {
          var e = id("IFRAME", d);
          e.style.display = "none";
          e.style.width = "0px";
          e.style.height = "0px";
          e.style.border = "none";
          e.style.zIndex = "-1000";
          e.style.left = "-1000px";
          e.style.top = "-1000px";
          e.name = b;
          d.body.appendChild(e);
        } else a.setTimeout(c, 5);
    }
    var d = a.document;
    c();
  }
  function Pl(a) {
    this.h = a;
    this.i = a.document;
    this.m = (a = (a = Jl(this.i)) ? H(a, Fl, 5) || null : null)
      ? C(a, 2)
      : null;
    this.j = (a = Il(this.i)) && null != C(a, 1) ? C(a, 1) : null;
    this.l = (a = Il(this.i)) && null != C(a, 2) ? C(a, 2) : null;
  }
  function Ql() {
    var a = window,
      b = Q(sf);
    a.__uspapi ||
      a.frames.__uspapiLocator ||
      ((a = new Pl(a)), Rl(a), b && Sl(a));
  }
  function Rl(a) {
    !a.m ||
      a.h.__uspapi ||
      a.h.frames.__uspapiLocator ||
      ((a.h.__uspapiManager = "fc"),
      Ol(a.h, "__uspapiLocator"),
      Ra("__uspapi", function () {
        return a.A.apply(a, ka(Ea.apply(0, arguments)));
      }));
  }
  Pl.prototype.A = function (a, b, c) {
    "function" === typeof c &&
      "getUSPData" === a &&
      c({ version: 1, uspString: this.m }, !0);
  };
  function Sl(a) {
    !a.j ||
      a.h.__tcfapi ||
      a.h.frames.__tcfapiLocator ||
      ((a.h.__tcfapiManager = "fc"),
      Ol(a.h, "__tcfapiLocator"),
      (a.h.__tcfapiEventListeners = a.h.__tcfapiEventListeners || []),
      Ra("__tcfapi", function () {
        return a.v.apply(a, ka(Ea.apply(0, arguments)));
      }),
      Ml(a.h));
  }
  Pl.prototype.v = function (a, b, c, d) {
    d = void 0 === d ? null : d;
    if ("function" === typeof c)
      if (b && 2 !== b) c(null, !1);
      else
        switch (((b = this.h.__tcfapiEventListeners), a)) {
          case "getTCData":
            !d ||
            (Array.isArray(d) &&
              d.every(function (e) {
                return "number" === typeof e;
              }))
              ? c(Tl(this, d, null), !0)
              : c(null, !1);
            break;
          case "ping":
            c({
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
            a = b.push(c);
            c(Tl(this, null, a - 1), !0);
            break;
          case "removeEventListener":
            b[d] ? ((b[d] = null), c(!0)) : c(!1);
            break;
          case "getInAppTCData":
          case "getVendorList":
            c(null, !1);
        }
  };
  function Tl(a, b, c) {
    if (!a.j) return null;
    b = ql(a.j, b);
    b.addtlConsent = null != a.l ? a.l : void 0;
    b.cmpStatus = "loaded";
    b.eventStatus = "tcloaded";
    null != c && (b.listenerId = c);
    return b;
  }
  function Ul(a) {
    var b = /[a-zA-Z0-9._~-]/,
      c = /%[89a-zA-Z]./;
    return a.replace(/(%[a-zA-Z0-9]{2})/g, function (d) {
      if (!d.match(c)) {
        var e = decodeURIComponent(d);
        if (e.match(b)) return e;
      }
      return d.toUpperCase();
    });
  }
  function Vl(a) {
    for (var b = "", c = /[/%?&=]/, d = 0; d < a.length; ++d) {
      var e = a[d];
      b = e.match(c) ? b + e : b + encodeURIComponent(e);
    }
    return b;
  }
  function Wl(a) {
    a = Yb(a, 2, 0, !1, Bb(a.s));
    if (!a) return !1;
    for (var b = 0; b < a.length; b++) if (1 == a[b]) return !0;
    return !1;
  }
  function Xl(a, b) {
    a = Vl(Ul(a.location.pathname)).replace(/(^\/)|(\/$)/g, "");
    var c = pd(a),
      d = Yl(a);
    return (
      t(b, "find").call(b, function (e) {
        var f = void 0 !== Vb(e, Ej, 7, !1) ? C(H(e, Ej, 7), 1) : C(e, 1);
        e = void 0 !== Vb(e, Ej, 7, !1) ? C(H(e, Ej, 7), 2) : 2;
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
  }
  function Yl(a) {
    for (var b = {}; ; ) {
      b[pd(a)] = !0;
      if (!a) return b;
      a = a.substring(0, a.lastIndexOf("/"));
    }
  }
  var Zl = {},
    $l = ((Zl.google_ad_channel = !0), (Zl.google_ad_host = !0), Zl);
  function am(a, b) {
    a.location.href &&
      a.location.href.substring &&
      (b.url = a.location.href.substring(0, 200));
    xk("ama", b, 0.01);
  }
  function bm(a) {
    var b = {};
    od($l, function (c, d) {
      d in a && (b[d] = a[d]);
    });
    return b;
  }
  function cm(a) {
    a = H(a, Bj, 3);
    return !a || C(a, 1) <= Date.now() ? !1 : !0;
  }
  function dm(a) {
    if (Q(of)) var b = null;
    else
      try {
        b = a.getItem("google_ama_config");
      } catch (d) {
        b = null;
      }
    try {
      var c = b ? sc(zj, b) : null;
    } catch (d) {
      c = null;
    }
    return c;
  }
  function em(a) {
    K.call(this, a);
  }
  w(em, K);
  function fm(a) {
    K.call(this, a, -1, gm);
  }
  w(fm, K);
  var gm = [1];
  function hm(a) {
    K.call(this, a, -1, im);
  }
  w(hm, K);
  hm.prototype.getId = function () {
    return jc(C(this, 1), 0);
  };
  hm.prototype.V = function () {
    return G(this, 7);
  };
  var im = [2];
  function jm(a) {
    K.call(this, a, -1, km);
  }
  w(jm, K);
  jm.prototype.V = function () {
    return G(this, 5);
  };
  var km = [2];
  function lm(a) {
    K.call(this, a, -1, mm);
  }
  w(lm, K);
  function nm(a) {
    K.call(this, a, -1, om);
  }
  w(nm, K);
  nm.prototype.V = function () {
    return G(this, 1);
  };
  function pm(a) {
    K.call(this, a);
  }
  w(pm, K);
  var mm = [1, 4, 2, 3],
    om = [2];
  function qm(a) {
    K.call(this, a, -1, rm);
  }
  w(qm, K);
  function sm(a) {
    return mc(a, fm, 14, Xb);
  }
  var rm = [19],
    Xb = [13, 14];
  var tm = void 0;
  function um() {
    wc(tm, uc);
    return tm;
  }
  function vm(a) {
    wc(tm, jg);
    tm = a;
  }
  function wm(a, b, c, d) {
    c = void 0 === c ? "" : c;
    return 1 === b && xm(c, void 0 === d ? null : d)
      ? !0
      : ym(a, c, function (e) {
          return fb(I(e, zc, 2), function (f) {
            return C(f, 1) === b;
          });
        });
  }
  function xm(a, b) {
    return !b || (J(b, 22) && !Q(zf))
      ? !1
      : Ub(b, em, 13)
      ? J(mc(b, em, 13, Xb), 1)
      : Ub(b, fm, 14) &&
        "" !== a &&
        1 === $b(sm(b), 1).length &&
        $b(sm(b), 1)[0] === a
      ? J(H(sm(b), em, 2), 1)
      : !1;
  }
  function zm(a, b) {
    b = jc(C(b, 18), 0);
    -1 !== b && (a.tmod = b);
  }
  function Am(a) {
    var b = void 0 === b ? "" : b;
    var c = fd(M) || M;
    return Bm(c, a)
      ? !0
      : ym(M, b, function (d) {
          return fb(Yb(d, 3, 0, !1, Bb(d.s)), function (e) {
            return e === a;
          });
        });
  }
  function Cm(a) {
    return ym(x, void 0 === a ? "" : a, function () {
      return !0;
    });
  }
  function Bm(a, b) {
    a =
      (a =
        (a = a.location && a.location.hash) &&
        a.match(/forced_clientside_labs=([\d,]+)/)) && a[1];
    return !!a && ib(a.split(","), b.toString());
  }
  function ym(a, b, c) {
    a = fd(a) || a;
    var d = Dm(a);
    b && (b = Md(String(b)));
    return Jc(d, function (e, f) {
      return (
        Object.prototype.hasOwnProperty.call(d, f) && (!b || b === f) && c(e)
      );
    });
  }
  function Dm(a) {
    a = Em(a);
    var b = {};
    od(a, function (c, d) {
      try {
        var e = new xc(c);
        b[d] = e;
      } catch (f) {}
    });
    return b;
  }
  function Em(a) {
    return Q(kf)
      ? ((a = Wk({ u: a, ga: um() })), null != a.h ? Fm(a.h.value) : {})
      : Fm(a.localStorage);
  }
  function Fm(a) {
    try {
      var b = a.getItem("google_adsense_settings");
      if (!b) return {};
      var c = JSON.parse(b);
      return c !== Object(c)
        ? {}
        : Ic(c, function (d, e) {
            return (
              Object.prototype.hasOwnProperty.call(c, e) &&
              "string" === typeof e &&
              Array.isArray(d)
            );
          });
    } catch (d) {
      return {};
    }
  }
  function Gm(a) {
    Q(tf) && xk("atf_ad_settings_from_ppabg", { p_s: a }, 0.01);
  }
  function Hm(a) {
    return !!a && (0 < I(a, $e, 1).length || (Q(pf) && 0 < I(a, Xe, 3).length));
  }
  function T(a) {
    a.google_ad_modifications || (a.google_ad_modifications = {});
    return a.google_ad_modifications;
  }
  function Im(a) {
    a = T(a);
    var b = a.space_collapsing || "none";
    return a.remove_ads_by_default
      ? { Ia: !0, Ab: b, sa: a.ablation_viewport_offset }
      : null;
  }
  function Jm(a, b) {
    a = T(a);
    a.had_ads_ablation = !0;
    a.remove_ads_by_default = !0;
    a.space_collapsing = "slot";
    a.ablation_viewport_offset = b;
  }
  function Km(a) {
    T(M).allow_second_reactive_tag = a;
  }
  function Lm() {
    var a = T(window);
    a.afg_slotcar_vars || (a.afg_slotcar_vars = {});
    return a.afg_slotcar_vars;
  }
  function Mm(a) {
    var b, c;
    return null !=
      (c =
        null ==
        (b = a.document.querySelector(
          'meta[name="google-adsense-platform-account"]'
        ))
          ? void 0
          : b.getAttribute("content"))
      ? c
      : null;
  }
  function Nm(a, b, c, d) {
    Om(new Pm(a, b, c, d));
  }
  function Pm(a, b, c, d) {
    this.u = a;
    this.i = b;
    this.j = c;
    this.h = d;
  }
  function Om(a) {
    ae(
      Zd(Wk({ u: a.u, ga: J(a.i, 6) }), function (b) {
        Qm(a, b, !0);
      }),
      function () {
        Rm(a);
      }
    );
  }
  function Qm(a, b, c) {
    ae(
      Zd(Sm(b), function (d) {
        Tm("ok");
        a.h(d, { fromLocalStorage: !0 });
      }),
      function () {
        var d = a.u;
        try {
          b.removeItem("google_ama_config");
        } catch (e) {
          am(d, { lserr: 1 });
        }
        c ? Rm(a) : a.h(null, null);
      }
    );
  }
  function Rm(a) {
    ae(
      Zd(Um(a), function (b) {
        a.h(b, { fromPABGSettings: !0 });
      }),
      function () {
        Vm(a);
      }
    );
  }
  function Vm(a) {
    Vk({
      u: a.u,
      ga: J(a.i, 6),
      Bb: 50,
      hb: function (b) {
        Wm(a, b);
      },
    });
  }
  function Sm(a) {
    return (a = (a = dm(a)) ? (cm(a) ? a : null) : null)
      ? $d(a)
      : be(Error("invlocst"));
  }
  function Um(a) {
    var b = a.u,
      c,
      d,
      e;
    if (
      (null !=
      (e =
        null == (c = T(b))
          ? void 0
          : null == (d = c.head_tag_slot_vars)
          ? void 0
          : d.google_ad_host)
        ? e
        : Mm(b)) &&
      (!J(a.i, 22) || !Q(yf))
    )
      return be(Error("invtag"));
    a: if (((b = a.u), (c = a.j), (a = a.i), null == a ? 0 : Ub(a, em, 13))) {
      var f, g;
      var h =
        null == a
          ? void 0
          : null == (f = mc(a, em, 13, Xb))
          ? void 0
          : null == (g = H(f, cl, 2))
          ? void 0
          : H(g, dl, 2);
      Hm(h) ? Gm(!1) : (h = null);
    } else {
      if (null == a ? 0 : Ub(a, fm, 14)) {
        var k;
        f = null == a ? void 0 : null == (k = sm(a)) ? void 0 : $b(k, 1);
        var l, m;
        g =
          null == a
            ? void 0
            : null == (h = sm(a))
            ? void 0
            : null == (l = H(h, em, 2))
            ? void 0
            : null == (m = H(l, cl, 2))
            ? void 0
            : H(m, dl, 2);
        if (
          f &&
          1 === f.length &&
          f[0] === c &&
          Hm(g) &&
          kc(a, 17) === b.location.host
        ) {
          Gm(!0);
          h = g;
          break a;
        }
      }
      h = null;
    }
    h
      ? ((l = new zj()),
        (m = I(h, $e, 1)),
        (l = ic(l, 1, m)),
        (m = I(h, Cj, 2)),
        (l = ic(l, 7, m)),
        Q(pf) &&
          0 < I(h, Xe, 3).length &&
          ((m = new Te()), (h = I(h, Xe, 3)), (h = ic(m, 1, h)), gc(l, 6, h)),
        (h = $d(l)))
      : (h = be(Error("invtag")));
    return h;
  }
  function Wm(a, b) {
    ae(
      Zd(b, function (c) {
        Qm(a, c, !1);
      }),
      function (c) {
        Tm(c.message);
        a.h(null, null);
      }
    );
  }
  function Tm(a) {
    xk(
      "abg::amalserr",
      { status: a, guarding: "true", timeout: 50, rate: 0.01 },
      0.01
    );
  }
  function Xm(a, b, c, d) {
    try {
      var e = Xl(a, I(c, Cj, 7));
      if (e && Wl(e)) {
        if (C(e, 4)) {
          var f = {},
            g = new le(null, ((f.google_package = C(e, 4)), f));
          d = me(d, g);
        }
        var h = new gk(a, b, c, e, d);
        ij(
          1e3,
          function () {
            var k = new Pd();
            new gl(a, h, k).start();
            return k.i;
          },
          a
        ).then(Qa(Ym, a), Qa(Zm, a));
      }
    } catch (k) {
      am(a, { atf: -1 });
    }
  }
  function Ym(a) {
    am(a, { atf: 1 });
  }
  function Zm(a, b) {
    (a.google_ama_state = a.google_ama_state || {}).exception = b;
    am(a, { atf: 0 });
  }
  lb || !z("Safari") || Za();
  function $m() {
    var a = this;
    this.promise = new q.Promise(function (b, c) {
      a.resolve = b;
      a.reject = c;
    });
  }
  function an() {
    var a = new $m();
    return { promise: a.promise, resolve: a.resolve };
  }
  function bn(a) {
    a = void 0 === a ? function () {} : a;
    x.google_llp || (x.google_llp = {});
    var b = x.google_llp,
      c = b[7];
    if (c) return c;
    c = an();
    b[7] = c;
    a();
    return c;
  }
  function cn(a) {
    return bn(function () {
      gd(x.document, a);
    }).promise;
  }
  function dn(a) {
    var b = {};
    return { enable_page_level_ads: ((b.pltais = !0), b), google_ad_client: a };
  }
  function en(a) {
    if (x.google_apltlad || x !== x.top || !a.google_ad_client) return null;
    x.google_apltlad = !0;
    var b = dn(a.google_ad_client),
      c = b.enable_page_level_ads;
    od(a, function (d, e) {
      aj[e] && "google_ad_client" !== e && (c[e] = d);
    });
    c.google_pgb_reactive = 7;
    Q(Gf) &&
      ((c.easpi = Q(Gf)),
      Q(Ff) && (c.easpa = !0),
      (c.asntp = bg(Mf)),
      (c.asntpv = bg(Qf)),
      (c.asntpl = bg(Of)),
      (c.asntpm = bg(Pf)),
      (c.asntpc = bg(Nf)),
      (c.asna = bg(If)),
      (c.asnd = bg(Jf)),
      (c.asnp = bg(Kf)),
      (c.asns = bg(Lf)),
      (c.asmat = bg(Hf)),
      (c.asptt = bg(Sf)),
      (c.aspe = Q(Rf)),
      (c.asro = Q(Tf)));
    if ("google_ad_section" in a || "google_ad_region" in a)
      c.google_ad_section = a.google_ad_section || a.google_ad_region;
    return b;
  }
  function fn(a) {
    return (
      Ja(a.enable_page_level_ads) &&
      7 === a.enable_page_level_ads.google_pgb_reactive
    );
  }
  function gn(a, b) {
    T(M).ama_ran_on_page ||
      ij(
        1001,
        function () {
          return hn(new jn(a, b));
        },
        x
      );
  }
  function jn(a, b) {
    this.h = x;
    this.i = a;
    this.j = b;
  }
  function hn(a) {
    Nm(a.h, a.j, a.i.google_ad_client || "", function (b, c) {
      var d = a.h,
        e = a.i;
      T(M).ama_ran_on_page || (b && kn(d, e, b, c));
    });
  }
  function kn(a, b, c, d) {
    d && (nj(a).configSourceInAbg = d);
    if (void 0 !== Vb(c, uj, 24, !1)) {
      d = oj(a);
      d.availableAbg = !0;
      var e, f;
      d.ablationFromStorage = !!(null == (e = H(c, uj, 24))
        ? 0
        : null == (f = H(e, wj, 3))
        ? 0
        : mc(f, xj, 2, yj));
    }
    if (fn(b) && ((e = Xl(a, I(c, Cj, 7))), !e || !Zb(e, 8))) return;
    T(M).ama_ran_on_page = !0;
    var g;
    if (null == (g = H(c, Hj, 15)) ? 0 : Zb(g, 23))
      T(a).enable_overlap_observer = !0;
    if ((g = H(c, Fj, 13)) && 1 === C(g, 1)) {
      var h = 0,
        k = H(g, Gj, 6);
      k && C(k, 3) && (h = C(k, 3) || 0);
      Jm(a, h);
    } else if (
      null == (h = H(c, uj, 24))
        ? 0
        : null == (k = H(h, wj, 3))
        ? 0
        : mc(k, xj, 2, yj)
    )
      (oj(a).ablatingThisPageview = !0), Jm(a, 1);
    Fd(3, [c.toJSON()]);
    var l = b.google_ad_client || "";
    b = bm(Ja(b.enable_page_level_ads) ? b.enable_page_level_ads : {});
    var m = me(qe, new le(null, b));
    vk(782, function () {
      Xm(a, l, c, m);
    });
  }
  var ln = {},
    mn =
      ((ln.google_ad_modifications = !0),
      (ln.google_analytics_domain_name = !0),
      (ln.google_analytics_uacct = !0),
      (ln.google_pause_ad_requests = !0),
      (ln.google_user_agent_client_hint = !0),
      ln);
  function nn(a) {
    return (a = a.innerText || a.innerHTML) &&
      (a = a
        .replace(/^\s+/, "")
        .split(/\r?\n/, 1)[0]
        .match(/^\x3c!--+(.*?)(?:--+>)?\s*$/)) &&
      RegExp("google_ad_client").test(a[1])
      ? a[1]
      : null;
  }
  function on(a) {
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
  }
  function pn(a) {
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
          var b = a.match(/^(?:'(.*)'|"(.*)")$/);
          if (b) return b[1] || b[2] || "";
          if (/^[-+]?\d*(\.\d+)?$/.test(a)) {
            var c = parseFloat(a);
            return c === c ? c : void 0;
          }
        } catch (d) {}
    }
  }
  function qn(a) {
    if (a.google_ad_client) return String(a.google_ad_client);
    var b, c, d, e, f;
    if (
      null !=
      (e =
        null !=
        (d =
          null == (b = T(a).head_tag_slot_vars) ? void 0 : b.google_ad_client)
          ? d
          : null ==
            (c = a.document.querySelector(".adsbygoogle[data-ad-client]"))
          ? void 0
          : c.getAttribute("data-ad-client"))
    )
      b = e;
    else {
      b: {
        b = a.document.getElementsByTagName("script");
        a = (a.navigator && a.navigator.userAgent) || "";
        a =
          RegExp(
            "appbankapppuzdradb|daumapps|fban|fbios|fbav|fb_iab|gsa/|messengerforios|naver|niftyappmobile|nonavigation|pinterest|twitter|ucbrowser|yjnewsapp|youtube",
            "i"
          ).test(a) ||
          (/i(phone|pad|pod)/i.test(a) &&
            /applewebkit/i.test(a) &&
            !/version|safari/i.test(a) &&
            !Ld())
            ? nn
            : on;
        for (c = b.length - 1; 0 <= c; c--)
          if (
            ((d = b[c]),
            !d.google_parsed_script_for_pub_code &&
              ((d.google_parsed_script_for_pub_code = !0), (d = a(d))))
          ) {
            b = d;
            break b;
          }
        b = null;
      }
      if (b) {
        a = /(google_\w+) *= *(['"]?[\w.-]+['"]?) *(?:;|$)/gm;
        for (c = {}; (d = a.exec(b)); ) c[d[1]] = pn(d[2]);
        b = c.google_ad_client ? c.google_ad_client : "";
      } else b = "";
    }
    return null != (f = b) ? f : "";
  }
  function rn(a, b) {
    var c = 10;
    return Da(function (d) {
      return 0 >= c
        ? d.return(q.Promise.reject())
        : b()
        ? d.return(q.Promise.resolve())
        : d.return(
            new q.Promise(function (e, f) {
              var g = a.setInterval(function () {
                --c
                  ? b() && (a.clearInterval(g), e())
                  : (a.clearInterval(g), f());
              }, 200);
            })
          );
    });
  }
  function sn(a) {
    this.u = Hd() || window;
    this.h = null != a ? a : new wh(100);
    if (Q(lf))
      this.state = Gk(Ck(), 33, function () {
        var c = bg(mf);
        return {
          sd: c,
          ssp: 0 < c && nd() < 1 / c,
          pc: null,
          wpc: null,
          le: [],
          lgdp: [],
        };
      });
    else {
      a = bg(mf);
      var b = Ik(0 < a && nd() < 1 / a);
      this.state = { sd: a, ssp: b, pc: null, wpc: null, le: [], lgdp: [] };
    }
  }
  function tn(a, b) {
    var c = new Rg();
    var d = un(a);
    c = D(c, 1, d);
    d = vn(a);
    c = D(c, 2, d);
    c = D(c, 3, a.state.sd);
    return D(c, 7, Math.round(b || a.u.performance.now()));
  }
  function un(a) {
    var b = a.state.pc;
    return null !== b && 0 !== b ? b : (a.state.pc = Ad(a.u));
  }
  function vn(a) {
    var b = a.state.wpc;
    return null !== b && "" !== b ? b : (a.state.wpc = qn(a.u));
  }
  function wn() {
    var a = P(sn),
      b,
      c,
      d;
    Da(function (e) {
      if (1 == e.h) {
        if (!a.i || t(a.state.le, "includes").call(a.state.le, 1))
          return e.return();
        a.state.le.push(1);
        b = a.u.performance.now();
        return wa(
          e,
          rn(a.u, function () {
            return !(!un(a) || !vn(a));
          })
        );
      }
      c = Ng(
        Og(
          new Mg(),
          Lg(Kg(new Jg(), Ie(a.u).scrollWidth), Ie(a.u).scrollHeight)
        ),
        Lg(Kg(new Jg(), Je(a.u)), Ie(a.u).clientHeight)
      );
      Q(vf) && ((d = Gi(a.u)), 0 !== d && Pg(c, Ig(d)));
      ph(a.h, Sg(tn(a, b), c));
      vh(a.h, a.u, function () {
        var f = a.h;
        var g = tn(a);
        var h = new Qg();
        g = hc(g, 8, Tg, h);
        ph(f, g);
      });
      e.h = 0;
    });
  }
  function xn(a, b) {
    var c = P(sn),
      d;
    Da(function (e) {
      if (1 == e.h) {
        if (
          !c.i ||
          !b.length ||
          t(c.state.lgdp, "includes").call(c.state.lgdp, Number(a))
        )
          return e.return();
        c.state.lgdp.push(Number(a));
        d = c.u.performance.now();
        return wa(
          e,
          rn(c.u, function () {
            return !(!un(c) || !vn(c));
          })
        );
      }
      ph(c.h, Ug(tn(c, d), Gg(Fg(new Dg(), a), b)));
      e.h = 0;
    });
  }
  ea.Object.defineProperties(sn.prototype, {
    i: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.state.ssp;
      },
    },
  });
  function yn(a, b) {
    return a instanceof HTMLScriptElement && b.test(a.src) ? 0 : 1;
  }
  function zn(a) {
    var b = M.document;
    if (b.currentScript) return yn(b.currentScript, a);
    b = v(b.scripts);
    for (var c = b.next(); !c.done; c = b.next())
      if (0 === yn(c.value, a)) return 0;
    return 1;
  }
  function An(a, b) {
    var c = {},
      d = {},
      e = {},
      f = {};
    return (
      (f[pg] =
        ((c[55] = function () {
          return 0 === a;
        }),
        (c[23] = function (g) {
          return wm(M, Number(g));
        }),
        (c[24] = function (g) {
          return Am(Number(g));
        }),
        (c[61] = function () {
          return J(b, 6);
        }),
        (c[63] = function () {
          return J(b, 6) || ".google.ch" === kc(b, 8);
        }),
        c)),
      (f[qg] =
        ((d[7] = function (g) {
          try {
            var h = window.localStorage;
          } catch (p) {
            h = null;
          }
          g = Number(g);
          g = void 0 === g ? 0 : g;
          g = 0 !== g ? "google_experiment_mod" + g : "google_experiment_mod";
          a: {
            var k = -1;
            try {
              h && (k = parseInt(h.getItem(g), 10));
            } catch (p) {
              k = null;
              break a;
            }
            k = 0 <= k && 1e3 > k ? k : null;
          }
          if (null === k) {
            k = md() ? null : Math.floor(1e3 * nd());
            var l;
            if ((l = null != k && h))
              a: {
                var m = String(k);
                try {
                  if (h) {
                    h.setItem(g, m);
                    l = m;
                    break a;
                  }
                } catch (p) {}
                l = null;
              }
            h = l ? k : null;
          } else h = k;
          return null != h ? h : void 0;
        }),
        d)),
      (f[rg] =
        ((e[6] = function () {
          return kc(b, 15);
        }),
        e)),
      f
    );
  }
  function Bn(a) {
    a = void 0 === a ? x : a;
    return a.ggeac || (a.ggeac = {});
  }
  function Cn() {
    var a = P(ag).h(Cf.h, Cf.defaultValue),
      b = M.document;
    b = void 0 === b ? window.document : b;
    zd(a, b);
  }
  function Dn(a, b) {
    try {
      var c = a.split(".");
      a = x;
      for (var d = 0, e; null != a && d < c.length; d++)
        (e = a), (a = a[c[d]]), "function" === typeof a && (a = e[c[d]]());
      var f = a;
      if (typeof f === b) return f;
    } catch (g) {}
  }
  function En() {
    var a = {};
    this[pg] =
      ((a[8] = function (b) {
        try {
          return null != Ha(b);
        } catch (c) {}
      }),
      (a[9] = function (b) {
        try {
          var c = Ha(b);
        } catch (d) {
          return;
        }
        if ((b = "function" === typeof c))
          (c = c && c.toString && c.toString()),
            (b = "string" === typeof c && -1 != c.indexOf("[native code]"));
        return b;
      }),
      (a[10] = function () {
        return window == window.top;
      }),
      (a[6] = function (b) {
        return ib(P(si).i(), parseInt(b, 10));
      }),
      (a[27] = function (b) {
        b = Dn(b, "boolean");
        return void 0 !== b ? b : void 0;
      }),
      (a[60] = function (b) {
        try {
          return !!x.document.querySelector(b);
        } catch (c) {}
      }),
      (a[69] = function (b) {
        var c = x.document;
        c = void 0 === c ? document : c;
        var d;
        return !(
          null == (d = c.featurePolicy) ||
          !((aa = d.features()), t(aa, "includes")).call(aa, b)
        );
      }),
      (a[70] = function (b) {
        var c = x.document;
        c = void 0 === c ? document : c;
        var d;
        return !(
          null == (d = c.featurePolicy) ||
          !((aa = d.allowedFeatures()), t(aa, "includes")).call(aa, b)
        );
      }),
      a);
    a = {};
    this[qg] =
      ((a[3] = function () {
        return vd();
      }),
      (a[6] = function (b) {
        b = Dn(b, "number");
        return void 0 !== b ? b : void 0;
      }),
      (a[11] = function (b) {
        b = void 0 === b ? "" : b;
        var c = x;
        b = void 0 === b ? "" : b;
        c = void 0 === c ? window : c;
        b = (c = (c = c.location.href.match(bd)[3] || null) ? decodeURI(c) : c)
          ? pd(c + b)
          : null;
        return null == b ? void 0 : b % 1e3;
      }),
      a);
    a = {};
    this[rg] =
      ((a[2] = function () {
        return window.location.href;
      }),
      (a[3] = function () {
        try {
          return window.top.location.hash;
        } catch (b) {
          return "";
        }
      }),
      (a[4] = function (b) {
        b = Dn(b, "string");
        return void 0 !== b ? b : void 0;
      }),
      (a[10] = function () {
        try {
          var b = x.document;
          return (
            b.visibilityState ||
            b.webkitVisibilityState ||
            b.mozVisibilityState ||
            ""
          );
        } catch (c) {
          return "";
        }
      }),
      (a[11] = function () {
        try {
          var b, c, d, e, f;
          return null !=
            (f =
              null ==
              (d =
                null == (b = Ha("google_tag_data"))
                  ? void 0
                  : null == (c = b.uach)
                  ? void 0
                  : c.fullVersionList)
                ? void 0
                : null ==
                  (e = t(d, "find").call(d, function (g) {
                    return "Google Chrome" === g.brand;
                  }))
                ? void 0
                : e.version)
            ? f
            : "";
        } catch (g) {
          return "";
        }
      }),
      a);
  }
  var Fn = [12, 13, 20];
  function Gn() {}
  Gn.prototype.init = function (a, b, c, d) {
    var e = this;
    d = void 0 === d ? {} : d;
    var f = void 0 === d.Ma ? !1 : d.Ma,
      g = void 0 === d.sb ? {} : d.sb;
    d = void 0 === d.ub ? [] : d.ub;
    this.l = a;
    this.v = {};
    this.A = f;
    this.m = g;
    a = {};
    this.i = ((a[b] = []), (a[4] = []), a);
    this.j = {};
    (b = xi()) &&
      cb(b.split(",") || [], function (h) {
        (h = parseInt(h, 10)) && (e.j[h] = !0);
      });
    cb(d, function (h) {
      e.j[h] = !0;
    });
    this.h = c;
    return this;
  };
  function Hn(a, b, c) {
    var d = [],
      e = In(a.l, b),
      f;
    if ((f = 9 !== b)) a.v[b] ? (f = !0) : ((a.v[b] = !0), (f = !1));
    if (f) return yh(a.h, b, c, d, [], 4), d;
    if (!e.length) return yh(a.h, b, c, d, [], 3), d;
    var g = ib(Fn, b),
      h = [];
    cb(e, function (k) {
      var l = new eh();
      if ((k = Jn(a, k, c, l)))
        0 !== dc(l, fh) && h.push(l),
          (l = k.getId()),
          d.push(l),
          Kn(a, l, g ? 4 : c),
          (k = I(k, Ag, 2)) && (g ? Ph(k, Rh(), a.h, l) : Ph(k, [c], a.h, l));
    });
    yh(a.h, b, c, d, h, 1);
    return d;
  }
  function Kn(a, b, c) {
    a.i[c] || (a.i[c] = []);
    a = a.i[c];
    ib(a, b) || a.push(b);
  }
  function Ln(a, b) {
    a.l.push.apply(
      a.l,
      ka(
        db(
          eb(b, function (c) {
            return new nm(c);
          }),
          function (c) {
            return !ib(Fn, c.V());
          }
        )
      )
    );
  }
  function Jn(a, b, c, d) {
    var e = P(Bh).h;
    if (!wg(H(b, kg, 3), e)) return null;
    var f = I(b, hm, 2),
      g = G(b, 6);
    if (g) {
      cc(d, 1, fh, g);
      f = e[qg];
      switch (c) {
        case 2:
          var h = f[8];
          break;
        case 1:
          h = f[7];
      }
      c = void 0;
      if (h)
        try {
          (c = h(g)), bc(d, 3, c);
        } catch (k) {}
      return (b = Mn(b, c)) ? Nn(a, [b], 1) : null;
    }
    if ((g = G(b, 10))) {
      cc(d, 2, fh, g);
      h = null;
      switch (c) {
        case 1:
          h = e[qg][9];
          break;
        case 2:
          h = e[qg][10];
          break;
        default:
          return null;
      }
      c = h ? h(String(g)) : void 0;
      if (void 0 === c && 1 === G(b, 11)) return null;
      void 0 !== c && bc(d, 3, c);
      return (b = Mn(b, c)) ? Nn(a, [b], 1) : null;
    }
    d = e
      ? db(f, function (k) {
          return wg(H(k, kg, 3), e);
        })
      : f;
    if (!d.length) return null;
    c = d.length * jc(C(b, 1), 0);
    return (b = G(b, 4)) ? On(a, b, c, d) : Nn(a, d, c / 1e3);
  }
  function On(a, b, c, d) {
    var e = null != a.m[b] ? a.m[b] : 1e3;
    if (0 >= e) return null;
    d = Nn(a, d, c / e);
    a.m[b] = d ? 0 : e - c;
    return d;
  }
  function Nn(a, b, c) {
    var d = a.j,
      e = gb(b, function (f) {
        return !!d[f.getId()];
      });
    return e ? e : a.A ? null : kd(b, c);
  }
  function Pn(a, b) {
    ni(
      Uh,
      function (c) {
        a.j[c] = !0;
      },
      b
    );
    ni(
      Xh,
      function (c, d) {
        return Hn(a, c, d);
      },
      b
    );
    ni(
      Yh,
      function (c) {
        return (a.i[c] || []).concat(a.i[4]);
      },
      b
    );
    ni(
      ki,
      function (c) {
        return void Ln(a, c);
      },
      b
    );
    ni(
      Vh,
      function (c, d) {
        return void Kn(a, c, d);
      },
      b
    );
  }
  function In(a, b) {
    return (
      ((a = gb(a, function (c) {
        return c.V() == b;
      })) &&
        I(a, jm, 2)) ||
      []
    );
  }
  function Mn(a, b) {
    var c = I(a, hm, 2),
      d = c.length,
      e = jc(C(a, 8), 0);
    a = d * jc(C(a, 1), 0) - 1;
    b = void 0 !== b ? b : Math.floor(1e3 * nd());
    d = (b - e) % d;
    if (b < e || b - e - d >= a) return null;
    c = c[d];
    e = P(Bh).h;
    return !c || (e && !wg(H(c, kg, 3), e)) ? null : c;
  }
  function Qn() {
    this.h = function () {};
  }
  function Rn(a) {
    P(Qn).h(a);
  }
  var Sn, Tn, Un, Vn, Wn, Xn;
  function Yn(a, b, c, d) {
    var e = 1;
    d = void 0 === d ? Bn() : d;
    e = void 0 === e ? 0 : e;
    var f =
      void 0 === f
        ? new xh(
            null != (Vn = null == (Sn = H(a, pm, 5)) ? void 0 : jc(C(Sn, 2), 0))
              ? Vn
              : 0,
            null != (Wn = null == (Tn = H(a, pm, 5)) ? void 0 : jc(C(Tn, 4), 0))
              ? Wn
              : 0,
            null != (Xn = null == (Un = H(a, pm, 5)) ? void 0 : J(Un, 3))
              ? Xn
              : !1
          )
        : f;
    d.hasOwnProperty("init-done")
      ? (oi(
          ki,
          d
        )(
          eb(I(a, nm, 2), function (g) {
            return g.toJSON();
          })
        ),
        oi(li, d)(
          eb(I(a, Ag, 1), function (g) {
            return g.toJSON();
          }),
          e
        ),
        b && oi(mi, d)(b),
        Zn(e, d))
      : (Pn(P(Gn).init(I(a, nm, 2), e, f, c), d),
        pi(d),
        qi(d),
        ri(d),
        Zn(e, d),
        Ph(I(a, Ag, 1), [e], f, void 0, !0),
        (Ch = Ch || !(!c || !c.ob)),
        Rn(P(En)),
        b && Rn(b));
  }
  function Zn(a, b) {
    var c = (b = void 0 === b ? Bn() : b);
    ti(P(si), c, a);
    $n(b, a);
    a = b;
    P(Qn).h = oi(mi, a);
    P(ag).m();
  }
  function $n(a, b) {
    var c = P(ag);
    c.i = function (d, e) {
      return oi($h, a, function () {
        return !1;
      })(d, e, b);
    };
    c.j = function (d, e) {
      return oi(ai, a, function () {
        return 0;
      })(d, e, b);
    };
    c.l = function (d, e) {
      return oi(bi, a, function () {
        return "";
      })(d, e, b);
    };
    c.h = function (d, e) {
      return oi(ci, a, function () {
        return [];
      })(d, e, b);
    };
    c.m = function () {
      oi(Wh, a)(b);
    };
  }
  function ao(a, b, c) {
    var d = T(a);
    if (d.plle) Zn(1, Bn(a));
    else {
      d.plle = !0;
      d = H(b, lm, 12);
      var e = J(b, 9);
      Yn(
        d,
        An(c, b),
        { Ma: e && !!a.google_disable_experiments, ob: e },
        Bn(a)
      );
      if ((c = kc(b, 15))) (c = Number(c)), P(si).l(c);
      b = v(Yb(b, 19, 0, !1, Bb(b.s)));
      for (c = b.next(); !c.done; c = b.next()) (c = c.value), P(si).h(c);
      b = P(si).j(12);
      xn(12, b);
      b = P(si).j(10);
      xn(10, b);
      a = fd(a) || a;
      ak(a.location, "google_mc_lab") && P(si).h(44738307);
      ak(a.location, "google_auto_storify_swipeable") && P(si).h(44773747);
      ak(a.location, "google_auto_storify_scrollable") && P(si).h(44773746);
    }
  }
  var bo = {
    "120x90": !0,
    "160x90": !0,
    "180x90": !0,
    "200x90": !0,
    "468x15": !0,
    "728x15": !0,
  };
  function co(a, b) {
    if (15 == b) {
      if (728 <= a) return 728;
      if (468 <= a) return 468;
    } else if (90 == b) {
      if (200 <= a) return 200;
      if (180 <= a) return 180;
      if (160 <= a) return 160;
      if (120 <= a) return 120;
    }
    return null;
  }
  function U(a, b, c, d) {
    d = void 0 === d ? !1 : d;
    Ti.call(this, a, b);
    this.ha = c;
    this.qb = d;
  }
  w(U, Ti);
  U.prototype.ra = function () {
    return this.ha;
  };
  U.prototype.i = function (a, b, c) {
    b.google_ad_resize ||
      ((c.style.height = this.height() + "px"), (b.rpe = !0));
  };
  function eo(a) {
    return function (b) {
      return !!(b.ha & a);
    };
  }
  var fo = {},
    go =
      ((fo.image_stacked = 1 / 1.91),
      (fo.image_sidebyside = 1 / 3.82),
      (fo.mobile_banner_image_sidebyside = 1 / 3.82),
      (fo.pub_control_image_stacked = 1 / 1.91),
      (fo.pub_control_image_sidebyside = 1 / 3.82),
      (fo.pub_control_image_card_stacked = 1 / 1.91),
      (fo.pub_control_image_card_sidebyside = 1 / 3.74),
      (fo.pub_control_text = 0),
      (fo.pub_control_text_card = 0),
      fo),
    ho = {},
    io =
      ((ho.image_stacked = 80),
      (ho.image_sidebyside = 0),
      (ho.mobile_banner_image_sidebyside = 0),
      (ho.pub_control_image_stacked = 80),
      (ho.pub_control_image_sidebyside = 0),
      (ho.pub_control_image_card_stacked = 85),
      (ho.pub_control_image_card_sidebyside = 0),
      (ho.pub_control_text = 80),
      (ho.pub_control_text_card = 80),
      ho),
    jo = {},
    ko =
      ((jo.pub_control_image_stacked = 100),
      (jo.pub_control_image_sidebyside = 200),
      (jo.pub_control_image_card_stacked = 150),
      (jo.pub_control_image_card_sidebyside = 250),
      (jo.pub_control_text = 100),
      (jo.pub_control_text_card = 150),
      jo);
  function lo(a) {
    var b = 0;
    a.W && b++;
    a.M && b++;
    a.N && b++;
    if (3 > b)
      return {
        P: "Tags data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num should be set together.",
      };
    b = a.W.split(",");
    var c = a.N.split(",");
    a = a.M.split(",");
    if (b.length !== c.length || b.length !== a.length)
      return {
        P: 'Lengths of parameters data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num must match. Example: \n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside"',
      };
    if (2 < b.length)
      return {
        P:
          "The parameter length of attribute data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num is too long. At most 2 parameters for each attribute are needed: one for mobile and one for desktop, while you are providing " +
          (b.length +
            ' parameters. Example: \n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside".'),
      };
    for (var d = [], e = [], f = 0; f < b.length; f++) {
      var g = Number(c[f]);
      if (t(Number, "isNaN").call(Number, g) || 0 === g)
        return {
          P: "Wrong value '" + c[f] + "' for data-matched-content-rows-num.",
        };
      d.push(g);
      g = Number(a[f]);
      if (t(Number, "isNaN").call(Number, g) || 0 === g)
        return {
          P: "Wrong value '" + a[f] + "' for data-matched-content-columns-num.",
        };
      e.push(g);
    }
    return { N: d, M: e, Qa: b };
  }
  function mo(a) {
    return 1200 <= a
      ? { width: 1200, height: 600 }
      : 850 <= a
      ? { width: a, height: Math.floor(0.5 * a) }
      : 550 <= a
      ? { width: a, height: Math.floor(0.6 * a) }
      : 468 <= a
      ? { width: a, height: Math.floor(0.7 * a) }
      : { width: a, height: Math.floor(3.44 * a) };
  }
  var no = kb("script");
  function oo(a, b, c, d, e, f, g, h, k, l, m, p) {
    this.v = a;
    this.X = b;
    this.ha = void 0 === c ? null : c;
    this.h = void 0 === d ? null : d;
    this.T = void 0 === e ? null : e;
    this.i = void 0 === f ? null : f;
    this.j = void 0 === g ? null : g;
    this.C = void 0 === h ? null : h;
    this.J = void 0 === k ? null : k;
    this.l = void 0 === l ? null : l;
    this.m = void 0 === m ? null : m;
    this.R = void 0 === p ? null : p;
    this.U = this.B = this.A = null;
  }
  oo.prototype.size = function () {
    return this.X;
  };
  function po(a, b, c) {
    null != a.ha && (c.google_responsive_formats = a.ha);
    null != a.T && (c.google_safe_for_responsive_override = a.T);
    null != a.i &&
      (!0 === a.i
        ? (c.google_full_width_responsive_allowed = !0)
        : ((c.google_full_width_responsive_allowed = !1), (c.gfwrnwer = a.i)));
    null != a.j && !0 !== a.j && (c.gfwrnher = a.j);
    var d = a.m || c.google_ad_width;
    null != d && (c.google_resizing_width = d);
    d = a.l || c.google_ad_height;
    null != d && (c.google_resizing_height = d);
    d = a.size().h(b);
    var e = a.size().height();
    if (!c.google_ad_resize) {
      c.google_ad_width = d;
      c.google_ad_height = e;
      var f = a.size();
      b = f.h(b) + "x" + f.height();
      c.google_ad_format = b;
      c.google_responsive_auto_format = a.v;
      null != a.h && (c.armr = a.h);
      c.google_ad_resizable = !0;
      c.google_override_format = 1;
      c.google_loader_features_used = 128;
      !0 === a.i && (c.gfwrnh = a.size().height() + "px");
    }
    null != a.C && (c.gfwroml = a.C);
    null != a.J && (c.gfwromr = a.J);
    null != a.l && (c.gfwroh = a.l);
    null != a.m && (c.gfwrow = a.m);
    null != a.R && (c.gfwroz = a.R);
    null != a.A && (c.gml = a.A);
    null != a.B && (c.gmr = a.B);
    null != a.U && (c.gzi = a.U);
    b = fd(window) || window;
    ak(b.location, "google_responsive_dummy_ad") &&
      (ib([1, 2, 3, 4, 5, 6, 7, 8], a.v) || 1 === a.h) &&
      2 !== a.h &&
      ((a = JSON.stringify({
        googMsgType: "adpnt",
        key_value: [{ key: "qid", value: "DUMMY_AD" }],
      })),
      (c.dash =
        "<" +
        no +
        ">window.top.postMessage('" +
        a +
        "', '*');\n          </" +
        no +
        '>\n          <div id="dummyAd" style="width:' +
        d +
        "px;height:" +
        e +
        'px;\n            background:#ddd;border:3px solid #f00;box-sizing:border-box;\n            color:#000;">\n            <p>Requested size:' +
        d +
        "x" +
        e +
        "</p>\n            <p>Rendered size:" +
        d +
        "x" +
        e +
        "</p>\n          </div>"));
  }
  var qo = [
    "google_content_recommendation_ui_type",
    "google_content_recommendation_columns_num",
    "google_content_recommendation_rows_num",
  ];
  function ro(a, b) {
    Ti.call(this, a, b);
  }
  w(ro, Ti);
  ro.prototype.h = function (a) {
    return Math.min(1200, Math.max(this.L, Math.round(a)));
  };
  function so(a, b) {
    to(a, b);
    if ("pedestal" == b.google_content_recommendation_ui_type)
      return new oo(9, new ro(a, Math.floor(a * b.google_phwr)));
    var c = $c();
    468 > a
      ? c
        ? ((c = a - 8 - 8),
          (c =
            Math.floor(c / 1.91 + 70) +
            Math.floor(
              11 *
                (c * go.mobile_banner_image_sidebyside +
                  io.mobile_banner_image_sidebyside) +
                96
            )),
          (a = {
            da: a,
            ca: c,
            M: 1,
            N: 12,
            W: "mobile_banner_image_sidebyside",
          }))
        : ((a = mo(a)),
          (a = {
            da: a.width,
            ca: a.height,
            M: 1,
            N: 13,
            W: "image_sidebyside",
          }))
      : ((a = mo(a)),
        (a = { da: a.width, ca: a.height, M: 4, N: 2, W: "image_stacked" }));
    uo(b, a);
    return new oo(9, new ro(a.da, a.ca));
  }
  function vo(a, b) {
    to(a, b);
    var c = lo({
      N: b.google_content_recommendation_rows_num,
      M: b.google_content_recommendation_columns_num,
      W: b.google_content_recommendation_ui_type,
    });
    if (c.P) a = { da: 0, ca: 0, M: 0, N: 0, W: "image_stacked", P: c.P };
    else {
      var d = 2 === c.Qa.length && 468 <= a ? 1 : 0;
      var e = c.Qa[d];
      e = 0 === e.indexOf("pub_control_") ? e : "pub_control_" + e;
      var f = ko[e];
      for (var g = c.M[d]; a / g < f && 1 < g; ) g--;
      f = g;
      c = c.N[d];
      d = Math.floor((((a - 8 * f - 8) / f) * go[e] + io[e]) * c + 8 * c + 8);
      a =
        1500 < a
          ? {
              width: 0,
              height: 0,
              yb: "Calculated slot width is too large: " + a,
            }
          : 1500 < d
          ? {
              width: 0,
              height: 0,
              yb: "Calculated slot height is too large: " + d,
            }
          : { width: a, height: d };
      a = { da: a.width, ca: a.height, M: f, N: c, W: e };
    }
    if (a.P) throw new S(a.P);
    uo(b, a);
    return new oo(9, new ro(a.da, a.ca));
  }
  function to(a, b) {
    if (0 >= a)
      throw new S(
        "Invalid responsive width from Matched Content slot " +
          b.google_ad_slot +
          ": " +
          a +
          ". Please ensure to put this Matched Content slot into a non-zero width div container."
      );
  }
  function uo(a, b) {
    a.google_content_recommendation_ui_type = b.W;
    a.google_content_recommendation_columns_num = b.M;
    a.google_content_recommendation_rows_num = b.N;
  }
  function wo(a, b) {
    Ti.call(this, a, b);
  }
  w(wo, Ti);
  wo.prototype.h = function () {
    return this.L;
  };
  wo.prototype.i = function (a, b, c) {
    Si(a, c);
    b.google_ad_resize ||
      ((c.style.height = this.height() + "px"), (b.rpe = !0));
  };
  var xo = {
    "image-top": function (a) {
      return 600 >= a ? 284 + 0.414 * (a - 250) : 429;
    },
    "image-middle": function (a) {
      return 500 >= a ? 196 - 0.13 * (a - 250) : 164 + 0.2 * (a - 500);
    },
    "image-side": function (a) {
      return 500 >= a ? 205 - 0.28 * (a - 250) : 134 + 0.21 * (a - 500);
    },
    "text-only": function (a) {
      return 500 >= a ? 187 - 0.228 * (a - 250) : 130;
    },
    "in-article": function (a) {
      return 420 >= a
        ? a / 1.2
        : 460 >= a
        ? a / 1.91 + 130
        : 800 >= a
        ? a / 4
        : 200;
    },
  };
  function yo(a, b) {
    Ti.call(this, a, b);
  }
  w(yo, Ti);
  yo.prototype.h = function () {
    return Math.min(1200, this.L);
  };
  function zo(a, b, c, d, e) {
    var f = e.google_ad_layout || "image-top";
    if ("in-article" == f) {
      var g = a;
      if ("false" == e.google_full_width_responsive) a = g;
      else if (((a = Ni(b, c, g, 0.2, e)), !0 !== a)) (e.gfwrnwer = a), (a = g);
      else if ((a = Je(b)))
        if (((e.google_full_width_responsive_allowed = !0), c.parentElement)) {
          b: {
            g = c;
            for (var h = 0; 100 > h && g.parentElement; ++h) {
              for (
                var k = g.parentElement.childNodes, l = 0;
                l < k.length;
                ++l
              ) {
                var m = k[l];
                if (m != g && Qi(b, m)) break b;
              }
              g = g.parentElement;
              g.style.width = "100%";
              g.style.height = "auto";
            }
          }
          Si(b, c);
        } else a = g;
      else a = g;
    }
    if (250 > a)
      throw new S(
        "Fluid responsive ads must be at least 250px wide: availableWidth=" + a
      );
    a = Math.min(1200, Math.floor(a));
    if (d && "in-article" != f) {
      f = Math.ceil(d);
      if (50 > f)
        throw new S(
          "Fluid responsive ads must be at least 50px tall: height=" + f
        );
      return new oo(11, new Ti(a, f));
    }
    if ("in-article" != f && (d = e.google_ad_layout_key)) {
      f = "" + d;
      b = Math.pow(10, 3);
      if ((d = (c = f.match(/([+-][0-9a-z]+)/g)) && c.length)) {
        e = [];
        for (g = 0; g < d; g++) e.push(parseInt(c[g], 36) / b);
        b = e;
      } else b = null;
      if (!b) throw new S("Invalid data-ad-layout-key value: " + f);
      f = (a + -725) / 1e3;
      c = 0;
      d = 1;
      e = b.length;
      for (g = 0; g < e; g++) (c += b[g] * d), (d *= f);
      f = Math.ceil(1e3 * c - -725 + 10);
      if (isNaN(f)) throw new S("Invalid height: height=" + f);
      if (50 > f)
        throw new S(
          "Fluid responsive ads must be at least 50px tall: height=" + f
        );
      if (1200 < f)
        throw new S(
          "Fluid responsive ads must be at most 1200px tall: height=" + f
        );
      return new oo(11, new Ti(a, f));
    }
    d = xo[f];
    if (!d) throw new S("Invalid data-ad-layout value: " + f);
    c = Xi(c, b);
    b = Je(b);
    b =
      "in-article" !== f || c || a !== b
        ? Math.ceil(d(a))
        : Math.ceil(1.25 * d(a));
    return new oo(11, "in-article" == f ? new yo(a, b) : new Ti(a, b));
  }
  function Ao(a) {
    return function (b) {
      for (var c = a.length - 1; 0 <= c; --c) if (!a[c](b)) return !1;
      return !0;
    };
  }
  function Bo(a, b) {
    for (var c = Co.slice(0), d = c.length, e = null, f = 0; f < d; ++f) {
      var g = c[f];
      if (a(g)) {
        if (!b || b(g)) return g;
        null === e && (e = g);
      }
    }
    return e;
  }
  var V = [
      new U(970, 90, 2),
      new U(728, 90, 2),
      new U(468, 60, 2),
      new U(336, 280, 1),
      new U(320, 100, 2),
      new U(320, 50, 2),
      new U(300, 600, 4),
      new U(300, 250, 1),
      new U(250, 250, 1),
      new U(234, 60, 2),
      new U(200, 200, 1),
      new U(180, 150, 1),
      new U(160, 600, 4),
      new U(125, 125, 1),
      new U(120, 600, 4),
      new U(120, 240, 4),
      new U(120, 120, 1, !0),
    ],
    Co = [
      V[6],
      V[12],
      V[3],
      V[0],
      V[7],
      V[14],
      V[1],
      V[8],
      V[10],
      V[4],
      V[15],
      V[2],
      V[11],
      V[5],
      V[13],
      V[9],
      V[16],
    ];
  function Do(a, b, c, d, e) {
    "false" == e.google_full_width_responsive
      ? (c = { F: a, H: 1 })
      : ("autorelaxed" == b && e.google_full_width_responsive) ||
        Eo(b) ||
        e.google_ad_resize
      ? ((b = Oi(a, c, d, e)),
        (c = !0 !== b ? { F: a, H: b } : { F: Je(c) || a, H: !0 }))
      : (c = { F: a, H: 2 });
    b = c.H;
    return !0 !== b
      ? { F: a, H: b }
      : d.parentElement
      ? { F: c.F, H: b }
      : { F: a, H: b };
  }
  function Fo(a, b, c, d, e) {
    var f = vk(247, function () {
        return Do(a, b, c, d, e);
      }),
      g = f.F;
    f = f.H;
    var h = !0 === f,
      k = L(d.style.width),
      l = L(d.style.height),
      m = Go(g, b, c, d, e, h);
    g = m.ba;
    h = m.Z;
    var p = m.ra;
    m = m.Pa;
    var r = Ho(b, p),
      y,
      E = (y = Ui(d, c, "marginLeft", L)) ? y + "px" : "",
      A = (y = Ui(d, c, "marginRight", L)) ? y + "px" : "";
    y = Ui(d, c, "zIndex") || "";
    return new oo(r, g, p, null, m, f, h, E, A, l, k, y);
  }
  function Eo(a) {
    return (
      "auto" == a || /^((^|,) *(horizontal|vertical|rectangle) *)+$/.test(a)
    );
  }
  function Go(a, b, c, d, e, f) {
    b = "auto" == b ? (0.25 >= a / Math.min(1200, Je(c)) ? 4 : 3) : Mi(b);
    var g = !1,
      h = !1,
      k = 488 > Je(c);
    if (k) {
      var l = Hi(d, c);
      var m = Xi(d, c);
      g = !m && l;
      h = m && l;
    }
    m = [Vi(a), eo(b)];
    m.push(Wi(k, c, d, h));
    null != e.google_max_responsive_height &&
      m.push(Zi(e.google_max_responsive_height));
    k = [
      function (r) {
        return !r.qb;
      },
    ];
    if (g || h) (g = $i(c, d)), k.push(Zi(g));
    var p = Bo(Ao(m), Ao(k));
    if (!p) throw new S("No slot size for availableWidth=" + a);
    m = vk(248, function () {
      var r;
      a: if (f) {
        if (e.gfwrnh && (r = L(e.gfwrnh))) {
          r = { ba: new wo(a, r), Z: !0 };
          break a;
        }
        r = a / 1.2;
        var y = Math;
        var E = y.min;
        if (
          e.google_resizing_allowed ||
          "true" == e.google_full_width_responsive
        )
          var A = Infinity;
        else {
          A = d;
          var F = Infinity;
          do {
            var Y = Ui(A, c, "height", L);
            Y && (F = Math.min(F, Y));
            (Y = Ui(A, c, "maxHeight", L)) && (F = Math.min(F, Y));
          } while ((A = A.parentElement) && "HTML" != A.tagName);
          A = F;
        }
        y = E.call(y, r, A);
        if (y < 0.5 * r || 100 > y) y = r;
        r = { ba: new wo(a, Math.floor(y)), Z: y < r ? 102 : !0 };
      } else r = { ba: p, Z: 100 };
      return r;
    });
    g = m.ba;
    m = m.Z;
    return "in-article" === e.google_ad_layout &&
      c.location &&
      "#hffwroe2etoq" == c.location.hash
      ? { ba: Io(a, c, d, g, e), Z: !1, ra: b, Pa: l }
      : { ba: g, Z: m, ra: b, Pa: l };
  }
  function Ho(a, b) {
    if ("auto" == a) return 1;
    switch (b) {
      case 2:
        return 2;
      case 1:
        return 3;
      case 4:
        return 4;
      case 3:
        return 5;
      case 6:
        return 6;
      case 5:
        return 7;
      case 7:
        return 8;
    }
    throw Error("bad mask");
  }
  function Io(a, b, c, d, e) {
    var f = e.google_ad_height || Ui(c, b, "height", L);
    b = zo(a, b, c, f, e).size();
    return b.L * b.height() > a * d.height() ? new U(b.L, b.height(), 1) : d;
  }
  function Jo(a, b, c, d, e) {
    var f;
    (f = Je(b))
      ? 488 > Je(b)
        ? b.innerHeight >= b.innerWidth
          ? ((e.google_full_width_responsive_allowed = !0),
            Si(b, c),
            (f = { F: f, H: !0 }))
          : (f = { F: a, H: 5 })
        : (f = { F: a, H: 4 })
      : (f = { F: a, H: 10 });
    var g = f;
    f = g.F;
    g = g.H;
    if (!0 !== g || a == f)
      return new oo(12, new Ti(a, d), null, null, !0, g, 100);
    a = Go(f, "auto", b, c, e, !0);
    return new oo(1, a.ba, a.ra, 2, !0, g, a.Z);
  }
  function Ko(a, b) {
    var c = b.google_ad_format;
    if ("autorelaxed" == c) {
      a: {
        if ("pedestal" != b.google_content_recommendation_ui_type)
          for (a = v(qo), c = a.next(); !c.done; c = a.next())
            if (null != b[c.value]) {
              b = !0;
              break a;
            }
        b = !1;
      }
      return b ? 9 : 5;
    }
    if (Eo(c)) return 1;
    if ("link" === c) return 4;
    if ("fluid" == c)
      return "in-article" !== b.google_ad_layout ||
        !a.location ||
        ("#hffwroe2etop" != a.location.hash &&
          "#hffwroe2etoq" != a.location.hash)
        ? 8
        : (Lo(b), 1);
    if (27 === b.google_reactive_ad_format) return Lo(b), 1;
  }
  function Mo(a, b, c, d, e) {
    e =
      b.offsetWidth ||
      ((c.google_ad_resize || (void 0 === e ? !1 : e)) &&
        Ui(b, d, "width", L)) ||
      c.google_ad_width ||
      0;
    4 === a && ((c.google_ad_format = "auto"), (a = 1));
    var f = (f = No(a, e, b, c, d)) ? f : Fo(e, c.google_ad_format, d, b, c);
    f.size().i(d, c, b);
    po(f, e, c);
    1 != a && ((a = f.size().height()), (b.style.height = a + "px"));
  }
  function No(a, b, c, d, e) {
    var f = d.google_ad_height || Ui(c, e, "height", L);
    switch (a) {
      case 5:
        return (
          (f = vk(247, function () {
            return Do(b, d.google_ad_format, e, c, d);
          })),
          (a = f.F),
          (f = f.H),
          !0 === f && b != a && Si(e, c),
          !0 === f
            ? (d.google_full_width_responsive_allowed = !0)
            : ((d.google_full_width_responsive_allowed = !1), (d.gfwrnwer = f)),
          so(a, d)
        );
      case 9:
        return vo(b, d);
      case 8:
        return zo(b, e, c, f, d);
      case 10:
        return Jo(b, e, c, f, d);
    }
  }
  function Lo(a) {
    a.google_ad_format = "auto";
    a.armr = 3;
  }
  function Oo(a, b) {
    var c = fd(b);
    if (c) {
      c = Je(c);
      var d = jd(a, b) || {},
        e = d.direction;
      if ("0px" === d.width && "none" !== d.cssFloat) return -1;
      if ("ltr" === e && c)
        return Math.floor(Math.min(1200, c - a.getBoundingClientRect().left));
      if ("rtl" === e && c)
        return (
          (a =
            b.document.body.getBoundingClientRect().right -
            a.getBoundingClientRect().right),
          Math.floor(
            Math.min(
              1200,
              c - a - Math.floor((c - b.document.body.clientWidth) / 2)
            )
          )
        );
    }
    return -1;
  }
  var Po = ja([
      "https://pagead2.googlesyndication.com/pagead/managed/js/adsense/",
      "/slotcar_library",
      ".js",
    ]),
    Qo = ja([
      "https://googleads.g.doubleclick.net/pagead/html/",
      "/",
      "/zrt_lookup.html",
    ]),
    Ro = ja([
      "https://pagead2.googlesyndication.com/pagead/managed/js/adsense/",
      "/show_ads_impl",
      ".js",
    ]),
    So = ja([
      "https://pagead2.googlesyndication.com/pagead/managed/js/adsense/",
      "/show_ads_impl_with_ama",
      ".js",
    ]),
    To = ja([
      "https://pagead2.googlesyndication.com/pagead/managed/js/adsense/",
      "/show_ads_impl_instrumented",
      ".js",
    ]);
  function Uo(a) {
    tk.Wa(function (b) {
      b.shv = String(a);
      b.mjsv = "m202211080101";
      var c = P(si).i(),
        d = T(x);
      d.eids || (d.eids = []);
      b.eid = c.concat(d.eids).join(",");
    });
  }
  function Vo(a) {
    var b = a.vb;
    return a.jb || ("dev" === b ? "dev" : "");
  }
  var Wo = "undefined" === typeof sttc ? void 0 : sttc;
  function Xo(a) {
    var b = tk;
    try {
      return wc(a, ig), new qm(JSON.parse(a));
    } catch (c) {
      b.I(838, c instanceof Error ? c : Error(String(c)), void 0, function (d) {
        d.jspb = String(a);
      });
    }
    return new qm();
  }
  function Yo(a, b) {
    return null == b ? "&" + a + "=null" : "&" + a + "=" + Math.floor(b);
  }
  function Zo(a, b) {
    return "&" + a + "=" + b.toFixed(3);
  }
  function $o() {
    var a = new q.Set(),
      b = ck();
    try {
      if (!b) return a;
      for (
        var c = b.pubads(), d = v(c.getSlots()), e = d.next();
        !e.done;
        e = d.next()
      )
        a.add(e.value.getSlotId().getDomId());
    } catch (f) {}
    return a;
  }
  function ap(a) {
    a = a.id;
    return (
      null != a &&
      ($o().has(a) ||
        t(a, "startsWith").call(a, "google_ads_iframe_") ||
        t(a, "startsWith").call(a, "aswift"))
    );
  }
  function bp(a, b, c) {
    if (!a.sources) return !1;
    switch (cp(a)) {
      case 2:
        var d = dp(a);
        if (d)
          return c.some(function (f) {
            return ep(d, f);
          });
      case 1:
        var e = fp(a);
        if (e)
          return b.some(function (f) {
            return ep(e, f);
          });
    }
    return !1;
  }
  function cp(a) {
    if (!a.sources) return 0;
    a = a.sources.filter(function (b) {
      return b.previousRect && b.currentRect;
    });
    if (1 <= a.length) {
      a = a[0];
      if (a.previousRect.top < a.currentRect.top) return 2;
      if (a.previousRect.top > a.currentRect.top) return 1;
    }
    return 0;
  }
  function fp(a) {
    return gp(a, function (b) {
      return b.currentRect;
    });
  }
  function dp(a) {
    return gp(a, function (b) {
      return b.previousRect;
    });
  }
  function gp(a, b) {
    return a.sources.reduce(function (c, d) {
      d = b(d);
      return c
        ? d && 0 !== d.width * d.height
          ? d.top < c.top
            ? d
            : c
          : c
        : d;
    }, null);
  }
  function hp() {
    Nk.call(this);
    this.i = this.h = this.T = this.R = this.C = 0;
    this.Ea = this.Ba = Number.NEGATIVE_INFINITY;
    this.xa =
      this.za =
      this.Aa =
      this.Ca =
      this.Ha =
      this.m =
      this.Ga =
      this.X =
        0;
    this.ya = !1;
    this.U = this.J = this.B = 0;
    var a = document.querySelector("[data-google-query-id]");
    this.Fa = a ? a.getAttribute("data-google-query-id") : null;
    this.l = null;
    this.Da = !1;
    this.ja = function () {};
  }
  w(hp, Nk);
  function ip() {
    var a = new hp();
    if (Q(Df)) {
      var b = window;
      if (!b.google_plmetrics && window.PerformanceObserver) {
        b.google_plmetrics = !0;
        b = v([
          "layout-shift",
          "largest-contentful-paint",
          "first-input",
          "longtask",
        ]);
        for (var c = b.next(); !c.done; c = b.next())
          (c = c.value), jp(a).observe({ type: c, buffered: !0 });
        kp(a);
      }
    }
  }
  function jp(a) {
    a.l ||
      (a.l = new PerformanceObserver(
        hj(640, function (b) {
          var c = lp !== window.scrollX || mp !== window.scrollY ? [] : np,
            d = op();
          b = v(b.getEntries());
          for (var e = b.next(); !e.done; e = b.next())
            switch (((e = e.value), e.entryType)) {
              case "layout-shift":
                var f = a;
                if (!e.hadRecentInput) {
                  f.C += Number(e.value);
                  Number(e.value) > f.R && (f.R = Number(e.value));
                  f.T += 1;
                  var g = bp(e, c, d);
                  g && ((f.m += e.value), f.Ca++);
                  if (5e3 < e.startTime - f.Ba || 1e3 < e.startTime - f.Ea)
                    (f.Ba = e.startTime), (f.h = 0), (f.i = 0);
                  f.Ea = e.startTime;
                  f.h += e.value;
                  g && (f.i += e.value);
                  f.h > f.X &&
                    ((f.X = f.h),
                    (f.Ha = f.i),
                    (f.Ga = e.startTime + e.duration));
                }
                break;
              case "largest-contentful-paint":
                a.Aa = Math.floor(e.renderTime || e.loadTime);
                a.za = e.size;
                break;
              case "first-input":
                a.xa = Number((e.processingStart - e.startTime).toFixed(3));
                a.ya = !0;
                break;
              case "longtask":
                (e = Math.max(0, e.duration - 50)),
                  (a.B += e),
                  (a.J = Math.max(a.J, e)),
                  (a.U += 1);
            }
        })
      ));
    return a.l;
  }
  function kp(a) {
    var b = hj(641, function () {
        var d = document;
        2 ==
          (d.prerendering
            ? 3
            : { visible: 1, hidden: 2, prerender: 3, preview: 4, unloaded: 5 }[
                d.visibilityState ||
                  d.webkitVisibilityState ||
                  d.mozVisibilityState ||
                  ""
              ] || 0) && pp(a);
      }),
      c = hj(641, function () {
        return void pp(a);
      });
    document.addEventListener("visibilitychange", b);
    document.addEventListener("unload", c);
    a.ja = function () {
      document.removeEventListener("visibilitychange", b);
      document.removeEventListener("unload", c);
      jp(a).disconnect();
    };
  }
  hp.prototype.j = function () {
    Nk.prototype.j.call(this);
    this.ja();
  };
  function pp(a) {
    if (!a.Da) {
      a.Da = !0;
      jp(a).takeRecords();
      var b =
        "https://pagead2.googlesyndication.com/pagead/gen_204?id=plmetrics";
      window.LayoutShift &&
        ((b += Zo("cls", a.C)),
        (b += Zo("mls", a.R)),
        (b += Yo("nls", a.T)),
        window.LayoutShiftAttribution &&
          ((b += Zo("cas", a.m)), (b += Yo("nas", a.Ca))),
        (b += Zo("wls", a.X)),
        (b += Zo("tls", a.Ga)),
        window.LayoutShiftAttribution && (b += Zo("was", a.Ha)));
      window.LargestContentfulPaint &&
        ((b += Yo("lcp", a.Aa)), (b += Yo("lcps", a.za)));
      window.PerformanceEventTiming && a.ya && (b += Yo("fid", a.xa));
      window.PerformanceLongTaskTiming &&
        ((b += Yo("cbt", a.B)), (b += Yo("mbt", a.J)), (b += Yo("nlt", a.U)));
      for (
        var c = 0, d = v(document.getElementsByTagName("iframe")), e = d.next();
        !e.done;
        e = d.next()
      )
        ap(e.value) && c++;
      b += Yo("nif", c);
      b += Yo("ifi", Kd(window));
      c = P(si).i();
      b += "&eid=" + encodeURIComponent(c.join());
      b += "&top=" + (x === x.top ? 1 : 0);
      b += a.Fa ? "&qqid=" + encodeURIComponent(a.Fa) : Yo("pvsid", Ad(x));
      window.googletag && (b += "&gpt=1");
      window.fetch(b, {
        keepalive: !0,
        credentials: "include",
        redirect: "follow",
        method: "get",
        mode: "no-cors",
      });
      a.v || ((a.v = !0), a.j());
    }
  }
  function ep(a, b) {
    var c = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    a = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    return 0 >= c || 0 >= a
      ? !1
      : 50 <= (100 * c * a) / ((b.right - b.left) * (b.bottom - b.top));
  }
  function op() {
    var a = [].concat(ka(document.getElementsByTagName("iframe"))).filter(ap),
      b = []
        .concat(ka($o()))
        .map(function (c) {
          return document.getElementById(c);
        })
        .filter(function (c) {
          return null !== c;
        });
    lp = window.scrollX;
    mp = window.scrollY;
    return (np = [].concat(ka(a), ka(b)).map(function (c) {
      return c.getBoundingClientRect();
    }));
  }
  var lp = void 0,
    mp = void 0,
    np = [];
  var W = {
      issuerOrigin: "https://attestation.android.com",
      issuancePath: "/att/i",
      redemptionPath: "/att/r",
    },
    X = {
      issuerOrigin: "https://pagead2.googlesyndication.com",
      issuancePath: "/dtt/i",
      redemptionPath: "/dtt/r",
      getStatePath: "/dtt/s",
    };
  function qp(a, b, c) {
    Nk.call(this);
    var d = this;
    this.i = a;
    this.h = [];
    b && rp() && this.h.push(W);
    c && this.h.push(X);
    if (document.hasTrustToken && !Q(Wf)) {
      var e = new q.Map();
      this.h.forEach(function (f) {
        e.set(f.issuerOrigin, {
          issuerOrigin: f.issuerOrigin,
          state: d.i ? 1 : 12,
          hasRedemptionRecord: !1,
        });
      });
      window.goog_tt_state_map =
        window.goog_tt_state_map && window.goog_tt_state_map instanceof q.Map
          ? new q.Map([].concat(ka(e), ka(window.goog_tt_state_map)))
          : e;
      (window.goog_tt_promise_map &&
        window.goog_tt_promise_map instanceof q.Map) ||
        (window.goog_tt_promise_map = new q.Map());
    }
  }
  w(qp, Nk);
  function rp() {
    var a = void 0 === a ? window : a;
    a = a.navigator.userAgent;
    var b = /Chrome/.test(a);
    return /Android/.test(a) && b;
  }
  function sp() {
    var a = void 0 === a ? window.document : a;
    var b = P(ag).h(Zf.h, Zf.defaultValue);
    zd(b, a);
  }
  function tp(a, b) {
    return a || ".google.ch" === b || "function" === typeof M.__tcfapi;
  }
  function Z(a, b, c) {
    var d,
      e = null == (d = window.goog_tt_state_map) ? void 0 : d.get(a);
    e && ((e.state = b), void 0 != c && (e.hasRedemptionRecord = c));
  }
  function up() {
    var a = W.issuerOrigin + W.redemptionPath,
      b = {
        keepalive: !0,
        trustToken: {
          type: "token-redemption",
          issuer: W.issuerOrigin,
          refreshPolicy: "none",
        },
      };
    Z(W.issuerOrigin, 2);
    return window
      .fetch(a, b)
      .then(function (c) {
        if (!c.ok) throw Error(c.status + ": Network response was not ok!");
        Z(W.issuerOrigin, 6, !0);
      })
      .catch(function (c) {
        c && "NoModificationAllowedError" === c.name
          ? Z(W.issuerOrigin, 6, !0)
          : Z(W.issuerOrigin, 5);
      });
  }
  function vp() {
    var a = W.issuerOrigin + W.issuancePath;
    Z(W.issuerOrigin, 8);
    return window
      .fetch(a, { keepalive: !0, trustToken: { type: "token-request" } })
      .then(function (b) {
        if (!b.ok) throw Error(b.status + ": Network response was not ok!");
        Z(W.issuerOrigin, 10);
        return up();
      })
      .catch(function (b) {
        if (b && "NoModificationAllowedError" === b.name)
          return Z(W.issuerOrigin, 10), up();
        Z(W.issuerOrigin, 9);
      });
  }
  function wp() {
    Z(W.issuerOrigin, 13);
    return document.hasTrustToken(W.issuerOrigin).then(function (a) {
      return a ? up() : vp();
    });
  }
  function xp() {
    Z(X.issuerOrigin, 13);
    if (q.Promise) {
      var a = document
          .hasTrustToken(X.issuerOrigin)
          .then(function (e) {
            return e;
          })
          .catch(function (e) {
            return q.Promise.reject({ state: 19, error: e });
          }),
        b = X.issuerOrigin + X.redemptionPath,
        c = {
          keepalive: !0,
          trustToken: { type: "token-redemption", refreshPolicy: "none" },
        };
      Z(X.issuerOrigin, 16);
      a = a
        .then(function (e) {
          return window
            .fetch(b, c)
            .then(function (f) {
              if (!f.ok)
                throw Error(f.status + ": Network response was not ok!");
              Z(X.issuerOrigin, 18, !0);
            })
            .catch(function (f) {
              if (f && "NoModificationAllowedError" === f.name)
                Z(X.issuerOrigin, 18, !0);
              else {
                if (e) return q.Promise.reject({ state: 17, error: f });
                Z(X.issuerOrigin, 17);
              }
            });
        })
        .then(function () {
          return document
            .hasTrustToken(X.issuerOrigin)
            .then(function (e) {
              return e;
            })
            .catch(function (e) {
              return q.Promise.reject({ state: 19, error: e });
            });
        })
        .then(function (e) {
          var f = X.issuerOrigin + X.getStatePath;
          Z(X.issuerOrigin, 20);
          return window
            .fetch(f + "?ht=" + e, {
              trustToken: {
                type: "send-redemption-record",
                issuers: [X.issuerOrigin],
              },
            })
            .then(function (g) {
              if (!g.ok)
                throw Error(g.status + ": Network response was not ok!");
              Z(X.issuerOrigin, 22);
              return g.text().then(function (h) {
                return JSON.parse(h);
              });
            })
            .catch(function (g) {
              return q.Promise.reject({ state: 21, error: g });
            });
        });
      var d = Ad(window);
      return a
        .then(function (e) {
          var f = X.issuerOrigin + X.issuancePath;
          return e && e.srqt && e.cs
            ? (Z(X.issuerOrigin, 23),
              window
                .fetch(f + "?cs=" + e.cs + "&correlator=" + d, {
                  keepalive: !0,
                  trustToken: { type: "token-request" },
                })
                .then(function (g) {
                  if (!g.ok)
                    throw Error(g.status + ": Network response was not ok!");
                  Z(X.issuerOrigin, 25);
                  return e;
                })
                .catch(function (g) {
                  return q.Promise.reject({ state: 24, error: g });
                }))
            : e;
        })
        .then(function (e) {
          if (e && e.srdt && e.cs)
            return (
              Z(X.issuerOrigin, 26),
              window
                .fetch(b + "?cs=" + e.cs + "&correlator=" + d, {
                  keepalive: !0,
                  trustToken: {
                    type: "token-redemption",
                    refreshPolicy: "refresh",
                  },
                })
                .then(function (f) {
                  if (!f.ok)
                    throw Error(f.status + ": Network response was not ok!");
                  Z(X.issuerOrigin, 28, !0);
                })
                .catch(function (f) {
                  return q.Promise.reject({ state: 27, error: f });
                })
            );
        })
        .then(function () {
          Z(X.issuerOrigin, 29);
        })
        .catch(function (e) {
          if (
            e instanceof Object &&
            e.hasOwnProperty("state") &&
            e.hasOwnProperty("error")
          )
            if ("number" === typeof e.state && e.error instanceof Error) {
              Z(X.issuerOrigin, e.state);
              var f = bg(Yf);
              Math.random() <= f &&
                se({ state: e.state, err: e.error.toString() }, "dtt_err");
            } else throw Error(e);
          else throw e;
        });
    }
  }
  function yp(a) {
    if (document.hasTrustToken && !Q(Wf) && a.i) {
      var b = window.goog_tt_promise_map;
      if (b && b instanceof q.Map) {
        var c = [];
        if (
          a.h.some(function (e) {
            return e.issuerOrigin === W.issuerOrigin;
          })
        ) {
          var d = b.get(W.issuerOrigin);
          d || ((d = wp()), b.set(W.issuerOrigin, d));
          c.push(d);
        }
        a.h.some(function (e) {
          return e.issuerOrigin === X.issuerOrigin;
        }) &&
          ((a = b.get(X.issuerOrigin)),
          a || ((a = xp()), b.set(X.issuerOrigin, a)),
          c.push(a));
        if (0 < c.length && q.Promise && q.Promise.all) return q.Promise.all(c);
      }
    }
  }
  function zp(a) {
    K.call(this, a, -1, Ap);
  }
  w(zp, K);
  function Bp(a, b) {
    return D(a, 2, b);
  }
  function Cp(a, b) {
    return D(a, 3, b);
  }
  function Dp(a, b) {
    return D(a, 4, b);
  }
  function Ep(a, b) {
    return D(a, 5, b);
  }
  function Fp(a, b) {
    return D(a, 9, b);
  }
  function Gp(a, b) {
    return ic(a, 10, b);
  }
  function Hp(a, b) {
    return D(a, 11, b);
  }
  function Ip(a, b) {
    return D(a, 1, b);
  }
  function Jp(a, b) {
    return D(a, 7, b);
  }
  function Kp(a) {
    K.call(this, a);
  }
  w(Kp, K);
  Kp.prototype.getVersion = function () {
    return kc(this, 2);
  };
  var Ap = [10, 6];
  var Lp =
    "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(
      " "
    );
  function Mp() {
    var a;
    return null != (a = M.google_tag_data) ? a : (M.google_tag_data = {});
  }
  function Np() {
    var a, b;
    return (
      "function" ===
      typeof (null == (a = M.navigator)
        ? void 0
        : null == (b = a.userAgentData)
        ? void 0
        : b.getHighEntropyValues)
    );
  }
  function Op() {
    if (!Np()) return null;
    var a = Mp();
    if (a.uach_promise) return a.uach_promise;
    var b = M.navigator.userAgentData
      .getHighEntropyValues(Lp)
      .then(function (c) {
        null != a.uach || (a.uach = c);
        return c;
      });
    return (a.uach_promise = b);
  }
  function Pp(a) {
    var b;
    return Hp(
      Gp(
        Ep(
          Bp(
            Ip(
              Dp(
                Jp(
                  Fp(Cp(new zp(), a.architecture || ""), a.bitness || ""),
                  a.mobile || !1
                ),
                a.model || ""
              ),
              a.platform || ""
            ),
            a.platformVersion || ""
          ),
          a.uaFullVersion || ""
        ),
        (null == (b = a.fullVersionList)
          ? void 0
          : b.map(function (c) {
              var d = new Kp();
              d = D(d, 1, c.brand);
              return D(d, 2, c.version);
            })) || []
      ),
      a.wow64 || !1
    );
  }
  function Qp() {
    var a, b;
    return null !=
      (b =
        null == (a = Op())
          ? void 0
          : a.then(function (c) {
              return Pp(c);
            }))
      ? b
      : null;
  }
  function Rp(a, b) {
    b.google_ad_host || ((a = Mm(a)) && (b.google_ad_host = a));
  }
  function Sp(a, b, c) {
    c = void 0 === c ? "" : c;
    M.google_sa_impl &&
      !M.document.getElementById("google_shimpl") &&
      (delete M.google_sa_queue, delete M.google_sa_impl);
    M.google_sa_queue ||
      ((M.google_sa_queue = []),
      (M.google_process_slots = wk(215, function () {
        return Tp(M.google_sa_queue);
      })),
      (a = Up(c, a, b)),
      (gd(M.document, a).id = "google_shimpl"));
  }
  function Tp(a) {
    var b = a.shift();
    "function" === typeof b && vk(216, b);
    a.length &&
      x.setTimeout(
        wk(215, function () {
          return Tp(a);
        }),
        0
      );
  }
  function Vp(a, b, c) {
    a.google_sa_queue = a.google_sa_queue || [];
    a.google_sa_impl ? c(b) : a.google_sa_queue.push(b);
  }
  function Up(a, b, c) {
    b = J(c, 4) ? b.wb : b.xb;
    var d = {};
    a: {
      if (J(c, 4)) {
        if ((a = a || qn(M))) {
          c = {};
          a = ((c.client = a), (c.plah = M.location.host), c);
          break a;
        }
        throw Error("PublisherCodeNotFoundForAma");
      }
      a = {};
    }
    Wp(a, d);
    Wp(cg() ? { bust: cg() } : {}, d);
    return Sc(b, d);
  }
  function Wp(a, b) {
    od(a, function (c, d) {
      void 0 === b[d] && (b[d] = c);
    });
  }
  function Xp(a) {
    a: {
      var b = void 0 === b ? !1 : b;
      for (var c = [x.top], d = [], e = 0, f; (f = c[e++]); ) {
        (b && !ed(f)) || d.push(f);
        try {
          if (f.frames)
            for (var g = 0; g < f.frames.length && 1024 > c.length; ++g)
              c.push(f.frames[g]);
        } catch (k) {}
      }
      for (b = 0; b < d.length; b++)
        try {
          var h = d[b].frames.google_esf;
          if (h) {
            Dd = h;
            break a;
          }
        } catch (k) {}
      Dd = null;
    }
    if (Dd) return null;
    d = id("IFRAME");
    d.id = "google_esf";
    d.name = "google_esf";
    d.src = Uc(a.Eb).toString();
    d.style.display = "none";
    return d;
  }
  function Yp(a, b, c, d) {
    Zp(a, b, c, d, function (e, f) {
      e = e.document;
      for (var g = void 0, h = 0; !g || e.getElementById(g + "_host"); )
        g = "aswift_" + h++;
      e = g;
      g = Number(f.google_ad_width || 0);
      f = Number(f.google_ad_height || 0);
      h = id("DIV");
      h.id = e + "_host";
      var k = h.style;
      k.border = "none";
      k.height = f + "px";
      k.width = g + "px";
      k.margin = "0px";
      k.padding = "0px";
      k.position = "relative";
      k.visibility = "visible";
      k.backgroundColor = "transparent";
      h.style.display = "inline-block";
      c.appendChild(h);
      return { kb: e, Db: h };
    });
  }
  function Zp(a, b, c, d, e) {
    var f = e(a, b);
    e = f.kb;
    $p(a, c, b);
    c = Ta;
    var g = new Date().getTime();
    b.google_lrv = kc(d, 2);
    b.google_async_iframe_id = e;
    b.google_start_time = c;
    b.google_bpp = g > c ? g - c : 1;
    a.google_sv_map = a.google_sv_map || {};
    a.google_sv_map[e] = b;
    d = a.document.getElementById(e + "_host")
      ? function (h) {
          return h();
        }
      : function (h) {
          return window.setTimeout(h, 0);
        };
    Vp(
      a,
      function () {
        var h = f.Db;
        if (!h || !h.isConnected)
          if (
            ((h = a.document.getElementById(
              String(b.google_async_iframe_id) + "_host"
            )),
            null == h)
          )
            throw Error("no_div");
        (h = a.google_sa_impl({
          pubWin: a,
          vars: b,
          outerInsElement: h,
          innerInsElement: h,
        })) && yk(911, h);
      },
      d
    );
  }
  function $p(a, b, c) {
    var d = c.google_ad_output,
      e = c.google_ad_format,
      f = c.google_ad_width || 0,
      g = c.google_ad_height || 0;
    e || ("html" !== d && null != d) || (e = f + "x" + g);
    d =
      !c.google_ad_slot ||
      c.google_override_format ||
      (!bo[c.google_ad_width + "x" + c.google_ad_height] &&
        "aa" === c.google_loader_used);
    e && d ? (e = e.toLowerCase()) : (e = "");
    c.google_ad_format = e;
    if (
      "number" !== typeof c.google_reactive_sra_index ||
      !c.google_ad_unit_key
    ) {
      e = [
        c.google_ad_slot,
        c.google_orig_ad_format || c.google_ad_format,
        c.google_ad_type,
        c.google_orig_ad_width || c.google_ad_width,
        c.google_orig_ad_height || c.google_ad_height,
      ];
      d = [];
      f = 0;
      for (g = b; g && 25 > f; g = g.parentNode, ++f)
        9 === g.nodeType ? d.push("") : d.push(g.id);
      (d = d.join()) && e.push(d);
      c.google_ad_unit_key = pd(e.join(":")).toString();
      var h = void 0 === h ? !1 : h;
      e = [];
      for (d = 0; b && 25 > d; ++d) {
        f = "";
        (void 0 !== h && h) ||
          (f = (f = 9 !== b.nodeType && b.id) ? "/" + f : "");
        a: {
          if (b && b.nodeName && b.parentElement) {
            g = b.nodeName.toString().toLowerCase();
            for (
              var k = b.parentElement.childNodes, l = 0, m = 0;
              m < k.length;
              ++m
            ) {
              var p = k[m];
              if (p.nodeName && p.nodeName.toString().toLowerCase() === g) {
                if (b === p) {
                  g = "." + l;
                  break a;
                }
                ++l;
              }
            }
          }
          g = "";
        }
        e.push((b.nodeName && b.nodeName.toString().toLowerCase()) + f + g);
        b = b.parentElement;
      }
      h = e.join() + ":";
      b = [];
      if (a)
        try {
          var r = a.parent;
          for (e = 0; r && r !== a && 25 > e; ++e) {
            var y = r.frames;
            for (d = 0; d < y.length; ++d)
              if (a === y[d]) {
                b.push(d);
                break;
              }
            a = r;
            r = a.parent;
          }
        } catch (E) {}
      c.google_ad_dom_fingerprint = pd(h + b.join()).toString();
    }
  }
  function aq() {
    var a = fd(x);
    a &&
      ((a = He(a)),
      a.tagSpecificState[1] ||
        (a.tagSpecificState[1] = { debugCard: null, debugCardRequested: !1 }));
  }
  function bq(a) {
    sp();
    tp(um(), kc(a, 8)) ||
      wk(779, function () {
        var b = window;
        b = void 0 === b ? window : b;
        b = Q(b.PeriodicSyncManager ? Uf : Vf);
        var c = Q(Xf);
        b = new qp(!0, b, c);
        0 < bg($f) ? (M.google_trust_token_operation_promise = yp(b)) : yp(b);
      })();
    a = Qp();
    null != a &&
      a.then(function (b) {
        a: {
          Gb = !0;
          try {
            var c = JSON.stringify(b.toJSON(), tc);
            break a;
          } finally {
            Gb = !1;
          }
          c = void 0;
        }
        M.google_user_agent_client_hint = c;
      });
    Cn();
  }
  function cq(a, b) {
    switch (a) {
      case "google_reactive_ad_format":
        return (a = parseInt(b, 10)), isNaN(a) ? 0 : a;
      case "google_allow_expandable_ads":
        return /^true$/.test(b);
      default:
        return b;
    }
  }
  function dq(a, b) {
    if (a.getAttribute("src")) {
      var c = a.getAttribute("src") || "",
        d = dd(c, "client");
      d && (b.google_ad_client = cq("google_ad_client", d));
      (c = dd(c, "host")) && (b.google_ad_host = cq("google_ad_host", c));
    }
    a = a.attributes;
    c = a.length;
    for (d = 0; d < c; d++) {
      var e = a[d];
      if (/data-/.test(e.name)) {
        var f = Ua(
          e.name
            .replace("data-matched-content", "google_content_recommendation")
            .replace("data", "google")
            .replace(/-/g, "_")
        );
        b.hasOwnProperty(f) || ((e = cq(f, e.value)), null !== e && (b[f] = e));
      }
    }
  }
  function eq(a) {
    if ((a = Gd(a)))
      switch (a.data && a.data.autoFormat) {
        case "rspv":
          return 13;
        case "mcrspv":
          return 15;
        default:
          return 14;
      }
    else return 12;
  }
  function fq(a, b, c, d) {
    dq(a, b);
    if (
      c.document &&
      c.document.body &&
      !Ko(c, b) &&
      !b.google_reactive_ad_format
    ) {
      var e = parseInt(a.style.width, 10),
        f = Oo(a, c);
      if (0 < f && e > f) {
        var g = parseInt(a.style.height, 10);
        e = !!bo[e + "x" + g];
        var h = f;
        if (e) {
          var k = co(f, g);
          if (k) (h = k), (b.google_ad_format = k + "x" + g + "_0ads_al");
          else throw new S("No slot size for availableWidth=" + f);
        }
        b.google_ad_resize = !0;
        b.google_ad_width = h;
        e || ((b.google_ad_format = null), (b.google_override_format = !0));
        f = h;
        a.style.width = f + "px";
        g = Fo(f, "auto", c, a, b);
        h = f;
        g.size().i(c, b, a);
        po(g, h, b);
        g = g.size();
        b.google_responsive_formats = null;
        g.L > f &&
          !e &&
          ((b.google_ad_width = g.L), (a.style.width = g.L + "px"));
      }
    }
    e = a.offsetWidth || Ui(a, c, "width", L) || b.google_ad_width || 0;
    if (488 > Je(c)) {
      f = fd(c) || c;
      g = b.google_ad_client;
      if (
        (d =
          ak(f.location, "google_responsive_slot_preview") ||
          Q(uf) ||
          wm(f, 1, g, d))
      )
        b: if (
          b.google_reactive_ad_format ||
          b.google_ad_resize ||
          Ko(c, b) ||
          Ji(a, b)
        )
          d = !1;
        else {
          for (d = a; d; d = d.parentElement) {
            f = jd(d, c);
            if (!f) {
              b.gfwrnwer = 18;
              d = !1;
              break b;
            }
            if (!ib(["static", "relative"], f.position)) {
              b.gfwrnwer = 17;
              d = !1;
              break b;
            }
          }
          d = Ni(c, a, e, 0.3, b);
          !0 !== d ? ((b.gfwrnwer = d), (d = !1)) : (d = c === c.top ? !0 : !1);
        }
      d
        ? ((b.google_resizing_allowed = !0),
          (b.ovlp = !0),
          (b.google_ad_format = "auto"),
          (b.iaaso = !0),
          (b.armr = 1),
          (d = !0))
        : (d = !1);
    } else d = !1;
    if ((e = Ko(c, b))) Mo(e, a, b, c, d);
    else {
      if (Ji(a, b)) {
        if ((d = jd(a, c)))
          (a.style.width = d.width), (a.style.height = d.height), Ii(d, b);
        b.google_ad_width || (b.google_ad_width = a.offsetWidth);
        b.google_ad_height || (b.google_ad_height = a.offsetHeight);
        b.google_loader_features_used = 256;
        b.google_responsive_auto_format = eq(c);
      } else Ii(a.style, b);
      (c.location && "#gfwmrp" == c.location.hash) ||
      (12 == b.google_responsive_auto_format &&
        "true" == b.google_full_width_responsive)
        ? Mo(10, a, b, c, !1)
        : 0.01 > Math.random() &&
          12 === b.google_responsive_auto_format &&
          ((a = Oi(
            a.offsetWidth || parseInt(a.style.width, 10) || b.google_ad_width,
            c,
            a,
            b
          )),
          !0 !== a ? ((b.efwr = !1), (b.gfwrnwer = a)) : (b.efwr = !0));
    }
  }
  var gq = ja(["(a=0)=>{let b;const c=class{};}"]);
  function hq() {
    var a = gq[0];
    var b = Nc();
    a = b ? b.createScript(a) : a;
    a = new Pc(a, Oc);
    try {
      b = window;
      var c =
        a instanceof Pc && a.constructor === Pc ? a.h : "type_error:SafeScript";
      b.eval(c) === c && b.eval(c.toString());
      return { supports: !0, error: "" };
    } catch (d) {
      return { supports: !1, error: String(d) };
    }
  }
  function iq(a) {
    var b = window;
    var c = void 0 === c ? null : c;
    Gc(b, "message", function (d) {
      try {
        var e = JSON.parse(d.data);
      } catch (f) {
        return;
      }
      !e ||
        "sc-cnf" !== e.googMsgType ||
        (c && /[:|%3A]javascript\(/i.test(d.data) && !c(e, d)) ||
        a(e, d);
    });
  }
  function jq(a) {
    Nk.call(this);
    this.i = a;
    this.h = null;
  }
  w(jq, Nk);
  jq.prototype.j = function () {
    Nk.prototype.j.call(this);
  };
  function kq(a) {
    Nk.call(this);
    this.l = a;
    this.h = null;
    this.i = !1;
  }
  w(kq, Nk);
  var lq = null,
    mq = [],
    nq = new q.Map(),
    oq = -1;
  function pq(a) {
    return bj.test(a.className) && "done" !== a.dataset.adsbygoogleStatus;
  }
  function qq(a, b, c) {
    a.dataset.adsbygoogleStatus = "done";
    rq(a, b, c);
  }
  function rq(a, b, c) {
    var d = window;
    d.google_spfd || (d.google_spfd = fq);
    var e = b.google_reactive_ads_config;
    e || fq(a, b, d, c);
    Rp(d, b);
    if (!sq(a, b, d)) {
      e || (d.google_lpabyc = Ki(a, d) + Ui(a, d, "height", L));
      if (e) {
        e = e.page_level_pubvars || {};
        if (
          T(M).page_contains_reactive_tag &&
          !T(M).allow_second_reactive_tag
        ) {
          if (e.pltais) {
            Km(!1);
            return;
          }
          throw new S("Only one 'enable_page_level_ads' allowed per page.");
        }
        T(M).page_contains_reactive_tag = !0;
        Km(7 === e.google_pgb_reactive);
      }
      b.google_unique_id = Jd(d);
      od(mn, function (f, g) {
        b[g] = b[g] || d[g];
      });
      b.google_loader_used = "aa";
      b.google_reactive_tag_first = 1 === (T(M).first_tag_on_page || 0);
      vk(164, function () {
        Yp(d, b, a, c);
      });
    }
  }
  function sq(a, b, c) {
    var d = b.google_reactive_ads_config,
      e =
        "string" === typeof a.className &&
        RegExp("(\\W|^)adsbygoogle-noablate(\\W|$)").test(a.className),
      f = Im(c);
    if (f && f.Ia && "on" !== b.google_adtest && !e) {
      e = Ki(a, c);
      var g = Ie(c).clientHeight;
      if (!f.sa || (f.sa && ((0 == g ? null : e / g) || 0) >= f.sa))
        return (
          (a.className += " adsbygoogle-ablated-ad-slot"),
          (c = c.google_sv_map = c.google_sv_map || {}),
          (d = Ka(a)),
          (b.google_element_uid = d),
          (c[b.google_element_uid] = b),
          a.setAttribute("google_element_uid", String(d)),
          "slot" === f.Ab &&
            (null !== td(a.getAttribute("width")) && a.setAttribute("width", 0),
            null !== td(a.getAttribute("height")) &&
              a.setAttribute("height", 0),
            (a.style.width = "0px"),
            (a.style.height = "0px")),
          !0
        );
    }
    if (
      (f = jd(a, c)) &&
      "none" === f.display &&
      !("on" === b.google_adtest || 0 < b.google_reactive_ad_format || d)
    )
      return (
        c.document.createComment &&
          a.appendChild(
            c.document.createComment(
              "No ad requested because of display:none on the adsbygoogle tag"
            )
          ),
        !0
      );
    a = null == b.google_pgb_reactive || 3 === b.google_pgb_reactive;
    return (1 !== b.google_reactive_ad_format &&
      8 !== b.google_reactive_ad_format) ||
      !a
      ? !1
      : (x.console &&
          x.console.warn(
            "Adsbygoogle tag with data-reactive-ad-format=" +
              String(b.google_reactive_ad_format) +
              " is deprecated. Check out page-level ads at https://www.google.com/adsense"
          ),
        !0);
  }
  function tq(a) {
    var b = document.getElementsByTagName("INS");
    for (var c = 0, d = b[c]; c < b.length; d = b[++c]) {
      var e = d;
      if (
        pq(e) &&
        "reserved" !== e.dataset.adsbygoogleStatus &&
        (!a || d.id === a)
      )
        return d;
    }
    return null;
  }
  function uq(a, b, c) {
    if (a && a.shift)
      for (var d = 20; 0 < a.length && 0 < d; ) {
        try {
          vq(a.shift(), b, c);
        } catch (e) {
          setTimeout(function () {
            throw e;
          });
        }
        --d;
      }
  }
  function wq() {
    var a = id("INS");
    a.className = "adsbygoogle";
    a.className += " adsbygoogle-noablate";
    wd(a, { display: "none" });
    return a;
  }
  function xq(a, b) {
    var c = {};
    od(Ee, function (f, g) {
      !1 === a.enable_page_level_ads
        ? (c[g] = !1)
        : a.hasOwnProperty(g) && (c[g] = a[g]);
    });
    Ja(a.enable_page_level_ads) &&
      (c.page_level_pubvars = a.enable_page_level_ads);
    var d = wq();
    Cd.body.appendChild(d);
    var e = {};
    e =
      ((e.google_reactive_ads_config = c),
      (e.google_ad_client = a.google_ad_client),
      e);
    e.google_pause_ad_requests = !!T(M).pause_ad_requests;
    qq(d, e, b);
  }
  function yq(a, b) {
    function c() {
      return xq(a, b);
    }
    He(x).wasPlaTagProcessed = !0;
    var d = x.document;
    if (d.body || "complete" === d.readyState || "interactive" === d.readyState)
      c();
    else {
      var e = Fc(wk(191, c));
      Gc(d, "DOMContentLoaded", e);
      new x.MutationObserver(function (f, g) {
        d.body && (e(), g.disconnect());
      }).observe(d, { childList: !0, subtree: !0 });
    }
  }
  function vq(a, b, c) {
    var d = {};
    vk(
      165,
      function () {
        return zq(a, d, b, c);
      },
      function (e) {
        e.client = e.client || d.google_ad_client || a.google_ad_client;
        e.slotname = e.slotname || d.google_ad_slot;
        e.tag_origin = e.tag_origin || d.google_tag_origin;
      }
    );
  }
  function Aq(a) {
    delete a.google_checked_head;
    od(a, function (b, c) {
      aj[c] ||
        (delete a[c],
        x.console.warn(
          "AdSense head tag doesn't support " +
            c.replace("google", "data").replace(/_/g, "-") +
            " attribute."
        ));
    });
  }
  function Bq(a, b) {
    var c =
      M.document.querySelector(
        'script[src*="/pagead/js/adsbygoogle.js?client="]:not([data-checked-head])'
      ) ||
      M.document.querySelector(
        'script[src*="/pagead/js/adsbygoogle.js"][data-ad-client]:not([data-checked-head])'
      );
    if (c) {
      c.setAttribute("data-checked-head", "true");
      var d = T(window);
      if (d.head_tag_slot_vars) Cq(c);
      else {
        var e = {};
        dq(c, e);
        Aq(e);
        var f = Lc(e);
        d.head_tag_slot_vars = f;
        c = { google_ad_client: e.google_ad_client, enable_page_level_ads: e };
        M.adsbygoogle || (M.adsbygoogle = []);
        d = M.adsbygoogle;
        d.loaded ? d.push(c) : d.splice && d.splice(0, 0, c);
        var g;
        e.google_adbreak_test ||
        ((null == (g = mc(b, em, 13, Xb)) ? 0 : J(g, 3)) && Q(Af))
          ? Dq(f, a)
          : iq(function () {
              Dq(f, a);
            });
      }
    }
  }
  function Cq(a) {
    var b = T(window).head_tag_slot_vars,
      c = a.getAttribute("src") || "";
    if (
      (a = dd(c, "client") || a.getAttribute("data-ad-client") || "") &&
      a !== b.google_ad_client
    )
      throw new S(
        "Warning: Do not add multiple property codes with AdSense tag to avoid seeing unexpected behavior. These codes were found on the page " +
          a +
          ", " +
          b.google_ad_client
      );
  }
  function Eq(a) {
    if ("object" === typeof a && null != a) {
      if ("string" === typeof a.type) return 2;
      if ("string" === typeof a.sound || "string" === typeof a.preloadAdBreaks)
        return 3;
    }
    return 0;
  }
  function zq(a, b, c, d) {
    if (null == a) throw new S("push() called with no parameters.");
    Ub(d, fm, 14) && Fq(a, $b(sm(d), 1), kc(d, 2));
    var e = Eq(a);
    if (0 !== e)
      (d = Lm()),
        d.first_slotcar_request_processing_time ||
          ((d.first_slotcar_request_processing_time = Date.now()),
          (d.adsbygoogle_execution_start_time = Ta)),
        null == lq
          ? (Gq(a), mq.push(a))
          : 3 === e
          ? vk(787, function () {
              lq.handleAdConfig(a);
            })
          : yk(730, lq.handleAdBreak(a));
    else {
      Ta = new Date().getTime();
      Sp(c, d, Hq(a));
      Iq();
      a: {
        if (void 0 != a.enable_page_level_ads) {
          if ("string" === typeof a.google_ad_client) {
            e = !0;
            break a;
          }
          throw new S("'google_ad_client' is missing from the tag config.");
        }
        e = !1;
      }
      if (e) Jq(a, d);
      else if (
        ((e = a.params) &&
          od(e, function (g, h) {
            b[h] = g;
          }),
        "js" === b.google_ad_output)
      )
        console.warn(
          "Ads with google_ad_output='js' have been deprecated and no longer work. Contact your AdSense account manager or switch to standard AdSense ads."
        );
      else {
        e = Kq(a.element);
        dq(e, b);
        c = T(x).head_tag_slot_vars || {};
        od(c, function (g, h) {
          b.hasOwnProperty(h) || (b[h] = g);
        });
        if (e.hasAttribute("data-require-head") && !T(x).head_tag_slot_vars)
          throw new S(
            "AdSense head tag is missing. AdSense body tags don't work without the head tag. You can copy the head tag from your account on https://adsense.com."
          );
        if (!b.google_ad_client)
          throw new S("Ad client is missing from the slot.");
        Q(xf) || (b.google_apsail = Cm(b.google_ad_client));
        var f = (c = 0 === (T(M).first_tag_on_page || 0) && en(b)) && fn(c);
        c &&
          (f || (Jq(c, d), (T(M).skip_next_reactive_tag = !0)),
          Q(wf) && f && Lq(c));
        0 === (T(M).first_tag_on_page || 0) && (T(M).first_tag_on_page = 2);
        b.google_pause_ad_requests = !!T(M).pause_ad_requests;
        qq(e, b, d);
        !Q(wf) && c && f && Lq(c);
      }
    }
  }
  var Mq = !1;
  function Fq(a, b, c) {
    Mq ||
      ((Mq = !0),
      (a = Hq(a) || qn(M)),
      xk("predictive_abg", { a_c: a, p_c: b.join(), b_v: c }, 0.01));
  }
  function Hq(a) {
    return a.google_ad_client
      ? a.google_ad_client
      : (a = a.params) && a.google_ad_client
      ? a.google_ad_client
      : "";
  }
  function Iq() {
    if (Q(rf)) {
      var a = Im(M);
      if (!(a = a && a.Ia)) {
        try {
          var b = M.localStorage;
        } catch (c) {
          b = null;
        }
        b = b ? dm(b) : null;
        a = !(b && cm(b) && b);
      }
      a || Jm(M, 1);
    }
  }
  function Lq(a) {
    Bd(function () {
      He(x).wasPlaTagProcessed || (x.adsbygoogle && x.adsbygoogle.push(a));
    });
  }
  function Jq(a, b) {
    if (T(M).skip_next_reactive_tag) T(M).skip_next_reactive_tag = !1;
    else {
      0 === (T(M).first_tag_on_page || 0) && (T(M).first_tag_on_page = 1);
      if (a.tag_partner) {
        var c = a.tag_partner,
          d = T(x);
        d.tag_partners = d.tag_partners || [];
        d.tag_partners.push(c);
      }
      gn(a, b);
      yq(a, b);
    }
  }
  function Kq(a) {
    if (a) {
      if (!pq(a) && (a.id ? (a = tq(a.id)) : (a = null), !a))
        throw new S("'element' has already been filled.");
      if (!("innerHTML" in a))
        throw new S("'element' is not a good DOM element.");
    } else if (((a = tq()), !a))
      throw new S(
        "All ins elements in the DOM with class=adsbygoogle already have ads in them."
      );
    return a;
  }
  function Nq() {
    var a = new Pk(M),
      b = new jq(M),
      c = new kq(M),
      d = M.__cmp ? 1 : 0;
    a = Qk(a) ? 1 : 0;
    var e, f;
    (f = "function" === typeof (null == (e = b.i) ? void 0 : e.__uspapi)) ||
      (b.h ? (b = b.h) : ((b.h = ud(b.i, "__uspapiLocator")), (b = b.h)),
      (f = null != b));
    c.i || (c.h || (c.h = ud(c.l, "googlefcPresent")), (c.i = !0));
    xk(
      "cmpMet",
      { tcfv1: d, tcfv2: a, usp: f ? 1 : 0, fc: c.h ? 1 : 0, ptt: 9 },
      0.001
    );
  }
  function Oq(a) {
    Ck().S[Ek(26)] = !!Number(a);
  }
  function Pq(a) {
    Number(a)
      ? (T(M).pause_ad_requests = !0)
      : ((T(M).pause_ad_requests = !1),
        (a = function () {
          if (!T(M).pause_ad_requests) {
            var b = void 0 === b ? {} : b;
            if ("function" === typeof window.CustomEvent)
              var c = new CustomEvent(
                "adsbygoogle-pub-unpause-ad-requests-event",
                b
              );
            else
              (c = document.createEvent("CustomEvent")),
                c.initCustomEvent(
                  "adsbygoogle-pub-unpause-ad-requests-event",
                  !!b.bubbles,
                  !!b.cancelable,
                  b.detail
                );
            M.dispatchEvent(c);
          }
        }),
        x.setTimeout(a, 0),
        x.setTimeout(a, 1e3));
  }
  function Qq(a) {
    xk("adsenseGfpKnob", { value: a, ptt: 9 }, 0.1);
    switch (a) {
      case 0:
      case 2:
        a = !0;
        break;
      case 1:
        a = !1;
        break;
      default:
        throw Error("Illegal value of cookieOptions: " + a);
    }
    M._gfp_a_ = a;
  }
  function Rq(a) {
    a && a.call && "function" === typeof a && window.setTimeout(a, 0);
  }
  function Dq(a, b) {
    b = cn(Sc(b.zb, cg() ? { bust: cg() } : {})).then(function (c) {
      null == lq && (c.init(a), (lq = c), Sq());
    });
    yk(723, b);
    t(b, "finally").call(b, function () {
      mq.length = 0;
      xk("slotcar", {
        event: "api_ld",
        time: Date.now() - Ta,
        time_pr: Date.now() - oq,
      });
    });
  }
  function Sq() {
    for (var a = v(nq), b = a.next(); !b.done; b = a.next()) {
      var c = v(b.value);
      b = c.next().value;
      c = c.next().value;
      -1 !== c && (x.clearTimeout(c), nq.delete(b));
    }
    a = {};
    for (b = 0; b < mq.length; a = { ia: a.ia, ea: a.ea }, b++)
      nq.has(b) ||
        ((a.ea = mq[b]),
        (a.ia = Eq(a.ea)),
        vk(
          723,
          (function (d) {
            return function () {
              3 === d.ia
                ? lq.handleAdConfig(d.ea)
                : 2 === d.ia && yk(730, lq.handleAdBreakBeforeReady(d.ea));
            };
          })(a)
        ));
  }
  function Gq(a) {
    var b = mq.length;
    if (2 === Eq(a) && "preroll" === a.type && null != a.adBreakDone) {
      -1 === oq && (oq = Date.now());
      var c = x.setTimeout(function () {
        try {
          (0, a.adBreakDone)({
            breakType: "preroll",
            breakName: a.name,
            breakFormat: "preroll",
            breakStatus: "timeout",
          }),
            nq.set(b, -1),
            xk("slotcar", { event: "pr_to", source: "adsbygoogle" });
        } catch (d) {
          console.error(
            "[Ad Placement API] adBreakDone callback threw an error:",
            d instanceof Error ? d : Error(String(d))
          );
        }
      }, 1e3 * bg(Bf));
      nq.set(b, c);
    }
  }
  (function (a, b, c, d) {
    d = void 0 === d ? function () {} : d;
    tk.Xa(zk);
    vk(166, function () {
      var e = Xo(b);
      Uo(kc(e, 2));
      vm(J(e, 6));
      d();
      Fd(16, [1, e.toJSON()]);
      var f = Hd(Gd(M)) || M,
        g = c(Vo({ jb: a, vb: kc(e, 2) }), e);
      zm(f, e);
      ao(f, e, null === M.document.currentScript ? 1 : zn(g.Cb));
      wn();
      if (!Ya() || 0 <= Va(ab(), 11)) {
        uk(Q(Ef));
        bq(e);
        Ql();
        try {
          ip();
        } catch (p) {}
        aq();
        Bq(g, e);
        f = window;
        var h = f.adsbygoogle;
        if (!h || !h.loaded) {
          xk(
            "new_abg_tag",
            { value: "" + J(e, 16), host_v: "" + J(e, 22), frequency: 0.01 },
            0.01
          );
          Nq();
          var k = {
            push: function (p) {
              vq(p, g, e);
            },
            loaded: !0,
          };
          try {
            Object.defineProperty(k, "requestNonPersonalizedAds", { set: Oq }),
              Object.defineProperty(k, "pauseAdRequests", { set: Pq }),
              Object.defineProperty(k, "cookieOptions", { set: Qq }),
              Object.defineProperty(k, "onload", { set: Rq });
          } catch (p) {}
          if (h)
            for (
              var l = v([
                  "requestNonPersonalizedAds",
                  "pauseAdRequests",
                  "cookieOptions",
                ]),
                m = l.next();
              !m.done;
              m = l.next()
            )
              (m = m.value), void 0 !== h[m] && (k[m] = h[m]);
          "_gfp_a_" in window || (window._gfp_a_ = !0);
          uq(h, g, e);
          f.adsbygoogle = k;
          h && (k.onload = h.onload);
          (f = Xp(g)) && document.documentElement.appendChild(f);
          f = hq();
          xk(
            "modern_js",
            {
              fy: jc(C(e, 1), 0),
              supports: String(f.supports),
              c: 2012,
              e: f.error,
            },
            0.01
          );
        }
      }
    });
  })("m202211080101", Wo, function (a, b) {
    var c = 2012 < jc(C(b, 1), 0) ? "_fy" + jc(C(b, 1), 0) : "",
      d = kc(b, 3),
      e = kc(b, 2);
    b = Id(Po, a, c);
    d = Id(Qo, e, d);
    return {
      zb: b,
      xb: Id(Ro, a, c),
      wb: Id(So, a, c),
      dc: Id(To, a, c),
      Eb: d,
      Cb: /^(?:https?:)?\/\/(?:pagead2\.googlesyndication\.com|securepubads\.g\.doubleclick\.net)\/pagead\/(?:js\/)?(?:show_ads|adsbygoogle)\.js(?:[?#].*)?$/,
    };
  });
}.call(
  this,
  '[2021,"r20221109","r20190131",null,null,null,null,".google.cn",null,null,null,[[[1082,null,null,[1]],[null,1130,null,[null,100]],[null,1126,null,[null,10000]],[null,1032,null,[null,200],[[[12,null,null,null,4,null,"Android",["navigator.userAgent"]],[null,500]]]],[null,1159,null,[null,500]],[1122,null,null,[1]],[1207,null,null,[1]],[null,66,null,[null,-1]],[null,65,null,[null,-1]],[1205,null,null,[1]],[1213,null,null,[1]],[1167,null,null,[1]],[1129,null,null,[1]],[null,1169,null,[null,61440]],[1201,null,null,[1]],[1199,null,null,[1]],[1161,null,null,[1]],[1212,null,null,[1]],[1211,null,null,[1]],[null,1072,null,[null,0.75]],[1101,null,null,[1]],[null,1168,null,[null,61440]],[1198,null,null,[1]],[1206,null,null,[1]],[1184,null,null,[1]],[1190,null,null,[1]],[380254521,null,null,[1]],[null,1085,null,[null,5]],[null,63,null,[null,30]],[null,1080,null,[null,5]],[63682,null,null,[1]],[null,1027,null,[null,10]],[null,57,null,[null,120]],[null,1079,null,[null,5]],[null,1050,null,[null,30]],[null,58,null,[null,120]],[1033,null,null,[1]],[null,null,null,[null,null,null,["Az6AfRvI8mo7yiW5fLfj04W21t0ig6aMsGYpIqMTaX60H+b0DkO1uDr+7BrzMcimWzv/X7SXR8jI+uvbV0IJlwYAAACFeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==","A+USTya+tNvDPaxUgJooz+LaVk5hPoAxpLvSxjogX4Mk8awCTQ9iop6zJ9d5ldgU7WmHqBlnQB41LHHRFxoaBwoAAACLeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==","A7FovoGr67TUBYbnY+Z0IKoJbbmRmB8fCyirUGHavNDtD91CiGyHHSA2hDG9r9T3NjUKFi6egL3RbgTwhhcVDwUAAACLeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ=="]],null,1934],[1947,null,null,[1]],[null,1972,null,[]],[null,1142,null,[null,8]],[null,1195,null,[null,1]],[null,1119,null,[null,300]],[null,1193,null,[null,100]],[null,1114,null,[null,1]],[null,1116,null,[null,300]],[null,1117,null,[null,100]],[null,1110,null,[null,5]],[null,1111,null,[null,5]],[null,1112,null,[null,5]],[null,1113,null,[null,5]],[null,1115,null,[null,-1]],[null,1194,null,[null,1]],[null,469675170,null,[null,30000]],[479047366,null,null,[1]],[392736476,null,null,[]],[null,null,null,[],null,1932],[432938498,null,null,[]]],[[10,[[1,[[42531513],[42531514,[[316,null,null,[1]]]]]],[1,[[42531644],[42531645,[[368,null,null,[1]]]],[42531646,[[369,null,null,[1]],[368,null,null,[1]]]]]],[500,[[42531705],[42531706]]],[1,[[44719338],[44719339,[[334,null,null,[1]],[null,54,null,[null,100]],[null,66,null,[null,10]],[null,65,null,[null,1000]]]]]],[20,[[44760911],[44760912,[[1160,null,null,[1]]]],[44768832,[[1160,null,null,[1]]]]]],[10,[[44767166],[44767167]]],[10,[[44769305],[44769306,[[313,null,null,[1]]]]]],[null,[[44755592],[44755593,[[null,null,1166,[null,null,"h.3.0.0"]]]],[44755594,[[null,null,1166,[null,null,"h.3.0.0"]]]],[44755653,[[null,null,1166,[null,null,"h.3.0.0"]]]]],null,51],[1,[[44770147],[44770148,[[null,null,1166,[null,null,"h.3.0.0"]]]],[44773339,[[null,null,1166,[null,null,"h.3.0.0"]]]],[44773340,[[null,null,1166,[null,null,"h.3.0.0"]]]]],null,51],[null,[[44771607],[44771608,[[1200,null,null,[1]]]]],null,51],[50,[[44773613],[44773614,[[null,null,1166,[null,null,"h.3.0.0"]]]]],null,51],[1000,[[44774652,null,[4,null,6,null,null,null,null,["44774648"]]],[44774653,[[1086,null,null,[1]]],[4,null,6,null,null,null,null,["44774649"]]]]],[10,[[44775121,[[null,null,1166,[null,null,"h.3.0.0"]],[10000,null,null,[1]]]],[44776004]],null,51],[1,[[44775965],[44775966,[[null,null,1166,[null,null,"h.3.0.0"]]]]],null,51],[10,[[44776360],[44776361,[[null,null,1166,[null,null,"h.3.0.0"]]]]],null,51],[50,[[44777506],[44777508],[44778780]],null,51],[1,[[44778608],[44778609]],null,51],[10,[[21066428],[21066429]]],[1,[[31070201],[31070202,[[1210,null,null,[1]]]]]],[100,[[31070762],[31070763,[[1214,null,null,[1]]]]]],[1000,[[31070830,[[null,null,14,[null,null,"31070830"]]],[6,null,null,null,6,null,"31070830"]],[31070831,[[null,null,14,[null,null,"31070831"]]],[6,null,null,null,6,null,"31070831"]]],[4,null,55],63],[1000,[[31070852,[[null,null,14,[null,null,"31070852"]]],[6,null,null,null,6,null,"31070852"]],[31070853,[[null,null,14,[null,null,"31070853"]]],[6,null,null,null,6,null,"31070853"]]],[4,null,55],63],[null,[[44770765],[44770766,[[1134,null,null,[1]]]]]],[250,[[44770880],[44770881,[[1171,null,null,[1]]]]]],[5,[[44772268],[44772269,[[1185,null,null,[1]]]]]],[50,[[44774292],[44774606,[[1147,null,null,[1]]]]],null,54],[10,[[44774293,[[1147,null,null,[1]]]],[44774605,[[1147,null,null,[1]]]],[44776415]],null,54],[null,[[44777830],[44777831,[[63682,null,null,[1]]]]],null,51],[50,[[44777948],[44777949,[[1198,null,null,[]]]]]],[50,[[31067422],[31067423,[[null,1032,null,[]]]],[31068456],[44775620],[44775621],[44776074],[44777421]],[3,[[4,null,8,null,null,null,null,["gmaSdk.getQueryInfo"]],[4,null,8,null,null,null,null,["webkit.messageHandlers.getGmaQueryInfo.postMessage"]],[4,null,8,null,null,null,null,["webkit.messageHandlers.getGmaSig.postMessage"]]]],69],[10,[[44776368],[44776369]],[3,[[4,null,8,null,null,null,null,["gmaSdk.getQueryInfo"]],[4,null,8,null,null,null,null,["webkit.messageHandlers.getGmaQueryInfo.postMessage"]],[4,null,8,null,null,null,null,["webkit.messageHandlers.getGmaSig.postMessage"]]]],69]]],[17,[[10,[[44773745],[44773746],[44773747]],null,null,null,null,31,null,null,113],[10,[[21066430],[21066431],[21066432],[21066433]],null,null,null,44,22],[10,[[21066434],[21066435]],null,null,null,44,null,500],[10,[[31060047]],null,null,null,44,null,900],[10,[[31060048],[31060049]],null,null,null,null,null,null,null,101],[10,[[31060566]]],[10,[[31069794,[[null,1103,null,[null,31069794]]]],[31069795,[[1120,null,null,[1]],[null,1195,null,[null,5]],[null,1103,null,[null,31069795]],[473840707,null,null,[1]],[null,1114,null,[null,0.4]],[null,1108,null,[null,1000]],[null,1194,null,[null,2]]]]],[4,null,55],null,null,null,null,null,null,115],[1,[[31070280,[[null,1103,null,[null,31070280]],[1121,null,null,[1]]]],[31070281,[[1120,null,null,[1]],[null,1103,null,[null,31070281]],[null,1114,null,[null,0.4]],[null,1108,null,[null,1000]],[1121,null,null,[1]]]]],[4,null,55],null,null,null,null,80,null,115],[20,[[44777812,[[1120,null,null,[1]],[null,1195,null,[null,5]],[null,1103,null,[null,44777812]],[473840707,null,null,[1]],[null,1114,null,[null,0.4]],[null,1108,null,[null,300]],[null,1194,null,[null,2]]]],[44777813,[[1120,null,null,[1]],[null,1195,null,[null,5]],[null,1103,null,[null,44777813]],[473840707,null,null,[1]],[null,1114,null,[null,0.4]],[null,1108,null,[null,300]],[471002731,null,null,[1]],[null,1194,null,[null,2]]]]],[4,null,55],null,null,null,null,180,null,115],[10,[[44777814,[[1162,null,null,[1]],[1120,null,null,[1]],[null,1158,null,[null,45]],[null,1157,null,[null,400]],[null,1103,null,[null,44777814]],[473840707,null,null,[1]],[null,1114,null,[null,-1]],[null,1116,null,[null,50]],[null,1108,null,[null,1000]],[1203,null,null,[1]],[469675169,null,null,[1]]]],[44777815,[[1162,null,null,[1]],[1120,null,null,[1]],[null,1158,null,[null,45]],[null,1157,null,[null,400]],[null,1103,null,[null,44777815]],[473840707,null,null,[1]],[null,1114,null,[null,-1]],[null,1116,null,[null,50]],[null,1108,null,[null,1000]],[1203,null,null,[1]],[471002731,null,null,[1]],[469675169,null,null,[1]]]]],[4,null,55],null,null,null,null,280,null,115],[10,[[44777923,[[1120,null,null,[1]],[null,1195,null,[null,5]],[null,1103,null,[null,44777923]],[473840707,null,null,[1]],[null,1114,null,[null,0.4]],[null,1108,null,[null,300]],[null,1194,null,[null,2]]]],[44777924,[[1120,null,null,[1]],[null,1195,null,[null,5]],[null,1103,null,[null,44777924]],[473840707,null,null,[1]],[483660789,null,null,[1]],[null,1114,null,[null,0.4]],[null,1108,null,[null,300]],[null,1194,null,[null,2]]]]],[4,null,55],null,null,null,null,380,null,115],[10,[[44778613,[[null,1103,null,[null,44778613]]]],[44778614,[[1162,null,null,[1]],[1120,null,null,[1]],[null,1158,null,[null,45]],[null,1157,null,[null,400]],[null,1103,null,[null,44778614]],[473840707,null,null,[1]],[null,1114,null,[null,-1]],[null,1116,null,[null,50]],[null,1108,null,[null,1000]],[1203,null,null,[1]],[480632076,null,null,[1]],[469675169,null,null,[1]],[478725123,null,null,[1]],[472491850,null,null,[1]]]]],[4,null,55],null,null,null,null,20,null,115],[1,[[44778767,[[null,1103,null,[null,44778767]]]],[44778768,[[1120,null,null,[1]],[null,1195,null,[null,5]],[null,1103,null,[null,44778768]],[473840707,null,null,[1]],[null,1114,null,[null,0.4]],[null,1108,null,[null,1000]],[null,1194,null,[null,2]]]],[44778769,[[null,1103,null,[null,44778769]]]]],[4,null,55],null,null,null,null,400,null,115]]],[11,[[10,[[44777178],[44777179,[[1957,null,null,[1]]]]],null,48],[5,[[44777180],[44777181,[[1957,null,null,[1]]]]],null,48],[50,[[31070685],[31070686,[[483374575,null,null,[1]]]]],[4,null,8,null,null,null,null,["sharedStorage"]]]]],[13,[[10,[[31065824],[31065825,[[424117738,null,null,[1]]]]]],[500,[[31061692],[31061693,[[77,null,null,[1]],[78,null,null,[1]],[85,null,null,[1]],[80,null,null,[1]],[76,null,null,[1]]]]],[4,null,6,null,null,null,null,["31061691"]]],[1000,[[31067146,null,[4,null,9,null,null,null,null,["document.browsingTopics"]]]],[12,null,null,null,4,null,"Chrome/((?!100)\\\\d{3,})",["navigator.userAgent"]]],[1000,[[31067147,null,[2,[[4,null,9,null,null,null,null,["navigator.runAdAuction"]],[4,null,9,null,null,null,null,["navigator.joinAdInterestGroup"]]]]]],[12,null,null,null,4,null,"Chrome/((?!100)\\\\d{3,})",["navigator.userAgent"]]],[1000,[[31067148,null,[4,null,69,null,null,null,null,["attribution-reporting"]]]],[12,null,null,null,4,null,"Chrome/((?!100)\\\\d{3,})",["navigator.userAgent"]]],[1000,[[31067672,null,[2,[[4,null,69,null,null,null,null,["browsing-topics"]],[1,[[4,null,70,null,null,null,null,["browsing-topics"]]]]]]]],[12,null,null,null,4,null,"Chrome/((?!100)\\\\d{3,})",["navigator.userAgent"]]],[1000,[[31067673,null,[2,[[4,null,69,null,null,null,null,["join-ad-interest-group"]],[1,[[4,null,70,null,null,null,null,["join-ad-interest-group"]]]]]]]],[12,null,null,null,4,null,"Chrome/((?!100)\\\\d{3,})",["navigator.userAgent"]]],[1000,[[31067674,null,[2,[[4,null,69,null,null,null,null,["run-ad-auction"]],[1,[[4,null,70,null,null,null,null,["run-ad-auction"]]]]]]]],[12,null,null,null,4,null,"Chrome/((?!100)\\\\d{3,})",["navigator.userAgent"]]],[1000,[[31067675,null,[2,[[4,null,69,null,null,null,null,["attribution-reporting"]],[1,[[4,null,70,null,null,null,null,["attribution-reporting"]]]]]]]],[12,null,null,null,4,null,"Chrome/((?!100)\\\\d{3,})",["navigator.userAgent"]]],[1000,[[31068556,null,[4,null,8,null,null,null,null,["sharedStorage"]]]],[12,null,null,null,4,null,"Chrome/((?!100)\\\\d{3,})",["navigator.userAgent"]]],[1000,[[31068557,null,[2,[[4,null,69,null,null,null,null,["shared-storage"]],[1,[[4,null,70,null,null,null,null,["shared-storage"]]]]]]]],[12,null,null,null,4,null,"Chrome/((?!100)\\\\d{3,})",["navigator.userAgent"]]],[10,[[31069563],[31069564,[[471682731,null,null,[1]]]]]],[10,[[31070380],[31070381,[[477209535,null,null,[1]]]]],[4,null,9,null,null,null,null,["document.browsingTopics"]]],[100,[[31070383,null,[4,null,27,null,null,null,null,["crossOriginIsolated"]]],[31070384,[[null,null,null,[null,null,null,["A/6fvn8/Gtanoa1JImBxbvhuYBg6saTOvUwnxxrjfqYKVr6FhYuq735gNAS9yiA9eZCfxy6DNpj7b5RvVydt3AAAAACKeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiQW5vbnltb3VzSWZyYW1lT3JpZ2luVHJpYWwiLCJleHBpcnkiOjE2NzU4MTQzOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9","A+U9qN2zW5GTLxw8s2+dVNTkJno6E+N/ccDejxXyQWvhjPxM7ZW2kkup3QdRQA3PNcdJmf7fmSYjbhYI9IfoTwwAAACQeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiQW5vbnltb3VzSWZyYW1lT3JpZ2luVHJpYWwiLCJleHBpcnkiOjE2NzU4MTQzOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9","A/nrjb/iPi/6otfK9jaRrKeitC60ZEvSBV2LdZ9fK9wYY6avQ4BArkhirmauwsEv8oXTREo3giK6JoHNOyETTwsAAACQeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiQW5vbnltb3VzSWZyYW1lT3JpZ2luVHJpYWwiLCJleHBpcnkiOjE2NzU4MTQzOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9"]],null,472572701],[439828594,null,null,[1]]],[4,null,27,null,null,null,null,["crossOriginIsolated"]]]],[2,[[6,null,null,3,null,0],[12,null,null,null,4,null,"Chrome/((?!10[012345])\\\\d{3,})",["navigator.userAgent"]]]],70],[1,[[31070594],[31070595,[[null,null,null,[null,null,null,["A/6fvn8/Gtanoa1JImBxbvhuYBg6saTOvUwnxxrjfqYKVr6FhYuq735gNAS9yiA9eZCfxy6DNpj7b5RvVydt3AAAAACKeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiQW5vbnltb3VzSWZyYW1lT3JpZ2luVHJpYWwiLCJleHBpcnkiOjE2NzU4MTQzOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9","A+U9qN2zW5GTLxw8s2+dVNTkJno6E+N/ccDejxXyQWvhjPxM7ZW2kkup3QdRQA3PNcdJmf7fmSYjbhYI9IfoTwwAAACQeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiQW5vbnltb3VzSWZyYW1lT3JpZ2luVHJpYWwiLCJleHBpcnkiOjE2NzU4MTQzOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9","A/nrjb/iPi/6otfK9jaRrKeitC60ZEvSBV2LdZ9fK9wYY6avQ4BArkhirmauwsEv8oXTREo3giK6JoHNOyETTwsAAACQeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiQW5vbnltb3VzSWZyYW1lT3JpZ2luVHJpYWwiLCJleHBpcnkiOjE2NzU4MTQzOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9"]],null,472572701],[439828594,null,null,[1]],[483962503,null,null,[1]]]]],[2,[[6,null,null,3,null,0],[12,null,null,null,4,null,"Chrome/((?!10[012345])\\\\d{3,})",["navigator.userAgent"]]]],70],[null,[[44768158,null,[4,null,70,null,null,null,null,["attribution-reporting"]]],[44768159,null,[4,null,70,null,null,null,null,["attribution-reporting"]]]]],[50,[[44776500,null,[4,null,70,null,null,null,null,["attribution-reporting"]]],[44776501,null,[4,null,70,null,null,null,null,["attribution-reporting"]]]]],[50,[[44776502,null,[4,null,70,null,null,null,null,["attribution-reporting"]]],[44776503,null,[4,null,70,null,null,null,null,["attribution-reporting"]]]]]]],[12,[[20,[[21065724],[21065725,[[203,null,null,[1]]]]],[4,null,9,null,null,null,null,["LayoutShift"]]],[10,[[31061690],[31061691,[[83,null,null,[1]],[84,null,null,[1]]]]],null,61],[null,[[31067825],[31067826,[[1971,null,null,[1]]]]]],[10,[[44769661],[44769662,[[1973,null,null,[1]]]]]]]],[20,[[1000,[[31070530,null,[4,null,27,null,null,null,null,["crossOriginIsolated"]]]],[2,[[6,null,null,3,null,0],[12,null,null,null,4,null,"Chrome/((?!10[012345])\\\\d{3,})",["navigator.userAgent"]]]]],[1000,[[31070531,null,[2,[[4,null,27,null,null,null,null,["crossOriginIsolated"]],[4,null,8,null,null,null,null,["anonymouslyFramed"]]]]]],[2,[[6,null,null,3,null,0],[12,null,null,null,4,null,"Chrome/((?!10[012345])\\\\d{3,})",["navigator.userAgent"]]]]],[1000,[[31070532,null,[4,null,9,null,null,null,null,["SharedArrayBuffer"]]]],[2,[[6,null,null,3,null,0],[12,null,null,null,4,null,"Chrome/((?!10[012345])\\\\d{3,})",["navigator.userAgent"]]]]]]]],null,null,[0.001,"1000",1,"1000"]],[1,[]],null,null,1,"word.wd1x.com",1478707479,[44759876,44759927,44759842]]'
));
