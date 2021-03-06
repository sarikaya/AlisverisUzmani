#!/usr/bin/env bash

# {{{ Utilities

<%= import 'vagrant-shell-scripts/ubuntu.sh' %>

# }}}

apt-mirror-pick 'us'

if [ -d /vagrant/dist ]
then
    echo 'vagrant boot.sh is skipped'
    echo 'because there is a /vagrant/dist folder'
else
    echo 'boot.sh is running now'
    echo 'because there is not a /vagrant/dist folder'
    
    cd /vagrant
    
    apt-packages-update
    
    echo '############ commpass ###############################################'
    # FIXME: it is not needed
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
    
    echo '############# yo dependencies #######################################'
    apt-packages-install software-properties-common python-software-properties python g++ make build-essential git-core python curl

    # Install Yeoman and dependencies 
    # Use `curl -L get.yeoman.io | bash` to check dependencies

    # See: 
    # http://yeoman.io/
    # https://github.com/yeoman/yeoman/issues/461
    # https://github.com/yeoman/yeoman/wiki/Manual-Install

    apt-packages-install libssl-dev libfontconfig libjpeg-progs optipng



    echo '############# nodejs ################################################'
    apt-packages-ppa 'chris-lea/node.js'
    apt-packages-update
    apt-packages-install nodejs

    # set node path
    echo 'if [ -d "/usr/lib/node_modules" ]; then NODE_PATH="/usr/lib/node_modules"; fi' >> ~/.profile
    
    # install dependencies in the package.json --globaly
    sudo npm install


    echo '#########  mongodb  #################################################'

    apt-packages-repository 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' '7F0CEB10'
    apt-packages-update
    apt-packages-install mongodb-10gen python-pip
    pip install pymongo

    if [ ! -d '/data' ]; then
      sudo mkdir /data
      sudo mkdir /data/db
      sudo mkdir /data/db/journal
      sudo chown -R vagrant:vagrant /data
    fi
    


    echo '######### yeoman ####################################################'
    sudo npm install -g yo karma grunt-cli  bower generator-angular

    echo '############# PhantomJS #############################################'
    # PhantomJS - see: http://phantomjs.org/download.html & http://phantomjs.org/build.html
    # 32-bit - https://phantomjs.googlecode.com/files/phantomjs-1.9.1-linux-i686.tar.bz2
   
    if [ -d /usr/local/src/phantomjs-1.9.1-linux-i686 ]
    then
      echo 'We have the src for phantomjs. '
    else 
      cd /usr/local/src
      curl -L https://phantomjs.googlecode.com/files/phantomjs-1.9.1-linux-i686.tar.bz2 | sudo tar jx
      echo 'The phantomjs src us downloaded. '
    fi

    if [ -L /usr/local/bin/phantomjs ]
    then
      echo 'We have a symbolic link for phantomjs. '
    else 
      echo 'Create a symbolic link for phantomjs. '
      sudo ln -s /usr/local/src/phantomjs-1.9.1-linux-i686/bin/phantomjs /usr/local/bin/phantomjs
    fi
        
fi
