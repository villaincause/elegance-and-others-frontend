import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/product';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);

  // Sync state when product changes or modal opens
  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = 'hidden';
      // Safety check for colors array
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      setSelectedSize(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, product]);

  if (!product) return null;

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!selectedColor) return;

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    });
    onClose(); 
  };

  // Logic to ensure we always have at least the main image in the gallery list
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-opacity duration-300 ${
      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[1000px] h-[90vh] md:h-[650px] max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row font-editorial">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 hover:opacity-50 transition-opacity text-gray-900">
          <X size={24} strokeWidth={1} />
        </button>

        {/* Left Side: Image Gallery - Scrollable */}
        <div 
          className="w-full md:w-1/2 bg-[#f9f9f9] h-[50vh] md:h-full overflow-y-auto overflow-x-hidden min-h-0 shrink-0"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="flex flex-col w-full gap-1">
            {galleryImages?.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${product.name} view ${idx + 1}`} 
                className={`w-full ${galleryImages.length === 1 ? 'h-full object-cover' : 'h-auto object-cover'} block shrink-0`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white overflow-y-auto h-auto md:h-full min-h-0">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight leading-tight">{product.name}</h2>
            <p className="text-[14px] md:text-[16px] text-gray-600 font-medium mb-8">${product.price.toFixed(2)}</p>

            <div className="space-y-8">
              {/* Color Selection */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-4 text-black font-bold">
                  Color: <span className="text-gray-600 font-normal">{selectedColor?.name}</span>
                </p>
                <div className="flex gap-4">
                  {product.colors?.map((color, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full border transition-all ${
                        selectedColor?.hex === color.hex ? 'border-black p-[2px]' : 'border-transparent'
                      }`}
                    >
                      <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Size:</p>
                  <button className="text-[9px] underline uppercase tracking-widest text-gray-600 hover:text-black transition-colors">Size Chart</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-5 py-3 text-[11px] min-w-[60px] transition-all duration-300 ${
                        selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button 
              onClick={handleAddToBag}
              className="w-full bg-black text-white py-5 text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              Add to Bag
            </button>
            <Link 
              to={`/product/${product.id}`}
              className="w-full block text-center text-[10px] underline uppercase tracking-[0.2em] text-gray-600 mt-6 hover:text-black transition-colors"
              onClick={onClose}
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;