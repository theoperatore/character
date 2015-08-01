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
$ gulp                # cleans, builds vendor/app/stylus, watches for changes, opens browser
$ gulp lint           # lint your javascipt!
$ gulp mocha          # run unit tests in the tests folder
$ gulp clean          # remove all build files
$ gulp build-vendor   # build and uglify vendor files (takes a while...)
$ gulp compile-js     # compile all app dependencies (watch-js as well)
$ gulp compile-css    # compile all css stylus files (watch-css as well)
$ gulp watch          # watches both js/css files and opens a browser
```

Viewing the App
---------------

Once you have cloned a local copy of the code, you can run

```
$ gulp
```

Let it do it's thing, and eventually, it should open up a web browser with the address `localhost:8080`. URLs available are:

```
localhost:8080                                # landing page talking about how cool this thing is (just links right now)
localhost:8080/#/user/{:id}/character/{:name} # the character app
localhost:8080/#/profile/{:id}                # user page that should show user's created characters
localhost:8080/#/login                        # page to log in / log out a user
localhost:8080/#/style                        # style guide showing basic components
```

Each route above uses a different view component located in `src/ui/views` folder. Each one is bare and needs work.

Dev Notes
---------

Since we're using React and JSX, we're allowed to use some ES6 features (using Reactify). So far, I've been able to successfully use:

- Destructuring
- Arrow Functions
- Enhanced Object Literals
- Template strings

I've run into some problems with block scoping and others, but otherwise feel free to use it all.

Libs
-----

For UI, we use (and growing):

- [React](https://facebook.github.io/react/docs/getting-started.html) as the web framework
  - [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) for easy react component composition
- [ImmutableJS](http://facebook.github.io/immutable-js/docs/#/) for easy state / component updating performance
- [Swiper](http://www.idangero.us/swiper/#.VXA5ztNViko) for swiping!
- [Stylus](https://learnboost.github.io/stylus/) for css preprocessing

Server side:

- [Firebase](https://www.firebase.com/docs/web/guide/) since we don't have a normal server

Tools
-----

There is a custom webhook installed for a very basic ci, found [here](http://ci.cmonocle.link/status/).

License
--------

MIT
