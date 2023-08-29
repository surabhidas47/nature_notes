package com.surabhi.naturenotes.repository;

import com.surabhi.naturenotes.domain.Entry;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Entry entity.
 */
@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    default Optional<Entry> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Entry> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Entry> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct entry from Entry entry left join fetch entry.location",
        countQuery = "select count(distinct entry) from Entry entry"
    )
    Page<Entry> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct entry from Entry entry left join fetch entry.location")
    List<Entry> findAllWithToOneRelationships();

    @Query("select entry from Entry entry left join fetch entry.location where entry.id =:id")
    Optional<Entry> findOneWithToOneRelationships(@Param("id") Long id);
}
