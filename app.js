#!/usr/bin/env node
'use strict'
process.env.NODE_ENV = 'debug';

const program = require('commander');

const installController = require('./controllers/installPackages');
const restoreController = require('./controllers/restorePackages');
const updateController = require('./controllers/updatePackages');

program
  .version('1.1.5')

program
  .command('install [pkg...]')
  .alias('i')
  .description('Install one or more packages using brew')
  .option("-s, --save", "Save reference to ~/.package.json")
  .option("-o, --os", "Tie package to current os.")
  //.option('-m --manager <manager>', 'Change manager to npm, pacman or apt', /^(npm|pacman|apt)$/i, 'brew')
  .action(function(cmd, options){
    if (cmd.length > 0) {
        // Install package
        //packageController.install(cmd, options.save, options.manager);
        installController.install(cmd, options.save, options.os, 'brew');
    } else {
        // Restore packages from package.json
        restoreController.restore()
    }
  }).on('--help', function() {		
     console.log();		
     console.log('  Examples:');		
     console.log();		
     console.log('    $ nlpm install package --save');		
     console.log('    $ nlpm install');		
     console.log();		
  });

program
  .command('update')
  .alias('u')
  .description('Update packets from all managers')
  //.option('-m --manager <manager>', 'Change manager to npm, pacman or apt', /^(npm|pacman|apt)$/i, 'brew')
  .action(function(cmd, options){
    if (cmd.length > 0) {
    } else {
        // Update packages
        updateController.update()
    }
  }).on('--help', function() {		
     console.log();		
     console.log('  Examples:');		
     console.log();		
     console.log('    $ nlpm update');		
     console.log();		
  });

program
  .command('apt [pkg...]')
  .alias('ai')
  .description('Install one or more packages using apt')
  .option("-s, --save", "Save reference to ~/.package.json")
  .action(function(cmd, options){
    if (cmd.length > 0) {
        // Install package
        installController.install(cmd, options.save, false, 'apt');
    } else {
        // Restore packages from package.json
        //packageController.restore() // TODO: Should we restore here?
        console.log('No packages provided..')
    }
  }).on('--help', function() {		
     console.log();		
     console.log('  Examples:');		
     console.log();		
     console.log('    $ nlpm apt package --save');		
     console.log('    $ nlpm apt package');		
     console.log();		
  });

program
  .command('pacman [pkg...]')
  .alias('pi')
  .description('Install one or more packages using pacman')
  .option("-s, --save", "Save reference to ~/.package.json")
  .action(function(cmd, options){
    if (cmd.length > 0) {
        // Install package
        installController.install(cmd, options.save, false, 'pacman');
    } else {
        // Restore packages from package.json
        //packageController.restore() // TODO: Should we restore here?
        console.log('No packages provided..')
    }
  }).on('--help', function() {		
     console.log();		
     console.log('  Examples:');		
     console.log();		
     console.log('    $ nlpm pacman package --save');		
     console.log('    $ nlpm pacman package');		
     console.log();		
  });

program
  .command('trizen [pkg...]')
  .alias('aur')
  .description('Install one or more packages using trizen (aur)')
  .option("-s, --save", "Save reference to ~/.package.json")
  .action(function(cmd, options){
    if (cmd.length > 0) {
        // Install package
        installController.install(cmd, options.save, false, 'aur');
    } else {
        // Restore packages from package.json
        //packageController.restore() // TODO: Should we restore here?
        console.log('No packages provided..')
    }
  }).on('--help', function() {		
     console.log();		
     console.log('  Examples:');		
     console.log();		
     console.log('    $ nlpm trizen package --save');		
     console.log('    $ nlpm trizen package');		
     console.log();		
  });

program
  .command('npm [pkg...]')
  .alias('ni')
  .description('Install one or more packages using npm')
  .option("-s, --save", "Save reference to ~/.package.json")
  .action(function(cmd, options){
    if (cmd.length > 0) {
        // Install package
        installController.install(cmd, options.save, false, 'npm');
    } else {
        // Restore packages from package.json
        //packageController.restore() // TODO: Should we restore here?
        console.log('No packages provided..')
    }
  }).on('--help', function() {		
     console.log();		
     console.log('  Examples:');		
     console.log();		
     console.log('    $ nlpm npm package --save');		
     console.log('    $ nlpm npm package');		
     console.log();		
  });

program
  .command('git [pkg...]')
  .alias('g')
  .description('Install by cloning repo into dir (Dir can be specified in ~/.config/nlpm/config.yml)')
  .option("-s, --save", "Save reference to ~/.package.json")
  .action(function(cmd, options){
    if (cmd.length > 0) {
        // Install package
        installController.install(cmd, options.save, false, 'git');
    } else {
        // Restore packages from package.json
        //packageController.restore() // TODO: Should we restore here?
        console.log('No packages provided..')
    }
  }).on('--help', function() {		
     console.log();		
     console.log('  Set the app path in ~/.config/nlpm/config.yml');		
     console.log();		
     console.log('  Ex: gitAppDir: ~/Apps/');		
     console.log();		
     console.log();		
     console.log('  Examples:');		
     console.log();		
     console.log('    $ nlpm git user/repo --save');		
     console.log('    $ nlpm git user/repo');		
     console.log();		
  });

  if (!process.argv.slice(2).length) {
      program.outputHelp();
  }

program.parse(process.argv);
