'use server'

import { getResend } from '@/lib/email'

export async function sendContactMessage(formData: FormData) {
  const name    = (formData.get('name') as string).trim()
  const email   = (formData.get('email') as string).trim()
  const subject = (formData.get('subject') as string).trim()
  const body    = (formData.get('body') as string).trim()

  if (!name || !email || !subject || !body) return { error: 'Please fill in all fields.' }

  try {
    await getResend().emails.send({
      from: 'Beebas Contact <admin@beebas.my>',
      to:   'admin@beebas.my',
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr/>
        <p>${body.replace(/\n/g, '<br/>')}</p>
      `,
    })
    return { success: true }
  } catch {
    return { error: 'Failed to send. Please email us directly at admin@beebas.my.' }
  }
}
