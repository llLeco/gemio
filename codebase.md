# tsconfig.spec.json

```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "files": [
    "src/test.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}

```

# tsconfig.json

```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2022",
    "module": "es2020",
    "lib": [
      "es2018", 
      "dom"
    ],
    "useDefineForClassFields": false
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

```

# tsconfig.app.json

```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}

```

# package.json

```json
{
  "name": "gemio",
  "version": "0.0.1",
  "author": "Ionic Framework",
  "homepage": "https://ionicframework.com/",
  "scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build --configuration production",
  "watch": "ng build --watch --configuration development",
  "test": "ng test",
  "lint": "ng lint",
  "start:backend": "cd backend && npm run start:dev",
  "start:frontend": "ionic serve",
  "start:dev": "concurrently \"npm run start:backend\" \"npm run start:frontend --port 80\"",
  "build:full": "npm run build:frontend && npm run build:backend",
  "build:frontend": "cd frontend && ng build --prod",
  "build:backend": "cd backend && npm run build && cp -r ../frontend/dist/frontend/* ./public/"
},

  "private": true,
  "dependencies": {
    "@angular/animations": "^18.0.0",
    "@angular/common": "^18.0.0",
    "@angular/compiler": "^18.0.0",
    "@angular/core": "^18.0.0",
    "@angular/forms": "^18.0.0",
    "@angular/platform-browser": "^18.0.0",
    "@angular/platform-browser-dynamic": "^18.0.0",
    "@angular/router": "^18.0.0",
    "@capacitor/app": "6.0.0",
    "@capacitor/core": "6.1.1",
    "@capacitor/haptics": "6.0.0",
    "@capacitor/keyboard": "6.0.1",
    "@capacitor/status-bar": "6.0.0",
    "@hashgraph/sdk": "^2.49.2",
    "@ionic/angular": "^8.0.0",
    "@nestjs/cache-manager": "^2.2.2",
    "@nestjs/config": "^3.2.3",
    "axios": "^1.7.3",
    "cache-manager": "^5.7.4",
    "fs-extra": "^11.2.0",
    "ionicons": "^7.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.2"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^18.0.0",
    "@angular-eslint/builder": "^18.0.0",
    "@angular-eslint/eslint-plugin": "^18.0.0",
    "@angular-eslint/eslint-plugin-template": "^18.0.0",
    "@angular-eslint/schematics": "^18.0.0",
    "@angular-eslint/template-parser": "^18.0.0",
    "@angular/cli": "^18.0.0",
    "@angular/compiler-cli": "^18.0.0",
    "@angular/language-service": "^18.0.0",
    "@capacitor/cli": "6.1.1",
    "@ionic/angular-toolkit": "^11.0.1",
    "@types/fs-extra": "^11.0.4",
    "@types/jasmine": "~5.1.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "concurrently": "^8.2.2",
    "eslint": "^8.57.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsdoc": "^48.2.1",
    "eslint-plugin-prefer-arrow": "1.2.2",
    "jasmine-core": "~5.1.0",
    "jasmine-spec-reporter": "~5.0.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.4.0"
  },
  "description": "An Ionic project"
}

```

# karma.conf.js

```js
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};

```

# ionic.config.json

```json
{
  "name": "gemio",
  "integrations": {
    "capacitor": {}
  },
  "type": "angular"
}

```

# capacitor.config.ts

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'gemio',
  webDir: 'www'
};

export default config;

```

# angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "app": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "www",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "assets"
              },
              {
                "glob": "**/*.svg",
                "input": "node_modules/ionicons/dist/ionicons/svg",
                "output": "./svg"
              }
            ],
            "styles": ["src/global.scss", "src/theme/variables.scss"],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            },
            "ci": {
              "progress": false
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "app:build:production"
            },
            "development": {
              "buildTarget": "app:build:development"
            },
            "ci": {
              "progress": false
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "buildTarget": "app:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "assets"
              },
              {
                "glob": "**/*.svg",
                "input": "node_modules/ionicons/dist/ionicons/svg",
                "output": "./svg"
              }
            ],
            "styles": ["src/global.scss", "src/theme/variables.scss"],
            "scripts": []
          },
          "configurations": {
            "ci": {
              "progress": false,
              "watch": false
            }
          }
        },
        "lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": [
              "src/**/*.ts",
              "src/**/*.html"
            ]
          }
        }
      }
    }
  },
  "cli": {
    "schematicCollections": [
      "@ionic/angular-toolkit"
    ]
  },
  "schematics": {
    "@ionic/angular-toolkit:component": {
      "styleext": "scss"
    },
    "@ionic/angular-toolkit:page": {
      "styleext": "scss"
    }
  }
}

```

# README.md

```md
Claro, aqui está a tradução para o inglês:

# Gemio: Revolutionizing Industrial Asset Management with Digital Twins

Gemio is an innovative project aimed at transforming industrial asset management through the creation of "digital twins" using Hedera Hashgraph blockchain technology. Our name, Gemio, directly reflects our mission to generate precise and dynamic digital representations of industrial physical assets.

## Overview:
Gemio addresses the critical challenges of information sharing and traceability in the manufacturing and maintenance of high-value industrial machinery, offering a robust and efficient blockchain solution.

## Main Objectives:
1. Create dynamic and updatable digital twins of industrial assets.
2. Optimize information sharing between manufacturers, distributors, and maintenance teams.
3. Ensure the integrity, security, and accessibility of data throughout the equipment lifecycle.

## Key Technologies:
- Hedera Hashgraph for blockchain infrastructure
- Asset tokenization via Hedera Token Service (HTS)
- Decentralized storage with Hedera File Service (HFS)
- Real-time event logging using Hedera Consensus Service (HCS)
- Smart contracts for automation and access control
- Development stack: Angular, Ionic, and NestJS

## Expected Benefits:
- Greater transparency and reliability in asset information
- Reduced costs and time in maintenance and audit processes
- Improved decision-making based on accurate and updated data
- Potential for new business models, including asset-based financing

Gemio will demonstrate how blockchain technology can transform industrial asset management, promoting efficiency, reliability, and innovation across the value chain.
```

# .gitignore

```
# Specifies intentionally untracked files to ignore when using Git
# http://git-scm.com/docs/gitignore

*~
*.sw[mnpcod]
.tmp
*.tmp
*.tmp.*
UserInterfaceState.xcuserstate
$RECYCLE.BIN/

*.log
log.txt

.env
data/assets.json

/.sourcemaps
/.versions
/coverage

# Ionic
/.ionic
/www
/platforms
/plugins

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-project
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*


# Miscellaneous
/.angular
/.angular/cache
.sass-cache/
/.nx
/.nx/cache
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db

```

