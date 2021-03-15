const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';

export async function getPosts() {
    const response = await fetch(POSTS_API)
    return response.json()
}