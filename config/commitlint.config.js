module.exports = {
  rules: {
    // Require blank line between subject and body
    "body-leading-blank": [2, "always"],
    // Body lines should wrap at ~72 characters
    "body-max-line-length": [2, "always", 72],
    // Require blank line before footer
    "footer-leading-blank": [2, "always"],
    // Footer lines should wrap at ~72 characters
    "footer-max-line-length": [2, "always", 72],
    // Subject line should be 50 chars or less
    "header-max-length": [2, "always", 50],
    // Subject must not be empty
    "subject-empty": [2, "never"],
    // Subject should not end with a period
    "subject-full-stop": [2, "never", "."],
    // Subject should be capitalized (sentence-case)
    "header-case": [2, "always", "sentence-case"],
  },
};
