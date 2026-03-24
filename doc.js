import fs from "fs";
import path from "path";

const camelCasedMap = new Map();

function getFileWithTypeFromFolder(path, fileTypes) {
  const results = [];
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    const ext = getFileExtension(file);
    if (fileTypes.includes(ext)) {
      results.push(file);
    }
  });
  return results;
}

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

const __dirname = import.meta.dirname;

function getCoverImage() {
  const exampleFolderPath = path.join(__dirname, "examples");
  const images = getFileWithTypeFromFolder(exampleFolderPath, [
    "png",
    "gif",
    "jpeg",
  ]);
  for (let i = 0; i < images.length; i++) {
    const imageName = images[i].split(".")[0];
    if (imageName === "cover") {
      return `<img src="./examples/${images[i]}" width="150" /><br>`;
    }
  }
  return '<img src="./src/icon.svg" width="100" /><br>';
}

import config from "./src/pluginConfig.js";

const readme = [];
readme.push(getCoverImage());
readme.push(`# ${config.name} <br>`);
readme.push(`${config.description} <br>`);
readme.push("<br>");
readme.push(`Author: ${config.author} <br>`);
if (
  config.website &&
  config.website !== "" &&
  config.website !== "https://www.construct.net"
) {
  readme.push(`Website: ${config.website} <br>`);
}
if (config.addonUrl && config.addonUrl !== "") {
  readme.push(`Addon Url: ${config.addonUrl} <br>`);
}
if (config.githubUrl && config.githubUrl !== "") {
  readme.push(
    `Download Latest Version : [Version: ${config.version}](${config.githubUrl}/releases/latest) <br>`
  );
}
//add link to c3ide2-framework
readme.push(
  `<sub>Made using [c3ide2-framework](https://github.com/ConstructFund/c3ide2-framework) </sub><br>`
);
readme.push(``);

readme.push(`## Table of Contents`);
readme.push(`- [Usage](#usage)`);
readme.push(`- [Examples Files](#examples-files)`);
readme.push(`- [Properties](#properties)`);
readme.push(`- [Actions](#actions)`);
readme.push(`- [Conditions](#conditions)`);
readme.push(`- [Expressions](#expressions)`);
readme.push(`- [Paths](#paths)`);
readme.push(`- [Recommended Save Location](#recommended-save-location)`);

readme.push(`---`);
readme.push(`## Usage`);
readme.push(`To build the addon, run the following commands:`);
readme.push(``);
readme.push(`\`\`\``);
readme.push(`npm i`);
readme.push(`node ./build.js`);
readme.push(`\`\`\``);
readme.push(``);
readme.push(`To run the dev server, run`);
readme.push(``);
readme.push(`\`\`\``);
readme.push(`npm i`);
readme.push(`node ./dev.js`);
readme.push(`\`\`\``);
readme.push(``);
readme.push(
  `The build uses the pluginConfig file to generate everything else.`
);
readme.push(
  `The main files you may want to look at would be instance.js`
);

readme.push(``);
readme.push(`## Examples Files`);
const exampleFolderPath = path.join(__dirname, "examples");
if (fs.existsSync(exampleFolderPath)) {
  //get all files in examples folder
  const exampleFiles = getFileWithTypeFromFolder(exampleFolderPath, ["c3p"]);
  const images = getFileWithTypeFromFolder(exampleFolderPath, [
    "png",
    "gif",
    "jpeg",
  ]);

  exampleFiles.forEach((file) => {
    const fileName = file.split(".")[0];
    readme.push(`- [${fileName}](./examples/${file})`);

    //add images
    images.forEach((image) => {
      const imageName = image.split(".")[0];
      readme.push(`</br>`);
      //check if image contains the name of the example file
      if (imageName.includes(fileName)) {
        // display the a small version of the image on a new line
        readme.push(`<img src="./examples/${image}" width="200" />`);
      }
    });
  });
}

readme.push(``);
readme.push(`---`);
readme.push(`## Properties`);
readme.push(`| Property Name | Description | Type |`);
readme.push(`| --- | --- | --- |`);

config.properties.forEach((property) => {
  readme.push(`| ${property.name} | ${property.desc} | ${property.type} |`);
});
readme.push(``);
// config.properties.forEach((property) => {
//   readme.push(`### ${property.name}`);
//   readme.push(`**Description:** <br> ${property.desc} </br>`);
//   readme.push(`**Type:** <br> ${property.type}`);
//   if (property.type === "combo") {
//     readme.push(`**Options:**`);
//     property.options.items.forEach((item) => {
//       const key = Object.keys(item)[0];
//       readme.push(`- ${key}: ${item[key]}`);
//     });
//   } else if (property.type === "link") {
//     readme.push(`**Link Text:** ${property.linkText}`);
//   }
// });

