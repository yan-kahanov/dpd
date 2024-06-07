export type User = {
    gender: string
    name: Name
    location: Location
    email: string
    login: Login
    dob: Dob
    registered: Registered
    phone: string
    cell: string
    id: Id
    picture: Picture
    nat: string
}

type Name = {
    title: string
    first: string
    last: string
}
type Location = {
    street: {
        number: number
        name: string
    }
    city: string
    state: string
    country: string
    postcode: string | number
    coordinates: {
        latitude: string
        longitude: string
    }
    timezone: {
        offset: string
        description: string
    }
}
type Login = {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
}

type Dob = {
    date: string
    age: number
}
type Registered = {
    date: string
    age: number
}
type Id = {
    name: string
    value: string | null
}
type Picture = {
    large: string
    medium: string
    thumbnail: string
}
