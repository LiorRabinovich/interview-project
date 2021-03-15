import styles from './AppSelect.module.scss';

export function AppSelect({ active, items, loading, error, handleChange }) {
    return (
        <fieldset className={styles.root}>
            <select
                disabled={loading || error}
                onChange={(e) => handleChange(e.target.value)}
                value={active}>
                <option default>Select Language</option>
                {items.map(({ language }) => <option key={language} value={language}>{language}</option>)}
            </select>
            {error ? <div className={styles.error}>{error}</div> : null}
        </fieldset>
    )
}