export default function manageFavorites(id: string, action: 'add' | 'remove' | 'check') {
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

    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    return favorites;
}