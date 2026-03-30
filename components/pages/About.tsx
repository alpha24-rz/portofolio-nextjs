"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileCard from "@/components/ProfileCard/ProfileCard"
import { GraduationCap, Briefcase, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"


const About = () => {
    return (

        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-5" >
            <div className="flex relative justify-center items-center  md:col-span-2 lg:col-span-2 lg:row-span-5">
                <ProfileCard
                    name="M Alpha.Rizi"
                    title="Software Engineer"
                    handle="Alpha Rizi"
                    status="Online"
                    contactText="Contact"
                    avatarUrl="/card.png"
                    iconUrl="/iconpattern.png"
                    grainUrl="/grain.webp"
                    showUserInfo={true}
                    enableTilt={true}
                    onContactClick={() => console.log('Contact clicked')}
                />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-3 lg:col-start-3">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Software Engineer with a background in UI/UX Design and Web Development. Experienced in building digital interfaces that are both functional and aesthetically compelling, with a strong focus on creating intuitive and meaningful user experiences. I bridge the gap between development and design to deliver human-centered technology solutions.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    I continuously expand my expertise across various areas of technology, with a growing interest in emerging trends such as Artificial Intelligence (AI). For me, learning is an essential part of the creative journey—I’m always open to exploring new possibilities that enrich the digital solutions I build.
                </p>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2 lg:col-start-3 lg:row-start-4">
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

                    <TabsContent value="certifications" className="mt-4 text-xs">
                        <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out hover:scale-105 ">
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
            </div>

        </div>
    );
};

export default About;
