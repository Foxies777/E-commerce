import { useUnit } from "effector-react"
import { signUpFx } from "../index"


export const useSignUp = () =>{
    const [signUp, loading] = useUnit([signUpFx, signUpFx.pending])
    return [signUp, loading] as const
}