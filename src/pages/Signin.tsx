import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { JWT_LOCAL_STORAGE_KEY } from "../constants/data";
import {
  useCheckConnection,
  useGetSchema,
  useLogin,
  useRegister,
} from "../hooks/useSigninQueries";
import RegisterModal from "../components/modalSignin/registerModal";
import ConfigDBModal from "../components/modalSignin/configDbModal";
import ViewSchemaModal from "../components/modalSignin/viewSchemaModal";

import { DbConfig, dbSchema, RegisterData, SigninData } from "../api/type";

const SignIn = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    password: "",
  });
  const [schema, setSchema] = useState<dbSchema>({
    databaseName: "",
    databaseSchema: [],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isConfigModalOpen, setConfigModalOpen] = useState(false);
  const [isSchemaModalOpen, setSchemaModalOpen] = useState(false);
  const [isConnectionChecked, setIsConnectionChecked] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const checkConnectionMutation = useCheckConnection();
  const getSchemaMutation = useGetSchema();

  const validateEmail = (username: string) => {
    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLoginClick = () => {
    // if (!validateEmail(username)) {
    //   toast.error("Email không hợp lệ!");
    //   return;
    // }
    // if (!validatePassword(password)) {
    //   toast.error(
    //     "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
    //   );
    //   return;
    // }
    handleSignIn({ username, password });
  };
  const handleSignIn = async (signinData: SigninData) => {
    try {
      loginMutation.mutate(signinData, {
        onSuccess: (response) => {
          if (signinData.username === "admin@example.authstream") {
            setRegisterModalOpen(true);
          } else {
            toast.success("Sign-in successful!");
            localStorage.setItem(JWT_LOCAL_STORAGE_KEY, response.id);
            navigate("/");
          }
        },
        onError: () => {
          toast.error("Failed to Sign in");
        },
      });
    } catch (error) {
      toast.error("Failed to Signin");
    }
  };

  const handleSignInAfterRegister = async (signinData: SigninData) => {
    try {
      loginMutation.mutate(signinData, {
        onSuccess: (response) => {
          if (signinData.username === "admin@example.authstream") {
            setRegisterModalOpen(true);
          } else {
            toast.success("Sign-in successful!");
            localStorage.setItem(JWT_LOCAL_STORAGE_KEY, response.id);
            navigate("/");
          }
        },
        onError: () => {
          toast.error("Failed to Sign in");
        },
      });
    } catch (error) {
      toast.error("Failed to Signin");
    }
  };

  const handleRegister = async (registerData: RegisterData) => {
    try {
      registerMutation.mutate(registerData, {
        onSuccess: (response) => {
          toast.success("Registration successful, logging in...");
          setUserData({
            username: registerData.username,
            password: registerData.password,
            id: response.id,
          });
          setRegisterModalOpen(false);
          setConfigModalOpen(true);
          localStorage.setItem("pendingSignIn", JSON.stringify(registerData));
        },
        onError: () => {
          toast.error("Failed to Register");
        },
      });
    } catch (error) {
      toast.error("Failed to register");
    }
  };

  const handleGetSchema = async (dbConfig: DbConfig) => {
    try {
      getSchemaMutation.mutate(
        {
          ...dbConfig,
          username: userData.username,
          password: userData.password,
        },
        {
          onSuccess: (response) => {
            toast.success("Saved Config");
            setSchema(response);
            setSchemaModalOpen(true);
            setConfigModalOpen(false);
            // const pendingSignIn = localStorage.getItem("pendingSignIn");
            // if (pendingSignIn) {
            //   const registerData = JSON.parse(pendingSignIn);
            //   handleSignInAfterRegister(registerData);
            //   localStorage.removeItem("pendingSignIn");
            // }
          },
          onError: () => {
            toast.success("Cannot Save");
          },
        }
      );
    } catch (error) {
      toast.error("error");
    }
  };

  const handleCheckConnection = async (dbConfig: DbConfig) => {
    try {
      checkConnectionMutation.mutate(
        {
          ...dbConfig,
          username: userData.username,
          password: userData.password,
        },
        {
          onSuccess: (response) => {
            toast.success(response);
            setIsConnectionChecked(true);
          },
          onError: (error) => {
            toast.error(error.toString());
            setIsConnectionChecked(false);
          },
        }
      );
    } catch (error) {
      toast.error("error");
      setIsConnectionChecked(false);
    }
  };

  return (
    <div className="text-foreground min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-800 border-black border-2 p-8 rounded-lg shadow-lg w-96 sketch-border">
        <h2 className="text-4xl font-bold text-center mb-2">AUTHSTREAM</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Welcome, AuthStream
        </p>
        <div className="mb-4">
          <Input
            type="text"
            className="w-full p-2 border rounded border-black shadow-sm"
            value={username}
            placeholder="Username"
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
            className="absolute right-2 top-2 text-gray-500 p-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <Button
          onClick={handleLoginClick}
          className="w-full bg-blue-500 text-black py-2 hover:bg-blue-600 border-2"
        >
          Log in
        </Button>
      </div>
      {isRegisterModalOpen && (
        <RegisterModal
          onRegister={handleRegister}
          onClose={() => setRegisterModalOpen(false)}
        />
      )}
      {isConfigModalOpen && (
        <ConfigDBModal
          onCreate={handleGetSchema}
          onCheck={handleCheckConnection}
          onClose={() => {
            setConfigModalOpen(false);
            setIsConnectionChecked(false);
          }}
          isConnectionChecked={isConnectionChecked}
        />
      )}
      {isSchemaModalOpen && (
        <ViewSchemaModal
          schema={schema}
          onClose={() => {
            setSchemaModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SignIn;
