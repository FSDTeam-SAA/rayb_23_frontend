"use client"

import { useMemo } from "react"

/* eslint-disable @typescript-eslint/no-explicit-any */

import InboxComponent from "@/components/shared/inbox"
import { getMyChat } from "@/lib/api"

export default function CustomerInboxPage() {
    const customerInboxConfig = useMemo(() => ({
        // ✅ Make userId optional to match InboxConfig type
        fetchChats: (userId?: string) => {
            return userId ? getMyChat(userId).then((res) => res.data) : Promise.resolve([])
        },

        queryKey: ["chats"],

        getChatName: (chat: any) => chat?.businessId?.businessInfo?.name || "Unknown Business",
        getChatEmail: (chat: any) => chat?.businessId?.businessInfo?.email || "",
        getChatImage: (chat: any) => chat?.businessId?.businessInfo?.image?.[0],
        getChatId: (chat: any) => chat?._id,

        getReceiverId: (chat: any) => chat?.businessId?.user,

        emptyStateText: "You have no messages yet.",
        emptyStateLink: "/search-result",
        emptyStateLinkText: "Go to Search Results",
    }), [])

    return <InboxComponent config={customerInboxConfig} />
}
