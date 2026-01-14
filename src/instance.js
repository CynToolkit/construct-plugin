// @ts-ignore
// TODO: must use a bundler to support dependencies & typescript


let msgpack;
!(function (t) {
  msgpack = t();
})(function () {
  return (function () {
    function t(r, e, n) {
      function i(f, u) {
        if (!e[f]) {
          if (!r[f]) {
            var a = "function" == typeof require && require;
            if (!u && a) return a(f, !0);
            if (o) return o(f, !0);
            var s = new Error("Cannot find module '" + f + "'");
            throw ((s.code = "MODULE_NOT_FOUND"), s);
          }
          var c = (e[f] = { exports: {} });
          r[f][0].call(
            c.exports,
            function (t) {
              return i(r[f][1][t] || t);
            },
            c,
            c.exports,
            t,
            r,
            e,
            n
          );
        }
        return e[f].exports;
      }
      for (
        var o = "function" == typeof require && require, f = 0;
        f < n.length;
        f++
      )
        i(n[f]);
      return i;
    }
    return t;
  })()(
    {
      1: [
        function (t, r, e) {
          (e.encode = t("./encode").encode),
            (e.decode = t("./decode").decode),
            (e.Encoder = t("./encoder").Encoder),
            (e.Decoder = t("./decoder").Decoder),
            (e.createCodec = t("./ext").createCodec),
            (e.codec = t("./codec").codec);
        },
        {
          "./codec": 10,
          "./decode": 12,
          "./decoder": 13,
          "./encode": 15,
          "./encoder": 16,
          "./ext": 20,
        },
      ],
      2: [
        function (t, r, e) {
          (function (Buffer) {
            (function () {
              function t(t) {
                return t && t.isBuffer && t;
              }
              r.exports =
                t(void 0 !== Buffer && Buffer) ||
                t(this.Buffer) ||
                t("undefined" != typeof window && window.Buffer) ||
                this.Buffer;
            }).call(this);
          }).call(this, t("buffer").Buffer);
        },
        { buffer: 30 },
      ],
      3: [
        function (t, r, e) {
          function n(t, r) {
            for (
              var e = this, n = r || (r |= 0), i = t.length, o = 0, f = 0;
              f < i;

            )
              (o = t.charCodeAt(f++)),
                o < 128
                  ? (e[n++] = o)
                  : o < 2048
                  ? ((e[n++] = 192 | (o >>> 6)), (e[n++] = 128 | (63 & o)))
                  : o < 55296 || o > 57343
                  ? ((e[n++] = 224 | (o >>> 12)),
                    (e[n++] = 128 | ((o >>> 6) & 63)),
                    (e[n++] = 128 | (63 & o)))
                  : ((o =
                      65536 +
                      (((o - 55296) << 10) | (t.charCodeAt(f++) - 56320))),
                    (e[n++] = 240 | (o >>> 18)),
                    (e[n++] = 128 | ((o >>> 12) & 63)),
                    (e[n++] = 128 | ((o >>> 6) & 63)),
                    (e[n++] = 128 | (63 & o)));
            return n - r;
          }
          function i(t, r, e) {
            var n = this,
              i = 0 | r;
            e || (e = n.length);
            for (var o = "", f = 0; i < e; )
              (f = n[i++]),
                f < 128
                  ? (o += String.fromCharCode(f))
                  : (192 == (224 & f)
                      ? (f = ((31 & f) << 6) | (63 & n[i++]))
                      : 224 == (240 & f)
                      ? (f =
                          ((15 & f) << 12) |
                          ((63 & n[i++]) << 6) |
                          (63 & n[i++]))
                      : 240 == (248 & f) &&
                        (f =
                          ((7 & f) << 18) |
                          ((63 & n[i++]) << 12) |
                          ((63 & n[i++]) << 6) |
                          (63 & n[i++])),
                    f >= 65536
                      ? ((f -= 65536),
                        (o += String.fromCharCode(
                          55296 + (f >>> 10),
                          56320 + (1023 & f)
                        )))
                      : (o += String.fromCharCode(f)));
            return o;
          }
          function o(t, r, e, n) {
            var i;
            e || (e = 0), n || 0 === n || (n = this.length), r || (r = 0);
            var o = n - e;
            if (t === this && e < r && r < n)
              for (i = o - 1; i >= 0; i--) t[i + r] = this[i + e];
            else for (i = 0; i < o; i++) t[i + r] = this[i + e];
            return o;
          }
          (e.copy = o), (e.toString = i), (e.write = n);
        },
        {},
      ],
      4: [
        function (t, r, e) {
          function n(t) {
            return new Array(t);
          }
          function i(t) {
            if (!o.isBuffer(t) && o.isView(t)) t = o.Uint8Array.from(t);
            else if (o.isArrayBuffer(t)) t = new Uint8Array(t);
            else {
              if ("string" == typeof t) return o.from.call(e, t);
              if ("number" == typeof t)
                throw new TypeError('"value" argument must not be a number');
            }
            return Array.prototype.slice.call(t);
          }
          var o = t("./bufferish"),
            e = (r.exports = n(0));
          (e.alloc = n), (e.concat = o.concat), (e.from = i);
        },
        { "./bufferish": 8 },
      ],
      5: [
        function (t, r, e) {
          function n(t) {
            return new Buffer(t);
          }
          function i(t) {
            if (!o.isBuffer(t) && o.isView(t)) t = o.Uint8Array.from(t);
            else if (o.isArrayBuffer(t)) t = new Uint8Array(t);
            else {
              if ("string" == typeof t) return o.from.call(e, t);
              if ("number" == typeof t)
                throw new TypeError('"value" argument must not be a number');
            }
            return Buffer.from && 1 !== Buffer.from.length
              ? Buffer.from(t)
              : new Buffer(t);
          }
          var o = t("./bufferish"),
            Buffer = o.global,
            e = (r.exports = o.hasBuffer ? n(0) : []);
          (e.alloc = (o.hasBuffer && Buffer.alloc) || n),
            (e.concat = o.concat),
            (e.from = i);
        },
        { "./bufferish": 8 },
      ],
      6: [
        function (t, r, e) {
          function n(t, r, e, n) {
            var o = u.isBuffer(this),
              a = u.isBuffer(t);
            if (o && a) return this.copy(t, r, e, n);
            if (s || o || a || !u.isView(this) || !u.isView(t))
              return f.copy.call(this, t, r, e, n);
            var c = e || null != n ? i.call(this, e, n) : this;
            return t.set(c, r), c.length;
          }
          function i(t, r) {
            var e = this.slice || (!s && this.subarray);
            if (e) return e.call(this, t, r);
            var i = u.alloc.call(this, r - t);
            return n.call(this, i, 0, t, r), i;
          }
          function o(t, r, e) {
            return (!a && u.isBuffer(this) ? this.toString : f.toString).apply(
              this,
              arguments
            );
          }
          var f = t("./buffer-lite");
          (e.copy = n),
            (e.slice = i),
            (e.toString = o),
            (e.write = (function (t) {
              function r() {
                return (this[t] || f[t]).apply(this, arguments);
              }
              return r;
            })("write"));
          var u = t("./bufferish"),
            Buffer = u.global,
            a = u.hasBuffer && "TYPED_ARRAY_SUPPORT" in Buffer,
            s = a && !Buffer.TYPED_ARRAY_SUPPORT;
        },
        { "./buffer-lite": 3, "./bufferish": 8 },
      ],
      7: [
        function (t, r, e) {
          function n(t) {
            return new Uint8Array(t);
          }
          function i(t) {
            if (o.isView(t)) {
              var r = t.byteOffset,
                n = t.byteLength;
              (t = t.buffer),
                t.byteLength !== n &&
                  (t.slice
                    ? (t = t.slice(r, r + n))
                    : ((t = new Uint8Array(t)),
                      t.byteLength !== n &&
                        (t = Array.prototype.slice.call(t, r, r + n))));
            } else {
              if ("string" == typeof t) return o.from.call(e, t);
              if ("number" == typeof t)
                throw new TypeError('"value" argument must not be a number');
            }
            return new Uint8Array(t);
          }
          var o = t("./bufferish"),
            e = (r.exports = o.hasArrayBuffer ? n(0) : []);
          (e.alloc = n), (e.concat = o.concat), (e.from = i);
        },
        { "./bufferish": 8 },
      ],
      8: [
        function (t, r, e) {
          function n(t) {
            return "string" == typeof t ? u.call(this, t) : a(this).from(t);
          }
          function i(t) {
            return a(this).alloc(t);
          }
          function o(t, r) {
            function n(t) {
              r += t.length;
            }
            function o(t) {
              a += w.copy.call(t, u, a);
            }
            r || ((r = 0), Array.prototype.forEach.call(t, n));
            var f = (this !== e && this) || t[0],
              u = i.call(f, r),
              a = 0;
            return Array.prototype.forEach.call(t, o), u;
          }
          function f(t) {
            return t instanceof ArrayBuffer || E(t);
          }
          function u(t) {
            var r = 3 * t.length,
              e = i.call(this, r),
              n = w.write.call(e, t);
            return r !== n && (e = w.slice.call(e, 0, n)), e;
          }
          function a(t) {
            return d(t) ? v : y(t) ? b : p(t) ? g : h ? v : l ? b : g;
          }
          function s() {
            return !1;
          }
          function c(t, r) {
            return (
              (t = "[object " + t + "]"),
              function (e) {
                return null != e && {}.toString.call(r ? e[r] : e) === t;
              }
            );
          }
          var Buffer = (e.global = t("./buffer-global")),
            h = (e.hasBuffer = Buffer && !!Buffer.isBuffer),
            l = (e.hasArrayBuffer = "undefined" != typeof ArrayBuffer),
            p = (e.isArray = t("isarray"));
          e.isArrayBuffer = l ? f : s;
          var d = (e.isBuffer = h ? Buffer.isBuffer : s),
            y = (e.isView = l
              ? ArrayBuffer.isView || c("ArrayBuffer", "buffer")
              : s);
          (e.alloc = i), (e.concat = o), (e.from = n);
          var g = (e.Array = t("./bufferish-array")),
            v = (e.Buffer = t("./bufferish-buffer")),
            b = (e.Uint8Array = t("./bufferish-uint8array")),
            w = (e.prototype = t("./bufferish-proto")),
            E = c("ArrayBuffer");
        },
        {
          "./buffer-global": 2,
          "./bufferish-array": 4,
          "./bufferish-buffer": 5,
          "./bufferish-proto": 6,
          "./bufferish-uint8array": 7,
          isarray: 34,
        },
      ],
      9: [
        function (t, r, e) {
          function n(t) {
            if (!(this instanceof n)) return new n(t);
            (this.options = t), this.init();
          }
          function i(t) {
            for (var r in t) n.prototype[r] = o(n.prototype[r], t[r]);
          }
          function o(t, r) {
            function e() {
              return t.apply(this, arguments), r.apply(this, arguments);
            }
            return t && r ? e : t || r;
          }
          function f(t) {
            function r(t, r) {
              return r(t);
            }
            return (
              (t = t.slice()),
              function (e) {
                return t.reduce(r, e);
              }
            );
          }
          function u(t) {
            return s(t) ? f(t) : t;
          }
          function a(t) {
            return new n(t);
          }
          var s = t("isarray");
          (e.createCodec = a), (e.install = i), (e.filter = u);
          var c = t("./bufferish");
          n.prototype.init = function () {
            var t = this.options;
            return t && t.uint8array && (this.bufferish = c.Uint8Array), this;
          };
          var h = "undefined" != typeof BigInt;
          e.preset = a({ preset: !0, bigint: h });
        },
        { "./bufferish": 8, isarray: 34 },
      ],
      10: [
        function (t, r, e) {
          t("./read-core"),
            t("./write-core"),
            (e.codec = { preset: t("./codec-base").preset });
        },
        { "./codec-base": 9, "./read-core": 22, "./write-core": 25 },
      ],
      11: [
        function (t, r, e) {
          function n(t) {
            if (!(this instanceof n)) return new n(t);
            if (t && ((this.options = t), t.codec)) {
              var r = (this.codec = t.codec);
              r.bufferish && (this.bufferish = r.bufferish);
            }
          }
          e.DecodeBuffer = n;
          var i = t("./read-core").preset;
          t("./flex-buffer").FlexDecoder.mixin(n.prototype),
            (n.prototype.codec = i),
            (n.prototype.fetch = function () {
              return this.codec.decode(this);
            });
        },
        { "./flex-buffer": 21, "./read-core": 22 },
      ],
      12: [
        function (t, r, e) {
          function n(t, r) {
            var e = new i(r);
            return e.write(t), e.read();
          }
          e.decode = n;
          var i = t("./decode-buffer").DecodeBuffer;
        },
        { "./decode-buffer": 11 },
      ],
      13: [
        function (t, r, e) {
          function n(t) {
            if (!(this instanceof n)) return new n(t);
            o.call(this, t);
          }
          e.Decoder = n;
          var i = t("event-lite"),
            o = t("./decode-buffer").DecodeBuffer;
          (n.prototype = new o()),
            i.mixin(n.prototype),
            (n.prototype.decode = function (t) {
              arguments.length && this.write(t), this.flush();
            }),
            (n.prototype.push = function (t) {
              this.emit("data", t);
            }),
            (n.prototype.end = function (t) {
              this.decode(t), this.emit("end");
            });
        },
        { "./decode-buffer": 11, "event-lite": 31 },
      ],
      14: [
        function (t, r, e) {
          function n(t) {
            if (!(this instanceof n)) return new n(t);
            if (t && ((this.options = t), t.codec)) {
              var r = (this.codec = t.codec);
              r.bufferish && (this.bufferish = r.bufferish);
            }
          }
          e.EncodeBuffer = n;
          var i = t("./write-core").preset;
          t("./flex-buffer").FlexEncoder.mixin(n.prototype),
            (n.prototype.codec = i),
            (n.prototype.write = function (t) {
              this.codec.encode(this, t);
            });
        },
        { "./flex-buffer": 21, "./write-core": 25 },
      ],
      15: [
        function (t, r, e) {
          function n(t, r) {
            var e = new i(r);
            return e.write(t), e.read();
          }
          e.encode = n;
          var i = t("./encode-buffer").EncodeBuffer;
        },
        { "./encode-buffer": 14 },
      ],
      16: [
        function (t, r, e) {
          function n(t) {
            if (!(this instanceof n)) return new n(t);
            o.call(this, t);
          }
          e.Encoder = n;
          var i = t("event-lite"),
            o = t("./encode-buffer").EncodeBuffer;
          (n.prototype = new o()),
            i.mixin(n.prototype),
            (n.prototype.encode = function (t) {
              this.write(t), this.emit("data", this.read());
            }),
            (n.prototype.end = function (t) {
              arguments.length && this.encode(t),
                this.flush(),
                this.emit("end");
            });
        },
        { "./encode-buffer": 14, "event-lite": 31 },
      ],
      17: [
        function (t, r, e) {
          function n(t, r) {
            if (!(this instanceof n)) return new n(t, r);
            (this.buffer = i.from(t)), (this.type = r);
          }
          e.ExtBuffer = n;
          var i = t("./bufferish");
        },
        { "./bufferish": 8 },
      ],
      18: [
        function (t, r, e) {
          function n(t) {
            t.addExtPacker(14, Error, [u, i]),
              t.addExtPacker(1, EvalError, [u, i]),
              t.addExtPacker(2, RangeError, [u, i]),
              t.addExtPacker(3, ReferenceError, [u, i]),
              t.addExtPacker(4, SyntaxError, [u, i]),
              t.addExtPacker(5, TypeError, [u, i]),
              t.addExtPacker(6, URIError, [u, i]),
              t.addExtPacker(10, RegExp, [f, i]),
              t.addExtPacker(11, Boolean, [o, i]),
              t.addExtPacker(12, String, [o, i]),
              t.addExtPacker(13, Date, [Number, i]),
              t.addExtPacker(15, Number, [o, i]),
              "undefined" != typeof Uint8Array &&
                (t.addExtPacker(17, Int8Array, c),
                t.addExtPacker(18, Uint8Array, c),
                t.addExtPacker(19, Int16Array, c),
                t.addExtPacker(20, Uint16Array, c),
                t.addExtPacker(21, Int32Array, c),
                t.addExtPacker(22, Uint32Array, c),
                t.addExtPacker(23, Float32Array, c),
                "undefined" != typeof Float64Array &&
                  t.addExtPacker(24, Float64Array, c),
                "undefined" != typeof Uint8ClampedArray &&
                  t.addExtPacker(25, Uint8ClampedArray, c),
                t.addExtPacker(26, ArrayBuffer, c),
                t.addExtPacker(29, DataView, c)),
              s.hasBuffer && t.addExtPacker(27, Buffer, s.from);
          }
          function i(r) {
            return a || (a = t("./encode").encode), a(r);
          }
          function o(t) {
            return t.valueOf();
          }
          function f(t) {
            (t = RegExp.prototype.toString.call(t).split("/")), t.shift();
            var r = [t.pop()];
            return r.unshift(t.join("/")), r;
          }
          function u(t) {
            var r = {};
            for (var e in h) r[e] = t[e];
            return r;
          }
          e.setExtPackers = n;
          var a,
            s = t("./bufferish"),
            Buffer = s.global,
            c = s.Uint8Array.from,
            h = {
              name: 1,
              message: 1,
              stack: 1,
              columnNumber: 1,
              fileName: 1,
              lineNumber: 1,
            };
        },
        { "./bufferish": 8, "./encode": 15 },
      ],
      19: [
        function (t, r, e) {
          function n(t) {
            t.addExtUnpacker(14, [i, f(Error)]),
              t.addExtUnpacker(1, [i, f(EvalError)]),
              t.addExtUnpacker(2, [i, f(RangeError)]),
              t.addExtUnpacker(3, [i, f(ReferenceError)]),
              t.addExtUnpacker(4, [i, f(SyntaxError)]),
              t.addExtUnpacker(5, [i, f(TypeError)]),
              t.addExtUnpacker(6, [i, f(URIError)]),
              t.addExtUnpacker(10, [i, o]),
              t.addExtUnpacker(11, [i, u(Boolean)]),
              t.addExtUnpacker(12, [i, u(String)]),
              t.addExtUnpacker(13, [i, u(Date)]),
              t.addExtUnpacker(15, [i, u(Number)]),
              "undefined" != typeof Uint8Array &&
                (t.addExtUnpacker(17, u(Int8Array)),
                t.addExtUnpacker(18, u(Uint8Array)),
                t.addExtUnpacker(19, [a, u(Int16Array)]),
                t.addExtUnpacker(20, [a, u(Uint16Array)]),
                t.addExtUnpacker(21, [a, u(Int32Array)]),
                t.addExtUnpacker(22, [a, u(Uint32Array)]),
                t.addExtUnpacker(23, [a, u(Float32Array)]),
                "undefined" != typeof Float64Array &&
                  t.addExtUnpacker(24, [a, u(Float64Array)]),
                "undefined" != typeof Uint8ClampedArray &&
                  t.addExtUnpacker(25, u(Uint8ClampedArray)),
                t.addExtUnpacker(26, a),
                t.addExtUnpacker(29, [a, u(DataView)])),
              c.hasBuffer && t.addExtUnpacker(27, u(Buffer));
          }
          function i(r) {
            return s || (s = t("./decode").decode), s(r);
          }
          function o(t) {
            return RegExp.apply(null, t);
          }
          function f(t) {
            return function (r) {
              var e = new t();
              for (var n in h) e[n] = r[n];
              return e;
            };
          }
          function u(t) {
            return function (r) {
              return new t(r);
            };
          }
          function a(t) {
            return new Uint8Array(t).buffer;
          }
          e.setExtUnpackers = n;
          var s,
            c = t("./bufferish"),
            Buffer = c.global,
            h = {
              name: 1,
              message: 1,
              stack: 1,
              columnNumber: 1,
              fileName: 1,
              lineNumber: 1,
            };
        },
        { "./bufferish": 8, "./decode": 12 },
      ],
      20: [
        function (t, r, e) {
          t("./read-core"),
            t("./write-core"),
            (e.createCodec = t("./codec-base").createCodec);
        },
        { "./codec-base": 9, "./read-core": 22, "./write-core": 25 },
      ],
      21: [
        function (t, r, e) {
          function n() {
            if (!(this instanceof n)) return new n();
          }
          function i() {
            if (!(this instanceof i)) return new i();
          }
          function o() {
            throw new Error("method not implemented: write()");
          }
          function f() {
            throw new Error("method not implemented: fetch()");
          }
          function u() {
            return this.buffers && this.buffers.length
              ? (this.flush(), this.pull())
              : this.fetch();
          }
          function a(t) {
            (this.buffers || (this.buffers = [])).push(t);
          }
          function s() {
            return (this.buffers || (this.buffers = [])).shift();
          }
          function c(t) {
            function r(r) {
              for (var e in t) r[e] = t[e];
              return r;
            }
            return r;
          }
          (e.FlexDecoder = n), (e.FlexEncoder = i);
          var h = t("./bufferish"),
            l = 2048,
            p = 65536,
            d = "BUFFER_SHORTAGE";
          (n.mixin = c(
            (function () {
              function t(t) {
                var r = this.offset
                  ? h.prototype.slice.call(this.buffer, this.offset)
                  : this.buffer;
                (this.buffer = r ? (t ? this.bufferish.concat([r, t]) : r) : t),
                  (this.offset = 0);
              }
              function r() {
                for (; this.offset < this.buffer.length; ) {
                  var t,
                    r = this.offset;
                  try {
                    t = this.fetch();
                  } catch (t) {
                    if (t && t.message != d) throw t;
                    this.offset = r;
                    break;
                  }
                  this.push(t);
                }
              }
              function e(t) {
                var r = this.offset,
                  e = r + t;
                if (e > this.buffer.length) throw new Error(d);
                return (this.offset = e), r;
              }
              return {
                bufferish: h,
                write: t,
                fetch: f,
                flush: r,
                push: a,
                pull: s,
                read: u,
                reserve: e,
                offset: 0,
              };
            })()
          )),
            n.mixin(n.prototype),
            (i.mixin = c(
              (function () {
                function t() {
                  var t = this.start;
                  if (t < this.offset) {
                    var r = (this.start = this.offset);
                    return h.prototype.slice.call(this.buffer, t, r);
                  }
                }
                function r() {
                  for (; this.start < this.offset; ) {
                    var t = this.fetch();
                    t && this.push(t);
                  }
                }
                function e() {
                  var t = this.buffers || (this.buffers = []),
                    r = t.length > 1 ? this.bufferish.concat(t) : t[0];
                  return (t.length = 0), r;
                }
                function n(t) {
                  var r = 0 | t;
                  if (this.buffer) {
                    var e = this.buffer.length,
                      n = 0 | this.offset,
                      i = n + r;
                    if (i < e) return (this.offset = i), n;
                    this.flush(),
                      (t = Math.max(t, Math.min(2 * e, this.maxBufferSize)));
                  }
                  return (
                    (t = Math.max(t, this.minBufferSize)),
                    (this.buffer = this.bufferish.alloc(t)),
                    (this.start = 0),
                    (this.offset = r),
                    0
                  );
                }
                function i(t) {
                  var r = t.length;
                  if (r > this.minBufferSize) this.flush(), this.push(t);
                  else {
                    var e = this.reserve(r);
                    h.prototype.copy.call(t, this.buffer, e);
                  }
                }
                return {
                  bufferish: h,
                  write: o,
                  fetch: t,
                  flush: r,
                  push: a,
                  pull: e,
                  read: u,
                  reserve: n,
                  send: i,
                  maxBufferSize: p,
                  minBufferSize: l,
                  offset: 0,
                  start: 0,
                };
              })()
            )),
            i.mixin(i.prototype);
        },
        { "./bufferish": 8 },
      ],
      22: [
        function (t, r, e) {
          function n(t) {
            function r(t) {
              var r = s(t),
                n = e[r];
              if (!n)
                throw new Error(
                  "Invalid type: " + (r ? "0x" + r.toString(16) : r)
                );
              return n(t);
            }
            var e = c.getReadToken(t);
            return r;
          }
          function i() {
            var t = this.options;
            return (
              (this.decode = n(t)),
              t && t.preset && a.setExtUnpackers(this),
              this
            );
          }
          function o(t, r) {
            (this.extUnpackers || (this.extUnpackers = []))[t] = h.filter(r);
          }
          function f(t) {
            function r(r) {
              return new u(r, t);
            }
            return (this.extUnpackers || (this.extUnpackers = []))[t] || r;
          }
          var u = t("./ext-buffer").ExtBuffer,
            a = t("./ext-unpacker"),
            s = t("./read-format").readUint8,
            c = t("./read-token"),
            h = t("./codec-base");
          h.install({ addExtUnpacker: o, getExtUnpacker: f, init: i }),
            (e.preset = i.call(h.preset));
        },
        {
          "./codec-base": 9,
          "./ext-buffer": 17,
          "./ext-unpacker": 19,
          "./read-format": 23,
          "./read-token": 24,
        },
      ],
      23: [
        function (t, r, e) {
          function n(t) {
            var r = _.hasArrayBuffer && t && t.binarraybuffer,
              e = t && t.int64,
              n = Y && t && t.bigint;
            return {
              map: S && t && t.usemap ? o : i,
              array: f,
              str: u,
              bin: r ? s : a,
              ext: c,
              uint8: h,
              uint16: p,
              uint32: y,
              uint64: v(8, n ? m : e ? E : b),
              int8: l,
              int16: d,
              int32: g,
              int64: v(8, n ? B : e ? A : w),
              float32: v(4, x),
              float64: v(8, U),
            };
          }
          function i(t, r) {
            var e,
              n = {},
              i = new Array(r),
              o = new Array(r),
              f = t.codec.decode;
            for (e = 0; e < r; e++) (i[e] = f(t)), (o[e] = f(t));
            for (e = 0; e < r; e++) n[i[e]] = o[e];
            return n;
          }
          function o(t, r) {
            var e,
              n = new Map(),
              i = new Array(r),
              o = new Array(r),
              f = t.codec.decode;
            for (e = 0; e < r; e++) (i[e] = f(t)), (o[e] = f(t));
            for (e = 0; e < r; e++) n.set(i[e], o[e]);
            return n;
          }
          function f(t, r) {
            for (var e = new Array(r), n = t.codec.decode, i = 0; i < r; i++)
              e[i] = n(t);
            return e;
          }
          function u(t, r) {
            var e = t.reserve(r),
              n = e + r;
            return T.toString.call(t.buffer, "utf-8", e, n);
          }
          function a(t, r) {
            var e = t.reserve(r),
              n = e + r,
              i = T.slice.call(t.buffer, e, n);
            return _.from(i);
          }
          function s(t, r) {
            var e = t.reserve(r),
              n = e + r,
              i = T.slice.call(t.buffer, e, n);
            return _.Uint8Array.from(i).buffer;
          }
          function c(t, r) {
            var e = t.reserve(r + 1),
              n = t.buffer[e++],
              i = e + r,
              o = t.codec.getExtUnpacker(n);
            if (!o)
              throw new Error(
                "Invalid ext type: " + (n ? "0x" + n.toString(16) : n)
              );
            return o(T.slice.call(t.buffer, e, i));
          }
          function h(t) {
            var r = t.reserve(1);
            return t.buffer[r];
          }
          function l(t) {
            var r = t.reserve(1),
              e = t.buffer[r];
            return 128 & e ? e - 256 : e;
          }
          function p(t) {
            var r = t.reserve(2),
              e = t.buffer;
            return (e[r++] << 8) | e[r];
          }
          function d(t) {
            var r = t.reserve(2),
              e = t.buffer,
              n = (e[r++] << 8) | e[r];
            return 32768 & n ? n - 65536 : n;
          }
          function y(t) {
            var r = t.reserve(4),
              e = t.buffer;
            return 16777216 * e[r++] + (e[r++] << 16) + (e[r++] << 8) + e[r];
          }
          function g(t) {
            var r = t.reserve(4),
              e = t.buffer;
            return (e[r++] << 24) | (e[r++] << 16) | (e[r++] << 8) | e[r];
          }
          function v(t, r) {
            return function (e) {
              var n = e.reserve(t);
              return r.call(e.buffer, n, C);
            };
          }
          function b(t) {
            return new k(this, t).toNumber();
          }
          function w(t) {
            return new I(this, t).toNumber();
          }
          function E(t) {
            return new k(this, t);
          }
          function A(t) {
            return new I(this, t);
          }
          function m(t) {
            for (var r = this, e = BigInt(0), n = 0; n < 8; n++)
              e = (e << BigInt(8)) | BigInt(r[t + n]);
            return e;
          }
          function B(t) {
            for (var r = this, e = BigInt(0), n = 0; n < 8; n++)
              e = (e << BigInt(8)) | BigInt(r[t + n]);
            return (
              e >= BigInt("0x8000000000000000") &&
                (e -= BigInt("0x10000000000000000")),
              e
            );
          }
          function x(t) {
            return P.read(this, t, !1, 23, 4);
          }
          function U(t) {
            return P.read(this, t, !1, 52, 8);
          }
          var P = t("ieee754"),
            R = t("int64-buffer"),
            k = R.Uint64BE,
            I = R.Int64BE;
          (e.getReadFormat = n), (e.readUint8 = h);
          var _ = t("./bufferish"),
            T = t("./bufferish-proto"),
            S = "undefined" != typeof Map,
            Y = "undefined" != typeof BigInt,
            C = !0;
        },
        {
          "./bufferish": 8,
          "./bufferish-proto": 6,
          ieee754: 32,
          "int64-buffer": 33,
        },
      ],
      24: [
        function (t, r, e) {
          function n(t) {
            var r = s.getReadFormat(t),
              e = t && t.bigint;
            return t && t.useraw ? o(r, e) : i(r, e);
          }
          function i(t, r) {
            var e,
              n = new Array(256);
            for (e = 0; e <= 127; e++) n[e] = f(e);
            for (e = 128; e <= 143; e++) n[e] = a(e - 128, t.map);
            for (e = 144; e <= 159; e++) n[e] = a(e - 144, t.array);
            for (e = 160; e <= 191; e++) n[e] = a(e - 160, t.str);
            for (
              n[192] = f(null),
                n[193] = null,
                n[194] = f(!1),
                n[195] = f(!0),
                n[196] = u(t.uint8, t.bin),
                n[197] = u(t.uint16, t.bin),
                n[198] = u(t.uint32, t.bin),
                n[199] = u(t.uint8, t.ext),
                n[200] = u(t.uint16, t.ext),
                n[201] = u(t.uint32, t.ext),
                n[202] = t.float32,
                n[203] = t.float64,
                n[204] = t.uint8,
                n[205] = t.uint16,
                n[206] = t.uint32,
                n[207] = t.uint64,
                n[208] = t.int8,
                n[209] = t.int16,
                n[210] = t.int32,
                n[211] = t.int64,
                n[212] = a(1, t.ext),
                n[213] = a(2, t.ext),
                n[214] = a(4, t.ext),
                n[215] = a(8, t.ext),
                n[216] = a(16, t.ext),
                n[217] = u(t.uint8, t.str),
                n[218] = u(t.uint16, t.str),
                n[219] = u(t.uint32, t.str),
                n[220] = u(t.uint16, t.array),
                n[221] = u(t.uint32, t.array),
                n[222] = u(t.uint16, t.map),
                n[223] = u(t.uint32, t.map),
                e = 224;
              e <= 255;
              e++
            )
              n[e] = f(e - 256);
            return n;
          }
          function o(t, r) {
            var e,
              n = i(t, r).slice();
            for (
              n[217] = n[196], n[218] = n[197], n[219] = n[198], e = 160;
              e <= 191;
              e++
            )
              n[e] = a(e - 160, t.bin);
            return n;
          }
          function f(t) {
            return function () {
              return t;
            };
          }
          function u(t, r) {
            return function (e) {
              var n = t(e);
              return r(e, n);
            };
          }
          function a(t, r) {
            return function (e) {
              return r(e, t);
            };
          }
          var s = t("./read-format");
          e.getReadToken = n;
        },
        { "./read-format": 23 },
      ],
      25: [
        function (t, r, e) {
          function n(t) {
            function r(t, r) {
              var n = e[typeof r];
              if (!n)
                throw new Error('Unsupported type "' + typeof r + '": ' + r);
              n(t, r);
            }
            var e = s.getWriteType(t);
            return r;
          }
          function i() {
            var t = this.options;
            return (
              (this.encode = n(t)), t && t.preset && a.setExtPackers(this), this
            );
          }
          function o(t, r, e) {
            function n(r) {
              return e && (r = e(r)), new u(r, t);
            }
            e = c.filter(e);
            var i = r.name;
            if (i && "Object" !== i) {
              (this.extPackers || (this.extPackers = {}))[i] = n;
            } else {
              (this.extEncoderList || (this.extEncoderList = [])).unshift([
                r,
                n,
              ]);
            }
          }
          function f(t) {
            var r = this.extPackers || (this.extPackers = {}),
              e = t.constructor,
              n = e && e.name && r[e.name];
            if (n) return n;
            for (
              var i = this.extEncoderList || (this.extEncoderList = []),
                o = i.length,
                f = 0;
              f < o;
              f++
            ) {
              var u = i[f];
              if (e === u[0]) return u[1];
            }
          }
          var u = t("./ext-buffer").ExtBuffer,
            a = t("./ext-packer"),
            s = t("./write-type"),
            c = t("./codec-base");
          c.install({ addExtPacker: o, getExtPacker: f, init: i }),
            (e.preset = i.call(c.preset));
        },
        {
          "./codec-base": 9,
          "./ext-buffer": 17,
          "./ext-packer": 18,
          "./write-type": 27,
        },
      ],
      26: [
        function (t, r, e) {
          function n(t) {
            return t && t.uint8array
              ? i()
              : m || (E.hasBuffer && t && t.safe)
              ? f()
              : o();
          }
          function i() {
            var t = o();
            return (t[202] = c(202, 4, p)), (t[203] = c(203, 8, d)), t;
          }
          function o() {
            var t = w.slice();
            return (
              (t[196] = u(196)),
              (t[197] = a(197)),
              (t[198] = s(198)),
              (t[199] = u(199)),
              (t[200] = a(200)),
              (t[201] = s(201)),
              (t[202] = c(202, 4, B.writeFloatBE || p, !0)),
              (t[203] = c(203, 8, B.writeDoubleBE || d, !0)),
              (t[204] = u(204)),
              (t[205] = a(205)),
              (t[206] = s(206)),
              (t[207] = c(207, 8, h)),
              (t[208] = u(208)),
              (t[209] = a(209)),
              (t[210] = s(210)),
              (t[211] = c(211, 8, l)),
              (t[217] = u(217)),
              (t[218] = a(218)),
              (t[219] = s(219)),
              (t[220] = a(220)),
              (t[221] = s(221)),
              (t[222] = a(222)),
              (t[223] = s(223)),
              t
            );
          }
          function f() {
            var t = w.slice();
            return (
              (t[196] = c(196, 1, Buffer.prototype.writeUInt8)),
              (t[197] = c(197, 2, Buffer.prototype.writeUInt16BE)),
              (t[198] = c(198, 4, Buffer.prototype.writeUInt32BE)),
              (t[199] = c(199, 1, Buffer.prototype.writeUInt8)),
              (t[200] = c(200, 2, Buffer.prototype.writeUInt16BE)),
              (t[201] = c(201, 4, Buffer.prototype.writeUInt32BE)),
              (t[202] = c(202, 4, Buffer.prototype.writeFloatBE)),
              (t[203] = c(203, 8, Buffer.prototype.writeDoubleBE)),
              (t[204] = c(204, 1, Buffer.prototype.writeUInt8)),
              (t[205] = c(205, 2, Buffer.prototype.writeUInt16BE)),
              (t[206] = c(206, 4, Buffer.prototype.writeUInt32BE)),
              (t[207] = c(207, 8, h)),
              (t[208] = c(208, 1, Buffer.prototype.writeInt8)),
              (t[209] = c(209, 2, Buffer.prototype.writeInt16BE)),
              (t[210] = c(210, 4, Buffer.prototype.writeInt32BE)),
              (t[211] = c(211, 8, l)),
              (t[217] = c(217, 1, Buffer.prototype.writeUInt8)),
              (t[218] = c(218, 2, Buffer.prototype.writeUInt16BE)),
              (t[219] = c(219, 4, Buffer.prototype.writeUInt32BE)),
              (t[220] = c(220, 2, Buffer.prototype.writeUInt16BE)),
              (t[221] = c(221, 4, Buffer.prototype.writeUInt32BE)),
              (t[222] = c(222, 2, Buffer.prototype.writeUInt16BE)),
              (t[223] = c(223, 4, Buffer.prototype.writeUInt32BE)),
              t
            );
          }
          function u(t) {
            return function (r, e) {
              var n = r.reserve(2),
                i = r.buffer;
              (i[n++] = t), (i[n] = e);
            };
          }
          function a(t) {
            return function (r, e) {
              var n = r.reserve(3),
                i = r.buffer;
              (i[n++] = t), (i[n++] = e >>> 8), (i[n] = e);
            };
          }
          function s(t) {
            return function (r, e) {
              var n = r.reserve(5),
                i = r.buffer;
              (i[n++] = t),
                (i[n++] = e >>> 24),
                (i[n++] = e >>> 16),
                (i[n++] = e >>> 8),
                (i[n] = e);
            };
          }
          function c(t, r, e, n) {
            return function (i, o) {
              var f = i.reserve(r + 1);
              (i.buffer[f++] = t), e.call(i.buffer, o, f, n);
            };
          }
          function h(t, r) {
            new v(this, r, t);
          }
          function l(t, r) {
            new b(this, r, t);
          }
          function p(t, r) {
            y.write(this, t, r, !1, 23, 4);
          }
          function d(t, r) {
            y.write(this, t, r, !1, 52, 8);
          }
          var y = t("ieee754"),
            g = t("int64-buffer"),
            v = g.Uint64BE,
            b = g.Int64BE,
            w = t("./write-uint8").uint8,
            E = t("./bufferish"),
            Buffer = E.global,
            A = E.hasBuffer && "TYPED_ARRAY_SUPPORT" in Buffer,
            m = A && !Buffer.TYPED_ARRAY_SUPPORT,
            B = (E.hasBuffer && Buffer.prototype) || {};
          e.getWriteToken = n;
        },
        {
          "./bufferish": 8,
          "./write-uint8": 28,
          ieee754: 32,
          "int64-buffer": 33,
        },
      ],
      27: [
        function (t, r, e) {
          function n(t) {
            function r(t, r) {
              S[r ? 195 : 194](t, r);
            }
            function e(t, r) {
              var e,
                n = 0 | r;
              if (r !== n) return (e = 203), void S[e](t, r);
              (e =
                -32 <= n && n <= 127
                  ? 255 & n
                  : 0 <= n
                  ? n <= 255
                    ? 204
                    : n <= 65535
                    ? 205
                    : 206
                  : -128 <= n
                  ? 208
                  : -32768 <= n
                  ? 209
                  : 210),
                S[e](t, n);
            }
            function n(t, r) {
              var e;
              r >= BigInt(0)
                ? ((e = 207), S[e](t, o(r)))
                : ((e = 211), S[e](t, v(r)));
            }
            function o(t) {
              for (var r = new Array(8), e = 7; e >= 0; e--)
                (r[e] = Number(t & BigInt(255))), (t >>= BigInt(8));
              return r;
            }
            function v(t) {
              t < BigInt(0) && (t = (BigInt(1) << BigInt(64)) + t);
              for (var r = new Array(8), e = 7; e >= 0; e--)
                (r[e] = Number(t & BigInt(255))), (t >>= BigInt(8));
              return r;
            }
            function b(t, r) {
              S[207](t, r.toArray());
            }
            function w(t, r) {
              S[211](t, r.toArray());
            }
            function E(t) {
              return t < 32 ? 1 : t <= 255 ? 2 : t <= 65535 ? 3 : 5;
            }
            function A(t) {
              return t < 32 ? 1 : t <= 65535 ? 3 : 5;
            }
            function m(t, r) {
              if (null === r) return x(t, r);
              if (O(r)) return D(t, r);
              if (i(r)) return U(t, r);
              if (f.isUint64BE(r)) return b(t, r);
              if (u.isInt64BE(r)) return w(t, r);
              var e = t.codec.getExtPacker(r);
              if ((e && (r = e(r)), r instanceof l)) return k(t, r);
              M(t, r);
            }
            function B(t, r) {
              if (O(r)) return T(t, r);
              m(t, r);
            }
            function x(t, r) {
              S[192](t, r);
            }
            function U(t, r) {
              var e = r.length;
              S[e < 16 ? 144 + e : e <= 65535 ? 220 : 221](t, e);
              for (var n = t.codec.encode, i = 0; i < e; i++) n(t, r[i]);
            }
            function P(t, r) {
              var e = r.length;
              S[e < 255 ? 196 : e <= 65535 ? 197 : 198](t, e), t.send(r);
            }
            function R(t, r) {
              P(t, new Uint8Array(r));
            }
            function k(t, r) {
              var e = r.buffer,
                n = e.length,
                i = g[n] || (n < 255 ? 199 : n <= 65535 ? 200 : 201);
              S[i](t, n), h[r.type](t), t.send(e);
            }
            function I(t, r) {
              var e = Object.keys(r),
                n = e.length;
              S[n < 16 ? 128 + n : n <= 65535 ? 222 : 223](t, n);
              var i = t.codec.encode;
              e.forEach(function (e) {
                i(t, e), i(t, r[e]);
              });
            }
            function _(t, r) {
              if (!(r instanceof Map)) return I(t, r);
              var e = r.size;
              S[e < 16 ? 128 + e : e <= 65535 ? 222 : 223](t, e);
              var n = t.codec.encode;
              r.forEach(function (r, e, i) {
                n(t, e), n(t, r);
              });
            }
            function T(t, r) {
              var e = r.length;
              S[e < 32 ? 160 + e : e <= 65535 ? 218 : 219](t, e), t.send(r);
            }
            var S = c.getWriteToken(t),
              Y = t && t.useraw,
              C = p && t && t.binarraybuffer,
              O = C ? a.isArrayBuffer : a.isBuffer,
              D = C ? R : P,
              L = d && t && t.usemap,
              M = L ? _ : I,
              N = {
                boolean: r,
                function: x,
                number: e,
                object: Y ? B : m,
                string: (function (t) {
                  function r(r, e) {
                    var n = e.length,
                      i = 5 + 3 * n;
                    r.offset = r.reserve(i);
                    var o = r.buffer,
                      f = t(n),
                      u = r.offset + f;
                    n = s.write.call(o, e, u);
                    var a = t(n);
                    if (f !== a) {
                      var c = u + a - f,
                        h = u + n;
                      s.copy.call(o, o, c, u, h);
                    }
                    S[1 === a ? 160 + n : a <= 3 ? 215 + a : 219](r, n),
                      (r.offset += n);
                  }
                  return r;
                })(Y ? A : E),
                symbol: x,
                undefined: x,
              };
            return y && (N.bigint = n), N;
          }
          var i = t("isarray"),
            o = t("int64-buffer"),
            f = o.Uint64BE,
            u = o.Int64BE,
            a = t("./bufferish"),
            s = t("./bufferish-proto"),
            c = t("./write-token"),
            h = t("./write-uint8").uint8,
            l = t("./ext-buffer").ExtBuffer,
            p = "undefined" != typeof Uint8Array,
            d = "undefined" != typeof Map,
            y = "undefined" != typeof BigInt,
            g = [];
          (g[1] = 212),
            (g[2] = 213),
            (g[4] = 214),
            (g[8] = 215),
            (g[16] = 216),
            (e.getWriteType = n);
        },
        {
          "./bufferish": 8,
          "./bufferish-proto": 6,
          "./ext-buffer": 17,
          "./write-token": 26,
          "./write-uint8": 28,
          "int64-buffer": 33,
          isarray: 34,
        },
      ],
      28: [
        function (t, r, e) {
          for (var n = (e.uint8 = new Array(256)), i = 0; i <= 255; i++)
            n[i] = (function (t) {
              return function (r) {
                var e = r.reserve(1);
                r.buffer[e] = t;
              };
            })(i);
        },
        {},
      ],
      29: [
        function (t, r, e) {
          "use strict";
          function n(t) {
            var r = t.length;
            if (r % 4 > 0)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var e = t.indexOf("=");
            return -1 === e && (e = r), [e, e === r ? 0 : 4 - (e % 4)];
          }
          function i(t) {
            var r = n(t),
              e = r[0],
              i = r[1];
            return (3 * (e + i)) / 4 - i;
          }
          function o(t, r, e) {
            return (3 * (r + e)) / 4 - e;
          }
          function f(t) {
            var r,
              e,
              i = n(t),
              f = i[0],
              u = i[1],
              a = new l(o(t, f, u)),
              s = 0,
              c = u > 0 ? f - 4 : f;
            for (e = 0; e < c; e += 4)
              (r =
                (h[t.charCodeAt(e)] << 18) |
                (h[t.charCodeAt(e + 1)] << 12) |
                (h[t.charCodeAt(e + 2)] << 6) |
                h[t.charCodeAt(e + 3)]),
                (a[s++] = (r >> 16) & 255),
                (a[s++] = (r >> 8) & 255),
                (a[s++] = 255 & r);
            return (
              2 === u &&
                ((r =
                  (h[t.charCodeAt(e)] << 2) | (h[t.charCodeAt(e + 1)] >> 4)),
                (a[s++] = 255 & r)),
              1 === u &&
                ((r =
                  (h[t.charCodeAt(e)] << 10) |
                  (h[t.charCodeAt(e + 1)] << 4) |
                  (h[t.charCodeAt(e + 2)] >> 2)),
                (a[s++] = (r >> 8) & 255),
                (a[s++] = 255 & r)),
              a
            );
          }
          function u(t) {
            return (
              c[(t >> 18) & 63] +
              c[(t >> 12) & 63] +
              c[(t >> 6) & 63] +
              c[63 & t]
            );
          }
          function a(t, r, e) {
            for (var n, i = [], o = r; o < e; o += 3)
              (n =
                ((t[o] << 16) & 16711680) +
                ((t[o + 1] << 8) & 65280) +
                (255 & t[o + 2])),
                i.push(u(n));
            return i.join("");
          }
          function s(t) {
            for (
              var r, e = t.length, n = e % 3, i = [], o = 0, f = e - n;
              o < f;
              o += 16383
            )
              i.push(a(t, o, o + 16383 > f ? f : o + 16383));
            return (
              1 === n
                ? ((r = t[e - 1]), i.push(c[r >> 2] + c[(r << 4) & 63] + "=="))
                : 2 === n &&
                  ((r = (t[e - 2] << 8) + t[e - 1]),
                  i.push(
                    c[r >> 10] + c[(r >> 4) & 63] + c[(r << 2) & 63] + "="
                  )),
              i.join("")
            );
          }
          (e.byteLength = i), (e.toByteArray = f), (e.fromByteArray = s);
          for (
            var c = [],
              h = [],
              l = "undefined" != typeof Uint8Array ? Uint8Array : Array,
              p =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              d = 0,
              y = p.length;
            d < y;
            ++d
          )
            (c[d] = p[d]), (h[p.charCodeAt(d)] = d);
          (h["-".charCodeAt(0)] = 62), (h["_".charCodeAt(0)] = 63);
        },
        {},
      ],
      30: [
        function (t, r, e) {
          (function (r, Buffer) {
            (function () {
              "use strict";
              function n() {
                return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
              }
              function i(t, r) {
                if (n() < r) throw new RangeError("Invalid typed array length");
                return (
                  Buffer.TYPED_ARRAY_SUPPORT
                    ? ((t = new Uint8Array(r)),
                      (t.__proto__ = Buffer.prototype))
                    : (null === t && (t = new Buffer(r)), (t.length = r)),
                  t
                );
              }
              function Buffer(t, r, e) {
                if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer))
                  return new Buffer(t, r, e);
                if ("number" == typeof t) {
                  if ("string" == typeof r)
                    throw new Error(
                      "If encoding is specified then the first argument must be a string"
                    );
                  return a(this, t);
                }
                return o(this, t, r, e);
              }
              function o(t, r, e, n) {
                if ("number" == typeof r)
                  throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer &&
                  r instanceof ArrayBuffer
                  ? h(t, r, e, n)
                  : "string" == typeof r
                  ? s(t, r, e)
                  : l(t, r);
              }
              function f(t) {
                if ("number" != typeof t)
                  throw new TypeError('"size" argument must be a number');
                if (t < 0)
                  throw new RangeError('"size" argument must not be negative');
              }
              function u(t, r, e, n) {
                return (
                  f(r),
                  r <= 0
                    ? i(t, r)
                    : void 0 !== e
                    ? "string" == typeof n
                      ? i(t, r).fill(e, n)
                      : i(t, r).fill(e)
                    : i(t, r)
                );
              }
              function a(t, r) {
                if (
                  (f(r),
                  (t = i(t, r < 0 ? 0 : 0 | p(r))),
                  !Buffer.TYPED_ARRAY_SUPPORT)
                )
                  for (var e = 0; e < r; ++e) t[e] = 0;
                return t;
              }
              function s(t, r, e) {
                if (
                  (("string" == typeof e && "" !== e) || (e = "utf8"),
                  !Buffer.isEncoding(e))
                )
                  throw new TypeError(
                    '"encoding" must be a valid string encoding'
                  );
                var n = 0 | y(r, e);
                t = i(t, n);
                var o = t.write(r, e);
                return o !== n && (t = t.slice(0, o)), t;
              }
              function c(t, r) {
                var e = r.length < 0 ? 0 : 0 | p(r.length);
                t = i(t, e);
                for (var n = 0; n < e; n += 1) t[n] = 255 & r[n];
                return t;
              }
              function h(t, r, e, n) {
                if ((r.byteLength, e < 0 || r.byteLength < e))
                  throw new RangeError("'offset' is out of bounds");
                if (r.byteLength < e + (n || 0))
                  throw new RangeError("'length' is out of bounds");
                return (
                  (r =
                    void 0 === e && void 0 === n
                      ? new Uint8Array(r)
                      : void 0 === n
                      ? new Uint8Array(r, e)
                      : new Uint8Array(r, e, n)),
                  Buffer.TYPED_ARRAY_SUPPORT
                    ? ((t = r), (t.__proto__ = Buffer.prototype))
                    : (t = c(t, r)),
                  t
                );
              }
              function l(t, r) {
                if (Buffer.isBuffer(r)) {
                  var e = 0 | p(r.length);
                  return (
                    (t = i(t, e)), 0 === t.length ? t : (r.copy(t, 0, 0, e), t)
                  );
                }
                if (r) {
                  if (
                    ("undefined" != typeof ArrayBuffer &&
                      r.buffer instanceof ArrayBuffer) ||
                    "length" in r
                  )
                    return "number" != typeof r.length || G(r.length)
                      ? i(t, 0)
                      : c(t, r);
                  if ("Buffer" === r.type && K(r.data)) return c(t, r.data);
                }
                throw new TypeError(
                  "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
                );
              }
              function p(t) {
                if (t >= n())
                  throw new RangeError(
                    "Attempt to allocate Buffer larger than maximum size: 0x" +
                      n().toString(16) +
                      " bytes"
                  );
                return 0 | t;
              }
              function d(t) {
                return +t != t && (t = 0), Buffer.alloc(+t);
              }
              function y(t, r) {
                if (Buffer.isBuffer(t)) return t.length;
                if (
                  "undefined" != typeof ArrayBuffer &&
                  "function" == typeof ArrayBuffer.isView &&
                  (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
                )
                  return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var e = t.length;
                if (0 === e) return 0;
                for (var n = !1; ; )
                  switch (r) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                      return e;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                      return V(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return 2 * e;
                    case "hex":
                      return e >>> 1;
                    case "base64":
                      return J(t).length;
                    default:
                      if (n) return V(t).length;
                      (r = ("" + r).toLowerCase()), (n = !0);
                  }
              }
              function g(t, r, e) {
                var n = !1;
                if (((void 0 === r || r < 0) && (r = 0), r > this.length))
                  return "";
                if (
                  ((void 0 === e || e > this.length) && (e = this.length),
                  e <= 0)
                )
                  return "";
                if (((e >>>= 0), (r >>>= 0), e <= r)) return "";
                for (t || (t = "utf8"); ; )
                  switch (t) {
                    case "hex":
                      return T(this, r, e);
                    case "utf8":
                    case "utf-8":
                      return R(this, r, e);
                    case "ascii":
                      return I(this, r, e);
                    case "latin1":
                    case "binary":
                      return _(this, r, e);
                    case "base64":
                      return P(this, r, e);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return S(this, r, e);
                    default:
                      if (n) throw new TypeError("Unknown encoding: " + t);
                      (t = (t + "").toLowerCase()), (n = !0);
                  }
              }
              function v(t, r, e) {
                var n = t[r];
                (t[r] = t[e]), (t[e] = n);
              }
              function b(t, r, e, n, i) {
                if (0 === t.length) return -1;
                if (
                  ("string" == typeof e
                    ? ((n = e), (e = 0))
                    : e > 2147483647
                    ? (e = 2147483647)
                    : e < -2147483648 && (e = -2147483648),
                  (e = +e),
                  isNaN(e) && (e = i ? 0 : t.length - 1),
                  e < 0 && (e = t.length + e),
                  e >= t.length)
                ) {
                  if (i) return -1;
                  e = t.length - 1;
                } else if (e < 0) {
                  if (!i) return -1;
                  e = 0;
                }
                if (
                  ("string" == typeof r && (r = Buffer.from(r, n)),
                  Buffer.isBuffer(r))
                )
                  return 0 === r.length ? -1 : w(t, r, e, n, i);
                if ("number" == typeof r)
                  return (
                    (r &= 255),
                    Buffer.TYPED_ARRAY_SUPPORT &&
                    "function" == typeof Uint8Array.prototype.indexOf
                      ? i
                        ? Uint8Array.prototype.indexOf.call(t, r, e)
                        : Uint8Array.prototype.lastIndexOf.call(t, r, e)
                      : w(t, [r], e, n, i)
                  );
                throw new TypeError("val must be string, number or Buffer");
              }
              function w(t, r, e, n, i) {
                function o(t, r) {
                  return 1 === f ? t[r] : t.readUInt16BE(r * f);
                }
                var f = 1,
                  u = t.length,
                  a = r.length;
                if (
                  void 0 !== n &&
                  ("ucs2" === (n = String(n).toLowerCase()) ||
                    "ucs-2" === n ||
                    "utf16le" === n ||
                    "utf-16le" === n)
                ) {
                  if (t.length < 2 || r.length < 2) return -1;
                  (f = 2), (u /= 2), (a /= 2), (e /= 2);
                }
                var s;
                if (i) {
                  var c = -1;
                  for (s = e; s < u; s++)
                    if (o(t, s) === o(r, -1 === c ? 0 : s - c)) {
                      if ((-1 === c && (c = s), s - c + 1 === a)) return c * f;
                    } else -1 !== c && (s -= s - c), (c = -1);
                } else
                  for (e + a > u && (e = u - a), s = e; s >= 0; s--) {
                    for (var h = !0, l = 0; l < a; l++)
                      if (o(t, s + l) !== o(r, l)) {
                        h = !1;
                        break;
                      }
                    if (h) return s;
                  }
                return -1;
              }
              function E(t, r, e, n) {
                e = Number(e) || 0;
                var i = t.length - e;
                n ? (n = Number(n)) > i && (n = i) : (n = i);
                var o = r.length;
                if (o % 2 != 0) throw new TypeError("Invalid hex string");
                n > o / 2 && (n = o / 2);
                for (var f = 0; f < n; ++f) {
                  var u = parseInt(r.substr(2 * f, 2), 16);
                  if (isNaN(u)) return f;
                  t[e + f] = u;
                }
                return f;
              }
              function A(t, r, e, n) {
                return X(V(r, t.length - e), t, e, n);
              }
              function m(t, r, e, n) {
                return X(q(r), t, e, n);
              }
              function B(t, r, e, n) {
                return m(t, r, e, n);
              }
              function x(t, r, e, n) {
                return X(J(r), t, e, n);
              }
              function U(t, r, e, n) {
                return X(W(r, t.length - e), t, e, n);
              }
              function P(t, r, e) {
                return 0 === r && e === t.length
                  ? H.fromByteArray(t)
                  : H.fromByteArray(t.slice(r, e));
              }
              function R(t, r, e) {
                e = Math.min(t.length, e);
                for (var n = [], i = r; i < e; ) {
                  var o = t[i],
                    f = null,
                    u = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                  if (i + u <= e) {
                    var a, s, c, h;
                    switch (u) {
                      case 1:
                        o < 128 && (f = o);
                        break;
                      case 2:
                        (a = t[i + 1]),
                          128 == (192 & a) &&
                            (h = ((31 & o) << 6) | (63 & a)) > 127 &&
                            (f = h);
                        break;
                      case 3:
                        (a = t[i + 1]),
                          (s = t[i + 2]),
                          128 == (192 & a) &&
                            128 == (192 & s) &&
                            (h =
                              ((15 & o) << 12) | ((63 & a) << 6) | (63 & s)) >
                              2047 &&
                            (h < 55296 || h > 57343) &&
                            (f = h);
                        break;
                      case 4:
                        (a = t[i + 1]),
                          (s = t[i + 2]),
                          (c = t[i + 3]),
                          128 == (192 & a) &&
                            128 == (192 & s) &&
                            128 == (192 & c) &&
                            (h =
                              ((15 & o) << 18) |
                              ((63 & a) << 12) |
                              ((63 & s) << 6) |
                              (63 & c)) > 65535 &&
                            h < 1114112 &&
                            (f = h);
                    }
                  }
                  null === f
                    ? ((f = 65533), (u = 1))
                    : f > 65535 &&
                      ((f -= 65536),
                      n.push(((f >>> 10) & 1023) | 55296),
                      (f = 56320 | (1023 & f))),
                    n.push(f),
                    (i += u);
                }
                return k(n);
              }
              function k(t) {
                var r = t.length;
                if (r <= Q) return String.fromCharCode.apply(String, t);
                for (var e = "", n = 0; n < r; )
                  e += String.fromCharCode.apply(String, t.slice(n, (n += Q)));
                return e;
              }
              function I(t, r, e) {
                var n = "";
                e = Math.min(t.length, e);
                for (var i = r; i < e; ++i)
                  n += String.fromCharCode(127 & t[i]);
                return n;
              }
              function _(t, r, e) {
                var n = "";
                e = Math.min(t.length, e);
                for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
                return n;
              }
              function T(t, r, e) {
                var n = t.length;
                (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
                for (var i = "", o = r; o < e; ++o) i += z(t[o]);
                return i;
              }
              function S(t, r, e) {
                for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2)
                  i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                return i;
              }
              function Y(t, r, e) {
                if (t % 1 != 0 || t < 0)
                  throw new RangeError("offset is not uint");
                if (t + r > e)
                  throw new RangeError("Trying to access beyond buffer length");
              }
              function C(t, r, e, n, i, o) {
                if (!Buffer.isBuffer(t))
                  throw new TypeError(
                    '"buffer" argument must be a Buffer instance'
                  );
                if (r > i || r < o)
                  throw new RangeError('"value" argument is out of bounds');
                if (e + n > t.length)
                  throw new RangeError("Index out of range");
              }
              function O(t, r, e, n) {
                r < 0 && (r = 65535 + r + 1);
                for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i)
                  t[e + i] =
                    (r & (255 << (8 * (n ? i : 1 - i)))) >>>
                    (8 * (n ? i : 1 - i));
              }
              function D(t, r, e, n) {
                r < 0 && (r = 4294967295 + r + 1);
                for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i)
                  t[e + i] = (r >>> (8 * (n ? i : 3 - i))) & 255;
              }
              function L(t, r, e, n, i, o) {
                if (e + n > t.length)
                  throw new RangeError("Index out of range");
                if (e < 0) throw new RangeError("Index out of range");
              }
              function M(t, r, e, n, i) {
                return (
                  i ||
                    L(
                      t,
                      r,
                      e,
                      4,
                      3.4028234663852886e38,
                      -3.4028234663852886e38
                    ),
                  Z.write(t, r, e, n, 23, 4),
                  e + 4
                );
              }
              function N(t, r, e, n, i) {
                return (
                  i ||
                    L(
                      t,
                      r,
                      e,
                      8,
                      1.7976931348623157e308,
                      -1.7976931348623157e308
                    ),
                  Z.write(t, r, e, n, 52, 8),
                  e + 8
                );
              }
              function F(t) {
                if (((t = j(t).replace($, "")), t.length < 2)) return "";
                for (; t.length % 4 != 0; ) t += "=";
                return t;
              }
              function j(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
              }
              function z(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16);
              }
              function V(t, r) {
                r = r || 1 / 0;
                for (var e, n = t.length, i = null, o = [], f = 0; f < n; ++f) {
                  if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
                    if (!i) {
                      if (e > 56319) {
                        (r -= 3) > -1 && o.push(239, 191, 189);
                        continue;
                      }
                      if (f + 1 === n) {
                        (r -= 3) > -1 && o.push(239, 191, 189);
                        continue;
                      }
                      i = e;
                      continue;
                    }
                    if (e < 56320) {
                      (r -= 3) > -1 && o.push(239, 191, 189), (i = e);
                      continue;
                    }
                    e = 65536 + (((i - 55296) << 10) | (e - 56320));
                  } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                  if (((i = null), e < 128)) {
                    if ((r -= 1) < 0) break;
                    o.push(e);
                  } else if (e < 2048) {
                    if ((r -= 2) < 0) break;
                    o.push((e >> 6) | 192, (63 & e) | 128);
                  } else if (e < 65536) {
                    if ((r -= 3) < 0) break;
                    o.push(
                      (e >> 12) | 224,
                      ((e >> 6) & 63) | 128,
                      (63 & e) | 128
                    );
                  } else {
                    if (!(e < 1114112)) throw new Error("Invalid code point");
                    if ((r -= 4) < 0) break;
                    o.push(
                      (e >> 18) | 240,
                      ((e >> 12) & 63) | 128,
                      ((e >> 6) & 63) | 128,
                      (63 & e) | 128
                    );
                  }
                }
                return o;
              }
              function q(t) {
                for (var r = [], e = 0; e < t.length; ++e)
                  r.push(255 & t.charCodeAt(e));
                return r;
              }
              function W(t, r) {
                for (
                  var e, n, i, o = [], f = 0;
                  f < t.length && !((r -= 2) < 0);
                  ++f
                )
                  (e = t.charCodeAt(f)),
                    (n = e >> 8),
                    (i = e % 256),
                    o.push(i),
                    o.push(n);
                return o;
              }
              function J(t) {
                return H.toByteArray(F(t));
              }
              function X(t, r, e, n) {
                for (
                  var i = 0;
                  i < n && !(i + e >= r.length || i >= t.length);
                  ++i
                )
                  r[i + e] = t[i];
                return i;
              }
              function G(t) {
                return t !== t;
              }
              var H = t("base64-js"),
                Z = t("ieee754"),
                K = t("isarray");
              (e.Buffer = Buffer),
                (e.SlowBuffer = d),
                (e.INSPECT_MAX_BYTES = 50),
                (Buffer.TYPED_ARRAY_SUPPORT =
                  void 0 !== r.TYPED_ARRAY_SUPPORT
                    ? r.TYPED_ARRAY_SUPPORT
                    : (function () {
                        try {
                          var t = new Uint8Array(1);
                          return (
                            (t.__proto__ = {
                              __proto__: Uint8Array.prototype,
                              foo: function () {
                                return 42;
                              },
                            }),
                            42 === t.foo() &&
                              "function" == typeof t.subarray &&
                              0 === t.subarray(1, 1).byteLength
                          );
                        } catch (t) {
                          return !1;
                        }
                      })()),
                (e.kMaxLength = n()),
                (Buffer.poolSize = 8192),
                (Buffer._augment = function (t) {
                  return (t.__proto__ = Buffer.prototype), t;
                }),
                (Buffer.from = function (t, r, e) {
                  return o(null, t, r, e);
                }),
                Buffer.TYPED_ARRAY_SUPPORT &&
                  ((Buffer.prototype.__proto__ = Uint8Array.prototype),
                  (Buffer.__proto__ = Uint8Array),
                  "undefined" != typeof Symbol &&
                    Symbol.species &&
                    Buffer[Symbol.species] === Buffer &&
                    Object.defineProperty(Buffer, Symbol.species, {
                      value: null,
                      configurable: !0,
                    })),
                (Buffer.alloc = function (t, r, e) {
                  return u(null, t, r, e);
                }),
                (Buffer.allocUnsafe = function (t) {
                  return a(null, t);
                }),
                (Buffer.allocUnsafeSlow = function (t) {
                  return a(null, t);
                }),
                (Buffer.isBuffer = function (t) {
                  return !(null == t || !t._isBuffer);
                }),
                (Buffer.compare = function (t, r) {
                  if (!Buffer.isBuffer(t) || !Buffer.isBuffer(r))
                    throw new TypeError("Arguments must be Buffers");
                  if (t === r) return 0;
                  for (
                    var e = t.length, n = r.length, i = 0, o = Math.min(e, n);
                    i < o;
                    ++i
                  )
                    if (t[i] !== r[i]) {
                      (e = t[i]), (n = r[i]);
                      break;
                    }
                  return e < n ? -1 : n < e ? 1 : 0;
                }),
                (Buffer.isEncoding = function (t) {
                  switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return !0;
                    default:
                      return !1;
                  }
                }),
                (Buffer.concat = function (t, r) {
                  if (!K(t))
                    throw new TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  if (0 === t.length) return Buffer.alloc(0);
                  var e;
                  if (void 0 === r)
                    for (r = 0, e = 0; e < t.length; ++e) r += t[e].length;
                  var n = Buffer.allocUnsafe(r),
                    i = 0;
                  for (e = 0; e < t.length; ++e) {
                    var o = t[e];
                    if (!Buffer.isBuffer(o))
                      throw new TypeError(
                        '"list" argument must be an Array of Buffers'
                      );
                    o.copy(n, i), (i += o.length);
                  }
                  return n;
                }),
                (Buffer.byteLength = y),
                (Buffer.prototype._isBuffer = !0),
                (Buffer.prototype.swap16 = function () {
                  var t = this.length;
                  if (t % 2 != 0)
                    throw new RangeError(
                      "Buffer size must be a multiple of 16-bits"
                    );
                  for (var r = 0; r < t; r += 2) v(this, r, r + 1);
                  return this;
                }),
                (Buffer.prototype.swap32 = function () {
                  var t = this.length;
                  if (t % 4 != 0)
                    throw new RangeError(
                      "Buffer size must be a multiple of 32-bits"
                    );
                  for (var r = 0; r < t; r += 4)
                    v(this, r, r + 3), v(this, r + 1, r + 2);
                  return this;
                }),
                (Buffer.prototype.swap64 = function () {
                  var t = this.length;
                  if (t % 8 != 0)
                    throw new RangeError(
                      "Buffer size must be a multiple of 64-bits"
                    );
                  for (var r = 0; r < t; r += 8)
                    v(this, r, r + 7),
                      v(this, r + 1, r + 6),
                      v(this, r + 2, r + 5),
                      v(this, r + 3, r + 4);
                  return this;
                }),
                (Buffer.prototype.toString = function () {
                  var t = 0 | this.length;
                  return 0 === t
                    ? ""
                    : 0 === arguments.length
                    ? R(this, 0, t)
                    : g.apply(this, arguments);
                }),
                (Buffer.prototype.equals = function (t) {
                  if (!Buffer.isBuffer(t))
                    throw new TypeError("Argument must be a Buffer");
                  return this === t || 0 === Buffer.compare(this, t);
                }),
                (Buffer.prototype.inspect = function () {
                  var t = "",
                    r = e.INSPECT_MAX_BYTES;
                  return (
                    this.length > 0 &&
                      ((t = this.toString("hex", 0, r)
                        .match(/.{2}/g)
                        .join(" ")),
                      this.length > r && (t += " ... ")),
                    "<Buffer " + t + ">"
                  );
                }),
                (Buffer.prototype.compare = function (t, r, e, n, i) {
                  if (!Buffer.isBuffer(t))
                    throw new TypeError("Argument must be a Buffer");
                  if (
                    (void 0 === r && (r = 0),
                    void 0 === e && (e = t ? t.length : 0),
                    void 0 === n && (n = 0),
                    void 0 === i && (i = this.length),
                    r < 0 || e > t.length || n < 0 || i > this.length)
                  )
                    throw new RangeError("out of range index");
                  if (n >= i && r >= e) return 0;
                  if (n >= i) return -1;
                  if (r >= e) return 1;
                  if (
                    ((r >>>= 0), (e >>>= 0), (n >>>= 0), (i >>>= 0), this === t)
                  )
                    return 0;
                  for (
                    var o = i - n,
                      f = e - r,
                      u = Math.min(o, f),
                      a = this.slice(n, i),
                      s = t.slice(r, e),
                      c = 0;
                    c < u;
                    ++c
                  )
                    if (a[c] !== s[c]) {
                      (o = a[c]), (f = s[c]);
                      break;
                    }
                  return o < f ? -1 : f < o ? 1 : 0;
                }),
                (Buffer.prototype.includes = function (t, r, e) {
                  return -1 !== this.indexOf(t, r, e);
                }),
                (Buffer.prototype.indexOf = function (t, r, e) {
                  return b(this, t, r, e, !0);
                }),
                (Buffer.prototype.lastIndexOf = function (t, r, e) {
                  return b(this, t, r, e, !1);
                }),
                (Buffer.prototype.write = function (t, r, e, n) {
                  if (void 0 === r) (n = "utf8"), (e = this.length), (r = 0);
                  else if (void 0 === e && "string" == typeof r)
                    (n = r), (e = this.length), (r = 0);
                  else {
                    if (!isFinite(r))
                      throw new Error(
                        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                      );
                    (r |= 0),
                      isFinite(e)
                        ? ((e |= 0), void 0 === n && (n = "utf8"))
                        : ((n = e), (e = void 0));
                  }
                  var i = this.length - r;
                  if (
                    ((void 0 === e || e > i) && (e = i),
                    (t.length > 0 && (e < 0 || r < 0)) || r > this.length)
                  )
                    throw new RangeError(
                      "Attempt to write outside buffer bounds"
                    );
                  n || (n = "utf8");
                  for (var o = !1; ; )
                    switch (n) {
                      case "hex":
                        return E(this, t, r, e);
                      case "utf8":
                      case "utf-8":
                        return A(this, t, r, e);
                      case "ascii":
                        return m(this, t, r, e);
                      case "latin1":
                      case "binary":
                        return B(this, t, r, e);
                      case "base64":
                        return x(this, t, r, e);
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return U(this, t, r, e);
                      default:
                        if (o) throw new TypeError("Unknown encoding: " + n);
                        (n = ("" + n).toLowerCase()), (o = !0);
                    }
                }),
                (Buffer.prototype.toJSON = function () {
                  return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0),
                  };
                });
              var Q = 4096;
              (Buffer.prototype.slice = function (t, r) {
                var e = this.length;
                (t = ~~t),
                  (r = void 0 === r ? e : ~~r),
                  t < 0 ? (t += e) < 0 && (t = 0) : t > e && (t = e),
                  r < 0 ? (r += e) < 0 && (r = 0) : r > e && (r = e),
                  r < t && (r = t);
                var n;
                if (Buffer.TYPED_ARRAY_SUPPORT)
                  (n = this.subarray(t, r)), (n.__proto__ = Buffer.prototype);
                else {
                  var i = r - t;
                  n = new Buffer(i, void 0);
                  for (var o = 0; o < i; ++o) n[o] = this[o + t];
                }
                return n;
              }),
                (Buffer.prototype.readUIntLE = function (t, r, e) {
                  (t |= 0), (r |= 0), e || Y(t, r, this.length);
                  for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
                    n += this[t + o] * i;
                  return n;
                }),
                (Buffer.prototype.readUIntBE = function (t, r, e) {
                  (t |= 0), (r |= 0), e || Y(t, r, this.length);
                  for (var n = this[t + --r], i = 1; r > 0 && (i *= 256); )
                    n += this[t + --r] * i;
                  return n;
                }),
                (Buffer.prototype.readUInt8 = function (t, r) {
                  return r || Y(t, 1, this.length), this[t];
                }),
                (Buffer.prototype.readUInt16LE = function (t, r) {
                  return (
                    r || Y(t, 2, this.length), this[t] | (this[t + 1] << 8)
                  );
                }),
                (Buffer.prototype.readUInt16BE = function (t, r) {
                  return (
                    r || Y(t, 2, this.length), (this[t] << 8) | this[t + 1]
                  );
                }),
                (Buffer.prototype.readUInt32LE = function (t, r) {
                  return (
                    r || Y(t, 4, this.length),
                    (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                      16777216 * this[t + 3]
                  );
                }),
                (Buffer.prototype.readUInt32BE = function (t, r) {
                  return (
                    r || Y(t, 4, this.length),
                    16777216 * this[t] +
                      ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
                  );
                }),
                (Buffer.prototype.readIntLE = function (t, r, e) {
                  (t |= 0), (r |= 0), e || Y(t, r, this.length);
                  for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
                    n += this[t + o] * i;
                  return (i *= 128), n >= i && (n -= Math.pow(2, 8 * r)), n;
                }),
                (Buffer.prototype.readIntBE = function (t, r, e) {
                  (t |= 0), (r |= 0), e || Y(t, r, this.length);
                  for (
                    var n = r, i = 1, o = this[t + --n];
                    n > 0 && (i *= 256);

                  )
                    o += this[t + --n] * i;
                  return (i *= 128), o >= i && (o -= Math.pow(2, 8 * r)), o;
                }),
                (Buffer.prototype.readInt8 = function (t, r) {
                  return (
                    r || Y(t, 1, this.length),
                    128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                  );
                }),
                (Buffer.prototype.readInt16LE = function (t, r) {
                  r || Y(t, 2, this.length);
                  var e = this[t] | (this[t + 1] << 8);
                  return 32768 & e ? 4294901760 | e : e;
                }),
                (Buffer.prototype.readInt16BE = function (t, r) {
                  r || Y(t, 2, this.length);
                  var e = this[t + 1] | (this[t] << 8);
                  return 32768 & e ? 4294901760 | e : e;
                }),
                (Buffer.prototype.readInt32LE = function (t, r) {
                  return (
                    r || Y(t, 4, this.length),
                    this[t] |
                      (this[t + 1] << 8) |
                      (this[t + 2] << 16) |
                      (this[t + 3] << 24)
                  );
                }),
                (Buffer.prototype.readInt32BE = function (t, r) {
                  return (
                    r || Y(t, 4, this.length),
                    (this[t] << 24) |
                      (this[t + 1] << 16) |
                      (this[t + 2] << 8) |
                      this[t + 3]
                  );
                }),
                (Buffer.prototype.readFloatLE = function (t, r) {
                  return r || Y(t, 4, this.length), Z.read(this, t, !0, 23, 4);
                }),
                (Buffer.prototype.readFloatBE = function (t, r) {
                  return r || Y(t, 4, this.length), Z.read(this, t, !1, 23, 4);
                }),
                (Buffer.prototype.readDoubleLE = function (t, r) {
                  return r || Y(t, 8, this.length), Z.read(this, t, !0, 52, 8);
                }),
                (Buffer.prototype.readDoubleBE = function (t, r) {
                  return r || Y(t, 8, this.length), Z.read(this, t, !1, 52, 8);
                }),
                (Buffer.prototype.writeUIntLE = function (t, r, e, n) {
                  if (((t = +t), (r |= 0), (e |= 0), !n)) {
                    C(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                  }
                  var i = 1,
                    o = 0;
                  for (this[r] = 255 & t; ++o < e && (i *= 256); )
                    this[r + o] = (t / i) & 255;
                  return r + e;
                }),
                (Buffer.prototype.writeUIntBE = function (t, r, e, n) {
                  if (((t = +t), (r |= 0), (e |= 0), !n)) {
                    C(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                  }
                  var i = e - 1,
                    o = 1;
                  for (this[r + i] = 255 & t; --i >= 0 && (o *= 256); )
                    this[r + i] = (t / o) & 255;
                  return r + e;
                }),
                (Buffer.prototype.writeUInt8 = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 1, 255, 0),
                    Buffer.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
                    (this[r] = 255 & t),
                    r + 1
                  );
                }),
                (Buffer.prototype.writeUInt16LE = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 2, 65535, 0),
                    Buffer.TYPED_ARRAY_SUPPORT
                      ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
                      : O(this, t, r, !0),
                    r + 2
                  );
                }),
                (Buffer.prototype.writeUInt16BE = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 2, 65535, 0),
                    Buffer.TYPED_ARRAY_SUPPORT
                      ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
                      : O(this, t, r, !1),
                    r + 2
                  );
                }),
                (Buffer.prototype.writeUInt32LE = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 4, 4294967295, 0),
                    Buffer.TYPED_ARRAY_SUPPORT
                      ? ((this[r + 3] = t >>> 24),
                        (this[r + 2] = t >>> 16),
                        (this[r + 1] = t >>> 8),
                        (this[r] = 255 & t))
                      : D(this, t, r, !0),
                    r + 4
                  );
                }),
                (Buffer.prototype.writeUInt32BE = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 4, 4294967295, 0),
                    Buffer.TYPED_ARRAY_SUPPORT
                      ? ((this[r] = t >>> 24),
                        (this[r + 1] = t >>> 16),
                        (this[r + 2] = t >>> 8),
                        (this[r + 3] = 255 & t))
                      : D(this, t, r, !1),
                    r + 4
                  );
                }),
                (Buffer.prototype.writeIntLE = function (t, r, e, n) {
                  if (((t = +t), (r |= 0), !n)) {
                    var i = Math.pow(2, 8 * e - 1);
                    C(this, t, r, e, i - 1, -i);
                  }
                  var o = 0,
                    f = 1,
                    u = 0;
                  for (this[r] = 255 & t; ++o < e && (f *= 256); )
                    t < 0 && 0 === u && 0 !== this[r + o - 1] && (u = 1),
                      (this[r + o] = (((t / f) >> 0) - u) & 255);
                  return r + e;
                }),
                (Buffer.prototype.writeIntBE = function (t, r, e, n) {
                  if (((t = +t), (r |= 0), !n)) {
                    var i = Math.pow(2, 8 * e - 1);
                    C(this, t, r, e, i - 1, -i);
                  }
                  var o = e - 1,
                    f = 1,
                    u = 0;
                  for (this[r + o] = 255 & t; --o >= 0 && (f *= 256); )
                    t < 0 && 0 === u && 0 !== this[r + o + 1] && (u = 1),
                      (this[r + o] = (((t / f) >> 0) - u) & 255);
                  return r + e;
                }),
                (Buffer.prototype.writeInt8 = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 1, 127, -128),
                    Buffer.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
                    t < 0 && (t = 255 + t + 1),
                    (this[r] = 255 & t),
                    r + 1
                  );
                }),
                (Buffer.prototype.writeInt16LE = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 2, 32767, -32768),
                    Buffer.TYPED_ARRAY_SUPPORT
                      ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
                      : O(this, t, r, !0),
                    r + 2
                  );
                }),
                (Buffer.prototype.writeInt16BE = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 2, 32767, -32768),
                    Buffer.TYPED_ARRAY_SUPPORT
                      ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
                      : O(this, t, r, !1),
                    r + 2
                  );
                }),
                (Buffer.prototype.writeInt32LE = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 4, 2147483647, -2147483648),
                    Buffer.TYPED_ARRAY_SUPPORT
                      ? ((this[r] = 255 & t),
                        (this[r + 1] = t >>> 8),
                        (this[r + 2] = t >>> 16),
                        (this[r + 3] = t >>> 24))
                      : D(this, t, r, !0),
                    r + 4
                  );
                }),
                (Buffer.prototype.writeInt32BE = function (t, r, e) {
                  return (
                    (t = +t),
                    (r |= 0),
                    e || C(this, t, r, 4, 2147483647, -2147483648),
                    t < 0 && (t = 4294967295 + t + 1),
                    Buffer.TYPED_ARRAY_SUPPORT
                      ? ((this[r] = t >>> 24),
                        (this[r + 1] = t >>> 16),
                        (this[r + 2] = t >>> 8),
                        (this[r + 3] = 255 & t))
                      : D(this, t, r, !1),
                    r + 4
                  );
                }),
                (Buffer.prototype.writeFloatLE = function (t, r, e) {
                  return M(this, t, r, !0, e);
                }),
                (Buffer.prototype.writeFloatBE = function (t, r, e) {
                  return M(this, t, r, !1, e);
                }),
                (Buffer.prototype.writeDoubleLE = function (t, r, e) {
                  return N(this, t, r, !0, e);
                }),
                (Buffer.prototype.writeDoubleBE = function (t, r, e) {
                  return N(this, t, r, !1, e);
                }),
                (Buffer.prototype.copy = function (t, r, e, n) {
                  if (
                    (e || (e = 0),
                    n || 0 === n || (n = this.length),
                    r >= t.length && (r = t.length),
                    r || (r = 0),
                    n > 0 && n < e && (n = e),
                    n === e)
                  )
                    return 0;
                  if (0 === t.length || 0 === this.length) return 0;
                  if (r < 0) throw new RangeError("targetStart out of bounds");
                  if (e < 0 || e >= this.length)
                    throw new RangeError("sourceStart out of bounds");
                  if (n < 0) throw new RangeError("sourceEnd out of bounds");
                  n > this.length && (n = this.length),
                    t.length - r < n - e && (n = t.length - r + e);
                  var i,
                    o = n - e;
                  if (this === t && e < r && r < n)
                    for (i = o - 1; i >= 0; --i) t[i + r] = this[i + e];
                  else if (o < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
                    for (i = 0; i < o; ++i) t[i + r] = this[i + e];
                  else
                    Uint8Array.prototype.set.call(
                      t,
                      this.subarray(e, e + o),
                      r
                    );
                  return o;
                }),
                (Buffer.prototype.fill = function (t, r, e, n) {
                  if ("string" == typeof t) {
                    if (
                      ("string" == typeof r
                        ? ((n = r), (r = 0), (e = this.length))
                        : "string" == typeof e && ((n = e), (e = this.length)),
                      1 === t.length)
                    ) {
                      var i = t.charCodeAt(0);
                      i < 256 && (t = i);
                    }
                    if (void 0 !== n && "string" != typeof n)
                      throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !Buffer.isEncoding(n))
                      throw new TypeError("Unknown encoding: " + n);
                  } else "number" == typeof t && (t &= 255);
                  if (r < 0 || this.length < r || this.length < e)
                    throw new RangeError("Out of range index");
                  if (e <= r) return this;
                  (r >>>= 0),
                    (e = void 0 === e ? this.length : e >>> 0),
                    t || (t = 0);
                  var o;
                  if ("number" == typeof t) for (o = r; o < e; ++o) this[o] = t;
                  else {
                    var f = Buffer.isBuffer(t)
                        ? t
                        : V(new Buffer(t, n).toString()),
                      u = f.length;
                    for (o = 0; o < e - r; ++o) this[o + r] = f[o % u];
                  }
                  return this;
                });
              var $ = /[^+\/0-9A-Za-z-_]/g;
            }).call(this);
          }).call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {},
            t("buffer").Buffer
          );
        },
        { "base64-js": 29, buffer: 30, ieee754: 32, isarray: 34 },
      ],
      31: [
        function (t, r, e) {
          function n() {
            if (!(this instanceof n)) return new n();
          }
          !(function (t) {
            function e(t) {
              for (var r in s) t[r] = s[r];
              return t;
            }
            function n(t, r) {
              return u(this, t).push(r), this;
            }
            function i(t, r) {
              function e() {
                o.call(n, t, e), r.apply(this, arguments);
              }
              var n = this;
              return (e.originalListener = r), u(n, t).push(e), n;
            }
            function o(t, r) {
              function e(t) {
                return t !== r && t.originalListener !== r;
              }
              var n,
                i = this;
              if (arguments.length) {
                if (r) {
                  if ((n = u(i, t, !0))) {
                    if (((n = n.filter(e)), !n.length)) return o.call(i, t);
                    i[a][t] = n;
                  }
                } else if ((n = i[a]) && (delete n[t], !Object.keys(n).length))
                  return o.call(i);
              } else delete i[a];
              return i;
            }
            function f(t, r) {
              function e(t) {
                t.call(o);
              }
              function n(t) {
                t.call(o, r);
              }
              function i(t) {
                t.apply(o, s);
              }
              var o = this,
                f = u(o, t, !0);
              if (!f) return !1;
              var a = arguments.length;
              if (1 === a) f.forEach(e);
              else if (2 === a) f.forEach(n);
              else {
                var s = Array.prototype.slice.call(arguments, 1);
                f.forEach(i);
              }
              return !!f.length;
            }
            function u(t, r, e) {
              if (!e || t[a]) {
                var n = t[a] || (t[a] = {});
                return n[r] || (n[r] = []);
              }
            }
            void 0 !== r && (r.exports = t);
            var a = "listeners",
              s = { on: n, once: i, off: o, emit: f };
            e(t.prototype), (t.mixin = e);
          })(n);
        },
        {},
      ],
      32: [
        function (t, r, e) {
          (e.read = function (t, r, e, n, i) {
            var o,
              f,
              u = 8 * i - n - 1,
              a = (1 << u) - 1,
              s = a >> 1,
              c = -7,
              h = e ? i - 1 : 0,
              l = e ? -1 : 1,
              p = t[r + h];
            for (
              h += l, o = p & ((1 << -c) - 1), p >>= -c, c += u;
              c > 0;
              o = 256 * o + t[r + h], h += l, c -= 8
            );
            for (
              f = o & ((1 << -c) - 1), o >>= -c, c += n;
              c > 0;
              f = 256 * f + t[r + h], h += l, c -= 8
            );
            if (0 === o) o = 1 - s;
            else {
              if (o === a) return f ? NaN : (1 / 0) * (p ? -1 : 1);
              (f += Math.pow(2, n)), (o -= s);
            }
            return (p ? -1 : 1) * f * Math.pow(2, o - n);
          }),
            (e.write = function (t, r, e, n, i, o) {
              var f,
                u,
                a,
                s = 8 * o - i - 1,
                c = (1 << s) - 1,
                h = c >> 1,
                l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                p = n ? 0 : o - 1,
                d = n ? 1 : -1,
                y = r < 0 || (0 === r && 1 / r < 0) ? 1 : 0;
              for (
                r = Math.abs(r),
                  isNaN(r) || r === 1 / 0
                    ? ((u = isNaN(r) ? 1 : 0), (f = c))
                    : ((f = Math.floor(Math.log(r) / Math.LN2)),
                      r * (a = Math.pow(2, -f)) < 1 && (f--, (a *= 2)),
                      (r += f + h >= 1 ? l / a : l * Math.pow(2, 1 - h)),
                      r * a >= 2 && (f++, (a /= 2)),
                      f + h >= c
                        ? ((u = 0), (f = c))
                        : f + h >= 1
                        ? ((u = (r * a - 1) * Math.pow(2, i)), (f += h))
                        : ((u = r * Math.pow(2, h - 1) * Math.pow(2, i)),
                          (f = 0)));
                i >= 8;
                t[e + p] = 255 & u, p += d, u /= 256, i -= 8
              );
              for (
                f = (f << i) | u, s += i;
                s > 0;
                t[e + p] = 255 & f, p += d, f /= 256, s -= 8
              );
              t[e + p - d] |= 128 * y;
            });
        },
        {},
      ],
      33: [
        function (t, r, e) {
          (function (Buffer) {
            (function () {
              var t, r, n, i;
              !(function (e) {
                function o(t, r, n) {
                  function i(t, r, e, n) {
                    return this instanceof i
                      ? g(this, t, r, e, n)
                      : new i(t, r, e, n);
                  }
                  function o(t) {
                    return !(!t || !t[F]);
                  }
                  function g(t, r, e, n, i) {
                    if (
                      (E &&
                        A &&
                        (r instanceof A && (r = new E(r)),
                        n instanceof A && (n = new E(n))),
                      !(r || e || n || v))
                    )
                      return void (t.buffer = h(m, 0));
                    if (!s(r, e)) {
                      var o = v || Array;
                      (i = e), (n = r), (e = 0), (r = new o(8));
                    }
                    (t.buffer = r),
                      (t.offset = e |= 0),
                      b !== typeof n &&
                        ("string" == typeof n
                          ? B(r, e, n, i || 10)
                          : s(n, i)
                          ? c(r, e, n, i)
                          : "number" == typeof i
                          ? (k(r, e + _, n), k(r, e + T, i))
                          : n > 0
                          ? D(r, e, n)
                          : n < 0
                          ? L(r, e, n)
                          : c(r, e, m, 0));
                  }
                  function B(t, r, e, n) {
                    var i = 0,
                      o = e.length,
                      f = 0,
                      u = 0;
                    "-" === e[0] && i++;
                    for (var a = i; i < o; ) {
                      var s = parseInt(e[i++], n);
                      if (!(s >= 0)) break;
                      (u = u * n + s),
                        (f = f * n + Math.floor(u / x)),
                        (u %= x);
                    }
                    a && ((f = ~f), u ? (u = x - u) : f++),
                      k(t, r + _, f),
                      k(t, r + T, u);
                  }
                  function P() {
                    var t = this.buffer,
                      r = this.offset,
                      e = I(t, r + _),
                      i = I(t, r + T);
                    return n || (e |= 0), e ? e * x + i : i;
                  }
                  function R(t) {
                    var r = this.buffer,
                      e = this.offset,
                      i = I(r, e + _),
                      o = I(r, e + T),
                      f = "",
                      u = !n && 2147483648 & i;
                    for (u && ((i = ~i), (o = x - o)), t = t || 10; ; ) {
                      var a = (i % t) * x + o;
                      if (
                        ((i = Math.floor(i / t)),
                        (o = Math.floor(a / t)),
                        (f = (a % t).toString(t) + f),
                        !i && !o)
                      )
                        break;
                    }
                    return u && (f = "-" + f), f;
                  }
                  function k(t, r, e) {
                    (t[r + O] = 255 & e),
                      (e >>= 8),
                      (t[r + C] = 255 & e),
                      (e >>= 8),
                      (t[r + Y] = 255 & e),
                      (e >>= 8),
                      (t[r + S] = 255 & e);
                  }
                  function I(t, r) {
                    return (
                      t[r + S] * U +
                      (t[r + Y] << 16) +
                      (t[r + C] << 8) +
                      t[r + O]
                    );
                  }
                  var _ = r ? 0 : 4,
                    T = r ? 4 : 0,
                    S = r ? 0 : 3,
                    Y = r ? 1 : 2,
                    C = r ? 2 : 1,
                    O = r ? 3 : 0,
                    D = r ? l : d,
                    L = r ? p : y,
                    M = i.prototype,
                    N = "is" + t,
                    F = "_" + N;
                  return (
                    (M.buffer = void 0),
                    (M.offset = 0),
                    (M[F] = !0),
                    (M.toNumber = P),
                    (M.toString = R),
                    (M.toJSON = P),
                    (M.toArray = f),
                    w && (M.toBuffer = u),
                    E && (M.toArrayBuffer = a),
                    (i[N] = o),
                    (e[t] = i),
                    i
                  );
                }
                function f(t) {
                  var r = this.buffer,
                    e = this.offset;
                  return (
                    (v = null),
                    !1 !== t && 0 === e && 8 === r.length && B(r) ? r : h(r, e)
                  );
                }
                function u(t) {
                  var r = this.buffer,
                    e = this.offset;
                  if (
                    ((v = w),
                    !1 !== t && 0 === e && 8 === r.length && Buffer.isBuffer(r))
                  )
                    return r;
                  var n = new w(8);
                  return c(n, 0, r, e), n;
                }
                function a(t) {
                  var r = this.buffer,
                    e = this.offset,
                    n = r.buffer;
                  if (
                    ((v = E),
                    !1 !== t && 0 === e && n instanceof A && 8 === n.byteLength)
                  )
                    return n;
                  var i = new E(8);
                  return c(i, 0, r, e), i.buffer;
                }
                function s(t, r) {
                  var e = t && t.length;
                  return (r |= 0), e && r + 8 <= e && "string" != typeof t[r];
                }
                function c(t, r, e, n) {
                  (r |= 0), (n |= 0);
                  for (var i = 0; i < 8; i++) t[r++] = 255 & e[n++];
                }
                function h(t, r) {
                  return Array.prototype.slice.call(t, r, r + 8);
                }
                function l(t, r, e) {
                  for (var n = r + 8; n > r; ) (t[--n] = 255 & e), (e /= 256);
                }
                function p(t, r, e) {
                  var n = r + 8;
                  for (e++; n > r; ) (t[--n] = (255 & -e) ^ 255), (e /= 256);
                }
                function d(t, r, e) {
                  for (var n = r + 8; r < n; ) (t[r++] = 255 & e), (e /= 256);
                }
                function y(t, r, e) {
                  var n = r + 8;
                  for (e++; r < n; ) (t[r++] = (255 & -e) ^ 255), (e /= 256);
                }
                function g(t) {
                  return (
                    !!t && "[object Array]" == Object.prototype.toString.call(t)
                  );
                }
                var v,
                  b = "undefined",
                  w = b !== typeof Buffer && Buffer,
                  E = b !== typeof Uint8Array && Uint8Array,
                  A = b !== typeof ArrayBuffer && ArrayBuffer,
                  m = [0, 0, 0, 0, 0, 0, 0, 0],
                  B = Array.isArray || g,
                  x = 4294967296,
                  U = 16777216;
                (t = o("Uint64BE", !0, !0)),
                  (r = o("Int64BE", !0, !1)),
                  (n = o("Uint64LE", !1, !0)),
                  (i = o("Int64LE", !1, !1));
              })(
                "object" == typeof e && "string" != typeof e.nodeName
                  ? e
                  : this || {}
              );
            }).call(this);
          }).call(this, t("buffer").Buffer);
        },
        { buffer: 30 },
      ],
      34: [
        function (t, r, e) {
          var n = {}.toString;
          r.exports =
            Array.isArray ||
            function (t) {
              return "[object Array]" == n.call(t);
            };
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});

