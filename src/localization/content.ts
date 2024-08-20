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
		monthly: string
		month: string
		infoTitle: string
		info: string
		fieldRequired: string
		error: string
		fillAllFields: string
		success: string
		// formSubmittedSuccessfully: string
		formSubmissionError: string
		optionalField: string
		payAttention: string
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
		monthly: string
		month: string
		infoTitle: string
		info: string
		fieldRequired: string
		error: string
		fillAllFields: string
		success: string
		// formSubmittedSuccessfully: string
		formSubmissionError: string
		optionalField: string
		payAttention: string
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
		monthly: string
		month: string
		infoTitle: string
		info: string
		fieldRequired: string
		error: string
		fillAllFields: string
		success: string
		// formSubmittedSuccessfully: string
		formSubmissionError: string
		optionalField: string
		payAttention: string
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
		monthly: 'oyiga',
		month: 'oy',
		infoTitle: "Hayrli kun Iltimos, quyidagi ma'lumotlarga e'tibor bering:",
		info: "Tovaringizning narxi 3 000 000 dan oshsa, siz summaning 30 foizini oldindan to'lashingiz kerak. Bu bitim tuzishda e'tiborga olinishi kerak bo'lgan muhim qoidadir. Xaridni yakunlashdan oldin ushbu shartga rioya qilishga tayyor ekanligingizga ishonch hosil qiling. Agar sizda biron bir savol bo'lsa, tushuntirish uchun so'rashdan tortinmang.  Sizga muvaffaqiyatli xaridlar tilaymiz!",
		fieldRequired: "Bu maydon to'ldirilishi shart",
		error: 'Xatolik',
		success: 'Muvaffaqiyatli',
		fillAllFields: "Iltimos, barcha majburiy maydonlarni to'ldiring",
		formSubmissionError: "Forma yuborishda xatolik yuz berdi",
		optionalField: "Bu maydonni to'ldirish ixtiyoriy",
		payAttention: "E'tibor bering",
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
		monthly: 'ойига',
		month: 'ой',
		infoTitle: 'Қуйидаги маълумотларга эътибор беринг:',
		info: 'Товарингизнинг нархи 3 000 000 дан ошса, сиз сумманинг 30 фоизини олдиндан тўлашингиз керак. Бу битим тузишда эътиборга олиниши керак бўлган муҳим қоидатир. Харидни якунлашдан олдин ушбу шартга риоя қилишга тайёр эканлигингизга ишонч ҳосил қилинг. Агар сизда бирон бир савол бўлса, тушунтириш учун сўрашдан тортинманг. Сизга муваффақиятли харидлар тилаймиз!',
		fieldRequired: "Бу майдон тўлдирилиши шарт",
		error: 'Хатолик',
		success: 'Муваффақиятли',
		fillAllFields: "Илтимос, барча мажбурий майдонларни тўлдиринг",
		formSubmissionError: "Форма юборишда хатолик юз берди",
		optionalField: 'Бу майдонни тўлдириш ихтиёрий',
		payAttention: "Диққат қилинг",

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
		monthly: 'в месяц',	
		month: 'месяц',
		infoTitle: 'Обратите внимание на следующие условия:',
		info: 'Если стоимость вашего товара превышает 3 000 000 сум, вам необходимо внести предоплату в размере 30% от суммы. Это важное правило, которое следует учитывать при заключении сделки. Перед завершением покупки убедитесь, что вы готовы соблюдать это условие. Если у вас есть какие-либо вопросы, не стесняйтесь задать их для уточнения. Желаем вам успешных покупок!',
		fieldRequired: "Это поле обязательно для заполнения",
		error: 'Ошибка',
		success: 'Успешно',
		fillAllFields: "Пожалуйста, заполните все обязательные пол",
		formSubmissionError: "Произошла ошибка при отправке формы",
		optionalField: 'Это поле не обязательно для заполнения',
		payAttention: "Обратите внимание",

	},
}
