import { useState, useMemo } from "react";
import { cards, SUITS } from "./data/cards";
import CardTable from "./components/CardTable";
import CardModal from "./components/CardModal";
import FilterBar from "./components/FilterBar";
import "./index.css";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState([]); // max 3
  const [flipped, setFlipped] = useState([]);
  const [modal, setModal] = useState(null);
  const [mode, setMode] = useState("browse"); // "browse" | "reading"

  const filtered = useMemo(() =>
    filter === "all" ? cards : cards.filter(c => c.suit === filter),
    [filter]
  );

  const handleSelect = (card) => {
    if (mode === "reading") {
      if (selected.find(c => c.id === card.id)) return;
      if (selected.length >= 3) return;
      setSelected(prev => [...prev, card]);
    } else {
      setModal(card);
    }
  };

  const handleFlip = (cardId) => {
    if (!flipped.includes(cardId)) {
      setFlipped(prev => [...prev, cardId]);
      setTimeout(() => setModal(selected.find(c => c.id === cardId)), 600);
    }
  };

  const resetReading = () => {
    setSelected([]);
    setFlipped([]);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">✦ تاروت</div>
            <a href="https://jnjal.github.io" className="back-link">← پورتفولیو</a>
          <div className="header-tabs">
            <button className={`tab ${mode === "browse" ? "active" : ""}`} onClick={() => { setMode("browse"); resetReading(); }}>
              دایره‌المعارف
            </button>
            <button className={`tab ${mode === "reading" ? "active" : ""}`} onClick={() => { setMode("reading"); resetReading(); }}>
              فال ۳ کارتی
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {mode === "browse" && (
          <>
            <div className="page-title">
              <span className="label">TAROT — ENCYCLOPEDIA</span>
              <h1>دایره‌المعارف تاروت</h1>
              <p>روی هر کارت کلیک کن تا معنای اون رو ببینی</p>
            </div>
            <FilterBar filter={filter} setFilter={setFilter} />
            <CardTable cards={filtered} selected={[]} flipped={[]} onSelect={handleSelect} mode="browse" />
          </>
        )}

        {mode === "reading" && (
          <>
            <div className="page-title">
              <span className="label">TAROT — READING</span>
              <h1>فال ۳ کارتی</h1>
              <p>
                {selected.length < 3
                  ? `${3 - selected.length} کارت دیگه انتخاب کن`
                  : "روی کارت‌ها کلیک کن تا برگردن"}
              </p>
            </div>

            {/* Selected cards display */}
            {selected.length > 0 && (
              <div className="reading-spread">
                {selected.map((card, i) => (
                  <div key={card.id} className="spread-slot">
                    <div className="spread-label">
                      {["گذشته", "حال", "آینده"][i]}
                    </div>
                    <div
                      className={`spread-card ${flipped.includes(card.id) ? "flipped" : ""}`}
                      onClick={() => handleFlip(card.id)}
                    >
                      <div className="spread-card-inner">
                        <div className="spread-card-back">
                          <span>✦</span>
                        </div>
                        <div className="spread-card-front">
                          <img src={card.image} alt={card.nameFa} onError={e => { e.target.style.display = "none"; }} />
                          <div className="spread-card-name">{card.nameFa}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {selected.length === 3 && (
                  <button className="reset-btn" onClick={resetReading}>شروع دوباره ↺</button>
                )}
              </div>
            )}

            {selected.length < 3 && (
              <CardTable
                cards={cards}
                selected={selected}
                flipped={flipped}
                onSelect={handleSelect}
                mode="reading"
              />
            )}
          </>
        )}
      </main>

      {modal && <CardModal card={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