readme.push(``);
readme.push(`---`);
readme.push(`## Actions`);
readme.push(`| Action | Description | Params`);
readme.push(`| --- | --- | --- |`);

Object.keys(config.Acts).forEach((/** @type {keyof typeof config.Acts} */ key) => {
  const action = config.Acts[key];

  let paramString = "";
  if (action.params) {
    action.params.forEach((param) => {
      paramString += `${param.name}             *(${param.type})* <br>`;
    });
  }

  if (!action.isDeprecated) {
    readme.push(
      `| ${action.listName} | ${action.description} | ${paramString} |`
    );
  }
});
readme.push(``);

// Object.keys(config.Acts).forEach((key) => {
//   const action = config.Acts[key];
//   readme.push(`### ${action.listName}`);
//   readme.push(`**Description:** <br> ${action.description} </br>`);

//   if (action.isAsync) {
//     readme.push(`**Is Async:** <br> ${action.isAsync} </br>`);
//   }

//   if(action.params.length > 0){
//     readme.push(`#### Parameters:`);
//     // write parameters to indented table, with three columns (name, type, description)
//     readme.push(`| Name | Type | Description |`);
//     readme.push(`| --- | --- | --- |`);
//     action.params.forEach((param) => {
//       readme.push(
//         `| ${param.name} | ${param.type} | ${param.desc} |`
//       );
//     });
//   }
// });

readme.push(``);
readme.push(`---`);
readme.push(`## Conditions`);
readme.push(`| Condition | Description | Params`);
readme.push(`| --- | --- | --- |`);

Object.keys(config.Cnds).forEach((/** @type {keyof typeof config.Cnds} */ key) => {
  const condition = config.Cnds[key];

  let paramString = "";
  if (condition.params) {
    condition.params.forEach((param) => {
      paramString += `${param.name} *(${param.type})* <br>`;
    });
  }

  if (!condition.isDeprecated) {
    readme.push(
      `| ${condition.listName} | ${condition.description} | ${paramString} |`
    );
  }
});
readme.push(``);

// Object.keys(config.Cnds).forEach((key) => {
//   const condition = config.Cnds[key];
//   readme.push(`### ${condition.listName}`);
//   readme.push(`**Description:** <br> ${condition.description} </br>`);
//   if (condition.isTrigger) {
//     readme.push(`**Is Trigger:** <br> ${condition.isTrigger} </br>`);
//   }
//   if(condition.islooping) {
//     readme.push(`**Is Looping:** <br> ${condition.islooping} </br>`);
//   }

//   if(condition.params.length > 0) {
//     readme.push(`#### Parameters:`);
//     // write parameters to indented table, with three columns (name, type, description)
//     readme.push(`| Name | Type | Description |`);
//     readme.push(`| --- | --- | --- |`);
//     condition.params.forEach((param) => {
//       readme.push(
//         `| ${param.name} | ${param.type} | ${param.desc} |`
//       );
//     });
//   }
// });

readme.push(``);
readme.push(`---`);
readme.push(`## Expressions`);
readme.push(`| Expression | Description | Return Type | Params`);
readme.push(`| --- | --- | --- | --- |`);

Object.keys(config.Exps).forEach((/** @type {keyof typeof config.Exps} */ key) => {
  const expression = config.Exps[key];

  let paramString = "";
  if (expression.params) {
    expression.params.forEach((param) => {
      paramString += `${param.name} *(${param.type})* <br>`;
    });
  }

  if (!expression.isDeprecated) {
    readme.push(
      `| ${key} | ${expression.description} | ${expression.returnType} | ${paramString} | `
    );
  }
});
readme.push(``);
readme.push(``);
readme.push(`---`);
readme.push(`## Paths`);

