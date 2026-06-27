import "./globals.css";
import { AuthProvider } from "./(mainLayout)/provider/AuthProvider";

export const metadata = {
  metadataBase: new URL("https://www.aonelube.com"),

  title: {
    default: "A One Lube | Premium German Engine Oil & Lubricants",
    template: "%s | A One Lube",
  },

  description:
    "A One Lube offers premium German-engineered engine oils, transmission fluids, hydraulic oils, gear oils, industrial lubricants, motorcycle oils, and automotive lubrication solutions designed for maximum engine protection and performance.",

  keywords: [
    "A One Lube",
    "Engine Oil",
    "Motor Oil",
    "Synthetic Engine Oil",
    "Fully Synthetic Oil",
    "Semi Synthetic Oil",
    "Lubricants",
    "Automotive Lubricants",
    "Industrial Lubricants",
    "Diesel Engine Oil",
    "Petrol Engine Oil",
    "Truck Engine Oil",
    "Motorcycle Oil",
    "Gear Oil",
    "Transmission Fluid",
    "ATF",
    "Hydraulic Oil",
    "Brake Fluid",
    "Coolant",
    "Grease",
    "Car Engine Oil",
    "Heavy Duty Lubricants",
    "Premium Lubricants",
    "Made in Germany Lubricants",
    "High Performance Engine Oil",
    "Automotive Fluids",
    "Engine Protection",
    "Vehicle Maintenance",
    "OEM Approved Lubricants",
  ],

  authors: [
    {
      name: "A One Lube",
    },
  ],

  creator: "A One Lube",
  publisher: "A One Lube",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "A One Lube | Premium German Engine Oil & Lubricants",
    description:
      "Premium German-engineered engine oils and lubricants for cars, trucks, motorcycles, and industrial machinery. Engineered for maximum performance and long-lasting protection.",
    url: "https://www.aonelube.com",
    siteName: "A One Lube",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A One Lube Premium Lubricants",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "A One Lube | Premium German Engine Oil & Lubricants",
    description:
      "Premium engine oils and lubricants for superior engine performance, protection, and durability.",
    images: ["/og-image.jpg"],
  },

  category: "Automotive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
