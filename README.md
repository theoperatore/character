Character
---------

The goal of this project is to create a web application to replace pen and paper character sheets while playing Dungeons & Dragons 5th Edition.

This app isn't meant to replace playing in-person; on the contrary, table top games are meant to be played surrounded by your closest friends (or your enemies...).

Dev Usage
---------

Clone the repo and `cd` into the directory and run:

```
npm install
```

to download all of the dependencies. Once you have all of the dependencies, you can run a few [Gulp](http://gulpjs.com/) commands:

```
$ gulp clean          # remove all build files
$ gulp compile-js     # compile all app dependencies (watch-js as well)
$ gulp compile-css    # compile all css stylus files (watch-css as well)
$ gulp watch          # watches both js/css files and opens a browser
$ gulp build          # build everything
$ gulp build-production # clean everything, build everything, uglify
```

App Times!
---------------

Build the app, and run the dev server in two consoles. 

In one console, you can either just build the app or watch for changes:

```bash
$ gulp build
# or
$ gulp watch
```

Then in another console, independent of the previous, run the script to run the server:

```bash
$ npm start
```

Once everything is built and the server is running, you have access to a couple of URLs:

```
localhost:9966                                # landing page talking about how cool this thing is (just links right now)
localhost:9966/#/user/{:id}/character/{:name} # the character app
localhost:9966/#/profile/{:id}                # user page that should show user's created characters
localhost:9966/#/login                        # page to log in / log out a user
localhost:9966/#/style                        # style guide showing basic components
``` 

Each route above uses a different view component located in `src/ui/views` folder. Each one is bare and needs work.

Libs
-----

For UI, we use (and growing):

- [React](https://facebook.github.io/react/docs/getting-started.html) as the web framework
  - [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) for easy react component composition
- [ImmutableJS](http://facebook.github.io/immutable-js/docs/#/) for easy state / component updating performance
- [Swiper](http://www.idangero.us/swiper/#.VXA5ztNViko) for swiping!
- [Stylus](https://learnboost.github.io/stylus/) for css preprocessing

Server side:

- [Firebase](https://www.firebase.com/docs/web/guide/) because everything can be done using client-side code!

Tools
-----

The latest compiled version of the app can be found [here](http://ci.cmonocle.link/). It gets updated upon each commit

License
--------

MIT
