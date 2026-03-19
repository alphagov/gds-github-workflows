# Terraform Test Action

This composite action discovers and runs Terraform tests (`*.tftest.hcl`) across all modules in the repository.

It finds all directories containing `.tftest.hcl` files, then runs `terraform init -backend=false` and `terraform test` in each one.

## Usage

### With the `terraform/deps` action

Use this approach if you also need TFLint, Trivy, Checkov, or terraform-docs:

```yaml
steps:
  - name: Checkout repository
    uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2

  - name: Install terraform and dependencies
    uses: alphagov/gds-github-workflows/terraform/deps@47ffdc3007aef6b4857115b97135ed8b7b7c18ca # v0.1.7

  - name: Run pre-commit
    uses: alphagov/gds-github-workflows/pre-commit@0887a2b5712cf4e192ca4340f7c494606672a6bf # v0.1.6
```

### With `hashicorp/setup-terraform`

Use this approach if you only need Terraform itself:

```yaml
steps:
  - name: Checkout repository
    uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2

  - name: Setup Terraform
    uses: hashicorp/setup-terraform@5e8dbf3c6d9deaf4193ca7a8fb23f2ac83bb6c85 # v4.0.0
    with:
      terraform_version: v1.14.7

  - name: Run terraform test
    ...
```
