function encrypt(word) {
    return btoa(word);
}

function decrypt(word){
    return atob(word);
}