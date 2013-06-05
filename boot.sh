#!/usr/bin/env bash

# {{{ Utilities

<%= import 'vagrant-shell-scripts/ubuntu.sh' %>

# }}}

apt-mirror-pick 'us'

# Install Yeoman (node package)
# if [ command -v yeoman >/dev/null 2>&1 ]
if [ -x /usr/bin/yo ]
then
    echo 'Yeoman is installed. '
else
    echo 'Install yeoman. '
    apt-packages-update
    apt-packages-install ruby1.9.1 ruby1.9.1-dev rubygems1.9.1 rake rbenv

    #curl -L get.rvm.io | bash -s stable --auto
    #curl -L https://get.rvm.io | bash -s -- --auto-dotfiles

    ruby-gems-install pkg-config
    ruby-gems-install compass
    ruby-gems-install bundler

    # Compass - see: http://compass-style.org/install/
    if [ type compass >/dev/null 2>&1 ]
    then
        sudo gem install compass
    fi

    apt-packages-install software-properties-common python-software-properties python g++ make build-essential git-core python curl

    # Install Yeoman and dependencies 
    # Use `curl -L get.yeoman.io | bash` to check dependencies

    # See: 
    # http://yeoman.io/
    # https://github.com/yeoman/yeoman/issues/461
    # https://github.com/yeoman/yeoman/wiki/Manual-Install

    apt-packages-install libssl-dev libfontconfig libjpeg-progs optipng


    apt-packages-ppa 'chris-lea/node.js'
    apt-packages-update
    apt-packages-install nodejs

    # set node path
    echo 'if [ -d "/usr/lib/node_modules" ]; then NODE_PATH="/usr/lib/node_modules"; fi' >> ~/.profile
    sudo npm install -g yo grunt-cli bower generator-angular grunt-phonegap-build 
fi