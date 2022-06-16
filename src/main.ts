import { Octokit } from "@octokit/rest";

import {
  getInput, setFailed,
} from '@actions/core';
import { context } from "@actions/github";

async function run(): Promise<void> {
  try {
    const rawReviewers = getInput('reviewers');
    const removeRequest = getInput('remove').toLocaleLowerCase() === 'true';
    const reviewers = rawReviewers.split(',');
    const token = process.env.GITHUB_TOKEN || getInput('token');
    const octokit = new Octokit({ auth: `token ${token}`});

    if (context.payload.pull_request === null) {
      setFailed('No pull request found');
      return;
    }

    const pullRequestNumber = context.payload.pull_request?.number;
    const params = {
      ...context.repo,
      pull_number: pullRequestNumber,
      reviewers,
    };

    const pullNumber = params.pull_number;
    if (pullNumber) {
      const preparedParams = {
        ...params,
        pull_number: pullNumber,
      };

      if (removeRequest) {
        octokit.pulls.deleteReviewRequest(preparedParams);
        return;
      }

      octokit.pulls.createReviewRequest(preparedParams);

    } else {
      setFailed('Pull number required for remove reviewers');
    }

  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
