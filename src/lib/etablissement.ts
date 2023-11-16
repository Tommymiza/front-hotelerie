import { supabase } from './db';

export const getAllEtablissement = async () => {
    try {
        const {data, error} = await supabase.from('etablissements').select(`
            *,
            etablissement_images(
                *
            )
        `);
        if(error) throw new Error(error.message);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getOneEtablissement = async (id: string) => {
    try {
        const {data, error} = await supabase.from('etablissements').select(`
            *,
            etablissement_images(
                *
            )
        `).eq('id', id).single();
        if(error) throw new Error(error.message);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getAllByLocation = async (location: string) => {
    try {
        const {data, error} = await supabase.from('etablissements').select(`
            *,
            etablissement_images(
                *
            )
        `).eq('location', location);
        if(error) throw new Error(error.message);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}