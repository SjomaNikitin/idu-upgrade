(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var a;
  var s;
  var h;
  var p;
  var v;
  var y;
  var d = {};
  var w = [];
  var _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var g = Array.isArray;
  function m(n2, l3) {
    for (var u3 in l3) n2[u3] = l3[u3];
    return n2;
  }
  function b(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function k(l3, u3, t3) {
    var i3, r3, o3, e3 = {};
    for (o3 in u3) "key" == o3 ? i3 = u3[o3] : "ref" == o3 ? r3 = u3[o3] : e3[o3] = u3[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return x(l3, e3, i3, r3, null);
  }
  function x(n2, t3, i3, r3, o3) {
    var e3 = { type: n2, props: t3, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function S(n2) {
    return n2.children;
  }
  function C(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function $(n2, l3) {
    if (null == l3) return n2.__ ? $(n2.__, n2.__i + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++) if (null != (u3 = n2.__k[l3]) && null != u3.__e) return u3.__e;
    return "function" == typeof n2.type ? $(n2) : null;
  }
  function I(n2) {
    if (n2.__P && n2.__d) {
      var u3 = n2.__v, t3 = u3.__e, i3 = [], r3 = [], o3 = m({}, u3);
      o3.__v = u3.__v + 1, l.vnode && l.vnode(o3), q(n2.__P, o3, u3, n2.__n, n2.__P.namespaceURI, 32 & u3.__u ? [t3] : null, i3, null == t3 ? $(u3) : t3, !!(32 & u3.__u), r3), o3.__v = u3.__v, o3.__.__k[o3.__i] = o3, D(i3, o3, r3), u3.__e = u3.__ = null, o3.__e != t3 && P(o3);
    }
  }
  function P(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l3) {
      if (null != l3 && null != l3.__e) return n2.__e = n2.__c.base = l3.__e;
    }), P(n2);
  }
  function A(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(H);
  }
  function H() {
    try {
      for (var n2, l3 = 1; i.length; ) i.length > l3 && i.sort(e), n2 = i.shift(), l3 = i.length, I(n2);
    } finally {
      i.length = H.__r = 0;
    }
  }
  function L(n2, l3, u3, t3, i3, r3, o3, e3, f3, c3, a3) {
    var s3, h3, p3, v3, y3, _2, g2, m3 = t3 && t3.__k || w, b2 = l3.length;
    for (f3 = T(u3, l3, m3, f3, b2), s3 = 0; s3 < b2; s3++) null != (p3 = u3.__k[s3]) && (h3 = -1 != p3.__i && m3[p3.__i] || d, p3.__i = s3, _2 = q(n2, p3, h3, i3, r3, o3, e3, f3, c3, a3), v3 = p3.__e, p3.ref && h3.ref != p3.ref && (h3.ref && J(h3.ref, null, p3), a3.push(p3.ref, p3.__c || v3, p3)), null == y3 && null != v3 && (y3 = v3), (g2 = !!(4 & p3.__u)) || h3.__k === p3.__k ? (f3 = j(p3, f3, n2, g2), g2 && h3.__e && (h3.__e = null)) : "function" == typeof p3.type && void 0 !== _2 ? f3 = _2 : v3 && (f3 = v3.nextSibling), p3.__u &= -7);
    return u3.__e = y3, f3;
  }
  function T(n2, l3, u3, t3, i3) {
    var r3, o3, e3, f3, c3, a3 = u3.length, s3 = a3, h3 = 0;
    for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? ("string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? o3 = n2.__k[r3] = x(null, o3, null, null, null) : g(o3) ? o3 = n2.__k[r3] = x(S, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? o3 = n2.__k[r3] = x(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : n2.__k[r3] = o3, f3 = r3 + h3, o3.__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = O(o3, u3, f3, s3)) && (s3--, (e3 = u3[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i3 > a3 ? h3-- : i3 < a3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f3 && (c3 == f3 - 1 ? h3-- : c3 == f3 + 1 ? h3++ : (c3 > f3 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (s3) for (r3 = 0; r3 < a3; r3++) null != (e3 = u3[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = $(e3)), K(e3, e3));
    return t3;
  }
  function j(n2, l3, u3, t3) {
    var i3, r3;
    if ("function" == typeof n2.type) {
      for (i3 = n2.__k, r3 = 0; i3 && r3 < i3.length; r3++) i3[r3] && (i3[r3].__ = n2, l3 = j(i3[r3], l3, u3, t3));
      return l3;
    }
    n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = $(n2)), u3.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function O(n2, l3, u3, t3) {
    var i3, r3, o3, e3 = n2.key, f3 = n2.type, c3 = l3[u3], a3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == e3 || a3 && e3 == c3.key && f3 == c3.type) return u3;
    if (t3 > (a3 ? 1 : 0)) {
      for (i3 = u3 - 1, r3 = u3 + 1; i3 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i3 >= 0 ? i3-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f3 == c3.type) return o3;
    }
    return -1;
  }
  function z(n2, l3, u3) {
    "-" == l3[0] ? n2.setProperty(l3, null == u3 ? "" : u3) : n2[l3] = null == u3 ? "" : "number" != typeof u3 || _.test(l3) ? u3 : u3 + "px";
  }
  function N(n2, l3, u3, t3, i3) {
    var r3, o3;
    n: if ("style" == l3) if ("string" == typeof u3) n2.style.cssText = u3;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u3 && l3 in u3 || z(n2.style, l3, "");
      if (u3) for (l3 in u3) t3 && u3[l3] == t3[l3] || z(n2.style, l3, u3[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(s, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u3, u3 ? t3 ? u3[a] = t3[a] : (u3[a] = h, n2.addEventListener(l3, r3 ? v : p, r3)) : n2.removeEventListener(l3, r3 ? v : p, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u3 ? "" : u3;
        break n;
      } catch (n3) {
      }
      "function" == typeof u3 || (null == u3 || false === u3 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u3 ? "" : u3));
    }
  }
  function V(n2) {
    return function(u3) {
      if (this.l) {
        var t3 = this.l[u3.type + n2];
        if (null == u3[c]) u3[c] = h++;
        else if (u3[c] < t3[a]) return;
        return t3(l.event ? l.event(u3) : u3);
      }
    };
  }
  function q(n2, u3, t3, i3, r3, o3, e3, f3, c3, a3) {
    var s3, h3, p3, v3, y3, d3, _2, k3, x2, M, $2, I2, P2, A3, H2, T3 = u3.type;
    if (void 0 !== u3.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f3 = u3.__e = t3.__e]), (s3 = l.__b) && s3(u3);
    n: if ("function" == typeof T3) try {
      if (k3 = u3.props, x2 = T3.prototype && T3.prototype.render, M = (s3 = T3.contextType) && i3[s3.__c], $2 = s3 ? M ? M.props.value : s3.__ : i3, t3.__c ? _2 = (h3 = u3.__c = t3.__c).__ = h3.__E : (x2 ? u3.__c = h3 = new T3(k3, $2) : (u3.__c = h3 = new C(k3, $2), h3.constructor = T3, h3.render = Q), M && M.sub(h3), h3.state || (h3.state = {}), h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), x2 && null == h3.__s && (h3.__s = h3.state), x2 && null != T3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = m({}, h3.__s)), m(h3.__s, T3.getDerivedStateFromProps(k3, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u3, p3) x2 && null == T3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), x2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (x2 && null == T3.getDerivedStateFromProps && k3 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(k3, $2), u3.__v == t3.__v || !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(k3, h3.__s, $2)) {
          u3.__v != t3.__v && (h3.props = k3, h3.state = h3.__s, h3.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.some(function(n3) {
            n3 && (n3.__ = u3);
          }), w.push.apply(h3.__h, h3._sb), h3._sb = [], h3.__h.length && e3.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(k3, h3.__s, $2), x2 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, y3, d3);
        });
      }
      if (h3.context = $2, h3.props = k3, h3.__P = n2, h3.__e = false, I2 = l.__r, P2 = 0, x2) h3.state = h3.__s, h3.__d = false, I2 && I2(u3), s3 = h3.render(h3.props, h3.state, h3.context), w.push.apply(h3.__h, h3._sb), h3._sb = [];
      else do {
        h3.__d = false, I2 && I2(u3), s3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++P2 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i3 = m(m({}, i3), h3.getChildContext())), x2 && !p3 && null != h3.getSnapshotBeforeUpdate && (d3 = h3.getSnapshotBeforeUpdate(v3, y3)), A3 = null != s3 && s3.type === S && null == s3.key ? E(s3.props.children) : s3, f3 = L(n2, g(A3) ? A3 : [A3], u3, t3, i3, r3, o3, e3, f3, c3, a3), h3.base = u3.__e, u3.__u &= -161, h3.__h.length && e3.push(h3), _2 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u3.__v = null, c3 || null != o3) if (n3.then) {
        for (u3.__u |= c3 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
        o3[o3.indexOf(f3)] = null, u3.__e = f3;
      } else {
        for (H2 = o3.length; H2--; ) b(o3[H2]);
        B(u3);
      }
      else u3.__e = t3.__e, u3.__k = t3.__k, n3.then || B(u3);
      l.__e(n3, u3, t3);
    }
    else null == o3 && u3.__v == t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : f3 = u3.__e = G(t3.__e, u3, t3, i3, r3, o3, e3, c3, a3);
    return (s3 = l.diffed) && s3(u3), 128 & u3.__u ? void 0 : f3;
  }
  function B(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B));
  }
  function D(n2, u3, t3) {
    for (var i3 = 0; i3 < t3.length; i3++) J(t3[i3], t3[++i3], t3[++i3]);
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function E(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g(n2) ? n2.map(E) : void 0 !== n2.constructor ? null : m({}, n2);
  }
  function G(u3, t3, i3, r3, o3, e3, f3, c3, a3) {
    var s3, h3, p3, v3, y3, w3, _2, m3 = i3.props || d, k3 = t3.props, x2 = t3.type;
    if ("svg" == x2 ? o3 = "http://www.w3.org/2000/svg" : "math" == x2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (s3 = 0; s3 < e3.length; s3++) if ((y3 = e3[s3]) && "setAttribute" in y3 == !!x2 && (x2 ? y3.localName == x2 : 3 == y3.nodeType)) {
        u3 = y3, e3[s3] = null;
        break;
      }
    }
    if (null == u3) {
      if (null == x2) return document.createTextNode(k3);
      u3 = document.createElementNS(o3, x2, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null == x2) m3 === k3 || c3 && u3.data == k3 || (u3.data = k3);
    else {
      if (e3 = "textarea" == x2 && null != k3.defaultValue ? null : e3 && n.call(u3.childNodes), !c3 && null != e3) for (m3 = {}, s3 = 0; s3 < u3.attributes.length; s3++) m3[(y3 = u3.attributes[s3]).name] = y3.value;
      for (s3 in m3) y3 = m3[s3], "dangerouslySetInnerHTML" == s3 ? p3 = y3 : "children" == s3 || s3 in k3 || "value" == s3 && "defaultValue" in k3 || "checked" == s3 && "defaultChecked" in k3 || N(u3, s3, null, y3, o3);
      for (s3 in k3) y3 = k3[s3], "children" == s3 ? v3 = y3 : "dangerouslySetInnerHTML" == s3 ? h3 = y3 : "value" == s3 ? w3 = y3 : "checked" == s3 ? _2 = y3 : c3 && "function" != typeof y3 || m3[s3] === y3 || N(u3, s3, y3, m3[s3], o3);
      if (h3) c3 || p3 && (h3.__html == p3.__html || h3.__html == u3.innerHTML) || (u3.innerHTML = h3.__html), t3.__k = [];
      else if (p3 && (u3.innerHTML = ""), L("template" == t3.type ? u3.content : u3, g(v3) ? v3 : [v3], t3, i3, r3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o3, e3, f3, e3 ? e3[0] : i3.__k && $(i3, 0), c3, a3), null != e3) for (s3 = e3.length; s3--; ) b(e3[s3]);
      c3 && "textarea" != x2 || (s3 = "value", "progress" == x2 && null == w3 ? u3.removeAttribute("value") : null != w3 && (w3 !== u3[s3] || "progress" == x2 && !w3 || "option" == x2 && w3 != m3[s3]) && N(u3, s3, w3, m3[s3], o3), s3 = "checked", null != _2 && _2 != u3[s3] && N(u3, s3, _2, m3[s3], o3));
    }
    return u3;
  }
  function J(n2, u3, t3) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u3 || (n2.__u = n2(u3));
      } else n2.current = u3;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function K(n2, u3, t3) {
    var i3, r3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || J(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && K(i3[r3], u3, t3 || "function" != typeof n2.type);
    t3 || b(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function Q(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function R(u3, t3, i3) {
    var r3, o3, e3, f3;
    t3 == document && (t3 = document.documentElement), l.__ && l.__(u3, t3), o3 = (r3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, e3 = [], f3 = [], q(t3, u3 = (!r3 && i3 || t3).__k = k(S, null, [u3]), o3 || d, d, t3.namespaceURI, !r3 && i3 ? [i3] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i3 ? i3 : o3 ? o3.__e : t3.firstChild, r3, f3), D(e3, u3, f3);
  }
  n = w.slice, l = { __e: function(n2, l3, u3, t3) {
    for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
      if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, C.prototype.setState = function(n2, l3) {
    var u3;
    u3 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m({}, this.state), "function" == typeof n2 && (n2 = n2(m({}, u3), this.props)), n2 && m(u3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), A(this));
  }, C.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), A(this));
  }, C.prototype.render = S, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, H.__r = 0, f = Math.random().toString(8), c = "__d" + f, a = "__a" + f, s = /(PointerCapture)$|Capture$/i, h = 0, p = V(false), v = V(true), y = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = l;
  var e2 = c2.__b;
  var a2 = c2.__r;
  var v2 = c2.diffed;
  var l2 = c2.__c;
  var m2 = c2.unmount;
  var s2 = c2.__;
  function p2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u3.__.length && u3.__.push({}), u3.__[n2];
  }
  function d2(n2) {
    return o2 = 1, h2(D2, n2);
  }
  function h2(n2, u3, i3) {
    var o3 = p2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u3) : D2(void 0, u3), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.__f)) {
      var f3 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u4 = o3.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u4.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r3);
        var i4 = o3.__c.props !== n3;
        return u4.some(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
          }
        }), c3 && c3.call(this, n3, t3, r3) || i4;
      };
      r2.__f = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u4 = c3;
          c3 = void 0, f3(n3, t3, r3), c3 = u4;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f3;
    }
    return o3.__N || o3.__;
  }
  function y2(n2, u3) {
    var i3 = p2(t2++, 3);
    !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.u = u3, r2.__H.__h.push(i3));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r3) {
    var u3 = p2(t2++, 7);
    return C2(u3.__H, r3) && (u3.__ = n2(), u3.__H = r3, u3.__h = n2), u3.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) {
      var t3 = n2.__H;
      if (n2.__P && t3) try {
        t3.__h.some(z2), t3.__h.some(B2), t3.__h = [];
      } catch (r3) {
        t3.__h = [], c2.__e(r3, n2.__v);
      }
    }
  }
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i3.__h.some(z2), i3.__h.some(B2), i3.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.some(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], c2.__e(r3, n3.__v);
      }
    }), l2 && l2(n2, t3);
  }, c2.unmount = function(n2) {
    m2 && m2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.some(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u3), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r3, 35);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // src/content/components/header.jsx
  function Header({ accountHref }) {
    let color = getComputedStyle(root).getPropertyValue("--idu-logo").trim();
    let currentTheme = localStorage.getItem("theme");
    let svgSize = 36;
    let menuStrokeWidth = 4;
    let panelIconStrokeWidth = 2.5;
    let panelIconColor = "currentColor";
    let actionIconStrokeWidth = 2.2;
    let [editMode, setEditMode] = d2(false);
    if (currentTheme === "Ocean") {
      color = "#91dba4";
    } else if (currentTheme === "Besties") {
      color = "#ffe2df";
    } else if (currentTheme === "Dzaga") {
      color = "#f4e9cd";
    } else if (currentTheme === "Default") {
      color = "#ffffff";
    }
    const [menuOpen, setMenuOpen] = d2(false);
    const [settingsOpen, setSettingsOpen] = d2(false);
    function openSettings() {
      setSettingsOpen(true);
      setMenuOpen(false);
    }
    function switchEditMode() {
      window.editMode = !editMode;
      if (editMode) {
        document.body.classList.remove("edit-mode");
      } else {
        document.body.classList.add("edit-mode");
      }
      setEditMode(!editMode);
    }
    if (window.location.pathname === "/" || window.location.pathname === "/users/sign_in") {
      return /* @__PURE__ */ k("header", { id: "top", className: "idu-custom-header" }, /* @__PURE__ */ k("div", { className: "header-menu" }, /* @__PURE__ */ k(
        "a",
        {
          className: "header-menu-button",
          onClick: () => setMenuOpen(!menuOpen)
        },
        /* @__PURE__ */ k("svg", { width: svgSize + 4, height: svgSize + 4, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M4 12H20M4 8H20M4 16H12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))
      ), /* @__PURE__ */ k("div", { className: `header-menu-panel ${menuOpen ? "open" : ""}` }, /* @__PURE__ */ k("a", { href: accountHref, className: "header-panel-link" }, /* @__PURE__ */ k("svg", { xmlns: "http://www.w3.org/2000/svg", width: svgSize, height: svgSize, viewBox: "0 0 24 24" }, /* @__PURE__ */ k("g", { fill: "none", stroke: "currentColor", "stroke-width": "2" }, /* @__PURE__ */ k("path", { "stroke-linejoin": "round", d: "M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" }), /* @__PURE__ */ k("circle", { cx: "12", cy: "7", r: "3" })))), /* @__PURE__ */ k("a", { onClick: () => openSettings(), className: "header-panel-link" }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z", fill: panelIconColor }), /* @__PURE__ */ k("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z", fill: panelIconColor }))), /* @__PURE__ */ k("a", { href: "/users/sign_out", className: "header-panel-link", onClick: () => localStorage.setItem("autoLogin", "no") }, /* @__PURE__ */ k("svg", { xmlns: "http://www.w3.org/2000/svg", width: svgSize, height: svgSize, viewBox: "0 0 24 24" }, /* @__PURE__ */ k("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9" }))))), /* @__PURE__ */ k("a", { className: "header-logo-link", href: "/" }, /* @__PURE__ */ k("svg", { className: "header-logo", version: "1.1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 200 75", width: "150", height: "48" }, /* @__PURE__ */ k("path", { d: "M0 0 C27.11111111 0 27.11111111 0 36.3125 6.25 C43.01477426 13.10814111 44.28837728 20.68188086 44.3190918 29.99975586 C44.17553983 37.69136285 42.38122426 45.26760454 37.6875 51.5 C26.47705734 61.92831875 16.25130168 59 0 59 C0 39.53 0 20.06 0 0 Z M12 9 C12 22.86 12 36.72 12 51 C20.70565579 50.36888152 20.70565579 50.36888152 27 46 C32.46135334 38.47313482 32.59520724 31.02730988 32 22 C30.82103747 16.29502031 27.59613457 13.25559532 23 10 C19.26213521 8.57836298 19.26213521 8.57836298 12 9 Z ", fill: color, transform: "translate(43,7)" }), /* @__PURE__ */ k("path", { d: "M0 0 C3.96 0 7.92 0 12 0 C12.00410889 1.33699951 12.00821777 2.67399902 12.01245117 4.05151367 C12.03424542 9.01853836 12.08853883 13.98477123 12.15258789 18.95141602 C12.17576522 21.09977624 12.19016297 23.24825004 12.19555664 25.39672852 C12.20484791 28.48786173 12.24584351 31.57720912 12.29296875 34.66796875 C12.2890361 35.62648239 12.28510345 36.58499603 12.28105164 37.57255554 C12.38213016 42.20659503 12.47613492 44.32470224 15.3918457 48.08325195 C18.18217732 50.13388319 19.5444055 51 23 51 C27.04234961 49.70644812 28.60049458 48.73265351 30.64770508 44.97827148 C32.43217602 40.48664698 32.47620984 36.13055762 32.51171875 31.34765625 C32.52966995 30.44752304 32.54762115 29.54738983 32.56611633 28.61997986 C32.61995245 25.76753309 32.65402888 22.91525107 32.6875 20.0625 C32.72069668 18.11911783 32.7551885 16.17575733 32.79101562 14.23242188 C32.87566341 9.48840064 32.94260136 4.744426 33 0 C36.63 0 40.26 0 44 0 C44.09924314 6.54699332 44.17164631 13.09354394 44.21972656 19.64111328 C44.23978046 21.86612582 44.26703065 24.09108607 44.30175781 26.31591797 C44.35054934 29.52324365 44.37303162 32.72986951 44.390625 35.9375 C44.41127014 36.92427734 44.43191528 37.91105469 44.45318604 38.92773438 C44.45516041 45.07304735 43.6745456 49.93592685 40 55 C34.22596433 59.59566104 29.49629138 60.22538854 22.3125 60.3125 C21.53455078 60.34150391 20.75660156 60.37050781 19.95507812 60.40039062 C14.20196873 60.46276796 9.76372678 59.31892109 5 56 C1.09633418 51.19548822 -0.130206 47.39498358 -0.11352539 41.32324219 C-0.11341209 39.94226349 -0.11341209 39.94226349 -0.11329651 38.53338623 C-0.10813522 37.54783752 -0.10297394 36.56228882 -0.09765625 35.546875 C-0.0962413 34.53151672 -0.09482635 33.51615845 -0.09336853 32.47003174 C-0.08777516 29.22999108 -0.07522385 25.99001975 -0.0625 22.75 C-0.05748414 20.55208433 -0.05292139 18.35416758 -0.04882812 16.15625 C-0.0378079 10.77080666 -0.02054778 5.38541508 0 0 Z ", fill: color, transform: "translate(94,7)" }), /* @__PURE__ */ k("path", { d: "M0 0 C3.94211019 3.10336334 5.31134915 5.48402546 6.390625 10.359375 C7.72546791 23.61881461 -4.0914371 37.85590565 -11.0625 48.3125 C-4.1325 48.6425 2.7975 48.9725 9.9375 49.3125 C9.9375 51.9525 9.9375 54.5925 9.9375 57.3125 C-2.9325 57.3125 -15.8025 57.3125 -29.0625 57.3125 C-27.93749179 51.68745897 -27.93749179 51.68745897 -26.09375 48.81640625 C-25.6915625 48.1819458 -25.289375 47.54748535 -24.875 46.89379883 C-24.441875 46.22759521 -24.00875 45.5613916 -23.5625 44.875 C-23.1190625 44.17850342 -22.675625 43.48200684 -22.21875 42.7644043 C-19.99023635 39.27166814 -17.72997867 35.79973527 -15.46875 32.328125 C-15.06333984 31.70349365 -14.65792969 31.0788623 -14.24023438 30.43530273 C-13.12430377 28.71999896 -11.99989485 27.01021967 -10.875 25.30078125 C-7.7622039 20.16869286 -6.50105204 16.37613795 -7.0625 10.3125 C-7.96007556 8.16469923 -7.96007556 8.16469923 -10.0625 7.3125 C-14.11169215 7.38612168 -16.2751588 7.5251588 -19.1875 10.4375 C-19.80625 11.05625 -20.425 11.675 -21.0625 12.3125 C-24.52836985 12.3125 -25.78433395 11.56059405 -28.375 9.25 C-28.931875 8.610625 -29.48875 7.97125 -30.0625 7.3125 C-29.40334272 4.67587087 -28.72418551 2.83093401 -26.546875 1.125 C-18.63632381 -3.55254331 -8.3515074 -4.27369248 0 0 Z ", fill: color, transform: "translate(174.0625,8.6875)" }), /* @__PURE__ */ k("path", { d: "M0 0 C3.63 0 7.26 0 11 0 C11 19.47 11 38.94 11 59 C7.04 59 3.08 59 -1 59 C-1.02255549 51.45501411 -1.04091769 43.91004069 -1.05181217 36.36502934 C-1.05703989 32.86191115 -1.0641355 29.35881715 -1.07543945 25.85571289 C-1.08834206 21.83219159 -1.09322912 17.80869586 -1.09765625 13.78515625 C-1.10539818 11.88987938 -1.10539818 11.88987938 -1.11329651 9.95631409 C-1.11337204 8.795186 -1.11344757 7.63405792 -1.11352539 6.43774414 C-1.11685631 4.8955294 -1.11685631 4.8955294 -1.12025452 3.32215881 C-1 1 -1 1 0 0 Z ", fill: color, transform: "translate(21,7)" }))), /* @__PURE__ */ k("div", { className: "header-actions" }, /* @__PURE__ */ k("a", { onClick: () => {
        switchEditMode();
      }, className: `header-icon-button ${editMode ? "active" : ""}` }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }), /* @__PURE__ */ k("path", { d: "M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })))), /* @__PURE__ */ k(Settings, { open: settingsOpen, setOpen: setSettingsOpen }));
    } else {
      return /* @__PURE__ */ k("header", { id: "top", className: "idu-custom-header mini" }, /* @__PURE__ */ k("div", { className: "header-menu" }, /* @__PURE__ */ k(
        "a",
        {
          className: "header-menu-button",
          onClick: () => setMenuOpen(!menuOpen)
        },
        /* @__PURE__ */ k("svg", { width: svgSize + 4, height: svgSize + 4, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M4 12H20M4 8H20M4 16H12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))
      ), /* @__PURE__ */ k("a", { onClick: () => {
        window.open("/", "_self");
      }, className: `header-home-icon-button` }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M9 20H7C5.89543 20 5 19.1046 5 18V10.9199C5 10.336 5.25513 9.78132 5.69842 9.40136L10.6984 5.11564C11.4474 4.47366 12.5526 4.47366 13.3016 5.11564L18.3016 9.40136C18.7449 9.78132 19 10.336 19 10.9199V18C19 19.1046 18.1046 20 17 20H15M9 20V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V20M9 20H15", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("div", { className: `header-menu-panel ${menuOpen ? "open" : ""}` }, /* @__PURE__ */ k("a", { href: accountHref, className: "header-panel-link" }, /* @__PURE__ */ k("svg", { xmlns: "http://www.w3.org/2000/svg", width: svgSize, height: svgSize, viewBox: "0 0 24 24" }, /* @__PURE__ */ k("g", { fill: "none", stroke: "currentColor", "stroke-width": "2" }, /* @__PURE__ */ k("path", { "stroke-linejoin": "round", d: "M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" }), /* @__PURE__ */ k("circle", { cx: "12", cy: "7", r: "3" })))), /* @__PURE__ */ k("a", { onClick: () => openSettings(), className: "header-panel-link" }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z", fill: panelIconColor }), /* @__PURE__ */ k("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z", fill: panelIconColor }))), /* @__PURE__ */ k("a", { href: "/users/sign_out", className: "header-panel-link", onClick: () => localStorage.setItem("autoLogin", "no") }, /* @__PURE__ */ k("svg", { xmlns: "http://www.w3.org/2000/svg", width: svgSize, height: svgSize, viewBox: "0 0 24 24" }, /* @__PURE__ */ k("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9" }))))), /* @__PURE__ */ k("div", { className: "header-actions" }, /* @__PURE__ */ k("a", { onClick: () => {
        switchEditMode();
      }, className: `header-icon-button ${editMode ? "active" : ""}` }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }), /* @__PURE__ */ k("path", { d: "M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })))), /* @__PURE__ */ k(Settings, { open: settingsOpen, setOpen: setSettingsOpen }));
    }
  }
  function Settings({ open, setOpen }) {
    let svgSize = 36;
    return /* @__PURE__ */ k("div", { className: `settings-container ${open ? "open" : ""}` }, /* @__PURE__ */ k(SettingsDots, null), /* @__PURE__ */ k("a", { className: "header-icon-button-settings", onClick: () => setOpen(false) }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { fill: "currentColor", d: "M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" }))));
  }
  function SettingsDots() {
    const themes = ["Default", "Dzaga", "Ocean", "Besties"];
    const dots = ["#000000", "#468189FF", "#3ABB75FF", "#FF678DFF"];
    const currentTheme = localStorage.getItem("theme") || "Default";
    const [selectedDot, setSelectedDot] = d2(
      Math.max(0, themes.indexOf(currentTheme))
    );
    return /* @__PURE__ */ k("div", { className: "settings-dots" }, dots.map((color, index) => /* @__PURE__ */ k(
      "button",
      {
        key: index,
        type: "button",
        className: `settings-dot ${selectedDot === index ? "active" : ""}`,
        style: { backgroundColor: color },
        onClick: () => {
          setSelectedDot(index);
          window.loadWebsiteTheme(themes[index]);
        }
      }
    )));
  }

  // src/content/components/widgets/widgetResize.js
  function getPreviewSize(width, height, cellSize, gap) {
    return {
      width: (cellSize - 20) * width + gap * (width - 1),
      height: (cellSize - 20) * height + gap * (height - 1)
    };
  }
  function useWidgetResize(possibleLayout, name, gap = 16, fullSize, popup = true, defaultSize = { w: 2, h: 2 }) {
    function getCellSize() {
      const gridWidth = window.innerWidth;
      return gridWidth / 4;
    }
    const [width, setWidth] = d2(loadWidgetSize(name)?.w || defaultSize.w);
    const [height, setHeight] = d2(loadWidgetSize(name)?.h || defaultSize.h);
    const [previewWidth, setPreviewWidth] = d2(getPreviewSize(loadWidgetSize(name)?.w || defaultSize.w, loadWidgetSize(name)?.h || defaultSize.h, getCellSize(), gap).width);
    const [previewHeight, setPreviewHeight] = d2(getPreviewSize(loadWidgetSize(name)?.w || defaultSize.w, loadWidgetSize(name)?.h || defaultSize.h, getCellSize(), gap).height);
    const [openPopup, setOpenPopup] = d2(false);
    const resizingRef = A2(false);
    const widgetRef = A2(null);
    const resizeZoneRef = A2(null);
    const widgetLastSizeRef = A2(defaultSize);
    const widthRef = A2(width);
    const heightRef = A2(height);
    const openPopupRef = A2(openPopup);
    widthRef.current = width;
    heightRef.current = height;
    openPopupRef.current = openPopup;
    function calcCornerPositions() {
      const widget = widgetRef.current;
      if (!widget) return [];
      const cellSize = getCellSize();
      const positions = [];
      for (let i3 = 0; i3 < possibleLayout.length; i3++) {
        const layout = possibleLayout[i3];
        const x2 = layout.w * cellSize;
        const y3 = layout.h * cellSize;
        const realX = widget.getBoundingClientRect().left + x2;
        const realY = widget.getBoundingClientRect().top + y3;
        positions.push({ realX, realY });
      }
      return positions;
    }
    function dynamicSizeUpdate(e3) {
      if (!resizingRef.current) return;
      const positions = calcCornerPositions();
      if (!positions.length) return;
      const pointerPos = { x: e3.clientX, y: e3.clientY };
      const bestOption = { index: -1, distance: 99999 };
      for (let i3 = 0; i3 < positions.length; i3++) {
        const position = positions[i3];
        const distance = Math.hypot(
          pointerPos.x - position.realX,
          pointerPos.y - position.realY
        );
        if (distance < bestOption.distance) {
          bestOption.index = i3;
          bestOption.distance = distance;
        }
      }
      const nextLayout = possibleLayout[bestOption.index];
      const preview = getPreviewSize(nextLayout.w, nextLayout.h, getCellSize(), gap);
      setWidth(nextLayout.w);
      setHeight(nextLayout.h);
      setPreviewWidth(preview.width);
      setPreviewHeight(preview.height);
      saveWidgetSize(nextLayout.w, nextLayout.h);
    }
    function saveWidgetSize(w3, h3) {
      localStorage.setItem(name, JSON.stringify({ w: w3, h: h3 }));
    }
    function loadWidgetSize() {
      const raw = localStorage.getItem(name);
      if (!raw) return defaultSize;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    y2(() => {
      const resizeZone = resizeZoneRef.current;
      if (!resizeZone) return void 0;
      function startResize() {
        if (!window.editMode) return;
        resizingRef.current = true;
      }
      function stopResize() {
        resizingRef.current = false;
      }
      function togglePopup(e3) {
        if (window.editMode) return;
        if (e3.target.closest("a[href]")) return;
        if (!popup) return;
        let finalSize;
        if (openPopupRef.current) {
          finalSize = widgetLastSizeRef.current;
        } else {
          finalSize = fullSize;
          widgetLastSizeRef.current = { w: widthRef.current, h: heightRef.current };
        }
        const preview = getPreviewSize(finalSize.w, finalSize.h, getCellSize(), gap);
        setWidth(finalSize.w);
        setHeight(finalSize.h);
        setPreviewWidth(preview.width);
        setPreviewHeight(preview.height);
        setOpenPopup(!openPopupRef.current);
      }
      resizeZone.addEventListener("pointerdown", startResize);
      document.addEventListener("pointerup", stopResize);
      document.addEventListener("pointermove", dynamicSizeUpdate);
      widgetRef.current.addEventListener("click", togglePopup);
      return () => {
        resizeZone.removeEventListener("pointerdown", startResize);
        document.removeEventListener("pointerup", stopResize);
        document.removeEventListener("pointermove", dynamicSizeUpdate);
        widgetRef.current.removeEventListener("click", togglePopup);
      };
    }, []);
    return {
      width,
      height,
      previewWidth,
      previewHeight,
      widgetRef,
      resizeZoneRef,
      resizingRef
    };
  }

  // src/content/components/widgets/widgetDragging.js
  function useWidgetDragging(widgetRef, width, height, resizeRef, resizingZoneRef, moveWidget2, widgetID) {
    let dragging = false;
    let widgetClone = null;
    const widthRef = A2(width);
    const heightRef = A2(height);
    widthRef.current = width;
    heightRef.current = height;
    let visualUpdateTimer;
    function getCellSize() {
      const gridWidth = window.innerWidth;
      return gridWidth / 4;
    }
    function getPreviewSize2(width2, height2, cellSize, gap) {
      return {
        width: (cellSize - 20) * width2 + gap * (width2 - 1),
        height: (cellSize - 20) * height2 + gap * (height2 - 1)
      };
    }
    y2(() => {
      const widget = widgetRef.current;
      if (!widget) return;
      function updateLayout() {
        const widgets = document.querySelectorAll("div.widget");
        let betWidgetIndex = -1;
        let bestWidgetOverlap = 0;
        const currentWidgetIndex = Array.from(widgets).findIndex(
          (widget2) => widget2.dataset.widgetId === widgetID
        );
        for (let i3 = 0; i3 < widgets.length; i3++) {
          const overlapArea = getOverlapArea(widgetClone, widgets[i3]);
          if (overlapArea > bestWidgetOverlap) {
            bestWidgetOverlap = overlapArea;
            betWidgetIndex = i3;
          }
        }
        if (currentWidgetIndex < betWidgetIndex && widthRef.current > getCellSize() * 2) {
          if (!widgets[betWidgetIndex + 1]) {
            return null;
          }
          moveWidget2(widgetID, widgets[betWidgetIndex + 1].dataset.widgetId);
        } else if (currentWidgetIndex !== betWidgetIndex) {
          moveWidget2(widgetID, widgets[betWidgetIndex].dataset.widgetId);
        }
        widgetRef.current.children[0].querySelectorAll("*").forEach((child) => {
          child.style.opacity = "0";
        });
      }
      function getOverlapArea(el1, el2) {
        const r1 = el1.getBoundingClientRect();
        const r22 = el2.getBoundingClientRect();
        let newRight = r1.left + getPreviewSize2(2, 2, getCellSize(), 16).width;
        let newBottom = r1.top + getPreviewSize2(2, 2, getCellSize(), 16).height;
        const overlapWidth = Math.max(
          0,
          Math.min(newRight, r22.right) - Math.max(r1.left, r22.left)
        );
        const overlapHeight = Math.max(
          0,
          Math.min(newBottom, r22.bottom) - Math.max(r1.top, r22.top)
        );
        return overlapWidth * overlapHeight;
      }
      function startDragging(e3) {
        if (!window.editMode) return;
        if (resizingZoneRef.current?.contains(e3.target)) return;
        if (resizeRef.current) return;
        dragging = true;
        widgetClone = widgetRef.current.children[0].cloneNode(false);
        widgetClone.className = "widget-clone inner-widget wiggle";
        document.body.appendChild(widgetClone);
        widgetRef.current.children[0].style.opacity = "0.3";
        widgetRef.current.children[0].querySelectorAll("*").forEach((child) => {
          child.style.opacity = "0";
        });
      }
      function stopDragging() {
        dragging = false;
        if (widgetClone) {
          document.body.removeChild(widgetClone);
          widgetClone = null;
          widgetRef.current.children[0].style.opacity = "1";
          widgetRef.current.children[0].querySelectorAll("*").forEach((child) => {
            child.style.opacity = "1";
          });
          clearTimeout(visualUpdateTimer);
        }
      }
      function updatePos(e3) {
        if (dragging) {
          if (widthRef.current <= getCellSize() * 2) {
            widgetClone.style.left = e3.clientX - widthRef.current / 2 + "px";
          } else {
            widgetClone.style.left = "16px";
          }
          widgetClone.style.top = e3.clientY + window.scrollY - heightRef.current / 2 + "px";
          clearTimeout(visualUpdateTimer);
          visualUpdateTimer = setTimeout(() => {
            updateLayout();
          }, 200);
        }
      }
      widget.addEventListener("pointerdown", startDragging);
      document.addEventListener("pointermove", updatePos);
      document.addEventListener("pointerup", stopDragging);
      return () => {
        widget.removeEventListener("pointerdown", startDragging);
      };
    }, []);
  }

  // src/content/components/widgets/grades.jsx
  function Grades({ widgetId, moveWidget: moveWidget2, data }) {
    const gradesData = data.grades;
    const possibleLayout = [
      { w: 2, h: 2 },
      { w: 2, h: 4 },
      { w: 4, h: 2 },
      { w: 2, h: 1 },
      { w: 4, h: 1 }
    ];
    const fullSize = { w: 4, h: 6 };
    const {
      width,
      height,
      previewWidth,
      previewHeight,
      widgetRef,
      resizeZoneRef,
      resizingRef
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function normalizeGrade(grade) {
      const value = grade.trim().toLowerCase();
      if (/^[0-9]+[+-]?$/.test(value) || value === "+" || value === "-") {
        return value;
      }
      if (["zal", "zaliczone"].includes(value)) {
        return "zal";
      }
      if (["brak pracy"].includes(value)) {
        return "BP";
      }
      if (["nzal", "niezal", "niezaliczone"].includes(value)) {
        return "nzal";
      }
      return "...";
    }
    const preparedGrades = gradesData.map((item) => ({
      value: normalizeGrade(item.grade),
      subject: item.subject.split(" ")[0],
      subjectUrl: item.subjectUrl,
      description: item.description,
      gradeDescriptionUrl: item.gradeDescriptionUrl
    }));
    function GradeRow({ item, isLast = false, showDescription = false }) {
      const descriptionLinkRef = A2(null);
      y2(() => {
        if (!showDescription) return;
        if (!descriptionLinkRef.current) return;
        if (!window.jQuery?.fn?.fancybox) return;
        const options = {
          onComplete: function() {
            if (window.CKEDITOR) {
              window.ckeditorsInFancybox = window.ckeditorsInFancybox || [];
              window.jQuery("textarea.ckeditor").each(function(index, element) {
                const $element = window.jQuery(element);
                if (!$element.data("ckeditorInstance")) {
                  $element.ckeditor();
                  window.ckeditorsInFancybox.push($element.attr("id"));
                }
              });
            }
            if (window.jQuery.datepicker && typeof attachDatepickers === "function") {
              attachDatepickers();
            }
          },
          onClosed: function() {
            if (window.CKEDITOR && Array.isArray(window.ckeditorsInFancybox)) {
              let id;
              while (id = window.ckeditorsInFancybox.pop()) {
                const instance = CKEDITOR.instances[id];
                if (instance) {
                  CKEDITOR.remove(instance);
                }
              }
            }
          }
        };
        window.jQuery(descriptionLinkRef.current).fancybox(options);
      }, [showDescription, item.gradeDescriptionUrl]);
      return /* @__PURE__ */ k("div", { className: `widget-grade-box ${isLast ? "last" : ""}` }, /* @__PURE__ */ k("p", null, item.value), /* @__PURE__ */ k("a", { href: item.subjectUrl }, " | ", item.subject), showDescription && /* @__PURE__ */ k(
        "a",
        {
          ref: descriptionLinkRef,
          href: item.gradeDescriptionUrl,
          className: "grade-description fancybox"
        },
        item.description
      ));
    }
    function GradesList({ limit, lastLine = 1, showDescription = false, allHref = false }) {
      const visibleGrades = preparedGrades.slice(0, limit);
      return /* @__PURE__ */ k(
        "div",
        {
          style: { width: `${previewWidth}px`, height: `${previewHeight}px` },
          className: "widget-content-container"
        },
        /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Oceny")),
        visibleGrades.map((item, index) => /* @__PURE__ */ k(
          GradeRow,
          {
            key: `${item.subjectUrl}-${index}`,
            item,
            isLast: index === visibleGrades.length - lastLine || index === visibleGrades.length - 1,
            showDescription
          }
        )),
        allHref && /* @__PURE__ */ k("a", { className: "grades-all-link", href: gradesData[0].seeMoreUrl }, "Wszystkie oceny")
      );
    }
    function Grades222() {
      return /* @__PURE__ */ k(GradesList, { limit: 2 });
    }
    function Grades24() {
      return /* @__PURE__ */ k(GradesList, { limit: 5 });
    }
    function Grades42() {
      return /* @__PURE__ */ k(GradesList, { limit: 4, lastLine: 2 });
    }
    function Grades21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "OCENY"));
    }
    function Grades41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "OCENY"));
    }
    function Grades46() {
      return /* @__PURE__ */ k(GradesList, { limit: 6, lastLine: 2, showDescription: true, allHref: true });
    }
    const gradeVariants = {
      "22": Grades222,
      "24": Grades24,
      "42": Grades42,
      "21": Grades21,
      "41": Grades41,
      "46": Grades46
    };
    const Variant = gradeVariants[`${width}${height}`] || Grades222;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "gradesWidget", "data-widget-id": widgetId, className: `widget w${width} h${height}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/widgets/subjects.jsx
  function Subjects({ widgetId, moveWidget: moveWidget2, data }) {
    const subjects = data.subjects;
    const possibleLayout = [
      { w: 4, h: 4 },
      { w: 2, h: 1 },
      { w: 4, h: 1 }
    ];
    const fullSize = { w: 4, h: 5 };
    const {
      width,
      height,
      previewWidth,
      previewHeight,
      widgetRef,
      resizeZoneRef,
      resizingRef
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function SubjectRow({ item, isLast = false, showDescription = false }) {
      return /* @__PURE__ */ k("div", { className: `widget-subject-box ${isLast ? "last" : ""}` }, /* @__PURE__ */ k("a", { href: item.url }, item.name));
    }
    function SubjectsList({ lastLine = 1, classInfo = false }) {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Przedmioty")), classInfo ? /* @__PURE__ */ k("a", { href: subjects.classInfo.url, className: "widget-subjects-class" }, subjects.classInfo.name) : null, /* @__PURE__ */ k("div", { className: "widget-subjects-list" }, subjects.subjects.map((item, index) => /* @__PURE__ */ k(
        SubjectRow,
        {
          key: `${item.name}-${index}`,
          item,
          isLast: index === subjects.subjects.length - lastLine || index === subjects.subjects.length - 1
        }
      ))));
    }
    function Subjects44() {
      return /* @__PURE__ */ k(SubjectsList, { lastLine: 2 });
    }
    function Subjects21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Przedmiot"));
    }
    function Subjects41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Przedmioty"));
    }
    function Subjects45() {
      return /* @__PURE__ */ k(SubjectsList, { lastLine: 2, classInfo: true });
    }
    const gradeVariants = {
      "44": Subjects44,
      "21": Subjects21,
      "41": Subjects41,
      "45": Subjects45
    };
    const Variant = gradeVariants[`${width}${height}`] || Subjects21;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "subjectsWidget", "data-widget-id": widgetId, className: `widget w${width} h${height}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/widgets/schedule.jsx
  function Schedule({ widgetId, moveWidget: moveWidget2, data }) {
    const schedule = data.schedule;
    const possibleLayout = [
      { w: 4, h: 4 },
      { w: 2, h: 1 },
      { w: 4, h: 1 },
      { w: 2, h: 4 }
    ];
    const fullSize = { w: 4, h: 6 };
    const {
      width,
      height,
      previewWidth,
      previewHeight,
      widgetRef,
      resizeZoneRef,
      resizingRef
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function formatTodayKey() {
      const today = /* @__PURE__ */ new Date();
      return `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}`;
    }
    function compareTimes(left, right) {
      const leftStart = left.split("-")[0];
      const rightStart = right.split("-")[0];
      const [leftHour, leftMinute] = leftStart.split(":").map(Number);
      const [rightHour, rightMinute] = rightStart.split(":").map(Number);
      return leftHour * 60 + leftMinute - (rightHour * 60 + rightMinute);
    }
    function ScheduleGrid({ scheduleData, mode = "today" }) {
      const allDays = Object.keys(scheduleData || {});
      const todayKey = formatTodayKey();
      const visibleDays = mode === "today" ? allDays.filter((day) => day === todayKey) : allDays;
      const fallbackDays = mode === "today" && visibleDays.length === 0 && allDays.length > 0 ? [allDays[0]] : visibleDays;
      const scheduleDays = fallbackDays;
      const visibleTimes = Array.from(
        new Set(
          scheduleDays.flatMap((day) => Object.keys(scheduleData?.[day] || {}))
        )
      ).sort(compareTimes);
      if (scheduleDays.length === 0 || visibleTimes.length === 0) {
        return null;
      }
      return /* @__PURE__ */ k(
        "div",
        {
          className: "schedule-grid",
          style: {
            gridTemplateColumns: `72px repeat(${scheduleDays.length}, 1fr)`
          }
        },
        /* @__PURE__ */ k("div", { className: "schedule-head" }),
        scheduleDays.map((day) => {
          const firstLesson = Object.values(scheduleData?.[day] || {})[0];
          const label = firstLesson?.day || day;
          return /* @__PURE__ */ k("div", { key: day, className: "schedule-head" }, label);
        }),
        visibleTimes.map((time) => /* @__PURE__ */ k(S, { key: time }, /* @__PURE__ */ k("div", { className: "time-cell" }, time), scheduleDays.map((day) => {
          const lesson = scheduleData?.[day]?.[time];
          return /* @__PURE__ */ k("div", { key: `${day}-${time}`, className: "lesson-cell" }, lesson?.subject || "");
        })))
      );
    }
    function Schedule44() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Plan Lekcji")));
    }
    function Schedule21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Plan Lekcji"));
    }
    function Schedule41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Plan Lekcji"));
    }
    function Schedule24() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Plan Lekcji")), /* @__PURE__ */ k(ScheduleGrid, { scheduleData: schedule, mode: "today" }));
    }
    function Schedule46() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Plan Lekcji"));
    }
    const gradeVariants = {
      "44": Schedule44,
      "21": Schedule21,
      "41": Schedule41,
      "46": Schedule46,
      "24": Schedule24
    };
    const Variant = gradeVariants[`${width}${height}`] || Schedule21;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "scheduleWidget", "data-widget-id": widgetId, className: `widget w${width} h${height}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/widgets/subjectNews.jsx
  function SubjectNews({ widgetId, moveWidget: moveWidget2, data }) {
    const subjectNews = data.subjectAnnouncements;
    const possibleLayout = [
      { w: 2, h: 2 },
      { w: 4, h: 2 },
      { w: 2, h: 1 },
      { w: 4, h: 1 }
    ];
    const fullSize = { w: 4, h: 5 };
    const {
      width,
      height,
      previewWidth,
      previewHeight,
      widgetRef,
      resizeZoneRef,
      resizingRef
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function NewsRow({ item, isLast = false }) {
      return /* @__PURE__ */ k("div", { className: `widget-news-box ${isLast ? "last" : ""}` }, /* @__PURE__ */ k("a", { href: item.titleUrl }, item.title));
    }
    function NewsList({ limit, lastLine = 1 }) {
      const visibleNews = subjectNews.slice(0, limit);
      return /* @__PURE__ */ k(
        "div",
        {
          style: { width: `${previewWidth}px`, height: `${previewHeight}px` },
          className: "widget-content-container"
        },
        /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Og\u0142oszenia Przedmiotowe")),
        visibleNews.map((item, index) => /* @__PURE__ */ k(
          NewsRow,
          {
            key: `${item.subjectUrl}-${index}`,
            item,
            isLast: index === visibleNews.length - lastLine || index === visibleNews.length - 1
          }
        ))
      );
    }
    function Announcements22() {
      return /* @__PURE__ */ k(NewsList, { limit: 2 });
    }
    function Announcements42() {
      return /* @__PURE__ */ k(NewsList, { limit: 4, lastLine: 2 });
    }
    function Announcements21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Og\u0142oszenia Przedmiotowe"));
    }
    function Announcements41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Og\u0142oszenia Przedmiotowe"));
    }
    function Announcements45() {
      return /* @__PURE__ */ k(NewsList, { limit: 8, lastLine: 2 });
    }
    const gradeVariants = {
      "22": Announcements22,
      "42": Announcements42,
      "21": Announcements21,
      "41": Announcements41,
      "45": Announcements45
    };
    const Variant = gradeVariants[`${width}${height}`] || Announcements22;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "announcementsWidget", "data-widget-id": widgetId, className: `widget w${width} h${height}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/widgets/news.jsx
  function News({ widgetId, moveWidget: moveWidget2, data }) {
    const news = data.news;
    const possibleLayout = [
      { w: 2, h: 2 },
      { w: 4, h: 2 },
      { w: 2, h: 4 },
      { w: 4, h: 4 },
      { w: 2, h: 1 },
      { w: 4, h: 1 }
    ];
    const fullSize = { w: 4, h: 6 };
    const {
      width,
      height,
      previewWidth,
      previewHeight,
      widgetRef,
      resizeZoneRef,
      resizingRef
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function NewsRow({ item, isLast = false }) {
      return /* @__PURE__ */ k("div", { className: `widget-news-box ${isLast ? "last" : ""}` }, /* @__PURE__ */ k("a", { href: item.titleUrl }, item.title));
    }
    function NewsList({ limit, lastLine = 1, gradient = false, allHref = true }) {
      const visibleNews = news.slice(0, limit);
      return /* @__PURE__ */ k(
        "div",
        {
          style: { width: `${previewWidth}px`, height: `${previewHeight}px` },
          className: "widget-content-container"
        },
        /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Aktualno\u015Bci")),
        visibleNews.map((item, index) => /* @__PURE__ */ k(
          NewsRow,
          {
            key: `${item.subjectUrl}-${index}`,
            item,
            isLast: index === visibleNews.length - lastLine || index === visibleNews.length - 1
          }
        )),
        gradient && /* @__PURE__ */ k("div", { className: "widget-news-gradient" }),
        allHref && /* @__PURE__ */ k("a", { className: "grades-all-link", href: "/informations" }, "Zobacz Wszystkie")
      );
    }
    function Announcements22() {
      return /* @__PURE__ */ k(NewsList, { limit: 2, gradient: true });
    }
    function Announcements42() {
      return /* @__PURE__ */ k(NewsList, { limit: 4, lastLine: 2, gradient: true });
    }
    function Announcements24() {
      return /* @__PURE__ */ k(NewsList, { limit: 6, gradient: true });
    }
    function Announcements44() {
      return /* @__PURE__ */ k(NewsList, { limit: 8, lastLine: 2, gradient: true });
    }
    function Announcements21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Aktualno\u015Bci"));
    }
    function Announcements41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Aktualno\u015Bci"));
    }
    function Announcements46() {
      return /* @__PURE__ */ k(NewsList, { limit: 12, lastLine: 2, gradient: true });
    }
    const gradeVariants = {
      "22": Announcements22,
      "42": Announcements42,
      "21": Announcements21,
      "41": Announcements41,
      "44": Announcements44,
      "24": Announcements24,
      "46": Announcements46
    };
    const Variant = gradeVariants[`${width}${height}`] || Announcements22;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "newsWidget", "data-widget-id": widgetId, className: `widget w${width} h${height}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/widgets/attendance.jsx
  function Attendance({ widgetId, moveWidget: moveWidget2, data }) {
    const attendance = data.attendance;
    const possibleLayout = [
      { w: 2, h: 2 },
      { w: 2, h: 4 },
      { w: 4, h: 2 },
      { w: 2, h: 1 },
      { w: 4, h: 1 },
      { w: 4, h: 4 }
    ];
    const fullSize = { w: 4, h: 4 };
    const {
      width,
      height,
      previewWidth,
      previewHeight,
      widgetRef,
      resizeZoneRef,
      resizingRef
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function normalizeLessonName(lessonName) {
      let names = ["fizyczne", "WF", "godzina", "GW", "biznes", "BIZ", "kultura", "kultura"];
      for (let i3 = 0; i3 < names.length; i3 += 2) {
        if (lessonName.includes(names[i3])) {
          return names[i3 + 1];
        }
      }
      return lessonName;
    }
    async function fetchAttendanceStats() {
      const res = await fetch(attendance[0].seeMoreUrl, {
        credentials: "include"
      });
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const table = doc.querySelectorAll("table")[1];
      if (!table) return null;
      const summaryRow = table.querySelector("tbody tr");
      const summaryCells = summaryRow?.querySelectorAll("td span");
      if (summaryCells.length < 3) return null;
      const summary = {
        presence: Number(
          summaryCells?.[0].innerHTML.match(/\(([\d,]+)%\)/)?.[1].replace(",", ".")
        ),
        absence: Number(
          summaryCells?.[1].innerHTML.match(/\(([\d,]+)%\)/)?.[1].replace(",", ".")
        ),
        lateness: Number(
          summaryCells?.[2].innerHTML.match(/\(([\d,]+)%\)/)?.[1].replace(",", ".")
        )
      };
      return summary;
    }
    function AttendanceRow({ item, rowWidth }) {
      return /* @__PURE__ */ k("div", { className: "attendance-row", style: { width: rowWidth } }, /* @__PURE__ */ k("div", { className: "attendance-row-subject" }, normalizeLessonName(item.subject)), /* @__PURE__ */ k("div", { className: `attendance-row-value ${item.presence ? "ob" : ""} ${item.absence ? "nob" : ""} ${item.lateness ? "sp" : ""}` }, item.presence ? `OB` : "", " ", item.absence ? `NOB` : "", " ", item.lateness ? `SP` : ""));
    }
    function AttendanceGrid({ limit, width: width2 = "100%", graph = false, rowWidth = "100%", showMore = false }) {
      let usableData = attendance.slice(0, limit);
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "widget-title-box", style: { marginBottom: "var(--padding-1)" } }, /* @__PURE__ */ k("h1", null, "OBECNO\u015A\u0106")), /* @__PURE__ */ k("div", { className: "attendance-grid", style: { width: width2 } }, usableData.map((item, index) => /* @__PURE__ */ k(
        AttendanceRow,
        {
          key: `${item.subjectUrl}-${index}`,
          item,
          rowWidth
        }
      ))), graph ? /* @__PURE__ */ k(AttendanceChart, { width: width2 }) : null, showMore ? /* @__PURE__ */ k("a", { href: attendance[0].seeMoreUrl, className: "grades-all-link" }, "Zobacz wi\u0119cej") : null);
    }
    function AttendanceChart({ width: width2 = "100%" }) {
      const [stats, setStats] = d2(null);
      y2(() => {
        let cancelled = false;
        async function loadStats() {
          const data2 = await fetchAttendanceStats();
          if (!cancelled) {
            setStats(data2);
          }
        }
        loadStats();
        return () => {
          cancelled = true;
        };
      }, []);
      if (!stats) {
        return /* @__PURE__ */ k("div", { style: { padding: "16px" } }, "Loading...");
      }
      let attendancePercentage = stats.presence;
      if (Number.isNaN(attendancePercentage)) attendancePercentage = 0;
      let latenessPercentage = stats.lateness;
      if (Number.isNaN(latenessPercentage)) latenessPercentage = 0;
      let absencePercentage = stats.absence;
      if (Number.isNaN(absencePercentage)) absencePercentage = 0;
      return /* @__PURE__ */ k(
        "div",
        {
          className: "donut-3",
          style: {
            "--part1": `${attendancePercentage}%`,
            "--part2": `${latenessPercentage}%`,
            "--part3": `${absencePercentage}%`,
            "width": width2
          }
        },
        /* @__PURE__ */ k("div", { className: "donut-inner" }, Math.round(attendancePercentage), "%")
      );
    }
    function Attendance22() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k(AttendanceChart, null));
    }
    function Attendance24() {
      return /* @__PURE__ */ k(AttendanceGrid, { limit: 10 });
    }
    function Attendance42() {
      return /* @__PURE__ */ k(AttendanceGrid, { limit: 8, graph: false, width: "100%", rowWidth: "calc(50% - var(--padding-1))" });
    }
    function Attendance21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "OBECNO\u015A\u0106"));
    }
    function Attendance41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "OBECNO\u015A\u0106"));
    }
    function Attendance44() {
      return /* @__PURE__ */ k(AttendanceGrid, { limit: 10, width: "calc(50% - var(--padding-1))", graph: true, showMore: true });
    }
    function Attendance46() {
      return /* @__PURE__ */ k(AttendanceGrid, { limit: attendance.length, width: "calc(50% - var(--padding-1))", graph: true });
    }
    const widgetVariants = {
      "22": Attendance22,
      "24": Attendance24,
      "42": Attendance42,
      "21": Attendance21,
      "41": Attendance41,
      "44": Attendance44,
      "46": Attendance46
    };
    const Variant = widgetVariants[`${width}${height}`] || Grades22;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "attendanceWidget", "data-widget-id": widgetId, className: `widget w${width} h${height}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/widgets/messages.jsx
  function Messages({ widgetId, moveWidget: moveWidget2, data }) {
    const possibleLayout = [
      { w: 2, h: 1 },
      { w: 4, h: 1 }
    ];
    const fullSize = { w: 4, h: 1 };
    const {
      width,
      height,
      previewWidth,
      previewHeight,
      widgetRef,
      resizeZoneRef,
      resizingRef
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, false);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function Messages21() {
      return /* @__PURE__ */ k("div", { onClick: () => window.open("/internal_messages", "_self"), style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Wiadomo\u015Bci"));
    }
    function Messages41() {
      return /* @__PURE__ */ k("div", { onClick: () => window.open("/internal_messages", "_self"), style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("h1", null, "Wiadomo\u015Bci"));
    }
    const contentVariants = {
      "21": Messages21,
      "41": Messages41
    };
    const Variant = contentVariants[`${width}${height}`] || Messages21;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "messagesWidget", "data-widget-id": widgetId, className: `widget w${width} h${height}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/mainContent.jsx
  window.editMode = false;
  var widgetRegistry = {
    grades: Grades,
    subjects: Subjects,
    schedule: Schedule,
    subjectNews: SubjectNews,
    news: News,
    attendance: Attendance,
    messages: Messages
  };
  var initialWidgets = [
    { id: "grades", type: "grades" },
    { id: "subjects", type: "subjects" },
    { id: "schedule", type: "schedule" },
    { id: "subjectNews", type: "subjectNews" },
    { id: "news", type: "news" },
    { id: "attendance", type: "attendance" },
    { id: "messages", type: "messages" }
  ];
  var widgetLayoutStorageKey = "mainContent.widgetOrder";
  function moveWidget(list, movedId, targetId) {
    if (movedId === targetId) return list;
    const updated = [...list];
    const fromIndex = updated.findIndex((widget) => widget.id === movedId);
    const toIndex = updated.findIndex((widget) => widget.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return list;
    const [movedWidget] = updated.splice(fromIndex, 1);
    const isLastTarget = toIndex === list.length - 1;
    if (isLastTarget && fromIndex < toIndex) {
      updated.push(movedWidget);
    } else {
      updated.splice(toIndex, 0, movedWidget);
    }
    return updated;
  }
  function PlaceholderWidget({ widgetId, width = 2, height = 2 }) {
    return /* @__PURE__ */ k("div", { "data-widget-id": widgetId, className: `widget w${width} h${height}` }, /* @__PURE__ */ k("div", { className: "inner-widget", style: { width: "100%", height: "100%" } }));
  }
  function saveWidgetLayout(widgets) {
    localStorage.setItem(
      widgetLayoutStorageKey,
      JSON.stringify(widgets.map((widget) => widget.id))
    );
  }
  function loadWidgetLayout() {
    const raw = localStorage.getItem(widgetLayoutStorageKey);
    if (!raw) return initialWidgets;
    try {
      const savedIds = JSON.parse(raw);
      if (!Array.isArray(savedIds)) return initialWidgets;
      const widgetMap = new Map(initialWidgets.map((widget) => [widget.id, widget]));
      const orderedWidgets = savedIds.map((id) => widgetMap.get(id)).filter(Boolean);
      const missingWidgets = initialWidgets.filter((widget) => !savedIds.includes(widget.id));
      return [...orderedWidgets, ...missingWidgets];
    } catch {
      return initialWidgets;
    }
  }
  function MainContent({ data }) {
    const [widgets, setWidgets] = d2(loadWidgetLayout);
    const [openPopupId, setOpenPopupId] = d2(null);
    const popupContainerRef = A2(null);
    y2(() => {
      saveWidgetLayout(widgets);
    }, [widgets]);
    y2(() => {
      function handleOutsidePointerDown(e3) {
        if (!openPopupId) return;
        const popupContainer = popupContainerRef.current;
        if (!popupContainer) return;
        if (e3.target.closest(".widget-popup")) return;
        setOpenPopupId(null);
      }
      document.addEventListener("pointerdown", handleOutsidePointerDown);
      return () => {
        document.removeEventListener("pointerdown", handleOutsidePointerDown);
      };
    }, [openPopupId]);
    function handleMoveWidget(movedId, targetId) {
      setWidgets((currentWidgets) => moveWidget(currentWidgets, movedId, targetId));
    }
    function renderWidget(widget) {
      const WidgetComponent = widgetRegistry[widget.type];
      if (WidgetComponent) {
        return /* @__PURE__ */ k(
          WidgetComponent,
          {
            key: widget.id,
            widgetId: widget.id,
            moveWidget: handleMoveWidget,
            data
          }
        );
      }
      return /* @__PURE__ */ k(
        PlaceholderWidget,
        {
          key: widget.id,
          widgetId: widget.id,
          width: widget.width,
          height: widget.height
        }
      );
    }
    return /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("div", { className: "widgets-grid" }, widgets.map(renderWidget)));
  }

  // src/content/app.jsx
  window.replaceHeader = function replaceHeader() {
    const oldHeader = document.querySelector("#top");
    if (!oldHeader) return false;
    let accountHref;
    if (document.querySelector("#account")) {
      accountHref = document.querySelector("#account").children[0].href;
    } else {
      accountHref = "/";
    }
    const mountPoint = document.createElement("div");
    mountPoint.id = "idu-header-root";
    oldHeader.replaceWith(mountPoint);
    R(/* @__PURE__ */ k(Header, { accountHref }), mountPoint);
    return true;
  };
  window.replaceMainContent = function replaceMainContent(data) {
    const oldMainContent = document.getElementById("content");
    if (!oldMainContent) return false;
    oldMainContent.innerHTML = "";
    R(/* @__PURE__ */ k(MainContent, { data }), oldMainContent);
    return true;
  };
})();
