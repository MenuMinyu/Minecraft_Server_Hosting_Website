import Image from "next/image";
import { PixelHeading } from "../components/ui/pixel-heading-word";
import { PixelHeading2 } from "../components/ui/pixel-heading-character";
import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/ui/retro-grid";
import RippleButton from "@/components/ui/ripple-button";
import {StartEC2} from "@/components/api/StartEC2";
import {StopEC2} from "@/components/api/StopEC2";
import { RotateCw } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import {imgRefresh} from "@/components/api/imgRefresh";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
let serverStatusImg;
setInterval(function() {serverStatusImg = "https://api.mcstatus.io/v2/widget/java/52.48.31.31"}, 10000)
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between pt-5 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-3 text-center ">
          <RetroGrid cellSize={60} darkLineColor="" opacity={0.4} className="h-230"/>
          <PixelHeading initialFont="circle" hoverFont="circle" className="text-6xl">
              MINECRAFT
          </PixelHeading>
          <PixelHeading2 mode="wave" autoPlay className="text-6xl">
            SERVER HOSTER
          </PixelHeading2>
          
          <p className="max-w-md font-pixel-square text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Get started by clicking the deploy button to turn on a minecraft java edition server
          </p>
        </div>
        <HeroVideoDialog videoSrc="https://www.youtube.com/embed/qnZrnn-s13A?si=z9W49jT0wdURx9jd" thumbnailSrc="https://i3.ytimg.com/vi/qnZrnn-s13A/maxresdefault.jpg" />
        <div className="flex flex-col font-pixel-square sm:flex-row mt-10 gap-2 md:gap-4">
            <RippleButton size={"lg"} className=" text-xl py-6 px-5 font-extrabold ">
              <ShinyButton className="bg-mauve-50 size-7" onClick={imgRefresh}><RotateCw color="black"></RotateCw></ShinyButton>
               <button className="cursor-pointer" >DEPLOY</button>
            {/*<Spinner data-icon="inline-start"/>*/}
            </RippleButton>
          <Button variant={"outline"} size={"lg"}  className=" text-xl p-6  font-bold ">STOP</Button>
        </div>

        <div className="mt-5">
          
          <img id="imgRefresh" src={"https://api.mcstatus.io/v2/widget/java/52.48.31.31"}/>
          <p className="max-w-md font-pixel-square text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Minecraft version: 26.1.2
          </p>
        </div>
        
      </main>
    </div>
  );
}
