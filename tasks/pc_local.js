/*
 * grunt-pc-local
 * https://github.com/casperchen/grunt-pc-local
 *
 * Copyright (c) 2014 chyingp
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  var path = require('path');

  var getJSON = function( filepath ){
    var ret = null,
      str = grunt.file.exists(filepath) &&  grunt.file.read( filepath );

    ret = eval('('+str+')');
    return ret;
  }

  // 将代码同步到一个目录里，作用：客户端本地化
  grunt.registerMultiTask('pc_local', '本地化', function(){

    var options = this.options({
      compress: typeof grunt.option('compress') == 'undefined' ? false : grunt.option('compress')
    });
    var compress = options.compress;
    var clientLocalRoot = path.resolve(options['dir'], options['relativeTo']);
    var webRoot = path.resolve(options['appDir'], options['relativeTo']);

    var shell = require('shelljs');
    var projConfig = options.cdn;
    projConfig.jsVersion = projConfig.jsVersion || '';
    projConfig.cssVersion = projConfig.cssVersion || '';

    grunt.file.exists(clientLocalRoot) && grunt.file.delete(clientLocalRoot);
    grunt.file.mkdir(clientLocalRoot);

    var htmlRootFolder = path.resolve(clientLocalRoot, options['domain'], options['relativeTo']);
    var imgRootFolder = path.resolve(clientLocalRoot, projConfig.imgCDNRoot.replace('http://', ''), options['relativeTo']);
    var jsRootFolder = path.resolve(clientLocalRoot, projConfig.jsCDNRoot.replace('http://', ''), options['relativeTo']);
    var cssRootFolder = path.resolve(clientLocalRoot, projConfig.cssCDNRoot.replace('http://', ''), options['relativeTo']);

    var htmlFiles = grunt.file.expand({cwd: webRoot}, '**/*.html');
    var imgFiles = grunt.file.expand({cwd: webRoot}, '**/*.{png,jpg,jpeg,gif,ico}');
    var jsFiles = grunt.file.expand({cwd: webRoot}, '**/*.js');
    var cssFiles = grunt.file.expand({cwd: webRoot}, '**/*.css');

    htmlFiles.forEach(function(filepath, index){
      grunt.file.copy(path.resolve(webRoot, filepath), path.resolve(htmlRootFolder, filepath));
    });

    imgFiles.forEach(function(filepath, index){
      grunt.file.copy(path.resolve(webRoot, filepath), path.resolve(imgRootFolder, filepath));
    });

    jsFiles.forEach(function(filepath, index){
      var fromPath = path.resolve(webRoot, filepath);
      var toPath = path.resolve(jsRootFolder, path.dirname(filepath), projConfig.jsVersion, path.basename(filepath));
      // console.log('java -jar tools\\compiler.jar --js '+ fromPath +' --js_output_file ' + toPath);
      if(compress){
        var dirnameOfToPath = path.dirname(toPath);
        if(!grunt.file.exists(dirnameOfToPath)) grunt.file.mkdir(dirnameOfToPath);
        shell.exec('java -jar tools\\compiler.jar --js '+ fromPath +' --js_output_file ' + toPath); 
      }else{
        grunt.file.copy(fromPath, toPath);
      }

      // grunt.file.copy(path.resolve('dist', filepath), path.resolve(jsRootFolder, path.dirname(filepath), path.basename(filepath)));
    });

    cssFiles.forEach(function(filepath, index){
      var fromPath = path.resolve(webRoot, filepath);
      var toPath = path.resolve(cssRootFolder, path.dirname(filepath), projConfig.cssVersion, path.basename(filepath));
      if(compress){
        var dirnameOfToPath = path.dirname(toPath);
        if(!grunt.file.exists(dirnameOfToPath)) grunt.file.mkdir(dirnameOfToPath);
        shell.exec('java -jar tools\\yuicompressor-2.4.7.jar '+ fromPath +' -o ' + toPath);
      }else{
        grunt.file.copy(fromPath, toPath);
      }
    });

    //
    // var obj = {
    //   'tools/jquery.min.js': '1.url.cn/jslib/jquery/1.9.1/jquery.min.js'
    // };
    // for(var key in obj){
    //   var d = path.resolve( clientLocalRoot, obj[key] );
    //   grunt.file.copy(key, d);
    // }
  });
};

