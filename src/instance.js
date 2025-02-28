// @ts-ignore
// TODO: must use a bundler to support dependencies & typescript
function assertPath(e) { if ("string" != typeof e) throw new TypeError("Path must be a string. Received " + JSON.stringify(e)) } function normalizeStringPosix(e, t) { for (var r, n = "", a = 0, i = -1, o = 0, l = 0; l <= e.length; ++l) { if (l < e.length) r = e.charCodeAt(l); else { if (47 === r) break; r = 47 } if (47 === r) { if (i === l - 1 || 1 === o); else if (i !== l - 1 && 2 === o) { if (n.length < 2 || 2 !== a || 46 !== n.charCodeAt(n.length - 1) || 46 !== n.charCodeAt(n.length - 2)) if (n.length > 2) { var h = n.lastIndexOf("/"); if (h !== n.length - 1) { -1 === h ? (n = "", a = 0) : a = (n = n.slice(0, h)).length - 1 - n.lastIndexOf("/"), i = l, o = 0; continue } } else if (2 === n.length || 1 === n.length) { n = "", a = 0, i = l, o = 0; continue } t && (n.length > 0 ? n += "/.." : n = "..", a = 2) } else n.length > 0 ? n += "/" + e.slice(i + 1, l) : n = e.slice(i + 1, l), a = l - i - 1; i = l, o = 0 } else 46 === r && -1 !== o ? ++o : o = -1 } return n } function _format(e, t) { var r = t.dir || t.root, n = t.base || (t.name || "") + (t.ext || ""); return r ? r === t.root ? r + n : r + e + n : n } var posixPath = { resolve: function () { for (var e, t = "", r = !1, n = arguments.length - 1; n >= -1 && !r; n--) { var a; n >= 0 ? a = arguments[n] : (void 0 === e && (e = process.cwd()), a = e), assertPath(a), 0 !== a.length && (t = a + "/" + t, r = 47 === a.charCodeAt(0)) } return t = normalizeStringPosix(t, !r), r ? t.length > 0 ? "/" + t : "/" : t.length > 0 ? t : "." }, normalize: function (e) { if (assertPath(e), 0 === e.length) return "."; var t = 47 === e.charCodeAt(0), r = 47 === e.charCodeAt(e.length - 1); return 0 !== (e = normalizeStringPosix(e, !t)).length || t || (e = "."), e.length > 0 && r && (e += "/"), t ? "/" + e : e }, isAbsolute: function (e) { return assertPath(e), e.length > 0 && 47 === e.charCodeAt(0) }, join: function () { if (0 === arguments.length) return "."; for (var e, t = 0; t < arguments.length; ++t) { var r = arguments[t]; assertPath(r), r.length > 0 && (void 0 === e ? e = r : e += "/" + r) } return void 0 === e ? "." : posixPath.normalize(e) }, relative: function (e, t) { if (assertPath(e), assertPath(t), e === t) return ""; if ((e = posixPath.resolve(e)) === (t = posixPath.resolve(t))) return ""; for (var r = 1; r < e.length && 47 === e.charCodeAt(r); ++r); for (var n = e.length, a = n - r, i = 1; i < t.length && 47 === t.charCodeAt(i); ++i); for (var o = t.length - i, l = a < o ? a : o, h = -1, s = 0; s <= l; ++s) { if (s === l) { if (o > l) { if (47 === t.charCodeAt(i + s)) return t.slice(i + s + 1); if (0 === s) return t.slice(i + s) } else a > l && (47 === e.charCodeAt(r + s) ? h = s : 0 === s && (h = 0)); break } var f = e.charCodeAt(r + s); if (f !== t.charCodeAt(i + s)) break; 47 === f && (h = s) } var c = ""; for (s = r + h + 1; s <= n; ++s)s !== n && 47 !== e.charCodeAt(s) || (0 === c.length ? c += ".." : c += "/.."); return c.length > 0 ? c + t.slice(i + h) : (i += h, 47 === t.charCodeAt(i) && ++i, t.slice(i)) }, _makeLong: function (e) { return e }, dirname: function (e) { if (assertPath(e), 0 === e.length) return "."; for (var t = e.charCodeAt(0), r = 47 === t, n = -1, a = !0, i = e.length - 1; i >= 1; --i)if (47 === (t = e.charCodeAt(i))) { if (!a) { n = i; break } } else a = !1; return -1 === n ? r ? "/" : "." : r && 1 === n ? "//" : e.slice(0, n) }, basename: function (e, t) { if (void 0 !== t && "string" != typeof t) throw new TypeError('"ext" argument must be a string'); assertPath(e); var r, n = 0, a = -1, i = !0; if (void 0 !== t && t.length > 0 && t.length <= e.length) { if (t.length === e.length && t === e) return ""; var o = t.length - 1, l = -1; for (r = e.length - 1; r >= 0; --r) { var h = e.charCodeAt(r); if (47 === h) { if (!i) { n = r + 1; break } } else -1 === l && (i = !1, l = r + 1), o >= 0 && (h === t.charCodeAt(o) ? -1 == --o && (a = r) : (o = -1, a = l)) } return n === a ? a = l : -1 === a && (a = e.length), e.slice(n, a) } for (r = e.length - 1; r >= 0; --r)if (47 === e.charCodeAt(r)) { if (!i) { n = r + 1; break } } else -1 === a && (i = !1, a = r + 1); return -1 === a ? "" : e.slice(n, a) }, extname: function (e) { assertPath(e); for (var t = -1, r = 0, n = -1, a = !0, i = 0, o = e.length - 1; o >= 0; --o) { var l = e.charCodeAt(o); if (47 !== l) -1 === n && (a = !1, n = o + 1), 46 === l ? -1 === t ? t = o : 1 !== i && (i = 1) : -1 !== t && (i = -1); else if (!a) { r = o + 1; break } } return -1 === t || -1 === n || 0 === i || 1 === i && t === n - 1 && t === r + 1 ? "" : e.slice(t, n) }, format: function (e) { if (null === e || "object" != typeof e) throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e); return _format("/", e) }, parse: function (e) { assertPath(e); var t = { root: "", dir: "", base: "", ext: "", name: "" }; if (0 === e.length) return t; var r, n = e.charCodeAt(0), a = 47 === n; a ? (t.root = "/", r = 1) : r = 0; for (var i = -1, o = 0, l = -1, h = !0, s = e.length - 1, f = 0; s >= r; --s)if (47 !== (n = e.charCodeAt(s))) -1 === l && (h = !1, l = s + 1), 46 === n ? -1 === i ? i = s : 1 !== f && (f = 1) : -1 !== i && (f = -1); else if (!h) { o = s + 1; break } return -1 === i || -1 === l || 0 === f || 1 === f && i === l - 1 && i === o + 1 ? -1 !== l && (t.base = t.name = 0 === o && a ? e.slice(1, l) : e.slice(o, l)) : (0 === o && a ? (t.name = e.slice(1, i), t.base = e.slice(1, l)) : (t.name = e.slice(o, i), t.base = e.slice(o, l)), t.ext = e.slice(i, l)), o > 0 ? t.dir = e.slice(0, o - 1) : a && (t.dir = "/"), t }, sep: "/", delimiter: ":", win32: null, posix: null };

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
    return new Promise((resolve, reject) => {
      // console.log('trying to connect')
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        // console.log('Connected to WebSocket');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        if (this.socket) {
          return resolve(this.socket);
        }
        return reject(new Error('WebSocket is undefined'));
      };

      this.socket.onmessage = (event) => {
        // console.log('Received message:', event.data);
        const parsedData = JSON.parse(event.data);
        // Assuming the server sends a 'correlationId' with every message
        if (parsedData.correlationId && this.responseResolvers.has(parsedData.correlationId)) {
          const resolver = this.responseResolvers.get(parsedData.correlationId);
          resolver?.(parsedData);
          this.responseResolvers.delete(parsedData.correlationId);
        } else if (parsedData.url) {
          console.log('parsedData', parsedData)
          // Propagate the message to listeners
          this.#propagateMessage(parsedData);
        } else {
          console.error('unhandled message', parsedData);
        }
        // Handle other incoming messages if needed
      };

      this.socket.onclose = () => {
        // console.log('WebSocket connection closed');
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
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      try {
        await new Promise(resolve => setTimeout(resolve, this.reconnectInterval));
        await this.connect();
      } catch (error) {
        console.error('Reconnection attempt failed:', error);
      }
    } else {
      console.log('Max reconnect attempts reached. Giving up.');
    }
  }

  /**
   * Sends a message to the WebSocket server.
   * @param {import("@pipelab/core").Message} message - The message to send.
   */
  send(message) {
    if (this.isConnected) {
      if (this.socket) {
        this.socket.send(JSON.stringify(message));
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
    this.socket.send(JSON.stringify(message));
    const result = await responsePromise;
    if (result.body.error) {
      throw new Error(result.body.error)
    } else {
      console.log('result', result)
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
    console.log('this.listeners', this.listeners)
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

export const fullscreenC3StateToPipelabState = (/** @type {import("./sdk.js").IsFullScreenState} */ state) => {
  switch (state) {
    case 0:
      return 'normal';
    case 1:
      return 'fullscreen';
    default:
      return 'normal';
  }
};

export const fullscreenPipelabStateToC3State = (/** @type {import('@pipelab/core').FullscreenStates} */ state) => {
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
  steamId64: BigInt(-1),
}

/**
 * @typedef {string | undefined} Tag
 */

/** @type {import('./sdk.js').GetInstanceJSFn} */
export function getInstanceJs(parentClass, addonTriggers, C3) {
  // @ts-ignore
  return class Pipelab extends parentClass {
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

    /** @type {string} */
    _fileError = '';

    /** @type {number} */
    _fileSize = 0;

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

    /** @type {import('@pipelab/core').NamespacedFunctionReturnType<'localplayer', 'getSteamId'>} */
    _steam_SteamId = defaultSteamId
    /** @type {import('@pipelab/core').NamespacedFunctionReturnType<'localplayer', 'getName'>} */
    _steam_Name = ""
    /** @type {import('@pipelab/core').NamespacedFunctionReturnType<'localplayer', 'getLevel'>} */
    _steam_Level = -1
    /** @type {import('@pipelab/core').NamespacedFunctionReturnType<'localplayer', 'getIpCountry'>} */
    _steam_IpCountry = ''

    /** @type {string} */
    _platform = ''
    /** @type {string} */
    _arch = ''

    /** @type {string} */
    _ListFilesErrorValue = ''
    /** @type {import("@pipelab/core").FileFolder[]} */
    _ListFilesResultValue = []

    /**
     * Description
     * @param {ISDKInstanceBase_} inst
     * @param {any} _properties
     */
    constructor(inst, _properties) {
      let dummyInst = undefined
      if (sdk === 'v1') {
        dummyInst = inst
      }
      super(inst);

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
        this._trigger = this.Trigger;
      }
    }

    async unsupportedEngine() {
      console.warn(`Unable to execute action: unsupported engine`)
    }

    /**
     * @param {Tag} tag
     * @param {[import("./sdk.js").OpaqueCnds, import("./sdk.js").OpaqueCnds]} fns
     */
    async trigger(tag, fns) {
      // fns[0] = with tag
      // fns[!] = without tag
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
   * @returns {T}
   */
    wrap(base, callback, fallback, force) {
      // @ts-expect-error
      return (/** @type {Parameters<T>} */ ...args) => {
        // console.log('this._isInitialized', this._isInitialized)
        // is initialized
        if (this._isInitialized) {
          // and is connected to an engine
          // console.log('this.ws?.isConnected', this.ws?.isConnected)
          if (this.ws?.isConnected) {
            // execute callback
            return callback.call(this, ...args);
          } else {
            // console.log('else 1')
            // do nothing (web, nwjs, unsupported, ...)
            return fallback
              ? fallback.call(this, ...args)
              : callback.call(this, ...args);
          }
        } else if (force) {
          // console.log('force')
          return callback.call(this, ...args);
        } else {
          // console.log('else 2')
          return fallback
            ? fallback.call(this, ...args)
            : callback.call(this, ...args);
        }
      }
    }

    // Acts

    _InitializeBase = this.wrap(super._Initialize, async (/** @type {Tag} */ tag) => {
      console.log('tag', tag)
      // Initialize the WebSocket connection
      // console.log('on instance created');

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
      // Handle through runtimz
      this.ws.on('/window/fullscreen-state', async (/** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').FullscreenState, 'input'>} */ data) => {
        this._fullscreenState = fullscreenPipelabStateToC3State(data.body.state)
      })
      // Handle native
      document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
          this._fullscreenState = 1
        } else {
          this._fullscreenState = 0
        }
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
      // promises.push(async () => {
      //   /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'localplayer', 'getSteamId'>, 'input'>} */
      //   const order = {
      //     url: '/steam/raw',
      //     body: {
      //       namespace: 'localplayer',
      //       method: 'getSteamId',
      //       args: [],
      //     },
      //   };
      //   const response = await this.ws?.sendAndWaitForResponse(order);
      //   this._steam_SteamId = response?.body.data ?? defaultSteamId
      // })

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
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageInfos, 'input'>} */
        const order = {
          url: '/infos',
          body: {},
        };
        const response = await this.ws?.sendAndWaitForResponse(order);
        this._platform = response?.body.platform ?? "";
        this._arch = response?.body.arch ?? "";
      })

      await Promise.all(promises.map(x => x()))

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
        // console.log('engineResponse', engineResponse.body.engine)
        this._engine = engineResponse.body.engine
      }

      this._isInitialized = true

      await this.trigger(tag, [
        C3.Plugins.pipelab.Cnds.OnInitializeSuccess,
        C3.Plugins.pipelab.Cnds.OnAnyInitializeSuccess
      ])

      // console.log('this', this)
    }, this.unsupportedEngine, true)
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
          C3.Plugins.pipelab.Cnds.OnWriteTextFileSuccess,
          C3.Plugins.pipelab.Cnds.OnAnyWriteTextFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._WriteTextFileErrorValue = e.message
          this._WriteTextFileResultValue = false
          await this.trigger(tag, [
            C3.Plugins.pipelab.Cnds.OnWriteTextFileSuccess,
            C3.Plugins.pipelab.Cnds.OnAnyWriteTextFileSuccess,
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
        // console.log('this', this)
        if (answer?.body.success === true) {
          this._ReadTextFileResultValue = answer?.body.content
        }
        this._ReadTextFileErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelab.Cnds.OnReadTextFileSuccess,
          C3.Plugins.pipelab.Cnds.OnAnyReadTextFileSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ReadTextFileErrorValue = e.message
          this._ReadTextFileResultValue = false
          await this.trigger(tag, [
            C3.Plugins.pipelab.Cnds.OnReadTextFileSuccess,
            C3.Plugins.pipelab.Cnds.OnAnyReadTextFileSuccess,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ReadTextFile = this._ReadTextFileBase
    _ReadTextFileSync = this._ReadTextFileBase

    _CheckIfPathExistBase = this.wrap(super._CheckIfPathExist, async (/** @type {string} */ path) => {
      // console.log('Read text', path);

      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageExistFile, 'input'>} */
      const order = {
        url: '/fs/exist',
        body: {
          path,
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
      this._lastPathExists = answer?.body.success ?? false
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
      // console.log('mode', mode)
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
      // Do native fullscreen if in preview mode and not connected to a runtime
      console.log('toggle', toggle)
      if (this.runtime.platformInfo.exportType === 'preview') {
        if (toggle === 1) {
          document.documentElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
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

    _ShowFolderDialogBase = this.wrap(super._ShowFolderDialog, async () => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageShowFolderDialog, 'input'>} */
      const order = {
        url: '/dialog/folder',
      }

      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageShowFolderDialog, 'output'> | undefined} */
      // @ts-expect-error
      const answer = await this.ws?.sendAndWaitForResponse(order)
      // console.log('answer', answer)

      // console.log('C3', C3)
      // console.log('this', this)

      if (!answer) {
        await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnFolderDialogCancel)
        return
      }

      if (answer.body.canceled) {
        await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnFolderDialogCancel)
      } else {
        this._chosenPath = answer.body.paths[0]
        await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnFolderDialogOk)
      }

    }, this.unsupportedEngine)
    _ShowFolderDialog = this._ShowFolderDialogBase
    _ShowFolderDialogSync = this._ShowFolderDialogBase

    _ShowOpenDialogBase = this.wrap(super._ShowOpenDialog, async (/** @type {string} */ accept) => {
      // console.log('accept', accept)
      /**
       * @type {import('@pipelab/core').FileFilter[]}
       */
      const filters = accept.split(',')
        .map(filter => {
          // console.log('filter', filter)
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

      // console.log('filters', filters)

      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageShowOpenDialog, 'input'>} */
      const order = {
        url: '/dialog/open',
        body: {
          filters
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)

      if (!answer) {
        await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnOpenDialogCancel)
        return
      }

      if (answer.body.canceled) {
        await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnOpenDialogCancel)
      } else {
        this._chosenPath = answer.body.paths[0]
        await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnOpenDialogOk)
      }
    }, this.unsupportedEngine)
    _ShowOpenDialog = this._ShowOpenDialogBase
    _ShowOpenDialogSync = this._ShowOpenDialogBase

    _ShowSaveDialogBase = this.wrap(super._ShowSaveDialog, async (/** @type {string} */ accept) => {
      /**
       * @type {import('@pipelab/core').FileFilter[]}
       */
      const filters = accept.split(',')
        .map(filter => {
          // console.log('filter', filter)
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

      if (!answer) {
        await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnSaveDialogCancel)
        return
      }

      if (answer.body.canceled) {
        await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnSaveDialogCancel)
      } else {
        this._chosenPath = answer.body.path
        await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnSaveDialogOk)
      }
    }, this.unsupportedEngine)
    _ShowSaveDialog = this._ShowSaveDialogBase
    _ShowSaveDialogSync = this._ShowSaveDialogBase

    _AppendFileBase = this.wrap(super._AppendFile, async (/** @type {string} */ path, /** @type {string} */ contents) => {
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
      const result = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _AppendFile = this._AppendFileBase
    _AppendFileSync = this._AppendFileBase

    _CopyFileBase = this.wrap(super._CopyFile, async (/** @type {string} */ source, /** @type {string} */ destination, /** @type {boolean} */ overwrite) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageCopyFile, 'input'>} */
      const order = {
        url: '/fs/copy',
        body: {
          source,
          destination,
          overwrite
        }
      }
      const result = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _CopyFile = this._CopyFileBase
    _CopyFileSync = this._CopyFileBase

    _CreateFolderBase = this.wrap(super._CreateFolder, async (/** @type {string} */ path) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageCreateFolder, 'input'>} */
      const order = {
        url: '/fs/folder/create',
        body: {
          path
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
      // if (!answer || answer.body.success === false) {
      //   this.Trigger(C3.Plugins.pipelab.Cnds.OnAnyBinaryFileRead)
      // }
    }, this.unsupportedEngine)
    _CreateFolder = this._CreateFolderBase
    _CreateFolderSync = this._CreateFolderBase

    _DeleteFileBase = this.wrap(super._DeleteFile, async (/** @type {string} */ path, /** @type {boolean} */ recursive) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageDelete, 'input'>} */
      const order = {
        url: '/fs/delete',
        body: {
          path,
          recursive
        }
      }
      const result = await this.ws?.sendAndWaitForResponse(order)
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

        if (files) {
          this._ListFilesResultValue = files.body.list
          this._ListFilesErrorValue = ''
        }
        this.trigger(tag, [
          C3.Plugins.pipelab.Cnds.OnListFilesSuccess,
          C3.Plugins.pipelab.Cnds.OnAnyListFilesSuccess,
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._ListFilesErrorValue = e.message
          this._ListFilesResultValue = []
          this.trigger(tag, [
            C3.Plugins.pipelab.Cnds.OnListFilesError,
            C3.Plugins.pipelab.Cnds.OnAnyListFilesError,
          ])
        }
        console.error(e)
      }
    }, this.unsupportedEngine)
    _ListFiles = this._ListFilesBase
    _ListFilesSync = this._ListFilesBase

    _MoveFileBase = this.wrap(super._MoveFile, async (/** @type {string} */ source, /** @type {string} */ destination, /** @type {boolean} */ overwrite) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageMove, 'input'>} */
      const order = {
        url: '/fs/move',
        body: {
          source,
          destination,
          overwrite
        }
      }
      const result = await this.ws?.sendAndWaitForResponse(order)
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
      // console.log('Read text', path);

      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageReadFileBinary, 'input'>} */
      const order = {
        url: '/fs/file/read/binary',
        body: {
          path,
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
      // console.log('answer', answer)

      const sdkInst = this.__GetBinaryDataSdkInstance(destination);

      if (!sdkInst) {
        throw new Error("SDK instance not found")
      }
      // console.log('sdkInst', sdkInst)
      const newBuffer = new Uint8Array(answer?.body.content ?? [])
      // console.log('newBuffer', newBuffer)
      sdkInst.setArrayBufferCopy(newBuffer.buffer);
      // console.log("getArrayBufferCopy()", sdkInst.getArrayBufferCopy())

      // console.log('addonTriggers', addonTriggers)
      // console.log('this', this)

      if (tag) {
        this._currentTag = tag;
      }
      await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnAnyBinaryFileRead)
      await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnBinaryFileRead)
      this._currentTag = ''

    }, this.unsupportedEngine)
    _ReadBinaryFile = this._ReadBinaryFileBase
    _ReadBinaryFileSync = this._ReadBinaryFileBase

    _RenameFileBase = this.wrap(super._RenameFile, async (/** @type {string} */ source, /** @type {string} */ newFileName, /** @type {boolean} */ overwrite) => {
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
      const result = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _RenameFile = this._RenameFileBase
    _RenameFileSync = this._RenameFileBase

    _RunFileBase = this.wrap(super._RunFile, async (/** @type {string} */ command) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageRun, 'input'>} */
      const order = {
        url: '/run',
        body: {
          command,
          args: [],
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _RunFile = this._RunFileBase
    _RunFileSync = this._RunFileBase

    _ShellOpenBase = this.wrap(super._ShellOpen, async (/** @type {string} */ path) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageOpen, 'input'>} */
      const order = {
        url: '/open',
        body: {
          path,
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _ShellOpen = this._ShellOpenBase
    _ShellOpenSync = this._ShellOpenBase

    _ExplorerOpenBase = this.wrap(super._ExplorerOpen, async (/** @type {string} */ path) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageExplorerOpen, 'input'>} */
      const order = {
        url: '/show-in-explorer',
        body: {
          path,
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)
    _ExplorerOpen = this._ExplorerOpenBase
    _ExplorerOpenSync = this._ExplorerOpenBase

    /**
     * @param {IObjectClass<IInstance>} objectClass
     * @return {IBinaryDataInstance | null} objectClass
     */
    __GetBinaryDataSdkInstance(objectClass) {
      // console.log('this._inst', this._inst)
      if (!objectClass)
        return null;
      // @ts-expect-error
      const target = objectClass.getFirstPickedInstance(this._inst);
      // console.log('target', target)
      if (!target)
        return null;
      // return target.GetSdkInstance()
      // @ts-expect-error
      return target
    }

    _WriteBinaryFileBase = this.wrap(super._WriteBinaryFile, async (/** @type {string} */ path, /** @type {string} */ source) => {
      throw new Error('not supported')
      // console.log('tag', tag)
      // console.log('path', path)
      // console.log('source', source)

      // console.log('C3', C3)
      // console.log('this', this)

      // const sdkInst = this.__GetBinaryDataSdkInstance(source);

      // if (!sdkInst) {
      //   throw new Error("SDK instance not found")
      // }

      // // console.log('sdkInst', sdkInst)

      // const buffer = sdkInst.getArrayBufferReadOnly();

      // // console.log('buffer', buffer)

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
      //   await this.TriggerAsync(C3.Plugins.pipelab.Cnds.OnAnyBinaryFileRead)
      //   this._currentTag = tag;
      //   await this.TriggerAsync(C3.Plugins.pipelab.Cnds.OnBinaryFileRead)
      //   this._currentTag = ''
      // }
    }, this.unsupportedEngine)
    _WriteBinaryFile = this._WriteBinaryFileBase
    _WriteBinaryFileSync = this._WriteBinaryFileBase

    _FetchFileSizeBase = this.wrap(super._FetchFileSize, async (/** @type {string} */ path) => {
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
      // console.log('answer', answer)
      this._fileSize = answer?.body.size ?? -1
    })
    _FetchFileSize = this._FetchFileSizeBase
    _FetchFileSizeSync = this._FetchFileSizeBase

    _ActivateAchievementBase = this.wrap(super._ActivateAchievement, async (/** @type {string} */ achievement, /** @type {Tag} */ tag) => {
      console.log('tag', tag)
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
        await this.ws?.sendAndWaitForResponse(order);
        await this.trigger(tag, [
          C3.Plugins.pipelab.Cnds.OnActivateAchievementSuccess,
          C3.Plugins.pipelab.Cnds.OnAnyActivateAchievementSuccess
        ])
      } catch (e) {
        await this.trigger(tag, [
          C3.Plugins.pipelab.Cnds.OnActivateAchievementError,
          C3.Plugins.pipelab.Cnds.OnAnyActivateAchievementError
        ])
      }
    }, this.unsupportedEngine)
    _ActivateAchievement = this._ActivateAchievementBase
    _ActivateAchievementSync = this._ActivateAchievementBase

    _ClearAchievementBase = this.wrap(super._ClearAchievement, async (/** @type {string} */ achievement) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'achievement', 'clear'>, 'input'>} */
      const order = {
        url: '/steam/raw',
        body: {
          namespace: 'achievement',
          method: 'clear',
          args: [achievement],
        },
      };
      await this.ws?.sendAndWaitForResponse(order);
    }, this.unsupportedEngine)
    _ClearAchievement = this._ClearAchievementBase
    _ClearAchievementSync = this._ClearAchievementBase

    _CheckAchievementActivationStateBase = this.wrap(super._CheckAchievementActivationState, async (/** @type {string} */ achievement) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'achievement', 'isActivated'>, 'input'>} */
      const order = {
        url: '/steam/raw',
        body: {
          namespace: 'achievement',
          method: 'isActivated',
          args: [achievement],
        },
      };

      const response = await this.ws?.sendAndWaitForResponse(order);
      const data = response?.body.data

      return data ?? false;
    }, () => false)
    _CheckAchievementActivationState = this._CheckAchievementActivationStateBase
    _CheckAchievementActivationStateSync = this._CheckAchievementActivationStateBase

    _SetRichPresenceBase = this.wrap(super._SetRichPresence, async (/** @type {string} */ key, /** @type {string} */ value) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'localplayer', 'setRichPresence'>, 'input'>} */
      const order = {
        url: '/steam/raw',
        body: {
          namespace: 'localplayer',
          method: 'setRichPresence',
          args: [key, value],
        },
      };
      await this.ws?.sendAndWaitForResponse(order);
    }, this.unsupportedEngine)
    _SetRichPresence = this._SetRichPresenceBase
    _SetRichPresenceSync = this._SetRichPresenceBase

    // #region Cnds
    _OnInitializeSuccess = this.wrap(super._OnInitializeSuccess, () => {
      return true
    })
    _OnAnyInitializeSuccess = this.wrap(super._OnAnyInitializeSuccess, () => {
      return true
    })
    _OnInitializeError = this.wrap(super._OnInitializeError, () => {
      return true
    })
    _OnAnyInitializeError = this.wrap(super._OnAnyInitializeError, () => {
      return true
    })
    _OnAppendFileSuccess = this.wrap(super._OnAppendFileSuccess, () => {
      return true
    })
    _OnAnyAppendFileSuccess = this.wrap(super._OnAnyAppendFileSuccess, () => {
      return true
    })
    _OnAppendFileError = this.wrap(super._OnAppendFileError, () => {
      return true
    })
    _OnAnyAppendFileError = this.wrap(super._OnAnyAppendFileError, () => {
      return true
    })
    _OnCopyFileSuccess = this.wrap(super._OnCopyFileSuccess, () => {
      return true
    })
    _OnAnyCopyFileSuccess = this.wrap(super._OnAnyCopyFileSuccess, () => {
      return true
    })
    _OnCopyFileError = this.wrap(super._OnCopyFileError, () => {
      return true
    })
    _OnAnyCopyFileError = this.wrap(super._OnAnyCopyFileError, () => {
      return true
    })
    _OnFetchFileSizeSuccess = this.wrap(super._OnFetchFileSizeSuccess, () => {
      return true
    })
    _OnAnyFetchFileSizeSuccess = this.wrap(super._OnAnyFetchFileSizeSuccess, () => {
      return true
    })
    _OnFetchFileSizeError = this.wrap(super._OnFetchFileSizeError, () => {
      return true
    })
    _OnAnyFetchFileSizeError = this.wrap(super._OnAnyFetchFileSizeError, () => {
      return true
    })
    _OnCreateFolderSuccess = this.wrap(super._OnCreateFolderSuccess, () => {
      return true
    })
    _OnAnyCreateFolderSuccess = this.wrap(super._OnAnyCreateFolderSuccess, () => {
      return true
    })
    _OnCreateFolderError = this.wrap(super._OnCreateFolderError, () => {
      return true
    })
    _OnAnyCreateFolderError = this.wrap(super._OnAnyCreateFolderError, () => {
      return true
    })
    _OnDeleteFileSuccess = this.wrap(super._OnDeleteFileSuccess, () => {
      return true
    })
    _OnAnyDeleteFileSuccess = this.wrap(super._OnAnyDeleteFileSuccess, () => {
      return true
    })
    _OnDeleteFileError = this.wrap(super._OnDeleteFileError, () => {
      return true
    })
    _OnAnyDeleteFileError = this.wrap(super._OnAnyDeleteFileError, () => {
      return true
    })
    _OnListFilesSuccess = this.wrap(super._OnListFilesSuccess, () => {
      return true
    })
    _OnAnyListFilesSuccess = this.wrap(super._OnAnyListFilesSuccess, () => {
      return true
    })
    _OnListFilesError = this.wrap(super._OnListFilesError, () => {
      return true
    })
    _OnAnyListFilesError = this.wrap(super._OnAnyListFilesError, () => {
      return true
    })
    _OnMoveFileSuccess = this.wrap(super._OnMoveFileSuccess, () => {
      return true
    })
    _OnAnyMoveFileSuccess = this.wrap(super._OnAnyMoveFileSuccess, () => {
      return true
    })
    _OnMoveFileError = this.wrap(super._OnMoveFileError, () => {
      return true
    })
    _OnAnyMoveFileError = this.wrap(super._OnAnyMoveFileError, () => {
      return true
    })
    _OnOpenBrowserSuccess = this.wrap(super._OnOpenBrowserSuccess, () => {
      return true
    })
    _OnAnyOpenBrowserSuccess = this.wrap(super._OnAnyOpenBrowserSuccess, () => {
      return true
    })
    _OnOpenBrowserError = this.wrap(super._OnOpenBrowserError, () => {
      return true
    })
    _OnAnyOpenBrowserError = this.wrap(super._OnAnyOpenBrowserError, () => {
      return true
    })
    _OnReadBinaryFileSuccess = this.wrap(super._OnReadBinaryFileSuccess, () => {
      return true
    })
    _OnAnyReadBinaryFileSuccess = this.wrap(super._OnAnyReadBinaryFileSuccess, () => {
      return true
    })
    _OnReadBinaryFileError = this.wrap(super._OnReadBinaryFileError, () => {
      return true
    })
    _OnAnyReadBinaryFileError = this.wrap(super._OnAnyReadBinaryFileError, () => {
      return true
    })
    _OnRenameFileSuccess = this.wrap(super._OnRenameFileSuccess, () => {
      return true
    })
    _OnAnyRenameFileSuccess = this.wrap(super._OnAnyRenameFileSuccess, () => {
      return true
    })
    _OnRenameFileError = this.wrap(super._OnRenameFileError, () => {
      return true
    })
    _OnAnyRenameFileError = this.wrap(super._OnAnyRenameFileError, () => {
      return true
    })
    _OnRunFileSuccess = this.wrap(super._OnRunFileSuccess, () => {
      return true
    })
    _OnAnyRunFileSuccess = this.wrap(super._OnAnyRunFileSuccess, () => {
      return true
    })
    _OnRunFileError = this.wrap(super._OnRunFileError, () => {
      return true
    })
    _OnAnyRunFileError = this.wrap(super._OnAnyRunFileError, () => {
      return true
    })
    _OnShellOpenSuccess = this.wrap(super._OnShellOpenSuccess, () => {
      return true
    })
    _OnAnyShellOpenSuccess = this.wrap(super._OnAnyShellOpenSuccess, () => {
      return true
    })
    _OnShellOpenError = this.wrap(super._OnShellOpenError, () => {
      return true
    })
    _OnAnyShellOpenError = this.wrap(super._OnAnyShellOpenError, () => {
      return true
    })
    _OnExplorerOpenSuccess = this.wrap(super._OnExplorerOpenSuccess, () => {
      return true
    })
    _OnAnyExplorerOpenSuccess = this.wrap(super._OnAnyExplorerOpenSuccess, () => {
      return true
    })
    _OnExplorerOpenError = this.wrap(super._OnExplorerOpenError, () => {
      return true
    })
    _OnAnyExplorerOpenError = this.wrap(super._OnAnyExplorerOpenError, () => {
      return true
    })
    _OnWriteBinaryFileSuccess = this.wrap(super._OnWriteBinaryFileSuccess, () => {
      return true
    })
    _OnAnyWriteBinaryFileSuccess = this.wrap(super._OnAnyWriteBinaryFileSuccess, () => {
      return true
    })
    _OnWriteBinaryFileError = this.wrap(super._OnWriteBinaryFileError, () => {
      return true
    })
    _OnAnyWriteBinaryFileError = this.wrap(super._OnAnyWriteBinaryFileError, () => {
      return true
    })
    _OnWriteTextFileSuccess = this.wrap(super._OnWriteTextFileSuccess, () => {
      return true
    })
    _OnAnyWriteTextFileSuccess = this.wrap(super._OnAnyWriteTextFileSuccess, () => {
      return true
    })
    _OnWriteTextFileError = this.wrap(super._OnWriteTextFileError, () => {
      return true
    })
    _OnAnyWriteTextFileError = this.wrap(super._OnAnyWriteTextFileError, () => {
      return true
    })
    _OnWriteTextSuccess = this.wrap(super._OnWriteTextSuccess, () => {
      return true
    })
    _OnAnyWriteTextSuccess = this.wrap(super._OnAnyWriteTextSuccess, () => {
      return true
    })
    _OnWriteTextError = this.wrap(super._OnWriteTextError, () => {
      return true
    })
    _OnAnyWriteTextError = this.wrap(super._OnAnyWriteTextError, () => {
      return true
    })
    _OnReadTextFileSuccess = this.wrap(super._OnReadTextFileSuccess, () => {
      return true
    })
    _OnAnyReadTextFileSuccess = this.wrap(super._OnAnyReadTextFileSuccess, () => {
      return true
    })
    _OnReadTextFileError = this.wrap(super._OnReadTextFileError, () => {
      return true
    })
    _OnAnyReadTextFileError = this.wrap(super._OnAnyReadTextFileError, () => {
      return true
    })
    _OnCheckIfPathExistSuccess = this.wrap(super._OnCheckIfPathExistSuccess, () => {
      return true
    })
    _OnAnyCheckIfPathExistSuccess = this.wrap(super._OnAnyCheckIfPathExistSuccess, () => {
      return true
    })
    _OnCheckIfPathExistError = this.wrap(super._OnCheckIfPathExistError, () => {
      return true
    })
    _OnAnyCheckIfPathExistError = this.wrap(super._OnAnyCheckIfPathExistError, () => {
      return true
    })
    _OnShowFolderDialogSuccess = this.wrap(super._OnShowFolderDialogSuccess, () => {
      return true
    })
    _OnAnyShowFolderDialogSuccess = this.wrap(super._OnAnyShowFolderDialogSuccess, () => {
      return true
    })
    _OnShowFolderDialogError = this.wrap(super._OnShowFolderDialogError, () => {
      return true
    })
    _OnAnyShowFolderDialogError = this.wrap(super._OnAnyShowFolderDialogError, () => {
      return true
    })
    _OnShowOpenDialogSuccess = this.wrap(super._OnShowOpenDialogSuccess, () => {
      return true
    })
    _OnAnyShowOpenDialogSuccess = this.wrap(super._OnAnyShowOpenDialogSuccess, () => {
      return true
    })
    _OnShowOpenDialogError = this.wrap(super._OnShowOpenDialogError, () => {
      return true
    })
    _OnAnyShowOpenDialogError = this.wrap(super._OnAnyShowOpenDialogError, () => {
      return true
    })
    _OnShowSaveDialogSuccess = this.wrap(super._OnShowSaveDialogSuccess, () => {
      return true
    })
    _OnAnyShowSaveDialogSuccess = this.wrap(super._OnAnyShowSaveDialogSuccess, () => {
      return true
    })
    _OnShowSaveDialogError = this.wrap(super._OnShowSaveDialogError, () => {
      return true
    })
    _OnAnyShowSaveDialogError = this.wrap(super._OnAnyShowSaveDialogError, () => {
      return true
    })
    _OnMaximizeSuccess = this.wrap(super._OnMaximizeSuccess, () => {
      return true
    })
    _OnAnyMaximizeSuccess = this.wrap(super._OnAnyMaximizeSuccess, () => {
      return true
    })
    _OnMaximizeError = this.wrap(super._OnMaximizeError, () => {
      return true
    })
    _OnAnyMaximizeError = this.wrap(super._OnAnyMaximizeError, () => {
      return true
    })
    _OnMinimizeSuccess = this.wrap(super._OnMinimizeSuccess, () => {
      return true
    })
    _OnAnyMinimizeSuccess = this.wrap(super._OnAnyMinimizeSuccess, () => {
      return true
    })
    _OnMinimizeError = this.wrap(super._OnMinimizeError, () => {
      return true
    })
    _OnAnyMinimizeError = this.wrap(super._OnAnyMinimizeError, () => {
      return true
    })
    _OnRestoreSuccess = this.wrap(super._OnRestoreSuccess, () => {
      return true
    })
    _OnAnyRestoreSuccess = this.wrap(super._OnAnyRestoreSuccess, () => {
      return true
    })
    _OnRestoreError = this.wrap(super._OnRestoreError, () => {
      return true
    })
    _OnAnyRestoreError = this.wrap(super._OnAnyRestoreError, () => {
      return true
    })
    _OnRequestAttentionSuccess = this.wrap(super._OnRequestAttentionSuccess, () => {
      return true
    })
    _OnAnyRequestAttentionSuccess = this.wrap(super._OnAnyRequestAttentionSuccess, () => {
      return true
    })
    _OnRequestAttentionError = this.wrap(super._OnRequestAttentionError, () => {
      return true
    })
    _OnAnyRequestAttentionError = this.wrap(super._OnAnyRequestAttentionError, () => {
      return true
    })
    _OnSetAlwaysOnTopSuccess = this.wrap(super._OnSetAlwaysOnTopSuccess, () => {
      return true
    })
    _OnAnySetAlwaysOnTopSuccess = this.wrap(super._OnAnySetAlwaysOnTopSuccess, () => {
      return true
    })
    _OnSetAlwaysOnTopError = this.wrap(super._OnSetAlwaysOnTopError, () => {
      return true
    })
    _OnAnySetAlwaysOnTopError = this.wrap(super._OnAnySetAlwaysOnTopError, () => {
      return true
    })
    _OnSetHeightSuccess = this.wrap(super._OnSetHeightSuccess, () => {
      return true
    })
    _OnAnySetHeightSuccess = this.wrap(super._OnAnySetHeightSuccess, () => {
      return true
    })
    _OnSetHeightError = this.wrap(super._OnSetHeightError, () => {
      return true
    })
    _OnAnySetHeightError = this.wrap(super._OnAnySetHeightError, () => {
      return true
    })
    _OnSetMaximumSizeSuccess = this.wrap(super._OnSetMaximumSizeSuccess, () => {
      return true
    })
    _OnAnySetMaximumSizeSuccess = this.wrap(super._OnAnySetMaximumSizeSuccess, () => {
      return true
    })
    _OnSetMaximumSizeError = this.wrap(super._OnSetMaximumSizeError, () => {
      return true
    })
    _OnAnySetMaximumSizeError = this.wrap(super._OnAnySetMaximumSizeError, () => {
      return true
    })
    _OnSetMinimumSizeSuccess = this.wrap(super._OnSetMinimumSizeSuccess, () => {
      return true
    })
    _OnAnySetMinimumSizeSuccess = this.wrap(super._OnAnySetMinimumSizeSuccess, () => {
      return true
    })
    _OnSetMinimumSizeError = this.wrap(super._OnSetMinimumSizeError, () => {
      return true
    })
    _OnAnySetMinimumSizeError = this.wrap(super._OnAnySetMinimumSizeError, () => {
      return true
    })
    _OnSetResizableSuccess = this.wrap(super._OnSetResizableSuccess, () => {
      return true
    })
    _OnAnySetResizableSuccess = this.wrap(super._OnAnySetResizableSuccess, () => {
      return true
    })
    _OnSetResizableError = this.wrap(super._OnSetResizableError, () => {
      return true
    })
    _OnAnySetResizableError = this.wrap(super._OnAnySetResizableError, () => {
      return true
    })
    _OnSetTitleSuccess = this.wrap(super._OnSetTitleSuccess, () => {
      return true
    })
    _OnAnySetTitleSuccess = this.wrap(super._OnAnySetTitleSuccess, () => {
      return true
    })
    _OnSetTitleError = this.wrap(super._OnSetTitleError, () => {
      return true
    })
    _OnAnySetTitleError = this.wrap(super._OnAnySetTitleError, () => {
      return true
    })
    _OnSetWidthSuccess = this.wrap(super._OnSetWidthSuccess, () => {
      return true
    })
    _OnAnySetWidthSuccess = this.wrap(super._OnAnySetWidthSuccess, () => {
      return true
    })
    _OnSetWidthError = this.wrap(super._OnSetWidthError, () => {
      return true
    })
    _OnAnySetWidthError = this.wrap(super._OnAnySetWidthError, () => {
      return true
    })
    _OnSetXSuccess = this.wrap(super._OnSetXSuccess, () => {
      return true
    })
    _OnAnySetXSuccess = this.wrap(super._OnAnySetXSuccess, () => {
      return true
    })
    _OnSetXError = this.wrap(super._OnSetXError, () => {
      return true
    })
    _OnAnySetXError = this.wrap(super._OnAnySetXError, () => {
      return true
    })
    _OnSetYSuccess = this.wrap(super._OnSetYSuccess, () => {
      return true
    })
    _OnAnySetYSuccess = this.wrap(super._OnAnySetYSuccess, () => {
      return true
    })
    _OnSetYError = this.wrap(super._OnSetYError, () => {
      return true
    })
    _OnAnySetYError = this.wrap(super._OnAnySetYError, () => {
      return true
    })
    _OnShowDevToolsSuccess = this.wrap(super._OnShowDevToolsSuccess, () => {
      return true
    })
    _OnAnyShowDevToolsSuccess = this.wrap(super._OnAnyShowDevToolsSuccess, () => {
      return true
    })
    _OnShowDevToolsError = this.wrap(super._OnShowDevToolsError, () => {
      return true
    })
    _OnAnyShowDevToolsError = this.wrap(super._OnAnyShowDevToolsError, () => {
      return true
    })
    _OnUnmaximizeSuccess = this.wrap(super._OnUnmaximizeSuccess, () => {
      return true
    })
    _OnAnyUnmaximizeSuccess = this.wrap(super._OnAnyUnmaximizeSuccess, () => {
      return true
    })
    _OnUnmaximizeError = this.wrap(super._OnUnmaximizeError, () => {
      return true
    })
    _OnAnyUnmaximizeError = this.wrap(super._OnAnyUnmaximizeError, () => {
      return true
    })
    _OnSetFullscreenSuccess = this.wrap(super._OnSetFullscreenSuccess, () => {
      return true
    })
    _OnAnySetFullscreenSuccess = this.wrap(super._OnAnySetFullscreenSuccess, () => {
      return true
    })
    _OnSetFullscreenError = this.wrap(super._OnSetFullscreenError, () => {
      return true
    })
    _OnAnySetFullscreenError = this.wrap(super._OnAnySetFullscreenError, () => {
      return true
    })

    _OnActivateAchievementSuccess = this.wrap(super._OnActivateAchievementSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyActivateAchievementSuccess = this.wrap(super._OnAnyActivateAchievementSuccess, () => true)
    _OnActivateAchievementError = this.wrap(super._OnActivateAchievementError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyActivateAchievementError = this.wrap(super._OnAnyActivateAchievementError, () => true)

    _OnClearAchievementSuccess = this.wrap(super._OnClearAchievementSuccess, () => {
      return true
    })
    _OnAnyClearAchievementSuccess = this.wrap(super._OnAnyClearAchievementSuccess, () => {
      return true
    })
    _OnClearAchievementError = this.wrap(super._OnClearAchievementError, () => {
      return true
    })
    _OnAnyClearAchievementError = this.wrap(super._OnAnyClearAchievementError, () => {
      return true
    })
    _OnCheckAchievementActivationStateSuccess = this.wrap(super._OnCheckAchievementActivationStateSuccess, () => {
      return true
    })
    _OnAnyCheckAchievementActivationStateSuccess = this.wrap(super._OnAnyCheckAchievementActivationStateSuccess, () => {
      return true
    })
    _OnCheckAchievementActivationStateError = this.wrap(super._OnCheckAchievementActivationStateError, () => {
      return true
    })
    _OnAnyCheckAchievementActivationStateError = this.wrap(super._OnAnyCheckAchievementActivationStateError, () => {
      return true
    })
    _OnSetRichPresenceSuccess = this.wrap(super._OnSetRichPresenceSuccess, () => {
      return true
    })
    _OnAnySetRichPresenceSuccess = this.wrap(super._OnAnySetRichPresenceSuccess, () => {
      return true
    })
    _OnSetRichPresenceError = this.wrap(super._OnSetRichPresenceError, () => {
      return true
    })
    _OnAnySetRichPresenceError = this.wrap(super._OnAnySetRichPresenceError, () => {
      return true
    })

    // #region deprecated

    _OnFolderDialogCancel = this.wrap(super._OnFolderDialogCancel, () => {
      return true
    }, () => false)

    _OnFolderDialogOk = this.wrap(super._OnFolderDialogOk, () => {
      return true
    }, () => false)

    _OnOpenDialogCancel = this.wrap(super._OnOpenDialogCancel, () => {
      return true
    }, () => false)

    _OnOpenDialogOk = this.wrap(super._OnOpenDialogOk, () => {
      return true
    }, () => false)

    _OnSaveDialogCancel = this.wrap(super._OnSaveDialogCancel, () => {
      return true
    }, () => false)

    _OnSaveDialogOk = this.wrap(super._OnSaveDialogOk, () => {
      return true
    }, () => false)

    _OnAnyBinaryFileRead = this.wrap(super._OnAnyBinaryFileRead, () => {
      return true
    }, () => false)

    _OnAnyBinaryFileWrite = this.wrap(super._OnAnyBinaryFileWrite, () => {
      throw new Error('"_OnAnyBinaryFileWrite" Not implemented')
    }, () => false)

    _OnBinaryFileRead = this.wrap(super._OnBinaryFileRead, (tag) => {
      if (this._currentTag === tag) {
        return true
      }
      return false
    }, () => false)

    _OnBinaryFileWrite = this.wrap(super._OnBinaryFileWrite, () => {
      throw new Error('"_OnBinaryFileWrite" Not implemented')
    }, () => false)

    _OnFileDropped = this.wrap(super._OnFileDropped, () => {
      throw new Error('"_OnFileDropped" Not implemented')
    }, () => false)

    _OnFileSystemError = this.wrap(super._OnFileSystemError, () => {
      throw new Error('"_OnFileSystemError" Not implemented')
    }, () => false)

    _OnPathVerification = this.wrap(super._OnPathVerification, () => {
      throw new Error('"_OnPathVerification" Not implemented')
    }, () => false)

    _IsFullScreen = this.wrap(super._IsFullScreen, (state) => {
      return this._fullscreenState === state
    }, () => false)
    // #endregion

    // #region Exps

    _UserFolder = this.wrap(super._UserFolder, () => {
      // console.log('this', this)
      return this._userFolder ?? ''
    })

    _HomeFolder = this.wrap(super._HomeFolder, () => {
      // console.log('this', this)
      return this._homeFolder ?? ''
    })
    _AppDataFolder = this.wrap(super._AppDataFolder, () => {
      // console.log('this', this)
      return this._appDataFolder ?? ''
    })
    _UserDataFolder = this.wrap(super._UserDataFolder, () => {
      // console.log('this', this)
      return this._userDataFolder ?? ''
    })
    _LocalAppDataFolder = this.wrap(super._LocalAppDataFolder, () => {
      // console.log('this', this)
      return this._localAppDataFolder ?? ''
    })
    _LocalUserDataFolder = this.wrap(super._LocalUserDataFolder, () => {
      // console.log('this', this)
      return this._localUserDataFolder ?? ''
    })
    _SessionDataFolder = this.wrap(super._SessionDataFolder, () => {
      // console.log('this', this)
      return this._sessionDataFolder ?? ''
    })
    _TempFolder = this.wrap(super._TempFolder, () => {
      // console.log('this', this)
      return this._tempFolder ?? ''
    })
    _ExeFolder = this.wrap(super._ExeFolder, () => {
      // console.log('this', this)
      return this._exeFolder ?? ''
    })
    _ModuleFolder = this.wrap(super._ModuleFolder, () => {
      // console.log('this', this)
      return this._moduleFolder ?? ''
    })
    _DesktopFolder = this.wrap(super._DesktopFolder, () => {
      // console.log('this', this)
      return this._desktopFolder ?? ''
    })
    _DocumentsFolder = this.wrap(super._DocumentsFolder, () => {
      // console.log('this', this)
      return this._documentsFolder ?? ''
    })
    _DownloadsFolder = this.wrap(super._DownloadsFolder, () => {
      // console.log('this', this)
      return this._downloadsFolder ?? ''
    })
    _MusicFolder = this.wrap(super._MusicFolder, () => {
      // console.log('this', this)
      return this._musicFolder ?? ''
    })
    _PicturesFolder = this.wrap(super._PicturesFolder, () => {
      // console.log('this', this)
      return this._picturesFolder ?? ''
    })
    _VideosFolder = this.wrap(super._VideosFolder, () => {
      // console.log('this', this)
      return this._videosFolder ?? ''
    })
    _RecentFolder = this.wrap(super._RecentFolder, () => {
      // console.log('this', this)
      return this._recentFolder ?? ''
    })
    _LogsFolder = this.wrap(super._LogsFolder, () => {
      // console.log('this', this)
      return this._logsFolder ?? ''
    })
    _CrashDumpsFolder = this.wrap(super._CrashDumpsFolder, () => {
      // console.log('this', this)
      return this._crashDumpsFolder ?? ''
    })

    _AppFolder = this.wrap(super._AppFolder, () => {
      // console.log('this', this)
      return this._appFolder ?? ''
    })

    _AppFolderURL = this.wrap(super._AppFolderURL, () => {
      return 'deprecrated'
    })

    _ArgumentAt = this.wrap(super._ArgumentAt, () => {
      console.error('"_ArgumentAt" Not implemented')
      return ''
    })

    _ArgumentCount = this.wrap(super._ArgumentCount, () => {
      console.error('"_ArgumentCount" Not implemented')
      return -1
    })

    _ChosenPath = this.wrap(super._ChosenPath, () => {
      return this._chosenPath ?? ''
    })

    _DroppedFile = this.wrap(super._DroppedFile, () => {
      console.error('"_DroppedFile" Not implemented')
      return ''
    })

    _FileError = this.wrap(super._FileError, () => {
      return this._fileError
    })

    _FileSize = this.wrap(super._FileSize, () => {
      return this._fileSize
    })

    _FileTag = this.wrap(super._FileTag, () => {
      return this._currentTag ?? ""
    })

    _ListAt = this.wrap(super._ListAt, (index) => {
      return this._ListFilesResultValue[index]?.path ?? ''
    })

    _ListCount = this.wrap(super._ListCount, () => {
      return this._ListFilesResultValue.length
    })

    _ProjectFilesFolder = this.wrap(super._ProjectFilesFolder, () => {
      return this._projectFilesFolder ?? ''
    })

    _ProjectFilesFolderURL = this.wrap(super._ProjectFilesFolderURL, () => {
      return this._projectFilesFolder ?? ''
    })

    _ReadFile = this.wrap(super._ReadFile, () => {
      return this._ReadTextFileResultValue ?? ''
    })

    _WindowHeight = this.wrap(super._WindowHeight, () => {
      return this._windowHeight
    })

    _WindowWidth = this.wrap(super._WindowWidth, () => {
      return this._windowWidth
    })

    _WindowTitle = this.wrap(super._WindowTitle, () => {
      return this._windowTitle
    })

    _WindowX = this.wrap(super._WindowX, () => {
      return this._windowX
    })

    _WindowY = this.wrap(super._WindowY, () => {
      return this._windowY
    })

    _IsEngine = this.wrap(super._IsEngine, (engine) => {
      if (engine === 0 && this._engine === 'electron') return true
      if (engine === 1 && this._engine === 'tauri') return true
      return false
    })

    _LastPathExists = this.wrap(super._LastPathExists, () => {
      return this._lastPathExists
    })

    _FullscreenState = this.wrap(super._FullscreenState, () => {
      return this._fullscreenState
    })

    _CurrentPlatform = this.wrap(super._CurrentPlatform, () => {
      return this._platform
    })
    _CurrentArchitecture = this.wrap(super._CurrentArchitecture, () => {
      return this._arch
    })
    _SteamAccountId = this.wrap(super._SteamAccountId, () => {
      return this._steam_SteamId.accountId
    })
    _SteamId32 = this.wrap(super._SteamId32, () => {
      return this._steam_SteamId.steamId32
    })
    _SteamId64 = this.wrap(super._SteamId64, () => {
      return this._steam_SteamId.steamId64
    })
    _SteamUsername = this.wrap(super._SteamUsername, () => {
      return this._steam_Name
    })
    _SteamLevel = this.wrap(super._SteamLevel, () => {
      return this._steam_Level
    })
    _SteamIpCountry = this.wrap(super._SteamIpCountry, () => {
      return this._steam_IpCountry
    })

    _InitializeError = this.wrap(super._InitializeError, () => {
      return this._InitializeErrorValue
    })
    _InitializeResult = this.wrap(super._InitializeResult, () => {
      return this._InitializeResultValue
    })
    _AppendFileError = this.wrap(super._AppendFileError, () => {
      return this._AppendFileErrorValue
    })
    _AppendFileResult = this.wrap(super._AppendFileResult, () => {
      return this._AppendFileResultValue
    })
    _CopyFileError = this.wrap(super._CopyFileError, () => {
      return this._CopyFileErrorValue
    })
    _CopyFileResult = this.wrap(super._CopyFileResult, () => {
      return this._CopyFileResultValue
    })
    _FetchFileSizeError = this.wrap(super._FetchFileSizeError, () => {
      return this._FetchFileSizeErrorValue
    })
    _FetchFileSizeResult = this.wrap(super._FetchFileSizeResult, () => {
      return this._FetchFileSizeResultValue
    })
    _CreateFolderError = this.wrap(super._CreateFolderError, () => {
      return this._CreateFolderErrorValue
    })
    _CreateFolderResult = this.wrap(super._CreateFolderResult, () => {
      return this._CreateFolderResultValue
    })
    _DeleteFileError = this.wrap(super._DeleteFileError, () => {
      return this._DeleteFileErrorValue
    })
    _DeleteFileResult = this.wrap(super._DeleteFileResult, () => {
      return this._DeleteFileResultValue
    })
    _ListFilesError = this.wrap(super._ListFilesError, () => {
      return this._ListFilesErrorValue
    })
    _ListFilesResult = this.wrap(super._ListFilesResult, () => {
      return this._ListFilesResultValue
    })
    _MoveFileError = this.wrap(super._MoveFileError, () => {
      return this._MoveFileErrorValue
    })
    _MoveFileResult = this.wrap(super._MoveFileResult, () => {
      return this._MoveFileResultValue
    })
    _OpenBrowserError = this.wrap(super._OpenBrowserError, () => {
      return this._OpenBrowserErrorValue
    })
    _OpenBrowserResult = this.wrap(super._OpenBrowserResult, () => {
      return this._OpenBrowserResultValue
    })
    _ReadBinaryFileError = this.wrap(super._ReadBinaryFileError, () => {
      return this._ReadBinaryFileErrorValue
    })
    _ReadBinaryFileResult = this.wrap(super._ReadBinaryFileResult, () => {
      return this._ReadBinaryFileResultValue
    })
    _RenameFileError = this.wrap(super._RenameFileError, () => {
      return this._RenameFileErrorValue
    })
    _RenameFileResult = this.wrap(super._RenameFileResult, () => {
      return this._RenameFileResultValue
    })
    _RunFileError = this.wrap(super._RunFileError, () => {
      return this._RunFileErrorValue
    })
    _RunFileResult = this.wrap(super._RunFileResult, () => {
      return this._RunFileResultValue
    })
    _ShellOpenError = this.wrap(super._ShellOpenError, () => {
      return this._ShellOpenErrorValue
    })
    _ShellOpenResult = this.wrap(super._ShellOpenResult, () => {
      return this._ShellOpenResultValue
    })
    _ExplorerOpenError = this.wrap(super._ExplorerOpenError, () => {
      return this._ExplorerOpenErrorValue
    })
    _ExplorerOpenResult = this.wrap(super._ExplorerOpenResult, () => {
      return this._ExplorerOpenResultValue
    })
    _WriteBinaryFileError = this.wrap(super._WriteBinaryFileError, () => {
      return this._WriteBinaryFileErrorValue
    })
    _WriteBinaryFileResult = this.wrap(super._WriteBinaryFileResult, () => {
      return this._WriteBinaryFileResultValue
    })
    _WriteTextFileError = this.wrap(super._WriteTextFileError, () => {
      return this._WriteTextFileErrorValue
    })
    _WriteTextFileResult = this.wrap(super._WriteTextFileResult, () => {
      return this._WriteTextFileResultValue
    })
    _WriteTextError = this.wrap(super._WriteTextError, () => {
      return this._WriteTextErrorValue
    })
    _WriteTextResult = this.wrap(super._WriteTextResult, () => {
      return this._WriteTextResultValue
    })
    _ReadTextFileError = this.wrap(super._ReadTextFileError, () => {
      return this._ReadTextFileErrorValue
    })
    _ReadTextFileResult = this.wrap(super._ReadTextFileResult, () => {
      return this._ReadTextFileResultValue
    })
    _CheckIfPathExistError = this.wrap(super._CheckIfPathExistError, () => {
      return this._CheckIfPathExistErrorValue
    })
    _CheckIfPathExistResult = this.wrap(super._CheckIfPathExistResult, () => {
      return this._CheckIfPathExistResultValue
    })
    _ShowFolderDialogError = this.wrap(super._ShowFolderDialogError, () => {
      return this._ShowFolderDialogErrorValue
    })
    _ShowFolderDialogResult = this.wrap(super._ShowFolderDialogResult, () => {
      return this._ShowFolderDialogResultValue
    })
    _ShowOpenDialogError = this.wrap(super._ShowOpenDialogError, () => {
      return this._ShowOpenDialogErrorValue
    })
    _ShowOpenDialogResult = this.wrap(super._ShowOpenDialogResult, () => {
      return this._ShowOpenDialogResultValue
    })
    _ShowSaveDialogError = this.wrap(super._ShowSaveDialogError, () => {
      return this._ShowSaveDialogErrorValue
    })
    _ShowSaveDialogResult = this.wrap(super._ShowSaveDialogResult, () => {
      return this._ShowSaveDialogResultValue
    })
    _MaximizeError = this.wrap(super._MaximizeError, () => {
      return this._MaximizeErrorValue
    })
    _MaximizeResult = this.wrap(super._MaximizeResult, () => {
      return this._MaximizeResultValue
    })
    _MinimizeError = this.wrap(super._MinimizeError, () => {
      return this._MinimizeErrorValue
    })
    _MinimizeResult = this.wrap(super._MinimizeResult, () => {
      return this._MinimizeResultValue
    })
    _RestoreError = this.wrap(super._RestoreError, () => {
      return this._RestoreErrorValue
    })
    _RestoreResult = this.wrap(super._RestoreResult, () => {
      return this._RestoreResultValue
    })
    _RequestAttentionError = this.wrap(super._RequestAttentionError, () => {
      return this._RequestAttentionErrorValue
    })
    _RequestAttentionResult = this.wrap(super._RequestAttentionResult, () => {
      return this._RequestAttentionResultValue
    })
    _SetAlwaysOnTopError = this.wrap(super._SetAlwaysOnTopError, () => {
      return this._SetAlwaysOnTopErrorValue
    })
    _SetAlwaysOnTopResult = this.wrap(super._SetAlwaysOnTopResult, () => {
      return this._SetAlwaysOnTopResultValue
    })
    _SetHeightError = this.wrap(super._SetHeightError, () => {
      return this._SetHeightErrorValue
    })
    _SetHeightResult = this.wrap(super._SetHeightResult, () => {
      return this._SetHeightResultValue
    })
    _SetMaximumSizeError = this.wrap(super._SetMaximumSizeError, () => {
      return this._SetMaximumSizeErrorValue
    })
    _SetMaximumSizeResult = this.wrap(super._SetMaximumSizeResult, () => {
      return this._SetMaximumSizeResultValue
    })
    _SetMinimumSizeError = this.wrap(super._SetMinimumSizeError, () => {
      return this._SetMinimumSizeErrorValue
    })
    _SetMinimumSizeResult = this.wrap(super._SetMinimumSizeResult, () => {
      return this._SetMinimumSizeResultValue
    })
    _SetResizableError = this.wrap(super._SetResizableError, () => {
      return this._SetResizableErrorValue
    })
    _SetResizableResult = this.wrap(super._SetResizableResult, () => {
      return this._SetResizableResultValue
    })
    _SetTitleError = this.wrap(super._SetTitleError, () => {
      return this._SetTitleErrorValue
    })
    _SetTitleResult = this.wrap(super._SetTitleResult, () => {
      return this._SetTitleResultValue
    })
    _SetWidthError = this.wrap(super._SetWidthError, () => {
      return this._SetWidthErrorValue
    })
    _SetWidthResult = this.wrap(super._SetWidthResult, () => {
      return this._SetWidthResultValue
    })
    _SetXError = this.wrap(super._SetXError, () => {
      return this._SetXErrorValue
    })
    _SetXResult = this.wrap(super._SetXResult, () => {
      return this._SetXResultValue
    })
    _SetYError = this.wrap(super._SetYError, () => {
      return this._SetYErrorValue
    })
    _SetYResult = this.wrap(super._SetYResult, () => {
      return this._SetYResultValue
    })
    _ShowDevToolsError = this.wrap(super._ShowDevToolsError, () => {
      return this._ShowDevToolsErrorValue
    })
    _ShowDevToolsResult = this.wrap(super._ShowDevToolsResult, () => {
      return this._ShowDevToolsResultValue
    })
    _UnmaximizeError = this.wrap(super._UnmaximizeError, () => {
      return this._UnmaximizeErrorValue
    })
    _UnmaximizeResult = this.wrap(super._UnmaximizeResult, () => {
      return this._UnmaximizeResultValue
    })
    _SetFullscreenError = this.wrap(super._SetFullscreenError, () => {
      return this._SetFullscreenErrorValue
    })
    _SetFullscreenResult = this.wrap(super._SetFullscreenResult, () => {
      return this._SetFullscreenResultValue
    })
    _ActivateAchievementError = this.wrap(super._ActivateAchievementError, () => {
      return this._ActivateAchievementErrorValue
    })
    _ActivateAchievementResult = this.wrap(super._ActivateAchievementResult, () => {
      return this._ActivateAchievementResultValue
    })
    _ClearAchievementError = this.wrap(super._ClearAchievementError, () => {
      return this._ClearAchievementErrorValue
    })
    _ClearAchievementResult = this.wrap(super._ClearAchievementResult, () => {
      return this._ClearAchievementResultValue
    })
    _CheckAchievementActivationStateError = this.wrap(super._CheckAchievementActivationStateError, () => {
      return this._CheckAchievementActivationStateErrorValue
    })
    _CheckAchievementActivationStateResult = this.wrap(super._CheckAchievementActivationStateResult, () => {
      return this._CheckAchievementActivationStateResultValue
    })
    _SetRichPresenceError = this.wrap(super._SetRichPresenceError, () => {
      return this._SetRichPresenceErrorValue
    })
    _SetRichPresenceResult = this.wrap(super._SetRichPresenceResult, () => {
      return this._SetRichPresenceResultValue
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
