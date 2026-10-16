import { Pinecone } from '@pinecone-database/pinecone'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const documents = [
  { id: 'company-profile', text: 'PakTurk Furnitures designs and builds handmade solid-wood furniture in its own workshops in Pakistan, combining Turkish, Pakistani, and Central Asian craft traditions. Furniture uses properly dried imported pine as standard wood and is hand-finished. PakTurk does not use MDF, sheet, or veneer for its solid-wood furniture. Workshops are in Islamabad, Muzaffarabad, and Chiniot. Categories include bedrooms, beds, dining rooms, living rooms, sofas, wardrobes, study tables, consoles, sideboards, mirrors, lamps, décor, and accent furniture.' },
  { id: 'products-and-antiques', text: 'PakTurk offers bedroom furniture and beds, bedroom sets, sofas and sofa sets, dining tables and chairs, study tables and desks, consoles, sideboards, wardrobes, almirahs, mirrors, bookshelves, lamps, and décor. PakTurk also deals in antique Pakistani furniture, including restored doors, windows, and classical pillars. Antique pieces are one of a kind and availability changes regularly; contact PakTurk on WhatsApp for current options.' },
  { id: 'custom-furniture', text: 'Furniture can be customized for size, design, color, fabric, polish, finish, storage, and design details. Custom size, wood, finish, fabric, and design changes can change the quotation. Sheesham and dayar/deodar are available on request subject to confirmation. Normal production for customized furniture is approximately three weeks, subject to confirmation and affected by design complexity, material availability, and finishing requirements.' },
  { id: 'delivery', text: 'PakTurk delivers across Pakistan. Delivery charges are not necessarily included and depend on city, distance, furniture size and weight, number of items, vehicle, floor and access conditions, and special handling. The exact charge must be confirmed before dispatch. Ready furniture in Islamabad and Rawalpindi is normally delivered approximately one day after confirmation, subject to scheduling. Out-of-city delivery is normally expected approximately seven working days after dispatch, subject to transport conditions. These are estimates, not guarantees.' },
  { id: 'showrooms-and-contact', text: 'PWD showroom: Lower Floor, Ali Arcade, next to KFC, PWD Housing Society, Islamabad. F-8/3 showroom: Nyal Center, Street 01, F-8/3, Islamabad. Both are open daily from 10:00 AM to 9:00 PM. Primary WhatsApp: https://wa.me/923091999199. PWD WhatsApp: https://wa.me/923182200000. General email: info@pakturkfurnitures.com. PWD phones: 0318 2200000 and 0320 5202401. F-8/3 phones: 0309 1999199 and 0321 5058870.' },
  { id: 'returns-warranty', text: 'PakTurk provides a lifetime wood guarantee for qualifying solid-wood furniture, including custom-made furniture, subject to inspection. It covers qualifying wood issues such as cracking, warping, or wood-boring insect damage according to policy; it does not normally cover fabric, upholstery, foam, cane, glass, mirrors, metalwork, hardware, electrical components, polish, ordinary wear, misuse, moisture, or natural wood variation. Eligible furniture may have a lifetime exchange with 100% original purchase-price credit toward another collection piece, but custom-made pieces cannot be exchanged. Eligible furniture may be returned for 70% of its original purchase price; custom-made pieces cannot be returned. Return and exchange requests require verification and physical inspection, and transport/collection costs are paid by the customer. Message PakTurk on WhatsApp with order details to start a request.' },
]

export async function POST(request: Request) {
  const secret = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || request.headers.get('x-ingest-secret')
  if (!process.env.INGEST_SECRET || secret !== process.env.INGEST_SECRET) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  try {
    const apiKey = process.env.PINECONE_API_KEY
    const indexName = process.env.PINECONE_INDEX_NAME
    const host = process.env.PINECONE_INDEX_HOST
    if (!apiKey || !indexName || !host) throw new Error('Pinecone is not configured.')
    const index = new Pinecone({ apiKey }).index(indexName, host).namespace('pakturk')
    await index.upsertRecords({
      records: documents.map((document) => ({ _id: document.id, text: document.text })),
    })
    return NextResponse.json({ ok: true, namespace: 'pakturk', upserted: documents.length })
  } catch (error) {
    console.error('[v0] Ingestion error:', error)
    return NextResponse.json({ error: 'Ingestion failed.' }, { status: 500 })
  }
}
