// @ts-ignore
// TODO: must use a bundler to support dependencies & typescript

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
        const parsedData = JSON.parse(event.data);
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

    // Helper functions for modular API calls
    /**
     * Get the state of a workshop item
     * @param {string | number} itemId - The workshop item ID
     * @returns {Promise<number>} The item state
     */
    async _getItemState(itemId) {
      const order = {
        url: '/steam/workshop/state',
        body: {
          itemId
        },
      };
      const answer = await this.ws?.sendAndWaitForResponse(order);
      return answer?.body.data ?? 0
    }

    /**
     * Get the install info of a workshop item
     * @param {string | number} itemId - The workshop item ID
     * @returns {Promise<any>} The install info
     */
    async _getItemInstallInfo(itemId) {
      const order = {
        url: '/steam/workshop/install-info',
        body: {
          itemId
        },
      };
      const answer = await this.ws?.sendAndWaitForResponse(order);
      return answer?.body.data
    }

    /**
     * Get the download info of a workshop item
     * @param {string | number} itemId - The workshop item ID
     * @returns {Promise<any>} The download info
     */
    async _getItemDownloadInfo(itemId) {
      const order = {
        url: '/steam/workshop/download-info',
        body: {
          itemId
        },
      };
      const answer = await this.ws?.sendAndWaitForResponse(order);
      return answer?.body.data
    }

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
          url: '/steam/workshop/update-item',
          body: {
            itemId,
            updateDetails:{
              title,
              description,
              contentPath: contentFolderPath,
              previewPath: previewImagePath,
              tags: tagArray,
              visibility
            },
            appID,
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
          url: '/steam/workshop/get-items',
          body: {
            itemIds
          }
        };
        const metadataAnswer = await this.ws?.sendAndWaitForResponse(orderMetadata);
        if (metadataAnswer?.body.success === false) {
          throw new Error('Failed to get item metadata')
        }

        // @ts-expect-error - API returns WorkshopItemsResult
        const items = metadataAnswer?.body.data?.items ?? []
        
        // Store items in map and get state/install/download info for each
        for (const item of items) {
          if (!item) continue
          const itemIdStr = item.publishedFileId.toString()
          
          // Get state and install info using helper functions
          const state = await this._getItemState(item.publishedFileId)
          const installInfo = await this._getItemInstallInfo(item.publishedFileId)
          
          // Get download info if downloading
          let downloadInfo = null
          if (state && (state & 16)) {
            downloadInfo = await this._getItemDownloadInfo(item.publishedFileId)
          }
          
          // Store combined data
          this._workshopItemsMap.set(itemIdStr, {
            ...item,
            state,
            installInfo,
            downloadInfo
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

    _DeleteWorkshopItemBase = this.wrap(super._DeleteWorkshopItem, async (
      /** @type {string} */ itemId,
      /** @type {Tag} */ tag
    ) => {
      try {
        const order = {
          url: '/steam/workshop/delete-item',
          body: {
            itemId
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._DeleteWorkshopItemResultValue = answer?.body.data ? 1 : 0
        this._DeleteWorkshopItemErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnDeleteWorkshopItemSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyDeleteWorkshopItemSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._DeleteWorkshopItemErrorValue = e.message
          this._DeleteWorkshopItemResultValue = 0
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnDeleteWorkshopItemError,
            C3.Plugins.pipelabv2.Cnds.OnAnyDeleteWorkshopItemError
          ])
        }
      }
    }, this.unsupportedEngine)
    _DeleteWorkshopItem = this._DeleteWorkshopItemBase
    _DeleteWorkshopItemSync = this._DeleteWorkshopItemBase

    _SubscribeWorkshopItemBase = this.wrap(super._SubscribeWorkshopItem, async (
      /** @type {string} */ itemId,
      /** @type {Tag} */ tag
    ) => {
      try {
        const order = {
          url: '/steam/workshop/subscribe',
          body: {
            itemId
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._SubscribeWorkshopItemResultValue = answer?.body.data ? 1 : 0
        this._SubscribeWorkshopItemErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnSubscribeWorkshopItemSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnySubscribeWorkshopItemSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._SubscribeWorkshopItemErrorValue = e.message
          this._SubscribeWorkshopItemResultValue = 0
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnSubscribeWorkshopItemError,
            C3.Plugins.pipelabv2.Cnds.OnAnySubscribeWorkshopItemError
          ])
        }
      }
    }, this.unsupportedEngine)
    _SubscribeWorkshopItem = this._SubscribeWorkshopItemBase
    _SubscribeWorkshopItemSync = this._SubscribeWorkshopItemBase

    _UnsubscribeWorkshopItemBase = this.wrap(super._UnsubscribeWorkshopItem, async (
      /** @type {string} */ itemId,
      /** @type {Tag} */ tag
    ) => {
      try {
        const order = {
          url: '/steam/workshop/unsubscribe',
          body: {
            itemId
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        this._UnsubscribeWorkshopItemResultValue = answer?.body.data ? 1 : 0
        this._UnsubscribeWorkshopItemErrorValue = ''

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnUnsubscribeWorkshopItemSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyUnsubscribeWorkshopItemSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._UnsubscribeWorkshopItemErrorValue = e.message
          this._UnsubscribeWorkshopItemResultValue = 0
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnUnsubscribeWorkshopItemError,
            C3.Plugins.pipelabv2.Cnds.OnAnyUnsubscribeWorkshopItemError
          ])
        }
      }
    }, this.unsupportedEngine)
    _UnsubscribeWorkshopItem = this._UnsubscribeWorkshopItemBase
    _UnsubscribeWorkshopItemSync = this._UnsubscribeWorkshopItemBase

    _GetWorkshopItemStateBase = this.wrap(super._GetWorkshopItemState, async (
      /** @type {string} */ itemId,
      /** @type {Tag} */ tag
    ) => {
      try {
        const order = {
          url: '/steam/workshop/state',
          body: {
            itemId
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        const state = answer?.body.data ?? 0
        this._GetWorkshopItemStateResultValue = state
        this._GetWorkshopItemStateErrorValue = ''

        // Update or create item in map with state data
        const existingItem = this._workshopItemsMap.get(itemId)
        if (existingItem) {
          existingItem.state = state
        } else {
          this._workshopItemsMap.set(itemId, { state })
        }

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemStateSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemStateSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._GetWorkshopItemStateErrorValue = e.message
          this._GetWorkshopItemStateResultValue = 0
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemStateError,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemStateError
          ])
        }
      }
    }, this.unsupportedEngine)
    _GetWorkshopItemState = this._GetWorkshopItemStateBase
    _GetWorkshopItemStateSync = this._GetWorkshopItemStateBase

    _GetWorkshopItemInstallInfoBase = this.wrap(super._GetWorkshopItemInstallInfo, async (
      /** @type {string} */ itemId,
      /** @type {Tag} */ tag
    ) => {
      try {
        const order = {
          url: '/steam/workshop/install-info',
          body: {
            itemId
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        const installInfo = answer?.body.data
        // Store in a temporary variable for expressions to access
        this._lastInstallInfo = installInfo
        this._GetWorkshopItemInstallInfoErrorValue = ''

        // Update or create item in map with install info
        const existingItem = this._workshopItemsMap.get(itemId)
        if (existingItem) {
          existingItem.installInfo = installInfo
        } else {
          this._workshopItemsMap.set(itemId, { installInfo })
        }

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemInstallInfoSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemInstallInfoSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._GetWorkshopItemInstallInfoErrorValue = e.message
          this._lastInstallInfo = null
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemInstallInfoError,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemInstallInfoError
          ])
        }
      }
    }, this.unsupportedEngine)
    _GetWorkshopItemInstallInfo = this._GetWorkshopItemInstallInfoBase
    _GetWorkshopItemInstallInfoSync = this._GetWorkshopItemInstallInfoBase

    _GetWorkshopItemDownloadInfoBase = this.wrap(super._GetWorkshopItemDownloadInfo, async (
      /** @type {string} */ itemId,
      /** @type {Tag} */ tag
    ) => {
      try {
        const order = {
          url: '/steam/workshop/download-info',
          body: {
            itemId
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed')
        }
        const downloadInfo = answer?.body.data
        // Store in a temporary variable for expressions to access
        this._lastDownloadInfo = downloadInfo
        this._GetWorkshopItemDownloadInfoErrorValue = ''

        // Update or create item in map with download info
        const existingItem = this._workshopItemsMap.get(itemId)
        if (existingItem) {
          existingItem.downloadInfo = downloadInfo
        } else {
          this._workshopItemsMap.set(itemId, { downloadInfo })
        }

        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemDownloadInfoSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemDownloadInfoSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._GetWorkshopItemDownloadInfoErrorValue = e.message
          this._lastDownloadInfo = null
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemDownloadInfoError,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemDownloadInfoError
          ])
        }
      }
    }, this.unsupportedEngine)
    _GetWorkshopItemDownloadInfo = this._GetWorkshopItemDownloadInfoBase
    _GetWorkshopItemDownloadInfoSync = this._GetWorkshopItemDownloadInfoBase

    _GetWorkshopItemBase = this.wrap(super._GetWorkshopItem, async (
      /** @type {string} */ itemId,
      /** @type {Tag} */ tag
    ) => {
      try {
        const order = {
          url: '/steam/workshop/get-item',
          body: {
            itemId
          }
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed to get item')
        }

        // @ts-expect-error - API returns WorkshopItem
        const item = answer?.body.data
        
        if (item) {
          const itemIdStr = item.publishedFileId.toString()
          const existingItem = this._workshopItemsMap.get(itemIdStr)
          if (existingItem) {
            this._workshopItemsMap.set(itemIdStr, {...existingItem, ... item})
          } else {
            this._workshopItemsMap.set(itemIdStr, item)
          }
        }

        this._GetWorkshopItemErrorValue = ''
        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._GetWorkshopItemErrorValue = e.message
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemError,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemError
          ])
        }
      }
    }, this.unsupportedEngine)
    _GetWorkshopItem = this._GetWorkshopItemBase
    _GetWorkshopItemSync = this._GetWorkshopItemBase

    _GetWorkshopItemsBase = this.wrap(super._GetWorkshopItems, async (
      /** @type {string} */ itemIds,
      /** @type {Tag} */ tag
    ) => {
      try {
        const itemIdArray = itemIds.split(',').map(id => id.trim()).filter(id => id.length > 0)
        
        if (itemIdArray.length === 0) {
          this._GetWorkshopItemsErrorValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemsSuccess,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemsSuccess
          ])
          return
        }

        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'getItems'>, 'input'>} */
        const order = {
          url: '/steam/workshop/get-items',
          body: {
            itemIds: itemIdArray
          }
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed to get items')
        }

        // @ts-expect-error - API returns WorkshopItemsResult
        const items = answer?.body.data?.items ?? []
        
        for (const item of items) {
          if (!item) continue
          const itemIdStr = item.publishedFileId.toString()
          const existingItem = this._workshopItemsMap.get(itemIdStr)
          if (existingItem) {
            this._workshopItemsMap.set(itemIdStr, {...existingItem, ... item})
          } else {
            this._workshopItemsMap.set(itemIdStr, item)
          }
        }

        this._GetWorkshopItemsErrorValue = ''
        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemsSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemsSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._GetWorkshopItemsErrorValue = e.message
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemsError,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemsError
          ])
        }
      }
    }, this.unsupportedEngine)
    _GetWorkshopItems = this._GetWorkshopItemsBase
    _GetWorkshopItemsSync = this._GetWorkshopItemsBase

    _GetSubscribedWorkshopItemsBase = this.wrap(super._GetSubscribedWorkshopItems, async (
      /** @type {Tag} */ tag
    ) => {
      try {
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'getSubscribedItems'>, 'input'>} */
        const order = {
          url: '/steam/raw',
          body: {
            namespace: 'workshop',
            method: 'getSubscribedItems',
            args: [false],
          },
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed to get subscribed items')
        }
        
        const itemIds = answer?.body.data ?? []
        this._subscribedItemIds = itemIds.map(id => id.toString())
        
        this._GetSubscribedWorkshopItemsErrorValue = ''
        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnGetSubscribedWorkshopItemsSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyGetSubscribedWorkshopItemsSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._GetSubscribedWorkshopItemsErrorValue = e.message
          this._subscribedItemIds = []
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetSubscribedWorkshopItemsError,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetSubscribedWorkshopItemsError
          ])
        }
      }
    }, this.unsupportedEngine)
    _GetSubscribedWorkshopItems = this._GetSubscribedWorkshopItemsBase
    _GetSubscribedWorkshopItemsSync = this._GetSubscribedWorkshopItemsBase

    _GetWorkshopItemWithMetadataBase = this.wrap(super._GetWorkshopItemWithMetadata, async (
      /** @type {string} */ itemId,
      /** @type {Tag} */ tag
    ) => {
      try {
        // Get item metadata
        const order = {
          url: '/steam/workshop/get-item',
          body: {
            itemId
          }
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed to get item')
        }

        // @ts-expect-error - API returns WorkshopItem
        const item = answer?.body.data
        
        if (item) {
          const itemIdStr = item.publishedFileId.toString()
          
          // Get state and install info
          const state = await this._getItemState(item.publishedFileId)
          const installInfo = await this._getItemInstallInfo(item.publishedFileId)
          
          // Get download info if downloading
          let downloadInfo = null
          if (state && (state & 16)) {
            downloadInfo = await this._getItemDownloadInfo(item.publishedFileId)
          }
          
          // Store combined data
          this._workshopItemsMap.set(itemIdStr, {
            ...item,
            state,
            installInfo,
            downloadInfo
          })
        }

        this._GetWorkshopItemWithMetadataErrorValue = ''
        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemWithMetadataSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemWithMetadataSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._GetWorkshopItemWithMetadataErrorValue = e.message
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemWithMetadataError,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemWithMetadataError
          ])
        }
      }
    }, this.unsupportedEngine)
    _GetWorkshopItemWithMetadata = this._GetWorkshopItemWithMetadataBase
    _GetWorkshopItemWithMetadataSync = this._GetWorkshopItemWithMetadataBase

    _GetWorkshopItemsWithMetadataBase = this.wrap(super._GetWorkshopItemsWithMetadata, async (
      /** @type {string} */ itemIds,
      /** @type {Tag} */ tag
    ) => {
      try {
        const itemIdArray = itemIds.split(',').map(id => id.trim()).filter(id => id.length > 0)
        
        if (itemIdArray.length === 0) {
          this._GetWorkshopItemsWithMetadataErrorValue = ''
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemsWithMetadataSuccess,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemsWithMetadataSuccess
          ])
          return
        }

        // Get metadata for all items
        /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').SteamRaw<'workshop', 'getItems'>, 'input'>} */
        const order = {
          url: '/steam/workshop/get-items',
          body: {
            itemIds: itemIdArray
          }
        };
        const answer = await this.ws?.sendAndWaitForResponse(order);
        if (answer?.body.success === false) {
          throw new Error('Failed to get item metadata')
        }

        // @ts-expect-error - API returns WorkshopItemsResult
        const items = answer?.body.data?.items ?? []
        
        // Get state/install/download info for each item
        for (const item of items) {
          if (!item) continue
          const itemIdStr = item.publishedFileId.toString()
          
          // Get state and install info
          const state = await this._getItemState(item.publishedFileId)
          const installInfo = await this._getItemInstallInfo(item.publishedFileId)
          
          // Get download info if downloading
          let downloadInfo = null
          if (state && (state & 16)) {
            downloadInfo = await this._getItemDownloadInfo(item.publishedFileId)
          }
          
          // Store combined data
          this._workshopItemsMap.set(itemIdStr, {
            ...item,
            state,
            installInfo,
            downloadInfo
          })
        }

        this._GetWorkshopItemsWithMetadataErrorValue = ''
        await this.trigger(tag, [
          C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemsWithMetadataSuccess,
          C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemsWithMetadataSuccess
        ])
      } catch (e) {
        if (e instanceof Error) {
          this._GetWorkshopItemsWithMetadataErrorValue = e.message
          await this.trigger(tag, [
            C3.Plugins.pipelabv2.Cnds.OnGetWorkshopItemsWithMetadataError,
            C3.Plugins.pipelabv2.Cnds.OnAnyGetWorkshopItemsWithMetadataError
          ])
        }
      }
    }, this.unsupportedEngine)
    _GetWorkshopItemsWithMetadata = this._GetWorkshopItemsWithMetadataBase
    _GetWorkshopItemsWithMetadataSync = this._GetWorkshopItemsWithMetadataBase

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

    _OnDeleteWorkshopItemSuccess = this.wrap(super._OnDeleteWorkshopItemSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyDeleteWorkshopItemSuccess = this.wrap(super._OnAnyDeleteWorkshopItemSuccess, () => true)
    _OnDeleteWorkshopItemError = this.wrap(super._OnDeleteWorkshopItemError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyDeleteWorkshopItemError = this.wrap(super._OnAnyDeleteWorkshopItemError, () => true)

    _OnSubscribeWorkshopItemSuccess = this.wrap(super._OnSubscribeWorkshopItemSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySubscribeWorkshopItemSuccess = this.wrap(super._OnAnySubscribeWorkshopItemSuccess, () => true)
    _OnSubscribeWorkshopItemError = this.wrap(super._OnSubscribeWorkshopItemError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnySubscribeWorkshopItemError = this.wrap(super._OnAnySubscribeWorkshopItemError, () => true)

    _OnUnsubscribeWorkshopItemSuccess = this.wrap(super._OnUnsubscribeWorkshopItemSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyUnsubscribeWorkshopItemSuccess = this.wrap(super._OnAnyUnsubscribeWorkshopItemSuccess, () => true)
    _OnUnsubscribeWorkshopItemError = this.wrap(super._OnUnsubscribeWorkshopItemError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyUnsubscribeWorkshopItemError = this.wrap(super._OnAnyUnsubscribeWorkshopItemError, () => true)

    _OnGetWorkshopItemStateSuccess = this.wrap(super._OnGetWorkshopItemStateSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemStateSuccess = this.wrap(super._OnAnyGetWorkshopItemStateSuccess, () => true)
    _OnGetWorkshopItemStateError = this.wrap(super._OnGetWorkshopItemStateError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemStateError = this.wrap(super._OnAnyGetWorkshopItemStateError, () => true)

    _OnGetWorkshopItemInstallInfoSuccess = this.wrap(super._OnGetWorkshopItemInstallInfoSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemInstallInfoSuccess = this.wrap(super._OnAnyGetWorkshopItemInstallInfoSuccess, () => true)
    _OnGetWorkshopItemInstallInfoError = this.wrap(super._OnGetWorkshopItemInstallInfoError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemInstallInfoError = this.wrap(super._OnAnyGetWorkshopItemInstallInfoError, () => true)

    _OnGetWorkshopItemDownloadInfoSuccess = this.wrap(super._OnGetWorkshopItemDownloadInfoSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemDownloadInfoSuccess = this.wrap(super._OnAnyGetWorkshopItemDownloadInfoSuccess, () => true)
    _OnGetWorkshopItemDownloadInfoError = this.wrap(super._OnGetWorkshopItemDownloadInfoError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemDownloadInfoError = this.wrap(super._OnAnyGetWorkshopItemDownloadInfoError, () => true)

    _OnGetWorkshopItemSuccess = this.wrap(super._OnGetWorkshopItemSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemSuccess = this.wrap(super._OnAnyGetWorkshopItemSuccess, () => true)
    _OnGetWorkshopItemError = this.wrap(super._OnGetWorkshopItemError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemError = this.wrap(super._OnAnyGetWorkshopItemError, () => true)

    _OnGetWorkshopItemsSuccess = this.wrap(super._OnGetWorkshopItemsSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemsSuccess = this.wrap(super._OnAnyGetWorkshopItemsSuccess, () => true)
    _OnGetWorkshopItemsError = this.wrap(super._OnGetWorkshopItemsError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemsError = this.wrap(super._OnAnyGetWorkshopItemsError, () => true)

    _OnGetSubscribedWorkshopItemsSuccess = this.wrap(super._OnGetSubscribedWorkshopItemsSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetSubscribedWorkshopItemsSuccess = this.wrap(super._OnAnyGetSubscribedWorkshopItemsSuccess, () => true)
    _OnGetSubscribedWorkshopItemsError = this.wrap(super._OnGetSubscribedWorkshopItemsError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetSubscribedWorkshopItemsError = this.wrap(super._OnAnyGetSubscribedWorkshopItemsError, () => true)

    _OnGetWorkshopItemWithMetadataSuccess = this.wrap(super._OnGetWorkshopItemWithMetadataSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemWithMetadataSuccess = this.wrap(super._OnAnyGetWorkshopItemWithMetadataSuccess, () => true)
    _OnGetWorkshopItemWithMetadataError = this.wrap(super._OnGetWorkshopItemWithMetadataError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemWithMetadataError = this.wrap(super._OnAnyGetWorkshopItemWithMetadataError, () => true)

    _OnGetWorkshopItemsWithMetadataSuccess = this.wrap(super._OnGetWorkshopItemsWithMetadataSuccess, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemsWithMetadataSuccess = this.wrap(super._OnAnyGetWorkshopItemsWithMetadataSuccess, () => true)
    _OnGetWorkshopItemsWithMetadataError = this.wrap(super._OnGetWorkshopItemsWithMetadataError, (/** @type {Tag} */ tag) => this._currentTag === tag)
    _OnAnyGetWorkshopItemsWithMetadataError = this.wrap(super._OnAnyGetWorkshopItemsWithMetadataError, () => true)

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
      return this._GetSubscribedItemsWithMetadataErrorValue === '' ? 1 : 0
    })

    _DownloadWorkshopItemError = this.exprs(super._DownloadWorkshopItemError, () => {
      return this._DownloadWorkshopItemErrorValue
    })
    _DownloadWorkshopItemResult = this.exprs(super._DownloadWorkshopItemResult, () => {
      return this._DownloadWorkshopItemResultValue
    })

    _DeleteWorkshopItemError = this.exprs(super._DeleteWorkshopItemError, () => {
      return this._DeleteWorkshopItemErrorValue
    })
    _DeleteWorkshopItemResult = this.exprs(super._DeleteWorkshopItemResult, () => {
      return this._DeleteWorkshopItemResultValue
    })

    _SubscribeWorkshopItemError = this.exprs(super._SubscribeWorkshopItemError, () => {
      return this._SubscribeWorkshopItemErrorValue
    })
    _SubscribeWorkshopItemResult = this.exprs(super._SubscribeWorkshopItemResult, () => {
      return this._SubscribeWorkshopItemResultValue
    })

    _UnsubscribeWorkshopItemError = this.exprs(super._UnsubscribeWorkshopItemError, () => {
      return this._UnsubscribeWorkshopItemErrorValue
    })
    _UnsubscribeWorkshopItemResult = this.exprs(super._UnsubscribeWorkshopItemResult, () => {
      return this._UnsubscribeWorkshopItemResultValue
    })

    _GetWorkshopItemStateError = this.exprs(super._GetWorkshopItemStateError, () => {
      return this._GetWorkshopItemStateErrorValue
    })
    _GetWorkshopItemStateResult = this.exprs(super._GetWorkshopItemStateResult, () => {
      return this._GetWorkshopItemStateResultValue
    })

    _GetWorkshopItemInstallInfoError = this.exprs(super._GetWorkshopItemInstallInfoError, () => {
      return this._GetWorkshopItemInstallInfoErrorValue
    })
    _GetWorkshopItemInstallInfoResult = this.exprs(super._GetWorkshopItemInstallInfoResult, () => {
      return JSON.stringify(this._lastInstallInfo ?? {})
    })

    _GetWorkshopItemDownloadInfoError = this.exprs(super._GetWorkshopItemDownloadInfoError, () => {
      return this._GetWorkshopItemDownloadInfoErrorValue
    })
    _GetWorkshopItemDownloadInfoResult = this.exprs(super._GetWorkshopItemDownloadInfoResult, () => {
      return JSON.stringify(this._lastDownloadInfo ?? {})
    })

    _GetWorkshopItemError = this.exprs(super._GetWorkshopItemError, () => {
      return this._GetWorkshopItemErrorValue
    })
    _GetWorkshopItemResult = this.exprs(super._GetWorkshopItemResult, () => {
      return this._GetWorkshopItemErrorValue === '' ? 1 : 0
    })

    _GetWorkshopItemsError = this.exprs(super._GetWorkshopItemsError, () => {
      return this._GetWorkshopItemsErrorValue
    })
    _GetWorkshopItemsResult = this.exprs(super._GetWorkshopItemsResult, () => {
      return this._GetWorkshopItemsErrorValue === '' ? 1 : 0
    })

    _GetSubscribedWorkshopItemsError = this.exprs(super._GetSubscribedWorkshopItemsError, () => {
      return this._GetSubscribedWorkshopItemsErrorValue
    })
    _GetSubscribedWorkshopItemsResult = this.exprs(super._GetSubscribedWorkshopItemsResult, () => {
      return this._GetSubscribedWorkshopItemsErrorValue === '' ? 1 : 0
    })

    _GetWorkshopItemWithMetadataError = this.exprs(super._GetWorkshopItemWithMetadataError, () => {
      return this._GetWorkshopItemWithMetadataErrorValue
    })
    _GetWorkshopItemWithMetadataResult = this.exprs(super._GetWorkshopItemWithMetadataResult, () => {
      return this._GetWorkshopItemWithMetadataErrorValue === '' ? 1 : 0
    })

    _GetWorkshopItemsWithMetadataError = this.exprs(super._GetWorkshopItemsWithMetadataError, () => {
      return this._GetWorkshopItemsWithMetadataErrorValue
    })
    _GetWorkshopItemsWithMetadataResult = this.exprs(super._GetWorkshopItemsWithMetadataResult, () => {
      return this._GetWorkshopItemsWithMetadataErrorValue === '' ? 1 : 0
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
      const state = item?.state
      return (state !== undefined && state !== null && (state & 4)) ? 1 : 0
    })

    _WorkshopItemIsDownloading = this.exprs(super._WorkshopItemIsDownloading, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      const state = item?.state
      return (state !== undefined && state !== null && (state & 16)) ? 1 : 0
    })

    _WorkshopItemNeedsUpdate = this.exprs(super._WorkshopItemNeedsUpdate, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      const state = item?.state
      return (state !== undefined && state !== null && (state & 8)) ? 1 : 0
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

    _WorkshopItemDownloadCurrent = this.exprs(super._WorkshopItemDownloadCurrent, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.downloadInfo?.current ?? 0
    })

    _WorkshopItemDownloadTotal = this.exprs(super._WorkshopItemDownloadTotal, (/** @type {string} */ itemId) => {
      const item = this._workshopItemsMap.get(itemId)
      return item?.downloadInfo?.total ?? 0
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