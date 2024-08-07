// Defining an interface for the content map with translations for different languages
export interface ContentMap {
	uz: {
		all: string
		buy: string
		buy1: string
		buy2: string
		not_found_link: string
		som: string
		not_found: string
		no_product: string
		notification: string
		submit: string
		laoding: string
	}
	uzc: {
		all: string
		buy: string
		buy1: string
		buy2: string
		not_found_link: string
		som: string
		not_found: string
		no_product: string
		notification: string
		submit: string
		laoding: string
	}
	ru: {
		all: string
		buy: string
		buy1: string
		buy2: string
		not_found_link: string
		som: string
		not_found: string
		no_product: string
		notification: string
		submit: string
		laoding: string
	}
}

// Defining the content object with translations for each language
export const content: ContentMap = {
	uz: {
		buy: 'Sotib olish',
		not_found: 'Sahifa topilmadi',
		not_found_link: 'Bosh sahifaga qaytish',
		no_product: 'Mahsulot topilmadi',
		som: "so'm",
		buy1: "Savatchangiz bo'sh",
		buy2: "Lekin siz uni har doim to'ldirishingiz mumkin",
		all: 'Jami:',
		notification: "Mahsulot savatchangizga qo'shildi.",
		submit: 'Yuborish',
		laoding: 'Yuborilmoqda...',
	},
	uzc: {
		buy: 'Сотиб олиш',
		not_found: 'Саҳифа топилмади',
		not_found_link: 'Бош саҳифага қайтиш',
		no_product: 'Маҳсулот топилмади',
		som: 'сўм',
		buy1: 'Саватчангиз бўш',
		buy2: 'Лекин сиз уни хар доим тўлдиришингиз мумкин',
		all: 'Жами:',
		notification: 'Маҳсулот саватчангизга қўшилди.',
		submit: 'Юбориш',
		laoding: 'Юборилмоқда...',
	},
	ru: {
		buy: 'Купить',
		not_found: 'Страница не найдена',
		not_found_link: 'Вернуться на главную страницу',
		no_product: 'Товар не найден',
		som: 'сум',
		buy1: 'Ваша корзина пуста',
		buy2: 'Но вы всегда можете ее наполнить',
		all: 'Итого:',
		notification: 'Товар помещен в вашу корзину.',
		submit: 'Отправить',
		laoding: 'Отправляется...',
	},
}
