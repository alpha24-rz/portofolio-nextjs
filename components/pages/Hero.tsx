"use client"
import ScrollVelocity from "../ScrollVelocity";
import Image from "next/image";

interface HeroProps {
    scrollToSection: (section: string) => void;
}

const Hero = ({ scrollToSection }: HeroProps) => {
    return (
        <section
            id="home"
            className="relative w-full h-screen flex flex-col items-center justify-between py-6 md:py-8 lg:py-10"
        >

            <div className="w-full flex-1 flex flex-col items-center justify-center">

                {/* Container text + image */}
                <div className="w-full relative flex inset-0 items-center justify-center">

                    <span className="
                        font-body leading-none
                        text-[4rem] 
                        sm:text-[5rem] 
                        md:text-[8rem] 
                        lg:text-[13rem]
                        relative
                        inline-block
                        transition-all duration-300
                        hover:scale-105
                        cursor-default
                        z-0 
                        pointer-events-auto
                    ">
                        PORTOFOLI
                        <span className="text-[#FF7F11] inline-block transition-all duration-300 hover:scale-110 hover:drop-shadow-glow">
                            O
                        </span>
                    </span>

                    <div className="flex w-full absolute items-center justify-center z-10">
                        {/* IMAGE */}
                        <div className="flex items-center justify-center">
                            <Image
                                src="/alfa.png"
                                alt="Alfa Profile"
                                width={400}
                                height={400}
                                priority
                                quality={90}
                                loading="eager"
                            />
                        </div>

                        <div className="absolute -bottom-1 rotate-2 w-full flex justify-center items-center bg-black">
                            <ScrollVelocity
                                texts={['Software Engineer ⚡', 'Creative Coder ⚡']}
                                velocity={80}
                                className="
                            custom-scroll-text
                            text-lg
                            sm:text-2xl
                            md:text-3xl
                            lg:text-4xl
                        "/>
                        </div>

                    </div>



                </div>


            </div>

        </section>
    );
};

export default Hero;