import { ChangeEvent, FormEvent, useState } from "react"
import athena from "@/athena"

import { usersApiRoutes } from "@/config/api/users"
import { User } from "@/lib/db"

import Form from "../ui/form"

const FormAddUser = () => {
    const [name, setName] = useState("")

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const addUser = (e: FormEvent) => {
        e.preventDefault()

        fetch(usersApiRoutes.add, {
            method: "POST",
            body: JSON.stringify({
                name: name,
            }),
        }).then(() => {
            athena.refetchQueries<User[]>(usersApiRoutes.getAll)
            setName("")
        })
    }

    return (
        <Form onSubmit={addUser}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    className="text-black"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleName}
                />
            </div>

            <button>Add user</button>
        </Form>
    )
}

export default FormAddUser
