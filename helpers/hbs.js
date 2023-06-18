const moment = require('moment');

exports.formatDate = (date, format) => {
    return moment(date).format(format);
};

exports.truncateText = (str, len) => {
    if (str.length && str.length > len) {
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

exports.editIcon = (storyUser, loggedUser, storyId, floatingIcon) => {
    if (storyUser._id.toString() === loggedUser._id.toString()) {
        return floatingIcon
            ? `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            : `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
    }
    return '';
};

exports.setDropdownValue = (selectedValue, options) => {
    return options.fn(this).replace(new RegExp(` value="${selectedValue}"`), '$& selected="selected"');
};
