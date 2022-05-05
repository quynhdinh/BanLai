const moneyFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đ';
};

const getReadableTimeGap = (mili) => {
    let seconds = ((new Date).getTime() - (new Date(mili)).getTime()) / 1000;
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    if(d > 0){
        return d + " ngày trước"
    } else if(h > 0){
        return h + " giờ trước"
    } else if(h > 0){
        return h + " phút trước"
    } else if(m > 0){
        return h + " giây trước"
    } else return ""
};

export {
    moneyFormat,
    getReadableTimeGap
}