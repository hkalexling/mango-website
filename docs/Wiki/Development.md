First of all, thank you for your interest in contributing to Mango! To make sure your PR can be reviewed and merged smoothly, please read the following development guideline.

#### Branches

The `master` branch contains source code for the latest stable release. In will only be updated when making new releases. The `dev` branch is where the development is actually happening. It contains new features and bug-fixes to be released in the next version.

#### General Workflow

1. Fork this repository to your own account
2. Create a new branch from **the `dev` branch**. If you are developing a new feature, please name your branch `feature/your-new-feature`. If you are working on a bug fix, please name it `fix/your-bug-fix`
3. Run `make setup` to set up the development environment. Now you are ready to develop Mango!
3. Please write unit tests for your Crytal code if possible. The test files are in the `spec/` directory
4. Please run `make test` (unit testing) and `make check` (linter and static analyzer) before submitting your PR
5. When you are done, submit a PR to merge it to **the `dev` branch** in the main repository. Your code will be reviewed and we may ask you to make further changes
6. The `dev` branch will be merged to the `master` branch when we are making a new release

If you need help, feel free to reach out to us on [gitter](https://gitter.im/mango-cr/mango). Happy hacking!