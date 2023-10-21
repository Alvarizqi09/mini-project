import Header from "../Header/Header";
import "./LandingPage.css";
import { TypeAnimation } from 'react-type-animation';
import logo from '../../assets/logo.png';
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom';

const LandingPage = () => {

  return (
    <div>
      <header>
        <Header />
        <section className="isi w-full h-screen flex flex-col items-center justify-center text-center font-semibold">
          <div className="text-5xl font-semibold items-center justify-center">
            <TypeAnimation
                sequence={[
                    'V',
                    1000,
                    'V I',
                    1000,
                    'V I L',
                    1000,
                    'V I L U',
                    1000,
                    'V I L U M',
                    1000,
                    'V I L U M E',
                    1000
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '2em', display: 'inline-block' }}
                className="text-white"
                repeat={Infinity}
            />
          </div>
          <div className="mt-4 items-center justify-center">
            <Link to="/listanime" className="p-3 w-[150px] rounded-full text-decoration-none text-white bg-sky-300 hover:bg-gray-800 hover:text-white">
              Lets GO!
            </Link>
          </div>
        </section>
      </header>
      <section className="flex p-8 items-center bg-gray-100 mb-10 justify-center">
        <div className="w-1/2 pr-4 items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-700">
                Selamat datang di Vilume, rumah bagi para pencinta anime! Kami adalah pusat anime yang menghadirkan hiburan berkualitas tinggi bagi penggemar anime dari segala usia. Dengan koleksi anime yang beragam dan ulasan terbaru, kami siap memenuhi kecintaan Anda terhadap dunia anime.
            Di Vilume, kami berkomitmen untuk mempersembahkan pengalaman terbaik bagi Anda. Temukan anime favorit Anda, jelajahi judul-judul baru, dan nikmati konten berinformasi yang kami sajikan. Bersama-sama, kita akan mengejar petualangan anime yang tak terlupakan!
            Bergabunglah dengan komunitas kami dan temukan keindahan anime bersama Vilume.
          </p>
        </div>
        <div className="w-1/2 ml-20">
          <img
          src={logo}
          alt="logo"
          className="rounded-lg shadow-md"
          />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default LandingPage;
