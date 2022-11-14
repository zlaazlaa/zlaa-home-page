(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var n,
    aa = function (a) {
      var b = 0;
      return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
      };
    },
    ba =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a;
          },
    ca = function (a) {
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
      throw Error("a");
    },
    p = ca(this),
    t = function (a, b) {
      if (b)
        a: {
          var c = p;
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
            ba(c, a, { configurable: !0, writable: !0, value: b });
        }
    };
  t("Symbol", function (a) {
    if (a) return a;
    var b = function (f, g) {
      this.Le = f;
      ba(this, "description", { configurable: !0, writable: !0, value: g });
    };
    b.prototype.toString = function () {
      return this.Le;
    };
    var c = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
      d = 0,
      e = function (f) {
        if (this instanceof e) throw new TypeError("b");
        return new b(c + (f || "") + "_" + d++, f);
      };
    return e;
  });
  t("Symbol.iterator", function (a) {
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
      var d = p[b[c]];
      "function" === typeof d &&
        "function" != typeof d.prototype[a] &&
        ba(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return da(aa(this));
          },
        });
    }
    return a;
  });
  t("Symbol.asyncIterator", function (a) {
    return a ? a : Symbol("Symbol.asyncIterator");
  });
  var da = function (a) {
      a = { next: a };
      a[Symbol.iterator] = function () {
        return this;
      };
      return a;
    },
    v = function (a) {
      var b =
        "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
      return b ? b.call(a) : { next: aa(a) };
    },
    ea = function (a) {
      if (!(a instanceof Array)) {
        a = v(a);
        for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
        a = c;
      }
      return a;
    },
    fa = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    },
    ha =
      "function" == typeof Object.assign
        ? Object.assign
        : function (a, b) {
            for (var c = 1; c < arguments.length; c++) {
              var d = arguments[c];
              if (d) for (var e in d) fa(d, e) && (a[e] = d[e]);
            }
            return a;
          };
  t("Object.assign", function (a) {
    return a || ha;
  });
  var ia =
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
          if (a.__proto__ !== b) throw new TypeError("c`" + a);
          return a;
        }
      : null;
  }
  var na = ja,
    w = function (a, b) {
      a.prototype = ia(b.prototype);
      a.prototype.constructor = a;
      if (na) na(a, b);
      else
        for (var c in b)
          if ("prototype" != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d);
            } else a[c] = b[c];
      a.yg = b.prototype;
    },
    oa = function () {
      this.Cb = !1;
      this.Pa = null;
      this.Id = void 0;
      this.Ma = 1;
      this.Zd = this.cf = 0;
      this.sb = null;
    },
    pa = function (a) {
      if (a.Cb) throw new TypeError("e");
      a.Cb = !0;
    };
  oa.prototype.Gb = function (a) {
    this.Id = a;
  };
  oa.prototype.Ob = function (a) {
    this.sb = { nf: a, If: !0 };
    this.Ma = this.cf || this.Zd;
  };
  oa.prototype.return = function (a) {
    this.sb = { return: a };
    this.Ma = this.Zd;
  };
  oa.prototype.forIn = function (a) {
    return new ra(a);
  };
  var ra = function (a) {
      this.xe = [];
      for (var b in a) this.xe.push(b);
      this.xe.reverse();
    },
    sa = function (a) {
      this.m = new oa();
      this.jg = a;
    };
  sa.prototype.Gb = function (a) {
    pa(this.m);
    if (this.m.Pa) return ua(this, this.m.Pa.next, a, this.m.Gb);
    this.m.Gb(a);
    return va(this);
  };
  var wa = function (a, b) {
    pa(a.m);
    var c = a.m.Pa;
    if (c)
      return ua(
        a,
        "return" in c
          ? c["return"]
          : function (d) {
              return { value: d, done: !0 };
            },
        b,
        a.m.return
      );
    a.m.return(b);
    return va(a);
  };
  sa.prototype.Ob = function (a) {
    pa(this.m);
    if (this.m.Pa) return ua(this, this.m.Pa["throw"], a, this.m.Gb);
    this.m.Ob(a);
    return va(this);
  };
  var ua = function (a, b, c, d) {
      try {
        var e = b.call(a.m.Pa, c);
        if (!(e instanceof Object)) throw new TypeError("d`" + e);
        if (!e.done) return (a.m.Cb = !1), e;
        var f = e.value;
      } catch (g) {
        return (a.m.Pa = null), a.m.Ob(g), va(a);
      }
      a.m.Pa = null;
      d.call(a.m, f);
      return va(a);
    },
    va = function (a) {
      for (; a.m.Ma; )
        try {
          var b = a.jg(a.m);
          if (b) return (a.m.Cb = !1), { value: b.value, done: !1 };
        } catch (c) {
          (a.m.Id = void 0), a.m.Ob(c);
        }
      a.m.Cb = !1;
      if (a.m.sb) {
        b = a.m.sb;
        a.m.sb = null;
        if (b.If) throw b.nf;
        return { value: b.return, done: !0 };
      }
      return { value: void 0, done: !0 };
    },
    xa = function (a) {
      this.next = function (b) {
        return a.Gb(b);
      };
      this.throw = function (b) {
        return a.Ob(b);
      };
      this.return = function (b) {
        return wa(a, b);
      };
      this[Symbol.iterator] = function () {
        return this;
      };
    },
    ya = function (a) {
      function b(d) {
        return a.next(d);
      }
      function c(d) {
        return a.throw(d);
      }
      return new Promise(function (d, e) {
        function f(g) {
          g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e);
        }
        f(a.next());
      });
    },
    za = function (a) {
      this[Symbol.asyncIterator] = function () {
        return this;
      };
      this[Symbol.iterator] = function () {
        return a;
      };
      this.next = function (b) {
        return Promise.resolve(a.next(b));
      };
      void 0 !== a["throw"] &&
        (this["throw"] = function (b) {
          return Promise.resolve(a["throw"](b));
        });
      void 0 !== a["return"] &&
        (this["return"] = function (b) {
          return Promise.resolve(a["return"](b));
        });
    },
    x = function () {
      for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
        b[c - a] = arguments[c];
      return b;
    };
  t("Promise", function (a) {
    function b() {
      this.Ha = null;
    }
    function c(g) {
      return g instanceof e
        ? g
        : new e(function (h) {
            h(g);
          });
    }
    if (a) return a;
    b.prototype.Rd = function (g) {
      if (null == this.Ha) {
        this.Ha = [];
        var h = this;
        this.Sd(function () {
          h.pf();
        });
      }
      this.Ha.push(g);
    };
    var d = p.setTimeout;
    b.prototype.Sd = function (g) {
      d(g, 0);
    };
    b.prototype.pf = function () {
      for (; this.Ha && this.Ha.length; ) {
        var g = this.Ha;
        this.Ha = [];
        for (var h = 0; h < g.length; ++h) {
          var l = g[h];
          g[h] = null;
          try {
            l();
          } catch (k) {
            this.Xe(k);
          }
        }
      }
      this.Ha = null;
    };
    b.prototype.Xe = function (g) {
      this.Sd(function () {
        throw g;
      });
    };
    var e = function (g) {
      this.ob = 0;
      this.Lb = void 0;
      this.hb = [];
      this.pe = !1;
      var h = this.Uc();
      try {
        g(h.resolve, h.reject);
      } catch (l) {
        h.reject(l);
      }
    };
    e.prototype.Uc = function () {
      function g(k) {
        return function (m) {
          l || ((l = !0), k.call(h, m));
        };
      }
      var h = this,
        l = !1;
      return { resolve: g(this.pg), reject: g(this.td) };
    };
    e.prototype.pg = function (g) {
      if (g === this) this.td(new TypeError("f"));
      else if (g instanceof e) this.sg(g);
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
        h ? this.og(g) : this.be(g);
      }
    };
    e.prototype.og = function (g) {
      var h = void 0;
      try {
        h = g.then;
      } catch (l) {
        this.td(l);
        return;
      }
      "function" == typeof h ? this.tg(h, g) : this.be(g);
    };
    e.prototype.td = function (g) {
      this.De(2, g);
    };
    e.prototype.be = function (g) {
      this.De(1, g);
    };
    e.prototype.De = function (g, h) {
      if (0 != this.ob) throw Error("g`" + g + "`" + h + "`" + this.ob);
      this.ob = g;
      this.Lb = h;
      2 === this.ob && this.qg();
      this.qf();
    };
    e.prototype.qg = function () {
      var g = this;
      d(function () {
        if (g.ag()) {
          var h = p.console;
          "undefined" !== typeof h && h.error(g.Lb);
        }
      }, 1);
    };
    e.prototype.ag = function () {
      if (this.pe) return !1;
      var g = p.CustomEvent,
        h = p.Event,
        l = p.dispatchEvent;
      if ("undefined" === typeof l) return !0;
      "function" === typeof g
        ? (g = new g("unhandledrejection", { cancelable: !0 }))
        : "function" === typeof h
        ? (g = new h("unhandledrejection", { cancelable: !0 }))
        : ((g = p.document.createEvent("CustomEvent")),
          g.initCustomEvent("unhandledrejection", !1, !0, g));
      g.promise = this;
      g.reason = this.Lb;
      return l(g);
    };
    e.prototype.qf = function () {
      if (null != this.hb) {
        for (var g = 0; g < this.hb.length; ++g) f.Rd(this.hb[g]);
        this.hb = null;
      }
    };
    var f = new b();
    e.prototype.sg = function (g) {
      var h = this.Uc();
      g.Xb(h.resolve, h.reject);
    };
    e.prototype.tg = function (g, h) {
      var l = this.Uc();
      try {
        g.call(h, l.resolve, l.reject);
      } catch (k) {
        l.reject(k);
      }
    };
    e.prototype.then = function (g, h) {
      function l(q, z) {
        return "function" == typeof q
          ? function (A) {
              try {
                k(q(A));
              } catch (u) {
                m(u);
              }
            }
          : z;
      }
      var k,
        m,
        r = new e(function (q, z) {
          k = q;
          m = z;
        });
      this.Xb(l(g, k), l(h, m));
      return r;
    };
    e.prototype.catch = function (g) {
      return this.then(void 0, g);
    };
    e.prototype.Xb = function (g, h) {
      function l() {
        switch (k.ob) {
          case 1:
            g(k.Lb);
            break;
          case 2:
            h(k.Lb);
            break;
          default:
            throw Error("h`" + k.ob);
        }
      }
      var k = this;
      null == this.hb ? f.Rd(l) : this.hb.push(l);
      this.pe = !0;
    };
    e.resolve = c;
    e.reject = function (g) {
      return new e(function (h, l) {
        l(g);
      });
    };
    e.race = function (g) {
      return new e(function (h, l) {
        for (var k = v(g), m = k.next(); !m.done; m = k.next())
          c(m.value).Xb(h, l);
      });
    };
    e.all = function (g) {
      var h = v(g),
        l = h.next();
      return l.done
        ? c([])
        : new e(function (k, m) {
            function r(A) {
              return function (u) {
                q[A] = u;
                z--;
                0 == z && k(q);
              };
            }
            var q = [],
              z = 0;
            do
              q.push(void 0),
                z++,
                c(l.value).Xb(r(q.length - 1), m),
                (l = h.next());
            while (!l.done);
          });
    };
    return e;
  });
  t("Object.values", function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d;
          for (d in b) fa(b, d) && c.push(b[d]);
          return c;
        };
  });
  var Aa = function (a, b) {
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
  t("Array.prototype.keys", function (a) {
    return a
      ? a
      : function () {
          return Aa(this, function (b) {
            return b;
          });
        };
  });
  t("WeakMap", function (a) {
    function b() {}
    function c(l) {
      var k = typeof l;
      return ("object" === k && null !== l) || "function" === k;
    }
    function d(l) {
      if (!fa(l, f)) {
        var k = new b();
        ba(l, f, { value: k });
      }
    }
    function e(l) {
      var k = Object[l];
      k &&
        (Object[l] = function (m) {
          if (m instanceof b) return m;
          Object.isExtensible(m) && d(m);
          return k(m);
        });
    }
    if (
      (function () {
        if (!a || !Object.seal) return !1;
        try {
          var l = Object.seal({}),
            k = Object.seal({}),
            m = new a([
              [l, 2],
              [k, 3],
            ]);
          if (2 != m.get(l) || 3 != m.get(k)) return !1;
          m.delete(l);
          m.set(k, 4);
          return !m.has(l) && 4 == m.get(k);
        } catch (r) {
          return !1;
        }
      })()
    )
      return a;
    var f = "$jscomp_hidden_" + Math.random();
    e("freeze");
    e("preventExtensions");
    e("seal");
    var g = 0,
      h = function (l) {
        this.Ab = (g += Math.random() + 1).toString();
        if (l) {
          l = v(l);
          for (var k; !(k = l.next()).done; )
            (k = k.value), this.set(k[0], k[1]);
        }
      };
    h.prototype.set = function (l, k) {
      if (!c(l)) throw Error("i");
      d(l);
      if (!fa(l, f)) throw Error("j`" + l);
      l[f][this.Ab] = k;
      return this;
    };
    h.prototype.get = function (l) {
      return c(l) && fa(l, f) ? l[f][this.Ab] : void 0;
    };
    h.prototype.has = function (l) {
      return c(l) && fa(l, f) && fa(l[f], this.Ab);
    };
    h.prototype.delete = function (l) {
      return c(l) && fa(l, f) && fa(l[f], this.Ab) ? delete l[f][this.Ab] : !1;
    };
    return h;
  });
  t("Map", function (a) {
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
            l = new a(v([[h, "s"]]));
          if (
            "s" != l.get(h) ||
            1 != l.size ||
            l.get({ x: 4 }) ||
            l.set({ x: 4 }, "t") != l ||
            2 != l.size
          )
            return !1;
          var k = l.entries(),
            m = k.next();
          if (m.done || m.value[0] != h || "s" != m.value[1]) return !1;
          m = k.next();
          return m.done ||
            4 != m.value[0].x ||
            "t" != m.value[1] ||
            !k.next().done
            ? !1
            : !0;
        } catch (r) {
          return !1;
        }
      })()
    )
      return a;
    var b = new WeakMap(),
      c = function (h) {
        this.wb = {};
        this.za = f();
        this.size = 0;
        if (h) {
          h = v(h);
          for (var l; !(l = h.next()).done; )
            (l = l.value), this.set(l[0], l[1]);
        }
      };
    c.prototype.set = function (h, l) {
      h = 0 === h ? 0 : h;
      var k = d(this, h);
      k.list || (k.list = this.wb[k.id] = []);
      k.K
        ? (k.K.value = l)
        : ((k.K = {
            next: this.za,
            Ca: this.za.Ca,
            head: this.za,
            key: h,
            value: l,
          }),
          k.list.push(k.K),
          (this.za.Ca.next = k.K),
          (this.za.Ca = k.K),
          this.size++);
      return this;
    };
    c.prototype.delete = function (h) {
      h = d(this, h);
      return h.K && h.list
        ? (h.list.splice(h.index, 1),
          h.list.length || delete this.wb[h.id],
          (h.K.Ca.next = h.K.next),
          (h.K.next.Ca = h.K.Ca),
          (h.K.head = null),
          this.size--,
          !0)
        : !1;
    };
    c.prototype.clear = function () {
      this.wb = {};
      this.za = this.za.Ca = f();
      this.size = 0;
    };
    c.prototype.has = function (h) {
      return !!d(this, h).K;
    };
    c.prototype.get = function (h) {
      return (h = d(this, h).K) && h.value;
    };
    c.prototype.entries = function () {
      return e(this, function (h) {
        return [h.key, h.value];
      });
    };
    c.prototype.keys = function () {
      return e(this, function (h) {
        return h.key;
      });
    };
    c.prototype.values = function () {
      return e(this, function (h) {
        return h.value;
      });
    };
    c.prototype.forEach = function (h, l) {
      for (var k = this.entries(), m; !(m = k.next()).done; )
        (m = m.value), h.call(l, m[1], m[0], this);
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    var d = function (h, l) {
        var k = l && typeof l;
        "object" == k || "function" == k
          ? b.has(l)
            ? (k = b.get(l))
            : ((k = "" + ++g), b.set(l, k))
          : (k = "p_" + l);
        var m = h.wb[k];
        if (m && fa(h.wb, k))
          for (h = 0; h < m.length; h++) {
            var r = m[h];
            if ((l !== l && r.key !== r.key) || l === r.key)
              return { id: k, list: m, index: h, K: r };
          }
        return { id: k, list: m, index: -1, K: void 0 };
      },
      e = function (h, l) {
        var k = h.za;
        return da(function () {
          if (k) {
            for (; k.head != h.za; ) k = k.Ca;
            for (; k.next != k.head; )
              return (k = k.next), { done: !1, value: l(k) };
            k = null;
          }
          return { done: !0, value: void 0 };
        });
      },
      f = function () {
        var h = {};
        return (h.Ca = h.next = h.head = h);
      },
      g = 0;
    return c;
  });
  t("Number.isFinite", function (a) {
    return a
      ? a
      : function (b) {
          return "number" !== typeof b
            ? !1
            : !isNaN(b) && Infinity !== b && -Infinity !== b;
        };
  });
  t("Array.prototype.values", function (a) {
    return a
      ? a
      : function () {
          return Aa(this, function (b, c) {
            return c;
          });
        };
  });
  t("Set", function (a) {
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
    var b = function (c) {
      this.ra = new Map();
      if (c) {
        c = v(c);
        for (var d; !(d = c.next()).done; ) this.add(d.value);
      }
      this.size = this.ra.size;
    };
    b.prototype.add = function (c) {
      c = 0 === c ? 0 : c;
      this.ra.set(c, c);
      this.size = this.ra.size;
      return this;
    };
    b.prototype.delete = function (c) {
      c = this.ra.delete(c);
      this.size = this.ra.size;
      return c;
    };
    b.prototype.clear = function () {
      this.ra.clear();
      this.size = 0;
    };
    b.prototype.has = function (c) {
      return this.ra.has(c);
    };
    b.prototype.entries = function () {
      return this.ra.entries();
    };
    b.prototype.values = function () {
      return this.ra.values();
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function (c, d) {
      var e = this;
      this.ra.forEach(function (f) {
        return c.call(d, f, f, e);
      });
    };
    return b;
  });
  t("Array.prototype.entries", function (a) {
    return a
      ? a
      : function () {
          return Aa(this, function (b, c) {
            return [b, c];
          });
        };
  });
  t("Array.from", function (a) {
    return a
      ? a
      : function (b, c, d) {
          c =
            null != c
              ? c
              : function (h) {
                  return h;
                };
          var e = [],
            f =
              "undefined" != typeof Symbol &&
              Symbol.iterator &&
              b[Symbol.iterator];
          if ("function" == typeof f) {
            b = f.call(b);
            for (var g = 0; !(f = b.next()).done; )
              e.push(c.call(d, f.value, g++));
          } else
            for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
          return e;
        };
  });
  t("Number.isNaN", function (a) {
    return a
      ? a
      : function (b) {
          return "number" === typeof b && isNaN(b);
        };
  });
  t("Array.prototype.fill", function (a) {
    return a
      ? a
      : function (b, c, d) {
          var e = this.length || 0;
          0 > c && (c = Math.max(0, e + c));
          if (null == d || d > e) d = e;
          d = Number(d);
          0 > d && (d = Math.max(0, e + d));
          for (c = Number(c || 0); c < d; c++) this[c] = b;
          return this;
        };
  });
  var Ba = function (a) {
    return a ? a : Array.prototype.fill;
  };
  t("Int8Array.prototype.fill", Ba);
  t("Uint8Array.prototype.fill", Ba);
  t("Uint8ClampedArray.prototype.fill", Ba);
  t("Int16Array.prototype.fill", Ba);
  t("Uint16Array.prototype.fill", Ba);
  t("Int32Array.prototype.fill", Ba);
  t("Uint32Array.prototype.fill", Ba);
  t("Float32Array.prototype.fill", Ba);
  t("Float64Array.prototype.fill", Ba);
  t("Object.entries", function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d;
          for (d in b) fa(b, d) && c.push([d, b[d]]);
          return c;
        };
  });
  t("Object.is", function (a) {
    return a
      ? a
      : function (b, c) {
          return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
        };
  });
  t("Array.prototype.includes", function (a) {
    return a
      ? a
      : function (b, c) {
          var d = this;
          d instanceof String && (d = String(d));
          var e = d.length;
          c = c || 0;
          for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0;
          }
          return !1;
        };
  });
  t("String.prototype.includes", function (a) {
    return a
      ? a
      : function (b, c) {
          if (null == this) throw new TypeError("k`includes");
          if (b instanceof RegExp) throw new TypeError("l`includes");
          return -1 !== (this + "").indexOf(b, c || 0);
        };
  });
  t("Array.prototype.flat", function (a) {
    return a
      ? a
      : function (b) {
          b = void 0 === b ? 1 : b;
          for (var c = [], d = 0; d < this.length; d++) {
            var e = this[d];
            Array.isArray(e) && 0 < b
              ? ((e = Array.prototype.flat.call(e, b - 1)), c.push.apply(c, e))
              : c.push(e);
          }
          return c;
        };
  });
  var Ca = this || self,
    Da = function (a) {
      var b = typeof a;
      return "object" != b ? b : a ? (Array.isArray(a) ? "array" : b) : "null";
    },
    Ea = function (a) {
      var b = Da(a);
      return "array" == b || ("object" == b && "number" == typeof a.length);
    },
    Fa = function (a) {
      var b = typeof a;
      return ("object" == b && null != a) || "function" == b;
    },
    Ga = function (a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.yg = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      a.Xg = function (d, e, f) {
        for (
          var g = Array(arguments.length - 2), h = 2;
          h < arguments.length;
          h++
        )
          g[h - 2] = arguments[h];
        return b.prototype[e].apply(d, g);
      };
    };
  var Ha = function () {
    this.Ie = 0;
  };
  Ha.prototype.Ea = function (a, b) {
    var c = this;
    return function () {
      var d = x.apply(0, arguments);
      c.Ie = a;
      return b.apply(null, ea(d));
    };
  };
  var Ia = function () {
      var a = {};
      this.ua = ((a[3] = []), (a[2] = []), (a[1] = []), a);
      this.kd = !1;
    },
    Ka = function (a, b, c) {
      var d = Ja(a, c);
      a.ua[c].push(b);
      d && 1 === a.ua[c].length && a.flush();
    },
    Ja = function (a, b) {
      return Object.keys(a.ua)
        .map(function (c) {
          return Number(c);
        })
        .filter(function (c) {
          return !isNaN(c) && c > b;
        })
        .every(function (c) {
          return 0 === a.ua[c].length;
        });
    };
  Ia.prototype.flush = function () {
    if (!this.kd) {
      this.kd = !0;
      try {
        for (
          ;
          Object.values(this.ua).some(function (a) {
            return 0 < a.length;
          });

        )
          Ma(this, 3), Ma(this, 2), Ma(this, 1);
      } catch (a) {
        throw (
          (Object.values(this.ua).forEach(function (b) {
            return void b.splice(0, b.length);
          }),
          a)
        );
      } finally {
        this.kd = !1;
      }
    }
  };
  var Ma = function (a, b) {
    for (; Ja(a, b) && 0 < a.ua[b].length; ) a.ua[b][0](), a.ua[b].shift();
  };
  p.Object.defineProperties(Ia.prototype, {
    Ae: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return Object.values(this.ua).some(function (a) {
          return 0 < a.length;
        });
      },
    },
  });
  function Na(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, Na);
    else {
      var c = Error().stack;
      c && (this.stack = c);
    }
    a && (this.message = String(a));
    void 0 !== b && (this.cause = b);
  }
  Ga(Na, Error);
  Na.prototype.name = "CustomError";
  var Oa;
  function Pa(a, b) {
    var c = Na.call;
    a = a.split("%s");
    for (var d = "", e = a.length - 1, f = 0; f < e; f++)
      d += a[f] + (f < b.length ? b[f] : "%s");
    c.call(Na, this, d + a[e]);
  }
  Ga(Pa, Na);
  Pa.prototype.name = "AssertionError";
  function Qa(a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
      e += ": " + c;
      var f = d;
    } else a && ((e += ": " + a), (f = b));
    throw new Pa("" + e, f || []);
  }
  var C = function (a, b, c) {
      a || Qa("", null, b, Array.prototype.slice.call(arguments, 2));
      return a;
    },
    Ra = function (a, b, c) {
      null == a &&
        Qa(
          "Expected to exist: %s.",
          [a],
          b,
          Array.prototype.slice.call(arguments, 2)
        );
      return a;
    },
    Sa = function (a, b) {
      throw new Pa(
        "Failure" + (a ? ": " + a : ""),
        Array.prototype.slice.call(arguments, 1)
      );
    },
    Ta = function (a, b, c) {
      "number" !== typeof a &&
        Qa(
          "Expected number but got %s: %s.",
          [Da(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        );
    },
    Ua = function (a, b, c) {
      "string" !== typeof a &&
        Qa(
          "Expected string but got %s: %s.",
          [Da(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        );
    },
    Wa = function (a, b, c) {
      "function" !== typeof a &&
        Qa(
          "Expected function but got %s: %s.",
          [Da(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        );
    },
    Xa = function (a, b, c) {
      Fa(a) ||
        Qa(
          "Expected object but got %s: %s.",
          [Da(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        );
    },
    Ya = function (a, b, c) {
      Array.isArray(a) ||
        Qa(
          "Expected array but got %s: %s.",
          [Da(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        );
    },
    ab = function (a, b, c, d) {
      a instanceof b ||
        Qa(
          "Expected instanceof %s but got %s.",
          [Za(b), Za(a)],
          c,
          Array.prototype.slice.call(arguments, 3)
        );
      return a;
    };
  function Za(a) {
    return a instanceof Function
      ? a.displayName || a.name || "unknown type name"
      : a instanceof Object
      ? a.constructor.displayName ||
        a.constructor.name ||
        Object.prototype.toString.call(a)
      : null === a
      ? "null"
      : typeof a;
  }
  var bb = Array.prototype.forEach
      ? function (a, b) {
          C(null != a.length);
          Array.prototype.forEach.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = "string" === typeof a ? a.split("") : a,
              e = 0;
            e < c;
            e++
          )
            e in d && b.call(void 0, d[e], e, a);
        },
    cb = Array.prototype.map
      ? function (a, b) {
          C(null != a.length);
          return Array.prototype.map.call(a, b, void 0);
        }
      : function (a, b) {
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
        },
    db = Array.prototype.some
      ? function (a, b) {
          C(null != a.length);
          return Array.prototype.some.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = "string" === typeof a ? a.split("") : a,
              e = 0;
            e < c;
            e++
          )
            if (e in d && b.call(void 0, d[e], e, a)) return !0;
          return !1;
        };
  function eb(a) {
    return Array.prototype.concat.apply([], arguments);
  }
  function fb(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function gb(a, b, c) {
    if (!Ea(a) || !Ea(b) || a.length != b.length) return !1;
    var d = a.length;
    c = c || hb;
    for (var e = 0; e < d; e++) if (!c(a[e], b[e])) return !1;
    return !0;
  }
  function hb(a, b) {
    return a === b;
  }
  function ib(a, b) {
    return eb.apply([], cb(a, b));
  }
  var jb = function (a, b) {
    return -1 != a.toLowerCase().indexOf(b.toLowerCase());
  };
  function kb() {
    var a = Ca.navigator;
    return a && (a = a.userAgent) ? a : "";
  }
  function D(a) {
    return -1 != kb().indexOf(a);
  }
  function lb() {
    return D("Firefox") || D("FxiOS");
  }
  function mb() {
    return (
      D("Safari") &&
      !(
        nb() ||
        D("Coast") ||
        D("Opera") ||
        D("Edge") ||
        D("Edg/") ||
        D("OPR") ||
        lb() ||
        D("Silk") ||
        D("Android")
      )
    );
  }
  function nb() {
    return ((D("Chrome") || D("CriOS")) && !D("Edge")) || D("Silk");
  }
  function ob() {
    return D("Android") && !(nb() || lb() || D("Opera") || D("Silk"));
  }
  var pb = function () {
    return (
      Math.floor(2147483648 * Math.random()).toString(36) +
      Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)
    );
  }; /*


 Copyright (c) 2015-2018 Google, Inc., Netflix, Inc., Microsoft Corp. and contributors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
  var sb = !1,
    tb = {
      set na(a) {
        a ? console.warn("m`" + Error().stack) : sb && console.log("n");
        sb = a;
      },
      get na() {
        return sb;
      },
    };
  var ub =
    ("function" === typeof Symbol && Symbol.observable) || "@@observable";
  function vb(a) {
    setTimeout(function () {
      throw a;
    }, 0);
  }
  var wb = {
    closed: !0,
    next: function () {},
    error: function (a) {
      if (tb.na) throw a;
      vb(a);
    },
    complete: function () {},
  };
  var xb = (function () {
    function a(b) {
      this.message = b
        ? b.length +
          " errors occurred during unsubscription:\n" +
          b
            .map(function (c, d) {
              return d + 1 + ") " + c.toString();
            })
            .join("\n  ")
        : "";
      this.name = "UnsubscriptionError";
      this.errors = b;
      return this;
    }
    a.prototype = Object.create(Error.prototype);
    return a;
  })();
  var yb =
    Array.isArray ||
    function (a) {
      return a && "number" === typeof a.length;
    };
  function zb(a) {
    return "function" === typeof a;
  }
  function Ab(a) {
    return null !== a && "object" === typeof a;
  }
  var E = function (a) {
    this.closed = !1;
    this.Za = this.pb = null;
    a && ((this.Ne = !0), (this.wa = a));
  };
  E.prototype.unsubscribe = function () {
    if (!this.closed) {
      var a = this.pb,
        b = this.Ne,
        c = this.wa,
        d = this.Za;
      this.closed = !0;
      this.Za = this.pb = null;
      if (a instanceof E) a.remove(this);
      else if (null !== a) for (var e = 0; e < a.length; ++e) a[e].remove(this);
      if (zb(c)) {
        b && (this.wa = void 0);
        try {
          c.call(this);
        } catch (l) {
          var f = l instanceof xb ? Bb(l.errors) : [l];
        }
      }
      if (yb(d)) {
        e = -1;
        for (var g = d.length; ++e < g; ) {
          var h = d[e];
          if (Ab(h))
            try {
              h.unsubscribe();
            } catch (l) {
              (f = f || []),
                l instanceof xb ? (f = f.concat(Bb(l.errors))) : f.push(l);
            }
        }
      }
      if (f) throw new xb(f);
    }
  };
  E.prototype.add = function (a) {
    var b = a;
    if (!a) return E.EMPTY;
    switch (typeof a) {
      case "function":
        b = new E(a);
      case "object":
        if (b === this || b.closed || "function" !== typeof b.unsubscribe)
          return b;
        if (this.closed) return b.unsubscribe(), b;
        b instanceof E || ((a = b), (b = new E()), (b.Za = [a]));
        break;
      default:
        throw Error("o`" + a);
    }
    var c = b.pb;
    if (null === c) b.pb = this;
    else if (c instanceof E) {
      if (c === this) return b;
      b.pb = [c, this];
    } else if (-1 === c.indexOf(this)) c.push(this);
    else return b;
    a = this.Za;
    null === a ? (this.Za = [b]) : a.push(b);
    return b;
  };
  E.prototype.remove = function (a) {
    var b = this.Za;
    b && ((a = b.indexOf(a)), -1 !== a && b.splice(a, 1));
  };
  var Cb = new E();
  Cb.closed = !0;
  E.EMPTY = Cb;
  function Db(a) {
    return (
      a instanceof E ||
      (a &&
        "closed" in a &&
        "function" === typeof a.remove &&
        "function" === typeof a.add &&
        "function" === typeof a.unsubscribe)
    );
  }
  function Bb(a) {
    return a.reduce(function (b, c) {
      return b.concat(c instanceof xb ? c.errors : c);
    }, []);
  }
  var J = function (a, b, c) {
    E.call(this);
    this.yc = null;
    this.C = this.aa = this.xc = !1;
    switch (arguments.length) {
      case 0:
        this.destination = wb;
        break;
      case 1:
        if (!a) {
          this.destination = wb;
          break;
        }
        if ("object" === typeof a) {
          a instanceof J
            ? ((this.aa = a.aa), (this.destination = a), a.add(this))
            : ((this.aa = !0), (this.destination = new Eb(this, a)));
          break;
        }
      default:
        (this.aa = !0), (this.destination = new Eb(this, a, b, c));
    }
  };
  w(J, E);
  J.EMPTY = E.EMPTY;
  J.create = function (a, b, c) {
    a = new J(a, b, c);
    a.aa = !1;
    return a;
  };
  n = J.prototype;
  n.next = function (a) {
    this.C || this.o(a);
  };
  n.error = function (a) {
    this.C || ((this.C = !0), this.R(a));
  };
  n.complete = function () {
    this.C || ((this.C = !0), this.B());
  };
  n.unsubscribe = function () {
    this.closed || ((this.C = !0), E.prototype.unsubscribe.call(this));
  };
  n.o = function (a) {
    this.destination.next(a);
  };
  n.R = function (a) {
    this.destination.error(a);
    this.unsubscribe();
  };
  n.B = function () {
    this.destination.complete();
    this.unsubscribe();
  };
  var Eb = function (a, b, c, d) {
    J.call(this);
    this.qb = a;
    var e = this;
    if (zb(b)) var f = b;
    else
      b &&
        ((f = b.next),
        (c = b.error),
        (d = b.complete),
        b !== wb &&
          ((e = Object.create(b)),
          Db(b) && b.add(this.unsubscribe.bind(this)),
          (e.unsubscribe = this.unsubscribe.bind(this))));
    this.va = e;
    this.o = f;
    this.R = c;
    this.B = d;
  };
  w(Eb, J);
  Eb.EMPTY = J.EMPTY;
  Eb.create = J.create;
  n = Eb.prototype;
  n.next = function (a) {
    if (!this.C && this.o) {
      var b = this.qb;
      tb.na && b.aa
        ? this.Ec(b, this.o, a) && this.unsubscribe()
        : this.Fc(this.o, a);
    }
  };
  n.error = function (a) {
    if (!this.C) {
      var b = this.qb,
        c = tb.na;
      if (this.R)
        c && b.aa ? this.Ec(b, this.R, a) : this.Fc(this.R, a),
          this.unsubscribe();
      else if (b.aa) c ? ((b.yc = a), (b.xc = !0)) : vb(a), this.unsubscribe();
      else {
        this.unsubscribe();
        if (c) throw a;
        vb(a);
      }
    }
  };
  n.complete = function () {
    var a = this;
    if (!this.C) {
      var b = this.qb;
      if (this.B) {
        var c = function () {
          return a.B.call(a.va);
        };
        tb.na && b.aa ? this.Ec(b, c) : this.Fc(c);
      }
      this.unsubscribe();
    }
  };
  n.Fc = function (a, b) {
    try {
      a.call(this.va, b);
    } catch (c) {
      this.unsubscribe();
      if (tb.na) throw c;
      vb(c);
    }
  };
  n.Ec = function (a, b, c) {
    if (!tb.na) throw Error("p");
    try {
      b.call(this.va, c);
    } catch (d) {
      return tb.na ? ((a.yc = d), (a.xc = !0)) : vb(d), !0;
    }
    return !1;
  };
  n.wa = function () {
    var a = this.qb;
    this.qb = this.va = null;
    a.unsubscribe();
  };
  function Fb(a) {
    return a;
  }
  function K() {
    return Gb(x.apply(0, arguments));
  }
  function Gb(a) {
    return 0 === a.length
      ? Fb
      : 1 === a.length
      ? a[0]
      : function (b) {
          return a.reduce(function (c, d) {
            return d(c);
          }, b);
        };
  }
  function Hb(a) {
    return (
      a &&
      "function" === typeof a.next &&
      "function" === typeof a.error &&
      "function" === typeof a.complete
    );
  }
  var Ib = function (a) {
    J.call(this);
    this.destination = a;
  };
  w(Ib, J);
  Ib.EMPTY = J.EMPTY;
  Ib.create = J.create;
  var L = function (a) {
    a && (this.W = a);
  };
  n = L.prototype;
  n.fb = function (a) {
    var b = new L();
    b.source = this;
    b.operator = a;
    return b;
  };
  n.subscribe = function (a, b, c) {
    var d = this.operator;
    a: {
      if (a) {
        if (a instanceof J || (Hb(a) && Db(a))) break a;
        if (Hb(a)) {
          a = new Ib(a);
          break a;
        }
      }
      a = a || b || c ? new J(a, b, c) : new J(wb);
    }
    d
      ? a.add(d.call(a, this.source))
      : a.add(this.source || (tb.na && !a.aa) ? this.W(a) : this.Kc(a));
    if (tb.na && a.aa && ((a.aa = !1), a.xc)) throw a.yc;
    return a;
  };
  n.Kc = function (a) {
    try {
      return this.W(a);
    } catch (e) {
      tb.na && ((a.xc = !0), (a.yc = e));
      var b;
      a: {
        for (b = a; b; ) {
          var c = b.destination,
            d = b.C;
          if (b.closed || d) {
            b = !1;
            break a;
          }
          b = c && c instanceof J ? c : null;
        }
        b = !0;
      }
      b ? a.error(e) : console.warn(e);
    }
  };
  n.forEach = function (a, b) {
    var c = this;
    b = Jb(b);
    return new b(function (d, e) {
      var f = c.subscribe(
        function (g) {
          try {
            a(g);
          } catch (h) {
            e(h), f && f.unsubscribe();
          }
        },
        e,
        d
      );
    });
  };
  n.W = function (a) {
    var b = this.source;
    return b && b.subscribe(a);
  };
  L.prototype[ub] = function () {
    return this;
  };
  L.prototype.h = function () {
    var a = x.apply(0, arguments);
    return 0 === a.length ? this : Gb(a)(this);
  };
  L.create = function (a) {
    return new L(a);
  };
  function Jb(a) {
    a || (a = Promise);
    if (!a) throw Error("q");
    return a;
  }
  var Kb = function (a, b) {
    E.call(this);
    this.Fe = a;
    this.yd = b;
    this.closed = !1;
  };
  w(Kb, E);
  Kb.EMPTY = E.EMPTY;
  Kb.prototype.unsubscribe = function () {
    if (!this.closed) {
      this.closed = !0;
      var a = this.Fe,
        b = a.Ba;
      this.Fe = null;
      !b ||
        0 === b.length ||
        a.C ||
        a.closed ||
        ((a = b.indexOf(this.yd)), -1 !== a && b.splice(a, 1));
    }
  };
  var Lb = (function () {
    function a() {
      this.message = "object unsubscribed";
      this.name = "ObjectUnsubscribedError";
      return this;
    }
    a.prototype = Object.create(Error.prototype);
    return a;
  })();
  var M = function () {
    this.Ba = [];
    this.yb = this.C = this.closed = !1;
    this.zc = null;
  };
  w(M, L);
  n = M.prototype;
  n.fb = function (a) {
    var b = new Mb(this, this);
    b.operator = a;
    return b;
  };
  n.next = function (a) {
    if (this.closed) throw new Lb();
    if (!this.C) {
      var b = this.Ba,
        c = b.length;
      b = b.slice();
      for (var d = 0; d < c; d++) b[d].next(a);
    }
  };
  n.error = function (a) {
    if (this.closed) throw new Lb();
    this.yb = !0;
    this.zc = a;
    this.C = !0;
    var b = this.Ba,
      c = b.length;
    b = b.slice();
    for (var d = 0; d < c; d++) b[d].error(a);
    this.Ba.length = 0;
  };
  n.complete = function () {
    if (this.closed) throw new Lb();
    this.C = !0;
    var a = this.Ba,
      b = a.length;
    a = a.slice();
    for (var c = 0; c < b; c++) a[c].complete();
    this.Ba.length = 0;
  };
  n.unsubscribe = function () {
    this.closed = this.C = !0;
    this.Ba = null;
  };
  n.Kc = function (a) {
    if (this.closed) throw new Lb();
    return L.prototype.Kc.call(this, a);
  };
  n.W = function (a) {
    if (this.closed) throw new Lb();
    if (this.yb) return a.error(this.zc), E.EMPTY;
    if (this.C) return a.complete(), E.EMPTY;
    this.Ba.push(a);
    return new Kb(this, a);
  };
  n.ca = function () {
    var a = new L();
    a.source = this;
    return a;
  };
  M.create = function (a, b) {
    return new Mb(a, b);
  };
  var Mb = function (a, b) {
    M.call(this);
    this.destination = a;
    this.source = b;
  };
  w(Mb, M);
  Mb.create = M.create;
  Mb.prototype.next = function (a) {
    var b = this.destination;
    b && b.next && b.next(a);
  };
  Mb.prototype.error = function (a) {
    var b = this.destination;
    b && b.error && this.destination.error(a);
  };
  Mb.prototype.complete = function () {
    var a = this.destination;
    a && a.complete && this.destination.complete();
  };
  Mb.prototype.W = function (a) {
    return this.source ? this.source.subscribe(a) : E.EMPTY;
  };
  var Nb = function (a) {
    M.call(this);
    this.Lc = a;
  };
  w(Nb, M);
  Nb.create = M.create;
  Nb.prototype.W = function (a) {
    var b = M.prototype.W.call(this, a);
    b && !b.closed && a.next(this.Lc);
    return b;
  };
  Nb.prototype.next = function (a) {
    M.prototype.next.call(this, (this.Lc = a));
  };
  p.Object.defineProperties(Nb.prototype, {
    value: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        if (this.yb) throw this.zc;
        if (this.closed) throw new Lb();
        return this.Lc;
      },
    },
  });
  var Ob = new L(function (a) {
    return a.complete();
  });
  function Pb(a, b) {
    return new L(function (c) {
      var d = new E(),
        e = 0;
      d.add(
        b.A(function () {
          e === a.length
            ? c.complete()
            : (c.next(a[e++]), c.closed || d.add(this.A()));
        })
      );
      return d;
    });
  }
  var Qb = function (a) {
    return function (b) {
      for (var c = 0, d = a.length; c < d && !b.closed; c++) b.next(a[c]);
      b.complete();
    };
  };
  function Rb(a, b) {
    return b ? Pb(a, b) : new L(Qb(a));
  }
  function Sb(a) {
    return a && "function" === typeof a.A;
  }
  function N() {
    var a = x.apply(0, arguments),
      b = a[a.length - 1];
    return Sb(b) ? (a.pop(), Pb(a, b)) : Rb(a);
  }
  function Tb(a) {
    return new L(function (b) {
      return b.error(a);
    });
  }
  var Ub = {
    now: function () {
      return (Ub.jf || Date).now();
    },
    jf: void 0,
  };
  var Vb = function (a, b, c) {
    a = void 0 === a ? Infinity : a;
    b = void 0 === b ? Infinity : b;
    c = void 0 === c ? Ub : c;
    M.call(this);
    this.Bg = c;
    this.Ub = [];
    this.Od = !1;
    this.Jd = 1 > a ? 1 : a;
    this.Se = 1 > b ? 1 : b;
    Infinity === b
      ? ((this.Od = !0), (this.next = this.Xf))
      : (this.next = this.Zf);
  };
  w(Vb, M);
  Vb.create = M.create;
  n = Vb.prototype;
  n.Xf = function (a) {
    var b = this.Ub;
    b.push(a);
    b.length > this.Jd && b.shift();
    M.prototype.next.call(this, a);
  };
  n.Zf = function (a) {
    this.Ub.push({ time: this.Md(), value: a });
    this.Pd();
    M.prototype.next.call(this, a);
  };
  n.W = function (a) {
    var b = this.Od,
      c = b ? this.Ub : this.Pd(),
      d = c.length;
    if (this.closed) throw new Lb();
    if (this.C || this.yb) var e = E.EMPTY;
    else this.Ba.push(a), (e = new Kb(this, a));
    if (b) for (var f = 0; f < d && !a.closed; f++) a.next(c[f]);
    else for (f = 0; f < d && !a.closed; f++) a.next(c[f].value);
    this.yb ? a.error(this.zc) : this.C && a.complete();
    return e;
  };
  n.Md = function () {
    var a = this.Bg;
    return a ? a.now() : Ub.now();
  };
  n.Pd = function () {
    for (
      var a = this.Md(),
        b = this.Jd,
        c = this.Se,
        d = this.Ub,
        e = d.length,
        f = 0;
      f < e && !(a - d[f].time < c);

    )
      f++;
    e > b && (f = Math.max(f, e - b));
    0 < f && d.splice(0, f);
    return d;
  };
  var Xb = function (a, b) {
    b = void 0 === b ? Wb : b;
    this.Me = a;
    this.now = b;
  };
  Xb.prototype.A = function (a, b, c) {
    b = void 0 === b ? 0 : b;
    return new this.Me(this, a).A(c, b);
  };
  var Wb = Ub.now;
  var Yb = (function () {
    function a() {
      this.message = "no elements in sequence";
      this.name = "EmptyError";
      return this;
    }
    a.prototype = Object.create(Error.prototype);
    return a;
  })();
  function O(a, b) {
    if (a && "function" === typeof a.fb) return a.fb(b);
    throw new TypeError("r");
  }
  function Zb() {
    return function (a) {
      return O(a, new $b());
    };
  }
  var $b = function () {};
  $b.prototype.call = function (a, b) {
    b.rb++;
    a = new ac(a, b);
    var c = b.subscribe(a);
    a.closed || (a.connection = b.connect());
    return c;
  };
  var ac = function (a, b) {
    J.call(this, a);
    this.ab = b;
    this.connection = null;
  };
  w(ac, J);
  ac.EMPTY = J.EMPTY;
  ac.create = J.create;
  ac.prototype.wa = function () {
    var a = this.ab;
    if (a) {
      this.ab = null;
      var b = a.rb;
      0 >= b
        ? (this.connection = null)
        : ((a.rb = b - 1),
          1 < b
            ? (this.connection = null)
            : ((b = this.connection),
              (a = a.Ya),
              (this.connection = null),
              !a || (b && a !== b) || a.unsubscribe()));
    } else this.connection = null;
  };
  var bc = function (a, b) {
    this.source = a;
    this.Ge = b;
    this.rb = 0;
    this.Vb = !1;
  };
  w(bc, L);
  bc.create = L.create;
  bc.prototype.W = function (a) {
    return this.ic().subscribe(a);
  };
  bc.prototype.ic = function () {
    var a = this.Wb;
    if (!a || a.C) this.Wb = this.Ge();
    return this.Wb;
  };
  bc.prototype.connect = function () {
    var a = this.Ya;
    a ||
      ((this.Vb = !1),
      (a = this.Ya = new E()),
      a.add(this.source.subscribe(new cc(this.ic(), this))),
      a.closed && ((this.Ya = null), (a = E.EMPTY)));
    return a;
  };
  bc.prototype.ye = function () {
    return Zb()(this);
  };
  var dc,
    ec = bc.prototype;
  dc = {
    operator: { value: null },
    rb: { value: 0, writable: !0 },
    Wb: { value: null, writable: !0 },
    Ya: { value: null, writable: !0 },
    W: { value: ec.W },
    Vb: { value: ec.Vb, writable: !0 },
    ic: { value: ec.ic },
    connect: { value: ec.connect },
    ye: { value: ec.ye },
  };
  var cc = function (a, b) {
    J.call(this);
    this.destination = a;
    this.ab = b;
  };
  w(cc, J);
  cc.EMPTY = J.EMPTY;
  cc.create = J.create;
  cc.prototype.R = function (a) {
    this.wa();
    J.prototype.R.call(this, a);
  };
  cc.prototype.B = function () {
    this.ab.Vb = !0;
    this.wa();
    J.prototype.B.call(this);
  };
  cc.prototype.wa = function () {
    var a = this.ab;
    if (a) {
      this.ab = null;
      var b = a.Ya;
      a.rb = 0;
      a.Wb = null;
      a.Ya = null;
      b && b.unsubscribe();
    }
  };
  function P(a) {
    return function (b) {
      if ("function" !== typeof a) throw new TypeError("s");
      return O(b, new fc(a));
    };
  }
  var fc = function (a) {
    this.H = a;
    this.ba = void 0;
  };
  fc.prototype.call = function (a, b) {
    return b.subscribe(new gc(a, this.H, this.ba));
  };
  var gc = function (a, b, c) {
    J.call(this, a);
    this.H = b;
    this.count = 0;
    this.ba = c || this;
  };
  w(gc, J);
  gc.EMPTY = J.EMPTY;
  gc.create = J.create;
  gc.prototype.o = function (a) {
    try {
      var b = this.H.call(this.ba, a, this.count++);
    } catch (c) {
      this.destination.error(c);
      return;
    }
    this.destination.next(b);
  };
  var hc =
    "function" === typeof Symbol && Symbol.iterator
      ? Symbol.iterator
      : "@@iterator";
  var ic = function (a) {
    return a && "number" === typeof a.length && "function" !== typeof a;
  };
  function jc(a) {
    return (
      !!a && "function" !== typeof a.subscribe && "function" === typeof a.then
    );
  }
  function kc(a) {
    return function (b) {
      lc(a, b).catch(function (c) {
        return b.error(c);
      });
    };
  }
  function lc(a, b) {
    var c, d, e;
    return ya(
      new xa(
        new sa(function (f) {
          switch (f.Ma) {
            case 1:
              var g = a[Symbol.asyncIterator];
              c = void 0 !== g ? g.call(a) : new za(v(a));
            case 2:
              return (g = c.next()), (f.Ma = 5), { value: g };
            case 5:
              d = f.Id;
              if (d.done) {
                f.Ma = 4;
                break;
              }
              e = d.value;
              b.next(e);
              f.Ma = 2;
              break;
            case 4:
              b.complete(), (f.Ma = 0);
          }
        })
      )
    );
  }
  var mc = function (a) {
    return function (b) {
      var c = a[hc]();
      do {
        var d = void 0;
        try {
          d = c.next();
        } catch (e) {
          b.error(e);
          return;
        }
        if (d.done) {
          b.complete();
          break;
        }
        b.next(d.value);
        if (b.closed) break;
      } while (1);
      "function" === typeof c.return &&
        b.add(function () {
          c.return && c.return();
        });
      return b;
    };
  };
  var nc = function (a) {
    return function (b) {
      var c = a[ub]();
      if ("function" !== typeof c.subscribe) throw new TypeError("t");
      return c.subscribe(b);
    };
  };
  var oc = function (a) {
    return function (b) {
      a.then(
        function (c) {
          b.closed || (b.next(c), b.complete());
        },
        function (c) {
          return b.error(c);
        }
      ).then(null, vb);
      return b;
    };
  };
  var pc = function (a) {
    if (a && "function" === typeof a[ub]) return nc(a);
    if (ic(a)) return Qb(a);
    if (jc(a)) return oc(a);
    if (a && "function" === typeof a[hc]) return mc(a);
    if (
      Symbol &&
      Symbol.asyncIterator &&
      a &&
      "function" === typeof a[Symbol.asyncIterator]
    )
      return kc(a);
    throw new TypeError("u`" + (Ab(a) ? "an invalid object" : "'" + a + "'"));
  };
  var qc = function (a) {
    J.call(this);
    this.parent = a;
  };
  w(qc, J);
  qc.EMPTY = J.EMPTY;
  qc.create = J.create;
  qc.prototype.o = function (a) {
    this.parent.sa(a);
  };
  qc.prototype.R = function (a) {
    this.parent.Na(a);
    this.unsubscribe();
  };
  qc.prototype.B = function () {
    this.parent.O();
    this.unsubscribe();
  };
  var rc = function (a, b, c) {
    J.call(this);
    this.parent = a;
    this.we = b;
    this.ig = c;
  };
  w(rc, J);
  rc.EMPTY = J.EMPTY;
  rc.create = J.create;
  rc.prototype.o = function (a) {
    this.parent.sa(this.we, a, this.ig, this);
  };
  rc.prototype.R = function (a) {
    this.parent.Na(a);
    this.unsubscribe();
  };
  rc.prototype.B = function () {
    this.parent.O(this);
    this.unsubscribe();
  };
  var Q = function () {
    J.apply(this, arguments);
  };
  w(Q, J);
  Q.EMPTY = J.EMPTY;
  Q.create = J.create;
  Q.prototype.sa = function (a) {
    this.destination.next(a);
  };
  Q.prototype.Na = function (a) {
    this.destination.error(a);
  };
  Q.prototype.O = function () {
    this.destination.complete();
  };
  var R = function () {
    J.apply(this, arguments);
  };
  w(R, J);
  R.EMPTY = J.EMPTY;
  R.create = J.create;
  R.prototype.sa = function (a, b) {
    this.destination.next(b);
  };
  R.prototype.Na = function (a) {
    this.destination.error(a);
  };
  R.prototype.O = function () {
    this.destination.complete();
  };
  function sc(a, b) {
    if (!b.closed) return a instanceof L ? a.subscribe(b) : pc(a)(b);
  }
  var tc = {};
  function S() {
    var a = x.apply(0, arguments),
      b = void 0,
      c = void 0,
      d = void 0;
    Sb(a[a.length - 1]) && (c = a.pop());
    "function" === typeof a[a.length - 1] && (b = a.pop());
    if (1 === a.length) {
      var e = a[0];
      yb(e) && (a = e);
      Ab(e) &&
        Object.getPrototypeOf(e) === Object.prototype &&
        ((d = Object.keys(e)),
        (a = d.map(function (f) {
          return e[f];
        })));
    }
    return O(Rb(a, c), new uc(b, d));
  }
  var uc = function (a, b) {
    this.vc = a;
    this.keys = b;
  };
  uc.prototype.call = function (a, b) {
    return b.subscribe(new vc(a, this.vc, this.keys));
  };
  var vc = function (a, b, c) {
    R.call(this, a);
    this.vc = b;
    this.keys = c;
    this.active = 0;
    this.values = [];
    this.Oa = [];
  };
  w(vc, R);
  vc.EMPTY = R.EMPTY;
  vc.create = R.create;
  n = vc.prototype;
  n.o = function (a) {
    this.values.push(tc);
    this.Oa.push(a);
  };
  n.B = function () {
    var a = this.Oa,
      b = a.length;
    if (0 === b) this.destination.complete();
    else {
      this.Xa = this.active = b;
      for (var c = 0; c < b; c++) this.add(sc(a[c], new rc(this, null, c)));
    }
  };
  n.O = function () {
    0 === --this.active && this.destination.complete();
  };
  n.sa = function (a, b, c) {
    var d = this.values,
      e = d[c];
    e = this.Xa ? (e === tc ? --this.Xa : this.Xa) : 0;
    d[c] = b;
    0 === e &&
      (this.vc
        ? this.Pe(d)
        : this.destination.next(
            this.keys
              ? this.keys.reduce(function (f, g, h) {
                  return (f[g] = d[h]), f;
                }, {})
              : d.slice()
          ));
  };
  n.Pe = function (a) {
    try {
      var b = this.vc.apply(this, a);
    } catch (c) {
      this.destination.error(c);
      return;
    }
    this.destination.next(b);
  };
  function wc(a, b) {
    if (!a) throw Error("v");
    return new L(function (c) {
      var d = new E();
      d.add(
        b.A(function () {
          var e = a[Symbol.asyncIterator]();
          d.add(
            b.A(function () {
              var f = this;
              e.next().then(function (g) {
                g.done ? c.complete() : (c.next(g.value), f.A());
              });
            })
          );
        })
      );
      return d;
    });
  }
  function xc(a, b) {
    if (!a) throw Error("v");
    return new L(function (c) {
      var d = new E(),
        e;
      d.add(function () {
        e && "function" === typeof e.return && e.return();
      });
      d.add(
        b.A(function () {
          e = a[hc]();
          d.add(
            b.A(function () {
              if (!c.closed) {
                try {
                  var f = e.next();
                  var g = f.value;
                  var h = f.done;
                } catch (l) {
                  c.error(l);
                  return;
                }
                h ? c.complete() : (c.next(g), this.A());
              }
            })
          );
        })
      );
      return d;
    });
  }
  function yc(a, b) {
    return new L(function (c) {
      var d = new E();
      d.add(
        b.A(function () {
          var e = a[ub]();
          d.add(
            e.subscribe({
              next: function (f) {
                d.add(
                  b.A(function () {
                    return c.next(f);
                  })
                );
              },
              error: function (f) {
                d.add(
                  b.A(function () {
                    return c.error(f);
                  })
                );
              },
              complete: function () {
                d.add(
                  b.A(function () {
                    return c.complete();
                  })
                );
              },
            })
          );
        })
      );
      return d;
    });
  }
  function zc(a, b) {
    return new L(function (c) {
      var d = new E();
      d.add(
        b.A(function () {
          return a.then(
            function (e) {
              d.add(
                b.A(function () {
                  c.next(e);
                  d.add(
                    b.A(function () {
                      return c.complete();
                    })
                  );
                })
              );
            },
            function (e) {
              d.add(
                b.A(function () {
                  return c.error(e);
                })
              );
            }
          );
        })
      );
      return d;
    });
  }
  function Ac(a) {
    var b = Bc;
    if (null != a) {
      if (a && "function" === typeof a[ub]) return yc(a, b);
      if (jc(a)) return zc(a, b);
      if (ic(a)) return Pb(a, b);
      if ((a && "function" === typeof a[hc]) || "string" === typeof a)
        return xc(a, b);
      if (
        Symbol &&
        Symbol.asyncIterator &&
        "function" === typeof a[Symbol.asyncIterator]
      )
        return wc(a, b);
    }
    throw new TypeError("w`" + ((null !== a && typeof a) || a));
  }
  function Cc(a) {
    return a instanceof L ? a : new L(pc(a));
  }
  function Dc(a, b) {
    var c = void 0 === c ? Infinity : c;
    if ("function" === typeof b)
      return function (d) {
        return d.h(
          Dc(function (e, f) {
            return Cc(a(e, f)).h(
              P(function (g, h) {
                return b(e, g, f, h);
              })
            );
          }, c)
        );
      };
    "number" === typeof b && (c = b);
    return function (d) {
      return O(d, new Ec(a, c));
    };
  }
  var Ec = function (a, b) {
    b = void 0 === b ? Infinity : b;
    this.H = a;
    this.Rc = b;
  };
  Ec.prototype.call = function (a, b) {
    return b.subscribe(new Fc(a, this.H, this.Rc));
  };
  var Fc = function (a, b, c) {
    c = void 0 === c ? Infinity : c;
    Q.call(this, a);
    this.destination = a;
    this.H = b;
    this.Rc = c;
    this.ge = !1;
    this.buffer = [];
    this.index = this.active = 0;
  };
  w(Fc, Q);
  Fc.EMPTY = Q.EMPTY;
  Fc.create = Q.create;
  Fc.prototype.o = function (a) {
    if (this.active < this.Rc) {
      var b = this.index++;
      try {
        var c = this.H(a, b);
      } catch (d) {
        this.destination.error(d);
        return;
      }
      this.active++;
      a = new qc(this);
      this.destination.add(a);
      sc(c, a);
    } else this.buffer.push(a);
  };
  Fc.prototype.B = function () {
    this.ge = !0;
    0 === this.active &&
      0 === this.buffer.length &&
      this.destination.complete();
    this.unsubscribe();
  };
  Fc.prototype.sa = function (a) {
    this.destination.next(a);
  };
  Fc.prototype.O = function () {
    var a = this.buffer;
    this.active--;
    0 < a.length
      ? this.o(a.shift())
      : 0 === this.active && this.ge && this.destination.complete();
  };
  function Gc(a) {
    a = void 0 === a ? Infinity : a;
    return Dc(Fb, a);
  }
  function Hc() {
    return Gc(1)(N.apply(null, ea(x.apply(0, arguments))));
  }
  function Ic(a, b, c) {
    if (zb(c)) {
      var d = c;
      c = void 0;
    }
    return d
      ? Ic(a, b, c).h(
          P(function (e) {
            return yb(e) ? d.apply(null, ea(e)) : d(e);
          })
        )
      : new L(function (e) {
          Jc(
            a,
            b,
            function (f) {
              1 < arguments.length
                ? e.next(Array.prototype.slice.call(arguments))
                : e.next(f);
            },
            e,
            c
          );
        });
  }
  function Jc(a, b, c, d, e) {
    if (
      a &&
      "function" === typeof a.addEventListener &&
      "function" === typeof a.removeEventListener
    ) {
      a.addEventListener(b, c, e);
      var f = function () {
        return a.removeEventListener(b, c, e);
      };
    } else if (a && "function" === typeof a.dg && "function" === typeof a.cg)
      a.dg(b, c),
        (f = function () {
          return a.cg(b, c);
        });
    else if (
      a &&
      "function" === typeof a.addListener &&
      "function" === typeof a.removeListener
    )
      a.addListener(b, c),
        (f = function () {
          return a.removeListener(b, c);
        });
    else if (a && a.length)
      for (var g = 0, h = a.length; g < h; g++) Jc(a[g], b, c, d, e);
    else throw new TypeError("x");
    d.add(f);
  }
  var Kc = function () {
    E.call(this);
  };
  w(Kc, E);
  Kc.EMPTY = E.EMPTY;
  Kc.prototype.A = function () {
    return this;
  };
  var Mc = function (a, b) {
      var c = x.apply(2, arguments);
      return (null == Lc ? 0 : Lc.setInterval)
        ? Lc.setInterval.apply(Lc, [a, b].concat(ea(c)))
        : setInterval.apply(null, [a, b].concat(ea(c)));
    },
    Lc = void 0;
  var Nc = function (a, b) {
    E.call(this);
    this.Z = a;
    this.Dc = b;
    this.pending = !1;
  };
  w(Nc, Kc);
  Nc.EMPTY = Kc.EMPTY;
  n = Nc.prototype;
  n.A = function (a, b) {
    b = void 0 === b ? 0 : b;
    if (this.closed) return this;
    this.state = a;
    a = this.id;
    var c = this.Z;
    null != a && (this.id = this.Jb(c, a, b));
    this.pending = !0;
    this.delay = b;
    this.id = this.id || this.Kb(c, this.id, b);
    return this;
  };
  n.Kb = function (a, b, c) {
    c = void 0 === c ? 0 : c;
    return Mc(a.flush.bind(a, this), c);
  };
  n.Jb = function (a, b, c) {
    c = void 0 === c ? 0 : c;
    if (null !== c && this.delay === c && !1 === this.pending) return b;
    ((null == Lc ? void 0 : Lc.clearInterval) || clearInterval)(b);
  };
  n.execute = function (a, b) {
    if (this.closed) return Error("y");
    this.pending = !1;
    if ((a = this.Kd(a, b))) return a;
    !1 === this.pending &&
      null != this.id &&
      (this.id = this.Jb(this.Z, this.id, null));
  };
  n.Kd = function (a) {
    var b = !1,
      c = void 0;
    try {
      this.Dc(a);
    } catch (d) {
      (b = !0), (c = (!!d && d) || Error(d));
    }
    if (b) return this.unsubscribe(), c;
  };
  n.wa = function () {
    var a = this.id,
      b = this.Z,
      c = b.actions,
      d = c.indexOf(this);
    this.state = this.Dc = null;
    this.pending = !1;
    this.Z = null;
    -1 !== d && c.splice(d, 1);
    null != a && (this.id = this.Jb(b, a, null));
    this.delay = null;
  };
  var Oc = function (a, b) {
    b = void 0 === b ? Wb : b;
    Xb.call(this, a, b);
    this.actions = [];
    this.active = !1;
    this.wc = void 0;
  };
  w(Oc, Xb);
  Oc.prototype.flush = function (a) {
    var b = this.actions;
    if (this.active) b.push(a);
    else {
      var c;
      this.active = !0;
      do if ((c = a.execute(a.state, a.delay))) break;
      while ((a = b.shift()));
      this.active = !1;
      if (c) {
        for (; (a = b.shift()); ) a.unsubscribe();
        throw c;
      }
    }
  };
  function Pc() {
    var a = x.apply(0, arguments),
      b = Infinity,
      c = void 0,
      d = a[a.length - 1];
    Sb(d)
      ? ((c = a.pop()),
        1 < a.length && "number" === typeof a[a.length - 1] && (b = a.pop()))
      : "number" === typeof d && (b = a.pop());
    return !c && 1 === a.length && a[0] instanceof L ? a[0] : Gc(b)(Rb(a, c));
  }
  function Qc() {}
  var Rc = new L(Qc);
  function T(a) {
    return function (b) {
      return O(b, new Sc(a));
    };
  }
  var Sc = function (a) {
    this.ka = a;
    this.ba = void 0;
  };
  Sc.prototype.call = function (a, b) {
    return b.subscribe(new Tc(a, this.ka, this.ba));
  };
  var Tc = function (a, b, c) {
    J.call(this, a);
    this.ka = b;
    this.ba = c;
    this.count = 0;
  };
  w(Tc, J);
  Tc.EMPTY = J.EMPTY;
  Tc.create = J.create;
  Tc.prototype.o = function (a) {
    try {
      var b = this.ka.call(this.ba, a, this.count++);
    } catch (c) {
      this.destination.error(c);
      return;
    }
    b && this.destination.next(a);
  };
  function Uc() {
    var a = x.apply(0, arguments);
    if (1 === a.length)
      if (yb(a[0])) a = a[0];
      else return Cc(a[0]);
    return O(Rb(a), new Xc());
  }
  var Xc = function () {};
  Xc.prototype.call = function (a, b) {
    return b.subscribe(new Yc(a));
  };
  var Yc = function (a) {
    R.call(this, a);
    this.zb = !1;
    this.Oa = [];
    this.Nb = [];
  };
  w(Yc, R);
  Yc.EMPTY = R.EMPTY;
  Yc.create = R.create;
  n = Yc.prototype;
  n.o = function (a) {
    this.Oa.push(a);
  };
  n.B = function () {
    var a = this.Oa,
      b = a.length;
    if (0 === b) this.destination.complete();
    else {
      for (var c = 0; c < b && !this.zb; c++) {
        var d = sc(a[c], new rc(this, null, c));
        this.Nb && this.Nb.push(d);
        this.add(d);
      }
      this.Oa = null;
    }
  };
  n.sa = function (a, b, c) {
    if (!this.zb) {
      this.zb = !0;
      for (var d = 0; d < this.Nb.length; d++)
        if (d !== c) {
          var e = this.Nb[d];
          e.unsubscribe();
          this.remove(e);
        }
      this.Nb = null;
    }
    this.destination.next(b);
  };
  n.O = function (a) {
    this.zb = !0;
    R.prototype.O.call(this, a);
  };
  n.Na = function (a) {
    this.zb = !0;
    R.prototype.Na.call(this, a);
  };
  (function () {
    function a(b) {
      this.message = "Timeout has occurred";
      this.name = "TimeoutError";
      this.info = void 0 === b ? null : b;
      return this;
    }
    a.prototype = Object.create(Error.prototype);
    return a;
  })();
  var Zc = 1,
    $c,
    ad = {};
  function bd(a) {
    return a in ad ? (delete ad[a], !0) : !1;
  }
  var cd = function (a) {
      var b = Zc++;
      ad[b] = !0;
      $c || ($c = Promise.resolve());
      $c.then(function () {
        return bd(b) && a();
      });
      return b;
    },
    dd = function (a) {
      bd(a);
    };
  var fd = function () {
      return ((null == ed ? void 0 : ed.setImmediate) || cd).apply(
        null,
        ea(x.apply(0, arguments))
      );
    },
    ed = void 0;
  var gd = function (a, b) {
    Nc.call(this, a, b);
    this.Z = a;
    this.Dc = b;
  };
  w(gd, Nc);
  gd.EMPTY = Nc.EMPTY;
  gd.prototype.Kb = function (a, b, c) {
    c = void 0 === c ? 0 : c;
    if (null !== c && 0 < c) return Nc.prototype.Kb.call(this, a, b, c);
    a.actions.push(this);
    return a.wc || (a.wc = fd(a.flush.bind(a, void 0)));
  };
  gd.prototype.Jb = function (a, b, c) {
    c = void 0 === c ? 0 : c;
    if ((null !== c && 0 < c) || (null === c && 0 < this.delay))
      return Nc.prototype.Jb.call(this, a, b, c);
    0 === a.actions.length &&
      (((null == ed ? void 0 : ed.clearImmediate) || dd)(b), (a.wc = void 0));
  };
  var hd = function () {
    Oc.apply(this, arguments);
  };
  w(hd, Oc);
  hd.prototype.flush = function (a) {
    this.active = !0;
    this.wc = void 0;
    var b = this.actions,
      c,
      d = -1;
    a = a || b.shift();
    var e = b.length;
    do if ((c = a.execute(a.state, a.delay))) break;
    while (++d < e && (a = b.shift()));
    this.active = !1;
    if (c) {
      for (; ++d < e && (a = b.shift()); ) a.unsubscribe();
      throw c;
    }
  };
  var id = new hd(gd);
  var jd = function (a, b) {
    Nc.call(this, a, b);
    this.Z = a;
    this.Dc = b;
  };
  w(jd, Nc);
  jd.EMPTY = Nc.EMPTY;
  jd.prototype.A = function (a, b) {
    b = void 0 === b ? 0 : b;
    if (0 < b) return Nc.prototype.A.call(this, a, b);
    this.delay = b;
    this.state = a;
    this.Z.flush(this);
    return this;
  };
  jd.prototype.execute = function (a, b) {
    return 0 < b || this.closed
      ? Nc.prototype.execute.call(this, a, b)
      : this.Kd(a, b);
  };
  jd.prototype.Kb = function (a, b, c) {
    c = void 0 === c ? 0 : c;
    return (null !== c && 0 < c) || (null === c && 0 < this.delay)
      ? Nc.prototype.Kb.call(this, a, b, c)
      : a.flush(this);
  };
  var kd = function () {
    Oc.apply(this, arguments);
  };
  w(kd, Oc);
  var Bc = new kd(jd);
  var ld = (function () {
    function a() {
      this.message = "argument out of range";
      this.name = "ArgumentOutOfRangeError";
      return this;
    }
    a.prototype = Object.create(Error.prototype);
    return a;
  })();
  (function () {
    function a(b) {
      this.message = b;
      this.name = "NotFoundError";
      return this;
    }
    a.prototype = Object.create(Error.prototype);
    return a;
  })();
  (function () {
    function a(b) {
      this.message = b;
      this.name = "SequenceError";
      return this;
    }
    a.prototype = Object.create(Error.prototype);
    return a;
  })();
  var md = function () {
    this.u = new Ha();
    this.i = new Ia();
    this.id = pb();
  };
  md.prototype.cd = function () {
    return Rc;
  };
  p.Object.defineProperties(md.prototype, {
    pc: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.id;
      },
    },
  });
  var nd = function (a, b) {
    b = Error.call(this, b ? a + ": " + b : String(a));
    this.message = b.message;
    "stack" in b && (this.stack = b.stack);
    this.code = a;
    this.__proto__ = nd.prototype;
    this.name = String(a);
  };
  w(nd, Error);
  var od = function (a) {
    nd.call(this, 1e3, 'sfr:"' + a + '"');
    this.Sf = a;
    this.__proto__ = od.prototype;
  };
  w(od, nd);
  var pd = function () {
    nd.call(this, 1003);
    this.__proto__ = pd.prototype;
  };
  w(pd, nd);
  var qd = function () {
    nd.call(this, 1009);
    this.__proto__ = qd.prototype;
  };
  w(qd, nd);
  var rd = function () {
    nd.call(this, 1007);
    this.__proto__ = pd.prototype;
  };
  w(rd, nd);
  var sd = function () {
    nd.call(this, 1008);
    this.__proto__ = pd.prototype;
  };
  w(sd, nd);
  var td = function () {
    nd.call(this, 1001);
    this.__proto__ = td.prototype;
  };
  w(td, nd);
  var ud = function (a) {
    nd.call(this, 1004, String(a));
    this.Df = a;
    this.__proto__ = ud.prototype;
  };
  w(ud, nd);
  var wd = function (a) {
    nd.call(this, 1010, a);
    this.__proto__ = vd.prototype;
  };
  w(wd, nd);
  var vd = function (a) {
    nd.call(this, 1005, a);
    this.__proto__ = vd.prototype;
  };
  w(vd, nd);
  var xd = function (a) {
    var b = x.apply(1, arguments),
      c = this;
    this.ib = [];
    this.ib.push(a);
    b.forEach(function (d) {
      c.ib.push(d);
    });
  };
  xd.prototype.qa = function (a) {
    return this.ib.some(function (b) {
      return b.qa(a);
    });
  };
  xd.prototype.ia = function (a, b) {
    for (var c = 0; c < this.ib.length; c++)
      if (this.ib[c].qa(b)) return this.ib[c].ia(a, b);
    throw new qd();
  };
  var yd = Symbol("time-origin"),
    zd = Symbol("date"),
    Ad = function (a, b) {
      this.value = a;
      this.timeline = b;
    },
    Bd = function (a, b) {
      if (b.timeline !== a.timeline) throw new rd();
      return a.value - b.value;
    };
  Ad.prototype.equals = function (a) {
    return 0 === Bd(this, a);
  };
  Ad.prototype.maximum = function (a) {
    if (a.timeline !== this.timeline) throw new rd();
    return this.value >= a.value ? this : a;
  };
  Ad.prototype.round = function () {
    return new Ad(Math.round(this.value), this.timeline);
  };
  Ad.prototype.toString = function () {
    return String(this.value);
  };
  function Cd(a) {
    function b(c) {
      return (
        "boolean" === typeof c ||
        "string" === typeof c ||
        "number" === typeof c ||
        void 0 === c ||
        null === c
      );
    }
    return b(a)
      ? !0
      : Array.isArray(a)
      ? a.every(b)
      : "object" === typeof a
      ? Object.keys(a).every(function (c) {
          return "string" === typeof c;
        }) &&
        Object.values(a).every(function (c) {
          return Array.isArray(c) ? c.every(b) : b(c);
        })
      : !1;
  }
  function Dd(a) {
    return Cd(a) ? a : String(a);
  }
  function Ed(a) {
    return function (b) {
      return O(b, function (c) {
        var d = this,
          e = new E(),
          f = null,
          g = !1,
          h;
        f = c.subscribe({
          next: function (l) {
            return d.next(l);
          },
          error: function (l) {
            try {
              h = Cc(a(l, Ed(a)(c)));
            } catch (k) {
              d.error(k);
            }
            h &&
              (f
                ? (f.unsubscribe(), (f = null), e.add(h.subscribe(d)))
                : (g = !0));
          },
          complete: function () {
            return d.complete();
          },
        });
        g ? (f.unsubscribe(), (f = null), e.add(h.subscribe(d))) : e.add(f);
        return e;
      });
    };
  }
  function Fd() {
    var a = x.apply(0, arguments),
      b = void 0;
    "function" === typeof a[a.length - 1] && (b = a.pop());
    1 === a.length && yb(a[0]) && (a = a[0].slice());
    return function (c) {
      var d = Cc([c].concat(ea(a))),
        e = new uc(b);
      if (c && "function" === typeof c.fb) c = c.fb.call(d, e);
      else throw new TypeError("r");
      return c;
    };
  }
  function Gd() {
    return Fd.apply(null, ea(x.apply(0, arguments)));
  }
  function Hd(a) {
    a = void 0 === a ? null : a;
    return function (b) {
      return O(b, new Id(a));
    };
  }
  var Id = function (a) {
    this.defaultValue = a;
  };
  Id.prototype.call = function (a, b) {
    return b.subscribe(new Jd(a, this.defaultValue));
  };
  var Jd = function (a, b) {
    J.call(this, a);
    this.defaultValue = b;
    this.isEmpty = !0;
  };
  w(Jd, J);
  Jd.EMPTY = J.EMPTY;
  Jd.create = J.create;
  Jd.prototype.o = function (a) {
    this.isEmpty = !1;
    this.destination.next(a);
  };
  Jd.prototype.B = function () {
    this.isEmpty && this.destination.next(this.defaultValue);
    this.destination.complete();
  };
  function Kd(a) {
    return function (b) {
      return O(b, new Ld(a));
    };
  }
  var Ld = function (a) {
    this.Vc = a;
  };
  Ld.prototype.call = function (a, b) {
    return b.subscribe(new Md(a, this.Vc));
  };
  var Md = function (a, b) {
    R.call(this, a);
    this.Vc = b;
    this.Vd = !1;
    this.cc = [];
    this.index = 0;
  };
  w(Md, R);
  Md.EMPTY = R.EMPTY;
  Md.create = R.create;
  n = Md.prototype;
  n.sa = function (a, b, c, d) {
    this.destination.next(a);
    Nd(this, d);
    Od(this);
  };
  n.Na = function (a) {
    this.R(a);
  };
  n.O = function (a) {
    (a = Nd(this, a)) && this.destination.next(a);
    Od(this);
  };
  n.o = function (a) {
    var b = this.index++;
    try {
      var c = this.Vc(a, b);
      if (c) {
        var d = sc(c, new rc(this, a, 0));
        d && !d.closed && (this.destination.add(d), this.cc.push(d));
      }
    } catch (e) {
      this.destination.error(e);
    }
  };
  n.B = function () {
    this.Vd = !0;
    Od(this);
    this.unsubscribe();
  };
  var Nd = function (a, b) {
      b.unsubscribe();
      var c = a.cc.indexOf(b);
      -1 !== c && a.cc.splice(c, 1);
      return b.we;
    },
    Od = function (a) {
      a.Vd && 0 === a.cc.length && a.destination.complete();
    };
  function Pd(a) {
    return function (b) {
      return O(b, new Qd(a));
    };
  }
  var Qd = function (a) {
    this.La = a;
    this.vf = void 0;
  };
  Qd.prototype.call = function (a, b) {
    return b.subscribe(new Rd(a, this.La, this.vf));
  };
  var Rd = function (a, b, c) {
    Q.call(this, a);
    this.La = b;
    this.values = new Set();
    c && this.add(sc(c, new qc(this)));
  };
  w(Rd, Q);
  Rd.EMPTY = Q.EMPTY;
  Rd.create = Q.create;
  n = Rd.prototype;
  n.sa = function () {
    this.values.clear();
  };
  n.Na = function (a) {
    this.R(a);
  };
  n.o = function (a) {
    this.La ? this.Qe(a) : this.Ld(a, a);
  };
  n.Qe = function (a) {
    var b = this.destination;
    try {
      var c = this.La(a);
    } catch (d) {
      b.error(d);
      return;
    }
    this.Ld(c, a);
  };
  n.Ld = function (a, b) {
    var c = this.values;
    c.has(a) || (c.add(a), this.destination.next(b));
  };
  function U(a) {
    return function (b) {
      return O(b, new Sd(a));
    };
  }
  var Sd = function (a) {
    this.compare = a;
    this.La = void 0;
  };
  Sd.prototype.call = function (a, b) {
    return b.subscribe(new Td(a, this.compare, this.La));
  };
  var Td = function (a, b, c) {
    J.call(this, a);
    this.La = c;
    this.ie = !1;
    "function" === typeof b && (this.compare = b);
  };
  w(Td, J);
  Td.EMPTY = J.EMPTY;
  Td.create = J.create;
  Td.prototype.compare = function (a, b) {
    return a === b;
  };
  Td.prototype.o = function (a) {
    try {
      var b = this.La;
      var c = b ? b(a) : a;
    } catch (e) {
      return this.destination.error(e);
    }
    b = !1;
    if (this.ie)
      try {
        var d = this.compare;
        b = d(this.key, c);
      } catch (e) {
        return this.destination.error(e);
      }
    else this.ie = !0;
    b || ((this.key = c), this.destination.next(a));
  };
  function Ud(a) {
    if (isNaN(a)) throw new TypeError("z");
    if (0 > a) throw new ld();
    return function (b) {
      return 0 === a ? Ob : O(b, new Vd(a));
    };
  }
  var Vd = function (a) {
    this.count = a;
  };
  Vd.prototype.call = function (a, b) {
    return b.subscribe(new Wd(a, this.count));
  };
  var Wd = function (a, b) {
    J.call(this, a);
    this.count = b;
    this.Re = 0;
  };
  w(Wd, J);
  Wd.EMPTY = J.EMPTY;
  Wd.create = J.create;
  Wd.prototype.o = function (a) {
    var b = this.count,
      c = ++this.Re;
    c <= b &&
      (this.destination.next(a),
      c === b && (this.destination.complete(), this.unsubscribe()));
  };
  function Xd(a) {
    a = void 0 === a ? Yd : a;
    return function (b) {
      return O(b, new Zd(a));
    };
  }
  var Zd = function (a) {
    this.Xc = a;
  };
  Zd.prototype.call = function (a, b) {
    return b.subscribe(new $d(a, this.Xc));
  };
  var $d = function (a, b) {
    J.call(this, a);
    this.Xc = b;
    this.je = !1;
  };
  w($d, J);
  $d.EMPTY = J.EMPTY;
  $d.create = J.create;
  $d.prototype.o = function (a) {
    this.je = !0;
    this.destination.next(a);
  };
  $d.prototype.B = function () {
    if (this.je) return this.destination.complete();
    try {
      var a = this.Xc();
    } catch (b) {
      a = b;
    }
    this.destination.error(a);
  };
  function Yd() {
    return new Yb();
  }
  function ae() {
    var a = x.apply(0, arguments);
    return function (b) {
      return Hc(b, N.apply(null, ea(a)));
    };
  }
  function be(a) {
    return function (b) {
      return O(b, new ce(a, b));
    };
  }
  var ce = function (a, b) {
    this.ka = a;
    this.ba = void 0;
    this.source = b;
  };
  ce.prototype.call = function (a, b) {
    return b.subscribe(new de(a, this.ka, this.ba, this.source));
  };
  var de = function (a, b, c, d) {
    J.call(this, a);
    this.ka = b;
    this.ba = c;
    this.source = d;
    this.index = 0;
    this.ba = c || this;
  };
  w(de, J);
  de.EMPTY = J.EMPTY;
  de.create = J.create;
  de.prototype.O = function (a) {
    this.destination.next(a);
    this.destination.complete();
  };
  de.prototype.o = function (a) {
    var b = !1;
    try {
      b = this.ka.call(this.ba, a, this.index++, this.source);
    } catch (c) {
      this.destination.error(c);
      return;
    }
    b || this.O(!1);
  };
  de.prototype.B = function () {
    this.O(!0);
  };
  function ee() {
    return function (a) {
      return O(a, new fe());
    };
  }
  var fe = function () {};
  fe.prototype.call = function (a, b) {
    return b.subscribe(new ge(a));
  };
  var ge = function () {
    J.apply(this, arguments);
  };
  w(ge, J);
  ge.EMPTY = J.EMPTY;
  ge.create = J.create;
  ge.prototype.o = function () {};
  function he() {
    if (isNaN(1)) throw new TypeError("z");
    return function (a) {
      return O(a, new ie());
    };
  }
  var ie = function () {
    this.total = 1;
  };
  ie.prototype.call = function (a, b) {
    return b.subscribe(new je(a, this.total));
  };
  var je = function (a, b) {
    J.call(this, a);
    this.total = b;
    this.ze = [];
    this.count = 0;
  };
  w(je, J);
  je.EMPTY = J.EMPTY;
  je.create = J.create;
  je.prototype.o = function (a) {
    var b = this.ze,
      c = this.total,
      d = this.count++;
    b.length < c ? b.push(a) : (b[d % c] = a);
  };
  je.prototype.B = function () {
    var a = this.destination,
      b = this.count;
    if (0 < b)
      for (
        var c = this.count >= this.total ? this.total : this.count,
          d = this.ze,
          e = 0;
        e < c;
        e++
      ) {
        var f = b++ % c;
        a.next(d[f]);
      }
    a.complete();
  };
  function ke(a, b) {
    var c = 2 <= arguments.length;
    return function (d) {
      return d.h(
        a
          ? T(function (e, f) {
              return a(e, f, d);
            })
          : Fb,
        he(),
        c
          ? Hd(b)
          : Xd(function () {
              return new Yb();
            })
      );
    };
  }
  function le(a) {
    return function (b) {
      return O(b, new me(a));
    };
  }
  var me = function (a) {
    this.value = a;
  };
  me.prototype.call = function (a, b) {
    return b.subscribe(new ne(a, this.value));
  };
  var ne = function (a, b) {
    J.call(this, a);
    this.value = b;
  };
  w(ne, J);
  ne.EMPTY = J.EMPTY;
  ne.create = J.create;
  ne.prototype.o = function () {
    this.destination.next(this.value);
  };
  function oe(a, b) {
    var c = !1;
    2 <= arguments.length && (c = !0);
    return function (d) {
      return O(d, new pe(a, b, c));
    };
  }
  var pe = function (a, b, c) {
    this.Mc = a;
    this.seed = b;
    this.Bf = void 0 === c ? !1 : c;
  };
  pe.prototype.call = function (a, b) {
    return b.subscribe(new qe(a, this.Mc, this.seed, this.Bf));
  };
  var qe = function (a, b, c, d) {
    J.call(this, a);
    this.Mc = b;
    this.Gc = c;
    this.Nd = d;
    this.index = 0;
  };
  w(qe, J);
  qe.EMPTY = J.EMPTY;
  qe.create = J.create;
  qe.prototype.o = function (a) {
    var b = this.destination;
    if (this.Nd) {
      var c = this.index++;
      try {
        var d = this.Mc(this.Gc, a, c);
      } catch (e) {
        b.error(e);
        return;
      }
      this.Gc = d;
      b.next(d);
    } else (this.Gc = a), (this.Nd = !0), b.next(a);
  };
  function re(a) {
    return function (b) {
      var c =
        "function" === typeof a
          ? a
          : function () {
              return a;
            };
      var d = Object.create(b, dc);
      d.source = b;
      d.Ge = c;
      return d;
    };
  }
  function se() {
    var a = x.apply(0, arguments);
    1 === a.length && yb(a[0]) && (a = a[0]);
    return function (b) {
      return O(b, new te(a));
    };
  }
  var te = function (a) {
    this.pd = a;
  };
  te.prototype.call = function (a, b) {
    return b.subscribe(new ue(a, this.pd));
  };
  var ue = function (a, b) {
    Q.call(this, a);
    this.destination = a;
    this.pd = b;
  };
  w(ue, Q);
  ue.EMPTY = Q.EMPTY;
  ue.create = Q.create;
  ue.prototype.Na = function () {
    ve(this);
  };
  ue.prototype.O = function () {
    ve(this);
  };
  ue.prototype.R = function () {
    ve(this);
    this.unsubscribe();
  };
  ue.prototype.B = function () {
    ve(this);
    this.unsubscribe();
  };
  var ve = function (a) {
    var b = a.pd.shift();
    if (b) {
      var c = new qc(a);
      a.destination.add(c);
      sc(b, c);
    } else a.destination.complete();
  };
  function we(a) {
    var b = new Vb(a, void 0, void 0);
    return function (c) {
      return re(function () {
        return b;
      })(c);
    };
  }
  function xe() {
    var a = void 0 === a ? Infinity : a;
    return function (b) {
      return 0 >= a
        ? Ob
        : O(b, function (c) {
            var d = this,
              e = 0,
              f = new E(),
              g,
              h = function () {
                var l = !1;
                g = c.subscribe({
                  next: function (k) {
                    return d.next(k);
                  },
                  error: function (k) {
                    return d.error(k);
                  },
                  complete: function () {
                    ++e < a
                      ? g
                        ? (g.unsubscribe(), (g = null), h())
                        : (l = !0)
                      : d.complete();
                  },
                });
                l ? (g.unsubscribe(), (g = null), h()) : f.add(g);
              };
            h();
            return f;
          });
    };
  }
  function ye() {
    return new M();
  }
  function ze() {
    return function (a) {
      return Zb()(re(ye)(a));
    };
  }
  function W() {
    var a = x.apply(0, arguments),
      b = a[a.length - 1];
    return Sb(b)
      ? (a.pop(),
        function (c) {
          return Hc(a, c, b);
        })
      : function (c) {
          return Hc(a, c);
        };
  }
  var Ae = function (a, b, c) {
    b = void 0 === b ? 0 : b;
    c = void 0 === c ? id : c;
    this.source = a;
    this.delayTime = b;
    this.Z = c;
    0 > b && (this.delayTime = 0);
    Sb(c) || (this.Z = id);
  };
  w(Ae, L);
  Ae.create = L.create;
  Ae.kf = function (a) {
    return this.add(a.source.subscribe(a.yd));
  };
  Ae.prototype.W = function (a) {
    return this.Z.A(Ae.kf, this.delayTime, { source: this.source, yd: a });
  };
  function Be() {
    var a = void 0 === a ? 0 : a;
    return function (b) {
      return O(b, new Ce(a));
    };
  }
  var Ce = function (a) {
    this.Z = Bc;
    this.delay = a;
  };
  Ce.prototype.call = function (a, b) {
    return new Ae(b, this.delay, this.Z).subscribe(a);
  };
  function X(a) {
    return function (b) {
      return O(b, new De(a));
    };
  }
  var De = function (a) {
    this.H = a;
  };
  De.prototype.call = function (a, b) {
    return b.subscribe(new Ee(a, this.H));
  };
  var Ee = function (a, b) {
    Q.call(this, a);
    this.destination = a;
    this.H = b;
    this.index = 0;
  };
  w(Ee, Q);
  Ee.EMPTY = Q.EMPTY;
  Ee.create = Q.create;
  n = Ee.prototype;
  n.o = function (a) {
    var b = this.index++;
    try {
      var c = this.H(a, b);
    } catch (d) {
      this.destination.error(d);
      return;
    }
    (a = this.oc) && a.unsubscribe();
    a = new qc(this);
    this.destination.add(a);
    this.oc = a;
    sc(c, a);
  };
  n.B = function () {
    var a = this.oc;
    (a && !a.closed) || Q.prototype.B.call(this);
    this.unsubscribe();
  };
  n.wa = function () {
    this.oc = void 0;
  };
  n.O = function () {
    this.oc = void 0;
    this.C && Q.prototype.B.call(this);
  };
  n.sa = function (a) {
    this.destination.next(a);
  };
  function Fe(a, b) {
    b = void 0 === b ? !1 : b;
    return function (c) {
      return O(c, new Ge(a, b));
    };
  }
  var Ge = function (a, b) {
    this.ka = a;
    this.gd = b;
  };
  Ge.prototype.call = function (a, b) {
    return b.subscribe(new He(a, this.ka, this.gd));
  };
  var He = function (a, b, c) {
    J.call(this, a);
    this.ka = b;
    this.gd = c;
    this.index = 0;
  };
  w(He, J);
  He.EMPTY = J.EMPTY;
  He.create = J.create;
  He.prototype.o = function (a) {
    var b = this.destination;
    try {
      var c = this.ka(a, this.index++);
    } catch (d) {
      b.error(d);
      return;
    }
    b = this.destination;
    c ? b.next(a) : (this.gd && b.next(a), b.complete());
  };
  function Ie(a, b, c) {
    return function (d) {
      return O(d, new Je(a, b, c));
    };
  }
  var Je = function (a, b, c) {
    this.Yf = a;
    this.error = b;
    this.complete = c;
  };
  Je.prototype.call = function (a, b) {
    return b.subscribe(new Ke(a, this.Yf, this.error, this.complete));
  };
  var Ke = function (a, b, c, d) {
    J.call(this, a);
    this.Hc = this.Ic = this.Jc = Qc;
    this.Ic = c || Qc;
    this.Hc = d || Qc;
    zb(b)
      ? ((this.va = this), (this.Jc = b))
      : b &&
        ((this.va = b),
        (this.Jc = b.next || Qc),
        (this.Ic = b.error || Qc),
        (this.Hc = b.complete || Qc));
  };
  w(Ke, J);
  Ke.EMPTY = J.EMPTY;
  Ke.create = J.create;
  Ke.prototype.o = function (a) {
    try {
      this.Jc.call(this.va, a);
    } catch (b) {
      this.destination.error(b);
      return;
    }
    this.destination.next(a);
  };
  Ke.prototype.R = function (a) {
    try {
      this.Ic.call(this.va, a);
    } catch (b) {
      this.destination.error(b);
      return;
    }
    this.destination.error(a);
  };
  Ke.prototype.B = function () {
    try {
      this.Hc.call(this.va);
    } catch (a) {
      this.destination.error(a);
      return;
    }
    return this.destination.complete();
  };
  function Le() {
    var a = x.apply(0, arguments);
    return function (b) {
      var c;
      "function" === typeof a[a.length - 1] && (c = a.pop());
      return O(b, new Me(a, c));
    };
  }
  var Me = function (a, b) {
    this.Oa = a;
    this.H = b;
  };
  Me.prototype.call = function (a, b) {
    return b.subscribe(new Ne(a, this.Oa, this.H));
  };
  var Ne = function (a, b, c) {
    R.call(this, a);
    this.H = c;
    this.Xa = [];
    a = b.length;
    this.values = Array(a);
    for (c = 0; c < a; c++) this.Xa.push(c);
    for (c = 0; c < a; c++) this.add(sc(b[c], new rc(this, void 0, c)));
  };
  w(Ne, R);
  Ne.EMPTY = R.EMPTY;
  Ne.create = R.create;
  Ne.prototype.sa = function (a, b, c) {
    this.values[c] = b;
    b = this.Xa;
    0 < b.length && ((c = b.indexOf(c)), -1 !== c && b.splice(c, 1));
  };
  Ne.prototype.O = function () {};
  Ne.prototype.o = function (a) {
    0 === this.Xa.length &&
      ((a = [a].concat(ea(this.values))),
      this.H ? this.Oe(a) : this.destination.next(a));
  };
  Ne.prototype.Oe = function (a) {
    try {
      var b = this.H.apply(this, a);
    } catch (c) {
      this.destination.error(c);
      return;
    }
    this.destination.next(b);
  };
  var Oe = function (a) {
    this.ja = a;
  };
  Oe.prototype.ping = function () {
    var a = this,
      b = N.apply(null, ea(x.apply(0, arguments))).h(
        Dc(function (c) {
          return Pe(a, c);
        }),
        be(function (c) {
          return c;
        }),
        we(1)
      );
    b.connect();
    return b;
  };
  var Pe = function (a, b) {
    var c = new Vb(1);
    Qe(
      a.ja,
      b,
      function () {
        c.next(!0);
        c.complete();
      },
      function () {
        c.next(!1);
        c.complete();
      }
    );
    return c;
  };
  p.Object.defineProperties(Oe.prototype, {
    tb: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.ja.qa();
      },
    },
  });
  function Re(a, b) {
    var c = !1;
    return new L(function (d) {
      var e = a.setTimeout(function () {
        c = !0;
        d.next(!0);
        d.complete();
      }, b);
      return function () {
        c || a.clearTimeout(e);
      };
    });
  }
  var Se = function (a) {
    this.ja = a;
    this.timeline = zd;
  };
  n = Se.prototype;
  n.setTimeout = function (a, b) {
    return Number(
      this.ja.setTimeout(function () {
        return a();
      }, b)
    );
  };
  n.clearTimeout = function (a) {
    this.ja.clearTimeout(a);
  };
  n.now = function () {
    return new Ad(Date.now(), this.timeline);
  };
  n.interval = function (a) {
    return Re(this, a).h(
      xe(),
      oe(function (b) {
        return b + 1;
      }, -1)
    );
  };
  n.oa = function () {
    return !0;
  };
  var Te = function (a, b, c) {
    this.context = a;
    this.Ib = b;
    this.te = c;
  };
  Te.prototype.qa = function (a) {
    return (void 0 === a || a === this.te) && this.Ib.tb;
  };
  Te.prototype.ia = function (a, b) {
    if (!this.qa(b)) throw new qd();
    return new Ue(this.context, this.Ib, this.te, a);
  };
  var Ue = function (a, b, c, d) {
    var e = this;
    this.Ib = b;
    this.method = c;
    this.url = d;
    this.qc = !0;
    this.Ye = a.cd().subscribe(function () {
      e.sendNow();
    });
  };
  Ue.prototype.deactivate = function () {
    this.qc = !1;
  };
  Ue.prototype.sendNow = function () {
    if (this.qc)
      if ((this.Ye.unsubscribe(), this.Ib.tb))
        try {
          this.Ib.ping(this.url), (this.qc = !1);
        } catch (a) {}
      else this.qc = !1;
  };
  function Ve(a) {
    var b = Object.assign({}, a);
    delete b.timestamp;
    return { timestamp: new Ad(a.timestamp, zd), value: b };
  }
  function We(a) {
    return (
      void 0 !== a &&
      "number" === typeof a.x &&
      "number" === typeof a.y &&
      "number" === typeof a.width &&
      "number" === typeof a.height
    );
  }
  var Ye = function (a, b, c) {
    c = void 0 === c ? null : c;
    md.call(this);
    this.ja = a;
    this.Eg = b;
    this.Sa = c;
    this.vd = new Vb(3);
    this.vd.h(
      T(function (d) {
        return "sessionStart" === d.value.type;
      })
    );
    this.rg = this.vd.h(
      T(function (d) {
        return "sessionFinish" === d.value.type;
      })
    );
    this.ke = new Vb(1);
    this.Fg = new Vb();
    this.ce = new Vb(1);
    this.l = new Se(a);
    this.M = new Te(this, new Oe(a), "GET");
    this.Lf = this.ja.qa();
    Xe(this);
  };
  w(Ye, md);
  Ye.prototype.validate = function () {
    return this.Lf;
  };
  var Xe = function (a) {
    Ze(
      a.ja,
      function (e) {
        return void a.vd.next(Ve(e));
      },
      a.Eg
    );
    a.ja.addEventListener("geometryChange", function (e) {
      if (void 0 === e) var f = !1;
      else {
        f = e.data;
        var g;
        (g = void 0 === f) ||
          ((g = f.viewport),
          (g =
            void 0 !== g &&
            "number" === typeof g.width &&
            "number" === typeof g.height));
        g
          ? ((f = f.adView),
            (f =
              void 0 !== f &&
              "number" === typeof f.percentageInView &&
              We(f.geometry) &&
              We(f.onScreenGeometry)))
          : (f = !1);
      }
      f && a.ce.next(Ve(e));
    });
    for (
      var b = {},
        c = v(
          "loaded start firstQuartile midpoint thirdQuartile complete pause resume bufferStart bufferFinish skipped volumeChange playerStateChange adUserInteraction".split(
            " "
          )
        ),
        d = c.next();
      !d.done;
      b = { Sb: b.Sb }, d = c.next()
    )
      (b.Sb = d.value),
        a.ja.addEventListener(
          b.Sb,
          (function (e) {
            return function (f) {
              f.type === e.Sb && a.Fg.next(Ve(f));
            };
          })(b)
        );
    a.ja.addEventListener("impression", function (e) {
      a.ke.next(Ve(e));
    });
  };
  p.Object.defineProperties(Ye.prototype, {
    global: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return $e;
      },
    },
  });
  var $e = {};
  function af() {
    return D("iPhone") && !D("iPod") && !D("iPad");
  }
  function bf() {
    af() || D("iPad") || D("iPod");
  }
  var cf = function (a) {
    cf[" "](a);
    return a;
  };
  cf[" "] = function () {};
  var df = function (a, b) {
    try {
      return cf(a[b]), !0;
    } catch (c) {}
    return !1;
  };
  var ef = D("Opera"),
    ff = D("Trident") || D("MSIE"),
    gf = D("Edge"),
    hf =
      D("Gecko") &&
      !(jb(kb(), "WebKit") && !D("Edge")) &&
      !(D("Trident") || D("MSIE")) &&
      !D("Edge"),
    jf = jb(kb(), "WebKit") && !D("Edge");
  jf && D("Mobile");
  D("Macintosh");
  D("Windows");
  D("Linux") || D("CrOS");
  var kf = Ca.navigator || null;
  kf && (kf.appVersion || "").indexOf("X11");
  D("Android");
  af();
  D("iPad");
  D("iPod");
  bf();
  jb(kb(), "KaiOS");
  var lf = function () {
      var a = Ca.document;
      return a ? a.documentMode : void 0;
    },
    mf;
  a: {
    var nf = "",
      of = (function () {
        var a = kb();
        if (hf) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (gf) return /Edge\/([\d\.]+)/.exec(a);
        if (ff) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (jf) return /WebKit\/(\S+)/.exec(a);
        if (ef) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
    of && (nf = of ? of[1] : "");
    if (ff) {
      var pf = lf();
      if (null != pf && pf > parseFloat(nf)) {
        mf = String(pf);
        break a;
      }
    }
    mf = nf;
  }
  var qf = mf,
    rf;
  if (Ca.document && ff) {
    var sf = lf();
    rf = sf ? sf : parseInt(qf, 10) || void 0;
  } else rf = void 0;
  var tf = rf;
  lb();
  af() || D("iPod");
  D("iPad");
  ob();
  nb();
  mb() && bf();
  var uf = {},
    yf = null,
    zf = hf || jf || "function" == typeof Ca.btoa,
    Af = function (a) {
      var b;
      C(Ea(a), "encodeByteArray takes an array as a parameter");
      void 0 === b && (b = 0);
      if (!yf) {
        yf = {};
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
          uf[e] = f;
          for (var g = 0; g < f.length; g++) {
            var h = f[g],
              l = yf[h];
            void 0 === l ? (yf[h] = g) : C(l === g);
          }
        }
      }
      b = uf[b];
      c = Array(Math.floor(a.length / 3));
      d = b[64] || "";
      for (e = f = 0; f < a.length - 2; f += 3) {
        l = a[f];
        var k = a[f + 1];
        h = a[f + 2];
        g = b[l >> 2];
        l = b[((l & 3) << 4) | (k >> 4)];
        k = b[((k & 15) << 2) | (h >> 6)];
        h = b[h & 63];
        c[e++] = "" + g + l + k + h;
      }
      g = 0;
      h = d;
      switch (a.length - f) {
        case 2:
          (g = a[f + 1]), (h = b[(g & 15) << 2] || d);
        case 1:
          (a = a[f]),
            (c[e] = "" + b[a >> 2] + b[((a & 3) << 4) | (g >> 4)] + h + d);
      }
      return c.join("");
    };
  var Bf = "undefined" !== typeof Uint8Array,
    Cf = {};
  var Df,
    Ff = function (a) {
      if (Cf !== Cf) throw Error("B");
      this.Cd = a;
      if (null != a && 0 === a.length) throw Error("C");
      this.dontPassByteStringToStructuredClone = Ef;
    };
  Ff.prototype.isEmpty = function () {
    return null == this.Cd;
  };
  function Ef() {}
  var Gf =
    "function" === typeof Symbol && "symbol" === typeof Symbol()
      ? Symbol("INTERNAL_ARRAY_STATE")
      : void 0;
  function Hf(a, b) {
    C((b & 255) == b);
    Ya(a, "state is only maintained on arrays.");
    if (Gf) return (a[Gf] |= b);
    if (void 0 !== a.pa) return (a.pa |= b);
    Object.defineProperties(a, {
      pa: { value: b, configurable: !0, writable: !0, enumerable: !1 },
    });
    return b;
  }
  var If = Object.getOwnPropertyDescriptor(Array.prototype, "Mf");
  Object.defineProperties(Array.prototype, {
    Mf: {
      get: function () {
        function a(e, f) {
          e & b && c.push(f);
        }
        var b = Jf(this),
          c = [];
        a(1, "IS_REPEATED_FIELD");
        a(2, "IS_IMMUTABLE_ARRAY");
        a(4, "IS_API_FORMATTED");
        a(8, "ONLY_MUTABLE_VALUES");
        a(16, "MUTABLE_REFERENCES_ARE_OWNED");
        a(32, "CONSTRUCTED");
        a(64, "TRANSFERRED");
        a(128, "IS_FIXED_GROUP");
        var d = c.join(",");
        return If ? If.get.call(this) + "|" + d : d;
      },
      configurable: !0,
      enumerable: !1,
    },
  });
  function Jf(a) {
    Ya(a, "state is only maintained on arrays.");
    a = Gf ? a[Gf] : a.pa;
    return null == a ? 0 : a;
  }
  function Kf(a, b) {
    Ya(a, "state is only maintained on arrays.");
    C((b & 255) == b);
    Gf
      ? (a[Gf] = b)
      : void 0 !== a.pa
      ? (a.pa = b)
      : Object.defineProperties(a, {
          pa: { value: b, configurable: !0, writable: !0, enumerable: !1 },
        });
  }
  function Lf(a) {
    Hf(a, 1);
    return a;
  }
  function Mf(a) {
    return !!(Jf(a) & 2);
  }
  function Nf(a) {
    Hf(a, 16);
    return a;
  }
  function Of(a, b) {
    Kf(b, (Jf(a) | 0) & -51);
  }
  function Pf(a, b) {
    Kf(b, (Jf(a) | 18) & -41);
  }
  var Qf = {};
  function Rf(a) {
    return (
      null !== a &&
      "object" === typeof a &&
      !Array.isArray(a) &&
      a.constructor === Object
    );
  }
  var Sf,
    Tf,
    Uf = [];
  Kf(Uf, 23);
  Tf = Object.freeze(Uf);
  function Vf() {}
  function Wf(a) {
    var b = a.length;
    (b = b ? a[b - 1] : void 0) && Rf(b)
      ? (b.g = 1)
      : ((b = {}), a.push(((b.g = 1), b)));
  }
  function Xf(a) {
    return a.displayName || a.name || "unknown type name";
  }
  var Yf = function () {
    throw Error("G");
  };
  if (
    "undefined" != typeof Symbol &&
    "undefined" != typeof Symbol.hasInstance
  ) {
    var Zf = function () {
        throw Error("H");
      },
      $f = {};
    Object.defineProperties(
      Yf,
      (($f[Symbol.hasInstance] = {
        value: Zf,
        configurable: !1,
        writable: !1,
        enumerable: !1,
      }),
      $f)
    );
    C(
      Yf[Symbol.hasInstance] === Zf,
      "defineProperties did not work: was it monkey-patched?"
    );
  }
  var ag;
  function bg(a, b) {
    C(!!(Jf(b) & 16));
    ag = b;
    a = new a(b);
    ag = void 0;
    return a;
  }
  function cg(a) {
    switch (typeof a) {
      case "number":
        return isFinite(a) ? a : String(a);
      case "object":
        if (a)
          if (Array.isArray(a)) {
            if (0 !== (Jf(a) & 128))
              return (a = Array.prototype.slice.call(a)), Wf(a), a;
          } else {
            if (Bf && null != a && a instanceof Uint8Array) return Af(a);
            if (a instanceof Ff) {
              var b = a.Cd;
              return null == b
                ? ""
                : "string" === typeof b
                ? b
                : (a.Cd = Af(b));
            }
          }
    }
    return a;
  }
  function dg(a, b, c, d) {
    if (null != a) {
      if (Array.isArray(a)) a = eg(a, b, c, void 0 !== d);
      else if (Rf(a)) {
        var e = {},
          f;
        for (f in a) e[f] = dg(a[f], b, c, d);
        a = e;
      } else a = b(a, d);
      return a;
    }
  }
  function eg(a, b, c, d) {
    Ya(a);
    d = d ? !!(Jf(a) & 16) : void 0;
    for (var e = Array.prototype.slice.call(a), f = 0; f < e.length; f++)
      e[f] = dg(e[f], b, c, d);
    c(a, e);
    return e;
  }
  function fg(a) {
    return a.gb === Qf ? a.toJSON() : cg(a);
  }
  function gg(a) {
    if (!a) return a;
    if ("object" === typeof a) {
      if (Bf && null != a && a instanceof Uint8Array) return new Uint8Array(a);
      if (a.gb === Qf) return a.clone();
    }
    return a;
  }
  function hg(a, b) {
    0 !== (Jf(a) & 128) && Wf(b);
  }
  var ig = function (a) {
      return a.ga || (a.ga = a.s[a.jb + a.Qa] = {});
    },
    jg = function (a, b, c) {
      return -1 === b
        ? null
        : b >= a.jb
        ? a.ga
          ? a.ga[b]
          : void 0
        : c && a.ga && ((c = a.ga[b]), null != c)
        ? c
        : a.s[b + a.Qa];
    },
    lg = function (a, b, c, d) {
      if (Mf(a.s)) throw Error("D");
      return kg(a, b, c, d);
    };
  function kg(a, b, c, d) {
    a.me && (a.me = void 0);
    if (b >= a.jb || d) return (ig(a)[b] = c), a;
    a.s[b + a.Qa] = c;
    (c = a.ga) && b in c && delete c[b];
    return a;
  }
  function mg(a, b) {
    C(a && Mf(b.s) ? Mf(a.s) : !0);
    return a;
  }
  function ng(a, b, c) {
    var d = Mf(c.s),
      e = Mf(b),
      f = Mf(a);
    f = Object.isFrozen(a) && f;
    C(Object.isFrozen(a) || !(Jf(a) & 16));
    C(Mf(c.s) ? Object.isFrozen(a) : !0);
    C(0 === b.length || !Object.isFrozen(b));
    C(e ? f : !0);
    C(!d || e);
    C(!(d || e) || f);
    if ((d || e) && a.length)
      for (b = v([a[0]]), d = b.next(); !d.done; d = b.next()) mg(d.value, c);
    return a;
  }
  function og(a, b, c, d) {
    C(!0);
    a = jg(a, b, c);
    Array.isArray(a) || (a = Tf);
    b = Jf(a);
    b & 1 || Lf(a);
    !d || b & 2 || Hf(a, 2);
    return a;
  }
  var pg = function (a, b, c) {
      var d = jg(a, 3, c);
      var e = !1;
      var f =
        null == d ||
        "object" !== typeof d ||
        (e = Array.isArray(d)) ||
        d.gb !== Qf
          ? e
            ? new b(d)
            : void 0
          : d;
      f !== d && null != f && (kg(a, 3, f, c), Hf(f.s, Jf(a.s) & -33));
      return mg(f, a);
    },
    sg = function (a) {
      var b = qg;
      var c = void 0 === c ? !1 : c;
      b = pg(a, b, c);
      if (null == b) return b;
      if (!Mf(a.s)) {
        var d = rg(b);
        d !== b && ((b = d), kg(a, 3, b, c));
      }
      return mg(b, a);
    },
    tg = function (a, b, c, d, e) {
      if (Mf(a.s)) throw Error("D");
      if (null != d) {
        Ya(d);
        var f = Lf([]);
        for (var g = !1, h = 0; h < d.length; h++) {
          var l = f,
            k = h,
            m = d[h],
            r = Ra(b);
          if (!(m instanceof r))
            throw Error("F`" + Xf(r) + "`" + (m && Xf(m.constructor)));
          l[k] = m.s;
          g = g || Mf(f[h]);
        }
        a.T || (a.T = {});
        a.T[c] = d;
        b = f;
        g
          ? (C(!0),
            Ya(b, "state is only maintained on arrays."),
            Gf ? b[Gf] && (b[Gf] &= -9) : void 0 !== b.pa && (b.pa &= -9))
          : Hf(b, 8);
      } else a.T && (a.T[c] = void 0), (f = Tf);
      return kg(a, c, f, e);
    };
  function ug(a, b) {
    return null == a ? b : a;
  }
  var vg = function (a, b) {
    return ug(jg(a, b), 0);
  };
  function wg(a, b, c) {
    c = void 0 === c ? Pf : c;
    if (null != a) {
      if (Bf && a instanceof Uint8Array)
        return (
          ab(a, Uint8Array),
          a.length ? new Ff(new Uint8Array(a)) : Df || (Df = new Ff(null))
        );
      if (Array.isArray(a)) {
        var d = Jf(a);
        if (d & 2) return a;
        if (b && !(d & 32) && (d & 16 || 0 === d)) return Kf(a, d | 2), a;
        a = eg(a, wg, c, !0);
        b = Jf(a);
        b & 4 && b & 2 && Object.freeze(a);
        return a;
      }
      return a.gb === Qf ? xg(a) : a;
    }
  }
  function yg(a, b, c, d, e, f, g) {
    (a = a.T && a.T[c])
      ? ((d = 0 < a.length ? a[0].constructor : void 0),
        (Mf(a) && Object.isFrozen(a)) ||
          ((f = cb(a, xg)), Pf(a, f), Object.freeze(f), (a = f)),
        tg(b, d, c, a, e))
      : lg(b, c, wg(d, f, g), e);
  }
  function xg(a) {
    C(a.gb === Qf);
    if (Mf(a.s)) return a;
    a = zg(a);
    Hf(a.s, 2);
    return a;
  }
  function zg(a, b) {
    b = void 0 === b ? !1 : b;
    C(a.gb === Qf);
    var c = a.s,
      d = Nf([]),
      e = a.constructor.Tf;
    e && d.push(e);
    0 !== (Jf(c) & 128) && Wf(d);
    b = b || Mf(a.s) ? Pf : Of;
    d = bg(a.constructor, d);
    a.Bb && (d.Bb = a.Bb.slice());
    e = !!(Jf(c) & 16);
    for (var f = 0; f < c.length; f++) {
      var g = c[f];
      if (f === c.length - 1 && Rf(g))
        for (var h in g) {
          var l = +h;
          Number.isNaN(l) ? (ig(d)[l] = g[l]) : yg(a, d, l, g[h], !0, e, b);
        }
      else yg(a, d, f - a.Qa, g, !1, e, b);
    }
    return d;
  }
  if ("undefined" !== typeof Proxy) {
    var Bg = Ag;
    new Proxy(
      {},
      {
        getPrototypeOf: Bg,
        setPrototypeOf: Bg,
        isExtensible: Bg,
        preventExtensions: Bg,
        getOwnPropertyDescriptor: Bg,
        defineProperty: Bg,
        has: Bg,
        get: Bg,
        set: Bg,
        deleteProperty: Bg,
        apply: Bg,
        construct: Bg,
      }
    );
  }
  function Ag() {
    throw Error("I");
    throw Error();
  }
  var Cg = function (a, b, c) {
    ab(this, Cg, "The message constructor should only be used by subclasses");
    C(
      this.constructor !== Cg,
      "Message is an abstract class and cannot be directly constructed"
    );
    null == a && (a = ag);
    ag = void 0;
    var d = this.constructor.ih || 0,
      e = 0 < d,
      f = this.constructor.Tf,
      g = !1;
    if (null == a) {
      a = f ? [f] : [];
      var h = !0;
      Kf(a, 48);
    } else {
      if (!Array.isArray(a))
        throw Error("J`" + JSON.stringify(a) + "`" + Da(a));
      if (Object.isFrozen(a) || !Object.isExtensible(a) || Object.isSealed(a))
        throw Error("K");
      if (f && f !== a[0])
        throw Error("L`" + f + "`" + JSON.stringify(a[0]) + "`" + Da(a[0]));
      var l = Hf(a, 0),
        k = l;
      if ((h = 0 !== (16 & k))) (g = 0 !== (32 & k)) || (k |= 32);
      if (e)
        if (128 & k) d = 0;
        else {
          if (0 < a.length) {
            var m = a[a.length - 1];
            if (Rf(m) && "g" in m) {
              d = 0;
              k |= 128;
              delete m.g;
              var r = !0,
                q;
              for (q in m) {
                r = !1;
                break;
              }
              r && a.pop();
            }
          }
        }
      else if (128 & k) throw Error();
      l !== k && Kf(a, k);
    }
    this.Qa = (f ? 0 : -1) - d;
    this.T = void 0;
    this.s = a;
    this.preventPassingToStructuredClone = Vf;
    a: {
      f = this.s.length;
      d = f - 1;
      if (f && ((f = this.s[d]), Rf(f))) {
        this.ga = f;
        this.jb = d - this.Qa;
        break a;
      }
      void 0 !== b && -1 < b
        ? ((this.jb = Math.max(b, d + 1 - this.Qa)), (this.ga = void 0))
        : (this.jb = Number.MAX_VALUE);
    }
    if (!e && this.ga && "g" in this.ga) throw Error("M");
    if (c) {
      b = h && !g && !0;
      e = this.jb;
      var z;
      for (h = 0; h < c.length; h++)
        (g = c[h]),
          g < e
            ? ((g += this.Qa), (d = a[g]) ? Dg(d, b) : (a[g] = Tf))
            : (z || (z = ig(this)), (d = z[g]) ? Dg(d, b) : (z[g] = Tf));
    }
  };
  n = Cg.prototype;
  n.toArray = function () {
    return this.toJSON();
  };
  n.toJSON = function () {
    var a = this.s;
    Sf || (Ya(a), (a = eg(a, fg, hg)));
    return a;
  };
  n.nb = function () {
    Sf = !0;
    try {
      return JSON.stringify(this.toJSON(), Eg);
    } finally {
      Sf = !1;
    }
  };
  n.getExtension = function (a) {
    ab(this, a.sf);
    return a.eh(ab(this, Cg));
  };
  n.hasExtension = function (a) {
    ab(this, a.sf);
    C(!a.jh, "repeated extensions don't support hasExtension");
    var b = ab(this, Cg);
    return null != jg(b, a.dh, !1);
  };
  n.clone = function () {
    var a = ab(this, Cg);
    var b = a.s;
    Ya(b);
    b = eg(b, gg, Of);
    Nf(b);
    Ya(b);
    ag = b;
    b = new a.constructor(b);
    ag = void 0;
    Fg(b, a);
    return b;
  };
  var rg = function (a) {
    if (Mf(a.s)) {
      var b = zg(a, !1);
      b.me = a;
      a = b;
    }
    return a;
  };
  function Dg(a, b) {
    if (Array.isArray(a)) {
      var c = Jf(a),
        d = 1;
      !b || c & 2 || (d |= 16);
      (c & d) !== d && Kf(a, c | d);
    }
  }
  Cg.prototype.gb = Qf;
  Cg.prototype.toString = function () {
    return this.s.toString();
  };
  function Eg(a, b) {
    return cg(b);
  }
  function Fg(a, b) {
    C(a, "expected `to` to be non-null");
    C(b, "expected `from` to be non-null");
    b.Bb && (a.Bb = b.Bb.slice());
    var c = b.T;
    if (c) {
      b = b.ga;
      for (var d in c) {
        var e = c[d];
        if (e) {
          var f = !(!b || !b[d]),
            g = +d;
          if (Array.isArray(e)) {
            if (e.length) {
              var h = a,
                l = e[0].constructor,
                k = Mf(h.s);
              var m = h;
              var r = l,
                q = (l = k);
              m.T || (m.T = {});
              C(!q || l, "returnFrozen must be true for immutable messages");
              var z = m.T[g],
                A = og(m, g, f, q);
              if (z)
                q ||
                  (Object.isFrozen(z)
                    ? l || ((z = Array.prototype.slice.call(z)), (m.T[g] = z))
                    : l && Object.freeze(z));
              else {
                z = [];
                var u = !!(Jf(m.s) & 16),
                  H = Mf(A);
                !q &&
                  H &&
                  ((A = Lf(Array.prototype.slice.call(A))), kg(m, g, A, f));
                for (var I = H, V = 0; V < A.length; V++) {
                  var ta = A[V];
                  var B = ta;
                  var y = r,
                    F = u,
                    Va = !1;
                  Va = void 0 === Va ? !1 : Va;
                  F = void 0 === F ? !1 : F;
                  B = Array.isArray(B)
                    ? new y(F ? Nf(B) : B)
                    : Va
                    ? new y()
                    : void 0;
                  void 0 !== B &&
                    ((I = I || Mf(ta)), z.push(B), H && Hf(B.s, 2));
                }
                m.T[g] = z;
                r = A;
                I = !I;
                Object.isFrozen(r) ||
                  (Ya(r, "state is only maintained on arrays."),
                  (u = Jf(r) | 33),
                  Kf(r, I ? u | 8 : u & -9));
                (q || (l && H)) && Hf(z, 2);
                (q || l) && Object.freeze(z);
              }
              m = ng(z, A, m);
              f = og(h, g, f, k);
              if (!k && f && !(Jf(f) & 8)) {
                for (k = 0; k < m.length; k++)
                  (g = m[k]),
                    (l = rg(g)),
                    g !== l && ((m[k] = l), (f[k] = m[k].s));
                Hf(f, 8);
              }
              h = ng(m, f, h);
              for (k = 0; k < Math.min(h.length, e.length); k++)
                Fg(h[k], ab(e[k], Cg));
            }
          } else throw Error("O`" + Da(e) + "`" + e);
        }
      }
    }
  }
  C(!0);
  function Gg(a, b) {
    a.ee =
      "function" === typeof b
        ? b
        : function () {
            return b;
          };
    return a;
  }
  var Hg = void 0;
  function Ig(a, b) {
    b = void 0 === b ? new Set() : b;
    if (b.has(a)) return "(Recursive reference)";
    switch (typeof a) {
      case "object":
        if (a) {
          var c = Object.getPrototypeOf(a);
          switch (c) {
            case Map.prototype:
            case Set.prototype:
            case Array.prototype:
              b.add(a);
              var d =
                "[" +
                Array.from(a, function (e) {
                  return Ig(e, b);
                }).join(", ") +
                "]";
              b.delete(a);
              c !== Array.prototype && (d = Jg(c.constructor) + "(" + d + ")");
              return d;
            case Object.prototype:
              return (
                b.add(a),
                (c =
                  "{" +
                  Object.entries(a)
                    .map(function (e) {
                      var f = v(e);
                      e = f.next().value;
                      f = f.next().value;
                      return e + ": " + Ig(f, b);
                    })
                    .join(", ") +
                  "}"),
                b.delete(a),
                c
              );
            default:
              return (
                (d = "Object"),
                c && c.constructor && (d = Jg(c.constructor)),
                "function" === typeof a.toString &&
                a.toString !== Object.prototype.toString
                  ? d + "(" + String(a) + ")"
                  : "(object " + d + ")"
              );
          }
        }
        break;
      case "function":
        return "function " + Jg(a);
      case "number":
        if (!Number.isFinite(a)) return String(a);
        break;
      case "bigint":
        return a.toString(10) + "n";
    }
    return JSON.stringify(a);
  }
  function Jg(a) {
    var b = a.name;
    b ||
      (b = (a = /function\s+([^\(]+)/m.exec(String(a))) ? a[1] : "(Anonymous)");
    return b;
  }
  var Kg = Cg;
  var Lg = function (a, b) {
    this.x = void 0 !== a ? a : 0;
    this.y = void 0 !== b ? b : 0;
  };
  n = Lg.prototype;
  n.clone = function () {
    return new Lg(this.x, this.y);
  };
  n.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
  };
  n.equals = function (a) {
    return (
      a instanceof Lg &&
      (this == a ? !0 : this && a ? this.x == a.x && this.y == a.y : !1)
    );
  };
  n.ceil = function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  };
  n.floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  };
  n.round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };
  n.translate = function (a, b) {
    a instanceof Lg
      ? ((this.x += a.x), (this.y += a.y))
      : ((this.x += Number(a)), "number" === typeof b && (this.y += b));
    return this;
  };
  n.scale = function (a, b) {
    this.x *= a;
    this.y *= "number" === typeof b ? b : a;
    return this;
  };
  var Mg = function (a, b) {
    this.width = a;
    this.height = b;
  };
  n = Mg.prototype;
  n.clone = function () {
    return new Mg(this.width, this.height);
  };
  n.toString = function () {
    return "(" + this.width + " x " + this.height + ")";
  };
  n.aspectRatio = function () {
    return this.width / this.height;
  };
  n.isEmpty = function () {
    return !(this.width * this.height);
  };
  n.ceil = function () {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  n.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  n.round = function () {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  n.scale = function (a, b) {
    this.width *= a;
    this.height *= "number" === typeof b ? b : a;
    return this;
  };
  var Pg = function (a) {
      return a ? new Ng(Og(a)) : Oa || (Oa = new Ng());
    },
    Qg = function (a) {
      var b = a.scrollingElement
        ? a.scrollingElement
        : jf || "CSS1Compat" != a.compatMode
        ? a.body || a.documentElement
        : a.documentElement;
      a = a.parentWindow || a.defaultView;
      return ff && a.pageYOffset != b.scrollTop
        ? new Lg(b.scrollLeft, b.scrollTop)
        : new Lg(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
    },
    Rg = function (a, b, c) {
      function d(h) {
        h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h);
      }
      for (var e = 1; e < c.length; e++) {
        var f = c[e];
        if (!Ea(f) || (Fa(f) && 0 < f.nodeType)) d(f);
        else {
          a: {
            if (f && "number" == typeof f.length) {
              if (Fa(f)) {
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
          bb(g ? fb(f) : f, d);
        }
      }
    },
    Og = function (a) {
      C(a, "Node cannot be null or undefined.");
      return 9 == a.nodeType ? a : a.ownerDocument || a.document;
    },
    Sg = function (a, b) {
      a && (a = a.parentNode);
      for (var c = 0; a; ) {
        C("parentNode" != a.name);
        if (b(a)) return a;
        a = a.parentNode;
        c++;
      }
      return null;
    },
    Ng = function (a) {
      this.bb = a || Ca.document || document;
    };
  n = Ng.prototype;
  n.getElementsByTagName = function (a, b) {
    return (b || this.bb).getElementsByTagName(String(a));
  };
  n.createElement = function (a) {
    var b = this.bb;
    a = String(a);
    "application/xhtml+xml" === b.contentType && (a = a.toLowerCase());
    return b.createElement(a);
  };
  n.createTextNode = function (a) {
    return this.bb.createTextNode(String(a));
  };
  n.appendChild = function (a, b) {
    C(
      null != a && null != b,
      "goog.dom.appendChild expects non-null arguments"
    );
    a.appendChild(b);
  };
  n.append = function (a, b) {
    Rg(Og(a), a, arguments);
  };
  n.canHaveChildren = function (a) {
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
  n.removeNode = function (a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null;
  };
  n.isElement = function (a) {
    return Fa(a) && 1 == a.nodeType;
  };
  n.contains = function (a, b) {
    if (!a || !b) return !1;
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition)
      return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b; ) b = b.parentNode;
    return b == a;
  };
  var Ug = function () {
      return (
        !Tg() && (D("iPod") || D("iPhone") || D("Android") || D("IEMobile"))
      );
    },
    Tg = function () {
      return D("iPad") || (D("Android") && !D("Mobile")) || D("Silk");
    };
  var Vg = function (a, b) {
    this.name = a;
    this.value = b;
  };
  Vg.prototype.toString = function () {
    return this.name;
  };
  var Wg = new Vg("OFF", Infinity),
    Xg = new Vg("WARNING", 900),
    Yg = new Vg("CONFIG", 700),
    Zg = function () {
      this.Yb = 0;
      this.clear();
    },
    $g;
  Zg.prototype.clear = function () {
    this.Ud = Array(this.Yb);
    this.Wd = -1;
    this.ne = !1;
  };
  var ah = function (a, b, c) {
    this.reset(a || Wg, b, c, void 0, void 0);
  };
  ah.prototype.reset = function (a, b, c, d) {
    d || Date.now();
    this.Wf = b;
  };
  ah.prototype.getMessage = function () {
    return this.Wf;
  };
  var bh = function (a, b) {
      this.level = null;
      this.yf = [];
      this.parent = (void 0 === b ? null : b) || null;
      this.children = [];
      this.Pf = {
        bd: function () {
          return a;
        },
      };
    },
    ch = function (a) {
      if (a.level) return a.level;
      if (a.parent) return ch(a.parent);
      Sa("Root logger has no level set.");
      return Wg;
    },
    dh = function (a, b) {
      for (; a; )
        a.yf.forEach(function (c) {
          c(b);
        }),
          (a = a.parent);
    },
    eh = function () {
      this.entries = {};
      var a = new bh("");
      a.level = Yg;
      this.entries[""] = a;
    },
    fh,
    gh = function (a, b) {
      var c = a.entries[b];
      if (c) return c;
      c = b.lastIndexOf(".");
      c = b.slice(0, Math.max(c, 0));
      c = gh(a, c);
      var d = new bh(b, c);
      a.entries[b] = d;
      c.children.push(d);
      return d;
    },
    hh = function () {
      fh || (fh = new eh());
      return fh;
    }; /*

 SPDX-License-Identifier: Apache-2.0
*/
  var ih = [],
    jh = function (a) {
      var b;
      if ((b = gh(hh(), "safevalues").Pf)) {
        var c = "A URL with content '" + a + "' was sanitized away.",
          d = Xg;
        if ((a = b))
          if ((a = b && d)) {
            a = d.value;
            var e = b ? ch(gh(hh(), b.bd())) : Wg;
            a = a >= e.value;
          }
        if (a) {
          d = d || Wg;
          a = gh(hh(), b.bd());
          "function" === typeof c && (c = c());
          $g || ($g = new Zg());
          e = $g;
          b = b.bd();
          if (0 < e.Yb) {
            var f = (e.Wd + 1) % e.Yb;
            e.Wd = f;
            e.ne
              ? ((e = e.Ud[f]), e.reset(d, c, b), (b = e))
              : ((e.ne = f == e.Yb - 1), (b = e.Ud[f] = new ah(d, c, b)));
          } else b = new ah(d, c, b);
          dh(a, b);
        }
      }
    };
  -1 === ih.indexOf(jh) && ih.push(jh);
  var kh = function (a) {
    try {
      return !!a && null != a.location.href && df(a, "foo");
    } catch (b) {
      return !1;
    }
  };
  function lh() {
    var a = void 0 === a ? Ca : a;
    return (a = a.performance) && a.now ? a.now() : null;
  }
  var mh = function (a, b) {
      b = b.google_js_reporting_queue = b.google_js_reporting_queue || [];
      2048 > b.length && b.push(a);
    },
    nh = function (a, b) {
      var c = void 0 === c ? !1 : c;
      var d = window,
        e = "undefined" !== typeof queueMicrotask;
      return function () {
        c &&
          e &&
          queueMicrotask(function () {
            d.google_rum_task_id_counter = d.google_rum_task_id_counter || 1;
            d.google_rum_task_id_counter += 1;
          });
        var f = lh(),
          g = 3;
        try {
          var h = b.apply(this, arguments);
        } catch (k) {
          throw ((g = 13), k);
        } finally {
          if (d.google_measure_js_timing && f) {
            var l = lh() || 0;
            mh(
              Object.assign(
                {},
                { label: a.toString(), value: f, duration: l - f, type: g },
                c &&
                  e && {
                    taskId: (d.google_rum_task_id_counter =
                      d.google_rum_task_id_counter || 1),
                  }
              ),
              d
            );
          }
        }
        return h;
      };
    };
  var oh = function () {
    Ha.apply(this, arguments);
  };
  w(oh, Ha);
  oh.prototype.Ea = function (a, b) {
    return Ha.prototype.Ea.call(this, a, nh(a, b));
  };
  function ph(a, b) {
    return function (c) {
      return new L(function (d) {
        return c.subscribe(
          function (e) {
            a.Ea(b, function () {
              d.next(e);
            })();
          },
          function (e) {
            a.Ea(b, function () {
              d.error(e);
            })();
          },
          function () {
            a.Ea(b, function () {
              d.complete();
            })();
          }
        );
      });
    };
  }
  var rh = function () {
    for (var a = v(x.apply(0, arguments)), b = a.next(); !b.done; b = a.next())
      if (((b = b.value), b.oa())) {
        this.l = b;
        return;
      }
    this.l = new qh();
  };
  n = rh.prototype;
  n.oa = function () {
    return this.l.oa();
  };
  n.now = function () {
    return this.l.now();
  };
  n.setTimeout = function (a, b) {
    return this.l.setTimeout(a, b);
  };
  n.clearTimeout = function (a) {
    this.l.clearTimeout(a);
  };
  n.interval = function (a) {
    return this.l.interval(a);
  };
  p.Object.defineProperties(rh.prototype, {
    timeline: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.l.timeline;
      },
    },
  });
  var qh = function () {
    this.timeline = Symbol();
  };
  n = qh.prototype;
  n.oa = function () {
    return !1;
  };
  n.now = function () {
    return new Ad(0, this.timeline);
  };
  n.setTimeout = function () {
    return 0;
  };
  n.clearTimeout = function () {};
  n.interval = function () {
    return Rc;
  };
  var sh = function (a, b) {
    this.G = a;
    this.u = b;
  };
  sh.prototype.setTimeout = function (a, b) {
    return this.G.setTimeout(this.u.Ea(734, a), b);
  };
  sh.prototype.clearTimeout = function (a) {
    this.G.clearTimeout(a);
  };
  sh.prototype.interval = function (a) {
    var b = this;
    return new L(function (c) {
      var d = 0,
        e = b.G.setInterval(function () {
          c.next(d++);
        }, a);
      return function () {
        b.G.clearInterval(e);
      };
    });
  };
  sh.prototype.oa = function () {
    return (
      !!this.G.clearTimeout &&
      !!this.G.setTimeout &&
      !!this.G.setInterval &&
      !!this.G.clearInterval
    );
  };
  var th = function (a, b) {
    sh.call(this, a, b);
    this.timeline = zd;
  };
  w(th, sh);
  th.prototype.now = function () {
    return new Ad(this.G.Date.now(), this.timeline);
  };
  th.prototype.oa = function () {
    return !!this.G.Date && !!this.G.Date.now && sh.prototype.oa.call(this);
  };
  var uh = function (a, b) {
    sh.call(this, a, b);
    this.timeline = yd;
  };
  w(uh, sh);
  uh.prototype.now = function () {
    return new Ad(this.G.performance.now(), this.timeline);
  };
  uh.prototype.oa = function () {
    return (
      !!this.G.performance &&
      !!this.G.performance.now &&
      sh.prototype.oa.call(this)
    );
  };
  var vh = function (a) {
    this.context = a;
  };
  vh.prototype.ping = function () {
    var a = this;
    return Pc.apply(
      null,
      ea(
        x.apply(0, arguments).map(function (b) {
          return Cc(
            a.context.global.fetch(b, {
              method: "GET",
              cache: "no-cache",
              keepalive: !0,
              mode: "no-cors",
            })
          ).h(
            P(function (c) {
              return 200 === c.status;
            })
          );
        })
      )
    ).h(
      be(function (b) {
        return b;
      }),
      ke()
    );
  };
  p.Object.defineProperties(vh.prototype, {
    tb: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return !wh(this.context) && !!this.context.global.fetch;
      },
    },
  });
  var xh = function (a) {
    this.context = a;
  };
  xh.prototype.ping = function () {
    var a = this;
    return N(
      x
        .apply(0, arguments)
        .map(function (b) {
          try {
            var c = a.context.global;
            c.google_image_requests || (c.google_image_requests = []);
            var d = c.document;
            d = void 0 === d ? document : d;
            var e = d.createElement("img");
            e.src = b;
            c.google_image_requests.push(e);
            return !0;
          } catch (f) {
            return !1;
          }
        })
        .every(function (b) {
          return b;
        })
    );
  };
  p.Object.defineProperties(xh.prototype, {
    tb: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return !wh(this.context);
      },
    },
  });
  function yh(a) {
    a = a.global;
    if (a.PendingGetBeacon) return a.PendingGetBeacon;
  }
  var Bh = function (a) {
      this.context = a;
      if (void 0 === zh) {
        var b,
          c,
          d =
            null == (b = a.global)
              ? void 0
              : null == (c = b.document)
              ? void 0
              : c.createElement("meta");
        try {
          d &&
            ((d.httpEquiv = "origin-trial"),
            (d.content =
              "A/6hmwx8DpHud613fSYYa2C2T61iC513V4BYG/pBH4zs5sGsUc9RgaPKhfk3JhHF30N/9/NntWzEq28kkrMxpgQAAABweyJvcmlnaW4iOiJodHRwczovL2FkLmRvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiUGVuZGluZ0JlYWNvbkFQSSIsImV4cGlyeSI6MTY3ODIzMzU5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ=="),
            a.global.document.head.append(d));
        } catch (e) {}
        zh = d;
      }
      Ah = !0;
    },
    zh;
  Bh.prototype.qa = function (a) {
    return (
      Ah &&
      !wh(this.context) &&
      void 0 !== yh(this.context) &&
      (void 0 === a || "GET" === a)
    );
  };
  Bh.prototype.ia = function (a, b) {
    if (!this.qa(b)) throw new qd();
    return new Ch(this.context, a);
  };
  var Ah = !1,
    Ch = function (a, b) {
      this.context = a;
      this.Ad = b;
      a = yh(this.context);
      if (void 0 === a) throw Error();
      this.Hd = new a(Dh(this), { backgroundTimeout: 0 });
    },
    Dh = function (a) {
      a = a.Ad;
      return ("&" === a.slice(-1)[0] ? a : a + "&") + "pbapi=1";
    };
  Ch.prototype.deactivate = function () {
    this.Hd.deactivate();
  };
  Ch.prototype.sendNow = function () {
    this.Hd.sendNow();
  };
  p.Object.defineProperties(Ch.prototype, {
    url: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.Ad;
      },
      set: function (a) {
        this.Ad = a;
        this.Hd.setURL(Dh(this));
      },
    },
    method: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return "GET";
      },
      set: function (a) {
        if ("GET" !== a) throw new qd();
      },
    },
  });
  var Eh = function (a) {
    this.context = a;
  };
  Eh.prototype.ping = function () {
    var a = this;
    return N(
      x
        .apply(0, arguments)
        .map(function (b) {
          var c;
          return null == (c = a.context.global.navigator)
            ? void 0
            : c.sendBeacon(b);
        })
        .every(function (b) {
          return b;
        })
    );
  };
  p.Object.defineProperties(Eh.prototype, {
    tb: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        var a;
        return (
          !wh(this.context) &&
          void 0 !==
            (null == (a = this.context.global.navigator)
              ? void 0
              : a.sendBeacon)
        );
      },
    },
  });
  function Fh(a) {
    return function (b) {
      return b.h(Gh(a, re(new M())));
    };
  }
  function Y(a, b) {
    return function (c) {
      return c.h(Gh(a, we(b)));
    };
  }
  function Gh(a, b) {
    function c(d) {
      return new L(function (e) {
        return d.subscribe(
          function (f) {
            Ka(
              a,
              function () {
                return void e.next(f);
              },
              3
            );
          },
          function (f) {
            Ka(
              a,
              function () {
                return void e.error(f);
              },
              3
            );
          },
          function () {
            Ka(
              a,
              function () {
                return void e.complete();
              },
              3
            );
          }
        );
      });
    }
    return K(c, Be(), b, Zb(), c);
  }
  var Z = function (a) {
    this.value = a;
  };
  Z.prototype.ca = function (a) {
    return N(this.value).h(Y(a, 1));
  };
  var Hh = new Z(!0);
  function Ih(a) {
    var b = Jh(a);
    return null === b
      ? new Z(null)
      : b.h(
          P(function (c) {
            c = c.nb();
            if (zf) c = Ca.btoa(c);
            else {
              for (var d = [], e = 0, f = 0; f < c.length; f++) {
                var g = c.charCodeAt(f);
                if (255 < g) throw Error("A");
                d[e++] = g;
              }
              c = Af(d);
            }
            return c;
          }),
          Ud(1),
          Y(a.i, 1)
        );
  }
  function Kh(a) {
    var b = void 0 === b ? {} : b;
    if ("function" === typeof Event) return new Event(a, b);
    if ("undefined" !== typeof document) {
      var c = document.createEvent("CustomEvent");
      c.initCustomEvent(a, b.bubbles || !1, b.cancelable || !1, b.detail);
      return c;
    }
    throw Error();
  }
  var Lh = function (a) {
    this.value = a;
    this.ud = new M();
  };
  Lh.prototype.release = function () {
    this.ud.next();
    this.ud.complete();
    this.value = void 0;
  };
  p.Object.defineProperties(Lh.prototype, {
    j: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.value;
      },
    },
    released: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.ud;
      },
    },
  });
  var Mh = ["FRAME", "IMG", "IFRAME"],
    Nh = /^[01](px)?$/;
  function Oh(a) {
    return "string" === typeof a ? document.getElementById(a) : a;
  }
  function Ph(a, b) {
    var c = !0,
      d = !0,
      e = void 0,
      f = !0;
    c = void 0 === c ? !0 : c;
    d = void 0 === d ? !1 : d;
    f = void 0 === f ? !1 : f;
    if ((a = Oh(a))) {
      e ||
        (e = function (V, ta, B) {
          V.addEventListener(ta, B);
        });
      for (
        var g = !1,
          h = function (V) {
            g || ((g = !0), b(V));
          },
          l,
          k,
          m = 0;
        m < Mh.length;
        ++m
      )
        if (Mh[m] == a.tagName) {
          k = 3;
          l = [a];
          break;
        }
      l || ((l = a.querySelectorAll(Mh.join(","))), (k = 2));
      var r = 0,
        q = 0,
        z = (a = !1);
      m = {};
      for (var A = 0; A < l.length; m = { Tb: m.Tb }, A++) {
        var u = l[A];
        if (
          !("IMG" != u.tagName ||
          !u.complete ||
          (u.naturalWidth && u.naturalHeight)
            ? Nh.test(u.getAttribute("width")) &&
              Nh.test(u.getAttribute("height"))
            : 1)
        ) {
          if ("IMG" == u.tagName)
            var H = u.naturalWidth && u.naturalHeight ? !0 : !1;
          else
            try {
              H =
                "complete" ===
                (u.readyState
                  ? u.readyState
                  : u.contentWindow &&
                    u.contentWindow.document &&
                    u.contentWindow.document.readyState)
                  ? !0
                  : !1;
            } catch (V) {
              H = void 0 === d ? !1 : d;
            }
          if (H) a = !0;
          else {
            r++;
            m.Tb = "IMG" === u.tagName;
            var I = (function (V) {
              return function () {
                r--;
                r || h(k);
                V.Tb && (q--, !q && z && h(k));
              };
            })(m);
            e(u, "load", I);
            m.Tb && (q++, e(u, "error", I));
          }
        }
      }
      l = null;
      if (0 === r && !a && "complete" === Ca.document.readyState) k = 5;
      else if (r || !a) {
        e(Ca, "load", function () {
          f && q ? (z = !0) : h(4);
        });
        return;
      }
      c && h(k);
    }
  }
  function Qh(a, b, c) {
    if (a) for (var d = 0; null != a && 500 > d && !c(a); ++d) a = b(a);
  }
  function Rh(a, b) {
    Qh(
      a,
      function (c) {
        try {
          return c === c.parent ? null : c.parent;
        } catch (d) {}
        return null;
      },
      b
    );
  }
  function Sh(a, b) {
    if ("IFRAME" == a.tagName) b(a);
    else {
      a = a.querySelectorAll("IFRAME");
      for (var c = 0; c < a.length && !b(a[c]); ++c);
    }
  }
  function Th(a) {
    return ((a = a.ownerDocument) && (a.parentWindow || a.defaultView)) || null;
  }
  function Uh(a, b, c) {
    try {
      var d = JSON.parse(c.data);
    } catch (g) {}
    if ("object" === typeof d && d && "creativeLoad" === d.type) {
      var e = Th(a);
      if (c.source && e) {
        var f;
        Rh(c.source, function (g) {
          try {
            if (g.parent === e) return (f = g), !0;
          } catch (h) {}
        });
        f &&
          Sh(a, function (g) {
            if (g.contentWindow === f) return b(d), !0;
          });
      }
    }
  }
  function Vh(a) {
    return "string" === typeof a ? document.getElementById(a) : a;
  }
  var Wh = function (a, b) {
    var c = Vh(a);
    if (c)
      if (c.onCreativeLoad) c.onCreativeLoad(b);
      else {
        var d = b ? [b] : [],
          e = function (f) {
            for (var g = 0; g < d.length; ++g)
              try {
                d[g](1, f);
              } catch (h) {}
            d = {
              push: function (h) {
                h(1, f);
              },
            };
          };
        c.onCreativeLoad = function (f) {
          d.push(f);
        };
        c.setAttribute("data-creative-load-listener", "");
        c.addEventListener("creativeLoad", function (f) {
          e(f.detail);
        });
        Ca.addEventListener("message", function (f) {
          Uh(c, e, f);
        });
      }
  };
  var Xh = function (a, b) {
      var c = this;
      this.global = a;
      this.uc = b;
      this.hg = this.document
        ? Pc(N(!0), Ic(this.document, "visibilitychange")).h(
            ph(this.uc.u, 748),
            P(function () {
              return c.document ? c.document.visibilityState : "visible";
            }),
            U()
          )
        : N("visible");
      this.eg = this.document
        ? Ic(this.document, "DOMContentLoaded").h(ph(this.uc.u, 739), Ud(1))
        : N(Kh("DOMContentLoaded"));
    },
    Yh = function (a) {
      return a.document ? a.document.readyState : "complete";
    },
    Zh = function (a) {
      return null !== a.document && void 0 !== a.document.visibilityState;
    };
  Xh.prototype.querySelector = function (a) {
    return this.document ? this.document.querySelector(a) : null;
  };
  Xh.prototype.querySelectorAll = function (a) {
    return this.document ? fb(this.document.querySelectorAll(a)) : [];
  };
  var $h = function (a) {
    return (
      null !== a.document && "function" === typeof a.document.elementFromPoint
    );
  };
  Xh.prototype.elementFromPoint = function (a, b) {
    if (!this.document || !$h(this)) return null;
    a = this.document.elementFromPoint(a, b);
    return null === a ? null : new Lh(a);
  };
  var ai = function (a, b, c) {
    c = void 0 === c ? !1 : c;
    if (void 0 === b.j || !a.document) return N(b).h(ph(a.uc.u, 749));
    var d = new Vb(1),
      e = function () {
        d.next(b);
      };
    c || Wh(b.j, e);
    Ph(b.j, e);
    return d.h(ph(a.uc.u, 749), Ud(1));
  };
  p.Object.defineProperties(Xh.prototype, {
    document: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return df(this.global, "document")
          ? this.global.document || null
          : null;
      },
    },
  });
  var bi = { left: 0, top: 0, width: 0, height: 0 };
  function ci(a, b) {
    return (
      a.left === b.left &&
      a.top === b.top &&
      a.width === b.width &&
      a.height === b.height
    );
  }
  function di(a, b) {
    return {
      left: Math.max(a.left, b.left),
      top: Math.max(a.top, b.top),
      width: Math.max(
        0,
        Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left)
      ),
      height: Math.max(
        0,
        Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top)
      ),
    };
  }
  function ei(a, b) {
    return {
      left: Math.round(a.left + b.x),
      top: Math.round(a.top + b.y),
      width: a.width,
      height: a.height,
    };
  }
  var fi = function (a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d;
  };
  n = fi.prototype;
  n.dd = function () {
    return this.right - this.left;
  };
  n.ad = function () {
    return this.bottom - this.top;
  };
  n.clone = function () {
    return new fi(this.top, this.right, this.bottom, this.left);
  };
  n.toString = function () {
    return (
      "(" +
      this.top +
      "t, " +
      this.right +
      "r, " +
      this.bottom +
      "b, " +
      this.left +
      "l)"
    );
  };
  n.contains = function (a) {
    return this && a
      ? a instanceof fi
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
  n.expand = function (a, b, c, d) {
    Fa(a)
      ? ((this.top -= a.top),
        (this.right += a.right),
        (this.bottom += a.bottom),
        (this.left -= a.left))
      : ((this.top -= a),
        (this.right += Number(b)),
        (this.bottom += Number(c)),
        (this.left -= Number(d)));
    return this;
  };
  n.ceil = function () {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this;
  };
  n.floor = function () {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this;
  };
  n.round = function () {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this;
  };
  n.translate = function (a, b) {
    a instanceof Lg
      ? ((this.left += a.x),
        (this.right += a.x),
        (this.top += a.y),
        (this.bottom += a.y))
      : (Ta(a),
        (this.left += a),
        (this.right += a),
        "number" === typeof b && ((this.top += b), (this.bottom += b)));
    return this;
  };
  n.scale = function (a, b) {
    b = "number" === typeof b ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= b;
    this.bottom *= b;
    return this;
  };
  var hi = function (a) {
    Kg.call(this, a, -1, gi);
  };
  w(hi, Kg);
  var ii = function (a, b) {
      return lg(a, 2, b);
    },
    ji = function (a, b) {
      return lg(a, 3, b);
    },
    ki = function (a, b) {
      return lg(a, 4, b);
    },
    li = function (a, b) {
      return lg(a, 5, b);
    },
    mi = function (a, b) {
      return lg(a, 9, b);
    },
    oi = function (a, b) {
      return tg(a, ni, 10, b);
    },
    pi = function (a, b) {
      return lg(a, 11, b);
    },
    qi = function (a, b) {
      return lg(a, 1, b);
    },
    ri = function (a, b) {
      return lg(a, 7, b);
    },
    ni = function (a) {
      Kg.call(this, a);
    };
  w(ni, Kg);
  ni.prototype.de = function () {
    return ug(jg(this, 2), "");
  };
  var gi = [10, 6];
  var si =
    "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(
      " "
    );
  function ti(a) {
    var b;
    return null != (b = a.google_tag_data) ? b : (a.google_tag_data = {});
  }
  function ui(a) {
    var b, c;
    return (
      "function" ===
      typeof (null == (b = a.navigator)
        ? void 0
        : null == (c = b.userAgentData)
        ? void 0
        : c.getHighEntropyValues)
    );
  }
  function vi(a) {
    if (!ui(a)) return null;
    var b = ti(a);
    if (b.uach_promise) return b.uach_promise;
    a = a.navigator.userAgentData.getHighEntropyValues(si).then(function (c) {
      null != b.uach || (b.uach = c);
      return c;
    });
    return (b.uach_promise = a);
  }
  function wi(a) {
    var b;
    return pi(
      oi(
        li(
          ii(
            qi(
              ki(
                ri(
                  mi(ji(new hi(), a.architecture || ""), a.bitness || ""),
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
              var d = new ni();
              d = lg(d, 1, c.brand);
              return lg(d, 2, c.version);
            })) || []
      ),
      a.wow64 || !1
    );
  }
  function xi(a) {
    var b, c;
    return null !=
      (c =
        null == (b = vi(a))
          ? void 0
          : b.then(function (d) {
              return wi(d);
            }))
      ? c
      : null;
  }
  var yi = function (a, b, c) {
    a = void 0 === a ? window : a;
    b = void 0 === b ? null : b;
    c = void 0 === c ? new Ha() : c;
    md.call(this);
    this.global = a;
    this.Sa = b;
    this.u = c;
    this.fg = Ic(this.global, "pagehide").h(ph(this.u, 941));
    this.ve = Ic(this.global, "load").h(ph(this.u, 738), Ud(1));
    this.gg = Ic(this.global, "resize").h(ph(this.u, 741));
    this.onMessage = Ic(this.global, "message").h(ph(this.u, 740));
    this.document = new Xh(this.global, this);
    this.l = new rh(new uh(this.G, this.u), new th(this.G, this.u));
    this.M = new xd(
      new Bh(this),
      new Te(this, new vh(this), "GET"),
      new Te(this, new Eh(this), "POST"),
      new Te(this, new xh(this), "GET")
    );
  };
  w(yi, md);
  var wh = function (a) {
    var b = a.global;
    return (
      !!a.global.HTMLFencedFrameElement &&
      !!b.fence &&
      "function" === typeof b.fence.reportEvent
    );
  };
  yi.prototype.kb = function (a) {
    wh(this) && this.global.fence.reportEvent(a);
  };
  yi.prototype.cd = function () {
    return this.fg.h(
      ph(this.u, 942),
      Y(this.i, 1),
      P(function () {})
    );
  };
  var zi = function (a) {
      var b = new yi(a.global.top, a.Sa);
      b.M = a.M;
      return b;
    },
    Ai = function (a, b) {
      b.start();
      return Ic(b, "message").h(ph(a.u, 740));
    };
  yi.prototype.postMessage = function (a, b, c) {
    c = void 0 === c ? [] : c;
    this.global.postMessage(a, b, c);
  };
  yi.prototype.dd = function () {
    return kh(this.global) ? this.global.width : 0;
  };
  yi.prototype.ad = function () {
    return kh(this.global) ? this.global.height : 0;
  };
  var Bi = function (a, b) {
    try {
      var c = a.global,
        d = Tg() || Ug();
      try {
        b && (c = c.top);
        a = c;
        b && null !== a && a != a.top && (a = a.top);
        try {
          if (void 0 === d ? 0 : d)
            var e = new Mg(a.innerWidth, a.innerHeight).round();
          else {
            var f = (a || window).document,
              g = "CSS1Compat" == f.compatMode ? f.documentElement : f.body;
            e = new Mg(g.clientWidth, g.clientHeight).round();
          }
          var h = e;
        } catch (A) {
          h = new Mg(-12245933, -12245933);
        }
        b = h;
        var l = b.height,
          k = b.width;
        if (-12245933 === k) var m = new fi(k, k, k, k);
        else {
          var r = Qg(Pg(c.document).bb),
            q = r.x,
            z = r.y;
          m = new fi(z, q + k, z + l, q);
        }
      } catch (A) {
        m = new fi(-12245933, -12245933, -12245933, -12245933);
      }
      return { left: m.left, top: m.top, width: m.dd(), height: m.ad() };
    } catch (A) {
      return bi;
    }
  };
  yi.prototype.validate = function () {
    return this.global && this.l.oa() && this.M.qa();
  };
  var Jh = function (a) {
    return (a = xi(a.global)) ? Cc(a) : null;
  };
  p.Object.defineProperties(yi.prototype, {
    G: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return window;
      },
    },
    cb: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return !kh(this.global.top);
      },
    },
    fd: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.cb || this.global.top !== this.global;
      },
    },
    scrollY: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.global.scrollY;
      },
    },
    MutationObserver: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.G.MutationObserver;
      },
    },
    ResizeObserver: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.G.ResizeObserver;
      },
    },
    Jf: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        C(!0, "Major version must be an integer");
        var a = kb();
        if (D("Trident") || D("MSIE")) {
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
        } else a = "";
        "" === a
          ? (a = NaN)
          : ((a = a.split(".")), (a = 0 === a.length ? NaN : Number(a[0])));
        return 8 <= a;
      },
    },
    bf: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return "vu" in this.global || "vv" in this.global;
      },
    },
  });
  var Ci = !ff && !mb(),
    Di = function (a, b) {
      if (/-[a-z]/.test(b)) return null;
      if (Ci && a.dataset) {
        if (ob() && !(b in a.dataset)) return null;
        a = a.dataset[b];
        return void 0 === a ? null : a;
      }
      return a.getAttribute(
        "data-" +
          String(b)
            .replace(/([A-Z])/g, "-$1")
            .toLowerCase()
      );
    };
  var Ei = {},
    Fi =
      ((Ei["data-google-av-cxn"] = "_avicxn_"),
      (Ei["data-google-av-cpmav"] = "_cvu_"),
      (Ei["data-google-av-metadata"] = "_avm_"),
      (Ei["data-google-av-adk"] = "_adk_"),
      (Ei["data-google-av-btr"] = void 0),
      (Ei["data-google-av-override"] = void 0),
      (Ei["data-google-av-dm"] = void 0),
      (Ei["data-google-av-immediate"] = void 0),
      (Ei["data-google-av-aid"] = void 0),
      (Ei["data-google-av-naid"] = void 0),
      (Ei["data-google-av-inapp"] = void 0),
      (Ei["data-google-av-slift"] = void 0),
      (Ei["data-google-av-itpl"] = void 0),
      (Ei["data-google-av-ext-cxn"] = void 0),
      (Ei["data-google-av-rs"] = void 0),
      (Ei["data-google-av-flags"] = void 0),
      (Ei["data-google-av-turtlex"] = void 0),
      Ei),
    Gi = {},
    Hi =
      ((Gi["data-google-av-adk"] = "googleAvAdk"),
      (Gi["data-google-av-btr"] = "googleAvBtr"),
      (Gi["data-google-av-cpmav"] = "googleAvCpmav"),
      (Gi["data-google-av-dm"] = "googleAvDm"),
      (Gi["data-google-av-ext-cxn"] = "googleAvExtCxn"),
      (Gi["data-google-av-immediate"] = "googleAvImmediate"),
      (Gi["data-google-av-inapp"] = "googleAvInapp"),
      (Gi["data-google-av-itpl"] = "googleAvItpl"),
      (Gi["data-google-av-metadata"] = "googleAvMetadata"),
      (Gi["data-google-av-naid"] = "googleAvNaid"),
      (Gi["data-google-av-override"] = "googleAvOverride"),
      (Gi["data-google-av-rs"] = "googleAvRs"),
      (Gi["data-google-av-slift"] = "googleAvSlift"),
      (Gi["data-google-av-cxn"] = "googleAvCxn"),
      (Gi["data-google-av-aid"] = void 0),
      (Gi["data-google-av-flags"] = "googleAvFlags"),
      (Gi["data-google-av-turtlex"] = "googleAvTurtlex"),
      Gi);
  function Ii(a, b) {
    if (void 0 === a.j) return null;
    try {
      var c;
      var d = null != (c = a.j.getAttribute(b)) ? c : null;
      if (null !== d) return d;
    } catch (g) {}
    try {
      var e = Fi[b];
      if (e && ((d = a.j[e]), void 0 !== d)) return d;
    } catch (g) {}
    try {
      var f = Hi[b];
      if (f) return Di(a.j, f);
    } catch (g) {}
    return null;
  }
  function Ji(a) {
    return P(function (b) {
      return Ii(b, a);
    });
  }
  var Ki = K(
    (function (a) {
      return P(function (b) {
        return a.map(function (c) {
          return Ii(b, c);
        });
      });
    })(["data-google-av-cxn", "data-google-av-turtlex"]),
    P(function (a) {
      var b = v(a);
      a = b.next().value;
      b = b.next().value;
      if (!a) {
        if (null !== b) return [];
        throw new td();
      }
      return a.split("|");
    })
  );
  var Li = function () {
    return K(
      Dc(function (a) {
        return a.element
          .h(
            Ki,
            Ed(function () {
              return N([""]);
            })
          )
          .h(
            P(function (b) {
              return { Fa: b, ac: a };
            })
          );
      }),
      Pd(function (a) {
        return a.Fa.sort().join(";");
      }),
      P(function (a) {
        return a.ac;
      })
    );
  };
  var Ni = function () {
      return Dc(function (a) {
        return Cc(Mi(a)).h(Fh(a.i));
      });
    },
    Mi = function (a) {
      return a.document
        .querySelectorAll(".GoogleActiveViewElement,.GoogleActiveViewClass")
        .map(function (b) {
          return new Lh(b);
        });
    };
  function Oi(a) {
    var b = a.ve,
      c = a.document.eg;
    return Pc(N({}), c, b).h(
      P(function () {
        return a;
      })
    );
  }
  var Qi = P(Pi);
  function Pi(a) {
    var b = Number(Ii(a, "data-google-av-rs"));
    if (!isNaN(b) && 0 !== b) return b;
    var c;
    return (a = null == (c = a.j) ? void 0 : c.id)
      ? 0 == a.lastIndexOf("DfaVisibilityIdentifier", 0)
        ? 6
        : 0 == a.lastIndexOf("YtKevlarVisibilityIdentifier", 0)
        ? 15
        : 0 == a.lastIndexOf("YtSparklesVisibilityIdentifier", 0)
        ? 17
        : 0 == a.lastIndexOf("YtKabukiVisibilityIdentifier", 0)
        ? 18
        : 0
      : 0;
  }
  function Ri() {
    return K(
      T(function (a) {
        return void 0 !== a;
      }),
      P(function (a) {
        return a;
      })
    );
  }
  function Si() {
    return function (a) {
      var b = [];
      return a.h(
        T(function (c) {
          if (
            void 0 === c.j ||
            b.some(function (d) {
              return d.j === c.j;
            })
          )
            return !1;
          b.push(c);
          return !0;
        })
      );
    };
  }
  function Ti(a, b) {
    b = void 0 === b ? Ob : b;
    return Pc(Oi(a), b).h(Ni(), Si(), Ri(), Y(a.i, 1));
  }
  function Ui(a) {
    var b, c, d;
    return (
      !!a &&
      "boolean" === typeof a.active &&
      "function" === typeof (null == (b = a.clock) ? void 0 : b.now) &&
      void 0 !== (null == (c = a.clock) ? void 0 : c.timeline) &&
      !(null == (d = a.D) || !d.timestamp) &&
      "function" === typeof a.X &&
      "function" === typeof a.Y &&
      "function" === typeof a.ea &&
      "function" === typeof a.map &&
      "function" === typeof a.ha
    );
  }
  function Vi(a, b) {
    return new L(function (c) {
      var d = !1,
        e = Array(b.length);
      e.fill(void 0);
      var f = new Set(),
        g = new Set(),
        h = function (r, q) {
          a.Ae
            ? ((e[q] = r),
              f.add(q),
              d ||
                ((d = !0),
                Ka(
                  a,
                  function () {
                    d = !1;
                    c.next(fb(e));
                  },
                  1
                )))
            : c.error(new ud(q));
        },
        l = function (r, q) {
          g.add(q);
          f.add(q);
          Ka(
            a,
            function () {
              c.error(r);
            },
            1
          );
        },
        k = function (r) {
          g.add(r);
          Ka(
            a,
            function () {
              g.size === b.length && c.complete();
            },
            1
          );
        },
        m = b.map(function (r, q) {
          return r.subscribe(
            function (z) {
              return void h(z, q);
            },
            function (z) {
              return void l(z, q);
            },
            function () {
              return void k(q);
            }
          );
        });
      return function () {
        m.forEach(function (r) {
          return void r.unsubscribe();
        });
      };
    });
  }
  function Wi(a, b, c) {
    function d() {
      if (b.Sa) {
        var u = b.Sa,
          H = u.next;
        var I = {
          Yg: c,
          ph: e,
          qh: Object.assign({}, f),
          gh: g,
          errorMessage: h,
          bh: l,
        };
        I = {
          ug: 1,
          vg: 0,
          wg: 0,
          timestamp: Bd(b.l.now(), new Ad(0, b.l.timeline)),
          pc: b.pc,
          messageType: 2,
          Zg: I,
        };
        H.call(u, I);
      }
    }
    for (
      var e = Object.keys(a),
        f = {},
        g = !1,
        h = null,
        l = null,
        k = {},
        m = new Set(),
        r = [],
        q = {},
        z = v(e),
        A = z.next();
      !A.done;
      q = { V: q.V }, A = z.next()
    )
      (q.V = A.value),
        (A = a[q.V]),
        A instanceof Z
          ? ((k[q.V] = A.value), m.add(q.V), (f[String(q.V)] = Dd(A.value)))
          : ((A = A.h(
              U(function (u, H) {
                return Ui(u) || Ui(H) ? !1 : u === H;
              }),
              P(
                (function (u) {
                  return function (H) {
                    f[String(u.V)] = Dd(H);
                    d();
                    var I = {};
                    return (I[u.V] = H), I;
                  };
                })(q)
              ),
              Ed(
                (function (u) {
                  return function (H) {
                    if (H instanceof ud) throw new wd(String(u.V));
                    throw H;
                  };
                })(q)
              ),
              Ie(
                (function (u) {
                  return function () {
                    m.add(u.V);
                  };
                })(q),
                (function (u) {
                  return function (H) {
                    l = String(u.V);
                    h = String(H);
                    d();
                  };
                })(q),
                (function (u) {
                  return function () {
                    m.has(u.V) || ((g = !0), d());
                  };
                })(q)
              )
            )),
            r.push(A));
    (a = 0 < Object.keys(f).length) && d();
    q = Vi(b.i, r).h(
      Ed(function (u) {
        if (u instanceof ud) throw new vd(e[u.Df]);
        throw u;
      }),
      P(function (u) {
        return Object.freeze(
          Object.assign.apply(Object, [{}, k].concat(ea(u)))
        );
      })
    );
    return (r = 0 < r.length) && a
      ? Pc(N(Object.freeze(k)), q)
      : r
      ? q
      : N(Object.freeze(k));
  }
  function Xi(a, b, c, d) {
    var e = Yi(Zi(Yi($i, aj), bj), cj, dj);
    return a.u.Ea.bind(a.u)(733, function () {
      function f() {
        if (a.Sa) {
          var k = a.Sa,
            m = k.next;
          var r = { kh: [].concat(ea(h.values())), fh: l };
          r = {
            ug: 1,
            vg: 0,
            wg: 0,
            timestamp: Bd(a.l.now(), new Ad(0, a.l.timeline)),
            pc: a.pc,
            messageType: 1,
            hh: r,
          };
          m.call(k, r);
        }
      }
      var g = {},
        h = new Set(),
        l = !1;
      try {
        return b
          .h(
            Ed(function (k) {
              d(Object.assign({}, g, { error: k }));
              return Ob;
            }),
            Ie(
              function () {},
              function () {},
              function () {
                l = !0;
                f();
              }
            ),
            Dc(function (k) {
              h.add(k.xb);
              f();
              try {
                var m = c(a, k);
              } catch (q) {
                return (
                  d(
                    Object.assign({}, g, {
                      error: q instanceof Error ? q : String(q),
                    })
                  ),
                  Ob
                );
              }
              var r = {};
              return Wi(m, a, k.xb)
                .h(
                  Ie(function (q) {
                    r = q;
                  }),
                  we(1),
                  Zb()
                )
                .h(
                  e,
                  Ed(function (q) {
                    d(Object.assign({}, r, { error: q }));
                    return Ob;
                  }),
                  ae(void 0),
                  P(function () {
                    h.delete(k.xb) && f();
                    return !0;
                  })
                );
            })
          )
          .h(
            oe(function (k) {
              return k + 1;
            }, 0),
            Ed(function (k) {
              d(Object.assign({}, g, { error: k }));
              return Ob;
            })
          );
      } catch (k) {
        return d(Object.assign({}, g, { error: k })), Ob;
      }
    })();
  }
  var cj = K(
    P(function (a) {
      var b = a.M,
        c = a.Oc,
        d = a.Ed,
        e = a.eb;
      if (void 0 === b || void 0 === c || void 0 === d) return !1;
      if (a.Hf) {
        if (e) {
          a = a.kb;
          if (!a) return !1;
          a({
            eventType: "active-view-begin-to-render",
            eventData: "",
            destination: ["buyer"],
          });
          return !0;
        }
        d(c, a).forEach(function (f) {
          b.ia(f).sendNow();
        });
        return !0;
      }
      return void 0 !== a.Wc ? !0 : !1;
    }),
    Fe(function (a) {
      return !a;
    }),
    ee()
  );
  function ej(a) {
    var b = new Map();
    if ("object" !== typeof a || null === a) return b;
    Object.values(a).forEach(function (c) {
      c &&
        "function" === typeof c.Y &&
        (b.has(c.clock.timeline) || b.set(c.clock.timeline, c.clock.now()));
    });
    return b;
  }
  function fj(a, b) {
    var c = gj,
      d = hj,
      e = ij;
    b = void 0 === b ? 0.01 : b;
    return function (f) {
      0 < b &&
        Math.random() <= b &&
        (a.global.HTMLFencedFrameElement &&
          a.global.fence &&
          "function" === typeof a.global.fence.reportEvent &&
          a.global.fence.reportEvent({
            eventType: "active-view-error",
            eventData: "",
            destination: ["buyer"],
          }),
        (f = Object.assign({}, f, {
          errorMessage:
            f.error instanceof Error && f.error.message
              ? f.error.message
              : String(f.error),
          Yd:
            f.error instanceof Error && f.error.stack
              ? String(f.error.stack)
              : null,
          mf:
            f.error instanceof Error && f.error.name
              ? String(f.error.name)
              : null,
          lf: String(a.u.Ie),
        })),
        d(
          Object.assign({}, f, {
            ta: (function () {
              return function (g) {
                try {
                  return e(Object.assign({}, g));
                } catch (h) {
                  return {};
                }
              };
            })(),
            Fa: [c],
          }),
          ej(f)
        ).forEach(function (g) {
          a.M.ia(g).sendNow();
        }));
    };
  }
  var dj = K(
    P(function (a) {
      var b = a.M,
        c = a.tf;
      if (void 0 === b || void 0 === c) return !1;
      if (void 0 !== a.Wc) return !0;
      if (null === c) return !1;
      for (a = 0; a < c; a++)
        b.ia(
          "https://pagead2.googlesyndication.com/pagead/gen_204?id=av-js&type=extra&rnd=" +
            Math.floor(1e7 * Math.random())
        ).sendNow();
      return !0;
    }),
    Fe(function (a) {
      return !a;
    }),
    ee()
  );
  var ij = function (a) {
    return {
      id: a.rd,
      mcvt: a.Eb,
      p: a.bc,
      asp: a.Ug,
      mtos: a.Fb,
      tos: a.Pb,
      v: a.af,
      bin: a.Ze,
      avms: a.se,
      bs: a.Td,
      mc: a.qe,
      if: a.ff,
      vu: a.hf,
      app: a.Ka,
      mse: a.nd,
      mtop: a.od,
      itpl: a.hd,
      adk: a.Nc,
      exk: a.Wg,
      rs: a.Da,
      la: a.oe,
      cr: a.jd,
      uach: a.Bd,
      vs: a.Dd,
      r: a.sd,
      pay: a.zf,
      rst: a.Ue,
      rpt: a.Te,
      isd: a.Cf,
      lsd: a.Of,
      context: a.lf,
      msg: a.errorMessage,
      stack: a.Yd,
      name: a.mf,
      ec: a.Af,
      sfr: a.xd,
      met: a.vb,
      wmsd: a.Gd,
      pv: a.mh,
      epv: a.ah,
      pbe: a.le,
    };
  };
  function Yi() {
    var a = x.apply(0, arguments);
    return function (b) {
      var c = b.h(we(1), Zb());
      b = a.map(function (d) {
        return c.h(d, ae(!0));
      });
      return S(b).h(Ud(1), ee());
    };
  }
  function Zi() {
    var a = x.apply(0, arguments);
    return function (b) {
      var c = b.h(we(1), Zb());
      b = a.map(function (d) {
        return c.h(d, ae(!0));
      });
      return Pc.apply(null, ea(b)).h(Ud(1), ee());
    };
  }
  var aj = function (a) {
    var b = [];
    return a.h(
      P(function (c) {
        var d = c.M,
          e = c.Pb,
          f = c.Ag,
          g = c.ta,
          h = c.zg,
          l = c.Ac,
          k = c.Qb,
          m = c.Fd,
          r = c.he,
          q = c.le;
        if (
          !c.Zc ||
          !r ||
          void 0 === c.Fb ||
          void 0 === e ||
          void 0 === f ||
          void 0 === g ||
          void 0 === h ||
          void 0 === k ||
          void 0 === d
        )
          return !1;
        if (c.eb) {
          if (void 0 === l) return !1;
          f = c.kb;
          if (!f) return !1;
          f({
            eventType: "active-view-time-on-screen",
            eventData: "",
            destination: ["buyer"],
          });
          return !0;
        }
        if (!q && !l) return !1;
        e = ej(c);
        var z;
        m = null != (z = null == m ? void 0 : m.fa(e).value) ? z : !1;
        c = k(
          Object.assign({}, c, {
            rd: h,
            Dd: m ? 4 : 3,
            sd: null != l ? l : "u",
            ta: g,
            Fa: f,
          }),
          e
        );
        if (q) {
          for (; b.length > f.length; )
            (q = void 0), null == (q = b.shift()) || q.deactivate();
          c.forEach(function (A, u) {
            u >= b.length ? b.push(d.ia(A)) : (b[u].url = A);
          });
          return void 0 !== l;
        }
        return void 0 !== l
          ? (c.forEach(function (A) {
              d.ia(A).sendNow();
            }),
            !0)
          : !1;
      }),
      Fe(function (c) {
        return !c;
      }),
      ee()
    );
  };
  function jj(a) {
    return function (b) {
      return b.h(
        P(function (c) {
          a.Ae || Sa("Assertion on queued Observable output failed");
          return c;
        })
      );
    };
  }
  function kj(a) {
    return function (b) {
      return new L(function (c) {
        var d = !1,
          e = b.h(jj(a)).subscribe(
            function (f) {
              d = !0;
              c.next(f);
            },
            c.error.bind(c),
            c.complete.bind(c)
          );
        Ka(
          a,
          function () {
            d || c.next(null);
          },
          3
        );
        return e;
      });
    };
  }
  function lj(a, b) {
    return function (c) {
      return c.h(
        X(function (d) {
          return new L(function (e) {
            function f() {
              h.disconnect();
              l.unsubscribe();
            }
            var g = a.MutationObserver;
            if (g && void 0 !== d.j) {
              var h = new g(function (k) {
                e.next(k);
              });
              h.observe(d.j, b);
              var l = d.released.subscribe(f);
              return f;
            }
          });
        })
      );
    };
  }
  var mj = {
    Tg: 0,
    Kg: 1,
    Mg: 2,
    Lg: 3,
    0: "UNKNOWN",
    1: "DEFER_MEASUREMENT",
    2: "DO_NOT_DEFER_MEASUREMENT",
    3: "DEFER_MEASUREMENT_AND_PING",
  };
  function nj(a, b) {
    var c = b.h(lj(a, { attributes: !0 }), Y(a.i, 1));
    return S([b, c.h(Y(a.i, 1), kj(a.i))]).h(
      P(function (d) {
        return v(d).next().value;
      }),
      Ji("data-google-av-dm"),
      P(oj)
    );
  }
  function oj(a) {
    return a && a in mj ? Number(a) : 2;
  }
  function pj(a) {
    if (3 === a.Rf) return null;
    if (void 0 !== a.Ac) {
      var b = !1 === a.ef ? "n" : !1 === a.Zc && a.Ac ? a.Ac : null;
      if (null !== b) return b;
    }
    return a.fc instanceof od
      ? "msf"
      : a.Sc instanceof pd
      ? "c"
      : !1 === a.df
      ? "pv"
      : a.fc || a.Sc
      ? "x"
      : null;
  }
  var bj = K(
    P(function (a) {
      var b = pj(a);
      if (null === b) return !1;
      var c = a.M;
      if (
        void 0 === a.kc ||
        void 0 === a.ta ||
        void 0 === a.Qb ||
        void 0 === a.lc ||
        void 0 === c
      )
        return !1;
      if (a.eb) {
        a = a.kb;
        if (!a) return !1;
        a({
          eventType: "active-view-unmeasurable",
          eventData: "",
          destination: ["buyer"],
        });
        return !0;
      }
      var d = void 0;
      if ("x" === b) {
        var e,
          f = null != (e = a.fc) ? e : a.Sc;
        if (f) {
          var g = f.stack;
          d = f.message;
        }
      }
      a.Qb(
        Object.assign({}, a, {
          Fa: a.kc,
          ta: a.ta,
          rd: a.lc,
          Dd: 2,
          sd: b,
          errorMessage: d,
          Yd: g,
        }),
        ej(a)
      ).forEach(function (h) {
        c.ia(h).sendNow();
      });
      return !0;
    }),
    T(function (a) {
      return a;
    }),
    Ud(1),
    ee()
  );
  function qj(a, b) {
    return "string" === typeof a
      ? encodeURIComponent(a)
      : "number" === typeof a
      ? String(a)
      : Array.isArray(a)
      ? a
          .map(function (c) {
            return qj(c, b);
          })
          .join(",")
      : a instanceof Ad
      ? a.toString()
      : a && "function" === typeof a.Y
      ? qj(a.fa(b).value, b)
      : !0 === a
      ? "1"
      : !1 === a
      ? "0"
      : void 0 === a || null === a
      ? null
      : [a.top, a.left, a.top + a.height, a.left + a.width].join();
  }
  function rj(a, b) {
    a = Object.entries(a)
      .map(function (c) {
        var d = v(c);
        c = d.next().value;
        d = d.next().value;
        d = qj(d, b);
        return null === d ? "" : c + "=" + d;
      })
      .filter(function (c) {
        return "" !== c;
      });
    return a.length ? a.join("&") : "";
  }
  function hj(a, b) {
    var c = a.ta(a),
      d = rj(c, b);
    return d
      ? cb(a.Fa, function (e) {
          e = 0 <= e.indexOf("?") ? e : e + "?";
          e = 0 <= "?&".indexOf(e.slice(-1)) ? e : e + "&";
          return e + d;
        })
      : a.Fa;
  }
  function sj(a, b) {
    return cb(a, function (c) {
      if ("string" === typeof b.Bd) {
        var d = "&" + rj({ uach: b.Bd }, new Map());
        return "&adurl=" == c.substring(c.length - 7)
          ? c.substring(0, c.length - 7) + d + "&adurl="
          : c + d;
      }
      return c;
    });
  }
  var $i = K(
    Fe(function (a) {
      return void 0 === a.Wc;
    }),
    P(function (a) {
      return Object.assign({}, a, { Je: ej(a) });
    }),
    T(function (a) {
      var b = a.Fd,
        c = a.Je,
        d;
      return (
        !!a.he && (null != (d = null == b ? void 0 : b.fa(c).value) ? d : !1)
      );
    }),
    P(function (a) {
      var b = a.M;
      if (
        void 0 === a.ta ||
        void 0 === a.kc ||
        void 0 === a.Qb ||
        void 0 === a.lc ||
        void 0 === b
      )
        return !1;
      if (a.eb) {
        a = a.kb;
        if (!a) return !1;
        a({
          eventType: "active-view-viewable",
          eventData: "",
          destination: ["buyer"],
        });
        return !0;
      }
      var c = a.Qb(
          Object.assign({}, a, {
            Fa: a.kc,
            ta: a.ta,
            rd: a.lc,
            Dd: 4,
            sd: "v",
          }),
          a.Je
        ),
        d = a.Tc;
      d &&
        0 < d.length &&
        a.Ed &&
        a.Ed(d, a).forEach(function (e) {
          b.ia(e).sendNow();
        });
      c.forEach(function (e) {
        b.ia(e).sendNow();
      });
      return !0;
    }),
    Fe(function (a) {
      return !a;
    }),
    ee()
  );
  function tj(a, b, c) {
    c =
      void 0 === c
        ? function (d, e) {
            return d === e;
          }
        : c;
    return a.timestamp.equals(b.timestamp) && c(a.value, b.value);
  }
  var uj = function (a, b) {
    this.a = a;
    this.b = b;
    if (a.clock.timeline !== b.clock.timeline) throw Error();
  };
  uj.prototype.X = function (a) {
    return a instanceof uj ? this.a.X(a.a) && this.b.X(a.b) : !1;
  };
  uj.prototype.ea = function (a) {
    var b = this.a.ea(a).value,
      c = this.b.ea(a).value;
    return { timestamp: a, value: [b, c] };
  };
  p.Object.defineProperties(uj.prototype, {
    active: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a.active || this.b.active;
      },
    },
    clock: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a.clock;
      },
    },
    D: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        var a = this.a.D.timestamp.maximum(this.b.D.timestamp),
          b = this.a.D.timestamp.equals(a)
            ? this.a.D.value
            : this.a.ea(a).value,
          c = this.b.D.timestamp.equals(a)
            ? this.b.D.value
            : this.b.ea(a).value;
        return { timestamp: a, value: [b, c] };
      },
    },
  });
  var vj = function (a, b) {
    this.input = a;
    this.sc = b;
    this.D = {
      timestamp: this.input.D.timestamp,
      value: this.sc(this.input.D.value),
    };
  };
  vj.prototype.X = function (a) {
    return a instanceof vj ? this.input.X(a.input) && this.sc === a.sc : !1;
  };
  vj.prototype.ea = function (a) {
    a = this.input.ea(a);
    return { timestamp: a.timestamp, value: this.sc(a.value) };
  };
  p.Object.defineProperties(vj.prototype, {
    active: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.input.active;
      },
    },
    clock: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.input.clock;
      },
    },
  });
  var wj = function (a, b, c) {
    this.clock = a;
    this.D = b;
    this.active = c;
  };
  wj.prototype.X = function (a) {
    return a instanceof wj
      ? this.active === a.active &&
          this.clock.timeline === a.clock.timeline &&
          tj(this.D, a.D)
      : !1;
  };
  wj.prototype.ea = function (a) {
    return {
      timestamp: a,
      value: this.D.value + (this.active ? Bd(a, this.D.timestamp) : 0),
    };
  };
  var xj = function () {};
  xj.prototype.Y = function () {
    return this.ea(this.clock.now());
  };
  xj.prototype.fa = function (a) {
    var b;
    a = null != (b = a.get(this.clock.timeline)) ? b : this.clock.now();
    return this.ea(a);
  };
  xj.prototype.map = function (a) {
    return new yj(this, a);
  };
  xj.prototype.ha = function (a) {
    return new zj(this, a);
  };
  var zj = function () {
    uj.apply(this, arguments);
    this.map = xj.prototype.map;
    this.ha = xj.prototype.ha;
    this.Y = xj.prototype.Y;
    this.fa = xj.prototype.fa;
  };
  w(zj, uj);
  var Aj = function () {
    wj.apply(this, arguments);
    this.map = xj.prototype.map;
    this.ha = xj.prototype.ha;
    this.Y = xj.prototype.Y;
    this.fa = xj.prototype.fa;
  };
  w(Aj, wj);
  var yj = function () {
    vj.apply(this, arguments);
    this.map = xj.prototype.map;
    this.ha = xj.prototype.ha;
    this.Y = xj.prototype.Y;
    this.fa = xj.prototype.fa;
  };
  w(yj, vj);
  var Bj = function (a, b) {
    this.D = b;
    this.Y = xj.prototype.Y;
    this.fa = xj.prototype.fa;
    this.map = xj.prototype.map;
    this.ha = xj.prototype.ha;
    this.clock = a;
  };
  Bj.prototype.X = function (a) {
    return a.active;
  };
  Bj.prototype.ea = function () {
    return this.D;
  };
  p.Object.defineProperties(Bj.prototype, {
    active: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return !1;
      },
    },
  });
  function Cj(a) {
    return K(
      P(function (b) {
        var c;
        return null != (c = null == b ? void 0 : Dj(b, a)) ? c : !1;
      }),
      P(function (b) {
        return b ? !0 : null;
      })
    );
  }
  function Ej() {
    var a = Fj;
    return K(
      P(function (b) {
        var c;
        return null != (c = null == b ? void 0 : Dj(b, a)) ? c : !1;
      }),
      P(function (b) {
        return "number" === typeof b ? b : null;
      })
    );
  }
  function Gj(a) {
    var b = Math.pow(10, 2);
    return Math.round(a * b) / b;
  }
  function Hj(a, b, c, d) {
    var e = Object.keys(c).map(function (h) {
        return h;
      }),
      f = e.filter(function (h) {
        var l = c[h];
        h = d[h];
        return l instanceof Z && h instanceof Z && l.value === h.value;
      }),
      g = f.reduce(function (h, l) {
        var k = {};
        return Object.assign({}, h, ((k[l] = c[l]), k));
      }, {});
    return e.reduce(function (h, l) {
      if (0 <= f.indexOf(l)) return h;
      var k = {};
      return Object.assign(
        {},
        h,
        ((k[l] = b.h(
          X(function (m) {
            return (m = m ? c[l] : d[l]) &&
              (m instanceof L ||
                ("function" === typeof m.fb &&
                  "function" === typeof m.subscribe))
              ? m
              : m.ca(a);
          })
        )),
        k)
      );
    }, g);
  }
  function Ij(a) {
    return K(
      P(function () {
        return !0;
      }),
      W(!1),
      Y(a, 1)
    );
  }
  function Jj(a) {
    return 0 >= a.length
      ? Ob
      : S(
          a.map(function (b) {
            var c = 0;
            return b.h(
              P(function (d) {
                return { index: c++, value: d };
              })
            );
          })
        ).h(
          T(function (b) {
            return b.every(function (c) {
              return c.index === b[0].index;
            });
          }),
          P(function (b) {
            return b.map(function (c) {
              return c.value;
            });
          })
        );
  }
  function Kj(a, b) {
    a.xa && (a.Ua = a.xa);
    a.xa = b;
    a.Ua && a.Ua.value
      ? ((b = Math.max(0, Bd(b.timestamp, a.Ua.timestamp))),
        (a.totalTime += b),
        (a.da += b))
      : (a.da = 0);
    return a;
  }
  function Lj() {
    return K(
      oe(Kj, { totalTime: 0, da: 0 }),
      P(function (a) {
        return a.totalTime;
      })
    );
  }
  function Mj() {
    return K(
      oe(Kj, { totalTime: 0, da: 0 }),
      P(function (a) {
        return a.da;
      })
    );
  }
  function Nj(a, b) {
    return K(
      Ji("data-google-av-metadata"),
      P(function (c) {
        if (null === c) return b(void 0);
        c = c
          .split("&")
          .map(function (d) {
            return d.split("=");
          })
          .filter(function (d) {
            return d[0] === a;
          });
        if (0 === c.length) return b(void 0);
        c = c[0].slice(1).join("=");
        return b(c);
      })
    );
  }
  var Oj = { Ig: "asmreq", Jg: "asmres" };
  var Pj = function (a) {
    Kg.call(this, a);
  };
  w(Pj, Kg);
  Pj.prototype.Ce = function (a) {
    lg(this, 1, a);
  };
  var Qj = function (a) {
    Kg.call(this, a);
  };
  w(Qj, Kg);
  Qj.prototype.Ce = function (a) {
    lg(this, 1, a);
  };
  var qg = function (a) {
    Kg.call(this, a);
  };
  w(qg, Kg);
  function Rj(a, b) {
    var c = void 0 === c ? zi(a) : c;
    var d = new MessageChannel();
    b = b.h(
      P(function (f) {
        return Number(f);
      }),
      T(function (f) {
        return !isNaN(f) && 0 !== f;
      }),
      Ie(function (f) {
        var g = new Pj();
        g.Ce(f);
        f = { type: "asmreq", payload: g.nb() };
        c.postMessage(f, "*", [d.port2]);
      }),
      Ud(1)
    );
    var e = Ai(a, d.port1).h(
      T(function (f) {
        return "object" === typeof f.data;
      }),
      P(function (f) {
        var g = f.data,
          h = Object.values(Oj).includes(g.type);
        g = "string" === typeof g.payload;
        if (!h || !g || "asmres" !== f.data.type) return null;
        try {
          var l = f.data.payload;
          Wa(Qj);
          if (null == l || "" == l) var k = ab(new Qj(), Cg);
          else {
            Ua(l);
            var m = JSON.parse(l);
            if (!Array.isArray(m)) throw Error("N`" + Da(m) + "`" + m);
            k = bg(Qj, Nf(m));
          }
          return k;
        } catch (r) {
          return null;
        }
      }),
      T(function (f) {
        return null !== f;
      }),
      P(function (f) {
        return f;
      })
    );
    return b.h(
      X(function (f) {
        return N(f).h(Gd(e));
      }),
      T(function (f) {
        var g = v(f);
        f = g.next().value;
        g = g.next().value;
        return null != jg(g, 1, !1) ? ug(jg(g, 1), 0) === f : !1;
      }),
      P(function (f) {
        f = v(f);
        f.next();
        return f.next().value;
      }),
      Fh(a.i)
    );
  }
  function Sj(a, b, c) {
    var d = b.Db.h(
      Ud(1),
      X(function () {
        return Rj(a, c);
      }),
      T(function (f) {
        var g = jg(f, 2);
        return (
          ug(null == g ? g : !!g, !1) &&
          void 0 !== pg(f, qg, !1) &&
          null != jg(f, 4, !1) &&
          null != jg(f, 5, !1)
        );
      }),
      Ud(1),
      Fh(a.i)
    );
    b = d.h(
      P(function (f) {
        return { x: vg(sg(f), 2), y: vg(sg(f), 1) };
      }),
      U(function (f, g) {
        return f.x === g.x && f.y === g.y;
      }),
      Y(a.i, 1)
    );
    var e = d.h(
      P(function (f) {
        return vg(f, 4);
      }),
      Y(a.i, 1)
    );
    d = d.h(
      P(function (f) {
        return vg(f, 5);
      }),
      Y(a.i, 1)
    );
    return { Cf: e, We: b, Of: d };
  }
  function Tj(a, b) {
    return b.Db.h(
      Ud(1),
      P(function () {
        return a.l.now().round();
      })
    );
  }
  var Uj = P(function (a) {
    return [a.value.I.width, a.value.I.height];
  });
  function Vj(a, b) {
    return function (c) {
      return Jj(
        b.map(function (d) {
          return c.h(a(d));
        })
      );
    };
  }
  function Wj() {
    var a;
    return K(
      Ie(function (b) {
        return void (a = b.timestamp);
      }),
      Mj(),
      P(function (b) {
        return { timestamp: a, value: Math.round(b) };
      })
    );
  }
  var Xj = {
    P: "ns",
    S: bi,
    I: bi,
    N: new M(),
    J: "ns",
    F: bi,
    L: bi,
    U: { x: 0, y: 0 },
  };
  function Yj(a, b) {
    return (
      ci(a.I, b.I) &&
      ci(a.F, b.F) &&
      ci(a.S, b.S) &&
      ci(a.L, b.L) &&
      a.J === b.J &&
      a.N === b.N &&
      a.P === b.P &&
      a.U.x === b.U.x &&
      a.U.y === b.U.y
    );
  }
  var Zj = function (a) {
    try {
      return a.getBoundingClientRect();
    } catch (b) {
      return { left: 0, top: 0, right: 0, bottom: 0 };
    }
  };
  function ak(a, b) {
    return function (c) {
      return function (d) {
        var e = d.h(re(new M()), Zb());
        d = c.element.h(U());
        e = e.h(
          P(function (f) {
            return f.value;
          })
        );
        return S([d, e, b]).h(
          P(function (f) {
            var g = v(f);
            f = g.next().value;
            var h = g.next().value;
            g = g.next().value;
            if (void 0 === f.j)
              var l = { top: 0, left: 0, width: 0, height: 0 };
            else {
              l = f.j.getBoundingClientRect();
              var k = f.j,
                m = a.global,
                r = new Lg(0, 0);
              var q = (q = Og(k)) ? q.parentWindow || q.defaultView : window;
              if (df(q, "parent")) {
                do {
                  if (q == m) {
                    var z = k,
                      A = Og(z);
                    Xa(z, "Parameter is required");
                    var u = new Lg(0, 0);
                    var H = A ? Og(A) : document;
                    H =
                      !ff ||
                      9 <= Number(tf) ||
                      "CSS1Compat" == Pg(H).bb.compatMode
                        ? H.documentElement
                        : H.body;
                    z != H &&
                      ((z = Zj(z)),
                      (A = Qg(Pg(A).bb)),
                      (u.x = z.left + A.x),
                      (u.y = z.top + A.y));
                  } else (u = C(k)), (u = Zj(u)), (u = new Lg(u.left, u.top));
                  r.x += u.x;
                  r.y += u.y;
                } while (
                  q &&
                  q != m &&
                  q != q.parent &&
                  (k = q.frameElement) &&
                  (q = q.parent)
                );
              }
              l = { top: r.y, left: r.x, width: l.width, height: l.height };
            }
            l = ei(l, h.U);
            m = di(l, h.S);
            r = a.l.now();
            q = Object;
            k = q.assign;
            if (2 !== g || a.cb || 0 >= m.width || 0 >= m.height) var I = !1;
            else
              try {
                var V = a.document.elementFromPoint(
                  m.left + m.width / 2,
                  m.top + m.height / 2
                );
                I = V ? !bk(V, f) : !1;
              } catch (ta) {
                I = !1;
              }
            return {
              timestamp: r,
              value: k.call(q, {}, h, { J: "geo", L: I ? Xj.L : m, F: l }),
            };
          }),
          Fh(a.i)
        );
      };
    };
  }
  function bk(a, b, c) {
    c = void 0 === c ? 0 : c;
    return void 0 === a.j || void 0 === b.j
      ? !1
      : a.j === b.j ||
        Sg(b.j, function (d) {
          return d === a.j;
        })
      ? !0
      : b.j.ownerDocument &&
        b.j.ownerDocument.defaultView &&
        b.j.ownerDocument.defaultView === b.j.ownerDocument.defaultView.top
      ? !1
      : 10 > c &&
        b.j.ownerDocument &&
        b.j.ownerDocument.defaultView &&
        b.j.ownerDocument.defaultView.frameElement
      ? bk(a, new Lh(b.j.ownerDocument.defaultView.frameElement), c + 1)
      : !0;
  }
  function ck(a) {
    return function (b) {
      return b.h(a.ResizeObserver ? dk(a) : ek(a), we(1), Zb());
    };
  }
  function dk(a) {
    return function (b) {
      return b.h(
        X(function (c) {
          var d = a.ResizeObserver;
          if (!d || void 0 === c.j) return N(Xj.F);
          var e = new L(function (f) {
            function g() {
              void 0 !== c.j && h.unobserve(c.j);
              h.disconnect();
              l.unsubscribe();
            }
            if (void 0 === c.j) return f.complete(), function () {};
            var h = new d(function (k) {
              k.forEach(function (m) {
                f.next(m);
              });
            });
            h.observe(c.j);
            var l = c.released.subscribe(g);
            return g;
          }).h(
            ph(a.u, 736),
            P(function (f) {
              return f.contentRect;
            })
          );
          return Pc(N(c.j.getBoundingClientRect()), e);
        }),
        U(ci)
      );
    };
  }
  function ek(a) {
    return function (b) {
      var c = b.h(
          lj(a, {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0,
          })
        ),
        d = a.gg;
      c = Pc(
        b.h(
          P(function () {
            return Kh("resize");
          })
        ),
        c,
        d
      );
      return S(b, c).h(
        ph(a.u, 737),
        P(function (e) {
          e = v(e).next().value;
          return void 0 === e.j ? void 0 : e.j.getBoundingClientRect();
        }),
        Ri(),
        U(ci)
      );
    };
  }
  function fk(a, b) {
    var c = gk(a, b).h(we(1), Zb());
    return function (d) {
      d = d.h(
        X(function (e) {
          return e.element;
        }),
        U()
      );
      return S([c, d]).h(
        X(function (e) {
          var f = v(e);
          e = f.next().value;
          f = f.next().value;
          return hk(a, e.Ff, ck(a), e.bg, e.uf, f);
        }),
        Fh(a.i)
      );
    };
  }
  function ik(a, b) {
    var c = fk(a, b);
    return function (d) {
      var e = c(N(d));
      return function (f) {
        return S([f, e]).h(
          P(function (g) {
            var h = v(g);
            g = h.next().value;
            h = h.next().value;
            var l = ei(h.value.F, g.value.U),
              k = di(ei(h.value.L, g.value.U), g.value.S);
            return {
              timestamp: g.timestamp.maximum(h.timestamp),
              value: Object.assign({}, g.value, { J: "nio", L: k, F: l }),
            };
          })
        );
      };
    };
  }
  function jk(a) {
    return P(function (b) {
      return "nio" !== b.value.P
        ? b
        : Object.assign({}, b, {
            value: Object.assign({}, b.value, { S: Bi(a, !0), I: Bi(a, !0) }),
          });
    });
  }
  function kk(a, b) {
    return N(b).h(
      a,
      P(function () {
        return b;
      })
    );
  }
  function gk(a, b) {
    return a.l.timeline !== yd
      ? Tb(new od(2))
      : a.MutationObserver
      ? "undefined" === typeof IntersectionObserver
        ? Tb(new od(0))
        : new L(function (c) {
            var d = new M(),
              e = new IntersectionObserver(d.next.bind(d), {
                threshold: [].concat(ea(b)),
              });
            c.next({
              bg: d.h(ph(a.u, 735)),
              Ff: e,
              uf: function () {
                var f = e.takeRecords();
                0 < f.length && d.next(f);
              },
            });
          }).h(Ud(1), we(1), Zb())
      : Tb(new od(1));
  }
  function lk(a) {
    return Ac(
      a.sort(function (b, c) {
        return b.time - c.time;
      })
    );
  }
  function hk(a, b, c, d, e, f) {
    return new L(function (g) {
      function h() {
        z ||
          ((z = !0),
          void 0 !== f.j && b.unobserve(f.j),
          k.unsubscribe(),
          q.unsubscribe(),
          r.unsubscribe(),
          A.unsubscribe());
      }
      if (void 0 !== f.j) {
        b.observe(f.j);
        var l = new Nb({
            timestamp: a.l.now(),
            value: Object.assign({}, Xj, { P: "nio", J: "nio" }),
          }),
          k = d
            .h(
              Dc(function (u) {
                return lk(u);
              }),
              T(function (u) {
                return u.target === f.j;
              }),
              P(function (u) {
                return {
                  timestamp: new Ad(u.time, yd),
                  value: {
                    P: "nio",
                    S: u.rootBounds || bi,
                    I: u.rootBounds || Bi(a, !0),
                    N: m,
                    J: "nio",
                    L: u.intersectionRect,
                    F: u.boundingClientRect,
                    U: { x: 0, y: 0 },
                  },
                };
              }),
              re(l),
              Zb()
            )
            .subscribe(g),
          m = new M(),
          r = m.subscribe(function () {
            e();
            g.next({ timestamp: a.l.now(), value: l.value.value });
            void 0 !== f.j && (b.unobserve(f.j), b.observe(f.j));
          }),
          q = kk(c, f).subscribe(function () {
            m.next();
          }),
          z = !1,
          A = f.released.subscribe(function () {
            return h();
          });
        return h;
      }
    });
  }
  function mk(a, b) {
    var c = a.cd().h(
      P(function () {
        return "b";
      })
    );
    return Uc(b, c).h(Ud(1), Y(a.i, 1));
  }
  function nk(a) {
    return function (b) {
      var c;
      return b.h(
        Ie(function (d) {
          return void (c = d.timestamp);
        }),
        P(function (d) {
          return d.value;
        }),
        a,
        P(function (d) {
          return { timestamp: c, value: d };
        })
      );
    };
  }
  var ok = function (a) {
      return (a.L.width * a.L.height) / (a.F.width * a.F.height);
    },
    pk = nk(
      K(
        P(function (a) {
          var b;
          return null != (b = a.dc) ? b : ok(a);
        }),
        P(function (a) {
          return isFinite(a) ? a : 0;
        })
      )
    ),
    qk = nk(
      K(
        P(function (a) {
          var b;
          return null != (b = a.dc) ? b : ok(a);
        }),
        P(function (a) {
          return isFinite(a) ? a : -1;
        })
      )
    );
  function rk(a, b) {
    a.xa && (a.Ua = a.xa);
    a.xa = b;
    a.Ua && a.Ua.value
      ? ((b = Math.max(0, Bd(b.timestamp, a.Ua.timestamp))),
        (a.totalTime += b),
        (a.da += b))
      : (a.da = 0);
    return a;
  }
  function sk(a) {
    return K(
      oe(rk, { totalTime: 0, da: 0 }),
      P(function (b) {
        return new Aj(
          a,
          { timestamp: b.xa.timestamp, value: b.totalTime },
          b.xa.value
        );
      })
    );
  }
  function tk(a) {
    return K(
      oe(rk, { totalTime: 0, da: 0 }),
      P(function (b) {
        return new Aj(
          a,
          { timestamp: b.xa.timestamp, value: b.da },
          b.xa.value
        );
      })
    );
  }
  function uk(a) {
    return K(
      tk(a),
      P(function (b) {
        return b.map(function (c) {
          return Math.round(c);
        });
      })
    );
  }
  function vk(a, b) {
    return b.h(
      P(function (c) {
        return new Bj(a.l, { timestamp: a.l.now(), value: c });
      })
    );
  }
  function wk(a, b) {
    return 1 <= a ? !0 : 0 >= a ? !1 : a >= b;
  }
  function xk(a) {
    return function (b) {
      return b.h(
        Le(a),
        P(function (c) {
          var d = v(c);
          c = d.next().value;
          d = d.next().value;
          return { timestamp: c.timestamp, value: wk(c.value, d) };
        })
      );
    };
  }
  var yk = P(function (a) {
    if ("omid" === a.value.P) {
      if ("nio" === a.value.J) return "omio";
      if ("geo" === a.value.J) return "omgeo";
    }
    return "geo" === a.value.J || "nio" === a.value.J ? a.value.P : a.value.J;
  });
  function zk() {
    return K(
      T(function (a, b) {
        return 0 < b;
      }),
      Ak,
      W(-1),
      U()
    );
  }
  var Ak = K(
    T(function (a) {
      return !isNaN(a);
    }),
    oe(function (a, b) {
      return isNaN(a) ? b : Math.min(a, b);
    }, NaN),
    U()
  );
  var Bk = nk(
    K(
      P(function (a) {
        return (a.L.width * a.L.height) / (a.S.width * a.S.height);
      }),
      P(function (a) {
        return isFinite(a) ? Math.min(1, a) : 0;
      })
    )
  );
  function Ck(a, b, c) {
    return a
      ? S([b, c]).h(
          T(function (d) {
            var e = v(d);
            d = e.next().value;
            e = e.next().value;
            return d.timestamp.equals(e.timestamp);
          }),
          P(function (d) {
            var e = v(d);
            d = e.next().value;
            e = e.next().value;
            return d.value > e.value ? d : e;
          })
        )
      : b;
  }
  function Dk(a) {
    return function (b) {
      var c = b.h(pk),
        d = b.h(Bk);
      return a instanceof L
        ? a.h(
            X(function (e) {
              return Ck(e, c, d);
            })
          )
        : Ck(a.value, c, d);
    };
  }
  var Ek = K(
    nk(
      P(function (a) {
        a = a.dc
          ? (a.dc * a.F.width * a.F.height) / (a.I.width * a.I.height)
          : (a.L.width * a.L.height) / (a.I.width * a.I.height);
        return isFinite(a) ? a : 0;
      })
    )
  );
  function Fk(a, b, c, d) {
    var e = d.hc,
      f = d.Yc,
      g = d.Ke,
      h = d.Qd,
      l = d.ld,
      k = d.re;
    d = d.jc;
    b = Gk(a, c, b);
    c = Hk(a, c);
    var m = Ik(a, e, k, b),
      r = m.h(
        P(function (y) {
          return y.value;
        }),
        U(),
        Y(a, 1),
        oe(function (y, F) {
          return Math.max(y, F);
        }, 0)
      ),
      q = m.h(
        P(function (y) {
          return y.value;
        }),
        zk(),
        Y(a, 1)
      ),
      z = b.h(
        qk,
        P(function (y) {
          return y.value;
        }),
        Ud(2),
        U(),
        Y(a, 1)
      );
    g = Jk(a, b, g, h);
    var A = g.h(
      W(!1),
      U(),
      P(function (y) {
        return y ? l : f;
      })
    );
    h = m.h(xk(A), U(), Y(a, 1));
    var u = S([h, b]).h(
      T(function (y) {
        var F = v(y);
        y = F.next().value;
        F = F.next().value;
        return y.timestamp.equals(F.timestamp);
      }),
      P(function (y) {
        var F = v(y);
        y = F.next().value;
        F = F.next().value;
        return { visible: y.value, geometry: F.value.F };
      }),
      oe(
        function (y, F) {
          return !F.visible && y.visible ? y : F;
        },
        { visible: !1, geometry: bi }
      ),
      P(function (y) {
        return y.geometry;
      }),
      W(bi),
      Y(a, 1),
      U(ci)
    );
    k = k instanceof L ? k.h(U(), le()) : Rc;
    A = S([k, A]).h(le());
    var H = b.h(
        T(function (y) {
          return "ns" !== y.value.P && "ns" !== y.value.J;
        }),
        oe(function (y) {
          return y + 1;
        }, 0),
        W(0),
        Y(a, 1)
      ),
      I = c.h(le(!0), W(!1), Y(a, 1));
    I = S([d, I]).h(
      P(function (y) {
        var F = v(y);
        y = F.next().value;
        F = F.next().value;
        return y && !F;
      }),
      Y(a, 1)
    );
    var V = b.h(Ek, U()),
      ta = V.h(
        P(function (y) {
          return y.value;
        }),
        oe(function (y, F) {
          return Math.max(y, F);
        }, 0),
        U(),
        Y(a, 1)
      ),
      B = V.h(
        P(function (y) {
          return y.value;
        }),
        zk(),
        Y(a, 1)
      );
    return {
      wd: k,
      Mb: A,
      ya: {
        kg: b,
        se: b.h(yk),
        bc: u.h(U(ci)),
        visible: h.h(U(tj)),
        zd: m.h(U(tj)),
        qe: r,
        Vf: q,
        Td: b.h(Uj, U(gb)),
        Cg: V,
        Qf: ta,
        Uf: B,
        fc: c,
        N: new Z(new M()).ca(a),
        oe: g,
        hc: e,
        jc: d,
        Zc: I,
        Dg: H,
        Nf: z,
      },
    };
  }
  function Hk(a, b) {
    return b.h(
      T(function () {
        return !1;
      }),
      P(function (c) {
        return c;
      }),
      Ed(function (c) {
        return new Z(c).ca(a);
      })
    );
  }
  function Gk(a, b, c) {
    return b.h(se(Rc), Y(a, 1)).h(
      U(function (d, e) {
        return tj(d, e, Yj);
      }),
      W({ timestamp: c.now(), value: Xj }),
      Y(a, 1)
    );
  }
  function Ik(a, b, c, d) {
    c = d.h(
      Dk(c),
      nk(
        P(function (e) {
          return Gj(e);
        })
      ),
      Y(a, 1)
    );
    return b instanceof Z
      ? c
      : S([c, b]).h(
          P(function (e) {
            var f = v(e);
            e = f.next().value;
            f = f.next().value;
            return {
              timestamp: f.timestamp.maximum(e.timestamp),
              value: f.value ? 0 : e.value,
            };
          }),
          U(tj),
          Y(a, 1)
        );
  }
  function Jk(a, b, c, d) {
    b = [
      b.h(
        P(function (e) {
          return 242500 <= e.value.F.width * e.value.F.height;
        })
      ),
    ];
    c instanceof L &&
      b.push(
        c.h(
          P(function (e) {
            return !!e;
          })
        )
      );
    c = S(b);
    return d
      ? c.h(
          P(function (e) {
            return e.some(function (f) {
              return f;
            });
          }),
          W(!1),
          U(),
          Y(a, 1)
        )
      : new Z(!1).ca(a);
  }
  var Kk = function (a) {
      this.l = a;
      this.Bc = null;
      this.timeout = new M();
    },
    Mk = function (a, b) {
      Lk(a);
      a.Bc = a.l.setTimeout(function () {
        return void a.timeout.next();
      }, b);
    },
    Lk = function (a) {
      null !== a.Bc && (a.l.clearTimeout(a.Bc), (a.Bc = null));
    };
  function Nk(a, b, c, d) {
    var e = Ok.He,
      f = new Kk(b);
    c = c
      .h(
        W(void 0),
        X(function () {
          Lk(f);
          return d;
        })
      )
      .h(
        P(function (g) {
          Lk(f);
          var h = g.D,
            l = g.active;
          h.value >= e ||
            !l ||
            ((l = b.now()),
            (l = Math.max(0, Bd(l, h.timestamp))),
            Mk(f, Math.max(0, e - h.value - l)));
          return g.map(function (k) {
            return k >= e;
          });
        })
      );
    return S([c, Pc(f.timeout, N(void 0))]).h(
      P(function (g) {
        return v(g).next().value;
      }),
      Fe(function (g) {
        return !g.Y().value;
      }, !0),
      Y(a, 1)
    );
  }
  function Pk(a) {
    var b = new Aj(a, { timestamp: a.now(), value: 0 }, !1);
    return K(
      tk(a),
      oe(function (c, d) {
        return c.D.value > d.D.value ? new Aj(a, c.D, !1) : d;
      }, b),
      P(function (c) {
        return c.map(function (d) {
          return Math.round(d);
        });
      })
    );
  }
  function Qk(a) {
    return function (b) {
      return K(xk(N(b)), Pk(a));
    };
  }
  function Rk(a) {
    return function (b) {
      return K(
        nk(
          P(function (c) {
            return wk(c, b);
          })
        ),
        sk(a),
        P(function (c) {
          return c.map(function (d) {
            return Math.round(d);
          });
        })
      );
    };
  }
  function Sk(a) {
    return a
      .map(function (b) {
        return b.map(function (c) {
          return [c];
        });
      })
      .reduce(function (b, c) {
        return b.ha(c).map(function (d) {
          return d.flat();
        });
      });
  }
  function Tk(a, b) {
    return a.ha(b).map(function (c) {
      var d = v(c);
      c = d.next().value;
      d = d.next().value;
      return c - d;
    });
  }
  function Uk(a, b, c, d, e, f) {
    var g = Vk;
    if (1 < g.length)
      for (var h = 0; h < g.length - 1; h++) if (g[h] < g[h + 1]) throw Error();
    h = f.h(
      W(void 0),
      X(function () {
        return d.h(uk(a));
      }),
      U(function (l, k) {
        return l.X(k);
      }),
      Y(b, 1)
    );
    f = f.h(
      W(void 0),
      X(function () {
        return d.h(Pk(a));
      }),
      U(function (l, k) {
        return l.X(k);
      }),
      Y(b, 1)
    );
    return {
      Fb: e.h(
        W(void 0),
        X(function () {
          return c.h(Vj(Qk(a), g));
        }),
        P(Sk),
        U(function (l, k) {
          return l.X(k);
        }),
        Y(b, 1)
      ),
      Pb: e.h(
        W(void 0),
        X(function () {
          return c.h(
            Vj(Rk(a), g),
            P(function (l) {
              return l.map(function (k, m) {
                return 0 < m ? Tk(k, l[m - 1]) : k;
              });
            })
          );
        }),
        P(Sk),
        U(function (l, k) {
          return l.X(k);
        }),
        Y(b, 1)
      ),
      Eb: f,
      Ra: h.h(
        U(function (l, k) {
          return l.X(k);
        }),
        Y(b, 1)
      ),
    };
  }
  function Wk(a) {
    var b;
    if ((b = Xk(a)))
      b =
        !Yk(a, "abgcp") &&
        !Yk(a, "abgc") &&
        !("string" === typeof a.id && "abgb" === a.id) &&
        !("string" === typeof a.id && "mys-abgc" === a.id) &&
        !Yk(a, "cbb");
    return b;
  }
  function Yk(a, b) {
    return a.classList
      ? a.classList.contains(b)
      : -1 < (" " + a.className + " ").indexOf(" " + b + " ");
  }
  function Xk(a) {
    try {
      var b = a.getBoundingClientRect();
      return b && 30 <= b.height && 30 <= b.width;
    } catch (c) {
      return !1;
    }
  }
  function Zk(a, b) {
    if (void 0 === a.j || !a.j.children) return a;
    for (var c = fb(a.j.children); c.length; ) {
      var d = b ? c.filter(Wk) : c.filter(Xk);
      if (1 === d.length) return new Lh(d[0]);
      if (1 < d.length) break;
      c = ib(c, function (e) {
        return fb(e.children);
      });
    }
    return a;
  }
  function $k(a, b, c, d, e) {
    if (c) return { ac: b, Va: N(null) };
    c = b.element.h(
      P(function (f) {
        a: if (void 0 === f.j || Xk(f.j)) f = { tc: f, Va: "mue" };
        else {
          var g = Zk(f, e);
          if (void 0 !== g.j && Xk(g.j)) f = { tc: g, Va: "ie" };
          else {
            if (d || a.fd)
              if (
                (g = a.document.querySelector(
                  ".GoogleActiveViewInnerContainer"
                ))
              ) {
                f = { tc: new Lh(g), Va: "ce" };
                break a;
              }
            f = { tc: f, Va: "mue" };
          }
        }
        return f;
      }),
      ze()
    );
    return {
      ac: {
        xb: b.xb,
        element: c.h(
          P(function (f) {
            return f.tc;
          })
        ),
      },
      Va: c.h(
        P(function (f) {
          return f.Va;
        })
      ),
    };
  }
  function al(a, b, c, d) {
    var e = d.hc,
      f = d.Yc,
      g = d.Ke,
      h = d.Qd,
      l = d.ld,
      k = d.re;
    d = d.jc;
    b = bl(a, c, b);
    c = cl(a, c);
    var m = dl(a, e, k, b),
      r = m.h(
        P(function (B) {
          return B.value;
        }),
        U(),
        Y(a, 1),
        oe(function (B, y) {
          return Math.max(B, y);
        }, 0)
      ),
      q = m.h(
        P(function (B) {
          return B.value;
        }),
        zk(),
        Y(a, 1)
      ),
      z = b.h(
        qk,
        P(function (B) {
          return B.value;
        }),
        Ud(2),
        U(),
        Y(a, 1)
      );
    g = el(a, b, g, h);
    var A = g.h(
      W(!1),
      U(),
      P(function (B) {
        return B ? l : f;
      })
    );
    h = m.h(xk(A), U(), Y(a, 1));
    var u = S([h, b]).h(
      T(function (B) {
        var y = v(B);
        B = y.next().value;
        y = y.next().value;
        return B.timestamp.equals(y.timestamp);
      }),
      P(function (B) {
        var y = v(B);
        B = y.next().value;
        y = y.next().value;
        return { visible: B.value, geometry: y.value.F };
      }),
      oe(
        function (B, y) {
          return !y.visible && B.visible ? B : y;
        },
        { visible: !1, geometry: bi }
      ),
      P(function (B) {
        return B.geometry;
      }),
      W(bi),
      Y(a, 1),
      U(ci)
    );
    k = k instanceof L ? k.h(U(), le()) : Rc;
    A = S([k, A]).h(le());
    var H = b.h(
        T(function (B) {
          return "ns" !== B.value.P && "ns" !== B.value.J;
        }),
        oe(function (B) {
          return B + 1;
        }, 0),
        W(0),
        Y(a, 1)
      ),
      I = c.h(le(!0), W(!1), Y(a, 1));
    I = S([d, I]).h(
      P(function (B) {
        var y = v(B);
        B = y.next().value;
        y = y.next().value;
        return B && !y;
      }),
      Y(a, 1)
    );
    var V = b.h(Ek, U()),
      ta = V.h(
        P(function (B) {
          return B.value;
        }),
        oe(function (B, y) {
          return Math.max(B, y);
        }, 0),
        U(),
        Y(a, 1)
      );
    a = V.h(
      P(function (B) {
        return B.value;
      }),
      zk(),
      Y(a, 1)
    );
    return {
      wd: k,
      Mb: A,
      ya: {
        kg: b,
        se: b.h(yk),
        bc: u.h(U(ci)),
        visible: h.h(U(tj)),
        zd: m.h(U(tj)),
        qe: r,
        Vf: q,
        Td: b.h(Uj, U(gb)),
        Cg: V,
        Qf: ta,
        Uf: a,
        fc: c,
        N: b.h(
          P(function (B) {
            return B.value.N;
          })
        ),
        oe: g,
        hc: e,
        jc: d,
        Zc: I,
        Dg: H,
        Nf: z,
      },
    };
  }
  function cl(a, b) {
    return b.h(
      T(function () {
        return !1;
      }),
      P(function (c) {
        return c;
      }),
      Ed(function (c) {
        return new Z(c).ca(a);
      })
    );
  }
  function bl(a, b, c) {
    return b.h(se(Rc), Y(a, 1)).h(
      U(function (d, e) {
        return tj(d, e, Yj);
      }),
      W({ timestamp: c.now(), value: Xj }),
      Y(a, 1)
    );
  }
  function dl(a, b, c, d) {
    c = d.h(
      Dk(c),
      nk(
        P(function (e) {
          return Gj(e);
        })
      ),
      Y(a, 1)
    );
    return b instanceof Z
      ? c
      : S([c, b]).h(
          P(function (e) {
            var f = v(e);
            e = f.next().value;
            f = f.next().value;
            return {
              timestamp: f.timestamp.maximum(e.timestamp),
              value: f.value ? 0 : e.value,
            };
          }),
          U(tj),
          Y(a, 1)
        );
  }
  function el(a, b, c, d) {
    b = [
      b.h(
        P(function (e) {
          return 242500 <= e.value.F.width * e.value.F.height;
        })
      ),
    ];
    c instanceof L &&
      b.push(
        c.h(
          P(function (e) {
            return !!e;
          })
        )
      );
    c = S(b);
    return d
      ? c.h(
          P(function (e) {
            return e.some(function (f) {
              return f;
            });
          }),
          W(!1),
          U(),
          Y(a, 1)
        )
      : new Z(!1).ca(a);
  }
  var fl = K(
    Ji("data-google-av-itpl"),
    P(function (a) {
      return Number(a);
    }),
    P(function (a) {
      return isNaN(a) ? 1 : a;
    })
  );
  var gl = {
      Hg: "addEventListener",
      Ng: "getMaxSize",
      Og: "getScreenSize",
      Pg: "getState",
      Qg: "getVersion",
      Sg: "removeEventListener",
      Rg: "isViewable",
    },
    il = function (a, b) {
      b =
        void 0 === b
          ? function (f) {
              return hl(f);
            }
          : b;
      this.ma = null;
      this.Ef = new M();
      var c = a.fd,
        d = !a.cb;
      if (c && d) {
        var e = a.global.top.mraid;
        if (e) {
          this.Zb = b(e);
          this.ma = e;
          this.Wa = 3;
          return;
        }
      }
      (a = a.global.mraid)
        ? ((this.Zb = b(a)), (this.ma = a), (this.Wa = c ? (d ? 2 : 1) : 0))
        : ((this.Wa = -1), (this.Zb = 2));
    };
  il.prototype.addEventListener = function (a, b) {
    return this.lb("addEventListener", a, b);
  };
  il.prototype.removeEventListener = function (a, b) {
    return this.lb("removeEventListener", a, b);
  };
  il.prototype.de = function () {
    var a = this.lb("getVersion");
    return "string" === typeof a ? a : "";
  };
  il.prototype.getState = function () {
    var a = this.lb("getState");
    return "string" === typeof a ? a : "";
  };
  var jl = function (a) {
      a = a.lb("isViewable");
      return "boolean" === typeof a ? a : !1;
    },
    kl = function (a) {
      if (a.ma)
        return (a = a.ma.AFMA_LIDAR), "string" === typeof a ? a : void 0;
    },
    hl = function (a) {
      return a
        ? a.IS_GMA_SDK
          ? Object.values(gl).every(function (b) {
              return "function" === typeof a[b];
            })
            ? 0
            : 1
          : 2
        : 1;
    };
  il.prototype.lb = function (a) {
    var b = x.apply(1, arguments);
    if (this.ma)
      try {
        return this.ma[a].apply(this.ma, ea(b));
      } catch (c) {
        this.Ef.next(a);
      }
  };
  p.Object.defineProperties(il.prototype, {
    Xd: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        if (this.ma) {
          var a = this.ma.AFMA_LIDAR_EXP_1;
          return void 0 === a ? void 0 : !!a;
        }
      },
      set: function (a) {
        this.ma && (this.ma.AFMA_LIDAR_EXP_1 = a);
      },
    },
  });
  function ll(a, b) {
    return -1 !== new il(a).Wa
      ? new Z(!0).ca(a.i)
      : b.h(
          Ji("data-google-av-inapp"),
          P(function (c) {
            return null !== c;
          }),
          Y(a.i, 1)
        );
  }
  var nl = function (a, b) {
      var c = this;
      this.l = a;
      this.md = this.rc = null;
      this.ng = b.h(U()).subscribe(function (d) {
        ml(c);
        c.md = d;
      });
    },
    ol = function (a, b) {
      ml(a);
      a.rc = a.l.setTimeout(function () {
        var c;
        return void (null == (c = a.md) ? void 0 : c.next());
      }, b);
    },
    ml = function (a) {
      null !== a.rc && a.l.clearTimeout(a.rc);
      a.rc = null;
    };
  function pl(a, b, c, d, e) {
    var f = Ok.He;
    var g = void 0 === g ? new nl(b, d) : g;
    return new L(function (h) {
      var l = c
        .h(
          W(void 0),
          X(function () {
            return ql(e);
          })
        )
        .h(
          P(function (k) {
            var m = k.value;
            k = k.timestamp;
            var r = m.visible;
            m = m.Ra;
            var q = m >= f;
            q || !r
              ? ml(g)
              : ((k = Math.max(0, Bd(b.now(), k))),
                ol(g, Math.max(0, f - m - k)));
            return q;
          }),
          oe(function (k, m) {
            return m || k;
          }, !1),
          U()
        )
        .subscribe(h);
      return function () {
        ml(g);
        g.ng.unsubscribe();
        g.md = null;
        l.unsubscribe();
      };
    }).h(
      Fe(function (h) {
        return !h;
      }, !0),
      Y(a, 1)
    );
  }
  function ql(a) {
    return Jj([a, a.h(Wj())]).h(
      P(function (b) {
        var c = v(b);
        b = c.next().value;
        c = c.next().value;
        return {
          timestamp: b.timestamp,
          value: { visible: b.value, Ra: c.value },
        };
      }),
      U(function (b, c) {
        return tj(b, c, function (d, e) {
          return d.Ra === e.Ra && d.visible === e.visible;
        });
      })
    );
  }
  function rl(a, b) {
    return {
      Nc: b.h(Ji("data-google-av-adk")),
      Oc: b.h(
        Ji("data-google-av-btr"),
        U(),
        P(function (c) {
          return null === c
            ? []
            : c.split("|").filter(function (d) {
                return "" !== d;
              });
        })
      ),
      Tc: b.h(
        Ji("data-google-av-cpmav"),
        U(),
        P(function (c) {
          return null === c
            ? []
            : c.split("|").filter(function (d) {
                return "" !== d;
              });
        })
      ),
      gf: nj(a, b),
      flags: b.h(Ji("data-google-av-flags"), U()),
      Ka: ll(a, b),
      jd: b.h(
        Nj("cr", function (c) {
          return "1" === c;
        }),
        U()
      ),
      Kf: b.h(
        Nj("omid", function (c) {
          return "1" === c;
        }),
        U()
      ),
      hd: b.h(fl),
      metadata: b.h(Ji("data-google-av-metadata")),
      Da: b.h(Qi),
      Fa: b.h(Ki),
      Gg: b.h(
        Nj("la", function (c) {
          return "1" === c;
        }),
        U()
      ),
      eb: b.h(
        Ji("data-google-av-turtlex"),
        P(function (c) {
          return null !== c;
        }),
        U()
      ),
    };
  }
  function sl() {
    return K(
      Mj(),
      oe(function (a, b) {
        return Math.max(a, b);
      }, 0),
      P(function (a) {
        return Math.round(a);
      })
    );
  }
  function tl(a) {
    return K(xk(N(a)), sl());
  }
  function ul(a, b, c, d, e) {
    c = c.h(
      P(function () {
        return !1;
      })
    );
    d = S([e, d]).h(
      X(function (f) {
        f = v(f).next().value;
        return vl(b, f);
      })
    );
    return Pc(N(!1), c, d).h(U(), Y(a.i, 1));
  }
  function vl(a, b) {
    return a.h(
      P(function (c) {
        return b || 0 === c || 2 === c;
      })
    );
  }
  var wl = [33, 32],
    xl = K(
      fl,
      P(function (a) {
        return 0 <= wl.indexOf(a);
      }),
      U()
    );
  function yl(a, b, c, d, e, f) {
    var g = c.h(
        P(function (l) {
          return 9 === l;
        })
      ),
      h = b.element.h(xl);
    c = e.h(
      T(function (l) {
        return l;
      }),
      X(function () {
        return S([g, h]);
      }),
      P(function (l) {
        l = v(l);
        var k = l.next().value;
        return !l.next().value || k;
      }),
      U()
    );
    f = S([c, d.h(U()), f]).h(
      P(function (l) {
        var k = v(l);
        l = k.next().value;
        var m = k.next().value;
        k = k.next().value;
        return $k(a, b, !l, m, k);
      }),
      we(1),
      Zb()
    );
    d = f.h(
      P(function (l) {
        return l.ac;
      })
    );
    f = f.h(
      X(function (l) {
        return l.Va;
      }),
      W(null),
      U(),
      Y(a.i, 1)
    );
    return { Aa: d, vb: f };
  }
  function zl(a) {
    var b = void 0 === b ? !1 : b;
    return K(
      X(function (c) {
        return ai(a.document, c, b);
      }),
      Y(a.i, 1)
    );
  }
  var Al = function (a, b, c, d, e, f) {
    this.Db = b.element.h(zl(a), Y(a.i, 1));
    this.Ee = ul(a, c, b.element, this.Db, d);
    c = yl(a, b, e, d, this.Ee, f);
    d = c.vb;
    this.Aa = c.Aa;
    this.vb = d;
    this.Gd = Pc(
      new Z(1).ca(a.i),
      b.element.h(
        Ud(1),
        P(function () {
          return 2;
        }),
        Y(a.i, 1)
      ),
      this.Db.h(
        Ud(1),
        P(function () {
          return 3;
        }),
        Y(a.i, 1)
      ),
      this.Ee.h(
        T(Boolean),
        Ud(1),
        P(function () {
          return 0;
        }),
        Y(a.i, 1)
      )
    ).h(
      Fe(function (g) {
        return 0 !== g;
      }, !0),
      Y(a.i, 0)
    );
  };
  function Bl(a, b) {
    return a && 0 === b ? 15 : a || 1 !== b ? null : 14;
  }
  function Cl(a, b, c) {
    return b instanceof L
      ? b.h(
          X(function (d) {
            return (d = Bl(d, c)) ? Tb(new od(d)) : a;
          })
        )
      : (b = Bl(b.value, c))
      ? Tb(new od(b))
      : a;
  }
  function Dl(a) {
    var b = new od(13);
    if (1 > a.length) return { chain: Ob, Qc: Ob };
    var c = new M(),
      d = a[0];
    return {
      chain: a
        .slice(1)
        .reduce(function (e, f) {
          return e.h(
            Ed(function (g) {
              c.next(g);
              return f;
            })
          );
        }, d)
        .h(
          Ed(function (e) {
            c.next(e);
            return Tb(b);
          }),
          re(new M()),
          Zb()
        ),
      Qc: c,
    };
  }
  var El = function () {};
  var Fl = function (a, b) {
    this.context = a;
    this.xg = b;
  };
  w(Fl, El);
  Fl.prototype.Ia = function (a, b) {
    var c = this.xg.map(function (f) {
        return f.Ia(a, b);
      }),
      d = Dl(
        c.map(function (f) {
          return f.Ja;
        })
      ),
      e = d.Qc.h(Gl());
    return {
      Ja: d.chain.h(Y(this.context.i, 1)),
      Ga: Object.assign.apply(
        Object,
        [{ xd: e, rh: d.Qc }].concat(
          ea(
            c.map(function (f) {
              return f.Ga;
            })
          )
        )
      ),
    };
  };
  var Gl = function () {
    return oe(function (a, b) {
      b instanceof od ? a.push(b.Sf) : a.push(-1);
      return a;
    }, []);
  };
  function Hl(a, b) {
    var c = a.h(re(new M()), Zb());
    return X(function (d) {
      return c.h(b(d));
    });
  }
  function Il(a, b) {
    var c =
      void 0 === c
        ? function () {
            var f = (kh(a.global) ? a.global.innerWidth : 0) || a.dd() || 0,
              g = (kh(a.global) ? a.global.innerHeight : 0) || a.ad() || 0;
            return { left: 0, top: 0, width: f, height: g };
          }
        : c;
    var d = a.cb
      ? $h(a.document)
        ? a.Jf
          ? null
          : Tb(new od(5))
        : Tb(new od(4))
      : Tb(new od(3));
    if (d) return d;
    var e = new M();
    return Pc(N({}), b, e).h(
      P(function () {
        var f = Jl(a, c);
        return {
          timestamp: a.l.now(),
          value: { P: "iem", S: f, I: f, N: e, U: { x: 0, y: 0 } },
        };
      }),
      Y(a.i, 1)
    );
  }
  function Jl(a, b) {
    b = b();
    var c = Qg(document),
      d = function (q, z) {
        return !!a.document.elementFromPoint(q, z);
      },
      e = Math.floor(b.left - c.x),
      f = Math.floor(b.top - c.y),
      g = Math.floor(b.left + b.width - c.x),
      h = Math.floor(b.top + b.height - c.y);
    b = d(e, f);
    c = d(g, h);
    if (b && c) return { top: f, left: e, width: g - e, height: h - f };
    var l = d(g, f),
      k = d(e, h);
    if (b)
      (h = Kl(f, h, function (q) {
        return d(e, q);
      })),
        (g = Kl(e, g, function (q) {
          return d(q, f);
        }));
    else if (l)
      (h = Kl(f, h, function (q) {
        return d(g, q);
      })),
        (e = Kl(g, e, function (q) {
          return d(q, f);
        }));
    else if (k)
      (f = Kl(h, f, function (q) {
        return d(e, q);
      })),
        (g = Kl(e, g, function (q) {
          return d(q, h);
        }));
    else if (c)
      (f = Kl(h, f, function (q) {
        return d(g, q);
      })),
        (e = Kl(g, e, function (q) {
          return d(q, h);
        }));
    else {
      var m = Math.floor((e + g) / 2),
        r = Math.floor((f + h) / 2);
      if (!d(m, r)) return { left: 0, top: 0, width: 0, height: 0 };
      f = Kl(r, f, function (q) {
        return d(m, q);
      });
      h = Kl(r, h, function (q) {
        return d(m, q);
      });
      e = Kl(m, e, function (q) {
        return d(q, r);
      });
      g = Kl(m, g, function (q) {
        return d(q, r);
      });
    }
    return { top: f, left: e, width: g - e, height: h - f };
  }
  function Kl(a, b, c) {
    if (c(b)) return b;
    for (var d = 15; d--; ) {
      var e = Math.floor((a + b) / 2);
      if (e === a || e === b) break;
      c(e) ? (a = e) : (b = e);
    }
    return a;
  }
  var Ll = function (a, b) {
    this.context = a;
    this.Ta = b;
  };
  w(Ll, El);
  Ll.prototype.Ia = function (a, b) {
    var c = Hl(Il(this.context, this.Ta), ak(this.context, b.Da));
    return { Ja: Cl(a.Aa.h(c), b.Ka, 0), Ga: {} };
  };
  function Ml(a, b) {
    if (a.cb) return Tb(new od(6));
    var c = new M();
    return Pc(N({}), b, c).h(
      P(function () {
        return {
          timestamp: a.l.now(),
          value: { P: "geo", S: Nl(a), I: Bi(a, !0), N: c, U: { x: 0, y: 0 } },
        };
      }),
      Fh(a.i)
    );
  }
  function Nl(a) {
    var b = Bi(a, !1);
    if (!a.fd || !kh(a.global.parent) || a.global.parent === a.global) return b;
    var c = new yi(a.global.parent, a.Sa);
    c.M = a.M;
    c = Nl(c);
    a = a.global.frameElement.getBoundingClientRect();
    return di(ei(di(c, a), { x: b.left - a.left, y: b.top - a.top }), b);
  }
  var Ol = function (a, b) {
    this.context = a;
    this.Ta = b;
  };
  w(Ol, El);
  Ol.prototype.Ia = function (a, b) {
    var c = Hl(Ml(this.context, this.Ta), ak(this.context, b.Da));
    return { Ja: Cl(a.Aa.h(c), b.Ka, 0), Ga: {} };
  };
  var Pl = function (a, b, c) {
    c = void 0 === c ? fk(a, b) : c;
    this.context = a;
    this.Gf = c;
  };
  w(Pl, El);
  Pl.prototype.Ia = function (a, b) {
    return { Ja: Cl(a.Aa.h(this.Gf, jk(this.context)), b.Ka, 0), Ga: {} };
  };
  function Ql(a, b, c, d, e) {
    var f = void 0 === f ? new il(a) : f;
    var g = void 0 === g ? Re(a.l, 500) : g;
    var h = void 0 === h ? Re(a.l, 100) : h;
    e = N(f).h(
      Rl(c),
      Ie(function (l) {
        d.next(l.Wa);
      }),
      Sl(a, h),
      Tl(a),
      Ul(a, e),
      we(1),
      Zb()
    );
    f = new M();
    b = Pc(N({}), b, f);
    return e.h(Vl(a, f, b, g, c), Y(a.i, 1));
  }
  function Ul(a, b) {
    return K(
      function (c) {
        return S([c, b]);
      },
      Kd(function (c) {
        c = v(c);
        var d = c.next().value;
        return 9 !== c.next().value || jl(d)
          ? N(!0)
          : Wl(a, d, "viewableChange").h(
              T(function (e) {
                return v(e).next().value;
              }),
              Ud(1)
            );
      }),
      P(function (c) {
        return v(c).next().value;
      })
    );
  }
  function Rl(a) {
    return X(function (b) {
      if (-1 === b.Wa) return a.next("if"), Tb(new od(7));
      if (0 !== b.Zb)
        switch (b.Zb) {
          case 1:
            return a.next("mm"), Tb(new od(18));
          case 2:
            return a.next("ng"), Tb(new od(17));
          default:
            return a.next("i"), Tb(new od(8));
        }
      return N(b);
    });
  }
  function Sl(a, b) {
    return Kd(function () {
      var c = a.ve;
      return "complete" === Yh(a.document)
        ? N(!0)
        : c.h(
            Kd(function () {
              return b;
            })
          );
    });
  }
  var Tl = function (a) {
    return X(function (b) {
      return "loading" !== b.getState()
        ? N(b)
        : Wl(a, b, "ready").h(
            P(function () {
              return b;
            })
          );
    });
  };
  function Vl(a, b, c, d, e) {
    return X(function (f) {
      var g = kl(f);
      if ("string" !== typeof g) return e.next("nc"), Tb(new od(9));
      void 0 !== f.Xd && (f.Xd = !0);
      g = Wl(a, f, g, Xl);
      var h = { version: f.de(), Wa: f.Wa };
      g = g.h(
        P(function (k) {
          return Yl.apply(null, [a, b, f, h].concat(ea(k)));
        })
      );
      var l = d.h(
        Ie(function () {
          e.next("mt");
        }),
        X(function () {
          return Tb(new od(10));
        })
      );
      g = Uc(g, l);
      return S([g, c]).h(
        P(function (k) {
          k = v(k).next().value;
          return Object.assign({}, k, { timestamp: a.l.now() });
        })
      );
    });
  }
  function Xl(a, b) {
    return (
      (null === b || "number" === typeof b) &&
      (null === a ||
        (!!a &&
          "number" === typeof a.height &&
          "number" === typeof a.width &&
          "number" === typeof a.x &&
          "number" === typeof a.y))
    );
  }
  function Yl(a, b, c, d, e, f) {
    e = e ? { left: e.x, top: e.y, width: e.width, height: e.height } : bi;
    c = c.lb("getMaxSize");
    var g =
      null != c && "number" === typeof c.width && "number" === typeof c.height
        ? c
        : { width: 0, height: 0 };
    c = { left: 0, top: 0, width: -1, height: -1 };
    if (g) {
      var h = Number(String(g.width));
      g = Number(String(g.height));
      c = isNaN(h) || isNaN(g) ? c : { left: 0, top: 0, width: h, height: g };
    }
    a = {
      value: { S: e, I: c, P: "mraid", N: b, U: { x: 0, y: 0 } },
      timestamp: a.l.now(),
    };
    return Object.assign({}, a, d, { Vg: f });
  }
  function Wl(a, b, c, d) {
    d =
      void 0 === d
        ? function () {
            return !0;
          }
        : d;
    return new L(function (e) {
      var f = a.u.Ea(745, function () {
        e.next(x.apply(0, arguments));
      });
      b.addEventListener(c, f);
      return function () {
        b.removeEventListener(c, f);
      };
    }).h(
      T(function (e) {
        return d.apply(null, ea(e));
      })
    );
  }
  var Zl = function (a, b) {
    this.context = a;
    this.Ta = b;
  };
  w(Zl, El);
  Zl.prototype.Ia = function (a, b) {
    var c = new Vb(1),
      d = new Vb(1),
      e = Hl(Ql(this.context, this.Ta, c, d, b.Da), ak(this.context, b.Da));
    return {
      Ja: Cl(a.Aa.h(e), b.Ka, 1),
      Ga: { nd: c.h(Y(this.context.i, 1)), od: d.h(Y(this.context.i, 1)) },
    };
  };
  function $l(a) {
    return ["backgrounded", "notFound", "hidden", "noOutputDevice"].includes(a);
  }
  function am() {
    var a = Error;
    return Gg(
      function (b) {
        return b instanceof a;
      },
      function () {
        return Jg(a);
      }
    );
  }
  function bm(a, b) {
    var c = void 0 === c ? null : c;
    var d = new M(),
      e = void 0,
      f = a.ce,
      g = d.h(
        P(function () {
          return e ? Object.assign({}, e, { timestamp: a.l.now() }) : null;
        }),
        T(function (l) {
          return null !== l;
        }),
        P(function (l) {
          return l;
        })
      );
    b = S([Pc(f, g), b]);
    var h = c;
    return b.h(
      T(function (l) {
        l = v(l).next().value;
        null === h && (h = l.value.Ve);
        return l.value.Ve === h;
      }),
      Ie(function (l) {
        return void (e = v(l).next().value);
      }),
      P(function (l) {
        var k = v(l);
        l = k.next().value;
        k = k.next().value;
        try {
          var m = l.value.data,
            r = l.timestamp,
            q = m.viewport,
            z = Object.assign({}, q, { x: 0, y: 0, nh: q.width * q.height }),
            A = cm(z),
            u = m.adView,
            H =
              u.measuringElement && u.containerGeometry
                ? cm(u.containerGeometry)
                : cm(u.geometry),
            I = cm(u.geometry),
            V = u.reasons.some($l),
            ta = V ? bi : cm(u.onScreenGeometry),
            B;
          k && (B = u.percentageInView / 100);
          k && V && (B = 0);
          return {
            timestamp: r,
            value: {
              P: "omid",
              S: H,
              I: A,
              N: d,
              J: "omid",
              F: I,
              U: { x: H.left, y: H.top },
              L: ta,
              dc: B,
            },
          };
        } catch (Va) {
          A = Va;
          m = am();
          r = Hg;
          Hg = void 0;
          q = [];
          z = m(A, q);
          !z && q && ((A = "Expected " + m.ee() + ", got " + Ig(A)), q.push(A));
          if (!z) {
            var y = "";
            r && (y = r() + "\n");
            throw Error("P`" + y + "`" + m.ee() + "`" + q.reverse().join("\n"));
          }
          var F;
          m =
            null != (F = null == (y = Va) ? void 0 : y.message)
              ? F
              : "An unknown error occurred";
          y =
            "Error while processing geometryChange event: " +
            JSON.stringify(l.value) +
            "; " +
            m;
          throw Error(y);
        }
      }),
      we(1),
      Zb()
    );
  }
  function cm(a) {
    return {
      left: Math.floor(a.x),
      top: Math.floor(a.y),
      width: Math.floor(a.width),
      height: Math.floor(a.height),
    };
  }
  function dm(a, b, c, d) {
    c = void 0 === c ? Rc : c;
    var e = a.i;
    if (null === b) return Tb(new od(20));
    if (!b.validate()) return Tb(new od(21));
    var f;
    d = em(e, b, d).h(
      P(function (g) {
        var h = g.value;
        g = g.timestamp;
        var l = b.l,
          k = a.l;
        if (l.timeline !== g.timeline) throw new sd();
        g = new Ad(g.value - l.now().value + k.now().value, k.timeline);
        return (f = { value: h, timestamp: g });
      })
    );
    return Pc(
      d,
      c.h(
        P(function () {
          return f;
        })
      )
    ).h(
      T(function (g) {
        return void 0 !== g;
      }),
      P(function (g) {
        return g;
      }),
      Y(a.i, 1)
    );
  }
  function em(a, b, c) {
    return bm(b, c).h(
      Y(a, 1),
      P(function (d) {
        return {
          timestamp: d.timestamp,
          value: {
            U: { x: d.value.F.left, y: d.value.F.top },
            S: d.value.L,
            I: d.value.I,
            P: d.value.J,
            N: d.value.N,
          },
        };
      })
    );
  }
  var fm = function (a, b, c) {
    this.qd = a;
    this.Rb = b;
    this.Ta = c;
  };
  w(fm, El);
  fm.prototype.Ia = function (a, b) {
    var c = b.Da;
    b = dm(this.Rb, this.qd, this.Ta, b.ue);
    c = Hl(b, ak(this.Rb, c));
    return { Ja: a.Aa.h(c), Ga: {} };
  };
  var gm = function (a, b, c) {
    this.qd = a;
    this.Rb = b;
    this.rf = c;
  };
  w(gm, El);
  gm.prototype.Ia = function (a, b) {
    b = dm(this.Rb, this.qd, void 0, b.ue);
    var c = ik(this.Rb, this.rf);
    b = Hl(b, c);
    return { Ja: a.Aa.h(b), Ga: {} };
  };
  function hm(a) {
    return a.document.hg.h(
      P(function (b) {
        return "visible" === b;
      }),
      U(),
      Y(a.i, 1)
    );
  }
  var im = function () {
      this.ae = {};
    },
    Dj = function (a, b) {
      a = a.ae[b.key];
      if ("proto" === b.valueType) {
        try {
          var c = JSON.parse(a);
          if (Array.isArray(c)) return c;
        } catch (d) {}
        return b.defaultValue;
      }
      return typeof a === typeof b.defaultValue ? a : b.defaultValue;
    };
  var jm = function (a) {
    var b = new im();
    return K(
      P(function (c) {
        if (null === c) return null;
        try {
          var d = JSON.parse(c)[0];
          c = "";
          for (var e = 0; e < d.length; e++)
            c += String.fromCharCode(
              d.charCodeAt(e) ^
                "\u0003\u0007\u0003\u0007\b\u0004\u0004\u0006\u0005\u0003".charCodeAt(
                  e % 10
                )
            );
          b.ae = JSON.parse(c);
        } catch (f) {}
        return b;
      }),
      Y(a.i, 1)
    );
  };
  var km;
  km = ["av.key", "js", "20221110"].slice(-1)[0];
  function lm(a, b, c) {
    var d;
    return b.h(
      U(),
      X(function (e) {
        return c.h(
          P(function () {
            if (!d) {
              d = !0;
              try {
                e.next();
              } finally {
                d = !1;
              }
            }
            return !0;
          })
        );
      }),
      W(!1),
      Y(a.i, 1)
    );
  }
  function mm(a) {
    return K(
      nk(
        P(function (b) {
          return wk(b, a);
        })
      ),
      Lj(),
      P(function (b) {
        return Math.round(b);
      })
    );
  }
  function nm(a, b, c, d, e) {
    var f = Vk;
    if (1 < f.length)
      for (var g = 0; g < f.length - 1; g++) if (f[g] < f[g + 1]) throw Error();
    g = e.h(
      W(void 0),
      X(function () {
        return c.h(Wj());
      }),
      U(),
      Y(a, 1)
    );
    e = e.h(
      W(void 0),
      X(function () {
        return c.h(sl());
      }),
      U(),
      Y(a, 1)
    );
    return {
      Fb: d.h(
        W(void 0),
        X(function () {
          return b.h(Vj(tl, f));
        }),
        U(gb),
        Y(a, 1)
      ),
      Pb: d.h(
        W(void 0),
        X(function () {
          return b.h(
            Vj(mm, f),
            P(function (h) {
              return h.map(function (l, k) {
                return 0 < k ? l - h[k - 1] : l;
              });
            })
          );
        }),
        U(gb),
        Y(a, 1)
      ),
      Eb: e,
      Ra: g.h(U(tj), Y(a, 1)),
    };
  }
  function om(a, b, c) {
    var d = c.h(
      P(function (e) {
        return { value: e, timestamp: a.l.now() };
      }),
      U(tj)
    );
    return b instanceof L
      ? b.h(
          U(),
          X(function (e) {
            return e ? new Z({ value: !1, timestamp: a.l.now() }).ca(a.i) : d;
          })
        )
      : !1 === b.value
      ? d
      : new Z(!1);
  }
  function pm(a, b, c, d, e, f) {
    var g = Ok;
    b = b instanceof L ? b.h(W(!1), U()) : b;
    var h = !(Tg() || Ug());
    c = om(a, c, d);
    a = f.Aa.h(Ij(a.i));
    return Object.assign({}, g, { hc: c, Ke: e, Qd: h, re: b, jc: a });
  }
  function qm(a) {
    a = a.global;
    if ("undefined" === typeof a.__google_lidar_)
      return (a.__google_lidar_ = 1), !1;
    a.__google_lidar_ = Number(a.__google_lidar_) + 1;
    var b = a.__google_lidar_adblocks_count_;
    if (
      "number" === typeof b &&
      0 < b &&
      ((a = a.__google_lidar_radf_), "function" === typeof a)
    )
      try {
        a();
      } catch (c) {}
    return !0;
  }
  function rm(a) {
    var b = a.global;
    b.osdlfm = function () {
      return b.__google_lidar_radf_;
    };
    if (void 0 !== b.__google_lidar_radf_) return Ob;
    b.__google_lidar_adblocks_count_ = 1;
    var c = new M();
    b.__google_lidar_radf_ = function () {
      return void c.next(a);
    };
    return c.h(ph(a.u, 743));
  }
  var sm = function (a) {
    this.key = a;
    this.defaultValue = !1;
    this.valueType = "boolean";
  };
  var tm = new sm("100006"),
    um = new sm("45381331"),
    Fj = new (function (a, b) {
      this.key = a;
      this.defaultValue = void 0 === b ? 0 : b;
      this.valueType = "number";
    })("45362137"),
    vm = new sm("45377435"),
    wm = new sm("45372163"),
    xm = new sm("45382077");
  function ym() {
    var a = kb();
    return a
      ? db(
          "Android TV;AppleTV;Apple TV;GoogleTV;HbbTV;NetCast.TV;Opera TV;POV_TV;SMART-TV;SmartTV;TV Store;AmazonWebAppPlatform;MiBOX".split(
            ";"
          ),
          function (b) {
            return jb(a, b);
          }
        ) ||
        (jb(a, "OMI/") && !jb(a, "XiaoMi/"))
        ? !0
        : jb(a, "Presto") &&
          jb(a, "Linux") &&
          !jb(a, "X11") &&
          !jb(a, "Android") &&
          !jb(a, "Mobi")
      : !1;
  }
  var Ok = Object.freeze({ He: 1e3, Yc: 0.5, ld: 0.3 }),
    Vk = Object.freeze([1, 0.75, Ok.Yc, Ok.ld, 0]),
    gj =
      "https://pagead2.googlesyndication.com/pagead/gen_204?id=av-js&type=error&bin=7&v=" +
      km;
  function zm(a, b, c, d, e) {
    var f = qm(a),
      g = rm(a);
    g = Ti(a, g);
    f = f
      ? Ob
      : g.h(
          P(function (k) {
            return Object.freeze({ xb: pb(), element: new Z(k).ca(a.i) });
          }),
          Li()
        );
    var h = hm(a).h(
        P(function (k) {
          return !k;
        })
      ),
      l = new Fl(a, [
        new Pl(a, Vk),
        new Ol(a, d),
        new Ll(a, d),
        new gm(e, a, Vk),
        new fm(e, a, d),
        new Zl(a, d),
      ]);
    return Xi(
      a,
      f,
      function (k, m) {
        var r = rl(k, m.element),
          q = r.Nc,
          z = r.Oc,
          A = r.Tc,
          u = r.gf,
          H = r.Ka,
          I = r.Kf,
          V = r.hd,
          ta = r.jd,
          B = r.Da,
          y = r.Fa,
          F = r.Gg,
          Va = r.eb;
        r = r.flags.h(U(), jm(k));
        var vf = r.h(
            Cj(um),
            P(function (G) {
              return !!G;
            })
          ),
          qb = r.h(
            Cj(xm),
            P(function (G) {
              return !!G;
            })
          ),
          La = H.h(
            Gd(I, vf),
            P(function (G) {
              var $a = v(G);
              G = $a.next().value;
              var Um = $a.next().value;
              $a = $a.next().value;
              !(G = G || Um) &&
                (G = $a) &&
                ((G =
                  jb(kb(), "CrKey") ||
                  jb(kb(), "PlayStation") ||
                  jb(kb(), "Roku") ||
                  ym() ||
                  jb(kb(), "Xbox")) ||
                  ((G = kb()),
                  (G =
                    jb(G, "AppleTV") ||
                    jb(G, "Apple TV") ||
                    jb(G, "CFNetwork") ||
                    jb(G, "tvOS"))),
                G ||
                  ((G = kb()),
                  (G = jb(G, "sdk_google_atv_x86") || jb(G, "Android TV"))));
              return G;
            })
          );
        I = new Al(k, m, u, H, B, qb);
        qb = r.h(
          Cj(tm),
          P(function (G) {
            return !!G;
          })
        );
        qb = l.Ia(I, { Ka: H, Da: B, ue: qb });
        var qa = qb.Ja,
          Vc = qb.Ga;
        qb = Vc.nd;
        vf = Vc.od;
        Vc = Vc.xd;
        var rb = pm(k, ta, La, h, F, I);
        F = al(k.i, k.l, qa, rb);
        La = nm(k.i, F.ya.zd, F.ya.visible, F.wd, F.Mb);
        var Wc = pl(k.i, k.l, F.Mb, F.ya.N, F.ya.visible);
        qa = Fk(k.i, k.l, qa, rb);
        rb = Uk(k.l, k.i, qa.ya.zd, qa.ya.visible, qa.wd, qa.Mb);
        var wf = { Fd: Nk(k.i, k.l, qa.Mb, rb.Eb) },
          xf = r.h(
            Cj(vm),
            P(function (G) {
              return !!G;
            }),
            W(!1)
          );
        F = Hj(
          k.i,
          xf,
          Object.assign({}, qa.ya, rb, wf),
          Object.assign({}, F.ya, {
            Fd: vk(k, Wc),
            Fb: vk(k, La.Fb),
            Pb: vk(k, La.Pb),
            Eb: vk(k, La.Eb),
            Ra: La.Ra.h(
              P(function (G) {
                return new Bj(k.l, G);
              })
            ),
          })
        );
        qa = mk(k, c.h(le("t")));
        La = null !== e && e.validate();
        Wc = (La ? e.rg : Rc).h(Y(k.i, 1), le("u"));
        qa = Uc(qa, Wc);
        La = La ? e.ke.h(Ud(1), le(!0), W(!1), Y(k.i, 1)) : Hh;
        Wc = lm(
          k,
          F.N,
          qa.h(
            T(function (G) {
              return null !== G;
            })
          )
        );
        rb = Am(k, I, q);
        wf = Bm(k, qa, m.element);
        xf = rb.We.h(W({ x: 0, y: 0 }));
        var Xm = r.h(
          Cj(wm),
          P(function (G) {
            return !!G;
          }),
          W(!1),
          U(),
          Ie(function (G) {
            Ah = G;
          }),
          Y(k.i, 1)
        );
        return Object.assign(
          {},
          {
            M: new Z(k.M),
            lc: new Z("lidar2"),
            zg: new Z("lidartos"),
            af: new Z(km),
            Ze: new Z(7),
            Sc: new Z(k.validate() ? null : new pd()),
            df: new Z(Zh(k.document)),
            ta: new Z(ij),
            Wc: qa,
            Ac: qa,
            oh: Wc,
            he: La,
            ff: new Z(k.cb ? 1 : void 0),
            hf: new Z(k.bf ? 1 : void 0),
            Ka: H,
            eb: Va,
            kb: Va.h(
              T(function (G) {
                return G;
              }),
              P(function () {
                return k.kb.bind(k);
              })
            ),
            nd: qb.h(Y(k.i, 1)),
            od: vf.h(Y(k.i, 1)),
            tf: r.h(Ej()),
            le: Xm,
            ef: m.element.h(
              P(function (G) {
                return null !== G;
              })
            ),
            kc: y,
            Ag: y,
            Tc: A.h(W([])),
            zf: A.h(
              P(function (G) {
                return 0 < G.length ? !0 : null;
              }),
              W(null),
              U()
            ),
            Oc: z.h(W([]), Y(k.i, 1)),
            lh: r,
            Nc: q,
            vb: I.vb,
            hd: V.h(W(0), Y(k.i, 1)),
            Rf: u,
            Da: B.h(W(0), Y(k.i, 1)),
            Qb: new Z(hj),
            Ed: new Z(sj),
            jd: ta,
            Hf: I.Db.h(Ij(k.i)),
            Gd: I.Gd,
          },
          F,
          {
            bc: S([F.bc, xf]).h(
              P(function (G) {
                var $a = v(G);
                G = $a.next().value;
                $a = $a.next().value;
                return ei(G, $a);
              }),
              U(ci)
            ),
          },
          rb,
          { Bd: Ih(k), Af: wf, xd: Vc }
        );
      },
      fj(a, b)
    );
  }
  function Am(a, b, c) {
    var d = void 0 === d ? Ca : d;
    var e, f;
    d =
      (null == (e = d.performance)
        ? void 0
        : null == (f = e.timing)
        ? void 0
        : f.navigationStart) || 0;
    return Object.assign({}, { Ue: new Z(d), Te: Tj(a, b) }, Sj(a, b, c));
  }
  function Bm(a, b, c) {
    return b.h(
      T(function (d) {
        return null !== d;
      }),
      X(function () {
        return c;
      }),
      P(function (d) {
        var e = Mi(a);
        return 0 < e.length && 0 <= e.indexOf(d);
      }),
      P(function (d) {
        return !d;
      })
    );
  }
  function Cm(a, b) {
    if (!b) throw Error("Q`" + a);
    if ("string" !== typeof b && !(b instanceof String)) throw Error("R`" + a);
    if ("" === b.trim()) throw Error("S`" + a);
  }
  function Dm(a) {
    if (!a) throw Error("V`functionToExecute");
  }
  function Em(a, b) {
    if (null == b) throw Error("T`" + a);
    if ("number" !== typeof b || isNaN(b)) throw Error("U`" + a);
    if (0 > b) throw Error("W`" + a);
  }
  function Fm() {
    return /\d+\.\d+\.\d+(-.*)?/.test("1.4.1-google_20221025");
  }
  function Gm() {
    for (var a = ["1", "4", "1"], b = ["1", "0", "3"], c = 0; 3 > c; c++) {
      var d = parseInt(a[c], 10),
        e = parseInt(b[c], 10);
      if (d > e) break;
      else if (d < e) return !1;
    }
    return !0;
  }
  var Hm = function (a, b, c, d) {
      this.fe = a;
      this.method = b;
      this.version = c;
      this.args = d;
    },
    Im = function (a) {
      return (
        !!a &&
        void 0 !== a.omid_message_guid &&
        void 0 !== a.omid_message_method &&
        void 0 !== a.omid_message_version &&
        "string" === typeof a.omid_message_guid &&
        "string" === typeof a.omid_message_method &&
        "string" === typeof a.omid_message_version &&
        (void 0 === a.omid_message_args || void 0 !== a.omid_message_args)
      );
    },
    Jm = function (a) {
      return new Hm(
        a.omid_message_guid,
        a.omid_message_method,
        a.omid_message_version,
        a.omid_message_args
      );
    };
  Hm.prototype.nb = function () {
    var a = {};
    a =
      ((a.omid_message_guid = this.fe),
      (a.omid_message_method = this.method),
      (a.omid_message_version = this.version),
      a);
    void 0 !== this.args && (a.omid_message_args = this.args);
    return a;
  };
  var Km = function (a) {
    this.Cc = a;
  };
  Km.prototype.nb = function () {
    return JSON.stringify(void 0);
  };
  function Lm(a, b) {
    return a && (a[b] || (a[b] = {}));
  }
  function Mm() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (a) {
        var b = (16 * Math.random()) | 0;
        return "y" === a ? ((b & 3) | 8).toString(16) : b.toString(16);
      }
    );
  }
  function Nm() {
    var a = x.apply(0, arguments);
    Om(
      function () {
        throw new (Function.prototype.bind.apply(
          Error,
          [null, "Could not complete the test successfully - "].concat(ea(a))
        ))();
      },
      function () {
        return console.error.apply(console, ea(a));
      }
    );
  }
  function Om(a, b) {
    "undefined" !== typeof jasmine && jasmine
      ? a()
      : "undefined" !== typeof console && console && console.error && b();
  }
  var Pm = (function () {
    if ("undefined" !== typeof omidGlobal && omidGlobal) return omidGlobal;
    if ("undefined" !== typeof global && global) return global;
    if ("undefined" !== typeof window && window) return window;
    if ("undefined" !== typeof globalThis && globalThis) return globalThis;
    var a = Function("return this")();
    if (a) return a;
    throw Error("X");
  })();
  var Qm = function (a) {
    try {
      return a.frames ? !!a.frames.omid_v1_present : !1;
    } catch (b) {
      return !1;
    }
  };
  var Rm = function (a) {
    this.Cc = a;
    this.handleExportedMessage = Rm.prototype.wf.bind(this);
  };
  w(Rm, Km);
  Rm.prototype.sendMessage = function (a, b) {
    b = void 0 === b ? this.Cc : b;
    if (!b) throw Error("Y");
    b.handleExportedMessage(a.nb(), this);
  };
  Rm.prototype.wf = function (a, b) {
    if (Im(a) && this.onMessage) this.onMessage(Jm(a), b);
  };
  function Sm(a) {
    return null != a && "undefined" !== typeof a.top && null != a.top;
  }
  function Tm(a) {
    if (a === Pm) return !1;
    try {
      if ("undefined" === typeof a.location.hostname) return !0;
    } catch (b) {
      return !0;
    }
    return !1;
  }
  var Vm = function (a, b) {
    this.Cc = b = void 0 === b ? Pm : b;
    var c = this;
    a.addEventListener("message", function (d) {
      if ("object" === typeof d.data) {
        var e = d.data;
        if (Im(e) && d.source && c.onMessage) c.onMessage(Jm(e), d.source);
      }
    });
  };
  w(Vm, Km);
  Vm.prototype.sendMessage = function (a, b) {
    b = void 0 === b ? this.Cc : b;
    if (!b) throw Error("Y");
    b.postMessage(a.nb(), "*");
  };
  var Wm = ["omid", "v1_VerificationServiceCommunication"],
    Ym = ["omidVerificationProperties", "serviceWindow"];
  function Zm(a, b) {
    return b.reduce(function (c, d) {
      return c && c[d];
    }, a);
  }
  var $m = function (a) {
    if (!a) {
      var b;
      "undefined" === typeof b &&
        "undefined" !== typeof window &&
        window &&
        (b = window);
      b = Sm(b) ? b : Pm;
      var c = void 0 === c ? Qm : c;
      a = [];
      var d = Zm(b, Ym);
      d && a.push(d);
      a.push(Sm(b) ? b.top : Pm);
      a: {
        a = v(a);
        for (var e = a.next(); !e.done; e = a.next()) {
          b: {
            d = b;
            e = e.value;
            var f = c;
            if (!Tm(e))
              try {
                var g = Zm(e, Wm);
                if (g) {
                  var h = new Rm(g);
                  break b;
                }
              } catch (l) {}
            h = f(e) ? new Vm(d, e) : null;
          }
          if ((d = h)) {
            a = d;
            break a;
          }
        }
        a = null;
      }
    }
    if ((this.ub = a)) this.ub.onMessage = this.xf.bind(this);
    else if (
      (c =
        (c = Pm.omid3p) &&
        "function" === typeof c.registerSessionObserver &&
        "function" === typeof c.addEventListener
          ? c
          : null)
    )
      this.Hb = c;
    this.lg = this.mg = 0;
    this.Pc = {};
    this.ed = [];
    this.nc = (c = Pm.omidVerificationProperties) ? c.injectionId : void 0;
  };
  $m.prototype.qa = function () {
    return !(!this.ub && !this.Hb);
  };
  var Ze = function (a, b, c) {
    Dm(b);
    a.Hb
      ? a.Hb.registerSessionObserver(b, c, a.nc)
      : a.mb("addSessionListener", b, c, a.nc);
  };
  $m.prototype.addEventListener = function (a, b) {
    Cm("eventType", a);
    Dm(b);
    this.Hb
      ? this.Hb.addEventListener(a, b, this.nc)
      : this.mb("addEventListener", b, a, this.nc);
  };
  var Qe = function (a, b, c, d) {
      Cm("url", b);
      Pm.document && Pm.document.createElement
        ? an(a, b, c, d)
        : a.mb(
            "sendUrl",
            function (e) {
              e && c ? c() : !e && d && d();
            },
            b
          );
    },
    an = function (a, b, c, d) {
      var e = Pm.document.createElement("img");
      a.ed.push(e);
      var f = function (g) {
        var h = a.ed.indexOf(e);
        0 <= h && a.ed.splice(h, 1);
        g && g();
      };
      e.addEventListener("load", f.bind(a, c));
      e.addEventListener("error", f.bind(a, d));
      e.src = b;
    };
  $m.prototype.setTimeout = function (a, b) {
    Dm(a);
    Em("timeInMillis", b);
    if (bn()) return Pm.setTimeout(a, b);
    var c = this.mg++;
    this.mb("setTimeout", a, c, b);
    return c;
  };
  $m.prototype.clearTimeout = function (a) {
    Em("timeoutId", a);
    bn() ? Pm.clearTimeout(a) : this.Be("clearTimeout", a);
  };
  $m.prototype.setInterval = function (a, b) {
    Dm(a);
    Em("timeInMillis", b);
    if (cn()) return Pm.setInterval(a, b);
    var c = this.lg++;
    this.mb("setInterval", a, c, b);
    return c;
  };
  $m.prototype.clearInterval = function (a) {
    Em("intervalId", a);
    cn() ? Pm.clearInterval(a) : this.Be("clearInterval", a);
  };
  var bn = function () {
      return (
        "function" === typeof Pm.setTimeout &&
        "function" === typeof Pm.clearTimeout
      );
    },
    cn = function () {
      return (
        "function" === typeof Pm.setInterval &&
        "function" === typeof Pm.clearInterval
      );
    };
  $m.prototype.xf = function (a) {
    var b = a.method,
      c = a.fe;
    a = a.args;
    if ("response" === b && this.Pc[c]) {
      var d =
        Fm() && Gm()
          ? a
            ? a
            : []
          : a && "string" === typeof a
          ? JSON.parse(a)
          : [];
      this.Pc[c].apply(this, d);
    }
    "error" === b && window.console && Nm(a);
  };
  $m.prototype.Be = function (a) {
    this.mb.apply(this, [a, null].concat(ea(x.apply(1, arguments))));
  };
  $m.prototype.mb = function (a, b) {
    var c = x.apply(2, arguments);
    if (this.ub) {
      var d = Mm();
      b && (this.Pc[d] = b);
      var e = "VerificationService." + a;
      c = Fm() && Gm() ? c : JSON.stringify(c);
      this.ub.sendMessage(new Hm(d, e, "1.4.1-google_20221025", c));
    }
  };
  var dn = void 0;
  if (
    (dn =
      void 0 === dn
        ? "undefined" === typeof omidExports
          ? null
          : omidExports
        : dn)
  ) {
    var en = ["OmidVerificationClient"];
    en.slice(0, en.length - 1).reduce(Lm, dn)[en[en.length - 1]] = $m;
  }
  var fn = null;
  try {
    var gn = new $m();
    fn = new Ye(gn, "doubleclickbygoogle.com-omid");
  } catch (a) {
    fn = null;
  }
  (function (a, b, c, d, e) {
    b = void 0 === b ? 0.01 : b;
    c = void 0 === c ? Re(a.l, 36e5) : c;
    d = void 0 === d ? a.l.interval(100).h(Y(a.i, 1)) : d;
    e = void 0 === e ? null : e;
    return a.u.Ea(742, function () {
      return zm(a, b, c, d, e);
    })();
  })(new yi(window, null, new oh()), void 0, void 0, void 0, fn).subscribe();
}.call(this));
