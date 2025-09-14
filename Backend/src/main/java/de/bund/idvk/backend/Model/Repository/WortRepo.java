package de.bund.idvk.backend.Model.Repository;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Enums.Rubrik;
import de.bund.idvk.backend.Model.Wort;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface WortRepo extends JpaRepository<Wort, Long> {
    // Repository für CRUD-Methoden
@Transactional
    @Modifying
    @Query("INSERT INTO Wort (name, rubrik) VALUES(:name, :rubrik)")
    void createWort(String name, Rubrik rubrik);

    @NonNull
    @Query("SELECT new Wort(e.id, e.name, e.rubrik) FROM Wort e")
    List<Wort> findAllWoerter();

    @Modifying
    @Query("DELETE FROM Wort WHERE id = :id")
    boolean delete(long id);


}