import Details from "../components/Details"

export const metadata = {
    title: 'Details | E-Marketplace',
    description: 'Product details page for E-Marketplace',
}

function PreviewPage({ params: { productId } }) {
    return <Details id={productId}/>
}

export default PreviewPage