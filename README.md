<img src="./src/icon.svg" width="100" /><br>
# Pipelab <br>
A plugin that integrate with Pipelab <br>
<br>
Author: Armaldio <br>
Website: https://github.com/CynToolkit/construct-plugin <br>
Addon Url: https://github.com/CynToolkit/construct-plugin <br>
Download Latest Version : [Version: 2.5.1](https://github.com/CynToolkit/construct-plugin/releases/latest) <br>
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
| Initialize integration (synchronous) | Initialize the Pipelab integration (synchronous) | Tag             *(string)* <br> |
| Initialize integration | Initialize the Pipelab integration |  |
| Append file (synchronous) | Appends the contents to the file. (synchronous) | Path             *(string)* <br>Contents             *(string)* <br>Tag             *(string)* <br> |
| Append file | Appends the contents to the file. | Path             *(string)* <br>Contents             *(string)* <br> |
| Copy file (synchronous) | Copies the file. (synchronous) | Source             *(string)* <br>Destination             *(string)* <br>Overwrite             *(boolean)* <br>Tag             *(string)* <br> |
| Copy file | Copies the file. | Source             *(string)* <br>Destination             *(string)* <br>Overwrite             *(boolean)* <br> |
| Fetch file size (synchronous) | Fetch the size of the file. (synchronous) | Path             *(string)* <br>Tag             *(string)* <br> |
| Fetch file size | Fetch the size of the file. | Path             *(string)* <br> |
| Create folder (synchronous) | Creates the folder. (synchronous) | Path             *(string)* <br>Recursive             *(boolean)* <br>Tag             *(string)* <br> |
| Create folder | Creates the folder. | Path             *(string)* <br>Recursive             *(boolean)* <br> |
| Delete file (synchronous) | Deletes the file. (synchronous) | Path             *(string)* <br>Recursive             *(boolean)* <br>Tag             *(string)* <br> |
| Delete file | Deletes the file. | Path             *(string)* <br>Recursive             *(boolean)* <br> |
| List files (synchronous) | Load a list of files in a given folder. Use expressions after this action to get the count and file names (synchronous) | Path             *(string)* <br>Recursive             *(boolean)* <br>Tag             *(string)* <br> |
| List files | Load a list of files in a given folder. Use expressions after this action to get the count and file names | Path             *(string)* <br>Recursive             *(boolean)* <br> |
| Move file (synchronous) | Moves the file. (synchronous) | Source             *(string)* <br>Destination             *(string)* <br>Overwrite             *(boolean)* <br>Tag             *(string)* <br> |
| Move file | Moves the file. | Source             *(string)* <br>Destination             *(string)* <br>Overwrite             *(boolean)* <br> |
| Open browser (synchronous) | Opens the browser. (synchronous) | URL             *(string)* <br>Tag             *(string)* <br> |
| Open browser | Opens the browser. | URL             *(string)* <br> |
| Read binary file (synchronous) | Reads a file into a Binary Data object. Triggers 'On binary file read' when completes. (synchronous) | Path             *(string)* <br>Destination             *(object)* <br>Tag             *(string)* <br> |
| Read binary file | Reads a file into a Binary Data object. Triggers 'On binary file read' when completes. | Path             *(string)* <br>Destination             *(object)* <br> |
| Rename file (synchronous) | Renames the file. (synchronous) | Existing file             *(string)* <br>New name             *(string)* <br>Overwrite             *(boolean)* <br>Tag             *(string)* <br> |
| Rename file | Renames the file. | Existing file             *(string)* <br>New name             *(string)* <br>Overwrite             *(boolean)* <br> |
| Run file (synchronous) | Runs the file. (synchronous) | Path             *(string)* <br>Tag             *(string)* <br> |
| Run file | Runs the file. | Path             *(string)* <br> |
| Shell open (synchronous) | Opens the file in the shell. (synchronous) | Path             *(string)* <br>Tag             *(string)* <br> |
| Shell open | Opens the file in the shell. | Path             *(string)* <br> |
| Explorer open (synchronous) | Opens the path in the explorer. (synchronous) | Path             *(string)* <br>Tag             *(string)* <br> |
| Explorer open | Opens the path in the explorer. | Path             *(string)* <br> |
| Write binary file (synchronous) | Writes the binary file. (synchronous) | Path             *(string)* <br>Source             *(object)* <br>Tag             *(string)* <br> |
| Write binary file | Writes the binary file. | Path             *(string)* <br>Source             *(object)* <br> |
| Write text file (synchronous) | Writes the text file. (synchronous) | Path             *(string)* <br>Contents             *(string)* <br>Tag             *(string)* <br> |
| Write text file | Writes the text file. | Path             *(string)* <br>Contents             *(string)* <br> |
| Write text file (synchronous) | Writes the text file. (synchronous) | Path             *(string)* <br>Contents             *(string)* <br>Tag             *(string)* <br> |
| Write text file | Writes the text file. | Path             *(string)* <br>Contents             *(string)* <br> |
| Read text file (synchronous) | Reads the text file. (synchronous) | Path             *(string)* <br>Tag             *(string)* <br> |
| Read text file | Reads the text file. | Path             *(string)* <br> |
| Check if the path exist (synchronous) | Check if the path exist. (synchronous) | Path             *(string)* <br>Tag             *(string)* <br> |
| Check if the path exist | Check if the path exist. | Path             *(string)* <br> |
| Show folder dialog (synchronous) | Show a folder dialog (synchronous) | Tag             *(string)* <br> |
| Show folder dialog | Show a folder dialog |  |
| Show open dialog (synchronous) | Show an open dialog (synchronous) | Accept             *(string)* <br>Tag             *(string)* <br> |
| Show open dialog | Show an open dialog | Accept             *(string)* <br> |
| Show save dialog (synchronous) | Show a save dialog (synchronous) | Accept             *(string)* <br>Tag             *(string)* <br> |
| Show save dialog | Show a save dialog | Accept             *(string)* <br> |
| Maximize (synchronous) | Maximize the window (synchronous) | Tag             *(string)* <br> |
| Maximize | Maximize the window |  |
| Minimize (synchronous) | Minimize the window (synchronous) | Tag             *(string)* <br> |
| Minimize | Minimize the window |  |
| Restore (synchronous) | Restore the window (i.e. show again after minimizing) (synchronous) | Tag             *(string)* <br> |
| Restore | Restore the window (i.e. show again after minimizing) |  |
| Request attention (synchronous) | Start or stop requesting attention from the user, e.g. by flashing the title bar (depends on OS). (synchronous) | Mode             *(combo)* <br>Tag             *(string)* <br> |
| Request attention | Start or stop requesting attention from the user, e.g. by flashing the title bar (depends on OS). | Mode             *(combo)* <br> |
| Set always on top (synchronous) | Enable or disable the window always being on top of other windows. (synchronous) | Mode             *(combo)* <br>Tag             *(string)* <br> |
| Set always on top | Enable or disable the window always being on top of other windows. | Mode             *(combo)* <br> |
| Set height (synchronous) | Set the height of the window. (synchronous) | Height             *(number)* <br>Tag             *(string)* <br> |
| Set height | Set the height of the window. | Height             *(number)* <br> |
| Set maximum size (synchronous) | Set the maximum size of the window. (synchronous) | Max width             *(number)* <br>Max height             *(number)* <br>Tag             *(string)* <br> |
| Set maximum size | Set the maximum size of the window. | Max width             *(number)* <br>Max height             *(number)* <br> |
| Set minimum size (synchronous) | Set the minimum size of the window. (synchronous) | Max width             *(number)* <br>Max height             *(number)* <br>Tag             *(string)* <br> |
| Set minimum size | Set the minimum size of the window. | Max width             *(number)* <br>Max height             *(number)* <br> |
| Set resizable (synchronous) | Enable or disable the window resizing. (synchronous) | Resizable             *(combo)* <br>Tag             *(string)* <br> |
| Set resizable | Enable or disable the window resizing. | Resizable             *(combo)* <br> |
| Set title (synchronous) | Set the title of the window. (synchronous) | Title             *(string)* <br>Tag             *(string)* <br> |
| Set title | Set the title of the window. | Title             *(string)* <br> |
| Set width (synchronous) | Set the width of the window. (synchronous) | Width             *(number)* <br>Tag             *(string)* <br> |
| Set width | Set the width of the window. | Width             *(number)* <br> |
| Set x (synchronous) | Set the x position of the window. (synchronous) | X             *(number)* <br>Tag             *(string)* <br> |
| Set x | Set the x position of the window. | X             *(number)* <br> |
| Set y (synchronous) | Set the y position of the window. (synchronous) | Y             *(number)* <br>Tag             *(string)* <br> |
| Set y | Set the y position of the window. | Y             *(number)* <br> |
| Show dev tools (synchronous) | Show or hide the dev tools. (synchronous) | Show             *(combo)* <br>Tag             *(string)* <br> |
| Show dev tools | Show or hide the dev tools. | Show             *(combo)* <br> |
| Unmaximize (synchronous) | Unmaximize the window (synchronous) | Tag             *(string)* <br> |
| Unmaximize | Unmaximize the window |  |
| Set Fullscreen (synchronous) | Change fullscreen state (synchronous) | Fullscreen             *(combo)* <br>Tag             *(string)* <br> |
| Set Fullscreen | Change fullscreen state | Fullscreen             *(combo)* <br> |
| Activate achievement (synchronous) | Activate a steam achievement (synchronous) | Achievement             *(string)* <br>Tag             *(string)* <br> |
| Activate achievement | Activate a steam achievement | Achievement             *(string)* <br> |
| Clear achievement (synchronous) | Clear a steam achievement (synchronous) | Achievement             *(string)* <br>Tag             *(string)* <br> |
| Clear achievement | Clear a steam achievement | Achievement             *(string)* <br> |
| Check achievement activation state (synchronous) | Check the activation state of a steam achievement (synchronous) | Achievement             *(string)* <br>Tag             *(string)* <br> |
| Check achievement activation state | Check the activation state of a steam achievement | Achievement             *(string)* <br> |
| Set rich presence (synchronous) | Set the rich presence of the local player. (synchronous) | Key             *(string)* <br>Value             *(string)* <br>Tag             *(string)* <br> |
| Set rich presence | Set the rich presence of the local player. | Key             *(string)* <br>Value             *(string)* <br> |
| Set activity (synchronous) | Set the discord activity (aka Rich presence). (synchronous) | Details             *(string)* <br>State             *(string)* <br>Start Timestamp             *(string)* <br>Large image key             *(string)* <br>Large image text             *(string)* <br>Small image key             *(string)* <br>Small image text             *(string)* <br>Tag             *(string)* <br> |
| Set activity | Set the discord activity (aka Rich presence). | Details             *(string)* <br>State             *(string)* <br>Start Timestamp             *(string)* <br>Large image key             *(string)* <br>Large image text             *(string)* <br>Small image key             *(string)* <br>Small image text             *(string)* <br> |
| Upload score (synchronous) | Upload a score to a leaderboard (synchronous) | Leaderboard             *(string)* <br>Score             *(number)* <br>Upload type             *(combo)* <br>Tag             *(string)* <br> |
| Upload score | Upload a score to a leaderboard | Leaderboard             *(string)* <br>Score             *(number)* <br>Upload type             *(combo)* <br> |
| Upload score with metadata (synchronous) | Upload a score to a leaderboard with metadata (synchronous) | Leaderboard             *(string)* <br>Score             *(number)* <br>Metadata             *(object)* <br>Upload type             *(combo)* <br>Tag             *(string)* <br> |
| Upload score with metadata | Upload a score to a leaderboard with metadata | Leaderboard             *(string)* <br>Score             *(number)* <br>Metadata             *(object)* <br>Upload type             *(combo)* <br> |
| Download scores (synchronous) | Download scores from a leaderboard
When Download type is Regular, offset are absolute.
When Download type is Around the user, the offsets are the amount of entries around the user to fetch. (synchronous) | Leaderboard             *(string)* <br>Download type             *(combo)* <br>Start             *(number)* <br>End             *(number)* <br>Output             *(object)* <br>Tag             *(string)* <br> |
| Download scores | Download scores from a leaderboard
When Download type is Regular, offset are absolute.
When Download type is Around the user, the offsets are the amount of entries around the user to fetch. | Leaderboard             *(string)* <br>Download type             *(combo)* <br>Start             *(number)* <br>End             *(number)* <br>Output             *(object)* <br> |
| Activate Steam overlay to web page (synchronous) | Activates Steam Overlay web browser directly to the specified URL (synchronous) | URL             *(string)* <br>Mode             *(combo)* <br>Tag             *(string)* <br> |
| Activate Steam overlay to web page | Activates Steam Overlay web browser directly to the specified URL | URL             *(string)* <br>Mode             *(combo)* <br> |
| Activate Steam overlay to store (synchronous) | Activates the Steam Overlay to the Steam store page for the provided app (synchronous) | App ID             *(number)* <br>Flag             *(combo)* <br>Tag             *(string)* <br> |
| Activate Steam overlay to store | Activates the Steam Overlay to the Steam store page for the provided app | App ID             *(number)* <br>Flag             *(combo)* <br> |
| Trigger screenshot (synchronous) | Captures the current screen and saves to Steam screenshot library (synchronous) | Tag             *(string)* <br> |
| Trigger screenshot | Captures the current screen and saves to Steam screenshot library |  |
| Save screenshot from URL (synchronous) | Saves an image from a URL as a Steam screenshot. The image will be loaded, converted to base64, and its dimensions calculated automatically. (synchronous) | URL             *(string)* <br>Tag             *(string)* <br> |
| Save screenshot from URL | Saves an image from a URL as a Steam screenshot. The image will be loaded, converted to base64, and its dimensions calculated automatically. | URL             *(string)* <br> |
| Add screenshot to library (synchronous) | Adds an existing screenshot file to the Steam screenshot library. Returns the handle of the screenshot. (synchronous) | Filename             *(string)* <br>Thumbnail Filename             *(string)* <br>Width             *(number)* <br>Height             *(number)* <br>Tag             *(string)* <br> |
| Add screenshot to library | Adds an existing screenshot file to the Steam screenshot library. Returns the handle of the screenshot. | Filename             *(string)* <br>Thumbnail Filename             *(string)* <br>Width             *(number)* <br>Height             *(number)* <br> |
| Check DLC is installed (synchronous) | Checks if the user owns and has installed a specific DLC (synchronous) | DLC App ID             *(number)* <br>Tag             *(string)* <br> |
| Check DLC is installed | Checks if the user owns and has installed a specific DLC | DLC App ID             *(number)* <br> |
| Create workshop item (synchronous) | Creates a new workshop item for the specified Steam App ID and returns its ID (synchronous) | App ID             *(number)* <br>Tag             *(string)* <br> |
| Create workshop item | Creates a new workshop item for the specified Steam App ID and returns its ID | App ID             *(number)* <br> |
| Update workshop item (synchronous) | Updates content and metadata of a workshop item. Use the update flags to control which fields are updated. (synchronous) | App ID             *(number)* <br>Item ID             *(string)* <br>Update Title             *(boolean)* <br>Title             *(string)* <br>Update Description             *(boolean)* <br>Description             *(string)* <br>Update Content             *(boolean)* <br>Content Folder Path             *(string)* <br>Change Note             *(string)* <br>Update Preview             *(boolean)* <br>Preview Image Path             *(string)* <br>Update Tags             *(boolean)* <br>Tags             *(string)* <br>Update Visibility             *(boolean)* <br>Visibility             *(combo)* <br>Tag             *(string)* <br> |
| Update workshop item | Updates content and metadata of a workshop item. Use the update flags to control which fields are updated. | App ID             *(number)* <br>Item ID             *(string)* <br>Update Title             *(boolean)* <br>Title             *(string)* <br>Update Description             *(boolean)* <br>Description             *(string)* <br>Update Content             *(boolean)* <br>Content Folder Path             *(string)* <br>Change Note             *(string)* <br>Update Preview             *(boolean)* <br>Preview Image Path             *(string)* <br>Update Tags             *(boolean)* <br>Tags             *(string)* <br>Update Visibility             *(boolean)* <br>Visibility             *(combo)* <br> |
| Get subscribed items with metadata (synchronous) | Gets all subscribed workshop items with their metadata and install info (synchronous) | Tag             *(string)* <br> |
| Get subscribed items with metadata | Gets all subscribed workshop items with their metadata and install info |  |
| Download workshop item (synchronous) | Downloads or updates a workshop item (synchronous) | Item ID             *(string)* <br>High Priority             *(boolean)* <br>Tag             *(string)* <br> |
| Download workshop item | Downloads or updates a workshop item | Item ID             *(string)* <br>High Priority             *(boolean)* <br> |
| Delete workshop item (synchronous) | Deletes a workshop item (synchronous) | Item ID             *(string)* <br>Tag             *(string)* <br> |
| Delete workshop item | Deletes a workshop item | Item ID             *(string)* <br> |
| Subscribe to workshop item (synchronous) | Subscribes to a workshop item (synchronous) | Item ID             *(string)* <br>Tag             *(string)* <br> |
| Subscribe to workshop item | Subscribes to a workshop item | Item ID             *(string)* <br> |
| Unsubscribe from workshop item (synchronous) | Unsubscribes from a workshop item (synchronous) | Item ID             *(string)* <br>Tag             *(string)* <br> |
| Unsubscribe from workshop item | Unsubscribes from a workshop item | Item ID             *(string)* <br> |
| Get workshop item state (synchronous) | Gets the state of a workshop item (synchronous) | Item ID             *(string)* <br>Tag             *(string)* <br> |
| Get workshop item state | Gets the state of a workshop item | Item ID             *(string)* <br> |
| Get workshop item install info (synchronous) | Gets the install info of a workshop item (synchronous) | Item ID             *(string)* <br>Tag             *(string)* <br> |
| Get workshop item install info | Gets the install info of a workshop item | Item ID             *(string)* <br> |
| Get workshop item download info (synchronous) | Gets the download info of a workshop item (synchronous) | Item ID             *(string)* <br>Tag             *(string)* <br> |
| Get workshop item download info | Gets the download info of a workshop item | Item ID             *(string)* <br> |
| Get workshop item (synchronous) | Gets a workshop item's metadata (synchronous) | Item ID             *(string)* <br>Tag             *(string)* <br> |
| Get workshop item | Gets a workshop item's metadata | Item ID             *(string)* <br> |
| Get workshop items (synchronous) | Gets multiple workshop items' metadata (synchronous) | Item IDs             *(string)* <br>Tag             *(string)* <br> |
| Get workshop items | Gets multiple workshop items' metadata | Item IDs             *(string)* <br> |
| Get subscribed items (synchronous) | Gets all subscribed workshop item IDs (synchronous) | Tag             *(string)* <br> |
| Get subscribed items | Gets all subscribed workshop item IDs |  |
| Get workshop item with metadata (synchronous) | Gets a workshop item with its metadata, state, install info, and download info (synchronous) | Item ID             *(string)* <br>Tag             *(string)* <br> |
| Get workshop item with metadata | Gets a workshop item with its metadata, state, install info, and download info | Item ID             *(string)* <br> |
| Get workshop items with metadata (synchronous) | Gets multiple workshop items with their metadata, state, install info, and download info (synchronous) | Item IDs             *(string)* <br>Tag             *(string)* <br> |
| Get workshop items with metadata | Gets multiple workshop items with their metadata, state, install info, and download info | Item IDs             *(string)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| On "Initialize" success | Trigger when the "Initialize" is executed with success. | Tag *(string)* <br> |
| On any "Initialize" success | Trigger when any of the "Initialize" are executed with success. |  |
| On "Initialize" error | Trigger when the "Initialize" failed to execute. | Tag *(string)* <br> |
| On any "Initialize" error | Trigger when any of the "Initialize" failed to execute. |  |
| On "AppendFile" success | Trigger when the "AppendFile" is executed with success. | Tag *(string)* <br> |
| On any "AppendFile" success | Trigger when any of the "AppendFile" are executed with success. |  |
| On "AppendFile" error | Trigger when the "AppendFile" failed to execute. | Tag *(string)* <br> |
| On any "AppendFile" error | Trigger when any of the "AppendFile" failed to execute. |  |
| On "CopyFile" success | Trigger when the "CopyFile" is executed with success. | Tag *(string)* <br> |
| On any "CopyFile" success | Trigger when any of the "CopyFile" are executed with success. |  |
| On "CopyFile" error | Trigger when the "CopyFile" failed to execute. | Tag *(string)* <br> |
| On any "CopyFile" error | Trigger when any of the "CopyFile" failed to execute. |  |
| On "FetchFileSize" success | Trigger when the "FetchFileSize" is executed with success. | Tag *(string)* <br> |
| On any "FetchFileSize" success | Trigger when any of the "FetchFileSize" are executed with success. |  |
| On "FetchFileSize" error | Trigger when the "FetchFileSize" failed to execute. | Tag *(string)* <br> |
| On any "FetchFileSize" error | Trigger when any of the "FetchFileSize" failed to execute. |  |
| On "CreateFolder" success | Trigger when the "CreateFolder" is executed with success. | Tag *(string)* <br> |
| On any "CreateFolder" success | Trigger when any of the "CreateFolder" are executed with success. |  |
| On "CreateFolder" error | Trigger when the "CreateFolder" failed to execute. | Tag *(string)* <br> |
| On any "CreateFolder" error | Trigger when any of the "CreateFolder" failed to execute. |  |
| On "DeleteFile" success | Trigger when the "DeleteFile" is executed with success. | Tag *(string)* <br> |
| On any "DeleteFile" success | Trigger when any of the "DeleteFile" are executed with success. |  |
| On "DeleteFile" error | Trigger when the "DeleteFile" failed to execute. | Tag *(string)* <br> |
| On any "DeleteFile" error | Trigger when any of the "DeleteFile" failed to execute. |  |
| On "ListFiles" success | Trigger when the "ListFiles" is executed with success. | Tag *(string)* <br> |
| On any "ListFiles" success | Trigger when any of the "ListFiles" are executed with success. |  |
| On "ListFiles" error | Trigger when the "ListFiles" failed to execute. | Tag *(string)* <br> |
| On any "ListFiles" error | Trigger when any of the "ListFiles" failed to execute. |  |
| On "MoveFile" success | Trigger when the "MoveFile" is executed with success. | Tag *(string)* <br> |
| On any "MoveFile" success | Trigger when any of the "MoveFile" are executed with success. |  |
| On "MoveFile" error | Trigger when the "MoveFile" failed to execute. | Tag *(string)* <br> |
| On any "MoveFile" error | Trigger when any of the "MoveFile" failed to execute. |  |
| On "OpenBrowser" success | Trigger when the "OpenBrowser" is executed with success. | Tag *(string)* <br> |
| On any "OpenBrowser" success | Trigger when any of the "OpenBrowser" are executed with success. |  |
| On "OpenBrowser" error | Trigger when the "OpenBrowser" failed to execute. | Tag *(string)* <br> |
| On any "OpenBrowser" error | Trigger when any of the "OpenBrowser" failed to execute. |  |
| On "ReadBinaryFile" success | Trigger when the "ReadBinaryFile" is executed with success. | Tag *(string)* <br> |
| On any "ReadBinaryFile" success | Trigger when any of the "ReadBinaryFile" are executed with success. |  |
| On "ReadBinaryFile" error | Trigger when the "ReadBinaryFile" failed to execute. | Tag *(string)* <br> |
| On any "ReadBinaryFile" error | Trigger when any of the "ReadBinaryFile" failed to execute. |  |
| On "RenameFile" success | Trigger when the "RenameFile" is executed with success. | Tag *(string)* <br> |
| On any "RenameFile" success | Trigger when any of the "RenameFile" are executed with success. |  |
| On "RenameFile" error | Trigger when the "RenameFile" failed to execute. | Tag *(string)* <br> |
| On any "RenameFile" error | Trigger when any of the "RenameFile" failed to execute. |  |
| On "RunFile" success | Trigger when the "RunFile" is executed with success. | Tag *(string)* <br> |
| On any "RunFile" success | Trigger when any of the "RunFile" are executed with success. |  |
| On "RunFile" error | Trigger when the "RunFile" failed to execute. | Tag *(string)* <br> |
| On any "RunFile" error | Trigger when any of the "RunFile" failed to execute. |  |
| On "ShellOpen" success | Trigger when the "ShellOpen" is executed with success. | Tag *(string)* <br> |
| On any "ShellOpen" success | Trigger when any of the "ShellOpen" are executed with success. |  |
| On "ShellOpen" error | Trigger when the "ShellOpen" failed to execute. | Tag *(string)* <br> |
| On any "ShellOpen" error | Trigger when any of the "ShellOpen" failed to execute. |  |
| On "ExplorerOpen" success | Trigger when the "ExplorerOpen" is executed with success. | Tag *(string)* <br> |
| On any "ExplorerOpen" success | Trigger when any of the "ExplorerOpen" are executed with success. |  |
| On "ExplorerOpen" error | Trigger when the "ExplorerOpen" failed to execute. | Tag *(string)* <br> |
| On any "ExplorerOpen" error | Trigger when any of the "ExplorerOpen" failed to execute. |  |
| On "WriteBinaryFile" success | Trigger when the "WriteBinaryFile" is executed with success. | Tag *(string)* <br> |
| On any "WriteBinaryFile" success | Trigger when any of the "WriteBinaryFile" are executed with success. |  |
| On "WriteBinaryFile" error | Trigger when the "WriteBinaryFile" failed to execute. | Tag *(string)* <br> |
| On any "WriteBinaryFile" error | Trigger when any of the "WriteBinaryFile" failed to execute. |  |
| On "WriteTextFile" success | Trigger when the "WriteTextFile" is executed with success. | Tag *(string)* <br> |
| On any "WriteTextFile" success | Trigger when any of the "WriteTextFile" are executed with success. |  |
| On "WriteTextFile" error | Trigger when the "WriteTextFile" failed to execute. | Tag *(string)* <br> |
| On any "WriteTextFile" error | Trigger when any of the "WriteTextFile" failed to execute. |  |
| On "WriteText" success | Trigger when the "WriteText" is executed with success. | Tag *(string)* <br> |
| On any "WriteText" success | Trigger when any of the "WriteText" are executed with success. |  |
| On "WriteText" error | Trigger when the "WriteText" failed to execute. | Tag *(string)* <br> |
| On any "WriteText" error | Trigger when any of the "WriteText" failed to execute. |  |
| On "ReadTextFile" success | Trigger when the "ReadTextFile" is executed with success. | Tag *(string)* <br> |
| On any "ReadTextFile" success | Trigger when any of the "ReadTextFile" are executed with success. |  |
| On "ReadTextFile" error | Trigger when the "ReadTextFile" failed to execute. | Tag *(string)* <br> |
| On any "ReadTextFile" error | Trigger when any of the "ReadTextFile" failed to execute. |  |
| On "CheckIfPathExist" success | Trigger when the "CheckIfPathExist" is executed with success. | Tag *(string)* <br> |
| On any "CheckIfPathExist" success | Trigger when any of the "CheckIfPathExist" are executed with success. |  |
| On "CheckIfPathExist" error | Trigger when the "CheckIfPathExist" failed to execute. | Tag *(string)* <br> |
| On any "CheckIfPathExist" error | Trigger when any of the "CheckIfPathExist" failed to execute. |  |
| On "ShowFolderDialog" success | Trigger when the "ShowFolderDialog" is executed with success. | Tag *(string)* <br> |
| On any "ShowFolderDialog" success | Trigger when any of the "ShowFolderDialog" are executed with success. |  |
| On "ShowFolderDialog" error | Trigger when the "ShowFolderDialog" failed to execute. | Tag *(string)* <br> |
| On any "ShowFolderDialog" error | Trigger when any of the "ShowFolderDialog" failed to execute. |  |
| On "ShowOpenDialog" success | Trigger when the "ShowOpenDialog" is executed with success. | Tag *(string)* <br> |
| On any "ShowOpenDialog" success | Trigger when any of the "ShowOpenDialog" are executed with success. |  |
| On "ShowOpenDialog" error | Trigger when the "ShowOpenDialog" failed to execute. | Tag *(string)* <br> |
| On any "ShowOpenDialog" error | Trigger when any of the "ShowOpenDialog" failed to execute. |  |
| On "ShowSaveDialog" success | Trigger when the "ShowSaveDialog" is executed with success. | Tag *(string)* <br> |
| On any "ShowSaveDialog" success | Trigger when any of the "ShowSaveDialog" are executed with success. |  |
| On "ShowSaveDialog" error | Trigger when the "ShowSaveDialog" failed to execute. | Tag *(string)* <br> |
| On any "ShowSaveDialog" error | Trigger when any of the "ShowSaveDialog" failed to execute. |  |
| On "Maximize" success | Trigger when the "Maximize" is executed with success. | Tag *(string)* <br> |
| On any "Maximize" success | Trigger when any of the "Maximize" are executed with success. |  |
| On "Maximize" error | Trigger when the "Maximize" failed to execute. | Tag *(string)* <br> |
| On any "Maximize" error | Trigger when any of the "Maximize" failed to execute. |  |
| On "Minimize" success | Trigger when the "Minimize" is executed with success. | Tag *(string)* <br> |
| On any "Minimize" success | Trigger when any of the "Minimize" are executed with success. |  |
| On "Minimize" error | Trigger when the "Minimize" failed to execute. | Tag *(string)* <br> |
| On any "Minimize" error | Trigger when any of the "Minimize" failed to execute. |  |
| On "Restore" success | Trigger when the "Restore" is executed with success. | Tag *(string)* <br> |
| On any "Restore" success | Trigger when any of the "Restore" are executed with success. |  |
| On "Restore" error | Trigger when the "Restore" failed to execute. | Tag *(string)* <br> |
| On any "Restore" error | Trigger when any of the "Restore" failed to execute. |  |
| On "RequestAttention" success | Trigger when the "RequestAttention" is executed with success. | Tag *(string)* <br> |
| On any "RequestAttention" success | Trigger when any of the "RequestAttention" are executed with success. |  |
| On "RequestAttention" error | Trigger when the "RequestAttention" failed to execute. | Tag *(string)* <br> |
| On any "RequestAttention" error | Trigger when any of the "RequestAttention" failed to execute. |  |
| On "SetAlwaysOnTop" success | Trigger when the "SetAlwaysOnTop" is executed with success. | Tag *(string)* <br> |
| On any "SetAlwaysOnTop" success | Trigger when any of the "SetAlwaysOnTop" are executed with success. |  |
| On "SetAlwaysOnTop" error | Trigger when the "SetAlwaysOnTop" failed to execute. | Tag *(string)* <br> |
| On any "SetAlwaysOnTop" error | Trigger when any of the "SetAlwaysOnTop" failed to execute. |  |
| On "SetHeight" success | Trigger when the "SetHeight" is executed with success. | Tag *(string)* <br> |
| On any "SetHeight" success | Trigger when any of the "SetHeight" are executed with success. |  |
| On "SetHeight" error | Trigger when the "SetHeight" failed to execute. | Tag *(string)* <br> |
| On any "SetHeight" error | Trigger when any of the "SetHeight" failed to execute. |  |
| On "SetMaximumSize" success | Trigger when the "SetMaximumSize" is executed with success. | Tag *(string)* <br> |
| On any "SetMaximumSize" success | Trigger when any of the "SetMaximumSize" are executed with success. |  |
| On "SetMaximumSize" error | Trigger when the "SetMaximumSize" failed to execute. | Tag *(string)* <br> |
| On any "SetMaximumSize" error | Trigger when any of the "SetMaximumSize" failed to execute. |  |
| On "SetMinimumSize" success | Trigger when the "SetMinimumSize" is executed with success. | Tag *(string)* <br> |
| On any "SetMinimumSize" success | Trigger when any of the "SetMinimumSize" are executed with success. |  |
| On "SetMinimumSize" error | Trigger when the "SetMinimumSize" failed to execute. | Tag *(string)* <br> |
| On any "SetMinimumSize" error | Trigger when any of the "SetMinimumSize" failed to execute. |  |
| On "SetResizable" success | Trigger when the "SetResizable" is executed with success. | Tag *(string)* <br> |
| On any "SetResizable" success | Trigger when any of the "SetResizable" are executed with success. |  |
| On "SetResizable" error | Trigger when the "SetResizable" failed to execute. | Tag *(string)* <br> |
| On any "SetResizable" error | Trigger when any of the "SetResizable" failed to execute. |  |
| On "SetTitle" success | Trigger when the "SetTitle" is executed with success. | Tag *(string)* <br> |
| On any "SetTitle" success | Trigger when any of the "SetTitle" are executed with success. |  |
| On "SetTitle" error | Trigger when the "SetTitle" failed to execute. | Tag *(string)* <br> |
| On any "SetTitle" error | Trigger when any of the "SetTitle" failed to execute. |  |
| On "SetWidth" success | Trigger when the "SetWidth" is executed with success. | Tag *(string)* <br> |
| On any "SetWidth" success | Trigger when any of the "SetWidth" are executed with success. |  |
| On "SetWidth" error | Trigger when the "SetWidth" failed to execute. | Tag *(string)* <br> |
| On any "SetWidth" error | Trigger when any of the "SetWidth" failed to execute. |  |
| On "SetX" success | Trigger when the "SetX" is executed with success. | Tag *(string)* <br> |
| On any "SetX" success | Trigger when any of the "SetX" are executed with success. |  |
| On "SetX" error | Trigger when the "SetX" failed to execute. | Tag *(string)* <br> |
| On any "SetX" error | Trigger when any of the "SetX" failed to execute. |  |
| On "SetY" success | Trigger when the "SetY" is executed with success. | Tag *(string)* <br> |
| On any "SetY" success | Trigger when any of the "SetY" are executed with success. |  |
| On "SetY" error | Trigger when the "SetY" failed to execute. | Tag *(string)* <br> |
| On any "SetY" error | Trigger when any of the "SetY" failed to execute. |  |
| On "ShowDevTools" success | Trigger when the "ShowDevTools" is executed with success. | Tag *(string)* <br> |
| On any "ShowDevTools" success | Trigger when any of the "ShowDevTools" are executed with success. |  |
| On "ShowDevTools" error | Trigger when the "ShowDevTools" failed to execute. | Tag *(string)* <br> |
| On any "ShowDevTools" error | Trigger when any of the "ShowDevTools" failed to execute. |  |
| On "Unmaximize" success | Trigger when the "Unmaximize" is executed with success. | Tag *(string)* <br> |
| On any "Unmaximize" success | Trigger when any of the "Unmaximize" are executed with success. |  |
| On "Unmaximize" error | Trigger when the "Unmaximize" failed to execute. | Tag *(string)* <br> |
| On any "Unmaximize" error | Trigger when any of the "Unmaximize" failed to execute. |  |
| On "SetFullscreen" success | Trigger when the "SetFullscreen" is executed with success. | Tag *(string)* <br> |
| On any "SetFullscreen" success | Trigger when any of the "SetFullscreen" are executed with success. |  |
| On "SetFullscreen" error | Trigger when the "SetFullscreen" failed to execute. | Tag *(string)* <br> |
| On any "SetFullscreen" error | Trigger when any of the "SetFullscreen" failed to execute. |  |
| On "ActivateAchievement" success | Trigger when the "ActivateAchievement" is executed with success. | Tag *(string)* <br> |
| On any "ActivateAchievement" success | Trigger when any of the "ActivateAchievement" are executed with success. |  |
| On "ActivateAchievement" error | Trigger when the "ActivateAchievement" failed to execute. | Tag *(string)* <br> |
| On any "ActivateAchievement" error | Trigger when any of the "ActivateAchievement" failed to execute. |  |
| On "ClearAchievement" success | Trigger when the "ClearAchievement" is executed with success. | Tag *(string)* <br> |
| On any "ClearAchievement" success | Trigger when any of the "ClearAchievement" are executed with success. |  |
| On "ClearAchievement" error | Trigger when the "ClearAchievement" failed to execute. | Tag *(string)* <br> |
| On any "ClearAchievement" error | Trigger when any of the "ClearAchievement" failed to execute. |  |
| On "CheckAchievementActivationState" success | Trigger when the "CheckAchievementActivationState" is executed with success. | Tag *(string)* <br> |
| On any "CheckAchievementActivationState" success | Trigger when any of the "CheckAchievementActivationState" are executed with success. |  |
| On "CheckAchievementActivationState" error | Trigger when the "CheckAchievementActivationState" failed to execute. | Tag *(string)* <br> |
| On any "CheckAchievementActivationState" error | Trigger when any of the "CheckAchievementActivationState" failed to execute. |  |
| On "SetRichPresence" success | Trigger when the "SetRichPresence" is executed with success. | Tag *(string)* <br> |
| On any "SetRichPresence" success | Trigger when any of the "SetRichPresence" are executed with success. |  |
| On "SetRichPresence" error | Trigger when the "SetRichPresence" failed to execute. | Tag *(string)* <br> |
| On any "SetRichPresence" error | Trigger when any of the "SetRichPresence" failed to execute. |  |
| On "DiscordSetActivity" success | Trigger when the "DiscordSetActivity" is executed with success. | Tag *(string)* <br> |
| On any "DiscordSetActivity" success | Trigger when any of the "DiscordSetActivity" are executed with success. |  |
| On "DiscordSetActivity" error | Trigger when the "DiscordSetActivity" failed to execute. | Tag *(string)* <br> |
| On any "DiscordSetActivity" error | Trigger when any of the "DiscordSetActivity" failed to execute. |  |
| On "LeaderboardUploadScore" success | Trigger when the "LeaderboardUploadScore" is executed with success. | Tag *(string)* <br> |
| On any "LeaderboardUploadScore" success | Trigger when any of the "LeaderboardUploadScore" are executed with success. |  |
| On "LeaderboardUploadScore" error | Trigger when the "LeaderboardUploadScore" failed to execute. | Tag *(string)* <br> |
| On any "LeaderboardUploadScore" error | Trigger when any of the "LeaderboardUploadScore" failed to execute. |  |
| On "LeaderboardUploadScoreWithMetadata" success | Trigger when the "LeaderboardUploadScoreWithMetadata" is executed with success. | Tag *(string)* <br> |
| On any "LeaderboardUploadScoreWithMetadata" success | Trigger when any of the "LeaderboardUploadScoreWithMetadata" are executed with success. |  |
| On "LeaderboardUploadScoreWithMetadata" error | Trigger when the "LeaderboardUploadScoreWithMetadata" failed to execute. | Tag *(string)* <br> |
| On any "LeaderboardUploadScoreWithMetadata" error | Trigger when any of the "LeaderboardUploadScoreWithMetadata" failed to execute. |  |
| On "LeaderboardDownloadScore" success | Trigger when the "LeaderboardDownloadScore" is executed with success. | Tag *(string)* <br> |
| On any "LeaderboardDownloadScore" success | Trigger when any of the "LeaderboardDownloadScore" are executed with success. |  |
| On "LeaderboardDownloadScore" error | Trigger when the "LeaderboardDownloadScore" failed to execute. | Tag *(string)* <br> |
| On any "LeaderboardDownloadScore" error | Trigger when any of the "LeaderboardDownloadScore" failed to execute. |  |
| On "ActivateToWebPage" success | Trigger when the "ActivateToWebPage" is executed with success. | Tag *(string)* <br> |
| On any "ActivateToWebPage" success | Trigger when any of the "ActivateToWebPage" are executed with success. |  |
| On "ActivateToWebPage" error | Trigger when the "ActivateToWebPage" failed to execute. | Tag *(string)* <br> |
| On any "ActivateToWebPage" error | Trigger when any of the "ActivateToWebPage" failed to execute. |  |
| On "ActivateToStore" success | Trigger when the "ActivateToStore" is executed with success. | Tag *(string)* <br> |
| On any "ActivateToStore" success | Trigger when any of the "ActivateToStore" are executed with success. |  |
| On "ActivateToStore" error | Trigger when the "ActivateToStore" failed to execute. | Tag *(string)* <br> |
| On any "ActivateToStore" error | Trigger when any of the "ActivateToStore" failed to execute. |  |
| On "TriggerScreenshot" success | Trigger when the "TriggerScreenshot" is executed with success. | Tag *(string)* <br> |
| On any "TriggerScreenshot" success | Trigger when any of the "TriggerScreenshot" are executed with success. |  |
| On "TriggerScreenshot" error | Trigger when the "TriggerScreenshot" failed to execute. | Tag *(string)* <br> |
| On any "TriggerScreenshot" error | Trigger when any of the "TriggerScreenshot" failed to execute. |  |
| On "SaveScreenshotFromURL" success | Trigger when the "SaveScreenshotFromURL" is executed with success. | Tag *(string)* <br> |
| On any "SaveScreenshotFromURL" success | Trigger when any of the "SaveScreenshotFromURL" are executed with success. |  |
| On "SaveScreenshotFromURL" error | Trigger when the "SaveScreenshotFromURL" failed to execute. | Tag *(string)* <br> |
| On any "SaveScreenshotFromURL" error | Trigger when any of the "SaveScreenshotFromURL" failed to execute. |  |
| On "AddScreenshotToLibrary" success | Trigger when the "AddScreenshotToLibrary" is executed with success. | Tag *(string)* <br> |
| On any "AddScreenshotToLibrary" success | Trigger when any of the "AddScreenshotToLibrary" are executed with success. |  |
| On "AddScreenshotToLibrary" error | Trigger when the "AddScreenshotToLibrary" failed to execute. | Tag *(string)* <br> |
| On any "AddScreenshotToLibrary" error | Trigger when any of the "AddScreenshotToLibrary" failed to execute. |  |
| On "CheckDLCIsInstalled" success | Trigger when the "CheckDLCIsInstalled" is executed with success. | Tag *(string)* <br> |
| On any "CheckDLCIsInstalled" success | Trigger when any of the "CheckDLCIsInstalled" are executed with success. |  |
| On "CheckDLCIsInstalled" error | Trigger when the "CheckDLCIsInstalled" failed to execute. | Tag *(string)* <br> |
| On any "CheckDLCIsInstalled" error | Trigger when any of the "CheckDLCIsInstalled" failed to execute. |  |
| On "CreateWorkshopItem" success | Trigger when the "CreateWorkshopItem" is executed with success. | Tag *(string)* <br> |
| On any "CreateWorkshopItem" success | Trigger when any of the "CreateWorkshopItem" are executed with success. |  |
| On "CreateWorkshopItem" error | Trigger when the "CreateWorkshopItem" failed to execute. | Tag *(string)* <br> |
| On any "CreateWorkshopItem" error | Trigger when any of the "CreateWorkshopItem" failed to execute. |  |
| On "UpdateWorkshopItem" success | Trigger when the "UpdateWorkshopItem" is executed with success. | Tag *(string)* <br> |
| On any "UpdateWorkshopItem" success | Trigger when any of the "UpdateWorkshopItem" are executed with success. |  |
| On "UpdateWorkshopItem" error | Trigger when the "UpdateWorkshopItem" failed to execute. | Tag *(string)* <br> |
| On any "UpdateWorkshopItem" error | Trigger when any of the "UpdateWorkshopItem" failed to execute. |  |
| On "GetSubscribedItemsWithMetadata" success | Trigger when the "GetSubscribedItemsWithMetadata" is executed with success. | Tag *(string)* <br> |
| On any "GetSubscribedItemsWithMetadata" success | Trigger when any of the "GetSubscribedItemsWithMetadata" are executed with success. |  |
| On "GetSubscribedItemsWithMetadata" error | Trigger when the "GetSubscribedItemsWithMetadata" failed to execute. | Tag *(string)* <br> |
| On any "GetSubscribedItemsWithMetadata" error | Trigger when any of the "GetSubscribedItemsWithMetadata" failed to execute. |  |
| On "DownloadWorkshopItem" success | Trigger when the "DownloadWorkshopItem" is executed with success. | Tag *(string)* <br> |
| On any "DownloadWorkshopItem" success | Trigger when any of the "DownloadWorkshopItem" are executed with success. |  |
| On "DownloadWorkshopItem" error | Trigger when the "DownloadWorkshopItem" failed to execute. | Tag *(string)* <br> |
| On any "DownloadWorkshopItem" error | Trigger when any of the "DownloadWorkshopItem" failed to execute. |  |
| On "DeleteWorkshopItem" success | Trigger when the "DeleteWorkshopItem" is executed with success. | Tag *(string)* <br> |
| On any "DeleteWorkshopItem" success | Trigger when any of the "DeleteWorkshopItem" are executed with success. |  |
| On "DeleteWorkshopItem" error | Trigger when the "DeleteWorkshopItem" failed to execute. | Tag *(string)* <br> |
| On any "DeleteWorkshopItem" error | Trigger when any of the "DeleteWorkshopItem" failed to execute. |  |
| On "SubscribeWorkshopItem" success | Trigger when the "SubscribeWorkshopItem" is executed with success. | Tag *(string)* <br> |
| On any "SubscribeWorkshopItem" success | Trigger when any of the "SubscribeWorkshopItem" are executed with success. |  |
| On "SubscribeWorkshopItem" error | Trigger when the "SubscribeWorkshopItem" failed to execute. | Tag *(string)* <br> |
| On any "SubscribeWorkshopItem" error | Trigger when any of the "SubscribeWorkshopItem" failed to execute. |  |
| On "UnsubscribeWorkshopItem" success | Trigger when the "UnsubscribeWorkshopItem" is executed with success. | Tag *(string)* <br> |
| On any "UnsubscribeWorkshopItem" success | Trigger when any of the "UnsubscribeWorkshopItem" are executed with success. |  |
| On "UnsubscribeWorkshopItem" error | Trigger when the "UnsubscribeWorkshopItem" failed to execute. | Tag *(string)* <br> |
| On any "UnsubscribeWorkshopItem" error | Trigger when any of the "UnsubscribeWorkshopItem" failed to execute. |  |
| On "GetWorkshopItemState" success | Trigger when the "GetWorkshopItemState" is executed with success. | Tag *(string)* <br> |
| On any "GetWorkshopItemState" success | Trigger when any of the "GetWorkshopItemState" are executed with success. |  |
| On "GetWorkshopItemState" error | Trigger when the "GetWorkshopItemState" failed to execute. | Tag *(string)* <br> |
| On any "GetWorkshopItemState" error | Trigger when any of the "GetWorkshopItemState" failed to execute. |  |
| On "GetWorkshopItemInstallInfo" success | Trigger when the "GetWorkshopItemInstallInfo" is executed with success. | Tag *(string)* <br> |
| On any "GetWorkshopItemInstallInfo" success | Trigger when any of the "GetWorkshopItemInstallInfo" are executed with success. |  |
| On "GetWorkshopItemInstallInfo" error | Trigger when the "GetWorkshopItemInstallInfo" failed to execute. | Tag *(string)* <br> |
| On any "GetWorkshopItemInstallInfo" error | Trigger when any of the "GetWorkshopItemInstallInfo" failed to execute. |  |
| On "GetWorkshopItemDownloadInfo" success | Trigger when the "GetWorkshopItemDownloadInfo" is executed with success. | Tag *(string)* <br> |
| On any "GetWorkshopItemDownloadInfo" success | Trigger when any of the "GetWorkshopItemDownloadInfo" are executed with success. |  |
| On "GetWorkshopItemDownloadInfo" error | Trigger when the "GetWorkshopItemDownloadInfo" failed to execute. | Tag *(string)* <br> |
| On any "GetWorkshopItemDownloadInfo" error | Trigger when any of the "GetWorkshopItemDownloadInfo" failed to execute. |  |
| On "GetWorkshopItem" success | Trigger when the "GetWorkshopItem" is executed with success. | Tag *(string)* <br> |
| On any "GetWorkshopItem" success | Trigger when any of the "GetWorkshopItem" are executed with success. |  |
| On "GetWorkshopItem" error | Trigger when the "GetWorkshopItem" failed to execute. | Tag *(string)* <br> |
| On any "GetWorkshopItem" error | Trigger when any of the "GetWorkshopItem" failed to execute. |  |
| On "GetWorkshopItems" success | Trigger when the "GetWorkshopItems" is executed with success. | Tag *(string)* <br> |
| On any "GetWorkshopItems" success | Trigger when any of the "GetWorkshopItems" are executed with success. |  |
| On "GetWorkshopItems" error | Trigger when the "GetWorkshopItems" failed to execute. | Tag *(string)* <br> |
| On any "GetWorkshopItems" error | Trigger when any of the "GetWorkshopItems" failed to execute. |  |
| On "GetSubscribedWorkshopItems" success | Trigger when the "GetSubscribedWorkshopItems" is executed with success. | Tag *(string)* <br> |
| On any "GetSubscribedWorkshopItems" success | Trigger when any of the "GetSubscribedWorkshopItems" are executed with success. |  |
| On "GetSubscribedWorkshopItems" error | Trigger when the "GetSubscribedWorkshopItems" failed to execute. | Tag *(string)* <br> |
| On any "GetSubscribedWorkshopItems" error | Trigger when any of the "GetSubscribedWorkshopItems" failed to execute. |  |
| On "GetWorkshopItemWithMetadata" success | Trigger when the "GetWorkshopItemWithMetadata" is executed with success. | Tag *(string)* <br> |
| On any "GetWorkshopItemWithMetadata" success | Trigger when any of the "GetWorkshopItemWithMetadata" are executed with success. |  |
| On "GetWorkshopItemWithMetadata" error | Trigger when the "GetWorkshopItemWithMetadata" failed to execute. | Tag *(string)* <br> |
| On any "GetWorkshopItemWithMetadata" error | Trigger when any of the "GetWorkshopItemWithMetadata" failed to execute. |  |
| On "GetWorkshopItemsWithMetadata" success | Trigger when the "GetWorkshopItemsWithMetadata" is executed with success. | Tag *(string)* <br> |
| On any "GetWorkshopItemsWithMetadata" success | Trigger when any of the "GetWorkshopItemsWithMetadata" are executed with success. |  |
| On "GetWorkshopItemsWithMetadata" error | Trigger when the "GetWorkshopItemsWithMetadata" failed to execute. | Tag *(string)* <br> |
| On any "GetWorkshopItemsWithMetadata" error | Trigger when any of the "GetWorkshopItemsWithMetadata" failed to execute. |  |
| Is engine | Return true if the engine running the app is the one selected | Engine *(combo)* <br> |
| Is initialized | Returns true if the Pipelab integration has been initialized |  |
| Is full screen | Returns true if the window is in full screen mode. | State *(combo)* <br> |
| Last checked path exists | Returns true if the last checked path exists. |  |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| InitializeError | The error of the "Initialize last call" | string |  | 
| InitializeResult | The result of the "Initialize last call" | string |  | 
| AppendFileError | The error of the "AppendFile last call" | string |  | 
| AppendFileResult | The result of the "AppendFile last call" | string |  | 
| CopyFileError | The error of the "CopyFile last call" | string |  | 
| CopyFileResult | The result of the "CopyFile last call" | string |  | 
| FetchFileSizeError | The error of the "FetchFileSize last call" | string |  | 
| FetchFileSizeResult | The result of the "FetchFileSize last call" | string |  | 
| CreateFolderError | The error of the "CreateFolder last call" | string |  | 
| CreateFolderResult | The result of the "CreateFolder last call" | string |  | 
| DeleteFileError | The error of the "DeleteFile last call" | string |  | 
| DeleteFileResult | The result of the "DeleteFile last call" | string |  | 
| ListFilesError | The error of the "ListFiles last call" | string |  | 
| ListFilesResult | The result of the "ListFiles last call" | string |  | 
| MoveFileError | The error of the "MoveFile last call" | string |  | 
| MoveFileResult | The result of the "MoveFile last call" | string |  | 
| OpenBrowserError | The error of the "OpenBrowser last call" | string |  | 
| OpenBrowserResult | The result of the "OpenBrowser last call" | string |  | 
| ReadBinaryFileError | The error of the "ReadBinaryFile last call" | string |  | 
| ReadBinaryFileResult | The result of the "ReadBinaryFile last call" | string |  | 
| RenameFileError | The error of the "RenameFile last call" | string |  | 
| RenameFileResult | The result of the "RenameFile last call" | string |  | 
| RunFileError | The error of the "RunFile last call" | string |  | 
| RunFileResult | The result of the "RunFile last call" | string |  | 
| ShellOpenError | The error of the "ShellOpen last call" | string |  | 
| ShellOpenResult | The result of the "ShellOpen last call" | string |  | 
| ExplorerOpenError | The error of the "ExplorerOpen last call" | string |  | 
| ExplorerOpenResult | The result of the "ExplorerOpen last call" | string |  | 
| WriteBinaryFileError | The error of the "WriteBinaryFile last call" | string |  | 
| WriteBinaryFileResult | The result of the "WriteBinaryFile last call" | string |  | 
| WriteTextFileError | The error of the "WriteTextFile last call" | string |  | 
| WriteTextFileResult | The result of the "WriteTextFile last call" | string |  | 
| WriteTextError | The error of the "WriteText last call" | string |  | 
| WriteTextResult | The result of the "WriteText last call" | string |  | 
| ReadTextFileError | The error of the "ReadTextFile last call" | string |  | 
| ReadTextFileResult | The result of the "ReadTextFile last call" | string |  | 
| CheckIfPathExistError | The error of the "CheckIfPathExist last call" | string |  | 
| CheckIfPathExistResult | The result of the "CheckIfPathExist last call" | string |  | 
| ShowFolderDialogError | The error of the "ShowFolderDialog last call" | string |  | 
| ShowFolderDialogResult | The result of the "ShowFolderDialog last call" | string |  | 
| ShowOpenDialogError | The error of the "ShowOpenDialog last call" | string |  | 
| ShowOpenDialogResult | The result of the "ShowOpenDialog last call" | string |  | 
| ShowSaveDialogError | The error of the "ShowSaveDialog last call" | string |  | 
| ShowSaveDialogResult | The result of the "ShowSaveDialog last call" | string |  | 
| MaximizeError | The error of the "Maximize last call" | string |  | 
| MaximizeResult | The result of the "Maximize last call" | string |  | 
| MinimizeError | The error of the "Minimize last call" | string |  | 
| MinimizeResult | The result of the "Minimize last call" | string |  | 
| RestoreError | The error of the "Restore last call" | string |  | 
| RestoreResult | The result of the "Restore last call" | string |  | 
| RequestAttentionError | The error of the "RequestAttention last call" | string |  | 
| RequestAttentionResult | The result of the "RequestAttention last call" | string |  | 
| SetAlwaysOnTopError | The error of the "SetAlwaysOnTop last call" | string |  | 
| SetAlwaysOnTopResult | The result of the "SetAlwaysOnTop last call" | string |  | 
| SetHeightError | The error of the "SetHeight last call" | string |  | 
| SetHeightResult | The result of the "SetHeight last call" | string |  | 
| SetMaximumSizeError | The error of the "SetMaximumSize last call" | string |  | 
| SetMaximumSizeResult | The result of the "SetMaximumSize last call" | string |  | 
| SetMinimumSizeError | The error of the "SetMinimumSize last call" | string |  | 
| SetMinimumSizeResult | The result of the "SetMinimumSize last call" | string |  | 
| SetResizableError | The error of the "SetResizable last call" | string |  | 
| SetResizableResult | The result of the "SetResizable last call" | string |  | 
| SetTitleError | The error of the "SetTitle last call" | string |  | 
| SetTitleResult | The result of the "SetTitle last call" | string |  | 
| SetWidthError | The error of the "SetWidth last call" | string |  | 
| SetWidthResult | The result of the "SetWidth last call" | string |  | 
| SetXError | The error of the "SetX last call" | string |  | 
| SetXResult | The result of the "SetX last call" | string |  | 
| SetYError | The error of the "SetY last call" | string |  | 
| SetYResult | The result of the "SetY last call" | string |  | 
| ShowDevToolsError | The error of the "ShowDevTools last call" | string |  | 
| ShowDevToolsResult | The result of the "ShowDevTools last call" | string |  | 
| UnmaximizeError | The error of the "Unmaximize last call" | string |  | 
| UnmaximizeResult | The result of the "Unmaximize last call" | string |  | 
| SetFullscreenError | The error of the "SetFullscreen last call" | string |  | 
| SetFullscreenResult | The result of the "SetFullscreen last call" | string |  | 
| ActivateAchievementError | The error of the "ActivateAchievement last call" | string |  | 
| ActivateAchievementResult | The result of the "ActivateAchievement last call" | string |  | 
| ClearAchievementError | The error of the "ClearAchievement last call" | string |  | 
| ClearAchievementResult | The result of the "ClearAchievement last call" | string |  | 
| CheckAchievementActivationStateError | The error of the "CheckAchievementActivationState last call" | string |  | 
| CheckAchievementActivationStateResult | The result of the "CheckAchievementActivationState last call" | string |  | 
| SetRichPresenceError | The error of the "SetRichPresence last call" | string |  | 
| SetRichPresenceResult | The result of the "SetRichPresence last call" | string |  | 
| DiscordSetActivityError | The error of the "DiscordSetActivity last call" | string |  | 
| DiscordSetActivityResult | The result of the "DiscordSetActivity last call" | string |  | 
| LeaderboardUploadScoreError | The error of the "LeaderboardUploadScore last call" | string |  | 
| LeaderboardUploadScoreResult | The result of the "LeaderboardUploadScore last call" | string |  | 
| LeaderboardUploadScoreWithMetadataError | The error of the "LeaderboardUploadScoreWithMetadata last call" | string |  | 
| LeaderboardUploadScoreWithMetadataResult | The result of the "LeaderboardUploadScoreWithMetadata last call" | string |  | 
| LeaderboardDownloadScoreError | The error of the "LeaderboardDownloadScore last call" | string |  | 
| LeaderboardDownloadScoreResult | The result of the "LeaderboardDownloadScore last call" | string |  | 
| ActivateToWebPageError | The error of the "ActivateToWebPage last call" | string |  | 
| ActivateToWebPageResult | The result of the "ActivateToWebPage last call" | string |  | 
| ActivateToStoreError | The error of the "ActivateToStore last call" | string |  | 
| ActivateToStoreResult | The result of the "ActivateToStore last call" | string |  | 
| TriggerScreenshotError | The error of the "TriggerScreenshot last call" | string |  | 
| TriggerScreenshotResult | The result of the "TriggerScreenshot last call" | string |  | 
| SaveScreenshotFromURLError | The error of the "SaveScreenshotFromURL last call" | string |  | 
| SaveScreenshotFromURLResult | The result of the "SaveScreenshotFromURL last call" | string |  | 
| AddScreenshotToLibraryError | The error of the "AddScreenshotToLibrary last call" | string |  | 
| AddScreenshotToLibraryResult | The result of the "AddScreenshotToLibrary last call" | string |  | 
| CheckDLCIsInstalledError | The error of the "CheckDLCIsInstalled last call" | string |  | 
| CheckDLCIsInstalledResult | The result of the "CheckDLCIsInstalled last call" | string |  | 
| CreateWorkshopItemError | The error of the "CreateWorkshopItem last call" | string |  | 
| CreateWorkshopItemResult | The result of the "CreateWorkshopItem last call" | string |  | 
| UpdateWorkshopItemError | The error of the "UpdateWorkshopItem last call" | string |  | 
| UpdateWorkshopItemResult | The result of the "UpdateWorkshopItem last call" | string |  | 
| GetSubscribedItemsWithMetadataError | The error of the "GetSubscribedItemsWithMetadata last call" | string |  | 
| GetSubscribedItemsWithMetadataResult | The result of the "GetSubscribedItemsWithMetadata last call" | string |  | 
| DownloadWorkshopItemError | The error of the "DownloadWorkshopItem last call" | string |  | 
| DownloadWorkshopItemResult | The result of the "DownloadWorkshopItem last call" | string |  | 
| DeleteWorkshopItemError | The error of the "DeleteWorkshopItem last call" | string |  | 
| DeleteWorkshopItemResult | The result of the "DeleteWorkshopItem last call" | string |  | 
| SubscribeWorkshopItemError | The error of the "SubscribeWorkshopItem last call" | string |  | 
| SubscribeWorkshopItemResult | The result of the "SubscribeWorkshopItem last call" | string |  | 
| UnsubscribeWorkshopItemError | The error of the "UnsubscribeWorkshopItem last call" | string |  | 
| UnsubscribeWorkshopItemResult | The result of the "UnsubscribeWorkshopItem last call" | string |  | 
| GetWorkshopItemStateError | The error of the "GetWorkshopItemState last call" | string |  | 
| GetWorkshopItemStateResult | The result of the "GetWorkshopItemState last call" | string |  | 
| GetWorkshopItemInstallInfoError | The error of the "GetWorkshopItemInstallInfo last call" | string |  | 
| GetWorkshopItemInstallInfoResult | The result of the "GetWorkshopItemInstallInfo last call" | string |  | 
| GetWorkshopItemDownloadInfoError | The error of the "GetWorkshopItemDownloadInfo last call" | string |  | 
| GetWorkshopItemDownloadInfoResult | The result of the "GetWorkshopItemDownloadInfo last call" | string |  | 
| GetWorkshopItemError | The error of the "GetWorkshopItem last call" | string |  | 
| GetWorkshopItemResult | The result of the "GetWorkshopItem last call" | string |  | 
| GetWorkshopItemsError | The error of the "GetWorkshopItems last call" | string |  | 
| GetWorkshopItemsResult | The result of the "GetWorkshopItems last call" | string |  | 
| GetSubscribedWorkshopItemsError | The error of the "GetSubscribedWorkshopItems last call" | string |  | 
| GetSubscribedWorkshopItemsResult | The result of the "GetSubscribedWorkshopItems last call" | string |  | 
| GetWorkshopItemWithMetadataError | The error of the "GetWorkshopItemWithMetadata last call" | string |  | 
| GetWorkshopItemWithMetadataResult | The result of the "GetWorkshopItemWithMetadata last call" | string |  | 
| GetWorkshopItemsWithMetadataError | The error of the "GetWorkshopItemsWithMetadata last call" | string |  | 
| GetWorkshopItemsWithMetadataResult | The result of the "GetWorkshopItemsWithMetadata last call" | string |  | 
| SubscribedItemsCount | Get the number of subscribed workshop items | number |  | 
| SubscribedItemIdAt | Get the workshop item ID at the given index | string | Index *(number)* <br> | 
| WorkshopItemTitle | Get the title of a workshop item | string | Item ID *(string)* <br> | 
| WorkshopItemDescription | Get the description of a workshop item | string | Item ID *(string)* <br> | 
| WorkshopItemOwnerSteamId64 | Get the owner's Steam ID64 of a workshop item | string | Item ID *(string)* <br> | 
| WorkshopItemOwnerAccountId | Get the owner's account ID of a workshop item | number | Item ID *(string)* <br> | 
| WorkshopItemTags | Get the tags of a workshop item (comma-separated) | string | Item ID *(string)* <br> | 
| WorkshopItemUpvotes | Get the number of upvotes for a workshop item | number | Item ID *(string)* <br> | 
| WorkshopItemDownvotes | Get the number of downvotes for a workshop item | number | Item ID *(string)* <br> | 
| WorkshopItemPreviewUrl | Get the preview image URL of a workshop item | string | Item ID *(string)* <br> | 
| WorkshopItemUrl | Get the Steam Workshop URL of a workshop item | string | Item ID *(string)* <br> | 
| WorkshopItemTimeCreated | Get the creation timestamp of a workshop item (Unix epoch) | number | Item ID *(string)* <br> | 
| WorkshopItemTimeUpdated | Get the last update timestamp of a workshop item (Unix epoch) | number | Item ID *(string)* <br> | 
| WorkshopItemState | Get the state bitfield of a workshop item | number | Item ID *(string)* <br> | 
| WorkshopItemIsInstalled | Check if a workshop item is installed (returns 0 or 1) | number | Item ID *(string)* <br> | 
| WorkshopItemIsDownloading | Check if a workshop item is downloading (returns 0 or 1) | number | Item ID *(string)* <br> | 
| WorkshopItemNeedsUpdate | Check if a workshop item needs an update (returns 0 or 1) | number | Item ID *(string)* <br> | 
| WorkshopItemInstallFolder | Get the installation folder path of a workshop item | string | Item ID *(string)* <br> | 
| WorkshopItemSizeOnDisk | Get the size on disk of a workshop item in bytes | number | Item ID *(string)* <br> | 
| WorkshopItemTimestamp | Get the install timestamp of a workshop item | number | Item ID *(string)* <br> | 
| WorkshopItemDownloadCurrent | Get the current download progress of a workshop item | number | Item ID *(string)* <br> | 
| WorkshopItemDownloadTotal | Get the total download progress of a workshop item | number | Item ID *(string)* <br> | 
| ArgumentAt | Get the argument at the given index. | string | Index *(number)* <br> | 
| ArgumentCount | Get the number of arguments. | number |  | 
| AppFolderURL | Return the URL of the folder of the current app. | string |  | 
| DroppedFile | Return the dropped file after a file drop. | string |  | 
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
| FullscreenState | Return the fullscreen state of the window. | number |  | 
| CurrentPlatform | Get the current platform (e.g., 'win32', 'darwin', 'linux'). | string |  | 
| CurrentArchitecture | Get the current architecture (e.g., 'x64', 'arm64'). | string |  | 
| SteamAccountId | Get the Steam account ID. | number |  | 
| SteamId32 | Get the Steam ID32. | string |  | 
| SteamId64 | Get the Steam ID64. | string |  | 
| SteamUsername | Get the Steam username. | string |  | 
| SteamLevel | Get the Steam level. | number |  | 
| SteamIpCountry | Get the Steam IP country. | string |  | 
| SteamIsRunningOnSteamDeck | Return true if the app is running on a Steam Deck. | number |  | 
| SteamAppId | Get the currently used Steam App ID. | number |  | 

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

