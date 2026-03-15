// /app/admin/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/projects")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">

        <div
          className="tenor-gif-embed"
          data-postid="25424939"
          data-share-method="host"
          data-aspect-ratio="1"
          data-width="100%"
        >
          <a href="https://tenor.com/view/cute-cat-white-gif-25424939">
          </a>
        </div>

        <Script
          src="https://tenor.com/embed.js"
          strategy="lazyOnload"
        />

        <p className="text-gray-600 mt-4">
          Redirecting to dashboard...
        </p>
      </div>
    </div>
  )
}