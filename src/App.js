import React, { Fragment } from 'react';
import { PostsList } from './containers/PostsList/PostsList'

export function App() {
    return (
        <Fragment>
            <header>
                <h1>Interview Project</h1>
            </header>
            <main className="container">
                <PostsList />
            </main>
        </Fragment>
    )
}