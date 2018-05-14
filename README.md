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
JDK 8 (Make sure the JAVA_HOME environment variable is set)

MongoDB

Maven

Node/Npm


## Usage
Make sure you have a MongoDB instance running locally on port 27017. 

Execute the following from the root directory after checking out the code:

```
mvn spring-boot:run &
cd ui
npm install
npm start
```

If your browser doesn't automatically open, then go here:

```
http://localhost:3000/
```