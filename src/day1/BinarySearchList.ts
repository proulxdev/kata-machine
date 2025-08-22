export default function bs_list(haystack: number[], needle: number): boolean {
    /* Implementation 1
    let lo = 0;
    let hi = haystack.length;
    let m = Math.floor((hi + lo) / 2)
    while (haystack[m] !== needle) {
        if (lo >= hi) {
            return false;
        }
        if (haystack[m] < needle) {
            lo = m + 1;
        } else {
            hi = m;
        }
        m = Math.floor((hi + lo) / 2)
    }
    return true;
    */

    let lo = 0;
    let hi = haystack.length;
    while (lo < hi) {
        let m = Math.floor(lo + (hi - lo) / 2); // This method prevents integer overflow in some languages
        if (haystack[m] === needle) {
            return true;
        } else if (haystack[m] <= needle) {
            lo = m + 1;
        } else {
            hi = m;
        }
    }
    return false;
}