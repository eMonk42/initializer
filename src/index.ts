#!/usr/bin/env node
import * as prompt from "prompt-promise";
import { exec } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { changeSettings } from "../build/settings.js";
import {
  squirrel,
  hamster,
  defaultSettings,
  help,
  tsconigOverwrite,
} from "../build/strings.js";

export let userSettings = {
  path: "",
  github: "",
  repoName: "",
  configureTSconfig: true,
  useYarn: true,
  deleteFoldersOnError: true,
  openCode: true,
  useDashR: true,
};

const welcome = () => {
  console.log("Welcome to Repo-Initializer!");
  Math.random() >= 0.5 ? console.log(squirrel) : console.log(hamster);
  console.log(
    "Let's make starting new projects a snap!\nFind out about flags and settings using the '-h' -flag\nYou can stop the programm by typing 'exit' in any of the prompts."
  );
};

const defaultQuestions = async () => {
  let github = await prompt(
    "\nRepo-URL you want to clone (default: typescript-base): "
  );
  github === "exit" ? process.exit(0) : github;
  let path = await prompt(
    "Choose current directory as parent directory? (y: yes | n: ~/developer): "
  );
  path === "exit" ? process.exit(0) : path;
  let repoName = await prompt(
    "Wich name should the locally created repo have? "
  );
  repoName === "exit" ? process.exit(0) : repoName;
  github !== "" ? (userSettings.github = github) : github;
  path !== "y" ? path : (userSettings.path = process.cwd());

  repoName === ""
    ? repoName
    : (userSettings.repoName = repoName.replace(" ", "-"));
};

const initialize = async () => {
  return new Promise((resolve, reject) => {
    console.log(
      `\nInitializing repo '${userSettings.repoName}' in '${userSettings.path}', please stand by...`
    );
    let tscJson = "";
    userSettings.configureTSconfig !== true
      ? (tscJson = tsconigOverwrite)
      : tsconigOverwrite;
    let codeCmd = "";
    if (userSettings.openCode && userSettings.useDashR) {
      codeCmd = ` && code -r ../${userSettings.repoName}`;
    } else if (userSettings.openCode) {
      codeCmd = ` && code ../${userSettings.repoName}`;
    }
    const setupProcess = exec(
      `cd ${userSettings.path} && echo "\npreparing directory..." && git clone ${userSettings.github} ${userSettings.repoName} && echo "git repo cloned..." && cd ${userSettings.repoName} && yarn install --silent && echo "yarn initialized..." && ${tscJson} echo "\nAll Tasks executed succsessfully!" && echo "Your Repo is ready to roll!" ${codeCmd}`
    );
    setupProcess.stdout.on("data", (data) => {
      console.log(data);
    });
    setupProcess.stderr.on("data", (data) => {
      console.log(data);
    });
    setupProcess.on("exit", (code) => {
      if (code === 0) {
        resolve("wooohoo");
      } else {
        console.log("an error occurred");
        reject(new Error("exited with error code: " + code));
      }
    });
  });
};

async function readSettings() {
  try {
    return JSON.parse(
      await readFile("/home/user/.go-init.json", { encoding: "utf-8" })
    );
  } catch (err) {
    writeFile("/home/user/.go-init.json", JSON.stringify(defaultSettings), {
      encoding: "utf-8",
    });
    return defaultSettings;
  }
}

async function main() {
  //flag set
  if (process.argv[process.argv.length - 1].substr(0, 1) === "-") {
    if (process.argv[process.argv.length - 1] === "-h") {
      //prints the help-page
      console.log(help);
    } else if (process.argv[process.argv.length - 1] === "-q") {
      //no prompts here
      userSettings = await readSettings();
      try {
        welcome();
        await initialize();
        process.exit(0);
      } catch (err) {
        console.log(err.message);
      }
    } else if (process.argv[process.argv.length - 1] === "-set") {
      //change settings
      userSettings = await readSettings();
      await changeSettings(userSettings);
    } else {
      //exits due to unknown flag
      console.log("Unkown flag: " + process.argv[process.argv.length - 1]);
      process.exit(0);
    }
    //no flags set
  } else {
    userSettings = await readSettings();
    try {
      welcome();
      await defaultQuestions();
      await initialize();
      process.exit(0);
    } catch (err) {
      console.log(err.message);
    }
  }
}

main();
