"use client"
import ClientMotion from "@/components/ClientMotion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Send, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"

interface ContactSectionProps {
    scrollToSection: (section: string) => void;
}

const ContactSection = ({ scrollToSection }: ContactSectionProps) => {
    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ClientMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Hubungi Saya</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </ClientMotion>

          <div className="grid lg:grid-cols-2 gap-12">
            <ClientMotion
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                <CardHeader>
                  <CardTitle>Kirim Pesan</CardTitle>
                  <CardDescription>Saya akan merespon pesan Anda dalam 24 jam</CardDescription>
                </CardHeader>
                <CardContent>
                  <form action="https://formspree.io/f/mkgbpjao" method="POST">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="Nama Lengkap"
                          className="bg-white/80 backdrop-blur-sm border-black/20 focus:border-black transition-all duration-500 ease-out"
                          name="name"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="bg-white/80 backdrop-blur-sm border-black/20 focus:border-black transition-all duration-500 ease-out"
                          name="email"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Input
                        placeholder="Subjek"
                        className="bg-white/80 backdrop-blur-sm border-black/20 focus:border-black transition-all duration-500 ease-out"
                        name="subject"
                      />
                    </div>
                    <div className="mt-2">
                      <Textarea
                        placeholder="Pesan Anda"
                        rows={5}
                        className="bg-white/80 backdrop-blur-sm border-black/20 focus:border-black transition-all duration-500 ease-out"
                        name="message"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-black hover:bg-gray-800 text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out group"
                    >
                      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>

                </CardContent>
              </Card>
            </ClientMotion>

            <ClientMotion
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 text-black">Informasi Kontak</h3>
                  <div className="space-y-4">
                    <ClientMotion
                      className="flex items-center hover:translate-x-2 transition-transform duration-500 ease-out"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Mail className="h-5 w-5 text-black mr-3" />
                      <a
                        href="mailto:alfakiddrock7@email.com"
                        className="text-gray-700 hover:underline"
                      >
                        alfakiddrock7@gmail.com
                      </a>
                    </ClientMotion>
                    <ClientMotion
                      className="flex items-center hover:translate-x-2 transition-transform duration-500 ease-out"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Phone className="h-5 w-5 text-black mr-3" />
                      <span className="text-gray-700">+62 858-2436-4689</span>
                    </ClientMotion>
                    <ClientMotion
                      className="flex items-center hover:translate-x-2 transition-transform duration-500 ease-out"
                      whileHover={{ scale: 1.05 }}
                    >
                      <MapPin className="h-5 w-5 text-black mr-3" />
                      <span className="text-gray-700">Makassar, Indonesia</span>
                    </ClientMotion>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 text-black">Media Sosial</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/muhammad-alfarizi-710476312/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                    <a
                      href="https://github.com/alpha24-rz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-gray-800 hover:text-white hover:border-gray-800 hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </a>
                    <a
                      href="https://www.instagram.com/alpha_rz24"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-[#FD1D1D] hover:text-white hover:border-[#EA4335] hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                      >
                        <Image src="/svg/ig.svg" alt="instagram" width={16} height={16} className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </ClientMotion>
          </div>
        </div>
      </section>
    );
};
export default ContactSection;