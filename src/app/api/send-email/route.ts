import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: "tommy@teraka.org",
    pass: "TOMMY2022",
  },
});

export async function POST(req: Request) {
  const { nom, email, message } = await req.json();
  const mailOptions = {
    from: "tommy@teraka.org",
    to: "rahelisonhajaina@gmail.com",
    subject: `Hôtelerie contact`,
    html: `
            <p>${nom} vous a contacté</p>
            <h2><b>Message:</b></h2>
            <p>${message}</p>
            <p>Vous pouvez le contacter à l'adresse suivante : ${email}</p>
        `,
  };
  await transporter.sendMail(mailOptions);
  return Response.json({
    status: 200,
    message: "Invitation envoyée",
  });
}
