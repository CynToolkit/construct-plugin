// @ts-check


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
      console.log('trying to connect')
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log('Connected to WebSocket');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        return resolve(this.socket);
      };

      this.socket.onmessage = (event) => {
        console.log('Received message:', event.data);
        const parsedData = JSON.parse(event.data);
        // Assuming the server sends a 'correlationId' with every message
        if (parsedData.correlationId && this.responseResolvers.has(parsedData.correlationId)) {
          const resolver = this.responseResolvers.get(parsedData.correlationId);
          resolver?.(parsedData);
          this.responseResolvers.delete(parsedData.correlationId);
        } else {
          console.log('unhandled message', parsedData)
        }
        // Handle other incoming messages if needed
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
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

  /** @param {import("@cyn/core").Message} message */
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
   * @template {import("@cyn/core").Message} TMessage
   * @param {TMessage} message
   * @returns {Promise<any>}
   */
  /** @type {<T extends import("@cyn/core").Message>(message: T) => Promise<import("@cyn/core").InferResponseFromMessage<typeof message>>} */
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
function getInstanceJs(parentClass, addonTriggers, C3) {
  return class Cyn extends parentClass {
    /**
     * @type {WebSocketClient}
     */
    WebSocketClient;

    /**
     * @type {string}
     */
    _userFolder

    /** @type {string} */
    _currentTag

    /** @type {import('@cyn/core').MessageEngine['output']['body']['engine']} */
    _engine

    /** @type {boolean} */
    _isInitialized

    constructor() {
      super();

      this._currentTag = '';
      this._isInitialized = false

      const properties = this._getInitProperties();
      if (properties) {
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
        console.log('this._isInitialized', this._isInitialized)
        // is initialized
        if (this._isInitialized) {
          // and is connected to an engine
          console.log('this.ws?.isConnected', this.ws?.isConnected)
          if (this.ws?.isConnected) {
            // execute callback
            return callback.call(this, ...args);
          } else {
            console.log('else 1')
            // do nothing (web, nwjs, unsupported, ...)
            return fallback
              ? fallback.call(this, ...args)
              : callback.call(this, ...args);
          }
        } else if (force) {
          console.log('force')
          return callback.call(this, ...args);
        } else {
          console.log('else 2')
          return fallback
            ? fallback.call(this, ...args)
            : callback.call(this, ...args);
        }
      }
    }

    // Acts

    _Initialize = this.wrap(super._Initialize, async () => {
      // Initialize the WebSocket connection
      console.log('on instance created');

      this.ws = new WebSocketClient('ws://localhost:31753', {
        maxReconnectAttempts: 3,
        reconnectInterval: 5000
      });

      await this.ws.connect();

      console.log('this.ws', this.ws)

      // -----------------------------------------------------------------------
      // Fetch user folder
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessagePaths, 'input'>} */
      const orderUserFolder = {
        url: '/paths',
        body: {
          name: 'home'
        }
      }

      /**
       * @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessagePaths, 'output'>}
       */
      const userFolder = await this.ws.sendAndWaitForResponse(orderUserFolder)
      console.log('userFolder', userFolder.body.data)
      this._userFolder = userFolder.body.data

      // -----------------------------------------------------------------------
      // Fetch engine

      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageEngine, 'input'>} */
      const orderEngine = {
        url: '/engine',
      }

      /**
       * @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageEngine, 'output'>}
       */
      const engineResponse = await this.ws.sendAndWaitForResponse(orderEngine)
      console.log('engineResponse', engineResponse.body.engine)
      this._engine = engineResponse.body.engine

      this._isInitialized = true

      console.log('this', this)
    }, this.unsupportedEngine, true)

    _WriteTextFile = this.wrap(super._WriteTextFile, async (contents, path) => {
      console.log('Write text', contents, path);

      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageWriteFile, 'input'>} */
      const order = {
        url: '/fs/file/write',
        body: {
          path,
          contents: contents,
          encoding: "utf8"
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
      console.log('this', this)
    }, this.unsupportedEngine)

    _WriteText = () => {
      //
    }

    _ReadTextFile = this.wrap(super._ReadTextFile, async (path) => {
      console.log('Read text', path);

      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageReadFile, 'input'>} */
      const order = {
        url: '/fs/file/read',
        body: {
          path,
          encoding: "utf8"
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
      console.log('this', this)
      this._readFile = answer?.body.content
    }, this.unsupportedEngine)

    _Maximize = this.wrap(super._Maximize, async () => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageWindowMaximize, 'input'>} */
      const order = {
        url: '/window/maximize',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _Minimize = this.wrap(super._Minimize, async () => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageWindowMinimize, 'input'>} */
      const order = {
        url: '/window/minimize',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _Restore = this.wrap(super._Restore, async () => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageWindowRestore, 'input'>} */
      const order = {
        url: '/window/restore',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _RequestAttention = this.wrap(super._RequestAttention, async (mode) => {
      console.log('mode', mode)
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageRequestAttention, 'input'>} */
      const order = {
        url: '/window/request-attention',
      }

      await this.ws?.sendAndWaitForResponse(order)

      // TODO: support stop
    }, this.unsupportedEngine)

    _SetAlwaysOnTop = this.wrap(super._SetAlwaysOnTop, async (mode) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageSetAlwaysOnTop, 'input'>} */
      const order = {
        url: '/window/set-always-on-top',
        body: {
          value: true
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetHeight = this.wrap(super._SetHeight, async (height) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageSetHeight, 'input'>} */
      const order = {
        url: '/window/set-height',
        body: {
          value: height
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetMaximumSize = this.wrap(super._SetMaximumSize, async (width, height) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageSetMaximumSize, 'input'>} */
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
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageSetMinimumSize, 'input'>} */
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
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageSetResizable, 'input'>} */
      const order = {
        url: '/window/set-resizable',
        body: {
          value: true
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetTitle = this.wrap(super._SetTitle, async (title) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageSetTitle, 'input'>} */
      const order = {
        url: '/window/set-title',
        body: {
          value: title
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetWidth = this.wrap(super._SetWidth, async (width) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageSetWidth, 'input'>} */
      const order = {
        url: '/window/set-width',
        body: {
          value: width
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetX = this.wrap(super._SetX, async (x) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageSetX, 'input'>} */
      const order = {
        url: '/window/set-x',
        body: {
          value: x
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _SetY = this.wrap(super._SetY, async (y) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageSetY, 'input'>} */
      const order = {
        url: '/window/set-y',
        body: {
          value: y
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _ShowDevTools = this.wrap(super._ShowDevTools, async (toggle) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageShowDevTools, 'input'>} */
      const order = {
        url: '/window/show-dev-tools',
        body: {
          value: true
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _Unmaximize = this.wrap(super._Unmaximize, async () => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageWindowUnmaximize, 'input'>} */
      const order = {
        url: '/window/unmaximize',
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _ShowFolderDialog = this.wrap(super._ShowFolderDialog, async () => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageShowFolderDialog, 'input'>} */
      const order = {
        url: '/dialog/folder',
      }

      await this.ws?.sendAndWaitForResponse(order)

      console.log('C3', C3)
      console.log('this', this)
      // this.Trigger(C3.Plugins.xxx.Cnds.OnFolderDialogOk)
    }, this.unsupportedEngine)

    _ShowOpenDialog = this.wrap(super._ShowOpenDialog, async (accept) => {
      /**
       * @type {import('@cyn/core').FileFilter[]}
       */
      const filters = accept.split(',').map(filter => {
        const [name, extensions] = filter.split('|')
        return {
          name,
          extensions: extensions.split(';')
        }
      })

      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageShowOpenDialog, 'input'>} */
      const order = {
        url: '/dialog/open',
        body: {
          filters
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _ShowSaveDialog = this.wrap(super._ShowSaveDialog, async (accept) => {
      /**
       * @type {import('@cyn/core').FileFilter[]}
       */
      const filters = accept.split(',').map(filter => {
        const [name, extensions] = filter.split('|')
        return {
          name,
          extensions: extensions.split(';')
        }
      })

      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageShowSaveDialog, 'input'>} */
      const order = {
        url: '/dialog/save',
        body: {
          filters
        }
      }

      await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _AppendFile = this.wrap(super._AppendFile, async () => {
      throw new Error('Not implemented')
    }, this.unsupportedEngine)

    _CopyFile = this.wrap(super._CopyFile, async () => {
      throw new Error('Not implemented')
    }, this.unsupportedEngine)

    _CreateFolder = this.wrap(super._CreateFolder, async (path) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageCreateFolder, 'input'>} */
      const order = {
        url: '/fs/folder/create',
        body: {
          path
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
      // if (!answer || answer.body.success === false) {
      //   this.Trigger(C3.Plugins.cyn.Cnds.OnAnyBinaryFileRead)
      // }
    }, this.unsupportedEngine)

    _DeleteFile = this.wrap(super._DeleteFile, async () => {
      throw new Error('Not implemented')
    }, this.unsupportedEngine)

    _ListFiles = this.wrap(super._ListFiles, async () => {
      throw new Error('Not implemented')
    }, this.unsupportedEngine)

    _MoveFile = this.wrap(super._MoveFile, async () => {
      throw new Error('Not implemented')
    }, this.unsupportedEngine)

    _OpenBrowser = this.wrap(super._OpenBrowser, async () => {
      throw new Error('Not implemented')
    }, this.unsupportedEngine)

    _ReadBinaryFile = this.wrap(super._ReadBinaryFile, async () => {
      throw new Error('Not implemented')
    }, this.unsupportedEngine)

    _RenameFile = this.wrap(super._RenameFile, async () => {
      throw new Error('Not implemented')
    }, this.unsupportedEngine)

    _RunFile = this.wrap(super._RunFile, async (command) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageRun, 'input'>} */
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
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageOpen, 'input'>} */
      const order = {
        url: '/open',
        body: {
          path,
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    _ExplorerOpen = this.wrap(super._ExplorerOpen, async (path) => {
      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageExplorerOpen, 'input'>} */
      const order = {
        url: '/show-in-explorer',
        body: {
          path,
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
    }, this.unsupportedEngine)

    /**
     * @param {IObjectClass} objectClass
     * @return {IBinaryDataInstance | null} objectClass
     */
    __GetBinaryDataSdkInstance(objectClass) {
      console.log('this._inst', this._inst)
      if (!objectClass)
        return null;
      const target = objectClass.getFirstPickedInstance(this._inst);
      console.log('target', target)
      if (!target)
        return null;
      // return target.GetSdkInstance()
      return target
    }

    _WriteBinaryFile = this.wrap(super._WriteBinaryFile, async (tag, path, source) => {
      throw new Error('not supported')
      console.log('tag', tag)
      console.log('path', path)
      console.log('source', source)

      console.log('C3', C3)
      console.log('this', this)

      const sdkInst = this.__GetBinaryDataSdkInstance(source);

      if (!sdkInst) {
        throw new Error("SDK instance not found")
      }

      console.log('sdkInst', sdkInst)

      const buffer = sdkInst.getArrayBufferReadOnly();

      console.log('buffer', buffer)

      /** @type {import('@cyn/core').MakeInputOutput<import('@cyn/core').MessageWriteFile, 'input'>} */
      const order = {
        url: '/fs/file/write',
        body: {
          path,
          contents: buffer,
          encoding: undefined
        }
      }

      const answer = await this.ws?.sendAndWaitForResponse(order)
      if (!answer || answer.body.success === false) {
        this._currentTag = tag;
        await this.TriggerAsync(C3.Plugins.cyn.Cnds.OnAnyBinaryFileRead)
        this._currentTag = tag;
        await this.TriggerAsync(C3.Plugins.cyn.Cnds.OnBinaryFileRead)
        this._currentTag = ''
      }
    }, this.unsupportedEngine)

    // Cnds

    _OnFolderDialogCancel = this.wrap(super._OnFolderDialogCancel, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnFolderDialogOk = this.wrap(super._OnFolderDialogOk, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnOpenDialogCancel = this.wrap(super._OnOpenDialogCancel, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnOpenDialogOk = this.wrap(super._OnOpenDialogOk, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnSaveDialogCancel = this.wrap(super._OnSaveDialogCancel, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnSaveDialogOk = this.wrap(super._OnSaveDialogOk, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnAnyBinaryFileRead = this.wrap(super._OnAnyBinaryFileRead, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnAnyBinaryFileWrite = this.wrap(super._OnAnyBinaryFileWrite, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnBinaryFileRead = this.wrap(super._OnBinaryFileRead, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnBinaryFileWrite = this.wrap(super._OnBinaryFileWrite, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnFileDropped = this.wrap(super._OnFileDropped, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnFileSystemError = this.wrap(super._OnFileSystemError, () => {
      throw new Error('Not implemented')
    }, () => false)

    _OnPathVerification = this.wrap(super._OnPathVerification, () => {
      throw new Error('Not implemented')
    }, () => false)

    // Exps
    _UserFolder = this.wrap(super._UserFolder, () => {
      console.log('this', this)
      return this._userFolder
    })

    _ArgumentAt = this.wrap(super._ArgumentAt, () => {
      throw new Error('Not implemented')
    })

    _ArgumentCount = this.wrap(super._ArgumentCount, () => {
      throw new Error('Not implemented')
    })

    _ChosenPath = this.wrap(super._ChosenPath, () => {
      throw new Error('Not implemented')
    })

    _AppFolder = this.wrap(super._AppFolder, () => {
      throw new Error('Not implemented')
    })

    _AppFolderURL = this.wrap(super._AppFolderURL, () => {
      throw new Error('Not implemented')
    })

    _DroppedFile = this.wrap(super._DroppedFile, () => {
      throw new Error('Not implemented')
    })

    _FileError = this.wrap(super._FileError, () => {
      throw new Error('Not implemented')
    })

    _FileSize = this.wrap(super._FileSize, () => {
      throw new Error('Not implemented')
    })

    _FileTag = this.wrap(super._FileTag, () => {
      throw new Error('Not implemented')
    })

    _ListAt = this.wrap(super._ListAt, () => {
      throw new Error('Not implemented')
    })

    _ListCount = this.wrap(super._ListCount, () => {
      throw new Error('Not implemented')
    })

    _ProjectFilesFolder = this.wrap(super._ProjectFilesFolder, () => {
      throw new Error('Not implemented')
    })

    _ProjectFilesFolderURL = this.wrap(super._ProjectFilesFolderURL, () => {
      throw new Error('Not implemented')
    })

    _ReadFile = this.wrap(super._ReadFile, () => {
      return this._readFile ?? ''
    })

    _WindowHeight = this.wrap(super._WindowHeight, () => {
      throw new Error('Not implemented')
    })

    _WindowWidth = this.wrap(super._WindowWidth, () => {
      throw new Error('Not implemented')
    })

    _WindowTitle = this.wrap(super._WindowTitle, () => {
      throw new Error('Not implemented')
    })

    _WindowX = this.wrap(super._WindowX, () => {
      throw new Error('Not implemented')
    })

    _WindowY = this.wrap(super._WindowY, () => {
      this._WindowX
      throw new Error('Not implemented')
    })

    _IsEngine = this.wrap(super._IsEngine, (engine) => {
      console.log('engine', engine)
      return this._engine === engine
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

export {
  getInstanceJs
}