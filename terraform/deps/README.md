# Terraform Dependencies Action

This composite action installs the necessary tools and dependencies for Terraform module validation and documentation.

It installs:

- Terraform
- TFLint
- Trivy
- Checkov
- terraform-docs

## Usage

```yaml
- uses: alphagov/gds-github-workflows/terraform/deps@<release_tag>
  with: [inputs]
```

## Inputs

| Name | Description | Default |
|------|-------------|---------|
| `terraform-version` | Terraform version to use | `latest` |
| `terraform-docs-version` | Terraform-docs version to use | `v0.21.0` |
| `terraform-docs-sha256` | Terraform-docs sha256 to verify | `2fdd81b8d21ff1498cd559af0dcc5d155835f84600db06d3923e217124fc735a` |
| `tflint-version` | TFLint version to use | `latest` |
| `trivy-version` | Trivy version to use | `latest` |
| `checkov-version` | Checkov version to use | `latest` |
