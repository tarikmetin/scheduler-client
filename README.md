# Scheduler

## An application for tracking your customers and their appointment history. Made with utilizing FullCalendar library on React.

This is the frontend repository of my MERN stack scheduler app, for the api please check -> https://github.com/tarikmetin/scheduler-api

Simply put, it is a calendar appointment application where you can mark your upcoming appointments with your customers. With this application you can register your own customer base and every single appointment marked in the calendar will be available in the corresponding customer's appointment history.

This was my first full-stack project, which I built from scratch. My main goal was to create a functioning MERN application, and I believe I succeeded in doing so.

## Challenges during development

The calendar module is built using FullCalendar library. I figured it would take me more than a month to develop only the calendar module from scratch so I decided to use a library. For some reason I had hard time understanding FullCalendar doc files and implementing the features in the React.

The React Hook Form making forms for the app trivial.

One mistake I did was to trying to add Tanstack query after I finished the application. I mainly added the library to avoid unnecessary get requests by client side and it helped me in that sense, but I regret not starting with the tanstack when I first started the project.

## The demo

The demo is available here -> https://scheduler-client.onrender.com/

You can use the demo by using demo@scheduler.com / AbC123123!

Since I am using free service, the instance of my api spin down and can delay the requests up to 50 seconds for the first time usage.
