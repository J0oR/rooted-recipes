<a id="readme-top"></a>
<!-- PROJECT INtro -->
<h3 align="center">Rooted Recipes</h3>

<p align="center">
5th project of the Start2Impact University Master’s in Front-End Development.
</p>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>




<!-- ABOUT THE PROJECT -->
## About The Project

<img src="/src/imgs/app.gif" alt="layout" style="border-radius: 15px;">

######
The project is designed to certify the student's skills in React by developing a vegetarian recipes website.

Specifically:
- The **Product class** handles the creation of items and the assignment of clients to those products.
- The **Client class** manages client information and their ability to place orders.
- The **ProcessoProduzione class** represents a specific production process used by the brand, managing products in production and the addition of new items.

That said, I took the opportunity to implement a UI and a data persistence system using localStorage.

#### Features:  
- **Search Bar** recipes can be filtered by term and dish type. Results are ordered first by name match and the ingredient name.
- **Firebase Authentication**: users can log via google.
- **Firestore DB**: logged users can save recipes into favourites.


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>




### Built With

Here's a list of the key technologies and libraries I used to build this app:  


* [![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](#)
* [![Sass](https://img.shields.io/badge/Sass-C69?style=for-the-badge&logo=sass&logoColor=fff)](#)
* [![React](https://img.shields.io/badge/React-F7DF1E?style=for-the-badge&logo=react&logoColor=000)](#)
* [![Redux](https://img.shields.io/badge/-Redux-black?style=for-the-badge&logo=redux)](#)
* [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)](#)
* [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](#)


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>


<!-- Try it --->
## Live Version

Click the link below to try the Firebase-hosted version, or scroll down to the next section if you'd prefer to run the project locally.

[Typescript Store Demo link](https://ts-sunnee.web.app/)


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>

<!-- GETTING STARTED -->
## Getting Started

This is how you may set up the project locally.

#### Prerequisites

* npm
######
  ```sh
  npm install npm@latest -g
  ```

#### Installation

Follow the steps below to get your local copy of this app up and running. These instructions assume you have Node.js and npm already installed.


1. Clone the repo
   ```
   git clone git@github.com:J0oR/typescript-store-demo.git
   ```
2. Install NPM packages
   ```
   npm install
   ```
3. Compile typescript
    ```
    npm run compile
    ```
3. start Webpack in development mode or production mode
   ```
   npm run dev
   or
   npm run build
   ```
4. starts Webpack's development server
   ```
   npm run start
   ```


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>




<!-- CONTACT -->
## Contact


[![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin-white&logoColor=fff)](https://www.linkedin.com/in/giovanni-ruocco-b3a5492a2)

[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/J0oR)

[![CodePen](https://img.shields.io/badge/CodePen-lightgray?style=for-the-badge&logo=codepen&logoColor=black)](https://codepen.io/jrvn/)

<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Best Readme Template](https://github.com/othneildrew/Best-README-Template/blob/main/README.md)
* [Shields.io](https://shields.io/badges)
* [md-badges](https://github.com/inttter/md-badges)

<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>