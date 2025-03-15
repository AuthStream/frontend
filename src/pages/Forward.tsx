import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useCreateApplications } from "../hooks/useApplicationQueries";
import { useCreateProviders } from "../hooks/useProviderQueries";
import { useCreateToken } from "../hooks/useTokenQueries";
import { Application, ProviderType } from "../api/type";

const steps = ["Application", "Provider", "Token"];
const providerTypes = [
  { id: "SAML", name: "SAML" },
  { id: "FORWARD", name: "FORWARD" },
];

const Forward = () => {
  const [step, setStep] = useState(0);
  const [applicationId, setApplicationId] = useState("");
  const [applicationData, setApplicationData] = useState({
    id: "",
    name: "",
    providerId: "",
    tokenId: "",
    adminId: "",
    createdAt: "",
    updateAt: "",
  });

  const [providerData, setProviderData] = useState({
    id: "",
    name: "",
    type: "",
    applicationId: "",
    methodId: "",
    methodName: "",
    proxyHostIp: "",
    domainName: "",
    callbackUrl: "",
    createdAt: "",
    updateAt: "",
  });

  const [tokenData, setTokenData] = useState({ value: "" });

  const createApplication = useCreateApplications();
  const createProvider = useCreateProviders();
  const createToken = useCreateToken();

  const handleNext = async () => {
    try {
      if (step === 0) {
        const response = await createApplication.mutateAsync({
          ...applicationData,
          adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        });
        setApplicationId(response.id);
        setApplicationData((prev) => ({ ...prev, id: response.id }));
      } else if (step === 1) {
        if (!applicationId) throw new Error("Application ID is missing.");
        await createProvider.mutateAsync({ ...providerData, applicationId });
      } else if (step === 2) {
        if (!applicationId) throw new Error("Application ID is missing.");
        await createToken.mutateAsync({ ...tokenData, applicationId });
      }
      setStep(step + 1);
    } catch (error) {
      console.error("Error during step transition:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const { name, value } = e.target;
    setData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full h-full flex items-center justify-center dark:bg-gray-950 p-6">
      <div className="w-full h-full bg-gray-200 dark:bg-gray-900 p-6 rounded-lg shadow-md flex">
        <div className="w-1/6 border-r border-gray-700 p-4">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`p-3 mb-2 rounded-lg transition-all duration-300 ${
                index === step ? "bg-blue-600 text-white" : "hover:bg-gray-300"
              }`}
            >
              {index + 1}. {label}
            </div>
          ))}
        </div>

        <div className="w-5/6 p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Create Application</h2>
              <Input
                name="name"
                value={applicationData.name}
                onChange={(e) => handleChange(e, setApplicationData)}
                placeholder="Application Name"
              />
              <Input
                name="tokenId"
                value={applicationData.tokenId}
                onChange={(e) => handleChange(e, setApplicationData)}
                placeholder="Application Token"
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Add Provider</h2>
              <Input
                name="name"
                value={providerData.name}
                onChange={(e) => handleChange(e, setProviderData)}
                placeholder="Provider Name"
              />
              <select
                name="type"
                value={providerData.type}
                onChange={(e) => handleChange(e, setProviderData)}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
              >
                <option value="">Select Provider Type</option>
                {providerTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

              <Input
                name="methodName"
                value={providerData.methodName}
                onChange={(e) => handleChange(e, setProviderData)}
                placeholder="Method Name"
              />
              <Input
                name="proxyHostIp"
                value={providerData.proxyHostIp}
                onChange={(e) => handleChange(e, setProviderData)}
                placeholder="Proxy Host IP"
              />
              <Input
                name="domainName"
                value={providerData.domainName}
                onChange={(e) => handleChange(e, setProviderData)}
                placeholder="Domain Name"
              />
              <Input
                name="callbackUrl"
                value={providerData.callbackUrl}
                onChange={(e) => handleChange(e, setProviderData)}
                placeholder="Callback URL"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Generate Token</h2>
              <Input
                name="value"
                value={tokenData.value}
                onChange={(e) => handleChange(e, setTokenData)}
                placeholder="Token Value"
              />
            </div>
          )}
          <div className="flex justify-between mt-6">
            {step > 0 && (
              <Button onClick={() => setStep(step - 1)} variant="outline">
                Back
              </Button>
            )}
            {step < steps.length - 1 && (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forward;
