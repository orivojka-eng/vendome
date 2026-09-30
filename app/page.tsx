"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  X,
  Check,
  ArrowRight,
  ShieldCheck,
  Gem,
  Sparkles,
  SlidersHorizontal,
  Award,
  Lock,
  Eye,
  Trash2,
  Plus,
  Minus,
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
} from "lucide-react"

// Types
export interface Product {
  id: string
  name: string
  category: "rings" | "necklaces" | "earrings" | "bracelets" | "high-jewelry"
  priceUSD: number
  image: string
  description: string
  metalOptions: string[]
  sizes: string[]
  specs: {
    metal: string
    stone: string
    clarity: string
    cut: string
    caratWeight: string
    hallmark: string
  }
  tag?: string
}

export interface CartItem {
  cartId: string
  product: Product
  metal: string
  size: string
  engraving: string
  quantity: number
}

// Curated Luxury Catalog
const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Astrid Solitaire Diamond Ring",
    category: "rings",
    priceUSD: 4250,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800",
    description:
      "A timeless icon of high jewelry, featuring a hand-selected 1.50ct round brilliant GIA-certified diamond set on a tapered micro-pavé band of pure 18k gold.",
    metalOptions: ["18k Yellow Gold", "18k White Gold", "18k Rose Gold", "950 Platinum"],
    sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"],
    specs: {
      metal: "18k Solid Gold / 950 Platinum",
      stone: "Natural GIA Diamond",
      clarity: "VVS1 Exceptional",
      cut: "Round Brilliant Ideal Cut",
      caratWeight: "1.50 ct center",
      hallmark: "Maison Vendôme Certified",
    },
    tag: "Signature",
  },
  {
    id: "p2",
    name: "Lumina South Sea Pearl Drops",
    category: "earrings",
    priceUSD: 1800,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800",
    description:
      "Lustrous Australian South Sea cultured pearls suspended from delicate diamond-encrusted stems in 18k white gold, capturing gentle movement and radiant light.",
    metalOptions: ["18k White Gold", "18k Yellow Gold", "18k Rose Gold"],
    sizes: ["One Size (Drop 28mm)"],
    specs: {
      metal: "18k White Gold",
      stone: "Australian South Sea Pearl (11mm)",
      clarity: "AAA High Luster",
      cut: "Flawless Spherical",
      caratWeight: "0.45 ct Pavé Diamonds",
      hallmark: "Vendôme Atelier Paris",
    },
    tag: "Iconic",
  },
  {
    id: "p3",
    name: "Helix Grand Gold Chain",
    category: "necklaces",
    priceUSD: 2100,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
    description:
      "Substantial intertwined interlocking links sculpted in hand-polished 18k yellow gold. Designed for effortless grandeur, worn solo or layered.",
    metalOptions: ["18k Yellow Gold", "18k White Gold", "18k Rose Gold"],
    sizes: ["16 inch (Choker)", "18 inch (Standard)", "20 inch (Opera)"],
    specs: {
      metal: "18k Recycled Solid Gold",
      stone: "Concealed Brilliant Diamond Clasp",
      clarity: "VS1",
      cut: "Brilliant",
      caratWeight: "0.08 ct Clasp Accent",
      hallmark: "Vendôme Place Vendôme",
    },
  },
  {
    id: "p4",
    name: "Infinite Pavé Cuff Bracelet",
    category: "bracelets",
    priceUSD: 3400,
    image: "https://images.unsplash.com/photo-1611591475152-47317264789e?q=80&w=800",
    description:
      "A sculptural statement piece with continuous rows of brilliant-cut pavé diamonds set with seamless tension along a contoured solid gold cuff.",
    metalOptions: ["18k Yellow Gold", "18k White Gold", "18k Rose Gold"],
    sizes: ["Small (15cm)", "Medium (16.5cm)", "Large (18cm)"],
    specs: {
      metal: "18k Solid Gold",
      stone: "Natural Conflict-Free Diamonds",
      clarity: "VVS2",
      cut: "Round Brilliant",
      caratWeight: "2.10 ct Total Weight",
      hallmark: "Vendôme Master Goldsmith",
    },
    tag: "Bestseller",
  },
  {
    id: "p5",
    name: "Legacy Royal Vintage Locket",
    category: "necklaces",
    priceUSD: 5900,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800",
    description:
      "Inspired by the Maison's private 1928 Place Vendôme archive. Hand-engraved acanthus scrolls enclose dual keepsake chambers crowned with a bezel-set rose-cut diamond.",
    metalOptions: ["18k Yellow Gold", "18k Rose Gold"],
    sizes: ["20 inch Chain", "24 inch Chain"],
    specs: {
      metal: "24k Clad over 18k Solid Gold",
      stone: "Antique Rose-Cut Diamond",
      clarity: "VS1",
      cut: "Rose Cut Heritage",
      caratWeight: "0.95 ct",
      hallmark: "Vendôme 1924 Heritage Mark",
    },
  },
  {
    id: "p6",
    name: "Celestial Royal Sapphire Ring",
    category: "rings",
    priceUSD: 7200,
    image: "/images/sapphire-ring.jpg",
    description:
      "A mesmerizing unheated 3.20ct Royal Blue Ceylon sapphire cradled by twin tapered baguette diamonds in an architectural high-jewelry platinum setting.",
    metalOptions: ["950 Platinum", "18k Yellow Gold"],
    sizes: ["US 5", "US 6", "US 7", "US 8"],
    specs: {
      metal: "950 Solid Platinum",
      stone: "Unheated Ceylon Royal Sapphire",
      clarity: "Eye Clean Natural",
      cut: "Cushion Modified Brilliant",
      caratWeight: "3.20 ct Sapphire + 0.85 ct Baguettes",
      hallmark: "GIA & Vendôme High Jewelry",
    },
    tag: "High Jewelry",
  },
  {
    id: "p7",
    name: "Élysée Colombian Emerald Solitaire",
    category: "rings",
    priceUSD: 8400,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800",
    description:
      "An exceptional emerald-cut Colombian emerald displaying deep vivid green jardin, flanked by custom shield-cut diamonds in 18k yellow gold prongs and platinum shank.",
    metalOptions: ["18k Yellow Gold & Platinum", "18k Yellow Gold"],
    sizes: ["US 6", "US 7", "US 8"],
    specs: {
      metal: "Platinum & 18k Gold Two-Tone",
      stone: "Muzo Mine Colombian Emerald",
      clarity: "Minor Cedar Oil Only",
      cut: "Octagonal Emerald Cut",
      caratWeight: "2.65 ct Emerald",
      hallmark: "Vendôme Haute Horlogerie & Joaillerie",
    },
    tag: "Rare Gem",
  },
  {
    id: "p8",
    name: "Vendôme Riviera Diamond Choker",
    category: "necklaces",
    priceUSD: 9800,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
    description:
      "Seventy-four graduated round brilliant diamonds individually articulated with fluid movement, resting perfectly against the collarbone with breathtaking brilliance.",
    metalOptions: ["950 Platinum", "18k White Gold", "18k Yellow Gold"],
    sizes: ["15 inch (Riviera)", "16.5 inch (Princess)"],
    specs: {
      metal: "950 Platinum",
      stone: "Collection Grade Diamonds (D-F / VVS)",
      clarity: "VVS1-VVS2",
      cut: "Triple Excellent Brilliant",
      caratWeight: "8.50 ct Total Weight",
      hallmark: "Vendôme Atelier Privé",
    },
    tag: "Masterpiece",
  },
  {
    id: "p9",
    name: "Sovereign Pavé Diamond Studs",
    category: "earrings",
    priceUSD: 2450,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800",
    description:
      "Intricately set micro-prong diamond halo stud earrings engineered with a proprietary double-threaded security back for seamless daily elegance.",
    metalOptions: ["18k White Gold", "18k Yellow Gold", "18k Rose Gold"],
    sizes: ["Standard Stud (1.20ct tw)"],
    specs: {
      metal: "18k Solid Gold",
      stone: "Twin Brilliant Diamonds + Halo",
      clarity: "VS1",
      cut: "Ideal Round Brilliant",
      caratWeight: "1.20 ct Total Weight",
      hallmark: "Vendôme Paris Seal",
    },
  },
]

