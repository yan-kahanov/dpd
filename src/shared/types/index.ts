export type ListParams = {
    page: number
    perPage: number
    search?: string
}

export type ListResp<T> = {
    items: T[]
    totalPages: number
    perPage: number
    page: number
}