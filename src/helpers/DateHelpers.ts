function format(date: any, format: string): string {
    if (!(date instanceof Date)) {
        date = new Date(date);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
    }

    const pad = (n: number) => n < 10 ? '0' + n : n.toString();

    const replacements: { [key: string]: string } = {
        'yyyy': date.getFullYear().toString(),
        'MM': pad(date.getMonth() + 1),
        'dd': pad(date.getDate()),
        'HH': pad(date.getHours()),
        'mm': pad(date.getMinutes()),
        'ss': pad(date.getSeconds())
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (match) => replacements[match]);
}

Date.prototype.format = function (formatText: string): string {
    return format(this, formatText);
};

export const DateHelpers = {
    format
}
