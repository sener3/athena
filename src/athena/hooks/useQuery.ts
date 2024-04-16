import { useEffect, useState } from "react"

import athena from ".."
import { IInfo } from "../types"

interface UseQueryReturnType<T> {
    data: T | null
    loading: boolean
    error: unknown
}

const useQuery = <T>(
    url: string,
    { variables }: IInfo = {}
): UseQueryReturnType<T> => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        setLoading(true)

        try {
            const athenaData = await athena.query<T>(url, { variables })
            setData(athenaData)
        } catch (err: unknown) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error }
}

export default useQuery
