import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const StatItem = ({ end, label }: { end: number | string; label: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <h3 className="text-6xl font-bold">
        {inView ? <CountUp end={Number(end)} duration={2.5} /> : "0"}
        {typeof end === "string" && end.includes("+") && "+"}
      </h3>
      <p>{label}</p>
    </div>
  );
};

const AboutUs = () => {
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="bg-[#E5F5FF]">
      {/* Our Story / About Pet Haven */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-24"
      >
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          {/* Story Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/images/doghug.jpg"
              alt="Cute dog at Pet Haven"
              className="rounded-lg shadow-lg object-cover w-full h-[400px]"
            />
          </div>

          {/* Story Content */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-5xl font-extrabold mb-8">About Pet Haven</h1>
            <p className="text-gray-700 text-lg mb-6">
              Welcome to Pet Haven! We're a team of passionate pet lovers
              dedicated to making your life with your furry companions as joyful
              and stress-free as possible.
            </p>
            <p className="text-gray-700 text-lg">
              Whether you're looking for top-notch pet supplies, expert advice,
              or just a community that cares, you've come to the right place!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Our Mission */}
      <motion.div
        ref={missionRef}
        initial={{ opacity: 0, y: 20 }}
        animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white py-24"
      >
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg max-w-5xl mx-auto">
              At Pet Haven, we strive to create a world where every pet is
              treated like family. Our mission is simple: to provide the best
              products, services, and advice to help pet owners care for their
              pets with love and confidence.
            </p>
          </div>

          {/* Mission Image */}
          <div className="flex justify-center mt-12">
            <img
              src="/images/doggroup.jpg"
              alt="Pets at Pet Haven"
              className="rounded-lg shadow-lg object-cover w-full md:w-3/4 h-80"
            />
          </div>
        </div>
      </motion.div>

      {/* Fun Pet Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-500 to-indigo-700 py-16 text-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center font-bold mb-12">
            Fun Pet Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <StatItem end={5000} label="Happy Pets Served" />
            <StatItem end={1200} label="Pet Products Sold" />
            <StatItem end={24} label="Hours of Support Daily" />
            <StatItem end={10} label="Years in Business" />
          </div>
        </div>
      </motion.div>

      {/* Meet the Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-24 bg-gradient-to-br bg-[#E5F5FF]"
      >
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl text-center font-bold text-blue-600 mb-16"
          >
            Meet Our Pawsome Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105"
            >
              <div className="relative mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/40.jpg"
                  alt="Sarah Smith"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-400"
                />
                <div className="absolute bottom-0 right-1/3 bg-yellow-400 rounded-full p-2">
                  <i className="fas fa-paw text-white"></i>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Sarah Smith
              </h3>
              <p className="text-blue-600 font-medium mb-4">
                Founder & Pet Expert
              </p>
              <p className="text-gray-700">
                With over 15 years of experience, Sarah's love for pets drives
                the heart of Pet Haven.
              </p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105"
            >
              <div className="relative mb-6">
                <img
                  src="https://randomuser.me/api/portraits/men/22.jpg"
                  alt="John Speiser"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-400"
                />
                <div className="absolute bottom-0 right-1/3 bg-green-400 rounded-full p-2">
                  <i className="fas fa-cog text-white"></i>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                John Speiser
              </h3>
              <p className="text-green-600 font-medium mb-4">
                Operations Manager
              </p>
              <p className="text-gray-700">
                John ensures everything runs smoothly, from operations to
                customer support.
              </p>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105"
            >
              <div className="relative mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/8.jpg"
                  alt="Emily Johnson"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-400"
                />
                <div className="absolute bottom-0 right-1/3 bg-purple-400 rounded-full p-2">
                  <i className="fas fa-apple-alt text-white"></i>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Emily Johnson
              </h3>
              <p className="text-purple-600 font-medium mb-4">
                Pet Nutritionist
              </p>
              <p className="text-gray-700">
                Emily ensures your pet gets the best nutrition, carefully
                selecting the healthiest options.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
