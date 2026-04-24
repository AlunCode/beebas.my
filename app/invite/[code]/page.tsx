import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { AcceptButton } from './_components/accept-button'

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const supabase = await createClient()

  // Check auth without forcing redirect (so we can redirect with the return URL)
  const { data: { user: authUser } } = await supabase.auth.getUser()
  if (!authUser) redirect(`/login?redirect=/invite/${code}`)

  const [{ data: dbUser }, { data: inviter }] = await Promise.all([
    supabase.from('users').select('id, email, partner_id').eq('id', authUser.id).single(),
    supabase.from('users').select('id, email, partner_id').eq('couple_invite_code', code).maybeSingle(),
  ])

  if (!dbUser) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#FFF8DC] flex items-center justify-center text-2xl mx-auto mb-4">👫</div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#1C1C1C] mb-1">Couple Mode Invite</h1>
          </div>

          {!inviter ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-6">This invite link is invalid or has already been used.</p>
              <Link href="/dashboard">
                <Button className="rounded-xl bg-[#1C1C1C] hover:bg-black text-white font-bold border-0">
                  Go to dashboard
                </Button>
              </Link>
            </div>
          ) : inviter.id === dbUser.id ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-6">You cannot accept your own invite link.</p>
              <Link href="/dashboard">
                <Button className="rounded-xl bg-[#1C1C1C] hover:bg-black text-white font-bold border-0">
                  Go to dashboard
                </Button>
              </Link>
            </div>
          ) : dbUser.partner_id ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-6">You are already linked with a partner. Leave couple mode first before accepting a new invite.</p>
              <Link href="/dashboard">
                <Button className="rounded-xl bg-[#1C1C1C] hover:bg-black text-white font-bold border-0">
                  Go to dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="rounded-2xl bg-[#FFF8DC] border border-[#FFD000]/30 px-5 py-4 mb-6">
                <p className="text-sm text-[#8B6000]">
                  <strong className="text-[#1C1C1C]">{inviter.email}</strong> wants to share their Beebas debt plan with you.
                  Once linked, you will both see and manage each other's debts together.
                </p>
              </div>
              <p className="text-xs text-muted-foreground mb-4 text-center">
                You are logged in as <strong>{dbUser.email}</strong>
              </p>
              <AcceptButton code={code} />
              <p className="text-xs text-center text-muted-foreground mt-4">
                You can leave couple mode at any time from the dashboard.
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link href="/" className="hover:underline">Beebas</Link> · Malaysia's debt payoff tracker
        </p>
      </div>
    </div>
  )
}
