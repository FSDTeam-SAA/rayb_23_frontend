"use client"

import { useMemo } from "react"

/* eslint-disable @typescript-eslint/no-explicit-any */


import InboxComponent from "@/components/shared/inbox"
import { getMyChat } from "@/lib/api"
import { useBusinessContext } from "@/lib/business-context"

export default function BusinessInboxPage() {
    const { selectedBusinessId } = useBusinessContext()

    const businessInboxConfig = useMemo(() => ({
        fetchChats: (userId?: string) => {
            return userId ? getMyChat(userId).then((res) => res.data) : Promise.resolve([])
        },

        queryKey: selectedBusinessId
            ? ["business-chats", selectedBusinessId]
            : ["business-chats"],

        getChatName: (chat: any) => chat?.participants[0]?.userId?.name || "Unknown User",
        getChatEmail: (chat: any) => chat?.participants[0]?.userId?.email || "",
        getChatImage: (chat: any) => chat?.participants[0]?.userId?.imageLink,
        getChatId: (chat: any) => chat?._id,

        getReceiverId: (chat: any) => chat?.participants[0]?.userId?._id,

        emptyStateText: "You have no messages yet.",
        emptyStateLink: "/search-result",
        emptyStateLinkText: "Go to Search Results",

        additionalData: selectedBusinessId || "", // If you want to ensure string, fallback to ""
    }), [selectedBusinessId])

    return <InboxComponent config={businessInboxConfig} />
}
