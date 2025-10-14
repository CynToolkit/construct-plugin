import pkg from '../package.json' with { type: 'json' };

/** @satisfies {import('c3ide2-types').ActionParamBase} */
const tagParameter = /** @type {const} */ ({
  id: 'tag',
  desc: "The tag",
  name: "Tag",
  type: 'string',
  initialValue: "\"\"",
})

// /**
//  * @template {string} V
//  * @template {import('./sdk.js').MyAction<import('./sdk.js').Categories, V>['params']} P
//  * @template {import('./sdk.js').ACEGeneratorParam<V, P>} W
//  * @param {W} data
//  */
/**
 * @template {string} NAME
 * @template {import('./sdk.js').ACEGeneratorParam<NAME, any>} ACTION_PARAMS
 * @param {ACTION_PARAMS} data
 * @param {NAME} name
 */
const ACEGenerator = (name, data) => {
  const { ...act } = data

  const syncParams = ([
    ...act.params ?? [],
    tagParameter,
  ])

  // /** @type {ReturnType<import('./sdk.js').ACEGenerator<V>>['actions']} */
  const actions = /** @type {const} */ ({
    [`${name}Sync`]:  ({
      ...act,
      forward: `_${name}Sync`,
      params: syncParams,
      description: `${act.description} (synchronous)`,
      displayText: `${act.displayText} ([b]{${act.params?.length}}[/b]) (synchronous)`,
      listName: `${act.listName} (synchronous)`,
    }),
    [name]:  ({
      ...act,
      forward: `_${name}`,
      isAsync: true,
    }),
  })

  const conditions = ({
    [`On${name}Success`]: ({
      category: act.category,
      deprecated: act.deprecated,
      highlight: act.highlight,
      description: `Trigger when the \"${name}\" is executed with success.`,
      displayText: `On "${name}" success ([b]{0}[/b])`,
      listName: `On "${name}" success`,
      params: [
        tagParameter,
      ],
      isTrigger: true,
      forward: `_On${name}Success`
    }),
    [`OnAny${name}Success`]: ({
      category: act.category,
      deprecated: act.deprecated,
      highlight: act.highlight,
      description: `Trigger when any of the \"${name}\" are executed with success.`,
      displayText: `On any "${name}" success`,
      listName: `On any "${name}" success`,
      params: [
      ],
      isTrigger: true,
      forward: `_OnAny${name}Success`
    }),
    [`On${name}Error`]: ({
      category: act.category,
      deprecated: act.deprecated,
      highlight: act.highlight,
      description: `Trigger when the \"${name}\" failed to execute.`,
      displayText: `On "${name}" error ([b]{0}[/b])`,
      listName: `On "${name}" error`,
      params: [
        tagParameter,
      ],
      isTrigger: true,
      forward: `_On${name}Error`
    }),
    [`OnAny${name}Error`]: ({
      category: act.category,
      deprecated: act.deprecated,
      highlight: act.highlight,
      description: `Trigger when any of the \"${name}\" failed to execute.`,
      displayText: `On any "${name}" error`,
      listName: `On any "${name}" error`,
      params: [],
      isTrigger: true,
      forward: `_OnAny${name}Error`
    }),
  })

  // /** @type {ReturnType<import('./sdk.js').ACEGenerator<(typeof data)['name']>>['expressions']} */
  const expressions = /** @type {const} */ ({
    [`${name}Error`]: /** @type {const} */ ({
      category: act.category,
      description: `The error of the "${name} last call"`,
      returnType: 'string',
      deprecated: act.deprecated,
      highlight: act.highlight,
      forward: `_${name}Error`,
    }),
    [`${name}Result`]: /** @type {const} */ ({
      category: act.category,
      description: `The result of the "${name} last call"`,
      returnType: 'string',
      deprecated: act.deprecated,
      highlight: act.highlight,
      forward: `_${name}Result`,
    }),
  })

  const result = ({
    actions,
    conditions,
    expressions,
  })

  /** @type {import('./sdk.js').ACEGeneratorResult<NAME, typeof result>} */
  // @ts-ignore
  const a = result
  return a
}

const Initialize = ACEGenerator('Initialize', /** @type {const} */ ({
  params: [],
  category: "general",
  highlight: false,
  deprecated: false,

  listName: "Initialize integration",
  displayText: "Initialize integration",
  description: "Initialize the Pipelab integration",
}))

const AppendFile = ACEGenerator('AppendFile', /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the file to append to.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'contents',
      desc: "The contents to append to the file.",
      name: "Contents",
      type: 'string',
      initialValue: "\"\"",
    },
  ],
  listName: "Append file",
  displayText: "Append [b]{0}[/b] to file [i]{1}[/i]",
  description: "Appends the contents to the file.",
}))

const CopyFile = ACEGenerator('CopyFile', /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'source',
      desc: "The path to the file to copy.",
      name: "Source",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'destination',
      desc: "The path to the destination file.",
      name: "Destination",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'overwrite',
      desc: "Weather to overwrite the destination file.",
      name: "Overwrite",
      type: 'boolean',
      initialValue: 'false',
    }
  ],
  listName: "Copy file",
  displayText: "Copy [b]{0}[/b] to [b]{1}[/b] (recursive: {2})",
  description: "Copies the file.",
}))

