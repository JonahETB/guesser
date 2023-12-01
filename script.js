
fetch("data.json").then(function (res) {
    return res.json();
}).then(function (obj) {
    checkStats(obj);
}).catch(function (error) {
    console.log(`somethign went wrong with the data ${error}`);
})

function checkStats (obj) {
    console.log(obj);
    num = Math.floor(Math.random()*(+obj).length+1);
    console.log(num);

}
