"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import {
  Bot,
  Building,
  Users,
  Database,
  Settings,
  LogOut,
  Bell,
  LayoutDashboard,
  ArrowLeft,
  CloudUpload,
  FileText,
  PlusCircle,
  Trash2,
  Euro,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type CompanyUser = {
  id: number
  name: string
  email: string
  role: string
  budget: string
}

const budgetOptions = ["5€", "10€", "15€", "20€", "25€", "30€", "35€", "40€", "45€", "50€", "100€"]

export default function CreateCompanyPage() {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoFileName, setLogoFileName] = useState<string>("No file chosen")
  const [users, setUsers] = useState<CompanyUser[]>([
    { id: Date.now(), name: "", email: "", role: "admin", budget: "10€" },
  ])

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0])
      setLogoFileName(event.target.files[0].name)
    } else {
      setLogoFile(null)
      setLogoFileName("No file chosen")
    }
  }

  const addUser = () => {
    setUsers([...users, { id: Date.now(), name: "", email: "", role: "admin", budget: "10€" }])
  }

  const removeUser = (id: number) => {
    if (users.length > 1) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const handleUserChange = (id: number, field: keyof CompanyUser, value: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, [field]: value } : user)))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (logoFile) {
      formData.append("logo", logoFile)
    }
    formData.append("users", JSON.stringify(users))

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
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary/20"
          >
            <Building className="h-4 w-4" />
            Companies
          </Link>
          <Link
            href="/superadmin/users/create"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
          >
            <Users className="h-4 w-4" />
            Users
          </Link>
          <Link
            href="/superadmin/datasilos/create"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-primary/20 hover:text-white"
          >
            <Database className="h-4 w-4" />
            Datasilos
          </Link>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center gap-4">
            <Link href="/" passHref>
              <Button variant="outline" size="icon" aria-label="Back to Dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-2xl font-semibold text-gray-800">Create New Company</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Superadmin" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Super Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Fill in the information below to register a new company.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information Section */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      name="companyName"
                      placeholder="Acme Corporation"
                      className="mt-1 w-full"
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-1">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" placeholder="123 Main St" className="mt-1 w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" placeholder="Anytown" className="mt-1 w-full" />
                  </div>
                  <div>
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input id="postcode" name="postcode" placeholder="12345" className="mt-1 w-full" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" placeholder="United States" className="mt-1 w-full" />
                  </div>
                </div>

                {/* Logo Upload Section */}
                <div>
                  <Label htmlFor="logo-upload">Company Logo</Label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 hover:border-primary">
                    <div className="space-y-1 text-center">
                      <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="logo-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-secondary"
                        >
                          <span>Upload a file</span>
                          <Input
                            id="logo-upload"
                            name="logo"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {logoFileName && logoFileName !== "No file chosen" && (
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                      Selected file: {logoFileName}
                    </div>
                  )}
                </div>

                {/* Company Instructions Section */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="company-instructions">Company Instructions</Label>
                    <Textarea
                      id="company-instructions"
                      name="companyInstructions"
                      placeholder="Specific instructions for this company..."
                      className="mt-1 w-full"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Account, Plan & Status Section */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="num-accounts">Number of Accounts</Label>
                    <Input
                      id="num-accounts"
                      name="numAccounts"
                      type="number"
                      placeholder="10"
                      className="mt-1 w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input id="discount" name="discount" type="number" placeholder="0" className="mt-1 w-full" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue="active">
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="plan">Plan</Label>
                    <Select name="plan">
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Company User Section - DYNAMIC */}
                <div className="pt-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4">Company Users</h3>
                  <div className="space-y-6">
                    {users.map((user, index) => (
                      <div key={user.id} className="rounded-lg border bg-gray-50 p-4 relative">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor={`user-name-${user.id}`}>User Name</Label>
                            <Input
                              id={`user-name-${user.id}`}
                              value={user.name}
                              onChange={(e) => handleUserChange(user.id, "name", e.target.value)}
                              placeholder="John Doe"
                              className="mt-1 w-full"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`user-email-${user.id}`}>User Email</Label>
                            <Input
                              id={`user-email-${user.id}`}
                              type="email"
                              value={user.email}
                              onChange={(e) => handleUserChange(user.id, "email", e.target.value)}
                              placeholder="user@acme.com"
                              className="mt-1 w-full"
                            />
                          </div>
                          <div className="md:col-span-2">
                            {" "}
                            {/* Password spans full width */}
                            <Label htmlFor={`user-password-${user.id}`}>Password</Label>
                            <Input
                              id={`user-password-${user.id}`}
                              name={`userPassword_${user.id}`}
                              type="password"
                              placeholder="••••••••"
                              className="mt-1 w-full"
                            />
                          </div>
                          {/* Role and Budget on the same line */}
                          <div>
                            <Label htmlFor={`user-role-${user.id}`}>Role</Label>
                            <Select
                              value={user.role}
                              onValueChange={(value) => handleUserChange(user.id, "role", value)}
                            >
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
                            <Label htmlFor={`user-budget-${user.id}`}>Budget</Label>
                            <Select
                              value={user.budget}
                              onValueChange={(value) => handleUserChange(user.id, "budget", value)}
                            >
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
                        </div>
                        {users.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1"
                            onClick={() => removeUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button type="button" variant="outline" onClick={addUser} className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another User
                  </Button>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit">Create Company</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
