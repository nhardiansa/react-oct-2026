import Card from "../components/Card";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const movies = [
  {
    title: "The Dark Knight",
    rating: 9.0,
    imgUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80",
    year: 2008,
  },
  {
    title: "Inception",
    rating: 8.8,
    imgUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80",
    year: 2010,
  },
  {
    title: "Interstellar",
    rating: 8.7,
    imgUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
    year: 2014,
  },
  {
    title: "Parasite",
    rating: 8.5,
    imgUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80",
    year: 2019,
  },
  {
    title: "Spirited Away",
    rating: 8.6,
    imgUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80",
    year: 2001,
  },
  {
    title: "Whiplash",
    rating: 8.5,
    imgUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    year: 2014,
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    rating: 8.4,
    imgUrl:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=500&q=80",
    year: 2018,
  },
];

function Home() {
  return (
    <>
      <Navbar title={"SINEMATA"} />
      <Hero />

      <section id="trending" className="container max-w-325 mx-auto mt-12">
        {/* <!-- Heading --> */}
        <div className="heading flex items-center gap-x-3">
          <div className="orange-bar bg-[#FF8000] w-1 h-6.5"></div>
          <h2 className="heading-text text-white font-bebas text-3xl">
            TRENDING NOW
          </h2>
        </div>
        {/* <!-- Grid --> */}
        <div className="card-container flex gap-x-3 mt-8 max-w-325 overflow-x-hidden">
          {movies.map((movie) => (
            <Card
              key={movie.title}
              title={movie.title}
              imgUrl={movie.imgUrl}
              rating={movie.rating}
              year={movie.year}
            />
          ))}
        </div>
      </section>

      <footer className="pt-50"></footer>
    </>
  );
}

export default Home;
