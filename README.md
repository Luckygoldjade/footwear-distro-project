# Academic project completed in Fall 2023

## Project Title: Footwear Distro
Team members: Tony C, Jacky K

Footwear Distro is a chain of shoe stores with its own distribution centers. Our company has 3 distribution centers,
one located on the west coast, one located in the south, and another on the east coast, and 13 stores across the country.
Each store specializes in a specific type of footwear, luxury, casual, athletic, and discount. The store can expect
to receive products from the distribution centers only, not other stores.

This repository contains my independent copy of a collaborative academic project completed as part of the
Computer Science program.

## Key Features
Product Management:
Track product details (type, SKU, description, category: luxury, casual, athletic, discount).
Manage inventory levels at each distribution center.

Distribution Center Management:
Store information about each distribution center (location, capacity, current inventory).

Store Management:
Store details (location, specialization, population size, inventory received).

Inventory Transfer Tracking:
Record transfers from distribution centers to stores.
Track quantity, source, destination, and date of each transfer.

Demand Allocation:
Allocate inventory to stores based on population/location (e.g., large cities get more units).

Reporting & Analytics:
Generate reports on inventory levels, transfers, and store allocations.
Monitor stock levels to prevent shortages or overstock.

Audit & History:
Track changes to inventory and transfers for accountability.

These features will help you manage and optimize the distribution of footwear across your network.

## Collaborators
This project was originally developed in collaboration with teammate Jacky K, and myself. This repo is
personalized, independently maintained version created for portfolio and resume.

## Tech Stack - Full-stack JavaScript application
- Server-side rendering (SSR) with Express.js and Handlebars
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- Database: MySQL interface and MariaDB

## Setup Instructions
Download the Project
Open a terminal (Command Prompt or PowerShell on Windows).
Copy and paste this command to download the project:
git clone https://github.com/Luckygoldjade/footwear-distro-project

Go into the project folder:
cd footwear-distro-project

(Optional) Make sure you have the latest files:
git pull origin main

Install Requirements
Make sure you have Node.js installed.
In the terminal, install the project dependencies:
npm install

Start the App
In the same terminal, start the server:
node app.js

View the Website
Open your web browser and go to:
http://flip3.engr.oregonstate.edu:7524

Note: If you see any errors, make sure you are in the footwear-distro-project folder and that Node.js is installed.

## Screenshots

**[Figure 1. Home Page](docs/screenshots/1_home_page.jpg)**  
This is the home page of the application.

**[Figure 2. Distribution Centers Page](docs/screenshots/2_distribution_centers_page.jpg)**  
Users can **ADD**, **UPDATE**, and **DELETE** entries for Distribution Centers. Records are displayed in a table pulled from the database.

**[Figure 3. Inventories Page](docs/screenshots/3_inventories_page.jpg)**  
Manages Inventories — the intersection of Distribution Centers and Products. Deleting a related entry cascades deletion. Full CRUD supported.

**[Figure 4. Products Page](docs/screenshots/4_products_page.jpg)**  
Supports **SEARCH**, **ADD**, **UPDATE**, and **DELETE**. Nullable relationships with Models and Colors. Includes search filtering by dropdown.

**[Figure 5. Models Page](docs/screenshots/5_models_page.jpg)**  
Displays model data with full CRUD support. Data is shown in a database-driven table.

**[Figure 6. Colors Page](docs/screenshots/6_colors_page.jpg)**  
Users can add, update, and delete color entries. Data is listed from the database.

**[Figure 7. Transferred Products Page](docs/screenshots/7_transferred_products_page.jpg)**  
Intersection table between Transfer Reports and Products. Users can manage transfers with full CRUD capabilities.

**[Figure 8. Transfer Reports Page](docs/screenshots/8_transfer_reports_page.jpg)**  
Manages the linkage between Distribution Centers and Stores for each product transfer. Deletion of linked entities cascades.

**[Figure 9. Stores Page](docs/screenshots/9_stores_page.jpg)**  
CRUD-enabled page for store contact and location records.

## PDF Report
[Final Report (PDF)](docs/ProjectGroup88_Step6_FINAL.pdf)

## What You Learned
- Designed and implemented a normalized relational database schema using MySQL/MariaDB.
- Developed full-stack web applications with Node.js, Express.js, and Handlebars for server-side rendering.
- Built RESTful routes for CRUD operations and integrated them with dynamic front-end forms.
- Managed database connections and performed complex SQL queries for reporting and analytics.
- Automated inventory allocation and transfer tracking based on business logic.
- Debugged and tested application features to ensure reliability.
- Learned how to effectively partition a project among team members and coordinating to achieve shared goals.

## Citation
In the scripts.js file, the following functions were adapted from the nodejs-starter-app.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

- function deleteDistributionCenters()
- function updateDistributionCenters()
- function deleteModels()
- function updateModels()
- function deleteColors()
- function updateColors()
- function deleteStores()
- function updateStores()
- function deleteProducts()
- function updateProducts()
- function addProducts()
- function deleteInventories()
- function updateInventories()
- function deleteTransferredProducts()
- function updateTransferredProducts()
- function deleteTransferReports()
- function updateTransferReports()

The function checkBarcode(Barcode, ProductID) on the scripts.js file was created by us.

In the *.hbs files, the handlebars expressions were adapted from the nodejs-starter-app.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

In the *.hbs files, the scripts at the bottom of the file used to fill out the update
form was created by us. In the TransferReports.hbs, the date object was created by us
using the documentation from MDN.
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

In the TransferReports.hbs file, the handlebars block helper and conditional code
in the section named <!-- browse --> was created by us using the documentation from handlebars.
Source URL: https://handlebarsjs.com/guide/

In the app.js file, all of the routes, express and handlebars setup were adapted from the nodejs-starter-app.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

In the app.js file, the handlebars helper was created by us using the documentation from handlebars.
Source URL: https://handlebarsjs.com/guide/

