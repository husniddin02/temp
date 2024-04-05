// 

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFilter, BsSortUp, BsSortDown } from "react-icons/bs";
import { FaMapMarkerAlt, FaRunning, FaDumbbell } from "react-icons/fa";
import "../styles/sportFStyles.css";
import backgroundImg from "../../public/img/toj.jpg";
import Footer from "../widgets/layout/footer";

function SportFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  useEffect(() => {
    fetchFacilities();
  }, [filterCategory, sortOrder]);

  const fetchFacilities = async () => {
    try {
      let url = "http://127.0.0.1:8000/sport-facilities/";
      const params = {
        category: filterCategory,
      };
      const response = await axios.get(url, { params });
      setFacilities(response.data);
    } catch (error) {
      console.error("Error fetching sport facilities:", error);
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

  const sortedFacilities = [...facilities].sort((a, b) => {
    const nameA = a.facility_name.toLowerCase();
    const nameB = b.facility_name.toLowerCase();
    if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
    if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredFacilities = sortedFacilities.filter((facility) =>
    facility.facility_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFacilities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const displayFacilities = currentItems.map((facility) => (
    <div key={facility.facility_id} className="facility-card">
      <h3>{facility.facility_name}</h3>
      <p>
        <FaMapMarkerAlt /> Расположение: {facility.location}
      </p>
      <p>
        <FaRunning /> Вместимость: {facility.capacity}
      </p>
      <p>
        <FaDumbbell /> Наличие оборудования {facility.equipment_available ? "Да" : "Нет"}
      </p>
      <p>Наличие тренера {facility.trainer_available ? "Да" : "Нет"}</p>
      {facility.details && (
        <p>
          <a
            href={facility.details.details_link}
            target="_blank"
            rel="noopener noreferrer"
            className="details-link"
          >
            Подробнее
          </a>
        </p>
      )}
    </div>
  ));

  const renderPagination = () => {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(filteredFacilities.length / itemsPerPage);
      i++
    ) {
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

  return (
    <div className="facilities-page" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="page-container">
        <div className="container mx-auto py-8 main-content">
          <h1 className="text-2xl font-bold text-white mb-4">Спортивные объекты</h1>
          <div className="filters">
            <input
              type="text"
              placeholder="Поиск по названию объекта"
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
          <div className="facilities-list">
            {filteredFacilities.length ? (
              displayFacilities
            ) : (
              <p>No facilities found.</p>
            )}
          </div>
          {renderPagination()}
        </div>
        <Footer /> {/* Используем футер здесь */}
      </div>
    </div>
  );
}

export default SportFacilities;
