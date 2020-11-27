import { ConfigurationInterface, ConstantsInterface } from "./types"

/**
 * This Object contains different configuration options
 *
 * @module
 * @property {number} saltRounds - Number of salt rounds for hashing the password
 * @property {number} tokenExpiration - Expiration time of the JWT
 * @property {String} cookieName - Set the name of the cookie that will hold the token
 * @property {number} bio_length - Set the max length of the bio description
 * @property {number} name_length - Set the max length of your name
 * @property {number} port - Set the port
 * @property {string} domain - Set the domain
 * @property {string} host - Set the host
 * @property {number} image_compression - Set the image compression in %
 * @property {number} title_length - Set the max title length of the blog post
 * @property {number} description_length - Set the max length of the blog post description
 * @property {number} keywords - Set the max amount of keywords per blog post
 * @property {Object} thumbnail_sizes - Object that contains "width" and "height" for the thumbnail size
 * @property {string} images_path - Sets the path for images
 * @property {string} images_webp_path - Sets the path for WEBP images
 */
export const config: ConfigurationInterface = {
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
}
export const constants: ConstantsInterface = {
  structuredDataOptions: ["blog"]
}

