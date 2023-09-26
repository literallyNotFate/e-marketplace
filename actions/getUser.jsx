const URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const getUser = async(id) => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
};

export default getUser;