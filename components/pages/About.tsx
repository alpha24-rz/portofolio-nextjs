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
            <div className="col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-3 lg:col-start-3">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Saya adalah seorang UI/UX Designer sekaligus Web Developer yang antusias dalam menciptakan antarmuka digital yang fungsional dan estetis. Dengan dasar pengalaman di pengembangan web dan desain pengalaman pengguna, saya berfokus pada bagaimana teknologi dapat memberikan pengalaman yang intuitif dan bermakna.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Saya terus mengembangkan kemampuan saya di berbagai aspek teknologi, terutama dalam memahami tren baru seperti Artificial Intelligence (AI). Bagi saya, proses belajar adalah bagian tak terpisahkan dari perjalanan berkarya, dan saya selalu terbuka untuk eksplorasi hal-hal baru yang dapat memperkaya solusi digital yang saya bangun.
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

                    <TabsContent value="certifications" className="mt-4 text-sm">
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