const FetchFileSize = ACEGenerator("FetchFileSize", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the file to fetch the size.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Fetch file size",
  displayText: "Fetch file size of [b]{0}[/b]",
  description: "Fetch the size of the file.",
}))

const CreateFolder = ACEGenerator("CreateFolder", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the folder to create.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Create folder",
  displayText: "Create folder [b]{0}[/b]",
  description: "Creates the folder.",
}))
const DeleteFile = ACEGenerator("DeleteFile", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the file to delete.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'recursive',
      desc: "Weather to remove files recursively.",
      name: "Recursive",
      type: 'boolean',
      initialValue: 'false',
    }
  ],
  listName: "Delete file",
  displayText: "Delete file [b]{0}[/b] (recursive: {1})",
  description: "Deletes the file.",
}))

const ListFiles = ACEGenerator("ListFiles", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the folder to list.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'recursive',
      desc: "Weather to list files recursively.",
      name: "Recursive",
      type: 'boolean',
      initialValue: 'false',
    }
  ],
  listName: "List files",
  displayText: "List files in [b]{0}[/b] (recursive: {1})",
  description: "Load a list of files in a given folder. Use expressions after this action to get the count and file names",
}))

const MoveFile = ACEGenerator("MoveFile", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'source',
      desc: "The path to the file to move.",
      name: "Source",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'destination',
      desc: "The path to the destination file.",
      name: "Destination",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'overwrite',
      desc: "Weather to overwrite the destination file.",
      name: "Overwrite",
      type: 'boolean',
      initialValue: 'false',
    }
  ],
  listName: "Move file",
  displayText: "Move [b]{0}[/b] to [b]{1}[/b] (overwrite: {2})",
  description: "Moves the file.",
}))
const OpenBrowser = ACEGenerator("OpenBrowser", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'url',
      desc: "The URL to open.",
      name: "URL",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Open browser",
  displayText: "Open browser to [b]{0}[/b]",
  description: "Opens the browser.",
}))

const ReadBinaryFile = ACEGenerator("ReadBinaryFile", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the file to read.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: "destination",
      desc: "The Binary Data object to store the file contents.",
      name: "Destination",
      type: 'object',
      allowedPluginIds: ['BinaryData']
    }
  ],
  listName: "Read binary file",
  displayText: "Read binary file [b]{0}[/b] into [b]{1}[/b]",
  description: "Reads a file into a Binary Data object. Triggers 'On binary file read' when completes.",
}))

const RenameFile = ACEGenerator("RenameFile", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'source',
      desc: "The path to rename.",
      name: "Existing file",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'destination',
      desc: "The new file name.",
      name: "New name",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'overwrite',
      desc: "Weather to overwrite the destination file.",
      name: "Overwrite",
      type: 'boolean',
      initialValue: 'false',
    }
  ],
  listName: "Rename file",
  displayText: "Rename [b]{0}[/b] to [b]{1}[/b] (overwrite: {2})",
  description: "Renames the file.",
}))

const RunFile = ACEGenerator("RunFile", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "Enter the path of the file to execute. This can also include space-separated arguments. To execute a path wtih spaces in it, wrap in double-quotes (e.g. \"\"\" C:\\Program Files\\file.exe\"\"\"",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Run file",
  displayText: "Run file [b]{0}[/b]",
  description: "Runs the file.",
}))

const ShellOpen = ACEGenerator("ShellOpen", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the file to open. The default app associated with the file type will be used.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Shell open",
  displayText: "Shell open [b]{0}[/b]",
  description: "Opens the file in the shell.",
}))

const ExplorerOpen = ACEGenerator("ExplorerOpen", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to show in the default explorer.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Explorer open",
  displayText: "Explorer open [b]{0}[/b]",
  description: "Opens the path in the explorer.",
}))

const WriteBinaryFile = ACEGenerator("WriteBinaryFile", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the file to write.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'source',
      desc: "The Binary Data object to read the file contents from.",
      name: "Source",
      type: 'object',
      allowedPluginIds: ['BinaryData']
    }
  ],
  listName: "Write binary file",
  displayText: "Write binary file [b]{0}[/b] from [b]{1}[/b]",
  description: "Writes the binary file.",
}))

const WriteTextFile = ACEGenerator("WriteTextFile", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the file to write.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'contents',
      desc: "The contents to write to the file.",
      name: "Contents",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Write text file",
  displayText: "Write text file [b]{1}[/b] to [b]{0}[/b]",
  description: "Writes the text file.",
}))

const WriteText = ACEGenerator("WriteText", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: true,
  params: [
    {
      id: 'path',
      desc: "The path to the file to write.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'contents',
      desc: "The contents to write to the file.",
      name: "Contents",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Write text file",
  displayText: "Write text file [b]{0}[/b] to [b]{1}[/b]",
  description: "Writes the text file.",
}))

const ReadTextFile = ACEGenerator("ReadTextFile", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to the file to read.",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  description: "Reads the text file.",
  listName: "Read text file",
  displayText: "Read text file [b]{0}[/b]",
}))

