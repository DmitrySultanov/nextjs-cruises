interface IIDName {
    id: number
    name: string
}

export interface ILayoutPageClass {
    class: string
}

export interface IType {
    amenities?: IIDName
    class?: IIDName
    description?: string
    group?: number
    id: number
    inRoomServices?: string
    isEko?: boolean
    name?: string
    photos?: string[]
    position?: string
}

export interface ISliderPhoto {
    id?: number
    description?: string
    filename: string
    filesize?: number
    filetype?: string
    position?: number
}

interface IShipFilesType {
    name: string
    path: string
    size: string
    type: string
}

export interface IShipFiles {
    captainPhoto?: IShipFilesType
    cruiseDirectorPhoto?: IShipFilesType
    photo?: IShipFilesType
    restaurantDirectorPhoto?: IShipFilesType
    scheme?: IShipFilesType
    schemeEn?: IShipFilesType
    schemeFlash?: IShipFilesType
}

export interface IShipInfo {
    name: string
    typeName?: string
    photos: ISliderPhoto[]
    descriptionBig: string
    cabinTypes: IType[]
    files: IShipFiles
}

interface ICabinsPlaces {
    discount: []
    place_index: number
    place_type: number
    price: number
    status: number
}

export interface ICabins {
    cabin_id: string
    cabin_name: string
    category: IIDName
    deck: IIDName
    places: ICabinsPlaces[]
    total: number
}

interface ICruiseShipDeck extends IIDName {
    position: number
}

interface ICruiseShipPhoto {
    name: string
    path: string
    size: string
    type: string
}

interface ICruiseShipSug {
    id: number
    type: number
    title: string
    priority: number
    icon: string
    descr: string
}

export interface ICruise {
    additional: string
    beautifulName?: string
    childAge: string
    cruise_flags?: string
    cruise_time_avaliable: number
    currency: number
    dateEnd: string
    dateEndTimestamp: number
    dateStart: string
    dateStartTimestamp: number
    days: number
    description?: string
    discounts: object[]
    discountsText?: string
    dockStart?: string
    freeCabins: number
    id: number
    important?: string
    include: string
    infantAge: string
    isStepByStepCabinSearch?: string
    map: string
    maxDiscount: number
    max_price: number
    max_price_absolute: number
    minDefaultPrice: number
    min_price: number
    min_price_absolute: number
    min_price_rur: number
    name: string
    nights: number
    noPlaceChildAge?: string
    notesExcursions?: string
    oneMoreDayStop: boolean
    oneWay: boolean
    photo?: string[] | string
    popularRoutes: IIDName | IIDName[]
    portEnd: number
    portStart: number
    prices: {
        bsoz?: string
        infoflotBonus: number
        min: number
        old: number
    }
    rate: number
    regions: IIDName
    rivers: IIDName | IIDName[]
    route: string
    routeBottomText?: string
    routeShort: string
    russian_squad?: string
    russian_squad_title?: []
    ship: {
        cabins?: ICabins[]
        decks: ICruiseShipDeck[]
        id: number
        moscow_time: number
        name: string
        operatorBrandName?: string
        operatorId: number
        operatorName: string
        photo: ICruiseShipPhoto
        type: number
    }  
    shipType: number
    startCity: number
    startCityCountry: number
    startCityName: string
    startCityNameEn: string
    sug: ICruiseShipSug[]
    suggestion: boolean
    tags?: []
    timetableDoc: string
    timetablePdf: string
    type: IIDName
    weekend?: string
    without_visa?: string
}