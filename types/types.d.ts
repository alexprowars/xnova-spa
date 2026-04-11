export interface IUser {
	id: number
	name: string
	email: string
	race: number | null
	sex: number | null
	avatar: string | avatar | null
	photo: string | null
	locale: string
	messages: number
	queue_max: number
	vacation: string | null
	deleted_at: string | null
	quests: number
	links: number
	credits: number
	fleets_max: number
	protection: boolean
	officiers: IUserOfficier[]
	planets: IUserPlanet[]
	options: {[key: string]: any}
	technology: {[key: string]: number}
	points: {[key: string]: number}
	raids: {[key: string]: number}
}

export interface IUserPlanet {
	id: number
	name: string
	image: string
	destroyed: boolean
	galaxy: number
	system: number
	planet: number
	planet_type: number
}

export interface IUserOfficier {
	id: number
	date: string | null
}

export interface IPlanet {
	id: number
	name: string
	type: number
	image: string
	diameter: number
	field_used: number
	field_max: number
	temp_min: number
	temp_max: number
}