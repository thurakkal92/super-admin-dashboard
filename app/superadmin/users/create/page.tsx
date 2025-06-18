"use client"

import { useState } from "react"
import type React from "react"
import Link from "next/link" // Added Link back
import { Bot, Building, Users, Database, LayoutDashboard, Euro } from "lucide-react" // Added Bot, Building, Users, Database, LayoutDashboard back
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"

const budgetOptions = ["5€", "10€", "15€", "20€", "25€", "30€", "35€", "40€", "45€", "50€", "100€"]

const companyOptions: ComboboxOption[] = [
  { value: "acme_corp_id", label: "Acme Corporation" },
  { value: "stark_ind_id", label: "Stark Industries" },
  { value: "wayne_ent_id", label: "Wayne Enterprises" },
  { value: "cyberdyne_id", label: "Cyberdyne Systems" },
  { value: "tyrell_corp_id", label: "Tyrell Corporation" },
]

export default function CreateUserPage() {
  const [companyId, setCompanyId] = useState<string>("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }
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
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
          >
            <Building className="h-4 w-4" />
            Companies
          </Link>
          <Link
            href="/superadmin/users" // Current section
            className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary/20"
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
          <Card className="mx-auto max-w-lg">
            <CardHeader>
              <CardTitle>Create New User</CardTitle>
              <CardDescription>
                Fill in the information to create a new user and assign them to a company.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="user-name">Name</Label>
                  <Input id="user-name" name="userName" placeholder="Jane Smith" className="mt-1 w-full" />
                </div>
                <div>
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    name="userEmail"
                    type="email"
                    placeholder="jane.s@acme.com"
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    name="userPassword"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Combobox
                    options={companyOptions}
                    value={companyId}
                    onChange={setCompanyId}
                    placeholder="Select a company..."
                    searchPlaceholder="Search companies..."
                    emptyPlaceholder="No company found."
                  />
                  <input type="hidden" name="companyId" value={companyId} />
                </div>
                <div>
                  <Label htmlFor="user-role">Role</Label>
                  <Select name="userRole" defaultValue="user">
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="user-budget">Budget</Label>
                  <Select name="userBudget" defaultValue="10€">
                    <SelectTrigger className="mt-1 w-full">
                      <Euro className="h-4 w-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="submit">Create User</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
