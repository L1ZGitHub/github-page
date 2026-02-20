"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Linkedin, Mail, Send, ArrowRight, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function Contact() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const lastSubmitRef = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot check
    if (formData.get("website")) return

    // Rate limit - 30 seconds
    const now = Date.now()
    if (now - lastSubmitRef.current < 30000) {
      setStatus("error")
      return
    }

    setStatus("sending")

    const data = {
      name: String(formData.get("name")).substring(0, 100),
      email: String(formData.get("email")).substring(0, 100),
      subject: String(formData.get("subject")).substring(0, 200),
      message: String(formData.get("message")).substring(0, 5000),
      _honeypot: formData.get("website"),
    }

    try {
      await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      lastSubmitRef.current = now
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24 bg-gradient-to-b from-white to-slate-50">
      {/* Decorative blobs */}
      <div className="absolute left-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-amber-100/20 blur-[64px]" />
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 h-[350px] w-[350px] rounded-full bg-violet-100/20 blur-[64px]" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-16 text-center scroll-mt-24">
          <div className="mx-auto mb-6 h-px w-16 bg-gray-300" />
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Get in Touch</h2>
          <p className="text-lg text-gray-600">
            Let&apos;s discuss AI, research, or explore collaborations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* LinkedIn card */}
          <div className="rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-50/50 p-8 text-center transition-all hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-600/10">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-blue-600 text-white">
              <Linkedin className="size-5" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Connect on LinkedIn</h3>
            <p className="mb-6 text-sm text-gray-600">Let&apos;s connect and stay in touch</p>
            <Link
              href="https://www.linkedin.com/in/helain-zimmermann/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:scale-105"
            >
              View Profile
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Email card */}
          <div className="rounded-2xl border border-violet-200/50 bg-gradient-to-br from-violet-50 to-violet-50/50 p-8 text-center transition-all hover:-translate-y-1 hover:border-violet-400 hover:shadow-xl hover:shadow-violet-600/10">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-violet-600 text-white">
              <Mail className="size-5" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Send a Message</h3>
            <p className="mb-6 text-sm text-gray-600">Inquiries, collaborations, or just hello</p>
            <button
              onClick={() => { setOpen(true); setStatus("idle") }}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition-all hover:bg-violet-700 hover:scale-105"
            >
              Get in Touch
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Get in Touch</DialogTitle>
            <DialogDescription>I&apos;ll get back to you as soon as possible</DialogDescription>
          </DialogHeader>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="name" placeholder="Your name" required />
              <Input name="email" type="email" placeholder="Your email" required />
            </div>
            <Input name="subject" placeholder="Subject" />
            <Textarea name="message" placeholder="Your message..." required className="min-h-[120px]" />
            {/* Honeypot */}
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            <Button
              type="submit"
              disabled={status === "sending"}
              className="gap-2"
            >
              {status === "sending" ? (
                <><Loader2 className="size-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="size-4" /> Send Message</>
              )}
            </Button>

            {status === "success" && (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Something went wrong. Please try emailing me directly.
              </p>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
