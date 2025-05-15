"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Always show success after a brief delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-[#FF7A00]" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
        <p className="text-white/80 mb-6">Your message has been received. Our team will get back to you shortly.</p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="bg-[#FF7A00] hover:bg-[#FF9A40] text-white btn-animated"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            required
            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#FF7A00]"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            required
            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#FF7A00]"
            placeholder="Your email"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#FF7A00]"
            placeholder="Your phone (optional)"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
            Company
          </label>
          <Input
            id="company"
            type="text"
            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#FF7A00]"
            placeholder="Your company (optional)"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
          Message
        </label>
        <Textarea
          id="message"
          required
          rows={5}
          className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#FF7A00]"
          placeholder="Tell us about your project or inquiry"
        />
      </div>

      <div className="mb-6">
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" required className="mt-1" />
          <span className="text-sm text-white/80">
            I agree to the processing of my personal data in accordance with the Privacy Policy
          </span>
        </label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#FF7A00] hover:bg-[#FF9A40] text-white py-6 text-lg rounded-full btn-animated"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
