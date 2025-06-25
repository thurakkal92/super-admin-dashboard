// API functions for React Query
export interface Company {
  id: string
  companyName: string
  address: string
  city: string
  postcode: string
  country: string
  logoUrl?: string
  companyInstructions: string
  numAccounts: number
  discount: number
  status: "active" | "inactive" | "pending"
  plan: "free" | "business" | "enterprise"
  users: CompanyUser[]
}

export interface CompanyUser {
  id: string | number
  name: string
  email: string
  role: string
  budget: string
  password?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  budget: string
  companyId: string
  companyName: string
}

export interface Datasilo {
  id: string
  name: string
  description: string
  systemPrompt: string
  companyId: string
  ownerId: string
  iconName: string
  colorValue: string
  createdAt: Date
}

// Mock data
const MOCK_COMPANIES: Company[] = [
  {
    id: "acme-corp-123",
    companyName: "Acme Corporation",
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
  {
    id: "stark-industries-456",
    companyName: "Stark Industries",
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
]

// API functions
export const companiesApi = {
  getAll: async (): Promise<Company[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
    return MOCK_COMPANIES
  },

  getById: async (id: string): Promise<Company> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const company = MOCK_COMPANIES.find((c) => c.id === id)
    if (!company) {
      throw new Error("Company not found")
    }
    return company
  },

  create: async (data: Omit<Company, "id">): Promise<Company> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newCompany: Company = {
      ...data,
      id: `company-${Date.now()}`,
    }
    MOCK_COMPANIES.push(newCompany)
    return newCompany
  },

  update: async (id: string, data: Partial<Company>): Promise<Company> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const index = MOCK_COMPANIES.findIndex((c) => c.id === id)
    if (index === -1) {
      throw new Error("Company not found")
    }
    MOCK_COMPANIES[index] = { ...MOCK_COMPANIES[index], ...data }
    return MOCK_COMPANIES[index]
  },

  delete: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = MOCK_COMPANIES.findIndex((c) => c.id === id)
    if (index === -1) {
      throw new Error("Company not found")
    }
    MOCK_COMPANIES.splice(index, 1)
  },
}

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    // Flatten users from all companies
    return MOCK_COMPANIES.flatMap((company) =>
      company.users.map((user) => ({
        ...user,
        id: user.id.toString(),
        companyId: company.id,
        companyName: company.companyName,
      })),
    )
  },

  create: async (data: Omit<User, "id">): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newUser: User = {
      ...data,
      id: `user-${Date.now()}`,
    }
    // Add to company's users array
    const company = MOCK_COMPANIES.find((c) => c.id === data.companyId)
    if (company) {
      company.users.push(newUser)
    }
    return newUser
  },
}

export const datasilosApi = {
  getAll: async (): Promise<Datasilo[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return [
      {
        id: "ds-1",
        name: "Q4 Sales Data",
        description: "Sales data for Q4 2024",
        systemPrompt: "You are a sales data analyst...",
        companyId: "acme-corp-123",
        ownerId: "user-alice-456",
        iconName: "BarChart",
        colorValue: "#0056A7",
        createdAt: new Date(),
      },
    ]
  },

  create: async (data: Omit<Datasilo, "id" | "createdAt">): Promise<Datasilo> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      ...data,
      id: `ds-${Date.now()}`,
      createdAt: new Date(),
    }
  },
}
