"use client"

export interface ErrorProps{
    error: Error,
    reset: () => void
}

export default function Error({error, reset}: ErrorProps){
    return(
        <div>
            <h2>Ha ocurrido un error al cargar este componente :(</h2>
            <button onClick={reset}></button>
        </div>
    )
}