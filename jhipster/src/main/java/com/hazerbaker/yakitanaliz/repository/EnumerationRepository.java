package com.hazerbaker.yakitanaliz.repository;

import com.hazerbaker.yakitanaliz.domain.Enumeration;
import com.hazerbaker.yakitanaliz.domain.enumeration.EnumerationType;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Enumeration entity.
 */
@Repository
public interface EnumerationRepository extends JpaRepository<Enumeration, Long> {

    Page<Enumeration> findByType(Pageable pageable, EnumerationType type);

    Page<Enumeration> findByParent(Pageable pageable, Enumeration parent);

    Enumeration findByName(String name);
}
