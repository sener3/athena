"use client"

import useQuery from "@/athena/hooks/useQuery"

import { usersApiRoutes } from "@/config/api/users"
import { User } from "@/lib/db"
import FormAddUser from "@/components/users/form-add-user"

interface IData {
    users: User[]
}

const UsersPage = () => {
    const { data } = useQuery<IData>(usersApiRoutes.getAll)

    return (
        <main>
            <h1>Users</h1>

            {data?.users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}

            <FormAddUser />
        </main>
    )
}

export default UsersPage
