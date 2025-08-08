import React from "react";
import asstes from "../../assets/asstes";
import {Link} from 'react-router-dom'

function SuccessPage() {
  return (
    <div className="SuccessPage  flex  max-w-[400px] sm:w-[320px] h-[100vh] !m-auto !justify-center !items-center">
      <div className="success-wrapper flex content-center flex-col">
        <video
          className="h-[120px] w-auto "
          src={asstes.successVideo}
          autoPlay
          muted
          loop
        ></video>
        <h2 className="text-[28px] text-green-600 my-20px text-center ">
         Thank you for reaching out. We’ll be in touch with you soon.
        </h2>
        <div className="button-wrapper flex gap-[20px] justify-around !my-[20px]">
         <Link to='/'> <button className="shadow-2xl shadow-amber-100 bg-green-900 text-white font-bold text-[16px] rounded-[4px] cursor-pointer !px-2.5 h-[35px]">Continue Shoping</button></Link>
        
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
