## Profile Page

This is a webpage where the user can create an account, and login and logout of that account. The user can also uplaod their own personal profile picture, which they can see when they log into their account. This project was built for fun using primarly NodeJS, the React library, and Redis as a database.

### Features
* Simple Login, Logout, Register, and Profile pages all built using React
* NodeJS as the backend server technology
* Redis as an easy database storage system
* Sessions to preserve login information
* Uses webpack for easier development

## Getting Started

* Start the Redis server
  ```sh
  $ redis-server
  ```
* Start the server
  ```sh
  $ babel-node server/app.js
  ```

* Navigate to http://127.0.0.1:3000/user.html?register to register an account!

### Notes

This personal project was built for fun and not for any real useage. All passwords are not encrypted, so don't use any important bank passwords. Using babel-node in production is very inefficient, and uses a lot of memory (but makes developing this easier). Additionally, Redis data resides in-memory and is not a good choice of a database for this kind of thing in hindsight.


