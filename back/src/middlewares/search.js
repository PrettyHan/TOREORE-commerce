const powerSet = function (str) {
    let result = [""];
    let subset = "";
    let check = {};
    function makeSubset() {

        if (subset.length >= str.length) {
            return;
        }
        for (let i = 0; i < str.length; i++) {
            if (!check[str[i]]) {
                subset += str[i];
                check[str[i]] = true;
                let sortSubset = subset.split("").sort().join("");
                
                if (result.indexOf(sortSubset) === -1) {
                    result.push(sortSubset);
                }
                makeSubset();
                subset = subset.slice(0, -1);
                check[str[i]] = false;
            }
        }
    }
    makeSubset();
    return result;
};

export { powerSet }