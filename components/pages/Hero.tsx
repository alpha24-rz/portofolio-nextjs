"use client"
import ClientMotion from "@/components/ClientMotion"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Eye, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import RotatingText from "@/components/RotatingText";
import ScrambledText from "@/components/ScrambledText";
import TrueFocus from "@/components/TrueFocus";
import ScrollVelocity from "@/components/ScrollVelocity"; // Pastikan komponen ini sudah ada

interface HeroProps {
    scrollToSection: (section: string) => void;
}

const Hero = ({ scrollToSection }: HeroProps) => {
    return (
        <><section
            id="home"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-16"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-black/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto text-center relative z-10 pt-5">
                <ClientMotion
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <ClientMotion
                        className="mb-8"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="relative inline-block pt-3">
                            <Image
                                src="/profile.jpg"
                                alt="Profile"
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full mx-auto mb-6 shadow-2xl shadow-black/20 border-4 border-white/50 backdrop-blur-sm" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse" />
                        </div>
                    </ClientMotion>
                    <div className="flex items-center justify-center w-full">
                        <TrueFocus
                            sentence="Alpha Rizi"
                            manualMode={false}
                            blurAmount={5}
                            borderColor="cyan"
                            animationDuration={1}
                            pauseBetweenAnimations={1} />
                    </div>
                    <div className="flex items-center justify-center w-full font-extrabold font-josefin pt-5">
                        <div className="text-2xl flex items-center">
                            <Sparkles className="mr-1" style={{ fontSize: '12px' }} />
                            I'am
                        </div>
                        <div className="ml-2 text-sm">
                            <RotatingText
                                texts={['UI/UX Designer', 'Web Developer', 'Data Analyst']}
                                mainClassName="px-1 sm:px-1 md:px-1 bg-black text-white overflow-hidden py-1 sm:py-1 md:py-1 justify-center rounded-lg"
                                staggerFrom={"last"}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000} />
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <ScrambledText
                            className="scrambled-text-demo text-black"
                            radius={50}
                            duration={1.2}
                            speed={0.5}
                            scrambleChars=".:"
                        >
                            Passionate developer and data enthusiast focused on creating innovative digital solutions with experience in full-stack development and data science.
                        </ScrambledText>
                    </div>

                    <ClientMotion
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 1.2, ease: "easeOut", staggerChildren: 0.2 }}
                    >
                        <Button
                            size="lg"
                            className="bg-black hover:bg-gray-800 text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out shadow-lg hover:shadow-xl group"
                            onClick={() => window.open('/pdf/Muhammad alfarizi_Universitas Negeri Makassar_CV.pdf', '_blank')}
                        >
                            <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                            Unduh CV
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => scrollToSection("projects")}
                            className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-black hover:text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out shadow-lg hover:shadow-xl group"
                        >
                            <Eye className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                            Lihat Proyek
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </ClientMotion>
                </ClientMotion>

                <ClientMotion
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <ChevronDown className="h-6 w-6 animate-bounce text-gray-400" />
                </ClientMotion>
            </div>
        </section><div className="flex items-center justify-center w-full pt-5 overflow-hidden">
                <ScrollVelocity
                    texts={['UI/UX Designer', 'Web Developer']}
                    velocity={100}
                    className="custom-scroll-text" />
            </div></>
    );
};

export default Hero;
