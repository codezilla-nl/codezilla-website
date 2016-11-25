#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

PROD_BRANCH="master"
DEV_BRANCH="develop"

function doCompile {
  ./tools/ci/compile.sh
}

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o ( "$TRAVIS_BRANCH" != "$PROD_BRANCH" -a "$TRAVIS_BRANCH" != "$DEV_BRANCH" ) ]; then
    echo "Skipping deploy; just doing a build."
    doCompile
    exit 0
fi

# Save some useful information
if [ ${TRAVIS_BRANCH} == develop ]; then
    DEPLOY_KEY="deploy_key.dev"
    TARGET_BRANCH="gh-pages"
    REPO=`git config remote.origin.url`
else
    DEPLOY_KEY="deploy_key.prd"
    TARGET_BRANCH="master"
    REPO="https://github.com/codezilla-nl/codezilla-nl.github.io.git"
fi

SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

echo "Deploying to ${REPO}/${TARGET_BRANCH}"
echo "Using deploy key: ${DEPLOY_KEY}"

# Clean out existing contents
rm -rf build/ || exit 0

# Clone the existing gh-pages for this repo into build/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deploy)
git clone $REPO build
cd build
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf build/**/* || exit 0

# Run our compile script
doCompile

# Now let's go have some fun with the cloned repo
cd build
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled build (e.g. this is a README update) then just bail.
if git diff --quiet ; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add .
git commit -m "Deploy to GitHub Pages: ${SHA} - ${REPO}/${TARGET_BRANCH}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../$DEPLOY_KEY.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH
