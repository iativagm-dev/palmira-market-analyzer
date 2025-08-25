'use client'

import * as React from 'react'
import { Separator } from '@/components/ui/separator'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="w-full border-t bg-background p-6 md:px-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Palmira Market Analyzer. Todos los derechos reservados.
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/vercel" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://twitter.com/vercel" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/company/vercel" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
