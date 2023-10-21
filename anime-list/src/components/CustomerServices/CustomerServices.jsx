import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Header from "../Header/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

const CustomerServices = () => {
  const openaiSecretKey = import.meta.env.VITE_OPENAI_KEY;

  const configuration = new Configuration({
    apiKey: openaiSecretKey,
  });

  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
      setShowResult(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center">
      <Header />
      <div className="container mx-auto px-4 flex items-center justify-center h-screen">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center mb-4">
            <img src={logo} alt="Vilume" className="w-16 h-16 mx-auto mb-2" />
            <h1 className="text-2xl font-semibold mb-4">Customer Services Bot</h1>
          </div>
          <textarea
            className="w-full h-32 p-2 border rounded mb-4"
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
            onClick={handleClick}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faPlayCircle} />
            )}
            Start Chat
          </button>
          {showResult && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Bot Response:</h2>
              <div className="bg-gray-200 p-4 rounded">{result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerServices;
