'use client';

import styles from './Windows.module.css';

interface ShoppingItem {
  name: string;
  store: string;
  link: string;
  price?: string;
}

const shoppingItems: ShoppingItem[] = [
  {
    name: "Her favourite lip gloss",
    store: "Dior",
    link: "https://www.sephora.com/product/dior-addict-lip-maximizer-plumping-gloss-P186805",
    price: "$50"
  },
  {
    name: "Her favourite setting powder",
    store: "laura mercier",
    link: "https://www.lauramercier.com/products/translucent-loose-setting-powder?srsltid=AfmBOoo-4IKufpar7h982dnWWg1nbL_1iMo8gl4JfP2FmN3VDJFlifYl",
    price: "$43"
  },
  {
    name: "Her favourite Highlighter and setting spray",
    store: "Charlotte Tilbury",
    link: "https://www.charlottetilbury.com/us/products/makeup/cheek/highlighter?srsltid=AfmBOooklFUXoa7x-EKtxPqiQNLdTDHKSYYfYD3b9-3IBMiaH5X-Tnip",
    price: "$42"
  },
  {
    name: "Her favourite BLUSH (i prefer her natural blush tho)",
    store: "Rare Beauty",
    link: "https://www.rarebeauty.com/products/soft-pinch-liquid-blush?srsltid=AfmBOopXTBgPpuNx5lIOEVECuHqz1hQZWVwOjAQJMI2pAhD1WzzyQujH",
    price: "$25"
  },
  {
    name: "Her favourite CONCEALER",
    store: "NARS",
    link: "https://www.sephora.com/product/radiant-creamy-concealer-P377873",
    price: "$34"
  },
];

const ShoppingWindow = () => {
  const handleBuyClick = (item: ShoppingItem) => {
    window.open(item.link, '_blank');
  };

  return (
    <div className={styles.shoppingContainer}>
      <h2 className={styles.shoppingTitle}>🛍️ Gift Ideas Shopping List</h2>
      <div className={styles.shoppingList}>
        {shoppingItems.map((item, index) => (
          <div key={index} className={styles.shoppingItem}>
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemDetails}>
                <span className={styles.store}>{item.store}</span>
                {item.price && <span className={styles.price}>{item.price}</span>}
              </p>
            </div>
            <button 
              className={styles.buyButton}
              onClick={() => handleBuyClick(item)}
            >
              Buy Now 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingWindow;
