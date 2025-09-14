package de.bund.idvk.backend.Model.Repository;


import de.bund.idvk.backend.Model.Highscore;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class HighscoreRepository {
    // Nicht funktional

    /*TODO
    *  Überprüfen des Highscores mit aktuellen Punkten*/
    private final JdbcTemplate jdbcTemplate;

    public HighscoreRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean createhighscore(long benutzerid, long wortid, int score){
        String sql = "INSERT INTO Highscore(benutzerid, wortid, punkte) VALUES(?,?,?)";
        int coumtrow=jdbcTemplate.update(sql, benutzerid, wortid, score);
        return coumtrow>0;
    }
    public List<Highscore> readhighscorefromcurrentuser(long benutzerid){
        String sql = "SELECT id, benutzerid, wortid, punkte FROM Highscore WHERE benutzerid=?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Highscore highscore= new Highscore();
            highscore.setId(rs.getLong(rs.findColumn("id")));
            highscore.setBenutzerid(rs.findColumn("benutzerid"));
            highscore.setHighscore(rs.findColumn("score"));
            highscore.setWortid(rs.findColumn("wortid"));
            return highscore;
        });
    }
}
