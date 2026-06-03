# GitHub CI/CD Workflows

This repository contains reusable elements of GitHub Actions - Composite Actions and Reusable Workflows - designed to be called by service teams' GitHub Actions workflows. They do things like automate the build, test, and deployment of applications and infrastructure.

Designed by GDS Engineering Enablement, for use in GDS.

## Offerings

Reusable elements and their docs:

- [Terraform Validation](./docs/terraform-validation.md) - Validate Terraform code
  - [terraform/deps](terraform/deps/README.md) - installs binaries including Terraform and related ones needed for "terraform validation" (Composite Action)
  - [pre-commit](pre-commit/action.yml) - runs pre-commit (Composite Action)
- [Terraform Module Release](./docs/terraform-module-release.md) - Release and publish Terraform modules (Reusable Workflow)
- [Dispatcher](./dispatcher/README.md) - Invokes a workflow in another repo - an implemention of the Dispatch -> Receiver pattern (Composite Action)
- [Comment-PR](./comment-pr/README.md) - Adds a comment to a pull request in another repo (typically used by the workflow that was triggered by the Dispatcher to report results back to the original PR) (Composite Action)
- [Update-check](./update-check/README.md) - Updates a Pull Request 'Check' result (green tick or red cross) on another repo (typically used by the workflow that was triggered by the Dispatcher to report results back to the original PR) (Composite Action)

## How to use the Composite Actions in this repo

In your GitHub Action workflow, you can call a Composite Action in this repo in a step like this:

`- uses: alphagov/gds-tech-and-security-github-actions/{directory-containing-action.yml}@{ref}`

For each action's usage guide, refer to each action `README.md` or `action.yml` file.

### Example

This example workflow calls the `terraform/deps` Action and `pre-commit` Action:

```yml
...

jobs:
  pre-commit-checks:
    name: Pre-commit checks
    permissions:
      contents: read
    steps:
      - name: Checkout repository
        uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2

      - name: Install terraform and dependencies
        uses: alphagov/gds-tech-and-security-github-actions/terraform/deps@195d742673ad36cd67aa1dd8847974d034668d1a # v0.1.17

      - name: Run pre-commit
        uses: alphagov/gds-tech-and-security-github-actions/pre-commit@195d742673ad36cd67aa1dd8847974d034668d1a # v0.1.17
```

(It needs terraform installed because pre-commit will run `terraform fmt`, as defined in pre-commit.yaml, that you can imagine is in the repo for this example)

The `ref` should be the full commit SHA, according to EE standard and the [GDS Way](https://gds-way.digital.cabinet-office.gov.uk/standards/source-code/using-github-actions.html#pinning-actions).

## Development of this repo

### Add new Actions

Actions are defined as [composites](https://docs.github.com/en/actions/tutorials/create-actions/create-a-composite-action). It allows each action the flexibility to be included across many workflows.

1. Install [pre-commit](https://pre-commit.com/).
1. Create a directory in the root of the repo, with the following convention: `<category [optional]>/<action_name>/action.yml`.

### Release a new Action version

1. Go to [Release Action](https://github.com/alphagov/gds-tech-and-security-github-actions/actions/workflows/_release.yml) workflow
1. Press the button `Run workflow` (only works for the `default` branch)
1. Input a name for the action. It must correspond to an existing directory in the root of the repo
1. (optional) specify a version. If not specified, it will auto-bump the latest tag
1. Press `Run workflow` again to trigger the workflow
1. The changelog is auto-generated once it is finished. If necessary, please modify it to include important changes

## How to setup Deployment Protection & Approval

The workflow templates in this repository are designed to be used with GitHub's deployment protection and approval feature. This feature allows you to require manual approval before a deployment can be executed. When merging to main branch we automatically use a 'production' environment, this can be configured with the repository setting to ensure all changes to this environment must be manually approved before applying the change.

### Steps to setup Deployment Protection & Approval

1. Go to the repository settings
2. Click on the `Branches` tab
3. Click on the `Add rule` button
4. In the `Branch name pattern` field, enter the branch name you want to protect (e.g. `main`)
5. Check the `Require pull request reviews before merging` checkbox
6. Check the `Require status checks to pass before merging` checkbox
7. Check the `Require branches to be up to date before merging` checkbox
8. Check the `Include administrators` checkbox
9. Click on `Environments` and choose the environment you want to protect (e.g. `production`)
10. Check the `Require reviewers` checkbox and select the reviewers you want to require approval from
11. Check the `Prevent self-review` checkbox

## License

This project is distributed under the [Apache License, Version 2.0](./LICENSE).