# .eslintrc.json

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        "@angular-eslint/component-class-suffix": [
          "error",
          {
            "suffixes": ["Page", "Component"]
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ]
      }
    },
    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"],
      "rules": {}
    }
  ]
}

```

# .editorconfig

```
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false

```

# .browserslistrc

```
# This file is used by the build system to adjust CSS and JS output to support the specified browsers below.
# For additional information regarding the format and rule options, please see:
# https://github.com/browserslist/browserslist#queries

# For the full list of supported browsers by the Angular framework, please see:
# https://angular.io/guide/browser-support

# You can see what browsers were selected by your queries by running:
#   npx browserslist

Chrome >=79
ChromeAndroid >=79
Firefox >=70
Edge >=79
Safari >=14
iOS >=14

```

# .aidigestignore

```
# Specifies intentionally untracked files to ignore when using Git
# http://git-scm.com/docs/gitignore

*~
*.sw[mnpcod]
.tmp
*.tmp
*.tmp.*
UserInterfaceState.xcuserstate
$RECYCLE.BIN/

*.log
log.txt

.env
data/assets.json

/.sourcemaps
/.versions
/coverage

# Ionic
/.ionic
/www
/platforms
/plugins

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-project
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*


# Miscellaneous
/.angular
/.angular/cache
.sass-cache/
/.nx
/.nx/cache
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db

```

# src/zone-flags.ts

```ts
/**
 * Prevents Angular change detection from
 * running with certain Web Component callbacks
 */
// eslint-disable-next-line no-underscore-dangle
(window as any).__Zone_disable_customElements = true;

```

# src/test.ts

```ts
// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

```

# src/polyfills.ts

```ts
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes recent versions of Safari, Chrome (including
 * Opera), Edge on the desktop, and iOS and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */
 
import './zone-flags';

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */

```

# src/main.ts

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

```

# src/index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>Ionic App</title>

  <base href="/" />

  <meta name="color-scheme" content="light dark" />
  <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="msapplication-tap-highlight" content="no" />

  <link rel="icon" type="image/png" href="assets/icon/favicon.png" />

  <!-- add to homescreen for ios -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
</head>

<body>
  <app-root></app-root>
</body>

</html>

```

# src/global.scss

```scss
/*
 * App Global CSS
 * ----------------------------------------------------------------------------
 * Put style rules here that you want to apply globally. These styles are for
 * the entire app and not just one component. Additionally, this file can be
 * used as an entry point to import other CSS/Sass files to be included in the
 * output CSS.
 * For more information on global stylesheets, visit the documentation:
 * https://ionicframework.com/docs/layout/global-stylesheets
 */

/* Core CSS required for Ionic components to work properly */
@import "@ionic/angular/css/core.css";

/* Basic CSS for apps built with Ionic */
@import "@ionic/angular/css/normalize.css";
@import "@ionic/angular/css/structure.css";
@import "@ionic/angular/css/typography.css";
@import "@ionic/angular/css/display.css";

/* Optional CSS utils that can be commented out */
@import "@ionic/angular/css/padding.css";
@import "@ionic/angular/css/float-elements.css";
@import "@ionic/angular/css/text-alignment.css";
@import "@ionic/angular/css/text-transformation.css";
@import "@ionic/angular/css/flex-utils.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import "@ionic/angular/css/palettes/dark.always.css"; */
/* @import "@ionic/angular/css/palettes/dark.class.css"; */
@import "@ionic/angular/css/palettes/dark.system.css";

```

# .vscode/settings.json

```json
{
  "typescript.preferences.autoImportFileExcludePatterns": ["@ionic/angular/common", "@ionic/angular/standalone"]
}

```

# .vscode/extensions.json

```json
{
    "recommendations": [
      "ionic.ionic"
    ]
}

```

# backend/vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/main.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/src/main.ts",
      "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    }
  ]
}

```

# backend/tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "typeRoots": [ "node_modules/@types" ],
  }
}

```

# backend/tsconfig.build.json

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}

```

# backend/package.json

```json
{
  "name": "gemio-backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/cli": "8.2.6",
    "@nestjs/config": "^3.2.3",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^9.0.0",
    "@nestjs/schematics": "8.0.11",
    "axios": "^1.7.3",
    "bcrypt": "^5.1.1",
    "class-validator": "^0.14.1",
    "dotenv": "^16.4.5",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.2.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^8.2.6",
    "@nestjs/schematics": "^8.0.11",
    "@nestjs/testing": "^9.4.3",
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.13",
    "@types/jest": "^29.5.1",
    "@types/node": "18.16.12",
    "@types/passport-jwt": "^4.0.1",
    "@types/passport-local": "^1.0.38",
    "@types/supertest": "^2.0.11",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "^29.5.0",
    "prettier": "^2.3.2",
    "source-map-support": "^0.5.20",
    "supertest": "^6.1.3",
    "ts-jest": "29.1.0",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.0.0",
    "tsconfig-paths": "4.2.0",
    "typescript": "^5.0.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

```

# backend/nest-cli.json

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}

```

# backend/create-test-assets.js

```js
const axios = require('axios');

const API_URL = 'http://localhost:3000/assets';

const testAssets = [
  {
    name: 'Industrial Pump A1',
    type: 'Pump',
    manufacturer: 'PumpCo',
    model: 'SuperPump 3000',
    serialNumber: 'SP3K-001',
    manufactureDate: new Date('2022-01-15').toISOString(),
    lastMaintenanceDate: new Date('2023-05-01').toISOString(),
    nextMaintenanceDate: new Date('2023-11-01').toISOString(),
    status: 'operational',
    location: { latitude: 40.7128, longitude: -74.0060 },
    specifications: { capacity: '500 l/min', power: '7.5 kW' },
    currentPerformance: { efficiency: 95, vibration: 0.15 }
  },
  {
    name: 'CNC Machine B2',
    type: 'CNC',
    manufacturer: 'MachineTech',
    model: 'PreciseCut X',
    serialNumber: 'PCX-002',
    manufactureDate: new Date('2021-11-30').toISOString(),
    lastMaintenanceDate: new Date('2023-04-15').toISOString(),
    nextMaintenanceDate: new Date('2023-10-15').toISOString(),
    status: 'maintenance',
    location: { latitude: 34.0522, longitude: -118.2437 },
    specifications: { axes: '5-axis', workArea: '1000x800x600 mm' },
    currentPerformance: { accuracy: 0.01, uptime: 92 }
  },
  {
    name: 'HVAC System C3',
    type: 'HVAC',
    manufacturer: 'CoolAir Inc.',
    model: 'EcoControl 500',
    serialNumber: 'EC500-003',
    manufactureDate: new Date('2023-02-28').toISOString(),
    lastMaintenanceDate: new Date('2023-06-01').toISOString(),
    nextMaintenanceDate: new Date('2023-12-01').toISOString(),
    status: 'operational',
    location: { latitude: 51.5074, longitude: -0.1278 },
    specifications: { capacity: '50 tons', energyRating: 'A+++' },
    currentPerformance: { efficiency: 98, energyConsumption: 45 }
  }
];

