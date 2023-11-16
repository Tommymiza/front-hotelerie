"use client";
import { SendRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useRef<HTMLFormElement | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.current) {
        await axios.post("/api/send-email", {
          nom: form.current.nom.value,
          email: form.current.email.value,
          message: form.current.message.value,
        });
        form.current.reset();
      }
      toast.success("Message envoyé avec succès !", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de l'envoi du message !", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <Container>
        <div
          style={{
            marginTop: "100px",
            minHeight: "250px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <form
            onSubmit={handleSubmit}
            ref={form}
            className="bg-white lg:p-10 md:p-10 p-4 flex flex-col items-center gap-2"
            style={{borderRadius: 20}}
          >
            <h1 className="text-[20px] self-start font-bold">
              Contactez-nous :
            </h1>
            <TextField
              label="Nom: "
              name="nom"
              sx={{ width: "100%" }}
              required
            />
            <TextField
              label="Email: "
              name="email"
              type="email"
              sx={{ width: "100%" }}
              required
            />
            <TextField
              label="Message: "
              sx={{ width: "100%" }}
              inputProps={{ style: { height: 100 } }}
              multiline
              required
              name="message"
            />
            <LoadingButton
              type="submit"
              startIcon={<SendRounded />}
              sx={{ padding: 2 }}
              loading={loading}
            >
              Envoyer
            </LoadingButton>
          </form>
        </div>
      </Container>
    </section>
  );
}