const CheckIfPathExist = ACEGenerator("CheckIfPathExist", /** @type {const} */ ({
  category: "filesystem",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'path',
      desc: "The path to check",
      name: "Path",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  description: "Check if the path exist.",
  listName: "Check if the path exist",
  displayText: "Check if path [b]{0}[/b] exists",
}))

// file-dialogs
const ShowFolderDialog = ACEGenerator("ShowFolderDialog", /** @type {const} */ ({
  category: "file-dialogs",
  highlight: false,
  deprecated: false,
  params: [],
  listName: "Show folder dialog",
  displayText: "Show folder dialog",
  description: "Show a folder dialog",
}))

const ShowOpenDialog = ACEGenerator("ShowOpenDialog", /** @type {const} */ ({
  category: "file-dialogs",
  highlight: false,
  deprecated: false,
  listName: "Show open dialog",
  displayText: "Show open dialog {0}",
  description: "Show an open dialog",
  params: [
    {
      id: 'accept',
      desc: "The file types to accept.",
      name: "Accept",
      type: 'string',
      initialValue: "\"\"",
    }
  ]
}))

const ShowSaveDialog = ACEGenerator("ShowSaveDialog", /** @type {const} */ ({
  category: "file-dialogs",
  highlight: false,
  deprecated: false,
  listName: "Show save dialog",
  displayText: "Show save dialog {0}",
  description: "Show a save dialog",
  params: [
    {
      id: 'accept',
      desc: "The file types to accept.",
      name: "Accept",
      type: 'string',
      initialValue: "\"\"",
    }
  ]
}))

// window

const Maximize = ACEGenerator("Maximize", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [],
  listName: "Maximize",
  displayText: "Maximize window",
  description: "Maximize the window",
}))

const Minimize = ACEGenerator("Minimize", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [],
  listName: "Minimize",
  displayText: "Minimize window",
  description: "Minimize the window",
}))

const Restore = ACEGenerator("Restore", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [],
  listName: "Restore",
  displayText: "Restore window",
  description: "Restore the window (i.e. show again after minimizing)",
}))

const RequestAttention = ACEGenerator("RequestAttention", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,

  listName: "Request attention",
  displayText: "Request window attention with mode {0}",
  description: "Start or stop requesting attention from the user, e.g. by flashing the title bar (depends on OS).",
  params: [
    {
      id: 'mode',
      desc: "Whether to request attention or cancel a previous request for Attention.",
      name: "Mode",
      type: 'combo',
      items: [
        { "request": "Request attention" },
        { "cancel": "Stop requesting attention" },
      ]
    }
  ]
}))

const SetAlwaysOnTop = ACEGenerator("SetAlwaysOnTop", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'mode',
      desc: "Whether to enable or disable the window always being on top.",
      name: "Mode",
      type: 'combo',
      items: [
        { "disable": "Always on top" },
        { "enable": "Not always on top" },
      ]
    }
  ],
  listName: "Set always on top",
  displayText: "Set always on top to {0}",
  description: "Enable or disable the window always being on top of other windows.",
}))

const SetHeight = ACEGenerator("SetHeight", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'height',
      desc: "The new height of the window.",
      name: "Height",
      type: 'number',
      initialValue: 0,
    }
  ],
  listName: "Set height",
  displayText: "Set window height to {0}",
  description: "Set the height of the window.",
}))

const SetMaximumSize = ACEGenerator("SetMaximumSize", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'width',
      desc: "The maximum window width to set, in pixels.",
      name: "Max width",
      type: 'number',
      initialValue: 0,
    },
    {
      id: 'height',
      desc: "The maximum window height to set, in pixels.",
      name: "Max height",
      type: 'number',
      initialValue: 0,
    }
  ],
  listName: "Set maximum size",
  displayText: "Set maximum size to [b]{0}[/b] x [b]{1}[/b]",
  description: "Set the maximum size of the window.",
}))

const SetMinimumSize = ACEGenerator("SetMinimumSize", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'width',
      desc: "The minimum window width to set, in pixels.",
      name: "Max width",
      type: 'number',
      initialValue: 0,
    },
    {
      id: 'height',
      desc: "The minimum window height to set, in pixels.",
      name: "Max height",
      type: 'number',
      initialValue: 0,
    }
  ],
  listName: "Set minimum size",
  displayText: "Set minimum size to [b]{0}[/b] x [b]{1}[/b]",
  description: "Set the minimum size of the window.",
}))

const SetResizable = ACEGenerator("SetResizable", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'resizable',
      desc: "Whether to enable or disable the window resizing.",
      name: "Resizable",
      type: 'combo',
      items: [
        { "disable": "Resizable" },
        { "enable": "Not resizable" },
      ]
    }
  ],
  listName: "Set resizable",
  displayText: "Set window {0}",
  description: "Enable or disable the window resizing.",
}))

const SetTitle = ACEGenerator("SetTitle", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'title',
      desc: "A string to display in the title bar.",
      name: "Title",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Set title",
  displayText: "Set window title to [b]{0}[/b]",
  description: "Set the title of the window.",
}))

const SetWidth = ACEGenerator("SetWidth", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'width',
      desc: "The new width of the window.",
      name: "Width",
      type: 'number',
      initialValue: 0,
    }
  ],
  listName: "Set width",
  displayText: "Set window width to {0}",
  description: "Set the width of the window.",
}))

