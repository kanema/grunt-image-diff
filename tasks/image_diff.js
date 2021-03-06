/*
 * grunt-image-diff
 * https://github.com/eduardo.pacheco/image-diff
 *
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var shell = require('shelljs');

var perceptualdiff = path.join(__dirname, '../bin/perceptualdiff.exe');

module.exports = function(grunt) {

  grunt.registerMultiTask('image_diff', 'Grunt implementation of Perceptual Image Diff', function() {
    if (process.platform !== "win32") {
      grunt.log.warn('Only valid in windows, sorry :(.');
      return;
    }

    var options = this.options({
      orig: '_orig',
      test: '_test',
      diff: '_diff',
      colorfactor: '0.0',
      luminanceonly: true,
    });

    var tests = 0;

    this.files.forEach(function (f) {
      f.src.forEach(function(orig) {
        var test = orig.replace(options.orig, options.test);
        var diff = orig.replace(options.orig, options.diff);
        if (orig === diff) {
          return;
        }
        if (!grunt.file.exists(test)) {
          grunt.log.warn('Test file "' + test + '" invalid.');
          return;
        }
        
        tests++;

        var cmd = perceptualdiff + ' "' + orig + '" "' + test + '" -verbose -output "' + diff + '" ';
		if (options.luminanceonly) {
			cmd += '-luminanceonly ';
		}
		if (options.colorfactor) {
			cmd += '-colorfactor '+ options.colorfactor +' ';
		}
        var result = shell.exec(cmd, {silent:true, async:false}).output;
        
        var success = false;
        if (result.match(/PASS: /)) {
          result = result.split('PASS: ');
          success = true;
        } else {
          result = result.split('FAIL: ');
        }
        
        var msg = "Invalid file.";
        if (result && result.length > 1) {
          result = result[1].split("\r\n");
          msg = result[0];
        }

        if ( ! success) {
          grunt.fail.warn(orig + ': "' + msg + '" see diff file "' + diff + '"');
        }
      });
    });

    if (tests > 0) {
      grunt.log.ok(tests + " tested image(s).");
    } else {
      grunt.log.warn("No tested images.");
    }

  });

};