async function createTestAssets() {
  for (const asset of testAssets) {
    try {
      const response = await axios.post(API_URL, asset);
      console.log(`Created asset: ${response.data.name} with ID: ${response.data.id}`);
    } catch (error) {
      console.error(`Error creating asset ${asset.name}:`, error.response ? error.response.data : error.message);
    }
  }
}

createTestAssets();

```

# backend/README.md

```md
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

\`\`\`bash
$ npm install
\`\`\`

## Running the app

\`\`\`bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
\`\`\`

## Test

\`\`\`bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
\`\`\`

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

```

# backend/.prettierrc

```
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

# backend/.gitignore

```
# compiled output
/dist
/node_modules

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
```

# backend/.eslintrc.js

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

```

# src/theme/variables.scss

```scss
// For information on how to create your own theme, please see:
// http://ionicframework.com/docs/theming/

```

# src/environments/environment.ts

```ts
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

```

# src/environments/environment.prod.ts

```ts
export const environment = {
  production: true
};

```

# src/assets/shapes.svg

This is a file of the type: SVG Image

# src/app/app.module.ts

```ts
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandlerService } from './services/error-handler.service';

export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorHandler: ErrorHandlerService) {}

  handleError(error: any) {
    this.errorHandler.handleError(error);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

# src/app/app.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}

```

# src/app/app.component.spec.ts

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});

```

# src/app/app.component.scss

```scss

```

# src/app/app.component.html

```html
<ion-app>
  <ion-router-outlet></ion-router-outlet>
</ion-app>

```

# src/app/app-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asset-form/:id',
    loadChildren: () => import('./asset-form/asset-form.module').then( m => m.AssetFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asset-form/:id',
    loadChildren: () => import('./asset-form/asset-form.module').then( m => m.AssetFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asset/:id',
    loadChildren: () => import('./asset-details/asset-details.module').then( m => m.AssetDetailsPageModule)
  },
  {
    path: 'collection-form',
    loadChildren: () => import('./collection-form/collection-form.module').then( m => m.CollectionFormPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

# backend/test/jest-e2e.json

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}

```

# backend/test/app.e2e-spec.ts

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

```

# backend/src/main.ts

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/static', express.static(join(__dirname, '..', 'public')));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

```

# backend/src/app.service.ts

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

```

# backend/src/app.module.ts

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/asset.module';
import { AssetController } from './assets/asset.controller';
import { AssetService } from './assets/asset.service';
import { UsersModule } from './users/users.module';
import { HederaModule } from './hedera/hedera.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { CollectionController } from './collections/collection.controller';
import { CollectionService } from './collections/collection.service';

@Module({
  imports: [
    AssetsModule,
    HederaModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
  ],
  controllers: [AppController, AssetController, CollectionController],
  providers: [AppService, AssetService, CollectionService],
})
export class AppModule {}

```

# backend/src/app.controller.ts

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

```

# src/assets/icon/favicon.png

This is a binary file of the type: Image

# src/app/guards/auth.guard.ts

```ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}

```

# src/app/guards/auth.guard.spec.ts

```ts
import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

```

# src/app/login/login.page.ts

```ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    try {
      const result = await this.authService.login(this.username, this.password).toPromise();
      console.log('Login successful', result);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login failed', error);
      this.showErrorAlert(error);
    }
  }

  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: error.error?.message || 'An unexpected error occurred.',
      buttons: ['OK']
    });

    await alert.present();
  }
}

```

# src/app/login/login.page.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src/app/login/login.page.scss

```scss

```

# src/app/login/login.page.html

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Login</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <form (ngSubmit)="login()">
    <ion-item>
      <ion-label position="floating">Username</ion-label>
      <ion-input type="text" [(ngModel)]="username" name="username" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Password</ion-label>
      <ion-input type="password" [(ngModel)]="password" name="password" required></ion-input>
    </ion-item>
    <ion-button expand="block" type="submit" class="ion-margin-top">Login</ion-button>
  </form>
</ion-content>

```

# src/app/login/login.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}

```

# src/app/login/login-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}

```

# src/app/dashboard/dashboard.page.ts

```ts
import { Component, OnInit } from '@angular/core';
import { AssetService } from '../services/asset.service';
import { CollectionService } from '../services/collection.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  assets: any[] = [];
  collections: any = [];
  username: string = '';
  hederaAccountId: string = '';
  loading: boolean = true;

  constructor(
    private assetService: AssetService,
    private collectionService: CollectionService,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadUserInfo();
    this.loadCollections();
  }

  async loadUserInfo() {
    const userInfo = await this.authService.getUserInfo();
    console.log('User info', userInfo);
    this.username = userInfo.username;
    this.hederaAccountId = userInfo.hederaAccountId;
  }

  async loadCollections() {
    try {
      await this.errorHandler.showLoading('Loading collections...');
      this.collections = await this.collectionService.getCollections();
      console.log('Collections', this.collections);
      await this.errorHandler.hideLoading();
    } catch (error) {
      await this.errorHandler.hideLoading();
      this.errorHandler.handleError(error);
    }
  }

  async doRefresh(event: any) {
    try {
      this.collections = await this.collectionService.getCollections();
      this.errorHandler.showToast('Collections refreshed successfully');
    } catch (error) {
      this.errorHandler.handleError(error);
    } finally {
      event.target.complete();
    }
  }
}

```

# src/app/dashboard/dashboard.page.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src/app/dashboard/dashboard.page.scss

```scss

```

