# 项目创建流程

初始化项目

```bash
npx create-react-app myApp --template typescript
```

安装 prettier

```bash
yarn add prettier --dev --exact prettier
```

切换为 18 或以上版本的 node

```
nvm use 18
```

在**tsconfig.json**中的`compilerOptions`加上

```json
"baseUrl": "./src"
```

初始化 git

```bash
git init
```

安装 lint-staged

```bash
npx mrm lint-staged
```

安装*prettier*与*eslint*兼容插件  
_旧版本需要在**package.json**中的**eslintConfig**字段的**extends**数组中加上`prettier`_

```bash
yarn add eslint-config-prettier -D
yarn add eslint-plugin-prettier -D
```

创建 eslint 配置文件

```bash
echo 'module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier", "react-hooks"],
  rules: {},
};' > .eslintrc.js

```

安装**commitlint**，使得**commit**的**message**必须符合标准格式

```bash
yarn add @commitlint/{config-conventional,cli} -D
```

符合**commitlint**的格式包括
**`build`**、
**`chore`**、
**`ci`**、
**`docs`**、
**`feat`**、
**`fix`**、
**`perf`**、
**`refactor`**、
**`revert`**、
**`style`**、
**`test`**

创建**commitlint**配置文件

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

安装**husky**

```bash
yarn add husky@^8 -D
```

为**husky**添加钩子

```bash
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

在 **package.json** 加入对`ts`、`tsx`格式化的支持

```json
  "lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }
```

添加配置文件.prettierrc.js

```bash
echo "module.exports = {
    tabWidth:4
}" > .prettierrc.js
```

# 使用 craco 配置 devServer

安装`craco`

```bash
yarn add -D @craco/craco
```

创建配置文件`craco.config.js`

```bash
echo 'module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
};' > craco.config.js
```

将`package.json`中的`react-scripts`替换成`craco`

```diff
"scripts": {
-  "start": "react-scripts start"
+  "start": "craco start"
-  "build": "react-scripts build"
+  "build": "craco build"
-  "test": "react-scripts test"
+  "test": "craco test"
}
```

安装`react-router-dom`、`axios`、`antd`、`sass`

```bash
yarn add react-router-dom
yarn add axios
yarn add antd
yarn add sass
```

## 删除服务器旧的代码

```shell
ssh blb
rm -rf /usr/share/nginx/html/lianlianbushe.com
```

## 复制代码到服务器

```shell
scp -r ./dist blb:/usr/share/nginx/html/lianlianbushe.com
```

## 更新 nginx 配置

```shell
ssh blb
scp ./nginx.conf blb:/etc/nginx/nginx.conf
systemctl restart nginx
```
