import { motion } from 'framer-motion'
import { NeonButton } from './NeonButton'

export function MerchStore() {
  const products = [
    {
      id: 1,
      name: 'Gaming Hoodie',
      price: '$49.99',
      image: '👕',
      color: 'Neon Red/Black',
      stock: 'In Stock'
    },
    {
      id: 2,
      name: 'Logo Cap',
      price: '$24.99',
      image: '🧢',
      color: 'Black/Cyan',
      stock: 'In Stock'
    },
    {
      id: 3,
      name: 'Gaming Mouse Pad',
      price: '$34.99',
      image: '🖥️',
      color: 'Neon Purple',
      stock: 'In Stock'
    },
    {
      id: 4,
      name: 'Water Bottle',
      price: '$19.99',
      image: '🥤',
      color: 'Stainless Steel',
      stock: 'In Stock'
    },
    {
      id: 5,
      name: 'T-Shirt',
      price: '$29.99',
      image: '👔',
      color: 'Asphalt/Cyan',
      stock: 'In Stock'
    },
    {
      id: 6,
      name: 'Beanie',
      price: '$22.99',
      image: '🎩',
      color: 'Black/Red',
      stock: 'Limited Stock'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto my-12"
    >
      <motion.h2
        className="text-4xl font-bold gradient-text mb-2 text-center uppercase"
      >
        🛍️ Official Merchandise Store
      </motion.h2>
      <p className="text-center text-neon-cyan mb-12">Grab your gaming gear and rep the brand!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="hud-panel rounded-lg p-6 group cursor-pointer"
          >
            {/* Product Image */}
            <div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform">
              {product.image}
            </div>

            {/* Product Name */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
              {product.name}
            </h3>

            {/* Product Details */}
            <div className="space-y-2 mb-4 text-sm text-gray-300">
              <p>
                <span className="text-neon-cyan font-bold">Color:</span> {product.color}
              </p>
              <p>
                <span className="text-neon-cyan font-bold">Status:</span>{' '}
                <span className={product.stock === 'In Stock' ? 'text-green-400' : 'text-orange-400'}>
                  {product.stock}
                </span>
              </p>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold gradient-text mb-4">{product.price}</p>

            {/* Buy Button */}
            <NeonButton variant="outline" className="w-full text-sm">
              Add to Cart
            </NeonButton>
          </motion.div>
        ))}
      </div>

      {/* Store Info */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-12 hud-panel rounded-lg p-8"
      >
        <h3 className="text-2xl font-bold gradient-text mb-4">📦 Shipping & Support</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-neon-cyan font-bold mb-2">🚚 Fast Shipping</p>
            <p className="text-gray-300 text-sm">Orders ship within 2-3 business days to worldwide locations</p>
          </div>
          <div>
            <p className="text-neon-cyan font-bold mb-2">💯 Quality Guaranteed</p>
            <p className="text-gray-300 text-sm">Premium materials and printing. Satisfaction guaranteed!</p>
          </div>
          <div>
            <p className="text-neon-cyan font-bold mb-2">🎁 Free Returns</p>
            <p className="text-gray-300 text-sm">30-day money-back guarantee on all orders</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