# src/app/dashboard/dashboard.page.html

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Dashboard</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>

  <ion-card>
    <ion-card-header>
      <ion-card-title>User Information</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p><strong>Username:</strong> {{ username }}</p>
      <p><strong>Hedera Account ID:</strong> {{ hederaAccountId }}</p>
    </ion-card-content>
  </ion-card>

  <ion-card>
    <ion-card-header>
      <ion-card-title>Collections</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item *ngFor="let collection of collections" [routerLink]="'/asset/' + collection.id">
          <ion-label>
            <h2>{{ collection.name }}</h2>
            <p>ID: {{ collection.id }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-button expand="block" routerLink="/collection-form">Create Collection</ion-button>
    </ion-card-content>
  </ion-card>
</ion-content>

```

# src/app/dashboard/dashboard.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}

```

# src/app/dashboard/dashboard-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}

```

# src/app/asset-form/asset-form.page.ts

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { ToastController } from '@ionic/angular';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.page.html',
  styleUrls: ['./asset-form.page.scss'],
})
export class AssetFormPage implements OnInit {
  assetForm: FormGroup = new FormGroup({});
  public collectionId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private assetService: AssetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private errorHandler: ErrorHandlerService
  ) {
    this.createForm();
  }

  async ngOnInit() {
    this.collectionId = this.route.snapshot.paramMap.get('id');
  }

  createForm() {
    this.assetForm = this.formBuilder.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      manufactureDate: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.assetForm.valid) {
      const assetData = this.assetForm.value;
      assetData.collectionId = this.collectionId;

      try {
        await this.errorHandler.showLoading('Creating asset...');

        await this.assetService.createAsset(assetData);
        this.errorHandler.showToast('Asset created successfully');

        await this.errorHandler.hideLoading();
        this.router.navigate(['/dashboard']);
      } catch (error) {
        await this.errorHandler.hideLoading();
        this.errorHandler.handleError(error);
      }
    } else {
      this.errorHandler.showToast('Please fill all required fields');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}

```

# src/app/asset-form/asset-form.page.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetFormPage } from './asset-form.page';

describe('AssetFormPage', () => {
  let component: AssetFormPage;
  let fixture: ComponentFixture<AssetFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src/app/asset-form/asset-form.page.scss

```scss

```

# src/app/asset-form/asset-form.page.html

```html
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/dashboard"></ion-back-button>
    </ion-buttons>
    <ion-title>Create Asset</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <form [formGroup]="assetForm" (ngSubmit)="onSubmit()">
    <ion-item>
      <ion-label position="floating">Name</ion-label>
      <ion-input formControlName="name" type="text"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Manufacturer</ion-label>
      <ion-input formControlName="manufacturer" type="text"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Model</ion-label>
      <ion-input formControlName="model" type="text"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Serial Number</ion-label>
      <ion-input formControlName="serialNumber" type="text"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Manufacture Date</ion-label>
      <ion-datetime formControlName="manufactureDate" display-format="DD/MM/YYYY"></ion-datetime>
    </ion-item>

    <ion-button expand="block" type="submit" [disabled]="!assetForm.valid"> Create Asset </ion-button>
  </form>
</ion-content>

```

# src/app/asset-form/asset-form.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetFormPageRoutingModule } from './asset-form-routing.module';

import { AssetFormPage } from './asset-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AssetFormPage]
})
export class AssetFormPageModule {}

```

# src/app/asset-form/asset-form-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetFormPage } from './asset-form.page';

const routes: Routes = [
  {
    path: '',
    component: AssetFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetFormPageRoutingModule {}

```

# src/app/collection-form/collection-form.page.ts

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionService } from 'src/app/services/collection.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.page.html',
  styleUrls: ['./collection-form.page.scss'],
})
export class CollectionFormPage implements OnInit {
  collectionForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private collectionService: CollectionService
  ) {
    this.createForm();
  }

  ngOnInit() { }

  createForm() {
    this.collectionForm = this.formBuilder.group({
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      description: [''],
    });
  }

  async onSubmit() {
    if (this.collectionForm.valid) {
      const assetData = this.collectionForm.value;

      try {
        await this.errorHandler.showLoading('Creating Collection...');

        await this.collectionService.createCollection(assetData);
        this.errorHandler.showToast('Collection created successfully');

        await this.errorHandler.hideLoading();
        this.router.navigate(['/dashboard']);
      } catch (error) {
        await this.errorHandler.hideLoading();
        this.errorHandler.handleError(error);
      }

    } else {
      this.errorHandler.showToast('Please fill all required fields');
    }
  }

}

```

# src/app/collection-form/collection-form.page.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionFormPage } from './collection-form.page';

describe('CollectionFormPage', () => {
  let component: CollectionFormPage;
  let fixture: ComponentFixture<CollectionFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src/app/collection-form/collection-form.page.scss

```scss

```

# src/app/collection-form/collection-form.page.html

```html
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/dashboard"></ion-back-button>
    </ion-buttons>
    <ion-title>Create Collection</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <form [formGroup]="collectionForm" (ngSubmit)="onSubmit()">

    <ion-item>
      <ion-label position="floating">Name</ion-label>
      <ion-input formControlName="name" type="text"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Symbol</ion-label>
      <ion-input formControlName="symbol" type="text"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Description</ion-label>
      <ion-input formControlName="description" type="text"></ion-input>
    </ion-item>

    <ion-button expand="block" type="submit" [disabled]="!collectionForm.valid"> Create Collection </ion-button>
  </form>
</ion-content>

```

# src/app/collection-form/collection-form.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionFormPageRoutingModule } from './collection-form-routing.module';

import { CollectionFormPage } from './collection-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CollectionFormPage]
})
export class CollectionFormPageModule {}

```

# src/app/collection-form/collection-form-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionFormPage } from './collection-form.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionFormPageRoutingModule {}

```

# src/app/asset-details/asset-details.page.ts

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { LoadingController } from '@ionic/angular';
import { CollectionService } from '../services/collection.service';
import { HederaService } from '../services/hedera.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.page.html',
  styleUrls: ['./asset-details.page.scss'],
})
export class AssetDetailsPage implements OnInit, OnDestroy {
  public assets: any[] = [];
  public collectionId: string | null = null;
  error: string | null = null;
  public newEvent: string = '';
  private messageSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService,
    private loadingController: LoadingController,
    private collectionService: CollectionService,
    private hederaService: HederaService
  ) { }

  async ngOnInit() {
    this.collectionId = this.route.snapshot.paramMap.get('id');
    if (this.collectionId) {
      await this.loadCollectionAssets(this.collectionId);
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  async loadCollectionAssets(id: string) {
    const loading = await this.loadingController.create({
      message: 'Loading asset details...',
    });
    await loading.present();

    try {
      const assets = await this.collectionService.getCollectionAssets(id);
      console.log('Assets:', assets);

      this.assets = await Promise.all(
        assets.map(async (asset) => {
          const details = await this.assetService.getAssetDetails(asset.metadata);
          console.log('Details:', details);

          const messages = await this.hederaService.getMessages(details.topicId, new Date(0)).toPromise();
          console.log('Messages:', messages);

          const assetWithDetails = {
            ...asset,
            details,
            events: messages
          };

          return assetWithDetails;
        })
      );

      console.log('Assets:', this.assets);
    } catch (error) {
      this.error = 'Failed to load asset details';
      console.error('Error loading asset details:', error);
    } finally {
      await loading.dismiss();
    }
  }

  async publishEvent(asset: any) {
    try {
      console.log('Publishing event:', this.newEvent);
      console.log('Asset:', asset);
      await this.assetService.postAssetEvent(asset.details.topicId, this.newEvent);
      this.newEvent = '';
      asset.events.push(this.newEvent);
    } catch (error) {
      console.error('Error publishing event:', error);
    }
  }
}

```

