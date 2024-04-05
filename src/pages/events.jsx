import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFilter, BsSortUp, BsSortDown } from "react-icons/bs";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import "../styles/eventsStyles.css";
import backgroundImg from "../../public/img/toj.jpg";
import Footer from "../widgets/layout/footer";

function SportFacilities() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [filterCategory, sortOrder]);

  const fetchEvents = async () => {
    try {
      let url = "http://127.0.0.1:8000/events/";
      const params = {
        search: searchTerm,
      };
      const response = await axios.get(url, { params });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
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

  const sortedEvents = [...events].sort((a, b) => {
    const nameA = a.event_name.toLowerCase();
    const nameB = b.event_name.toLowerCase();
    if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
    if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredEvents = sortedEvents.filter((event) =>
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredEvents.length / itemsPerPage); i++) {
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

  const displayEvents = currentItems.map((event) => (
    <div key={event.event_id} className="facility-card">
      <h3>{event.event_name}</h3>
      <p className="event-info">
        <FaMapMarkerAlt /> Место проведения: {event.location}
      </p>
      <p className="event-info">
        <FaCalendarAlt /> Дата: {event.event_date}
      </p>
      <p className="event-info">
        <FaUser /> Организатор: {event.organizer}
      </p>
      <p className="event-description">
        {event.description.length > 150
          ? `${event.description.substring(0, 150)}...`
          : event.description}
      </p>
      {event.details ? (
        <div className="event-details">
          <h4>Подробности:</h4>
          <p className="additional-info">Дополнительная информация: {event.details.additional_info}</p>
        </div>
      ) : (
        <p>Подробности мероприятия отсутствуют.</p>
      )}
    </div>
  ));

  return (
    <div className="facilities-page" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="page-container">
        <div className="container mx-auto py-8 main-content">
          <h1 className="text-2xl font-bold text-white mb-4">Список мероприятий</h1>
          <div className="filters">
            <input
              type="text"
              placeholder="Поиск по названию мероприятия"
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
            {filteredEvents.length ? (
              displayEvents
            ) : (
              <p>No events found.</p>
            )}
          </div>
          {renderPagination()}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default SportFacilities;
