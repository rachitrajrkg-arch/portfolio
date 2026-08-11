import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: "Dr. Rachit Raj | Dr. Rachit's Laser & Laparoscopy Clinic, Gomti Nagar, Lucknow",
  description: "Official website of Dr. Rachit's Laser & Laparoscopy Clinic - Dr. Rachit Raj (MBBS KGMU, MS Gold Medalist, FMAS, MCLS) - Expert Robotic, Laparoscopic & Laser Piles/Fissure/Fistula Surgery in Gomti Nagar, Lucknow.",
  keywords: ["Dr Rachit Raj", "Dr Rachit's Laser and Laparoscopy Clinic", "Doctor Lucknow", "Laser Piles Surgery Lucknow", "Laparoscopic Surgeon Gomti Nagar", "Robotic Surgery Lucknow"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${fraunces.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased selection:bg-forest-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
