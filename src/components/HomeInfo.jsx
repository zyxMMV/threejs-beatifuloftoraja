import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, Selamat
        
        Datang
        <br />
        Di Website Beatiful Of Toraja
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
        Nikmati perjalanan virtual ke Tanah Toraja, Eksplorasi keindahan adat Toraja, warisan budaya Nusantara."
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Jelajahi Sekarang!
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

 

  return null;
};

export default HomeInfo;