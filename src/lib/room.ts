import { supabase } from "./db";

export const getAllRoomForOne = async (id_etab: string) => {
    try {
        const {data, error} = await supabase.from('rooms').select(`
            *,
            room_images(
                *
            )
        `).eq('etablissement_id', id_etab);
        if(error) throw new Error(error.message);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getAllRoom = async () => {
    try {
        const {data, error} = await supabase.from('rooms').select(`
            *,
            etablissement_id(*),
            room_images(
                *
            )
        `).limit(8);
        if(error) throw new Error(error.message);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};
export const getRoomBookings = async (id_room: string) => {
    try {
        const {data, error} = await supabase.from('rooms').select(`
            *,
            room_bookings(
                *
            ),
            room_images(
                *
            )
        `).eq('id', id_room).single();
        if(error) throw new Error(error.message);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const addRoomBookings = async (room_id: string, client_id: string, etablissement_id: string, date_start: Date, date_end: Date, total_price: number) => {
    try {
        const {data, error} = await supabase.from('room_bookings').insert([
            {
                room_id,
                client_id,
                etablissement_id,
                date_start,
                date_end,
                total_price
            }
        ])
        .select()
        .single()
        ;
        if(error) throw new Error(error.message);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}