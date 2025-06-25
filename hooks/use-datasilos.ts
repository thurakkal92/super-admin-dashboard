import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { datasilosApi } from "@/lib/api"
import { useApp } from "@/contexts/app-context"

export function useDatasilos() {
  return useQuery({
    queryKey: ["datasilos"],
    queryFn: datasilosApi.getAll,
  })
}

export function useCreateDatasilo() {
  const queryClient = useQueryClient()
  const { addNotification } = useApp()

  return useMutation({
    mutationFn: datasilosApi.create,
    onSuccess: (newDatasilo) => {
      queryClient.invalidateQueries({ queryKey: ["datasilos"] })
      addNotification({
        title: "Success",
        message: `Datasilo "${newDatasilo.name}" created successfully`,
        type: "success",
      })
    },
    onError: (error) => {
      addNotification({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to create datasilo",
        type: "error",
      })
    },
  })
}
