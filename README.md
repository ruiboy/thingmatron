# thingmatron

FFL app built with angular2, spring boot REST api, mongo


## mongo
`mongod --config /usr/local/etc/mongod.conf`

`mongo`
```
show collections
player    <-- 2017
player18  <-- 2018
```

## app
# Needs gradle 2.14.1

`gradle clean build`

`gradle bootRun`

## Collating data
(see also statsfromexaflweb/README.txt)
* statsfromexaflweb/do.sh to get all year stats in many xml files;
* statsfromexaflweb/collate/CollateData.java to put all data in one xml file;
* MongoifyCollatedStats.xsl to turn it into mongo bulk update;
* create new collection in mongo;
* mongo < out.mongobulkupdate18



# spring-boot-angular2 starter kit
Spring Boot with Gradle, Angular2, TypeScript, Sass, and a Gulp build.

## about
a starter project for prototyping restful applications with spring boot and angular2.

anuglar2 with es6 support.

## pre-install
1. install OpenJDK8
    - set `JAVA_HOME` environment variable
1. (optional) install gradle 2.9
    - otherwise just use `$ ./gradlew`
1. (optional) install python 2.7.x
    - set `PYTHON` environment variable
    - `$ gradle npminstall` may complain otherwise

## install
`$ git clone git@github.com:borysn/spring-boot-angular2`

## build & run
* `$ gradle clean build`
* `$ gradle npminstall`
* `$ gradle gulp_build`
* `$ gradle bootRun`
* using browser, navigate to`localhost:8080`

## front-end dev
* `$ gradle gulp_watch`
    - watch html, ts, sass files in `src/main/web` for changes
    - changes will be copied into `src/main/resources/static`
    - if you add new files to your work directory (`src/main/web/...`), while `gulp_watch` is running, you will have to restart `gulp_watch`
* unit tests with jasmine
    - the unit test directory is `src/main/web/jasmine/test`
    - to view test results, navaigate to `http://localhost:8080/jasmine/unit-tests.html`
* do not edit in the static dir
    - everything in the `src/main/resources/static` directory is generated by the gulp build process
    - changes made in the static dir will be wiped with a gulp build
    - make your front-end build changes in the proper work directory `src/main/web`

## configuration
* [build.gradle](build.gradle) gradle build configuration
* [gulpfile.js](src/main/web/gulpfile.js) gulp configuration

## notes

angular2 is still in beta. packages will be upgraded to the latest version (possibly beyond what angular.io is recommending for their starter project).

angular2 can be implemented as a front-end application for many back end systems. this starter kit focuses on a basic application packed along side a basic java/spring boot backend.

## contribute

if you have any input, or contributions, please share!

## license
[MIT](/LICENSE)
