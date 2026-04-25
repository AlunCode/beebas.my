import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { unsubscribeByUid } from '@/app/actions/digest'

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ uid?: string }>
}) {
  const { uid } = await searchParams

  let result: { success?: boolean; error?: string } = {}
  if (uid) {
    result = await unsubscribeByUid(uid)
  }

  const success = result.success === true
  const invalid = !uid || !!result.error

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[#FFF8DC] flex items-center justify-center text-2xl mx-auto mb-5">
            {success ? '✓' : '🐝'}
          </div>

          {invalid ? (
            <>
              <h1 className="text-xl font-extrabold text-[#1C1C1C] mb-2">Invalid link</h1>
              <p className="text-sm text-muted-foreground mb-6">
                This unsubscribe link is invalid or has already been used.
                You can manage your email preferences from the dashboard.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl font-extrabold text-[#1C1C1C] mb-2">Unsubscribed</h1>
              <p className="text-sm text-muted-foreground mb-6">
                You've been unsubscribed from Beebas monthly digest emails.
                You can re-enable them at any time from your dashboard.
              </p>
            </>
          )}

          <Link href="/dashboard">
            <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none">
              Go to dashboard
            </Button>
          </Link>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          <Link href="/" className="hover:underline">Beebas</Link> · Malaysia's debt payoff tracker
        </p>
      </div>
    </div>
  )
}