const pathMappings = [
  { name: "HomeFolder", desc: "User home directory", win: "C:/Users/user", linux: "/home/user", mac: "/Users/user" },
  { name: "AppDataFolder", desc: "Application configuration data", win: "C:/Users/user/AppData/Roaming", linux: "/home/user/.config", mac: "/Users/user/Library/Application Support" },
  { name: "LocalAppDataFolder", desc: "Local application data", win: "C:/Users/user/AppData/Local", linux: "/home/user/.local/share", mac: "/Users/user/Library/Application Support" },
  { name: "UserDataFolder", desc: "App-specific data (Roaming)", win: "C:/Users/user/AppData/Roaming/com.pipelab.app", linux: "/home/user/.config/com.pipelab.app", mac: "/Users/user/Library/Application Support/com.pipelab.app" },
  { name: "LocalUserDataFolder", desc: "App-specific data (Local)", win: "C:/Users/user/AppData/Local/com.pipelab.app", linux: "/home/user/.local/share/com.pipelab.app", mac: "/Users/user/Library/Application Support/com.pipelab.app" },
  { name: "AppFolder", desc: "Application installation directory", win: "C:/Program Files/Pipelab/resources/app", linux: "/tmp/pipelab/.../Pipelab-linux-x64/resources/app", mac: "/Applications/Pipelab.app/Contents/Resources/app" },
  { name: "ProjectFilesFolder", desc: "Direct path to your game's content", win: ".../resources/app.asar/src/app", linux: "/tmp/pipelab/.../resources/app/src/app", mac: "/Applications/Pipelab.app/Contents/Resources/app/src/app" },
  { name: "CrashDumpsFolder", desc: "Crash reports storage", win: "C:/Users/user/AppData/Roaming/com.pipelab.app/Crashpad", linux: "/home/user/.config/cache_com.pipelab.app/Crashpad", mac: "/Users/user/Library/Application Support/com.pipelab.app/Crashpad" },
  { name: "DesktopFolder", desc: "User desktop", win: "C:/Users/user/Desktop", linux: "/home/user/Desktop", mac: "/Users/user/Desktop" },
  { name: "DocumentsFolder", desc: "User documents", win: "C:/Users/user/Documents", linux: "/home/user/Documents", mac: "/Users/user/Documents" },
  { name: "DownloadsFolder", desc: "User downloads", win: "C:/Users/user/Downloads", linux: "/home/user/Downloads", mac: "/Users/user/Downloads" },
  { name: "LogsFolder", desc: "Application logs", win: "C:/Users/user/AppData/Roaming/com.pipelab.app/logs", linux: "/home/user/.config/com.pipelab.app/logs", mac: "/Users/user/Library/Logs/com.pipelab.app" }
];

pathMappings.forEach(p => {
  readme.push(`### ${p.name}`);
  readme.push(`${p.desc}`);
  readme.push(`- **Windows**: \`${p.win}\``);
  readme.push(`- **Linux**: \`${p.linux}\``);
  readme.push(`- **macOS**: \`${p.mac}\``);
  readme.push(``);
});

readme.push(``);

readme.push(`## Recommended Save Location`);
readme.push(`For game saves and persistent data, especially when considering **Steam Cloud Sync**, it is highly recommended to use the **LocalUserDataFolder**.`);
readme.push(``);
readme.push(`### Why?`);
readme.push(`- **Standardization**: It follows the industry standard for each platform:`);
readme.push(`  - **Windows**: Uses \`AppData/Local\`, the correct place for large or frequent writes like game saves (unlike \`Roaming\`, which can slow down network logins).`);
readme.push(`  - **Linux**: Uses \`~/.local/share\`, adhering to the XDG Base Directory Specification for persistent data.`);
readme.push(`  - **macOS**: Uses \`~/Library/Application Support\`, the standard location for app-specific data.`);
readme.push(`- **Cloud Sync Compatibility**: Steam Cloud and other services are easily configured to watch these standard directories.`);
readme.push(``);

// Object.keys(config.Exps).forEach((key) => {
//   const expression = config.Exps[key];
//   readme.push(`### ${key}`);
//   readme.push(`**Description:** <br> ${expression.description} </br>`);
//   readme.push(`**Return Type:** <br> ${expression.returnType} </br>`);
//   if(expression.isVariadicParam) {
//     readme.push(`**Is Variadic Param:** ${expression.isVariadicParam} </br>`);
//   }
//   if(expression.params.length > 0) {
//     readme.push(`#### Parameters:`);
//     // write parameters to indented table, with three columns (name, type, description)
//     readme.push(`| Name | Type | Description |`);
//     readme.push(`| --- | --- | --- |`);
//     expression.params.forEach((param) => {
//       readme.push(
//         `| ${param.name} | ${param.type} | ${param.desc} |`
//       );
//     });
//   }
// });

fs.writeFileSync(path.join(__dirname, "README.md"), readme.join("\n"));
