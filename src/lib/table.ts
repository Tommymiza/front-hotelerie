import { supabase } from "./db";

export const getAllTableForOne = async (id_etab: string) => {
  try {
    const { data, error } = await supabase
      .from("tables")
      .select(
        `
            *,
            tables_images(
                *
            )
        `
      )
      .eq("etablissement_id", id_etab);
    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllTable = async () => {
  try {
    const { data, error } = await supabase
      .from("tables")
      .select(
        `
            *,
            etablissement_id(*),
            tables_images(
                *
            )
        `
      )
    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getTableBookings = async (id_table: string) => {
  try {
    const { data, error } = await supabase
      .from("tables")
      .select(
        `
            *,
            table_bookings(
                *
            ),
            tables_images(
                *
            )
        `
      )
      .eq("id", id_table)
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addTableBooking = async (
  table_id: string,
  client_id: string,
  etablissement_id: string,
  date: Date,
  hours: string,
  total_price: number
) => {
  try {
    const { data, error } = await supabase.from("table_bookings").insert([
      {
        table_id,
        client_id,
        etablissement_id,
        date,
        hours,
        total_price,
      },
    ]).select().single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
