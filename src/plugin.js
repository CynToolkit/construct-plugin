//<-- C3_INSTANCE -->

//<-- PLUGIN_INFO -->

/** @type {'v1' | 'v2'} */
let sdk = "v2"
//<-- SDK_VERSION -->

const camelCasedMap = new Map();

/**
 * @param {string} str
 */
function camelCasify(str) {
  // If the string is already camelCased, return it
  if (camelCasedMap.has(str)) {
    return camelCasedMap.get(str);
  }
  // Replace any non-valid JavaScript identifier characters with spaces
  let cleanedStr = str.replace(/[^a-zA-Z0-9$_]/g, " ");

  // Split the string on spaces
  let words = cleanedStr.split(" ").filter(Boolean);

  // Capitalize the first letter of each word except for the first one
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }

  // Join the words back together
  let result = words.join("");

  // If the first character is a number, prepend an underscore
  if (!isNaN(parseInt(result.charAt(0)))) {
    result = "_" + result;
  }

  camelCasedMap.set(str, result);

  return result;
}

let SDKPluginBaseVar = sdk === 'v1'
  ? C3.SDKPluginBase
  : globalThis.ISDKPluginBase

let SDKInstanceBaseVar = sdk === 'v1'
  ? C3.SDKInstanceBase
  : globalThis.ISDKInstanceBase

let SDKWorldInstanceBaseVar = sdk === 'v1'
  ? C3.SDKWorldInstanceBase
  : globalThis.ISDKWorldInstanceBase

let SDKDOMPluginBaseVar = sdk === 'v1'
  ? C3.SDKDOMPluginBase
  : globalThis.ISDKDOMPluginBase

let SDKDOMInstanceBaseVar = sdk === 'v1'
  ? C3.SDKDOMInstanceBase
  : globalThis.ISDKDOMInstanceBase

let InstanceVar = sdk === 'v1'
  ? self.IInstance
  : globalThis.IInstance

let WorldInstanceVar = sdk === 'v1'
  ? self.IWorldInstance
  : globalThis.IWorldInstance

let DOMInstanceVar = sdk === 'v1'
  ? self.IDOMInstance
  : globalThis.IDOMInstance

const parentClass = {
  object: {
    scripting: InstanceVar,
    instance: SDKInstanceBaseVar,
    plugin: SDKPluginBaseVar,
  },
  world: {
    scripting: WorldInstanceVar,
    instance: SDKWorldInstanceBaseVar,
    plugin: SDKPluginBaseVar,
  },
  dom: {
    scripting: DOMInstanceVar,
    instance: SDKDOMInstanceBaseVar,
    plugin: SDKDOMPluginBaseVar,
  },
};

if (sdk === 'v1') {
  C3.Plugins[PLUGIN_INFO.id] = class extends (
    parentClass[PLUGIN_INFO.type].plugin
  ) {
    Release() {
      super.Release();
    }
  };
} else {
  C3.Plugins[PLUGIN_INFO.id] = class extends (
    parentClass[PLUGIN_INFO.type].plugin
  ) {
    _release() {
      super._release();
    }
  };
}

let SDKObjectTypeBaseVar = sdk === 'v1'
  ? C3.SDKTypeBase
  : globalThis.ISDKObjectTypeBase

const P_C = C3.Plugins[PLUGIN_INFO.id];
if (sdk === 'v1') {
  P_C.Type = class extends SDKObjectTypeBaseVar {
    constructor(objectClass) {
      super(objectClass);
    }

    Release() {
      super.Release();
    }

    OnCreate() { }
  };
} else {
  P_C.Type = class extends SDKObjectTypeBaseVar {
    constructor(objectClass) {
      super(objectClass);
    }

    _release() {
      super._release();
    }

    _onCreate() { }
  };
}
const addonTriggers = [];

//============ ACES ============
P_C.Acts = {};
P_C.Cnds = {};
P_C.Exps = {};
Object.keys(PLUGIN_INFO.Acts).forEach((key) => {
  const ace = PLUGIN_INFO.Acts[key];
  P_C.Acts[camelCasify(key)] = function (...args) {
    return ace.forward
      ? ace.forward(this).call(this, ...args)
      : ace.handler.call(this, ...args);
  };
});
Object.keys(PLUGIN_INFO.Cnds).forEach((key) => {
  const ace = PLUGIN_INFO.Cnds[key];
  P_C.Cnds[camelCasify(key)] = function (...args) {
    return ace.forward
      ? ace.forward(this).call(this, ...args)
      : ace.handler.call(this, ...args);
  };
});
Object.keys(PLUGIN_INFO.Exps).forEach((key) => {
  const ace = PLUGIN_INFO.Exps[key];
  P_C.Exps[camelCasify(key)] = function (...args) {
    return ace.forward
      ? ace.forward(this).call(this, ...args)
      : ace.handler.call(this, ...args);
  };
});
//============ ACES ============

//<-- INSTANCE -->

P_C.Instance = class extends parentClass[PLUGIN_INFO.type].instance {
  constructor(opts) {
    if (PLUGIN_INFO.hasWrapperExtension) {
      opts.wrapperComponentId = PLUGIN_INFO.id;
      this._isWrapperExtensionAvailable = this.IsWrapperExtensionAvailable();
    }

    if (PLUGIN_INFO.hasDomSide) {
      super(opts, PLUGIN_INFO.id);
    } else {
      super(opts);
    }
  }

  _release() {
    super._release();
  }
};

P_C.Instance = getInstanceJs(P_C.Instance, addonTriggers, C3);
