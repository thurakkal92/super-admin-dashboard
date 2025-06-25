import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { companiesApi, type Company } from "@/lib/api"
import { useApp } from "@/contexts/app-context"

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: companiesApi.getAll,
  })
}

export function useCompany(id: string) {
  return useQuery({
    queryKey: ["companies", id],
    queryFn: () => companiesApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateCompany() {
  const queryClient = useQueryClient()
  const { addNotification } = useApp()

  return useMutation({
    mutationFn: companiesApi.create,
    onSuccess: (newCompany) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      addNotification({
        title: "Success",
        message: `Company "${newCompany.companyName}" created successfully`,
        type: "success",
      })
    },
    onError: (error) => {
      addNotification({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to create company",
        type: "error",
      })
    },
  })
}

export function useUpdateCompany() {
  const queryClient = useQueryClient()
  const { addNotification } = useApp()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Company> }) => companiesApi.update(id, data),
    onSuccess: (updatedCompany) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      queryClient.invalidateQueries({ queryKey: ["companies", updatedCompany.id] })
      addNotification({
        title: "Success",
        message: `Company "${updatedCompany.companyName}" updated successfully`,
        type: "success",
      })
    },
    onError: (error) => {
      addNotification({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to update company",
        type: "error",
      })
    },
  })
}

export function useDeleteCompany() {
  const queryClient = useQueryClient()
  const { addNotification } = useApp()

  return useMutation({
    mutationFn: companiesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      addNotification({
        title: "Success",
        message: "Company deleted successfully",
        type: "success",
      })
    },
    onError: (error) => {
      addNotification({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to delete company",
        type: "error",
      })
    },
  })
}
