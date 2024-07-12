# Fiery Judoka

'Fiery Judoka', as the name suggests is a web application for anyone who seeks strength and better grappling skills.

## Distinctiveness and Complexity

### Models:

My project contains three apps, and each one of them uses models related to each other via Django's 'Foreign Keys'.

### Styling:

Although my project mainly relies on Bootstrap, I've written some CSS of my own to complete some of Bootstrap's lacking aspects such as missing colors.

### Javascript:

I wrote many Javascript functions throughout this project, each one to either manipulate the **DOM** or fetch routes to dynamically display content or  modify elements in my database.

### Django:

My project contains three applications:

* **User**: To register, login, and modify the user's belt and username.
* **Learn**: To search and learn Judo throws.
* **Forums**: You might think that this app is similar to the network project, but I modified its structure (e.g. added comments) to clearly distinguish it.

### Additionnal info:

I deployed my web application at [Fiery Judoka](https://rayanz.pythonanywhere.com), feel free to visit it anytime!

## App Folder structure

Each app folder has the standard Django structure, i added to each one of them **Templates** and **Static** folders which contain the necessary *HTML, CSS* and *Javascript* for my application.

### User App:

#### models.py:

Contains a user model with a belt field.

#### views.py:

Contains four views to **register, login, logout**, access the **homepage** and **edit** the profile as well.

#### urls.py:

Connects four routes to their views. (Note that this app's default route is the whole project's).

#### /templates:

Contains the app's templates:

* **layout.html :** Contains a navigation bar that displays different links according to whether the user is connected or not .

* **register.html :** Contains the necessary forms (including a dropdown for the belts) for a new user to register.

* **login.html :** Contains two input fields (username and password) for the user to login

* **index.html :** It's the project's homepage, users can edit their profiles.

#### /static:

Contains the app's styling and javascript

* **style.css :** Changes the text font according to the device's screen.
* **script.js :** Handles the profile editing (e.g. hide the existing labels and show the editing form etc...)

---

### Learn App:

#### models.py:

Contains two models:

* **Move :** To store the Judo throws' names, video demonstrztions, and levels.
* **Belt :** Store each judo belt to access their throws more easily.

#### views.py:

Contains four functions of which three are views:

* **index**: The default learning pages, shows the user's level throws.
* **moves_view :** Returns the throws of the specified belt (will be handled by script.js)
* **fuzzy_search :** Return the throws with similar names to the user's search (using the fuzzywuzzy library)
* **obj2dict :** Takes an Object as argument and returns a dictionnary

#### urls.py:

Connects three routes to their views.

#### /templates:

Contains the app's templates:

* **layout.html :** Contains a navigation bar that includes a search bar .
* **index.html :**  Display the throws (the user's level by default but also the ones searched)

#### /static:

Contains the app's styling and javascript

* **style.css :** Added colors to the borwn and orange belt buttons, make the webpage mobile responsive.
* **script.js :** Handles events such as *clicking buttons* and *searching* for throws.

:memo: I chose buttons to load belt specific throws instead of loading them all at once because it's faster and more efficient

---

### Forums App:

#### models.py:

Contains two models:

* **Post :** To store the posts.
* **Commment :** Store comments and associate them wit their post.

#### views.py:

Contains two views and a form class:

* **NewContent :** (*class*) Contains a text area for the users to write their posts.
* **index :** Returns the *post form* and all the posts using *pagination* and handles new posts
* **room :** Returns the post and comments, also handles new comments.

#### urls.py:

Connects two routes to their views.

#### /templates:

Contains the app's templates:

* **layout.html :** Contains the default navigation bar ( the same as the one on user app).
* **index.html :**  Displays the posts and the post form.
* **post.html** : Contains a specific post's comments and comment form. (will be displayed later on using javascript)

#### /static:

Contains the app's styling and javascript

* **style.css :** Changed the colors of the timestamps to grey and modified the text areas to make the page mobile repsonsive.
* **script.js :** Handles *clicking posts* and *commenting*.
