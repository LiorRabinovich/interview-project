import { Fragment, useState, useEffect } from 'react';
import { SingleCard } from '../SingleCard/SingleCard';
import styles from './CardsList.module.scss';

function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
};

export function CardsList({ posts, error, loading, handleLike, handleDislike, pageSize }) {
    const [displayPosts, setDisplayPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setDisplayPosts(posts.slice(0, page * pageSize));
    }, [posts, page, pageSize])

    useEffect(() => {
        function handleScroll() {
            if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
            setPage(page => page + 1);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Fragment>
            {error ? <div className={styles.error}>Error: {error}</div> : null}
            <ul className={styles.root}>
                {displayPosts.map((post, postIndex) => (
                    <li key={postIndex}><SingleCard {...post} postIndex={postIndex} handleLike={handleLike} handleDislike={handleDislike} /></li>
                ))}
            </ul>
        </Fragment>
    )
}