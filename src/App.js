import { useEffect, useState } from "react";
import Tours from "./components/Tours";
import Loading from "./components/Loading";

const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // dataya istek atma işlemi yapıyoruz
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const tours = await res.json();
      setLoading(false);
      setTours(tours);
    } catch (err) {
      setLoading(true);
      console.log(err);
    }
  };

  // ilgimi çekmedi butonuna basıldığında silme işlemi
  const handleDelete = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  // ekrana basıldığı anda gösterilecek
  useEffect(() => {
    fetchData();
  }, []);

  // loading kısmı true ise loading comp ekrana bas
  if (loading)
    return (
      <main>
        <Loading />
      </main>
    );
  // tours state inin içi boş olduğunda kullanıcıya bilgi ver
  // refresh ile dataları tekrar getir.
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>not tours left</h2>
          <button onClick={() => fetchData()} className="btn">
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} handleDelete={handleDelete} />
    </main>
  );
}

export default App;
