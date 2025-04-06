import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailForgotPasswordBDCProps {
  token?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `http://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "";

export default function EmailForgotPasswordBDC({
  token,
}: EmailForgotPasswordBDCProps) {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Body style={main}>
        <Preview>Bungah Dental Care Reset Password</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/assets/ecowood_icon.png`}
                width="75"
                height="75"
                alt="Bungah Dental Care Logo"
                style={imageIc}
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>
                Mereset Kata Sandi Akun Bungah Family Dental Care
              </Heading>
              <Text style={mainText}>
                Terima kasih telah meminta reset kata sandi akun Bungah Family
                Dental Care! Untuk melanjutkan proses reset, silakan gunakan
                kode verifikasi di bawah ini:
              </Text>
              <Hr style={divider} />
              <Section style={otpContainer}>
                {token?.split("").map((digit, index) => (
                  <Text key={index} style={otpBox}>
                    {digit}
                  </Text>
                ))}
              </Section>
              <Text style={validityText}>(Berlaku Selama 10 menit)</Text>
            </Section>
            <Section style={lowerSection}>
              <Hr style={divider} />
              <Text style={cautionText}>
                Jika Anda tidak melakukan permintaan reset kata sandi, abaikan
                email ini. Bungah Family Dental Care tidak akan pernah meminta
                Anda membagikan kata sandi, informasi kartu kredit, atau detail
                perbankan melalui email.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            Pesan ini dikirim oleh Bungah Family Dental Care. Semua hak
            dilindungi.
            <br /> Jika Anda memiliki pertanyaan, silakan hubungi kami di{" "}
            <Link href="#" style={link} className="text-blue-600 no-underline">
              email@gmail.com
            </Link>
            <br />
            Lihat{" "}
            <Link href="#" style={link} className="text-blue-600 no-underline">
              Kebijakan Privasi
            </Link>{" "}
            dan{" "}
            <Link href="#" style={link} className="text-blue-600 no-underline">
              Syarat & Ketentuan{" "}
            </Link>
            Kami.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  maxWidth: "730px",
  padding: "24px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#2C2C2C",
  fontFamily: "'Noto Serif', sans-serif",
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "0px",
  marginBottom: "18px",
  textAlign: "center" as const,
};

const imageIc = {
  margin: "0 auto",
};

const link = {
  color: "#2754C5",
  fontFamily: "'Noto Serif', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  fontFamily: "'Noto Serif', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#840403",
  height: "110px",
  borderTopLeftRadius: "16px", // Supaya sesuai dengan container
  borderTopRightRadius: "16px",
  padding: "18px 12px",
};

const coverSection = { backgroundColor: "#fff", borderRadius: "16px" };

const upperSection = { padding: "25px 35px 0px 35px" };

const lowerSection = { padding: "0px 35px 25px 35px" };

const footerText = {
  ...text,
  fontSize: "14px",
  padding: "0 20px",
};

const otpBox = {
  display: "inline-block",
  width: "50px",
  height: "50px",
  lineHeight: "50px",
  border: "2px solid #000",
  borderRadius: "8px",
  textAlign: "center" as const,
  fontSize: "24px",
  fontWeight: "bold" as const,
  margin: "0 5px",
  fontFamily: "'Noto Serif', sans-serif",
};

const otpContainer = {
  display: "flex",
  justifyContent: "center",
  marginTop: "12px",
};

const validityText = {
  ...text,
  margin: "12px 0px 0px 0px",
  textAlign: "center" as const,
};

const divider = {
  borderColor: "#89939E",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
