function convertToMillions(population) {
    if (population < 1000_000) {
        return 0
    } else {
        return Math.round(population / 1000_000)
    }
}
export default convertToMillions
