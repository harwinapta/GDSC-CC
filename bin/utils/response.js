const baseResponse = (code, message = '', data = '') => ({
    code: code,
    message: message,
    data: data
})

const databaseResult = (result, error) =>({
    data: result,
    error: error
})

module.exports = {
    databaseResult,
    baseResponse
}