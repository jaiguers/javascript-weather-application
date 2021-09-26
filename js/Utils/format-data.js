const configDate = {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
}

export function formatDate(date, config = configDate) {
    return new Intl.DateTimeFormat('es', config).format(date)
}

export function formatTemp(value) {
    return `${Math.floor(value)}°`
}