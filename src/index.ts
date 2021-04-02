#!/usr/bin/env node
import * as prompt from "prompt-promise"
import {exec} from "child_process"
import {readFile, writeFile} from "fs";

const squirrel = `   !!!!
 !!!!!!!!
!!!!!!!!!!!   O_O
!!!  !!!!!!! /@ @\\
      !!!!!! \\ x /
     !!!!!! / m  !m
      !!!! / __ |
      !!!!|/   \\__
       !!!\\_______\\`
const hamster = `     .     .
    (>\\---/<)
    ,'     \`.
   /  q   p  \\
  (  >(_Y_)<  )
   >-' \`-' \`-<-.
  /  _.== ,=.,- \\
 /,    )\`  '(    )
; \`._.'      \`--<
:     \        |  )
 \\      )       ;_/
  \`._ _/_  ___.'-\\\\\\
    \`--\\\\\\`

const defaultSettings = {
  path: "~/developer",
  github: "https://www.github.com/gabrielheinrich/typescript-base",
  repoName: "the-new-folder-you-were-looking-for",
  configureTSconfig: true,
  useYarn: true,
  deleteFoldersOnError: true
}

let data = {}

// const changeDir = (path) => {
//   return new Promise((resolve, reject) => {
//     let changeDirShell = exec(`cd ${path}`, {
//     })
//     changeDirShell.on('exit', () => {
//       console.log("preparing directory...")
//     })
//   })
// }

// const gitClone = (github, repoName, path) => {
//   return new Promise((res, rej) => {
//     try {
//       let gitCloneShell = exec(`git clone ${github} ${repoName}`)
//       gitCloneShell.on('exit', () => {
//         console.log('git repo cloned...')
//       })
//     } catch(err) {
//       console.log(err.message)
//       exec(`rm -rf ${path}/${repoName}`)
//     }
//   })
// }

// const cdNewRepo = (repoName) => {
//   return new Promise((res, rej) => {
//     let cdIntoRepo = exec(`cd ${repoName}`)
//     cdIntoRepo.on('exit', () => {
//       console.log('preparing files...')
//     })
//   })
// }

// const yarnInit = () => {
//   return new Promise((resolve, reject) => {
//     let runYarn = exec(`yarn install --silent`)
//     runYarn.on('exit', () => {
//       console.log('yarn initialized...')
//     })
//   })
// }

// const changeTSconfig = () => {
//   return new Promise((res, rej) => {
//     let tsconfig = exec(`code -r tsconfig.json`)
//     tsconfig.on('exit', () => {
//       console.log('tsconfig.json updated...')
//     })
//   })
// }

// const mainInitialization = async () => {
//   console.log('Welcome to Repo-Initializer!')
//   Math.random()*10 >= 5? console.log(squirrel) : console.log(hamster)
//   let github = await prompt("\nRepo-URL you want to clone (default: typescript-base): ")
//   let path = await prompt("Choose current directory as parent directory? (y: yes | n: ~/developer): ")
//   let repoName = await prompt("Wich name should the locally created repo have? ")
//   if (github === "exit" || path === "exit" || repoName === "exit") {
//     process.kill
//   } else if (github === "") {
//     github = "https://www.github.com/gabrielheinrich/typescript-base"
//   }
//   path !== "y"? path = "~/developer": path = process.cwd()
//   if (repoName === "") {
//     repoName = "your new folder you were looking for"
//   }
//   repoName.replace(" ", "-")
//   repoName = "AAAAAA_like_initializer"
//   console.log(`\nStarting to create repo '${repoName}' in '${path}'...`)
//   try {
//     changeDir(path)
//       .then(() => {gitClone(github, repoName, path)})
//       .then(() => {cdNewRepo(repoName)})
//       .then(() => {yarnInit()})
//       .then(() => {changeTSconfig()})
//       .then(() => {
//         console.log("\nAll Tasks executed succsessfully!\nYour Repo is ready to roll!")
//         process.kill
//       }) 
//   } catch(err) {
//     console.log(err)
//     exec(`rm -rf ${path}/${repoName}`, (err, stdout, stderr) => {
//       console.log(err.message)
//       console.log(stdout)
//     })
//     console.log('All folders created have been removed again. sry ( ຈ ﹏ ຈ )')
//   }
// }

