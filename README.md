# leafyGreen UI Kit

[![Build Status](https://img.shields.io/circleci/project/github/mongodb/leafygreen-ui/master.svg)](https://circleci.com/gh/mongodb/leafygreen-ui)

A set of CSS styles and React components built with design in mind.

## Developer Setup

1. Node >= 6.11.5 required.

   via [homebrew](https://brew.sh/) with `brew install node`

   via [nodejs installer](https://nodejs.org/en/)

2. yarn >= 1.16.0 installed.

3. Install dependencies and link packages.

   `yarn run init`

## Development

1. Start up storybook to see all UI components that exist.

   `yarn start`

## Development within an Application

To actively develop `leafygreen-ui` components within an application, the following script will link all `leafygreen-ui` components within your application to the local `leafygreen-ui` repository.

This will allow you to make changes to your local repository of `leafygreen-ui` and see those changes immediately reflected within your running application. This allows you to develop both in isolation (within `leafygreen-ui`) and in the context of your application.

To do this, clone this repository and navigate to the root directory (where `package.json` is located), then run the following:

```
yarn run link -- ${PATH_TO_APPLICATION}
```

The script does several things in order:

1. This builds every `leafygreen-ui` component so they are ready to be linked

2. It scans your application for any installed `leafygreen-ui` components in your `node_modules/@leafygreen-ui` folder.
   **NOTE:** If the package is new and unpublished/not installed, you will need to create a directory for the new component within your application inside `node_modules/@leafygreen-ui` before running this command.

3. If any `leafygreen-ui` components are found then the script uses `yarn link` to link every `node_modules/@leafygreen-ui` module to your local `leafygreen-ui` repository.

After the script completes, you can make changes directly to the component in your local `leafygreen-ui` repository. Once you do this, run `yarn build` in the root of the `leafygreen-ui` repository and the changes will be visible on your running application.

## Creating New Component

### Getting Started

To get started quickly and easily run `yarn create-package my-new-package`. When you run this command, we create a directory containing all of the boilerplate code that you'll need to start developing your new Component.

Note: it's important to follow the kebab-casing convention described above.

## Linting

When you run `yarn lint`, we do the following:

- We check to ensure `yarn prettier` has been run so that we have consistently formatted code.
- We run `eslint` to catch any syntax errors, unused variables, and any other easy-to-catch issues.

To lint all files in the repository, run the following:

```
yarn lint
```

## Testing

To run the unit tests for our components, run the following:

```
yarn test
```

## Commiting

When making a PR that contains changes that should be included in a package's changelog, be sure to do so by running:

```
yarn changeset
```

This will generate a `changes.json` file, keeping track of version upgrades and update descriptions. We follow semver conventions for versioning, so each change will either be major, minor, or patch.

Make sure that the PR includes the changes made by running this command.

## Publishing

1.  Build the compiled version of every UI package. This creates the dist/ folder with the transpiled code ready for distribution.

```
# To transpile and concatenate all files
yarn build
# To build TypeScript type definition files
yarn ts
```

2. Create a new branch. This is where package version updates will be pushed from.

3. Generate a changeset for each package.

```
yarn changeset version
```

4. Make sure changes made from this command are merged back into master before releasing.

5. Publish all packages to NPM using changesets. This can be done from master.

```
yarn release
```

6. Push the tags from the release up to Github.

```
git push --follow-tags
```

## Deploy gh-pages

You can deploy a static build of our Storybook site to gh-pages from the master branch.

1. First be sure you've built a static version of Storybook: `yarn build:storybook`
2. Then deploy to gh-pages: `yarn release:site`

## License

The source files in this repository are made available under the terms of the Apache License, version 2.0.
