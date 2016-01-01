# Application UI Structure

The project has gotten pretty large now. I guess it's time that there is some documentation on how this monster is assembled. Check it:

## ui/index.js

The main entry point to the application as a whole. Sets up the ui router and handlers for different `views`

## ui/views

Holds all entry points that a user can be routed to. Includes:

- `App.js` (character app entry point)
- `Login.js` (login page entry point)
- `User.js` (user profile page entry point)

## ui/panes

The character app, located in `App.js` is separated into different panes (the different screens a user can flip through by either swiping to the left or right or tapping on any tab near the top of the screen).

This folder holds each pane entry point

## ui/components

All ui components that are used across the application are stored here. Pretty straightforward.

## ui/dialogs

Every modal component's content is stored here, organized by pane and topic. For example, the info pane's proficiencies' create dialog content is stored as: `ui/dialogs/info/proficiencies/create.js`, etc.