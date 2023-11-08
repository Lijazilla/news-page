import { useEffect } from "react";
import { useState } from "react"
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        // Captura cualquier error y muestra un mensaje de error
        setError("Error al cargar noticias. Por favor, inténtalo de nuevo más tarde.");
      }
    };

    fetchData();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span> </h2>
      {error ? (
        // Muestra un mensaje de error si ocurrió un error en la solicitud
        <p>{error}</p>
      ) : (
        // Muestra las noticias si no hubo errores
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      )}
    </div>
  );
};

export default NewsBoard;
