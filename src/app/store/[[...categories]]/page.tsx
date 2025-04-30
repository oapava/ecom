import { ProductsWrapper } from "app/components/Store/ProductWrapper";
import { collectionProducts, getCollections } from "app/services/shopify/collections";
import { getProducts } from "app/services/shopify/products";

interface CategoriesPorps{
    params: {
        categories: string[],
        searchParams?: string
    }
}
  
  export default async function Category(props: CategoriesPorps) {
    const { categories } = props.params
    let products = []
    const collections = await getCollections()
    
    if (categories?.length > 0) {
      const selectedCollectionId = collections.find((collection:any) => collection.handle === categories[0]).id
      products = await collectionProducts(selectedCollectionId)
    }else {
      products = await getProducts()
    }
  
    console.log('products', products)
  
    return (
      <ProductsWrapper products={products} />
    )
  }