const SetX = ACEGenerator("SetX", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'x',
      desc: "The new x position of the window.",
      name: "X",
      type: 'number',
      initialValue: 0,
    }
  ],
  listName: "Set x",
  displayText: "Set window X position to {0}",
  description: "Set the x position of the window.",
}))

const SetY = ACEGenerator("SetY", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'y',
      desc: "The new y position of the window.",
      name: "Y",
      type: 'number',
      initialValue: 0,
    }
  ],
  listName: "Set y",
  displayText: "Set window Y position to {0}",
  description: "Set the y position of the window.",
}))

const ShowDevTools = ACEGenerator("ShowDevTools", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'show',
      desc: "Whether to show or hide the dev tools.",
      name: "Show",
      type: 'combo',
      items: [
        { "hide": "Hide dev tools" },
        { "show": "Show dev tools" },
      ]
    }
  ],
  listName: "Show dev tools",
  displayText: "Set devtool to {0}",
  description: "Show or hide the dev tools.",
}))

const a = ShowDevTools.actions.ShowDevTools.params

const Unmaximize = ACEGenerator("Unmaximize", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [],
  listName: "Unmaximize",
  displayText: "Unmaximize window",
  description: "Unmaximize the window",
}))

const SetFullscreen = ACEGenerator("SetFullscreen", /** @type {const} */ ({
  category: "window",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'fullscreen',
      desc: "Whether to set fullscreen or not.",
      name: "Fullscreen",
      type: 'combo',
      items: [
        { "normal": "Normal" },
        { "fullscreen": "Fullscreen" },
      ]
    }
  ],
  listName: "Set Fullscreen",
  displayText: "Set fullscreen state to \"{0}\"",
  description: "Change fullscreen state",
}))

// steam
const ActivateAchievement = ACEGenerator("ActivateAchievement", /** @type {const} */ ({
  category: "steam",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'achievement',
      desc: "The achievement to activate",
      name: "Achievement",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Activate achievement",
  displayText: "Activate achievement [b]{0}[/b]",
  description: "Activate a steam achievement",
}))

const ClearAchievement = ACEGenerator("ClearAchievement", /** @type {const} */ ({
  category: "steam",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'achievement',
      desc: "The achievement to clear",
      name: "Achievement",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Clear achievement",
  displayText: "Clear achievement [b]{0}[/b]",
  description: "Clear a steam achievement",
}))
const CheckAchievementActivationState = ACEGenerator("CheckAchievementActivationState", /** @type {const} */ ({
  category: "steam",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'achievement',
      desc: "The achievement to check",
      name: "Achievement",
      type: 'string',
      initialValue: "\"\"",
    }
  ],
  listName: "Check achievement activation state",
  displayText: "Check achievement [b]{0}[/b] activation state",
  description: "Check the activation state of a steam achievement",
}))
const SetRichPresence = ACEGenerator("SetRichPresence", /** @type {const} */ ({
  category: "steam",
  displayText: "Set rich presence {0} to {1}",
  listName: "Set rich presence",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'key',
      desc: "The key of the rich presence.",
      name: "Key",
      type: 'string',
    },
    {
      id: 'value',
      desc: "The value of the rich presence.",
      name: "Value",
      type: 'string',
    }
  ],
  description: "Set the rich presence of the local player.",
}))

const LeaderboardUploadScoreWithMetadata = ACEGenerator("LeaderboardUploadScoreWithMetadata", /** @type {const} */ ({
  category: "steam",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'leaderboard',
      desc: "The leaderboard name",
      name: "Leaderboard",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'score',
      desc: "The score to upload",
      name: "Score",
      type: 'number',
      initialValue: "0",
    },
    {
      id: 'metadata',
      desc: "The metadata to upload alsong the score",
      name: "Metadata",
      type: 'object',
      allowedPluginIds: ['Arr']
    },
    {
      id: 'uploadType',
      desc: "Whether to force the score to change, or keep the previous score if it was better?",
      name: "Upload type",
      type: 'combo',
      items: [
        { "keepBest": "Keep the best" },
        { "overwrite": "Overwrite" },
      ]
    }
  ],
  listName: "Upload score with metadata",
  displayText: "Upload score [b]{1}[/b] to leaderboard {0} (type={3}, meta={2})",
  description: "Upload a score to a leaderboard with metadata"
}))

const LeaderboardUploadScore = ACEGenerator("LeaderboardUploadScore", /** @type {const} */ ({
  category: "steam",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'leaderboard',
      desc: "The leaderboard name",
      name: "Leaderboard",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'score',
      desc: "The score to upload",
      name: "Score",
      type: 'number',
      initialValue: "0",
    },
    {
      id: 'uploadType',
      desc: "Whether to force the score to change, or keep the previous score if it was better?",
      name: "Upload type",
      type: 'combo',
      items: [
        { "keepBest": "Keep the best" },
        { "overwrite": "Overwrite" },
      ]
    }
  ],
  listName: "Upload score",
  displayText: "Upload score [b]{1}[/b] to leaderboard {0} (type={2})",
  description: "Upload a score to a leaderboard"
}))

