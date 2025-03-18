import { publish } from "c3addon";
import packageJson from "../package.json" with { type: 'json' };
const { version } = packageJson

publish({
  addonUrl: "https://www.construct.net/en/make-games/addons/1415/pipelab",
  filename: `dist/pipelabv2-${version}-sdk-v2.c3addon`,
  username: process.env.CONSTRUCT_USERNAME,
  password: process.env.CONSTRUCT_PASSWORD,
  releaseNotes: `See release notes at https://github.com/CynToolkit/construct-plugin/releases/tag/v${version}. You can also download SDK V1 there`,
});