# src/app/asset-details/asset-details.page.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetDetailsPage } from './asset-details.page';

describe('AssetDetailsPage', () => {
  let component: AssetDetailsPage;
  let fixture: ComponentFixture<AssetDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src/app/asset-details/asset-details.page.scss

```scss

```

# src/app/asset-details/asset-details.page.html

```html
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/dashboard"></ion-back-button>
    </ion-buttons>
    <ion-title>Asset Details</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
    <p>Asset details</p>
    <ion-card *ngFor="let asset of assets">
      <ion-card-header>
        <ion-card-title>{{ asset.id }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item>
            <ion-label>Asset ID</ion-label>
            <p slot="end">{{ asset.id }}</p>
          </ion-item>
          <ion-item>
            <ion-label>Asset Owner</ion-label>
            <p slot="end">{{ asset.owner }}</p>
          </ion-item>
          <ion-item>
            <ion-label>Asset Serial Number</ion-label>
            <p slot="end">{{ asset.serialNumber }}</p>
          </ion-item>
          <ion-item>
            <ion-label>Asset Creation time</ion-label>
            <p slot="end">{{ asset.creationTime }}</p>
          </ion-item>
          <ion-item>
            <ion-label>Hedera File ID</ion-label>
            <p slot="end">{{ asset.metadata }}</p>
          </ion-item>
        </ion-list>

        <!-- Show metadata Content -->
        <ion-list>
          <ion-item>
            <ion-label>Metadata</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>{{ asset.details | json }}</ion-label>
          </ion-item>
        </ion-list>

        <!-- Show Events -->
        <ion-list>
          <ion-item>
            <ion-label>Events</ion-label>
          </ion-item>
          <ion-item *ngFor="let event of asset.events">
            <ion-label>{{ event }}</ion-label>
          </ion-item>
        </ion-list>

        <!-- Input to submit a json to be published as an event -->
        <ion-item>
          <ion-label position="stacked">Event Payload</ion-label>
          <ion-textarea [(ngModel)]="newEvent" placeholder="Enter the event payload"></ion-textarea>
        </ion-item>
        <ion-button (click)="publishEvent(asset)">Publish Event</ion-button>
      </ion-card-content>
    </ion-card>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button [routerLink]="'/asset-form/' + this.collectionId">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

</ion-content>

```

# src/app/asset-details/asset-details.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetDetailsPageRoutingModule } from './asset-details-routing.module';

import { AssetDetailsPage } from './asset-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetDetailsPageRoutingModule
  ],
  declarations: [AssetDetailsPage]
})
export class AssetDetailsPageModule {}

```

# src/app/asset-details/asset-details-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetDetailsPage } from './asset-details.page';

const routes: Routes = [
  {
    path: '',
    component: AssetDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetDetailsPageRoutingModule {}

```

# src/app/services/hedera.service.ts

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HederaService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMessages(topicId: string, startTime: Date): Observable<string[]> {
    const url = `${this.apiUrl}/hedera/messages`;
    const params = {
      topicId: topicId,
      startTime: startTime.toISOString()
    };

    return this.http.get<string[]>(url, { params });
  }
}

