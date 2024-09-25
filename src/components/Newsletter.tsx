const Newsletter = () => {
  return (
    // Added shadow-lg and adjusted padding
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Connected with Pet Haven
          </h2>
          <p className="text-lg mb-10">
            Join our community of pet lovers! Get exclusive updates, special
            offers, and expert tips for your furry friends.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-3 w-full sm:w-2/3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {/* Adjusted button shadow for consistency */}
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300 shadow-md hover:shadow-lg">
              Subscribe Now
            </button>
          </form>
          <p className="mt-6 text-sm opacity-80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
