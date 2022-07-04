# Student Notes Application

Hi! The discomfort of writing everything down in a notebook, which is quite hectic, led to the creation of Student Notes application. I have created an online web application where registered students can safely and securely make, edit, upload, and delete your notes and information without being disturbed. You can also access your notes from anywhere in the world at any time. Don't forget to make a note, since everything you create is crucial.

# Description

The admin user will be creating the accounts for the students with their Name and email. Students will be sent an **Account Confirmation Email** along with the **Temporary Password**. Then, the students can log into the application using their temporary password. The Student that **logs in first time** will be redirected to the information update page where they could change their password and add other details. The Student that **logs after first time** will be redirected to the notes page where they could **CREATE / READ / UPDATE / DELETE**.

## Build with

- Frontend : **[ReactJS](https://reactjs.org/)**
- Backend : **[NodeJS](https://nodejs.org/en/)**
- Database : **[MongoDB](https://www.mongodb.com/)**
- Containerized : **[Docker](https://www.docker.com/)**

## Installation Guide

1. Make Sure you've installed latest version of **[Docker](https://www.docker.com/products/docker-desktop/)** .

2. Clone this git repo.

```
git clone https://github.com/IamAjhere/Student_Notes_Application
```

3. Create a SMTP server to send email to registered students.
   - I used **[Elastic Email](https://elasticemail.com/)** for temporary usage.
4. Create .env file inside the server folder. (/Student_Notes_Application/Server)
   copy paste the below text and update it with your testing details.

```
//database connection string
DB:  mongodb://localhost:27017/[Database name here]
BASE_URL:  http://localhost:3000
PORT:  2000

//Admin login details for seedfile
ADMIN_EMAIL:  [Admin email or login username here]
ADMIN_PASSWORD:  [Admin password here ]

//SMTP details for Nodemailer
HOST:  [Host name here]
USER:  [Account Username here]
PASS:  [Account Password here]

TOKEN_SECRET:  [JWT TOKEN SECRET here]
```

5. Type one of the below code in terminal inside **Student_Notes_Application** to start your development server.

```
make run-dev
```

or

```
docker-compose up
```

6. Your development server would be running successfully in port 3000.

```
http://localhost:3000/
```