```

# src/app/services/error-handler.service.ts

```ts
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private loading: any;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async handleError(error: any) {
    let errorMessage: string;

    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        errorMessage = 'No Internet Connection';
      } else {
        // Handle Http Error (error.status === 403, 404...)
        errorMessage = `${error.status} - ${error.message}`;
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      errorMessage = error.message ? error.message : error.toString();
    }

    await this.showErrorAlert(errorMessage);
  }

  async showToast(message: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showLoading(message: string = 'Please wait...') {
    this.loading = await this.loadingController.create({
      message: message
    });
    await this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}

```

# src/app/services/collection.service.ts

```ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = 'http://localhost:3000/collections';

  constructor() { }

  private getHeaders(): { Authorization: string } {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  async getCollections(): Promise<any[]> {
    try {
      const response = await axios.get(this.apiUrl, { headers: this.getHeaders() });
      console.log('Collections:', response);
      return response.data.collections;
    } catch (error) {
      console.error('Error fetching collections', error);
      throw error;
    }
  }

  async getCollectionAssets(collectionId: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/${collectionId}/assets`, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error fetching collection NFTs', error);
      throw error;
    }
  }

  async createCollection(collectionData: any): Promise<any> {
    console.log('Creating collection', collectionData);
    try {
      const response = await axios.post(this.apiUrl, collectionData, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error creating collection', error);
      throw error;
    }
  }
}

```

# src/app/services/auth.service.ts

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo: any = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('hederaAccountId', response.hederaAccountId);

            this.userInfo = {
              username: response.username,
              hederaAccountId: response.hederaAccountId
            };
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('hederaAccountId');
    this.userInfo = null;
  }

  getUserInfo(): any {
    if (!this.userInfo) {
      this.userInfo = {
        username: localStorage.getItem('username'),
        hederaAccountId: localStorage.getItem('hederaAccountId')
      };
    }
    return this.userInfo;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

```

# src/app/services/asset.service.ts

```ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = 'http://localhost:3000/assets';

  constructor() { }

  private getHeaders(): { Authorization: string } {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  async getAllAssets(): Promise<any[]> {
    try {
      const response = await axios.get(this.apiUrl, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error fetching all assets', error);
      throw error;
    }
  }

  async getAssetById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error fetching asset by ID ${id}`, error);
      throw error;
    }
  }

  async getAssetDetails(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}/details`, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error fetching asset details for ID ${id}`, error);
      throw error;
    }
  }

  async createAsset(assetData: any): Promise<any> {

    console.log('Creating asset', assetData);

    try {
      const response = await axios.post(this.apiUrl, assetData, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error creating asset', error);
      throw error;
    }
  }

  // async updateAsset(id: string, assetData: any): Promise<any> {
  //   try {
  //     const response = await axios.put(`${this.apiUrl}/${id}`, assetData, { headers: this.getHeaders() });
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error updating asset ID ${id}`, error);
  //     throw error;
  //   }
  // }

  // async deleteAsset(id: string): Promise<any> {
  //   try {
  //     const response = await axios.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error deleting asset ID ${id}`, error);
  //     throw error;
  //   }
  // }

  async getAssetEvents(topicId: string, startTime?: Date): Promise<any[]> {
    try {
      const params = startTime ? { startTime: startTime.toISOString() } : {};
      const response = await axios.get(`${this.apiUrl}/${topicId}/events`, { headers: this.getHeaders(), params });
      console.log('getAssetEvents Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching events for asset ID ${topicId}`, error);
      throw error;
    }
  }

  async postAssetEvent(topicId: string, message: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/${topicId}/events/`, { message }, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error posting event for asset ID ${topicId}`, error);
      throw error;
    }
  }

  // async getAssetMetadataHistory(fileId: string): Promise<any[]> {
  //   try {
  //     const response = await axios.get(`${this.apiUrl}/metadata-history/${fileId}`, { headers: this.getHeaders() });
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error fetching metadata history for file ID ${fileId}`, error);
  //     throw error;
  //   }
  // }
}

```

# backend/src/models/create-asset.dto.ts

```ts
import { IsString, IsDate } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  name: string;

  @IsString()
  manufacturer: string;

  @IsString()
  model: string;

  @IsString()
  serialNumber: string;

  @IsDate()
  manufactureDate: Date;

  @IsString()
  collectionId: string;
}

```

# backend/src/models/collection.model.ts

```ts
export class Collection {
  id: string;
  name: string;
  symbol: string;
  description: string;
  createdAt: Date;

  constructor(partial: Partial<Collection>) {
    Object.assign(this, partial);
  }
}

```

# backend/src/models/asset.model.ts

```ts
export class Asset {
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  manufactureDate: Date;

  collectionId: string;
  id: string;
  topicId: string;

  constructor(partial: Partial<Asset>) {
    Object.assign(this, partial);
  }
}

```

# backend/src/hedera/hedera.service.ts

```ts
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Client,
  AccountId,
  PrivateKey,
  AccountCreateTransaction,
  Hbar,
  AccountBalanceQuery,
  TransferTransaction,
  AccountInfoQuery,
  TokenInfoQuery,
  TokenMintTransaction,
  TokenSupplyType,
  TokenCreateTransaction,
  TokenType,
  FileContentsQuery,
  FileCreateTransaction,
  TopicMessageQuery,
  TopicId,
  TopicMessageSubmitTransaction,
  TopicCreateTransaction,
  TokenId,
  TokenNftInfoQuery,
  NftId,
} from "@hashgraph/sdk";

@Injectable()
export class HederaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HederaService.name);
  private client: Client;

  constructor(
    private configService: ConfigService
  ) { }

  async onModuleInit() {
    await this.initializeClient();
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
    }
  }

  private async initializeClient() {
    const myAccountId = AccountId.fromString(this.configService.get('HEDERA_ACCOUNT_ID'));
    const myPrivateKey = PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));

    if (this.configService.get('HEDERA_NETWORK') !== 'mainnet') {
      this.client = Client.forTestnet();
      this.logger.log('Initialized Hedera client for testnet');
    } else {
      this.client = Client.forMainnet();
      this.logger.log('Initialized Hedera client for mainnet');
    }

    this.client.setOperator(myAccountId, myPrivateKey);

    this.logger.log(`Hedera client operator set to account: ${myAccountId.toString()}`);
    if (!this.client) {
      throw new Error('Hedera client was not initialized properly');
    }
  }

  getClient(): Client {
    return this.client;
  }

  async createAccount(): Promise<{ accountId: string; privateKey: string }> {
    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    const newAccount = await this.executeWithRetry(() =>
      new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(1000))
        .execute(this.client)
    );

    const getReceipt = await newAccount.getReceipt(this.client);
    const newAccountId = getReceipt.accountId;

    return {
      accountId: newAccountId.toString(),
      privateKey: newAccountPrivateKey.toString(),
    };
  }

  async getAccountBalance(accountId: string): Promise<string> {
    const balance = await this.executeWithRetry(() =>
      new AccountBalanceQuery()
        .setAccountId(AccountId.fromString(accountId))
        .execute(this.client)
    );

    return balance.hbars.toString();
  }

  async getCollectionsForAccount(accountId: string): Promise<string[]> {
    const collections: string[] = [];
    const account = AccountId.fromString(accountId);

    try {
      const accountInfo: any = await new AccountInfoQuery()
        .setAccountId(account)
        .execute(this.client);

      const tokenRelationships = accountInfo.tokenRelationships;

      for (const [tokenIdStr, relationship] of tokenRelationships._map.entries()) {
        const tokenId = TokenId.fromString(tokenIdStr);
        const tokenInfo = await new TokenInfoQuery()
          .setTokenId(tokenId)
          .execute(this.client);

        if (tokenInfo.tokenType.toString() === 'NON_FUNGIBLE_UNIQUE') {
          collections.push(tokenIdStr);
        }
      }
    } catch (error) {
      this.logger.error(`Error fetching collections for account ${accountId}:`, error);
    }

    return collections;
  }

  async getNFTsInCollection(collectionId: string): Promise<any[]> {
    const nfts: any[] = [];
    const tokenId = TokenId.fromString(collectionId);

    try {
      const tokenInfo = await new TokenInfoQuery()
        .setTokenId(tokenId)
        .execute(this.client);

      if (tokenInfo.tokenType.toString() !== 'NON_FUNGIBLE_UNIQUE') {
        this.logger.warn(`Token ${collectionId} is not an NFT collection.`);
        return nfts;
      }

      const totalSupply = tokenInfo.totalSupply.toNumber();

      for (let i = 1; i <= totalSupply; i++) {
        try {
          const nftId = new NftId(tokenId, i);
          const nftInfo = await new TokenNftInfoQuery()
            .setNftId(nftId)
            .execute(this.client);

          // this.logger.debug(`NFT ${i} info:`, JSON.stringify(nftInfo, null, 2));

          if (nftInfo && nftInfo.length > 0 && nftInfo[0].accountId) {
            nfts.push({
              id: collectionId,
              serialNumber: i.toString(),
              owner: nftInfo[0].accountId.toString(),
              metadata: nftInfo[0].metadata
                ? Buffer.from(nftInfo[0].metadata).toString('utf8')
                : null,
              creationTime: nftInfo[0].creationTime.toDate(),
            });
          } else {
            this.logger.warn(`NFT ${i} in collection ${collectionId} has unexpected structure or is burned.`);
          }
        } catch (nftError) {
          this.logger.error(`Error fetching NFT ${i} from collection ${collectionId}:`, nftError);
        }
      }
    } catch (error) {
      this.logger.error(`Error fetching NFTs for collection ${collectionId}:`, error);
    }

    return nfts;
  }

  async transferHbar(from: string, to: string, amount: number): Promise<string> {
    const transferTransaction = await this.executeWithRetry(() =>
      new TransferTransaction()
        .addHbarTransfer(AccountId.fromString(from), Hbar.fromTinybars(-amount))
        .addHbarTransfer(AccountId.fromString(to), Hbar.fromTinybars(amount))
        .execute(this.client)
    );

    const transactionReceipt = await transferTransaction.getReceipt(this.client);
    return transactionReceipt.status.toString();
  }

  async createNFTCollection(name: string, symbol: string): Promise<string> {
    const treasuryAccountId = AccountId.fromString(this.configService.get('HEDERA_ACCOUNT_ID'));
    const treasuryKey = PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));

    const nftCreate = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(treasuryAccountId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(250)
      .setSupplyKey(treasuryKey)
      .freezeWith(this.client);

    const nftCreateTxSign = await nftCreate.sign(treasuryKey);
    const nftCreateSubmit = await this.executeWithRetry(() => nftCreateTxSign.execute(this.client));
    const nftCreateRx = await nftCreateSubmit.getReceipt(this.client);
    const tokenId = nftCreateRx.tokenId;

    this.logger.log(`Created NFT with Token ID: ${tokenId}`);

    return tokenId.toString();
  }

  async mintNFT(collectionId: string, metadata: any): Promise<string> {
    try {
      const supplyKey = PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));

      // Cria um arquivo imutável com os metadados
      const fileId = await this.createImmutableFile(metadata);

      const mintTx = await new TokenMintTransaction()
        .setTokenId(collectionId)
        .setMetadata([Buffer.from(fileId.toString())])
        .freezeWith(this.client);

      const mintTxSign = await mintTx.sign(supplyKey);
      const mintTxSubmit = await this.executeWithRetry(() => mintTxSign.execute(this.client));
      const mintRx = await mintTxSubmit.getReceipt(this.client);

      const serialNumber = mintRx.serials[0].low.toString();
      this.logger.log(`NFT criado ${collectionId} com serial: ${serialNumber}, referenciando arquivo: ${fileId}`);

      return serialNumber;
    } catch (error) {
      this.logger.error(`Erro ao criar NFT ${collectionId}:`, error);
      throw error;
    }
  }

  private async createImmutableFile(content: any): Promise<string> {
    const fileCreateTx = new FileCreateTransaction()
      .setKeys([]) // Sem chaves significa que o arquivo é imutável
      .setContents(JSON.stringify(content))
      .setMaxTransactionFee(1)
      .freezeWith(this.client);

    const signedTx = await fileCreateTx.sign(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
    const submitTx = await signedTx.execute(this.client);
    const receipt = await submitTx.getReceipt(this.client);

    return receipt.fileId!.toString();
  }

  async getFileContents(fileId: string): Promise<any> {
    const query = new FileContentsQuery()
      .setFileId(fileId);

    const contents = await query.execute(this.client);
    return JSON.parse(contents.toString());
  }

  async getNFTInfo(tokenId: string): Promise<any> {
    const query = new TokenInfoQuery().setTokenId(tokenId);
    const tokenInfo = await this.executeWithRetry(() => query.execute(this.client));

    const info = {
      name: tokenInfo.name,
      symbol: tokenInfo.symbol,
      totalSupply: tokenInfo.totalSupply.toString(),
      maxSupply: tokenInfo.maxSupply.toString(),
    };

    return info;
  }

  async createTopic(assetData: any): Promise<string> {
    const transaction = new TopicCreateTransaction()
      .setAdminKey(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')))
      .setSubmitKey(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')))
      .setTopicMemo("Gemio Asset Events Log")
      .setTopicMemo(`Gemio Asset Topic - ${assetData.name} (${assetData.symbol}): Detailed asset information and updates`)
      .setMaxTransactionFee(new Hbar(1));

    const txResponse = await this.executeWithRetry(() => transaction.execute(this.client));
    const receipt = await txResponse.getReceipt(this.client);
    return receipt.topicId.toString();
  }

  async submitMessage(topicId: string, message: string): Promise<string> {
    try {
      const transaction = await new TopicMessageSubmitTransaction({ topicId, message, }).freezeWith(this.client);

      const signTx = await transaction.sign(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
      const txResponse = await this.executeWithRetry(() => signTx.execute(this.client));
      const receipt = await txResponse.getReceipt(this.client);

      return receipt.status.toString();
    } catch (error) {
      this.logger.error(`Error submitting message to topic ${topicId}:`, error);
      throw error;
    }
  }

  async getMessages(topicId, startTime, messageCount, timeout) {
    return new Promise((resolve, reject) => {
      let messages = [];

      const topicIdObj = TopicId.fromString(topicId);
      console.log(`Fetching past messages for topic ${topicId}`);

      const subscription = new TopicMessageQuery()
        .setTopicId(topicIdObj)
        .setStartTime(startTime)
        .subscribe(this.client,
          (error) => {
            console.error(error);
            subscription.unsubscribe();
            reject(error);
          },
          (message) => {
            const buffer = Buffer.from(message.contents).toString("utf8");
            messages.push(JSON.parse(buffer).message);
            if (messages.length >= messageCount) {
              subscription.unsubscribe();
              resolve(messages);
            }
          });
      setTimeout(() => {
        subscription.unsubscribe();
        resolve(messages);
      }, timeout);
    });
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        this.logger.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw lastError;
  }
}

```

# backend/src/hedera/hedera.module.ts

```ts
import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HederaService } from './hedera.service';
import { HederaController } from './hedera.controller';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule,
  ],
  providers: [HederaService],
  controllers: [HederaController],
  exports: [HederaService],
})
export class HederaModule {}

```

# backend/src/hedera/hedera.controller.ts

```ts
import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { HederaService } from './hedera.service';

@Controller('hedera')
export class HederaController {
  constructor(private readonly hederaService: HederaService) {}

  @Post('account')
  async createAccount() {
    return this.hederaService.createAccount();
  }

  @Get('balance/:accountId')
  async getBalance(@Param('accountId') accountId: string) {
    return this.hederaService.getAccountBalance(accountId);
  }

  @Post('transfer')
  async transferHbar(
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('amount') amount: number,
  ) {
    return this.hederaService.transferHbar(from, to, amount);
  }

  @Post('nft/collection')
  async createNFTCollection(@Body() body: { name: string; symbol: string }) {
    return this.hederaService.createNFTCollection(body.name, body.symbol);
  }

  @Post('nft/mint')
  async mintNFT(@Body() body: { tokenId: string; metadata: string }) {
    return this.hederaService.mintNFT(body.tokenId, body.metadata);
  }

  @Get('nft/:tokenId')
  async getNFTInfo(@Param('tokenId') tokenId: string) {
    return this.hederaService.getNFTInfo(tokenId);
  }

  @Get('messages')
  async getMessages( @Query('topicId') topicId: string, @Query('startTime') startTime: string ): Promise<any> {
    return this.hederaService.getMessages(topicId, new Date(startTime), 10, 1000);
  }
}

```

# backend/src/auth/local.strategy.ts

```ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

```

# backend/src/auth/jwt.strategy.ts

```ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '018515',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

```

# backend/src/auth/jwt-auth.guard.ts

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

```

# backend/src/auth/auth.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.hederaAccountId };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      hederaAccountId: user.hederaAccountId,
    };
  }
}

```

# backend/src/auth/auth.module.ts

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: '018515',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

```

# backend/src/auth/auth.controller.ts

```ts
import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // get server status response
  @Get('status')
  async status() {
    return { status: 'ok' };
  }
}

```

# backend/src/assets/asset.service.ts

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { HederaService } from '../hedera/hedera.service';
import { Asset } from '../models/asset.model';
import { CreateAssetDto } from '../models/create-asset.dto';

@Injectable()
export class AssetService {
  private assets: Asset[] = [];

  constructor(private readonly hederaService: HederaService) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
    try {

      const topicId = await this.hederaService.createTopic(createAssetDto);
      console.log('Topic ID:', topicId);

      const initialMetadata = {
        data: createAssetDto,
        timestamp: new Date().toISOString(),
        topicId: topicId
      };

      const serialNumber = await this.hederaService.mintNFT(createAssetDto.collectionId, initialMetadata);

      const asset = new Asset({
        ...createAssetDto,
        id: `${createAssetDto.collectionId}:${serialNumber}`,
        collectionId: createAssetDto.collectionId,
        topicId: topicId,
      });

      this.assets.push(asset);

      // Registrar evento de criação no HCS
      const createEvent = {
        type: 'ASSET_CREATED',
        assetId: asset.id,
        timestamp: new Date().toISOString(),
        details: { ...createAssetDto }
      };

      await this.hederaService.submitMessage(topicId, JSON.stringify(createEvent));

      return asset;
    } catch (error) {
      console.error('Error creating asset', error);
      throw error;
    }
  }

  async createAssetEvent(topicId: string, event: any): Promise<void> {
    try {
      await this.hederaService.submitMessage(topicId, JSON.stringify(event));
    } catch (error) {
      console.error('Error creating asset event', error);
      throw error;
    }
  }

  async getAssetEvents(assetId: string, startDate: Date): Promise<any> {
    // hedera service to get messages
    try {
      const asset = this.assets.find((a) => a.id === assetId);
      if (!asset) {
        throw new NotFoundException(`Asset with ID ${assetId} not found`);
      }

      const { topicId } = asset;
      const messages = await this.hederaService.getMessages(topicId, startDate, 10, 1000);
      return messages;
    } catch (error) {
      console.error(`Error fetching events for asset ID ${assetId}`, error);
      throw error;
    }
  }

  async getNFTInfo(tokenId: string): Promise<any> {
    return this.hederaService.getNFTInfo(tokenId);
  }
}

```

# backend/src/assets/asset.module.ts

```ts
import { Module } from '@nestjs/common';

@Module({})
export class AssetsModule {}

```

# backend/src/assets/asset.controller.ts

```ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from '../models/create-asset.dto';
import { HederaService } from '../hedera/hedera.service';

@Controller('assets')
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly hederaService: HederaService
  ) {}

  @Post()
  async createAsset(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.createAsset(createAssetDto);
  }

  @Post(':id/events')
  async createAssetEvent(@Param('id') id: string, @Body() event: any) {
    return this.assetService.createAssetEvent(id, event);
  }

  @Get(':id/events')
  async getAssetEvents(@Param('id') id: string, @Query('startTime') startTime: string) {
    const startDate = startTime ? new Date(startTime) : new Date(0);
    return this.assetService.getAssetEvents(id, startDate);
  }

  @Get(':id/details')
  async getAssetDetails(@Param('id') id: string) {
    return this.hederaService.getFileContents(id);
  }
}

```

# backend/src/users/users.service.ts

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      hederaAccountId: '0.0.534863',
      username: 'leco',
      password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
    },
  ];

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find(user => user.username === username);
  }

}

