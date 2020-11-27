# Blogxon headless blog system

Blogxon is a simple headless CMS system. Its made to be developer friendly as easy to use.
Its build up on Nuxt.js in universal mode. Its backend is powered by Express.js and as database it uses MongoDB.

It uses Tailwind for the UI

**Please do not use this software for now. Is not finished yet. There are still bugs in it and the API might change in the future**

## Setup

Before you start the application you will need to add some environment variables to your application:

1. `MONGODB_URI`: MongoDB URI to connect to your database
2. `VAPID_PUBLIC`: Vapid public key for your web push notifications. In the next step i will explain how to get it
3. `VAPID_PRIVATE`: Vapid private key for your web push notifications. In the next step i will explain how to get it.
4. `PRIVATE_KEY`: A long random string to hash your JWT. Type here an random string in it.
5. `SENDGRID`: Sendgrid API key to send emails

## Generate VAPID keys

To generate the keys type in in your terminal:

`npm run vapid`

It will display you the public and private key.

## Start application

First you need to install all dependencies with:

`npm i`

To start the application type in:

`npm run dev`

After start you will need to generate an admin account

## Generate admin account

To generate an admin account, navigate to `/generateAdmin`

You will need to fill out the form to create an admin account. There can be only 1 admin. After creating the account this page will be locked

## Login to the dashboard

Navigate to `/admin` to log in into the dashboard

## Fetch blogs

You can fetch the blogs with the injected plugin `$blogxon`

```javascript
export default {
  async asyncData({ $blogxon }) {
    let blogs = await $blogxon.getBlogs()
    return { blogs }
  },
}
```

### Fetch blog by ID or slug

You can fetch an blog by its mongodb ID or slug

```javascript
$blogxon.getBlogById(id)
$blogxon.getBlogBySlug(slug)
```

## Custom REST API

You can add your own endpoints. Your code should be under `/api/external`
The `/api/internal` folder should not be changed.

### Add custom routes

To add custom routes you need to navigate to `/api/external/routes`.
Depending what method you use, you choose between POST and GET file

Your route has by default and `/api` prefix.

`/api/external/routes/get.js`

```javascript
import { Router } from 'express'

let router = Router()

router.get('/hello', (req, res) => {
  res.send('hello')
})

export default router
```

This route would be available under `/api/hello`

## Blogxon services

You might saw the file `blogxon.ts` inside the `/api/external` directory

This file contains alot of classes that provides methods to help you at development.

Example:

```javascript
import { blogService } from '../blogxon'

blogService.getBlogs().then((blogs) => {
  console.log(blogs)
})
```

Take a look into the `blogxon.ts` file to see what classes are available. If you use VSC editor IntelliSense will help you at coding by giving you hints.

## Blogxon services full list

Here is a full list what blogxon provides:

```javascript
import {
  adminService,
  authService,
  blogService,
  cookieService,
  dashboardService,
  emailService,
  errorService,
  imageService,
  passwordService,
  subscriptionService,
  utilsService,
  tokenService,
  eventEmitter,
  subscriber,
  conn,
  config,
} from '../blogxon'
```

## Configuration file

In the root directory you will find an file called `config.ts`. It provides a bunch of options like `saltRounds` for the password, `cookieName` the name for the cookie and much more

Current configuration options by default:

    saltRounds: 10,
    tokenExpiration: 3600000, //1h
    cookieName: 'blogxon_jwt',
    bio_length: 200,
    name_length: 40,
    port: 3000,
    domain: 'https://blogxon.com',
    host: '0.0.0.0',
    image_compression: 80,
    title_length: 80,
    description_length: 200,
    content_length: 2200,
    keywords: 5,
    thumbnail_sizes: {
        width: 300,
        height: 300,
    },
    images_path: '/images',
    images_webp_path: '/images_webp',
    blogpost_view_schedule: "0 */2 * * *",
    badge_path: "/badge"

## Error log

The internal controllers fetches every 500 status code errors.

You can read about the error in the `error.log` file in the root directory

### Write errors to the log file

You can also write errors to the log file.
Import the `errorService` instance and use the `writeErrorLog` method:

```javascript
try {
    let blog = await someRequest(...)
}catch(err) {
    await writeErrorLog(err, "name of the method where it happend")
}
```
