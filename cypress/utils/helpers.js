//if Set_B is subset of A
export const isSuperSet = (set, subSet) => {
        for (let elem of subSet) {
            if (!set.has(elem)) {
                return false;
            }
        }
        return true;
};

//merges sets
export const Union = (set1, set2) => {
    let _union = new Set (set1);
    for (let elem of set2) {
        _union.add(elem);
    }
    return _union;
};

//intersects sets
export const Intersection = (set1, set2) => {
    let _intersection = new Set();
    for (let elem of set2) {
        if (set1.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
};

//difference between sets
export const Difference = (set1, set2) => {
    let _difference = new Set(set1);
    for (let elem of set2) {
        _difference.delete(elem);
    }
    return _difference;
};