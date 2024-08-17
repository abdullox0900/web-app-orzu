import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/langContext'
import { ShoppingCartContext } from '../../context/shoppingCartContext'
import { content, ContentMap } from '../../localization/content'
import { Button, Modal, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import TelegramBackButton from '../TelegramBackButton/TelegramBackButton'

interface FormField {
    id: number
    title_uz: string
    title_uzc: string
    type: string
}

const Form: React.FC = () => {

    const navigate = useNavigate()

    const [fields, setFields] = useState<FormField[]>([])
    const [formData, setFormData] = useState<{ [key: number]: any }>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<{ [key: number]: string }>({})

    const langContext = useContext(Context)
    const context = useContext(ShoppingCartContext)

    if (!context || !langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext
    const { cartItems, clearCart, basketItems } = context

    const contents = content[lang as keyof ContentMap]

    const [chatId, setChatId] = useState<string | null>(null)

    useEffect(() => {
        const tg = window.Telegram.WebApp
        tg.MainButton.text = "Changed Text"
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            setChatId(tg.initDataUnsafe.user.id)
        }
    }, [])



    useEffect(() => {
        fetch('https://shop-bot.orzugrand.uz/api/questions')
            .then(response => response.json())
            .then(data => {
                setFields(data)
                const initialFormData = data.reduce((acc: any, field: FormField) => {
                    acc[field.id] = field.type === "3" ? null : ''
                    return acc
                }, {})
                setFormData(initialFormData)
                console.log('Initial form data:', initialFormData) // Debug
            })
            .catch(error => console.error('Error fetching form fields:', error))
    }, [])

    const handleChange = (id: number, value: any) => {
        setFormData(prevData => {
            const newData = { ...prevData, [id]: value }
            console.log('Updated form data:', newData) // Debug
            return newData
        })
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: { [key: number]: string } = {}
        fields.forEach(field => {
            if (field.id !== 10 && field.id !== 4 && field.id !== 11) {
                const value = formData[field.id]
                console.log(`Validating field ${field.id}:`, value) // Debug
                if (!value || (typeof value === 'string' && value.trim() === '')) {
                    newErrors[field.id] = 'Bu maydon to\'ldirilishi shart'
                }
            }
        })
        console.log('Validation errors:', newErrors) // Debug
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log('Form data before validation:', formData) // Debug
        if (!validateForm()) {
            console.log('Form validation failed') // Debug
            notification.error({
                message: 'Xatolik',
                description: 'Iltimos, barcha majburiy maydonlarni to\'ldiring',
            })
            return
        }
        console.log('Form validation passed') // Debug
        setLoading(true)
        const cartSlugs = cartItems.map(item => item.slug)

        const answers = fields.map(field => {
            if (field.id === 11) {
                const basketItemsData = basketItems.map(item => ({
                    slug: item.productSlug,
                    price: item.monthlyPayment,
                    month: item.selectedTerm
                }))

                const totalPrice = basketItems.reduce((sum, item) => sum + item.monthlyPayment * item.selectedTerm, 0)
                const maxMonth = Math.max(...basketItems.map(item => item.selectedTerm))

                return {
                    question_id: 11,
                    answer: JSON.stringify(basketItemsData),
                    month: maxMonth
                }
            } else {
                return { question_id: field.id, answer: formData[field.id] }
            }
        })

        const submissionData = {
            chat_id: chatId || 6521958457,
            answers: answers
        }

        console.log('Submission data:', submissionData) // Debug

        axios.post('https://shop-bot.orzugrand.uz/api/setAnswer', submissionData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => {
                if (response.status == 200) {
                    console.log('Form submitted successfully') // Debug
                    notification.success({
                        message: 'Muvaffaqiyatli',
                        description: 'Forma muvaffaqiyatli yuborildi',
                    })
                    window.Telegram.WebApp.close()
                    clearCart()
                }
                console.log('Server response:', response.data) // Debug
            })
            .catch(error => {
                console.error('Error submitting form:', error)
                notification.error({
                    message: 'Xatolik',
                    description: 'Forma yuborishda xatolik yuz berdi',
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const renderInputField = (field: FormField) => {
        switch (field.type) {
            case "2":
                return (
                    <div>
                        <input
                            type="text"
                            className={`border-[1px] ${errors[field.id] ? 'border-red-500' : 'border-slate-200'} w-full p-[10px] rounded-[10px] outline-none`}
                            value={formData[field.id] || ''}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                        />
                        {errors[field.id] && <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>}
                        {(field.id === 10 || field.id === 4 || field.id === 11) && (
                            <p className="text-gray-500 text-sm mt-1">Bu maydonni to'ldirish ixtiyoriy</p>
                        )}
                    </div>
                )
            case "3":
                return (
                    <div>
                        <input
                            type="file"
                            className={`p-[10px] ${errors[field.id] ? 'border-red-500' : ''}`}
                            onChange={(e) => handleChange(field.id, e.target.files ? e.target.files[0] : null)}
                        />
                        {errors[field.id] && <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>}
                        {(field.id === 10 || field.id === 4 || field.id === 11) && (
                            <p className="text-gray-500 text-sm mt-1">Bu maydonni to'ldirish ixtiyoriy</p>
                        )}
                    </div>
                )
            default:
                return null
        }
    }

    const info = () => {
        Modal.info({
          title: 'Добрый день! Обратите внимание на следующую информацию:',
          content: (
            <div>
              <p>Если стоимость вашего товара превышает 3 000 000, вам необходимо внести предоплату в размере 20% от суммы. Это важное правило, которое следует учитывать при совершении сделки.</p>
              <p>Пожалуйста, убедитесь, что вы готовы выполнить это условие перед оформлением покупки. Если у вас возникнут вопросы, не стесняйтесь обращаться за разъяснениями.</p>
              <p>Желаем вам успешных покупок!</p>
            </div>
          ),
          onOk() {},
        });
      };
      

    return (
        <>
           <Button onClick={info} className='mx-[20px]'>Обратите внимание</Button>
           <TelegramBackButton />
            <form onSubmit={handleSubmit} className='flex flex-col gap-[20px] p-[20px]'>
                {fields.slice(1).map(field => (
                    <div key={field.id} className='flex flex-col gap-[5px]'>
                        <label className='text-gray-500 text-[14px]' dangerouslySetInnerHTML={{ __html: field.title_uz }}></label>
                        {renderInputField(field)}
                    </div>
                ))}
                <button disabled={loading} type="submit" className="w-full text-center bg-orange-500 px-[20px] py-[15px] text-white rounded-[10px]">
                    {loading ? contents.laoding : contents.submit}
                </button>
            </form>
        </>
    )
}

export default Form