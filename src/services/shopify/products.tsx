import { env } from "app/config/env";
import { shopifyUrls } from "./url";

export const getProducts = async (id?:string): Promise<ProductType[]> => {
    try {
        const apiUrl = id ? `${shopifyUrls.products.all}?ids${id}` : shopifyUrls.products.all;
        const response = await fetch( apiUrl,
            {
                headers: new Headers({
                    'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
                })
            }
         )
    
         const {products} = await response.json();

         const transformedProducts = products.map((product: any) => {
            return {
                id: product.id,
                gql_id: product.variants?.[0]?.admin_graphql_api_id,
                title: product.title,
                description: product.body_html,
                image: product.images[0].src,
                price: product.variants[0].price,
                tags: product.tags,
                quantity: product.variants[0].inventory_quantity,
                handle: product.handle
            }
         })
         return transformedProducts;
    } catch (error) {
        console.log(error);
        return [];
    }
    
}

export const getMainProducts = async () => {
    try {
        const response = await fetch( shopifyUrls.products.mainProducts,
            {
                headers: new Headers({
                    'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
                }),
                cache: 'force-cache', // Force cache to be used
                //next: { revalidate: 10 } // Revalidate every 10 seconds
                //cache: 'no-cache', // Do not use cache
                next: {
                    tags: ['main-products']
                }
            }
         )
    
         const {products} = await response.json();
         const transformedCollection = products.map( (product: any) =>{
            return {
                title: product.title,
                id: product.id,
                handle: product.handle,
                image: product.image,
                images: product.images ?? null
            }
         } )
         return transformedCollection;
    } catch (error) {
        console.log(error)
        return []; 
    }
    
}