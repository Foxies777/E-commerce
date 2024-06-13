import { useUnit } from "effector-react"
import { signInFx } from "../index"


export const useAuth = () =>{
    const [signIn, loading] = useUnit([signInFx, signInFx.pending])
    return [signIn, loading] as const
}