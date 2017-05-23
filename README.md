# uba plugin generator

## 说明

创建`uba`的插件，赋予`uba`更强的能力

## 使用

生成`uba`插件模板


```bash
uba plugin name
```

创建`name`作为你的工程名，`name`包含`uba-`的前缀，如：`uba plugin webpack-react`会生成`uba-webpack-react`，使用方法`uba webpack-react`这样来加载插件

## 插件调试

```bash
npm test
```

可以修改`package.json`里面的`test`命令脚本来模拟加载插件的环境


## 更多

如果想挖掘更多的`uba`插件，请点击[Npmjs for uba-*](https://www.npmjs.com/search?q=uba-)
