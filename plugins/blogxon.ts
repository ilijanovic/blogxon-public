

import { Inject } from "@nuxt/types/app"
import { BlogQueryInterface } from "~/types"
import { config } from "@/config"
import { Context } from "@nuxt/types"
import mongoose from "mongoose"

export default function (context: Context, inject: Inject) {
  inject('blogxon', {
    url: process.env.NODE_ENV !== "production" ? `http://localhost:${config.port}` : config.domain,
    getBlogs(): Promise<Omit<BlogQueryInterface, "content">[]> {
      return fetch(`${this.url}/api/internal/blogs`).then(res => res.json())
    },
    getBlogById(_id: string | mongoose.Types.ObjectId): Promise<BlogQueryInterface> {
      return fetch(`${this.url}/api/internal/getBlog/${_id}`).then(res => res.json())
    },
    getBlogBySlug(slug: string): Promise<BlogQueryInterface> {
      return fetch(`${this.url}/api/internal/getBlogBySlug/${slug}`).then(res => res.json())
    },
    askPermission: async (): Promise<Boolean> => {
      const permissionResult = await Notification.requestPermission()
      return permissionResult === 'granted'
    },
    async subscribe(swPath: string = "/sw.js") {
      let url = this.url;
      let registration = await navigator.serviceWorker.register(swPath)
      const PUBLIC_KEY = process.env.VAPID_PUBLIC
      if (!PUBLIC_KEY) {
        throw "No Public key"
      }
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(PUBLIC_KEY),
      }
      let subscription = await registration.pushManager.subscribe(
        subscribeOptions
      )
      try {
        return fetch(`${url}/api/internal/subscribe`, {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json"
          }
        })
      } catch (err) {
        return err
      }
    }
  })
}

function urlB64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
