# Add-Reviewers-Action

GitHub Action to add reviewer(s) to a pull request.

GitHub will add CODEOWNERS as reviewers at the start of a pull request, before any steps of the workflow have run or passed. This action allows reviewers to be specified so that they will be added when this step of the workflow runs, such as at the end of a workflow, instead of at the start to avoid early notifications while work is not ready.

## Usage

```
- name: Add Pull Request Reviewer
      uses: sakhnovict/add-reviewers-action@1.0.0
      with:
        reviewers: "sakhnovict,another_user"
        token: ${{ secrets.GITHUB_TOKEN }}
```

### Action Inputs

| Name        | Description                                                                                                                                                | Default        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `token`     | `GITHUB_TOKEN` or a `repo` scoped [PAT](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). | `GITHUB_TOKEN` |
| `reviewers` | The email or user name of the reviewer(s) to add. If more than one use a comma separated list.                                                             | none           |
| `remove`    | Remove a review request (boolean)                                                                                                                          | `false`        |

### Action Outputs

None

### Action Result

Fails workflow when invalid reviewer added, this may be the result of an incorrect name or email, or user is not codeowner or collaborator.
