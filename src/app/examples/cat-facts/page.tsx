"use client"

import athena from "@/athena"
import useQuery from "@/athena/hooks/useQuery"

import { catFactsApiRoutes } from "@/config/api/cat-facts"

interface ICatFact {
    text: string
}

const CatFactsPage = () => {
    const { data } = useQuery<ICatFact[]>(catFactsApiRoutes.facts)

    const call = async () => {
        // When calling the query again
        // we can observe that no network call is made anymore
        await athena.query(catFactsApiRoutes.facts)
    }

    return (
        <main>
            <h1>Cat Facts</h1>

            <ul>
                {data?.map((x) => (
                    <li>{x.text}</li>
                ))}
            </ul>

            <button onClick={call}>Refetch</button>
        </main>
    )
}

export default CatFactsPage
