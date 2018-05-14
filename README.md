# Grocery Shop

## Overview
This app allows you to search a databse of projects. 

## Features

Allows browsing products by department.

Allows sorting products by price.

Makes the following assumptions:

If you search with all numbers, then it assumes you're trying to search by a product's id.

If you search by all text, then it assumes you want to search by description. If that fails, then it tries to search by department.


## Todo
Implement FilterBy option. As of now it's not functional.

Clean up the code.

Add tests

Make it prettier

Add sign-in option

## Requirements
JDK 8

MongoDB

Maven

Node/Npm


## Usage
To run the server, make sure you have a MongoDB instance running locally on port 27017 and please execute the following from the root directory:

```
mvn spring-boot:run &
cd /ui
npm install
npm start
```

If your browser doesn't automatically open then go here:

```
http://localhost:3000/
```