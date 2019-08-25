#!/bin/bash

echo "Installing homebrew"
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

echo "Installing Git, Node and NPM"

brew update

brew install git
brew install node