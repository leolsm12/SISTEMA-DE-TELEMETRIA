package com.fsa.telemetria.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_telemetria")
@Data
@NoArgsConstructor
public class Telemetria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Chave primária gerada automaticamente pelo banco

    private String id_sensor;
    private String tipo;
    private Integer nivel_agua_percentual;
    private String status_operacao;
    private String timestamp;

    // Getters e Setters (pode gerar no VS Code clicando com o botão direito -> Source Action)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getId_sensor() { return id_sensor; }
    public void setId_sensor(String id_sensor) { this.id_sensor = id_sensor; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public Integer getNivel_agua_percentual() { return nivel_agua_percentual; }
    public void setNivel_agua_percentual(Integer nivel_agua_percentual) { this.nivel_agua_percentual = nivel_agua_percentual; }
    public String getStatus_operacao() { return status_operacao; }
    public void setStatus_operacao(String status_operacao) { this.status_operacao = status_operacao; }
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}

