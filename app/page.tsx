import { SiteHeader } from '@/components/site-header'
import { TestSession } from '@/components/test-session'

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-20">
      <SiteHeader />
      <TestSession />
    </main>
  )
}
