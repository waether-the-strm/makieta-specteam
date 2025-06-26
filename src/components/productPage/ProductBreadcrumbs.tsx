import React from 'react'
import { Link } from 'react-router-dom'

interface ProductBreadcrumbsProps {
  category: string
  name: string
}

export const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({ category, name }) => {
  return (
    <div className="text-meta-light mb-8">
      <Link to="/" className="product__breadcrumbs-link">
        Oferta
      </Link>
      <span className="mx-2">&gt;</span>
      <Link to={`/category/${category.toLowerCase()}`} className="product__breadcrumbs-link">
        {category}
      </Link>
      <span className="mx-2">&gt;</span>
      <span className="product__breadcrumbs-current">{name}</span>
    </div>
  )
}
