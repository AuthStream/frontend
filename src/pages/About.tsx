import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";

function About() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }
    const [state, newState] = useState(0)
    const handleClickState = () => {
        newState(state + 1)
    }
    useEffect(() => {
        console.log("component useEfect");

    }, [])
    return (
        <div className="p-4 text-foreground min-h-screen flex flex-col items-center justify-center">
            <Button
                onClick={handleClick}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition"
            >
                Click me to go to Home
            </Button>
            <div>
                {state}</div>
            <Button
                onClick={handleClickState}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition"
            >
                up state
            </Button>
            <h1 className="text-2xl font-bold mt-4">About Page</h1>
        </div>
    );
}

export default About;