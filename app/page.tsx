import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Building2, BarChart } from "lucide-react"
import Navbar from "@/components/navbar"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import GlowingOrb from "@/components/glowing-orb"

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section with fade transition */}
      <section id="home" className="relative h-[100vh] flex flex-col">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cityscape.png"
            alt="Modern commercial real estate cityscape"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/80 to-transparent"></div>

          {/* Fade transition to the next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F5F5] to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Elevating Commercial Real Estate
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Astroop CRE delivers exceptional commercial real estate services with a focus on client success and market
              expertise.
            </p>
            <Button className="bg-[#FF7A00] hover:bg-[#FF9A40] text-white rounded-full px-8 py-6 text-lg btn-animated">
              <a href="#contact" className="flex items-center gap-2">
                Contact Us <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative bg-gradient-to-br from-[#F5F5F5] to-white pattern-dots">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GlowingOrb color="orange" size={180} top="30%" right="5%" />
          <GlowingOrb color="blue" size={120} bottom="10%" left="5%" delay={3} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">About Astroop CRE</h2>
              <p className="text-gray-700 mb-6">
                Astroop CRE is a premier commercial real estate firm dedicated to providing exceptional service and
                expertise to our clients. With a deep understanding of market dynamics and a commitment to excellence,
                we deliver tailored solutions that meet the unique needs of each client.
              </p>
              <p className="text-gray-700 mb-8">
                Our team of experienced professionals brings decades of combined experience in commercial real estate,
                offering insights and strategies that drive success in every transaction and relationship.
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-[#FF7A00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003366]">Marketing</h3>
                    <p className="text-sm text-gray-600">Strategic promotion</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-[#FF7A00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003366]">Expert Team</h3>
                    <p className="text-sm text-gray-600">Industry leaders</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="relative h-[400px] md:h-[500px] w-full rounded-tr-[100px] rounded-bl-[100px] shadow-xl">
                <Image
                  src="/images/astroop-building.png"
                  alt="Astroop CRE Building"
                  fill
                  className="object-cover rounded-tr-[100px] rounded-bl-[100px]"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#FF7A00]/10 rounded-full -z-10"></div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#003366]/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-[#F5F5F5] relative pattern-grid">
        {/* Fixed orb positioning to prevent cutoff */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GlowingOrb color="orange" size={200} bottom="10%" right="5%" />
          <GlowingOrb color="blue" size={140} top="20%" left="10%" delay={2} />
        </div>

        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003366]/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">Our Expert Team</h2>
            <p className="text-gray-700">
              Meet our team of experienced professionals dedicated to delivering exceptional results and personalized
              service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ryan Harold",
                position: "Partner",
                image: "/images/ryan-harold.jpeg",
              },
              {
                name: "Michael Chen",
                position: "Director of Acquisitions",
                image: "/images/michael-chen.jpeg",
              },
              {
                name: "Sarah Johnson",
                position: "Head of Marketing",
                image: "/images/sarah-johnson.jpeg",
              },
              {
                name: "David Bradman",
                position: "Investment Strategist",
                image: "/images/david-bradman.webp",
              },
            ].map((member, index) => (
              <div key={index} className="group hover-card bg-white rounded-2xl p-4 shadow-md">
                <div className="relative h-[350px] rounded-tr-[50px] rounded-bl-[50px] shadow-lg mb-4 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-[#003366]">{member.name}</h3>
                <p className="text-[#FF7A00]">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative pattern-dots">
        {/* Fixed orb positioning to prevent cutoff */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GlowingOrb color="orange" size={180} top="30%" right="15%" />
          <GlowingOrb color="blue" size={130} bottom="20%" left="20%" delay={3} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">Client Testimonials</h2>
            <p className="text-gray-700">
              Hear what our clients have to say about their experience working with Astroop CRE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Astroop CRE's expertise and dedication were instrumental in helping us secure the perfect office space for our expanding operations.",
                author: "Jennifer Williams",
                company: "National Net Lease Properties",
              },
              {
                quote:
                  "The team at Astroop CRE provided invaluable guidance throughout our property acquisition process, ensuring a smooth and successful transaction.",
                author: "Robert Thompson",
                company: "Miller Investments",
              },
              {
                quote:
                  "Working with Astroop CRE has been a game-changer for our real estate strategy. Their market insights and personalized approach set them apart.",
                author: "Lisa Chen",
                company: "Horizon Enterprises",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg p-8 relative hover-card bg-white/80 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF7A00]/10 rounded-bl-full -z-10"></div>
                <CardContent className="p-0">
                  <div className="text-4xl text-[#FF7A00] mb-4">"</div>
                  <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                  <div>
                    <h4 className="font-bold text-[#003366]">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-[#003366] to-[#002244] text-white relative">
        {/* Fixed orb positioning to prevent cutoff */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GlowingOrb color="orange" size={250} top="10%" right="5%" />
          <GlowingOrb color="blue" size={150} bottom="15%" left="10%" delay={2} />
          <GlowingOrb color="orange" size={120} top="40%" left="30%" delay={4} />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7A00]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF7A00]/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to work with us?</h2>
            <p className="text-white/80">
              Reach out to discuss how Astroop CRE can help you achieve your commercial real estate goals.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