// mainInitialization()

const initialize = async () => {
  console.log('Welcome to Repo-Initializer!')
  Math.random() >= 0.5? console.log(squirrel) : console.log(hamster)
  console.log("Let's make start new projects a snap!\nYou can use the Flags '-q' for using the default-settings")
  let github = await prompt("\nRepo-URL you want to clone (default: typescript-base): ")
  let path = await prompt("Choose current directory as parent directory? (y: yes | n: ~/developer): ")
  let repoName = await prompt("Wich name should the locally created repo have? ")
  if (github === "exit" || path === "exit" || repoName === "exit") {
    process.kill
  } else if (github === "") {
    github = "https://www.github.com/gabrielheinrich/typescript-base"
  }
  path !== "y"? path = "~/developer": path = process.cwd()

  try {
    repoName === ""? repoName = "the-new-folder-you-were-looking-for" : repoName.replace(" ", "-")
    repoName = "AAAAAA_like_initializer"
    console.log(`\nInitializing repo '${repoName}' in '${path}', please stand by...`)
    exec(`cd ${path} && echo "\npreparing directory..." && git clone ${github} ${repoName} && echo "git repo cloned..." && cd ${repoName} && yarn install --silent && echo "yarn initialized..." && echo "{" > tsconfig.json && echo '"compilerOptions": {' >> tsconfig.json && echo '"outDir": "build",' >> tsconfig.json && echo '"watch": true,' >> tsconfig.json && echo '"alwaysStrict":true,' >> tsconfig.json && echo '"sourceMap": true,' >> tsconfig.json && echo '"types": ["node", "jest"]' >> tsconfig.json && echo '},' >> tsconfig.json && echo '"include":[ ' >> tsconfig.json && echo '"src/**/*",' >> tsconfig.json && echo '"src/app/shared/**/*",' >> tsconfig.json && echo '"typings/*.d.ts"' >> tsconfig.json && echo '],' >> tsconfig.json && echo '"exclude":[' >> tsconfig.json && echo '"node_modules",' >> tsconfig.json && echo '"jspm_packages",' >> tsconfig.json && echo '"application",' >> tsconfig.json && echo '"system",' >> tsconfig.json && echo '"dist",' >> tsconfig.json && echo '"build"' >> tsconfig.json && echo ']' >> tsconfig.json && echo '}' >> tsconfig.json && echo "\nAll Tasks executed succsessfully!" && echo "Your Repo is ready to roll!" && code ../${repoName}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        exec(`rm -rf ~/developer/${repoName}`, (err, stdout, stderr) => {
          console.log(err.message)
          console.log(stdout)
        })
        console.log('All folders created in this process have been removed again')
        process.exit()
      } else {
        console.log(`${stdout}`);
        process.exit()
      }
    });
  } catch(err) {
    console.log(err.message)
  }
}

//initialize()

function readSettings () {
  do {
    //try {
      readFile(("/home/user/.go-init.json"), {encoding: "utf-8"}, (err, settings) => {
        if (err) {
          console.log("Unable to find settings-file, trying to create one...")
          writeFile(
          "/home/user/.go-init.json",
          JSON.stringify(defaultSettings),
          {encoding: "utf-8"},
          (err) => {err? console.log("error writing file") : console.log("Created a settings-file at /home/user/.go-init.json\n"+data)})
        } else {
          data = JSON.parse(settings)
        }
      })
      console.log(data)
    // } catch(err) {
    //   console.log(err.message)
    // }
  } while(data === {})
  console.log(data)
}

readSettings()