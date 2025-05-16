// src/components/Fixtures/Fixtures.jsx
import { useState, useEffect } from 'react';
import styles from './Fixtures.module.css';

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedLeagues, setExpandedLeagues] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/fixtures/daily')
      .then((res) => res.json())
      .then(({ data }) => {
        setFixtures(data);
        const leagues = [...new Set(data.map((fixture) => fixture.league))];
        const initialExpanded = leagues.reduce((acc, league) => {
          acc[league] = true; // Expanded by default
          return acc;
        }, {});
        setExpandedLeagues(initialExpanded);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load fixtures');
        setLoading(false);
      });
  }, []);

  const toggleLeague = (league) => {
    setExpandedLeagues((prev) => ({
      ...prev,
      [league]: !prev[league],
    }));
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  const fixturesByLeague = fixtures.reduce((acc, fixture) => {
    const league = fixture.league || 'Unknown League';
    acc[league] = acc[league] || [];
    acc[league].push(fixture);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      {Object.entries(fixturesByLeague).map(([league, leagueFixtures]) => (
        <div key={league} className={styles.leagueSection}>
          <h2
            className={styles.leagueHeader}
            onClick={() => toggleLeague(league)}
          >
            <span className={styles.leagueTitle}>{league}</span>
            <span className={styles.toggleIcon}>
              {expandedLeagues[league] ? '▲' : '▼'}
            </span>
          </h2>
          {expandedLeagues[league] && (
            <div className={styles.matchContainer}>
              <table className={styles.matchTable}>
                <tbody>
                  {leagueFixtures.map((fixture, index) => (
                    <tr key={index} className={styles.matchRow}>
                      <td className={styles.statusCell}>
                        <p className={styles.statusText}>
                          {fixture.status === 'Aplazado'
                            ? 'Aplazado'
                            : fixture.status === 'Match Finished'
                            ? 'Final'
                            : ''}
                        </p>
                        <p className={styles.venueText}>
                          {fixture.venue === 'Unknown' ? 'N/A' : fixture.venue}
                        </p>
                      </td>
                      <td className={styles.teamsCell}>
                        <div className={styles.teamsWrapper}>
                          <div
                            className={`${styles.teamWrapper} ${styles.teamNameLeft}`}
                          >
                            <span className={styles.teamName}>
                              {fixture.homeTeam}
                            </span>
                            {fixture.status === 'Match Finished' && (
                              <span className={styles.score}>
                                {fixture.homeGoals}
                              </span>
                            )}
                          </div>
                          <span className={styles.dash}>-</span>
                          <div
                            className={`${styles.teamWrapper} ${styles.teamNameRight}`}
                          >
                            {fixture.status === 'Match Finished' && (
                              <span className={styles.score}>
                                {fixture.awayGoals}
                              </span>
                            )}
                            <span className={styles.teamName}>
                              {fixture.awayTeam}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.statusCell}>
                        <p className={styles.statusText}>
                          {fixture.status !== 'Aplazado' &&
                          fixture.status !== 'Match Finished'
                            ? fixture.status
                            : ''}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Fixtures;
