#!/bin/bash

FILENAME=alberto-logo.svg
BASENAME=`basename ${FILENAME} .svg`

# it seems, the favicon has to be located in ${workspaceFolder}/src/
convert -density 384 -background transparent ${FILENAME} -define icon:auto-resize -colors 256 ../favicon.ico

inkscape -z -e ${BASENAME}-100x100px.png -h 100 -w 100 ${FILENAME};
