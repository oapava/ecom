import { getCollections } from "app/services/shopify/collections";
import Link from "next/link";
import styles from './StoreLayout.module.sass'

export default async function layout({ children }: { children: React.ReactNode }) {
    let collections = [];
    try {
        collections = await getCollections();
        if (!Array.isArray(collections)) {
            console.error('getCollections did not return an array:', collections);
            collections = [];
        }
    } catch (error) {
        console.error('Error fetching collections:', error);
        collections = [];
    }

    return (
        <main>
            <nav>
                <ul className={styles.StoreLayout__list}>
                    {
                        collections.length > 0 ? (
                            collections.map((collection: any) => (
                                <Link key={collection.id} href={'/store/' + collection.handle} className={styles.StoreLayout__chip}>
                                    {collection.title}
                                </Link>
                            ))
                        ) : (
                            <li>No collections available</li>
                        )
                    }
                </ul>
            </nav>
            {children}
        </main>
    )
}