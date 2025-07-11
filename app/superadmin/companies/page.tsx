"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { PlusCircle, Edit, Bot, Building, Users, Database, LayoutDashboard, Loader2 } from "lucide-react"
import { useCompanies } from "@/hooks/use-companies"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CompaniesListPage() {
  const { data: companies, isLoading, error } = useCompanies()

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full bg-gray-50 text-[#231F20]">
        <aside className="hidden w-64 flex-col border-r bg-dark p-4 text-dark-foreground sm:flex">
          <div className="flex items-center gap-2 p-2">
            <Bot className="h-8 w-8 text-secondary" />
            <h1 className="text-xl font-semibold">KI Cockpit</h1>
          </div>
          <nav className="mt-8 flex flex-col gap-2">
            <Link
              href="/superadmin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/superadmin/companies"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary/20"
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
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading companies...</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full bg-gray-50 text-[#231F20]">
        <aside className="hidden w-64 flex-col border-r bg-dark p-4 text-dark-foreground sm:flex">
          <div className="flex items-center gap-2 p-2">
            <Bot className="h-8 w-8 text-secondary" />
            <h1 className="text-xl font-semibold">KI Cockpit</h1>
          </div>
          <nav className="mt-8 flex flex-col gap-2">
            <Link
              href="/superadmin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/superadmin/companies"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary/20"
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
            <Alert variant="destructive">
              <AlertDescription>Failed to load companies. Please try again later.</AlertDescription>
            </Alert>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-[#231F20]">
      <aside className="hidden w-64 flex-col border-r bg-dark p-4 text-dark-foreground sm:flex">
        <div className="flex items-center gap-2 p-2">
          <Bot className="h-8 w-8 text-secondary" />
          <h1 className="text-xl font-semibold">KI Cockpit</h1>
        </div>
        <nav className="mt-8 flex flex-col gap-2">
          <Link
            href="/superadmin"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/superadmin/companies"
            className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary/20"
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Manage Companies</h1>
            <Link href="/superadmin/companies/create" passHref>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Company
              </Button>
            </Link>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Companies</CardTitle>
              <CardDescription>A list of all registered companies.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companies?.map((company) => (
                  <div key={company.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">{company.companyName}</h3>
                      <p className="text-sm text-gray-500">Plan: {company.plan}</p>
                      <p className="text-sm text-gray-500">Status: {company.status}</p>
                    </div>
                    <Link href={`/superadmin/companies/${company.id}/edit`} passHref>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-3 w-3" /> Edit
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">Showing {companies?.length || 0} companies.</p>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
