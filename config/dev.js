import { defineConfig } from '@tarojs/cli'
const config = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },

  mini: {},
  h5: {},

}
export default defineConfig({
  ...config,
  plugins:['@tarojs/plugin-react-devtools']
})