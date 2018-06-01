# Furriends for Life

---

## Objective

Make an adoption app that all shelters around Austin can use.

## Motivation
As a pet lover, I wanted to make an app that will help people that are looking for a new friend find one easily.

## Wireframe
Front page
![alt text](https://i.imgur.com/vTftH1e.jpg)

User page
![alt text](https://i.imgur.com/SSqYtKl.jpg)

Shelter page
![alt text](https://i.imgur.com/iaYnq76.jpg)

Entity Relationship Diagram
![alt text](https://i.imgur.com/coQrhDo.jpg)

|URL         |HTTP Verb       |Action       |Description         |
|----------- |-----------     |-----------  |-----------         |
|/Pets       |GET             |Show         |Show all pets       |
|/Pets/:id   |GET             |Show         |Show one pet        |
|/shelter/:id|PUT             |Update       |Update status on pet|
|/shelter/:id|DELET           |Delete       |Delete a pet        |
|/users      |GET             |Show         |Show liked pets     |
|/users/:id  |Delete          |Delete       |Delete pet from list|
## Technologies used

* Node.js
* Express
* JavaScript
* EJS and HTML
* CSS
* JavaScript
* MongoDB and Mongoose
---


## User Persona 1
---

### Franny Drescher

Age: 60

A retired secretary

### Goals
* Enjoy everything life has to offer.
* Explore

### Motivation
* She wants a travel buddy
* Can't decide which shelter to go to.

### Likes
* Warm hugs
* The grandkids
* Church

### Dislikes
* overly complicated websites
* Mold
---

## User Persona 2
---

### Jack

Age: 24

Marketing Manager


### Goals
* Climb the corporate ladder
* Find a companion

### Motivation
* Doesn't have much time to go out and look at shelters
* A stress reliever

### Likes
* Running around Town Lake
* Working

### Dislikes
* Meat
* Cats


## User Persona 3

### Tonka

Age: 45

Defensive linemen for the Dallas Cowboys


### Goals
* Keep healthy throughout the season
* to win the Superbowl

### Motivation
* To find a good family dog
* Can browse around Town while not in Town

### Likes
* Tackling the opponents QB
* Long walks on the beach
* Big Dogs

### Dislikes
* the Philadelphia Eagles
* turf Toe

---

## User Stories

As a user, I would like to browse the pets that are available for adoption, search and select the final candidate

As a shelter, I would like to post all available pets, approve applications and remove ones that have found a home


## Stretch Goals User Stories
---
As a user, I would like to see videos of my future pets
As a user, I would like to be able to chat with the shelters to ask questions
As a shelter, I would like to respond to user questions and post videos
