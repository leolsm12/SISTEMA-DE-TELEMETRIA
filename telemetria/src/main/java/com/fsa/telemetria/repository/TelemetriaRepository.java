package com.fsa.telemetria.repository;

import com.fsa.telemetria.model.Telemetria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TelemetriaRepository extends JpaRepository<Telemetria, Long> {
    // Traz o último registro inserido baseado no maior ID
    Telemetria findTopByOrderByIdDesc();
}
