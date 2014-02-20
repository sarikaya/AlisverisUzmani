# Alışveriş Uzmanı

This location based app lists the nearest stores which have searched product with respect to user's location.

First user scan a barcode of the product. Then app lists the nearest stores which have scanned product with respect to user's location.

App has also has shopping list and discounted products features.

## Frontend

Frontend side of the app uses [phoneGap](http://phonegap.com/) framework for cross platform app development with javascript. Our choice of mobile javascript framework at this app is [Intel's App Framework](http://app-framework-software.intel.com/).

We used [angular js](http://angularjs.org/) as a MVW application framework. We used MVC pattern in particular.

Geolocation and barcode scanner used as service of [PhoneGap](http://phonegap.com/).

Shopping list uses permanant storage for items.

For visual design of the app we used [bootstrap](http://getbootstrap.com/) buttons and [font-awesome](http://fortawesome.github.io/Font-Awesome/) icons.
We customized app framework's one of the UI design themes

We used [PhantomJS](http://phantomjs.org/) unit testing framework for running test in headless WebKit.

## Backend

Backend written entirely in javascript by using express web application framework for [node.js](http://nodejs.org/) server.

All the datas are stored in [mongo db](http://www.mongodb.org/). 
There is a 2 collection in database named asistantDb:

branches collection:
```javascript
{
    location: { "type": "Point", "coordinates": [long, lat] },
    chainName: string,
    branchName: string,
    priceList_id: uuid
}
```

products collection:
```javascript
{
    barcode: string,
    name: string,
    imageSrc: string,
    prices: [{"priceList_id": uuid, "price": float}]
}
```

In branches collection, each branch has a geographic index named location. Each branch has also name of the chain and branch. Each branch has also associated with price list that used in this branch.

In products collection, each product has a unique barcode. Each product has also name and address of the image. The most important part of the data is prices list. Each list item consist of `priceList_id` and price. Price list id shows which price of the product is belong to which price list.

For finding list of nearest branch-price pairs for given product barcode and location of user.
Following queries running against database.
* Find list of branches within 1 km.
* Find the price list ids of each branch given.
* Find price of each price list id given barcode of the product

worker fetches datas from the servers of the stores.
For now, it inserts the example data to the database.

## Development tools

We use headless virtual machine for effortlessly shared development enviroment between developers. Actually, we use [vagrant](http://www.vagrantup.com/) for configuring lightweight, reproducible, and portable development environments. Our [vagrant](http://www.vagrantup.com/) box is ubuntu precise 32 bit. Port 8000 of virtual machine forwarded to the 8080 port of the host.

Our development enviroment consists of [yeoman](http://yeoman.io/). [Bower](http://bower.io/) as a [yeoman](http://yeoman.io/) dependency is used for dependency management. [Grunt](gruntjs.com) as another [yeoman](http://yeoman.io/) dependency is used to build, preview and test for our project. In virtual machine, there are [yeoman](http://yeoman.io/) and its dependencies, [nodejs](http://nodejs.org/), [mongodb](http://www.mongodb.org/), [pymongo driver](http://api.mongodb.org/python/current/) for ready to use.

The project folder has already synced between virtual machine and host machine.
The file synced is in the `/vagrant` direcotry in the virtual machine.
Because of that you can choose whatever IDE, text editor and browser you want in host machine.

# Installation

Please be sure that there is no `dist` folder in the project root directory
For installing developer enviroment and server, please follow the instructions below:

1. Install [virtual box](https://www.virtualbox.org/)
1. Install [vagrant](http://www.vagrantup.com/)
1. run `vagrant up` in the root folder of the project
1. wait for download and installation of vagrant box and enviroment.
1. run `vagrant halt` for closing the machine

## Build system

Before the running build system, change the configrations.
Dont change 8000 port settings inside the machine for less trouble.
Configrations and their locations:

* [Mongo db](http://www.mongodb.org/) connection url `mongodb://localhost:27017/` in worker.py and server.js.
* Radius of the location query in server.js
* [phonegap build](https://build.phonegap.com/) configration for APPID, EMAIL and PASSWORD needed for build. Please sign up [phonegap build](https://build.phonegap.com/) for easy compilation for different platform without installing any sdk.

There is last configration in the application which can be used in development. 
In development you can change the development settings in the `server.js` and `app/scripts/develop.js` to the `true`.
In development mode application can run in browser with barcode scanner and geolocation stubs.

In default, build does the followings. Clean the unneccessary files, run the [jshint](http://www.jshint.com/), run the [karma](http://karma-runner.github.io/) end to end tests, minimize files (images, css, html, javascript), concatanate them, compress them in the dist folder. At the end compressed file sent to the [phonegap build](https://build.phonegap.com/) for compiling variaity of platforms.

To run build, run `grunt`. Build without warnings, run `grunt --force`.

## Running

If you are already built the application, run the following commands for running application.

* Run `vagrant up` for running virtual machine
* ssh to the virtual machine by running `vagrant ssh`
* go to the project folder in virtual machine by running `cd /vagrant`
* run the server by running `nodejs server.js`

If you are in the development mode open the `localhost:8080` in the browser of the host machine.

If you are not in the development mode, install the [nodejs](http://nodejs.org/) and [mongodb](http://www.mongodb.org/) to the server online. Then change the address of the server in the `app/scripts/app.js`.

There is a binaries in the `binaries` folder.

## Documentation

In the `docs` folder, there is some detailed documentation about project.

You can also follow links in this file for furthermore information.

## License

Copyright (C) 2013 Abdurrahman NAMLI. It is distributed under the GNU General Public License version 2 - see the accompanying LICENSE file for more details.
