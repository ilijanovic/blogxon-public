import Subscription from '../model/subscription'
import webpush from "web-push"
import Badge from "../model/badge"
import { SubscriptionInterface, ModelSubscriptionInterface, NotificationInterface, BadgeInterface } from "../../../types"
import mongoose from "mongoose"
import { config } from "../../../config"
class SubscriptionService {
  public subscribe(sub: SubscriptionInterface): Promise<ModelSubscriptionInterface> {
    let subscription = new Subscription({ ...sub, })
    return subscription.save()
  }

  public getSubscriptions(): Promise<SubscriptionInterface[]> {
    return Subscription.find().exec()
  }
  public async sendNotification(notification: NotificationInterface): Promise<void> {



    let subscriptions = await this.getSubscriptions()
    webpush.setVapidDetails(
      'mailto:ilija.marijanovic@gmx.at',
      process.env.VAPID_PUBLIC!,
      process.env.VAPID_PRIVATE!
    )

    let jsonData = JSON.stringify(notification)
    await Promise.all(
      subscriptions.map((subscription: SubscriptionInterface) => {
        return webpush.sendNotification(subscription, jsonData, {
          vapidDetails: {
            subject: config.domain,
            publicKey: process.env.VAPID_PUBLIC!,
            privateKey: process.env.VAPID_PRIVATE!,
          },
        }).catch(err => { })
      })
    )
  }

  public async getBadges(): Promise<BadgeInterface[]> {
    return Badge.find().exec()
  }
  public saveBadge(path: string): Promise<BadgeInterface> {
    let badge = new Badge({ path })
    return badge.save()
  }

  public findBadgeById(_id: string | mongoose.Types.ObjectId): Promise<BadgeInterface | null> {
    return Badge.findOne({ _id }).exec()
  }

  public deleteBadgeById(_id: string | mongoose.Types.ObjectId): Promise<any> {
    return Badge.deleteOne({ _id }).exec()
  }

}




export const subscriptionService: SubscriptionService = new SubscriptionService()