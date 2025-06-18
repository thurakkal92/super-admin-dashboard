"use client"

import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link" // Added Link back
import { Bot, Building, Users, Database, LayoutDashboard, Palette, Feather } from "lucide-react" // Added Bot, Building, Users, Database, LayoutDashboard back
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"

const companyOptions: ComboboxOption[] = [
  { value: "acme_corp_id", label: "Acme Corporation" },
  { value: "stark_ind_id", label: "Stark Industries" },
  { value: "wayne_ent_id", label: "Wayne Enterprises" },
  { value: "cyberdyne_id", label: "Cyberdyne Systems" },
  { value: "tyrell_corp_id", label: "Tyrell Corporation" },
]

const usersByCompany: Record<string, ComboboxOption[]> = {
  acme_corp_id: [
    { value: "user_acme_alice", label: "Alice Wonderland (Acme)" },
    { value: "user_acme_bob", label: "Bob The Builder (Acme)" },
  ],
  stark_ind_id: [
    { value: "user_stark_tony", label: "Tony Stark (Stark)" },
    { value: "user_stark_pepper", label: "Pepper Potts (Stark)" },
  ],
  wayne_ent_id: [
    { value: "user_wayne_bruce", label: "Bruce Wayne (Wayne)" },
    { value: "user_wayne_alfred", label: "Alfred Pennyworth (Wayne)" },
  ],
  cyberdyne_id: [{ value: "user_cyber_miles", label: "Miles Dyson (Cyberdyne)" }],
  tyrell_corp_id: [{ value: "user_tyrell_eldon", label: "Eldon Tyrell (Tyrell)" }],
}

export default function CreateDatasiloPage() {
  const [companyId, setCompanyId] = useState<string>("")
  const [availableOwners, setAvailableOwners] = useState<ComboboxOption[]>([])
  const [datasiloOwnerId, setDatasiloOwnerId] = useState<string>("")
  const [iconName, setIconName] = useState<string>("")
  const [colorValue, setColorValue] = useState<string>("#0056A7")

  useEffect(() => {
    if (companyId && usersByCompany[companyId]) {
      setAvailableOwners(usersByCompany[companyId])
    } else {
      setAvailableOwners([])
    }
    setDatasiloOwnerId("")
  }, [companyId])

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
            href="/superadmin/users"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
          >
            <Users className="h-4 w-4" />
            Users
          </Link>
          <Link
            href="/superadmin/datasilos" // Current section
            className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary/20"
          >
            <Database className="h-4 w-4" />
            Datasilos
          </Link>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6 pt-10 md:p-8 md:pt-10">
          <Card className="mx-auto max-w-xl">
            <CardHeader>
              <CardTitle>Create New Datasilo</CardTitle>
              <CardDescription>Define a new datasilo and associate it with a company and owner.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Label htmlFor="silo-name">Silo Name</Label>
                  <Input id="silo-name" name="siloName" placeholder="Q4 Sales Data" className="mt-1 w-full" />
                </div>
                <div>
                  <Label htmlFor="silo-description">Description</Label>
                  <Textarea
                    id="silo-description"
                    name="siloDescription"
                    placeholder="Datasilo for all Q4 2024 sales reports and related customer interactions."
                    className="mt-1 w-full"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    name="systemPrompt"
                    placeholder="You are a helpful AI assistant for analyzing sales data. Focus on trends and anomalies..."
                    className="mt-1 w-full"
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="datasilo-owner">Datasilo Owner</Label>
                  <Combobox
                    options={availableOwners}
                    value={datasiloOwnerId}
                    onChange={setDatasiloOwnerId}
                    placeholder="Select an owner..."
                    searchPlaceholder="Search users..."
                    emptyPlaceholder={companyId ? "No users found for this company." : "Please select a company first."}
                  />
                  <input type="hidden" name="datasiloOwnerId" value={datasiloOwnerId} />
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="icon-name">Icon Name</Label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Feather className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Input
                        id="icon-name"
                        name="iconName"
                        value={iconName}
                        onChange={(e) => setIconName(e.target.value)}
                        placeholder="e.g., BarChart, FileText"
                        className="pl-10 w-full"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Use names from{" "}
                      <a
                        href="https://lucide.dev/icons/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Lucide Icons
                      </a>
                      .
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="color-value">Color (Hex)</Label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Palette className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Input
                        id="color-value"
                        name="colorValue"
                        value={colorValue}
                        onChange={(e) => setColorValue(e.target.value)}
                        placeholder="#0056A7"
                        className="pl-10 w-full"
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        style={{ pointerEvents: "none" }}
                      >
                        <div
                          className="h-5 w-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: colorValue || "transparent" }}
                        />
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Enter a valid hex color code.</p>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="submit">Create Datasilo</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
