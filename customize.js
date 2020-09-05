window.config = config;

function createConfigEditElements(config) {
  const configEntries = Object.entries(config);
  configEntries.forEach((configEntry) => {
    createHeading(configEntry[0]);
    createSubConfigElements(config[configEntry[0]], configEntry[0]);
  });
}

function createHeading(title) {
  const heading = createDiv(title);
  heading.style("margin-top", "0.5rem");
  heading.style("font-size", "20px");
  heading.style("font-weight", "bold");
  heading.parent("customize-container");
}

function createSubConfigElements(subConfig, mainConfig) {
  const configEntries = Object.entries(subConfig);
  configEntries.forEach((configEntry) => {
    createLabelAndInput(configEntry[1], configEntry[0], mainConfig);
  });
}

function createLabelAndInput(value, subConfig, mainConfig) {
  const labelEl = createDiv(subConfig);
  labelEl.parent("customize-container");
  labelEl.style("margin", "0.3rem 0");

  const inputEl = createInput();
  inputEl.parent("customize-container");
  inputEl.value(value);
  inputEl.input(onConfigChange(mainConfig, subConfig));

  if (!mainConfig.toLowerCase().includes("color")) {
    const incButton = createButton("+");
    incButton.parent("customize-container");
    incButton.style("margin-left", "0.5rem");
    incButton.mousePressed(onButtonPress(mainConfig, subConfig, inputEl, "+"));

    const decButton = createButton("-");
    decButton.parent("customize-container");
    decButton.style("margin-left", "0.5rem");
    decButton.mousePressed(onButtonPress(mainConfig, subConfig, inputEl, "-"));
  }
}

function onConfigChange(mainConfig, subConfig) {
  return (e) => {
    updateConfig(mainConfig, subConfig, e.target.value);
  };
}

function onButtonPress(mainConfig, subConfig, inputEl, mode) {
  return () => {
    let newValue = Number(inputEl.value());
    if (mode === "+") {
      newValue += 5;
    } else if (mode === "-") {
      newValue -= 5;
    }
    updateConfig(mainConfig, subConfig, newValue);
    inputEl.value(newValue);
  };
}

updateConfig = (mainConfig, subConfig, newValue) => {
  let newConfig = window.config;

  if (Number(newValue) || newValue === "0") {
    newValue = Number(newValue);
  } else if (isColor(newValue)) {
    newValue = getColorArray(newValue);
  } else {
    return;
  }

  newConfig = {
    ...newConfig,
    [mainConfig]: {
      ...newConfig[mainConfig],
      [subConfig]: newValue,
    },
  };

  window.config = newConfig;
  initialize(newConfig);

  return newConfig;
};

const isColor = (value) => {
  const splittedByComma = value.split(",");
  return splittedByComma.length === 3 && splittedByComma.every((item) => item);
};

const getColorArray = (value) => {
  return value.split(",");
};
