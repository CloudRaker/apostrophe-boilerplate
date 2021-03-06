# Cloudraker's Apostrophe Boilerplate

This boilerplate is a minimal starting point for [Apostrophe 2](https://github.com/punkave/apostrophe) projects built by CloudRaker.

### Creating a project using this Boilerplate

```
npm install -g apostrophe-cli && \
apostrophe create-project <shortname-without-spaces> --boilerplate https://github.com/CloudRaker/apostrophe-boilerplate.git
```


---
<a name="tableOfContents"></a>
## Table of contents

- [Getting Started](#gettingStarted)
  - [Install Technical Requirements](#installTechRequirements)
  - [Start Database Services](#startServices)
  - [Create Admin User Account](#createAdminUser)
  - [Run Site Locally](#runSiteLocally)
- [Development](#development)
  - [Post-Clone Chores](#postCloneChores)
  - [NPM Scripts](#npmScripts)
  - [Brunch](#brunch)
  - [Extending and Creating Apostrophe Modules](#apostropheModules)
  - [Apostrophe Config](#apostropheConfig)
- [References](#references)


---
<a name="gettingStarted"></a>
## Getting Started

To get started, we recommend taking a look at [the guide to create your first Apostrophe project](https://docs.apostrophecms.org/getting-started/creating-your-first-project.html). You could also take a look at [Apostrophe's CLI](https://github.com/punkave/apostrophe) or simply fork this repository.


<a name="installTechRequirements"></a>
### Install Technical Requirements

- [Node Version Manager](https://github.com/creationix/nvm#installation).
  - This project requires **Node >=8 <10 **.
  - You can check which version of Node is currently in use by running `nvm current` in a Terminal instance.
  - In the case you have a different version running, you can install the latest v8.x by running `nvm install 8`.


The following components can be installed with [Brew](https://brew.sh/), if they are not already available on your machine:

- MongoDB

```bash
brew install mongodb
```

- Redis

```bash
brew install redis
```

<a name="startServices"></a>
### Start Database Services

At this point, start the services by running these commands one at a time:

- Start Mongodb

```bash
brew services start mongodb
```

- Start Redis

```bash
brew services start redis
```


<a name="createAdminUser"></a>
### Create Admin User Account

With Apostrophe installed, the first thing to do create an admin user account so you're able to log into the CMS. Run the following command (this will prompt you for a password).

```bash
node app.js apostrophe-users:add admin admin
```


<a name="runSiteLocally"></a>
### Run Site Locally

Now you're all set!

- Run `npm run start` in a Terminal instance to start up the local server.
- Head to `localhost:3000` in your web browser.


---
<a name="development"></a>
## Development

<a name="postCloneChores"></a>
### Post-Clone Chores

#### Update NPM Dependecies

Once the project is cloned and once the Node modules are installed, it might be a good idea to update the `dependencies` and `devDependencies` list `package.json` so that the project is explicitly depending on the latest versions.

You may run [`npm outdated`](https://docs.npmjs.com/cli/outdated) to easily obtain a list of outdated packages.


<a name="npmScripts"></a>
### NPM Scripts

There are a few scripts available in the  `package.json`:

- `npm run start`: Starts the app and makes it visible at `localhost:3000` in a browser.
- `npm run debug`: TBD
- `npm run debug-monitor`: TBD
- `npm run dev`: Starts the app, and rebuilds/reloads when changes are made to files that are watched.
- `npm run njk`: (Deprecated) Renames all `*.html` files to `*.njk`.


<a name="brunch"></a>
### Brunch

Apostrophe uses [LESS](http://lesscss.org/) as a CSS preprocessor. However, for our projects, we wish to use [SASS](https://sass-lang.com/). Also, we wish to use ES6, which is not available by default with Apostrophe projects.

In order to do so, [Brunch](https://brunch.io/) was chosen to compile ES6 JavaScript and SASS files.

You most likely will not need to run this script directly, as it is used by the `npm run dev` script. Contact a CloudRaker dev admin if you need more information.


<a name="apostropheModules"></a>
### Extending and Creating Apostrophe Modules

With Apostrophe, you extend their modules and create new ones, all in the `lib/modules` directory.


#### Naming Conventions

When creating new modules, the convention is to prefix their an abbreviation of the project name. For example:

- `cr-` for CloudRaker (e.g. `cr-careers-pages`, `cr-social-links-widgets`)


<a name="apostropheConfig"></a>
### Apostrophe Config

Not much is to be edited from the config located at `./apos-config.js`, but at least these elements should be:

- `aposOptions.shortName`: Currently set by default as `'apostrophe-boilerplate'`, it should be set as the project name.
- `aposOptions.modules.apostrophe-admin-bar`: The custom content should actually be customized.

Otherwise, the modules defined in the `lib/modules` directory will be added by `...customModules` [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) at the end of the modules definition.

In order for this to work, you will need to replace `^custom-` in the `customModuleNames` variable with the prefiix you chose in the last section (ex. `^cr-`)

```
const customModuleNames = fs.readdirSync(path.resolve(__dirname, 'lib', 'modules'))
.filter(dp => /^custom-/.test(dp));
```

---
<a name="references"></a>
## References

- [Apostrophe 2 documentation site](http://apostrophecms.com)
- [Apostrophe CLI](https://github.com/punkave/apostrophe)
- [Apostrophe guide to creating your first project](http://apostrophecms.org/docs/tutorials/getting-started/creating-your-first-project.html)
