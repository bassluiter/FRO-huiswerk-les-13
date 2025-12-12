function setRegionColor(region) {
    switch(region) {
        case "Europe":
            return "europe"
        case "Africa":
            return "africa"
        case "Americas":
            return "americas"
        case "Asia":
            return "asia"
        case "Oceania":
            return "oceania"
        default:
            return "default"
    }
}

export default setRegionColor