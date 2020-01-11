#!/bin/bash

# it seems, the favicon has to be located in ${workspaceFolder}/src/
convert -density 384 -background transparent alberto-logo.svg -define icon:auto-resize -colors 256 ../favicon.ico
