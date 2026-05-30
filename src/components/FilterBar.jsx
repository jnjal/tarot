import { SUITS } from "../data/cards";

const SUIT_COLORS = {
  major: "#C8F563",
  cups: "#63C8F5",
  wands: "#F5A363",
  swords: "#F563C8",
  pentacles: "#A363F5",
};

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-bar">
      <button
        className={`filter-btn ${filter === "all" ? "active" : ""}`}
        onClick={() => setFilter("all")}
      >
        همه (۷۸)
      </button>
      {Object.entries(SUITS).map(([key, label]) => (
        <button
          key={key}
          className={`filter-btn ${filter === key ? "active" : ""}`}
          style={filter === key ? { borderColor: SUIT_COLORS[key], color: SUIT_COLORS[key], background: SUIT_COLORS[key] + "15" } : {}}
          onClick={() => setFilter(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
