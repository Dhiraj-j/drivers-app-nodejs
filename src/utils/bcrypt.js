import bcrypt from "bcrypt";
export async function hash(data) {
    try {
        const hash = await bcrypt.hash(data, 10);
        return hash;
    } catch (error) {
        console.log(error);
        return { error };
    }
}
export async function compare(string, hashString) {
    try {
        const isMatched = await bcrypt.compare(string, hashString);
        return isMatched;
    } catch (error) {
        console.log(error);
        return { error };
    }
}
