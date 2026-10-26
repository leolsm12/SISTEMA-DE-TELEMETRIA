package com.fsa.telemetria.Controller;

import com.fsa.telemetria.model.Telemetria;
import com.fsa.telemetria.repository.TelemetriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Libera a comunicação com o React na porta 5173

public class TelemetriaController {

    // Variável na memória para guardar o nível mais recente recebido
    @Autowired
    private TelemetriaRepository repository;

    @PostMapping("/telemetria")
    public String receberDadosSensor(@RequestBody Telemetria dados) {
        repository.save(dados); // O Spring faz o INSERT automático no Postgres aqui
        System.out.println("✅ [BANCO] Nível salvo: " + dados.getNivel_agua_percentual() + "%");
        return "Dados recebidos e salvos no banco com sucesso!";
    }

    // ROTA 2: O React Native (Mobile) vai consultar os dados aqui
    @GetMapping("/telemetria/atual")
    public Telemetria enviarParaMobile() {
        System.out.println("📱 [APP] Celular consultou o nível atual.");
        return repository.findTopByOrderByIdDesc();
    }
}
