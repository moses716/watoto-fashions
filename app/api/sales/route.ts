import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: { include: { product: true } },
        user: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(orders)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const { items, userId, paymentMethod, mpesaPhone } = await req.json()

  try {
    const order = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.id } })
        if (!product || product.stock < item.qty) {
          throw new Error(`Not enough stock for ${product?.name}`)
        }
        await tx.product.update({
          where: { id: item.id },
          data: { stock: product.stock - item.qty }
        })
      }

      const total = items.reduce((sum: number, i: any) => sum + i.price * i.qty, 0)

      return tx.order.create({
        data: {
          userId: userId || "anonymous",
          total,
          paymentMethod: paymentMethod || "CASH",
          mpesaPhone,
          status: "COMPLETED",
          items: {
            create: items.map((i: any) => ({
              productId: i.id,
              quantity: i.qty,
              price: i.price
            }))
          }
        },
        include: { items: true }
      })
    })

    return NextResponse.json(order)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}