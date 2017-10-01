# Nlpm

[![Build Status](https://travis-ci.org/Dirionz/nlpm.svg?branch=master)](https://travis-ci.org/Dirionz/nlpm)

Nlpm is tool for installing and restoring packages, using various underlying package managers. Behavior is kinda like npm but for global packages.

  - Update the restore list when you are installing new packages.
  - Restore them on another machine when you need.
  - Magic

# New Features!

  - Added support for git.
  - Added simple config file.
  - Tie a package to current os when using brew and linuxbrew.
  - Added support for brew, npm, apt and pacman.

### Installation

Nlpm requires [Node.js](https://nodejs.org/) to run.

Install from npm

```sh
$ npm i -g nlpm
```

For development environment.

```sh
$ npm install
$ ./app.js
```

### Config

Example: 

```yml
packageDir: ~/.config/nlpm/packages.json
gitAppDir: ~/Apps/
aptExtraDistros:
 - Linux Mint
```

### Todos

 - Write MORE Tests
 - Add pip and pip3
