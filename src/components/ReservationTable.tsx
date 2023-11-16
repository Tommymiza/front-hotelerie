"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { format, differenceInMinutes, differenceInDays, set } from "date-fns";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { TodayRounded } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { addTableBooking, getTableBookings } from "@/lib/table";
import { toast } from "react-toastify";
import { supabase } from "@/lib/db";
import axios from "axios";

export default function Reservation({
  id_table,
  price,
  etablissement_id,
}: {
  id_table: string;
  price: number;
  etablissement_id: string;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  let priceTotal = 0;
  const [state, setState] = useState<string[]>(["", ""]);
  const [date, setDate] = useState<Date>(new Date());
  const [id_transaction, setIdTransaction] = useState<number | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const startTime = useRef<HTMLInputElement>(null);
  const endTime = useRef<HTMLInputElement>(null);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (startTime.current && endTime.current) {
      const start = startTime.current.value;
      const end = endTime.current.value;
      if (start && end) {
        const diff: number = differenceInMinutes(
          new Date(`2021-10-10T${end}`),
          new Date(`2021-10-10T${start}`)
        );
        if (diff < 30 && diff > -30) {
          console.log("Minimum 30min");
          event.target.value = "";
          return;
        }
        if (diff < 0) {
          setState([end, start]);
          console.log(end, start);
        } else {
          setState([start, end]);
          console.log(start, end);
        }
      }
    }
  };
  const handleSubmit: any = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!checkValidity()) {
        toast.error("Quelqu'un vient de le reserver !", {
          autoClose: 3000,
        });
        return;
      }
      const tableBooking: string = JSON.stringify({
        t: id_table,
        d: date,
        hours: `${state[0]};${state[1]}`,
      });

      if (tableBooking) {
        const formdata = new FormData();
        formdata.append("idpanier", etablissement_id);
        formdata.append("total", priceTotal.toString());
        formdata.append("nom", user.id);
        formdata.append("email", user.email);
        formdata.append("reference", tableBooking);
        formdata.append(
          "ip",
          (await axios.get("https://api.ipify.org?format=json")).data.ip
        );
        formdata.append(
          "private_key",
          process.env.NEXT_PUBLIC_VANILLA_PRIVATE!
        );
        setIdTransaction(null);
        const res = await axios.post(
          "https://vanilla.unityfianar.com",
          formdata
        );
        console.log(res.data);
        setIdTransaction(res.data.id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Veuillez réessayer !", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (state[0] && state[1]) {
    const diff: number = differenceInMinutes(
      new Date(`2021-10-10T${state[1]}`),
      new Date(`2021-10-10T${state[0]}`)
    );
    priceTotal = Math.round((diff / 60) * price);
  }
  function checkValidity() {
    for (let item of bookings) {
      const date1 = new Date(item.date);
      date1.setHours(
        parseInt(item.hours.split(";")[0].split(":")[0]),
        parseInt(item.hours.split(";")[0].split(":")[1])
      );
      const date2 = new Date(item.date);
      date2.setHours(
        parseInt(item.hours.split(";")[1].split(":")[0]),
        parseInt(item.hours.split(";")[1].split(":")[1])
      );
      const currDate1 = new Date(date);
      currDate1.setHours(
        parseInt(state[0].split(":")[0]),
        parseInt(state[0].split(":")[1])
      );
      const currDate2 = new Date(date);
      currDate2.setHours(
        parseInt(state[1].split(":")[0]),
        parseInt(state[1].split(":")[1])
      );
      const isBetween1: boolean = moment(currDate1).isBetween(
        moment(date1),
        moment(date2)
      );
      const isBetween2: boolean = moment(currDate2).isBetween(
        moment(date1),
        moment(date2)
      );
      if (isBetween1 || isBetween2) {
        toast.error(
          `La plage horaire ${item.hours.replace(";", " à ")} de la date ${
            item.date
          } est déjà réservée !`,
          {
            autoClose: false,
          }
        );
        startTime.current!.value = "";
        endTime.current!.value = "";
        setState(["", ""]);
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    if (startTime.current && endTime.current) {
      if (checkValidity()) {
        startTime.current.value = state[0];
        endTime.current.value = state[1];
      }
    }
  }, [state, date]);
  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      const dataBookings = await getTableBookings(id_table);
      setBookings(
        dataBookings.table_bookings.map((d: any) => ({
          date: d.date,
          hours: d.hours,
        }))
      );
      if (error) {
        console.log(error);
        toast.error("Erreur de connexion !", {
          autoClose: 3000,
        });
        return;
      }
      if (data.session) {
        const current_user = data.session.user.user_metadata;
        setUser({
          id: data.session.user.id,
          nom: current_user.username
            ? current_user.username
            : current_user.name,
          email: data.session.user.email,
        });
      }
    }
    getSession();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <label htmlFor="date">Date</label>
        <TextField
          type="date"
          size="small"
          value={format(date, "yyyy-MM-dd")}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            if (event.target.value !== "") {
              if (
                differenceInDays(new Date(), new Date(event.target.value)) > 0
              ) {
                toast.error("Veuillez choisir une date valide !", {
                  autoClose: 3000,
                });
                setDate(new Date());
                return;
              }
              setDate(new Date(event.target.value));
            } else {
              setDate(new Date());
            }
          }}
        />
      </div>
      <div>
        <label htmlFor="time">Heure</label>
        <div className="flex gap-2 items-center">
          <TextField
            size="small"
            type="time"
            onChange={handleChange}
            inputRef={startTime}
          />
          <p>à</p>
          <TextField
            size="small"
            type="time"
            onChange={handleChange}
            inputRef={endTime}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <label htmlFor="price">Montant total</label>
        <p
          style={{
            border: "solid 3px grey",
            padding: "10px",
            borderRadius: 7,
            fontWeight: "bold",
          }}
        >
          {priceTotal} Ariary
        </p>
      </div>
      <LoadingButton
        className="chip flex gap-2 items-center"
        sx={{
          // background: "#faae61",
          padding: "10px 20px",
          fontWeight: "bold",
          fontFamily: "Nunito",
          // color: "black",
          borderRadius: 15,
        }}
        variant="contained"
        loading={loading}
        type="submit"
        startIcon={<TodayRounded />}
      >
        Valider
      </LoadingButton>

      {id_transaction && (
        <div className="flex gap-1 flex-col">
          <p>Choisir un moyen de paiement : </p>
          <div className="flex gap-2">
            <img
              src="/money/mvola.jpg"
              alt="Mvola"
              onClick={() => {
                window.open(
                  `https://moncompte.ariarynet.com/redirect?paiement=${id_transaction}&mvola=true`,
                  "_blank"
                );
              }}
              style={{ width: 60, height: 60, cursor: "pointer" }}
            />
            <img
              src="/money/airtel.jpg"
              alt="Airtel Money"
              onClick={() => {
                window.open(
                  `https://moncompte.ariarynet.com/redirect?paiement=${id_transaction}&airtel=true`,
                  "_blank"
                );
              }}
              style={{ width: 60, height: 60, cursor: "pointer" }}
            />
            <img
              src="/money/orange.jpg"
              alt="Orange Money"
              onClick={() => {
                window.open(
                  `https://moncompte.ariarynet.com/redirect?paiement=${id_transaction}&orange=true`,
                  "_blank"
                );
              }}
              style={{ width: 60, height: 60, cursor: "pointer" }}
            />
          </div>
        </div>
      )}
    </form>
  );
}
