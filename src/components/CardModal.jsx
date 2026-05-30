import { useEffect } from "react";

const SUIT_COLORS = {
  major: "#C8F563",
  cups: "#63C8F5",
  wands: "#F5A363",
  swords: "#F563C8",
  pentacles: "#A363F5",
};

const SUIT_LABELS = {
  major: "Major Arcana",
  cups: "جام‌ها",
  wands: "عصاها",
  swords: "شمشیرها",
  pentacles: "سکه‌ها",
};

export default function CardModal({ card, onClose }) {
  const color = SUIT_COLORS[card.suit];

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-inner">
          {/* Card image */}
          <div className="modal-img-wrap" style={{ borderColor: color + "40" }}>
            <img
              src={card.image}
              alt={card.nameFa}
              className="modal-img"
              onError={e => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="modal-placeholder" style={{ display: "none", background: color + "12" }}>
              <div className="modal-placeholder-number" style={{ color }}>{card.number}</div>
              <div className="modal-placeholder-name" style={{ color: color + "88" }}>{card.name}</div>
            </div>
          </div>

          {/* Card info */}
          <div className="modal-content">
            <div className="modal-tags">
              <span className="modal-suit" style={{ color, borderColor: color + "40", background: color + "12" }}>
                {SUIT_LABELS[card.suit]}
              </span>
              <span className="modal-number-tag">{card.number}</span>
            </div>

            <h2 className="modal-title">{card.nameFa}</h2>
            <h3 className="modal-subtitle">{card.name}</h3>

            <div className="modal-divider" style={{ background: color + "40" }} />

            <div className="modal-section">
              <div className="modal-section-label" style={{ color }}>✦ معنا</div>
              <p className="modal-meaning">{card.meaning}</p>
            </div>

            <div className="modal-section">
              <div className="modal-section-label" style={{ color }}>✦ توضیحات</div>
              <p className="modal-desc">{card.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
