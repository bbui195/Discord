# Spicord

[Live Link](https://spicord.herokuapp.com/)

Spicord is a Discord clone that allows users to register, create servers, and chat with other users. It is made with a Ruby on Rails backend and a React/Redux frontend and includes full CRUD features for accounts, servers, channels, and messages. Users can either message in servers or send a direct message to another user.

With PostgresSQL as a database and Rails as a backend, Spicord is able to store user credentials, servers, channels, and messages. Action Cable is used with messages in order to establish a websocket connection to have messaging with other users in real time. ReactJS and ReduxJS were implemented in the frontend for seamless navigation in this single-page application.


## Features

1. Login / Register pages

Account creation and login pages with ability to log in as the demo user.

![login](/features/login.png "login")

2. Servers

Modal to create a new server

![server](/features/server_create.png "server")

3. Channels

Ability to create different channels in servers to chat in

![channel](/features/channel_create.png "channel")

4. Messages

Users are able to send messages to either channels or directly to other users.

Messages
![message](/features/message.png "message")
Editing messages
![edit](/features/edit_message.png "edit")
Delete Confirmation
![delete](/features/delete_message.png "delete")

## Technologies

* React.js
* Redux.js
* Javascript
* CSS / SCSS
* HTML
* Ruby on Rails
* Action Cable
* PostgresSQL