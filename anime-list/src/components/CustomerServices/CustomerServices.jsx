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
        prompt: 'Selamat datang di Vilume, tempat di mana dunia animasi hidup dan kisah-kisah menakjubkan menghadirkan hiburan tak terbatas. Vilume adalah portal eksklusif bagi para pencinta anime yang mencari petualangan, keajaiban, dan kegembiraan dalam setiap episode.Di Vilume, kami mengundang Anda untuk menjelajahi koleksi anime yang luar biasa, dari klasik yang tak terlupakan hingga judul terbaru yang sedang booming. Temukan karakter-karakter yang akan Anda cintai, kisah-kisah yang akan menginspirasi, dan komunitas yang akan Anda banggakan.Mari bergabung dengan ribuan penggemar anime lainnya dan temukan keindahan dalam setiap frame. Vilume adalah rumah bagi semua yang berani bermimpi. Mari mulai petualangan anime Anda bersama kami!' + prompt,
        temperature: 0.5,
        max_tokens: 250,
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
      <div className="container mx-auto px-4 flex mt-10 items-center justify-center min-h-screen">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center mb-4">
            <img src={logo} alt="Vilume" className="w-16 h-16 mx-auto mb-2" />
            <h1 className="text-2xl font-semibold mb-4">Sok tanya atuh</h1>
          </div>
          <textarea
            className="w-full h-32 p-2 border rounded mb-4"
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded flex items-center justify-center py-2 px-4 hover:bg-blue-600 mx-auto"
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
              <h2 className="text-lg font-semibold mb-2">Jawaban :</h2>
              <div className="bg-gray-200 p-4 rounded">{result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerServices;