export default function Home() {
  // Navigation & Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isBagOpen, setIsBagOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isBespokeOpen, setIsBespokeOpen] = useState(false)
  const [isHeritageOpen, setIsHeritageOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeClientService, setActiveClientService] = useState<string | null>(null)

  // Product Selection & Quick View
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedMetal, setSelectedMetal] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [customEngraving, setCustomEngraving] = useState<string>("")
  const [productQuantity, setProductQuantity] = useState<number>(1)

  // Catalog Filtering & Sorting
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("featured")

  // Currency & Promo
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP">("USD")
  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79 }
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" }

  // Shopping Bag & Wishlist with local memory
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState(0)
  const [isGiftBox, setIsGiftBox] = useState(true)

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  // Bespoke Form State
  const [bespokeStep, setBespokeStep] = useState(1)
  const [bespokeData, setBespokeData] = useState({
    pieceType: "Engagement Ring",
    gemstone: "Diamond",
    metal: "18k Yellow Gold",
    budget: "$15,000 - $35,000",
    salon: "Place Vendôme, Paris",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "",
  })
  const [bespokeSuccessCode, setBespokeSuccessCode] = useState<string | null>(null)

  // Checkout Form State
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: "Eleanor Vance",
    email: "e.vance@quolytech-client.com",
    address: "18 Rue de la Paix",
    city: "Paris",
    country: "France",
    postalCode: "75002",
    courier: "White-Glove Armored Courier (Complimentary)",
    paymentMethod: "Atelier Encrypted Card",
  })
  const [orderConfirmationId, setOrderConfirmationId] = useState<string | null>(null)

  // VIP Account State
  const [isVIPLoggedIn, setIsVIPLoggedIn] = useState(true)
  const [vipUser] = useState({
    name: "Lady Eleanor Vance",
    tier: "Vendôme Haute Concierge VIP",
    loyaltyNumber: "VD-QUOLY-98214",
    preferredAdvisor: "Henri de Saint-Germain (Place Vendôme Master)",
    memberSince: "2023",
  })

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3800)
  }

  // Format Price Helper
  const formatPrice = (priceUSD: number) => {
    const rate = currencyRates[currency]
    const converted = Math.round(priceUSD * rate)
    return `${currencySymbols[currency]}${converted.toLocaleString()}`
  }

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS]

    if (categoryFilter !== "all") {
      list = list.filter((p) => p.category === categoryFilter)
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.priceUSD - b.priceUSD)
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.priceUSD - a.priceUSD)
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }

    return list
  }, [categoryFilter, sortBy])

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specs.stone.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Cart Calculations
  const bagSubtotalUSD = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0)
  }, [cartItems])

  const discountAmountUSD = useMemo(() => {
    return Math.round(bagSubtotalUSD * (discountPercent / 100))
  }, [bagSubtotalUSD, discountPercent])

  const bagTotalUSD = useMemo(() => {
    return Math.max(0, bagSubtotalUSD - discountAmountUSD)
  }, [bagSubtotalUSD, discountAmountUSD])

  const totalBagItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Open Product Modal
  const openProductDetail = (product: Product) => {
    setSelectedProduct(product)
    setSelectedMetal(product.metalOptions[0] || "")
    setSelectedSize(product.sizes[0] || "")
    setCustomEngraving("")
    setProductQuantity(1)
  }

  // Add to Bag Handlers
  const handleAddToCart = (product: Product, metal?: string, size?: string, engraving?: string, qty: number = 1) => {
    const chosenMetal = metal || product.metalOptions[0] || "18k Yellow Gold"
    const chosenSize = size || product.sizes[0] || "Standard"
    const chosenEngraving = engraving || ""

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.metal === chosenMetal &&
          item.size === chosenSize &&
          item.engraving === chosenEngraving
      )

      if (existingIndex > -1) {
        const next = [...prev]
        next[existingIndex].quantity += qty
        return next
      }

      return [
        ...prev,
        {
          cartId: `${product.id}-${Date.now()}-${Math.random()}`,
          product,
          metal: chosenMetal,
          size: chosenSize,
          engraving: chosenEngraving,
          quantity: qty,
        },
      ]
    })

    showToast(`Added "${product.name}" to your Vendôme bag.`)
  }

  // Remove / Update Cart
  const updateCartQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const removeCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId))
    showToast("Item removed from your bag.")
  }

  // Toggle Wishlist
  const toggleWishlist = (productId: string, productName: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast(`Removed from your curated wishlist.`)
        return prev.filter((id) => id !== productId)
      } else {
        showToast(`Saved "${productName}" to your wishlist.`)
        return [...prev, productId]
      }
    })
  }

  // Promo Code
  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const code = promoCode.trim().toUpperCase()
    if (code === "QUOLYTECH" || code === "VENDOME10" || code === "QUOLY10") {
      setDiscountPercent(10)
      showToast("VIP 10% Maison Atelier Privilege Applied!")
    } else {
      showToast("Invalid authorization code. Try code: QUOLYTECH")
    }
  }

  // Newsletter
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("Please enter a valid email address.")
      return
    }
    setNewsletterSubscribed(true)
    showToast("Welcome to the Vendôme circle. Gift code: QUOLYTECH")
  }

  // Bespoke Submission
  const handleBespokeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = `VD-BESPOKE-${Math.floor(10000 + Math.random() * 90000)}`
    setBespokeSuccessCode(code)
    showToast(`Bespoke commission request registered: ${code}`)
  }

  // Checkout Submission
  const handleCompleteCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    const orderId = `VD-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderConfirmationId(orderId)
    setCartItems([])
    showToast(`Order confirmed with distinction! Order #${orderId}`)
  }

  const scrollToCollection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const collectionSection = document.getElementById("collection")
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToBespoke = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const bespokeSection = document.getElementById("bespoke-section")
    if (bespokeSection) {
      bespokeSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="top-announcement-bar">
        <div className="container">
          <div className="top-bar-inner">
            <div className="top-bar-left desktop-only">
              <span>PLACE VENDÔME, PARIS</span>
              <span>•</span>
              <span>EST. 1924</span>
            </div>

            <div className="top-bar-center">
              <span>COMPLIMENTARY INSURED WHITE-GLOVE TRANSIT</span>
              <span className="top-bar-quoly">
                <Sparkles size={10} /> MADE BY QUOLYTECH
              </span>
            </div>

            <div className="top-bar-right desktop-only">
              <select
                className="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "USD" | "EUR" | "GBP")}
                aria-label="Currency Selector"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. REFINED & SIMPLIFIED MAISON HEADER */}
      <header>
        <div className="container">
          <div className="header-inner">
            {/* Left: Mobile Menu Toggle + Desktop Nav Links */}
            <div className="header-left">
              <button
                type="button"
                className="mobile-menu-trigger"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
              >
                <Menu size={22} />
              </button>

              <nav className="header-nav-desktop">
                <ul>
                  <li>
                    <a href="#collection" onClick={scrollToCollection}>
                      Shop
                    </a>
                  </li>
                  <li>
                    <a
                      href="#collection"
                      onClick={(e) => {
                        scrollToCollection(e)
                        setCategoryFilter("high-jewelry")
                      }}
                    >
                      Collections
                    </a>
                  </li>
                  <li>
                    <a href="#bespoke-section" onClick={scrollToBespoke}>
                      Bespoke
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setIsHeritageOpen(true)
                      }}
                    >
                      Heritage
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Center: Centered Brand Identity */}
            <div className="header-center">
              <a
                href="#"
                className="logo-container"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                <span className="logo">VENDÔME</span>
                <span className="logo-sub">PARIS</span>
              </a>
            </div>

            {/* Right: Clean Minimalist Icon Controls */}
            <div className="header-right">
              <button
                type="button"
                className="header-icon-btn"
                onClick={() => setIsSearchOpen(true)}
                title="Search Jewelry"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <button
                type="button"
                className="header-icon-btn"
                onClick={() => setIsWishlistOpen(true)}
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart
                  size={18}
                  fill={wishlist.length > 0 ? "#b8860b" : "none"}
                  color={wishlist.length > 0 ? "#b8860b" : "currentColor"}
                />
                {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
              </button>

              <button
                type="button"
                className="header-icon-btn desktop-only"
                onClick={() => setIsAccountOpen(true)}
                title="VIP Client Account"
                aria-label="VIP Account"
              >
                <User size={18} />
              </button>

              <button
                type="button"
                className="header-icon-btn"
                onClick={() => setIsBagOpen(true)}
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag size={18} />
                {totalBagItemsCount > 0 && <span className="badge-count">{totalBagItemsCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "17px", letterSpacing: "4px" }}>VENDÔME</div>
                <div style={{ fontSize: "8px", letterSpacing: "2px", color: "#888", marginTop: "2px" }}>PARIS • HAUTE JOAILLERIE</div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-nav-links">
              <button
                type="button"
                className="mobile-nav-link-btn"
                onClick={(e) => {
                  setIsMobileMenuOpen(false)
                  scrollToCollection(e as any)
                }}
              >
                <span>Shop All Creations</span>
                <ArrowRight size={13} color="#999" />
              </button>

              <button
                type="button"
                className="mobile-nav-link-btn"
                onClick={(e) => {
                  setIsMobileMenuOpen(false)
                  scrollToCollection(e as any)
                  setCategoryFilter("high-jewelry")
                }}
              >
                <span>High Jewelry Collections</span>
                <ArrowRight size={13} color="#999" />
              </button>

              <button
                type="button"
                className="mobile-nav-link-btn"
                onClick={(e) => {
                  setIsMobileMenuOpen(false)
                  scrollToBespoke(e as any)
                  setIsBespokeOpen(true)
                }}
              >
                <span>Bespoke Commission</span>
                <ArrowRight size={13} color="#999" />
              </button>

              <button
                type="button"
                className="mobile-nav-link-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsHeritageOpen(true)
                }}
              >
                <span>Our Heritage (1924–2025)</span>
                <ArrowRight size={13} color="#999" />
              </button>

              <button
                type="button"
                className="mobile-nav-link-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsAccountOpen(true)
                }}
              >
                <span>VIP Client Portal</span>
                <ArrowRight size={13} color="#999" />
              </button>

              <button
                type="button"
                className="mobile-nav-link-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setActiveClientService("sizing")
                }}
              >
                <span>Maison Sizing Guide</span>
                <ArrowRight size={13} color="#999" />
              </button>
            </div>

            <div className="mobile-nav-footer">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#666" }}>Currency:</span>
                <select
                  className="currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as "USD" | "EUR" | "GBP")}
                  style={{ color: "#000", border: "1px solid #ddd", padding: "4px 8px" }}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div style={{ fontSize: "9px", letterSpacing: "1.5px", color: "#999", textTransform: "uppercase", textAlign: "center", marginTop: "10px" }}>
                MADE BY QUOLYTECH • ATELIER PARIS
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SEARCH MODAL WITH LIVE RESULTS */}
      {isSearchOpen && (
        <div className="search-modal-overlay" onClick={() => setIsSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <button className="search-close" onClick={() => setIsSearchOpen(false)} aria-label="Close search">
              <X size={26} />
            </button>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Search high jewelry, diamonds, pearls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
            </form>

            <div className="search-suggestions">
              <p>Popular Curations:</p>
              <div className="search-tags">
                <button type="button" onClick={() => setSearchQuery("Diamond")}>
                  Diamonds
                </button>
                <button type="button" onClick={() => setSearchQuery("Sapphire")}>
                  Sapphires
                </button>
                <button type="button" onClick={() => setSearchQuery("Pearl")}>
                  South Sea Pearls
                </button>
                <button type="button" onClick={() => setSearchQuery("Ring")}>
                  Solitaire Rings
                </button>
                <button type="button" onClick={() => setSearchQuery("Gold")}>
                  18k Gold
                </button>
              </div>
            </div>

            {/* Live Search Results */}
            {searchQuery.trim() !== "" && (
              <div className="live-search-results">
                <div style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#888", marginBottom: "15px" }}>
                  Found {searchResults.length} piece{searchResults.length === 1 ? "" : "s"}
                </div>
                {searchResults.length === 0 ? (
                  <p style={{ fontSize: "13px", color: "#999", padding: "20px 0" }}>
                    No matching creations found. Contact our master jeweler for a bespoke commission.
                  </p>
                ) : (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="search-item-card"
                      onClick={() => {
                        setIsSearchOpen(false)
                        openProductDetail(item)
                      }}
                    >
                      <img src={item.image} alt={item.name} className="search-item-thumb" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontFamily: "var(--serif)", letterSpacing: "1px", textTransform: "uppercase" }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: "11px", color: "#777", marginTop: "3px" }}>
                          {item.specs.metal} • {item.specs.stone}
                        </div>
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: "500" }}>{formatPrice(item.priceUSD)}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. HERO SECTION */}
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070"
          alt="Vendôme Haute Joaillerie"
          className="hero-img"
        />
        <div className="hero-content reveal">
          <p>Maison Vendôme • Paris 1924</p>
          <h1>Eternal Radiance</h1>
          <p style={{ letterSpacing: "2px", fontSize: "12px", marginBottom: "25px", color: "#444" }}>
            The New Haute Joaillerie Collection • Made by QuolyTech
          </p>
          <a href="#collection" className="btn" onClick={scrollToCollection}>
            Discover the collection
          </a>
        </div>
      </section>

      {/* 5. CATALOG SIGNATURE SERIES SECTION */}
      <div className="container" id="collection">
        <div className="section-title">
          <h2>The Signature Series</h2>
          <p style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginTop: "12px" }}>
            Handcrafted Masterpieces • Place Vendôme Atelier
          </p>
        </div>

        {/* Interactive Filter Toolbar */}
        <div className="catalog-toolbar">
          <div className="category-pills">
            {[
              { id: "all", label: "All Pieces" },
              { id: "rings", label: "Rings" },
              { id: "necklaces", label: "Necklaces" },
              { id: "earrings", label: "Earrings" },
              { id: "bracelets", label: "Bracelets" },
              { id: "high-jewelry", label: "High Jewelry" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${categoryFilter === cat.id ? "active" : ""}`}
                onClick={() => setCategoryFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="sort-container">
            <span className="sort-label">
              <SlidersHorizontal size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
              aria-label="Sort creations"
            >
              <option value="featured">Featured Atelier Picks</option>
              <option value="price-asc">Price: Ascending</option>
              <option value="price-desc">Price: Descending</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Dynamic Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card product-card-wrap">
              {product.tag && <div className="product-tag">{product.tag}</div>}

              {/* Wishlist Button */}
              <button
                type="button"
                className={`product-wishlist-btn ${wishlist.includes(product.id) ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWishlist(product.id, product.name)
                }}
                aria-label={`Wishlist ${product.name}`}
              >
                <Heart size={16} fill={wishlist.includes(product.id) ? "#b8860b" : "none"} />
              </button>

              {/* Image Container with Hover Quick Actions */}
              <div className="product-image-container" onClick={() => openProductDetail(product)}>
                <img src={product.image} alt={product.name} />

                <div className="product-hover-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="quick-action-btn secondary"
                    onClick={() => openProductDetail(product)}
                  >
                    <Eye size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} /> Quick View
                  </button>
                  <button
                    type="button"
                    className="quick-action-btn primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="product-info" onClick={() => openProductDetail(product)}>
                <h3>{product.name}</h3>
                <p className="product-price">{formatPrice(product.priceUSD)}</p>
                <div className="product-details-subtitle">{product.specs.stone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. OUR HERITAGE STORY SECTION */}
      <section className="story-section">
        <div className="container">
          <div className="feature-block">
            <div className="feature-image">
              <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200" alt="Vendôme Craftsmanship" />
            </div>
            <div className="feature-text">
              <h2>&quot;Jewelry is a silent language, a preservation of moments.&quot;</h2>
              <p>
                Each Vendôme piece is handcrafted in our Paris Atelier using ethically sourced 24k gold, Kimberley-process
                diamonds, and exceptional certified colored gemstones. We believe in the slow art of jewelry making, where every curve and
                facet is intentional, designed to be passed down through generations.
              </p>
              <button
                type="button"
                className="btn"
                style={{ background: "transparent", color: "black", border: "1px solid black", cursor: "pointer" }}
                onClick={() => setIsHeritageOpen(true)}
              >
                Our Heritage (1924–2025)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BESPOKE ATELIER SECTION */}
      <section id="bespoke-section" style={{ backgroundColor: "#fcfcfc", padding: "120px 0" }}>
        <div className="container">
          <div className="feature-block">
            <div className="feature-text">
              <h2 style={{ fontStyle: "normal", textTransform: "uppercase", fontSize: "28px" }}>Bespoke Experience</h2>
              <p>
                Collaborate with our master artisans at Place Vendôme to bring your unique vision to life. From initial gouache
                sketches to the final diamond setting, our digital atelier—powered by QuolyTech—ensures your personal story is etched
                into every detail of your custom commission.
              </p>
              <button
                type="button"
                className="btn"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setBespokeSuccessCode(null)
                  setIsBespokeOpen(true)
                }}
              >
                Inquire Now
              </button>
            </div>
            <div className="feature-image">
              <img
                src="https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?q=80&w=1200"
                alt="Bespoke Design Process"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. LUXURY FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>The Maison</h4>
              <p style={{ fontSize: "13px", color: "#777", lineHeight: "1.8" }}>
                Established in 1924, Vendôme has defined the pinnacle of French jewelry craftsmanship for over a century.
                Place Vendôme, Paris. Excellence is our only standard.
              </p>
              <div style={{ marginTop: "18px", fontSize: "11px", letterSpacing: "1px", color: "#b8860b", textTransform: "uppercase" }}>
                Digital Flagship • Made by QuolyTech
              </div>
            </div>

            <div className="footer-col">
              <h4>Client Services</h4>
              <ul>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveClientService("contact")
                    }}
                  >
                    Contact Concierge
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveClientService("shipping")
                    }}
                  >
                    Armored Shipping &amp; Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveClientService("sizing")
                    }}
                  >
                    Maison Sizing Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveClientService("giftcards")
                    }}
                  >
                    Atelier Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Collections</h4>
              <ul>
                <li>
                  <a
                    href="#collection"
                    onClick={(e) => {
                      scrollToCollection(e)
                      setCategoryFilter("rings")
                    }}
                  >
                    Bridal &amp; Solitaires
                  </a>
                </li>
                <li>
                  <a
                    href="#collection"
                    onClick={(e) => {
                      scrollToCollection(e)
                      setCategoryFilter("high-jewelry")
                    }}
                  >
                    High Jewelry Creations
                  </a>
                </li>
                <li>
                  <a
                    href="#collection"
                    onClick={(e) => {
                      scrollToCollection(e)
                      setCategoryFilter("necklaces")
                    }}
                  >
                    Necklaces &amp; Pendants
                  </a>
                </li>
                <li>
                  <a
                    href="#bespoke-section"
                    onClick={(e) => {
                      scrollToBespoke(e)
                      setIsBespokeOpen(true)
                    }}
                  >
                    Private Commissions
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Newsletter</h4>
              <p
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "15px",
                  color: "#999",
                }}
              >
                Join the Vendôme Inner Circle
              </p>

              {newsletterSubscribed ? (
                <div style={{ background: "#f0ede6", padding: "15px", fontSize: "11px", letterSpacing: "1px", lineHeight: "1.6" }}>
                  <div style={{ color: "#222", fontWeight: 600, marginBottom: "4px" }}>
                    <Check size={14} style={{ display: "inline", verticalAlign: "middle" }} /> Subscribed Successfully
                  </div>
                  Enjoy 10% on your next order with authorization code <strong>QUOLYTECH</strong>.
                </div>
              ) : (
                <form onSubmit={handleNewsletter}>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="newsletter-input"
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "black",
                      textDecoration: "none",
                      borderBottom: "1px solid black",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <div>© 2025 VENDÔME MAISON DE HAUTE JOAILLERIE. ALL RIGHTS RESERVED.</div>
            <div style={{ marginTop: "6px", color: "#666", letterSpacing: "2px" }}>
              PLATFORM ARCHITECTURE &amp; DIGITAL COMMERCE • MADE BY QUOLYTECH
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================================
          MODALS & DRAWERS
          ========================================================== */}

      {/* PRODUCT DETAIL / QUICK VIEW MODAL */}
      {selectedProduct && (
        <div className="luxury-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="luxury-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="luxury-modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product modal">
              <X size={22} />
            </button>

            <div className="product-detail-layout">
              <div className="product-detail-gallery">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <div className="product-detail-content">
                <div className="product-detail-meta">
                  {selectedProduct.category.toUpperCase()} • {selectedProduct.specs.hallmark}
                </div>
                <h2 className="product-detail-title">{selectedProduct.name}</h2>
                <div className="product-detail-price">{formatPrice(selectedProduct.priceUSD)}</div>

                <p className="product-detail-desc">{selectedProduct.description}</p>

                {/* Metal Selection */}
                <div className="option-group">
                  <div className="option-title">Select Metal:</div>
                  <div className="option-chips">
                    {selectedProduct.metalOptions.map((metal) => (
                      <button
                        key={metal}
                        type="button"
                        className={`option-chip ${selectedMetal === metal ? "selected" : ""}`}
                        onClick={() => setSelectedMetal(metal)}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="option-group">
                  <div className="option-title">
                    <span>Select Size:</span>
                    <button
                      type="button"
                      className="size-guide-link"
                      onClick={() => setActiveClientService("sizing")}
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="option-chips">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        className={`option-chip ${selectedSize === sz ? "selected" : ""}`}
                        onClick={() => setSelectedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Complimentary Engraving */}
                <div className="option-group">
                  <div className="option-title">Complimentary Atelier Engraving (Optional):</div>
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="e.g. Always &amp; Forever • Monogram"
                    value={customEngraving}
                    onChange={(e) => setCustomEngraving(e.target.value)}
                    className="engraving-input"
                  />
                </div>

                {/* Quantity & Actions */}
                <div className="detail-actions-row">
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd" }}>
                    <button
                      type="button"
                      className="bag-qty-btn"
                      onClick={() => setProductQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus size={13} />
                    </button>
                    <span style={{ padding: "0 14px", fontSize: "13px" }}>{productQuantity}</span>
                    <button
                      type="button"
                      className="bag-qty-btn"
                      onClick={() => setProductQuantity((q) => q + 1)}
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn"
                    style={{ flex: 1, padding: "15px 25px" }}
                    onClick={() => {
                      handleAddToCart(
                        selectedProduct,
                        selectedMetal,
                        selectedSize,
                        customEngraving,
                        productQuantity
                      )
                      setSelectedProduct(null)
                      setIsBagOpen(true)
                    }}
                  >
                    Add to Bag
                  </button>

                  <button
                    type="button"
                    style={{
                      border: "1px solid #000",
                      background: "transparent",
                      width: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleWishlist(selectedProduct.id, selectedProduct.name)}
                    title="Save to Wishlist"
                  >
                    <Heart
                      size={18}
                      fill={wishlist.includes(selectedProduct.id) ? "#b8860b" : "none"}
                      color={wishlist.includes(selectedProduct.id) ? "#b8860b" : "#000"}
                    />
                  </button>
                </div>

                {/* Quality Guarantees */}
                <div className="guarantee-badges">
                  <div className="guarantee-item">
                    <ShieldCheck size={18} />
                    <span>GIA Certified</span>
                  </div>
                  <div className="guarantee-item">
                    <Truck size={18} />
                    <span>Armored Delivery</span>
                  </div>
                  <div className="guarantee-item">
                    <Award size={18} />
                    <span>30-Day Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOPPING BAG DRAWER */}
      {isBagOpen && (
        <div className="luxury-drawer-overlay" onClick={() => setIsBagOpen(false)}>
          <div className="luxury-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title">Shopping Bag ({totalBagItemsCount})</div>
              <button
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setIsBagOpen(false)}
                aria-label="Close bag"
              >
                <X size={22} />
              </button>
            </div>

            <div className="drawer-content">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <ShoppingBag size={42} style={{ margin: "0 auto 20px", color: "#bbb" }} />
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", letterSpacing: "2px", marginBottom: "12px" }}>
                    Your Bag is Empty
                  </h3>
                  <p style={{ fontSize: "13px", color: "#777", marginBottom: "30px" }}>
                    Explore our Signature Series and handcrafted creations from Place Vendôme.
                  </p>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setIsBagOpen(false)
                      const sec = document.getElementById("collection")
                      sec?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Discover Creations
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#000", marginBottom: "15px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldCheck size={14} color="#b8860b" /> White-Glove Armored Transit Included
                  </div>

                  {cartItems.map((item) => (
                    <div key={item.cartId} className="bag-item">
                      <img src={item.product.image} alt={item.product.name} className="bag-item-img" />
                      <div className="bag-item-info">
                        <button
                          type="button"
                          className="bag-remove-btn"
                          onClick={() => removeCartItem(item.cartId)}
                        >
                          <Trash2 size={13} />
                        </button>

                        <div className="bag-item-title">{item.product.name}</div>
                        <div className="bag-item-meta">
                          {item.metal} • {item.size}
                          {item.engraving && (
                            <div style={{ fontStyle: "italic", marginTop: "2px" }}>
                              Engraving: &quot;{item.engraving}&quot;
                            </div>
                          )}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "10px" }}>
                          <div className="bag-qty-controls">
                            <button
                              type="button"
                              className="bag-qty-btn"
                              onClick={() => updateCartQuantity(item.cartId, -1)}
                            >
                              <Minus size={11} />
                            </button>
                            <span className="bag-qty-val">{item.quantity}</span>
                            <button
                              type="button"
                              className="bag-qty-btn"
                              onClick={() => updateCartQuantity(item.cartId, 1)}
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <div className="bag-item-price">
                            {formatPrice(item.product.priceUSD * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Complimentary Packaging Option */}
                  <div style={{ marginTop: "25px", padding: "15px", background: "#fcfcfc", border: "1px solid #eee" }}>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "12px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={isGiftBox}
                        onChange={(e) => setIsGiftBox(e.target.checked)}
                        style={{ marginTop: "3px" }}
                      />
                      <span>
                        <strong>Complimentary Maison Gift Presentation</strong>: Signature dark-lacquer jewelry case,
                        wax-sealed certificate &amp; satin ribbon.
                      </span>
                    </label>
                  </div>
                </>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="drawer-footer">
                {/* Promo Voucher */}
                <form onSubmit={applyPromo} className="promo-box">
                  <input
                    type="text"
                    placeholder="VIP PROMO CODE (e.g. QUOLYTECH)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                  />
                  <button type="submit" className="promo-btn">
                    Apply
                  </button>
                </form>

                <div className="bag-summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(bagSubtotalUSD)}</span>
                </div>

                {discountAmountUSD > 0 && (
                  <div className="bag-summary-row" style={{ color: "#b8860b" }}>
                    <span>VIP Privilege Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmountUSD)}</span>
                  </div>
                )}

                <div className="bag-summary-row">
                  <span>Armored Courier &amp; Insurance</span>
                  <span style={{ color: "#228b22", fontWeight: 500 }}>COMPLIMENTARY</span>
                </div>

                <div className="bag-summary-total">
                  <span>Estimated Total</span>
                  <span>{formatPrice(bagTotalUSD)}</span>
                </div>

                <button
                  type="button"
                  className="btn bag-checkout-btn"
                  onClick={() => {
                    setIsBagOpen(false)
                    setIsCheckoutOpen(true)
                  }}
                >
                  Proceed to Secure Checkout
                </button>

                <div className="quoly-signature">
                  Secured &amp; Verified by QuolyTech Atelier Systems
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="luxury-modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="luxury-modal-box" style={{ maxWidth: "680px" }} onClick={(e) => e.stopPropagation()}>
            <button className="luxury-modal-close" onClick={() => setIsCheckoutOpen(false)}>
              <X size={22} />
            </button>

            {orderConfirmationId ? (
              <div style={{ padding: "60px 40px", textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#f5f2eb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 25px" }}>
                  <Award size={32} color="#b8860b" />
                </div>
                <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#888" }}>
                  Order Confirmed With Distinction
                </p>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "28px", letterSpacing: "2px", margin: "10px 0 20px" }}>
                  Thank You, {checkoutForm.fullName}
                </h2>
                <div style={{ background: "#fbfbfb", border: "1px solid #eaeaea", padding: "20px", display: "inline-block", marginBottom: "25px", fontSize: "13px" }}>
                  <div>Order Reference Number: <strong>{orderConfirmationId}</strong></div>
                  <div style={{ marginTop: "4px", color: "#666" }}>Delivery Destination: {checkoutForm.address}, {checkoutForm.city}</div>
                </div>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.8", maxWidth: "480px", margin: "0 auto 30px" }}>
                  Your commission is being prepared by our master jewelers at Place Vendôme. An armored courier tracking dossier
                  has been dispatched to <strong>{checkoutForm.email}</strong>.
                </p>
                <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "25px" }}>
                  Commerce Engine Powered by QuolyTech
                </div>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsCheckoutOpen(false)
                    setOrderConfirmationId(null)
                  }}
                >
                  Return to Atelier
                </button>
              </div>
            ) : (
              <div style={{ padding: "45px" }}>
                <div style={{ textAlign: "center", marginBottom: "35px" }}>
                  <span style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#888" }}>
                    Maison Vendôme Paris
                  </span>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "24px", letterSpacing: "2px", marginTop: "6px" }}>
                    White-Glove Private Checkout
                  </h2>
                  <div style={{ fontSize: "12px", color: "#b8860b", marginTop: "4px" }}>
                    Total: {formatPrice(bagTotalUSD)}
                  </div>
                </div>

                <form onSubmit={handleCompleteCheckout}>
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                      1. Client Information
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={checkoutForm.fullName}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, fullName: e.target.value })}
                        className="bespoke-input-field"
                        required
                      />
                      <input
                        type="email"
                        placeholder="VIP Email"
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                        className="bespoke-input-field"
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                      2. Delivery Destination
                    </h4>
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      className="bespoke-input-field"
                      required
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      <input
                        type="text"
                        placeholder="City"
                        value={checkoutForm.city}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                        className="bespoke-input-field"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        value={checkoutForm.postalCode}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })}
                        className="bespoke-input-field"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={checkoutForm.country}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, country: e.target.value })}
                        className="bespoke-input-field"
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "30px" }}>
                    <h4 style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                      3. Armored Courier Transit
                    </h4>
                    <div style={{ border: "1px solid #000", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "1px" }}>
                          Armored White-Glove Transit by Brink&apos;s / Ferrari Security
                        </div>
                        <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
                          Full value coverage, biometric signature upon delivery
                        </div>
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: "600", color: "#228b22" }}>COMPLIMENTARY</span>
                    </div>
                  </div>

                  <button type="submit" className="btn" style={{ width: "100%", padding: "18px" }}>
                    Authorize &amp; Finalize Commission ({formatPrice(bagTotalUSD)})
                  </button>

                  <div style={{ textAlign: "center", marginTop: "14px", fontSize: "10px", letterSpacing: "1.5px", color: "#888", textTransform: "uppercase" }}>
                    <Lock size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                    256-Bit Bank-Grade Encryption • Engineered by QuolyTech
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WISHLIST DRAWER */}
      {isWishlistOpen && (
        <div className="luxury-drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
          <div className="luxury-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title">Curated Wishlist ({wishlist.length})</div>
              <button
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Close wishlist"
              >
                <X size={22} />
              </button>
            </div>

            <div className="drawer-content">
              {wishlist.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <Heart size={42} style={{ margin: "0 auto 20px", color: "#bbb" }} />
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", letterSpacing: "2px", marginBottom: "12px" }}>
                    No Saved Pieces
                  </h3>
                  <p style={{ fontSize: "13px", color: "#777", marginBottom: "30px" }}>
                    Click the heart icon on any piece to preserve it in your private selection.
                  </p>
                </div>
              ) : (
                PRODUCTS.filter((p) => wishlist.includes(p.id)).map((item) => (
                  <div key={item.id} className="bag-item">
                    <img src={item.image} alt={item.name} className="bag-item-img" />
                    <div className="bag-item-info">
                      <button
                        type="button"
                        className="bag-remove-btn"
                        onClick={() => toggleWishlist(item.id, item.name)}
                      >
                        <Trash2 size={13} />
                      </button>

                      <div className="bag-item-title">{item.name}</div>
                      <div className="bag-item-meta">{item.specs.metal}</div>
                      <div className="bag-item-price">{formatPrice(item.priceUSD)}</div>

                      <button
                        type="button"
                        className="quick-action-btn primary"
                        style={{ marginTop: "12px", width: "fit-content", padding: "8px 16px" }}
                        onClick={() => {
                          handleAddToCart(item)
                          toggleWishlist(item.id, item.name)
                          setIsWishlistOpen(false)
                          setIsBagOpen(true)
                        }}
                      >
                        Move to Bag
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="drawer-footer">
              <div className="quoly-signature">
                Curated Haute Selection • Made by QuolyTech
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIP CLIENT ACCOUNT DRAWER */}
      {isAccountOpen && (
        <div className="luxury-drawer-overlay" onClick={() => setIsAccountOpen(false)}>
          <div className="luxury-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title">VIP Client Portal</div>
              <button
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setIsAccountOpen(false)}
                aria-label="Close account"
              >
                <X size={22} />
              </button>
            </div>

            <div className="drawer-content">
              {isVIPLoggedIn ? (
                <div>
                  <div style={{ background: "#fbfaf8", border: "1px solid #ebdcb9", padding: "25px", marginBottom: "25px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#b8860b", fontWeight: 600 }}>
                      {vipUser.tier}
                    </div>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px", letterSpacing: "1px", margin: "6px 0 10px" }}>
                      {vipUser.name}
                    </h3>
                    <div style={{ fontSize: "12px", color: "#555" }}>Member ID: {vipUser.loyaltyNumber}</div>
                    <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
                      Private Advisor: {vipUser.preferredAdvisor}
                    </div>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "6px" }}>
                      Active Privileges
                    </h4>
                    <ul style={{ listStyle: "none", fontSize: "12px", color: "#444", lineHeight: "2" }}>
                      <li>• Complimentary Armored Delivery &amp; Insurance</li>
                      <li>• Annual Inspection &amp; Ultrasonic Cleaning in Paris</li>
                      <li>• First Access to High Jewelry Salon Salons</li>
                      <li>• Bespoke Concierge Authorization: <strong>QUOLYTECH</strong> (10% VIP)</li>
                    </ul>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "6px" }}>
                      Recent Commissions
                    </h4>
                    <div style={{ border: "1px solid #eee", padding: "14px", marginBottom: "10px", fontSize: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 500 }}>
                        <span>#VD-84210 • Astrid Solitaire</span>
                        <span style={{ color: "#228b22" }}>Delivered</span>
                      </div>
                      <div style={{ color: "#888", fontSize: "11px", marginTop: "3px" }}>
                        Place Vendôme Atelier • 18k Yellow Gold • US 6
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn"
                    style={{ width: "100%", background: "#f2f2f2", color: "#000", border: "1px solid #ddd" }}
                    onClick={() => {
                      setIsVIPLoggedIn(false)
                      showToast("Signed out of VIP Portal.")
                    }}
                  >
                    Switch VIP Account
                  </button>
                </div>
              ) : (
                <div style={{ padding: "20px 0" }}>
                  <p style={{ fontSize: "13px", color: "#666", marginBottom: "25px", lineHeight: "1.8" }}>
                    Sign in to access your commission history, certificates of authenticity, and dedicated Place Vendôme
                    concierge.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setIsVIPLoggedIn(true)
                      showToast("Welcome back to Maison Vendôme VIP.")
                    }}
                  >
                    <input
                      type="email"
                      placeholder="VIP Client Email"
                      defaultValue="e.vance@quolytech-client.com"
                      className="bespoke-input-field"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Passcode"
                      defaultValue="••••••••"
                      className="bespoke-input-field"
                      required
                    />
                    <button type="submit" className="btn" style={{ width: "100%", marginTop: "10px" }}>
                      Access VIP Portal
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div className="drawer-footer">
              <div className="quoly-signature">
                Secured VIP Systems • Made by QuolyTech
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BESPOKE COMMISSION MODAL */}
      {isBespokeOpen && (
        <div className="luxury-modal-overlay" onClick={() => setIsBespokeOpen(false)}>
          <div className="luxury-modal-box" style={{ maxWidth: "700px" }} onClick={(e) => e.stopPropagation()}>
            <button className="luxury-modal-close" onClick={() => setIsBespokeOpen(false)}>
              <X size={22} />
            </button>

            {bespokeSuccessCode ? (
              <div style={{ padding: "60px 40px", textAlign: "center" }}>
                <Sparkles size={36} color="#b8860b" style={{ margin: "0 auto 20px" }} />
                <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#888" }}>
                  Commission Registered
                </span>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "28px", letterSpacing: "2px", margin: "10px 0 20px" }}>
                  Your Bespoke Appointment is Confirmed
                </h2>
                <div style={{ background: "#fbfbfb", border: "1px solid #eee", padding: "18px", display: "inline-block", marginBottom: "25px", fontSize: "14px" }}>
                  Pass Code: <strong>{bespokeSuccessCode}</strong>
                </div>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.8", maxWidth: "480px", margin: "0 auto 30px" }}>
                  A Master Jeweler from our {bespokeData.salon} will reach out to{" "}
                  <strong>{bespokeData.clientEmail}</strong> within 24 hours to review your gemstone selection and initial gouache design sketches.
                </p>
                <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "25px" }}>
                  Bespoke Studio Engineered by QuolyTech
                </div>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsBespokeOpen(false)
                    setBespokeSuccessCode(null)
                  }}
                >
                  Close &amp; Return
                </button>
              </div>
            ) : (
              <div className="bespoke-step-box">
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <span style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#888" }}>
                    Atelier Privé • Place Vendôme
                  </span>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "26px", letterSpacing: "2px", marginTop: "6px" }}>
                    Commission Your Unique Creation
                  </h2>
                </div>

                <form onSubmit={handleBespokeSubmit}>
                  {/* Step 1: Piece Type */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#333", display: "block", marginBottom: "10px" }}>
                      1. Type of High Jewelry Piece:
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                      {["Engagement Ring", "Statement Necklace", "Bespoke Tiara", "Articulated Bracelet"].map((item) => (
                        <div
                          key={item}
                          className={`bespoke-choice-card ${bespokeData.pieceType === item ? "active" : ""}`}
                          onClick={() => setBespokeData({ ...bespokeData, pieceType: item })}
                        >
                          <div style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Gemstone & Metal */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#333", display: "block", marginBottom: "10px" }}>
                      2. Rare Gemstone &amp; Metal Preference:
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <select
                        className="bespoke-input-field"
                        value={bespokeData.gemstone}
                        onChange={(e) => setBespokeData({ ...bespokeData, gemstone: e.target.value })}
                      >
                        <option value="Natural D-F Diamond">Natural D-F Flawless Diamond</option>
                        <option value="Royal Ceylon Sapphire">Royal Blue Ceylon Sapphire</option>
                        <option value="Muzo Colombian Emerald">Muzo Colombian Emerald</option>
                        <option value="Pigeon Blood Burmese Ruby">Burmese Pigeon Blood Ruby</option>
                      </select>

                      <select
                        className="bespoke-input-field"
                        value={bespokeData.metal}
                        onChange={(e) => setBespokeData({ ...bespokeData, metal: e.target.value })}
                      >
                        <option value="18k Yellow Gold">18k Yellow Gold</option>
                        <option value="950 Solid Platinum">950 Solid Platinum</option>
                        <option value="18k Rose Gold">18k Rose Gold</option>
                        <option value="18k White Gold">18k White Gold</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 3: Salon & Target Investment */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#333", display: "block", marginBottom: "10px" }}>
                      3. Salon Location &amp; Target Investment:
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <select
                        className="bespoke-input-field"
                        value={bespokeData.salon}
                        onChange={(e) => setBespokeData({ ...bespokeData, salon: e.target.value })}
                      >
                        <option value="Place Vendôme, Paris">Place Vendôme Salon (Paris)</option>
                        <option value="Mayfair Salon, London">Mayfair Salon (London)</option>
                        <option value="Fifth Avenue, New York">5th Avenue Salon (New York)</option>
                        <option value="Virtual Atelier (Video)">Virtual Atelier via High-Res Video</option>
                      </select>

                      <select
                        className="bespoke-input-field"
                        value={bespokeData.budget}
                        onChange={(e) => setBespokeData({ ...bespokeData, budget: e.target.value })}
                      >
                        <option value="$10,000 - $25,000">$10,000 – $25,000</option>
                        <option value="$25,000 - $50,000">$25,000 – $50,000</option>
                        <option value="$50,000 - $100,000+">$50,000 – $100,000+</option>
                        <option value="High Jewelry Masterpiece ($100k+)">High Jewelry Masterpiece ($100k+)</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Client Contact */}
                  <div style={{ marginBottom: "25px" }}>
                    <label style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#333", display: "block", marginBottom: "10px" }}>
                      4. Client Contact Details:
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={bespokeData.clientName}
                        onChange={(e) => setBespokeData({ ...bespokeData, clientName: e.target.value })}
                        className="bespoke-input-field"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={bespokeData.clientEmail}
                        onChange={(e) => setBespokeData({ ...bespokeData, clientEmail: e.target.value })}
                        className="bespoke-input-field"
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Share details about your inspiration or special occasion..."
                      value={bespokeData.notes}
                      onChange={(e) => setBespokeData({ ...bespokeData, notes: e.target.value })}
                      className="bespoke-input-field"
                      style={{ height: "70px", resize: "none" }}
                    />
                  </div>

                  <button type="submit" className="btn" style={{ width: "100%", padding: "16px" }}>
                    Submit Bespoke Commission Inquiry
                  </button>

                  <div style={{ textAlign: "center", marginTop: "14px", fontSize: "10px", letterSpacing: "1.5px", color: "#999", textTransform: "uppercase" }}>
                    Handcrafted in Paris • Digital Atelier Made by QuolyTech
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MAISON HERITAGE MODAL */}
      {isHeritageOpen && (
        <div className="luxury-modal-overlay" onClick={() => setIsHeritageOpen(false)}>
          <div className="luxury-modal-box" style={{ maxWidth: "780px" }} onClick={(e) => e.stopPropagation()}>
            <button className="luxury-modal-close" onClick={() => setIsHeritageOpen(false)}>
              <X size={22} />
            </button>

            <div style={{ padding: "50px 45px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#b8860b" }}>
                One Century of Haute Joaillerie
              </span>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "32px", letterSpacing: "2px", margin: "8px 0 25px" }}>
                The Heritage of Maison Vendôme (1924–2025)
              </h2>

              <div style={{ display: "flex", gap: "30px", flexDirection: "column", fontSize: "13px", color: "#555", lineHeight: "1.9" }}>
                <div>
                  <h4 style={{ fontFamily: "var(--serif)", fontSize: "16px", color: "#000", letterSpacing: "1px", marginBottom: "6px" }}>
                    1924 • The Place Vendôme Atelier
                  </h4>
                  <p>
                    Founded in the heart of Paris at Place Vendôme, the Maison began crafting one-of-a-kind royal tiaras
                    and diamond necklaces. Each creation was stamped with the legendary owl hallmark guaranteeing 18k solid gold purity.
                  </p>
                </div>

                <div>
                  <h4 style={{ fontFamily: "var(--serif)", fontSize: "16px", color: "#000", letterSpacing: "1px", marginBottom: "6px" }}>
                    1958 • The Art of Tension Setting
                  </h4>
                  <p>
                    Maison Vendôme pioneered the invisible diamond tension setting, allowing light to flood through rare Colombian
                    emeralds and Burmese rubies from all angles without visible prongs.
                  </p>
                </div>

                <div>
                  <h4 style={{ fontFamily: "var(--serif)", fontSize: "16px", color: "#000", letterSpacing: "1px", marginBottom: "6px" }}>
                    2025 • The Modern Atelier by QuolyTech
                  </h4>
                  <p>
                    Celebrating over a century of master craftsmanship, Maison Vendôme merges historic artisanal goldsmithing
                    with state-of-the-art digital bespoke experiences and secure client portals designed and engineered by QuolyTech.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "35px", borderTop: "1px solid #eee", paddingTop: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#888" }}>
                  Maison Vendôme • Paris
                </div>
                <button type="button" className="btn" onClick={() => setIsHeritageOpen(false)}>
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CLIENT SERVICE MODALS (Contact, Shipping, Sizing, Gift Cards) */}
      {activeClientService && (
        <div className="luxury-modal-overlay" onClick={() => setActiveClientService(null)}>
          <div className="luxury-modal-box" style={{ maxWidth: "650px" }} onClick={(e) => e.stopPropagation()}>
            <button className="luxury-modal-close" onClick={() => setActiveClientService(null)}>
              <X size={22} />
            </button>

            <div style={{ padding: "45px" }}>
              {activeClientService === "contact" && (
                <>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "24px", letterSpacing: "2px", marginBottom: "20px" }}>
                    Contact The Maison Concierge
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px", fontSize: "13px", color: "#555" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "#000", marginBottom: "4px" }}>
                        <Phone size={14} /> Telephone Concierge
                      </div>
                      <p>+33 1 42 68 00 00 (Paris)</p>
                      <p>+1 800 920 8920 (USA / International)</p>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "#000", marginBottom: "4px" }}>
                        <MapPin size={14} /> Flagship Atelier
                      </div>
                      <p>18 Place Vendôme, 75001 Paris, France</p>
                      <p>Monday – Saturday: 10:00 – 19:00</p>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      showToast("Your concierge inquiry has been transmitted to Place Vendôme.")
                      setActiveClientService(null)
                    }}
                  >
                    <input type="text" placeholder="Your Name" className="bespoke-input-field" required />
                    <input type="email" placeholder="Your VIP Email" className="bespoke-input-field" required />
                    <textarea placeholder="How may our concierge assist you?" className="bespoke-input-field" style={{ height: "90px" }} required />
                    <button type="submit" className="btn" style={{ width: "100%" }}>
                      Send to Master Jeweler Concierge
                    </button>
                  </form>
                </>
              )}

              {activeClientService === "shipping" && (
                <>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "24px", letterSpacing: "2px", marginBottom: "20px" }}>
                    Armored Delivery &amp; 30-Day Returns
                  </h2>
                  <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.9" }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>Armored Courier Logistics</strong>: Every Vendôme creation is insured for 100% of its appraisal value
                      and transported via discreet Brink&apos;s or Ferrari Security armored transit. Identity verification and biometric
                      signature are required upon handover.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>Complimentary Worldwide Transit</strong>: We proudly cover all global import duties, customs clearance,
                      and insured freight for all clients worldwide.
                    </p>
                    <p>
                      <strong>30-Day Returns &amp; Resizing</strong>: Should your creation require resizing or exchange, our atelier
                      provides complimentary return armored pickup and master jeweler adjustments.
                    </p>
                  </div>
                </>
              )}

              {activeClientService === "sizing" && (
                <>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "24px", letterSpacing: "2px", marginBottom: "20px" }}>
                    Maison Ring &amp; Chain Sizing Guide
                  </h2>
                  <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", fontSize: "12px" }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
                          <th style={{ padding: "8px 0" }}>US Size</th>
                          <th>UK / AU</th>
                          <th>EU / French (mm)</th>
                          <th>Circumference</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "8px 0" }}>US 5</td>
                          <td>J 1/2</td>
                          <td>49 mm</td>
                          <td>15.7 mm</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "8px 0" }}>US 6</td>
                          <td>M</td>
                          <td>52 mm</td>
                          <td>16.5 mm</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "8px 0" }}>US 7</td>
                          <td>O</td>
                          <td>54 mm</td>
                          <td>17.3 mm</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "8px 0" }}>US 8</td>
                          <td>Q</td>
                          <td>57 mm</td>
                          <td>18.1 mm</td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px 0" }}>US 9</td>
                          <td>S</td>
                          <td>59 mm</td>
                          <td>18.9 mm</td>
                        </tr>
                      </tbody>
                    </table>
                    <p>
                      Need custom measurement? Our concierge will send a complimentary physical brass ring sizer to your
                      residence.
                    </p>
                  </div>
                </>
              )}

              {activeClientService === "giftcards" && (
                <>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "24px", letterSpacing: "2px", marginBottom: "20px" }}>
                    Atelier Digital Gift Card
                  </h2>
                  <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}>
                    Offer the recipient the private pleasure of selecting their high jewelry creation at Place Vendôme.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      showToast("Gift Card added to your bag.")
                      setActiveClientService(null)
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "15px" }}>
                      {["$1,000", "$2,500", "$5,000"].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className="category-pill"
                          style={{ textAlign: "center" }}
                        >
                          {amt}
                        </button>
                      ))}
                    </div>
                    <input type="text" placeholder="Recipient Name" className="bespoke-input-field" required />
                    <input type="email" placeholder="Recipient Email" className="bespoke-input-field" required />
                    <textarea placeholder="Personal Gift Note" className="bespoke-input-field" style={{ height: "60px" }} />
                    <button type="submit" className="btn" style={{ width: "100%" }}>
                      Present Gift Card
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="luxury-toast">
          <Sparkles size={16} color="#d4af37" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  )
}
