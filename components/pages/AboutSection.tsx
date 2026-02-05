"use client"
import ClientMotion from "@/components/ClientMotion"
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code } from "lucide-react"
import About from "@/components/pages/About";


const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">

      <div className="max-w-6xl mx-auto">
        <ClientMotion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Tentang Saya</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </ClientMotion>

        <ClientMotion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16">
          <About />
        </ClientMotion>






        <div className="space-y-12">
          <ClientMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >




          </ClientMotion>

          <ClientMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-black" />
                  Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-hidden">
                  <ClientMotion
                    className="flex gap-8 items-center"
                    animate={{
                      x: [0, -1920],
                    }}
                    transition={{
                      x: {
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                      },
                    }}
                  >
                    {/* First set of logos */}
                    {[
                      { name: "React", icon: "/svg/react.svg" },
                      { name: "Next.js", icon: "/svg/next.svg" },
                      { name: "TypeScript", icon: "/svg/typescript.svg" },
                      { name: "JavaScript", icon: "/svg/js.svg" },
                      { name: "Python", icon: "/svg/python.svg" },
                      { name: "SQL", icon: "/svg/sql.svg" },
                      { name: "Node.js", icon: "/svg/node-js.svg" },
                      { name: "Tailwind", icon: "/svg/tailwind.svg" },
                      { name: "Git", icon: "/svg/git.svg" },
                      { name: "MongoDB", icon: "/svg/mongodb.svg" },
                      { name: "Figma", icon: "/svg/figma.svg" },
                    ].map((tech, index) => (
                      <ClientMotion
                        key={`first-${tech.name}`}
                        className="flex flex-col items-center justify-center min-w-[80px] h-20 bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        whileHover={{ y: -5 }}
                      >
                        <Image src={tech.icon} alt={tech.name} width={24} height={24} className="mb-1" />
                        <div className="text-xs font-medium text-black text-center">{tech.name}</div>
                      </ClientMotion>
                    ))}

                    {/* Duplicate set for seamless loop */}
                    {[
                      { name: "React", icon: "/svg/react.svg" },
                      { name: "Next.js", icon: "/svg/next.svg" },
                      { name: "TypeScript", icon: "/svg/typescript.svg" },
                      { name: "JavaScript", icon: "/svg/js.svg" },
                      { name: "Python", icon: "/svg/python.svg" },
                      { name: "SQL", icon: "/svg/sql.svg" },
                      { name: "Node.js", icon: "/svg/node-js.svg" },
                      { name: "Tailwind", icon: "/svg/tailwind.svg" },
                      { name: "Git", icon: "/svg/git.svg" },
                      { name: "MongoDB", icon: "/svg/mongodb.svg" },
                      { name: "Figma", icon: "/svg/figma.svg" },
                    ].map((tech, index) => (
                      <ClientMotion
                        key={`second-${tech.name}`}
                        className="flex flex-col items-center justify-center min-w-[80px] h-20 bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        whileHover={{ y: -5 }}
                      >
                        <Image src={tech.icon} alt={tech.name} width={24} height={24} className="mb-1" />
                        <div className="text-xs font-medium text-black text-center">{tech.name}</div>
                      </ClientMotion>
                    ))}
                  </ClientMotion>

                  {/* Gradient overlays for smooth edges */}
                  <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
                  <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
                </div>
              </CardContent>
            </Card>
          </ClientMotion>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;