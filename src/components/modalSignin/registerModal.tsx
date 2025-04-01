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
  onRegister: (registerData: { username: string; password: string }) => void;
  onClose: () => void;
  loading: boolean;
}

const RegisterModal = ({
  onRegister,
  onClose,
  loading,
}: RegisterModalProps) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const validateUsername = (username: string): string | null => {
    if (!username) return "Username is required.";
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!usernameRegex.test(username))
      return "Username can only contain letters, numbers, underscores, dots, or hyphens.";
    return null;
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = () => {
    const { username, password } = registerData;

    if (!username || !password) {
      toast.warning("All fields are required.");
      return;
    }

    if (!validateUsername(username)) {
      toast.warning(
        "Username can only contain letters, numbers, underscores, dots, or hyphens."
      );
      return;
    }

    if (!validatePassword(password)) {
      toast.warning(
        "Password must have at least 8 characters, including uppercase, lowercase, number, and special character."
      );
      return;
    }

    onRegister(registerData);
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
            disabled={loading}
          />
          <Input
            name="password"
            type="password"
            value={registerData.password}
            onChange={handleChange}
            placeholder="Password"
            disabled={loading}
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
