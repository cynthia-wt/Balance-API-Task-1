const fetchAPI = async (requestMapping) => {
    const response = await fetch(
        `http://localhost:8080/locations/${requestMapping}`
    ).then((res) => {
        if(res.status === 200) {
            return res.json()
        } else return 
    }).catch((err) => console.log(err))

    console.log(response)

    return response
}

export default fetchAPI