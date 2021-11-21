const fetchAPI = async (requestMapping) => {
    const response = await fetch(
        `http://localhost:8080/users/${requestMapping}`
      )
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          
          } else return;
        })
        .catch((err) => console.log(err));

    return response;
};

export default fetchAPI;