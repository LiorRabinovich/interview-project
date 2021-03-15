const GOOGLE_TRANSLATE_API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

export async function getLanguages() {
    const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}/languages?key=${GOOGLE_TRANSLATE_API_KEY}`)
    return response.json()
}

export async function translate(values, target) {
    const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key: GOOGLE_TRANSLATE_API_KEY,
            q: values,
            target
        })
    })

    return response.json()
}