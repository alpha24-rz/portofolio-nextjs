import { motion } from "framer-motion"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

const blogPosts = [
    {
      id: 1,
      title: "Innovations in IoT, AI, Blockchain, and NFT for Environmental Sustainability",
      summary: "Mengeksplorasi inovasi terbaru dalam IoT, AI, Blockchain, dan NFT yang dapat mendukung keberlanjutan lingkungan dan pelestarian ekosistem. Artikel ini membahas potensi teknologi tersebut dalam mengatasi tantangan lingkungan global.",
      date: "15 Januari 2025",
      category: "Enverionment",
      url: "https://blog-eco.vercel.app/",
    },
  ]

const BlogSection = () => {
    return (
        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Blog</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer h-full bg-white/80 backdrop-blur-md border border-black/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>{post.date}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-black/20">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-black group-hover:text-gray-700 transition-colors duration-500 ease-out">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{post.summary}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-black hover:text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out group"
                      onClick={() => window.open(post.url, "_blank")}
                    >
                      Baca Selengkapnya
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default BlogSection; 