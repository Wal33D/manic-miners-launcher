var eb = Object.defineProperty;
var Xp = e => {
  throw TypeError(e);
};
var tb = (e, t, n) => (t in e ? eb(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n));
var Bo = (e, t, n) => tb(e, typeof t != 'symbol' ? t + '' : t, n),
  $c = (e, t, n) => t.has(e) || Xp('Cannot ' + n);
var j = (e, t, n) => ($c(e, t, 'read from private field'), n ? n.call(e) : t.get(e)),
  we = (e, t, n) => (t.has(e) ? Xp('Cannot add the same private member more than once') : t instanceof WeakSet ? t.add(e) : t.set(e, n)),
  ae = (e, t, n, r) => ($c(e, t, 'write to private field'), r ? r.call(e, n) : t.set(e, n), n),
  et = (e, t, n) => ($c(e, t, 'access private method'), n);
var ca = (e, t, n, r) => ({
  set _(s) {
    ae(e, t, s, n);
  },
  get _() {
    return j(e, t, r);
  },
});
function nb(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const s in r)
        if (s !== 'default' && !(s in e)) {
          const o = Object.getOwnPropertyDescriptor(r, s);
          o && Object.defineProperty(e, s, o.get ? o : { enumerable: !0, get: () => r[s] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }));
}
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver(s => {
    for (const o of s) if (o.type === 'childList') for (const i of o.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
function Dg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var Fg = { exports: {} },
  Gl = {},
  $g = { exports: {} },
  ue = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qi = Symbol.for('react.element'),
  rb = Symbol.for('react.portal'),
  sb = Symbol.for('react.fragment'),
  ob = Symbol.for('react.strict_mode'),
  ib = Symbol.for('react.profiler'),
  ab = Symbol.for('react.provider'),
  lb = Symbol.for('react.context'),
  cb = Symbol.for('react.forward_ref'),
  ub = Symbol.for('react.suspense'),
  db = Symbol.for('react.memo'),
  fb = Symbol.for('react.lazy'),
  Jp = Symbol.iterator;
function pb(e) {
  return e === null || typeof e != 'object' ? null : ((e = (Jp && e[Jp]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var zg = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Vg = Object.assign,
  Ug = {};
function To(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = Ug), (this.updater = n || zg));
}
To.prototype.isReactComponent = {};
To.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error('setState(...): takes an object of state variables to update or a function which returns an object of state variables.');
  this.updater.enqueueSetState(this, e, t, 'setState');
};
To.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function Bg() {}
Bg.prototype = To.prototype;
function of(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = Ug), (this.updater = n || zg));
}
var af = (of.prototype = new Bg());
af.constructor = of;
Vg(af, To.prototype);
af.isPureReactComponent = !0;
var eh = Array.isArray,
  Wg = Object.prototype.hasOwnProperty,
  lf = { current: null },
  Hg = { key: !0, ref: !0, __self: !0, __source: !0 };
function Gg(e, t, n) {
  var r,
    s = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = '' + t.key), t))
      Wg.call(t, r) && !Hg.hasOwnProperty(r) && (s[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) s.children = n;
  else if (1 < a) {
    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 2];
    s.children = c;
  }
  if (e && e.defaultProps) for (r in ((a = e.defaultProps), a)) s[r] === void 0 && (s[r] = a[r]);
  return { $$typeof: Qi, type: e, key: o, ref: i, props: s, _owner: lf.current };
}
function hb(e, t) {
  return { $$typeof: Qi, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function cf(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Qi;
}
function mb(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var th = /\/+/g;
function zc(e, t) {
  return typeof e == 'object' && e !== null && e.key != null ? mb('' + e.key) : t.toString(36);
}
function La(e, t, n, r, s) {
  var o = typeof e;
  (o === 'undefined' || o === 'boolean') && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case 'string':
      case 'number':
        i = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case Qi:
          case rb:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (s = s(i)),
      (e = r === '' ? '.' + zc(i, 0) : r),
      eh(s)
        ? ((n = ''),
          e != null && (n = e.replace(th, '$&/') + '/'),
          La(s, t, n, '', function (u) {
            return u;
          }))
        : s != null &&
          (cf(s) && (s = hb(s, n + (!s.key || (i && i.key === s.key) ? '' : ('' + s.key).replace(th, '$&/') + '/') + e)), t.push(s)),
      1
    );
  if (((i = 0), (r = r === '' ? '.' : r + ':'), eh(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a];
      var c = r + zc(o, a);
      i += La(o, t, n, c, s);
    }
  else if (((c = pb(e)), typeof c == 'function'))
    for (e = c.call(e), a = 0; !(o = e.next()).done; ) ((o = o.value), (c = r + zc(o, a++)), (i += La(o, t, n, c, s)));
  else if (o === 'object')
    throw (
      (t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t) +
          '). If you meant to render a collection of children, use an array instead.'
      )
    );
  return i;
}
function ua(e, t, n) {
  if (e == null) return e;
  var r = [],
    s = 0;
  return (
    La(e, r, '', '', function (o) {
      return t.call(n, o, s++);
    }),
    r
  );
}
function gb(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ft = { current: null },
  Da = { transition: null },
  vb = { ReactCurrentDispatcher: ft, ReactCurrentBatchConfig: Da, ReactCurrentOwner: lf };
function Kg() {
  throw Error('act(...) is not supported in production builds of React.');
}
ue.Children = {
  map: ua,
  forEach: function (e, t, n) {
    ua(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      ua(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      ua(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!cf(e)) throw Error('React.Children.only expected to receive a single React element child.');
    return e;
  },
};
ue.Component = To;
ue.Fragment = sb;
ue.Profiler = ib;
ue.PureComponent = of;
ue.StrictMode = ob;
ue.Suspense = ub;
ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vb;
ue.act = Kg;
ue.cloneElement = function (e, t, n) {
  if (e == null) throw Error('React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.');
  var r = Vg({}, e.props),
    s = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if ((t.ref !== void 0 && ((o = t.ref), (i = lf.current)), t.key !== void 0 && (s = '' + t.key), e.type && e.type.defaultProps))
      var a = e.type.defaultProps;
    for (c in t) Wg.call(t, c) && !Hg.hasOwnProperty(c) && (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var u = 0; u < c; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return { $$typeof: Qi, type: e.type, key: s, ref: o, props: r, _owner: i };
};
ue.createContext = function (e) {
  return (
    (e = {
      $$typeof: lb,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: ab, _context: e }),
    (e.Consumer = e)
  );
};
ue.createElement = Gg;
ue.createFactory = function (e) {
  var t = Gg.bind(null, e);
  return ((t.type = e), t);
};
ue.createRef = function () {
  return { current: null };
};
ue.forwardRef = function (e) {
  return { $$typeof: cb, render: e };
};
ue.isValidElement = cf;
ue.lazy = function (e) {
  return { $$typeof: fb, _payload: { _status: -1, _result: e }, _init: gb };
};
ue.memo = function (e, t) {
  return { $$typeof: db, type: e, compare: t === void 0 ? null : t };
};
ue.startTransition = function (e) {
  var t = Da.transition;
  Da.transition = {};
  try {
    e();
  } finally {
    Da.transition = t;
  }
};
ue.unstable_act = Kg;
ue.useCallback = function (e, t) {
  return ft.current.useCallback(e, t);
};
ue.useContext = function (e) {
  return ft.current.useContext(e);
};
ue.useDebugValue = function () {};
ue.useDeferredValue = function (e) {
  return ft.current.useDeferredValue(e);
};
ue.useEffect = function (e, t) {
  return ft.current.useEffect(e, t);
};
ue.useId = function () {
  return ft.current.useId();
};
ue.useImperativeHandle = function (e, t, n) {
  return ft.current.useImperativeHandle(e, t, n);
};
ue.useInsertionEffect = function (e, t) {
  return ft.current.useInsertionEffect(e, t);
};
ue.useLayoutEffect = function (e, t) {
  return ft.current.useLayoutEffect(e, t);
};
ue.useMemo = function (e, t) {
  return ft.current.useMemo(e, t);
};
ue.useReducer = function (e, t, n) {
  return ft.current.useReducer(e, t, n);
};
ue.useRef = function (e) {
  return ft.current.useRef(e);
};
ue.useState = function (e) {
  return ft.current.useState(e);
};
ue.useSyncExternalStore = function (e, t, n) {
  return ft.current.useSyncExternalStore(e, t, n);
};
ue.useTransition = function () {
  return ft.current.useTransition();
};
ue.version = '18.3.1';
$g.exports = ue;
var d = $g.exports;
const D = Dg(d),
  uf = nb({ __proto__: null, default: D }, [d]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yb = d,
  xb = Symbol.for('react.element'),
  wb = Symbol.for('react.fragment'),
  Sb = Object.prototype.hasOwnProperty,
  bb = yb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Cb = { key: !0, ref: !0, __self: !0, __source: !0 };
function Zg(e, t, n) {
  var r,
    s = {},
    o = null,
    i = null;
  (n !== void 0 && (o = '' + n), t.key !== void 0 && (o = '' + t.key), t.ref !== void 0 && (i = t.ref));
  for (r in t) Sb.call(t, r) && !Cb.hasOwnProperty(r) && (s[r] = t[r]);
  if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) s[r] === void 0 && (s[r] = t[r]);
  return { $$typeof: xb, type: e, key: o, ref: i, props: s, _owner: bb.current };
}
Gl.Fragment = wb;
Gl.jsx = Zg;
Gl.jsxs = Zg;
Fg.exports = Gl;
var l = Fg.exports,
  Qg = { exports: {} },
  Rt = {},
  qg = { exports: {} },
  Yg = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(_, E) {
    var A = _.length;
    _.push(E);
    e: for (; 0 < A; ) {
      var Z = (A - 1) >>> 1,
        W = _[Z];
      if (0 < s(W, E)) ((_[Z] = E), (_[A] = W), (A = Z));
      else break e;
    }
  }
  function n(_) {
    return _.length === 0 ? null : _[0];
  }
  function r(_) {
    if (_.length === 0) return null;
    var E = _[0],
      A = _.pop();
    if (A !== E) {
      _[0] = A;
      e: for (var Z = 0, W = _.length, J = W >>> 1; Z < J; ) {
        var V = 2 * (Z + 1) - 1,
          pe = _[V],
          ge = V + 1,
          F = _[ge];
        if (0 > s(pe, A)) ge < W && 0 > s(F, pe) ? ((_[Z] = F), (_[ge] = A), (Z = ge)) : ((_[Z] = pe), (_[V] = A), (Z = V));
        else if (ge < W && 0 > s(F, A)) ((_[Z] = F), (_[ge] = A), (Z = ge));
        else break e;
      }
    }
    return E;
  }
  function s(_, E) {
    var A = _.sortIndex - E.sortIndex;
    return A !== 0 ? A : _.id - E.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      a = i.now();
    e.unstable_now = function () {
      return i.now() - a;
    };
  }
  var c = [],
    u = [],
    f = 1,
    p = null,
    h = 3,
    m = !1,
    S = !1,
    v = !1,
    w = typeof setTimeout == 'function' ? setTimeout : null,
    x = typeof clearTimeout == 'function' ? clearTimeout : null,
    g = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(_) {
    for (var E = n(u); E !== null; ) {
      if (E.callback === null) r(u);
      else if (E.startTime <= _) (r(u), (E.sortIndex = E.expirationTime), t(c, E));
      else break;
      E = n(u);
    }
  }
  function b(_) {
    if (((v = !1), y(_), !S))
      if (n(c) !== null) ((S = !0), I(C));
      else {
        var E = n(u);
        E !== null && z(b, E.startTime - _);
      }
  }
  function C(_, E) {
    ((S = !1), v && ((v = !1), x(P), (P = -1)), (m = !0));
    var A = h;
    try {
      for (y(E), p = n(c); p !== null && (!(p.expirationTime > E) || (_ && !H())); ) {
        var Z = p.callback;
        if (typeof Z == 'function') {
          ((p.callback = null), (h = p.priorityLevel));
          var W = Z(p.expirationTime <= E);
          ((E = e.unstable_now()), typeof W == 'function' ? (p.callback = W) : p === n(c) && r(c), y(E));
        } else r(c);
        p = n(c);
      }
      if (p !== null) var J = !0;
      else {
        var V = n(u);
        (V !== null && z(b, V.startTime - E), (J = !1));
      }
      return J;
    } finally {
      ((p = null), (h = A), (m = !1));
    }
  }
  var k = !1,
    N = null,
    P = -1,
    T = 5,
    R = -1;
  function H() {
    return !(e.unstable_now() - R < T);
  }
  function $() {
    if (N !== null) {
      var _ = e.unstable_now();
      R = _;
      var E = !0;
      try {
        E = N(!0, _);
      } finally {
        E ? Y() : ((k = !1), (N = null));
      }
    } else k = !1;
  }
  var Y;
  if (typeof g == 'function')
    Y = function () {
      g($);
    };
  else if (typeof MessageChannel < 'u') {
    var O = new MessageChannel(),
      X = O.port2;
    ((O.port1.onmessage = $),
      (Y = function () {
        X.postMessage(null);
      }));
  } else
    Y = function () {
      w($, 0);
    };
  function I(_) {
    ((N = _), k || ((k = !0), Y()));
  }
  function z(_, E) {
    P = w(function () {
      _(e.unstable_now());
    }, E);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (_) {
      _.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      S || m || ((S = !0), I(C));
    }),
    (e.unstable_forceFrameRate = function (_) {
      0 > _ || 125 < _
        ? console.error('forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported')
        : (T = 0 < _ ? Math.floor(1e3 / _) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(c);
    }),
    (e.unstable_next = function (_) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var E = 3;
          break;
        default:
          E = h;
      }
      var A = h;
      h = E;
      try {
        return _();
      } finally {
        h = A;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (_, E) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var A = h;
      h = _;
      try {
        return E();
      } finally {
        h = A;
      }
    }),
    (e.unstable_scheduleCallback = function (_, E, A) {
      var Z = e.unstable_now();
      switch ((typeof A == 'object' && A !== null ? ((A = A.delay), (A = typeof A == 'number' && 0 < A ? Z + A : Z)) : (A = Z), _)) {
        case 1:
          var W = -1;
          break;
        case 2:
          W = 250;
          break;
        case 5:
          W = 1073741823;
          break;
        case 4:
          W = 1e4;
          break;
        default:
          W = 5e3;
      }
      return (
        (W = A + W),
        (_ = { id: f++, callback: E, priorityLevel: _, startTime: A, expirationTime: W, sortIndex: -1 }),
        A > Z
          ? ((_.sortIndex = A), t(u, _), n(c) === null && _ === n(u) && (v ? (x(P), (P = -1)) : (v = !0), z(b, A - Z)))
          : ((_.sortIndex = W), t(c, _), S || m || ((S = !0), I(C))),
        _
      );
    }),
    (e.unstable_shouldYield = H),
    (e.unstable_wrapCallback = function (_) {
      var E = h;
      return function () {
        var A = h;
        h = E;
        try {
          return _.apply(this, arguments);
        } finally {
          h = A;
        }
      };
    }));
})(Yg);
qg.exports = Yg;
var Eb = qg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nb = d,
  jt = Eb;
function M(e) {
  for (var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1; n < arguments.length; n++)
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var Xg = new Set(),
  yi = {};
function gs(e, t) {
  (fo(e, t), fo(e + 'Capture', t));
}
function fo(e, t) {
  for (yi[e] = t, e = 0; e < t.length; e++) Xg.add(t[e]);
}
var Ln = !(typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'),
  Iu = Object.prototype.hasOwnProperty,
  kb =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  nh = {},
  rh = {};
function _b(e) {
  return Iu.call(rh, e) ? !0 : Iu.call(nh, e) ? !1 : kb.test(e) ? (rh[e] = !0) : ((nh[e] = !0), !1);
}
function Pb(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return r ? !1 : n !== null ? !n.acceptsBooleans : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function jb(e, t, n, r) {
  if (t === null || typeof t > 'u' || Pb(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function pt(e, t, n, r, s, o, i) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = s),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i));
}
var Xe = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    Xe[e] = new pt(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  Xe[t] = new pt(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  Xe[e] = new pt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
  Xe[e] = new pt(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    Xe[e] = new pt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  Xe[e] = new pt(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  Xe[e] = new pt(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  Xe[e] = new pt(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  Xe[e] = new pt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var df = /[\-:]([a-z])/g;
function ff(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(df, ff);
    Xe[t] = new pt(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'.split(' ').forEach(function (e) {
  var t = e.replace(df, ff);
  Xe[t] = new pt(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
});
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(df, ff);
  Xe[t] = new pt(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  Xe[e] = new pt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Xe.xlinkHref = new pt('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  Xe[e] = new pt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function pf(e, t, n, r) {
  var s = Xe.hasOwnProperty(t) ? Xe[t] : null;
  (s !== null ? s.type !== 0 : r || !(2 < t.length) || (t[0] !== 'o' && t[0] !== 'O') || (t[1] !== 'n' && t[1] !== 'N')) &&
    (jb(t, n, s, r) && (n = null),
    r || s === null
      ? _b(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : s.mustUseProperty
        ? (e[s.propertyName] = n === null ? (s.type === 3 ? !1 : '') : n)
        : ((t = s.attributeName),
          (r = s.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((s = s.type), (n = s === 3 || (s === 4 && n === !0) ? '' : '' + n), r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Un = Nb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  da = Symbol.for('react.element'),
  Os = Symbol.for('react.portal'),
  Ls = Symbol.for('react.fragment'),
  hf = Symbol.for('react.strict_mode'),
  Au = Symbol.for('react.profiler'),
  Jg = Symbol.for('react.provider'),
  ev = Symbol.for('react.context'),
  mf = Symbol.for('react.forward_ref'),
  Mu = Symbol.for('react.suspense'),
  Ou = Symbol.for('react.suspense_list'),
  gf = Symbol.for('react.memo'),
  Jn = Symbol.for('react.lazy'),
  tv = Symbol.for('react.offscreen'),
  sh = Symbol.iterator;
function Wo(e) {
  return e === null || typeof e != 'object' ? null : ((e = (sh && e[sh]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var Me = Object.assign,
  Vc;
function ei(e) {
  if (Vc === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Vc = (t && t[1]) || '';
    }
  return (
    `
` +
    Vc +
    e
  );
}
var Uc = !1;
function Bc(e, t) {
  if (!e || Uc) return '';
  Uc = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == 'string') {
      for (
        var s = u.stack.split(`
`),
          o = r.stack.split(`
`),
          i = s.length - 1,
          a = o.length - 1;
        1 <= i && 0 <= a && s[i] !== o[a];

      )
        a--;
      for (; 1 <= i && 0 <= a; i--, a--)
        if (s[i] !== o[a]) {
          if (i !== 1 || a !== 1)
            do
              if ((i--, a--, 0 > a || s[i] !== o[a])) {
                var c =
                  `
` + s[i].replace(' at new ', ' at ');
                return (e.displayName && c.includes('<anonymous>') && (c = c.replace('<anonymous>', e.displayName)), c);
              }
            while (1 <= i && 0 <= a);
          break;
        }
    }
  } finally {
    ((Uc = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : '') ? ei(e) : '';
}
function Tb(e) {
  switch (e.tag) {
    case 5:
      return ei(e.type);
    case 16:
      return ei('Lazy');
    case 13:
      return ei('Suspense');
    case 19:
      return ei('SuspenseList');
    case 0:
    case 2:
    case 15:
      return ((e = Bc(e.type, !1)), e);
    case 11:
      return ((e = Bc(e.type.render, !1)), e);
    case 1:
      return ((e = Bc(e.type, !0)), e);
    default:
      return '';
  }
}
function Lu(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case Ls:
      return 'Fragment';
    case Os:
      return 'Portal';
    case Au:
      return 'Profiler';
    case hf:
      return 'StrictMode';
    case Mu:
      return 'Suspense';
    case Ou:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case ev:
        return (e.displayName || 'Context') + '.Consumer';
      case Jg:
        return (e._context.displayName || 'Context') + '.Provider';
      case mf:
        var t = e.render;
        return (
          (e = e.displayName),
          e || ((e = t.displayName || t.name || ''), (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case gf:
        return ((t = e.displayName || null), t !== null ? t : Lu(e.type) || 'Memo');
      case Jn:
        ((t = e._payload), (e = e._init));
        try {
          return Lu(e(t));
        } catch {}
    }
  return null;
}
function Rb(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return ((e = t.render), (e = e.displayName || e.name || ''), t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef'));
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return Lu(t);
    case 8:
      return t === hf ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function Er(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function nv(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
}
function Ib(e) {
  var t = nv(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t];
  if (!e.hasOwnProperty(t) && typeof n < 'u' && typeof n.get == 'function' && typeof n.set == 'function') {
    var s = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return s.call(this);
        },
        set: function (i) {
          ((r = '' + i), o.call(this, i));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = '' + i;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function fa(e) {
  e._valueTracker || (e._valueTracker = Ib(e));
}
function rv(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (e && (r = nv(e) ? (e.checked ? 'true' : 'false') : e.value), (e = r), e !== n ? (t.setValue(e), !0) : !1);
}
function el(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Du(e, t) {
  var n = t.checked;
  return Me({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function oh(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Er(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
    }));
}
function sv(e, t) {
  ((t = t.checked), t != null && pf(e, 'checked', t, !1));
}
function Fu(e, t) {
  sv(e, t);
  var n = Er(t.value),
    r = t.type;
  if (n != null)
    r === 'number' ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n) : e.value !== '' + n && (e.value = '' + n);
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value');
    return;
  }
  (t.hasOwnProperty('value') ? $u(e, t.type, n) : t.hasOwnProperty('defaultValue') && $u(e, t.type, Er(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked));
}
function ih(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (!((r !== 'submit' && r !== 'reset') || (t.value !== void 0 && t.value !== null))) return;
    ((t = '' + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t));
  }
  ((n = e.name), n !== '' && (e.name = ''), (e.defaultChecked = !!e._wrapperState.initialChecked), n !== '' && (e.name = n));
}
function $u(e, t, n) {
  (t !== 'number' || el(e.ownerDocument) !== e) &&
    (n == null ? (e.defaultValue = '' + e._wrapperState.initialValue) : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var ti = Array.isArray;
function Ks(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var s = 0; s < n.length; s++) t['$' + n[s]] = !0;
    for (n = 0; n < e.length; n++)
      ((s = t.hasOwnProperty('$' + e[n].value)), e[n].selected !== s && (e[n].selected = s), s && r && (e[n].defaultSelected = !0));
  } else {
    for (n = '' + Er(n), t = null, s = 0; s < e.length; s++) {
      if (e[s].value === n) {
        ((e[s].selected = !0), r && (e[s].defaultSelected = !0));
        return;
      }
      t !== null || e[s].disabled || (t = e[s]);
    }
    t !== null && (t.selected = !0);
  }
}
function zu(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(M(91));
  return Me({}, t, { value: void 0, defaultValue: void 0, children: '' + e._wrapperState.initialValue });
}
function ah(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(M(92));
      if (ti(n)) {
        if (1 < n.length) throw Error(M(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ''), (n = t));
  }
  e._wrapperState = { initialValue: Er(n) };
}
function ov(e, t) {
  var n = Er(t.value),
    r = Er(t.defaultValue);
  (n != null && ((n = '' + n), n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r));
}
function lh(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function iv(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function Vu(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? iv(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var pa,
  av = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, s) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, s);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t;
    else {
      for (
        pa = pa || document.createElement('div'), pa.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>', t = pa.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function xi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var li = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Ab = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(li).forEach(function (e) {
  Ab.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (li[t] = li[e]));
  });
});
function lv(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (li.hasOwnProperty(e) && li[e])
      ? ('' + t).trim()
      : t + 'px';
}
function cv(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        s = lv(n, t[n], r);
      (n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, s) : (e[n] = s));
    }
}
var Mb = Me(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
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
  }
);
function Uu(e, t) {
  if (t) {
    if (Mb[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(M(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(M(60));
      if (typeof t.dangerouslySetInnerHTML != 'object' || !('__html' in t.dangerouslySetInnerHTML)) throw Error(M(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(M(62));
  }
}
function Bu(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var Wu = null;
function vf(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Hu = null,
  Zs = null,
  Qs = null;
function ch(e) {
  if ((e = Xi(e))) {
    if (typeof Hu != 'function') throw Error(M(280));
    var t = e.stateNode;
    t && ((t = Yl(t)), Hu(e.stateNode, e.type, t));
  }
}
function uv(e) {
  Zs ? (Qs ? Qs.push(e) : (Qs = [e])) : (Zs = e);
}
function dv() {
  if (Zs) {
    var e = Zs,
      t = Qs;
    if (((Qs = Zs = null), ch(e), t)) for (e = 0; e < t.length; e++) ch(t[e]);
  }
}
function fv(e, t) {
  return e(t);
}
function pv() {}
var Wc = !1;
function hv(e, t, n) {
  if (Wc) return e(t, n);
  Wc = !0;
  try {
    return fv(e, t, n);
  } finally {
    ((Wc = !1), (Zs !== null || Qs !== null) && (pv(), dv()));
  }
}
function wi(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Yl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      ((r = !r.disabled) || ((e = e.type), (r = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))), (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != 'function') throw Error(M(231, t, typeof n));
  return n;
}
var Gu = !1;
if (Ln)
  try {
    var Ho = {};
    (Object.defineProperty(Ho, 'passive', {
      get: function () {
        Gu = !0;
      },
    }),
      window.addEventListener('test', Ho, Ho),
      window.removeEventListener('test', Ho, Ho));
  } catch {
    Gu = !1;
  }
function Ob(e, t, n, r, s, o, i, a, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (f) {
    this.onError(f);
  }
}
var ci = !1,
  tl = null,
  nl = !1,
  Ku = null,
  Lb = {
    onError: function (e) {
      ((ci = !0), (tl = e));
    },
  };
function Db(e, t, n, r, s, o, i, a, c) {
  ((ci = !1), (tl = null), Ob.apply(Lb, arguments));
}
function Fb(e, t, n, r, s, o, i, a, c) {
  if ((Db.apply(this, arguments), ci)) {
    if (ci) {
      var u = tl;
      ((ci = !1), (tl = null));
    } else throw Error(M(198));
    nl || ((nl = !0), (Ku = u));
  }
}
function vs(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function mv(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null)) return t.dehydrated;
  }
  return null;
}
function uh(e) {
  if (vs(e) !== e) throw Error(M(188));
}
function $b(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = vs(e)), t === null)) throw Error(M(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var s = n.return;
    if (s === null) break;
    var o = s.alternate;
    if (o === null) {
      if (((r = s.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (s.child === o.child) {
      for (o = s.child; o; ) {
        if (o === n) return (uh(s), e);
        if (o === r) return (uh(s), t);
        o = o.sibling;
      }
      throw Error(M(188));
    }
    if (n.return !== r.return) ((n = s), (r = o));
    else {
      for (var i = !1, a = s.child; a; ) {
        if (a === n) {
          ((i = !0), (n = s), (r = o));
          break;
        }
        if (a === r) {
          ((i = !0), (r = s), (n = o));
          break;
        }
        a = a.sibling;
      }
      if (!i) {
        for (a = o.child; a; ) {
          if (a === n) {
            ((i = !0), (n = o), (r = s));
            break;
          }
          if (a === r) {
            ((i = !0), (r = o), (n = s));
            break;
          }
          a = a.sibling;
        }
        if (!i) throw Error(M(189));
      }
    }
    if (n.alternate !== r) throw Error(M(190));
  }
  if (n.tag !== 3) throw Error(M(188));
  return n.stateNode.current === n ? e : t;
}
function gv(e) {
  return ((e = $b(e)), e !== null ? vv(e) : null);
}
function vv(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = vv(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var yv = jt.unstable_scheduleCallback,
  dh = jt.unstable_cancelCallback,
  zb = jt.unstable_shouldYield,
  Vb = jt.unstable_requestPaint,
  $e = jt.unstable_now,
  Ub = jt.unstable_getCurrentPriorityLevel,
  yf = jt.unstable_ImmediatePriority,
  xv = jt.unstable_UserBlockingPriority,
  rl = jt.unstable_NormalPriority,
  Bb = jt.unstable_LowPriority,
  wv = jt.unstable_IdlePriority,
  Kl = null,
  wn = null;
function Wb(e) {
  if (wn && typeof wn.onCommitFiberRoot == 'function')
    try {
      wn.onCommitFiberRoot(Kl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var sn = Math.clz32 ? Math.clz32 : Kb,
  Hb = Math.log,
  Gb = Math.LN2;
function Kb(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((Hb(e) / Gb) | 0)) | 0);
}
var ha = 64,
  ma = 4194304;
function ni(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function sl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    s = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var a = i & ~s;
    a !== 0 ? (r = ni(a)) : ((o &= i), o !== 0 && (r = ni(o)));
  } else ((i = n & ~s), i !== 0 ? (r = ni(i)) : o !== 0 && (r = ni(o)));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & s) && ((s = r & -r), (o = t & -t), s >= o || (s === 16 && (o & 4194240) !== 0))) return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; ) ((n = 31 - sn(t)), (s = 1 << n), (r |= e[n]), (t &= ~s));
  return r;
}
function Zb(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Qb(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, s = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - sn(o),
      a = 1 << i,
      c = s[i];
    (c === -1 ? (!(a & n) || a & r) && (s[i] = Zb(a, t)) : c <= t && (e.expiredLanes |= a), (o &= ~a));
  }
}
function Zu(e) {
  return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0);
}
function Sv() {
  var e = ha;
  return ((ha <<= 1), !(ha & 4194240) && (ha = 64), e);
}
function Hc(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function qi(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - sn(t)),
    (e[t] = n));
}
function qb(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var s = 31 - sn(n),
      o = 1 << s;
    ((t[s] = 0), (r[s] = -1), (e[s] = -1), (n &= ~o));
  }
}
function xf(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - sn(n),
      s = 1 << r;
    ((s & t) | (e[r] & t) && (e[r] |= t), (n &= ~s));
  }
}
var Ce = 0;
function bv(e) {
  return ((e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1);
}
var Cv,
  wf,
  Ev,
  Nv,
  kv,
  Qu = !1,
  ga = [],
  pr = null,
  hr = null,
  mr = null,
  Si = new Map(),
  bi = new Map(),
  nr = [],
  Yb =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function fh(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      pr = null;
      break;
    case 'dragenter':
    case 'dragleave':
      hr = null;
      break;
    case 'mouseover':
    case 'mouseout':
      mr = null;
      break;
    case 'pointerover':
    case 'pointerout':
      Si.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      bi.delete(t.pointerId);
  }
}
function Go(e, t, n, r, s, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [s] }),
      t !== null && ((t = Xi(t)), t !== null && wf(t)),
      e)
    : ((e.eventSystemFlags |= r), (t = e.targetContainers), s !== null && t.indexOf(s) === -1 && t.push(s), e);
}
function Xb(e, t, n, r, s) {
  switch (t) {
    case 'focusin':
      return ((pr = Go(pr, e, t, n, r, s)), !0);
    case 'dragenter':
      return ((hr = Go(hr, e, t, n, r, s)), !0);
    case 'mouseover':
      return ((mr = Go(mr, e, t, n, r, s)), !0);
    case 'pointerover':
      var o = s.pointerId;
      return (Si.set(o, Go(Si.get(o) || null, e, t, n, r, s)), !0);
    case 'gotpointercapture':
      return ((o = s.pointerId), bi.set(o, Go(bi.get(o) || null, e, t, n, r, s)), !0);
  }
  return !1;
}
function _v(e) {
  var t = Hr(e.target);
  if (t !== null) {
    var n = vs(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = mv(n)), t !== null)) {
          ((e.blockedOn = t),
            kv(e.priority, function () {
              Ev(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Fa(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = qu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Wu = r), n.target.dispatchEvent(r), (Wu = null));
    } else return ((t = Xi(n)), t !== null && wf(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function ph(e, t, n) {
  Fa(e) && n.delete(t);
}
function Jb() {
  ((Qu = !1),
    pr !== null && Fa(pr) && (pr = null),
    hr !== null && Fa(hr) && (hr = null),
    mr !== null && Fa(mr) && (mr = null),
    Si.forEach(ph),
    bi.forEach(ph));
}
function Ko(e, t) {
  e.blockedOn === t && ((e.blockedOn = null), Qu || ((Qu = !0), jt.unstable_scheduleCallback(jt.unstable_NormalPriority, Jb)));
}
function Ci(e) {
  function t(s) {
    return Ko(s, e);
  }
  if (0 < ga.length) {
    Ko(ga[0], e);
    for (var n = 1; n < ga.length; n++) {
      var r = ga[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    pr !== null && Ko(pr, e), hr !== null && Ko(hr, e), mr !== null && Ko(mr, e), Si.forEach(t), bi.forEach(t), n = 0;
    n < nr.length;
    n++
  )
    ((r = nr[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < nr.length && ((n = nr[0]), n.blockedOn === null); ) (_v(n), n.blockedOn === null && nr.shift());
}
var qs = Un.ReactCurrentBatchConfig,
  ol = !0;
function eC(e, t, n, r) {
  var s = Ce,
    o = qs.transition;
  qs.transition = null;
  try {
    ((Ce = 1), Sf(e, t, n, r));
  } finally {
    ((Ce = s), (qs.transition = o));
  }
}
function tC(e, t, n, r) {
  var s = Ce,
    o = qs.transition;
  qs.transition = null;
  try {
    ((Ce = 4), Sf(e, t, n, r));
  } finally {
    ((Ce = s), (qs.transition = o));
  }
}
function Sf(e, t, n, r) {
  if (ol) {
    var s = qu(e, t, n, r);
    if (s === null) (tu(e, t, r, il, n), fh(e, r));
    else if (Xb(s, e, t, n, r)) r.stopPropagation();
    else if ((fh(e, r), t & 4 && -1 < Yb.indexOf(e))) {
      for (; s !== null; ) {
        var o = Xi(s);
        if ((o !== null && Cv(o), (o = qu(e, t, n, r)), o === null && tu(e, t, r, il, n), o === s)) break;
        s = o;
      }
      s !== null && r.stopPropagation();
    } else tu(e, t, r, null, n);
  }
}
var il = null;
function qu(e, t, n, r) {
  if (((il = null), (e = vf(r)), (e = Hr(e)), e !== null))
    if (((t = vs(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = mv(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((il = e), null);
}
function Pv(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (Ub()) {
        case yf:
          return 1;
        case xv:
          return 4;
        case rl:
        case Bb:
          return 16;
        case wv:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var cr = null,
  bf = null,
  $a = null;
function jv() {
  if ($a) return $a;
  var e,
    t = bf,
    n = t.length,
    r,
    s = 'value' in cr ? cr.value : cr.textContent,
    o = s.length;
  for (e = 0; e < n && t[e] === s[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === s[o - r]; r++);
  return ($a = s.slice(e, 1 < r ? 1 - r : void 0));
}
function za(e) {
  var t = e.keyCode;
  return (
    'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function va() {
  return !0;
}
function hh() {
  return !1;
}
function It(e) {
  function t(n, r, s, o, i) {
    ((this._reactName = n),
      (this._targetInst = s),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null));
    for (var a in e) e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
    return (
      (this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? va : hh),
      (this.isPropagationStopped = hh),
      this
    );
  }
  return (
    Me(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault ? n.preventDefault() : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = va));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = va));
      },
      persist: function () {},
      isPersistent: va,
    }),
    t
  );
}
var Ro = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Cf = It(Ro),
  Yi = Me({}, Ro, { view: 0, detail: 0 }),
  nC = It(Yi),
  Gc,
  Kc,
  Zo,
  Zl = Me({}, Yi, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ef,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0 ? (e.fromElement === e.srcElement ? e.toElement : e.fromElement) : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== Zo &&
            (Zo && e.type === 'mousemove' ? ((Gc = e.screenX - Zo.screenX), (Kc = e.screenY - Zo.screenY)) : (Kc = Gc = 0), (Zo = e)),
          Gc);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : Kc;
    },
  }),
  mh = It(Zl),
  rC = Me({}, Zl, { dataTransfer: 0 }),
  sC = It(rC),
  oC = Me({}, Yi, { relatedTarget: 0 }),
  Zc = It(oC),
  iC = Me({}, Ro, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  aC = It(iC),
  lC = Me({}, Ro, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  cC = It(lC),
  uC = Me({}, Ro, { data: 0 }),
  gh = It(uC),
  dC = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  fC = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  pC = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
function hC(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = pC[e]) ? !!t[e] : !1;
}
function Ef() {
  return hC;
}
var mC = Me({}, Yi, {
    key: function (e) {
      if (e.key) {
        var t = dC[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = za(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? fC[e.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ef,
    charCode: function (e) {
      return e.type === 'keypress' ? za(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress' ? za(e) : e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
  }),
  gC = It(mC),
  vC = Me({}, Zl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  vh = It(vC),
  yC = Me({}, Yi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ef,
  }),
  xC = It(yC),
  wC = Me({}, Ro, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  SC = It(wC),
  bC = Me({}, Zl, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e ? e.deltaY : 'wheelDeltaY' in e ? -e.wheelDeltaY : 'wheelDelta' in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  CC = It(bC),
  EC = [9, 13, 27, 32],
  Nf = Ln && 'CompositionEvent' in window,
  ui = null;
Ln && 'documentMode' in document && (ui = document.documentMode);
var NC = Ln && 'TextEvent' in window && !ui,
  Tv = Ln && (!Nf || (ui && 8 < ui && 11 >= ui)),
  yh = ' ',
  xh = !1;
function Rv(e, t) {
  switch (e) {
    case 'keyup':
      return EC.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function Iv(e) {
  return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
}
var Ds = !1;
function kC(e, t) {
  switch (e) {
    case 'compositionend':
      return Iv(t);
    case 'keypress':
      return t.which !== 32 ? null : ((xh = !0), yh);
    case 'textInput':
      return ((e = t.data), e === yh && xh ? null : e);
    default:
      return null;
  }
}
function _C(e, t) {
  if (Ds) return e === 'compositionend' || (!Nf && Rv(e, t)) ? ((e = jv()), ($a = bf = cr = null), (Ds = !1), e) : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return Tv && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var PC = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function wh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!PC[e.type] : t === 'textarea';
}
function Av(e, t, n, r) {
  (uv(r), (t = al(t, 'onChange')), 0 < t.length && ((n = new Cf('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t })));
}
var di = null,
  Ei = null;
function jC(e) {
  Wv(e, 0);
}
function Ql(e) {
  var t = zs(e);
  if (rv(t)) return e;
}
function TC(e, t) {
  if (e === 'change') return t;
}
var Mv = !1;
if (Ln) {
  var Qc;
  if (Ln) {
    var qc = 'oninput' in document;
    if (!qc) {
      var Sh = document.createElement('div');
      (Sh.setAttribute('oninput', 'return;'), (qc = typeof Sh.oninput == 'function'));
    }
    Qc = qc;
  } else Qc = !1;
  Mv = Qc && (!document.documentMode || 9 < document.documentMode);
}
function bh() {
  di && (di.detachEvent('onpropertychange', Ov), (Ei = di = null));
}
function Ov(e) {
  if (e.propertyName === 'value' && Ql(Ei)) {
    var t = [];
    (Av(t, Ei, e, vf(e)), hv(jC, t));
  }
}
function RC(e, t, n) {
  e === 'focusin' ? (bh(), (di = t), (Ei = n), di.attachEvent('onpropertychange', Ov)) : e === 'focusout' && bh();
}
function IC(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ql(Ei);
}
function AC(e, t) {
  if (e === 'click') return Ql(t);
}
function MC(e, t) {
  if (e === 'input' || e === 'change') return Ql(t);
}
function OC(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var an = typeof Object.is == 'function' ? Object.is : OC;
function Ni(e, t) {
  if (an(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var s = n[r];
    if (!Iu.call(t, s) || !an(e[s], t[s])) return !1;
  }
  return !0;
}
function Ch(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Eh(e, t) {
  var n = Ch(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Ch(n);
  }
}
function Lv(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Lv(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Dv() {
  for (var e = window, t = el(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string';
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = el(e.document);
  }
  return t;
}
function kf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' && (e.type === 'text' || e.type === 'search' || e.type === 'tel' || e.type === 'url' || e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function LC(e) {
  var t = Dv(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Lv(n.ownerDocument.documentElement, n)) {
    if (r !== null && kf(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
        ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)));
      else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)) {
        e = e.getSelection();
        var s = n.textContent.length,
          o = Math.min(r.start, s);
        ((r = r.end === void 0 ? o : Math.min(r.end, s)), !e.extend && o > r && ((s = r), (r = o), (o = s)), (s = Eh(n, o)));
        var i = Eh(n, r);
        s &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== s.node ||
            e.anchorOffset !== s.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(s.node, s.offset),
          e.removeAllRanges(),
          o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top));
  }
}
var DC = Ln && 'documentMode' in document && 11 >= document.documentMode,
  Fs = null,
  Yu = null,
  fi = null,
  Xu = !1;
function Nh(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Xu ||
    Fs == null ||
    Fs !== el(r) ||
    ((r = Fs),
    'selectionStart' in r && kf(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset })),
    (fi && Ni(fi, r)) ||
      ((fi = r),
      (r = al(Yu, 'onSelect')),
      0 < r.length && ((t = new Cf('onSelect', 'select', null, t, n)), e.push({ event: t, listeners: r }), (t.target = Fs))));
}
function ya(e, t) {
  var n = {};
  return ((n[e.toLowerCase()] = t.toLowerCase()), (n['Webkit' + e] = 'webkit' + t), (n['Moz' + e] = 'moz' + t), n);
}
var $s = {
    animationend: ya('Animation', 'AnimationEnd'),
    animationiteration: ya('Animation', 'AnimationIteration'),
    animationstart: ya('Animation', 'AnimationStart'),
    transitionend: ya('Transition', 'TransitionEnd'),
  },
  Yc = {},
  Fv = {};
Ln &&
  ((Fv = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete $s.animationend.animation, delete $s.animationiteration.animation, delete $s.animationstart.animation),
  'TransitionEvent' in window || delete $s.transitionend.transition);
function ql(e) {
  if (Yc[e]) return Yc[e];
  if (!$s[e]) return e;
  var t = $s[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Fv) return (Yc[e] = t[n]);
  return e;
}
var $v = ql('animationend'),
  zv = ql('animationiteration'),
  Vv = ql('animationstart'),
  Uv = ql('transitionend'),
  Bv = new Map(),
  kh =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function Rr(e, t) {
  (Bv.set(e, t), gs(t, [e]));
}
for (var Xc = 0; Xc < kh.length; Xc++) {
  var Jc = kh[Xc],
    FC = Jc.toLowerCase(),
    $C = Jc[0].toUpperCase() + Jc.slice(1);
  Rr(FC, 'on' + $C);
}
Rr($v, 'onAnimationEnd');
Rr(zv, 'onAnimationIteration');
Rr(Vv, 'onAnimationStart');
Rr('dblclick', 'onDoubleClick');
Rr('focusin', 'onFocus');
Rr('focusout', 'onBlur');
Rr(Uv, 'onTransitionEnd');
fo('onMouseEnter', ['mouseout', 'mouseover']);
fo('onMouseLeave', ['mouseout', 'mouseover']);
fo('onPointerEnter', ['pointerout', 'pointerover']);
fo('onPointerLeave', ['pointerout', 'pointerover']);
gs('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' '));
gs('onSelect', 'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' '));
gs('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
gs('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' '));
gs('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' '));
gs('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' '));
var ri =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  zC = new Set('cancel close invalid load scroll toggle'.split(' ').concat(ri));
function _h(e, t, n) {
  var r = e.type || 'unknown-event';
  ((e.currentTarget = n), Fb(r, t, void 0, e), (e.currentTarget = null));
}
function Wv(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      s = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var a = r[i],
            c = a.instance,
            u = a.currentTarget;
          if (((a = a.listener), c !== o && s.isPropagationStopped())) break e;
          (_h(s, a, u), (o = c));
        }
      else
        for (i = 0; i < r.length; i++) {
          if (((a = r[i]), (c = a.instance), (u = a.currentTarget), (a = a.listener), c !== o && s.isPropagationStopped())) break e;
          (_h(s, a, u), (o = c));
        }
    }
  }
  if (nl) throw ((e = Ku), (nl = !1), (Ku = null), e);
}
function Pe(e, t) {
  var n = t[rd];
  n === void 0 && (n = t[rd] = new Set());
  var r = e + '__bubble';
  n.has(r) || (Hv(t, e, 2, !1), n.add(r));
}
function eu(e, t, n) {
  var r = 0;
  (t && (r |= 4), Hv(n, e, r, t));
}
var xa = '_reactListening' + Math.random().toString(36).slice(2);
function ki(e) {
  if (!e[xa]) {
    ((e[xa] = !0),
      Xg.forEach(function (n) {
        n !== 'selectionchange' && (zC.has(n) || eu(n, !1, e), eu(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[xa] || ((t[xa] = !0), eu('selectionchange', !1, t));
  }
}
function Hv(e, t, n, r) {
  switch (Pv(t)) {
    case 1:
      var s = eC;
      break;
    case 4:
      s = tC;
      break;
    default:
      s = Sf;
  }
  ((n = s.bind(null, t, n, e)),
    (s = void 0),
    !Gu || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (s = !0),
    r
      ? s !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: s })
        : e.addEventListener(t, n, !0)
      : s !== void 0
        ? e.addEventListener(t, n, { passive: s })
        : e.addEventListener(t, n, !1));
}
function tu(e, t, n, r, s) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var a = r.stateNode.containerInfo;
        if (a === s || (a.nodeType === 8 && a.parentNode === s)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var c = i.tag;
            if ((c === 3 || c === 4) && ((c = i.stateNode.containerInfo), c === s || (c.nodeType === 8 && c.parentNode === s))) return;
            i = i.return;
          }
        for (; a !== null; ) {
          if (((i = Hr(a)), i === null)) return;
          if (((c = i.tag), c === 5 || c === 6)) {
            r = o = i;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  hv(function () {
    var u = o,
      f = vf(n),
      p = [];
    e: {
      var h = Bv.get(e);
      if (h !== void 0) {
        var m = Cf,
          S = e;
        switch (e) {
          case 'keypress':
            if (za(n) === 0) break e;
          case 'keydown':
          case 'keyup':
            m = gC;
            break;
          case 'focusin':
            ((S = 'focus'), (m = Zc));
            break;
          case 'focusout':
            ((S = 'blur'), (m = Zc));
            break;
          case 'beforeblur':
          case 'afterblur':
            m = Zc;
            break;
          case 'click':
            if (n.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            m = mh;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            m = sC;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            m = xC;
            break;
          case $v:
          case zv:
          case Vv:
            m = aC;
            break;
          case Uv:
            m = SC;
            break;
          case 'scroll':
            m = nC;
            break;
          case 'wheel':
            m = CC;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            m = cC;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            m = vh;
        }
        var v = (t & 4) !== 0,
          w = !v && e === 'scroll',
          x = v ? (h !== null ? h + 'Capture' : null) : h;
        v = [];
        for (var g = u, y; g !== null; ) {
          y = g;
          var b = y.stateNode;
          if ((y.tag === 5 && b !== null && ((y = b), x !== null && ((b = wi(g, x)), b != null && v.push(_i(g, b, y)))), w)) break;
          g = g.return;
        }
        0 < v.length && ((h = new m(h, S, null, n, f)), p.push({ event: h, listeners: v }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === 'mouseover' || e === 'pointerover'),
          (m = e === 'mouseout' || e === 'pointerout'),
          h && n !== Wu && (S = n.relatedTarget || n.fromElement) && (Hr(S) || S[Dn]))
        )
          break e;
        if (
          (m || h) &&
          ((h = f.window === f ? f : (h = f.ownerDocument) ? h.defaultView || h.parentWindow : window),
          m
            ? ((S = n.relatedTarget || n.toElement),
              (m = u),
              (S = S ? Hr(S) : null),
              S !== null && ((w = vs(S)), S !== w || (S.tag !== 5 && S.tag !== 6)) && (S = null))
            : ((m = null), (S = u)),
          m !== S)
        ) {
          if (
            ((v = mh),
            (b = 'onMouseLeave'),
            (x = 'onMouseEnter'),
            (g = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') && ((v = vh), (b = 'onPointerLeave'), (x = 'onPointerEnter'), (g = 'pointer')),
            (w = m == null ? h : zs(m)),
            (y = S == null ? h : zs(S)),
            (h = new v(b, g + 'leave', m, n, f)),
            (h.target = w),
            (h.relatedTarget = y),
            (b = null),
            Hr(f) === u && ((v = new v(x, g + 'enter', S, n, f)), (v.target = y), (v.relatedTarget = w), (b = v)),
            (w = b),
            m && S)
          )
            t: {
              for (v = m, x = S, g = 0, y = v; y; y = Ps(y)) g++;
              for (y = 0, b = x; b; b = Ps(b)) y++;
              for (; 0 < g - y; ) ((v = Ps(v)), g--);
              for (; 0 < y - g; ) ((x = Ps(x)), y--);
              for (; g--; ) {
                if (v === x || (x !== null && v === x.alternate)) break t;
                ((v = Ps(v)), (x = Ps(x)));
              }
              v = null;
            }
          else v = null;
          (m !== null && Ph(p, h, m, v, !1), S !== null && w !== null && Ph(p, w, S, v, !0));
        }
      }
      e: {
        if (
          ((h = u ? zs(u) : window), (m = h.nodeName && h.nodeName.toLowerCase()), m === 'select' || (m === 'input' && h.type === 'file'))
        )
          var C = TC;
        else if (wh(h))
          if (Mv) C = MC;
          else {
            C = IC;
            var k = RC;
          }
        else (m = h.nodeName) && m.toLowerCase() === 'input' && (h.type === 'checkbox' || h.type === 'radio') && (C = AC);
        if (C && (C = C(e, u))) {
          Av(p, C, n, f);
          break e;
        }
        (k && k(e, h, u), e === 'focusout' && (k = h._wrapperState) && k.controlled && h.type === 'number' && $u(h, 'number', h.value));
      }
      switch (((k = u ? zs(u) : window), e)) {
        case 'focusin':
          (wh(k) || k.contentEditable === 'true') && ((Fs = k), (Yu = u), (fi = null));
          break;
        case 'focusout':
          fi = Yu = Fs = null;
          break;
        case 'mousedown':
          Xu = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ((Xu = !1), Nh(p, n, f));
          break;
        case 'selectionchange':
          if (DC) break;
        case 'keydown':
        case 'keyup':
          Nh(p, n, f);
      }
      var N;
      if (Nf)
        e: {
          switch (e) {
            case 'compositionstart':
              var P = 'onCompositionStart';
              break e;
            case 'compositionend':
              P = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              P = 'onCompositionUpdate';
              break e;
          }
          P = void 0;
        }
      else Ds ? Rv(e, n) && (P = 'onCompositionEnd') : e === 'keydown' && n.keyCode === 229 && (P = 'onCompositionStart');
      (P &&
        (Tv &&
          n.locale !== 'ko' &&
          (Ds || P !== 'onCompositionStart'
            ? P === 'onCompositionEnd' && Ds && (N = jv())
            : ((cr = f), (bf = 'value' in cr ? cr.value : cr.textContent), (Ds = !0))),
        (k = al(u, P)),
        0 < k.length &&
          ((P = new gh(P, e, null, n, f)),
          p.push({ event: P, listeners: k }),
          N ? (P.data = N) : ((N = Iv(n)), N !== null && (P.data = N)))),
        (N = NC ? kC(e, n) : _C(e, n)) &&
          ((u = al(u, 'onBeforeInput')),
          0 < u.length && ((f = new gh('onBeforeInput', 'beforeinput', null, n, f)), p.push({ event: f, listeners: u }), (f.data = N))));
    }
    Wv(p, t);
  });
}
function _i(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function al(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var s = e,
      o = s.stateNode;
    (s.tag === 5 &&
      o !== null &&
      ((s = o), (o = wi(e, n)), o != null && r.unshift(_i(e, o, s)), (o = wi(e, t)), o != null && r.push(_i(e, o, s))),
      (e = e.return));
  }
  return r;
}
function Ps(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ph(e, t, n, r, s) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n,
      c = a.alternate,
      u = a.stateNode;
    if (c !== null && c === r) break;
    (a.tag === 5 &&
      u !== null &&
      ((a = u), s ? ((c = wi(n, o)), c != null && i.unshift(_i(n, c, a))) : s || ((c = wi(n, o)), c != null && i.push(_i(n, c, a)))),
      (n = n.return));
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var VC = /\r\n?/g,
  UC = /\u0000|\uFFFD/g;
function jh(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      VC,
      `
`
    )
    .replace(UC, '');
}
function wa(e, t, n) {
  if (((t = jh(t)), jh(e) !== t && n)) throw Error(M(425));
}
function ll() {}
var Ju = null,
  ed = null;
function td(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null)
  );
}
var nd = typeof setTimeout == 'function' ? setTimeout : void 0,
  BC = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  Th = typeof Promise == 'function' ? Promise : void 0,
  WC =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof Th < 'u'
        ? function (e) {
            return Th.resolve(null).then(e).catch(HC);
          }
        : nd;
function HC(e) {
  setTimeout(function () {
    throw e;
  });
}
function nu(e, t) {
  var n = t,
    r = 0;
  do {
    var s = n.nextSibling;
    if ((e.removeChild(n), s && s.nodeType === 8))
      if (((n = s.data), n === '/$')) {
        if (r === 0) {
          (e.removeChild(s), Ci(t));
          return;
        }
        r--;
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
    n = s;
  } while (n);
  Ci(t);
}
function gr(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function Rh(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e;
        t--;
      } else n === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Io = Math.random().toString(36).slice(2),
  vn = '__reactFiber$' + Io,
  Pi = '__reactProps$' + Io,
  Dn = '__reactContainer$' + Io,
  rd = '__reactEvents$' + Io,
  GC = '__reactListeners$' + Io,
  KC = '__reactHandles$' + Io;
function Hr(e) {
  var t = e[vn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Dn] || n[vn])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = Rh(e); e !== null; ) {
          if ((n = e[vn])) return n;
          e = Rh(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Xi(e) {
  return ((e = e[vn] || e[Dn]), !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e);
}
function zs(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(M(33));
}
function Yl(e) {
  return e[Pi] || null;
}
var sd = [],
  Vs = -1;
function Ir(e) {
  return { current: e };
}
function je(e) {
  0 > Vs || ((e.current = sd[Vs]), (sd[Vs] = null), Vs--);
}
function ke(e, t) {
  (Vs++, (sd[Vs] = e.current), (e.current = t));
}
var Nr = {},
  it = Ir(Nr),
  wt = Ir(!1),
  ss = Nr;
function po(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Nr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var s = {},
    o;
  for (o in n) s[o] = t[o];
  return (
    r && ((e = e.stateNode), (e.__reactInternalMemoizedUnmaskedChildContext = t), (e.__reactInternalMemoizedMaskedChildContext = s)),
    s
  );
}
function St(e) {
  return ((e = e.childContextTypes), e != null);
}
function cl() {
  (je(wt), je(it));
}
function Ih(e, t, n) {
  if (it.current !== Nr) throw Error(M(168));
  (ke(it, t), ke(wt, n));
}
function Gv(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n;
  r = r.getChildContext();
  for (var s in r) if (!(s in t)) throw Error(M(108, Rb(e) || 'Unknown', s));
  return Me({}, n, r);
}
function ul(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Nr),
    (ss = it.current),
    ke(it, e),
    ke(wt, wt.current),
    !0
  );
}
function Ah(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(M(169));
  (n ? ((e = Gv(e, t, ss)), (r.__reactInternalMemoizedMergedChildContext = e), je(wt), je(it), ke(it, e)) : je(wt), ke(wt, n));
}
var Rn = null,
  Xl = !1,
  ru = !1;
function Kv(e) {
  Rn === null ? (Rn = [e]) : Rn.push(e);
}
function ZC(e) {
  ((Xl = !0), Kv(e));
}
function Ar() {
  if (!ru && Rn !== null) {
    ru = !0;
    var e = 0,
      t = Ce;
    try {
      var n = Rn;
      for (Ce = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Rn = null), (Xl = !1));
    } catch (s) {
      throw (Rn !== null && (Rn = Rn.slice(e + 1)), yv(yf, Ar), s);
    } finally {
      ((Ce = t), (ru = !1));
    }
  }
  return null;
}
var Us = [],
  Bs = 0,
  dl = null,
  fl = 0,
  Ft = [],
  $t = 0,
  os = null,
  An = 1,
  Mn = '';
function Br(e, t) {
  ((Us[Bs++] = fl), (Us[Bs++] = dl), (dl = e), (fl = t));
}
function Zv(e, t, n) {
  ((Ft[$t++] = An), (Ft[$t++] = Mn), (Ft[$t++] = os), (os = e));
  var r = An;
  e = Mn;
  var s = 32 - sn(r) - 1;
  ((r &= ~(1 << s)), (n += 1));
  var o = 32 - sn(t) + s;
  if (30 < o) {
    var i = s - (s % 5);
    ((o = (r & ((1 << i) - 1)).toString(32)), (r >>= i), (s -= i), (An = (1 << (32 - sn(t) + s)) | (n << s) | r), (Mn = o + e));
  } else ((An = (1 << o) | (n << s) | r), (Mn = e));
}
function _f(e) {
  e.return !== null && (Br(e, 1), Zv(e, 1, 0));
}
function Pf(e) {
  for (; e === dl; ) ((dl = Us[--Bs]), (Us[Bs] = null), (fl = Us[--Bs]), (Us[Bs] = null));
  for (; e === os; ) ((os = Ft[--$t]), (Ft[$t] = null), (Mn = Ft[--$t]), (Ft[$t] = null), (An = Ft[--$t]), (Ft[$t] = null));
}
var _t = null,
  kt = null,
  Re = !1,
  rn = null;
function Qv(e, t) {
  var n = zt(5, null, null, 0);
  ((n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Mh(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (_t = e), (kt = gr(t.firstChild)), !0) : !1
      );
    case 6:
      return ((t = e.pendingProps === '' || t.nodeType !== 3 ? null : t), t !== null ? ((e.stateNode = t), (_t = e), (kt = null), !0) : !1);
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = os !== null ? { id: An, overflow: Mn } : null),
            (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
            (n = zt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (_t = e),
            (kt = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function od(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function id(e) {
  if (Re) {
    var t = kt;
    if (t) {
      var n = t;
      if (!Mh(e, t)) {
        if (od(e)) throw Error(M(418));
        t = gr(n.nextSibling);
        var r = _t;
        t && Mh(e, t) ? Qv(r, n) : ((e.flags = (e.flags & -4097) | 2), (Re = !1), (_t = e));
      }
    } else {
      if (od(e)) throw Error(M(418));
      ((e.flags = (e.flags & -4097) | 2), (Re = !1), (_t = e));
    }
  }
}
function Oh(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  _t = e;
}
function Sa(e) {
  if (e !== _t) return !1;
  if (!Re) return (Oh(e), (Re = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) && !(t = e.tag !== 5) && ((t = e.type), (t = t !== 'head' && t !== 'body' && !td(e.type, e.memoizedProps))),
    t && (t = kt))
  ) {
    if (od(e)) throw (qv(), Error(M(418)));
    for (; t; ) (Qv(e, t), (t = gr(t.nextSibling)));
  }
  if ((Oh(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(M(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$') {
            if (t === 0) {
              kt = gr(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      kt = null;
    }
  } else kt = _t ? gr(e.stateNode.nextSibling) : null;
  return !0;
}
function qv() {
  for (var e = kt; e; ) e = gr(e.nextSibling);
}
function ho() {
  ((kt = _t = null), (Re = !1));
}
function jf(e) {
  rn === null ? (rn = [e]) : rn.push(e);
}
var QC = Un.ReactCurrentBatchConfig;
function Qo(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(M(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(M(147, e));
      var s = r,
        o = '' + e;
      return t !== null && t.ref !== null && typeof t.ref == 'function' && t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var a = s.refs;
            i === null ? delete a[o] : (a[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != 'string') throw Error(M(284));
    if (!n._owner) throw Error(M(290, e));
  }
  return e;
}
function ba(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(M(31, e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e))
  );
}
function Lh(e) {
  var t = e._init;
  return t(e._payload);
}
function Yv(e) {
  function t(x, g) {
    if (e) {
      var y = x.deletions;
      y === null ? ((x.deletions = [g]), (x.flags |= 16)) : y.push(g);
    }
  }
  function n(x, g) {
    if (!e) return null;
    for (; g !== null; ) (t(x, g), (g = g.sibling));
    return null;
  }
  function r(x, g) {
    for (x = new Map(); g !== null; ) (g.key !== null ? x.set(g.key, g) : x.set(g.index, g), (g = g.sibling));
    return x;
  }
  function s(x, g) {
    return ((x = wr(x, g)), (x.index = 0), (x.sibling = null), x);
  }
  function o(x, g, y) {
    return (
      (x.index = y),
      e
        ? ((y = x.alternate), y !== null ? ((y = y.index), y < g ? ((x.flags |= 2), g) : y) : ((x.flags |= 2), g))
        : ((x.flags |= 1048576), g)
    );
  }
  function i(x) {
    return (e && x.alternate === null && (x.flags |= 2), x);
  }
  function a(x, g, y, b) {
    return g === null || g.tag !== 6 ? ((g = uu(y, x.mode, b)), (g.return = x), g) : ((g = s(g, y)), (g.return = x), g);
  }
  function c(x, g, y, b) {
    var C = y.type;
    return C === Ls
      ? f(x, g, y.props.children, b, y.key)
      : g !== null && (g.elementType === C || (typeof C == 'object' && C !== null && C.$$typeof === Jn && Lh(C) === g.type))
        ? ((b = s(g, y.props)), (b.ref = Qo(x, g, y)), (b.return = x), b)
        : ((b = Ka(y.type, y.key, y.props, null, x.mode, b)), (b.ref = Qo(x, g, y)), (b.return = x), b);
  }
  function u(x, g, y, b) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== y.containerInfo || g.stateNode.implementation !== y.implementation
      ? ((g = du(y, x.mode, b)), (g.return = x), g)
      : ((g = s(g, y.children || [])), (g.return = x), g);
  }
  function f(x, g, y, b, C) {
    return g === null || g.tag !== 7 ? ((g = rs(y, x.mode, b, C)), (g.return = x), g) : ((g = s(g, y)), (g.return = x), g);
  }
  function p(x, g, y) {
    if ((typeof g == 'string' && g !== '') || typeof g == 'number') return ((g = uu('' + g, x.mode, y)), (g.return = x), g);
    if (typeof g == 'object' && g !== null) {
      switch (g.$$typeof) {
        case da:
          return ((y = Ka(g.type, g.key, g.props, null, x.mode, y)), (y.ref = Qo(x, null, g)), (y.return = x), y);
        case Os:
          return ((g = du(g, x.mode, y)), (g.return = x), g);
        case Jn:
          var b = g._init;
          return p(x, b(g._payload), y);
      }
      if (ti(g) || Wo(g)) return ((g = rs(g, x.mode, y, null)), (g.return = x), g);
      ba(x, g);
    }
    return null;
  }
  function h(x, g, y, b) {
    var C = g !== null ? g.key : null;
    if ((typeof y == 'string' && y !== '') || typeof y == 'number') return C !== null ? null : a(x, g, '' + y, b);
    if (typeof y == 'object' && y !== null) {
      switch (y.$$typeof) {
        case da:
          return y.key === C ? c(x, g, y, b) : null;
        case Os:
          return y.key === C ? u(x, g, y, b) : null;
        case Jn:
          return ((C = y._init), h(x, g, C(y._payload), b));
      }
      if (ti(y) || Wo(y)) return C !== null ? null : f(x, g, y, b, null);
      ba(x, y);
    }
    return null;
  }
  function m(x, g, y, b, C) {
    if ((typeof b == 'string' && b !== '') || typeof b == 'number') return ((x = x.get(y) || null), a(g, x, '' + b, C));
    if (typeof b == 'object' && b !== null) {
      switch (b.$$typeof) {
        case da:
          return ((x = x.get(b.key === null ? y : b.key) || null), c(g, x, b, C));
        case Os:
          return ((x = x.get(b.key === null ? y : b.key) || null), u(g, x, b, C));
        case Jn:
          var k = b._init;
          return m(x, g, y, k(b._payload), C);
      }
      if (ti(b) || Wo(b)) return ((x = x.get(y) || null), f(g, x, b, C, null));
      ba(g, b);
    }
    return null;
  }
  function S(x, g, y, b) {
    for (var C = null, k = null, N = g, P = (g = 0), T = null; N !== null && P < y.length; P++) {
      N.index > P ? ((T = N), (N = null)) : (T = N.sibling);
      var R = h(x, N, y[P], b);
      if (R === null) {
        N === null && (N = T);
        break;
      }
      (e && N && R.alternate === null && t(x, N), (g = o(R, g, P)), k === null ? (C = R) : (k.sibling = R), (k = R), (N = T));
    }
    if (P === y.length) return (n(x, N), Re && Br(x, P), C);
    if (N === null) {
      for (; P < y.length; P++) ((N = p(x, y[P], b)), N !== null && ((g = o(N, g, P)), k === null ? (C = N) : (k.sibling = N), (k = N)));
      return (Re && Br(x, P), C);
    }
    for (N = r(x, N); P < y.length; P++)
      ((T = m(N, x, P, y[P], b)),
        T !== null &&
          (e && T.alternate !== null && N.delete(T.key === null ? P : T.key),
          (g = o(T, g, P)),
          k === null ? (C = T) : (k.sibling = T),
          (k = T)));
    return (
      e &&
        N.forEach(function (H) {
          return t(x, H);
        }),
      Re && Br(x, P),
      C
    );
  }
  function v(x, g, y, b) {
    var C = Wo(y);
    if (typeof C != 'function') throw Error(M(150));
    if (((y = C.call(y)), y == null)) throw Error(M(151));
    for (var k = (C = null), N = g, P = (g = 0), T = null, R = y.next(); N !== null && !R.done; P++, R = y.next()) {
      N.index > P ? ((T = N), (N = null)) : (T = N.sibling);
      var H = h(x, N, R.value, b);
      if (H === null) {
        N === null && (N = T);
        break;
      }
      (e && N && H.alternate === null && t(x, N), (g = o(H, g, P)), k === null ? (C = H) : (k.sibling = H), (k = H), (N = T));
    }
    if (R.done) return (n(x, N), Re && Br(x, P), C);
    if (N === null) {
      for (; !R.done; P++, R = y.next())
        ((R = p(x, R.value, b)), R !== null && ((g = o(R, g, P)), k === null ? (C = R) : (k.sibling = R), (k = R)));
      return (Re && Br(x, P), C);
    }
    for (N = r(x, N); !R.done; P++, R = y.next())
      ((R = m(N, x, P, R.value, b)),
        R !== null &&
          (e && R.alternate !== null && N.delete(R.key === null ? P : R.key),
          (g = o(R, g, P)),
          k === null ? (C = R) : (k.sibling = R),
          (k = R)));
    return (
      e &&
        N.forEach(function ($) {
          return t(x, $);
        }),
      Re && Br(x, P),
      C
    );
  }
  function w(x, g, y, b) {
    if (
      (typeof y == 'object' && y !== null && y.type === Ls && y.key === null && (y = y.props.children), typeof y == 'object' && y !== null)
    ) {
      switch (y.$$typeof) {
        case da:
          e: {
            for (var C = y.key, k = g; k !== null; ) {
              if (k.key === C) {
                if (((C = y.type), C === Ls)) {
                  if (k.tag === 7) {
                    (n(x, k.sibling), (g = s(k, y.props.children)), (g.return = x), (x = g));
                    break e;
                  }
                } else if (k.elementType === C || (typeof C == 'object' && C !== null && C.$$typeof === Jn && Lh(C) === k.type)) {
                  (n(x, k.sibling), (g = s(k, y.props)), (g.ref = Qo(x, k, y)), (g.return = x), (x = g));
                  break e;
                }
                n(x, k);
                break;
              } else t(x, k);
              k = k.sibling;
            }
            y.type === Ls
              ? ((g = rs(y.props.children, x.mode, b, y.key)), (g.return = x), (x = g))
              : ((b = Ka(y.type, y.key, y.props, null, x.mode, b)), (b.ref = Qo(x, g, y)), (b.return = x), (x = b));
          }
          return i(x);
        case Os:
          e: {
            for (k = y.key; g !== null; ) {
              if (g.key === k)
                if (g.tag === 4 && g.stateNode.containerInfo === y.containerInfo && g.stateNode.implementation === y.implementation) {
                  (n(x, g.sibling), (g = s(g, y.children || [])), (g.return = x), (x = g));
                  break e;
                } else {
                  n(x, g);
                  break;
                }
              else t(x, g);
              g = g.sibling;
            }
            ((g = du(y, x.mode, b)), (g.return = x), (x = g));
          }
          return i(x);
        case Jn:
          return ((k = y._init), w(x, g, k(y._payload), b));
      }
      if (ti(y)) return S(x, g, y, b);
      if (Wo(y)) return v(x, g, y, b);
      ba(x, y);
    }
    return (typeof y == 'string' && y !== '') || typeof y == 'number'
      ? ((y = '' + y),
        g !== null && g.tag === 6
          ? (n(x, g.sibling), (g = s(g, y)), (g.return = x), (x = g))
          : (n(x, g), (g = uu(y, x.mode, b)), (g.return = x), (x = g)),
        i(x))
      : n(x, g);
  }
  return w;
}
var mo = Yv(!0),
  Xv = Yv(!1),
  pl = Ir(null),
  hl = null,
  Ws = null,
  Tf = null;
function Rf() {
  Tf = Ws = hl = null;
}
function If(e) {
  var t = pl.current;
  (je(pl), (e._currentValue = t));
}
function ad(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Ys(e, t) {
  ((hl = e),
    (Tf = Ws = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (xt = !0), (e.firstContext = null)));
}
function Bt(e) {
  var t = e._currentValue;
  if (Tf !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Ws === null)) {
      if (hl === null) throw Error(M(308));
      ((Ws = e), (hl.dependencies = { lanes: 0, firstContext: e }));
    } else Ws = Ws.next = e;
  return t;
}
var Gr = null;
function Af(e) {
  Gr === null ? (Gr = [e]) : Gr.push(e);
}
function Jv(e, t, n, r) {
  var s = t.interleaved;
  return (s === null ? ((n.next = n), Af(t)) : ((n.next = s.next), (s.next = n)), (t.interleaved = n), Fn(e, r));
}
function Fn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t), (n = e.alternate), n !== null && (n.childLanes |= t), (n = e), (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var er = !1;
function Mf(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function ey(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function On(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function vr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), ve & 2)) {
    var s = r.pending;
    return (s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)), (r.pending = t), Fn(e, n));
  }
  return ((s = r.interleaved), s === null ? ((t.next = t), Af(r)) : ((t.next = s.next), (s.next = t)), (r.interleaved = t), Fn(e, n));
}
function Va(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), xf(e, n));
  }
}
function Dh(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var s = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        (o === null ? (s = o = i) : (o = o.next = i), (n = n.next));
      } while (n !== null);
      o === null ? (s = o = t) : (o = o.next = t);
    } else s = o = t;
    ((n = { baseState: r.baseState, firstBaseUpdate: s, lastBaseUpdate: o, shared: r.shared, effects: r.effects }), (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate), e === null ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t));
}
function ml(e, t, n, r) {
  var s = e.updateQueue;
  er = !1;
  var o = s.firstBaseUpdate,
    i = s.lastBaseUpdate,
    a = s.shared.pending;
  if (a !== null) {
    s.shared.pending = null;
    var c = a,
      u = c.next;
    ((c.next = null), i === null ? (o = u) : (i.next = u), (i = c));
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (a = f.lastBaseUpdate),
      a !== i && (a === null ? (f.firstBaseUpdate = u) : (a.next = u), (f.lastBaseUpdate = c)));
  }
  if (o !== null) {
    var p = s.baseState;
    ((i = 0), (f = u = c = null), (a = o));
    do {
      var h = a.lane,
        m = a.eventTime;
      if ((r & h) === h) {
        f !== null && (f = f.next = { eventTime: m, lane: 0, tag: a.tag, payload: a.payload, callback: a.callback, next: null });
        e: {
          var S = e,
            v = a;
          switch (((h = t), (m = n), v.tag)) {
            case 1:
              if (((S = v.payload), typeof S == 'function')) {
                p = S.call(m, p, h);
                break e;
              }
              p = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (((S = v.payload), (h = typeof S == 'function' ? S.call(m, p, h) : S), h == null)) break e;
              p = Me({}, p, h);
              break e;
            case 2:
              er = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && ((e.flags |= 64), (h = s.effects), h === null ? (s.effects = [a]) : h.push(a));
      } else
        ((m = { eventTime: m, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }),
          f === null ? ((u = f = m), (c = p)) : (f = f.next = m),
          (i |= h));
      if (((a = a.next), a === null)) {
        if (((a = s.shared.pending), a === null)) break;
        ((h = a), (a = h.next), (h.next = null), (s.lastBaseUpdate = h), (s.shared.pending = null));
      }
    } while (!0);
    if (
      (f === null && (c = p), (s.baseState = c), (s.firstBaseUpdate = u), (s.lastBaseUpdate = f), (t = s.shared.interleaved), t !== null)
    ) {
      s = t;
      do ((i |= s.lane), (s = s.next));
      while (s !== t);
    } else o === null && (s.shared.lanes = 0);
    ((as |= i), (e.lanes = i), (e.memoizedState = p));
  }
}
function Fh(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        s = r.callback;
      if (s !== null) {
        if (((r.callback = null), (r = n), typeof s != 'function')) throw Error(M(191, s));
        s.call(r);
      }
    }
}
var Ji = {},
  Sn = Ir(Ji),
  ji = Ir(Ji),
  Ti = Ir(Ji);
function Kr(e) {
  if (e === Ji) throw Error(M(174));
  return e;
}
function Of(e, t) {
  switch ((ke(Ti, t), ke(ji, e), ke(Sn, Ji), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Vu(null, '');
      break;
    default:
      ((e = e === 8 ? t.parentNode : t), (t = e.namespaceURI || null), (e = e.tagName), (t = Vu(t, e)));
  }
  (je(Sn), ke(Sn, t));
}
function go() {
  (je(Sn), je(ji), je(Ti));
}
function ty(e) {
  Kr(Ti.current);
  var t = Kr(Sn.current),
    n = Vu(t, e.type);
  t !== n && (ke(ji, e), ke(Sn, n));
}
function Lf(e) {
  ji.current === e && (je(Sn), je(ji));
}
var Ie = Ir(0);
function gl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var su = [];
function Df() {
  for (var e = 0; e < su.length; e++) su[e]._workInProgressVersionPrimary = null;
  su.length = 0;
}
var Ua = Un.ReactCurrentDispatcher,
  ou = Un.ReactCurrentBatchConfig,
  is = 0,
  Ae = null,
  Be = null,
  Ge = null,
  vl = !1,
  pi = !1,
  Ri = 0,
  qC = 0;
function tt() {
  throw Error(M(321));
}
function Ff(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!an(e[n], t[n])) return !1;
  return !0;
}
function $f(e, t, n, r, s, o) {
  if (
    ((is = o),
    (Ae = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ua.current = e === null || e.memoizedState === null ? eE : tE),
    (e = n(r, s)),
    pi)
  ) {
    o = 0;
    do {
      if (((pi = !1), (Ri = 0), 25 <= o)) throw Error(M(301));
      ((o += 1), (Ge = Be = null), (t.updateQueue = null), (Ua.current = nE), (e = n(r, s)));
    } while (pi);
  }
  if (((Ua.current = yl), (t = Be !== null && Be.next !== null), (is = 0), (Ge = Be = Ae = null), (vl = !1), t)) throw Error(M(300));
  return e;
}
function zf() {
  var e = Ri !== 0;
  return ((Ri = 0), e);
}
function pn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return (Ge === null ? (Ae.memoizedState = Ge = e) : (Ge = Ge.next = e), Ge);
}
function Wt() {
  if (Be === null) {
    var e = Ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Be.next;
  var t = Ge === null ? Ae.memoizedState : Ge.next;
  if (t !== null) ((Ge = t), (Be = e));
  else {
    if (e === null) throw Error(M(310));
    ((Be = e),
      (e = { memoizedState: Be.memoizedState, baseState: Be.baseState, baseQueue: Be.baseQueue, queue: Be.queue, next: null }),
      Ge === null ? (Ae.memoizedState = Ge = e) : (Ge = Ge.next = e));
  }
  return Ge;
}
function Ii(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function iu(e) {
  var t = Wt(),
    n = t.queue;
  if (n === null) throw Error(M(311));
  n.lastRenderedReducer = e;
  var r = Be,
    s = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (s !== null) {
      var i = s.next;
      ((s.next = o.next), (o.next = i));
    }
    ((r.baseQueue = s = o), (n.pending = null));
  }
  if (s !== null) {
    ((o = s.next), (r = r.baseState));
    var a = (i = null),
      c = null,
      u = o;
    do {
      var f = u.lane;
      if ((is & f) === f)
        (c !== null && (c = c.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
      else {
        var p = { lane: f, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null };
        (c === null ? ((a = c = p), (i = r)) : (c = c.next = p), (Ae.lanes |= f), (as |= f));
      }
      u = u.next;
    } while (u !== null && u !== o);
    (c === null ? (i = r) : (c.next = a),
      an(r, t.memoizedState) || (xt = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = c),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    s = e;
    do ((o = s.lane), (Ae.lanes |= o), (as |= o), (s = s.next));
    while (s !== e);
  } else s === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function au(e) {
  var t = Wt(),
    n = t.queue;
  if (n === null) throw Error(M(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    s = n.pending,
    o = t.memoizedState;
  if (s !== null) {
    n.pending = null;
    var i = (s = s.next);
    do ((o = e(o, i.action)), (i = i.next));
    while (i !== s);
    (an(o, t.memoizedState) || (xt = !0), (t.memoizedState = o), t.baseQueue === null && (t.baseState = o), (n.lastRenderedState = o));
  }
  return [o, r];
}
function ny() {}
function ry(e, t) {
  var n = Ae,
    r = Wt(),
    s = t(),
    o = !an(r.memoizedState, s);
  if (
    (o && ((r.memoizedState = s), (xt = !0)),
    (r = r.queue),
    Vf(iy.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (Ge !== null && Ge.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), Ai(9, oy.bind(null, n, r, s, t), void 0, null), Ze === null)) throw Error(M(349));
    is & 30 || sy(n, t, s);
  }
  return s;
}
function sy(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Ae.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function oy(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), ay(t) && ly(e));
}
function iy(e, t, n) {
  return n(function () {
    ay(t) && ly(e);
  });
}
function ay(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !an(e, n);
  } catch {
    return !0;
  }
}
function ly(e) {
  var t = Fn(e, 1);
  t !== null && on(t, e, 1, -1);
}
function $h(e) {
  var t = pn();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ii, lastRenderedState: e }),
    (t.queue = e),
    (e = e.dispatch = JC.bind(null, Ae, e)),
    [t.memoizedState, e]
  );
}
function Ai(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Ae.updateQueue = t), (t.lastEffect = e.next = e))
      : ((n = t.lastEffect), n === null ? (t.lastEffect = e.next = e) : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function cy() {
  return Wt().memoizedState;
}
function Ba(e, t, n, r) {
  var s = pn();
  ((Ae.flags |= e), (s.memoizedState = Ai(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Jl(e, t, n, r) {
  var s = Wt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Be !== null) {
    var i = Be.memoizedState;
    if (((o = i.destroy), r !== null && Ff(r, i.deps))) {
      s.memoizedState = Ai(t, n, o, r);
      return;
    }
  }
  ((Ae.flags |= e), (s.memoizedState = Ai(1 | t, n, o, r)));
}
function zh(e, t) {
  return Ba(8390656, 8, e, t);
}
function Vf(e, t) {
  return Jl(2048, 8, e, t);
}
function uy(e, t) {
  return Jl(4, 2, e, t);
}
function dy(e, t) {
  return Jl(4, 4, e, t);
}
function fy(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function py(e, t, n) {
  return ((n = n != null ? n.concat([e]) : null), Jl(4, 4, fy.bind(null, t, e), n));
}
function Uf() {}
function hy(e, t) {
  var n = Wt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ff(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function my(e, t) {
  var n = Wt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ff(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
}
function gy(e, t, n) {
  return is & 21
    ? (an(n, t) || ((n = Sv()), (Ae.lanes |= n), (as |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (xt = !0)), (e.memoizedState = n));
}
function YC(e, t) {
  var n = Ce;
  ((Ce = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = ou.transition;
  ou.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((Ce = n), (ou.transition = r));
  }
}
function vy() {
  return Wt().memoizedState;
}
function XC(e, t, n) {
  var r = xr(e);
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), yy(e))) xy(t, n);
  else if (((n = Jv(e, t, n, r)), n !== null)) {
    var s = ut();
    (on(n, e, r, s), wy(n, t, r));
  }
}
function JC(e, t, n) {
  var r = xr(e),
    s = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (yy(e)) xy(t, s);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && ((o = t.lastRenderedReducer), o !== null))
      try {
        var i = t.lastRenderedState,
          a = o(i, n);
        if (((s.hasEagerState = !0), (s.eagerState = a), an(a, i))) {
          var c = t.interleaved;
          (c === null ? ((s.next = s), Af(t)) : ((s.next = c.next), (c.next = s)), (t.interleaved = s));
          return;
        }
      } catch {
      } finally {
      }
    ((n = Jv(e, t, s, r)), n !== null && ((s = ut()), on(n, e, r, s), wy(n, t, r)));
  }
}
function yy(e) {
  var t = e.alternate;
  return e === Ae || (t !== null && t === Ae);
}
function xy(e, t) {
  pi = vl = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
}
function wy(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), xf(e, n));
  }
}
var yl = {
    readContext: Bt,
    useCallback: tt,
    useContext: tt,
    useEffect: tt,
    useImperativeHandle: tt,
    useInsertionEffect: tt,
    useLayoutEffect: tt,
    useMemo: tt,
    useReducer: tt,
    useRef: tt,
    useState: tt,
    useDebugValue: tt,
    useDeferredValue: tt,
    useTransition: tt,
    useMutableSource: tt,
    useSyncExternalStore: tt,
    useId: tt,
    unstable_isNewReconciler: !1,
  },
  eE = {
    readContext: Bt,
    useCallback: function (e, t) {
      return ((pn().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Bt,
    useEffect: zh,
    useImperativeHandle: function (e, t, n) {
      return ((n = n != null ? n.concat([e]) : null), Ba(4194308, 4, fy.bind(null, t, e), n));
    },
    useLayoutEffect: function (e, t) {
      return Ba(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ba(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = pn();
      return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e);
    },
    useReducer: function (e, t, n) {
      var r = pn();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }),
        (r.queue = e),
        (e = e.dispatch = XC.bind(null, Ae, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = pn();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: $h,
    useDebugValue: Uf,
    useDeferredValue: function (e) {
      return (pn().memoizedState = e);
    },
    useTransition: function () {
      var e = $h(!1),
        t = e[0];
      return ((e = YC.bind(null, e[1])), (pn().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Ae,
        s = pn();
      if (Re) {
        if (n === void 0) throw Error(M(407));
        n = n();
      } else {
        if (((n = t()), Ze === null)) throw Error(M(349));
        is & 30 || sy(r, t, n);
      }
      s.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return ((s.queue = o), zh(iy.bind(null, r, o, e), [e]), (r.flags |= 2048), Ai(9, oy.bind(null, r, o, n, t), void 0, null), n);
    },
    useId: function () {
      var e = pn(),
        t = Ze.identifierPrefix;
      if (Re) {
        var n = Mn,
          r = An;
        ((n = (r & ~(1 << (32 - sn(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = Ri++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':'));
      } else ((n = qC++), (t = ':' + t + 'r' + n.toString(32) + ':'));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  tE = {
    readContext: Bt,
    useCallback: hy,
    useContext: Bt,
    useEffect: Vf,
    useImperativeHandle: py,
    useInsertionEffect: uy,
    useLayoutEffect: dy,
    useMemo: my,
    useReducer: iu,
    useRef: cy,
    useState: function () {
      return iu(Ii);
    },
    useDebugValue: Uf,
    useDeferredValue: function (e) {
      var t = Wt();
      return gy(t, Be.memoizedState, e);
    },
    useTransition: function () {
      var e = iu(Ii)[0],
        t = Wt().memoizedState;
      return [e, t];
    },
    useMutableSource: ny,
    useSyncExternalStore: ry,
    useId: vy,
    unstable_isNewReconciler: !1,
  },
  nE = {
    readContext: Bt,
    useCallback: hy,
    useContext: Bt,
    useEffect: Vf,
    useImperativeHandle: py,
    useInsertionEffect: uy,
    useLayoutEffect: dy,
    useMemo: my,
    useReducer: au,
    useRef: cy,
    useState: function () {
      return au(Ii);
    },
    useDebugValue: Uf,
    useDeferredValue: function (e) {
      var t = Wt();
      return Be === null ? (t.memoizedState = e) : gy(t, Be.memoizedState, e);
    },
    useTransition: function () {
      var e = au(Ii)[0],
        t = Wt().memoizedState;
      return [e, t];
    },
    useMutableSource: ny,
    useSyncExternalStore: ry,
    useId: vy,
    unstable_isNewReconciler: !1,
  };
function Xt(e, t) {
  if (e && e.defaultProps) {
    ((t = Me({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ld(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Me({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var ec = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? vs(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ut(),
      s = xr(e),
      o = On(r, s);
    ((o.payload = t), n != null && (o.callback = n), (t = vr(e, o, s)), t !== null && (on(t, e, s, r), Va(t, e, s)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ut(),
      s = xr(e),
      o = On(r, s);
    ((o.tag = 1), (o.payload = t), n != null && (o.callback = n), (t = vr(e, o, s)), t !== null && (on(t, e, s, r), Va(t, e, s)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ut(),
      r = xr(e),
      s = On(n, r);
    ((s.tag = 2), t != null && (s.callback = t), (t = vr(e, s, r)), t !== null && (on(t, e, r, n), Va(t, e, r)));
  },
};
function Vh(e, t, n, r, s, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Ni(n, r) || !Ni(s, o)
        : !0
  );
}
function Sy(e, t, n) {
  var r = !1,
    s = Nr,
    o = t.contextType;
  return (
    typeof o == 'object' && o !== null
      ? (o = Bt(o))
      : ((s = St(t) ? ss : it.current), (r = t.contextTypes), (o = (r = r != null) ? po(e, s) : Nr)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = ec),
    (e.stateNode = t),
    (t._reactInternals = e),
    r && ((e = e.stateNode), (e.__reactInternalMemoizedUnmaskedChildContext = s), (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Uh(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && ec.enqueueReplaceState(t, t.state, null));
}
function cd(e, t, n, r) {
  var s = e.stateNode;
  ((s.props = n), (s.state = e.memoizedState), (s.refs = {}), Mf(e));
  var o = t.contextType;
  (typeof o == 'object' && o !== null ? (s.context = Bt(o)) : ((o = St(t) ? ss : it.current), (s.context = po(e, o))),
    (s.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == 'function' && (ld(e, t, o, n), (s.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof s.getSnapshotBeforeUpdate == 'function' ||
      (typeof s.UNSAFE_componentWillMount != 'function' && typeof s.componentWillMount != 'function') ||
      ((t = s.state),
      typeof s.componentWillMount == 'function' && s.componentWillMount(),
      typeof s.UNSAFE_componentWillMount == 'function' && s.UNSAFE_componentWillMount(),
      t !== s.state && ec.enqueueReplaceState(s, s.state, null),
      ml(e, n, s, r),
      (s.state = e.memoizedState)),
    typeof s.componentDidMount == 'function' && (e.flags |= 4194308));
}
function vo(e, t) {
  try {
    var n = '',
      r = t;
    do ((n += Tb(r)), (r = r.return));
    while (r);
    var s = n;
  } catch (o) {
    s =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: s, digest: null };
}
function lu(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ud(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var rE = typeof WeakMap == 'function' ? WeakMap : Map;
function by(e, t, n) {
  ((n = On(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (wl || ((wl = !0), (wd = r)), ud(e, t));
    }),
    n
  );
}
function Cy(e, t, n) {
  ((n = On(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == 'function') {
    var s = t.value;
    ((n.payload = function () {
      return r(s);
    }),
      (n.callback = function () {
        ud(e, t);
      }));
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == 'function' &&
      (n.callback = function () {
        (ud(e, t), typeof r != 'function' && (yr === null ? (yr = new Set([this])) : yr.add(this)));
        var i = t.stack;
        this.componentDidCatch(t.value, { componentStack: i !== null ? i : '' });
      }),
    n
  );
}
function Bh(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new rE();
    var s = new Set();
    r.set(t, s);
  } else ((s = r.get(t)), s === void 0 && ((s = new Set()), r.set(t, s)));
  s.has(n) || (s.add(n), (e = vE.bind(null, e, t, n)), t.then(e, e));
}
function Wh(e) {
  do {
    var t;
    if (((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)), t)) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Hh(e, t, n, r, s) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = s), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 && (n.alternate === null ? (n.tag = 17) : ((t = On(-1, 1)), (t.tag = 2), vr(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var sE = Un.ReactCurrentOwner,
  xt = !1;
function lt(e, t, n, r) {
  t.child = e === null ? Xv(t, null, n, r) : mo(t, e.child, n, r);
}
function Gh(e, t, n, r, s) {
  n = n.render;
  var o = t.ref;
  return (
    Ys(t, s),
    (r = $f(e, t, n, r, o, s)),
    (n = zf()),
    e !== null && !xt
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~s), $n(e, t, s))
      : (Re && n && _f(t), (t.flags |= 1), lt(e, t, r, s), t.child)
  );
}
function Kh(e, t, n, r, s) {
  if (e === null) {
    var o = n.type;
    return typeof o == 'function' && !qf(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Ey(e, t, o, r, s))
      : ((e = Ka(n.type, null, r, t, t.mode, s)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  if (((o = e.child), !(e.lanes & s))) {
    var i = o.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : Ni), n(i, r) && e.ref === t.ref)) return $n(e, t, s);
  }
  return ((t.flags |= 1), (e = wr(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
}
function Ey(e, t, n, r, s) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Ni(o, r) && e.ref === t.ref)
      if (((xt = !1), (t.pendingProps = r = o), (e.lanes & s) !== 0)) e.flags & 131072 && (xt = !0);
      else return ((t.lanes = e.lanes), $n(e, t, s));
  }
  return dd(e, t, n, r, s);
}
function Ny(e, t, n) {
  var r = t.pendingProps,
    s = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === 'hidden')
    if (!(t.mode & 1)) ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), ke(Gs, Ct), (Ct |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          ke(Gs, Ct),
          (Ct |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), (r = o !== null ? o.baseLanes : n), ke(Gs, Ct), (Ct |= r));
    }
  else (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n), ke(Gs, Ct), (Ct |= r));
  return (lt(e, t, s, n), t.child);
}
function ky(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
}
function dd(e, t, n, r, s) {
  var o = St(n) ? ss : it.current;
  return (
    (o = po(t, o)),
    Ys(t, s),
    (n = $f(e, t, n, r, o, s)),
    (r = zf()),
    e !== null && !xt
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~s), $n(e, t, s))
      : (Re && r && _f(t), (t.flags |= 1), lt(e, t, n, s), t.child)
  );
}
function Zh(e, t, n, r, s) {
  if (St(n)) {
    var o = !0;
    ul(t);
  } else o = !1;
  if ((Ys(t, s), t.stateNode === null)) (Wa(e, t), Sy(t, n, r), cd(t, n, r, s), (r = !0));
  else if (e === null) {
    var i = t.stateNode,
      a = t.memoizedProps;
    i.props = a;
    var c = i.context,
      u = n.contextType;
    typeof u == 'object' && u !== null ? (u = Bt(u)) : ((u = St(n) ? ss : it.current), (u = po(t, u)));
    var f = n.getDerivedStateFromProps,
      p = typeof f == 'function' || typeof i.getSnapshotBeforeUpdate == 'function';
    (p ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' && typeof i.componentWillReceiveProps != 'function') ||
      ((a !== r || c !== u) && Uh(t, i, r, u)),
      (er = !1));
    var h = t.memoizedState;
    ((i.state = h),
      ml(t, r, i, s),
      (c = t.memoizedState),
      a !== r || h !== c || wt.current || er
        ? (typeof f == 'function' && (ld(t, n, f, r), (c = t.memoizedState)),
          (a = er || Vh(t, n, a, r, h, c, u))
            ? (p ||
                (typeof i.UNSAFE_componentWillMount != 'function' && typeof i.componentWillMount != 'function') ||
                (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (t.memoizedProps = r), (t.memoizedState = c)),
          (i.props = r),
          (i.state = c),
          (i.context = u),
          (r = a))
        : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1)));
  } else {
    ((i = t.stateNode),
      ey(e, t),
      (a = t.memoizedProps),
      (u = t.type === t.elementType ? a : Xt(t.type, a)),
      (i.props = u),
      (p = t.pendingProps),
      (h = i.context),
      (c = n.contextType),
      typeof c == 'object' && c !== null ? (c = Bt(c)) : ((c = St(n) ? ss : it.current), (c = po(t, c))));
    var m = n.getDerivedStateFromProps;
    ((f = typeof m == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' && typeof i.componentWillReceiveProps != 'function') ||
      ((a !== p || h !== c) && Uh(t, i, r, c)),
      (er = !1),
      (h = t.memoizedState),
      (i.state = h),
      ml(t, r, i, s));
    var S = t.memoizedState;
    a !== p || h !== S || wt.current || er
      ? (typeof m == 'function' && (ld(t, n, m, r), (S = t.memoizedState)),
        (u = er || Vh(t, n, u, r, h, S, c) || !1)
          ? (f ||
              (typeof i.UNSAFE_componentWillUpdate != 'function' && typeof i.componentWillUpdate != 'function') ||
              (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(r, S, c),
              typeof i.UNSAFE_componentWillUpdate == 'function' && i.UNSAFE_componentWillUpdate(r, S, c)),
            typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != 'function' || (a === e.memoizedProps && h === e.memoizedState) || (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != 'function' || (a === e.memoizedProps && h === e.memoizedState) || (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = S)),
        (i.props = r),
        (i.state = S),
        (i.context = c),
        (r = u))
      : (typeof i.componentDidUpdate != 'function' || (a === e.memoizedProps && h === e.memoizedState) || (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != 'function' || (a === e.memoizedProps && h === e.memoizedState) || (t.flags |= 1024),
        (r = !1));
  }
  return fd(e, t, n, r, o, s);
}
function fd(e, t, n, r, s, o) {
  ky(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return (s && Ah(t, n, !1), $n(e, t, o));
  ((r = t.stateNode), (sE.current = t));
  var a = i && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i ? ((t.child = mo(t, e.child, null, o)), (t.child = mo(t, null, a, o))) : lt(e, t, a, o),
    (t.memoizedState = r.state),
    s && Ah(t, n, !0),
    t.child
  );
}
function _y(e) {
  var t = e.stateNode;
  (t.pendingContext ? Ih(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ih(e, t.context, !1), Of(e, t.containerInfo));
}
function Qh(e, t, n, r, s) {
  return (ho(), jf(s), (t.flags |= 256), lt(e, t, n, r), t.child);
}
var pd = { dehydrated: null, treeContext: null, retryLane: 0 };
function hd(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Py(e, t, n) {
  var r = t.pendingProps,
    s = Ie.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    a;
  if (
    ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0),
    a ? ((o = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (s |= 1),
    ke(Ie, s & 1),
    e === null)
  )
    return (
      id(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1 ? (e.data === '$!' ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1), null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: 'hidden', children: i }),
              !(r & 1) && o !== null ? ((o.childLanes = 0), (o.pendingProps = i)) : (o = rc(i, r, 0, null)),
              (e = rs(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = hd(n)),
              (t.memoizedState = pd),
              e)
            : Bf(t, i))
    );
  if (((s = e.memoizedState), s !== null && ((a = s.dehydrated), a !== null))) return oE(e, t, i, r, a, s, n);
  if (o) {
    ((o = r.fallback), (i = t.mode), (s = e.child), (a = s.sibling));
    var c = { mode: 'hidden', children: r.children };
    return (
      !(i & 1) && t.child !== s
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = c), (t.deletions = null))
        : ((r = wr(s, c)), (r.subtreeFlags = s.subtreeFlags & 14680064)),
      a !== null ? (o = wr(a, o)) : ((o = rs(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i = i === null ? hd(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = pd),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = wr(o, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null && ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Bf(e, t) {
  return ((t = rc({ mode: 'visible', children: t }, e.mode, 0, null)), (t.return = e), (e.child = t));
}
function Ca(e, t, n, r) {
  return (r !== null && jf(r), mo(t, e.child, null, n), (e = Bf(t, t.pendingProps.children)), (e.flags |= 2), (t.memoizedState = null), e);
}
function oE(e, t, n, r, s, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = lu(Error(M(422)))), Ca(e, t, i, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (s = t.mode),
          (r = rc({ mode: 'visible', children: r.children }, s, 0, null)),
          (o = rs(o, s, i, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && mo(t, e.child, null, i),
          (t.child.memoizedState = hd(i)),
          (t.memoizedState = pd),
          o);
  if (!(t.mode & 1)) return Ca(e, t, i, null);
  if (s.data === '$!') {
    if (((r = s.nextSibling && s.nextSibling.dataset), r)) var a = r.dgst;
    return ((r = a), (o = Error(M(419))), (r = lu(o, r, void 0)), Ca(e, t, i, r));
  }
  if (((a = (i & e.childLanes) !== 0), xt || a)) {
    if (((r = Ze), r !== null)) {
      switch (i & -i) {
        case 4:
          s = 2;
          break;
        case 16:
          s = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          s = 32;
          break;
        case 536870912:
          s = 268435456;
          break;
        default:
          s = 0;
      }
      ((s = s & (r.suspendedLanes | i) ? 0 : s), s !== 0 && s !== o.retryLane && ((o.retryLane = s), Fn(e, s), on(r, e, s, -1)));
    }
    return (Qf(), (r = lu(Error(M(421)))), Ca(e, t, i, r));
  }
  return s.data === '$?'
    ? ((t.flags |= 128), (t.child = e.child), (t = yE.bind(null, e)), (s._reactRetry = t), null)
    : ((e = o.treeContext),
      (kt = gr(s.nextSibling)),
      (_t = t),
      (Re = !0),
      (rn = null),
      e !== null && ((Ft[$t++] = An), (Ft[$t++] = Mn), (Ft[$t++] = os), (An = e.id), (Mn = e.overflow), (os = t)),
      (t = Bf(t, r.children)),
      (t.flags |= 4096),
      t);
}
function qh(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), ad(e.return, t, n));
}
function cu(e, t, n, r, s) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: s })
    : ((o.isBackwards = t), (o.rendering = null), (o.renderingStartTime = 0), (o.last = r), (o.tail = n), (o.tailMode = s));
}
function jy(e, t, n) {
  var r = t.pendingProps,
    s = r.revealOrder,
    o = r.tail;
  if ((lt(e, t, r.children, n), (r = Ie.current), r & 2)) ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && qh(e, n, t);
        else if (e.tag === 19) qh(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((ke(Ie, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (s) {
      case 'forwards':
        for (n = t.child, s = null; n !== null; ) ((e = n.alternate), e !== null && gl(e) === null && (s = n), (n = n.sibling));
        ((n = s), n === null ? ((s = t.child), (t.child = null)) : ((s = n.sibling), (n.sibling = null)), cu(t, !1, s, n, o));
        break;
      case 'backwards':
        for (n = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && gl(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = n), (n = s), (s = e));
        }
        cu(t, !0, n, null, o);
        break;
      case 'together':
        cu(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Wa(e, t) {
  !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function $n(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (as |= t.lanes), !(n & t.childLanes))) return null;
  if (e !== null && t.child !== e.child) throw Error(M(153));
  if (t.child !== null) {
    for (e = t.child, n = wr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      ((e = e.sibling), (n = n.sibling = wr(e, e.pendingProps)), (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function iE(e, t, n) {
  switch (t.tag) {
    case 3:
      (_y(t), ho());
      break;
    case 5:
      ty(t);
      break;
    case 1:
      St(t.type) && ul(t);
      break;
    case 4:
      Of(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        s = t.memoizedProps.value;
      (ke(pl, r._currentValue), (r._currentValue = s));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (ke(Ie, Ie.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Py(e, t, n)
            : (ke(Ie, Ie.current & 1), (e = $n(e, t, n)), e !== null ? e.sibling : null);
      ke(Ie, Ie.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return jy(e, t, n);
        t.flags |= 128;
      }
      if (((s = t.memoizedState), s !== null && ((s.rendering = null), (s.tail = null), (s.lastEffect = null)), ke(Ie, Ie.current), r))
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Ny(e, t, n));
  }
  return $n(e, t, n);
}
var Ty, md, Ry, Iy;
Ty = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
md = function () {};
Ry = function (e, t, n, r) {
  var s = e.memoizedProps;
  if (s !== r) {
    ((e = t.stateNode), Kr(Sn.current));
    var o = null;
    switch (n) {
      case 'input':
        ((s = Du(e, s)), (r = Du(e, r)), (o = []));
        break;
      case 'select':
        ((s = Me({}, s, { value: void 0 })), (r = Me({}, r, { value: void 0 })), (o = []));
        break;
      case 'textarea':
        ((s = zu(e, s)), (r = zu(e, r)), (o = []));
        break;
      default:
        typeof s.onClick != 'function' && typeof r.onClick == 'function' && (e.onclick = ll);
    }
    Uu(n, r);
    var i;
    n = null;
    for (u in s)
      if (!r.hasOwnProperty(u) && s.hasOwnProperty(u) && s[u] != null)
        if (u === 'style') {
          var a = s[u];
          for (i in a) a.hasOwnProperty(i) && (n || (n = {}), (n[i] = ''));
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (yi.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
    for (u in r) {
      var c = r[u];
      if (((a = s != null ? s[u] : void 0), r.hasOwnProperty(u) && c !== a && (c != null || a != null)))
        if (u === 'style')
          if (a) {
            for (i in a) !a.hasOwnProperty(i) || (c && c.hasOwnProperty(i)) || (n || (n = {}), (n[i] = ''));
            for (i in c) c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}), (n[i] = c[i]));
          } else (n || (o || (o = []), o.push(u, n)), (n = c));
        else
          u === 'dangerouslySetInnerHTML'
            ? ((c = c ? c.__html : void 0), (a = a ? a.__html : void 0), c != null && a !== c && (o = o || []).push(u, c))
            : u === 'children'
              ? (typeof c != 'string' && typeof c != 'number') || (o = o || []).push(u, '' + c)
              : u !== 'suppressContentEditableWarning' &&
                u !== 'suppressHydrationWarning' &&
                (yi.hasOwnProperty(u)
                  ? (c != null && u === 'onScroll' && Pe('scroll', e), o || a === c || (o = []))
                  : (o = o || []).push(u, c));
    }
    n && (o = o || []).push('style', n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Iy = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function qo(e, t) {
  if (!Re)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var n = null; t !== null; ) (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case 'collapsed':
        n = e.tail;
        for (var r = null; n !== null; ) (n.alternate !== null && (r = n), (n = n.sibling));
        r === null ? (t || e.tail === null ? (e.tail = null) : (e.tail.sibling = null)) : (r.sibling = null);
    }
}
function nt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var s = e.child; s !== null; )
      ((n |= s.lanes | s.childLanes), (r |= s.subtreeFlags & 14680064), (r |= s.flags & 14680064), (s.return = e), (s = s.sibling));
  else
    for (s = e.child; s !== null; ) ((n |= s.lanes | s.childLanes), (r |= s.subtreeFlags), (r |= s.flags), (s.return = e), (s = s.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function aE(e, t, n) {
  var r = t.pendingProps;
  switch ((Pf(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (nt(t), null);
    case 1:
      return (St(t.type) && cl(), nt(t), null);
    case 3:
      return (
        (r = t.stateNode),
        go(),
        je(wt),
        je(it),
        Df(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Sa(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), rn !== null && (Cd(rn), (rn = null)))),
        md(e, t),
        nt(t),
        null
      );
    case 5:
      Lf(t);
      var s = Kr(Ti.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (Ry(e, t, n, r, s), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(M(166));
          return (nt(t), null);
        }
        if (((e = Kr(Sn.current)), Sa(t))) {
          ((r = t.stateNode), (n = t.type));
          var o = t.memoizedProps;
          switch (((r[vn] = t), (r[Pi] = o), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              (Pe('cancel', r), Pe('close', r));
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              Pe('load', r);
              break;
            case 'video':
            case 'audio':
              for (s = 0; s < ri.length; s++) Pe(ri[s], r);
              break;
            case 'source':
              Pe('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              (Pe('error', r), Pe('load', r));
              break;
            case 'details':
              Pe('toggle', r);
              break;
            case 'input':
              (oh(r, o), Pe('invalid', r));
              break;
            case 'select':
              ((r._wrapperState = { wasMultiple: !!o.multiple }), Pe('invalid', r));
              break;
            case 'textarea':
              (ah(r, o), Pe('invalid', r));
          }
          (Uu(n, o), (s = null));
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var a = o[i];
              i === 'children'
                ? typeof a == 'string'
                  ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && wa(r.textContent, a, e), (s = ['children', a]))
                  : typeof a == 'number' &&
                    r.textContent !== '' + a &&
                    (o.suppressHydrationWarning !== !0 && wa(r.textContent, a, e), (s = ['children', '' + a]))
                : yi.hasOwnProperty(i) && a != null && i === 'onScroll' && Pe('scroll', r);
            }
          switch (n) {
            case 'input':
              (fa(r), ih(r, o, !0));
              break;
            case 'textarea':
              (fa(r), lh(r));
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof o.onClick == 'function' && (r.onclick = ll);
          }
          ((r = s), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((i = s.nodeType === 9 ? s : s.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = iv(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = i.createElement('div')), (e.innerHTML = '<script><\/script>'), (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = i.createElement(n, { is: r.is }))
                  : ((e = i.createElement(n)), n === 'select' && ((i = e), r.multiple ? (i.multiple = !0) : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[vn] = t),
            (e[Pi] = r),
            Ty(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((i = Bu(n, r)), n)) {
              case 'dialog':
                (Pe('cancel', e), Pe('close', e), (s = r));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                (Pe('load', e), (s = r));
                break;
              case 'video':
              case 'audio':
                for (s = 0; s < ri.length; s++) Pe(ri[s], e);
                s = r;
                break;
              case 'source':
                (Pe('error', e), (s = r));
                break;
              case 'img':
              case 'image':
              case 'link':
                (Pe('error', e), Pe('load', e), (s = r));
                break;
              case 'details':
                (Pe('toggle', e), (s = r));
                break;
              case 'input':
                (oh(e, r), (s = Du(e, r)), Pe('invalid', e));
                break;
              case 'option':
                s = r;
                break;
              case 'select':
                ((e._wrapperState = { wasMultiple: !!r.multiple }), (s = Me({}, r, { value: void 0 })), Pe('invalid', e));
                break;
              case 'textarea':
                (ah(e, r), (s = zu(e, r)), Pe('invalid', e));
                break;
              default:
                s = r;
            }
            (Uu(n, s), (a = s));
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var c = a[o];
                o === 'style'
                  ? cv(e, c)
                  : o === 'dangerouslySetInnerHTML'
                    ? ((c = c ? c.__html : void 0), c != null && av(e, c))
                    : o === 'children'
                      ? typeof c == 'string'
                        ? (n !== 'textarea' || c !== '') && xi(e, c)
                        : typeof c == 'number' && xi(e, '' + c)
                      : o !== 'suppressContentEditableWarning' &&
                        o !== 'suppressHydrationWarning' &&
                        o !== 'autoFocus' &&
                        (yi.hasOwnProperty(o) ? c != null && o === 'onScroll' && Pe('scroll', e) : c != null && pf(e, o, c, i));
              }
            switch (n) {
              case 'input':
                (fa(e), ih(e, r, !1));
                break;
              case 'textarea':
                (fa(e), lh(e));
                break;
              case 'option':
                r.value != null && e.setAttribute('value', '' + Er(r.value));
                break;
              case 'select':
                ((e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null ? Ks(e, !!r.multiple, o, !1) : r.defaultValue != null && Ks(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof s.onClick == 'function' && (e.onclick = ll);
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (nt(t), null);
    case 6:
      if (e && t.stateNode != null) Iy(e, t, e.memoizedProps, r);
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(M(166));
        if (((n = Kr(Ti.current)), Kr(Sn.current), Sa(t))) {
          if (((r = t.stateNode), (n = t.memoizedProps), (r[vn] = t), (o = r.nodeValue !== n) && ((e = _t), e !== null)))
            switch (e.tag) {
              case 3:
                wa(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && wa(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)), (r[vn] = t), (t.stateNode = r));
      }
      return (nt(t), null);
    case 13:
      if ((je(Ie), (r = t.memoizedState), e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))) {
        if (Re && kt !== null && t.mode & 1 && !(t.flags & 128)) (qv(), ho(), (t.flags |= 98560), (o = !1));
        else if (((o = Sa(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(M(318));
            if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o)) throw Error(M(317));
            o[vn] = t;
          } else (ho(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4));
          (nt(t), (o = !1));
        } else (rn !== null && (Cd(rn), (rn = null)), (o = !0));
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192), t.mode & 1 && (e === null || Ie.current & 1 ? He === 0 && (He = 3) : Qf())),
          t.updateQueue !== null && (t.flags |= 4),
          nt(t),
          null);
    case 4:
      return (go(), md(e, t), e === null && ki(t.stateNode.containerInfo), nt(t), null);
    case 10:
      return (If(t.type._context), nt(t), null);
    case 17:
      return (St(t.type) && cl(), nt(t), null);
    case 19:
      if ((je(Ie), (o = t.memoizedState), o === null)) return (nt(t), null);
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) qo(o, !1);
        else {
          if (He !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = gl(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    qo(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  ((o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling));
                return (ke(Ie, (Ie.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          o.tail !== null && $e() > yo && ((t.flags |= 128), (r = !0), qo(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = gl(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              qo(o, !0),
              o.tail === null && o.tailMode === 'hidden' && !i.alternate && !Re)
            )
              return (nt(t), null);
          } else 2 * $e() - o.renderingStartTime > yo && n !== 1073741824 && ((t.flags |= 128), (r = !0), qo(o, !1), (t.lanes = 4194304));
        o.isBackwards ? ((i.sibling = t.child), (t.child = i)) : ((n = o.last), n !== null ? (n.sibling = i) : (t.child = i), (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = $e()),
          (t.sibling = null),
          (n = Ie.current),
          ke(Ie, r ? (n & 1) | 2 : n & 1),
          t)
        : (nt(t), null);
    case 22:
    case 23:
      return (
        Zf(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1 ? Ct & 1073741824 && (nt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : nt(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(M(156, t.tag));
}
function lE(e, t) {
  switch ((Pf(t), t.tag)) {
    case 1:
      return (St(t.type) && cl(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
    case 3:
      return (go(), je(wt), je(it), Df(), (e = t.flags), e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null);
    case 5:
      return (Lf(t), null);
    case 13:
      if ((je(Ie), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(M(340));
        ho();
      }
      return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
    case 19:
      return (je(Ie), null);
    case 4:
      return (go(), null);
    case 10:
      return (If(t.type._context), null);
    case 22:
    case 23:
      return (Zf(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Ea = !1,
  st = !1,
  cE = typeof WeakSet == 'function' ? WeakSet : Set,
  K = null;
function Hs(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null);
      } catch (r) {
        De(e, t, r);
      }
    else n.current = null;
}
function gd(e, t, n) {
  try {
    n();
  } catch (r) {
    De(e, t, r);
  }
}
var Yh = !1;
function uE(e, t) {
  if (((Ju = ol), (e = Dv()), kf(e))) {
    if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var s = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, o.nodeType);
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            a = -1,
            c = -1,
            u = 0,
            f = 0,
            p = e,
            h = null;
          t: for (;;) {
            for (
              var m;
              p !== n || (s !== 0 && p.nodeType !== 3) || (a = i + s),
                p !== o || (r !== 0 && p.nodeType !== 3) || (c = i + r),
                p.nodeType === 3 && (i += p.nodeValue.length),
                (m = p.firstChild) !== null;

            )
              ((h = p), (p = m));
            for (;;) {
              if (p === e) break t;
              if ((h === n && ++u === s && (a = i), h === o && ++f === r && (c = i), (m = p.nextSibling) !== null)) break;
              ((p = h), (h = p.parentNode));
            }
            p = m;
          }
          n = a === -1 || c === -1 ? null : { start: a, end: c };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ed = { focusedElem: e, selectionRange: n }, ol = !1, K = t; K !== null; )
    if (((t = K), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)) ((e.return = t), (K = e));
    else
      for (; K !== null; ) {
        t = K;
        try {
          var S = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (S !== null) {
                  var v = S.memoizedProps,
                    w = S.memoizedState,
                    x = t.stateNode,
                    g = x.getSnapshotBeforeUpdate(t.elementType === t.type ? v : Xt(t.type, v), w);
                  x.__reactInternalSnapshotBeforeUpdate = g;
                }
                break;
              case 3:
                var y = t.stateNode.containerInfo;
                y.nodeType === 1 ? (y.textContent = '') : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(M(163));
            }
        } catch (b) {
          De(t, t.return, b);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (K = e));
          break;
        }
        K = t.return;
      }
  return ((S = Yh), (Yh = !1), S);
}
function hi(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var s = (r = r.next);
    do {
      if ((s.tag & e) === e) {
        var o = s.destroy;
        ((s.destroy = void 0), o !== void 0 && gd(t, n, o));
      }
      s = s.next;
    } while (s !== r);
  }
}
function tc(e, t) {
  if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function vd(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function Ay(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), Ay(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 && ((t = e.stateNode), t !== null && (delete t[vn], delete t[Pi], delete t[rd], delete t[GC], delete t[KC])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function My(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Xh(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || My(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function yd(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8 ? ((t = n.parentNode), t.insertBefore(e, n)) : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ll)));
  else if (r !== 4 && ((e = e.child), e !== null)) for (yd(e, t, n), e = e.sibling; e !== null; ) (yd(e, t, n), (e = e.sibling));
}
function xd(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null)) for (xd(e, t, n), e = e.sibling; e !== null; ) (xd(e, t, n), (e = e.sibling));
}
var Qe = null,
  nn = !1;
function Kn(e, t, n) {
  for (n = n.child; n !== null; ) (Oy(e, t, n), (n = n.sibling));
}
function Oy(e, t, n) {
  if (wn && typeof wn.onCommitFiberUnmount == 'function')
    try {
      wn.onCommitFiberUnmount(Kl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      st || Hs(n, t);
    case 6:
      var r = Qe,
        s = nn;
      ((Qe = null),
        Kn(e, t, n),
        (Qe = r),
        (nn = s),
        Qe !== null &&
          (nn
            ? ((e = Qe), (n = n.stateNode), e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Qe.removeChild(n.stateNode)));
      break;
    case 18:
      Qe !== null &&
        (nn
          ? ((e = Qe), (n = n.stateNode), e.nodeType === 8 ? nu(e.parentNode, n) : e.nodeType === 1 && nu(e, n), Ci(e))
          : nu(Qe, n.stateNode));
      break;
    case 4:
      ((r = Qe), (s = nn), (Qe = n.stateNode.containerInfo), (nn = !0), Kn(e, t, n), (Qe = r), (nn = s));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!st && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        s = r = r.next;
        do {
          var o = s,
            i = o.destroy;
          ((o = o.tag), i !== void 0 && (o & 2 || o & 4) && gd(n, t, i), (s = s.next));
        } while (s !== r);
      }
      Kn(e, t, n);
      break;
    case 1:
      if (!st && (Hs(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
        try {
          ((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount());
        } catch (a) {
          De(n, t, a);
        }
      Kn(e, t, n);
      break;
    case 21:
      Kn(e, t, n);
      break;
    case 22:
      n.mode & 1 ? ((st = (r = st) || n.memoizedState !== null), Kn(e, t, n), (st = r)) : Kn(e, t, n);
      break;
    default:
      Kn(e, t, n);
  }
}
function Jh(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new cE()),
      t.forEach(function (r) {
        var s = xE.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(s, s));
      }));
  }
}
function Qt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var s = n[r];
      try {
        var o = e,
          i = t,
          a = i;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              ((Qe = a.stateNode), (nn = !1));
              break e;
            case 3:
              ((Qe = a.stateNode.containerInfo), (nn = !0));
              break e;
            case 4:
              ((Qe = a.stateNode.containerInfo), (nn = !0));
              break e;
          }
          a = a.return;
        }
        if (Qe === null) throw Error(M(160));
        (Oy(o, i, s), (Qe = null), (nn = !1));
        var c = s.alternate;
        (c !== null && (c.return = null), (s.return = null));
      } catch (u) {
        De(s, t, u);
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) (Ly(t, e), (t = t.sibling));
}
function Ly(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Qt(t, e), fn(e), r & 4)) {
        try {
          (hi(3, e, e.return), tc(3, e));
        } catch (v) {
          De(e, e.return, v);
        }
        try {
          hi(5, e, e.return);
        } catch (v) {
          De(e, e.return, v);
        }
      }
      break;
    case 1:
      (Qt(t, e), fn(e), r & 512 && n !== null && Hs(n, n.return));
      break;
    case 5:
      if ((Qt(t, e), fn(e), r & 512 && n !== null && Hs(n, n.return), e.flags & 32)) {
        var s = e.stateNode;
        try {
          xi(s, '');
        } catch (v) {
          De(e, e.return, v);
        }
      }
      if (r & 4 && ((s = e.stateNode), s != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          a = e.type,
          c = e.updateQueue;
        if (((e.updateQueue = null), c !== null))
          try {
            (a === 'input' && o.type === 'radio' && o.name != null && sv(s, o), Bu(a, i));
            var u = Bu(a, o);
            for (i = 0; i < c.length; i += 2) {
              var f = c[i],
                p = c[i + 1];
              f === 'style' ? cv(s, p) : f === 'dangerouslySetInnerHTML' ? av(s, p) : f === 'children' ? xi(s, p) : pf(s, f, p, u);
            }
            switch (a) {
              case 'input':
                Fu(s, o);
                break;
              case 'textarea':
                ov(s, o);
                break;
              case 'select':
                var h = s._wrapperState.wasMultiple;
                s._wrapperState.wasMultiple = !!o.multiple;
                var m = o.value;
                m != null
                  ? Ks(s, !!o.multiple, m, !1)
                  : h !== !!o.multiple &&
                    (o.defaultValue != null ? Ks(s, !!o.multiple, o.defaultValue, !0) : Ks(s, !!o.multiple, o.multiple ? [] : '', !1));
            }
            s[Pi] = o;
          } catch (v) {
            De(e, e.return, v);
          }
      }
      break;
    case 6:
      if ((Qt(t, e), fn(e), r & 4)) {
        if (e.stateNode === null) throw Error(M(162));
        ((s = e.stateNode), (o = e.memoizedProps));
        try {
          s.nodeValue = o;
        } catch (v) {
          De(e, e.return, v);
        }
      }
      break;
    case 3:
      if ((Qt(t, e), fn(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          Ci(t.containerInfo);
        } catch (v) {
          De(e, e.return, v);
        }
      break;
    case 4:
      (Qt(t, e), fn(e));
      break;
    case 13:
      (Qt(t, e),
        fn(e),
        (s = e.child),
        s.flags & 8192 &&
          ((o = s.memoizedState !== null),
          (s.stateNode.isHidden = o),
          !o || (s.alternate !== null && s.alternate.memoizedState !== null) || (Gf = $e())),
        r & 4 && Jh(e));
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null), e.mode & 1 ? ((st = (u = st) || f), Qt(t, e), (st = u)) : Qt(t, e), fn(e), r & 8192)
      ) {
        if (((u = e.memoizedState !== null), (e.stateNode.isHidden = u) && !f && e.mode & 1))
          for (K = e, f = e.child; f !== null; ) {
            for (p = K = f; K !== null; ) {
              switch (((h = K), (m = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  hi(4, h, h.return);
                  break;
                case 1:
                  Hs(h, h.return);
                  var S = h.stateNode;
                  if (typeof S.componentWillUnmount == 'function') {
                    ((r = h), (n = h.return));
                    try {
                      ((t = r), (S.props = t.memoizedProps), (S.state = t.memoizedState), S.componentWillUnmount());
                    } catch (v) {
                      De(r, n, v);
                    }
                  }
                  break;
                case 5:
                  Hs(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    tm(p);
                    continue;
                  }
              }
              m !== null ? ((m.return = h), (K = m)) : tm(p);
            }
            f = f.sibling;
          }
        e: for (f = null, p = e; ; ) {
          if (p.tag === 5) {
            if (f === null) {
              f = p;
              try {
                ((s = p.stateNode),
                  u
                    ? ((o = s.style),
                      typeof o.setProperty == 'function' ? o.setProperty('display', 'none', 'important') : (o.display = 'none'))
                    : ((a = p.stateNode),
                      (c = p.memoizedProps.style),
                      (i = c != null && c.hasOwnProperty('display') ? c.display : null),
                      (a.style.display = lv('display', i))));
              } catch (v) {
                De(e, e.return, v);
              }
            }
          } else if (p.tag === 6) {
            if (f === null)
              try {
                p.stateNode.nodeValue = u ? '' : p.memoizedProps;
              } catch (v) {
                De(e, e.return, v);
              }
          } else if (((p.tag !== 22 && p.tag !== 23) || p.memoizedState === null || p === e) && p.child !== null) {
            ((p.child.return = p), (p = p.child));
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            (f === p && (f = null), (p = p.return));
          }
          (f === p && (f = null), (p.sibling.return = p.return), (p = p.sibling));
        }
      }
      break;
    case 19:
      (Qt(t, e), fn(e), r & 4 && Jh(e));
      break;
    case 21:
      break;
    default:
      (Qt(t, e), fn(e));
  }
}
function fn(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (My(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(M(160));
      }
      switch (r.tag) {
        case 5:
          var s = r.stateNode;
          r.flags & 32 && (xi(s, ''), (r.flags &= -33));
          var o = Xh(e);
          xd(e, o, s);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            a = Xh(e);
          yd(e, a, i);
          break;
        default:
          throw Error(M(161));
      }
    } catch (c) {
      De(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function dE(e, t, n) {
  ((K = e), Dy(e));
}
function Dy(e, t, n) {
  for (var r = (e.mode & 1) !== 0; K !== null; ) {
    var s = K,
      o = s.child;
    if (s.tag === 22 && r) {
      var i = s.memoizedState !== null || Ea;
      if (!i) {
        var a = s.alternate,
          c = (a !== null && a.memoizedState !== null) || st;
        a = Ea;
        var u = st;
        if (((Ea = i), (st = c) && !u))
          for (K = s; K !== null; )
            ((i = K), (c = i.child), i.tag === 22 && i.memoizedState !== null ? nm(s) : c !== null ? ((c.return = i), (K = c)) : nm(s));
        for (; o !== null; ) ((K = o), Dy(o), (o = o.sibling));
        ((K = s), (Ea = a), (st = u));
      }
      em(e);
    } else s.subtreeFlags & 8772 && o !== null ? ((o.return = s), (K = o)) : em(e);
  }
}
function em(e) {
  for (; K !== null; ) {
    var t = K;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              st || tc(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !st)
                if (n === null) r.componentDidMount();
                else {
                  var s = t.elementType === t.type ? n.memoizedProps : Xt(t.type, n.memoizedProps);
                  r.componentDidUpdate(s, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = t.updateQueue;
              o !== null && Fh(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Fh(t, i, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var c = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    c.autoFocus && n.focus();
                    break;
                  case 'img':
                    c.src && (n.src = c.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var f = u.memoizedState;
                  if (f !== null) {
                    var p = f.dehydrated;
                    p !== null && Ci(p);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(M(163));
          }
        st || (t.flags & 512 && vd(t));
      } catch (h) {
        De(t, t.return, h);
      }
    }
    if (t === e) {
      K = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (K = n));
      break;
    }
    K = t.return;
  }
}
function tm(e) {
  for (; K !== null; ) {
    var t = K;
    if (t === e) {
      K = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (K = n));
      break;
    }
    K = t.return;
  }
}
function nm(e) {
  for (; K !== null; ) {
    var t = K;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            tc(4, t);
          } catch (c) {
            De(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == 'function') {
            var s = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              De(t, s, c);
            }
          }
          var o = t.return;
          try {
            vd(t);
          } catch (c) {
            De(t, o, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            vd(t);
          } catch (c) {
            De(t, i, c);
          }
      }
    } catch (c) {
      De(t, t.return, c);
    }
    if (t === e) {
      K = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      ((a.return = t.return), (K = a));
      break;
    }
    K = t.return;
  }
}
var fE = Math.ceil,
  xl = Un.ReactCurrentDispatcher,
  Wf = Un.ReactCurrentOwner,
  Vt = Un.ReactCurrentBatchConfig,
  ve = 0,
  Ze = null,
  Ve = null,
  Ye = 0,
  Ct = 0,
  Gs = Ir(0),
  He = 0,
  Mi = null,
  as = 0,
  nc = 0,
  Hf = 0,
  mi = null,
  vt = null,
  Gf = 0,
  yo = 1 / 0,
  Tn = null,
  wl = !1,
  wd = null,
  yr = null,
  Na = !1,
  ur = null,
  Sl = 0,
  gi = 0,
  Sd = null,
  Ha = -1,
  Ga = 0;
function ut() {
  return ve & 6 ? $e() : Ha !== -1 ? Ha : (Ha = $e());
}
function xr(e) {
  return e.mode & 1
    ? ve & 2 && Ye !== 0
      ? Ye & -Ye
      : QC.transition !== null
        ? (Ga === 0 && (Ga = Sv()), Ga)
        : ((e = Ce), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Pv(e.type))), e)
    : 1;
}
function on(e, t, n, r) {
  if (50 < gi) throw ((gi = 0), (Sd = null), Error(M(185)));
  (qi(e, n, r),
    (!(ve & 2) || e !== Ze) &&
      (e === Ze && (!(ve & 2) && (nc |= n), He === 4 && rr(e, Ye)),
      bt(e, r),
      n === 1 && ve === 0 && !(t.mode & 1) && ((yo = $e() + 500), Xl && Ar())));
}
function bt(e, t) {
  var n = e.callbackNode;
  Qb(e, t);
  var r = sl(e, e === Ze ? Ye : 0);
  if (r === 0) (n !== null && dh(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && dh(n), t === 1))
      (e.tag === 0 ? ZC(rm.bind(null, e)) : Kv(rm.bind(null, e)),
        WC(function () {
          !(ve & 6) && Ar();
        }),
        (n = null));
    else {
      switch (bv(r)) {
        case 1:
          n = yf;
          break;
        case 4:
          n = xv;
          break;
        case 16:
          n = rl;
          break;
        case 536870912:
          n = wv;
          break;
        default:
          n = rl;
      }
      n = Hy(n, Fy.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Fy(e, t) {
  if (((Ha = -1), (Ga = 0), ve & 6)) throw Error(M(327));
  var n = e.callbackNode;
  if (Xs() && e.callbackNode !== n) return null;
  var r = sl(e, e === Ze ? Ye : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = bl(e, r);
  else {
    t = r;
    var s = ve;
    ve |= 2;
    var o = zy();
    (Ze !== e || Ye !== t) && ((Tn = null), (yo = $e() + 500), ns(e, t));
    do
      try {
        mE();
        break;
      } catch (a) {
        $y(e, a);
      }
    while (!0);
    (Rf(), (xl.current = o), (ve = s), Ve !== null ? (t = 0) : ((Ze = null), (Ye = 0), (t = He)));
  }
  if (t !== 0) {
    if ((t === 2 && ((s = Zu(e)), s !== 0 && ((r = s), (t = bd(e, s)))), t === 1)) throw ((n = Mi), ns(e, 0), rr(e, r), bt(e, $e()), n);
    if (t === 6) rr(e, r);
    else {
      if (
        ((s = e.current.alternate),
        !(r & 30) && !pE(s) && ((t = bl(e, r)), t === 2 && ((o = Zu(e)), o !== 0 && ((r = o), (t = bd(e, o)))), t === 1))
      )
        throw ((n = Mi), ns(e, 0), rr(e, r), bt(e, $e()), n);
      switch (((e.finishedWork = s), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(M(345));
        case 2:
          Wr(e, vt, Tn);
          break;
        case 3:
          if ((rr(e, r), (r & 130023424) === r && ((t = Gf + 500 - $e()), 10 < t))) {
            if (sl(e, 0) !== 0) break;
            if (((s = e.suspendedLanes), (s & r) !== r)) {
              (ut(), (e.pingedLanes |= e.suspendedLanes & s));
              break;
            }
            e.timeoutHandle = nd(Wr.bind(null, e, vt, Tn), t);
            break;
          }
          Wr(e, vt, Tn);
          break;
        case 4:
          if ((rr(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, s = -1; 0 < r; ) {
            var i = 31 - sn(r);
            ((o = 1 << i), (i = t[i]), i > s && (s = i), (r &= ~o));
          }
          if (
            ((r = s),
            (r = $e() - r),
            (r =
              (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * fE(r / 1960)) -
              r),
            10 < r)
          ) {
            e.timeoutHandle = nd(Wr.bind(null, e, vt, Tn), r);
            break;
          }
          Wr(e, vt, Tn);
          break;
        case 5:
          Wr(e, vt, Tn);
          break;
        default:
          throw Error(M(329));
      }
    }
  }
  return (bt(e, $e()), e.callbackNode === n ? Fy.bind(null, e) : null);
}
function bd(e, t) {
  var n = mi;
  return (
    e.current.memoizedState.isDehydrated && (ns(e, t).flags |= 256),
    (e = bl(e, t)),
    e !== 2 && ((t = vt), (vt = n), t !== null && Cd(t)),
    e
  );
}
function Cd(e) {
  vt === null ? (vt = e) : vt.push.apply(vt, e);
}
function pE(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var s = n[r],
            o = s.getSnapshot;
          s = s.value;
          try {
            if (!an(o(), s)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function rr(e, t) {
  for (t &= ~Hf, t &= ~nc, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - sn(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function rm(e) {
  if (ve & 6) throw Error(M(327));
  Xs();
  var t = sl(e, 0);
  if (!(t & 1)) return (bt(e, $e()), null);
  var n = bl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Zu(e);
    r !== 0 && ((t = r), (n = bd(e, r)));
  }
  if (n === 1) throw ((n = Mi), ns(e, 0), rr(e, t), bt(e, $e()), n);
  if (n === 6) throw Error(M(345));
  return ((e.finishedWork = e.current.alternate), (e.finishedLanes = t), Wr(e, vt, Tn), bt(e, $e()), null);
}
function Kf(e, t) {
  var n = ve;
  ve |= 1;
  try {
    return e(t);
  } finally {
    ((ve = n), ve === 0 && ((yo = $e() + 500), Xl && Ar()));
  }
}
function ls(e) {
  ur !== null && ur.tag === 0 && !(ve & 6) && Xs();
  var t = ve;
  ve |= 1;
  var n = Vt.transition,
    r = Ce;
  try {
    if (((Vt.transition = null), (Ce = 1), e)) return e();
  } finally {
    ((Ce = r), (Vt.transition = n), (ve = t), !(ve & 6) && Ar());
  }
}
function Zf() {
  ((Ct = Gs.current), je(Gs));
}
function ns(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), BC(n)), Ve !== null))
    for (n = Ve.return; n !== null; ) {
      var r = n;
      switch ((Pf(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && cl());
          break;
        case 3:
          (go(), je(wt), je(it), Df());
          break;
        case 5:
          Lf(r);
          break;
        case 4:
          go();
          break;
        case 13:
          je(Ie);
          break;
        case 19:
          je(Ie);
          break;
        case 10:
          If(r.type._context);
          break;
        case 22:
        case 23:
          Zf();
      }
      n = n.return;
    }
  if (((Ze = e), (Ve = e = wr(e.current, null)), (Ye = Ct = t), (He = 0), (Mi = null), (Hf = nc = as = 0), (vt = mi = null), Gr !== null)) {
    for (t = 0; t < Gr.length; t++)
      if (((n = Gr[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var s = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          ((o.next = s), (r.next = i));
        }
        n.pending = r;
      }
    Gr = null;
  }
  return e;
}
function $y(e, t) {
  do {
    var n = Ve;
    try {
      if ((Rf(), (Ua.current = yl), vl)) {
        for (var r = Ae.memoizedState; r !== null; ) {
          var s = r.queue;
          (s !== null && (s.pending = null), (r = r.next));
        }
        vl = !1;
      }
      if (((is = 0), (Ge = Be = Ae = null), (pi = !1), (Ri = 0), (Wf.current = null), n === null || n.return === null)) {
        ((He = 1), (Mi = t), (Ve = null));
        break;
      }
      e: {
        var o = e,
          i = n.return,
          a = n,
          c = t;
        if (((t = Ye), (a.flags |= 32768), c !== null && typeof c == 'object' && typeof c.then == 'function')) {
          var u = c,
            f = a,
            p = f.tag;
          if (!(f.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var h = f.alternate;
            h
              ? ((f.updateQueue = h.updateQueue), (f.memoizedState = h.memoizedState), (f.lanes = h.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var m = Wh(i);
          if (m !== null) {
            ((m.flags &= -257), Hh(m, i, a, o, t), m.mode & 1 && Bh(o, u, t), (t = m), (c = u));
            var S = t.updateQueue;
            if (S === null) {
              var v = new Set();
              (v.add(c), (t.updateQueue = v));
            } else S.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              (Bh(o, u, t), Qf());
              break e;
            }
            c = Error(M(426));
          }
        } else if (Re && a.mode & 1) {
          var w = Wh(i);
          if (w !== null) {
            (!(w.flags & 65536) && (w.flags |= 256), Hh(w, i, a, o, t), jf(vo(c, a)));
            break e;
          }
        }
        ((o = c = vo(c, a)), He !== 4 && (He = 2), mi === null ? (mi = [o]) : mi.push(o), (o = i));
        do {
          switch (o.tag) {
            case 3:
              ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
              var x = by(o, c, t);
              Dh(o, x);
              break e;
            case 1:
              a = c;
              var g = o.type,
                y = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof g.getDerivedStateFromError == 'function' ||
                  (y !== null && typeof y.componentDidCatch == 'function' && (yr === null || !yr.has(y))))
              ) {
                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                var b = Cy(o, a, t);
                Dh(o, b);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Uy(n);
    } catch (C) {
      ((t = C), Ve === n && n !== null && (Ve = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function zy() {
  var e = xl.current;
  return ((xl.current = yl), e === null ? yl : e);
}
function Qf() {
  ((He === 0 || He === 3 || He === 2) && (He = 4), Ze === null || (!(as & 268435455) && !(nc & 268435455)) || rr(Ze, Ye));
}
function bl(e, t) {
  var n = ve;
  ve |= 2;
  var r = zy();
  (Ze !== e || Ye !== t) && ((Tn = null), ns(e, t));
  do
    try {
      hE();
      break;
    } catch (s) {
      $y(e, s);
    }
  while (!0);
  if ((Rf(), (ve = n), (xl.current = r), Ve !== null)) throw Error(M(261));
  return ((Ze = null), (Ye = 0), He);
}
function hE() {
  for (; Ve !== null; ) Vy(Ve);
}
function mE() {
  for (; Ve !== null && !zb(); ) Vy(Ve);
}
function Vy(e) {
  var t = Wy(e.alternate, e, Ct);
  ((e.memoizedProps = e.pendingProps), t === null ? Uy(e) : (Ve = t), (Wf.current = null));
}
function Uy(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = lE(n, t)), n !== null)) {
        ((n.flags &= 32767), (Ve = n));
        return;
      }
      if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((He = 6), (Ve = null));
        return;
      }
    } else if (((n = aE(n, t, Ct)), n !== null)) {
      Ve = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Ve = t;
      return;
    }
    Ve = t = e;
  } while (t !== null);
  He === 0 && (He = 5);
}
function Wr(e, t, n) {
  var r = Ce,
    s = Vt.transition;
  try {
    ((Vt.transition = null), (Ce = 1), gE(e, t, n, r));
  } finally {
    ((Vt.transition = s), (Ce = r));
  }
  return null;
}
function gE(e, t, n, r) {
  do Xs();
  while (ur !== null);
  if (ve & 6) throw Error(M(327));
  n = e.finishedWork;
  var s = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(M(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var o = n.lanes | n.childLanes;
  if (
    (qb(e, o),
    e === Ze && ((Ve = Ze = null), (Ye = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Na ||
      ((Na = !0),
      Hy(rl, function () {
        return (Xs(), null);
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    ((o = Vt.transition), (Vt.transition = null));
    var i = Ce;
    Ce = 1;
    var a = ve;
    ((ve |= 4),
      (Wf.current = null),
      uE(e, n),
      Ly(n, e),
      LC(ed),
      (ol = !!Ju),
      (ed = Ju = null),
      (e.current = n),
      dE(n),
      Vb(),
      (ve = a),
      (Ce = i),
      (Vt.transition = o));
  } else e.current = n;
  if ((Na && ((Na = !1), (ur = e), (Sl = s)), (o = e.pendingLanes), o === 0 && (yr = null), Wb(n.stateNode), bt(e, $e()), t !== null))
    for (r = e.onRecoverableError, n = 0; n < t.length; n++) ((s = t[n]), r(s.value, { componentStack: s.stack, digest: s.digest }));
  if (wl) throw ((wl = !1), (e = wd), (wd = null), e);
  return (Sl & 1 && e.tag !== 0 && Xs(), (o = e.pendingLanes), o & 1 ? (e === Sd ? gi++ : ((gi = 0), (Sd = e))) : (gi = 0), Ar(), null);
}
function Xs() {
  if (ur !== null) {
    var e = bv(Sl),
      t = Vt.transition,
      n = Ce;
    try {
      if (((Vt.transition = null), (Ce = 16 > e ? 16 : e), ur === null)) var r = !1;
      else {
        if (((e = ur), (ur = null), (Sl = 0), ve & 6)) throw Error(M(331));
        var s = ve;
        for (ve |= 4, K = e.current; K !== null; ) {
          var o = K,
            i = o.child;
          if (K.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var u = a[c];
                for (K = u; K !== null; ) {
                  var f = K;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      hi(8, f, o);
                  }
                  var p = f.child;
                  if (p !== null) ((p.return = f), (K = p));
                  else
                    for (; K !== null; ) {
                      f = K;
                      var h = f.sibling,
                        m = f.return;
                      if ((Ay(f), f === u)) {
                        K = null;
                        break;
                      }
                      if (h !== null) {
                        ((h.return = m), (K = h));
                        break;
                      }
                      K = m;
                    }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var v = S.child;
                if (v !== null) {
                  S.child = null;
                  do {
                    var w = v.sibling;
                    ((v.sibling = null), (v = w));
                  } while (v !== null);
                }
              }
              K = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) ((i.return = o), (K = i));
          else
            e: for (; K !== null; ) {
              if (((o = K), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    hi(9, o, o.return);
                }
              var x = o.sibling;
              if (x !== null) {
                ((x.return = o.return), (K = x));
                break e;
              }
              K = o.return;
            }
        }
        var g = e.current;
        for (K = g; K !== null; ) {
          i = K;
          var y = i.child;
          if (i.subtreeFlags & 2064 && y !== null) ((y.return = i), (K = y));
          else
            e: for (i = g; K !== null; ) {
              if (((a = K), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      tc(9, a);
                  }
                } catch (C) {
                  De(a, a.return, C);
                }
              if (a === i) {
                K = null;
                break e;
              }
              var b = a.sibling;
              if (b !== null) {
                ((b.return = a.return), (K = b));
                break e;
              }
              K = a.return;
            }
        }
        if (((ve = s), Ar(), wn && typeof wn.onPostCommitFiberRoot == 'function'))
          try {
            wn.onPostCommitFiberRoot(Kl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((Ce = n), (Vt.transition = t));
    }
  }
  return !1;
}
function sm(e, t, n) {
  ((t = vo(n, t)), (t = by(e, t, 1)), (e = vr(e, t, 1)), (t = ut()), e !== null && (qi(e, 1, t), bt(e, t)));
}
function De(e, t, n) {
  if (e.tag === 3) sm(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        sm(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' && (yr === null || !yr.has(r)))
        ) {
          ((e = vo(n, e)), (e = Cy(t, e, 1)), (t = vr(t, e, 1)), (e = ut()), t !== null && (qi(t, 1, e), bt(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function vE(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = ut()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Ze === e && (Ye & n) === n && (He === 4 || (He === 3 && (Ye & 130023424) === Ye && 500 > $e() - Gf) ? ns(e, 0) : (Hf |= n)),
    bt(e, t));
}
function By(e, t) {
  t === 0 && (e.mode & 1 ? ((t = ma), (ma <<= 1), !(ma & 130023424) && (ma = 4194304)) : (t = 1));
  var n = ut();
  ((e = Fn(e, t)), e !== null && (qi(e, t, n), bt(e, n)));
}
function yE(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), By(e, n));
}
function xE(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        s = e.memoizedState;
      s !== null && (n = s.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(M(314));
  }
  (r !== null && r.delete(t), By(e, n));
}
var Wy;
Wy = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || wt.current) xt = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((xt = !1), iE(e, t, n));
      xt = !!(e.flags & 131072);
    }
  else ((xt = !1), Re && t.flags & 1048576 && Zv(t, fl, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Wa(e, t), (e = t.pendingProps));
      var s = po(t, it.current);
      (Ys(t, n), (s = $f(null, t, r, e, s, n)));
      var o = zf();
      return (
        (t.flags |= 1),
        typeof s == 'object' && s !== null && typeof s.render == 'function' && s.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            St(r) ? ((o = !0), ul(t)) : (o = !1),
            (t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null),
            Mf(t),
            (s.updater = ec),
            (t.stateNode = s),
            (s._reactInternals = t),
            cd(t, r, e, n),
            (t = fd(null, t, r, !0, o, n)))
          : ((t.tag = 0), Re && o && _f(t), lt(null, t, s, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Wa(e, t), (e = t.pendingProps), (s = r._init), (r = s(r._payload)), (t.type = r), (s = t.tag = SE(r)), (e = Xt(r, e)), s)
        ) {
          case 0:
            t = dd(null, t, r, e, n);
            break e;
          case 1:
            t = Zh(null, t, r, e, n);
            break e;
          case 11:
            t = Gh(null, t, r, e, n);
            break e;
          case 14:
            t = Kh(null, t, r, Xt(r.type, e), n);
            break e;
        }
        throw Error(M(306, r, ''));
      }
      return t;
    case 0:
      return ((r = t.type), (s = t.pendingProps), (s = t.elementType === r ? s : Xt(r, s)), dd(e, t, r, s, n));
    case 1:
      return ((r = t.type), (s = t.pendingProps), (s = t.elementType === r ? s : Xt(r, s)), Zh(e, t, r, s, n));
    case 3:
      e: {
        if ((_y(t), e === null)) throw Error(M(387));
        ((r = t.pendingProps), (o = t.memoizedState), (s = o.element), ey(e, t), ml(t, r, null, n));
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            ((s = vo(Error(M(423)), t)), (t = Qh(e, t, r, n, s)));
            break e;
          } else if (r !== s) {
            ((s = vo(Error(M(424)), t)), (t = Qh(e, t, r, n, s)));
            break e;
          } else
            for (kt = gr(t.stateNode.containerInfo.firstChild), _t = t, Re = !0, rn = null, n = Xv(t, null, r, n), t.child = n; n; )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((ho(), r === s)) {
            t = $n(e, t, n);
            break e;
          }
          lt(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        ty(t),
        e === null && id(t),
        (r = t.type),
        (s = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = s.children),
        td(r, s) ? (i = null) : o !== null && td(r, o) && (t.flags |= 32),
        ky(e, t),
        lt(e, t, i, n),
        t.child
      );
    case 6:
      return (e === null && id(t), null);
    case 13:
      return Py(e, t, n);
    case 4:
      return (Of(t, t.stateNode.containerInfo), (r = t.pendingProps), e === null ? (t.child = mo(t, null, r, n)) : lt(e, t, r, n), t.child);
    case 11:
      return ((r = t.type), (s = t.pendingProps), (s = t.elementType === r ? s : Xt(r, s)), Gh(e, t, r, s, n));
    case 7:
      return (lt(e, t, t.pendingProps, n), t.child);
    case 8:
      return (lt(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (lt(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (s = t.pendingProps),
          (o = t.memoizedProps),
          (i = s.value),
          ke(pl, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (an(o.value, i)) {
            if (o.children === s.children && !wt.current) {
              t = $n(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var a = o.dependencies;
              if (a !== null) {
                i = o.child;
                for (var c = a.firstContext; c !== null; ) {
                  if (c.context === r) {
                    if (o.tag === 1) {
                      ((c = On(-1, n & -n)), (c.tag = 2));
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var f = u.pending;
                        (f === null ? (c.next = c) : ((c.next = f.next), (f.next = c)), (u.pending = c));
                      }
                    }
                    ((o.lanes |= n), (c = o.alternate), c !== null && (c.lanes |= n), ad(o.return, n, t), (a.lanes |= n));
                    break;
                  }
                  c = c.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(M(341));
                ((i.lanes |= n), (a = i.alternate), a !== null && (a.lanes |= n), ad(i, n, t), (i = o.sibling));
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    ((o.return = i.return), (i = o));
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        (lt(e, t, s.children, n), (t = t.child));
      }
      return t;
    case 9:
      return ((s = t.type), (r = t.pendingProps.children), Ys(t, n), (s = Bt(s)), (r = r(s)), (t.flags |= 1), lt(e, t, r, n), t.child);
    case 14:
      return ((r = t.type), (s = Xt(r, t.pendingProps)), (s = Xt(r.type, s)), Kh(e, t, r, s, n));
    case 15:
      return Ey(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (s = t.pendingProps),
        (s = t.elementType === r ? s : Xt(r, s)),
        Wa(e, t),
        (t.tag = 1),
        St(r) ? ((e = !0), ul(t)) : (e = !1),
        Ys(t, n),
        Sy(t, r, s),
        cd(t, r, s, n),
        fd(null, t, r, !0, e, n)
      );
    case 19:
      return jy(e, t, n);
    case 22:
      return Ny(e, t, n);
  }
  throw Error(M(156, t.tag));
};
function Hy(e, t) {
  return yv(e, t);
}
function wE(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function zt(e, t, n, r) {
  return new wE(e, t, n, r);
}
function qf(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function SE(e) {
  if (typeof e == 'function') return qf(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === mf)) return 11;
    if (e === gf) return 14;
  }
  return 2;
}
function wr(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = zt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t), (n.type = e.type), (n.flags = 0), (n.subtreeFlags = 0), (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Ka(e, t, n, r, s, o) {
  var i = 2;
  if (((r = e), typeof e == 'function')) qf(e) && (i = 1);
  else if (typeof e == 'string') i = 5;
  else
    e: switch (e) {
      case Ls:
        return rs(n.children, s, o, t);
      case hf:
        ((i = 8), (s |= 8));
        break;
      case Au:
        return ((e = zt(12, n, t, s | 2)), (e.elementType = Au), (e.lanes = o), e);
      case Mu:
        return ((e = zt(13, n, t, s)), (e.elementType = Mu), (e.lanes = o), e);
      case Ou:
        return ((e = zt(19, n, t, s)), (e.elementType = Ou), (e.lanes = o), e);
      case tv:
        return rc(n, s, o, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case Jg:
              i = 10;
              break e;
            case ev:
              i = 9;
              break e;
            case mf:
              i = 11;
              break e;
            case gf:
              i = 14;
              break e;
            case Jn:
              ((i = 16), (r = null));
              break e;
          }
        throw Error(M(130, e == null ? e : typeof e, ''));
    }
  return ((t = zt(i, n, t, s)), (t.elementType = e), (t.type = r), (t.lanes = o), t);
}
function rs(e, t, n, r) {
  return ((e = zt(7, e, r, t)), (e.lanes = n), e);
}
function rc(e, t, n, r) {
  return ((e = zt(22, e, r, t)), (e.elementType = tv), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e);
}
function uu(e, t, n) {
  return ((e = zt(6, e, null, t)), (e.lanes = n), e);
}
function du(e, t, n) {
  return (
    (t = zt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }),
    t
  );
}
function bE(e, t, n, r, s) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Hc(0)),
    (this.expirationTimes = Hc(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Hc(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = s),
    (this.mutableSourceEagerHydrationData = null));
}
function Yf(e, t, n, r, s, o, i, a, c) {
  return (
    (e = new bE(e, t, n, a, c)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = zt(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }),
    Mf(o),
    e
  );
}
function CE(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Os, key: r == null ? null : '' + r, children: e, containerInfo: t, implementation: n };
}
function Gy(e) {
  if (!e) return Nr;
  e = e._reactInternals;
  e: {
    if (vs(e) !== e || e.tag !== 1) throw Error(M(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (St(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(M(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (St(n)) return Gv(e, n, t);
  }
  return t;
}
function Ky(e, t, n, r, s, o, i, a, c) {
  return (
    (e = Yf(n, r, !0, e, s, o, i, a, c)),
    (e.context = Gy(null)),
    (n = e.current),
    (r = ut()),
    (s = xr(n)),
    (o = On(r, s)),
    (o.callback = t ?? null),
    vr(n, o, s),
    (e.current.lanes = s),
    qi(e, s, r),
    bt(e, r),
    e
  );
}
function sc(e, t, n, r) {
  var s = t.current,
    o = ut(),
    i = xr(s);
  return (
    (n = Gy(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = On(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = vr(s, t, i)),
    e !== null && (on(e, s, i, o), Va(e, s, i)),
    i
  );
}
function Cl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function om(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Xf(e, t) {
  (om(e, t), (e = e.alternate) && om(e, t));
}
function EE() {
  return null;
}
var Zy =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function Jf(e) {
  this._internalRoot = e;
}
oc.prototype.render = Jf.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(M(409));
  sc(e, t, null, null);
};
oc.prototype.unmount = Jf.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (ls(function () {
      sc(null, e, null, null);
    }),
      (t[Dn] = null));
  }
};
function oc(e) {
  this._internalRoot = e;
}
oc.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Nv();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < nr.length && t !== 0 && t < nr[n].priority; n++);
    (nr.splice(n, 0, e), n === 0 && _v(e));
  }
};
function ep(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ic(e) {
  return !(
    !e ||
    (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function im() {}
function NE(e, t, n, r, s) {
  if (s) {
    if (typeof r == 'function') {
      var o = r;
      r = function () {
        var u = Cl(i);
        o.call(u);
      };
    }
    var i = Ky(t, r, e, 0, null, !1, !1, '', im);
    return ((e._reactRootContainer = i), (e[Dn] = i.current), ki(e.nodeType === 8 ? e.parentNode : e), ls(), i);
  }
  for (; (s = e.lastChild); ) e.removeChild(s);
  if (typeof r == 'function') {
    var a = r;
    r = function () {
      var u = Cl(c);
      a.call(u);
    };
  }
  var c = Yf(e, 0, !1, null, null, !1, !1, '', im);
  return (
    (e._reactRootContainer = c),
    (e[Dn] = c.current),
    ki(e.nodeType === 8 ? e.parentNode : e),
    ls(function () {
      sc(t, c, n, r);
    }),
    c
  );
}
function ac(e, t, n, r, s) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof s == 'function') {
      var a = s;
      s = function () {
        var c = Cl(i);
        a.call(c);
      };
    }
    sc(t, i, e, s);
  } else i = NE(n, t, e, s, r);
  return Cl(i);
}
Cv = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ni(t.pendingLanes);
        n !== 0 && (xf(t, n | 1), bt(t, $e()), !(ve & 6) && ((yo = $e() + 500), Ar()));
      }
      break;
    case 13:
      (ls(function () {
        var r = Fn(e, 1);
        if (r !== null) {
          var s = ut();
          on(r, e, 1, s);
        }
      }),
        Xf(e, 1));
  }
};
wf = function (e) {
  if (e.tag === 13) {
    var t = Fn(e, 134217728);
    if (t !== null) {
      var n = ut();
      on(t, e, 134217728, n);
    }
    Xf(e, 134217728);
  }
};
Ev = function (e) {
  if (e.tag === 13) {
    var t = xr(e),
      n = Fn(e, t);
    if (n !== null) {
      var r = ut();
      on(n, e, t, r);
    }
    Xf(e, t);
  }
};
Nv = function () {
  return Ce;
};
kv = function (e, t) {
  var n = Ce;
  try {
    return ((Ce = e), t());
  } finally {
    Ce = n;
  }
};
Hu = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((Fu(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var s = Yl(r);
            if (!s) throw Error(M(90));
            (rv(r), Fu(r, s));
          }
        }
      }
      break;
    case 'textarea':
      ov(e, n);
      break;
    case 'select':
      ((t = n.value), t != null && Ks(e, !!n.multiple, t, !1));
  }
};
fv = Kf;
pv = ls;
var kE = { usingClientEntryPoint: !1, Events: [Xi, zs, Yl, uv, dv, Kf] },
  Yo = { findFiberByHostInstance: Hr, bundleType: 0, version: '18.3.1', rendererPackageName: 'react-dom' },
  _E = {
    bundleType: Yo.bundleType,
    version: Yo.version,
    rendererPackageName: Yo.rendererPackageName,
    rendererConfig: Yo.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Un.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = gv(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Yo.findFiberByHostInstance || EE,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var ka = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ka.isDisabled && ka.supportsFiber)
    try {
      ((Kl = ka.inject(_E)), (wn = ka));
    } catch {}
}
Rt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = kE;
Rt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ep(t)) throw Error(M(200));
  return CE(e, t, null, n);
};
Rt.createRoot = function (e, t) {
  if (!ep(e)) throw Error(M(299));
  var n = !1,
    r = '',
    s = Zy;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (s = t.onRecoverableError)),
    (t = Yf(e, 1, !1, null, null, n, !1, r, s)),
    (e[Dn] = t.current),
    ki(e.nodeType === 8 ? e.parentNode : e),
    new Jf(t)
  );
};
Rt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0) throw typeof e.render == 'function' ? Error(M(188)) : ((e = Object.keys(e).join(',')), Error(M(268, e)));
  return ((e = gv(t)), (e = e === null ? null : e.stateNode), e);
};
Rt.flushSync = function (e) {
  return ls(e);
};
Rt.hydrate = function (e, t, n) {
  if (!ic(t)) throw Error(M(200));
  return ac(null, e, t, !0, n);
};
Rt.hydrateRoot = function (e, t, n) {
  if (!ep(e)) throw Error(M(405));
  var r = (n != null && n.hydratedSources) || null,
    s = !1,
    o = '',
    i = Zy;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (s = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Ky(t, null, e, 1, n ?? null, s, !1, o, i)),
    (e[Dn] = t.current),
    ki(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (s = n._getVersion),
        (s = s(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, s])
          : t.mutableSourceEagerHydrationData.push(n, s));
  return new oc(t);
};
Rt.render = function (e, t, n) {
  if (!ic(t)) throw Error(M(200));
  return ac(null, e, t, !1, n);
};
Rt.unmountComponentAtNode = function (e) {
  if (!ic(e)) throw Error(M(40));
  return e._reactRootContainer
    ? (ls(function () {
        ac(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[Dn] = null));
        });
      }),
      !0)
    : !1;
};
Rt.unstable_batchedUpdates = Kf;
Rt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ic(n)) throw Error(M(200));
  if (e == null || e._reactInternals === void 0) throw Error(M(38));
  return ac(e, t, n, !1, r);
};
Rt.version = '18.3.1-next-f1338f8080-20240426';
function Qy() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Qy);
    } catch (e) {
      console.error(e);
    }
}
(Qy(), (Qg.exports = Rt));
var ys = Qg.exports;
const qy = Dg(ys);
var Yy,
  am = ys;
((Yy = am.createRoot), am.hydrateRoot);
const PE = 1,
  jE = 1e6;
let fu = 0;
function TE() {
  return ((fu = (fu + 1) % Number.MAX_SAFE_INTEGER), fu.toString());
}
const pu = new Map(),
  lm = e => {
    if (pu.has(e)) return;
    const t = setTimeout(() => {
      (pu.delete(e), vi({ type: 'REMOVE_TOAST', toastId: e }));
    }, jE);
    pu.set(e, t);
  },
  RE = (e, t) => {
    switch (t.type) {
      case 'ADD_TOAST':
        return { ...e, toasts: [t.toast, ...e.toasts].slice(0, PE) };
      case 'UPDATE_TOAST':
        return { ...e, toasts: e.toasts.map(n => (n.id === t.toast.id ? { ...n, ...t.toast } : n)) };
      case 'DISMISS_TOAST': {
        const { toastId: n } = t;
        return (
          n
            ? lm(n)
            : e.toasts.forEach(r => {
                lm(r.id);
              }),
          { ...e, toasts: e.toasts.map(r => (r.id === n || n === void 0 ? { ...r, open: !1 } : r)) }
        );
      }
      case 'REMOVE_TOAST':
        return t.toastId === void 0 ? { ...e, toasts: [] } : { ...e, toasts: e.toasts.filter(n => n.id !== t.toastId) };
    }
  },
  Za = [];
let Qa = { toasts: [] };
function vi(e) {
  ((Qa = RE(Qa, e)),
    Za.forEach(t => {
      t(Qa);
    }));
}
function IE({ ...e }) {
  const t = TE(),
    n = s => vi({ type: 'UPDATE_TOAST', toast: { ...s, id: t } }),
    r = () => vi({ type: 'DISMISS_TOAST', toastId: t });
  return (
    vi({
      type: 'ADD_TOAST',
      toast: {
        ...e,
        id: t,
        open: !0,
        onOpenChange: s => {
          s || r();
        },
      },
    }),
    { id: t, dismiss: r, update: n }
  );
}
function AE() {
  const [e, t] = d.useState(Qa);
  return (
    d.useEffect(
      () => (
        Za.push(t),
        () => {
          const n = Za.indexOf(t);
          n > -1 && Za.splice(n, 1);
        }
      ),
      [e]
    ),
    { ...e, toast: IE, dismiss: n => vi({ type: 'DISMISS_TOAST', toastId: n }) }
  );
}
function U(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (s) {
    if ((e == null || e(s), n === !1 || !s.defaultPrevented)) return t == null ? void 0 : t(s);
  };
}
function cm(e, t) {
  if (typeof e == 'function') return e(t);
  e != null && (e.current = t);
}
function lc(...e) {
  return t => {
    let n = !1;
    const r = e.map(s => {
      const o = cm(s, t);
      return (!n && typeof o == 'function' && (n = !0), o);
    });
    if (n)
      return () => {
        for (let s = 0; s < r.length; s++) {
          const o = r[s];
          typeof o == 'function' ? o() : cm(e[s], null);
        }
      };
  };
}
function ye(...e) {
  return d.useCallback(lc(...e), e);
}
function ME(e, t) {
  const n = d.createContext(t),
    r = o => {
      const { children: i, ...a } = o,
        c = d.useMemo(() => a, Object.values(a));
      return l.jsx(n.Provider, { value: c, children: i });
    };
  r.displayName = e + 'Provider';
  function s(o) {
    const i = d.useContext(n);
    if (i) return i;
    if (t !== void 0) return t;
    throw new Error(`\`${o}\` must be used within \`${e}\``);
  }
  return [r, s];
}
function At(e, t = []) {
  let n = [];
  function r(o, i) {
    const a = d.createContext(i),
      c = n.length;
    n = [...n, i];
    const u = p => {
      var x;
      const { scope: h, children: m, ...S } = p,
        v = ((x = h == null ? void 0 : h[e]) == null ? void 0 : x[c]) || a,
        w = d.useMemo(() => S, Object.values(S));
      return l.jsx(v.Provider, { value: w, children: m });
    };
    u.displayName = o + 'Provider';
    function f(p, h) {
      var v;
      const m = ((v = h == null ? void 0 : h[e]) == null ? void 0 : v[c]) || a,
        S = d.useContext(m);
      if (S) return S;
      if (i !== void 0) return i;
      throw new Error(`\`${p}\` must be used within \`${o}\``);
    }
    return [u, f];
  }
  const s = () => {
    const o = n.map(i => d.createContext(i));
    return function (a) {
      const c = (a == null ? void 0 : a[e]) || o;
      return d.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: c } }), [a, c]);
    };
  };
  return ((s.scopeName = e), [r, OE(s, ...t)]);
}
function OE(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map(s => ({ useScope: s(), scopeName: s.scopeName }));
    return function (o) {
      const i = r.reduce((a, { useScope: c, scopeName: u }) => {
        const p = c(o)[`__scope${u}`];
        return { ...a, ...p };
      }, {});
      return d.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
function cs(e) {
  const t = DE(e),
    n = d.forwardRef((r, s) => {
      const { children: o, ...i } = r,
        a = d.Children.toArray(o),
        c = a.find($E);
      if (c) {
        const u = c.props.children,
          f = a.map(p => (p === c ? (d.Children.count(u) > 1 ? d.Children.only(null) : d.isValidElement(u) ? u.props.children : null) : p));
        return l.jsx(t, { ...i, ref: s, children: d.isValidElement(u) ? d.cloneElement(u, void 0, f) : null });
      }
      return l.jsx(t, { ...i, ref: s, children: o });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var LE = cs('Slot');
function DE(e) {
  const t = d.forwardRef((n, r) => {
    const { children: s, ...o } = n;
    if (d.isValidElement(s)) {
      const i = VE(s),
        a = zE(o, s.props);
      return (s.type !== d.Fragment && (a.ref = r ? lc(r, i) : i), d.cloneElement(s, a));
    }
    return d.Children.count(s) > 1 ? d.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Xy = Symbol('radix.slottable');
function FE(e) {
  const t = ({ children: n }) => l.jsx(l.Fragment, { children: n });
  return ((t.displayName = `${e}.Slottable`), (t.__radixId = Xy), t);
}
function $E(e) {
  return d.isValidElement(e) && typeof e.type == 'function' && '__radixId' in e.type && e.type.__radixId === Xy;
}
function zE(e, t) {
  const n = { ...t };
  for (const r in t) {
    const s = e[r],
      o = t[r];
    /^on[A-Z]/.test(r)
      ? s && o
        ? (n[r] = (...a) => {
            const c = o(...a);
            return (s(...a), c);
          })
        : s && (n[r] = s)
      : r === 'style'
        ? (n[r] = { ...s, ...o })
        : r === 'className' && (n[r] = [s, o].filter(Boolean).join(' '));
  }
  return { ...e, ...n };
}
function VE(e) {
  var r, s;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null ? void 0 : r.get,
    n = t && 'isReactWarning' in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = (s = Object.getOwnPropertyDescriptor(e, 'ref')) == null ? void 0 : s.get),
      (n = t && 'isReactWarning' in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function cc(e) {
  const t = e + 'CollectionProvider',
    [n, r] = At(t),
    [s, o] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    i = v => {
      const { scope: w, children: x } = v,
        g = D.useRef(null),
        y = D.useRef(new Map()).current;
      return l.jsx(s, { scope: w, itemMap: y, collectionRef: g, children: x });
    };
  i.displayName = t;
  const a = e + 'CollectionSlot',
    c = cs(a),
    u = D.forwardRef((v, w) => {
      const { scope: x, children: g } = v,
        y = o(a, x),
        b = ye(w, y.collectionRef);
      return l.jsx(c, { ref: b, children: g });
    });
  u.displayName = a;
  const f = e + 'CollectionItemSlot',
    p = 'data-radix-collection-item',
    h = cs(f),
    m = D.forwardRef((v, w) => {
      const { scope: x, children: g, ...y } = v,
        b = D.useRef(null),
        C = ye(w, b),
        k = o(f, x);
      return (
        D.useEffect(() => (k.itemMap.set(b, { ref: b, ...y }), () => void k.itemMap.delete(b))),
        l.jsx(h, { [p]: '', ref: C, children: g })
      );
    });
  m.displayName = f;
  function S(v) {
    const w = o(e + 'CollectionConsumer', v);
    return D.useCallback(() => {
      const g = w.collectionRef.current;
      if (!g) return [];
      const y = Array.from(g.querySelectorAll(`[${p}]`));
      return Array.from(w.itemMap.values()).sort((k, N) => y.indexOf(k.ref.current) - y.indexOf(N.ref.current));
    }, [w.collectionRef, w.itemMap]);
  }
  return [{ Provider: i, Slot: u, ItemSlot: m }, S, r];
}
var UE = ['a', 'button', 'div', 'form', 'h2', 'h3', 'img', 'input', 'label', 'li', 'nav', 'ol', 'p', 'select', 'span', 'svg', 'ul'],
  te = UE.reduce((e, t) => {
    const n = cs(`Primitive.${t}`),
      r = d.forwardRef((s, o) => {
        const { asChild: i, ...a } = s,
          c = i ? n : t;
        return (typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0), l.jsx(c, { ...a, ref: o }));
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {});
function tp(e, t) {
  e && ys.flushSync(() => e.dispatchEvent(t));
}
function dt(e) {
  const t = d.useRef(e);
  return (
    d.useEffect(() => {
      t.current = e;
    }),
    d.useMemo(
      () =>
        (...n) => {
          var r;
          return (r = t.current) == null ? void 0 : r.call(t, ...n);
        },
      []
    )
  );
}
function BE(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = dt(e);
  d.useEffect(() => {
    const r = s => {
      s.key === 'Escape' && n(s);
    };
    return (t.addEventListener('keydown', r, { capture: !0 }), () => t.removeEventListener('keydown', r, { capture: !0 }));
  }, [n, t]);
}
var WE = 'DismissableLayer',
  Ed = 'dismissableLayer.update',
  HE = 'dismissableLayer.pointerDownOutside',
  GE = 'dismissableLayer.focusOutside',
  um,
  Jy = d.createContext({ layers: new Set(), layersWithOutsidePointerEventsDisabled: new Set(), branches: new Set() }),
  Ao = d.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: s,
        onFocusOutside: o,
        onInteractOutside: i,
        onDismiss: a,
        ...c
      } = e,
      u = d.useContext(Jy),
      [f, p] = d.useState(null),
      h = (f == null ? void 0 : f.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document),
      [, m] = d.useState({}),
      S = ye(t, N => p(N)),
      v = Array.from(u.layers),
      [w] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
      x = v.indexOf(w),
      g = f ? v.indexOf(f) : -1,
      y = u.layersWithOutsidePointerEventsDisabled.size > 0,
      b = g >= x,
      C = ZE(N => {
        const P = N.target,
          T = [...u.branches].some(R => R.contains(P));
        !b || T || (s == null || s(N), i == null || i(N), N.defaultPrevented || a == null || a());
      }, h),
      k = QE(N => {
        const P = N.target;
        [...u.branches].some(R => R.contains(P)) || (o == null || o(N), i == null || i(N), N.defaultPrevented || a == null || a());
      }, h);
    return (
      BE(N => {
        g === u.layers.size - 1 && (r == null || r(N), !N.defaultPrevented && a && (N.preventDefault(), a()));
      }, h),
      d.useEffect(() => {
        if (f)
          return (
            n &&
              (u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((um = h.body.style.pointerEvents), (h.body.style.pointerEvents = 'none')),
              u.layersWithOutsidePointerEventsDisabled.add(f)),
            u.layers.add(f),
            dm(),
            () => {
              n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = um);
            }
          );
      }, [f, h, n, u]),
      d.useEffect(
        () => () => {
          f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), dm());
        },
        [f, u]
      ),
      d.useEffect(() => {
        const N = () => m({});
        return (document.addEventListener(Ed, N), () => document.removeEventListener(Ed, N));
      }, []),
      l.jsx(te.div, {
        ...c,
        ref: S,
        style: { pointerEvents: y ? (b ? 'auto' : 'none') : void 0, ...e.style },
        onFocusCapture: U(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: U(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: U(e.onPointerDownCapture, C.onPointerDownCapture),
      })
    );
  });
Ao.displayName = WE;
var KE = 'DismissableLayerBranch',
  ex = d.forwardRef((e, t) => {
    const n = d.useContext(Jy),
      r = d.useRef(null),
      s = ye(t, r);
    return (
      d.useEffect(() => {
        const o = r.current;
        if (o)
          return (
            n.branches.add(o),
            () => {
              n.branches.delete(o);
            }
          );
      }, [n.branches]),
      l.jsx(te.div, { ...e, ref: s })
    );
  });
ex.displayName = KE;
function ZE(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = dt(e),
    r = d.useRef(!1),
    s = d.useRef(() => {});
  return (
    d.useEffect(() => {
      const o = a => {
          if (a.target && !r.current) {
            let c = function () {
              tx(HE, n, u, { discrete: !0 });
            };
            const u = { originalEvent: a };
            a.pointerType === 'touch'
              ? (t.removeEventListener('click', s.current), (s.current = c), t.addEventListener('click', s.current, { once: !0 }))
              : c();
          } else t.removeEventListener('click', s.current);
          r.current = !1;
        },
        i = window.setTimeout(() => {
          t.addEventListener('pointerdown', o);
        }, 0);
      return () => {
        (window.clearTimeout(i), t.removeEventListener('pointerdown', o), t.removeEventListener('click', s.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function QE(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = dt(e),
    r = d.useRef(!1);
  return (
    d.useEffect(() => {
      const s = o => {
        o.target && !r.current && tx(GE, n, { originalEvent: o }, { discrete: !1 });
      };
      return (t.addEventListener('focusin', s), () => t.removeEventListener('focusin', s));
    }, [t, n]),
    { onFocusCapture: () => (r.current = !0), onBlurCapture: () => (r.current = !1) }
  );
}
function dm() {
  const e = new CustomEvent(Ed);
  document.dispatchEvent(e);
}
function tx(e, t, n, { discrete: r }) {
  const s = n.originalEvent.target,
    o = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && s.addEventListener(e, t, { once: !0 }), r ? tp(s, o) : s.dispatchEvent(o));
}
var qE = Ao,
  YE = ex,
  Ue = globalThis != null && globalThis.document ? d.useLayoutEffect : () => {},
  XE = 'Portal',
  ea = d.forwardRef((e, t) => {
    var a;
    const { container: n, ...r } = e,
      [s, o] = d.useState(!1);
    Ue(() => o(!0), []);
    const i = n || (s && ((a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : a.body));
    return i ? qy.createPortal(l.jsx(te.div, { ...r, ref: t }), i) : null;
  });
ea.displayName = XE;
function JE(e, t) {
  return d.useReducer((n, r) => t[n][r] ?? n, e);
}
var un = e => {
  const { present: t, children: n } = e,
    r = eN(t),
    s = typeof n == 'function' ? n({ present: r.isPresent }) : d.Children.only(n),
    o = ye(r.ref, tN(s));
  return typeof n == 'function' || r.isPresent ? d.cloneElement(s, { ref: o }) : null;
};
un.displayName = 'Presence';
function eN(e) {
  const [t, n] = d.useState(),
    r = d.useRef(null),
    s = d.useRef(e),
    o = d.useRef('none'),
    i = e ? 'mounted' : 'unmounted',
    [a, c] = JE(i, {
      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
      unmounted: { MOUNT: 'mounted' },
    });
  return (
    d.useEffect(() => {
      const u = _a(r.current);
      o.current = a === 'mounted' ? u : 'none';
    }, [a]),
    Ue(() => {
      const u = r.current,
        f = s.current;
      if (f !== e) {
        const h = o.current,
          m = _a(u);
        (e
          ? c('MOUNT')
          : m === 'none' || (u == null ? void 0 : u.display) === 'none'
            ? c('UNMOUNT')
            : c(f && h !== m ? 'ANIMATION_OUT' : 'UNMOUNT'),
          (s.current = e));
      }
    }, [e, c]),
    Ue(() => {
      if (t) {
        let u;
        const f = t.ownerDocument.defaultView ?? window,
          p = m => {
            const v = _a(r.current).includes(m.animationName);
            if (m.target === t && v && (c('ANIMATION_END'), !s.current)) {
              const w = t.style.animationFillMode;
              ((t.style.animationFillMode = 'forwards'),
                (u = f.setTimeout(() => {
                  t.style.animationFillMode === 'forwards' && (t.style.animationFillMode = w);
                })));
            }
          },
          h = m => {
            m.target === t && (o.current = _a(r.current));
          };
        return (
          t.addEventListener('animationstart', h),
          t.addEventListener('animationcancel', p),
          t.addEventListener('animationend', p),
          () => {
            (f.clearTimeout(u),
              t.removeEventListener('animationstart', h),
              t.removeEventListener('animationcancel', p),
              t.removeEventListener('animationend', p));
          }
        );
      } else c('ANIMATION_END');
    }, [t, c]),
    {
      isPresent: ['mounted', 'unmountSuspended'].includes(a),
      ref: d.useCallback(u => {
        ((r.current = u ? getComputedStyle(u) : null), n(u));
      }, []),
    }
  );
}
function _a(e) {
  return (e == null ? void 0 : e.animationName) || 'none';
}
function tN(e) {
  var r, s;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null ? void 0 : r.get,
    n = t && 'isReactWarning' in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = (s = Object.getOwnPropertyDescriptor(e, 'ref')) == null ? void 0 : s.get),
      (n = t && 'isReactWarning' in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var nN = uf[' useInsertionEffect '.trim().toString()] || Ue;
function kr({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  const [s, o, i] = rN({ defaultProp: t, onChange: n }),
    a = e !== void 0,
    c = a ? e : s;
  {
    const f = d.useRef(e !== void 0);
    d.useEffect(() => {
      const p = f.current;
      (p !== a &&
        console.warn(
          `${r} is changing from ${p ? 'controlled' : 'uncontrolled'} to ${a ? 'controlled' : 'uncontrolled'}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        ),
        (f.current = a));
    }, [a, r]);
  }
  const u = d.useCallback(
    f => {
      var p;
      if (a) {
        const h = sN(f) ? f(e) : f;
        h !== e && ((p = i.current) == null || p.call(i, h));
      } else o(f);
    },
    [a, e, o, i]
  );
  return [c, u];
}
function rN({ defaultProp: e, onChange: t }) {
  const [n, r] = d.useState(e),
    s = d.useRef(n),
    o = d.useRef(t);
  return (
    nN(() => {
      o.current = t;
    }, [t]),
    d.useEffect(() => {
      var i;
      s.current !== n && ((i = o.current) == null || i.call(o, n), (s.current = n));
    }, [n, s]),
    [n, r, o]
  );
}
function sN(e) {
  return typeof e == 'function';
}
var nx = Object.freeze({
    position: 'absolute',
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
  }),
  oN = 'VisuallyHidden',
  uc = d.forwardRef((e, t) => l.jsx(te.span, { ...e, ref: t, style: { ...nx, ...e.style } }));
uc.displayName = oN;
var iN = uc,
  np = 'ToastProvider',
  [rp, aN, lN] = cc('Toast'),
  [rx, xM] = At('Toast', [lN]),
  [cN, dc] = rx(np),
  sx = e => {
    const {
        __scopeToast: t,
        label: n = 'Notification',
        duration: r = 5e3,
        swipeDirection: s = 'right',
        swipeThreshold: o = 50,
        children: i,
      } = e,
      [a, c] = d.useState(null),
      [u, f] = d.useState(0),
      p = d.useRef(!1),
      h = d.useRef(!1);
    return (
      n.trim() || console.error(`Invalid prop \`label\` supplied to \`${np}\`. Expected non-empty \`string\`.`),
      l.jsx(rp.Provider, {
        scope: t,
        children: l.jsx(cN, {
          scope: t,
          label: n,
          duration: r,
          swipeDirection: s,
          swipeThreshold: o,
          toastCount: u,
          viewport: a,
          onViewportChange: c,
          onToastAdd: d.useCallback(() => f(m => m + 1), []),
          onToastRemove: d.useCallback(() => f(m => m - 1), []),
          isFocusedToastEscapeKeyDownRef: p,
          isClosePausedRef: h,
          children: i,
        }),
      })
    );
  };
sx.displayName = np;
var ox = 'ToastViewport',
  uN = ['F8'],
  Nd = 'toast.viewportPause',
  kd = 'toast.viewportResume',
  ix = d.forwardRef((e, t) => {
    const { __scopeToast: n, hotkey: r = uN, label: s = 'Notifications ({hotkey})', ...o } = e,
      i = dc(ox, n),
      a = aN(n),
      c = d.useRef(null),
      u = d.useRef(null),
      f = d.useRef(null),
      p = d.useRef(null),
      h = ye(t, p, i.onViewportChange),
      m = r.join('+').replace(/Key/g, '').replace(/Digit/g, ''),
      S = i.toastCount > 0;
    (d.useEffect(() => {
      const w = x => {
        var y;
        r.length !== 0 && r.every(b => x[b] || x.code === b) && ((y = p.current) == null || y.focus());
      };
      return (document.addEventListener('keydown', w), () => document.removeEventListener('keydown', w));
    }, [r]),
      d.useEffect(() => {
        const w = c.current,
          x = p.current;
        if (S && w && x) {
          const g = () => {
              if (!i.isClosePausedRef.current) {
                const k = new CustomEvent(Nd);
                (x.dispatchEvent(k), (i.isClosePausedRef.current = !0));
              }
            },
            y = () => {
              if (i.isClosePausedRef.current) {
                const k = new CustomEvent(kd);
                (x.dispatchEvent(k), (i.isClosePausedRef.current = !1));
              }
            },
            b = k => {
              !w.contains(k.relatedTarget) && y();
            },
            C = () => {
              w.contains(document.activeElement) || y();
            };
          return (
            w.addEventListener('focusin', g),
            w.addEventListener('focusout', b),
            w.addEventListener('pointermove', g),
            w.addEventListener('pointerleave', C),
            window.addEventListener('blur', g),
            window.addEventListener('focus', y),
            () => {
              (w.removeEventListener('focusin', g),
                w.removeEventListener('focusout', b),
                w.removeEventListener('pointermove', g),
                w.removeEventListener('pointerleave', C),
                window.removeEventListener('blur', g),
                window.removeEventListener('focus', y));
            }
          );
        }
      }, [S, i.isClosePausedRef]));
    const v = d.useCallback(
      ({ tabbingDirection: w }) => {
        const g = a().map(y => {
          const b = y.ref.current,
            C = [b, ...CN(b)];
          return w === 'forwards' ? C : C.reverse();
        });
        return (w === 'forwards' ? g.reverse() : g).flat();
      },
      [a]
    );
    return (
      d.useEffect(() => {
        const w = p.current;
        if (w) {
          const x = g => {
            var C, k, N;
            const y = g.altKey || g.ctrlKey || g.metaKey;
            if (g.key === 'Tab' && !y) {
              const P = document.activeElement,
                T = g.shiftKey;
              if (g.target === w && T) {
                (C = u.current) == null || C.focus();
                return;
              }
              const $ = v({ tabbingDirection: T ? 'backwards' : 'forwards' }),
                Y = $.findIndex(O => O === P);
              hu($.slice(Y + 1)) ? g.preventDefault() : T ? (k = u.current) == null || k.focus() : (N = f.current) == null || N.focus();
            }
          };
          return (w.addEventListener('keydown', x), () => w.removeEventListener('keydown', x));
        }
      }, [a, v]),
      l.jsxs(YE, {
        ref: c,
        role: 'region',
        'aria-label': s.replace('{hotkey}', m),
        tabIndex: -1,
        style: { pointerEvents: S ? void 0 : 'none' },
        children: [
          S &&
            l.jsx(_d, {
              ref: u,
              onFocusFromOutsideViewport: () => {
                const w = v({ tabbingDirection: 'forwards' });
                hu(w);
              },
            }),
          l.jsx(rp.Slot, { scope: n, children: l.jsx(te.ol, { tabIndex: -1, ...o, ref: h }) }),
          S &&
            l.jsx(_d, {
              ref: f,
              onFocusFromOutsideViewport: () => {
                const w = v({ tabbingDirection: 'backwards' });
                hu(w);
              },
            }),
        ],
      })
    );
  });
ix.displayName = ox;
var ax = 'ToastFocusProxy',
  _d = d.forwardRef((e, t) => {
    const { __scopeToast: n, onFocusFromOutsideViewport: r, ...s } = e,
      o = dc(ax, n);
    return l.jsx(uc, {
      'aria-hidden': !0,
      tabIndex: 0,
      ...s,
      ref: t,
      style: { position: 'fixed' },
      onFocus: i => {
        var u;
        const a = i.relatedTarget;
        !((u = o.viewport) != null && u.contains(a)) && r();
      },
    });
  });
_d.displayName = ax;
var ta = 'Toast',
  dN = 'toast.swipeStart',
  fN = 'toast.swipeMove',
  pN = 'toast.swipeCancel',
  hN = 'toast.swipeEnd',
  lx = d.forwardRef((e, t) => {
    const { forceMount: n, open: r, defaultOpen: s, onOpenChange: o, ...i } = e,
      [a, c] = kr({ prop: r, defaultProp: s ?? !0, onChange: o, caller: ta });
    return l.jsx(un, {
      present: n || a,
      children: l.jsx(vN, {
        open: a,
        ...i,
        ref: t,
        onClose: () => c(!1),
        onPause: dt(e.onPause),
        onResume: dt(e.onResume),
        onSwipeStart: U(e.onSwipeStart, u => {
          u.currentTarget.setAttribute('data-swipe', 'start');
        }),
        onSwipeMove: U(e.onSwipeMove, u => {
          const { x: f, y: p } = u.detail.delta;
          (u.currentTarget.setAttribute('data-swipe', 'move'),
            u.currentTarget.style.setProperty('--radix-toast-swipe-move-x', `${f}px`),
            u.currentTarget.style.setProperty('--radix-toast-swipe-move-y', `${p}px`));
        }),
        onSwipeCancel: U(e.onSwipeCancel, u => {
          (u.currentTarget.setAttribute('data-swipe', 'cancel'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-x'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-y'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-end-x'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-end-y'));
        }),
        onSwipeEnd: U(e.onSwipeEnd, u => {
          const { x: f, y: p } = u.detail.delta;
          (u.currentTarget.setAttribute('data-swipe', 'end'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-x'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-y'),
            u.currentTarget.style.setProperty('--radix-toast-swipe-end-x', `${f}px`),
            u.currentTarget.style.setProperty('--radix-toast-swipe-end-y', `${p}px`),
            c(!1));
        }),
      }),
    });
  });
lx.displayName = ta;
var [mN, gN] = rx(ta, { onClose() {} }),
  vN = d.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        type: r = 'foreground',
        duration: s,
        open: o,
        onClose: i,
        onEscapeKeyDown: a,
        onPause: c,
        onResume: u,
        onSwipeStart: f,
        onSwipeMove: p,
        onSwipeCancel: h,
        onSwipeEnd: m,
        ...S
      } = e,
      v = dc(ta, n),
      [w, x] = d.useState(null),
      g = ye(t, O => x(O)),
      y = d.useRef(null),
      b = d.useRef(null),
      C = s || v.duration,
      k = d.useRef(0),
      N = d.useRef(C),
      P = d.useRef(0),
      { onToastAdd: T, onToastRemove: R } = v,
      H = dt(() => {
        var X;
        ((w == null ? void 0 : w.contains(document.activeElement)) && ((X = v.viewport) == null || X.focus()), i());
      }),
      $ = d.useCallback(
        O => {
          !O || O === 1 / 0 || (window.clearTimeout(P.current), (k.current = new Date().getTime()), (P.current = window.setTimeout(H, O)));
        },
        [H]
      );
    (d.useEffect(() => {
      const O = v.viewport;
      if (O) {
        const X = () => {
            ($(N.current), u == null || u());
          },
          I = () => {
            const z = new Date().getTime() - k.current;
            ((N.current = N.current - z), window.clearTimeout(P.current), c == null || c());
          };
        return (
          O.addEventListener(Nd, I),
          O.addEventListener(kd, X),
          () => {
            (O.removeEventListener(Nd, I), O.removeEventListener(kd, X));
          }
        );
      }
    }, [v.viewport, C, c, u, $]),
      d.useEffect(() => {
        o && !v.isClosePausedRef.current && $(C);
      }, [o, C, v.isClosePausedRef, $]),
      d.useEffect(() => (T(), () => R()), [T, R]));
    const Y = d.useMemo(() => (w ? mx(w) : null), [w]);
    return v.viewport
      ? l.jsxs(l.Fragment, {
          children: [
            Y &&
              l.jsx(yN, {
                __scopeToast: n,
                role: 'status',
                'aria-live': r === 'foreground' ? 'assertive' : 'polite',
                'aria-atomic': !0,
                children: Y,
              }),
            l.jsx(mN, {
              scope: n,
              onClose: H,
              children: ys.createPortal(
                l.jsx(rp.ItemSlot, {
                  scope: n,
                  children: l.jsx(qE, {
                    asChild: !0,
                    onEscapeKeyDown: U(a, () => {
                      (v.isFocusedToastEscapeKeyDownRef.current || H(), (v.isFocusedToastEscapeKeyDownRef.current = !1));
                    }),
                    children: l.jsx(te.li, {
                      role: 'status',
                      'aria-live': 'off',
                      'aria-atomic': !0,
                      tabIndex: 0,
                      'data-state': o ? 'open' : 'closed',
                      'data-swipe-direction': v.swipeDirection,
                      ...S,
                      ref: g,
                      style: { userSelect: 'none', touchAction: 'none', ...e.style },
                      onKeyDown: U(e.onKeyDown, O => {
                        O.key === 'Escape' &&
                          (a == null || a(O.nativeEvent),
                          O.nativeEvent.defaultPrevented || ((v.isFocusedToastEscapeKeyDownRef.current = !0), H()));
                      }),
                      onPointerDown: U(e.onPointerDown, O => {
                        O.button === 0 && (y.current = { x: O.clientX, y: O.clientY });
                      }),
                      onPointerMove: U(e.onPointerMove, O => {
                        if (!y.current) return;
                        const X = O.clientX - y.current.x,
                          I = O.clientY - y.current.y,
                          z = !!b.current,
                          _ = ['left', 'right'].includes(v.swipeDirection),
                          E = ['left', 'up'].includes(v.swipeDirection) ? Math.min : Math.max,
                          A = _ ? E(0, X) : 0,
                          Z = _ ? 0 : E(0, I),
                          W = O.pointerType === 'touch' ? 10 : 2,
                          J = { x: A, y: Z },
                          V = { originalEvent: O, delta: J };
                        z
                          ? ((b.current = J), Pa(fN, p, V, { discrete: !1 }))
                          : fm(J, v.swipeDirection, W)
                            ? ((b.current = J), Pa(dN, f, V, { discrete: !1 }), O.target.setPointerCapture(O.pointerId))
                            : (Math.abs(X) > W || Math.abs(I) > W) && (y.current = null);
                      }),
                      onPointerUp: U(e.onPointerUp, O => {
                        const X = b.current,
                          I = O.target;
                        if (
                          (I.hasPointerCapture(O.pointerId) && I.releasePointerCapture(O.pointerId),
                          (b.current = null),
                          (y.current = null),
                          X)
                        ) {
                          const z = O.currentTarget,
                            _ = { originalEvent: O, delta: X };
                          (fm(X, v.swipeDirection, v.swipeThreshold) ? Pa(hN, m, _, { discrete: !0 }) : Pa(pN, h, _, { discrete: !0 }),
                            z.addEventListener('click', E => E.preventDefault(), { once: !0 }));
                        }
                      }),
                    }),
                  }),
                }),
                v.viewport
              ),
            }),
          ],
        })
      : null;
  }),
  yN = e => {
    const { __scopeToast: t, children: n, ...r } = e,
      s = dc(ta, t),
      [o, i] = d.useState(!1),
      [a, c] = d.useState(!1);
    return (
      SN(() => i(!0)),
      d.useEffect(() => {
        const u = window.setTimeout(() => c(!0), 1e3);
        return () => window.clearTimeout(u);
      }, []),
      a
        ? null
        : l.jsx(ea, { asChild: !0, children: l.jsx(uc, { ...r, children: o && l.jsxs(l.Fragment, { children: [s.label, ' ', n] }) }) })
    );
  },
  xN = 'ToastTitle',
  cx = d.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e;
    return l.jsx(te.div, { ...r, ref: t });
  });
cx.displayName = xN;
var wN = 'ToastDescription',
  ux = d.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e;
    return l.jsx(te.div, { ...r, ref: t });
  });
ux.displayName = wN;
var dx = 'ToastAction',
  fx = d.forwardRef((e, t) => {
    const { altText: n, ...r } = e;
    return n.trim()
      ? l.jsx(hx, { altText: n, asChild: !0, children: l.jsx(sp, { ...r, ref: t }) })
      : (console.error(`Invalid prop \`altText\` supplied to \`${dx}\`. Expected non-empty \`string\`.`), null);
  });
fx.displayName = dx;
var px = 'ToastClose',
  sp = d.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e,
      s = gN(px, n);
    return l.jsx(hx, { asChild: !0, children: l.jsx(te.button, { type: 'button', ...r, ref: t, onClick: U(e.onClick, s.onClose) }) });
  });
sp.displayName = px;
var hx = d.forwardRef((e, t) => {
  const { __scopeToast: n, altText: r, ...s } = e;
  return l.jsx(te.div, { 'data-radix-toast-announce-exclude': '', 'data-radix-toast-announce-alt': r || void 0, ...s, ref: t });
});
function mx(e) {
  const t = [];
  return (
    Array.from(e.childNodes).forEach(r => {
      if ((r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent), bN(r))) {
        const s = r.ariaHidden || r.hidden || r.style.display === 'none',
          o = r.dataset.radixToastAnnounceExclude === '';
        if (!s)
          if (o) {
            const i = r.dataset.radixToastAnnounceAlt;
            i && t.push(i);
          } else t.push(...mx(r));
      }
    }),
    t
  );
}
function Pa(e, t, n, { discrete: r }) {
  const s = n.originalEvent.currentTarget,
    o = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
  (t && s.addEventListener(e, t, { once: !0 }), r ? tp(s, o) : s.dispatchEvent(o));
}
var fm = (e, t, n = 0) => {
  const r = Math.abs(e.x),
    s = Math.abs(e.y),
    o = r > s;
  return t === 'left' || t === 'right' ? o && r > n : !o && s > n;
};
function SN(e = () => {}) {
  const t = dt(e);
  Ue(() => {
    let n = 0,
      r = 0;
    return (
      (n = window.requestAnimationFrame(() => (r = window.requestAnimationFrame(t)))),
      () => {
        (window.cancelAnimationFrame(n), window.cancelAnimationFrame(r));
      }
    );
  }, [t]);
}
function bN(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function CN(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: r => {
        const s = r.tagName === 'INPUT' && r.type === 'hidden';
        return r.disabled || r.hidden || s ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function hu(e) {
  const t = document.activeElement;
  return e.some(n => (n === t ? !0 : (n.focus(), document.activeElement !== t)));
}
var EN = sx,
  gx = ix,
  vx = lx,
  yx = cx,
  xx = ux,
  wx = fx,
  Sx = sp;
function bx(e) {
  var t,
    n,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var s = e.length;
      for (t = 0; t < s; t++) e[t] && (n = bx(e[t])) && (r && (r += ' '), (r += n));
    } else for (n in e) e[n] && (r && (r += ' '), (r += n));
  return r;
}
function Cx() {
  for (var e, t, n = 0, r = '', s = arguments.length; n < s; n++) (e = arguments[n]) && (t = bx(e)) && (r && (r += ' '), (r += t));
  return r;
}
const pm = e => (typeof e == 'boolean' ? `${e}` : e === 0 ? '0' : e),
  hm = Cx,
  fc = (e, t) => n => {
    var r;
    if ((t == null ? void 0 : t.variants) == null) return hm(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
    const { variants: s, defaultVariants: o } = t,
      i = Object.keys(s).map(u => {
        const f = n == null ? void 0 : n[u],
          p = o == null ? void 0 : o[u];
        if (f === null) return null;
        const h = pm(f) || pm(p);
        return s[u][h];
      }),
      a =
        n &&
        Object.entries(n).reduce((u, f) => {
          let [p, h] = f;
          return (h === void 0 || (u[p] = h), u);
        }, {}),
      c =
        t == null || (r = t.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((u, f) => {
              let { class: p, className: h, ...m } = f;
              return Object.entries(m).every(S => {
                let [v, w] = S;
                return Array.isArray(w) ? w.includes({ ...o, ...a }[v]) : { ...o, ...a }[v] === w;
              })
                ? [...u, p, h]
                : u;
            }, []);
    return hm(e, i, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  };
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const NN = e => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Ex = (...e) =>
    e
      .filter((t, n, r) => !!t && t.trim() !== '' && r.indexOf(t) === n)
      .join(' ')
      .trim();
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var kN = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _N = d.forwardRef(
  (
    {
      color: e = 'currentColor',
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: s = '',
      children: o,
      iconNode: i,
      ...a
    },
    c
  ) =>
    d.createElement(
      'svg',
      {
        ref: c,
        ...kN,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: Ex('lucide', s),
        ...a,
      },
      [...i.map(([u, f]) => d.createElement(u, f)), ...(Array.isArray(o) ? o : [o])]
    )
);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fe = (e, t) => {
  const n = d.forwardRef(({ className: r, ...s }, o) =>
    d.createElement(_N, { ref: o, iconNode: t, className: Ex(`lucide-${NN(e)}`, r), ...s })
  );
  return ((n.displayName = `${e}`), n);
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const PN = fe('Archive', [
  ['rect', { width: '20', height: '5', x: '2', y: '3', rx: '1', key: '1wp1u1' }],
  ['path', { d: 'M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8', key: '1s80jp' }],
  ['path', { d: 'M10 12h4', key: 'a56b0p' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mm = fe('Calendar', [
  ['path', { d: 'M8 2v4', key: '1cmpym' }],
  ['path', { d: 'M16 2v4', key: '4m81vk' }],
  ['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
  ['path', { d: 'M3 10h18', key: '8toen8' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const El = fe('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Nx = fe('ChevronDown', [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jN = fe('ChevronRight', [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const TN = fe('ChevronUp', [['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const gm = fe('CircleAlert', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
  ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const js = fe('CircleCheckBig', [
  ['path', { d: 'M21.801 10A10 10 0 1 1 17 3.335', key: 'yps3ct' }],
  ['path', { d: 'm9 11 3 3L22 4', key: '1pflzl' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const kx = fe('CircleHelp', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', key: '1u773s' }],
  ['path', { d: 'M12 17h.01', key: 'p32p05' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const RN = fe('Circle', [['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Js = fe('Download', [
  ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
  ['polyline', { points: '7 10 12 15 17 10', key: '2ggqvy' }],
  ['line', { x1: '12', x2: '12', y1: '15', y2: '3', key: '1vk2je' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Oi = fe('ExternalLink', [
  ['path', { d: 'M15 3h6v6', key: '1q9fwt' }],
  ['path', { d: 'M10 14 21 3', key: 'gplh6r' }],
  ['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', key: 'a6xqqp' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const IN = fe('Facebook', [['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', key: '1jg4f8' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const AN = fe('Folder', [
  [
    'path',
    {
      d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
      key: '1kt360',
    },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const MN = fe('Gamepad2', [
  ['line', { x1: '6', x2: '10', y1: '11', y2: '11', key: '1gktln' }],
  ['line', { x1: '8', x2: '8', y1: '9', y2: '13', key: 'qnk9ow' }],
  ['line', { x1: '15', x2: '15.01', y1: '12', y2: '12', key: 'krot7o' }],
  ['line', { x1: '18', x2: '18.01', y1: '10', y2: '10', key: '1lcuu1' }],
  [
    'path',
    {
      d: 'M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z',
      key: 'mfqc10',
    },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ON = fe('Globe', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', key: '13o1zl' }],
  ['path', { d: 'M2 12h20', key: '9i4pu4' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const LN = fe('House', [
  ['path', { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', key: '5wwlr5' }],
  [
    'path',
    { d: 'M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', key: '1d0kgt' },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const op = fe('Info', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['path', { d: 'M12 16v-4', key: '1dtifu' }],
  ['path', { d: 'M12 8h.01', key: 'e9boi3' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const DN = fe('Mail', [
  ['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
  ['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _x = fe('MessageSquare', [['path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', key: '1lielz' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const FN = fe('Minus', [['path', { d: 'M5 12h14', key: '1ays0h' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $N = fe('Monitor', [
  ['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
  ['line', { x1: '8', x2: '16', y1: '21', y2: '21', key: '1svkeh' }],
  ['line', { x1: '12', x2: '12', y1: '17', y2: '21', key: 'vw1qmm' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Li = fe('Play', [['polygon', { points: '6 3 20 12 6 21 6 3', key: '1oa8hb' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zN = fe('Power', [
  ['path', { d: 'M12 2v10', key: 'mnfbl' }],
  ['path', { d: 'M18.4 6.6a9 9 0 1 1-12.77.04', key: 'obofu9' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Px = fe('RefreshCw', [
  ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
  ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
  ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
  ['path', { d: 'M8 16H3v5', key: '1cv678' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Nl = fe('RotateCcw', [
  ['path', { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', key: '1357e3' }],
  ['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Pd = fe('Settings', [
  [
    'path',
    {
      d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
      key: '1qme2f',
    },
  ],
  ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const VN = fe('Shield', [
  [
    'path',
    {
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
      key: 'oel41y',
    },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jx = fe('Star', [
  [
    'path',
    {
      d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
      key: 'r04s7s',
    },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const UN = fe('ThumbsDown', [
  ['path', { d: 'M17 14V2', key: '8ymqnk' }],
  [
    'path',
    {
      d: 'M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z',
      key: 'm61m77',
    },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const BN = fe('ThumbsUp', [
  ['path', { d: 'M7 10v12', key: '1qc93n' }],
  [
    'path',
    {
      d: 'M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z',
      key: 'emmmcr',
    },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const kl = fe('Trash2', [
  ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
  ['path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', key: '4alrt4' }],
  ['path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2', key: 'v07s0e' }],
  ['line', { x1: '10', x2: '10', y1: '11', y2: '17', key: '1uufr5' }],
  ['line', { x1: '14', x2: '14', y1: '11', y2: '17', key: 'xtxkd' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mo = fe('TriangleAlert', [
  ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', key: 'wmoenq' }],
  ['path', { d: 'M12 9v4', key: 'juzpu7' }],
  ['path', { d: 'M12 17h.01', key: 'p32p05' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const WN = fe('Users', [
  ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
  ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
  ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
  ['path', { d: 'M16 3.13a4 4 0 0 1 0 7.75', key: '1da9ce' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const na = fe('X', [
  ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
  ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const As = fe('Zap', [
    [
      'path',
      {
        d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
        key: '1xq2db',
      },
    ],
  ]),
  ip = '-',
  HN = e => {
    const t = KN(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: i => {
        const a = i.split(ip);
        return (a[0] === '' && a.length !== 1 && a.shift(), Tx(a, t) || GN(i));
      },
      getConflictingClassGroupIds: (i, a) => {
        const c = n[i] || [];
        return a && r[i] ? [...c, ...r[i]] : c;
      },
    };
  },
  Tx = (e, t) => {
    var i;
    if (e.length === 0) return t.classGroupId;
    const n = e[0],
      r = t.nextPart.get(n),
      s = r ? Tx(e.slice(1), r) : void 0;
    if (s) return s;
    if (t.validators.length === 0) return;
    const o = e.join(ip);
    return (i = t.validators.find(({ validator: a }) => a(o))) == null ? void 0 : i.classGroupId;
  },
  vm = /^\[(.+)\]$/,
  GN = e => {
    if (vm.test(e)) {
      const t = vm.exec(e)[1],
        n = t == null ? void 0 : t.substring(0, t.indexOf(':'));
      if (n) return 'arbitrary..' + n;
    }
  },
  KN = e => {
    const { theme: t, prefix: n } = e,
      r = { nextPart: new Map(), validators: [] };
    return (
      QN(Object.entries(e.classGroups), n).forEach(([o, i]) => {
        jd(i, r, o, t);
      }),
      r
    );
  },
  jd = (e, t, n, r) => {
    e.forEach(s => {
      if (typeof s == 'string') {
        const o = s === '' ? t : ym(t, s);
        o.classGroupId = n;
        return;
      }
      if (typeof s == 'function') {
        if (ZN(s)) {
          jd(s(r), t, n, r);
          return;
        }
        t.validators.push({ validator: s, classGroupId: n });
        return;
      }
      Object.entries(s).forEach(([o, i]) => {
        jd(i, ym(t, o), n, r);
      });
    });
  },
  ym = (e, t) => {
    let n = e;
    return (
      t.split(ip).forEach(r => {
        (n.nextPart.has(r) || n.nextPart.set(r, { nextPart: new Map(), validators: [] }), (n = n.nextPart.get(r)));
      }),
      n
    );
  },
  ZN = e => e.isThemeGetter,
  QN = (e, t) =>
    t
      ? e.map(([n, r]) => {
          const s = r.map(o =>
            typeof o == 'string' ? t + o : typeof o == 'object' ? Object.fromEntries(Object.entries(o).map(([i, a]) => [t + i, a])) : o
          );
          return [n, s];
        })
      : e,
  qN = e => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      n = new Map(),
      r = new Map();
    const s = (o, i) => {
      (n.set(o, i), t++, t > e && ((t = 0), (r = n), (n = new Map())));
    };
    return {
      get(o) {
        let i = n.get(o);
        if (i !== void 0) return i;
        if ((i = r.get(o)) !== void 0) return (s(o, i), i);
      },
      set(o, i) {
        n.has(o) ? n.set(o, i) : s(o, i);
      },
    };
  },
  Rx = '!',
  YN = e => {
    const { separator: t, experimentalParseClassName: n } = e,
      r = t.length === 1,
      s = t[0],
      o = t.length,
      i = a => {
        const c = [];
        let u = 0,
          f = 0,
          p;
        for (let w = 0; w < a.length; w++) {
          let x = a[w];
          if (u === 0) {
            if (x === s && (r || a.slice(w, w + o) === t)) {
              (c.push(a.slice(f, w)), (f = w + o));
              continue;
            }
            if (x === '/') {
              p = w;
              continue;
            }
          }
          x === '[' ? u++ : x === ']' && u--;
        }
        const h = c.length === 0 ? a : a.substring(f),
          m = h.startsWith(Rx),
          S = m ? h.substring(1) : h,
          v = p && p > f ? p - f : void 0;
        return { modifiers: c, hasImportantModifier: m, baseClassName: S, maybePostfixModifierPosition: v };
      };
    return n ? a => n({ className: a, parseClassName: i }) : i;
  },
  XN = e => {
    if (e.length <= 1) return e;
    const t = [];
    let n = [];
    return (
      e.forEach(r => {
        r[0] === '[' ? (t.push(...n.sort(), r), (n = [])) : n.push(r);
      }),
      t.push(...n.sort()),
      t
    );
  },
  JN = e => ({ cache: qN(e.cacheSize), parseClassName: YN(e), ...HN(e) }),
  ek = /\s+/,
  tk = (e, t) => {
    const { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: s } = t,
      o = [],
      i = e.trim().split(ek);
    let a = '';
    for (let c = i.length - 1; c >= 0; c -= 1) {
      const u = i[c],
        { modifiers: f, hasImportantModifier: p, baseClassName: h, maybePostfixModifierPosition: m } = n(u);
      let S = !!m,
        v = r(S ? h.substring(0, m) : h);
      if (!v) {
        if (!S) {
          a = u + (a.length > 0 ? ' ' + a : a);
          continue;
        }
        if (((v = r(h)), !v)) {
          a = u + (a.length > 0 ? ' ' + a : a);
          continue;
        }
        S = !1;
      }
      const w = XN(f).join(':'),
        x = p ? w + Rx : w,
        g = x + v;
      if (o.includes(g)) continue;
      o.push(g);
      const y = s(v, S);
      for (let b = 0; b < y.length; ++b) {
        const C = y[b];
        o.push(x + C);
      }
      a = u + (a.length > 0 ? ' ' + a : a);
    }
    return a;
  };
function nk() {
  let e = 0,
    t,
    n,
    r = '';
  for (; e < arguments.length; ) (t = arguments[e++]) && (n = Ix(t)) && (r && (r += ' '), (r += n));
  return r;
}
const Ix = e => {
  if (typeof e == 'string') return e;
  let t,
    n = '';
  for (let r = 0; r < e.length; r++) e[r] && (t = Ix(e[r])) && (n && (n += ' '), (n += t));
  return n;
};
function rk(e, ...t) {
  let n,
    r,
    s,
    o = i;
  function i(c) {
    const u = t.reduce((f, p) => p(f), e());
    return ((n = JN(u)), (r = n.cache.get), (s = n.cache.set), (o = a), a(c));
  }
  function a(c) {
    const u = r(c);
    if (u) return u;
    const f = tk(c, n);
    return (s(c, f), f);
  }
  return function () {
    return o(nk.apply(null, arguments));
  };
}
const _e = e => {
    const t = n => n[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  Ax = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  sk = /^\d+\/\d+$/,
  ok = new Set(['px', 'full', 'screen']),
  ik = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  ak = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  lk = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  ck = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  uk = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Pn = e => eo(e) || ok.has(e) || sk.test(e),
  Zn = e => Oo(e, 'length', yk),
  eo = e => !!e && !Number.isNaN(Number(e)),
  mu = e => Oo(e, 'number', eo),
  Xo = e => !!e && Number.isInteger(Number(e)),
  dk = e => e.endsWith('%') && eo(e.slice(0, -1)),
  le = e => Ax.test(e),
  Qn = e => ik.test(e),
  fk = new Set(['length', 'size', 'percentage']),
  pk = e => Oo(e, fk, Mx),
  hk = e => Oo(e, 'position', Mx),
  mk = new Set(['image', 'url']),
  gk = e => Oo(e, mk, wk),
  vk = e => Oo(e, '', xk),
  Jo = () => !0,
  Oo = (e, t, n) => {
    const r = Ax.exec(e);
    return r ? (r[1] ? (typeof t == 'string' ? r[1] === t : t.has(r[1])) : n(r[2])) : !1;
  },
  yk = e => ak.test(e) && !lk.test(e),
  Mx = () => !1,
  xk = e => ck.test(e),
  wk = e => uk.test(e),
  Sk = () => {
    const e = _e('colors'),
      t = _e('spacing'),
      n = _e('blur'),
      r = _e('brightness'),
      s = _e('borderColor'),
      o = _e('borderRadius'),
      i = _e('borderSpacing'),
      a = _e('borderWidth'),
      c = _e('contrast'),
      u = _e('grayscale'),
      f = _e('hueRotate'),
      p = _e('invert'),
      h = _e('gap'),
      m = _e('gradientColorStops'),
      S = _e('gradientColorStopPositions'),
      v = _e('inset'),
      w = _e('margin'),
      x = _e('opacity'),
      g = _e('padding'),
      y = _e('saturate'),
      b = _e('scale'),
      C = _e('sepia'),
      k = _e('skew'),
      N = _e('space'),
      P = _e('translate'),
      T = () => ['auto', 'contain', 'none'],
      R = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      H = () => ['auto', le, t],
      $ = () => [le, t],
      Y = () => ['', Pn, Zn],
      O = () => ['auto', eo, le],
      X = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'],
      I = () => ['solid', 'dashed', 'dotted', 'double', 'none'],
      z = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      _ = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
      E = () => ['', '0', le],
      A = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'],
      Z = () => [eo, le];
    return {
      cacheSize: 500,
      separator: ':',
      theme: {
        colors: [Jo],
        spacing: [Pn, Zn],
        blur: ['none', '', Qn, le],
        brightness: Z(),
        borderColor: [e],
        borderRadius: ['none', '', 'full', Qn, le],
        borderSpacing: $(),
        borderWidth: Y(),
        contrast: Z(),
        grayscale: E(),
        hueRotate: Z(),
        invert: E(),
        gap: $(),
        gradientColorStops: [e],
        gradientColorStopPositions: [dk, Zn],
        inset: H(),
        margin: H(),
        opacity: Z(),
        padding: $(),
        saturate: Z(),
        scale: Z(),
        sepia: E(),
        skew: Z(),
        space: $(),
        translate: $(),
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', 'video', le] }],
        container: ['container'],
        columns: [{ columns: [Qn] }],
        'break-after': [{ 'break-after': A() }],
        'break-before': [{ 'break-before': A() }],
        'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
        'object-position': [{ object: [...X(), le] }],
        overflow: [{ overflow: R() }],
        'overflow-x': [{ 'overflow-x': R() }],
        'overflow-y': [{ 'overflow-y': R() }],
        overscroll: [{ overscroll: T() }],
        'overscroll-x': [{ 'overscroll-x': T() }],
        'overscroll-y': [{ 'overscroll-y': T() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: [v] }],
        'inset-x': [{ 'inset-x': [v] }],
        'inset-y': [{ 'inset-y': [v] }],
        start: [{ start: [v] }],
        end: [{ end: [v] }],
        top: [{ top: [v] }],
        right: [{ right: [v] }],
        bottom: [{ bottom: [v] }],
        left: [{ left: [v] }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: ['auto', Xo, le] }],
        basis: [{ basis: H() }],
        'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
        'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
        flex: [{ flex: ['1', 'auto', 'initial', 'none', le] }],
        grow: [{ grow: E() }],
        shrink: [{ shrink: E() }],
        order: [{ order: ['first', 'last', 'none', Xo, le] }],
        'grid-cols': [{ 'grid-cols': [Jo] }],
        'col-start-end': [{ col: ['auto', { span: ['full', Xo, le] }, le] }],
        'col-start': [{ 'col-start': O() }],
        'col-end': [{ 'col-end': O() }],
        'grid-rows': [{ 'grid-rows': [Jo] }],
        'row-start-end': [{ row: ['auto', { span: [Xo, le] }, le] }],
        'row-start': [{ 'row-start': O() }],
        'row-end': [{ 'row-end': O() }],
        'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
        'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', le] }],
        'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', le] }],
        gap: [{ gap: [h] }],
        'gap-x': [{ 'gap-x': [h] }],
        'gap-y': [{ 'gap-y': [h] }],
        'justify-content': [{ justify: ['normal', ..._()] }],
        'justify-items': [{ 'justify-items': ['start', 'end', 'center', 'stretch'] }],
        'justify-self': [{ 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
        'align-content': [{ content: ['normal', ..._(), 'baseline'] }],
        'align-items': [{ items: ['start', 'end', 'center', 'baseline', 'stretch'] }],
        'align-self': [{ self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] }],
        'place-content': [{ 'place-content': [..._(), 'baseline'] }],
        'place-items': [{ 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] }],
        'place-self': [{ 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
        p: [{ p: [g] }],
        px: [{ px: [g] }],
        py: [{ py: [g] }],
        ps: [{ ps: [g] }],
        pe: [{ pe: [g] }],
        pt: [{ pt: [g] }],
        pr: [{ pr: [g] }],
        pb: [{ pb: [g] }],
        pl: [{ pl: [g] }],
        m: [{ m: [w] }],
        mx: [{ mx: [w] }],
        my: [{ my: [w] }],
        ms: [{ ms: [w] }],
        me: [{ me: [w] }],
        mt: [{ mt: [w] }],
        mr: [{ mr: [w] }],
        mb: [{ mb: [w] }],
        ml: [{ ml: [w] }],
        'space-x': [{ 'space-x': [N] }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': [N] }],
        'space-y-reverse': ['space-y-reverse'],
        w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', le, t] }],
        'min-w': [{ 'min-w': [le, t, 'min', 'max', 'fit'] }],
        'max-w': [{ 'max-w': [le, t, 'none', 'full', 'min', 'max', 'fit', 'prose', { screen: [Qn] }, Qn] }],
        h: [{ h: [le, t, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        'min-h': [{ 'min-h': [le, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        'max-h': [{ 'max-h': [le, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        size: [{ size: [le, t, 'auto', 'min', 'max', 'fit'] }],
        'font-size': [{ text: ['base', Qn, Zn] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', mu] }],
        'font-family': [{ font: [Jo] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', le] }],
        'line-clamp': [{ 'line-clamp': ['none', eo, mu] }],
        leading: [{ leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', Pn, le] }],
        'list-image': [{ 'list-image': ['none', le] }],
        'list-style-type': [{ list: ['none', 'disc', 'decimal', le] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'placeholder-color': [{ placeholder: [e] }],
        'placeholder-opacity': [{ 'placeholder-opacity': [x] }],
        'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
        'text-color': [{ text: [e] }],
        'text-opacity': [{ 'text-opacity': [x] }],
        'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
        'text-decoration-style': [{ decoration: [...I(), 'wavy'] }],
        'text-decoration-thickness': [{ decoration: ['auto', 'from-font', Pn, Zn] }],
        'underline-offset': [{ 'underline-offset': ['auto', Pn, le] }],
        'text-decoration-color': [{ decoration: [e] }],
        'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: $() }],
        'vertical-align': [{ align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', le] }],
        whitespace: [{ whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] }],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', le] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-opacity': [{ 'bg-opacity': [x] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: [...X(), hk] }],
        'bg-repeat': [{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] }],
        'bg-size': [{ bg: ['auto', 'cover', 'contain', pk] }],
        'bg-image': [{ bg: ['none', { 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, gk] }],
        'bg-color': [{ bg: [e] }],
        'gradient-from-pos': [{ from: [S] }],
        'gradient-via-pos': [{ via: [S] }],
        'gradient-to-pos': [{ to: [S] }],
        'gradient-from': [{ from: [m] }],
        'gradient-via': [{ via: [m] }],
        'gradient-to': [{ to: [m] }],
        rounded: [{ rounded: [o] }],
        'rounded-s': [{ 'rounded-s': [o] }],
        'rounded-e': [{ 'rounded-e': [o] }],
        'rounded-t': [{ 'rounded-t': [o] }],
        'rounded-r': [{ 'rounded-r': [o] }],
        'rounded-b': [{ 'rounded-b': [o] }],
        'rounded-l': [{ 'rounded-l': [o] }],
        'rounded-ss': [{ 'rounded-ss': [o] }],
        'rounded-se': [{ 'rounded-se': [o] }],
        'rounded-ee': [{ 'rounded-ee': [o] }],
        'rounded-es': [{ 'rounded-es': [o] }],
        'rounded-tl': [{ 'rounded-tl': [o] }],
        'rounded-tr': [{ 'rounded-tr': [o] }],
        'rounded-br': [{ 'rounded-br': [o] }],
        'rounded-bl': [{ 'rounded-bl': [o] }],
        'border-w': [{ border: [a] }],
        'border-w-x': [{ 'border-x': [a] }],
        'border-w-y': [{ 'border-y': [a] }],
        'border-w-s': [{ 'border-s': [a] }],
        'border-w-e': [{ 'border-e': [a] }],
        'border-w-t': [{ 'border-t': [a] }],
        'border-w-r': [{ 'border-r': [a] }],
        'border-w-b': [{ 'border-b': [a] }],
        'border-w-l': [{ 'border-l': [a] }],
        'border-opacity': [{ 'border-opacity': [x] }],
        'border-style': [{ border: [...I(), 'hidden'] }],
        'divide-x': [{ 'divide-x': [a] }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': [a] }],
        'divide-y-reverse': ['divide-y-reverse'],
        'divide-opacity': [{ 'divide-opacity': [x] }],
        'divide-style': [{ divide: I() }],
        'border-color': [{ border: [s] }],
        'border-color-x': [{ 'border-x': [s] }],
        'border-color-y': [{ 'border-y': [s] }],
        'border-color-s': [{ 'border-s': [s] }],
        'border-color-e': [{ 'border-e': [s] }],
        'border-color-t': [{ 'border-t': [s] }],
        'border-color-r': [{ 'border-r': [s] }],
        'border-color-b': [{ 'border-b': [s] }],
        'border-color-l': [{ 'border-l': [s] }],
        'divide-color': [{ divide: [s] }],
        'outline-style': [{ outline: ['', ...I()] }],
        'outline-offset': [{ 'outline-offset': [Pn, le] }],
        'outline-w': [{ outline: [Pn, Zn] }],
        'outline-color': [{ outline: [e] }],
        'ring-w': [{ ring: Y() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: [e] }],
        'ring-opacity': [{ 'ring-opacity': [x] }],
        'ring-offset-w': [{ 'ring-offset': [Pn, Zn] }],
        'ring-offset-color': [{ 'ring-offset': [e] }],
        shadow: [{ shadow: ['', 'inner', 'none', Qn, vk] }],
        'shadow-color': [{ shadow: [Jo] }],
        opacity: [{ opacity: [x] }],
        'mix-blend': [{ 'mix-blend': [...z(), 'plus-lighter', 'plus-darker'] }],
        'bg-blend': [{ 'bg-blend': z() }],
        filter: [{ filter: ['', 'none'] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [r] }],
        contrast: [{ contrast: [c] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', Qn, le] }],
        grayscale: [{ grayscale: [u] }],
        'hue-rotate': [{ 'hue-rotate': [f] }],
        invert: [{ invert: [p] }],
        saturate: [{ saturate: [y] }],
        sepia: [{ sepia: [C] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
        'backdrop-blur': [{ 'backdrop-blur': [n] }],
        'backdrop-brightness': [{ 'backdrop-brightness': [r] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [c] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': [u] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [f] }],
        'backdrop-invert': [{ 'backdrop-invert': [p] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [x] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [y] }],
        'backdrop-sepia': [{ 'backdrop-sepia': [C] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': [i] }],
        'border-spacing-x': [{ 'border-spacing-x': [i] }],
        'border-spacing-y': [{ 'border-spacing-y': [i] }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [{ transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', le] }],
        duration: [{ duration: Z() }],
        ease: [{ ease: ['linear', 'in', 'out', 'in-out', le] }],
        delay: [{ delay: Z() }],
        animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', le] }],
        transform: [{ transform: ['', 'gpu', 'none'] }],
        scale: [{ scale: [b] }],
        'scale-x': [{ 'scale-x': [b] }],
        'scale-y': [{ 'scale-y': [b] }],
        rotate: [{ rotate: [Xo, le] }],
        'translate-x': [{ 'translate-x': [P] }],
        'translate-y': [{ 'translate-y': [P] }],
        'skew-x': [{ 'skew-x': [k] }],
        'skew-y': [{ 'skew-y': [k] }],
        'transform-origin': [
          { origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', le] },
        ],
        accent: [{ accent: ['auto', e] }],
        appearance: [{ appearance: ['none', 'auto'] }],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              le,
            ],
          },
        ],
        'caret-color': [{ caret: [e] }],
        'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
        resize: [{ resize: ['none', 'y', 'x', ''] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': $() }],
        'scroll-mx': [{ 'scroll-mx': $() }],
        'scroll-my': [{ 'scroll-my': $() }],
        'scroll-ms': [{ 'scroll-ms': $() }],
        'scroll-me': [{ 'scroll-me': $() }],
        'scroll-mt': [{ 'scroll-mt': $() }],
        'scroll-mr': [{ 'scroll-mr': $() }],
        'scroll-mb': [{ 'scroll-mb': $() }],
        'scroll-ml': [{ 'scroll-ml': $() }],
        'scroll-p': [{ 'scroll-p': $() }],
        'scroll-px': [{ 'scroll-px': $() }],
        'scroll-py': [{ 'scroll-py': $() }],
        'scroll-ps': [{ 'scroll-ps': $() }],
        'scroll-pe': [{ 'scroll-pe': $() }],
        'scroll-pt': [{ 'scroll-pt': $() }],
        'scroll-pr': [{ 'scroll-pr': $() }],
        'scroll-pb': [{ 'scroll-pb': $() }],
        'scroll-pl': [{ 'scroll-pl': $() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', le] }],
        fill: [{ fill: [e, 'none'] }],
        'stroke-w': [{ stroke: [Pn, Zn, mu] }],
        stroke: [{ stroke: [e, 'none'] }],
        sr: ['sr-only', 'not-sr-only'],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': ['border-color-s', 'border-color-e', 'border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
    };
  },
  bk = rk(Sk);
function ne(...e) {
  return bk(Cx(e));
}
const Ck = EN,
  Ox = d.forwardRef(({ className: e, ...t }, n) =>
    l.jsx(gx, {
      ref: n,
      className: ne(
        'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
        e
      ),
      ...t,
    })
  );
Ox.displayName = gx.displayName;
const Ek = fc(
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
    {
      variants: {
        variant: {
          default: 'border bg-background text-foreground',
          destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
        },
      },
      defaultVariants: { variant: 'default' },
    }
  ),
  Lx = d.forwardRef(({ className: e, variant: t, ...n }, r) => l.jsx(vx, { ref: r, className: ne(Ek({ variant: t }), e), ...n }));
Lx.displayName = vx.displayName;
const Nk = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(wx, {
    ref: n,
    className: ne(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      e
    ),
    ...t,
  })
);
Nk.displayName = wx.displayName;
const Dx = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(Sx, {
    ref: n,
    className: ne(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      e
    ),
    'toast-close': '',
    ...t,
    children: l.jsx(na, { className: 'h-4 w-4' }),
  })
);
Dx.displayName = Sx.displayName;
const Fx = d.forwardRef(({ className: e, ...t }, n) => l.jsx(yx, { ref: n, className: ne('text-sm font-semibold', e), ...t }));
Fx.displayName = yx.displayName;
const $x = d.forwardRef(({ className: e, ...t }, n) => l.jsx(xx, { ref: n, className: ne('text-sm opacity-90', e), ...t }));
$x.displayName = xx.displayName;
function kk() {
  const { toasts: e } = AE();
  return l.jsxs(Ck, {
    children: [
      e.map(function ({ id: t, title: n, description: r, action: s, ...o }) {
        return l.jsxs(
          Lx,
          {
            ...o,
            children: [
              l.jsxs('div', { className: 'grid gap-1', children: [n && l.jsx(Fx, { children: n }), r && l.jsx($x, { children: r })] }),
              s,
              l.jsx(Dx, {}),
            ],
          },
          t
        );
      }),
      l.jsx(Ox, {}),
    ],
  });
}
var xm = ['light', 'dark'],
  _k = '(prefers-color-scheme: dark)',
  Pk = d.createContext(void 0),
  jk = { setTheme: e => {}, themes: [] },
  Tk = () => {
    var e;
    return (e = d.useContext(Pk)) != null ? e : jk;
  };
d.memo(
  ({
    forcedTheme: e,
    storageKey: t,
    attribute: n,
    enableSystem: r,
    enableColorScheme: s,
    defaultTheme: o,
    value: i,
    attrs: a,
    nonce: c,
  }) => {
    let u = o === 'system',
      f =
        n === 'class'
          ? `var d=document.documentElement,c=d.classList;${`c.remove(${a.map(S => `'${S}'`).join(',')})`};`
          : `var d=document.documentElement,n='${n}',s='setAttribute';`,
      p = s
        ? xm.includes(o) && o
          ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${o}'`
          : "if(e==='light'||e==='dark')d.style.colorScheme=e"
        : '',
      h = (S, v = !1, w = !0) => {
        let x = i ? i[S] : S,
          g = v ? S + "|| ''" : `'${x}'`,
          y = '';
        return (
          s && w && !v && xm.includes(S) && (y += `d.style.colorScheme = '${S}';`),
          n === 'class' ? (v || x ? (y += `c.add(${g})`) : (y += 'null')) : x && (y += `d[s](n,${g})`),
          y
        );
      },
      m = e
        ? `!function(){${f}${h(e)}}()`
        : r
          ? `!function(){try{${f}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${u})){var t='${_k}',m=window.matchMedia(t);if(m.media!==t||m.matches){${h('dark')}}else{${h('light')}}}else if(e){${i ? `var x=${JSON.stringify(i)};` : ''}${h(i ? 'x[e]' : 'e', !0)}}${u ? '' : 'else{' + h(o, !1, !1) + '}'}${p}}catch(e){}}()`
          : `!function(){try{${f}var e=localStorage.getItem('${t}');if(e){${i ? `var x=${JSON.stringify(i)};` : ''}${h(i ? 'x[e]' : 'e', !0)}}else{${h(o, !1, !1)};}${p}}catch(t){}}();`;
    return d.createElement('script', { nonce: c, dangerouslySetInnerHTML: { __html: m } });
  }
);
var Rk = e => {
    switch (e) {
      case 'success':
        return Mk;
      case 'info':
        return Lk;
      case 'warning':
        return Ok;
      case 'error':
        return Dk;
      default:
        return null;
    }
  },
  Ik = Array(12).fill(0),
  Ak = ({ visible: e, className: t }) =>
    D.createElement(
      'div',
      { className: ['sonner-loading-wrapper', t].filter(Boolean).join(' '), 'data-visible': e },
      D.createElement(
        'div',
        { className: 'sonner-spinner' },
        Ik.map((n, r) => D.createElement('div', { className: 'sonner-loading-bar', key: `spinner-bar-${r}` }))
      )
    ),
  Mk = D.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', height: '20', width: '20' },
    D.createElement('path', {
      fillRule: 'evenodd',
      d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
      clipRule: 'evenodd',
    })
  ),
  Ok = D.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor', height: '20', width: '20' },
    D.createElement('path', {
      fillRule: 'evenodd',
      d: 'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z',
      clipRule: 'evenodd',
    })
  ),
  Lk = D.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', height: '20', width: '20' },
    D.createElement('path', {
      fillRule: 'evenodd',
      d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z',
      clipRule: 'evenodd',
    })
  ),
  Dk = D.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', height: '20', width: '20' },
    D.createElement('path', {
      fillRule: 'evenodd',
      d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z',
      clipRule: 'evenodd',
    })
  ),
  Fk = D.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '12',
      height: '12',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '1.5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    D.createElement('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
    D.createElement('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
  ),
  $k = () => {
    let [e, t] = D.useState(document.hidden);
    return (
      D.useEffect(() => {
        let n = () => {
          t(document.hidden);
        };
        return (document.addEventListener('visibilitychange', n), () => window.removeEventListener('visibilitychange', n));
      }, []),
      e
    );
  },
  Td = 1,
  zk = class {
    constructor() {
      ((this.subscribe = e => (
        this.subscribers.push(e),
        () => {
          let t = this.subscribers.indexOf(e);
          this.subscribers.splice(t, 1);
        }
      )),
        (this.publish = e => {
          this.subscribers.forEach(t => t(e));
        }),
        (this.addToast = e => {
          (this.publish(e), (this.toasts = [...this.toasts, e]));
        }),
        (this.create = e => {
          var t;
          let { message: n, ...r } = e,
            s = typeof (e == null ? void 0 : e.id) == 'number' || ((t = e.id) == null ? void 0 : t.length) > 0 ? e.id : Td++,
            o = this.toasts.find(a => a.id === s),
            i = e.dismissible === void 0 ? !0 : e.dismissible;
          return (
            this.dismissedToasts.has(s) && this.dismissedToasts.delete(s),
            o
              ? (this.toasts = this.toasts.map(a =>
                  a.id === s ? (this.publish({ ...a, ...e, id: s, title: n }), { ...a, ...e, id: s, dismissible: i, title: n }) : a
                ))
              : this.addToast({ title: n, ...r, dismissible: i, id: s }),
            s
          );
        }),
        (this.dismiss = e => (
          this.dismissedToasts.add(e),
          e ||
            this.toasts.forEach(t => {
              this.subscribers.forEach(n => n({ id: t.id, dismiss: !0 }));
            }),
          this.subscribers.forEach(t => t({ id: e, dismiss: !0 })),
          e
        )),
        (this.message = (e, t) => this.create({ ...t, message: e })),
        (this.error = (e, t) => this.create({ ...t, message: e, type: 'error' })),
        (this.success = (e, t) => this.create({ ...t, type: 'success', message: e })),
        (this.info = (e, t) => this.create({ ...t, type: 'info', message: e })),
        (this.warning = (e, t) => this.create({ ...t, type: 'warning', message: e })),
        (this.loading = (e, t) => this.create({ ...t, type: 'loading', message: e })),
        (this.promise = (e, t) => {
          if (!t) return;
          let n;
          t.loading !== void 0 &&
            (n = this.create({
              ...t,
              promise: e,
              type: 'loading',
              message: t.loading,
              description: typeof t.description != 'function' ? t.description : void 0,
            }));
          let r = e instanceof Promise ? e : e(),
            s = n !== void 0,
            o,
            i = r
              .then(async c => {
                if (((o = ['resolve', c]), D.isValidElement(c))) ((s = !1), this.create({ id: n, type: 'default', message: c }));
                else if (Uk(c) && !c.ok) {
                  s = !1;
                  let u = typeof t.error == 'function' ? await t.error(`HTTP error! status: ${c.status}`) : t.error,
                    f = typeof t.description == 'function' ? await t.description(`HTTP error! status: ${c.status}`) : t.description;
                  this.create({ id: n, type: 'error', message: u, description: f });
                } else if (t.success !== void 0) {
                  s = !1;
                  let u = typeof t.success == 'function' ? await t.success(c) : t.success,
                    f = typeof t.description == 'function' ? await t.description(c) : t.description;
                  this.create({ id: n, type: 'success', message: u, description: f });
                }
              })
              .catch(async c => {
                if (((o = ['reject', c]), t.error !== void 0)) {
                  s = !1;
                  let u = typeof t.error == 'function' ? await t.error(c) : t.error,
                    f = typeof t.description == 'function' ? await t.description(c) : t.description;
                  this.create({ id: n, type: 'error', message: u, description: f });
                }
              })
              .finally(() => {
                var c;
                (s && (this.dismiss(n), (n = void 0)), (c = t.finally) == null || c.call(t));
              }),
            a = () => new Promise((c, u) => i.then(() => (o[0] === 'reject' ? u(o[1]) : c(o[1]))).catch(u));
          return typeof n != 'string' && typeof n != 'number' ? { unwrap: a } : Object.assign(n, { unwrap: a });
        }),
        (this.custom = (e, t) => {
          let n = (t == null ? void 0 : t.id) || Td++;
          return (this.create({ jsx: e(n), id: n, ...t }), n);
        }),
        (this.getActiveToasts = () => this.toasts.filter(e => !this.dismissedToasts.has(e.id))),
        (this.subscribers = []),
        (this.toasts = []),
        (this.dismissedToasts = new Set()));
    }
  },
  gt = new zk(),
  Vk = (e, t) => {
    let n = (t == null ? void 0 : t.id) || Td++;
    return (gt.addToast({ title: e, ...t, id: n }), n);
  },
  Uk = e => e && typeof e == 'object' && 'ok' in e && typeof e.ok == 'boolean' && 'status' in e && typeof e.status == 'number',
  Bk = Vk,
  Wk = () => gt.toasts,
  Hk = () => gt.getActiveToasts();
Object.assign(
  Bk,
  {
    success: gt.success,
    info: gt.info,
    warning: gt.warning,
    error: gt.error,
    custom: gt.custom,
    message: gt.message,
    promise: gt.promise,
    dismiss: gt.dismiss,
    loading: gt.loading,
  },
  { getHistory: Wk, getToasts: Hk }
);
function Gk(e, { insertAt: t } = {}) {
  if (typeof document > 'u') return;
  let n = document.head || document.getElementsByTagName('head')[0],
    r = document.createElement('style');
  ((r.type = 'text/css'),
    t === 'top' && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r),
    r.styleSheet ? (r.styleSheet.cssText = e) : r.appendChild(document.createTextNode(e)));
}
Gk(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function ja(e) {
  return e.label !== void 0;
}
var Kk = 3,
  Zk = '32px',
  Qk = '16px',
  wm = 4e3,
  qk = 356,
  Yk = 14,
  Xk = 20,
  Jk = 200;
function qt(...e) {
  return e.filter(Boolean).join(' ');
}
function e_(e) {
  let [t, n] = e.split('-'),
    r = [];
  return (t && r.push(t), n && r.push(n), r);
}
var t_ = e => {
  var t, n, r, s, o, i, a, c, u, f, p;
  let {
      invert: h,
      toast: m,
      unstyled: S,
      interacting: v,
      setHeights: w,
      visibleToasts: x,
      heights: g,
      index: y,
      toasts: b,
      expanded: C,
      removeToast: k,
      defaultRichColors: N,
      closeButton: P,
      style: T,
      cancelButtonStyle: R,
      actionButtonStyle: H,
      className: $ = '',
      descriptionClassName: Y = '',
      duration: O,
      position: X,
      gap: I,
      loadingIcon: z,
      expandByDefault: _,
      classNames: E,
      icons: A,
      closeButtonAriaLabel: Z = 'Close toast',
      pauseWhenPageIsHidden: W,
    } = e,
    [J, V] = D.useState(null),
    [pe, ge] = D.useState(null),
    [F, he] = D.useState(!1),
    [me, G] = D.useState(!1),
    [ee, re] = D.useState(!1),
    [Oe, Je] = D.useState(!1),
    [Dr, Bn] = D.useState(!1),
    [Fr, Vo] = D.useState(0),
    [Es, Gp] = D.useState(0),
    Uo = D.useRef(m.duration || O || wm),
    Kp = D.useRef(null),
    $r = D.useRef(null),
    HS = y === 0,
    GS = y + 1 <= x,
    Mt = m.type,
    Ns = m.dismissible !== !1,
    KS = m.className || '',
    ZS = m.descriptionClassName || '',
    la = D.useMemo(() => g.findIndex(ie => ie.toastId === m.id) || 0, [g, m.id]),
    QS = D.useMemo(() => {
      var ie;
      return (ie = m.closeButton) != null ? ie : P;
    }, [m.closeButton, P]),
    Zp = D.useMemo(() => m.duration || O || wm, [m.duration, O]),
    Dc = D.useRef(0),
    ks = D.useRef(0),
    Qp = D.useRef(0),
    _s = D.useRef(null),
    [qS, YS] = X.split('-'),
    qp = D.useMemo(() => g.reduce((ie, Ee, Te) => (Te >= la ? ie : ie + Ee.height), 0), [g, la]),
    Yp = $k(),
    XS = m.invert || h,
    Fc = Mt === 'loading';
  ((ks.current = D.useMemo(() => la * I + qp, [la, qp])),
    D.useEffect(() => {
      Uo.current = Zp;
    }, [Zp]),
    D.useEffect(() => {
      he(!0);
    }, []),
    D.useEffect(() => {
      let ie = $r.current;
      if (ie) {
        let Ee = ie.getBoundingClientRect().height;
        return (
          Gp(Ee),
          w(Te => [{ toastId: m.id, height: Ee, position: m.position }, ...Te]),
          () => w(Te => Te.filter(Gt => Gt.toastId !== m.id))
        );
      }
    }, [w, m.id]),
    D.useLayoutEffect(() => {
      if (!F) return;
      let ie = $r.current,
        Ee = ie.style.height;
      ie.style.height = 'auto';
      let Te = ie.getBoundingClientRect().height;
      ((ie.style.height = Ee),
        Gp(Te),
        w(Gt =>
          Gt.find(Kt => Kt.toastId === m.id)
            ? Gt.map(Kt => (Kt.toastId === m.id ? { ...Kt, height: Te } : Kt))
            : [{ toastId: m.id, height: Te, position: m.position }, ...Gt]
        ));
    }, [F, m.title, m.description, w, m.id]));
  let Wn = D.useCallback(() => {
    (G(!0),
      Vo(ks.current),
      w(ie => ie.filter(Ee => Ee.toastId !== m.id)),
      setTimeout(() => {
        k(m);
      }, Jk));
  }, [m, k, w, ks]);
  (D.useEffect(() => {
    if ((m.promise && Mt === 'loading') || m.duration === 1 / 0 || m.type === 'loading') return;
    let ie;
    return (
      C || v || (W && Yp)
        ? (() => {
            if (Qp.current < Dc.current) {
              let Ee = new Date().getTime() - Dc.current;
              Uo.current = Uo.current - Ee;
            }
            Qp.current = new Date().getTime();
          })()
        : Uo.current !== 1 / 0 &&
          ((Dc.current = new Date().getTime()),
          (ie = setTimeout(() => {
            var Ee;
            ((Ee = m.onAutoClose) == null || Ee.call(m, m), Wn());
          }, Uo.current))),
      () => clearTimeout(ie)
    );
  }, [C, v, m, Mt, W, Yp, Wn]),
    D.useEffect(() => {
      m.delete && Wn();
    }, [Wn, m.delete]));
  function JS() {
    var ie, Ee, Te;
    return A != null && A.loading
      ? D.createElement(
          'div',
          {
            className: qt(
              E == null ? void 0 : E.loader,
              (ie = m == null ? void 0 : m.classNames) == null ? void 0 : ie.loader,
              'sonner-loader'
            ),
            'data-visible': Mt === 'loading',
          },
          A.loading
        )
      : z
        ? D.createElement(
            'div',
            {
              className: qt(
                E == null ? void 0 : E.loader,
                (Ee = m == null ? void 0 : m.classNames) == null ? void 0 : Ee.loader,
                'sonner-loader'
              ),
              'data-visible': Mt === 'loading',
            },
            z
          )
        : D.createElement(Ak, {
            className: qt(E == null ? void 0 : E.loader, (Te = m == null ? void 0 : m.classNames) == null ? void 0 : Te.loader),
            visible: Mt === 'loading',
          });
  }
  return D.createElement(
    'li',
    {
      tabIndex: 0,
      ref: $r,
      className: qt(
        $,
        KS,
        E == null ? void 0 : E.toast,
        (t = m == null ? void 0 : m.classNames) == null ? void 0 : t.toast,
        E == null ? void 0 : E.default,
        E == null ? void 0 : E[Mt],
        (n = m == null ? void 0 : m.classNames) == null ? void 0 : n[Mt]
      ),
      'data-sonner-toast': '',
      'data-rich-colors': (r = m.richColors) != null ? r : N,
      'data-styled': !(m.jsx || m.unstyled || S),
      'data-mounted': F,
      'data-promise': !!m.promise,
      'data-swiped': Dr,
      'data-removed': me,
      'data-visible': GS,
      'data-y-position': qS,
      'data-x-position': YS,
      'data-index': y,
      'data-front': HS,
      'data-swiping': ee,
      'data-dismissible': Ns,
      'data-type': Mt,
      'data-invert': XS,
      'data-swipe-out': Oe,
      'data-swipe-direction': pe,
      'data-expanded': !!(C || (_ && F)),
      style: {
        '--index': y,
        '--toasts-before': y,
        '--z-index': b.length - y,
        '--offset': `${me ? Fr : ks.current}px`,
        '--initial-height': _ ? 'auto' : `${Es}px`,
        ...T,
        ...m.style,
      },
      onDragEnd: () => {
        (re(!1), V(null), (_s.current = null));
      },
      onPointerDown: ie => {
        Fc ||
          !Ns ||
          ((Kp.current = new Date()),
          Vo(ks.current),
          ie.target.setPointerCapture(ie.pointerId),
          ie.target.tagName !== 'BUTTON' && (re(!0), (_s.current = { x: ie.clientX, y: ie.clientY })));
      },
      onPointerUp: () => {
        var ie, Ee, Te, Gt;
        if (Oe || !Ns) return;
        _s.current = null;
        let Kt = Number(((ie = $r.current) == null ? void 0 : ie.style.getPropertyValue('--swipe-amount-x').replace('px', '')) || 0),
          Hn = Number(((Ee = $r.current) == null ? void 0 : Ee.style.getPropertyValue('--swipe-amount-y').replace('px', '')) || 0),
          zr = new Date().getTime() - ((Te = Kp.current) == null ? void 0 : Te.getTime()),
          Zt = J === 'x' ? Kt : Hn,
          Gn = Math.abs(Zt) / zr;
        if (Math.abs(Zt) >= Xk || Gn > 0.11) {
          (Vo(ks.current),
            (Gt = m.onDismiss) == null || Gt.call(m, m),
            ge(J === 'x' ? (Kt > 0 ? 'right' : 'left') : Hn > 0 ? 'down' : 'up'),
            Wn(),
            Je(!0),
            Bn(!1));
          return;
        }
        (re(!1), V(null));
      },
      onPointerMove: ie => {
        var Ee, Te, Gt, Kt;
        if (!_s.current || !Ns || ((Ee = window.getSelection()) == null ? void 0 : Ee.toString().length) > 0) return;
        let Hn = ie.clientY - _s.current.y,
          zr = ie.clientX - _s.current.x,
          Zt = (Te = e.swipeDirections) != null ? Te : e_(X);
        !J && (Math.abs(zr) > 1 || Math.abs(Hn) > 1) && V(Math.abs(zr) > Math.abs(Hn) ? 'x' : 'y');
        let Gn = { x: 0, y: 0 };
        (J === 'y'
          ? (Zt.includes('top') || Zt.includes('bottom')) &&
            ((Zt.includes('top') && Hn < 0) || (Zt.includes('bottom') && Hn > 0)) &&
            (Gn.y = Hn)
          : J === 'x' &&
            (Zt.includes('left') || Zt.includes('right')) &&
            ((Zt.includes('left') && zr < 0) || (Zt.includes('right') && zr > 0)) &&
            (Gn.x = zr),
          (Math.abs(Gn.x) > 0 || Math.abs(Gn.y) > 0) && Bn(!0),
          (Gt = $r.current) == null || Gt.style.setProperty('--swipe-amount-x', `${Gn.x}px`),
          (Kt = $r.current) == null || Kt.style.setProperty('--swipe-amount-y', `${Gn.y}px`));
      },
    },
    QS && !m.jsx
      ? D.createElement(
          'button',
          {
            'aria-label': Z,
            'data-disabled': Fc,
            'data-close-button': !0,
            onClick:
              Fc || !Ns
                ? () => {}
                : () => {
                    var ie;
                    (Wn(), (ie = m.onDismiss) == null || ie.call(m, m));
                  },
            className: qt(E == null ? void 0 : E.closeButton, (s = m == null ? void 0 : m.classNames) == null ? void 0 : s.closeButton),
          },
          (o = A == null ? void 0 : A.close) != null ? o : Fk
        )
      : null,
    m.jsx || d.isValidElement(m.title)
      ? m.jsx
        ? m.jsx
        : typeof m.title == 'function'
          ? m.title()
          : m.title
      : D.createElement(
          D.Fragment,
          null,
          Mt || m.icon || m.promise
            ? D.createElement(
                'div',
                {
                  'data-icon': '',
                  className: qt(E == null ? void 0 : E.icon, (i = m == null ? void 0 : m.classNames) == null ? void 0 : i.icon),
                },
                m.promise || (m.type === 'loading' && !m.icon) ? m.icon || JS() : null,
                m.type !== 'loading' ? m.icon || (A == null ? void 0 : A[Mt]) || Rk(Mt) : null
              )
            : null,
          D.createElement(
            'div',
            {
              'data-content': '',
              className: qt(E == null ? void 0 : E.content, (a = m == null ? void 0 : m.classNames) == null ? void 0 : a.content),
            },
            D.createElement(
              'div',
              {
                'data-title': '',
                className: qt(E == null ? void 0 : E.title, (c = m == null ? void 0 : m.classNames) == null ? void 0 : c.title),
              },
              typeof m.title == 'function' ? m.title() : m.title
            ),
            m.description
              ? D.createElement(
                  'div',
                  {
                    'data-description': '',
                    className: qt(
                      Y,
                      ZS,
                      E == null ? void 0 : E.description,
                      (u = m == null ? void 0 : m.classNames) == null ? void 0 : u.description
                    ),
                  },
                  typeof m.description == 'function' ? m.description() : m.description
                )
              : null
          ),
          d.isValidElement(m.cancel)
            ? m.cancel
            : m.cancel && ja(m.cancel)
              ? D.createElement(
                  'button',
                  {
                    'data-button': !0,
                    'data-cancel': !0,
                    style: m.cancelButtonStyle || R,
                    onClick: ie => {
                      var Ee, Te;
                      ja(m.cancel) && Ns && ((Te = (Ee = m.cancel).onClick) == null || Te.call(Ee, ie), Wn());
                    },
                    className: qt(
                      E == null ? void 0 : E.cancelButton,
                      (f = m == null ? void 0 : m.classNames) == null ? void 0 : f.cancelButton
                    ),
                  },
                  m.cancel.label
                )
              : null,
          d.isValidElement(m.action)
            ? m.action
            : m.action && ja(m.action)
              ? D.createElement(
                  'button',
                  {
                    'data-button': !0,
                    'data-action': !0,
                    style: m.actionButtonStyle || H,
                    onClick: ie => {
                      var Ee, Te;
                      ja(m.action) && ((Te = (Ee = m.action).onClick) == null || Te.call(Ee, ie), !ie.defaultPrevented && Wn());
                    },
                    className: qt(
                      E == null ? void 0 : E.actionButton,
                      (p = m == null ? void 0 : m.classNames) == null ? void 0 : p.actionButton
                    ),
                  },
                  m.action.label
                )
              : null
        )
  );
};
function Sm() {
  if (typeof window > 'u' || typeof document > 'u') return 'ltr';
  let e = document.documentElement.getAttribute('dir');
  return e === 'auto' || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function n_(e, t) {
  let n = {};
  return (
    [e, t].forEach((r, s) => {
      let o = s === 1,
        i = o ? '--mobile-offset' : '--offset',
        a = o ? Qk : Zk;
      function c(u) {
        ['top', 'right', 'bottom', 'left'].forEach(f => {
          n[`${i}-${f}`] = typeof u == 'number' ? `${u}px` : u;
        });
      }
      typeof r == 'number' || typeof r == 'string'
        ? c(r)
        : typeof r == 'object'
          ? ['top', 'right', 'bottom', 'left'].forEach(u => {
              r[u] === void 0 ? (n[`${i}-${u}`] = a) : (n[`${i}-${u}`] = typeof r[u] == 'number' ? `${r[u]}px` : r[u]);
            })
          : c(a);
    }),
    n
  );
}
var r_ = d.forwardRef(function (e, t) {
  let {
      invert: n,
      position: r = 'bottom-right',
      hotkey: s = ['altKey', 'KeyT'],
      expand: o,
      closeButton: i,
      className: a,
      offset: c,
      mobileOffset: u,
      theme: f = 'light',
      richColors: p,
      duration: h,
      style: m,
      visibleToasts: S = Kk,
      toastOptions: v,
      dir: w = Sm(),
      gap: x = Yk,
      loadingIcon: g,
      icons: y,
      containerAriaLabel: b = 'Notifications',
      pauseWhenPageIsHidden: C,
    } = e,
    [k, N] = D.useState([]),
    P = D.useMemo(() => Array.from(new Set([r].concat(k.filter(W => W.position).map(W => W.position)))), [k, r]),
    [T, R] = D.useState([]),
    [H, $] = D.useState(!1),
    [Y, O] = D.useState(!1),
    [X, I] = D.useState(
      f !== 'system'
        ? f
        : typeof window < 'u' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    ),
    z = D.useRef(null),
    _ = s.join('+').replace(/Key/g, '').replace(/Digit/g, ''),
    E = D.useRef(null),
    A = D.useRef(!1),
    Z = D.useCallback(W => {
      N(J => {
        var V;
        return (((V = J.find(pe => pe.id === W.id)) != null && V.delete) || gt.dismiss(W.id), J.filter(({ id: pe }) => pe !== W.id));
      });
    }, []);
  return (
    D.useEffect(
      () =>
        gt.subscribe(W => {
          if (W.dismiss) {
            N(J => J.map(V => (V.id === W.id ? { ...V, delete: !0 } : V)));
            return;
          }
          setTimeout(() => {
            qy.flushSync(() => {
              N(J => {
                let V = J.findIndex(pe => pe.id === W.id);
                return V !== -1 ? [...J.slice(0, V), { ...J[V], ...W }, ...J.slice(V + 1)] : [W, ...J];
              });
            });
          });
        }),
      []
    ),
    D.useEffect(() => {
      if (f !== 'system') {
        I(f);
        return;
      }
      if (
        (f === 'system' && (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? I('dark') : I('light')),
        typeof window > 'u')
      )
        return;
      let W = window.matchMedia('(prefers-color-scheme: dark)');
      try {
        W.addEventListener('change', ({ matches: J }) => {
          I(J ? 'dark' : 'light');
        });
      } catch {
        W.addListener(({ matches: V }) => {
          try {
            I(V ? 'dark' : 'light');
          } catch (pe) {
            console.error(pe);
          }
        });
      }
    }, [f]),
    D.useEffect(() => {
      k.length <= 1 && $(!1);
    }, [k]),
    D.useEffect(() => {
      let W = J => {
        var V, pe;
        (s.every(ge => J[ge] || J.code === ge) && ($(!0), (V = z.current) == null || V.focus()),
          J.code === 'Escape' &&
            (document.activeElement === z.current || ((pe = z.current) != null && pe.contains(document.activeElement))) &&
            $(!1));
      };
      return (document.addEventListener('keydown', W), () => document.removeEventListener('keydown', W));
    }, [s]),
    D.useEffect(() => {
      if (z.current)
        return () => {
          E.current && (E.current.focus({ preventScroll: !0 }), (E.current = null), (A.current = !1));
        };
    }, [z.current]),
    D.createElement(
      'section',
      {
        ref: t,
        'aria-label': `${b} ${_}`,
        tabIndex: -1,
        'aria-live': 'polite',
        'aria-relevant': 'additions text',
        'aria-atomic': 'false',
        suppressHydrationWarning: !0,
      },
      P.map((W, J) => {
        var V;
        let [pe, ge] = W.split('-');
        return k.length
          ? D.createElement(
              'ol',
              {
                key: W,
                dir: w === 'auto' ? Sm() : w,
                tabIndex: -1,
                ref: z,
                className: a,
                'data-sonner-toaster': !0,
                'data-theme': X,
                'data-y-position': pe,
                'data-lifted': H && k.length > 1 && !o,
                'data-x-position': ge,
                style: {
                  '--front-toast-height': `${((V = T[0]) == null ? void 0 : V.height) || 0}px`,
                  '--width': `${qk}px`,
                  '--gap': `${x}px`,
                  ...m,
                  ...n_(c, u),
                },
                onBlur: F => {
                  A.current &&
                    !F.currentTarget.contains(F.relatedTarget) &&
                    ((A.current = !1), E.current && (E.current.focus({ preventScroll: !0 }), (E.current = null)));
                },
                onFocus: F => {
                  (F.target instanceof HTMLElement && F.target.dataset.dismissible === 'false') ||
                    A.current ||
                    ((A.current = !0), (E.current = F.relatedTarget));
                },
                onMouseEnter: () => $(!0),
                onMouseMove: () => $(!0),
                onMouseLeave: () => {
                  Y || $(!1);
                },
                onDragEnd: () => $(!1),
                onPointerDown: F => {
                  (F.target instanceof HTMLElement && F.target.dataset.dismissible === 'false') || O(!0);
                },
                onPointerUp: () => O(!1),
              },
              k
                .filter(F => (!F.position && J === 0) || F.position === W)
                .map((F, he) => {
                  var me, G;
                  return D.createElement(t_, {
                    key: F.id,
                    icons: y,
                    index: he,
                    toast: F,
                    defaultRichColors: p,
                    duration: (me = v == null ? void 0 : v.duration) != null ? me : h,
                    className: v == null ? void 0 : v.className,
                    descriptionClassName: v == null ? void 0 : v.descriptionClassName,
                    invert: n,
                    visibleToasts: S,
                    closeButton: (G = v == null ? void 0 : v.closeButton) != null ? G : i,
                    interacting: Y,
                    position: W,
                    style: v == null ? void 0 : v.style,
                    unstyled: v == null ? void 0 : v.unstyled,
                    classNames: v == null ? void 0 : v.classNames,
                    cancelButtonStyle: v == null ? void 0 : v.cancelButtonStyle,
                    actionButtonStyle: v == null ? void 0 : v.actionButtonStyle,
                    removeToast: Z,
                    toasts: k.filter(ee => ee.position == F.position),
                    heights: T.filter(ee => ee.position == F.position),
                    setHeights: R,
                    expandByDefault: o,
                    gap: x,
                    loadingIcon: g,
                    expanded: H,
                    pauseWhenPageIsHidden: C,
                    swipeDirections: e.swipeDirections,
                  });
                })
            )
          : null;
      })
    )
  );
});
const s_ = ({ ...e }) => {
  const { theme: t = 'system' } = Tk();
  return l.jsx(r_, {
    theme: t,
    className: 'toaster group',
    toastOptions: {
      classNames: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    },
    ...e,
  });
};
var o_ = uf[' useId '.trim().toString()] || (() => {}),
  i_ = 0;
function bn(e) {
  const [t, n] = d.useState(o_());
  return (
    Ue(() => {
      n(r => r ?? String(i_++));
    }, [e]),
    t ? `radix-${t}` : ''
  );
}
const a_ = ['top', 'right', 'bottom', 'left'],
  _r = Math.min,
  Et = Math.max,
  _l = Math.round,
  Ta = Math.floor,
  Cn = e => ({ x: e, y: e }),
  l_ = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
  c_ = { start: 'end', end: 'start' };
function Rd(e, t, n) {
  return Et(e, _r(t, n));
}
function zn(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Vn(e) {
  return e.split('-')[0];
}
function Lo(e) {
  return e.split('-')[1];
}
function ap(e) {
  return e === 'x' ? 'y' : 'x';
}
function lp(e) {
  return e === 'y' ? 'height' : 'width';
}
const u_ = new Set(['top', 'bottom']);
function xn(e) {
  return u_.has(Vn(e)) ? 'y' : 'x';
}
function cp(e) {
  return ap(xn(e));
}
function d_(e, t, n) {
  n === void 0 && (n = !1);
  const r = Lo(e),
    s = cp(e),
    o = lp(s);
  let i = s === 'x' ? (r === (n ? 'end' : 'start') ? 'right' : 'left') : r === 'start' ? 'bottom' : 'top';
  return (t.reference[o] > t.floating[o] && (i = Pl(i)), [i, Pl(i)]);
}
function f_(e) {
  const t = Pl(e);
  return [Id(e), t, Id(t)];
}
function Id(e) {
  return e.replace(/start|end/g, t => c_[t]);
}
const bm = ['left', 'right'],
  Cm = ['right', 'left'],
  p_ = ['top', 'bottom'],
  h_ = ['bottom', 'top'];
function m_(e, t, n) {
  switch (e) {
    case 'top':
    case 'bottom':
      return n ? (t ? Cm : bm) : t ? bm : Cm;
    case 'left':
    case 'right':
      return t ? p_ : h_;
    default:
      return [];
  }
}
function g_(e, t, n, r) {
  const s = Lo(e);
  let o = m_(Vn(e), n === 'start', r);
  return (s && ((o = o.map(i => i + '-' + s)), t && (o = o.concat(o.map(Id)))), o);
}
function Pl(e) {
  return e.replace(/left|right|bottom|top/g, t => l_[t]);
}
function v_(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function zx(e) {
  return typeof e != 'number' ? v_(e) : { top: e, right: e, bottom: e, left: e };
}
function jl(e) {
  const { x: t, y: n, width: r, height: s } = e;
  return { width: r, height: s, top: n, left: t, right: t + r, bottom: n + s, x: t, y: n };
}
function Em(e, t, n) {
  let { reference: r, floating: s } = e;
  const o = xn(t),
    i = cp(t),
    a = lp(i),
    c = Vn(t),
    u = o === 'y',
    f = r.x + r.width / 2 - s.width / 2,
    p = r.y + r.height / 2 - s.height / 2,
    h = r[a] / 2 - s[a] / 2;
  let m;
  switch (c) {
    case 'top':
      m = { x: f, y: r.y - s.height };
      break;
    case 'bottom':
      m = { x: f, y: r.y + r.height };
      break;
    case 'right':
      m = { x: r.x + r.width, y: p };
      break;
    case 'left':
      m = { x: r.x - s.width, y: p };
      break;
    default:
      m = { x: r.x, y: r.y };
  }
  switch (Lo(t)) {
    case 'start':
      m[i] -= h * (n && u ? -1 : 1);
      break;
    case 'end':
      m[i] += h * (n && u ? -1 : 1);
      break;
  }
  return m;
}
const y_ = async (e, t, n) => {
  const { placement: r = 'bottom', strategy: s = 'absolute', middleware: o = [], platform: i } = n,
    a = o.filter(Boolean),
    c = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let u = await i.getElementRects({ reference: e, floating: t, strategy: s }),
    { x: f, y: p } = Em(u, r, c),
    h = r,
    m = {},
    S = 0;
  for (let v = 0; v < a.length; v++) {
    const { name: w, fn: x } = a[v],
      {
        x: g,
        y,
        data: b,
        reset: C,
      } = await x({
        x: f,
        y: p,
        initialPlacement: r,
        placement: h,
        strategy: s,
        middlewareData: m,
        rects: u,
        platform: i,
        elements: { reference: e, floating: t },
      });
    ((f = g ?? f),
      (p = y ?? p),
      (m = { ...m, [w]: { ...m[w], ...b } }),
      C &&
        S <= 50 &&
        (S++,
        typeof C == 'object' &&
          (C.placement && (h = C.placement),
          C.rects && (u = C.rects === !0 ? await i.getElementRects({ reference: e, floating: t, strategy: s }) : C.rects),
          ({ x: f, y: p } = Em(u, h, c))),
        (v = -1)));
  }
  return { x: f, y: p, placement: h, strategy: s, middlewareData: m };
};
async function Di(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: s, platform: o, rects: i, elements: a, strategy: c } = e,
    {
      boundary: u = 'clippingAncestors',
      rootBoundary: f = 'viewport',
      elementContext: p = 'floating',
      altBoundary: h = !1,
      padding: m = 0,
    } = zn(t, e),
    S = zx(m),
    w = a[h ? (p === 'floating' ? 'reference' : 'floating') : p],
    x = jl(
      await o.getClippingRect({
        element:
          (n = await (o.isElement == null ? void 0 : o.isElement(w))) == null || n
            ? w
            : w.contextElement || (await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(a.floating))),
        boundary: u,
        rootBoundary: f,
        strategy: c,
      })
    ),
    g = p === 'floating' ? { x: r, y: s, width: i.floating.width, height: i.floating.height } : i.reference,
    y = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(a.floating)),
    b = (await (o.isElement == null ? void 0 : o.isElement(y)))
      ? (await (o.getScale == null ? void 0 : o.getScale(y))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    C = jl(
      o.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: a, rect: g, offsetParent: y, strategy: c })
        : g
    );
  return {
    top: (x.top - C.top + S.top) / b.y,
    bottom: (C.bottom - x.bottom + S.bottom) / b.y,
    left: (x.left - C.left + S.left) / b.x,
    right: (C.right - x.right + S.right) / b.x,
  };
}
const x_ = e => ({
    name: 'arrow',
    options: e,
    async fn(t) {
      const { x: n, y: r, placement: s, rects: o, platform: i, elements: a, middlewareData: c } = t,
        { element: u, padding: f = 0 } = zn(e, t) || {};
      if (u == null) return {};
      const p = zx(f),
        h = { x: n, y: r },
        m = cp(s),
        S = lp(m),
        v = await i.getDimensions(u),
        w = m === 'y',
        x = w ? 'top' : 'left',
        g = w ? 'bottom' : 'right',
        y = w ? 'clientHeight' : 'clientWidth',
        b = o.reference[S] + o.reference[m] - h[m] - o.floating[S],
        C = h[m] - o.reference[m],
        k = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(u));
      let N = k ? k[y] : 0;
      (!N || !(await (i.isElement == null ? void 0 : i.isElement(k)))) && (N = a.floating[y] || o.floating[S]);
      const P = b / 2 - C / 2,
        T = N / 2 - v[S] / 2 - 1,
        R = _r(p[x], T),
        H = _r(p[g], T),
        $ = R,
        Y = N - v[S] - H,
        O = N / 2 - v[S] / 2 + P,
        X = Rd($, O, Y),
        I = !c.arrow && Lo(s) != null && O !== X && o.reference[S] / 2 - (O < $ ? R : H) - v[S] / 2 < 0,
        z = I ? (O < $ ? O - $ : O - Y) : 0;
      return { [m]: h[m] + z, data: { [m]: X, centerOffset: O - X - z, ...(I && { alignmentOffset: z }) }, reset: I };
    },
  }),
  w_ = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn(t) {
          var n, r;
          const { placement: s, middlewareData: o, rects: i, initialPlacement: a, platform: c, elements: u } = t,
            {
              mainAxis: f = !0,
              crossAxis: p = !0,
              fallbackPlacements: h,
              fallbackStrategy: m = 'bestFit',
              fallbackAxisSideDirection: S = 'none',
              flipAlignment: v = !0,
              ...w
            } = zn(e, t);
          if ((n = o.arrow) != null && n.alignmentOffset) return {};
          const x = Vn(s),
            g = xn(a),
            y = Vn(a) === a,
            b = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)),
            C = h || (y || !v ? [Pl(a)] : f_(a)),
            k = S !== 'none';
          !h && k && C.push(...g_(a, v, S, b));
          const N = [a, ...C],
            P = await Di(t, w),
            T = [];
          let R = ((r = o.flip) == null ? void 0 : r.overflows) || [];
          if ((f && T.push(P[x]), p)) {
            const O = d_(s, i, b);
            T.push(P[O[0]], P[O[1]]);
          }
          if (((R = [...R, { placement: s, overflows: T }]), !T.every(O => O <= 0))) {
            var H, $;
            const O = (((H = o.flip) == null ? void 0 : H.index) || 0) + 1,
              X = N[O];
            if (X && (!(p === 'alignment' ? g !== xn(X) : !1) || R.every(_ => _.overflows[0] > 0 && xn(_.placement) === g)))
              return { data: { index: O, overflows: R }, reset: { placement: X } };
            let I =
              ($ = R.filter(z => z.overflows[0] <= 0).sort((z, _) => z.overflows[1] - _.overflows[1])[0]) == null ? void 0 : $.placement;
            if (!I)
              switch (m) {
                case 'bestFit': {
                  var Y;
                  const z =
                    (Y = R.filter(_ => {
                      if (k) {
                        const E = xn(_.placement);
                        return E === g || E === 'y';
                      }
                      return !0;
                    })
                      .map(_ => [_.placement, _.overflows.filter(E => E > 0).reduce((E, A) => E + A, 0)])
                      .sort((_, E) => _[1] - E[1])[0]) == null
                      ? void 0
                      : Y[0];
                  z && (I = z);
                  break;
                }
                case 'initialPlacement':
                  I = a;
                  break;
              }
            if (s !== I) return { reset: { placement: I } };
          }
          return {};
        },
      }
    );
  };
function Nm(e, t) {
  return { top: e.top - t.height, right: e.right - t.width, bottom: e.bottom - t.height, left: e.left - t.width };
}
function km(e) {
  return a_.some(t => e[t] >= 0);
}
const S_ = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'hide',
        options: e,
        async fn(t) {
          const { rects: n } = t,
            { strategy: r = 'referenceHidden', ...s } = zn(e, t);
          switch (r) {
            case 'referenceHidden': {
              const o = await Di(t, { ...s, elementContext: 'reference' }),
                i = Nm(o, n.reference);
              return { data: { referenceHiddenOffsets: i, referenceHidden: km(i) } };
            }
            case 'escaped': {
              const o = await Di(t, { ...s, altBoundary: !0 }),
                i = Nm(o, n.floating);
              return { data: { escapedOffsets: i, escaped: km(i) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  Vx = new Set(['left', 'top']);
async function b_(e, t) {
  const { placement: n, platform: r, elements: s } = e,
    o = await (r.isRTL == null ? void 0 : r.isRTL(s.floating)),
    i = Vn(n),
    a = Lo(n),
    c = xn(n) === 'y',
    u = Vx.has(i) ? -1 : 1,
    f = o && c ? -1 : 1,
    p = zn(t, e);
  let {
    mainAxis: h,
    crossAxis: m,
    alignmentAxis: S,
  } = typeof p == 'number'
    ? { mainAxis: p, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: p.mainAxis || 0, crossAxis: p.crossAxis || 0, alignmentAxis: p.alignmentAxis };
  return (a && typeof S == 'number' && (m = a === 'end' ? S * -1 : S), c ? { x: m * f, y: h * u } : { x: h * u, y: m * f });
}
const C_ = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(t) {
          var n, r;
          const { x: s, y: o, placement: i, middlewareData: a } = t,
            c = await b_(t, e);
          return i === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset
            ? {}
            : { x: s + c.x, y: o + c.y, data: { ...c, placement: i } };
        },
      }
    );
  },
  E_ = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: s } = t,
            {
              mainAxis: o = !0,
              crossAxis: i = !1,
              limiter: a = {
                fn: w => {
                  let { x, y: g } = w;
                  return { x, y: g };
                },
              },
              ...c
            } = zn(e, t),
            u = { x: n, y: r },
            f = await Di(t, c),
            p = xn(Vn(s)),
            h = ap(p);
          let m = u[h],
            S = u[p];
          if (o) {
            const w = h === 'y' ? 'top' : 'left',
              x = h === 'y' ? 'bottom' : 'right',
              g = m + f[w],
              y = m - f[x];
            m = Rd(g, m, y);
          }
          if (i) {
            const w = p === 'y' ? 'top' : 'left',
              x = p === 'y' ? 'bottom' : 'right',
              g = S + f[w],
              y = S - f[x];
            S = Rd(g, S, y);
          }
          const v = a.fn({ ...t, [h]: m, [p]: S });
          return { ...v, data: { x: v.x - n, y: v.y - r, enabled: { [h]: o, [p]: i } } };
        },
      }
    );
  },
  N_ = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: s, rects: o, middlewareData: i } = t,
            { offset: a = 0, mainAxis: c = !0, crossAxis: u = !0 } = zn(e, t),
            f = { x: n, y: r },
            p = xn(s),
            h = ap(p);
          let m = f[h],
            S = f[p];
          const v = zn(a, t),
            w = typeof v == 'number' ? { mainAxis: v, crossAxis: 0 } : { mainAxis: 0, crossAxis: 0, ...v };
          if (c) {
            const y = h === 'y' ? 'height' : 'width',
              b = o.reference[h] - o.floating[y] + w.mainAxis,
              C = o.reference[h] + o.reference[y] - w.mainAxis;
            m < b ? (m = b) : m > C && (m = C);
          }
          if (u) {
            var x, g;
            const y = h === 'y' ? 'width' : 'height',
              b = Vx.has(Vn(s)),
              C = o.reference[p] - o.floating[y] + ((b && ((x = i.offset) == null ? void 0 : x[p])) || 0) + (b ? 0 : w.crossAxis),
              k = o.reference[p] + o.reference[y] + (b ? 0 : ((g = i.offset) == null ? void 0 : g[p]) || 0) - (b ? w.crossAxis : 0);
            S < C ? (S = C) : S > k && (S = k);
          }
          return { [h]: m, [p]: S };
        },
      }
    );
  },
  k_ = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(t) {
          var n, r;
          const { placement: s, rects: o, platform: i, elements: a } = t,
            { apply: c = () => {}, ...u } = zn(e, t),
            f = await Di(t, u),
            p = Vn(s),
            h = Lo(s),
            m = xn(s) === 'y',
            { width: S, height: v } = o.floating;
          let w, x;
          p === 'top' || p === 'bottom'
            ? ((w = p), (x = h === ((await (i.isRTL == null ? void 0 : i.isRTL(a.floating))) ? 'start' : 'end') ? 'left' : 'right'))
            : ((x = p), (w = h === 'end' ? 'top' : 'bottom'));
          const g = v - f.top - f.bottom,
            y = S - f.left - f.right,
            b = _r(v - f[w], g),
            C = _r(S - f[x], y),
            k = !t.middlewareData.shift;
          let N = b,
            P = C;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (P = y),
            (r = t.middlewareData.shift) != null && r.enabled.y && (N = g),
            k && !h)
          ) {
            const R = Et(f.left, 0),
              H = Et(f.right, 0),
              $ = Et(f.top, 0),
              Y = Et(f.bottom, 0);
            m
              ? (P = S - 2 * (R !== 0 || H !== 0 ? R + H : Et(f.left, f.right)))
              : (N = v - 2 * ($ !== 0 || Y !== 0 ? $ + Y : Et(f.top, f.bottom)));
          }
          await c({ ...t, availableWidth: P, availableHeight: N });
          const T = await i.getDimensions(a.floating);
          return S !== T.width || v !== T.height ? { reset: { rects: !0 } } : {};
        },
      }
    );
  };
function pc() {
  return typeof window < 'u';
}
function Do(e) {
  return Ux(e) ? (e.nodeName || '').toLowerCase() : '#document';
}
function Pt(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function _n(e) {
  var t;
  return (t = (Ux(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ux(e) {
  return pc() ? e instanceof Node || e instanceof Pt(e).Node : !1;
}
function ln(e) {
  return pc() ? e instanceof Element || e instanceof Pt(e).Element : !1;
}
function Nn(e) {
  return pc() ? e instanceof HTMLElement || e instanceof Pt(e).HTMLElement : !1;
}
function _m(e) {
  return !pc() || typeof ShadowRoot > 'u' ? !1 : e instanceof ShadowRoot || e instanceof Pt(e).ShadowRoot;
}
const __ = new Set(['inline', 'contents']);
function ra(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: s } = cn(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !__.has(s);
}
const P_ = new Set(['table', 'td', 'th']);
function j_(e) {
  return P_.has(Do(e));
}
const T_ = [':popover-open', ':modal'];
function hc(e) {
  return T_.some(t => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const R_ = ['transform', 'translate', 'scale', 'rotate', 'perspective'],
  I_ = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'],
  A_ = ['paint', 'layout', 'strict', 'content'];
function up(e) {
  const t = dp(),
    n = ln(e) ? cn(e) : e;
  return (
    R_.some(r => (n[r] ? n[r] !== 'none' : !1)) ||
    (n.containerType ? n.containerType !== 'normal' : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== 'none' : !1)) ||
    (!t && (n.filter ? n.filter !== 'none' : !1)) ||
    I_.some(r => (n.willChange || '').includes(r)) ||
    A_.some(r => (n.contain || '').includes(r))
  );
}
function M_(e) {
  let t = Pr(e);
  for (; Nn(t) && !xo(t); ) {
    if (up(t)) return t;
    if (hc(t)) return null;
    t = Pr(t);
  }
  return null;
}
function dp() {
  return typeof CSS > 'u' || !CSS.supports ? !1 : CSS.supports('-webkit-backdrop-filter', 'none');
}
const O_ = new Set(['html', 'body', '#document']);
function xo(e) {
  return O_.has(Do(e));
}
function cn(e) {
  return Pt(e).getComputedStyle(e);
}
function mc(e) {
  return ln(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Pr(e) {
  if (Do(e) === 'html') return e;
  const t = e.assignedSlot || e.parentNode || (_m(e) && e.host) || _n(e);
  return _m(t) ? t.host : t;
}
function Bx(e) {
  const t = Pr(e);
  return xo(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : Nn(t) && ra(t) ? t : Bx(t);
}
function Fi(e, t, n) {
  var r;
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  const s = Bx(e),
    o = s === ((r = e.ownerDocument) == null ? void 0 : r.body),
    i = Pt(s);
  if (o) {
    const a = Ad(i);
    return t.concat(i, i.visualViewport || [], ra(s) ? s : [], a && n ? Fi(a) : []);
  }
  return t.concat(s, Fi(s, [], n));
}
function Ad(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Wx(e) {
  const t = cn(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const s = Nn(e),
    o = s ? e.offsetWidth : n,
    i = s ? e.offsetHeight : r,
    a = _l(n) !== o || _l(r) !== i;
  return (a && ((n = o), (r = i)), { width: n, height: r, $: a });
}
function fp(e) {
  return ln(e) ? e : e.contextElement;
}
function to(e) {
  const t = fp(e);
  if (!Nn(t)) return Cn(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: s, $: o } = Wx(t);
  let i = (o ? _l(n.width) : n.width) / r,
    a = (o ? _l(n.height) : n.height) / s;
  return ((!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), { x: i, y: a });
}
const L_ = Cn(0);
function Hx(e) {
  const t = Pt(e);
  return !dp() || !t.visualViewport ? L_ : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function D_(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== Pt(e)) ? !1 : t);
}
function us(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  const s = e.getBoundingClientRect(),
    o = fp(e);
  let i = Cn(1);
  t && (r ? ln(r) && (i = to(r)) : (i = to(e)));
  const a = D_(o, n, r) ? Hx(o) : Cn(0);
  let c = (s.left + a.x) / i.x,
    u = (s.top + a.y) / i.y,
    f = s.width / i.x,
    p = s.height / i.y;
  if (o) {
    const h = Pt(o),
      m = r && ln(r) ? Pt(r) : r;
    let S = h,
      v = Ad(S);
    for (; v && r && m !== S; ) {
      const w = to(v),
        x = v.getBoundingClientRect(),
        g = cn(v),
        y = x.left + (v.clientLeft + parseFloat(g.paddingLeft)) * w.x,
        b = x.top + (v.clientTop + parseFloat(g.paddingTop)) * w.y;
      ((c *= w.x), (u *= w.y), (f *= w.x), (p *= w.y), (c += y), (u += b), (S = Pt(v)), (v = Ad(S)));
    }
  }
  return jl({ width: f, height: p, x: c, y: u });
}
function pp(e, t) {
  const n = mc(e).scrollLeft;
  return t ? t.left + n : us(_n(e)).left + n;
}
function Gx(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(),
    s = r.left + t.scrollLeft - (n ? 0 : pp(e, r)),
    o = r.top + t.scrollTop;
  return { x: s, y: o };
}
function F_(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: s } = e;
  const o = s === 'fixed',
    i = _n(r),
    a = t ? hc(t.floating) : !1;
  if (r === i || (a && o)) return n;
  let c = { scrollLeft: 0, scrollTop: 0 },
    u = Cn(1);
  const f = Cn(0),
    p = Nn(r);
  if ((p || (!p && !o)) && ((Do(r) !== 'body' || ra(i)) && (c = mc(r)), Nn(r))) {
    const m = us(r);
    ((u = to(r)), (f.x = m.x + r.clientLeft), (f.y = m.y + r.clientTop));
  }
  const h = i && !p && !o ? Gx(i, c, !0) : Cn(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + f.x + h.x,
    y: n.y * u.y - c.scrollTop * u.y + f.y + h.y,
  };
}
function $_(e) {
  return Array.from(e.getClientRects());
}
function z_(e) {
  const t = _n(e),
    n = mc(e),
    r = e.ownerDocument.body,
    s = Et(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    o = Et(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + pp(e);
  const a = -n.scrollTop;
  return (cn(r).direction === 'rtl' && (i += Et(t.clientWidth, r.clientWidth) - s), { width: s, height: o, x: i, y: a });
}
function V_(e, t) {
  const n = Pt(e),
    r = _n(e),
    s = n.visualViewport;
  let o = r.clientWidth,
    i = r.clientHeight,
    a = 0,
    c = 0;
  if (s) {
    ((o = s.width), (i = s.height));
    const u = dp();
    (!u || (u && t === 'fixed')) && ((a = s.offsetLeft), (c = s.offsetTop));
  }
  return { width: o, height: i, x: a, y: c };
}
const U_ = new Set(['absolute', 'fixed']);
function B_(e, t) {
  const n = us(e, !0, t === 'fixed'),
    r = n.top + e.clientTop,
    s = n.left + e.clientLeft,
    o = Nn(e) ? to(e) : Cn(1),
    i = e.clientWidth * o.x,
    a = e.clientHeight * o.y,
    c = s * o.x,
    u = r * o.y;
  return { width: i, height: a, x: c, y: u };
}
function Pm(e, t, n) {
  let r;
  if (t === 'viewport') r = V_(e, n);
  else if (t === 'document') r = z_(_n(e));
  else if (ln(t)) r = B_(t, n);
  else {
    const s = Hx(e);
    r = { x: t.x - s.x, y: t.y - s.y, width: t.width, height: t.height };
  }
  return jl(r);
}
function Kx(e, t) {
  const n = Pr(e);
  return n === t || !ln(n) || xo(n) ? !1 : cn(n).position === 'fixed' || Kx(n, t);
}
function W_(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Fi(e, [], !1).filter(a => ln(a) && Do(a) !== 'body'),
    s = null;
  const o = cn(e).position === 'fixed';
  let i = o ? Pr(e) : e;
  for (; ln(i) && !xo(i); ) {
    const a = cn(i),
      c = up(i);
    (!c && a.position === 'fixed' && (s = null),
      (o ? !c && !s : (!c && a.position === 'static' && !!s && U_.has(s.position)) || (ra(i) && !c && Kx(e, i)))
        ? (r = r.filter(f => f !== i))
        : (s = a),
      (i = Pr(i)));
  }
  return (t.set(e, r), r);
}
function H_(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: s } = e;
  const i = [...(n === 'clippingAncestors' ? (hc(t) ? [] : W_(t, this._c)) : [].concat(n)), r],
    a = i[0],
    c = i.reduce(
      (u, f) => {
        const p = Pm(t, f, s);
        return (
          (u.top = Et(p.top, u.top)),
          (u.right = _r(p.right, u.right)),
          (u.bottom = _r(p.bottom, u.bottom)),
          (u.left = Et(p.left, u.left)),
          u
        );
      },
      Pm(t, a, s)
    );
  return { width: c.right - c.left, height: c.bottom - c.top, x: c.left, y: c.top };
}
function G_(e) {
  const { width: t, height: n } = Wx(e);
  return { width: t, height: n };
}
function K_(e, t, n) {
  const r = Nn(t),
    s = _n(t),
    o = n === 'fixed',
    i = us(e, !0, o, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const c = Cn(0);
  function u() {
    c.x = pp(s);
  }
  if (r || (!r && !o))
    if (((Do(t) !== 'body' || ra(s)) && (a = mc(t)), r)) {
      const m = us(t, !0, o, t);
      ((c.x = m.x + t.clientLeft), (c.y = m.y + t.clientTop));
    } else s && u();
  o && !r && s && u();
  const f = s && !r && !o ? Gx(s, a) : Cn(0),
    p = i.left + a.scrollLeft - c.x - f.x,
    h = i.top + a.scrollTop - c.y - f.y;
  return { x: p, y: h, width: i.width, height: i.height };
}
function gu(e) {
  return cn(e).position === 'static';
}
function jm(e, t) {
  if (!Nn(e) || cn(e).position === 'fixed') return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (_n(e) === n && (n = n.ownerDocument.body), n);
}
function Zx(e, t) {
  const n = Pt(e);
  if (hc(e)) return n;
  if (!Nn(e)) {
    let s = Pr(e);
    for (; s && !xo(s); ) {
      if (ln(s) && !gu(s)) return s;
      s = Pr(s);
    }
    return n;
  }
  let r = jm(e, t);
  for (; r && j_(r) && gu(r); ) r = jm(r, t);
  return r && xo(r) && gu(r) && !up(r) ? n : r || M_(e) || n;
}
const Z_ = async function (e) {
  const t = this.getOffsetParent || Zx,
    n = this.getDimensions,
    r = await n(e.floating);
  return { reference: K_(e.reference, await t(e.floating), e.strategy), floating: { x: 0, y: 0, width: r.width, height: r.height } };
};
function Q_(e) {
  return cn(e).direction === 'rtl';
}
const q_ = {
  convertOffsetParentRelativeRectToViewportRelativeRect: F_,
  getDocumentElement: _n,
  getClippingRect: H_,
  getOffsetParent: Zx,
  getElementRects: Z_,
  getClientRects: $_,
  getDimensions: G_,
  getScale: to,
  isElement: ln,
  isRTL: Q_,
};
function Qx(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Y_(e, t) {
  let n = null,
    r;
  const s = _n(e);
  function o() {
    var a;
    (clearTimeout(r), (a = n) == null || a.disconnect(), (n = null));
  }
  function i(a, c) {
    (a === void 0 && (a = !1), c === void 0 && (c = 1), o());
    const u = e.getBoundingClientRect(),
      { left: f, top: p, width: h, height: m } = u;
    if ((a || t(), !h || !m)) return;
    const S = Ta(p),
      v = Ta(s.clientWidth - (f + h)),
      w = Ta(s.clientHeight - (p + m)),
      x = Ta(f),
      y = { rootMargin: -S + 'px ' + -v + 'px ' + -w + 'px ' + -x + 'px', threshold: Et(0, _r(1, c)) || 1 };
    let b = !0;
    function C(k) {
      const N = k[0].intersectionRatio;
      if (N !== c) {
        if (!b) return i();
        N
          ? i(!1, N)
          : (r = setTimeout(() => {
              i(!1, 1e-7);
            }, 1e3));
      }
      (N === 1 && !Qx(u, e.getBoundingClientRect()) && i(), (b = !1));
    }
    try {
      n = new IntersectionObserver(C, { ...y, root: s.ownerDocument });
    } catch {
      n = new IntersectionObserver(C, y);
    }
    n.observe(e);
  }
  return (i(!0), o);
}
function X_(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: s = !0,
      ancestorResize: o = !0,
      elementResize: i = typeof ResizeObserver == 'function',
      layoutShift: a = typeof IntersectionObserver == 'function',
      animationFrame: c = !1,
    } = r,
    u = fp(e),
    f = s || o ? [...(u ? Fi(u) : []), ...Fi(t)] : [];
  f.forEach(x => {
    (s && x.addEventListener('scroll', n, { passive: !0 }), o && x.addEventListener('resize', n));
  });
  const p = u && a ? Y_(u, n) : null;
  let h = -1,
    m = null;
  i &&
    ((m = new ResizeObserver(x => {
      let [g] = x;
      (g &&
        g.target === u &&
        m &&
        (m.unobserve(t),
        cancelAnimationFrame(h),
        (h = requestAnimationFrame(() => {
          var y;
          (y = m) == null || y.observe(t);
        }))),
        n());
    })),
    u && !c && m.observe(u),
    m.observe(t));
  let S,
    v = c ? us(e) : null;
  c && w();
  function w() {
    const x = us(e);
    (v && !Qx(v, x) && n(), (v = x), (S = requestAnimationFrame(w)));
  }
  return (
    n(),
    () => {
      var x;
      (f.forEach(g => {
        (s && g.removeEventListener('scroll', n), o && g.removeEventListener('resize', n));
      }),
        p == null || p(),
        (x = m) == null || x.disconnect(),
        (m = null),
        c && cancelAnimationFrame(S));
    }
  );
}
const J_ = C_,
  e2 = E_,
  t2 = w_,
  n2 = k_,
  r2 = S_,
  Tm = x_,
  s2 = N_,
  o2 = (e, t, n) => {
    const r = new Map(),
      s = { platform: q_, ...n },
      o = { ...s.platform, _c: r };
    return y_(e, t, { ...s, platform: o });
  };
var i2 = typeof document < 'u',
  a2 = function () {},
  qa = i2 ? d.useLayoutEffect : a2;
function Tl(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == 'function' && e.toString() === t.toString()) return !0;
  let n, r, s;
  if (e && t && typeof e == 'object') {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!Tl(e[r], t[r])) return !1;
      return !0;
    }
    if (((s = Object.keys(e)), (n = s.length), n !== Object.keys(t).length)) return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, s[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const o = s[r];
      if (!(o === '_owner' && e.$$typeof) && !Tl(e[o], t[o])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function qx(e) {
  return typeof window > 'u' ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Rm(e, t) {
  const n = qx(e);
  return Math.round(t * n) / n;
}
function vu(e) {
  const t = d.useRef(e);
  return (
    qa(() => {
      t.current = e;
    }),
    t
  );
}
function l2(e) {
  e === void 0 && (e = {});
  const {
      placement: t = 'bottom',
      strategy: n = 'absolute',
      middleware: r = [],
      platform: s,
      elements: { reference: o, floating: i } = {},
      transform: a = !0,
      whileElementsMounted: c,
      open: u,
    } = e,
    [f, p] = d.useState({ x: 0, y: 0, strategy: n, placement: t, middlewareData: {}, isPositioned: !1 }),
    [h, m] = d.useState(r);
  Tl(h, r) || m(r);
  const [S, v] = d.useState(null),
    [w, x] = d.useState(null),
    g = d.useCallback(_ => {
      _ !== k.current && ((k.current = _), v(_));
    }, []),
    y = d.useCallback(_ => {
      _ !== N.current && ((N.current = _), x(_));
    }, []),
    b = o || S,
    C = i || w,
    k = d.useRef(null),
    N = d.useRef(null),
    P = d.useRef(f),
    T = c != null,
    R = vu(c),
    H = vu(s),
    $ = vu(u),
    Y = d.useCallback(() => {
      if (!k.current || !N.current) return;
      const _ = { placement: t, strategy: n, middleware: h };
      (H.current && (_.platform = H.current),
        o2(k.current, N.current, _).then(E => {
          const A = { ...E, isPositioned: $.current !== !1 };
          O.current &&
            !Tl(P.current, A) &&
            ((P.current = A),
            ys.flushSync(() => {
              p(A);
            }));
        }));
    }, [h, t, n, H, $]);
  qa(() => {
    u === !1 && P.current.isPositioned && ((P.current.isPositioned = !1), p(_ => ({ ..._, isPositioned: !1 })));
  }, [u]);
  const O = d.useRef(!1);
  (qa(
    () => (
      (O.current = !0),
      () => {
        O.current = !1;
      }
    ),
    []
  ),
    qa(() => {
      if ((b && (k.current = b), C && (N.current = C), b && C)) {
        if (R.current) return R.current(b, C, Y);
        Y();
      }
    }, [b, C, Y, R, T]));
  const X = d.useMemo(() => ({ reference: k, floating: N, setReference: g, setFloating: y }), [g, y]),
    I = d.useMemo(() => ({ reference: b, floating: C }), [b, C]),
    z = d.useMemo(() => {
      const _ = { position: n, left: 0, top: 0 };
      if (!I.floating) return _;
      const E = Rm(I.floating, f.x),
        A = Rm(I.floating, f.y);
      return a
        ? { ..._, transform: 'translate(' + E + 'px, ' + A + 'px)', ...(qx(I.floating) >= 1.5 && { willChange: 'transform' }) }
        : { position: n, left: E, top: A };
    }, [n, a, I.floating, f.x, f.y]);
  return d.useMemo(() => ({ ...f, update: Y, refs: X, elements: I, floatingStyles: z }), [f, Y, X, I, z]);
}
const c2 = e => {
    function t(n) {
      return {}.hasOwnProperty.call(n, 'current');
    }
    return {
      name: 'arrow',
      options: e,
      fn(n) {
        const { element: r, padding: s } = typeof e == 'function' ? e(n) : e;
        return r && t(r)
          ? r.current != null
            ? Tm({ element: r.current, padding: s }).fn(n)
            : {}
          : r
            ? Tm({ element: r, padding: s }).fn(n)
            : {};
      },
    };
  },
  u2 = (e, t) => ({ ...J_(e), options: [e, t] }),
  d2 = (e, t) => ({ ...e2(e), options: [e, t] }),
  f2 = (e, t) => ({ ...s2(e), options: [e, t] }),
  p2 = (e, t) => ({ ...t2(e), options: [e, t] }),
  h2 = (e, t) => ({ ...n2(e), options: [e, t] }),
  m2 = (e, t) => ({ ...r2(e), options: [e, t] }),
  g2 = (e, t) => ({ ...c2(e), options: [e, t] });
var v2 = 'Arrow',
  Yx = d.forwardRef((e, t) => {
    const { children: n, width: r = 10, height: s = 5, ...o } = e;
    return l.jsx(te.svg, {
      ...o,
      ref: t,
      width: r,
      height: s,
      viewBox: '0 0 30 10',
      preserveAspectRatio: 'none',
      children: e.asChild ? n : l.jsx('polygon', { points: '0,0 30,0 15,10' }),
    });
  });
Yx.displayName = v2;
var y2 = Yx;
function Xx(e) {
  const [t, n] = d.useState(void 0);
  return (
    Ue(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver(s => {
          if (!Array.isArray(s) || !s.length) return;
          const o = s[0];
          let i, a;
          if ('borderBoxSize' in o) {
            const c = o.borderBoxSize,
              u = Array.isArray(c) ? c[0] : c;
            ((i = u.inlineSize), (a = u.blockSize));
          } else ((i = e.offsetWidth), (a = e.offsetHeight));
          n({ width: i, height: a });
        });
        return (r.observe(e, { box: 'border-box' }), () => r.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
var hp = 'Popper',
  [Jx, Fo] = At(hp),
  [x2, ew] = Jx(hp),
  tw = e => {
    const { __scopePopper: t, children: n } = e,
      [r, s] = d.useState(null);
    return l.jsx(x2, { scope: t, anchor: r, onAnchorChange: s, children: n });
  };
tw.displayName = hp;
var nw = 'PopperAnchor',
  rw = d.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: r, ...s } = e,
      o = ew(nw, n),
      i = d.useRef(null),
      a = ye(t, i);
    return (
      d.useEffect(() => {
        o.onAnchorChange((r == null ? void 0 : r.current) || i.current);
      }),
      r ? null : l.jsx(te.div, { ...s, ref: a })
    );
  });
rw.displayName = nw;
var mp = 'PopperContent',
  [w2, S2] = Jx(mp),
  sw = d.forwardRef((e, t) => {
    var F, he, me, G, ee, re;
    const {
        __scopePopper: n,
        side: r = 'bottom',
        sideOffset: s = 0,
        align: o = 'center',
        alignOffset: i = 0,
        arrowPadding: a = 0,
        avoidCollisions: c = !0,
        collisionBoundary: u = [],
        collisionPadding: f = 0,
        sticky: p = 'partial',
        hideWhenDetached: h = !1,
        updatePositionStrategy: m = 'optimized',
        onPlaced: S,
        ...v
      } = e,
      w = ew(mp, n),
      [x, g] = d.useState(null),
      y = ye(t, Oe => g(Oe)),
      [b, C] = d.useState(null),
      k = Xx(b),
      N = (k == null ? void 0 : k.width) ?? 0,
      P = (k == null ? void 0 : k.height) ?? 0,
      T = r + (o !== 'center' ? '-' + o : ''),
      R = typeof f == 'number' ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f },
      H = Array.isArray(u) ? u : [u],
      $ = H.length > 0,
      Y = { padding: R, boundary: H.filter(C2), altBoundary: $ },
      {
        refs: O,
        floatingStyles: X,
        placement: I,
        isPositioned: z,
        middlewareData: _,
      } = l2({
        strategy: 'fixed',
        placement: T,
        whileElementsMounted: (...Oe) => X_(...Oe, { animationFrame: m === 'always' }),
        elements: { reference: w.anchor },
        middleware: [
          u2({ mainAxis: s + P, alignmentAxis: i }),
          c && d2({ mainAxis: !0, crossAxis: !1, limiter: p === 'partial' ? f2() : void 0, ...Y }),
          c && p2({ ...Y }),
          h2({
            ...Y,
            apply: ({ elements: Oe, rects: Je, availableWidth: Dr, availableHeight: Bn }) => {
              const { width: Fr, height: Vo } = Je.reference,
                Es = Oe.floating.style;
              (Es.setProperty('--radix-popper-available-width', `${Dr}px`),
                Es.setProperty('--radix-popper-available-height', `${Bn}px`),
                Es.setProperty('--radix-popper-anchor-width', `${Fr}px`),
                Es.setProperty('--radix-popper-anchor-height', `${Vo}px`));
            },
          }),
          b && g2({ element: b, padding: a }),
          E2({ arrowWidth: N, arrowHeight: P }),
          h && m2({ strategy: 'referenceHidden', ...Y }),
        ],
      }),
      [E, A] = aw(I),
      Z = dt(S);
    Ue(() => {
      z && (Z == null || Z());
    }, [z, Z]);
    const W = (F = _.arrow) == null ? void 0 : F.x,
      J = (he = _.arrow) == null ? void 0 : he.y,
      V = ((me = _.arrow) == null ? void 0 : me.centerOffset) !== 0,
      [pe, ge] = d.useState();
    return (
      Ue(() => {
        x && ge(window.getComputedStyle(x).zIndex);
      }, [x]),
      l.jsx('div', {
        ref: O.setFloating,
        'data-radix-popper-content-wrapper': '',
        style: {
          ...X,
          transform: z ? X.transform : 'translate(0, -200%)',
          minWidth: 'max-content',
          zIndex: pe,
          '--radix-popper-transform-origin': [
            (G = _.transformOrigin) == null ? void 0 : G.x,
            (ee = _.transformOrigin) == null ? void 0 : ee.y,
          ].join(' '),
          ...(((re = _.hide) == null ? void 0 : re.referenceHidden) && { visibility: 'hidden', pointerEvents: 'none' }),
        },
        dir: e.dir,
        children: l.jsx(w2, {
          scope: n,
          placedSide: E,
          onArrowChange: C,
          arrowX: W,
          arrowY: J,
          shouldHideArrow: V,
          children: l.jsx(te.div, { 'data-side': E, 'data-align': A, ...v, ref: y, style: { ...v.style, animation: z ? void 0 : 'none' } }),
        }),
      })
    );
  });
sw.displayName = mp;
var ow = 'PopperArrow',
  b2 = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
  iw = d.forwardRef(function (t, n) {
    const { __scopePopper: r, ...s } = t,
      o = S2(ow, r),
      i = b2[o.placedSide];
    return l.jsx('span', {
      ref: o.onArrowChange,
      style: {
        position: 'absolute',
        left: o.arrowX,
        top: o.arrowY,
        [i]: 0,
        transformOrigin: { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[o.placedSide],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: 'rotate(180deg)',
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[o.placedSide],
        visibility: o.shouldHideArrow ? 'hidden' : void 0,
      },
      children: l.jsx(y2, { ...s, ref: n, style: { ...s.style, display: 'block' } }),
    });
  });
iw.displayName = ow;
function C2(e) {
  return e !== null;
}
var E2 = e => ({
  name: 'transformOrigin',
  options: e,
  fn(t) {
    var w, x, g;
    const { placement: n, rects: r, middlewareData: s } = t,
      i = ((w = s.arrow) == null ? void 0 : w.centerOffset) !== 0,
      a = i ? 0 : e.arrowWidth,
      c = i ? 0 : e.arrowHeight,
      [u, f] = aw(n),
      p = { start: '0%', center: '50%', end: '100%' }[f],
      h = (((x = s.arrow) == null ? void 0 : x.x) ?? 0) + a / 2,
      m = (((g = s.arrow) == null ? void 0 : g.y) ?? 0) + c / 2;
    let S = '',
      v = '';
    return (
      u === 'bottom'
        ? ((S = i ? p : `${h}px`), (v = `${-c}px`))
        : u === 'top'
          ? ((S = i ? p : `${h}px`), (v = `${r.floating.height + c}px`))
          : u === 'right'
            ? ((S = `${-c}px`), (v = i ? p : `${m}px`))
            : u === 'left' && ((S = `${r.floating.width + c}px`), (v = i ? p : `${m}px`)),
      { data: { x: S, y: v } }
    );
  },
});
function aw(e) {
  const [t, n = 'center'] = e.split('-');
  return [t, n];
}
var lw = tw,
  gp = rw,
  vp = sw,
  yp = iw,
  [gc, wM] = At('Tooltip', [Fo]),
  xp = Fo(),
  cw = 'TooltipProvider',
  N2 = 700,
  Im = 'tooltip.open',
  [k2, uw] = gc(cw),
  dw = e => {
    const { __scopeTooltip: t, delayDuration: n = N2, skipDelayDuration: r = 300, disableHoverableContent: s = !1, children: o } = e,
      i = d.useRef(!0),
      a = d.useRef(!1),
      c = d.useRef(0);
    return (
      d.useEffect(() => {
        const u = c.current;
        return () => window.clearTimeout(u);
      }, []),
      l.jsx(k2, {
        scope: t,
        isOpenDelayedRef: i,
        delayDuration: n,
        onOpen: d.useCallback(() => {
          (window.clearTimeout(c.current), (i.current = !1));
        }, []),
        onClose: d.useCallback(() => {
          (window.clearTimeout(c.current), (c.current = window.setTimeout(() => (i.current = !0), r)));
        }, [r]),
        isPointerInTransitRef: a,
        onPointerInTransitChange: d.useCallback(u => {
          a.current = u;
        }, []),
        disableHoverableContent: s,
        children: o,
      })
    );
  };
dw.displayName = cw;
var fw = 'Tooltip',
  [SM, vc] = gc(fw),
  Md = 'TooltipTrigger',
  _2 = d.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      s = vc(Md, n),
      o = uw(Md, n),
      i = xp(n),
      a = d.useRef(null),
      c = ye(t, a, s.onTriggerChange),
      u = d.useRef(!1),
      f = d.useRef(!1),
      p = d.useCallback(() => (u.current = !1), []);
    return (
      d.useEffect(() => () => document.removeEventListener('pointerup', p), [p]),
      l.jsx(gp, {
        asChild: !0,
        ...i,
        children: l.jsx(te.button, {
          'aria-describedby': s.open ? s.contentId : void 0,
          'data-state': s.stateAttribute,
          ...r,
          ref: c,
          onPointerMove: U(e.onPointerMove, h => {
            h.pointerType !== 'touch' && !f.current && !o.isPointerInTransitRef.current && (s.onTriggerEnter(), (f.current = !0));
          }),
          onPointerLeave: U(e.onPointerLeave, () => {
            (s.onTriggerLeave(), (f.current = !1));
          }),
          onPointerDown: U(e.onPointerDown, () => {
            (s.open && s.onClose(), (u.current = !0), document.addEventListener('pointerup', p, { once: !0 }));
          }),
          onFocus: U(e.onFocus, () => {
            u.current || s.onOpen();
          }),
          onBlur: U(e.onBlur, s.onClose),
          onClick: U(e.onClick, s.onClose),
        }),
      })
    );
  });
_2.displayName = Md;
var P2 = 'TooltipPortal',
  [bM, j2] = gc(P2, { forceMount: void 0 }),
  wo = 'TooltipContent',
  pw = d.forwardRef((e, t) => {
    const n = j2(wo, e.__scopeTooltip),
      { forceMount: r = n.forceMount, side: s = 'top', ...o } = e,
      i = vc(wo, e.__scopeTooltip);
    return l.jsx(un, {
      present: r || i.open,
      children: i.disableHoverableContent ? l.jsx(hw, { side: s, ...o, ref: t }) : l.jsx(T2, { side: s, ...o, ref: t }),
    });
  }),
  T2 = d.forwardRef((e, t) => {
    const n = vc(wo, e.__scopeTooltip),
      r = uw(wo, e.__scopeTooltip),
      s = d.useRef(null),
      o = ye(t, s),
      [i, a] = d.useState(null),
      { trigger: c, onClose: u } = n,
      f = s.current,
      { onPointerInTransitChange: p } = r,
      h = d.useCallback(() => {
        (a(null), p(!1));
      }, [p]),
      m = d.useCallback(
        (S, v) => {
          const w = S.currentTarget,
            x = { x: S.clientX, y: S.clientY },
            g = O2(x, w.getBoundingClientRect()),
            y = L2(x, g),
            b = D2(v.getBoundingClientRect()),
            C = $2([...y, ...b]);
          (a(C), p(!0));
        },
        [p]
      );
    return (
      d.useEffect(() => () => h(), [h]),
      d.useEffect(() => {
        if (c && f) {
          const S = w => m(w, f),
            v = w => m(w, c);
          return (
            c.addEventListener('pointerleave', S),
            f.addEventListener('pointerleave', v),
            () => {
              (c.removeEventListener('pointerleave', S), f.removeEventListener('pointerleave', v));
            }
          );
        }
      }, [c, f, m, h]),
      d.useEffect(() => {
        if (i) {
          const S = v => {
            const w = v.target,
              x = { x: v.clientX, y: v.clientY },
              g = (c == null ? void 0 : c.contains(w)) || (f == null ? void 0 : f.contains(w)),
              y = !F2(x, i);
            g ? h() : y && (h(), u());
          };
          return (document.addEventListener('pointermove', S), () => document.removeEventListener('pointermove', S));
        }
      }, [c, f, i, u, h]),
      l.jsx(hw, { ...e, ref: o })
    );
  }),
  [R2, I2] = gc(fw, { isInside: !1 }),
  A2 = FE('TooltipContent'),
  hw = d.forwardRef((e, t) => {
    const { __scopeTooltip: n, children: r, 'aria-label': s, onEscapeKeyDown: o, onPointerDownOutside: i, ...a } = e,
      c = vc(wo, n),
      u = xp(n),
      { onClose: f } = c;
    return (
      d.useEffect(() => (document.addEventListener(Im, f), () => document.removeEventListener(Im, f)), [f]),
      d.useEffect(() => {
        if (c.trigger) {
          const p = h => {
            const m = h.target;
            m != null && m.contains(c.trigger) && f();
          };
          return (window.addEventListener('scroll', p, { capture: !0 }), () => window.removeEventListener('scroll', p, { capture: !0 }));
        }
      }, [c.trigger, f]),
      l.jsx(Ao, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: o,
        onPointerDownOutside: i,
        onFocusOutside: p => p.preventDefault(),
        onDismiss: f,
        children: l.jsxs(vp, {
          'data-state': c.stateAttribute,
          ...u,
          ...a,
          ref: t,
          style: {
            ...a.style,
            '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-tooltip-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-tooltip-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-tooltip-trigger-height': 'var(--radix-popper-anchor-height)',
          },
          children: [
            l.jsx(A2, { children: r }),
            l.jsx(R2, { scope: n, isInside: !0, children: l.jsx(iN, { id: c.contentId, role: 'tooltip', children: s || r }) }),
          ],
        }),
      })
    );
  });
pw.displayName = wo;
var mw = 'TooltipArrow',
  M2 = d.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      s = xp(n);
    return I2(mw, n).isInside ? null : l.jsx(yp, { ...s, ...r, ref: t });
  });
M2.displayName = mw;
function O2(e, t) {
  const n = Math.abs(t.top - e.y),
    r = Math.abs(t.bottom - e.y),
    s = Math.abs(t.right - e.x),
    o = Math.abs(t.left - e.x);
  switch (Math.min(n, r, s, o)) {
    case o:
      return 'left';
    case s:
      return 'right';
    case n:
      return 'top';
    case r:
      return 'bottom';
    default:
      throw new Error('unreachable');
  }
}
function L2(e, t, n = 5) {
  const r = [];
  switch (t) {
    case 'top':
      r.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n });
      break;
    case 'bottom':
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n });
      break;
    case 'left':
      r.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n });
      break;
    case 'right':
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n });
      break;
  }
  return r;
}
function D2(e) {
  const { top: t, right: n, bottom: r, left: s } = e;
  return [
    { x: s, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: s, y: r },
  ];
}
function F2(e, t) {
  const { x: n, y: r } = e;
  let s = !1;
  for (let o = 0, i = t.length - 1; o < t.length; i = o++) {
    const a = t[o],
      c = t[i],
      u = a.x,
      f = a.y,
      p = c.x,
      h = c.y;
    f > r != h > r && n < ((p - u) * (r - f)) / (h - f) + u && (s = !s);
  }
  return s;
}
function $2(e) {
  const t = e.slice();
  return (t.sort((n, r) => (n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0)), z2(t));
}
function z2(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    for (; t.length >= 2; ) {
      const o = t[t.length - 1],
        i = t[t.length - 2];
      if ((o.x - i.x) * (s.y - i.y) >= (o.y - i.y) * (s.x - i.x)) t.pop();
      else break;
    }
    t.push(s);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const s = e[r];
    for (; n.length >= 2; ) {
      const o = n[n.length - 1],
        i = n[n.length - 2];
      if ((o.x - i.x) * (s.y - i.y) >= (o.y - i.y) * (s.x - i.x)) n.pop();
      else break;
    }
    n.push(s);
  }
  return (n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n));
}
var V2 = dw,
  gw = pw;
const U2 = V2,
  B2 = d.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
    l.jsx(gw, {
      ref: r,
      sideOffset: t,
      className: ne(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        e
      ),
      ...n,
    })
  );
B2.displayName = gw.displayName;
var yc = class {
    constructor() {
      ((this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  xc = typeof window > 'u' || 'Deno' in globalThis;
function Jt() {}
function W2(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function H2(e) {
  return typeof e == 'number' && e >= 0 && e !== 1 / 0;
}
function G2(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Od(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function K2(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Am(e, t) {
  const { type: n = 'all', exact: r, fetchStatus: s, predicate: o, queryKey: i, stale: a } = e;
  if (i) {
    if (r) {
      if (t.queryHash !== wp(i, t.options)) return !1;
    } else if (!zi(t.queryKey, i)) return !1;
  }
  if (n !== 'all') {
    const c = t.isActive();
    if ((n === 'active' && !c) || (n === 'inactive' && c)) return !1;
  }
  return !((typeof a == 'boolean' && t.isStale() !== a) || (s && s !== t.state.fetchStatus) || (o && !o(t)));
}
function Mm(e, t) {
  const { exact: n, status: r, predicate: s, mutationKey: o } = e;
  if (o) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if ($i(t.options.mutationKey) !== $i(o)) return !1;
    } else if (!zi(t.options.mutationKey, o)) return !1;
  }
  return !((r && t.state.status !== r) || (s && !s(t)));
}
function wp(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || $i)(e);
}
function $i(e) {
  return JSON.stringify(e, (t, n) =>
    Ld(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, s) => ((r[s] = n[s]), r), {})
      : n
  );
}
function zi(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == 'object' && typeof t == 'object'
        ? Object.keys(t).every(n => zi(e[n], t[n]))
        : !1;
}
function vw(e, t) {
  if (e === t) return e;
  const n = Om(e) && Om(t);
  if (n || (Ld(e) && Ld(t))) {
    const r = n ? e : Object.keys(e),
      s = r.length,
      o = n ? t : Object.keys(t),
      i = o.length,
      a = n ? [] : {},
      c = new Set(r);
    let u = 0;
    for (let f = 0; f < i; f++) {
      const p = n ? f : o[f];
      ((!n && c.has(p)) || n) && e[p] === void 0 && t[p] === void 0
        ? ((a[p] = void 0), u++)
        : ((a[p] = vw(e[p], t[p])), a[p] === e[p] && e[p] !== void 0 && u++);
    }
    return s === i && u === s ? e : a;
  }
  return t;
}
function Om(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Ld(e) {
  if (!Lm(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const n = t.prototype;
  return !(!Lm(n) || !n.hasOwnProperty('isPrototypeOf') || Object.getPrototypeOf(e) !== Object.prototype);
}
function Lm(e) {
  return Object.prototype.toString.call(e) === '[object Object]';
}
function Z2(e) {
  return new Promise(t => {
    setTimeout(t, e);
  });
}
function Q2(e, t, n) {
  return typeof n.structuralSharing == 'function' ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? vw(e, t) : t;
}
function q2(e, t, n = 0) {
  const r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function Y2(e, t, n = 0) {
  const r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var Sp = Symbol();
function yw(e, t) {
  return !e.queryFn && t != null && t.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === Sp
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
var qr,
  sr,
  ro,
  jg,
  X2 =
    ((jg = class extends yc {
      constructor() {
        super();
        we(this, qr);
        we(this, sr);
        we(this, ro);
        ae(this, ro, t => {
          if (!xc && window.addEventListener) {
            const n = () => t();
            return (
              window.addEventListener('visibilitychange', n, !1),
              () => {
                window.removeEventListener('visibilitychange', n);
              }
            );
          }
        });
      }
      onSubscribe() {
        j(this, sr) || this.setEventListener(j(this, ro));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = j(this, sr)) == null || t.call(this), ae(this, sr, void 0));
      }
      setEventListener(t) {
        var n;
        (ae(this, ro, t),
          (n = j(this, sr)) == null || n.call(this),
          ae(
            this,
            sr,
            t(r => {
              typeof r == 'boolean' ? this.setFocused(r) : this.onFocus();
            })
          ));
      }
      setFocused(t) {
        j(this, qr) !== t && (ae(this, qr, t), this.onFocus());
      }
      onFocus() {
        const t = this.isFocused();
        this.listeners.forEach(n => {
          n(t);
        });
      }
      isFocused() {
        var t;
        return typeof j(this, qr) == 'boolean'
          ? j(this, qr)
          : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== 'hidden';
      }
    }),
    (qr = new WeakMap()),
    (sr = new WeakMap()),
    (ro = new WeakMap()),
    jg),
  xw = new X2(),
  so,
  or,
  oo,
  Tg,
  J2 =
    ((Tg = class extends yc {
      constructor() {
        super();
        we(this, so, !0);
        we(this, or);
        we(this, oo);
        ae(this, oo, t => {
          if (!xc && window.addEventListener) {
            const n = () => t(!0),
              r = () => t(!1);
            return (
              window.addEventListener('online', n, !1),
              window.addEventListener('offline', r, !1),
              () => {
                (window.removeEventListener('online', n), window.removeEventListener('offline', r));
              }
            );
          }
        });
      }
      onSubscribe() {
        j(this, or) || this.setEventListener(j(this, oo));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = j(this, or)) == null || t.call(this), ae(this, or, void 0));
      }
      setEventListener(t) {
        var n;
        (ae(this, oo, t), (n = j(this, or)) == null || n.call(this), ae(this, or, t(this.setOnline.bind(this))));
      }
      setOnline(t) {
        j(this, so) !== t &&
          (ae(this, so, t),
          this.listeners.forEach(r => {
            r(t);
          }));
      }
      isOnline() {
        return j(this, so);
      }
    }),
    (so = new WeakMap()),
    (or = new WeakMap()),
    (oo = new WeakMap()),
    Tg),
  Rl = new J2();
function eP() {
  let e, t;
  const n = new Promise((s, o) => {
    ((e = s), (t = o));
  });
  ((n.status = 'pending'), n.catch(() => {}));
  function r(s) {
    (Object.assign(n, s), delete n.resolve, delete n.reject);
  }
  return (
    (n.resolve = s => {
      (r({ status: 'fulfilled', value: s }), e(s));
    }),
    (n.reject = s => {
      (r({ status: 'rejected', reason: s }), t(s));
    }),
    n
  );
}
function tP(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function ww(e) {
  return (e ?? 'online') === 'online' ? Rl.isOnline() : !0;
}
var Sw = class extends Error {
  constructor(e) {
    (super('CancelledError'), (this.revert = e == null ? void 0 : e.revert), (this.silent = e == null ? void 0 : e.silent));
  }
};
function yu(e) {
  return e instanceof Sw;
}
function bw(e) {
  let t = !1,
    n = 0,
    r = !1,
    s;
  const o = eP(),
    i = v => {
      var w;
      r || (h(new Sw(v)), (w = e.abort) == null || w.call(e));
    },
    a = () => {
      t = !0;
    },
    c = () => {
      t = !1;
    },
    u = () => xw.isFocused() && (e.networkMode === 'always' || Rl.isOnline()) && e.canRun(),
    f = () => ww(e.networkMode) && e.canRun(),
    p = v => {
      var w;
      r || ((r = !0), (w = e.onSuccess) == null || w.call(e, v), s == null || s(), o.resolve(v));
    },
    h = v => {
      var w;
      r || ((r = !0), (w = e.onError) == null || w.call(e, v), s == null || s(), o.reject(v));
    },
    m = () =>
      new Promise(v => {
        var w;
        ((s = x => {
          (r || u()) && v(x);
        }),
          (w = e.onPause) == null || w.call(e));
      }).then(() => {
        var v;
        ((s = void 0), r || (v = e.onContinue) == null || v.call(e));
      }),
    S = () => {
      if (r) return;
      let v;
      const w = n === 0 ? e.initialPromise : void 0;
      try {
        v = w ?? e.fn();
      } catch (x) {
        v = Promise.reject(x);
      }
      Promise.resolve(v)
        .then(p)
        .catch(x => {
          var k;
          if (r) return;
          const g = e.retry ?? (xc ? 0 : 3),
            y = e.retryDelay ?? tP,
            b = typeof y == 'function' ? y(n, x) : y,
            C = g === !0 || (typeof g == 'number' && n < g) || (typeof g == 'function' && g(n, x));
          if (t || !C) {
            h(x);
            return;
          }
          (n++,
            (k = e.onFail) == null || k.call(e, n, x),
            Z2(b)
              .then(() => (u() ? void 0 : m()))
              .then(() => {
                t ? h(x) : S();
              }));
        });
    };
  return {
    promise: o,
    cancel: i,
    continue: () => (s == null || s(), o),
    cancelRetry: a,
    continueRetry: c,
    canStart: f,
    start: () => (f() ? S() : m().then(S), o),
  };
}
var nP = e => setTimeout(e, 0);
function rP() {
  let e = [],
    t = 0,
    n = a => {
      a();
    },
    r = a => {
      a();
    },
    s = nP;
  const o = a => {
      t
        ? e.push(a)
        : s(() => {
            n(a);
          });
    },
    i = () => {
      const a = e;
      ((e = []),
        a.length &&
          s(() => {
            r(() => {
              a.forEach(c => {
                n(c);
              });
            });
          }));
    };
  return {
    batch: a => {
      let c;
      t++;
      try {
        c = a();
      } finally {
        (t--, t || i());
      }
      return c;
    },
    batchCalls:
      a =>
      (...c) => {
        o(() => {
          a(...c);
        });
      },
    schedule: o,
    setNotifyFunction: a => {
      n = a;
    },
    setBatchNotifyFunction: a => {
      r = a;
    },
    setScheduler: a => {
      s = a;
    },
  };
}
var ct = rP(),
  Yr,
  Rg,
  Cw =
    ((Rg = class {
      constructor() {
        we(this, Yr);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        (this.clearGcTimeout(),
          H2(this.gcTime) &&
            ae(
              this,
              Yr,
              setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)
            ));
      }
      updateGcTime(e) {
        this.gcTime = Math.max(this.gcTime || 0, e ?? (xc ? 1 / 0 : 5 * 60 * 1e3));
      }
      clearGcTimeout() {
        j(this, Yr) && (clearTimeout(j(this, Yr)), ae(this, Yr, void 0));
      }
    }),
    (Yr = new WeakMap()),
    Rg),
  io,
  Xr,
  Dt,
  Jr,
  rt,
  Ki,
  es,
  en,
  jn,
  Ig,
  sP =
    ((Ig = class extends Cw {
      constructor(t) {
        super();
        we(this, en);
        we(this, io);
        we(this, Xr);
        we(this, Dt);
        we(this, Jr);
        we(this, rt);
        we(this, Ki);
        we(this, es);
        (ae(this, es, !1),
          ae(this, Ki, t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          ae(this, Jr, t.client),
          ae(this, Dt, j(this, Jr).getQueryCache()),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          ae(this, io, iP(this.options)),
          (this.state = t.state ?? j(this, io)),
          this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        var t;
        return (t = j(this, rt)) == null ? void 0 : t.promise;
      }
      setOptions(t) {
        ((this.options = { ...j(this, Ki), ...t }), this.updateGcTime(this.options.gcTime));
      }
      optionalRemove() {
        !this.observers.length && this.state.fetchStatus === 'idle' && j(this, Dt).remove(this);
      }
      setData(t, n) {
        const r = Q2(this.state.data, t, this.options);
        return (
          et(this, en, jn).call(this, {
            data: r,
            type: 'success',
            dataUpdatedAt: n == null ? void 0 : n.updatedAt,
            manual: n == null ? void 0 : n.manual,
          }),
          r
        );
      }
      setState(t, n) {
        et(this, en, jn).call(this, { type: 'setState', state: t, setStateOptions: n });
      }
      cancel(t) {
        var r, s;
        const n = (r = j(this, rt)) == null ? void 0 : r.promise;
        return ((s = j(this, rt)) == null || s.cancel(t), n ? n.then(Jt).catch(Jt) : Promise.resolve());
      }
      destroy() {
        (super.destroy(), this.cancel({ silent: !0 }));
      }
      reset() {
        (this.destroy(), this.setState(j(this, io)));
      }
      isActive() {
        return this.observers.some(t => K2(t.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === Sp || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStatic() {
        return this.getObserversCount() > 0 ? this.observers.some(t => Od(t.options.staleTime, this) === 'static') : !1;
      }
      isStale() {
        return this.getObserversCount() > 0
          ? this.observers.some(t => t.getCurrentResult().isStale)
          : this.state.data === void 0 || this.state.isInvalidated;
      }
      isStaleByTime(t = 0) {
        return this.state.data === void 0 ? !0 : t === 'static' ? !1 : this.state.isInvalidated ? !0 : !G2(this.state.dataUpdatedAt, t);
      }
      onFocus() {
        var n;
        const t = this.observers.find(r => r.shouldFetchOnWindowFocus());
        (t == null || t.refetch({ cancelRefetch: !1 }), (n = j(this, rt)) == null || n.continue());
      }
      onOnline() {
        var n;
        const t = this.observers.find(r => r.shouldFetchOnReconnect());
        (t == null || t.refetch({ cancelRefetch: !1 }), (n = j(this, rt)) == null || n.continue());
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t), this.clearGcTimeout(), j(this, Dt).notify({ type: 'observerAdded', query: this, observer: t }));
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter(n => n !== t)),
          this.observers.length ||
            (j(this, rt) && (j(this, es) ? j(this, rt).cancel({ revert: !0 }) : j(this, rt).cancelRetry()), this.scheduleGc()),
          j(this, Dt).notify({ type: 'observerRemoved', query: this, observer: t }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated || et(this, en, jn).call(this, { type: 'invalidate' });
      }
      fetch(t, n) {
        var u, f, p;
        if (this.state.fetchStatus !== 'idle') {
          if (this.state.data !== void 0 && n != null && n.cancelRefetch) this.cancel({ silent: !0 });
          else if (j(this, rt)) return (j(this, rt).continueRetry(), j(this, rt).promise);
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          const h = this.observers.find(m => m.options.queryFn);
          h && this.setOptions(h.options);
        }
        const r = new AbortController(),
          s = h => {
            Object.defineProperty(h, 'signal', { enumerable: !0, get: () => (ae(this, es, !0), r.signal) });
          },
          o = () => {
            const h = yw(this.options, n),
              S = (() => {
                const v = { client: j(this, Jr), queryKey: this.queryKey, meta: this.meta };
                return (s(v), v);
              })();
            return (ae(this, es, !1), this.options.persister ? this.options.persister(h, S, this) : h(S));
          },
          a = (() => {
            const h = {
              fetchOptions: n,
              options: this.options,
              queryKey: this.queryKey,
              client: j(this, Jr),
              state: this.state,
              fetchFn: o,
            };
            return (s(h), h);
          })();
        ((u = this.options.behavior) == null || u.onFetch(a, this),
          ae(this, Xr, this.state),
          (this.state.fetchStatus === 'idle' || this.state.fetchMeta !== ((f = a.fetchOptions) == null ? void 0 : f.meta)) &&
            et(this, en, jn).call(this, { type: 'fetch', meta: (p = a.fetchOptions) == null ? void 0 : p.meta }));
        const c = h => {
          var m, S, v, w;
          ((yu(h) && h.silent) || et(this, en, jn).call(this, { type: 'error', error: h }),
            yu(h) ||
              ((S = (m = j(this, Dt).config).onError) == null || S.call(m, h, this),
              (w = (v = j(this, Dt).config).onSettled) == null || w.call(v, this.state.data, h, this)),
            this.scheduleGc());
        };
        return (
          ae(
            this,
            rt,
            bw({
              initialPromise: n == null ? void 0 : n.initialPromise,
              fn: a.fetchFn,
              abort: r.abort.bind(r),
              onSuccess: h => {
                var m, S, v, w;
                if (h === void 0) {
                  c(new Error(`${this.queryHash} data is undefined`));
                  return;
                }
                try {
                  this.setData(h);
                } catch (x) {
                  c(x);
                  return;
                }
                ((S = (m = j(this, Dt).config).onSuccess) == null || S.call(m, h, this),
                  (w = (v = j(this, Dt).config).onSettled) == null || w.call(v, h, this.state.error, this),
                  this.scheduleGc());
              },
              onError: c,
              onFail: (h, m) => {
                et(this, en, jn).call(this, { type: 'failed', failureCount: h, error: m });
              },
              onPause: () => {
                et(this, en, jn).call(this, { type: 'pause' });
              },
              onContinue: () => {
                et(this, en, jn).call(this, { type: 'continue' });
              },
              retry: a.options.retry,
              retryDelay: a.options.retryDelay,
              networkMode: a.options.networkMode,
              canRun: () => !0,
            })
          ),
          j(this, rt).start()
        );
      }
    }),
    (io = new WeakMap()),
    (Xr = new WeakMap()),
    (Dt = new WeakMap()),
    (Jr = new WeakMap()),
    (rt = new WeakMap()),
    (Ki = new WeakMap()),
    (es = new WeakMap()),
    (en = new WeakSet()),
    (jn = function (t) {
      const n = r => {
        switch (t.type) {
          case 'failed':
            return { ...r, fetchFailureCount: t.failureCount, fetchFailureReason: t.error };
          case 'pause':
            return { ...r, fetchStatus: 'paused' };
          case 'continue':
            return { ...r, fetchStatus: 'fetching' };
          case 'fetch':
            return { ...r, ...oP(r.data, this.options), fetchMeta: t.meta ?? null };
          case 'success':
            return (
              ae(this, Xr, void 0),
              {
                ...r,
                data: t.data,
                dataUpdateCount: r.dataUpdateCount + 1,
                dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
                error: null,
                isInvalidated: !1,
                status: 'success',
                ...(!t.manual && { fetchStatus: 'idle', fetchFailureCount: 0, fetchFailureReason: null }),
              }
            );
          case 'error':
            const s = t.error;
            return yu(s) && s.revert && j(this, Xr)
              ? { ...j(this, Xr), fetchStatus: 'idle' }
              : {
                  ...r,
                  error: s,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  fetchFailureReason: s,
                  fetchStatus: 'idle',
                  status: 'error',
                };
          case 'invalidate':
            return { ...r, isInvalidated: !0 };
          case 'setState':
            return { ...r, ...t.state };
        }
      };
      ((this.state = n(this.state)),
        ct.batch(() => {
          (this.observers.forEach(r => {
            r.onQueryUpdate();
          }),
            j(this, Dt).notify({ query: this, type: 'updated', action: t }));
        }));
    }),
    Ig);
function oP(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: ww(t.networkMode) ? 'fetching' : 'paused',
    ...(e === void 0 && { error: null, status: 'pending' }),
  };
}
function iP(e) {
  const t = typeof e.initialData == 'function' ? e.initialData() : e.initialData,
    n = t !== void 0,
    r = n ? (typeof e.initialDataUpdatedAt == 'function' ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt) : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? (r ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? 'success' : 'pending',
    fetchStatus: 'idle',
  };
}
var hn,
  Ag,
  aP =
    ((Ag = class extends yc {
      constructor(t = {}) {
        super();
        we(this, hn);
        ((this.config = t), ae(this, hn, new Map()));
      }
      build(t, n, r) {
        const s = n.queryKey,
          o = n.queryHash ?? wp(s, n);
        let i = this.get(o);
        return (
          i ||
            ((i = new sP({
              client: t,
              queryKey: s,
              queryHash: o,
              options: t.defaultQueryOptions(n),
              state: r,
              defaultOptions: t.getQueryDefaults(s),
            })),
            this.add(i)),
          i
        );
      }
      add(t) {
        j(this, hn).has(t.queryHash) || (j(this, hn).set(t.queryHash, t), this.notify({ type: 'added', query: t }));
      }
      remove(t) {
        const n = j(this, hn).get(t.queryHash);
        n && (t.destroy(), n === t && j(this, hn).delete(t.queryHash), this.notify({ type: 'removed', query: t }));
      }
      clear() {
        ct.batch(() => {
          this.getAll().forEach(t => {
            this.remove(t);
          });
        });
      }
      get(t) {
        return j(this, hn).get(t);
      }
      getAll() {
        return [...j(this, hn).values()];
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find(r => Am(n, r));
      }
      findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter(r => Am(t, r)) : n;
      }
      notify(t) {
        ct.batch(() => {
          this.listeners.forEach(n => {
            n(t);
          });
        });
      }
      onFocus() {
        ct.batch(() => {
          this.getAll().forEach(t => {
            t.onFocus();
          });
        });
      }
      onOnline() {
        ct.batch(() => {
          this.getAll().forEach(t => {
            t.onOnline();
          });
        });
      }
    }),
    (hn = new WeakMap()),
    Ag),
  mn,
  at,
  ts,
  gn,
  qn,
  Mg,
  lP =
    ((Mg = class extends Cw {
      constructor(t) {
        super();
        we(this, gn);
        we(this, mn);
        we(this, at);
        we(this, ts);
        ((this.mutationId = t.mutationId),
          ae(this, at, t.mutationCache),
          ae(this, mn, []),
          (this.state = t.state || cP()),
          this.setOptions(t.options),
          this.scheduleGc());
      }
      setOptions(t) {
        ((this.options = t), this.updateGcTime(this.options.gcTime));
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(t) {
        j(this, mn).includes(t) ||
          (j(this, mn).push(t), this.clearGcTimeout(), j(this, at).notify({ type: 'observerAdded', mutation: this, observer: t }));
      }
      removeObserver(t) {
        (ae(
          this,
          mn,
          j(this, mn).filter(n => n !== t)
        ),
          this.scheduleGc(),
          j(this, at).notify({ type: 'observerRemoved', mutation: this, observer: t }));
      }
      optionalRemove() {
        j(this, mn).length || (this.state.status === 'pending' ? this.scheduleGc() : j(this, at).remove(this));
      }
      continue() {
        var t;
        return ((t = j(this, ts)) == null ? void 0 : t.continue()) ?? this.execute(this.state.variables);
      }
      async execute(t) {
        var o, i, a, c, u, f, p, h, m, S, v, w, x, g, y, b, C, k, N, P;
        const n = () => {
          et(this, gn, qn).call(this, { type: 'continue' });
        };
        ae(
          this,
          ts,
          bw({
            fn: () => (this.options.mutationFn ? this.options.mutationFn(t) : Promise.reject(new Error('No mutationFn found'))),
            onFail: (T, R) => {
              et(this, gn, qn).call(this, { type: 'failed', failureCount: T, error: R });
            },
            onPause: () => {
              et(this, gn, qn).call(this, { type: 'pause' });
            },
            onContinue: n,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => j(this, at).canRun(this),
          })
        );
        const r = this.state.status === 'pending',
          s = !j(this, ts).canStart();
        try {
          if (r) n();
          else {
            (et(this, gn, qn).call(this, { type: 'pending', variables: t, isPaused: s }),
              await ((i = (o = j(this, at).config).onMutate) == null ? void 0 : i.call(o, t, this)));
            const R = await ((c = (a = this.options).onMutate) == null ? void 0 : c.call(a, t));
            R !== this.state.context && et(this, gn, qn).call(this, { type: 'pending', context: R, variables: t, isPaused: s });
          }
          const T = await j(this, ts).start();
          return (
            await ((f = (u = j(this, at).config).onSuccess) == null ? void 0 : f.call(u, T, t, this.state.context, this)),
            await ((h = (p = this.options).onSuccess) == null ? void 0 : h.call(p, T, t, this.state.context)),
            await ((S = (m = j(this, at).config).onSettled) == null
              ? void 0
              : S.call(m, T, null, this.state.variables, this.state.context, this)),
            await ((w = (v = this.options).onSettled) == null ? void 0 : w.call(v, T, null, t, this.state.context)),
            et(this, gn, qn).call(this, { type: 'success', data: T }),
            T
          );
        } catch (T) {
          try {
            throw (
              await ((g = (x = j(this, at).config).onError) == null ? void 0 : g.call(x, T, t, this.state.context, this)),
              await ((b = (y = this.options).onError) == null ? void 0 : b.call(y, T, t, this.state.context)),
              await ((k = (C = j(this, at).config).onSettled) == null
                ? void 0
                : k.call(C, void 0, T, this.state.variables, this.state.context, this)),
              await ((P = (N = this.options).onSettled) == null ? void 0 : P.call(N, void 0, T, t, this.state.context)),
              T
            );
          } finally {
            et(this, gn, qn).call(this, { type: 'error', error: T });
          }
        } finally {
          j(this, at).runNext(this);
        }
      }
    }),
    (mn = new WeakMap()),
    (at = new WeakMap()),
    (ts = new WeakMap()),
    (gn = new WeakSet()),
    (qn = function (t) {
      const n = r => {
        switch (t.type) {
          case 'failed':
            return { ...r, failureCount: t.failureCount, failureReason: t.error };
          case 'pause':
            return { ...r, isPaused: !0 };
          case 'continue':
            return { ...r, isPaused: !1 };
          case 'pending':
            return {
              ...r,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: 'pending',
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case 'success':
            return { ...r, data: t.data, failureCount: 0, failureReason: null, error: null, status: 'success', isPaused: !1 };
          case 'error':
            return {
              ...r,
              data: void 0,
              error: t.error,
              failureCount: r.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: 'error',
            };
        }
      };
      ((this.state = n(this.state)),
        ct.batch(() => {
          (j(this, mn).forEach(r => {
            r.onMutationUpdate(t);
          }),
            j(this, at).notify({ mutation: this, type: 'updated', action: t }));
        }));
    }),
    Mg);
function cP() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: 'idle',
    variables: void 0,
    submittedAt: 0,
  };
}
var In,
  tn,
  Zi,
  Og,
  uP =
    ((Og = class extends yc {
      constructor(t = {}) {
        super();
        we(this, In);
        we(this, tn);
        we(this, Zi);
        ((this.config = t), ae(this, In, new Set()), ae(this, tn, new Map()), ae(this, Zi, 0));
      }
      build(t, n, r) {
        const s = new lP({ mutationCache: this, mutationId: ++ca(this, Zi)._, options: t.defaultMutationOptions(n), state: r });
        return (this.add(s), s);
      }
      add(t) {
        j(this, In).add(t);
        const n = Ra(t);
        if (typeof n == 'string') {
          const r = j(this, tn).get(n);
          r ? r.push(t) : j(this, tn).set(n, [t]);
        }
        this.notify({ type: 'added', mutation: t });
      }
      remove(t) {
        if (j(this, In).delete(t)) {
          const n = Ra(t);
          if (typeof n == 'string') {
            const r = j(this, tn).get(n);
            if (r)
              if (r.length > 1) {
                const s = r.indexOf(t);
                s !== -1 && r.splice(s, 1);
              } else r[0] === t && j(this, tn).delete(n);
          }
        }
        this.notify({ type: 'removed', mutation: t });
      }
      canRun(t) {
        const n = Ra(t);
        if (typeof n == 'string') {
          const r = j(this, tn).get(n),
            s = r == null ? void 0 : r.find(o => o.state.status === 'pending');
          return !s || s === t;
        } else return !0;
      }
      runNext(t) {
        var r;
        const n = Ra(t);
        if (typeof n == 'string') {
          const s = (r = j(this, tn).get(n)) == null ? void 0 : r.find(o => o !== t && o.state.isPaused);
          return (s == null ? void 0 : s.continue()) ?? Promise.resolve();
        } else return Promise.resolve();
      }
      clear() {
        ct.batch(() => {
          (j(this, In).forEach(t => {
            this.notify({ type: 'removed', mutation: t });
          }),
            j(this, In).clear(),
            j(this, tn).clear());
        });
      }
      getAll() {
        return Array.from(j(this, In));
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find(r => Mm(n, r));
      }
      findAll(t = {}) {
        return this.getAll().filter(n => Mm(t, n));
      }
      notify(t) {
        ct.batch(() => {
          this.listeners.forEach(n => {
            n(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter(n => n.state.isPaused);
        return ct.batch(() => Promise.all(t.map(n => n.continue().catch(Jt))));
      }
    }),
    (In = new WeakMap()),
    (tn = new WeakMap()),
    (Zi = new WeakMap()),
    Og);
function Ra(e) {
  var t;
  return (t = e.options.scope) == null ? void 0 : t.id;
}
function Dm(e) {
  return {
    onFetch: (t, n) => {
      var f, p, h, m, S;
      const r = t.options,
        s = (h = (p = (f = t.fetchOptions) == null ? void 0 : f.meta) == null ? void 0 : p.fetchMore) == null ? void 0 : h.direction,
        o = ((m = t.state.data) == null ? void 0 : m.pages) || [],
        i = ((S = t.state.data) == null ? void 0 : S.pageParams) || [];
      let a = { pages: [], pageParams: [] },
        c = 0;
      const u = async () => {
        let v = !1;
        const w = y => {
            Object.defineProperty(y, 'signal', {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (v = !0)
                  : t.signal.addEventListener('abort', () => {
                      v = !0;
                    }),
                t.signal
              ),
            });
          },
          x = yw(t.options, t.fetchOptions),
          g = async (y, b, C) => {
            if (v) return Promise.reject();
            if (b == null && y.pages.length) return Promise.resolve(y);
            const N = (() => {
                const H = {
                  client: t.client,
                  queryKey: t.queryKey,
                  pageParam: b,
                  direction: C ? 'backward' : 'forward',
                  meta: t.options.meta,
                };
                return (w(H), H);
              })(),
              P = await x(N),
              { maxPages: T } = t.options,
              R = C ? Y2 : q2;
            return { pages: R(y.pages, P, T), pageParams: R(y.pageParams, b, T) };
          };
        if (s && o.length) {
          const y = s === 'backward',
            b = y ? dP : Fm,
            C = { pages: o, pageParams: i },
            k = b(r, C);
          a = await g(C, k, y);
        } else {
          const y = e ?? o.length;
          do {
            const b = c === 0 ? (i[0] ?? r.initialPageParam) : Fm(r, a);
            if (c > 0 && b == null) break;
            ((a = await g(a, b)), c++);
          } while (c < y);
        }
        return a;
      };
      t.options.persister
        ? (t.fetchFn = () => {
            var v, w;
            return (w = (v = t.options).persister) == null
              ? void 0
              : w.call(v, u, { client: t.client, queryKey: t.queryKey, meta: t.options.meta, signal: t.signal }, n);
          })
        : (t.fetchFn = u);
    },
  };
}
function Fm(e, { pages: t, pageParams: n }) {
  const r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function dP(e, { pages: t, pageParams: n }) {
  var r;
  return t.length > 0 ? ((r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n)) : void 0;
}
var Le,
  ir,
  ar,
  ao,
  lo,
  lr,
  co,
  uo,
  Lg,
  fP =
    ((Lg = class {
      constructor(e = {}) {
        we(this, Le);
        we(this, ir);
        we(this, ar);
        we(this, ao);
        we(this, lo);
        we(this, lr);
        we(this, co);
        we(this, uo);
        (ae(this, Le, e.queryCache || new aP()),
          ae(this, ir, e.mutationCache || new uP()),
          ae(this, ar, e.defaultOptions || {}),
          ae(this, ao, new Map()),
          ae(this, lo, new Map()),
          ae(this, lr, 0));
      }
      mount() {
        (ca(this, lr)._++,
          j(this, lr) === 1 &&
            (ae(
              this,
              co,
              xw.subscribe(async e => {
                e && (await this.resumePausedMutations(), j(this, Le).onFocus());
              })
            ),
            ae(
              this,
              uo,
              Rl.subscribe(async e => {
                e && (await this.resumePausedMutations(), j(this, Le).onOnline());
              })
            )));
      }
      unmount() {
        var e, t;
        (ca(this, lr)._--,
          j(this, lr) === 0 &&
            ((e = j(this, co)) == null || e.call(this),
            ae(this, co, void 0),
            (t = j(this, uo)) == null || t.call(this),
            ae(this, uo, void 0)));
      }
      isFetching(e) {
        return j(this, Le).findAll({ ...e, fetchStatus: 'fetching' }).length;
      }
      isMutating(e) {
        return j(this, ir).findAll({ ...e, status: 'pending' }).length;
      }
      getQueryData(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = j(this, Le).get(t.queryHash)) == null ? void 0 : n.state.data;
      }
      ensureQueryData(e) {
        const t = this.defaultQueryOptions(e),
          n = j(this, Le).build(this, t),
          r = n.state.data;
        return r === void 0
          ? this.fetchQuery(e)
          : (e.revalidateIfStale && n.isStaleByTime(Od(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r));
      }
      getQueriesData(e) {
        return j(this, Le)
          .findAll(e)
          .map(({ queryKey: t, state: n }) => {
            const r = n.data;
            return [t, r];
          });
      }
      setQueryData(e, t, n) {
        const r = this.defaultQueryOptions({ queryKey: e }),
          s = j(this, Le).get(r.queryHash),
          o = s == null ? void 0 : s.state.data,
          i = W2(t, o);
        if (i !== void 0)
          return j(this, Le)
            .build(this, r)
            .setData(i, { ...n, manual: !0 });
      }
      setQueriesData(e, t, n) {
        return ct.batch(() =>
          j(this, Le)
            .findAll(e)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, t, n)])
        );
      }
      getQueryState(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = j(this, Le).get(t.queryHash)) == null ? void 0 : n.state;
      }
      removeQueries(e) {
        const t = j(this, Le);
        ct.batch(() => {
          t.findAll(e).forEach(n => {
            t.remove(n);
          });
        });
      }
      resetQueries(e, t) {
        const n = j(this, Le);
        return ct.batch(
          () => (
            n.findAll(e).forEach(r => {
              r.reset();
            }),
            this.refetchQueries({ type: 'active', ...e }, t)
          )
        );
      }
      cancelQueries(e, t = {}) {
        const n = { revert: !0, ...t },
          r = ct.batch(() =>
            j(this, Le)
              .findAll(e)
              .map(s => s.cancel(n))
          );
        return Promise.all(r).then(Jt).catch(Jt);
      }
      invalidateQueries(e, t = {}) {
        return ct.batch(
          () => (
            j(this, Le)
              .findAll(e)
              .forEach(n => {
                n.invalidate();
              }),
            (e == null ? void 0 : e.refetchType) === 'none'
              ? Promise.resolve()
              : this.refetchQueries({ ...e, type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? 'active' }, t)
          )
        );
      }
      refetchQueries(e, t = {}) {
        const n = { ...t, cancelRefetch: t.cancelRefetch ?? !0 },
          r = ct.batch(() =>
            j(this, Le)
              .findAll(e)
              .filter(s => !s.isDisabled() && !s.isStatic())
              .map(s => {
                let o = s.fetch(void 0, n);
                return (n.throwOnError || (o = o.catch(Jt)), s.state.fetchStatus === 'paused' ? Promise.resolve() : o);
              })
          );
        return Promise.all(r).then(Jt);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        t.retry === void 0 && (t.retry = !1);
        const n = j(this, Le).build(this, t);
        return n.isStaleByTime(Od(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(Jt).catch(Jt);
      }
      fetchInfiniteQuery(e) {
        return ((e.behavior = Dm(e.pages)), this.fetchQuery(e));
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(Jt).catch(Jt);
      }
      ensureInfiniteQueryData(e) {
        return ((e.behavior = Dm(e.pages)), this.ensureQueryData(e));
      }
      resumePausedMutations() {
        return Rl.isOnline() ? j(this, ir).resumePausedMutations() : Promise.resolve();
      }
      getQueryCache() {
        return j(this, Le);
      }
      getMutationCache() {
        return j(this, ir);
      }
      getDefaultOptions() {
        return j(this, ar);
      }
      setDefaultOptions(e) {
        ae(this, ar, e);
      }
      setQueryDefaults(e, t) {
        j(this, ao).set($i(e), { queryKey: e, defaultOptions: t });
      }
      getQueryDefaults(e) {
        const t = [...j(this, ao).values()],
          n = {};
        return (
          t.forEach(r => {
            zi(e, r.queryKey) && Object.assign(n, r.defaultOptions);
          }),
          n
        );
      }
      setMutationDefaults(e, t) {
        j(this, lo).set($i(e), { mutationKey: e, defaultOptions: t });
      }
      getMutationDefaults(e) {
        const t = [...j(this, lo).values()],
          n = {};
        return (
          t.forEach(r => {
            zi(e, r.mutationKey) && Object.assign(n, r.defaultOptions);
          }),
          n
        );
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const t = { ...j(this, ar).queries, ...this.getQueryDefaults(e.queryKey), ...e, _defaulted: !0 };
        return (
          t.queryHash || (t.queryHash = wp(t.queryKey, t)),
          t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== 'always'),
          t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
          !t.networkMode && t.persister && (t.networkMode = 'offlineFirst'),
          t.queryFn === Sp && (t.enabled = !1),
          t
        );
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ...j(this, ar).mutations,
              ...((e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            };
      }
      clear() {
        (j(this, Le).clear(), j(this, ir).clear());
      }
    }),
    (Le = new WeakMap()),
    (ir = new WeakMap()),
    (ar = new WeakMap()),
    (ao = new WeakMap()),
    (lo = new WeakMap()),
    (lr = new WeakMap()),
    (co = new WeakMap()),
    (uo = new WeakMap()),
    Lg),
  pP = d.createContext(void 0),
  hP = ({ client: e, children: t }) => (
    d.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e]
    ),
    l.jsx(pP.Provider, { value: e, children: t })
  );
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Vi() {
  return (
    (Vi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Vi.apply(this, arguments)
  );
}
var dr;
(function (e) {
  ((e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE'));
})(dr || (dr = {}));
const $m = 'popstate';
function mP(e) {
  e === void 0 && (e = {});
  function t(s, o) {
    let { pathname: i = '/', search: a = '', hash: c = '' } = xs(s.location.hash.substr(1));
    return (
      !i.startsWith('/') && !i.startsWith('.') && (i = '/' + i),
      Dd('', { pathname: i, search: a, hash: c }, (o.state && o.state.usr) || null, (o.state && o.state.key) || 'default')
    );
  }
  function n(s, o) {
    let i = s.document.querySelector('base'),
      a = '';
    if (i && i.getAttribute('href')) {
      let c = s.location.href,
        u = c.indexOf('#');
      a = u === -1 ? c : c.slice(0, u);
    }
    return a + '#' + (typeof o == 'string' ? o : Il(o));
  }
  function r(s, o) {
    bp(s.pathname.charAt(0) === '/', 'relative pathnames are not supported in hash history.push(' + JSON.stringify(o) + ')');
  }
  return vP(t, n, r, e);
}
function Fe(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t);
}
function bp(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function gP() {
  return Math.random().toString(36).substr(2, 8);
}
function zm(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Dd(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Vi({ pathname: typeof e == 'string' ? e : e.pathname, search: '', hash: '' }, typeof t == 'string' ? xs(t) : t, {
      state: n,
      key: (t && t.key) || r || gP(),
    })
  );
}
function Il(e) {
  let { pathname: t = '/', search: n = '', hash: r = '' } = e;
  return (n && n !== '?' && (t += n.charAt(0) === '?' ? n : '?' + n), r && r !== '#' && (t += r.charAt(0) === '#' ? r : '#' + r), t);
}
function xs(e) {
  let t = {};
  if (e) {
    let n = e.indexOf('#');
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf('?');
    (r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))), e && (t.pathname = e));
  }
  return t;
}
function vP(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: s = document.defaultView, v5Compat: o = !1 } = r,
    i = s.history,
    a = dr.Pop,
    c = null,
    u = f();
  u == null && ((u = 0), i.replaceState(Vi({}, i.state, { idx: u }), ''));
  function f() {
    return (i.state || { idx: null }).idx;
  }
  function p() {
    a = dr.Pop;
    let w = f(),
      x = w == null ? null : w - u;
    ((u = w), c && c({ action: a, location: v.location, delta: x }));
  }
  function h(w, x) {
    a = dr.Push;
    let g = Dd(v.location, w, x);
    (n && n(g, w), (u = f() + 1));
    let y = zm(g, u),
      b = v.createHref(g);
    try {
      i.pushState(y, '', b);
    } catch (C) {
      if (C instanceof DOMException && C.name === 'DataCloneError') throw C;
      s.location.assign(b);
    }
    o && c && c({ action: a, location: v.location, delta: 1 });
  }
  function m(w, x) {
    a = dr.Replace;
    let g = Dd(v.location, w, x);
    (n && n(g, w), (u = f()));
    let y = zm(g, u),
      b = v.createHref(g);
    (i.replaceState(y, '', b), o && c && c({ action: a, location: v.location, delta: 0 }));
  }
  function S(w) {
    let x = s.location.origin !== 'null' ? s.location.origin : s.location.href,
      g = typeof w == 'string' ? w : Il(w);
    return ((g = g.replace(/ $/, '%20')), Fe(x, 'No window.location.(origin|href) available to create URL for href: ' + g), new URL(g, x));
  }
  let v = {
    get action() {
      return a;
    },
    get location() {
      return e(s, i);
    },
    listen(w) {
      if (c) throw new Error('A history only accepts one active listener');
      return (
        s.addEventListener($m, p),
        (c = w),
        () => {
          (s.removeEventListener($m, p), (c = null));
        }
      );
    },
    createHref(w) {
      return t(s, w);
    },
    createURL: S,
    encodeLocation(w) {
      let x = S(w);
      return { pathname: x.pathname, search: x.search, hash: x.hash };
    },
    push: h,
    replace: m,
    go(w) {
      return i.go(w);
    },
  };
  return v;
}
var Vm;
(function (e) {
  ((e.data = 'data'), (e.deferred = 'deferred'), (e.redirect = 'redirect'), (e.error = 'error'));
})(Vm || (Vm = {}));
function yP(e, t, n) {
  return (n === void 0 && (n = '/'), xP(e, t, n));
}
function xP(e, t, n, r) {
  let s = typeof t == 'string' ? xs(t) : t,
    o = So(s.pathname || '/', n);
  if (o == null) return null;
  let i = Ew(e);
  wP(i);
  let a = null;
  for (let c = 0; a == null && c < i.length; ++c) {
    let u = RP(o);
    a = jP(i[c], u);
  }
  return a;
}
function Ew(e, t, n, r) {
  (t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = ''));
  let s = (o, i, a) => {
    let c = { relativePath: a === void 0 ? o.path || '' : a, caseSensitive: o.caseSensitive === !0, childrenIndex: i, route: o };
    c.relativePath.startsWith('/') &&
      (Fe(
        c.relativePath.startsWith(r),
        'Absolute route path "' +
          c.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.'
      ),
      (c.relativePath = c.relativePath.slice(r.length)));
    let u = Sr([r, c.relativePath]),
      f = n.concat(c);
    (o.children &&
      o.children.length > 0 &&
      (Fe(o.index !== !0, 'Index routes must not have child routes. Please remove ' + ('all child routes from route path "' + u + '".')),
      Ew(o.children, t, f, u)),
      !(o.path == null && !o.index) && t.push({ path: u, score: _P(u, o.index), routesMeta: f }));
  };
  return (
    e.forEach((o, i) => {
      var a;
      if (o.path === '' || !((a = o.path) != null && a.includes('?'))) s(o, i);
      else for (let c of Nw(o.path)) s(o, i, c);
    }),
    t
  );
}
function Nw(e) {
  let t = e.split('/');
  if (t.length === 0) return [];
  let [n, ...r] = t,
    s = n.endsWith('?'),
    o = n.replace(/\?$/, '');
  if (r.length === 0) return s ? [o, ''] : [o];
  let i = Nw(r.join('/')),
    a = [];
  return (
    a.push(...i.map(c => (c === '' ? o : [o, c].join('/')))),
    s && a.push(...i),
    a.map(c => (e.startsWith('/') && c === '' ? '/' : c))
  );
}
function wP(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : PP(
          t.routesMeta.map(r => r.childrenIndex),
          n.routesMeta.map(r => r.childrenIndex)
        )
  );
}
const SP = /^:[\w-]+$/,
  bP = 3,
  CP = 2,
  EP = 1,
  NP = 10,
  kP = -2,
  Um = e => e === '*';
function _P(e, t) {
  let n = e.split('/'),
    r = n.length;
  return (n.some(Um) && (r += kP), t && (r += CP), n.filter(s => !Um(s)).reduce((s, o) => s + (SP.test(o) ? bP : o === '' ? EP : NP), r));
}
function PP(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, s) => r === t[s]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function jP(e, t, n) {
  let { routesMeta: r } = e,
    s = {},
    o = '/',
    i = [];
  for (let a = 0; a < r.length; ++a) {
    let c = r[a],
      u = a === r.length - 1,
      f = o === '/' ? t : t.slice(o.length) || '/',
      p = Fd({ path: c.relativePath, caseSensitive: c.caseSensitive, end: u }, f),
      h = c.route;
    if (!p) return null;
    (Object.assign(s, p.params),
      i.push({ params: s, pathname: Sr([o, p.pathname]), pathnameBase: OP(Sr([o, p.pathnameBase])), route: h }),
      p.pathnameBase !== '/' && (o = Sr([o, p.pathnameBase])));
  }
  return i;
}
function Fd(e, t) {
  typeof e == 'string' && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = TP(e.path, e.caseSensitive, e.end),
    s = t.match(n);
  if (!s) return null;
  let o = s[0],
    i = o.replace(/(.)\/+$/, '$1'),
    a = s.slice(1);
  return {
    params: r.reduce((u, f, p) => {
      let { paramName: h, isOptional: m } = f;
      if (h === '*') {
        let v = a[p] || '';
        i = o.slice(0, o.length - v.length).replace(/(.)\/+$/, '$1');
      }
      const S = a[p];
      return (m && !S ? (u[h] = void 0) : (u[h] = (S || '').replace(/%2F/g, '/')), u);
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  };
}
function TP(e, t, n) {
  (t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    bp(
      e === '*' || !e.endsWith('*') || e.endsWith('/*'),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + e.replace(/\*$/, '/*') + '".')
    ));
  let r = [],
    s =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (i, a, c) => (r.push({ paramName: a, isOptional: c != null }), c ? '/?([^\\/]+)?' : '/([^\\/]+)'));
  return (
    e.endsWith('*')
      ? (r.push({ paramName: '*' }), (s += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (s += '\\/*$')
        : e !== '' && e !== '/' && (s += '(?:(?=\\/|$))'),
    [new RegExp(s, t ? void 0 : 'i'), r]
  );
}
function RP(e) {
  try {
    return e
      .split('/')
      .map(t => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/');
  } catch (t) {
    return (
      bp(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ('encoding (' + t + ').')
      ),
      e
    );
  }
}
function So(e, t) {
  if (t === '/') return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== '/' ? null : e.slice(n) || '/';
}
function IP(e, t) {
  t === void 0 && (t = '/');
  let { pathname: n, search: r = '', hash: s = '' } = typeof e == 'string' ? xs(e) : e;
  return { pathname: n ? (n.startsWith('/') ? n : AP(n, t)) : t, search: LP(r), hash: DP(s) };
}
function AP(e, t) {
  let n = t.replace(/\/+$/, '').split('/');
  return (
    e.split('/').forEach(s => {
      s === '..' ? n.length > 1 && n.pop() : s !== '.' && n.push(s);
    }),
    n.length > 1 ? n.join('/') : '/'
  );
}
function xu(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ('`to.' + t + '` field [' + JSON.stringify(r) + '].  Please separate it out to the ') +
    ('`to.' + n + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function MP(e) {
  return e.filter((t, n) => n === 0 || (t.route.path && t.route.path.length > 0));
}
function kw(e, t) {
  let n = MP(e);
  return t ? n.map((r, s) => (s === n.length - 1 ? r.pathname : r.pathnameBase)) : n.map(r => r.pathnameBase);
}
function _w(e, t, n, r) {
  r === void 0 && (r = !1);
  let s;
  typeof e == 'string'
    ? (s = xs(e))
    : ((s = Vi({}, e)),
      Fe(!s.pathname || !s.pathname.includes('?'), xu('?', 'pathname', 'search', s)),
      Fe(!s.pathname || !s.pathname.includes('#'), xu('#', 'pathname', 'hash', s)),
      Fe(!s.search || !s.search.includes('#'), xu('#', 'search', 'hash', s)));
  let o = e === '' || s.pathname === '',
    i = o ? '/' : s.pathname,
    a;
  if (i == null) a = n;
  else {
    let p = t.length - 1;
    if (!r && i.startsWith('..')) {
      let h = i.split('/');
      for (; h[0] === '..'; ) (h.shift(), (p -= 1));
      s.pathname = h.join('/');
    }
    a = p >= 0 ? t[p] : '/';
  }
  let c = IP(s, a),
    u = i && i !== '/' && i.endsWith('/'),
    f = (o || i === '.') && n.endsWith('/');
  return (!c.pathname.endsWith('/') && (u || f) && (c.pathname += '/'), c);
}
const Sr = e => e.join('/').replace(/\/\/+/g, '/'),
  OP = e => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  LP = e => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  DP = e => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e);
function FP(e) {
  return e != null && typeof e.status == 'number' && typeof e.statusText == 'string' && typeof e.internal == 'boolean' && 'data' in e;
}
const Pw = ['post', 'put', 'patch', 'delete'];
new Set(Pw);
const $P = ['get', ...Pw];
new Set($P);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ui() {
  return (
    (Ui = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ui.apply(this, arguments)
  );
}
const wc = d.createContext(null),
  jw = d.createContext(null),
  Mr = d.createContext(null),
  Sc = d.createContext(null),
  ws = d.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Tw = d.createContext(null);
function zP(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  sa() || Fe(!1);
  let { basename: r, navigator: s } = d.useContext(Mr),
    { hash: o, pathname: i, search: a } = bc(e, { relative: n }),
    c = i;
  return (r !== '/' && (c = i === '/' ? r : Sr([r, i])), s.createHref({ pathname: c, search: a, hash: o }));
}
function sa() {
  return d.useContext(Sc) != null;
}
function $o() {
  return (sa() || Fe(!1), d.useContext(Sc).location);
}
function Rw(e) {
  d.useContext(Mr).static || d.useLayoutEffect(e);
}
function VP() {
  let { isDataRoute: e } = d.useContext(ws);
  return e ? ej() : UP();
}
function UP() {
  sa() || Fe(!1);
  let e = d.useContext(wc),
    { basename: t, future: n, navigator: r } = d.useContext(Mr),
    { matches: s } = d.useContext(ws),
    { pathname: o } = $o(),
    i = JSON.stringify(kw(s, n.v7_relativeSplatPath)),
    a = d.useRef(!1);
  return (
    Rw(() => {
      a.current = !0;
    }),
    d.useCallback(
      function (u, f) {
        if ((f === void 0 && (f = {}), !a.current)) return;
        if (typeof u == 'number') {
          r.go(u);
          return;
        }
        let p = _w(u, JSON.parse(i), o, f.relative === 'path');
        (e == null && t !== '/' && (p.pathname = p.pathname === '/' ? t : Sr([t, p.pathname])),
          (f.replace ? r.replace : r.push)(p, f.state, f));
      },
      [t, r, i, o, e]
    )
  );
}
function bc(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = d.useContext(Mr),
    { matches: s } = d.useContext(ws),
    { pathname: o } = $o(),
    i = JSON.stringify(kw(s, r.v7_relativeSplatPath));
  return d.useMemo(() => _w(e, JSON.parse(i), o, n === 'path'), [e, i, o, n]);
}
function BP(e, t) {
  return WP(e, t);
}
function WP(e, t, n, r) {
  sa() || Fe(!1);
  let { navigator: s } = d.useContext(Mr),
    { matches: o } = d.useContext(ws),
    i = o[o.length - 1],
    a = i ? i.params : {};
  i && i.pathname;
  let c = i ? i.pathnameBase : '/';
  i && i.route;
  let u = $o(),
    f;
  if (t) {
    var p;
    let w = typeof t == 'string' ? xs(t) : t;
    (c === '/' || ((p = w.pathname) != null && p.startsWith(c)) || Fe(!1), (f = w));
  } else f = u;
  let h = f.pathname || '/',
    m = h;
  if (c !== '/') {
    let w = c.replace(/^\//, '').split('/');
    m = '/' + h.replace(/^\//, '').split('/').slice(w.length).join('/');
  }
  let S = yP(e, { pathname: m }),
    v = QP(
      S &&
        S.map(w =>
          Object.assign({}, w, {
            params: Object.assign({}, a, w.params),
            pathname: Sr([c, s.encodeLocation ? s.encodeLocation(w.pathname).pathname : w.pathname]),
            pathnameBase:
              w.pathnameBase === '/' ? c : Sr([c, s.encodeLocation ? s.encodeLocation(w.pathnameBase).pathname : w.pathnameBase]),
          })
        ),
      o,
      n,
      r
    );
  return t && v
    ? d.createElement(
        Sc.Provider,
        { value: { location: Ui({ pathname: '/', search: '', hash: '', state: null, key: 'default' }, f), navigationType: dr.Pop } },
        v
      )
    : v;
}
function HP() {
  let e = JP(),
    t = FP(e) ? e.status + ' ' + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    s = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' };
  return d.createElement(
    d.Fragment,
    null,
    d.createElement('h2', null, 'Unexpected Application Error!'),
    d.createElement('h3', { style: { fontStyle: 'italic' } }, t),
    n ? d.createElement('pre', { style: s }, n) : null,
    null
  );
}
const GP = d.createElement(HP, null);
class KP extends d.Component {
  constructor(t) {
    (super(t), (this.state = { location: t.location, revalidation: t.revalidation, error: t.error }));
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location || (n.revalidation !== 'idle' && t.revalidation === 'idle')
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : { error: t.error !== void 0 ? t.error : n.error, location: n.location, revalidation: t.revalidation || n.revalidation };
  }
  componentDidCatch(t, n) {
    console.error('React Router caught the following error during render', t, n);
  }
  render() {
    return this.state.error !== void 0
      ? d.createElement(
          ws.Provider,
          { value: this.props.routeContext },
          d.createElement(Tw.Provider, { value: this.state.error, children: this.props.component })
        )
      : this.props.children;
  }
}
function ZP(e) {
  let { routeContext: t, match: n, children: r } = e,
    s = d.useContext(wc);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = n.route.id),
    d.createElement(ws.Provider, { value: t }, r)
  );
}
function QP(e, t, n, r) {
  var s;
  if ((t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null)) {
    var o;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if ((o = r) != null && o.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0) e = n.matches;
    else return null;
  }
  let i = e,
    a = (s = n) == null ? void 0 : s.errors;
  if (a != null) {
    let f = i.findIndex(p => p.route.id && (a == null ? void 0 : a[p.route.id]) !== void 0);
    (f >= 0 || Fe(!1), (i = i.slice(0, Math.min(i.length, f + 1))));
  }
  let c = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let f = 0; f < i.length; f++) {
      let p = i[f];
      if (((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (u = f), p.route.id)) {
        let { loaderData: h, errors: m } = n,
          S = p.route.loader && h[p.route.id] === void 0 && (!m || m[p.route.id] === void 0);
        if (p.route.lazy || S) {
          ((c = !0), u >= 0 ? (i = i.slice(0, u + 1)) : (i = [i[0]]));
          break;
        }
      }
    }
  return i.reduceRight((f, p, h) => {
    let m,
      S = !1,
      v = null,
      w = null;
    n &&
      ((m = a && p.route.id ? a[p.route.id] : void 0),
      (v = p.route.errorElement || GP),
      c &&
        (u < 0 && h === 0
          ? (tj('route-fallback'), (S = !0), (w = null))
          : u === h && ((S = !0), (w = p.route.hydrateFallbackElement || null))));
    let x = t.concat(i.slice(0, h + 1)),
      g = () => {
        let y;
        return (
          m
            ? (y = v)
            : S
              ? (y = w)
              : p.route.Component
                ? (y = d.createElement(p.route.Component, null))
                : p.route.element
                  ? (y = p.route.element)
                  : (y = f),
          d.createElement(ZP, { match: p, routeContext: { outlet: f, matches: x, isDataRoute: n != null }, children: y })
        );
      };
    return n && (p.route.ErrorBoundary || p.route.errorElement || h === 0)
      ? d.createElement(KP, {
          location: n.location,
          revalidation: n.revalidation,
          component: v,
          error: m,
          children: g(),
          routeContext: { outlet: null, matches: x, isDataRoute: !0 },
        })
      : g();
  }, null);
}
var Iw = (function (e) {
    return ((e.UseBlocker = 'useBlocker'), (e.UseRevalidator = 'useRevalidator'), (e.UseNavigateStable = 'useNavigate'), e);
  })(Iw || {}),
  Aw = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseLoaderData = 'useLoaderData'),
      (e.UseActionData = 'useActionData'),
      (e.UseRouteError = 'useRouteError'),
      (e.UseNavigation = 'useNavigation'),
      (e.UseRouteLoaderData = 'useRouteLoaderData'),
      (e.UseMatches = 'useMatches'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      (e.UseRouteId = 'useRouteId'),
      e
    );
  })(Aw || {});
function qP(e) {
  let t = d.useContext(wc);
  return (t || Fe(!1), t);
}
function YP(e) {
  let t = d.useContext(jw);
  return (t || Fe(!1), t);
}
function XP(e) {
  let t = d.useContext(ws);
  return (t || Fe(!1), t);
}
function Mw(e) {
  let t = XP(),
    n = t.matches[t.matches.length - 1];
  return (n.route.id || Fe(!1), n.route.id);
}
function JP() {
  var e;
  let t = d.useContext(Tw),
    n = YP(),
    r = Mw();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function ej() {
  let { router: e } = qP(Iw.UseNavigateStable),
    t = Mw(Aw.UseNavigateStable),
    n = d.useRef(!1);
  return (
    Rw(() => {
      n.current = !0;
    }),
    d.useCallback(
      function (s, o) {
        (o === void 0 && (o = {}), n.current && (typeof s == 'number' ? e.navigate(s) : e.navigate(s, Ui({ fromRouteId: t }, o))));
      },
      [e, t]
    )
  );
}
const Bm = {};
function tj(e, t, n) {
  Bm[e] || (Bm[e] = !0);
}
function nj(e, t) {
  (e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath);
}
function si(e) {
  Fe(!1);
}
function rj(e) {
  let { basename: t = '/', children: n = null, location: r, navigationType: s = dr.Pop, navigator: o, static: i = !1, future: a } = e;
  sa() && Fe(!1);
  let c = t.replace(/^\/*/, '/'),
    u = d.useMemo(() => ({ basename: c, navigator: o, static: i, future: Ui({ v7_relativeSplatPath: !1 }, a) }), [c, a, o, i]);
  typeof r == 'string' && (r = xs(r));
  let { pathname: f = '/', search: p = '', hash: h = '', state: m = null, key: S = 'default' } = r,
    v = d.useMemo(() => {
      let w = So(f, c);
      return w == null ? null : { location: { pathname: w, search: p, hash: h, state: m, key: S }, navigationType: s };
    }, [c, f, p, h, m, S, s]);
  return v == null ? null : d.createElement(Mr.Provider, { value: u }, d.createElement(Sc.Provider, { children: n, value: v }));
}
function sj(e) {
  let { children: t, location: n } = e;
  return BP($d(t), n);
}
new Promise(() => {});
function $d(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    d.Children.forEach(e, (r, s) => {
      if (!d.isValidElement(r)) return;
      let o = [...t, s];
      if (r.type === d.Fragment) {
        n.push.apply(n, $d(r.props.children, o));
        return;
      }
      (r.type !== si && Fe(!1), !r.props.index || !r.props.children || Fe(!1));
      let i = {
        id: r.props.id || o.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      (r.props.children && (i.children = $d(r.props.children, o)), n.push(i));
    }),
    n
  );
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Al() {
  return (
    (Al = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Al.apply(this, arguments)
  );
}
function Ow(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    s,
    o;
  for (o = 0; o < r.length; o++) ((s = r[o]), !(t.indexOf(s) >= 0) && (n[s] = e[s]));
  return n;
}
function oj(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function ij(e, t) {
  return e.button === 0 && (!t || t === '_self') && !oj(e);
}
const aj = ['onClick', 'relative', 'reloadDocument', 'replace', 'state', 'target', 'to', 'preventScrollReset', 'viewTransition'],
  lj = ['aria-current', 'caseSensitive', 'className', 'end', 'style', 'to', 'viewTransition', 'children'],
  cj = '6';
try {
  window.__reactRouterVersion = cj;
} catch {}
const uj = d.createContext({ isTransitioning: !1 }),
  dj = 'startTransition',
  Wm = uf[dj];
function fj(e) {
  let { basename: t, children: n, future: r, window: s } = e,
    o = d.useRef();
  o.current == null && (o.current = mP({ window: s, v5Compat: !0 }));
  let i = o.current,
    [a, c] = d.useState({ action: i.action, location: i.location }),
    { v7_startTransition: u } = r || {},
    f = d.useCallback(
      p => {
        u && Wm ? Wm(() => c(p)) : c(p);
      },
      [c, u]
    );
  return (
    d.useLayoutEffect(() => i.listen(f), [i, f]),
    d.useEffect(() => nj(r), [r]),
    d.createElement(rj, { basename: t, children: n, location: a.location, navigationType: a.action, navigator: i, future: r })
  );
}
const pj = typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u',
  hj = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Lw = d.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: s,
        reloadDocument: o,
        replace: i,
        state: a,
        target: c,
        to: u,
        preventScrollReset: f,
        viewTransition: p,
      } = t,
      h = Ow(t, aj),
      { basename: m } = d.useContext(Mr),
      S,
      v = !1;
    if (typeof u == 'string' && hj.test(u) && ((S = u), pj))
      try {
        let y = new URL(window.location.href),
          b = u.startsWith('//') ? new URL(y.protocol + u) : new URL(u),
          C = So(b.pathname, m);
        b.origin === y.origin && C != null ? (u = C + b.search + b.hash) : (v = !0);
      } catch {}
    let w = zP(u, { relative: s }),
      x = vj(u, { replace: i, state: a, target: c, preventScrollReset: f, relative: s, viewTransition: p });
    function g(y) {
      (r && r(y), y.defaultPrevented || x(y));
    }
    return d.createElement('a', Al({}, h, { href: S || w, onClick: v || o ? r : g, ref: n, target: c }));
  }),
  mj = d.forwardRef(function (t, n) {
    let {
        'aria-current': r = 'page',
        caseSensitive: s = !1,
        className: o = '',
        end: i = !1,
        style: a,
        to: c,
        viewTransition: u,
        children: f,
      } = t,
      p = Ow(t, lj),
      h = bc(c, { relative: p.relative }),
      m = $o(),
      S = d.useContext(jw),
      { navigator: v, basename: w } = d.useContext(Mr),
      x = S != null && yj(h) && u === !0,
      g = v.encodeLocation ? v.encodeLocation(h).pathname : h.pathname,
      y = m.pathname,
      b = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    (s || ((y = y.toLowerCase()), (b = b ? b.toLowerCase() : null), (g = g.toLowerCase())), b && w && (b = So(b, w) || b));
    const C = g !== '/' && g.endsWith('/') ? g.length - 1 : g.length;
    let k = y === g || (!i && y.startsWith(g) && y.charAt(C) === '/'),
      N = b != null && (b === g || (!i && b.startsWith(g) && b.charAt(g.length) === '/')),
      P = { isActive: k, isPending: N, isTransitioning: x },
      T = k ? r : void 0,
      R;
    typeof o == 'function'
      ? (R = o(P))
      : (R = [o, k ? 'active' : null, N ? 'pending' : null, x ? 'transitioning' : null].filter(Boolean).join(' '));
    let H = typeof a == 'function' ? a(P) : a;
    return d.createElement(
      Lw,
      Al({}, p, { 'aria-current': T, className: R, ref: n, style: H, to: c, viewTransition: u }),
      typeof f == 'function' ? f(P) : f
    );
  });
var zd;
(function (e) {
  ((e.UseScrollRestoration = 'useScrollRestoration'),
    (e.UseSubmit = 'useSubmit'),
    (e.UseSubmitFetcher = 'useSubmitFetcher'),
    (e.UseFetcher = 'useFetcher'),
    (e.useViewTransitionState = 'useViewTransitionState'));
})(zd || (zd = {}));
var Hm;
(function (e) {
  ((e.UseFetcher = 'useFetcher'), (e.UseFetchers = 'useFetchers'), (e.UseScrollRestoration = 'useScrollRestoration'));
})(Hm || (Hm = {}));
function gj(e) {
  let t = d.useContext(wc);
  return (t || Fe(!1), t);
}
function vj(e, t) {
  let { target: n, replace: r, state: s, preventScrollReset: o, relative: i, viewTransition: a } = t === void 0 ? {} : t,
    c = VP(),
    u = $o(),
    f = bc(e, { relative: i });
  return d.useCallback(
    p => {
      if (ij(p, n)) {
        p.preventDefault();
        let h = r !== void 0 ? r : Il(u) === Il(f);
        c(e, { replace: h, state: s, preventScrollReset: o, relative: i, viewTransition: a });
      }
    },
    [u, c, f, r, s, n, e, o, i, a]
  );
}
function yj(e, t) {
  t === void 0 && (t = {});
  let n = d.useContext(uj);
  n == null && Fe(!1);
  let { basename: r } = gj(zd.useViewTransitionState),
    s = bc(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let o = So(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    i = So(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return Fd(s.pathname, i) != null || Fd(s.pathname, o) != null;
}
const xj = fc(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);
function br({ className: e, variant: t, ...n }) {
  return l.jsx('div', { className: ne(xj({ variant: t }), e), ...n });
}
const wj = fc(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90',
          destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'text-primary underline-offset-4 hover:underline',
          crystal: 'crystal-button energy-glow font-bold tracking-wide',
          mining: 'mining-surface border-2 border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/10',
          energy:
            'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300',
          drill:
            'bg-muted border border-border text-muted-foreground hover:bg-secondary hover:text-secondary-foreground relative overflow-hidden',
        },
        size: {
          default: 'h-10 px-4 py-2',
          sm: 'h-9 rounded-md px-3',
          lg: 'h-11 rounded-md px-8',
          xl: 'h-12 rounded-lg px-10 text-base',
          icon: 'h-10 w-10',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    }
  ),
  Ne = d.forwardRef(({ className: e, variant: t, size: n, asChild: r = !1, ...s }, o) => {
    const i = r ? LE : 'button';
    return l.jsx(i, { className: ne(wj({ variant: t, size: n, className: e })), ref: o, ...s });
  });
Ne.displayName = 'Button';
var Sj = d.createContext(void 0);
function Cc(e) {
  const t = d.useContext(Sj);
  return e || t || 'ltr';
}
var wu = 0;
function Cp() {
  d.useEffect(() => {
    const e = document.querySelectorAll('[data-radix-focus-guard]');
    return (
      document.body.insertAdjacentElement('afterbegin', e[0] ?? Gm()),
      document.body.insertAdjacentElement('beforeend', e[1] ?? Gm()),
      wu++,
      () => {
        (wu === 1 && document.querySelectorAll('[data-radix-focus-guard]').forEach(t => t.remove()), wu--);
      }
    );
  }, []);
}
function Gm() {
  const e = document.createElement('span');
  return (
    e.setAttribute('data-radix-focus-guard', ''),
    (e.tabIndex = 0),
    (e.style.outline = 'none'),
    (e.style.opacity = '0'),
    (e.style.position = 'fixed'),
    (e.style.pointerEvents = 'none'),
    e
  );
}
var Su = 'focusScope.autoFocusOnMount',
  bu = 'focusScope.autoFocusOnUnmount',
  Km = { bubbles: !1, cancelable: !0 },
  bj = 'FocusScope',
  Ec = d.forwardRef((e, t) => {
    const { loop: n = !1, trapped: r = !1, onMountAutoFocus: s, onUnmountAutoFocus: o, ...i } = e,
      [a, c] = d.useState(null),
      u = dt(s),
      f = dt(o),
      p = d.useRef(null),
      h = ye(t, v => c(v)),
      m = d.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (d.useEffect(() => {
      if (r) {
        let v = function (y) {
            if (m.paused || !a) return;
            const b = y.target;
            a.contains(b) ? (p.current = b) : Yn(p.current, { select: !0 });
          },
          w = function (y) {
            if (m.paused || !a) return;
            const b = y.relatedTarget;
            b !== null && (a.contains(b) || Yn(p.current, { select: !0 }));
          },
          x = function (y) {
            if (document.activeElement === document.body) for (const C of y) C.removedNodes.length > 0 && Yn(a);
          };
        (document.addEventListener('focusin', v), document.addEventListener('focusout', w));
        const g = new MutationObserver(x);
        return (
          a && g.observe(a, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener('focusin', v), document.removeEventListener('focusout', w), g.disconnect());
          }
        );
      }
    }, [r, a, m.paused]),
      d.useEffect(() => {
        if (a) {
          Qm.add(m);
          const v = document.activeElement;
          if (!a.contains(v)) {
            const x = new CustomEvent(Su, Km);
            (a.addEventListener(Su, u),
              a.dispatchEvent(x),
              x.defaultPrevented || (Cj(Pj(Dw(a)), { select: !0 }), document.activeElement === v && Yn(a)));
          }
          return () => {
            (a.removeEventListener(Su, u),
              setTimeout(() => {
                const x = new CustomEvent(bu, Km);
                (a.addEventListener(bu, f),
                  a.dispatchEvent(x),
                  x.defaultPrevented || Yn(v ?? document.body, { select: !0 }),
                  a.removeEventListener(bu, f),
                  Qm.remove(m));
              }, 0));
          };
        }
      }, [a, u, f, m]));
    const S = d.useCallback(
      v => {
        if ((!n && !r) || m.paused) return;
        const w = v.key === 'Tab' && !v.altKey && !v.ctrlKey && !v.metaKey,
          x = document.activeElement;
        if (w && x) {
          const g = v.currentTarget,
            [y, b] = Ej(g);
          y && b
            ? !v.shiftKey && x === b
              ? (v.preventDefault(), n && Yn(y, { select: !0 }))
              : v.shiftKey && x === y && (v.preventDefault(), n && Yn(b, { select: !0 }))
            : x === g && v.preventDefault();
        }
      },
      [n, r, m.paused]
    );
    return l.jsx(te.div, { tabIndex: -1, ...i, ref: h, onKeyDown: S });
  });
Ec.displayName = bj;
function Cj(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e) if ((Yn(r, { select: t }), document.activeElement !== n)) return;
}
function Ej(e) {
  const t = Dw(e),
    n = Zm(t, e),
    r = Zm(t.reverse(), e);
  return [n, r];
}
function Dw(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: r => {
        const s = r.tagName === 'INPUT' && r.type === 'hidden';
        return r.disabled || r.hidden || s ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Zm(e, t) {
  for (const n of e) if (!Nj(n, { upTo: t })) return n;
}
function Nj(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === 'hidden') return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === 'none') return !0;
    e = e.parentElement;
  }
  return !1;
}
function kj(e) {
  return e instanceof HTMLInputElement && 'select' in e;
}
function Yn(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && kj(e) && t && e.select());
  }
}
var Qm = _j();
function _j() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      (t !== n && (n == null || n.pause()), (e = qm(e, t)), e.unshift(t));
    },
    remove(t) {
      var n;
      ((e = qm(e, t)), (n = e[0]) == null || n.resume());
    },
  };
}
function qm(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function Pj(e) {
  return e.filter(t => t.tagName !== 'A');
}
var Cu = 'rovingFocusGroup.onEntryFocus',
  jj = { bubbles: !1, cancelable: !0 },
  oa = 'RovingFocusGroup',
  [Vd, Fw, Tj] = cc(oa),
  [Rj, Nc] = At(oa, [Tj]),
  [Ij, Aj] = Rj(oa),
  $w = d.forwardRef((e, t) =>
    l.jsx(Vd.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: l.jsx(Vd.Slot, { scope: e.__scopeRovingFocusGroup, children: l.jsx(Mj, { ...e, ref: t }) }),
    })
  );
$w.displayName = oa;
var Mj = d.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: r,
        loop: s = !1,
        dir: o,
        currentTabStopId: i,
        defaultCurrentTabStopId: a,
        onCurrentTabStopIdChange: c,
        onEntryFocus: u,
        preventScrollOnEntryFocus: f = !1,
        ...p
      } = e,
      h = d.useRef(null),
      m = ye(t, h),
      S = Cc(o),
      [v, w] = kr({ prop: i, defaultProp: a ?? null, onChange: c, caller: oa }),
      [x, g] = d.useState(!1),
      y = dt(u),
      b = Fw(n),
      C = d.useRef(!1),
      [k, N] = d.useState(0);
    return (
      d.useEffect(() => {
        const P = h.current;
        if (P) return (P.addEventListener(Cu, y), () => P.removeEventListener(Cu, y));
      }, [y]),
      l.jsx(Ij, {
        scope: n,
        orientation: r,
        dir: S,
        loop: s,
        currentTabStopId: v,
        onItemFocus: d.useCallback(P => w(P), [w]),
        onItemShiftTab: d.useCallback(() => g(!0), []),
        onFocusableItemAdd: d.useCallback(() => N(P => P + 1), []),
        onFocusableItemRemove: d.useCallback(() => N(P => P - 1), []),
        children: l.jsx(te.div, {
          tabIndex: x || k === 0 ? -1 : 0,
          'data-orientation': r,
          ...p,
          ref: m,
          style: { outline: 'none', ...e.style },
          onMouseDown: U(e.onMouseDown, () => {
            C.current = !0;
          }),
          onFocus: U(e.onFocus, P => {
            const T = !C.current;
            if (P.target === P.currentTarget && T && !x) {
              const R = new CustomEvent(Cu, jj);
              if ((P.currentTarget.dispatchEvent(R), !R.defaultPrevented)) {
                const H = b().filter(I => I.focusable),
                  $ = H.find(I => I.active),
                  Y = H.find(I => I.id === v),
                  X = [$, Y, ...H].filter(Boolean).map(I => I.ref.current);
                Uw(X, f);
              }
            }
            C.current = !1;
          }),
          onBlur: U(e.onBlur, () => g(!1)),
        }),
      })
    );
  }),
  zw = 'RovingFocusGroupItem',
  Vw = d.forwardRef((e, t) => {
    const { __scopeRovingFocusGroup: n, focusable: r = !0, active: s = !1, tabStopId: o, children: i, ...a } = e,
      c = bn(),
      u = o || c,
      f = Aj(zw, n),
      p = f.currentTabStopId === u,
      h = Fw(n),
      { onFocusableItemAdd: m, onFocusableItemRemove: S, currentTabStopId: v } = f;
    return (
      d.useEffect(() => {
        if (r) return (m(), () => S());
      }, [r, m, S]),
      l.jsx(Vd.ItemSlot, {
        scope: n,
        id: u,
        focusable: r,
        active: s,
        children: l.jsx(te.span, {
          tabIndex: p ? 0 : -1,
          'data-orientation': f.orientation,
          ...a,
          ref: t,
          onMouseDown: U(e.onMouseDown, w => {
            r ? f.onItemFocus(u) : w.preventDefault();
          }),
          onFocus: U(e.onFocus, () => f.onItemFocus(u)),
          onKeyDown: U(e.onKeyDown, w => {
            if (w.key === 'Tab' && w.shiftKey) {
              f.onItemShiftTab();
              return;
            }
            if (w.target !== w.currentTarget) return;
            const x = Dj(w, f.orientation, f.dir);
            if (x !== void 0) {
              if (w.metaKey || w.ctrlKey || w.altKey || w.shiftKey) return;
              w.preventDefault();
              let y = h()
                .filter(b => b.focusable)
                .map(b => b.ref.current);
              if (x === 'last') y.reverse();
              else if (x === 'prev' || x === 'next') {
                x === 'prev' && y.reverse();
                const b = y.indexOf(w.currentTarget);
                y = f.loop ? Fj(y, b + 1) : y.slice(b + 1);
              }
              setTimeout(() => Uw(y));
            }
          }),
          children: typeof i == 'function' ? i({ isCurrentTabStop: p, hasTabStop: v != null }) : i,
        }),
      })
    );
  });
Vw.displayName = zw;
var Oj = {
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageUp: 'first',
  Home: 'first',
  PageDown: 'last',
  End: 'last',
};
function Lj(e, t) {
  return t !== 'rtl' ? e : e === 'ArrowLeft' ? 'ArrowRight' : e === 'ArrowRight' ? 'ArrowLeft' : e;
}
function Dj(e, t, n) {
  const r = Lj(e.key, n);
  if (!(t === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(r)) && !(t === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(r)))
    return Oj[r];
}
function Uw(e, t = !1) {
  const n = document.activeElement;
  for (const r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Fj(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Bw = $w,
  Ww = Vw,
  $j = function (e) {
    if (typeof document > 'u') return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  Ts = new WeakMap(),
  Ia = new WeakMap(),
  Aa = {},
  Eu = 0,
  Hw = function (e) {
    return e && (e.host || Hw(e.parentNode));
  },
  zj = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = Hw(n);
        return r && e.contains(r) ? r : (console.error('aria-hidden', n, 'in not contained inside', e, '. Doing nothing'), null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  Vj = function (e, t, n, r) {
    var s = zj(t, Array.isArray(e) ? e : [e]);
    Aa[n] || (Aa[n] = new WeakMap());
    var o = Aa[n],
      i = [],
      a = new Set(),
      c = new Set(s),
      u = function (p) {
        !p || a.has(p) || (a.add(p), u(p.parentNode));
      };
    s.forEach(u);
    var f = function (p) {
      !p ||
        c.has(p) ||
        Array.prototype.forEach.call(p.children, function (h) {
          if (a.has(h)) f(h);
          else
            try {
              var m = h.getAttribute(r),
                S = m !== null && m !== 'false',
                v = (Ts.get(h) || 0) + 1,
                w = (o.get(h) || 0) + 1;
              (Ts.set(h, v),
                o.set(h, w),
                i.push(h),
                v === 1 && S && Ia.set(h, !0),
                w === 1 && h.setAttribute(n, 'true'),
                S || h.setAttribute(r, 'true'));
            } catch (x) {
              console.error('aria-hidden: cannot operate on ', h, x);
            }
        });
    };
    return (
      f(t),
      a.clear(),
      Eu++,
      function () {
        (i.forEach(function (p) {
          var h = Ts.get(p) - 1,
            m = o.get(p) - 1;
          (Ts.set(p, h), o.set(p, m), h || (Ia.has(p) || p.removeAttribute(r), Ia.delete(p)), m || p.removeAttribute(n));
        }),
          Eu--,
          Eu || ((Ts = new WeakMap()), (Ts = new WeakMap()), (Ia = new WeakMap()), (Aa = {})));
      }
    );
  },
  Ep = function (e, t, n) {
    n === void 0 && (n = 'data-aria-hidden');
    var r = Array.from(Array.isArray(e) ? e : [e]),
      s = $j(e);
    return s
      ? (r.push.apply(r, Array.from(s.querySelectorAll('[aria-live], script'))), Vj(r, s, n, 'aria-hidden'))
      : function () {
          return null;
        };
  },
  yn = function () {
    return (
      (yn =
        Object.assign ||
        function (t) {
          for (var n, r = 1, s = arguments.length; r < s; r++) {
            n = arguments[r];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
          }
          return t;
        }),
      yn.apply(this, arguments)
    );
  };
function Gw(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var s = 0, r = Object.getOwnPropertySymbols(e); s < r.length; s++)
      t.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[s]) && (n[r[s]] = e[r[s]]);
  return n;
}
function Uj(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, s = t.length, o; r < s; r++) (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), (o[r] = t[r]));
  return e.concat(o || Array.prototype.slice.call(t));
}
var Ya = 'right-scroll-bar-position',
  Xa = 'width-before-scroll-bar',
  Bj = 'with-scroll-bars-hidden',
  Wj = '--removed-body-scroll-bar-size';
function Nu(e, t) {
  return (typeof e == 'function' ? e(t) : e && (e.current = t), e);
}
function Hj(e, t) {
  var n = d.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var s = n.value;
          s !== r && ((n.value = r), n.callback(r, s));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var Gj = typeof window < 'u' ? d.useLayoutEffect : d.useEffect,
  Ym = new WeakMap();
function Kj(e, t) {
  var n = Hj(null, function (r) {
    return e.forEach(function (s) {
      return Nu(s, r);
    });
  });
  return (
    Gj(
      function () {
        var r = Ym.get(n);
        if (r) {
          var s = new Set(r),
            o = new Set(e),
            i = n.current;
          (s.forEach(function (a) {
            o.has(a) || Nu(a, null);
          }),
            o.forEach(function (a) {
              s.has(a) || Nu(a, i);
            }));
        }
        Ym.set(n, e);
      },
      [e]
    ),
    n
  );
}
function Zj(e) {
  return e;
}
function Qj(e, t) {
  t === void 0 && (t = Zj);
  var n = [],
    r = !1,
    s = {
      read: function () {
        if (r) throw new Error('Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.');
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (o) {
        var i = t(o, r);
        return (
          n.push(i),
          function () {
            n = n.filter(function (a) {
              return a !== i;
            });
          }
        );
      },
      assignSyncMedium: function (o) {
        for (r = !0; n.length; ) {
          var i = n;
          ((n = []), i.forEach(o));
        }
        n = {
          push: function (a) {
            return o(a);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (o) {
        r = !0;
        var i = [];
        if (n.length) {
          var a = n;
          ((n = []), a.forEach(o), (i = n));
        }
        var c = function () {
            var f = i;
            ((i = []), f.forEach(o));
          },
          u = function () {
            return Promise.resolve().then(c);
          };
        (u(),
          (n = {
            push: function (f) {
              (i.push(f), u());
            },
            filter: function (f) {
              return ((i = i.filter(f)), n);
            },
          }));
      },
    };
  return s;
}
function qj(e) {
  e === void 0 && (e = {});
  var t = Qj(null);
  return ((t.options = yn({ async: !0, ssr: !1 }, e)), t);
}
var Kw = function (e) {
  var t = e.sideCar,
    n = Gw(e, ['sideCar']);
  if (!t) throw new Error('Sidecar: please provide `sideCar` property to import the right car');
  var r = t.read();
  if (!r) throw new Error('Sidecar medium not found');
  return d.createElement(r, yn({}, n));
};
Kw.isSideCarExport = !0;
function Yj(e, t) {
  return (e.useMedium(t), Kw);
}
var Zw = qj(),
  ku = function () {},
  kc = d.forwardRef(function (e, t) {
    var n = d.useRef(null),
      r = d.useState({ onScrollCapture: ku, onWheelCapture: ku, onTouchMoveCapture: ku }),
      s = r[0],
      o = r[1],
      i = e.forwardProps,
      a = e.children,
      c = e.className,
      u = e.removeScrollBar,
      f = e.enabled,
      p = e.shards,
      h = e.sideCar,
      m = e.noRelative,
      S = e.noIsolation,
      v = e.inert,
      w = e.allowPinchZoom,
      x = e.as,
      g = x === void 0 ? 'div' : x,
      y = e.gapMode,
      b = Gw(e, [
        'forwardProps',
        'children',
        'className',
        'removeScrollBar',
        'enabled',
        'shards',
        'sideCar',
        'noRelative',
        'noIsolation',
        'inert',
        'allowPinchZoom',
        'as',
        'gapMode',
      ]),
      C = h,
      k = Kj([n, t]),
      N = yn(yn({}, b), s);
    return d.createElement(
      d.Fragment,
      null,
      f &&
        d.createElement(C, {
          sideCar: Zw,
          removeScrollBar: u,
          shards: p,
          noRelative: m,
          noIsolation: S,
          inert: v,
          setCallbacks: o,
          allowPinchZoom: !!w,
          lockRef: n,
          gapMode: y,
        }),
      i ? d.cloneElement(d.Children.only(a), yn(yn({}, N), { ref: k })) : d.createElement(g, yn({}, N, { className: c, ref: k }), a)
    );
  });
kc.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
kc.classNames = { fullWidth: Xa, zeroRight: Ya };
var Xj = function () {
  if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__;
};
function Jj() {
  if (!document) return null;
  var e = document.createElement('style');
  e.type = 'text/css';
  var t = Xj();
  return (t && e.setAttribute('nonce', t), e);
}
function eT(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function tT(e) {
  var t = document.head || document.getElementsByTagName('head')[0];
  t.appendChild(e);
}
var nT = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = Jj()) && (eT(t, n), tT(t)), e++);
      },
      remove: function () {
        (e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  rT = function () {
    var e = nT();
    return function (t, n) {
      d.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n]
      );
    };
  },
  Qw = function () {
    var e = rT(),
      t = function (n) {
        var r = n.styles,
          s = n.dynamic;
        return (e(r, s), null);
      };
    return t;
  },
  sT = { left: 0, top: 0, right: 0, gap: 0 },
  _u = function (e) {
    return parseInt(e || '', 10) || 0;
  },
  oT = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === 'padding' ? 'paddingLeft' : 'marginLeft'],
      r = t[e === 'padding' ? 'paddingTop' : 'marginTop'],
      s = t[e === 'padding' ? 'paddingRight' : 'marginRight'];
    return [_u(n), _u(r), _u(s)];
  },
  iT = function (e) {
    if ((e === void 0 && (e = 'margin'), typeof window > 'u')) return sT;
    var t = oT(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
  },
  aT = Qw(),
  no = 'data-scroll-locked',
  lT = function (e, t, n, r) {
    var s = e.left,
      o = e.top,
      i = e.right,
      a = e.gap;
    return (
      n === void 0 && (n = 'margin'),
      `
  .`
        .concat(
          Bj,
          ` {
   overflow: hidden `
        )
        .concat(
          r,
          `;
   padding-right: `
        )
        .concat(a, 'px ')
        .concat(
          r,
          `;
  }
  body[`
        )
        .concat(
          no,
          `] {
    overflow: hidden `
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            t && 'position: relative '.concat(r, ';'),
            n === 'margin' &&
              `
    padding-left: `
                .concat(
                  s,
                  `px;
    padding-top: `
                )
                .concat(
                  o,
                  `px;
    padding-right: `
                )
                .concat(
                  i,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(a, 'px ')
                .concat(
                  r,
                  `;
    `
                ),
            n === 'padding' && 'padding-right: '.concat(a, 'px ').concat(r, ';'),
          ]
            .filter(Boolean)
            .join(''),
          `
  }
  
  .`
        )
        .concat(
          Ya,
          ` {
    right: `
        )
        .concat(a, 'px ')
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(
          Xa,
          ` {
    margin-right: `
        )
        .concat(a, 'px ')
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(Ya, ' .')
        .concat(
          Ya,
          ` {
    right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(Xa, ' .')
        .concat(
          Xa,
          ` {
    margin-right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  body[`
        )
        .concat(
          no,
          `] {
    `
        )
        .concat(Wj, ': ')
        .concat(
          a,
          `px;
  }
`
        )
    );
  },
  Xm = function () {
    var e = parseInt(document.body.getAttribute(no) || '0', 10);
    return isFinite(e) ? e : 0;
  },
  cT = function () {
    d.useEffect(function () {
      return (
        document.body.setAttribute(no, (Xm() + 1).toString()),
        function () {
          var e = Xm() - 1;
          e <= 0 ? document.body.removeAttribute(no) : document.body.setAttribute(no, e.toString());
        }
      );
    }, []);
  },
  uT = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      s = r === void 0 ? 'margin' : r;
    cT();
    var o = d.useMemo(
      function () {
        return iT(s);
      },
      [s]
    );
    return d.createElement(aT, { styles: lT(o, !t, s, n ? '' : '!important') });
  },
  Ud = !1;
if (typeof window < 'u')
  try {
    var Ma = Object.defineProperty({}, 'passive', {
      get: function () {
        return ((Ud = !0), !0);
      },
    });
    (window.addEventListener('test', Ma, Ma), window.removeEventListener('test', Ma, Ma));
  } catch {
    Ud = !1;
  }
var Rs = Ud ? { passive: !1 } : !1,
  dT = function (e) {
    return e.tagName === 'TEXTAREA';
  },
  qw = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return n[t] !== 'hidden' && !(n.overflowY === n.overflowX && !dT(e) && n[t] === 'visible');
  },
  fT = function (e) {
    return qw(e, 'overflowY');
  },
  pT = function (e) {
    return qw(e, 'overflowX');
  },
  Jm = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      typeof ShadowRoot < 'u' && r instanceof ShadowRoot && (r = r.host);
      var s = Yw(e, r);
      if (s) {
        var o = Xw(e, r),
          i = o[1],
          a = o[2];
        if (i > a) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  hT = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  mT = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  Yw = function (e, t) {
    return e === 'v' ? fT(t) : pT(t);
  },
  Xw = function (e, t) {
    return e === 'v' ? hT(t) : mT(t);
  },
  gT = function (e, t) {
    return e === 'h' && t === 'rtl' ? -1 : 1;
  },
  vT = function (e, t, n, r, s) {
    var o = gT(e, window.getComputedStyle(t).direction),
      i = o * r,
      a = n.target,
      c = t.contains(a),
      u = !1,
      f = i > 0,
      p = 0,
      h = 0;
    do {
      if (!a) break;
      var m = Xw(e, a),
        S = m[0],
        v = m[1],
        w = m[2],
        x = v - w - o * S;
      (S || x) && Yw(e, a) && ((p += x), (h += S));
      var g = a.parentNode;
      a = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
    } while ((!c && a !== document.body) || (c && (t.contains(a) || t === a)));
    return (((f && Math.abs(p) < 1) || (!f && Math.abs(h) < 1)) && (u = !0), u);
  },
  Oa = function (e) {
    return 'changedTouches' in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
  },
  eg = function (e) {
    return [e.deltaX, e.deltaY];
  },
  tg = function (e) {
    return e && 'current' in e ? e.current : e;
  },
  yT = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  xT = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        e,
        ` {pointer-events: all;}
`
      );
  },
  wT = 0,
  Is = [];
function ST(e) {
  var t = d.useRef([]),
    n = d.useRef([0, 0]),
    r = d.useRef(),
    s = d.useState(wT++)[0],
    o = d.useState(Qw)[0],
    i = d.useRef(e);
  (d.useEffect(
    function () {
      i.current = e;
    },
    [e]
  ),
    d.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add('block-interactivity-'.concat(s));
          var v = Uj([e.lockRef.current], (e.shards || []).map(tg), !0).filter(Boolean);
          return (
            v.forEach(function (w) {
              return w.classList.add('allow-interactivity-'.concat(s));
            }),
            function () {
              (document.body.classList.remove('block-interactivity-'.concat(s)),
                v.forEach(function (w) {
                  return w.classList.remove('allow-interactivity-'.concat(s));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    ));
  var a = d.useCallback(function (v, w) {
      if (('touches' in v && v.touches.length === 2) || (v.type === 'wheel' && v.ctrlKey)) return !i.current.allowPinchZoom;
      var x = Oa(v),
        g = n.current,
        y = 'deltaX' in v ? v.deltaX : g[0] - x[0],
        b = 'deltaY' in v ? v.deltaY : g[1] - x[1],
        C,
        k = v.target,
        N = Math.abs(y) > Math.abs(b) ? 'h' : 'v';
      if ('touches' in v && N === 'h' && k.type === 'range') return !1;
      var P = Jm(N, k);
      if (!P) return !0;
      if ((P ? (C = N) : ((C = N === 'v' ? 'h' : 'v'), (P = Jm(N, k))), !P)) return !1;
      if ((!r.current && 'changedTouches' in v && (y || b) && (r.current = C), !C)) return !0;
      var T = r.current || C;
      return vT(T, w, v, T === 'h' ? y : b);
    }, []),
    c = d.useCallback(function (v) {
      var w = v;
      if (!(!Is.length || Is[Is.length - 1] !== o)) {
        var x = 'deltaY' in w ? eg(w) : Oa(w),
          g = t.current.filter(function (C) {
            return C.name === w.type && (C.target === w.target || w.target === C.shadowParent) && yT(C.delta, x);
          })[0];
        if (g && g.should) {
          w.cancelable && w.preventDefault();
          return;
        }
        if (!g) {
          var y = (i.current.shards || [])
              .map(tg)
              .filter(Boolean)
              .filter(function (C) {
                return C.contains(w.target);
              }),
            b = y.length > 0 ? a(w, y[0]) : !i.current.noIsolation;
          b && w.cancelable && w.preventDefault();
        }
      }
    }, []),
    u = d.useCallback(function (v, w, x, g) {
      var y = { name: v, delta: w, target: x, should: g, shadowParent: bT(x) };
      (t.current.push(y),
        setTimeout(function () {
          t.current = t.current.filter(function (b) {
            return b !== y;
          });
        }, 1));
    }, []),
    f = d.useCallback(function (v) {
      ((n.current = Oa(v)), (r.current = void 0));
    }, []),
    p = d.useCallback(function (v) {
      u(v.type, eg(v), v.target, a(v, e.lockRef.current));
    }, []),
    h = d.useCallback(function (v) {
      u(v.type, Oa(v), v.target, a(v, e.lockRef.current));
    }, []);
  d.useEffect(function () {
    return (
      Is.push(o),
      e.setCallbacks({ onScrollCapture: p, onWheelCapture: p, onTouchMoveCapture: h }),
      document.addEventListener('wheel', c, Rs),
      document.addEventListener('touchmove', c, Rs),
      document.addEventListener('touchstart', f, Rs),
      function () {
        ((Is = Is.filter(function (v) {
          return v !== o;
        })),
          document.removeEventListener('wheel', c, Rs),
          document.removeEventListener('touchmove', c, Rs),
          document.removeEventListener('touchstart', f, Rs));
      }
    );
  }, []);
  var m = e.removeScrollBar,
    S = e.inert;
  return d.createElement(
    d.Fragment,
    null,
    S ? d.createElement(o, { styles: xT(s) }) : null,
    m ? d.createElement(uT, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function bT(e) {
  for (var t = null; e !== null; ) (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
  return t;
}
const CT = Yj(Zw, ST);
var _c = d.forwardRef(function (e, t) {
  return d.createElement(kc, yn({}, e, { ref: t, sideCar: CT }));
});
_c.classNames = kc.classNames;
var Bd = ['Enter', ' '],
  ET = ['ArrowDown', 'PageUp', 'Home'],
  Jw = ['ArrowUp', 'PageDown', 'End'],
  NT = [...ET, ...Jw],
  kT = { ltr: [...Bd, 'ArrowRight'], rtl: [...Bd, 'ArrowLeft'] },
  _T = { ltr: ['ArrowLeft'], rtl: ['ArrowRight'] },
  ia = 'Menu',
  [Bi, PT, jT] = cc(ia),
  [Ss, e0] = At(ia, [jT, Fo, Nc]),
  Pc = Fo(),
  t0 = Nc(),
  [TT, bs] = Ss(ia),
  [RT, aa] = Ss(ia),
  n0 = e => {
    const { __scopeMenu: t, open: n = !1, children: r, dir: s, onOpenChange: o, modal: i = !0 } = e,
      a = Pc(t),
      [c, u] = d.useState(null),
      f = d.useRef(!1),
      p = dt(o),
      h = Cc(s);
    return (
      d.useEffect(() => {
        const m = () => {
            ((f.current = !0),
              document.addEventListener('pointerdown', S, { capture: !0, once: !0 }),
              document.addEventListener('pointermove', S, { capture: !0, once: !0 }));
          },
          S = () => (f.current = !1);
        return (
          document.addEventListener('keydown', m, { capture: !0 }),
          () => {
            (document.removeEventListener('keydown', m, { capture: !0 }),
              document.removeEventListener('pointerdown', S, { capture: !0 }),
              document.removeEventListener('pointermove', S, { capture: !0 }));
          }
        );
      }, []),
      l.jsx(lw, {
        ...a,
        children: l.jsx(TT, {
          scope: t,
          open: n,
          onOpenChange: p,
          content: c,
          onContentChange: u,
          children: l.jsx(RT, { scope: t, onClose: d.useCallback(() => p(!1), [p]), isUsingKeyboardRef: f, dir: h, modal: i, children: r }),
        }),
      })
    );
  };
n0.displayName = ia;
var IT = 'MenuAnchor',
  Np = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      s = Pc(n);
    return l.jsx(gp, { ...s, ...r, ref: t });
  });
Np.displayName = IT;
var kp = 'MenuPortal',
  [AT, r0] = Ss(kp, { forceMount: void 0 }),
  s0 = e => {
    const { __scopeMenu: t, forceMount: n, children: r, container: s } = e,
      o = bs(kp, t);
    return l.jsx(AT, {
      scope: t,
      forceMount: n,
      children: l.jsx(un, { present: n || o.open, children: l.jsx(ea, { asChild: !0, container: s, children: r }) }),
    });
  };
s0.displayName = kp;
var Ut = 'MenuContent',
  [MT, _p] = Ss(Ut),
  o0 = d.forwardRef((e, t) => {
    const n = r0(Ut, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...s } = e,
      o = bs(Ut, e.__scopeMenu),
      i = aa(Ut, e.__scopeMenu);
    return l.jsx(Bi.Provider, {
      scope: e.__scopeMenu,
      children: l.jsx(un, {
        present: r || o.open,
        children: l.jsx(Bi.Slot, { scope: e.__scopeMenu, children: i.modal ? l.jsx(OT, { ...s, ref: t }) : l.jsx(LT, { ...s, ref: t }) }),
      }),
    });
  }),
  OT = d.forwardRef((e, t) => {
    const n = bs(Ut, e.__scopeMenu),
      r = d.useRef(null),
      s = ye(t, r);
    return (
      d.useEffect(() => {
        const o = r.current;
        if (o) return Ep(o);
      }, []),
      l.jsx(Pp, {
        ...e,
        ref: s,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: U(e.onFocusOutside, o => o.preventDefault(), { checkForDefaultPrevented: !1 }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  LT = d.forwardRef((e, t) => {
    const n = bs(Ut, e.__scopeMenu);
    return l.jsx(Pp, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  DT = cs('MenuContent.ScrollLock'),
  Pp = d.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: r = !1,
        trapFocus: s,
        onOpenAutoFocus: o,
        onCloseAutoFocus: i,
        disableOutsidePointerEvents: a,
        onEntryFocus: c,
        onEscapeKeyDown: u,
        onPointerDownOutside: f,
        onFocusOutside: p,
        onInteractOutside: h,
        onDismiss: m,
        disableOutsideScroll: S,
        ...v
      } = e,
      w = bs(Ut, n),
      x = aa(Ut, n),
      g = Pc(n),
      y = t0(n),
      b = PT(n),
      [C, k] = d.useState(null),
      N = d.useRef(null),
      P = ye(t, N, w.onContentChange),
      T = d.useRef(0),
      R = d.useRef(''),
      H = d.useRef(0),
      $ = d.useRef(null),
      Y = d.useRef('right'),
      O = d.useRef(0),
      X = S ? _c : d.Fragment,
      I = S ? { as: DT, allowPinchZoom: !0 } : void 0,
      z = E => {
        var F, he;
        const A = R.current + E,
          Z = b().filter(me => !me.disabled),
          W = document.activeElement,
          J = (F = Z.find(me => me.ref.current === W)) == null ? void 0 : F.textValue,
          V = Z.map(me => me.textValue),
          pe = QT(V, A, J),
          ge = (he = Z.find(me => me.textValue === pe)) == null ? void 0 : he.ref.current;
        ((function me(G) {
          ((R.current = G), window.clearTimeout(T.current), G !== '' && (T.current = window.setTimeout(() => me(''), 1e3)));
        })(A),
          ge && setTimeout(() => ge.focus()));
      };
    (d.useEffect(() => () => window.clearTimeout(T.current), []), Cp());
    const _ = d.useCallback(E => {
      var Z, W;
      return Y.current === ((Z = $.current) == null ? void 0 : Z.side) && YT(E, (W = $.current) == null ? void 0 : W.area);
    }, []);
    return l.jsx(MT, {
      scope: n,
      searchRef: R,
      onItemEnter: d.useCallback(
        E => {
          _(E) && E.preventDefault();
        },
        [_]
      ),
      onItemLeave: d.useCallback(
        E => {
          var A;
          _(E) || ((A = N.current) == null || A.focus(), k(null));
        },
        [_]
      ),
      onTriggerLeave: d.useCallback(
        E => {
          _(E) && E.preventDefault();
        },
        [_]
      ),
      pointerGraceTimerRef: H,
      onPointerGraceIntentChange: d.useCallback(E => {
        $.current = E;
      }, []),
      children: l.jsx(X, {
        ...I,
        children: l.jsx(Ec, {
          asChild: !0,
          trapped: s,
          onMountAutoFocus: U(o, E => {
            var A;
            (E.preventDefault(), (A = N.current) == null || A.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: i,
          children: l.jsx(Ao, {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onEscapeKeyDown: u,
            onPointerDownOutside: f,
            onFocusOutside: p,
            onInteractOutside: h,
            onDismiss: m,
            children: l.jsx(Bw, {
              asChild: !0,
              ...y,
              dir: x.dir,
              orientation: 'vertical',
              loop: r,
              currentTabStopId: C,
              onCurrentTabStopIdChange: k,
              onEntryFocus: U(c, E => {
                x.isUsingKeyboardRef.current || E.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: l.jsx(vp, {
                role: 'menu',
                'aria-orientation': 'vertical',
                'data-state': S0(w.open),
                'data-radix-menu-content': '',
                dir: x.dir,
                ...g,
                ...v,
                ref: P,
                style: { outline: 'none', ...v.style },
                onKeyDown: U(v.onKeyDown, E => {
                  const Z = E.target.closest('[data-radix-menu-content]') === E.currentTarget,
                    W = E.ctrlKey || E.altKey || E.metaKey,
                    J = E.key.length === 1;
                  Z && (E.key === 'Tab' && E.preventDefault(), !W && J && z(E.key));
                  const V = N.current;
                  if (E.target !== V || !NT.includes(E.key)) return;
                  E.preventDefault();
                  const ge = b()
                    .filter(F => !F.disabled)
                    .map(F => F.ref.current);
                  (Jw.includes(E.key) && ge.reverse(), KT(ge));
                }),
                onBlur: U(e.onBlur, E => {
                  E.currentTarget.contains(E.target) || (window.clearTimeout(T.current), (R.current = ''));
                }),
                onPointerMove: U(
                  e.onPointerMove,
                  Wi(E => {
                    const A = E.target,
                      Z = O.current !== E.clientX;
                    if (E.currentTarget.contains(A) && Z) {
                      const W = E.clientX > O.current ? 'right' : 'left';
                      ((Y.current = W), (O.current = E.clientX));
                    }
                  })
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
o0.displayName = Ut;
var FT = 'MenuGroup',
  jp = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return l.jsx(te.div, { role: 'group', ...r, ref: t });
  });
jp.displayName = FT;
var $T = 'MenuLabel',
  i0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return l.jsx(te.div, { ...r, ref: t });
  });
i0.displayName = $T;
var Ml = 'MenuItem',
  ng = 'menu.itemSelect',
  jc = d.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: r, ...s } = e,
      o = d.useRef(null),
      i = aa(Ml, e.__scopeMenu),
      a = _p(Ml, e.__scopeMenu),
      c = ye(t, o),
      u = d.useRef(!1),
      f = () => {
        const p = o.current;
        if (!n && p) {
          const h = new CustomEvent(ng, { bubbles: !0, cancelable: !0 });
          (p.addEventListener(ng, m => (r == null ? void 0 : r(m)), { once: !0 }),
            tp(p, h),
            h.defaultPrevented ? (u.current = !1) : i.onClose());
        }
      };
    return l.jsx(a0, {
      ...s,
      ref: c,
      disabled: n,
      onClick: U(e.onClick, f),
      onPointerDown: p => {
        var h;
        ((h = e.onPointerDown) == null || h.call(e, p), (u.current = !0));
      },
      onPointerUp: U(e.onPointerUp, p => {
        var h;
        u.current || (h = p.currentTarget) == null || h.click();
      }),
      onKeyDown: U(e.onKeyDown, p => {
        const h = a.searchRef.current !== '';
        n || (h && p.key === ' ') || (Bd.includes(p.key) && (p.currentTarget.click(), p.preventDefault()));
      }),
    });
  });
jc.displayName = Ml;
var a0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: s, ...o } = e,
      i = _p(Ml, n),
      a = t0(n),
      c = d.useRef(null),
      u = ye(t, c),
      [f, p] = d.useState(!1),
      [h, m] = d.useState('');
    return (
      d.useEffect(() => {
        const S = c.current;
        S && m((S.textContent ?? '').trim());
      }, [o.children]),
      l.jsx(Bi.ItemSlot, {
        scope: n,
        disabled: r,
        textValue: s ?? h,
        children: l.jsx(Ww, {
          asChild: !0,
          ...a,
          focusable: !r,
          children: l.jsx(te.div, {
            role: 'menuitem',
            'data-highlighted': f ? '' : void 0,
            'aria-disabled': r || void 0,
            'data-disabled': r ? '' : void 0,
            ...o,
            ref: u,
            onPointerMove: U(
              e.onPointerMove,
              Wi(S => {
                r ? i.onItemLeave(S) : (i.onItemEnter(S), S.defaultPrevented || S.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: U(
              e.onPointerLeave,
              Wi(S => i.onItemLeave(S))
            ),
            onFocus: U(e.onFocus, () => p(!0)),
            onBlur: U(e.onBlur, () => p(!1)),
          }),
        }),
      })
    );
  }),
  zT = 'MenuCheckboxItem',
  l0 = d.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...s } = e;
    return l.jsx(p0, {
      scope: e.__scopeMenu,
      checked: n,
      children: l.jsx(jc, {
        role: 'menuitemcheckbox',
        'aria-checked': Ol(n) ? 'mixed' : n,
        ...s,
        ref: t,
        'data-state': Rp(n),
        onSelect: U(s.onSelect, () => (r == null ? void 0 : r(Ol(n) ? !0 : !n)), { checkForDefaultPrevented: !1 }),
      }),
    });
  });
l0.displayName = zT;
var c0 = 'MenuRadioGroup',
  [VT, UT] = Ss(c0, { value: void 0, onValueChange: () => {} }),
  u0 = d.forwardRef((e, t) => {
    const { value: n, onValueChange: r, ...s } = e,
      o = dt(r);
    return l.jsx(VT, { scope: e.__scopeMenu, value: n, onValueChange: o, children: l.jsx(jp, { ...s, ref: t }) });
  });
u0.displayName = c0;
var d0 = 'MenuRadioItem',
  f0 = d.forwardRef((e, t) => {
    const { value: n, ...r } = e,
      s = UT(d0, e.__scopeMenu),
      o = n === s.value;
    return l.jsx(p0, {
      scope: e.__scopeMenu,
      checked: o,
      children: l.jsx(jc, {
        role: 'menuitemradio',
        'aria-checked': o,
        ...r,
        ref: t,
        'data-state': Rp(o),
        onSelect: U(
          r.onSelect,
          () => {
            var i;
            return (i = s.onValueChange) == null ? void 0 : i.call(s, n);
          },
          { checkForDefaultPrevented: !1 }
        ),
      }),
    });
  });
f0.displayName = d0;
var Tp = 'MenuItemIndicator',
  [p0, BT] = Ss(Tp, { checked: !1 }),
  h0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: r, ...s } = e,
      o = BT(Tp, n);
    return l.jsx(un, {
      present: r || Ol(o.checked) || o.checked === !0,
      children: l.jsx(te.span, { ...s, ref: t, 'data-state': Rp(o.checked) }),
    });
  });
h0.displayName = Tp;
var WT = 'MenuSeparator',
  m0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return l.jsx(te.div, { role: 'separator', 'aria-orientation': 'horizontal', ...r, ref: t });
  });
m0.displayName = WT;
var HT = 'MenuArrow',
  g0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      s = Pc(n);
    return l.jsx(yp, { ...s, ...r, ref: t });
  });
g0.displayName = HT;
var GT = 'MenuSub',
  [CM, v0] = Ss(GT),
  oi = 'MenuSubTrigger',
  y0 = d.forwardRef((e, t) => {
    const n = bs(oi, e.__scopeMenu),
      r = aa(oi, e.__scopeMenu),
      s = v0(oi, e.__scopeMenu),
      o = _p(oi, e.__scopeMenu),
      i = d.useRef(null),
      { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = o,
      u = { __scopeMenu: e.__scopeMenu },
      f = d.useCallback(() => {
        (i.current && window.clearTimeout(i.current), (i.current = null));
      }, []);
    return (
      d.useEffect(() => f, [f]),
      d.useEffect(() => {
        const p = a.current;
        return () => {
          (window.clearTimeout(p), c(null));
        };
      }, [a, c]),
      l.jsx(Np, {
        asChild: !0,
        ...u,
        children: l.jsx(a0, {
          id: s.triggerId,
          'aria-haspopup': 'menu',
          'aria-expanded': n.open,
          'aria-controls': s.contentId,
          'data-state': S0(n.open),
          ...e,
          ref: lc(t, s.onTriggerChange),
          onClick: p => {
            var h;
            ((h = e.onClick) == null || h.call(e, p),
              !(e.disabled || p.defaultPrevented) && (p.currentTarget.focus(), n.open || n.onOpenChange(!0)));
          },
          onPointerMove: U(
            e.onPointerMove,
            Wi(p => {
              (o.onItemEnter(p),
                !p.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !i.current &&
                  (o.onPointerGraceIntentChange(null),
                  (i.current = window.setTimeout(() => {
                    (n.onOpenChange(!0), f());
                  }, 100))));
            })
          ),
          onPointerLeave: U(
            e.onPointerLeave,
            Wi(p => {
              var m, S;
              f();
              const h = (m = n.content) == null ? void 0 : m.getBoundingClientRect();
              if (h) {
                const v = (S = n.content) == null ? void 0 : S.dataset.side,
                  w = v === 'right',
                  x = w ? -5 : 5,
                  g = h[w ? 'left' : 'right'],
                  y = h[w ? 'right' : 'left'];
                (o.onPointerGraceIntentChange({
                  area: [
                    { x: p.clientX + x, y: p.clientY },
                    { x: g, y: h.top },
                    { x: y, y: h.top },
                    { x: y, y: h.bottom },
                    { x: g, y: h.bottom },
                  ],
                  side: v,
                }),
                  window.clearTimeout(a.current),
                  (a.current = window.setTimeout(() => o.onPointerGraceIntentChange(null), 300)));
              } else {
                if ((o.onTriggerLeave(p), p.defaultPrevented)) return;
                o.onPointerGraceIntentChange(null);
              }
            })
          ),
          onKeyDown: U(e.onKeyDown, p => {
            var m;
            const h = o.searchRef.current !== '';
            e.disabled ||
              (h && p.key === ' ') ||
              (kT[r.dir].includes(p.key) && (n.onOpenChange(!0), (m = n.content) == null || m.focus(), p.preventDefault()));
          }),
        }),
      })
    );
  });
y0.displayName = oi;
var x0 = 'MenuSubContent',
  w0 = d.forwardRef((e, t) => {
    const n = r0(Ut, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...s } = e,
      o = bs(Ut, e.__scopeMenu),
      i = aa(Ut, e.__scopeMenu),
      a = v0(x0, e.__scopeMenu),
      c = d.useRef(null),
      u = ye(t, c);
    return l.jsx(Bi.Provider, {
      scope: e.__scopeMenu,
      children: l.jsx(un, {
        present: r || o.open,
        children: l.jsx(Bi.Slot, {
          scope: e.__scopeMenu,
          children: l.jsx(Pp, {
            id: a.contentId,
            'aria-labelledby': a.triggerId,
            ...s,
            ref: u,
            align: 'start',
            side: i.dir === 'rtl' ? 'left' : 'right',
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: f => {
              var p;
              (i.isUsingKeyboardRef.current && ((p = c.current) == null || p.focus()), f.preventDefault());
            },
            onCloseAutoFocus: f => f.preventDefault(),
            onFocusOutside: U(e.onFocusOutside, f => {
              f.target !== a.trigger && o.onOpenChange(!1);
            }),
            onEscapeKeyDown: U(e.onEscapeKeyDown, f => {
              (i.onClose(), f.preventDefault());
            }),
            onKeyDown: U(e.onKeyDown, f => {
              var m;
              const p = f.currentTarget.contains(f.target),
                h = _T[i.dir].includes(f.key);
              p && h && (o.onOpenChange(!1), (m = a.trigger) == null || m.focus(), f.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
w0.displayName = x0;
function S0(e) {
  return e ? 'open' : 'closed';
}
function Ol(e) {
  return e === 'indeterminate';
}
function Rp(e) {
  return Ol(e) ? 'indeterminate' : e ? 'checked' : 'unchecked';
}
function KT(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function ZT(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function QT(e, t, n) {
  const s = t.length > 1 && Array.from(t).every(u => u === t[0]) ? t[0] : t,
    o = n ? e.indexOf(n) : -1;
  let i = ZT(e, Math.max(o, 0));
  s.length === 1 && (i = i.filter(u => u !== n));
  const c = i.find(u => u.toLowerCase().startsWith(s.toLowerCase()));
  return c !== n ? c : void 0;
}
function qT(e, t) {
  const { x: n, y: r } = e;
  let s = !1;
  for (let o = 0, i = t.length - 1; o < t.length; i = o++) {
    const a = t[o],
      c = t[i],
      u = a.x,
      f = a.y,
      p = c.x,
      h = c.y;
    f > r != h > r && n < ((p - u) * (r - f)) / (h - f) + u && (s = !s);
  }
  return s;
}
function YT(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return qT(n, t);
}
function Wi(e) {
  return t => (t.pointerType === 'mouse' ? e(t) : void 0);
}
var XT = n0,
  JT = Np,
  eR = s0,
  tR = o0,
  nR = jp,
  rR = i0,
  sR = jc,
  oR = l0,
  iR = u0,
  aR = f0,
  lR = h0,
  cR = m0,
  uR = g0,
  dR = y0,
  fR = w0,
  Tc = 'DropdownMenu',
  [pR, EM] = At(Tc, [e0]),
  ht = e0(),
  [hR, b0] = pR(Tc),
  C0 = e => {
    const { __scopeDropdownMenu: t, children: n, dir: r, open: s, defaultOpen: o, onOpenChange: i, modal: a = !0 } = e,
      c = ht(t),
      u = d.useRef(null),
      [f, p] = kr({ prop: s, defaultProp: o ?? !1, onChange: i, caller: Tc });
    return l.jsx(hR, {
      scope: t,
      triggerId: bn(),
      triggerRef: u,
      contentId: bn(),
      open: f,
      onOpenChange: p,
      onOpenToggle: d.useCallback(() => p(h => !h), [p]),
      modal: a,
      children: l.jsx(XT, { ...c, open: f, onOpenChange: p, dir: r, modal: a, children: n }),
    });
  };
C0.displayName = Tc;
var E0 = 'DropdownMenuTrigger',
  N0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...s } = e,
      o = b0(E0, n),
      i = ht(n);
    return l.jsx(JT, {
      asChild: !0,
      ...i,
      children: l.jsx(te.button, {
        type: 'button',
        id: o.triggerId,
        'aria-haspopup': 'menu',
        'aria-expanded': o.open,
        'aria-controls': o.open ? o.contentId : void 0,
        'data-state': o.open ? 'open' : 'closed',
        'data-disabled': r ? '' : void 0,
        disabled: r,
        ...s,
        ref: lc(t, o.triggerRef),
        onPointerDown: U(e.onPointerDown, a => {
          !r && a.button === 0 && a.ctrlKey === !1 && (o.onOpenToggle(), o.open || a.preventDefault());
        }),
        onKeyDown: U(e.onKeyDown, a => {
          r ||
            (['Enter', ' '].includes(a.key) && o.onOpenToggle(),
            a.key === 'ArrowDown' && o.onOpenChange(!0),
            ['Enter', ' ', 'ArrowDown'].includes(a.key) && a.preventDefault());
        }),
      }),
    });
  });
N0.displayName = E0;
var mR = 'DropdownMenuPortal',
  k0 = e => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ht(t);
    return l.jsx(eR, { ...r, ...n });
  };
k0.displayName = mR;
var _0 = 'DropdownMenuContent',
  P0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = b0(_0, n),
      o = ht(n),
      i = d.useRef(!1);
    return l.jsx(tR, {
      id: s.contentId,
      'aria-labelledby': s.triggerId,
      ...o,
      ...r,
      ref: t,
      onCloseAutoFocus: U(e.onCloseAutoFocus, a => {
        var c;
        (i.current || (c = s.triggerRef.current) == null || c.focus(), (i.current = !1), a.preventDefault());
      }),
      onInteractOutside: U(e.onInteractOutside, a => {
        const c = a.detail.originalEvent,
          u = c.button === 0 && c.ctrlKey === !0,
          f = c.button === 2 || u;
        (!s.modal || f) && (i.current = !0);
      }),
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    });
  });
P0.displayName = _0;
var gR = 'DropdownMenuGroup',
  vR = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(nR, { ...s, ...r, ref: t });
  });
vR.displayName = gR;
var yR = 'DropdownMenuLabel',
  j0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(rR, { ...s, ...r, ref: t });
  });
j0.displayName = yR;
var xR = 'DropdownMenuItem',
  T0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(sR, { ...s, ...r, ref: t });
  });
T0.displayName = xR;
var wR = 'DropdownMenuCheckboxItem',
  R0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(oR, { ...s, ...r, ref: t });
  });
R0.displayName = wR;
var SR = 'DropdownMenuRadioGroup',
  bR = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(iR, { ...s, ...r, ref: t });
  });
bR.displayName = SR;
var CR = 'DropdownMenuRadioItem',
  I0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(aR, { ...s, ...r, ref: t });
  });
I0.displayName = CR;
var ER = 'DropdownMenuItemIndicator',
  A0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(lR, { ...s, ...r, ref: t });
  });
A0.displayName = ER;
var NR = 'DropdownMenuSeparator',
  M0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(cR, { ...s, ...r, ref: t });
  });
M0.displayName = NR;
var kR = 'DropdownMenuArrow',
  _R = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(uR, { ...s, ...r, ref: t });
  });
_R.displayName = kR;
var PR = 'DropdownMenuSubTrigger',
  O0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(dR, { ...s, ...r, ref: t });
  });
O0.displayName = PR;
var jR = 'DropdownMenuSubContent',
  L0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      s = ht(n);
    return l.jsx(fR, {
      ...s,
      ...r,
      ref: t,
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    });
  });
L0.displayName = jR;
var TR = C0,
  RR = N0,
  IR = k0,
  D0 = P0,
  F0 = j0,
  $0 = T0,
  z0 = R0,
  V0 = I0,
  U0 = A0,
  B0 = M0,
  W0 = O0,
  H0 = L0;
const AR = TR,
  MR = RR,
  OR = d.forwardRef(({ className: e, inset: t, children: n, ...r }, s) =>
    l.jsxs(W0, {
      ref: s,
      className: ne(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
        t && 'pl-8',
        e
      ),
      ...r,
      children: [n, l.jsx(jN, { className: 'ml-auto h-4 w-4' })],
    })
  );
OR.displayName = W0.displayName;
const LR = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(H0, {
    ref: n,
    className: ne(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      e
    ),
    ...t,
  })
);
LR.displayName = H0.displayName;
const G0 = d.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
  l.jsx(IR, {
    children: l.jsx(D0, {
      ref: r,
      sideOffset: t,
      className: ne(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        e
      ),
      ...n,
    }),
  })
);
G0.displayName = D0.displayName;
const Wd = d.forwardRef(({ className: e, inset: t, ...n }, r) =>
  l.jsx($0, {
    ref: r,
    className: ne(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      t && 'pl-8',
      e
    ),
    ...n,
  })
);
Wd.displayName = $0.displayName;
const DR = d.forwardRef(({ className: e, children: t, checked: n, ...r }, s) =>
  l.jsxs(z0, {
    ref: s,
    className: ne(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    checked: n,
    ...r,
    children: [
      l.jsx('span', {
        className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: l.jsx(U0, { children: l.jsx(El, { className: 'h-4 w-4' }) }),
      }),
      t,
    ],
  })
);
DR.displayName = z0.displayName;
const FR = d.forwardRef(({ className: e, children: t, ...n }, r) =>
  l.jsxs(V0, {
    ref: r,
    className: ne(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    ...n,
    children: [
      l.jsx('span', {
        className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: l.jsx(U0, { children: l.jsx(RN, { className: 'h-2 w-2 fill-current' }) }),
      }),
      t,
    ],
  })
);
FR.displayName = V0.displayName;
const $R = d.forwardRef(({ className: e, inset: t, ...n }, r) =>
  l.jsx(F0, { ref: r, className: ne('px-2 py-1.5 text-sm font-semibold', t && 'pl-8', e), ...n })
);
$R.displayName = F0.displayName;
const zR = d.forwardRef(({ className: e, ...t }, n) => l.jsx(B0, { ref: n, className: ne('-mx-1 my-1 h-px bg-muted', e), ...t }));
zR.displayName = B0.displayName;
const VR = D.memo(function ({ onSettingsClick: t }) {
    const n = [
      { to: '/', icon: LN, label: 'Home' },
      { to: '/game-versions', icon: PN, label: 'Archived Versions' },
    ];
    return l.jsxs('nav', {
      className: 'flex items-center justify-between w-full no-drag',
      children: [
        l.jsx('div', {
          className: 'flex items-center gap-1',
          children: n.map(r =>
            l.jsxs(
              mj,
              {
                to: r.to,
                className: ({ isActive: s }) =>
                  ne(
                    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    'hover:bg-primary/10 hover:text-primary',
                    s ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted-foreground'
                  ),
                children: [l.jsx(r.icon, { className: 'w-4 h-4' }), l.jsx('span', { className: 'hidden sm:inline', children: r.label })],
              },
              r.to
            )
          ),
        }),
        l.jsxs('div', {
          className: 'flex items-center gap-2',
          children: [
            l.jsx(Ne, {
              variant: 'mining',
              size: 'icon',
              onClick: t,
              'aria-label': 'Open settings',
              className: 'h-11 w-11',
              children: l.jsx(Pd, { className: 'w-5 h-5' }),
            }),
            l.jsxs(AR, {
              children: [
                l.jsx(MR, {
                  asChild: !0,
                  children: l.jsx(Ne, {
                    variant: 'destructive',
                    size: 'icon',
                    'aria-label': 'Power options',
                    className: 'h-11 w-11',
                    children: l.jsx(zN, { className: 'w-5 h-5' }),
                  }),
                }),
                l.jsxs(G0, {
                  align: 'end',
                  children: [
                    l.jsxs(Wd, {
                      onClick: () => {
                        var r;
                        return (r = window.electronAPI) == null ? void 0 : r.send('window-minimize');
                      },
                      children: [l.jsx(FN, { className: 'w-4 h-4 mr-2' }), 'Minimize'],
                    }),
                    l.jsxs(Wd, {
                      onClick: () => {
                        var r;
                        return (r = window.electronAPI) == null ? void 0 : r.send('window-exit');
                      },
                      children: [l.jsx(na, { className: 'w-4 h-4 mr-2' }), 'Exit'],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }),
  Hd = d.forwardRef(({ className: e, type: t, ...n }, r) =>
    l.jsx('input', {
      type: t,
      className: ne(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        e
      ),
      ref: r,
      ...n,
    })
  );
Hd.displayName = 'Input';
var UR = 'Label',
  K0 = d.forwardRef((e, t) =>
    l.jsx(te.label, {
      ...e,
      ref: t,
      onMouseDown: n => {
        var s;
        n.target.closest('button, input, select, textarea') ||
          ((s = e.onMouseDown) == null || s.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
      },
    })
  );
K0.displayName = UR;
var Z0 = K0;
const BR = fc('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'),
  Xn = d.forwardRef(({ className: e, ...t }, n) => l.jsx(Z0, { ref: n, className: ne(BR(), e), ...t }));
Xn.displayName = Z0.displayName;
function Q0(e) {
  const t = d.useRef({ value: e, previous: e });
  return d.useMemo(
    () => (t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)), t.current.previous),
    [e]
  );
}
var Rc = 'Switch',
  [WR, NM] = At(Rc),
  [HR, GR] = WR(Rc),
  q0 = d.forwardRef((e, t) => {
    const {
        __scopeSwitch: n,
        name: r,
        checked: s,
        defaultChecked: o,
        required: i,
        disabled: a,
        value: c = 'on',
        onCheckedChange: u,
        form: f,
        ...p
      } = e,
      [h, m] = d.useState(null),
      S = ye(t, y => m(y)),
      v = d.useRef(!1),
      w = h ? f || !!h.closest('form') : !0,
      [x, g] = kr({ prop: s, defaultProp: o ?? !1, onChange: u, caller: Rc });
    return l.jsxs(HR, {
      scope: n,
      checked: x,
      disabled: a,
      children: [
        l.jsx(te.button, {
          type: 'button',
          role: 'switch',
          'aria-checked': x,
          'aria-required': i,
          'data-state': e1(x),
          'data-disabled': a ? '' : void 0,
          disabled: a,
          value: c,
          ...p,
          ref: S,
          onClick: U(e.onClick, y => {
            (g(b => !b), w && ((v.current = y.isPropagationStopped()), v.current || y.stopPropagation()));
          }),
        }),
        w &&
          l.jsx(J0, {
            control: h,
            bubbles: !v.current,
            name: r,
            value: c,
            checked: x,
            required: i,
            disabled: a,
            form: f,
            style: { transform: 'translateX(-100%)' },
          }),
      ],
    });
  });
q0.displayName = Rc;
var Y0 = 'SwitchThumb',
  X0 = d.forwardRef((e, t) => {
    const { __scopeSwitch: n, ...r } = e,
      s = GR(Y0, n);
    return l.jsx(te.span, { 'data-state': e1(s.checked), 'data-disabled': s.disabled ? '' : void 0, ...r, ref: t });
  });
X0.displayName = Y0;
var KR = 'SwitchBubbleInput',
  J0 = d.forwardRef(({ __scopeSwitch: e, control: t, checked: n, bubbles: r = !0, ...s }, o) => {
    const i = d.useRef(null),
      a = ye(i, o),
      c = Q0(n),
      u = Xx(t);
    return (
      d.useEffect(() => {
        const f = i.current;
        if (!f) return;
        const p = window.HTMLInputElement.prototype,
          m = Object.getOwnPropertyDescriptor(p, 'checked').set;
        if (c !== n && m) {
          const S = new Event('click', { bubbles: r });
          (m.call(f, n), f.dispatchEvent(S));
        }
      }, [c, n, r]),
      l.jsx('input', {
        type: 'checkbox',
        'aria-hidden': !0,
        defaultChecked: n,
        ...s,
        tabIndex: -1,
        ref: a,
        style: { ...s.style, ...u, position: 'absolute', pointerEvents: 'none', opacity: 0, margin: 0 },
      })
    );
  });
J0.displayName = KR;
function e1(e) {
  return e ? 'checked' : 'unchecked';
}
var t1 = q0,
  ZR = X0;
const Ja = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(t1, {
    className: ne(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      e
    ),
    ...t,
    ref: n,
    children: l.jsx(ZR, {
      className: ne(
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
      ),
    }),
  })
);
Ja.displayName = t1.displayName;
function rg(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var QR = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
  qR = [' ', 'Enter'],
  ds = 'Select',
  [Ic, Ac, YR] = cc(ds),
  [zo, kM] = At(ds, [YR, Fo]),
  Mc = Fo(),
  [XR, Or] = zo(ds),
  [JR, eI] = zo(ds),
  n1 = e => {
    const {
        __scopeSelect: t,
        children: n,
        open: r,
        defaultOpen: s,
        onOpenChange: o,
        value: i,
        defaultValue: a,
        onValueChange: c,
        dir: u,
        name: f,
        autoComplete: p,
        disabled: h,
        required: m,
        form: S,
      } = e,
      v = Mc(t),
      [w, x] = d.useState(null),
      [g, y] = d.useState(null),
      [b, C] = d.useState(!1),
      k = Cc(u),
      [N, P] = kr({ prop: r, defaultProp: s ?? !1, onChange: o, caller: ds }),
      [T, R] = kr({ prop: i, defaultProp: a, onChange: c, caller: ds }),
      H = d.useRef(null),
      $ = w ? S || !!w.closest('form') : !0,
      [Y, O] = d.useState(new Set()),
      X = Array.from(Y)
        .map(I => I.props.value)
        .join(';');
    return l.jsx(lw, {
      ...v,
      children: l.jsxs(XR, {
        required: m,
        scope: t,
        trigger: w,
        onTriggerChange: x,
        valueNode: g,
        onValueNodeChange: y,
        valueNodeHasChildren: b,
        onValueNodeHasChildrenChange: C,
        contentId: bn(),
        value: T,
        onValueChange: R,
        open: N,
        onOpenChange: P,
        dir: k,
        triggerPointerDownPosRef: H,
        disabled: h,
        children: [
          l.jsx(Ic.Provider, {
            scope: t,
            children: l.jsx(JR, {
              scope: e.__scopeSelect,
              onNativeOptionAdd: d.useCallback(I => {
                O(z => new Set(z).add(I));
              }, []),
              onNativeOptionRemove: d.useCallback(I => {
                O(z => {
                  const _ = new Set(z);
                  return (_.delete(I), _);
                });
              }, []),
              children: n,
            }),
          }),
          $
            ? l.jsxs(
                k1,
                {
                  'aria-hidden': !0,
                  required: m,
                  tabIndex: -1,
                  name: f,
                  autoComplete: p,
                  value: T,
                  onChange: I => R(I.target.value),
                  disabled: h,
                  form: S,
                  children: [T === void 0 ? l.jsx('option', { value: '' }) : null, Array.from(Y)],
                },
                X
              )
            : null,
        ],
      }),
    });
  };
n1.displayName = ds;
var r1 = 'SelectTrigger',
  s1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...s } = e,
      o = Mc(n),
      i = Or(r1, n),
      a = i.disabled || r,
      c = ye(t, i.onTriggerChange),
      u = Ac(n),
      f = d.useRef('touch'),
      [p, h, m] = P1(v => {
        const w = u().filter(y => !y.disabled),
          x = w.find(y => y.value === i.value),
          g = j1(w, v, x);
        g !== void 0 && i.onValueChange(g.value);
      }),
      S = v => {
        (a || (i.onOpenChange(!0), m()), v && (i.triggerPointerDownPosRef.current = { x: Math.round(v.pageX), y: Math.round(v.pageY) }));
      };
    return l.jsx(gp, {
      asChild: !0,
      ...o,
      children: l.jsx(te.button, {
        type: 'button',
        role: 'combobox',
        'aria-controls': i.contentId,
        'aria-expanded': i.open,
        'aria-required': i.required,
        'aria-autocomplete': 'none',
        dir: i.dir,
        'data-state': i.open ? 'open' : 'closed',
        disabled: a,
        'data-disabled': a ? '' : void 0,
        'data-placeholder': _1(i.value) ? '' : void 0,
        ...s,
        ref: c,
        onClick: U(s.onClick, v => {
          (v.currentTarget.focus(), f.current !== 'mouse' && S(v));
        }),
        onPointerDown: U(s.onPointerDown, v => {
          f.current = v.pointerType;
          const w = v.target;
          (w.hasPointerCapture(v.pointerId) && w.releasePointerCapture(v.pointerId),
            v.button === 0 && v.ctrlKey === !1 && v.pointerType === 'mouse' && (S(v), v.preventDefault()));
        }),
        onKeyDown: U(s.onKeyDown, v => {
          const w = p.current !== '';
          (!(v.ctrlKey || v.altKey || v.metaKey) && v.key.length === 1 && h(v.key),
            !(w && v.key === ' ') && QR.includes(v.key) && (S(), v.preventDefault()));
        }),
      }),
    });
  });
s1.displayName = r1;
var o1 = 'SelectValue',
  i1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, className: r, style: s, children: o, placeholder: i = '', ...a } = e,
      c = Or(o1, n),
      { onValueNodeHasChildrenChange: u } = c,
      f = o !== void 0,
      p = ye(t, c.onValueNodeChange);
    return (
      Ue(() => {
        u(f);
      }, [u, f]),
      l.jsx(te.span, { ...a, ref: p, style: { pointerEvents: 'none' }, children: _1(c.value) ? l.jsx(l.Fragment, { children: i }) : o })
    );
  });
i1.displayName = o1;
var tI = 'SelectIcon',
  a1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, children: r, ...s } = e;
    return l.jsx(te.span, { 'aria-hidden': !0, ...s, ref: t, children: r || '▼' });
  });
a1.displayName = tI;
var nI = 'SelectPortal',
  l1 = e => l.jsx(ea, { asChild: !0, ...e });
l1.displayName = nI;
var fs = 'SelectContent',
  c1 = d.forwardRef((e, t) => {
    const n = Or(fs, e.__scopeSelect),
      [r, s] = d.useState();
    if (
      (Ue(() => {
        s(new DocumentFragment());
      }, []),
      !n.open)
    ) {
      const o = r;
      return o
        ? ys.createPortal(
            l.jsx(u1, {
              scope: e.__scopeSelect,
              children: l.jsx(Ic.Slot, { scope: e.__scopeSelect, children: l.jsx('div', { children: e.children }) }),
            }),
            o
          )
        : null;
    }
    return l.jsx(d1, { ...e, ref: t });
  });
c1.displayName = fs;
var Yt = 10,
  [u1, Lr] = zo(fs),
  rI = 'SelectContentImpl',
  sI = cs('SelectContent.RemoveScroll'),
  d1 = d.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        position: r = 'item-aligned',
        onCloseAutoFocus: s,
        onEscapeKeyDown: o,
        onPointerDownOutside: i,
        side: a,
        sideOffset: c,
        align: u,
        alignOffset: f,
        arrowPadding: p,
        collisionBoundary: h,
        collisionPadding: m,
        sticky: S,
        hideWhenDetached: v,
        avoidCollisions: w,
        ...x
      } = e,
      g = Or(fs, n),
      [y, b] = d.useState(null),
      [C, k] = d.useState(null),
      N = ye(t, F => b(F)),
      [P, T] = d.useState(null),
      [R, H] = d.useState(null),
      $ = Ac(n),
      [Y, O] = d.useState(!1),
      X = d.useRef(!1);
    (d.useEffect(() => {
      if (y) return Ep(y);
    }, [y]),
      Cp());
    const I = d.useCallback(
        F => {
          const [he, ...me] = $().map(re => re.ref.current),
            [G] = me.slice(-1),
            ee = document.activeElement;
          for (const re of F)
            if (
              re === ee ||
              (re == null || re.scrollIntoView({ block: 'nearest' }),
              re === he && C && (C.scrollTop = 0),
              re === G && C && (C.scrollTop = C.scrollHeight),
              re == null || re.focus(),
              document.activeElement !== ee)
            )
              return;
        },
        [$, C]
      ),
      z = d.useCallback(() => I([P, y]), [I, P, y]);
    d.useEffect(() => {
      Y && z();
    }, [Y, z]);
    const { onOpenChange: _, triggerPointerDownPosRef: E } = g;
    (d.useEffect(() => {
      if (y) {
        let F = { x: 0, y: 0 };
        const he = G => {
            var ee, re;
            F = {
              x: Math.abs(Math.round(G.pageX) - (((ee = E.current) == null ? void 0 : ee.x) ?? 0)),
              y: Math.abs(Math.round(G.pageY) - (((re = E.current) == null ? void 0 : re.y) ?? 0)),
            };
          },
          me = G => {
            (F.x <= 10 && F.y <= 10 ? G.preventDefault() : y.contains(G.target) || _(!1),
              document.removeEventListener('pointermove', he),
              (E.current = null));
          };
        return (
          E.current !== null &&
            (document.addEventListener('pointermove', he), document.addEventListener('pointerup', me, { capture: !0, once: !0 })),
          () => {
            (document.removeEventListener('pointermove', he), document.removeEventListener('pointerup', me, { capture: !0 }));
          }
        );
      }
    }, [y, _, E]),
      d.useEffect(() => {
        const F = () => _(!1);
        return (
          window.addEventListener('blur', F),
          window.addEventListener('resize', F),
          () => {
            (window.removeEventListener('blur', F), window.removeEventListener('resize', F));
          }
        );
      }, [_]));
    const [A, Z] = P1(F => {
        const he = $().filter(ee => !ee.disabled),
          me = he.find(ee => ee.ref.current === document.activeElement),
          G = j1(he, F, me);
        G && setTimeout(() => G.ref.current.focus());
      }),
      W = d.useCallback(
        (F, he, me) => {
          const G = !X.current && !me;
          ((g.value !== void 0 && g.value === he) || G) && (T(F), G && (X.current = !0));
        },
        [g.value]
      ),
      J = d.useCallback(() => (y == null ? void 0 : y.focus()), [y]),
      V = d.useCallback(
        (F, he, me) => {
          const G = !X.current && !me;
          ((g.value !== void 0 && g.value === he) || G) && H(F);
        },
        [g.value]
      ),
      pe = r === 'popper' ? Gd : f1,
      ge =
        pe === Gd
          ? {
              side: a,
              sideOffset: c,
              align: u,
              alignOffset: f,
              arrowPadding: p,
              collisionBoundary: h,
              collisionPadding: m,
              sticky: S,
              hideWhenDetached: v,
              avoidCollisions: w,
            }
          : {};
    return l.jsx(u1, {
      scope: n,
      content: y,
      viewport: C,
      onViewportChange: k,
      itemRefCallback: W,
      selectedItem: P,
      onItemLeave: J,
      itemTextRefCallback: V,
      focusSelectedItem: z,
      selectedItemText: R,
      position: r,
      isPositioned: Y,
      searchRef: A,
      children: l.jsx(_c, {
        as: sI,
        allowPinchZoom: !0,
        children: l.jsx(Ec, {
          asChild: !0,
          trapped: g.open,
          onMountAutoFocus: F => {
            F.preventDefault();
          },
          onUnmountAutoFocus: U(s, F => {
            var he;
            ((he = g.trigger) == null || he.focus({ preventScroll: !0 }), F.preventDefault());
          }),
          children: l.jsx(Ao, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: o,
            onPointerDownOutside: i,
            onFocusOutside: F => F.preventDefault(),
            onDismiss: () => g.onOpenChange(!1),
            children: l.jsx(pe, {
              role: 'listbox',
              id: g.contentId,
              'data-state': g.open ? 'open' : 'closed',
              dir: g.dir,
              onContextMenu: F => F.preventDefault(),
              ...x,
              ...ge,
              onPlaced: () => O(!0),
              ref: N,
              style: { display: 'flex', flexDirection: 'column', outline: 'none', ...x.style },
              onKeyDown: U(x.onKeyDown, F => {
                const he = F.ctrlKey || F.altKey || F.metaKey;
                if (
                  (F.key === 'Tab' && F.preventDefault(),
                  !he && F.key.length === 1 && Z(F.key),
                  ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(F.key))
                ) {
                  let G = $()
                    .filter(ee => !ee.disabled)
                    .map(ee => ee.ref.current);
                  if ((['ArrowUp', 'End'].includes(F.key) && (G = G.slice().reverse()), ['ArrowUp', 'ArrowDown'].includes(F.key))) {
                    const ee = F.target,
                      re = G.indexOf(ee);
                    G = G.slice(re + 1);
                  }
                  (setTimeout(() => I(G)), F.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
d1.displayName = rI;
var oI = 'SelectItemAlignedPosition',
  f1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, onPlaced: r, ...s } = e,
      o = Or(fs, n),
      i = Lr(fs, n),
      [a, c] = d.useState(null),
      [u, f] = d.useState(null),
      p = ye(t, N => f(N)),
      h = Ac(n),
      m = d.useRef(!1),
      S = d.useRef(!0),
      { viewport: v, selectedItem: w, selectedItemText: x, focusSelectedItem: g } = i,
      y = d.useCallback(() => {
        if (o.trigger && o.valueNode && a && u && v && w && x) {
          const N = o.trigger.getBoundingClientRect(),
            P = u.getBoundingClientRect(),
            T = o.valueNode.getBoundingClientRect(),
            R = x.getBoundingClientRect();
          if (o.dir !== 'rtl') {
            const ee = R.left - P.left,
              re = T.left - ee,
              Oe = N.left - re,
              Je = N.width + Oe,
              Dr = Math.max(Je, P.width),
              Bn = window.innerWidth - Yt,
              Fr = rg(re, [Yt, Math.max(Yt, Bn - Dr)]);
            ((a.style.minWidth = Je + 'px'), (a.style.left = Fr + 'px'));
          } else {
            const ee = P.right - R.right,
              re = window.innerWidth - T.right - ee,
              Oe = window.innerWidth - N.right - re,
              Je = N.width + Oe,
              Dr = Math.max(Je, P.width),
              Bn = window.innerWidth - Yt,
              Fr = rg(re, [Yt, Math.max(Yt, Bn - Dr)]);
            ((a.style.minWidth = Je + 'px'), (a.style.right = Fr + 'px'));
          }
          const H = h(),
            $ = window.innerHeight - Yt * 2,
            Y = v.scrollHeight,
            O = window.getComputedStyle(u),
            X = parseInt(O.borderTopWidth, 10),
            I = parseInt(O.paddingTop, 10),
            z = parseInt(O.borderBottomWidth, 10),
            _ = parseInt(O.paddingBottom, 10),
            E = X + I + Y + _ + z,
            A = Math.min(w.offsetHeight * 5, E),
            Z = window.getComputedStyle(v),
            W = parseInt(Z.paddingTop, 10),
            J = parseInt(Z.paddingBottom, 10),
            V = N.top + N.height / 2 - Yt,
            pe = $ - V,
            ge = w.offsetHeight / 2,
            F = w.offsetTop + ge,
            he = X + I + F,
            me = E - he;
          if (he <= V) {
            const ee = H.length > 0 && w === H[H.length - 1].ref.current;
            a.style.bottom = '0px';
            const re = u.clientHeight - v.offsetTop - v.offsetHeight,
              Oe = Math.max(pe, ge + (ee ? J : 0) + re + z),
              Je = he + Oe;
            a.style.height = Je + 'px';
          } else {
            const ee = H.length > 0 && w === H[0].ref.current;
            a.style.top = '0px';
            const Oe = Math.max(V, X + v.offsetTop + (ee ? W : 0) + ge) + me;
            ((a.style.height = Oe + 'px'), (v.scrollTop = he - V + v.offsetTop));
          }
          ((a.style.margin = `${Yt}px 0`),
            (a.style.minHeight = A + 'px'),
            (a.style.maxHeight = $ + 'px'),
            r == null || r(),
            requestAnimationFrame(() => (m.current = !0)));
        }
      }, [h, o.trigger, o.valueNode, a, u, v, w, x, o.dir, r]);
    Ue(() => y(), [y]);
    const [b, C] = d.useState();
    Ue(() => {
      u && C(window.getComputedStyle(u).zIndex);
    }, [u]);
    const k = d.useCallback(
      N => {
        N && S.current === !0 && (y(), g == null || g(), (S.current = !1));
      },
      [y, g]
    );
    return l.jsx(aI, {
      scope: n,
      contentWrapper: a,
      shouldExpandOnScrollRef: m,
      onScrollButtonChange: k,
      children: l.jsx('div', {
        ref: c,
        style: { display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: b },
        children: l.jsx(te.div, { ...s, ref: p, style: { boxSizing: 'border-box', maxHeight: '100%', ...s.style } }),
      }),
    });
  });
f1.displayName = oI;
var iI = 'SelectPopperPosition',
  Gd = d.forwardRef((e, t) => {
    const { __scopeSelect: n, align: r = 'start', collisionPadding: s = Yt, ...o } = e,
      i = Mc(n);
    return l.jsx(vp, {
      ...i,
      ...o,
      ref: t,
      align: r,
      collisionPadding: s,
      style: {
        boxSizing: 'border-box',
        ...o.style,
        '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    });
  });
Gd.displayName = iI;
var [aI, Ip] = zo(fs, {}),
  Kd = 'SelectViewport',
  p1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, nonce: r, ...s } = e,
      o = Lr(Kd, n),
      i = Ip(Kd, n),
      a = ye(t, o.onViewportChange),
      c = d.useRef(0);
    return l.jsxs(l.Fragment, {
      children: [
        l.jsx('style', {
          dangerouslySetInnerHTML: {
            __html:
              '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
          },
          nonce: r,
        }),
        l.jsx(Ic.Slot, {
          scope: n,
          children: l.jsx(te.div, {
            'data-radix-select-viewport': '',
            role: 'presentation',
            ...s,
            ref: a,
            style: { position: 'relative', flex: 1, overflow: 'hidden auto', ...s.style },
            onScroll: U(s.onScroll, u => {
              const f = u.currentTarget,
                { contentWrapper: p, shouldExpandOnScrollRef: h } = i;
              if (h != null && h.current && p) {
                const m = Math.abs(c.current - f.scrollTop);
                if (m > 0) {
                  const S = window.innerHeight - Yt * 2,
                    v = parseFloat(p.style.minHeight),
                    w = parseFloat(p.style.height),
                    x = Math.max(v, w);
                  if (x < S) {
                    const g = x + m,
                      y = Math.min(S, g),
                      b = g - y;
                    ((p.style.height = y + 'px'),
                      p.style.bottom === '0px' && ((f.scrollTop = b > 0 ? b : 0), (p.style.justifyContent = 'flex-end')));
                  }
                }
              }
              c.current = f.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
p1.displayName = Kd;
var h1 = 'SelectGroup',
  [lI, cI] = zo(h1),
  uI = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      s = bn();
    return l.jsx(lI, { scope: n, id: s, children: l.jsx(te.div, { role: 'group', 'aria-labelledby': s, ...r, ref: t }) });
  });
uI.displayName = h1;
var m1 = 'SelectLabel',
  g1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      s = cI(m1, n);
    return l.jsx(te.div, { id: s.id, ...r, ref: t });
  });
g1.displayName = m1;
var Ll = 'SelectItem',
  [dI, v1] = zo(Ll),
  y1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, value: r, disabled: s = !1, textValue: o, ...i } = e,
      a = Or(Ll, n),
      c = Lr(Ll, n),
      u = a.value === r,
      [f, p] = d.useState(o ?? ''),
      [h, m] = d.useState(!1),
      S = ye(t, g => {
        var y;
        return (y = c.itemRefCallback) == null ? void 0 : y.call(c, g, r, s);
      }),
      v = bn(),
      w = d.useRef('touch'),
      x = () => {
        s || (a.onValueChange(r), a.onOpenChange(!1));
      };
    if (r === '')
      throw new Error(
        'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.'
      );
    return l.jsx(dI, {
      scope: n,
      value: r,
      disabled: s,
      textId: v,
      isSelected: u,
      onItemTextChange: d.useCallback(g => {
        p(y => y || ((g == null ? void 0 : g.textContent) ?? '').trim());
      }, []),
      children: l.jsx(Ic.ItemSlot, {
        scope: n,
        value: r,
        disabled: s,
        textValue: f,
        children: l.jsx(te.div, {
          role: 'option',
          'aria-labelledby': v,
          'data-highlighted': h ? '' : void 0,
          'aria-selected': u && h,
          'data-state': u ? 'checked' : 'unchecked',
          'aria-disabled': s || void 0,
          'data-disabled': s ? '' : void 0,
          tabIndex: s ? void 0 : -1,
          ...i,
          ref: S,
          onFocus: U(i.onFocus, () => m(!0)),
          onBlur: U(i.onBlur, () => m(!1)),
          onClick: U(i.onClick, () => {
            w.current !== 'mouse' && x();
          }),
          onPointerUp: U(i.onPointerUp, () => {
            w.current === 'mouse' && x();
          }),
          onPointerDown: U(i.onPointerDown, g => {
            w.current = g.pointerType;
          }),
          onPointerMove: U(i.onPointerMove, g => {
            var y;
            ((w.current = g.pointerType),
              s ? (y = c.onItemLeave) == null || y.call(c) : w.current === 'mouse' && g.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: U(i.onPointerLeave, g => {
            var y;
            g.currentTarget === document.activeElement && ((y = c.onItemLeave) == null || y.call(c));
          }),
          onKeyDown: U(i.onKeyDown, g => {
            var b;
            (((b = c.searchRef) == null ? void 0 : b.current) !== '' && g.key === ' ') ||
              (qR.includes(g.key) && x(), g.key === ' ' && g.preventDefault());
          }),
        }),
      }),
    });
  });
y1.displayName = Ll;
var ii = 'SelectItemText',
  x1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, className: r, style: s, ...o } = e,
      i = Or(ii, n),
      a = Lr(ii, n),
      c = v1(ii, n),
      u = eI(ii, n),
      [f, p] = d.useState(null),
      h = ye(
        t,
        x => p(x),
        c.onItemTextChange,
        x => {
          var g;
          return (g = a.itemTextRefCallback) == null ? void 0 : g.call(a, x, c.value, c.disabled);
        }
      ),
      m = f == null ? void 0 : f.textContent,
      S = d.useMemo(() => l.jsx('option', { value: c.value, disabled: c.disabled, children: m }, c.value), [c.disabled, c.value, m]),
      { onNativeOptionAdd: v, onNativeOptionRemove: w } = u;
    return (
      Ue(() => (v(S), () => w(S)), [v, w, S]),
      l.jsxs(l.Fragment, {
        children: [
          l.jsx(te.span, { id: c.textId, ...o, ref: h }),
          c.isSelected && i.valueNode && !i.valueNodeHasChildren ? ys.createPortal(o.children, i.valueNode) : null,
        ],
      })
    );
  });
x1.displayName = ii;
var w1 = 'SelectItemIndicator',
  S1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return v1(w1, n).isSelected ? l.jsx(te.span, { 'aria-hidden': !0, ...r, ref: t }) : null;
  });
S1.displayName = w1;
var Zd = 'SelectScrollUpButton',
  b1 = d.forwardRef((e, t) => {
    const n = Lr(Zd, e.__scopeSelect),
      r = Ip(Zd, e.__scopeSelect),
      [s, o] = d.useState(!1),
      i = ye(t, r.onScrollButtonChange);
    return (
      Ue(() => {
        if (n.viewport && n.isPositioned) {
          let a = function () {
            const u = c.scrollTop > 0;
            o(u);
          };
          const c = n.viewport;
          return (a(), c.addEventListener('scroll', a), () => c.removeEventListener('scroll', a));
        }
      }, [n.viewport, n.isPositioned]),
      s
        ? l.jsx(E1, {
            ...e,
            ref: i,
            onAutoScroll: () => {
              const { viewport: a, selectedItem: c } = n;
              a && c && (a.scrollTop = a.scrollTop - c.offsetHeight);
            },
          })
        : null
    );
  });
b1.displayName = Zd;
var Qd = 'SelectScrollDownButton',
  C1 = d.forwardRef((e, t) => {
    const n = Lr(Qd, e.__scopeSelect),
      r = Ip(Qd, e.__scopeSelect),
      [s, o] = d.useState(!1),
      i = ye(t, r.onScrollButtonChange);
    return (
      Ue(() => {
        if (n.viewport && n.isPositioned) {
          let a = function () {
            const u = c.scrollHeight - c.clientHeight,
              f = Math.ceil(c.scrollTop) < u;
            o(f);
          };
          const c = n.viewport;
          return (a(), c.addEventListener('scroll', a), () => c.removeEventListener('scroll', a));
        }
      }, [n.viewport, n.isPositioned]),
      s
        ? l.jsx(E1, {
            ...e,
            ref: i,
            onAutoScroll: () => {
              const { viewport: a, selectedItem: c } = n;
              a && c && (a.scrollTop = a.scrollTop + c.offsetHeight);
            },
          })
        : null
    );
  });
C1.displayName = Qd;
var E1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, onAutoScroll: r, ...s } = e,
      o = Lr('SelectScrollButton', n),
      i = d.useRef(null),
      a = Ac(n),
      c = d.useCallback(() => {
        i.current !== null && (window.clearInterval(i.current), (i.current = null));
      }, []);
    return (
      d.useEffect(() => () => c(), [c]),
      Ue(() => {
        var f;
        const u = a().find(p => p.ref.current === document.activeElement);
        (f = u == null ? void 0 : u.ref.current) == null || f.scrollIntoView({ block: 'nearest' });
      }, [a]),
      l.jsx(te.div, {
        'aria-hidden': !0,
        ...s,
        ref: t,
        style: { flexShrink: 0, ...s.style },
        onPointerDown: U(s.onPointerDown, () => {
          i.current === null && (i.current = window.setInterval(r, 50));
        }),
        onPointerMove: U(s.onPointerMove, () => {
          var u;
          ((u = o.onItemLeave) == null || u.call(o), i.current === null && (i.current = window.setInterval(r, 50)));
        }),
        onPointerLeave: U(s.onPointerLeave, () => {
          c();
        }),
      })
    );
  }),
  fI = 'SelectSeparator',
  N1 = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return l.jsx(te.div, { 'aria-hidden': !0, ...r, ref: t });
  });
N1.displayName = fI;
var qd = 'SelectArrow',
  pI = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      s = Mc(n),
      o = Or(qd, n),
      i = Lr(qd, n);
    return o.open && i.position === 'popper' ? l.jsx(yp, { ...s, ...r, ref: t }) : null;
  });
pI.displayName = qd;
var hI = 'SelectBubbleInput',
  k1 = d.forwardRef(({ __scopeSelect: e, value: t, ...n }, r) => {
    const s = d.useRef(null),
      o = ye(r, s),
      i = Q0(t);
    return (
      d.useEffect(() => {
        const a = s.current;
        if (!a) return;
        const c = window.HTMLSelectElement.prototype,
          f = Object.getOwnPropertyDescriptor(c, 'value').set;
        if (i !== t && f) {
          const p = new Event('change', { bubbles: !0 });
          (f.call(a, t), a.dispatchEvent(p));
        }
      }, [i, t]),
      l.jsx(te.select, { ...n, style: { ...nx, ...n.style }, ref: o, defaultValue: t })
    );
  });
k1.displayName = hI;
function _1(e) {
  return e === '' || e === void 0;
}
function P1(e) {
  const t = dt(e),
    n = d.useRef(''),
    r = d.useRef(0),
    s = d.useCallback(
      i => {
        const a = n.current + i;
        (t(a),
          (function c(u) {
            ((n.current = u), window.clearTimeout(r.current), u !== '' && (r.current = window.setTimeout(() => c(''), 1e3)));
          })(a));
      },
      [t]
    ),
    o = d.useCallback(() => {
      ((n.current = ''), window.clearTimeout(r.current));
    }, []);
  return (d.useEffect(() => () => window.clearTimeout(r.current), []), [n, s, o]);
}
function j1(e, t, n) {
  const s = t.length > 1 && Array.from(t).every(u => u === t[0]) ? t[0] : t,
    o = n ? e.indexOf(n) : -1;
  let i = mI(e, Math.max(o, 0));
  s.length === 1 && (i = i.filter(u => u !== n));
  const c = i.find(u => u.textValue.toLowerCase().startsWith(s.toLowerCase()));
  return c !== n ? c : void 0;
}
function mI(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var gI = n1,
  T1 = s1,
  vI = i1,
  yI = a1,
  xI = l1,
  R1 = c1,
  wI = p1,
  I1 = g1,
  A1 = y1,
  SI = x1,
  bI = S1,
  M1 = b1,
  O1 = C1,
  L1 = N1;
const Yd = gI,
  Xd = vI,
  Dl = d.forwardRef(({ className: e, children: t, ...n }, r) =>
    l.jsxs(T1, {
      ref: r,
      className: ne(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        e
      ),
      ...n,
      children: [t, l.jsx(yI, { asChild: !0, children: l.jsx(Nx, { className: 'h-4 w-4 opacity-50' }) })],
    })
  );
Dl.displayName = T1.displayName;
const D1 = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(M1, {
    ref: n,
    className: ne('flex cursor-default items-center justify-center py-1', e),
    ...t,
    children: l.jsx(TN, { className: 'h-4 w-4' }),
  })
);
D1.displayName = M1.displayName;
const F1 = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(O1, {
    ref: n,
    className: ne('flex cursor-default items-center justify-center py-1', e),
    ...t,
    children: l.jsx(Nx, { className: 'h-4 w-4' }),
  })
);
F1.displayName = O1.displayName;
const Fl = d.forwardRef(({ className: e, children: t, position: n = 'popper', ...r }, s) =>
  l.jsx(xI, {
    children: l.jsxs(R1, {
      ref: s,
      className: ne(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        n === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        e
      ),
      position: n,
      ...r,
      children: [
        l.jsx(D1, {}),
        l.jsx(wI, {
          className: ne('p-1', n === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'),
          children: t,
        }),
        l.jsx(F1, {}),
      ],
    }),
  })
);
Fl.displayName = R1.displayName;
const CI = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(I1, { ref: n, className: ne('py-1.5 pl-8 pr-2 text-sm font-semibold', e), ...t })
);
CI.displayName = I1.displayName;
const Lt = d.forwardRef(({ className: e, children: t, ...n }, r) =>
  l.jsxs(A1, {
    ref: r,
    className: ne(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    ...n,
    children: [
      l.jsx('span', {
        className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: l.jsx(bI, { children: l.jsx(El, { className: 'h-4 w-4' }) }),
      }),
      l.jsx(SI, { children: t }),
    ],
  })
);
Lt.displayName = A1.displayName;
const EI = d.forwardRef(({ className: e, ...t }, n) => l.jsx(L1, { ref: n, className: ne('-mx-1 my-1 h-px bg-muted', e), ...t }));
EI.displayName = L1.displayName;
var Oc = 'Tabs',
  [NI, _M] = At(Oc, [Nc]),
  $1 = Nc(),
  [kI, Ap] = NI(Oc),
  z1 = d.forwardRef((e, t) => {
    const {
        __scopeTabs: n,
        value: r,
        onValueChange: s,
        defaultValue: o,
        orientation: i = 'horizontal',
        dir: a,
        activationMode: c = 'automatic',
        ...u
      } = e,
      f = Cc(a),
      [p, h] = kr({ prop: r, onChange: s, defaultProp: o ?? '', caller: Oc });
    return l.jsx(kI, {
      scope: n,
      baseId: bn(),
      value: p,
      onValueChange: h,
      orientation: i,
      dir: f,
      activationMode: c,
      children: l.jsx(te.div, { dir: f, 'data-orientation': i, ...u, ref: t }),
    });
  });
z1.displayName = Oc;
var V1 = 'TabsList',
  U1 = d.forwardRef((e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...s } = e,
      o = Ap(V1, n),
      i = $1(n);
    return l.jsx(Bw, {
      asChild: !0,
      ...i,
      orientation: o.orientation,
      dir: o.dir,
      loop: r,
      children: l.jsx(te.div, { role: 'tablist', 'aria-orientation': o.orientation, ...s, ref: t }),
    });
  });
U1.displayName = V1;
var B1 = 'TabsTrigger',
  W1 = d.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, disabled: s = !1, ...o } = e,
      i = Ap(B1, n),
      a = $1(n),
      c = K1(i.baseId, r),
      u = Z1(i.baseId, r),
      f = r === i.value;
    return l.jsx(Ww, {
      asChild: !0,
      ...a,
      focusable: !s,
      active: f,
      children: l.jsx(te.button, {
        type: 'button',
        role: 'tab',
        'aria-selected': f,
        'aria-controls': u,
        'data-state': f ? 'active' : 'inactive',
        'data-disabled': s ? '' : void 0,
        disabled: s,
        id: c,
        ...o,
        ref: t,
        onMouseDown: U(e.onMouseDown, p => {
          !s && p.button === 0 && p.ctrlKey === !1 ? i.onValueChange(r) : p.preventDefault();
        }),
        onKeyDown: U(e.onKeyDown, p => {
          [' ', 'Enter'].includes(p.key) && i.onValueChange(r);
        }),
        onFocus: U(e.onFocus, () => {
          const p = i.activationMode !== 'manual';
          !f && !s && p && i.onValueChange(r);
        }),
      }),
    });
  });
W1.displayName = B1;
var H1 = 'TabsContent',
  G1 = d.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, forceMount: s, children: o, ...i } = e,
      a = Ap(H1, n),
      c = K1(a.baseId, r),
      u = Z1(a.baseId, r),
      f = r === a.value,
      p = d.useRef(f);
    return (
      d.useEffect(() => {
        const h = requestAnimationFrame(() => (p.current = !1));
        return () => cancelAnimationFrame(h);
      }, []),
      l.jsx(un, {
        present: s || f,
        children: ({ present: h }) =>
          l.jsx(te.div, {
            'data-state': f ? 'active' : 'inactive',
            'data-orientation': a.orientation,
            role: 'tabpanel',
            'aria-labelledby': c,
            hidden: !h,
            id: u,
            tabIndex: 0,
            ...i,
            ref: t,
            style: { ...e.style, animationDuration: p.current ? '0s' : void 0 },
            children: h && o,
          }),
      })
    );
  });
G1.displayName = H1;
function K1(e, t) {
  return `${e}-trigger-${t}`;
}
function Z1(e, t) {
  return `${e}-content-${t}`;
}
var _I = z1,
  Q1 = U1,
  q1 = W1,
  Y1 = G1;
const X1 = _I,
  Mp = d.forwardRef(({ className: e, ...t }, n) =>
    l.jsx(Q1, {
      ref: n,
      className: ne('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', e),
      ...t,
    })
  );
Mp.displayName = Q1.displayName;
const Zr = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(q1, {
    ref: n,
    className: ne(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      e
    ),
    ...t,
  })
);
Zr.displayName = q1.displayName;
const Qr = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(Y1, {
    ref: n,
    className: ne(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      e
    ),
    ...t,
  })
);
Qr.displayName = Y1.displayName;
var Lc = 'Dialog',
  [J1, PM] = At(Lc),
  [PI, dn] = J1(Lc),
  eS = e => {
    const { __scopeDialog: t, children: n, open: r, defaultOpen: s, onOpenChange: o, modal: i = !0 } = e,
      a = d.useRef(null),
      c = d.useRef(null),
      [u, f] = kr({ prop: r, defaultProp: s ?? !1, onChange: o, caller: Lc });
    return l.jsx(PI, {
      scope: t,
      triggerRef: a,
      contentRef: c,
      contentId: bn(),
      titleId: bn(),
      descriptionId: bn(),
      open: u,
      onOpenChange: f,
      onOpenToggle: d.useCallback(() => f(p => !p), [f]),
      modal: i,
      children: n,
    });
  };
eS.displayName = Lc;
var tS = 'DialogTrigger',
  jI = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = dn(tS, n),
      o = ye(t, s.triggerRef);
    return l.jsx(te.button, {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': s.open,
      'aria-controls': s.contentId,
      'data-state': Dp(s.open),
      ...r,
      ref: o,
      onClick: U(e.onClick, s.onOpenToggle),
    });
  });
jI.displayName = tS;
var Op = 'DialogPortal',
  [TI, nS] = J1(Op, { forceMount: void 0 }),
  rS = e => {
    const { __scopeDialog: t, forceMount: n, children: r, container: s } = e,
      o = dn(Op, t);
    return l.jsx(TI, {
      scope: t,
      forceMount: n,
      children: d.Children.map(r, i =>
        l.jsx(un, { present: n || o.open, children: l.jsx(ea, { asChild: !0, container: s, children: i }) })
      ),
    });
  };
rS.displayName = Op;
var $l = 'DialogOverlay',
  sS = d.forwardRef((e, t) => {
    const n = nS($l, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...s } = e,
      o = dn($l, e.__scopeDialog);
    return o.modal ? l.jsx(un, { present: r || o.open, children: l.jsx(II, { ...s, ref: t }) }) : null;
  });
sS.displayName = $l;
var RI = cs('DialogOverlay.RemoveScroll'),
  II = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = dn($l, n);
    return l.jsx(_c, {
      as: RI,
      allowPinchZoom: !0,
      shards: [s.contentRef],
      children: l.jsx(te.div, { 'data-state': Dp(s.open), ...r, ref: t, style: { pointerEvents: 'auto', ...r.style } }),
    });
  }),
  ps = 'DialogContent',
  oS = d.forwardRef((e, t) => {
    const n = nS(ps, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...s } = e,
      o = dn(ps, e.__scopeDialog);
    return l.jsx(un, { present: r || o.open, children: o.modal ? l.jsx(AI, { ...s, ref: t }) : l.jsx(MI, { ...s, ref: t }) });
  });
oS.displayName = ps;
var AI = d.forwardRef((e, t) => {
    const n = dn(ps, e.__scopeDialog),
      r = d.useRef(null),
      s = ye(t, n.contentRef, r);
    return (
      d.useEffect(() => {
        const o = r.current;
        if (o) return Ep(o);
      }, []),
      l.jsx(iS, {
        ...e,
        ref: s,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: U(e.onCloseAutoFocus, o => {
          var i;
          (o.preventDefault(), (i = n.triggerRef.current) == null || i.focus());
        }),
        onPointerDownOutside: U(e.onPointerDownOutside, o => {
          const i = o.detail.originalEvent,
            a = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || a) && o.preventDefault();
        }),
        onFocusOutside: U(e.onFocusOutside, o => o.preventDefault()),
      })
    );
  }),
  MI = d.forwardRef((e, t) => {
    const n = dn(ps, e.__scopeDialog),
      r = d.useRef(!1),
      s = d.useRef(!1);
    return l.jsx(iS, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: o => {
        var i, a;
        ((i = e.onCloseAutoFocus) == null || i.call(e, o),
          o.defaultPrevented || (r.current || (a = n.triggerRef.current) == null || a.focus(), o.preventDefault()),
          (r.current = !1),
          (s.current = !1));
      },
      onInteractOutside: o => {
        var c, u;
        ((c = e.onInteractOutside) == null || c.call(e, o),
          o.defaultPrevented || ((r.current = !0), o.detail.originalEvent.type === 'pointerdown' && (s.current = !0)));
        const i = o.target;
        (((u = n.triggerRef.current) == null ? void 0 : u.contains(i)) && o.preventDefault(),
          o.detail.originalEvent.type === 'focusin' && s.current && o.preventDefault());
      },
    });
  }),
  iS = d.forwardRef((e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: s, onCloseAutoFocus: o, ...i } = e,
      a = dn(ps, n),
      c = d.useRef(null),
      u = ye(t, c);
    return (
      Cp(),
      l.jsxs(l.Fragment, {
        children: [
          l.jsx(Ec, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: s,
            onUnmountAutoFocus: o,
            children: l.jsx(Ao, {
              role: 'dialog',
              id: a.contentId,
              'aria-describedby': a.descriptionId,
              'aria-labelledby': a.titleId,
              'data-state': Dp(a.open),
              ...i,
              ref: u,
              onDismiss: () => a.onOpenChange(!1),
            }),
          }),
          l.jsxs(l.Fragment, {
            children: [l.jsx(OI, { titleId: a.titleId }), l.jsx(DI, { contentRef: c, descriptionId: a.descriptionId })],
          }),
        ],
      })
    );
  }),
  Lp = 'DialogTitle',
  aS = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = dn(Lp, n);
    return l.jsx(te.h2, { id: s.titleId, ...r, ref: t });
  });
aS.displayName = Lp;
var lS = 'DialogDescription',
  cS = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = dn(lS, n);
    return l.jsx(te.p, { id: s.descriptionId, ...r, ref: t });
  });
cS.displayName = lS;
var uS = 'DialogClose',
  dS = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = dn(uS, n);
    return l.jsx(te.button, { type: 'button', ...r, ref: t, onClick: U(e.onClick, () => s.onOpenChange(!1)) });
  });
dS.displayName = uS;
function Dp(e) {
  return e ? 'open' : 'closed';
}
var fS = 'DialogTitleWarning',
  [jM, pS] = ME(fS, { contentName: ps, titleName: Lp, docsSlug: 'dialog' }),
  OI = ({ titleId: e }) => {
    const t = pS(fS),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      d.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  LI = 'DialogDescriptionWarning',
  DI = ({ contentRef: e, descriptionId: t }) => {
    const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${pS(LI).contentName}}.`;
    return (
      d.useEffect(() => {
        var o;
        const s = (o = e.current) == null ? void 0 : o.getAttribute('aria-describedby');
        t && s && (document.getElementById(t) || console.warn(r));
      }, [r, e, t]),
      null
    );
  },
  FI = eS,
  $I = rS,
  hS = sS,
  mS = oS,
  gS = aS,
  vS = cS,
  zI = dS;
const yS = FI,
  VI = $I,
  xS = d.forwardRef(({ className: e, ...t }, n) =>
    l.jsx(hS, {
      ref: n,
      className: ne(
        'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        e
      ),
      ...t,
    })
  );
xS.displayName = hS.displayName;
const Fp = d.forwardRef(({ className: e, children: t, ...n }, r) =>
  l.jsxs(VI, {
    children: [
      l.jsx(xS, {}),
      l.jsxs(mS, {
        ref: r,
        className: ne(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          e
        ),
        ...n,
        children: [
          t,
          l.jsxs(zI, {
            className:
              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground min-h-[44px] min-w-[44px] flex items-center justify-center',
            'aria-label': 'Close dialog',
            children: [l.jsx(na, { className: 'h-4 w-4' }), l.jsx('span', { className: 'sr-only', children: 'Close' })],
          }),
        ],
      }),
    ],
  })
);
Fp.displayName = mS.displayName;
const $p = ({ className: e, ...t }) => l.jsx('div', { className: ne('flex flex-col space-y-1.5 text-center sm:text-left', e), ...t });
$p.displayName = 'DialogHeader';
const wS = ({ className: e, ...t }) =>
  l.jsx('div', { className: ne('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', e), ...t });
wS.displayName = 'DialogFooter';
const zp = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(gS, { ref: n, className: ne('text-lg font-semibold leading-none tracking-tight', e), ...t })
);
zp.displayName = gS.displayName;
const Vp = d.forwardRef(({ className: e, ...t }, n) => l.jsx(vS, { ref: n, className: ne('text-sm text-muted-foreground', e), ...t }));
Vp.displayName = vS.displayName;
class UI {
  sendLog(t, n, r, s) {
    if (window.electronAPI) {
      const o = { category: n, message: r, data: s, level: t, timestamp: Date.now() };
      window.electronAPI.send('frontend-log', o);
    } else {
      const o = `[${new Date().toISOString()}] [${t.toUpperCase()}] [${n}]`,
        i = s ? `${o} ${r}` : `${o} ${r}`;
      switch (t) {
        case 'error':
          console.error(i, s || '');
          break;
        case 'warn':
          console.warn(i, s || '');
          break;
        case 'info':
        case 'debug':
        default:
          console.log(i, s || '');
      }
    }
  }
  debug(t, n, r) {
    this.sendLog('debug', t, n, r);
  }
  info(t, n, r) {
    this.sendLog('info', t, n, r);
  }
  warn(t, n, r) {
    this.sendLog('warn', t, n, r);
  }
  error(t, n, r) {
    this.sendLog('error', t, n, r);
  }
  componentLog(t, n, r) {
    this.info(`COMPONENT:${t}`, n, r);
  }
  uiLog(t, n) {
    this.info('UI', t, n);
  }
  stateLog(t, n, r) {
    this.info(`STATE:${t}`, n, r);
  }
  ipcLog(t, n) {
    this.info('IPC:FRONTEND', t, n);
  }
  networkLog(t, n) {
    this.info('NETWORK', t, n);
  }
  userActionLog(t, n) {
    this.info('USER_ACTION', t, n);
  }
}
const de = new UI();
function BI({ open: e, onOpenChange: t }) {
  const [n, r] = d.useState(''),
    [s, o] = d.useState(!0),
    [i, a] = d.useState('unlimited'),
    [c, u] = d.useState('80'),
    [f, p] = d.useState('1920x1080'),
    [h, m] = d.useState(!1),
    [S, v] = d.useState(!1);
  d.useEffect(() => {
    window.electronAPI &&
      (window.electronAPI.send('get-directories'),
      window.electronAPI.receiveOnce('get-directories', y => {
        y != null && y.status && r(y.directories.launcherInstallPath);
      }));
  }, []);
  const w = () => {
      window.electronAPI &&
        (window.electronAPI.send('open-directory-dialog'),
        window.electronAPI.receiveOnce('directory-selected', y => {
          y && r(y);
        }));
    },
    x = () => {
      (de.userActionLog('Settings saved', {
        installPath: n,
        autoUpdate: s,
        downloadLimit: i,
        soundVolume: c,
        resolution: f,
        fullscreen: h,
        controllerEnabled: S,
      }),
        t(!1));
    },
    g = () => {
      (window.electronAPI
        ? (window.electronAPI.send('get-directories'),
          window.electronAPI.receiveOnce('get-directories', y => {
            y != null && y.status ? r(y.directories.launcherInstallPath) : r('');
          }))
        : r(''),
        o(!0),
        a('unlimited'),
        u('80'),
        p('1920x1080'),
        m(!1),
        v(!1));
    };
  return l.jsx(yS, {
    open: e,
    onOpenChange: t,
    children: l.jsxs(Fp, {
      className: 'max-w-2xl max-h-[80vh] overflow-y-auto',
      children: [
        l.jsxs($p, {
          children: [
            l.jsxs(zp, { className: 'flex items-center gap-2', children: [l.jsx(Pd, { className: 'w-5 h-5' }), 'Launcher Settings'] }),
            l.jsx(Vp, { children: 'Configure your Manic Miners launcher preferences' }),
          ],
        }),
        l.jsxs(X1, {
          defaultValue: 'general',
          className: 'mt-4',
          children: [
            l.jsxs(Mp, {
              className: 'grid w-full grid-cols-4',
              children: [
                l.jsxs(Zr, {
                  value: 'general',
                  className: 'flex items-center gap-2',
                  children: [l.jsx(Pd, { className: 'w-4 h-4' }), 'General'],
                }),
                l.jsxs(Zr, {
                  value: 'downloads',
                  className: 'flex items-center gap-2',
                  children: [l.jsx(Js, { className: 'w-4 h-4' }), 'Downloads'],
                }),
                l.jsxs(Zr, {
                  value: 'display',
                  className: 'flex items-center gap-2',
                  children: [l.jsx($N, { className: 'w-4 h-4' }), 'Display'],
                }),
                l.jsxs(Zr, {
                  value: 'input',
                  className: 'flex items-center gap-2',
                  children: [l.jsx(MN, { className: 'w-4 h-4' }), 'Input'],
                }),
              ],
            }),
            l.jsxs('div', {
              className: 'min-h-[300px]',
              children: [
                l.jsxs(Qr, {
                  value: 'general',
                  className: 'space-y-4 mt-6',
                  children: [
                    l.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        l.jsx(Xn, { htmlFor: 'install-path', children: 'Installation Path' }),
                        l.jsxs('div', {
                          className: 'flex gap-2',
                          children: [
                            l.jsx(Hd, { id: 'install-path', value: n, onChange: y => r(y.target.value), className: 'flex-1' }),
                            l.jsxs(Ne, { variant: 'outline', onClick: w, children: [l.jsx(AN, { className: 'w-4 h-4 mr-2' }), 'Browse'] }),
                          ],
                        }),
                      ],
                    }),
                    l.jsxs('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        l.jsxs('div', {
                          className: 'space-y-0.5',
                          children: [
                            l.jsx(Xn, { children: 'Auto-update Game' }),
                            l.jsx('p', {
                              className: 'text-sm text-muted-foreground',
                              children: 'Automatically download and install game updates',
                            }),
                          ],
                        }),
                        l.jsx(Ja, { checked: s, onCheckedChange: o }),
                      ],
                    }),
                  ],
                }),
                l.jsx(Qr, {
                  value: 'downloads',
                  className: 'space-y-4 mt-6',
                  children: l.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      l.jsx(Xn, { htmlFor: 'download-limit', children: 'Download Speed Limit' }),
                      l.jsxs(Yd, {
                        value: i,
                        onValueChange: a,
                        children: [
                          l.jsx(Dl, { children: l.jsx(Xd, {}) }),
                          l.jsxs(Fl, {
                            children: [
                              l.jsx(Lt, { value: 'unlimited', children: 'Unlimited' }),
                              l.jsx(Lt, { value: '1mb', children: '1 MB/s' }),
                              l.jsx(Lt, { value: '5mb', children: '5 MB/s' }),
                              l.jsx(Lt, { value: '10mb', children: '10 MB/s' }),
                              l.jsx(Lt, { value: '25mb', children: '25 MB/s' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                l.jsxs(Qr, {
                  value: 'display',
                  className: 'space-y-4 mt-6',
                  children: [
                    l.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        l.jsx(Xn, { htmlFor: 'sound-volume', children: 'Master Volume' }),
                        l.jsxs('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            l.jsx(Hd, {
                              id: 'sound-volume',
                              type: 'range',
                              min: '0',
                              max: '100',
                              value: c,
                              onChange: y => u(y.target.value),
                              className: 'flex-1',
                            }),
                            l.jsxs('span', { className: 'text-sm text-muted-foreground w-12', children: [c, '%'] }),
                          ],
                        }),
                      ],
                    }),
                    l.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        l.jsx(Xn, { htmlFor: 'resolution', children: 'Resolution' }),
                        l.jsxs(Yd, {
                          value: f,
                          onValueChange: p,
                          children: [
                            l.jsx(Dl, { children: l.jsx(Xd, {}) }),
                            l.jsxs(Fl, {
                              children: [
                                l.jsx(Lt, { value: '1920x1080', children: '1920 x 1080 (Full HD)' }),
                                l.jsx(Lt, { value: '2560x1440', children: '2560 x 1440 (2K)' }),
                                l.jsx(Lt, { value: '3840x2160', children: '3840 x 2160 (4K)' }),
                                l.jsx(Lt, { value: '1366x768', children: '1366 x 768' }),
                                l.jsx(Lt, { value: '1280x720', children: '1280 x 720 (HD)' }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    l.jsxs('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        l.jsxs('div', {
                          className: 'space-y-0.5',
                          children: [
                            l.jsx(Xn, { children: 'Fullscreen Mode' }),
                            l.jsx('p', { className: 'text-sm text-muted-foreground', children: 'Launch game in fullscreen by default' }),
                          ],
                        }),
                        l.jsx(Ja, { checked: h, onCheckedChange: m }),
                      ],
                    }),
                  ],
                }),
                l.jsx(Qr, {
                  value: 'input',
                  className: 'space-y-4 mt-6',
                  children: l.jsxs('div', {
                    className: 'flex items-center justify-between',
                    children: [
                      l.jsxs('div', {
                        className: 'space-y-0.5',
                        children: [
                          l.jsx(Xn, { children: 'Controller Support' }),
                          l.jsx('p', { className: 'text-sm text-muted-foreground', children: 'Enable gamepad/controller input' }),
                        ],
                      }),
                      l.jsx(Ja, { checked: S, onCheckedChange: v }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
        l.jsxs('div', {
          className: 'flex justify-between mt-6 pt-4 border-t',
          children: [
            l.jsx(Ne, { variant: 'outline', onClick: g, children: 'Reset to Defaults' }),
            l.jsxs('div', {
              className: 'flex gap-2',
              children: [
                l.jsx(Ne, { variant: 'outline', onClick: () => t(!1), children: 'Cancel' }),
                l.jsx(Ne, { onClick: x, children: 'Save Changes' }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function WI() {
  const [e, t] = d.useState(!1);
  return l.jsx('header', {
    className: 'sticky top-0 z-50 border-b border-border mining-surface drag-region',
    children: l.jsxs('div', {
      className: 'container mx-auto p-6',
      children: [
        l.jsx('div', {
          className: 'flex items-center justify-between mb-6',
          children: l.jsxs('div', {
            className: 'flex items-center gap-4',
            children: [
              l.jsxs('div', {
                className: 'flex items-center gap-3',
                children: [
                  l.jsx('div', {
                    className:
                      'w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center energy-glow',
                    children: l.jsx(As, { className: 'w-6 h-6 text-primary-foreground animate-pulse-energy' }),
                  }),
                  l.jsxs('div', {
                    children: [
                      l.jsx('h1', { className: 'text-2xl font-bold text-foreground', children: 'ManicMiners' }),
                      l.jsx('p', { className: 'text-sm text-muted-foreground', children: 'Game Launcher' }),
                    ],
                  }),
                ],
              }),
              l.jsx(br, { variant: 'outline', className: 'border-primary/50 text-primary', children: 'v2.1.3' }),
            ],
          }),
        }),
        l.jsx(VR, { onSettingsClick: () => t(!0) }),
        l.jsx(BI, { open: e, onOpenChange: t }),
      ],
    }),
  });
}
const We = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx('div', { ref: n, className: ne('rounded-lg border bg-card text-card-foreground shadow-sm', e), ...t })
);
We.displayName = 'Card';
const qe = d.forwardRef(({ className: e, ...t }, n) => l.jsx('div', { ref: n, className: ne('flex flex-col space-y-1.5 p-6', e), ...t }));
qe.displayName = 'CardHeader';
const ot = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx('h3', { ref: n, className: ne('text-2xl font-semibold leading-none tracking-tight', e), ...t })
);
ot.displayName = 'CardTitle';
const yt = d.forwardRef(({ className: e, ...t }, n) => l.jsx('p', { ref: n, className: ne('text-sm text-muted-foreground', e), ...t }));
yt.displayName = 'CardDescription';
const Ke = d.forwardRef(({ className: e, ...t }, n) => l.jsx('div', { ref: n, className: ne('p-6 pt-0', e), ...t }));
Ke.displayName = 'CardContent';
const HI = d.forwardRef(({ className: e, ...t }, n) => l.jsx('div', { ref: n, className: ne('flex items-center p-6 pt-0', e), ...t }));
HI.displayName = 'CardFooter';
function GI({ message: e, className: t = '' }) {
  return l.jsxs('div', {
    className: `flex items-center gap-2 text-sm text-destructive ${t}`,
    children: [l.jsx(Mo, { className: 'h-4 w-4' }), l.jsx('span', { children: e })],
  });
}
var KI = {};
const sg = !1,
  Nt = {
    API_BASE_URL: KI.VITE_API_BASE_URL || 'https://manic-launcher.vercel.app',
    API_ENDPOINTS: {
      URLS: '/api/urls',
      NEWS: '/api/news',
      COMMENTS: '/api/comments',
      LEVELS: '/api/levels',
      VIDEOS: '/api/videos',
      VERSIONS_ARCHIVED: '/api/versions/archived',
    },
    FEATURES: { SHOW_DEBUG_INFO: sg, ENABLE_ANALYTICS: !sg },
    TIMEOUTS: { API_REQUEST: 3e4, NOTIFICATION_AUTO_DISMISS: 5e3, RETRY_DELAY: 2e3, LONG_OPERATION: 12e4 },
    SIZES: { MAX_LOG_FILE_SIZE: 10 * 1024 * 1024, MIN_TOUCH_TARGET: 44 },
    CACHE: { ASSETS: 20 * 60 * 1e3, API_DATA: 5 * 60 * 1e3 },
  };
function bo(e) {
  return `${Nt.API_BASE_URL}${e}`;
}
class ZI {
  constructor() {
    Bo(this, 'cache', new Map());
    Bo(this, 'pendingRequests', new Map());
    Bo(this, 'cleanupInterval');
    this.cleanupInterval = setInterval(
      () => {
        this.cleanup();
      },
      5 * 60 * 1e3
    );
  }
  async get(t, n, r = Nt.CACHE.API_DATA) {
    const s = this.cache.get(t);
    if (s && this.isValid(s)) return (de.debug('CACHE', 'Cache hit', { key: t, age: Date.now() - s.timestamp }), s.data);
    const o = this.pendingRequests.get(t);
    if (o && this.isPendingValid(o)) return (de.debug('CACHE', 'Request deduplication', { key: t }), o.promise);
    de.debug('CACHE', 'Cache miss - fetching data', { key: t });
    const i = this.executeRequest(t, n, r);
    return (this.pendingRequests.set(t, { promise: i, timestamp: Date.now() }), i);
  }
  async executeRequest(t, n, r) {
    try {
      const s = await n();
      return (
        this.cache.set(t, { data: s, timestamp: Date.now(), ttl: r }),
        de.debug('CACHE', 'Data cached successfully', { key: t, ttl: r }),
        s
      );
    } catch (s) {
      throw (de.error('CACHE', 'Request failed', { key: t, error: s }), s);
    } finally {
      this.pendingRequests.delete(t);
    }
  }
  isValid(t) {
    return Date.now() - t.timestamp < t.ttl;
  }
  isPendingValid(t) {
    return Date.now() - t.timestamp < 3e4;
  }
  invalidate(t) {
    (this.cache.delete(t), this.pendingRequests.delete(t), de.debug('CACHE', 'Cache entry invalidated', { key: t }));
  }
  invalidatePattern(t) {
    const n = Array.from(this.cache.keys()).filter(r => t.test(r));
    (n.forEach(r => this.invalidate(r)), de.debug('CACHE', 'Cache pattern invalidated', { pattern: t.toString(), keys: n }));
  }
  clear() {
    (this.cache.clear(), this.pendingRequests.clear(), de.debug('CACHE', 'All cache cleared'));
  }
  cleanup() {
    let t = 0;
    for (const [n, r] of this.cache.entries()) this.isValid(r) || (this.cache.delete(n), t++);
    for (const [n, r] of this.pendingRequests.entries()) this.isPendingValid(r) || (this.pendingRequests.delete(n), t++);
    t > 0 && de.debug('CACHE', 'Cleanup completed', { cleaned: t, cacheSize: this.cache.size, pendingSize: this.pendingRequests.size });
  }
  getStats() {
    return {
      cacheSize: this.cache.size,
      pendingRequests: this.pendingRequests.size,
      entries: Array.from(this.cache.entries()).map(([t, n]) => ({
        key: t,
        age: Date.now() - n.timestamp,
        ttl: n.ttl,
        isValid: this.isValid(n),
      })),
    };
  }
  destroy() {
    (this.cleanupInterval && clearInterval(this.cleanupInterval), this.clear());
  }
}
const Ot = new ZI(),
  Vr = {
    urls: () => 'api:urls',
    news: () => 'api:news',
    comments: () => 'api:comments',
    levels: () => 'api:levels',
    videos: () => 'api:videos',
    versions: (e = 'archived') => `api:versions:${e}`,
    images: () => 'api:images',
  };
class Pu extends Error {
  constructor(t, n, r) {
    (super(n), (this.status = t), (this.endpoint = r), (this.name = 'ApiError'));
  }
}
async function Ur(e, t) {
  const n = bo(e);
  try {
    const r = await fetch(n, { ...t, headers: { 'Content-Type': 'application/json', ...(t == null ? void 0 : t.headers) } });
    if (!r.ok) throw new Pu(r.status, `API request failed: ${r.statusText}`, e);
    return await r.json();
  } catch (r) {
    throw r instanceof Pu
      ? (de.error('API', `API Error: ${r.message}`, { status: r.status, endpoint: r.endpoint }), r)
      : (de.error('API', 'Network error', { endpoint: e, error: r }), new Pu(0, 'Network error - please check your connection', e));
  }
}
const QI = {
    async getUrls() {
      return Ot.get(Vr.urls(), () => Ur(Nt.API_ENDPOINTS.URLS), 20 * 60 * 1e3);
    },
    async getNews() {
      return Ot.get(Vr.news(), () => Ur(Nt.API_ENDPOINTS.NEWS), 5 * 60 * 1e3);
    },
    async getComments() {
      return Ot.get(Vr.comments(), () => Ur(Nt.API_ENDPOINTS.COMMENTS), 2 * 60 * 1e3);
    },
    async getLevels() {
      return Ot.get(Vr.levels(), () => Ur(Nt.API_ENDPOINTS.LEVELS), 10 * 60 * 1e3);
    },
    async getVideos() {
      return Ot.get(Vr.videos(), () => Ur(Nt.API_ENDPOINTS.VIDEOS), 15 * 60 * 1e3);
    },
    async getArchivedVersions() {
      return Ot.get(Vr.versions('archived'), () => Ur(Nt.API_ENDPOINTS.VERSIONS_ARCHIVED), 5 * 60 * 1e3);
    },
    async getImages() {
      return Ot.get(Vr.images(), () => Ur('/api/images'), 15 * 60 * 1e3);
    },
    cache: {
      invalidate: e => Ot.invalidate(e),
      invalidateNews: () => Ot.invalidatePattern(/^api:news/),
      invalidateVersions: () => Ot.invalidatePattern(/^api:versions/),
      clear: () => Ot.clear(),
      getStats: () => Ot.getStats(),
    },
  },
  qI = { Website: ON, Discord: _x, Reddit: WN, YouTube: Li, Facebook: IN, FAQ: kx, Email: DN },
  YI = D.memo(function () {
    const [t, n] = d.useState(null),
      [r, s] = d.useState(null);
    return (
      d.useEffect(() => {
        QI.getUrls()
          .then(o => n(o))
          .catch(o => {
            s('Failed to load social links');
          });
      }, []),
      !t && !r
        ? null
        : r
          ? l.jsx('footer', {
              className: 'border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
              children: l.jsx('div', {
                className: 'container mx-auto px-6 py-3',
                children: l.jsx(GI, { message: r, className: 'justify-center' }),
              }),
            })
          : t
            ? l.jsx('footer', {
                className: 'border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
                children: l.jsx('div', {
                  className: 'container mx-auto px-6 py-3',
                  children: l.jsxs('div', {
                    className: 'flex items-center justify-center gap-6',
                    children: [
                      Object.entries(t)
                        .filter(([o]) => !o.includes('Email') && o !== 'GameHomePage')
                        .map(([o, i]) => {
                          const a = qI[o];
                          return l.jsxs(
                            'a',
                            {
                              href: i,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              onClick: c => {
                                var u;
                                if ((c.preventDefault(), (u = window.electronAPI) != null && u.openExternal))
                                  try {
                                    window.electronAPI.openExternal(i);
                                  } catch (f) {
                                    (logger.error('Footer', 'Error calling openExternal', { error: f }),
                                      window.open(i, '_blank', 'noopener,noreferrer'));
                                  }
                                else window.open(i, '_blank', 'noopener,noreferrer');
                              },
                              className: 'flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm',
                              title: o,
                              children: [l.jsx(a, { className: 'w-4 h-4' }), l.jsx('span', { className: 'hidden sm:inline', children: o })],
                            },
                            o
                          );
                        }),
                      l.jsxs(Lw, {
                        to: '/faq',
                        className: 'flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm',
                        title: 'FAQ',
                        children: [l.jsx(kx, { className: 'w-4 h-4' }), l.jsx('span', { className: 'hidden sm:inline', children: 'FAQ' })],
                      }),
                    ],
                  }),
                }),
              })
            : null
    );
  });
var Up = 'Progress',
  Bp = 100,
  [XI, TM] = At(Up),
  [JI, eA] = XI(Up),
  SS = d.forwardRef((e, t) => {
    const { __scopeProgress: n, value: r = null, max: s, getValueLabel: o = tA, ...i } = e;
    (s || s === 0) && !og(s) && console.error(nA(`${s}`, 'Progress'));
    const a = og(s) ? s : Bp;
    r !== null && !ig(r, a) && console.error(rA(`${r}`, 'Progress'));
    const c = ig(r, a) ? r : null,
      u = zl(c) ? o(c, a) : void 0;
    return l.jsx(JI, {
      scope: n,
      value: c,
      max: a,
      children: l.jsx(te.div, {
        'aria-valuemax': a,
        'aria-valuemin': 0,
        'aria-valuenow': zl(c) ? c : void 0,
        'aria-valuetext': u,
        role: 'progressbar',
        'data-state': ES(c, a),
        'data-value': c ?? void 0,
        'data-max': a,
        ...i,
        ref: t,
      }),
    });
  });
SS.displayName = Up;
var bS = 'ProgressIndicator',
  CS = d.forwardRef((e, t) => {
    const { __scopeProgress: n, ...r } = e,
      s = eA(bS, n);
    return l.jsx(te.div, { 'data-state': ES(s.value, s.max), 'data-value': s.value ?? void 0, 'data-max': s.max, ...r, ref: t });
  });
CS.displayName = bS;
function tA(e, t) {
  return `${Math.round((e / t) * 100)}%`;
}
function ES(e, t) {
  return e == null ? 'indeterminate' : e === t ? 'complete' : 'loading';
}
function zl(e) {
  return typeof e == 'number';
}
function og(e) {
  return zl(e) && !isNaN(e) && e > 0;
}
function ig(e, t) {
  return zl(e) && !isNaN(e) && e <= t && e >= 0;
}
function nA(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Bp}\`.`;
}
function rA(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Bp} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var NS = SS,
  sA = CS;
const kS = d.forwardRef(({ className: e, value: t, ...n }, r) =>
  l.jsx(NS, {
    ref: r,
    className: ne('relative h-4 w-full overflow-hidden rounded-full bg-primary/20', e),
    ...n,
    children: l.jsx(sA, {
      className: 'h-full w-full flex-1 bg-primary transition-all',
      style: { transform: `translateX(-${100 - (t || 0)}%)` },
    }),
  })
);
kS.displayName = NS.displayName;
function oA({ notifications: e, onDismiss: t }) {
  const n = (s, o) => {
      switch (s) {
        case 'download':
          return o !== void 0 && o >= 100
            ? l.jsx(js, { className: 'w-5 h-5 text-primary' })
            : l.jsx(Js, { className: 'w-5 h-5 text-primary animate-pulse' });
        case 'verify':
          return o !== void 0 && o >= 100
            ? l.jsx(js, { className: 'w-5 h-5 text-primary' })
            : l.jsx(VN, { className: 'w-5 h-5 text-primary animate-pulse' });
        case 'reinstall':
          return o !== void 0 && o >= 100
            ? l.jsx(js, { className: 'w-5 h-5 text-primary' })
            : l.jsx(Nl, { className: 'w-5 h-5 text-primary animate-spin' });
        case 'delete':
          return o !== void 0 && o >= 100
            ? l.jsx(js, { className: 'w-5 h-5 text-primary' })
            : l.jsx(kl, { className: 'w-5 h-5 text-destructive animate-pulse' });
        case 'repair':
          return o !== void 0 && o >= 100
            ? l.jsx(js, { className: 'w-5 h-5 text-primary' })
            : l.jsx(Nl, { className: 'w-5 h-5 text-primary animate-spin' });
        case 'info':
          return l.jsx(op, { className: 'w-5 h-5 text-blue-500' });
        case 'success':
          return l.jsx(js, { className: 'w-5 h-5 text-green-500' });
        case 'error':
          return l.jsx(gm, { className: 'w-5 h-5 text-red-500' });
        case 'warning':
          return l.jsx(Mo, { className: 'w-5 h-5 text-yellow-500' });
        default:
          return l.jsx(gm, { className: 'w-5 h-5' });
      }
    },
    r = e.filter(s => s.isActive !== !1);
  return r.length === 0
    ? null
    : l.jsx('div', {
        className: 'fixed top-44 right-4 z-50 space-y-3 w-[600px]',
        children: r.map(s =>
          l.jsxs(
            We,
            {
              className:
                'group mining-surface energy-glow p-4 shadow-lg border border-primary/20 animate-slide-in-right hover:border-primary/40 transition-colors',
              children: [
                l.jsxs('div', {
                  className: 'flex items-start justify-between mb-3',
                  children: [
                    l.jsxs('div', {
                      className: 'flex items-center gap-2',
                      children: [
                        n(s.type, s.progress),
                        l.jsx('h4', { className: 'font-medium text-secondary-foreground', children: s.title }),
                      ],
                    }),
                    l.jsx(Ne, {
                      variant: 'ghost',
                      size: 'sm',
                      onClick: () => t(s.id),
                      className: `min-h-[44px] min-w-[44px] h-11 w-11 p-0 transition-opacity ${(s.progress !== void 0 && s.progress >= 100) || ['success', 'error', 'warning', 'info'].includes(s.type) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`,
                      'aria-label': 'Dismiss notification',
                      children: l.jsx(na, { className: 'w-5 h-5' }),
                    }),
                  ],
                }),
                l.jsxs('div', {
                  className: 'space-y-2',
                  children: [
                    s.message && l.jsx('div', { className: 'text-sm text-muted-foreground', children: s.message }),
                    s.fileName && l.jsx('div', { className: 'text-xs text-muted-foreground font-mono', children: s.fileName }),
                    s.fileSize && l.jsx('div', { className: 'text-xs text-muted-foreground', children: s.fileSize }),
                    s.progress !== void 0 &&
                      l.jsxs('div', {
                        className: 'space-y-1',
                        children: [
                          l.jsxs('div', {
                            className: 'flex justify-between text-xs',
                            children: [
                              l.jsxs('span', {
                                className: `font-medium ${s.type === 'delete' ? 'text-destructive' : 'text-primary'}`,
                                children: [s.progress.toFixed(1), '% complete'],
                              }),
                              s.speed && l.jsx('span', { className: 'text-muted-foreground', children: s.speed }),
                            ],
                          }),
                          l.jsx(kS, { value: s.progress, className: 'h-2' }),
                          s.eta &&
                            s.type === 'download' &&
                            l.jsxs('div', { className: 'text-xs text-muted-foreground', children: ['ETA: ', s.eta] }),
                        ],
                      }),
                    s.status && l.jsx('div', { className: 'text-xs text-muted-foreground italic', children: s.status }),
                    s.timestamp &&
                      !s.status &&
                      l.jsx('div', { className: 'text-xs text-muted-foreground', children: new Date(s.timestamp).toLocaleTimeString() }),
                  ],
                }),
              ],
            },
            s.id
          )
        ),
      });
}
function iA({
  open: e,
  onOpenChange: t,
  title: n,
  description: r,
  confirmText: s = 'Confirm',
  cancelText: o = 'Cancel',
  variant: i = 'default',
  onConfirm: a,
  icon: c,
}) {
  const u = () => {
    (a(), t(!1));
  };
  return l.jsx(yS, {
    open: e,
    onOpenChange: t,
    children: l.jsxs(Fp, {
      className: 'sm:max-w-[425px]',
      children: [
        l.jsx($p, {
          children: l.jsxs('div', {
            className: 'flex items-center gap-3',
            children: [
              c ||
                (i === 'destructive' &&
                  l.jsx('div', {
                    className: 'flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20',
                    children: l.jsx(Mo, { className: 'h-5 w-5 text-red-600 dark:text-red-400' }),
                  })),
              l.jsx('div', { className: 'flex-1', children: l.jsx(zp, { className: 'text-left', children: n }) }),
              l.jsx(Ne, {
                variant: 'ghost',
                size: 'icon',
                className: 'min-h-[44px] min-w-[44px] h-11 w-11',
                onClick: () => t(!1),
                'aria-label': 'Close dialog',
                children: l.jsx(na, { className: 'h-5 w-5' }),
              }),
            ],
          }),
        }),
        l.jsx(Vp, { className: 'text-left text-sm text-muted-foreground', children: r }),
        l.jsxs(wS, {
          className: 'flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
          children: [
            l.jsx(Ne, { variant: 'outline', onClick: () => t(!1), className: 'mt-3 sm:mt-0', children: o }),
            l.jsx(Ne, { variant: i, onClick: u, className: 'w-full sm:w-auto', children: s }),
          ],
        }),
      ],
    }),
  });
}
const mt = Nt.API_BASE_URL;
let ju = null;
function _S() {
  const [e, t] = d.useState({}),
    [n, r] = d.useState(!0),
    [s, o] = d.useState(null);
  return (
    d.useEffect(() => {
      async function a() {
        if (ju) {
          (t(ju), r(!1));
          return;
        }
        try {
          const c = await fetch(bo('/api/images'));
          if (!c.ok) throw new Error(`HTTP error! status: ${c.status}`);
          const u = await c.json(),
            f = {};
          for (const [h, m] of Object.entries(u.images)) f[h] = m.cloudinaryUrl || m.internalUrl;
          const p = {
            'manic-miners.png': 'manic-miners-basic.png',
            'manic-miners-alt.png': 'manic-miners-alt-icon.png',
            'manic-miners.ico': 'manic-miners-basic.ico',
            'manic-miners-alt.ico': 'manic-miners-alt-icon.ico',
            'manic-miners-lms.png': 'manic-miners-level-editor.png',
            'manic-miners-supportstation.png': 'manic-miners-combat.png',
            'manic-miners-teleportstation.png': 'manic-miners-combat.png',
            'manic-miners-toolstore.png': 'manic-miners-combat.png',
          };
          for (const [h, m] of Object.entries(p)) u.images[m] && (f[h] = u.images[m].cloudinaryUrl || u.images[m].internalUrl);
          ((ju = f), t(f));
        } catch (c) {
          (console.error('Failed to fetch assets:', c), o(c instanceof Error ? c.message : 'Failed to load assets'));
          const u = {
            'manic-miners-background.jpg': `${mt}/images/manic-miners-background.jpg`,
            'manic-miners.png': `${mt}/images/manic-miners-basic.png`,
            'manic-miners-lms.png': `${mt}/images/manic-miners-level-editor.png`,
            'manic-miners-supportstation.png': `${mt}/images/manic-miners-combat.png`,
            'manic-miners-teleportstation.png': `${mt}/images/manic-miners-combat.png`,
            'manic-miners-toolstore.png': `${mt}/images/manic-miners-combat.png`,
            'manic-miners-cover-image.png': `${mt}/images/manic-miners-cover-image.png`,
            'manic-miners-alt.png': `${mt}/images/manic-miners-alt-icon.png`,
            'manic-miners-favicon.ico': `${mt}/images/manic-miners-basic.ico`,
            'manic-miners.ico': `${mt}/images/manic-miners-basic.ico`,
            'manic-miners-alt.ico': `${mt}/images/manic-miners-alt-icon.ico`,
            'intro-video.mp4': `${mt}/intro-video.mp4`,
            'success.mp3': `${mt}/success.mp3`,
          };
          t(u);
        } finally {
          r(!1);
        }
      }
      a();
    }, []),
    { assets: e, getAssetUrl: a => (e[a] ? e[a] : `${mt}/images/${a}`), loading: n, error: s }
  );
}
function aA({ onNotificationUpdate: e, removeNotification: t }) {
  const { getAssetUrl: n } = _S(),
    [r, s] = d.useState(!1),
    [o, i] = d.useState(!1),
    [a, c] = d.useState(!1),
    [u, f] = d.useState(!1),
    [p, h] = d.useState(!0),
    [m, S] = d.useState(!1),
    [v, w] = d.useState(!1),
    [x, g] = d.useState(!1),
    [y, b] = d.useState(!1),
    [C, k] = d.useState({
      version: 'latest',
      title: 'ManicMiners',
      displayName: 'Manic Miners (Latest)',
      releaseDate: 'Current',
      size: '~1.0 GB',
      sizeInBytes: 1073741824,
      description: 'Latest stable release with bug fixes and performance improvements.',
      experimental: !1,
      coverImage: n('manic-miners-cover-image.png'),
    }),
    [N, P] = d.useState(!1),
    T = d.useCallback(() => {
      if (!window.electronAPI) {
        (h(!1), s(Math.random() > 0.5));
        return;
      }
      let I = 0;
      const z = 3,
        _ = 5e3,
        E = () => {
          de.componentLog('LatestVersionManager', `Checking installation status (attempt ${I + 1}/${z})`);
          let A = !1;
          const Z = V => {
            if (((A = !0), h(!1), V != null && V.versions)) {
              const pe = 'latest',
                ge = V.versions.find(F => F.identifier === pe && F.directory);
              (s(!!ge),
                de.stateLog('LatestVersionManager', 'Installation check result', { isInstalled: !!ge, identifier: pe }),
                window.electronAPI.removeAllListeners('request-latest-version-information'));
            } else
              V != null && V.error
                ? (de.error('LatestVersionManager', 'Version check error', { error: V.error }), J())
                : (de.warn('LatestVersionManager', 'No versions data in response, retrying...'), J());
          };
          (window.electronAPI.receive('request-latest-version-information', Z),
            window.electronAPI.send('request-latest-version-information'));
          const W = setTimeout(() => {
              A ||
                (de.warn('LatestVersionManager', 'Request timed out, retrying...'),
                window.electronAPI.removeAllListeners('request-latest-version-information'),
                J());
            }, _),
            J = () => {
              (clearTimeout(W),
                I++,
                I < z
                  ? setTimeout(E, _)
                  : (de.warn('LatestVersionManager', 'Max retries reached, assuming not installed'),
                    h(!1),
                    s(!1),
                    window.electronAPI.removeAllListeners('request-latest-version-information')));
            };
        };
      E();
    }, [C.version]);
  (d.useEffect(
    () => (
      T(),
      () => {
        window.electronAPI && window.electronAPI.removeAllListeners('request-latest-version-information');
      }
    ),
    [T]
  ),
    d.useEffect(() => {
      if (window.electronAPI) {
        const I = () => {
          (de.info('LatestVersionManager', 'Versions updated, rechecking installation status'), h(!0), T());
        };
        return (
          window.electronAPI.receive('versions-updated', I),
          () => {
            window.electronAPI.removeAllListeners('versions-updated');
          }
        );
      }
    }, [T]));
  const R = async () => {
      if ((i(!0), window.electronAPI)) {
        window.electronAPI.send('download-latest-version', { version: 'latest' });
        const I = () => {
          window.electronAPI &&
            (window.electronAPI.removeAllListeners('download-latest-progress'),
            window.electronAPI.removeAllListeners('download-latest-error'));
        };
        (window.electronAPI.receive('download-latest-progress', z => {
          z.progress >= 100 && (i(!1), I());
        }),
          window.electronAPI.receive('download-latest-error', z => {
            (de.error('LatestVersionManager', 'Download error', { error: z }), i(!1), I());
          }));
      } else
        setTimeout(() => {
          (i(!1), s(!0));
        }, 2e3);
    },
    H = async () => {
      if ((c(!0), window.electronAPI)) {
        const I = 'latest';
        (de.userActionLog('Launch game', { identifier: I }), window.electronAPI.send('launch-game', I));
      }
      setTimeout(() => {
        c(!1);
      }, 2e3);
    },
    $ = async () => {
      if ((f(!0), window.electronAPI)) {
        const I = () => {
          window.electronAPI &&
            (window.electronAPI.removeAllListeners('verify-repair-progress'),
            window.electronAPI.removeAllListeners('verify-repair-error'),
            window.electronAPI.removeAllListeners('versions-updated'));
        };
        (window.electronAPI.receive('verify-repair-progress', z => {
          z.progress >= 100 && (f(!1), I());
        }),
          window.electronAPI.receive('verify-repair-error', z => {
            (de.error('LatestVersionManager', 'Verify error', { error: z }), f(!1), I());
          }),
          window.electronAPI.receive('versions-updated', () => {
            window.electronAPI.send('request-latest-version-information');
          }),
          window.electronAPI.send('verify-and-repair-installation', { version: 'latest' }));
      }
    },
    Y = async () => {
      g(!0);
      const I = {
        id: `update-${Date.now()}`,
        type: 'info',
        title: 'Update Started',
        message: 'Updating to the latest version...',
        timestamp: new Date().toISOString(),
        persistent: !0,
      };
      (e([I]),
        window.electronAPI &&
          (window.electronAPI.receive('update-progress', z => {
            if (z.progress >= 100) {
              (g(!1), window.electronAPI.removeAllListeners('update-progress'));
              const _ = {
                id: `update-success-${Date.now()}`,
                type: 'success',
                title: 'Update Complete',
                message: 'Game has been successfully updated to the latest version!',
                timestamp: new Date().toISOString(),
                persistent: !1,
              };
              e([_]);
            }
          }),
          window.electronAPI.receive('update-error', z => {
            (de.error('LatestVersionManager', 'Update error', { error: z }), g(!1));
            const _ = {
              id: `update-error-${Date.now()}`,
              type: 'error',
              title: 'Update Failed',
              message: `Failed to update: ${z.message || 'Unknown error'}`,
              timestamp: new Date().toISOString(),
              persistent: !0,
            };
            e([_]);
          }),
          window.electronAPI.receive('versions-updated', () => {
            window.electronAPI.send('request-latest-version-information');
          }),
          window.electronAPI.send('update-latest-version', { version: 'latest' })));
    },
    O = async () => {
      if ((w(!0), window.electronAPI)) {
        de.userActionLog('Delete latest version');
        const I = () => {
          window.electronAPI &&
            (window.electronAPI.removeAllListeners('delete-latest-progress'), window.electronAPI.removeAllListeners('delete-latest-error'));
        };
        (window.electronAPI.receive('delete-latest-progress', z => {
          z.progress >= 100 &&
            setTimeout(() => {
              (w(!1), s(!1), I());
            }, 1e3);
        }),
          window.electronAPI.receive('delete-latest-error', z => {
            (de.error('LatestVersionManager', 'Delete error', { error: z }), w(!1), I());
          }),
          window.electronAPI.send('delete-latest-version', { version: 'latest' }));
      } else
        setTimeout(() => {
          (w(!1), s(!1));
        }, 2e3);
    },
    X = async () => {
      b(!0);
      const I = `shortcuts-${Date.now()}`,
        z = {
          id: I,
          type: 'info',
          title: 'Creating Shortcuts',
          message: 'Creating desktop and start menu shortcuts...',
          timestamp: new Date().toISOString(),
          persistent: !0,
        };
      if ((e([z]), window.electronAPI))
        try {
          de.userActionLog('Create shortcuts');
          const _ = () => {
            window.electronAPI &&
              (window.electronAPI.removeAllListeners('create-shortcuts-progress'),
              window.electronAPI.removeAllListeners('create-shortcuts-error'));
          };
          (window.electronAPI.receive('create-shortcuts-progress', E => {
            if (E.progress >= 100) {
              (b(!1), _(), t(I));
              const A = {
                id: `shortcuts-success-${Date.now()}`,
                type: 'success',
                title: 'Shortcuts Created',
                message: 'Desktop and start menu shortcuts have been created successfully!',
                timestamp: new Date().toISOString(),
                persistent: !1,
              };
              e([A]);
            }
          }),
            window.electronAPI.receive('create-shortcuts-error', E => {
              (b(!1), _(), t(I));
              const A = {
                id: `shortcuts-error-${Date.now()}`,
                type: 'error',
                title: 'Shortcut Creation Failed',
                message: `Failed to create shortcuts: ${E.message || 'Unknown error'}`,
                timestamp: new Date().toISOString(),
                persistent: !0,
              };
              e([A]);
            }),
            window.electronAPI.send('create-shortcuts', { options: { createExeShortcut: !0, createDirShortcut: !1 } }));
        } catch (_) {
          (de.error('LatestVersionManager', 'Error creating shortcuts', { error: _ }),
            b(!1),
            window.electronAPI.removeAllListeners('create-shortcuts-progress'),
            t(I));
          const E = {
            id: `shortcuts-error-${Date.now()}`,
            type: 'error',
            title: 'Shortcut Creation Failed',
            message: `Failed to create shortcuts: ${_.message || 'Unknown error'}`,
            timestamp: new Date().toISOString(),
            persistent: !0,
          };
          e([E]);
        }
      else
        setTimeout(() => {
          b(!1);
        }, 2e3);
    };
  return l.jsxs(l.Fragment, {
    children: [
      l.jsx(iA, {
        open: m,
        onOpenChange: S,
        title: 'Uninstall Latest Version',
        description: `Are you sure you want to uninstall ${C.displayName}? This will permanently remove all game files and you'll need to download them again to play.`,
        confirmText: 'Uninstall',
        cancelText: 'Cancel',
        variant: 'destructive',
        onConfirm: O,
        icon: l.jsx('div', {
          className: 'flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20',
          children: l.jsx(kl, { className: 'h-5 w-5 text-red-600 dark:text-red-400' }),
        }),
      }),
      l.jsxs(We, {
        className: 'w-full overflow-hidden',
        children: [
          C.coverImage &&
            l.jsxs('div', {
              className: 'relative h-40 w-full',
              children: [
                l.jsx('img', { src: C.coverImage, alt: C.title, className: 'h-full w-full object-cover' }),
                l.jsx('div', { className: 'absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent' }),
                l.jsx('div', {
                  className: 'absolute top-4 right-4',
                  children: p
                    ? l.jsxs(br, {
                        variant: 'outline',
                        className: 'flex items-center gap-1 bg-background/80 backdrop-blur-sm',
                        children: [l.jsx(Js, { className: 'w-3 h-3 animate-spin' }), 'Checking...'],
                      })
                    : r &&
                      !o &&
                      l.jsxs(br, {
                        variant: 'secondary',
                        className: 'flex items-center gap-1 bg-background/80 backdrop-blur-sm',
                        children: [l.jsx(El, { className: 'w-3 h-3' }), 'Installed'],
                      }),
                }),
              ],
            }),
          l.jsxs(qe, {
            className: 'space-y-1',
            children: [
              l.jsx('div', {
                className: 'flex items-start justify-between',
                children: l.jsxs('div', {
                  className: 'space-y-1',
                  children: [
                    l.jsx(ot, { className: 'text-2xl font-bold', children: C.title }),
                    l.jsxs('div', {
                      className: 'flex items-center gap-3 text-sm text-muted-foreground',
                      children: [
                        l.jsx(br, { variant: 'default', className: 'text-xs', children: 'LATEST' }),
                        l.jsxs('span', { children: ['Released ', C.releaseDate] }),
                        l.jsx('span', { children: '•' }),
                        l.jsx('span', { children: C.size }),
                      ],
                    }),
                  ],
                }),
              }),
              l.jsx(yt, { className: 'text-base mt-2', children: C.description }),
            ],
          }),
          l.jsxs(Ke, {
            className: 'space-y-4',
            children: [
              l.jsx('div', {
                className: 'space-y-3',
                children: p
                  ? l.jsxs(Ne, {
                      disabled: !0,
                      className: 'w-full',
                      size: 'lg',
                      children: [l.jsx(Js, { className: 'w-4 h-4 mr-2 animate-spin' }), 'Checking Installation...'],
                    })
                  : r
                    ? l.jsxs('div', {
                        className: 'space-y-2',
                        children: [
                          l.jsxs(Ne, {
                            onClick: H,
                            disabled: a || u || x,
                            className: 'w-full',
                            size: 'lg',
                            children: [l.jsx(Li, { className: 'w-5 h-5 mr-2' }), a ? 'Launching...' : 'Launch Game'],
                          }),
                          l.jsxs('div', {
                            className: 'grid grid-cols-2 gap-2',
                            children: [
                              l.jsxs(Ne, {
                                variant: 'outline',
                                size: 'sm',
                                onClick: Y,
                                disabled: o || u || v || a || x || y,
                                children: [l.jsx(Px, { className: 'w-4 h-4 mr-1' }), 'Update'],
                              }),
                              l.jsxs(Ne, {
                                variant: 'outline',
                                size: 'sm',
                                onClick: $,
                                disabled: o || u || v || a || x || y,
                                children: [l.jsx(Nl, { className: 'w-4 h-4 mr-1' }), 'Verify'],
                              }),
                              l.jsxs(Ne, {
                                variant: 'outline',
                                size: 'sm',
                                onClick: X,
                                disabled: o || u || v || a || x || y,
                                title: 'Create desktop and application shortcuts',
                                children: [l.jsx(Oi, { className: 'w-4 h-4 mr-1' }), y ? 'Creating...' : 'Shortcuts'],
                              }),
                              l.jsxs(Ne, {
                                variant: 'outline',
                                size: 'sm',
                                onClick: () => S(!0),
                                disabled: o || u || v || a || x || y,
                                className: 'text-destructive hover:text-destructive',
                                children: [l.jsx(kl, { className: 'w-4 h-4 mr-1' }), 'Uninstall'],
                              }),
                            ],
                          }),
                        ],
                      })
                    : l.jsxs(Ne, {
                        onClick: R,
                        disabled: o || u,
                        className: 'w-full',
                        size: 'lg',
                        children: [l.jsx(Js, { className: 'w-4 h-4 mr-2' }), o ? 'Installing...' : 'Install Game'],
                      }),
              }),
              r &&
                !p &&
                !o &&
                !u &&
                !x &&
                l.jsx('div', {
                  className: 'rounded-lg bg-green-500/10 border border-green-500/20 p-3',
                  children: l.jsxs('p', {
                    className: 'text-sm text-green-600 dark:text-green-400 flex items-center gap-2',
                    children: [l.jsx(El, { className: 'w-4 h-4' }), 'Ready to play! The latest version is installed and up to date.'],
                  }),
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
function lA() {
  const [e, t] = d.useState(null),
    [n, r] = d.useState(!0);
  d.useEffect(() => {
    (async () => {
      try {
        const c = (await (await fetch(bo(Nt.API_ENDPOINTS.VIDEOS))).json()).find(u => u.id === '1mQacGNeNVA');
        c && t(c.url);
      } catch (i) {
        (de.error('GameTrailer', 'Failed to fetch trailer', { error: i }), t('https://www.youtube.com/watch?v=1mQacGNeNVA'));
      } finally {
        r(!1);
      }
    })();
  }, []);
  const s = o => {
    var a;
    return `https://www.youtube.com/embed/${(a = o.split('v=')[1]) == null ? void 0 : a.split('&')[0]}`;
  };
  return n
    ? l.jsxs(We, {
        className: 'mining-surface',
        children: [
          l.jsxs(qe, {
            children: [
              l.jsxs(ot, {
                className: 'text-primary flex items-center gap-2',
                children: [l.jsx(Li, { className: 'w-5 h-5' }), 'Game Trailer'],
              }),
              l.jsx(yt, { className: 'text-muted-foreground', children: 'Watch the official launch trailer' }),
            ],
          }),
          l.jsx(Ke, {
            children: l.jsx('div', { className: 'animate-pulse', children: l.jsx('div', { className: 'h-48 bg-muted rounded-lg' }) }),
          }),
        ],
      })
    : e
      ? l.jsxs(We, {
          className: 'mining-surface',
          children: [
            l.jsxs(qe, {
              children: [
                l.jsxs(ot, {
                  className: 'text-primary flex items-center gap-2',
                  children: [l.jsx(Li, { className: 'w-5 h-5' }), 'Game Trailer'],
                }),
                l.jsx(yt, { className: 'text-muted-foreground', children: 'Watch the official launch trailer' }),
              ],
            }),
            l.jsx(Ke, {
              children: l.jsx('div', {
                className: 'relative aspect-video rounded-lg overflow-hidden bg-black',
                children: l.jsx('iframe', {
                  src: s(e),
                  title: 'Manic Miners Trailer',
                  className: 'w-full h-full',
                  frameBorder: '0',
                  allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                  allowFullScreen: !0,
                }),
              }),
            }),
          ],
        })
      : null;
}
var PS = { exports: {} },
  jS = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Co = d;
function cA(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var uA = typeof Object.is == 'function' ? Object.is : cA,
  dA = Co.useState,
  fA = Co.useEffect,
  pA = Co.useLayoutEffect,
  hA = Co.useDebugValue;
function mA(e, t) {
  var n = t(),
    r = dA({ inst: { value: n, getSnapshot: t } }),
    s = r[0].inst,
    o = r[1];
  return (
    pA(
      function () {
        ((s.value = n), (s.getSnapshot = t), Tu(s) && o({ inst: s }));
      },
      [e, n, t]
    ),
    fA(
      function () {
        return (
          Tu(s) && o({ inst: s }),
          e(function () {
            Tu(s) && o({ inst: s });
          })
        );
      },
      [e]
    ),
    hA(n),
    n
  );
}
function Tu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !uA(e, n);
  } catch {
    return !0;
  }
}
function gA(e, t) {
  return t();
}
var vA = typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u' ? gA : mA;
jS.useSyncExternalStore = Co.useSyncExternalStore !== void 0 ? Co.useSyncExternalStore : vA;
PS.exports = jS;
var yA = PS.exports;
function xA() {
  return yA.useSyncExternalStore(
    wA,
    () => !0,
    () => !1
  );
}
function wA() {
  return () => {};
}
var Wp = 'Avatar',
  [SA, RM] = At(Wp),
  [bA, TS] = SA(Wp),
  RS = d.forwardRef((e, t) => {
    const { __scopeAvatar: n, ...r } = e,
      [s, o] = d.useState('idle');
    return l.jsx(bA, { scope: n, imageLoadingStatus: s, onImageLoadingStatusChange: o, children: l.jsx(te.span, { ...r, ref: t }) });
  });
RS.displayName = Wp;
var IS = 'AvatarImage',
  AS = d.forwardRef((e, t) => {
    const { __scopeAvatar: n, src: r, onLoadingStatusChange: s = () => {}, ...o } = e,
      i = TS(IS, n),
      a = CA(r, o),
      c = dt(u => {
        (s(u), i.onImageLoadingStatusChange(u));
      });
    return (
      Ue(() => {
        a !== 'idle' && c(a);
      }, [a, c]),
      a === 'loaded' ? l.jsx(te.img, { ...o, ref: t, src: r }) : null
    );
  });
AS.displayName = IS;
var MS = 'AvatarFallback',
  OS = d.forwardRef((e, t) => {
    const { __scopeAvatar: n, delayMs: r, ...s } = e,
      o = TS(MS, n),
      [i, a] = d.useState(r === void 0);
    return (
      d.useEffect(() => {
        if (r !== void 0) {
          const c = window.setTimeout(() => a(!0), r);
          return () => window.clearTimeout(c);
        }
      }, [r]),
      i && o.imageLoadingStatus !== 'loaded' ? l.jsx(te.span, { ...s, ref: t }) : null
    );
  });
OS.displayName = MS;
function ag(e, t) {
  return e ? (t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? 'loaded' : 'loading') : 'error') : 'idle';
}
function CA(e, { referrerPolicy: t, crossOrigin: n }) {
  const r = xA(),
    s = d.useRef(null),
    o = r ? (s.current || (s.current = new window.Image()), s.current) : null,
    [i, a] = d.useState(() => ag(o, e));
  return (
    Ue(() => {
      a(ag(o, e));
    }, [o, e]),
    Ue(() => {
      const c = p => () => {
        a(p);
      };
      if (!o) return;
      const u = c('loaded'),
        f = c('error');
      return (
        o.addEventListener('load', u),
        o.addEventListener('error', f),
        t && (o.referrerPolicy = t),
        typeof n == 'string' && (o.crossOrigin = n),
        () => {
          (o.removeEventListener('load', u), o.removeEventListener('error', f));
        }
      );
    }, [o, n, t]),
    i
  );
}
var LS = RS,
  DS = AS,
  FS = OS;
const $S = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(LS, { ref: n, className: ne('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', e), ...t })
);
$S.displayName = LS.displayName;
const zS = d.forwardRef(({ className: e, ...t }, n) => l.jsx(DS, { ref: n, className: ne('aspect-square h-full w-full', e), ...t }));
zS.displayName = DS.displayName;
const VS = d.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(FS, { ref: n, className: ne('flex h-full w-full items-center justify-center rounded-full bg-muted', e), ...t })
);
VS.displayName = FS.displayName;
var Se;
(function (e) {
  e.assertEqual = s => {};
  function t(s) {}
  e.assertIs = t;
  function n(s) {
    throw new Error();
  }
  ((e.assertNever = n),
    (e.arrayToEnum = s => {
      const o = {};
      for (const i of s) o[i] = i;
      return o;
    }),
    (e.getValidEnumValues = s => {
      const o = e.objectKeys(s).filter(a => typeof s[s[a]] != 'number'),
        i = {};
      for (const a of o) i[a] = s[a];
      return e.objectValues(i);
    }),
    (e.objectValues = s =>
      e.objectKeys(s).map(function (o) {
        return s[o];
      })),
    (e.objectKeys =
      typeof Object.keys == 'function'
        ? s => Object.keys(s)
        : s => {
            const o = [];
            for (const i in s) Object.prototype.hasOwnProperty.call(s, i) && o.push(i);
            return o;
          }),
    (e.find = (s, o) => {
      for (const i of s) if (o(i)) return i;
    }),
    (e.isInteger =
      typeof Number.isInteger == 'function'
        ? s => Number.isInteger(s)
        : s => typeof s == 'number' && Number.isFinite(s) && Math.floor(s) === s));
  function r(s, o = ' | ') {
    return s.map(i => (typeof i == 'string' ? `'${i}'` : i)).join(o);
  }
  ((e.joinValues = r), (e.jsonStringifyReplacer = (s, o) => (typeof o == 'bigint' ? o.toString() : o)));
})(Se || (Se = {}));
var lg;
(function (e) {
  e.mergeShapes = (t, n) => ({ ...t, ...n });
})(lg || (lg = {}));
const Q = Se.arrayToEnum([
    'string',
    'nan',
    'number',
    'integer',
    'float',
    'boolean',
    'date',
    'bigint',
    'symbol',
    'function',
    'undefined',
    'null',
    'array',
    'object',
    'unknown',
    'promise',
    'void',
    'never',
    'map',
    'set',
  ]),
  tr = e => {
    switch (typeof e) {
      case 'undefined':
        return Q.undefined;
      case 'string':
        return Q.string;
      case 'number':
        return Number.isNaN(e) ? Q.nan : Q.number;
      case 'boolean':
        return Q.boolean;
      case 'function':
        return Q.function;
      case 'bigint':
        return Q.bigint;
      case 'symbol':
        return Q.symbol;
      case 'object':
        return Array.isArray(e)
          ? Q.array
          : e === null
            ? Q.null
            : e.then && typeof e.then == 'function' && e.catch && typeof e.catch == 'function'
              ? Q.promise
              : typeof Map < 'u' && e instanceof Map
                ? Q.map
                : typeof Set < 'u' && e instanceof Set
                  ? Q.set
                  : typeof Date < 'u' && e instanceof Date
                    ? Q.date
                    : Q.object;
      default:
        return Q.unknown;
    }
  },
  L = Se.arrayToEnum([
    'invalid_type',
    'invalid_literal',
    'custom',
    'invalid_union',
    'invalid_union_discriminator',
    'invalid_enum_value',
    'unrecognized_keys',
    'invalid_arguments',
    'invalid_return_type',
    'invalid_date',
    'invalid_string',
    'too_small',
    'too_big',
    'invalid_intersection_types',
    'not_multiple_of',
    'not_finite',
  ]);
class kn extends Error {
  get errors() {
    return this.issues;
  }
  constructor(t) {
    (super(),
      (this.issues = []),
      (this.addIssue = r => {
        this.issues = [...this.issues, r];
      }),
      (this.addIssues = (r = []) => {
        this.issues = [...this.issues, ...r];
      }));
    const n = new.target.prototype;
    (Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : (this.__proto__ = n), (this.name = 'ZodError'), (this.issues = t));
  }
  format(t) {
    const n =
        t ||
        function (o) {
          return o.message;
        },
      r = { _errors: [] },
      s = o => {
        for (const i of o.issues)
          if (i.code === 'invalid_union') i.unionErrors.map(s);
          else if (i.code === 'invalid_return_type') s(i.returnTypeError);
          else if (i.code === 'invalid_arguments') s(i.argumentsError);
          else if (i.path.length === 0) r._errors.push(n(i));
          else {
            let a = r,
              c = 0;
            for (; c < i.path.length; ) {
              const u = i.path[c];
              (c === i.path.length - 1 ? ((a[u] = a[u] || { _errors: [] }), a[u]._errors.push(n(i))) : (a[u] = a[u] || { _errors: [] }),
                (a = a[u]),
                c++);
            }
          }
      };
    return (s(this), r);
  }
  static assert(t) {
    if (!(t instanceof kn)) throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, Se.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = n => n.message) {
    const n = {},
      r = [];
    for (const s of this.issues)
      if (s.path.length > 0) {
        const o = s.path[0];
        ((n[o] = n[o] || []), n[o].push(t(s)));
      } else r.push(t(s));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
kn.create = e => new kn(e);
const Jd = (e, t) => {
  let n;
  switch (e.code) {
    case L.invalid_type:
      e.received === Q.undefined ? (n = 'Required') : (n = `Expected ${e.expected}, received ${e.received}`);
      break;
    case L.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, Se.jsonStringifyReplacer)}`;
      break;
    case L.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${Se.joinValues(e.keys, ', ')}`;
      break;
    case L.invalid_union:
      n = 'Invalid input';
      break;
    case L.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${Se.joinValues(e.options)}`;
      break;
    case L.invalid_enum_value:
      n = `Invalid enum value. Expected ${Se.joinValues(e.options)}, received '${e.received}'`;
      break;
    case L.invalid_arguments:
      n = 'Invalid function arguments';
      break;
    case L.invalid_return_type:
      n = 'Invalid function return type';
      break;
    case L.invalid_date:
      n = 'Invalid date';
      break;
    case L.invalid_string:
      typeof e.validation == 'object'
        ? 'includes' in e.validation
          ? ((n = `Invalid input: must include "${e.validation.includes}"`),
            typeof e.validation.position == 'number' &&
              (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
          : 'startsWith' in e.validation
            ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
            : 'endsWith' in e.validation
              ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
              : Se.assertNever(e.validation)
        : e.validation !== 'regex'
          ? (n = `Invalid ${e.validation}`)
          : (n = 'Invalid');
      break;
    case L.too_small:
      e.type === 'array'
        ? (n = `Array must contain ${e.exact ? 'exactly' : e.inclusive ? 'at least' : 'more than'} ${e.minimum} element(s)`)
        : e.type === 'string'
          ? (n = `String must contain ${e.exact ? 'exactly' : e.inclusive ? 'at least' : 'over'} ${e.minimum} character(s)`)
          : e.type === 'number'
            ? (n = `Number must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${e.minimum}`)
            : e.type === 'bigint'
              ? (n = `Number must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${e.minimum}`)
              : e.type === 'date'
                ? (n = `Date must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(e.minimum))}`)
                : (n = 'Invalid input');
      break;
    case L.too_big:
      e.type === 'array'
        ? (n = `Array must contain ${e.exact ? 'exactly' : e.inclusive ? 'at most' : 'less than'} ${e.maximum} element(s)`)
        : e.type === 'string'
          ? (n = `String must contain ${e.exact ? 'exactly' : e.inclusive ? 'at most' : 'under'} ${e.maximum} character(s)`)
          : e.type === 'number'
            ? (n = `Number must be ${e.exact ? 'exactly' : e.inclusive ? 'less than or equal to' : 'less than'} ${e.maximum}`)
            : e.type === 'bigint'
              ? (n = `BigInt must be ${e.exact ? 'exactly' : e.inclusive ? 'less than or equal to' : 'less than'} ${e.maximum}`)
              : e.type === 'date'
                ? (n = `Date must be ${e.exact ? 'exactly' : e.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(e.maximum))}`)
                : (n = 'Invalid input');
      break;
    case L.custom:
      n = 'Invalid input';
      break;
    case L.invalid_intersection_types:
      n = 'Intersection results could not be merged';
      break;
    case L.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case L.not_finite:
      n = 'Number must be finite';
      break;
    default:
      ((n = t.defaultError), Se.assertNever(e));
  }
  return { message: n };
};
let EA = Jd;
function NA() {
  return EA;
}
const kA = e => {
  const { data: t, path: n, errorMaps: r, issueData: s } = e,
    o = [...n, ...(s.path || [])],
    i = { ...s, path: o };
  if (s.message !== void 0) return { ...s, path: o, message: s.message };
  let a = '';
  const c = r
    .filter(u => !!u)
    .slice()
    .reverse();
  for (const u of c) a = u(i, { data: t, defaultError: a }).message;
  return { ...s, path: o, message: a };
};
function B(e, t) {
  const n = NA(),
    r = kA({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, n, n === Jd ? void 0 : Jd].filter(s => !!s),
    });
  e.common.issues.push(r);
}
class Tt {
  constructor() {
    this.value = 'valid';
  }
  dirty() {
    this.value === 'valid' && (this.value = 'dirty');
  }
  abort() {
    this.value !== 'aborted' && (this.value = 'aborted');
  }
  static mergeArray(t, n) {
    const r = [];
    for (const s of n) {
      if (s.status === 'aborted') return se;
      (s.status === 'dirty' && t.dirty(), r.push(s.value));
    }
    return { status: t.value, value: r };
  }
  static async mergeObjectAsync(t, n) {
    const r = [];
    for (const s of n) {
      const o = await s.key,
        i = await s.value;
      r.push({ key: o, value: i });
    }
    return Tt.mergeObjectSync(t, r);
  }
  static mergeObjectSync(t, n) {
    const r = {};
    for (const s of n) {
      const { key: o, value: i } = s;
      if (o.status === 'aborted' || i.status === 'aborted') return se;
      (o.status === 'dirty' && t.dirty(),
        i.status === 'dirty' && t.dirty(),
        o.value !== '__proto__' && (typeof i.value < 'u' || s.alwaysSet) && (r[o.value] = i.value));
    }
    return { status: t.value, value: r };
  }
}
const se = Object.freeze({ status: 'aborted' }),
  ai = e => ({ status: 'dirty', value: e }),
  Ht = e => ({ status: 'valid', value: e }),
  cg = e => e.status === 'aborted',
  ug = e => e.status === 'dirty',
  Eo = e => e.status === 'valid',
  Vl = e => typeof Promise < 'u' && e instanceof Promise;
var q;
(function (e) {
  ((e.errToObj = t => (typeof t == 'string' ? { message: t } : t || {})),
    (e.toString = t => (typeof t == 'string' ? t : t == null ? void 0 : t.message)));
})(q || (q = {}));
class jr {
  constructor(t, n, r, s) {
    ((this._cachedPath = []), (this.parent = t), (this.data = n), (this._path = r), (this._key = s));
  }
  get path() {
    return (
      this._cachedPath.length ||
        (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const dg = (e, t) => {
  if (Eo(t)) return { success: !0, data: t.value };
  if (!e.common.issues.length) throw new Error('Validation failed but no issues detected.');
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const n = new kn(e.common.issues);
      return ((this._error = n), this._error);
    },
  };
};
function ce(e) {
  if (!e) return {};
  const { errorMap: t, invalid_type_error: n, required_error: r, description: s } = e;
  if (t && (n || r)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t
    ? { errorMap: t, description: s }
    : {
        errorMap: (i, a) => {
          const { message: c } = e;
          return i.code === 'invalid_enum_value'
            ? { message: c ?? a.defaultError }
            : typeof a.data > 'u'
              ? { message: c ?? r ?? a.defaultError }
              : i.code !== 'invalid_type'
                ? { message: a.defaultError }
                : { message: c ?? n ?? a.defaultError };
        },
        description: s,
      };
}
class xe {
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return tr(t.data);
  }
  _getOrReturnCtx(t, n) {
    return (
      n || {
        common: t.parent.common,
        data: t.data,
        parsedType: tr(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      }
    );
  }
  _processInputParams(t) {
    return {
      status: new Tt(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: tr(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      },
    };
  }
  _parseSync(t) {
    const n = this._parse(t);
    if (Vl(n)) throw new Error('Synchronous parse encountered promise.');
    return n;
  }
  _parseAsync(t) {
    const n = this._parse(t);
    return Promise.resolve(n);
  }
  parse(t, n) {
    const r = this.safeParse(t, n);
    if (r.success) return r.data;
    throw r.error;
  }
  safeParse(t, n) {
    const r = {
        common: { issues: [], async: (n == null ? void 0 : n.async) ?? !1, contextualErrorMap: n == null ? void 0 : n.errorMap },
        path: (n == null ? void 0 : n.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: tr(t),
      },
      s = this._parseSync({ data: t, path: r.path, parent: r });
    return dg(r, s);
  }
  '~validate'(t) {
    var r, s;
    const n = {
      common: { issues: [], async: !!this['~standard'].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: tr(t),
    };
    if (!this['~standard'].async)
      try {
        const o = this._parseSync({ data: t, path: [], parent: n });
        return Eo(o) ? { value: o.value } : { issues: n.common.issues };
      } catch (o) {
        ((s = (r = o == null ? void 0 : o.message) == null ? void 0 : r.toLowerCase()) != null &&
          s.includes('encountered') &&
          (this['~standard'].async = !0),
          (n.common = { issues: [], async: !0 }));
      }
    return this._parseAsync({ data: t, path: [], parent: n }).then(o => (Eo(o) ? { value: o.value } : { issues: n.common.issues }));
  }
  async parseAsync(t, n) {
    const r = await this.safeParseAsync(t, n);
    if (r.success) return r.data;
    throw r.error;
  }
  async safeParseAsync(t, n) {
    const r = {
        common: { issues: [], contextualErrorMap: n == null ? void 0 : n.errorMap, async: !0 },
        path: (n == null ? void 0 : n.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: tr(t),
      },
      s = this._parse({ data: t, path: r.path, parent: r }),
      o = await (Vl(s) ? s : Promise.resolve(s));
    return dg(r, o);
  }
  refine(t, n) {
    const r = s => (typeof n == 'string' || typeof n > 'u' ? { message: n } : typeof n == 'function' ? n(s) : n);
    return this._refinement((s, o) => {
      const i = t(s),
        a = () => o.addIssue({ code: L.custom, ...r(s) });
      return typeof Promise < 'u' && i instanceof Promise ? i.then(c => (c ? !0 : (a(), !1))) : i ? !0 : (a(), !1);
    });
  }
  refinement(t, n) {
    return this._refinement((r, s) => (t(r) ? !0 : (s.addIssue(typeof n == 'function' ? n(r, s) : n), !1)));
  }
  _refinement(t) {
    return new _o({ schema: this, typeName: oe.ZodEffects, effect: { type: 'refinement', refinement: t } });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  constructor(t) {
    ((this.spa = this.safeParseAsync),
      (this._def = t),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this['~standard'] = { version: 1, vendor: 'zod', validate: n => this['~validate'](n) }));
  }
  optional() {
    return Cr.create(this, this._def);
  }
  nullable() {
    return Po.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return En.create(this);
  }
  promise() {
    return Hl.create(this, this._def);
  }
  or(t) {
    return Bl.create([this, t], this._def);
  }
  and(t) {
    return Wl.create(this, t, this._def);
  }
  transform(t) {
    return new _o({ ...ce(this._def), schema: this, typeName: oe.ZodEffects, effect: { type: 'transform', transform: t } });
  }
  default(t) {
    const n = typeof t == 'function' ? t : () => t;
    return new nf({ ...ce(this._def), innerType: this, defaultValue: n, typeName: oe.ZodDefault });
  }
  brand() {
    return new QA({ typeName: oe.ZodBranded, type: this, ...ce(this._def) });
  }
  catch(t) {
    const n = typeof t == 'function' ? t : () => t;
    return new rf({ ...ce(this._def), innerType: this, catchValue: n, typeName: oe.ZodCatch });
  }
  describe(t) {
    const n = this.constructor;
    return new n({ ...this._def, description: t });
  }
  pipe(t) {
    return Hp.create(this, t);
  }
  readonly() {
    return sf.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const _A = /^c[^\s-]{8,}$/i,
  PA = /^[0-9a-z]+$/,
  jA = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  TA = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  RA = /^[a-z0-9_-]{21}$/i,
  IA = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  AA =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  MA = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  OA = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$';
let Ru;
const LA = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  DA =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  FA =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  $A =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  zA = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  VA = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  US =
    '((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
  UA = new RegExp(`^${US}$`);
function BS(e) {
  let t = '[0-5]\\d';
  e.precision ? (t = `${t}\\.\\d{${e.precision}}`) : e.precision == null && (t = `${t}(\\.\\d+)?`);
  const n = e.precision ? '+' : '?';
  return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function BA(e) {
  return new RegExp(`^${BS(e)}$`);
}
function WA(e) {
  let t = `${US}T${BS(e)}`;
  const n = [];
  return (n.push(e.local ? 'Z?' : 'Z'), e.offset && n.push('([+-]\\d{2}:?\\d{2})'), (t = `${t}(${n.join('|')})`), new RegExp(`^${t}$`));
}
function HA(e, t) {
  return !!(((t === 'v4' || !t) && LA.test(e)) || ((t === 'v6' || !t) && FA.test(e)));
}
function GA(e, t) {
  if (!IA.test(e)) return !1;
  try {
    const [n] = e.split('.');
    if (!n) return !1;
    const r = n
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(n.length + ((4 - (n.length % 4)) % 4), '='),
      s = JSON.parse(atob(r));
    return !(typeof s != 'object' || s === null || ('typ' in s && (s == null ? void 0 : s.typ) !== 'JWT') || !s.alg || (t && s.alg !== t));
  } catch {
    return !1;
  }
}
function KA(e, t) {
  return !!(((t === 'v4' || !t) && DA.test(e)) || ((t === 'v6' || !t) && $A.test(e)));
}
class fr extends xe {
  _parse(t) {
    if ((this._def.coerce && (t.data = String(t.data)), this._getType(t) !== Q.string)) {
      const o = this._getOrReturnCtx(t);
      return (B(o, { code: L.invalid_type, expected: Q.string, received: o.parsedType }), se);
    }
    const r = new Tt();
    let s;
    for (const o of this._def.checks)
      if (o.kind === 'min')
        t.data.length < o.value &&
          ((s = this._getOrReturnCtx(t, s)),
          B(s, { code: L.too_small, minimum: o.value, type: 'string', inclusive: !0, exact: !1, message: o.message }),
          r.dirty());
      else if (o.kind === 'max')
        t.data.length > o.value &&
          ((s = this._getOrReturnCtx(t, s)),
          B(s, { code: L.too_big, maximum: o.value, type: 'string', inclusive: !0, exact: !1, message: o.message }),
          r.dirty());
      else if (o.kind === 'length') {
        const i = t.data.length > o.value,
          a = t.data.length < o.value;
        (i || a) &&
          ((s = this._getOrReturnCtx(t, s)),
          i
            ? B(s, { code: L.too_big, maximum: o.value, type: 'string', inclusive: !0, exact: !0, message: o.message })
            : a && B(s, { code: L.too_small, minimum: o.value, type: 'string', inclusive: !0, exact: !0, message: o.message }),
          r.dirty());
      } else if (o.kind === 'email')
        MA.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)), B(s, { validation: 'email', code: L.invalid_string, message: o.message }), r.dirty());
      else if (o.kind === 'emoji')
        (Ru || (Ru = new RegExp(OA, 'u')),
          Ru.test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)), B(s, { validation: 'emoji', code: L.invalid_string, message: o.message }), r.dirty()));
      else if (o.kind === 'uuid')
        TA.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)), B(s, { validation: 'uuid', code: L.invalid_string, message: o.message }), r.dirty());
      else if (o.kind === 'nanoid')
        RA.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)), B(s, { validation: 'nanoid', code: L.invalid_string, message: o.message }), r.dirty());
      else if (o.kind === 'cuid')
        _A.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)), B(s, { validation: 'cuid', code: L.invalid_string, message: o.message }), r.dirty());
      else if (o.kind === 'cuid2')
        PA.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)), B(s, { validation: 'cuid2', code: L.invalid_string, message: o.message }), r.dirty());
      else if (o.kind === 'ulid')
        jA.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)), B(s, { validation: 'ulid', code: L.invalid_string, message: o.message }), r.dirty());
      else if (o.kind === 'url')
        try {
          new URL(t.data);
        } catch {
          ((s = this._getOrReturnCtx(t, s)), B(s, { validation: 'url', code: L.invalid_string, message: o.message }), r.dirty());
        }
      else
        o.kind === 'regex'
          ? ((o.regex.lastIndex = 0),
            o.regex.test(t.data) ||
              ((s = this._getOrReturnCtx(t, s)), B(s, { validation: 'regex', code: L.invalid_string, message: o.message }), r.dirty()))
          : o.kind === 'trim'
            ? (t.data = t.data.trim())
            : o.kind === 'includes'
              ? t.data.includes(o.value, o.position) ||
                ((s = this._getOrReturnCtx(t, s)),
                B(s, { code: L.invalid_string, validation: { includes: o.value, position: o.position }, message: o.message }),
                r.dirty())
              : o.kind === 'toLowerCase'
                ? (t.data = t.data.toLowerCase())
                : o.kind === 'toUpperCase'
                  ? (t.data = t.data.toUpperCase())
                  : o.kind === 'startsWith'
                    ? t.data.startsWith(o.value) ||
                      ((s = this._getOrReturnCtx(t, s)),
                      B(s, { code: L.invalid_string, validation: { startsWith: o.value }, message: o.message }),
                      r.dirty())
                    : o.kind === 'endsWith'
                      ? t.data.endsWith(o.value) ||
                        ((s = this._getOrReturnCtx(t, s)),
                        B(s, { code: L.invalid_string, validation: { endsWith: o.value }, message: o.message }),
                        r.dirty())
                      : o.kind === 'datetime'
                        ? WA(o).test(t.data) ||
                          ((s = this._getOrReturnCtx(t, s)),
                          B(s, { code: L.invalid_string, validation: 'datetime', message: o.message }),
                          r.dirty())
                        : o.kind === 'date'
                          ? UA.test(t.data) ||
                            ((s = this._getOrReturnCtx(t, s)),
                            B(s, { code: L.invalid_string, validation: 'date', message: o.message }),
                            r.dirty())
                          : o.kind === 'time'
                            ? BA(o).test(t.data) ||
                              ((s = this._getOrReturnCtx(t, s)),
                              B(s, { code: L.invalid_string, validation: 'time', message: o.message }),
                              r.dirty())
                            : o.kind === 'duration'
                              ? AA.test(t.data) ||
                                ((s = this._getOrReturnCtx(t, s)),
                                B(s, { validation: 'duration', code: L.invalid_string, message: o.message }),
                                r.dirty())
                              : o.kind === 'ip'
                                ? HA(t.data, o.version) ||
                                  ((s = this._getOrReturnCtx(t, s)),
                                  B(s, { validation: 'ip', code: L.invalid_string, message: o.message }),
                                  r.dirty())
                                : o.kind === 'jwt'
                                  ? GA(t.data, o.alg) ||
                                    ((s = this._getOrReturnCtx(t, s)),
                                    B(s, { validation: 'jwt', code: L.invalid_string, message: o.message }),
                                    r.dirty())
                                  : o.kind === 'cidr'
                                    ? KA(t.data, o.version) ||
                                      ((s = this._getOrReturnCtx(t, s)),
                                      B(s, { validation: 'cidr', code: L.invalid_string, message: o.message }),
                                      r.dirty())
                                    : o.kind === 'base64'
                                      ? zA.test(t.data) ||
                                        ((s = this._getOrReturnCtx(t, s)),
                                        B(s, { validation: 'base64', code: L.invalid_string, message: o.message }),
                                        r.dirty())
                                      : o.kind === 'base64url'
                                        ? VA.test(t.data) ||
                                          ((s = this._getOrReturnCtx(t, s)),
                                          B(s, { validation: 'base64url', code: L.invalid_string, message: o.message }),
                                          r.dirty())
                                        : Se.assertNever(o);
    return { status: r.value, value: t.data };
  }
  _regex(t, n, r) {
    return this.refinement(s => t.test(s), { validation: n, code: L.invalid_string, ...q.errToObj(r) });
  }
  _addCheck(t) {
    return new fr({ ...this._def, checks: [...this._def.checks, t] });
  }
  email(t) {
    return this._addCheck({ kind: 'email', ...q.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: 'url', ...q.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: 'emoji', ...q.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: 'uuid', ...q.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: 'nanoid', ...q.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: 'cuid', ...q.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: 'cuid2', ...q.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: 'ulid', ...q.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: 'base64', ...q.errToObj(t) });
  }
  base64url(t) {
    return this._addCheck({ kind: 'base64url', ...q.errToObj(t) });
  }
  jwt(t) {
    return this._addCheck({ kind: 'jwt', ...q.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: 'ip', ...q.errToObj(t) });
  }
  cidr(t) {
    return this._addCheck({ kind: 'cidr', ...q.errToObj(t) });
  }
  datetime(t) {
    return typeof t == 'string'
      ? this._addCheck({ kind: 'datetime', precision: null, offset: !1, local: !1, message: t })
      : this._addCheck({
          kind: 'datetime',
          precision: typeof (t == null ? void 0 : t.precision) > 'u' ? null : t == null ? void 0 : t.precision,
          offset: (t == null ? void 0 : t.offset) ?? !1,
          local: (t == null ? void 0 : t.local) ?? !1,
          ...q.errToObj(t == null ? void 0 : t.message),
        });
  }
  date(t) {
    return this._addCheck({ kind: 'date', message: t });
  }
  time(t) {
    return typeof t == 'string'
      ? this._addCheck({ kind: 'time', precision: null, message: t })
      : this._addCheck({
          kind: 'time',
          precision: typeof (t == null ? void 0 : t.precision) > 'u' ? null : t == null ? void 0 : t.precision,
          ...q.errToObj(t == null ? void 0 : t.message),
        });
  }
  duration(t) {
    return this._addCheck({ kind: 'duration', ...q.errToObj(t) });
  }
  regex(t, n) {
    return this._addCheck({ kind: 'regex', regex: t, ...q.errToObj(n) });
  }
  includes(t, n) {
    return this._addCheck({
      kind: 'includes',
      value: t,
      position: n == null ? void 0 : n.position,
      ...q.errToObj(n == null ? void 0 : n.message),
    });
  }
  startsWith(t, n) {
    return this._addCheck({ kind: 'startsWith', value: t, ...q.errToObj(n) });
  }
  endsWith(t, n) {
    return this._addCheck({ kind: 'endsWith', value: t, ...q.errToObj(n) });
  }
  min(t, n) {
    return this._addCheck({ kind: 'min', value: t, ...q.errToObj(n) });
  }
  max(t, n) {
    return this._addCheck({ kind: 'max', value: t, ...q.errToObj(n) });
  }
  length(t, n) {
    return this._addCheck({ kind: 'length', value: t, ...q.errToObj(n) });
  }
  nonempty(t) {
    return this.min(1, q.errToObj(t));
  }
  trim() {
    return new fr({ ...this._def, checks: [...this._def.checks, { kind: 'trim' }] });
  }
  toLowerCase() {
    return new fr({ ...this._def, checks: [...this._def.checks, { kind: 'toLowerCase' }] });
  }
  toUpperCase() {
    return new fr({ ...this._def, checks: [...this._def.checks, { kind: 'toUpperCase' }] });
  }
  get isDatetime() {
    return !!this._def.checks.find(t => t.kind === 'datetime');
  }
  get isDate() {
    return !!this._def.checks.find(t => t.kind === 'date');
  }
  get isTime() {
    return !!this._def.checks.find(t => t.kind === 'time');
  }
  get isDuration() {
    return !!this._def.checks.find(t => t.kind === 'duration');
  }
  get isEmail() {
    return !!this._def.checks.find(t => t.kind === 'email');
  }
  get isURL() {
    return !!this._def.checks.find(t => t.kind === 'url');
  }
  get isEmoji() {
    return !!this._def.checks.find(t => t.kind === 'emoji');
  }
  get isUUID() {
    return !!this._def.checks.find(t => t.kind === 'uuid');
  }
  get isNANOID() {
    return !!this._def.checks.find(t => t.kind === 'nanoid');
  }
  get isCUID() {
    return !!this._def.checks.find(t => t.kind === 'cuid');
  }
  get isCUID2() {
    return !!this._def.checks.find(t => t.kind === 'cuid2');
  }
  get isULID() {
    return !!this._def.checks.find(t => t.kind === 'ulid');
  }
  get isIP() {
    return !!this._def.checks.find(t => t.kind === 'ip');
  }
  get isCIDR() {
    return !!this._def.checks.find(t => t.kind === 'cidr');
  }
  get isBase64() {
    return !!this._def.checks.find(t => t.kind === 'base64');
  }
  get isBase64url() {
    return !!this._def.checks.find(t => t.kind === 'base64url');
  }
  get minLength() {
    let t = null;
    for (const n of this._def.checks) n.kind === 'min' && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const n of this._def.checks) n.kind === 'max' && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
fr.create = e => new fr({ checks: [], typeName: oe.ZodString, coerce: (e == null ? void 0 : e.coerce) ?? !1, ...ce(e) });
function ZA(e, t) {
  const n = (e.toString().split('.')[1] || '').length,
    r = (t.toString().split('.')[1] || '').length,
    s = n > r ? n : r,
    o = Number.parseInt(e.toFixed(s).replace('.', '')),
    i = Number.parseInt(t.toFixed(s).replace('.', ''));
  return (o % i) / 10 ** s;
}
class No extends xe {
  constructor() {
    (super(...arguments), (this.min = this.gte), (this.max = this.lte), (this.step = this.multipleOf));
  }
  _parse(t) {
    if ((this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== Q.number)) {
      const o = this._getOrReturnCtx(t);
      return (B(o, { code: L.invalid_type, expected: Q.number, received: o.parsedType }), se);
    }
    let r;
    const s = new Tt();
    for (const o of this._def.checks)
      o.kind === 'int'
        ? Se.isInteger(t.data) ||
          ((r = this._getOrReturnCtx(t, r)),
          B(r, { code: L.invalid_type, expected: 'integer', received: 'float', message: o.message }),
          s.dirty())
        : o.kind === 'min'
          ? (o.inclusive ? t.data < o.value : t.data <= o.value) &&
            ((r = this._getOrReturnCtx(t, r)),
            B(r, { code: L.too_small, minimum: o.value, type: 'number', inclusive: o.inclusive, exact: !1, message: o.message }),
            s.dirty())
          : o.kind === 'max'
            ? (o.inclusive ? t.data > o.value : t.data >= o.value) &&
              ((r = this._getOrReturnCtx(t, r)),
              B(r, { code: L.too_big, maximum: o.value, type: 'number', inclusive: o.inclusive, exact: !1, message: o.message }),
              s.dirty())
            : o.kind === 'multipleOf'
              ? ZA(t.data, o.value) !== 0 &&
                ((r = this._getOrReturnCtx(t, r)), B(r, { code: L.not_multiple_of, multipleOf: o.value, message: o.message }), s.dirty())
              : o.kind === 'finite'
                ? Number.isFinite(t.data) || ((r = this._getOrReturnCtx(t, r)), B(r, { code: L.not_finite, message: o.message }), s.dirty())
                : Se.assertNever(o);
    return { status: s.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit('min', t, !0, q.toString(n));
  }
  gt(t, n) {
    return this.setLimit('min', t, !1, q.toString(n));
  }
  lte(t, n) {
    return this.setLimit('max', t, !0, q.toString(n));
  }
  lt(t, n) {
    return this.setLimit('max', t, !1, q.toString(n));
  }
  setLimit(t, n, r, s) {
    return new No({ ...this._def, checks: [...this._def.checks, { kind: t, value: n, inclusive: r, message: q.toString(s) }] });
  }
  _addCheck(t) {
    return new No({ ...this._def, checks: [...this._def.checks, t] });
  }
  int(t) {
    return this._addCheck({ kind: 'int', message: q.toString(t) });
  }
  positive(t) {
    return this._addCheck({ kind: 'min', value: 0, inclusive: !1, message: q.toString(t) });
  }
  negative(t) {
    return this._addCheck({ kind: 'max', value: 0, inclusive: !1, message: q.toString(t) });
  }
  nonpositive(t) {
    return this._addCheck({ kind: 'max', value: 0, inclusive: !0, message: q.toString(t) });
  }
  nonnegative(t) {
    return this._addCheck({ kind: 'min', value: 0, inclusive: !0, message: q.toString(t) });
  }
  multipleOf(t, n) {
    return this._addCheck({ kind: 'multipleOf', value: t, message: q.toString(n) });
  }
  finite(t) {
    return this._addCheck({ kind: 'finite', message: q.toString(t) });
  }
  safe(t) {
    return this._addCheck({ kind: 'min', inclusive: !0, value: Number.MIN_SAFE_INTEGER, message: q.toString(t) })._addCheck({
      kind: 'max',
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: q.toString(t),
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks) n.kind === 'min' && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks) n.kind === 'max' && (t === null || n.value < t) && (t = n.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find(t => t.kind === 'int' || (t.kind === 'multipleOf' && Se.isInteger(t.value)));
  }
  get isFinite() {
    let t = null,
      n = null;
    for (const r of this._def.checks) {
      if (r.kind === 'finite' || r.kind === 'int' || r.kind === 'multipleOf') return !0;
      r.kind === 'min' ? (n === null || r.value > n) && (n = r.value) : r.kind === 'max' && (t === null || r.value < t) && (t = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(t);
  }
}
No.create = e => new No({ checks: [], typeName: oe.ZodNumber, coerce: (e == null ? void 0 : e.coerce) || !1, ...ce(e) });
class Hi extends xe {
  constructor() {
    (super(...arguments), (this.min = this.gte), (this.max = this.lte));
  }
  _parse(t) {
    if (this._def.coerce)
      try {
        t.data = BigInt(t.data);
      } catch {
        return this._getInvalidInput(t);
      }
    if (this._getType(t) !== Q.bigint) return this._getInvalidInput(t);
    let r;
    const s = new Tt();
    for (const o of this._def.checks)
      o.kind === 'min'
        ? (o.inclusive ? t.data < o.value : t.data <= o.value) &&
          ((r = this._getOrReturnCtx(t, r)),
          B(r, { code: L.too_small, type: 'bigint', minimum: o.value, inclusive: o.inclusive, message: o.message }),
          s.dirty())
        : o.kind === 'max'
          ? (o.inclusive ? t.data > o.value : t.data >= o.value) &&
            ((r = this._getOrReturnCtx(t, r)),
            B(r, { code: L.too_big, type: 'bigint', maximum: o.value, inclusive: o.inclusive, message: o.message }),
            s.dirty())
          : o.kind === 'multipleOf'
            ? t.data % o.value !== BigInt(0) &&
              ((r = this._getOrReturnCtx(t, r)), B(r, { code: L.not_multiple_of, multipleOf: o.value, message: o.message }), s.dirty())
            : Se.assertNever(o);
    return { status: s.value, value: t.data };
  }
  _getInvalidInput(t) {
    const n = this._getOrReturnCtx(t);
    return (B(n, { code: L.invalid_type, expected: Q.bigint, received: n.parsedType }), se);
  }
  gte(t, n) {
    return this.setLimit('min', t, !0, q.toString(n));
  }
  gt(t, n) {
    return this.setLimit('min', t, !1, q.toString(n));
  }
  lte(t, n) {
    return this.setLimit('max', t, !0, q.toString(n));
  }
  lt(t, n) {
    return this.setLimit('max', t, !1, q.toString(n));
  }
  setLimit(t, n, r, s) {
    return new Hi({ ...this._def, checks: [...this._def.checks, { kind: t, value: n, inclusive: r, message: q.toString(s) }] });
  }
  _addCheck(t) {
    return new Hi({ ...this._def, checks: [...this._def.checks, t] });
  }
  positive(t) {
    return this._addCheck({ kind: 'min', value: BigInt(0), inclusive: !1, message: q.toString(t) });
  }
  negative(t) {
    return this._addCheck({ kind: 'max', value: BigInt(0), inclusive: !1, message: q.toString(t) });
  }
  nonpositive(t) {
    return this._addCheck({ kind: 'max', value: BigInt(0), inclusive: !0, message: q.toString(t) });
  }
  nonnegative(t) {
    return this._addCheck({ kind: 'min', value: BigInt(0), inclusive: !0, message: q.toString(t) });
  }
  multipleOf(t, n) {
    return this._addCheck({ kind: 'multipleOf', value: t, message: q.toString(n) });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks) n.kind === 'min' && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks) n.kind === 'max' && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
Hi.create = e => new Hi({ checks: [], typeName: oe.ZodBigInt, coerce: (e == null ? void 0 : e.coerce) ?? !1, ...ce(e) });
class ef extends xe {
  _parse(t) {
    if ((this._def.coerce && (t.data = !!t.data), this._getType(t) !== Q.boolean)) {
      const r = this._getOrReturnCtx(t);
      return (B(r, { code: L.invalid_type, expected: Q.boolean, received: r.parsedType }), se);
    }
    return Ht(t.data);
  }
}
ef.create = e => new ef({ typeName: oe.ZodBoolean, coerce: (e == null ? void 0 : e.coerce) || !1, ...ce(e) });
class Ul extends xe {
  _parse(t) {
    if ((this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== Q.date)) {
      const o = this._getOrReturnCtx(t);
      return (B(o, { code: L.invalid_type, expected: Q.date, received: o.parsedType }), se);
    }
    if (Number.isNaN(t.data.getTime())) {
      const o = this._getOrReturnCtx(t);
      return (B(o, { code: L.invalid_date }), se);
    }
    const r = new Tt();
    let s;
    for (const o of this._def.checks)
      o.kind === 'min'
        ? t.data.getTime() < o.value &&
          ((s = this._getOrReturnCtx(t, s)),
          B(s, { code: L.too_small, message: o.message, inclusive: !0, exact: !1, minimum: o.value, type: 'date' }),
          r.dirty())
        : o.kind === 'max'
          ? t.data.getTime() > o.value &&
            ((s = this._getOrReturnCtx(t, s)),
            B(s, { code: L.too_big, message: o.message, inclusive: !0, exact: !1, maximum: o.value, type: 'date' }),
            r.dirty())
          : Se.assertNever(o);
    return { status: r.value, value: new Date(t.data.getTime()) };
  }
  _addCheck(t) {
    return new Ul({ ...this._def, checks: [...this._def.checks, t] });
  }
  min(t, n) {
    return this._addCheck({ kind: 'min', value: t.getTime(), message: q.toString(n) });
  }
  max(t, n) {
    return this._addCheck({ kind: 'max', value: t.getTime(), message: q.toString(n) });
  }
  get minDate() {
    let t = null;
    for (const n of this._def.checks) n.kind === 'min' && (t === null || n.value > t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const n of this._def.checks) n.kind === 'max' && (t === null || n.value < t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
}
Ul.create = e => new Ul({ checks: [], coerce: (e == null ? void 0 : e.coerce) || !1, typeName: oe.ZodDate, ...ce(e) });
class fg extends xe {
  _parse(t) {
    if (this._getType(t) !== Q.symbol) {
      const r = this._getOrReturnCtx(t);
      return (B(r, { code: L.invalid_type, expected: Q.symbol, received: r.parsedType }), se);
    }
    return Ht(t.data);
  }
}
fg.create = e => new fg({ typeName: oe.ZodSymbol, ...ce(e) });
class pg extends xe {
  _parse(t) {
    if (this._getType(t) !== Q.undefined) {
      const r = this._getOrReturnCtx(t);
      return (B(r, { code: L.invalid_type, expected: Q.undefined, received: r.parsedType }), se);
    }
    return Ht(t.data);
  }
}
pg.create = e => new pg({ typeName: oe.ZodUndefined, ...ce(e) });
class hg extends xe {
  _parse(t) {
    if (this._getType(t) !== Q.null) {
      const r = this._getOrReturnCtx(t);
      return (B(r, { code: L.invalid_type, expected: Q.null, received: r.parsedType }), se);
    }
    return Ht(t.data);
  }
}
hg.create = e => new hg({ typeName: oe.ZodNull, ...ce(e) });
class mg extends xe {
  constructor() {
    (super(...arguments), (this._any = !0));
  }
  _parse(t) {
    return Ht(t.data);
  }
}
mg.create = e => new mg({ typeName: oe.ZodAny, ...ce(e) });
class gg extends xe {
  constructor() {
    (super(...arguments), (this._unknown = !0));
  }
  _parse(t) {
    return Ht(t.data);
  }
}
gg.create = e => new gg({ typeName: oe.ZodUnknown, ...ce(e) });
class Tr extends xe {
  _parse(t) {
    const n = this._getOrReturnCtx(t);
    return (B(n, { code: L.invalid_type, expected: Q.never, received: n.parsedType }), se);
  }
}
Tr.create = e => new Tr({ typeName: oe.ZodNever, ...ce(e) });
class vg extends xe {
  _parse(t) {
    if (this._getType(t) !== Q.undefined) {
      const r = this._getOrReturnCtx(t);
      return (B(r, { code: L.invalid_type, expected: Q.void, received: r.parsedType }), se);
    }
    return Ht(t.data);
  }
}
vg.create = e => new vg({ typeName: oe.ZodVoid, ...ce(e) });
class En extends xe {
  _parse(t) {
    const { ctx: n, status: r } = this._processInputParams(t),
      s = this._def;
    if (n.parsedType !== Q.array) return (B(n, { code: L.invalid_type, expected: Q.array, received: n.parsedType }), se);
    if (s.exactLength !== null) {
      const i = n.data.length > s.exactLength.value,
        a = n.data.length < s.exactLength.value;
      (i || a) &&
        (B(n, {
          code: i ? L.too_big : L.too_small,
          minimum: a ? s.exactLength.value : void 0,
          maximum: i ? s.exactLength.value : void 0,
          type: 'array',
          inclusive: !0,
          exact: !0,
          message: s.exactLength.message,
        }),
        r.dirty());
    }
    if (
      (s.minLength !== null &&
        n.data.length < s.minLength.value &&
        (B(n, { code: L.too_small, minimum: s.minLength.value, type: 'array', inclusive: !0, exact: !1, message: s.minLength.message }),
        r.dirty()),
      s.maxLength !== null &&
        n.data.length > s.maxLength.value &&
        (B(n, { code: L.too_big, maximum: s.maxLength.value, type: 'array', inclusive: !0, exact: !1, message: s.maxLength.message }),
        r.dirty()),
      n.common.async)
    )
      return Promise.all([...n.data].map((i, a) => s.type._parseAsync(new jr(n, i, n.path, a)))).then(i => Tt.mergeArray(r, i));
    const o = [...n.data].map((i, a) => s.type._parseSync(new jr(n, i, n.path, a)));
    return Tt.mergeArray(r, o);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new En({ ...this._def, minLength: { value: t, message: q.toString(n) } });
  }
  max(t, n) {
    return new En({ ...this._def, maxLength: { value: t, message: q.toString(n) } });
  }
  length(t, n) {
    return new En({ ...this._def, exactLength: { value: t, message: q.toString(n) } });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
En.create = (e, t) => new En({ type: e, minLength: null, maxLength: null, exactLength: null, typeName: oe.ZodArray, ...ce(t) });
function Ms(e) {
  if (e instanceof ze) {
    const t = {};
    for (const n in e.shape) {
      const r = e.shape[n];
      t[n] = Cr.create(Ms(r));
    }
    return new ze({ ...e._def, shape: () => t });
  } else
    return e instanceof En
      ? new En({ ...e._def, type: Ms(e.element) })
      : e instanceof Cr
        ? Cr.create(Ms(e.unwrap()))
        : e instanceof Po
          ? Po.create(Ms(e.unwrap()))
          : e instanceof hs
            ? hs.create(e.items.map(t => Ms(t)))
            : e;
}
class ze extends xe {
  constructor() {
    (super(...arguments), (this._cached = null), (this.nonstrict = this.passthrough), (this.augment = this.extend));
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const t = this._def.shape(),
      n = Se.objectKeys(t);
    return ((this._cached = { shape: t, keys: n }), this._cached);
  }
  _parse(t) {
    if (this._getType(t) !== Q.object) {
      const u = this._getOrReturnCtx(t);
      return (B(u, { code: L.invalid_type, expected: Q.object, received: u.parsedType }), se);
    }
    const { status: r, ctx: s } = this._processInputParams(t),
      { shape: o, keys: i } = this._getCached(),
      a = [];
    if (!(this._def.catchall instanceof Tr && this._def.unknownKeys === 'strip')) for (const u in s.data) i.includes(u) || a.push(u);
    const c = [];
    for (const u of i) {
      const f = o[u],
        p = s.data[u];
      c.push({ key: { status: 'valid', value: u }, value: f._parse(new jr(s, p, s.path, u)), alwaysSet: u in s.data });
    }
    if (this._def.catchall instanceof Tr) {
      const u = this._def.unknownKeys;
      if (u === 'passthrough')
        for (const f of a) c.push({ key: { status: 'valid', value: f }, value: { status: 'valid', value: s.data[f] } });
      else if (u === 'strict') a.length > 0 && (B(s, { code: L.unrecognized_keys, keys: a }), r.dirty());
      else if (u !== 'strip') throw new Error('Internal ZodObject error: invalid unknownKeys value.');
    } else {
      const u = this._def.catchall;
      for (const f of a) {
        const p = s.data[f];
        c.push({ key: { status: 'valid', value: f }, value: u._parse(new jr(s, p, s.path, f)), alwaysSet: f in s.data });
      }
    }
    return s.common.async
      ? Promise.resolve()
          .then(async () => {
            const u = [];
            for (const f of c) {
              const p = await f.key,
                h = await f.value;
              u.push({ key: p, value: h, alwaysSet: f.alwaysSet });
            }
            return u;
          })
          .then(u => Tt.mergeObjectSync(r, u))
      : Tt.mergeObjectSync(r, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return (
      q.errToObj,
      new ze({
        ...this._def,
        unknownKeys: 'strict',
        ...(t !== void 0
          ? {
              errorMap: (n, r) => {
                var o, i;
                const s = ((i = (o = this._def).errorMap) == null ? void 0 : i.call(o, n, r).message) ?? r.defaultError;
                return n.code === 'unrecognized_keys' ? { message: q.errToObj(t).message ?? s } : { message: s };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new ze({ ...this._def, unknownKeys: 'strip' });
  }
  passthrough() {
    return new ze({ ...this._def, unknownKeys: 'passthrough' });
  }
  extend(t) {
    return new ze({ ...this._def, shape: () => ({ ...this._def.shape(), ...t }) });
  }
  merge(t) {
    return new ze({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
      typeName: oe.ZodObject,
    });
  }
  setKey(t, n) {
    return this.augment({ [t]: n });
  }
  catchall(t) {
    return new ze({ ...this._def, catchall: t });
  }
  pick(t) {
    const n = {};
    for (const r of Se.objectKeys(t)) t[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new ze({ ...this._def, shape: () => n });
  }
  omit(t) {
    const n = {};
    for (const r of Se.objectKeys(this.shape)) t[r] || (n[r] = this.shape[r]);
    return new ze({ ...this._def, shape: () => n });
  }
  deepPartial() {
    return Ms(this);
  }
  partial(t) {
    const n = {};
    for (const r of Se.objectKeys(this.shape)) {
      const s = this.shape[r];
      t && !t[r] ? (n[r] = s) : (n[r] = s.optional());
    }
    return new ze({ ...this._def, shape: () => n });
  }
  required(t) {
    const n = {};
    for (const r of Se.objectKeys(this.shape))
      if (t && !t[r]) n[r] = this.shape[r];
      else {
        let o = this.shape[r];
        for (; o instanceof Cr; ) o = o._def.innerType;
        n[r] = o;
      }
    return new ze({ ...this._def, shape: () => n });
  }
  keyof() {
    return WS(Se.objectKeys(this.shape));
  }
}
ze.create = (e, t) => new ze({ shape: () => e, unknownKeys: 'strip', catchall: Tr.create(), typeName: oe.ZodObject, ...ce(t) });
ze.strictCreate = (e, t) => new ze({ shape: () => e, unknownKeys: 'strict', catchall: Tr.create(), typeName: oe.ZodObject, ...ce(t) });
ze.lazycreate = (e, t) => new ze({ shape: e, unknownKeys: 'strip', catchall: Tr.create(), typeName: oe.ZodObject, ...ce(t) });
class Bl extends xe {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = this._def.options;
    function s(o) {
      for (const a of o) if (a.result.status === 'valid') return a.result;
      for (const a of o) if (a.result.status === 'dirty') return (n.common.issues.push(...a.ctx.common.issues), a.result);
      const i = o.map(a => new kn(a.ctx.common.issues));
      return (B(n, { code: L.invalid_union, unionErrors: i }), se);
    }
    if (n.common.async)
      return Promise.all(
        r.map(async o => {
          const i = { ...n, common: { ...n.common, issues: [] }, parent: null };
          return { result: await o._parseAsync({ data: n.data, path: n.path, parent: i }), ctx: i };
        })
      ).then(s);
    {
      let o;
      const i = [];
      for (const c of r) {
        const u = { ...n, common: { ...n.common, issues: [] }, parent: null },
          f = c._parseSync({ data: n.data, path: n.path, parent: u });
        if (f.status === 'valid') return f;
        (f.status === 'dirty' && !o && (o = { result: f, ctx: u }), u.common.issues.length && i.push(u.common.issues));
      }
      if (o) return (n.common.issues.push(...o.ctx.common.issues), o.result);
      const a = i.map(c => new kn(c));
      return (B(n, { code: L.invalid_union, unionErrors: a }), se);
    }
  }
  get options() {
    return this._def.options;
  }
}
Bl.create = (e, t) => new Bl({ options: e, typeName: oe.ZodUnion, ...ce(t) });
function tf(e, t) {
  const n = tr(e),
    r = tr(t);
  if (e === t) return { valid: !0, data: e };
  if (n === Q.object && r === Q.object) {
    const s = Se.objectKeys(t),
      o = Se.objectKeys(e).filter(a => s.indexOf(a) !== -1),
      i = { ...e, ...t };
    for (const a of o) {
      const c = tf(e[a], t[a]);
      if (!c.valid) return { valid: !1 };
      i[a] = c.data;
    }
    return { valid: !0, data: i };
  } else if (n === Q.array && r === Q.array) {
    if (e.length !== t.length) return { valid: !1 };
    const s = [];
    for (let o = 0; o < e.length; o++) {
      const i = e[o],
        a = t[o],
        c = tf(i, a);
      if (!c.valid) return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else return n === Q.date && r === Q.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
class Wl extends xe {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t),
      s = (o, i) => {
        if (cg(o) || cg(i)) return se;
        const a = tf(o.value, i.value);
        return a.valid
          ? ((ug(o) || ug(i)) && n.dirty(), { status: n.value, value: a.data })
          : (B(r, { code: L.invalid_intersection_types }), se);
      };
    return r.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseAsync({ data: r.data, path: r.path, parent: r }),
        ]).then(([o, i]) => s(o, i))
      : s(
          this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseSync({ data: r.data, path: r.path, parent: r })
        );
  }
}
Wl.create = (e, t, n) => new Wl({ left: e, right: t, typeName: oe.ZodIntersection, ...ce(n) });
class hs extends xe {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== Q.array) return (B(r, { code: L.invalid_type, expected: Q.array, received: r.parsedType }), se);
    if (r.data.length < this._def.items.length)
      return (B(r, { code: L.too_small, minimum: this._def.items.length, inclusive: !0, exact: !1, type: 'array' }), se);
    !this._def.rest &&
      r.data.length > this._def.items.length &&
      (B(r, { code: L.too_big, maximum: this._def.items.length, inclusive: !0, exact: !1, type: 'array' }), n.dirty());
    const o = [...r.data]
      .map((i, a) => {
        const c = this._def.items[a] || this._def.rest;
        return c ? c._parse(new jr(r, i, r.path, a)) : null;
      })
      .filter(i => !!i);
    return r.common.async ? Promise.all(o).then(i => Tt.mergeArray(n, i)) : Tt.mergeArray(n, o);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new hs({ ...this._def, rest: t });
  }
}
hs.create = (e, t) => {
  if (!Array.isArray(e)) throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  return new hs({ items: e, typeName: oe.ZodTuple, rest: null, ...ce(t) });
};
class yg extends xe {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== Q.map) return (B(r, { code: L.invalid_type, expected: Q.map, received: r.parsedType }), se);
    const s = this._def.keyType,
      o = this._def.valueType,
      i = [...r.data.entries()].map(([a, c], u) => ({
        key: s._parse(new jr(r, a, r.path, [u, 'key'])),
        value: o._parse(new jr(r, c, r.path, [u, 'value'])),
      }));
    if (r.common.async) {
      const a = new Map();
      return Promise.resolve().then(async () => {
        for (const c of i) {
          const u = await c.key,
            f = await c.value;
          if (u.status === 'aborted' || f.status === 'aborted') return se;
          ((u.status === 'dirty' || f.status === 'dirty') && n.dirty(), a.set(u.value, f.value));
        }
        return { status: n.value, value: a };
      });
    } else {
      const a = new Map();
      for (const c of i) {
        const u = c.key,
          f = c.value;
        if (u.status === 'aborted' || f.status === 'aborted') return se;
        ((u.status === 'dirty' || f.status === 'dirty') && n.dirty(), a.set(u.value, f.value));
      }
      return { status: n.value, value: a };
    }
  }
}
yg.create = (e, t, n) => new yg({ valueType: t, keyType: e, typeName: oe.ZodMap, ...ce(n) });
class Gi extends xe {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== Q.set) return (B(r, { code: L.invalid_type, expected: Q.set, received: r.parsedType }), se);
    const s = this._def;
    (s.minSize !== null &&
      r.data.size < s.minSize.value &&
      (B(r, { code: L.too_small, minimum: s.minSize.value, type: 'set', inclusive: !0, exact: !1, message: s.minSize.message }), n.dirty()),
      s.maxSize !== null &&
        r.data.size > s.maxSize.value &&
        (B(r, { code: L.too_big, maximum: s.maxSize.value, type: 'set', inclusive: !0, exact: !1, message: s.maxSize.message }),
        n.dirty()));
    const o = this._def.valueType;
    function i(c) {
      const u = new Set();
      for (const f of c) {
        if (f.status === 'aborted') return se;
        (f.status === 'dirty' && n.dirty(), u.add(f.value));
      }
      return { status: n.value, value: u };
    }
    const a = [...r.data.values()].map((c, u) => o._parse(new jr(r, c, r.path, u)));
    return r.common.async ? Promise.all(a).then(c => i(c)) : i(a);
  }
  min(t, n) {
    return new Gi({ ...this._def, minSize: { value: t, message: q.toString(n) } });
  }
  max(t, n) {
    return new Gi({ ...this._def, maxSize: { value: t, message: q.toString(n) } });
  }
  size(t, n) {
    return this.min(t, n).max(t, n);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Gi.create = (e, t) => new Gi({ valueType: e, minSize: null, maxSize: null, typeName: oe.ZodSet, ...ce(t) });
class xg extends xe {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
xg.create = (e, t) => new xg({ getter: e, typeName: oe.ZodLazy, ...ce(t) });
class wg extends xe {
  _parse(t) {
    if (t.data !== this._def.value) {
      const n = this._getOrReturnCtx(t);
      return (B(n, { received: n.data, code: L.invalid_literal, expected: this._def.value }), se);
    }
    return { status: 'valid', value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
wg.create = (e, t) => new wg({ value: e, typeName: oe.ZodLiteral, ...ce(t) });
function WS(e, t) {
  return new ko({ values: e, typeName: oe.ZodEnum, ...ce(t) });
}
class ko extends xe {
  _parse(t) {
    if (typeof t.data != 'string') {
      const n = this._getOrReturnCtx(t),
        r = this._def.values;
      return (B(n, { expected: Se.joinValues(r), received: n.parsedType, code: L.invalid_type }), se);
    }
    if ((this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(t.data))) {
      const n = this._getOrReturnCtx(t),
        r = this._def.values;
      return (B(n, { received: n.data, code: L.invalid_enum_value, options: r }), se);
    }
    return Ht(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Values() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  extract(t, n = this._def) {
    return ko.create(t, { ...this._def, ...n });
  }
  exclude(t, n = this._def) {
    return ko.create(
      this.options.filter(r => !t.includes(r)),
      { ...this._def, ...n }
    );
  }
}
ko.create = WS;
class Sg extends xe {
  _parse(t) {
    const n = Se.getValidEnumValues(this._def.values),
      r = this._getOrReturnCtx(t);
    if (r.parsedType !== Q.string && r.parsedType !== Q.number) {
      const s = Se.objectValues(n);
      return (B(r, { expected: Se.joinValues(s), received: r.parsedType, code: L.invalid_type }), se);
    }
    if ((this._cache || (this._cache = new Set(Se.getValidEnumValues(this._def.values))), !this._cache.has(t.data))) {
      const s = Se.objectValues(n);
      return (B(r, { received: r.data, code: L.invalid_enum_value, options: s }), se);
    }
    return Ht(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
Sg.create = (e, t) => new Sg({ values: e, typeName: oe.ZodNativeEnum, ...ce(t) });
class Hl extends xe {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== Q.promise && n.common.async === !1)
      return (B(n, { code: L.invalid_type, expected: Q.promise, received: n.parsedType }), se);
    const r = n.parsedType === Q.promise ? n.data : Promise.resolve(n.data);
    return Ht(r.then(s => this._def.type.parseAsync(s, { path: n.path, errorMap: n.common.contextualErrorMap })));
  }
}
Hl.create = (e, t) => new Hl({ type: e, typeName: oe.ZodPromise, ...ce(t) });
class _o extends xe {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === oe.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t),
      s = this._def.effect || null,
      o = {
        addIssue: i => {
          (B(r, i), i.fatal ? n.abort() : n.dirty());
        },
        get path() {
          return r.path;
        },
      };
    if (((o.addIssue = o.addIssue.bind(o)), s.type === 'preprocess')) {
      const i = s.transform(r.data, o);
      if (r.common.async)
        return Promise.resolve(i).then(async a => {
          if (n.value === 'aborted') return se;
          const c = await this._def.schema._parseAsync({ data: a, path: r.path, parent: r });
          return c.status === 'aborted' ? se : c.status === 'dirty' || n.value === 'dirty' ? ai(c.value) : c;
        });
      {
        if (n.value === 'aborted') return se;
        const a = this._def.schema._parseSync({ data: i, path: r.path, parent: r });
        return a.status === 'aborted' ? se : a.status === 'dirty' || n.value === 'dirty' ? ai(a.value) : a;
      }
    }
    if (s.type === 'refinement') {
      const i = a => {
        const c = s.refinement(a, o);
        if (r.common.async) return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error('Async refinement encountered during synchronous parse operation. Use .parseAsync instead.');
        return a;
      };
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
        return a.status === 'aborted' ? se : (a.status === 'dirty' && n.dirty(), i(a.value), { status: n.value, value: a.value });
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then(a =>
            a.status === 'aborted' ? se : (a.status === 'dirty' && n.dirty(), i(a.value).then(() => ({ status: n.value, value: a.value })))
          );
    }
    if (s.type === 'transform')
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
        if (!Eo(i)) return se;
        const a = s.transform(i.value, o);
        if (a instanceof Promise)
          throw new Error('Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.');
        return { status: n.value, value: a };
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then(i => (Eo(i) ? Promise.resolve(s.transform(i.value, o)).then(a => ({ status: n.value, value: a })) : se));
    Se.assertNever(s);
  }
}
_o.create = (e, t, n) => new _o({ schema: e, typeName: oe.ZodEffects, effect: t, ...ce(n) });
_o.createWithPreprocess = (e, t, n) =>
  new _o({ schema: t, effect: { type: 'preprocess', transform: e }, typeName: oe.ZodEffects, ...ce(n) });
class Cr extends xe {
  _parse(t) {
    return this._getType(t) === Q.undefined ? Ht(void 0) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Cr.create = (e, t) => new Cr({ innerType: e, typeName: oe.ZodOptional, ...ce(t) });
class Po extends xe {
  _parse(t) {
    return this._getType(t) === Q.null ? Ht(null) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Po.create = (e, t) => new Po({ innerType: e, typeName: oe.ZodNullable, ...ce(t) });
class nf extends xe {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    let r = n.data;
    return (
      n.parsedType === Q.undefined && (r = this._def.defaultValue()),
      this._def.innerType._parse({ data: r, path: n.path, parent: n })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
nf.create = (e, t) =>
  new nf({ innerType: e, typeName: oe.ZodDefault, defaultValue: typeof t.default == 'function' ? t.default : () => t.default, ...ce(t) });
class rf extends xe {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = { ...n, common: { ...n.common, issues: [] } },
      s = this._def.innerType._parse({ data: r.data, path: r.path, parent: { ...r } });
    return Vl(s)
      ? s.then(o => ({
          status: 'valid',
          value:
            o.status === 'valid'
              ? o.value
              : this._def.catchValue({
                  get error() {
                    return new kn(r.common.issues);
                  },
                  input: r.data,
                }),
        }))
      : {
          status: 'valid',
          value:
            s.status === 'valid'
              ? s.value
              : this._def.catchValue({
                  get error() {
                    return new kn(r.common.issues);
                  },
                  input: r.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
rf.create = (e, t) =>
  new rf({ innerType: e, typeName: oe.ZodCatch, catchValue: typeof t.catch == 'function' ? t.catch : () => t.catch, ...ce(t) });
class bg extends xe {
  _parse(t) {
    if (this._getType(t) !== Q.nan) {
      const r = this._getOrReturnCtx(t);
      return (B(r, { code: L.invalid_type, expected: Q.nan, received: r.parsedType }), se);
    }
    return { status: 'valid', value: t.data };
  }
}
bg.create = e => new bg({ typeName: oe.ZodNaN, ...ce(e) });
class QA extends xe {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = n.data;
    return this._def.type._parse({ data: r, path: n.path, parent: n });
  }
  unwrap() {
    return this._def.type;
  }
}
class Hp extends xe {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.common.async)
      return (async () => {
        const o = await this._def.in._parseAsync({ data: r.data, path: r.path, parent: r });
        return o.status === 'aborted'
          ? se
          : o.status === 'dirty'
            ? (n.dirty(), ai(o.value))
            : this._def.out._parseAsync({ data: o.value, path: r.path, parent: r });
      })();
    {
      const s = this._def.in._parseSync({ data: r.data, path: r.path, parent: r });
      return s.status === 'aborted'
        ? se
        : s.status === 'dirty'
          ? (n.dirty(), { status: 'dirty', value: s.value })
          : this._def.out._parseSync({ data: s.value, path: r.path, parent: r });
    }
  }
  static create(t, n) {
    return new Hp({ in: t, out: n, typeName: oe.ZodPipeline });
  }
}
class sf extends xe {
  _parse(t) {
    const n = this._def.innerType._parse(t),
      r = s => (Eo(s) && (s.value = Object.freeze(s.value)), s);
    return Vl(n) ? n.then(s => r(s)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
sf.create = (e, t) => new sf({ innerType: e, typeName: oe.ZodReadonly, ...ce(t) });
var oe;
(function (e) {
  ((e.ZodString = 'ZodString'),
    (e.ZodNumber = 'ZodNumber'),
    (e.ZodNaN = 'ZodNaN'),
    (e.ZodBigInt = 'ZodBigInt'),
    (e.ZodBoolean = 'ZodBoolean'),
    (e.ZodDate = 'ZodDate'),
    (e.ZodSymbol = 'ZodSymbol'),
    (e.ZodUndefined = 'ZodUndefined'),
    (e.ZodNull = 'ZodNull'),
    (e.ZodAny = 'ZodAny'),
    (e.ZodUnknown = 'ZodUnknown'),
    (e.ZodNever = 'ZodNever'),
    (e.ZodVoid = 'ZodVoid'),
    (e.ZodArray = 'ZodArray'),
    (e.ZodObject = 'ZodObject'),
    (e.ZodUnion = 'ZodUnion'),
    (e.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
    (e.ZodIntersection = 'ZodIntersection'),
    (e.ZodTuple = 'ZodTuple'),
    (e.ZodRecord = 'ZodRecord'),
    (e.ZodMap = 'ZodMap'),
    (e.ZodSet = 'ZodSet'),
    (e.ZodFunction = 'ZodFunction'),
    (e.ZodLazy = 'ZodLazy'),
    (e.ZodLiteral = 'ZodLiteral'),
    (e.ZodEnum = 'ZodEnum'),
    (e.ZodEffects = 'ZodEffects'),
    (e.ZodNativeEnum = 'ZodNativeEnum'),
    (e.ZodOptional = 'ZodOptional'),
    (e.ZodNullable = 'ZodNullable'),
    (e.ZodDefault = 'ZodDefault'),
    (e.ZodCatch = 'ZodCatch'),
    (e.ZodPromise = 'ZodPromise'),
    (e.ZodBranded = 'ZodBranded'),
    (e.ZodPipeline = 'ZodPipeline'),
    (e.ZodReadonly = 'ZodReadonly'));
})(oe || (oe = {}));
const be = fr.create,
  ms = No.create,
  qA = ef.create;
Tr.create;
const jo = En.create,
  Cs = ze.create,
  YA = Bl.create;
Wl.create;
hs.create;
ko.create;
Hl.create;
Cr.create;
Po.create;
const XA = Cs({ id: be(), author: be(), date: be(), text: be(), avatarUrl: be(), upvotes: ms(), downvotes: ms() }),
  Cg = Cs({ id: ms(), date: be(), title: be(), content: be(), media: be().optional() }),
  JA = Cs({ id: be(), url: be(), name: be(), description: be(), internalUrl: be(), cloudinaryUrl: be() }),
  eM = Cs({
    gameId: ms(),
    title: be(),
    displayName: be(),
    identifier: be(),
    experimental: qA(),
    version: be(),
    releaseDate: be(),
    filename: be(),
    type: be(),
    md5Hash: be(),
    size: be(),
    sizeInBytes: ms(),
    downloadUrl: be(),
    coverImage: be(),
    thumbnailUrl: be(),
    detailsUrl: be(),
    description: be(),
    screenshots: jo(be()).optional(),
    changelog: be().optional(),
  }),
  tM = Cs({ count: ms(), comments: jo(XA) }),
  nM = YA([jo(Cg), Cs({ count: ms(), news: jo(Cg) })]);
jo(JA);
Cs({ versions: jo(eM) });
function rM(e, t, n) {
  try {
    return t.parse(e);
  } catch (r) {
    return (r instanceof kn && de.error('API_VALIDATION', `${n} response validation failed`, { errors: r.errors, receivedData: e }), null);
  }
}
async function Eg(e, t, n) {
  try {
    const r = await fetch(e);
    if (!r.ok) return (de.error('API_FETCH', `${n} fetch failed`, { status: r.status, statusText: r.statusText }), null);
    const s = await r.json();
    return rM(s, t, n);
  } catch (r) {
    return (de.error('API_FETCH', `${n} request failed`, { error: r }), null);
  }
}
const sM = D.memo(function () {
    const [t, n] = d.useState([]),
      [r, s] = d.useState(null),
      [o, i] = d.useState(!0),
      [a, c] = d.useState(!0);
    d.useEffect(() => {
      const p = async () => {
          const m = await Eg(bo(Nt.API_ENDPOINTS.NEWS), nM, 'News');
          (m
            ? Array.isArray(m)
              ? n(m)
              : n(m.news)
            : n([
                {
                  id: 1,
                  title: 'Welcome to ManicMiners!',
                  content: 'The ultimate LEGO Rock Raiders experience is here. Drill, build, and explore!',
                  date: new Date().toISOString().split('T')[0],
                },
                {
                  id: 2,
                  title: 'New Energy Crystal System',
                  content: 'Enhanced mining mechanics with realistic crystal formations and energy management.',
                  date: new Date(Date.now() - 864e5).toISOString().split('T')[0],
                },
              ]),
            i(!1));
        },
        h = async () => {
          const m = await Eg(bo(Nt.API_ENDPOINTS.COMMENTS), tM, 'Comments');
          (s(m || { count: 0, comments: [] }), c(!1));
        };
      (p(), h());
    }, []);
    const u = p => new Date(p).toLocaleDateString(),
      f = p =>
        p
          .split(' ')
          .map(h => h[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
    return o && a
      ? l.jsxs(We, {
          className: 'mining-surface',
          children: [
            l.jsx(qe, { children: l.jsx(ot, { className: 'text-primary', children: 'Loading...' }) }),
            l.jsx(Ke, {
              children: l.jsxs('div', {
                className: 'animate-pulse space-y-3',
                children: [l.jsx('div', { className: 'h-4 bg-muted rounded' }), l.jsx('div', { className: 'h-4 bg-muted rounded w-2/3' })],
              }),
            }),
          ],
        })
      : l.jsxs(We, {
          className: 'mining-surface',
          children: [
            l.jsxs(qe, {
              children: [
                l.jsxs(ot, {
                  className: 'text-primary flex items-center gap-2',
                  children: [l.jsx(_x, { className: 'w-5 h-5' }), 'Community Hub'],
                }),
                l.jsx(yt, { className: 'text-muted-foreground', children: 'Latest news and community discussions' }),
              ],
            }),
            l.jsx(Ke, {
              children: l.jsxs(X1, {
                defaultValue: 'news',
                className: 'w-full',
                children: [
                  l.jsxs(Mp, {
                    className: 'grid w-full grid-cols-2',
                    children: [l.jsx(Zr, { value: 'news', children: 'News' }), l.jsx(Zr, { value: 'comments', children: 'Comments' })],
                  }),
                  l.jsx(Qr, {
                    value: 'news',
                    className: 'mt-4',
                    children: l.jsx('div', {
                      className: 'space-y-4 max-h-96 overflow-y-auto',
                      children: o
                        ? l.jsxs('div', {
                            className: 'animate-pulse space-y-3',
                            children: [
                              l.jsx('div', { className: 'h-4 bg-muted rounded' }),
                              l.jsx('div', { className: 'h-4 bg-muted rounded w-2/3' }),
                            ],
                          })
                        : t.length === 0
                          ? l.jsx('p', { className: 'text-muted-foreground text-center py-4', children: 'No messages available' })
                          : t.map(p =>
                              l.jsxs(
                                'div',
                                {
                                  className:
                                    'p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors',
                                  children: [
                                    l.jsxs('div', {
                                      className: 'flex items-start justify-between mb-2',
                                      children: [
                                        l.jsx('h4', { className: 'font-medium text-secondary-foreground text-sm', children: p.title }),
                                        l.jsx(br, { variant: 'secondary', className: 'ml-2', children: 'news' }),
                                      ],
                                    }),
                                    l.jsx('p', { className: 'text-xs text-muted-foreground mb-2', children: p.content }),
                                    p.media &&
                                      l.jsxs('a', {
                                        href: p.media,
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                        className: 'inline-flex items-center gap-1 text-xs text-primary hover:underline mb-2',
                                        children: [l.jsx(Oi, { className: 'w-3 h-3' }), 'View media'],
                                      }),
                                    l.jsxs('div', {
                                      className: 'flex items-center gap-1 text-xs text-muted-foreground',
                                      children: [l.jsx(mm, { className: 'w-3 h-3' }), new Date(p.date).toLocaleDateString()],
                                    }),
                                  ],
                                },
                                p.id
                              )
                            ),
                    }),
                  }),
                  l.jsx(Qr, {
                    value: 'comments',
                    className: 'mt-4',
                    children: l.jsx('div', {
                      className: 'space-y-4 max-h-96 overflow-y-auto',
                      children: a
                        ? l.jsx('div', {
                            className: 'animate-pulse space-y-4',
                            children: [1, 2, 3].map(p =>
                              l.jsxs(
                                'div',
                                {
                                  className: 'flex gap-3',
                                  children: [
                                    l.jsx('div', { className: 'w-8 h-8 bg-muted rounded-full' }),
                                    l.jsxs('div', {
                                      className: 'flex-1 space-y-2',
                                      children: [
                                        l.jsx('div', { className: 'h-4 bg-muted rounded w-1/4' }),
                                        l.jsx('div', { className: 'h-3 bg-muted rounded w-3/4' }),
                                      ],
                                    }),
                                  ],
                                },
                                p
                              )
                            ),
                          })
                        : r != null && r.comments.length
                          ? r.comments.map(p =>
                              l.jsx(
                                'div',
                                {
                                  className:
                                    'p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors',
                                  children: l.jsxs('div', {
                                    className: 'flex gap-3',
                                    children: [
                                      l.jsxs($S, {
                                        className: 'w-8 h-8',
                                        children: [
                                          l.jsx(zS, { src: p.avatarUrl, alt: p.author }),
                                          l.jsx(VS, { className: 'text-xs', children: f(p.author) }),
                                        ],
                                      }),
                                      l.jsxs('div', {
                                        className: 'flex-1 space-y-2',
                                        children: [
                                          l.jsx('div', {
                                            className: 'flex items-center justify-between',
                                            children: l.jsxs('div', {
                                              className: 'flex items-center gap-2',
                                              children: [
                                                l.jsx('span', {
                                                  className: 'font-medium text-secondary-foreground text-sm',
                                                  children: p.author,
                                                }),
                                                l.jsxs('div', {
                                                  className: 'flex items-center gap-1 text-xs text-muted-foreground',
                                                  children: [l.jsx(mm, { className: 'w-3 h-3' }), u(p.date)],
                                                }),
                                              ],
                                            }),
                                          }),
                                          l.jsx('p', { className: 'text-sm text-muted-foreground leading-relaxed', children: p.text }),
                                          l.jsxs('div', {
                                            className: 'flex items-center gap-3',
                                            children: [
                                              p.upvotes > 0 &&
                                                l.jsxs('div', {
                                                  className: 'flex items-center gap-1',
                                                  children: [
                                                    l.jsx(BN, { className: 'w-3 h-3 text-green-500' }),
                                                    l.jsx('span', { className: 'text-xs text-green-500', children: p.upvotes }),
                                                  ],
                                                }),
                                              p.downvotes < 0 &&
                                                l.jsxs('div', {
                                                  className: 'flex items-center gap-1',
                                                  children: [
                                                    l.jsx(UN, { className: 'w-3 h-3 text-red-500' }),
                                                    l.jsx('span', { className: 'text-xs text-red-500', children: Math.abs(p.downvotes) }),
                                                  ],
                                                }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                },
                                p.id
                              )
                            )
                          : l.jsx('p', { className: 'text-muted-foreground text-center py-4', children: 'No comments available' }),
                    }),
                  }),
                ],
              }),
            }),
          ],
        });
  }),
  oM = ({ onNotificationUpdate: e, removeNotification: t }) => {
    const { getAssetUrl: n } = _S();
    return (
      n('manic-miners-background.jpg'),
      n('manic-miners.png'),
      n('manic-miners-lms.png'),
      n('manic-miners-supportstation.png'),
      n('manic-miners-teleportstation.png'),
      n('manic-miners-toolstore.png'),
      n('manic-miners-cover-image.png'),
      n('manic-miners-alt.png'),
      l.jsx('div', {
        className: 'h-full flex flex-col overflow-y-auto relative',
        children: l.jsxs('div', {
          className: 'container mx-auto p-6 flex-1 min-h-0',
          children: [
            l.jsx('div', {
              className: 'space-y-8',
              children: l.jsxs('div', {
                className: 'grid grid-cols-1 lg:grid-cols-12 gap-6',
                children: [
                  l.jsxs('div', {
                    className: 'lg:col-span-7 space-y-6',
                    children: [
                      l.jsx(aA, { onNotificationUpdate: e, removeNotification: t }),
                      l.jsxs(We, {
                        children: [
                          l.jsxs(qe, {
                            children: [
                              l.jsxs(ot, {
                                className: 'text-primary flex items-center gap-2',
                                children: [l.jsx(op, { className: 'w-5 h-5' }), 'About the Game'],
                              }),
                              l.jsx(yt, { children: 'What makes Manic Miners special' }),
                            ],
                          }),
                          l.jsxs(Ke, {
                            className: 'space-y-6',
                            children: [
                              l.jsxs('div', {
                                className: 'text-center mb-6',
                                children: [
                                  l.jsxs(br, {
                                    variant: 'outline',
                                    className: 'mb-2',
                                    children: [l.jsx(jx, { className: 'w-3 h-3 mr-1' }), '20 Years in the Making'],
                                  }),
                                  l.jsx('p', {
                                    className: 'text-sm text-muted-foreground',
                                    children: `Manic Miners aims to be what could've been if the franchise continued and released a "Rock Raiders 2" or "Rock Raiders remastered", but 20 years later. All in the spirit of 90's LEGO themes and games.`,
                                  }),
                                ],
                              }),
                              l.jsxs('div', {
                                className: 'space-y-4',
                                children: [
                                  l.jsxs('div', {
                                    children: [
                                      l.jsx('h4', { className: 'text-sm font-semibold mb-2', children: 'Smart AI & Customization' }),
                                      l.jsxs('ul', {
                                        className: 'text-xs text-muted-foreground space-y-1 ml-4',
                                        children: [
                                          l.jsx('li', {
                                            children: "• Smart AI that executes tasks and doesn't ignore your input, as LRR sometimes did",
                                          }),
                                          l.jsx('li', {
                                            children: '• Fully customizable miners, down to the individual print and colour!',
                                          }),
                                          l.jsx('li', { children: '• Assembling a crew with you as the commander!' }),
                                          l.jsx('li', { children: '• Extensive first-person controls through Eye/Shoulder view' }),
                                          l.jsx('li', {
                                            children: '• Vehicles with lasers will take drill orders and shoot walls autonomously',
                                          }),
                                          l.jsx('li', {
                                            children:
                                              '• Scale hazards (Landslides, Erosion, Monster spawns etc) up or down to fit your playstyle!',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  l.jsxs('div', {
                                    children: [
                                      l.jsx('h4', { className: 'text-sm font-semibold mb-2', children: 'Level Editor' }),
                                      l.jsxs('ul', {
                                        className: 'text-xs text-muted-foreground space-y-1 ml-4',
                                        children: [
                                          l.jsx('li', { children: '• Incredibly easy to use' }),
                                          l.jsx('li', { children: '• Change the level in real-time and see how it behaves!' }),
                                          l.jsx('li', { children: '• Saving and loading Buildings, Vehicles and miners' }),
                                          l.jsx('li', { children: '• Up to 256×256 map size' }),
                                          l.jsx('li', { children: '• Detail-editable height map from (-100 to 100) times tile size' }),
                                          l.jsx('li', { children: '• Define custom objectives not present in LRR' }),
                                          l.jsx('li', { children: '• Advanced level scripting and Visual scripting with Script Blocks' }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  l.jsxs('div', {
                                    children: [
                                      l.jsx('h4', { className: 'text-sm font-semibold mb-2', children: 'Graphics & Controls' }),
                                      l.jsxs('ul', {
                                        className: 'text-xs text-muted-foreground space-y-1 ml-4',
                                        children: [
                                          l.jsx('li', { children: '• Unreal Engine 4 providing fantastic lighting' }),
                                          l.jsx('li', { children: '• Upscaled wall textures and accurate high-resolution brick textures' }),
                                          l.jsx('li', { children: '• Pristine LDraw models with maximum detail' }),
                                          l.jsx('li', { children: '• Classic LRR UI with modern visuals' }),
                                          l.jsx('li', { children: '• Fully customizable hotkeys and modern camera controls' }),
                                          l.jsx('li', { children: '• Many new animations, details and secrets' }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs('div', {
                    className: 'lg:col-span-5 space-y-6',
                    children: [
                      l.jsx(lA, {}),
                      l.jsx(sM, {}),
                      l.jsxs(We, {
                        children: [
                          l.jsxs(qe, {
                            children: [
                              l.jsxs(ot, {
                                className: 'text-primary flex items-center gap-2',
                                children: [l.jsx(Mo, { className: 'w-5 h-5' }), 'Legal Disclaimer'],
                              }),
                              l.jsx(yt, { children: 'Important information about this project' }),
                            ],
                          }),
                          l.jsx(Ke, {
                            children: l.jsxs('p', {
                              className: 'text-sm leading-relaxed',
                              children: [
                                l.jsx('strong', { children: 'DISCLAIMER:' }),
                                ' This project and site are in no way officially supported, endorsed, or recognized by The LEGO Group. Manic Miners is a fan-made tribute to the original LEGO Rock Raiders game and is developed independently by the community.',
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            l.jsx('div', { className: 'h-20' }),
          ],
        }),
      })
    );
  },
  iM = ({ onNotificationUpdate: e, removeNotification: t }) => l.jsx(oM, { onNotificationUpdate: e, removeNotification: t });
function aM({ versions: e, selectedVersion: t, onVersionChange: n }) {
  const r = o => (o ? l.jsx(Mo, { className: 'w-4 h-4' }) : l.jsx(jx, { className: 'w-4 h-4' })),
    s = o => (o ? 'secondary' : 'default');
  return l.jsxs(Yd, {
    value: t,
    onValueChange: n,
    children: [
      l.jsx(Dl, { className: 'bg-input border-border', children: l.jsx(Xd, { placeholder: 'Select version...' }) }),
      l.jsx(Fl, {
        className: 'bg-popover border-border',
        children: e.map(o =>
          l.jsx(
            Lt,
            {
              value: o.version,
              children: l.jsxs('div', {
                className: 'flex items-center gap-2',
                children: [
                  r(o.experimental),
                  o.displayName,
                  l.jsx(br, { variant: s(o.experimental), className: 'ml-2', children: o.experimental ? 'experimental' : 'stable' }),
                ],
              }),
            },
            o.version
          )
        ),
      }),
    ],
  });
}
function Ng({ version: e }) {
  const t = n => (n ? 'secondary' : 'default');
  return l.jsxs('div', {
    className: 'p-4 rounded-lg bg-secondary/50 border border-border hover:bg-secondary/50',
    children: [
      l.jsxs('div', {
        className: 'flex gap-4',
        children: [
          l.jsx('div', {
            className: 'flex-shrink-0',
            children: l.jsx('img', {
              src: e.thumbnailUrl,
              alt: `${e.title} thumbnail`,
              className: 'w-16 h-16 rounded object-cover border border-border',
              onError: n => {
                n.currentTarget.style.display = 'none';
              },
            }),
          }),
          l.jsxs('div', {
            className: 'flex-1 space-y-2',
            children: [
              l.jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  l.jsx('h4', { className: 'font-medium text-secondary-foreground', children: e.title }),
                  l.jsx(br, { variant: t(e.experimental), children: e.experimental ? 'experimental' : 'stable' }),
                ],
              }),
              l.jsxs('div', {
                className: 'grid grid-cols-2 gap-2 text-sm text-muted-foreground',
                children: [
                  l.jsxs('div', {
                    children: [
                      l.jsx('span', { className: 'font-medium', children: 'Release Date:' }),
                      ' ',
                      new Date(e.releaseDate).toLocaleDateString(),
                    ],
                  }),
                  l.jsxs('div', { children: [l.jsx('span', { className: 'font-medium', children: 'File Size:' }), ' ', e.size] }),
                ],
              }),
            ],
          }),
        ],
      }),
      l.jsx('div', {
        className: 'mt-3',
        children: l.jsx('p', { className: 'text-sm text-muted-foreground', children: e.description || 'No description available.' }),
      }),
    ],
  });
}
function kg({ version: e, isInstalled: t, onInstallOrLaunch: n, onDelete: r, onRepair: s, onCreateShortcuts: o }) {
  return e
    ? l.jsxs('div', {
        className: 'space-y-3',
        children: [
          l.jsx(Ne, {
            variant: 'energy',
            className: 'w-full',
            size: 'lg',
            onClick: n,
            children: t
              ? l.jsxs(l.Fragment, { children: [l.jsx(Li, { className: 'w-5 h-5 mr-2' }), 'Launch Game'] })
              : l.jsxs(l.Fragment, { children: [l.jsx(Js, { className: 'w-4 h-4 mr-2' }), 'Install Game'] }),
          }),
          t &&
            l.jsxs('div', {
              className: 'grid grid-cols-2 gap-2',
              children: [
                l.jsxs(Ne, { variant: 'outline', size: 'sm', onClick: s, children: [l.jsx(Nl, { className: 'w-4 h-4 mr-1' }), 'Verify'] }),
                o &&
                  l.jsxs(Ne, {
                    variant: 'outline',
                    size: 'sm',
                    onClick: o,
                    title: 'Create desktop and application shortcuts',
                    children: [l.jsx(Oi, { className: 'w-4 h-4 mr-1' }), 'Shortcuts'],
                  }),
                l.jsxs(Ne, {
                  variant: 'outline',
                  size: 'sm',
                  onClick: r,
                  className: 'text-destructive hover:text-destructive col-span-2',
                  children: [l.jsx(kl, { className: 'w-4 h-4 mr-1' }), 'Uninstall'],
                }),
              ],
            }),
        ],
      })
    : null;
}
function _g(e) {
  return e.split('.').map(t => parseInt(t, 10) || 0);
}
function lM(e, t) {
  const n = _g(e),
    r = _g(t);
  for (let s = 0; s < Math.max(n.length, r.length); s++) {
    const o = n[s] || 0,
      i = r[s] || 0;
    if (o !== i) return i - o;
  }
  return 0;
}
function Pg(e) {
  return [...e].sort((t, n) => lM(t.version, n.version));
}
function cM({ onDownloadStart: e, onDownloadEnd: t, onNotificationUpdate: n, removeNotification: r }) {
  const [s, o] = d.useState([]),
    [i, a] = d.useState(''),
    [c, u] = d.useState(!0),
    [f, p] = d.useState(new Set()),
    [h, m] = d.useState(''),
    [S, v] = d.useState(!1),
    [w, x] = d.useState(0),
    [g, y] = d.useState(''),
    [b, C] = d.useState(''),
    [k, N] = d.useState(0),
    [P, T] = d.useState('0 MB/s'),
    [R, H] = d.useState('--:--'),
    [$, Y] = d.useState(!1),
    [O, X] = d.useState(0),
    [I, z] = d.useState(''),
    [_, E] = d.useState(!1),
    [A, Z] = d.useState(0),
    [W, J] = d.useState('');
  d.useEffect(() => {
    const G = async () => {
      try {
        const re = await (await fetch(bo(Nt.API_ENDPOINTS.VERSIONS_ARCHIVED))).json();
        if (re != null && re.versions) {
          const Oe = Pg(re.versions);
          (o(Oe), Oe.length > 0 && a(Oe[0].version), p(new Set()));
        }
      } catch (ee) {
        de.error('VERSION', 'Failed to fetch versions', { error: ee.message });
      } finally {
        u(!1);
      }
    };
    window.electronAPI
      ? (window.electronAPI.send('get-directories'),
        window.electronAPI.receiveOnce('get-directories', ee => {
          ee != null && ee.status && m(ee.directories.launcherInstallPath);
        }),
        window.electronAPI.send('request-archived-versions-information'),
        window.electronAPI.receiveOnce('request-archived-versions-information', ee => {
          if (ee != null && ee.versions) {
            const re = Pg(ee.versions);
            (o(re), ee.defaultVersion ? a(ee.defaultVersion.version) : re.length > 0 && a(re[0].version));
            const Oe = new Set(re.filter(Je => Je.directory).map(Je => Je.version));
            p(Oe);
          }
          u(!1);
        }))
      : G();
  }, []);
  const V = s.find(G => G.version === i),
    pe = G => f.has(G),
    ge = () => {
      if (!(!V || !window.electronAPI))
        if (pe(V.version)) window.electronAPI.send('launch-game', V.identifier);
        else {
          if (!h) return;
          (e == null || e(),
            v(!0),
            x(0),
            window.electronAPI.send('download-version', { version: V.identifier, downloadPath: h }),
            window.electronAPI.receiveOnce('download-version', G => {
              (v(!1), t == null || t(), G != null && G.downloaded && p(ee => new Set([...ee, V.version])));
            }));
        }
    },
    F = () => {
      !V ||
        !window.electronAPI ||
        (E(!0),
        Z(0),
        J('Removing game files...'),
        window.electronAPI.receive('delete-progress', G => {
          G.progress !== void 0 &&
            (Z(G.progress),
            G.status && J(G.status),
            G.progress >= 100 &&
              setTimeout(() => {
                (E(!1), window.electronAPI.removeAllListeners('delete-progress'));
              }, 1e3));
        }),
        window.electronAPI.receiveOnce('delete-version', G => {
          G != null && G.deleted
            ? p(ee => {
                const re = new Set(ee);
                return (re.delete(V.version), re);
              })
            : G != null && G.error && (J('Failed to delete version'), E(!1), window.electronAPI.removeAllListeners('delete-progress'));
        }),
        window.electronAPI.send('delete-version', V.identifier));
    },
    he = async () => {
      !V ||
        !window.electronAPI ||
        (Y(!0),
        X(0),
        z('Checking files...'),
        window.electronAPI.receive('repair-progress', G => {
          G.progress !== void 0 &&
            (X(G.progress),
            G.status && z(G.status),
            G.progress >= 100 &&
              setTimeout(() => {
                (Y(!1), window.electronAPI.removeAllListeners('repair-progress'));
              }, 1e3));
        }),
        window.electronAPI.receiveOnce('repair-version', G => {
          G != null && G.error && (z('Failed to repair version'), Y(!1), window.electronAPI.removeAllListeners('repair-progress'));
        }),
        window.electronAPI.send('repair-version', V.identifier));
    },
    me = async () => {
      !V ||
        !window.electronAPI ||
        window.electronAPI.send('create-shortcuts', { version: V.identifier, options: { createExeShortcut: !0, createDirShortcut: !1 } });
    };
  return c
    ? l.jsxs('div', {
        className: 'container mx-auto p-6 flex-1 min-h-0',
        children: [
          l.jsx('div', {
            className: 'space-y-8',
            children: l.jsxs(We, {
              className: 'mining-surface energy-glow border-primary/20',
              children: [
                l.jsx(qe, {
                  className: 'pb-6',
                  children: l.jsxs('div', {
                    className: 'animate-pulse space-y-3',
                    children: [
                      l.jsx('div', { className: 'h-6 bg-muted rounded w-1/3' }),
                      l.jsx('div', { className: 'h-4 bg-muted rounded w-2/3' }),
                    ],
                  }),
                }),
                l.jsx(Ke, {
                  children: l.jsxs('div', {
                    className: 'animate-pulse space-y-4',
                    children: [
                      l.jsx('div', { className: 'h-12 bg-muted rounded' }),
                      l.jsx('div', { className: 'h-4 bg-muted rounded w-3/4' }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          l.jsx('div', { className: 'h-20' }),
        ],
      })
    : l.jsxs('div', {
        className: 'container mx-auto p-6 flex-1 min-h-0',
        children: [
          l.jsxs('div', {
            className: 'space-y-8',
            children: [
              l.jsxs(We, {
                className: 'mining-surface border-primary/20 shadow-lg overflow-hidden',
                children: [
                  l.jsx(qe, {
                    className: 'border-b border-border/50 pb-4',
                    children: l.jsxs('div', {
                      className: 'flex items-center gap-2',
                      children: [
                        l.jsx('div', {
                          className: 'w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center',
                          children: l.jsx(As, { className: 'w-4 h-4 text-primary' }),
                        }),
                        l.jsxs('div', {
                          children: [
                            l.jsx(ot, { className: 'text-lg text-primary', children: 'Select Version' }),
                            l.jsx(yt, { children: 'Choose from stable releases and experimental builds' }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  l.jsx(Ke, { className: 'p-6', children: l.jsx(aM, { versions: s, selectedVersion: i, onVersionChange: a }) }),
                ],
              }),
              l.jsx('div', {
                className: 'xl:hidden',
                children: l.jsxs(We, {
                  className: 'mining-surface border-primary/20 shadow-lg overflow-hidden',
                  children: [
                    l.jsx(qe, {
                      className: 'border-b border-border/50 pb-4',
                      children: l.jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                          l.jsx('div', {
                            className: 'w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center',
                            children: l.jsx(As, { className: 'w-4 h-4 text-primary' }),
                          }),
                          l.jsxs('div', {
                            children: [
                              l.jsx(ot, { className: 'text-lg text-primary', children: 'Actions' }),
                              l.jsx(yt, { children: 'Install, launch, or manage' }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    l.jsx(Ke, {
                      className: 'p-6',
                      children: l.jsx(kg, {
                        version: V,
                        isInstalled: V ? pe(V.version) : !1,
                        onInstallOrLaunch: ge,
                        onDelete: F,
                        onRepair: he,
                        onCreateShortcuts: me,
                      }),
                    }),
                  ],
                }),
              }),
              l.jsxs('div', {
                className: 'hidden xl:grid xl:grid-cols-3 gap-6',
                children: [
                  V &&
                    l.jsxs(We, {
                      className: 'mining-surface border-primary/20 shadow-lg xl:col-span-2 overflow-hidden',
                      children: [
                        l.jsx(qe, {
                          className: 'border-b border-border/50 pb-4',
                          children: l.jsxs('div', {
                            className: 'flex items-center gap-2',
                            children: [
                              l.jsx('div', {
                                className: 'w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center',
                                children: l.jsx(As, { className: 'w-4 h-4 text-primary' }),
                              }),
                              l.jsxs('div', {
                                children: [
                                  l.jsx(ot, { className: 'text-lg text-primary', children: 'Version Details' }),
                                  l.jsxs(yt, { children: ['Information about ', V.displayName] }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        l.jsx(Ke, { className: 'p-6', children: l.jsx(Ng, { version: V }) }),
                      ],
                    }),
                  l.jsxs(We, {
                    className: 'mining-surface border-primary/20 shadow-lg overflow-hidden self-start',
                    children: [
                      l.jsx(qe, {
                        className: 'border-b border-border/50 pb-4',
                        children: l.jsxs('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            l.jsx('div', {
                              className: 'w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center',
                              children: l.jsx(As, { className: 'w-4 h-4 text-primary' }),
                            }),
                            l.jsxs('div', {
                              children: [
                                l.jsx(ot, { className: 'text-lg text-primary', children: 'Actions' }),
                                l.jsx(yt, { children: 'Install, launch, or manage' }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      l.jsx(Ke, {
                        className: 'p-6',
                        children: l.jsx(kg, {
                          version: V,
                          isInstalled: V ? pe(V.version) : !1,
                          onInstallOrLaunch: ge,
                          onDelete: F,
                          onRepair: he,
                          onCreateShortcuts: me,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              l.jsx('div', {
                className: 'xl:hidden',
                children:
                  V &&
                  l.jsxs(We, {
                    className: 'mining-surface border-primary/20 shadow-lg overflow-hidden',
                    children: [
                      l.jsx(qe, {
                        className: 'border-b border-border/50 pb-4',
                        children: l.jsxs('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            l.jsx('div', {
                              className: 'w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center',
                              children: l.jsx(As, { className: 'w-4 h-4 text-primary' }),
                            }),
                            l.jsxs('div', {
                              children: [
                                l.jsx(ot, { className: 'text-lg text-primary', children: 'Version Details' }),
                                l.jsxs(yt, { children: ['Information about ', V.displayName] }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      l.jsx(Ke, { className: 'p-6', children: l.jsx(Ng, { version: V }) }),
                    ],
                  }),
              }),
            ],
          }),
          l.jsx('div', { className: 'h-20' }),
        ],
      });
}
const uM = ({ onNotificationUpdate: e, removeNotification: t }) =>
    l.jsx('div', {
      className: 'h-full flex flex-col overflow-y-auto relative',
      children: l.jsx(cM, { onNotificationUpdate: e, removeNotification: t }),
    }),
  dM = () => {
    const e = [
      {
        question: 'What is this?',
        answer:
          'Manic Miners is a complete faithful remake of the 1999 game LEGO Rock Raiders. It has been in development since May 2019 and is developed by a single person; Baraklava.',
      },
      {
        question: 'Is this game sponsored by The Lego Group?',
        answer:
          'This game is not authorized, sponsored, endorsed, or has anything to do with The Lego Group, although I definitely wish I worked for them!',
      },
      {
        question: 'Why are you doing this project?',
        answer:
          'For fun! Rock Raiders is my favourite LEGO theme, from a time when LEGO was a company of experimentation and fearlessness. While those times were monetarily harsh for LEGO, they have left an impression that I want to carry on by remaking this game and hopefully keep the memory of this franchise alive. During college, I discovered a love for programming, and my love for Lego was also rekindled. I saw an opportunity to create a Rock Raiders remake with a standard of quality that I wanted to play myself and just went for it!',
      },
      {
        question: 'Is the game going to cost anything?',
        answer:
          'The game will always be free. Such is the spirit of the Lego community, and I just want to make a really neat game for this niche but loving fanbase. After I feel finished with the game, I might consider pursuing a commercial spiritual successor years down the line, but Manic Miners will always be free and a labor of love.',
      },
      {
        question: 'This is your first game and you are a solo developer. What makes you think you can complete this project on your own?',
        answer: `I work hard, I program well, and my pipelines for the project are insanely efficient. Rather than being a Lego fan driven by will alone, I have a really solid engineering and programming basis to stand on, as well as the simplest programming IDE you can imagine. No one has gotten as far as I have gotten, but no one has also had the same premise I have. I aim to keep programming in my spare time until it is done.

And while it's true I haven't made any games before, I've been programming quite a lot. Unreal Engine is incredibly intuitive in addition to the quick programming pipeline it provides, and I've had little to no troubles making the game work, as it mostly comes down to doing maths.

Also if you're reading this, I already made it :3`,
      },
      {
        question: 'Is the game open source?',
        answer:
          'The game is not open source, but might be at some point in the future when I feel done with it. I am however looking into modding support.',
      },
      {
        question: 'Will it be available for Mac/Linux?',
        answer:
          'I hope that it eventually will, but it might take some time. In the meantime, I have heard people having success running it with Wine/Proton on Linux, and the Game Porting Toolkit on Mac.',
      },
      {
        question: 'How can I contribute to the project?',
        answer:
          "As I've mentioned, I am the only programmer, and am therefore not looking for programming help. I am however definitely open to other collaborations! If you make assets that you want to contribute to the game. Such as art, models or other fun stuff that fits the game, you can share them in my Discord or reach out to me directly.",
      },
      {
        question: 'What about donations and Patreon?',
        answer:
          "I'm not looking for any monetary returns, I don't need the money. Please enjoy the game guilt-free! I do this because it's rewarding in other ways. To emphasize this, I'm refusing all donations and funding possibilities. Refusing donations also allows me to work at my own pace. If you want to contribute anything that isn't money, I sometimes request help over at the Discord server. I'm always open to chat!",
      },
      {
        question: 'When will feature x be added?',
        answer:
          "If there is a feature you want to see added, you can discuss it in my Discord server! However, every requested feature cannot be added, even if it's good, because it takes time to implement. Please consider any plans or promises that have been made during development to be wishes rather than promises.",
      },
    ];
    return l.jsx('div', {
      className: 'h-full flex flex-col overflow-y-auto relative',
      children: l.jsxs('div', {
        className: 'container mx-auto p-6 flex-1 min-h-0',
        children: [
          l.jsxs('div', {
            className: 'space-y-8',
            children: [
              l.jsx('div', {
                className: 'flex justify-center',
                children: l.jsxs('div', {
                  className: 'flex items-center gap-4 mb-4',
                  children: [
                    l.jsx('div', {
                      className:
                        'w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center energy-glow',
                      children: l.jsx(op, { className: 'w-6 h-6 text-primary-foreground animate-pulse-energy' }),
                    }),
                    l.jsxs('div', {
                      children: [
                        l.jsx('h1', { className: 'text-3xl font-bold text-foreground', children: 'Frequently Asked Questions' }),
                        l.jsx('p', {
                          className: 'text-muted-foreground',
                          children: 'Find answers to the most common questions about Manic Miners',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              l.jsx(We, {
                className: 'mining-surface border-primary/20 shadow-lg overflow-hidden',
                children: l.jsx(Ke, {
                  className: 'p-6',
                  children: l.jsxs('p', {
                    className: 'text-center text-muted-foreground',
                    children: [
                      l.jsx('strong', { children: 'About This Launcher:' }),
                      " This launcher was built by Wal33D to enhance the ManicMiners experience in homage to Baraklava's hard work on creating this amazing Rock Raiders remake. This is an open source project - feel free to contribute on",
                      ' ',
                      l.jsx(Ne, {
                        variant: 'link',
                        className: 'p-0 h-auto text-muted-foreground underline',
                        onClick: () => window.open('https://github.com/Wal33D/manic-miners-launcher', '_blank'),
                        children: 'GitHub',
                      }),
                      '!',
                    ],
                  }),
                }),
              }),
              l.jsx('div', {
                className: 'flex justify-center',
                children: l.jsxs(Ne, {
                  variant: 'outline',
                  onClick: () => window.open('https://discord.gg/C3hH7mFsMv', '_blank'),
                  children: [l.jsx(Oi, { className: 'w-4 h-4 mr-2' }), 'Join Discord'],
                }),
              }),
              l.jsx('div', {
                className: 'space-y-6',
                children: e.map((t, n) =>
                  l.jsxs(
                    We,
                    {
                      className: 'mining-surface border-primary/20 shadow-lg overflow-hidden',
                      children: [
                        l.jsx(qe, {
                          className: 'border-b border-border/50 pb-4',
                          children: l.jsx(ot, { className: 'text-lg text-primary', children: t.question }),
                        }),
                        l.jsx(Ke, {
                          className: 'p-6',
                          children: l.jsx('div', { className: 'text-muted-foreground whitespace-pre-line', children: t.answer }),
                        }),
                      ],
                    },
                    n
                  )
                ),
              }),
              l.jsx('div', {
                className: 'text-center',
                children: l.jsxs(We, {
                  className: 'mining-surface border-primary/20 shadow-lg overflow-hidden',
                  children: [
                    l.jsxs(qe, {
                      className: 'border-b border-border/50 pb-4',
                      children: [
                        l.jsx(ot, { className: 'text-lg text-primary', children: 'Still have questions?' }),
                        l.jsx(yt, { children: 'Join our Discord community to get help from other players and the developer!' }),
                      ],
                    }),
                    l.jsx(Ke, {
                      className: 'p-6',
                      children: l.jsxs(Ne, {
                        onClick: () => window.open('https://discord.gg/C3hH7mFsMv', '_blank'),
                        className: 'w-full',
                        children: [l.jsx(Oi, { className: 'w-4 h-4 mr-2' }), 'Join Discord Community'],
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
          l.jsx('div', { className: 'h-20' }),
        ],
      }),
    });
  },
  fM = () => {
    const e = $o();
    return (
      d.useEffect(() => {
        de.error('NotFound', '404 Error: User attempted to access non-existent route', { path: e.pathname });
      }, [e.pathname]),
      l.jsx('div', {
        className: 'min-h-screen flex items-center justify-center bg-gray-100',
        children: l.jsxs('div', {
          className: 'text-center',
          children: [
            l.jsx('h1', { className: 'text-4xl font-bold mb-4', children: '404' }),
            l.jsx('p', { className: 'text-xl text-gray-600 mb-4', children: 'Oops! Page not found' }),
            l.jsx('a', { href: '/', className: 'text-blue-500 hover:text-blue-700 underline', children: 'Return to Home' }),
          ],
        }),
      })
    );
  },
  pM = new fP(),
  hM = () => {
    const [e, t] = d.useState([]);
    d.useEffect(
      () =>
        window.electronAPI
          ? ((() => {
              (window.electronAPI.receive('download-latest-progress', a => {
                if ((de.debug('DOWNLOAD', 'Global download progress', a), a.progress !== void 0)) {
                  const c = {
                    id: 'latest-download',
                    type: 'download',
                    title: 'Game Download',
                    fileName: `ManicMinersV${a.version || 'Latest'}.zip`,
                    fileSize: '1.0 GB',
                    progress: a.progress,
                    speed: '15.2 MB/s',
                    eta: '0:24',
                    status: a.status || 'Downloading version file...',
                    isActive: !0,
                  };
                  (n(c), a.progress >= 100 && (de.info('DOWNLOAD', 'Download complete, removing notification'), r('latest-download')));
                }
              }),
                window.electronAPI.receive('verify-repair-progress', a => {
                  if (a.progress !== void 0) {
                    const c = {
                      id: 'latest-verify',
                      type: 'repair',
                      title: 'Game Verification',
                      fileName: `ManicMinersV${a.version || 'Latest'}`,
                      progress: a.progress,
                      status: a.status || 'Verifying installation...',
                      isActive: !0,
                    };
                    (n(c), a.progress >= 100 && r('latest-verify'));
                  }
                }),
                window.electronAPI.receive('delete-latest-progress', a => {
                  if (a.progress !== void 0) {
                    const c = {
                      id: 'latest-uninstall',
                      type: 'delete',
                      title: 'Game Uninstall',
                      fileName: `ManicMinersV${a.version || 'Latest'}`,
                      progress: a.progress,
                      status: a.status || 'Starting uninstall...',
                      isActive: !0,
                    };
                    (n(c), a.progress >= 100 && r('latest-uninstall'));
                  }
                }),
                window.electronAPI.receive('update-progress', a => {
                  if (a.progress !== void 0) {
                    const c = {
                      id: 'latest-update',
                      type: 'download',
                      title: 'Game Update',
                      fileName: `ManicMinersV${a.version || 'Latest'}`,
                      fileSize: '1.0 GB',
                      progress: a.progress,
                      speed: '15.2 MB/s',
                      eta: '0:24',
                      status: a.status || 'Updating to latest version...',
                      isActive: !0,
                    };
                    (n(c), a.progress >= 100 && r('latest-update'));
                  }
                }),
                window.electronAPI.receive('download-progress', a => {
                  if (a.progress !== void 0) {
                    const c = {
                      id: 'download',
                      type: 'download',
                      title: 'Game Download',
                      fileName: a.fileName || 'ManicMiners.zip',
                      fileSize: a.totalSize ? `${(a.totalSize / 1024 / 1024).toFixed(1)} MB` : '528.0 MB',
                      progress: a.progress,
                      speed: a.speedBytesPerSec ? `${(a.speedBytesPerSec / 1024 / 1024).toFixed(1)} MB/s` : '15.2 MB/s',
                      eta: a.etaSeconds ? `${Math.floor(a.etaSeconds / 60)}:${(a.etaSeconds % 60).toString().padStart(2, '0')}` : '0:24',
                      status: a.status || 'Downloading version file...',
                      isActive: !0,
                    };
                    (n(c), a.progress >= 100 && r('download'));
                  }
                }),
                window.electronAPI.receive('create-shortcuts-progress', a => {
                  if (a.progress !== void 0) {
                    const c = {
                      id: 'shortcut-creation',
                      type: 'info',
                      title: 'Creating Shortcuts',
                      message: 'Creating desktop and menu shortcuts...',
                      progress: a.progress,
                      status: a.status || 'Creating shortcuts...',
                      isActive: !0,
                    };
                    (n(c), a.progress >= 100 && r('shortcut-creation'));
                  }
                }));
            })(),
            () => {
              (window.electronAPI.removeAllListeners('download-latest-progress'),
                window.electronAPI.removeAllListeners('verify-repair-progress'),
                window.electronAPI.removeAllListeners('delete-latest-progress'),
                window.electronAPI.removeAllListeners('update-progress'),
                window.electronAPI.removeAllListeners('download-progress'),
                window.electronAPI.removeAllListeners('create-shortcuts-progress'));
            })
          : void 0,
      []
    );
    const n = i => {
        t(a => {
          const c = a.findIndex(u => u.id === i.id);
          if (c >= 0) {
            const u = [...a];
            return ((u[c] = i), u);
          } else return [...a, i];
        });
      },
      r = i => {
        t(a => a.filter(c => c.id !== i));
      },
      s = i => {
        t(a => {
          const c = [...a];
          return (
            i.forEach(u => {
              const f = c.findIndex(p => p.id === u.id);
              f >= 0 ? (c[f] = u) : c.push(u);
            }),
            c
          );
        });
      },
      o = i => {
        r(i);
      };
    return l.jsx(hP, {
      client: pM,
      children: l.jsxs(U2, {
        children: [
          l.jsx(kk, {}),
          l.jsx(s_, {}),
          l.jsx(fj, {
            children: l.jsxs('div', {
              className: 'h-screen bg-background flex flex-col overflow-hidden',
              children: [
                l.jsx(oA, { notifications: e, onDismiss: o }),
                l.jsx(WI, {}),
                l.jsx('main', {
                  className: 'flex-1 overflow-hidden',
                  children: l.jsxs(sj, {
                    children: [
                      l.jsx(si, { path: '/', element: l.jsx(iM, { onNotificationUpdate: s, removeNotification: r }) }),
                      l.jsx(si, { path: '/game-versions', element: l.jsx(uM, { onNotificationUpdate: s, removeNotification: r }) }),
                      l.jsx(si, { path: '/faq', element: l.jsx(dM, {}) }),
                      l.jsx(si, { path: '*', element: l.jsx(fM, {}) }),
                    ],
                  }),
                }),
                l.jsx(YI, {}),
              ],
            }),
          }),
        ],
      }),
    });
  },
  mM = 'https://manic-launcher.vercel.app';
async function gM() {
  try {
    const e = await fetch(`${mM}/api/images`);
    if (!e.ok) return;
    const t = await e.json();
    if (!t.images) return;
    const n = ['manic-miners-basic.ico', 'manic-miners-alt-icon.ico'];
    for (const r of n) {
      const s = t.images[r];
      if (s) {
        const o = s.cloudinaryUrl || s.internalUrl;
        document.querySelectorAll("link[rel*='icon']").forEach(u => u.remove());
        const a = document.createElement('link');
        ((a.rel = 'icon'), (a.type = 'image/x-icon'), (a.href = o), document.head.appendChild(a));
        const c = document.createElement('link');
        ((c.rel = 'shortcut icon'), (c.href = o), document.head.appendChild(c));
        break;
      }
    }
  } catch (e) {
    console.error('Failed to update favicon:', e);
  }
}
class vM extends d.Component {
  constructor(n) {
    super(n);
    Bo(this, 'handleReset', () => {
      this.setState({ hasError: !1, error: null, errorInfo: null });
    });
    this.state = { hasError: !1, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(n) {
    return { hasError: !0, error: n, errorInfo: null };
  }
  componentDidCatch(n, r) {
    (de.error('ERROR_BOUNDARY', 'Component error caught', { error: n.toString(), componentStack: r.componentStack, errorBoundary: !0 }),
      this.setState({ error: n, errorInfo: r }));
  }
  render() {
    return this.state.hasError
      ? this.props.fallback
        ? l.jsx(l.Fragment, { children: this.props.fallback })
        : l.jsx('div', {
            className: 'min-h-[400px] flex items-center justify-center p-6',
            children: l.jsxs(We, {
              className: 'max-w-lg w-full mining-surface',
              children: [
                l.jsxs(qe, {
                  children: [
                    l.jsxs('div', {
                      className: 'flex items-center gap-2',
                      children: [
                        l.jsx(Mo, { className: 'w-6 h-6 text-destructive' }),
                        l.jsx(ot, { className: 'text-destructive', children: 'Something went wrong' }),
                      ],
                    }),
                    l.jsx(yt, { children: 'An unexpected error occurred. The error has been logged.' }),
                  ],
                }),
                l.jsxs(Ke, {
                  className: 'space-y-4',
                  children: [
                    !1,
                    l.jsxs('div', {
                      className: 'flex gap-2',
                      children: [
                        l.jsxs(Ne, {
                          onClick: this.handleReset,
                          variant: 'default',
                          className: 'flex-1',
                          children: [l.jsx(Px, { className: 'w-4 h-4 mr-2' }), 'Try Again'],
                        }),
                        l.jsx(Ne, {
                          onClick: () => window.location.reload(),
                          variant: 'outline',
                          className: 'flex-1',
                          children: 'Reload Page',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          })
      : this.props.children;
  }
}
gM();
Yy(document.getElementById('root')).render(l.jsx(vM, { children: l.jsx(hM, {}) }));
