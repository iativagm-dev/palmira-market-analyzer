import Image from 'next/image'
import { cn } from '@/lib/utils'

interface IativaBrandingProps extends React.ComponentProps<'div'> {
  showText?: boolean
}

export function IativaBranding({ showText = true, className, ...props }: IativaBrandingProps) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <Image
        src="/images/iativa-logo.png"
        alt="Iativa Logo"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      {showText && <span className="text-lg font-semibold text-gray-800">Palmira Market Analyzer</span>}
    </div>
  )
}
