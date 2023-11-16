import { supabase } from "./db";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    const role = data?.user?.user_metadata?.role;
    if (role !== "client") {
      await supabase.auth.signOut();
      throw new Error("Vous n'êtes pas un client");
    }
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const signupclient = async ({
  email,
  password,
  nom,
}: {
  email: string;
  password: string;
  nom: string;
}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: nom,
          role: "client",
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};
export const signupadmin = async ({
  email,
  password,
  nom,
}: {
  email: string;
  password: string;
  nom: string;
}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: nom,
          role: "etablissement_admin",
        },
        emailRedirectTo: `https://hotelerie-admin.vercel.app/sign-in`,
      },
    });
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};
