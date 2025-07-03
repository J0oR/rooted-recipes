<a id="readme-top"></a>
<!-- PROJECT INTRO -->

<h1 align="center">🌿 Rooted Recipes</h1>

<p align="center">
5th milestone project of the Start2Impact University Master’s in Front-End Development.
</p>


<!-- TABLE OF CONTENTS -->
## 📑 Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Live Version](#live-version)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)


<!-- ABOUT THE PROJECT -->
<a id="about-the-project"></a>
## 📌 About The Project

######
This project demonstrates proficiency in React through the development of a vegetarian recipes web app.

<img src="/src/assets/rooted-recipes.gif" alt="layout" style="border-radius: 15px; border: 2px solid #337179">

#### ✨ Features  
- **Search Bar** - Search recipes by name or ingredient, and filter by dish type.
- **Pagination** - A "Load more" button fetches 10 additional recipes.
- **Firebase Authentication** - Google login via Firebase Authentication.
- **Firestore DB** - Logged-in users can save and filter favorite recipes by dish type.


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>


<a id="built-with"></a>
### 🛠️ Built With
##

##### 🔤 Languages & Preprocessors  
<p style="margin-bottom: 10px">
  <img src="https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" style="height:40px; border-radius: 15px"/> 
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"
  style="height:40px; border-radius: 15px"/> 
  <img src="https://img.shields.io/badge/Sass-C69?style=for-the-badge&logo=sass&logoColor=fff"
  style="height:40px; border-radius: 15px"/>
</p>

##### ⚛️ Frameworks & Libraries  
<p style="margin-bottom: 10px;">
  <img src="https://img.shields.io/badge/React-F7DF1E?style=for-the-badge&logo=react&logoColor=000"
  style="height:40px; border-radius: 15px"/> 
  <img src="https://img.shields.io/badge/Redux-black?style=for-the-badge&logo=redux"
  style="height:40px; border-radius: 15px"/> 
  <img src="https://img.shields.io/badge/styled--components-BF4F74?style=for-the-badge&logo=styled-components&logoColor=white"
  style="height:40px; border-radius: 15px"/>
</p>

##### ⚙️ Build Tools & Runtime  
<p style="margin-bottom: 10px;">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"
  style="height:40px; border-radius: 15px"/> 
  <img src="https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"
  style="height:40px; border-radius: 15px"/>
</p>


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>


<!-- Try it --->
<a id="live-version"></a>
## 🌐 Live Version

Try the Firebase-hosted version of the app:

🔗 [rooted-recipes.web.app](https://rooted-recipes.web.app)


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>

<!-- GETTING STARTED -->
<a id="getting-started"></a>
## 🚀 Getting Started

This is how you may set up the project locally.

<a id="prerequisites"></a>
#### Prerequisites

###### 🔥 Firebase Setup
Please follow the instructions to set up Firebase for your project:
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Set up Firebase Authentication (Google login) and Firestore
- Set up 3 collections: recipes ingredients and heartedRecipes

###### ⚙️ Environment Setup
Add spoonacular API and Firebase config to your `.env` file, in the root folder:

 ```bash
VITE_API_KEY=your-api-key
VITE_API_BASE_URL=https://api.spoonacular.com/recipes/complexSearch

REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

###### 📦 npm
  ```sh
  npm install npm@latest -g
  ```

##
<a id="installation"></a>
#### Installation

Follow the steps below to get your local copy of this app up and running. These instructions assume you have Node.js and npm already installed.


1. Clone the repo
   ```
   git clone git@github.com:J0oR/rooted-recipes.git
   ```
2. Install NPM packages
   ```
   npm install
   ```
3. start vite in development mode
   ```
   npm run dev
   ```

<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>


<!-- CONTACT -->
<a id="contact"></a>
## 📬 Contact


[![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin-white&logoColor=fff)](https://www.linkedin.com/in/giovanni-ruocco)

[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/J0oR)

[![CodePen](https://img.shields.io/badge/CodePen-lightgray?style=for-the-badge&logo=codepen&logoColor=black)](https://codepen.io/jrvn/)

<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>

<!-- ACKNOWLEDGMENTS -->
<a id="acknowledgments"></a>
## 🙏 Acknowledgments

* [Best Readme Template](https://github.com/othneildrew/Best-README-Template/blob/main/README.md)
* [Shields.io](https://shields.io/badges)
* [md-badges](https://github.com/inttter/md-badges)

<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>