// Footer.js
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-20 mt-30">
        <div className="container mx-auto text-center">
          <h2 className="text-xl font-bold">About Us</h2>
          <p className="mt-2">
            We are passionate travelers and budget enthusiasts dedicated to helping you plan your dream trips. Our mission is to empower you with the tools and insights to manage your travel finances effectively, ensuring that your adventures are both memorable and financially sound. Join us as we explore the world one budget at a time!
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} TravelTally. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  