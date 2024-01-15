'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getRooms } from '@/libs/apis';
import useSWR from 'swr';
import Search from '@/components/Search/Search';
import { Room } from '@/modules/room';
import RoomCard from '@/components/RoomCard/RoomCard';


const Rooms = () => {
    const [roomTypeFilter, setRoomTypeFilter] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const searchParams = useSearchParams();



    useEffect(() => {
        const searchQuery = searchParams.get('searchQuery');
        const roomType = searchParams.get('roomType');

        if (roomType) setRoomTypeFilter(roomType);
        if (searchQuery) setSearchQuery(searchQuery);
    }, []);

    async function fetchData() {
        return getRooms();
    }

    const { data, error, isLoading } = useSWR('get/hotelRooms', fetchData);


    if (error) throw new Error('Cannot fetch data');
    if (typeof data === 'undefined' && !isLoading)
        throw new Error('Cannot fetch data');


    

    const filterRooms = (rooms: Room[]) => {
        return rooms.filter((room) => {
            if (
                roomTypeFilter &&
                roomTypeFilter.toLowerCase() !== 'all' &&
                room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
            ) {
                return false;
            }

            if (
                searchQuery &&
                !room.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                return false;
            }

            return true;
        })

    }

    const filteredRooms = filterRooms(data || []);

    return (
        <div className='container mx-auto pt-10'>
            <Search
                roomTypeFilter={roomTypeFilter}
                searchQuery={searchQuery}
                setRoomTypeFilter={setRoomTypeFilter}
                setSearchQuery={setSearchQuery}
            />

            <div className='flex mt-20 justify-between flex-wrap'>
                {filteredRooms.map(room => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>
        </div>
    )
}

export default Rooms