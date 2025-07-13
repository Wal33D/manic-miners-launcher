var Ff = e => {
  throw TypeError(e);
};
var Ll = (e, t, n) => t.has(e) || Ff('Cannot ' + n);
var R = (e, t, n) => (Ll(e, t, 'read from private field'), n ? n.call(e) : t.get(e)),
  le = (e, t, n) => (t.has(e) ? Ff('Cannot add the same private member more than once') : t instanceof WeakSet ? t.add(e) : t.set(e, n)),
  Z = (e, t, n, r) => (Ll(e, t, 'write to private field'), r ? r.call(e, n) : t.set(e, n), n),
  Le = (e, t, n) => (Ll(e, t, 'access private method'), n);
var hi = (e, t, n, r) => ({
  set _(o) {
    Z(e, t, o, n);
  },
  get _() {
    return R(e, t, r);
  },
});
function v1(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const o in r)
        if (o !== 'default' && !(o in e)) {
          const s = Object.getOwnPropertyDescriptor(r, o);
          s && Object.defineProperty(e, o, s.get ? s : { enumerable: !0, get: () => r[o] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }));
}
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver(o => {
    for (const s of o) if (s.type === 'childList') for (const i of s.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (s.credentials = 'omit')
          : (s.credentials = 'same-origin'),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
})();
function tm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var nm = { exports: {} },
  Wa = {},
  rm = { exports: {} },
  ee = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ei = Symbol.for('react.element'),
  g1 = Symbol.for('react.portal'),
  y1 = Symbol.for('react.fragment'),
  x1 = Symbol.for('react.strict_mode'),
  w1 = Symbol.for('react.profiler'),
  S1 = Symbol.for('react.provider'),
  C1 = Symbol.for('react.context'),
  E1 = Symbol.for('react.forward_ref'),
  b1 = Symbol.for('react.suspense'),
  N1 = Symbol.for('react.memo'),
  P1 = Symbol.for('react.lazy'),
  $f = Symbol.iterator;
function k1(e) {
  return e === null || typeof e != 'object' ? null : ((e = ($f && e[$f]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var om = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  sm = Object.assign,
  im = {};
function zo(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = im), (this.updater = n || om));
}
zo.prototype.isReactComponent = {};
zo.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error('setState(...): takes an object of state variables to update or a function which returns an object of state variables.');
  this.updater.enqueueSetState(this, e, t, 'setState');
};
zo.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function am() {}
am.prototype = zo.prototype;
function Qc(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = im), (this.updater = n || om));
}
var Yc = (Qc.prototype = new am());
Yc.constructor = Qc;
sm(Yc, zo.prototype);
Yc.isPureReactComponent = !0;
var zf = Array.isArray,
  lm = Object.prototype.hasOwnProperty,
  Xc = { current: null },
  um = { key: !0, ref: !0, __self: !0, __source: !0 };
function cm(e, t, n) {
  var r,
    o = {},
    s = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (s = '' + t.key), t))
      lm.call(t, r) && !um.hasOwnProperty(r) && (o[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) o.children = n;
  else if (1 < a) {
    for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2];
    o.children = l;
  }
  if (e && e.defaultProps) for (r in ((a = e.defaultProps), a)) o[r] === void 0 && (o[r] = a[r]);
  return { $$typeof: ei, type: e, key: s, ref: i, props: o, _owner: Xc.current };
}
function T1(e, t) {
  return { $$typeof: ei, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function qc(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === ei;
}
function R1(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Bf = /\/+/g;
function Fl(e, t) {
  return typeof e == 'object' && e !== null && e.key != null ? R1('' + e.key) : t.toString(36);
}
function Bi(e, t, n, r, o) {
  var s = typeof e;
  (s === 'undefined' || s === 'boolean') && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (s) {
      case 'string':
      case 'number':
        i = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case ei:
          case g1:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (o = o(i)),
      (e = r === '' ? '.' + Fl(i, 0) : r),
      zf(o)
        ? ((n = ''),
          e != null && (n = e.replace(Bf, '$&/') + '/'),
          Bi(o, t, n, '', function (u) {
            return u;
          }))
        : o != null &&
          (qc(o) && (o = T1(o, n + (!o.key || (i && i.key === o.key) ? '' : ('' + o.key).replace(Bf, '$&/') + '/') + e)), t.push(o)),
      1
    );
  if (((i = 0), (r = r === '' ? '.' : r + ':'), zf(e)))
    for (var a = 0; a < e.length; a++) {
      s = e[a];
      var l = r + Fl(s, a);
      i += Bi(s, t, n, l, o);
    }
  else if (((l = k1(e)), typeof l == 'function'))
    for (e = l.call(e), a = 0; !(s = e.next()).done; ) ((s = s.value), (l = r + Fl(s, a++)), (i += Bi(s, t, n, l, o)));
  else if (s === 'object')
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
function mi(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Bi(e, r, '', '', function (s) {
      return t.call(n, s, o++);
    }),
    r
  );
}
function j1(e) {
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
var Qe = { current: null },
  Ui = { transition: null },
  M1 = { ReactCurrentDispatcher: Qe, ReactCurrentBatchConfig: Ui, ReactCurrentOwner: Xc };
function dm() {
  throw Error('act(...) is not supported in production builds of React.');
}
ee.Children = {
  map: mi,
  forEach: function (e, t, n) {
    mi(
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
      mi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      mi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!qc(e)) throw Error('React.Children.only expected to receive a single React element child.');
    return e;
  },
};
ee.Component = zo;
ee.Fragment = y1;
ee.Profiler = w1;
ee.PureComponent = Qc;
ee.StrictMode = x1;
ee.Suspense = b1;
ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = M1;
ee.act = dm;
ee.cloneElement = function (e, t, n) {
  if (e == null) throw Error('React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.');
  var r = sm({}, e.props),
    o = e.key,
    s = e.ref,
    i = e._owner;
  if (t != null) {
    if ((t.ref !== void 0 && ((s = t.ref), (i = Xc.current)), t.key !== void 0 && (o = '' + t.key), e.type && e.type.defaultProps))
      var a = e.type.defaultProps;
    for (l in t) lm.call(t, l) && !um.hasOwnProperty(l) && (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var u = 0; u < l; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return { $$typeof: ei, type: e.type, key: o, ref: s, props: r, _owner: i };
};
ee.createContext = function (e) {
  return (
    (e = {
      $$typeof: C1,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: S1, _context: e }),
    (e.Consumer = e)
  );
};
ee.createElement = cm;
ee.createFactory = function (e) {
  var t = cm.bind(null, e);
  return ((t.type = e), t);
};
ee.createRef = function () {
  return { current: null };
};
ee.forwardRef = function (e) {
  return { $$typeof: E1, render: e };
};
ee.isValidElement = qc;
ee.lazy = function (e) {
  return { $$typeof: P1, _payload: { _status: -1, _result: e }, _init: j1 };
};
ee.memo = function (e, t) {
  return { $$typeof: N1, type: e, compare: t === void 0 ? null : t };
};
ee.startTransition = function (e) {
  var t = Ui.transition;
  Ui.transition = {};
  try {
    e();
  } finally {
    Ui.transition = t;
  }
};
ee.unstable_act = dm;
ee.useCallback = function (e, t) {
  return Qe.current.useCallback(e, t);
};
ee.useContext = function (e) {
  return Qe.current.useContext(e);
};
ee.useDebugValue = function () {};
ee.useDeferredValue = function (e) {
  return Qe.current.useDeferredValue(e);
};
ee.useEffect = function (e, t) {
  return Qe.current.useEffect(e, t);
};
ee.useId = function () {
  return Qe.current.useId();
};
ee.useImperativeHandle = function (e, t, n) {
  return Qe.current.useImperativeHandle(e, t, n);
};
ee.useInsertionEffect = function (e, t) {
  return Qe.current.useInsertionEffect(e, t);
};
ee.useLayoutEffect = function (e, t) {
  return Qe.current.useLayoutEffect(e, t);
};
ee.useMemo = function (e, t) {
  return Qe.current.useMemo(e, t);
};
ee.useReducer = function (e, t, n) {
  return Qe.current.useReducer(e, t, n);
};
ee.useRef = function (e) {
  return Qe.current.useRef(e);
};
ee.useState = function (e) {
  return Qe.current.useState(e);
};
ee.useSyncExternalStore = function (e, t, n) {
  return Qe.current.useSyncExternalStore(e, t, n);
};
ee.useTransition = function () {
  return Qe.current.useTransition();
};
ee.version = '18.3.1';
rm.exports = ee;
var d = rm.exports;
const D = tm(d),
  Zc = v1({ __proto__: null, default: D }, [d]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _1 = d,
  I1 = Symbol.for('react.element'),
  A1 = Symbol.for('react.fragment'),
  O1 = Object.prototype.hasOwnProperty,
  D1 = _1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  L1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function fm(e, t, n) {
  var r,
    o = {},
    s = null,
    i = null;
  (n !== void 0 && (s = '' + n), t.key !== void 0 && (s = '' + t.key), t.ref !== void 0 && (i = t.ref));
  for (r in t) O1.call(t, r) && !L1.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return { $$typeof: I1, type: e, key: s, ref: i, props: o, _owner: D1.current };
}
Wa.Fragment = A1;
Wa.jsx = fm;
Wa.jsxs = fm;
nm.exports = Wa;
var c = nm.exports,
  pm = { exports: {} },
  ut = {},
  hm = { exports: {} },
  mm = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(T, P) {
    var O = T.length;
    T.push(P);
    e: for (; 0 < O; ) {
      var V = (O - 1) >>> 1,
        U = T[V];
      if (0 < o(U, P)) ((T[V] = P), (T[O] = U), (O = V));
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var P = T[0],
      O = T.pop();
    if (O !== P) {
      T[0] = O;
      e: for (var V = 0, U = T.length, X = U >>> 1; V < X; ) {
        var Y = 2 * (V + 1) - 1,
          de = T[Y],
          fe = Y + 1,
          L = T[fe];
        if (0 > o(de, O)) fe < U && 0 > o(L, de) ? ((T[V] = L), (T[fe] = O), (V = fe)) : ((T[V] = de), (T[Y] = O), (V = Y));
        else if (fe < U && 0 > o(L, O)) ((T[V] = L), (T[fe] = O), (V = fe));
        else break e;
      }
    }
    return P;
  }
  function o(T, P) {
    var O = T.sortIndex - P.sortIndex;
    return O !== 0 ? O : T.id - P.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var s = performance;
    e.unstable_now = function () {
      return s.now();
    };
  } else {
    var i = Date,
      a = i.now();
    e.unstable_now = function () {
      return i.now() - a;
    };
  }
  var l = [],
    u = [],
    f = 1,
    p = null,
    m = 3,
    v = !1,
    S = !1,
    g = !1,
    w = typeof setTimeout == 'function' ? setTimeout : null,
    x = typeof clearTimeout == 'function' ? clearTimeout : null,
    h = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(T) {
    for (var P = n(u); P !== null; ) {
      if (P.callback === null) r(u);
      else if (P.startTime <= T) (r(u), (P.sortIndex = P.expirationTime), t(l, P));
      else break;
      P = n(u);
    }
  }
  function C(T) {
    if (((g = !1), y(T), !S))
      if (n(l) !== null) ((S = !0), z(E));
      else {
        var P = n(u);
        P !== null && H(C, P.startTime - T);
      }
  }
  function E(T, P) {
    ((S = !1), g && ((g = !1), x(k), (k = -1)), (v = !0));
    var O = m;
    try {
      for (y(P), p = n(l); p !== null && (!(p.expirationTime > P) || (T && !$())); ) {
        var V = p.callback;
        if (typeof V == 'function') {
          ((p.callback = null), (m = p.priorityLevel));
          var U = V(p.expirationTime <= P);
          ((P = e.unstable_now()), typeof U == 'function' ? (p.callback = U) : p === n(l) && r(l), y(P));
        } else r(l);
        p = n(l);
      }
      if (p !== null) var X = !0;
      else {
        var Y = n(u);
        (Y !== null && H(C, Y.startTime - P), (X = !1));
      }
      return X;
    } finally {
      ((p = null), (m = O), (v = !1));
    }
  }
  var N = !1,
    b = null,
    k = -1,
    M = 5,
    j = -1;
  function $() {
    return !(e.unstable_now() - j < M);
  }
  function A() {
    if (b !== null) {
      var T = e.unstable_now();
      j = T;
      var P = !0;
      try {
        P = b(!0, T);
      } finally {
        P ? W() : ((N = !1), (b = null));
      }
    } else N = !1;
  }
  var W;
  if (typeof h == 'function')
    W = function () {
      h(A);
    };
  else if (typeof MessageChannel < 'u') {
    var I = new MessageChannel(),
      G = I.port2;
    ((I.port1.onmessage = A),
      (W = function () {
        G.postMessage(null);
      }));
  } else
    W = function () {
      w(A, 0);
    };
  function z(T) {
    ((b = T), N || ((N = !0), W()));
  }
  function H(T, P) {
    k = w(function () {
      T(e.unstable_now());
    }, P);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (T) {
      T.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      S || v || ((S = !0), z(E));
    }),
    (e.unstable_forceFrameRate = function (T) {
      0 > T || 125 < T
        ? console.error('forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported')
        : (M = 0 < T ? Math.floor(1e3 / T) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (e.unstable_next = function (T) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var P = 3;
          break;
        default:
          P = m;
      }
      var O = m;
      m = P;
      try {
        return T();
      } finally {
        m = O;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (T, P) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var O = m;
      m = T;
      try {
        return P();
      } finally {
        m = O;
      }
    }),
    (e.unstable_scheduleCallback = function (T, P, O) {
      var V = e.unstable_now();
      switch ((typeof O == 'object' && O !== null ? ((O = O.delay), (O = typeof O == 'number' && 0 < O ? V + O : V)) : (O = V), T)) {
        case 1:
          var U = -1;
          break;
        case 2:
          U = 250;
          break;
        case 5:
          U = 1073741823;
          break;
        case 4:
          U = 1e4;
          break;
        default:
          U = 5e3;
      }
      return (
        (U = O + U),
        (T = { id: f++, callback: P, priorityLevel: T, startTime: O, expirationTime: U, sortIndex: -1 }),
        O > V
          ? ((T.sortIndex = O), t(u, T), n(l) === null && T === n(u) && (g ? (x(k), (k = -1)) : (g = !0), H(C, O - V)))
          : ((T.sortIndex = U), t(l, T), S || v || ((S = !0), z(E))),
        T
      );
    }),
    (e.unstable_shouldYield = $),
    (e.unstable_wrapCallback = function (T) {
      var P = m;
      return function () {
        var O = m;
        m = P;
        try {
          return T.apply(this, arguments);
        } finally {
          m = O;
        }
      };
    }));
})(mm);
hm.exports = mm;
var F1 = hm.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $1 = d,
  lt = F1;
function _(e) {
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
var vm = new Set(),
  ks = {};
function Fr(e, t) {
  (Ro(e, t), Ro(e + 'Capture', t));
}
function Ro(e, t) {
  for (ks[e] = t, e = 0; e < t.length; e++) vm.add(t[e]);
}
var hn = !(typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'),
  ku = Object.prototype.hasOwnProperty,
  z1 =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Uf = {},
  Vf = {};
function B1(e) {
  return ku.call(Vf, e) ? !0 : ku.call(Uf, e) ? !1 : z1.test(e) ? (Vf[e] = !0) : ((Uf[e] = !0), !1);
}
function U1(e, t, n, r) {
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
function V1(e, t, n, r) {
  if (t === null || typeof t > 'u' || U1(e, t, n, r)) return !0;
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
function Ye(e, t, n, r, o, s, i) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = s),
    (this.removeEmptyString = i));
}
var Oe = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    Oe[e] = new Ye(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  Oe[t] = new Ye(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  Oe[e] = new Ye(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
  Oe[e] = new Ye(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    Oe[e] = new Ye(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  Oe[e] = new Ye(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  Oe[e] = new Ye(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  Oe[e] = new Ye(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  Oe[e] = new Ye(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Jc = /[\-:]([a-z])/g;
function ed(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Jc, ed);
    Oe[t] = new Ye(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'.split(' ').forEach(function (e) {
  var t = e.replace(Jc, ed);
  Oe[t] = new Ye(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
});
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(Jc, ed);
  Oe[t] = new Ye(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  Oe[e] = new Ye(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Oe.xlinkHref = new Ye('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  Oe[e] = new Ye(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function td(e, t, n, r) {
  var o = Oe.hasOwnProperty(t) ? Oe[t] : null;
  (o !== null ? o.type !== 0 : r || !(2 < t.length) || (t[0] !== 'o' && t[0] !== 'O') || (t[1] !== 'n' && t[1] !== 'N')) &&
    (V1(t, n, o, r) && (n = null),
    r || o === null
      ? B1(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : o.mustUseProperty
        ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : '') : n)
        : ((t = o.attributeName),
          (r = o.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((o = o.type), (n = o === 3 || (o === 4 && n === !0) ? '' : '' + n), r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Cn = $1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  vi = Symbol.for('react.element'),
  Zr = Symbol.for('react.portal'),
  Jr = Symbol.for('react.fragment'),
  nd = Symbol.for('react.strict_mode'),
  Tu = Symbol.for('react.profiler'),
  gm = Symbol.for('react.provider'),
  ym = Symbol.for('react.context'),
  rd = Symbol.for('react.forward_ref'),
  Ru = Symbol.for('react.suspense'),
  ju = Symbol.for('react.suspense_list'),
  od = Symbol.for('react.memo'),
  In = Symbol.for('react.lazy'),
  xm = Symbol.for('react.offscreen'),
  Wf = Symbol.iterator;
function Jo(e) {
  return e === null || typeof e != 'object' ? null : ((e = (Wf && e[Wf]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var Ce = Object.assign,
  $l;
function us(e) {
  if ($l === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      $l = (t && t[1]) || '';
    }
  return (
    `
` +
    $l +
    e
  );
}
var zl = !1;
function Bl(e, t) {
  if (!e || zl) return '';
  zl = !0;
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
        var o = u.stack.split(`
`),
          s = r.stack.split(`
`),
          i = o.length - 1,
          a = s.length - 1;
        1 <= i && 0 <= a && o[i] !== s[a];

      )
        a--;
      for (; 1 <= i && 0 <= a; i--, a--)
        if (o[i] !== s[a]) {
          if (i !== 1 || a !== 1)
            do
              if ((i--, a--, 0 > a || o[i] !== s[a])) {
                var l =
                  `
` + o[i].replace(' at new ', ' at ');
                return (e.displayName && l.includes('<anonymous>') && (l = l.replace('<anonymous>', e.displayName)), l);
              }
            while (1 <= i && 0 <= a);
          break;
        }
    }
  } finally {
    ((zl = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : '') ? us(e) : '';
}
function W1(e) {
  switch (e.tag) {
    case 5:
      return us(e.type);
    case 16:
      return us('Lazy');
    case 13:
      return us('Suspense');
    case 19:
      return us('SuspenseList');
    case 0:
    case 2:
    case 15:
      return ((e = Bl(e.type, !1)), e);
    case 11:
      return ((e = Bl(e.type.render, !1)), e);
    case 1:
      return ((e = Bl(e.type, !0)), e);
    default:
      return '';
  }
}
function Mu(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case Jr:
      return 'Fragment';
    case Zr:
      return 'Portal';
    case Tu:
      return 'Profiler';
    case nd:
      return 'StrictMode';
    case Ru:
      return 'Suspense';
    case ju:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case ym:
        return (e.displayName || 'Context') + '.Consumer';
      case gm:
        return (e._context.displayName || 'Context') + '.Provider';
      case rd:
        var t = e.render;
        return (
          (e = e.displayName),
          e || ((e = t.displayName || t.name || ''), (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case od:
        return ((t = e.displayName || null), t !== null ? t : Mu(e.type) || 'Memo');
      case In:
        ((t = e._payload), (e = e._init));
        try {
          return Mu(e(t));
        } catch {}
    }
  return null;
}
function H1(e) {
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
      return Mu(t);
    case 8:
      return t === nd ? 'StrictMode' : 'Mode';
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
function er(e) {
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
function wm(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
}
function K1(e) {
  var t = wm(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t];
  if (!e.hasOwnProperty(t) && typeof n < 'u' && typeof n.get == 'function' && typeof n.set == 'function') {
    var o = n.get,
      s = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (i) {
          ((r = '' + i), s.call(this, i));
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
function gi(e) {
  e._valueTracker || (e._valueTracker = K1(e));
}
function Sm(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (e && (r = wm(e) ? (e.checked ? 'true' : 'false') : e.value), (e = r), e !== n ? (t.setValue(e), !0) : !1);
}
function sa(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function _u(e, t) {
  var n = t.checked;
  return Ce({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Hf(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = er(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
    }));
}
function Cm(e, t) {
  ((t = t.checked), t != null && td(e, 'checked', t, !1));
}
function Iu(e, t) {
  Cm(e, t);
  var n = er(t.value),
    r = t.type;
  if (n != null)
    r === 'number' ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n) : e.value !== '' + n && (e.value = '' + n);
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value');
    return;
  }
  (t.hasOwnProperty('value') ? Au(e, t.type, n) : t.hasOwnProperty('defaultValue') && Au(e, t.type, er(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked));
}
function Kf(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (!((r !== 'submit' && r !== 'reset') || (t.value !== void 0 && t.value !== null))) return;
    ((t = '' + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t));
  }
  ((n = e.name), n !== '' && (e.name = ''), (e.defaultChecked = !!e._wrapperState.initialChecked), n !== '' && (e.name = n));
}
function Au(e, t, n) {
  (t !== 'number' || sa(e.ownerDocument) !== e) &&
    (n == null ? (e.defaultValue = '' + e._wrapperState.initialValue) : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var cs = Array.isArray;
function co(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      ((o = t.hasOwnProperty('$' + e[n].value)), e[n].selected !== o && (e[n].selected = o), o && r && (e[n].defaultSelected = !0));
  } else {
    for (n = '' + er(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        ((e[o].selected = !0), r && (e[o].defaultSelected = !0));
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ou(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(_(91));
  return Ce({}, t, { value: void 0, defaultValue: void 0, children: '' + e._wrapperState.initialValue });
}
function Gf(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(_(92));
      if (cs(n)) {
        if (1 < n.length) throw Error(_(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ''), (n = t));
  }
  e._wrapperState = { initialValue: er(n) };
}
function Em(e, t) {
  var n = er(t.value),
    r = er(t.defaultValue);
  (n != null && ((n = '' + n), n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r));
}
function Qf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function bm(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function Du(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? bm(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var yi,
  Nm = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t;
    else {
      for (
        yi = yi || document.createElement('div'), yi.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>', t = yi.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Ts(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var gs = {
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
  G1 = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(gs).forEach(function (e) {
  G1.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (gs[t] = gs[e]));
  });
});
function Pm(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (gs.hasOwnProperty(e) && gs[e])
      ? ('' + t).trim()
      : t + 'px';
}
function km(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        o = Pm(n, t[n], r);
      (n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, o) : (e[n] = o));
    }
}
var Q1 = Ce(
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
function Lu(e, t) {
  if (t) {
    if (Q1[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(_(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(_(60));
      if (typeof t.dangerouslySetInnerHTML != 'object' || !('__html' in t.dangerouslySetInnerHTML)) throw Error(_(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(_(62));
  }
}
function Fu(e, t) {
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
var $u = null;
function sd(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var zu = null,
  fo = null,
  po = null;
function Yf(e) {
  if ((e = ri(e))) {
    if (typeof zu != 'function') throw Error(_(280));
    var t = e.stateNode;
    t && ((t = Ya(t)), zu(e.stateNode, e.type, t));
  }
}
function Tm(e) {
  fo ? (po ? po.push(e) : (po = [e])) : (fo = e);
}
function Rm() {
  if (fo) {
    var e = fo,
      t = po;
    if (((po = fo = null), Yf(e), t)) for (e = 0; e < t.length; e++) Yf(t[e]);
  }
}
function jm(e, t) {
  return e(t);
}
function Mm() {}
var Ul = !1;
function _m(e, t, n) {
  if (Ul) return e(t, n);
  Ul = !0;
  try {
    return jm(e, t, n);
  } finally {
    ((Ul = !1), (fo !== null || po !== null) && (Mm(), Rm()));
  }
}
function Rs(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ya(n);
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
  if (n && typeof n != 'function') throw Error(_(231, t, typeof n));
  return n;
}
var Bu = !1;
if (hn)
  try {
    var es = {};
    (Object.defineProperty(es, 'passive', {
      get: function () {
        Bu = !0;
      },
    }),
      window.addEventListener('test', es, es),
      window.removeEventListener('test', es, es));
  } catch {
    Bu = !1;
  }
function Y1(e, t, n, r, o, s, i, a, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (f) {
    this.onError(f);
  }
}
var ys = !1,
  ia = null,
  aa = !1,
  Uu = null,
  X1 = {
    onError: function (e) {
      ((ys = !0), (ia = e));
    },
  };
function q1(e, t, n, r, o, s, i, a, l) {
  ((ys = !1), (ia = null), Y1.apply(X1, arguments));
}
function Z1(e, t, n, r, o, s, i, a, l) {
  if ((q1.apply(this, arguments), ys)) {
    if (ys) {
      var u = ia;
      ((ys = !1), (ia = null));
    } else throw Error(_(198));
    aa || ((aa = !0), (Uu = u));
  }
}
function $r(e) {
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
function Im(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null)) return t.dehydrated;
  }
  return null;
}
function Xf(e) {
  if ($r(e) !== e) throw Error(_(188));
}
function J1(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = $r(e)), t === null)) throw Error(_(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var s = o.alternate;
    if (s === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === s.child) {
      for (s = o.child; s; ) {
        if (s === n) return (Xf(o), e);
        if (s === r) return (Xf(o), t);
        s = s.sibling;
      }
      throw Error(_(188));
    }
    if (n.return !== r.return) ((n = o), (r = s));
    else {
      for (var i = !1, a = o.child; a; ) {
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
      if (!i) {
        for (a = s.child; a; ) {
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
        if (!i) throw Error(_(189));
      }
    }
    if (n.alternate !== r) throw Error(_(190));
  }
  if (n.tag !== 3) throw Error(_(188));
  return n.stateNode.current === n ? e : t;
}
function Am(e) {
  return ((e = J1(e)), e !== null ? Om(e) : null);
}
function Om(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Om(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Dm = lt.unstable_scheduleCallback,
  qf = lt.unstable_cancelCallback,
  eS = lt.unstable_shouldYield,
  tS = lt.unstable_requestPaint,
  Pe = lt.unstable_now,
  nS = lt.unstable_getCurrentPriorityLevel,
  id = lt.unstable_ImmediatePriority,
  Lm = lt.unstable_UserBlockingPriority,
  la = lt.unstable_NormalPriority,
  rS = lt.unstable_LowPriority,
  Fm = lt.unstable_IdlePriority,
  Ha = null,
  qt = null;
function oS(e) {
  if (qt && typeof qt.onCommitFiberRoot == 'function')
    try {
      qt.onCommitFiberRoot(Ha, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Dt = Math.clz32 ? Math.clz32 : aS,
  sS = Math.log,
  iS = Math.LN2;
function aS(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((sS(e) / iS) | 0)) | 0);
}
var xi = 64,
  wi = 4194304;
function ds(e) {
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
function ua(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    s = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var a = i & ~o;
    a !== 0 ? (r = ds(a)) : ((s &= i), s !== 0 && (r = ds(s)));
  } else ((i = n & ~o), i !== 0 ? (r = ds(i)) : s !== 0 && (r = ds(s)));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & o) && ((o = r & -r), (s = t & -t), o >= s || (o === 16 && (s & 4194240) !== 0))) return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; ) ((n = 31 - Dt(t)), (o = 1 << n), (r |= e[n]), (t &= ~o));
  return r;
}
function lS(e, t) {
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
function uS(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, s = e.pendingLanes; 0 < s; ) {
    var i = 31 - Dt(s),
      a = 1 << i,
      l = o[i];
    (l === -1 ? (!(a & n) || a & r) && (o[i] = lS(a, t)) : l <= t && (e.expiredLanes |= a), (s &= ~a));
  }
}
function Vu(e) {
  return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0);
}
function $m() {
  var e = xi;
  return ((xi <<= 1), !(xi & 4194240) && (xi = 64), e);
}
function Vl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ti(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Dt(t)),
    (e[t] = n));
}
function cS(e, t) {
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
    var o = 31 - Dt(n),
      s = 1 << o;
    ((t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~s));
  }
}
function ad(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Dt(n),
      o = 1 << r;
    ((o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o));
  }
}
var ue = 0;
function zm(e) {
  return ((e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1);
}
var Bm,
  ld,
  Um,
  Vm,
  Wm,
  Wu = !1,
  Si = [],
  Hn = null,
  Kn = null,
  Gn = null,
  js = new Map(),
  Ms = new Map(),
  On = [],
  dS =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function Zf(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Hn = null;
      break;
    case 'dragenter':
    case 'dragleave':
      Kn = null;
      break;
    case 'mouseover':
    case 'mouseout':
      Gn = null;
      break;
    case 'pointerover':
    case 'pointerout':
      js.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      Ms.delete(t.pointerId);
  }
}
function ts(e, t, n, r, o, s) {
  return e === null || e.nativeEvent !== s
    ? ((e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: s, targetContainers: [o] }),
      t !== null && ((t = ri(t)), t !== null && ld(t)),
      e)
    : ((e.eventSystemFlags |= r), (t = e.targetContainers), o !== null && t.indexOf(o) === -1 && t.push(o), e);
}
function fS(e, t, n, r, o) {
  switch (t) {
    case 'focusin':
      return ((Hn = ts(Hn, e, t, n, r, o)), !0);
    case 'dragenter':
      return ((Kn = ts(Kn, e, t, n, r, o)), !0);
    case 'mouseover':
      return ((Gn = ts(Gn, e, t, n, r, o)), !0);
    case 'pointerover':
      var s = o.pointerId;
      return (js.set(s, ts(js.get(s) || null, e, t, n, r, o)), !0);
    case 'gotpointercapture':
      return ((s = o.pointerId), Ms.set(s, ts(Ms.get(s) || null, e, t, n, r, o)), !0);
  }
  return !1;
}
function Hm(e) {
  var t = gr(e.target);
  if (t !== null) {
    var n = $r(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Im(n)), t !== null)) {
          ((e.blockedOn = t),
            Wm(e.priority, function () {
              Um(n);
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
function Vi(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Hu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (($u = r), n.target.dispatchEvent(r), ($u = null));
    } else return ((t = ri(n)), t !== null && ld(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Jf(e, t, n) {
  Vi(e) && n.delete(t);
}
function pS() {
  ((Wu = !1),
    Hn !== null && Vi(Hn) && (Hn = null),
    Kn !== null && Vi(Kn) && (Kn = null),
    Gn !== null && Vi(Gn) && (Gn = null),
    js.forEach(Jf),
    Ms.forEach(Jf));
}
function ns(e, t) {
  e.blockedOn === t && ((e.blockedOn = null), Wu || ((Wu = !0), lt.unstable_scheduleCallback(lt.unstable_NormalPriority, pS)));
}
function _s(e) {
  function t(o) {
    return ns(o, e);
  }
  if (0 < Si.length) {
    ns(Si[0], e);
    for (var n = 1; n < Si.length; n++) {
      var r = Si[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Hn !== null && ns(Hn, e), Kn !== null && ns(Kn, e), Gn !== null && ns(Gn, e), js.forEach(t), Ms.forEach(t), n = 0;
    n < On.length;
    n++
  )
    ((r = On[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < On.length && ((n = On[0]), n.blockedOn === null); ) (Hm(n), n.blockedOn === null && On.shift());
}
var ho = Cn.ReactCurrentBatchConfig,
  ca = !0;
function hS(e, t, n, r) {
  var o = ue,
    s = ho.transition;
  ho.transition = null;
  try {
    ((ue = 1), ud(e, t, n, r));
  } finally {
    ((ue = o), (ho.transition = s));
  }
}
function mS(e, t, n, r) {
  var o = ue,
    s = ho.transition;
  ho.transition = null;
  try {
    ((ue = 4), ud(e, t, n, r));
  } finally {
    ((ue = o), (ho.transition = s));
  }
}
function ud(e, t, n, r) {
  if (ca) {
    var o = Hu(e, t, n, r);
    if (o === null) (Jl(e, t, r, da, n), Zf(e, r));
    else if (fS(o, e, t, n, r)) r.stopPropagation();
    else if ((Zf(e, r), t & 4 && -1 < dS.indexOf(e))) {
      for (; o !== null; ) {
        var s = ri(o);
        if ((s !== null && Bm(s), (s = Hu(e, t, n, r)), s === null && Jl(e, t, r, da, n), s === o)) break;
        o = s;
      }
      o !== null && r.stopPropagation();
    } else Jl(e, t, r, null, n);
  }
}
var da = null;
function Hu(e, t, n, r) {
  if (((da = null), (e = sd(r)), (e = gr(e)), e !== null))
    if (((t = $r(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Im(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((da = e), null);
}
function Km(e) {
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
      switch (nS()) {
        case id:
          return 1;
        case Lm:
          return 4;
        case la:
        case rS:
          return 16;
        case Fm:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Un = null,
  cd = null,
  Wi = null;
function Gm() {
  if (Wi) return Wi;
  var e,
    t = cd,
    n = t.length,
    r,
    o = 'value' in Un ? Un.value : Un.textContent,
    s = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === o[s - r]; r++);
  return (Wi = o.slice(e, 1 < r ? 1 - r : void 0));
}
function Hi(e) {
  var t = e.keyCode;
  return (
    'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Ci() {
  return !0;
}
function ep() {
  return !1;
}
function ct(e) {
  function t(n, r, o, s, i) {
    ((this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = s),
      (this.target = i),
      (this.currentTarget = null));
    for (var a in e) e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(s) : s[a]));
    return (
      (this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Ci : ep),
      (this.isPropagationStopped = ep),
      this
    );
  }
  return (
    Ce(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault ? n.preventDefault() : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = Ci));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = Ci));
      },
      persist: function () {},
      isPersistent: Ci,
    }),
    t
  );
}
var Bo = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  dd = ct(Bo),
  ni = Ce({}, Bo, { view: 0, detail: 0 }),
  vS = ct(ni),
  Wl,
  Hl,
  rs,
  Ka = Ce({}, ni, {
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
    getModifierState: fd,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0 ? (e.fromElement === e.srcElement ? e.toElement : e.fromElement) : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== rs &&
            (rs && e.type === 'mousemove' ? ((Wl = e.screenX - rs.screenX), (Hl = e.screenY - rs.screenY)) : (Hl = Wl = 0), (rs = e)),
          Wl);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : Hl;
    },
  }),
  tp = ct(Ka),
  gS = Ce({}, Ka, { dataTransfer: 0 }),
  yS = ct(gS),
  xS = Ce({}, ni, { relatedTarget: 0 }),
  Kl = ct(xS),
  wS = Ce({}, Bo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  SS = ct(wS),
  CS = Ce({}, Bo, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  ES = ct(CS),
  bS = Ce({}, Bo, { data: 0 }),
  np = ct(bS),
  NS = {
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
  PS = {
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
  kS = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
function TS(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = kS[e]) ? !!t[e] : !1;
}
function fd() {
  return TS;
}
var RS = Ce({}, ni, {
    key: function (e) {
      if (e.key) {
        var t = NS[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = Hi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? PS[e.keyCode] || 'Unidentified'
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
    getModifierState: fd,
    charCode: function (e) {
      return e.type === 'keypress' ? Hi(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress' ? Hi(e) : e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
  }),
  jS = ct(RS),
  MS = Ce({}, Ka, {
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
  rp = ct(MS),
  _S = Ce({}, ni, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fd,
  }),
  IS = ct(_S),
  AS = Ce({}, Bo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  OS = ct(AS),
  DS = Ce({}, Ka, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e ? e.deltaY : 'wheelDeltaY' in e ? -e.wheelDeltaY : 'wheelDelta' in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  LS = ct(DS),
  FS = [9, 13, 27, 32],
  pd = hn && 'CompositionEvent' in window,
  xs = null;
hn && 'documentMode' in document && (xs = document.documentMode);
var $S = hn && 'TextEvent' in window && !xs,
  Qm = hn && (!pd || (xs && 8 < xs && 11 >= xs)),
  op = ' ',
  sp = !1;
function Ym(e, t) {
  switch (e) {
    case 'keyup':
      return FS.indexOf(t.keyCode) !== -1;
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
function Xm(e) {
  return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
}
var eo = !1;
function zS(e, t) {
  switch (e) {
    case 'compositionend':
      return Xm(t);
    case 'keypress':
      return t.which !== 32 ? null : ((sp = !0), op);
    case 'textInput':
      return ((e = t.data), e === op && sp ? null : e);
    default:
      return null;
  }
}
function BS(e, t) {
  if (eo) return e === 'compositionend' || (!pd && Ym(e, t)) ? ((e = Gm()), (Wi = cd = Un = null), (eo = !1), e) : null;
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
      return Qm && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var US = {
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
function ip(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!US[e.type] : t === 'textarea';
}
function qm(e, t, n, r) {
  (Tm(r), (t = fa(t, 'onChange')), 0 < t.length && ((n = new dd('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t })));
}
var ws = null,
  Is = null;
function VS(e) {
  lv(e, 0);
}
function Ga(e) {
  var t = ro(e);
  if (Sm(t)) return e;
}
function WS(e, t) {
  if (e === 'change') return t;
}
var Zm = !1;
if (hn) {
  var Gl;
  if (hn) {
    var Ql = 'oninput' in document;
    if (!Ql) {
      var ap = document.createElement('div');
      (ap.setAttribute('oninput', 'return;'), (Ql = typeof ap.oninput == 'function'));
    }
    Gl = Ql;
  } else Gl = !1;
  Zm = Gl && (!document.documentMode || 9 < document.documentMode);
}
function lp() {
  ws && (ws.detachEvent('onpropertychange', Jm), (Is = ws = null));
}
function Jm(e) {
  if (e.propertyName === 'value' && Ga(Is)) {
    var t = [];
    (qm(t, Is, e, sd(e)), _m(VS, t));
  }
}
function HS(e, t, n) {
  e === 'focusin' ? (lp(), (ws = t), (Is = n), ws.attachEvent('onpropertychange', Jm)) : e === 'focusout' && lp();
}
function KS(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ga(Is);
}
function GS(e, t) {
  if (e === 'click') return Ga(t);
}
function QS(e, t) {
  if (e === 'input' || e === 'change') return Ga(t);
}
function YS(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ft = typeof Object.is == 'function' ? Object.is : YS;
function As(e, t) {
  if (Ft(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!ku.call(t, o) || !Ft(e[o], t[o])) return !1;
  }
  return !0;
}
function up(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function cp(e, t) {
  var n = up(e);
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
    n = up(n);
  }
}
function ev(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? ev(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function tv() {
  for (var e = window, t = sa(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string';
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = sa(e.document);
  }
  return t;
}
function hd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' && (e.type === 'text' || e.type === 'search' || e.type === 'tel' || e.type === 'url' || e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function XS(e) {
  var t = tv(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ev(n.ownerDocument.documentElement, n)) {
    if (r !== null && hd(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
        ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)));
      else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)) {
        e = e.getSelection();
        var o = n.textContent.length,
          s = Math.min(r.start, o);
        ((r = r.end === void 0 ? s : Math.min(r.end, o)), !e.extend && s > r && ((o = r), (r = s), (s = o)), (o = cp(n, s)));
        var i = cp(n, r);
        o &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          s > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top));
  }
}
var qS = hn && 'documentMode' in document && 11 >= document.documentMode,
  to = null,
  Ku = null,
  Ss = null,
  Gu = !1;
function dp(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Gu ||
    to == null ||
    to !== sa(r) ||
    ((r = to),
    'selectionStart' in r && hd(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset })),
    (Ss && As(Ss, r)) ||
      ((Ss = r),
      (r = fa(Ku, 'onSelect')),
      0 < r.length && ((t = new dd('onSelect', 'select', null, t, n)), e.push({ event: t, listeners: r }), (t.target = to))));
}
function Ei(e, t) {
  var n = {};
  return ((n[e.toLowerCase()] = t.toLowerCase()), (n['Webkit' + e] = 'webkit' + t), (n['Moz' + e] = 'moz' + t), n);
}
var no = {
    animationend: Ei('Animation', 'AnimationEnd'),
    animationiteration: Ei('Animation', 'AnimationIteration'),
    animationstart: Ei('Animation', 'AnimationStart'),
    transitionend: Ei('Transition', 'TransitionEnd'),
  },
  Yl = {},
  nv = {};
hn &&
  ((nv = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete no.animationend.animation, delete no.animationiteration.animation, delete no.animationstart.animation),
  'TransitionEvent' in window || delete no.transitionend.transition);
function Qa(e) {
  if (Yl[e]) return Yl[e];
  if (!no[e]) return e;
  var t = no[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in nv) return (Yl[e] = t[n]);
  return e;
}
var rv = Qa('animationend'),
  ov = Qa('animationiteration'),
  sv = Qa('animationstart'),
  iv = Qa('transitionend'),
  av = new Map(),
  fp =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function sr(e, t) {
  (av.set(e, t), Fr(t, [e]));
}
for (var Xl = 0; Xl < fp.length; Xl++) {
  var ql = fp[Xl],
    ZS = ql.toLowerCase(),
    JS = ql[0].toUpperCase() + ql.slice(1);
  sr(ZS, 'on' + JS);
}
sr(rv, 'onAnimationEnd');
sr(ov, 'onAnimationIteration');
sr(sv, 'onAnimationStart');
sr('dblclick', 'onDoubleClick');
sr('focusin', 'onFocus');
sr('focusout', 'onBlur');
sr(iv, 'onTransitionEnd');
Ro('onMouseEnter', ['mouseout', 'mouseover']);
Ro('onMouseLeave', ['mouseout', 'mouseover']);
Ro('onPointerEnter', ['pointerout', 'pointerover']);
Ro('onPointerLeave', ['pointerout', 'pointerover']);
Fr('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' '));
Fr('onSelect', 'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' '));
Fr('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
Fr('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' '));
Fr('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' '));
Fr('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' '));
var fs =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  eC = new Set('cancel close invalid load scroll toggle'.split(' ').concat(fs));
function pp(e, t, n) {
  var r = e.type || 'unknown-event';
  ((e.currentTarget = n), Z1(r, t, void 0, e), (e.currentTarget = null));
}
function lv(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var s = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var a = r[i],
            l = a.instance,
            u = a.currentTarget;
          if (((a = a.listener), l !== s && o.isPropagationStopped())) break e;
          (pp(o, a, u), (s = l));
        }
      else
        for (i = 0; i < r.length; i++) {
          if (((a = r[i]), (l = a.instance), (u = a.currentTarget), (a = a.listener), l !== s && o.isPropagationStopped())) break e;
          (pp(o, a, u), (s = l));
        }
    }
  }
  if (aa) throw ((e = Uu), (aa = !1), (Uu = null), e);
}
function ve(e, t) {
  var n = t[Zu];
  n === void 0 && (n = t[Zu] = new Set());
  var r = e + '__bubble';
  n.has(r) || (uv(t, e, 2, !1), n.add(r));
}
function Zl(e, t, n) {
  var r = 0;
  (t && (r |= 4), uv(n, e, r, t));
}
var bi = '_reactListening' + Math.random().toString(36).slice(2);
function Os(e) {
  if (!e[bi]) {
    ((e[bi] = !0),
      vm.forEach(function (n) {
        n !== 'selectionchange' && (eC.has(n) || Zl(n, !1, e), Zl(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[bi] || ((t[bi] = !0), Zl('selectionchange', !1, t));
  }
}
function uv(e, t, n, r) {
  switch (Km(t)) {
    case 1:
      var o = hS;
      break;
    case 4:
      o = mS;
      break;
    default:
      o = ud;
  }
  ((n = o.bind(null, t, n, e)),
    (o = void 0),
    !Bu || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
        ? e.addEventListener(t, n, { passive: o })
        : e.addEventListener(t, n, !1));
}
function Jl(e, t, n, r, o) {
  var s = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var a = r.stateNode.containerInfo;
        if (a === o || (a.nodeType === 8 && a.parentNode === o)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var l = i.tag;
            if ((l === 3 || l === 4) && ((l = i.stateNode.containerInfo), l === o || (l.nodeType === 8 && l.parentNode === o))) return;
            i = i.return;
          }
        for (; a !== null; ) {
          if (((i = gr(a)), i === null)) return;
          if (((l = i.tag), l === 5 || l === 6)) {
            r = s = i;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  _m(function () {
    var u = s,
      f = sd(n),
      p = [];
    e: {
      var m = av.get(e);
      if (m !== void 0) {
        var v = dd,
          S = e;
        switch (e) {
          case 'keypress':
            if (Hi(n) === 0) break e;
          case 'keydown':
          case 'keyup':
            v = jS;
            break;
          case 'focusin':
            ((S = 'focus'), (v = Kl));
            break;
          case 'focusout':
            ((S = 'blur'), (v = Kl));
            break;
          case 'beforeblur':
          case 'afterblur':
            v = Kl;
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
            v = tp;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            v = yS;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            v = IS;
            break;
          case rv:
          case ov:
          case sv:
            v = SS;
            break;
          case iv:
            v = OS;
            break;
          case 'scroll':
            v = vS;
            break;
          case 'wheel':
            v = LS;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            v = ES;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            v = rp;
        }
        var g = (t & 4) !== 0,
          w = !g && e === 'scroll',
          x = g ? (m !== null ? m + 'Capture' : null) : m;
        g = [];
        for (var h = u, y; h !== null; ) {
          y = h;
          var C = y.stateNode;
          if ((y.tag === 5 && C !== null && ((y = C), x !== null && ((C = Rs(h, x)), C != null && g.push(Ds(h, C, y)))), w)) break;
          h = h.return;
        }
        0 < g.length && ((m = new v(m, S, null, n, f)), p.push({ event: m, listeners: g }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === 'mouseover' || e === 'pointerover'),
          (v = e === 'mouseout' || e === 'pointerout'),
          m && n !== $u && (S = n.relatedTarget || n.fromElement) && (gr(S) || S[mn]))
        )
          break e;
        if (
          (v || m) &&
          ((m = f.window === f ? f : (m = f.ownerDocument) ? m.defaultView || m.parentWindow : window),
          v
            ? ((S = n.relatedTarget || n.toElement),
              (v = u),
              (S = S ? gr(S) : null),
              S !== null && ((w = $r(S)), S !== w || (S.tag !== 5 && S.tag !== 6)) && (S = null))
            : ((v = null), (S = u)),
          v !== S)
        ) {
          if (
            ((g = tp),
            (C = 'onMouseLeave'),
            (x = 'onMouseEnter'),
            (h = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') && ((g = rp), (C = 'onPointerLeave'), (x = 'onPointerEnter'), (h = 'pointer')),
            (w = v == null ? m : ro(v)),
            (y = S == null ? m : ro(S)),
            (m = new g(C, h + 'leave', v, n, f)),
            (m.target = w),
            (m.relatedTarget = y),
            (C = null),
            gr(f) === u && ((g = new g(x, h + 'enter', S, n, f)), (g.target = y), (g.relatedTarget = w), (C = g)),
            (w = C),
            v && S)
          )
            t: {
              for (g = v, x = S, h = 0, y = g; y; y = Qr(y)) h++;
              for (y = 0, C = x; C; C = Qr(C)) y++;
              for (; 0 < h - y; ) ((g = Qr(g)), h--);
              for (; 0 < y - h; ) ((x = Qr(x)), y--);
              for (; h--; ) {
                if (g === x || (x !== null && g === x.alternate)) break t;
                ((g = Qr(g)), (x = Qr(x)));
              }
              g = null;
            }
          else g = null;
          (v !== null && hp(p, m, v, g, !1), S !== null && w !== null && hp(p, w, S, g, !0));
        }
      }
      e: {
        if (
          ((m = u ? ro(u) : window), (v = m.nodeName && m.nodeName.toLowerCase()), v === 'select' || (v === 'input' && m.type === 'file'))
        )
          var E = WS;
        else if (ip(m))
          if (Zm) E = QS;
          else {
            E = KS;
            var N = HS;
          }
        else (v = m.nodeName) && v.toLowerCase() === 'input' && (m.type === 'checkbox' || m.type === 'radio') && (E = GS);
        if (E && (E = E(e, u))) {
          qm(p, E, n, f);
          break e;
        }
        (N && N(e, m, u), e === 'focusout' && (N = m._wrapperState) && N.controlled && m.type === 'number' && Au(m, 'number', m.value));
      }
      switch (((N = u ? ro(u) : window), e)) {
        case 'focusin':
          (ip(N) || N.contentEditable === 'true') && ((to = N), (Ku = u), (Ss = null));
          break;
        case 'focusout':
          Ss = Ku = to = null;
          break;
        case 'mousedown':
          Gu = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ((Gu = !1), dp(p, n, f));
          break;
        case 'selectionchange':
          if (qS) break;
        case 'keydown':
        case 'keyup':
          dp(p, n, f);
      }
      var b;
      if (pd)
        e: {
          switch (e) {
            case 'compositionstart':
              var k = 'onCompositionStart';
              break e;
            case 'compositionend':
              k = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              k = 'onCompositionUpdate';
              break e;
          }
          k = void 0;
        }
      else eo ? Ym(e, n) && (k = 'onCompositionEnd') : e === 'keydown' && n.keyCode === 229 && (k = 'onCompositionStart');
      (k &&
        (Qm &&
          n.locale !== 'ko' &&
          (eo || k !== 'onCompositionStart'
            ? k === 'onCompositionEnd' && eo && (b = Gm())
            : ((Un = f), (cd = 'value' in Un ? Un.value : Un.textContent), (eo = !0))),
        (N = fa(u, k)),
        0 < N.length &&
          ((k = new np(k, e, null, n, f)),
          p.push({ event: k, listeners: N }),
          b ? (k.data = b) : ((b = Xm(n)), b !== null && (k.data = b)))),
        (b = $S ? zS(e, n) : BS(e, n)) &&
          ((u = fa(u, 'onBeforeInput')),
          0 < u.length && ((f = new np('onBeforeInput', 'beforeinput', null, n, f)), p.push({ event: f, listeners: u }), (f.data = b))));
    }
    lv(p, t);
  });
}
function Ds(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function fa(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var o = e,
      s = o.stateNode;
    (o.tag === 5 &&
      s !== null &&
      ((o = s), (s = Rs(e, n)), s != null && r.unshift(Ds(e, s, o)), (s = Rs(e, t)), s != null && r.push(Ds(e, s, o))),
      (e = e.return));
  }
  return r;
}
function Qr(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function hp(e, t, n, r, o) {
  for (var s = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n,
      l = a.alternate,
      u = a.stateNode;
    if (l !== null && l === r) break;
    (a.tag === 5 &&
      u !== null &&
      ((a = u), o ? ((l = Rs(n, s)), l != null && i.unshift(Ds(n, l, a))) : o || ((l = Rs(n, s)), l != null && i.push(Ds(n, l, a)))),
      (n = n.return));
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var tC = /\r\n?/g,
  nC = /\u0000|\uFFFD/g;
function mp(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      tC,
      `
`
    )
    .replace(nC, '');
}
function Ni(e, t, n) {
  if (((t = mp(t)), mp(e) !== t && n)) throw Error(_(425));
}
function pa() {}
var Qu = null,
  Yu = null;
function Xu(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null)
  );
}
var qu = typeof setTimeout == 'function' ? setTimeout : void 0,
  rC = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  vp = typeof Promise == 'function' ? Promise : void 0,
  oC =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof vp < 'u'
        ? function (e) {
            return vp.resolve(null).then(e).catch(sC);
          }
        : qu;
function sC(e) {
  setTimeout(function () {
    throw e;
  });
}
function eu(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === '/$')) {
        if (r === 0) {
          (e.removeChild(o), _s(t));
          return;
        }
        r--;
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
    n = o;
  } while (n);
  _s(t);
}
function Qn(e) {
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
function gp(e) {
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
var Uo = Math.random().toString(36).slice(2),
  Qt = '__reactFiber$' + Uo,
  Ls = '__reactProps$' + Uo,
  mn = '__reactContainer$' + Uo,
  Zu = '__reactEvents$' + Uo,
  iC = '__reactListeners$' + Uo,
  aC = '__reactHandles$' + Uo;
function gr(e) {
  var t = e[Qt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[mn] || n[Qt])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = gp(e); e !== null; ) {
          if ((n = e[Qt])) return n;
          e = gp(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function ri(e) {
  return ((e = e[Qt] || e[mn]), !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e);
}
function ro(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(_(33));
}
function Ya(e) {
  return e[Ls] || null;
}
var Ju = [],
  oo = -1;
function ir(e) {
  return { current: e };
}
function ge(e) {
  0 > oo || ((e.current = Ju[oo]), (Ju[oo] = null), oo--);
}
function he(e, t) {
  (oo++, (Ju[oo] = e.current), (e.current = t));
}
var tr = {},
  Ue = ir(tr),
  et = ir(!1),
  Tr = tr;
function jo(e, t) {
  var n = e.type.contextTypes;
  if (!n) return tr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    s;
  for (s in n) o[s] = t[s];
  return (
    r && ((e = e.stateNode), (e.__reactInternalMemoizedUnmaskedChildContext = t), (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function tt(e) {
  return ((e = e.childContextTypes), e != null);
}
function ha() {
  (ge(et), ge(Ue));
}
function yp(e, t, n) {
  if (Ue.current !== tr) throw Error(_(168));
  (he(Ue, t), he(et, n));
}
function cv(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(_(108, H1(e) || 'Unknown', o));
  return Ce({}, n, r);
}
function ma(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || tr),
    (Tr = Ue.current),
    he(Ue, e),
    he(et, et.current),
    !0
  );
}
function xp(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(_(169));
  (n ? ((e = cv(e, t, Tr)), (r.__reactInternalMemoizedMergedChildContext = e), ge(et), ge(Ue), he(Ue, e)) : ge(et), he(et, n));
}
var un = null,
  Xa = !1,
  tu = !1;
function dv(e) {
  un === null ? (un = [e]) : un.push(e);
}
function lC(e) {
  ((Xa = !0), dv(e));
}
function ar() {
  if (!tu && un !== null) {
    tu = !0;
    var e = 0,
      t = ue;
    try {
      var n = un;
      for (ue = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((un = null), (Xa = !1));
    } catch (o) {
      throw (un !== null && (un = un.slice(e + 1)), Dm(id, ar), o);
    } finally {
      ((ue = t), (tu = !1));
    }
  }
  return null;
}
var so = [],
  io = 0,
  va = null,
  ga = 0,
  vt = [],
  gt = 0,
  Rr = null,
  dn = 1,
  fn = '';
function mr(e, t) {
  ((so[io++] = ga), (so[io++] = va), (va = e), (ga = t));
}
function fv(e, t, n) {
  ((vt[gt++] = dn), (vt[gt++] = fn), (vt[gt++] = Rr), (Rr = e));
  var r = dn;
  e = fn;
  var o = 32 - Dt(r) - 1;
  ((r &= ~(1 << o)), (n += 1));
  var s = 32 - Dt(t) + o;
  if (30 < s) {
    var i = o - (o % 5);
    ((s = (r & ((1 << i) - 1)).toString(32)), (r >>= i), (o -= i), (dn = (1 << (32 - Dt(t) + o)) | (n << o) | r), (fn = s + e));
  } else ((dn = (1 << s) | (n << o) | r), (fn = e));
}
function md(e) {
  e.return !== null && (mr(e, 1), fv(e, 1, 0));
}
function vd(e) {
  for (; e === va; ) ((va = so[--io]), (so[io] = null), (ga = so[--io]), (so[io] = null));
  for (; e === Rr; ) ((Rr = vt[--gt]), (vt[gt] = null), (fn = vt[--gt]), (vt[gt] = null), (dn = vt[--gt]), (vt[gt] = null));
}
var it = null,
  st = null,
  xe = !1,
  Ot = null;
function pv(e, t) {
  var n = yt(5, null, null, 0);
  ((n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function wp(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (it = e), (st = Qn(t.firstChild)), !0) : !1
      );
    case 6:
      return ((t = e.pendingProps === '' || t.nodeType !== 3 ? null : t), t !== null ? ((e.stateNode = t), (it = e), (st = null), !0) : !1);
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Rr !== null ? { id: dn, overflow: fn } : null),
            (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
            (n = yt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (it = e),
            (st = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ec(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function tc(e) {
  if (xe) {
    var t = st;
    if (t) {
      var n = t;
      if (!wp(e, t)) {
        if (ec(e)) throw Error(_(418));
        t = Qn(n.nextSibling);
        var r = it;
        t && wp(e, t) ? pv(r, n) : ((e.flags = (e.flags & -4097) | 2), (xe = !1), (it = e));
      }
    } else {
      if (ec(e)) throw Error(_(418));
      ((e.flags = (e.flags & -4097) | 2), (xe = !1), (it = e));
    }
  }
}
function Sp(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  it = e;
}
function Pi(e) {
  if (e !== it) return !1;
  if (!xe) return (Sp(e), (xe = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) && !(t = e.tag !== 5) && ((t = e.type), (t = t !== 'head' && t !== 'body' && !Xu(e.type, e.memoizedProps))),
    t && (t = st))
  ) {
    if (ec(e)) throw (hv(), Error(_(418)));
    for (; t; ) (pv(e, t), (t = Qn(t.nextSibling)));
  }
  if ((Sp(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(_(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$') {
            if (t === 0) {
              st = Qn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      st = null;
    }
  } else st = it ? Qn(e.stateNode.nextSibling) : null;
  return !0;
}
function hv() {
  for (var e = st; e; ) e = Qn(e.nextSibling);
}
function Mo() {
  ((st = it = null), (xe = !1));
}
function gd(e) {
  Ot === null ? (Ot = [e]) : Ot.push(e);
}
var uC = Cn.ReactCurrentBatchConfig;
function os(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(_(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(_(147, e));
      var o = r,
        s = '' + e;
      return t !== null && t.ref !== null && typeof t.ref == 'function' && t.ref._stringRef === s
        ? t.ref
        : ((t = function (i) {
            var a = o.refs;
            i === null ? delete a[s] : (a[s] = i);
          }),
          (t._stringRef = s),
          t);
    }
    if (typeof e != 'string') throw Error(_(284));
    if (!n._owner) throw Error(_(290, e));
  }
  return e;
}
function ki(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(_(31, e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e))
  );
}
function Cp(e) {
  var t = e._init;
  return t(e._payload);
}
function mv(e) {
  function t(x, h) {
    if (e) {
      var y = x.deletions;
      y === null ? ((x.deletions = [h]), (x.flags |= 16)) : y.push(h);
    }
  }
  function n(x, h) {
    if (!e) return null;
    for (; h !== null; ) (t(x, h), (h = h.sibling));
    return null;
  }
  function r(x, h) {
    for (x = new Map(); h !== null; ) (h.key !== null ? x.set(h.key, h) : x.set(h.index, h), (h = h.sibling));
    return x;
  }
  function o(x, h) {
    return ((x = Zn(x, h)), (x.index = 0), (x.sibling = null), x);
  }
  function s(x, h, y) {
    return (
      (x.index = y),
      e
        ? ((y = x.alternate), y !== null ? ((y = y.index), y < h ? ((x.flags |= 2), h) : y) : ((x.flags |= 2), h))
        : ((x.flags |= 1048576), h)
    );
  }
  function i(x) {
    return (e && x.alternate === null && (x.flags |= 2), x);
  }
  function a(x, h, y, C) {
    return h === null || h.tag !== 6 ? ((h = lu(y, x.mode, C)), (h.return = x), h) : ((h = o(h, y)), (h.return = x), h);
  }
  function l(x, h, y, C) {
    var E = y.type;
    return E === Jr
      ? f(x, h, y.props.children, C, y.key)
      : h !== null && (h.elementType === E || (typeof E == 'object' && E !== null && E.$$typeof === In && Cp(E) === h.type))
        ? ((C = o(h, y.props)), (C.ref = os(x, h, y)), (C.return = x), C)
        : ((C = Zi(y.type, y.key, y.props, null, x.mode, C)), (C.ref = os(x, h, y)), (C.return = x), C);
  }
  function u(x, h, y, C) {
    return h === null || h.tag !== 4 || h.stateNode.containerInfo !== y.containerInfo || h.stateNode.implementation !== y.implementation
      ? ((h = uu(y, x.mode, C)), (h.return = x), h)
      : ((h = o(h, y.children || [])), (h.return = x), h);
  }
  function f(x, h, y, C, E) {
    return h === null || h.tag !== 7 ? ((h = kr(y, x.mode, C, E)), (h.return = x), h) : ((h = o(h, y)), (h.return = x), h);
  }
  function p(x, h, y) {
    if ((typeof h == 'string' && h !== '') || typeof h == 'number') return ((h = lu('' + h, x.mode, y)), (h.return = x), h);
    if (typeof h == 'object' && h !== null) {
      switch (h.$$typeof) {
        case vi:
          return ((y = Zi(h.type, h.key, h.props, null, x.mode, y)), (y.ref = os(x, null, h)), (y.return = x), y);
        case Zr:
          return ((h = uu(h, x.mode, y)), (h.return = x), h);
        case In:
          var C = h._init;
          return p(x, C(h._payload), y);
      }
      if (cs(h) || Jo(h)) return ((h = kr(h, x.mode, y, null)), (h.return = x), h);
      ki(x, h);
    }
    return null;
  }
  function m(x, h, y, C) {
    var E = h !== null ? h.key : null;
    if ((typeof y == 'string' && y !== '') || typeof y == 'number') return E !== null ? null : a(x, h, '' + y, C);
    if (typeof y == 'object' && y !== null) {
      switch (y.$$typeof) {
        case vi:
          return y.key === E ? l(x, h, y, C) : null;
        case Zr:
          return y.key === E ? u(x, h, y, C) : null;
        case In:
          return ((E = y._init), m(x, h, E(y._payload), C));
      }
      if (cs(y) || Jo(y)) return E !== null ? null : f(x, h, y, C, null);
      ki(x, y);
    }
    return null;
  }
  function v(x, h, y, C, E) {
    if ((typeof C == 'string' && C !== '') || typeof C == 'number') return ((x = x.get(y) || null), a(h, x, '' + C, E));
    if (typeof C == 'object' && C !== null) {
      switch (C.$$typeof) {
        case vi:
          return ((x = x.get(C.key === null ? y : C.key) || null), l(h, x, C, E));
        case Zr:
          return ((x = x.get(C.key === null ? y : C.key) || null), u(h, x, C, E));
        case In:
          var N = C._init;
          return v(x, h, y, N(C._payload), E);
      }
      if (cs(C) || Jo(C)) return ((x = x.get(y) || null), f(h, x, C, E, null));
      ki(h, C);
    }
    return null;
  }
  function S(x, h, y, C) {
    for (var E = null, N = null, b = h, k = (h = 0), M = null; b !== null && k < y.length; k++) {
      b.index > k ? ((M = b), (b = null)) : (M = b.sibling);
      var j = m(x, b, y[k], C);
      if (j === null) {
        b === null && (b = M);
        break;
      }
      (e && b && j.alternate === null && t(x, b), (h = s(j, h, k)), N === null ? (E = j) : (N.sibling = j), (N = j), (b = M));
    }
    if (k === y.length) return (n(x, b), xe && mr(x, k), E);
    if (b === null) {
      for (; k < y.length; k++) ((b = p(x, y[k], C)), b !== null && ((h = s(b, h, k)), N === null ? (E = b) : (N.sibling = b), (N = b)));
      return (xe && mr(x, k), E);
    }
    for (b = r(x, b); k < y.length; k++)
      ((M = v(b, x, k, y[k], C)),
        M !== null &&
          (e && M.alternate !== null && b.delete(M.key === null ? k : M.key),
          (h = s(M, h, k)),
          N === null ? (E = M) : (N.sibling = M),
          (N = M)));
    return (
      e &&
        b.forEach(function ($) {
          return t(x, $);
        }),
      xe && mr(x, k),
      E
    );
  }
  function g(x, h, y, C) {
    var E = Jo(y);
    if (typeof E != 'function') throw Error(_(150));
    if (((y = E.call(y)), y == null)) throw Error(_(151));
    for (var N = (E = null), b = h, k = (h = 0), M = null, j = y.next(); b !== null && !j.done; k++, j = y.next()) {
      b.index > k ? ((M = b), (b = null)) : (M = b.sibling);
      var $ = m(x, b, j.value, C);
      if ($ === null) {
        b === null && (b = M);
        break;
      }
      (e && b && $.alternate === null && t(x, b), (h = s($, h, k)), N === null ? (E = $) : (N.sibling = $), (N = $), (b = M));
    }
    if (j.done) return (n(x, b), xe && mr(x, k), E);
    if (b === null) {
      for (; !j.done; k++, j = y.next())
        ((j = p(x, j.value, C)), j !== null && ((h = s(j, h, k)), N === null ? (E = j) : (N.sibling = j), (N = j)));
      return (xe && mr(x, k), E);
    }
    for (b = r(x, b); !j.done; k++, j = y.next())
      ((j = v(b, x, k, j.value, C)),
        j !== null &&
          (e && j.alternate !== null && b.delete(j.key === null ? k : j.key),
          (h = s(j, h, k)),
          N === null ? (E = j) : (N.sibling = j),
          (N = j)));
    return (
      e &&
        b.forEach(function (A) {
          return t(x, A);
        }),
      xe && mr(x, k),
      E
    );
  }
  function w(x, h, y, C) {
    if (
      (typeof y == 'object' && y !== null && y.type === Jr && y.key === null && (y = y.props.children), typeof y == 'object' && y !== null)
    ) {
      switch (y.$$typeof) {
        case vi:
          e: {
            for (var E = y.key, N = h; N !== null; ) {
              if (N.key === E) {
                if (((E = y.type), E === Jr)) {
                  if (N.tag === 7) {
                    (n(x, N.sibling), (h = o(N, y.props.children)), (h.return = x), (x = h));
                    break e;
                  }
                } else if (N.elementType === E || (typeof E == 'object' && E !== null && E.$$typeof === In && Cp(E) === N.type)) {
                  (n(x, N.sibling), (h = o(N, y.props)), (h.ref = os(x, N, y)), (h.return = x), (x = h));
                  break e;
                }
                n(x, N);
                break;
              } else t(x, N);
              N = N.sibling;
            }
            y.type === Jr
              ? ((h = kr(y.props.children, x.mode, C, y.key)), (h.return = x), (x = h))
              : ((C = Zi(y.type, y.key, y.props, null, x.mode, C)), (C.ref = os(x, h, y)), (C.return = x), (x = C));
          }
          return i(x);
        case Zr:
          e: {
            for (N = y.key; h !== null; ) {
              if (h.key === N)
                if (h.tag === 4 && h.stateNode.containerInfo === y.containerInfo && h.stateNode.implementation === y.implementation) {
                  (n(x, h.sibling), (h = o(h, y.children || [])), (h.return = x), (x = h));
                  break e;
                } else {
                  n(x, h);
                  break;
                }
              else t(x, h);
              h = h.sibling;
            }
            ((h = uu(y, x.mode, C)), (h.return = x), (x = h));
          }
          return i(x);
        case In:
          return ((N = y._init), w(x, h, N(y._payload), C));
      }
      if (cs(y)) return S(x, h, y, C);
      if (Jo(y)) return g(x, h, y, C);
      ki(x, y);
    }
    return (typeof y == 'string' && y !== '') || typeof y == 'number'
      ? ((y = '' + y),
        h !== null && h.tag === 6
          ? (n(x, h.sibling), (h = o(h, y)), (h.return = x), (x = h))
          : (n(x, h), (h = lu(y, x.mode, C)), (h.return = x), (x = h)),
        i(x))
      : n(x, h);
  }
  return w;
}
var _o = mv(!0),
  vv = mv(!1),
  ya = ir(null),
  xa = null,
  ao = null,
  yd = null;
function xd() {
  yd = ao = xa = null;
}
function wd(e) {
  var t = ya.current;
  (ge(ya), (e._currentValue = t));
}
function nc(e, t, n) {
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
function mo(e, t) {
  ((xa = e),
    (yd = ao = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (Je = !0), (e.firstContext = null)));
}
function Ct(e) {
  var t = e._currentValue;
  if (yd !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), ao === null)) {
      if (xa === null) throw Error(_(308));
      ((ao = e), (xa.dependencies = { lanes: 0, firstContext: e }));
    } else ao = ao.next = e;
  return t;
}
var yr = null;
function Sd(e) {
  yr === null ? (yr = [e]) : yr.push(e);
}
function gv(e, t, n, r) {
  var o = t.interleaved;
  return (o === null ? ((n.next = n), Sd(t)) : ((n.next = o.next), (o.next = n)), (t.interleaved = n), vn(e, r));
}
function vn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t), (n = e.alternate), n !== null && (n.childLanes |= t), (n = e), (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var An = !1;
function Cd(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function yv(e, t) {
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
function pn(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Yn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), re & 2)) {
    var o = r.pending;
    return (o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)), (r.pending = t), vn(e, n));
  }
  return ((o = r.interleaved), o === null ? ((t.next = t), Sd(r)) : ((t.next = o.next), (o.next = t)), (r.interleaved = t), vn(e, n));
}
function Ki(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ad(e, n));
  }
}
function Ep(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      s = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        (s === null ? (o = s = i) : (s = s.next = i), (n = n.next));
      } while (n !== null);
      s === null ? (o = s = t) : (s = s.next = t);
    } else o = s = t;
    ((n = { baseState: r.baseState, firstBaseUpdate: o, lastBaseUpdate: s, shared: r.shared, effects: r.effects }), (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate), e === null ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t));
}
function wa(e, t, n, r) {
  var o = e.updateQueue;
  An = !1;
  var s = o.firstBaseUpdate,
    i = o.lastBaseUpdate,
    a = o.shared.pending;
  if (a !== null) {
    o.shared.pending = null;
    var l = a,
      u = l.next;
    ((l.next = null), i === null ? (s = u) : (i.next = u), (i = l));
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (a = f.lastBaseUpdate),
      a !== i && (a === null ? (f.firstBaseUpdate = u) : (a.next = u), (f.lastBaseUpdate = l)));
  }
  if (s !== null) {
    var p = o.baseState;
    ((i = 0), (f = u = l = null), (a = s));
    do {
      var m = a.lane,
        v = a.eventTime;
      if ((r & m) === m) {
        f !== null && (f = f.next = { eventTime: v, lane: 0, tag: a.tag, payload: a.payload, callback: a.callback, next: null });
        e: {
          var S = e,
            g = a;
          switch (((m = t), (v = n), g.tag)) {
            case 1:
              if (((S = g.payload), typeof S == 'function')) {
                p = S.call(v, p, m);
                break e;
              }
              p = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (((S = g.payload), (m = typeof S == 'function' ? S.call(v, p, m) : S), m == null)) break e;
              p = Ce({}, p, m);
              break e;
            case 2:
              An = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && ((e.flags |= 64), (m = o.effects), m === null ? (o.effects = [a]) : m.push(a));
      } else
        ((v = { eventTime: v, lane: m, tag: a.tag, payload: a.payload, callback: a.callback, next: null }),
          f === null ? ((u = f = v), (l = p)) : (f = f.next = v),
          (i |= m));
      if (((a = a.next), a === null)) {
        if (((a = o.shared.pending), a === null)) break;
        ((m = a), (a = m.next), (m.next = null), (o.lastBaseUpdate = m), (o.shared.pending = null));
      }
    } while (!0);
    if (
      (f === null && (l = p), (o.baseState = l), (o.firstBaseUpdate = u), (o.lastBaseUpdate = f), (t = o.shared.interleaved), t !== null)
    ) {
      o = t;
      do ((i |= o.lane), (o = o.next));
      while (o !== t);
    } else s === null && (o.shared.lanes = 0);
    ((Mr |= i), (e.lanes = i), (e.memoizedState = p));
  }
}
function bp(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != 'function')) throw Error(_(191, o));
        o.call(r);
      }
    }
}
var oi = {},
  Zt = ir(oi),
  Fs = ir(oi),
  $s = ir(oi);
function xr(e) {
  if (e === oi) throw Error(_(174));
  return e;
}
function Ed(e, t) {
  switch ((he($s, t), he(Fs, e), he(Zt, oi), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Du(null, '');
      break;
    default:
      ((e = e === 8 ? t.parentNode : t), (t = e.namespaceURI || null), (e = e.tagName), (t = Du(t, e)));
  }
  (ge(Zt), he(Zt, t));
}
function Io() {
  (ge(Zt), ge(Fs), ge($s));
}
function xv(e) {
  xr($s.current);
  var t = xr(Zt.current),
    n = Du(t, e.type);
  t !== n && (he(Fs, e), he(Zt, n));
}
function bd(e) {
  Fs.current === e && (ge(Zt), ge(Fs));
}
var we = ir(0);
function Sa(e) {
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
var nu = [];
function Nd() {
  for (var e = 0; e < nu.length; e++) nu[e]._workInProgressVersionPrimary = null;
  nu.length = 0;
}
var Gi = Cn.ReactCurrentDispatcher,
  ru = Cn.ReactCurrentBatchConfig,
  jr = 0,
  Se = null,
  Re = null,
  Me = null,
  Ca = !1,
  Cs = !1,
  zs = 0,
  cC = 0;
function Fe() {
  throw Error(_(321));
}
function Pd(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ft(e[n], t[n])) return !1;
  return !0;
}
function kd(e, t, n, r, o, s) {
  if (
    ((jr = s),
    (Se = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Gi.current = e === null || e.memoizedState === null ? hC : mC),
    (e = n(r, o)),
    Cs)
  ) {
    s = 0;
    do {
      if (((Cs = !1), (zs = 0), 25 <= s)) throw Error(_(301));
      ((s += 1), (Me = Re = null), (t.updateQueue = null), (Gi.current = vC), (e = n(r, o)));
    } while (Cs);
  }
  if (((Gi.current = Ea), (t = Re !== null && Re.next !== null), (jr = 0), (Me = Re = Se = null), (Ca = !1), t)) throw Error(_(300));
  return e;
}
function Td() {
  var e = zs !== 0;
  return ((zs = 0), e);
}
function Wt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return (Me === null ? (Se.memoizedState = Me = e) : (Me = Me.next = e), Me);
}
function Et() {
  if (Re === null) {
    var e = Se.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Re.next;
  var t = Me === null ? Se.memoizedState : Me.next;
  if (t !== null) ((Me = t), (Re = e));
  else {
    if (e === null) throw Error(_(310));
    ((Re = e),
      (e = { memoizedState: Re.memoizedState, baseState: Re.baseState, baseQueue: Re.baseQueue, queue: Re.queue, next: null }),
      Me === null ? (Se.memoizedState = Me = e) : (Me = Me.next = e));
  }
  return Me;
}
function Bs(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function ou(e) {
  var t = Et(),
    n = t.queue;
  if (n === null) throw Error(_(311));
  n.lastRenderedReducer = e;
  var r = Re,
    o = r.baseQueue,
    s = n.pending;
  if (s !== null) {
    if (o !== null) {
      var i = o.next;
      ((o.next = s.next), (s.next = i));
    }
    ((r.baseQueue = o = s), (n.pending = null));
  }
  if (o !== null) {
    ((s = o.next), (r = r.baseState));
    var a = (i = null),
      l = null,
      u = s;
    do {
      var f = u.lane;
      if ((jr & f) === f)
        (l !== null && (l = l.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
      else {
        var p = { lane: f, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null };
        (l === null ? ((a = l = p), (i = r)) : (l = l.next = p), (Se.lanes |= f), (Mr |= f));
      }
      u = u.next;
    } while (u !== null && u !== s);
    (l === null ? (i = r) : (l.next = a),
      Ft(r, t.memoizedState) || (Je = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = l),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do ((s = o.lane), (Se.lanes |= s), (Mr |= s), (o = o.next));
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function su(e) {
  var t = Et(),
    n = t.queue;
  if (n === null) throw Error(_(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    s = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var i = (o = o.next);
    do ((s = e(s, i.action)), (i = i.next));
    while (i !== o);
    (Ft(s, t.memoizedState) || (Je = !0), (t.memoizedState = s), t.baseQueue === null && (t.baseState = s), (n.lastRenderedState = s));
  }
  return [s, r];
}
function wv() {}
function Sv(e, t) {
  var n = Se,
    r = Et(),
    o = t(),
    s = !Ft(r.memoizedState, o);
  if (
    (s && ((r.memoizedState = o), (Je = !0)),
    (r = r.queue),
    Rd(bv.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || s || (Me !== null && Me.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), Us(9, Ev.bind(null, n, r, o, t), void 0, null), _e === null)) throw Error(_(349));
    jr & 30 || Cv(n, t, o);
  }
  return o;
}
function Cv(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Se.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Ev(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), Nv(t) && Pv(e));
}
function bv(e, t, n) {
  return n(function () {
    Nv(t) && Pv(e);
  });
}
function Nv(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ft(e, n);
  } catch {
    return !0;
  }
}
function Pv(e) {
  var t = vn(e, 1);
  t !== null && Lt(t, e, 1, -1);
}
function Np(e) {
  var t = Wt();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Bs, lastRenderedState: e }),
    (t.queue = e),
    (e = e.dispatch = pC.bind(null, Se, e)),
    [t.memoizedState, e]
  );
}
function Us(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Se.updateQueue = t), (t.lastEffect = e.next = e))
      : ((n = t.lastEffect), n === null ? (t.lastEffect = e.next = e) : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function kv() {
  return Et().memoizedState;
}
function Qi(e, t, n, r) {
  var o = Wt();
  ((Se.flags |= e), (o.memoizedState = Us(1 | t, n, void 0, r === void 0 ? null : r)));
}
function qa(e, t, n, r) {
  var o = Et();
  r = r === void 0 ? null : r;
  var s = void 0;
  if (Re !== null) {
    var i = Re.memoizedState;
    if (((s = i.destroy), r !== null && Pd(r, i.deps))) {
      o.memoizedState = Us(t, n, s, r);
      return;
    }
  }
  ((Se.flags |= e), (o.memoizedState = Us(1 | t, n, s, r)));
}
function Pp(e, t) {
  return Qi(8390656, 8, e, t);
}
function Rd(e, t) {
  return qa(2048, 8, e, t);
}
function Tv(e, t) {
  return qa(4, 2, e, t);
}
function Rv(e, t) {
  return qa(4, 4, e, t);
}
function jv(e, t) {
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
function Mv(e, t, n) {
  return ((n = n != null ? n.concat([e]) : null), qa(4, 4, jv.bind(null, t, e), n));
}
function jd() {}
function _v(e, t) {
  var n = Et();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Pd(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function Iv(e, t) {
  var n = Et();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Pd(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Av(e, t, n) {
  return jr & 21
    ? (Ft(n, t) || ((n = $m()), (Se.lanes |= n), (Mr |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (Je = !0)), (e.memoizedState = n));
}
function dC(e, t) {
  var n = ue;
  ((ue = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = ru.transition;
  ru.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((ue = n), (ru.transition = r));
  }
}
function Ov() {
  return Et().memoizedState;
}
function fC(e, t, n) {
  var r = qn(e);
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Dv(e))) Lv(t, n);
  else if (((n = gv(e, t, n, r)), n !== null)) {
    var o = Ke();
    (Lt(n, e, r, o), Fv(n, t, r));
  }
}
function pC(e, t, n) {
  var r = qn(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Dv(e)) Lv(t, o);
  else {
    var s = e.alternate;
    if (e.lanes === 0 && (s === null || s.lanes === 0) && ((s = t.lastRenderedReducer), s !== null))
      try {
        var i = t.lastRenderedState,
          a = s(i, n);
        if (((o.hasEagerState = !0), (o.eagerState = a), Ft(a, i))) {
          var l = t.interleaved;
          (l === null ? ((o.next = o), Sd(t)) : ((o.next = l.next), (l.next = o)), (t.interleaved = o));
          return;
        }
      } catch {
      } finally {
      }
    ((n = gv(e, t, o, r)), n !== null && ((o = Ke()), Lt(n, e, r, o), Fv(n, t, r)));
  }
}
function Dv(e) {
  var t = e.alternate;
  return e === Se || (t !== null && t === Se);
}
function Lv(e, t) {
  Cs = Ca = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
}
function Fv(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ad(e, n));
  }
}
var Ea = {
    readContext: Ct,
    useCallback: Fe,
    useContext: Fe,
    useEffect: Fe,
    useImperativeHandle: Fe,
    useInsertionEffect: Fe,
    useLayoutEffect: Fe,
    useMemo: Fe,
    useReducer: Fe,
    useRef: Fe,
    useState: Fe,
    useDebugValue: Fe,
    useDeferredValue: Fe,
    useTransition: Fe,
    useMutableSource: Fe,
    useSyncExternalStore: Fe,
    useId: Fe,
    unstable_isNewReconciler: !1,
  },
  hC = {
    readContext: Ct,
    useCallback: function (e, t) {
      return ((Wt().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Ct,
    useEffect: Pp,
    useImperativeHandle: function (e, t, n) {
      return ((n = n != null ? n.concat([e]) : null), Qi(4194308, 4, jv.bind(null, t, e), n));
    },
    useLayoutEffect: function (e, t) {
      return Qi(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Qi(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Wt();
      return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e);
    },
    useReducer: function (e, t, n) {
      var r = Wt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }),
        (r.queue = e),
        (e = e.dispatch = fC.bind(null, Se, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Wt();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: Np,
    useDebugValue: jd,
    useDeferredValue: function (e) {
      return (Wt().memoizedState = e);
    },
    useTransition: function () {
      var e = Np(!1),
        t = e[0];
      return ((e = dC.bind(null, e[1])), (Wt().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Se,
        o = Wt();
      if (xe) {
        if (n === void 0) throw Error(_(407));
        n = n();
      } else {
        if (((n = t()), _e === null)) throw Error(_(349));
        jr & 30 || Cv(r, t, n);
      }
      o.memoizedState = n;
      var s = { value: n, getSnapshot: t };
      return ((o.queue = s), Pp(bv.bind(null, r, s, e), [e]), (r.flags |= 2048), Us(9, Ev.bind(null, r, s, n, t), void 0, null), n);
    },
    useId: function () {
      var e = Wt(),
        t = _e.identifierPrefix;
      if (xe) {
        var n = fn,
          r = dn;
        ((n = (r & ~(1 << (32 - Dt(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = zs++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':'));
      } else ((n = cC++), (t = ':' + t + 'r' + n.toString(32) + ':'));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  mC = {
    readContext: Ct,
    useCallback: _v,
    useContext: Ct,
    useEffect: Rd,
    useImperativeHandle: Mv,
    useInsertionEffect: Tv,
    useLayoutEffect: Rv,
    useMemo: Iv,
    useReducer: ou,
    useRef: kv,
    useState: function () {
      return ou(Bs);
    },
    useDebugValue: jd,
    useDeferredValue: function (e) {
      var t = Et();
      return Av(t, Re.memoizedState, e);
    },
    useTransition: function () {
      var e = ou(Bs)[0],
        t = Et().memoizedState;
      return [e, t];
    },
    useMutableSource: wv,
    useSyncExternalStore: Sv,
    useId: Ov,
    unstable_isNewReconciler: !1,
  },
  vC = {
    readContext: Ct,
    useCallback: _v,
    useContext: Ct,
    useEffect: Rd,
    useImperativeHandle: Mv,
    useInsertionEffect: Tv,
    useLayoutEffect: Rv,
    useMemo: Iv,
    useReducer: su,
    useRef: kv,
    useState: function () {
      return su(Bs);
    },
    useDebugValue: jd,
    useDeferredValue: function (e) {
      var t = Et();
      return Re === null ? (t.memoizedState = e) : Av(t, Re.memoizedState, e);
    },
    useTransition: function () {
      var e = su(Bs)[0],
        t = Et().memoizedState;
      return [e, t];
    },
    useMutableSource: wv,
    useSyncExternalStore: Sv,
    useId: Ov,
    unstable_isNewReconciler: !1,
  };
function jt(e, t) {
  if (e && e.defaultProps) {
    ((t = Ce({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function rc(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Ce({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Za = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? $r(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ke(),
      o = qn(e),
      s = pn(r, o);
    ((s.payload = t), n != null && (s.callback = n), (t = Yn(e, s, o)), t !== null && (Lt(t, e, o, r), Ki(t, e, o)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ke(),
      o = qn(e),
      s = pn(r, o);
    ((s.tag = 1), (s.payload = t), n != null && (s.callback = n), (t = Yn(e, s, o)), t !== null && (Lt(t, e, o, r), Ki(t, e, o)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ke(),
      r = qn(e),
      o = pn(n, r);
    ((o.tag = 2), t != null && (o.callback = t), (t = Yn(e, o, r)), t !== null && (Lt(t, e, r, n), Ki(t, e, r)));
  },
};
function kp(e, t, n, r, o, s, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, s, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !As(n, r) || !As(o, s)
        : !0
  );
}
function $v(e, t, n) {
  var r = !1,
    o = tr,
    s = t.contextType;
  return (
    typeof s == 'object' && s !== null
      ? (s = Ct(s))
      : ((o = tt(t) ? Tr : Ue.current), (r = t.contextTypes), (s = (r = r != null) ? jo(e, o) : tr)),
    (t = new t(n, s)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Za),
    (e.stateNode = t),
    (t._reactInternals = e),
    r && ((e = e.stateNode), (e.__reactInternalMemoizedUnmaskedChildContext = o), (e.__reactInternalMemoizedMaskedChildContext = s)),
    t
  );
}
function Tp(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Za.enqueueReplaceState(t, t.state, null));
}
function oc(e, t, n, r) {
  var o = e.stateNode;
  ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), Cd(e));
  var s = t.contextType;
  (typeof s == 'object' && s !== null ? (o.context = Ct(s)) : ((s = tt(t) ? Tr : Ue.current), (o.context = jo(e, s))),
    (o.state = e.memoizedState),
    (s = t.getDerivedStateFromProps),
    typeof s == 'function' && (rc(e, t, s, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof o.getSnapshotBeforeUpdate == 'function' ||
      (typeof o.UNSAFE_componentWillMount != 'function' && typeof o.componentWillMount != 'function') ||
      ((t = o.state),
      typeof o.componentWillMount == 'function' && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == 'function' && o.UNSAFE_componentWillMount(),
      t !== o.state && Za.enqueueReplaceState(o, o.state, null),
      wa(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == 'function' && (e.flags |= 4194308));
}
function Ao(e, t) {
  try {
    var n = '',
      r = t;
    do ((n += W1(r)), (r = r.return));
    while (r);
    var o = n;
  } catch (s) {
    o =
      `
Error generating stack: ` +
      s.message +
      `
` +
      s.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function iu(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function sc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var gC = typeof WeakMap == 'function' ? WeakMap : Map;
function zv(e, t, n) {
  ((n = pn(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (Na || ((Na = !0), (mc = r)), sc(e, t));
    }),
    n
  );
}
function Bv(e, t, n) {
  ((n = pn(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == 'function') {
    var o = t.value;
    ((n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        sc(e, t);
      }));
  }
  var s = e.stateNode;
  return (
    s !== null &&
      typeof s.componentDidCatch == 'function' &&
      (n.callback = function () {
        (sc(e, t), typeof r != 'function' && (Xn === null ? (Xn = new Set([this])) : Xn.add(this)));
        var i = t.stack;
        this.componentDidCatch(t.value, { componentStack: i !== null ? i : '' });
      }),
    n
  );
}
function Rp(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new gC();
    var o = new Set();
    r.set(t, o);
  } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
  o.has(n) || (o.add(n), (e = MC.bind(null, e, t, n)), t.then(e, e));
}
function jp(e) {
  do {
    var t;
    if (((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)), t)) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Mp(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 && (n.alternate === null ? (n.tag = 17) : ((t = pn(-1, 1)), (t.tag = 2), Yn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var yC = Cn.ReactCurrentOwner,
  Je = !1;
function We(e, t, n, r) {
  t.child = e === null ? vv(t, null, n, r) : _o(t, e.child, n, r);
}
function _p(e, t, n, r, o) {
  n = n.render;
  var s = t.ref;
  return (
    mo(t, o),
    (r = kd(e, t, n, r, s, o)),
    (n = Td()),
    e !== null && !Je
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~o), gn(e, t, o))
      : (xe && n && md(t), (t.flags |= 1), We(e, t, r, o), t.child)
  );
}
function Ip(e, t, n, r, o) {
  if (e === null) {
    var s = n.type;
    return typeof s == 'function' && !Fd(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = s), Uv(e, t, s, r, o))
      : ((e = Zi(n.type, null, r, t, t.mode, o)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  if (((s = e.child), !(e.lanes & o))) {
    var i = s.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : As), n(i, r) && e.ref === t.ref)) return gn(e, t, o);
  }
  return ((t.flags |= 1), (e = Zn(s, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
}
function Uv(e, t, n, r, o) {
  if (e !== null) {
    var s = e.memoizedProps;
    if (As(s, r) && e.ref === t.ref)
      if (((Je = !1), (t.pendingProps = r = s), (e.lanes & o) !== 0)) e.flags & 131072 && (Je = !0);
      else return ((t.lanes = e.lanes), gn(e, t, o));
  }
  return ic(e, t, n, r, o);
}
function Vv(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    s = e !== null ? e.memoizedState : null;
  if (r.mode === 'hidden')
    if (!(t.mode & 1)) ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), he(uo, rt), (rt |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = s !== null ? s.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          he(uo, rt),
          (rt |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), (r = s !== null ? s.baseLanes : n), he(uo, rt), (rt |= r));
    }
  else (s !== null ? ((r = s.baseLanes | n), (t.memoizedState = null)) : (r = n), he(uo, rt), (rt |= r));
  return (We(e, t, o, n), t.child);
}
function Wv(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
}
function ic(e, t, n, r, o) {
  var s = tt(n) ? Tr : Ue.current;
  return (
    (s = jo(t, s)),
    mo(t, o),
    (n = kd(e, t, n, r, s, o)),
    (r = Td()),
    e !== null && !Je
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~o), gn(e, t, o))
      : (xe && r && md(t), (t.flags |= 1), We(e, t, n, o), t.child)
  );
}
function Ap(e, t, n, r, o) {
  if (tt(n)) {
    var s = !0;
    ma(t);
  } else s = !1;
  if ((mo(t, o), t.stateNode === null)) (Yi(e, t), $v(t, n, r), oc(t, n, r, o), (r = !0));
  else if (e === null) {
    var i = t.stateNode,
      a = t.memoizedProps;
    i.props = a;
    var l = i.context,
      u = n.contextType;
    typeof u == 'object' && u !== null ? (u = Ct(u)) : ((u = tt(n) ? Tr : Ue.current), (u = jo(t, u)));
    var f = n.getDerivedStateFromProps,
      p = typeof f == 'function' || typeof i.getSnapshotBeforeUpdate == 'function';
    (p ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' && typeof i.componentWillReceiveProps != 'function') ||
      ((a !== r || l !== u) && Tp(t, i, r, u)),
      (An = !1));
    var m = t.memoizedState;
    ((i.state = m),
      wa(t, r, i, o),
      (l = t.memoizedState),
      a !== r || m !== l || et.current || An
        ? (typeof f == 'function' && (rc(t, n, f, r), (l = t.memoizedState)),
          (a = An || kp(t, n, a, r, m, l, u))
            ? (p ||
                (typeof i.UNSAFE_componentWillMount != 'function' && typeof i.componentWillMount != 'function') ||
                (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (t.memoizedProps = r), (t.memoizedState = l)),
          (i.props = r),
          (i.state = l),
          (i.context = u),
          (r = a))
        : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1)));
  } else {
    ((i = t.stateNode),
      yv(e, t),
      (a = t.memoizedProps),
      (u = t.type === t.elementType ? a : jt(t.type, a)),
      (i.props = u),
      (p = t.pendingProps),
      (m = i.context),
      (l = n.contextType),
      typeof l == 'object' && l !== null ? (l = Ct(l)) : ((l = tt(n) ? Tr : Ue.current), (l = jo(t, l))));
    var v = n.getDerivedStateFromProps;
    ((f = typeof v == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' && typeof i.componentWillReceiveProps != 'function') ||
      ((a !== p || m !== l) && Tp(t, i, r, l)),
      (An = !1),
      (m = t.memoizedState),
      (i.state = m),
      wa(t, r, i, o));
    var S = t.memoizedState;
    a !== p || m !== S || et.current || An
      ? (typeof v == 'function' && (rc(t, n, v, r), (S = t.memoizedState)),
        (u = An || kp(t, n, u, r, m, S, l) || !1)
          ? (f ||
              (typeof i.UNSAFE_componentWillUpdate != 'function' && typeof i.componentWillUpdate != 'function') ||
              (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(r, S, l),
              typeof i.UNSAFE_componentWillUpdate == 'function' && i.UNSAFE_componentWillUpdate(r, S, l)),
            typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != 'function' || (a === e.memoizedProps && m === e.memoizedState) || (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != 'function' || (a === e.memoizedProps && m === e.memoizedState) || (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = S)),
        (i.props = r),
        (i.state = S),
        (i.context = l),
        (r = u))
      : (typeof i.componentDidUpdate != 'function' || (a === e.memoizedProps && m === e.memoizedState) || (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != 'function' || (a === e.memoizedProps && m === e.memoizedState) || (t.flags |= 1024),
        (r = !1));
  }
  return ac(e, t, n, r, s, o);
}
function ac(e, t, n, r, o, s) {
  Wv(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return (o && xp(t, n, !1), gn(e, t, s));
  ((r = t.stateNode), (yC.current = t));
  var a = i && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i ? ((t.child = _o(t, e.child, null, s)), (t.child = _o(t, null, a, s))) : We(e, t, a, s),
    (t.memoizedState = r.state),
    o && xp(t, n, !0),
    t.child
  );
}
function Hv(e) {
  var t = e.stateNode;
  (t.pendingContext ? yp(e, t.pendingContext, t.pendingContext !== t.context) : t.context && yp(e, t.context, !1), Ed(e, t.containerInfo));
}
function Op(e, t, n, r, o) {
  return (Mo(), gd(o), (t.flags |= 256), We(e, t, n, r), t.child);
}
var lc = { dehydrated: null, treeContext: null, retryLane: 0 };
function uc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Kv(e, t, n) {
  var r = t.pendingProps,
    o = we.current,
    s = !1,
    i = (t.flags & 128) !== 0,
    a;
  if (
    ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    a ? ((s = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (o |= 1),
    he(we, o & 1),
    e === null)
  )
    return (
      tc(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1 ? (e.data === '$!' ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1), null)
        : ((i = r.children),
          (e = r.fallback),
          s
            ? ((r = t.mode),
              (s = t.child),
              (i = { mode: 'hidden', children: i }),
              !(r & 1) && s !== null ? ((s.childLanes = 0), (s.pendingProps = i)) : (s = tl(i, r, 0, null)),
              (e = kr(e, r, n, null)),
              (s.return = t),
              (e.return = t),
              (s.sibling = e),
              (t.child = s),
              (t.child.memoizedState = uc(n)),
              (t.memoizedState = lc),
              e)
            : Md(t, i))
    );
  if (((o = e.memoizedState), o !== null && ((a = o.dehydrated), a !== null))) return xC(e, t, i, r, a, o, n);
  if (s) {
    ((s = r.fallback), (i = t.mode), (o = e.child), (a = o.sibling));
    var l = { mode: 'hidden', children: r.children };
    return (
      !(i & 1) && t.child !== o
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = l), (t.deletions = null))
        : ((r = Zn(o, l)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      a !== null ? (s = Zn(a, s)) : ((s = kr(s, i, n, null)), (s.flags |= 2)),
      (s.return = t),
      (r.return = t),
      (r.sibling = s),
      (t.child = r),
      (r = s),
      (s = t.child),
      (i = e.child.memoizedState),
      (i = i === null ? uc(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }),
      (s.memoizedState = i),
      (s.childLanes = e.childLanes & ~n),
      (t.memoizedState = lc),
      r
    );
  }
  return (
    (s = e.child),
    (e = s.sibling),
    (r = Zn(s, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null && ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Md(e, t) {
  return ((t = tl({ mode: 'visible', children: t }, e.mode, 0, null)), (t.return = e), (e.child = t));
}
function Ti(e, t, n, r) {
  return (r !== null && gd(r), _o(t, e.child, null, n), (e = Md(t, t.pendingProps.children)), (e.flags |= 2), (t.memoizedState = null), e);
}
function xC(e, t, n, r, o, s, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = iu(Error(_(422)))), Ti(e, t, i, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((s = r.fallback),
          (o = t.mode),
          (r = tl({ mode: 'visible', children: r.children }, o, 0, null)),
          (s = kr(s, o, i, null)),
          (s.flags |= 2),
          (r.return = t),
          (s.return = t),
          (r.sibling = s),
          (t.child = r),
          t.mode & 1 && _o(t, e.child, null, i),
          (t.child.memoizedState = uc(i)),
          (t.memoizedState = lc),
          s);
  if (!(t.mode & 1)) return Ti(e, t, i, null);
  if (o.data === '$!') {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var a = r.dgst;
    return ((r = a), (s = Error(_(419))), (r = iu(s, r, void 0)), Ti(e, t, i, r));
  }
  if (((a = (i & e.childLanes) !== 0), Je || a)) {
    if (((r = _e), r !== null)) {
      switch (i & -i) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
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
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      ((o = o & (r.suspendedLanes | i) ? 0 : o), o !== 0 && o !== s.retryLane && ((s.retryLane = o), vn(e, o), Lt(r, e, o, -1)));
    }
    return (Ld(), (r = iu(Error(_(421)))), Ti(e, t, i, r));
  }
  return o.data === '$?'
    ? ((t.flags |= 128), (t.child = e.child), (t = _C.bind(null, e)), (o._reactRetry = t), null)
    : ((e = s.treeContext),
      (st = Qn(o.nextSibling)),
      (it = t),
      (xe = !0),
      (Ot = null),
      e !== null && ((vt[gt++] = dn), (vt[gt++] = fn), (vt[gt++] = Rr), (dn = e.id), (fn = e.overflow), (Rr = t)),
      (t = Md(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Dp(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), nc(e.return, t, n));
}
function au(e, t, n, r, o) {
  var s = e.memoizedState;
  s === null
    ? (e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: o })
    : ((s.isBackwards = t), (s.rendering = null), (s.renderingStartTime = 0), (s.last = r), (s.tail = n), (s.tailMode = o));
}
function Gv(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    s = r.tail;
  if ((We(e, t, r.children, n), (r = we.current), r & 2)) ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Dp(e, n, t);
        else if (e.tag === 19) Dp(e, n, t);
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
  if ((he(we, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case 'forwards':
        for (n = t.child, o = null; n !== null; ) ((e = n.alternate), e !== null && Sa(e) === null && (o = n), (n = n.sibling));
        ((n = o), n === null ? ((o = t.child), (t.child = null)) : ((o = n.sibling), (n.sibling = null)), au(t, !1, o, n, s));
        break;
      case 'backwards':
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && Sa(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
        }
        au(t, !0, n, null, s);
        break;
      case 'together':
        au(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Yi(e, t) {
  !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function gn(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (Mr |= t.lanes), !(n & t.childLanes))) return null;
  if (e !== null && t.child !== e.child) throw Error(_(153));
  if (t.child !== null) {
    for (e = t.child, n = Zn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      ((e = e.sibling), (n = n.sibling = Zn(e, e.pendingProps)), (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function wC(e, t, n) {
  switch (t.tag) {
    case 3:
      (Hv(t), Mo());
      break;
    case 5:
      xv(t);
      break;
    case 1:
      tt(t.type) && ma(t);
      break;
    case 4:
      Ed(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      (he(ya, r._currentValue), (r._currentValue = o));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (he(we, we.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Kv(e, t, n)
            : (he(we, we.current & 1), (e = gn(e, t, n)), e !== null ? e.sibling : null);
      he(we, we.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Gv(e, t, n);
        t.flags |= 128;
      }
      if (((o = t.memoizedState), o !== null && ((o.rendering = null), (o.tail = null), (o.lastEffect = null)), he(we, we.current), r))
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Vv(e, t, n));
  }
  return gn(e, t, n);
}
var Qv, cc, Yv, Xv;
Qv = function (e, t) {
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
cc = function () {};
Yv = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    ((e = t.stateNode), xr(Zt.current));
    var s = null;
    switch (n) {
      case 'input':
        ((o = _u(e, o)), (r = _u(e, r)), (s = []));
        break;
      case 'select':
        ((o = Ce({}, o, { value: void 0 })), (r = Ce({}, r, { value: void 0 })), (s = []));
        break;
      case 'textarea':
        ((o = Ou(e, o)), (r = Ou(e, r)), (s = []));
        break;
      default:
        typeof o.onClick != 'function' && typeof r.onClick == 'function' && (e.onclick = pa);
    }
    Lu(n, r);
    var i;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === 'style') {
          var a = o[u];
          for (i in a) a.hasOwnProperty(i) && (n || (n = {}), (n[i] = ''));
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (ks.hasOwnProperty(u) ? s || (s = []) : (s = s || []).push(u, null));
    for (u in r) {
      var l = r[u];
      if (((a = o != null ? o[u] : void 0), r.hasOwnProperty(u) && l !== a && (l != null || a != null)))
        if (u === 'style')
          if (a) {
            for (i in a) !a.hasOwnProperty(i) || (l && l.hasOwnProperty(i)) || (n || (n = {}), (n[i] = ''));
            for (i in l) l.hasOwnProperty(i) && a[i] !== l[i] && (n || (n = {}), (n[i] = l[i]));
          } else (n || (s || (s = []), s.push(u, n)), (n = l));
        else
          u === 'dangerouslySetInnerHTML'
            ? ((l = l ? l.__html : void 0), (a = a ? a.__html : void 0), l != null && a !== l && (s = s || []).push(u, l))
            : u === 'children'
              ? (typeof l != 'string' && typeof l != 'number') || (s = s || []).push(u, '' + l)
              : u !== 'suppressContentEditableWarning' &&
                u !== 'suppressHydrationWarning' &&
                (ks.hasOwnProperty(u)
                  ? (l != null && u === 'onScroll' && ve('scroll', e), s || a === l || (s = []))
                  : (s = s || []).push(u, l));
    }
    n && (s = s || []).push('style', n);
    var u = s;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Xv = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function ss(e, t) {
  if (!xe)
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
function $e(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      ((n |= o.lanes | o.childLanes), (r |= o.subtreeFlags & 14680064), (r |= o.flags & 14680064), (o.return = e), (o = o.sibling));
  else
    for (o = e.child; o !== null; ) ((n |= o.lanes | o.childLanes), (r |= o.subtreeFlags), (r |= o.flags), (o.return = e), (o = o.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function SC(e, t, n) {
  var r = t.pendingProps;
  switch ((vd(t), t.tag)) {
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
      return ($e(t), null);
    case 1:
      return (tt(t.type) && ha(), $e(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Io(),
        ge(et),
        ge(Ue),
        Nd(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Pi(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ot !== null && (yc(Ot), (Ot = null)))),
        cc(e, t),
        $e(t),
        null
      );
    case 5:
      bd(t);
      var o = xr($s.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (Yv(e, t, n, r, o), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(_(166));
          return ($e(t), null);
        }
        if (((e = xr(Zt.current)), Pi(t))) {
          ((r = t.stateNode), (n = t.type));
          var s = t.memoizedProps;
          switch (((r[Qt] = t), (r[Ls] = s), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              (ve('cancel', r), ve('close', r));
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              ve('load', r);
              break;
            case 'video':
            case 'audio':
              for (o = 0; o < fs.length; o++) ve(fs[o], r);
              break;
            case 'source':
              ve('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              (ve('error', r), ve('load', r));
              break;
            case 'details':
              ve('toggle', r);
              break;
            case 'input':
              (Hf(r, s), ve('invalid', r));
              break;
            case 'select':
              ((r._wrapperState = { wasMultiple: !!s.multiple }), ve('invalid', r));
              break;
            case 'textarea':
              (Gf(r, s), ve('invalid', r));
          }
          (Lu(n, s), (o = null));
          for (var i in s)
            if (s.hasOwnProperty(i)) {
              var a = s[i];
              i === 'children'
                ? typeof a == 'string'
                  ? r.textContent !== a && (s.suppressHydrationWarning !== !0 && Ni(r.textContent, a, e), (o = ['children', a]))
                  : typeof a == 'number' &&
                    r.textContent !== '' + a &&
                    (s.suppressHydrationWarning !== !0 && Ni(r.textContent, a, e), (o = ['children', '' + a]))
                : ks.hasOwnProperty(i) && a != null && i === 'onScroll' && ve('scroll', r);
            }
          switch (n) {
            case 'input':
              (gi(r), Kf(r, s, !0));
              break;
            case 'textarea':
              (gi(r), Qf(r));
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof s.onClick == 'function' && (r.onclick = pa);
          }
          ((r = o), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((i = o.nodeType === 9 ? o : o.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = bm(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = i.createElement('div')), (e.innerHTML = '<script><\/script>'), (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = i.createElement(n, { is: r.is }))
                  : ((e = i.createElement(n)), n === 'select' && ((i = e), r.multiple ? (i.multiple = !0) : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[Qt] = t),
            (e[Ls] = r),
            Qv(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((i = Fu(n, r)), n)) {
              case 'dialog':
                (ve('cancel', e), ve('close', e), (o = r));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                (ve('load', e), (o = r));
                break;
              case 'video':
              case 'audio':
                for (o = 0; o < fs.length; o++) ve(fs[o], e);
                o = r;
                break;
              case 'source':
                (ve('error', e), (o = r));
                break;
              case 'img':
              case 'image':
              case 'link':
                (ve('error', e), ve('load', e), (o = r));
                break;
              case 'details':
                (ve('toggle', e), (o = r));
                break;
              case 'input':
                (Hf(e, r), (o = _u(e, r)), ve('invalid', e));
                break;
              case 'option':
                o = r;
                break;
              case 'select':
                ((e._wrapperState = { wasMultiple: !!r.multiple }), (o = Ce({}, r, { value: void 0 })), ve('invalid', e));
                break;
              case 'textarea':
                (Gf(e, r), (o = Ou(e, r)), ve('invalid', e));
                break;
              default:
                o = r;
            }
            (Lu(n, o), (a = o));
            for (s in a)
              if (a.hasOwnProperty(s)) {
                var l = a[s];
                s === 'style'
                  ? km(e, l)
                  : s === 'dangerouslySetInnerHTML'
                    ? ((l = l ? l.__html : void 0), l != null && Nm(e, l))
                    : s === 'children'
                      ? typeof l == 'string'
                        ? (n !== 'textarea' || l !== '') && Ts(e, l)
                        : typeof l == 'number' && Ts(e, '' + l)
                      : s !== 'suppressContentEditableWarning' &&
                        s !== 'suppressHydrationWarning' &&
                        s !== 'autoFocus' &&
                        (ks.hasOwnProperty(s) ? l != null && s === 'onScroll' && ve('scroll', e) : l != null && td(e, s, l, i));
              }
            switch (n) {
              case 'input':
                (gi(e), Kf(e, r, !1));
                break;
              case 'textarea':
                (gi(e), Qf(e));
                break;
              case 'option':
                r.value != null && e.setAttribute('value', '' + er(r.value));
                break;
              case 'select':
                ((e.multiple = !!r.multiple),
                  (s = r.value),
                  s != null ? co(e, !!r.multiple, s, !1) : r.defaultValue != null && co(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof o.onClick == 'function' && (e.onclick = pa);
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
      return ($e(t), null);
    case 6:
      if (e && t.stateNode != null) Xv(e, t, e.memoizedProps, r);
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(_(166));
        if (((n = xr($s.current)), xr(Zt.current), Pi(t))) {
          if (((r = t.stateNode), (n = t.memoizedProps), (r[Qt] = t), (s = r.nodeValue !== n) && ((e = it), e !== null)))
            switch (e.tag) {
              case 3:
                Ni(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Ni(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          s && (t.flags |= 4);
        } else ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)), (r[Qt] = t), (t.stateNode = r));
      }
      return ($e(t), null);
    case 13:
      if ((ge(we), (r = t.memoizedState), e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))) {
        if (xe && st !== null && t.mode & 1 && !(t.flags & 128)) (hv(), Mo(), (t.flags |= 98560), (s = !1));
        else if (((s = Pi(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!s) throw Error(_(318));
            if (((s = t.memoizedState), (s = s !== null ? s.dehydrated : null), !s)) throw Error(_(317));
            s[Qt] = t;
          } else (Mo(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4));
          ($e(t), (s = !1));
        } else (Ot !== null && (yc(Ot), (Ot = null)), (s = !0));
        if (!s) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192), t.mode & 1 && (e === null || we.current & 1 ? je === 0 && (je = 3) : Ld())),
          t.updateQueue !== null && (t.flags |= 4),
          $e(t),
          null);
    case 4:
      return (Io(), cc(e, t), e === null && Os(t.stateNode.containerInfo), $e(t), null);
    case 10:
      return (wd(t.type._context), $e(t), null);
    case 17:
      return (tt(t.type) && ha(), $e(t), null);
    case 19:
      if ((ge(we), (s = t.memoizedState), s === null)) return ($e(t), null);
      if (((r = (t.flags & 128) !== 0), (i = s.rendering), i === null))
        if (r) ss(s, !1);
        else {
          if (je !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = Sa(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    ss(s, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  ((s = n),
                    (e = r),
                    (s.flags &= 14680066),
                    (i = s.alternate),
                    i === null
                      ? ((s.childLanes = 0),
                        (s.lanes = e),
                        (s.child = null),
                        (s.subtreeFlags = 0),
                        (s.memoizedProps = null),
                        (s.memoizedState = null),
                        (s.updateQueue = null),
                        (s.dependencies = null),
                        (s.stateNode = null))
                      : ((s.childLanes = i.childLanes),
                        (s.lanes = i.lanes),
                        (s.child = i.child),
                        (s.subtreeFlags = 0),
                        (s.deletions = null),
                        (s.memoizedProps = i.memoizedProps),
                        (s.memoizedState = i.memoizedState),
                        (s.updateQueue = i.updateQueue),
                        (s.type = i.type),
                        (e = i.dependencies),
                        (s.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling));
                return (he(we, (we.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          s.tail !== null && Pe() > Oo && ((t.flags |= 128), (r = !0), ss(s, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Sa(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              ss(s, !0),
              s.tail === null && s.tailMode === 'hidden' && !i.alternate && !xe)
            )
              return ($e(t), null);
          } else 2 * Pe() - s.renderingStartTime > Oo && n !== 1073741824 && ((t.flags |= 128), (r = !0), ss(s, !1), (t.lanes = 4194304));
        s.isBackwards ? ((i.sibling = t.child), (t.child = i)) : ((n = s.last), n !== null ? (n.sibling = i) : (t.child = i), (s.last = i));
      }
      return s.tail !== null
        ? ((t = s.tail),
          (s.rendering = t),
          (s.tail = t.sibling),
          (s.renderingStartTime = Pe()),
          (t.sibling = null),
          (n = we.current),
          he(we, r ? (n & 1) | 2 : n & 1),
          t)
        : ($e(t), null);
    case 22:
    case 23:
      return (
        Dd(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1 ? rt & 1073741824 && ($e(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : $e(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(_(156, t.tag));
}
function CC(e, t) {
  switch ((vd(t), t.tag)) {
    case 1:
      return (tt(t.type) && ha(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
    case 3:
      return (Io(), ge(et), ge(Ue), Nd(), (e = t.flags), e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null);
    case 5:
      return (bd(t), null);
    case 13:
      if ((ge(we), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(_(340));
        Mo();
      }
      return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
    case 19:
      return (ge(we), null);
    case 4:
      return (Io(), null);
    case 10:
      return (wd(t.type._context), null);
    case 22:
    case 23:
      return (Dd(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Ri = !1,
  Be = !1,
  EC = typeof WeakSet == 'function' ? WeakSet : Set,
  B = null;
function lo(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null);
      } catch (r) {
        be(e, t, r);
      }
    else n.current = null;
}
function dc(e, t, n) {
  try {
    n();
  } catch (r) {
    be(e, t, r);
  }
}
var Lp = !1;
function bC(e, t) {
  if (((Qu = ca), (e = tv()), hd(e))) {
    if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            s = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, s.nodeType);
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            a = -1,
            l = -1,
            u = 0,
            f = 0,
            p = e,
            m = null;
          t: for (;;) {
            for (
              var v;
              p !== n || (o !== 0 && p.nodeType !== 3) || (a = i + o),
                p !== s || (r !== 0 && p.nodeType !== 3) || (l = i + r),
                p.nodeType === 3 && (i += p.nodeValue.length),
                (v = p.firstChild) !== null;

            )
              ((m = p), (p = v));
            for (;;) {
              if (p === e) break t;
              if ((m === n && ++u === o && (a = i), m === s && ++f === r && (l = i), (v = p.nextSibling) !== null)) break;
              ((p = m), (m = p.parentNode));
            }
            p = v;
          }
          n = a === -1 || l === -1 ? null : { start: a, end: l };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Yu = { focusedElem: e, selectionRange: n }, ca = !1, B = t; B !== null; )
    if (((t = B), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)) ((e.return = t), (B = e));
    else
      for (; B !== null; ) {
        t = B;
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
                  var g = S.memoizedProps,
                    w = S.memoizedState,
                    x = t.stateNode,
                    h = x.getSnapshotBeforeUpdate(t.elementType === t.type ? g : jt(t.type, g), w);
                  x.__reactInternalSnapshotBeforeUpdate = h;
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
                throw Error(_(163));
            }
        } catch (C) {
          be(t, t.return, C);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (B = e));
          break;
        }
        B = t.return;
      }
  return ((S = Lp), (Lp = !1), S);
}
function Es(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var s = o.destroy;
        ((o.destroy = void 0), s !== void 0 && dc(t, n, s));
      }
      o = o.next;
    } while (o !== r);
  }
}
function Ja(e, t) {
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
function fc(e) {
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
function qv(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), qv(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 && ((t = e.stateNode), t !== null && (delete t[Qt], delete t[Ls], delete t[Zu], delete t[iC], delete t[aC])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function Zv(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Fp(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Zv(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function pc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8 ? ((t = n.parentNode), t.insertBefore(e, n)) : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = pa)));
  else if (r !== 4 && ((e = e.child), e !== null)) for (pc(e, t, n), e = e.sibling; e !== null; ) (pc(e, t, n), (e = e.sibling));
}
function hc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null)) for (hc(e, t, n), e = e.sibling; e !== null; ) (hc(e, t, n), (e = e.sibling));
}
var Ie = null,
  At = !1;
function kn(e, t, n) {
  for (n = n.child; n !== null; ) (Jv(e, t, n), (n = n.sibling));
}
function Jv(e, t, n) {
  if (qt && typeof qt.onCommitFiberUnmount == 'function')
    try {
      qt.onCommitFiberUnmount(Ha, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Be || lo(n, t);
    case 6:
      var r = Ie,
        o = At;
      ((Ie = null),
        kn(e, t, n),
        (Ie = r),
        (At = o),
        Ie !== null &&
          (At
            ? ((e = Ie), (n = n.stateNode), e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ie.removeChild(n.stateNode)));
      break;
    case 18:
      Ie !== null &&
        (At
          ? ((e = Ie), (n = n.stateNode), e.nodeType === 8 ? eu(e.parentNode, n) : e.nodeType === 1 && eu(e, n), _s(e))
          : eu(Ie, n.stateNode));
      break;
    case 4:
      ((r = Ie), (o = At), (Ie = n.stateNode.containerInfo), (At = !0), kn(e, t, n), (Ie = r), (At = o));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Be && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        o = r = r.next;
        do {
          var s = o,
            i = s.destroy;
          ((s = s.tag), i !== void 0 && (s & 2 || s & 4) && dc(n, t, i), (o = o.next));
        } while (o !== r);
      }
      kn(e, t, n);
      break;
    case 1:
      if (!Be && (lo(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
        try {
          ((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount());
        } catch (a) {
          be(n, t, a);
        }
      kn(e, t, n);
      break;
    case 21:
      kn(e, t, n);
      break;
    case 22:
      n.mode & 1 ? ((Be = (r = Be) || n.memoizedState !== null), kn(e, t, n), (Be = r)) : kn(e, t, n);
      break;
    default:
      kn(e, t, n);
  }
}
function $p(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new EC()),
      t.forEach(function (r) {
        var o = IC.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      }));
  }
}
function kt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var s = e,
          i = t,
          a = i;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              ((Ie = a.stateNode), (At = !1));
              break e;
            case 3:
              ((Ie = a.stateNode.containerInfo), (At = !0));
              break e;
            case 4:
              ((Ie = a.stateNode.containerInfo), (At = !0));
              break e;
          }
          a = a.return;
        }
        if (Ie === null) throw Error(_(160));
        (Jv(s, i, o), (Ie = null), (At = !1));
        var l = o.alternate;
        (l !== null && (l.return = null), (o.return = null));
      } catch (u) {
        be(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) (eg(t, e), (t = t.sibling));
}
function eg(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((kt(t, e), Vt(e), r & 4)) {
        try {
          (Es(3, e, e.return), Ja(3, e));
        } catch (g) {
          be(e, e.return, g);
        }
        try {
          Es(5, e, e.return);
        } catch (g) {
          be(e, e.return, g);
        }
      }
      break;
    case 1:
      (kt(t, e), Vt(e), r & 512 && n !== null && lo(n, n.return));
      break;
    case 5:
      if ((kt(t, e), Vt(e), r & 512 && n !== null && lo(n, n.return), e.flags & 32)) {
        var o = e.stateNode;
        try {
          Ts(o, '');
        } catch (g) {
          be(e, e.return, g);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var s = e.memoizedProps,
          i = n !== null ? n.memoizedProps : s,
          a = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            (a === 'input' && s.type === 'radio' && s.name != null && Cm(o, s), Fu(a, i));
            var u = Fu(a, s);
            for (i = 0; i < l.length; i += 2) {
              var f = l[i],
                p = l[i + 1];
              f === 'style' ? km(o, p) : f === 'dangerouslySetInnerHTML' ? Nm(o, p) : f === 'children' ? Ts(o, p) : td(o, f, p, u);
            }
            switch (a) {
              case 'input':
                Iu(o, s);
                break;
              case 'textarea':
                Em(o, s);
                break;
              case 'select':
                var m = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!s.multiple;
                var v = s.value;
                v != null
                  ? co(o, !!s.multiple, v, !1)
                  : m !== !!s.multiple &&
                    (s.defaultValue != null ? co(o, !!s.multiple, s.defaultValue, !0) : co(o, !!s.multiple, s.multiple ? [] : '', !1));
            }
            o[Ls] = s;
          } catch (g) {
            be(e, e.return, g);
          }
      }
      break;
    case 6:
      if ((kt(t, e), Vt(e), r & 4)) {
        if (e.stateNode === null) throw Error(_(162));
        ((o = e.stateNode), (s = e.memoizedProps));
        try {
          o.nodeValue = s;
        } catch (g) {
          be(e, e.return, g);
        }
      }
      break;
    case 3:
      if ((kt(t, e), Vt(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          _s(t.containerInfo);
        } catch (g) {
          be(e, e.return, g);
        }
      break;
    case 4:
      (kt(t, e), Vt(e));
      break;
    case 13:
      (kt(t, e),
        Vt(e),
        (o = e.child),
        o.flags & 8192 &&
          ((s = o.memoizedState !== null),
          (o.stateNode.isHidden = s),
          !s || (o.alternate !== null && o.alternate.memoizedState !== null) || (Ad = Pe())),
        r & 4 && $p(e));
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null), e.mode & 1 ? ((Be = (u = Be) || f), kt(t, e), (Be = u)) : kt(t, e), Vt(e), r & 8192)
      ) {
        if (((u = e.memoizedState !== null), (e.stateNode.isHidden = u) && !f && e.mode & 1))
          for (B = e, f = e.child; f !== null; ) {
            for (p = B = f; B !== null; ) {
              switch (((m = B), (v = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Es(4, m, m.return);
                  break;
                case 1:
                  lo(m, m.return);
                  var S = m.stateNode;
                  if (typeof S.componentWillUnmount == 'function') {
                    ((r = m), (n = m.return));
                    try {
                      ((t = r), (S.props = t.memoizedProps), (S.state = t.memoizedState), S.componentWillUnmount());
                    } catch (g) {
                      be(r, n, g);
                    }
                  }
                  break;
                case 5:
                  lo(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    Bp(p);
                    continue;
                  }
              }
              v !== null ? ((v.return = m), (B = v)) : Bp(p);
            }
            f = f.sibling;
          }
        e: for (f = null, p = e; ; ) {
          if (p.tag === 5) {
            if (f === null) {
              f = p;
              try {
                ((o = p.stateNode),
                  u
                    ? ((s = o.style),
                      typeof s.setProperty == 'function' ? s.setProperty('display', 'none', 'important') : (s.display = 'none'))
                    : ((a = p.stateNode),
                      (l = p.memoizedProps.style),
                      (i = l != null && l.hasOwnProperty('display') ? l.display : null),
                      (a.style.display = Pm('display', i))));
              } catch (g) {
                be(e, e.return, g);
              }
            }
          } else if (p.tag === 6) {
            if (f === null)
              try {
                p.stateNode.nodeValue = u ? '' : p.memoizedProps;
              } catch (g) {
                be(e, e.return, g);
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
      (kt(t, e), Vt(e), r & 4 && $p(e));
      break;
    case 21:
      break;
    default:
      (kt(t, e), Vt(e));
  }
}
function Vt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Zv(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(_(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (Ts(o, ''), (r.flags &= -33));
          var s = Fp(e);
          hc(e, s, o);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            a = Fp(e);
          pc(e, a, i);
          break;
        default:
          throw Error(_(161));
      }
    } catch (l) {
      be(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function NC(e, t, n) {
  ((B = e), tg(e));
}
function tg(e, t, n) {
  for (var r = (e.mode & 1) !== 0; B !== null; ) {
    var o = B,
      s = o.child;
    if (o.tag === 22 && r) {
      var i = o.memoizedState !== null || Ri;
      if (!i) {
        var a = o.alternate,
          l = (a !== null && a.memoizedState !== null) || Be;
        a = Ri;
        var u = Be;
        if (((Ri = i), (Be = l) && !u))
          for (B = o; B !== null; )
            ((i = B), (l = i.child), i.tag === 22 && i.memoizedState !== null ? Up(o) : l !== null ? ((l.return = i), (B = l)) : Up(o));
        for (; s !== null; ) ((B = s), tg(s), (s = s.sibling));
        ((B = o), (Ri = a), (Be = u));
      }
      zp(e);
    } else o.subtreeFlags & 8772 && s !== null ? ((s.return = o), (B = s)) : zp(e);
  }
}
function zp(e) {
  for (; B !== null; ) {
    var t = B;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Be || Ja(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Be)
                if (n === null) r.componentDidMount();
                else {
                  var o = t.elementType === t.type ? n.memoizedProps : jt(t.type, n.memoizedProps);
                  r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var s = t.updateQueue;
              s !== null && bp(t, s, r);
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
                bp(t, i, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var l = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    l.autoFocus && n.focus();
                    break;
                  case 'img':
                    l.src && (n.src = l.src);
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
                    p !== null && _s(p);
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
              throw Error(_(163));
          }
        Be || (t.flags & 512 && fc(t));
      } catch (m) {
        be(t, t.return, m);
      }
    }
    if (t === e) {
      B = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (B = n));
      break;
    }
    B = t.return;
  }
}
function Bp(e) {
  for (; B !== null; ) {
    var t = B;
    if (t === e) {
      B = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (B = n));
      break;
    }
    B = t.return;
  }
}
function Up(e) {
  for (; B !== null; ) {
    var t = B;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ja(4, t);
          } catch (l) {
            be(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == 'function') {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              be(t, o, l);
            }
          }
          var s = t.return;
          try {
            fc(t);
          } catch (l) {
            be(t, s, l);
          }
          break;
        case 5:
          var i = t.return;
          try {
            fc(t);
          } catch (l) {
            be(t, i, l);
          }
      }
    } catch (l) {
      be(t, t.return, l);
    }
    if (t === e) {
      B = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      ((a.return = t.return), (B = a));
      break;
    }
    B = t.return;
  }
}
var PC = Math.ceil,
  ba = Cn.ReactCurrentDispatcher,
  _d = Cn.ReactCurrentOwner,
  wt = Cn.ReactCurrentBatchConfig,
  re = 0,
  _e = null,
  ke = null,
  Ae = 0,
  rt = 0,
  uo = ir(0),
  je = 0,
  Vs = null,
  Mr = 0,
  el = 0,
  Id = 0,
  bs = null,
  Ze = null,
  Ad = 0,
  Oo = 1 / 0,
  ln = null,
  Na = !1,
  mc = null,
  Xn = null,
  ji = !1,
  Vn = null,
  Pa = 0,
  Ns = 0,
  vc = null,
  Xi = -1,
  qi = 0;
function Ke() {
  return re & 6 ? Pe() : Xi !== -1 ? Xi : (Xi = Pe());
}
function qn(e) {
  return e.mode & 1
    ? re & 2 && Ae !== 0
      ? Ae & -Ae
      : uC.transition !== null
        ? (qi === 0 && (qi = $m()), qi)
        : ((e = ue), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Km(e.type))), e)
    : 1;
}
function Lt(e, t, n, r) {
  if (50 < Ns) throw ((Ns = 0), (vc = null), Error(_(185)));
  (ti(e, n, r),
    (!(re & 2) || e !== _e) &&
      (e === _e && (!(re & 2) && (el |= n), je === 4 && Dn(e, Ae)),
      nt(e, r),
      n === 1 && re === 0 && !(t.mode & 1) && ((Oo = Pe() + 500), Xa && ar())));
}
function nt(e, t) {
  var n = e.callbackNode;
  uS(e, t);
  var r = ua(e, e === _e ? Ae : 0);
  if (r === 0) (n !== null && qf(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && qf(n), t === 1))
      (e.tag === 0 ? lC(Vp.bind(null, e)) : dv(Vp.bind(null, e)),
        oC(function () {
          !(re & 6) && ar();
        }),
        (n = null));
    else {
      switch (zm(r)) {
        case 1:
          n = id;
          break;
        case 4:
          n = Lm;
          break;
        case 16:
          n = la;
          break;
        case 536870912:
          n = Fm;
          break;
        default:
          n = la;
      }
      n = ug(n, ng.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function ng(e, t) {
  if (((Xi = -1), (qi = 0), re & 6)) throw Error(_(327));
  var n = e.callbackNode;
  if (vo() && e.callbackNode !== n) return null;
  var r = ua(e, e === _e ? Ae : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ka(e, r);
  else {
    t = r;
    var o = re;
    re |= 2;
    var s = og();
    (_e !== e || Ae !== t) && ((ln = null), (Oo = Pe() + 500), Pr(e, t));
    do
      try {
        RC();
        break;
      } catch (a) {
        rg(e, a);
      }
    while (!0);
    (xd(), (ba.current = s), (re = o), ke !== null ? (t = 0) : ((_e = null), (Ae = 0), (t = je)));
  }
  if (t !== 0) {
    if ((t === 2 && ((o = Vu(e)), o !== 0 && ((r = o), (t = gc(e, o)))), t === 1)) throw ((n = Vs), Pr(e, 0), Dn(e, r), nt(e, Pe()), n);
    if (t === 6) Dn(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) && !kC(o) && ((t = ka(e, r)), t === 2 && ((s = Vu(e)), s !== 0 && ((r = s), (t = gc(e, s)))), t === 1))
      )
        throw ((n = Vs), Pr(e, 0), Dn(e, r), nt(e, Pe()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(_(345));
        case 2:
          vr(e, Ze, ln);
          break;
        case 3:
          if ((Dn(e, r), (r & 130023424) === r && ((t = Ad + 500 - Pe()), 10 < t))) {
            if (ua(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              (Ke(), (e.pingedLanes |= e.suspendedLanes & o));
              break;
            }
            e.timeoutHandle = qu(vr.bind(null, e, Ze, ln), t);
            break;
          }
          vr(e, Ze, ln);
          break;
        case 4:
          if ((Dn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var i = 31 - Dt(r);
            ((s = 1 << i), (i = t[i]), i > o && (o = i), (r &= ~s));
          }
          if (
            ((r = o),
            (r = Pe() - r),
            (r =
              (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * PC(r / 1960)) -
              r),
            10 < r)
          ) {
            e.timeoutHandle = qu(vr.bind(null, e, Ze, ln), r);
            break;
          }
          vr(e, Ze, ln);
          break;
        case 5:
          vr(e, Ze, ln);
          break;
        default:
          throw Error(_(329));
      }
    }
  }
  return (nt(e, Pe()), e.callbackNode === n ? ng.bind(null, e) : null);
}
function gc(e, t) {
  var n = bs;
  return (
    e.current.memoizedState.isDehydrated && (Pr(e, t).flags |= 256),
    (e = ka(e, t)),
    e !== 2 && ((t = Ze), (Ze = n), t !== null && yc(t)),
    e
  );
}
function yc(e) {
  Ze === null ? (Ze = e) : Ze.push.apply(Ze, e);
}
function kC(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            s = o.getSnapshot;
          o = o.value;
          try {
            if (!Ft(s(), o)) return !1;
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
function Dn(e, t) {
  for (t &= ~Id, t &= ~el, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Dt(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function Vp(e) {
  if (re & 6) throw Error(_(327));
  vo();
  var t = ua(e, 0);
  if (!(t & 1)) return (nt(e, Pe()), null);
  var n = ka(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Vu(e);
    r !== 0 && ((t = r), (n = gc(e, r)));
  }
  if (n === 1) throw ((n = Vs), Pr(e, 0), Dn(e, t), nt(e, Pe()), n);
  if (n === 6) throw Error(_(345));
  return ((e.finishedWork = e.current.alternate), (e.finishedLanes = t), vr(e, Ze, ln), nt(e, Pe()), null);
}
function Od(e, t) {
  var n = re;
  re |= 1;
  try {
    return e(t);
  } finally {
    ((re = n), re === 0 && ((Oo = Pe() + 500), Xa && ar()));
  }
}
function _r(e) {
  Vn !== null && Vn.tag === 0 && !(re & 6) && vo();
  var t = re;
  re |= 1;
  var n = wt.transition,
    r = ue;
  try {
    if (((wt.transition = null), (ue = 1), e)) return e();
  } finally {
    ((ue = r), (wt.transition = n), (re = t), !(re & 6) && ar());
  }
}
function Dd() {
  ((rt = uo.current), ge(uo));
}
function Pr(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), rC(n)), ke !== null))
    for (n = ke.return; n !== null; ) {
      var r = n;
      switch ((vd(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && ha());
          break;
        case 3:
          (Io(), ge(et), ge(Ue), Nd());
          break;
        case 5:
          bd(r);
          break;
        case 4:
          Io();
          break;
        case 13:
          ge(we);
          break;
        case 19:
          ge(we);
          break;
        case 10:
          wd(r.type._context);
          break;
        case 22:
        case 23:
          Dd();
      }
      n = n.return;
    }
  if (((_e = e), (ke = e = Zn(e.current, null)), (Ae = rt = t), (je = 0), (Vs = null), (Id = el = Mr = 0), (Ze = bs = null), yr !== null)) {
    for (t = 0; t < yr.length; t++)
      if (((n = yr[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          s = n.pending;
        if (s !== null) {
          var i = s.next;
          ((s.next = o), (r.next = i));
        }
        n.pending = r;
      }
    yr = null;
  }
  return e;
}
function rg(e, t) {
  do {
    var n = ke;
    try {
      if ((xd(), (Gi.current = Ea), Ca)) {
        for (var r = Se.memoizedState; r !== null; ) {
          var o = r.queue;
          (o !== null && (o.pending = null), (r = r.next));
        }
        Ca = !1;
      }
      if (((jr = 0), (Me = Re = Se = null), (Cs = !1), (zs = 0), (_d.current = null), n === null || n.return === null)) {
        ((je = 1), (Vs = t), (ke = null));
        break;
      }
      e: {
        var s = e,
          i = n.return,
          a = n,
          l = t;
        if (((t = Ae), (a.flags |= 32768), l !== null && typeof l == 'object' && typeof l.then == 'function')) {
          var u = l,
            f = a,
            p = f.tag;
          if (!(f.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var m = f.alternate;
            m
              ? ((f.updateQueue = m.updateQueue), (f.memoizedState = m.memoizedState), (f.lanes = m.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var v = jp(i);
          if (v !== null) {
            ((v.flags &= -257), Mp(v, i, a, s, t), v.mode & 1 && Rp(s, u, t), (t = v), (l = u));
            var S = t.updateQueue;
            if (S === null) {
              var g = new Set();
              (g.add(l), (t.updateQueue = g));
            } else S.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              (Rp(s, u, t), Ld());
              break e;
            }
            l = Error(_(426));
          }
        } else if (xe && a.mode & 1) {
          var w = jp(i);
          if (w !== null) {
            (!(w.flags & 65536) && (w.flags |= 256), Mp(w, i, a, s, t), gd(Ao(l, a)));
            break e;
          }
        }
        ((s = l = Ao(l, a)), je !== 4 && (je = 2), bs === null ? (bs = [s]) : bs.push(s), (s = i));
        do {
          switch (s.tag) {
            case 3:
              ((s.flags |= 65536), (t &= -t), (s.lanes |= t));
              var x = zv(s, l, t);
              Ep(s, x);
              break e;
            case 1:
              a = l;
              var h = s.type,
                y = s.stateNode;
              if (
                !(s.flags & 128) &&
                (typeof h.getDerivedStateFromError == 'function' ||
                  (y !== null && typeof y.componentDidCatch == 'function' && (Xn === null || !Xn.has(y))))
              ) {
                ((s.flags |= 65536), (t &= -t), (s.lanes |= t));
                var C = Bv(s, a, t);
                Ep(s, C);
                break e;
              }
          }
          s = s.return;
        } while (s !== null);
      }
      ig(n);
    } catch (E) {
      ((t = E), ke === n && n !== null && (ke = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function og() {
  var e = ba.current;
  return ((ba.current = Ea), e === null ? Ea : e);
}
function Ld() {
  ((je === 0 || je === 3 || je === 2) && (je = 4), _e === null || (!(Mr & 268435455) && !(el & 268435455)) || Dn(_e, Ae));
}
function ka(e, t) {
  var n = re;
  re |= 2;
  var r = og();
  (_e !== e || Ae !== t) && ((ln = null), Pr(e, t));
  do
    try {
      TC();
      break;
    } catch (o) {
      rg(e, o);
    }
  while (!0);
  if ((xd(), (re = n), (ba.current = r), ke !== null)) throw Error(_(261));
  return ((_e = null), (Ae = 0), je);
}
function TC() {
  for (; ke !== null; ) sg(ke);
}
function RC() {
  for (; ke !== null && !eS(); ) sg(ke);
}
function sg(e) {
  var t = lg(e.alternate, e, rt);
  ((e.memoizedProps = e.pendingProps), t === null ? ig(e) : (ke = t), (_d.current = null));
}
function ig(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = CC(n, t)), n !== null)) {
        ((n.flags &= 32767), (ke = n));
        return;
      }
      if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((je = 6), (ke = null));
        return;
      }
    } else if (((n = SC(n, t, rt)), n !== null)) {
      ke = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ke = t;
      return;
    }
    ke = t = e;
  } while (t !== null);
  je === 0 && (je = 5);
}
function vr(e, t, n) {
  var r = ue,
    o = wt.transition;
  try {
    ((wt.transition = null), (ue = 1), jC(e, t, n, r));
  } finally {
    ((wt.transition = o), (ue = r));
  }
  return null;
}
function jC(e, t, n, r) {
  do vo();
  while (Vn !== null);
  if (re & 6) throw Error(_(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(_(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var s = n.lanes | n.childLanes;
  if (
    (cS(e, s),
    e === _e && ((ke = _e = null), (Ae = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      ji ||
      ((ji = !0),
      ug(la, function () {
        return (vo(), null);
      })),
    (s = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || s)
  ) {
    ((s = wt.transition), (wt.transition = null));
    var i = ue;
    ue = 1;
    var a = re;
    ((re |= 4),
      (_d.current = null),
      bC(e, n),
      eg(n, e),
      XS(Yu),
      (ca = !!Qu),
      (Yu = Qu = null),
      (e.current = n),
      NC(n),
      tS(),
      (re = a),
      (ue = i),
      (wt.transition = s));
  } else e.current = n;
  if ((ji && ((ji = !1), (Vn = e), (Pa = o)), (s = e.pendingLanes), s === 0 && (Xn = null), oS(n.stateNode), nt(e, Pe()), t !== null))
    for (r = e.onRecoverableError, n = 0; n < t.length; n++) ((o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest }));
  if (Na) throw ((Na = !1), (e = mc), (mc = null), e);
  return (Pa & 1 && e.tag !== 0 && vo(), (s = e.pendingLanes), s & 1 ? (e === vc ? Ns++ : ((Ns = 0), (vc = e))) : (Ns = 0), ar(), null);
}
function vo() {
  if (Vn !== null) {
    var e = zm(Pa),
      t = wt.transition,
      n = ue;
    try {
      if (((wt.transition = null), (ue = 16 > e ? 16 : e), Vn === null)) var r = !1;
      else {
        if (((e = Vn), (Vn = null), (Pa = 0), re & 6)) throw Error(_(331));
        var o = re;
        for (re |= 4, B = e.current; B !== null; ) {
          var s = B,
            i = s.child;
          if (B.flags & 16) {
            var a = s.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var u = a[l];
                for (B = u; B !== null; ) {
                  var f = B;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Es(8, f, s);
                  }
                  var p = f.child;
                  if (p !== null) ((p.return = f), (B = p));
                  else
                    for (; B !== null; ) {
                      f = B;
                      var m = f.sibling,
                        v = f.return;
                      if ((qv(f), f === u)) {
                        B = null;
                        break;
                      }
                      if (m !== null) {
                        ((m.return = v), (B = m));
                        break;
                      }
                      B = v;
                    }
                }
              }
              var S = s.alternate;
              if (S !== null) {
                var g = S.child;
                if (g !== null) {
                  S.child = null;
                  do {
                    var w = g.sibling;
                    ((g.sibling = null), (g = w));
                  } while (g !== null);
                }
              }
              B = s;
            }
          }
          if (s.subtreeFlags & 2064 && i !== null) ((i.return = s), (B = i));
          else
            e: for (; B !== null; ) {
              if (((s = B), s.flags & 2048))
                switch (s.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Es(9, s, s.return);
                }
              var x = s.sibling;
              if (x !== null) {
                ((x.return = s.return), (B = x));
                break e;
              }
              B = s.return;
            }
        }
        var h = e.current;
        for (B = h; B !== null; ) {
          i = B;
          var y = i.child;
          if (i.subtreeFlags & 2064 && y !== null) ((y.return = i), (B = y));
          else
            e: for (i = h; B !== null; ) {
              if (((a = B), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ja(9, a);
                  }
                } catch (E) {
                  be(a, a.return, E);
                }
              if (a === i) {
                B = null;
                break e;
              }
              var C = a.sibling;
              if (C !== null) {
                ((C.return = a.return), (B = C));
                break e;
              }
              B = a.return;
            }
        }
        if (((re = o), ar(), qt && typeof qt.onPostCommitFiberRoot == 'function'))
          try {
            qt.onPostCommitFiberRoot(Ha, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((ue = n), (wt.transition = t));
    }
  }
  return !1;
}
function Wp(e, t, n) {
  ((t = Ao(n, t)), (t = zv(e, t, 1)), (e = Yn(e, t, 1)), (t = Ke()), e !== null && (ti(e, 1, t), nt(e, t)));
}
function be(e, t, n) {
  if (e.tag === 3) Wp(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Wp(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' && (Xn === null || !Xn.has(r)))
        ) {
          ((e = Ao(n, e)), (e = Bv(t, e, 1)), (t = Yn(t, e, 1)), (e = Ke()), t !== null && (ti(t, 1, e), nt(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function MC(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = Ke()),
    (e.pingedLanes |= e.suspendedLanes & n),
    _e === e && (Ae & n) === n && (je === 4 || (je === 3 && (Ae & 130023424) === Ae && 500 > Pe() - Ad) ? Pr(e, 0) : (Id |= n)),
    nt(e, t));
}
function ag(e, t) {
  t === 0 && (e.mode & 1 ? ((t = wi), (wi <<= 1), !(wi & 130023424) && (wi = 4194304)) : (t = 1));
  var n = Ke();
  ((e = vn(e, t)), e !== null && (ti(e, t, n), nt(e, n)));
}
function _C(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), ag(e, n));
}
function IC(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(_(314));
  }
  (r !== null && r.delete(t), ag(e, n));
}
var lg;
lg = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || et.current) Je = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Je = !1), wC(e, t, n));
      Je = !!(e.flags & 131072);
    }
  else ((Je = !1), xe && t.flags & 1048576 && fv(t, ga, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Yi(e, t), (e = t.pendingProps));
      var o = jo(t, Ue.current);
      (mo(t, n), (o = kd(null, t, r, e, o, n)));
      var s = Td();
      return (
        (t.flags |= 1),
        typeof o == 'object' && o !== null && typeof o.render == 'function' && o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            tt(r) ? ((s = !0), ma(t)) : (s = !1),
            (t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null),
            Cd(t),
            (o.updater = Za),
            (t.stateNode = o),
            (o._reactInternals = t),
            oc(t, r, e, n),
            (t = ac(null, t, r, !0, s, n)))
          : ((t.tag = 0), xe && s && md(t), We(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Yi(e, t), (e = t.pendingProps), (o = r._init), (r = o(r._payload)), (t.type = r), (o = t.tag = OC(r)), (e = jt(r, e)), o)
        ) {
          case 0:
            t = ic(null, t, r, e, n);
            break e;
          case 1:
            t = Ap(null, t, r, e, n);
            break e;
          case 11:
            t = _p(null, t, r, e, n);
            break e;
          case 14:
            t = Ip(null, t, r, jt(r.type, e), n);
            break e;
        }
        throw Error(_(306, r, ''));
      }
      return t;
    case 0:
      return ((r = t.type), (o = t.pendingProps), (o = t.elementType === r ? o : jt(r, o)), ic(e, t, r, o, n));
    case 1:
      return ((r = t.type), (o = t.pendingProps), (o = t.elementType === r ? o : jt(r, o)), Ap(e, t, r, o, n));
    case 3:
      e: {
        if ((Hv(t), e === null)) throw Error(_(387));
        ((r = t.pendingProps), (s = t.memoizedState), (o = s.element), yv(e, t), wa(t, r, null, n));
        var i = t.memoizedState;
        if (((r = i.element), s.isDehydrated))
          if (
            ((s = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = s),
            (t.memoizedState = s),
            t.flags & 256)
          ) {
            ((o = Ao(Error(_(423)), t)), (t = Op(e, t, r, n, o)));
            break e;
          } else if (r !== o) {
            ((o = Ao(Error(_(424)), t)), (t = Op(e, t, r, n, o)));
            break e;
          } else
            for (st = Qn(t.stateNode.containerInfo.firstChild), it = t, xe = !0, Ot = null, n = vv(t, null, r, n), t.child = n; n; )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((Mo(), r === o)) {
            t = gn(e, t, n);
            break e;
          }
          We(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        xv(t),
        e === null && tc(t),
        (r = t.type),
        (o = t.pendingProps),
        (s = e !== null ? e.memoizedProps : null),
        (i = o.children),
        Xu(r, o) ? (i = null) : s !== null && Xu(r, s) && (t.flags |= 32),
        Wv(e, t),
        We(e, t, i, n),
        t.child
      );
    case 6:
      return (e === null && tc(t), null);
    case 13:
      return Kv(e, t, n);
    case 4:
      return (Ed(t, t.stateNode.containerInfo), (r = t.pendingProps), e === null ? (t.child = _o(t, null, r, n)) : We(e, t, r, n), t.child);
    case 11:
      return ((r = t.type), (o = t.pendingProps), (o = t.elementType === r ? o : jt(r, o)), _p(e, t, r, o, n));
    case 7:
      return (We(e, t, t.pendingProps, n), t.child);
    case 8:
      return (We(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (We(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (s = t.memoizedProps),
          (i = o.value),
          he(ya, r._currentValue),
          (r._currentValue = i),
          s !== null)
        )
          if (Ft(s.value, i)) {
            if (s.children === o.children && !et.current) {
              t = gn(e, t, n);
              break e;
            }
          } else
            for (s = t.child, s !== null && (s.return = t); s !== null; ) {
              var a = s.dependencies;
              if (a !== null) {
                i = s.child;
                for (var l = a.firstContext; l !== null; ) {
                  if (l.context === r) {
                    if (s.tag === 1) {
                      ((l = pn(-1, n & -n)), (l.tag = 2));
                      var u = s.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var f = u.pending;
                        (f === null ? (l.next = l) : ((l.next = f.next), (f.next = l)), (u.pending = l));
                      }
                    }
                    ((s.lanes |= n), (l = s.alternate), l !== null && (l.lanes |= n), nc(s.return, n, t), (a.lanes |= n));
                    break;
                  }
                  l = l.next;
                }
              } else if (s.tag === 10) i = s.type === t.type ? null : s.child;
              else if (s.tag === 18) {
                if (((i = s.return), i === null)) throw Error(_(341));
                ((i.lanes |= n), (a = i.alternate), a !== null && (a.lanes |= n), nc(i, n, t), (i = s.sibling));
              } else i = s.child;
              if (i !== null) i.return = s;
              else
                for (i = s; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((s = i.sibling), s !== null)) {
                    ((s.return = i.return), (i = s));
                    break;
                  }
                  i = i.return;
                }
              s = i;
            }
        (We(e, t, o.children, n), (t = t.child));
      }
      return t;
    case 9:
      return ((o = t.type), (r = t.pendingProps.children), mo(t, n), (o = Ct(o)), (r = r(o)), (t.flags |= 1), We(e, t, r, n), t.child);
    case 14:
      return ((r = t.type), (o = jt(r, t.pendingProps)), (o = jt(r.type, o)), Ip(e, t, r, o, n));
    case 15:
      return Uv(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : jt(r, o)),
        Yi(e, t),
        (t.tag = 1),
        tt(r) ? ((e = !0), ma(t)) : (e = !1),
        mo(t, n),
        $v(t, r, o),
        oc(t, r, o, n),
        ac(null, t, r, !0, e, n)
      );
    case 19:
      return Gv(e, t, n);
    case 22:
      return Vv(e, t, n);
  }
  throw Error(_(156, t.tag));
};
function ug(e, t) {
  return Dm(e, t);
}
function AC(e, t, n, r) {
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
function yt(e, t, n, r) {
  return new AC(e, t, n, r);
}
function Fd(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function OC(e) {
  if (typeof e == 'function') return Fd(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === rd)) return 11;
    if (e === od) return 14;
  }
  return 2;
}
function Zn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = yt(e.tag, t, e.key, e.mode)),
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
function Zi(e, t, n, r, o, s) {
  var i = 2;
  if (((r = e), typeof e == 'function')) Fd(e) && (i = 1);
  else if (typeof e == 'string') i = 5;
  else
    e: switch (e) {
      case Jr:
        return kr(n.children, o, s, t);
      case nd:
        ((i = 8), (o |= 8));
        break;
      case Tu:
        return ((e = yt(12, n, t, o | 2)), (e.elementType = Tu), (e.lanes = s), e);
      case Ru:
        return ((e = yt(13, n, t, o)), (e.elementType = Ru), (e.lanes = s), e);
      case ju:
        return ((e = yt(19, n, t, o)), (e.elementType = ju), (e.lanes = s), e);
      case xm:
        return tl(n, o, s, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case gm:
              i = 10;
              break e;
            case ym:
              i = 9;
              break e;
            case rd:
              i = 11;
              break e;
            case od:
              i = 14;
              break e;
            case In:
              ((i = 16), (r = null));
              break e;
          }
        throw Error(_(130, e == null ? e : typeof e, ''));
    }
  return ((t = yt(i, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = s), t);
}
function kr(e, t, n, r) {
  return ((e = yt(7, e, r, t)), (e.lanes = n), e);
}
function tl(e, t, n, r) {
  return ((e = yt(22, e, r, t)), (e.elementType = xm), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e);
}
function lu(e, t, n) {
  return ((e = yt(6, e, null, t)), (e.lanes = n), e);
}
function uu(e, t, n) {
  return (
    (t = yt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }),
    t
  );
}
function DC(e, t, n, r, o) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Vl(0)),
    (this.expirationTimes = Vl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Vl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null));
}
function $d(e, t, n, r, o, s, i, a, l) {
  return (
    (e = new DC(e, t, n, a, l)),
    t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
    (s = yt(3, null, null, t)),
    (e.current = s),
    (s.stateNode = e),
    (s.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }),
    Cd(s),
    e
  );
}
function LC(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Zr, key: r == null ? null : '' + r, children: e, containerInfo: t, implementation: n };
}
function cg(e) {
  if (!e) return tr;
  e = e._reactInternals;
  e: {
    if ($r(e) !== e || e.tag !== 1) throw Error(_(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (tt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(_(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (tt(n)) return cv(e, n, t);
  }
  return t;
}
function dg(e, t, n, r, o, s, i, a, l) {
  return (
    (e = $d(n, r, !0, e, o, s, i, a, l)),
    (e.context = cg(null)),
    (n = e.current),
    (r = Ke()),
    (o = qn(n)),
    (s = pn(r, o)),
    (s.callback = t ?? null),
    Yn(n, s, o),
    (e.current.lanes = o),
    ti(e, o, r),
    nt(e, r),
    e
  );
}
function nl(e, t, n, r) {
  var o = t.current,
    s = Ke(),
    i = qn(o);
  return (
    (n = cg(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = pn(s, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Yn(o, t, i)),
    e !== null && (Lt(e, o, i, s), Ki(e, o, i)),
    i
  );
}
function Ta(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Hp(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function zd(e, t) {
  (Hp(e, t), (e = e.alternate) && Hp(e, t));
}
function FC() {
  return null;
}
var fg =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function Bd(e) {
  this._internalRoot = e;
}
rl.prototype.render = Bd.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(_(409));
  nl(e, t, null, null);
};
rl.prototype.unmount = Bd.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (_r(function () {
      nl(null, e, null, null);
    }),
      (t[mn] = null));
  }
};
function rl(e) {
  this._internalRoot = e;
}
rl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Vm();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < On.length && t !== 0 && t < On[n].priority; n++);
    (On.splice(n, 0, e), n === 0 && Hm(e));
  }
};
function Ud(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ol(e) {
  return !(
    !e ||
    (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function Kp() {}
function $C(e, t, n, r, o) {
  if (o) {
    if (typeof r == 'function') {
      var s = r;
      r = function () {
        var u = Ta(i);
        s.call(u);
      };
    }
    var i = dg(t, r, e, 0, null, !1, !1, '', Kp);
    return ((e._reactRootContainer = i), (e[mn] = i.current), Os(e.nodeType === 8 ? e.parentNode : e), _r(), i);
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == 'function') {
    var a = r;
    r = function () {
      var u = Ta(l);
      a.call(u);
    };
  }
  var l = $d(e, 0, !1, null, null, !1, !1, '', Kp);
  return (
    (e._reactRootContainer = l),
    (e[mn] = l.current),
    Os(e.nodeType === 8 ? e.parentNode : e),
    _r(function () {
      nl(t, l, n, r);
    }),
    l
  );
}
function sl(e, t, n, r, o) {
  var s = n._reactRootContainer;
  if (s) {
    var i = s;
    if (typeof o == 'function') {
      var a = o;
      o = function () {
        var l = Ta(i);
        a.call(l);
      };
    }
    nl(t, i, e, o);
  } else i = $C(n, t, e, o, r);
  return Ta(i);
}
Bm = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ds(t.pendingLanes);
        n !== 0 && (ad(t, n | 1), nt(t, Pe()), !(re & 6) && ((Oo = Pe() + 500), ar()));
      }
      break;
    case 13:
      (_r(function () {
        var r = vn(e, 1);
        if (r !== null) {
          var o = Ke();
          Lt(r, e, 1, o);
        }
      }),
        zd(e, 1));
  }
};
ld = function (e) {
  if (e.tag === 13) {
    var t = vn(e, 134217728);
    if (t !== null) {
      var n = Ke();
      Lt(t, e, 134217728, n);
    }
    zd(e, 134217728);
  }
};
Um = function (e) {
  if (e.tag === 13) {
    var t = qn(e),
      n = vn(e, t);
    if (n !== null) {
      var r = Ke();
      Lt(n, e, t, r);
    }
    zd(e, t);
  }
};
Vm = function () {
  return ue;
};
Wm = function (e, t) {
  var n = ue;
  try {
    return ((ue = e), t());
  } finally {
    ue = n;
  }
};
zu = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((Iu(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = Ya(r);
            if (!o) throw Error(_(90));
            (Sm(r), Iu(r, o));
          }
        }
      }
      break;
    case 'textarea':
      Em(e, n);
      break;
    case 'select':
      ((t = n.value), t != null && co(e, !!n.multiple, t, !1));
  }
};
jm = Od;
Mm = _r;
var zC = { usingClientEntryPoint: !1, Events: [ri, ro, Ya, Tm, Rm, Od] },
  is = { findFiberByHostInstance: gr, bundleType: 0, version: '18.3.1', rendererPackageName: 'react-dom' },
  BC = {
    bundleType: is.bundleType,
    version: is.version,
    rendererPackageName: is.rendererPackageName,
    rendererConfig: is.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Cn.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = Am(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: is.findFiberByHostInstance || FC,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var Mi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Mi.isDisabled && Mi.supportsFiber)
    try {
      ((Ha = Mi.inject(BC)), (qt = Mi));
    } catch {}
}
ut.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = zC;
ut.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ud(t)) throw Error(_(200));
  return LC(e, t, null, n);
};
ut.createRoot = function (e, t) {
  if (!Ud(e)) throw Error(_(299));
  var n = !1,
    r = '',
    o = fg;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = $d(e, 1, !1, null, null, n, !1, r, o)),
    (e[mn] = t.current),
    Os(e.nodeType === 8 ? e.parentNode : e),
    new Bd(t)
  );
};
ut.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0) throw typeof e.render == 'function' ? Error(_(188)) : ((e = Object.keys(e).join(',')), Error(_(268, e)));
  return ((e = Am(t)), (e = e === null ? null : e.stateNode), e);
};
ut.flushSync = function (e) {
  return _r(e);
};
ut.hydrate = function (e, t, n) {
  if (!ol(t)) throw Error(_(200));
  return sl(null, e, t, !0, n);
};
ut.hydrateRoot = function (e, t, n) {
  if (!Ud(e)) throw Error(_(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    s = '',
    i = fg;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = dg(t, null, e, 1, n ?? null, o, !1, s, i)),
    (e[mn] = t.current),
    Os(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o));
  return new rl(t);
};
ut.render = function (e, t, n) {
  if (!ol(t)) throw Error(_(200));
  return sl(null, e, t, !1, n);
};
ut.unmountComponentAtNode = function (e) {
  if (!ol(e)) throw Error(_(40));
  return e._reactRootContainer
    ? (_r(function () {
        sl(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[mn] = null));
        });
      }),
      !0)
    : !1;
};
ut.unstable_batchedUpdates = Od;
ut.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ol(n)) throw Error(_(200));
  if (e == null || e._reactInternals === void 0) throw Error(_(38));
  return sl(e, t, n, !1, r);
};
ut.version = '18.3.1-next-f1338f8080-20240426';
function pg() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(pg);
    } catch (e) {
      console.error(e);
    }
}
(pg(), (pm.exports = ut));
var zr = pm.exports;
const hg = tm(zr);
var mg,
  Gp = zr;
((mg = Gp.createRoot), Gp.hydrateRoot);
const UC = 1,
  VC = 1e6;
let cu = 0;
function WC() {
  return ((cu = (cu + 1) % Number.MAX_SAFE_INTEGER), cu.toString());
}
const du = new Map(),
  Qp = e => {
    if (du.has(e)) return;
    const t = setTimeout(() => {
      (du.delete(e), Ps({ type: 'REMOVE_TOAST', toastId: e }));
    }, VC);
    du.set(e, t);
  },
  HC = (e, t) => {
    switch (t.type) {
      case 'ADD_TOAST':
        return { ...e, toasts: [t.toast, ...e.toasts].slice(0, UC) };
      case 'UPDATE_TOAST':
        return { ...e, toasts: e.toasts.map(n => (n.id === t.toast.id ? { ...n, ...t.toast } : n)) };
      case 'DISMISS_TOAST': {
        const { toastId: n } = t;
        return (
          n
            ? Qp(n)
            : e.toasts.forEach(r => {
                Qp(r.id);
              }),
          { ...e, toasts: e.toasts.map(r => (r.id === n || n === void 0 ? { ...r, open: !1 } : r)) }
        );
      }
      case 'REMOVE_TOAST':
        return t.toastId === void 0 ? { ...e, toasts: [] } : { ...e, toasts: e.toasts.filter(n => n.id !== t.toastId) };
    }
  },
  Ji = [];
let ea = { toasts: [] };
function Ps(e) {
  ((ea = HC(ea, e)),
    Ji.forEach(t => {
      t(ea);
    }));
}
function KC({ ...e }) {
  const t = WC(),
    n = o => Ps({ type: 'UPDATE_TOAST', toast: { ...o, id: t } }),
    r = () => Ps({ type: 'DISMISS_TOAST', toastId: t });
  return (
    Ps({
      type: 'ADD_TOAST',
      toast: {
        ...e,
        id: t,
        open: !0,
        onOpenChange: o => {
          o || r();
        },
      },
    }),
    { id: t, dismiss: r, update: n }
  );
}
function GC() {
  const [e, t] = d.useState(ea);
  return (
    d.useEffect(
      () => (
        Ji.push(t),
        () => {
          const n = Ji.indexOf(t);
          n > -1 && Ji.splice(n, 1);
        }
      ),
      [e]
    ),
    { ...e, toast: KC, dismiss: n => Ps({ type: 'DISMISS_TOAST', toastId: n }) }
  );
}
function F(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e == null || e(o), n === !1 || !o.defaultPrevented)) return t == null ? void 0 : t(o);
  };
}
function Yp(e, t) {
  if (typeof e == 'function') return e(t);
  e != null && (e.current = t);
}
function il(...e) {
  return t => {
    let n = !1;
    const r = e.map(o => {
      const s = Yp(o, t);
      return (!n && typeof s == 'function' && (n = !0), s);
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == 'function' ? s() : Yp(e[o], null);
        }
      };
  };
}
function oe(...e) {
  return d.useCallback(il(...e), e);
}
function QC(e, t) {
  const n = d.createContext(t),
    r = s => {
      const { children: i, ...a } = s,
        l = d.useMemo(() => a, Object.values(a));
      return c.jsx(n.Provider, { value: l, children: i });
    };
  r.displayName = e + 'Provider';
  function o(s) {
    const i = d.useContext(n);
    if (i) return i;
    if (t !== void 0) return t;
    throw new Error(`\`${s}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function dt(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = d.createContext(i),
      l = n.length;
    n = [...n, i];
    const u = p => {
      var x;
      const { scope: m, children: v, ...S } = p,
        g = ((x = m == null ? void 0 : m[e]) == null ? void 0 : x[l]) || a,
        w = d.useMemo(() => S, Object.values(S));
      return c.jsx(g.Provider, { value: w, children: v });
    };
    u.displayName = s + 'Provider';
    function f(p, m) {
      var g;
      const v = ((g = m == null ? void 0 : m[e]) == null ? void 0 : g[l]) || a,
        S = d.useContext(v);
      if (S) return S;
      if (i !== void 0) return i;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const o = () => {
    const s = n.map(i => d.createContext(i));
    return function (a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return d.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    };
  };
  return ((o.scopeName = e), [r, YC(o, ...t)]);
}
function YC(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map(o => ({ useScope: o(), scopeName: o.scopeName }));
    return function (s) {
      const i = r.reduce((a, { useScope: l, scopeName: u }) => {
        const p = l(s)[`__scope${u}`];
        return { ...a, ...p };
      }, {});
      return d.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
function Ir(e) {
  const t = qC(e),
    n = d.forwardRef((r, o) => {
      const { children: s, ...i } = r,
        a = d.Children.toArray(s),
        l = a.find(JC);
      if (l) {
        const u = l.props.children,
          f = a.map(p => (p === l ? (d.Children.count(u) > 1 ? d.Children.only(null) : d.isValidElement(u) ? u.props.children : null) : p));
        return c.jsx(t, { ...i, ref: o, children: d.isValidElement(u) ? d.cloneElement(u, void 0, f) : null });
      }
      return c.jsx(t, { ...i, ref: o, children: s });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var XC = Ir('Slot');
function qC(e) {
  const t = d.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (d.isValidElement(o)) {
      const i = tE(o),
        a = eE(s, o.props);
      return (o.type !== d.Fragment && (a.ref = r ? il(r, i) : i), d.cloneElement(o, a));
    }
    return d.Children.count(o) > 1 ? d.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var vg = Symbol('radix.slottable');
function ZC(e) {
  const t = ({ children: n }) => c.jsx(c.Fragment, { children: n });
  return ((t.displayName = `${e}.Slottable`), (t.__radixId = vg), t);
}
function JC(e) {
  return d.isValidElement(e) && typeof e.type == 'function' && '__radixId' in e.type && e.type.__radixId === vg;
}
function eE(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      s = t[r];
    /^on[A-Z]/.test(r)
      ? o && s
        ? (n[r] = (...a) => {
            const l = s(...a);
            return (o(...a), l);
          })
        : o && (n[r] = o)
      : r === 'style'
        ? (n[r] = { ...o, ...s })
        : r === 'className' && (n[r] = [o, s].filter(Boolean).join(' '));
  }
  return { ...e, ...n };
}
function tE(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null ? void 0 : r.get,
    n = t && 'isReactWarning' in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = (o = Object.getOwnPropertyDescriptor(e, 'ref')) == null ? void 0 : o.get),
      (n = t && 'isReactWarning' in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function al(e) {
  const t = e + 'CollectionProvider',
    [n, r] = dt(t),
    [o, s] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    i = g => {
      const { scope: w, children: x } = g,
        h = D.useRef(null),
        y = D.useRef(new Map()).current;
      return c.jsx(o, { scope: w, itemMap: y, collectionRef: h, children: x });
    };
  i.displayName = t;
  const a = e + 'CollectionSlot',
    l = Ir(a),
    u = D.forwardRef((g, w) => {
      const { scope: x, children: h } = g,
        y = s(a, x),
        C = oe(w, y.collectionRef);
      return c.jsx(l, { ref: C, children: h });
    });
  u.displayName = a;
  const f = e + 'CollectionItemSlot',
    p = 'data-radix-collection-item',
    m = Ir(f),
    v = D.forwardRef((g, w) => {
      const { scope: x, children: h, ...y } = g,
        C = D.useRef(null),
        E = oe(w, C),
        N = s(f, x);
      return (
        D.useEffect(() => (N.itemMap.set(C, { ref: C, ...y }), () => void N.itemMap.delete(C))),
        c.jsx(m, { [p]: '', ref: E, children: h })
      );
    });
  v.displayName = f;
  function S(g) {
    const w = s(e + 'CollectionConsumer', g);
    return D.useCallback(() => {
      const h = w.collectionRef.current;
      if (!h) return [];
      const y = Array.from(h.querySelectorAll(`[${p}]`));
      return Array.from(w.itemMap.values()).sort((N, b) => y.indexOf(N.ref.current) - y.indexOf(b.ref.current));
    }, [w.collectionRef, w.itemMap]);
  }
  return [{ Provider: i, Slot: u, ItemSlot: v }, S, r];
}
var nE = ['a', 'button', 'div', 'form', 'h2', 'h3', 'img', 'input', 'label', 'li', 'nav', 'ol', 'p', 'select', 'span', 'svg', 'ul'],
  K = nE.reduce((e, t) => {
    const n = Ir(`Primitive.${t}`),
      r = d.forwardRef((o, s) => {
        const { asChild: i, ...a } = o,
          l = i ? n : t;
        return (typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0), c.jsx(l, { ...a, ref: s }));
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {});
function Vd(e, t) {
  e && zr.flushSync(() => e.dispatchEvent(t));
}
function Ge(e) {
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
function rE(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ge(e);
  d.useEffect(() => {
    const r = o => {
      o.key === 'Escape' && n(o);
    };
    return (t.addEventListener('keydown', r, { capture: !0 }), () => t.removeEventListener('keydown', r, { capture: !0 }));
  }, [n, t]);
}
var oE = 'DismissableLayer',
  xc = 'dismissableLayer.update',
  sE = 'dismissableLayer.pointerDownOutside',
  iE = 'dismissableLayer.focusOutside',
  Xp,
  gg = d.createContext({ layers: new Set(), layersWithOutsidePointerEventsDisabled: new Set(), branches: new Set() }),
  Vo = d.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: o,
        onFocusOutside: s,
        onInteractOutside: i,
        onDismiss: a,
        ...l
      } = e,
      u = d.useContext(gg),
      [f, p] = d.useState(null),
      m = (f == null ? void 0 : f.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document),
      [, v] = d.useState({}),
      S = oe(t, b => p(b)),
      g = Array.from(u.layers),
      [w] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
      x = g.indexOf(w),
      h = f ? g.indexOf(f) : -1,
      y = u.layersWithOutsidePointerEventsDisabled.size > 0,
      C = h >= x,
      E = lE(b => {
        const k = b.target,
          M = [...u.branches].some(j => j.contains(k));
        !C || M || (o == null || o(b), i == null || i(b), b.defaultPrevented || a == null || a());
      }, m),
      N = uE(b => {
        const k = b.target;
        [...u.branches].some(j => j.contains(k)) || (s == null || s(b), i == null || i(b), b.defaultPrevented || a == null || a());
      }, m);
    return (
      rE(b => {
        h === u.layers.size - 1 && (r == null || r(b), !b.defaultPrevented && a && (b.preventDefault(), a()));
      }, m),
      d.useEffect(() => {
        if (f)
          return (
            n &&
              (u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Xp = m.body.style.pointerEvents), (m.body.style.pointerEvents = 'none')),
              u.layersWithOutsidePointerEventsDisabled.add(f)),
            u.layers.add(f),
            qp(),
            () => {
              n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = Xp);
            }
          );
      }, [f, m, n, u]),
      d.useEffect(
        () => () => {
          f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), qp());
        },
        [f, u]
      ),
      d.useEffect(() => {
        const b = () => v({});
        return (document.addEventListener(xc, b), () => document.removeEventListener(xc, b));
      }, []),
      c.jsx(K.div, {
        ...l,
        ref: S,
        style: { pointerEvents: y ? (C ? 'auto' : 'none') : void 0, ...e.style },
        onFocusCapture: F(e.onFocusCapture, N.onFocusCapture),
        onBlurCapture: F(e.onBlurCapture, N.onBlurCapture),
        onPointerDownCapture: F(e.onPointerDownCapture, E.onPointerDownCapture),
      })
    );
  });
Vo.displayName = oE;
var aE = 'DismissableLayerBranch',
  yg = d.forwardRef((e, t) => {
    const n = d.useContext(gg),
      r = d.useRef(null),
      o = oe(t, r);
    return (
      d.useEffect(() => {
        const s = r.current;
        if (s)
          return (
            n.branches.add(s),
            () => {
              n.branches.delete(s);
            }
          );
      }, [n.branches]),
      c.jsx(K.div, { ...e, ref: o })
    );
  });
yg.displayName = aE;
function lE(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ge(e),
    r = d.useRef(!1),
    o = d.useRef(() => {});
  return (
    d.useEffect(() => {
      const s = a => {
          if (a.target && !r.current) {
            let l = function () {
              xg(sE, n, u, { discrete: !0 });
            };
            const u = { originalEvent: a };
            a.pointerType === 'touch'
              ? (t.removeEventListener('click', o.current), (o.current = l), t.addEventListener('click', o.current, { once: !0 }))
              : l();
          } else t.removeEventListener('click', o.current);
          r.current = !1;
        },
        i = window.setTimeout(() => {
          t.addEventListener('pointerdown', s);
        }, 0);
      return () => {
        (window.clearTimeout(i), t.removeEventListener('pointerdown', s), t.removeEventListener('click', o.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function uE(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ge(e),
    r = d.useRef(!1);
  return (
    d.useEffect(() => {
      const o = s => {
        s.target && !r.current && xg(iE, n, { originalEvent: s }, { discrete: !1 });
      };
      return (t.addEventListener('focusin', o), () => t.removeEventListener('focusin', o));
    }, [t, n]),
    { onFocusCapture: () => (r.current = !0), onBlurCapture: () => (r.current = !1) }
  );
}
function qp() {
  const e = new CustomEvent(xc);
  document.dispatchEvent(e);
}
function xg(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target,
    s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && o.addEventListener(e, t, { once: !0 }), r ? Vd(o, s) : o.dispatchEvent(s));
}
var cE = Vo,
  dE = yg,
  Te = globalThis != null && globalThis.document ? d.useLayoutEffect : () => {},
  fE = 'Portal',
  si = d.forwardRef((e, t) => {
    var a;
    const { container: n, ...r } = e,
      [o, s] = d.useState(!1);
    Te(() => s(!0), []);
    const i = n || (o && ((a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : a.body));
    return i ? hg.createPortal(c.jsx(K.div, { ...r, ref: t }), i) : null;
  });
si.displayName = fE;
function pE(e, t) {
  return d.useReducer((n, r) => t[n][r] ?? n, e);
}
var Bt = e => {
  const { present: t, children: n } = e,
    r = hE(t),
    o = typeof n == 'function' ? n({ present: r.isPresent }) : d.Children.only(n),
    s = oe(r.ref, mE(o));
  return typeof n == 'function' || r.isPresent ? d.cloneElement(o, { ref: s }) : null;
};
Bt.displayName = 'Presence';
function hE(e) {
  const [t, n] = d.useState(),
    r = d.useRef(null),
    o = d.useRef(e),
    s = d.useRef('none'),
    i = e ? 'mounted' : 'unmounted',
    [a, l] = pE(i, {
      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
      unmounted: { MOUNT: 'mounted' },
    });
  return (
    d.useEffect(() => {
      const u = _i(r.current);
      s.current = a === 'mounted' ? u : 'none';
    }, [a]),
    Te(() => {
      const u = r.current,
        f = o.current;
      if (f !== e) {
        const m = s.current,
          v = _i(u);
        (e
          ? l('MOUNT')
          : v === 'none' || (u == null ? void 0 : u.display) === 'none'
            ? l('UNMOUNT')
            : l(f && m !== v ? 'ANIMATION_OUT' : 'UNMOUNT'),
          (o.current = e));
      }
    }, [e, l]),
    Te(() => {
      if (t) {
        let u;
        const f = t.ownerDocument.defaultView ?? window,
          p = v => {
            const g = _i(r.current).includes(v.animationName);
            if (v.target === t && g && (l('ANIMATION_END'), !o.current)) {
              const w = t.style.animationFillMode;
              ((t.style.animationFillMode = 'forwards'),
                (u = f.setTimeout(() => {
                  t.style.animationFillMode === 'forwards' && (t.style.animationFillMode = w);
                })));
            }
          },
          m = v => {
            v.target === t && (s.current = _i(r.current));
          };
        return (
          t.addEventListener('animationstart', m),
          t.addEventListener('animationcancel', p),
          t.addEventListener('animationend', p),
          () => {
            (f.clearTimeout(u),
              t.removeEventListener('animationstart', m),
              t.removeEventListener('animationcancel', p),
              t.removeEventListener('animationend', p));
          }
        );
      } else l('ANIMATION_END');
    }, [t, l]),
    {
      isPresent: ['mounted', 'unmountSuspended'].includes(a),
      ref: d.useCallback(u => {
        ((r.current = u ? getComputedStyle(u) : null), n(u));
      }, []),
    }
  );
}
function _i(e) {
  return (e == null ? void 0 : e.animationName) || 'none';
}
function mE(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null ? void 0 : r.get,
    n = t && 'isReactWarning' in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = (o = Object.getOwnPropertyDescriptor(e, 'ref')) == null ? void 0 : o.get),
      (n = t && 'isReactWarning' in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var vE = Zc[' useInsertionEffect '.trim().toString()] || Te;
function nr({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  const [o, s, i] = gE({ defaultProp: t, onChange: n }),
    a = e !== void 0,
    l = a ? e : o;
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
        const m = yE(f) ? f(e) : f;
        m !== e && ((p = i.current) == null || p.call(i, m));
      } else s(f);
    },
    [a, e, s, i]
  );
  return [l, u];
}
function gE({ defaultProp: e, onChange: t }) {
  const [n, r] = d.useState(e),
    o = d.useRef(n),
    s = d.useRef(t);
  return (
    vE(() => {
      s.current = t;
    }, [t]),
    d.useEffect(() => {
      var i;
      o.current !== n && ((i = s.current) == null || i.call(s, n), (o.current = n));
    }, [n, o]),
    [n, r, s]
  );
}
function yE(e) {
  return typeof e == 'function';
}
var wg = Object.freeze({
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
  xE = 'VisuallyHidden',
  ll = d.forwardRef((e, t) => c.jsx(K.span, { ...e, ref: t, style: { ...wg, ...e.style } }));
ll.displayName = xE;
var wE = ll,
  Wd = 'ToastProvider',
  [Hd, SE, CE] = al('Toast'),
  [Sg, zM] = dt('Toast', [CE]),
  [EE, ul] = Sg(Wd),
  Cg = e => {
    const {
        __scopeToast: t,
        label: n = 'Notification',
        duration: r = 5e3,
        swipeDirection: o = 'right',
        swipeThreshold: s = 50,
        children: i,
      } = e,
      [a, l] = d.useState(null),
      [u, f] = d.useState(0),
      p = d.useRef(!1),
      m = d.useRef(!1);
    return (
      n.trim() || console.error(`Invalid prop \`label\` supplied to \`${Wd}\`. Expected non-empty \`string\`.`),
      c.jsx(Hd.Provider, {
        scope: t,
        children: c.jsx(EE, {
          scope: t,
          label: n,
          duration: r,
          swipeDirection: o,
          swipeThreshold: s,
          toastCount: u,
          viewport: a,
          onViewportChange: l,
          onToastAdd: d.useCallback(() => f(v => v + 1), []),
          onToastRemove: d.useCallback(() => f(v => v - 1), []),
          isFocusedToastEscapeKeyDownRef: p,
          isClosePausedRef: m,
          children: i,
        }),
      })
    );
  };
Cg.displayName = Wd;
var Eg = 'ToastViewport',
  bE = ['F8'],
  wc = 'toast.viewportPause',
  Sc = 'toast.viewportResume',
  bg = d.forwardRef((e, t) => {
    const { __scopeToast: n, hotkey: r = bE, label: o = 'Notifications ({hotkey})', ...s } = e,
      i = ul(Eg, n),
      a = SE(n),
      l = d.useRef(null),
      u = d.useRef(null),
      f = d.useRef(null),
      p = d.useRef(null),
      m = oe(t, p, i.onViewportChange),
      v = r.join('+').replace(/Key/g, '').replace(/Digit/g, ''),
      S = i.toastCount > 0;
    (d.useEffect(() => {
      const w = x => {
        var y;
        r.length !== 0 && r.every(C => x[C] || x.code === C) && ((y = p.current) == null || y.focus());
      };
      return (document.addEventListener('keydown', w), () => document.removeEventListener('keydown', w));
    }, [r]),
      d.useEffect(() => {
        const w = l.current,
          x = p.current;
        if (S && w && x) {
          const h = () => {
              if (!i.isClosePausedRef.current) {
                const N = new CustomEvent(wc);
                (x.dispatchEvent(N), (i.isClosePausedRef.current = !0));
              }
            },
            y = () => {
              if (i.isClosePausedRef.current) {
                const N = new CustomEvent(Sc);
                (x.dispatchEvent(N), (i.isClosePausedRef.current = !1));
              }
            },
            C = N => {
              !w.contains(N.relatedTarget) && y();
            },
            E = () => {
              w.contains(document.activeElement) || y();
            };
          return (
            w.addEventListener('focusin', h),
            w.addEventListener('focusout', C),
            w.addEventListener('pointermove', h),
            w.addEventListener('pointerleave', E),
            window.addEventListener('blur', h),
            window.addEventListener('focus', y),
            () => {
              (w.removeEventListener('focusin', h),
                w.removeEventListener('focusout', C),
                w.removeEventListener('pointermove', h),
                w.removeEventListener('pointerleave', E),
                window.removeEventListener('blur', h),
                window.removeEventListener('focus', y));
            }
          );
        }
      }, [S, i.isClosePausedRef]));
    const g = d.useCallback(
      ({ tabbingDirection: w }) => {
        const h = a().map(y => {
          const C = y.ref.current,
            E = [C, ...LE(C)];
          return w === 'forwards' ? E : E.reverse();
        });
        return (w === 'forwards' ? h.reverse() : h).flat();
      },
      [a]
    );
    return (
      d.useEffect(() => {
        const w = p.current;
        if (w) {
          const x = h => {
            var E, N, b;
            const y = h.altKey || h.ctrlKey || h.metaKey;
            if (h.key === 'Tab' && !y) {
              const k = document.activeElement,
                M = h.shiftKey;
              if (h.target === w && M) {
                (E = u.current) == null || E.focus();
                return;
              }
              const A = g({ tabbingDirection: M ? 'backwards' : 'forwards' }),
                W = A.findIndex(I => I === k);
              fu(A.slice(W + 1)) ? h.preventDefault() : M ? (N = u.current) == null || N.focus() : (b = f.current) == null || b.focus();
            }
          };
          return (w.addEventListener('keydown', x), () => w.removeEventListener('keydown', x));
        }
      }, [a, g]),
      c.jsxs(dE, {
        ref: l,
        role: 'region',
        'aria-label': o.replace('{hotkey}', v),
        tabIndex: -1,
        style: { pointerEvents: S ? void 0 : 'none' },
        children: [
          S &&
            c.jsx(Cc, {
              ref: u,
              onFocusFromOutsideViewport: () => {
                const w = g({ tabbingDirection: 'forwards' });
                fu(w);
              },
            }),
          c.jsx(Hd.Slot, { scope: n, children: c.jsx(K.ol, { tabIndex: -1, ...s, ref: m }) }),
          S &&
            c.jsx(Cc, {
              ref: f,
              onFocusFromOutsideViewport: () => {
                const w = g({ tabbingDirection: 'backwards' });
                fu(w);
              },
            }),
        ],
      })
    );
  });
bg.displayName = Eg;
var Ng = 'ToastFocusProxy',
  Cc = d.forwardRef((e, t) => {
    const { __scopeToast: n, onFocusFromOutsideViewport: r, ...o } = e,
      s = ul(Ng, n);
    return c.jsx(ll, {
      'aria-hidden': !0,
      tabIndex: 0,
      ...o,
      ref: t,
      style: { position: 'fixed' },
      onFocus: i => {
        var u;
        const a = i.relatedTarget;
        !((u = s.viewport) != null && u.contains(a)) && r();
      },
    });
  });
Cc.displayName = Ng;
var ii = 'Toast',
  NE = 'toast.swipeStart',
  PE = 'toast.swipeMove',
  kE = 'toast.swipeCancel',
  TE = 'toast.swipeEnd',
  Pg = d.forwardRef((e, t) => {
    const { forceMount: n, open: r, defaultOpen: o, onOpenChange: s, ...i } = e,
      [a, l] = nr({ prop: r, defaultProp: o ?? !0, onChange: s, caller: ii });
    return c.jsx(Bt, {
      present: n || a,
      children: c.jsx(ME, {
        open: a,
        ...i,
        ref: t,
        onClose: () => l(!1),
        onPause: Ge(e.onPause),
        onResume: Ge(e.onResume),
        onSwipeStart: F(e.onSwipeStart, u => {
          u.currentTarget.setAttribute('data-swipe', 'start');
        }),
        onSwipeMove: F(e.onSwipeMove, u => {
          const { x: f, y: p } = u.detail.delta;
          (u.currentTarget.setAttribute('data-swipe', 'move'),
            u.currentTarget.style.setProperty('--radix-toast-swipe-move-x', `${f}px`),
            u.currentTarget.style.setProperty('--radix-toast-swipe-move-y', `${p}px`));
        }),
        onSwipeCancel: F(e.onSwipeCancel, u => {
          (u.currentTarget.setAttribute('data-swipe', 'cancel'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-x'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-y'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-end-x'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-end-y'));
        }),
        onSwipeEnd: F(e.onSwipeEnd, u => {
          const { x: f, y: p } = u.detail.delta;
          (u.currentTarget.setAttribute('data-swipe', 'end'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-x'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-y'),
            u.currentTarget.style.setProperty('--radix-toast-swipe-end-x', `${f}px`),
            u.currentTarget.style.setProperty('--radix-toast-swipe-end-y', `${p}px`),
            l(!1));
        }),
      }),
    });
  });
Pg.displayName = ii;
var [RE, jE] = Sg(ii, { onClose() {} }),
  ME = d.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        type: r = 'foreground',
        duration: o,
        open: s,
        onClose: i,
        onEscapeKeyDown: a,
        onPause: l,
        onResume: u,
        onSwipeStart: f,
        onSwipeMove: p,
        onSwipeCancel: m,
        onSwipeEnd: v,
        ...S
      } = e,
      g = ul(ii, n),
      [w, x] = d.useState(null),
      h = oe(t, I => x(I)),
      y = d.useRef(null),
      C = d.useRef(null),
      E = o || g.duration,
      N = d.useRef(0),
      b = d.useRef(E),
      k = d.useRef(0),
      { onToastAdd: M, onToastRemove: j } = g,
      $ = Ge(() => {
        var G;
        ((w == null ? void 0 : w.contains(document.activeElement)) && ((G = g.viewport) == null || G.focus()), i());
      }),
      A = d.useCallback(
        I => {
          !I || I === 1 / 0 || (window.clearTimeout(k.current), (N.current = new Date().getTime()), (k.current = window.setTimeout($, I)));
        },
        [$]
      );
    (d.useEffect(() => {
      const I = g.viewport;
      if (I) {
        const G = () => {
            (A(b.current), u == null || u());
          },
          z = () => {
            const H = new Date().getTime() - N.current;
            ((b.current = b.current - H), window.clearTimeout(k.current), l == null || l());
          };
        return (
          I.addEventListener(wc, z),
          I.addEventListener(Sc, G),
          () => {
            (I.removeEventListener(wc, z), I.removeEventListener(Sc, G));
          }
        );
      }
    }, [g.viewport, E, l, u, A]),
      d.useEffect(() => {
        s && !g.isClosePausedRef.current && A(E);
      }, [s, E, g.isClosePausedRef, A]),
      d.useEffect(() => (M(), () => j()), [M, j]));
    const W = d.useMemo(() => (w ? Ig(w) : null), [w]);
    return g.viewport
      ? c.jsxs(c.Fragment, {
          children: [
            W &&
              c.jsx(_E, {
                __scopeToast: n,
                role: 'status',
                'aria-live': r === 'foreground' ? 'assertive' : 'polite',
                'aria-atomic': !0,
                children: W,
              }),
            c.jsx(RE, {
              scope: n,
              onClose: $,
              children: zr.createPortal(
                c.jsx(Hd.ItemSlot, {
                  scope: n,
                  children: c.jsx(cE, {
                    asChild: !0,
                    onEscapeKeyDown: F(a, () => {
                      (g.isFocusedToastEscapeKeyDownRef.current || $(), (g.isFocusedToastEscapeKeyDownRef.current = !1));
                    }),
                    children: c.jsx(K.li, {
                      role: 'status',
                      'aria-live': 'off',
                      'aria-atomic': !0,
                      tabIndex: 0,
                      'data-state': s ? 'open' : 'closed',
                      'data-swipe-direction': g.swipeDirection,
                      ...S,
                      ref: h,
                      style: { userSelect: 'none', touchAction: 'none', ...e.style },
                      onKeyDown: F(e.onKeyDown, I => {
                        I.key === 'Escape' &&
                          (a == null || a(I.nativeEvent),
                          I.nativeEvent.defaultPrevented || ((g.isFocusedToastEscapeKeyDownRef.current = !0), $()));
                      }),
                      onPointerDown: F(e.onPointerDown, I => {
                        I.button === 0 && (y.current = { x: I.clientX, y: I.clientY });
                      }),
                      onPointerMove: F(e.onPointerMove, I => {
                        if (!y.current) return;
                        const G = I.clientX - y.current.x,
                          z = I.clientY - y.current.y,
                          H = !!C.current,
                          T = ['left', 'right'].includes(g.swipeDirection),
                          P = ['left', 'up'].includes(g.swipeDirection) ? Math.min : Math.max,
                          O = T ? P(0, G) : 0,
                          V = T ? 0 : P(0, z),
                          U = I.pointerType === 'touch' ? 10 : 2,
                          X = { x: O, y: V },
                          Y = { originalEvent: I, delta: X };
                        H
                          ? ((C.current = X), Ii(PE, p, Y, { discrete: !1 }))
                          : Zp(X, g.swipeDirection, U)
                            ? ((C.current = X), Ii(NE, f, Y, { discrete: !1 }), I.target.setPointerCapture(I.pointerId))
                            : (Math.abs(G) > U || Math.abs(z) > U) && (y.current = null);
                      }),
                      onPointerUp: F(e.onPointerUp, I => {
                        const G = C.current,
                          z = I.target;
                        if (
                          (z.hasPointerCapture(I.pointerId) && z.releasePointerCapture(I.pointerId),
                          (C.current = null),
                          (y.current = null),
                          G)
                        ) {
                          const H = I.currentTarget,
                            T = { originalEvent: I, delta: G };
                          (Zp(G, g.swipeDirection, g.swipeThreshold) ? Ii(TE, v, T, { discrete: !0 }) : Ii(kE, m, T, { discrete: !0 }),
                            H.addEventListener('click', P => P.preventDefault(), { once: !0 }));
                        }
                      }),
                    }),
                  }),
                }),
                g.viewport
              ),
            }),
          ],
        })
      : null;
  }),
  _E = e => {
    const { __scopeToast: t, children: n, ...r } = e,
      o = ul(ii, t),
      [s, i] = d.useState(!1),
      [a, l] = d.useState(!1);
    return (
      OE(() => i(!0)),
      d.useEffect(() => {
        const u = window.setTimeout(() => l(!0), 1e3);
        return () => window.clearTimeout(u);
      }, []),
      a
        ? null
        : c.jsx(si, { asChild: !0, children: c.jsx(ll, { ...r, children: s && c.jsxs(c.Fragment, { children: [o.label, ' ', n] }) }) })
    );
  },
  IE = 'ToastTitle',
  kg = d.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e;
    return c.jsx(K.div, { ...r, ref: t });
  });
kg.displayName = IE;
var AE = 'ToastDescription',
  Tg = d.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e;
    return c.jsx(K.div, { ...r, ref: t });
  });
Tg.displayName = AE;
var Rg = 'ToastAction',
  jg = d.forwardRef((e, t) => {
    const { altText: n, ...r } = e;
    return n.trim()
      ? c.jsx(_g, { altText: n, asChild: !0, children: c.jsx(Kd, { ...r, ref: t }) })
      : (console.error(`Invalid prop \`altText\` supplied to \`${Rg}\`. Expected non-empty \`string\`.`), null);
  });
jg.displayName = Rg;
var Mg = 'ToastClose',
  Kd = d.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e,
      o = jE(Mg, n);
    return c.jsx(_g, { asChild: !0, children: c.jsx(K.button, { type: 'button', ...r, ref: t, onClick: F(e.onClick, o.onClose) }) });
  });
Kd.displayName = Mg;
var _g = d.forwardRef((e, t) => {
  const { __scopeToast: n, altText: r, ...o } = e;
  return c.jsx(K.div, { 'data-radix-toast-announce-exclude': '', 'data-radix-toast-announce-alt': r || void 0, ...o, ref: t });
});
function Ig(e) {
  const t = [];
  return (
    Array.from(e.childNodes).forEach(r => {
      if ((r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent), DE(r))) {
        const o = r.ariaHidden || r.hidden || r.style.display === 'none',
          s = r.dataset.radixToastAnnounceExclude === '';
        if (!o)
          if (s) {
            const i = r.dataset.radixToastAnnounceAlt;
            i && t.push(i);
          } else t.push(...Ig(r));
      }
    }),
    t
  );
}
function Ii(e, t, n, { discrete: r }) {
  const o = n.originalEvent.currentTarget,
    s = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
  (t && o.addEventListener(e, t, { once: !0 }), r ? Vd(o, s) : o.dispatchEvent(s));
}
var Zp = (e, t, n = 0) => {
  const r = Math.abs(e.x),
    o = Math.abs(e.y),
    s = r > o;
  return t === 'left' || t === 'right' ? s && r > n : !s && o > n;
};
function OE(e = () => {}) {
  const t = Ge(e);
  Te(() => {
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
function DE(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function LE(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: r => {
        const o = r.tagName === 'INPUT' && r.type === 'hidden';
        return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function fu(e) {
  const t = document.activeElement;
  return e.some(n => (n === t ? !0 : (n.focus(), document.activeElement !== t)));
}
var FE = Cg,
  Ag = bg,
  Og = Pg,
  Dg = kg,
  Lg = Tg,
  Fg = jg,
  $g = Kd;
function zg(e) {
  var t,
    n,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (n = zg(e[t])) && (r && (r += ' '), (r += n));
    } else for (n in e) e[n] && (r && (r += ' '), (r += n));
  return r;
}
function Bg() {
  for (var e, t, n = 0, r = '', o = arguments.length; n < o; n++) (e = arguments[n]) && (t = zg(e)) && (r && (r += ' '), (r += t));
  return r;
}
const Jp = e => (typeof e == 'boolean' ? `${e}` : e === 0 ? '0' : e),
  eh = Bg,
  cl = (e, t) => n => {
    var r;
    if ((t == null ? void 0 : t.variants) == null) return eh(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
    const { variants: o, defaultVariants: s } = t,
      i = Object.keys(o).map(u => {
        const f = n == null ? void 0 : n[u],
          p = s == null ? void 0 : s[u];
        if (f === null) return null;
        const m = Jp(f) || Jp(p);
        return o[u][m];
      }),
      a =
        n &&
        Object.entries(n).reduce((u, f) => {
          let [p, m] = f;
          return (m === void 0 || (u[p] = m), u);
        }, {}),
      l =
        t == null || (r = t.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((u, f) => {
              let { class: p, className: m, ...v } = f;
              return Object.entries(v).every(S => {
                let [g, w] = S;
                return Array.isArray(w) ? w.includes({ ...s, ...a }[g]) : { ...s, ...a }[g] === w;
              })
                ? [...u, p, m]
                : u;
            }, []);
    return eh(e, i, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  };
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $E = e => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Ug = (...e) =>
    e
      .filter((t, n, r) => !!t && t.trim() !== '' && r.indexOf(t) === n)
      .join(' ')
      .trim();
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var zE = {
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
 */ const BE = d.forwardRef(
  (
    {
      color: e = 'currentColor',
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: o = '',
      children: s,
      iconNode: i,
      ...a
    },
    l
  ) =>
    d.createElement(
      'svg',
      {
        ref: l,
        ...zE,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: Ug('lucide', o),
        ...a,
      },
      [...i.map(([u, f]) => d.createElement(u, f)), ...(Array.isArray(s) ? s : [s])]
    )
);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ce = (e, t) => {
  const n = d.forwardRef(({ className: r, ...o }, s) =>
    d.createElement(BE, { ref: s, iconNode: t, className: Ug(`lucide-${$E(e)}`, r), ...o })
  );
  return ((n.displayName = `${e}`), n);
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vg = ce('Calendar', [
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
 */ const Wg = ce('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gd = ce('ChevronDown', [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const UE = ce('ChevronRight', [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const VE = ce('ChevronUp', [['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const WE = ce('CircleCheckBig', [
  ['path', { d: 'M21.801 10A10 10 0 1 1 17 3.335', key: 'yps3ct' }],
  ['path', { d: 'm9 11 3 3L22 4', key: '1pflzl' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const th = ce('CircleX', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
  ['path', { d: 'm9 9 6 6', key: 'z0biqf' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const HE = ce('Circle', [['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qd = ce('Download', [
  ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
  ['polyline', { points: '7 10 12 15 17 10', key: '2ggqvy' }],
  ['line', { x1: '12', x2: '12', y1: '15', y2: '3', key: '1vk2je' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const KE = ce('Folder', [
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
 */ const GE = ce('Gamepad2', [
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
 */ const QE = ce('House', [
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
 */ const YE = ce('Menu', [
  ['line', { x1: '4', x2: '20', y1: '12', y2: '12', key: '1e0a9i' }],
  ['line', { x1: '4', x2: '20', y1: '6', y2: '6', key: '1owob3' }],
  ['line', { x1: '4', x2: '20', y1: '18', y2: '18', key: 'yk5zj1' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Hg = ce('MessageSquare', [['path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', key: '1lielz' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const XE = ce('Minus', [['path', { d: 'M5 12h14', key: '1ays0h' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qE = ce('Monitor', [
  ['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
  ['line', { x1: '8', x2: '16', y1: '21', y2: '21', key: '1svkeh' }],
  ['line', { x1: '12', x2: '12', y1: '17', y2: '21', key: 'vw1qmm' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nh = ce('Pause', [
  ['rect', { x: '14', y: '4', width: '4', height: '16', rx: '1', key: 'zuxfzm' }],
  ['rect', { x: '6', y: '4', width: '4', height: '16', rx: '1', key: '1okwgv' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yd = ce('Play', [['polygon', { points: '6 3 20 12 6 21 6 3', key: '1oa8hb' }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ZE = ce('Power', [
  ['path', { d: 'M12 2v10', key: 'mnfbl' }],
  ['path', { d: 'M18.4 6.6a9 9 0 1 1-12.77.04', key: 'obofu9' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const JE = ce('RotateCcw', [
  ['path', { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', key: '1357e3' }],
  ['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ec = ce('Settings', [
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
 */ const eb = ce('Shield', [
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
 */ const tb = ce('Star', [
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
 */ const nb = ce('ThumbsDown', [
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
 */ const rb = ce('ThumbsUp', [
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
 */ const ob = ce('Trash2', [
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
 */ const sb = ce('TriangleAlert', [
  ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', key: 'wmoenq' }],
  ['path', { d: 'M12 9v4', key: 'juzpu7' }],
  ['path', { d: 'M12 17h.01', key: 'p32p05' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xd = ce('X', [
  ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
  ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Kg = ce('Zap', [
    [
      'path',
      {
        d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
        key: '1xq2db',
      },
    ],
  ]),
  qd = '-',
  ib = e => {
    const t = lb(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: i => {
        const a = i.split(qd);
        return (a[0] === '' && a.length !== 1 && a.shift(), Gg(a, t) || ab(i));
      },
      getConflictingClassGroupIds: (i, a) => {
        const l = n[i] || [];
        return a && r[i] ? [...l, ...r[i]] : l;
      },
    };
  },
  Gg = (e, t) => {
    var i;
    if (e.length === 0) return t.classGroupId;
    const n = e[0],
      r = t.nextPart.get(n),
      o = r ? Gg(e.slice(1), r) : void 0;
    if (o) return o;
    if (t.validators.length === 0) return;
    const s = e.join(qd);
    return (i = t.validators.find(({ validator: a }) => a(s))) == null ? void 0 : i.classGroupId;
  },
  rh = /^\[(.+)\]$/,
  ab = e => {
    if (rh.test(e)) {
      const t = rh.exec(e)[1],
        n = t == null ? void 0 : t.substring(0, t.indexOf(':'));
      if (n) return 'arbitrary..' + n;
    }
  },
  lb = e => {
    const { theme: t, prefix: n } = e,
      r = { nextPart: new Map(), validators: [] };
    return (
      cb(Object.entries(e.classGroups), n).forEach(([s, i]) => {
        bc(i, r, s, t);
      }),
      r
    );
  },
  bc = (e, t, n, r) => {
    e.forEach(o => {
      if (typeof o == 'string') {
        const s = o === '' ? t : oh(t, o);
        s.classGroupId = n;
        return;
      }
      if (typeof o == 'function') {
        if (ub(o)) {
          bc(o(r), t, n, r);
          return;
        }
        t.validators.push({ validator: o, classGroupId: n });
        return;
      }
      Object.entries(o).forEach(([s, i]) => {
        bc(i, oh(t, s), n, r);
      });
    });
  },
  oh = (e, t) => {
    let n = e;
    return (
      t.split(qd).forEach(r => {
        (n.nextPart.has(r) || n.nextPart.set(r, { nextPart: new Map(), validators: [] }), (n = n.nextPart.get(r)));
      }),
      n
    );
  },
  ub = e => e.isThemeGetter,
  cb = (e, t) =>
    t
      ? e.map(([n, r]) => {
          const o = r.map(s =>
            typeof s == 'string' ? t + s : typeof s == 'object' ? Object.fromEntries(Object.entries(s).map(([i, a]) => [t + i, a])) : s
          );
          return [n, o];
        })
      : e,
  db = e => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      n = new Map(),
      r = new Map();
    const o = (s, i) => {
      (n.set(s, i), t++, t > e && ((t = 0), (r = n), (n = new Map())));
    };
    return {
      get(s) {
        let i = n.get(s);
        if (i !== void 0) return i;
        if ((i = r.get(s)) !== void 0) return (o(s, i), i);
      },
      set(s, i) {
        n.has(s) ? n.set(s, i) : o(s, i);
      },
    };
  },
  Qg = '!',
  fb = e => {
    const { separator: t, experimentalParseClassName: n } = e,
      r = t.length === 1,
      o = t[0],
      s = t.length,
      i = a => {
        const l = [];
        let u = 0,
          f = 0,
          p;
        for (let w = 0; w < a.length; w++) {
          let x = a[w];
          if (u === 0) {
            if (x === o && (r || a.slice(w, w + s) === t)) {
              (l.push(a.slice(f, w)), (f = w + s));
              continue;
            }
            if (x === '/') {
              p = w;
              continue;
            }
          }
          x === '[' ? u++ : x === ']' && u--;
        }
        const m = l.length === 0 ? a : a.substring(f),
          v = m.startsWith(Qg),
          S = v ? m.substring(1) : m,
          g = p && p > f ? p - f : void 0;
        return { modifiers: l, hasImportantModifier: v, baseClassName: S, maybePostfixModifierPosition: g };
      };
    return n ? a => n({ className: a, parseClassName: i }) : i;
  },
  pb = e => {
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
  hb = e => ({ cache: db(e.cacheSize), parseClassName: fb(e), ...ib(e) }),
  mb = /\s+/,
  vb = (e, t) => {
    const { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: o } = t,
      s = [],
      i = e.trim().split(mb);
    let a = '';
    for (let l = i.length - 1; l >= 0; l -= 1) {
      const u = i[l],
        { modifiers: f, hasImportantModifier: p, baseClassName: m, maybePostfixModifierPosition: v } = n(u);
      let S = !!v,
        g = r(S ? m.substring(0, v) : m);
      if (!g) {
        if (!S) {
          a = u + (a.length > 0 ? ' ' + a : a);
          continue;
        }
        if (((g = r(m)), !g)) {
          a = u + (a.length > 0 ? ' ' + a : a);
          continue;
        }
        S = !1;
      }
      const w = pb(f).join(':'),
        x = p ? w + Qg : w,
        h = x + g;
      if (s.includes(h)) continue;
      s.push(h);
      const y = o(g, S);
      for (let C = 0; C < y.length; ++C) {
        const E = y[C];
        s.push(x + E);
      }
      a = u + (a.length > 0 ? ' ' + a : a);
    }
    return a;
  };
function gb() {
  let e = 0,
    t,
    n,
    r = '';
  for (; e < arguments.length; ) (t = arguments[e++]) && (n = Yg(t)) && (r && (r += ' '), (r += n));
  return r;
}
const Yg = e => {
  if (typeof e == 'string') return e;
  let t,
    n = '';
  for (let r = 0; r < e.length; r++) e[r] && (t = Yg(e[r])) && (n && (n += ' '), (n += t));
  return n;
};
function yb(e, ...t) {
  let n,
    r,
    o,
    s = i;
  function i(l) {
    const u = t.reduce((f, p) => p(f), e());
    return ((n = hb(u)), (r = n.cache.get), (o = n.cache.set), (s = a), a(l));
  }
  function a(l) {
    const u = r(l);
    if (u) return u;
    const f = vb(l, n);
    return (o(l, f), f);
  }
  return function () {
    return s(gb.apply(null, arguments));
  };
}
const me = e => {
    const t = n => n[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  Xg = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  xb = /^\d+\/\d+$/,
  wb = new Set(['px', 'full', 'screen']),
  Sb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Cb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Eb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  bb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Nb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  sn = e => go(e) || wb.has(e) || xb.test(e),
  Tn = e => Wo(e, 'length', Ib),
  go = e => !!e && !Number.isNaN(Number(e)),
  pu = e => Wo(e, 'number', go),
  as = e => !!e && Number.isInteger(Number(e)),
  Pb = e => e.endsWith('%') && go(e.slice(0, -1)),
  J = e => Xg.test(e),
  Rn = e => Sb.test(e),
  kb = new Set(['length', 'size', 'percentage']),
  Tb = e => Wo(e, kb, qg),
  Rb = e => Wo(e, 'position', qg),
  jb = new Set(['image', 'url']),
  Mb = e => Wo(e, jb, Ob),
  _b = e => Wo(e, '', Ab),
  ls = () => !0,
  Wo = (e, t, n) => {
    const r = Xg.exec(e);
    return r ? (r[1] ? (typeof t == 'string' ? r[1] === t : t.has(r[1])) : n(r[2])) : !1;
  },
  Ib = e => Cb.test(e) && !Eb.test(e),
  qg = () => !1,
  Ab = e => bb.test(e),
  Ob = e => Nb.test(e),
  Db = () => {
    const e = me('colors'),
      t = me('spacing'),
      n = me('blur'),
      r = me('brightness'),
      o = me('borderColor'),
      s = me('borderRadius'),
      i = me('borderSpacing'),
      a = me('borderWidth'),
      l = me('contrast'),
      u = me('grayscale'),
      f = me('hueRotate'),
      p = me('invert'),
      m = me('gap'),
      v = me('gradientColorStops'),
      S = me('gradientColorStopPositions'),
      g = me('inset'),
      w = me('margin'),
      x = me('opacity'),
      h = me('padding'),
      y = me('saturate'),
      C = me('scale'),
      E = me('sepia'),
      N = me('skew'),
      b = me('space'),
      k = me('translate'),
      M = () => ['auto', 'contain', 'none'],
      j = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      $ = () => ['auto', J, t],
      A = () => [J, t],
      W = () => ['', sn, Tn],
      I = () => ['auto', go, J],
      G = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'],
      z = () => ['solid', 'dashed', 'dotted', 'double', 'none'],
      H = () => [
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
      T = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
      P = () => ['', '0', J],
      O = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'],
      V = () => [go, J];
    return {
      cacheSize: 500,
      separator: ':',
      theme: {
        colors: [ls],
        spacing: [sn, Tn],
        blur: ['none', '', Rn, J],
        brightness: V(),
        borderColor: [e],
        borderRadius: ['none', '', 'full', Rn, J],
        borderSpacing: A(),
        borderWidth: W(),
        contrast: V(),
        grayscale: P(),
        hueRotate: V(),
        invert: P(),
        gap: A(),
        gradientColorStops: [e],
        gradientColorStopPositions: [Pb, Tn],
        inset: $(),
        margin: $(),
        opacity: V(),
        padding: A(),
        saturate: V(),
        scale: V(),
        sepia: P(),
        skew: V(),
        space: A(),
        translate: A(),
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', 'video', J] }],
        container: ['container'],
        columns: [{ columns: [Rn] }],
        'break-after': [{ 'break-after': O() }],
        'break-before': [{ 'break-before': O() }],
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
        'object-position': [{ object: [...G(), J] }],
        overflow: [{ overflow: j() }],
        'overflow-x': [{ 'overflow-x': j() }],
        'overflow-y': [{ 'overflow-y': j() }],
        overscroll: [{ overscroll: M() }],
        'overscroll-x': [{ 'overscroll-x': M() }],
        'overscroll-y': [{ 'overscroll-y': M() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: [g] }],
        'inset-x': [{ 'inset-x': [g] }],
        'inset-y': [{ 'inset-y': [g] }],
        start: [{ start: [g] }],
        end: [{ end: [g] }],
        top: [{ top: [g] }],
        right: [{ right: [g] }],
        bottom: [{ bottom: [g] }],
        left: [{ left: [g] }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: ['auto', as, J] }],
        basis: [{ basis: $() }],
        'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
        'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
        flex: [{ flex: ['1', 'auto', 'initial', 'none', J] }],
        grow: [{ grow: P() }],
        shrink: [{ shrink: P() }],
        order: [{ order: ['first', 'last', 'none', as, J] }],
        'grid-cols': [{ 'grid-cols': [ls] }],
        'col-start-end': [{ col: ['auto', { span: ['full', as, J] }, J] }],
        'col-start': [{ 'col-start': I() }],
        'col-end': [{ 'col-end': I() }],
        'grid-rows': [{ 'grid-rows': [ls] }],
        'row-start-end': [{ row: ['auto', { span: [as, J] }, J] }],
        'row-start': [{ 'row-start': I() }],
        'row-end': [{ 'row-end': I() }],
        'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
        'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', J] }],
        'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', J] }],
        gap: [{ gap: [m] }],
        'gap-x': [{ 'gap-x': [m] }],
        'gap-y': [{ 'gap-y': [m] }],
        'justify-content': [{ justify: ['normal', ...T()] }],
        'justify-items': [{ 'justify-items': ['start', 'end', 'center', 'stretch'] }],
        'justify-self': [{ 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
        'align-content': [{ content: ['normal', ...T(), 'baseline'] }],
        'align-items': [{ items: ['start', 'end', 'center', 'baseline', 'stretch'] }],
        'align-self': [{ self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] }],
        'place-content': [{ 'place-content': [...T(), 'baseline'] }],
        'place-items': [{ 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] }],
        'place-self': [{ 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
        p: [{ p: [h] }],
        px: [{ px: [h] }],
        py: [{ py: [h] }],
        ps: [{ ps: [h] }],
        pe: [{ pe: [h] }],
        pt: [{ pt: [h] }],
        pr: [{ pr: [h] }],
        pb: [{ pb: [h] }],
        pl: [{ pl: [h] }],
        m: [{ m: [w] }],
        mx: [{ mx: [w] }],
        my: [{ my: [w] }],
        ms: [{ ms: [w] }],
        me: [{ me: [w] }],
        mt: [{ mt: [w] }],
        mr: [{ mr: [w] }],
        mb: [{ mb: [w] }],
        ml: [{ ml: [w] }],
        'space-x': [{ 'space-x': [b] }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': [b] }],
        'space-y-reverse': ['space-y-reverse'],
        w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', J, t] }],
        'min-w': [{ 'min-w': [J, t, 'min', 'max', 'fit'] }],
        'max-w': [{ 'max-w': [J, t, 'none', 'full', 'min', 'max', 'fit', 'prose', { screen: [Rn] }, Rn] }],
        h: [{ h: [J, t, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        'min-h': [{ 'min-h': [J, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        'max-h': [{ 'max-h': [J, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        size: [{ size: [J, t, 'auto', 'min', 'max', 'fit'] }],
        'font-size': [{ text: ['base', Rn, Tn] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', pu] }],
        'font-family': [{ font: [ls] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', J] }],
        'line-clamp': [{ 'line-clamp': ['none', go, pu] }],
        leading: [{ leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', sn, J] }],
        'list-image': [{ 'list-image': ['none', J] }],
        'list-style-type': [{ list: ['none', 'disc', 'decimal', J] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'placeholder-color': [{ placeholder: [e] }],
        'placeholder-opacity': [{ 'placeholder-opacity': [x] }],
        'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
        'text-color': [{ text: [e] }],
        'text-opacity': [{ 'text-opacity': [x] }],
        'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
        'text-decoration-style': [{ decoration: [...z(), 'wavy'] }],
        'text-decoration-thickness': [{ decoration: ['auto', 'from-font', sn, Tn] }],
        'underline-offset': [{ 'underline-offset': ['auto', sn, J] }],
        'text-decoration-color': [{ decoration: [e] }],
        'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: A() }],
        'vertical-align': [{ align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', J] }],
        whitespace: [{ whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] }],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', J] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-opacity': [{ 'bg-opacity': [x] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: [...G(), Rb] }],
        'bg-repeat': [{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] }],
        'bg-size': [{ bg: ['auto', 'cover', 'contain', Tb] }],
        'bg-image': [{ bg: ['none', { 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, Mb] }],
        'bg-color': [{ bg: [e] }],
        'gradient-from-pos': [{ from: [S] }],
        'gradient-via-pos': [{ via: [S] }],
        'gradient-to-pos': [{ to: [S] }],
        'gradient-from': [{ from: [v] }],
        'gradient-via': [{ via: [v] }],
        'gradient-to': [{ to: [v] }],
        rounded: [{ rounded: [s] }],
        'rounded-s': [{ 'rounded-s': [s] }],
        'rounded-e': [{ 'rounded-e': [s] }],
        'rounded-t': [{ 'rounded-t': [s] }],
        'rounded-r': [{ 'rounded-r': [s] }],
        'rounded-b': [{ 'rounded-b': [s] }],
        'rounded-l': [{ 'rounded-l': [s] }],
        'rounded-ss': [{ 'rounded-ss': [s] }],
        'rounded-se': [{ 'rounded-se': [s] }],
        'rounded-ee': [{ 'rounded-ee': [s] }],
        'rounded-es': [{ 'rounded-es': [s] }],
        'rounded-tl': [{ 'rounded-tl': [s] }],
        'rounded-tr': [{ 'rounded-tr': [s] }],
        'rounded-br': [{ 'rounded-br': [s] }],
        'rounded-bl': [{ 'rounded-bl': [s] }],
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
        'border-style': [{ border: [...z(), 'hidden'] }],
        'divide-x': [{ 'divide-x': [a] }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': [a] }],
        'divide-y-reverse': ['divide-y-reverse'],
        'divide-opacity': [{ 'divide-opacity': [x] }],
        'divide-style': [{ divide: z() }],
        'border-color': [{ border: [o] }],
        'border-color-x': [{ 'border-x': [o] }],
        'border-color-y': [{ 'border-y': [o] }],
        'border-color-s': [{ 'border-s': [o] }],
        'border-color-e': [{ 'border-e': [o] }],
        'border-color-t': [{ 'border-t': [o] }],
        'border-color-r': [{ 'border-r': [o] }],
        'border-color-b': [{ 'border-b': [o] }],
        'border-color-l': [{ 'border-l': [o] }],
        'divide-color': [{ divide: [o] }],
        'outline-style': [{ outline: ['', ...z()] }],
        'outline-offset': [{ 'outline-offset': [sn, J] }],
        'outline-w': [{ outline: [sn, Tn] }],
        'outline-color': [{ outline: [e] }],
        'ring-w': [{ ring: W() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: [e] }],
        'ring-opacity': [{ 'ring-opacity': [x] }],
        'ring-offset-w': [{ 'ring-offset': [sn, Tn] }],
        'ring-offset-color': [{ 'ring-offset': [e] }],
        shadow: [{ shadow: ['', 'inner', 'none', Rn, _b] }],
        'shadow-color': [{ shadow: [ls] }],
        opacity: [{ opacity: [x] }],
        'mix-blend': [{ 'mix-blend': [...H(), 'plus-lighter', 'plus-darker'] }],
        'bg-blend': [{ 'bg-blend': H() }],
        filter: [{ filter: ['', 'none'] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [r] }],
        contrast: [{ contrast: [l] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', Rn, J] }],
        grayscale: [{ grayscale: [u] }],
        'hue-rotate': [{ 'hue-rotate': [f] }],
        invert: [{ invert: [p] }],
        saturate: [{ saturate: [y] }],
        sepia: [{ sepia: [E] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
        'backdrop-blur': [{ 'backdrop-blur': [n] }],
        'backdrop-brightness': [{ 'backdrop-brightness': [r] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [l] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': [u] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [f] }],
        'backdrop-invert': [{ 'backdrop-invert': [p] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [x] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [y] }],
        'backdrop-sepia': [{ 'backdrop-sepia': [E] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': [i] }],
        'border-spacing-x': [{ 'border-spacing-x': [i] }],
        'border-spacing-y': [{ 'border-spacing-y': [i] }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [{ transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', J] }],
        duration: [{ duration: V() }],
        ease: [{ ease: ['linear', 'in', 'out', 'in-out', J] }],
        delay: [{ delay: V() }],
        animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', J] }],
        transform: [{ transform: ['', 'gpu', 'none'] }],
        scale: [{ scale: [C] }],
        'scale-x': [{ 'scale-x': [C] }],
        'scale-y': [{ 'scale-y': [C] }],
        rotate: [{ rotate: [as, J] }],
        'translate-x': [{ 'translate-x': [k] }],
        'translate-y': [{ 'translate-y': [k] }],
        'skew-x': [{ 'skew-x': [N] }],
        'skew-y': [{ 'skew-y': [N] }],
        'transform-origin': [
          { origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', J] },
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
              J,
            ],
          },
        ],
        'caret-color': [{ caret: [e] }],
        'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
        resize: [{ resize: ['none', 'y', 'x', ''] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': A() }],
        'scroll-mx': [{ 'scroll-mx': A() }],
        'scroll-my': [{ 'scroll-my': A() }],
        'scroll-ms': [{ 'scroll-ms': A() }],
        'scroll-me': [{ 'scroll-me': A() }],
        'scroll-mt': [{ 'scroll-mt': A() }],
        'scroll-mr': [{ 'scroll-mr': A() }],
        'scroll-mb': [{ 'scroll-mb': A() }],
        'scroll-ml': [{ 'scroll-ml': A() }],
        'scroll-p': [{ 'scroll-p': A() }],
        'scroll-px': [{ 'scroll-px': A() }],
        'scroll-py': [{ 'scroll-py': A() }],
        'scroll-ps': [{ 'scroll-ps': A() }],
        'scroll-pe': [{ 'scroll-pe': A() }],
        'scroll-pt': [{ 'scroll-pt': A() }],
        'scroll-pr': [{ 'scroll-pr': A() }],
        'scroll-pb': [{ 'scroll-pb': A() }],
        'scroll-pl': [{ 'scroll-pl': A() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', J] }],
        fill: [{ fill: [e, 'none'] }],
        'stroke-w': [{ stroke: [sn, Tn, pu] }],
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
  Lb = yb(Db);
function Q(...e) {
  return Lb(Bg(e));
}
const Fb = FE,
  Zg = d.forwardRef(({ className: e, ...t }, n) =>
    c.jsx(Ag, {
      ref: n,
      className: Q(
        'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
        e
      ),
      ...t,
    })
  );
Zg.displayName = Ag.displayName;
const $b = cl(
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
  Jg = d.forwardRef(({ className: e, variant: t, ...n }, r) => c.jsx(Og, { ref: r, className: Q($b({ variant: t }), e), ...n }));
Jg.displayName = Og.displayName;
const zb = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(Fg, {
    ref: n,
    className: Q(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      e
    ),
    ...t,
  })
);
zb.displayName = Fg.displayName;
const ey = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx($g, {
    ref: n,
    className: Q(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      e
    ),
    'toast-close': '',
    ...t,
    children: c.jsx(Xd, { className: 'h-4 w-4' }),
  })
);
ey.displayName = $g.displayName;
const ty = d.forwardRef(({ className: e, ...t }, n) => c.jsx(Dg, { ref: n, className: Q('text-sm font-semibold', e), ...t }));
ty.displayName = Dg.displayName;
const ny = d.forwardRef(({ className: e, ...t }, n) => c.jsx(Lg, { ref: n, className: Q('text-sm opacity-90', e), ...t }));
ny.displayName = Lg.displayName;
function Bb() {
  const { toasts: e } = GC();
  return c.jsxs(Fb, {
    children: [
      e.map(function ({ id: t, title: n, description: r, action: o, ...s }) {
        return c.jsxs(
          Jg,
          {
            ...s,
            children: [
              c.jsxs('div', { className: 'grid gap-1', children: [n && c.jsx(ty, { children: n }), r && c.jsx(ny, { children: r })] }),
              o,
              c.jsx(ey, {}),
            ],
          },
          t
        );
      }),
      c.jsx(Zg, {}),
    ],
  });
}
var sh = ['light', 'dark'],
  Ub = '(prefers-color-scheme: dark)',
  Vb = d.createContext(void 0),
  Wb = { setTheme: e => {}, themes: [] },
  Hb = () => {
    var e;
    return (e = d.useContext(Vb)) != null ? e : Wb;
  };
d.memo(
  ({
    forcedTheme: e,
    storageKey: t,
    attribute: n,
    enableSystem: r,
    enableColorScheme: o,
    defaultTheme: s,
    value: i,
    attrs: a,
    nonce: l,
  }) => {
    let u = s === 'system',
      f =
        n === 'class'
          ? `var d=document.documentElement,c=d.classList;${`c.remove(${a.map(S => `'${S}'`).join(',')})`};`
          : `var d=document.documentElement,n='${n}',s='setAttribute';`,
      p = o
        ? sh.includes(s) && s
          ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${s}'`
          : "if(e==='light'||e==='dark')d.style.colorScheme=e"
        : '',
      m = (S, g = !1, w = !0) => {
        let x = i ? i[S] : S,
          h = g ? S + "|| ''" : `'${x}'`,
          y = '';
        return (
          o && w && !g && sh.includes(S) && (y += `d.style.colorScheme = '${S}';`),
          n === 'class' ? (g || x ? (y += `c.add(${h})`) : (y += 'null')) : x && (y += `d[s](n,${h})`),
          y
        );
      },
      v = e
        ? `!function(){${f}${m(e)}}()`
        : r
          ? `!function(){try{${f}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${u})){var t='${Ub}',m=window.matchMedia(t);if(m.media!==t||m.matches){${m('dark')}}else{${m('light')}}}else if(e){${i ? `var x=${JSON.stringify(i)};` : ''}${m(i ? 'x[e]' : 'e', !0)}}${u ? '' : 'else{' + m(s, !1, !1) + '}'}${p}}catch(e){}}()`
          : `!function(){try{${f}var e=localStorage.getItem('${t}');if(e){${i ? `var x=${JSON.stringify(i)};` : ''}${m(i ? 'x[e]' : 'e', !0)}}else{${m(s, !1, !1)};}${p}}catch(t){}}();`;
    return d.createElement('script', { nonce: l, dangerouslySetInnerHTML: { __html: v } });
  }
);
var Kb = e => {
    switch (e) {
      case 'success':
        return Yb;
      case 'info':
        return qb;
      case 'warning':
        return Xb;
      case 'error':
        return Zb;
      default:
        return null;
    }
  },
  Gb = Array(12).fill(0),
  Qb = ({ visible: e, className: t }) =>
    D.createElement(
      'div',
      { className: ['sonner-loading-wrapper', t].filter(Boolean).join(' '), 'data-visible': e },
      D.createElement(
        'div',
        { className: 'sonner-spinner' },
        Gb.map((n, r) => D.createElement('div', { className: 'sonner-loading-bar', key: `spinner-bar-${r}` }))
      )
    ),
  Yb = D.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', height: '20', width: '20' },
    D.createElement('path', {
      fillRule: 'evenodd',
      d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
      clipRule: 'evenodd',
    })
  ),
  Xb = D.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor', height: '20', width: '20' },
    D.createElement('path', {
      fillRule: 'evenodd',
      d: 'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z',
      clipRule: 'evenodd',
    })
  ),
  qb = D.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', height: '20', width: '20' },
    D.createElement('path', {
      fillRule: 'evenodd',
      d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z',
      clipRule: 'evenodd',
    })
  ),
  Zb = D.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', height: '20', width: '20' },
    D.createElement('path', {
      fillRule: 'evenodd',
      d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z',
      clipRule: 'evenodd',
    })
  ),
  Jb = D.createElement(
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
  eN = () => {
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
  Nc = 1,
  tN = class {
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
            o = typeof (e == null ? void 0 : e.id) == 'number' || ((t = e.id) == null ? void 0 : t.length) > 0 ? e.id : Nc++,
            s = this.toasts.find(a => a.id === o),
            i = e.dismissible === void 0 ? !0 : e.dismissible;
          return (
            this.dismissedToasts.has(o) && this.dismissedToasts.delete(o),
            s
              ? (this.toasts = this.toasts.map(a =>
                  a.id === o ? (this.publish({ ...a, ...e, id: o, title: n }), { ...a, ...e, id: o, dismissible: i, title: n }) : a
                ))
              : this.addToast({ title: n, ...r, dismissible: i, id: o }),
            o
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
            o = n !== void 0,
            s,
            i = r
              .then(async l => {
                if (((s = ['resolve', l]), D.isValidElement(l))) ((o = !1), this.create({ id: n, type: 'default', message: l }));
                else if (rN(l) && !l.ok) {
                  o = !1;
                  let u = typeof t.error == 'function' ? await t.error(`HTTP error! status: ${l.status}`) : t.error,
                    f = typeof t.description == 'function' ? await t.description(`HTTP error! status: ${l.status}`) : t.description;
                  this.create({ id: n, type: 'error', message: u, description: f });
                } else if (t.success !== void 0) {
                  o = !1;
                  let u = typeof t.success == 'function' ? await t.success(l) : t.success,
                    f = typeof t.description == 'function' ? await t.description(l) : t.description;
                  this.create({ id: n, type: 'success', message: u, description: f });
                }
              })
              .catch(async l => {
                if (((s = ['reject', l]), t.error !== void 0)) {
                  o = !1;
                  let u = typeof t.error == 'function' ? await t.error(l) : t.error,
                    f = typeof t.description == 'function' ? await t.description(l) : t.description;
                  this.create({ id: n, type: 'error', message: u, description: f });
                }
              })
              .finally(() => {
                var l;
                (o && (this.dismiss(n), (n = void 0)), (l = t.finally) == null || l.call(t));
              }),
            a = () => new Promise((l, u) => i.then(() => (s[0] === 'reject' ? u(s[1]) : l(s[1]))).catch(u));
          return typeof n != 'string' && typeof n != 'number' ? { unwrap: a } : Object.assign(n, { unwrap: a });
        }),
        (this.custom = (e, t) => {
          let n = (t == null ? void 0 : t.id) || Nc++;
          return (this.create({ jsx: e(n), id: n, ...t }), n);
        }),
        (this.getActiveToasts = () => this.toasts.filter(e => !this.dismissedToasts.has(e.id))),
        (this.subscribers = []),
        (this.toasts = []),
        (this.dismissedToasts = new Set()));
    }
  },
  qe = new tN(),
  nN = (e, t) => {
    let n = (t == null ? void 0 : t.id) || Nc++;
    return (qe.addToast({ title: e, ...t, id: n }), n);
  },
  rN = e => e && typeof e == 'object' && 'ok' in e && typeof e.ok == 'boolean' && 'status' in e && typeof e.status == 'number',
  oN = nN,
  sN = () => qe.toasts,
  iN = () => qe.getActiveToasts();
Object.assign(
  oN,
  {
    success: qe.success,
    info: qe.info,
    warning: qe.warning,
    error: qe.error,
    custom: qe.custom,
    message: qe.message,
    promise: qe.promise,
    dismiss: qe.dismiss,
    loading: qe.loading,
  },
  { getHistory: sN, getToasts: iN }
);
function aN(e, { insertAt: t } = {}) {
  if (typeof document > 'u') return;
  let n = document.head || document.getElementsByTagName('head')[0],
    r = document.createElement('style');
  ((r.type = 'text/css'),
    t === 'top' && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r),
    r.styleSheet ? (r.styleSheet.cssText = e) : r.appendChild(document.createTextNode(e)));
}
aN(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function Ai(e) {
  return e.label !== void 0;
}
var lN = 3,
  uN = '32px',
  cN = '16px',
  ih = 4e3,
  dN = 356,
  fN = 14,
  pN = 20,
  hN = 200;
function Tt(...e) {
  return e.filter(Boolean).join(' ');
}
function mN(e) {
  let [t, n] = e.split('-'),
    r = [];
  return (t && r.push(t), n && r.push(n), r);
}
var vN = e => {
  var t, n, r, o, s, i, a, l, u, f, p;
  let {
      invert: m,
      toast: v,
      unstyled: S,
      interacting: g,
      setHeights: w,
      visibleToasts: x,
      heights: h,
      index: y,
      toasts: C,
      expanded: E,
      removeToast: N,
      defaultRichColors: b,
      closeButton: k,
      style: M,
      cancelButtonStyle: j,
      actionButtonStyle: $,
      className: A = '',
      descriptionClassName: W = '',
      duration: I,
      position: G,
      gap: z,
      loadingIcon: H,
      expandByDefault: T,
      classNames: P,
      icons: O,
      closeButtonAriaLabel: V = 'Close toast',
      pauseWhenPageIsHidden: U,
    } = e,
    [X, Y] = D.useState(null),
    [de, fe] = D.useState(null),
    [L, se] = D.useState(!1),
    [ie, te] = D.useState(!1),
    [ne, ae] = D.useState(!1),
    [De, ft] = D.useState(!1),
    [dr, En] = D.useState(!1),
    [fr, qo] = D.useState(0),
    [Wr, _f] = D.useState(0),
    Zo = D.useRef(v.duration || I || ih),
    If = D.useRef(null),
    pr = D.useRef(null),
    a1 = y === 0,
    l1 = y + 1 <= x,
    pt = v.type,
    Hr = v.dismissible !== !1,
    u1 = v.className || '',
    c1 = v.descriptionClassName || '',
    pi = D.useMemo(() => h.findIndex(q => q.toastId === v.id) || 0, [h, v.id]),
    d1 = D.useMemo(() => {
      var q;
      return (q = v.closeButton) != null ? q : k;
    }, [v.closeButton, k]),
    Af = D.useMemo(() => v.duration || I || ih, [v.duration, I]),
    Ol = D.useRef(0),
    Kr = D.useRef(0),
    Of = D.useRef(0),
    Gr = D.useRef(null),
    [f1, p1] = G.split('-'),
    Df = D.useMemo(() => h.reduce((q, pe, ye) => (ye >= pi ? q : q + pe.height), 0), [h, pi]),
    Lf = eN(),
    h1 = v.invert || m,
    Dl = pt === 'loading';
  ((Kr.current = D.useMemo(() => pi * z + Df, [pi, Df])),
    D.useEffect(() => {
      Zo.current = Af;
    }, [Af]),
    D.useEffect(() => {
      se(!0);
    }, []),
    D.useEffect(() => {
      let q = pr.current;
      if (q) {
        let pe = q.getBoundingClientRect().height;
        return (
          _f(pe),
          w(ye => [{ toastId: v.id, height: pe, position: v.position }, ...ye]),
          () => w(ye => ye.filter(bt => bt.toastId !== v.id))
        );
      }
    }, [w, v.id]),
    D.useLayoutEffect(() => {
      if (!L) return;
      let q = pr.current,
        pe = q.style.height;
      q.style.height = 'auto';
      let ye = q.getBoundingClientRect().height;
      ((q.style.height = pe),
        _f(ye),
        w(bt =>
          bt.find(Nt => Nt.toastId === v.id)
            ? bt.map(Nt => (Nt.toastId === v.id ? { ...Nt, height: ye } : Nt))
            : [{ toastId: v.id, height: ye, position: v.position }, ...bt]
        ));
    }, [L, v.title, v.description, w, v.id]));
  let bn = D.useCallback(() => {
    (te(!0),
      qo(Kr.current),
      w(q => q.filter(pe => pe.toastId !== v.id)),
      setTimeout(() => {
        N(v);
      }, hN));
  }, [v, N, w, Kr]);
  (D.useEffect(() => {
    if ((v.promise && pt === 'loading') || v.duration === 1 / 0 || v.type === 'loading') return;
    let q;
    return (
      E || g || (U && Lf)
        ? (() => {
            if (Of.current < Ol.current) {
              let pe = new Date().getTime() - Ol.current;
              Zo.current = Zo.current - pe;
            }
            Of.current = new Date().getTime();
          })()
        : Zo.current !== 1 / 0 &&
          ((Ol.current = new Date().getTime()),
          (q = setTimeout(() => {
            var pe;
            ((pe = v.onAutoClose) == null || pe.call(v, v), bn());
          }, Zo.current))),
      () => clearTimeout(q)
    );
  }, [E, g, v, pt, U, Lf, bn]),
    D.useEffect(() => {
      v.delete && bn();
    }, [bn, v.delete]));
  function m1() {
    var q, pe, ye;
    return O != null && O.loading
      ? D.createElement(
          'div',
          {
            className: Tt(
              P == null ? void 0 : P.loader,
              (q = v == null ? void 0 : v.classNames) == null ? void 0 : q.loader,
              'sonner-loader'
            ),
            'data-visible': pt === 'loading',
          },
          O.loading
        )
      : H
        ? D.createElement(
            'div',
            {
              className: Tt(
                P == null ? void 0 : P.loader,
                (pe = v == null ? void 0 : v.classNames) == null ? void 0 : pe.loader,
                'sonner-loader'
              ),
              'data-visible': pt === 'loading',
            },
            H
          )
        : D.createElement(Qb, {
            className: Tt(P == null ? void 0 : P.loader, (ye = v == null ? void 0 : v.classNames) == null ? void 0 : ye.loader),
            visible: pt === 'loading',
          });
  }
  return D.createElement(
    'li',
    {
      tabIndex: 0,
      ref: pr,
      className: Tt(
        A,
        u1,
        P == null ? void 0 : P.toast,
        (t = v == null ? void 0 : v.classNames) == null ? void 0 : t.toast,
        P == null ? void 0 : P.default,
        P == null ? void 0 : P[pt],
        (n = v == null ? void 0 : v.classNames) == null ? void 0 : n[pt]
      ),
      'data-sonner-toast': '',
      'data-rich-colors': (r = v.richColors) != null ? r : b,
      'data-styled': !(v.jsx || v.unstyled || S),
      'data-mounted': L,
      'data-promise': !!v.promise,
      'data-swiped': dr,
      'data-removed': ie,
      'data-visible': l1,
      'data-y-position': f1,
      'data-x-position': p1,
      'data-index': y,
      'data-front': a1,
      'data-swiping': ne,
      'data-dismissible': Hr,
      'data-type': pt,
      'data-invert': h1,
      'data-swipe-out': De,
      'data-swipe-direction': de,
      'data-expanded': !!(E || (T && L)),
      style: {
        '--index': y,
        '--toasts-before': y,
        '--z-index': C.length - y,
        '--offset': `${ie ? fr : Kr.current}px`,
        '--initial-height': T ? 'auto' : `${Wr}px`,
        ...M,
        ...v.style,
      },
      onDragEnd: () => {
        (ae(!1), Y(null), (Gr.current = null));
      },
      onPointerDown: q => {
        Dl ||
          !Hr ||
          ((If.current = new Date()),
          qo(Kr.current),
          q.target.setPointerCapture(q.pointerId),
          q.target.tagName !== 'BUTTON' && (ae(!0), (Gr.current = { x: q.clientX, y: q.clientY })));
      },
      onPointerUp: () => {
        var q, pe, ye, bt;
        if (De || !Hr) return;
        Gr.current = null;
        let Nt = Number(((q = pr.current) == null ? void 0 : q.style.getPropertyValue('--swipe-amount-x').replace('px', '')) || 0),
          Nn = Number(((pe = pr.current) == null ? void 0 : pe.style.getPropertyValue('--swipe-amount-y').replace('px', '')) || 0),
          hr = new Date().getTime() - ((ye = If.current) == null ? void 0 : ye.getTime()),
          Pt = X === 'x' ? Nt : Nn,
          Pn = Math.abs(Pt) / hr;
        if (Math.abs(Pt) >= pN || Pn > 0.11) {
          (qo(Kr.current),
            (bt = v.onDismiss) == null || bt.call(v, v),
            fe(X === 'x' ? (Nt > 0 ? 'right' : 'left') : Nn > 0 ? 'down' : 'up'),
            bn(),
            ft(!0),
            En(!1));
          return;
        }
        (ae(!1), Y(null));
      },
      onPointerMove: q => {
        var pe, ye, bt, Nt;
        if (!Gr.current || !Hr || ((pe = window.getSelection()) == null ? void 0 : pe.toString().length) > 0) return;
        let Nn = q.clientY - Gr.current.y,
          hr = q.clientX - Gr.current.x,
          Pt = (ye = e.swipeDirections) != null ? ye : mN(G);
        !X && (Math.abs(hr) > 1 || Math.abs(Nn) > 1) && Y(Math.abs(hr) > Math.abs(Nn) ? 'x' : 'y');
        let Pn = { x: 0, y: 0 };
        (X === 'y'
          ? (Pt.includes('top') || Pt.includes('bottom')) &&
            ((Pt.includes('top') && Nn < 0) || (Pt.includes('bottom') && Nn > 0)) &&
            (Pn.y = Nn)
          : X === 'x' &&
            (Pt.includes('left') || Pt.includes('right')) &&
            ((Pt.includes('left') && hr < 0) || (Pt.includes('right') && hr > 0)) &&
            (Pn.x = hr),
          (Math.abs(Pn.x) > 0 || Math.abs(Pn.y) > 0) && En(!0),
          (bt = pr.current) == null || bt.style.setProperty('--swipe-amount-x', `${Pn.x}px`),
          (Nt = pr.current) == null || Nt.style.setProperty('--swipe-amount-y', `${Pn.y}px`));
      },
    },
    d1 && !v.jsx
      ? D.createElement(
          'button',
          {
            'aria-label': V,
            'data-disabled': Dl,
            'data-close-button': !0,
            onClick:
              Dl || !Hr
                ? () => {}
                : () => {
                    var q;
                    (bn(), (q = v.onDismiss) == null || q.call(v, v));
                  },
            className: Tt(P == null ? void 0 : P.closeButton, (o = v == null ? void 0 : v.classNames) == null ? void 0 : o.closeButton),
          },
          (s = O == null ? void 0 : O.close) != null ? s : Jb
        )
      : null,
    v.jsx || d.isValidElement(v.title)
      ? v.jsx
        ? v.jsx
        : typeof v.title == 'function'
          ? v.title()
          : v.title
      : D.createElement(
          D.Fragment,
          null,
          pt || v.icon || v.promise
            ? D.createElement(
                'div',
                {
                  'data-icon': '',
                  className: Tt(P == null ? void 0 : P.icon, (i = v == null ? void 0 : v.classNames) == null ? void 0 : i.icon),
                },
                v.promise || (v.type === 'loading' && !v.icon) ? v.icon || m1() : null,
                v.type !== 'loading' ? v.icon || (O == null ? void 0 : O[pt]) || Kb(pt) : null
              )
            : null,
          D.createElement(
            'div',
            {
              'data-content': '',
              className: Tt(P == null ? void 0 : P.content, (a = v == null ? void 0 : v.classNames) == null ? void 0 : a.content),
            },
            D.createElement(
              'div',
              {
                'data-title': '',
                className: Tt(P == null ? void 0 : P.title, (l = v == null ? void 0 : v.classNames) == null ? void 0 : l.title),
              },
              typeof v.title == 'function' ? v.title() : v.title
            ),
            v.description
              ? D.createElement(
                  'div',
                  {
                    'data-description': '',
                    className: Tt(
                      W,
                      c1,
                      P == null ? void 0 : P.description,
                      (u = v == null ? void 0 : v.classNames) == null ? void 0 : u.description
                    ),
                  },
                  typeof v.description == 'function' ? v.description() : v.description
                )
              : null
          ),
          d.isValidElement(v.cancel)
            ? v.cancel
            : v.cancel && Ai(v.cancel)
              ? D.createElement(
                  'button',
                  {
                    'data-button': !0,
                    'data-cancel': !0,
                    style: v.cancelButtonStyle || j,
                    onClick: q => {
                      var pe, ye;
                      Ai(v.cancel) && Hr && ((ye = (pe = v.cancel).onClick) == null || ye.call(pe, q), bn());
                    },
                    className: Tt(
                      P == null ? void 0 : P.cancelButton,
                      (f = v == null ? void 0 : v.classNames) == null ? void 0 : f.cancelButton
                    ),
                  },
                  v.cancel.label
                )
              : null,
          d.isValidElement(v.action)
            ? v.action
            : v.action && Ai(v.action)
              ? D.createElement(
                  'button',
                  {
                    'data-button': !0,
                    'data-action': !0,
                    style: v.actionButtonStyle || $,
                    onClick: q => {
                      var pe, ye;
                      Ai(v.action) && ((ye = (pe = v.action).onClick) == null || ye.call(pe, q), !q.defaultPrevented && bn());
                    },
                    className: Tt(
                      P == null ? void 0 : P.actionButton,
                      (p = v == null ? void 0 : v.classNames) == null ? void 0 : p.actionButton
                    ),
                  },
                  v.action.label
                )
              : null
        )
  );
};
function ah() {
  if (typeof window > 'u' || typeof document > 'u') return 'ltr';
  let e = document.documentElement.getAttribute('dir');
  return e === 'auto' || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function gN(e, t) {
  let n = {};
  return (
    [e, t].forEach((r, o) => {
      let s = o === 1,
        i = s ? '--mobile-offset' : '--offset',
        a = s ? cN : uN;
      function l(u) {
        ['top', 'right', 'bottom', 'left'].forEach(f => {
          n[`${i}-${f}`] = typeof u == 'number' ? `${u}px` : u;
        });
      }
      typeof r == 'number' || typeof r == 'string'
        ? l(r)
        : typeof r == 'object'
          ? ['top', 'right', 'bottom', 'left'].forEach(u => {
              r[u] === void 0 ? (n[`${i}-${u}`] = a) : (n[`${i}-${u}`] = typeof r[u] == 'number' ? `${r[u]}px` : r[u]);
            })
          : l(a);
    }),
    n
  );
}
var yN = d.forwardRef(function (e, t) {
  let {
      invert: n,
      position: r = 'bottom-right',
      hotkey: o = ['altKey', 'KeyT'],
      expand: s,
      closeButton: i,
      className: a,
      offset: l,
      mobileOffset: u,
      theme: f = 'light',
      richColors: p,
      duration: m,
      style: v,
      visibleToasts: S = lN,
      toastOptions: g,
      dir: w = ah(),
      gap: x = fN,
      loadingIcon: h,
      icons: y,
      containerAriaLabel: C = 'Notifications',
      pauseWhenPageIsHidden: E,
    } = e,
    [N, b] = D.useState([]),
    k = D.useMemo(() => Array.from(new Set([r].concat(N.filter(U => U.position).map(U => U.position)))), [N, r]),
    [M, j] = D.useState([]),
    [$, A] = D.useState(!1),
    [W, I] = D.useState(!1),
    [G, z] = D.useState(
      f !== 'system'
        ? f
        : typeof window < 'u' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    ),
    H = D.useRef(null),
    T = o.join('+').replace(/Key/g, '').replace(/Digit/g, ''),
    P = D.useRef(null),
    O = D.useRef(!1),
    V = D.useCallback(U => {
      b(X => {
        var Y;
        return (((Y = X.find(de => de.id === U.id)) != null && Y.delete) || qe.dismiss(U.id), X.filter(({ id: de }) => de !== U.id));
      });
    }, []);
  return (
    D.useEffect(
      () =>
        qe.subscribe(U => {
          if (U.dismiss) {
            b(X => X.map(Y => (Y.id === U.id ? { ...Y, delete: !0 } : Y)));
            return;
          }
          setTimeout(() => {
            hg.flushSync(() => {
              b(X => {
                let Y = X.findIndex(de => de.id === U.id);
                return Y !== -1 ? [...X.slice(0, Y), { ...X[Y], ...U }, ...X.slice(Y + 1)] : [U, ...X];
              });
            });
          });
        }),
      []
    ),
    D.useEffect(() => {
      if (f !== 'system') {
        z(f);
        return;
      }
      if (
        (f === 'system' && (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? z('dark') : z('light')),
        typeof window > 'u')
      )
        return;
      let U = window.matchMedia('(prefers-color-scheme: dark)');
      try {
        U.addEventListener('change', ({ matches: X }) => {
          z(X ? 'dark' : 'light');
        });
      } catch {
        U.addListener(({ matches: Y }) => {
          try {
            z(Y ? 'dark' : 'light');
          } catch (de) {
            console.error(de);
          }
        });
      }
    }, [f]),
    D.useEffect(() => {
      N.length <= 1 && A(!1);
    }, [N]),
    D.useEffect(() => {
      let U = X => {
        var Y, de;
        (o.every(fe => X[fe] || X.code === fe) && (A(!0), (Y = H.current) == null || Y.focus()),
          X.code === 'Escape' &&
            (document.activeElement === H.current || ((de = H.current) != null && de.contains(document.activeElement))) &&
            A(!1));
      };
      return (document.addEventListener('keydown', U), () => document.removeEventListener('keydown', U));
    }, [o]),
    D.useEffect(() => {
      if (H.current)
        return () => {
          P.current && (P.current.focus({ preventScroll: !0 }), (P.current = null), (O.current = !1));
        };
    }, [H.current]),
    D.createElement(
      'section',
      {
        ref: t,
        'aria-label': `${C} ${T}`,
        tabIndex: -1,
        'aria-live': 'polite',
        'aria-relevant': 'additions text',
        'aria-atomic': 'false',
        suppressHydrationWarning: !0,
      },
      k.map((U, X) => {
        var Y;
        let [de, fe] = U.split('-');
        return N.length
          ? D.createElement(
              'ol',
              {
                key: U,
                dir: w === 'auto' ? ah() : w,
                tabIndex: -1,
                ref: H,
                className: a,
                'data-sonner-toaster': !0,
                'data-theme': G,
                'data-y-position': de,
                'data-lifted': $ && N.length > 1 && !s,
                'data-x-position': fe,
                style: {
                  '--front-toast-height': `${((Y = M[0]) == null ? void 0 : Y.height) || 0}px`,
                  '--width': `${dN}px`,
                  '--gap': `${x}px`,
                  ...v,
                  ...gN(l, u),
                },
                onBlur: L => {
                  O.current &&
                    !L.currentTarget.contains(L.relatedTarget) &&
                    ((O.current = !1), P.current && (P.current.focus({ preventScroll: !0 }), (P.current = null)));
                },
                onFocus: L => {
                  (L.target instanceof HTMLElement && L.target.dataset.dismissible === 'false') ||
                    O.current ||
                    ((O.current = !0), (P.current = L.relatedTarget));
                },
                onMouseEnter: () => A(!0),
                onMouseMove: () => A(!0),
                onMouseLeave: () => {
                  W || A(!1);
                },
                onDragEnd: () => A(!1),
                onPointerDown: L => {
                  (L.target instanceof HTMLElement && L.target.dataset.dismissible === 'false') || I(!0);
                },
                onPointerUp: () => I(!1),
              },
              N.filter(L => (!L.position && X === 0) || L.position === U).map((L, se) => {
                var ie, te;
                return D.createElement(vN, {
                  key: L.id,
                  icons: y,
                  index: se,
                  toast: L,
                  defaultRichColors: p,
                  duration: (ie = g == null ? void 0 : g.duration) != null ? ie : m,
                  className: g == null ? void 0 : g.className,
                  descriptionClassName: g == null ? void 0 : g.descriptionClassName,
                  invert: n,
                  visibleToasts: S,
                  closeButton: (te = g == null ? void 0 : g.closeButton) != null ? te : i,
                  interacting: W,
                  position: U,
                  style: g == null ? void 0 : g.style,
                  unstyled: g == null ? void 0 : g.unstyled,
                  classNames: g == null ? void 0 : g.classNames,
                  cancelButtonStyle: g == null ? void 0 : g.cancelButtonStyle,
                  actionButtonStyle: g == null ? void 0 : g.actionButtonStyle,
                  removeToast: V,
                  toasts: N.filter(ne => ne.position == L.position),
                  heights: M.filter(ne => ne.position == L.position),
                  setHeights: j,
                  expandByDefault: s,
                  gap: x,
                  loadingIcon: h,
                  expanded: $,
                  pauseWhenPageIsHidden: E,
                  swipeDirections: e.swipeDirections,
                });
              })
            )
          : null;
      })
    )
  );
});
const xN = ({ ...e }) => {
  const { theme: t = 'system' } = Hb();
  return c.jsx(yN, {
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
var wN = Zc[' useId '.trim().toString()] || (() => {}),
  SN = 0;
function Jt(e) {
  const [t, n] = d.useState(wN());
  return (
    Te(() => {
      n(r => r ?? String(SN++));
    }, [e]),
    t ? `radix-${t}` : ''
  );
}
const CN = ['top', 'right', 'bottom', 'left'],
  rr = Math.min,
  ot = Math.max,
  Ra = Math.round,
  Oi = Math.floor,
  en = e => ({ x: e, y: e }),
  EN = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
  bN = { start: 'end', end: 'start' };
function Pc(e, t, n) {
  return ot(e, rr(t, n));
}
function yn(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function xn(e) {
  return e.split('-')[0];
}
function Ho(e) {
  return e.split('-')[1];
}
function Zd(e) {
  return e === 'x' ? 'y' : 'x';
}
function Jd(e) {
  return e === 'y' ? 'height' : 'width';
}
const NN = new Set(['top', 'bottom']);
function Xt(e) {
  return NN.has(xn(e)) ? 'y' : 'x';
}
function ef(e) {
  return Zd(Xt(e));
}
function PN(e, t, n) {
  n === void 0 && (n = !1);
  const r = Ho(e),
    o = ef(e),
    s = Jd(o);
  let i = o === 'x' ? (r === (n ? 'end' : 'start') ? 'right' : 'left') : r === 'start' ? 'bottom' : 'top';
  return (t.reference[s] > t.floating[s] && (i = ja(i)), [i, ja(i)]);
}
function kN(e) {
  const t = ja(e);
  return [kc(e), t, kc(t)];
}
function kc(e) {
  return e.replace(/start|end/g, t => bN[t]);
}
const lh = ['left', 'right'],
  uh = ['right', 'left'],
  TN = ['top', 'bottom'],
  RN = ['bottom', 'top'];
function jN(e, t, n) {
  switch (e) {
    case 'top':
    case 'bottom':
      return n ? (t ? uh : lh) : t ? lh : uh;
    case 'left':
    case 'right':
      return t ? TN : RN;
    default:
      return [];
  }
}
function MN(e, t, n, r) {
  const o = Ho(e);
  let s = jN(xn(e), n === 'start', r);
  return (o && ((s = s.map(i => i + '-' + o)), t && (s = s.concat(s.map(kc)))), s);
}
function ja(e) {
  return e.replace(/left|right|bottom|top/g, t => EN[t]);
}
function _N(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function ry(e) {
  return typeof e != 'number' ? _N(e) : { top: e, right: e, bottom: e, left: e };
}
function Ma(e) {
  const { x: t, y: n, width: r, height: o } = e;
  return { width: r, height: o, top: n, left: t, right: t + r, bottom: n + o, x: t, y: n };
}
function ch(e, t, n) {
  let { reference: r, floating: o } = e;
  const s = Xt(t),
    i = ef(t),
    a = Jd(i),
    l = xn(t),
    u = s === 'y',
    f = r.x + r.width / 2 - o.width / 2,
    p = r.y + r.height / 2 - o.height / 2,
    m = r[a] / 2 - o[a] / 2;
  let v;
  switch (l) {
    case 'top':
      v = { x: f, y: r.y - o.height };
      break;
    case 'bottom':
      v = { x: f, y: r.y + r.height };
      break;
    case 'right':
      v = { x: r.x + r.width, y: p };
      break;
    case 'left':
      v = { x: r.x - o.width, y: p };
      break;
    default:
      v = { x: r.x, y: r.y };
  }
  switch (Ho(t)) {
    case 'start':
      v[i] -= m * (n && u ? -1 : 1);
      break;
    case 'end':
      v[i] += m * (n && u ? -1 : 1);
      break;
  }
  return v;
}
const IN = async (e, t, n) => {
  const { placement: r = 'bottom', strategy: o = 'absolute', middleware: s = [], platform: i } = n,
    a = s.filter(Boolean),
    l = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let u = await i.getElementRects({ reference: e, floating: t, strategy: o }),
    { x: f, y: p } = ch(u, r, l),
    m = r,
    v = {},
    S = 0;
  for (let g = 0; g < a.length; g++) {
    const { name: w, fn: x } = a[g],
      {
        x: h,
        y,
        data: C,
        reset: E,
      } = await x({
        x: f,
        y: p,
        initialPlacement: r,
        placement: m,
        strategy: o,
        middlewareData: v,
        rects: u,
        platform: i,
        elements: { reference: e, floating: t },
      });
    ((f = h ?? f),
      (p = y ?? p),
      (v = { ...v, [w]: { ...v[w], ...C } }),
      E &&
        S <= 50 &&
        (S++,
        typeof E == 'object' &&
          (E.placement && (m = E.placement),
          E.rects && (u = E.rects === !0 ? await i.getElementRects({ reference: e, floating: t, strategy: o }) : E.rects),
          ({ x: f, y: p } = ch(u, m, l))),
        (g = -1)));
  }
  return { x: f, y: p, placement: m, strategy: o, middlewareData: v };
};
async function Ws(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: o, platform: s, rects: i, elements: a, strategy: l } = e,
    {
      boundary: u = 'clippingAncestors',
      rootBoundary: f = 'viewport',
      elementContext: p = 'floating',
      altBoundary: m = !1,
      padding: v = 0,
    } = yn(t, e),
    S = ry(v),
    w = a[m ? (p === 'floating' ? 'reference' : 'floating') : p],
    x = Ma(
      await s.getClippingRect({
        element:
          (n = await (s.isElement == null ? void 0 : s.isElement(w))) == null || n
            ? w
            : w.contextElement || (await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating))),
        boundary: u,
        rootBoundary: f,
        strategy: l,
      })
    ),
    h = p === 'floating' ? { x: r, y: o, width: i.floating.width, height: i.floating.height } : i.reference,
    y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)),
    C = (await (s.isElement == null ? void 0 : s.isElement(y)))
      ? (await (s.getScale == null ? void 0 : s.getScale(y))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    E = Ma(
      s.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: a, rect: h, offsetParent: y, strategy: l })
        : h
    );
  return {
    top: (x.top - E.top + S.top) / C.y,
    bottom: (E.bottom - x.bottom + S.bottom) / C.y,
    left: (x.left - E.left + S.left) / C.x,
    right: (E.right - x.right + S.right) / C.x,
  };
}
const AN = e => ({
    name: 'arrow',
    options: e,
    async fn(t) {
      const { x: n, y: r, placement: o, rects: s, platform: i, elements: a, middlewareData: l } = t,
        { element: u, padding: f = 0 } = yn(e, t) || {};
      if (u == null) return {};
      const p = ry(f),
        m = { x: n, y: r },
        v = ef(o),
        S = Jd(v),
        g = await i.getDimensions(u),
        w = v === 'y',
        x = w ? 'top' : 'left',
        h = w ? 'bottom' : 'right',
        y = w ? 'clientHeight' : 'clientWidth',
        C = s.reference[S] + s.reference[v] - m[v] - s.floating[S],
        E = m[v] - s.reference[v],
        N = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(u));
      let b = N ? N[y] : 0;
      (!b || !(await (i.isElement == null ? void 0 : i.isElement(N)))) && (b = a.floating[y] || s.floating[S]);
      const k = C / 2 - E / 2,
        M = b / 2 - g[S] / 2 - 1,
        j = rr(p[x], M),
        $ = rr(p[h], M),
        A = j,
        W = b - g[S] - $,
        I = b / 2 - g[S] / 2 + k,
        G = Pc(A, I, W),
        z = !l.arrow && Ho(o) != null && I !== G && s.reference[S] / 2 - (I < A ? j : $) - g[S] / 2 < 0,
        H = z ? (I < A ? I - A : I - W) : 0;
      return { [v]: m[v] + H, data: { [v]: G, centerOffset: I - G - H, ...(z && { alignmentOffset: H }) }, reset: z };
    },
  }),
  ON = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn(t) {
          var n, r;
          const { placement: o, middlewareData: s, rects: i, initialPlacement: a, platform: l, elements: u } = t,
            {
              mainAxis: f = !0,
              crossAxis: p = !0,
              fallbackPlacements: m,
              fallbackStrategy: v = 'bestFit',
              fallbackAxisSideDirection: S = 'none',
              flipAlignment: g = !0,
              ...w
            } = yn(e, t);
          if ((n = s.arrow) != null && n.alignmentOffset) return {};
          const x = xn(o),
            h = Xt(a),
            y = xn(a) === a,
            C = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)),
            E = m || (y || !g ? [ja(a)] : kN(a)),
            N = S !== 'none';
          !m && N && E.push(...MN(a, g, S, C));
          const b = [a, ...E],
            k = await Ws(t, w),
            M = [];
          let j = ((r = s.flip) == null ? void 0 : r.overflows) || [];
          if ((f && M.push(k[x]), p)) {
            const I = PN(o, i, C);
            M.push(k[I[0]], k[I[1]]);
          }
          if (((j = [...j, { placement: o, overflows: M }]), !M.every(I => I <= 0))) {
            var $, A;
            const I = ((($ = s.flip) == null ? void 0 : $.index) || 0) + 1,
              G = b[I];
            if (G && (!(p === 'alignment' ? h !== Xt(G) : !1) || j.every(T => T.overflows[0] > 0 && Xt(T.placement) === h)))
              return { data: { index: I, overflows: j }, reset: { placement: G } };
            let z =
              (A = j.filter(H => H.overflows[0] <= 0).sort((H, T) => H.overflows[1] - T.overflows[1])[0]) == null ? void 0 : A.placement;
            if (!z)
              switch (v) {
                case 'bestFit': {
                  var W;
                  const H =
                    (W = j
                      .filter(T => {
                        if (N) {
                          const P = Xt(T.placement);
                          return P === h || P === 'y';
                        }
                        return !0;
                      })
                      .map(T => [T.placement, T.overflows.filter(P => P > 0).reduce((P, O) => P + O, 0)])
                      .sort((T, P) => T[1] - P[1])[0]) == null
                      ? void 0
                      : W[0];
                  H && (z = H);
                  break;
                }
                case 'initialPlacement':
                  z = a;
                  break;
              }
            if (o !== z) return { reset: { placement: z } };
          }
          return {};
        },
      }
    );
  };
function dh(e, t) {
  return { top: e.top - t.height, right: e.right - t.width, bottom: e.bottom - t.height, left: e.left - t.width };
}
function fh(e) {
  return CN.some(t => e[t] >= 0);
}
const DN = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'hide',
        options: e,
        async fn(t) {
          const { rects: n } = t,
            { strategy: r = 'referenceHidden', ...o } = yn(e, t);
          switch (r) {
            case 'referenceHidden': {
              const s = await Ws(t, { ...o, elementContext: 'reference' }),
                i = dh(s, n.reference);
              return { data: { referenceHiddenOffsets: i, referenceHidden: fh(i) } };
            }
            case 'escaped': {
              const s = await Ws(t, { ...o, altBoundary: !0 }),
                i = dh(s, n.floating);
              return { data: { escapedOffsets: i, escaped: fh(i) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  oy = new Set(['left', 'top']);
async function LN(e, t) {
  const { placement: n, platform: r, elements: o } = e,
    s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    i = xn(n),
    a = Ho(n),
    l = Xt(n) === 'y',
    u = oy.has(i) ? -1 : 1,
    f = s && l ? -1 : 1,
    p = yn(t, e);
  let {
    mainAxis: m,
    crossAxis: v,
    alignmentAxis: S,
  } = typeof p == 'number'
    ? { mainAxis: p, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: p.mainAxis || 0, crossAxis: p.crossAxis || 0, alignmentAxis: p.alignmentAxis };
  return (a && typeof S == 'number' && (v = a === 'end' ? S * -1 : S), l ? { x: v * f, y: m * u } : { x: m * u, y: v * f });
}
const FN = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(t) {
          var n, r;
          const { x: o, y: s, placement: i, middlewareData: a } = t,
            l = await LN(t, e);
          return i === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset
            ? {}
            : { x: o + l.x, y: s + l.y, data: { ...l, placement: i } };
        },
      }
    );
  },
  $N = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: o } = t,
            {
              mainAxis: s = !0,
              crossAxis: i = !1,
              limiter: a = {
                fn: w => {
                  let { x, y: h } = w;
                  return { x, y: h };
                },
              },
              ...l
            } = yn(e, t),
            u = { x: n, y: r },
            f = await Ws(t, l),
            p = Xt(xn(o)),
            m = Zd(p);
          let v = u[m],
            S = u[p];
          if (s) {
            const w = m === 'y' ? 'top' : 'left',
              x = m === 'y' ? 'bottom' : 'right',
              h = v + f[w],
              y = v - f[x];
            v = Pc(h, v, y);
          }
          if (i) {
            const w = p === 'y' ? 'top' : 'left',
              x = p === 'y' ? 'bottom' : 'right',
              h = S + f[w],
              y = S - f[x];
            S = Pc(h, S, y);
          }
          const g = a.fn({ ...t, [m]: v, [p]: S });
          return { ...g, data: { x: g.x - n, y: g.y - r, enabled: { [m]: s, [p]: i } } };
        },
      }
    );
  },
  zN = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: o, rects: s, middlewareData: i } = t,
            { offset: a = 0, mainAxis: l = !0, crossAxis: u = !0 } = yn(e, t),
            f = { x: n, y: r },
            p = Xt(o),
            m = Zd(p);
          let v = f[m],
            S = f[p];
          const g = yn(a, t),
            w = typeof g == 'number' ? { mainAxis: g, crossAxis: 0 } : { mainAxis: 0, crossAxis: 0, ...g };
          if (l) {
            const y = m === 'y' ? 'height' : 'width',
              C = s.reference[m] - s.floating[y] + w.mainAxis,
              E = s.reference[m] + s.reference[y] - w.mainAxis;
            v < C ? (v = C) : v > E && (v = E);
          }
          if (u) {
            var x, h;
            const y = m === 'y' ? 'width' : 'height',
              C = oy.has(xn(o)),
              E = s.reference[p] - s.floating[y] + ((C && ((x = i.offset) == null ? void 0 : x[p])) || 0) + (C ? 0 : w.crossAxis),
              N = s.reference[p] + s.reference[y] + (C ? 0 : ((h = i.offset) == null ? void 0 : h[p]) || 0) - (C ? w.crossAxis : 0);
            S < E ? (S = E) : S > N && (S = N);
          }
          return { [m]: v, [p]: S };
        },
      }
    );
  },
  BN = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(t) {
          var n, r;
          const { placement: o, rects: s, platform: i, elements: a } = t,
            { apply: l = () => {}, ...u } = yn(e, t),
            f = await Ws(t, u),
            p = xn(o),
            m = Ho(o),
            v = Xt(o) === 'y',
            { width: S, height: g } = s.floating;
          let w, x;
          p === 'top' || p === 'bottom'
            ? ((w = p), (x = m === ((await (i.isRTL == null ? void 0 : i.isRTL(a.floating))) ? 'start' : 'end') ? 'left' : 'right'))
            : ((x = p), (w = m === 'end' ? 'top' : 'bottom'));
          const h = g - f.top - f.bottom,
            y = S - f.left - f.right,
            C = rr(g - f[w], h),
            E = rr(S - f[x], y),
            N = !t.middlewareData.shift;
          let b = C,
            k = E;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (k = y),
            (r = t.middlewareData.shift) != null && r.enabled.y && (b = h),
            N && !m)
          ) {
            const j = ot(f.left, 0),
              $ = ot(f.right, 0),
              A = ot(f.top, 0),
              W = ot(f.bottom, 0);
            v
              ? (k = S - 2 * (j !== 0 || $ !== 0 ? j + $ : ot(f.left, f.right)))
              : (b = g - 2 * (A !== 0 || W !== 0 ? A + W : ot(f.top, f.bottom)));
          }
          await l({ ...t, availableWidth: k, availableHeight: b });
          const M = await i.getDimensions(a.floating);
          return S !== M.width || g !== M.height ? { reset: { rects: !0 } } : {};
        },
      }
    );
  };
function dl() {
  return typeof window < 'u';
}
function Ko(e) {
  return sy(e) ? (e.nodeName || '').toLowerCase() : '#document';
}
function at(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function on(e) {
  var t;
  return (t = (sy(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function sy(e) {
  return dl() ? e instanceof Node || e instanceof at(e).Node : !1;
}
function $t(e) {
  return dl() ? e instanceof Element || e instanceof at(e).Element : !1;
}
function tn(e) {
  return dl() ? e instanceof HTMLElement || e instanceof at(e).HTMLElement : !1;
}
function ph(e) {
  return !dl() || typeof ShadowRoot > 'u' ? !1 : e instanceof ShadowRoot || e instanceof at(e).ShadowRoot;
}
const UN = new Set(['inline', 'contents']);
function ai(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: o } = zt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !UN.has(o);
}
const VN = new Set(['table', 'td', 'th']);
function WN(e) {
  return VN.has(Ko(e));
}
const HN = [':popover-open', ':modal'];
function fl(e) {
  return HN.some(t => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const KN = ['transform', 'translate', 'scale', 'rotate', 'perspective'],
  GN = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'],
  QN = ['paint', 'layout', 'strict', 'content'];
function tf(e) {
  const t = nf(),
    n = $t(e) ? zt(e) : e;
  return (
    KN.some(r => (n[r] ? n[r] !== 'none' : !1)) ||
    (n.containerType ? n.containerType !== 'normal' : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== 'none' : !1)) ||
    (!t && (n.filter ? n.filter !== 'none' : !1)) ||
    GN.some(r => (n.willChange || '').includes(r)) ||
    QN.some(r => (n.contain || '').includes(r))
  );
}
function YN(e) {
  let t = or(e);
  for (; tn(t) && !Do(t); ) {
    if (tf(t)) return t;
    if (fl(t)) return null;
    t = or(t);
  }
  return null;
}
function nf() {
  return typeof CSS > 'u' || !CSS.supports ? !1 : CSS.supports('-webkit-backdrop-filter', 'none');
}
const XN = new Set(['html', 'body', '#document']);
function Do(e) {
  return XN.has(Ko(e));
}
function zt(e) {
  return at(e).getComputedStyle(e);
}
function pl(e) {
  return $t(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function or(e) {
  if (Ko(e) === 'html') return e;
  const t = e.assignedSlot || e.parentNode || (ph(e) && e.host) || on(e);
  return ph(t) ? t.host : t;
}
function iy(e) {
  const t = or(e);
  return Do(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : tn(t) && ai(t) ? t : iy(t);
}
function Hs(e, t, n) {
  var r;
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  const o = iy(e),
    s = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    i = at(o);
  if (s) {
    const a = Tc(i);
    return t.concat(i, i.visualViewport || [], ai(o) ? o : [], a && n ? Hs(a) : []);
  }
  return t.concat(o, Hs(o, [], n));
}
function Tc(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ay(e) {
  const t = zt(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const o = tn(e),
    s = o ? e.offsetWidth : n,
    i = o ? e.offsetHeight : r,
    a = Ra(n) !== s || Ra(r) !== i;
  return (a && ((n = s), (r = i)), { width: n, height: r, $: a });
}
function rf(e) {
  return $t(e) ? e : e.contextElement;
}
function yo(e) {
  const t = rf(e);
  if (!tn(t)) return en(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: o, $: s } = ay(t);
  let i = (s ? Ra(n.width) : n.width) / r,
    a = (s ? Ra(n.height) : n.height) / o;
  return ((!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), { x: i, y: a });
}
const qN = en(0);
function ly(e) {
  const t = at(e);
  return !nf() || !t.visualViewport ? qN : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function ZN(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== at(e)) ? !1 : t);
}
function Ar(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  const o = e.getBoundingClientRect(),
    s = rf(e);
  let i = en(1);
  t && (r ? $t(r) && (i = yo(r)) : (i = yo(e)));
  const a = ZN(s, n, r) ? ly(s) : en(0);
  let l = (o.left + a.x) / i.x,
    u = (o.top + a.y) / i.y,
    f = o.width / i.x,
    p = o.height / i.y;
  if (s) {
    const m = at(s),
      v = r && $t(r) ? at(r) : r;
    let S = m,
      g = Tc(S);
    for (; g && r && v !== S; ) {
      const w = yo(g),
        x = g.getBoundingClientRect(),
        h = zt(g),
        y = x.left + (g.clientLeft + parseFloat(h.paddingLeft)) * w.x,
        C = x.top + (g.clientTop + parseFloat(h.paddingTop)) * w.y;
      ((l *= w.x), (u *= w.y), (f *= w.x), (p *= w.y), (l += y), (u += C), (S = at(g)), (g = Tc(S)));
    }
  }
  return Ma({ width: f, height: p, x: l, y: u });
}
function of(e, t) {
  const n = pl(e).scrollLeft;
  return t ? t.left + n : Ar(on(e)).left + n;
}
function uy(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(),
    o = r.left + t.scrollLeft - (n ? 0 : of(e, r)),
    s = r.top + t.scrollTop;
  return { x: o, y: s };
}
function JN(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
  const s = o === 'fixed',
    i = on(r),
    a = t ? fl(t.floating) : !1;
  if (r === i || (a && s)) return n;
  let l = { scrollLeft: 0, scrollTop: 0 },
    u = en(1);
  const f = en(0),
    p = tn(r);
  if ((p || (!p && !s)) && ((Ko(r) !== 'body' || ai(i)) && (l = pl(r)), tn(r))) {
    const v = Ar(r);
    ((u = yo(r)), (f.x = v.x + r.clientLeft), (f.y = v.y + r.clientTop));
  }
  const m = i && !p && !s ? uy(i, l, !0) : en(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + f.x + m.x,
    y: n.y * u.y - l.scrollTop * u.y + f.y + m.y,
  };
}
function e2(e) {
  return Array.from(e.getClientRects());
}
function t2(e) {
  const t = on(e),
    n = pl(e),
    r = e.ownerDocument.body,
    o = ot(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    s = ot(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + of(e);
  const a = -n.scrollTop;
  return (zt(r).direction === 'rtl' && (i += ot(t.clientWidth, r.clientWidth) - o), { width: o, height: s, x: i, y: a });
}
function n2(e, t) {
  const n = at(e),
    r = on(e),
    o = n.visualViewport;
  let s = r.clientWidth,
    i = r.clientHeight,
    a = 0,
    l = 0;
  if (o) {
    ((s = o.width), (i = o.height));
    const u = nf();
    (!u || (u && t === 'fixed')) && ((a = o.offsetLeft), (l = o.offsetTop));
  }
  return { width: s, height: i, x: a, y: l };
}
const r2 = new Set(['absolute', 'fixed']);
function o2(e, t) {
  const n = Ar(e, !0, t === 'fixed'),
    r = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    s = tn(e) ? yo(e) : en(1),
    i = e.clientWidth * s.x,
    a = e.clientHeight * s.y,
    l = o * s.x,
    u = r * s.y;
  return { width: i, height: a, x: l, y: u };
}
function hh(e, t, n) {
  let r;
  if (t === 'viewport') r = n2(e, n);
  else if (t === 'document') r = t2(on(e));
  else if ($t(t)) r = o2(t, n);
  else {
    const o = ly(e);
    r = { x: t.x - o.x, y: t.y - o.y, width: t.width, height: t.height };
  }
  return Ma(r);
}
function cy(e, t) {
  const n = or(e);
  return n === t || !$t(n) || Do(n) ? !1 : zt(n).position === 'fixed' || cy(n, t);
}
function s2(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Hs(e, [], !1).filter(a => $t(a) && Ko(a) !== 'body'),
    o = null;
  const s = zt(e).position === 'fixed';
  let i = s ? or(e) : e;
  for (; $t(i) && !Do(i); ) {
    const a = zt(i),
      l = tf(i);
    (!l && a.position === 'fixed' && (o = null),
      (s ? !l && !o : (!l && a.position === 'static' && !!o && r2.has(o.position)) || (ai(i) && !l && cy(e, i)))
        ? (r = r.filter(f => f !== i))
        : (o = a),
      (i = or(i)));
  }
  return (t.set(e, r), r);
}
function i2(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
  const i = [...(n === 'clippingAncestors' ? (fl(t) ? [] : s2(t, this._c)) : [].concat(n)), r],
    a = i[0],
    l = i.reduce(
      (u, f) => {
        const p = hh(t, f, o);
        return (
          (u.top = ot(p.top, u.top)),
          (u.right = rr(p.right, u.right)),
          (u.bottom = rr(p.bottom, u.bottom)),
          (u.left = ot(p.left, u.left)),
          u
        );
      },
      hh(t, a, o)
    );
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}
function a2(e) {
  const { width: t, height: n } = ay(e);
  return { width: t, height: n };
}
function l2(e, t, n) {
  const r = tn(t),
    o = on(t),
    s = n === 'fixed',
    i = Ar(e, !0, s, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const l = en(0);
  function u() {
    l.x = of(o);
  }
  if (r || (!r && !s))
    if (((Ko(t) !== 'body' || ai(o)) && (a = pl(t)), r)) {
      const v = Ar(t, !0, s, t);
      ((l.x = v.x + t.clientLeft), (l.y = v.y + t.clientTop));
    } else o && u();
  s && !r && o && u();
  const f = o && !r && !s ? uy(o, a) : en(0),
    p = i.left + a.scrollLeft - l.x - f.x,
    m = i.top + a.scrollTop - l.y - f.y;
  return { x: p, y: m, width: i.width, height: i.height };
}
function hu(e) {
  return zt(e).position === 'static';
}
function mh(e, t) {
  if (!tn(e) || zt(e).position === 'fixed') return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (on(e) === n && (n = n.ownerDocument.body), n);
}
function dy(e, t) {
  const n = at(e);
  if (fl(e)) return n;
  if (!tn(e)) {
    let o = or(e);
    for (; o && !Do(o); ) {
      if ($t(o) && !hu(o)) return o;
      o = or(o);
    }
    return n;
  }
  let r = mh(e, t);
  for (; r && WN(r) && hu(r); ) r = mh(r, t);
  return r && Do(r) && hu(r) && !tf(r) ? n : r || YN(e) || n;
}
const u2 = async function (e) {
  const t = this.getOffsetParent || dy,
    n = this.getDimensions,
    r = await n(e.floating);
  return { reference: l2(e.reference, await t(e.floating), e.strategy), floating: { x: 0, y: 0, width: r.width, height: r.height } };
};
function c2(e) {
  return zt(e).direction === 'rtl';
}
const d2 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: JN,
  getDocumentElement: on,
  getClippingRect: i2,
  getOffsetParent: dy,
  getElementRects: u2,
  getClientRects: e2,
  getDimensions: a2,
  getScale: yo,
  isElement: $t,
  isRTL: c2,
};
function fy(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function f2(e, t) {
  let n = null,
    r;
  const o = on(e);
  function s() {
    var a;
    (clearTimeout(r), (a = n) == null || a.disconnect(), (n = null));
  }
  function i(a, l) {
    (a === void 0 && (a = !1), l === void 0 && (l = 1), s());
    const u = e.getBoundingClientRect(),
      { left: f, top: p, width: m, height: v } = u;
    if ((a || t(), !m || !v)) return;
    const S = Oi(p),
      g = Oi(o.clientWidth - (f + m)),
      w = Oi(o.clientHeight - (p + v)),
      x = Oi(f),
      y = { rootMargin: -S + 'px ' + -g + 'px ' + -w + 'px ' + -x + 'px', threshold: ot(0, rr(1, l)) || 1 };
    let C = !0;
    function E(N) {
      const b = N[0].intersectionRatio;
      if (b !== l) {
        if (!C) return i();
        b
          ? i(!1, b)
          : (r = setTimeout(() => {
              i(!1, 1e-7);
            }, 1e3));
      }
      (b === 1 && !fy(u, e.getBoundingClientRect()) && i(), (C = !1));
    }
    try {
      n = new IntersectionObserver(E, { ...y, root: o.ownerDocument });
    } catch {
      n = new IntersectionObserver(E, y);
    }
    n.observe(e);
  }
  return (i(!0), s);
}
function p2(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: s = !0,
      elementResize: i = typeof ResizeObserver == 'function',
      layoutShift: a = typeof IntersectionObserver == 'function',
      animationFrame: l = !1,
    } = r,
    u = rf(e),
    f = o || s ? [...(u ? Hs(u) : []), ...Hs(t)] : [];
  f.forEach(x => {
    (o && x.addEventListener('scroll', n, { passive: !0 }), s && x.addEventListener('resize', n));
  });
  const p = u && a ? f2(u, n) : null;
  let m = -1,
    v = null;
  i &&
    ((v = new ResizeObserver(x => {
      let [h] = x;
      (h &&
        h.target === u &&
        v &&
        (v.unobserve(t),
        cancelAnimationFrame(m),
        (m = requestAnimationFrame(() => {
          var y;
          (y = v) == null || y.observe(t);
        }))),
        n());
    })),
    u && !l && v.observe(u),
    v.observe(t));
  let S,
    g = l ? Ar(e) : null;
  l && w();
  function w() {
    const x = Ar(e);
    (g && !fy(g, x) && n(), (g = x), (S = requestAnimationFrame(w)));
  }
  return (
    n(),
    () => {
      var x;
      (f.forEach(h => {
        (o && h.removeEventListener('scroll', n), s && h.removeEventListener('resize', n));
      }),
        p == null || p(),
        (x = v) == null || x.disconnect(),
        (v = null),
        l && cancelAnimationFrame(S));
    }
  );
}
const h2 = FN,
  m2 = $N,
  v2 = ON,
  g2 = BN,
  y2 = DN,
  vh = AN,
  x2 = zN,
  w2 = (e, t, n) => {
    const r = new Map(),
      o = { platform: d2, ...n },
      s = { ...o.platform, _c: r };
    return IN(e, t, { ...o, platform: s });
  };
var S2 = typeof document < 'u',
  C2 = function () {},
  ta = S2 ? d.useLayoutEffect : C2;
function _a(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == 'function' && e.toString() === t.toString()) return !0;
  let n, r, o;
  if (e && t && typeof e == 'object') {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!_a(e[r], t[r])) return !1;
      return !0;
    }
    if (((o = Object.keys(e)), (n = o.length), n !== Object.keys(t).length)) return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, o[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === '_owner' && e.$$typeof) && !_a(e[s], t[s])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function py(e) {
  return typeof window > 'u' ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function gh(e, t) {
  const n = py(e);
  return Math.round(t * n) / n;
}
function mu(e) {
  const t = d.useRef(e);
  return (
    ta(() => {
      t.current = e;
    }),
    t
  );
}
function E2(e) {
  e === void 0 && (e = {});
  const {
      placement: t = 'bottom',
      strategy: n = 'absolute',
      middleware: r = [],
      platform: o,
      elements: { reference: s, floating: i } = {},
      transform: a = !0,
      whileElementsMounted: l,
      open: u,
    } = e,
    [f, p] = d.useState({ x: 0, y: 0, strategy: n, placement: t, middlewareData: {}, isPositioned: !1 }),
    [m, v] = d.useState(r);
  _a(m, r) || v(r);
  const [S, g] = d.useState(null),
    [w, x] = d.useState(null),
    h = d.useCallback(T => {
      T !== N.current && ((N.current = T), g(T));
    }, []),
    y = d.useCallback(T => {
      T !== b.current && ((b.current = T), x(T));
    }, []),
    C = s || S,
    E = i || w,
    N = d.useRef(null),
    b = d.useRef(null),
    k = d.useRef(f),
    M = l != null,
    j = mu(l),
    $ = mu(o),
    A = mu(u),
    W = d.useCallback(() => {
      if (!N.current || !b.current) return;
      const T = { placement: t, strategy: n, middleware: m };
      ($.current && (T.platform = $.current),
        w2(N.current, b.current, T).then(P => {
          const O = { ...P, isPositioned: A.current !== !1 };
          I.current &&
            !_a(k.current, O) &&
            ((k.current = O),
            zr.flushSync(() => {
              p(O);
            }));
        }));
    }, [m, t, n, $, A]);
  ta(() => {
    u === !1 && k.current.isPositioned && ((k.current.isPositioned = !1), p(T => ({ ...T, isPositioned: !1 })));
  }, [u]);
  const I = d.useRef(!1);
  (ta(
    () => (
      (I.current = !0),
      () => {
        I.current = !1;
      }
    ),
    []
  ),
    ta(() => {
      if ((C && (N.current = C), E && (b.current = E), C && E)) {
        if (j.current) return j.current(C, E, W);
        W();
      }
    }, [C, E, W, j, M]));
  const G = d.useMemo(() => ({ reference: N, floating: b, setReference: h, setFloating: y }), [h, y]),
    z = d.useMemo(() => ({ reference: C, floating: E }), [C, E]),
    H = d.useMemo(() => {
      const T = { position: n, left: 0, top: 0 };
      if (!z.floating) return T;
      const P = gh(z.floating, f.x),
        O = gh(z.floating, f.y);
      return a
        ? { ...T, transform: 'translate(' + P + 'px, ' + O + 'px)', ...(py(z.floating) >= 1.5 && { willChange: 'transform' }) }
        : { position: n, left: P, top: O };
    }, [n, a, z.floating, f.x, f.y]);
  return d.useMemo(() => ({ ...f, update: W, refs: G, elements: z, floatingStyles: H }), [f, W, G, z, H]);
}
const b2 = e => {
    function t(n) {
      return {}.hasOwnProperty.call(n, 'current');
    }
    return {
      name: 'arrow',
      options: e,
      fn(n) {
        const { element: r, padding: o } = typeof e == 'function' ? e(n) : e;
        return r && t(r)
          ? r.current != null
            ? vh({ element: r.current, padding: o }).fn(n)
            : {}
          : r
            ? vh({ element: r, padding: o }).fn(n)
            : {};
      },
    };
  },
  N2 = (e, t) => ({ ...h2(e), options: [e, t] }),
  P2 = (e, t) => ({ ...m2(e), options: [e, t] }),
  k2 = (e, t) => ({ ...x2(e), options: [e, t] }),
  T2 = (e, t) => ({ ...v2(e), options: [e, t] }),
  R2 = (e, t) => ({ ...g2(e), options: [e, t] }),
  j2 = (e, t) => ({ ...y2(e), options: [e, t] }),
  M2 = (e, t) => ({ ...b2(e), options: [e, t] });
var _2 = 'Arrow',
  hy = d.forwardRef((e, t) => {
    const { children: n, width: r = 10, height: o = 5, ...s } = e;
    return c.jsx(K.svg, {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: '0 0 30 10',
      preserveAspectRatio: 'none',
      children: e.asChild ? n : c.jsx('polygon', { points: '0,0 30,0 15,10' }),
    });
  });
hy.displayName = _2;
var I2 = hy;
function my(e) {
  const [t, n] = d.useState(void 0);
  return (
    Te(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver(o => {
          if (!Array.isArray(o) || !o.length) return;
          const s = o[0];
          let i, a;
          if ('borderBoxSize' in s) {
            const l = s.borderBoxSize,
              u = Array.isArray(l) ? l[0] : l;
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
var sf = 'Popper',
  [vy, Go] = dt(sf),
  [A2, gy] = vy(sf),
  yy = e => {
    const { __scopePopper: t, children: n } = e,
      [r, o] = d.useState(null);
    return c.jsx(A2, { scope: t, anchor: r, onAnchorChange: o, children: n });
  };
yy.displayName = sf;
var xy = 'PopperAnchor',
  wy = d.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e,
      s = gy(xy, n),
      i = d.useRef(null),
      a = oe(t, i);
    return (
      d.useEffect(() => {
        s.onAnchorChange((r == null ? void 0 : r.current) || i.current);
      }),
      r ? null : c.jsx(K.div, { ...o, ref: a })
    );
  });
wy.displayName = xy;
var af = 'PopperContent',
  [O2, D2] = vy(af),
  Sy = d.forwardRef((e, t) => {
    var L, se, ie, te, ne, ae;
    const {
        __scopePopper: n,
        side: r = 'bottom',
        sideOffset: o = 0,
        align: s = 'center',
        alignOffset: i = 0,
        arrowPadding: a = 0,
        avoidCollisions: l = !0,
        collisionBoundary: u = [],
        collisionPadding: f = 0,
        sticky: p = 'partial',
        hideWhenDetached: m = !1,
        updatePositionStrategy: v = 'optimized',
        onPlaced: S,
        ...g
      } = e,
      w = gy(af, n),
      [x, h] = d.useState(null),
      y = oe(t, De => h(De)),
      [C, E] = d.useState(null),
      N = my(C),
      b = (N == null ? void 0 : N.width) ?? 0,
      k = (N == null ? void 0 : N.height) ?? 0,
      M = r + (s !== 'center' ? '-' + s : ''),
      j = typeof f == 'number' ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f },
      $ = Array.isArray(u) ? u : [u],
      A = $.length > 0,
      W = { padding: j, boundary: $.filter(F2), altBoundary: A },
      {
        refs: I,
        floatingStyles: G,
        placement: z,
        isPositioned: H,
        middlewareData: T,
      } = E2({
        strategy: 'fixed',
        placement: M,
        whileElementsMounted: (...De) => p2(...De, { animationFrame: v === 'always' }),
        elements: { reference: w.anchor },
        middleware: [
          N2({ mainAxis: o + k, alignmentAxis: i }),
          l && P2({ mainAxis: !0, crossAxis: !1, limiter: p === 'partial' ? k2() : void 0, ...W }),
          l && T2({ ...W }),
          R2({
            ...W,
            apply: ({ elements: De, rects: ft, availableWidth: dr, availableHeight: En }) => {
              const { width: fr, height: qo } = ft.reference,
                Wr = De.floating.style;
              (Wr.setProperty('--radix-popper-available-width', `${dr}px`),
                Wr.setProperty('--radix-popper-available-height', `${En}px`),
                Wr.setProperty('--radix-popper-anchor-width', `${fr}px`),
                Wr.setProperty('--radix-popper-anchor-height', `${qo}px`));
            },
          }),
          C && M2({ element: C, padding: a }),
          $2({ arrowWidth: b, arrowHeight: k }),
          m && j2({ strategy: 'referenceHidden', ...W }),
        ],
      }),
      [P, O] = by(z),
      V = Ge(S);
    Te(() => {
      H && (V == null || V());
    }, [H, V]);
    const U = (L = T.arrow) == null ? void 0 : L.x,
      X = (se = T.arrow) == null ? void 0 : se.y,
      Y = ((ie = T.arrow) == null ? void 0 : ie.centerOffset) !== 0,
      [de, fe] = d.useState();
    return (
      Te(() => {
        x && fe(window.getComputedStyle(x).zIndex);
      }, [x]),
      c.jsx('div', {
        ref: I.setFloating,
        'data-radix-popper-content-wrapper': '',
        style: {
          ...G,
          transform: H ? G.transform : 'translate(0, -200%)',
          minWidth: 'max-content',
          zIndex: de,
          '--radix-popper-transform-origin': [
            (te = T.transformOrigin) == null ? void 0 : te.x,
            (ne = T.transformOrigin) == null ? void 0 : ne.y,
          ].join(' '),
          ...(((ae = T.hide) == null ? void 0 : ae.referenceHidden) && { visibility: 'hidden', pointerEvents: 'none' }),
        },
        dir: e.dir,
        children: c.jsx(O2, {
          scope: n,
          placedSide: P,
          onArrowChange: E,
          arrowX: U,
          arrowY: X,
          shouldHideArrow: Y,
          children: c.jsx(K.div, { 'data-side': P, 'data-align': O, ...g, ref: y, style: { ...g.style, animation: H ? void 0 : 'none' } }),
        }),
      })
    );
  });
Sy.displayName = af;
var Cy = 'PopperArrow',
  L2 = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
  Ey = d.forwardRef(function (t, n) {
    const { __scopePopper: r, ...o } = t,
      s = D2(Cy, r),
      i = L2[s.placedSide];
    return c.jsx('span', {
      ref: s.onArrowChange,
      style: {
        position: 'absolute',
        left: s.arrowX,
        top: s.arrowY,
        [i]: 0,
        transformOrigin: { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[s.placedSide],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: 'rotate(180deg)',
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[s.placedSide],
        visibility: s.shouldHideArrow ? 'hidden' : void 0,
      },
      children: c.jsx(I2, { ...o, ref: n, style: { ...o.style, display: 'block' } }),
    });
  });
Ey.displayName = Cy;
function F2(e) {
  return e !== null;
}
var $2 = e => ({
  name: 'transformOrigin',
  options: e,
  fn(t) {
    var w, x, h;
    const { placement: n, rects: r, middlewareData: o } = t,
      i = ((w = o.arrow) == null ? void 0 : w.centerOffset) !== 0,
      a = i ? 0 : e.arrowWidth,
      l = i ? 0 : e.arrowHeight,
      [u, f] = by(n),
      p = { start: '0%', center: '50%', end: '100%' }[f],
      m = (((x = o.arrow) == null ? void 0 : x.x) ?? 0) + a / 2,
      v = (((h = o.arrow) == null ? void 0 : h.y) ?? 0) + l / 2;
    let S = '',
      g = '';
    return (
      u === 'bottom'
        ? ((S = i ? p : `${m}px`), (g = `${-l}px`))
        : u === 'top'
          ? ((S = i ? p : `${m}px`), (g = `${r.floating.height + l}px`))
          : u === 'right'
            ? ((S = `${-l}px`), (g = i ? p : `${v}px`))
            : u === 'left' && ((S = `${r.floating.width + l}px`), (g = i ? p : `${v}px`)),
      { data: { x: S, y: g } }
    );
  },
});
function by(e) {
  const [t, n = 'center'] = e.split('-');
  return [t, n];
}
var Ny = yy,
  lf = wy,
  uf = Sy,
  cf = Ey,
  [hl, BM] = dt('Tooltip', [Go]),
  df = Go(),
  Py = 'TooltipProvider',
  z2 = 700,
  yh = 'tooltip.open',
  [B2, ky] = hl(Py),
  Ty = e => {
    const { __scopeTooltip: t, delayDuration: n = z2, skipDelayDuration: r = 300, disableHoverableContent: o = !1, children: s } = e,
      i = d.useRef(!0),
      a = d.useRef(!1),
      l = d.useRef(0);
    return (
      d.useEffect(() => {
        const u = l.current;
        return () => window.clearTimeout(u);
      }, []),
      c.jsx(B2, {
        scope: t,
        isOpenDelayedRef: i,
        delayDuration: n,
        onOpen: d.useCallback(() => {
          (window.clearTimeout(l.current), (i.current = !1));
        }, []),
        onClose: d.useCallback(() => {
          (window.clearTimeout(l.current), (l.current = window.setTimeout(() => (i.current = !0), r)));
        }, [r]),
        isPointerInTransitRef: a,
        onPointerInTransitChange: d.useCallback(u => {
          a.current = u;
        }, []),
        disableHoverableContent: o,
        children: s,
      })
    );
  };
Ty.displayName = Py;
var Ry = 'Tooltip',
  [UM, ml] = hl(Ry),
  Rc = 'TooltipTrigger',
  U2 = d.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      o = ml(Rc, n),
      s = ky(Rc, n),
      i = df(n),
      a = d.useRef(null),
      l = oe(t, a, o.onTriggerChange),
      u = d.useRef(!1),
      f = d.useRef(!1),
      p = d.useCallback(() => (u.current = !1), []);
    return (
      d.useEffect(() => () => document.removeEventListener('pointerup', p), [p]),
      c.jsx(lf, {
        asChild: !0,
        ...i,
        children: c.jsx(K.button, {
          'aria-describedby': o.open ? o.contentId : void 0,
          'data-state': o.stateAttribute,
          ...r,
          ref: l,
          onPointerMove: F(e.onPointerMove, m => {
            m.pointerType !== 'touch' && !f.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), (f.current = !0));
          }),
          onPointerLeave: F(e.onPointerLeave, () => {
            (o.onTriggerLeave(), (f.current = !1));
          }),
          onPointerDown: F(e.onPointerDown, () => {
            (o.open && o.onClose(), (u.current = !0), document.addEventListener('pointerup', p, { once: !0 }));
          }),
          onFocus: F(e.onFocus, () => {
            u.current || o.onOpen();
          }),
          onBlur: F(e.onBlur, o.onClose),
          onClick: F(e.onClick, o.onClose),
        }),
      })
    );
  });
U2.displayName = Rc;
var V2 = 'TooltipPortal',
  [VM, W2] = hl(V2, { forceMount: void 0 }),
  Lo = 'TooltipContent',
  jy = d.forwardRef((e, t) => {
    const n = W2(Lo, e.__scopeTooltip),
      { forceMount: r = n.forceMount, side: o = 'top', ...s } = e,
      i = ml(Lo, e.__scopeTooltip);
    return c.jsx(Bt, {
      present: r || i.open,
      children: i.disableHoverableContent ? c.jsx(My, { side: o, ...s, ref: t }) : c.jsx(H2, { side: o, ...s, ref: t }),
    });
  }),
  H2 = d.forwardRef((e, t) => {
    const n = ml(Lo, e.__scopeTooltip),
      r = ky(Lo, e.__scopeTooltip),
      o = d.useRef(null),
      s = oe(t, o),
      [i, a] = d.useState(null),
      { trigger: l, onClose: u } = n,
      f = o.current,
      { onPointerInTransitChange: p } = r,
      m = d.useCallback(() => {
        (a(null), p(!1));
      }, [p]),
      v = d.useCallback(
        (S, g) => {
          const w = S.currentTarget,
            x = { x: S.clientX, y: S.clientY },
            h = X2(x, w.getBoundingClientRect()),
            y = q2(x, h),
            C = Z2(g.getBoundingClientRect()),
            E = eP([...y, ...C]);
          (a(E), p(!0));
        },
        [p]
      );
    return (
      d.useEffect(() => () => m(), [m]),
      d.useEffect(() => {
        if (l && f) {
          const S = w => v(w, f),
            g = w => v(w, l);
          return (
            l.addEventListener('pointerleave', S),
            f.addEventListener('pointerleave', g),
            () => {
              (l.removeEventListener('pointerleave', S), f.removeEventListener('pointerleave', g));
            }
          );
        }
      }, [l, f, v, m]),
      d.useEffect(() => {
        if (i) {
          const S = g => {
            const w = g.target,
              x = { x: g.clientX, y: g.clientY },
              h = (l == null ? void 0 : l.contains(w)) || (f == null ? void 0 : f.contains(w)),
              y = !J2(x, i);
            h ? m() : y && (m(), u());
          };
          return (document.addEventListener('pointermove', S), () => document.removeEventListener('pointermove', S));
        }
      }, [l, f, i, u, m]),
      c.jsx(My, { ...e, ref: s })
    );
  }),
  [K2, G2] = hl(Ry, { isInside: !1 }),
  Q2 = ZC('TooltipContent'),
  My = d.forwardRef((e, t) => {
    const { __scopeTooltip: n, children: r, 'aria-label': o, onEscapeKeyDown: s, onPointerDownOutside: i, ...a } = e,
      l = ml(Lo, n),
      u = df(n),
      { onClose: f } = l;
    return (
      d.useEffect(() => (document.addEventListener(yh, f), () => document.removeEventListener(yh, f)), [f]),
      d.useEffect(() => {
        if (l.trigger) {
          const p = m => {
            const v = m.target;
            v != null && v.contains(l.trigger) && f();
          };
          return (window.addEventListener('scroll', p, { capture: !0 }), () => window.removeEventListener('scroll', p, { capture: !0 }));
        }
      }, [l.trigger, f]),
      c.jsx(Vo, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: p => p.preventDefault(),
        onDismiss: f,
        children: c.jsxs(uf, {
          'data-state': l.stateAttribute,
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
            c.jsx(Q2, { children: r }),
            c.jsx(K2, { scope: n, isInside: !0, children: c.jsx(wE, { id: l.contentId, role: 'tooltip', children: o || r }) }),
          ],
        }),
      })
    );
  });
jy.displayName = Lo;
var _y = 'TooltipArrow',
  Y2 = d.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      o = df(n);
    return G2(_y, n).isInside ? null : c.jsx(cf, { ...o, ...r, ref: t });
  });
Y2.displayName = _y;
function X2(e, t) {
  const n = Math.abs(t.top - e.y),
    r = Math.abs(t.bottom - e.y),
    o = Math.abs(t.right - e.x),
    s = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, s)) {
    case s:
      return 'left';
    case o:
      return 'right';
    case n:
      return 'top';
    case r:
      return 'bottom';
    default:
      throw new Error('unreachable');
  }
}
function q2(e, t, n = 5) {
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
function Z2(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r },
  ];
}
function J2(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s],
      l = t[i],
      u = a.x,
      f = a.y,
      p = l.x,
      m = l.y;
    f > r != m > r && n < ((p - u) * (r - f)) / (m - f) + u && (o = !o);
  }
  return o;
}
function eP(e) {
  const t = e.slice();
  return (t.sort((n, r) => (n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0)), tP(t));
}
function tP(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1],
        i = t[t.length - 2];
      if ((s.x - i.x) * (o.y - i.y) >= (s.y - i.y) * (o.x - i.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const s = n[n.length - 1],
        i = n[n.length - 2];
      if ((s.x - i.x) * (o.y - i.y) >= (s.y - i.y) * (o.x - i.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return (n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n));
}
var nP = Ty,
  Iy = jy;
const rP = nP,
  oP = d.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
    c.jsx(Iy, {
      ref: r,
      sideOffset: t,
      className: Q(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        e
      ),
      ...n,
    })
  );
oP.displayName = Iy.displayName;
var vl = class {
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
  gl = typeof window > 'u' || 'Deno' in globalThis;
function Mt() {}
function sP(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function iP(e) {
  return typeof e == 'number' && e >= 0 && e !== 1 / 0;
}
function aP(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function jc(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function lP(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function xh(e, t) {
  const { type: n = 'all', exact: r, fetchStatus: o, predicate: s, queryKey: i, stale: a } = e;
  if (i) {
    if (r) {
      if (t.queryHash !== ff(i, t.options)) return !1;
    } else if (!Gs(t.queryKey, i)) return !1;
  }
  if (n !== 'all') {
    const l = t.isActive();
    if ((n === 'active' && !l) || (n === 'inactive' && l)) return !1;
  }
  return !((typeof a == 'boolean' && t.isStale() !== a) || (o && o !== t.state.fetchStatus) || (s && !s(t)));
}
function wh(e, t) {
  const { exact: n, status: r, predicate: o, mutationKey: s } = e;
  if (s) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (Ks(t.options.mutationKey) !== Ks(s)) return !1;
    } else if (!Gs(t.options.mutationKey, s)) return !1;
  }
  return !((r && t.state.status !== r) || (o && !o(t)));
}
function ff(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || Ks)(e);
}
function Ks(e) {
  return JSON.stringify(e, (t, n) =>
    Mc(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, o) => ((r[o] = n[o]), r), {})
      : n
  );
}
function Gs(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == 'object' && typeof t == 'object'
        ? Object.keys(t).every(n => Gs(e[n], t[n]))
        : !1;
}
function Ay(e, t) {
  if (e === t) return e;
  const n = Sh(e) && Sh(t);
  if (n || (Mc(e) && Mc(t))) {
    const r = n ? e : Object.keys(e),
      o = r.length,
      s = n ? t : Object.keys(t),
      i = s.length,
      a = n ? [] : {},
      l = new Set(r);
    let u = 0;
    for (let f = 0; f < i; f++) {
      const p = n ? f : s[f];
      ((!n && l.has(p)) || n) && e[p] === void 0 && t[p] === void 0
        ? ((a[p] = void 0), u++)
        : ((a[p] = Ay(e[p], t[p])), a[p] === e[p] && e[p] !== void 0 && u++);
    }
    return o === i && u === o ? e : a;
  }
  return t;
}
function Sh(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Mc(e) {
  if (!Ch(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const n = t.prototype;
  return !(!Ch(n) || !n.hasOwnProperty('isPrototypeOf') || Object.getPrototypeOf(e) !== Object.prototype);
}
function Ch(e) {
  return Object.prototype.toString.call(e) === '[object Object]';
}
function uP(e) {
  return new Promise(t => {
    setTimeout(t, e);
  });
}
function cP(e, t, n) {
  return typeof n.structuralSharing == 'function' ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? Ay(e, t) : t;
}
function dP(e, t, n = 0) {
  const r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function fP(e, t, n = 0) {
  const r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var pf = Symbol();
function Oy(e, t) {
  return !e.queryFn && t != null && t.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === pf
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
var wr,
  Ln,
  So,
  Gh,
  pP =
    ((Gh = class extends vl {
      constructor() {
        super();
        le(this, wr);
        le(this, Ln);
        le(this, So);
        Z(this, So, t => {
          if (!gl && window.addEventListener) {
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
        R(this, Ln) || this.setEventListener(R(this, So));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = R(this, Ln)) == null || t.call(this), Z(this, Ln, void 0));
      }
      setEventListener(t) {
        var n;
        (Z(this, So, t),
          (n = R(this, Ln)) == null || n.call(this),
          Z(
            this,
            Ln,
            t(r => {
              typeof r == 'boolean' ? this.setFocused(r) : this.onFocus();
            })
          ));
      }
      setFocused(t) {
        R(this, wr) !== t && (Z(this, wr, t), this.onFocus());
      }
      onFocus() {
        const t = this.isFocused();
        this.listeners.forEach(n => {
          n(t);
        });
      }
      isFocused() {
        var t;
        return typeof R(this, wr) == 'boolean'
          ? R(this, wr)
          : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== 'hidden';
      }
    }),
    (wr = new WeakMap()),
    (Ln = new WeakMap()),
    (So = new WeakMap()),
    Gh),
  Dy = new pP(),
  Co,
  Fn,
  Eo,
  Qh,
  hP =
    ((Qh = class extends vl {
      constructor() {
        super();
        le(this, Co, !0);
        le(this, Fn);
        le(this, Eo);
        Z(this, Eo, t => {
          if (!gl && window.addEventListener) {
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
        R(this, Fn) || this.setEventListener(R(this, Eo));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = R(this, Fn)) == null || t.call(this), Z(this, Fn, void 0));
      }
      setEventListener(t) {
        var n;
        (Z(this, Eo, t), (n = R(this, Fn)) == null || n.call(this), Z(this, Fn, t(this.setOnline.bind(this))));
      }
      setOnline(t) {
        R(this, Co) !== t &&
          (Z(this, Co, t),
          this.listeners.forEach(r => {
            r(t);
          }));
      }
      isOnline() {
        return R(this, Co);
      }
    }),
    (Co = new WeakMap()),
    (Fn = new WeakMap()),
    (Eo = new WeakMap()),
    Qh),
  Ia = new hP();
function mP() {
  let e, t;
  const n = new Promise((o, s) => {
    ((e = o), (t = s));
  });
  ((n.status = 'pending'), n.catch(() => {}));
  function r(o) {
    (Object.assign(n, o), delete n.resolve, delete n.reject);
  }
  return (
    (n.resolve = o => {
      (r({ status: 'fulfilled', value: o }), e(o));
    }),
    (n.reject = o => {
      (r({ status: 'rejected', reason: o }), t(o));
    }),
    n
  );
}
function vP(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function Ly(e) {
  return (e ?? 'online') === 'online' ? Ia.isOnline() : !0;
}
var Fy = class extends Error {
  constructor(e) {
    (super('CancelledError'), (this.revert = e == null ? void 0 : e.revert), (this.silent = e == null ? void 0 : e.silent));
  }
};
function vu(e) {
  return e instanceof Fy;
}
function $y(e) {
  let t = !1,
    n = 0,
    r = !1,
    o;
  const s = mP(),
    i = g => {
      var w;
      r || (m(new Fy(g)), (w = e.abort) == null || w.call(e));
    },
    a = () => {
      t = !0;
    },
    l = () => {
      t = !1;
    },
    u = () => Dy.isFocused() && (e.networkMode === 'always' || Ia.isOnline()) && e.canRun(),
    f = () => Ly(e.networkMode) && e.canRun(),
    p = g => {
      var w;
      r || ((r = !0), (w = e.onSuccess) == null || w.call(e, g), o == null || o(), s.resolve(g));
    },
    m = g => {
      var w;
      r || ((r = !0), (w = e.onError) == null || w.call(e, g), o == null || o(), s.reject(g));
    },
    v = () =>
      new Promise(g => {
        var w;
        ((o = x => {
          (r || u()) && g(x);
        }),
          (w = e.onPause) == null || w.call(e));
      }).then(() => {
        var g;
        ((o = void 0), r || (g = e.onContinue) == null || g.call(e));
      }),
    S = () => {
      if (r) return;
      let g;
      const w = n === 0 ? e.initialPromise : void 0;
      try {
        g = w ?? e.fn();
      } catch (x) {
        g = Promise.reject(x);
      }
      Promise.resolve(g)
        .then(p)
        .catch(x => {
          var N;
          if (r) return;
          const h = e.retry ?? (gl ? 0 : 3),
            y = e.retryDelay ?? vP,
            C = typeof y == 'function' ? y(n, x) : y,
            E = h === !0 || (typeof h == 'number' && n < h) || (typeof h == 'function' && h(n, x));
          if (t || !E) {
            m(x);
            return;
          }
          (n++,
            (N = e.onFail) == null || N.call(e, n, x),
            uP(C)
              .then(() => (u() ? void 0 : v()))
              .then(() => {
                t ? m(x) : S();
              }));
        });
    };
  return {
    promise: s,
    cancel: i,
    continue: () => (o == null || o(), s),
    cancelRetry: a,
    continueRetry: l,
    canStart: f,
    start: () => (f() ? S() : v().then(S), s),
  };
}
var gP = e => setTimeout(e, 0);
function yP() {
  let e = [],
    t = 0,
    n = a => {
      a();
    },
    r = a => {
      a();
    },
    o = gP;
  const s = a => {
      t
        ? e.push(a)
        : o(() => {
            n(a);
          });
    },
    i = () => {
      const a = e;
      ((e = []),
        a.length &&
          o(() => {
            r(() => {
              a.forEach(l => {
                n(l);
              });
            });
          }));
    };
  return {
    batch: a => {
      let l;
      t++;
      try {
        l = a();
      } finally {
        (t--, t || i());
      }
      return l;
    },
    batchCalls:
      a =>
      (...l) => {
        s(() => {
          a(...l);
        });
      },
    schedule: s,
    setNotifyFunction: a => {
      n = a;
    },
    setBatchNotifyFunction: a => {
      r = a;
    },
    setScheduler: a => {
      o = a;
    },
  };
}
var He = yP(),
  Sr,
  Yh,
  zy =
    ((Yh = class {
      constructor() {
        le(this, Sr);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        (this.clearGcTimeout(),
          iP(this.gcTime) &&
            Z(
              this,
              Sr,
              setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)
            ));
      }
      updateGcTime(e) {
        this.gcTime = Math.max(this.gcTime || 0, e ?? (gl ? 1 / 0 : 5 * 60 * 1e3));
      }
      clearGcTimeout() {
        R(this, Sr) && (clearTimeout(R(this, Sr)), Z(this, Sr, void 0));
      }
    }),
    (Sr = new WeakMap()),
    Yh),
  bo,
  Cr,
  mt,
  Er,
  ze,
  Zs,
  br,
  _t,
  an,
  Xh,
  xP =
    ((Xh = class extends zy {
      constructor(t) {
        super();
        le(this, _t);
        le(this, bo);
        le(this, Cr);
        le(this, mt);
        le(this, Er);
        le(this, ze);
        le(this, Zs);
        le(this, br);
        (Z(this, br, !1),
          Z(this, Zs, t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          Z(this, Er, t.client),
          Z(this, mt, R(this, Er).getQueryCache()),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          Z(this, bo, SP(this.options)),
          (this.state = t.state ?? R(this, bo)),
          this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        var t;
        return (t = R(this, ze)) == null ? void 0 : t.promise;
      }
      setOptions(t) {
        ((this.options = { ...R(this, Zs), ...t }), this.updateGcTime(this.options.gcTime));
      }
      optionalRemove() {
        !this.observers.length && this.state.fetchStatus === 'idle' && R(this, mt).remove(this);
      }
      setData(t, n) {
        const r = cP(this.state.data, t, this.options);
        return (
          Le(this, _t, an).call(this, {
            data: r,
            type: 'success',
            dataUpdatedAt: n == null ? void 0 : n.updatedAt,
            manual: n == null ? void 0 : n.manual,
          }),
          r
        );
      }
      setState(t, n) {
        Le(this, _t, an).call(this, { type: 'setState', state: t, setStateOptions: n });
      }
      cancel(t) {
        var r, o;
        const n = (r = R(this, ze)) == null ? void 0 : r.promise;
        return ((o = R(this, ze)) == null || o.cancel(t), n ? n.then(Mt).catch(Mt) : Promise.resolve());
      }
      destroy() {
        (super.destroy(), this.cancel({ silent: !0 }));
      }
      reset() {
        (this.destroy(), this.setState(R(this, bo)));
      }
      isActive() {
        return this.observers.some(t => lP(t.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === pf || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStatic() {
        return this.getObserversCount() > 0 ? this.observers.some(t => jc(t.options.staleTime, this) === 'static') : !1;
      }
      isStale() {
        return this.getObserversCount() > 0
          ? this.observers.some(t => t.getCurrentResult().isStale)
          : this.state.data === void 0 || this.state.isInvalidated;
      }
      isStaleByTime(t = 0) {
        return this.state.data === void 0 ? !0 : t === 'static' ? !1 : this.state.isInvalidated ? !0 : !aP(this.state.dataUpdatedAt, t);
      }
      onFocus() {
        var n;
        const t = this.observers.find(r => r.shouldFetchOnWindowFocus());
        (t == null || t.refetch({ cancelRefetch: !1 }), (n = R(this, ze)) == null || n.continue());
      }
      onOnline() {
        var n;
        const t = this.observers.find(r => r.shouldFetchOnReconnect());
        (t == null || t.refetch({ cancelRefetch: !1 }), (n = R(this, ze)) == null || n.continue());
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t), this.clearGcTimeout(), R(this, mt).notify({ type: 'observerAdded', query: this, observer: t }));
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter(n => n !== t)),
          this.observers.length ||
            (R(this, ze) && (R(this, br) ? R(this, ze).cancel({ revert: !0 }) : R(this, ze).cancelRetry()), this.scheduleGc()),
          R(this, mt).notify({ type: 'observerRemoved', query: this, observer: t }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated || Le(this, _t, an).call(this, { type: 'invalidate' });
      }
      fetch(t, n) {
        var u, f, p;
        if (this.state.fetchStatus !== 'idle') {
          if (this.state.data !== void 0 && n != null && n.cancelRefetch) this.cancel({ silent: !0 });
          else if (R(this, ze)) return (R(this, ze).continueRetry(), R(this, ze).promise);
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          const m = this.observers.find(v => v.options.queryFn);
          m && this.setOptions(m.options);
        }
        const r = new AbortController(),
          o = m => {
            Object.defineProperty(m, 'signal', { enumerable: !0, get: () => (Z(this, br, !0), r.signal) });
          },
          s = () => {
            const m = Oy(this.options, n),
              S = (() => {
                const g = { client: R(this, Er), queryKey: this.queryKey, meta: this.meta };
                return (o(g), g);
              })();
            return (Z(this, br, !1), this.options.persister ? this.options.persister(m, S, this) : m(S));
          },
          a = (() => {
            const m = {
              fetchOptions: n,
              options: this.options,
              queryKey: this.queryKey,
              client: R(this, Er),
              state: this.state,
              fetchFn: s,
            };
            return (o(m), m);
          })();
        ((u = this.options.behavior) == null || u.onFetch(a, this),
          Z(this, Cr, this.state),
          (this.state.fetchStatus === 'idle' || this.state.fetchMeta !== ((f = a.fetchOptions) == null ? void 0 : f.meta)) &&
            Le(this, _t, an).call(this, { type: 'fetch', meta: (p = a.fetchOptions) == null ? void 0 : p.meta }));
        const l = m => {
          var v, S, g, w;
          ((vu(m) && m.silent) || Le(this, _t, an).call(this, { type: 'error', error: m }),
            vu(m) ||
              ((S = (v = R(this, mt).config).onError) == null || S.call(v, m, this),
              (w = (g = R(this, mt).config).onSettled) == null || w.call(g, this.state.data, m, this)),
            this.scheduleGc());
        };
        return (
          Z(
            this,
            ze,
            $y({
              initialPromise: n == null ? void 0 : n.initialPromise,
              fn: a.fetchFn,
              abort: r.abort.bind(r),
              onSuccess: m => {
                var v, S, g, w;
                if (m === void 0) {
                  l(new Error(`${this.queryHash} data is undefined`));
                  return;
                }
                try {
                  this.setData(m);
                } catch (x) {
                  l(x);
                  return;
                }
                ((S = (v = R(this, mt).config).onSuccess) == null || S.call(v, m, this),
                  (w = (g = R(this, mt).config).onSettled) == null || w.call(g, m, this.state.error, this),
                  this.scheduleGc());
              },
              onError: l,
              onFail: (m, v) => {
                Le(this, _t, an).call(this, { type: 'failed', failureCount: m, error: v });
              },
              onPause: () => {
                Le(this, _t, an).call(this, { type: 'pause' });
              },
              onContinue: () => {
                Le(this, _t, an).call(this, { type: 'continue' });
              },
              retry: a.options.retry,
              retryDelay: a.options.retryDelay,
              networkMode: a.options.networkMode,
              canRun: () => !0,
            })
          ),
          R(this, ze).start()
        );
      }
    }),
    (bo = new WeakMap()),
    (Cr = new WeakMap()),
    (mt = new WeakMap()),
    (Er = new WeakMap()),
    (ze = new WeakMap()),
    (Zs = new WeakMap()),
    (br = new WeakMap()),
    (_t = new WeakSet()),
    (an = function (t) {
      const n = r => {
        switch (t.type) {
          case 'failed':
            return { ...r, fetchFailureCount: t.failureCount, fetchFailureReason: t.error };
          case 'pause':
            return { ...r, fetchStatus: 'paused' };
          case 'continue':
            return { ...r, fetchStatus: 'fetching' };
          case 'fetch':
            return { ...r, ...wP(r.data, this.options), fetchMeta: t.meta ?? null };
          case 'success':
            return (
              Z(this, Cr, void 0),
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
            const o = t.error;
            return vu(o) && o.revert && R(this, Cr)
              ? { ...R(this, Cr), fetchStatus: 'idle' }
              : {
                  ...r,
                  error: o,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  fetchFailureReason: o,
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
        He.batch(() => {
          (this.observers.forEach(r => {
            r.onQueryUpdate();
          }),
            R(this, mt).notify({ query: this, type: 'updated', action: t }));
        }));
    }),
    Xh);
function wP(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Ly(t.networkMode) ? 'fetching' : 'paused',
    ...(e === void 0 && { error: null, status: 'pending' }),
  };
}
function SP(e) {
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
var Ht,
  qh,
  CP =
    ((qh = class extends vl {
      constructor(t = {}) {
        super();
        le(this, Ht);
        ((this.config = t), Z(this, Ht, new Map()));
      }
      build(t, n, r) {
        const o = n.queryKey,
          s = n.queryHash ?? ff(o, n);
        let i = this.get(s);
        return (
          i ||
            ((i = new xP({
              client: t,
              queryKey: o,
              queryHash: s,
              options: t.defaultQueryOptions(n),
              state: r,
              defaultOptions: t.getQueryDefaults(o),
            })),
            this.add(i)),
          i
        );
      }
      add(t) {
        R(this, Ht).has(t.queryHash) || (R(this, Ht).set(t.queryHash, t), this.notify({ type: 'added', query: t }));
      }
      remove(t) {
        const n = R(this, Ht).get(t.queryHash);
        n && (t.destroy(), n === t && R(this, Ht).delete(t.queryHash), this.notify({ type: 'removed', query: t }));
      }
      clear() {
        He.batch(() => {
          this.getAll().forEach(t => {
            this.remove(t);
          });
        });
      }
      get(t) {
        return R(this, Ht).get(t);
      }
      getAll() {
        return [...R(this, Ht).values()];
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find(r => xh(n, r));
      }
      findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter(r => xh(t, r)) : n;
      }
      notify(t) {
        He.batch(() => {
          this.listeners.forEach(n => {
            n(t);
          });
        });
      }
      onFocus() {
        He.batch(() => {
          this.getAll().forEach(t => {
            t.onFocus();
          });
        });
      }
      onOnline() {
        He.batch(() => {
          this.getAll().forEach(t => {
            t.onOnline();
          });
        });
      }
    }),
    (Ht = new WeakMap()),
    qh),
  Kt,
  Ve,
  Nr,
  Gt,
  jn,
  Zh,
  EP =
    ((Zh = class extends zy {
      constructor(t) {
        super();
        le(this, Gt);
        le(this, Kt);
        le(this, Ve);
        le(this, Nr);
        ((this.mutationId = t.mutationId),
          Z(this, Ve, t.mutationCache),
          Z(this, Kt, []),
          (this.state = t.state || bP()),
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
        R(this, Kt).includes(t) ||
          (R(this, Kt).push(t), this.clearGcTimeout(), R(this, Ve).notify({ type: 'observerAdded', mutation: this, observer: t }));
      }
      removeObserver(t) {
        (Z(
          this,
          Kt,
          R(this, Kt).filter(n => n !== t)
        ),
          this.scheduleGc(),
          R(this, Ve).notify({ type: 'observerRemoved', mutation: this, observer: t }));
      }
      optionalRemove() {
        R(this, Kt).length || (this.state.status === 'pending' ? this.scheduleGc() : R(this, Ve).remove(this));
      }
      continue() {
        var t;
        return ((t = R(this, Nr)) == null ? void 0 : t.continue()) ?? this.execute(this.state.variables);
      }
      async execute(t) {
        var s, i, a, l, u, f, p, m, v, S, g, w, x, h, y, C, E, N, b, k;
        const n = () => {
          Le(this, Gt, jn).call(this, { type: 'continue' });
        };
        Z(
          this,
          Nr,
          $y({
            fn: () => (this.options.mutationFn ? this.options.mutationFn(t) : Promise.reject(new Error('No mutationFn found'))),
            onFail: (M, j) => {
              Le(this, Gt, jn).call(this, { type: 'failed', failureCount: M, error: j });
            },
            onPause: () => {
              Le(this, Gt, jn).call(this, { type: 'pause' });
            },
            onContinue: n,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => R(this, Ve).canRun(this),
          })
        );
        const r = this.state.status === 'pending',
          o = !R(this, Nr).canStart();
        try {
          if (r) n();
          else {
            (Le(this, Gt, jn).call(this, { type: 'pending', variables: t, isPaused: o }),
              await ((i = (s = R(this, Ve).config).onMutate) == null ? void 0 : i.call(s, t, this)));
            const j = await ((l = (a = this.options).onMutate) == null ? void 0 : l.call(a, t));
            j !== this.state.context && Le(this, Gt, jn).call(this, { type: 'pending', context: j, variables: t, isPaused: o });
          }
          const M = await R(this, Nr).start();
          return (
            await ((f = (u = R(this, Ve).config).onSuccess) == null ? void 0 : f.call(u, M, t, this.state.context, this)),
            await ((m = (p = this.options).onSuccess) == null ? void 0 : m.call(p, M, t, this.state.context)),
            await ((S = (v = R(this, Ve).config).onSettled) == null
              ? void 0
              : S.call(v, M, null, this.state.variables, this.state.context, this)),
            await ((w = (g = this.options).onSettled) == null ? void 0 : w.call(g, M, null, t, this.state.context)),
            Le(this, Gt, jn).call(this, { type: 'success', data: M }),
            M
          );
        } catch (M) {
          try {
            throw (
              await ((h = (x = R(this, Ve).config).onError) == null ? void 0 : h.call(x, M, t, this.state.context, this)),
              await ((C = (y = this.options).onError) == null ? void 0 : C.call(y, M, t, this.state.context)),
              await ((N = (E = R(this, Ve).config).onSettled) == null
                ? void 0
                : N.call(E, void 0, M, this.state.variables, this.state.context, this)),
              await ((k = (b = this.options).onSettled) == null ? void 0 : k.call(b, void 0, M, t, this.state.context)),
              M
            );
          } finally {
            Le(this, Gt, jn).call(this, { type: 'error', error: M });
          }
        } finally {
          R(this, Ve).runNext(this);
        }
      }
    }),
    (Kt = new WeakMap()),
    (Ve = new WeakMap()),
    (Nr = new WeakMap()),
    (Gt = new WeakSet()),
    (jn = function (t) {
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
        He.batch(() => {
          (R(this, Kt).forEach(r => {
            r.onMutationUpdate(t);
          }),
            R(this, Ve).notify({ mutation: this, type: 'updated', action: t }));
        }));
    }),
    Zh);
function bP() {
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
var cn,
  It,
  Js,
  Jh,
  NP =
    ((Jh = class extends vl {
      constructor(t = {}) {
        super();
        le(this, cn);
        le(this, It);
        le(this, Js);
        ((this.config = t), Z(this, cn, new Set()), Z(this, It, new Map()), Z(this, Js, 0));
      }
      build(t, n, r) {
        const o = new EP({ mutationCache: this, mutationId: ++hi(this, Js)._, options: t.defaultMutationOptions(n), state: r });
        return (this.add(o), o);
      }
      add(t) {
        R(this, cn).add(t);
        const n = Di(t);
        if (typeof n == 'string') {
          const r = R(this, It).get(n);
          r ? r.push(t) : R(this, It).set(n, [t]);
        }
        this.notify({ type: 'added', mutation: t });
      }
      remove(t) {
        if (R(this, cn).delete(t)) {
          const n = Di(t);
          if (typeof n == 'string') {
            const r = R(this, It).get(n);
            if (r)
              if (r.length > 1) {
                const o = r.indexOf(t);
                o !== -1 && r.splice(o, 1);
              } else r[0] === t && R(this, It).delete(n);
          }
        }
        this.notify({ type: 'removed', mutation: t });
      }
      canRun(t) {
        const n = Di(t);
        if (typeof n == 'string') {
          const r = R(this, It).get(n),
            o = r == null ? void 0 : r.find(s => s.state.status === 'pending');
          return !o || o === t;
        } else return !0;
      }
      runNext(t) {
        var r;
        const n = Di(t);
        if (typeof n == 'string') {
          const o = (r = R(this, It).get(n)) == null ? void 0 : r.find(s => s !== t && s.state.isPaused);
          return (o == null ? void 0 : o.continue()) ?? Promise.resolve();
        } else return Promise.resolve();
      }
      clear() {
        He.batch(() => {
          (R(this, cn).forEach(t => {
            this.notify({ type: 'removed', mutation: t });
          }),
            R(this, cn).clear(),
            R(this, It).clear());
        });
      }
      getAll() {
        return Array.from(R(this, cn));
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find(r => wh(n, r));
      }
      findAll(t = {}) {
        return this.getAll().filter(n => wh(t, n));
      }
      notify(t) {
        He.batch(() => {
          this.listeners.forEach(n => {
            n(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter(n => n.state.isPaused);
        return He.batch(() => Promise.all(t.map(n => n.continue().catch(Mt))));
      }
    }),
    (cn = new WeakMap()),
    (It = new WeakMap()),
    (Js = new WeakMap()),
    Jh);
function Di(e) {
  var t;
  return (t = e.options.scope) == null ? void 0 : t.id;
}
function Eh(e) {
  return {
    onFetch: (t, n) => {
      var f, p, m, v, S;
      const r = t.options,
        o = (m = (p = (f = t.fetchOptions) == null ? void 0 : f.meta) == null ? void 0 : p.fetchMore) == null ? void 0 : m.direction,
        s = ((v = t.state.data) == null ? void 0 : v.pages) || [],
        i = ((S = t.state.data) == null ? void 0 : S.pageParams) || [];
      let a = { pages: [], pageParams: [] },
        l = 0;
      const u = async () => {
        let g = !1;
        const w = y => {
            Object.defineProperty(y, 'signal', {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (g = !0)
                  : t.signal.addEventListener('abort', () => {
                      g = !0;
                    }),
                t.signal
              ),
            });
          },
          x = Oy(t.options, t.fetchOptions),
          h = async (y, C, E) => {
            if (g) return Promise.reject();
            if (C == null && y.pages.length) return Promise.resolve(y);
            const b = (() => {
                const $ = {
                  client: t.client,
                  queryKey: t.queryKey,
                  pageParam: C,
                  direction: E ? 'backward' : 'forward',
                  meta: t.options.meta,
                };
                return (w($), $);
              })(),
              k = await x(b),
              { maxPages: M } = t.options,
              j = E ? fP : dP;
            return { pages: j(y.pages, k, M), pageParams: j(y.pageParams, C, M) };
          };
        if (o && s.length) {
          const y = o === 'backward',
            C = y ? PP : bh,
            E = { pages: s, pageParams: i },
            N = C(r, E);
          a = await h(E, N, y);
        } else {
          const y = e ?? s.length;
          do {
            const C = l === 0 ? (i[0] ?? r.initialPageParam) : bh(r, a);
            if (l > 0 && C == null) break;
            ((a = await h(a, C)), l++);
          } while (l < y);
        }
        return a;
      };
      t.options.persister
        ? (t.fetchFn = () => {
            var g, w;
            return (w = (g = t.options).persister) == null
              ? void 0
              : w.call(g, u, { client: t.client, queryKey: t.queryKey, meta: t.options.meta, signal: t.signal }, n);
          })
        : (t.fetchFn = u);
    },
  };
}
function bh(e, { pages: t, pageParams: n }) {
  const r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function PP(e, { pages: t, pageParams: n }) {
  var r;
  return t.length > 0 ? ((r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n)) : void 0;
}
var Ee,
  $n,
  zn,
  No,
  Po,
  Bn,
  ko,
  To,
  em,
  kP =
    ((em = class {
      constructor(e = {}) {
        le(this, Ee);
        le(this, $n);
        le(this, zn);
        le(this, No);
        le(this, Po);
        le(this, Bn);
        le(this, ko);
        le(this, To);
        (Z(this, Ee, e.queryCache || new CP()),
          Z(this, $n, e.mutationCache || new NP()),
          Z(this, zn, e.defaultOptions || {}),
          Z(this, No, new Map()),
          Z(this, Po, new Map()),
          Z(this, Bn, 0));
      }
      mount() {
        (hi(this, Bn)._++,
          R(this, Bn) === 1 &&
            (Z(
              this,
              ko,
              Dy.subscribe(async e => {
                e && (await this.resumePausedMutations(), R(this, Ee).onFocus());
              })
            ),
            Z(
              this,
              To,
              Ia.subscribe(async e => {
                e && (await this.resumePausedMutations(), R(this, Ee).onOnline());
              })
            )));
      }
      unmount() {
        var e, t;
        (hi(this, Bn)._--,
          R(this, Bn) === 0 &&
            ((e = R(this, ko)) == null || e.call(this),
            Z(this, ko, void 0),
            (t = R(this, To)) == null || t.call(this),
            Z(this, To, void 0)));
      }
      isFetching(e) {
        return R(this, Ee).findAll({ ...e, fetchStatus: 'fetching' }).length;
      }
      isMutating(e) {
        return R(this, $n).findAll({ ...e, status: 'pending' }).length;
      }
      getQueryData(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = R(this, Ee).get(t.queryHash)) == null ? void 0 : n.state.data;
      }
      ensureQueryData(e) {
        const t = this.defaultQueryOptions(e),
          n = R(this, Ee).build(this, t),
          r = n.state.data;
        return r === void 0
          ? this.fetchQuery(e)
          : (e.revalidateIfStale && n.isStaleByTime(jc(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r));
      }
      getQueriesData(e) {
        return R(this, Ee)
          .findAll(e)
          .map(({ queryKey: t, state: n }) => {
            const r = n.data;
            return [t, r];
          });
      }
      setQueryData(e, t, n) {
        const r = this.defaultQueryOptions({ queryKey: e }),
          o = R(this, Ee).get(r.queryHash),
          s = o == null ? void 0 : o.state.data,
          i = sP(t, s);
        if (i !== void 0)
          return R(this, Ee)
            .build(this, r)
            .setData(i, { ...n, manual: !0 });
      }
      setQueriesData(e, t, n) {
        return He.batch(() =>
          R(this, Ee)
            .findAll(e)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, t, n)])
        );
      }
      getQueryState(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = R(this, Ee).get(t.queryHash)) == null ? void 0 : n.state;
      }
      removeQueries(e) {
        const t = R(this, Ee);
        He.batch(() => {
          t.findAll(e).forEach(n => {
            t.remove(n);
          });
        });
      }
      resetQueries(e, t) {
        const n = R(this, Ee);
        return He.batch(
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
          r = He.batch(() =>
            R(this, Ee)
              .findAll(e)
              .map(o => o.cancel(n))
          );
        return Promise.all(r).then(Mt).catch(Mt);
      }
      invalidateQueries(e, t = {}) {
        return He.batch(
          () => (
            R(this, Ee)
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
          r = He.batch(() =>
            R(this, Ee)
              .findAll(e)
              .filter(o => !o.isDisabled() && !o.isStatic())
              .map(o => {
                let s = o.fetch(void 0, n);
                return (n.throwOnError || (s = s.catch(Mt)), o.state.fetchStatus === 'paused' ? Promise.resolve() : s);
              })
          );
        return Promise.all(r).then(Mt);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        t.retry === void 0 && (t.retry = !1);
        const n = R(this, Ee).build(this, t);
        return n.isStaleByTime(jc(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(Mt).catch(Mt);
      }
      fetchInfiniteQuery(e) {
        return ((e.behavior = Eh(e.pages)), this.fetchQuery(e));
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(Mt).catch(Mt);
      }
      ensureInfiniteQueryData(e) {
        return ((e.behavior = Eh(e.pages)), this.ensureQueryData(e));
      }
      resumePausedMutations() {
        return Ia.isOnline() ? R(this, $n).resumePausedMutations() : Promise.resolve();
      }
      getQueryCache() {
        return R(this, Ee);
      }
      getMutationCache() {
        return R(this, $n);
      }
      getDefaultOptions() {
        return R(this, zn);
      }
      setDefaultOptions(e) {
        Z(this, zn, e);
      }
      setQueryDefaults(e, t) {
        R(this, No).set(Ks(e), { queryKey: e, defaultOptions: t });
      }
      getQueryDefaults(e) {
        const t = [...R(this, No).values()],
          n = {};
        return (
          t.forEach(r => {
            Gs(e, r.queryKey) && Object.assign(n, r.defaultOptions);
          }),
          n
        );
      }
      setMutationDefaults(e, t) {
        R(this, Po).set(Ks(e), { mutationKey: e, defaultOptions: t });
      }
      getMutationDefaults(e) {
        const t = [...R(this, Po).values()],
          n = {};
        return (
          t.forEach(r => {
            Gs(e, r.mutationKey) && Object.assign(n, r.defaultOptions);
          }),
          n
        );
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const t = { ...R(this, zn).queries, ...this.getQueryDefaults(e.queryKey), ...e, _defaulted: !0 };
        return (
          t.queryHash || (t.queryHash = ff(t.queryKey, t)),
          t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== 'always'),
          t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
          !t.networkMode && t.persister && (t.networkMode = 'offlineFirst'),
          t.queryFn === pf && (t.enabled = !1),
          t
        );
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ...R(this, zn).mutations,
              ...((e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            };
      }
      clear() {
        (R(this, Ee).clear(), R(this, $n).clear());
      }
    }),
    (Ee = new WeakMap()),
    ($n = new WeakMap()),
    (zn = new WeakMap()),
    (No = new WeakMap()),
    (Po = new WeakMap()),
    (Bn = new WeakMap()),
    (ko = new WeakMap()),
    (To = new WeakMap()),
    em),
  TP = d.createContext(void 0),
  RP = ({ client: e, children: t }) => (
    d.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e]
    ),
    c.jsx(TP.Provider, { value: e, children: t })
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
 */ function Qs() {
  return (
    (Qs = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Qs.apply(this, arguments)
  );
}
var Wn;
(function (e) {
  ((e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE'));
})(Wn || (Wn = {}));
const Nh = 'popstate';
function jP(e) {
  e === void 0 && (e = {});
  function t(r, o) {
    let { pathname: s, search: i, hash: a } = r.location;
    return _c('', { pathname: s, search: i, hash: a }, (o.state && o.state.usr) || null, (o.state && o.state.key) || 'default');
  }
  function n(r, o) {
    return typeof o == 'string' ? o : Aa(o);
  }
  return _P(t, n, null, e);
}
function Ne(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t);
}
function By(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function MP() {
  return Math.random().toString(36).substr(2, 8);
}
function Ph(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function _c(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Qs({ pathname: typeof e == 'string' ? e : e.pathname, search: '', hash: '' }, typeof t == 'string' ? Qo(t) : t, {
      state: n,
      key: (t && t.key) || r || MP(),
    })
  );
}
function Aa(e) {
  let { pathname: t = '/', search: n = '', hash: r = '' } = e;
  return (n && n !== '?' && (t += n.charAt(0) === '?' ? n : '?' + n), r && r !== '#' && (t += r.charAt(0) === '#' ? r : '#' + r), t);
}
function Qo(e) {
  let t = {};
  if (e) {
    let n = e.indexOf('#');
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf('?');
    (r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))), e && (t.pathname = e));
  }
  return t;
}
function _P(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: o = document.defaultView, v5Compat: s = !1 } = r,
    i = o.history,
    a = Wn.Pop,
    l = null,
    u = f();
  u == null && ((u = 0), i.replaceState(Qs({}, i.state, { idx: u }), ''));
  function f() {
    return (i.state || { idx: null }).idx;
  }
  function p() {
    a = Wn.Pop;
    let w = f(),
      x = w == null ? null : w - u;
    ((u = w), l && l({ action: a, location: g.location, delta: x }));
  }
  function m(w, x) {
    a = Wn.Push;
    let h = _c(g.location, w, x);
    u = f() + 1;
    let y = Ph(h, u),
      C = g.createHref(h);
    try {
      i.pushState(y, '', C);
    } catch (E) {
      if (E instanceof DOMException && E.name === 'DataCloneError') throw E;
      o.location.assign(C);
    }
    s && l && l({ action: a, location: g.location, delta: 1 });
  }
  function v(w, x) {
    a = Wn.Replace;
    let h = _c(g.location, w, x);
    u = f();
    let y = Ph(h, u),
      C = g.createHref(h);
    (i.replaceState(y, '', C), s && l && l({ action: a, location: g.location, delta: 0 }));
  }
  function S(w) {
    let x = o.location.origin !== 'null' ? o.location.origin : o.location.href,
      h = typeof w == 'string' ? w : Aa(w);
    return ((h = h.replace(/ $/, '%20')), Ne(x, 'No window.location.(origin|href) available to create URL for href: ' + h), new URL(h, x));
  }
  let g = {
    get action() {
      return a;
    },
    get location() {
      return e(o, i);
    },
    listen(w) {
      if (l) throw new Error('A history only accepts one active listener');
      return (
        o.addEventListener(Nh, p),
        (l = w),
        () => {
          (o.removeEventListener(Nh, p), (l = null));
        }
      );
    },
    createHref(w) {
      return t(o, w);
    },
    createURL: S,
    encodeLocation(w) {
      let x = S(w);
      return { pathname: x.pathname, search: x.search, hash: x.hash };
    },
    push: m,
    replace: v,
    go(w) {
      return i.go(w);
    },
  };
  return g;
}
var kh;
(function (e) {
  ((e.data = 'data'), (e.deferred = 'deferred'), (e.redirect = 'redirect'), (e.error = 'error'));
})(kh || (kh = {}));
function IP(e, t, n) {
  return (n === void 0 && (n = '/'), AP(e, t, n));
}
function AP(e, t, n, r) {
  let o = typeof t == 'string' ? Qo(t) : t,
    s = Fo(o.pathname || '/', n);
  if (s == null) return null;
  let i = Uy(e);
  OP(i);
  let a = null;
  for (let l = 0; a == null && l < i.length; ++l) {
    let u = KP(s);
    a = WP(i[l], u);
  }
  return a;
}
function Uy(e, t, n, r) {
  (t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = ''));
  let o = (s, i, a) => {
    let l = { relativePath: a === void 0 ? s.path || '' : a, caseSensitive: s.caseSensitive === !0, childrenIndex: i, route: s };
    l.relativePath.startsWith('/') &&
      (Ne(
        l.relativePath.startsWith(r),
        'Absolute route path "' +
          l.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.'
      ),
      (l.relativePath = l.relativePath.slice(r.length)));
    let u = Jn([r, l.relativePath]),
      f = n.concat(l);
    (s.children &&
      s.children.length > 0 &&
      (Ne(s.index !== !0, 'Index routes must not have child routes. Please remove ' + ('all child routes from route path "' + u + '".')),
      Uy(s.children, t, f, u)),
      !(s.path == null && !s.index) && t.push({ path: u, score: UP(u, s.index), routesMeta: f }));
  };
  return (
    e.forEach((s, i) => {
      var a;
      if (s.path === '' || !((a = s.path) != null && a.includes('?'))) o(s, i);
      else for (let l of Vy(s.path)) o(s, i, l);
    }),
    t
  );
}
function Vy(e) {
  let t = e.split('/');
  if (t.length === 0) return [];
  let [n, ...r] = t,
    o = n.endsWith('?'),
    s = n.replace(/\?$/, '');
  if (r.length === 0) return o ? [s, ''] : [s];
  let i = Vy(r.join('/')),
    a = [];
  return (
    a.push(...i.map(l => (l === '' ? s : [s, l].join('/')))),
    o && a.push(...i),
    a.map(l => (e.startsWith('/') && l === '' ? '/' : l))
  );
}
function OP(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : VP(
          t.routesMeta.map(r => r.childrenIndex),
          n.routesMeta.map(r => r.childrenIndex)
        )
  );
}
const DP = /^:[\w-]+$/,
  LP = 3,
  FP = 2,
  $P = 1,
  zP = 10,
  BP = -2,
  Th = e => e === '*';
function UP(e, t) {
  let n = e.split('/'),
    r = n.length;
  return (n.some(Th) && (r += BP), t && (r += FP), n.filter(o => !Th(o)).reduce((o, s) => o + (DP.test(s) ? LP : s === '' ? $P : zP), r));
}
function VP(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function WP(e, t, n) {
  let { routesMeta: r } = e,
    o = {},
    s = '/',
    i = [];
  for (let a = 0; a < r.length; ++a) {
    let l = r[a],
      u = a === r.length - 1,
      f = s === '/' ? t : t.slice(s.length) || '/',
      p = Ic({ path: l.relativePath, caseSensitive: l.caseSensitive, end: u }, f),
      m = l.route;
    if (!p) return null;
    (Object.assign(o, p.params),
      i.push({ params: o, pathname: Jn([s, p.pathname]), pathnameBase: XP(Jn([s, p.pathnameBase])), route: m }),
      p.pathnameBase !== '/' && (s = Jn([s, p.pathnameBase])));
  }
  return i;
}
function Ic(e, t) {
  typeof e == 'string' && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = HP(e.path, e.caseSensitive, e.end),
    o = t.match(n);
  if (!o) return null;
  let s = o[0],
    i = s.replace(/(.)\/+$/, '$1'),
    a = o.slice(1);
  return {
    params: r.reduce((u, f, p) => {
      let { paramName: m, isOptional: v } = f;
      if (m === '*') {
        let g = a[p] || '';
        i = s.slice(0, s.length - g.length).replace(/(.)\/+$/, '$1');
      }
      const S = a[p];
      return (v && !S ? (u[m] = void 0) : (u[m] = (S || '').replace(/%2F/g, '/')), u);
    }, {}),
    pathname: s,
    pathnameBase: i,
    pattern: e,
  };
}
function HP(e, t, n) {
  (t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    By(
      e === '*' || !e.endsWith('*') || e.endsWith('/*'),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + e.replace(/\*$/, '/*') + '".')
    ));
  let r = [],
    o =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (i, a, l) => (r.push({ paramName: a, isOptional: l != null }), l ? '/?([^\\/]+)?' : '/([^\\/]+)'));
  return (
    e.endsWith('*')
      ? (r.push({ paramName: '*' }), (o += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (o += '\\/*$')
        : e !== '' && e !== '/' && (o += '(?:(?=\\/|$))'),
    [new RegExp(o, t ? void 0 : 'i'), r]
  );
}
function KP(e) {
  try {
    return e
      .split('/')
      .map(t => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/');
  } catch (t) {
    return (
      By(
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
function Fo(e, t) {
  if (t === '/') return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== '/' ? null : e.slice(n) || '/';
}
function GP(e, t) {
  t === void 0 && (t = '/');
  let { pathname: n, search: r = '', hash: o = '' } = typeof e == 'string' ? Qo(e) : e;
  return { pathname: n ? (n.startsWith('/') ? n : QP(n, t)) : t, search: qP(r), hash: ZP(o) };
}
function QP(e, t) {
  let n = t.replace(/\/+$/, '').split('/');
  return (
    e.split('/').forEach(o => {
      o === '..' ? n.length > 1 && n.pop() : o !== '.' && n.push(o);
    }),
    n.length > 1 ? n.join('/') : '/'
  );
}
function gu(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ('`to.' + t + '` field [' + JSON.stringify(r) + '].  Please separate it out to the ') +
    ('`to.' + n + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function YP(e) {
  return e.filter((t, n) => n === 0 || (t.route.path && t.route.path.length > 0));
}
function Wy(e, t) {
  let n = YP(e);
  return t ? n.map((r, o) => (o === n.length - 1 ? r.pathname : r.pathnameBase)) : n.map(r => r.pathnameBase);
}
function Hy(e, t, n, r) {
  r === void 0 && (r = !1);
  let o;
  typeof e == 'string'
    ? (o = Qo(e))
    : ((o = Qs({}, e)),
      Ne(!o.pathname || !o.pathname.includes('?'), gu('?', 'pathname', 'search', o)),
      Ne(!o.pathname || !o.pathname.includes('#'), gu('#', 'pathname', 'hash', o)),
      Ne(!o.search || !o.search.includes('#'), gu('#', 'search', 'hash', o)));
  let s = e === '' || o.pathname === '',
    i = s ? '/' : o.pathname,
    a;
  if (i == null) a = n;
  else {
    let p = t.length - 1;
    if (!r && i.startsWith('..')) {
      let m = i.split('/');
      for (; m[0] === '..'; ) (m.shift(), (p -= 1));
      o.pathname = m.join('/');
    }
    a = p >= 0 ? t[p] : '/';
  }
  let l = GP(o, a),
    u = i && i !== '/' && i.endsWith('/'),
    f = (s || i === '.') && n.endsWith('/');
  return (!l.pathname.endsWith('/') && (u || f) && (l.pathname += '/'), l);
}
const Jn = e => e.join('/').replace(/\/\/+/g, '/'),
  XP = e => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  qP = e => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  ZP = e => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e);
function JP(e) {
  return e != null && typeof e.status == 'number' && typeof e.statusText == 'string' && typeof e.internal == 'boolean' && 'data' in e;
}
const Ky = ['post', 'put', 'patch', 'delete'];
new Set(Ky);
const ek = ['get', ...Ky];
new Set(ek);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ys() {
  return (
    (Ys = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ys.apply(this, arguments)
  );
}
const yl = d.createContext(null),
  Gy = d.createContext(null),
  lr = d.createContext(null),
  xl = d.createContext(null),
  Br = d.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Qy = d.createContext(null);
function tk(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  li() || Ne(!1);
  let { basename: r, navigator: o } = d.useContext(lr),
    { hash: s, pathname: i, search: a } = wl(e, { relative: n }),
    l = i;
  return (r !== '/' && (l = i === '/' ? r : Jn([r, i])), o.createHref({ pathname: l, search: a, hash: s }));
}
function li() {
  return d.useContext(xl) != null;
}
function Yo() {
  return (li() || Ne(!1), d.useContext(xl).location);
}
function Yy(e) {
  d.useContext(lr).static || d.useLayoutEffect(e);
}
function nk() {
  let { isDataRoute: e } = d.useContext(Br);
  return e ? mk() : rk();
}
function rk() {
  li() || Ne(!1);
  let e = d.useContext(yl),
    { basename: t, future: n, navigator: r } = d.useContext(lr),
    { matches: o } = d.useContext(Br),
    { pathname: s } = Yo(),
    i = JSON.stringify(Wy(o, n.v7_relativeSplatPath)),
    a = d.useRef(!1);
  return (
    Yy(() => {
      a.current = !0;
    }),
    d.useCallback(
      function (u, f) {
        if ((f === void 0 && (f = {}), !a.current)) return;
        if (typeof u == 'number') {
          r.go(u);
          return;
        }
        let p = Hy(u, JSON.parse(i), s, f.relative === 'path');
        (e == null && t !== '/' && (p.pathname = p.pathname === '/' ? t : Jn([t, p.pathname])),
          (f.replace ? r.replace : r.push)(p, f.state, f));
      },
      [t, r, i, s, e]
    )
  );
}
function wl(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = d.useContext(lr),
    { matches: o } = d.useContext(Br),
    { pathname: s } = Yo(),
    i = JSON.stringify(Wy(o, r.v7_relativeSplatPath));
  return d.useMemo(() => Hy(e, JSON.parse(i), s, n === 'path'), [e, i, s, n]);
}
function ok(e, t) {
  return sk(e, t);
}
function sk(e, t, n, r) {
  li() || Ne(!1);
  let { navigator: o } = d.useContext(lr),
    { matches: s } = d.useContext(Br),
    i = s[s.length - 1],
    a = i ? i.params : {};
  i && i.pathname;
  let l = i ? i.pathnameBase : '/';
  i && i.route;
  let u = Yo(),
    f;
  if (t) {
    var p;
    let w = typeof t == 'string' ? Qo(t) : t;
    (l === '/' || ((p = w.pathname) != null && p.startsWith(l)) || Ne(!1), (f = w));
  } else f = u;
  let m = f.pathname || '/',
    v = m;
  if (l !== '/') {
    let w = l.replace(/^\//, '').split('/');
    v = '/' + m.replace(/^\//, '').split('/').slice(w.length).join('/');
  }
  let S = IP(e, { pathname: v }),
    g = ck(
      S &&
        S.map(w =>
          Object.assign({}, w, {
            params: Object.assign({}, a, w.params),
            pathname: Jn([l, o.encodeLocation ? o.encodeLocation(w.pathname).pathname : w.pathname]),
            pathnameBase:
              w.pathnameBase === '/' ? l : Jn([l, o.encodeLocation ? o.encodeLocation(w.pathnameBase).pathname : w.pathnameBase]),
          })
        ),
      s,
      n,
      r
    );
  return t && g
    ? d.createElement(
        xl.Provider,
        { value: { location: Ys({ pathname: '/', search: '', hash: '', state: null, key: 'default' }, f), navigationType: Wn.Pop } },
        g
      )
    : g;
}
function ik() {
  let e = hk(),
    t = JP(e) ? e.status + ' ' + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    o = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' };
  return d.createElement(
    d.Fragment,
    null,
    d.createElement('h2', null, 'Unexpected Application Error!'),
    d.createElement('h3', { style: { fontStyle: 'italic' } }, t),
    n ? d.createElement('pre', { style: o }, n) : null,
    null
  );
}
const ak = d.createElement(ik, null);
class lk extends d.Component {
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
          Br.Provider,
          { value: this.props.routeContext },
          d.createElement(Qy.Provider, { value: this.state.error, children: this.props.component })
        )
      : this.props.children;
  }
}
function uk(e) {
  let { routeContext: t, match: n, children: r } = e,
    o = d.useContext(yl);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = n.route.id),
    d.createElement(Br.Provider, { value: t }, r)
  );
}
function ck(e, t, n, r) {
  var o;
  if ((t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null)) {
    var s;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if ((s = r) != null && s.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0) e = n.matches;
    else return null;
  }
  let i = e,
    a = (o = n) == null ? void 0 : o.errors;
  if (a != null) {
    let f = i.findIndex(p => p.route.id && (a == null ? void 0 : a[p.route.id]) !== void 0);
    (f >= 0 || Ne(!1), (i = i.slice(0, Math.min(i.length, f + 1))));
  }
  let l = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let f = 0; f < i.length; f++) {
      let p = i[f];
      if (((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (u = f), p.route.id)) {
        let { loaderData: m, errors: v } = n,
          S = p.route.loader && m[p.route.id] === void 0 && (!v || v[p.route.id] === void 0);
        if (p.route.lazy || S) {
          ((l = !0), u >= 0 ? (i = i.slice(0, u + 1)) : (i = [i[0]]));
          break;
        }
      }
    }
  return i.reduceRight((f, p, m) => {
    let v,
      S = !1,
      g = null,
      w = null;
    n &&
      ((v = a && p.route.id ? a[p.route.id] : void 0),
      (g = p.route.errorElement || ak),
      l &&
        (u < 0 && m === 0
          ? (vk('route-fallback'), (S = !0), (w = null))
          : u === m && ((S = !0), (w = p.route.hydrateFallbackElement || null))));
    let x = t.concat(i.slice(0, m + 1)),
      h = () => {
        let y;
        return (
          v
            ? (y = g)
            : S
              ? (y = w)
              : p.route.Component
                ? (y = d.createElement(p.route.Component, null))
                : p.route.element
                  ? (y = p.route.element)
                  : (y = f),
          d.createElement(uk, { match: p, routeContext: { outlet: f, matches: x, isDataRoute: n != null }, children: y })
        );
      };
    return n && (p.route.ErrorBoundary || p.route.errorElement || m === 0)
      ? d.createElement(lk, {
          location: n.location,
          revalidation: n.revalidation,
          component: g,
          error: v,
          children: h(),
          routeContext: { outlet: null, matches: x, isDataRoute: !0 },
        })
      : h();
  }, null);
}
var Xy = (function (e) {
    return ((e.UseBlocker = 'useBlocker'), (e.UseRevalidator = 'useRevalidator'), (e.UseNavigateStable = 'useNavigate'), e);
  })(Xy || {}),
  qy = (function (e) {
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
  })(qy || {});
function dk(e) {
  let t = d.useContext(yl);
  return (t || Ne(!1), t);
}
function fk(e) {
  let t = d.useContext(Gy);
  return (t || Ne(!1), t);
}
function pk(e) {
  let t = d.useContext(Br);
  return (t || Ne(!1), t);
}
function Zy(e) {
  let t = pk(),
    n = t.matches[t.matches.length - 1];
  return (n.route.id || Ne(!1), n.route.id);
}
function hk() {
  var e;
  let t = d.useContext(Qy),
    n = fk(),
    r = Zy();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function mk() {
  let { router: e } = dk(Xy.UseNavigateStable),
    t = Zy(qy.UseNavigateStable),
    n = d.useRef(!1);
  return (
    Yy(() => {
      n.current = !0;
    }),
    d.useCallback(
      function (o, s) {
        (s === void 0 && (s = {}), n.current && (typeof o == 'number' ? e.navigate(o) : e.navigate(o, Ys({ fromRouteId: t }, s))));
      },
      [e, t]
    )
  );
}
const Rh = {};
function vk(e, t, n) {
  Rh[e] || (Rh[e] = !0);
}
function gk(e, t) {
  (e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath);
}
function Ac(e) {
  Ne(!1);
}
function yk(e) {
  let { basename: t = '/', children: n = null, location: r, navigationType: o = Wn.Pop, navigator: s, static: i = !1, future: a } = e;
  li() && Ne(!1);
  let l = t.replace(/^\/*/, '/'),
    u = d.useMemo(() => ({ basename: l, navigator: s, static: i, future: Ys({ v7_relativeSplatPath: !1 }, a) }), [l, a, s, i]);
  typeof r == 'string' && (r = Qo(r));
  let { pathname: f = '/', search: p = '', hash: m = '', state: v = null, key: S = 'default' } = r,
    g = d.useMemo(() => {
      let w = Fo(f, l);
      return w == null ? null : { location: { pathname: w, search: p, hash: m, state: v, key: S }, navigationType: o };
    }, [l, f, p, m, v, S, o]);
  return g == null ? null : d.createElement(lr.Provider, { value: u }, d.createElement(xl.Provider, { children: n, value: g }));
}
function xk(e) {
  let { children: t, location: n } = e;
  return ok(Oc(t), n);
}
new Promise(() => {});
function Oc(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    d.Children.forEach(e, (r, o) => {
      if (!d.isValidElement(r)) return;
      let s = [...t, o];
      if (r.type === d.Fragment) {
        n.push.apply(n, Oc(r.props.children, s));
        return;
      }
      (r.type !== Ac && Ne(!1), !r.props.index || !r.props.children || Ne(!1));
      let i = {
        id: r.props.id || s.join('-'),
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
      (r.props.children && (i.children = Oc(r.props.children, s)), n.push(i));
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
 */ function Oa() {
  return (
    (Oa = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Oa.apply(this, arguments)
  );
}
function Jy(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    s;
  for (s = 0; s < r.length; s++) ((o = r[s]), !(t.indexOf(o) >= 0) && (n[o] = e[o]));
  return n;
}
function wk(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Sk(e, t) {
  return e.button === 0 && (!t || t === '_self') && !wk(e);
}
const Ck = ['onClick', 'relative', 'reloadDocument', 'replace', 'state', 'target', 'to', 'preventScrollReset', 'viewTransition'],
  Ek = ['aria-current', 'caseSensitive', 'className', 'end', 'style', 'to', 'viewTransition', 'children'],
  bk = '6';
try {
  window.__reactRouterVersion = bk;
} catch {}
const Nk = d.createContext({ isTransitioning: !1 }),
  Pk = 'startTransition',
  jh = Zc[Pk];
function kk(e) {
  let { basename: t, children: n, future: r, window: o } = e,
    s = d.useRef();
  s.current == null && (s.current = jP({ window: o, v5Compat: !0 }));
  let i = s.current,
    [a, l] = d.useState({ action: i.action, location: i.location }),
    { v7_startTransition: u } = r || {},
    f = d.useCallback(
      p => {
        u && jh ? jh(() => l(p)) : l(p);
      },
      [l, u]
    );
  return (
    d.useLayoutEffect(() => i.listen(f), [i, f]),
    d.useEffect(() => gk(r), [r]),
    d.createElement(yk, { basename: t, children: n, location: a.location, navigationType: a.action, navigator: i, future: r })
  );
}
const Tk = typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u',
  Rk = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  jk = d.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: o,
        reloadDocument: s,
        replace: i,
        state: a,
        target: l,
        to: u,
        preventScrollReset: f,
        viewTransition: p,
      } = t,
      m = Jy(t, Ck),
      { basename: v } = d.useContext(lr),
      S,
      g = !1;
    if (typeof u == 'string' && Rk.test(u) && ((S = u), Tk))
      try {
        let y = new URL(window.location.href),
          C = u.startsWith('//') ? new URL(y.protocol + u) : new URL(u),
          E = Fo(C.pathname, v);
        C.origin === y.origin && E != null ? (u = E + C.search + C.hash) : (g = !0);
      } catch {}
    let w = tk(u, { relative: o }),
      x = Ik(u, { replace: i, state: a, target: l, preventScrollReset: f, relative: o, viewTransition: p });
    function h(y) {
      (r && r(y), y.defaultPrevented || x(y));
    }
    return d.createElement('a', Oa({}, m, { href: S || w, onClick: g || s ? r : h, ref: n, target: l }));
  }),
  Mk = d.forwardRef(function (t, n) {
    let {
        'aria-current': r = 'page',
        caseSensitive: o = !1,
        className: s = '',
        end: i = !1,
        style: a,
        to: l,
        viewTransition: u,
        children: f,
      } = t,
      p = Jy(t, Ek),
      m = wl(l, { relative: p.relative }),
      v = Yo(),
      S = d.useContext(Gy),
      { navigator: g, basename: w } = d.useContext(lr),
      x = S != null && Ak(m) && u === !0,
      h = g.encodeLocation ? g.encodeLocation(m).pathname : m.pathname,
      y = v.pathname,
      C = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    (o || ((y = y.toLowerCase()), (C = C ? C.toLowerCase() : null), (h = h.toLowerCase())), C && w && (C = Fo(C, w) || C));
    const E = h !== '/' && h.endsWith('/') ? h.length - 1 : h.length;
    let N = y === h || (!i && y.startsWith(h) && y.charAt(E) === '/'),
      b = C != null && (C === h || (!i && C.startsWith(h) && C.charAt(h.length) === '/')),
      k = { isActive: N, isPending: b, isTransitioning: x },
      M = N ? r : void 0,
      j;
    typeof s == 'function'
      ? (j = s(k))
      : (j = [s, N ? 'active' : null, b ? 'pending' : null, x ? 'transitioning' : null].filter(Boolean).join(' '));
    let $ = typeof a == 'function' ? a(k) : a;
    return d.createElement(
      jk,
      Oa({}, p, { 'aria-current': M, className: j, ref: n, style: $, to: l, viewTransition: u }),
      typeof f == 'function' ? f(k) : f
    );
  });
var Dc;
(function (e) {
  ((e.UseScrollRestoration = 'useScrollRestoration'),
    (e.UseSubmit = 'useSubmit'),
    (e.UseSubmitFetcher = 'useSubmitFetcher'),
    (e.UseFetcher = 'useFetcher'),
    (e.useViewTransitionState = 'useViewTransitionState'));
})(Dc || (Dc = {}));
var Mh;
(function (e) {
  ((e.UseFetcher = 'useFetcher'), (e.UseFetchers = 'useFetchers'), (e.UseScrollRestoration = 'useScrollRestoration'));
})(Mh || (Mh = {}));
function _k(e) {
  let t = d.useContext(yl);
  return (t || Ne(!1), t);
}
function Ik(e, t) {
  let { target: n, replace: r, state: o, preventScrollReset: s, relative: i, viewTransition: a } = t === void 0 ? {} : t,
    l = nk(),
    u = Yo(),
    f = wl(e, { relative: i });
  return d.useCallback(
    p => {
      if (Sk(p, n)) {
        p.preventDefault();
        let m = r !== void 0 ? r : Aa(u) === Aa(f);
        l(e, { replace: m, state: o, preventScrollReset: s, relative: i, viewTransition: a });
      }
    },
    [u, l, f, r, o, n, e, s, i, a]
  );
}
function Ak(e, t) {
  t === void 0 && (t = {});
  let n = d.useContext(Nk);
  n == null && Ne(!1);
  let { basename: r } = _k(Dc.useViewTransitionState),
    o = wl(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let s = Fo(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    i = Fo(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return Ic(o.pathname, i) != null || Ic(o.pathname, s) != null;
}
const Ok = cl(
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
function Da({ className: e, variant: t, ...n }) {
  return c.jsx('div', { className: Q(Ok({ variant: t }), e), ...n });
}
const Dk = cl(
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
  xt = d.forwardRef(({ className: e, variant: t, size: n, asChild: r = !1, ...o }, s) => {
    const i = r ? XC : 'button';
    return c.jsx(i, { className: Q(Dk({ variant: t, size: n, className: e })), ref: s, ...o });
  });
xt.displayName = 'Button';
var Lk = d.createContext(void 0);
function Sl(e) {
  const t = d.useContext(Lk);
  return e || t || 'ltr';
}
var yu = 0;
function hf() {
  d.useEffect(() => {
    const e = document.querySelectorAll('[data-radix-focus-guard]');
    return (
      document.body.insertAdjacentElement('afterbegin', e[0] ?? _h()),
      document.body.insertAdjacentElement('beforeend', e[1] ?? _h()),
      yu++,
      () => {
        (yu === 1 && document.querySelectorAll('[data-radix-focus-guard]').forEach(t => t.remove()), yu--);
      }
    );
  }, []);
}
function _h() {
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
var xu = 'focusScope.autoFocusOnMount',
  wu = 'focusScope.autoFocusOnUnmount',
  Ih = { bubbles: !1, cancelable: !0 },
  Fk = 'FocusScope',
  Cl = d.forwardRef((e, t) => {
    const { loop: n = !1, trapped: r = !1, onMountAutoFocus: o, onUnmountAutoFocus: s, ...i } = e,
      [a, l] = d.useState(null),
      u = Ge(o),
      f = Ge(s),
      p = d.useRef(null),
      m = oe(t, g => l(g)),
      v = d.useRef({
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
        let g = function (y) {
            if (v.paused || !a) return;
            const C = y.target;
            a.contains(C) ? (p.current = C) : Mn(p.current, { select: !0 });
          },
          w = function (y) {
            if (v.paused || !a) return;
            const C = y.relatedTarget;
            C !== null && (a.contains(C) || Mn(p.current, { select: !0 }));
          },
          x = function (y) {
            if (document.activeElement === document.body) for (const E of y) E.removedNodes.length > 0 && Mn(a);
          };
        (document.addEventListener('focusin', g), document.addEventListener('focusout', w));
        const h = new MutationObserver(x);
        return (
          a && h.observe(a, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener('focusin', g), document.removeEventListener('focusout', w), h.disconnect());
          }
        );
      }
    }, [r, a, v.paused]),
      d.useEffect(() => {
        if (a) {
          Oh.add(v);
          const g = document.activeElement;
          if (!a.contains(g)) {
            const x = new CustomEvent(xu, Ih);
            (a.addEventListener(xu, u),
              a.dispatchEvent(x),
              x.defaultPrevented || ($k(Wk(e0(a)), { select: !0 }), document.activeElement === g && Mn(a)));
          }
          return () => {
            (a.removeEventListener(xu, u),
              setTimeout(() => {
                const x = new CustomEvent(wu, Ih);
                (a.addEventListener(wu, f),
                  a.dispatchEvent(x),
                  x.defaultPrevented || Mn(g ?? document.body, { select: !0 }),
                  a.removeEventListener(wu, f),
                  Oh.remove(v));
              }, 0));
          };
        }
      }, [a, u, f, v]));
    const S = d.useCallback(
      g => {
        if ((!n && !r) || v.paused) return;
        const w = g.key === 'Tab' && !g.altKey && !g.ctrlKey && !g.metaKey,
          x = document.activeElement;
        if (w && x) {
          const h = g.currentTarget,
            [y, C] = zk(h);
          y && C
            ? !g.shiftKey && x === C
              ? (g.preventDefault(), n && Mn(y, { select: !0 }))
              : g.shiftKey && x === y && (g.preventDefault(), n && Mn(C, { select: !0 }))
            : x === h && g.preventDefault();
        }
      },
      [n, r, v.paused]
    );
    return c.jsx(K.div, { tabIndex: -1, ...i, ref: m, onKeyDown: S });
  });
Cl.displayName = Fk;
function $k(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e) if ((Mn(r, { select: t }), document.activeElement !== n)) return;
}
function zk(e) {
  const t = e0(e),
    n = Ah(t, e),
    r = Ah(t.reverse(), e);
  return [n, r];
}
function e0(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: r => {
        const o = r.tagName === 'INPUT' && r.type === 'hidden';
        return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ah(e, t) {
  for (const n of e) if (!Bk(n, { upTo: t })) return n;
}
function Bk(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === 'hidden') return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === 'none') return !0;
    e = e.parentElement;
  }
  return !1;
}
function Uk(e) {
  return e instanceof HTMLInputElement && 'select' in e;
}
function Mn(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && Uk(e) && t && e.select());
  }
}
var Oh = Vk();
function Vk() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      (t !== n && (n == null || n.pause()), (e = Dh(e, t)), e.unshift(t));
    },
    remove(t) {
      var n;
      ((e = Dh(e, t)), (n = e[0]) == null || n.resume());
    },
  };
}
function Dh(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function Wk(e) {
  return e.filter(t => t.tagName !== 'A');
}
var Su = 'rovingFocusGroup.onEntryFocus',
  Hk = { bubbles: !1, cancelable: !0 },
  ui = 'RovingFocusGroup',
  [Lc, t0, Kk] = al(ui),
  [Gk, El] = dt(ui, [Kk]),
  [Qk, Yk] = Gk(ui),
  n0 = d.forwardRef((e, t) =>
    c.jsx(Lc.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: c.jsx(Lc.Slot, { scope: e.__scopeRovingFocusGroup, children: c.jsx(Xk, { ...e, ref: t }) }),
    })
  );
n0.displayName = ui;
var Xk = d.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: r,
        loop: o = !1,
        dir: s,
        currentTabStopId: i,
        defaultCurrentTabStopId: a,
        onCurrentTabStopIdChange: l,
        onEntryFocus: u,
        preventScrollOnEntryFocus: f = !1,
        ...p
      } = e,
      m = d.useRef(null),
      v = oe(t, m),
      S = Sl(s),
      [g, w] = nr({ prop: i, defaultProp: a ?? null, onChange: l, caller: ui }),
      [x, h] = d.useState(!1),
      y = Ge(u),
      C = t0(n),
      E = d.useRef(!1),
      [N, b] = d.useState(0);
    return (
      d.useEffect(() => {
        const k = m.current;
        if (k) return (k.addEventListener(Su, y), () => k.removeEventListener(Su, y));
      }, [y]),
      c.jsx(Qk, {
        scope: n,
        orientation: r,
        dir: S,
        loop: o,
        currentTabStopId: g,
        onItemFocus: d.useCallback(k => w(k), [w]),
        onItemShiftTab: d.useCallback(() => h(!0), []),
        onFocusableItemAdd: d.useCallback(() => b(k => k + 1), []),
        onFocusableItemRemove: d.useCallback(() => b(k => k - 1), []),
        children: c.jsx(K.div, {
          tabIndex: x || N === 0 ? -1 : 0,
          'data-orientation': r,
          ...p,
          ref: v,
          style: { outline: 'none', ...e.style },
          onMouseDown: F(e.onMouseDown, () => {
            E.current = !0;
          }),
          onFocus: F(e.onFocus, k => {
            const M = !E.current;
            if (k.target === k.currentTarget && M && !x) {
              const j = new CustomEvent(Su, Hk);
              if ((k.currentTarget.dispatchEvent(j), !j.defaultPrevented)) {
                const $ = C().filter(z => z.focusable),
                  A = $.find(z => z.active),
                  W = $.find(z => z.id === g),
                  G = [A, W, ...$].filter(Boolean).map(z => z.ref.current);
                s0(G, f);
              }
            }
            E.current = !1;
          }),
          onBlur: F(e.onBlur, () => h(!1)),
        }),
      })
    );
  }),
  r0 = 'RovingFocusGroupItem',
  o0 = d.forwardRef((e, t) => {
    const { __scopeRovingFocusGroup: n, focusable: r = !0, active: o = !1, tabStopId: s, children: i, ...a } = e,
      l = Jt(),
      u = s || l,
      f = Yk(r0, n),
      p = f.currentTabStopId === u,
      m = t0(n),
      { onFocusableItemAdd: v, onFocusableItemRemove: S, currentTabStopId: g } = f;
    return (
      d.useEffect(() => {
        if (r) return (v(), () => S());
      }, [r, v, S]),
      c.jsx(Lc.ItemSlot, {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: c.jsx(K.span, {
          tabIndex: p ? 0 : -1,
          'data-orientation': f.orientation,
          ...a,
          ref: t,
          onMouseDown: F(e.onMouseDown, w => {
            r ? f.onItemFocus(u) : w.preventDefault();
          }),
          onFocus: F(e.onFocus, () => f.onItemFocus(u)),
          onKeyDown: F(e.onKeyDown, w => {
            if (w.key === 'Tab' && w.shiftKey) {
              f.onItemShiftTab();
              return;
            }
            if (w.target !== w.currentTarget) return;
            const x = Jk(w, f.orientation, f.dir);
            if (x !== void 0) {
              if (w.metaKey || w.ctrlKey || w.altKey || w.shiftKey) return;
              w.preventDefault();
              let y = m()
                .filter(C => C.focusable)
                .map(C => C.ref.current);
              if (x === 'last') y.reverse();
              else if (x === 'prev' || x === 'next') {
                x === 'prev' && y.reverse();
                const C = y.indexOf(w.currentTarget);
                y = f.loop ? eT(y, C + 1) : y.slice(C + 1);
              }
              setTimeout(() => s0(y));
            }
          }),
          children: typeof i == 'function' ? i({ isCurrentTabStop: p, hasTabStop: g != null }) : i,
        }),
      })
    );
  });
o0.displayName = r0;
var qk = {
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageUp: 'first',
  Home: 'first',
  PageDown: 'last',
  End: 'last',
};
function Zk(e, t) {
  return t !== 'rtl' ? e : e === 'ArrowLeft' ? 'ArrowRight' : e === 'ArrowRight' ? 'ArrowLeft' : e;
}
function Jk(e, t, n) {
  const r = Zk(e.key, n);
  if (!(t === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(r)) && !(t === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(r)))
    return qk[r];
}
function s0(e, t = !1) {
  const n = document.activeElement;
  for (const r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function eT(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var i0 = n0,
  a0 = o0,
  tT = function (e) {
    if (typeof document > 'u') return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  Yr = new WeakMap(),
  Li = new WeakMap(),
  Fi = {},
  Cu = 0,
  l0 = function (e) {
    return e && (e.host || l0(e.parentNode));
  },
  nT = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = l0(n);
        return r && e.contains(r) ? r : (console.error('aria-hidden', n, 'in not contained inside', e, '. Doing nothing'), null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  rT = function (e, t, n, r) {
    var o = nT(t, Array.isArray(e) ? e : [e]);
    Fi[n] || (Fi[n] = new WeakMap());
    var s = Fi[n],
      i = [],
      a = new Set(),
      l = new Set(o),
      u = function (p) {
        !p || a.has(p) || (a.add(p), u(p.parentNode));
      };
    o.forEach(u);
    var f = function (p) {
      !p ||
        l.has(p) ||
        Array.prototype.forEach.call(p.children, function (m) {
          if (a.has(m)) f(m);
          else
            try {
              var v = m.getAttribute(r),
                S = v !== null && v !== 'false',
                g = (Yr.get(m) || 0) + 1,
                w = (s.get(m) || 0) + 1;
              (Yr.set(m, g),
                s.set(m, w),
                i.push(m),
                g === 1 && S && Li.set(m, !0),
                w === 1 && m.setAttribute(n, 'true'),
                S || m.setAttribute(r, 'true'));
            } catch (x) {
              console.error('aria-hidden: cannot operate on ', m, x);
            }
        });
    };
    return (
      f(t),
      a.clear(),
      Cu++,
      function () {
        (i.forEach(function (p) {
          var m = Yr.get(p) - 1,
            v = s.get(p) - 1;
          (Yr.set(p, m), s.set(p, v), m || (Li.has(p) || p.removeAttribute(r), Li.delete(p)), v || p.removeAttribute(n));
        }),
          Cu--,
          Cu || ((Yr = new WeakMap()), (Yr = new WeakMap()), (Li = new WeakMap()), (Fi = {})));
      }
    );
  },
  mf = function (e, t, n) {
    n === void 0 && (n = 'data-aria-hidden');
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = tT(e);
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll('[aria-live], script'))), rT(r, o, n, 'aria-hidden'))
      : function () {
          return null;
        };
  },
  Yt = function () {
    return (
      (Yt =
        Object.assign ||
        function (t) {
          for (var n, r = 1, o = arguments.length; r < o; r++) {
            n = arguments[r];
            for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
          }
          return t;
        }),
      Yt.apply(this, arguments)
    );
  };
function u0(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function oT(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, s; r < o; r++) (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), (s[r] = t[r]));
  return e.concat(s || Array.prototype.slice.call(t));
}
var na = 'right-scroll-bar-position',
  ra = 'width-before-scroll-bar',
  sT = 'with-scroll-bars-hidden',
  iT = '--removed-body-scroll-bar-size';
function Eu(e, t) {
  return (typeof e == 'function' ? e(t) : e && (e.current = t), e);
}
function aT(e, t) {
  var n = d.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && ((n.value = r), n.callback(r, o));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var lT = typeof window < 'u' ? d.useLayoutEffect : d.useEffect,
  Lh = new WeakMap();
function uT(e, t) {
  var n = aT(null, function (r) {
    return e.forEach(function (o) {
      return Eu(o, r);
    });
  });
  return (
    lT(
      function () {
        var r = Lh.get(n);
        if (r) {
          var o = new Set(r),
            s = new Set(e),
            i = n.current;
          (o.forEach(function (a) {
            s.has(a) || Eu(a, null);
          }),
            s.forEach(function (a) {
              o.has(a) || Eu(a, i);
            }));
        }
        Lh.set(n, e);
      },
      [e]
    ),
    n
  );
}
function cT(e) {
  return e;
}
function dT(e, t) {
  t === void 0 && (t = cT);
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r) throw new Error('Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.');
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (s) {
        var i = t(s, r);
        return (
          n.push(i),
          function () {
            n = n.filter(function (a) {
              return a !== i;
            });
          }
        );
      },
      assignSyncMedium: function (s) {
        for (r = !0; n.length; ) {
          var i = n;
          ((n = []), i.forEach(s));
        }
        n = {
          push: function (a) {
            return s(a);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (s) {
        r = !0;
        var i = [];
        if (n.length) {
          var a = n;
          ((n = []), a.forEach(s), (i = n));
        }
        var l = function () {
            var f = i;
            ((i = []), f.forEach(s));
          },
          u = function () {
            return Promise.resolve().then(l);
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
  return o;
}
function fT(e) {
  e === void 0 && (e = {});
  var t = dT(null);
  return ((t.options = Yt({ async: !0, ssr: !1 }, e)), t);
}
var c0 = function (e) {
  var t = e.sideCar,
    n = u0(e, ['sideCar']);
  if (!t) throw new Error('Sidecar: please provide `sideCar` property to import the right car');
  var r = t.read();
  if (!r) throw new Error('Sidecar medium not found');
  return d.createElement(r, Yt({}, n));
};
c0.isSideCarExport = !0;
function pT(e, t) {
  return (e.useMedium(t), c0);
}
var d0 = fT(),
  bu = function () {},
  bl = d.forwardRef(function (e, t) {
    var n = d.useRef(null),
      r = d.useState({ onScrollCapture: bu, onWheelCapture: bu, onTouchMoveCapture: bu }),
      o = r[0],
      s = r[1],
      i = e.forwardProps,
      a = e.children,
      l = e.className,
      u = e.removeScrollBar,
      f = e.enabled,
      p = e.shards,
      m = e.sideCar,
      v = e.noRelative,
      S = e.noIsolation,
      g = e.inert,
      w = e.allowPinchZoom,
      x = e.as,
      h = x === void 0 ? 'div' : x,
      y = e.gapMode,
      C = u0(e, [
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
      E = m,
      N = uT([n, t]),
      b = Yt(Yt({}, C), o);
    return d.createElement(
      d.Fragment,
      null,
      f &&
        d.createElement(E, {
          sideCar: d0,
          removeScrollBar: u,
          shards: p,
          noRelative: v,
          noIsolation: S,
          inert: g,
          setCallbacks: s,
          allowPinchZoom: !!w,
          lockRef: n,
          gapMode: y,
        }),
      i ? d.cloneElement(d.Children.only(a), Yt(Yt({}, b), { ref: N })) : d.createElement(h, Yt({}, b, { className: l, ref: N }), a)
    );
  });
bl.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
bl.classNames = { fullWidth: ra, zeroRight: na };
var hT = function () {
  if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__;
};
function mT() {
  if (!document) return null;
  var e = document.createElement('style');
  e.type = 'text/css';
  var t = hT();
  return (t && e.setAttribute('nonce', t), e);
}
function vT(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function gT(e) {
  var t = document.head || document.getElementsByTagName('head')[0];
  t.appendChild(e);
}
var yT = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = mT()) && (vT(t, n), gT(t)), e++);
      },
      remove: function () {
        (e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  xT = function () {
    var e = yT();
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
  f0 = function () {
    var e = xT(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic;
        return (e(r, o), null);
      };
    return t;
  },
  wT = { left: 0, top: 0, right: 0, gap: 0 },
  Nu = function (e) {
    return parseInt(e || '', 10) || 0;
  },
  ST = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === 'padding' ? 'paddingLeft' : 'marginLeft'],
      r = t[e === 'padding' ? 'paddingTop' : 'marginTop'],
      o = t[e === 'padding' ? 'paddingRight' : 'marginRight'];
    return [Nu(n), Nu(r), Nu(o)];
  },
  CT = function (e) {
    if ((e === void 0 && (e = 'margin'), typeof window > 'u')) return wT;
    var t = ST(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
  },
  ET = f0(),
  xo = 'data-scroll-locked',
  bT = function (e, t, n, r) {
    var o = e.left,
      s = e.top,
      i = e.right,
      a = e.gap;
    return (
      n === void 0 && (n = 'margin'),
      `
  .`
        .concat(
          sT,
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
          xo,
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
                  o,
                  `px;
    padding-top: `
                )
                .concat(
                  s,
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
          na,
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
          ra,
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
        .concat(na, ' .')
        .concat(
          na,
          ` {
    right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(ra, ' .')
        .concat(
          ra,
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
          xo,
          `] {
    `
        )
        .concat(iT, ': ')
        .concat(
          a,
          `px;
  }
`
        )
    );
  },
  Fh = function () {
    var e = parseInt(document.body.getAttribute(xo) || '0', 10);
    return isFinite(e) ? e : 0;
  },
  NT = function () {
    d.useEffect(function () {
      return (
        document.body.setAttribute(xo, (Fh() + 1).toString()),
        function () {
          var e = Fh() - 1;
          e <= 0 ? document.body.removeAttribute(xo) : document.body.setAttribute(xo, e.toString());
        }
      );
    }, []);
  },
  PT = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? 'margin' : r;
    NT();
    var s = d.useMemo(
      function () {
        return CT(o);
      },
      [o]
    );
    return d.createElement(ET, { styles: bT(s, !t, o, n ? '' : '!important') });
  },
  Fc = !1;
if (typeof window < 'u')
  try {
    var $i = Object.defineProperty({}, 'passive', {
      get: function () {
        return ((Fc = !0), !0);
      },
    });
    (window.addEventListener('test', $i, $i), window.removeEventListener('test', $i, $i));
  } catch {
    Fc = !1;
  }
var Xr = Fc ? { passive: !1 } : !1,
  kT = function (e) {
    return e.tagName === 'TEXTAREA';
  },
  p0 = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return n[t] !== 'hidden' && !(n.overflowY === n.overflowX && !kT(e) && n[t] === 'visible');
  },
  TT = function (e) {
    return p0(e, 'overflowY');
  },
  RT = function (e) {
    return p0(e, 'overflowX');
  },
  $h = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      typeof ShadowRoot < 'u' && r instanceof ShadowRoot && (r = r.host);
      var o = h0(e, r);
      if (o) {
        var s = m0(e, r),
          i = s[1],
          a = s[2];
        if (i > a) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  jT = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  MT = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  h0 = function (e, t) {
    return e === 'v' ? TT(t) : RT(t);
  },
  m0 = function (e, t) {
    return e === 'v' ? jT(t) : MT(t);
  },
  _T = function (e, t) {
    return e === 'h' && t === 'rtl' ? -1 : 1;
  },
  IT = function (e, t, n, r, o) {
    var s = _T(e, window.getComputedStyle(t).direction),
      i = s * r,
      a = n.target,
      l = t.contains(a),
      u = !1,
      f = i > 0,
      p = 0,
      m = 0;
    do {
      if (!a) break;
      var v = m0(e, a),
        S = v[0],
        g = v[1],
        w = v[2],
        x = g - w - s * S;
      (S || x) && h0(e, a) && ((p += x), (m += S));
      var h = a.parentNode;
      a = h && h.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? h.host : h;
    } while ((!l && a !== document.body) || (l && (t.contains(a) || t === a)));
    return (((f && Math.abs(p) < 1) || (!f && Math.abs(m) < 1)) && (u = !0), u);
  },
  zi = function (e) {
    return 'changedTouches' in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
  },
  zh = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Bh = function (e) {
    return e && 'current' in e ? e.current : e;
  },
  AT = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  OT = function (e) {
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
  DT = 0,
  qr = [];
function LT(e) {
  var t = d.useRef([]),
    n = d.useRef([0, 0]),
    r = d.useRef(),
    o = d.useState(DT++)[0],
    s = d.useState(f0)[0],
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
          document.body.classList.add('block-interactivity-'.concat(o));
          var g = oT([e.lockRef.current], (e.shards || []).map(Bh), !0).filter(Boolean);
          return (
            g.forEach(function (w) {
              return w.classList.add('allow-interactivity-'.concat(o));
            }),
            function () {
              (document.body.classList.remove('block-interactivity-'.concat(o)),
                g.forEach(function (w) {
                  return w.classList.remove('allow-interactivity-'.concat(o));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    ));
  var a = d.useCallback(function (g, w) {
      if (('touches' in g && g.touches.length === 2) || (g.type === 'wheel' && g.ctrlKey)) return !i.current.allowPinchZoom;
      var x = zi(g),
        h = n.current,
        y = 'deltaX' in g ? g.deltaX : h[0] - x[0],
        C = 'deltaY' in g ? g.deltaY : h[1] - x[1],
        E,
        N = g.target,
        b = Math.abs(y) > Math.abs(C) ? 'h' : 'v';
      if ('touches' in g && b === 'h' && N.type === 'range') return !1;
      var k = $h(b, N);
      if (!k) return !0;
      if ((k ? (E = b) : ((E = b === 'v' ? 'h' : 'v'), (k = $h(b, N))), !k)) return !1;
      if ((!r.current && 'changedTouches' in g && (y || C) && (r.current = E), !E)) return !0;
      var M = r.current || E;
      return IT(M, w, g, M === 'h' ? y : C);
    }, []),
    l = d.useCallback(function (g) {
      var w = g;
      if (!(!qr.length || qr[qr.length - 1] !== s)) {
        var x = 'deltaY' in w ? zh(w) : zi(w),
          h = t.current.filter(function (E) {
            return E.name === w.type && (E.target === w.target || w.target === E.shadowParent) && AT(E.delta, x);
          })[0];
        if (h && h.should) {
          w.cancelable && w.preventDefault();
          return;
        }
        if (!h) {
          var y = (i.current.shards || [])
              .map(Bh)
              .filter(Boolean)
              .filter(function (E) {
                return E.contains(w.target);
              }),
            C = y.length > 0 ? a(w, y[0]) : !i.current.noIsolation;
          C && w.cancelable && w.preventDefault();
        }
      }
    }, []),
    u = d.useCallback(function (g, w, x, h) {
      var y = { name: g, delta: w, target: x, should: h, shadowParent: FT(x) };
      (t.current.push(y),
        setTimeout(function () {
          t.current = t.current.filter(function (C) {
            return C !== y;
          });
        }, 1));
    }, []),
    f = d.useCallback(function (g) {
      ((n.current = zi(g)), (r.current = void 0));
    }, []),
    p = d.useCallback(function (g) {
      u(g.type, zh(g), g.target, a(g, e.lockRef.current));
    }, []),
    m = d.useCallback(function (g) {
      u(g.type, zi(g), g.target, a(g, e.lockRef.current));
    }, []);
  d.useEffect(function () {
    return (
      qr.push(s),
      e.setCallbacks({ onScrollCapture: p, onWheelCapture: p, onTouchMoveCapture: m }),
      document.addEventListener('wheel', l, Xr),
      document.addEventListener('touchmove', l, Xr),
      document.addEventListener('touchstart', f, Xr),
      function () {
        ((qr = qr.filter(function (g) {
          return g !== s;
        })),
          document.removeEventListener('wheel', l, Xr),
          document.removeEventListener('touchmove', l, Xr),
          document.removeEventListener('touchstart', f, Xr));
      }
    );
  }, []);
  var v = e.removeScrollBar,
    S = e.inert;
  return d.createElement(
    d.Fragment,
    null,
    S ? d.createElement(s, { styles: OT(o) }) : null,
    v ? d.createElement(PT, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function FT(e) {
  for (var t = null; e !== null; ) (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
  return t;
}
const $T = pT(d0, LT);
var Nl = d.forwardRef(function (e, t) {
  return d.createElement(bl, Yt({}, e, { ref: t, sideCar: $T }));
});
Nl.classNames = bl.classNames;
var $c = ['Enter', ' '],
  zT = ['ArrowDown', 'PageUp', 'Home'],
  v0 = ['ArrowUp', 'PageDown', 'End'],
  BT = [...zT, ...v0],
  UT = { ltr: [...$c, 'ArrowRight'], rtl: [...$c, 'ArrowLeft'] },
  VT = { ltr: ['ArrowLeft'], rtl: ['ArrowRight'] },
  ci = 'Menu',
  [Xs, WT, HT] = al(ci),
  [Ur, g0] = dt(ci, [HT, Go, El]),
  Pl = Go(),
  y0 = El(),
  [KT, Vr] = Ur(ci),
  [GT, di] = Ur(ci),
  x0 = e => {
    const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e,
      a = Pl(t),
      [l, u] = d.useState(null),
      f = d.useRef(!1),
      p = Ge(s),
      m = Sl(o);
    return (
      d.useEffect(() => {
        const v = () => {
            ((f.current = !0),
              document.addEventListener('pointerdown', S, { capture: !0, once: !0 }),
              document.addEventListener('pointermove', S, { capture: !0, once: !0 }));
          },
          S = () => (f.current = !1);
        return (
          document.addEventListener('keydown', v, { capture: !0 }),
          () => {
            (document.removeEventListener('keydown', v, { capture: !0 }),
              document.removeEventListener('pointerdown', S, { capture: !0 }),
              document.removeEventListener('pointermove', S, { capture: !0 }));
          }
        );
      }, []),
      c.jsx(Ny, {
        ...a,
        children: c.jsx(KT, {
          scope: t,
          open: n,
          onOpenChange: p,
          content: l,
          onContentChange: u,
          children: c.jsx(GT, { scope: t, onClose: d.useCallback(() => p(!1), [p]), isUsingKeyboardRef: f, dir: m, modal: i, children: r }),
        }),
      })
    );
  };
x0.displayName = ci;
var QT = 'MenuAnchor',
  vf = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = Pl(n);
    return c.jsx(lf, { ...o, ...r, ref: t });
  });
vf.displayName = QT;
var gf = 'MenuPortal',
  [YT, w0] = Ur(gf, { forceMount: void 0 }),
  S0 = e => {
    const { __scopeMenu: t, forceMount: n, children: r, container: o } = e,
      s = Vr(gf, t);
    return c.jsx(YT, {
      scope: t,
      forceMount: n,
      children: c.jsx(Bt, { present: n || s.open, children: c.jsx(si, { asChild: !0, container: o, children: r }) }),
    });
  };
S0.displayName = gf;
var St = 'MenuContent',
  [XT, yf] = Ur(St),
  C0 = d.forwardRef((e, t) => {
    const n = w0(St, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      s = Vr(St, e.__scopeMenu),
      i = di(St, e.__scopeMenu);
    return c.jsx(Xs.Provider, {
      scope: e.__scopeMenu,
      children: c.jsx(Bt, {
        present: r || s.open,
        children: c.jsx(Xs.Slot, { scope: e.__scopeMenu, children: i.modal ? c.jsx(qT, { ...o, ref: t }) : c.jsx(ZT, { ...o, ref: t }) }),
      }),
    });
  }),
  qT = d.forwardRef((e, t) => {
    const n = Vr(St, e.__scopeMenu),
      r = d.useRef(null),
      o = oe(t, r);
    return (
      d.useEffect(() => {
        const s = r.current;
        if (s) return mf(s);
      }, []),
      c.jsx(xf, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: F(e.onFocusOutside, s => s.preventDefault(), { checkForDefaultPrevented: !1 }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  ZT = d.forwardRef((e, t) => {
    const n = Vr(St, e.__scopeMenu);
    return c.jsx(xf, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  JT = Ir('MenuContent.ScrollLock'),
  xf = d.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: r = !1,
        trapFocus: o,
        onOpenAutoFocus: s,
        onCloseAutoFocus: i,
        disableOutsidePointerEvents: a,
        onEntryFocus: l,
        onEscapeKeyDown: u,
        onPointerDownOutside: f,
        onFocusOutside: p,
        onInteractOutside: m,
        onDismiss: v,
        disableOutsideScroll: S,
        ...g
      } = e,
      w = Vr(St, n),
      x = di(St, n),
      h = Pl(n),
      y = y0(n),
      C = WT(n),
      [E, N] = d.useState(null),
      b = d.useRef(null),
      k = oe(t, b, w.onContentChange),
      M = d.useRef(0),
      j = d.useRef(''),
      $ = d.useRef(0),
      A = d.useRef(null),
      W = d.useRef('right'),
      I = d.useRef(0),
      G = S ? Nl : d.Fragment,
      z = S ? { as: JT, allowPinchZoom: !0 } : void 0,
      H = P => {
        var L, se;
        const O = j.current + P,
          V = C().filter(ie => !ie.disabled),
          U = document.activeElement,
          X = (L = V.find(ie => ie.ref.current === U)) == null ? void 0 : L.textValue,
          Y = V.map(ie => ie.textValue),
          de = dR(Y, O, X),
          fe = (se = V.find(ie => ie.textValue === de)) == null ? void 0 : se.ref.current;
        ((function ie(te) {
          ((j.current = te), window.clearTimeout(M.current), te !== '' && (M.current = window.setTimeout(() => ie(''), 1e3)));
        })(O),
          fe && setTimeout(() => fe.focus()));
      };
    (d.useEffect(() => () => window.clearTimeout(M.current), []), hf());
    const T = d.useCallback(P => {
      var V, U;
      return W.current === ((V = A.current) == null ? void 0 : V.side) && pR(P, (U = A.current) == null ? void 0 : U.area);
    }, []);
    return c.jsx(XT, {
      scope: n,
      searchRef: j,
      onItemEnter: d.useCallback(
        P => {
          T(P) && P.preventDefault();
        },
        [T]
      ),
      onItemLeave: d.useCallback(
        P => {
          var O;
          T(P) || ((O = b.current) == null || O.focus(), N(null));
        },
        [T]
      ),
      onTriggerLeave: d.useCallback(
        P => {
          T(P) && P.preventDefault();
        },
        [T]
      ),
      pointerGraceTimerRef: $,
      onPointerGraceIntentChange: d.useCallback(P => {
        A.current = P;
      }, []),
      children: c.jsx(G, {
        ...z,
        children: c.jsx(Cl, {
          asChild: !0,
          trapped: o,
          onMountAutoFocus: F(s, P => {
            var O;
            (P.preventDefault(), (O = b.current) == null || O.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: i,
          children: c.jsx(Vo, {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onEscapeKeyDown: u,
            onPointerDownOutside: f,
            onFocusOutside: p,
            onInteractOutside: m,
            onDismiss: v,
            children: c.jsx(i0, {
              asChild: !0,
              ...y,
              dir: x.dir,
              orientation: 'vertical',
              loop: r,
              currentTabStopId: E,
              onCurrentTabStopIdChange: N,
              onEntryFocus: F(l, P => {
                x.isUsingKeyboardRef.current || P.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: c.jsx(uf, {
                role: 'menu',
                'aria-orientation': 'vertical',
                'data-state': F0(w.open),
                'data-radix-menu-content': '',
                dir: x.dir,
                ...h,
                ...g,
                ref: k,
                style: { outline: 'none', ...g.style },
                onKeyDown: F(g.onKeyDown, P => {
                  const V = P.target.closest('[data-radix-menu-content]') === P.currentTarget,
                    U = P.ctrlKey || P.altKey || P.metaKey,
                    X = P.key.length === 1;
                  V && (P.key === 'Tab' && P.preventDefault(), !U && X && H(P.key));
                  const Y = b.current;
                  if (P.target !== Y || !BT.includes(P.key)) return;
                  P.preventDefault();
                  const fe = C()
                    .filter(L => !L.disabled)
                    .map(L => L.ref.current);
                  (v0.includes(P.key) && fe.reverse(), uR(fe));
                }),
                onBlur: F(e.onBlur, P => {
                  P.currentTarget.contains(P.target) || (window.clearTimeout(M.current), (j.current = ''));
                }),
                onPointerMove: F(
                  e.onPointerMove,
                  qs(P => {
                    const O = P.target,
                      V = I.current !== P.clientX;
                    if (P.currentTarget.contains(O) && V) {
                      const U = P.clientX > I.current ? 'right' : 'left';
                      ((W.current = U), (I.current = P.clientX));
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
C0.displayName = St;
var eR = 'MenuGroup',
  wf = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return c.jsx(K.div, { role: 'group', ...r, ref: t });
  });
wf.displayName = eR;
var tR = 'MenuLabel',
  E0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return c.jsx(K.div, { ...r, ref: t });
  });
E0.displayName = tR;
var La = 'MenuItem',
  Uh = 'menu.itemSelect',
  kl = d.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e,
      s = d.useRef(null),
      i = di(La, e.__scopeMenu),
      a = yf(La, e.__scopeMenu),
      l = oe(t, s),
      u = d.useRef(!1),
      f = () => {
        const p = s.current;
        if (!n && p) {
          const m = new CustomEvent(Uh, { bubbles: !0, cancelable: !0 });
          (p.addEventListener(Uh, v => (r == null ? void 0 : r(v)), { once: !0 }),
            Vd(p, m),
            m.defaultPrevented ? (u.current = !1) : i.onClose());
        }
      };
    return c.jsx(b0, {
      ...o,
      ref: l,
      disabled: n,
      onClick: F(e.onClick, f),
      onPointerDown: p => {
        var m;
        ((m = e.onPointerDown) == null || m.call(e, p), (u.current = !0));
      },
      onPointerUp: F(e.onPointerUp, p => {
        var m;
        u.current || (m = p.currentTarget) == null || m.click();
      }),
      onKeyDown: F(e.onKeyDown, p => {
        const m = a.searchRef.current !== '';
        n || (m && p.key === ' ') || ($c.includes(p.key) && (p.currentTarget.click(), p.preventDefault()));
      }),
    });
  });
kl.displayName = La;
var b0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e,
      i = yf(La, n),
      a = y0(n),
      l = d.useRef(null),
      u = oe(t, l),
      [f, p] = d.useState(!1),
      [m, v] = d.useState('');
    return (
      d.useEffect(() => {
        const S = l.current;
        S && v((S.textContent ?? '').trim());
      }, [s.children]),
      c.jsx(Xs.ItemSlot, {
        scope: n,
        disabled: r,
        textValue: o ?? m,
        children: c.jsx(a0, {
          asChild: !0,
          ...a,
          focusable: !r,
          children: c.jsx(K.div, {
            role: 'menuitem',
            'data-highlighted': f ? '' : void 0,
            'aria-disabled': r || void 0,
            'data-disabled': r ? '' : void 0,
            ...s,
            ref: u,
            onPointerMove: F(
              e.onPointerMove,
              qs(S => {
                r ? i.onItemLeave(S) : (i.onItemEnter(S), S.defaultPrevented || S.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: F(
              e.onPointerLeave,
              qs(S => i.onItemLeave(S))
            ),
            onFocus: F(e.onFocus, () => p(!0)),
            onBlur: F(e.onBlur, () => p(!1)),
          }),
        }),
      })
    );
  }),
  nR = 'MenuCheckboxItem',
  N0 = d.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return c.jsx(j0, {
      scope: e.__scopeMenu,
      checked: n,
      children: c.jsx(kl, {
        role: 'menuitemcheckbox',
        'aria-checked': Fa(n) ? 'mixed' : n,
        ...o,
        ref: t,
        'data-state': Cf(n),
        onSelect: F(o.onSelect, () => (r == null ? void 0 : r(Fa(n) ? !0 : !n)), { checkForDefaultPrevented: !1 }),
      }),
    });
  });
N0.displayName = nR;
var P0 = 'MenuRadioGroup',
  [rR, oR] = Ur(P0, { value: void 0, onValueChange: () => {} }),
  k0 = d.forwardRef((e, t) => {
    const { value: n, onValueChange: r, ...o } = e,
      s = Ge(r);
    return c.jsx(rR, { scope: e.__scopeMenu, value: n, onValueChange: s, children: c.jsx(wf, { ...o, ref: t }) });
  });
k0.displayName = P0;
var T0 = 'MenuRadioItem',
  R0 = d.forwardRef((e, t) => {
    const { value: n, ...r } = e,
      o = oR(T0, e.__scopeMenu),
      s = n === o.value;
    return c.jsx(j0, {
      scope: e.__scopeMenu,
      checked: s,
      children: c.jsx(kl, {
        role: 'menuitemradio',
        'aria-checked': s,
        ...r,
        ref: t,
        'data-state': Cf(s),
        onSelect: F(
          r.onSelect,
          () => {
            var i;
            return (i = o.onValueChange) == null ? void 0 : i.call(o, n);
          },
          { checkForDefaultPrevented: !1 }
        ),
      }),
    });
  });
R0.displayName = T0;
var Sf = 'MenuItemIndicator',
  [j0, sR] = Ur(Sf, { checked: !1 }),
  M0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e,
      s = sR(Sf, n);
    return c.jsx(Bt, {
      present: r || Fa(s.checked) || s.checked === !0,
      children: c.jsx(K.span, { ...o, ref: t, 'data-state': Cf(s.checked) }),
    });
  });
M0.displayName = Sf;
var iR = 'MenuSeparator',
  _0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return c.jsx(K.div, { role: 'separator', 'aria-orientation': 'horizontal', ...r, ref: t });
  });
_0.displayName = iR;
var aR = 'MenuArrow',
  I0 = d.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = Pl(n);
    return c.jsx(cf, { ...o, ...r, ref: t });
  });
I0.displayName = aR;
var lR = 'MenuSub',
  [WM, A0] = Ur(lR),
  ps = 'MenuSubTrigger',
  O0 = d.forwardRef((e, t) => {
    const n = Vr(ps, e.__scopeMenu),
      r = di(ps, e.__scopeMenu),
      o = A0(ps, e.__scopeMenu),
      s = yf(ps, e.__scopeMenu),
      i = d.useRef(null),
      { pointerGraceTimerRef: a, onPointerGraceIntentChange: l } = s,
      u = { __scopeMenu: e.__scopeMenu },
      f = d.useCallback(() => {
        (i.current && window.clearTimeout(i.current), (i.current = null));
      }, []);
    return (
      d.useEffect(() => f, [f]),
      d.useEffect(() => {
        const p = a.current;
        return () => {
          (window.clearTimeout(p), l(null));
        };
      }, [a, l]),
      c.jsx(vf, {
        asChild: !0,
        ...u,
        children: c.jsx(b0, {
          id: o.triggerId,
          'aria-haspopup': 'menu',
          'aria-expanded': n.open,
          'aria-controls': o.contentId,
          'data-state': F0(n.open),
          ...e,
          ref: il(t, o.onTriggerChange),
          onClick: p => {
            var m;
            ((m = e.onClick) == null || m.call(e, p),
              !(e.disabled || p.defaultPrevented) && (p.currentTarget.focus(), n.open || n.onOpenChange(!0)));
          },
          onPointerMove: F(
            e.onPointerMove,
            qs(p => {
              (s.onItemEnter(p),
                !p.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !i.current &&
                  (s.onPointerGraceIntentChange(null),
                  (i.current = window.setTimeout(() => {
                    (n.onOpenChange(!0), f());
                  }, 100))));
            })
          ),
          onPointerLeave: F(
            e.onPointerLeave,
            qs(p => {
              var v, S;
              f();
              const m = (v = n.content) == null ? void 0 : v.getBoundingClientRect();
              if (m) {
                const g = (S = n.content) == null ? void 0 : S.dataset.side,
                  w = g === 'right',
                  x = w ? -5 : 5,
                  h = m[w ? 'left' : 'right'],
                  y = m[w ? 'right' : 'left'];
                (s.onPointerGraceIntentChange({
                  area: [
                    { x: p.clientX + x, y: p.clientY },
                    { x: h, y: m.top },
                    { x: y, y: m.top },
                    { x: y, y: m.bottom },
                    { x: h, y: m.bottom },
                  ],
                  side: g,
                }),
                  window.clearTimeout(a.current),
                  (a.current = window.setTimeout(() => s.onPointerGraceIntentChange(null), 300)));
              } else {
                if ((s.onTriggerLeave(p), p.defaultPrevented)) return;
                s.onPointerGraceIntentChange(null);
              }
            })
          ),
          onKeyDown: F(e.onKeyDown, p => {
            var v;
            const m = s.searchRef.current !== '';
            e.disabled ||
              (m && p.key === ' ') ||
              (UT[r.dir].includes(p.key) && (n.onOpenChange(!0), (v = n.content) == null || v.focus(), p.preventDefault()));
          }),
        }),
      })
    );
  });
O0.displayName = ps;
var D0 = 'MenuSubContent',
  L0 = d.forwardRef((e, t) => {
    const n = w0(St, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      s = Vr(St, e.__scopeMenu),
      i = di(St, e.__scopeMenu),
      a = A0(D0, e.__scopeMenu),
      l = d.useRef(null),
      u = oe(t, l);
    return c.jsx(Xs.Provider, {
      scope: e.__scopeMenu,
      children: c.jsx(Bt, {
        present: r || s.open,
        children: c.jsx(Xs.Slot, {
          scope: e.__scopeMenu,
          children: c.jsx(xf, {
            id: a.contentId,
            'aria-labelledby': a.triggerId,
            ...o,
            ref: u,
            align: 'start',
            side: i.dir === 'rtl' ? 'left' : 'right',
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: f => {
              var p;
              (i.isUsingKeyboardRef.current && ((p = l.current) == null || p.focus()), f.preventDefault());
            },
            onCloseAutoFocus: f => f.preventDefault(),
            onFocusOutside: F(e.onFocusOutside, f => {
              f.target !== a.trigger && s.onOpenChange(!1);
            }),
            onEscapeKeyDown: F(e.onEscapeKeyDown, f => {
              (i.onClose(), f.preventDefault());
            }),
            onKeyDown: F(e.onKeyDown, f => {
              var v;
              const p = f.currentTarget.contains(f.target),
                m = VT[i.dir].includes(f.key);
              p && m && (s.onOpenChange(!1), (v = a.trigger) == null || v.focus(), f.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
L0.displayName = D0;
function F0(e) {
  return e ? 'open' : 'closed';
}
function Fa(e) {
  return e === 'indeterminate';
}
function Cf(e) {
  return Fa(e) ? 'indeterminate' : e ? 'checked' : 'unchecked';
}
function uR(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function cR(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function dR(e, t, n) {
  const o = t.length > 1 && Array.from(t).every(u => u === t[0]) ? t[0] : t,
    s = n ? e.indexOf(n) : -1;
  let i = cR(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter(u => u !== n));
  const l = i.find(u => u.toLowerCase().startsWith(o.toLowerCase()));
  return l !== n ? l : void 0;
}
function fR(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s],
      l = t[i],
      u = a.x,
      f = a.y,
      p = l.x,
      m = l.y;
    f > r != m > r && n < ((p - u) * (r - f)) / (m - f) + u && (o = !o);
  }
  return o;
}
function pR(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return fR(n, t);
}
function qs(e) {
  return t => (t.pointerType === 'mouse' ? e(t) : void 0);
}
var hR = x0,
  mR = vf,
  vR = S0,
  gR = C0,
  yR = wf,
  xR = E0,
  wR = kl,
  SR = N0,
  CR = k0,
  ER = R0,
  bR = M0,
  NR = _0,
  PR = I0,
  kR = O0,
  TR = L0,
  Tl = 'DropdownMenu',
  [RR, HM] = dt(Tl, [g0]),
  Xe = g0(),
  [jR, $0] = RR(Tl),
  z0 = e => {
    const { __scopeDropdownMenu: t, children: n, dir: r, open: o, defaultOpen: s, onOpenChange: i, modal: a = !0 } = e,
      l = Xe(t),
      u = d.useRef(null),
      [f, p] = nr({ prop: o, defaultProp: s ?? !1, onChange: i, caller: Tl });
    return c.jsx(jR, {
      scope: t,
      triggerId: Jt(),
      triggerRef: u,
      contentId: Jt(),
      open: f,
      onOpenChange: p,
      onOpenToggle: d.useCallback(() => p(m => !m), [p]),
      modal: a,
      children: c.jsx(hR, { ...l, open: f, onOpenChange: p, dir: r, modal: a, children: n }),
    });
  };
z0.displayName = Tl;
var B0 = 'DropdownMenuTrigger',
  U0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e,
      s = $0(B0, n),
      i = Xe(n);
    return c.jsx(mR, {
      asChild: !0,
      ...i,
      children: c.jsx(K.button, {
        type: 'button',
        id: s.triggerId,
        'aria-haspopup': 'menu',
        'aria-expanded': s.open,
        'aria-controls': s.open ? s.contentId : void 0,
        'data-state': s.open ? 'open' : 'closed',
        'data-disabled': r ? '' : void 0,
        disabled: r,
        ...o,
        ref: il(t, s.triggerRef),
        onPointerDown: F(e.onPointerDown, a => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: F(e.onKeyDown, a => {
          r ||
            (['Enter', ' '].includes(a.key) && s.onOpenToggle(),
            a.key === 'ArrowDown' && s.onOpenChange(!0),
            ['Enter', ' ', 'ArrowDown'].includes(a.key) && a.preventDefault());
        }),
      }),
    });
  });
U0.displayName = B0;
var MR = 'DropdownMenuPortal',
  V0 = e => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = Xe(t);
    return c.jsx(vR, { ...r, ...n });
  };
V0.displayName = MR;
var W0 = 'DropdownMenuContent',
  H0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = $0(W0, n),
      s = Xe(n),
      i = d.useRef(!1);
    return c.jsx(gR, {
      id: o.contentId,
      'aria-labelledby': o.triggerId,
      ...s,
      ...r,
      ref: t,
      onCloseAutoFocus: F(e.onCloseAutoFocus, a => {
        var l;
        (i.current || (l = o.triggerRef.current) == null || l.focus(), (i.current = !1), a.preventDefault());
      }),
      onInteractOutside: F(e.onInteractOutside, a => {
        const l = a.detail.originalEvent,
          u = l.button === 0 && l.ctrlKey === !0,
          f = l.button === 2 || u;
        (!o.modal || f) && (i.current = !0);
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
H0.displayName = W0;
var _R = 'DropdownMenuGroup',
  IR = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(yR, { ...o, ...r, ref: t });
  });
IR.displayName = _R;
var AR = 'DropdownMenuLabel',
  K0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(xR, { ...o, ...r, ref: t });
  });
K0.displayName = AR;
var OR = 'DropdownMenuItem',
  G0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(wR, { ...o, ...r, ref: t });
  });
G0.displayName = OR;
var DR = 'DropdownMenuCheckboxItem',
  Q0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(SR, { ...o, ...r, ref: t });
  });
Q0.displayName = DR;
var LR = 'DropdownMenuRadioGroup',
  FR = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(CR, { ...o, ...r, ref: t });
  });
FR.displayName = LR;
var $R = 'DropdownMenuRadioItem',
  Y0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(ER, { ...o, ...r, ref: t });
  });
Y0.displayName = $R;
var zR = 'DropdownMenuItemIndicator',
  X0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(bR, { ...o, ...r, ref: t });
  });
X0.displayName = zR;
var BR = 'DropdownMenuSeparator',
  q0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(NR, { ...o, ...r, ref: t });
  });
q0.displayName = BR;
var UR = 'DropdownMenuArrow',
  VR = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(PR, { ...o, ...r, ref: t });
  });
VR.displayName = UR;
var WR = 'DropdownMenuSubTrigger',
  Z0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(kR, { ...o, ...r, ref: t });
  });
Z0.displayName = WR;
var HR = 'DropdownMenuSubContent',
  J0 = d.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Xe(n);
    return c.jsx(TR, {
      ...o,
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
J0.displayName = HR;
var KR = z0,
  GR = U0,
  QR = V0,
  ex = H0,
  tx = K0,
  nx = G0,
  rx = Q0,
  ox = Y0,
  sx = X0,
  ix = q0,
  ax = Z0,
  lx = J0;
const ux = KR,
  cx = GR,
  YR = d.forwardRef(({ className: e, inset: t, children: n, ...r }, o) =>
    c.jsxs(ax, {
      ref: o,
      className: Q(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
        t && 'pl-8',
        e
      ),
      ...r,
      children: [n, c.jsx(UE, { className: 'ml-auto h-4 w-4' })],
    })
  );
YR.displayName = ax.displayName;
const XR = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(lx, {
    ref: n,
    className: Q(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      e
    ),
    ...t,
  })
);
XR.displayName = lx.displayName;
const Ef = d.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
  c.jsx(QR, {
    children: c.jsx(ex, {
      ref: r,
      sideOffset: t,
      className: Q(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        e
      ),
      ...n,
    }),
  })
);
Ef.displayName = ex.displayName;
const wo = d.forwardRef(({ className: e, inset: t, ...n }, r) =>
  c.jsx(nx, {
    ref: r,
    className: Q(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      t && 'pl-8',
      e
    ),
    ...n,
  })
);
wo.displayName = nx.displayName;
const qR = d.forwardRef(({ className: e, children: t, checked: n, ...r }, o) =>
  c.jsxs(rx, {
    ref: o,
    className: Q(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    checked: n,
    ...r,
    children: [
      c.jsx('span', {
        className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: c.jsx(sx, { children: c.jsx(Wg, { className: 'h-4 w-4' }) }),
      }),
      t,
    ],
  })
);
qR.displayName = rx.displayName;
const ZR = d.forwardRef(({ className: e, children: t, ...n }, r) =>
  c.jsxs(ox, {
    ref: r,
    className: Q(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    ...n,
    children: [
      c.jsx('span', {
        className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: c.jsx(sx, { children: c.jsx(HE, { className: 'h-2 w-2 fill-current' }) }),
      }),
      t,
    ],
  })
);
ZR.displayName = ox.displayName;
const JR = d.forwardRef(({ className: e, inset: t, ...n }, r) =>
  c.jsx(tx, { ref: r, className: Q('px-2 py-1.5 text-sm font-semibold', t && 'pl-8', e), ...n })
);
JR.displayName = tx.displayName;
const ej = d.forwardRef(({ className: e, ...t }, n) => c.jsx(ix, { ref: n, className: Q('-mx-1 my-1 h-px bg-muted', e), ...t }));
ej.displayName = ix.displayName;
function tj({ onSettingsClick: e }) {
  const t = [{ to: '/', icon: QE, label: 'Home' }];
  return c.jsxs('nav', {
    className: 'flex items-center justify-between w-full',
    children: [
      c.jsx('div', {
        className: 'flex items-center gap-1',
        children: t.map(n =>
          c.jsxs(
            Mk,
            {
              to: n.to,
              className: ({ isActive: r }) =>
                Q(
                  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  'hover:bg-primary/10 hover:text-primary',
                  r ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted-foreground'
                ),
              children: [c.jsx(n.icon, { className: 'w-4 h-4' }), c.jsx('span', { className: 'hidden sm:inline', children: n.label })],
            },
            n.to
          )
        ),
      }),
      c.jsxs('div', {
        className: 'flex items-center gap-2',
        children: [
          c.jsx(xt, { variant: 'mining', size: 'icon', onClick: e, children: c.jsx(Ec, { className: 'w-4 h-4' }) }),
          c.jsxs(ux, {
            children: [
              c.jsx(cx, {
                asChild: !0,
                children: c.jsx(xt, { variant: 'destructive', size: 'icon', children: c.jsx(ZE, { className: 'w-4 h-4' }) }),
              }),
              c.jsxs(Ef, {
                align: 'end',
                children: [
                  c.jsxs(wo, { children: [c.jsx(XE, { className: 'w-4 h-4 mr-2' }), 'Minimize'] }),
                  c.jsxs(wo, { children: [c.jsx(Xd, { className: 'w-4 h-4 mr-2' }), 'Exit'] }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const zc = d.forwardRef(({ className: e, type: t, ...n }, r) =>
  c.jsx('input', {
    type: t,
    className: Q(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      e
    ),
    ref: r,
    ...n,
  })
);
zc.displayName = 'Input';
var nj = 'Label',
  dx = d.forwardRef((e, t) =>
    c.jsx(K.label, {
      ...e,
      ref: t,
      onMouseDown: n => {
        var o;
        n.target.closest('button, input, select, textarea') ||
          ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
      },
    })
  );
dx.displayName = nj;
var fx = dx;
const rj = cl('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'),
  _n = d.forwardRef(({ className: e, ...t }, n) => c.jsx(fx, { ref: n, className: Q(rj(), e), ...t }));
_n.displayName = fx.displayName;
function px(e) {
  const t = d.useRef({ value: e, previous: e });
  return d.useMemo(
    () => (t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)), t.current.previous),
    [e]
  );
}
var Rl = 'Switch',
  [oj, KM] = dt(Rl),
  [sj, ij] = oj(Rl),
  hx = d.forwardRef((e, t) => {
    const {
        __scopeSwitch: n,
        name: r,
        checked: o,
        defaultChecked: s,
        required: i,
        disabled: a,
        value: l = 'on',
        onCheckedChange: u,
        form: f,
        ...p
      } = e,
      [m, v] = d.useState(null),
      S = oe(t, y => v(y)),
      g = d.useRef(!1),
      w = m ? f || !!m.closest('form') : !0,
      [x, h] = nr({ prop: o, defaultProp: s ?? !1, onChange: u, caller: Rl });
    return c.jsxs(sj, {
      scope: n,
      checked: x,
      disabled: a,
      children: [
        c.jsx(K.button, {
          type: 'button',
          role: 'switch',
          'aria-checked': x,
          'aria-required': i,
          'data-state': yx(x),
          'data-disabled': a ? '' : void 0,
          disabled: a,
          value: l,
          ...p,
          ref: S,
          onClick: F(e.onClick, y => {
            (h(C => !C), w && ((g.current = y.isPropagationStopped()), g.current || y.stopPropagation()));
          }),
        }),
        w &&
          c.jsx(gx, {
            control: m,
            bubbles: !g.current,
            name: r,
            value: l,
            checked: x,
            required: i,
            disabled: a,
            form: f,
            style: { transform: 'translateX(-100%)' },
          }),
      ],
    });
  });
hx.displayName = Rl;
var mx = 'SwitchThumb',
  vx = d.forwardRef((e, t) => {
    const { __scopeSwitch: n, ...r } = e,
      o = ij(mx, n);
    return c.jsx(K.span, { 'data-state': yx(o.checked), 'data-disabled': o.disabled ? '' : void 0, ...r, ref: t });
  });
vx.displayName = mx;
var aj = 'SwitchBubbleInput',
  gx = d.forwardRef(({ __scopeSwitch: e, control: t, checked: n, bubbles: r = !0, ...o }, s) => {
    const i = d.useRef(null),
      a = oe(i, s),
      l = px(n),
      u = my(t);
    return (
      d.useEffect(() => {
        const f = i.current;
        if (!f) return;
        const p = window.HTMLInputElement.prototype,
          v = Object.getOwnPropertyDescriptor(p, 'checked').set;
        if (l !== n && v) {
          const S = new Event('click', { bubbles: r });
          (v.call(f, n), f.dispatchEvent(S));
        }
      }, [l, n, r]),
      c.jsx('input', {
        type: 'checkbox',
        'aria-hidden': !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: a,
        style: { ...o.style, ...u, position: 'absolute', pointerEvents: 'none', opacity: 0, margin: 0 },
      })
    );
  });
gx.displayName = aj;
function yx(e) {
  return e ? 'checked' : 'unchecked';
}
var xx = hx,
  lj = vx;
const oa = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(xx, {
    className: Q(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      e
    ),
    ...t,
    ref: n,
    children: c.jsx(lj, {
      className: Q(
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
      ),
    }),
  })
);
oa.displayName = xx.displayName;
function Vh(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var uj = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
  cj = [' ', 'Enter'],
  Or = 'Select',
  [jl, Ml, dj] = al(Or),
  [Xo, GM] = dt(Or, [dj, Go]),
  _l = Go(),
  [fj, ur] = Xo(Or),
  [pj, hj] = Xo(Or),
  wx = e => {
    const {
        __scopeSelect: t,
        children: n,
        open: r,
        defaultOpen: o,
        onOpenChange: s,
        value: i,
        defaultValue: a,
        onValueChange: l,
        dir: u,
        name: f,
        autoComplete: p,
        disabled: m,
        required: v,
        form: S,
      } = e,
      g = _l(t),
      [w, x] = d.useState(null),
      [h, y] = d.useState(null),
      [C, E] = d.useState(!1),
      N = Sl(u),
      [b, k] = nr({ prop: r, defaultProp: o ?? !1, onChange: s, caller: Or }),
      [M, j] = nr({ prop: i, defaultProp: a, onChange: l, caller: Or }),
      $ = d.useRef(null),
      A = w ? S || !!w.closest('form') : !0,
      [W, I] = d.useState(new Set()),
      G = Array.from(W)
        .map(z => z.props.value)
        .join(';');
    return c.jsx(Ny, {
      ...g,
      children: c.jsxs(fj, {
        required: v,
        scope: t,
        trigger: w,
        onTriggerChange: x,
        valueNode: h,
        onValueNodeChange: y,
        valueNodeHasChildren: C,
        onValueNodeHasChildrenChange: E,
        contentId: Jt(),
        value: M,
        onValueChange: j,
        open: b,
        onOpenChange: k,
        dir: N,
        triggerPointerDownPosRef: $,
        disabled: m,
        children: [
          c.jsx(jl.Provider, {
            scope: t,
            children: c.jsx(pj, {
              scope: e.__scopeSelect,
              onNativeOptionAdd: d.useCallback(z => {
                I(H => new Set(H).add(z));
              }, []),
              onNativeOptionRemove: d.useCallback(z => {
                I(H => {
                  const T = new Set(H);
                  return (T.delete(z), T);
                });
              }, []),
              children: n,
            }),
          }),
          A
            ? c.jsxs(
                Wx,
                {
                  'aria-hidden': !0,
                  required: v,
                  tabIndex: -1,
                  name: f,
                  autoComplete: p,
                  value: M,
                  onChange: z => j(z.target.value),
                  disabled: m,
                  form: S,
                  children: [M === void 0 ? c.jsx('option', { value: '' }) : null, Array.from(W)],
                },
                G
              )
            : null,
        ],
      }),
    });
  };
wx.displayName = Or;
var Sx = 'SelectTrigger',
  Cx = d.forwardRef((e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e,
      s = _l(n),
      i = ur(Sx, n),
      a = i.disabled || r,
      l = oe(t, i.onTriggerChange),
      u = Ml(n),
      f = d.useRef('touch'),
      [p, m, v] = Kx(g => {
        const w = u().filter(y => !y.disabled),
          x = w.find(y => y.value === i.value),
          h = Gx(w, g, x);
        h !== void 0 && i.onValueChange(h.value);
      }),
      S = g => {
        (a || (i.onOpenChange(!0), v()), g && (i.triggerPointerDownPosRef.current = { x: Math.round(g.pageX), y: Math.round(g.pageY) }));
      };
    return c.jsx(lf, {
      asChild: !0,
      ...s,
      children: c.jsx(K.button, {
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
        'data-placeholder': Hx(i.value) ? '' : void 0,
        ...o,
        ref: l,
        onClick: F(o.onClick, g => {
          (g.currentTarget.focus(), f.current !== 'mouse' && S(g));
        }),
        onPointerDown: F(o.onPointerDown, g => {
          f.current = g.pointerType;
          const w = g.target;
          (w.hasPointerCapture(g.pointerId) && w.releasePointerCapture(g.pointerId),
            g.button === 0 && g.ctrlKey === !1 && g.pointerType === 'mouse' && (S(g), g.preventDefault()));
        }),
        onKeyDown: F(o.onKeyDown, g => {
          const w = p.current !== '';
          (!(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && m(g.key),
            !(w && g.key === ' ') && uj.includes(g.key) && (S(), g.preventDefault()));
        }),
      }),
    });
  });
Cx.displayName = Sx;
var Ex = 'SelectValue',
  bx = d.forwardRef((e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: s, placeholder: i = '', ...a } = e,
      l = ur(Ex, n),
      { onValueNodeHasChildrenChange: u } = l,
      f = s !== void 0,
      p = oe(t, l.onValueNodeChange);
    return (
      Te(() => {
        u(f);
      }, [u, f]),
      c.jsx(K.span, { ...a, ref: p, style: { pointerEvents: 'none' }, children: Hx(l.value) ? c.jsx(c.Fragment, { children: i }) : s })
    );
  });
bx.displayName = Ex;
var mj = 'SelectIcon',
  Nx = d.forwardRef((e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return c.jsx(K.span, { 'aria-hidden': !0, ...o, ref: t, children: r || '▼' });
  });
Nx.displayName = mj;
var vj = 'SelectPortal',
  Px = e => c.jsx(si, { asChild: !0, ...e });
Px.displayName = vj;
var Dr = 'SelectContent',
  kx = d.forwardRef((e, t) => {
    const n = ur(Dr, e.__scopeSelect),
      [r, o] = d.useState();
    if (
      (Te(() => {
        o(new DocumentFragment());
      }, []),
      !n.open)
    ) {
      const s = r;
      return s
        ? zr.createPortal(
            c.jsx(Tx, {
              scope: e.__scopeSelect,
              children: c.jsx(jl.Slot, { scope: e.__scopeSelect, children: c.jsx('div', { children: e.children }) }),
            }),
            s
          )
        : null;
    }
    return c.jsx(Rx, { ...e, ref: t });
  });
kx.displayName = Dr;
var Rt = 10,
  [Tx, cr] = Xo(Dr),
  gj = 'SelectContentImpl',
  yj = Ir('SelectContent.RemoveScroll'),
  Rx = d.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        position: r = 'item-aligned',
        onCloseAutoFocus: o,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        side: a,
        sideOffset: l,
        align: u,
        alignOffset: f,
        arrowPadding: p,
        collisionBoundary: m,
        collisionPadding: v,
        sticky: S,
        hideWhenDetached: g,
        avoidCollisions: w,
        ...x
      } = e,
      h = ur(Dr, n),
      [y, C] = d.useState(null),
      [E, N] = d.useState(null),
      b = oe(t, L => C(L)),
      [k, M] = d.useState(null),
      [j, $] = d.useState(null),
      A = Ml(n),
      [W, I] = d.useState(!1),
      G = d.useRef(!1);
    (d.useEffect(() => {
      if (y) return mf(y);
    }, [y]),
      hf());
    const z = d.useCallback(
        L => {
          const [se, ...ie] = A().map(ae => ae.ref.current),
            [te] = ie.slice(-1),
            ne = document.activeElement;
          for (const ae of L)
            if (
              ae === ne ||
              (ae == null || ae.scrollIntoView({ block: 'nearest' }),
              ae === se && E && (E.scrollTop = 0),
              ae === te && E && (E.scrollTop = E.scrollHeight),
              ae == null || ae.focus(),
              document.activeElement !== ne)
            )
              return;
        },
        [A, E]
      ),
      H = d.useCallback(() => z([k, y]), [z, k, y]);
    d.useEffect(() => {
      W && H();
    }, [W, H]);
    const { onOpenChange: T, triggerPointerDownPosRef: P } = h;
    (d.useEffect(() => {
      if (y) {
        let L = { x: 0, y: 0 };
        const se = te => {
            var ne, ae;
            L = {
              x: Math.abs(Math.round(te.pageX) - (((ne = P.current) == null ? void 0 : ne.x) ?? 0)),
              y: Math.abs(Math.round(te.pageY) - (((ae = P.current) == null ? void 0 : ae.y) ?? 0)),
            };
          },
          ie = te => {
            (L.x <= 10 && L.y <= 10 ? te.preventDefault() : y.contains(te.target) || T(!1),
              document.removeEventListener('pointermove', se),
              (P.current = null));
          };
        return (
          P.current !== null &&
            (document.addEventListener('pointermove', se), document.addEventListener('pointerup', ie, { capture: !0, once: !0 })),
          () => {
            (document.removeEventListener('pointermove', se), document.removeEventListener('pointerup', ie, { capture: !0 }));
          }
        );
      }
    }, [y, T, P]),
      d.useEffect(() => {
        const L = () => T(!1);
        return (
          window.addEventListener('blur', L),
          window.addEventListener('resize', L),
          () => {
            (window.removeEventListener('blur', L), window.removeEventListener('resize', L));
          }
        );
      }, [T]));
    const [O, V] = Kx(L => {
        const se = A().filter(ne => !ne.disabled),
          ie = se.find(ne => ne.ref.current === document.activeElement),
          te = Gx(se, L, ie);
        te && setTimeout(() => te.ref.current.focus());
      }),
      U = d.useCallback(
        (L, se, ie) => {
          const te = !G.current && !ie;
          ((h.value !== void 0 && h.value === se) || te) && (M(L), te && (G.current = !0));
        },
        [h.value]
      ),
      X = d.useCallback(() => (y == null ? void 0 : y.focus()), [y]),
      Y = d.useCallback(
        (L, se, ie) => {
          const te = !G.current && !ie;
          ((h.value !== void 0 && h.value === se) || te) && $(L);
        },
        [h.value]
      ),
      de = r === 'popper' ? Bc : jx,
      fe =
        de === Bc
          ? {
              side: a,
              sideOffset: l,
              align: u,
              alignOffset: f,
              arrowPadding: p,
              collisionBoundary: m,
              collisionPadding: v,
              sticky: S,
              hideWhenDetached: g,
              avoidCollisions: w,
            }
          : {};
    return c.jsx(Tx, {
      scope: n,
      content: y,
      viewport: E,
      onViewportChange: N,
      itemRefCallback: U,
      selectedItem: k,
      onItemLeave: X,
      itemTextRefCallback: Y,
      focusSelectedItem: H,
      selectedItemText: j,
      position: r,
      isPositioned: W,
      searchRef: O,
      children: c.jsx(Nl, {
        as: yj,
        allowPinchZoom: !0,
        children: c.jsx(Cl, {
          asChild: !0,
          trapped: h.open,
          onMountAutoFocus: L => {
            L.preventDefault();
          },
          onUnmountAutoFocus: F(o, L => {
            var se;
            ((se = h.trigger) == null || se.focus({ preventScroll: !0 }), L.preventDefault());
          }),
          children: c.jsx(Vo, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: s,
            onPointerDownOutside: i,
            onFocusOutside: L => L.preventDefault(),
            onDismiss: () => h.onOpenChange(!1),
            children: c.jsx(de, {
              role: 'listbox',
              id: h.contentId,
              'data-state': h.open ? 'open' : 'closed',
              dir: h.dir,
              onContextMenu: L => L.preventDefault(),
              ...x,
              ...fe,
              onPlaced: () => I(!0),
              ref: b,
              style: { display: 'flex', flexDirection: 'column', outline: 'none', ...x.style },
              onKeyDown: F(x.onKeyDown, L => {
                const se = L.ctrlKey || L.altKey || L.metaKey;
                if (
                  (L.key === 'Tab' && L.preventDefault(),
                  !se && L.key.length === 1 && V(L.key),
                  ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(L.key))
                ) {
                  let te = A()
                    .filter(ne => !ne.disabled)
                    .map(ne => ne.ref.current);
                  if ((['ArrowUp', 'End'].includes(L.key) && (te = te.slice().reverse()), ['ArrowUp', 'ArrowDown'].includes(L.key))) {
                    const ne = L.target,
                      ae = te.indexOf(ne);
                    te = te.slice(ae + 1);
                  }
                  (setTimeout(() => z(te)), L.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
Rx.displayName = gj;
var xj = 'SelectItemAlignedPosition',
  jx = d.forwardRef((e, t) => {
    const { __scopeSelect: n, onPlaced: r, ...o } = e,
      s = ur(Dr, n),
      i = cr(Dr, n),
      [a, l] = d.useState(null),
      [u, f] = d.useState(null),
      p = oe(t, b => f(b)),
      m = Ml(n),
      v = d.useRef(!1),
      S = d.useRef(!0),
      { viewport: g, selectedItem: w, selectedItemText: x, focusSelectedItem: h } = i,
      y = d.useCallback(() => {
        if (s.trigger && s.valueNode && a && u && g && w && x) {
          const b = s.trigger.getBoundingClientRect(),
            k = u.getBoundingClientRect(),
            M = s.valueNode.getBoundingClientRect(),
            j = x.getBoundingClientRect();
          if (s.dir !== 'rtl') {
            const ne = j.left - k.left,
              ae = M.left - ne,
              De = b.left - ae,
              ft = b.width + De,
              dr = Math.max(ft, k.width),
              En = window.innerWidth - Rt,
              fr = Vh(ae, [Rt, Math.max(Rt, En - dr)]);
            ((a.style.minWidth = ft + 'px'), (a.style.left = fr + 'px'));
          } else {
            const ne = k.right - j.right,
              ae = window.innerWidth - M.right - ne,
              De = window.innerWidth - b.right - ae,
              ft = b.width + De,
              dr = Math.max(ft, k.width),
              En = window.innerWidth - Rt,
              fr = Vh(ae, [Rt, Math.max(Rt, En - dr)]);
            ((a.style.minWidth = ft + 'px'), (a.style.right = fr + 'px'));
          }
          const $ = m(),
            A = window.innerHeight - Rt * 2,
            W = g.scrollHeight,
            I = window.getComputedStyle(u),
            G = parseInt(I.borderTopWidth, 10),
            z = parseInt(I.paddingTop, 10),
            H = parseInt(I.borderBottomWidth, 10),
            T = parseInt(I.paddingBottom, 10),
            P = G + z + W + T + H,
            O = Math.min(w.offsetHeight * 5, P),
            V = window.getComputedStyle(g),
            U = parseInt(V.paddingTop, 10),
            X = parseInt(V.paddingBottom, 10),
            Y = b.top + b.height / 2 - Rt,
            de = A - Y,
            fe = w.offsetHeight / 2,
            L = w.offsetTop + fe,
            se = G + z + L,
            ie = P - se;
          if (se <= Y) {
            const ne = $.length > 0 && w === $[$.length - 1].ref.current;
            a.style.bottom = '0px';
            const ae = u.clientHeight - g.offsetTop - g.offsetHeight,
              De = Math.max(de, fe + (ne ? X : 0) + ae + H),
              ft = se + De;
            a.style.height = ft + 'px';
          } else {
            const ne = $.length > 0 && w === $[0].ref.current;
            a.style.top = '0px';
            const De = Math.max(Y, G + g.offsetTop + (ne ? U : 0) + fe) + ie;
            ((a.style.height = De + 'px'), (g.scrollTop = se - Y + g.offsetTop));
          }
          ((a.style.margin = `${Rt}px 0`),
            (a.style.minHeight = O + 'px'),
            (a.style.maxHeight = A + 'px'),
            r == null || r(),
            requestAnimationFrame(() => (v.current = !0)));
        }
      }, [m, s.trigger, s.valueNode, a, u, g, w, x, s.dir, r]);
    Te(() => y(), [y]);
    const [C, E] = d.useState();
    Te(() => {
      u && E(window.getComputedStyle(u).zIndex);
    }, [u]);
    const N = d.useCallback(
      b => {
        b && S.current === !0 && (y(), h == null || h(), (S.current = !1));
      },
      [y, h]
    );
    return c.jsx(Sj, {
      scope: n,
      contentWrapper: a,
      shouldExpandOnScrollRef: v,
      onScrollButtonChange: N,
      children: c.jsx('div', {
        ref: l,
        style: { display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: C },
        children: c.jsx(K.div, { ...o, ref: p, style: { boxSizing: 'border-box', maxHeight: '100%', ...o.style } }),
      }),
    });
  });
jx.displayName = xj;
var wj = 'SelectPopperPosition',
  Bc = d.forwardRef((e, t) => {
    const { __scopeSelect: n, align: r = 'start', collisionPadding: o = Rt, ...s } = e,
      i = _l(n);
    return c.jsx(uf, {
      ...i,
      ...s,
      ref: t,
      align: r,
      collisionPadding: o,
      style: {
        boxSizing: 'border-box',
        ...s.style,
        '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    });
  });
Bc.displayName = wj;
var [Sj, bf] = Xo(Dr, {}),
  Uc = 'SelectViewport',
  Mx = d.forwardRef((e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e,
      s = cr(Uc, n),
      i = bf(Uc, n),
      a = oe(t, s.onViewportChange),
      l = d.useRef(0);
    return c.jsxs(c.Fragment, {
      children: [
        c.jsx('style', {
          dangerouslySetInnerHTML: {
            __html:
              '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
          },
          nonce: r,
        }),
        c.jsx(jl.Slot, {
          scope: n,
          children: c.jsx(K.div, {
            'data-radix-select-viewport': '',
            role: 'presentation',
            ...o,
            ref: a,
            style: { position: 'relative', flex: 1, overflow: 'hidden auto', ...o.style },
            onScroll: F(o.onScroll, u => {
              const f = u.currentTarget,
                { contentWrapper: p, shouldExpandOnScrollRef: m } = i;
              if (m != null && m.current && p) {
                const v = Math.abs(l.current - f.scrollTop);
                if (v > 0) {
                  const S = window.innerHeight - Rt * 2,
                    g = parseFloat(p.style.minHeight),
                    w = parseFloat(p.style.height),
                    x = Math.max(g, w);
                  if (x < S) {
                    const h = x + v,
                      y = Math.min(S, h),
                      C = h - y;
                    ((p.style.height = y + 'px'),
                      p.style.bottom === '0px' && ((f.scrollTop = C > 0 ? C : 0), (p.style.justifyContent = 'flex-end')));
                  }
                }
              }
              l.current = f.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
Mx.displayName = Uc;
var _x = 'SelectGroup',
  [Cj, Ej] = Xo(_x),
  bj = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      o = Jt();
    return c.jsx(Cj, { scope: n, id: o, children: c.jsx(K.div, { role: 'group', 'aria-labelledby': o, ...r, ref: t }) });
  });
bj.displayName = _x;
var Ix = 'SelectLabel',
  Ax = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      o = Ej(Ix, n);
    return c.jsx(K.div, { id: o.id, ...r, ref: t });
  });
Ax.displayName = Ix;
var $a = 'SelectItem',
  [Nj, Ox] = Xo($a),
  Dx = d.forwardRef((e, t) => {
    const { __scopeSelect: n, value: r, disabled: o = !1, textValue: s, ...i } = e,
      a = ur($a, n),
      l = cr($a, n),
      u = a.value === r,
      [f, p] = d.useState(s ?? ''),
      [m, v] = d.useState(!1),
      S = oe(t, h => {
        var y;
        return (y = l.itemRefCallback) == null ? void 0 : y.call(l, h, r, o);
      }),
      g = Jt(),
      w = d.useRef('touch'),
      x = () => {
        o || (a.onValueChange(r), a.onOpenChange(!1));
      };
    if (r === '')
      throw new Error(
        'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.'
      );
    return c.jsx(Nj, {
      scope: n,
      value: r,
      disabled: o,
      textId: g,
      isSelected: u,
      onItemTextChange: d.useCallback(h => {
        p(y => y || ((h == null ? void 0 : h.textContent) ?? '').trim());
      }, []),
      children: c.jsx(jl.ItemSlot, {
        scope: n,
        value: r,
        disabled: o,
        textValue: f,
        children: c.jsx(K.div, {
          role: 'option',
          'aria-labelledby': g,
          'data-highlighted': m ? '' : void 0,
          'aria-selected': u && m,
          'data-state': u ? 'checked' : 'unchecked',
          'aria-disabled': o || void 0,
          'data-disabled': o ? '' : void 0,
          tabIndex: o ? void 0 : -1,
          ...i,
          ref: S,
          onFocus: F(i.onFocus, () => v(!0)),
          onBlur: F(i.onBlur, () => v(!1)),
          onClick: F(i.onClick, () => {
            w.current !== 'mouse' && x();
          }),
          onPointerUp: F(i.onPointerUp, () => {
            w.current === 'mouse' && x();
          }),
          onPointerDown: F(i.onPointerDown, h => {
            w.current = h.pointerType;
          }),
          onPointerMove: F(i.onPointerMove, h => {
            var y;
            ((w.current = h.pointerType),
              o ? (y = l.onItemLeave) == null || y.call(l) : w.current === 'mouse' && h.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: F(i.onPointerLeave, h => {
            var y;
            h.currentTarget === document.activeElement && ((y = l.onItemLeave) == null || y.call(l));
          }),
          onKeyDown: F(i.onKeyDown, h => {
            var C;
            (((C = l.searchRef) == null ? void 0 : C.current) !== '' && h.key === ' ') ||
              (cj.includes(h.key) && x(), h.key === ' ' && h.preventDefault());
          }),
        }),
      }),
    });
  });
Dx.displayName = $a;
var hs = 'SelectItemText',
  Lx = d.forwardRef((e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...s } = e,
      i = ur(hs, n),
      a = cr(hs, n),
      l = Ox(hs, n),
      u = hj(hs, n),
      [f, p] = d.useState(null),
      m = oe(
        t,
        x => p(x),
        l.onItemTextChange,
        x => {
          var h;
          return (h = a.itemTextRefCallback) == null ? void 0 : h.call(a, x, l.value, l.disabled);
        }
      ),
      v = f == null ? void 0 : f.textContent,
      S = d.useMemo(() => c.jsx('option', { value: l.value, disabled: l.disabled, children: v }, l.value), [l.disabled, l.value, v]),
      { onNativeOptionAdd: g, onNativeOptionRemove: w } = u;
    return (
      Te(() => (g(S), () => w(S)), [g, w, S]),
      c.jsxs(c.Fragment, {
        children: [
          c.jsx(K.span, { id: l.textId, ...s, ref: m }),
          l.isSelected && i.valueNode && !i.valueNodeHasChildren ? zr.createPortal(s.children, i.valueNode) : null,
        ],
      })
    );
  });
Lx.displayName = hs;
var Fx = 'SelectItemIndicator',
  $x = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return Ox(Fx, n).isSelected ? c.jsx(K.span, { 'aria-hidden': !0, ...r, ref: t }) : null;
  });
$x.displayName = Fx;
var Vc = 'SelectScrollUpButton',
  zx = d.forwardRef((e, t) => {
    const n = cr(Vc, e.__scopeSelect),
      r = bf(Vc, e.__scopeSelect),
      [o, s] = d.useState(!1),
      i = oe(t, r.onScrollButtonChange);
    return (
      Te(() => {
        if (n.viewport && n.isPositioned) {
          let a = function () {
            const u = l.scrollTop > 0;
            s(u);
          };
          const l = n.viewport;
          return (a(), l.addEventListener('scroll', a), () => l.removeEventListener('scroll', a));
        }
      }, [n.viewport, n.isPositioned]),
      o
        ? c.jsx(Ux, {
            ...e,
            ref: i,
            onAutoScroll: () => {
              const { viewport: a, selectedItem: l } = n;
              a && l && (a.scrollTop = a.scrollTop - l.offsetHeight);
            },
          })
        : null
    );
  });
zx.displayName = Vc;
var Wc = 'SelectScrollDownButton',
  Bx = d.forwardRef((e, t) => {
    const n = cr(Wc, e.__scopeSelect),
      r = bf(Wc, e.__scopeSelect),
      [o, s] = d.useState(!1),
      i = oe(t, r.onScrollButtonChange);
    return (
      Te(() => {
        if (n.viewport && n.isPositioned) {
          let a = function () {
            const u = l.scrollHeight - l.clientHeight,
              f = Math.ceil(l.scrollTop) < u;
            s(f);
          };
          const l = n.viewport;
          return (a(), l.addEventListener('scroll', a), () => l.removeEventListener('scroll', a));
        }
      }, [n.viewport, n.isPositioned]),
      o
        ? c.jsx(Ux, {
            ...e,
            ref: i,
            onAutoScroll: () => {
              const { viewport: a, selectedItem: l } = n;
              a && l && (a.scrollTop = a.scrollTop + l.offsetHeight);
            },
          })
        : null
    );
  });
Bx.displayName = Wc;
var Ux = d.forwardRef((e, t) => {
    const { __scopeSelect: n, onAutoScroll: r, ...o } = e,
      s = cr('SelectScrollButton', n),
      i = d.useRef(null),
      a = Ml(n),
      l = d.useCallback(() => {
        i.current !== null && (window.clearInterval(i.current), (i.current = null));
      }, []);
    return (
      d.useEffect(() => () => l(), [l]),
      Te(() => {
        var f;
        const u = a().find(p => p.ref.current === document.activeElement);
        (f = u == null ? void 0 : u.ref.current) == null || f.scrollIntoView({ block: 'nearest' });
      }, [a]),
      c.jsx(K.div, {
        'aria-hidden': !0,
        ...o,
        ref: t,
        style: { flexShrink: 0, ...o.style },
        onPointerDown: F(o.onPointerDown, () => {
          i.current === null && (i.current = window.setInterval(r, 50));
        }),
        onPointerMove: F(o.onPointerMove, () => {
          var u;
          ((u = s.onItemLeave) == null || u.call(s), i.current === null && (i.current = window.setInterval(r, 50)));
        }),
        onPointerLeave: F(o.onPointerLeave, () => {
          l();
        }),
      })
    );
  }),
  Pj = 'SelectSeparator',
  Vx = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return c.jsx(K.div, { 'aria-hidden': !0, ...r, ref: t });
  });
Vx.displayName = Pj;
var Hc = 'SelectArrow',
  kj = d.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      o = _l(n),
      s = ur(Hc, n),
      i = cr(Hc, n);
    return s.open && i.position === 'popper' ? c.jsx(cf, { ...o, ...r, ref: t }) : null;
  });
kj.displayName = Hc;
var Tj = 'SelectBubbleInput',
  Wx = d.forwardRef(({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = d.useRef(null),
      s = oe(r, o),
      i = px(t);
    return (
      d.useEffect(() => {
        const a = o.current;
        if (!a) return;
        const l = window.HTMLSelectElement.prototype,
          f = Object.getOwnPropertyDescriptor(l, 'value').set;
        if (i !== t && f) {
          const p = new Event('change', { bubbles: !0 });
          (f.call(a, t), a.dispatchEvent(p));
        }
      }, [i, t]),
      c.jsx(K.select, { ...n, style: { ...wg, ...n.style }, ref: s, defaultValue: t })
    );
  });
Wx.displayName = Tj;
function Hx(e) {
  return e === '' || e === void 0;
}
function Kx(e) {
  const t = Ge(e),
    n = d.useRef(''),
    r = d.useRef(0),
    o = d.useCallback(
      i => {
        const a = n.current + i;
        (t(a),
          (function l(u) {
            ((n.current = u), window.clearTimeout(r.current), u !== '' && (r.current = window.setTimeout(() => l(''), 1e3)));
          })(a));
      },
      [t]
    ),
    s = d.useCallback(() => {
      ((n.current = ''), window.clearTimeout(r.current));
    }, []);
  return (d.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, s]);
}
function Gx(e, t, n) {
  const o = t.length > 1 && Array.from(t).every(u => u === t[0]) ? t[0] : t,
    s = n ? e.indexOf(n) : -1;
  let i = Rj(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter(u => u !== n));
  const l = i.find(u => u.textValue.toLowerCase().startsWith(o.toLowerCase()));
  return l !== n ? l : void 0;
}
function Rj(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var jj = wx,
  Qx = Cx,
  Mj = bx,
  _j = Nx,
  Ij = Px,
  Yx = kx,
  Aj = Mx,
  Xx = Ax,
  qx = Dx,
  Oj = Lx,
  Dj = $x,
  Zx = zx,
  Jx = Bx,
  ew = Vx;
const Kc = jj,
  Gc = Mj,
  za = d.forwardRef(({ className: e, children: t, ...n }, r) =>
    c.jsxs(Qx, {
      ref: r,
      className: Q(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        e
      ),
      ...n,
      children: [t, c.jsx(_j, { asChild: !0, children: c.jsx(Gd, { className: 'h-4 w-4 opacity-50' }) })],
    })
  );
za.displayName = Qx.displayName;
const tw = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(Zx, {
    ref: n,
    className: Q('flex cursor-default items-center justify-center py-1', e),
    ...t,
    children: c.jsx(VE, { className: 'h-4 w-4' }),
  })
);
tw.displayName = Zx.displayName;
const nw = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(Jx, {
    ref: n,
    className: Q('flex cursor-default items-center justify-center py-1', e),
    ...t,
    children: c.jsx(Gd, { className: 'h-4 w-4' }),
  })
);
nw.displayName = Jx.displayName;
const Ba = d.forwardRef(({ className: e, children: t, position: n = 'popper', ...r }, o) =>
  c.jsx(Ij, {
    children: c.jsxs(Yx, {
      ref: o,
      className: Q(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        n === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        e
      ),
      position: n,
      ...r,
      children: [
        c.jsx(tw, {}),
        c.jsx(Aj, {
          className: Q('p-1', n === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'),
          children: t,
        }),
        c.jsx(nw, {}),
      ],
    }),
  })
);
Ba.displayName = Yx.displayName;
const Lj = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(Xx, { ref: n, className: Q('py-1.5 pl-8 pr-2 text-sm font-semibold', e), ...t })
);
Lj.displayName = Xx.displayName;
const ht = d.forwardRef(({ className: e, children: t, ...n }, r) =>
  c.jsxs(qx, {
    ref: r,
    className: Q(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    ...n,
    children: [
      c.jsx('span', {
        className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: c.jsx(Dj, { children: c.jsx(Wg, { className: 'h-4 w-4' }) }),
      }),
      c.jsx(Oj, { children: t }),
    ],
  })
);
ht.displayName = qx.displayName;
const Fj = d.forwardRef(({ className: e, ...t }, n) => c.jsx(ew, { ref: n, className: Q('-mx-1 my-1 h-px bg-muted', e), ...t }));
Fj.displayName = ew.displayName;
var Il = 'Tabs',
  [$j, QM] = dt(Il, [El]),
  rw = El(),
  [zj, Nf] = $j(Il),
  ow = d.forwardRef((e, t) => {
    const {
        __scopeTabs: n,
        value: r,
        onValueChange: o,
        defaultValue: s,
        orientation: i = 'horizontal',
        dir: a,
        activationMode: l = 'automatic',
        ...u
      } = e,
      f = Sl(a),
      [p, m] = nr({ prop: r, onChange: o, defaultProp: s ?? '', caller: Il });
    return c.jsx(zj, {
      scope: n,
      baseId: Jt(),
      value: p,
      onValueChange: m,
      orientation: i,
      dir: f,
      activationMode: l,
      children: c.jsx(K.div, { dir: f, 'data-orientation': i, ...u, ref: t }),
    });
  });
ow.displayName = Il;
var sw = 'TabsList',
  iw = d.forwardRef((e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e,
      s = Nf(sw, n),
      i = rw(n);
    return c.jsx(i0, {
      asChild: !0,
      ...i,
      orientation: s.orientation,
      dir: s.dir,
      loop: r,
      children: c.jsx(K.div, { role: 'tablist', 'aria-orientation': s.orientation, ...o, ref: t }),
    });
  });
iw.displayName = sw;
var aw = 'TabsTrigger',
  lw = d.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...s } = e,
      i = Nf(aw, n),
      a = rw(n),
      l = dw(i.baseId, r),
      u = fw(i.baseId, r),
      f = r === i.value;
    return c.jsx(a0, {
      asChild: !0,
      ...a,
      focusable: !o,
      active: f,
      children: c.jsx(K.button, {
        type: 'button',
        role: 'tab',
        'aria-selected': f,
        'aria-controls': u,
        'data-state': f ? 'active' : 'inactive',
        'data-disabled': o ? '' : void 0,
        disabled: o,
        id: l,
        ...s,
        ref: t,
        onMouseDown: F(e.onMouseDown, p => {
          !o && p.button === 0 && p.ctrlKey === !1 ? i.onValueChange(r) : p.preventDefault();
        }),
        onKeyDown: F(e.onKeyDown, p => {
          [' ', 'Enter'].includes(p.key) && i.onValueChange(r);
        }),
        onFocus: F(e.onFocus, () => {
          const p = i.activationMode !== 'manual';
          !f && !o && p && i.onValueChange(r);
        }),
      }),
    });
  });
lw.displayName = aw;
var uw = 'TabsContent',
  cw = d.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: s, ...i } = e,
      a = Nf(uw, n),
      l = dw(a.baseId, r),
      u = fw(a.baseId, r),
      f = r === a.value,
      p = d.useRef(f);
    return (
      d.useEffect(() => {
        const m = requestAnimationFrame(() => (p.current = !1));
        return () => cancelAnimationFrame(m);
      }, []),
      c.jsx(Bt, {
        present: o || f,
        children: ({ present: m }) =>
          c.jsx(K.div, {
            'data-state': f ? 'active' : 'inactive',
            'data-orientation': a.orientation,
            role: 'tabpanel',
            'aria-labelledby': l,
            hidden: !m,
            id: u,
            tabIndex: 0,
            ...i,
            ref: t,
            style: { ...e.style, animationDuration: p.current ? '0s' : void 0 },
            children: m && s,
          }),
      })
    );
  });
cw.displayName = uw;
function dw(e, t) {
  return `${e}-trigger-${t}`;
}
function fw(e, t) {
  return `${e}-content-${t}`;
}
var Bj = ow,
  pw = iw,
  hw = lw,
  mw = cw;
const Uj = Bj,
  vw = d.forwardRef(({ className: e, ...t }, n) =>
    c.jsx(pw, {
      ref: n,
      className: Q('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', e),
      ...t,
    })
  );
vw.displayName = pw.displayName;
const ms = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(hw, {
    ref: n,
    className: Q(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      e
    ),
    ...t,
  })
);
ms.displayName = hw.displayName;
const vs = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(mw, {
    ref: n,
    className: Q(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      e
    ),
    ...t,
  })
);
vs.displayName = mw.displayName;
var Al = 'Dialog',
  [gw, YM] = dt(Al),
  [Vj, Ut] = gw(Al),
  yw = e => {
    const { __scopeDialog: t, children: n, open: r, defaultOpen: o, onOpenChange: s, modal: i = !0 } = e,
      a = d.useRef(null),
      l = d.useRef(null),
      [u, f] = nr({ prop: r, defaultProp: o ?? !1, onChange: s, caller: Al });
    return c.jsx(Vj, {
      scope: t,
      triggerRef: a,
      contentRef: l,
      contentId: Jt(),
      titleId: Jt(),
      descriptionId: Jt(),
      open: u,
      onOpenChange: f,
      onOpenToggle: d.useCallback(() => f(p => !p), [f]),
      modal: i,
      children: n,
    });
  };
yw.displayName = Al;
var xw = 'DialogTrigger',
  Wj = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ut(xw, n),
      s = oe(t, o.triggerRef);
    return c.jsx(K.button, {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': o.open,
      'aria-controls': o.contentId,
      'data-state': Tf(o.open),
      ...r,
      ref: s,
      onClick: F(e.onClick, o.onOpenToggle),
    });
  });
Wj.displayName = xw;
var Pf = 'DialogPortal',
  [Hj, ww] = gw(Pf, { forceMount: void 0 }),
  Sw = e => {
    const { __scopeDialog: t, forceMount: n, children: r, container: o } = e,
      s = Ut(Pf, t);
    return c.jsx(Hj, {
      scope: t,
      forceMount: n,
      children: d.Children.map(r, i =>
        c.jsx(Bt, { present: n || s.open, children: c.jsx(si, { asChild: !0, container: o, children: i }) })
      ),
    });
  };
Sw.displayName = Pf;
var Ua = 'DialogOverlay',
  Cw = d.forwardRef((e, t) => {
    const n = ww(Ua, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      s = Ut(Ua, e.__scopeDialog);
    return s.modal ? c.jsx(Bt, { present: r || s.open, children: c.jsx(Gj, { ...o, ref: t }) }) : null;
  });
Cw.displayName = Ua;
var Kj = Ir('DialogOverlay.RemoveScroll'),
  Gj = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ut(Ua, n);
    return c.jsx(Nl, {
      as: Kj,
      allowPinchZoom: !0,
      shards: [o.contentRef],
      children: c.jsx(K.div, { 'data-state': Tf(o.open), ...r, ref: t, style: { pointerEvents: 'auto', ...r.style } }),
    });
  }),
  Lr = 'DialogContent',
  Ew = d.forwardRef((e, t) => {
    const n = ww(Lr, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      s = Ut(Lr, e.__scopeDialog);
    return c.jsx(Bt, { present: r || s.open, children: s.modal ? c.jsx(Qj, { ...o, ref: t }) : c.jsx(Yj, { ...o, ref: t }) });
  });
Ew.displayName = Lr;
var Qj = d.forwardRef((e, t) => {
    const n = Ut(Lr, e.__scopeDialog),
      r = d.useRef(null),
      o = oe(t, n.contentRef, r);
    return (
      d.useEffect(() => {
        const s = r.current;
        if (s) return mf(s);
      }, []),
      c.jsx(bw, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: F(e.onCloseAutoFocus, s => {
          var i;
          (s.preventDefault(), (i = n.triggerRef.current) == null || i.focus());
        }),
        onPointerDownOutside: F(e.onPointerDownOutside, s => {
          const i = s.detail.originalEvent,
            a = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || a) && s.preventDefault();
        }),
        onFocusOutside: F(e.onFocusOutside, s => s.preventDefault()),
      })
    );
  }),
  Yj = d.forwardRef((e, t) => {
    const n = Ut(Lr, e.__scopeDialog),
      r = d.useRef(!1),
      o = d.useRef(!1);
    return c.jsx(bw, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: s => {
        var i, a;
        ((i = e.onCloseAutoFocus) == null || i.call(e, s),
          s.defaultPrevented || (r.current || (a = n.triggerRef.current) == null || a.focus(), s.preventDefault()),
          (r.current = !1),
          (o.current = !1));
      },
      onInteractOutside: s => {
        var l, u;
        ((l = e.onInteractOutside) == null || l.call(e, s),
          s.defaultPrevented || ((r.current = !0), s.detail.originalEvent.type === 'pointerdown' && (o.current = !0)));
        const i = s.target;
        (((u = n.triggerRef.current) == null ? void 0 : u.contains(i)) && s.preventDefault(),
          s.detail.originalEvent.type === 'focusin' && o.current && s.preventDefault());
      },
    });
  }),
  bw = d.forwardRef((e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: s, ...i } = e,
      a = Ut(Lr, n),
      l = d.useRef(null),
      u = oe(t, l);
    return (
      hf(),
      c.jsxs(c.Fragment, {
        children: [
          c.jsx(Cl, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: o,
            onUnmountAutoFocus: s,
            children: c.jsx(Vo, {
              role: 'dialog',
              id: a.contentId,
              'aria-describedby': a.descriptionId,
              'aria-labelledby': a.titleId,
              'data-state': Tf(a.open),
              ...i,
              ref: u,
              onDismiss: () => a.onOpenChange(!1),
            }),
          }),
          c.jsxs(c.Fragment, {
            children: [c.jsx(Xj, { titleId: a.titleId }), c.jsx(Zj, { contentRef: l, descriptionId: a.descriptionId })],
          }),
        ],
      })
    );
  }),
  kf = 'DialogTitle',
  Nw = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ut(kf, n);
    return c.jsx(K.h2, { id: o.titleId, ...r, ref: t });
  });
Nw.displayName = kf;
var Pw = 'DialogDescription',
  kw = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ut(Pw, n);
    return c.jsx(K.p, { id: o.descriptionId, ...r, ref: t });
  });
kw.displayName = Pw;
var Tw = 'DialogClose',
  Rw = d.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ut(Tw, n);
    return c.jsx(K.button, { type: 'button', ...r, ref: t, onClick: F(e.onClick, () => o.onOpenChange(!1)) });
  });
Rw.displayName = Tw;
function Tf(e) {
  return e ? 'open' : 'closed';
}
var jw = 'DialogTitleWarning',
  [XM, Mw] = QC(jw, { contentName: Lr, titleName: kf, docsSlug: 'dialog' }),
  Xj = ({ titleId: e }) => {
    const t = Mw(jw),
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
  qj = 'DialogDescriptionWarning',
  Zj = ({ contentRef: e, descriptionId: t }) => {
    const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Mw(qj).contentName}}.`;
    return (
      d.useEffect(() => {
        var s;
        const o = (s = e.current) == null ? void 0 : s.getAttribute('aria-describedby');
        t && o && (document.getElementById(t) || console.warn(r));
      }, [r, e, t]),
      null
    );
  },
  Jj = yw,
  eM = Sw,
  _w = Cw,
  Iw = Ew,
  Aw = Nw,
  Ow = kw,
  tM = Rw;
const nM = Jj,
  rM = eM,
  Dw = d.forwardRef(({ className: e, ...t }, n) =>
    c.jsx(_w, {
      ref: n,
      className: Q(
        'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        e
      ),
      ...t,
    })
  );
Dw.displayName = _w.displayName;
const Lw = d.forwardRef(({ className: e, children: t, ...n }, r) =>
  c.jsxs(rM, {
    children: [
      c.jsx(Dw, {}),
      c.jsxs(Iw, {
        ref: r,
        className: Q(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          e
        ),
        ...n,
        children: [
          t,
          c.jsxs(tM, {
            className:
              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            children: [c.jsx(Xd, { className: 'h-4 w-4' }), c.jsx('span', { className: 'sr-only', children: 'Close' })],
          }),
        ],
      }),
    ],
  })
);
Lw.displayName = Iw.displayName;
const Fw = ({ className: e, ...t }) => c.jsx('div', { className: Q('flex flex-col space-y-1.5 text-center sm:text-left', e), ...t });
Fw.displayName = 'DialogHeader';
const $w = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(Aw, { ref: n, className: Q('text-lg font-semibold leading-none tracking-tight', e), ...t })
);
$w.displayName = Aw.displayName;
const zw = d.forwardRef(({ className: e, ...t }, n) => c.jsx(Ow, { ref: n, className: Q('text-sm text-muted-foreground', e), ...t }));
zw.displayName = Ow.displayName;
function oM({ open: e, onOpenChange: t }) {
  const [n, r] = d.useState('C:\\Program Files\\Manic Miners'),
    [o, s] = d.useState(!0),
    [i, a] = d.useState('unlimited'),
    [l, u] = d.useState('80'),
    [f, p] = d.useState('1920x1080'),
    [m, v] = d.useState(!1),
    [S, g] = d.useState(!1),
    w = () => {
      alert('Folder picker would open here');
    },
    x = () => {
      (console.log('Settings saved:', {
        installPath: n,
        autoUpdate: o,
        downloadLimit: i,
        soundVolume: l,
        resolution: f,
        fullscreen: m,
        controllerEnabled: S,
      }),
        t(!1));
    },
    h = () => {
      (r('C:\\Program Files\\Manic Miners'), s(!0), a('unlimited'), u('80'), p('1920x1080'), v(!1), g(!1));
    };
  return c.jsx(nM, {
    open: e,
    onOpenChange: t,
    children: c.jsxs(Lw, {
      className: 'max-w-2xl max-h-[80vh] overflow-y-auto',
      children: [
        c.jsxs(Fw, {
          children: [
            c.jsxs($w, { className: 'flex items-center gap-2', children: [c.jsx(Ec, { className: 'w-5 h-5' }), 'Launcher Settings'] }),
            c.jsx(zw, { children: 'Configure your Manic Miners launcher preferences' }),
          ],
        }),
        c.jsxs(Uj, {
          defaultValue: 'general',
          className: 'mt-4',
          children: [
            c.jsxs(vw, {
              className: 'grid w-full grid-cols-4',
              children: [
                c.jsxs(ms, {
                  value: 'general',
                  className: 'flex items-center gap-2',
                  children: [c.jsx(Ec, { className: 'w-4 h-4' }), 'General'],
                }),
                c.jsxs(ms, {
                  value: 'downloads',
                  className: 'flex items-center gap-2',
                  children: [c.jsx(Qd, { className: 'w-4 h-4' }), 'Downloads'],
                }),
                c.jsxs(ms, {
                  value: 'display',
                  className: 'flex items-center gap-2',
                  children: [c.jsx(qE, { className: 'w-4 h-4' }), 'Display'],
                }),
                c.jsxs(ms, {
                  value: 'input',
                  className: 'flex items-center gap-2',
                  children: [c.jsx(GE, { className: 'w-4 h-4' }), 'Input'],
                }),
              ],
            }),
            c.jsxs('div', {
              className: 'min-h-[300px]',
              children: [
                c.jsxs(vs, {
                  value: 'general',
                  className: 'space-y-4 mt-6',
                  children: [
                    c.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        c.jsx(_n, { htmlFor: 'install-path', children: 'Installation Path' }),
                        c.jsxs('div', {
                          className: 'flex gap-2',
                          children: [
                            c.jsx(zc, { id: 'install-path', value: n, onChange: y => r(y.target.value), className: 'flex-1' }),
                            c.jsxs(xt, { variant: 'outline', onClick: w, children: [c.jsx(KE, { className: 'w-4 h-4 mr-2' }), 'Browse'] }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        c.jsxs('div', {
                          className: 'space-y-0.5',
                          children: [
                            c.jsx(_n, { children: 'Auto-update Game' }),
                            c.jsx('p', {
                              className: 'text-sm text-muted-foreground',
                              children: 'Automatically download and install game updates',
                            }),
                          ],
                        }),
                        c.jsx(oa, { checked: o, onCheckedChange: s }),
                      ],
                    }),
                  ],
                }),
                c.jsx(vs, {
                  value: 'downloads',
                  className: 'space-y-4 mt-6',
                  children: c.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      c.jsx(_n, { htmlFor: 'download-limit', children: 'Download Speed Limit' }),
                      c.jsxs(Kc, {
                        value: i,
                        onValueChange: a,
                        children: [
                          c.jsx(za, { children: c.jsx(Gc, {}) }),
                          c.jsxs(Ba, {
                            children: [
                              c.jsx(ht, { value: 'unlimited', children: 'Unlimited' }),
                              c.jsx(ht, { value: '1mb', children: '1 MB/s' }),
                              c.jsx(ht, { value: '5mb', children: '5 MB/s' }),
                              c.jsx(ht, { value: '10mb', children: '10 MB/s' }),
                              c.jsx(ht, { value: '25mb', children: '25 MB/s' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                c.jsxs(vs, {
                  value: 'display',
                  className: 'space-y-4 mt-6',
                  children: [
                    c.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        c.jsx(_n, { htmlFor: 'sound-volume', children: 'Master Volume' }),
                        c.jsxs('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            c.jsx(zc, {
                              id: 'sound-volume',
                              type: 'range',
                              min: '0',
                              max: '100',
                              value: l,
                              onChange: y => u(y.target.value),
                              className: 'flex-1',
                            }),
                            c.jsxs('span', { className: 'text-sm text-muted-foreground w-12', children: [l, '%'] }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        c.jsx(_n, { htmlFor: 'resolution', children: 'Resolution' }),
                        c.jsxs(Kc, {
                          value: f,
                          onValueChange: p,
                          children: [
                            c.jsx(za, { children: c.jsx(Gc, {}) }),
                            c.jsxs(Ba, {
                              children: [
                                c.jsx(ht, { value: '1920x1080', children: '1920 x 1080 (Full HD)' }),
                                c.jsx(ht, { value: '2560x1440', children: '2560 x 1440 (2K)' }),
                                c.jsx(ht, { value: '3840x2160', children: '3840 x 2160 (4K)' }),
                                c.jsx(ht, { value: '1366x768', children: '1366 x 768' }),
                                c.jsx(ht, { value: '1280x720', children: '1280 x 720 (HD)' }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        c.jsxs('div', {
                          className: 'space-y-0.5',
                          children: [
                            c.jsx(_n, { children: 'Fullscreen Mode' }),
                            c.jsx('p', { className: 'text-sm text-muted-foreground', children: 'Launch game in fullscreen by default' }),
                          ],
                        }),
                        c.jsx(oa, { checked: m, onCheckedChange: v }),
                      ],
                    }),
                  ],
                }),
                c.jsx(vs, {
                  value: 'input',
                  className: 'space-y-4 mt-6',
                  children: c.jsxs('div', {
                    className: 'flex items-center justify-between',
                    children: [
                      c.jsxs('div', {
                        className: 'space-y-0.5',
                        children: [
                          c.jsx(_n, { children: 'Controller Support' }),
                          c.jsx('p', { className: 'text-sm text-muted-foreground', children: 'Enable gamepad/controller input' }),
                        ],
                      }),
                      c.jsx(oa, { checked: S, onCheckedChange: g }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
        c.jsxs('div', {
          className: 'flex justify-between mt-6 pt-4 border-t',
          children: [
            c.jsx(xt, { variant: 'outline', onClick: h, children: 'Reset to Defaults' }),
            c.jsxs('div', {
              className: 'flex gap-2',
              children: [
                c.jsx(xt, { variant: 'outline', onClick: () => t(!1), children: 'Cancel' }),
                c.jsx(xt, { onClick: x, children: 'Save Changes' }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function sM() {
  const [e, t] = d.useState(!1);
  return c.jsx('header', {
    className: 'border-b border-border mining-surface',
    children: c.jsxs('div', {
      className: 'container mx-auto p-6',
      children: [
        c.jsx('div', {
          className: 'flex items-center justify-between mb-6',
          children: c.jsxs('div', {
            className: 'flex items-center gap-4',
            children: [
              c.jsxs('div', {
                className: 'flex items-center gap-3',
                children: [
                  c.jsx('div', {
                    className:
                      'w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center energy-glow',
                    children: c.jsx(Kg, { className: 'w-6 h-6 text-primary-foreground animate-pulse-energy' }),
                  }),
                  c.jsxs('div', {
                    children: [
                      c.jsx('h1', { className: 'text-2xl font-bold text-foreground', children: 'ManicMiners' }),
                      c.jsx('p', { className: 'text-sm text-muted-foreground', children: 'Game Launcher' }),
                    ],
                  }),
                ],
              }),
              c.jsx(Da, { variant: 'outline', className: 'border-primary/50 text-primary', children: 'v2.1.3' }),
            ],
          }),
        }),
        c.jsx(tj, { onSettingsClick: () => t(!0) }),
        c.jsx(oM, { open: e, onOpenChange: t }),
      ],
    }),
  });
}
const nn = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx('div', { ref: n, className: Q('rounded-lg border bg-card text-card-foreground shadow-sm', e), ...t })
);
nn.displayName = 'Card';
const wn = d.forwardRef(({ className: e, ...t }, n) => c.jsx('div', { ref: n, className: Q('flex flex-col space-y-1.5 p-6', e), ...t }));
wn.displayName = 'CardHeader';
const Sn = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx('h3', { ref: n, className: Q('text-2xl font-semibold leading-none tracking-tight', e), ...t })
);
Sn.displayName = 'CardTitle';
const fi = d.forwardRef(({ className: e, ...t }, n) => c.jsx('p', { ref: n, className: Q('text-sm text-muted-foreground', e), ...t }));
fi.displayName = 'CardDescription';
const rn = d.forwardRef(({ className: e, ...t }, n) => c.jsx('div', { ref: n, className: Q('p-6 pt-0', e), ...t }));
rn.displayName = 'CardContent';
const iM = d.forwardRef(({ className: e, ...t }, n) => c.jsx('div', { ref: n, className: Q('flex items-center p-6 pt-0', e), ...t }));
iM.displayName = 'CardFooter';
function aM() {
  const [e, t] = d.useState([]),
    [n, r] = d.useState(''),
    [o, s] = d.useState(!0),
    [i, a] = d.useState(new Set()),
    [l, u] = d.useState(!1);
  d.useEffect(() => {
    (async () => {
      try {
        const C = await (await fetch('https://manic-launcher.vercel.app/api/versions/archived')).json();
        if (C.versions && Array.isArray(C.versions)) {
          const E = C.versions.sort((N, b) => {
            const k = $ => $.split('.').map(A => parseInt(A, 10)),
              M = k(N.version),
              j = k(b.version);
            for (let $ = 0; $ < Math.max(M.length, j.length); $++) {
              const A = M[$] || 0,
                W = j[$] || 0;
              if (A !== W) return W - A;
            }
            return 0;
          });
          (t(E), E.length > 0 && r(E[0].version));
        }
      } catch (y) {
        console.error('Failed to fetch versions:', y);
      } finally {
        s(!1);
      }
    })();
  }, []);
  const f = e.find(h => h.version === n),
    p = h => (h ? c.jsx(sb, { className: 'w-4 h-4' }) : c.jsx(tb, { className: 'w-4 h-4' })),
    m = h => (h ? 'secondary' : 'default'),
    v = h => i.has(h),
    S = () => {
      f &&
        (v(f.version)
          ? console.log('Launching game version:', f.version)
          : (console.log('Installing game version:', f.version), a(h => new Set([...h, f.version]))));
    },
    g = () => {
      f &&
        (console.log('Verifying game version:', f.version),
        window.electronAPI.send('verify-version', f.version));
    },
    w = () => {
      f &&
        (console.log('Deleting game version:', f.version),
        window.electronAPI.send('delete-version', f.version),
        a(h => {
          const y = new Set(h);
          return (y.delete(f.version), y);
        }));
    },
    x = () => {
      f &&
        (console.log('Reinstalling game version:', f.version),
        window.electronAPI.send('reinstall-version', f.version),
        a(h => {
          const y = new Set(h);
          return (y.delete(f.version), y);
        }),
        setTimeout(() => {
          a(h => new Set([...h, f.version]));
        }, 100));
    };
  return o
    ? c.jsxs(nn, {
        className: 'mining-surface energy-glow',
        children: [
          c.jsx(wn, { children: c.jsx(Sn, { className: 'text-primary', children: 'Loading Versions...' }) }),
          c.jsx(rn, {
            children: c.jsxs('div', {
              className: 'animate-pulse space-y-3',
              children: [c.jsx('div', { className: 'h-4 bg-muted rounded' }), c.jsx('div', { className: 'h-4 bg-muted rounded w-3/4' })],
            }),
          }),
        ],
      })
    : c.jsxs(nn, {
        className: 'mining-surface',
        children: [
          c.jsxs(wn, {
            children: [
              c.jsxs(Sn, {
                className: 'text-primary flex items-center gap-2',
                children: [c.jsx(Kg, { className: 'w-5 h-5' }), 'Game Versions'],
              }),
              c.jsx(fi, { className: 'text-muted-foreground', children: 'Install and manage Manic Miners releases' }),
            ],
          }),
          c.jsxs(rn, {
            className: 'space-y-4',
            children: [
              c.jsxs(Kc, {
                value: n,
                onValueChange: r,
                children: [
                  c.jsx(za, { className: 'bg-input border-border', children: c.jsx(Gc, { placeholder: 'Select version...' }) }),
                  c.jsx(Ba, {
                    className: 'bg-popover border-border',
                    children: e.map(h =>
                      c.jsx(
                        ht,
                        {
                          value: h.version,
                          children: c.jsxs('div', {
                            className: 'flex items-center gap-2',
                            children: [
                              p(h.experimental),
                              h.displayName,
                              c.jsx(Da, {
                                variant: m(h.experimental),
                                className: 'ml-2',
                                children: h.experimental ? 'experimental' : 'stable',
                              }),
                            ],
                          }),
                        },
                        h.version
                      )
                    ),
                  }),
                ],
              }),
              f &&
                c.jsxs('div', {
                  className: 'p-4 rounded-lg bg-secondary/50 border border-border hover:bg-secondary/50',
                  children: [
                    c.jsxs('div', {
                      className: 'flex gap-4',
                      children: [
                        c.jsx('div', {
                          className: 'flex-shrink-0',
                          children: c.jsx('img', {
                            src: f.thumbnailUrl,
                            alt: `${f.title} thumbnail`,
                            className: 'w-16 h-16 rounded object-cover border border-border',
                            onError: h => {
                              h.currentTarget.style.display = 'none';
                            },
                          }),
                        }),
                        c.jsxs('div', {
                          className: 'flex-1 space-y-2',
                          children: [
                            c.jsxs('div', {
                              className: 'flex items-center justify-between',
                              children: [
                                c.jsx('h4', { className: 'font-medium text-secondary-foreground', children: f.title }),
                                c.jsx(Da, { variant: m(f.experimental), children: f.experimental ? 'experimental' : 'stable' }),
                              ],
                            }),
                            c.jsxs('div', {
                              className: 'grid grid-cols-2 gap-2 text-sm text-muted-foreground',
                              children: [
                                c.jsxs('div', {
                                  children: [
                                    c.jsx('span', { className: 'font-medium', children: 'Release Date:' }),
                                    ' ',
                                    new Date(f.releaseDate).toLocaleDateString(),
                                  ],
                                }),
                                c.jsxs('div', {
                                  children: [c.jsx('span', { className: 'font-medium', children: 'File Size:' }), ' ', f.size],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs('div', {
                      className: 'mt-3 relative',
                      children: [
                        c.jsx('div', {
                          className: `overflow-hidden transition-all duration-300 ease-in-out ${l ? 'max-h-96' : 'max-h-24'}`,
                          children: c.jsx('p', {
                            className: 'text-sm text-muted-foreground',
                            children: f.description || 'No description available.',
                          }),
                        }),
                        c.jsx('div', {
                          className: 'flex justify-center mt-2',
                          children: c.jsx('button', {
                            onClick: () => u(!l),
                            className:
                              'flex items-center justify-center w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary transition-colors',
                            'aria-label': l ? 'Collapse description' : 'Expand description',
                            children: c.jsx(Gd, {
                              className: `w-4 h-4 text-muted-foreground transition-transform duration-200 ${l ? 'rotate-180' : ''}`,
                            }),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              c.jsxs('div', {
                className: 'flex gap-2',
                children: [
                  c.jsx(xt, {
                    variant: 'energy',
                    className: 'flex-1',
                    onClick: S,
                    children:
                      f && v(f.version)
                        ? c.jsxs(c.Fragment, { children: [c.jsx(Yd, { className: 'w-4 h-4 mr-2' }), 'Launch Game'] })
                        : c.jsxs(c.Fragment, { children: [c.jsx(Qd, { className: 'w-4 h-4 mr-2' }), 'Install Game'] }),
                  }),
                  c.jsxs(ux, {
                    children: [
                      c.jsx(cx, { asChild: !0, children: c.jsx(xt, { variant: 'mining', children: c.jsx(YE, { className: 'w-4 h-4' }) }) }),
                      c.jsxs(Ef, {
                        className: 'bg-popover border-border',
                        align: 'end',
                        children: [
                          c.jsxs(wo, {
                            onClick: g,
                            className: 'cursor-pointer',
                            children: [c.jsx(eb, { className: 'w-4 h-4 mr-2' }), 'Verify'],
                          }),
                          c.jsxs(wo, {
                            onClick: w,
                            className: 'cursor-pointer text-destructive hover:text-destructive',
                            disabled: !f || !v(f.version),
                            children: [c.jsx(ob, { className: 'w-4 h-4 mr-2' }), 'Delete'],
                          }),
                          c.jsxs(wo, {
                            onClick: x,
                            className: 'cursor-pointer',
                            disabled: !f || !v(f.version),
                            children: [c.jsx(JE, { className: 'w-4 h-4 mr-2' }), 'Reinstall'],
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
      });
}
function lM() {
  const [e, t] = d.useState([]),
    [n, r] = d.useState(!0);
  return (
    d.useEffect(() => {
      (async () => {
        try {
          const i = await (await fetch('https://manic-launcher.vercel.app/api/news')).json();
          t(Array.isArray(i) ? i : []);
        } catch (s) {
          (console.error('Failed to fetch news:', s),
            t([
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
            ]));
        } finally {
          r(!1);
        }
      })();
    }, []),
    n
      ? c.jsxs(nn, {
          className: 'mining-surface',
          children: [
            c.jsx(wn, { children: c.jsx(Sn, { className: 'text-primary', children: 'Loading News...' }) }),
            c.jsx(rn, {
              children: c.jsxs('div', {
                className: 'animate-pulse space-y-3',
                children: [c.jsx('div', { className: 'h-4 bg-muted rounded' }), c.jsx('div', { className: 'h-4 bg-muted rounded w-2/3' })],
              }),
            }),
          ],
        })
      : c.jsxs(nn, {
          className: 'mining-surface',
          children: [
            c.jsxs(wn, {
              children: [
                c.jsxs(Sn, {
                  className: 'text-primary flex items-center gap-2',
                  children: [c.jsx(Hg, { className: 'w-5 h-5' }), 'Launcher News'],
                }),
                c.jsx(fi, { className: 'text-muted-foreground', children: 'Latest updates and announcements' }),
              ],
            }),
            c.jsx(rn, {
              children: c.jsx('div', {
                className: 'space-y-4 max-h-96 overflow-y-auto',
                children:
                  e.length === 0
                    ? c.jsx('p', { className: 'text-muted-foreground text-center py-4', children: 'No messages available' })
                    : e.map(o =>
                        c.jsxs(
                          'div',
                          {
                            className: 'p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors',
                            children: [
                              c.jsxs('div', {
                                className: 'flex items-start justify-between mb-2',
                                children: [
                                  c.jsx('h4', { className: 'font-medium text-secondary-foreground text-sm', children: o.title }),
                                  c.jsx(Da, { variant: 'secondary', className: 'ml-2', children: 'news' }),
                                ],
                              }),
                              c.jsx('p', { className: 'text-xs text-muted-foreground mb-2', children: o.content }),
                              c.jsxs('div', {
                                className: 'flex items-center gap-1 text-xs text-muted-foreground',
                                children: [c.jsx(Vg, { className: 'w-3 h-3' }), new Date(o.date).toLocaleDateString()],
                              }),
                            ],
                          },
                          o.id
                        )
                      ),
              }),
            }),
          ],
        })
  );
}
function uM() {
  const [e, t] = d.useState(null),
    [n, r] = d.useState(!0);
  d.useEffect(() => {
    (async () => {
      try {
        const a = await (await fetch('https://manic-launcher.vercel.app/api/intro-video')).json();
        t(a);
      } catch (i) {
        (console.error('Failed to fetch trailer:', i),
          t({ youtubeUrl: 'https://www.youtube.com/watch?v=1mQacGNeNVA', localUrl: '/intro-video.mp4' }));
      } finally {
        r(!1);
      }
    })();
  }, []);
  const o = s => {
    var a;
    return `https://www.youtube.com/embed/${(a = s.split('v=')[1]) == null ? void 0 : a.split('&')[0]}`;
  };
  return n
    ? c.jsxs(nn, {
        className: 'mining-surface',
        children: [
          c.jsx(wn, { children: c.jsx(Sn, { className: 'text-primary', children: 'Loading Trailer...' }) }),
          c.jsx(rn, {
            children: c.jsx('div', { className: 'animate-pulse', children: c.jsx('div', { className: 'h-48 bg-muted rounded' }) }),
          }),
        ],
      })
    : c.jsxs(nn, {
        className: 'mining-surface',
        children: [
          c.jsxs(wn, {
            children: [
              c.jsxs(Sn, {
                className: 'text-primary flex items-center gap-2',
                children: [c.jsx(Yd, { className: 'w-5 h-5' }), 'Game Trailer'],
              }),
              c.jsx(fi, { className: 'text-muted-foreground', children: 'Watch the latest trailer' }),
            ],
          }),
          c.jsx(rn, {
            children:
              e &&
              c.jsx('div', {
                className: 'relative aspect-video rounded-lg overflow-hidden bg-black',
                children: c.jsx('iframe', {
                  src: o(e.youtubeUrl),
                  title: 'Manic Miners Trailer',
                  className: 'w-full h-full',
                  frameBorder: '0',
                  allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                  allowFullScreen: !0,
                }),
              }),
          }),
        ],
      });
}
var Bw = { exports: {} },
  Uw = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $o = d;
function cM(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var dM = typeof Object.is == 'function' ? Object.is : cM,
  fM = $o.useState,
  pM = $o.useEffect,
  hM = $o.useLayoutEffect,
  mM = $o.useDebugValue;
function vM(e, t) {
  var n = t(),
    r = fM({ inst: { value: n, getSnapshot: t } }),
    o = r[0].inst,
    s = r[1];
  return (
    hM(
      function () {
        ((o.value = n), (o.getSnapshot = t), Pu(o) && s({ inst: o }));
      },
      [e, n, t]
    ),
    pM(
      function () {
        return (
          Pu(o) && s({ inst: o }),
          e(function () {
            Pu(o) && s({ inst: o });
          })
        );
      },
      [e]
    ),
    mM(n),
    n
  );
}
function Pu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !dM(e, n);
  } catch {
    return !0;
  }
}
function gM(e, t) {
  return t();
}
var yM = typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u' ? gM : vM;
Uw.useSyncExternalStore = $o.useSyncExternalStore !== void 0 ? $o.useSyncExternalStore : yM;
Bw.exports = Uw;
var xM = Bw.exports;
function wM() {
  return xM.useSyncExternalStore(
    SM,
    () => !0,
    () => !1
  );
}
function SM() {
  return () => {};
}
var Rf = 'Avatar',
  [CM, qM] = dt(Rf),
  [EM, Vw] = CM(Rf),
  Ww = d.forwardRef((e, t) => {
    const { __scopeAvatar: n, ...r } = e,
      [o, s] = d.useState('idle');
    return c.jsx(EM, { scope: n, imageLoadingStatus: o, onImageLoadingStatusChange: s, children: c.jsx(K.span, { ...r, ref: t }) });
  });
Ww.displayName = Rf;
var Hw = 'AvatarImage',
  Kw = d.forwardRef((e, t) => {
    const { __scopeAvatar: n, src: r, onLoadingStatusChange: o = () => {}, ...s } = e,
      i = Vw(Hw, n),
      a = bM(r, s),
      l = Ge(u => {
        (o(u), i.onImageLoadingStatusChange(u));
      });
    return (
      Te(() => {
        a !== 'idle' && l(a);
      }, [a, l]),
      a === 'loaded' ? c.jsx(K.img, { ...s, ref: t, src: r }) : null
    );
  });
Kw.displayName = Hw;
var Gw = 'AvatarFallback',
  Qw = d.forwardRef((e, t) => {
    const { __scopeAvatar: n, delayMs: r, ...o } = e,
      s = Vw(Gw, n),
      [i, a] = d.useState(r === void 0);
    return (
      d.useEffect(() => {
        if (r !== void 0) {
          const l = window.setTimeout(() => a(!0), r);
          return () => window.clearTimeout(l);
        }
      }, [r]),
      i && s.imageLoadingStatus !== 'loaded' ? c.jsx(K.span, { ...o, ref: t }) : null
    );
  });
Qw.displayName = Gw;
function Wh(e, t) {
  return e ? (t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? 'loaded' : 'loading') : 'error') : 'idle';
}
function bM(e, { referrerPolicy: t, crossOrigin: n }) {
  const r = wM(),
    o = d.useRef(null),
    s = r ? (o.current || (o.current = new window.Image()), o.current) : null,
    [i, a] = d.useState(() => Wh(s, e));
  return (
    Te(() => {
      a(Wh(s, e));
    }, [s, e]),
    Te(() => {
      const l = p => () => {
        a(p);
      };
      if (!s) return;
      const u = l('loaded'),
        f = l('error');
      return (
        s.addEventListener('load', u),
        s.addEventListener('error', f),
        t && (s.referrerPolicy = t),
        typeof n == 'string' && (s.crossOrigin = n),
        () => {
          (s.removeEventListener('load', u), s.removeEventListener('error', f));
        }
      );
    }, [s, n, t]),
    i
  );
}
var Yw = Ww,
  Xw = Kw,
  qw = Qw;
const Zw = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(Yw, { ref: n, className: Q('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', e), ...t })
);
Zw.displayName = Yw.displayName;
const Jw = d.forwardRef(({ className: e, ...t }, n) => c.jsx(Xw, { ref: n, className: Q('aspect-square h-full w-full', e), ...t }));
Jw.displayName = Xw.displayName;
const e1 = d.forwardRef(({ className: e, ...t }, n) =>
  c.jsx(qw, { ref: n, className: Q('flex h-full w-full items-center justify-center rounded-full bg-muted', e), ...t })
);
e1.displayName = qw.displayName;
function NM() {
  const [e, t] = d.useState(null),
    [n, r] = d.useState(!0);
  d.useEffect(() => {
    (async () => {
      try {
        const l = await (await fetch('https://manic-launcher.vercel.app/api/comments')).json();
        t(l);
      } catch (a) {
        (console.error('Failed to fetch comments:', a), t({ count: 0, comments: [] }));
      } finally {
        r(!1);
      }
    })();
  }, []);
  const o = i => new Date(i).toLocaleDateString(),
    s = i =>
      i
        .split(' ')
        .map(a => a[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
  return n
    ? c.jsxs(nn, {
        className: 'mining-surface',
        children: [
          c.jsx(wn, { children: c.jsx(Sn, { className: 'text-primary', children: 'Loading Comments...' }) }),
          c.jsx(rn, {
            children: c.jsx('div', {
              className: 'animate-pulse space-y-4',
              children: [1, 2, 3].map(i =>
                c.jsxs(
                  'div',
                  {
                    className: 'flex gap-3',
                    children: [
                      c.jsx('div', { className: 'w-8 h-8 bg-muted rounded-full' }),
                      c.jsxs('div', {
                        className: 'flex-1 space-y-2',
                        children: [
                          c.jsx('div', { className: 'h-4 bg-muted rounded w-1/4' }),
                          c.jsx('div', { className: 'h-3 bg-muted rounded w-3/4' }),
                        ],
                      }),
                    ],
                  },
                  i
                )
              ),
            }),
          }),
        ],
      })
    : c.jsxs(nn, {
        className: 'mining-surface',
        children: [
          c.jsxs(wn, {
            children: [
              c.jsxs(Sn, {
                className: 'text-primary flex items-center gap-2',
                children: [c.jsx(Hg, { className: 'w-5 h-5' }), 'Comments'],
              }),
              c.jsxs(fi, { className: 'text-muted-foreground', children: [(e == null ? void 0 : e.count) || 0, ' community comments'] }),
            ],
          }),
          c.jsx(rn, {
            children: c.jsx('div', {
              className: 'space-y-4 max-h-96 overflow-y-auto',
              children:
                e != null && e.comments.length
                  ? e.comments.map(i =>
                      c.jsx(
                        'div',
                        {
                          className: 'p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors',
                          children: c.jsxs('div', {
                            className: 'flex gap-3',
                            children: [
                              c.jsxs(Zw, {
                                className: 'w-8 h-8',
                                children: [
                                  c.jsx(Jw, { src: i.avatarUrl, alt: i.author }),
                                  c.jsx(e1, { className: 'text-xs', children: s(i.author) }),
                                ],
                              }),
                              c.jsxs('div', {
                                className: 'flex-1 space-y-2',
                                children: [
                                  c.jsx('div', {
                                    className: 'flex items-center justify-between',
                                    children: c.jsxs('div', {
                                      className: 'flex items-center gap-2',
                                      children: [
                                        c.jsx('span', { className: 'font-medium text-secondary-foreground text-sm', children: i.author }),
                                        c.jsxs('div', {
                                          className: 'flex items-center gap-1 text-xs text-muted-foreground',
                                          children: [c.jsx(Vg, { className: 'w-3 h-3' }), o(i.date)],
                                        }),
                                      ],
                                    }),
                                  }),
                                  c.jsx('p', { className: 'text-sm text-muted-foreground leading-relaxed', children: i.text }),
                                  c.jsxs('div', {
                                    className: 'flex items-center gap-3',
                                    children: [
                                      i.upvotes > 0 &&
                                        c.jsxs('div', {
                                          className: 'flex items-center gap-1',
                                          children: [
                                            c.jsx(rb, { className: 'w-3 h-3 text-green-500' }),
                                            c.jsx('span', { className: 'text-xs text-green-500', children: i.upvotes }),
                                          ],
                                        }),
                                      i.downvotes < 0 &&
                                        c.jsxs('div', {
                                          className: 'flex items-center gap-1',
                                          children: [
                                            c.jsx(nb, { className: 'w-3 h-3 text-red-500' }),
                                            c.jsx('span', { className: 'text-xs text-red-500', children: Math.abs(i.downvotes) }),
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        },
                        i.id
                      )
                    )
                  : c.jsx('p', { className: 'text-muted-foreground text-center py-4', children: 'No comments available' }),
            }),
          }),
        ],
      });
}
var jf = 'Progress',
  Mf = 100,
  [PM, ZM] = dt(jf),
  [kM, TM] = PM(jf),
  t1 = d.forwardRef((e, t) => {
    const { __scopeProgress: n, value: r = null, max: o, getValueLabel: s = RM, ...i } = e;
    (o || o === 0) && !Hh(o) && console.error(jM(`${o}`, 'Progress'));
    const a = Hh(o) ? o : Mf;
    r !== null && !Kh(r, a) && console.error(MM(`${r}`, 'Progress'));
    const l = Kh(r, a) ? r : null,
      u = Va(l) ? s(l, a) : void 0;
    return c.jsx(kM, {
      scope: n,
      value: l,
      max: a,
      children: c.jsx(K.div, {
        'aria-valuemax': a,
        'aria-valuemin': 0,
        'aria-valuenow': Va(l) ? l : void 0,
        'aria-valuetext': u,
        role: 'progressbar',
        'data-state': o1(l, a),
        'data-value': l ?? void 0,
        'data-max': a,
        ...i,
        ref: t,
      }),
    });
  });
t1.displayName = jf;
var n1 = 'ProgressIndicator',
  r1 = d.forwardRef((e, t) => {
    const { __scopeProgress: n, ...r } = e,
      o = TM(n1, n);
    return c.jsx(K.div, { 'data-state': o1(o.value, o.max), 'data-value': o.value ?? void 0, 'data-max': o.max, ...r, ref: t });
  });
r1.displayName = n1;
function RM(e, t) {
  return `${Math.round((e / t) * 100)}%`;
}
function o1(e, t) {
  return e == null ? 'indeterminate' : e === t ? 'complete' : 'loading';
}
function Va(e) {
  return typeof e == 'number';
}
function Hh(e) {
  return Va(e) && !isNaN(e) && e > 0;
}
function Kh(e, t) {
  return Va(e) && !isNaN(e) && e <= t && e >= 0;
}
function jM(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Mf}\`.`;
}
function MM(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Mf} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var s1 = t1,
  _M = r1;
const i1 = d.forwardRef(({ className: e, value: t, ...n }, r) =>
  c.jsx(s1, {
    ref: r,
    className: Q('relative h-4 w-full overflow-hidden rounded-full bg-primary/20', e),
    ...n,
    children: c.jsx(_M, {
      className: 'h-full w-full flex-1 bg-primary transition-all',
      style: { transform: `translateX(-${100 - (t || 0)}%)` },
    }),
  })
);
i1.displayName = s1.displayName;
function IM({
  isActive: e,
  fileName: t = 'Unknown file',
  totalSize: n = '0 MB',
  onCancel: r,
  onPause: o,
  onResume: s,
  downloadType: i = 'game',
}) {
  const [a, l] = d.useState(0),
    [u, f] = d.useState('downloading'),
    [p, m] = d.useState('0 MB/s'),
    [v, S] = d.useState('--:--');
  d.useEffect(() => {
    if (!e || u === 'completed' || u === 'error' || u === 'paused') return;
    const x = setInterval(() => {
      l(h => {
        const y = h + Math.random() * 3;
        if (y < 100) {
          m(`${(Math.random() * 5 + 1).toFixed(1)} MB/s`);
          const C = (100 - y) / 10,
            E = Math.floor(C),
            N = Math.floor((C % 1) * 60);
          S(`${E}:${N.toString().padStart(2, '0')}`);
        }
        return y >= 100 ? (f('completed'), m('--'), S('Complete'), 100) : y;
      });
    }, 200);
    return () => clearInterval(x);
  }, [e, u]);
  const g = () => {
      switch (u) {
        case 'completed':
          return c.jsx(WE, { className: 'w-4 h-4 text-primary' });
        case 'error':
          return c.jsx(th, { className: 'w-4 h-4 text-destructive' });
        case 'paused':
          return c.jsx(nh, { className: 'w-4 h-4 text-muted-foreground' });
        default:
          return c.jsx(Qd, { className: 'w-4 h-4 text-primary animate-pulse' });
      }
    },
    w = () => {
      switch (i) {
        case 'level':
          return 'Level Download';
        case 'update':
          return 'Game Update';
        default:
          return 'Game Download';
      }
    };
  return e
    ? c.jsx(nn, {
        className: 'mining-surface border-primary/30',
        children: c.jsx(rn, {
          className: 'pt-4',
          children: c.jsxs('div', {
            className: 'space-y-3',
            children: [
              c.jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  c.jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [g(), c.jsx('span', { className: 'text-sm font-medium text-secondary-foreground', children: w() })],
                  }),
                  c.jsxs('div', {
                    className: 'flex items-center gap-1',
                    children: [
                      u === 'downloading' &&
                        c.jsx(xt, { variant: 'ghost', size: 'sm', onClick: o, children: c.jsx(nh, { className: 'w-3 h-3' }) }),
                      u === 'paused' &&
                        c.jsx(xt, { variant: 'ghost', size: 'sm', onClick: s, children: c.jsx(Yd, { className: 'w-3 h-3' }) }),
                      c.jsx(xt, { variant: 'ghost', size: 'sm', onClick: r, children: c.jsx(th, { className: 'w-3 h-3' }) }),
                    ],
                  }),
                ],
              }),
              c.jsxs('div', {
                className: 'space-y-2',
                children: [
                  c.jsxs('div', {
                    className: 'flex justify-between text-xs text-muted-foreground',
                    children: [c.jsx('span', { children: t }), c.jsx('span', { children: n })],
                  }),
                  c.jsx(i1, { value: a, className: 'h-3 bg-secondary/50' }),
                  c.jsxs('div', {
                    className: 'flex justify-between text-xs text-muted-foreground',
                    children: [
                      c.jsxs('span', { children: [a.toFixed(1), '% complete'] }),
                      c.jsxs('div', {
                        className: 'flex gap-3',
                        children: [c.jsx('span', { children: p }), c.jsxs('span', { children: ['ETA: ', v] })],
                      }),
                    ],
                  }),
                ],
              }),
              u === 'completed' &&
                c.jsx('div', { className: 'text-xs text-primary font-medium', children: '✓ Download completed successfully' }),
              u === 'error' &&
                c.jsx('div', { className: 'text-xs text-destructive font-medium', children: '✗ Download failed - Click to retry' }),
            ],
          }),
        }),
      })
    : null;
}
const AM = () => {
    const [e, t] = d.useState(!1);
    return c.jsxs('div', {
      className: 'container mx-auto p-6 space-y-6',
      children: [
        e &&
          c.jsx(IM, {
            isActive: e,
            fileName: 'ManicMiners_v2.1.3.exe',
            totalSize: '1.2 GB',
            downloadType: 'update',
            onCancel: () => t(!1),
            onPause: () => console.log('Paused'),
            onResume: () => console.log('Resumed'),
          }),
        c.jsxs('div', {
          className: 'grid grid-cols-1 lg:grid-cols-3 gap-6',
          children: [
            c.jsxs('div', { className: 'lg:col-span-2 space-y-6', children: [c.jsx(aM, {}), c.jsx(NM, {})] }),
            c.jsxs('div', { className: 'space-y-6', children: [c.jsx(uM, {}), c.jsx(lM, {})] }),
          ],
        }),
      ],
    });
  },
  OM = () => c.jsx(AM, {}),
  DM = () => {
    const e = Yo();
    return (
      d.useEffect(() => {
        console.error('404 Error: User attempted to access non-existent route:', e.pathname);
      }, [e.pathname]),
      c.jsx('div', {
        className: 'min-h-screen flex items-center justify-center bg-gray-100',
        children: c.jsxs('div', {
          className: 'text-center',
          children: [
            c.jsx('h1', { className: 'text-4xl font-bold mb-4', children: '404' }),
            c.jsx('p', { className: 'text-xl text-gray-600 mb-4', children: 'Oops! Page not found' }),
            c.jsx('a', { href: '/', className: 'text-blue-500 hover:text-blue-700 underline', children: 'Return to Home' }),
          ],
        }),
      })
    );
  },
  LM = new kP(),
  FM = () =>
    c.jsx(RP, {
      client: LM,
      children: c.jsxs(rP, {
        children: [
          c.jsx(Bb, {}),
          c.jsx(xN, {}),
          c.jsx(kk, {
            children: c.jsxs('div', {
              className: 'min-h-screen bg-background',
              children: [
                c.jsx(sM, {}),
                c.jsx('main', {
                  children: c.jsxs(xk, {
                    children: [c.jsx(Ac, { path: '/', element: c.jsx(OM, {}) }), c.jsx(Ac, { path: '*', element: c.jsx(DM, {}) })],
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    });
mg(document.getElementById('root')).render(c.jsx(FM, {}));