const LeaderboardDownloadScore = ACEGenerator("LeaderboardDownloadScore", /** @type {const} */ ({
  category: "steam",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'leaderboard',
      desc: "The leaderboard name",
      name: "Leaderboard",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'downloadType',
      desc: "The type of data you want to query",
      name: "Download type",
      type: 'combo',
      items: [
        { "regular": "Regular" },
        { "around": "Around the user" },
        { "friends": "Friends" },
      ]
    },
    {
      id: 'start',
      desc: "The offset start",
      name: "Start",
      type: 'number',
      initialValue: "0",
    },
    {
      id: 'end',
      desc: "The offset end",
      name: "End",
      type: 'number',
      initialValue: "0",
    },
    {
      id: 'output',
      desc: "The output object",
      name: "Output",
      type: 'object',
      allowedPluginIds: ['Json']
    },
  ],
  listName: "Download scores",
  displayText: "Download scores from leaderboard {0} (type={1}, {2}..{3}) into {4}",
  description: "Download scores from a leaderboard\nWhen Download type is Regular, offset are absolute.\nWhen Download type is Around the user, the offsets are the amount of entries around the user to fetch."
}))

// Discord

const DiscordSetActivity = ACEGenerator("DiscordSetActivity", /** @type {const} */ ({
  category: "discord",
  displayText: "Set activity {0} to {1} ({2}, {3}, {4}, {5}, {6})",
  listName: "Set activity",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'details',
      desc: "Activity details",
      name: "Details",
      type: 'string',
    },
    {
      id: 'state',
      desc: "The state of the activity (ex: in a party).",
      name: "State",
      type: 'string',
    },
    {
      id: 'startTimestamp',
      desc: "The timestamp the activity started (ex: 1742458171).",
      name: "Start Timestamp",
      type: 'string',
    },
    {
      id: 'largeImageKey',
      desc: "The key of the large image to display (ex: c3-large).",
      name: "Large image key",
      type: 'string',
    },
    {
      id: 'largeImageText',
      desc: "The text displayed when hovering the large image.",
      name: "Large image text",
      type: 'string',
    },
    {
      id: 'smallImageKey',
      desc: "The key of the small image to display (ex: c3-small).",
      name: "Small image key",
      type: 'string',
    },
    {
      id: 'smallImageText',
      desc: "The text displayed when hovering the small image.",
      name: "Small image text",
      type: 'string',
    }
  ],
  description: "Set the discord activity (aka Rich presence).",
}))

const ActivateToWebPage = ACEGenerator("ActivateToWebPage", /** @type {const} */ ({
  category: "steam",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'url',
      desc: "The webpage to open. A fully qualified address with the protocol is required (e.g. 'http://www.steampowered.com')",
      name: "URL",
      type: 'string',
      initialValue: "\"\"",
    },
    {
      id: 'mode',
      desc: "Mode for the web page.",
      name: "Mode",
      type: 'combo',
      items: [
        { "default": "Default" },
        { "modal": "Modal" },
      ]
    }
  ],
  listName: "Activate Steam overlay to web page",
  displayText: "Activate Steam overlay to web page [b]{0}[/b] (mode: {1})",
  description: "Activates Steam Overlay web browser directly to the specified URL",
}))

const ActivateToStore = ACEGenerator("ActivateToStore", /** @type {const} */ ({
  category: "steam",
  highlight: false,
  deprecated: false,
  params: [
    {
      id: 'appId',
      desc: "The app ID to show the store page of",
      name: "App ID",
      type: 'number',
      initialValue: "0",
    },
    {
      id: 'flag',
      desc: "Flags to modify the behavior when the page opens",
      name: "Flag",
      type: 'combo',
      items: [
        { "none": "None" },
        { "addToCartAndShow": "Add to cart and show" },
      ]
    }
  ],
  listName: "Activate Steam overlay to store",
  displayText: "Activate Steam overlay to store for app [b]{0}[/b] (flag: {1})",
  description: "Activates the Steam Overlay to the Steam store page for the provided app",
}))

/**
 * @satisfies {import('./sdk.js').Config<import('./sdk.js').Categories>}
 */
