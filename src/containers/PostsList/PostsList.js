import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardsList } from '../../components/CardsList/CardsList'
import { AppSelect } from '../../components/AppSelect/AppSelect'
import styles from './PostsList.module.scss';
import {
    selectPostsItems,
    selectPostsLanguage,
    selectPostsError,
    selectPostsLoading,
    selectPostsPageSize,
    actions,
    fetchPosts,
    fetchTranslatePosts
} from '../../store/slices/posts';
import {
    selectLanguagesItems,
    selectLanguagesError,
    selectLanguagesLoading,
    fetchLanguages
} from '../../store/slices/languages';

export function PostsList() {
    const posts = useSelector(selectPostsItems);
    const postPageSize = useSelector(selectPostsPageSize);
    const postLanguage = useSelector(selectPostsLanguage);
    const postsError = useSelector(selectPostsError);
    const postsLoading = useSelector(selectPostsLoading);

    const languages = useSelector(selectLanguagesItems);
    const languagesError = useSelector(selectLanguagesError);
    const languagesLoading = useSelector(selectLanguagesLoading);

    const dispatch = useDispatch();

    function handleChangeLanguage(language) {
        dispatch(fetchTranslatePosts(language))
    }

    function handleLike(itemIndex) {
        dispatch(actions.like(itemIndex))
    }

    function handleDislike(itemIndex) {
        dispatch(actions.disLike(itemIndex))
    }

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchLanguages())
    }, [dispatch])

    return (
        <section>
            <header className={styles.root}>
                <h2>Posts</h2>
                <AppSelect
                    items={languages}
                    active={postLanguage}
                    error={languagesError}
                    loading={languagesLoading}
                    handleChange={handleChangeLanguage} />
            </header>
            <CardsList
                posts={posts}
                error={postsError}
                loading={postsLoading}
                pageSize={postPageSize}
                handleLike={handleLike}
                handleDislike={handleDislike} />
        </section>
    )
}