// @ts-check

/**
 * @class WebSocketClient
 * @classdesc A WebSocket client with reconnect functionality.
 */
class WebSocketClient {
  /**
   * @param {string} url - The URL to connect to.
   * @param {Object} [options={}] - Optional configuration options.
   * @param {number} [options.maxReconnectAttempts=5] - The maximum number of reconnect attempts.
   * @param {number} [options.reconnectInterval=3000] - The interval between reconnect attempts in milliseconds.
   */
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.responseResolvers = new Map();
    /** @type {Map<string, Function[]>} */
    this.listeners = new Map();
  }
  /**
   * Connects to the WebSocket server.
   * @returns {Promise<WebSocket>} A promise that resolves with the WebSocket instance when connected.
   */
  async connect() {
    const httpUrl = this.url.replace('ws://', 'http://');
    const errorMessage = 'Server not reachable. Make sure to export or preview with Pipelab.'
    try {
      const response = await fetch(httpUrl);
      if (!response.ok) {
        throw new Error(`${errorMessage}, status: ${response.status}`);
      }
    } catch (error) {
      console.error('error', error)
      throw new Error(errorMessage);
    }

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        if (this.socket) {
          return resolve(this.socket);
        }
        return reject(new Error('WebSocket is undefined'));
      };

      this.socket.onmessage = (event) => {
        let buffer,
          parsedData,
          data = event.data;
        if (typeof data === "string") {
          parsedData = JSON.parse(data);
        } else {
          buffer = Array.isArray(data)
            ? Buffer.concat(data)
            : data instanceof ArrayBuffer
            ? Buffer.from(data)
            : data;
          parsedData = msgpack.decode(buffer);
        }
        // Assuming the server sends a 'correlationId' with every message
        if (parsedData.correlationId && this.responseResolvers.has(parsedData.correlationId)) {
          const resolver = this.responseResolvers.get(parsedData.correlationId);
          resolver?.(parsedData);
          this.responseResolvers.delete(parsedData.correlationId);
        } else if (parsedData.url) {
          // Propagate the message to listeners
          this.#propagateMessage(parsedData);
        } else {
          console.error('unhandled message', parsedData);
        }
        // Handle other incoming messages if needed
      };

      this.socket.onclose = () => {
        this.isConnected = false;
        this.reconnect();
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        return reject(error);
      };
    });
  }

  /**
   * Attempts to reconnect to the WebSocket server.
   */
  async reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.warn(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      try {
        await new Promise(resolve => setTimeout(resolve, this.reconnectInterval));
        await this.connect();
      } catch (error) {
        console.error('Reconnection attempt failed:', error);
      }
    } else {
      console.warn('Max reconnect attempts reached. Giving up.');
    }
  }

  /**
   * Sends a message to the WebSocket server.
   * @param {import("@pipelab/core").Message} message - The message to send.
   */
  send(message) {
    if (this.isConnected) {
      if (this.socket) {
        this.socket.send(msgpack.encode(message));
      } else {
        console.warn("Cannot send message. WebSocket is undefined.");
      }
    } else {
      console.warn('Cannot send message. WebSocket is not connected.');
    }
  }

  /**
   * Sends a message to the WebSocket server and waits for a response.
   * @template {import("@pipelab/core").Message} TMessage
   * @param {TMessage} message - The message to send.
   * @returns {Promise<any>} A promise that resolves with the response from the server.
   */
  /** @type {<T extends import("@pipelab/core").Message>(message: T) => Promise<import("@pipelab/core").InferResponseFromMessage<typeof message>>} */
  async sendAndWaitForResponse(message) {
    if (!this.isConnected || !this.socket) {
      throw new Error('WebSocket is not connected.');
    }
    const correlationId = this.#generateCorrelationId();
    message.correlationId = correlationId;
    const responsePromise = new Promise((resolve) => {
      this.responseResolvers.set(correlationId, resolve);
    });
    this.socket.send(msgpack.encode(message));
    const result = await responsePromise;
    if (result.body.error) {
      throw new Error(result.body.error)
    } else {
      return result
    }
  }

  /**
   * Closes the WebSocket connection.
   */
  close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  /**
   * Generates a unique correlation ID.
   * @returns {string} A unique correlation ID.
   */
  #generateCorrelationId() {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
     * Propagates a message to registered listeners.
     * @param {{ url: any; }} message - The message to propagate.
     */
  #propagateMessage(message) {
    const listeners = this.listeners.get(message.url);
    if (listeners) {
      listeners.forEach(listener => listener(message));
    }
  }

  /**
 * Registers a listener for a specific event.
 * @param {string} event - The event to listen for.
 * @param {Function} listener - The listener function.
 */
  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(listener);
  }

  /**
 * Unregisters a listener for a specific event.
 * @param {string} event - The event to stop listening for.
 * @param {Function} listener - The listener function to remove.
 */
  off(event, listener) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      this.listeners.set(event, listeners.filter(l => l !== listener));
    }
  }
}

