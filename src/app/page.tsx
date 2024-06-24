"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./context/CartContext";

// Define the type for the products
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    let abortcontroller = new AbortController();

    const loadData = async () => {
      try {
        setLoading(true);
        let response = await axios.get(`https://fakestoreapi.com/products`, {
          signal: abortcontroller.signal,
        });
        setData(response.data);
        setError("");
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
    return () => abortcontroller.abort();
  }, []);

  return (
    <main>
      <div className="bg-slate-200">
        <div className="flex justify-between p-5 bg-black">
          <h1 className="text-center font-bold text-2xl text-white">Shopping Demo</h1>
          <Link href="/cart">
            <div className="hover:cursor-pointer">
              <svg className="w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
          </Link>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-3 max-md:grid-cols-2 gap-4 p-10">
          {data.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 bg-white rounded-lg p-5">
              <img src={item.image} alt={item.title} className="h-40 object-contain pb-4" />
              <h1 className="text-center font-bold">{item.title}</h1>
              <h1 className="text-orange-500 text-center font-bold mt-auto"> 10 ฿ </h1>
              <div className="bg-slate-500 p-3 rounded-lg m-auto mb-0 hover:bg-slate-700 hover:cursor-pointer" onClick={() => addToCart(item)}>
                <p className="text-white">Add to cart</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
