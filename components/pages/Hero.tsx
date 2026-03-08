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
            className="relative w-full h-screen flex flex-col items-center justify-between py-10"
        >
            {/* Konten utama di tengah */}
            <div className="flex-1 flex flex-col items-center justify-center">
                {/* Container untuk text PORTOFOLIO dan gambar */}
                <div className="relative flex flex-col items-center justify-center">
                    <span className="text-[13rem] font-body leading-none">PORTOFOLIO</span>
                    
                    {/* Gambar absolute di tengah text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Image 
                            src="/alfa.png" 
                            alt="Alfa Profile" 
                            width={400}  // Sesuaikan dengan ukuran asli gambar
                            height={400} // Sesuaikan dengan ukuran asli gambar
                            className="w-auto h-auto"
                            priority // Prioritas loading untuk LCP
                            quality={90} // Optimasi kualitas
                            loading="eager" // Langsung load tanpa lazy
                        />
                    </div>
                </div>

                {/* Scroll text - tepat di bawah gambar */}
                <div className="absolute bottom-1 rotate-2 w-full flex justify-center items-center bg-black py-2">
                    <ScrollVelocity
                        texts={['Web Developer', 'Creative Coder']}
                        velocity={80}
                        className="custom-scroll-text text-4xl"
                    />
                </div>
            </div>

            {/* Optional: tambahkan elemen lain di bagian bawah jika diperlukan */}
        </section>
    );
};

export default Hero;