import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Header from "../Header/Header";
import SendIcon from '@mui/icons-material/Send';
import about from '../../assets/about.png';

const CustomerServices = () => {
  const openaiSecretKey = import.meta.env.VITE_OPENAI_KEY;

  const configuration = new Configuration({
    apiKey: openaiSecretKey,
  });

  const openai = new OpenAIApi(configuration);

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage) {
      setLoading(true);
      setShowLoading(true);

      const newMessages = [...messages, { text: inputMessage, isUser: true }];
      setMessages(newMessages);
      setInputMessage('');

      try {
        const response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: 'Selamat datang di Vilume, tempat di mana dunia animasi hidup dan kisah-kisah menakjubkan menghadirkan hiburan tak terbatas. Vilume adalah portal eksklusif bagi para pencinta anime yang mencari petualangan, keajaiban, dan kegembiraan dalam setiap episode.Di Vilume, kami mengundang Anda untuk menjelajahi koleksi anime yang luar biasa, dari klasik yang tak terlupakan hingga judul terbaru yang sedang booming. Temukan karakter-karakter yang akan Anda cintai, kisah-kisah yang akan menginspirasi, dan komunitas yang akan Anda banggakan.Mari bergabung dengan ribuan penggemar anime lainnya dan temukan keindahan dalam setiap frame. Vilume adalah rumah bagi semua yang berani bermimpi. Mari mulai petualangan anime Anda bersama kami!' + inputMessage,
          temperature: 0.5,
          max_tokens: 250,
        });

        const botReply = response.data.choices[0].text;
        const newBotMessage = { text: botReply, isUser: false };
        setMessages([...newMessages, newBotMessage]);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
      setShowLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 p-4 bg-gray-300">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.isUser
                ? 'text-right text-white'
                : 'text-left text-gray-600'
            }`}
          >
            <div className={`rounded-lg p-2 inline-block shadow-md max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${message.isUser ? 'float-right bg-gray-700' : 'bg-white mt-6'}`}>
              {message.text}
            </div>
          </div>
        ))}
        {showLoading && (
          <div className="text-center text-gray-600">
            Loading...
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-950 flex flex-row justify-between items-center">
        <div className="w-12 h-12 my-2">
          <img src={about} alt="eventify" className="max-w-full h-auto" />
        </div>
        <div className="flex items-center justify-center space-x-2 my-2">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputMessageChange}
            className="flex-1 border border-black rounded-full p-2"
            placeholder="Sok nanya..."
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className={`bg-blue-500 text-white rounded-full px-2 py-2 ${
              loading ? 'cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerServices;
