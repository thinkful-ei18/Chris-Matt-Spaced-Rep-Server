# Space Repetition Project

## Title: Spanish Tutor
## Link to deployed version: https://admiring-liskov-604b28.netlify.com/
### Summary
Spanish Tutor is a quiz app designed to adapt to your learning needs. This means that questions you get right more often will be asked later. The questions you tend to get wrong will be asked again sooner.

### How Questions Are Stored
The questions are stored in the database as a singly linked list. Each question is initialized for a new user with an "m" value of 1. If a question is answered correctly, "m" is multiplied by 2 and is moved 2*m down the singly linked-list. If a question is answered incorrectly, "m" reset to 1 and is added after next question.

# Landing Page
![Landing Page](https://raw.githubusercontent.com/thinkful-ei18/Chris-Matt-Spaced-Rep-Server/master/img/instructions-full.png)

General instructions are available for user to login or register.  A brief paragraph on what space repetition is in the context of weighted questions. The navigation bar on the top right includes links for login and registration pages.

# Registration Page
![Registration Page](https://raw.githubusercontent.com/thinkful-ei18/Chris-Matt-Spaced-Rep-Server/master/img/Registration-mobile.png)

For a first time user, the registration page is available.  The image above shows the mobile first design characteristics of the app.  The required fields on the form for registration include Username, Password, and Confirm password.

# Login Page
![Login Page](https://raw.githubusercontent.com/thinkful-ei18/Chris-Matt-Spaced-Rep-Server/master/img/Login-mobile.png)

For returning users, a login page is available requiring username and password.

# Question Flow
![Question Page](https://raw.githubusercontent.com/thinkful-ei18/Chris-Matt-Spaced-Rep-Server/master/img/question-mobile.png)

![Correct Page](https://raw.githubusercontent.com/thinkful-ei18/Chris-Matt-Spaced-Rep-Server/master/img/correct-mobile.png)

![Incorrect Page](https://raw.githubusercontent.com/thinkful-ei18/Chris-Matt-Spaced-Rep-Server/master/img/incorrect-mobile.png)

Upon successful login, user is brought to the first question.  If correct, feedback is given congratulating the user.  If incorrect, feedback is given giving the user the correct answer.

# User Information
![User Information Page](https://raw.githubusercontent.com/thinkful-ei18/Chris-Matt-Spaced-Rep-Server/master/img/userinfo-mobile.png)

While the user is working on the question flow, "User Info" can be accessed through the navigation bar.  The user is able to review username, name, email, and the amount of correct answers.

# For Developers
Run "npm install" in both hiking-client and nestle-server directories.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Technology Stack
* Front-End
  * React
  * Redux
  * Flexbox
* Back-End
  * Node
  * Express
  * Mongoose
* Data Storage
  * MongoDB
  * mLab
* Deployment
  * Heroku
  * Netlify

# Thinkful Backend Template

A template for developing and deploying Node.js apps.

## Getting started

### Setting up a project

* Move into your projects directory: `cd ~/YOUR_PROJECTS_DIRECTORY`
* Clone this repository: `git clone https://github.com/Thinkful-Ed/backend-template YOUR_PROJECT_NAME`
* Move into the project directory: `cd YOUR_PROJECT_NAME`
* Install the dependencies: `npm install`
* Create a new repo on GitHub: https://github.com/new
    * Make sure the "Initialize this repository with a README" option is left unchecked
* Update the remote to point to your GitHub repository: `git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME`

### Working on the project

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Run the development task: `npm start`
    * Starts a server running at http://localhost:8080
    * Automatically restarts when any of your files change

## Databases

By default, the template is configured to connect to a MongoDB database using Mongoose.  It can be changed to connect to a PostgreSQL database using Knex by replacing any imports of `db-mongoose.js` with imports of `db-knex.js`, and uncommenting the Postgres `DATABASE_URL` lines in `config.js`.

## Deployment

Requires the [Heroku CLI client](https://devcenter.heroku.com/articles/heroku-command-line).

### Setting up the project on Heroku

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Create the Heroku app: `heroku create PROJECT_NAME`

* If your backend connects to a database, you need to configure the database URL:
    * For a MongoDB database: `heroku config:set DATABASE_URL=mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME`
    * For a PostgreSQL database: `heroku config:set DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME`

* If you are creating a full-stack app, you need to configure the client origin: `heroku config:set CLIENT_ORIGIN=https://www.YOUR_DEPLOYED_CLIENT.com`

### Deploying to Heroku

* Push your code to Heroku: `git push heroku master`
