'use client';

import Link from 'next/link'
import React, { useContext } from 'react'
import { FaUserCircle } from "react-icons/fa"
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"
import ThemeContext from '@/context/ThemeConetext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';


type UserData = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id?: string | null | undefined;
};

type Session = {
    user?: UserData;
};


const Header = () => {
    const { darkTheme, setDarkTheme } = useContext(ThemeContext);

    const { data: session } = useSession()

    const userId: Session | null | undefined = session;

    return (
        <header className='py-10 px-4 container flex-wrap text-xl md:flex-nowrap mx-auto flex items-center justify-between'>
            <div className='flex items-center w-full md:w-2/3'>
                <Link href={"/"} className='font-black text-[#F27405]'>
                    Hotelzz
                </Link>
                <ul className="flex items-center ml-5">
                    <li className='items-center'>
                        <Link href={"/auth"}>
                            {session?.user ? (
                                <Link href={userId ? `/users/${userId.user?.id}` : '#'}>
                                    {session.user.image ? (
                                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name!}
                                                width={40}
                                                height={40}
                                                className='scale-animation img'
                                            />
                                        </div>
                                    ) : (
                                        <FaUserCircle className='cursor-pointer' />
                                    )}
                                </Link>
                            ) : (
                                <Link href='/auth'>
                                    <FaUserCircle className='cursor-pointer' />
                                </Link>
                            )}
                        </Link>
                    </li>
                    <li className='ml-2'>
                        {darkTheme ? (
                            <MdOutlineLightMode
                                className='cursor-pointer'
                                onClick={() => {
                                    setDarkTheme(false);
                                    localStorage.removeItem('hotel-theme');
                                }}
                            />
                        ) : (
                            <MdDarkMode
                                className='cursor-pointer'
                                onClick={() => {
                                    setDarkTheme(true);
                                    localStorage.setItem('hotel-theme', 'true');
                                }}
                            />
                        )}
                    </li>
                </ul>
            </div>

            <ul className='flex items-center justify-between w-full md:w-1/3 mt-4'>
                <li className='hover:-translate-y-2 duration-500 transition-all'>
                    <Link href='/'>Home</Link>
                </li>
                <li className='hover:-translate-y-2 duration-500 transition-all'>
                    <Link href='/rooms'>Rooms</Link>
                </li>
                <li className='hover:-translate-y-2 duration-500 transition-all'>
                    <Link href='/'>Contact</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header