// @ts-check

/**
 * @typedef {Object} MessageBase
 * @property {string} url
 * @property {any} [body]
 * @property {string} [correlationId]
 */

// ---

/**
 * @typedef {Object} MessageFsWriteGetBody
 * @property {string} path
 * @property {string} content
 * @property {boolean} overwrite
 * @property {'utf8'} encoding
 */
/**
 * @typedef {Object} MessageFsWriteGetChild
 * @property {'/fs/write'} url
 * @property {MessageFsWriteGetBody} body
 * @typedef {MessageBase & MessageFsWriteGetChild} MessageFsWriteGet
 */

// ---

/**
 * @typedef {Object} MessageUserFolderChild
 * @property {'/user/folder'} url
 * @typedef {MessageBase & MessageUserFolderChild} MessageUserFolder
 */

// ---

/** @typedef {MessageFsWriteGet | MessageUserFolder} Message */

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
        resolve(this.socket);
      };

      this.socket.onmessage = (event) => {
        console.log('Received message:', event.data);
        const parsedData = JSON.parse(event.data);
        // Assuming the server sends a 'correlationId' with every message
        if (parsedData.correlationId && this.responseResolvers.has(parsedData.correlationId)) {
          const resolver = this.responseResolvers.get(parsedData.correlationId);
          resolver?.(parsedData);
          this.responseResolvers.delete(parsedData.correlationId);
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
        reject(error);
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

  /** @param {Message} message */
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
   * @param {Message} message
   * @returns {Promise<any>}
   */
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

function getInstanceJs(parentClass, addonTriggers, C3) {
  return class extends parentClass {

    /**
     * @type {WebSocketClient}
     */
    WebSocketClient;

    /**
     * @type {string}
     */
    userFolder

    constructor() {
      super();

      const properties = this._getInitProperties();
      if (properties) {
      }
    }

    async _Initialize() {
      // Initialize the WebSocket connection
      console.log('on instance created');

      this.ws = new WebSocketClient('ws://localhost:31753', {
        maxReconnectAttempts: 3,
        reconnectInterval: 5000
      });

      await this.ws.connect();

      console.log('this.ws', this.ws)

      // Fetch user folder
      /** @type {Message} */
      const order = {
        url: '/user/folder',
        body: undefined
      }
      const userFolder = await this.ws.sendAndWaitForResponse(order)
      console.log('userFolder', userFolder)
      this.userFolder = userFolder

      // Fetch XXX
    }

    /**
     *
     * @param {string} path
     * @param {string} contents
     */
    _WriteText(path, contents) {
      console.log('Write text', arguments);

      /** @type {Message} */
      const order = {
        url: '/fs/write',
        body: {
          path,
          content: contents,
          overwrite: true,
          encoding: "utf8"
        }
      }

      this.ws?.sendAndWaitForResponse(order)
      console.log('this', this)
    }

    _UserFolder() {
      console.log('this', this)
      return this.userFolder
    }

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
