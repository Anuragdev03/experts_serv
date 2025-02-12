import sanitizeHtml from "sanitize-html";

export const cleanHtml = (dirtyHtml) => {
    return sanitizeHtml(dirtyHtml, {
        allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'b', 'i', 'em', 'strong', 'u',
            'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr', 'span', 'img', 'table',
            'thead', 'tbody', 'tr', 'th', 'td'
        ],
        allowedAttributes: {
            'a': ['href', 'title', 'target'],
            'img': ['src', 'alt', 'width', 'height'],
            'span': ['style'],
            'table': ['border', 'cellpadding', 'cellspacing'],
            'td': ['colspan', 'rowspan']
        },
        allowedSchemes: ['http', 'https', 'mailto'],
        allowedStyles: {
            '*': {
                'color': [/^#[0-9A-F]{3,6}$/i, /^rgb\((\d{1,3},\s*){2}\d{1,3}\)$/], // Safe color values
                'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/], // Allow text alignment
                'font-weight': [/^bold$/, /^\d{1,3}$/], // Allow bold and numeric values
                'text-decoration': [/^underline$/, /^none$/], // Allow underline
                'font-size': [/^\d+(px|em|%)$/] // Restrict font sizes
            }
        },
    });
};



