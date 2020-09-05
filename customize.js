window.config = config;

function createElementsFromConfig(config) {
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

  const inputEl = createInput();
  inputEl.parent("customize-container");
  inputEl.value(value);
  inputEl.input(onConfigChange(mainConfig, subConfig));

  const incButton = createButton("+");
  incButton.parent("customize-container");
  incButton.style("margin-left", "0.5rem");
  incButton.mousePressed(onButtonPress(mainConfig, subConfig, inputEl, "+"));

  const decButton = createButton("-");
  decButton.parent("customize-container");
  decButton.style("margin-left", "0.5rem");
  decButton.mousePressed(onButtonPress(mainConfig, subConfig, inputEl, "-"));
}

function onConfigChange(mainConfig, subConfig) {
  return (e) => {
    setNewConfig(mainConfig, subConfig, e.target.value);
  };
}

function onButtonPress(mainConfig, subConfig, el, mode) {
  return () => {
    if (mode === "+") {
      const newValue = Number(el.value()) + 5;
      setNewConfig(mainConfig, subConfig, newValue);
      el.value(newValue);
    } else if (mode === "-") {
      const newValue = Number(el.value()) - 5;
      setNewConfig(mainConfig, subConfig, newValue);
      el.value(newValue);
    }
  };
}

setNewConfig = (mainConfig, subConfig, newValue) => {
  let newConfig = window.config;
  newConfig = {
    ...newConfig,
    [mainConfig]: {
      ...newConfig[mainConfig],
      [subConfig]: Number(newValue),
    },
  };
  window.config = newConfig;
  initialize(newConfig);
  return newConfig;
};
