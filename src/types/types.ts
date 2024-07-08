// Defining an interface for a category item
export interface CategoryItem {
	slug: string
	image: string
	title_uz: string
	title_uzc: string
	title_ru: string
}

export interface CategoryData {
	data: any
}

export interface Item {
	id: number
	price: number
}
