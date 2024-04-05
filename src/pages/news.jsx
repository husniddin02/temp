// News.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFilter, BsSortUp, BsSortDown } from "react-icons/bs";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import "../styles/newsStyles.css";
import Footer from "../widgets/layout/footer";

function News() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [filterCategory, sortOrder]);

  const fetchNews = async () => {
    try {
      let url = "http://127.0.0.1:8000/news/";
      const params = {
        search: searchTerm,
        category: filterCategory,
      };
      const response = await axios.get(url, { params });
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterButtonClick = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const sortedNews = [...news].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA < titleB) return sortOrder === "asc" ? -1 : 1;
    if (titleA > titleB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredNews = sortedNews.filter((singleNews) =>
    singleNews.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredNews.length / itemsPerPage); i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          onClick={() => paginate(i)}
        >
          {i}
        </button>
      );
    }
    return <div className="pagination">{pageNumbers}</div>;
  };

  const renderFilterOptions = () => {
    return (
      <div className="filter-options">
        <select
          className="category-filter"
          value={filterCategory}
          onChange={handleFilterChange}
        >
          <option value="">Все категории</option>
          <option value="category1">Категория 1</option>
          <option value="category2">Категория 2</option>
          {/* Add more categories as needed */}
        </select>
      </div>
    );
  };

  const displayNews = currentItems.map((singleNews) => (
    <div key={singleNews.news_id} className="news-card">
      <h3>{singleNews.title}</h3>
      <p className="news-info">
        <span className="news-info-icon"><FaCalendarAlt /></span>
        {singleNews.publication_date}
      </p>
      <p className="news-info">
        <span className="news-info-icon"><FaUser /></span>
        {singleNews.author}
      </p>
      <p className="news-content">{singleNews.content}</p>
      <a
        href={singleNews.details_link}
        className="news-details-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Подробности
      </a>
    </div>
  ));

  return (
    <div className="news-page">
      <div className="container mx-auto py-8 main-content">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">     ___</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Поиск по заголовку новости"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="filter-group">
            <div
              className="filter-button"
              onClick={handleFilterButtonClick}
            >
              <BsFilter />
            </div>
            {showFilterOptions && renderFilterOptions()}
            <div className="sort-button" onClick={handleSortChange}>
              {sortOrder === "asc" ? <BsSortUp /> : <BsSortDown />}
            </div>
          </div>
        </div>
        <div className="news-list">
          {filteredNews.length ? (
            displayNews
          ) : (
            <p>No news found.</p>
          )}
        </div>
        {renderPagination()}
      </div>
      <Footer />
    </div>
  );
}

export default News;
