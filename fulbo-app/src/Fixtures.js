import { useState, useEffect } from "react";

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/fixtures/daily")
      .then((res) => res.json())
      .then(({ data }) => {
        setFixtures(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load fixtures");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid gap-4">
          {fixtures.map(
            (
              { homeTeam, awayTeam, homeGoals, awayGoals, status, venue },
              index
            ) => (
              <div key={index} className="p-4 bg-gray-100 rounded shadow">
                <h2 className="text-lg font-bold">
                  {homeTeam} vs {awayTeam}
                </h2>
                <p>
                  Score: {homeGoals} - {awayGoals}
                </p>
                <p>Status: {status}</p>
                <p>Venue: {venue}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
export default Fixtures;
