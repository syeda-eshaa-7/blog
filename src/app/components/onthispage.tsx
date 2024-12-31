'use client'

import React, { useEffect, useState } from 'react';

// Define the type for a heading
interface Heading {
  text: string;
  id: string;
}

interface OnThisPageProps {
  htmlContent: string; // Define the type for htmlContent prop
}

const OnThisPage: React.FC<OnThisPageProps> = ({ htmlContent }) => {
  const [headings, setHeadings] = useState<Heading[]>([]); // Define the state type as an array of Heading objects

  useEffect(() => {
    // Ensure that htmlContent is a valid string before parsing
    if (htmlContent) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;

      // Query for h2 elements in the parsed HTML
      const h2Elements = tempDiv.querySelectorAll('h2');
      const h2Data = Array.from(h2Elements).map(h2 => ({
        text: h2.textContent || '', // Add fallback for textContent
        id: h2.id
      }));

      // Set the headings state if any are found
      if (h2Data.length > 0) {
        setHeadings(h2Data);
      }
    }
  }, [htmlContent]);

  return (
    <div className="on-this-page absolute top-24 md:right-48 lg:right-1/4 hidden lg:block">
      <h2 className='text-md font-bold my-2'>On This Page</h2>
      <ul className='text-sm space-y-1'>
        {headings.length > 0 ? (
          headings.map((heading, index) => (
            <li key={index}>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))
        ) : (
          <li>No headings found</li> // Show message if no headings
        )}
      </ul>
    </div>
  );
};

export default OnThisPage;
