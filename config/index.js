import { defineConfig } from '@tarojs/cli'
import path from "node:path";


const dev = require('./dev')
const pro = require('./prod')
const config = {
  projectName: 'taro-albums',
  date: '2023-12-18',
    designWidth(input) {
        if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui/nutui-taro') > -1) {
            return 375
        }
        return 750
    },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: ['@tarojs/plugin-html',
    ['@tarojs/plugin-http',{
    enableCookie:true,
    disabledFormData:false,
    disabledBlob:false
  }],
      ['@taro-hooks/plugin-react']
  ],
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json'),
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false }
  },
  mini: {
    baseLevel:32,
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    // esnextModules: ['nutui-react'],
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-']
        }
      },
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

// module.exports = function (merge) {
//   if (process.env.NODE_ENV === 'development') {
//     return merge({}, config, require('./dev'))
//   }
//   return merge({}, config, require('./prod'))
// }

export default defineConfig((mergin, { command, mode }) => {
    // mergin 为webpack-mergin, 兼容以前的配置
    // 假如执行的命令为: "taro build --type weapp --mode test"
    // 则 command 的值为 build, mode 的值为 test
    if (mode === 'development') {
        return {
            ...config,...dev,

        }
    }  else {
        return {
           ...config,...pro
        }
    }
})