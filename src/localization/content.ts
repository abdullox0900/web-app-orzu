export interface ContentMap {
	uz: {
		all: string
		buy1: string
		buy2: string
		not_found_link: string
		som: string
		not_found: string
		no_product: string
		// Boshqa kerakli xususiyatlar
	}
	uzc: {
		all: string
		buy1: string
		buy2: string
		not_found_link: string
		som: string
		not_found: string
		no_product: string
		// Boshqa kerakli xususiyatlar
	}
	ru: {
		all: string
		buy1: string
		buy2: string
		not_found_link: string
		som: string
		not_found: string
		no_product: string
		// Boshqa kerakli xususiyatlar
	}
}

export const content: ContentMap = {
	uz: {
		not_found: 'Sahifa topilmadi',
		not_found_link: 'Bosh sahifaga qaytish',
		no_product: 'Mahsulot topilmadi',
		som: "so'm",
		buy1: "Savatchangiz bo'sh",
		buy2: "Lekin siz uni har doim to'ldirishingiz mumkin",
		all: 'Jami:',
	},
	uzc: {
		not_found: 'Саҳифа топилмади',
		not_found_link: 'Бош саҳифага қайтиш',
		no_product: 'Маҳсулот топилмади',
		som: 'сўм',
		buy1: 'Саватчангиз бўш',
		buy2: 'Лекин сиз уни хар доим тўлдиришингиз мумкин',
		all: 'Jami:',
	},
	ru: {
		not_found: 'Страница не найдена',
		not_found_link: 'Вернуться на главную страницу',
		no_product: 'Товар не найден',
		som: 'сум',
		buy1: 'Ваша корзина пуста',
		buy2: 'Но вы всегда можете ее наполнить',
		all: 'Jami:',
	},
}