const fullscreenC3StateToPipelabState = (/** @type {import("./sdk.js").IsFullScreenState} */ state) => {
  switch (state) {
    case 0:
      return 'normal';
    case 1:
      return 'fullscreen';
    default:
      return 'normal';
  }
};

const fullscreenPipelabStateToC3State = (/** @type {import('@pipelab/core').FullscreenStates} */ state) => {
  switch (state) {
    case 'normal':
      return 0;
    case 'fullscreen':
      return 1;
    default:
      return 0;
  }
}

const defaultSteamId = {
  accountId: -1,
  steamId32: '',
  steamId64: '',
}

// Simple path utility for POSIX-style path operations
const posixPath = {
  dirname: (path) => {
    const lastSlash = path.lastIndexOf('/');
    return lastSlash === -1 ? '.' : path.substring(0, lastSlash);
  },
  join: (dirname, filename) => {
    return dirname.endsWith('/') ? dirname + filename : dirname + '/' + filename;
  }
};

let DOM_COMPONENT_ID = ''
//<-- DOM_COMPONENT_ID -->

let config = {}
//<-- CONFIG -->


/**
 * @typedef {string | undefined} Tag
 */

/** @type {import('./sdk.js').GetInstanceJSFn} */
function getInstanceJs(parentClass, addonTriggers, C3) {
  // @ts-ignore
  return class Pipelab extends parentClass {
    _additionalLoadPromises = []

    /** @type {SDK.IObjectInstance | undefined} */
    _inst;

    /** @type {WebSocketClient | undefined} */
    WebSocketClient;

    /** @type {string} */
    _userFolder = '';

    /** @type {string} */
    _homeFolder = '';

    /** @type {string} */
    _appDataFolder = '';

    /** @type {string} */
    _userDataFolder = '';

    /** @type {string} */
    _localAppDataFolder = '';

    /** @type {string} */
    _localUserDataFolder = '';

    /** @type {string} */
    _sessionDataFolder = '';

    /** @type {string} */
    _tempFolder = '';

    /** @type {string} */
    _exeFolder = '';

    /** @type {string} */
    _moduleFolder = '';

    /** @type {string} */
    _desktopFolder = '';

    /** @type {string} */
    _documentsFolder = '';

    /** @type {string} */
    _downloadsFolder = '';

    /** @type {string} */
    _musicFolder = '';

    /** @type {string} */
    _picturesFolder = '';

    /** @type {string} */
    _videosFolder = '';

    /** @type {string} */
    _recentFolder = '';

    /** @type {string} */
    _logsFolder = '';

    /** @type {string} */
    _crashDumpsFolder = '';

    /** @type {string} */
    _appFolder = '';

    /** @type {string} */
    _projectFilesFolder = '';

    /** @type {string} - The current tag of the trigger. Can be used for any trigger */
    _currentTag = '';

    /** @type {import('@pipelab/core').MessageEngine['output']['body']['engine']} */
    _engine = 'electron';

    /** @type {boolean} */
    _isInitialized = false;

    /** @type {boolean} */
    _lastPathExists = false;

    /** @type {number} */
    _windowHeight = -1;

    /** @type {number} */
    _windowWidth = -1;

    /** @type {string} */
    _windowTitle = '';

    /** @type {number} */
    _windowX = -1;

    /** @type {number} */
    _windowY = -1;

    /** @type {import("./sdk.js").IsFullScreenState} */
    _fullscreenState = 0;

    /** @type {{accountId: number, steamId32: string, steamId64: string}} */
    _steam_SteamId = defaultSteamId
    /** @type {import('@pipelab/core').NamespacedFunctionReturnType<'localplayer', 'getName'>} */
    _steam_Name = ""
    /** @type {import('@pipelab/core').NamespacedFunctionReturnType<'localplayer', 'getLevel'>} */
    _steam_Level = -1
    /** @type {import('@pipelab/core').NamespacedFunctionReturnType<'localplayer', 'getIpCountry'>} */
    _steam_IpCountry = ''
    /** @type {import('@pipelab/core').NamespacedFunctionReturnType<'utils', 'isSteamRunningOnSteamDeck'>} */
    _steam_IsRunningOnSteamDeck = false

    /** @type {string} */
    _platform = ''
    /** @type {string} */
    _arch = ''

    /** @type {number} */
    _steam_AppId = -1

    /** @type {string} */
    _ListFilesErrorValue = ''
    /** @type {import("@pipelab/core").FileFolder[]} */
    _ListFilesResultValue = []

    /** @type {string} */
    _ActivateToWebPageErrorValue = ''
    /** @type {boolean} */
    _ActivateToWebPageResultValue = false

    /** @type {string} */
    _ActivateToStoreErrorValue = ''
    /** @type {boolean} */
    _ActivateToStoreResultValue = false

    /**
     * Description
     * @param {ISDKInstanceBase_} inst
     * @param {any} _properties
     */
    constructor(inst, _properties) {

      let dummyInst = undefined
      if (sdk === 'v1') {
        dummyInst = inst
      } else {
        dummyInst = {
          domComponentId: DOM_COMPONENT_ID
        }
      }
      super(dummyInst);

      let properties;
      if (sdk == 'v1') {
        properties = _properties;
      } else {
        properties = this._getInitProperties();
      }

      if (properties) {
        // Initialization logic if needed
      }

      if (sdk === 'v1') {
        /** @type {import("./sdk.js").StaticMethodsParentClass['_triggerAsync']} */
        // @ts-expect-error TriggerAsync is only available in v1
        this._triggerAsync = this.TriggerAsync;
        /** @type {import("./sdk.js").StaticMethodsParentClass['_trigger']} */
        // @ts-expect-error Trigger is only available in v1
        this._trigger = (...args) => {
          return this.Trigger(...args);
        };
      }

      if (sdk === "v1") {
        this.c3runtime = this._runtime
      } else {
        this.c3runtime = this.runtime
      }

      if (sdk === "v1") {
        this.addLoadPromise = this.c3runtime.AddLoadPromise
      } else {
        this.addLoadPromise = this.c3runtime.sdk.addLoadPromise
      }

      if (sdk === "v1") {
        this.postToDOMAsync = this.PostToDOMAsync
      } else {
        this.postToDOMAsync = this._postToDOMAsync
      }

      if (sdk === "v1") {
        this.postToDOM = this.PostToDOM
      } else {
        this.postToDOM = this._postToDOM
      }

      if (sdk === "v1") {
        this.addDOMMessageHandler = this.AddDOMMessageHandler
      } else {
        this.addDOMMessageHandler = this._addDOMMessageHandler
      }

      this?.addLoadPromise?.(
        this.postToDOMAsync("get-fullscreen-state")
        .then(
          /** @type {import("./sdk.js").PostFullscreenState} */
          data =>
        {
          this._fullscreenState = data.state
        })
      );

      this.addDOMMessageHandler('fullscreen-state-changed', (data) => {
        this._fullscreenState = data.state
      })
    }

    async unsupportedEngine() {
      console.warn(`Unable to execute action:
- unsupported engine
- server not reachable
- plugin not initialized
`)
    }

    /**
     * @param {Tag} tag
     * @param {[import("./sdk.js").OpaqueCnds, import("./sdk.js").OpaqueCnds]} fns
     */
    async trigger(tag, fns) {
      // fns[0] = with tag
      // fns[1] = without tag
      if (tag) {
        this._currentTag = tag
        this._trigger(fns[0])
        this._trigger(fns[1])
        // reset tag
        this._currentTag = ""
      } else {
        await this._triggerAsync(fns[1])
      }
    }

    /**
     * @template {(...args: any[]) => any} T
     * @param {T} base
     * @param {(...params: Parameters<T>) => unknown} callback
     * @param {(...params: Parameters<T>) => unknown} [fallback]
     * @param {boolean} [force]
     * @param {boolean} [isInitialize]
     * @returns {T}
     */
    wrap(base, callback, fallback, force, isInitialize) {
      // @ts-expect-error
      return (/** @type {Parameters<T>} */ ...args) => {
        if (!this._isInitialized && !isInitialize) {
          console.warn("Plugin has no been initialized. Please use the according action at the start of layout")
        }

        // is initialized
        if (this._isInitialized) {
          // and is connected to an engine
          if (this.ws?.isConnected) {
            // execute callback
            return callback.call(this, ...args);
          } else {
            // do nothing (web, nwjs, unsupported, ...)
            return fallback
              ? fallback.call(this, ...args)
              : callback.call(this, ...args);
          }
        } else if (force) {
          return callback.call(this, ...args);
        } else {
          return fallback
            ? fallback.call(this, ...args)
            : callback.call(this, ...args);
        }
      }
    }

    /**
     * @template {(...args: any[]) => any} T
     * @param {T} base
     * @param {(...params: Parameters<T>) => unknown} callback
     * @returns {T}
     */
    exprs(base, callback) {
      // @ts-expect-error
      return (/** @type {Parameters<T>} */ ...args) => {
        return callback.call(this, ...args);
      }
    }

    // Acts

    _InitializeBase = this.wrap(super._Initialize, async (/** @type {Tag} */ tag) => {
      console.info('Pipelab v' + config.version)
      console.info('SDK ' + sdk)
      try {
        // Initialize the WebSocket connection
        if (!this.ws) {
          this.ws = new WebSocketClient('ws://localhost:31753', {
            maxReconnectAttempts: 3,
            reconnectInterval: 5000
          });
        }

        // expose websocket instance
        globalThis.pipelab = {
          ws: this.ws
        }

        // Fullscreen
        // Handle through runtime
        this.ws.on('/window/fullscreen-state', async (/** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').FullscreenState, 'input'>} */ data) => {
          this._fullscreenState = fullscreenPipelabStateToC3State(data.body.state)
        })

        await this.ws.connect();

        /** @type {[import("@pipelab/core").Paths, string][]} */
        const paths = [
          // app.getPath(name)
          ['home', '_homeFolder'],
          ['appData', '_appDataFolder'],
          ['userData', '_userDataFolder'],
          ['localAppData', '_localAppDataFolder'],
          ['localUserData', '_localUserDataFolder'],
          ['sessionData', '_sessionDataFolder'],
          ['temp', '_tempFolder'],
          ['exe', '_exeFolder'],
          ['module', '_moduleFolder'],
          ['desktop', '_desktopFolder'],
          ['documents', '_documentsFolder'],
          ['downloads', '_downloadsFolder'],
          ['music', '_musicFolder'],
          ['pictures', '_picturesFolder'],
          ['videos', '_videosFolder'],
          ['recent', '_recentFolder'],
          ['logs', '_logsFolder'],
          ['crashDumps', '_crashDumpsFolder'],
          // app.getAppPath
          ['app', '_appFolder'],
          ['project', '_projectFilesFolder'],
        ]

        /** @type {(() => (Promise<unknown>))[]} */
        const promises = []

        for (const name of paths) {
          promises.push(async () => {
            // -----------------------------------------------------------------------
            // Fetch user folder
            /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessagePaths, 'input'>} */
            const orderPath = {
              url: '/paths',
              body: {
                name: name[0]
              }
            }

            const pathFolder = await this.ws?.sendAndWaitForResponse(orderPath)
            if (pathFolder) {
              // @ts-expect-error
              this[name[1]] = pathFolder.body.data
            }
          })
        }

        // TODO: BigInt support
        promises.push(async () => {
          /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'localplayer', 'getSteamId'>, 'input'>} */
          const order = {
            url: '/steam/raw',
            body: {
              namespace: 'localplayer',
              method: 'getSteamId',
              args: [],
            },
          };
          const response = await this.ws?.sendAndWaitForResponse(order);
          this._steam_SteamId = response?.body.data ?? defaultSteamId
        })

        promises.push(async () => {
          /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'localplayer', 'getName'>, 'input'>} */

          const order = {
            url: '/steam/raw',
            body: {
              namespace: 'localplayer',
              method: 'getName',
              args: [],
            },
          };
          const response = await this.ws?.sendAndWaitForResponse(order);
          this._steam_Name = response?.body.data ?? '';
        })

        promises.push(async () => {
          /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'localplayer', 'getLevel'>, 'input'>} */

          const order = {
            url: '/steam/raw',
            body: {
              namespace: 'localplayer',
              method: 'getLevel',
              args: [],
            },
          };
          const response = await this.ws?.sendAndWaitForResponse(order);
          this._steam_Level = response?.body.data ?? -1;
        })

        promises.push(async () => {
          /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'localplayer', 'getIpCountry'>, 'input'>} */
          const order = {
            url: '/steam/raw',
            body: {
              namespace: 'localplayer',
              method: 'getIpCountry',
              args: [],
            },
          };
          const response = await this.ws?.sendAndWaitForResponse(order);
          this._steam_IpCountry = response?.body.data ?? '';
        })

        promises.push(async () => {
          /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'utils', 'isSteamRunningOnSteamDeck'>, 'input'>} */
          const order = {
            url: '/steam/raw',
            body: {
              namespace: 'utils',
              method: 'isSteamRunningOnSteamDeck',
              args: [],
            },
          };
          const response = await this.ws?.sendAndWaitForResponse(order);
          this._steam_IsRunningOnSteamDeck = response?.body.data ?? false;
        })

        promises.push(async () => {
          /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageInfos, 'input'>} */
          const order = {
            url: '/infos',
            body: {},
          };
          const response = await this.ws?.sendAndWaitForResponse(order);
          this._platform = response?.body.platform ?? "";
          this._arch = response?.body.arch ?? "";
        })

        promises.push(async () => {
          /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'utils', 'getAppId'>, 'input'>} */
          const order = {
            url: '/steam/raw',
            body: {
              namespace: 'utils',
              method: 'getAppId',
              args: [],
            },
          };
          const response = await this.ws?.sendAndWaitForResponse(order);
          this._steam_AppId = response?.body.data ?? -1;
        })

        const results = await Promise.allSettled(promises.map(x => x()))

        // -----------------------------------------------------------------------
        // Fetch engine

        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageEngine, 'input'>} */
        const orderEngine = {
          url: '/engine',
        }

        /**
         * @type {(import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageEngine, 'output'>) | undefined}
         */
        // @ts-expect-error
        const engineResponse = await this.ws.sendAndWaitForResponse(orderEngine)
        if (engineResponse) {
          this._engine = engineResponse.body.engine
        }

        this._isInitialized = true

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnInitializeSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyInitializeSuccess
        ])
      } catch (e) {
        console.error(e)
        this._isInitialized = false
        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnInitializeError,
          C3.Plugins.pipelabv2.Cnds.OnAnyInitializeError
        ])
      }

    }, this.unsupportedEngine, true, true)
    _Initialize = this._InitializeBase
    _InitializeSync = this._InitializeBase

    _WriteTextFileBase = this.wrap(super._WriteTextFile, async (
      /** @type {string} */ path,
      /** @type {string} */ contents,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWriteFile, 'input'>} */
        const order = {
          url: '/fs/file/write',
          body: {
            path,
            contents: contents,
            encoding: "utf8"
          }
        }

        const response = await this.ws?.sendAndWaitForResponse(order)
        this._WriteTextFileResultValue = true
        this._WriteTextFileErrorValue = ''
        await this.trigger("tag", [
          C3.Plugins.pipelabv2.Cnds.OnWriteTextFileSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyWriteTextFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._WriteTextFileErrorValue = e.message
          this._WriteTextFileResultValue = false
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnWriteTextFileError,
            C3.Plugins.pipelabv2.Cnds.OnAnyWriteTextFileError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _WriteTextFile = this._WriteTextFileBase
    _WriteTextFileSync = this._WriteTextFileBase
    _WriteText = this._WriteTextFileBase
    _WriteTextSync = this._WriteTextFileBase

    _ReadTextFileBase = this.wrap(super._ReadTextFile, async (
      /** @type {string} */ path,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageReadFile, 'input'>} */
        const order = {
          url: '/fs/file/read',
          body: {
            path,
            encoding: "utf8"
          }
        }

        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }

        this._ReadTextFileResultValue = answer?.body.content
        this._ReadTextFileErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnReadTextFileSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyReadTextFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ReadTextFileErrorValue = e.message
          this._ReadTextFileResultValue = false
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnReadTextFileError,
            C3.Plugins.pipelabv2.Cnds.OnAnyReadTextFileError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ReadTextFile = this._ReadTextFileBase
    _ReadTextFileSync = this._ReadTextFileBase

    _CheckIfPathExistBase = this.wrap(super._CheckIfPathExist, async (
      /** @type {string} */ path,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageExistFile, 'input'>} */
        const order = {
          url: '/fs/exist',
          body: {
            path,
          }
        }

        const answer = await this.ws?.sendAndWaitForResponse(order)

        if (answer?.body.success === false) {
          throw new Error('Failed')
        }

        this._CheckIfPathExistResultValue = answer?.body.success ?? false
        this._CheckIfPathExistErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnCheckIfPathExistSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyCheckIfPathExistSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._CheckIfPathExistErrorValue = e.message
          this._CheckIfPathExistResultValue = false
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnCheckIfPathExistError,
            C3.Plugins.pipelabv2.Cnds.OnAnyCheckIfPathExistError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _CheckIfPathExist = this._CheckIfPathExistBase
    _CheckIfPathExistSync = this._CheckIfPathExistBase

    _MaximizeBase = this.wrap(super._Maximize, async () => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWindowMaximize, 'input'>} */
      const order = {
        url: '/window/maximize',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _Maximize = this._MaximizeBase
    _MaximizeSync = this._MaximizeBase

    _MinimizeBase = this.wrap(super._Minimize, async () => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWindowMinimize, 'input'>} */
      const order = {
        url: '/window/minimize',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _Minimize = this._MinimizeBase
    _MinimizeSync = this._MinimizeBase

    _RestoreBase = this.wrap(super._Restore, async () => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWindowRestore, 'input'>} */
      const order = {
        url: '/window/restore',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _Restore = this._RestoreBase
    _RestoreSync = this._RestoreBase

    _RequestAttentionBase = this.wrap(super._RequestAttention, async (/** @type {number} */ mode) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageRequestAttention, 'input'>} */
      const order = {
        url: '/window/request-attention',
      }

      await this.ws?.sendAndWaitForResponse(order)

      // TODO: support stop
    }, this.unsupportedEngine)
    _RequestAttention = this._RequestAttentionBase
    _RequestAttentionSync = this._RequestAttentionBase

    _SetAlwaysOnTopBase = this.wrap(super._SetAlwaysOnTop, async (/** @type {number} */ mode) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetAlwaysOnTop, 'input'>} */
      const order = {
        url: '/window/set-always-on-top',
        body: {
          value: mode === 1 ? true : false
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _SetAlwaysOnTop = this._SetAlwaysOnTopBase
    _SetAlwaysOnTopSync = this._SetAlwaysOnTopBase

    _SetHeightBase = this.wrap(super._SetHeight, async (/** @type {number} */ height) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetHeight, 'input'>} */
      const order = {
        url: '/window/set-height',
        body: {
          value: height
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _SetHeight = this._SetHeightBase
    _SetHeightSync = this._SetHeightBase

    _SetMaximumSizeBase = this.wrap(super._SetMaximumSize, async (/** @type {number} */ width, /** @type {number} */ height) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetMaximumSize, 'input'>} */
      const order = {
        url: '/window/set-maximum-size',
        body: {
          height,
          width,
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _SetMaximumSize = this._SetMaximumSizeBase
    _SetMaximumSizeSync = this._SetMaximumSizeBase

    _SetMinimumSizeBase = this.wrap(super._SetMinimumSize, async (/** @type {number} */ width, /** @type {number} */ height) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetMinimumSize, 'input'>} */
      const order = {
        url: '/window/set-minimum-size',
        body: {
          height,
          width,
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _SetMinimumSize = this._SetMinimumSizeBase
    _SetMinimumSizeSync = this._SetMinimumSizeBase

    _SetResizableBase = this.wrap(super._SetResizable, async (/** @type {number} */ resizable) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetResizable, 'input'>} */
      const order = {
        url: '/window/set-resizable',
        body: {
          value: resizable === 1 ? true : false
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _SetResizable = this._SetResizableBase
    _SetResizableSync = this._SetResizableBase

    _SetTitleBase = this.wrap(super._SetTitle, async (/** @type {string} */ title) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetTitle, 'input'>} */
      const order = {
        url: '/window/set-title',
        body: {
          value: title
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _SetTitle = this._SetTitleBase
    _SetTitleSync = this._SetTitleBase

    _SetWidthBase = this.wrap(super._SetWidth, async (/** @type {number} */ width) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetWidth, 'input'>} */
      const order = {
        url: '/window/set-width',
        body: {
          value: width
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _SetWidth = this._SetWidthBase
    _SetWidthSync = this._SetWidthBase

    _SetXBase = this.wrap(super._SetX, async (/** @type {number} */ x) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetX, 'input'>} */
      const order = {
        url: '/window/set-x',
        body: {
          value: x
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _SetX = this._SetXBase
    _SetXSync = this._SetXBase

    _SetYBase = this.wrap(super._SetY, async (/** @type {number} */ y) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetY, 'input'>} */
      const order = {
        url: '/window/set-y',
        body: {
          value: y
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _SetY = this._SetYBase
    _SetYSync = this._SetYBase

    _ShowDevToolsBase = this.wrap(super._ShowDevTools, async (/** @type {number} */ toggle) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageShowDevTools, 'input'>} */
      const order = {
        url: '/window/show-dev-tools',
        body: {
          value: toggle === 1 ? true : false
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _ShowDevTools = this._ShowDevToolsBase
    _ShowDevToolsSync = this._ShowDevToolsBase

    _SetFullscreenBase = this.wrap(super._SetFullscreen, async (/** @type {number} */ toggle) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetFullscreen, 'input'>} */
      const order = {
        url: '/window/set-fullscreen',
        body: {
          value: toggle === 0 ? 'normal' : 'fullscreen'
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, (toggle) => {
      // Use DOM handler for fullscreen operations
      if (this.c3runtime.platformInfo.exportType === 'preview') {
        /** @type {import('./sdk.js').PostFullscreenState} */
        const state = {
          state: toggle === 0 ? 0 : 1
        }
        this.postToDOM('set-fullscreen', state)
      }
    })
    _SetFullscreen = this._SetFullscreenBase
    _SetFullscreenSync = this._SetFullscreenBase

    _UnmaximizeBase = this.wrap(super._Unmaximize, async () => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWindowUnmaximize, 'input'>} */
      const order = {
        url: '/window/unmaximize',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _Unmaximize = this._UnmaximizeBase
    _UnmaximizeSync = this._UnmaximizeBase

    _ShowFolderDialogBase = this.wrap(super._ShowFolderDialog, async (
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageShowFolderDialog, 'input'>} */
        const order = {
          url: '/dialog/folder',
        }

        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageShowFolderDialog, 'output'> | undefined} */
        // @ts-expect-error
        const answer = await this.ws?.sendAndWaitForResponse(order)

        if (answer?.body.success === false) {
          throw new Error('Failed')
        }

        this._ShowFolderDialogResultValue = answer?.body.paths[0]
        this._ShowFolderDialogErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnShowFolderDialogSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyShowFolderDialogSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ShowFolderDialogErrorValue = e.message
          this._ShowFolderDialogResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnShowFolderDialogError,
            C3.Plugins.pipelabv2.Cnds.OnAnyShowFolderDialogError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ShowFolderDialog = this._ShowFolderDialogBase
    _ShowFolderDialogSync = this._ShowFolderDialogBase

    _ShowOpenDialogBase = this.wrap(super._ShowOpenDialog, async (
      /** @type {string} */ accept,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /**
         * @type {import('@pipelab/core').FileFilter[]}
         */
        const filters = accept.split(',')
          .map(filter => {
            const [name, extensions] = filter.split('|')
            if (name && extensions) {
              /** @type {import("electron").FileFilter} */
              const result = {
                name,
                extensions: extensions.split(';')
              }
              return result
            }
          })
          .filter(x => !!x)

        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageShowOpenDialog, 'input'>} */
        const order = {
          url: '/dialog/open',
          body: {
            filters
          }
        }

        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._ShowOpenDialogResultValue = answer?.body.paths[0]
        this._ShowOpenDialogErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnShowOpenDialogSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyShowOpenDialogSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ShowOpenDialogErrorValue = e.message
          this._ShowOpenDialogResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnShowOpenDialogError,
            C3.Plugins.pipelabv2.Cnds.OnAnyShowOpenDialogError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ShowOpenDialog = this._ShowOpenDialogBase
    _ShowOpenDialogSync = this._ShowOpenDialogBase

    _ShowSaveDialogBase = this.wrap(super._ShowSaveDialog, async (
      /** @type {string} */ accept,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /**
         * @type {import('@pipelab/core').FileFilter[]}
         */
        const filters = accept.split(',')
          .map(filter => {
            const [name, extensions] = filter.split('|')
            if (name && extensions) {
              /** @type {import("electron").FileFilter} */
              const result = {
                name,
                extensions: extensions.split(';')
              }
              return result
            }
          })
          .filter(x => !!x)

        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageShowSaveDialog, 'input'>} */
        const order = {
          url: '/dialog/save',
          body: {
            filters
          }
        }

        const answer = await this.ws?.sendAndWaitForResponse(order)

        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._ShowSaveDialogResultValue = answer?.body.path
        this._ShowSaveDialogErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnShowSaveDialogSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyShowSaveDialogSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ShowSaveDialogErrorValue = e.message
          this._ShowSaveDialogResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnShowSaveDialogError,
            C3.Plugins.pipelabv2.Cnds.OnAnyShowSaveDialogError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ShowSaveDialog = this._ShowSaveDialogBase
    _ShowSaveDialogSync = this._ShowSaveDialogBase

    _AppendFileBase = this.wrap(super._AppendFile, async (
      /** @type {string} */ path,
      /** @type {string} */ contents,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWriteFile, 'input'>} */
        const order = {
          url: '/fs/file/write',
          body: {
            path,
            contents,
            encoding: 'utf-8',
            flag: 'a' // Append
          }
        }
        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._AppendFileResultValue = answer?.body.success

        this._AppendFileErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnAppendFileSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyAppendFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._AppendFileErrorValue = e.message
          this._AppendFileResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnAppendFileError,
            C3.Plugins.pipelabv2.Cnds.OnAnyAppendFileError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _AppendFile = this._AppendFileBase
    _AppendFileSync = this._AppendFileBase

    _CopyFileBase = this.wrap(super._CopyFile, async (
      /** @type {string} */ source,
      /** @type {string} */ destination,
      /** @type {boolean} */ overwrite,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageCopyFile, 'input'>} */
        const order = {
          url: '/fs/copy',
          body: {
            source,
            destination,
            overwrite
          }
        }
        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._CopyFileResultValue = answer?.body.success

        this._CopyFileErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnCopyFileSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyCopyFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._CopyFileErrorValue = e.message
          this._CopyFileResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnCopyFileError,
            C3.Plugins.pipelabv2.Cnds.OnAnyCopyFileError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _CopyFile = this._CopyFileBase
    _CopyFileSync = this._CopyFileBase

    _CreateFolderBase = this.wrap(super._CreateFolder, async (
      /** @type {string} */ path,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageCreateFolder, 'input'>} */
        const order = {
          url: '/fs/folder/create',
          body: {
            path
          }
        }

        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._CreateFolderResultValue = answer?.body.success
        this._CreateFolderErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnCreateFolderSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyCreateFolderSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._CreateFolderErrorValue = e.message
          this._CreateFolderResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnCreateFolderError,
            C3.Plugins.pipelabv2.Cnds.OnAnyCreateFolderError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _CreateFolder = this._CreateFolderBase
    _CreateFolderSync = this._CreateFolderBase

    _DeleteFileBase = this.wrap(super._DeleteFile, async (
      /** @type {string} */ path,
      /** @type {boolean} */ recursive,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageDelete, 'input'>} */
        const order = {
          url: '/fs/delete',
          body: {
            path,
            recursive
          }
        }
        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._DeleteFileResultValue = answer?.body.success
        this._DeleteFileErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnDeleteFileSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyDeleteFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._DeleteFileErrorValue = e.message
          this._DeleteFileResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnDeleteFileError,
            C3.Plugins.pipelabv2.Cnds.OnAnyDeleteFileError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _DeleteFile = this._DeleteFileBase
    _DeleteFileSync = this._DeleteFileBase

    _ListFilesBase = this.wrap(super._ListFiles, async (
      /** @type {string} */ path,
      /** @type {boolean} */ recursive,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageListFiles, 'input'>} */
        const order = {
          url: '/fs/list',
          body: {
            path,
            recursive,
          }
        }
        const files = await this.ws?.sendAndWaitForResponse(order)

        if (files?.body.success === false) {
          throw new Error('Failed')
        }

        this._ListFilesResultValue = files?.body.list ?? []
        this._ListFilesErrorValue = ''
        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnListFilesSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyListFilesSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ListFilesErrorValue = e.message
          this._ListFilesResultValue = []
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnListFilesError,
            C3.Plugins.pipelabv2.Cnds.OnAnyListFilesError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ListFiles = this._ListFilesBase
    _ListFilesSync = this._ListFilesBase

    _MoveFileBase = this.wrap(super._MoveFile, async (
      /** @type {string} */ source,
      /** @type {string} */ destination,
      /** @type {boolean} */ overwrite,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageMove, 'input'>} */
        const order = {
          url: '/fs/move',
          body: {
            source,
            destination,
            overwrite
          }
        }
        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._MoveFileResultValue = answer?.body.success
        this._MoveFileErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnMoveFileSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyMoveFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._MoveFileErrorValue = e.message
          this._MoveFileResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnMoveFileError,
            C3.Plugins.pipelabv2.Cnds.OnAnyMoveFileError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _MoveFile = this._MoveFileBase
    _MoveFileSync = this._MoveFileBase

    _OpenBrowserBase = this.wrap(super._OpenBrowser, async () => {
      throw new Error('"_OpenBrowser" Not implemented')
    }, this.unsupportedEngine)
    _OpenBrowser = this._OpenBrowserBase
    _OpenBrowserSync = this._OpenBrowserBase

    _ReadBinaryFileBase = this.wrap(super._ReadBinaryFile, async (
      /** @type {string} */ path,
      /** @type {IObjectClass<IInstance>} */ destination,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageReadFileBinary, 'input'>} */
        const order = {
          url: '/fs/file/read/binary',
          body: {
            path,
          }
        }

        const answer = await this.ws?.sendAndWaitForResponse(order)

        const sdkInst = this.__GetBinaryDataSdkInstance(destination);

        if (!sdkInst) {
          throw new Error("SDK instance not found")
        }
        const newBuffer = new Uint8Array(answer?.body.content ?? [])
        sdkInst.setArrayBufferCopy(newBuffer.buffer);

        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._ReadBinaryFileResultValue = answer?.body.success

        this._ReadBinaryFileErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnReadBinaryFileSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyReadBinaryFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ReadBinaryFileErrorValue = e.message
          this._ReadBinaryFileResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnReadBinaryFileError,
            C3.Plugins.pipelabv2.Cnds.OnAnyReadBinaryFileError,
          ])
        }
        console.error(e)
      }

    }, this.unsupportedEngine)
    _ReadBinaryFile = this._ReadBinaryFileBase
    _ReadBinaryFileSync = this._ReadBinaryFileBase

    _RenameFileBase = this.wrap(super._RenameFile, async (
      /** @type {string} */ source,
      /** @type {string} */ newFileName,
      /** @type {boolean} */ overwrite,
      /** @type {Tag} */ tag
    ) => {
      try {
        const directory = posixPath.dirname(source);
        const newPath = posixPath.join(directory, newFileName);

        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageMove, 'input'>} */
        const order = {
          url: '/fs/move',
          body: {
            source,
            destination: newPath,
            overwrite,
          }
        }
        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._RenameFileResultValue = answer?.body.success

        this._RenameFileErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnRenameFileSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyRenameFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._RenameFileErrorValue = e.message
          this._RenameFileResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnRenameFileError,
            C3.Plugins.pipelabv2.Cnds.OnAnyRenameFileError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _RenameFile = this._RenameFileBase
    _RenameFileSync = this._RenameFileBase

    _RunFileBase = this.wrap(super._RunFile, async (
      /** @type {string} */ command,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageRun, 'input'>} */
        const order = {
          url: '/run',
          body: {
            command,
            args: [],
          }
        }

        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._RunFileResultValue = answer?.body.success

        this._RunFileErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnRunFileSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyRunFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._RunFileErrorValue = e.message
          this._RunFileResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnRunFileError,
            C3.Plugins.pipelabv2.Cnds.OnAnyRunFileError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _RunFile = this._RunFileBase
    _RunFileSync = this._RunFileBase

    _ShellOpenBase = this.wrap(super._ShellOpen, async (
      /** @type {string} */ path,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageOpen, 'input'>} */
        const order = {
          url: '/open',
          body: {
            path,
          }
        }

        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._ShellOpenResultValue = answer?.body.success

        this._ShellOpenErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnShellOpenSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyShellOpenSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ShellOpenErrorValue = e.message
          this._ShellOpenResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnShellOpenError,
            C3.Plugins.pipelabv2.Cnds.OnAnyShellOpenError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ShellOpen = this._ShellOpenBase
    _ShellOpenSync = this._ShellOpenBase

    _ExplorerOpenBase = this.wrap(super._ExplorerOpen, async (
      /** @type {string} */ path,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageExplorerOpen, 'input'>} */
        const order = {
          url: '/show-in-explorer',
          body: {
            path,
          }
        }

        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._ExplorerOpenResultValue = answer?.body.success

        this._ExplorerOpenErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnExplorerOpenSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyExplorerOpenSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ExplorerOpenErrorValue = e.message
          this._ExplorerOpenResultValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnExplorerOpenError,
            C3.Plugins.pipelabv2.Cnds.OnAnyExplorerOpenError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ExplorerOpen = this._ExplorerOpenBase
    _ExplorerOpenSync = this._ExplorerOpenBase

    /**
     * @param {IObjectClass<IInstance>} objectClass
     * @return {IBinaryDataInstance | null} objectClass
     */
    __GetBinaryDataSdkInstance(objectClass) {
      if (!objectClass)
        return null;
      // @ts-expect-error
      const target = objectClass.getFirstPickedInstance(this._inst);
      if (!target)
        return null;
      // return target.GetSdkInstance()
      // @ts-expect-error
      return target
    }

    _WriteBinaryFileBase = this.wrap(super._WriteBinaryFile, async (/** @type {string} */ path, /** @type {string} */ source) => {
      throw new Error('not supported')

      // const sdkInst = this.__GetBinaryDataSdkInstance(source);

      // if (!sdkInst) {
      //   throw new Error("SDK instance not found")
      // }

      // const buffer = sdkInst.getArrayBufferReadOnly();

      // /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWriteFile, 'input'>} */
      // const order = {
      //   url: '/fs/file/write',
      //   body: {
      //     path,
      //     contents: buffer,
      //     encoding: undefined
      //   }
      // }

      // const answer = await this.ws?.sendAndWaitForResponse(order)
      // if (!answer || answer.body.success === false) {
      //   this._currentTag = tag;
      //   await this.TriggerAsync(C3.Plugins.pipelabv2.Cnds.OnAnyBinaryFileRead)
      //   this._currentTag = tag;
      //   await this.TriggerAsync(C3.Plugins.pipelabv2.Cnds.OnBinaryFileRead)
      //   this._currentTag = ''
      // }
    }, this.unsupportedEngine)
    _WriteBinaryFile = this._WriteBinaryFileBase
    _WriteBinaryFileSync = this._WriteBinaryFileBase

    _FetchFileSizeBase = this.wrap(super._FetchFileSize, async (
      /** @type {string} */ path,
      /** @type {Tag} */ tag,
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageFileSize, 'input'>} */
        const order = {
          url: '/fs/file/size',
          body: {
            path
          }
        }

        /**
         * @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageFileSize, 'output'>}
         */
        // @ts-expect-error
        const answer = await this.ws?.sendAndWaitForResponse(order)
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._FetchFileSizeResultValue = answer.body.size ?? -1

        this._FetchFileSizeErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnFetchFileSizeSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyFetchFileSizeSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._FetchFileSizeErrorValue = e.message
          this._FetchFileSizeResultValue = -1
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnFetchFileSizeError,
            C3.Plugins.pipelabv2.Cnds.OnAnyFetchFileSizeError,
          ])
        }
        console.error(e)
      }
    })
    _FetchFileSize = this._FetchFileSizeBase
    _FetchFileSizeSync = this._FetchFileSizeBase

    _ActivateAchievementBase = this.wrap(super._ActivateAchievement, async (
      /** @type {string} */ achievement,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'achievement', 'activate'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'achievement',
            method: 'activate',
            args: [achievement],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._ActivateAchievementResultValue = answer?.body.success
        this._ActivateAchievementErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnActivateAchievementSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyActivateAchievementSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ActivateAchievementErrorValue = e.message
          this._ActivateAchievementResultValue = -1
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnActivateAchievementError,
            C3.Plugins.pipelabv2.Cnds.OnAnyActivateAchievementError
          ])
        }
      }
    }, this.unsupportedEngine)
    _ActivateAchievement = this._ActivateAchievementBase
    _ActivateAchievementSync = this._ActivateAchievementBase

    _ClearAchievementBase = this.wrap(super._ClearAchievement, async (
      /** @type {string} */ achievement,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'achievement', 'clear'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'achievement',
            method: 'clear',
            args: [achievement],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._ClearAchievementResultValue = answer?.body.success
        this._ClearAchievementErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnClearAchievementSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyClearAchievementSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ClearAchievementErrorValue = e.message
          this._ClearAchievementResultValue = -1
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnClearAchievementError,
            C3.Plugins.pipelabv2.Cnds.OnAnyClearAchievementError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ClearAchievement = this._ClearAchievementBase
    _ClearAchievementSync = this._ClearAchievementBase

    _CheckAchievementActivationStateBase = this.wrap(super._CheckAchievementActivationState, async (
      /** @type {string} */ achievement,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'achievement', 'isActivated'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'achievement',
            method: 'isActivated',
            args: [achievement],
          },
        };

        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._CheckAchievementActivationStateResultValue = answer?.body.data
        this._CheckAchievementActivationStateErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnCheckAchievementActivationStateSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyCheckAchievementActivationStateSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._CheckAchievementActivationErrorValue = e.message
          this._CheckAchievementActivationResultValue = -1
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnCheckAchievementActivationStateError,
            C3.Plugins.pipelabv2.Cnds.OnAnyCheckAchievementActivationStateError
          ])
        }
      }
    }, () => false)
    _CheckAchievementActivationState = this._CheckAchievementActivationStateBase
    _CheckAchievementActivationStateSync = this._CheckAchievementActivationStateBase

    _LeaderboardUploadScoreBase = this.wrap(super._LeaderboardUploadScore, async (
      /** @type {string} */ name,
      /** @type {number} */ score,
      /** @type {string} */ type,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'leaderboards', 'uploadScore'>, 'input'>} */
        const order = {
          url: '/steam/leaderboard/upload-score',
          body: {
            name,
            score,
            type,
            metadata: [],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._LeaderboardUploadScoreResultValue = answer?.body.success
        this._LeaderboardUploadScoreErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnLeaderboardUploadScoreSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyLeaderboardUploadScoreSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._LeaderboardUploadScoreErrorValue = e.message
          this._LeaderboardUploadScoreResultValue = -1
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnLeaderboardUploadScoreError,
            C3.Plugins.pipelabv2.Cnds.OnAnyLeaderboardUploadScoreError
          ])
        }
      }
    }, this.unsupportedEngine)
    _LeaderboardUploadScore = this._LeaderboardUploadScoreBase
    _LeaderboardUploadScoreSync = this._LeaderboardUploadScoreBase

    _LeaderboardUploadScoreWithMetadataBase = this.wrap(super._LeaderboardUploadScoreWithMetadata, async (
      /** @type {string} */ name,
      /** @type {number} */ score,
      /** @type {IObjectType<IArrayInstance>} */ metadata,
      /** @type {string} */ type,
      /** @type {Tag} */ tag
    ) => {
      const target = metadata.getFirstPickedInstance();
      let result = []
      if (target) {
        if (target.height === 1) {
          const  { width } = target;
          for (let i = 0; i < width; i++) {
            const value = target.getAt(i)

            result.push(typeof value === 'string' ? parseInt(value, 10) : value)
          }
        } else {
          console.warn("Array must be a 1 dimentional array. Skipping metadata")
        }
      }

      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'leaderboards', 'uploadScore'>, 'input'>} */
        const order = {
          url: '/steam/leaderboard/upload-score',
          body: {
            name,
            score,
            type,
            metadata: result,
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._LeaderboardUploadScoreWithMetadataResultValue = answer?.body.success
        this._LeaderboardUploadScoreWithMetadataErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnLeaderboardUploadScoreWithMetadataSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyLeaderboardUploadScoreWithMetadataSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._LeaderboardUploadScoreWithMetadataErrorValue = e.message
          this._LeaderboardUploadScoreWithMetadataResultValue = -1
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnLeaderboardUploadScoreWithMetadataError,
            C3.Plugins.pipelabv2.Cnds.OnAnyLeaderboardUploadScoreWithMetadataError
          ])
        }
      }
    }, this.unsupportedEngine)
    _LeaderboardUploadScoreWithMetadata = this._LeaderboardUploadScoreWithMetadataBase
    _LeaderboardUploadScoreWithMetadataSync = this._LeaderboardUploadScoreWithMetadataBase

    _LeaderboardDownloadScoreBase = this.wrap(super._LeaderboardDownloadScore, async (
      /** @type {string} */ leaderboard,
      /** @type {number} */ downloadType,
      /** @type {number} */ start,
      /** @type {number} */ end,
      /** @type {IObjectType<IJSONInstance>} */ jsonObject,
      /** @type {Tag} */ tag
    ) => {

      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'leaderboards', 'downloadScore'>, 'input'>} */
        const order = {
          url: '/steam/leaderboard/download-score',
          body: {
            name: leaderboard,
            type: downloadType,
            start,
            end,
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._LeaderboardDownloadScoreResultValue = answer?.body.success
        this._LeaderboardDownloadScoreErrorValue = ''

        const jsonInstance = jsonObject.getFirstInstance()
        jsonInstance?.setJsonDataCopy(answer?.body.data)

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnLeaderboardDownloadScoreSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyLeaderboardDownloadScoreSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._LeaderboardDownloadScoreErrorValue = e.message
          this._LeaderboardDownloadScoreResultValue = -1
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnLeaderboardDownloadScoreError,
            C3.Plugins.pipelabv2.Cnds.OnAnyLeaderboardDownloadScoreError
          ])
        }
      }
    }, this.unsupportedEngine)
    _LeaderboardDownloadScore = this._LeaderboardDownloadScoreBase
    _LeaderboardDownloadScoreSync = this._LeaderboardDownloadScoreBase

    _SetRichPresenceBase = this.wrap(super._SetRichPresence, async (
      /** @type {string} */ key,
      /** @type {string} */ value,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'localplayer', 'setRichPresence'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'localplayer',
            method: 'setRichPresence',
            args: [key, value],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._SetRichPresenceResultValue = answer?.body.data
        this._SetRichPresenceErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnSetRichPresenceSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnySetRichPresenceSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._SetRichPresenceErrorValue = e.message
          this._SetRichPresenceResultValue = -1
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnSetRichPresenceError,
            C3.Plugins.pipelabv2.Cnds.OnAnySetRichPresenceError
          ])
        }
      }
    }, this.unsupportedEngine)
    _SetRichPresence = this._SetRichPresenceBase
    _SetRichPresenceSync = this._SetRichPresenceBase

    _DiscordSetActivityBase = this.wrap(super._SetRichPresence, async (
      /** @type {string} */ details,
      /** @type {string} */ state,
      /** @type {string} */ startTimestamp,
      /** @type {string} */ largeImageKey,
      /** @type {string} */ largeImageText,
      /** @type {string} */ smallImageKey,
      /** @type {string} */ smallImageText,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').DiscordSetActivity, 'input'>} */
        const order = {
          url: '/discord/set-activity',
          body: {
            details,
            state,
            startTimestamp,
            largeImageKey,
            largeImageText,
            smallImageKey,
            smallImageText,
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._DiscordSetActivityResultValue = answer?.body.success
        this._DiscordSetActivityErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnDiscordSetActivitySuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyDiscordSetActivitySuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._DiscordSetActivityErrorValue = e.message
          this._DiscordSetActivityResultValue = false
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnDiscordSetActivityError,
            C3.Plugins.pipelabv2.Cnds.OnAnyDiscordSetActivityError
          ])
        }
      }
    }, this.unsupportedEngine)
    _DiscordSetActivitySync = this._DiscordSetActivityBase
    _DiscordSetActivity = this._DiscordSetActivityBase

    _ActivateToWebPageBase = this.wrap(super._ActivateToWebPage, async (
      /** @type {string} */ url,
      /** @type {number} */ mode,
      /** @type {Tag} */ tag
    ) => {
      try {
        // Map Construct3 combo values to Steam constants
        // 0 = "default", 1 = "modal"
        const steamMode = mode === 1 ? 1 : 0; // k_EActivateGameOverlayToWebPageMode_Modal : k_EActivateGameOverlayToWebPageMode_Default

        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'overlay', 'activateToWebPage'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'overlay',
            method: 'activateToWebPage',
            args: [url, steamMode],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._ActivateToWebPageResultValue = answer?.body.success
        this._ActivateToWebPageErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnActivateToWebPageSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyActivateToWebPageSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ActivateToWebPageErrorValue = e.message
          this._ActivateToWebPageResultValue = false
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnActivateToWebPageError,
            C3.Plugins.pipelabv2.Cnds.OnAnyActivateToWebPageError
          ])
        }
      }
    }, this.unsupportedEngine)
    _ActivateToWebPage = this._ActivateToWebPageBase
    _ActivateToWebPageSync = this._ActivateToWebPageBase

    _ActivateToStoreBase = this.wrap(super._ActivateToStore, async (
      /** @type {number} */ appId,
      /** @type {number} */ flag,
      /** @type {Tag} */ tag
    ) => {
      try {
        // Map Construct3 combo values to Steam constants
        // 0 = "none", 1 = "addToCartAndShow"
        const steamFlag = flag === 1 ? 2 : 0; // k_EOverlayToStoreFlag_AddToCartAndShow : k_EOverlayToStoreFlag_None
        
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'overlay', 'activateToStore'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'overlay',
            method: 'activateToStore',
            args: [appId, steamFlag],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._ActivateToStoreResultValue = answer?.body.success
        this._ActivateToStoreErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnActivateToStoreSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyActivateToStoreSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ActivateToStoreErrorValue = e.message
          this._ActivateToStoreResultValue = false
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnActivateToStoreError,
            C3.Plugins.pipelabv2.Cnds.OnAnyActivateToStoreError
          ])
        }
      }
    }, this.unsupportedEngine)
    _ActivateToStore = this._ActivateToStoreBase
    _ActivateToStoreSync = this._ActivateToStoreBase

    // Steam Screenshots
    _TriggerScreenshotBase = this.wrap(super._TriggerScreenshot, async (
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'screenshots', 'triggerScreenshot'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'screenshots',
            method: 'triggerScreenshot',
            args: [],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._TriggerScreenshotResultValue = answer?.body.data
        this._TriggerScreenshotErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnTriggerScreenshotSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyTriggerScreenshotSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._TriggerScreenshotErrorValue = e.message
          this._TriggerScreenshotResultValue = -1
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnTriggerScreenshotError,
            C3.Plugins.pipelabv2.Cnds.OnAnyTriggerScreenshotError
          ])
        }
      }
    }, this.unsupportedEngine)
    _TriggerScreenshot = this._TriggerScreenshotBase
    _TriggerScreenshotSync = this._TriggerScreenshotBase

    // Steam DLC
    _CheckDLCIsInstalledBase = this.wrap(super._CheckDLCIsInstalled, async (
      /** @type {number} */ appId,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'apps', 'isDlcInstalled'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'apps',
            method: 'isDlcInstalled',
            args: [appId],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._CheckDLCIsInstalledResultValue = answer?.body.data
        this._CheckDLCIsInstalledErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnCheckDLCIsInstalledSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyCheckDLCIsInstalledSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._CheckDLCIsInstalledErrorValue = e.message
          this._CheckDLCIsInstalledResultValue = false
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnCheckDLCIsInstalledError,
            C3.Plugins.pipelabv2.Cnds.OnAnyCheckDLCIsInstalledError
          ])
        }
      }
    }, this.unsupportedEngine)
    _CheckDLCIsInstalled = this._CheckDLCIsInstalledBase
    _CheckDLCIsInstalledSync = this._CheckDLCIsInstalledBase

    // Steam Workshop
    /** @type {Map<string, any>} */
    _workshopItemsMap = new Map()
    /** @type {string[]} */
    _subscribedItemIds = []

    _CreateWorkshopItemBase = this.wrap(super._CreateWorkshopItem, async (
      /** @type {number} */ appID,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'createItem'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'workshop',
            method: 'createItem',
            args: [appID],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        const result = answer?.body.data
        // @ts-expect-error - API returns UgcResult
        this._CreateWorkshopItemResultValue = result?.itemId?.toString() ?? ''
        // @ts-expect-error - API returns UgcResult
        this._CreateWorkshopItemNeedsAgreementValue = result?.needsToAcceptAgreement ? 1 : 0
        this._CreateWorkshopItemErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnCreateWorkshopItemSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyCreateWorkshopItemSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._CreateWorkshopItemErrorValue = e.message
          this._CreateWorkshopItemResultValue = ''
          this._CreateWorkshopItemNeedsAgreementValue = 0
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnCreateWorkshopItemError,
            C3.Plugins.pipelabv2.Cnds.OnAnyCreateWorkshopItemError
          ])
        }
      }
    }, this.unsupportedEngine)
    _CreateWorkshopItem = this._CreateWorkshopItemBase
    _CreateWorkshopItemSync = this._CreateWorkshopItemBase

    _UploadWorkshopItemBase = this.wrap(super._UploadWorkshopItem, async (
      /** @type {number} */ appID,
      /** @type {string} */ itemId,
      /** @type {string} */ title,
      /** @type {string} */ description,
      /** @type {string} */ contentFolderPath,
      /** @type {string} */ previewImagePath,
      /** @type {string} */ tags,
      /** @type {number} */ visibility,
      /** @type {Tag} */ tag
    ) => {
      try {
        const tagArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'updateItem'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'workshop',
            method: 'updateItem',
            args: [
              BigInt(itemId),
              {
                title,
                description,
                contentPath: contentFolderPath,
                previewPath: previewImagePath,
                tags: tagArray,
                visibility
              },
              appID
            ],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        const result = answer?.body.data
        // @ts-expect-error - API returns UgcResult
        this._UploadWorkshopItemResultValue = result?.itemId?.toString() ?? ''
        // @ts-expect-error - API returns UgcResult
        this._UploadWorkshopItemNeedsAgreementValue = result?.needsToAcceptAgreement ? 1 : 0
        this._UploadWorkshopItemErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnUploadWorkshopItemSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyUploadWorkshopItemSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._UploadWorkshopItemErrorValue = e.message
          this._UploadWorkshopItemResultValue = ''
          this._UploadWorkshopItemNeedsAgreementValue = 0
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnUploadWorkshopItemError,
            C3.Plugins.pipelabv2.Cnds.OnAnyUploadWorkshopItemError
          ])
        }
      }
    }, this.unsupportedEngine)
    _UploadWorkshopItem = this._UploadWorkshopItemBase
    _UploadWorkshopItemSync = this._UploadWorkshopItemBase

    _GetSubscribedItemsWithMetadataBase = this.wrap(super._GetSubscribedItemsWithMetadata, async (
      /** @type {Tag} */ tag
    ) => {
      try {
        // Get subscribed items
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'getSubscribedItems'>, 'input'>} */
        const orderSubscribed = {
          url: '/steam/raw',
          body: {
            namespace: 'workshop',
            method: 'getSubscribedItems',
            args: [false],
          },
        };
        const subscribedAnswer = await this.ws?.sendAndWaitForResponse(orderSubscribed);
        if (subscribedAnswer?.body.success === false) {
          throw new Error('Failed to get subscribed items')
        }
        
        const itemIds = subscribedAnswer?.body.data ?? []
        this._subscribedItemIds = itemIds.map(id => id.toString())
        
        if (itemIds.length === 0) {
          this._workshopItemsMap.clear()
          this._GetSubscribedItemsWithMetadataErrorValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetSubscribedItemsWithMetadataSuccess,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetSubscribedItemsWithMetadataSuccess
          ])
          return
        }

        // Get metadata for all items
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'getItems'>, 'input'>} */
        const orderMetadata = {
          url: '/steam/raw',
          body: {
            namespace: 'workshop',
            method: 'getItems',
            args: [itemIds, null],
          },
        };
        const metadataAnswer = await this.ws?.sendAndWaitForResponse(orderMetadata);
        if (metadataAnswer?.body.success === false) {
          throw new Error('Failed to get item metadata')
        }

        // @ts-expect-error - API returns WorkshopItemsResult
        const items = metadataAnswer?.body.data?.items ?? []
        
        // Store items in map and get state/install info for each
        this._workshopItemsMap.clear()
        for (const item of items) {
          if (!item) continue
          const itemId = item.publishedFileId.toString()
          
          // Get state
          /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'state'>, 'input'>} */
          const orderState = {
            url: '/steam/raw',
            body: {
              namespace: 'workshop',
              method: 'state',
              args: [item.publishedFileId],
            },
          };
          const stateAnswer = await this.ws?.sendAndWaitForResponse(orderState);
          const state = stateAnswer?.body.data ?? 0
          
          // Get install info
          /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'installInfo'>, 'input'>} */
          const orderInstall = {
            url: '/steam/raw',
            body: {
              namespace: 'workshop',
              method: 'installInfo',
              args: [item.publishedFileId],
            },
          };
          const installAnswer = await this.ws?.sendAndWaitForResponse(orderInstall);
          const installInfo = installAnswer?.body.data
          
          // Store combined data
          this._workshopItemsMap.set(itemId, {
            ...item,
            state,
            installInfo
          })
        }

        this._GetSubscribedItemsWithMetadataErrorValue = ''
        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnGetSubscribedItemsWithMetadataSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyGetSubscribedItemsWithMetadataSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._GetSubscribedItemsWithMetadataErrorValue = e.message
          this._subscribedItemIds = []
          this._workshopItemsMap.clear()
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetSubscribedItemsWithMetadataError,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetSubscribedItemsWithMetadataError
          ])
        }
      }
    }, this.unsupportedEngine)
    _GetSubscribedItemsWithMetadata = this._GetSubscribedItemsWithMetadataBase
    _GetSubscribedItemsWithMetadataSync = this._GetSubscribedItemsWithMetadataBase

    _DownloadWorkshopItemBase = this.wrap(super._DownloadWorkshopItem, async (
      /** @type {string} */ itemId,
      /** @type {boolean} */ highPriority,
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'download'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'workshop',
            method: 'download',
            args: [itemId, highPriority],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._DownloadWorkshopItemResultValue = answer?.body.data ? 1 : 0
        this._DownloadWorkshopItemErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnDownloadWorkshopItemSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyDownloadWorkshopItemSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._DownloadWorkshopItemErrorValue = e.message
          this._DownloadWorkshopItemResultValue = 0
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnDownloadWorkshopItemError,
            C3.Plugins.pipelabv2.Cnds.OnAnyDownloadWorkshopItemError
          ])
        }
      }
    }, this.unsupportedEngine)
    _DownloadWorkshopItem = this._DownloadWorkshopItemBase
    _DownloadWorkshopItemSync = this._DownloadWorkshopItemBase

    // #region Cnds
    _OnInitializeSuccess = this.wrap(super._OnInitializeSuccess, (/** @type {Tag} */ tag) => {
      return this._currentTag === tag;
    })
    _OnAnyInitializeSuccess = this.wrap(super._OnAnyInitializeSuccess, () => {
      return true
    })
    _OnInitializeError = this.wrap(super._OnInitializeError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyInitializeError = this.wrap(super._OnAnyInitializeError, () => {
      return true
    })
    _OnAppendFileSuccess = this.wrap(super._OnAppendFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyAppendFileSuccess = this.wrap(super._OnAnyAppendFileSuccess, () => {
      return true
    })
    _OnAppendFileError = this.wrap(super._OnAppendFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyAppendFileError = this.wrap(super._OnAnyAppendFileError, () => {
      return true
    })
    _OnCopyFileSuccess = this.wrap(super._OnCopyFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCopyFileSuccess = this.wrap(super._OnAnyCopyFileSuccess, () => {
      return true
    })
    _OnCopyFileError = this.wrap(super._OnCopyFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCopyFileError = this.wrap(super._OnAnyCopyFileError, () => {
      return true
    })
    _OnFetchFileSizeSuccess = this.wrap(super._OnFetchFileSizeSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyFetchFileSizeSuccess = this.wrap(super._OnAnyFetchFileSizeSuccess, () => {
      return true
    })
    _OnFetchFileSizeError = this.wrap(super._OnFetchFileSizeError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyFetchFileSizeError = this.wrap(super._OnAnyFetchFileSizeError, () => {
      return true
    })
    _OnCreateFolderSuccess = this.wrap(super._OnCreateFolderSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCreateFolderSuccess = this.wrap(super._OnAnyCreateFolderSuccess, () => {
      return true
    })
    _OnCreateFolderError = this.wrap(super._OnCreateFolderError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCreateFolderError = this.wrap(super._OnAnyCreateFolderError, () => {
      return true
    })
    _OnDeleteFileSuccess = this.wrap(super._OnDeleteFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyDeleteFileSuccess = this.wrap(super._OnAnyDeleteFileSuccess, () => {
      return true
    })
    _OnDeleteFileError = this.wrap(super._OnDeleteFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyDeleteFileError = this.wrap(super._OnAnyDeleteFileError, () => {
      return true
    })
    _OnListFilesSuccess = this.wrap(super._OnListFilesSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyListFilesSuccess = this.wrap(super._OnAnyListFilesSuccess, () => {
      return true
    })
    _OnListFilesError = this.wrap(super._OnListFilesError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyListFilesError = this.wrap(super._OnAnyListFilesError, () => {
      return true
    })
    _OnMoveFileSuccess = this.wrap(super._OnMoveFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyMoveFileSuccess = this.wrap(super._OnAnyMoveFileSuccess, () => {
      return true
    })
    _OnMoveFileError = this.wrap(super._OnMoveFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyMoveFileError = this.wrap(super._OnAnyMoveFileError, () => {
      return true
    })
    _OnOpenBrowserSuccess = this.wrap(super._OnOpenBrowserSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyOpenBrowserSuccess = this.wrap(super._OnAnyOpenBrowserSuccess, () => {
      return true
    })
    _OnOpenBrowserError = this.wrap(super._OnOpenBrowserError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyOpenBrowserError = this.wrap(super._OnAnyOpenBrowserError, () => {
      return true
    })
    _OnReadBinaryFileSuccess = this.wrap(super._OnReadBinaryFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyReadBinaryFileSuccess = this.wrap(super._OnAnyReadBinaryFileSuccess, () => {
      return true
    })
    _OnReadBinaryFileError = this.wrap(super._OnReadBinaryFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyReadBinaryFileError = this.wrap(super._OnAnyReadBinaryFileError, () => {
      return true
    })
    _OnRenameFileSuccess = this.wrap(super._OnRenameFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyRenameFileSuccess = this.wrap(super._OnAnyRenameFileSuccess, () => {
      return true
    })
    _OnRenameFileError = this.wrap(super._OnRenameFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyRenameFileError = this.wrap(super._OnAnyRenameFileError, () => {
      return true
    })
    _OnRunFileSuccess = this.wrap(super._OnRunFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyRunFileSuccess = this.wrap(super._OnAnyRunFileSuccess, () => {
      return true
    })
    _OnRunFileError = this.wrap(super._OnRunFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyRunFileError = this.wrap(super._OnAnyRunFileError, () => {
      return true
    })
    _OnShellOpenSuccess = this.wrap(super._OnShellOpenSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShellOpenSuccess = this.wrap(super._OnAnyShellOpenSuccess, () => {
      return true
    })
    _OnShellOpenError = this.wrap(super._OnShellOpenError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShellOpenError = this.wrap(super._OnAnyShellOpenError, () => {
      return true
    })
    _OnExplorerOpenSuccess = this.wrap(super._OnExplorerOpenSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyExplorerOpenSuccess = this.wrap(super._OnAnyExplorerOpenSuccess, () => {
      return true
    })
    _OnExplorerOpenError = this.wrap(super._OnExplorerOpenError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyExplorerOpenError = this.wrap(super._OnAnyExplorerOpenError, () => {
      return true
    })
    _OnWriteBinaryFileSuccess = this.wrap(super._OnWriteBinaryFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyWriteBinaryFileSuccess = this.wrap(super._OnAnyWriteBinaryFileSuccess, () => {
      return true
    })
    _OnWriteBinaryFileError = this.wrap(super._OnWriteBinaryFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyWriteBinaryFileError = this.wrap(super._OnAnyWriteBinaryFileError, () => {
      return true
    })
    _OnWriteTextFileSuccess = this.wrap(super._OnWriteTextFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyWriteTextFileSuccess = this.wrap(super._OnAnyWriteTextFileSuccess, () => {
      return true
    })
    _OnWriteTextFileError = this.wrap(super._OnWriteTextFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyWriteTextFileError = this.wrap(super._OnAnyWriteTextFileError, () => {
      return true
    })
    _OnWriteTextSuccess = this.wrap(super._OnWriteTextSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyWriteTextSuccess = this.wrap(super._OnAnyWriteTextSuccess, () => {
      return true
    })
    _OnWriteTextError = this.wrap(super._OnWriteTextError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyWriteTextError = this.wrap(super._OnAnyWriteTextError, () => {
      return true
    })
    _OnReadTextFileSuccess = this.wrap(super._OnReadTextFileSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyReadTextFileSuccess = this.wrap(super._OnAnyReadTextFileSuccess, () => {
      return true
    })
    _OnReadTextFileError = this.wrap(super._OnReadTextFileError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyReadTextFileError = this.wrap(super._OnAnyReadTextFileError, () => {
      return true
    })
    _OnCheckIfPathExistSuccess = this.wrap(super._OnCheckIfPathExistSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCheckIfPathExistSuccess = this.wrap(super._OnAnyCheckIfPathExistSuccess, () => {
      return true
    })
    _OnCheckIfPathExistError = this.wrap(super._OnCheckIfPathExistError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCheckIfPathExistError = this.wrap(super._OnAnyCheckIfPathExistError, () => {
      return true
    })
    _OnShowFolderDialogSuccess = this.wrap(super._OnShowFolderDialogSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShowFolderDialogSuccess = this.wrap(super._OnAnyShowFolderDialogSuccess, () => {
      return true
    })
    _OnShowFolderDialogError = this.wrap(super._OnShowFolderDialogError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShowFolderDialogError = this.wrap(super._OnAnyShowFolderDialogError, () => {
      return true
    })
    _OnShowOpenDialogSuccess = this.wrap(super._OnShowOpenDialogSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShowOpenDialogSuccess = this.wrap(super._OnAnyShowOpenDialogSuccess, () => {
      return true
    })
    _OnShowOpenDialogError = this.wrap(super._OnShowOpenDialogError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShowOpenDialogError = this.wrap(super._OnAnyShowOpenDialogError, () => {
      return true
    })
    _OnShowSaveDialogSuccess = this.wrap(super._OnShowSaveDialogSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShowSaveDialogSuccess = this.wrap(super._OnAnyShowSaveDialogSuccess, () => {
      return true
    })
    _OnShowSaveDialogError = this.wrap(super._OnShowSaveDialogError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShowSaveDialogError = this.wrap(super._OnAnyShowSaveDialogError, () => {
      return true
    })
    _OnMaximizeSuccess = this.wrap(super._OnMaximizeSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyMaximizeSuccess = this.wrap(super._OnAnyMaximizeSuccess, () => {
      return true
    })
    _OnMaximizeError = this.wrap(super._OnMaximizeError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyMaximizeError = this.wrap(super._OnAnyMaximizeError, () => {
      return true
    })
    _OnMinimizeSuccess = this.wrap(super._OnMinimizeSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyMinimizeSuccess = this.wrap(super._OnAnyMinimizeSuccess, () => {
      return true
    })
    _OnMinimizeError = this.wrap(super._OnMinimizeError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyMinimizeError = this.wrap(super._OnAnyMinimizeError, () => {
      return true
    })
    _OnRestoreSuccess = this.wrap(super._OnRestoreSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyRestoreSuccess = this.wrap(super._OnAnyRestoreSuccess, () => {
      return true
    })
    _OnRestoreError = this.wrap(super._OnRestoreError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyRestoreError = this.wrap(super._OnAnyRestoreError, () => {
      return true
    })
    _OnRequestAttentionSuccess = this.wrap(super._OnRequestAttentionSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyRequestAttentionSuccess = this.wrap(super._OnAnyRequestAttentionSuccess, () => {
      return true
    })
    _OnRequestAttentionError = this.wrap(super._OnRequestAttentionError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyRequestAttentionError = this.wrap(super._OnAnyRequestAttentionError, () => {
      return true
    })
    _OnSetAlwaysOnTopSuccess = this.wrap(super._OnSetAlwaysOnTopSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetAlwaysOnTopSuccess = this.wrap(super._OnAnySetAlwaysOnTopSuccess, () => {
      return true
    })
    _OnSetAlwaysOnTopError = this.wrap(super._OnSetAlwaysOnTopError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetAlwaysOnTopError = this.wrap(super._OnAnySetAlwaysOnTopError, () => {
      return true
    })
    _OnSetHeightSuccess = this.wrap(super._OnSetHeightSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetHeightSuccess = this.wrap(super._OnAnySetHeightSuccess, () => {
      return true
    })
    _OnSetHeightError = this.wrap(super._OnSetHeightError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetHeightError = this.wrap(super._OnAnySetHeightError, () => {
      return true
    })
    _OnSetMaximumSizeSuccess = this.wrap(super._OnSetMaximumSizeSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetMaximumSizeSuccess = this.wrap(super._OnAnySetMaximumSizeSuccess, () => {
      return true
    })
    _OnSetMaximumSizeError = this.wrap(super._OnSetMaximumSizeError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetMaximumSizeError = this.wrap(super._OnAnySetMaximumSizeError, () => {
      return true
    })
    _OnSetMinimumSizeSuccess = this.wrap(super._OnSetMinimumSizeSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetMinimumSizeSuccess = this.wrap(super._OnAnySetMinimumSizeSuccess, () => {
      return true
    })
    _OnSetMinimumSizeError = this.wrap(super._OnSetMinimumSizeError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetMinimumSizeError = this.wrap(super._OnAnySetMinimumSizeError, () => {
      return true
    })
    _OnSetResizableSuccess = this.wrap(super._OnSetResizableSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetResizableSuccess = this.wrap(super._OnAnySetResizableSuccess, () => {
      return true
    })
    _OnSetResizableError = this.wrap(super._OnSetResizableError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetResizableError = this.wrap(super._OnAnySetResizableError, () => {
      return true
    })
    _OnSetTitleSuccess = this.wrap(super._OnSetTitleSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetTitleSuccess = this.wrap(super._OnAnySetTitleSuccess, () => {
      return true
    })
    _OnSetTitleError = this.wrap(super._OnSetTitleError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetTitleError = this.wrap(super._OnAnySetTitleError, () => {
      return true
    })
    _OnSetWidthSuccess = this.wrap(super._OnSetWidthSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetWidthSuccess = this.wrap(super._OnAnySetWidthSuccess, () => {
      return true
    })
    _OnSetWidthError = this.wrap(super._OnSetWidthError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetWidthError = this.wrap(super._OnAnySetWidthError, () => {
      return true
    })
    _OnSetXSuccess = this.wrap(super._OnSetXSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetXSuccess = this.wrap(super._OnAnySetXSuccess, () => {
      return true
    })
    _OnSetXError = this.wrap(super._OnSetXError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetXError = this.wrap(super._OnAnySetXError, () => {
      return true
    })
    _OnSetYSuccess = this.wrap(super._OnSetYSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetYSuccess = this.wrap(super._OnAnySetYSuccess, () => {
      return true
    })
    _OnSetYError = this.wrap(super._OnSetYError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetYError = this.wrap(super._OnAnySetYError, () => {
      return true
    })
    _OnShowDevToolsSuccess = this.wrap(super._OnShowDevToolsSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShowDevToolsSuccess = this.wrap(super._OnAnyShowDevToolsSuccess, () => {
      return true
    })
    _OnShowDevToolsError = this.wrap(super._OnShowDevToolsError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyShowDevToolsError = this.wrap(super._OnAnyShowDevToolsError, () => {
      return true
    })
    _OnUnmaximizeSuccess = this.wrap(super._OnUnmaximizeSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyUnmaximizeSuccess = this.wrap(super._OnAnyUnmaximizeSuccess, () => {
      return true
    })
    _OnUnmaximizeError = this.wrap(super._OnUnmaximizeError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyUnmaximizeError = this.wrap(super._OnAnyUnmaximizeError, () => {
      return true
    })
    _OnSetFullscreenSuccess = this.wrap(super._OnSetFullscreenSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetFullscreenSuccess = this.wrap(super._OnAnySetFullscreenSuccess, () => {
      return true
    })
    _OnSetFullscreenError = this.wrap(super._OnSetFullscreenError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetFullscreenError = this.wrap(super._OnAnySetFullscreenError, () => {
      return true
    })

    _OnActivateAchievementSuccess = this.wrap(super._OnActivateAchievementSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyActivateAchievementSuccess = this.wrap(super._OnAnyActivateAchievementSuccess, () => true)
    _OnActivateAchievementError = this.wrap(super._OnActivateAchievementError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyActivateAchievementError = this.wrap(super._OnAnyActivateAchievementError, () => true)

    _OnLeaderboardUploadScoreSuccess = this.wrap(super._OnLeaderboardUploadScoreSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyLeaderboardUploadScoreSuccess = this.wrap(super._OnAnyLeaderboardUploadScoreSuccess, () => true)
    _OnLeaderboardUploadScoreError = this.wrap(super._OnLeaderboardUploadScoreError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyLeaderboardUploadScoreError = this.wrap(super._OnAnyLeaderboardUploadScoreError, () => true)

    _OnLeaderboardDownloadScoreSuccess = this.wrap(super._OnLeaderboardDownloadScoreSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyLeaderboardDownloadScoreSuccess = this.wrap(super._OnAnyLeaderboardDownloadScoreSuccess, () => true)
    _OnLeaderboardDownloadScoreError = this.wrap(super._OnLeaderboardDownloadScoreError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyLeaderboardDownloadScoreError = this.wrap(super._OnAnyLeaderboardDownloadScoreError, () => true)

    _OnLeaderboardUploadScoreWithMetadataSuccess = this.wrap(super._OnLeaderboardUploadScoreWithMetadataSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyLeaderboardUploadScoreWithMetadataSuccess = this.wrap(super._OnAnyLeaderboardUploadScoreWithMetadataSuccess, () => true)
    _OnLeaderboardUploadScoreWithMetadataError = this.wrap(super._OnLeaderboardUploadScoreWithMetadataError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyLeaderboardUploadScoreWithMetadataError = this.wrap(super._OnAnyLeaderboardUploadScoreWithMetadataError, () => true)


    _OnClearAchievementSuccess = this.wrap(super._OnClearAchievementSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyClearAchievementSuccess = this.wrap(super._OnAnyClearAchievementSuccess, () => {
      return true
    })
    _OnClearAchievementError = this.wrap(super._OnClearAchievementError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyClearAchievementError = this.wrap(super._OnAnyClearAchievementError, () => {
      return true
    })
    _OnCheckAchievementActivationStateSuccess = this.wrap(super._OnCheckAchievementActivationStateSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCheckAchievementActivationStateSuccess = this.wrap(super._OnAnyCheckAchievementActivationStateSuccess, () => {
      return true
    })
    _OnCheckAchievementActivationStateError = this.wrap(super._OnCheckAchievementActivationStateError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCheckAchievementActivationStateError = this.wrap(super._OnAnyCheckAchievementActivationStateError, () => {
      return true
    })

    _OnSetRichPresenceSuccess = this.wrap(super._OnSetRichPresenceSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetRichPresenceSuccess = this.wrap(super._OnAnySetRichPresenceSuccess, () => {
      return true
    })
    _OnSetRichPresenceError = this.wrap(super._OnSetRichPresenceError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySetRichPresenceError = this.wrap(super._OnAnySetRichPresenceError, () => {
      return true
    })

    _OnDiscordSetActivitySuccess = this.wrap(super._OnDiscordSetActivitySuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyDiscordSetActivitySuccess = this.wrap(super._OnAnyDiscordSetActivitySuccess, () => {
      return true
    })
    _OnDiscordSetActivityError = this.wrap(super._OnDiscordSetActivityError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyDiscordSetActivityError = this.wrap(super._OnAnyDiscordSetActivityError, () => {
      return true
    })

    _OnActivateToWebPageSuccess = this.wrap(super._OnActivateToWebPageSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyActivateToWebPageSuccess = this.wrap(super._OnAnyActivateToWebPageSuccess, () => true)
    _OnActivateToWebPageError = this.wrap(super._OnActivateToWebPageError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyActivateToWebPageError = this.wrap(super._OnAnyActivateToWebPageError, () => true)

    _OnActivateToStoreSuccess = this.wrap(super._OnActivateToStoreSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyActivateToStoreSuccess = this.wrap(super._OnAnyActivateToStoreSuccess, () => true)
    _OnActivateToStoreError = this.wrap(super._OnActivateToStoreError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyActivateToStoreError = this.wrap(super._OnAnyActivateToStoreError, () => true)

    _OnTriggerScreenshotSuccess = this.wrap(super._OnTriggerScreenshotSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyTriggerScreenshotSuccess = this.wrap(super._OnAnyTriggerScreenshotSuccess, () => true)
    _OnTriggerScreenshotError = this.wrap(super._OnTriggerScreenshotError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyTriggerScreenshotError = this.wrap(super._OnAnyTriggerScreenshotError, () => true)

    _OnCheckDLCIsInstalledSuccess = this.wrap(super._OnCheckDLCIsInstalledSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCheckDLCIsInstalledSuccess = this.wrap(super._OnAnyCheckDLCIsInstalledSuccess, () => true)
    _OnCheckDLCIsInstalledError = this.wrap(super._OnCheckDLCIsInstalledError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCheckDLCIsInstalledError = this.wrap(super._OnAnyCheckDLCIsInstalledError, () => true)

    _OnCreateWorkshopItemSuccess = this.wrap(super._OnCreateWorkshopItemSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCreateWorkshopItemSuccess = this.wrap(super._OnAnyCreateWorkshopItemSuccess, () => true)
    _OnCreateWorkshopItemError = this.wrap(super._OnCreateWorkshopItemError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyCreateWorkshopItemError = this.wrap(super._OnAnyCreateWorkshopItemError, () => true)

    _OnUploadWorkshopItemSuccess = this.wrap(super._OnUploadWorkshopItemSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyUploadWorkshopItemSuccess = this.wrap(super._OnAnyUploadWorkshopItemSuccess, () => true)
    _OnUploadWorkshopItemError = this.wrap(super._OnUploadWorkshopItemError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyUploadWorkshopItemError = this.wrap(super._OnAnyUploadWorkshopItemError, () => true)

    _OnGetSubscribedItemsWithMetadataSuccess = this.wrap(super._OnGetSubscribedItemsWithMetadataSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetSubscribedItemsWithMetadataSuccess = this.wrap(super._OnAnyGetSubscribedItemsWithMetadataSuccess, () => true)
    _OnGetSubscribedItemsWithMetadataError = this.wrap(super._OnGetSubscribedItemsWithMetadataError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetSubscribedItemsWithMetadataError = this.wrap(super._OnAnyGetSubscribedItemsWithMetadataError, () => true)

    _OnDownloadWorkshopItemSuccess = this.wrap(super._OnDownloadWorkshopItemSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyDownloadWorkshopItemSuccess = this.wrap(super._OnAnyDownloadWorkshopItemSuccess, () => true)
    _OnDownloadWorkshopItemError = this.wrap(super._OnDownloadWorkshopItemError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyDownloadWorkshopItemError = this.wrap(super._OnAnyDownloadWorkshopItemError, () => true)

    _IsFullScreen = this.wrap(super._IsFullScreen, (state) => {
      return this._fullscreenState === state
    }, () => false)

    _LastCheckedPathExists = this.wrap(super._LastCheckedPathExists, (state) => {
      return this._CheckIfPathExistErrorValue === ''
    }, () => false)

    _IsInitialized = this.wrap(super._IsInitialized, () => {
      return this._isInitialized
    }, () => false)
    // #endregion

    // #region Exps

    _UserFolder = this.exprs(super._UserFolder, () => {
      return this._userFolder ?? ''
    })

    _HomeFolder = this.exprs(super._HomeFolder, () => {
      return this._homeFolder ?? ''
    })
    _AppDataFolder = this.exprs(super._AppDataFolder, () => {
      return this._appDataFolder ?? ''
    })
    _UserDataFolder = this.exprs(super._UserDataFolder, () => {
      return this._userDataFolder ?? ''
    })
    _LocalAppDataFolder = this.exprs(super._LocalAppDataFolder, () => {
      return this._localAppDataFolder ?? ''
    })
    _LocalUserDataFolder = this.exprs(super._LocalUserDataFolder, () => {
      return this._localUserDataFolder ?? ''
    })
    _SessionDataFolder = this.exprs(super._SessionDataFolder, () => {
      return this._sessionDataFolder ?? ''
    })
    _TempFolder = this.exprs(super._TempFolder, () => {
      return this._tempFolder ?? ''
    })
    _ExeFolder = this.exprs(super._ExeFolder, () => {
      return this._exeFolder ?? ''
    })
    _ModuleFolder = this.exprs(super._ModuleFolder, () => {
      return this._moduleFolder ?? ''
    })
    _DesktopFolder = this.exprs(super._DesktopFolder, () => {
      return this._desktopFolder ?? ''
    })
    _DocumentsFolder = this.exprs(super._DocumentsFolder, () => {
      return this._documentsFolder ?? ''
    })
    _DownloadsFolder = this.exprs(super._DownloadsFolder, () => {
      return this._downloadsFolder ?? ''
    })
    _MusicFolder = this.exprs(super._MusicFolder, () => {
      return this._musicFolder ?? ''
    })
    _PicturesFolder = this.exprs(super._PicturesFolder, () => {
      return this._picturesFolder ?? ''
    })
    _VideosFolder = this.exprs(super._VideosFolder, () => {
      return this._videosFolder ?? ''
    })
    _RecentFolder = this.exprs(super._RecentFolder, () => {
      return this._recentFolder ?? ''
    })
    _LogsFolder = this.exprs(super._LogsFolder, () => {
      return this._logsFolder ?? ''
    })
    _CrashDumpsFolder = this.exprs(super._CrashDumpsFolder, () => {
      return this._crashDumpsFolder ?? ''
    })

    _AppFolder = this.exprs(super._AppFolder, () => {
      return this._appFolder ?? ''
    })

    _AppFolderURL = this.exprs(super._AppFolderURL, () => {
      return 'deprecrated'
    })

    _ArgumentAt = this.exprs(super._ArgumentAt, () => {
      console.error('"_ArgumentAt" Not implemented')
      return ''
    })

    _ArgumentCount = this.exprs(super._ArgumentCount, () => {
      console.error('"_ArgumentCount" Not implemented')
      return -1
    })

    _DroppedFile = this.exprs(super._DroppedFile, () => {
      console.error('"_DroppedFile" Not implemented')
      return ''
    })

    _ListAt = this.exprs(super._ListAt, (index) => {
      return this._ListFilesResultValue[index]?.path ?? ''
    })

    _ListCount = this.exprs(super._ListCount, () => {
      return this._ListFilesResultValue.length
    })

    _ProjectFilesFolder = this.exprs(super._ProjectFilesFolder, () => {
      return this._projectFilesFolder ?? ''
    })

    _ProjectFilesFolderURL = this.exprs(super._ProjectFilesFolderURL, () => {
      return this._projectFilesFolder ?? ''
    })

    _ReadFile = this.exprs(super._ReadFile, () => {
      return this._ReadTextFileResultValue ?? ''
    })

    _WindowHeight = this.exprs(super._WindowHeight, () => {
      return this._windowHeight
    })

    _WindowWidth = this.exprs(super._WindowWidth, () => {
      return this._windowWidth
    })

    _WindowTitle = this.exprs(super._WindowTitle, () => {
      return this._windowTitle
    })

    _WindowX = this.exprs(super._WindowX, () => {
      return this._windowX
    })

    _WindowY = this.exprs(super._WindowY, () => {
      return this._windowY
    })

    _IsEngine = this.exprs(super._IsEngine, (engine) => {
      if (engine === 0 && this._engine === 'electron') return true
      if (engine === 1 && this._engine === 'tauri') return true
      return false
    })

    _LastPathExists = this.exprs(super._LastPathExists, () => {
      return this._lastPathExists
    })

    _FullscreenState = () => {
      return this._fullscreenState
    }

    _CurrentPlatform = this.exprs(super._CurrentPlatform, () => {
      return this._platform
    })
    _CurrentArchitecture = this.exprs(super._CurrentArchitecture, () => {
      return this._arch
    })
    _SteamAccountId = this.exprs(super._SteamAccountId, () => {
      return this._steam_SteamId.accountId
    })
    _SteamId32 = this.exprs(super._SteamId32, () => {
      return this._steam_SteamId.steamId32
    })
    _SteamId64 = this.exprs(super._SteamId64, () => {
      return this._steam_SteamId.steamId64
    })
    _SteamUsername = this.exprs(super._SteamUsername, () => {
      return this._steam_Name
    })
    _SteamLevel = this.exprs(super._SteamLevel, () => {
      return this._steam_Level
    })
    _SteamIpCountry = this.exprs(super._SteamIpCountry, () => {
      return this._steam_IpCountry
    })
    _SteamIsRunningOnSteamDeck = this.exprs(super._SteamIsRunningOnSteamDeck, () => {
      return this._steam_IsRunningOnSteamDeck ? 1 : 0
    })
    _SteamAppId = this.exprs(super._SteamAppId, () => {
      return this._steam_AppId
    })

    _InitializeError = this.exprs(super._InitializeError, () => {
      return this._InitializeErrorValue
    })
    _InitializeResult = this.exprs(super._InitializeResult, () => {
      return this._InitializeResultValue
    })
    _AppendFileError = this.exprs(super._AppendFileError, () => {
      return this._AppendFileErrorValue
    })
    _AppendFileResult = this.exprs(super._AppendFileResult, () => {
      return this._AppendFileResultValue
    })
    _CopyFileError = this.exprs(super._CopyFileError, () => {
      return this._CopyFileErrorValue
    })
    _CopyFileResult = this.exprs(super._CopyFileResult, () => {
      return this._CopyFileResultValue
    })
    _FetchFileSizeError = this.exprs(super._FetchFileSizeError, () => {
      return this._FetchFileSizeErrorValue
    })
    _FetchFileSizeResult = this.exprs(super._FetchFileSizeResult, () => {
      return this._FetchFileSizeResultValue
    })
    _CreateFolderError = this.exprs(super._CreateFolderError, () => {
      return this._CreateFolderErrorValue
    })
    _CreateFolderResult = this.exprs(super._CreateFolderResult, () => {
      return this._CreateFolderResultValue
    })
    _DeleteFileError = this.exprs(super._DeleteFileError, () => {
      return this._DeleteFileErrorValue
    })
    _DeleteFileResult = this.exprs(super._DeleteFileResult, () => {
      return this._DeleteFileResultValue
    })
    _ListFilesError = this.exprs(super._ListFilesError, () => {
      return this._ListFilesErrorValue
    })
    _ListFilesResult = this.exprs(super._ListFilesResult, () => {
      return this._ListFilesResultValue
    })
    _MoveFileError = this.exprs(super._MoveFileError, () => {
      return this._MoveFileErrorValue
    })
    _MoveFileResult = this.exprs(super._MoveFileResult, () => {
      return this._MoveFileResultValue
    })
    _OpenBrowserError = this.exprs(super._OpenBrowserError, () => {
      return this._OpenBrowserErrorValue
    })
    _OpenBrowserResult = this.exprs(super._OpenBrowserResult, () => {
      return this._OpenBrowserResultValue
    })
    _ReadBinaryFileError = this.exprs(super._ReadBinaryFileError, () => {
      return this._ReadBinaryFileErrorValue
    })
    _ReadBinaryFileResult = this.exprs(super._ReadBinaryFileResult, () => {
      return this._ReadBinaryFileResultValue
    })
    _RenameFileError = this.exprs(super._RenameFileError, () => {
      return this._RenameFileErrorValue
    })
    _RenameFileResult = this.exprs(super._RenameFileResult, () => {
      return this._RenameFileResultValue
    })
    _RunFileError = this.exprs(super._RunFileError, () => {
      return this._RunFileErrorValue
    })
    _RunFileResult = this.exprs(super._RunFileResult, () => {
      return this._RunFileResultValue
    })
    _ShellOpenError = this.exprs(super._ShellOpenError, () => {
      return this._ShellOpenErrorValue
    })
    _ShellOpenResult = this.exprs(super._ShellOpenResult, () => {
      return this._ShellOpenResultValue
    })
    _ExplorerOpenError = this.exprs(super._ExplorerOpenError, () => {
      return this._ExplorerOpenErrorValue
    })
    _ExplorerOpenResult = this.exprs(super._ExplorerOpenResult, () => {
      return this._ExplorerOpenResultValue
    })
    _WriteBinaryFileError = this.exprs(super._WriteBinaryFileError, () => {
      return this._WriteBinaryFileErrorValue
    })
    _WriteBinaryFileResult = this.exprs(super._WriteBinaryFileResult, () => {
      return this._WriteBinaryFileResultValue
    })
    _WriteTextFileError = this.exprs(super._WriteTextFileError, () => {
      return this._WriteTextFileErrorValue
    })
    _WriteTextFileResult = this.exprs(super._WriteTextFileResult, () => {
      return this._WriteTextFileResultValue
    })
    _WriteTextError = this.exprs(super._WriteTextError, () => {
      return this._WriteTextErrorValue
    })
    _WriteTextResult = this.exprs(super._WriteTextResult, () => {
      return this._WriteTextResultValue
    })
    _ReadTextFileError = this.exprs(super._ReadTextFileError, () => {
      return this._ReadTextFileErrorValue
    })
    _ReadTextFileResult = this.exprs(super._ReadTextFileResult, () => {
      return this._ReadTextFileResultValue
    })
    _CheckIfPathExistError = this.exprs(super._CheckIfPathExistError, () => {
      return this._CheckIfPathExistErrorValue
    })
    _CheckIfPathExistResult = this.exprs(super._CheckIfPathExistResult, () => {
      return this._CheckIfPathExistResultValue
    })
    _ShowFolderDialogError = this.exprs(super._ShowFolderDialogError, () => {
      return this._ShowFolderDialogErrorValue
    })
    _ShowFolderDialogResult = this.exprs(super._ShowFolderDialogResult, () => {
      return this._ShowFolderDialogResultValue
    })
    _ShowOpenDialogError = this.exprs(super._ShowOpenDialogError, () => {
      return this._ShowOpenDialogErrorValue
    })
    _ShowOpenDialogResult = this.exprs(super._ShowOpenDialogResult, () => {
      return this._ShowOpenDialogResultValue
    })
    _ShowSaveDialogError = this.exprs(super._ShowSaveDialogError, () => {
      return this._ShowSaveDialogErrorValue
    })
    _ShowSaveDialogResult = this.exprs(super._ShowSaveDialogResult, () => {
      return this._ShowSaveDialogResultValue
    })
    _MaximizeError = this.exprs(super._MaximizeError, () => {
      return this._MaximizeErrorValue
    })
    _MaximizeResult = this.exprs(super._MaximizeResult, () => {
      return this._MaximizeResultValue
    })
    _MinimizeError = this.exprs(super._MinimizeError, () => {
      return this._MinimizeErrorValue
    })
    _MinimizeResult = this.exprs(super._MinimizeResult, () => {
      return this._MinimizeResultValue
    })
    _RestoreError = this.exprs(super._RestoreError, () => {
      return this._RestoreErrorValue
    })
    _RestoreResult = this.exprs(super._RestoreResult, () => {
      return this._RestoreResultValue
    })
    _RequestAttentionError = this.exprs(super._RequestAttentionError, () => {
      return this._RequestAttentionErrorValue
    })
    _RequestAttentionResult = this.exprs(super._RequestAttentionResult, () => {
      return this._RequestAttentionResultValue
    })
    _SetAlwaysOnTopError = this.exprs(super._SetAlwaysOnTopError, () => {
      return this._SetAlwaysOnTopErrorValue
    })
    _SetAlwaysOnTopResult = this.exprs(super._SetAlwaysOnTopResult, () => {
      return this._SetAlwaysOnTopResultValue
    })
    _SetHeightError = this.exprs(super._SetHeightError, () => {
      return this._SetHeightErrorValue
    })
    _SetHeightResult = this.exprs(super._SetHeightResult, () => {
      return this._SetHeightResultValue
    })
    _SetMaximumSizeError = this.exprs(super._SetMaximumSizeError, () => {
      return this._SetMaximumSizeErrorValue
    })
    _SetMaximumSizeResult = this.exprs(super._SetMaximumSizeResult, () => {
      return this._SetMaximumSizeResultValue
    })
    _SetMinimumSizeError = this.exprs(super._SetMinimumSizeError, () => {
      return this._SetMinimumSizeErrorValue
    })
    _SetMinimumSizeResult = this.exprs(super._SetMinimumSizeResult, () => {
      return this._SetMinimumSizeResultValue
    })
    _SetResizableError = this.exprs(super._SetResizableError, () => {
      return this._SetResizableErrorValue
    })
    _SetResizableResult = this.exprs(super._SetResizableResult, () => {
      return this._SetResizableResultValue
    })
    _SetTitleError = this.exprs(super._SetTitleError, () => {
      return this._SetTitleErrorValue
    })
    _SetTitleResult = this.exprs(super._SetTitleResult, () => {
      return this._SetTitleResultValue
    })
    _SetWidthError = this.exprs(super._SetWidthError, () => {
      return this._SetWidthErrorValue
    })
    _SetWidthResult = this.exprs(super._SetWidthResult, () => {
      return this._SetWidthResultValue
    })
    _SetXError = this.exprs(super._SetXError, () => {
      return this._SetXErrorValue
    })
    _SetXResult = this.exprs(super._SetXResult, () => {
      return this._SetXResultValue
    })
    _SetYError = this.exprs(super._SetYError, () => {
      return this._SetYErrorValue
    })
    _SetYResult = this.exprs(super._SetYResult, () => {
      return this._SetYResultValue
    })
    _ShowDevToolsError = this.exprs(super._ShowDevToolsError, () => {
      return this._ShowDevToolsErrorValue
    })
    _ShowDevToolsResult = this.exprs(super._ShowDevToolsResult, () => {
      return this._ShowDevToolsResultValue
    })
    _UnmaximizeError = this.exprs(super._UnmaximizeError, () => {
      return this._UnmaximizeErrorValue
    })
    _UnmaximizeResult = this.exprs(super._UnmaximizeResult, () => {
      return this._UnmaximizeResultValue
    })
    _SetFullscreenError = this.exprs(super._SetFullscreenError, () => {
      return this._SetFullscreenErrorValue
    })
    _SetFullscreenResult = this.exprs(super._SetFullscreenResult, () => {
      return this._SetFullscreenResultValue
    })
    _ActivateAchievementError = this.exprs(super._ActivateAchievementError, () => {
      return this._ActivateAchievementErrorValue
    })
    _ActivateAchievementResult = this.exprs(super._ActivateAchievementResult, () => {
      return this._ActivateAchievementResultValue
    })
    _ClearAchievementError = this.exprs(super._ClearAchievementError, () => {
      return this._ClearAchievementErrorValue
    })
    _ClearAchievementResult = this.exprs(super._ClearAchievementResult, () => {
      return this._ClearAchievementResultValue
    })
    _CheckAchievementActivationStateError = this.exprs(super._CheckAchievementActivationStateError, () => {
      return this._CheckAchievementActivationStateErrorValue
    })
    _CheckAchievementActivationStateResult = this.exprs(super._CheckAchievementActivationStateResult, () => {
      return this._CheckAchievementActivationStateResultValue
    })
    _SetRichPresenceError = this.exprs(super._SetRichPresenceError, () => {
      return this._SetRichPresenceErrorValue
    })
    _SetRichPresenceResult = this.exprs(super._SetRichPresenceResult, () => {
      return this._SetRichPresenceResultValue
    })

    _LeaderboardUploadScoreError = this.exprs(super._LeaderboardUploadScoreError, () => {
      return this._LeaderboardUploadScoreErrorValue
    })
    _LeaderboardUploadScoreResult = this.exprs(super._LeaderboardUploadScoreResult, () => {
      return this._LeaderboardUploadScoreResultValue
    })

    _LeaderboardUploadScoreWithMetadataError = this.exprs(super._LeaderboardUploadScoreWithMetadataError, () => {
      return this._LeaderboardUploadScoreWithMetadataErrorValue
    })
    _LeaderboardUploadScoreWithMetadataResult = this.exprs(super._LeaderboardUploadScoreWithMetadataResult, () => {
      return this._LeaderboardUploadScoreWithMetadataResultValue
    })

    _LeaderboardDownloadScoreError = this.exprs(super._LeaderboardDownloadScoreError, () => {
      return this._LeaderboardDownloadScoreErrorValue
    })
    _LeaderboardDownloadScoreResult = this.exprs(super._LeaderboardDownloadScoreResult, () => {
      return this._LeaderboardDownloadScoreResultValue
    })

    _DiscordSetActivityError = this.exprs(super._DiscordSetActivityError, () => {
      return this._DiscordSetActivityErrorValue
    })
    _DiscordSetActivityResult = this.exprs(super._DiscordSetActivityResult, () => {
      return this._DiscordSetActivityResultValue
    })

    _ActivateToWebPageError = this.exprs(super._ActivateToWebPageError, () => {
      return this._ActivateToWebPageErrorValue
    })
    _ActivateToWebPageResult = this.exprs(super._ActivateToWebPageResult, () => {
      return this._ActivateToWebPageResultValue
    })

    _ActivateToStoreError = this.exprs(super._ActivateToStoreError, () => {
      return this._ActivateToStoreErrorValue
    })
    _ActivateToStoreResult = this.exprs(super._ActivateToStoreResult, () => {
      return this._ActivateToStoreResultValue
    })

    _TriggerScreenshotError = this.exprs(super._TriggerScreenshotError, () => {
      return this._TriggerScreenshotErrorValue
    })
    _TriggerScreenshotResult = this.exprs(super._TriggerScreenshotResult, () => {
      return this._TriggerScreenshotResultValue
    })

    _CheckDLCIsInstalledError = this.exprs(super._CheckDLCIsInstalledError, () => {
      return this._CheckDLCIsInstalledErrorValue
    })
    _CheckDLCIsInstalledResult = this.exprs(super._CheckDLCIsInstalledResult, () => {
      return this._CheckDLCIsInstalledResultValue
    })

    // Workshop expressions
    _CreateWorkshopItemError = this.exprs(super._CreateWorkshopItemError, () => {
      return this._CreateWorkshopItemErrorValue
    })
    _CreateWorkshopItemResult = this.exprs(super._CreateWorkshopItemResult, () => {
      return this._CreateWorkshopItemResultValue
    })
    _CreateWorkshopItemNeedsAgreement = this.exprs(super._CreateWorkshopItemNeedsAgreement, () => {
      return this._CreateWorkshopItemNeedsAgreementValue
    })

    _UploadWorkshopItemError = this.exprs(super._UploadWorkshopItemError, () => {
      return this._UploadWorkshopItemErrorValue
    })
    _UploadWorkshopItemResult = this.exprs(super._UploadWorkshopItemResult, () => {
      return this._UploadWorkshopItemResultValue
    })
    _UploadWorkshopItemNeedsAgreement = this.exprs(super._UploadWorkshopItemNeedsAgreement, () => {
      return this._UploadWorkshopItemNeedsAgreementValue
    })

    _GetSubscribedItemsWithMetadataError = this.exprs(super._GetSubscribedItemsWithMetadataError, () => {
      return this._GetSubscribedItemsWithMetadataErrorValue
    })
    _GetSubscribedItemsWithMetadataResult = this.exprs(super._GetSubscribedItemsWithMetadataResult, () => {
      return 1  // Success indicator
    })

    _DownloadWorkshopItemError = this.exprs(super._DownloadWorkshopItemError, () => {
      return this._DownloadWorkshopItemErrorValue
    })
    _DownloadWorkshopItemResult = this.exprs(super._DownloadWorkshopItemResult, () => {
      return this._DownloadWorkshopItemResultValue
    })

    _SubscribedItemsCount = this.exprs(super._SubscribedItemsCount, () => {
      return this._subscribedItemIds.length
    })

    _SubscribedItemIdAt = this.exprs(super._SubscribedItemIdAt, (/** @type {number} */ index) => {
      if (index < 0 || index >= this._subscribedItemIds.length) return ''
      return this._subscribedItemIds[index]
    })

    _WorkshopItemTitle = this.exprs(super._WorkshopItemTitle, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.title ?? ''
    })

    _WorkshopItemDescription = this.exprs(super._WorkshopItemDescription, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.description ?? ''
    })

    _WorkshopItemOwnerSteamId64 = this.exprs(super._WorkshopItemOwnerSteamId64, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.owner?.steamId64?.toString() ?? ''
    })

    _WorkshopItemOwnerAccountId = this.exprs(super._WorkshopItemOwnerAccountId, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.owner?.accountId ?? 0
    })

    _WorkshopItemTags = this.exprs(super._WorkshopItemTags, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.tags?.join(', ') ?? ''
    })

    _WorkshopItemUpvotes = this.exprs(super._WorkshopItemUpvotes, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.numUpvotes ?? 0
    })

    _WorkshopItemDownvotes = this.exprs(super._WorkshopItemDownvotes, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.numDownvotes ?? 0
    })

    _WorkshopItemPreviewUrl = this.exprs(super._WorkshopItemPreviewUrl, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.previewUrl ?? ''
    })

    _WorkshopItemUrl = this.exprs(super._WorkshopItemUrl, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.url ?? ''
    })

    _WorkshopItemTimeCreated = this.exprs(super._WorkshopItemTimeCreated, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.timeCreated ?? 0
    })

    _WorkshopItemTimeUpdated = this.exprs(super._WorkshopItemTimeUpdated, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.timeUpdated ?? 0
    })

    _WorkshopItemState = this.exprs(super._WorkshopItemState, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.state ?? 0
    })

    _WorkshopItemIsInstalled = this.exprs(super._WorkshopItemIsInstalled, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.state && (item.state & 4) ? 1 : 0
    })

    _WorkshopItemIsDownloading = this.exprs(super._WorkshopItemIsDownloading, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.state && (item.state & 16) ? 1 : 0
    })

    _WorkshopItemNeedsUpdate = this.exprs(super._WorkshopItemNeedsUpdate, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.state && (item.state & 8) ? 1 : 0
    })

    _WorkshopItemInstallFolder = this.exprs(super._WorkshopItemInstallFolder, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.installInfo?.folder ?? ''
    })

    _WorkshopItemSizeOnDisk = this.exprs(super._WorkshopItemSizeOnDisk, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return Number(item?.installInfo?.sizeOnDisk ?? 0)
    })

    _WorkshopItemTimestamp = this.exprs(super._WorkshopItemTimestamp, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.installInfo?.timestamp ?? 0
    })

    //

    _saveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    _loadFromJson() {
      // load state for savegames
    }
  };
}

/* REMOVE START */
export {
  getInstanceJs
}
/* REMOVE END */