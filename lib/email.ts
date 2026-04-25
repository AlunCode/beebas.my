import { Resend } from 'resend'

// Lazy singleton — avoids "Missing API key" error at build time when env var is unset
let _resend: Resend | null = null
export function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

export interface DigestEmailData {
  to: string
  month: string          // e.g. "May 2026"
  debtFreeDate: string   // e.g. "March 2028"
  debtFreeMonths: number
  totalBalance: number
  totalInterestPaid: number
  interestSavedVsMinimum: number
  strategy: string
  debts: { name: string; balance: number; interestRate: number }[]
  unsubscribeUrl: string
}

function fmt(n: number) {
  return `RM ${n.toLocaleString('en-MY', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export function buildDigestHtml(d: DigestEmailData): string {
  const debtRows = d.debts.map(debt => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#1C1C1C;font-weight:600;">${debt.name}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#1C1C1C;font-weight:600;text-align:right;">${fmt(debt.balance)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#999;text-align:right;padding-left:12px;">${debt.interestRate}% p.a.</td>
    </tr>
  `).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Beebas Monthly Update — ${d.month}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1C1C1C;border-radius:16px 16px 0 0;padding:24px 32px;">
            <div style="display:inline-flex;align-items:center;gap:8px;">
              <span style="font-size:20px;">🐝</span>
              <span style="color:#FFD000;font-weight:800;font-size:20px;letter-spacing:-0.5px;">Beebas</span>
            </div>
            <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:6px 0 0 0;text-transform:uppercase;letter-spacing:0.08em;">Monthly Progress · ${d.month}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#fff;padding:32px;border-radius:0 0 16px 16px;">
            <h1 style="font-size:22px;font-weight:800;color:#1C1C1C;margin:0 0 6px 0;letter-spacing:-0.5px;">
              Here's your ${d.month} update
            </h1>
            <p style="color:#888;font-size:14px;margin:0 0 28px 0;line-height:1.5;">
              You're on the <strong style="color:#1C1C1C;text-transform:capitalize;">${d.strategy}</strong> plan. Keep going — every ringgit counts.
            </p>

            <!-- Key stats -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#1C1C1C;border-radius:12px;padding:18px 20px;text-align:center;" width="48%">
                  <p style="font-size:11px;color:rgba(255,215,0,0.6);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px 0;">Debt-free date</p>
                  <p style="font-size:19px;font-weight:800;color:#FFD000;margin:0;letter-spacing:-0.5px;">${d.debtFreeDate}</p>
                  <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:4px 0 0 0;">${d.debtFreeMonths} months away</p>
                </td>
                <td width="4%"></td>
                <td style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:18px 20px;text-align:center;" width="48%">
                  <p style="font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px 0;">Total remaining</p>
                  <p style="font-size:19px;font-weight:800;color:#1C1C1C;margin:0;letter-spacing:-0.5px;">${fmt(d.totalBalance)}</p>
                  <p style="font-size:12px;color:#bbb;margin:4px 0 0 0;">${fmt(d.interestSavedVsMinimum)} saved in interest</p>
                </td>
              </tr>
            </table>

            <!-- Debt breakdown -->
            <h2 style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px 0;">Your debts</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              ${debtRows}
            </table>

            <!-- CTA -->
            <div style="text-align:center;margin:32px 0 8px 0;">
              <a href="https://beebas.my/dashboard"
                 style="display:inline-block;background:#FFD000;color:#1C1C1C;font-weight:800;font-size:15px;padding:14px 36px;border-radius:12px;text-decoration:none;letter-spacing:-0.3px;">
                View your full plan →
              </a>
            </div>

            <!-- Footer -->
            <p style="color:#ccc;font-size:12px;text-align:center;margin:28px 0 0 0;line-height:1.6;">
              Beebas · <a href="https://beebas.my" style="color:#ccc;text-decoration:none;">beebas.my</a><br>
              You're receiving this because you're on a Pro plan.<br>
              <a href="${d.unsubscribeUrl}" style="color:#bbb;">Unsubscribe from monthly digests</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
