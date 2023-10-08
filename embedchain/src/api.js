export const baseUrl = "http://127.0.0.1:8000/embedchain/";

export const handleFetch = async (url, options) => {
  const response = await fetch(url, options);
  return response;
};

// const fetchOpenAIKey = async (options) => {

//     const path = baseUrl + "key/";
//     return handleFetch(path, options);
// };

// const authenticateKey = async (options) => {

//     const path = baseUrl + "authenticateKey/";
//     return handleFetch(path, options);
// };
