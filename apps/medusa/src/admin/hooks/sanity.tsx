import { useState, useCallback } from "react"
import { sdk } from "../lib/sdk"

export const useTriggerSanityProductSync = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const mutateAsync = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await sdk.client.fetch(`/admin/sanity/documents/${id}/sync`, {
        method: "post",
      })
      return result
    } finally {
      setIsLoading(false)
    }
  }, [id])

  return { mutateAsync, isPending: isLoading }
}

export const useSanityDocument = (id: string) => {
  const [data, setData] = useState<{
    sanity_document?: Record<string, unknown>;
    studio_url?: string;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const fetchDocument = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await sdk.client.fetch<{
        sanity_document: Record<string, unknown>;
        studio_url: string;
      }>(`/admin/sanity/documents/${id}`)
      setData(result)
      return result
    } finally {
      setIsLoading(false)
    }
  }, [id])

  return { 
    sanity_document: data?.sanity_document, 
    studio_url: data?.studio_url, 
    isLoading,
    fetchDocument 
  }
}

export const useTriggerSanitySync = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const mutateAsync = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await sdk.client.fetch(`/admin/sanity/syncs`, {
        method: "post",
      })
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { mutateAsync, isPending: isLoading }
}

export const useSanitySyncs = () => {
  const [data, setData] = useState<{
    workflow_executions?: Record<string, unknown>[];
    count?: number;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const fetchSyncs = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await sdk.client.fetch<{
        workflow_executions: Record<string, unknown>[];
        count: number;
      }>(`/admin/sanity/syncs`)
      setData(result)
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refetch = fetchSyncs

  return { 
    workflow_executions: data?.workflow_executions, 
    count: data?.count,
    isLoading,
    fetchSyncs,
    refetch
  }
}
