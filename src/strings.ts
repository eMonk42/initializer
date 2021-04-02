export const squirrel = `   !!!!
 !!!!!!!!
!!!!!!!!!!!   O_O
!!!  !!!!!!! /@ @\\
      !!!!!! \\ x /
     !!!!!! / m  !m
      !!!! / __ |
      !!!!|/   \\__
       !!!\\_______\\`;
export const hamster = `     .     .
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
    \`--\\\\\\`;

export const defaultSettings = {
  path: "~/developer",
  github: "https://github.com/gabrielheinrich/typescript-base.git/",
  repoName: "Original Git-name",
  configureTSconfig: true,
  useYarn: true,
  deleteFoldersOnError: true,
  openCode: true,
  useDashR: true,
};

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

export const help =
  "Welcome to Repo-Intializer!\nHere are some Flags you can use:\n\t-h\tprints this help-instruction\n\t-q\tuses the default settings so no user input is required\n\t-set\tcalls a subprogramm to change your user-settings that are used as default settings then";

export let tsconigOverwrite = `echo "{" > tsconfig.json && echo '"compilerOptions": {' >> tsconfig.json && echo '"outDir": "build",' >> tsconfig.json && echo '"watch": true,' >> tsconfig.json && echo '"alwaysStrict":true,' >> tsconfig.json && echo '"sourceMap": true,' >> tsconfig.json && echo '"types": ["node", "jest"]' >> tsconfig.json && echo '},' >> tsconfig.json && echo '"include":[ ' >> tsconfig.json && echo '"src/**/*",' >> tsconfig.json && echo '"src/app/shared/**/*",' >> tsconfig.json && echo '"typings/*.d.ts"' >> tsconfig.json && echo '],' >> tsconfig.json && echo '"exclude":[' >> tsconfig.json && echo '"node_modules",' >> tsconfig.json && echo '"jspm_packages",' >> tsconfig.json && echo '"application",' >> tsconfig.json && echo '"system",' >> tsconfig.json && echo '"dist",' >> tsconfig.json && echo '"build"' >> tsconfig.json && echo ']' >> tsconfig.json && echo '}' >> tsconfig.json &&`;
