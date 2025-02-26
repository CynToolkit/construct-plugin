import { publish } from "c3addon";
import { version } from "../package.json" with { type: 'json' };

publish({
  addonUrl: "https://www.construct.net/en/make-games/addons/1415/pipelab",
  filename: `dist/pipelab-${version}-sdk-v1.c3addon`,
  username: process.env.CONSTRUCT_USERNAME,
  password: process.env.CONSTRUCT_PASSWORD,
  releaseNotes: `See release notes at https://github.com/CynToolkit/construct-plugin/releases/tag/v${version}`,
});
