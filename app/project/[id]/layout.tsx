// app/project/[id]/layout.tsx
import { ReactNode } from 'react'

interface ProjectLayoutProps {
  children: ReactNode
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <>
      {/* Layout khusus untuk halaman project */}
      {/* Bisa tambahkan header, footer, atau komponen lain yang spesifik */}
      {children}
    </>
  )
}