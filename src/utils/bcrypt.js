import { hash as _hash, compare as _compare } from "bcrypt";
export async function hash(data) {
    try {
        const hash = _hash(data, 10);
        return hash;
    } catch (error) {
        console.log(error);
        return { error };
    }
}
export async function compare(string, hashString) {
    try {
        const isMatched = await _compare(string, hashString);
        console.log(isMatched);
        return isMatched;
    } catch (error) {
        console.log(error);
        return { error };
    }
}
