# grunt-pc-local

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pc-local --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pc-local');
```

## The "pc_local" task

### Overview
In your project's Gruntfile, add a section named `pc_local` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pc_local: {
      options: {
          appDir: 'dist', // 源文件所在目录
          dir: 'dist-client-local',  // 生成到哪个目录
          domain: 'ke.qq.com',    // 主域名
          cdn: {
              jsCDNRoot: 'http://7.url.cn',   // js路径前缀
              cssCDNRoot: 'http://8.url.cn',  // css路径前缀
              imgCDNRoot: 'http://9.url.cn'   // img路径前缀
          }
      },
      client: {
          options: {
              relativeTo: 'client'    // 本地包生成到哪个目录，比如这里为 'dist-client-local/client'
          }
      }
  }
})
```

### Options

#### options.appDir
Type: `String`


源文件所在目录

#### options.dir
Type: `String`

本地化打包后，文件生成到的目录

#### options.domain
Type: `String`

主域名

#### options.cdn
Type: `Object`

cdn相关配置（js、css、img），如下所示

* jsCDNRoot: 'http://7.url.cn',   // js路径前缀
* cssCDNRoot: 'http://8.url.cn',  // css路径前缀
* imgCDNRoot: 'http://9.url.cn'   // img路径前缀


### Usage Examples

下面的例子，会按照本地化打包的规则，将html文件、js、css、img图片，分别生成到对应的目录去

```
grunt.initConfig({
  pc_local: {
      options: {
          appDir: 'dist', // 源文件所在目录
          dir: 'dist-client-local',  // 生成到哪个目录
          domain: 'ke.qq.com',    // 主域名
          cdn: {
              jsCDNRoot: 'http://7.url.cn',   // js路径前缀
              cssCDNRoot: 'http://8.url.cn',  // css路径前缀
              imgCDNRoot: 'http://9.url.cn'   // img路径前缀
          }
      },
      client: {
          options: {
              relativeTo: 'client'    // 本地包生成到哪个目录，比如这里为 'dist-client-local/client'
          }
      }
  }
})
```

只需要运行下面命令

```
grunt pc_local:client
```

如果生成的js、css需要压缩，可通过`--compress`指定。默认不压缩。备注：这里css采用了`yuicompressor-2.4.7`压缩，js采用了`google  code compiler 1459`压缩。

```
grunt pc_local:client --compress
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
