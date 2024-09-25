import React from "react";
import Image from "next/image";
import ProductSuggestions from "../components/ProductSuggestions";
import { Urbanist } from "next/font/google";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhoChooseUs";
import { useInView } from "react-intersection-observer";
import Newsletter from "@/components/Newsletter";

const urbanist = Urbanist({ subsets: ["latin"] });

const Home = (): JSX.Element => {
  const router = useRouter();

  // Create separate refs and controls for each section
  const [productRef, productInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [whyChooseUsRef, whyChooseUsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [testimonialRef, testimonialInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [newsletterRef, newsletterInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const productControls = useAnimation();
  const whyChooseUsControls = useAnimation();
  const testimonialControls = useAnimation();
  const newsletterControls = useAnimation();

  React.useEffect(() => {
    if (productInView) {
      productControls.start("visible");
    }
    if (whyChooseUsInView) {
      whyChooseUsControls.start("visible");
    }
    if (testimonialInView) {
      testimonialControls.start("visible");
    }
    if (newsletterInView) {
      newsletterControls.start("visible");
    }
  }, [
    productControls,
    whyChooseUsControls,
    testimonialControls,
    newsletterControls,
    productInView,
    whyChooseUsInView,
    testimonialInView,
    newsletterInView,
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      className={`${urbanist.className} bg-white flex flex-col min-h-screen`}
    >
      <main>
        {/* Full-width Hero Section */}
        <div className="relative w-full min-h-[700px] lg:min-h-[900px] mb-16">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/pethavenbg.png"
              alt="Background"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
              className="z-0 w-full h-full"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-16 h-full flex items-center">
            <div className="flex items-center justify-between gap-24">
              <motion.div
                className="flex flex-col space-y-4 lg:w-1/2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-[60px] font-extrabold text-[#07090D] leading-tight"
                >
                  Everything Your Pet Needs, All in One Place
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-[#333]"
                >
                  Explore our wide range of pet supplies, from daily essentials
                  to specialized care, all designed to give your pet the love
                  and attention they deserve.
                </motion.p>
                <motion.div className="flex space-x-4" variants={itemVariants}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
                    onClick={() => router.push("/products")}
                  >
                    Shop Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-yellow-300 transition flex items-center space-x-2 shadow-md"
                  >
                    <span>Learn More</span>
                  </motion.button>
                </motion.div>
              </motion.div>
              {/* Foreground Image */}
              <motion.div
                className="relative z-10 hidden lg:block lg:w-1/2"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/dogblob.png"
                  alt="Dog with Blob"
                  width={500}
                  height={500}
                  quality={100}
                  className="ml-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-16 mb-16">
            <motion.div
              ref={productRef}
              initial="hidden"
              animate={productControls}
              variants={scrollVariants}
              className="bg-white rounded-lg"
            >
              <ProductSuggestions />
            </motion.div>
            <motion.div
              ref={whyChooseUsRef}
              initial="hidden"
              animate={whyChooseUsControls}
              variants={scrollVariants}
              className="bg-white rounded-lg"
            >
              <WhyChooseUs />
            </motion.div>
            <motion.div
              ref={testimonialRef}
              initial="hidden"
              animate={testimonialControls}
              variants={scrollVariants}
              className="bg-white rounded-lg"
            >
              <Testimonials />
            </motion.div>
            <motion.div
              ref={newsletterRef}
              initial="hidden"
              animate={newsletterControls}
              variants={scrollVariants}
              className="bg-white rounded-lg"
            >
              <Newsletter />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
