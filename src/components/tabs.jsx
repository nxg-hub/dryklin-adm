"use client"

import * as React from "react"

const TabsContext = React.createContext({
    selectedTab: "",
    setSelectedTab: () => {},
})

export function Tabs({ defaultValue, children, ...props }) {
    const [selectedTab, setSelectedTab] = React.useState(defaultValue)

    return (
        <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
            <div {...props}>{children}</div>
        </TabsContext.Provider>
    )
}

export function TabsList({ className = "", children, ...props }) {
    return (
        <div className={`flex ${className}`} {...props}>
            {children}
        </div>
    )
}

export function TabsTrigger({ value, className = "", children, ...props }) {
    const { selectedTab, setSelectedTab } = React.useContext(TabsContext)

    return (
        <button
            className={`${className} ${selectedTab === value ? "data-[state=active]" : ""}`}
            onClick={() => setSelectedTab(value)}
            data-state={selectedTab === value ? "active" : "inactive"}
            {...props}
        >
            {children}
        </button>
    )
}

export function TabsContent({ value, className = "", children, ...props }) {
    const { selectedTab } = React.useContext(TabsContext)

    if (selectedTab !== value) return null

    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}

