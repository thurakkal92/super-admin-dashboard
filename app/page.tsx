"use client"

import Link from "next/link"
import { Bot, Building, Users, Database, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function SuperAdminDashboard() {
  const managementCards = [
    {
      title: "Manage Companies",
      description: "View, create, and edit company profiles.",
      icon: <Building className="h-8 w-8 text-primary" />,
      stat: "12 Active Companies",
      link: "/superadmin/companies",
      actionText: "View Companies",
    },
    {
      title: "Manage Users",
      description: "View, create, and edit user accounts.",
      icon: <Users className="h-8 w-8 text-primary" />,
      stat: "150 Active Users",
      link: "/superadmin/users",
      actionText: "View Users",
    },
    {
      title: "Manage Datasilos",
      description: "View, define, and configure datasilos.",
      icon: <Database className="h-8 w-8 text-primary" />,
      stat: "42 Configured Datasilos",
      link: "/superadmin/datasilos",
      actionText: "View Datasilos",
    },
  ]

  return (
    <>
      <div className="flex min-h-screen w-full bg-gray-50 text-[#231F20]">
        <aside className="hidden w-64 flex-col border-r bg-dark p-4 text-dark-foreground sm:flex">
          <div className="flex items-center gap-2 p-2">
            <Bot className="h-8 w-8 text-secondary" />
            <h1 className="text-xl font-semibold">KI Cockpit</h1>
          </div>
          <nav className="mt-8 flex flex-col gap-2">
            <Link
              href="/superadmin" // Current page
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary/20"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/superadmin/companies"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
            >
              <Building className="h-4 w-4" />
              Companies
            </Link>
            <Link
              href="/superadmin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/superadmin/datasilos"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
            >
              <Database className="h-4 w-4" />
              Datasilos
            </Link>
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <main className="flex-1 p-6 pt-10 md:p-8 md:pt-10">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Superadmin Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {managementCards.map((card) => (
                <Card key={card.title} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                      {card.icon}
                    </div>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm font-medium text-gray-500">{card.stat}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={card.link || "#"} passHref className="w-full">
                      <Button asChild className="w-full">
                        <a>
                          {card.actionText === "View Companies" && <Building className="mr-2 h-4 w-4" />}
                          {card.actionText === "View Users" && <Users className="mr-2 h-4 w-4" />}
                          {card.actionText === "View Datasilos" && <Database className="mr-2 h-4 w-4" />}
                          {card.actionText || "View Details"}
                        </a>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
