import { useState,useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Header from "../Header/Header";
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';

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
  const [showPopup, setShowPopup] = useState(false);

  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  useEffect(() => {
    if (!showPopup) {
      Swal.fire({
        title: 'Ketentuan Penggunaan Customer Services',
        text: 'Guanakan bahasa yang sopan dan jangan bertanya diluar topik/tema dari website ini!',
        icon: 'info',
        confirmButtonText: 'Saya Mengerti',
        allowOutsideClick: false,
      }).then(() => {
        setShowPopup(true);
      });
    }
  }, [showPopup]);

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
          prompt: 'kamu adalah sebuah fitur untuk customer services,kamu di perbolehkan menjawab pertanyaan-pertanyaan umum seputar anime dan website vilume dimana website vilume sendiri adalah  rumah bagi para pencinta anime! Kami adalah pusat anime yang menghadirkan hiburan berkualitas tinggi bagi penggemar anime dari segala usia. Dengan koleksi anime yang beragam dan ulasan terbaru, kami siap memenuhi kecintaan Anda terhadap dunia anime.Jikalau user memberikan pertanyaan diluar konteks anime atau website ini tolong jawab tidak bisa karena ini adalah layanan customer services untuk vilume' + inputMessage,
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
      <div className="flex-1 p-4">
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
      <div className="p-4 bg-gray-950">
        <div className="w-full flex space-x-2 my-2">
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
