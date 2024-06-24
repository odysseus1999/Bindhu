import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-4 flex flex-col md:flex-row justify-between items-center relative">
      <div className="flex flex-col items-start">
        {/* <Image src="/footer_image.png" alt="Blog Logo" className="mb-2" width="400" height="118" /> */}
      </div>
      <div className="flex flex-col gap-14 md:flex-row">
        <div className="flex flex-col">
          <h3 className="text-lg mb-2">Socials</h3>
          <div className="flex items-center mb-2">
            <FaEnvelope className="mr-2" />
            <a href="mailto:manchalasreekanth999@gmail.com" className="underline">Email</a>
          </div>
          <div className="flex items-center mb-2">
            <FaGithub className="mr-2" />
            <a href="\" className="underline">GitHub</a>
          </div>
          <div className="flex items-center mb-2">
            <FaLinkedin className="mr-2" />
            <a href="\" className="underline">LinkedIn</a>
          </div>
          <div className="flex items-center">
            <FaSquareXTwitter className="mr-2" />
            <a href="\" className="underline">Twitter</a>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg mb-2">About</h3>
          <a href="\" className="underline mb-2">Contact</a>
          <a href="\" className="underline mb-2">About Us</a>
          <a href="\" className="underline mb-2">Other Projects</a>
          <a href="\" className="underline mb-2">Past Experience</a>
        </div>
      </div>
      <div className="text-gray-500 md:absolute bottom-0 left-1/2 md:transform md:-translate-x-1/2">
        &copy; {currentYear} Manchala Sreekanth
      </div>
    </footer>
  );
};

export default Footer;
