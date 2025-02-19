import React from "react";

type ProductCardProps = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
};

const ProductCard = ({
  id,
  title,
  thumbnail,
  description,
}: ProductCardProps) => {
  return (
    <div className="product">
      <img src={thumbnail} alt={title} loading="eager" />
      <h3>
        {id} - {title}
      </h3>
      {/* <p>{description.slice(0, 80)}</p>  */}
    </div>
  );
};

export default ProductCard;
