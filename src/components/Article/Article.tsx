import type { ArticleState } from "./use-article.ts";


const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (error) {
        console.error("Error formatting date:", error);
        // Fallback to just showing the date part of the ISO string
        return dateString.split('T')[0] || 'N/A';
    }
};

export const Article = ({
                            source,
                            author,
                            title,
                            description,
                            url,
                            urlToImage,
                            publishedAt,
                            content
                        }: ArticleState) => {

    return (
        <div className="article-container">
            <h1 className="article-title">{title || 'No Title'}</h1>
            <div className="article-meta">
                {author && <span className="author">By: {author}</span>}
                {publishedAt && <span className="published-date">Published: {formatDate(publishedAt)}</span>}
                {source && source.name && (
                    <span className="source">
                        Source: <span className="source-name">{source.name}</span>
                    </span>
                )}
            </div>

            {urlToImage && (
                <img
                    className="article-image"
                    src={urlToImage}
                    alt={`Image for ${title || 'article'}`}
                />
            )}

            {description && <p className="article-description">{description}</p>}

            <div className="article-content">
                {content}
            </div>

            {url && (
                <div className="article-link">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Read Full Article
                    </a>
                </div>
            )}
        </div>)
}