# @mkvlrn/eslint-config

![autodeploy](https://github.com/mkvlrn/eslint-config/actions/workflows/publish.yml/badge.svg)

## what

Mainly extends [AirBnb's excellent guide](https://github.com/airbnb/javascript), [disabling a few rules](readme.md#disabled-rules) in order to accommodate the projects I usually create.

It also bundles ALL `dependencies` (that should be `peerDependencies`) but since an [ESLint flat config is still so far away](https://github.com/eslint/eslint/issues/13481), everything is installed as `devDependencies`.

## install

```bash
# eslint and typescript are peerDependencies
# typescript only needed for TS projects
# npm can be replaced by yarn or pnpm
npm add eslint typescript @mkvlrn/eslint-config -D
```

## usage

Four possible configurations js/ts (and an extra for jest only) can be extended in your eslint configuration, like this:

```js
// .eslintrc.js
// this extends the typescript config for react projects
module.exports {
  extends: "@mkvlrn/eslint-config/ts-react"
  ...
}
```

Configs are:

- react typescript: `@mkvlrn/eslint-config/ts-react`
- node typescript (no react): `@mkvlrn/eslint-config/ts`
- react javascript: `@mkvlrn/eslint-config/js-react`
- node javascript (no react): `@mkvlrn/eslint-config/js`
- jest (any project using jest): `@mkvlrn/eslint-config/jest`

## disabled rules

### no-underscore-dangle

this [rule](https://eslint.org/docs/rules/no-underscore-dangle) just makes it awkward to deal with mongodb models (which have a `_id` field by default)

### import/prefer-default-export

this [rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md) spoils [tree-shaking](https://webpack.js.org/guides/tree-shaking/) (in some projects) and marks the [exporting of cloud functions that require a named export](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html) as incorrect

### react/jsx-uses-react & react/react-in-jsx-scope

react's [new jsx transform doesn't expect React to be in scope](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) when using jsx, and these rules expect it to be imported

## why is the first published version 3.0.0

Eh, I messed up...
