import Image from "next/image";
import styles from "./MainProducts.module.sass";
import { getMainProducts } from "app/services/shopify/products";

export const MainProducts = async () => {
    let products: ProductType[] = [];

    try {
        products = await getMainProducts();
        if (!Array.isArray(products)) {
            console.error('getProducts did not return an array:', products);
            products = [];
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        products = [];
    }

    return (
        <section className={styles.MainProducts}>
            <h3>✨ New products released!</h3>
            <div className={styles.MainProducts__grid}>
                {products.length > 0 ? (
                    products.map((product: any) => {
                        const imageSrc = product.images?.[0]?.src || product?.image; 
                        return (
                            <article key={product.id}>
                                <p>{product.title}</p>
                                <Image src={imageSrc} fill alt={product.title} loading="eager" />
                            </article>
                        );
                    })
                ) : (
                    <p>No products available at the moment.</p>
                )}
            </div>
        </section>
    );
};