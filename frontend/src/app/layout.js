// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

import "@/node_modules/react-modal-video/css/modal-video.css"
import "../../public/assets/css/bootstrap.css"
import "../../public/assets/css/color.css"
import "../../public/assets/css/style.css"
import 'swiper/css'
// import "swiper/css/navigation"
import "swiper/css/pagination"
import 'swiper/css/free-mode';
import { poppins } from '../lib/font'
export const metadata = {
    title: 'Medblock',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${poppins.variable}`}>
            <body>{children}</body>
        </html>
    )
}

