const helper = {

    formattedMinutes: (value) => {
        let second = value % 60;
        let minute = Math.floor(value / 60);
        second = second < 10 ? '0' + second : second; 

        return `${minute}:${second}`;
    }
}

module.exports = helper;