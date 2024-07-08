import axios from 'axios' // Importing axios for making HTTP requests
import React, { useContext, useEffect, useState } from 'react' // Importing React and necessary hooks
import { Context } from '../../context/langContext' // Importing language context
import { ShoppingCartContext } from '../../context/shoppingCartContext' // Importing shopping cart context
import { content, ContentMap } from '../../localization/content' // Importing localization content

// Defining interface for form fields
interface FormField {
    id: number
    title_uz: string
    title_uzc: string
    type: string
}

// Functional component Form
const Form: React.FC = () => {
    // State variables for form fields, form data, loading state
    const [fields, setFields] = useState<FormField[]>([])
    const [formData, setFormData] = useState<{ [key: number]: any }>({})
    const [loading, setLoading] = useState<boolean>(false)

    // Using language context and shopping cart context
    const langContext = useContext(Context)
    const context = useContext(ShoppingCartContext)

    // Throwing error if context is not within provider
    if (!context) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext
    const { cartItems, clearCart } = context

    const contents = content[lang as keyof ContentMap]

    const [chatId, setChatId] = useState<string | null>(null)

    // useEffect hook to initialize Telegram WebApp and set chat ID
    useEffect(() => {
        const tg = window.Telegram.WebApp
        tg.MainButton.text = "Changed Text"
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            setChatId(tg.initDataUnsafe.user.id)
        }
    }, [])

    // useEffect hook to fetch form fields from API
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
            })
            .catch(error => console.error('Error fetching form fields:', error))
    }, [])

    // Handler function to update form data
    const handleChange = (id: number, value: any) => {
        setFormData({ ...formData, [id]: value })
    }

    // Handler function to submit the form
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        const cartSlugs = cartItems.map(item => item.slug)

        const answers = {
            ...fields.map(field => {
                if (field.id === 11) {
                    return { question_id: 11, answer: cartSlugs.join(' ') }
                } else {
                    return { question_id: field.id, answer: formData[field.id] }
                }
            })
        }

        const submissionData = {
            chat_id: chatId,
            answers: answers
        }

        // Posting form data to API
        axios.post('https://shop-bot.orzugrand.uz/api/setAnswer', submissionData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => {
                if (response.status == 200) {
                    window.Telegram.WebApp.close()
                    clearCart()
                }
                console.log('Form submitted successfully:', response.data)
            })
            .catch(error => {
                console.error('Error submitting form:', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // Function to render input fields based on their type
    const renderInputField = (field: FormField) => {
        switch (field.type) {
            case "2":
                return (
                    <input
                        type="text"
                        className='border-[1px] border-slate-200 w-full p-[10px] rounded-[10px] outline-none'
                        value={formData[field.id] || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                )
            case "3":
                return (
                    <input
                        type="file"
                        className='p-[10px]'
                        onChange={(e) => handleChange(field.id, e.target.files ? e.target.files[0] : null)}
                    />
                )
            default:
                return null
        }
    }

    // Rendering the form with input fields and submit button
    return (
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
    )
}

export default Form
