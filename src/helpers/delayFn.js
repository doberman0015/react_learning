export const delayFn = async ( delay = 1000 ) => {
    // Робимо затримку
    return await new Promise((res) => setTimeout(res, delay));
}