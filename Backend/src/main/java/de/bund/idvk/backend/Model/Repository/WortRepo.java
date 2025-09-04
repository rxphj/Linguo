package de.bund.idvk.backend.Model.Repository;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Enums.Rolle;
import de.bund.idvk.backend.Model.Enums.Rubrik;
import de.bund.idvk.backend.Model.Wort;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

@Repository
public class WortRepo {
    private final JdbcTemplate jdbcTemplate;

    public WortRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private List<Wort>woerter= new ArrayList<Wort>();
    public Wort createWort(Wort wort){
        String sql ="INSERT INTO WORT(name, rubrik) VALUES(?,?)";
        jdbcTemplate.update(sql,wort.getName(),wort.getRubrik());
        woerter.add(wort);
        return wort;
    }
    public List<Wort> findAll(){
        String sql = "SELECT id, name, rubrik FROM wort";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Wort wort = new Wort();
            wort.setId(rs.getLong(rs.findColumn("id")));
            wort.setName(rs.getString("name"));
            wort.setRubrik(Rubrik.valueOf(rs.getString("rubrik")));
            return wort;
        });
    }
    public Wort findByObject(Wort wort){
        return (Wort)woerter.stream().filter(w-> w.getId() == wort.getId());
    }
    public boolean delete(Wort wort){
        String sql = "DELETE FROM Wort WHERE id= (?)";
        jdbcTemplate.update(sql,wort.getId());
        return woerter.remove(wort) ;
    }
    public Wort update(Wort wort){
        String sql= "UPDATE Wort SET name = (?) AND rubrik=(?) WHERE id= (?)";
        jdbcTemplate.update(sql,wort.getName(),wort.getRubrik(),wort.getId());
        for(int i=0; i< woerter.size();i++){
            if(woerter.get(i).getId() == wort.getId()){
                woerter.remove(i);
            }
        }
        woerter.add(wort);
        return wort;
    }

}
