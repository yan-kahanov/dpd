import type { User } from '../types'
import type { ListResp, ListParams } from '@/shared/types'
import users from './users.json'

export const getUsers = ({ page, perPage, search = '' }: ListParams): Promise<ListResp<User>> => {
    return new Promise((resolve) => {
        const getStringValues = (obj: User) => {
            let str = ''

            const recusive = <T>(obj: T) => {
                for (const key in obj) {
                    if (typeof obj[key] === 'object') {
                        recusive(obj[key])
                    } else if (typeof obj[key] === 'string') {
                        str += obj[key] + ' '
                    }
                }
            }
            recusive(obj)

            return str
        }

        const searchFilter = users.results.filter((obj) => (
            getStringValues(obj).match(new RegExp(search, 'gi'))
        ))
        resolve({
            items: searchFilter.slice((page - 1) * perPage, page * perPage),
            totalPages: Math.ceil(searchFilter.length / perPage),
            page,
            perPage
        })
    })
}
