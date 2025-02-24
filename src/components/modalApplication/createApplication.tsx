

// // import { useState } from "react";
// // import { Button } from "../ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// // } from "../ui/dialog";
// // import { Input } from "../ui/input";
// // import { toast } from "react-toastify";
// // import { ProviderType } from "../../api/type";
// // import { useGetProviders } from "../../hooks/useProviderQueries";

// // interface Application {
// //   id: string;
// //   name: string;
// //   provider: string;
// //   token: string;
// // }

// // interface CreateApplicationProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onCreate: (application: Application) => void;
// // }

// // const CreateApplication = ({ isOpen, onClose, onCreate }: CreateApplicationProps) => {
// //   const { data: providers = [], isLoading, error } = useGetProviders();
// //   const [step, setStep] = useState(1);
// //   const [newApplication, setNewApplication] = useState<Application>({
// //     id: "",
// //     name: "",
// //     provider: "",
// //     token: "",
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setNewApplication((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const resetApplication = () => {
// //     setNewApplication({ id: "", name: "", provider: "", token: "" });
// //     setStep(1);
// //   };

// //   const handleNext = () => {
// //     if (!newApplication.provider) {
// //       toast.warning("Please select a provider.");
// //       return;
// //     }
// //     setStep(2);
// //   };

// //   const handleCreate = () => {
// //     const { id, name, provider, token } = newApplication;
// //     const trimmedId = id.trim();
// //     const trimmedName = name.trim();
// //     const trimmedToken = token.trim();

// //     if (!trimmedId || !trimmedName || !provider || !trimmedToken) {
// //       toast.warning("All fields are required and cannot be empty.");
// //       return;
// //     }

// //     if (!/^[a-zA-Z0-9]+$/.test(trimmedId)) {
// //       toast.warning("Application ID must only contain letters and numbers.");
// //       return;
// //     }

// //     if (trimmedToken.length < 8) {
// //       toast.warning("Application Token must be at least 8 characters long.");
// //       return;
// //     }

// //     onCreate({ ...newApplication, id: trimmedId, name: trimmedName, token: trimmedToken });
// //     resetApplication();
// //     onClose();
// //   };

// //   const handleClose = () => {
// //     resetApplication();
// //     onClose();
// //   };

// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>Create Application</DialogTitle>
// //           <DialogDescription>
// //             {step === 1 ? "Select a provider." : "Enter application details."}
// //           </DialogDescription>
// //         </DialogHeader>
// //         <div className="space-y-4">
// //           {step === 1 ? (
// //             <>
// //               {isLoading ? (
// //                 <p>Loading providers...</p>
// //               ) : error ? (
// //                 <p className="text-red-500">Failed to load providers</p>
// //               ) : (
// //                 <select
// //                   name="provider"
// //                   value={newApplication.provider}
// //                   onChange={handleChange}
// //                   className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
// //                 >
// //                   <option value="">Select Provider</option>
// //                   {(Array.isArray(providers) ? providers : providers?.contents ?? []).map(
// //                     (provider: ProviderType) => (
// //                       <option key={provider.id} value={provider.id}>
// //                         {provider.name}
// //                       </option>
// //                     )
// //                   )}
// //                 </select>
// //               )}
// //               <Button className="bg-blue-500 text-white hover:bg-blue-600 w-full" onClick={handleNext}>
// //                 Next
// //               </Button>
// //             </>
// //           ) : (
// //             <>
// //               <Input name="id" value={newApplication.id} onChange={handleChange} placeholder="Application ID" />
// //               <Input name="name" value={newApplication.name} onChange={handleChange} placeholder="Application Name" />
// //               <Input name="token" value={newApplication.token} onChange={handleChange} placeholder="Application Token" />
// //             </>
// //           )}
// //         </div>
// //         <DialogFooter>
// //           {step === 2 && (
// //             <Button variant="outline" onClick={() => setStep(1)}>
// //               Back
// //             </Button>
// //           )}
// //           <Button variant="outline" onClick={handleClose}>
// //             Cancel
// //           </Button>
// //           {step === 2 && (
// //             <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleCreate}>
// //               Create
// //             </Button>
// //           )}
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default CreateApplication;

// import { useState } from "react";
// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { toast } from "react-toastify";
// import { ProviderType } from "../../api/type";
// import { useGetProviders } from "../../hooks/useProviderQueries";

// interface Application {
//   id: string;
//   name: string;
//   provider: string;
//   token: string;
// }

// interface CreateApplicationProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCreate: (application: Application) => void;
// }

// const CreateApplication = ({ isOpen, onClose, onCreate }: CreateApplicationProps) => {
//   const { data: providers, isLoading, error } = useGetProviders();
//   const [step, setStep] = useState(1);
//   const [newApplication, setNewApplication] = useState<Application>({
//     id: "",
//     name: "",
//     provider: "",
//     token: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewApplication((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const resetApplication = () => {
//     setNewApplication({ id: "", name: "", provider: "", token: "" });
//     setStep(1);
//   };

//   const handleNext = () => {
//     if (!newApplication.provider) {
//       toast.warning("Please select a provider.");
//       return;
//     }
//     setStep(2);
//   };

//   const handleCreate = () => {
//     const { id, name, provider, token } = newApplication;
//     const trimmedId = id.trim();
//     const trimmedName = name.trim();
//     const trimmedToken = token.trim();

//     if (!trimmedId || !trimmedName || !provider || !trimmedToken) {
//       toast.warning("All fields are required and cannot be empty.");
//       return;
//     }

//     if (!/^[a-zA-Z0-9]+$/.test(trimmedId)) {
//       toast.warning("Application ID must only contain letters and numbers.");
//       return;
//     }

//     if (trimmedToken.length < 8) {
//       toast.warning("Application Token must be at least 8 characters long.");
//       return;
//     }

//     onCreate({ ...newApplication, id: trimmedId, name: trimmedName, token: trimmedToken });
//     resetApplication();
//     onClose();
//   };

//   const handleClose = () => {
//     resetApplication();
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create Application</DialogTitle>
//           <DialogDescription>
//             {step === 1 ? "Select a provider." : "Enter application details."}
//           </DialogDescription>
//         </DialogHeader>
//         <div className="space-y-4">
//           {step === 1 ? (
//             <>
//               {isLoading ? (
//                 <p>Loading providers...</p>
//               ) : error ? (
//                 <p className="text-red-500">Failed to load providers</p>
//               ) : providers?.contents.length === 0 ? (

//                 <Button className="bg-red-500 text-white hover:bg-red-600 w-full" onClick={() => window.location.href = '/provider'}>
//                   No providers found. Create a new one.
//                 </Button>
//               ) : (
//                 <>
//                   <select
//                     name="provider"
//                     value={newApplication.provider}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
//                   >
//                     <option value="">Select Provider</option>
//                     {(Array.isArray(providers) ? providers : providers?.contents ?? []).map(
//                       (provider: ProviderType) => (
//                         <option key={provider.id} value={provider.id}>
//                           {provider.name}
//                         </option>
//                       )
//                     )}
//                   </select>

//                 </>

//               )}

//             </>
//           ) : (
//             <>
//               <Input name="id" value={newApplication.id} onChange={handleChange} placeholder="Application ID" />
//               <Input name="name" value={newApplication.name} onChange={handleChange} placeholder="Application Name" />
//               <Input name="token" value={newApplication.token} onChange={handleChange} placeholder="Application Token" />
//             </>
//           )}
//         </div>
//         <DialogFooter>
//           {step === 2 && (
//             <Button variant="outline" onClick={() => setStep(1)}>
//               Back
//             </Button>
//           )}
//           {step === 1 && (
//             <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleNext}>
//               Next
//             </Button>
//           )

//           }
//           <Button variant="outline" onClick={handleClose}>
//             Cancel
//           </Button>
//           {step === 2 && (
//             <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleCreate}>
//               Create
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateApplication;



import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { ProviderType } from "../../api/type";
import { useGetProviders } from "../../hooks/useProviderQueries";

interface Application {
  id: string;
  name: string;
  provider: string;
  token: string;
}

interface CreateApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (application: Application) => void;
}

const CreateApplication = ({ isOpen, onClose, onCreate }: CreateApplicationProps) => {
  const { data: providers, isLoading, error } = useGetProviders();
  const [step, setStep] = useState(1);
  const [newApplication, setNewApplication] = useState<Application>({
    id: "",
    name: "",
    provider: "",
    token: "",
  });
  const [extraFields, setExtraFields] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetApplication = () => {
    setNewApplication({ id: "", name: "", provider: "", token: "" });
    setStep(1);
    setExtraFields([]);
  };

  const handleCreate = () => {
    const { name, provider, token } = newApplication;

    const trimmedName = name.trim();
    const trimmedToken = token.trim();

    if (!trimmedName || !provider || !trimmedToken) {
      toast.warning("All fields are required and cannot be empty.");
      return;
    }
    // Kiểm tra token có hợp lệ không (ví dụ: tối thiểu 8 ký tự)
    if (trimmedToken.length < 8) {
      toast.warning("Application Token must be at least 8 characters long.");
      return;
    }

    // Gọi hàm onCreate với application đã được validate
    onCreate({
      ...newApplication,
      name: trimmedName,
      token: trimmedToken,
    });
    resetApplication();
    onClose();
  };

  // const handleCreate = () => {
  //   //validate data ở đây

  //   onCreate(newApplication);
  //   resetApplication();
  //   onClose();
  // };

  const handleClose = () => {
    resetApplication();
    onClose();
  };

  const handleAddField = () => {
    if (inputValue.trim() !== "") {
      setExtraFields([...extraFields, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveField = (index: number) => {
    setExtraFields(extraFields.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Application</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Select a provider." : "Enter application details."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            value={newApplication.name}
            onChange={handleChange}
            placeholder="Application Name"
          />
          {isLoading ? (
            <p>Loading providers...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load providers</p>
          ) : (
            <select
              name="provider"
              value={newApplication.provider}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
            >
              <option value="">Select Provider</option>
              {(Array.isArray(providers)
                ? providers
                : providers?.contents ?? []
              ).map((provider: ProviderType) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          )}
          <Input
            name="token"
            value={newApplication.token}
            onChange={handleChange}
            placeholder="Application Token"
          />
        </div>
        <DialogFooter>
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {step === 2 && (
            <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleCreate}>
              Create
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateApplication;
