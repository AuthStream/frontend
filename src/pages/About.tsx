import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="p-4">
            <h1>About Page</h1>
            <div className="card">
                <button onClick={handleClick}>
                    Click me to go to home
                </button>
            </div>
        </div>
    );
}

export default About;