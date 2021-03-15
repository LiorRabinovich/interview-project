import React from 'react';
import styles from './SingleCard.module.scss';

export function SingleCard({ title, body, postIndex, like = 0, dislike = 0, handleLike, handleDislike }) {
    return (
        <article className={styles.root}>
            <div className={styles.actions}>
                <button onClick={() => handleLike(postIndex)}>{like} 👍</button>
                <button onClick={() => handleDislike(postIndex)}>{dislike} 👎</button>
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
        </article>
    )
}