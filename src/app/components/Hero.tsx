// components/sections/HeroSection.tsx
"use client"
import { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import Image from 'next/image';

export default function HeroSection() {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Coding', 'Web Development', 'Software Engineering', 'Data Science', 'Machine Learning'],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
            <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
                <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
                    A <span className="font-semibold">free repository</span> for community <br className="hidden lg:block" /> 
                    components using <span className="font-semibold underline decoration-primary"><span ref={el} /></span>
                </h1>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                    Open source Tailwind UI components and templates to <br className="hidden lg:block" /> 
                    bootstrap your new apps, projects or landing sites!
                </p>
            </div>
            <div className="w-full mt-4 lg:mt-0 lg:w-1/2 relative h-[300px] lg:h-[400px]">
                <Image 
                    src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
                    alt="Website Designer"
                    fill
                    className="object-contain"
                />
            </div>
        </section>
    );
}




