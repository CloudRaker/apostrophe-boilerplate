#!/usr/bin/env bash

# Add symlinked .njk versions of html to properly reflect their content.
for f in $(git ls-files *.html); do
    p=$(realpath $(dirname $f));
    ln -sf "$p/$(basename $f)" "$p/$(basename -s .html $f).njk";
done;
