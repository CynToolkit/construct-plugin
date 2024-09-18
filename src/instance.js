// @ts-check

/**
 * @typedef {Object} MessageBase
 * @property {string} url
 * @property {any} [body]
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
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      // Handle incoming messages here
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
      this.isConnected = false;
      this.reconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => this.connect(), this.reconnectInterval);
    } else {
      console.log('Max reconnect attempts reached. Giving up.');
    }
  }

  /** @param {Message} message */
  send(message) {
    if (this.isConnected) {
      if (this.socket) {
        this.socket.send(JSON.stringify(message));
      }
      else {
        console.warn("Cannot send message. WebSocket is undefined.");
      }
    } else {
      console.warn('Cannot send message. WebSocket is not connected.');
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

function getInstanceJs(parentClass, addonTriggers, C3) {
  return class extends parentClass {
    constructor() {
      super();

      console.log('on instance created');

      this.ws = new WebSocketClient('wss://echo.websocket.org', {
        maxReconnectAttempts: 3,
        reconnectInterval: 5000
      });

      this.ws.connect();

      console.log('this.ws', this.ws)

      const properties = this._getInitProperties();
      if (properties) {
      }
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

      this.ws.send(order)
    }

    _UserFolder() {
      console.log("User folder", arguments);

      /** @type {Message} */
      const order = {
        url: '/user/folder',
        body: undefined
      }

      this.ws.send(order)
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
