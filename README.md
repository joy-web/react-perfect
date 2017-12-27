# react-perfect-component
京东金融Weus前端团队出品，最好用的react前端组件库。

The perfect react component library, produced by JDJR Weus big front-end team :).

## Features
- 前端模块化的最佳实践。
- 支持多种场景，高灵活性可配置。
- 探索金融科技产品的通用设计风格。

## Install

```bash
git clone git@github.com:joy-web/react-perfect-component.git
cd react-perfect-component
npm install
```

## Example
```
npm run serve:examples
```

## Specification
**perfect组件化规范，待更新。**

## Contribute
### Component
perfect是一个开源项目，我们欢迎您贡献自己的代码。请将符合perfect规范的组件放置在`/components`目录下，并记得去`/docs`和`/examples`里更新对应文档和实例哦。

### Document

The React Perfect Component docs use the Jekyll to generator. If you want to update the document, please exec the following command to start the document service.

#### Install Jekyll

1. Make sure you have installed the ruby. And we use the brew to manage ruby.
  ```
    brew update
    brew upgrade
    gem update 
    # or 
    sudo gem update
  ```
2.  Install jekyll and dependency package.
```
gem install jekyll bundler
cd docs
bundle install
# or
bundle update
```

You can refer to more information to http://jekyllrb.com/

#### Run doc server
```
npm run serve:docs
```
Then, You can open the serve in browser: http://0.0.0.0:9001/


## Issue

https://github.com/joy-web/react-perfect-component/issues

## CHANGELOG

Please view [here](./CHANGELOG.md)
