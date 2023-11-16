"use client";
import fr from "date-fns/locale/fr";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import type { Range, RangeKeyDict } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";
import { LoadingButton } from "@mui/lab";
import { TodayRounded } from "@mui/icons-material";
import { addRoomBookings, getRoomBookings } from "@/lib/room";
import { supabase } from "@/lib/db";
import { toast } from "react-toastify";
import axios from "axios";

export default function Reservation({
  etablissement_id,
  id_room,
  price,
}: {
  etablissement_id: string;
  id_room: string;
  price: number;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [id_transaction, setIdTransaction] = useState<number | null>(null);
  const [disabledDate, setDisabledDate] = useState<Date[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      const dataBookings = await getRoomBookings(id_room);
      setBookings(
        dataBookings.room_bookings.map((i: any) => ({
          date_start: i.date_start,
          date_end: i.date_end,
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

  let priceTotal = 0;
  if (state[0].startDate && state[0].endDate) {
    priceTotal =
      (differenceInDays(state[0].endDate, state[0].startDate) + 1) * price;
  }
  const handleChange = (item: RangeKeyDict) => {
    setState([item.selection]);
  };
  const handleSubmit: any = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      // const roomBooking = await addRoomBookings(id_room, user.id, addDays(new Date(state[0].startDate!), 1), addDays(new Date(state[0].endDate!), 1), priceTotal);

      const roomBooking = JSON.stringify({
        c: id_room,
        s: addDays(new Date(state[0].startDate!), 1),
        en: addDays(new Date(state[0].endDate!), 1),
      });
      if (roomBooking) {
        const formdata = new FormData();
        formdata.append("idpanier", etablissement_id);
        formdata.append("total", priceTotal.toString());
        formdata.append("nom", user.id);
        formdata.append("email", user.email);
        formdata.append("reference", roomBooking);
        setIdTransaction(null);
        formdata.append(
          "ip",
          (await axios.get("https://api.ipify.org?format=json")).data.ip
        );
        formdata.append("private_key", process.env.NEXT_PUBLIC_VANILLA_PRIVATE!);
        const res = await axios.post(
          "https://vanilla.unityfianar.com",
          formdata
        );
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
  useEffect(() => {
    const disabledDates: Date[] = [];
    for (let item in bookings) {
      const diff = differenceInDays(
        new Date(bookings[item].date_end),
        new Date(bookings[item].date_start)
      );
      for (let i = 0; i <= diff; i++) {
        disabledDates.push(addDays(new Date(bookings[item].date_start), i));
      }
    }
    setDisabledDate(disabledDates);
  }, [bookings]);

  return (
    <form onSubmit={handleSubmit}>
      {bookings && (
        <DateRange
          locale={fr}
          minDate={new Date()}
          editableDateInputs={true}
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          rangeColors={["#1E3A8A"]}
          ranges={state}
          disabledDates={disabledDate}
        />
      )}
      <p
        style={{
          border: "solid 3px grey",
          padding: "10px",
          borderRadius: 7,
          fontWeight: "bold",
        }}
      >
        {priceTotal.toLocaleString("mg-MG", { style: "decimal" })} Ariary
      </p>
      <LoadingButton
        className="chip flex gap-2 items-center"
        sx={{
          // background: "#faae61",
          padding: "10px 20px",
          fontWeight: "bold",
          fontFamily: "Nunito",
          borderRadius: 15,
        }}
        loading={loading}
        type="submit"
        startIcon={<TodayRounded />}
        variant="contained"
      >
        Valider
      </LoadingButton>
      {id_transaction && (
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
      )}
    </form>
  );
}
