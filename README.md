# grunt-image-diff

> Grunt implementation of Perceptual Image Diff

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-image-diff --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-image-diff');
```

## The "image_diff" task

### Overview
In your project's Gruntfile, add a section named `image_diff` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  image_diff: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.orig
Type: `String`
Default value: `'_orig'`

A string value original file pattern.

#### options.diff
Type: `String`
Default value: `'_diff'`

A string value difference file pattern.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  image_diff: {
	options: {
	  orig: '_orig',
	  diff: '_diff'
	},
	src: './screenshots/*.png'
  },
});
```
## Release History
_(Nothing yet)_
