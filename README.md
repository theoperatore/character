Character
---------

The goal of this project is to create a web application to replace pen and paper character sheets while playing Dungeons & Dragons 5th Edition.

This app isn't meant to replace playing in-person; on the contrary, table top games are meant to be played surrounded by your closest friends (your enemies...).

Dev Usage
---------

Clone the repo and cd into the directory. Then, you'll need to 

```
npm install
```

to download all of the dependencies. Once you have all of the dependencies, you can run a few [Gulp]() commands:

```
$ gulp                # cleans, builds vendor and the app, watches for changes, opens browser
$ gulp lint           # lint your javascipt!
$ gulp mocha          # run unit tests in the tests folder
$ gulp clean          # remove all build files
$ gulp watch          # build the app and watch for changes
$ gulp build-vendor   # build just vendor files
```

The most useful is probably going to be `gulp` by itself which will set everything up for you to develop.

License
--------

MIT
