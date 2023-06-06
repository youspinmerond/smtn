export interface Chat {
    id: number
    name: string

    type: "PRIVATE" | "PUBLIC"
    password?: string

    messages?: Message[]
}

export type Message = {
    id: number
    authorId: number
    recvieverId: number
    content: string
    createdAt: Date
}