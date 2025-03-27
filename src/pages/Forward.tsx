import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  useCreateApplications,
  useDeleteApplications,
} from "../hooks/useApplicationQueries";
import { useCreateProviders } from "../hooks/useProviderQueries";
import {
  useCreateToken,
  useGetTokens,
  useDeleteToken,
} from "../hooks/useTokenQueries";
import Textarea from "../components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";

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
  const [createdTokenId, setCreatedTokenId] = useState("");

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
  const deleteApplication = useDeleteApplications();
  const createProvider = useCreateProviders();
  const createToken = useCreateToken();
  const deleteToken = useDeleteToken();
  const { data: tokens, isLoading: tokensLoading } = useGetTokens();
  const navigate = useNavigate();

  const handleNext = async () => {
    try {
      if (step === 0) {
        let tokenIdToUse;
        if (showTokenForm) {
          const tokenResponse = await createToken.mutateAsync({
            ...tokenData,
            applicationId: "",
          });
          tokenIdToUse = tokenResponse.id;
          setCreatedTokenId(tokenResponse.id);
          setShowTokenForm(false);
        } else tokenIdToUse = selectedTokenId;

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

  const handleBack = async () => {
    if (step === 1) {
      try {
        if (applicationId) {
          await deleteApplication.mutateAsync(applicationId);
          setApplicationId("");
        }
        if (createdTokenId) {
          await deleteToken.mutateAsync(createdTokenId);
          setCreatedTokenId("");
        }
        setSelectedTokenId("");
        setShowTokenForm(false);
        setTokenData({
          id: "",
          body: {},
          encryptToken: "",
          expiredDuration: 0,
          applicationId: "",
        });
        setBodyInput(JSON.stringify({}));
        setStep(0);
      } catch (error) {
        console.error("Error during back operation:", error);
      }
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
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background p-6 rounded-md">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 border rounded-lg shadow-md flex">
        <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 p-6">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`p-4 mb-3 rounded-lg transition-all duration-300 flex items-center ${
                index === step
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="w-8 h-8 flex  text-gray-600 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 mr-3">
                {index + 1}
              </span>
              {label}
            </div>
          ))}
        </div>

        <div className="w-3/4 p-6">
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Create Application
              </h2>
              <Input
                name="name"
                value={applicationData.name}
                onChange={(e) => handleChange(e, setApplicationData)}
                placeholder="Application Name"
                className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              />
              {tokensLoading ? (
                <p className="text-gray-500 dark:text-gray-400">
                  Loading tokens...
                </p>
              ) : (
                <select
                  name="tokenId"
                  value={selectedTokenId}
                  onChange={handleTokenSelect}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
                <div className="space-y-4 mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Create New Token
                  </h3>
                  <Textarea
                    name="body"
                    value={bodyInput}
                    onChange={(e) => handleChange(e, setTokenData)}
                    placeholder='Body (JSON format, e.g. {"key": "value"})'
                    className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                  />
                  <Input
                    name="encryptToken"
                    value={tokenData.encryptToken}
                    onChange={(e) => handleChange(e, setTokenData)}
                    placeholder="Token Encrypt"
                    className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                  />
                  <Input
                    type="number"
                    name="expiredDuration"
                    value={tokenData.expiredDuration}
                    onChange={(e) => handleChange(e, setTokenData)}
                    placeholder="Token Expired Duration"
                    className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                  />
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Add Provider
              </h2>
              <Input
                name="name"
                value={providerData.name}
                onChange={(e) => handleChange(e, setProviderData)}
                placeholder="Provider Name"
                className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              />
              <select
                name="type"
                value={providerData.type}
                onChange={(e) => handleChange(e, setProviderData)}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              />
              <Input
                name="proxyHostIp"
                value={providerData.proxyHostIp}
                onChange={(e) => handleChange(e, setProviderData)}
                placeholder="Proxy Host IP"
                className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              />
              <Input
                name="domainName"
                value={providerData.domainName}
                onChange={(e) => handleChange(e, setProviderData)}
                placeholder="Domain Name"
                className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              />
              <Input
                name="callbackUrl"
                value={providerData.callbackUrl}
                onChange={(e) => handleChange(e, setProviderData)}
                placeholder="Callback URL"
                className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              />
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 0 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {step === 0 && (
              <Button
                onClick={handleNext}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {step === 1 && (
              <Button
                onClick={handleNext}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Submit
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forward;
