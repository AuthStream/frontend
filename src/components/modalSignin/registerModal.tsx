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
    email: string;
    password: string;
    key: string;
  }) => void;
  onClose: () => void;
}

const RegisterModal = ({ onRegister, onClose }: RegisterModalProps) => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    key: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const { email, password, key } = registerData;

    if (!email || !password || !key) {
      toast.warning("All fields are required.");
      return;
    }

    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters long.");
      return;
    }

    onRegister(registerData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register Account</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="email"
            value={registerData.email}
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
