const validText = str => {
    return typeof str === 'string' && str.trim().length > 0;
}

module.exports = validText;

// a function that just checks if the input is a string and if the trimmed string (removed whitespace chars) has a length of greater than 0 