const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const getProducts = async() => {
    const res = await fetch(`${URL}`);
    return res.json();
};

export const getProduct = async(id) => { 
    const res = await fetch(`${URL}/${id}`);
    return res.json();
};