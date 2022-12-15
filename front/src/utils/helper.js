const truncate = function (str) {
    return str.length > 10 ? str.substring(0, 70) + '...' : str;
}

export { truncate };
