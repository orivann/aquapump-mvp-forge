#!/bin/sh

# This script is the entrypoint for the development container.
# It changes the ownership of the /app directory to the non-root user
# and then executes the command passed to the container as that user.
# This is necessary to avoid permission issues with the volume mount.

set -e


