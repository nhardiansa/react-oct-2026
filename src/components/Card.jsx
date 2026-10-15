function Card({ title, imgUrl, rating, year }) {
  return (
    <div className="card min-w-50 flex flex-col gap-y-2">
      <div className="image w-full h-75">
        <img
          className="object-cover h-full w-full rounded-lg"
          src={imgUrl}
          alt=""
        />
      </div>
      <div className="typo">
        <div className="title-rating flex w-full justify-between">
          <a
            href="/"
            className="text-white font-inter font-bold text-sm hover:underline max-w-4/5"
          >
            {title}
          </a>
          <span className="rating font-inter font-bold text-xs text-yellow-600">
            ★ {rating}
          </span>
        </div>
        <div className="year">
          <span className="font-inter text-xs text-gray-500">{year}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
