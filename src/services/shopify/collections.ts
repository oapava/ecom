import { env } from "app/config/env";
import { shopifyUrls } from "./url";

export const getCollections = async () => {
    try {
        const response = await fetch( shopifyUrls.collections.all,
            {
                headers: new Headers({
                    'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
                })
            }
         )
    
         const {smart_collections} = await response.json();
         const transformedCollection = smart_collections.map( (collection: any) =>{
            return {
                title: collection.title,
                id: collection.id,
                handle: collection.handle
            }
         } )
         return transformedCollection;
    } catch (error) {
        console.log(error)
    }
    
}

export const collectionProducts = async (id:string) => {
    try {
        const response = await fetch( shopifyUrls.collections.products(id),
            {
                headers: new Headers({
                    'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
                })
            }
        )

        const {products} = await response.json();
        return products;
    } catch (error) {
        console.log( error )
    }
}