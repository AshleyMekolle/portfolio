'use client'
import Cursor from './Cursor'
import { useScrollReveal } from './useScrollReveal'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  useScrollReveal()
  return (
    <>
      <Cursor />
      {children}
    </>
  )
}
