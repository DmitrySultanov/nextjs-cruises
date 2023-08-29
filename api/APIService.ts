import axios, {AxiosResponse} from "axios";
import { CITIES_DEPARTURES_ROUTE, NEWS_ROUTE, API_KEY_S, API_ROUTE, 
    API_KEY, SERVICES_ON_BOARD, PUBLIC_PLACES, PORTS, POPULAR_ROUTES, REGIONS, DISCOUNTS } from "../utils/api";

interface IGetCruises {
    city: string
    date: string
    duration: string
    lengthMin: number
    lengthMax: number
    API_KEY_S: string
    limit: number
    page: number
}

interface IGetCruiseCabinSearch {
    id: number
    adult_count: number
    retiree_count?: number
    child_place_count: number
    child_without_place_count: number
    children_age: string | string[] | any
    children_age_without_place: string | string[]
    key: string
    limit: number
    page: number
}

interface IGetPopularRouteById {
    popularRouteId: number
    date: string
    API_KEY_S: string
    limit: number
    page: number
}

interface IGetShips {
    API_KEY_S: string
    limit: number
    page: number
}

export default class APIService {
    static async getCruises(params: IGetCruises) {
        try {
            let lengthMin,
                lengthMax;
            switch (params.duration) {
                case '1':
                    lengthMin = 1;
                    lengthMax = 5;
                    break;
                case '2':
                    lengthMin = 5;
                    lengthMax = 10;
                    break;
                case '3':
                    lengthMin = 11;
                    lengthMax = 25;
                    break;
            }
    
            const response = await axios.get(API_ROUTE + `cruises`, {
                params: {
                    'startCity': params.city,
                    'dateStartFrom': params.date,
                    'lengthMin': lengthMin,
                    'lengthMax': lengthMax,
                    'key': API_KEY_S,
                    'limit': params.limit ? params.limit : 32,
                    'page': params.page ? params.page : 1,
                }
            })
            return response
        } catch (error) {
            return error
        }
    }

    static async getCruise(id: number) {
        try {
            const response = await axios.get(API_ROUTE + `cruises/${id}` + API_KEY)
            return response
        } catch (error) {
            return error
        }
    }

    static async getCruiseCabins(id: number) {
        try {
            const response = await axios.get(API_ROUTE + `cruises/${id}/cabins/` + API_KEY)
            return response
        } catch (error) {
            return error
        }
    }

    static async getCruiseCabinSearch(params: IGetCruiseCabinSearch) {
        try {
            const response = await axios.get(API_ROUTE + `cruises/${params.id}/cabins/search`, {
                params: {
                    'adult_count': params.adult_count,
                    // 'retiree_count': params.child_place_count,
                    'child_place_count': params.child_place_count,
                    'child_without_place_count': params.child_without_place_count,
                    'children_age': params.children_age.replace('%2C',','),
                    'children_age_without_place': params.children_age_without_place,
                    'key': API_KEY_S,
                    'limit': params.limit ? params.limit : 50,
                    'page': params.page ? params.page : 1,
                }
            })
            return response
        } catch (error) {
            return error
        }
    }

    static async getCities() {
        try {
            const response = await axios.get(CITIES_DEPARTURES_ROUTE)
            return response
        } catch (error) {
            return error
        }
    }

    static async getRegions() {
        try {
            const response = await axios.get(REGIONS)
            return response
        } catch (error) {
            return error
        }
    }

    static async getRegion(id: number) {
        try {
            const response = await axios.get(API_ROUTE + `regions/${id}` + API_KEY)
            return response
        } catch (error) {
            return error
        }
    }

    static async getPopularRouteById(params: IGetPopularRouteById) {
        try {
            const response = await axios.get(API_ROUTE + `cruises`, {
                params: {
                    'popularRoutes': params.popularRouteId,
                    'dateStartFrom': params.date,
                    'onlyFreeCabins': '1',
                    'key': API_KEY_S,
                    'limit': params.limit ? params.limit : 32,
                    'page': params.page ? params.page : 1,
                }
            })
            return response
        } catch (error) {
            return error
        }
    }

    static async getPopularRoutes() {
        try {
            const response = await axios.get(POPULAR_ROUTES)
            return response
        } catch (error) {
            return error
        }
    }

    static async getPopularRoute(id: number) {
        try {
            const response = await axios.get(API_ROUTE + `cruises`, {
                params: {
                    'popularRoutes': String(id),
                    'key': API_KEY_S,
                }
            })
            return response
        } catch (error) {
            return error
        }
    }

    static async getShips(params: IGetShips) {
        try {
            let response = null;
            if(params) {
                response = await axios.get(API_ROUTE + `ships-active`, {
                    params: {
                        'key': API_KEY_S,
                        'limit': params.limit ? params.limit : 24,
                        'page': params.page ? params.page : 1,
                    }
                })
            } else {
                response = await axios.get(API_ROUTE + `ships-active`, {
                    params: {
                        'key': API_KEY_S,
                        'limit': 24,
                        'page': 1,
                    }
                })
            }

            return response
        } catch (error) {
            return error
        }
    }

    static async getShip(id: number) {
        try {
            const response = await axios.get(API_ROUTE + `ships-active/${id}` + API_KEY)
            return response
        } catch (error) {
            return error
        }
    }

    static async getPorts() {
        try {
            const response = await axios.get(PORTS)
            return response
        } catch (error) {
            return error
        }
    }

    static async getPort(id: number) {
        try {
            const response = await axios.get(API_ROUTE + `ports/${id}` + API_KEY)
            return response
        } catch (error) {
            return error
        }
    }

    static async getAllNews(limit: number = 10) {
        try {
            const response: AxiosResponse<any, any> = await axios.get(NEWS_ROUTE, {
                params:{
                    'limit': limit,
                }
            })
            return response
        } catch (error) {
            return error
        }
    }

    static async getNews(id: number) {
        try {
            const response = await axios.get(API_ROUTE + `news/${id}` + API_KEY)
            return response
        } catch (error) {
            return error
        }
    }

    static async getServicesOnBoard() {
        try {
            const response = await axios.get(SERVICES_ON_BOARD)
            return response
        } catch (error) {
            return error
        }
    }

    static async getServiceOnBoard(id: number) {
        try {
            const response = await axios.get(API_ROUTE + `onboard-services/${id}` + API_KEY)
            return response
        } catch (error) {
            return error
        }
    }

    static async getPublicPlaces(limit = 50) {
        try {
            const response = await axios.get(PUBLIC_PLACES, {
                params:{
                    'limit': limit,
                }
            })

            return response
        } catch (error) {
            return error
        }
    }

    static async getDiscounts(ship: number) {
        try {
            const response = await axios.get(DISCOUNTS, {
                params:{
                    'ship': ship,
                }
            })

            return response
        } catch (error) {
            return error
        }
    }
}