const Config = /** @type {const} */({
  addonType: "plugin",
  id: "pipelabv2",
  name: "Pipelab",
  version: pkg.version,
  category: "platform-specific",
  author: "Armaldio",
  website: "https://github.com/CynToolkit/construct-plugin",
  documentation: "https://github.com/CynToolkit/construct-plugin",
  description: "A plugin that integrate with Pipelab",
  addonUrl: "https://github.com/CynToolkit/construct-plugin", // displayed in auto-generated docs
  githubUrl: "https://github.com/CynToolkit/construct-plugin", // displays latest release version in auto-generated docs
  icon: "icon.png", // defaults to "icon.svg" if omitted
  type: "object", // world, object, dom
  domSideScripts: [
    "dom.js"
  ],
  fileDependencies: [
    /*
    {
      filename: "filename.js", // no need to include "c3runtime/" prefix
      type:
        "copy-to-output"
        "inline-script"
        "external-dom-script"
        "external-runtime-script"
        "external-css"

      // for copy-to-output only
      // fileType: "image/png"
    }
    */
  ],
  info: {
    // world only
    defaultImageUrl: undefined,
    Set: {
      // world only
      IsResizable: false,
      IsRotatable: false,
      Is3D: false,
      HasImage: false,
      IsTiled: false,
      SupportsZElevation: false,
      SupportsColor: false,
      SupportsEffects: false,
      MustPreDraw: false,

      // object only
      IsSingleGlobal: true,

      // world and object
      CanBeBundled: true,
      IsDeprecated: false,
      GooglePlayServicesEnabled: false,
    },
    AddCommonACEs: {
      // world only
      Position: false,
      SceneGraph: false,
      Size: false,
      Angle: false,
      Appearance: false,
      ZOrder: false,
    },
  },
  properties: [
    /*
    {
      type:
        "integer"
        "float"
        "percent"
        "text"
        "longtext"
        "check"
        "font"
        "combo"
        "color"
        "object"
        "group"
        "link"
        "info"

      id: "property_id",
      options: {
        initialValue: 0,
        interpolatable: false,

        // minValue: 0, // omit to disable
        // maxValue: 100, // omit to disable

        // for type combo only
        // items: [
        //   {itemId1: "item name1" },
        //   {itemId2: "item name2" },
        // ],

        // dragSpeedMultiplier: 1, // omit to disable

        // for type object only
        // allowedPluginIds: ["Sprite", "<world>"],

        // for type link only
        // linkCallback: `function(instOrObj) {}`,
        // linkText: "Link Text",
        // callbackType:
        //   "for-each-instance"
        //   "once-for-type"

        // for type info only
        // infoCallback: `function(inst) {}`,
      },
      name: "Property Name",
      desc: "Property Description",
    }
    */
  ],
  aceCategories: {
    general: "General",
    window: "Window",
    filesystem: "File system",
    'file-dialogs': "File Dialogs",
    'command-line': "Command line",
    'steam': "Steam",
    'discord': "Discord"
  },
  Acts: /** @type {const} */ {
    // general
    ...Initialize.actions,

    // filesystem
    ...AppendFile.actions,
    ...CopyFile.actions,
    ...FetchFileSize.actions,
    ...CreateFolder.actions,
    ...DeleteFile.actions,
    ...ListFiles.actions,
    ...MoveFile.actions,
    ...OpenBrowser.actions,
    ...ReadBinaryFile.actions,
    ...RenameFile.actions,
    ...RunFile.actions,
    ...ShellOpen.actions,
    ...ExplorerOpen.actions,
    ...WriteBinaryFile.actions,
    ...WriteTextFile.actions,
    ...WriteText.actions,
    ...ReadTextFile.actions,
    ...CheckIfPathExist.actions,
    ...ShowFolderDialog.actions,
    ...ShowOpenDialog.actions,
    ...ShowSaveDialog.actions,
    ...Maximize.actions,
    ...Minimize.actions,
    ...Restore.actions,
    ...RequestAttention.actions,
    ...SetAlwaysOnTop.actions,
    ...SetHeight.actions,
    ...SetMaximumSize.actions,
    ...SetMinimumSize.actions,
    ...SetResizable.actions,
    ...SetTitle.actions,
    ...SetWidth.actions,
    ...SetX.actions,
    ...SetY.actions,
    ...ShowDevTools.actions,
    ...Unmaximize.actions,
    ...SetFullscreen.actions,
    ...ActivateAchievement.actions,
    ...ClearAchievement.actions,
    ...CheckAchievementActivationState.actions,
    ...SetRichPresence.actions,
    ...DiscordSetActivity.actions,
    ...LeaderboardUploadScore.actions,
    ...LeaderboardUploadScoreWithMetadata.actions,
    ...LeaderboardDownloadScore.actions,
    ...ActivateToWebPage.actions,
    ...ActivateToStore.actions,
  },
  Cnds: {
    ...Initialize.conditions,
    ...AppendFile.conditions,
    ...CopyFile.conditions,
    ...FetchFileSize.conditions,
    ...CreateFolder.conditions,
    ...DeleteFile.conditions,
    ...ListFiles.conditions,
    ...MoveFile.conditions,
    ...OpenBrowser.conditions,
    ...ReadBinaryFile.conditions,
    ...RenameFile.conditions,
    ...RunFile.conditions,
    ...ShellOpen.conditions,
    ...ExplorerOpen.conditions,
    ...WriteBinaryFile.conditions,
    ...WriteTextFile.conditions,
    ...WriteText.conditions,
    ...ReadTextFile.conditions,
    ...CheckIfPathExist.conditions,
    ...ShowFolderDialog.conditions,
    ...ShowOpenDialog.conditions,
    ...ShowSaveDialog.conditions,
    ...Maximize.conditions,
    ...Minimize.conditions,
    ...Restore.conditions,
    ...RequestAttention.conditions,
    ...SetAlwaysOnTop.conditions,
    ...SetHeight.conditions,
    ...SetMaximumSize.conditions,
    ...SetMinimumSize.conditions,
    ...SetResizable.conditions,
    ...SetTitle.conditions,
    ...SetWidth.conditions,
    ...SetX.conditions,
    ...SetY.conditions,
    ...ShowDevTools.conditions,
    ...Unmaximize.conditions,
    ...SetFullscreen.conditions,
    ...ActivateAchievement.conditions,
    ...ClearAchievement.conditions,
    ...CheckAchievementActivationState.conditions,
    ...SetRichPresence.conditions,
    ...DiscordSetActivity.conditions,
    ...LeaderboardUploadScore.conditions,
    ...LeaderboardUploadScoreWithMetadata.conditions,
    ...LeaderboardDownloadScore.conditions,
    ...ActivateToWebPage.conditions,
    ...ActivateToStore.conditions,
    IsEngine: {
      category: "general",
      forward: "_IsEngine",
      highlight: false,
      deprecated: false,
      description: "Return true if the engine running the app is the one selected",
      displayText: "Is engine {0}",
      params: [
        {
          id: 'engine',
          desc: "The engine to check",
          name: "Engine",
          type: 'combo',
          items: [
            { "electron": "Electron" },
            { "tauri": "Tauri" }
          ]
        }
      ],
      listName: "Is engine",
    },

    IsInitialized: {
      category: "general",
      forward: "_IsInitialized",
      highlight: false,
      deprecated: false,
      description: "Returns true if the Pipelab integration has been initialized",
      displayText: "Is initialized",
      listName: "Is initialized",
      isInvertible: true,
      isTrigger: false,
      params: []
    },

    IsFullScreen: {
      category: "window",
      forward: "_IsFullScreen",
      highlight: false,
      deprecated: false,
      params: [
        {
          id: 'state',
          desc: "The state to check.",
          name: "State",
          type: 'combo',
          items: [
            { "normal": "Normal" },
            { "fullscreen": "Fullscreen" },
          ]
        }
      ],
      description: "Returns true if the window is in full screen mode.",
      displayText: "Is full screen {0}",
      listName: "Is full screen",
      isInvertible: true,
      isTrigger: false,
    },
    LastCheckedPathExists: {
      category: "filesystem",
      forward: "_LastCheckedPathExists",
      highlight: false,
      deprecated: false,
      params: [
      ],
      description: "Returns true if the last checked path exists.",
      displayText: "Last checked path exists",
      listName: "Last checked path exists",
      isInvertible: true,
      isTrigger: false,
    },
  },
  Exps: {
    ...Initialize.expressions,
    ...AppendFile.expressions,
    ...CopyFile.expressions,
    ...FetchFileSize.expressions,
    ...CreateFolder.expressions,
    ...DeleteFile.expressions,
    ...ListFiles.expressions,
    ...MoveFile.expressions,
    ...OpenBrowser.expressions,
    ...ReadBinaryFile.expressions,
    ...RenameFile.expressions,
    ...RunFile.expressions,
    ...ShellOpen.expressions,
    ...ExplorerOpen.expressions,
    ...WriteBinaryFile.expressions,
    ...WriteTextFile.expressions,
    ...WriteText.expressions,
    ...ReadTextFile.expressions,
    ...CheckIfPathExist.expressions,
    ...ShowFolderDialog.expressions,
    ...ShowOpenDialog.expressions,
    ...ShowSaveDialog.expressions,
    ...Maximize.expressions,
    ...Minimize.expressions,
    ...Restore.expressions,
    ...RequestAttention.expressions,
    ...SetAlwaysOnTop.expressions,
    ...SetHeight.expressions,
    ...SetMaximumSize.expressions,
    ...SetMinimumSize.expressions,
    ...SetResizable.expressions,
    ...SetTitle.expressions,
    ...SetWidth.expressions,
    ...SetX.expressions,
    ...SetY.expressions,
    ...ShowDevTools.expressions,
    ...Unmaximize.expressions,
    ...SetFullscreen.expressions,
    ...ActivateAchievement.expressions,
    ...ClearAchievement.expressions,
    ...CheckAchievementActivationState.expressions,
    ...SetRichPresence.expressions,
    ...DiscordSetActivity.expressions,
    ...LeaderboardUploadScore.expressions,
    ...LeaderboardUploadScoreWithMetadata.expressions,
    ...LeaderboardDownloadScore.expressions,
    ...ActivateToWebPage.expressions,
    ...ActivateToStore.expressions,

    // command line
    ArgumentAt: {
      category: "command-line",
      forward: "_ArgumentAt",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      params: [
        {
          id: 'index',
          desc: "The index of the argument to get.",
          name: "Index",
          type: 'number',
        }
      ],
      description: "Get the argument at the given index.",
    },
    ArgumentCount: {
      category: "command-line",
      forward: "_ArgumentCount",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Get the number of arguments.",
    },

    // file system
    AppFolderURL: {
      category: "filesystem",
      forward: "_AppFolderURL",
      highlight: false,
      deprecated: true,
      returnType: 'string',
      description: "Return the URL of the folder of the current app.",
    },
    DroppedFile: {
      category: "filesystem",
      forward: "_DroppedFile",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Return the dropped file after a file drop.",
    },
    ListAt: {
      category: "filesystem",
      forward: "_ListAt",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      params: [
        {
          id: 'index',
          desc: "The index of the file to get.",
          name: "Index",
          type: 'number',
        }
      ],
      description: "Get the file at the given index.",
    },
    ListCount: {
      category: "filesystem",
      forward: "_ListCount",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Get the number of files in the folder.",
    },
    ProjectFilesFolder: {
      category: "filesystem",
      forward: "_ProjectFilesFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Return the folder of the project files.",
    },
    ProjectFilesFolderURL: {
      category: "filesystem",
      forward: "_ProjectFilesFolderURL",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Return the URL of the folder of the project files.",
    },
    ReadFile: {
      category: "filesystem",
      forward: "_ReadFile",
      highlight: false,
      deprecated: true,
      returnType: 'string',
      description: "Return the contents of the file.",
    },

    // folders
    UserFolder: {
      category: "filesystem",
      forward: "_UserFolder",
      highlight: false,
      deprecated: true,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current User's folder",
    },

    HomeFolder: {
      category: "filesystem",
      forward: "_HomeFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current Home folder",
    },
    AppDataFolder: {
      category: "filesystem",
      forward: "_AppDataFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current AppDataFolder folder",
    },
    LocalAppDataFolder: {
      category: "filesystem",
      forward: "_LocalAppDataFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current AppDataFolder folder",
    },
    UserDataFolder: {
      category: "filesystem",
      forward: "_UserDataFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current UserDataFolder folder",
    },
    LocalUserDataFolder: {
      category: "filesystem",
      forward: "_LocalUserDataFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current LocalUserDataFolder folder",
    },
    SessionDataFolder: {
      category: "filesystem",
      forward: "_SessionDataFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current SessionDataFolder folder",
    },
    TempFolder: {
      category: "filesystem",
      forward: "_TempFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current TempFolder folder",
    },
    ExeFolder: {
      category: "filesystem",
      forward: "_ExeFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current ExeFolder folder",
    },
    ModuleFolder: {
      category: "filesystem",
      forward: "_ModuleFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current ModuleFolder folder",
    },
    DesktopFolder: {
      category: "filesystem",
      forward: "_DesktopFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current DesktopFolder folder",
    },
    DocumentsFolder: {
      category: "filesystem",
      forward: "_DocumentsFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current DocumentsFolder folder",
    },
    DownloadsFolder: {
      category: "filesystem",
      forward: "_DownloadsFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current DownloadsFolder folder",
    },
    MusicFolder: {
      category: "filesystem",
      forward: "_MusicFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current MusicFolder folder",
    },
    PicturesFolder: {
      category: "filesystem",
      forward: "_PicturesFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current PicturesFolder folder",
    },
    VideosFolder: {
      category: "filesystem",
      forward: "_VideosFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current VideosFolder folder",
    },
    RecentFolder: {
      category: "filesystem",
      forward: "_RecentFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current RecentFolder folder",
    },
    LogsFolder: {
      category: "filesystem",
      forward: "_LogsFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current LogsFolder folder",
    },
    CrashDumpsFolder: {
      category: "filesystem",
      forward: "_CrashDumpsFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      isVariadicParameters: false,
      description: "Return the current CrashDumpsFolder folder",
    },
    AppFolder: {
      category: "filesystem",
      forward: "_AppFolder",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Return the folder of the current app.",
    },

    // window
    WindowHeight: {
      category: "window",
      forward: "_WindowHeight",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Return the height of the window.",
    },
    WindowWidth: {
      category: "window",
      forward: "_WindowWidth",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Return the width of the window.",
    },
    WindowTitle: {
      category: "window",
      forward: "_WindowTitle",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Return the title of the window.",
    },
    WindowX: {
      category: "window",
      forward: "_WindowX",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Return the x position of the window.",
    },
    WindowY: {
      category: "window",
      forward: "_WindowY",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Return the y position of the window.",
    },
    FullscreenState: {
      category: "window",
      forward: "_FullscreenState",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Return the fullscreen state of the window.",
    },

    CurrentPlatform: {
      category: "general",
      forward: "_CurrentPlatform",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Get the current platform (e.g., 'win32', 'darwin', 'linux').",
    },
    CurrentArchitecture: {
      category: "general",
      forward: "_CurrentArchitecture",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Get the current architecture (e.g., 'x64', 'arm64').",
    },
    // Steam
    SteamAccountId: {
      category: "steam",
      forward: "_SteamAccountId",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Get the Steam account ID.",
    },
    SteamId32: {
      category: "steam",
      forward: "_SteamId32",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Get the Steam ID32.",
    },
    SteamId64: {
      category: "steam",
      forward: "_SteamId64",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Get the Steam ID64.",
    },
    SteamUsername: {
      category: "steam",
      forward: "_SteamUsername",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Get the Steam username.",
    },
    SteamLevel: {
      category: "steam",
      forward: "_SteamLevel",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Get the Steam level.",
    },
    SteamIpCountry: {
      category: "steam",
      forward: "_SteamIpCountry",
      highlight: false,
      deprecated: false,
      returnType: 'string',
      description: "Get the Steam IP country.",
    },
    SteamIsRunningOnSteamDeck: {
      category: "steam",
      forward: "_SteamIsRunningOnSteamDeck",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Return true if the app is running on a Steam Deck.",
    },
    SteamAppId: {
      category: "steam",
      forward: "_SteamAppId",
      highlight: false,
      deprecated: false,
      returnType: 'number',
      description: "Get the currently used Steam App ID.",
    },
  },
});

export default Config;