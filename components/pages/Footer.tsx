import { Button } from "../ui/button"
import { Linkedin, Github, Mail } from "lucide-react"
import Particles from "@/components/background/Particles/Particles"

interface FooterProps {
    scrollToSection: (section: string) => void;
}

const Footer = ({ scrollToSection }: FooterProps) => {
    return (
        <footer className="relative bg-black text-white py-12 px-4 sm:px-6 lg:px-8 w-screen overflow-hidden">
            {/* Particles Background */}
            <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={700}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
                className="absolute w-screen h-screen overflow-hidden z-0" // Ensure particles are at the bottom
            />

            <div className="max-w-6xl mx-auto z-10 relative"> {/* Content above particles */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <img
                            src="/Alph@_dark.gif" // pastikan logo.gif ada di folder /public
                            alt="Logo"
                            className="h-10 w-auto object-contain select-none"
                        />
                        <p className="text-gray-400">
                            A passionate developer, always ready for new challenges and exciting collaborations.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4 hover:text-light-blue-400 transition-colors duration-300 ease-in-out">Navigasi</h4>
                        <div className="space-y-2">
                            {["Beranda", "Tentang", "Proyek", "Blog", "Kontak"].map((item, index) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(["home", "about", "projects", "blog", "contact"][index])}
                                    className="block text-gray-400 hover:text-white transition-colors hover:translate-x-2 duration-500 ease-out transform hover:scale-105"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4 hover:text-light-blue-400 transition-colors duration-300 ease-in-out">Ikuti Saya</h4>
                        <div className="flex space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-[#0077B5] hover:bg-[#0077B5]/10 p-2 hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                            >
                                <Linkedin className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                            >
                                <Github className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-[#EA4335] hover:bg-[#EA4335]/10 p-2 hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                            >
                                <Mail className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm md:text-base">
                        © 2023 Alpha Rizi. <span className="text-light-blue-400">Empowering Innovation, Preserving Excellence.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
