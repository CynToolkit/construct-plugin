// @ts-check

// TODO: must use a bundler to support dependencies & typescript
function assertPath(e){if("string"!=typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function normalizeStringPosix(e,t){for(var r,n="",a=0,i=-1,o=0,l=0;l<=e.length;++l){if(l<e.length)r=e.charCodeAt(l);else{if(47===r)break;r=47}if(47===r){if(i===l-1||1===o);else if(i!==l-1&&2===o){if(n.length<2||2!==a||46!==n.charCodeAt(n.length-1)||46!==n.charCodeAt(n.length-2))if(n.length>2){var h=n.lastIndexOf("/");if(h!==n.length-1){-1===h?(n="",a=0):a=(n=n.slice(0,h)).length-1-n.lastIndexOf("/"),i=l,o=0;continue}}else if(2===n.length||1===n.length){n="",a=0,i=l,o=0;continue}t&&(n.length>0?n+="/..":n="..",a=2)}else n.length>0?n+="/"+e.slice(i+1,l):n=e.slice(i+1,l),a=l-i-1;i=l,o=0}else 46===r&&-1!==o?++o:o=-1}return n}function _format(e,t){var r=t.dir||t.root,n=t.base||(t.name||"")+(t.ext||"");return r?r===t.root?r+n:r+e+n:n}var posixPath={resolve:function(){for(var e,t="",r=!1,n=arguments.length-1;n>=-1&&!r;n--){var a;n>=0?a=arguments[n]:(void 0===e&&(e=process.cwd()),a=e),assertPath(a),0!==a.length&&(t=a+"/"+t,r=47===a.charCodeAt(0))}return t=normalizeStringPosix(t,!r),r?t.length>0?"/"+t:"/":t.length>0?t:"."},normalize:function(e){if(assertPath(e),0===e.length)return".";var t=47===e.charCodeAt(0),r=47===e.charCodeAt(e.length-1);return 0!==(e=normalizeStringPosix(e,!t)).length||t||(e="."),e.length>0&&r&&(e+="/"),t?"/"+e:e},isAbsolute:function(e){return assertPath(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var e,t=0;t<arguments.length;++t){var r=arguments[t];assertPath(r),r.length>0&&(void 0===e?e=r:e+="/"+r)}return void 0===e?".":posixPath.normalize(e)},relative:function(e,t){if(assertPath(e),assertPath(t),e===t)return"";if((e=posixPath.resolve(e))===(t=posixPath.resolve(t)))return"";for(var r=1;r<e.length&&47===e.charCodeAt(r);++r);for(var n=e.length,a=n-r,i=1;i<t.length&&47===t.charCodeAt(i);++i);for(var o=t.length-i,l=a<o?a:o,h=-1,s=0;s<=l;++s){if(s===l){if(o>l){if(47===t.charCodeAt(i+s))return t.slice(i+s+1);if(0===s)return t.slice(i+s)}else a>l&&(47===e.charCodeAt(r+s)?h=s:0===s&&(h=0));break}var f=e.charCodeAt(r+s);if(f!==t.charCodeAt(i+s))break;47===f&&(h=s)}var c="";for(s=r+h+1;s<=n;++s)s!==n&&47!==e.charCodeAt(s)||(0===c.length?c+="..":c+="/..");return c.length>0?c+t.slice(i+h):(i+=h,47===t.charCodeAt(i)&&++i,t.slice(i))},_makeLong:function(e){return e},dirname:function(e){if(assertPath(e),0===e.length)return".";for(var t=e.charCodeAt(0),r=47===t,n=-1,a=!0,i=e.length-1;i>=1;--i)if(47===(t=e.charCodeAt(i))){if(!a){n=i;break}}else a=!1;return-1===n?r?"/":".":r&&1===n?"//":e.slice(0,n)},basename:function(e,t){if(void 0!==t&&"string"!=typeof t)throw new TypeError('"ext" argument must be a string');assertPath(e);var r,n=0,a=-1,i=!0;if(void 0!==t&&t.length>0&&t.length<=e.length){if(t.length===e.length&&t===e)return"";var o=t.length-1,l=-1;for(r=e.length-1;r>=0;--r){var h=e.charCodeAt(r);if(47===h){if(!i){n=r+1;break}}else-1===l&&(i=!1,l=r+1),o>=0&&(h===t.charCodeAt(o)?-1==--o&&(a=r):(o=-1,a=l))}return n===a?a=l:-1===a&&(a=e.length),e.slice(n,a)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!i){n=r+1;break}}else-1===a&&(i=!1,a=r+1);return-1===a?"":e.slice(n,a)},extname:function(e){assertPath(e);for(var t=-1,r=0,n=-1,a=!0,i=0,o=e.length-1;o>=0;--o){var l=e.charCodeAt(o);if(47!==l)-1===n&&(a=!1,n=o+1),46===l?-1===t?t=o:1!==i&&(i=1):-1!==t&&(i=-1);else if(!a){r=o+1;break}}return-1===t||-1===n||0===i||1===i&&t===n-1&&t===r+1?"":e.slice(t,n)},format:function(e){if(null===e||"object"!=typeof e)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return _format("/",e)},parse:function(e){assertPath(e);var t={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return t;var r,n=e.charCodeAt(0),a=47===n;a?(t.root="/",r=1):r=0;for(var i=-1,o=0,l=-1,h=!0,s=e.length-1,f=0;s>=r;--s)if(47!==(n=e.charCodeAt(s)))-1===l&&(h=!1,l=s+1),46===n?-1===i?i=s:1!==f&&(f=1):-1!==i&&(f=-1);else if(!h){o=s+1;break}return-1===i||-1===l||0===f||1===f&&i===l-1&&i===o+1?-1!==l&&(t.base=t.name=0===o&&a?e.slice(1,l):e.slice(o,l)):(0===o&&a?(t.name=e.slice(1,i),t.base=e.slice(1,l)):(t.name=e.slice(o,i),t.base=e.slice(o,l)),t.ext=e.slice(i,l)),o>0?t.dir=e.slice(0,o-1):a&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};

class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.responseResolvers = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      // console.log('trying to connect')
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        // console.log('Connected to WebSocket');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        return resolve(this.socket);
      };

      this.socket.onmessage = (event) => {
        // console.log('Received message:', event.data);
        const parsedData = JSON.parse(event.data);
        // Assuming the server sends a 'correlationId' with every message
        if (parsedData.correlationId && this.responseResolvers.has(parsedData.correlationId)) {
          const resolver = this.responseResolvers.get(parsedData.correlationId);
          resolver?.(parsedData);
          this.responseResolvers.delete(parsedData.correlationId);
        } else {
          console.error('unhandled message', parsedData)
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

  /** @param {import("@pipelab/core").Message} message */
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
   * @function
   * @template {import("@pipelab/core").Message} TMessage
   * @param {TMessage} message
   * @returns {Promise<any>}
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
    return responsePromise;
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  #generateCorrelationId() {
    return Math.random().toString(36).substring(2, 15);
  }
}

/**
 * @type {import('./sdk').GetInstanceJSFn}
 */
export function getInstanceJs(parentClass, addonTriggers, C3) {
  return class Pipelab extends parentClass {
    /**
     * @type {WebSocketClient}
     */
    WebSocketClient;

    /**
     * @type {string}
     */
    _userFolder

    /**
     * @type {string}
     */
    _homeFolder
    /**
     * @type {string}
     */
    _appDataFolder
    /**
     * @type {string}
     */
    _userDataFolder
    /**
     * @type {string}
     */
    _localAppDataFolder
    /**
     * @type {string}
     */
    _localUserDataFolder
    /**
     * @type {string}
     */
    _sessionDataFolder
    /**
     * @type {string}
     */
    _tempFolder
    /**
     * @type {string}
     */
    _exeFolder
    /**
     * @type {string}
     */
    _moduleFolder
    /**
     * @type {string}
     */
    _desktopFolder
    /**
     * @type {string}
     */
    _documentsFolder
    /**
     * @type {string}
     */
    _downloadsFolder
    /**
     * @type {string}
     */
    _musicFolder
    /**
     * @type {string}
     */
    _picturesFolder
    /**
     * @type {string}
     */
    _videosFolder
    /**
     * @type {string}
     */
    _recentFolder
    /**
     * @type {string}
     */
    _logsFolder
    /**
     * @type {string}
     */
    _crashDumpsFolder
    /**
     * @type {string}
     */
    _appFolder
    /**
     * @type {string}
     */
    _projectFilesFolder
    /**
     * @type {string}
     */

    /** @type {string} */
    _currentTag

    /** @type {import('@pipelab/core').MessageEngine['output']['body']['engine']} */
    _engine

    /** @type {import('@pipelab/core').FileFolder[]} */
    _fileList

    /** @type {boolean} */
    _isInitialized

    /** @type {string} */
    _fileError

    /** @type {number} */
    _fileSize

    /** @type {boolean} */
    _lastPathExists

    /** @type {number} */
    _windowHeight

    /** @type {number} */
    _windowWidth

    /** @type {string} */
    _windowTitle

    /** @type {number} */
    _windowX

    /** @type {number} */
    _windowY

    constructor(inst, _properties) {
      if (sdk === 'v1') {
        super(inst);
      } else {
        super();
      }

      this._currentTag = '';
      this._isInitialized = false
      this._fileList = [];

      this._fileError = ""
      this._fileSize = 0
      this._windowHeight = -1
      this._windowWidth = -1
      this._windowTitle = ""
      this._windowX = -1
      this._windowY = -1

      let properties
      if (sdk == 'v1') {
        properties = _properties
      } else {
        const properties = this._getInitProperties();
      }

      if (properties) {
        //
      }

      if (sdk === 'v1') {
        this._triggerAsync = this.TriggerAsync
        this._trigger = this.Trigger
      }
    }

    async unsupportedEngine() {
      console.warn(`Unable to execute action: unsupported engine`)
    }

    /**
     * @template {(...args: any[]) => any} T
     * @param {T} base
     * @param {T} callback
     * @param {T} [fallback]
     * @param {boolean} [force]
     * @returns T
     */
    wrap(base, callback, fallback, force) {
      return (...args) => {
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

    _Initialize = this.wrap(super._Initialize, async () => {
      // Initialize the WebSocket connection
      // console.log('on instance created');

      this.ws = new WebSocketClient('ws://localhost:31753', {
        maxReconnectAttempts: 3,
        reconnectInterval: 5000
      });

      // expose websocket instance
      globalThis.pipelab = {
        ws: this.ws
      }

      await this.ws.connect();

      // console.log('this.ws', this.ws)

      /** @type [import("@pipelab/core").Paths, string][] */
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

      const promises = paths.map(async (name) => {

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
          // console.log('pathFolder', pathFolder.body.data)
          this[name[1]] = pathFolder.body.data
        }

      })

      await Promise.all(promises)

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

      // console.log('this', this)
    }, this.unsupportedEngine, true)

    _WriteTextFile = this.wrap(super._WriteTextFile, async (contents, path) => {
      // console.log('Write text', contents, path);

      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWriteFile, 'input'>} */
      const order = {
        url: '/fs/file/write',
        body: {
          path,
          contents: contents,
          encoding: "utf8"
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
      // console.log('this', this)
    }, this.unsupportedEngine)

    _WriteText = () => {
      //
    }

    _ReadTextFile = this.wrap(super._ReadTextFile, async (path) => {
      // console.log('Read text', path);

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
        this._readFile = answer?.body.content
      }
    }, this.unsupportedEngine)

    _CheckIfPathExist = this.wrap(super._CheckIfPathExist, async (path) => {
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

    _Maximize = this.wrap(super._Maximize, async () => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWindowMaximize, 'input'>} */
      const order = {
        url: '/window/maximize',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _Minimize = this.wrap(super._Minimize, async () => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWindowMinimize, 'input'>} */
      const order = {
        url: '/window/minimize',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _Restore = this.wrap(super._Restore, async () => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWindowRestore, 'input'>} */
      const order = {
        url: '/window/restore',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _RequestAttention = this.wrap(super._RequestAttention, async (mode) => {
      // console.log('mode', mode)
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageRequestAttention, 'input'>} */
      const order = {
        url: '/window/request-attention',
      }

      await this.ws?.sendAndWaitForResponse(order)

      // TODO: support stop
    }, this.unsupportedEngine)

    _SetAlwaysOnTop = this.wrap(super._SetAlwaysOnTop, async (mode) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetAlwaysOnTop, 'input'>} */
      const order = {
        url: '/window/set-always-on-top',
        body: {
          value: mode === 1 ? true : false
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetHeight = this.wrap(super._SetHeight, async (height) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetHeight, 'input'>} */
      const order = {
        url: '/window/set-height',
        body: {
          value: height
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetMaximumSize = this.wrap(super._SetMaximumSize, async (width, height) => {
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

    _SetMinimumSize = this.wrap(super._SetMinimumSize, async (width, height) => {
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

    _SetResizable = this.wrap(super._SetResizable, async (resizable) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetResizable, 'input'>} */
      const order = {
        url: '/window/set-resizable',
        body: {
          value: resizable === 1 ? true : false
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetTitle = this.wrap(super._SetTitle, async (title) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetTitle, 'input'>} */
      const order = {
        url: '/window/set-title',
        body: {
          value: title
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetWidth = this.wrap(super._SetWidth, async (width) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetWidth, 'input'>} */
      const order = {
        url: '/window/set-width',
        body: {
          value: width
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetX = this.wrap(super._SetX, async (x) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetX, 'input'>} */
      const order = {
        url: '/window/set-x',
        body: {
          value: x
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetY = this.wrap(super._SetY, async (y) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetY, 'input'>} */
      const order = {
        url: '/window/set-y',
        body: {
          value: y
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _ShowDevTools = this.wrap(super._ShowDevTools, async (toggle) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageShowDevTools, 'input'>} */
      const order = {
        url: '/window/show-dev-tools',
        body: {
          value: toggle === 1 ? true : false
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetFullscreen = this.wrap(super._SetFullscreen, async (toggle) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageSetFullscreen, 'input'>} */
      const order = {
        url: '/window/set-fullscreen',
        body: {
          value: toggle === 0 ? 'normal' : 'fullscreen'
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _Unmaximize = this.wrap(super._Unmaximize, async () => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageWindowUnmaximize, 'input'>} */
      const order = {
        url: '/window/unmaximize',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _ShowFolderDialog = this.wrap(super._ShowFolderDialog, async () => {
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

    _ShowOpenDialog = this.wrap(super._ShowOpenDialog, async (accept) => {
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

    _ShowSaveDialog = this.wrap(super._ShowSaveDialog, async (accept) => {
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

    _AppendFile = this.wrap(super._AppendFile, async (path, contents) => {
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

    _CopyFile = this.wrap(super._CopyFile, async (source, destination, overwrite) => {
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

    _CreateFolder = this.wrap(super._CreateFolder, async (path) => {
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

    _DeleteFile = this.wrap(super._DeleteFile, async (path, recursive) => {
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

    _ListFiles = this.wrap(super._ListFiles, async (path, recursive) => {
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
        this._fileList = files.body.list
        // console.log('this._fileList', this._fileList)
      }
    }, this.unsupportedEngine)

    _MoveFile = this.wrap(super._MoveFile, async (source, destination, overwrite) => {
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

    _OpenBrowser = this.wrap(super._OpenBrowser, async () => {
      throw new Error('"_OpenBrowser" Not implemented')
    }, this.unsupportedEngine)

    _ReadBinaryFile = this.wrap(super._ReadBinaryFile, async (tag, path, destination) => {
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

      this._currentTag = tag;
      await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnAnyBinaryFileRead)
      await this._triggerAsync(C3.Plugins.pipelab.Cnds.OnBinaryFileRead)
      this._currentTag = ''

    }, this.unsupportedEngine)

    _RenameFile = this.wrap(super._RenameFile, async (source, newFileName, overwrite) => {
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

    _RunFile = this.wrap(super._RunFile, async (command) => {
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

    _ShellOpen = this.wrap(super._ShellOpen, async (path) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageOpen, 'input'>} */
      const order = {
        url: '/open',
        body: {
          path,
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _ExplorerOpen = this.wrap(super._ExplorerOpen, async (path) => {
      /** @type {import('@pipelab/core').MakeInputOutput<import('@pipelab/core').MessageExplorerOpen, 'input'>} */
      const order = {
        url: '/show-in-explorer',
        body: {
          path,
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    /**
     * @param {import("./sdk").IObjectClass} objectClass
     * @return {import("./sdk").IBinaryDataInstance | null} objectClass
     */
    __GetBinaryDataSdkInstance(objectClass) {
      // console.log('this._inst', this._inst)
      if (!objectClass)
        return null;
      const target = objectClass.getFirstPickedInstance(this._inst);
      // console.log('target', target)
      if (!target)
        return null;
      // return target.GetSdkInstance()
      return target
    }

    _WriteBinaryFile = this.wrap(super._WriteBinaryFile, async (tag, path, source) => {
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

    _FetchFileSize = this.wrap(super._FetchFileSize, async (path) => {
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

    // Cnds

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

    // Exps
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
      return this._fileList[index]?.path ?? ''
    })

    _ListCount = this.wrap(super._ListCount, () => {
      return this._fileList.length
    })

    _ProjectFilesFolder = this.wrap(super._ProjectFilesFolder, () => {
      return this._projectFilesFolder ?? ''
    })

    _ProjectFilesFolderURL = this.wrap(super._ProjectFilesFolderURL, () => {
      return this._projectFilesFolder ?? ''
    })

    _ReadFile = this.wrap(super._ReadFile, () => {
      return this._readFile ?? ''
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

    //

    _saveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    _loadFromJson(o) {
      // load state for savegames
    }
  };
}