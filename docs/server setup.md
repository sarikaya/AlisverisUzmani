* setup node-js and npm. like from vagrant boot.sh

* configure new package.json with dependencies:

        {
          "name": "hello-world",
          "description": "hello world test app",
          "version": "0.0.1",
          "private": true,
          "dependencies": {
            "express": "3.x",
            "mongodb": "*"
          }
        }

* install dependencies with npm:

        sudo npm install -g # is using -g secure way?

