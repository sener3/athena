import React, { FC, HTMLAttributes } from "react"

interface FormProps
    extends HTMLAttributes<HTMLFormElement>,
        React.PropsWithChildren {}

const Form: FC<FormProps> = ({ children, ...rest }) => {
    return <form {...rest}>{children}</form>
}

export default Form
