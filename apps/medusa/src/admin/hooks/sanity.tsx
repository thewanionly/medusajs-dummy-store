import { sdk } from "../lib/sdk"

export const useTriggerSanityProductSync = (id: string) => {
  const triggerSync = async () => {
    return await sdk.client.fetch(`/admin/sanity/documents/${id}/sync`, {
      method: "post",
    })
  }

  return { triggerSync }
}

export const useSanityDocument = (id: string) => {
  const fetchDocument = async () => {
    return await sdk.client.fetch<{
      sanity_document: Record<string, unknown>;
      studio_url: string;
    }>(`/admin/sanity/documents/${id}`)
  }

  return { fetchDocument }
}

export const useTriggerSanitySync = () => {
  const triggerSync = async () => {
    return await sdk.client.fetch(`/admin/sanity/syncs`, {
      method: "post",
    })
  }

  return { triggerSync }
}

export const useSanitySyncs = () => {
  const fetchSyncs = async () => {
    return await sdk.client.fetch<{
      workflow_executions: Record<string, unknown>[];
      count: number;
    }>(`/admin/sanity/syncs`)
  }

  return { fetchSyncs }
}
