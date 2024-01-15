import Image from 'next/image';

const Gallery = () => {
    return (
        <div className='mx-auto container py-14 h-full'>
            <div className='flex flex-wrap md:-m-2'>
                <div className='flex w-1/2 flex-wrap'>
                    <div className='w-1/2 p-1 md:p-2 h-48'>
                        <Image
                            alt='gallery'
                            className='img hover:scale-105 transition-all duration-700 rounded-md'
                            src='/images/hero-1.jpeg'
                            width={200}
                            height={200}
                            quality={100}
                            priority
                        />
                    </div>
                    <div className='w-1/2 p-1 md:p-2 h-48'>
                        <img
                            alt='gallery'
                            className='img hover:scale-105 transition-all duration-700 rounded-md'
                            src='/images/hero-2.jpeg'
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className='w-full p-1 md:p-2 h-48'>
                        <img
                            alt='gallery'
                            className='img hover:scale-105 transition-all duration-700 rounded-md'
                            src='/images/room.jpg'
                            width={300}
                            height={200}


                        />
                    </div>
                </div>
                <div className='flex w-1/2 flex-wrap'>
                    <div className='w-full p-1 md:p-2 h-48'>
                        <img
                            alt='gallery'
                            className='img hover:scale-105 transition-all duration-700 rounded-md'
                            src='/images/room2.jpg'
                            width={200}
                            height={200}


                        />
                    </div>
                    <div className='w-1/2 p-1 md:p-2 h-48'>
                        <img
                            alt='gallery'
                            className='img hover:scale-105 transition-all duration-700 rounded-md'
                            src='/images/hero-2.jpeg'
                            width={200}
                            height={200}

                        />
                    </div>
                    <div className='w-1/2 p-1 md:p-2 h-48'>
                        <img
                            alt='gallery'
                            className='img hover:scale-105 transition-all duration-700 rounded-md'
                            src='/images/test.jpg'
                            width={200}
                            height={200}

                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;