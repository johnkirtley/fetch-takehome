export default function manageFavorites(id?: string, action?: 'add' | 'remove' | 'check' | 'get') {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (action === 'add') {
        favorites = [...favorites, id];
    }
    
    if (action === 'remove') {
        favorites = favorites.filter((favorite: string) => favorite !== id);
    } 
    
    if (action === 'check') {
        return favorites.includes(id);
    }

    if (action === 'get') {
        return favorites;
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    return favorites;
}