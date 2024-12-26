import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">
              Made by <span className="text-yellow-400 font-semibold">Elie</span> and <span className="text-yellow-400 font-semibold">Maximes</span>
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" aria-label="Facebook" className="text-gray-300 hover:text-yellow-400 transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="text-gray-300 hover:text-yellow-400 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="text-gray-300 hover:text-yellow-400 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://github.com" aria-label="GitHub" className="text-gray-300 hover:text-yellow-400 transition-colors">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
        <div className="mt-4 text-center md:text-left">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <a href="/privacy-policy" className="text-gray-300 hover:text-yellow-400 transition-colors">Politique de confidentialité</a>
            </li>
            <li>
              <a href="/terms-of-service" className="text-gray-300 hover:text-yellow-400 transition-colors">Conditions d'utilisation</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</a>
            </li>
          </ul>
        </div>
        <div className="mt-4 text-center md:text-left">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;