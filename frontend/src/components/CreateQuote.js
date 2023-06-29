import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../gqloperations/mutations';
import { GET_ALL_QUOTES } from '../gqloperations/queries';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateQuote.css';
export default function CreateQuote() {
    const toastOptions = {
        position: "bottom-right",
        autoClose: "5000",
        pauseOnHover: true,
        theme: "dark",
        draggable: true
    }
    const [quote, setQuote] = useState("")
    const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
        refetchQueries: [
            'getAllQuotes',
            'getMyProfile'
        ]
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        createQuote({
            variables: {
                name: quote
            }
        })
        setQuote("");
    }
    if (loading) return <h1>Loading</h1>

    if (error) {
        console.log(error.message)
    }
    if (data) {
        console.log(data)
    }
    return (
        <div className="Ccontainer my-container">
            {
                error &&
                toast.error(`${error.message}`, toastOptions)
            }
            {
                data &&
                toast.success(`${data.quote}`, toastOptions)
            }
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={quote}
                    onChange={e => setQuote(e.target.value)}
                    placeholder="write your quote here"
                />
                <button className="btn green">create</button>
            </form>
            <ToastContainer />
        </div>
    )
}