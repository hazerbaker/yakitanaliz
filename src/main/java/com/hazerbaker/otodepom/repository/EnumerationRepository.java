package com.hazerbaker.otodepom.repository;

import java.util.List;

import com.hazerbaker.otodepom.domain.Enumeration;
import com.hazerbaker.otodepom.domain.enumeration.EnumerationType;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Enumeration entity.
 */
@Repository
public interface EnumerationRepository extends JpaRepository<Enumeration, Long> {
    
    Page<Enumeration> findByTypeOrderByNameAsc(Pageable pageable, EnumerationType type);

    List<Enumeration> findByTypeOrderByNameAsc(EnumerationType type);

    Page<Enumeration> findByParentOrderByNameAsc(Pageable pageable, Enumeration parent);

    List<Enumeration> findByParentOrderByNameAsc(Enumeration parent);

    Enumeration findByName(String name);
}
