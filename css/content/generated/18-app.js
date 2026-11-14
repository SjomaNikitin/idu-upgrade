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
    var s3, h3, p3, v3, y3, _3, g4, m3 = t3 && t3.__k || w, b2 = l3.length;
    for (f3 = T(u3, l3, m3, f3, b2), s3 = 0; s3 < b2; s3++) null != (p3 = u3.__k[s3]) && (h3 = -1 != p3.__i && m3[p3.__i] || d, p3.__i = s3, _3 = q(n2, p3, h3, i3, r3, o3, e3, f3, c3, a3), v3 = p3.__e, p3.ref && h3.ref != p3.ref && (h3.ref && J(h3.ref, null, p3), a3.push(p3.ref, p3.__c || v3, p3)), null == y3 && null != v3 && (y3 = v3), (g4 = !!(4 & p3.__u)) || h3.__k === p3.__k ? (f3 = j(p3, f3, n2, g4), g4 && h3.__e && (h3.__e = null)) : "function" == typeof p3.type && void 0 !== _3 ? f3 = _3 : v3 && (f3 = v3.nextSibling), p3.__u &= -7);
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
  function F(n2, l3) {
    return l3 = l3 || [], null == n2 || "boolean" == typeof n2 || (g(n2) ? n2.some(function(n3) {
      F(n3, l3);
    }) : l3.push(n2)), l3;
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
    var s3, h3, p3, v3, y3, d3, _3, k3, x3, M3, $3, I2, P4, A4, H3, T4 = u3.type;
    if (void 0 !== u3.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f3 = u3.__e = t3.__e]), (s3 = l.__b) && s3(u3);
    n: if ("function" == typeof T4) try {
      if (k3 = u3.props, x3 = T4.prototype && T4.prototype.render, M3 = (s3 = T4.contextType) && i3[s3.__c], $3 = s3 ? M3 ? M3.props.value : s3.__ : i3, t3.__c ? _3 = (h3 = u3.__c = t3.__c).__ = h3.__E : (x3 ? u3.__c = h3 = new T4(k3, $3) : (u3.__c = h3 = new C(k3, $3), h3.constructor = T4, h3.render = Q), M3 && M3.sub(h3), h3.state || (h3.state = {}), h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), x3 && null == h3.__s && (h3.__s = h3.state), x3 && null != T4.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = m({}, h3.__s)), m(h3.__s, T4.getDerivedStateFromProps(k3, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u3, p3) x3 && null == T4.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), x3 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (x3 && null == T4.getDerivedStateFromProps && k3 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(k3, $3), u3.__v == t3.__v || !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(k3, h3.__s, $3)) {
          u3.__v != t3.__v && (h3.props = k3, h3.state = h3.__s, h3.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.some(function(n3) {
            n3 && (n3.__ = u3);
          }), w.push.apply(h3.__h, h3._sb), h3._sb = [], h3.__h.length && e3.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(k3, h3.__s, $3), x3 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, y3, d3);
        });
      }
      if (h3.context = $3, h3.props = k3, h3.__P = n2, h3.__e = false, I2 = l.__r, P4 = 0, x3) h3.state = h3.__s, h3.__d = false, I2 && I2(u3), s3 = h3.render(h3.props, h3.state, h3.context), w.push.apply(h3.__h, h3._sb), h3._sb = [];
      else do {
        h3.__d = false, I2 && I2(u3), s3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++P4 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i3 = m(m({}, i3), h3.getChildContext())), x3 && !p3 && null != h3.getSnapshotBeforeUpdate && (d3 = h3.getSnapshotBeforeUpdate(v3, y3)), A4 = null != s3 && s3.type === S && null == s3.key ? E(s3.props.children) : s3, f3 = L(n2, g(A4) ? A4 : [A4], u3, t3, i3, r3, o3, e3, f3, c3, a3), h3.base = u3.__e, u3.__u &= -161, h3.__h.length && e3.push(h3), _3 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u3.__v = null, c3 || null != o3) if (n3.then) {
        for (u3.__u |= c3 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
        o3[o3.indexOf(f3)] = null, u3.__e = f3;
      } else {
        for (H3 = o3.length; H3--; ) b(o3[H3]);
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
    var s3, h3, p3, v3, y3, w3, _3, m3 = i3.props || d, k3 = t3.props, x3 = t3.type;
    if ("svg" == x3 ? o3 = "http://www.w3.org/2000/svg" : "math" == x3 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (s3 = 0; s3 < e3.length; s3++) if ((y3 = e3[s3]) && "setAttribute" in y3 == !!x3 && (x3 ? y3.localName == x3 : 3 == y3.nodeType)) {
        u3 = y3, e3[s3] = null;
        break;
      }
    }
    if (null == u3) {
      if (null == x3) return document.createTextNode(k3);
      u3 = document.createElementNS(o3, x3, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null == x3) m3 === k3 || c3 && u3.data == k3 || (u3.data = k3);
    else {
      if (e3 = "textarea" == x3 && null != k3.defaultValue ? null : e3 && n.call(u3.childNodes), !c3 && null != e3) for (m3 = {}, s3 = 0; s3 < u3.attributes.length; s3++) m3[(y3 = u3.attributes[s3]).name] = y3.value;
      for (s3 in m3) y3 = m3[s3], "dangerouslySetInnerHTML" == s3 ? p3 = y3 : "children" == s3 || s3 in k3 || "value" == s3 && "defaultValue" in k3 || "checked" == s3 && "defaultChecked" in k3 || N(u3, s3, null, y3, o3);
      for (s3 in k3) y3 = k3[s3], "children" == s3 ? v3 = y3 : "dangerouslySetInnerHTML" == s3 ? h3 = y3 : "value" == s3 ? w3 = y3 : "checked" == s3 ? _3 = y3 : c3 && "function" != typeof y3 || m3[s3] === y3 || N(u3, s3, y3, m3[s3], o3);
      if (h3) c3 || p3 && (h3.__html == p3.__html || h3.__html == u3.innerHTML) || (u3.innerHTML = h3.__html), t3.__k = [];
      else if (p3 && (u3.innerHTML = ""), L("template" == t3.type ? u3.content : u3, g(v3) ? v3 : [v3], t3, i3, r3, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o3, e3, f3, e3 ? e3[0] : i3.__k && $(i3, 0), c3, a3), null != e3) for (s3 = e3.length; s3--; ) b(e3[s3]);
      c3 && "textarea" != x3 || (s3 = "value", "progress" == x3 && null == w3 ? u3.removeAttribute("value") : null != w3 && (w3 !== u3[s3] || "progress" == x3 && !w3 || "option" == x3 && w3 != m3[s3]) && N(u3, s3, w3, m3[s3], o3), s3 = "checked", null != _3 && _3 != u3[s3] && N(u3, s3, _3, m3[s3], o3));
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

  // src/content/components/niduLogo.jsx
  function NiduLogo() {
    return /* @__PURE__ */ k("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 832 258", version: "1.1", width: "60", height: "30", role: "img", "aria-label": "NIDU" }, /* @__PURE__ */ k("path", { d: "M 4.442264185219603e-16 127.50336318009782 L 8.884528370439206e-16 255.00672636019564 18.25 254.5946365131115 C 28.2875 254.36798709721523, 43.8125 254.1414736661712, 52.75 254.0912733330137 L 69 254 69 187.41666666666669 C 68.99999999999999 134.6026024292965, 69.25849691669517 120.91633575133558, 70.25 121.23470377840198 C 70.9375 121.45545752318974, 77.60476526233184 130.60545752318973, 85.0661450274041 141.56803711173532 C 92.52752479247636 152.5306167002809, 106.02752479247636 172.1840222145816, 115.0661450274041 185.24227158795915 C 124.10476526233185 198.3005209613367, 135.775 215.3340852032082, 141 223.09463656989584 C 146.225 230.85518793658346, 153.2 240.87116572200185, 156.5 245.35236498193666 L 162.5 253.5 169.5 254.03301972304186 C 173.35 254.32618057071488, 186.2875 254.37994173364996, 198.25 254.15248897400872 L 219.99999999999997 253.73893850193372 220 126.86946925096686 L 220 0 185.5 0 L 151 0 151 66.58333333333334 C 150.99999999999997 119.39978068570436, 150.74154782263523 133.08275473240886, 149.75 132.76082788097028 C 149.0625 132.5376165488373, 139.18681971122487 118.66261654883728, 127.80404380272192 101.92749454763695 C 116.42126789421897 85.19237254643663, 100.67277709234165 62.050000000000004, 92.80739757632784 50.5 C 84.94201806031404 38.949999999999996, 74.03653265220467 22.8625, 68.57298555830702 14.749999999999996 L 58.639263569402196 -5.152559361016735e-15 29.319631784701098 -2.5762796805083674e-15 L 0 0 4.442264185219603e-16 127.50336318009782 M 253.24616927715664 126.75 L 253.5 253.5 287.75 253.76312763208597 L 322 254.0262552641719 322 127.01312763208595 L 322 0 287.49616927715664 0 L 252.9923385543133 0 253.24616927715664 126.75 M 355 127.0508074670434 L 355 254.1016149340868 414.75 253.75673209390072 C 467.50076126868305 253.4522495438033, 475.6128496727617 253.19820929936276, 484 251.5880813037217 C 538.1720971582944 241.18836187412177, 572.8360800607534 201.78887914538916, 578.1346915463548 144.5935052853935 C 585.4218623799811 65.93281062160901, 546.4312901231319 12.230295437541265, 474.25658246845353 1.5200542649791045 C 466.06083330714245 0.3038602136302022, 453.11725011682375 -2.264688205756696e-15, 409.50658246845353 -1.258090848504585e-15 L 355 0 355 127.0508074670434 M 612 84.42764051533362 C 612 173.02986108713245, 612.1988213946098 177.756437353249, 616.5646330579402 192.94255319628314 C 628.8031886503783 235.51335956872128, 671.1344060164514 259.303400532705, 729.7747378576067 256.56635610820956 C 782.3578872142126 254.11203139260658, 816.3731671212864 230.05916275552062, 827.7723653597332 187.2703201063262 L 830.3752358476826 177.5 830.7281901031254 88.75 L 831.0811443585683 -5.551126064388396e-17 796.5405721792841 -2.775563032194198e-17 L 762 0 761.9881311246135 82.25 C 761.9782959682911 150.40655074026574, 761.7310134415899 165.42144863629616, 760.5449792427468 169.87761543952854 C 757.7682282554591 180.31042216842684, 749.0092627437555 190.34757490482326, 738.4203408270337 195.23088058474812 C 734.1715683795617 197.19029201384586, 731.862141803173 197.5, 721.5 197.5 C 710.0599744714854 197.5, 709.1966804946121 197.35217471960394, 703 194.33217100942585 C 692.5058801692167 189.2177745431928, 686.2626810404083 182.2975726923929, 682.6546714000524 171.78062688474526 C 680.5734102486462 165.71398268954235, 680.5 163.9668375934266, 680.5 120.5 C 680.5 95.75, 680.3875 58.5125, 680.25 37.75 L 680 0 646 0 L 612 0 612 84.42764051533362 M 471 60.56519809810713 C 498.17174703629604 67.68481427721672, 509.830467426046 87.0493035265728, 509.9683158192803 125.28941375142983 C 510.1082286962731 164.10222623730783, 499.768242065242 184.23129849049934, 475.36629225207685 192.64991017611612 C 467.96445532117605 195.20352541418586, 466.215798636529 195.38904378699917, 445.75 195.7919599538735 L 424 196.2201585687995 424 126.96688523595328 L 424 57.71361190310709 444.25 58.28783102742102 C 458.50889719602026 58.692163445276876, 466.42307003584534 59.36593827208571, 471 60.56519809810713", stroke: "none", fill: "currentColor", "fill-rule": "evenodd", "data-fill-layer-id": "trace-color" }));
  }

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
  function _2(n2, u3) {
    var i3 = p2(t2++, 4);
    !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.u = u3, r2.__h.push(i3));
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

  // src/content/scheduleYear.js
  var SCHEDULE_YEAR_STORAGE_KEY = "iduScheduleYear";
  var SCHEDULE_YEAR_CHANGE_EVENT = "idu-schedule-year-change";
  var SCHEDULE_YEAR_OPTIONS = [
    { value: "1", label: "Rocznik 1" },
    { value: "2", label: "Rocznik 2" },
    { value: "3", label: "Rocznik 3" },
    { value: "4", label: "Rocznik 4" }
  ];
  var DEFAULT_SCHEDULE_YEAR = "1";
  var SCHEDULE_TIMES_BY_YEAR = {
    "1": {
      0: "7:55-8:40",
      1: "8:45-9:30",
      2: "9:35-10:20",
      3: "10:30-11:15",
      4: "11:25-12:10",
      5: "12:15-13:00",
      6: "13:10-13:55",
      7: "14:25-15:10",
      8: "15:15-16:00"
    },
    "2": {
      0: "7:55-8:40",
      1: "8:45-9:30",
      2: "9:35-10:20",
      3: "10:30-11:15",
      4: "11:25-12:10",
      5: "12:20-13:05",
      6: "13:30-14:15",
      7: "14:25-15:10",
      8: "15:15-16:00"
    },
    "3": {
      0: "7:55-8:40",
      1: "8:45-9:30",
      2: "9:35-10:20",
      3: "10:30-11:15",
      4: "11:25-12:10",
      5: "12:35-13:20",
      6: "13:30-14:15",
      7: "14:25-15:10",
      8: "15:15-16:00"
    },
    "4": {
      0: "7:55-8:40",
      1: "8:45-9:30",
      2: "9:35-10:20",
      3: "10:30-11:15",
      4: "11:25-12:10",
      5: "12:30-13:15",
      6: "13:25-14:10",
      7: "14:30-15:15",
      8: "15:20-16:05"
    }
  };
  function normalizeScheduleYear(year) {
    const normalizedYear = String(year || "");
    return Object.prototype.hasOwnProperty.call(SCHEDULE_TIMES_BY_YEAR, normalizedYear) ? normalizedYear : DEFAULT_SCHEDULE_YEAR;
  }
  function getSelectedScheduleYear() {
    return normalizeScheduleYear(localStorage.getItem(SCHEDULE_YEAR_STORAGE_KEY));
  }
  function selectScheduleYear(year) {
    const selectedYear = normalizeScheduleYear(year);
    localStorage.setItem(SCHEDULE_YEAR_STORAGE_KEY, selectedYear);
    window.dispatchEvent(new CustomEvent(SCHEDULE_YEAR_CHANGE_EVENT, {
      detail: { year: selectedYear }
    }));
    return selectedYear;
  }
  function applyScheduleYearTimes(schedule, year) {
    const selectedTimes = SCHEDULE_TIMES_BY_YEAR[normalizeScheduleYear(year)];
    return Object.fromEntries(
      Object.entries(schedule || {}).map(([day, lessons]) => {
        const remappedLessons = Object.fromEntries(
          Object.entries(lessons || {}).map(([sourceTime, lesson]) => {
            const lessonNumber = Number.parseInt(lesson?.lessonNumber, 10);
            const time = selectedTimes[lessonNumber] || lesson?.time || sourceTime;
            const [start, end] = time.split("-");
            return [time, {
              ...lesson,
              time,
              start,
              end
            }];
          })
        );
        return [day, remappedLessons];
      })
    );
  }

  // src/content/components/header.jsx
  function MessagesButton({ href, size }) {
    if (!href) return null;
    return /* @__PURE__ */ k("a", { href, className: "header-icon-button", "aria-label": "Wiadomo\u015Bci" }, /* @__PURE__ */ k("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M4 18L9 12M20 18L15 12M3 8L10.225 12.8166C10.8665 13.2443 11.1872 13.4582 11.5339 13.5412C11.8403 13.6147 12.1597 13.6147 12.4661 13.5412C12.8128 13.4582 13.1335 13.2443 13.775 12.8166L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  function HeaderActions({ accountHref, size, searchOpen, onSearchToggle, searchAvailable }) {
    return /* @__PURE__ */ k("div", { className: "header-actions" }, searchAvailable && /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        className: `header-icon-button header-search-button ${searchOpen ? "active" : ""}`,
        "aria-label": "Szukaj",
        "aria-expanded": searchOpen,
        "aria-controls": "header-search-popup",
        onClick: onSearchToggle
      },
      /* @__PURE__ */ k("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))
    ), /* @__PURE__ */ k("a", { href: accountHref, className: "header-icon-button", "aria-label": "Konto" }, /* @__PURE__ */ k("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))));
  }
  function SearchPopup({ open, onClose, searchElement }) {
    const contentRef = A2(null);
    y2(() => {
      if (!searchElement || !contentRef.current) return void 0;
      contentRef.current.appendChild(searchElement);
      const replaceImageSize = () => {
        searchElement.querySelectorAll("#users_search_result img").forEach((image) => {
          ["src", "srcset"].forEach((attribute) => {
            const value = image.getAttribute(attribute);
            if (value?.includes("/mini/")) {
              image.setAttribute(attribute, value.replaceAll("/mini/", "/profile/"));
            }
          });
        });
      };
      replaceImageSize();
      const resultsObserver = new MutationObserver(replaceImageSize);
      resultsObserver.observe(searchElement, {
        attributes: true,
        attributeFilter: ["src", "srcset"],
        childList: true,
        subtree: true
      });
      return () => resultsObserver.disconnect();
    }, [searchElement]);
    y2(() => {
      if (!open) return void 0;
      const handleKeyDown = (event) => {
        if (event.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKeyDown);
      const focusFrame = window.requestAnimationFrame(() => {
        searchElement?.querySelector("#search_profile_by_name")?.focus();
      });
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        window.cancelAnimationFrame(focusFrame);
      };
    }, [open, onClose, searchElement]);
    if (!searchElement) return null;
    return /* @__PURE__ */ k(
      "section",
      {
        id: "header-search-popup",
        className: `header-search-popup ${open ? "open" : ""}`,
        role: "dialog",
        "aria-modal": "false",
        "aria-label": "Wyszukiwanie u\u017Cytkownik\xF3w",
        "aria-hidden": !open
      },
      /* @__PURE__ */ k("div", { className: "header-search-popup-heading" }, /* @__PURE__ */ k("h2", null, "Wyszukaj u\u017Cytkownika"), /* @__PURE__ */ k("button", { type: "button", className: "header-search-close", onClick: onClose, "aria-label": "Zamknij wyszukiwanie" }, /* @__PURE__ */ k("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M6 6L18 18M18 6L6 18", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" })))),
      /* @__PURE__ */ k("div", { ref: contentRef, className: "header-search-content" })
    );
  }
  function Header({ accountHref, messagesHref, semesterScope, searchElement, isMockData = false }) {
    const headerRef = A2(null);
    let color = getComputedStyle(root).getPropertyValue("--idu-logo").trim();
    let currentTheme = localStorage.getItem("theme");
    let svgSize = 28;
    let menuStrokeWidth = 4;
    let panelIconStrokeWidth = 2.5;
    let panelIconColor = "currentColor";
    let actionIconStrokeWidth = 2.2;
    let [editMode, setEditMode] = d2(false);
    if (currentTheme === "Ocean") {
      color = "#7EEACC";
    } else if (currentTheme === "Besties") {
      color = "#851A36";
    } else if (currentTheme === "Dzaga") {
      color = "#5B3119";
    } else if (currentTheme === "Default") {
      color = "#0B5F5D";
    }
    const [menuOpen, setMenuOpen] = d2(false);
    const [settingsOpen, setSettingsOpen] = d2(false);
    const [searchOpen, setSearchOpen] = d2(false);
    y2(() => {
      const header = headerRef.current;
      const stickyHeader = header?.parentElement?.id === "idu-header-root" ? header.parentElement : header;
      if (!stickyHeader) return void 0;
      let lastScrollY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
      let animationFrame = null;
      const scrollThreshold = 6;
      const topRevealPoint = 12;
      const updateHeader = () => {
        const currentScrollY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
        const scrollDelta = currentScrollY - lastScrollY;
        if (editMode) {
          lastScrollY = currentScrollY;
        } else if (currentScrollY <= topRevealPoint || menuOpen || settingsOpen || searchOpen) {
          stickyHeader.classList.remove("is-scroll-hidden");
          lastScrollY = currentScrollY;
        } else if (scrollDelta > scrollThreshold) {
          stickyHeader.classList.add("is-scroll-hidden");
          lastScrollY = currentScrollY;
        } else if (scrollDelta < -scrollThreshold) {
          stickyHeader.classList.remove("is-scroll-hidden");
          lastScrollY = currentScrollY;
        }
        animationFrame = null;
      };
      const handleScroll = () => {
        if (animationFrame === null) {
          animationFrame = window.requestAnimationFrame(updateHeader);
        }
      };
      if (editMode) {
        stickyHeader.classList.remove("is-scroll-hidden");
      } else if (menuOpen || settingsOpen || searchOpen) {
        stickyHeader.classList.remove("is-scroll-hidden");
      }
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (animationFrame !== null) {
          window.cancelAnimationFrame(animationFrame);
        }
      };
    }, [editMode, menuOpen, searchOpen, settingsOpen]);
    function openSettings() {
      setSettingsOpen(true);
      setMenuOpen(false);
      setSearchOpen(false);
    }
    function toggleSearch() {
      setMenuOpen(false);
      setSettingsOpen(false);
      setSearchOpen((open) => !open);
    }
    window.switchEditMode = function switchEditMode() {
      window.editMode = !editMode;
      setMenuOpen(false);
      setSettingsOpen(false);
      setSearchOpen(false);
      const widgets = document.querySelectorAll(".widget");
      if (editMode) {
        document.body.classList.remove("edit-mode");
        for (let i3 = 0; i3 < widgets.length; i3++) {
          widgets[i3].classList.remove("edit-mode");
        }
      } else {
        document.body.classList.add("edit-mode");
        for (let i3 = 0; i3 < widgets.length; i3++) {
          widgets[i3].classList.add("edit-mode");
        }
      }
      window.dispatchEvent(new Event("idu-edit-mode-change"));
      setEditMode(!editMode);
    };
    if (window.location.pathname === "/" || isMockData) {
      return /* @__PURE__ */ k("header", { ref: headerRef, id: "top", className: `idu-custom-header ${editMode ? "header-edit-mode" : ""}` }, editMode && /* @__PURE__ */ k("div", { className: "header-edit-toolbar" }, /* @__PURE__ */ k("strong", null, "Edytuj wid\u017Cety"), /* @__PURE__ */ k("button", { type: "button", onClick: () => window.switchEditMode() }, "Gotowe")), /* @__PURE__ */ k("div", { className: "header-menu" }, /* @__PURE__ */ k(
        "a",
        {
          className: "header-menu-button",
          onClick: () => {
            setSearchOpen(false);
            setMenuOpen(!menuOpen);
          }
        },
        /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M4 6H20M4 12H20M4 18H20", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))
      ), !isMockData && /* @__PURE__ */ k(MessagesButton, { href: messagesHref, size: svgSize }), /* @__PURE__ */ k("div", { className: `header-menu-panel ${menuOpen ? "open" : ""}` }, /* @__PURE__ */ k("a", { onClick: () => openSettings(), className: "header-panel-link" }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }), /* @__PURE__ */ k("path", { d: "M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          className: "header-panel-link header-panel-edit",
          onClick: () => window.switchEditMode(),
          "aria-label": "Edytuj wid\u017Cety"
        },
        /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, /* @__PURE__ */ k("path", { d: "M4 4H9V9H4V4ZM15 4H20V9H15V4ZM4 15H9V20H4V15Z", stroke: "currentColor", "stroke-width": "2", "stroke-linejoin": "round" }), /* @__PURE__ */ k("path", { d: "M14 19.5L14.5 16.5L19 12L22 15L17.5 19.5L14 20V19.5Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))
      ), /* @__PURE__ */ k("a", { href: "/users/sign_out", className: "header-panel-link" }, /* @__PURE__ */ k("svg", { xmlns: "http://www.w3.org/2000/svg", width: svgSize, height: svgSize, viewBox: "0 0 24 24" }, /* @__PURE__ */ k("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9" }))))), /* @__PURE__ */ k("a", { className: "header-logo-link", href: "/" }, /* @__PURE__ */ k(NiduLogo, null)), !isMockData && /* @__PURE__ */ k(
        HeaderActions,
        {
          accountHref,
          size: svgSize,
          searchOpen,
          onSearchToggle: toggleSearch,
          searchAvailable: Boolean(searchElement)
        }
      ), !isMockData && /* @__PURE__ */ k(SearchPopup, { open: searchOpen, onClose: () => setSearchOpen(false), searchElement }), /* @__PURE__ */ k(Settings, { open: settingsOpen, setOpen: setSettingsOpen, semesterScope }));
    } else {
      return /* @__PURE__ */ k("header", { ref: headerRef, id: "top", className: "idu-custom-header mini" }, /* @__PURE__ */ k("div", { className: "header-menu" }, /* @__PURE__ */ k(
        "a",
        {
          className: "header-menu-button",
          onClick: () => setMenuOpen(!menuOpen)
        },
        /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M4 6H20M4 12H20M4 18H20", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))
      ), /* @__PURE__ */ k("a", { onClick: () => window.open("/", "_self"), className: "header-home-icon-button", "aria-label": "Strona g\u0142\xF3wna" }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12M14 21V15H10V21", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("div", { className: `header-menu-panel ${menuOpen ? "open" : ""}` }, !window.location.pathname.includes("students") && /* @__PURE__ */ k("a", { href: accountHref, className: "header-panel-link", "aria-label": "Konto" }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("a", { href: "/internal_messages", className: "header-panel-link" }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M4 18L9 12M20 18L15 12M3 8L10.225 12.8166C10.8665 13.2443 11.1872 13.4582 11.5339 13.5412C11.8403 13.6147 12.1597 13.6147 12.4661 13.5412C12.8128 13.4582 13.1335 13.2443 13.775 12.8166L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("a", { onClick: () => openSettings(), className: "header-panel-link" }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }), /* @__PURE__ */ k("path", { d: "M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("a", { href: "/users/sign_out", className: "header-panel-link", onClick: () => window.open("/users/sign_out", "_self") }, /* @__PURE__ */ k("svg", { xmlns: "http://www.w3.org/2000/svg", width: svgSize, height: svgSize, viewBox: "0 0 24 24" }, /* @__PURE__ */ k("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9" }))))), /* @__PURE__ */ k(Settings, { open: settingsOpen, setOpen: setSettingsOpen, semesterScope }));
    }
  }
  function Settings({ open, setOpen, semesterScope }) {
    let svgSize = 36;
    return /* @__PURE__ */ k("div", { className: `settings-container ${open ? "open" : ""}` }, /* @__PURE__ */ k("div", { className: "settings-content" }, /* @__PURE__ */ k("section", { className: "settings-section" }, /* @__PURE__ */ k("h2", null, "Motyw"), /* @__PURE__ */ k(SettingsDots, null)), /* @__PURE__ */ k(ScheduleYearForm, null), semesterScope ? /* @__PURE__ */ k(SemesterScopeForm, { semesterScope }) : null), /* @__PURE__ */ k("a", { className: "header-icon-button-ddsettings", onClick: () => setOpen(false) }, /* @__PURE__ */ k("svg", { width: svgSize, height: svgSize, viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { fill: "currentColor", d: "M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" }))));
  }
  function ScheduleYearForm() {
    const [selectedYear, setSelectedYear] = d2(getSelectedScheduleYear);
    return /* @__PURE__ */ k("section", { className: "settings-section" }, /* @__PURE__ */ k("h2", null, "Rocznik"), /* @__PURE__ */ k("form", { className: "schedule-year-form", onSubmit: (event) => event.preventDefault() }, /* @__PURE__ */ k(
      "select",
      {
        id: "idu-schedule-year",
        "aria-label": "Rocznik",
        value: selectedYear,
        onChange: (event) => {
          setSelectedYear(selectScheduleYear(event.currentTarget.value));
        }
      },
      SCHEDULE_YEAR_OPTIONS.map((option) => /* @__PURE__ */ k("option", { key: option.value, value: option.value }, option.label))
    )));
  }
  function SemesterScopeForm({ semesterScope }) {
    const storageKey = "iduSemesterScope";
    const storedValue = localStorage.getItem(storageKey) || "";
    const hasOption = (value) => semesterScope.options.some((option) => option.value === value);
    const initialValue = semesterScope.selectedValue && hasOption(semesterScope.selectedValue) ? semesterScope.selectedValue : hasOption(storedValue) ? storedValue : "";
    const [selectedValue, setSelectedValue] = d2(initialValue);
    return /* @__PURE__ */ k("section", { className: "settings-section" }, /* @__PURE__ */ k("h2", null, "Semestr"), /* @__PURE__ */ k(
      "form",
      {
        className: "semester-scope-form",
        action: semesterScope.action,
        method: "post",
        acceptCharset: "UTF-8"
      },
      semesterScope.hiddenFields.map((field) => /* @__PURE__ */ k("input", { key: field.name, type: "hidden", name: field.name, value: field.value })),
      /* @__PURE__ */ k(
        "select",
        {
          id: "idu-semester-id",
          name: "semester_id",
          value: selectedValue,
          onChange: (event) => {
            const select = event.currentTarget;
            localStorage.setItem(storageKey, select.value);
            setSelectedValue(select.value);
            select.form?.submit();
          }
        },
        semesterScope.options.map((option) => /* @__PURE__ */ k("option", { key: option.value || "empty", value: option.value }, option.label))
      )
    ));
  }
  function SettingsDots() {
    const themes = ["Default", "Ocean", "Dzaga", "Besties"];
    const dots = ["#99EADB", "#242A32", "#DBA67A", "#F6CCCD"];
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
    const hiddenWidgetsRef = A2([]);
    const resizeFromRightRef = A2(false);
    const resizeViewportTopRef = A2(null);
    widthRef.current = width;
    heightRef.current = height;
    openPopupRef.current = openPopup;
    function hidePopupObstacles() {
      const widget = widgetRef.current;
      if (!widget?.parentElement) return;
      const widgetRect = widget.getBoundingClientRect();
      const siblings = Array.from(widget.parentElement.children);
      const widgetIndex = siblings.indexOf(widget);
      hiddenWidgetsRef.current = siblings.slice(0, widgetIndex).filter((sibling) => {
        if (!sibling.classList.contains("widget")) return false;
        const siblingRect = sibling.getBoundingClientRect();
        return siblingRect.top < widgetRect.bottom && siblingRect.bottom > widgetRect.top;
      });
      hiddenWidgetsRef.current.forEach((sibling) => {
        sibling.classList.add("widget-popup-obstacle");
      });
      if (hiddenWidgetsRef.current.length) {
        widget.dataset.popupFromRight = "";
      }
    }
    function restorePopupObstacles() {
      hiddenWidgetsRef.current.forEach((sibling) => {
        sibling.classList.remove("widget-popup-obstacle");
      });
      hiddenWidgetsRef.current = [];
      if (widgetRef.current) delete widgetRef.current.dataset.popupFromRight;
    }
    function updateResizeSide() {
      const widget = widgetRef.current;
      if (!widget) return;
      if (!window.editMode) {
        delete widget.dataset.resizeFromRight;
        return;
      }
      if (widthRef.current === 4) return;
      const grid = widget.parentElement;
      if (!grid) return;
      const widgetRect = widget.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const gridStyle = getComputedStyle(grid);
      const contentLeft = gridRect.left + parseFloat(gridStyle.paddingLeft || 0);
      const contentRight = gridRect.right - parseFloat(gridStyle.paddingRight || 0);
      const distanceFromLeft = Math.abs(widgetRect.left - contentLeft);
      const distanceFromRight = Math.abs(contentRight - widgetRect.right);
      if (distanceFromRight < distanceFromLeft) {
        widget.dataset.resizeFromRight = "";
      } else {
        delete widget.dataset.resizeFromRight;
      }
    }
    function calcCornerPositions() {
      const widget = widgetRef.current;
      if (!widget) return [];
      const cellSize = getCellSize();
      const positions = [];
      const widgetRect = widget.getBoundingClientRect();
      for (let i3 = 0; i3 < possibleLayout.length; i3++) {
        const layout = possibleLayout[i3];
        const preview = getPreviewSize(layout.w, layout.h, cellSize, gap);
        const realX = resizeFromRightRef.current ? widgetRect.right - preview.width : widgetRect.left + preview.width;
        const realY = widgetRect.top + preview.height;
        positions.push({ realX, realY });
      }
      return positions;
    }
    function dynamicSizeUpdate(e3) {
      if (!resizingRef.current) return;
      e3.preventDefault();
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
      if (nextLayout.w === widthRef.current && nextLayout.h === heightRef.current) return;
      resizeViewportTopRef.current = widgetRef.current.getBoundingClientRect().top;
      const preview = getPreviewSize(nextLayout.w, nextLayout.h, getCellSize(), gap);
      widthRef.current = nextLayout.w;
      heightRef.current = nextLayout.h;
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
    _2(() => {
      if (resizeViewportTopRef.current === null) return;
      const widget = widgetRef.current;
      const previousTop = resizeViewportTopRef.current;
      resizeViewportTopRef.current = null;
      if (!widget) return;
      const topDelta = widget.getBoundingClientRect().top - previousTop;
      if (Math.abs(topDelta) > 1) window.scrollBy(0, topDelta);
    }, [width, height]);
    y2(() => {
      if (!openPopup) restorePopupObstacles();
    }, [openPopup]);
    y2(() => {
      const resizeZone = resizeZoneRef.current;
      let activePointerId = null;
      let resizeSideFrame = null;
      if (!resizeZone) return void 0;
      function scheduleResizeSideUpdate() {
        if (resizeSideFrame !== null) cancelAnimationFrame(resizeSideFrame);
        resizeSideFrame = requestAnimationFrame(() => {
          resizeSideFrame = null;
          updateResizeSide();
        });
      }
      function startResize(e3) {
        if (!window.editMode) return;
        e3.preventDefault();
        updateResizeSide();
        resizeFromRightRef.current = widgetRef.current.hasAttribute("data-resize-from-right");
        activePointerId = e3.pointerId;
        resizeZone.setPointerCapture?.(e3.pointerId);
        resizingRef.current = true;
      }
      function stopResize(e3) {
        if (activePointerId !== null && e3.pointerId !== activePointerId) return;
        resizingRef.current = false;
        if (activePointerId !== null) {
          resizeZone.releasePointerCapture?.(activePointerId);
          activePointerId = null;
        }
        scheduleResizeSideUpdate();
      }
      function togglePopup(e3) {
        if (window.editMode) return;
        if (e3.target.closest("a[href]")) return;
        if (!popup) return;
        let finalSize;
        if (openPopupRef.current) {
          finalSize = widgetLastSizeRef.current;
        } else {
          hidePopupObstacles();
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
      window.addEventListener("resize", scheduleResizeSideUpdate);
      window.addEventListener("idu-edit-mode-change", scheduleResizeSideUpdate);
      widgetRef.current.addEventListener("click", togglePopup);
      scheduleResizeSideUpdate();
      return () => {
        if (resizeSideFrame !== null) cancelAnimationFrame(resizeSideFrame);
        resizeZone.removeEventListener("pointerdown", startResize);
        document.removeEventListener("pointerup", stopResize);
        document.removeEventListener("pointermove", dynamicSizeUpdate);
        window.removeEventListener("resize", scheduleResizeSideUpdate);
        window.removeEventListener("idu-edit-mode-change", scheduleResizeSideUpdate);
        widgetRef.current.removeEventListener("click", togglePopup);
        restorePopupObstacles();
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

  // src/content/components/widgets/widgetMotion.js
  var REFLOW_DURATION = 380;
  var REFLOW_EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";
  var DROP_DURATION = 420;
  var DROP_EASING = "cubic-bezier(0.2, 0.9, 0.25, 1.12)";
  function prefersReducedMotion() {
    try {
      return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
    } catch {
      return false;
    }
  }
  function getTranslate(el) {
    const transform = getComputedStyle(el).transform;
    if (!transform || transform === "none") return { x: 0, y: 0 };
    try {
      const matrix = new DOMMatrixReadOnly(transform);
      return { x: matrix.m41, y: matrix.m42 };
    } catch {
      return { x: 0, y: 0 };
    }
  }
  function getSettledRect(el) {
    const rect = el.getBoundingClientRect();
    let dx = 0;
    let dy = 0;
    let node = el;
    while (node && node !== document.body && !node.classList?.contains("widgets-grid")) {
      const { x: x3, y: y3 } = getTranslate(node);
      dx += x3;
      dy += y3;
      node = node.parentElement;
    }
    return {
      left: rect.left - dx,
      top: rect.top - dy,
      right: rect.right - dx,
      bottom: rect.bottom - dy,
      width: rect.width,
      height: rect.height
    };
  }

  // src/content/components/widgets/widgetLayout.js
  var GRID_COLUMNS = 4;
  function layoutGrid(items, columns = GRID_COLUMNS) {
    const occupied = [];
    const isFree = (row2, col2, w3, h3) => {
      for (let r3 = row2; r3 < row2 + h3; r3++) {
        const line = occupied[r3];
        if (!line) continue;
        for (let c3 = col2; c3 < col2 + w3; c3++) {
          if (line[c3]) return false;
        }
      }
      return true;
    };
    const fill = (row2, col2, w3, h3) => {
      for (let r3 = row2; r3 < row2 + h3; r3++) {
        occupied[r3] ||= new Array(columns).fill(false);
        for (let c3 = col2; c3 < col2 + w3; c3++) occupied[r3][c3] = true;
      }
    };
    const placements = /* @__PURE__ */ new Map();
    let row = 0;
    let col = 0;
    for (const item of items) {
      const w3 = Math.min(Math.max(1, item.w | 0), columns);
      const h3 = Math.max(1, item.h | 0);
      for (; ; ) {
        if (col + w3 > columns) {
          row++;
          col = 0;
          continue;
        }
        if (isFree(row, col, w3, h3)) break;
        col++;
      }
      fill(row, col, w3, h3);
      placements.set(item.id, { col, row, w: w3, h: h3 });
      col += w3;
    }
    return { placements, rows: occupied.length, gaps: countGaps(occupied, columns) };
  }
  function countGaps(occupied, columns) {
    let gaps = 0;
    for (let r3 = 0; r3 < occupied.length - 1; r3++) {
      for (let c3 = 0; c3 < columns; c3++) {
        if (!occupied[r3]?.[c3]) gaps++;
      }
    }
    return gaps;
  }
  function moveTo(list, item, index) {
    const rest = list.filter((other) => other !== item);
    rest.splice(index, 0, item);
    return rest;
  }
  function pickDropOrder(items, draggedId, target, options = {}) {
    const {
      gapPenalty = 1,
      repairPenalty = 0.35,
      repairDistancePenalty = 0.08,
      stickiness = 0.35
    } = options;
    const dragged = items.find((item) => item.id === draggedId);
    if (!dragged) return null;
    const currentKey = items.map((item) => item.id).join("|");
    const current = layoutGrid(items).placements;
    let best = null;
    const consider = (order, repaired) => {
      const { placements, gaps } = layoutGrid(order);
      const slot = placements.get(draggedId);
      let score = Math.hypot(slot.col + slot.w / 2 - target.x, slot.row + slot.h / 2 - target.y);
      score += gaps * gapPenalty;
      if (repaired) {
        const before = current.get(repaired.id);
        const after = placements.get(repaired.id);
        score += repairPenalty + repairDistancePenalty * Math.hypot(after.col - before.col, after.row - before.row);
      }
      const key = order.map((item) => item.id).join("|");
      if (key === currentKey) score -= stickiness;
      if (!best || score < best.score - 1e-6) best = { score, key, order, gaps };
      return gaps;
    };
    for (let index = 0; index < items.length; index++) {
      const order = moveTo(items, dragged, index);
      const gaps = consider(order, null);
      if (gaps === 0) continue;
      for (const other of order) {
        if (other === dragged) continue;
        for (let j4 = 0; j4 < order.length; j4++) {
          if (order[j4] === other) continue;
          consider(moveTo(order, other, j4), other);
        }
      }
    }
    if (!best || best.key === currentKey) return null;
    return best.order.map((item) => item.id);
  }
  function getWidgetSpan(el) {
    const w3 = Number(/(?:^|\s)w(\d+)(?:\s|$)/.exec(el.className)?.[1]) || 2;
    const h3 = Number(/(?:^|\s)h(\d+)(?:\s|$)/.exec(el.className)?.[1]) || 2;
    return { w: w3, h: h3 };
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
    let editModeTimeOut;
    let pointerPosition;
    let currentPointerPosition;
    let widgetDragTimeOut;
    let pressFeedbackTimeout;
    let autoScrollStartTimeout;
    let autoScrollInterval;
    let autoScrollDirection = null;
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
      let activePointerId = null;
      let editModePointerId = null;
      let finishPendingDrop = null;
      const editModeMoveTolerance = 10;
      const detectScrollZoneHeight = 140;
      const autoScrollDelay = 180;
      const autoScrollStep = 18;
      const autoScrollIntervalMs = 16;
      if (!widget) return;
      const handle = document.createElement("span");
      handle.className = "widget-drag-handle";
      widget.appendChild(handle);
      function getGridMetrics(grid) {
        const rect = grid.getBoundingClientRect();
        const style = getComputedStyle(grid);
        const padLeft = parseFloat(style.paddingLeft) || 0;
        const padRight = parseFloat(style.paddingRight) || 0;
        const padTop = parseFloat(style.paddingTop) || 0;
        const colGap = parseFloat(style.columnGap) || 16;
        const rowGap = parseFloat(style.rowGap) || colGap;
        const contentWidth = grid.clientWidth - padLeft - padRight;
        const colWidth = (contentWidth - colGap * (GRID_COLUMNS - 1)) / GRID_COLUMNS;
        const rowHeight = parseFloat(style.gridAutoRows) || colWidth;
        return {
          left: rect.left + grid.clientLeft + padLeft,
          top: rect.top + grid.clientTop + padTop,
          colPitch: colWidth + colGap,
          rowPitch: rowHeight + rowGap,
          colGap,
          rowGap
        };
      }
      function updateLayout() {
        const grid = widget.parentElement;
        if (!grid || !widgetClone) return;
        const els = Array.from(grid.children).filter((el) => el.classList.contains("widget"));
        const items = els.map((el) => ({ id: el.dataset.widgetId, ...getWidgetSpan(el) }));
        const currentIndex = items.findIndex((item) => item.id === widgetID);
        if (currentIndex < 0) return;
        const m3 = getGridMetrics(grid);
        const clone = widgetClone.getBoundingClientRect();
        const target = {
          x: (clone.left + clone.width / 2 - m3.left + m3.colGap / 2) / m3.colPitch,
          y: (clone.top + clone.height / 2 - m3.top + m3.rowGap / 2) / m3.rowPitch
        };
        const order = pickDropOrder(items, widgetID, target);
        if (order) moveWidget2(widgetID, order);
      }
      function setClonePosition(clientX, clientY) {
        if (!widgetClone) return;
        if (widthRef.current <= getCellSize() * 2) {
          widgetClone.style.left = clientX - widthRef.current / 2 + "px";
        } else {
          widgetClone.style.left = "16px";
        }
        widgetClone.style.top = clientY + window.scrollY - heightRef.current / 2 + "px";
      }
      function clearAutoScroll() {
        clearTimeout(autoScrollStartTimeout);
        clearInterval(autoScrollInterval);
        autoScrollStartTimeout = null;
        autoScrollInterval = null;
        autoScrollDirection = null;
      }
      function setDraggingMode(active) {
        document.documentElement.classList.toggle("dragging-widget", active);
        document.body.classList.toggle("dragging-widget", active);
      }
      function getScrollElement() {
        return document.scrollingElement || document.documentElement;
      }
      function getCurrentScrollTop() {
        return getScrollElement().scrollTop || window.scrollY || 0;
      }
      function getMaxScrollTop() {
        const scrollElement = getScrollElement();
        const body = document.body;
        const documentElement = document.documentElement;
        const contentHeight = Math.max(
          scrollElement.scrollHeight || 0,
          scrollElement.offsetHeight || 0,
          body?.scrollHeight || 0,
          body?.offsetHeight || 0,
          documentElement.scrollHeight || 0,
          documentElement.offsetHeight || 0
        );
        return Math.max(0, contentHeight - window.innerHeight);
      }
      function setPageScrollTop(top) {
        const scrollElement = getScrollElement();
        scrollElement.scrollTop = top;
        window.scrollTo(0, top);
      }
      function getAutoScrollDirection() {
        if (!widgetClone) return null;
        const rect = widgetClone.getBoundingClientRect();
        if (rect.top < detectScrollZoneHeight) {
          return "up";
        }
        if (rect.bottom > window.innerHeight - detectScrollZoneHeight) {
          return "down";
        }
        return null;
      }
      function startAutoScroll(direction) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
          if (!dragging || !widgetClone || !currentPointerPosition) {
            clearAutoScroll();
            return;
          }
          const currentScrollTop = getCurrentScrollTop();
          const maxScrollTop = getMaxScrollTop();
          const nextScrollTop = direction === "up" ? Math.max(0, currentScrollTop - autoScrollStep) : Math.min(maxScrollTop, currentScrollTop + autoScrollStep);
          if (nextScrollTop === currentScrollTop) {
            clearAutoScroll();
            return;
          }
          setPageScrollTop(nextScrollTop);
          setClonePosition(currentPointerPosition.x, currentPointerPosition.y);
          const nextDirection = getAutoScrollDirection();
          if (nextDirection !== direction) {
            if (nextDirection) {
              scheduleAutoScroll(nextDirection);
            } else {
              clearAutoScroll();
            }
          }
        }, autoScrollIntervalMs);
      }
      function scheduleAutoScroll(direction) {
        if (!direction) {
          clearAutoScroll();
          return;
        }
        if (autoScrollDirection === direction && (autoScrollStartTimeout || autoScrollInterval)) {
          return;
        }
        clearTimeout(autoScrollStartTimeout);
        clearInterval(autoScrollInterval);
        autoScrollDirection = direction;
        autoScrollStartTimeout = setTimeout(() => {
          autoScrollStartTimeout = null;
          startAutoScroll(direction);
        }, autoScrollDelay);
      }
      function cancelEditModeActivation(e3) {
        if (e3?.pointerId !== void 0 && editModePointerId !== null && e3.pointerId !== editModePointerId) {
          return;
        }
        clearTimeout(editModeTimeOut);
        clearTimeout(pressFeedbackTimeout);
        editModeTimeOut = null;
        editModePointerId = null;
        widget.classList.remove("widget-pressing");
      }
      function schedulePressFeedback() {
        clearTimeout(pressFeedbackTimeout);
        pressFeedbackTimeout = setTimeout(() => {
          if (!dragging) widget.classList.add("widget-pressing");
        }, 150);
      }
      function startDragging(e3) {
        cancelEditModeActivation();
        if (!window.editMode) {
          const pointerId = e3.pointerId;
          editModePointerId = pointerId;
          pointerPosition = { x: e3.clientX, y: e3.clientY };
          currentPointerPosition = { x: e3.clientX, y: e3.clientY };
          schedulePressFeedback();
          editModeTimeOut = setTimeout(() => {
            if (window.editMode || editModePointerId !== pointerId) return;
            editModeTimeOut = null;
            editModePointerId = null;
            window.switchEditMode();
          }, 750);
          return;
        }
        if (resizingZoneRef.current?.contains(e3.target)) return;
        if (resizeRef.current) return;
        pointerPosition = { x: e3.clientX, y: e3.clientY };
        currentPointerPosition = { x: e3.clientX, y: e3.clientY };
        schedulePressFeedback();
        const beginDrag = () => {
          clearTimeout(pressFeedbackTimeout);
          if (pointerPosition.x !== currentPointerPosition.x || pointerPosition.y !== currentPointerPosition.y) {
            widget.classList.remove("widget-pressing");
            return;
          }
          e3.preventDefault();
          finishPendingDrop?.();
          activePointerId = e3.pointerId;
          widget.setPointerCapture?.(e3.pointerId);
          dragging = true;
          handle.hidden = true;
          widget.classList.remove("widget-pressing");
          setDraggingMode(true);
          widgetClone = widgetRef.current.children[0].cloneNode(false);
          widgetClone.className = "widget-clone inner-widget wiggle";
          document.body.appendChild(widgetClone);
          widget.setAttribute("data-drag-placeholder", "");
          setClonePosition(e3.clientX, e3.clientY);
        };
        if (e3.target === handle) beginDrag();
        else widgetDragTimeOut = setTimeout(beginDrag, 500);
      }
      function stopDragging(e3) {
        cancelEditModeActivation(e3);
        clearTimeout(widgetDragTimeOut);
        clearTimeout(pressFeedbackTimeout);
        widget.classList.remove("widget-pressing");
        setDraggingMode(false);
        if (activePointerId !== null && e3.pointerId !== activePointerId) return;
        dragging = false;
        if (activePointerId !== null) {
          try {
            widget.releasePointerCapture?.(activePointerId);
          } catch {
          }
          activePointerId = null;
        }
        if (widgetClone) {
          handle.hidden = false;
          if (visualUpdateTimer && e3.type === "pointerup") updateLayout();
          clearTimeout(visualUpdateTimer);
          visualUpdateTimer = null;
          clearAutoScroll();
          dropCloneIntoSlot(widgetClone);
          widgetClone = null;
        }
      }
      function restoreWidget() {
        widget.removeAttribute("data-drag-placeholder");
      }
      function dropCloneIntoSlot(clone) {
        finishPendingDrop?.();
        const frozen = getComputedStyle(clone).transform;
        clone.style.transform = frozen && frozen !== "none" ? frozen : "";
        clone.classList.remove("wiggle");
        let frame = 0;
        let fallback = 0;
        let fadeTimer = 0;
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          cancelAnimationFrame(frame);
          clearTimeout(fallback);
          clone.removeEventListener("transitionend", onEnd);
          if (finishPendingDrop === finishNow) finishPendingDrop = null;
          restoreWidget();
          clone.style.transition = "opacity 140ms ease-out";
          clone.style.opacity = "0";
          fadeTimer = setTimeout(() => clone.remove(), 160);
        };
        const finishNow = () => {
          finish();
          clearTimeout(fadeTimer);
          clone.remove();
        };
        const onEnd = (e3) => {
          if (e3.target === clone && e3.propertyName === "transform") finish();
        };
        finishPendingDrop = finishNow;
        if (prefersReducedMotion()) {
          finish();
          return;
        }
        frame = requestAnimationFrame(() => {
          const inner = widgetRef.current?.children[0];
          if (!inner || !clone.isConnected) {
            finishNow();
            return;
          }
          const keep = clone.style.transform;
          clone.style.transition = "none";
          clone.style.transform = "none";
          const base = clone.getBoundingClientRect();
          clone.style.transform = keep;
          clone.offsetWidth;
          const target = getSettledRect(inner);
          const dx = target.left - base.left;
          const dy = target.top - base.top;
          const d3 = DROP_DURATION;
          clone.classList.add("widget-clone-dropping");
          clone.style.transition = [
            `transform ${d3}ms ${DROP_EASING}`,
            `width ${d3}ms ${DROP_EASING}`,
            `height ${d3}ms ${DROP_EASING}`,
            `box-shadow ${d3}ms ease-out`,
            `background-color ${d3}ms ease-out`
          ].join(", ");
          clone.style.transform = `translate(${dx}px, ${dy}px)`;
          clone.style.width = `${target.width}px`;
          clone.style.height = `${target.height}px`;
          clone.addEventListener("transitionend", onEnd);
          fallback = setTimeout(finish, d3 + 120);
        });
      }
      function preventNativeScroll(e3) {
        if (!dragging) return;
        e3.preventDefault();
      }
      function preventWidgetActivation(e3) {
        if (!window.editMode) return;
        e3.preventDefault();
        e3.stopPropagation();
      }
      function updatePos(e3) {
        if (typeof e3.clientX === "number" && typeof e3.clientY === "number") {
          currentPointerPosition = { x: e3.clientX, y: e3.clientY };
          if (editModePointerId === e3.pointerId && Math.hypot(
            currentPointerPosition.x - pointerPosition.x,
            currentPointerPosition.y - pointerPosition.y
          ) > editModeMoveTolerance) {
            cancelEditModeActivation(e3);
          }
          if (window.editMode && !dragging && pointerPosition && Math.hypot(
            currentPointerPosition.x - pointerPosition.x,
            currentPointerPosition.y - pointerPosition.y
          ) > editModeMoveTolerance) {
            clearTimeout(widgetDragTimeOut);
            clearTimeout(pressFeedbackTimeout);
            widget.classList.remove("widget-pressing");
          }
        }
        if (dragging) {
          if (activePointerId !== null && e3.pointerId !== activePointerId) return;
          e3.preventDefault();
          setClonePosition(currentPointerPosition.x, currentPointerPosition.y);
          clearTimeout(visualUpdateTimer);
          visualUpdateTimer = setTimeout(() => {
            visualUpdateTimer = null;
            updateLayout();
          }, 200);
          scheduleAutoScroll(getAutoScrollDirection());
        }
      }
      widget.addEventListener("pointerdown", startDragging);
      widget.addEventListener("click", preventWidgetActivation, true);
      document.addEventListener("pointermove", updatePos);
      document.addEventListener("pointerup", stopDragging);
      document.addEventListener("pointercancel", stopDragging);
      document.addEventListener("scroll", cancelEditModeActivation, true);
      document.addEventListener("touchmove", preventNativeScroll, { passive: false });
      return () => {
        finishPendingDrop?.();
        widget.removeAttribute("data-drag-placeholder");
        handle.remove();
        cancelEditModeActivation();
        clearTimeout(widgetDragTimeOut);
        clearTimeout(pressFeedbackTimeout);
        clearTimeout(visualUpdateTimer);
        clearAutoScroll();
        setDraggingMode(false);
        widget.classList.remove("widget-pressing");
        widget.removeEventListener("pointerdown", startDragging);
        widget.removeEventListener("click", preventWidgetActivation, true);
        document.removeEventListener("pointermove", updatePos);
        document.removeEventListener("pointerup", stopDragging);
        document.removeEventListener("pointercancel", stopDragging);
        document.removeEventListener("scroll", cancelEditModeActivation, true);
        document.removeEventListener("touchmove", preventNativeScroll);
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
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, { w: 4, h: 2 });
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
    function shortageNames(name) {
      const names = ["ang", "angielski", "pol", "polski", "biol", "biologia", "his", "historia", "biz", "biznes", "kul", "kultura", "wiedza", "wos", "fizyczne", "wf"];
      for (let i3 = 0; i3 < names.length / 2; i3 += 2) {
        if (name.includes(names[i3])) {
          return names[i3 + 1];
        }
      }
      return name;
    }
    function truncateSubject(name, maxLength = 10) {
      return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
    }
    const preparedGrades = gradesData.map((item) => ({
      value: normalizeGrade(item.grade),
      subject: shortageNames(item.subject || ""),
      subjectUrl: item.subjectUrl,
      description: item.description,
      gradeDescriptionUrl: item.gradeDescriptionUrl
    }));
    function GradeRow({ item, isLast = false, showDescription = false }) {
      const descriptionLinkRef = A2(null);
      const fancyboxHref = typeof item.gradeDescriptionUrl === "string" ? item.gradeDescriptionUrl.trim() : "";
      const hasFancyboxHref = fancyboxHref.length > 0;
      y2(() => {
        if (!showDescription) return;
        if (!hasFancyboxHref) return;
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
      }, [hasFancyboxHref, showDescription, fancyboxHref]);
      return /* @__PURE__ */ k("div", { className: `widget-grade-box ${showDescription ? "with-description" : ""}` }, /* @__PURE__ */ k("div", { className: "widget-grade-box-value" }, /* @__PURE__ */ k("span", null, item.value)), /* @__PURE__ */ k("div", { className: "grade-text" }, /* @__PURE__ */ k("a", { href: item.subjectUrl, title: item.subject }, item.subject), showDescription && hasFancyboxHref && /* @__PURE__ */ k(
        "a",
        {
          ref: descriptionLinkRef,
          href: fancyboxHref,
          className: "grade-description fancybox fancybox-text"
        },
        item.description
      ), showDescription && !hasFancyboxHref && /* @__PURE__ */ k("span", { className: "grade-description" }, item.description)));
    }
    function GradesList({ limit, lastLine = 1, showDescription = false, allHref = false }) {
      const visibleGrades = preparedGrades.slice(0, limit);
      const seeMoreHref = gradesData[0]?.seeMoreUrl;
      const shouldShowSeeMore = allHref && seeMoreHref && seeMoreHref !== "mogData";
      return /* @__PURE__ */ k(
        "div",
        {
          style: { width: `${previewWidth}px`, height: `${previewHeight}px`, gap: "var(--padding-1)" },
          className: "widget-content-container"
        },
        /* @__PURE__ */ k("div", { className: "widget-title-box", style: { marginBottom: "var(--padding-1)" } }, /* @__PURE__ */ k("h1", null, "Oceny"), /* @__PURE__ */ k(
          "svg",
          {
            className: "titleArrow",
            fill: "currentColor",
            version: "1.1",
            baseProfile: "tiny",
            id: "Layer_1",
            "xmlns:x": "&ns_extend;",
            "xmlns:i": "&ns_ai;",
            "xmlns:graph": "&ns_graphs;",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
            width: "16px",
            height: "16px",
            viewBox: "0 0 42 42",
            "xml:space": "preserve"
          },
          /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
        )),
        visibleGrades.map((item, index) => /* @__PURE__ */ k(
          GradeRow,
          {
            key: `${item.subjectUrl}-${index}`,
            item,
            isLast: index === visibleGrades.length - lastLine || index === visibleGrades.length - 1,
            showDescription
          }
        )),
        shouldShowSeeMore && /* @__PURE__ */ k("a", { className: "grades-all-link", href: seeMoreHref }, "Wszystkie oceny")
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
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("h1", null, "Oceny"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Grades41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("div", { className: "titleIcon" }, /* @__PURE__ */ k("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M8 8H8.01M16 8H16.01M12 12H12.01M16 16H16.01M8 16H8.01M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("h1", null, "Oceny"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
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
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "gradesWidget", "data-widget-id": widgetId, className: `widget w${width} h${height} ${window.editMode ? "edit-mode" : ""}` }, /* @__PURE__ */ k(
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
      { w: 4, h: 5 },
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
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, { w: 4, h: 1 });
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function SubjectRow({ item, isLast = false, showDescription = false }) {
      return /* @__PURE__ */ k("div", { className: `widget-subject-box ${isLast ? "last" : ""}` }, /* @__PURE__ */ k("a", { href: item.url }, item.name));
    }
    function SubjectsList({ lastLine = 1, classInfo = false }) {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Przedmioty"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )), /* @__PURE__ */ k("div", { className: "widget-subjects-list" }, subjects.subjects.map((item, index) => /* @__PURE__ */ k(
        SubjectRow,
        {
          key: `${item.name}-${index}`,
          item,
          isLast: index === subjects.subjects.length - lastLine || index === subjects.subjects.length - 1
        }
      ))));
    }
    function Subjects45() {
      return /* @__PURE__ */ k(SubjectsList, { lastLine: 2 });
    }
    function Subjects46() {
      return /* @__PURE__ */ k(SubjectsList, { lastLine: 2 });
    }
    function Subjects21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("h1", null, "Przedmioty"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Subjects41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("div", { className: "titleIcon" }, /* @__PURE__ */ k("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M5.63604 14.1238L7.05026 15.538M8.46447 11.2953L9.87868 12.7096M11.2929 8.46691L12.7071 9.88113M14.1213 5.63849L15.5355 7.0527M2.80762 16.9522L7.05026 21.1948L21.1924 7.0527L16.9498 2.81006L2.80762 16.9522Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("h1", null, "Przedmioty"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    const gradeVariants = {
      "21": Subjects21,
      "41": Subjects41,
      "45": Subjects45,
      "46": Subjects46
    };
    const Variant = gradeVariants[`${width}${height}`] || Subjects21;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "subjectsWidget", "data-widget-id": widgetId, className: `widget w${width} h${height} ${window.editMode ? "edit-mode" : ""}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/lessonNames.js
  var LESSON_ABBREVIATIONS = [
    { abbreviation: "ang", aliases: ["j\u0119zyk angielski", "angielski", "english"] },
    { abbreviation: "pol", aliases: ["j\u0119zyk polski", "polski"] },
    { abbreviation: "nie", aliases: ["j\u0119zyk niemiecki", "niemiecki"] },
    { abbreviation: "hsz", aliases: ["j\u0119zyk hiszpa\u0144ski", "hiszpa\u0144ski"] },
    { abbreviation: "fra", aliases: ["j\u0119zyk francuski", "francuski"] },
    { abbreviation: "w\u0142o", aliases: ["j\u0119zyk w\u0142oski", "w\u0142oski"] },
    { abbreviation: "ros", aliases: ["j\u0119zyk rosyjski", "rosyjski"] },
    { abbreviation: "ukr", aliases: ["j\u0119zyk ukrai\u0144ski", "ukrai\u0144ski"] },
    { abbreviation: "\u0142ac", aliases: ["j\u0119zyk \u0142aci\u0144ski", "\u0142aci\u0144ski", "\u0142acina"] },
    { abbreviation: "mat", aliases: ["matematyka"] },
    { abbreviation: "inf", aliases: ["informatyka", "technologia informacyjna", "technologie informacyjne"] },
    { abbreviation: "bio", aliases: ["biologia"] },
    { abbreviation: "geo", aliases: ["geografia"] },
    { abbreviation: "che", aliases: ["chemia"] },
    { abbreviation: "fiz", aliases: ["fizyka"] },
    { abbreviation: "his", aliases: ["historia"] },
    { abbreviation: "wos", aliases: ["wiedza o spo\u0142ecze\u0144stwie"] },
    { abbreviation: "biz", aliases: ["biznes i zarz\u0105dzanie", "biznes"] },
    { abbreviation: "prz", aliases: ["podstawy przedsi\u0119biorczo\u015Bci", "przedsi\u0119biorczo\u015B\u0107", "przyroda"] },
    { abbreviation: "wf", aliases: ["wychowanie fizyczne", "w-f", "wf"] },
    { abbreviation: "edb", aliases: ["edukacja dla bezpiecze\u0144stwa"] },
    { abbreviation: "rel", aliases: ["religia"] },
    { abbreviation: "ety", aliases: ["etyka"] },
    { abbreviation: "fil", aliases: ["filozofia"] },
    { abbreviation: "psy", aliases: ["psychologia"] },
    { abbreviation: "soc", aliases: ["socjologia"] },
    { abbreviation: "muz", aliases: ["muzyka"] },
    { abbreviation: "pla", aliases: ["plastyka"] },
    { abbreviation: "tec", aliases: ["technika"] },
    { abbreviation: "kul", aliases: ["wiedza o kulturze", "kultura"] },
    { abbreviation: "wyc", aliases: ["godzina wychowawcza", "zaj\u0119cia z wychowawc\u0105", "wychowawcza"] },
    { abbreviation: "edu", aliases: ["edukacja wczesnoszkolna"] },
    { abbreviation: "eko", aliases: ["ekonomia"] },
    { abbreviation: "pra", aliases: ["prawo"] },
    { abbreviation: "sta", aliases: ["statystyka"] },
    { abbreviation: "ast", aliases: ["astronomia"] },
    { abbreviation: "med", aliases: ["edukacja zdrowotna", "medycyna"] },
    { abbreviation: "pie", aliases: ["pierwsza pomoc"] },
    { abbreviation: "dor", aliases: ["doradztwo zawodowe"] },
    { abbreviation: "log", aliases: ["logopedia"] },
    { abbreviation: "rew", aliases: ["zaj\u0119cia rewalidacyjne", "rewalidacja"] },
    { abbreviation: "ter", aliases: ["terapia pedagogiczna"] },
    { abbreviation: "bib", aliases: ["zaj\u0119cia biblioteczne"] },
    { abbreviation: "zaw", aliases: ["przedmiot zawodowy", "zaj\u0119cia zawodowe"] }
  ];
  function normalizeLessonName(name) {
    return name.toLocaleLowerCase("pl-PL").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l").replace(/[._/\\-]+/g, " ").replace(/\s+/g, " ").trim();
  }
  function shortenLessonName(name) {
    const trimmedName = name.trim();
    if (!trimmedName) return "";
    const normalizedName = normalizeLessonName(trimmedName);
    const matchedSubject = LESSON_ABBREVIATIONS.find(
      ({ aliases }) => aliases.some((alias) => normalizedName.includes(normalizeLessonName(alias)))
    );
    if (matchedSubject) return matchedSubject.abbreviation;
    const languageName = normalizedName.match(/(?:^|\s)jezyk\s+([a-z]+)/)?.[1];
    if (languageName) return languageName.slice(0, 3);
    return Array.from(trimmedName.toLocaleLowerCase("pl-PL")).slice(0, 3).join("");
  }

  // src/content/components/widgets/schedule.jsx
  function Schedule({ widgetId, moveWidget: moveWidget2, data }) {
    const [scheduleYear, setScheduleYear] = d2(getSelectedScheduleYear);
    const schedule = applyScheduleYearTimes(data.schedule, scheduleYear);
    const possibleLayout = [
      { w: 4, h: 6 },
      { w: 2, h: 1 },
      { w: 4, h: 1 },
      { w: 2, h: 5 }
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
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, { w: 2, h: 1 });
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    y2(() => {
      const handleScheduleYearChange = (event) => {
        setScheduleYear(normalizeScheduleYear(event.detail?.year));
      };
      const handleStorageChange = (event) => {
        if (event.key === SCHEDULE_YEAR_STORAGE_KEY) {
          setScheduleYear(normalizeScheduleYear(event.newValue));
        }
      };
      window.addEventListener(SCHEDULE_YEAR_CHANGE_EVENT, handleScheduleYearChange);
      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener(SCHEDULE_YEAR_CHANGE_EVENT, handleScheduleYearChange);
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);
    function formatTodayKey() {
      const weekdayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      return weekdayKeys[(/* @__PURE__ */ new Date()).getDay()];
    }
    function compareTimes(left, right) {
      const leftStart = left.split("-")[0];
      const rightStart = right.split("-")[0];
      const [leftHour, leftMinute] = leftStart.split(":").map(Number);
      const [rightHour, rightMinute] = rightStart.split(":").map(Number);
      return leftHour * 60 + leftMinute - (rightHour * 60 + rightMinute);
    }
    function formatDayLabel(day, label) {
      const dayLabels = {
        monday: "Pon",
        tuesday: "Wt",
        wednesday: "\u015Ar",
        thursday: "Czw",
        friday: "Pt",
        saturday: "Sob",
        sunday: "Niedz"
      };
      return dayLabels[day] || label;
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
      if (mode === "today") {
        const day = scheduleDays[0];
        return /* @__PURE__ */ k("div", { className: "schedule-grid today" }, visibleTimes.map((time) => /* @__PURE__ */ k(
          "div",
          {
            key: `${day}-${time}`,
            className: "schedule-row",
            style: { gridTemplateColumns: "42px minmax(0, 1fr)" }
          },
          /* @__PURE__ */ k("div", { className: "time-cell" }, /* @__PURE__ */ k("span", null, time.split("-")[0]), /* @__PURE__ */ k("span", null, time.split("-")[1])),
          /* @__PURE__ */ k("div", { className: "lesson-cell" }, /* @__PURE__ */ k("a", { href: scheduleData?.[day]?.[time]?.subjectHref }, shortenLessonName(scheduleData?.[day]?.[time]?.subject || "")))
        )));
      }
      return /* @__PURE__ */ k("div", { className: "schedule-grid weekly" }, /* @__PURE__ */ k(
        "div",
        {
          className: "schedule-days-header",
          style: { gridTemplateColumns: `repeat(${scheduleDays.length}, minmax(0, 1fr))` }
        },
        scheduleDays.map((day) => {
          const firstLesson = Object.values(scheduleData?.[day] || {})[0];
          const label = firstLesson?.day || day;
          return /* @__PURE__ */ k("div", { key: day, className: "schedule-head" }, formatDayLabel(day, label));
        })
      ), visibleTimes.map((time) => /* @__PURE__ */ k(
        "div",
        {
          key: time,
          className: "schedule-row",
          style: { gridTemplateColumns: `42px repeat(${scheduleDays.length}, minmax(0, 1fr))` }
        },
        /* @__PURE__ */ k("div", { className: "time-cell" }, /* @__PURE__ */ k("span", null, time.split("-")[0]), /* @__PURE__ */ k("span", null, time.split("-")[1])),
        scheduleDays.map((day) => {
          const lesson = scheduleData?.[day]?.[time];
          return /* @__PURE__ */ k("div", { key: `${day}-${time}`, className: "lesson-cell" }, /* @__PURE__ */ k("a", { href: lesson?.subjectHref }, shortenLessonName(lesson?.subject || "")));
        })
      )));
    }
    function Schedule21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("h1", null, "Plan Lekcji"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Schedule41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("div", { className: "titleIcon" }, /* @__PURE__ */ k("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M3 9.5H21M3 14.5H21M8 4.5V19.5M6.2 19.5H17.8C18.9201 19.5 19.4802 19.5 19.908 19.282C20.2843 19.0903 20.5903 18.7843 20.782 18.408C21 17.9802 21 17.4201 21 16.3V7.7C21 6.5799 21 6.01984 20.782 5.59202C20.5903 5.21569 20.2843 4.90973 19.908 4.71799C19.4802 4.5 18.9201 4.5 17.8 4.5H6.2C5.0799 4.5 4.51984 4.5 4.09202 4.71799C3.71569 4.90973 3.40973 5.21569 3.21799 5.59202C3 6.01984 3 6.57989 3 7.7V16.3C3 17.4201 3 17.9802 3.21799 18.408C3.40973 18.7843 3.71569 19.0903 4.09202 19.282C4.51984 19.5 5.07989 19.5 6.2 19.5Z", stroke: "currentColor", "stroke-width": "2" }))), /* @__PURE__ */ k("h1", null, "Plan Lekcji"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Schedule25() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Plan Lekcji"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )), /* @__PURE__ */ k(ScheduleGrid, { scheduleData: schedule, mode: "today" }));
    }
    function Schedule46() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Plan Lekcji"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )), /* @__PURE__ */ k(ScheduleGrid, { scheduleData: schedule, mode: "all" }));
    }
    const gradeVariants = {
      "21": Schedule21,
      "41": Schedule41,
      "46": Schedule46,
      "25": Schedule25
    };
    const Variant = gradeVariants[`${width}${height}`] || Schedule21;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "scheduleWidget", "data-widget-id": widgetId, className: `widget w${width} h${height} ${window.editMode ? "edit-mode" : ""}` }, /* @__PURE__ */ k(
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
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, { w: 2, h: 1 });
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function NewsRow({ item, isLast = false }) {
      return /* @__PURE__ */ k("div", { className: `widget-news-box ${isLast ? "last" : ""}` }, /* @__PURE__ */ k("div", { className: "widget-news-box-date" }, /* @__PURE__ */ k("span", { className: "widget-news-box-date-day" }, item.date.slice(0, 2)), /* @__PURE__ */ k("br", null), /* @__PURE__ */ k("span", { className: "widget-news-box-date-month" }, item.date.slice(3, 6))), /* @__PURE__ */ k("a", { href: item.titleUrl }, item.title));
    }
    function NewsList({ limit, lastLine = 1 }) {
      const visibleNews = subjectNews.slice(0, limit);
      return /* @__PURE__ */ k(
        "div",
        {
          style: { width: `${previewWidth}px`, height: `${previewHeight}px` },
          className: "widget-content-container"
        },
        /* @__PURE__ */ k("div", { className: "widget-title-box", style: { marginBottom: "var(--padding-1)" } }, /* @__PURE__ */ k("h1", null, "Og\u0142oszenia Przedmiotowe"), /* @__PURE__ */ k(
          "svg",
          {
            className: "titleArrow",
            fill: "currentColor",
            version: "1.1",
            baseProfile: "tiny",
            id: "Layer_1",
            "xmlns:x": "&ns_extend;",
            "xmlns:i": "&ns_ai;",
            "xmlns:graph": "&ns_graphs;",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
            width: "16px",
            height: "16px",
            viewBox: "0 0 42 42",
            "xml:space": "preserve"
          },
          /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
        )),
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
      return /* @__PURE__ */ k(NewsList, { limit: 2, lastLine: 2 });
    }
    function Announcements21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("h1", null, "Og\u0142oszenia Przedmiotowe"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Announcements41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("div", { className: "titleIcon" }, /* @__PURE__ */ k("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M12 5V15M12 19H12.01", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("h1", null, "Og\u0142oszenia Przedmiotowe"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
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
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "announcementsWidget", "data-widget-id": widgetId, className: `widget w${width} h${height} ${window.editMode ? "edit-mode" : ""}` }, /* @__PURE__ */ k(
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
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, { w: 4, h: 2 });
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function NewsRow({ item, isLast = false }) {
      return /* @__PURE__ */ k("div", { className: `widget-news-box ${isLast ? "last" : ""}` }, /* @__PURE__ */ k("div", { className: "widget-news-box-date" }, /* @__PURE__ */ k("span", { className: "widget-news-box-date-day" }, item.date.slice(0, 2)), /* @__PURE__ */ k("br", null), /* @__PURE__ */ k("span", { className: "widget-news-box-date-month" }, item.date.slice(3, 6))), /* @__PURE__ */ k("a", { href: item.titleUrl }, item.title, " ", /* @__PURE__ */ k("br", null), " ", /* @__PURE__ */ k("span", { className: "widget-news-box-comments" }, "komentarze: ", item.comments)));
    }
    function NewsList({ limit, lastLine = 1, gradient = false, allHref = true }) {
      const visibleNews = news.slice(0, limit);
      const allNewsHref = "/informations";
      const shouldShowSeeMore = allHref && allNewsHref !== "mogData";
      return /* @__PURE__ */ k(
        "div",
        {
          style: { width: `${previewWidth}px`, height: `${previewHeight}px` },
          className: "widget-content-container"
        },
        /* @__PURE__ */ k("div", { className: "widget-title-box", style: { marginBottom: "var(--padding-1)" } }, /* @__PURE__ */ k("h1", null, "Aktualno\u015Bci"), /* @__PURE__ */ k(
          "svg",
          {
            className: "titleArrow",
            fill: "currentColor",
            version: "1.1",
            baseProfile: "tiny",
            id: "Layer_1",
            "xmlns:x": "&ns_extend;",
            "xmlns:i": "&ns_ai;",
            "xmlns:graph": "&ns_graphs;",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
            width: "16px",
            height: "16px",
            viewBox: "0 0 42 42",
            "xml:space": "preserve"
          },
          /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
        )),
        visibleNews.map((item, index) => /* @__PURE__ */ k(
          NewsRow,
          {
            key: `${item.subjectUrl}-${index}`,
            item,
            isLast: index === visibleNews.length - lastLine || index === visibleNews.length - 1
          }
        )),
        gradient && /* @__PURE__ */ k("div", { className: "widget-news-gradient" }),
        shouldShowSeeMore && !window.__IDU_MOCK_DATA && /* @__PURE__ */ k("a", { className: "grades-all-link", href: allNewsHref }, "Zobacz Wszystkie")
      );
    }
    function Announcements22() {
      return /* @__PURE__ */ k(NewsList, { limit: 2, gradient: true });
    }
    function Announcements42() {
      return /* @__PURE__ */ k(NewsList, { limit: 2, lastLine: 2, gradient: false, allHref: false });
    }
    function Announcements24() {
      return /* @__PURE__ */ k(NewsList, { limit: 6, gradient: true });
    }
    function Announcements44() {
      return /* @__PURE__ */ k(NewsList, { limit: 8, lastLine: 2, gradient: true });
    }
    function Announcements21() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("h1", null, "Aktualno\u015Bci"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Announcements41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("div", { className: "titleIcon" }, /* @__PURE__ */ k("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("h1", null, "Aktualno\u015Bci"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
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
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "newsWidget", "data-widget-id": widgetId, className: `widget w${width} h${height} ${window.editMode ? "edit-mode" : ""}` }, /* @__PURE__ */ k(
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
  var attendanceStatsStorageKey = "attendance.stats";
  function Attendance({ widgetId, moveWidget: moveWidget2, data }) {
    const attendance = data.attendance;
    const mockData = data.attendance[0].mockData;
    let possibleLayout;
    if (mockData) {
      possibleLayout = [
        { w: 2, h: 4 },
        { w: 4, h: 2 },
        { w: 2, h: 1 },
        { w: 4, h: 1 },
        { w: 4, h: 4 }
      ];
    } else {
      possibleLayout = [
        { w: 2, h: 2 },
        { w: 2, h: 4 },
        { w: 4, h: 2 },
        { w: 2, h: 1 },
        { w: 4, h: 1 },
        { w: 4, h: 4 }
      ];
    }
    const fullSize = { w: 4, h: 4 };
    const {
      width,
      height,
      previewWidth,
      previewHeight,
      widgetRef,
      resizeZoneRef,
      resizingRef
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, { w: 4, h: 1 });
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function normalizePercentage(value) {
      const number = Number(value);
      return Number.isFinite(number) ? number : 0;
    }
    function normalizeLessonName2(lessonName) {
      let names = ["fizyczne", "WF", "godzina", "GW", "biznes", "BIZ", "kultura", "kultura"];
      for (let i3 = 0; i3 < names.length; i3 += 2) {
        if (lessonName.includes(names[i3])) {
          return names[i3 + 1];
        }
      }
      return lessonName;
    }
    function loadData(storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return null;
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    async function fetchAttendanceStats() {
      let attendanceData = loadData(attendanceStatsStorageKey);
      if (attendanceData && attendanceData.date === (/* @__PURE__ */ new Date()).getDate()) {
        return attendanceData.summary;
      }
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
      localStorage.setItem(attendanceStatsStorageKey, JSON.stringify({ summary, date: (/* @__PURE__ */ new Date()).getDate() }));
      return summary;
    }
    function AttendanceRow({ item, rowWidth }) {
      return /* @__PURE__ */ k("div", { className: "attendance-row", style: { width: rowWidth } }, /* @__PURE__ */ k("div", { className: "attendance-row-subject" }, normalizeLessonName2(item.subject)), /* @__PURE__ */ k("div", { className: `attendance-row-value ${item.presence ? "ob" : ""} ${item.absence ? "nob" : ""} ${item.lateness ? "sp" : ""}` }, item.presence ? `OB` : "", " ", item.absence ? `NOB` : "", " ", item.lateness ? `SP` : ""));
    }
    function AttendanceGrid({ limit, width: width2 = "100%", graph = false, rowWidth = "100%", showMore = false }) {
      let usableData = attendance.slice(0, limit);
      const seeMoreHref = attendance[0]?.seeMoreUrl;
      const shouldShowSeeMore = showMore && seeMoreHref && seeMoreHref !== "mogData";
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px`, gap: "8px" }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "widget-title-box" }, /* @__PURE__ */ k("h1", null, "Obecno\u015Bci"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )), /* @__PURE__ */ k("div", { className: "attendance-grid", style: { width: width2 } }, usableData.map((item, index) => /* @__PURE__ */ k(
        AttendanceRow,
        {
          key: `${item.subjectUrl}-${index}`,
          item,
          rowWidth
        }
      ))), graph ? /* @__PURE__ */ k(AttendanceChart, { width: width2 }) : null, shouldShowSeeMore ? /* @__PURE__ */ k("a", { href: seeMoreHref, className: "grades-all-link" }, "Zobacz wi\u0119cej") : null);
    }
    function AttendanceChart({ width: width2 = "100%" }) {
      const [stats, setStats] = d2(null);
      if (mockData) {
        return /* @__PURE__ */ k("div", { style: { padding: "16px" } }, "...");
      }
      y2(() => {
        let cancelled = false;
        async function loadStats() {
          const data2 = await fetchAttendanceStats();
          data2.lateness = normalizePercentage(data2.lateness);
          data2.absence = normalizePercentage(data2.absence);
          data2.presence = normalizePercentage(data2.presence);
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
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("h1", null, "Obecno\u015B\u0107"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Attendance41() {
      return /* @__PURE__ */ k("div", { style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("div", { className: "titleIcon" }, /* @__PURE__ */ k("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M12 7V12L9.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("h1", null, "Obecno\u015B\u0107"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
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
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "attendanceWidget", "data-widget-id": widgetId, className: `widget w${width} h${height} ${window.editMode ? "edit-mode" : ""}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/widgets/comingEvents.jsx
  function ComingEvents({ widgetId, moveWidget: moveWidget2, data }) {
    const schoolNR = 35;
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
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, false, possibleLayout[0]);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function Messages21() {
      return /* @__PURE__ */ k("div", { onClick: () => window.open("/public_calendar/" + schoolNR, "_self"), style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("h1", null, "Kalendarz"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Messages41() {
      return /* @__PURE__ */ k("div", { onClick: () => window.open("/public_calendar/" + schoolNR, "_self"), style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("div", { className: "titleIcon" }, /* @__PURE__ */ k("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("h1", null, "Kalendarz"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    const contentVariants = {
      "21": Messages21,
      "41": Messages41
    };
    const Variant = contentVariants[`${width}${height}`] || Messages21;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "comingEventsWidgetWidget", "data-widget-id": widgetId, className: `widget w${width} h${height} ${window.editMode ? "edit-mode" : ""}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/widgets/lastReviews.jsx
  function LastReviews({ widgetId, moveWidget: moveWidget2, data }) {
    const reviewsHref = data.reviewsUrl;
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
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, false, possibleLayout[0]);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function Messages21() {
      return /* @__PURE__ */ k("div", { onClick: () => window.open(reviewsHref, "_self"), style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("h1", null, "Ostatnie Recenzje"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Messages41() {
      return /* @__PURE__ */ k("div", { onClick: () => window.open(reviewsHref, "_self"), style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("div", { className: "titleIcon" }, /* @__PURE__ */ k("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("h1", null, "Ostatnie Recenzje"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    const contentVariants = {
      "21": Messages21,
      "41": Messages41
    };
    const Variant = contentVariants[`${width}${height}`] || Messages21;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "reviewsWidgetWidget", "data-widget-id": widgetId, className: `widget w${width} h${height} ${window.editMode ? "edit-mode" : ""}` }, /* @__PURE__ */ k(
      "div",
      {
        className: "inner-widget",
        style: { width: `${previewWidth}px`, height: `${previewHeight}px`, position: "relative" }
      },
      /* @__PURE__ */ k(Variant, null),
      /* @__PURE__ */ k("div", { ref: resizeZoneRef, className: "resize-zone" })
    ));
  }

  // src/content/components/widgets/lastHomeWork.jsx
  function LastHomeWork({ widgetId, moveWidget: moveWidget2, data }) {
    const homeworkHref = data.homeworkUrl;
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
    } = useWidgetResize(possibleLayout, widgetId, 16, fullSize, false, possibleLayout[0]);
    useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget2, widgetId);
    function Messages21() {
      return /* @__PURE__ */ k("div", { onClick: () => window.open(homeworkHref, "_self"), style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("h1", null, "Praca Domowa"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    function Messages41() {
      return /* @__PURE__ */ k("div", { onClick: () => window.open(homeworkHref, "_self"), style: { width: `${previewWidth}px`, height: `${previewHeight}px` }, className: "widget-content-container" }, /* @__PURE__ */ k("div", { className: "small-title-box" }, /* @__PURE__ */ k("div", { className: "titleIcon" }, /* @__PURE__ */ k("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k("path", { d: "M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12M14 21V15H10V21", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("h1", null, "Praca Domowa"), /* @__PURE__ */ k(
        "svg",
        {
          className: "titleArrow",
          fill: "currentColor",
          version: "1.1",
          baseProfile: "tiny",
          id: "Layer_1",
          "xmlns:x": "&ns_extend;",
          "xmlns:i": "&ns_ai;",
          "xmlns:graph": "&ns_graphs;",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:a": "http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/",
          width: "16px",
          height: "16px",
          viewBox: "0 0 42 42",
          "xml:space": "preserve"
        },
        /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " })
      )));
    }
    const contentVariants = {
      "21": Messages21,
      "41": Messages41
    };
    const Variant = contentVariants[`${width}${height}`] || Messages21;
    return /* @__PURE__ */ k("div", { ref: widgetRef, id: "homeWorkWidgetWidget", "data-widget-id": widgetId, className: `widget w${width} h${height} ${window.editMode ? "edit-mode" : ""}` }, /* @__PURE__ */ k(
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
    comingEvents: ComingEvents,
    reviews: LastReviews,
    homework: LastHomeWork
  };
  var initialWidgets = [
    { id: "grades", type: "grades" },
    { id: "subjects", type: "subjects" },
    { id: "schedule", type: "schedule" },
    { id: "subjectNews", type: "subjectNews" },
    { id: "news", type: "news" },
    { id: "attendance", type: "attendance" },
    { id: "comingEvents", type: "comingEvents" },
    { id: "reviews", type: "reviews" },
    { id: "homework", type: "homework" }
  ];
  if (window.__IDU_MOCK_DATA) {
    initialWidgets = [
      { id: "grades", type: "grades" },
      { id: "subjects", type: "subjects" },
      { id: "schedule", type: "schedule" },
      { id: "subjectNews", type: "subjectNews" },
      { id: "news", type: "news" },
      { id: "attendance", type: "attendance" }
    ];
  }
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
  function reorderWidgets(list, orderedIds) {
    const byId = new Map(list.map((widget) => [widget.id, widget]));
    const ordered = orderedIds.map((id) => byId.get(id)).filter(Boolean);
    if (ordered.length !== list.length) return list;
    const unchanged = ordered.every((widget, index) => widget === list[index]);
    return unchanged ? list : ordered;
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
    const gridRef = A2(null);
    const reflowSnapshotRef = A2(null);
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
    _2(() => {
      const before = reflowSnapshotRef.current;
      reflowSnapshotRef.current = null;
      const grid = gridRef.current;
      if (!before || !grid || prefersReducedMotion()) return;
      const moved = [];
      for (const el of grid.children) {
        const prev = before.get(el.dataset.widgetId);
        if (!prev) continue;
        el.style.transition = "none";
        el.style.transform = "";
        const next = el.getBoundingClientRect();
        const dx = prev.left - next.left;
        const dy = prev.top - next.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
          el.style.transition = "";
          continue;
        }
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        moved.push(el);
      }
      if (!moved.length) return;
      grid.offsetWidth;
      for (const el of moved) {
        el.style.transition = `transform ${REFLOW_DURATION}ms ${REFLOW_EASING}`;
        el.style.transform = "";
        const cleanup = (e3) => {
          if (e3 && (e3.target !== el || e3.propertyName !== "transform")) return;
          el.removeEventListener("transitionend", cleanup);
          if (!el.style.transform) el.style.transition = "";
        };
        el.addEventListener("transitionend", cleanup);
      }
    }, [widgets]);
    function handleMoveWidget(movedId, targetId) {
      const grid = gridRef.current;
      if (grid) {
        const snapshot = /* @__PURE__ */ new Map();
        for (const el of grid.children) {
          snapshot.set(el.dataset.widgetId, el.getBoundingClientRect());
        }
        reflowSnapshotRef.current = snapshot;
      }
      setWidgets((currentWidgets) => Array.isArray(targetId) ? reorderWidgets(currentWidgets, targetId) : moveWidget(currentWidgets, movedId, targetId));
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
    return /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("div", { className: "widgets-grid", ref: gridRef }, widgets.map(renderWidget)));
  }

  // node_modules/preact/compat/dist/compat.module.js
  function g3(n2, t3) {
    for (var e3 in t3) n2[e3] = t3[e3];
    return n2;
  }
  function E2(n2, t3) {
    for (var e3 in n2) if ("__source" !== e3 && !(e3 in t3)) return true;
    for (var r3 in t3) if ("__source" !== r3 && n2[r3] !== t3[r3]) return true;
    return false;
  }
  function M2(n2, t3) {
    this.props = n2, this.context = t3;
  }
  function N2(n2, e3) {
    function r3(n3) {
      var t3 = this.props.ref;
      return t3 != n3.ref && t3 && ("function" == typeof t3 ? t3(null) : t3.current = null), e3 ? !e3(this.props, n3) || t3 != n3.ref : E2(this.props, n3);
    }
    function u3(e4) {
      return this.shouldComponentUpdate = r3, k(n2, e4);
    }
    return u3.displayName = "Memo(" + (n2.displayName || n2.name) + ")", u3.__f = u3.prototype.isReactComponent = true, u3.type = n2, u3;
  }
  (M2.prototype = new C()).isPureReactComponent = true, M2.prototype.shouldComponentUpdate = function(n2, t3) {
    return E2(this.props, n2) || E2(this.state, t3);
  };
  var T3 = l.__b;
  l.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T3 && T3(n2);
  };
  var A3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  var O2 = l.__e;
  l.__e = function(n2, t3, e3, r3) {
    if (n2.then) {
      for (var u3, o3 = t3; o3 = o3.__; ) if ((u3 = o3.__c) && u3.__c) return null == t3.__e && (t3.__e = e3.__e, t3.__k = e3.__k), u3.__c(n2, t3);
    }
    O2(n2, t3, e3, r3);
  };
  var U2 = l.unmount;
  function V2(n2, t3, e3) {
    return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
      "function" == typeof n3.__c && n3.__c();
    }), n2.__c.__H = null), null != (n2 = g3({}, n2)).__c && (n2.__c.__P === e3 && (n2.__c.__P = t3), n2.__c.__e = true, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
      return V2(n3, t3, e3);
    })), n2;
  }
  function W2(n2, t3, e3) {
    return n2 && e3 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
      return W2(n3, t3, e3);
    }), n2.__c && n2.__c.__P === t3 && (n2.__e && e3.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e3)), n2;
  }
  function P3() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j3(n2) {
    var t3 = n2.__ && n2.__.__c;
    return t3 && t3.__a && t3.__a(n2);
  }
  function B3() {
    this.i = null, this.l = null;
  }
  l.unmount = function(n2) {
    var t3 = n2.__c;
    t3 && (t3.__z = true), t3 && t3.__R && t3.__R(), t3 && 32 & n2.__u && (n2.type = null), U2 && U2(n2);
  }, (P3.prototype = new C()).__c = function(n2, t3) {
    var e3 = t3.__c, r3 = this;
    null == r3.o && (r3.o = []), r3.o.push(e3);
    var u3 = j3(r3.__v), o3 = false, i3 = function() {
      o3 || r3.__z || (o3 = true, e3.__R = null, u3 ? u3(c3) : c3());
    };
    e3.__R = i3;
    var l3 = e3.__P;
    e3.__P = null;
    var c3 = function() {
      if (!--r3.__u) {
        if (r3.state.__a) {
          var n3 = r3.state.__a;
          r3.__v.__k[0] = W2(n3, n3.__c.__P, n3.__c.__O);
        }
        var t4;
        for (r3.setState({ __a: r3.__b = null }); t4 = r3.o.pop(); ) t4.__P = l3, t4.forceUpdate();
      }
    };
    r3.__u++ || 32 & t3.__u || r3.setState({ __a: r3.__b = r3.__v.__k[0] }), n2.then(i3, i3);
  }, P3.prototype.componentWillUnmount = function() {
    this.o = [];
  }, P3.prototype.render = function(n2, e3) {
    if (this.__b) {
      if (this.__v.__k) {
        var r3 = document.createElement("div"), o3 = this.__v.__k[0].__c;
        this.__v.__k[0] = V2(this.__b, r3, o3.__O = o3.__P);
      }
      this.__b = null;
    }
    var i3 = e3.__a && k(S, null, n2.fallback);
    return i3 && (i3.__u &= -33), [k(S, null, e3.__a ? null : n2.children), i3];
  };
  var H2 = function(n2, t3, e3) {
    if (++e3[1] === e3[0] && n2.l.delete(t3), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e3 = n2.i; e3; ) {
      for (; e3.length > 3; ) e3.pop()();
      if (e3[1] < e3[0]) break;
      n2.i = e3 = e3[2];
    }
  };
  function Z(n2) {
    return this.getChildContext = function() {
      return n2.context;
    }, n2.children;
  }
  function Y(n2) {
    var e3 = this, r3 = n2.h;
    if (e3.componentWillUnmount = function() {
      R(null, e3.v), e3.v = null, e3.h = null;
    }, e3.h && e3.h !== r3 && e3.componentWillUnmount(), !e3.v) {
      for (var u3 = e3.__v; null !== u3 && !u3.__m && null !== u3.__; ) u3 = u3.__;
      e3.h = r3, e3.v = { nodeType: 1, parentNode: r3, childNodes: [], __k: { __m: u3.__m }, contains: function() {
        return true;
      }, namespaceURI: r3.namespaceURI, insertBefore: function(n3, t3) {
        this.childNodes.push(n3), e3.h.insertBefore(n3, t3);
      }, removeChild: function(n3) {
        this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), e3.h.removeChild(n3);
      } };
    }
    R(k(Z, { context: e3.context }, n2.__v), e3.v);
  }
  function $2(n2, e3) {
    var r3 = k(Y, { __v: n2, h: e3 });
    return r3.containerInfo = e3, r3;
  }
  (B3.prototype = new C()).__a = function(n2) {
    var t3 = this, e3 = j3(t3.__v), r3 = t3.l.get(n2);
    return r3[0]++, function(u3) {
      var o3 = function() {
        t3.props.revealOrder ? (r3.push(u3), H2(t3, n2, r3)) : u3();
      };
      e3 ? e3(o3) : o3();
    };
  }, B3.prototype.render = function(n2) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var t3 = F(n2.children);
    n2.revealOrder && "b" === n2.revealOrder[0] && t3.reverse();
    for (var e3 = t3.length; e3--; ) this.l.set(t3[e3], this.i = [1, 0, this.i]);
    return n2.children;
  }, B3.prototype.componentDidUpdate = B3.prototype.componentDidMount = function() {
    var n2 = this;
    this.l.forEach(function(t3, e3) {
      H2(n2, e3, t3);
    });
  };
  var q3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
  var G2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
  var J2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
  var K2 = /[A-Z0-9]/g;
  var Q2 = "undefined" != typeof document;
  var X2 = function(n2) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
  };
  C.prototype.isReactComponent = true, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
    Object.defineProperty(C.prototype, t3, { configurable: true, get: function() {
      return this["UNSAFE_" + t3];
    }, set: function(n2) {
      Object.defineProperty(this, t3, { configurable: true, writable: true, value: n2 });
    } });
  });
  var en = l.event;
  l.event = function(n2) {
    return en && (n2 = en(n2)), n2.persist = function() {
    }, n2.isPropagationStopped = function() {
      return this.cancelBubble;
    }, n2.isDefaultPrevented = function() {
      return this.defaultPrevented;
    }, n2.nativeEvent = n2;
  };
  var rn;
  var un = { configurable: true, get: function() {
    return this.class;
  } };
  var on = l.vnode;
  l.vnode = function(n2) {
    "string" == typeof n2.type && function(n3) {
      var t3 = n3.props, e3 = n3.type, u3 = {}, o3 = -1 == e3.indexOf("-");
      for (var i3 in t3) {
        var l3 = t3[i3];
        if (!("value" === i3 && "defaultValue" in t3 && null == l3 || Q2 && "children" === i3 && "noscript" === e3 || "class" === i3 || "className" === i3)) {
          var c3 = i3.toLowerCase();
          "defaultValue" === i3 && "value" in t3 && null == t3.value ? i3 = "value" : "download" === i3 && true === l3 ? l3 = "" : "translate" === c3 && "no" === l3 ? l3 = false : "o" === c3[0] && "n" === c3[1] ? "ondoubleclick" === c3 ? i3 = "ondblclick" : "onchange" !== c3 || "input" !== e3 && "textarea" !== e3 || X2(t3.type) ? "onfocus" === c3 ? i3 = "onfocusin" : "onblur" === c3 ? i3 = "onfocusout" : J2.test(i3) && (i3 = c3) : c3 = i3 = "oninput" : o3 && G2.test(i3) ? i3 = i3.replace(K2, "-$&").toLowerCase() : null === l3 && (l3 = void 0), "oninput" === c3 && u3[i3 = c3] && (i3 = "oninputCapture"), u3[i3] = l3;
        }
      }
      "select" == e3 && (u3.multiple && Array.isArray(u3.value) && (u3.value = F(t3.children).forEach(function(n4) {
        n4.props.selected = -1 != u3.value.indexOf(n4.props.value);
      })), null != u3.defaultValue && (u3.value = F(t3.children).forEach(function(n4) {
        n4.props.selected = u3.multiple ? -1 != u3.defaultValue.indexOf(n4.props.value) : u3.defaultValue == n4.props.value;
      }))), t3.class && !t3.className ? (u3.class = t3.class, Object.defineProperty(u3, "className", un)) : t3.className && (u3.class = u3.className = t3.className), n3.props = u3;
    }(n2), n2.$$typeof = q3, on && on(n2);
  };
  var ln = l.__r;
  l.__r = function(n2) {
    ln && ln(n2), rn = n2.__c;
  };
  var cn = l.diffed;
  l.diffed = function(n2) {
    cn && cn(n2);
    var t3 = n2.props, e3 = n2.__e;
    null != e3 && "textarea" === n2.type && "value" in t3 && t3.value !== e3.value && (e3.value = null == t3.value ? "" : t3.value), rn = null;
  };

  // src/content/components/studentProfile.jsx
  var LIST_PREVIEW_COUNT = 5;
  var WEEKDAY_SHORT = {
    monday: "Pon",
    tuesday: "Wt",
    wednesday: "\u015Ar",
    thursday: "Czw",
    friday: "Pt",
    saturday: "Sob",
    sunday: "Nd"
  };
  var LEVEL_LABELS = { P: "Poziom podstawowy", R: "Poziom rozszerzony" };
  var MONTHS = { sty: 0, lut: 1, mar: 2, kwi: 3, maj: 4, cze: 5, lip: 6, sie: 7, wrz: 8, pa\u017A: 9, paz: 9, lis: 10, gru: 11 };
  var ATTENDANCE_LABELS = { presence: "Obecno\u015B\u0107", absence: "Nieobecno\u015B\u0107", lateness: "Sp\xF3\u017Anienie", excused: "Usprawiedliwione", other: "Inne" };
  function parsePolishDate(text) {
    const match = (text || "").match(/(\d{1,2})\s+([a-ząćęłńóśźż]{3})\w*\s+(\d{4})/i);
    if (!match) return null;
    const month = MONTHS[match[2].toLocaleLowerCase("pl-PL")];
    return month === void 0 ? null : new Date(Number(match[3]), month, Number(match[1]));
  }
  function daysUntilLabel(date) {
    if (!date) return "";
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.round((date - today) / 864e5);
    if (days < 0) return "";
    if (days === 0) return "dzi\u015B";
    if (days === 1) return "jutro";
    return `za ${days} dni`;
  }
  function phoneHref(value) {
    const digits = (value || "").replace(/[^\d+]/g, "");
    return digits.length >= 6 ? `tel:${digits}` : "";
  }
  function initialsOf(name) {
    return (name || "").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase("pl-PL");
  }
  function layoutFields(fields) {
    const result = [];
    let column = 0;
    fields.forEach((field, index) => {
      if (field.wide) {
        result.push(field);
        column = 0;
        return;
      }
      const next = fields[index + 1];
      const alone = column === 0 && (!next || next.wide);
      result.push(alone ? { ...field, wide: true } : field);
      column = alone ? 0 : (column + 1) % 2;
    });
    return result;
  }
  function Chevron({ open = false }) {
    return /* @__PURE__ */ k("svg", { className: `idu-profile-chevron-icon${open ? " open" : ""}`, width: "14", height: "14", viewBox: "0 0 42 42", fill: "currentColor", "aria-hidden": "true" }, /* @__PURE__ */ k("polygon", { "fill-rule": "evenodd", points: "13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933" }));
  }
  function Card({ index, title, href, subtitle, children, className = "" }) {
    const heading = /* @__PURE__ */ k("h2", { className: "idu-profile-card-title" }, title);
    return /* @__PURE__ */ k("article", { className: `idu-profile-card ${className}`, style: { "--i": index } }, title && /* @__PURE__ */ k("div", { className: "idu-profile-card-head" }, href ? /* @__PURE__ */ k("a", { className: "idu-profile-card-link", href }, heading, /* @__PURE__ */ k(Chevron, null)) : heading, subtitle && /* @__PURE__ */ k("p", { className: "idu-profile-card-subtitle" }, subtitle)), children);
  }
  function MoreButton({ expanded, total, onClick }) {
    return /* @__PURE__ */ k("button", { type: "button", className: "idu-profile-more", onClick, "aria-expanded": expanded }, expanded ? "Poka\u017C mniej \u2191" : `Poka\u017C wszystkie (${total}) \u2193`);
  }
  function SeeAllLink({ href }) {
    return href ? /* @__PURE__ */ k("a", { className: "idu-profile-see-all", href }, "Zobacz wszystkie \u2192") : null;
  }
  function CardFoot({ button, href }) {
    if (!button && !href) return null;
    return /* @__PURE__ */ k("div", { className: "idu-profile-card-foot" }, button, /* @__PURE__ */ k(SeeAllLink, { href }));
  }
  function usePreview(items) {
    const [expanded, setExpanded] = d2(false);
    const canExpand = items.length > LIST_PREVIEW_COUNT;
    return {
      visible: expanded || !canExpand ? items : items.slice(0, LIST_PREVIEW_COUNT),
      button: canExpand ? /* @__PURE__ */ k(MoreButton, { expanded, total: items.length, onClick: () => setExpanded(!expanded) }) : null
    };
  }
  function PhotoViewer({ src, fallback, name, onClose }) {
    const closeRef = A2(null);
    const [current, setCurrent] = d2(src);
    const [closing, setClosing] = d2(false);
    const close = () => {
      if (closing) return;
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return onClose();
      setClosing(true);
      setTimeout(onClose, 180);
    };
    y2(() => {
      const previousFocus = document.activeElement;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
      const onKey = (event) => {
        if (event.key === "Escape") close();
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = previousOverflow;
        previousFocus?.focus?.();
      };
    }, []);
    return $2(
      /* @__PURE__ */ k(
        "div",
        {
          className: `idu-photo-viewer${closing ? " closing" : ""}`,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": name ? `Zdj\u0119cie: ${name}` : "Zdj\u0119cie",
          onClick: (event) => {
            if (event.target === event.currentTarget) close();
          }
        },
        /* @__PURE__ */ k("button", { ref: closeRef, type: "button", className: "idu-photo-viewer-close", "aria-label": "Zamknij", onClick: close }, /* @__PURE__ */ k("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ k("path", { d: "M6 6l12 12M18 6L6 18", stroke: "currentColor", "stroke-width": "2.4", "stroke-linecap": "round" }))),
        /* @__PURE__ */ k("figure", { className: "idu-photo-viewer-figure", onClick: (event) => event.stopPropagation() }, /* @__PURE__ */ k(
          "img",
          {
            src: current,
            alt: name,
            className: current === fallback && fallback !== src ? "blurred" : "",
            onError: () => {
              if (fallback && current !== fallback) setCurrent(fallback);
            }
          }
        ), name && /* @__PURE__ */ k("figcaption", null, name))
      ),
      document.body
    );
  }
  var Avatar = N2(function Avatar2({ name, photoUrl }) {
    const imgRef = A2(null);
    const [viewer, setViewer] = d2(null);
    const replacement = window.getProfileImageReplacement?.(name) || null;
    const src = replacement ? replacement.tiny : photoUrl;
    _2(() => {
      if (replacement && imgRef.current) window.upgradeProfileImage?.(imgRef.current, name);
    }, [name]);
    if (!src) {
      return /* @__PURE__ */ k("div", { className: "idu-profile-avatar" }, /* @__PURE__ */ k("span", { className: "idu-profile-avatar-initials" }, initialsOf(name) || "?"));
    }
    const open = () => {
      const shown = imgRef.current?.currentSrc || imgRef.current?.src || src;
      setViewer({ src: replacement ? replacement.full : shown, fallback: replacement ? shown : "" });
    };
    return [
      /* @__PURE__ */ k("button", { key: "avatar", type: "button", className: "idu-profile-avatar clickable", onClick: open, "aria-label": "Powi\u0119ksz zdj\u0119cie", "aria-haspopup": "dialog" }, /* @__PURE__ */ k("img", { ref: imgRef, src, alt: name, "data-idu-profile-photo": "", "data-student-name": name })),
      viewer && /* @__PURE__ */ k(PhotoViewer, { key: "viewer", src: viewer.src, fallback: viewer.fallback, name, onClose: () => setViewer(null) })
    ];
  });
  function FieldValue({ field }) {
    if (field.type === "email") {
      const address = field.lines.join(" ").match(/\S+@\S+/)?.[0];
      return address ? /* @__PURE__ */ k("a", { href: `mailto:${address}` }, field.lines.join(" ")) : field.lines.join(" ");
    }
    if (field.type === "phone") {
      const href = phoneHref(field.lines.join(" "));
      return href ? /* @__PURE__ */ k("a", { href }, field.lines.join(" ")) : field.lines.join(" ");
    }
    if (field.type === "links" && field.links.length) {
      return field.links.map((link, index) => /* @__PURE__ */ k("span", { key: link.href }, index > 0 && ", ", /* @__PURE__ */ k("a", { href: link.href, target: "_blank", rel: "noopener noreferrer" }, link.text)));
    }
    if (field.href) return /* @__PURE__ */ k("a", { href: field.href }, field.lines.join(" "));
    return field.lines.map((line, index) => /* @__PURE__ */ k("span", { key: index, className: "idu-profile-line" }, line));
  }
  function FieldGrid({ fields }) {
    if (!fields.length) return null;
    return /* @__PURE__ */ k("dl", { className: "idu-profile-grid" }, layoutFields(fields).map((field) => /* @__PURE__ */ k("div", { key: field.key, className: `idu-profile-field${field.wide ? " wide" : ""}` }, /* @__PURE__ */ k("dt", null, field.label), /* @__PURE__ */ k("dd", null, /* @__PURE__ */ k(FieldValue, { field })))));
  }
  function Section({ title, children }) {
    return /* @__PURE__ */ k("section", { className: "idu-profile-section" }, /* @__PURE__ */ k("h3", { className: "idu-profile-section-title" }, title), children);
  }
  function mergeAddresses(fields) {
    const merged = [];
    for (const field of fields) {
      const same = merged.find((other) => other.lines.join("\n") === field.lines.join("\n"));
      if (same) {
        same.labels.push(field.label);
      } else {
        merged.push({ ...field, labels: [field.label] });
      }
    }
    return merged.map((field) => ({
      ...field,
      label: field.labels.length === 1 ? field.labels[0] : `Adres ${field.labels.map((label) => label.replace(/^Adres\s+/i, "")).join(" \xB7 ")}`
    }));
  }
  function ProfileCard({ profile, index }) {
    const headerFields = [
      profile.year && { key: "year", label: "Rocznik", lines: [profile.year] },
      profile.klass && { key: "klass", label: "Klasa", lines: [profile.klass], href: profile.klassUrl }
    ].filter(Boolean);
    const tutors = profile.tutors || [];
    const { contact, addresses, student } = profile.sections;
    return /* @__PURE__ */ k(Card, { index, className: "idu-profile-main" }, /* @__PURE__ */ k("div", { className: "idu-profile-identity" }, /* @__PURE__ */ k(Avatar, { name: profile.name, photoUrl: profile.photoUrl }), /* @__PURE__ */ k("div", { className: "idu-profile-identity-text" }, /* @__PURE__ */ k("h2", { className: "idu-profile-name" }, profile.name || "Ucze\u0144"), profile.editUrl && /* @__PURE__ */ k("a", { className: "idu-profile-edit", href: profile.editUrl }, "Edytuj profil"))), profile.messageUrl && /* @__PURE__ */ k("a", { className: "idu-profile-action", href: profile.messageUrl }, /* @__PURE__ */ k("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ k("path", { d: "M4 6.5h16v11H4z", stroke: "currentColor", "stroke-width": "2", "stroke-linejoin": "round" }), /* @__PURE__ */ k("path", { d: "m4.5 7 7.5 6 7.5-6", stroke: "currentColor", "stroke-width": "2", "stroke-linejoin": "round" })), "Wy\u015Blij wiadomo\u015B\u0107"), (headerFields.length > 0 || tutors.length > 0) && /* @__PURE__ */ k("dl", { className: "idu-profile-grid idu-profile-header-grid" }, layoutFields([
      ...headerFields,
      ...tutors.length ? [{ key: "tutor", label: tutors.length > 1 ? "Wychowawcy" : "Wychowawca", tutors, wide: true }] : []
    ]).map((field) => /* @__PURE__ */ k("div", { key: field.key, className: `idu-profile-field${field.wide ? " wide" : ""}` }, /* @__PURE__ */ k("dt", null, field.label), /* @__PURE__ */ k("dd", null, field.tutors ? field.tutors.map((tutor, i3) => /* @__PURE__ */ k("span", { key: i3 }, i3 > 0 && ", ", tutor.href ? /* @__PURE__ */ k("a", { href: tutor.href }, tutor.name) : tutor.name)) : /* @__PURE__ */ k(FieldValue, { field }))))), profile.parents.length > 0 && /* @__PURE__ */ k(Section, { title: "Rodzice / opiekunowie" }, /* @__PURE__ */ k("div", { className: "idu-profile-chips parents" }, profile.parents.map((parent, i3) => parent.href ? /* @__PURE__ */ k("a", { key: i3, className: "idu-profile-chip", style: { "--i": i3 }, href: parent.href }, parent.name) : /* @__PURE__ */ k("span", { key: i3, className: "idu-profile-chip", style: { "--i": i3 } }, parent.name)))), contact.length > 0 && /* @__PURE__ */ k(Section, { title: "Dane kontaktowe" }, /* @__PURE__ */ k(FieldGrid, { fields: contact })), addresses.length > 0 && /* @__PURE__ */ k(Section, { title: "Adresy" }, /* @__PURE__ */ k(FieldGrid, { fields: mergeAddresses(addresses) })), student.length > 0 && /* @__PURE__ */ k(Section, { title: "Dane ucznia" }, /* @__PURE__ */ k(FieldGrid, { fields: student })));
  }
  function ExamsCard({ exams, index }) {
    const { visible, button } = usePreview(exams);
    return /* @__PURE__ */ k(Card, { index, title: "Sprawdziany", subtitle: "Najbli\u017Csze zapowiedziane" }, /* @__PURE__ */ k("ul", { className: "idu-profile-list" }, visible.map((exam, i3) => {
      const date = parsePolishDate(exam.date);
      const until = daysUntilLabel(date);
      return /* @__PURE__ */ k("li", { key: i3, className: "idu-profile-row", style: { "--i": i3 } }, /* @__PURE__ */ k("div", { className: "idu-profile-date-badge" }, date && /* @__PURE__ */ k("span", { className: "day" }, date.getDate()), /* @__PURE__ */ k("span", { className: "month" }, date ? exam.date.split(/\s+/)[1] : exam.date)), /* @__PURE__ */ k("div", { className: "idu-profile-row-main" }, /* @__PURE__ */ k("div", { className: "idu-profile-row-top" }, exam.subjectUrl ? /* @__PURE__ */ k("a", { className: "idu-profile-row-title", href: exam.subjectUrl }, exam.subject) : /* @__PURE__ */ k("span", { className: "idu-profile-row-title" }, exam.subject), until && /* @__PURE__ */ k("span", { className: `idu-profile-tag${/dziś|jutro/.test(until) ? " soon" : ""}` }, until)), (exam.name || exam.description) && /* @__PURE__ */ k("p", { className: "idu-profile-row-text" }, exam.name, exam.name && exam.description && exam.description !== exam.name ? " \xB7 " : "", exam.description !== exam.name ? exam.description : "")));
    })), /* @__PURE__ */ k(CardFoot, { button }));
  }
  function GradesCard({ grades, href, index }) {
    const { visible, button } = usePreview(grades);
    const [open, setOpen] = d2(null);
    const unseen = grades.filter((grade) => grade.unseen).length;
    return /* @__PURE__ */ k(Card, { index, title: "Ostatnie oceny", href, subtitle: unseen ? `${unseen} ${unseen === 1 ? "nowa" : unseen < 5 ? "nowe" : "nowych"}` : "" }, /* @__PURE__ */ k("ul", { className: "idu-profile-list" }, visible.map((grade, i3) => {
      const isShort = grade.grade.length <= 6;
      const isOpen = open === i3;
      const expandable = Boolean(grade.detail);
      return /* @__PURE__ */ k("li", { key: i3, className: `idu-profile-row grade${grade.unseen ? " unseen" : ""}${isOpen ? " open" : ""}`, style: { "--i": i3 } }, /* @__PURE__ */ k("div", { className: `idu-profile-grade-badge${isShort ? "" : " text"}`, "aria-hidden": !isShort }, isShort ? grade.grade : /* @__PURE__ */ k("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none" }, /* @__PURE__ */ k("path", { d: "M5 5h14v10H9l-4 4z", stroke: "currentColor", "stroke-width": "2", "stroke-linejoin": "round" }))), /* @__PURE__ */ k("div", { className: "idu-profile-row-main" }, /* @__PURE__ */ k("div", { className: "idu-profile-row-top" }, grade.subjectUrl ? /* @__PURE__ */ k("a", { className: "idu-profile-row-title", href: grade.subjectUrl }, grade.subject) : /* @__PURE__ */ k("span", { className: "idu-profile-row-title" }, grade.subject), grade.unseen && /* @__PURE__ */ k("span", { className: "idu-profile-tag new" }, "nowa")), grade.description && /* @__PURE__ */ k("p", { className: "idu-profile-row-text" }, grade.description), !isShort && !isOpen && /* @__PURE__ */ k("p", { className: "idu-profile-row-quote" }, grade.grade), isOpen && /* @__PURE__ */ k("p", { className: "idu-profile-row-detail" }, grade.detail), /* @__PURE__ */ k("div", { className: "idu-profile-row-meta" }, /* @__PURE__ */ k("span", null, grade.date), expandable && /* @__PURE__ */ k("button", { type: "button", className: "idu-profile-link-button", onClick: () => setOpen(isOpen ? null : i3), "aria-expanded": isOpen }, isOpen ? "Zwi\u0144" : "Poka\u017C opis"))));
    })), /* @__PURE__ */ k(CardFoot, { button, href }));
  }
  function AttendanceCard({ attendance, href, index }) {
    const { visible, button } = usePreview(attendance);
    const counts = attendance.reduce((acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }), {});
    return /* @__PURE__ */ k(Card, { index, title: "Frekwencja", href, subtitle: "Ostatnio wystawione" }, /* @__PURE__ */ k("div", { className: "idu-profile-chips summary" }, Object.entries(counts).map(([status, count], i3) => /* @__PURE__ */ k("span", { key: status, className: "idu-profile-chip summary", style: { "--i": i3 } }, /* @__PURE__ */ k("span", { className: `idu-profile-dot ${status}` }), ATTENDANCE_LABELS[status] || status, " ", count))), /* @__PURE__ */ k("ul", { className: "idu-profile-list compact" }, visible.map((item, i3) => /* @__PURE__ */ k("li", { key: i3, className: `idu-profile-row compact${item.unseen ? " unseen" : ""}`, style: { "--i": i3 }, title: item.issuedAt ? `wystawiono: ${item.issuedAt}` : void 0 }, /* @__PURE__ */ k("span", { className: `idu-profile-dot ${item.status}`, "aria-hidden": "true" }), /* @__PURE__ */ k("div", { className: "idu-profile-row-main" }, /* @__PURE__ */ k("div", { className: "idu-profile-row-top" }, item.subjectUrl ? /* @__PURE__ */ k("a", { className: "idu-profile-row-title", href: item.subjectUrl }, item.subject) : /* @__PURE__ */ k("span", { className: "idu-profile-row-title" }, item.subject), /* @__PURE__ */ k("span", { className: "idu-profile-row-date" }, item.date)), /* @__PURE__ */ k("p", { className: "idu-profile-row-text" }, item.name || ATTENDANCE_LABELS[item.status]))))), /* @__PURE__ */ k(CardFoot, { button, href }));
  }
  function EventsCard({ title, events, href, index }) {
    const { visible, button } = usePreview(events);
    return /* @__PURE__ */ k(Card, { index, title, href }, /* @__PURE__ */ k("ul", { className: "idu-profile-list" }, visible.map((event, i3) => /* @__PURE__ */ k("li", { key: i3, className: "idu-profile-row", style: { "--i": i3 } }, /* @__PURE__ */ k("div", { className: "idu-profile-row-main" }, /* @__PURE__ */ k("div", { className: "idu-profile-row-top" }, event.subjectUrl ? /* @__PURE__ */ k("a", { className: "idu-profile-row-title", href: event.subjectUrl }, event.subject) : /* @__PURE__ */ k("span", { className: "idu-profile-row-title" }, event.subject || event.name), event.date && /* @__PURE__ */ k("span", { className: "idu-profile-row-date" }, event.date)), event.subject && event.name && /* @__PURE__ */ k("p", { className: "idu-profile-row-text" }, event.name), event.description && /* @__PURE__ */ k("p", { className: "idu-profile-row-text" }, event.description))))), /* @__PURE__ */ k(CardFoot, { button, href }));
  }
  function FilesCard({ files, index }) {
    return /* @__PURE__ */ k(Card, { index, title: "Przypisane pliki" }, /* @__PURE__ */ k("div", { className: "idu-profile-chips" }, files.map((file, i3) => /* @__PURE__ */ k("a", { key: file.href, className: "idu-profile-chip", style: { "--i": i3 }, href: file.href }, file.text))));
  }
  function SubjectsCard({ groups, className, index }) {
    const [selected, setSelected] = d2(null);
    const total = groups.reduce((sum, group) => sum + group.subjects.length, 0);
    return /* @__PURE__ */ k(Card, { index, title: "Przedmioty", subtitle: [className, `${total} ${total === 1 ? "przedmiot" : "przedmiot\xF3w"}`].filter(Boolean).join(" \xB7 ") }, groups.map((group, groupIndex) => /* @__PURE__ */ k("div", { key: groupIndex, className: "idu-profile-subject-group" }, group.level && /* @__PURE__ */ k("h3", { className: "idu-profile-group-title" }, LEVEL_LABELS[group.level] || group.level), /* @__PURE__ */ k("div", { className: "idu-profile-chips" }, group.subjects.map((subject, i3) => {
      const id = `${groupIndex}-${i3}`;
      const isOpen = selected === id;
      return /* @__PURE__ */ k(
        "button",
        {
          key: id,
          type: "button",
          className: `idu-profile-chip subject${subject.italic ? " extra" : ""}${isOpen ? " active" : ""}`,
          style: { "--i": i3 },
          "aria-expanded": isOpen,
          onClick: () => setSelected(isOpen ? null : id)
        },
        subject.name
      );
    })), group.subjects.map((subject, i3) => selected === `${groupIndex}-${i3}` && /* @__PURE__ */ k("div", { key: i3, className: "idu-profile-detail" }, /* @__PURE__ */ k("div", { className: "idu-profile-detail-title" }, subject.name), subject.title && subject.title !== subject.name && /* @__PURE__ */ k("div", { className: "idu-profile-detail-text" }, subject.title), subject.teachers.length > 0 && /* @__PURE__ */ k("div", { className: "idu-profile-detail-text" }, subject.teachers.length > 1 ? "Nauczyciele: " : "Nauczyciel: ", subject.teachers.map((teacher, t3) => /* @__PURE__ */ k("span", { key: t3 }, t3 > 0 && ", ", /* @__PURE__ */ k("a", { href: teacher.href }, teacher.name)))), subject.url && /* @__PURE__ */ k("a", { className: "idu-profile-see-all", href: subject.url }, "Otw\xF3rz przedmiot \u2192"))))));
  }
  function TimetableCard({ timetable, subjectNames, index }) {
    const [selected, setSelected] = d2(null);
    const todayKey = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][(/* @__PURE__ */ new Date()).getDay()];
    const days = timetable.days;
    const columns = `30px repeat(${days.length}, minmax(0, 1fr))`;
    const selectedLesson = selected && timetable.rows[selected.row]?.lessons[selected.day];
    const selectedRow = selected && timetable.rows[selected.row];
    const nameOf = (lesson) => subjectNames.get(lesson.subjectUrl) || lesson.subject;
    return /* @__PURE__ */ k(Card, { index, title: "Plan lekcji", href: timetable.url }, /* @__PURE__ */ k("div", { className: "idu-profile-timetable", role: "table", "aria-label": "Plan lekcji" }, /* @__PURE__ */ k("div", { className: "idu-profile-tt-row head", role: "row", style: { gridTemplateColumns: columns } }, /* @__PURE__ */ k("span", { className: "idu-profile-tt-num", role: "columnheader", "aria-label": "Lekcja" }), days.map((day) => /* @__PURE__ */ k("span", { key: day.key, role: "columnheader", className: `idu-profile-tt-day${day.key === todayKey ? " today" : ""}` }, WEEKDAY_SHORT[day.key] || day.label.slice(0, 3)))), timetable.rows.map((row, rowIndex) => /* @__PURE__ */ k("div", { key: row.number, className: "idu-profile-tt-row", role: "row", style: { gridTemplateColumns: columns } }, /* @__PURE__ */ k("span", { className: "idu-profile-tt-num", role: "rowheader", title: `${row.start}\u2013${row.end}` }, /* @__PURE__ */ k("span", { className: "num" }, row.number), /* @__PURE__ */ k("span", { className: "time" }, row.start)), days.map((day) => {
      const lessons = row.lessons[day.key];
      if (!lessons) return /* @__PURE__ */ k("span", { key: day.key, role: "cell", className: "idu-profile-tt-cell empty" });
      const isSelected = selected?.row === rowIndex && selected?.day === day.key;
      const label = lessons.map(nameOf).join(" / ");
      return /* @__PURE__ */ k(
        "button",
        {
          key: day.key,
          type: "button",
          role: "cell",
          "aria-label": `${label}, ${row.start}\u2013${row.end}`,
          "aria-pressed": isSelected,
          className: `idu-profile-tt-cell${day.key === todayKey ? " today" : ""}${isSelected ? " active" : ""}`,
          style: { "--i": rowIndex },
          onClick: () => setSelected(isSelected ? null : { row: rowIndex, day: day.key })
        },
        shortenLessonName(nameOf(lessons[0])),
        lessons.length > 1 ? "+" : ""
      );
    })))), selectedLesson && /* @__PURE__ */ k("div", { className: "idu-profile-detail" }, selectedLesson.map((lesson, i3) => /* @__PURE__ */ k("div", { key: i3, className: "idu-profile-detail-lesson" }, /* @__PURE__ */ k("div", { className: "idu-profile-detail-title" }, lesson.subjectUrl ? /* @__PURE__ */ k("a", { href: lesson.subjectUrl }, nameOf(lesson)) : nameOf(lesson), nameOf(lesson) !== lesson.subject && /* @__PURE__ */ k("span", { className: "idu-profile-detail-raw" }, " \xB7 ", lesson.subject)), /* @__PURE__ */ k("div", { className: "idu-profile-detail-text" }, [`${days.find((d3) => d3.key === selected.day)?.label}, lekcja ${selectedRow.number}`, `${selectedRow.start}\u2013${selectedRow.end}`].join(" \xB7 ")), (lesson.room || lesson.teacher) && /* @__PURE__ */ k("div", { className: "idu-profile-detail-text" }, [lesson.room && `Sala: ${lesson.room}`, lesson.teacher].filter(Boolean).join(" \xB7 "))))));
  }
  function StudentProfile({ data }) {
    const { profile } = data;
    const cards = [];
    const add = (key, render) => cards.push({ key, render });
    add("profile", (index) => /* @__PURE__ */ k(ProfileCard, { profile, index }));
    if (data.exams?.length) add("exams", (index) => /* @__PURE__ */ k(ExamsCard, { exams: data.exams, index }));
    if (data.grades?.length) add("grades", (index) => /* @__PURE__ */ k(GradesCard, { grades: data.grades, href: data.gradesUrl, index }));
    if (data.attendance?.length) add("attendance", (index) => /* @__PURE__ */ k(AttendanceCard, { attendance: data.attendance, href: data.attendanceUrl, index }));
    if (data.subjectGroups?.length) add("subjects", (index) => /* @__PURE__ */ k(SubjectsCard, { groups: data.subjectGroups, className: profile.klass, index }));
    const subjectNames = new Map((data.subjectGroups || []).flatMap((group) => group.subjects.map((subject) => [subject.url, subject.name])));
    if (data.timetable?.rows?.length) add("timetable", (index) => /* @__PURE__ */ k(TimetableCard, { timetable: data.timetable, subjectNames, index }));
    if (data.reviews?.length) add("reviews", (index) => /* @__PURE__ */ k(EventsCard, { title: "Ostatnie recenzje", events: data.reviews, href: data.reviewsUrl, index }));
    if (data.files?.length) add("files", (index) => /* @__PURE__ */ k(FilesCard, { files: data.files, index }));
    return /* @__PURE__ */ k("div", { id: "idu-profile", className: "idu-profile" }, /* @__PURE__ */ k("h1", { className: "idu-profile-title" }, "Profil ucznia"), cards.map((card, index) => /* @__PURE__ */ k("div", { key: card.key, className: "idu-profile-card-slot" }, card.render(index))));
  }

  // src/content/mobileMessages.js
  function compactSearch(form) {
    const fields = [...form.querySelectorAll(".field")].map((field) => ({
      field,
      input: field.querySelector("input[type=text], input[type=search]"),
      label: field.querySelector("label")
    })).filter(({ input, label }) => input && label);
    if (!fields.length) return;
    const scope = document.createElement("select");
    scope.setAttribute("aria-label", "Szukaj wed\u0142ug");
    for (const { label } of fields) {
      const title = label.textContent.trim();
      const name = /treści/i.test(title) ? "Tre\u015B\u0107" : /tytule/i.test(title) ? "Tytu\u0142" : "Osoba";
      scope.add(new Option(name));
    }
    scope.selectedIndex = Math.max(0, fields.findIndex(({ input }) => input.value));
    let active = fields[scope.selectedIndex];
    function update() {
      for (const item of fields) {
        item.field.hidden = item !== active;
        item.input.disabled = item !== active;
        item.input.placeholder = "Szukaj wiadomo\u015Bci";
      }
    }
    scope.onchange = () => {
      const value = active.input.value;
      active = fields[scope.selectedIndex];
      active.input.value = value;
      update();
    };
    const submit = form.querySelector("input[type=submit], button[type=submit]");
    if (!submit) return;
    const row = document.createElement("div");
    row.className = "mail-search-row";
    const group = document.createElement("div");
    group.className = "mail-search-group";
    const scopeControl = document.createElement("div");
    scopeControl.className = "mail-search-scope";
    const scopeLabel = document.createElement("span");
    scopeLabel.className = "mail-search-scope-label";
    scopeLabel.setAttribute("aria-hidden", "true");
    const updateScopeLabel = () => {
      scopeLabel.textContent = scope.selectedOptions[0]?.textContent || "";
    };
    scope.addEventListener("change", updateScopeLabel);
    updateScopeLabel();
    scopeControl.append(scopeLabel, scope);
    group.append(scopeControl, ...fields.map(({ field }) => field));
    row.append(group, submit);
    form.prepend(row);
    form.classList.add("mail-search");
    update();
  }
  function foldCategories(folders) {
    const bar = document.createElement("div");
    bar.className = "mail-nav";
    const menu = document.createElement("details");
    const toggle = document.createElement("summary");
    toggle.textContent = folders.querySelector(".current")?.textContent.trim() || "Foldery";
    toggle.setAttribute("aria-label", "Foldery: " + toggle.textContent);
    folders.before(bar);
    bar.append(menu);
    menu.append(toggle, folders);
    const compose = [...folders.querySelectorAll("a")].find((a3) => /nowa wiadomość/i.test(a3.textContent));
    if (compose) bar.append(compose);
    document.addEventListener("pointerdown", (event) => {
      if (!menu.contains(event.target)) menu.open = false;
    });
    menu.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menu.open = false;
        toggle.focus();
      }
    });
  }
  function setupMobileMessages() {
    if (!location.pathname.startsWith("/internal_messages") && !document.querySelector("#message-folders, #message_thread_search")) return;
    document.body.classList.add("mobile-mail");
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const transition = document.createElement("style");
      transition.textContent = "@view-transition { navigation: auto; } ::view-transition-group(root) { animation-duration: 180ms; }";
      document.head.append(transition);
    }
    const folders = document.querySelector("#message-folders");
    if (folders) foldCategories(folders);
    const search = document.querySelector("#message_thread_search") || [...document.querySelectorAll("#content form")].find((form2) => [...form2.querySelectorAll("label")].some((label) => /szukaj w treści/i.test(label.textContent)));
    if (search) compactSearch(search);
    const form = document.querySelector("#content form:has(textarea)");
    if (form) {
      form.classList.add("mail-compose");
      const actions = form.querySelector(".actions");
      for (const node of actions?.childNodes || []) {
        if (node.nodeType === Node.TEXT_NODE && /^\s*lub\s*$/i.test(node.textContent)) node.remove();
      }
      const themeEditor = () => {
        const doc = form.querySelector(".cke_wysiwyg_frame")?.contentDocument;
        if (!doc?.head) return;
        let style = doc.getElementById("idu-compose-theme");
        if (!style) {
          style = doc.createElement("style");
          style.id = "idu-compose-theme";
          doc.head.append(style);
        }
        const theme = getComputedStyle(form);
        style.textContent = `html, body.cke_editable { background: ${theme.getPropertyValue("--background-color")}; color: ${theme.getPropertyValue("--main-text-color")}; caret-color: currentColor; } body.cke_editable { font: 16px/1.5 system-ui; padding: 4px; }`;
      };
      form.addEventListener("load", themeEditor, true);
      window.CKEDITOR?.on("instanceReady", themeEditor);
      new MutationObserver(themeEditor).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      themeEditor();
      const recipient = [...form.querySelectorAll("label")].find((label) => /odbiorc/i.test(label.textContent));
      if (recipient) {
        recipient.closest(".field")?.classList.add("mail-recipient");
        const hint = document.createElement("small");
        hint.textContent = "Wpisz co najmniej 3 litery i wybierz odbiorc\u0119 z listy.";
        recipient.after(hint);
      }
    }
  }

  // src/content/components/footer.jsx
  var supportUrl = "https://sjomanikitin.github.io/idu-upgrade/";
  var privacyUrl = "https://sjomanikitin.github.io/idu-upgrade/privacy.html";
  var sourceUrl = "https://github.com/SjomaNikitin/idu-upgrade";
  function Footer() {
    const isSignInPage = window.location.pathname === "/users/sign_in" && !window.__IDU_MOCK_DATA;
    return /* @__PURE__ */ k(
      "div",
      {
        className: "idu-app-footer",
        style: isSignInPage ? { display: "none", bottom: "0px" } : void 0
      },
      /* @__PURE__ */ k("div", { className: "idu-app-footer__identity" }, /* @__PURE__ */ k(NiduLogo, null), /* @__PURE__ */ k("span", null, "\u017Bycie szkolne w jednym miejscu")),
      /* @__PURE__ */ k("nav", { className: "idu-app-footer__links", "aria-label": "Informacje o aplikacji" }, /* @__PURE__ */ k("a", { href: privacyUrl }, "Polityka prywatno\u015Bci"), /* @__PURE__ */ k("a", { href: supportUrl }, "Pomoc"), /* @__PURE__ */ k("a", { href: sourceUrl }, "Kod \u017Ar\xF3d\u0142owy")),
      /* @__PURE__ */ k("p", { className: "idu-app-footer__legal" }, "\xA9 2026 NIDU \xB7 Projekt niezale\u017Cny")
    );
  }

  // src/mockDashboardData.js
  function formatDayKey(date) {
    const weekdayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return weekdayKeys[date.getDay()];
  }
  function createLesson(lessonNumber, start, end, day, subject, room, note = "") {
    return {
      lessonNumber: String(lessonNumber),
      time: `${start}-${end}`,
      start,
      end,
      day,
      subject,
      subjectHref: "#",
      location: room,
      locationHref: "#",
      note,
      absence: false,
      lateness: false
    };
  }
  function buildDaySchedule(dayLabel, subjects) {
    const timeSlots = [
      ["7:55", "8:40"],
      ["8:45", "9:30"],
      ["9:35", "10:20"],
      ["10:30", "11:15"],
      ["11:25", "12:10"],
      ["12:15", "13:00"],
      ["13:10", "13:55"],
      ["14:25", "15:10"],
      ["15:15", "16:00"]
    ];
    return Object.fromEntries(
      timeSlots.flatMap(([start, end], index) => {
        const slot = subjects[index];
        if (!slot) {
          return [];
        }
        return [
          [
            `${start}-${end}`,
            createLesson(index, start, end, dayLabel, slot.subject, slot.room, slot.note || "")
          ]
        ];
      })
    );
  }
  function buildExampleDashboardData() {
    const todayKey = formatDayKey(/* @__PURE__ */ new Date());
    const weeklySchedule = {
      monday: buildDaySchedule("Monday", [
        { subject: "Matematyka", room: "12" },
        { subject: "Jezyk polski", room: "8" },
        { subject: "Historia", room: "7" },
        { subject: "Biologia", room: "15" },
        { subject: "Jezyk angielski", room: "14" },
        { subject: "WF", room: "Sala A" },
        { subject: "Informatyka", room: "22" },
        { subject: "Hiszpanski", room: "11", note: "Konwersacje" },
        { subject: "Hiszpanski", room: "11", note: "Konwersacje" }
      ]),
      tuesday: buildDaySchedule("Tuesday", [
        null,
        null,
        { subject: "Fizyka", room: "16" },
        { subject: "Matematyka", room: "12" },
        { subject: "Chemia", room: "18" },
        { subject: "Jezyk angielski", room: "14" },
        { subject: "Geografia", room: "10" },
        { subject: "WF", room: "Boisko" },
        { subject: "Biznes", room: "5" }
      ]),
      wednesday: buildDaySchedule("Wednesday", [
        { subject: "Jezyk polski", room: "8" },
        { subject: "Historia", room: "7" },
        { subject: "Matematyka", room: "12" },
        { subject: "Informatyka", room: "22" },
        { subject: "Biologia", room: "15" },
        { subject: "Plastyka", room: "6" },
        { subject: "Hiszpanski", room: "11" },
        { subject: "WF", room: "Sala A" },
        { subject: "Hiszpanski", room: "11", note: "Konwersacje" }
      ]),
      thursday: buildDaySchedule("Thursday", [
        { subject: "Chemia", room: "18" },
        { subject: "Geografia", room: "10" },
        { subject: "Jezyk angielski", room: "14" },
        { subject: "Matematyka", room: "12" },
        { subject: "Fizyka", room: "16" },
        { subject: "Biznes", room: "5" },
        { subject: "Historia", room: "7" },
        { subject: "Muzyka", room: "9" },
        { subject: "Hiszpanski", room: "11", note: "Konwersacje" }
      ]),
      friday: buildDaySchedule("Friday", [
        null,
        { subject: "Jezyk polski", room: "8" },
        { subject: "Matematyka", room: "12" },
        { subject: "Biologia", room: "15" },
        { subject: "Jezyk angielski", room: "14" },
        { subject: "Informatyka", room: "22" },
        { subject: "WF", room: "Sala A" },
        { subject: "Godzina wychowawcza", room: "4" },
        { subject: "Hiszpanski", room: "11" }
      ])
    };
    if (!weeklySchedule[todayKey]) {
      weeklySchedule[todayKey] = weeklySchedule.monday;
    }
    return {
      homeworkUrl: "#",
      reviewsUrl: "#",
      messagesUrl: "#",
      attendance: [
        {
          subject: "Matematyka",
          subjectUrl: "#",
          type: "Nieobecnosc",
          date: "2026-07-10",
          issuedAt: "2026-07-10 08:15",
          absence: true,
          presence: false,
          lateness: false,
          seeMoreUrl: "mogData",
          mockData: true
        },
        {
          subject: "WF",
          subjectUrl: "#",
          type: "Obecnosc",
          date: "2026-07-10",
          issuedAt: "2026-07-10 08:15",
          absence: false,
          presence: true,
          lateness: false,
          seeMoreUrl: "mogData",
          mockData: true
        },
        {
          subject: "Hiszpa\u0144ski",
          subjectUrl: "#",
          type: "Obecnosc",
          date: "2026-07-10",
          issuedAt: "2026-07-10 08:15",
          absence: false,
          presence: true,
          lateness: false,
          seeMoreUrl: "mogData",
          mockData: true
        },
        {
          subject: "Historia",
          subjectUrl: "#",
          type: "Obecnosc",
          date: "2026-07-10",
          issuedAt: "2026-07-10 08:15",
          absence: false,
          presence: true,
          lateness: false,
          seeMoreUrl: "mogData",
          mockData: true
        },
        {
          subject: "Matematyka",
          subjectUrl: "#",
          type: "Nieobecnosc",
          date: "2026-07-10",
          issuedAt: "2026-07-10 08:15",
          absence: false,
          presence: true,
          lateness: false,
          seeMoreUrl: "mogData",
          mockData: true
        },
        {
          subject: "Jezyk angielski",
          subjectUrl: "#",
          type: "Spoznienie",
          date: "2026-07-09",
          issuedAt: "2026-07-09 09:00",
          absence: false,
          presence: false,
          lateness: true,
          seeMoreUrl: "mogData"
        },
        {
          subject: "Matematyka",
          subjectUrl: "#",
          type: "Nieobecnosc",
          date: "2026-07-10",
          issuedAt: "2026-07-10 08:15",
          absence: false,
          presence: true,
          lateness: false,
          seeMoreUrl: "mogData",
          mockData: true
        },
        {
          subject: "Matematyka",
          subjectUrl: "#",
          type: "Nieobecnosc",
          date: "2026-07-10",
          issuedAt: "2026-07-10 08:15",
          absence: false,
          presence: true,
          lateness: false,
          seeMoreUrl: "mogData",
          mockData: true
        },
        {
          subject: "Jezyk angielski",
          subjectUrl: "#",
          type: "Nieobecnosc",
          date: "2026-07-10",
          issuedAt: "2026-07-10 08:15",
          absence: false,
          presence: true,
          lateness: false,
          seeMoreUrl: "mogData",
          mockData: true
        },
        {
          subject: "Biznes",
          subjectUrl: "#",
          type: "Nieobecnosc",
          date: "2026-07-10",
          issuedAt: "2026-07-10 08:15",
          absence: false,
          presence: true,
          lateness: false,
          seeMoreUrl: "mogData",
          mockData: true
        }
      ],
      news: [
        {
          title: "Praca szko\u0142y w lato",
          titleUrl: "#",
          date: "2026-07-12",
          updatedAt: "2026-07-12 08:00",
          comments: "3",
          sticky: true,
          read: false,
          priority: "high"
        },
        {
          title: "Zmiana planu zajec na przyszly tydzien",
          titleUrl: "#",
          date: "2026-07-11",
          updatedAt: "2026-07-11 18:30",
          comments: "0",
          sticky: false,
          read: true,
          priority: "normal"
        }
      ],
      grades: [
        {
          subject: "Matematyka",
          subjectUrl: "#",
          grade: "5",
          gradeText: "Sprawdzian",
          gradeDescriptionUrl: "#",
          description: "Funkcje liniowe",
          date: "2026-07-08",
          seeMoreUrl: "mogData"
        },
        {
          subject: "Historia",
          subjectUrl: "#",
          grade: "4+",
          gradeText: "Kartkowka",
          gradeDescriptionUrl: "#",
          description: "Sredniowiecze",
          date: "2026-07-07",
          seeMoreUrl: "mogData"
        },
        {
          subject: "Biznes",
          subjectUrl: "#",
          grade: "6",
          gradeText: "Kartkowka",
          gradeDescriptionUrl: "#",
          description: "Sredniowiecze",
          date: "2026-07-07",
          seeMoreUrl: "mogData"
        },
        {
          subject: "Hiszpa\u0144ski",
          subjectUrl: "#",
          grade: "ZAL",
          gradeText: "Kartkowka",
          gradeDescriptionUrl: "#",
          description: "Sredniowiecze",
          date: "2026-07-07",
          seeMoreUrl: "mogData"
        },
        {
          subject: "polski",
          subjectUrl: "#",
          grade: "4",
          gradeText: "Kartkowka",
          gradeDescriptionUrl: "#",
          description: "Sredniowiecze",
          date: "2026-07-07",
          seeMoreUrl: "mogData"
        }
      ],
      subjects: {
        classInfo: {
          name: "3A",
          url: "#",
          forumUrl: "#",
          forumName: "Forum klasy 3A",
          teacher: "Jan Kowalski",
          teacherUrl: "#"
        },
        subjects: [
          { name: "Matematyka", url: "#", title: "Matematyka", italic: false },
          { name: "Jezyk angielski", url: "#", title: "Jezyk angielski", italic: false },
          { name: "Historia", url: "#", title: "Historia", italic: false }
        ]
      },
      schedule: weeklySchedule,
      subjectAnnouncements: [
        {
          subject: "Matematyka",
          subjectUrl: "#",
          title: "Praca domowa na poniedzialek",
          titleUrl: "#",
          date: "2026-07-12",
          read: false
        },
        {
          subject: "Jezyk angielski",
          subjectUrl: "#",
          title: "Przypomnienie o projekcie",
          titleUrl: "#",
          date: "2026-07-11",
          read: true
        }
      ]
    };
  }

  // src/content/app.jsx
  window.setupMobileMessages = setupMobileMessages;
  window.replaceHeader = function replaceHeader(data = {}) {
    const isMockData = Boolean(window.__IDU_MOCK_DATA);
    if (window.location.pathname === "/users/sign_in" && !isMockData) return false;
    if (document.getElementById("idu-header-root")) return true;
    const oldHeader = document.querySelector("#top");
    if (!oldHeader) return false;
    const semesterScope = data.semesterScope || null;
    const searchElement = window.location.pathname === "/" ? document.querySelector("#unique-id26") : null;
    searchElement?.remove();
    let accountHref;
    if (document.querySelector("#account")) {
      accountHref = document.querySelector("#account").children[0].href;
    } else {
      accountHref = "/";
    }
    const mountPoint = document.createElement("div");
    mountPoint.id = "idu-header-root";
    oldHeader.replaceWith(mountPoint);
    if (window.location.pathname !== "/users/sign_in" || isMockData) {
      R(
        /* @__PURE__ */ k(
          Header,
          {
            accountHref,
            messagesHref: data.messagesUrl || "",
            semesterScope,
            searchElement,
            isMockData
          }
        ),
        mountPoint
      );
    }
    return true;
  };
  window.renderIduMockDashboard = function renderIduMockDashboard() {
    const data = buildExampleDashboardData();
    window.__IDU_MOCK_DATA = data;
    const top = document.createElement("div");
    top.id = "top";
    const content = document.createElement("div");
    content.id = "content";
    const footer = document.createElement("footer");
    footer.id = "footer";
    document.body.replaceChildren(top, content, footer);
    document.body.className = "";
    document.body.setAttribute("path", "/");
    document.title = "IDU Demo";
    const headerLoaded = window.replaceHeader(data);
    const contentLoaded = window.replaceMainContent(data);
    const footerLoaded = window.replaceFooter();
    window.hideVisualLoader?.();
    window.scrollTo(0, 0);
    console.info("[IDU2] Local Apple review dashboard loaded", {
      headerLoaded,
      contentLoaded,
      footerLoaded
    });
    return headerLoaded && contentLoaded;
  };
  window.replaceMainContent = function replaceMainContent(data) {
    const oldMainContent = document.getElementById("content");
    if (!oldMainContent) return false;
    oldMainContent.innerHTML = "";
    R(/* @__PURE__ */ k(MainContent, { data }), oldMainContent);
    return true;
  };
  window.replaceStudentProfile = function replaceStudentProfile(profileData) {
    const content = document.getElementById("content");
    if (!content || !profileData?.profile) return false;
    content.innerHTML = "";
    content.classList.add("idu-profile-content");
    R(/* @__PURE__ */ k(StudentProfile, { data: profileData }), content);
    return true;
  };
  window.replaceFooter = function replaceFooter() {
    const oldFooter = document.getElementById("footer");
    const mountPoint = document.createElement("footer");
    mountPoint.id = "footer";
    if (oldFooter) {
      oldFooter.replaceWith(mountPoint);
    } else {
      document.body.append(mountPoint);
    }
    if (window.location.pathname === "/users/sign_in") {
      R(/* @__PURE__ */ k(Footer, null), mountPoint);
    }
    R(/* @__PURE__ */ k(Footer, null), mountPoint);
    return true;
  };
})();
