"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from './theme-btn'
import LoadingBar from 'react-top-loading-bar'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const [progress, setProgress] = useState(0)
    const pathname = usePathname()
    
    // Optimized loading bar logic
    useEffect(() => {
        setProgress(20)
        const timer1 = setTimeout(() => setProgress(40), 100)
        const timer2 = setTimeout(() => setProgress(100), 400)
        
        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [pathname])

    // Navigation links configuration - easier to maintain
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ]

    return (
        <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
            <LoadingBar
                color='#933ce6'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"}>
                    <div className="text-lg font-bold">
                    BLOGGER
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4 items-center">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href}
                            className={`hover:scale-105 hover:font-semibold transition-transform duration-300
                                ${pathname === link.href ? 'font-bold text-primary' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className='flex items-center gap-2'>
                        <Button variant="outline">Login</Button>
                        <Button variant="default">Signup</Button>
                        <ModeToggle />
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center">
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger className="ml-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="font-bold my-4">BLOGGER</SheetTitle>
                                <SheetDescription>
                                    <div className="flex flex-col gap-6">
                                        {navLinks.map((link) => (
                                            <Link 
                                                key={link.href}
                                                href={link.href}
                                                className={pathname === link.href ? 'font-bold text-primary' : ''}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">Login</Button>
                                            <Button variant="default" size="sm">Signup</Button>
                                        </div>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
