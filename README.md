# Character

The goal of this project is to create a web application to replace pen and paper character sheets while playing Dungeons & Dragons 5th Edition.

This app isn't meant to replace playing in-person; on the contrary, table top games are meant to be played surrounded by your closest friends (or your enemies...).

The latest compiled version of the app can be found [here](http://character.alorg.net).

## Dev Usage

Clone the repo, then:

```bash
yarn install
yarn start
```

This will install all dependencies, build all assets, serve the application on port `9966`.

**NOTE** you will need to set up your environment first in order for authentication and an actual database to work. See below [Environment variables / Secrets](#environment-variables--secrets).

Run tests with:

```bash
yarn test
```

### Environment variables / Secrets

All of the secret keys and paths needed to run the application are tied to [Firebase](http://firebase.google.com). In order for authentication and your database to work, you need to both configure a [Firebase](http://firebase.google.com) database and set both your local and deploy environment with the following variables:

```
FIREBASE_API_KEY=<your key>
FIREBASE_AUTH_DOMAIN=<your domain>
FIREBASE_DATABASE_URL=<your database url>
FIREBASE_STORAGE_BUCKET=<your storage bucket>
```

This is most easily accomplished using [dotenv](https://github.com/motdotla/dotenv), which this project is already set up to do.

Create a file named `.env` at the root of this project and put in the above variables (with their values) in that file. When the app is built, they will be available.

**IMPORTANT** do not commit the `.env` file (the git repo is already configured to ignore it, but still).

## Deployment

This application is deployed using [docker](http://docker.com) and `make`.

Deployment requires three things:

1. The target machine running [docker](http://docker.com)
2. The target machine authenticated via `docker login` (to [docker hub](http://hub.docker.com))
3. The target machine being accessible via `ssh`

If those three requirements are met, then to deploy:

```bash
make package push deploy
```

Once successful, the target machine will have a new [nginx](https://www.nginx.com/resources/wiki/) image running with the latest compiled application assets.

To view more detailed info on what these steps are actually doing, check out the [Makefile](https://github.com/theoperatore/character/blob/master/Makefile) at the root of the project.

**NOTE**

Currently, you'll have to edit the `Makefile` in order to deploy to any place you want. In the future, it'll most likely be an environment variable.

Change the first variable to point to your domain: `DEPLOY_HOST`.

## Libs

Front end:

- [React](https://facebook.github.io/react/docs/getting-started.html) as the web framework
- [ImmutableJS](http://facebook.github.io/immutable-js/docs/#/) for easy state / component updating performance
- [Swiper](http://www.idangero.us/swiper/#.VXA5ztNViko) for swiping!
- [Stylus](https://learnboost.github.io/stylus/) for css preprocessing

Server side:

- [Firebase](https://www.firebase.com/docs/web/guide/) because everything can be done using client-side code!

## License

Just send a nod my way if you use this in any way :)

MIT