```

# backend/src/users/users.module.ts

```ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

```

# backend/src/users/user.model.ts

```ts
export class User {
  hederaAccountId: string;
  username: string;
  password: string;
}

```

# backend/src/collections/collection.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { HederaService } from '../hedera/hedera.service';
import { Collection } from '../models/collection.model';
import { Asset } from '../models/asset.model';

@Injectable()
export class CollectionService {
  constructor(private readonly hederaService: HederaService) {}

  async createCollection(name: string, symbol: string, description: string): Promise<Collection> {
    const tokenId = await this.hederaService.createNFTCollection(name, symbol);
    return new Collection({
      id: tokenId,
      name,
      symbol,
      description,
      createdAt: new Date()
    });
  }

  async getCollection(collectionId: string): Promise<Collection> {
    const info = await this.hederaService.getNFTInfo(collectionId);
    return new Collection({
      id: collectionId,
      name: info.name,
      symbol: info.symbol,
      description: 'Description not available', // Hedera não fornece descrição no TokenInfo
      createdAt: new Date() // Hedera não fornece a data de criação, então usamos a data atual
    });
  }

  async getCollectionsAndNFTs(hederaAccountId) {
    console.log('hederaAccountId', hederaAccountId);
    const collectionIds = await this.hederaService.getCollectionsForAccount(hederaAccountId);
    const collections = await Promise.all(collectionIds.map(id => this.getCollection(id)));
    const nfts = await Promise.all(collectionIds.map(async (collectionId) => {
        const nftsInCollection = await this.hederaService.getNFTsInCollection(collectionId);
        return nftsInCollection.map(nft => new Asset(Object.assign(Object.assign({}, nft), { id: `${collectionId}:${nft.serialNumber}`, tokenId: collectionId })));
    }));
    return {
        collections,
        nfts: nfts.flat()
    };
}

  async getAssetsInCollection(collectionId: string): Promise<any> {
    try {
      const nfts = await this.hederaService.getNFTsInCollection(collectionId);
      return nfts;
    } catch (error) {
      console.error('Error fetching assets', error);
      throw error;
    }
  }
}

```

# backend/src/collections/collection.module.ts

```ts
import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { HederaModule } from '../hedera/hedera.module';

@Module({
  imports: [HederaModule],
  providers: [CollectionService],
  controllers: [CollectionController],
  exports: [CollectionService]
})
export class CollectionModule {}

```

# backend/src/collections/collection.controller.ts

```ts
import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from '../models/collection.model';
import { Asset } from '../models/asset.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private configService: ConfigService
  ) {}

  @Post()
  async createCollection(@Body() collectionData: { name: string; symbol: string; description: string }): Promise<Collection> {
    return this.collectionService.createCollection(collectionData.name, collectionData.symbol, collectionData.description);
  }

  @Get()
  async getAllCollections(): Promise<any> {
    return this.collectionService.getCollectionsAndNFTs(this.configService.get('HEDERA_ACCOUNT_ID'));
  }

  @Get(':id')
  async getCollection(@Param('id') id: string): Promise<Collection> {
    return this.collectionService.getCollection(id);
  }

  @Get(':id/assets')
  async getAssetsInCollection(@Param('id') collectionId: string): Promise<Asset[]> {
    return this.collectionService.getAssetsInCollection(collectionId);
  }
}

```

