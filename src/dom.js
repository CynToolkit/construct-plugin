"use strict";
{
  // Update the DOM_COMPONENT_ID to be unique to your plugin.
  // It must match the value set in instance.js as well.

  //<-- DOM_COMPONENT_ID -->

  // This class handles messages from the runtime, which may be in a Web Worker.
  const HANDLER_CLASS = class extends self.DOMHandler {
    constructor(iRuntime) {
      super(iRuntime, DOM_COMPONENT_ID);

      this.AddRuntimeMessageHandlers([
        ["set-fullscreen", (e) => this._OnSetFullscreen(
            /** @type {import("./sdk.js").PostFullscreenState} */
            e
        )],
        ["get-fullscreen-state", () => this._OnGetFullscreenState()],
      ]);

      // Initialize fullscreen state
      /**
       * @type {import("./sdk.js").PostFullscreenState}
       */
      this._fullscreenState = { state: 0 };
      this._setupFullscreenListeners();
    }

    /**
     *
     * @param {import("./sdk.js").PostFullscreenState} toggle
     */
    _OnSetFullscreen(toggle) {
      if (toggle.state === 1) {
        document.documentElement.requestFullscreen();
      } else if (document.fullscreenEnabled) {
        document.exitFullscreen();
      }
    }

    /**
     *
     * @returns {import("./sdk.js").PostFullscreenState}
     */
    _OnGetFullscreenState() {
      return this._fullscreenState;
    }

    _setupFullscreenListeners() {
      document.addEventListener("fullscreenchange", () => {
        this._fullscreenState = document.fullscreenElement ? { state: 1 } : { state: 0 };
        this._NotifyFullscreenStateChanged();
      });
    }

    _NotifyFullscreenStateChanged() {
      this.PostToRuntime("fullscreen-state-changed", this._fullscreenState);
    }
  };

  self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
