import { writeFile } from "fs/promises";
import * as prompt from "prompt-promise";

export function showSettings(settings) {
  let yesOrNo = "Yes";
  console.log("Your current settings are:\n");
  console.log("Path:\t\t\t\t" + settings.path);
  console.log("GitHub Url:\t\t\t" + settings.github);
  console.log("RepoName:\t\t\t" + settings.repoName);
  settings.configureTSconfig ? (yesOrNo = "Yes") : (yesOrNo = "No");
  console.log("Change tsconfig.json:\t\t" + yesOrNo);
  settings.useYarn ? (yesOrNo = "Yes") : (yesOrNo = "No");
  console.log("Run Yarn install:\t\t" + yesOrNo);
  settings.deleteFoldersOnError ? (yesOrNo = "Yes") : (yesOrNo = "No");
  console.log("Delete Folders on Error:\t" + yesOrNo);
  settings.openCode ? (yesOrNo = "Yes") : (yesOrNo = "No");
  console.log("Open VSCode:\t\t\t" + yesOrNo);
  settings.useDashR ? (yesOrNo = "Yes") : (yesOrNo = "No");
  console.log("Invoke VSCode using '-r':\t" + yesOrNo + "\n");
}

export async function changeSettings(settings) {
  showSettings(settings);
  let topic = "";
  do {
    topic = await prompt(
      "Type the starting letter of the setting you want to change or 'exit'|'e' to exit: "
    );
    if (topic === "p" || topic === "P") {
      const newPath = await prompt(
        "\nEnter a new path as your default parent-directory: "
      );
      if (newPath !== "") {
        settings.path = newPath;
        writeFile("/home/user/.go-init.json", JSON.stringify(settings), {
          encoding: "utf-8",
        });
        console.log(
          "'" + settings.path + "' succsessfully saved as default path!\n"
        );
        showSettings(settings);
      }
    } else if (topic === "g" || topic === "G") {
      const newGit = await prompt("\nEnter a new Git-Url: ");
      if (newGit !== "") {
        settings.github = newGit;
        writeFile("/home/user/.go-init.json", JSON.stringify(settings), {
          encoding: "utf-8",
        });
        console.log(
          "'" +
            settings.github +
            "' succsessfully saved as default repository!\n"
        );
        showSettings(settings);
      }
    } else if (topic === "r" || topic === "R") {
      const newName = await prompt(
        "\nEnter a new default name for new repositories (type 'o' for using the original name as default): "
      );
      if (newName !== "" && newName !== "o") {
        settings.repoName = newName;
        writeFile("/home/user/.go-init.json", JSON.stringify(settings), {
          encoding: "utf-8",
        });
        console.log(
          "'" +
            settings.RepoName +
            "' succsessfully saved as default name for new repositories!\n"
        );
        showSettings(settings);
      } else if (newName === "o") {
        settings.repoName = "Original Git-name";
        writeFile("/home/user/.go-init.json", JSON.stringify(settings), {
          encoding: "utf-8",
        });
        console.log(
          "Using the original name succsessfully saved as default for new repositories!\n"
        );
        showSettings(settings);
      }
    } else if (topic === "c" || topic === "C") {
      const newConfig = await prompt(
        "\nWould you like to change the tsconfig.json file on default? (y/n): "
      );
      if (newConfig === "y" || newConfig === "n") {
        newConfig === "y"
          ? (settings.configureTSconfig = true)
          : (settings.configureTSconfig = false);
        writeFile("/home/user/.go-init.json", JSON.stringify(settings), {
          encoding: "utf-8",
        });
        console.log("Settings succsessfully updated!\n");
        showSettings(settings);
      } else {
        console.log("'" + newConfig + "' is an unexpected input.");
      }
    } else if (topic === "r" || topic === "R") {
      const newYarn = await prompt(
        "\nWould you like to run 'yarn install' on default? (y/n): "
      );
      if (newYarn === "y" || newYarn === "n") {
        newYarn === "y"
          ? (settings.useYarn = true)
          : (settings.useYarn = false);
        writeFile("/home/user/.go-init.json", JSON.stringify(settings), {
          encoding: "utf-8",
        });
        console.log("Settings succsessfully updated!\n");
        showSettings(settings);
      } else {
        console.log("'" + newYarn + "' is an unexpected input.");
      }
    } else if (topic === "d" || topic === "D") {
      const newFolder = await prompt(
        "\nWould you like delete folders when an error occurs on default? (y/n): "
      );
      if (newFolder === "y" || newFolder === "n") {
        newFolder === "y"
          ? (settings.deleteFoldersOnError = true)
          : (settings.deleteFoldersOnError = false);
        writeFile("/home/user/.go-init.json", JSON.stringify(settings), {
          encoding: "utf-8",
        });
        console.log("Settings succsessfully updated!\n");
        showSettings(settings);
      } else {
        console.log("'" + newFolder + "' is an unexpected input.");
      }
    } else if (topic === "o" || topic === "O") {
      const newCode = await prompt(
        "\nWould you like to open VS Code on default? (y/n): "
      );
      if (newCode === "y" || newCode === "n") {
        newCode === "y"
          ? (settings.openCode = true)
          : (settings.openCode = false);
        writeFile("/home/user/.go-init.json", JSON.stringify(settings), {
          encoding: "utf-8",
        });
        console.log("Settings succsessfully updated!\n");
        showSettings(settings);
      } else {
        console.log("'" + newCode + "' is an unexpected input.");
      }
    } else if (topic === "i" || topic === "I") {
      const newCodeDash = await prompt(
        "\nWould you like to open VS Code on default? (y/n): "
      );
      if (newCodeDash === "y" || newCodeDash === "n") {
        newCodeDash === "y"
          ? (settings.useDashR = true)
          : (settings.useDashR = false);
        writeFile("/home/user/.go-init.json", JSON.stringify(settings), {
          encoding: "utf-8",
        });
        console.log("Settings succsessfully updated!\n");
        showSettings(settings);
      } else {
        console.log("'" + newCodeDash + "' is an unexpected input.");
      }
    } else if (topic === "exit" || topic === "e") {
      process.exit(0);
    } else {
      console.log("\nSry, I don't know what you mean by '" + topic + "'.");
    }
  } while (topic !== "exit" && topic !== "e");
}
