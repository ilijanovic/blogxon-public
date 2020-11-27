# Blogxon headless blog system

Blogxon is a simple headless CMS system. Its made to be developer friendly as easy to use.
Its build up on Nuxt.js in universal mode. Its backend is powered by Express.js and as database it uses MongoDB.

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

### Fetch blog by ID, slu

You can fetch an blog by its mongodb ID or slug

```javascript
$blogxon.getBlogById(id)
$blogxon.getBlogBySlug(slug)
```
