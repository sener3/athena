import { IInfo } from "./types"

type CacheType = Record<string, string>

class AthenaCache {
    private cache: CacheType = {}
    private subscribers: ((data: CacheType) => void)[] = []

    constructor() {}

    createKey(url: string, { variables }: IInfo = {}) {
        if (!variables) {
            return url
        }

        return `${url}::${JSON.stringify(variables)}`
    }

    set<T>(url: string, data: T, { variables }: IInfo = {}) {
        const key = this.createKey(url, { variables })
        this.cache[key] = JSON.stringify(data)
    }

    get() {
        return this.cache
    }

    getByKey(url: string, { variables }: IInfo = {}) {
        const key = this.createKey(url, { variables })
        const data = this.cache[key]

        if (data) {
            return JSON.parse(data)
        }

        return null
    }

    subscribe(callback: (data: CacheType) => void) {
        this.subscribers.push(callback)
    }

    unsubscribe(callback: (data: CacheType) => void) {
        this.subscribers = this.subscribers.filter(
            (subscriber) => subscriber !== callback
        )
    }

    notifySubscribers() {
        this.subscribers.forEach((subscriber) => {
            subscriber(this.cache)
        })
    }
}

const cache = new AthenaCache()
export default cache
