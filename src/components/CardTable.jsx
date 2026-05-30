const SUIT_COLORS = {
  major: "#C8F563",
  cups: "#63C8F5",
  wands: "#F5A363",
  swords: "#F563C8",
  pentacles: "#A363F5",
};

export default function CardTable({ cards, selected, onSelect, mode }) {
  return (
    <div className="card-grid">
      {cards.map(card => {
        const isSelected = selected.find(c => c.id === card.id);
        const color = SUIT_COLORS[card.suit];
        return (
          <div
            key={card.id}
            className={`card-item ${isSelected ? "card-selected" : ""} ${mode === "reading" && selected.length >= 3 ? "card-disabled" : ""}`}
            onClick={() => onSelect(card)}
            style={{ "--card-color": color }}
          >
            <div className="card-img-wrap">
              <img
                src={card.image}
                alt={card.nameFa}
                className="card-img"
                onError={e => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="card-placeholder" style={{ display: "none" }}>
                <span className="card-number">{card.number}</span>
              </div>
              <div className="card-overlay">
                <span>{mode === "reading" ? "انتخاب" : "جزئیات"} ↗</span>
              </div>
            </div>
            <div className="card-info">
              <div className="card-name-fa">{card.nameFa}</div>
              <div className="card-name-en">{card.name}</div>
              <div className="card-suit-tag" style={{ color, borderColor: color + "40", background: color + "12" }}>
                {card.suit === "major" ? "Major" : card.suit}
              </div>
            </div>
            {isSelected && <div className="card-check">✓</div>}
          </div>
        );
      })}
    </div>
  );
}
