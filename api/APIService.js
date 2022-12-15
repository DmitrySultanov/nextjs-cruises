import axios from "axios";
import { CITIES_DEPARTURES_ROUTE, NEWS_ROUTE, API_KEY_S, API_ROUTE, 
    API_KEY, SERVICES_ON_BOARD, PUBLIC_PLACES, PORTS, POPULAR_ROUTES, SHIPS } from "../utils/api";

export default class APIService {
    static async getCruises(params) {
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
                'limit': params.limit ? params.limit : 50,
                'page': params.page ? params.page : 1,
            }
        })
        return response
    }

    static async getCruise(id) {
        const response = await axios.get(API_ROUTE + `cruises/${id}` + API_KEY)
        return response
    }

    static async getCruiseCabins(id) {
        const response = await axios.get(API_ROUTE + `cruises/${id}/cabins/` + API_KEY)
        return response
    }

    static async getCruiseCabinSearch(params) {
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
        const response = await axios.get(CITIES_DEPARTURES_ROUTE)
        return response
    }

    static async getPopularRoutes() {
        const response = await axios.get(POPULAR_ROUTES)
        return response
    }

    static async getPopularRoute(id) {
        const response = await axios.get(API_ROUTE + `cruises`, {
            params: {
                'popularRoutes': String(id),
                'key': API_KEY_S,
            }
        })
        return response
    }

    static async getShips() {
        const response = await axios.get(SHIPS)
        return response
    }

    static async getShip(id) {
        const response = await axios.get(API_ROUTE + `ships/${id}` + API_KEY)
        return response
    }

    static async getPorts() {
        const response = await axios.get(PORTS)
        return response
    }

    static async getPort(id) {
        const response = await axios.get(API_ROUTE + `ports/${id}` + API_KEY)
        return response
    }

    static async getAllNews(limit = 10) {
        const response = await axios.get(NEWS_ROUTE, {
            params:{
                'limit': limit,
            }
        })
        return response
    }

    static async getNews(id) {
        const response = await axios.get(API_ROUTE + `news/${id}` + API_KEY)
        return response
    }

    static async getServicesOnBoard() {
        const response = await axios.get(SERVICES_ON_BOARD)
        return response
    }

    static async getServiceOnBoard(id) {
        const response = await axios.get(API_ROUTE + `onboard-services/${id}` + API_KEY)
        return response
    }

    static async getPublicPlaces(limit = 50) {
        const response = await axios.get(PUBLIC_PLACES, {
            params:{
                'limit': limit,
            }
        })
        return response
    }
}