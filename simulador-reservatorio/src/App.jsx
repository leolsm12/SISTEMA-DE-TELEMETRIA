import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [nivel, setNivel] = useState(50);

  const getStatus = () => {
    if (nivel >= 60) return { texto: 'NÍVEL NORMAL', cor: '#3b82f6' }; 
    if (nivel >= 30) return { texto: 'ATENÇÃO: NÍVEL BAIXO', cor: '#eab308' }; 
    return { texto: 'CRÍTICO: RISCO DE PARADA', cor: '#ef4444' }; 
  };

  const status = getStatus();

  const payloadParaBackend = {
    id_sensor: "T-01",
    tipo: "ultrassonico",
    nivel_agua_percentual: Number(nivel),
    status_operacao: status.texto
  };

  // Referência para o dado atual da tela
  const payloadRef = useRef(payloadParaBackend);
  
  // NOVO: Referência para guardar a memória do último nível enviado
  const ultimoNivelEnviadoRef = useRef(null);

  useEffect(() => {
    payloadRef.current = payloadParaBackend;
  }, [payloadParaBackend]);

  useEffect(() => {
    const enviarDadosParaAPI = async () => {
      const dadosAtuais = payloadRef.current;

      // A MÁGICA AQUI: Só envia se o nível for diferente do último enviado
      if (dadosAtuais.nivel_agua_percentual !== ultimoNivelEnviadoRef.current) {
        
        // Gera o timestamp apenas no momento exato do envio
        const dadosParaEnviar = {
          ...dadosAtuais,
          timestamp: new Date().toISOString()
        };

        console.log("🌊 NÍVEL ALTERADO! Enviando POST para o Java:", dadosParaEnviar);
        
        // Atualiza a memória com o novo valor que acabou de ser enviado
        ultimoNivelEnviadoRef.current = dadosAtuais.nivel_agua_percentual;

        // Quando a API estiver pronta, descomente abaixo:
        /*
        await fetch('http://localhost:8080/api/telemetria', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosParaEnviar)
        });
        */
      } else {
        // Apenas para você visualizar no F12 que o sistema está poupando banda
        console.log("⏱️ Verificação (5s): Nível estável. Tráfego economizado.");
      }
    };

    const intervalo = setInterval(enviarDadosParaAPI, 5000); 
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Painel de Simulação - Telemetria</h1>
        <p>Ajuste o controle deslizante para simular o nível da torre de resfriamento.</p>
      </header>

      <main className="painel-principal">
        
        <div className="secao-esquerda">
          <div className="reservatorio-area">
            <div className="tanque-exterior">
              <div className="marcas-medicao">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
              <div 
                className="agua" 
                style={{ height: `${nivel}%`, backgroundColor: status.cor }}
              >
                <div className="onda"></div>
              </div>
            </div>
            
            <div className="status-alerta" style={{ color: status.cor }}>
              {status.texto}
            </div>
          </div>
        </div>

        <div className="secao-direita">
          <div className="controle-area">
            <h2>Controle Manual (Sensor Virtual)</h2>
            <input 
              type="range" min="0" max="100" 
              value={nivel} 
              onChange={(e) => setNivel(e.target.value)}
              className="slider"
            />
            <span className="porcentagem">{nivel}%</span>
          </div>

          <div className="dados-area">
            <h3>Monitoramento Inteligente (5s):</h3>
            <pre>{JSON.stringify({ ...payloadParaBackend, timestamp: "Gerado no envio..." }, null, 2)}</pre>
            <p style={{ marginTop: '1rem', color: '#38bdf8', fontSize: '0.9rem', textAlign: 'center' }}>
              Abra o console (F12). O envio só ocorre quando você altera o nível!
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;