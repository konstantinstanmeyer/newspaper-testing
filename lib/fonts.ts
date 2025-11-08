import { Libre_Caslon_Display, Manufacturing_Consent, Playfair_Display, Source_Serif_4, Bodoni_Moda } from "next/font/google";

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair"
})

const sourceSerif = Source_Serif_4({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-source"
})

const manufacturing = Manufacturing_Consent({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-manufacturing"
})

const libre = Libre_Caslon_Display({
    weight: ["400"],
    style: ["normal"],
    subsets: ["latin"],
    variable: "--font-libre"
})

const bodoni = Bodoni_Moda({
    weight: ["400", "500", "600", "700", "800", "900"],
    style: ["normal"],
    subsets: ["latin"],
    variable: "--font-bodoni"
})

export const fonts = `${playfairDisplay.variable} ${sourceSerif.variable} ${manufacturing.variable} ${libre.variable} ${bodoni.variable}`;