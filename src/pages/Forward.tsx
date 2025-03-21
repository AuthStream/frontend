import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useCreateApplications } from "../hooks/useApplicationQueries";
import { useCreateProviders } from "../hooks/useProviderQueries";
import { useCreateToken, useGetTokens } from "../hooks/useTokenQueries";
import Textarea from "../components/ui/textarea";
import { useNavigate } from "react-router-dom";

const steps = ["Application", "Provider"];
const providerTypes = [
  { id: "SAML", name: "SAML" },
  { id: "FORWARD", name: "FORWARD" },
];

const Forward = () => {
  const [step, setStep] = useState(0);
  const [applicationId, setApplicationId] = useState("");
  const [selectedTokenId, setSelectedTokenId] = useState("");
  const [showTokenForm, setShowTokenForm] = useState(false);

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

  const [tokenData, setTokenData] = useState({
    id: "",
    body: {},
    encryptToken: "",
    expiredDuration: 0,
    applicationId: "",
  });

  const [bodyInput, setBodyInput] = useState<string>(
    JSON.stringify(tokenData.body, null, 2)
  );

  const createApplication = useCreateApplications();
  const createProvider = useCreateProviders();
  const createToken = useCreateToken();
  const { data: tokens, isLoading: tokensLoading } = useGetTokens();
  const navigate = useNavigate();

  const handleNext = async () => {
    try {
      if (step === 0) {
        let tokenIdToUse = selectedTokenId;

        if (
          !tokenIdToUse &&
          (!tokens || tokens.length === 0 || showTokenForm)
        ) {
          const tokenResponse = await createToken.mutateAsync({
            ...tokenData,
            applicationId: "",
          });
          tokenIdToUse = tokenResponse.id;
          setShowTokenForm(false);
          setSelectedTokenId(tokenIdToUse);
        }

        if (!tokenIdToUse) throw new Error("Please select or create a token");

        const response = await createApplication.mutateAsync({
          ...applicationData,
          tokenId: tokenIdToUse,
          adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        });
        setApplicationId(response.id);
        setApplicationData((prev) => ({ ...prev, id: response.id }));
        setStep(1);
      } else if (step === 1) {
        if (!applicationId) throw new Error("Application ID is missing.");
        await createProvider.mutateAsync({
          ...providerData,
          applicationId: applicationId,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error during step transition:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    setData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const { name, value } = e.target;
    if (name === "body") {
      setBodyInput(value);
      try {
        const parsedBody = JSON.parse(value);
        setTokenData((prev) => ({
          ...prev,
          [name]: parsedBody,
        }));
      } catch (error) {
        console.error("Invalid JSON in body:", error);
      }
    } else {
      setData((prev: any) => ({
        ...prev,
        [name]: name === "expiredDuration" ? Number(value) : value,
      }));
    }
  };

  const handleTokenSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "create") {
      setShowTokenForm(true);
      setSelectedTokenId("");
    } else {
      setShowTokenForm(false);
      setSelectedTokenId(value);
    }
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
              {tokensLoading ? (
                <p>Loading tokens...</p>
              ) : (
                <select
                  name="tokenId"
                  value={selectedTokenId}
                  onChange={handleTokenSelect}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
                >
                  <option value="">Select a Token</option>
                  <option value="create">Create New Token</option>
                  {tokens?.map((token: any) => (
                    <option key={token.id} value={token.id}>
                      {token.id}
                    </option>
                  ))}
                </select>
              )}
              {showTokenForm && (
                <div className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold">Create New Token</h3>
                  <Textarea
                    name="body"
                    value={bodyInput}
                    onChange={(e) => handleChange(e, setTokenData)}
                    placeholder='Body (JSON format, e.g. {"key": "value"})'
                  />
                  <Input
                    name="encryptToken"
                    value={tokenData.encryptToken}
                    onChange={(e) => handleChange(e, setTokenData)}
                    placeholder="Token Encrypt"
                  />
                  <Input
                    type="number"
                    name="expiredDuration"
                    value={tokenData.expiredDuration}
                    onChange={(e) => handleChange(e, setTokenData)}
                    placeholder="Token Expired Duration"
                  />
                </div>
              )}
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

          <div className="flex justify-between mt-6">
            {step > 0 && (
              <Button onClick={() => setStep(step - 1)} variant="outline">
                Back
              </Button>
            )}
            {step === 0 && <Button onClick={handleNext}>Next</Button>}
            {step === 1 && <Button onClick={handleNext}>Submit</Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forward;
