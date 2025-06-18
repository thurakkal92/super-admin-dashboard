"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link" // Added Link back
import {
  Bot,
  Building,
  Users,
  Database,
  LayoutDashboard,
  CloudUpload,
  FileText,
  PlusCircle,
  Trash2,
  Euro,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

type CompanyUser = {
  id: string | number
  name: string
  email: string
  role: string
  budget: string
  password?: string
}

const budgetOptions = ["5€", "10€", "15€", "20€", "25€", "30€", "35€", "40€", "45€", "50€", "100€"]

const MOCK_COMPANIES_DATA: Record<string, any> = {
  "acme-corp-123": {
    id: "acme-corp-123",
    companyName: "Acme Corporation (Existing)",
    address: "123 Main St",
    city: "Anytown",
    postcode: "12345",
    country: "United States",
    logoUrl: "/placeholder.svg?height=100&width=200",
    companyInstructions: "Handle with care, VIP client.",
    numAccounts: 25,
    discount: 5,
    status: "active",
    plan: "business",
    users: [
      { id: "user-alice-456", name: "Alice Wonderland", email: "alice@acme.com", role: "admin", budget: "50€" },
      { id: "user-bob-789", name: "Bob The Builder", email: "bob@acme.com", role: "user", budget: "20€" },
    ],
  },
  "stark-industries-456": {
    id: "stark-industries-456",
    companyName: "Stark Industries (Existing)",
    address: "1 Stark Tower",
    city: "New York",
    postcode: "10001",
    country: "United States",
    logoUrl: "/placeholder.svg?height=100&width=200",
    companyInstructions: "Top secret projects. High security.",
    numAccounts: 100,
    discount: 0,
    status: "active",
    plan: "enterprise",
    users: [{ id: "user-tony-001", name: "Tony Stark", email: "tony@stark.com", role: "admin", budget: "100€" }],
  },
}

export default function EditCompanyPage() {
  const params = useParams()
  const router = useRouter()
  const companyId = params.id as string

  const [companyName, setCompanyName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postcode, setPostcode] = useState("")
  const [country, setCountry] = useState("")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoFileName, setLogoFileName] = useState<string>("No file chosen")
  const [existingLogoUrl, setExistingLogoUrl] = useState<string | null>(null)
  const [companyInstructions, setCompanyInstructions] = useState("")
  const [numAccounts, setNumAccounts] = useState<number | string>("")
  const [discount, setDiscount] = useState<number | string>("")
  const [status, setStatus] = useState("active")
  const [plan, setPlan] = useState("free")
  const [users, setUsers] = useState<CompanyUser[]>([
    { id: Date.now(), name: "", email: "", role: "admin", budget: "10€" },
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (companyId) {
      setIsLoading(true)
      setTimeout(() => {
        const data = MOCK_COMPANIES_DATA[companyId]
        if (data) {
          setCompanyName(data.companyName)
          setAddress(data.address)
          setCity(data.city)
          setPostcode(data.postcode)
          setCountry(data.country)
          setExistingLogoUrl(data.logoUrl)
          setLogoFileName(data.logoUrl ? "Current logo" : "No file chosen")
          setCompanyInstructions(data.companyInstructions)
          setNumAccounts(data.numAccounts)
          setDiscount(data.discount)
          setStatus(data.status)
          setPlan(data.plan)
          setUsers(data.users.map((u: any) => ({ ...u, id: u.id || Date.now() })))
        } else {
          toast({ title: "Error", description: "Company not found.", variant: "destructive" })
        }
        setIsLoading(false)
      }, 500)
    }
  }, [companyId, router])

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0])
      setLogoFileName(event.target.files[0].name)
      setExistingLogoUrl(null)
    } else {
      if (existingLogoUrl) setLogoFileName("Current logo")
      else setLogoFileName("No file chosen")
      setLogoFile(null)
    }
  }

  const addUser = () => {
    setUsers([...users, { id: Date.now(), name: "", email: "", role: "admin", budget: "10€" }])
  }

  const removeUser = (id: string | number) => {
    if (users.length > 1) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const handleUserChange = (id: string | number, field: keyof CompanyUser, value: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, [field]: value } : user)))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (logoFile) {
      formData.append("logo", logoFile)
    } else if (existingLogoUrl) {
      formData.append("existingLogoUrl", existingLogoUrl)
    }
    formData.append("users", JSON.stringify(users))
    formData.append("companyId", companyId)

    console.log("Updating company:", companyId)
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }
    toast({ title: "Success", description: "Company details updated." })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">Loading company details...</div>
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
        {/* HEADER REMOVED */}
        <main className="flex-1 p-6 pt-10 md:p-8 md:pt-10">
          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <CardTitle>Edit Company</CardTitle>
              <CardDescription>Update the information for {companyName || "this company"}.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields remain the same */}
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    name="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Corporation"
                    className="mt-1 w-full"
                  />
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-1">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St"
                      className="mt-1 w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Anytown"
                      className="mt-1 w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input
                      id="postcode"
                      name="postcode"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="12345"
                      className="mt-1 w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="United States"
                      className="mt-1 w-full"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="logo-upload">Company Logo</Label>
                  {existingLogoUrl && !logoFile && (
                    <div className="mt-2 mb-2">
                      <p className="text-sm text-gray-600">Current logo:</p>
                      <img
                        src={existingLogoUrl || "/placeholder.svg"}
                        alt="Current company logo"
                        className="max-h-20 rounded border"
                      />
                    </div>
                  )}
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 hover:border-primary">
                    <div className="space-y-1 text-center">
                      <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="logo-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-secondary"
                        >
                          <span>{existingLogoUrl ? "Change logo" : "Upload a file"}</span>
                          <Input
                            id="logo-upload"
                            name="logo"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </label>
                        {!existingLogoUrl && <p className="pl-1">or drag and drop</p>}
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {logoFileName && logoFileName !== "Current logo" && (
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                      Selected file: {logoFileName}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="company-instructions">Company Instructions</Label>
                  <Textarea
                    id="company-instructions"
                    name="companyInstructions"
                    value={companyInstructions}
                    onChange={(e) => setCompanyInstructions(e.target.value)}
                    placeholder="Specific instructions for this company..."
                    className="mt-1 w-full"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="num-accounts">Number of Accounts</Label>
                    <Input
                      id="num-accounts"
                      name="numAccounts"
                      type="number"
                      value={numAccounts}
                      onChange={(e) => setNumAccounts(e.target.value)}
                      placeholder="10"
                      className="mt-1 w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="0"
                      className="mt-1 w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" value={status} onValueChange={setStatus}>
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
                    <Select name="plan" value={plan} onValueChange={setPlan}>
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

                <div className="pt-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4">Company Users</h3>
                  <div className="space-y-6">
                    {users.map((user) => (
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
                            <Label htmlFor={`user-password-${user.id}`}>
                              Password <span className="text-xs text-gray-500">(Leave blank to keep unchanged)</span>
                            </Label>
                            <Input
                              id={`user-password-${user.id}`}
                              name={`userPassword_${user.id}`}
                              type="password"
                              placeholder="••••••••"
                              className="mt-1 w-full"
                            />
                          </div>
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
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
