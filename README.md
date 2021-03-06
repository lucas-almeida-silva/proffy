<p align="center">
   <img src=".github/proffy-logo.png" alt="Proffy" width="100%"/>
</p>

# :page_with_curl: Table of Contents

* [About](#information_source-about)
* [Technologies](#computer-technologies)
* [Features](#rocket-features)
* [How to run](#seedling-how-to-run)
* [License](#pencil-license)

# :information_source: About

Proffy is an online teaching platform with the objective of connecting students and teachers who teach elementary and high school subjects, in a simple and efficient way. The application has Web and Mobile versions and was developed during the Next Level Week 2 provided by RocketSeat.

# :computer: Technologies

### 📦 API

  - Node.js
  - Typescript
  - SQLite
  - Knex
  - Express

### :computer: Web

  - React.js
  - Typescript
  - Axios

### :iphone: Mobile

  - React Native
  - Expo
  
# :rocket: Features

### Web

  - Registration of teachers, with indication of the subject and class value per hour
  - List of available teachers and their subjects
  - Search teachers filtering by subject, day of the week and time
  - Contact teachers by WhatsApp

### Mobile

  - Search teachers filtering by subject, day of the week and time and contact
  - Favorite teachers

# :seedling: How to run

```bash
# Clone Repository
$ git clone https://github.com/lucas-almeida-silva/proffy.git
```
### 📦 Run API

```bash
# Go to server folder
$ cd proffy/server

# Install Dependencies
$ npm install

# Run Aplication
$ npm start
```
Access API at http://localhost:3333/

### :computer: Run Web Project

```bash
# Go to web folder
$ cd proffy/web

# Install Dependencies
$ npm install

# Run Aplication
$ npm start
```
Access the application at http://localhost:3000/

### :iphone: Run Mobile Project

```bash
# Go to web folder
$ cd proffy/mobile

# Install Dependencies
$ yarn install

# Run Aplication
$ yarn start
```
Install the Expo app on mobile stores. Then, select the LAN option in the window that opened after running the application and scan the QR Code in the Expo app.

# :pencil: License

This project is under the [MIT license](LICENSE).