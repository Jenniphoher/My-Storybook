# My Storybook


My Storybook is a web application that transforms the way users create and share digital stories. By combining the charm of traditional storybooks with modern digital tools, users can craft beautiful narratives page by page through uploading their own images and adding text. Whether you're a hobbyist writer, educator, or creative storyteller, My Storybook provides all the tools needed to bring your stories to life.


# Built With


<p align="left">
  <!-- JavaScript -->
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  </a>
  <!-- HTML -->
  <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="html5" width="40" height="40"/>
  </a>
  <!-- CSS -->
  <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="css3" width="40" height="40"/>
  </a>
  <!-- Node.js -->
  <a href="https://nodejs.org" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="nodejs" width="40" height="40"/>
  </a>
  <!-- Express -->
  <a href="https://expressjs.com" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="express" width="40" height="40"/>
  </a>
  <!-- React -->
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react" width="40" height="40"/>
  </a>
  <!-- Redux -->
  <a href="https://redux.js.org" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/>
  </a>
  <!-- PostgreSQL -->
  <a href="https://www.postgresql.org" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="postgresql" width="40" height="40"/>
  </a>
  <!-- Material-UI (MUI) -->
  <a href="https://mui.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" alt="materialui" width="40" height="40"/>
  </a>
</p>

![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4.svg?style=for-the-badge&logo=cloudinary&logoColor=white)
![Konva](https://img.shields.io/badge/Konva-0D83CD.svg?style=for-the-badge)

- JavaScript, HTML, CSS, NodeJS, Express, React, Redux, Redux-Saga, PostgreSQL, Rest APIs, Cloudinary, Konva, MUI


# Web Application


Login Page
![LoginPage](documentation/images/documentation/images/loginPage.png)

Home Page
![HomePage](documentation/images/documentation/images/homePage.png)
![HomePage2](documentation/images/documentation/images/homePage2.png)
![HomePage3](documentation/images/documentation/images/homePage3.png)

Creating Storybooks
![Create](documentation/images/documentation/images/create.png)
![Create2](documentation/images/documentation/images/create2.png)
![Create3](documentation/images/documentation/images/create3.png)

Uploading Photos
![Upload](documentation/images/documentation/images/uploadPage.png)
![Upload2](documentation/images/documentation/images/uploadPage2.png)

Profile Page
![Profile](documentation/images/documentation/images/profilePage.png)

Fullscreen view of your storybook
![Fullscreen](documentation/images/documentation/images/fullScreen.png)
![Fullscreen2](documentation/images/documentation/images/fullScreen2.png)






<!-- # Getting Started


This should be able to run in your preferred IDE. I used VS code for this project.


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)

![Dependecies](documentation/images/documentation/images/dependeciesScreenshot.png)

## Create Database and Table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR (250),
	"last_name" VARCHAR (250),
	"email" VARCHAR (250),
	"username" VARCHAR (250),
	"password" VARCHAR (250),
	"profile_photo" VARCHAR (250),
	"cover_photo" VARCHAR (250)
);

CREATE TABLE "logo" (
	"id" SERIAL PRIMARY KEY,
	"logo_img" VARCHAR (250)
);


CREATE TABLE "storybook" (
	"id" SERIAL PRIMARY KEY,
	"is_public" BOOLEAN DEFAULT FALSE,
	"user_id" INT REFERENCES "user" NOT NULL
);


CREATE TABLE "user_gallery" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (250),
	"img_url" VARCHAR (250),
	"user_id" INT REFERENCES "user" NOT NULL
);


CREATE TABLE "sb_pages" (
	"id" SERIAL PRIMARY KEY,
	"text" TEXT,
	"img_x" DECIMAL(45,38),
	"img_y" DECIMAL(45,38),
	"img_width" DECIMAL(45,38),
	"img_height" DECIMAL(45,38),
	"user_gallery_id" INT REFERENCES "user_gallery",
	"storybook_id" INT REFERENCES "storybook" NOT NULL
);
```

If you would like to name your database something else, you will need to change `storybook_proto` to the name of your new database name in `server/modules/pool.js`.

## Development Setup Instructions

- Run `npm install`.
    - Be sure to take stock of `package.json` to see which dependencies you'll need to add.
- Create a `.env` file at the root of the project and paste this line into the file:

```plaintext
SERVER_SESSION_SECRET=superDuperSecret
```

While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm run server` to start the server.
- Run `npm run client` to start the client.
- Navigate to `localhost:5173`.

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Run `npm run server` to start the server.
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password.
   2. `POST /api/user/login` will login a user, see body to change username/password.
   3. `GET /api/user` will get user information, by default it's not very much.

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm start`.
- Navigate to `localhost:5173`.

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application.
- `public/` contains static assets for the client-side.
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site.
- `server/` contains the Express App.

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project.
1. Link the Heroku project to the project GitHub Repo.
1. Create an Heroku Postgres database.
1. Connect to the Heroku Postgres database from Postico.
1. Create the necessary tables.
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security.
1. In the deploy section, select manual deploy.

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2. -->
