import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Footer as FooterType } from '@/lib/types';

interface FooterProps {
  footer: FooterType;
}

export default function Footer({ footer }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1: Titre et description */}
          <div className="lg:col-span-2">
            <h3 
              className="text-2xl font-bold mb-4"
              {...footer.$?.title}
            >
              {footer.title}
            </h3>
            <p 
              className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md"
              {...footer.$?.site_description}
            >
              {footer.site_description}
            </p>
            
            {/* Liens sociaux */}
            {footer.social_links && footer.social_links.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3">Suivez-nous</h4>
                <div className="flex space-x-4">
                  {footer.social_links.map((social, index) => (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-200"
                      {...social.$?.url}
                    >
                      {social.icon ? (
                        <div className="relative w-5 h-5">
                          <Image
                            src={social.icon.url}
                            alt="Social Icon"
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-gray-600 rounded"></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Colonne 2: Navigation rapide */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <nav>
              <ul className="space-y-2">
                {footer.links?.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.nav_item_url}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                      {...link.$?.nav_item_title}
                    >
                      {link.nav_item_title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Colonne 3: Informations supplémentaires */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>Email: contact@example.com</p>
              <p>Téléphone: +33 1 23 45 67 89</p>
              <p>Adresse: 123 Rue Example, Paris, France</p>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {footer.title}. Tous droits réservés.
            </div>
            <div className="flex space-x-6">
              <Link 
                href="/privacy-policy" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Politique de confidentialité
              </Link>
              <Link 
                href="/terms-of-service" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}