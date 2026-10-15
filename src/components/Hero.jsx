import cardImg from "../assets/img/cards.png";

function Hero() {
  return (
    <div
      id="hero"
      className="container relative max-w-325 mx-auto mt-4 bg-linear-to-bl from-[#2A1810] to-[#0F1419] rounded-xl p-12.5"
    >
      <div className="content max-w-[40%] flex flex-col items-start">
        {/* <!-- badge --> */}
        <span className="font-inter text-sm font-bold text-[#FF8000] bg-[#FF8000]/18 border border-[FF8000]/40 rounded-[3px] py-1.25 px-2.5">
          FEATURED THIS WEEK
        </span>
        {/* <!-- heading --> */}
        <h1 className="font-bebas text-[60px] text-white max-w-[70%] leading-none my-4">
          CHRONOS LETTERBOUND
        </h1>
        {/* <!-- span --> */}
        <div className="font-inter text-sm flex gap-x-3">
          <span className="text-[#FBBF24]">★ 8.7</span>
          <span className="text-[#9CA3AF]">2024 · 2h 18m · Sci-Fi · Drama</span>
        </div>
        {/* <!-- paragraph --> */}
        <p className="font-inter text-sm text-[#CBD5DB] my-5">
          Seorang penjaga arsip menemukan surat-surat dari masa depan yang
          ditulis untuknya — masing-masing meminta keputusan mustahil.
        </p>
        {/* <!-- buttons --> */}
        <div className="flex gap-x-3">
          <button className="btn btn-warning bg-[#FF8000] border-amber-600 rounded-md h-12 flex items-center font-inter font-bold">
            <span className="material-icons-round">play_arrow</span>{" "}
            <span>Lihat Detail</span>
          </button>
          <button className="btn btn-neutral bg-[#3A4049] border-gray-700 rounded-md h-12 w-35 flex items-center font-inter font-bold">
            <span>+ Watchlist</span>
          </button>
        </div>
      </div>

      <div className="img">
        <img src={cardImg} alt="cards" className="absolute top-12.5 right-15" />
      </div>
    </div>
  );
}

export default Hero;
