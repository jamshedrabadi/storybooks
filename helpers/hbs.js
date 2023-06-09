const moment = require('moment');

exports.formatDate = (date, format) => {
    return moment(date).format(format);
};

exports.truncate = (str, len) => {
    if (str.len && str.len > len) {
        let newStr = str + ' ';
        newStr = str.substr(0, len);
        newStr = str.substr(0, newStr.lastIndexOf(' '));
        newStr = newStr.length ? newStr : str.substr(0, len);
        return newStr + '...';
    }
    return str;
};

exports.stripTags = (input) => {
    return input.replace(/<(?:.|\n)*?>/gm, '');
};
