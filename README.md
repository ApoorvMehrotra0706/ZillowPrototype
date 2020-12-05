# HomeFinder - Web application (Zillow.com Prototype)

## Group Members:
* Apoorv Mehrotra
* Pranav Karmalkar
* Pranjay Sagar 
* Swapnil Parihar

## Problem Statement
Develop a web application that lets users buy, sell or rent homes(Something like Zillow.com). The project aims at building a web app portal to faciliate the selling/renting of a house. It provides a platform for the below personas to connect
* Landlord <-> Renter
* Buyer <-> Seller
* Realtor

## Design Decisions
#### Part 1: Selection of Tech-Stack
1.	MongoDB has been used as the database, considering the read centricity of the data. It supports storing the objects as nested documents. It is highly scalable.
2.	NodeJS has been used at the backend. It has fast processing and seamless JSON support which helped in building up the smooth classes and interaction between them. The object destructing property 
3.	To make the application fault tolerant, LoadBalancer is used and the entire project has been deployed on AWS facilitating making it a SaaS serivce.
4.	To allow us to create lightweight and dynamic web pages, ReactJS was used in the Frontend. It allowed us to build interactive components like modals, which improved user experience.
5.	Redux ensured consistent behavior throughout the application as a state container and manager. Redux resulted in easy testing and smooth state transitions.

#### Part 2: Front-end Design Decisions
1.	Bootstrap React framework improved the reusability of the code.
2.	Used Modals(Pop-ups) for insertion and updating the forms as they improve user experience and reusability and reduce code lines.
3.	Reused components like listing to reduce the size of the application


#### Part 3: Backend Design Decisions
1. NodeJS allowed the seamless JSON support that helped in esy accessibility of objects and its attributes. The object destructuring allowed the resuability of the code.
2. Factory design pattern has been implemented that red-directed the flow towards the respetive persona classes.
3. Due care has been taken to keep the code modular and resuable as much as possible.

## Technology Stack (MERN stack)
* React.js and redux for Frontend
* Node.js for Backend
* MongoDB to store and retrieve the persistent data
* AWS for the deployment

## Sample UI WireFrames 
#### Sign-Up WireFrame 
<img src = "Individual_wireframes/SignUp_WireFrame.jpg" width="1001">

#### Login WireFrame 
<img src = "Individual_wireframes/Login_WireFrame.jpg" width="1001">

## Architecture Diagram 
<img src = "Architecture_diagram.jpg" width="1000">

## Database Schema
<img src = "Database Schema.jpg" width="1000">

## Links for the Software Engineering Boards:
Journal: https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_3/blob/master/Journal.md

Sprint Sheet: https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_3/blob/master/SCRUM_Sheet/Team3_SCRUM_Sheet.xlsx

Project Task Board: https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_3/projects/3


## Directory Structure for the Repository

Backend: 

Contains code developed in NodeJS developed with Visual Studio Code IDE. It establishes connection with MongoDB for CRUD operations. The index.js contains the routes for the different personas that incude the separate path for common, admin, realtor, landlord, seller, buyer, renter. The package.json file contains the dependencies needed for the backend.  Frontend can be started by implementing the commands:

npm -i\
nodemon

Frontend: 

Contains code developed in ReactJS developed with Visual Studio Code IDE. The index.js contains the routes for the different components.  The package.json file contains the dependencies needed for the frontend.  Frontend can be started by implementing the commands:

npm -i\
npm start

Individual_wireframes:\
Contains all wireframes for the project.

SCRUM_Sheet:\
Contains the final SCRUM sheet for the project and the guidelines we developed on how to work using Git Version control collaboratively

Key Files:\
API_Documentation.docx: List the various APIs designed for the project and explains their functionality.\
Journal.md: Contains the Weekly Scrum Report and XP Core Values practice during the project.\
SCRUM_Sheet/Team3_SCRUM_Sheet.xlsx: Contains the time allocation distribution for sprints and the complete Burndown Chart for the project.\
Team3.pptx: The PPT for demo
