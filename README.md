<img src="./src/icon.svg" width="100" /><br>
# Pipelab <br>
A plugin that integrate with Pipelab <br>
<br>
Author: Armaldio <br>
Website: https://github.com/CynToolkit/construct-plugin <br>
Addon Url: https://github.com/CynToolkit/construct-plugin <br>
Download Latest Version : [Version: 1.7.1](https://github.com/CynToolkit/construct-plugin/releases/latest) <br>
<sub>Made using [c3ide2-framework](https://github.com/ConstructFund/c3ide2-framework) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
- [Paths](#paths)
---
## Usage
To build the addon, run the following commands:

```
npm i
node ./build.js
```

To run the dev server, run

```
npm i
node ./dev.js
```

The build uses the pluginConfig file to generate everything else.
The main files you may want to look at would be instance.js

## Examples Files
- [example](./examples/example.c3p)
</br>

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Initialize integration | Initialize the Pipelab integration |  |
| Append file | Appends the contents to the file. | Path             *(string)* <br>Contents             *(string)* <br> |
| Copy file | Copies the file. | Source             *(string)* <br>Destination             *(string)* <br>Overwrite             *(boolean)* <br> |
| Fetch file size | Fetch the size of the file. | Path             *(string)* <br> |
| Create folder | Creates the folder. | Path             *(string)* <br> |
| Delete file | Deletes the file. | Path             *(string)* <br>Recursive             *(boolean)* <br> |
| List files | Load a list of files in a given folder. Use expressions after this action to get the count and file names | Path             *(string)* <br>Recursive             *(boolean)* <br> |
| Move file | Moves the file. | Source             *(string)* <br>Destination             *(string)* <br>Overwrite             *(boolean)* <br> |
| Open browser | Opens the browser. | URL             *(string)* <br> |
| Read binary file | Reads a file into a Binary Data object. Triggers 'On binary file read' when completes. | Tag             *(string)* <br>Path             *(string)* <br>Destination             *(object)* <br> |
| Rename file | Renames the file. | Existing file             *(string)* <br>New name             *(string)* <br>Overwrite             *(boolean)* <br> |
| Run file | Runs the file. | Path             *(string)* <br> |
| Shell open | Opens the file in the shell. | Path             *(string)* <br> |
| Explorer open | Opens the path in the explorer. | Path             *(string)* <br> |
| Write binary file | Writes the binary file. | Tag             *(string)* <br>Path             *(string)* <br>Source             *(object)* <br> |
| Write text file | Writes the text file. | Path             *(string)* <br>Contents             *(string)* <br> |
| Write text file | Writes the text file. | Path             *(string)* <br>Contents             *(string)* <br> |
| Read text file | Reads the text file. | Path             *(string)* <br> |
| Check if the path exist | Check if the path exist. | Path             *(string)* <br> |
| Show folder dialog | Show a folder dialog |  |
| Show open dialog | Show an open dialog | Accept             *(string)* <br> |
| Show save dialog | Show a save dialog | Accept             *(string)* <br> |
| Maximize | Maximize the window |  |
| Minimize | Minimize the window |  |
| Restore | Restore the window (i.e. show again after minimizing) |  |
| Request attention | Start or stop requesting attention from the user, e.g. by flashing the title bar (depends on OS). | Mode             *(combo)* <br> |
| Set always on top | Enable or disable the window always being on top of other windows. | Mode             *(combo)* <br> |
| Set height | Set the height of the window. | Height             *(number)* <br> |
| Set maximum size | Set the maximum size of the window. | Max width             *(number)* <br>Max height             *(number)* <br> |
| Set minimum size | Set the minimum size of the window. | Max width             *(number)* <br>Max height             *(number)* <br> |
| Set resizable | Enable or disable the window resizing. | Resizable             *(combo)* <br> |
| Set title | Set the title of the window. | Title             *(string)* <br> |
| Set width | Set the width of the window. | Width             *(number)* <br> |
| Set x | Set the x position of the window. | X             *(number)* <br> |
| Set y | Set the y position of the window. | Y             *(number)* <br> |
| Show dev tools | Show or hide the dev tools. | Show             *(combo)* <br> |
| Unmaximize | Unmaximize the window |  |
| Set Fullscreen | Change fullscreen state | Fullscreen             *(combo)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| Is engine | Return true if the engine running the app is the one selected | Engine *(combo)* <br> |
| If last checked path exist | Return 'true' if the last checked path exists. 'false' otherwise |  |
| On folder dialog cancel | Triggered when the folder dialog is canceled |  |
| On folder dialog ok | Triggered after a folder chosen from a folder dialog |  |
| On open dialog cancel | Triggered when the open dialog is canceled |  |
| On open dialog ok | Triggered after a file chosen from a open dialog |  |
| On save dialog cancel | Triggered when the save dialog is canceled |  |
| On save dialog ok | Triggered after a file chosen from a save dialog |  |
| On any binary file read | Triggered when any binary file read completes. The 'FileTag' expression identifies the action. |  |
| On any binary file written | Triggered when any binary file write completes. The 'FileTag' expression identifies the action. |  |
| On binary file read | Triggered when binary file read completes. The data is then available in the Binary Data object. | Tag *(string)* <br> |
| On binary file written | Triggered when a binary file write completes. | Tag *(string)* <br> |
| On file dropped | Triggered when the user drag-and-drops a file to the window |  |
| On file system error | Triggered when a file operation fails. |  |
| On path verification | Triggered when a file verification result is available. | Path *(string)* <br>Tag *(string)* <br> |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| ArgumentAt | Get the argument at the given index. | string | Index *(number)* <br> | 
| ArgumentCount | Get the number of arguments. | number |  | 
| ChosenPath | Return the chosen path after a file dialog. | string |  | 
| AppFolderURL | Return the URL of the folder of the current app. | string |  | 
| DroppedFile | Return the dropped file after a file drop. | string |  | 
| FileError | Return the error message after a file operation fails. | string |  | 
| FileSize | Return the size of the file. | number |  | 
| FileTag | Return the tag of the action. | string |  | 
| ListAt | Get the file at the given index. | string | Index *(number)* <br> | 
| ListCount | Get the number of files in the folder. | number |  | 
| ProjectFilesFolder | Return the folder of the project files. | string |  | 
| ProjectFilesFolderURL | Return the URL of the folder of the project files. | string |  | 
| ReadFile | Return the contents of the file. | string |  | 
| UserFolder | Return the current User's folder | string |  | 
| HomeFolder | Return the current Home folder | string |  | 
| AppDataFolder | Return the current AppDataFolder folder | string |  | 
| LocalAppDataFolder | Return the current AppDataFolder folder | string |  | 
| UserDataFolder | Return the current UserDataFolder folder | string |  | 
| LocalUserDataFolder | Return the current LocalUserDataFolder folder | string |  | 
| SessionDataFolder | Return the current SessionDataFolder folder | string |  | 
| TempFolder | Return the current TempFolder folder | string |  | 
| ExeFolder | Return the current ExeFolder folder | string |  | 
| ModuleFolder | Return the current ModuleFolder folder | string |  | 
| DesktopFolder | Return the current DesktopFolder folder | string |  | 
| DocumentsFolder | Return the current DocumentsFolder folder | string |  | 
| DownloadsFolder | Return the current DownloadsFolder folder | string |  | 
| MusicFolder | Return the current MusicFolder folder | string |  | 
| PicturesFolder | Return the current PicturesFolder folder | string |  | 
| VideosFolder | Return the current VideosFolder folder | string |  | 
| RecentFolder | Return the current RecentFolder folder | string |  | 
| LogsFolder | Return the current LogsFolder folder | string |  | 
| CrashDumpsFolder | Return the current CrashDumpsFolder folder | string |  | 
| AppFolder | Return the folder of the current app. | string |  | 
| WindowHeight | Return the height of the window. | number |  | 
| WindowWidth | Return the width of the window. | number |  | 
| WindowTitle | Return the title of the window. | string |  | 
| WindowX | Return the x position of the window. | number |  | 
| WindowY | Return the y position of the window. | number |  | 

## Paths
**ProjectFilesFolder**: Direct path to your games's content
- Windows: `C:/Users/quent/AppData/Local/Temp/f0e3c24c1443adce014e5924d5f47e1b571c92e0f29d11d4/build/out/Pipelab-win32-x64/resources/app.asar/src/app`
- Linux: 
- MacOS: 

UserFolder: 
- Windows: ``
- Linux: 
- MacOS: 

HomeFolder: 
- Windows: C:/Users/quent
- Linux: 
- MacOS: 

AppDataFolder: 
- Windows: C:/Users/quent/AppData/Roaming
- Linux: 
- MacOS: 

LocalAppDataFolder: 
- Windows: ``
- Linux: 
- MacOS: 

UserDataFolder: 
- Windows: C:/Users/quent/AppData/Roaming/app
- Linux: 
- MacOS: 

LocalUserDataFolder: 
- Windows: ``
- Linux: 
- MacOS: 

SessionDataFolder: 
- Windows: ``
- Linux: 
- MacOS: 

TempFolder: 
- Windows: ``
- Linux: 
- MacOS: 

ExeFolder: 
- Windows: ``
- Linux: 
- MacOS: 

ModuleFolder: 
- Windows: ``
- Linux: 
- MacOS: 

DesktopFolder: 
- Windows: ``
- Linux: 
- MacOS: 

DocumentsFolder: 
- Windows: ``
- Linux: 
- MacOS: 

DownloadsFolder: 
- Windows: ``
- Linux: 
- MacOS: 

MusicFolder: 
- Windows: ``
- Linux: 
- MacOS: 

PicturesFolder: 
- Windows: ``
- Linux: 
- MacOS: 

VideosFolder: 
- Windows: ``
- Linux: 
- MacOS: 

RecentFolder: 
- Windows: ``
- Linux: 
- MacOS: 

LogsFolder: 
- Windows: ``
- Linux: 
- MacOS: 

CrashDumpsFolder: 
- Windows: C:/Users/quent/AppData/Roaming/app/Crashpad
- Linux: 
- MacOS: 

AppFolder: 
- Windows: 
- Linux: 
- MacOS: 

