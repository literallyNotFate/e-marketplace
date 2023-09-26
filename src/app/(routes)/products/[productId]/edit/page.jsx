import ProductForm from "../../components/ProductForm"

export const metadata = {
    title: 'Edit | E-Marketplace',
    description: 'Product edit page for E-Marketplace',
}

function EditPage({ params: { productId } }) {
    return <ProductForm id={productId}/>
}

export default EditPage