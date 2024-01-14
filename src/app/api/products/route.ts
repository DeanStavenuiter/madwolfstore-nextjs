import { prisma } from "@/lib/db/prisma";

export async function GET() {

    try {
        await prisma.findMany({
            where: {
                id: 1
            }
        
        })
    } catch (error) {
        
    }
}