'use client'
import Image from "next/image"
import classNames from "classnames/bind"
import { useState } from "react"
import styles from "./Description.module.sass"

export const Description = () => {
    const PLACEHOLDER_IMAGE = "data:image/jpeg;base64,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"
    const [hasBorder, setBorder] = useState(false);

    const handleClick = () => setBorder(!hasBorder);

    const context = classNames.bind(styles)
    const buttonStyles = context('Description__button', {
        'Description__button--border': hasBorder
    })

    console.log(buttonStyles)
    
    return(
        <section className={styles.Description}>
            <button onClick={handleClick} className={buttonStyles}>
                <div className={styles.Description__imageContainer}>
                    <Image src="/images/description.jpeg" 
                        alt="products marketplace" 
                        fill
                        quality={75}
                        placeholder="blur"
                        blurDataURL={PLACEHOLDER_IMAGE}
                    />
                </div>
            </button>
            <div className={styles.Description__text}>
                <h2>Bring the future today</h2>
                <p>Future World: Your Gateway to Tomorrow's Tech! Dive into a world of cutting-edge gadgets and gear. Stay ahead of the curve and redefine your digital lifestyle with us.</p>
            </div>
        </section>
    )
}