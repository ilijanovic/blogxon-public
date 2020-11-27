# Blogxon headless blog system

Blogxon is a simple headless CMS system. Its made to be developer friendly as easy to use.
Its build up on Nuxt.js in universal mode. Its backend is powered by Express.js and as database it uses MongoDB.

It uses Tailwind for the UI

**Please do not use this software for now. Is not finished yet**

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

## Blogxon helpers

You might saw the file `blogxo.ts` inside the `/api/external` directory

This file contains alot of classes that provides methods to help you at development.

Example:

```javascript
import { blogService } from '../blogxon'

blogService.getBlogs().then((blogs) => {
  console.log(blogs)
})
```

Take a look into the `blogxon.ts` file to see what classes are available. If you use VSC editor IntelliSense will help you at coding by giving you hints.
