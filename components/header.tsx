'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header as HeaderType } from "@/lib/types";

interface HeaderProps {
  header: HeaderType;
}

export default function Header({ header }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.log("header : ",header.navigation)
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            {header.logo && (
              <div className="relative w-16 h-13 rounded-full overflow-hidden">
                <Image
                    src={header.logo.url}
                    alt="Logo"
                    fill
                    className="object-cover rounded-full"
                    priority
                />
              </div>

            )}
            <h1 
              className="text-2xl font-bold text-gray-800"
              {...header.$?.title}
            >
              {header.title}
            </h1>
          </div>

          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              {header.navigation?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.nav_item_url.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                    {...item.$?.nav_item_title}
                  >
                    {item.nav_item_title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                }`}
              ></span>
              <span
                className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                }`}
              ></span>
            </div>
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="pb-4">
            <ul className="flex flex-col space-y-2">
              {header.navigation?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.nav_item_url}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                    {...item.$?.nav_item_title}
                  >
                    {item.nav_item_title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}