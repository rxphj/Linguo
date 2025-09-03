package de.bund.idvk.backend.Model.Repository;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Enums.Rolle;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository {
    List <Benutzer> benutzer = new ArrayList<>();

     private final JdbcTemplate jdbctemplate;

    public UserRepository(JdbcTemplate jdbctemplate) {
        this.jdbctemplate = jdbctemplate;
    }
    public Benutzer save(Benutzer b){
        String sql = "INSERT INTO Benutzer (username, password, rolle) VALUES (?,?,?)";
        jdbctemplate.update(sql, b.getUsername(), b.getPassword(), b.getRolle());
        benutzer.add(b);
        return b;
    }
    public List<Benutzer> findAll() {
        benutzer.clear();
        String sql = "SELECT id,username, password, rolle FROM Benutzer";
        return jdbctemplate.query(sql, (rs, rowNum) -> {
            Benutzer benutzer = new Benutzer();
            benutzer.setId(rs.getLong(rs.findColumn("id")));
            benutzer.setUsername(rs.getString("username"));
            benutzer.setPassword(rs.getString("password"));
            benutzer.setRolle(Rolle.valueOf(rs.getString("rolle")));
            return benutzer;
        });
    }
    public boolean delete(long id){
        boolean deleted= false;
        String sql = "DELETE FROM Benutzer WHERE id = (?)";
        jdbctemplate.update(sql, id);
        for(Benutzer b : findAll()){
            if(b.getId() == id){
                benutzer.remove(b);
                deleted = true;
            }
        }
        return deleted;
    }
    public Benutzer update(Benutzer b){
        String sql ="UPDATE Benutzer SET rolle = (?) AND  username= (?) AND rolle =(?) AND score = (?)  WHERE id = (?)";
        jdbctemplate.update(sql, b.getRolle(), b.getUsername(), b.getRolle(), b.getScore(),  b.getId());
        for(int i=0; i < benutzer.size(); i++){
            if(benutzer.get(i).getId()== b.getId()){
                benutzer.remove(i);
            }
        }
        benutzer.add(b);
        return b;
    }
    public Benutzer findById(long id){
        Benutzer b = new Benutzer();
        for (Benutzer benutzer : findAll()){
            if(benutzer.getId() == id){
                b = benutzer;
            }
        }
        return b;
    }

}
