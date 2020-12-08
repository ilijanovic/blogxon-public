
import mongoose, { Document } from "mongoose"



declare module "express" {
    export interface Response {
        locals: ResponseLocalsInterface,

    }
    export interface Request {
        file: Express.Multer.File
    }

}


export interface ResponseLocalsInterface {
    userId: string,
    token: string
}

export interface NotificationInterface {
    options: {
        body: string
    },
    title: string
}

export interface InputInterface {
    password: string,
    passwordConfirm: string,
    email: string
}
export interface NewUserInterface {
    email: string,
    password: string,
    role: string
}

export interface TokenInterface { role: string, _id: mongoose.Types.ObjectId }
export interface TokenSignatureInterface {
    name: string,
    _id: string,
    iat: number
}

export interface CompressImageInterface {
    path: string,
    compression?: number,
    width?: number,
    height?: number
}
export interface SendMailInerface {
    from: string,
    subject: string,
    text: string,
    html: string
}


export interface DashboardCountInterface {
    emails: number,
    subscriptions: number,
    blogs: number
}



export interface BlogInterface extends Document {
    title: string,
    description: string,
    content: string,
    thumbnail: string,
    thumbnail_webp: string,
    likes: number,
    views: number,
    structuredData: string,
    keywords: string[],
    created: Date,
    author: mongoose.Types.ObjectId,
    slug: string,
    updated: Date,
    ips: string[],
    enabled: Boolean
}

export interface BadgeInterface extends Document {
    path: string
}
export interface BlogQueryInterface extends Omit<BlogInterface, "author" | "ips"> {
    author: AuthorInterface
}

export interface UserInterface extends Document {
    email: string,
    role: string,
    created: Date,
    disabled: Boolean,
    author: AuthorInterface
}

export interface UserModelInterface extends UserInterface {
    password: string
}

export interface AuthorInterface {
    name: string,
    bio: string,
    githubLink: string,
    stackoverflowLink: string,
    twitterLink: string,
    image: string,
    image_webp: string,

}
export interface DraftInterface extends Document {
    title: string,
    description: string,
    thumbnail: string,
    thumbnail_webp: string,
    structuredDataType: string,
    keywords: string[],
    author: mongoose.Types.ObjectId,
}
export interface SubscriptionInterface {
    endpoint: string,
    keys: {
        p256dh: string,
        auth: string
    },
}
export interface EmailInterface extends Document {
    email: string,
    created: Date,
}
export interface ModelSubscriptionInterface extends Document {
    endpoint: string,
    keys: {
        p256dh: string,
        auth: string
    },
    created: Date
}
export interface ConfigurationInterface {
    readonly saltRounds: number,
    readonly tokenExpiration: number,
    readonly cookieName: string,
    readonly bio_length: number,
    readonly name_length: number,
    readonly port: number,
    readonly domain: string,
    readonly host: string,
    readonly image_compression: number,
    readonly title_length: number,
    readonly description_length: number,
    readonly keywords: number,
    readonly thumbnail_sizes: {
        readonly width: number,
        readonly height: number,
    },
    readonly content_length: number,
    readonly images_path: string,
    readonly images_webp_path: string,
    readonly blogpost_view_schedule: string,
    readonly badge_path: string,
    readonly profile_path: string,
    readonly profile_sizes: {
        readonly width: number,
        readonly height: number
    }
}

export interface ConstantsInterface {
    readonly structuredDataOptions: string[]
}

export interface PostUploadInterface {
    thumbnail: Express.Multer.File
    title: string,
    description: string,
    content: string,
    keywords: string,
    structuredData: string
}


