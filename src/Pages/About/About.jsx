import React from 'react';
import asstes from '../../assets/asstes';

const About = () => {
  return (
    <div className="text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-50 !mt-[140px] !mb-[70px]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#ff6815]">
          Reliable Partners in <span className="font-extrabold">Material Supply</span>
        </h1>
        <p className="text-lg text-gray-600 !my-[20px]">Delivering trusted solutions for electrical, electronics, plumbing, and solar projects</p>
      </section>

      {/* Image Grid */}
      <section className="!m-auto max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <img src={asstes.Aboutelectrical} alt="Electrical Supplies" className="rounded-lg shadow-md" />
        <img src={asstes.Aboutplumbing} alt="Plumbing Work" className="rounded-lg shadow-md" />
        <img src={asstes.Aboutsolar} alt="Solar Installation" className="rounded-lg shadow-md" />
      </section>

      {/* Mission & Vision */}
      <section className=" m-auto bg-gray-50 py-16 px-6 md:px-20 text-center space-y-10">
        <div className='text-center'>
          <h2 className="text-[#ff6815] text-3xl text-center font-bold mb-2 !my-[20px]">Our Mission</h2>
          <p className="text-gray-600 m-auto my-[20px] mx-auto">
            To be the most reliable trading partner by supplying high-quality materials and exceptional service for infrastructure and industrial projects across India.
          </p>
        </div>
        <div>
          <h2 className="text-[#ff6815] text-3xl font-bold mb-2">Our Vision</h2>
          <p className="text-gray-600  mx-auto m-auto">
            To lead the supply and trading industry with integrity, innovation, and dedication in providing top-tier electrical, plumbing, solar, and electronic components.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className=" bg-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-[#ff6815] text-3xl font-bold mb-10 !my-[20px]">Leadership Team</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <div className=' border-[1px] border-gray-600 my-[20px] !p-[30px] rounded-3xl'>
            <img src={asstes.profile} alt="Jagannath Kumar" className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Jagannath Kumar</h3>
            <p className="text-gray-500">Director</p>
          </div>
          <div className=' border-[1px] border-gray-600 my-[20px] !p-[30px] rounded-2xl'>
            <img src={asstes.profile} alt="Vibhishan Kumar" className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Vibhishan Kumar</h3> 
            <p className="text-gray-500">Manager</p>
          </div>
        </div>
      </section>

      {/* Stats (Optional / Replace with SSA metrics) */}
      <section className="bg-gray-100 py-16 px-6 md:px-20 m-auto">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 text-center !mx-auto !my-[20px] !py-[20px]">
          <div>
            <h3 className="text-3xl font-bold text-[#ff6815]">500+</h3>
            <p className="text-gray-600">Projects Supplied</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#ff6815]">2000+</h3>
            <p className="text-gray-600">Product SKUs</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#ff6815]">50+</h3>
            <p className="text-gray-600">Industries Served</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#ff6815]">99.9%</h3>
            <p className="text-gray-600">Client Satisfaction</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
