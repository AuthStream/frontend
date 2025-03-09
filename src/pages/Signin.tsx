import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { JWT_LOCAL_STORAGE_KEY } from "../constants/data";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (email === "admin@example.com" && password === "password") {
        localStorage.setItem(JWT_LOCAL_STORAGE_KEY, "token");
        toast.success("Sign-in successful!");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="text-foreground min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-800 border-black border-2 p-8 rounded-lg shadow-lg w-96 sketch-border">
        <h2 className="text-4xl font-bold text-center mb-2">AUTHSTREAM</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Welcome, AuthStream
        </p>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <Input
              type="text"
              className="w-full p-2 border rounded border-black shadow-sm"
              value={email}
              placeholder="Email or Username"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded border-black shadow-sm"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500 p-0 "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-black py-2 hover:bg-blue-600 border-2"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
