
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        // Điều hướng đến trang /about khi người dùng click vào nút
        navigate('/about');
    };
    return (
        <div className="p-4">
            <div className="card">
                <button onClick={handleClick}>
                    Click me to go to About
                </button>
            </div>
            <h1>Home Page</h1>

        </div>
    );
}

export default Home;