import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usersApi } from "@/lib/api"
import { useApp } from "@/contexts/app-context"

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getAll,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  const { addNotification } = useApp()

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      addNotification({
        title: "Success",
        message: `User "${newUser.name}" created successfully`,
        type: "success",
      })
    },
    onError: (error) => {
      addNotification({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to create user",
        type: "error",
      })
    },
  })
}
