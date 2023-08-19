export interface ILayoutPageClass {
    class: string
}

export interface IType {
    amenities?: {
        id: number
        name: string
    }
    class?: {
        id: number
        name: string
    }
    description?: string
    group?: number
    id: number
    inRoomServices?: string
    isEko?: boolean
    name?: string
    photos?: string[]
    position?: string
}