const keyboardMapping = require('./keyboard-mapping');
const fs = require('fs');


const generateKeypad = () => {
  const result = {};

  result.title = "Open AWS Shortcut";
  result.rules = [];

  const rule = {
    description: `Open AWS with numpad keys`,
    manipulators: []
  }

  result.rules.push(rule)

  for (let key in keyboardMapping) {
    const keyMapping = keyboardMapping[key];

    // get string between 3rd and 4th slash
    const serviceName = keyMapping.split('/')[3];

    const manipulator = {
      from: {
        key_code: key,
      },
      to: [
        {
          shell_command: `/usr/bin/open -a '/Applications/Google Chrome.app' '${keyMapping}'`
        }
      ],
      type: "basic"
    }


    result.rules[0].manipulators.push(manipulator);
  }

  fs.writeFileSync('./aws-shortcuts.json', JSON.stringify(result, null, 2));

}

generateKeypad();