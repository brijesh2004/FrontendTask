import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../components/Assets/dropdown_icon.png";
import Item from "../components/item/Item";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [product , setProduct] = useState(all_product);
  return (
    <div className="shop-category">
      <img className="shopcategory" src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> Out of 36 products
        </p>
        <select className="shopcategory-sort" onChange={(e)=>{
          if(e.target.value==='price'){
            const pricesort = all_product;
           pricesort.sort((a, b) => {
             return a.new_price - b.new_price;
          });
           setProduct(pricesort);
          }
          else{
           setProduct(all_product);
          }

        }}>
          Sort by <img src={dropdown_icon} alt="" />
          <option value="sort">Sort By</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="shopcategory-products">
        {product.map((item,i)=>{
          if (props.category===item.category) {
            return <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}/>
        
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
