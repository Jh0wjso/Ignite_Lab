import { Logo } from "./Logo"

export function Header(){
    return(
        <header className = "w-full py-5 flex justify-center items-center bg-black border-b border-gray-600">
            <Logo/>
        </header>
    )
}