import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error: any) {
    console.error("PRISMA GET ERROR:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error.message,
        code: error.code
      },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        stock: body.stock,
      },
    })
    return NextResponse.json(product)
  } catch (error: any) {
    console.error("PRISMA POST ERROR:", error)
    return NextResponse.json(
      { error: "Failed to create product", details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }

    const product = await prisma.product.update({
      where: { id: id },
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
      },
    })

    return NextResponse.json(product)
  } catch (error: any) {
    console.error("PRISMA PUT ERROR:", error)
    return NextResponse.json(
      { error: "Failed to update product", details: error.message },
      { status: 500 }
    )
  }
}