"use client"
import ClientMotion from "@/components/ClientMotion"
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Briefcase, Award, Code } from "lucide-react"
import ProfileCard from "@/components/ProfileCard/ProfileCard"

interface AboutSectionProps {
    scrollToSection: (section: string) => void;
}

const AboutSection = ({ scrollToSection }: AboutSectionProps) => {
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

          <div className="flex items-center justify-center w-full">
            <ProfileCard
              name="M Alpha.Rizi"
              title="Web Developer"
              handle="Alpha Rizi"
              status="Online"
              contactText="Contact"
              avatarUrl="/profile.jpg"
              iconUrl="/iconpattern.png"
              grainUrl="/grain.webp"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>


          <div className="space-y-12">
            <ClientMotion
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Saya adalah seorang UI/UX Designer sekaligus Web Developer yang antusias dalam menciptakan antarmuka digital yang fungsional dan estetis. Dengan dasar pengalaman di pengembangan web dan desain pengalaman pengguna, saya berfokus pada bagaimana teknologi dapat memberikan pengalaman yang intuitif dan bermakna.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Saya terus mengembangkan kemampuan saya di berbagai aspek teknologi, terutama dalam memahami tren baru seperti Artificial Intelligence (AI). Bagi saya, proses belajar adalah bagian tak terpisahkan dari perjalanan berkarya, dan saya selalu terbuka untuk eksplorasi hal-hal baru yang dapat memperkaya solusi digital yang saya bangun.
              </p>


              <Tabs defaultValue="education" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-black/10">
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Pendidikan
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Pengalaman
                  </TabsTrigger>
                  <TabsTrigger
                    value="certifications"
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Sertifikasi
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="education" className="mt-4">
                  <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-black">S1 Teknik Komputer</h4>
                          <p className="text-gray-700">Universitas Negeri Makassar • 2023 - Present</p>
                          <p className="text-sm text-gray-600">IPK: 3.77/4.00</p>
                          <p className="text-sm text-gray-600">Fakultas Teknik • Jurusan Teknik Informatika & Komputer</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="mt-4">
                  <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-black">Web Developer</h4>
                          <p className="text-gray-700">Freelance • 2024 - Present</p>
                          <p className="text-sm text-gray-600">
                            Mengembangkan aplikasi web modern menggunakan React dan Next.js
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="certifications" className="mt-4">
                  <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-black">Certified in UI/UX Research and Design</h4>
                          <p className="text-gray-700">MySkill • 2025</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-black">Certified intro to UI/UX Design</h4>
                          <p className="text-gray-700">Purwadhika digital technology school • 2025</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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