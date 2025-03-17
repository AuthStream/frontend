import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "react-toastify";

interface RegisterModalProps {
  onRegister: (registerData: {
    username: string;
    password: string;
    key: string;
  }) => void;
  onClose: () => void;
}

const RegisterModal = ({ onRegister, onClose }: RegisterModalProps) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    key: "",
  });

  const validateEmail = (username: string) => {
    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = () => {
    const { username, password, key } = registerData;

    if (!username || !password || !key) {
      toast.warning("All fields are required.");
      return;
    }

    // if (!validateEmail(username)) {
    //   toast.warning("Invalid username format.");
    //   return;
    // }

    // if (!validatePassword(password)) {
    //   toast.warning(
    //     "Password must have at least 8 characters, including uppercase, lowercase, number, and special character."
    //   );
    //   return;
    // }

    onRegister(registerData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register Account</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="username"
            value={registerData.username}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            value={registerData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Input
            name="key"
            value={registerData.key}
            onChange={handleChange}
            placeholder="Registration Key"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleRegister}
          >
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
