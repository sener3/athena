import cache from "./cache"
import { IInfo } from "./types"

class Athena {
    constructor() {}

    async query<T>(url: string, { variables }: IInfo = {}): Promise<T> {
        const cachedData = cache.getByKey(url, { variables })

        if (cachedData) {
            return cachedData
        }

        const response = await fetch(url, {
            method: "GET",
            body: JSON.stringify(variables),
        })
        const data = await response.json()

        cache.set(url, data, { variables })
        return data
    }

    async refetchQueries<T>(url: string, { variables }: IInfo = {}) {
        const response = await fetch(url, {
            method: "GET",
            body: JSON.stringify(variables),
        })
        const data = await response.json()

        cache.set(url, data, { variables })
        cache.notifySubscribers()
    }
}

const athena = new Athena()
export default athena
