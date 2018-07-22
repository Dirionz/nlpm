# Nlpm

[![Build Status](https://travis-ci.org/Dirionz/nlpm.svg?branch=master)](https://travis-ci.org/Dirionz/nlpm) [![dependencies Status](https://david-dm.org/Dirionz/nlpm/status.svg)](https://david-dm.org/Dirionz/nlpm)

Nlpm is tool for installing and restoring packages, using various underlying package managers. Behavior is kinda like npm but for global packages.

  - Update the restore list when you are installing new packages.
  - Restore them on another machine when you need.
  - Magic

# New Features!

  - Added simple config file.
  - Added support for brew, brew cask, npm, pip, trizen, apt and pacman.

### Installation

Nlpm requires [Node.js](https://nodejs.org/) 8 or later to run.

#### Notes 

Arch Linux needs 'lsb-release' package installed.

Trizen is included as a plugin and requires the following dependencies 
         'git'
         'pacutils'
         'perl>=5.20.0'
         'perl-libwww'
         'perl-term-ui'
         'pacman'
         'perl-json'
         'perl-data-dump'
         'perl-lwp-protocol-https'
         'perl-term-readline-gnu'

Install from npm

```sh
$ npm i -g nlpm
```

For development environment.

```sh
$ npm install
$ ./src/nlpm.js
```

### Config

Example: 

```yml
packageDir: ~/.config/nlpm/packages.json
aptExtraDistros:
 - Linux Mint
```

### Todos

 - Better user config
